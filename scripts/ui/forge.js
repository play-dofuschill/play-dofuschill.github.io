// ui/forge.js — Interface de forgemagie DofusChill

let _forgeTab             = 'forge'  // 'forge' | 'fusion'
let _forgeSelectedItem    = null
let _forgeSelectedStatIdx = null
let _forgeSelectedRune    = null     // runeItemId sélectionnée

let _concassageActive    = false
let _concassageAction    = null      // 'swap' | 'remove'
let _concassageSourceIdx = null

const FORGE_STAT_LABELS = {
    maxHp: 'PV', atk: 'Puissance', spd: 'Initiative',
    flatDamage: 'Dégâts fixes', finalDamagePct: 'Dégâts finaux %',
    spellDamagePct: 'Dégâts sorts %', damageReductionPct: 'Réd. dégâts %',
    critChance: 'Chance crit %', critDamagePct: 'Dégâts crit %',
    healPct: 'Soins %', healTeamPct: 'Soins équipe %', healMaxHpPct: 'Soins PV max %', lifestealPct: 'Vol de vie %',
    'res.feu': 'Rés. Feu', 'res.eau': 'Rés. Eau',
    'res.terre': 'Rés. Terre', 'res.air': 'Rés. Air', 'res.neutre': 'Rés. Neutre'
}

const FORGE_ERROR_MSGS = {
    INSUFFICIENT_LEVEL: (r) => `Niveau de l'item trop bas (${r.itemLevel}) — cette rune coûte −${r.levelCost} niv., il en faut strictement plus.`,
    RUNE_TIER_MISMATCH: (r) => `Rune trop puissante pour cet item (zone niv.${r.runeMinLevel}+, item requis niv.${r.itemReqLevel}).`,
    STAT_MISMATCH:      ()  => `La stat de la rune ne correspond pas à ce slot. Utilisez une Rune de Transcendance.`,
    SLOTS_FULL:         ()  => `Plus de slots de forge disponibles sur cet item.`,
    RUNE_UNAVAILABLE:   ()  => `Rune introuvable dans l'inventaire.`,
}

const forgeFilters = {
    search:    '',
    sort:      'level',
    sortDir:   'desc',
    forgeable: 'all',
    slots:     'all'
}

let _forgeFuse = null

function _getForgeFuse() {
    if (!_forgeFuse) {
        const entries = Object.values(item)
            .filter(itm => itm.type === 'equipment')
            .map(itm => ({ id: itm.id, name: itm.name }))
        _forgeFuse = new Fuse(entries, { keys: ['name'], threshold: 0.4 })
    }
    return _forgeFuse
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function _isItemForgeable(itm, entry) {
    if (!itm || itm.type !== 'equipment' || !itm.stats?.length) return false
    const minLevel = itm.levelMax || 20
    return !!(entry && entry.level >= minLevel)
}

function _getForgedStatsArr(entry) {
    if (entry.forgedStats) return entry.forgedStats
    if (entry.forgedStat)  return [entry.forgedStat]
    return []
}

function _getPlayerRunes() {
    return Object.entries(state.inventory)
        .filter(([id]) => item[id]?.type === 'rune')
        .map(([id, entry]) => ({ runeId: id, rune: item[id], count: entry.count ?? 1 }))
        .filter(({ count }) => count > 0)
}

function _attachHeroBubble(header, itemId, itm) {
    header.querySelector('.forge-hero-anchor')?.remove()
    const anchor = document.createElement('div')
    anchor.className = 'forge-hero-anchor'
    anchor.innerHTML = `<div class="game-bubble forge-hero-bubble" oncontextmenu="event.preventDefault();showItemTooltip('${itemId}')"><img src="${itm.image || 'img/icons/icon.png'}" onerror="this.src='img/icons/icon.png'"></div>`
    header.appendChild(anchor)
}

// ─── Entry point ───────────────────────────────────────────────────────────────

function updateForgeUI() {
    const content = document.getElementById('forge-content')
    if (!content) return

    // Sync tab buttons
    document.getElementById('forge-tab-forge')?.classList.toggle('forge-tab-active', _forgeTab === 'forge')
    document.getElementById('forge-tab-fusion')?.classList.toggle('forge-tab-active', _forgeTab === 'fusion')

    if (_forgeTab === 'fusion') {
        _renderFusionTab(content)
        return
    }

    if (!_forgeSelectedItem) {
        _renderForgeList(content)
    } else if (_concassageActive) {
        _renderConcassagePanel(content)
    } else {
        _renderForgePanel(content)
    }
}

function _updateForgeSortButtons() {
    const arrow    = forgeFilters.sortDir === 'asc' ? '↑' : '↓'
    const levelBtn = document.getElementById('forge-sort-level')
    const nameBtn  = document.getElementById('forge-sort-name')
    if (levelBtn) levelBtn.textContent = `Niv. ${forgeFilters.sort === 'level' ? arrow : '↕'}`
    if (nameBtn)  nameBtn.textContent  = `Nom ${forgeFilters.sort === 'name'  ? arrow : '↕'}`
    document.querySelectorAll('#forge-filters .sort-btn').forEach(b =>
        b.classList.toggle('active',
            (b.id === 'forge-sort-level' && forgeFilters.sort === 'level') ||
            (b.id === 'forge-sort-name'  && forgeFilters.sort === 'name')))
}

// ─── Liste (style inventaire) ──────────────────────────────────────────────────

function _renderForgeList(content) {
    const filtersEl = document.getElementById('forge-filters')
    const navEl     = document.getElementById('forge-header-nav')
    const header    = document.getElementById('forge-menu-header')
    if (filtersEl) filtersEl.style.display = ''
    if (navEl)     navEl.style.display     = 'none'
    if (header)    header.querySelector('.forge-hero-anchor')?.remove()
    content.style.paddingTop = ''
    _updateForgeSortButtons()
    const inp = document.getElementById('forge-search')
    if (inp) inp.value = forgeFilters.search

    let searchIds = null
    if (forgeFilters.search.length >= 1) {
        const results = _getForgeFuse().search(forgeFilters.search)
        searchIds = new Set(results.map(r => r.item.id))
    }

    const filterForgeable = document.getElementById('forge-filter-forgeable')?.value || 'all'
    const filterSlots     = document.getElementById('forge-filter-slots')?.value     || 'all'

    const entries = []
    for (const [itemId, entry] of Object.entries(state.inventory)) {
        const itm = item[itemId]
        if (!itm || itm.type !== 'equipment') continue
        if (searchIds && !searchIds.has(itemId)) continue

        const forgeable   = _isItemForgeable(itm, entry)
        const forgedStats = _getForgedStatsArr(entry)
        const forgedCount = forgedStats.length
        const maxSlots    = getMaxForgeSlots(itm.stats?.length || 0)

        if (filterForgeable !== 'all') {
            if (filterForgeable === 'forgeable' && !forgeable) continue
            if (filterForgeable === 'forged'    && forgedCount === 0) continue
            if (filterForgeable === 'unforged'  && forgedCount > 0) continue
        }

        if (filterSlots !== 'all' && forgedCount !== Number(filterSlots)) continue

        entries.push({ itemId, entry, itm, forgeable, forgedCount, maxSlots })
    }

    const mul = forgeFilters.sortDir === 'asc' ? 1 : -1
    entries.sort((a, b) => {
        if (forgeFilters.sort === 'level') return ((a.entry.level || 0) - (b.entry.level || 0)) * mul
        return a.itm.name.localeCompare(b.itm.name, 'fr') * mul
    })

    if (entries.length === 0) {
        content.innerHTML = `<div class="forge-empty">Aucun équipement trouvé.<br>Ajustez les filtres ou farmez des items !</div>`
        return
    }

    let html = `<div class="forge-bubble-list">`
    for (const { itemId, entry, itm, forgeable, forgedCount, maxSlots } of entries) {
        const levelBadge = itm.levelMax ? `<span class="bubble-level">Niv.${entry.level}</span>` : ''
        const forgeBadge = forgedCount > 0
            ? `<span class="forge-bubble-badge">${forgedCount}/${maxSlots}✦</span>`
            : (forgeable ? `<span class="forge-bubble-ready">⚒</span>` : '')
        const lockedCls  = forgeable ? '' : ' forge-bubble-locked'
        const clickAttr  = forgeable ? `onclick="selectForgeItem('${itemId}')"` : ''
        const title      = `${itm.name} — Niv. ${entry.level}${forgedCount > 0 ? ` (${forgedCount}/${maxSlots} forgé)` : ''}`
        html += `<div class="game-bubble${lockedCls}" title="${title}" ${clickAttr} oncontextmenu="event.preventDefault();showItemTooltip('${itemId}')">
            ${levelBadge}${forgeBadge}
            <img src="${itm.image || 'img/icons/icon.png'}" onerror="this.src='img/icons/icon.png'">
        </div>`
    }
    html += `</div>`
    content.innerHTML = html
}

// ─── Panel Forge ───────────────────────────────────────────────────────────────

function _renderForgePanel(content) {
    const filtersEl = document.getElementById('forge-filters')
    const navEl     = document.getElementById('forge-header-nav')
    const concBtn   = document.getElementById('forge-concassage-btn')
    const header    = document.getElementById('forge-menu-header')
    if (filtersEl) filtersEl.style.display = 'none'
    if (navEl)     navEl.style.display     = ''
    if (concBtn)   concBtn.style.display   = ''

    const itemId = _forgeSelectedItem
    const itm    = item[itemId]
    const entry  = state.inventory[itemId]
    if (!itm || !entry) { _forgeSelectedItem = null; updateForgeUI(); return }

    if (header) _attachHeroBubble(header, itemId, itm)
    content.style.paddingTop = '7rem'

    const forgedStats = _getForgedStatsArr(entry)
    const forgedCount = forgedStats.length
    const maxSlots    = getMaxForgeSlots(itm.stats?.length || 0)
    const canAddMore  = forgedCount < maxSlots
    const computed    = getItemStats(itm, entry.level, forgedStats)

    // Slots indicator
    const dotsHtml = Array.from({ length: maxSlots }, (_, i) =>
        `<span class="forge-slot-dot${i < forgedCount ? ' forge-slot-filled' : ''}"></span>`
    ).join('')
    const slotsHtml = `<div class="forge-slots-indicator">
        <span class="forge-slots-label">Slots forgés :</span>
        ${dotsHtml}
        <span class="forge-slots-count">${forgedCount} / ${maxSlots}</span>
    </div>`

    // Stat rows
    const statsHtml = computed.map(({ stat, value, isForged, forgeBonus, isTranscendance }, i) => {
        const lbl        = FORGE_STAT_LABELS[stat] || stat
        const sign       = value > 0 ? '+' : ''
        const active     = _forgeSelectedStatIdx === i
        const selectable = isForged || canAddMore

        let bonusHtml = ''
        if (isForged) {
            bonusHtml = isTranscendance
                ? ` <span class="forge-bonus-trans">[✦ Trans]</span>`
                : ` <span class="forge-bonus">[+${forgeBonus} ✦]</span>`
        }

        return `<div class="forge-stat-row${active ? ' forge-stat-active' : ''}${selectable ? '' : ' forge-stat-locked'}" ${selectable ? `onclick="selectForgeStat(${i})"` : ''}>
            <span class="forge-radio">${active ? '●' : '○'}</span>
            <span${isForged ? ' class="forge-stat-blue"' : ''}>${sign}${value} ${lbl}${bonusHtml}</span>
        </div>`
    }).join('')

    // Rune selection — normales filtrées par slot, transcendances toujours visibles
    const itemReqLevel     = itm.requiredLevel ?? 1
    const selectedStatType = _forgeSelectedStatIdx !== null ? itm.stats[_forgeSelectedStatIdx]?.stat : null

    const tierCompatible = _getPlayerRunes().filter(({ rune }) =>
        itemReqLevel >= (rune.minRequiredLevel ?? 0) && entry.level > (rune.levelCost ?? 5)
    )
    const transRunes  = tierCompatible.filter(({ rune }) => rune.transcendance)
    const normalRunes = selectedStatType
        ? tierCompatible.filter(({ rune }) => !rune.transcendance && rune.stat === selectedStatType)
        : []

    const makeRuneCard = ({ runeId, rune, count }) => {
        const lbl    = FORGE_STAT_LABELS[rune.stat] || rune.stat
        const active = _forgeSelectedRune === runeId
        const badge  = rune.transcendance ? ' <span class="forge-trans-badge">Trans</span>' : ''
        return `<div class="forge-rune-card${active ? ' forge-rune-active' : ''}${rune.transcendance ? ' forge-rune-trans' : ''}" onclick="selectForgeRune('${runeId}')" title="${rune.description || ''}">
            <img src="${rune.image || 'img/icons/icon.png'}" onerror="this.src='img/icons/icon.png'" class="forge-rune-img">
            <div class="forge-rune-stat">+${rune.value} ${lbl}${badge}</div>
            <div class="forge-rune-meta">−${rune.levelCost ?? 5} niv. · ×${count}</div>
        </div>`
    }

    const allPlayerRunes = _getPlayerRunes()
    let runeHtml = ''

    // Section runes normales — uniquement quand un slot est sélectionné
    if (selectedStatType) {
        const allNormalStat = allPlayerRunes.filter(({ rune }) => !rune.transcendance && rune.stat === selectedStatType)
        const normalHtml = normalRunes.length > 0
            ? `<div class="forge-rune-grid">${normalRunes.map(makeRuneCard).join('')}</div>`
            : allNormalStat.length > 0
                ? `<div class="forge-no-runes">Vos runes ${FORGE_STAT_LABELS[selectedStatType] || selectedStatType} sont de tier trop élevé pour cet item.</div>`
                : `<div class="forge-no-runes">Aucune rune ${FORGE_STAT_LABELS[selectedStatType] || selectedStatType} dans l'inventaire.</div>`
        runeHtml += `<div class="forge-section forge-rune-subsection">Runes normales :</div>${normalHtml}`
    }

    // Section runes de transcendance — toujours visibles
    const allTransPlayer = allPlayerRunes.filter(({ rune }) => rune.transcendance)
    const transHtml = transRunes.length > 0
        ? `<div class="forge-rune-grid">${transRunes.map(makeRuneCard).join('')}</div>`
        : allTransPlayer.length > 0
            ? `<div class="forge-no-runes">Vos runes de Transcendance sont de tier trop élevé pour cet item.</div>`
            : `<div class="forge-no-runes">Aucune rune de Transcendance dans l'inventaire.</div>`
    runeHtml += `<div class="forge-section forge-rune-subsection">Runes de Transcendance :</div>${transHtml}`

    // Preview
    let previewHtml = ''
    if (_forgeSelectedRune && _forgeSelectedStatIdx !== null) {
        const rune = item[_forgeSelectedRune]
        if (rune) {
            const lbl      = FORGE_STAT_LABELS[rune.stat] || rune.stat
            const newLevel = Math.max(1, entry.level - (rune.levelCost ?? 5))
            const slotBase = computed[_forgeSelectedStatIdx]
            const resultDesc = rune.transcendance
                ? `+${rune.value} ${lbl} (remplace le slot)`
                : `+${slotBase.value - (slotBase.forgeBonus || 0)} ${lbl} (base) + ${rune.value} (rune) = +${slotBase.value - (slotBase.forgeBonus || 0) + rune.value} ${lbl}`
            previewHtml = `<div class="forge-preview">
                <span class="forge-preview-label">Résultat :</span>
                <div class="forge-preview-opts">
                    <span class="forge-preview-opt">${resultDesc}</span>
                    <span class="forge-preview-opt forge-preview-warn">Niv. ${entry.level} → ${newLevel}</span>
                </div>
            </div>`
        }
    }

    // Forge button
    const selectedIsForged = _forgeSelectedStatIdx !== null && computed[_forgeSelectedStatIdx]?.isForged
    const canForge = _forgeSelectedStatIdx !== null && _forgeSelectedRune !== null &&
                     (selectedIsForged || canAddMore)
    const hintText = !selectedStatType
        ? 'Sélectionnez un slot ci-dessus pour voir les runes normales compatibles'
        : ''
    const actionHtml = `<div class="forge-action">
        ${hintText ? `<div class="forge-hint">${hintText}</div>` : ''}
        <button class="forge-btn${canForge ? '' : ' forge-btn-off'}" ${canForge ? `onclick="confirmForge('${itemId}')"` : 'disabled'}>
            Forgemager
        </button>
        <span class="forge-warn">La rune est consommée · L'item perd des niveaux</span>
    </div>`

    content.innerHTML = `
        <div class="forge-panel">
            ${slotsHtml}
            <div class="forge-section">Choisir le slot à forger :</div>
            <div class="forge-stats">${statsHtml}</div>
            <div class="forge-section">Choisir une rune :</div>
            ${runeHtml}
            ${previewHtml}
            ${actionHtml}
        </div>`
}

// ─── Onglet Fusion ─────────────────────────────────────────────────────────────

function _renderFusionTab(content) {
    const filtersEl = document.getElementById('forge-filters')
    const navEl     = document.getElementById('forge-header-nav')
    const header    = document.getElementById('forge-menu-header')
    if (filtersEl) filtersEl.style.display = 'none'
    if (navEl)     navEl.style.display     = 'none'
    if (header)    header.querySelector('.forge-hero-anchor')?.remove()
    content.style.paddingTop = ''

    // Construire les recettes : toutes les runes normales avec fusionCost
    const recipes = Object.values(item)
        .filter(rune => rune.type === 'rune' && !rune.transcendance && rune.fusionCost)
        .map(rune => {
            const transRuneId = 'runeTrans' + rune.id.slice(4)
            const transRune   = item[transRuneId]
            if (!transRune) return null
            const owned    = state.inventory[rune.id]?.count ?? 0
            const canFuse  = owned >= rune.fusionCost
            return { rune, transRune, transRuneId, owned, canFuse }
        })
        .filter(Boolean)

    if (recipes.length === 0) {
        content.innerHTML = `<div class="forge-empty">Aucune recette de fusion disponible.</div>`
        return
    }

    const rows = recipes.map(({ rune, transRune, owned, canFuse }) => {
        const lbl = FORGE_STAT_LABELS[rune.stat] || rune.stat
        return `<div class="fusion-recipe${canFuse ? '' : ' fusion-recipe-disabled'}">
            <div class="fusion-input">
                <img src="${rune.image || 'img/icons/icon.png'}" onerror="this.src='img/icons/icon.png'" class="forge-rune-img">
                <div class="fusion-details">
                    <span class="fusion-name">${rune.name}</span>
                    <span class="fusion-stock${canFuse ? ' fusion-stock-ok' : ''}">${owned} / ${rune.fusionCost} requis</span>
                </div>
            </div>
            <div class="fusion-arrow">→</div>
            <div class="fusion-output">
                <img src="${transRune.image || 'img/icons/icon.png'}" onerror="this.src='img/icons/icon.png'" class="forge-rune-img">
                <span class="fusion-trans-name">${transRune.name}</span>
            </div>
            <button class="forge-btn fusion-btn${canFuse ? '' : ' forge-btn-off'}"
                ${canFuse ? `onclick="confirmFusion('${rune.id}')"` : 'disabled'}>
                Fusionner
            </button>
        </div>`
    }).join('')

    content.innerHTML = `
        <div class="fusion-panel">
            <div class="forge-section">Fusion de runes → Runes de Transcendance</div>
            <div class="fusion-info">Les runes de Transcendance s'appliquent sur n'importe quel slot, même si la stat n'est pas sur l'item.</div>
            <div class="fusion-list">${rows}</div>
        </div>`
}

// ─── Panel Concassage ──────────────────────────────────────────────────────────

function _renderConcassagePanel(content) {
    const filtersEl = document.getElementById('forge-filters')
    const navEl     = document.getElementById('forge-header-nav')
    const concBtn   = document.getElementById('forge-concassage-btn')
    const header    = document.getElementById('forge-menu-header')
    if (filtersEl) filtersEl.style.display = 'none'
    if (navEl)     navEl.style.display     = ''
    if (concBtn)   concBtn.style.display   = 'none'

    const itemId = _forgeSelectedItem
    const itm    = item[itemId]
    const entry  = state.inventory[itemId]
    if (!itm || !entry) { _concassageActive = false; updateForgeUI(); return }

    if (header) _attachHeroBubble(header, itemId, itm)
    content.style.paddingTop = '7rem'

    const forgedStats   = _getForgedStatsArr(entry)
    const statCount     = itm.stats?.length || 2
    const swapCost      = 5 * (statCount - 1)
    const hasForged     = forgedStats.length > 0
    const canAffordSwap = state.kamas >= swapCost
    const canAffordRm   = state.kamas >= 1
    const computed      = getItemStats(itm, entry.level, forgedStats)

    const swapDisabled = !hasForged || !canAffordSwap
    const rmDisabled   = !hasForged || !canAffordRm
    const actionsHtml = `<div class="conc-actions">
        <button class="conc-action-btn${_concassageAction === 'swap'   ? ' conc-action-active' : ''}${swapDisabled ? ' forge-btn-off' : ''}"
            ${swapDisabled ? 'disabled' : `onclick="selectConcassageAction('swap')"`}>
            Déplacer <span class="conc-cost">${swapCost}k</span>
        </button>
        <button class="conc-action-btn${_concassageAction === 'remove' ? ' conc-action-active' : ''}${rmDisabled ? ' forge-btn-off' : ''}"
            ${rmDisabled ? 'disabled' : `onclick="selectConcassageAction('remove')"`}>
            Retirer <span class="conc-cost">1k</span>
        </button>
    </div>`

    let selectionHtml = ''
    if (_concassageAction) {
        const isSwap       = _concassageAction === 'swap'
        const sourceChosen = _concassageSourceIdx !== null
        const stepLabel    = isSwap
            ? (sourceChosen ? 'Choisir la destination :' : 'Choisir la forgemagie à déplacer :')
            : 'Choisir la forgemagie à retirer :'

        const rows = computed.map(({ stat, value, isForged, isTranscendance, forgeBonus }, i) => {
            const lbl  = FORGE_STAT_LABELS[stat] || stat
            const sign = value > 0 ? '+' : ''
            const isSelectedSource = i === _concassageSourceIdx

            let clickable = false
            let onclick   = ''
            if (isSwap) {
                if (!sourceChosen) { clickable = isForged; if (clickable) onclick = `onclick="selectConcassageSource(${i})"` }
                else               { clickable = !isSelectedSource; if (clickable) onclick = `onclick="confirmConcassageSwap('${itemId}', ${i})"` }
            } else {
                clickable = isForged; if (clickable) onclick = `onclick="selectConcassageSource(${i})"`
            }

            const cls = ['forge-stat-row', isSelectedSource ? 'forge-stat-active' : '', (!clickable && !isSelectedSource) ? 'forge-stat-locked' : ''].filter(Boolean).join(' ')
            const bonusHtml = isForged
                ? (isTranscendance ? ` <span class="forge-bonus-trans">[✦ Trans]</span>` : ` <span class="forge-bonus">[+${forgeBonus} ✦]</span>`)
                : ''

            return `<div class="${cls}" ${onclick}>
                <span class="forge-radio">${isSelectedSource ? '●' : '○'}</span>
                <span${isForged ? ' class="forge-stat-blue"' : ''}>${sign}${value} ${lbl}${bonusHtml}</span>
            </div>`
        }).join('')

        const confirmHtml = (!isSwap && sourceChosen)
            ? `<div class="forge-action"><button class="forge-btn" onclick="confirmConcassageRemove('${itemId}', ${_concassageSourceIdx})">Confirmer le retrait</button></div>`
            : ''

        selectionHtml = `<div class="forge-section">${stepLabel}</div><div class="forge-stats">${rows}</div>${confirmHtml}`
    }

    content.innerHTML = `
        <div class="forge-panel">
            <div class="forge-section">Concassage</div>
            ${actionsHtml}
            ${selectionHtml}
        </div>`
}

// ─── Handlers ──────────────────────────────────────────────────────────────────

function switchForgeTab(tab) {
    _forgeTab             = tab
    _forgeSelectedItem    = null
    _forgeSelectedStatIdx = null
    _forgeSelectedRune    = null
    _concassageActive     = false
    updateForgeUI()
}

function forgeBackAction() {
    if (_concassageActive) {
        _concassageActive    = false
        _concassageAction    = null
        _concassageSourceIdx = null
        updateForgeUI()
    } else {
        selectForgeItem(null)
    }
}

function onForgeSearch(val) { forgeFilters.search = val.trim(); _forgeFuse = null; updateForgeUI() }

function toggleForgeSort(field) {
    if (forgeFilters.sort === field) {
        forgeFilters.sortDir = forgeFilters.sortDir === 'asc' ? 'desc' : 'asc'
    } else {
        forgeFilters.sort    = field
        forgeFilters.sortDir = field === 'level' ? 'desc' : 'asc'
    }
    _updateForgeSortButtons()
    updateForgeUI()
}

function setForgeFilter(key, value) { forgeFilters[key] = value; updateForgeUI() }

function selectForgeItem(itemId) {
    _forgeSelectedItem    = itemId
    _forgeSelectedStatIdx = null
    _forgeSelectedRune    = null
    _concassageActive     = false
    _concassageAction     = null
    _concassageSourceIdx  = null
    updateForgeUI()
}

function selectForgeStat(idx) {
    if (_forgeSelectedStatIdx === idx) {
        _forgeSelectedStatIdx = null
    } else {
        _forgeSelectedStatIdx = idx
        _forgeSelectedRune    = null  // reset rune quand on change de slot
    }
    updateForgeUI()
}

function selectForgeRune(runeId) {
    _forgeSelectedRune = _forgeSelectedRune === runeId ? null : runeId
    updateForgeUI()
}

function confirmForge(itemId) {
    if (_forgeSelectedStatIdx === null || !_forgeSelectedRune) return
    const result = applyForge(itemId, _forgeSelectedStatIdx, _forgeSelectedRune)

    if (!result || result.error) {
        const msgFn = result?.error ? FORGE_ERROR_MSGS[result.error] : null
        const msg   = msgFn ? msgFn(result) : 'Forge impossible.'
        showNotification(msg, 'error')
        return
    }

    const lbl = FORGE_STAT_LABELS[result.stat] || result.stat
    const suffix = result.isTranscendance ? ' [Trans]' : ''
    showNotification(`Forgé${suffix} ! +${result.value} ${lbl} — item au niveau ${result.newLevel}`, 'success')

    _forgeSelectedStatIdx = null
    _forgeSelectedRune    = null
    updateForgeUI()
}

function confirmFusion(regularRuneId) {
    const result = applyFusion(regularRuneId)
    if (!result) { showNotification('Fusion impossible.', 'error'); return }
    const lbl = FORGE_STAT_LABELS[result.transRune.stat] || result.transRune.stat
    showNotification(`Fusion réussie ! +${result.transRune.value} ${lbl} [Trans] obtenu.`, 'success')
    updateForgeUI()
}

function enterConcassage() { _concassageActive = true; _concassageAction = null; _concassageSourceIdx = null; updateForgeUI() }

function selectConcassageAction(action) { _concassageAction = _concassageAction === action ? null : action; _concassageSourceIdx = null; updateForgeUI() }

function selectConcassageSource(idx) { _concassageSourceIdx = _concassageSourceIdx === idx ? null : idx; updateForgeUI() }

function confirmConcassageSwap(itemId, targetIdx) {
    if (_concassageSourceIdx === null) return
    const result = applyConcassageSwap(itemId, _concassageSourceIdx, targetIdx)
    if (!result) { showNotification('Impossible (kamas insuffisants ?)', 'error'); return }
    showNotification(`Forgemagie déplacée ! (${result.cost} kamas)`, 'success')
    _concassageSourceIdx = null
    updateForgeUI()
}

function confirmConcassageRemove(itemId, statIdx) {
    const result = applyConcassageRemove(itemId, statIdx)
    if (!result) { showNotification('Impossible (kamas insuffisants ?)', 'error'); return }
    showNotification('Forgemagie retirée. (1 kama)', 'success')
    _concassageSourceIdx = null
    updateForgeUI()
}
