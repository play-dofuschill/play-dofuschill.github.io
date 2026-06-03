// ui/combat.js — Affichage du combat DofusChill

let _enemyMoveRenderKey = null

function updateCombatUI() {
    if (combat?.isRaid) {
        updateEnemyDisplayRaid()
    } else {
        updateEnemyDisplay()
    }
    updateMemberBars()
    updateResourceBubbles()
    _updateAutoPilotIndicator()
}

function _updateAutoPilotIndicator() {
    let el = document.getElementById('autopilot-indicator')
    if (typeof _autoPilot === 'undefined' || !_autoPilot) {
        if (el) el.remove()
        return
    }
    if (!el) {
        el = document.createElement('div')
        el.id = 'autopilot-indicator'
        const leaveBtn = document.getElementById('explore-leave')
        if (leaveBtn) leaveBtn.parentNode.insertBefore(el, leaveBtn)
        else return
    }
    const piloteItem = typeof item !== 'undefined' && item['piloteAutomatique']
    el.innerHTML = `${piloteItem ? `<img src="${piloteItem.image}" onerror="this.src='img/icons/icon.png'">` : ''}
        Pilote auto — <strong>${_autoPilot.remaining}</strong> restant${_autoPilot.remaining > 1 ? 's' : ''}`
}

// ─── Indicateurs miniatures en haut ──────────────────────────────────────────

function updateTeamIndicators() {
    for (let i = 1; i <= 6; i++) {
        const el = document.getElementById(`team-indicator-slot-${i}`)
        if (!el) continue
        const member = state.team[i - 1]
        if (member) {
            el.src = getMemberImage(member)
            el.style.opacity = member.currentHp > 0 ? '1' : '0.3'
        } else {
            el.src = 'img/icons/icon.png'
            el.style.opacity = '0.3'
        }
    }
}

// ─── Section ennemi ───────────────────────────────────────────────────────────

function updateEnemyDisplay() {
    const container = document.getElementById('enemy-display')
    if (!container) return

    if (!combat || !combat.enemy) {
        container.style.display = 'none'
        return
    }
    container.style.display = 'flex'

    // Background de scène selon la zone (kanojedo pour le Poutch)
    const bgName = combat?.isPoutch ? 'kanojedo' : (areas[state.currentArea]?.background || null)
    container.style.backgroundImage = bgName
        ? `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.55)), url(img/bg/${bgName}.png)`
        : 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))'

    const e      = combat.enemy
    const hpPct  = Math.max(0, Math.floor((e.currentHp / e.maxHp) * 100))
    const timer  = Math.min(100, combat.enemyTimer || 0)

    const nameEl   = document.getElementById('enemy-name')
    const levelEl  = document.getElementById('enemy-level')
    const elemEl   = document.getElementById('enemy-element')
    const spriteEl = document.getElementById('enemy-sprite')
    const hpFill   = document.getElementById('enemy-hp-fill')
    const hpText   = document.getElementById('enemy-hp-text')

    if (nameEl)   nameEl.textContent  = e.name
    if (levelEl)  levelEl.textContent = `lvl ${e.level}`
    if (elemEl)   { elemEl.textContent = e.element || ''; elemEl.className = `elem-badge elem-${e.element}` }
    if (spriteEl) { spriteEl.src = e.image; spriteEl.onerror = () => spriteEl.src = 'img/icons/icon.png' }
    if (hpFill)   { hpFill.style.width = `${hpPct}%`; hpFill.className = `hp-fill ${hpPct < 25 ? 'hp-low' : hpPct < 50 ? 'hp-mid' : ''}` }
    if (hpText)   hpText.textContent = `${e.currentHp} / ${e.maxHp}`

    const movesContainer = document.getElementById('enemy-moves-container')
    if (movesContainer) {
        const moveKey = (e.moves || []).join(',') + '|' + (combat.enemyNextMoveId || '')
        if (moveKey !== _enemyMoveRenderKey) {
            _enemyMoveRenderKey = moveKey
            renderEnemyMoves(movesContainer, e, timer)
        } else {
            const nextIdx = (e.moves || []).indexOf(combat.enemyNextMoveId)
            movesContainer.querySelectorAll('.combat-move-fill').forEach((f, idx) => {
                f.style.width = `${idx === nextIdx ? timer : 0}%`
            })
        }
    }
}

function renderEnemyMoves(container, enemy, timer) {
    const slots = [null, null, null, null]
    ;(enemy.moves || []).slice(0, 4).forEach((id, i) => { slots[i] = id })
    const nextIdx = slots.indexOf(combat.enemyNextMoveId)

    container.innerHTML = slots.map((moveId, idx) => {
        if (!moveId) {
            return `<div class="combat-move-bar combat-move-empty"><span class="combat-move-name">—</span></div>`
        }
        const mv      = move[moveId]
        const elem    = mv?.effects?.[0]?.element || 'neutre'
        const mvType  = mv?.effects?.[0]?.type || ''
        const barElem = mvType === 'buff' ? 'buff' : mvType === 'debuff' ? 'debuff' : elem
        const fillW   = idx === nextIdx ? timer : 0
        return `<div class="combat-move-bar elem-bar-${barElem}" data-move-id="${moveId}" data-caster-enemy="1">
            <div class="combat-move-fill elem-bar-${barElem}" style="width:${fillW}%"></div>
            <span class="combat-move-name">${mv?.name || '—'}${moveRestrictionSigle(mv, elem)}</span>
            <div class="combat-move-icon-bg elem-bar-${barElem}">${elemIcon(moveIconKey(mv), 'combat-move-icon')}</div>
        </div>`
    }).join('')
}

// ─── Cartes des membres ───────────────────────────────────────────────────────

function updateMemberBars() {
    const container = document.getElementById('explore-team')
    if (!container) return

    if (combat?.isRaid) {
        updateMemberBarsRaid(container)
        return
    }

    container.classList.remove('raid-mode')
    const members  = state.team.filter(Boolean)
    const existing = container.querySelectorAll('.explore-team-member')

    // Re-render si le nombre de membres ou si les sorts ont changé
    let needsRender = existing.length !== members.length
    if (!needsRender) {
        const slots = ['slot1','slot2','slot3','slot4']
        members.forEach((m, i) => {
            const card = existing[i]
            if (!card) { needsRender = true; return }
            const moveKey = slots.map(s => m.moves[s] || '').join(',')
            if (card.dataset.moveKey !== moveKey) needsRender = true
        })
    }
    if (needsRender) {
        renderTeamSlots(container)
        return
    }

    state.team.filter(Boolean).forEach((m, i) => {
        const card    = existing[i]
        if (!card) return
        const teamIdx = state.team.indexOf(m)
        const timer   = combat?.memberTimers?.[teamIdx] || 0
        const maxHp   = m.maxHp || 1
        const hpPct   = Math.max(0, Math.floor((m.currentHp / maxHp) * 100))
        const xpPct   = Math.min(100, Math.floor(((m.exp || 0) / getXPRequired(m.level)) * 100))
        const nextIdx = getNextMoveIndex(m, teamIdx)
        const isActive = combat?.activeMemberIndex === teamIdx

        const hpFill = card.querySelector('.member-hp-fill')
        if (hpFill) { hpFill.style.width = `${hpPct}%`; hpFill.className = `member-hp-fill ${hpPct < 25 ? 'hp-low' : hpPct < 50 ? 'hp-mid' : ''} ${m.shield?.value > 0 ? 'hp-shield' : ''}` }
        const hpBarText = card.querySelector('.member-hp-bar .hp-bar-text')
        if (hpBarText) hpBarText.textContent = `${m.currentHp}/${maxHp}${m.shield?.value > 0 ? ' • ' + m.shield.value : ''}`

        const xpFill = card.querySelector('.member-xp-fill')
        if (xpFill) xpFill.style.width = `${xpPct}%`

        const lvlBadge = card.querySelector('.level-badge')
        if (lvlBadge) {
            const isCapped = combat?.syncedLevel && m.level > combat.syncedLevel
            lvlBadge.textContent = `lvl ${isCapped ? combat.syncedLevel : m.level}`
            lvlBadge.classList.toggle('level-synced', !!isCapped)
        }

        card.querySelectorAll('.combat-move-fill').forEach((f, idx) => {
            f.style.width = `${idx === nextIdx && isActive ? Math.min(100, timer) : 0}%`
        })

        card.style.opacity = m.currentHp > 0 ? '1' : '0.4'
        card.classList.toggle('combat-active', isActive)
    })
}

function renderTeamSlots(container) {
    container.innerHTML = ''
    const slots = ['slot1','slot2','slot3','slot4']
    state.team.filter(Boolean).forEach(m => {
        const cls     = classes[m.classId]
        const maxHp   = m.maxHp || getEffectiveStats(m)?.hp || 1
        const hpPct   = Math.max(0, Math.floor((m.currentHp / maxHp) * 100))
        const xpPct   = Math.min(100, Math.floor(((m.exp || 0) / getXPRequired(m.level)) * 100))
        const teamIdx = state.team.indexOf(m)
        const nextIdx = getNextMoveIndex(m, teamIdx)
        const moveKey = slots.map(s => m.moves[s] || '').join(',')

        // Toujours 4 barres — les slots vides affichent un placeholder grisé
        let fillCount = 0
        const moveBars = slots.map(s => {
            const moveId = m.moves[s]
            if (!moveId) {
                return `<div class="combat-move-bar combat-move-empty">
                    <span class="combat-move-name">—</span>
                </div>`
            }
            const mv      = move[moveId]
            const elem    = mv?.effects?.[0]?.element || 'neutre'
            const mvType  = mv?.effects?.[0]?.type || ''
            const barElem = mvType === 'buff' ? 'buff' : mvType === 'debuff' ? 'debuff' : elem
            fillCount++
            return `<div class="combat-move-bar elem-bar-${barElem}" data-move-id="${moveId}" data-caster-class="${m.classId}">
                <div class="combat-move-fill elem-bar-${barElem}" style="width:0%"></div>
                <span class="combat-move-name">${mv?.name || '—'}${moveRestrictionSigle(mv, elem)}</span>
                <div class="combat-move-icon-bg elem-bar-${barElem}">${elemIcon(moveIconKey(mv), 'combat-move-icon')}</div>
            </div>`
        }).join('')

        const isActive = combat?.activeMemberIndex === teamIdx
        const summonOwner = m.isSummon ? (combat?.savedMembers?.[teamIdx] || null) : null
        const summonScale = summonOwner ? ((summons[m.id] || monsters[m.id])?.scale || 1) : 1
        const summonHeight = `${summonScale * 50}%`
        const div = document.createElement('div')
        div.className = `explore-team-member team-menu-card${isActive ? ' combat-active' : ''}`
        div.dataset.teamIdx = teamIdx
        div.dataset.help    = m.classId
        div.dataset.moveKey = moveKey
        div.onclick = () => setActiveMember(teamIdx)
        div.style.opacity = m.currentHp > 0 ? '1' : '0.4'
        div.innerHTML = `
            <div class="explore-team-member-flair"></div>
            <div class="member-sprite-wrap">
                <img class="member-sprite${summonOwner ? ' member-sprite-has-summon' : ''}" src="${summonOwner ? getMemberImage(summonOwner) : getMemberImage(m)}" onerror="this.src='img/icons/icon.png'">
                ${summonOwner ? `<img class="member-summon-sprite" src="${getMemberImage(m)}" style="height:${summonHeight}" onerror="this.src='img/icons/icon.png'">` : ''}
            </div>
            <div class="member-info">
                <div class="member-title-row">
                    <span class="member-name">${m.name || cls?.name || '?'}</span>
                    <span class="member-level level-badge${combat?.syncedLevel && m.level > combat.syncedLevel ? ' level-synced' : ''}">lvl ${combat?.syncedLevel && m.level > combat.syncedLevel ? combat.syncedLevel : m.level}</span>
                </div>
                <div class="member-hp-bar">
                    <div class="member-hp-fill ${hpPct < 25 ? 'hp-low' : hpPct < 50 ? 'hp-mid' : ''} ${m.shield?.value > 0 ? 'hp-shield' : ''}" style="width:${hpPct}%"></div>
                    <span class="hp-bar-text">${m.currentHp}/${maxHp}${m.shield?.value > 0 ? ' • ' + m.shield.value : ''}</span>
                </div>
                <div class="member-xp-bar">
                    <div class="member-xp-fill" style="width:${xpPct}%"></div>
                </div>
                <div class="member-moves">${moveBars}</div>
            </div>`

        const timer = combat?.memberTimers?.[teamIdx] || 0
        div.querySelectorAll('.combat-move-fill').forEach((f, idx) => {
            f.style.width = `${idx === nextIdx && isActive ? Math.min(100, timer) : 0}%`
        })
        container.appendChild(div)
    })
}

// ─── Utilitaires ──────────────────────────────────────────────────────────────

function getNextMoveIndex(member, teamIdx) {
    const slots   = ['slot1','slot2','slot3','slot4']
    const nonNull = slots.filter(s => member.moves[s])
    if (!nonNull.length) return -1
    return (combat?.memberMoveIndex?.[teamIdx] || 0) % nonNull.length
}

function getNextMoveName(member, teamIdx) {
    const slots   = ['slot1','slot2','slot3','slot4']
    const nonNull = slots.filter(s => member.moves[s])
    if (!nonNull.length) return '—'
    const idx = (combat?.memberMoveIndex?.[teamIdx] || 0) % nonNull.length
    return move[member.moves[nonNull[idx]]]?.name || '—'
}

// ─── Bulles de ressources de session ─────────────────────────────────────────

function updateResourceBubbles() {
    const container = document.getElementById('explore-resources')
    if (!container) return

    const allDrops    = combat?.sessionLoot?.familiarDrops || []
    const pierreCount = allDrops.filter(d => !d.isArchi && !d.isGardien).length
    const gardienCount = allDrops.filter(d => d.isGardien && !d.isArchi).length
    const archiCount  = allDrops.filter(d =>  d.isArchi).length
    const caisseCount = combat?.sessionLoot?.caisseCount || 0
    const keyDrops    = combat?.sessionLoot?.keyDrops || {}
    const anyKey      = Object.values(keyDrops).some(c => c > 0)

    if (!state.isRunning || (pierreCount === 0 && gardienCount === 0 && archiCount === 0 && caisseCount === 0 && !anyKey)) {
        container.innerHTML = ''
        return
    }

    const pierreItm  = item['pierreDame']
    const gardienItm = item['pierreDameGardien']
    const archiItm   = item['pierreDameArchimonstre']
    const caisseItm  = item['caisseEquipement']

    let html = ''
    if (pierreCount > 0 && pierreItm) {
        html += `<div class="res-bubble" onclick="showItemTooltip('pierreDame')" oncontextmenu="event.preventDefault();showItemTooltip('pierreDame')" title="${pierreItm.name}">
            <img src="${pierreItm.image}" onerror="this.src='img/icons/icon.png'">
            <span class="res-bubble-count">×${pierreCount}</span>
        </div>`
    }
    if (gardienCount > 0 && gardienItm) {
        html += `<div class="res-bubble" onclick="showItemTooltip('pierreDameGardien')" oncontextmenu="event.preventDefault();showItemTooltip('pierreDameGardien')" title="${gardienItm.name}">
            <img src="${gardienItm.image}" onerror="this.src='img/icons/icon.png'">
            <span class="res-bubble-count">×${gardienCount}</span>
        </div>`
    }
    if (archiCount > 0 && archiItm) {
        html += `<div class="res-bubble" onclick="showItemTooltip('pierreDameArchimonstre')" oncontextmenu="event.preventDefault();showItemTooltip('pierreDameArchimonstre')" title="${archiItm.name}">
            <img src="${archiItm.image}" onerror="this.src='img/icons/icon.png'">
            <span class="res-bubble-count">×${archiCount}</span>
        </div>`
    }
    if (caisseCount > 0 && caisseItm) {
        html += `<div class="res-bubble" onclick="showItemTooltip('caisseEquipement')" oncontextmenu="event.preventDefault();showItemTooltip('caisseEquipement')" title="${caisseItm.name}">
            <img src="${caisseItm.image}" onerror="this.src='img/icons/icon.png'">
            <span class="res-bubble-count">×${caisseCount}</span>
        </div>`
    }
    for (const [keyId, count] of Object.entries(keyDrops)) {
        if (count <= 0) continue
        const keyItm = item[keyId]
        if (!keyItm) continue
        html += `<div class="res-bubble" onclick="showItemTooltip('${keyId}')" oncontextmenu="event.preventDefault();showItemTooltip('${keyId}')" title="${keyItm.name}">
            <img src="${keyItm.image}" onerror="this.src='img/icons/icon.png'">
            <span class="res-bubble-count">×${count}</span>
        </div>`
    }
    container.innerHTML = html
}

// ─── Kamas ────────────────────────────────────────────────────────────────────

function updateKamasDisplay() {
    const el = document.getElementById('kamas-amount')
    if (el) el.textContent = state.kamas
}

// ─── Popup dégâts sur l'ennemi ────────────────────────────────────────────────

function showDamageNumber(damage) {
    let spriteEl
    if (combat?.isRaid) {
        const slot   = combat.raidCurrentTargetSlot ?? 0
        const slotEl = document.getElementById(`raid-enemy-${slot}`)
        spriteEl = slotEl?.querySelector('.raid-enemy-sprite')
    } else {
        spriteEl = document.getElementById('enemy-sprite')
    }
    if (!spriteEl) return

    const rect = spriteEl.getBoundingClientRect()
    const x = rect.left + rect.width  / 2
    const y = rect.top  + rect.height / 2

    const el = document.createElement('div')
    el.className    = 'damage-popup'
    el.textContent  = `-${damage}`
    el.style.left   = `${x}px`
    el.style.top    = `${y}px`
    document.body.appendChild(el)

    el.addEventListener('animationend', () => el.remove(), { once: true })
}

// ═══════════════════════════════════════════════════════════════
// MODE RAID — UI
// ═══════════════════════════════════════════════════════════════

// ─── Affichage des 3 ennemis ──────────────────────────────────

const RAID_SLOT_LABELS = ['Principal', 'Secondaire', 'Tertiaire']

function updateEnemyDisplayRaid() {
    const container = document.getElementById('raid-enemy-display')
    if (!container || !combat) return

    const bgName = areas[state.currentArea]?.background || null
    container.style.backgroundImage = bgName
        ? `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.55)), url(img/bg/${bgName}.png)`
        : 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))'

    // Compteur kills → mini-boss
    const counterEl = document.getElementById('raid-kill-counter')
    if (counterEl) {
        const area       = areas[state.currentArea]
        const everyKills = area?.miniBoss?.everyKills
        if (!everyKills) {
            counterEl.style.display = 'none'
        } else if (combat.raidMiniBossActive) {
            counterEl.textContent = '⚔ Mini-boss en cours !'
            counterEl.classList.add('raid-boss-active')
            counterEl.style.display = ''
        } else {
            const remaining = everyKills - ((combat.raidKillCount || 0) % everyKills)
            counterEl.textContent = `Mini-boss dans ${remaining} kill${remaining > 1 ? 's' : ''}`
            counterEl.classList.remove('raid-boss-active')
            counterEl.style.display = ''
        }
    }

    for (let i = 0; i < 3; i++) {
        const slot = document.getElementById(`raid-enemy-${i}`)
        if (!slot) continue

        const enemy      = combat.enemies?.[i]
        const respawning = combat.raidRespawnPending?.[i] || !!(enemy && enemy.currentHp <= 0)

        if (!enemy) {
            // Slot vide — placeholder taille fixe
            slot.classList.add('raid-respawning')
            if (slot.dataset.structKey !== 'empty') {
                slot.innerHTML = _buildRaidEmptySlotHTML(i)
                slot.dataset.structKey = 'empty'
            }
            continue
        }

        if (respawning) {
            // Ennemi mort — conserver le HTML, griser + forcer HP à 0
            slot.classList.add('raid-respawning')
            const hpFill = slot.querySelector('.hp-fill')
            if (hpFill) { hpFill.style.width = '0%'; hpFill.className = 'hp-fill hp-low' }
            const hpText = slot.querySelector('.raid-enemy-hp-text')
            if (hpText) hpText.textContent = `0/${enemy.maxHp}`
            continue
        }

        slot.classList.remove('raid-respawning')

        const hpPct      = Math.max(0, Math.floor((enemy.currentHp / enemy.maxHp) * 100))
        const timer      = Math.min(100, combat.enemyTimers?.[i] || 0)
        const nextMoveId = combat.enemyNextMoveIds?.[i]

        // Re-render complet seulement si l'ennemi change
        const structKey = `${enemy.id}|${(enemy.moves || []).join(',')}|${nextMoveId}`
        if (slot.dataset.structKey !== structKey) {
            slot.dataset.structKey = structKey
            slot.innerHTML = _buildRaidEnemySlotHTML(enemy, i)
        }

        // Mise à jour légère des barres chaque tick
        const hpFill = slot.querySelector('.hp-fill')
        if (hpFill) {
            hpFill.style.width = `${hpPct}%`
            hpFill.className   = `hp-fill ${hpPct < 25 ? 'hp-low' : hpPct < 50 ? 'hp-mid' : ''}`
        }
        const hpText = slot.querySelector('.raid-enemy-hp-text')
        if (hpText) hpText.textContent = `${enemy.currentHp}/${enemy.maxHp}`

        const nextIdx = (enemy.moves || []).indexOf(nextMoveId)
        slot.querySelectorAll('.combat-move-fill').forEach((f, idx) => {
            f.style.width = `${idx === nextIdx ? timer : 0}%`
        })
    }
}

function _buildRaidEnemySlotHTML(enemy, slotIdx) {
    const moveIds  = (enemy.moves || []).slice(0, 4)
    const moveBars = [0, 1, 2, 3].map(idx => {
        const moveId = moveIds[idx]
        if (!moveId) {
            return `<div class="combat-move-bar combat-move-empty"><span class="combat-move-name">—</span></div>`
        }
        const mv      = move[moveId]
        const elem    = mv?.effects?.[0]?.element || 'neutre'
        const mvType  = mv?.effects?.[0]?.type    || ''
        const barElem = mvType === 'buff' ? 'buff' : mvType === 'debuff' ? 'debuff' : elem
        return `<div class="combat-move-bar elem-bar-${barElem}" data-move-id="${moveId}" data-caster-enemy="1">
            <div class="combat-move-fill elem-bar-${barElem}" style="width:0%"></div>
            <span class="combat-move-name">${mv?.name || '—'}${moveRestrictionSigle(mv, elem)}</span>
            <div class="combat-move-icon-bg elem-bar-${barElem}">${elemIcon(moveIconKey(mv), 'combat-move-icon')}</div>
        </div>`
    }).join('')

    const hpPct = Math.max(0, Math.floor((enemy.currentHp / enemy.maxHp) * 100))

    return `
        <div class="raid-slot-label slot-${slotIdx}">${RAID_SLOT_LABELS[slotIdx]}</div>
        <div class="raid-enemy-sprite-wrap">
            <img class="raid-enemy-sprite" src="${enemy.image}" onerror="this.src='img/icons/icon.png'">
        </div>
        <div class="raid-enemy-name">${enemy.name}</div>
        <div class="hp-container">
            <div class="hp-bar">
                <div class="hp-fill ${hpPct < 25 ? 'hp-low' : hpPct < 50 ? 'hp-mid' : ''}" style="width:${hpPct}%"></div>
            </div>
            <span class="raid-enemy-hp-text">${enemy.currentHp}/${enemy.maxHp}</span>
        </div>
        <div class="member-moves">${moveBars}</div>`
}

function _buildRaidEmptySlotHTML(slotIdx) {
    const emptyBars = [0,1,2,3].map(() =>
        `<div class="combat-move-bar combat-move-empty"><span class="combat-move-name">—</span></div>`
    ).join('')
    return `
        <div class="raid-slot-label slot-${slotIdx}">${RAID_SLOT_LABELS[slotIdx]}</div>
        <div class="raid-enemy-sprite-wrap"></div>
        <div class="raid-enemy-name">—</div>
        <div class="hp-container">
            <div class="hp-bar"><div class="hp-fill" style="width:0%"></div></div>
            <span class="raid-enemy-hp-text">—</span>
        </div>
        <div class="member-moves">${emptyBars}</div>`
}

// ─── Membres en mode Raid ─────────────────────────────────────

function renderTeamSlotsRaid(container) {
    container.innerHTML = ''
    container.classList.add('raid-mode')

    const slots = ['slot1','slot2','slot3','slot4']

    // Rangée actifs
    const activeRow = document.createElement('div')
    activeRow.id = 'raid-active-row'
    for (let slotIdx = 0; slotIdx < 3; slotIdx++) {
        const teamIdx = combat?.raidSlots?.[slotIdx] ?? -1
        if (teamIdx === -1) continue
        const m = state.team[teamIdx]
        if (!m) continue
        activeRow.appendChild(_buildRaidActiveMemberCard(m, teamIdx, slotIdx, slots))
    }
    container.appendChild(activeRow)

    // Séparateur
    const sep = document.createElement('div')
    sep.id = 'raid-bench-separator'
    sep.textContent = 'Banc'
    container.appendChild(sep)

    // Rangée banc
    const benchRow = document.createElement('div')
    benchRow.id = 'raid-bench-row'
    const activeSet = new Set((combat?.raidSlots || []).filter(i => i !== -1))
    for (let i = 0; i < state.team.length; i++) {
        if (activeSet.has(i)) continue
        const m = state.team[i]
        if (!m) continue
        benchRow.appendChild(_buildRaidBenchMemberCard(m, i))
    }
    container.appendChild(benchRow)
}

function _buildRaidActiveMemberCard(m, teamIdx, slotIdx, slots) {
    const cls       = classes[m.classId]
    const maxHp     = m.maxHp || getEffectiveStats(m)?.hp || 1
    const hpPct     = Math.max(0, Math.floor((m.currentHp / maxHp) * 100))
    const nextIdx   = getNextMoveIndex(m, teamIdx)
    const moveKey   = slots.map(s => m.moves[s] || '').join(',')
    const timer     = combat?.memberTimers?.[teamIdx] || 0
    const isPending = combat?.pendingRaidSwap === teamIdx

    const moveBars = slots.map(s => {
        const moveId = m.moves[s]
        if (!moveId) return `<div class="combat-move-bar combat-move-empty"><span class="combat-move-name">—</span></div>`
        const mv      = move[moveId]
        const elem    = mv?.effects?.[0]?.element || 'neutre'
        const mvType  = mv?.effects?.[0]?.type    || ''
        const barElem = mvType === 'buff' ? 'buff' : mvType === 'debuff' ? 'debuff' : elem
        return `<div class="combat-move-bar elem-bar-${barElem}" data-move-id="${moveId}" data-caster-class="${m.classId}">
            <div class="combat-move-fill elem-bar-${barElem}" style="width:0%"></div>
            <span class="combat-move-name">${mv?.name || '—'}${moveRestrictionSigle(mv, elem)}</span>
            <div class="combat-move-icon-bg elem-bar-${barElem}">${elemIcon(moveIconKey(mv), 'combat-move-icon')}</div>
        </div>`
    }).join('')

    const div = document.createElement('div')
    div.className            = `raid-member-card raid-slot-order-${slotIdx}${isPending ? ' raid-swap-selected' : ''}`
    div.dataset.teamIdx      = teamIdx
    div.dataset.moveKey      = moveKey
    div.dataset.help         = m.classId
    div.onclick              = () => setActiveMember(teamIdx)
    div.style.opacity   = m.currentHp > 0 ? '1' : '0.4'
    const _raidSummonOwner = m.isSummon ? (combat?.savedMembers?.[teamIdx] || null) : null
    const _raidSummonScale = _raidSummonOwner ? ((summons[m.id] || monsters[m.id])?.scale || 1) : 1
    div.innerHTML = `
        <div class="raid-member-slot-label slot-${slotIdx}">${RAID_SLOT_LABELS[slotIdx]}</div>
        <div class="raid-member-sprite-wrap">
            <img class="member-sprite${_raidSummonOwner ? ' member-sprite-has-summon' : ''}" src="${_raidSummonOwner ? getMemberImage(_raidSummonOwner) : getMemberImage(m)}" onerror="this.src='img/icons/icon.png'">
            ${_raidSummonOwner ? `<img class="member-summon-sprite" src="${getMemberImage(m)}" style="height:${_raidSummonScale * 50}%" onerror="this.src='img/icons/icon.png'">` : ''}
        </div>
        <div class="raid-member-name">${m.name || cls?.name || '?'}</div>
        <div class="hp-container">
            <div class="hp-bar">
                <div class="hp-fill ${hpPct < 25 ? 'hp-low' : hpPct < 50 ? 'hp-mid' : ''} ${m.shield?.value > 0 ? 'hp-shield' : ''}" style="width:${hpPct}%"></div>
                <span class="hp-bar-text">${m.currentHp}/${maxHp}${m.shield?.value > 0 ? ' • ' + m.shield.value : ''}</span>
            </div>
        </div>
        <div class="member-moves">${moveBars}</div>`

    div.querySelectorAll('.combat-move-fill').forEach((f, idx) => {
        f.style.width = `${idx === nextIdx ? Math.min(100, timer) : 0}%`
    })
    return div
}

function _buildRaidBenchMemberCard(m, teamIdx) {
    const cls       = classes[m.classId]
    const maxHp     = m.maxHp || getEffectiveStats(m)?.hp || 1
    const hpPct     = Math.max(0, Math.floor((m.currentHp / maxHp) * 100))
    const isPending = combat?.pendingRaidSwap === teamIdx

    const div = document.createElement('div')
    div.className       = `raid-bench-card${isPending ? ' raid-swap-selected' : ''}`
    div.dataset.teamIdx = teamIdx
    div.dataset.help    = m.classId
    div.onclick         = () => setActiveMember(teamIdx)
    div.style.opacity   = m.currentHp > 0 ? '0.65' : '0.35'
    const _benchSummonOwner = m.isSummon ? (combat?.savedMembers?.[teamIdx] || null) : null
    const _benchSummonScale = _benchSummonOwner ? ((summons[m.id] || monsters[m.id])?.scale || 1) : 1
    div.innerHTML = `
        <div style="position:relative;flex-shrink:0;">
            <img class="member-sprite${_benchSummonOwner ? ' member-sprite-has-summon' : ''}" src="${_benchSummonOwner ? getMemberImage(_benchSummonOwner) : getMemberImage(m)}" onerror="this.src='img/icons/icon.png'">
            ${_benchSummonOwner ? `<img class="member-summon-sprite" src="${getMemberImage(m)}" style="height:${_benchSummonScale * 50}%" onerror="this.src='img/icons/icon.png'">` : ''}
        </div>
        <div class="raid-bench-info">
            <span class="raid-bench-name">${m.name || cls?.name || '?'}</span>
            <div class="raid-bench-hp-bar">
                <div class="raid-bench-hp-fill ${hpPct < 25 ? 'hp-low' : hpPct < 50 ? 'hp-mid' : ''} ${m.shield?.value > 0 ? 'hp-shield' : ''}" style="width:${hpPct}%"></div>
                <span class="hp-bar-text">${m.currentHp}/${maxHp}${m.shield?.value > 0 ? ' • ' + m.shield.value : ''}</span>
            </div>
        </div>`
    return div
}

function updateMemberBarsRaid(container) {
    container.classList.add('raid-mode')
    const slots = ['slot1','slot2','slot3','slot4']
    const activeSet = new Set((combat?.raidSlots || []).filter(i => i !== -1))

    // Re-render si la structure n'existe pas encore ou si les slots ont changé
    const activeRow = container.querySelector('#raid-active-row')
    let needsRender = !activeRow
    if (!needsRender) {
        const activeCards = activeRow.querySelectorAll('.raid-member-card')
        let cardIdx = 0
        for (let slotIdx = 0; slotIdx < 3; slotIdx++) {
            const teamIdx = combat?.raidSlots?.[slotIdx] ?? -1
            if (teamIdx === -1) continue
            const card = activeCards[cardIdx++]
            if (!card || parseInt(card.dataset.teamIdx) !== teamIdx) { needsRender = true; break }
            const m = state.team[teamIdx]
            if (!m) continue
            const moveKey = slots.map(s => m.moves[s] || '').join(',')
            if (card.dataset.moveKey !== moveKey) { needsRender = true; break }
        }
    }
    if (needsRender) { renderTeamSlotsRaid(container); return }

    // Mise à jour légère — cartes actives
    activeRow.querySelectorAll('.raid-member-card').forEach(card => {
        const teamIdx   = parseInt(card.dataset.teamIdx)
        const m         = state.team[teamIdx]
        if (!m) return
        const timer     = combat?.memberTimers?.[teamIdx] || 0
        const maxHp     = m.maxHp || 1
        const hpPct     = Math.max(0, Math.floor((m.currentHp / maxHp) * 100))
        const nextIdx   = getNextMoveIndex(m, teamIdx)
        const isPending = combat?.pendingRaidSwap === teamIdx

        const hpFill = card.querySelector('.hp-fill')
        if (hpFill) { hpFill.style.width = `${hpPct}%`; hpFill.className = `hp-fill ${hpPct < 25 ? 'hp-low' : hpPct < 50 ? 'hp-mid' : ''} ${m.shield?.value > 0 ? 'hp-shield' : ''}` }
        const hpText = card.querySelector('.hp-bar-text')
        if (hpText) hpText.textContent = `${m.currentHp}/${maxHp}${m.shield?.value > 0 ? ' • ' + m.shield.value : ''}`

        card.classList.toggle('raid-swap-selected', isPending)
        card.style.opacity = m.currentHp > 0 ? '1' : '0.4'

        card.querySelectorAll('.combat-move-fill').forEach((f, idx) => {
            f.style.width = `${idx === nextIdx ? Math.min(100, timer) : 0}%`
        })
    })

    // Mise à jour légère — cartes banc
    const benchRow = container.querySelector('#raid-bench-row')
    if (benchRow) {
        benchRow.querySelectorAll('.raid-bench-card').forEach(card => {
            const teamIdx   = parseInt(card.dataset.teamIdx)
            const m         = state.team[teamIdx]
            if (!m) return
            const maxHp     = m.maxHp || 1
            const hpPct     = Math.max(0, Math.floor((m.currentHp / maxHp) * 100))
            const isPending = combat?.pendingRaidSwap === teamIdx

            const hpFill = card.querySelector('.raid-bench-hp-fill')
            if (hpFill) { hpFill.style.width = `${hpPct}%`; hpFill.className = `raid-bench-hp-fill ${hpPct < 25 ? 'hp-low' : hpPct < 50 ? 'hp-mid' : ''} ${m.shield?.value > 0 ? 'hp-shield' : ''}` }
            const hpBarText = card.querySelector('.raid-bench-hp-bar .hp-bar-text')
            if (hpBarText) hpBarText.textContent = `${m.currentHp}/${maxHp}${m.shield?.value > 0 ? ' • ' + m.shield.value : ''}`

            card.classList.toggle('raid-swap-selected', isPending)
            card.style.opacity = m.currentHp > 0 ? '0.65' : '0.35'
        })
    }
}
