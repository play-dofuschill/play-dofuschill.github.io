// ui/inventory.js — Inventaire et équipements DofusChill

let inventoryFilter = 'equipment'

const equipFilters = { slot: 'all', bonus: 'all', level: 'all', sort: 'level', sortDir: 'desc', search: '' }
let _equipFuse = null

function _getEquipFuse() {
    if (!_equipFuse) {
        const entries = Object.values(item)
            .filter(itm => itm.type === 'equipment')
            .map(itm => ({ id: itm.id, name: itm.name }))
        _equipFuse = new Fuse(entries, { keys: ['name'], threshold: 0.4 })
    }
    return _equipFuse
}

// Mapping catégorie → filtre de type
const BAG_CATEGORIES = {
    equipment:  itm => itm.type === 'equipment',
    dofus:      itm => itm.type === 'dofus',
    consumable: itm => itm.type === 'consumable',
    cosmetic:   itm => itm.type === 'cosmetic',
    divers:     itm => itm.type !== 'equipment' && itm.type !== 'dofus' && itm.type !== 'consumable' && itm.type !== 'cosmetic' && !itm.hiddenInInventory
}

// ─── Filtres équipement ───────────────────────────────────────────────────────

function onEquipSearch(val) {
    equipFilters.search = val.trim()
    _equipFuse = null
    updateInventoryUI()
}

function toggleEquipSort(field) {
    if (equipFilters.sort === field) {
        equipFilters.sortDir = equipFilters.sortDir === 'asc' ? 'desc' : 'asc'
    } else {
        equipFilters.sort    = field
        equipFilters.sortDir = field === 'level' ? 'desc' : 'asc'
    }
    _updateSortButtons()
    updateInventoryUI()
}

function _updateSortButtons() {
    const arrow = equipFilters.sortDir === 'asc' ? '↑' : '↓'
    const levelBtn = document.getElementById('sort-level')
    const nameBtn  = document.getElementById('sort-name')
    if (levelBtn) levelBtn.textContent = `Niv. ${equipFilters.sort === 'level' ? arrow : '↕'}`
    if (nameBtn)  nameBtn.textContent  = `Nom ${equipFilters.sort === 'name'  ? arrow : '↕'}`
    document.querySelectorAll('.sort-btn').forEach(b => b.classList.toggle('active', b.id === `sort-${equipFilters.sort}`))
}

function resetEquipFilters() {
    equipFilters.slot    = 'all'
    equipFilters.bonus   = 'all'
    equipFilters.level   = 'all'
    equipFilters.sort    = 'level'
    equipFilters.sortDir = 'desc'
    equipFilters.search  = ''
    const sl = document.getElementById('equip-filter-slot')
    const bn = document.getElementById('equip-filter-bonus')
    const lv = document.getElementById('equip-filter-level')
    const sr = document.getElementById('equip-search')
    if (sl) sl.value = 'all'
    if (bn) bn.value = 'all'
    if (lv) lv.value = 'all'
    if (sr) sr.value = ''
    _updateSortButtons()
    updateInventoryUI()
}

function _itemMatchesEquipFilters(itm, slotFilter, bonusFilter, searchIds) {
    if (slotFilter !== 'all' && itm.slot !== slotFilter) return false
    if (bonusFilter !== 'all') {
        if (!itm.stats?.some(s => s.stat === bonusFilter)) return false
    }
    if (searchIds && !searchIds.has(itm.id)) return false
    return true
}

// ─── Affichage principal ──────────────────────────────────────────────────────

function updateInventoryUI() {
    const list = document.getElementById('item-menu-list')
    if (!list) return
    list.innerHTML = ''

    const matchCat = BAG_CATEGORIES[inventoryFilter] || (() => true)
    const label    = { equipment: 'équipement', dofus: 'Dofus ou trophée', consumable: 'consommable', cosmetic: 'cosmétique', divers: 'objet divers' }

    let slotFilter  = 'all'
    let bonusFilter = 'all'
    let levelFilter = 'all'
    let searchIds   = null

    if (inventoryFilter === 'equipment') {
        slotFilter  = document.getElementById('equip-filter-slot')?.value  || 'all'
        bonusFilter = document.getElementById('equip-filter-bonus')?.value || 'all'
        levelFilter = document.getElementById('equip-filter-level')?.value || 'all'
        if (equipFilters.search.length >= 1) {
            const results = _getEquipFuse().search(equipFilters.search)
            searchIds = new Set(results.map(r => r.item.id))
        }
    }

    // Collecter + filtrer
    const levelRanges = { '5': [1, 5], '10': [6, 10], '15': [11, 15], '20': [16, 20] }
    let entries = []
    for (const [itemId, entry] of Object.entries(state.inventory)) {
        const itm = item[itemId]
        if (!itm || !matchCat(itm)) continue
        if (inventoryFilter === 'equipment') {
            if (!_itemMatchesEquipFilters(itm, slotFilter, bonusFilter, searchIds)) continue
            if (levelFilter !== 'all') {
                const range = levelRanges[levelFilter]
                const lvl   = entry.level || 0
                if (range && (lvl < range[0] || lvl > range[1])) continue
            }
        }
        entries.push({ itemId, entry, itm })
    }

    // Trier (équipement uniquement)
    if (inventoryFilter === 'equipment') {
        const { sort, sortDir } = equipFilters
        const mul = sortDir === 'asc' ? 1 : -1
        entries.sort((a, b) => {
            if (sort === 'level') return ((a.entry.level || 0) - (b.entry.level || 0)) * mul
            return a.itm.name.localeCompare(b.itm.name, 'fr') * mul
        })
    }

    // Rendre
    for (const { itemId, entry, itm } of entries) {
        const card = document.createElement('div')
        card.className    = 'game-bubble'
        card.dataset.help = itemId
        card.title        = itm.name
        const badge = itm.levelMax
            ? `<span class="bubble-level">Niv.${entry.level}</span>`
            : entry.count > 1 ? `<span class="bubble-level">×${entry.count}</span>` : ''
        card.innerHTML = `${badge}<img src="${itm.image || 'img/icons/icon.png'}" onerror="this.src='img/icons/icon.png'">`
        card.addEventListener('click',       () => showItemTooltip(itemId))
        card.addEventListener('contextmenu', e  => { e.preventDefault(); showItemTooltip(itemId) })
        list.appendChild(card)
    }

    if (entries.length === 0) {
        list.innerHTML = `<div class="inventory-empty">Aucun ${label[inventoryFilter] || 'objet'}.<br>Partez en exploration !</div>`
    }
}

function setInventoryFilter(filter) {
    inventoryFilter = filter
    document.querySelectorAll('.bag-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.cat === filter)
    })
    // Affiche/masque le panneau de filtres équipement
    const equipPanel = document.getElementById('equip-filters')
    if (equipPanel) equipPanel.style.display = filter === 'equipment' ? 'flex' : 'none'
    updateInventoryUI()
}

// ─── Fiche item détaillée ─────────────────────────────────────────────────────

function showItemTooltip(itemId) {
    const itm   = item[itemId]
    if (!itm) return
    const entry = state.inventory[itemId]
    const lvl   = entry?.level || 0

    const STAT_LABELS = {
        maxHp: 'PV', atk: 'Puissance', spd: 'Initiative',
        flatDamage: 'Dégâts fixes', finalDamagePct: 'Dégâts finaux %',
        spellDamagePct: 'Dégâts sorts %', damageReductionPct: 'Réd. dégâts %',
        critChance: 'Chance crit %', critDamagePct: 'Dégâts crit %',
        healPct: 'Soins %', healTeamPct: 'Soins équipe %', healMaxHpPct: 'Soins PV max %', lifestealPct: 'Vol de vie %',
        'res.feu': 'Rés. Feu', 'res.eau': 'Rés. Eau',
        'res.terre': 'Rés. Terre', 'res.air': 'Rés. Air', 'res.neutre': 'Rés. Neutre',
    }
    const STAT_ICON_MAP = {
        maxHp: STAT_ICONS.hp, atk: STAT_ICONS.atk, spd: STAT_ICONS.spd,
        flatDamage: STAT_ICONS.flatDamage, finalDamagePct: STAT_ICONS.atk,
        spellDamagePct: STAT_ICONS.atk, damageReductionPct: STAT_ICONS.buff,
        critChance: STAT_ICONS.atk, critDamagePct: STAT_ICONS.atk,
        healPct: STAT_ICONS.soin, healTeamPct: STAT_ICONS.soin, healMaxHpPct: STAT_ICONS.soin, lifestealPct: STAT_ICONS.volVie,
        'res.feu': ELEM_ICONS.feu, 'res.eau': ELEM_ICONS.eau,
        'res.terre': ELEM_ICONS.terre, 'res.air': ELEM_ICONS.air,
        'res.neutre': ELEM_ICONS.neutre,
    }

    // Stats calculées au niveau actuel
    let statsHtml = ''
    if (itm.stats && itm.stats.length > 0) {
        const computed = getItemStats(itm, Math.max(1, lvl), entry?.forgedStats || null, entry?.transForge || null)
        for (const { stat, value, isForged, isTranscendance } of computed) {
            const label = STAT_LABELS[stat] || stat
            const icon  = STAT_ICON_MAP[stat] || ''
            const color = isTranscendance ? '#a855f7' : isForged ? '#4a9bdb' : (value > 0 ? '#2D7A2D' : value < 0 ? '#d45a43' : '')
            statsHtml += `<div class="item-stat-row">
                ${icon ? `<img src="${icon}" class="item-stat-icon">` : ''}
                <span style="${color ? `color:${color}` : ''}">${value > 0 ? '+' : ''}${value} ${label}${isForged ? ' ✦' : ''}</span>
            </div>`
        }
    }

    // Panoplie
    let setHtml = ''
    if (itm.set && panoplies[itm.set]) {
        const pano    = panoplies[itm.set]
        const owned   = new Set(Object.keys(state.inventory))
        const equippedByTeam = new Set(
            state.team.flatMap(m => m ? Object.values(m.equip) : []).filter(Boolean)
        )
        const famEquipped = pano.familiar && equippedByTeam.has(pano.familiar)
        let equippedCount = pano.pieces.filter(p => equippedByTeam.has(p)).length
        if (famEquipped) equippedCount++
        const totalPieces = pano.pieces.length + (pano.familiar ? 1 : 0)

        // Seuils de bonus
        const thresholds = Object.keys(pano.bonuses).map(Number).sort((a, b) => a - b)
        let bonusRows = ''
        for (const t of thresholds) {
            const b = pano.bonuses[t]
            const parts = (b.stats || []).map(({ stat, value }) => {
                const icon  = STAT_ICON_MAP[stat] || ''
                const label = STAT_LABELS[stat] || stat
                return `${icon ? `<img src="${icon}" class="item-stat-icon">` : ''}+${value} ${label}`
            })
            const active = equippedCount >= t ? ' set-bonus-active' : ''
            bonusRows += `<div class="set-threshold-row${active}">
                <span class="set-threshold-count">${t} pièces :</span>
                <span class="set-threshold-stats">${parts.join(' ')}</span>
            </div>`
        }

        // Pièces en bulles
        let piecesHtml = ''
        for (const pieceId of pano.pieces) {
            const p = item[pieceId]
            if (!p) continue
            const isOwned   = owned.has(pieceId)
            const isCurrent = pieceId === itemId
            const isEquip   = equippedByTeam.has(pieceId)
            const bubbleCls = isCurrent ? ' set-piece-current' : (!isOwned ? ' set-piece-missing' : '')
            const equipDot  = isEquip ? '<span class="set-piece-dot"></span>' : ''
            piecesHtml += `<div class="set-piece-bubble${bubbleCls}" title="${p.name}"
                ${isCurrent ? '' : `onclick="closeTooltip(); showItemTooltip('${pieceId}')"`}>
                <img src="${p.image}" onerror="this.src='img/icons/icon.png'">
                ${equipDot}
            </div>`
        }

        // Familier associé
        if (pano.familiar) {
            const mob = typeof monsters !== 'undefined' ? monsters[pano.familiar] : null
            if (mob) {
                const famInCollection = !!state.collection?.[pano.familiar]
                const equipDot = famEquipped ? '<span class="set-piece-dot"></span>' : ''
                const missingCls = !famInCollection ? ' set-piece-missing' : ''
                piecesHtml += `<div class="set-piece-bubble${missingCls}"
                    title="${mob.name} (Familier)"
                    onclick="closeTooltip(); showMobSheet('${pano.familiar}')">
                    <img src="${mob.image}" onerror="this.src='img/icons/icon.png'">
                    ${equipDot}
                </div>`
            }
        }

        setHtml = `<div class="item-set-section">
            <div class="item-set-title">
                ${pano.name}
                <span class="set-count-badge">${equippedCount}/${totalPieces} équipées</span>
            </div>
            <div class="item-set-bonuses">${bonusRows}</div>
            <div class="item-set-pieces">${piecesHtml}</div>
        </div>`
    }

    const slotLabel = (typeof MS_SLOT_LABELS !== 'undefined' && MS_SLOT_LABELS[itm.slot]) || itm.slot || ''
    const lvlBar = itm.levelMax ? `<div class="item-sheet-level-row">
        <div class="item-level-bar"><div class="item-level-fill" style="width:${lvl && itm.levelMax ? (lvl/itm.levelMax)*100 : 0}%"></div></div>
        <span class="item-sheet-level">Niv. ${lvl} / ${itm.levelMax}</span>
    </div>` : ''

    const body = `<div class="item-sheet">
        <div class="item-sheet-header">
            <img src="${itm.image || 'img/icons/icon.png'}" class="item-sheet-img" onerror="this.src='img/icons/icon.png'">
            <div class="item-sheet-meta">
                ${slotLabel ? `<span class="item-sheet-slot">${slotLabel}</span>` : ''}
                ${itm.description ? `<p class="item-sheet-desc">${itm.description}</p>` : ''}
                ${lvlBar}
            </div>
        </div>
        ${statsHtml ? `<div class="item-stats-block">${statsHtml}</div>` : ''}
        ${setHtml}
    </div>`

    openTooltip(itm.name, body)
}

function formatStatName(stat) {
    return { maxHp: 'PV', atk: 'Puissance', spd: 'Initiative', flatDamage: 'Dégâts fixes' }[stat] || stat
}
