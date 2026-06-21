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
    equipment:  itm => itm.type === 'equipment' && !itm.id?.startsWith('Dofus_') && !itm.trophy,
    dofus:      itm => itm.type === 'dofus' || (itm.type === 'equipment' && (itm.id?.startsWith('Dofus_') || !!itm.trophy)),
    consumable: itm => itm.type === 'consumable' || itm.type === 'rune',
    cosmetic:   itm => itm.type === 'cosmetic' || itm.type === 'cosmetic_skin',
    divers:     itm => itm.type !== 'equipment' && itm.type !== 'dofus' && itm.type !== 'consumable' && itm.type !== 'cosmetic' && itm.type !== 'rune' && itm.type !== 'cosmetic_skin' && !itm.hiddenInInventory
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
    const panoBtn = document.getElementById('sort-pano')
    if (panoBtn)  panoBtn.textContent  = `Panoplie`
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

    // Collecter + filtrer (possédés)
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
            if (sort === 'level') {
                const reqA = a.itm.requiredLevel ?? 0
                const reqB = b.itm.requiredLevel ?? 0
                if (reqA !== reqB) return (reqA - reqB) * mul
                return ((a.entry.level || 0) - (b.entry.level || 0)) * mul
            }
            if (sort === 'pano') {
                const aSet = (Array.isArray(a.itm.set) ? a.itm.set[0] : a.itm.set) || ''
                const bSet = (Array.isArray(b.itm.set) ? b.itm.set[0] : b.itm.set) || ''
                if (aSet !== bSet) {
                    if (!aSet) return 1
                    if (!bSet) return -1
                    return aSet.localeCompare(bSet, 'fr')
                }
                return (a.entry.level || 0) - (b.entry.level || 0)
            }
            return a.itm.name.localeCompare(b.itm.name, 'fr') * mul
        })
    }

    // Collecter les items non-possédés (même filtres, sans filtre niveau)
    let unownedEntries = []
    for (const [itemId, itm] of Object.entries(item)) {
        if (state.inventory[itemId]) continue
        if (itm.hiddenInInventory) continue
        if (!matchCat(itm)) continue
        if (inventoryFilter === 'equipment') {
            if (!_itemMatchesEquipFilters(itm, slotFilter, bonusFilter, searchIds)) continue
        }
        unownedEntries.push({ itemId, entry: null, itm })
    }

    // Rendre — possédés d'abord, non-possédés ensuite
    for (const { itemId, entry, itm } of [...entries, ...unownedEntries]) {
        const owned = !!entry
        const card  = document.createElement('div')
        card.dataset.help = itemId
        if (owned) {
            card.className = 'game-bubble'
            card.title     = itm.name
            const badge = itm.itemLevelMax
                ? `<span class="bubble-level">Niv.${entry.level}</span>`
                : entry.count > 1 ? `<span class="bubble-level">×${entry.count}</span>` : ''
            card.innerHTML = `${badge}<img src="${itm.image || 'img/icons/icon.png'}" onerror="this.src='img/icons/icon.png'">`
        } else {
            card.className = 'game-bubble bubble-unknown'
            card.title     = '???'
            card.innerHTML = `<img class="silhouette" src="${itm.image || 'img/icons/icon.png'}" onerror="this.src='img/icons/icon.png'">`
        }
        card.addEventListener('click',       () => showItemTooltip(itemId))
        card.addEventListener('contextmenu', e  => { e.preventDefault(); e.stopPropagation(); showItemTooltip(itemId) })
        list.appendChild(card)
    }

    if (entries.length === 0 && unownedEntries.length === 0) {
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

function showItemTooltip(itemId, fromClassId) {
    const itm   = item[itemId]
    if (!itm) return
    const entry = state.inventory[itemId]
    const lvl   = entry?.level || 0

    const STAT_LABELS = {
        maxHp: 'PV', atk: 'Puissance', spd: 'Initiative',
        flatDamage: 'Dégâts fixes', finalDamagePct: 'Dégâts finaux %',
        spellDamagePct: 'Dégâts sorts %', damageReductionPct: 'Réd. dégâts %',
        critChance: 'Chance crit %', critDamagePct: 'Dégâts crit %',
        heal: 'Soins', healPct: 'Soins %', healTeamPct: 'Soins équipe %', healMaxHpPct: 'Soins PV max %', lifestealPct: 'Vol de vie %',
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

    // Panoplie(s) — un item peut appartenir à plusieurs sets (set: string ou set: [str, str])
    let setHtml = ''
    const _setIds = itm.set ? (Array.isArray(itm.set) ? itm.set : [itm.set]) : []
    for (const _setId of _setIds) {
        const pano = panoplies[_setId]
        if (!pano) continue
        const owned   = new Set(Object.keys(state.inventory))
        const equippedByTeam = new Set(
            state.team.flatMap(m => {
                if (!m?.equip) return []
                return Object.entries(m.equip)
                    .filter(([slot]) => slot !== 'familier')
                    .map(([, id]) => id)
            }).filter(Boolean)
        )
        const famEquipped = pano.familiar && state.team.some(m => {
            if (!m?.equip || m.equip.familier !== pano.familiar) return false
            const memberEquip = new Set(Object.values(m.equip).filter(Boolean))
            return pano.pieces.some(p => memberEquip.has(p))
        })
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

        // Familier de zone associé
        if (pano.familiar) {
            const fam = typeof familiarById !== 'undefined' ? familiarById[pano.familiar] : null
            if (fam) {
                const equipDot = famEquipped ? '<span class="set-piece-dot"></span>' : ''
                piecesHtml += `<div class="set-piece-bubble"
                    title="${fam.name} (Familier)"
                    onclick="closeTooltip(); showFamiliarTooltip('${pano.familiar}')">
                    <img src="${fam.image}" onerror="this.src='img/icons/icon.png'">
                    ${equipDot}
                </div>`
            }
        }

        const equipBarHtml = fromClassId ? `
            <div class="pano-equip-bar">
                <button class="btn-pano-equip"
                        onclick="equipFullPanoplie('${_setId}', '${fromClassId}')">
                    ⚡ Équiper la panoplie
                </button>
            </div>` : ''

        setHtml += `<div class="item-set-section">
            <div class="item-set-title">
                ${pano.name}
                <span class="set-count-badge">${equippedCount}/${totalPieces} équipées</span>
            </div>
            <div class="item-set-bonuses">${bonusRows}</div>
            <div class="item-set-pieces">${piecesHtml}</div>
            ${equipBarHtml}
        </div>`
    }

    const slotLabel = (typeof MS_SLOT_LABELS !== 'undefined' && MS_SLOT_LABELS[itm.slot]) || itm.slot || ''
    const lvlBar = itm.itemLevelMax ? `<div class="item-sheet-level-row">
        <div class="item-level-bar"><div class="item-level-fill" style="width:${lvl && itm.itemLevelMax ? (lvl/itm.itemLevelMax)*100 : 0}%"></div></div>
        <span class="item-sheet-level">Niv. ${lvl} / ${itm.itemLevelMax}</span>
    </div>` : ''

    const rarityHtml  = itm.rarity ? `<span class="rarity-${itm.rarity}" style="font-size:0.72rem;">${itm.rarity.replace('_', ' ')}</span>` : ''
    const reqLvlHtml  = itm.requiredLevel ? `<div class="item-req-level" style="font-size:0.75rem;opacity:0.75;margin-top:0.2rem;">Niveau requis : ${itm.requiredLevel}</div>` : ''
    const descHtml    = itm.description ? `<p class="item-sheet-desc">${itm.description}</p>` : ''

    // Passifs de l'item (effects)
    const _passifLines = (itm.effects || []).filter(e => !e.every).map(e => {
        const chance   = e.on_effect?.chancePct != null ? `${e.on_effect.chancePct}% : ` : ''
        const src      = e.on_effect?.source === 'enemy' ? 'ennemi' : e.on_effect?.source === 'ally' ? 'allié' : null
        const critOnly = e.on_effect?.crit_only ? ' critique' : ''
        const types    = e.on_effect?.type ? (Array.isArray(e.on_effect.type) ? e.on_effect.type : [e.on_effect.type]) : []
        const TYPE_FR  = { damage: 'dégâts', dot: 'DoT', heal: 'soin', 'heal%maxHp': 'soin', buff: 'buff', debuff: 'débuff', avance: 'avance', recul: 'recul', switch: 'switch' }
        const typeStr  = types.map(t => TYPE_FR[t] || t).filter((v, i, a) => a.indexOf(v) === i).join('/')

        if (e.reaction === 'cancel')
            return `${chance}Annule les ${src ? src + ' ' : ''}${critOnly}${typeStr}`
        if (e.reaction === 'heal_to_damage') {
            const el  = e.element || 'neutre'
            const raw = e.rawDamage ? `${e.rawDamage.min}–${e.rawDamage.max}` : ''
            return `${chance}Convertit les soins${src ? ' ' + src + 's' : ''} en dégâts ${el}${raw ? ` (${raw})` : ''}`
        }
        if (e.reaction === 'crit_absorb_heal')
            return `${chance}Absorbe un coup${critOnly}${src ? ' ' + src : ''} et soigne ${e.heal_pct ?? 20}% des dégâts`
        if (e.reaction === 'invert') {
            const statLabel = e.on_effect?.stat ? (STAT_LABELS[e.on_effect.stat] || e.on_effect.stat) : typeStr
            return `${chance}Inverse les débuffs de ${statLabel}${src ? ' ' + src : ''} en buffs`
        }
        if (e.reaction === 'trigger') {
            if (e.type === 'shield')
                return `${chance}Au ${typeStr}${src ? ' ' + src : ''} : bouclier × ${e.duration} tours`
            const statLabel = STAT_LABELS[e.stat] || e.stat || ''
            const tgt = e.target === 'self' ? ' (soi)' : e.target ? ' ' + e.target : ''
            return `${chance}Au ${typeStr}${src ? ' ' + src : ''} : +${e.value} ${statLabel} × ${e.duration} tours${tgt}`
        }
        if (e.on_damage_received && e.reaction === 'cancel_next_damage')
            return `Tous les ${e.on_damage_received.every} dégâts reçus : annule le prochain coup`
        if (e.on_active && e.type === 'shield')
            return `En entrant en combat : bouclier × ${e.duration} tours`
        if (e.on_kill) {
            const ok        = e.on_kill
            const statLabel = STAT_LABELS[ok.stat] || ok.stat
            const max       = ok.max_value ? ` (max ${ok.max_value})` : ''
            const reset     = ok.swap_reset ? ', reset au changement' : ''
            const extra     = ok.on_inactive_at_max?.type === 'heal%maxHp'
                ? ` — au max : soin ${ok.on_inactive_at_max.heal}% PV max au changement` : ''
            return `+${ok.per_kill} ${statLabel} par kill${max}${reset}${extra}`
        }
        if (e.condition === 'no_direct_dmg' && e.type === 'stat_bonus') {
            const statLabel = STAT_LABELS[e.stat] || e.stat
            return `+${e.value} ${statLabel} si aucun dégât direct ce tour`
        }
        return null
    }).filter(Boolean)

    const _passifPeriodic = (itm.effects || []).filter(e => e.every).map(e => {
        const cond  = e.condition === 'no_buff_debuff' ? ' (si aucun buff/débuff actif)' : ''
        const after = e.after ? ` (après le ${e.after}e)` : ''
        if (e.type === 'heal%maxHp')
            return `Tous les ${e.every} sorts${after} : soin de ${e.heal}% des PV max`
        if (e.type === 'heal')
            return `Tous les ${e.every} sorts${after} : soin de ${e.heal} PV`
        if (e.type === 'buff') {
            const statLabel = STAT_LABELS[e.stat] || e.stat
            return `Tous les ${e.every} sorts${after} : +${e.value} ${statLabel} × ${e.duration} tours`
        }
        if (e.type === 'dot') {
            const val = typeof e.value === 'object' ? `${e.value.min}–${e.value.max}` : e.value
            return `Tous les ${e.every} sorts${after} : inflige ${val} dégâts ${e.element || 'neutre'} × ${e.duration} tours`
        }
        if (e.type === 'alternating_buff_debuff') {
            const statLabel = STAT_LABELS[e.stat] || e.stat
            return `Tous les ${e.every} sorts${after} : alterne +${e.buff_value} / −${e.debuff_value} ${statLabel} × ${e.duration} tours`
        }
        if (e.type === 'random_buff_debuff') {
            const statLabel = STAT_LABELS[e.stat] || e.stat
            return `Tous les ${e.every} sorts${after}${cond} : buff ou débuff aléatoire ${statLabel} (±${e.value}) × ${e.duration} tours`
        }
        return null
    }).filter(Boolean)

    const allPassifs = [..._passifPeriodic, ..._passifLines]
    const passifLines = itm.passif ? [itm.passif] : allPassifs
    const passifHtml = passifLines.length
        ? `<div class="item-passif-block" style="margin:0.4rem 0;padding:0.4rem 0.5rem;border-left:3px solid #7c5cfc;font-size:0.78rem;line-height:1.5;opacity:0.9;">
            <div style="font-size:0.68rem;text-transform:uppercase;letter-spacing:0.05em;opacity:0.6;margin-bottom:0.2rem;">Passif</div>
            ${passifLines.map(l => `<div>⚡ ${l}</div>`).join('')}
           </div>`
        : ''

    // Zones de drop (lootTable + miniBossLootTable)
    const dropZones = typeof areas !== 'undefined'
        ? Object.values(areas).filter(a =>
            a.lootTable?.some(l => l.itemId === itemId) ||
            a.miniBossLootTable?.some(l => l.itemId === itemId))
        : []
    const zonesHtml = dropZones.length > 0
        ? `<div class="item-drop-zones">
            <div class="item-drop-zones-title">Zones de drop</div>
            ${dropZones.map(a => `<span class="item-drop-zone-badge">${a.name}</span>`).join('')}
           </div>`
        : ''

    const body = `<div class="item-sheet">
        <div class="item-sheet-header">
            <img src="${itm.image || 'img/icons/icon.png'}" class="item-sheet-img" onerror="this.src='img/icons/icon.png'">
            <div class="item-sheet-meta">
                <div class="es-badges">
                    ${slotLabel ? `<span class="item-sheet-slot">${slotLabel}</span>` : ''}
                    ${rarityHtml}
                </div>
                ${lvlBar}
                ${reqLvlHtml}
            </div>
        </div>
        ${statsHtml ? `<div class="item-stats-block">${statsHtml}</div>` : ''}
        ${setHtml}
        ${passifHtml}
        ${zonesHtml}
        ${descHtml}
    </div>`

    openTooltip(itm.name, body)
}

function equipFullPanoplie(setId, classId) {
    const pano   = panoplies[setId]
    if (!pano) return
    const member = state.team.find(m => m && m.classId === classId)
    if (!member) return

    const RING_SLOTS = ['anneau', 'anneau2']
    let ringUsed = 0

    const _panoSyncedLvl = (typeof combat !== 'undefined' && combat?.syncedLevel) || null
    const _panoLvlCap    = _panoSyncedLvl ?? (member.level || 0)

    for (const pieceId of (pano.pieces || [])) {
        if (!state.inventory[pieceId]) continue   // seulement les items possédés
        const itm = item[pieceId]
        if (!itm) continue
        if (itm.requiredLevel && itm.requiredLevel > _panoLvlCap) continue
        let slot = itm.slot
        if (slot === 'anneau') {
            slot = RING_SLOTS[ringUsed] || 'anneau2'
            ringUsed = Math.min(ringUsed + 1, 1)
        }
        if (!member.equip) member.equip = {}
        member.equip[slot] = pieceId
    }

    if (pano.familiar) {
        const famObj = typeof familiarById !== 'undefined' ? familiarById[pano.familiar] : null
        if (famObj && getFamiliarLevel(famObj) > 0) {
            if (!member.equip) member.equip = {}
            member.equip.familier = pano.familiar
        }
    }

    const stats = getEffectiveStats(member)
    if (stats) member.maxHp = stats.hp

    saveGame()
    updateTeamUI()

    // Même pattern que equipItemFromSheet : vide la pile et réouvre la fiche
    tooltipStack.length = 0
    showMemberSheet(member)
}

function formatStatName(stat) {
    return { maxHp: 'PV', atk: 'Puissance', spd: 'Initiative', flatDamage: 'Dégâts fixes' }[stat] || stat
}
