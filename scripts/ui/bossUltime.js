// scripts/ui/bossUltime.js — Menu Boss Ultime

function updateBoss_UltimeUI() {
    const content = document.getElementById('Boss_Ultime-content')
    if (!content) return
    content.innerHTML = ''

    const dragonIds = Object.keys(BossUltimeDragons)
    if (!dragonIds.length) {
        content.innerHTML = '<div style="padding:1rem;opacity:0.5;text-align:center">Aucun dragon disponible</div>'
        return
    }

    for (const dragonId of dragonIds) {
        const bd = BossUltimeDragons[dragonId]
        const ds = _bossUltimeDragonState(dragonId)
        const canFight = bossUltimeCanFight(dragonId)

        const hpPct   = ds.maxHp > 0 ? Math.round((ds.currentHp / ds.maxHp) * 100) : 0
        const hpColor = hpPct > 50 ? '#4caf50' : hpPct > 20 ? '#ff9800' : '#f44336'
        const phaseLabel = ds.phase === 2
            ? '<span style="color:#ff5252;font-size:0.78em">⚠ Phase 2</span>'
            : ''
        const lockedNotice = !canFight
            ? `<span class="Boss_Ultime-locked-notice">Déjà affronté aujourd'hui — revient dans ${nextBossUltimeResetLabel()}</span>`
            : ''

        const card = document.createElement('div')
        card.className = 'explore-ticket' + (!canFight ? ' explore-ticket-locked' : '')
        card.innerHTML = `
            <div>
                <div class="explore-ticket-left">
                    <span>${bd.name}</span>
                    <div class="Boss_Ultime-hp-bar-inline">
                        <div class="Boss_Ultime-hp-bar-inline-track">
                            <div class="Boss_Ultime-hp-bar-inline-fill" style="width:${hpPct}%;background:${hpColor}"></div>
                        </div>
                        <span style="font-size:0.72em;opacity:0.7;white-space:nowrap">${ds.currentHp.toLocaleString('fr-FR')} / ${ds.maxHp.toLocaleString('fr-FR')} PV</span>
                    </div>
                    ${phaseLabel}
                    <span class="explore-ticket-desc">${bd.lore}</span>
                    ${lockedNotice}
                </div>
                <div class="explore-ticket-right">
                    <img class="explore-ticket-sprite" src="${bd.icon}" onerror="this.src='img/icons/icon.png'"${!canFight ? ' style="opacity:0.3;filter:grayscale(1)"' : ''}>
                </div>
            </div>`

        if (canFight) card.onclick = () => _launchBossUltime(dragonId)
        card.addEventListener('contextmenu', e => { e.preventDefault(); _showBossUltimeDetail(dragonId) })
        content.appendChild(card)
    }
}

function _showBossUltimeDetail(dragonId) {
    const bd = BossUltimeDragons[dragonId]
    const ds = _bossUltimeDragonState(dragonId)
    if (!bd || !ds) return

    const rewardRows = []
    if (bd.reward?.item) {
        const itm = item[bd.reward.item]
        rewardRows.push(itm
            ? `<div style="display:flex;align-items:center;gap:0.4rem;margin:0.15rem 0">
                   <img src="${itm.image}" style="width:1.4rem;height:1.4rem;object-fit:contain" onerror="this.src='img/icons/icon.png'">
                   <span>${itm.name}</span>
               </div>`
            : `<div style="opacity:0.4">${bd.reward.item}</div>`)
    }
    if (bd.reward?.kamas) {
        rewardRows.push(`<div style="opacity:0.8">${bd.reward.kamas} kamas</div>`)
    }

    const hpPct   = ds.maxHp > 0 ? Math.round((ds.currentHp / ds.maxHp) * 100) : 0
    const hpColor = hpPct > 50 ? '#4caf50' : hpPct > 20 ? '#ff9800' : '#f44336'

    const body = `
        <div style="display:flex;flex-direction:column;gap:0.7rem">
            <div style="display:flex;align-items:center;gap:0.6rem">
                <img src="${bd.icon}" style="width:3rem;height:3rem;object-fit:contain" onerror="this.src='img/icons/icon.png'">
                <div>
                    <div style="font-weight:bold">${bd.name}</div>
                    <div style="opacity:0.6;font-size:0.85em">Phase actuelle : ${ds.phase} &bull; Seuil Phase 2 : ${Math.round(bd.phase2Threshold * 100)}% PV</div>
                </div>
            </div>
            <div style="opacity:0.75;font-size:0.88em;font-style:italic">${bd.lore}</div>
            <div style="background:rgba(255,255,255,0.05);border-radius:0.4rem;padding:0.5rem 0.6rem">
                <div style="font-size:0.8em;opacity:0.55;margin-bottom:0.3rem;text-transform:uppercase;letter-spacing:0.05em">Points de vie</div>
                <div style="display:flex;align-items:center;gap:0.5rem">
                    <div style="flex:1;height:6px;background:rgba(255,255,255,0.12);border-radius:3px;overflow:hidden">
                        <div style="width:${hpPct}%;height:100%;background:${hpColor};border-radius:3px"></div>
                    </div>
                    <span style="font-size:0.82em;opacity:0.8;white-space:nowrap">${ds.currentHp.toLocaleString('fr-FR')} / ${ds.maxHp.toLocaleString('fr-FR')}</span>
                </div>
            </div>
            <div>
                <div style="font-size:0.8em;opacity:0.55;margin-bottom:0.3rem;text-transform:uppercase;letter-spacing:0.05em">Récompense</div>
                ${rewardRows.join('') || '<div style="opacity:0.4;font-size:0.85em">Aucune</div>'}
            </div>
        </div>`

    openTooltip(bd.name, body)
}

function _launchBossUltime(dragonId) {
    if (!state.hasChosenStarter) {
        showNotification('Choisissez d\'abord une classe !', 'error')
        return
    }
    if (state.isRunning) {
        showNotification('Un combat est déjà en cours !', 'error')
        return
    }
    if (!bossUltimeCanFight(dragonId)) {
        showNotification('Vous avez déjà affronté ce dragon aujourd\'hui.', 'error')
        return
    }

    const bd = BossUltimeDragons[dragonId]
    if (!bd) return

    const menuEl = document.getElementById('Boss_Ultime-menu')
    if (menuEl) { menuEl.style.display = 'none'; menuEl.style.zIndex = '30' }
    document.getElementById('menu-button').classList.remove('menu-button-open')
    document.getElementById('main-content').style.zIndex = ''
    activeMenu = null

    const areaId = '_bossultime_' + dragonId
    _pendingAreaId = areaId

    playZaapTransition(() => {
        const bar     = document.getElementById('zone-confirm-bar')
        const barName = document.getElementById('zone-confirm-bar-name')
        if (bar)     bar.style.display = 'flex'
        if (barName) barName.textContent = bd.name

        const btnText = document.getElementById('zone-confirm-btn-text')
        const btnSub  = document.getElementById('zone-confirm-btn-sub')
        if (btnText) btnText.textContent  = 'Affronter le dragon'
        if (btnSub)  btnSub.style.display = 'none'

        const teamMenu = document.getElementById('team-menu')
        if (teamMenu) { teamMenu.style.display = 'flex'; teamMenu.style.zIndex = '40' }
        activeMenu = 'team'
        updateTeamUI()
    })
}
