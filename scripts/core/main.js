// main.js — State global + initialisation DofusChill

// ─── Icônes globales ─────────────────────────────────────────────────────────

const ELEM_ICONS = {
    neutre:       'img/icons/Neutre.png',
    feu:          'img/icons/Feu.png',
    eau:          'img/icons/Eau.png',
    air:          'img/icons/Air.png',
    terre:        'img/icons/Terre.png',
    all_elements: 'img/icons/terre-feu-eau-air.png',
    sagesse:      'img/icons/Sagesse.png',
    soigneur:     'img/icons/soigneur.png',
    boost:        'img/icons/boost.png',
    entrave:      'img/icons/entrave.png',
    protection:   'img/icons/protection.png',
    tank:         'img/icons/tank.png',
    placement:    'img/icons/placement.png',
    invocation:   'img/icons/invocation.png',
}
const STAT_ICONS = {
    hp:         'img/icons/Hp.png',
    atk:        'img/icons/puissance.png',
    flatDamage: 'img/icons/Dommages.png',
    spd:        'img/icons/Vitesse.png',
    soin:    'img/icons/Soin.png',
    volVie:  'img/icons/Vol_Vie.png',
    buff:    'img/icons/Boost.png'
}
function voidAnimation(id, animation) {
    const el = document.getElementById(id)
    if (!el) return
    el.style.animation = 'none'
    el.offsetHeight
    el.style.animation = animation
}

let _zaapTransitionPending = false
function playZaapTransition(callback) {
    if (_zaapTransitionPending) return
    const el = document.getElementById('explore-transition')
    if (!el) { callback(); return }
    _zaapTransitionPending = true
    const mc = document.getElementById('main-content')
    if (mc) mc.style.backgroundImage = 'none'
    voidAnimation('explore-transition', 'exploreTransition 1s 1')
    el.style.display = 'flex'
    setTimeout(callback, 500)
    setTimeout(() => {
        el.style.display = 'none'
        if (mc) mc.style.backgroundImage = ''
        _zaapTransitionPending = false
    }, 1000)
}

function elemIcon(elem, cssClass = 'elem-icon') {
    const src = ELEM_ICONS[elem] || ELEM_ICONS.neutre
    return `<img src="${src}" class="${cssClass}" onerror="this.src='img/icons/Neutre.png'">`
}
const _MOVE_TYPE_ICON = {
    damage:            null, // utilise l'élément
    dot:               null,
    absorbElementDmg:    'all_elements',
    best_element_damage: 'all_elements',
    worst_element_damage:'all_elements',
    elementDmgPeek:      'all_elements',
    nextElementDmg:      'all_elements',
    heal:              'soigneur',
    heal_team:         'soigneur',
    'heal%maxHp':      'soigneur',
    lifesteal:         'soigneur',
    buff:              'boost',
    buff_team:         'boost',
    debuff:            'entrave',
    shield:            'protection',
    renvoi:            'tank',
    switch:            'placement',
    summon:            'invocation',
    summon_random:     'invocation',
}
function moveIconKey(mv) {
    const type = mv?.effects?.[0]?.type || ''
    const elem = mv?.effects?.[0]?.element || ''
    const mapped = _MOVE_TYPE_ICON[type]
    if (mapped != null) return mapped  // valeur explicite (non-null) → retour direct
    // Aplatit les effets imbriqués dans les choices (type random)
    const flat = []
    for (const e of (mv?.effects || [])) {
        if (e.type === 'random' && e.choices) {
            for (const c of e.choices) for (const se of (c.effects || [])) flat.push(se)
        } else {
            flat.push(e)
        }
    }
    // Priorité 1 : éléments de dégâts (damage, dot, damage_zone)
    const dmgElems = new Set(flat
        .filter(e => e.type === 'damage' || e.type === 'dot' || e.type === 'damage_zone')
        .map(e => e.element).filter(Boolean))
    if (dmgElems.size > 1) return 'all_elements'
    if (dmgElems.size === 1) return [...dmgElems][0]
    // Priorité 2 : types avec icône explicite (best_element_damage, shield, buff…)
    for (const e of flat) {
        const m = _MOVE_TYPE_ICON[e.type]
        if (m != null) return m
    }
    if (mapped === null) return elem || 'neutre'  // null = "utilise l'élément"
    return elem || 'sagesse'
}

const ELEM_COLORS = {
    feu:    '#ffa23f',
    eau:    '#539DDF',
    air:    '#92BD2D',
    terre:  '#7d6b4c',
    neutre: '#595761',
    buff:   '#ffe262',
    debuff: '#cf95ff'
}

// ─── Helpers de barre de sort multi-élément ───────────────────────────────────

function getMoveBarElems(mv) {
    const effects = mv?.effects || []
    if (!effects.length) return { elems: ['neutre'] }
    const firstType = effects[0].type || ''
    if (firstType === 'buff' || firstType === 'buff_team' || firstType === 'hot')
        return { elems: ['buff'] }
    if (firstType === 'debuff' || firstType === 'debuff_team' || firstType === 'antiHeal')
        return { elems: ['debuff'] }
    // Aplatit les effets imbriqués dans les choices (type random)
    const flat = []
    for (const e of effects) {
        if (e.type === 'random' && e.choices) {
            for (const c of e.choices) for (const se of (c.effects || [])) flat.push(se)
        } else {
            flat.push(e)
        }
    }
    if (flat.some(e => e.type === 'absorbElementDmg' || e.type === 'best_element_damage'
                    || e.type === 'worst_element_damage' || e.type === 'elementDmgPeek' || e.type === 'nextElementDmg'))
        return { elems: ['terre', 'feu', 'eau', 'air'] }
    const seen = new Set(), elems = []
    for (const e of flat) {
        if ((e.type === 'damage' || e.type === 'dot' || e.type === 'damage_zone') && e.element && !seen.has(e.element)) {
            elems.push(e.element); seen.add(e.element)
        }
    }
    if (!elems.length) return { elems: [effects[0].element || 'neutre'] }
    return { elems }
}

function _moveBarGradient(colors) {
    if (colors.length === 1) return colors[0]
    const pct = 100 / colors.length
    return `linear-gradient(to right,${colors.map((c, i) => `${c} ${i * pct}% ${(i + 1) * pct}%`).join(',')})`
}

// Retourne { bgClass, bgStyle } pour les éléments fond-uniquement (es-move-row, ae-learned-move…)
function getMoveElemBg(mv) {
    const { elems } = getMoveBarElems(mv)
    if (elems.length === 1) return { bgClass: `elem-bar-${elems[0]}`, bgStyle: '' }
    const grad = _moveBarGradient(elems.map(e => ELEM_COLORS[e] || ELEM_COLORS.neutre))
    return { bgClass: '', bgStyle: `background:${grad}` }
}

// Construit le HTML complet d'une combat-move-bar
function buildMoveBarHTML(mv, { fillStyle = 'width:0%', attrs = '', extraClass = '', extraStyle = '', nameContent = null } = {}) {
    if (!mv) {
        const sty = extraStyle ? ` style="${extraStyle}"` : ''
        const cls = extraClass ? ` ${extraClass}` : ''
        return `<div class="combat-move-bar combat-move-empty${cls}"${sty} ${attrs}><span class="combat-move-name">—</span></div>`
    }
    const { elems } = getMoveBarElems(mv)
    const colors   = elems.map(e => ELEM_COLORS[e] || ELEM_COLORS.neutre)
    const isMulti  = elems.length > 1
    const primaryElem  = elems[0]
    const primaryColor = ELEM_COLORS[primaryElem] || ELEM_COLORS.neutre
    let barClass = 'combat-move-bar', barStyleParts = []
    let fillClass = 'combat-move-fill', fillBg = ''
    let iconBgClass = 'combat-move-icon-bg', iconBgStyle = ''
    if (isMulti) {
        const grad = _moveBarGradient(colors)
        barStyleParts.push(`border:2px solid transparent`, `background:linear-gradient(var(--dark1),var(--dark1)) padding-box,${grad} border-box`)
        fillBg     = `background:${grad};`
        iconBgStyle = `background:${primaryColor}`
    } else {
        barClass    += ` elem-bar-${primaryElem}`
        fillClass   += ` elem-bar-${primaryElem}`
        iconBgClass += ` elem-bar-${primaryElem}`
    }
    const restriction = mv.restriction
    if (restriction) {
        barClass += ` move-bar-restriction-${restriction}`
        barStyleParts.push(`--heart-bg:${isMulti ? _moveBarGradient(colors) : primaryColor}`)
    }
    if (extraClass)   barClass += ` ${extraClass}`
    if (extraStyle)   barStyleParts.push(extraStyle)
    const barSty   = barStyleParts.length ? ` style="${barStyleParts.join(';')}"` : ''
    const iconSty  = iconBgStyle ? ` style="${iconBgStyle}"` : ''
    const name     = nameContent !== null ? nameContent : `${mv.name || '—'}${moveRestrictionSigle(mv, primaryElem)}`
    return `<div class="${barClass}"${barSty} ${attrs}>
        <div class="${fillClass}" style="${fillBg}${fillStyle}"></div>
        <span class="combat-move-name">${name}</span>
        <div class="${iconBgClass}"${iconSty}>${elemIcon(moveIconKey(mv), 'combat-move-icon')}</div>
    </div>`
}

const _RESTRICTION_SVG = {
    star:   c => `<svg style="color:${c};vertical-align:middle;margin-left:3px;flex-shrink:0" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path fill="currentColor" d="M21.951 9.67a1 1 0 0 0-.807-.68l-5.699-.828l-2.548-5.164A.98.98 0 0 0 12 2.486v16.28l5.097 2.679a1 1 0 0 0 1.451-1.054l-.973-5.676l4.123-4.02a1 1 0 0 0 .253-1.025" opacity="0.5"/><path fill="currentColor" d="M11.103 2.998L8.555 8.162l-5.699.828a1 1 0 0 0-.554 1.706l4.123 4.019l-.973 5.676a1 1 0 0 0 1.45 1.054L12 18.765V2.503a1.03 1.03 0 0 0-.897.495"/></svg>`,
    arrow:  c => `<svg style="color:${c};vertical-align:middle;margin-left:3px;flex-shrink:0" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"><path stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" d="M9 6l6 6-6 6"/></svg>`,
    shield: c => `<svg style="color:${c};vertical-align:middle;margin-left:3px;flex-shrink:0" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path fill="currentColor" d="M12.832 21.801c3.126-.626 7.168-2.875 7.168-8.69c0-5.291-3.873-8.815-6.658-10.434c-.619-.36-1.342.113-1.342.828v1.828c0 1.442-.606 4.074-2.29 5.169c-.86.559-1.79-.278-1.894-1.298l-.086-.838c-.1-.974-1.092-1.565-1.87-.971C4.461 8.46 3 10.33 3 13.11C3 20.221 8.289 22 10.933 22q.232 0 .484-.015c.446-.056 0 .099 1.415-.185" opacity="0.5"/><path fill="currentColor" d="M8 18.444c0 2.62 2.111 3.43 3.417 3.542c.446-.056 0 .099 1.415-.185C13.871 21.434 15 20.492 15 18.444c0-1.297-.819-2.098-1.46-2.473c-.196-.115-.424.03-.441.256c-.056.718-.746 1.29-1.215.744c-.415-.482-.59-1.187-.59-1.638v-.59c0-.354-.357-.59-.663-.408C9.495 15.008 8 16.395 8 18.445"/></svg>`,
    coeur:  c => `<svg style="color:${c};vertical-align:middle;margin-left:3px;flex-shrink:0" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path fill="currentColor" d="M12 20.703l-.343.667a.75.75 0 0 0 .686 0zm0 0l.343.667a.75.75 0 0 1-.686 0zM2.019 10.39c-.144-3.4 2.496-6.14 5.761-6.14c1.718 0 3.291.757 4.22 1.986c.93-1.23 2.502-1.987 4.22-1.987c3.265 0 5.905 2.74 5.761 6.14c-.14 3.312-2.374 6.25-5.498 8.368l-.003.002l-4.137 2.556a.75.75 0 0 1-.686 0l-4.14-2.558l-.003-.002C4.393 16.641 2.16 13.703 2.02 10.39"/></svg>`
}
function moveRestrictionSigle(mv, elem) {
    if (!mv?.restriction) return ''
    const color = ELEM_COLORS[elem] || ELEM_COLORS.neutre
    const fn = _RESTRICTION_SVG[mv.restriction]
    return fn ? fn(color) : ''
}

// ─── State global ─────────────────────────────────────────────────────────────

const STARTER_CLASSES = ['iop', 'cra', 'eniripsa']

const state = {
    team: [],
    currentArea: null,
    isRunning: false,
    inventory: {},
    collection: {},
    seenMonsters: {},
    kamas: 0,
    hasChosenStarter: false,
    theme: 'dark',
    tutorial: 'intro',
    previewTeams: { preview1: [] },
    currentPreviewTeam: 'preview1',
    classEquip: {},
    ownedSkins: [],
    teamNames: {},
    unlockedClasses: [],
    totalKills: 0,
    defeatedBosses: [],
    doubleCritAchieved: false,
    lastFrameRecorded: null,
    savedCombatEnemy: null,
    savedCombatState: null,
    autoPilotAccumulated: null,
    offlineAutoPilotRemaining: 0,
    dungeonAutoRestart: false,
    lastAlmanaxDate: null,
    dailyPool: null,
    eventPool: null,
    raidPool:  null,
    skullLevel: 0,
    skullUnequipped: null,
    skullRecords: {},
    session: {
        killCount: 0,
        dropCount: 0,
        startTime: Date.now()
    },
    Boss_Ultime: null
}

// ─── Thème ────────────────────────────────────────────────────────────────────



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
    archives:     'archives-menu',
    poutch:       'poutch-menu',
    forge:        'forge-menu',
    raid:         'raid-menu',
    Boss_Ultime:       'Boss_Ultime-menu',
    guide:        'guide-menu',
    credits:      'credits-menu'
}

// Menus verrouillés selon l'étape du tutoriel
// Seule la phase 'intro' verrouille des menus (worldmap inaccessible avant le choix de classe).
// Les phases suivantes guident le joueur via les messages du tutoriel sans hard-lock.
function isTutorialLocked(menuName) {
    if (state.tutorial === 'intro')
        return menuName === 'worldmap' || menuName === 'zones'
    return false
}

const MENU_ITEM_MAP = {
    'menu-item-travel': 'worldmap',
    'menu-item-items':  'items',
    'menu-item-team':   'team',
    'menu-item-guilde': 'guilde',
    'menu-item-dex':      'Encyclopedie',
    'menu-item-shop':     'shop',
    'menu-item-archives': 'archives',
    'menu-item-poutch':   'poutch',
    'menu-item-forge':    'forge',
    'menu-item-raid':     'raid',
    'menu-item-Boss_Ultime':   'Boss_Ultime',
    'menu-item-guide':    'guide',
    'menu-item-credits':  'credits'
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

    // En combat, World Map et Raid ramènent à la vue de combat
    if ((menuName === 'worldmap' || menuName === 'zones' || menuName === 'raid') && state.isRunning) {
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
        // Cache la barre de confirmation seulement s'il n'y a pas de zone en attente.
        // Si _pendingAreaId est défini (ex : tutorial team_prep), on garde la barre visible.
        if (!_pendingAreaId) {
            const bar = document.getElementById('zone-confirm-bar')
            if (bar) bar.style.display = 'none'
        }
        updateTeamUI()
    }
    if (menuName === 'guilde')                       updateGuildeUI()
    if (menuName === 'items')                        setInventoryFilter(inventoryFilter)
    if (menuName === 'collection' ||
        menuName === 'Encyclopedie')                 updateCollectionUI()
    if (menuName === 'zones' || menuName === 'worldmap') updateZoneUI()
    if (menuName === 'shop') updateShopUI()
    if (menuName === 'archives') updateArchivesUI()
    if (menuName === 'poutch') updatePoutchUI()
    if (menuName === 'forge')  updateForgeUI()
    if (menuName === 'raid')    updateRaidUI()
    if (menuName === 'Boss_Ultime')  updateBoss_UltimeUI()
    if (menuName === 'guide')   renderGuide()
    if (menuName === 'credits') renderCredits()
}

// ─── Tooltip / modal ──────────────────────────────────────────────────────────

const tooltipStack = []
let _suppressNextClick = false   // module-level so closeTooltip() can reset it
let _tooltipLastCloseTime = 0    // guards against iOS ghost-click re-opening the tooltip

function openTooltip(title, body) {
    // Ignore opens within 350 ms of a close — absorbs iOS ghost clicks that fire
    // after ontouchend+preventDefault() and would reopen the just-closed tooltip.
    if (tooltipStack.length === 0 && Date.now() - _tooltipLastCloseTime < 350) return
    const bg  = document.getElementById('tooltipBackground')
    const ttl = document.getElementById('tooltipTitle')
    const bot = document.getElementById('tooltipBottom')
    const mid = document.getElementById('tooltipMid')
    if (!bg) return
    // Save scroll position of the current layer before stacking a new one
    if (tooltipStack.length > 0) {
        const box = document.getElementById('tooltipBox')
        if (box) tooltipStack[tooltipStack.length - 1].scrollTop = box.scrollTop
    }
    tooltipStack.push({ title, body })
    if (ttl) ttl.innerHTML = title || ''
    if (bot) bot.innerHTML = body  || ''
    if (mid) { mid.innerHTML = ''; mid.style.display = 'none' }
    // Align tooltip over the game panel regardless of where it sits in the DOM
    const mc = document.getElementById('main-content')
    if (mc) {
        const rect = mc.getBoundingClientRect()
        bg.style.left  = rect.left + 'px'
        bg.style.width = rect.width + 'px'
    }
    bg.style.display = 'flex'
    bg.style.zIndex  = '300'
}

// Fermeture du tooltip via touch sur le fond — vérifie les coordonnées physiques
// (event.target est peu fiable sur iOS avec overflow:scroll qui étend sa zone de capture)
function _tooltipBgTouchEnd(e) {
    const touch = e.changedTouches?.[0]
    if (!touch) return
    const inside = id => {
        const el = document.getElementById(id)
        if (!el) return false
        const r = el.getBoundingClientRect()
        return touch.clientX >= r.left && touch.clientX <= r.right &&
               touch.clientY >= r.top  && touch.clientY <= r.bottom
    }
    if (inside('tooltipBox') || inside('tooltipClose')) return
    e.preventDefault()
    closeTooltip()
}

function closeTooltip() {
    tooltipStack.pop()
    if (tooltipStack.length > 0) {
        const prev = tooltipStack[tooltipStack.length - 1]
        const ttl  = document.getElementById('tooltipTitle')
        const bot  = document.getElementById('tooltipBottom')
        if (ttl) ttl.innerHTML = prev.title || ''
        if (bot) bot.innerHTML = prev.body  || ''
        if (prev.scrollTop != null) {
            const box = document.getElementById('tooltipBox')
            if (box) requestAnimationFrame(() => { box.scrollTop = prev.scrollTop })
        }
    } else {
        _tooltipLastCloseTime = Date.now()
        _suppressNextClick = false  // clear any stuck long-press flag so the next tap (e.g. Leave Combat) isn't silently eaten
        const bg = document.getElementById('tooltipBackground')
        if (bg) {
            bg.style.display = 'none'
            bg.style.left  = ''
            bg.style.width = ''
        }
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
    intro:     'Choisissez votre classe de départ pour commencer l\'aventure !',
    zones:     'Rendez-vous dans le menu World Map pour lancer votre premier combat !',
    team_prep: 'Clique sur un emplacement vide pour ajouter ton personnage à l\'équipe !',
    combat:    'Votre équipe combat automatiquement. Regardez les dégâts !',
    outro:     'Maintenant que vous avez compris les bases, explorez et découvrez par vous-même ! Au détour d\'un combat, un légendaire Dofus apparaîtra peut-être...',
    none:      null
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
    const next = { intro: 'zones', zones: 'team_prep', team_prep: 'combat', combat: 'outro', outro: 'none' }
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

    // Ferme tout menu ouvert avant d'afficher l'écran de fin
    for (const id of Object.values(MENU_MAP)) {
        const el = document.getElementById(id)
        if (el) { el.style.display = 'none'; el.style.zIndex = '30' }
    }
    document.getElementById('menu-button')?.classList.remove('menu-button-open')
    document.getElementById('main-content').style.zIndex = ''
    activeMenu = null

    const contentExplore   = document.getElementById('content-explore')
    const menuParent       = document.getElementById('menu-button-parent')
    if (contentExplore) contentExplore.style.display = 'none'
    if (menuParent)     menuParent.style.display     = 'none'
    const exploreResources = document.getElementById('explore-resources')
    if (exploreResources) exploreResources.innerHTML = ''
    end.style.display = 'flex'

    let titleText = 'Résumé'
    if (type === 'defeat')       titleText = 'Équipe vaincue...'
    else if (type === 'dungeon') titleText = 'Donjon terminé !'
    else if (type === 'autopilot') titleText = `Pilote auto — ${session.killCount} ennemi${session.killCount > 1 ? 's' : ''} vaincu${session.killCount > 1 ? 's' : ''}`
    else if (type === 'raid')    titleText = `Raid quitté — ${session.killCount} kill${session.killCount > 1 ? 's' : ''}`
    else if (type === 'leave')   titleText = `${session.killCount} ennemi${session.killCount > 1 ? 's' : ''} vaincu${session.killCount > 1 ? 's' : ''}`

    // ── Sorts appris
    const learnedMoves = session.learnedMoves || []
    const learnedHtml = learnedMoves.length > 0
        ? learnedMoves.map(({ member, moveId }) => {
            const cls  = classes[member.classId]
            const mv   = move[moveId]
            const { bgClass, bgStyle } = getMoveElemBg(mv)
            const bgSty = bgStyle ? ` style="${bgStyle}"` : ''
            return `<div class="ae-learned-row">
                <img class="ae-learned-sprite" src="${cls?.image || 'img/icons/icon.png'}" onerror="this.src='img/icons/icon.png'">
                <span class="ae-learned-member">${cls?.name || '?'}</span>
                <span class="ae-learned-arrow">›</span>
                <div class="ae-learned-move ${bgClass}"${bgSty}>
                    ${elemIcon(moveIconKey(mv), 'ae-move-icon')}
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
            grouped[fd.monsterId].isArchi  = grouped[fd.monsterId].isArchi || fd.isArchi
        }
        famHtml = Object.values(grouped).map(g => {
            const mob = monsters[g.monsterId]
            if (!mob) return ''
            const countLabel = g.count > 1 ? ` ×${g.count}` : ''
            const archiLabel = g.isArchi ? ' ★ ARCHI !' : ''
            return `<div class="game-bubble${g.isArchi ? ' bubble-archi-capture' : ''}" title="${mob.name}${countLabel}${archiLabel}${g.isNew ? ' (Nouveau !)' : ''}"
                onclick="showMonsterTooltip('${g.monsterId}')"
                oncontextmenu="event.preventDefault();showMonsterTooltip('${g.monsterId}')">
                ${g.isArchi
                    ? `<span class="bubble-level bubble-level-archi">★ Niv.${g.newLevel} ★</span>`
                    : `<span class="bubble-level">Niv.${g.newLevel}</span>`}
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

    function buildPanel(damageMap, barColor) {
        const total = Object.values(damageMap).reduce((s, v) => s + v, 0)
        if (total === 0) return { html: '<span style="opacity:0.45;font-size:0.85rem">Aucun dégât enregistré.</span>', total }
        const rows = Object.entries(damageMap)
            .sort(([, a], [, b]) => b - a)
            .map(([idx, dmg]) => {
                const member = state.team[parseInt(idx)]
                if (!member) return ''
                const cls = classes[member.classId]
                const pct = Math.round((dmg / total) * 100)
                const bar = `<div style="height:0.35rem;border-radius:0.2rem;background:rgba(255,255,255,0.12);margin-top:0.2rem;">
                    <div style="width:${pct}%;height:100%;background:${barColor};border-radius:0.2rem;"></div></div>`
                return `<div class="ms-stat-row" style="flex-direction:column;align-items:flex-start;gap:0.1rem;">
                    <div style="display:flex;align-items:center;gap:0.5rem;width:100%;">
                        <img src="${getMemberImage(member)}" onerror="this.src='img/icons/icon.png'"
                             style="width:2rem;height:2rem;object-fit:contain;flex-shrink:0;image-rendering:pixelated;">
                        <span class="ms-stat-label">${member.name || cls?.name || '?'} <small style="opacity:0.45">niv.${member.level}</small></span>
                        <span class="ms-stat-val" style="margin-left:auto;">${dmg.toLocaleString('fr-FR')} — ${pct}%</span>
                    </div>
                    ${bar}
                </div>`
            }).join('')
        return { html: rows, total }
    }

    const dealt    = buildPanel(session?.memberDamage         || {}, '#5dade2')
    const received = buildPanel(session?.memberDamageReceived || {}, '#e25d5d')
    const kills    = session?.killCount || 0

    const tabOn  = 'flex:1;padding:0.35rem 0;border:none;border-radius:0.4rem;cursor:pointer;font-size:0.82rem;font-weight:bold;background:var(--dark3,#2a2a2a);color:#fff;'
    const tabOff = 'flex:1;padding:0.35rem 0;border:none;border-radius:0.4rem;cursor:pointer;font-size:0.82rem;font-weight:bold;background:transparent;color:rgba(255,255,255,0.35);'

    const body = `<div class="member-sheet">
        <div style="display:flex;gap:0.4rem;margin-bottom:0.7rem;">
            <button id="dmg-tab-dealt" style="${tabOn}"
                onclick="document.getElementById('dmg-panel-dealt').style.display='';document.getElementById('dmg-panel-received').style.display='none';document.getElementById('dmg-tab-dealt').style.cssText='${tabOn}';document.getElementById('dmg-tab-received').style.cssText='${tabOff}'">
                Infligés
            </button>
            <button id="dmg-tab-received" style="${tabOff}"
                onclick="document.getElementById('dmg-panel-received').style.display='';document.getElementById('dmg-panel-dealt').style.display='none';document.getElementById('dmg-tab-received').style.cssText='${tabOn}';document.getElementById('dmg-tab-dealt').style.cssText='${tabOff}'">
                Subis
            </button>
        </div>
        <div id="dmg-panel-dealt">
            <div class="ms-section-title">${dealt.total.toLocaleString('fr-FR')} dégâts — ${kills} ennemi${kills > 1 ? 's' : ''} vaincu${kills > 1 ? 's' : ''}</div>
            <div class="ms-stats" style="gap:0.6rem;">${dealt.html}</div>
        </div>
        <div id="dmg-panel-received" style="display:none;">
            <div class="ms-section-title">${received.total.toLocaleString('fr-FR')} dégâts reçus</div>
            <div class="ms-stats" style="gap:0.6rem;">${received.html}</div>
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
    refreshDailyPools()
    simulateOfflineProgress()
    startGameLoop()
    updateGuildeUnlockBadge()

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
                if (en) {
                    const _eb = en.buffs || []
                    const _bv = stat => _eb.filter(b => b.stat === stat).reduce((s, b) => s + b.value, 0)
                    casterStats = {
                        atk:            (en.atk            || 0) + _bv('atk'),
                        flatDamage:     (en.flatDamage     || 0) + _bv('flatDamage'),
                        finalDamagePct: (en.finalDamagePct || 0) + _bv('finalDamagePct'),
                        spellDamagePct: _bv('spellDamagePct'),
                        critChance:     _bv('critChance'),
                        critDamagePct:  50 + _bv('critDamagePct'),
                    }
                }
            } else if (moveBar.dataset.casterClass) {
                const classId = moveBar.dataset.casterClass
                const teamMember = state.team?.find(m => m?.classId === classId)
                const member = teamMember || (() => {
                    const saved = state.classEquip?.[classId]
                    return createTeamMember(classId, saved?.level || 1)
                })()
                // En combat : stats réelles avec buffs actifs ; hors combat : stats de base sans buffs
                if (member) casterStats = getEffectiveStats(
                    (typeof combat !== 'undefined' && combat && teamMember) ? member : { ...member, buffs: [] }
                )
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

    // Long-press mobile → déclenche contextmenu synthétique sur tous les éléments
    let longPressTimer = null
    // Listener persistant : avale uniquement le click synthétique généré juste après un long-press
    document.addEventListener('click', e => {
        if (_suppressNextClick) { _suppressNextClick = false; e.stopPropagation(); e.preventDefault() }
    }, { capture: true })
    document.addEventListener('touchstart', e => {
        const x = e.touches[0].clientX
        const y = e.touches[0].clientY
        const target = e.target
        longPressTimer = setTimeout(() => {
            longPressTimer = null
            _suppressNextClick = true
            target.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: x, clientY: y }))
        }, 600)
    }, { passive: true })
    document.addEventListener('touchend', () => { if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null } })
    document.addEventListener('touchmove', () => { if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null } })

    // Fonctions utilitaires exposées pour le touch drag-and-drop (team.js)
    window.cancelLongPress    = () => { if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null } }
    window.suppressNextClick  = () => { _suppressNextClick = true }

    // Corrige le tutorial si la sauvegarde est antérieure au système de tutorial
    if (state.hasChosenStarter && state.tutorial === 'intro') {
        state.tutorial = 'none'
    }

    // Initialise les classes débloquées pour les anciennes sauvegardes
    if (!state.unlockedClasses) state.unlockedClasses = []
    if (state.hasChosenStarter && state.unlockedClasses.length === 0) {
        const starter = state.team.find(m => m) ||
            Object.values(state.previewTeams || {}).flat().find(m => m)
        if (starter) {
            state.unlockedClasses = [starter.classId]
            if (starter.level >= 10 && STARTER_CLASSES.includes(starter.classId)) {
                state.unlockedClasses = [...STARTER_CLASSES]
            }
        }
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
        updateAlmanaxNavItem()

        for (const m of state.team) {
            if (!m) continue
            const stats = getEffectiveStats(m)
            if (stats) { m.maxHp = stats.hp; if (!m.currentHp) m.currentHp = stats.hp }
            if (!m.buffs) m.buffs = []
        }
    }
}

window.addEventListener('load', initGame)

// Sauvegarde automatique toutes les 5s
setInterval(saveGame, 5000)

// Sauvegarde immédiate à la fermeture (beforeunload desktop, visibilitychange mobile)
window.addEventListener('beforeunload', saveGame)
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        saveGame()
        if (typeof onTabHidden === 'function') onTabHidden()
    } else {
        if (typeof onTabVisible === 'function') onTabVisible()
    }
})
