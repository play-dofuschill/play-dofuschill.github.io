// engine/offline.js — Simulation de progression offline DofusChill
//
// Flux : simulateOfflineProgress() est appelé une fois au chargement (main.js).
// Si isRunning + combatStartTime sont sauvegardés, on calcule ce qui s'est passé
// pendant l'absence du joueur et on affiche le résumé.

const OFFLINE_CAP_MS = 8 * 60 * 60 * 1000  // plafond 8h
const OFFLINE_MIN_MS = 10 * 1000            // ignore si < 10 secondes

// ─── Estimation du temps moyen par kill ──────────────────────────────────────

function _offlineMsPerKill(area, team) {
    const member = team.find(m => m && m.currentHp > 0) || team[0]
    if (!member) return 6000

    const stats = getEffectiveStats(member)
    const spd   = Math.max(1, stats?.spd || 100)
    // Temps pour remplir la barre d'action du membre le plus rapide (ms)
    const barMs = 2000 * (100 / spd)   // BASE_TIME = 2000

    // HP moyen d'un mob de la zone (mob de référence = premier spawn)
    const refMob   = monsters[area.spawns[0]?.id]
    const avgLvl   = (area.mobMinLevel + area.mobMaxLevel) / 2
    const scale    = 1 + (avgLvl - area.mobMinLevel) * 0.05
    const avgMobHp = refMob ? Math.floor(refMob.bst.hp * scale) : Math.floor(20 + avgLvl * 8)
    const avgAtk   = Math.max(1, stats?.atk || 10)

    const hitsToKill = Math.max(1, Math.ceil(avgMobHp / avgAtk))
    return barMs * hitsToKill + 500   // +500ms délai de respawn
}

// ─── Estimation du temps de survie de l'équipe ───────────────────────────────

function _offlineSurvivalMs(area, team) {
    const totalHp = team.reduce((sum, m) => {
        if (!m) return sum
        const stats = getEffectiveStats(m)
        return sum + (stats?.hp || 0)
    }, 0)
    if (totalHp <= 0) return 0

    const refMob = monsters[area.spawns[0]?.id]
    if (!refMob) return 8 * 3600 * 1000   // aucun mob de référence → survie max

    const avgLvl   = (area.mobMinLevel + area.mobMaxLevel) / 2
    const scale    = 1 + (avgLvl - area.mobMinLevel) * 0.05
    const mobAtk   = Math.floor(refMob.bst.atk * scale)
    const mobSpd   = refMob.bst.spd || 100
    const enemyBarMs = 2000 * (100 / mobSpd)
    const enemyDps   = mobAtk / (enemyBarMs / 1000)  // dégâts/sec

    if (enemyDps <= 0) return 8 * 3600 * 1000
    return Math.max(60000, (totalHp / enemyDps) * 1000)  // min 1 min de survie
}

// ─── Tirage de loot pour UN kill (sans effets de bord) ───────────────────────

function _offlineOneLootRoll(area, spawnId) {
    const famBonuses = getAllFamiliarBonuses()
    const dropBonus  = (famBonuses.dropRate || 0) / 100

    // Pierre d'âme
    let familiarId = null
    const pierreDameEntry = area.lootTable?.find(e => e.itemId === 'pierreDame')
    const baseChance = pierreDameEntry
        ? pierreDameEntry.dropRate
        : (monsters[spawnId]?.dropRate ?? 0)
    if (Math.random() < Math.min(0.95, baseChance + dropBonus)) {
        familiarId = spawnId
    }

    // Équipement
    let itemId = null
    const itemEntries = (area.lootTable || []).filter(e => e.itemId !== 'pierreDame' && !e.isKey)
    const rawItemChance = itemEntries.reduce((s, e) => s + e.dropRate, 0)
    const totalItemChance = Math.min(0.95, rawItemChance + dropBonus)
    if (Math.random() < totalItemChance) {
        let roll = Math.random() * rawItemChance
        for (const e of itemEntries) {
            roll -= e.dropRate
            if (roll <= 0) { itemId = e.itemId; break }
        }
    }

    // Clé de donjon
    let keyId = null
    for (const e of (area.lootTable || [])) {
        if (!e.isKey) continue
        if (Math.random() < e.dropRate) { keyId = e.itemId; break }
    }

    return { familiarId, itemId, keyId }
}

// ─── Accumulation des loots en batch (sans I/O) ──────────────────────────────

function _offlineBatchRoll(area, kills) {
    const familiarCounts = {}   // { monsterId: count }
    const itemCounts     = {}   // { itemId: count }
    const keyCounts      = {}   // { keyId: count }

    const total = area.spawns.reduce((s, sp) => s + sp.weight, 0)
    for (let i = 0; i < kills; i++) {
        // Spawn pondéré aléatoire
        let roll = Math.random() * total
        let spawnId = area.spawns[area.spawns.length - 1].id
        for (const sp of area.spawns) {
            roll -= sp.weight
            if (roll <= 0) { spawnId = sp.id; break }
        }

        const { familiarId, itemId, keyId } = _offlineOneLootRoll(area, spawnId)
        if (familiarId) familiarCounts[familiarId] = (familiarCounts[familiarId] || 0) + 1
        if (itemId)     itemCounts[itemId]         = (itemCounts[itemId] || 0) + 1
        if (keyId)      keyCounts[keyId]           = (keyCounts[keyId] || 0) + 1
    }
    return { familiarCounts, itemCounts, keyCounts }
}

// ─── Application des loots à l'état du jeu ───────────────────────────────────

function _offlineApplyLoot(area, kills) {
    const { familiarCounts, itemCounts, keyCounts } = _offlineBatchRoll(area, kills)
    const result = { familiarDrops: [], itemDrops: [], keyDrops: [], kamasFromDrops: 0 }

    for (const [monsterId, count] of Object.entries(familiarCounts)) {
        for (let i = 0; i < count; i++) {
            const drop = _captureFamiliar(monsterId)
            if (drop) result.familiarDrops.push(drop)
        }
    }

    for (const [itemId, count] of Object.entries(itemCounts)) {
        for (let i = 0; i < count; i++) {
            const r = addToInventory(itemId)
            if (!r) continue
            if (r.convertedToKamas) {
                result.kamasFromDrops += r.kamas || 1
            } else {
                result.itemDrops.push({ itemId, ...r })
            }
        }
    }

    for (const [keyId, count] of Object.entries(keyCounts)) {
        for (let i = 0; i < count; i++) addToInventory(keyId)
        result.keyDrops.push({ itemId: keyId, count })
    }

    return result
}

// ─── Application de l'XP en batch ────────────────────────────────────────────

function _offlineApplyXP(area, kills, team) {
    const results = []
    const avgLvl    = Math.round((area.mobMinLevel + area.mobMaxLevel) / 2)
    const refSpawnId = area.spawns[0]?.id
    const refMob    = monsters[refSpawnId]
    if (!refMob) return results

    const fakeEnemy = {
        id:     refSpawnId,
        level:  avgLvl,
        tier:   refMob.tier   || 'normal',
        rarity: refMob.rarity || 'commun'
    }

    for (let i = 0; i < team.length; i++) {
        const member = team[i]
        if (!member) continue
        const mult      = (i === 0) ? 1.0 : 0.5
        const xpPerKill = Math.floor(calculateXPReward(fakeEnemy, member) * mult)
        const totalXp   = xpPerKill * kills
        if (totalXp <= 0) continue
        const prevLevel = member.level
        const r = giveXP(member, totalXp)
        results.push({ member, xp: totalXp, prevLevel, ...r })
    }
    return results
}

// ─── Point d'entrée principal ─────────────────────────────────────────────────

function simulateOfflineProgress() {
    if (!state.combatStartTime || !state.currentArea) return

    const area = areas[state.currentArea]
    // Pas de simulation en donjon ou si zone inconnue
    if (!area || area.type === 'dungeon') {
        state.isRunning = false
        state.combatStartTime = null
        return
    }

    const now        = Date.now()
    const rawElapsed = now - state.combatStartTime
    if (rawElapsed < OFFLINE_MIN_MS) {
        state.isRunning = false
        state.combatStartTime = null
        return
    }
    const elapsed = Math.min(OFFLINE_CAP_MS, rawElapsed)

    const team = state.team.filter(Boolean)
    if (!team.length) {
        state.isRunning = false
        state.combatStartTime = null
        return
    }

    const msPerKill   = _offlineMsPerKill(area, team)
    const survivalMs  = _offlineSurvivalMs(area, team)
    const tickets     = state.offlineAutoPilotRemaining || 0

    // ── Simulation des sessions ──
    let timeLeft        = elapsed
    let ticketsLeft     = tickets
    let ticketsConsumed = 0
    let totalKills      = 0
    let survived        = false

    while (timeLeft > 0) {
        const sessionMs    = Math.min(timeLeft, survivalMs)
        const sessionKills = Math.max(0, Math.floor(sessionMs / msPerKill))
        totalKills += sessionKills
        timeLeft   -= sessionMs

        if (timeLeft <= 0) {
            survived = true   // l'équipe était encore en vie à notre retour
            break
        }
        // L'équipe est morte dans cette session
        if (ticketsLeft > 0) {
            ticketsLeft--
            ticketsConsumed++
        } else {
            survived = false
            break
        }
    }

    // ── Application des résultats ──
    const lootResult = _offlineApplyLoot(area, totalKills)
    const xpResults  = _offlineApplyXP(area, totalKills, team)

    state.totalKills = (state.totalKills || 0) + totalKills

    // Consommation des tickets de pilote automatique
    for (let i = 0; i < ticketsConsumed; i++) {
        const entry = state.inventory['piloteAutomatique']
        if (!entry || entry.count <= 0) break
        entry.count--
        if (entry.count <= 0) delete state.inventory['piloteAutomatique']
    }

    // Réinitialisation de l'état combat
    state.isRunning                  = false
    state.combatStartTime            = null
    state.offlineAutoPilotRemaining  = 0

    saveGame()

    showOfflineSummary({ elapsed, totalKills, survived, ticketsConsumed, lootResult, xpResults, area })
}

// ─── Affichage du résumé d'absence ───────────────────────────────────────────

function showOfflineSummary({ elapsed, totalKills, survived, ticketsConsumed, lootResult, xpResults, area }) {
    const el = document.getElementById('offline-summary')
    if (!el) return

    const h    = Math.floor(elapsed / 3_600_000)
    const m    = Math.floor((elapsed % 3_600_000) / 60_000)
    const duration = h > 0 ? `${h}h${String(m).padStart(2, '0')}` : `${m}min`

    // ── XP ──
    const xpHtml = xpResults.length > 0
        ? xpResults.map(r => {
            const cls        = classes[r.member.classId]
            const levelBadge = r.leveledUp
                ? `<span class="os-levelup">▲ Niv.${r.newLevel}</span>`
                : `<span class="os-level">Niv.${r.newLevel}</span>`
            return `<div class="os-xp-row">
                <img class="os-sprite" src="${cls?.image || 'img/icons/icon.png'}" onerror="this.src='img/icons/icon.png'">
                <span class="os-name">${cls?.name || '?'}</span>
                ${levelBadge}
                <span class="os-xp-val">+${r.xp.toLocaleString('fr-FR')} XP</span>
            </div>`
        }).join('')
        : `<span class="no-drop">Aucun gain d'XP</span>`

    // ── Familiers ──
    const famGroups = {}
    for (const fd of lootResult.familiarDrops) {
        if (!famGroups[fd.monsterId]) famGroups[fd.monsterId] = { ...fd, count: 0 }
        famGroups[fd.monsterId].count++
        famGroups[fd.monsterId].newLevel = fd.newLevel
        famGroups[fd.monsterId].isNew    = famGroups[fd.monsterId].isNew || fd.isNew
    }
    const famHtml = Object.keys(famGroups).length > 0
        ? Object.values(famGroups).map(g => {
            const mob = monsters[g.monsterId]
            if (!mob) return ''
            const countBadge = g.count > 1 ? `<span class="bubble-count">×${g.count}</span>` : ''
            return `<div class="game-bubble" title="${mob.name}${g.isNew ? ' (Nouveau !)' : ''}">
                <span class="bubble-level">Niv.${g.newLevel}</span>
                ${countBadge}
                <img src="${mob.image}" onerror="this.src='img/icons/icon.png'">
            </div>`
        }).join('')
        : `<span class="no-drop">Aucune Pierre d'âme...</span>`

    // ── Équipements ──
    const itemGroups = {}
    for (const d of lootResult.itemDrops) {
        if (!itemGroups[d.itemId]) itemGroups[d.itemId] = { ...d, qty: 0 }
        itemGroups[d.itemId].qty++
        if ((d.level || 0) > (itemGroups[d.itemId].level || 0)) itemGroups[d.itemId].level = d.level
    }
    let itemsHtml = Object.values(itemGroups).map(d => {
        const itm = item[d.itemId]
        if (!itm) return ''
        const badge = d.level > 0
            ? `<span class="bubble-level">Niv.${d.level}</span>`
            : d.qty > 1 ? `<span class="bubble-level">×${d.qty}</span>` : ''
        return `<div class="game-bubble" title="${itm.name}" onclick="showItemTooltip('${d.itemId}')">
            ${badge}
            <img src="${itm.image || 'img/icons/icon.png'}" onerror="this.src='img/icons/icon.png'">
        </div>`
    }).join('')

    // ── Clés ──
    for (const kd of lootResult.keyDrops) {
        const itm = item[kd.itemId]
        if (!itm) continue
        const badge = kd.count > 1 ? `<span class="bubble-level">×${kd.count}</span>` : ''
        itemsHtml += `<div class="game-bubble" title="${itm.name}" onclick="showItemTooltip('${kd.itemId}')">
            ${badge}
            <img src="${itm.image || 'img/icons/icon.png'}" onerror="this.src='img/icons/icon.png'">
        </div>`
    }

    // ── Kamas ──
    const kamasBubble = lootResult.kamasFromDrops > 0
        ? `<div class="game-bubble kamas-bubble" title="${lootResult.kamasFromDrops} kamas">
               <span class="bubble-level">+${lootResult.kamasFromDrops}</span>
               <img src="img/icons/kamas.png" onerror="this.src='img/icons/icon.png'">
           </div>`
        : ''

    if (!itemsHtml && !kamasBubble) itemsHtml = `<span class="no-drop">Rien cette fois...</span>`

    // ── Tickets consommés ──
    const ticketsHtml = ticketsConsumed > 0
        ? `<div class="os-tickets">🎟 ${ticketsConsumed} ticket${ticketsConsumed > 1 ? 's' : ''} de pilote automatique consommé${ticketsConsumed > 1 ? 's' : ''}</div>`
        : ''

    // ── Bouton d'action ──
    const actionHtml = survived
        ? `<div class="ae-btn ae-btn-rejoin" onclick="closeOfflineSummary(true)">
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6c0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8m0 14c-3.31 0-6-2.69-6-6c0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4l-4-4z"/></svg>
               Reprendre le combat
           </div>`
        : `<div class="ae-btn ae-btn-rejoin" onclick="closeOfflineSummary(false)">
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6c0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8m0 14c-3.31 0-6-2.69-6-6c0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4l-4-4z"/></svg>
               Retourner à la carte
           </div>`

    el.innerHTML = `
        <div class="offline-summary-box">
            <div class="ae-header">En votre absence</div>
            <div class="ae-title">${area.name} — ${duration}</div>
            <div class="os-status ${survived ? 'os-survived' : 'os-defeated'}">
                ${survived ? 'Votre équipe a tenu bon !' : 'Votre équipe a été vaincue...'}
            </div>
            <div class="os-kills">${totalKills.toLocaleString('fr-FR')} ennemi${totalKills > 1 ? 's' : ''} vaincu${totalKills > 1 ? 's' : ''}</div>
            ${ticketsHtml}
            <div class="ae-box">
                <div class="ae-box-title">XP gagnée</div>
                <div class="os-xp-list">${xpHtml}</div>
            </div>
            <div class="ae-box">
                <div class="ae-box-title">Familiers collectés</div>
                <div class="ae-box-content ae-bubbles">${famHtml}</div>
            </div>
            <div class="ae-box">
                <div class="ae-box-title">Objets obtenus</div>
                <div class="ae-box-content ae-bubbles">${itemsHtml}${kamasBubble}</div>
            </div>
            <div class="ae-actions">
                ${actionHtml}
                <div class="ae-btn ae-btn-quit" onclick="closeOfflineSummary(false)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"/></svg>
                    Fermer
                </div>
            </div>
        </div>`

    el.style.display = 'flex'
}

function closeOfflineSummary(resume) {
    const el = document.getElementById('offline-summary')
    if (el) el.style.display = 'none'
    if (resume && state.currentArea) {
        startCombat(state.currentArea)
    } else {
        if (typeof updateZoneUI === 'function') updateZoneUI()
    }
}
