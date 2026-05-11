// main.js — State global + initialisation DofusChill

// ─── Icônes globales ─────────────────────────────────────────────────────────

const ELEM_ICONS = {
    neutre: 'img/icons/Neutre.png',
    feu:    'img/icons/Feu.png',
    eau:    'img/icons/Eau.png',
    air:    'img/icons/Air.png',
    terre:  'img/icons/Terre.png'
}
const STAT_ICONS = {
    hp:         'img/icons/Hp.png',
    atk:        'img/icons/puissance.png',
    flatDamage: 'img/icons/Dommages.png',
    spd:        'img/icons/Vitesse.png',
    soin:       'img/icons/Soin.png',
    buff:       'img/icons/Boost.png'
}
function elemIcon(elem, cssClass = 'elem-icon') {
    const src = ELEM_ICONS[elem] || ELEM_ICONS.neutre
    return `<img src="${src}" class="${cssClass}" onerror="this.src='img/icons/Neutre.png'">`
}

// ─── State global ─────────────────────────────────────────────────────────────

const state = {
    team: [],
    currentArea: null,
    isRunning: false,
    inventory: {},
    collection: {},
    seenMonsters: {},
    kamas: 50,
    hasChosenStarter: false,
    theme: 'dark',
    tutorial: 'intro',
    previewTeams: { preview1: [] },
    currentPreviewTeam: 'preview1',
    classEquip: {},
    teamNames: {},
    session: {
        killCount: 0,
        dropCount: 0,
        startTime: Date.now()
    }
}

// ─── Thème ────────────────────────────────────────────────────────────────────

function changeTheme(theme) {
    document.body.setAttribute('data-theme', theme)
    state.theme = theme
    const sel = document.getElementById('settings-theme')
    if (sel) sel.value = theme
    saveGame()
}

// ─── Navigation menus ─────────────────────────────────────────────────────────

const MENU_MAP = {
    team:         'team-menu',
    guilde:       'guilde-menu',
    items:        'item-menu',
    collection:   'encyclopédie-menu',
    Encyclopedie: 'encyclopédie-menu',
    zones:        'explore-menu',
    worldmap:     'explore-menu',
    shop:         'shop-menu',
    settings:     'settings-menu'
}

// Menus verrouillés selon l'étape du tutoriel
function isTutorialLocked(menuName) {
    if (state.tutorial === 'intro')
        return menuName === 'worldmap' || menuName === 'zones'
    if (state.tutorial === 'zones' || state.tutorial === 'combat')
        return menuName !== 'worldmap' && menuName !== 'zones'
    return false
}

const MENU_ITEM_MAP = {
    'menu-item-travel': 'worldmap',
    'menu-item-items':  'items',
    'menu-item-team':   'team',
    'menu-item-guilde': 'guilde',
    'menu-item-dex':    'Encyclopedie',
    'menu-item-shop':   'shop'
}

function updateMenuLockUI() {
    for (const [elId, menuName] of Object.entries(MENU_ITEM_MAP)) {
        const el = document.getElementById(elId)
        if (el) el.classList.toggle('menu-item-locked', isTutorialLocked(menuName))
    }
}

let activeMenu = null

function openMenu() {
    document.getElementById('menu-button').classList.toggle('menu-button-open')
}

function switchMenu(menuName) {
    document.getElementById('menu-button').classList.remove('menu-button-open')

    // En combat, World Map ramène à la vue de combat plutôt que la sélection de zone
    if ((menuName === 'worldmap' || menuName === 'zones') && state.isRunning) {
        for (const id of Object.values(MENU_MAP)) {
            const el = document.getElementById(id)
            if (el) { el.style.display = 'none'; el.style.zIndex = '30' }
        }
        document.getElementById('main-content').style.zIndex = ''
        activeMenu = null
        return
    }

    if (isTutorialLocked(menuName)) {
        const msg = state.tutorial === 'intro'
            ? 'Choisissez d\'abord une classe !'
            : 'Terminez d\'abord un combat dans World Map !'
        showNotification(msg, 'error')
        return
    }

    for (const id of Object.values(MENU_MAP)) {
        const el = document.getElementById(id)
        if (el) { el.style.display = 'none'; el.style.zIndex = '30' }
    }

    const targetId = MENU_MAP[menuName]
    if (!targetId) return
    const target = document.getElementById(targetId)
    if (!target) return

    const mainContent = document.getElementById('main-content')

    if (activeMenu === menuName) {
        activeMenu = null
        if (mainContent) mainContent.style.zIndex = ''
        return
    }

    target.style.display = 'flex'
    target.style.zIndex  = '40'
    activeMenu = menuName
    // Élève main-content au-dessus de content-explore (z-index 20)
    // pour que les menus enfants de main-content soient visibles pendant le combat
    if (mainContent) mainContent.style.zIndex = '25'

    if (menuName === 'team') {
        // Opening team via hamburger = no zone pending
        const bar = document.getElementById('zone-confirm-bar')
        if (bar) bar.style.display = 'none'
        if (typeof _pendingAreaId !== 'undefined') _pendingAreaId = null
        updateTeamUI()
    }
    if (menuName === 'guilde')                       updateGuildeUI()
    if (menuName === 'items')                        setInventoryFilter(inventoryFilter)
    if (menuName === 'collection' ||
        menuName === 'Encyclopedie')                 updateCollectionUI()
    if (menuName === 'zones' || menuName === 'worldmap') updateZoneUI()
    if (menuName === 'shop') updateShopUI()
}

// ─── Tooltip / modal ──────────────────────────────────────────────────────────

const tooltipStack = []

function openTooltip(title, body) {
    const bg  = document.getElementById('tooltipBackground')
    const ttl = document.getElementById('tooltipTitle')
    const bot = document.getElementById('tooltipBottom')
    const mid = document.getElementById('tooltipMid')
    if (!bg) return
    tooltipStack.push({ title, body })
    if (ttl) ttl.innerHTML = title || ''
    if (bot) bot.innerHTML = body  || ''
    if (mid) { mid.innerHTML = ''; mid.style.display = 'none' }
    bg.style.display = 'flex'
    bg.style.zIndex  = '50'
}

function closeTooltip() {
    tooltipStack.pop()
    if (tooltipStack.length > 0) {
        const prev = tooltipStack[tooltipStack.length - 1]
        const ttl  = document.getElementById('tooltipTitle')
        const bot  = document.getElementById('tooltipBottom')
        if (ttl) ttl.innerHTML = prev.title || ''
        if (bot) bot.innerHTML = prev.body  || ''
    } else {
        const bg = document.getElementById('tooltipBackground')
        if (bg) bg.style.display = 'none'
    }
}

function closeAllTooltips() {
    tooltipStack.length = 0
    const bg = document.getElementById('tooltipBackground')
    if (bg) bg.style.display = 'none'
}

// ─── Notifications ────────────────────────────────────────────────────────────

function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container')
    if (!container) return
    const el = document.createElement('div')
    el.className = `notification notif-${type}`
    el.textContent = message
    container.appendChild(el)
    setTimeout(() => el.classList.add('notif-show'), 10)
    setTimeout(() => {
        el.classList.remove('notif-show')
        setTimeout(() => el.remove(), 400)
    }, 2800)
}

// ─── Tutoriel ─────────────────────────────────────────────────────────────────

const TUTORIAL_STEPS = {
    intro:  'Choisissez votre classe de départ pour commencer l\'aventure !',
    zones:  'Rendez-vous dans le menu World Map pour lancer votre premier combat !',
    combat: 'Votre équipe combat automatiquement. Regardez les dégâts !',
    outro:  'Maintenant que vous avez compris les bases, explorez et découvrez par vous-même ! Au détour d\'un combat, un légendaire Dofus apparaîtra peut-être...',
    none:   null
}

function showTutorial() {
    const wrap = document.getElementById('tutorial')
    const el   = document.getElementById('tutorial-text')
    if (!wrap || !el) return
    const msg = TUTORIAL_STEPS[state.tutorial]
    if (msg) {
        el.textContent  = msg
        wrap.style.display = 'flex'
    } else {
        wrap.style.display = 'none'
    }
    updateMenuLockUI()
}

function advanceTutorial(fromStep) {
    if (state.tutorial !== fromStep) return
    const next = { intro: 'zones', zones: 'combat', combat: 'outro', outro: 'none' }
    state.tutorial = next[fromStep] || 'none'
    showTutorial()
    saveGame()
}

function skipTutorial() {
    state.tutorial = 'none'
    showTutorial()
    saveGame()
}

// ─── Écran de défaite ─────────────────────────────────────────────────────────

// ─── Résumé de session (victoire, défaite, départ manuel) ────────────────────

function showSessionSummary(type) {
    const end = document.getElementById('area-end')
    if (!end) return

    const session = (typeof combat !== 'undefined' && combat)
        ? combat.sessionLoot
        : { itemDrops: [], familiarDrops: [], killCount: 0, memberDamage: {}, learnedMoves: [] }

    const exploreTeam  = document.getElementById('explore-team')
    const exploreLeave = document.getElementById('explore-leave')
    const enemyDisplay = document.getElementById('enemy-display')
    const menuParent   = document.getElementById('menu-button-parent')
    if (exploreTeam)  exploreTeam.style.display  = 'none'
    if (exploreLeave) exploreLeave.style.display = 'none'
    if (enemyDisplay) enemyDisplay.style.display = 'none'
    if (menuParent)   menuParent.style.display   = 'none'
    end.style.display = 'flex'

    let titleText = 'Résumé'
    if (type === 'defeat')       titleText = 'Équipe vaincue...'
    else if (type === 'dungeon') titleText = 'Donjon terminé !'
    else if (type === 'leave')   titleText = `${session.killCount} ennemi${session.killCount > 1 ? 's' : ''} vaincu${session.killCount > 1 ? 's' : ''}`

    // ── Sorts appris
    const learnedMoves = session.learnedMoves || []
    const learnedHtml = learnedMoves.length > 0
        ? learnedMoves.map(({ member, moveId }) => {
            const cls  = classes[member.classId]
            const mv   = move[moveId]
            const elem = mv?.effects?.[0]?.element || 'neutre'
            return `<div class="ae-learned-row">
                <img class="ae-learned-sprite" src="${cls?.image || 'img/icons/icon.png'}" onerror="this.src='img/icons/icon.png'">
                <span class="ae-learned-member">${cls?.name || '?'}</span>
                <span class="ae-learned-arrow">›</span>
                <div class="ae-learned-move elem-bar-${elem}">
                    ${elemIcon(elem, 'ae-move-icon')}
                    <span>${mv?.name || '?'}</span>
                </div>
            </div>`
        }).join('')
        : '<span class="no-drop">Aucun sort appris</span>'

    // ── Objets (groupés par itemId)
    const itemDrops      = session.itemDrops || []
    const kamasFromDrops = session.kamasFromDrops || 0
    const kamasBubble = kamasFromDrops > 0
        ? `<div class="game-bubble kamas-bubble" title="${kamasFromDrops} kamas">
               <span class="bubble-level">+${kamasFromDrops}</span>
               <img src="img/icons/kamas.png" onerror="this.src='img/icons/icon.png'">
           </div>`
        : ''
    const _itemGrouped = {}
    for (const drop of itemDrops) {
        if (!_itemGrouped[drop.itemId]) _itemGrouped[drop.itemId] = { ...drop, qty: 0 }
        _itemGrouped[drop.itemId].qty++
        if ((drop.level || 0) > (_itemGrouped[drop.itemId].level || 0))
            _itemGrouped[drop.itemId].level = drop.level
    }
    const itemsHtml = (itemDrops.length > 0 || kamasFromDrops > 0)
        ? Object.values(_itemGrouped).map(drop => {
            const itm = item[drop.itemId]
            if (!itm) return ''
            const badge = drop.level > 0
                ? `<span class="bubble-level">Niv.${drop.level}</span>`
                : drop.qty > 1
                    ? `<span class="bubble-level">×${drop.qty}</span>`
                    : ''
            return `<div class="game-bubble" title="${itm.name}" data-help="${drop.itemId}" onclick="showItemTooltip('${drop.itemId}')" oncontextmenu="event.preventDefault();showItemTooltip('${drop.itemId}')">
                ${badge}
                <img src="${itm.image || 'img/icons/icon.png'}" onerror="this.src='img/icons/icon.png'">
            </div>`
        }).join('') + kamasBubble
        : '<span class="no-drop">Rien cette fois...</span>'

    // ── Familiers
    const drops = session.familiarDrops || []
    let famHtml = '<span class="no-drop">Aucune Pierre d\'âme...</span>'
    if (drops.length > 0) {
        const grouped = {}
        for (const fd of drops) {
            if (!grouped[fd.monsterId]) grouped[fd.monsterId] = { ...fd, count: 0 }
            grouped[fd.monsterId].count++
            grouped[fd.monsterId].newLevel = fd.newLevel
            grouped[fd.monsterId].isNew    = grouped[fd.monsterId].isNew || fd.isNew
        }
        famHtml = Object.values(grouped).map(g => {
            const mob = monsters[g.monsterId]
            if (!mob) return ''
            const countLabel = g.count > 1 ? ` ×${g.count}` : ''
            return `<div class="game-bubble" title="${mob.name}${countLabel}${g.isNew ? ' (Nouveau !)' : ''}">
                <span class="bubble-level">Niv.${g.newLevel}</span>
                <img src="${mob.image}" onerror="this.src='img/icons/icon.png'">
            </div>`
        }).join('')
    }

    const piloteEntry   = state.inventory['piloteAutomatique']
    const piloteItem    = item['piloteAutomatique']
    const autoPilotBtn  = (piloteEntry?.count > 0 && state.currentArea)
        ? `<div class="ae-btn ae-btn-autopilot" onclick="showAutoPilotPicker()">
               <img src="${piloteItem?.image || 'img/icons/icon.png'}" class="ae-autopilot-icon" onerror="this.src='img/icons/icon.png'">
               Pilote automatique
               <span class="ae-autopilot-badge">×${piloteEntry.count}</span>
           </div>`
        : ''

    end.innerHTML = `
        <div class="ae-header">Résumé de fin de combat</div>
        <div class="ae-title">${titleText}</div>
        <div class="ae-actions">
            <div class="ae-btn ae-btn-quit" onclick="exitCombat()">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"/></svg>
                Quitter
            </div>
            <div class="ae-btn ae-btn-rejoin" onclick="rejoinArea()">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6c0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8m0 14c-3.31 0-6-2.69-6-6c0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4l-4-4z"/></svg>
                Rejouer
            </div>
            ${autoPilotBtn}
            <div class="ae-btn ae-btn-summary" onclick="showDamagePopup()">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M9 17H7v-7h2zm4 0h-2V7h2zm4 0h-2v-4h2zm2 2H5V5h14zm0-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
                Résumé de combat
            </div>
        </div>
        ${learnedMoves.length > 0 ? `
        <div class="ae-box">
            <div class="ae-box-title">Sorts appris</div>
            <div class="ae-box-content ae-learned">${learnedHtml}</div>
        </div>` : ''}
        <div class="ae-box">
            <div class="ae-box-title">Objets obtenus</div>
            <div class="ae-box-content ae-bubbles">${itemsHtml}</div>
        </div>
        <div class="ae-box">
            <div class="ae-box-title">Familiers collectés</div>
            <div class="ae-box-content ae-bubbles">${famHtml}</div>
        </div>`

    advanceTutorial('combat')
}

function showDamagePopup() {
    const session = (typeof combat !== 'undefined' && combat) ? combat.sessionLoot : null
    const memberDamage = session?.memberDamage || {}
    const total = Object.values(memberDamage).reduce((s, v) => s + v, 0)

    const rows = Object.entries(memberDamage)
        .sort(([, a], [, b]) => b - a)
        .map(([idx, dmg]) => {
            const member = state.team[parseInt(idx)]
            if (!member) return ''
            const cls = classes[member.classId]
            const pct = total > 0 ? Math.round((dmg / total) * 100) : 0
            const bar = `<div style="height:0.35rem;border-radius:0.2rem;background:rgba(255,255,255,0.12);margin-top:0.2rem;">
                <div style="width:${pct}%;height:100%;background:#5dade2;border-radius:0.2rem;"></div></div>`
            return `<div class="ms-stat-row" style="flex-direction:column;align-items:flex-start;gap:0.1rem;">
                <div style="display:flex;align-items:center;gap:0.5rem;width:100%;">
                    <img src="${cls?.image || 'img/icons/icon.png'}" onerror="this.src='img/icons/icon.png'"
                         style="width:2rem;height:2rem;object-fit:contain;flex-shrink:0;image-rendering:pixelated;">
                    <span class="ms-stat-label">${cls?.name || '?'} <small style="opacity:0.45">niv.${member.level}</small></span>
                    <span class="ms-stat-val" style="margin-left:auto;">${dmg.toLocaleString('fr-FR')} dég — ${pct}%</span>
                </div>
                ${bar}
            </div>`
        }).join('')

    const body = `<div class="member-sheet">
        <div class="ms-section-title">Total : ${total.toLocaleString('fr-FR')} dégâts — ${session?.killCount || 0} ennemi${(session?.killCount || 0) > 1 ? 's' : ''}</div>
        <div class="ms-stats" style="gap:0.6rem;">
            ${rows || '<span style="opacity:0.45;font-size:0.85rem">Aucun dégât enregistré.</span>'}
        </div>
    </div>`

    openTooltip('Résumé de combat', body)
}

function showAutoPilotPicker() {
    const available = state.inventory['piloteAutomatique']?.count || 0
    if (available <= 0) return
    const piloteItem = item['piloteAutomatique']
    const qtys = [1, 5, 10, 25, 50, 100].filter(q => q <= available)

    const body = `<div class="autopilot-picker">
        <div class="autopilot-picker-desc">Combien de sessions lancer automatiquement ?</div>
        <div class="autopilot-qty-row">
            ${qtys.map(q => `<button class="autopilot-qty-btn" onclick="closeTooltip(); startAutoPilot(${q})">${q}</button>`).join('')}
            <button class="autopilot-qty-btn autopilot-qty-max" onclick="closeTooltip(); startAutoPilot('max')">
                Max<br><small>${available}</small>
            </button>
        </div>
        <div class="autopilot-picker-stock">
            <img src="${piloteItem?.image || 'img/icons/icon.png'}" onerror="this.src='img/icons/icon.png'">
            ${available} pilote${available > 1 ? 's' : ''} disponible${available > 1 ? 's' : ''}
        </div>
        <div class="autopilot-picker-hint">Un pilote est consommé à chaque défaite. Cliquez sur Leave pendant un combat pour arrêter.</div>
    </div>`

    openTooltip('Pilote Automatique', body)
}

// Alias pour compatibilité (appelé depuis engine/combat.js)
function showBattleSummary(loot) { showSessionSummary('leave') }
function showDefeatScreen()      { showSessionSummary('defeat') }

// ─── Équipes préset ───────────────────────────────────────────────────────────

function getCurrentPreviewTeam() {
    const key = state.currentPreviewTeam
    if (!state.previewTeams[key]) state.previewTeams[key] = []
    return state.previewTeams[key]
}

function injectPreviewTeam() {
    if (state.isRunning) {
        showNotification('Impossible de changer d\'équipe en combat !', 'error')
        return
    }
    const preset = getCurrentPreviewTeam()
    state.team = preset.map(m => m ? { ...m } : null).filter(Boolean)
    saveGame()
    updateTeamUI()
}

// Alias PokéChill — met à jour l'UI de l'équipe active
function updatePreviewTeam() { updateTeamUI() }

// ─── Stubs de compatibilité PokéChill (inline HTML) ──────────────────────────

let geneticItemSelect = false
let dexTeamSelect     = undefined
let bagCategory       = 'held'
let shopCategory      = 'goods'

function exitMstrTeam()    { switchMenu('team') }
function battleSummary()   {}
function closeMstrEditor() {}
function updateFamiliarUI() {}
function updateItemBag()   { updateInventoryUI() }
function updateItemShop()  {}

function editTeamName() {
    const key     = state.currentPreviewTeam
    const current = state.teamNames[key] || key.replace('preview', 'Team ')
    const name    = prompt('Nom de l\'équipe :', current)
    if (name === null) return
    state.teamNames[key] = name.trim() || current
    refreshTeamNames()
    saveGame()
}

function refreshTeamNames() {
    const teamSel = document.getElementById('team-slot-selector')
    if (!teamSel) return
    for (const opt of teamSel.options) {
        const name = state.teamNames[opt.value]
        if (name) opt.textContent = name
    }
}

// ─── Initialisation ───────────────────────────────────────────────────────────

function initGame() {
    loadGame()
    changeTheme(state.theme || 'dark')

    const sel = document.getElementById('settings-theme')
    if (sel) sel.value = state.theme || 'dark'

    // Sélecteur d'équipe préset
    const teamSel = document.getElementById('team-slot-selector')
    if (teamSel) {
        teamSel.value = state.currentPreviewTeam || 'preview1'
        refreshTeamNames()
        teamSel.addEventListener('change', () => {
            if (state.isRunning) {
                showNotification('Impossible de changer d\'équipe en combat !', 'error')
                teamSel.value = state.currentPreviewTeam
                return
            }
            // Synchronise classEquip pour chaque membre avant de changer de team
            // (garantit que les niveaux sont préservés même si previewTeams est corrompu)
            if (!state.classEquip) state.classEquip = {}
            for (const m of state.team) {
                if (!m) continue
                state.classEquip[m.classId] = {
                    level: m.level,
                    exp:   m.exp
                }
            }
            // Sauvegarde l'équipe courante dans previewTeams avant de changer
            state.previewTeams[state.currentPreviewTeam] = state.team
            // Change de slot
            state.currentPreviewTeam = teamSel.value
            // Charge la nouvelle équipe (clone pour éviter les références partagées)
            // Niveau/XP pris depuis classEquip (source de vérité partagée) ;
            // equip/moves restent propres à chaque team.
            const saved = state.previewTeams[state.currentPreviewTeam]
            state.team = Array.isArray(saved) && saved.length > 0
                ? saved.filter(Boolean).map(m => {
                    const ce = state.classEquip?.[m.classId]
                    return {
                        ...m,
                        level: ce?.level ?? m.level,
                        exp:   ce?.exp   ?? m.exp,
                        equip: { ...m.equip },
                        moves: { ...m.moves },
                        buffs: []
                    }
                  })
                : []
            saveGame()
            updateTeamUI()
        })
    }

    initTeamDragDrop()

    // Raccourcis clavier
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            if (tooltipStack.length > 0) { closeTooltip(); return }
            const guildeOpen = document.getElementById('guilde-picker')?.style.display === 'flex'
            if (guildeOpen) { closeGuildePicker(); return }
            if (activeMenu) { switchMenu(activeMenu); return }
        }
    })

    // Clic droit → tooltip d'aide
    document.addEventListener('contextmenu', e => {
        // Sort → tooltip de sort (priorité)
        const moveBar = e.target.closest('[data-move-id]')
        if (moveBar) {
            e.preventDefault()
            const moveId = moveBar.dataset.moveId
            let casterStats = null
            if (moveBar.dataset.casterEnemy) {
                const en = typeof combat !== 'undefined' && combat?.enemy
                if (en) casterStats = { atk: en.atk || 0, flatDamage: en.flatBonus || 0, finalDamagePct: en.bonusAtkPct || 0, spellDamagePct: 0 }
            } else if (moveBar.dataset.casterClass) {
                const classId = moveBar.dataset.casterClass
                const teamMember = state.team?.find(m => m?.classId === classId)
                const member = teamMember || (() => {
                    const saved = state.classEquip?.[classId]
                    return createTeamMember(classId, saved?.level || 1)
                })()
                if (member) casterStats = getEffectiveStats({ ...member, buffs: [] })
            }
            showMoveTooltip(moveId, casterStats)
            return
        }

        // Ennemi → fiche ennemi
        const enemyEl = e.target.closest('[data-enemy-help]')
        if (enemyEl && typeof combat !== 'undefined' && combat?.enemy) {
            e.preventDefault()
            showEnemySheet(combat.enemy)
            return
        }

        const el = e.target.closest('[data-help]')
        if (!el) return
        e.preventDefault()
        showDataHelp(el.dataset.help)
    })

    // Long-press mobile → tooltip d'aide
    let longPressTimer = null
    document.addEventListener('touchstart', e => {
        const el = e.target.closest('[data-help]')
        if (!el) return
        longPressTimer = setTimeout(() => showDataHelp(el.dataset.help), 600)
    })
    document.addEventListener('touchend',  () => { if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null } })
    document.addEventListener('touchmove', () => { if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null } })

    // Corrige le tutorial si la sauvegarde est antérieure au système de tutorial
    if (state.hasChosenStarter && state.tutorial === 'intro') {
        state.tutorial = 'none'
    }

    if (!state.hasChosenStarter) {
        const menuParent = document.getElementById('menu-button-parent')
        if (menuParent) menuParent.style.display = 'none'

        const disc = document.getElementById('disclaimer-menu')
        disc.style.display = 'flex'
        setTimeout(() => {
            disc.style.opacity = '0'
            setTimeout(() => {
                disc.style.display = 'none'
                document.getElementById('starter-menu').style.display = 'flex'
                showTutorial()
            }, 1000)
        }, 5000)
    } else {
        document.getElementById('starter-menu').style.display = 'none'
        showTutorial()
        updateTeamUI()
        updateCombatUI()

        for (const m of state.team) {
            if (!m) continue
            const stats = getEffectiveStats(m)
            if (stats) { m.maxHp = stats.hp; if (!m.currentHp) m.currentHp = stats.hp }
            if (!m.buffs) m.buffs = []
        }
    }
}

window.addEventListener('load', initGame)

// Sauvegarde automatique toutes les 30s
setInterval(saveGame, 30000)
