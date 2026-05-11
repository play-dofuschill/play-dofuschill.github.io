// ui/zone.js — Sélection et affichage des zones DofusChill

let _pendingAreaId = null
let zoneTab = 'wild'

const ZONE_TAB_LABELS = { wild: 'zones sauvages', dungeon: 'donjons', event: 'événements' }

function setZoneTab(type) {
    zoneTab = type
    const tabs = ['wild', 'dungeon', 'event']
    document.querySelectorAll('#explore-selector > div').forEach((el, i) => {
        el.classList.toggle('explore-tab-active', tabs[i] === type)
    })
    updateZoneUI()
}

function updateZoneUI() {
    const listing = document.getElementById('explore-listing')
    if (!listing) return
    listing.innerHTML = ''

    const matching = Object.entries(areas).filter(([, area]) =>
        (area.type || 'wild') === zoneTab
    )

    if (matching.length === 0) {
        listing.innerHTML = `<div class="zone-empty">Aucune ${ZONE_TAB_LABELS[zoneTab] || 'zone'} disponible.<br>Revenez bientôt !</div>`
        return
    }

    // Option relance auto — uniquement pour l'onglet donjons
    if (zoneTab === 'dungeon') {
        const toggleEl = document.createElement('div')
        toggleEl.className = 'dungeon-auto-toggle'
        toggleEl.innerHTML = `
            <label class="dungeon-auto-label">
                <div class="dungeon-auto-switch">
                    <input type="checkbox" id="dungeon-auto-restart" ${state.dungeonAutoRestart ? 'checked' : ''}>
                    <span class="dungeon-auto-slider"></span>
                </div>
                <span>Relancer automatiquement tant qu'il y a une clé</span>
            </label>`
        toggleEl.querySelector('input').addEventListener('change', e => {
            state.dungeonAutoRestart = e.target.checked
            saveGame()
        })
        listing.appendChild(toggleEl)
    }

    for (const [areaId, area] of matching) {
        const isActive    = state.currentArea === areaId && state.isRunning
        const isTutoLocked = state.tutorial === 'zones' && areaId !== 'cimetiereincarnam'
        const keyCount    = area.keyId ? (state.inventory[area.keyId]?.count || 0) : null
        const isKeyLocked = keyCount !== null && keyCount === 0

        const card = document.createElement('div')
        card.className = 'explore-ticket' +
            (isActive                      ? ' explore-ticket-active'      : '') +
            (isTutoLocked || isKeyLocked   ? ' explore-ticket-tuto-locked' : '')
        card.dataset.help = areaId

        const keyInfo = keyCount !== null
            ? `<span style="font-size:0.75em; margin-top:4px; ${keyCount > 0 ? 'color:#2D7A2D;' : 'opacity:0.5;'}">
                   ${keyCount > 0 ? `🗝 ${keyCount} clé${keyCount > 1 ? 's' : ''}` : 'Aucune clé disponible'}
               </span>`
            : ''

        const tutoLockInfo = isTutoLocked
            ? `<span style="font-size:0.75em; margin-top:4px; opacity:0.5;">Terminez le tutoriel</span>`
            : ''

        card.innerHTML = `
            <div>
                <div class="explore-ticket-left">
                    <span>${area.name}</span>
                    <strong>Niv. ${area.minLevel === area.maxLevel ? area.minLevel : `${area.minLevel}–${area.maxLevel}`}</strong>
                    <span class="explore-ticket-desc">${area.description}</span>
                    ${tutoLockInfo || keyInfo}
                </div>
                <div class="explore-ticket-right">
                    <img class="explore-ticket-sprite" src="${area.icon}" onerror="this.src='img/icons/icon.png'">
                </div>
            </div>`
        card.onclick = () => joinArea(areaId)
        listing.appendChild(card)
    }
}

function joinArea(areaId) {
    if (!state.hasChosenStarter) {
        showNotification('Choisissez d\'abord une classe !', 'error')
        return
    }
    if ((state.tutorial === 'zones' || state.tutorial === 'team_prep') && areaId !== 'cimetiereincarnam') {
        showNotification('Commencez par Incarnam pour débuter l\'aventure !', 'error')
        return
    }
    const area = areas[areaId]
    if (area?.keyId) {
        const keyCount = state.inventory[area.keyId]?.count || 0
        if (keyCount === 0) {
            showNotification('Aucune clé disponible pour ce donjon !', 'error')
            return
        }
    }
    _pendingAreaId = areaId

    // Tuto : vide l'équipe pour que le joueur apprenne à ajouter son perso
    if (state.tutorial === 'zones') {
        if (!state.classEquip) state.classEquip = {}
        for (const member of state.team) {
            if (member) state.classEquip[member.classId] = { level: member.level, exp: member.exp }
        }
        state.team = []
        _tutoTeamPicked = false
        advanceTutorial('zones')
    }

    // Ferme le menu zones
    const exploreEl = document.getElementById('explore-menu')
    if (exploreEl) { exploreEl.style.display = 'none'; exploreEl.style.zIndex = '30' }
    document.getElementById('menu-button').classList.remove('menu-button-open')
    document.getElementById('main-content').style.zIndex = ''
    activeMenu = null

    // Affiche la barre de confirmation dans le menu team
    const bar     = document.getElementById('zone-confirm-bar')
    const barName = document.getElementById('zone-confirm-bar-name')
    if (bar)     bar.style.display = 'flex'
    if (barName) barName.textContent = area?.name || ''

    // Texte du bouton selon le type de zone
    const isDungeon = area?.type === 'dungeon'
    const btnText = document.getElementById('zone-confirm-btn-text')
    const btnSub  = document.getElementById('zone-confirm-btn-sub')
    if (btnText) btnText.textContent   = isDungeon ? 'Rentrer dans le donjon' : 'Commencer'
    if (btnSub)  { btnSub.style.display = isDungeon ? 'block' : 'none'; btnSub.textContent = isDungeon ? 'Utiliser 1 clé' : '' }

    // Ouvre le menu team
    const teamMenu = document.getElementById('team-menu')
    if (teamMenu) { teamMenu.style.display = 'flex'; teamMenu.style.zIndex = '40' }
    activeMenu = 'team'
    updateTeamUI()
}

function cancelZoneConfirm() {
    _pendingAreaId = null
    const bar = document.getElementById('zone-confirm-bar')
    if (bar) bar.style.display = 'none'
    // Remet le bouton à son état par défaut
    const btnText = document.getElementById('zone-confirm-btn-text')
    const btnSub  = document.getElementById('zone-confirm-btn-sub')
    if (btnText) btnText.textContent   = 'Commencer'
    if (btnSub)  btnSub.style.display  = 'none'
    // Retourne au menu zones
    switchMenu('zones')
}

function confirmStartCombat() {
    const areaId = _pendingAreaId
    if (!areaId) return

    if (state.team.filter(Boolean).length === 0) {
        showNotification('Comment ça ? Vous voulez partir au combat sans aucun équipier !?', 'error')
        return
    }

    _pendingAreaId = null

    const bar = document.getElementById('zone-confirm-bar')
    if (bar) bar.style.display = 'none'

    // Ferme le menu team
    const teamMenu = document.getElementById('team-menu')
    if (teamMenu) { teamMenu.style.display = 'none'; teamMenu.style.zIndex = '30' }
    document.getElementById('menu-button').classList.remove('menu-button-open')
    document.getElementById('main-content').style.zIndex = ''
    activeMenu = null

    startCombat(areaId)
    advanceTutorial('zones')
    advanceTutorial('team_prep')
}
