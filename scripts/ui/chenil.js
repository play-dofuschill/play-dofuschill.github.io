// ui/chenil.js — Interface du Chenil (améliorations de familiers) DofusChill
// Calqué sur ui/forge.js : liste en bulles → panel de sélection stat + "rune" (cristal).

let _chenilSelectedFamiliar = null
let _chenilSelectedStatIdx  = null
let _chenilSelectedCristal  = null  // id d'un item type 'familiarUpgrade' (kind 'doubler' ou 'passif') | null

const CHENIL_STAT_LABELS = {
    atk: 'Puissance', maxHp: 'PV', spd: 'Initiative', dropRate: 'Taux de drop', xpGain: 'Gain XP',
    flatDamage: 'Dégâts fixes', finalDamagePct: 'Dégâts finaux %', damageReductionPct: 'Réd. dégâts',
    spellDamagePct: 'Dégâts sorts %', critChance: 'Crit', critDamagePct: 'Dég. crit.',
    healPct: 'Soins %', healTeamPct: 'Soins équipe %', healMaxHpPct: 'Soins PV max %', lifestealPct: 'Vol de vie %',
    'res.eau': 'Rés. Eau', 'res.feu': 'Rés. Feu', 'res.air': 'Rés. Air',
    'res.terre': 'Rés. Terre', 'res.neutre': 'Rés. Neutre'
}

const CHENIL_ERROR_MSGS = {
    STAT_INVALID:           ()  => `Cette statistique n'existe pas sur ce familier.`,
    ITEM_UNAVAILABLE:       ()  => `Cristal introuvable dans l'inventaire.`,
    ITEM_INVALID:           ()  => `Cristal invalide.`,
    INSUFFICIENT_KAMAS:     ()  => `Pas assez de kamas.`,
    ALREADY_DOUBLED:        ()  => `Cette statistique est déjà doublée.`,
    SLOTS_FULL:             ()  => `Plus d'emplacement de doubleur disponible sur ce familier.`,
    PASSIF_ALREADY_APPLIED: ()  => `Un passif est déjà actif sur ce familier.`,
    FAMILIAR_INVALID:       ()  => `Familier invalide.`
}

// Cristaux 'familiarUpgrade' possédés, groupés par familiarUpgradeKind
function _getOwnedFamiliarUpgradeCristals(kind) {
    return Object.entries(state.inventory)
        .filter(([id, entry]) => item[id]?.type === 'familiarUpgrade' && item[id]?.familiarUpgradeKind === kind && (entry.count ?? 0) > 0)
        .map(([id, entry]) => ({ cristalId: id, cristal: item[id], count: entry.count }))
}

const chenilFilters = { search: '', sort: 'level', sortDir: 'desc' }

let _chenilFuse = null

function _getChenilFuse() {
    if (!_chenilFuse) {
        const entries = familiars.map(f => ({ id: f.id, name: f.name }))
        _chenilFuse = new Fuse(entries, { keys: ['name'], threshold: 0.4 })
    }
    return _chenilFuse
}

function _attachChenilHeroBubble(header, fam) {
    header.querySelector('.forge-hero-anchor')?.remove()
    const anchor = document.createElement('div')
    anchor.className = 'forge-hero-anchor'
    anchor.innerHTML = `<div class="game-bubble forge-hero-bubble" oncontextmenu="event.preventDefault();showFamiliarTooltip('${fam.id}')"><img src="${fam.image || 'img/icons/icon.png'}" onerror="this.src='img/icons/icon.png'"></div>`
    header.appendChild(anchor)
}

// ─── Entry point ───────────────────────────────────────────────────────────────

function updateChenilUI() {
    const content = document.getElementById('chenil-content')
    if (!content) return

    if (!_chenilSelectedFamiliar) {
        _renderChenilList(content)
    } else {
        _renderChenilPanel(content)
    }
}

function _updateChenilSortButtons() {
    const arrow    = chenilFilters.sortDir === 'asc' ? '↑' : '↓'
    const levelBtn = document.getElementById('chenil-sort-level')
    const nameBtn  = document.getElementById('chenil-sort-name')
    if (levelBtn) levelBtn.textContent = `Niv. ${chenilFilters.sort === 'level' ? arrow : '↕'}`
    if (nameBtn)  nameBtn.textContent  = `Nom ${chenilFilters.sort === 'name'  ? arrow : '↕'}`
    document.querySelectorAll('#chenil-filters .sort-btn').forEach(b =>
        b.classList.toggle('active',
            (b.id === 'chenil-sort-level' && chenilFilters.sort === 'level') ||
            (b.id === 'chenil-sort-name'  && chenilFilters.sort === 'name')))
}

// ─── Liste (style forge) ────────────────────────────────────────────────────────

function _renderChenilList(content) {
    const filtersEl = document.getElementById('chenil-filters')
    const navEl     = document.getElementById('chenil-header-nav')
    const header    = document.getElementById('chenil-menu-header')
    if (filtersEl) filtersEl.style.display = ''
    if (navEl)     navEl.style.display     = 'none'
    if (header)    header.querySelector('.forge-hero-anchor')?.remove()
    content.style.paddingTop = ''
    _updateChenilSortButtons()
    const inp = document.getElementById('chenil-search')
    if (inp) inp.value = chenilFilters.search

    let searchIds = null
    if (chenilFilters.search.length >= 1) {
        const results = _getChenilFuse().search(chenilFilters.search)
        searchIds = new Set(results.map(r => r.item.id))
    }

    const entries = []
    for (const fam of familiars) {
        if (searchIds && !searchIds.has(fam.id)) continue
        const level        = getFamiliarLevel(fam)
        const unlocked      = level > 0
        const doubledStats  = state.familiarUpgrades?.[fam.id]?.doubledStats || []
        const maxDoubleSlots = getFamiliarMaxDoubleSlots(fam)
        const passifId = state.familiarUpgrades?.[fam.id]?.passifId || null
        entries.push({ fam, level, unlocked, doubledCount: doubledStats.length, maxDoubleSlots, passifId })
    }

    const mul = chenilFilters.sortDir === 'asc' ? 1 : -1
    entries.sort((a, b) => {
        if (chenilFilters.sort === 'level') return (a.level - b.level) * mul
        return a.fam.name.localeCompare(b.fam.name, 'fr') * mul
    })

    if (entries.length === 0) {
        content.innerHTML = `<div class="forge-empty">Aucun familier trouvé.</div>`
        return
    }

    let html = `<div class="forge-bubble-list">`
    for (const { fam, level, unlocked, doubledCount, maxDoubleSlots, passifId } of entries) {
        const levelBadge = `<span class="bubble-level">Niv.${level}</span>`
        const upgradeBadge = doubledCount > 0
            ? `<span class="forge-bubble-badge">${doubledCount}/${maxDoubleSlots}✦</span>`
            : ''
        const killerBadge = passifId ? `<span class="forge-bubble-ready">★</span>` : ''
        const lockedCls  = unlocked ? '' : ' forge-bubble-locked'
        const clickAttr  = unlocked ? `onclick="selectChenilFamiliar('${fam.id}')"` : ''
        const passifName = passifId ? (item[passifId]?.name || passifId) : ''
        const title      = unlocked
            ? `${fam.name} — Niv. ${level}${doubledCount > 0 ? ` (${doubledCount}/${maxDoubleSlots} doublé)` : ''}${passifId ? ` — Passif actif : ${passifName}` : ''}`
            : `${fam.name} — non débloqué`
        const imgStyle = unlocked ? '' : 'filter:brightness(0);'
        html += `<div class="game-bubble${lockedCls}" title="${title}" ${clickAttr}>
            ${levelBadge}${upgradeBadge}${killerBadge}
            <img src="${fam.image || 'img/icons/icon.png'}" style="${imgStyle}" onerror="this.src='img/icons/icon.png'">
        </div>`
    }
    html += `</div>`
    content.innerHTML = html
}

// ─── Panel Chenil ────────────────────────────────────────────────────────────────

function _previewDoubledValue(fam, bonusDef, level, archiMult) {
    return Math.floor(getFamiliarStatValue(level, bonusDef.min * 2, bonusDef.max * 2, fam.rarity) * archiMult)
}

function _renderChenilPanel(content) {
    const filtersEl = document.getElementById('chenil-filters')
    const navEl     = document.getElementById('chenil-header-nav')
    const header    = document.getElementById('chenil-menu-header')
    if (filtersEl) filtersEl.style.display = 'none'
    if (navEl)     navEl.style.display     = ''

    const familiarId = _chenilSelectedFamiliar
    const fam = familiarById[familiarId]
    if (!fam) { _chenilSelectedFamiliar = null; updateChenilUI(); return }

    if (header) _attachChenilHeroBubble(header, fam)
    content.style.paddingTop = '7rem'

    const level     = getFamiliarLevel(fam)
    const archiMult = _getFamiliarArchiMult(fam)
    const computed  = getFamiliarBonusesComputed(familiarId)  // [{bonusType,bonusStat,value,isDoubled}], même ordre que fam.bonuses

    const doubledStats   = state.familiarUpgrades?.[familiarId]?.doubledStats || []
    const maxDoubleSlots = getFamiliarMaxDoubleSlots(fam)
    const usedDoubleSlots = doubledStats.length
    const canAddMore      = usedDoubleSlots < maxDoubleSlots
    const activePassifId  = state.familiarUpgrades?.[familiarId]?.passifId || null

    // Slots indicator
    const dotsHtml = Array.from({ length: maxDoubleSlots }, (_, i) =>
        `<span class="forge-slot-dot${i < usedDoubleSlots ? ' forge-slot-filled' : ''}"></span>`
    ).join('')
    const slotsHtml = `<div class="forge-slots-indicator">
        <span class="forge-slots-label">Slots doubleur :</span>
        ${dotsHtml}
        <span class="forge-slots-count">${usedDoubleSlots} / ${maxDoubleSlots}</span>
    </div>`

    // Stat rows
    const statsHtml = fam.bonuses.map((bDef, i) => {
        const c          = computed[i]
        const lbl        = CHENIL_STAT_LABELS[bDef.bonusStat] || bDef.bonusStat
        const sign       = '+'
        const active     = _chenilSelectedStatIdx === i
        const selectable = !c.isDoubled && canAddMore
        const bonusHtml  = c.isDoubled ? ` <span class="forge-bonus">[×2 ✦]</span>` : ''

        return `<div class="forge-stat-row${active ? ' forge-stat-active' : ''}${selectable ? '' : ' forge-stat-locked'}" ${selectable ? `onclick="selectChenilStat(${i})"` : ''}>
            <span class="forge-radio">${active ? '●' : '○'}</span>
            <span${c.isDoubled ? ' class="forge-stat-blue"' : ''}>${sign}${c.value} ${lbl}${bonusHtml}</span>
        </div>`
    }).join('')

    // Cristal Améliorant (équivalent rune normale, liée au slot sélectionné)
    const doubleEntry = state.inventory['cristalFamilierDouble']
    const doubleOwned = doubleEntry?.count ?? 0
    const doubleItm   = item['cristalFamilierDouble']

    let doublerHtml = ''
    if (_chenilSelectedStatIdx !== null) {
        const isActiveCristal = _chenilSelectedCristal === 'cristalFamilierDouble'
        const cardHtml = doubleOwned > 0
            ? `<div class="forge-rune-grid"><div class="forge-rune-card${isActiveCristal ? ' forge-rune-active' : ''}" onclick="selectChenilCristal('cristalFamilierDouble')" oncontextmenu="event.preventDefault();event.stopPropagation();showItemTooltip('cristalFamilierDouble')" title="${doubleItm?.description || ''}">
                <img src="${doubleItm?.image || 'img/icons/icon.png'}" onerror="this.src='img/icons/icon.png'" class="forge-rune-img">
                <div class="forge-rune-stat">×2 stat</div>
                <div class="forge-rune-meta">−25 kamas · ×${doubleOwned}</div>
              </div></div>`
            : `<div class="forge-no-runes">Aucun Cristal de Familier Améliorant dans l'inventaire.</div>`
        doublerHtml = `<div class="forge-section forge-rune-subsection">Cristal de Familier Améliorant :</div>${cardHtml}`
    }

    // Passifs (équivalent rune de Transcendance : un seul actif par familier, tous types confondus)
    const ownedPassifCristals = _getOwnedFamiliarUpgradeCristals('passif')

    let passifHtml
    if (activePassifId) {
        const activeCristal = item[activePassifId]
        passifHtml = `<div class="forge-stat-row forge-stat-locked forge-stat-blue">
            <span class="forge-radio">✦</span>
            <span>${activeCristal?.name || activePassifId} <span class="forge-bonus-trans">[Actif]</span></span>
        </div>`
    } else if (ownedPassifCristals.length > 0) {
        const cards = ownedPassifCristals.map(({ cristalId, cristal, count }) => {
            const isActiveCristal = _chenilSelectedCristal === cristalId
            return `<div class="forge-rune-card forge-rune-trans${isActiveCristal ? ' forge-rune-active' : ''}" onclick="selectChenilCristal('${cristalId}')" oncontextmenu="event.preventDefault();event.stopPropagation();showItemTooltip('${cristalId}')" title="${cristal.description || ''}">
                <img src="${cristal.image || 'img/icons/icon.png'}" onerror="this.src='img/icons/icon.png'" class="forge-rune-img">
                <div class="forge-rune-stat">${cristal.name} <span class="forge-trans-badge">Passif</span></div>
                <div class="forge-rune-meta">−250 kamas · ×${count}</div>
            </div>`
        }).join('')
        passifHtml = `<div class="forge-rune-grid">${cards}</div>`
    } else {
        passifHtml = `<div class="forge-no-runes">Aucun cristal passif dans l'inventaire.</div>`
    }

    // Preview
    const selectedCristalDef = _chenilSelectedCristal ? item[_chenilSelectedCristal] : null
    let previewHtml = ''
    if (selectedCristalDef?.familiarUpgradeKind === 'doubler' && _chenilSelectedStatIdx !== null) {
        const bDef = fam.bonuses[_chenilSelectedStatIdx]
        const curVal = computed[_chenilSelectedStatIdx].value
        const newVal = _previewDoubledValue(fam, bDef, level, archiMult)
        const lbl = CHENIL_STAT_LABELS[bDef.bonusStat] || bDef.bonusStat
        previewHtml = `<div class="forge-preview">
            <span class="forge-preview-label">Résultat :</span>
            <div class="forge-preview-opts">
                <span class="forge-preview-opt">${lbl} : +${curVal} → +${newVal}</span>
                <span class="forge-preview-opt forge-preview-warn">−25 kamas</span>
            </div>
        </div>`
    } else if (selectedCristalDef?.familiarUpgradeKind === 'passif') {
        previewHtml = `<div class="forge-preview">
            <span class="forge-preview-label">Résultat :</span>
            <div class="forge-preview-opts">
                <span class="forge-preview-opt">${selectedCristalDef.name} : ${selectedCristalDef.description || ''}</span>
                <span class="forge-preview-opt forge-preview-warn">−250 kamas</span>
            </div>
        </div>`
    }

    // Confirm button
    const canConfirm = selectedCristalDef?.familiarUpgradeKind === 'passif'
        || (selectedCristalDef?.familiarUpgradeKind === 'doubler' && _chenilSelectedStatIdx !== null)
    const hintText = _chenilSelectedCristal === null && _chenilSelectedStatIdx === null
        ? 'Sélectionnez une statistique ci-dessus, ou directement un cristal passif'
        : ''
    const actionHtml = `<div class="forge-action">
        ${hintText ? `<div class="forge-hint">${hintText}</div>` : ''}
        <button class="forge-btn${canConfirm ? '' : ' forge-btn-off'}" ${canConfirm ? `onclick="confirmChenilUpgrade('${familiarId}')"` : 'disabled'}>
            Améliorer
        </button>
        <span class="forge-warn">Le cristal est consommé · le coût en kamas est débité</span>
    </div>`

    content.innerHTML = `
        <div class="forge-panel">
            ${slotsHtml}
            <div class="forge-section">Choisir la statistique à doubler :</div>
            <div class="forge-stats">${statsHtml}</div>
            ${doublerHtml}
            <div class="forge-section forge-rune-subsection">Passif (bonus supplémentaire, un seul actif) :</div>
            ${passifHtml}
            ${previewHtml}
            ${actionHtml}
        </div>`
}

// ─── Handlers ──────────────────────────────────────────────────────────────────

function onChenilSearch(val) { chenilFilters.search = val.trim(); _chenilFuse = null; updateChenilUI() }

function toggleChenilSort(field) {
    if (chenilFilters.sort === field) {
        chenilFilters.sortDir = chenilFilters.sortDir === 'asc' ? 'desc' : 'asc'
    } else {
        chenilFilters.sort    = field
        chenilFilters.sortDir = field === 'level' ? 'desc' : 'asc'
    }
    _updateChenilSortButtons()
    updateChenilUI()
}

function selectChenilFamiliar(familiarId) {
    _chenilSelectedFamiliar = familiarId
    _chenilSelectedStatIdx  = null
    _chenilSelectedCristal  = null
    updateChenilUI()
}

function chenilBackAction() { selectChenilFamiliar(null) }

function selectChenilStat(idx) {
    _chenilSelectedStatIdx = _chenilSelectedStatIdx === idx ? null : idx
    _chenilSelectedCristal = null
    updateChenilUI()
}

function selectChenilCristal(cristalId) {
    _chenilSelectedCristal = _chenilSelectedCristal === cristalId ? null : cristalId
    if (item[_chenilSelectedCristal]?.familiarUpgradeKind === 'passif') _chenilSelectedStatIdx = null
    updateChenilUI()
}

function confirmChenilUpgrade(familiarId) {
    const cristalDef = _chenilSelectedCristal ? item[_chenilSelectedCristal] : null
    let result
    if (cristalDef?.familiarUpgradeKind === 'doubler') {
        if (_chenilSelectedStatIdx === null) return
        const fam = familiarById[familiarId]
        const bonusStat = fam?.bonuses?.[_chenilSelectedStatIdx]?.bonusStat
        if (!bonusStat) return
        result = applyFamiliarDoubler(familiarId, bonusStat)
    } else if (cristalDef?.familiarUpgradeKind === 'passif') {
        result = applyFamiliarPassif(familiarId, _chenilSelectedCristal)
    } else {
        return
    }

    if (!result || result.error) {
        const msgFn = result?.error ? CHENIL_ERROR_MSGS[result.error] : null
        showNotification(msgFn ? msgFn(result) : 'Amélioration impossible.', 'error')
        return
    }

    showNotification(
        cristalDef.familiarUpgradeKind === 'passif'
            ? `${cristalDef.name} appliqué !`
            : `Statistique doublée !`,
        'success'
    )

    _chenilSelectedStatIdx = null
    _chenilSelectedCristal = null
    updateChenilUI()
}
