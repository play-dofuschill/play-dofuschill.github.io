// ui/combat.js — Affichage du combat DofusChill

let _enemyMoveRenderKey = null

function updateCombatUI() {
    updateEnemyDisplay()
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
            const cls = classes[member.classId]
            el.src = cls?.image || 'img/icons/icon.png'
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

    // Background de scène selon la zone
    const bg = areas[state.currentArea]?.background
    container.style.backgroundImage = bg
        ? `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.55)), url(img/bg/${bg}.png)`
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
        const barElem = mvType === 'buff' ? 'buff' : mvType === 'debuff' ? 'malus' : elem
        const fillW   = idx === nextIdx ? timer : 0
        return `<div class="combat-move-bar elem-bar-${barElem}" data-move-id="${moveId}" data-caster-enemy="1">
            <div class="combat-move-fill elem-bar-${barElem}" style="width:${fillW}%"></div>
            <span class="combat-move-name">${mv?.name || '—'}</span>
            <div class="combat-move-icon-bg elem-bar-${barElem}">${elemIcon(elem, 'combat-move-icon')}</div>
        </div>`
    }).join('')
}

// ─── Cartes des membres ───────────────────────────────────────────────────────

function updateMemberBars() {
    const container = document.getElementById('explore-team')
    if (!container) return

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
        if (hpFill) { hpFill.style.width = `${hpPct}%`; hpFill.className = `member-hp-fill ${hpPct < 25 ? 'hp-low' : hpPct < 50 ? 'hp-mid' : ''}` }

        const xpFill = card.querySelector('.member-xp-fill')
        if (xpFill) xpFill.style.width = `${xpPct}%`

        const lvlBadge = card.querySelector('.level-badge')
        if (lvlBadge) lvlBadge.textContent = `lvl ${m.level}`

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
            const barElem = mvType === 'buff' ? 'buff' : mvType === 'debuff' ? 'malus' : elem
            fillCount++
            return `<div class="combat-move-bar elem-bar-${barElem}" data-move-id="${moveId}" data-caster-class="${m.classId}">
                <div class="combat-move-fill elem-bar-${barElem}" style="width:0%"></div>
                <span class="combat-move-name">${mv?.name || '—'}</span>
                <div class="combat-move-icon-bg elem-bar-${barElem}">${elemIcon(elem, 'combat-move-icon')}</div>
            </div>`
        }).join('')

        const isActive = combat?.activeMemberIndex === teamIdx
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
                <img class="member-sprite" src="${getMemberImage(m)}" onerror="this.src='img/icons/icon.png'">
            </div>
            <div class="member-info">
                <div class="member-title-row">
                    <span class="member-name">${cls?.name || '?'}</span>
                    <span class="member-level level-badge">lvl ${m.level}</span>
                </div>
                <div class="member-hp-bar">
                    <div class="member-hp-fill ${hpPct < 25 ? 'hp-low' : hpPct < 50 ? 'hp-mid' : ''}" style="width:${hpPct}%"></div>
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

    const pierreCount = combat?.sessionLoot?.familiarDrops?.length || 0
    const caisseCount = combat?.sessionLoot?.caisseCount || 0
    const keyDrops    = combat?.sessionLoot?.keyDrops || {}
    const anyKey      = Object.values(keyDrops).some(c => c > 0)

    if (!state.isRunning || (pierreCount === 0 && caisseCount === 0 && !anyKey)) {
        container.innerHTML = ''
        return
    }

    const pierreItm = item['pierreDame']
    const caisseItm = item['caisseEquipement']

    let html = ''
    if (pierreCount > 0 && pierreItm) {
        html += `<div class="res-bubble" onclick="showItemTooltip('pierreDame')" oncontextmenu="event.preventDefault();showItemTooltip('pierreDame')" title="${pierreItm.name}">
            <img src="${pierreItm.image}" onerror="this.src='img/icons/icon.png'">
            <span class="res-bubble-count">×${pierreCount}</span>
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
