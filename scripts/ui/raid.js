// ui/raid.js — Menu de sélection des zones Raid / Anomalies

let raidTab = 'raids'

function setRaidTab(tab) {
    raidTab = tab
    document.querySelectorAll('#raid-selector > div').forEach((el, i) => {
        el.classList.toggle('explore-tab-active', ['raids', 'anomalies'][i] === tab)
    })
    updateRaidUI()
}

function updateRaidUI() {
    const list = document.getElementById('raid-zone-list')
    if (!list) return

    list.innerHTML = ''

    if (raidTab === 'anomalies') {
        updateAnomalieList(list)
        return
    }

    // Sélecteur de difficulté modulée
    const header = document.createElement('div')
    header.className = 'zone-daily-info'
    header.appendChild(_buildSkullSelector(updateRaidUI))
    list.appendChild(header)

    const pool      = state.raidPool?.zones || []
    const raidAreas = pool.map(id => areas[id]).filter(Boolean)

    if (!raidAreas.length) {
        const empty = document.createElement('div')
        empty.className = 'zone-empty'
        empty.textContent = 'Aucun Raid disponible.'
        list.appendChild(empty)
        return
    }

    const countEl = document.createElement('div')
    countEl.className = 'zone-daily-info'
    countEl.innerHTML = `<span>Raids &bull; <strong>${raidAreas.length}</strong> disponible${raidAreas.length > 1 ? 's' : ''}</span>
        <span>Renouvellement dans&nbsp;${nextRaidRefreshLabel()}</span>`
    list.insertBefore(countEl, list.firstChild.nextSibling)

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

const ANOMALIE_PALIER_LABELS = ['I', 'II', 'III']

// Palier sélectionné par carte d'Anomalie (pas persisté — remis à I/0 par défaut à chaque rechargement)
const _anomaliePalierSelection = {}

function getAnomalieSelectedPalier(areaId) {
    return _anomaliePalierSelection[areaId] ?? 0
}

function updateAnomalieList(list) {
    const unlocked = state.team.some(m => m && m.level >= LEVEL_CAP)

    if (!unlocked) {
        const locked = document.createElement('div')
        locked.className = 'zone-empty'
        locked.innerHTML = `Débloqué au niveau ${LEVEL_CAP}.<br>Amenez un personnage au niveau maximum pour affronter les Anomalies.`
        list.appendChild(locked)
        return
    }

    const pool          = state.anomaliePool?.zones || []
    const anomalieAreas = pool.map(id => areas[id]).filter(Boolean)

    const countEl = document.createElement('div')
    countEl.className = 'zone-daily-info'
    countEl.innerHTML = `<span>Anomalies &bull; <strong>${anomalieAreas.length}</strong> disponible${anomalieAreas.length > 1 ? 's' : ''}</span>
        <span>Renouvellement dans&nbsp;${nextAnomalieRefreshLabel()}</span>`
    list.appendChild(countEl)

    if (!anomalieAreas.length) {
        const empty = document.createElement('div')
        empty.className = 'zone-empty'
        empty.textContent = 'Aucune Anomalie disponible.'
        list.appendChild(empty)
        return
    }

    for (const area of anomalieAreas) {
        const isActive = state.currentArea === area.id && state.isRunning

        const card = document.createElement('div')
        card.className   = 'explore-ticket' + (isActive ? ' explore-ticket-active' : '')
        card.dataset.help = area.id
        card.onclick     = () => joinAnomalie(area.id, getAnomalieSelectedPalier(area.id))
        card.innerHTML   = `
            <div>
                <div class="explore-ticket-left">
                    <span>${area.name}</span>
                    <span class="explore-ticket-desc">${area.description || ''}</span>
                    <div class="anomalie-palier-row"></div>
                </div>
                <div class="explore-ticket-right">
                    <img class="explore-ticket-sprite" src="${area.icon}" onerror="this.src='img/icons/icon.png'">
                </div>
            </div>`

        const palierRow = card.querySelector('.anomalie-palier-row')
        const selectedIdx = getAnomalieSelectedPalier(area.id)
        ;(area.paliers || []).forEach((palier, idx) => {
            const btn = document.createElement('span')
            btn.className   = 'anomalie-palier-btn' + (idx === selectedIdx ? ' anomalie-palier-selected' : '')
            btn.title       = `Palier ${ANOMALIE_PALIER_LABELS[idx] || (idx + 1)} — +${Math.round((palier.statMult - 1) * 100)}% stats`
            btn.textContent = ANOMALIE_PALIER_LABELS[idx] || (idx + 1)
            btn.onclick = e => {
                e.stopPropagation()
                _anomaliePalierSelection[area.id] = idx
                palierRow.querySelectorAll('.anomalie-palier-btn').forEach((b, i) => {
                    b.classList.toggle('anomalie-palier-selected', i === idx)
                })
            }
            palierRow.appendChild(btn)
        })

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

function joinAnomalie(areaId, palierIdx) {
    if (!state.hasChosenStarter) {
        showNotification('Choisissez d\'abord une classe !', 'error')
        return
    }
    if (state.isRunning) {
        showNotification('Un combat est déjà en cours !', 'error')
        return
    }

    _pendingAreaId = areaId
    state.pendingAnomaliePalier = palierIdx

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
    if (barName) barName.textContent = areas[areaId]?.name || 'Anomalie'

    playZaapTransition(() => {
        const bar     = document.getElementById('zone-confirm-bar')
        const barName = document.getElementById('zone-confirm-bar-name')
        if (bar)     bar.style.display = 'flex'
        if (barName) barName.textContent = areas[areaId]?.name || 'Anomalie'

        const btnText = document.getElementById('zone-confirm-btn-text')
        const btnSub  = document.getElementById('zone-confirm-btn-sub')
        if (btnText) btnText.textContent  = 'Lancer l\'Anomalie'
        if (btnSub)  btnSub.style.display = 'none'

        // Ouvre le menu team
        const teamMenu = document.getElementById('team-menu')
        if (teamMenu) { teamMenu.style.display = 'flex'; teamMenu.style.zIndex = '40' }
        activeMenu = 'team'
        updateTeamUI()
    })
}
