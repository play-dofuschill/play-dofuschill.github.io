// ui/zone.js — Sélection et affichage des zones DofusChill

let _pendingAreaId = null
let zoneTab = 'wild'

const ZONE_TAB_LABELS = { wild: 'zones sauvages', dungeon: 'donjons', event: 'événements' }

// Retourne le niveau après cap pour un membre en préparation (skull > 0, zone en attente, membre au-dessus du cap).
// Retourne null si pas de cap applicable (membre déjà sous le maxLevel, ou skull inactif).
function _getTeamPrepSyncedLevel(member) {
    if (!_pendingAreaId || !state.skullLevel) return null
    const cap = areas[_pendingAreaId]?.maxLevel
    if (!cap || !member || member.level <= cap) return null
    return cap
}

function setZoneTab(type) {
    zoneTab = type
    const tabs = ['wild', 'dungeon', 'event']
    document.querySelectorAll('#explore-selector > div').forEach((el, i) => {
        el.classList.toggle('explore-tab-active', tabs[i] === type)
    })
    updateZoneUI()
}

function _buildSkullSelector(refreshFn) {
    const sl = state.skullLevel || 0
    const skullLabels = ['', '+100% difficulté', '+200% difficulté', '+400% difficulté']
    const wrapper = document.createElement('div')
    wrapper.className = 'skull-selector'
    wrapper.title = sl > 0 ? skullLabels[sl] : 'Mode normal'
    wrapper.innerHTML = `
        <strong style="font-size:0.8rem; white-space:nowrap;">Difficulté modulée :</strong>
        <span class="skull-btn${sl >= 1 ? ' skull-active' : ''}" data-level="1" title="+100% difficulté"><img src="img/icons/Tete_de_mort.png" class="skull-img"></span>
        <span class="skull-btn${sl >= 2 ? ' skull-active' : ''}" data-level="2" title="+200% difficulté"><img src="img/icons/Tete_de_mort.png" class="skull-img"></span>
        <span class="skull-btn${sl >= 3 ? ' skull-active' : ''}" data-level="3" title="+400% difficulté"><img src="img/icons/Tete_de_mort.png" class="skull-img"></span>`
    wrapper.querySelectorAll('.skull-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation()
            const level = parseInt(btn.dataset.level)
            state.skullLevel = (state.skullLevel === level) ? 0 : level
            saveGame()
            if (refreshFn) refreshFn(); else updateZoneUI()
        })
    })
    return wrapper
}

function updateZoneUI() {
    refreshDailyPools()

    const listing = document.getElementById('explore-listing')
    if (!listing) return
    listing.innerHTML = ''

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

    // Construire la liste selon l'onglet
    let matching
    let poolCount = 0   // nb de zones accessibles (pour l'en-tête)

    const byLevel = ([, a], [, b]) => (a.minLevel || 0) - (b.minLevel || 0)

    if (zoneTab === 'wild') {
        const pool      = state.dailyPool?.zones || []
        const poolZones = pool.map(id => [id, areas[id]]).filter(([, a]) => a).sort(byLevel)
        poolCount = poolZones.length

        // Une seule zone représentante par palier de déblocage (évite les doublons "Champs" + "Plage" verrouillés)
        const seenTier = new Set()
        const locked   = Object.entries(areas)
            .filter(([, a]) => (a.type || 'wild') === 'wild' && !isZoneAccessible(a))
            .sort(byLevel)
            .filter(([, a]) => {
                for (const tier of UNLOCK_TIERS) {
                    if (a.maxLevel <= tier.unlocksMaxLevel) {
                        if (seenTier.has(tier.unlocksMaxLevel)) return false
                        seenTier.add(tier.unlocksMaxLevel)
                        return true
                    }
                }
                return true
            })

        matching  = [...poolZones, ...locked]
    } else if (zoneTab === 'event') {
        const pool    = state.eventPool?.zones || []
        const byMaxLv = ([, a], [, b]) => (a.maxLevel || 0) - (b.maxLevel || 0)
        matching      = pool.map(id => [id, areas[id]]).filter(([, a]) => a).sort(byMaxLv)
        poolCount     = matching.length
    } else {
        // Donjons : uniquement ceux liés aux zones du pool journalier, triés par niveau
        matching = getDailyDungeons()
            .map(id => [id, areas[id]])
            .filter(([, a]) => a)
            .sort(byLevel)
    }

    // En-tête avec compteur et timer pour wild / events
    if (zoneTab === 'wild') {
        const info = document.createElement('div')
        info.className = 'zone-daily-info'
        info.innerHTML = `
            <div class="zone-daily-left">
                <span>Zones du jour &bull; <strong>${poolCount}</strong> disponible${poolCount > 1 ? 's' : ''}</span>
                <span>Renouvellement dans&nbsp;${nextWildRefreshLabel()}</span>
            </div>`
        info.appendChild(_buildSkullSelector())
        listing.appendChild(info)
    }
    if (zoneTab === 'dungeon') {
        const info = document.createElement('div')
        info.className = 'zone-daily-info'
        info.innerHTML = `
            <div class="zone-daily-left">
                <span>Donjons du jour &bull; <strong>${matching.length}</strong> disponible${matching.length > 1 ? 's' : ''}</span>
                <span>Renouvellement dans&nbsp;${nextWildRefreshLabel()}</span>
            </div>`
        info.appendChild(_buildSkullSelector())
        listing.appendChild(info)
    }
    if (zoneTab === 'event') {
        const info = document.createElement('div')
        info.className = 'zone-daily-info'
        info.innerHTML = `
            <div class="zone-daily-left">
                <span>Événements &bull; <strong>${poolCount}</strong> disponible${poolCount > 1 ? 's' : ''}</span>
                <span>Renouvellement dans&nbsp;${nextEventRefreshLabel()}</span>
            </div>`
        info.appendChild(_buildSkullSelector())
        listing.appendChild(info)
    }

    if (matching.length === 0) {
        const empty = document.createElement('div')
        empty.className = 'zone-empty'
        empty.innerHTML = `Aucune ${ZONE_TAB_LABELS[zoneTab] || 'zone'} disponible.<br>Revenez bientôt !`
        listing.appendChild(empty)
        return
    }

    for (const [areaId, area] of matching) {
        const isActive     = state.currentArea === areaId && state.isRunning
        const isTutoLocked = state.tutorial === 'zones' && areaId !== 'cimetiereincarnam'
        const isTierLocked = !isZoneAccessible(area)
        const isLocked     = isTierLocked || isTutoLocked
        const keyCount     = area.keyId ? (state.inventory[area.keyId]?.count || 0) : null
        const lvlStr       = area.minLevel === area.maxLevel ? area.minLevel : `${area.minLevel}–${area.maxLevel}`

        const card = document.createElement('div')
        card.className = 'explore-ticket' +
            (isLocked  ? ' explore-ticket-locked'  : '') +
            (isActive  ? ' explore-ticket-active'  : '')
        card.dataset.help = areaId

        if (isLocked) {
            const hint = isTierLocked
                ? `Battez <strong>${getZoneUnlockHint(area) || '?'}</strong> pour accéder`
                : 'Terminez le tutoriel pour accéder'
            card.innerHTML = `
                <div>
                    <div class="explore-ticket-left">
                        <span>${area.name}</span>
                        <strong>Niv. ${lvlStr}</strong>
                        <span class="explore-ticket-lock-msg">🔒 ${hint}</span>
                    </div>
                    <div class="explore-ticket-right">
                        <img class="explore-ticket-sprite" src="${area.icon}" onerror="this.src='img/icons/icon.png'" style="opacity:0.2;filter:grayscale(1)">
                    </div>
                </div>`
        } else {
            const keyInfo = keyCount !== null
                ? `<span style="font-size:0.75em; margin-top:4px; ${keyCount > 0 ? 'color:#2D7A2D;' : 'opacity:0.5;'}">
                       ${keyCount > 0 ? `🗝 ${keyCount} clé${keyCount > 1 ? 's' : ''}` : 'Aucune clé disponible'}
                   </span>`
                : ''
            card.innerHTML = `
                <div>
                    <div class="explore-ticket-left">
                        <span>${area.name}</span>
                        <strong>Niv. ${lvlStr}</strong>
                        <span class="explore-ticket-desc">${area.description}</span>
                        ${keyInfo}
                    </div>
                    <div class="explore-ticket-right">
                        <img class="explore-ticket-sprite" src="${area.icon}" onerror="this.src='img/icons/icon.png'">
                    </div>
                </div>`
        }
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
    if (area && !isZoneAccessible(area)) {
        const hint = getZoneUnlockHint(area) || '?'
        showNotification(`Battez ${hint} pour accéder à cette zone !`, 'error')
        return
    }
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

    const isDungeon = area?.type === 'dungeon'

    playZaapTransition(() => {
        // Affiche la barre de confirmation dans le menu team
        const bar     = document.getElementById('zone-confirm-bar')
        const barName = document.getElementById('zone-confirm-bar-name')
        if (bar)     bar.style.display = 'flex'
        if (barName) barName.textContent = area?.name || ''

        // Texte du bouton selon le type de zone
        const btnText = document.getElementById('zone-confirm-btn-text')
        const btnSub  = document.getElementById('zone-confirm-btn-sub')
        if (btnText) btnText.textContent   = isDungeon ? 'Rentrer dans le donjon' : 'Commencer'
        if (btnSub)  { btnSub.style.display = isDungeon ? 'block' : 'none'; btnSub.textContent = isDungeon ? 'Utiliser 1 clé' : '' }

        // Ouvre le menu team
        const teamMenu = document.getElementById('team-menu')
        if (teamMenu) { teamMenu.style.display = 'flex'; teamMenu.style.zIndex = '40' }
        activeMenu = 'team'
        updateTeamUI()
    })
}

function cancelZoneConfirm() {
    const wasRaid = areas[_pendingAreaId]?.type === 'raid'
    _pendingAreaId = null
    const bar = document.getElementById('zone-confirm-bar')
    if (bar) bar.style.display = 'none'
    // Remet le bouton à son état par défaut
    const btnText = document.getElementById('zone-confirm-btn-text')
    const btnSub  = document.getElementById('zone-confirm-btn-sub')
    if (btnText) btnText.textContent   = 'Commencer'
    if (btnSub)  btnSub.style.display  = 'none'
    // Retour au menu Poutch si c'est un défi Poutch en attente
    if (typeof _pendingPoutchMode !== 'undefined' && _pendingPoutchMode !== null) {
        _pendingPoutchMode = null
        switchMenu('poutch')
        return
    }
    // Retour au menu Raid si c'était un Raid en attente
    if (wasRaid) {
        switchMenu('raid')
        return
    }
    // Retourne au menu zones
    switchMenu('zones')
}

function confirmStartCombat() {
    // Mode Poutch : délègue au démarrage Poutch
    if (typeof _pendingPoutchMode !== 'undefined' && _pendingPoutchMode !== null) {
        const mode = _pendingPoutchMode
        _pendingPoutchMode = null
        if (state.team.filter(Boolean).length === 0) {
            showNotification('Comment ça ? Vous voulez partir au combat sans aucun équipier !?', 'error')
            return
        }
        const bar = document.getElementById('zone-confirm-bar')
        if (bar) bar.style.display = 'none'
        const teamMenu = document.getElementById('team-menu')
        if (teamMenu) { teamMenu.style.display = 'none'; teamMenu.style.zIndex = '30' }
        document.getElementById('menu-button').classList.remove('menu-button-open')
        document.getElementById('main-content').style.zIndex = ''
        activeMenu = null
        playZaapTransition(() => startPoutchCombat(mode))
        return
    }

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

    playZaapTransition(() => {
        startCombat(areaId)
        advanceTutorial('zones')
        advanceTutorial('team_prep')
    })
}
