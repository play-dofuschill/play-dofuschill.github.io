// ui/raid.js — Menu de sélection des zones Raid

function updateRaidUI() {
    const list = document.getElementById('raid-zone-list')
    if (!list) return

    list.innerHTML = ''

    // Sélecteur de difficulté modulée
    const header = document.createElement('div')
    header.className = 'zone-daily-info'
    header.appendChild(_buildSkullSelector(updateRaidUI))
    list.appendChild(header)

    const raidAreas = Object.values(areas).filter(a => a.type === 'raid')

    if (!raidAreas.length) {
        const empty = document.createElement('div')
        empty.className = 'zone-empty'
        empty.textContent = 'Aucun Raid disponible.'
        list.appendChild(empty)
        return
    }

    for (const area of raidAreas) {
        const isActive = state.currentArea === area.id && state.isRunning
        const lvlStr   = area.minLevel === area.maxLevel ? area.minLevel : `${area.minLevel}–${area.maxLevel}`
        const miniBossInfo = area.miniBoss
            ? `<span style="font-size:0.72em;margin-top:2px;opacity:0.65;">Mini-boss tous les ${area.miniBoss.everyKills} kills</span>`
            : ''

        const card = document.createElement('div')
        card.className   = 'explore-ticket' + (isActive ? ' explore-ticket-active' : '')
        card.dataset.help = area.id
        card.onclick     = () => joinRaid(area.id)
        card.innerHTML   = `
            <div>
                <div class="explore-ticket-left">
                    <span>${area.name}</span>
                    <strong>Niv. ${lvlStr}</strong>
                    <span class="explore-ticket-desc">${area.description || ''}</span>
                    ${miniBossInfo}
                </div>
                <div class="explore-ticket-right">
                    <img class="explore-ticket-sprite" src="${area.icon}" onerror="this.src='img/icons/icon.png'">
                </div>
            </div>`
        list.appendChild(card)
    }
}

function joinRaid(areaId) {
    if (!state.hasChosenStarter) {
        showNotification('Choisissez d\'abord une classe !', 'error')
        return
    }
    if (state.isRunning) {
        showNotification('Un combat est déjà en cours !', 'error')
        return
    }

    _pendingAreaId = areaId

    // Ferme le menu Raid
    const raidEl = document.getElementById('raid-menu')
    if (raidEl) { raidEl.style.display = 'none'; raidEl.style.zIndex = '30' }
    document.getElementById('menu-button').classList.remove('menu-button-open')
    document.getElementById('main-content').style.zIndex = ''
    activeMenu = null

    // Affiche la barre de confirmation dans le menu team
    const bar     = document.getElementById('zone-confirm-bar')
    const barName = document.getElementById('zone-confirm-bar-name')
    if (bar)     bar.style.display = 'flex'
    if (barName) barName.textContent = areas[areaId]?.name || 'Raid'

    playZaapTransition(() => {
        const bar     = document.getElementById('zone-confirm-bar')
        const barName = document.getElementById('zone-confirm-bar-name')
        if (bar)     bar.style.display = 'flex'
        if (barName) barName.textContent = areas[areaId]?.name || 'Raid'

        const btnText = document.getElementById('zone-confirm-btn-text')
        const btnSub  = document.getElementById('zone-confirm-btn-sub')
        if (btnText) btnText.textContent  = 'Lancer le Raid'
        if (btnSub)  btnSub.style.display = 'none'

        // Ouvre le menu team
        const teamMenu = document.getElementById('team-menu')
        if (teamMenu) { teamMenu.style.display = 'flex'; teamMenu.style.zIndex = '40' }
        activeMenu = 'team'
        updateTeamUI()
    })
}
