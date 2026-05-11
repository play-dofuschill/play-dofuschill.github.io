// engine/combat.js — Boucle de combat auto-battler DofusChill
//
// Chaque membre + l'ennemi a une barre de progression (0–100).
// La barre avance proportionnellement à la vitesse de lancé du sort
// À 100%, l'entité exécute son action et la barre se remet à 0.

const TICK_MS    = 1000 / 60   // 60 fps
const BASE_TIME  = 2000        // ms pour remplir la barre


let combatLoop  = null
let combat      = null  // état du combat en cours
let _autoPilot  = null  // { remaining: N, accumulated: sessionLoot } | null

// ─── gestion de l'xp ────────────────────────────────────────────────────────

const RARITY_MULTIPLIER = {
    commun: 1,
    peu_commun: 1.15,
    rare: 1.35,
    legendaire: 2
}

const TIER_MULTIPLIER = {
    normal: 1,
    elite: 2,
    boss: 3
}

function getBaseMobXP(level) {
    return 20 + (level * 8)
}

function getLevelPenalty(playerLevel, mobLevel) {
    const diff = playerLevel - mobLevel

    // Fenêtre XP : mob plus de 9 niveaux en dessous du joueur → 0 XP
    if (diff > 9) return 0

    // Mob plus fort que le joueur → léger bonus
    if (diff < 0) return 1 + Math.abs(diff) * 0.05

    // Dans la fenêtre (diff 0–9) : réduction douce, minimum 20%
    return Math.max(0.2, 1 - diff * 0.05)
}

function calculateXPReward(enemy, member) {

    const baseXP = getBaseMobXP(enemy.level)

    const rarityMult = RARITY_MULTIPLIER[enemy.rarity] || 1

    const tierMult = TIER_MULTIPLIER[enemy.tier] || 1

    const levelPenalty = getLevelPenalty(member.level, enemy.level)

    return Math.floor(baseXP * rarityMult * tierMult * levelPenalty)
}

// ─── Spawn de l'ennemi ────────────────────────────────────────────────────────

function randomInt(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min
}

function spawnEnemy(areaId) {
    const area = areas[areaId]
    if (!area) return null

    // Sélection pondérée
    const total = area.spawns.reduce((s, sp) => s + sp.weight, 0)
    let roll    = Math.random() * total
    let spawnId = area.spawns[area.spawns.length - 1].id
    for (const sp of area.spawns) {
        roll -= sp.weight
        if (roll <= 0) { spawnId = sp.id; break }
    }

    

    const mobLevel = randomInt(area.mobMinLevel, area.mobMaxLevel)
    const mob   = monsters[spawnId]
    const scale = 1 + (mobLevel - area.mobMinLevel) * 0.05


    if (!state.seenMonsters) state.seenMonsters = {}
    state.seenMonsters[spawnId] = true

    return {
        id:       spawnId,
        name:     mob.name,
        element:  mob.element,
        level:    mobLevel,
        image:    mob.image,
        maxHp:    Math.floor(mob.bst.hp  * scale),
        currentHp:Math.floor(mob.bst.hp  * scale),
        atk:      Math.floor(mob.bst.atk * scale),
        spd:      mob.bst.spd,          // vitesse native 100 (pas de scaling par niveau)
        res:      { ...mob.bst.res },
        bonusAtkPct: 0,
        flatBonus:   0,
        moves:    mob.moves || [],
        rarity: mob.rarity || 'commun',
        tier: mob.tier || 'normal',
        dropRate: mob.dropRate
    }
}

// ─── Démarrage / arrêt ────────────────────────────────────────────────────────

function startCombat(areaId) {
    stopCombat()
    state.currentArea = areaId
    state.isRunning   = true

    // Réinitialise les HP de l'équipe
    for (const m of state.team) {
        if (!m) continue
        const stats = getEffectiveStats(m)
        if (stats) { m.maxHp = stats.hp; m.currentHp = stats.hp }
        m.buffs  = []
        m.dots   = []
        m.shield = null
    }

    combat = {
        memberTimers: state.team.map(() => 0),
        memberMoveIndex: state.team.map(() => 0),
        activeMemberIndex: 0,
        enemyTimer: 0,
        log: [],
        pendingLoot: null,
        savedEnemy: null,
        sessionLoot: { itemDrops: [], familiarDrops: [], caisseCount: 0, kamasFromDrops: 0, killCount: 0, memberDamage: {}, learnedMoves: [] }
    }
    combat.enemy = spawnEnemy(areaId)
    combat.enemyNextMoveId = pickNextEnemyMove(combat.enemy)

    document.getElementById('content-explore').style.display = 'flex'
    document.getElementById('area-end').style.display    = 'none'
    const exploreTeam  = document.getElementById('explore-team')
    const exploreLeave = document.getElementById('explore-leave')
    const enemyDisplay = document.getElementById('enemy-display')
    if (exploreTeam)  exploreTeam.style.display  = ''
    if (exploreLeave) exploreLeave.style.display = ''
    if (enemyDisplay) enemyDisplay.style.display = ''
    const menuParent = document.getElementById('menu-button-parent')
    if (menuParent) menuParent.style.display = ''
    updateCombatUI()

    combatLoop = setInterval(gameTick, TICK_MS)
}

function stopCombat() {
    if (combatLoop) { clearInterval(combatLoop); combatLoop = null }
    state.isRunning = false
}

function exitCombat() {
    stopCombat()
    state.currentArea = null
    combat = null

    // Remet les HP à fond entre deux sessions (XP/niveau conservés)
    for (const m of state.team) {
        if (!m) continue
        const stats = getEffectiveStats(m)
        if (stats) { m.maxHp = stats.hp; m.currentHp = stats.hp }
        m.buffs = []
    }

    advanceTutorial('outro')
    document.getElementById('content-explore').style.display = 'none'
    document.getElementById('area-end').style.display = 'none'
    const menuParent = document.getElementById('menu-button-parent')
    if (menuParent) menuParent.style.display = state.hasChosenStarter ? '' : 'none'
    saveGame()
    if (typeof updateCollectionUI === 'function') updateCollectionUI()
}

function leaveCombat() {
    stopCombat()
    if (_autoPilot) {
        _mergeSessionLoot(_autoPilot.accumulated, combat?.sessionLoot)
        if (combat) combat.sessionLoot = _autoPilot.accumulated
        _autoPilot = null
    }
    showSessionSummary('leave')
}

function rejoinArea() {
    if (!state.currentArea) return
    document.getElementById('main-content').style.zIndex = ''
    startCombat(state.currentArea)
}

// ─── Pilote automatique ───────────────────────────────────────────────────────

function _emptySessionLoot() {
    return { itemDrops: [], familiarDrops: [], caisseCount: 0, kamasFromDrops: 0, killCount: 0, memberDamage: {}, learnedMoves: [] }
}

function _mergeSessionLoot(dest, src) {
    if (!src) return
    dest.itemDrops.push(...(src.itemDrops || []))
    dest.familiarDrops.push(...(src.familiarDrops || []))
    dest.caisseCount    += src.caisseCount    || 0
    dest.kamasFromDrops += src.kamasFromDrops || 0
    dest.killCount      += src.killCount      || 0
    dest.learnedMoves.push(...(src.learnedMoves || []))
    for (const [idx, dmg] of Object.entries(src.memberDamage || {})) {
        dest.memberDamage[idx] = (dest.memberDamage[idx] || 0) + dmg
    }
}

function startAutoPilot(qty) {
    const available = state.inventory['piloteAutomatique']?.count || 0
    const n = qty === 'max' ? available : Math.min(qty, available)
    if (n <= 0) return
    _autoPilot = { remaining: n, accumulated: _emptySessionLoot() }
    rejoinArea()
}

function _consumeAutoPilotTicket() {
    const entry = state.inventory['piloteAutomatique']
    if (!entry) return
    entry.count--
    if (entry.count <= 0) delete state.inventory['piloteAutomatique']
}

// ─── Tick principal ───────────────────────────────────────────────────────────

function gameTick() {
    if (!combat || !combat.enemy) return
    try {

    // Avance le timer du membre actif uniquement
    _autoSwitchActive()
    const activeIdx = combat.activeMemberIndex
    const activeM   = state.team[activeIdx]
    if (activeM && activeM.currentHp > 0) {
        const stats = getEffectiveStats(activeM)
        const rate  = (100 / (BASE_TIME / TICK_MS)) * ((stats.spd || 100) / 100)
        combat.memberTimers[activeIdx] = (combat.memberTimers[activeIdx] || 0) + rate

        if (combat.memberTimers[activeIdx] >= 100) {
            combat.memberTimers[activeIdx] = 0
            if (combat.enemy && combat.enemy.currentHp > 0 && !combat.respawnPending) executeMemberAction(activeIdx)
        }
    }

    // Timer de l'ennemi
    if (combat.enemy && combat.enemy.currentHp > 0 && !combat.respawnPending) {
        const rate = (100 / (BASE_TIME / TICK_MS)) * ((combat.enemy.spd || 100) / 100)
        combat.enemyTimer = (combat.enemyTimer || 0) + rate
        if (combat.enemyTimer >= 100) {
            combat.enemyTimer = 0
            executeEnemyAction()
        }
    }

    updateCombatUI()
    } catch(e) { console.error('[gameTick]', e) }
}

// ─── Actions ─────────────────────────────────────────────────────────────────

function executeMemberAction(memberIndex) {

    const member = state.team[memberIndex]
    if (!member) return

    // DOTs du membre tick avant son action
    tickDots(member, () => {
        _autoSwitchActive()
        if (state.team.every(m => !m || m.currentHp <= 0)) onDefeat()
    })
    if (member.currentHp <= 0) return

    const stats = getEffectiveStats(member)

    const slots = ['slot1', 'slot2', 'slot3', 'slot4']
    const nonNull = slots.filter(s => member.moves[s])

    if (!nonNull.length) return

    // rotation cyclique
    const idx =
        combat.memberMoveIndex[memberIndex] % nonNull.length

    const moveId =
        member.moves[nonNull[idx]]

    combat.memberMoveIndex[memberIndex]++

    const rawMv = move[moveId]
    if (!rawMv) return
    const mv = applyProgression(rawMv, member.level)

    if (!mv?.effects) return

    // exécution des effets
    let lastDamageDealt = 0
    let sessionDmg = 0
    for (const effect of mv.effects) {
        const dmg = executeEffect({
            caster: member, casterStats: stats, targetEnemy: combat.enemy,
            effect, moveData: mv, lastDamageDealt,
            onTargetKill: () => {
                if (combat.enemy?.isSummon) returnToOwner()
                else onVictory()
            }
        })
        if (dmg !== undefined) { lastDamageDealt = dmg; sessionDmg += dmg }
    }
    if (sessionDmg > 0) {
        combat.sessionLoot.memberDamage[memberIndex] = (combat.sessionLoot.memberDamage[memberIndex] || 0) + sessionDmg
    }

    tickBuffs(member)
}

function executeEffect(ctx) {

    const {caster, casterStats, targetEnemy, effect, moveData} = ctx

    switch (effect.type) {

        case 'damage': {
            // Défense effective : stats passées (attaque sur joueur) ou buffs actifs (attaque sur ennemi)
            const defStats = ctx.targetStats || {
                res: targetEnemy.res || {},
                damageReductionPct: (targetEnemy.buffs || [])
                    .filter(b => b.stat === 'damageReductionPct')
                    .reduce((sum, b) => sum + b.value, 0)
            }
            const result = calcDamage(casterStats, defStats, effect)
            let dmg = result.damage

            // Le bouclier absorbe en priorité avant les HP
            if (targetEnemy.shield?.value > 0) {
                const absorbed = Math.min(targetEnemy.shield.value, dmg)
                targetEnemy.shield.value -= absorbed
                dmg -= absorbed
                if (targetEnemy.shield.value <= 0) targetEnemy.shield = null
            }

            targetEnemy.currentHp = Math.max(0, targetEnemy.currentHp - dmg)
            const absNote = dmg < result.damage ? ` (${result.damage - dmg} absorbés)` : ''
            addLog(`${ctx.logPrefix || ''}${moveData.name} → ${result.damage} dégâts${absNote}`)
            if (result.isCrit) addLog(`💥 Coup critique !`)
            if (targetEnemy.currentHp <= 0) ctx.onTargetKill?.()
            return dmg
        }

        case 'dot': {
            targetEnemy.dots = targetEnemy.dots || []
            targetEnemy.dots.push({ element: effect.element, value: effect.value, duration: effect.duration })
            addLog(`${ctx.logPrefix || ''}${moveData.name} → brûlure ${effect.value}/tour (${effect.duration} tours)`)
            break
        }

        case 'heal': {
            const healAmt = effect.heal || 0
            caster.currentHp = Math.min(caster.maxHp, (caster.currentHp || 0) + healAmt)
            addLog(`${moveData.name} → soigne ${healAmt} PV`)
            break
        }

        case 'heal_team': {
            const healAmt = effect.heal || 0
            for (const m of state.team) {
                if (!m || m.currentHp <= 0) continue
                m.currentHp = Math.min(m.maxHp, (m.currentHp || 0) + healAmt)
            }
            addLog(`${moveData.name} → soigne ${healAmt} PV (équipe)`)
            break
        }

        case 'buff': {
            caster.buffs = caster.buffs || []
            caster.buffs.push({ stat: effect.stat, value: effect.value, duration: effect.duration })
            addLog(`${moveData.name} → +${effect.value} ${effect.stat} (${effect.duration} tours)`)
            break
        }

        case 'buff_team': {
            for (const m of state.team) {
                if (!m || m.currentHp <= 0) continue
                m.buffs = m.buffs || []
                m.buffs.push({ stat: effect.stat, value: effect.value, duration: effect.duration })
            }
            addLog(`${moveData.name} → +${effect.value} ${effect.stat} équipe (${effect.duration} tours)`)
            break
        }

        case 'debuff': {
            // Applique un buff négatif à la cible
            targetEnemy.buffs = targetEnemy.buffs || []
            targetEnemy.buffs.push({ stat: effect.stat, value: -effect.value, duration: effect.duration })
            addLog(`${ctx.logPrefix || ''}${moveData.name} → -${effect.value} ${effect.stat} (${effect.duration} tours)`)
            break
        }

        case 'shield': {
            // N'applique pas si un bouclier est déjà actif (mais les autres effets du sort passent quand même)
            if (caster.shield?.value > 0) break
            caster.shield = { value: effect.value, duration: effect.duration }
            addLog(`${moveData.name} → bouclier ${effect.value} PV (${effect.duration} tours)`)
            break
        }

        case 'lifesteal': {
            const healAmt = Math.floor((ctx.lastDamageDealt || 0) * (effect.ratio || 0))
            if (healAmt > 0) {
                caster.currentHp = Math.min(caster.maxHp, (caster.currentHp || 0) + healAmt)
                addLog(`${moveData.name} → soigne ${healAmt} PV`)
            }
            break
        }

        case 'summon': {
            spawnSummon(caster, effect)
            break
        }
    }
}

function executeEnemyAction() {

    if (!combat.enemy || combat.enemy.currentHp <= 0) return

    // DOTs de l'ennemi tick avant son action
    tickDots(combat.enemy, () => {
        if (combat.enemy?.isSummon) returnToOwner()
        else onVictory()
    })
    if (!combat.enemy || combat.enemy.currentHp <= 0) return

    const moveId = combat.enemy.moves[Math.floor(Math.random() * combat.enemy.moves.length)]
    if (!moveId) return
    const mv = move[moveId]
    if (!mv?.effects) return

    // cible = membre actif
    const target = state.team[combat.activeMemberIndex]
    if (!target || target.currentHp <= 0) { onDefeat(); return }

    // Stats d'attaque de l'ennemi (buffs actifs inclus)
    const enemyStats = {
        atk:               combat.enemy.atk || 0,
        flatDamage:        0,
        finalDamagePct:    0,
        spellDamagePct:    0,
        damageReductionPct: 0,
        critChance:        0,
        critDamagePct:     50,
        res:               combat.enemy.res || {}
    }
    for (const b of (combat.enemy.buffs || [])) {
        if (b.stat in enemyStats) enemyStats[b.stat] += b.value
    }

    const targetStats = getEffectiveStats(target)
    const logPrefix   = `${combat.enemy.name} utilise `

    let lastDamageDealt = 0
    for (const effect of mv.effects) {
        const dmg = executeEffect({
            caster:      combat.enemy,
            casterStats: enemyStats,
            targetEnemy: target,
            targetStats,
            effect,
            moveData:    mv,
            lastDamageDealt,
            logPrefix,
            onTargetKill: () => {
                _autoSwitchActive()
                if (state.team.every(m => !m || m.currentHp <= 0)) onDefeat()
            }
        })
        if (dmg !== undefined) lastDamageDealt = dmg
    }

    tickBuffs(combat.enemy)

    // Pré-sélection du prochain sort ennemi pour l'affichage
    if (combat.enemy) combat.enemyNextMoveId = pickNextEnemyMove(combat.enemy)

    // Décompte des actions du familier invoqué
    if (combat.enemy?.isSummon) {
        combat.enemy.actionsRemaining--
        if (combat.enemy.actionsRemaining <= 0) returnToOwner()
    }
}

function pickNextEnemyMove(enemy) {
    if (!enemy?.moves?.length) return null
    return enemy.moves[Math.floor(Math.random() * enemy.moves.length)]
}

// ─── DOTs ────────────────────────────────────────────────────────────────────

function tickDots(entity, onKill) {
    if (!entity.dots?.length) return
    for (const dot of entity.dots) {
        entity.currentHp = Math.max(0, entity.currentHp - dot.value)
        addLog(`Brûlure → ${dot.value} dégâts`)
    }
    entity.dots = entity.dots
        .map(d => ({ ...d, duration: d.duration - 1 }))
        .filter(d => d.duration > 0)
    if (entity.currentHp <= 0) onKill?.()
}

// ─── Invocations ─────────────────────────────────────────────────────────────

function spawnSummon(caster, effect) {
    const mob = monsters[effect.summonId]
    if (!mob) return
    const level = caster.level || 1
    const scale = 1 + ((level - 1) * 0.08)
    combat.savedEnemy = combat.enemy
    combat.enemy = {
        id:               effect.summonId,
        name:             mob.name,
        level,
        image:            mob.image,
        maxHp:            Math.floor(mob.bst.hp  * scale),
        currentHp:        Math.floor(mob.bst.hp  * scale),
        atk:              Math.floor(mob.bst.atk * scale),
        spd:              mob.bst.spd,
        res:              { ...mob.bst.res },
        bonusAtkPct:      0,
        flatBonus:        0,
        moves:            mob.moves || [],
        rarity:           mob.rarity  || 'commun',
        tier:             mob.tier    || 'normal',
        dropRate:         0,
        buffs:            [],
        dots:             [],
        isSummon:         true,
        actionsRemaining: effect.duration
    }
    combat.enemyTimer = 0
    addLog(`${caster.name} invoque ${mob.name} !`)
}

function returnToOwner() {
    if (!combat.savedEnemy) return
    addLog(`${combat.savedEnemy.name} reprend le combat !`)
    combat.enemy      = combat.savedEnemy
    combat.savedEnemy = null
    combat.enemyTimer = 0
}

// ─── Victoire / Défaite ───────────────────────────────────────────────────────

function onVictory() {
    // Double-appel possible si un sort a plusieurs effets de dégâts — on ignore les suivants
    if (combat.respawnPending) return
    combat.respawnPending = true

    // Capture l'ennemi — on le garde en place pour que le UI reste stable pendant
    // les 500ms de respawn ; gameTick ignore les actions quand respawnPending est vrai
    const defeatedEnemy = combat.enemy

    try {
        const loot = processVictoryLoot(defeatedEnemy)

        loot.xpResults = []

        for (let i = 0; i < state.team.length; i++) {
            const member = state.team[i]
            if (!member || member.currentHp <= 0) continue          // mort → 0 XP
            const mult   = (i === combat.activeMemberIndex) ? 1.0 : 0.5
            const xp     = Math.floor(calculateXPReward(defeatedEnemy, member) * mult)
            const result = giveXP(member, xp)
            loot.xpResults.push({ member, xp, ...result })
        }
        combat.pendingLoot = loot
        combat.sessionLoot.killCount++

        // Accumule le loot de session
        if (loot.itemDrops?.length > 0) {
            for (const d of loot.itemDrops) {
                if (d.convertedToKamas) {
                    combat.sessionLoot.kamasFromDrops += d.kamas || 10
                } else {
                    combat.sessionLoot.itemDrops.push(d)
                }
            }
        }
        if (loot.familiarDrop) {
            combat.sessionLoot.familiarDrops.push(loot.familiarDrop)
            if (activeMenu === 'collection' || activeMenu === 'Encyclopedie') updateCollectionUI()
        }
        if (loot.caisseDropped) {
            combat.sessionLoot.caisseCount++
        }
        let anyLevelUp = false
        if (loot.xpResults) {
            for (const r of loot.xpResults) {
                if (r.leveledUp) {
                    anyLevelUp = true
                    showNotification(`${classes[r.member.classId]?.name} → Niveau ${r.newLevel} !`, 'level')
                }
                for (const moveId of (r.newMoves || [])) {
                    combat.sessionLoot.learnedMoves.push({ member: r.member, moveId })
                }
            }
        }
        // Persiste immédiatement les niveaux gagnés pour ne pas les perdre en cas de changement de team
        if (anyLevelUp) saveGame()

        // Donjon : victoire finale — consomme la clé et affiche l'écran de fin
        if (areas[state.currentArea]?.type === 'dungeon') {
            combat.respawnPending = false
            stopCombat()
            consumeDungeonKey(state.currentArea)
            showSessionSummary('dungeon')
            return
        }
    } catch(e) {
        console.error('[onVictory] erreur traitement loot:', e)
    }

    // Respawn ennemi (zone normale) — garanti même si le bloc loot a throw
    setTimeout(() => {
        combat.respawnPending = false
        if (!state.isRunning || !state.currentArea) return
        for (const m of state.team) {
            if (!m) continue
            m.buffs  = []
            m.dots   = []
            m.shield = null
        }
        combat.enemy          = spawnEnemy(state.currentArea)
        combat.enemyNextMoveId = pickNextEnemyMove(combat.enemy)
        combat.savedEnemy     = null
        combat.enemyTimer     = 0
        updateCombatUI()
    }, 500)
}

function onDefeat() {
    stopCombat()
    state.isRunning = false
    combat.enemy = null

    if (_autoPilot && _autoPilot.remaining > 0) {
        _mergeSessionLoot(_autoPilot.accumulated, combat.sessionLoot)
        _consumeAutoPilotTicket()
        _autoPilot.remaining--
        saveGame()
        if (_autoPilot.remaining > 0 && (state.inventory['piloteAutomatique']?.count || 0) > 0) {
            setTimeout(() => rejoinArea(), 800)
            return
        }
        combat.sessionLoot = _autoPilot.accumulated
        _autoPilot = null
        showSessionSummary('leave')
        return
    }

    showSessionSummary('defeat')
}

// ─── Utilitaires ─────────────────────────────────────────────────────────────

function getMostWoundedMember() {
    let worst = null, worstRatio = 1
    for (const m of state.team) {
        if (!m || m.currentHp <= 0) continue
        const maxHp = m.maxHp || 1
        const ratio = m.currentHp / maxHp
        if (ratio < worstRatio) { worstRatio = ratio; worst = m }
    }
    return worst
}

function tickBuffs(entity) {
    if (entity.buffs) {
        entity.buffs = entity.buffs
            .map(b => ({ ...b, duration: b.duration - 1 }))
            .filter(b => b.duration > 0)
    }
    if (entity.shield) {
        entity.shield.duration--
        if (entity.shield.duration <= 0) entity.shield = null
    }
}

function addLog(msg) {
    if (!combat) return
    combat.log.unshift(msg)
    if (combat.log.length > 8) combat.log.pop()
}

function setActiveMember(index) {
    if (!combat || !state.isRunning) return
    const m = state.team[index]
    if (!m || m.currentHp <= 0) return
    combat.activeMemberIndex = index
    updateCombatUI()
}

function _autoSwitchActive() {
    if (!combat) return
    const cur = state.team[combat.activeMemberIndex]
    if (cur && cur.currentHp > 0) return
    const next = state.team.findIndex(m => m && m.currentHp > 0)
    if (next !== -1) combat.activeMemberIndex = next
}
