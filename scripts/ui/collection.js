// ui/collection.js — Encyclopédie des monstres / familiers DofusChill

// ─── État des filtres ─────────────────────────────────────────────────────────

const collectionFilters = {
    search: ''
}

let _collectionFuse = null

function _getCollectionFuse() {
    if (!_collectionFuse) {
        const entries = Object.values(monsters).map(m => ({ id: m.id, name: m.name }))
        _collectionFuse = new Fuse(entries, { keys: ['name'], threshold: 0.4 })
    }
    return _collectionFuse
}

// ─── Filtres ──────────────────────────────────────────────────────────────────

function onCollectionSearch(val) {
    collectionFilters.search = val.trim()
    updateCollectionUI()
}

function resetCollectionFilters() {
    collectionFilters.search = ''
    const srch    = document.getElementById('encyclopédie-search')
    const lvl     = document.getElementById('encyclopédie-filter-level')
    const rarity  = document.getElementById('encyclopédie-filter-rarity')
    const tier    = document.getElementById('encyclopédie-filter-tier')
    const bon     = document.getElementById('encyclopédie-filter-bonustype')
    if (srch)   srch.value   = ''
    if (lvl)    lvl.value    = 'all'
    if (rarity) rarity.value = 'all'
    if (tier)   tier.value   = 'all'
    if (bon)    bon.value    = 'all'
    updateCollectionUI()
}

// ─── Affichage principal ──────────────────────────────────────────────────────

function updateCollectionUI() {
    const list = document.getElementById('collection-list')
    if (!list) return

    const levelFilter     = document.getElementById('encyclopédie-filter-level')?.value     || 'all'
    const rarityFilter    = document.getElementById('encyclopédie-filter-rarity')?.value    || 'all'
    const tierFilter      = document.getElementById('encyclopédie-filter-tier')?.value      || 'all'
    const bonusTypeFilter = document.getElementById('encyclopédie-filter-bonustype')?.value || 'all'

    let searchIds = null
    if (collectionFilters.search.length >= 1) {
        const results = _getCollectionFuse().search(collectionFilters.search)
        searchIds = new Set(results.map(r => r.item.id))
    }

    list.innerHTML = ''
    const total = Object.keys(monsters).length

    for (const monsterId in monsters) {
        const mob = monsters[monsterId]

        // Niveau de zone
        if (levelFilter !== 'all') {
            const lvl    = _getMonsterLevel(monsterId)
            const ranges = { '10': [1, 10], '20': [11, 20], '30': [21, 30], '50': [31, 50] }
            const range  = ranges[levelFilter]
            if (range && (lvl < range[0] || lvl > range[1])) continue
        }

        // Rareté
        if (rarityFilter !== 'all' && mob.rarity !== rarityFilter) continue

        // Tier
        if (tierFilter !== 'all' && mob.tier !== tierFilter) continue

        // Type de bonus familier
        if (bonusTypeFilter !== 'all' && mob.familiar?.bonusType !== bonusTypeFilter) continue

        // Recherche Fuse
        if (searchIds && !searchIds.has(monsterId)) continue

        const entry = state.collection[monsterId]
        const card  = document.createElement('div')
        card.className = `game-bubble ${entry ? '' : 'bubble-unknown'}`
        card.title     = entry ? mob.name : '???'

        if (entry) {
            card.innerHTML = `
                <span class="bubble-level">Niv.${entry.level}</span>
                <img src="${mob.image}" onerror="this.src='img/icons/icon.png'">`
        } else {
            card.innerHTML = `
                <img class="silhouette" src="${mob.image}" onerror="this.src='img/icons/icon.png'">`
        }

        card.addEventListener('click',       () => showMonsterTooltip(monsterId))
        card.addEventListener('contextmenu', e  => { e.preventDefault(); showMonsterTooltip(monsterId) })
        list.appendChild(card)
    }

    const caught  = Object.keys(state.collection).length
    const totalEl = document.getElementById('encyclopédie-total')
    if (totalEl) totalEl.textContent = `${caught} / ${total}`
}

function _renderElementBadges(element) {
    const elems = Array.isArray(element) ? element : [element]
    return elems.map(e => `<div class="collection-element elem-${e}">${formatElement(e)}</div>`).join('')
}

function _getMonsterLevel(monsterId) {
    for (const areaId in areas) {
        if (areas[areaId].spawns?.some(s => s.id === monsterId)) return areas[areaId].minLevel || 0
    }
    return 0
}

// ─── Tooltip monstre ──────────────────────────────────────────────────────────

function showMonsterTooltip(monsterId) {
    const mob   = monsters[monsterId]
    const entry = state.collection[monsterId]
    if (!mob) return

    const famLvl     = entry?.level || 0
    const rarityHtml = mob.rarity ? `<span class="rarity-${mob.rarity}" style="font-size:0.72rem;">${mob.rarity.replace('_', ' ')}</span>` : ''
    const elemHtml   = mob.element ? `<span class="elem-badge elem-${mob.element}" style="font-size:0.72rem;">${mob.element}</span>` : ''

    const STAT_L = { atk: 'ATK', hp: 'PV', spd: 'Vitesse', dropRate: 'Taux de drop', xpGain: 'Gain XP',
        flatDamage: 'Dég. fixes', finalDamagePct: 'Dég. finaux', damageReductionPct: 'Réd. dégâts', critChance: 'Crit',
        'res.eau': 'Rés. Eau', 'res.feu': 'Rés. Feu', 'res.air': 'Rés. Air', 'res.terre': 'Rés. Terre', 'res.neutre': 'Rés. Neutre' }

    let familiarSection = ''
    const fam = mob.familiar
    if (fam?.bonusStat) {
        const statLbl    = STAT_L[fam.bonusStat] || fam.bonusStat
        const typeLabel  = formatBonusType(fam.bonusType)
        const isPercent  = fam.bonusStat === 'dropRate' || fam.bonusStat === 'xpGain' || fam.bonusStat?.endsWith('Pct') || fam.bonusStat?.startsWith('res.')
        const unit       = isPercent ? '%' : ''
        const curVal     = famLvl > 0 ? Math.floor(getFamiliarStatValue(famLvl, fam.min, fam.max)) : null

        familiarSection = `
            <div class="ms-section-title" style="margin-top:0.5rem;">Familier</div>
            <div class="ms-stats">
                <div class="ms-stat-row">
                    <span class="ms-stat-label" style="flex:1">${typeLabel}</span>
                </div>
                <div class="ms-stat-row">
                    <span class="ms-stat-label">Bonus actuel</span>
                    <span class="ms-stat-val">${curVal != null ? `+${curVal}${unit} ${statLbl}` : 'Non capturé'}</span>
                </div>
                <div class="ms-stat-row">
                    <span class="ms-stat-label">Plage</span>
                    <span class="ms-stat-val">+${fam.min}–${fam.max}${unit} ${statLbl}</span>
                </div>
            </div>`
    } else {
        familiarSection = `<div class="ms-section-title" style="margin-top:0.5rem;opacity:0.4;">Pas de bonus familier</div>`
    }

    const body = `<div class="member-sheet es-sheet">
        <div class="es-header">
            <img class="es-sprite" src="${mob.image}" onerror="this.src='img/icons/icon.png'">
            <div class="es-header-info">
                <span class="es-name">${entry ? mob.name : '???'}</span>
                <div class="es-badges">
                    <span class="level-badge">Niv. ${famLvl}/200</span>
                    ${rarityHtml}
                    ${elemHtml}
                </div>
            </div>
        </div>
        ${familiarSection}
    </div>`

    openTooltip(entry ? mob.name : '???', body)
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getMonsterZone(monsterId) {
    for (const areaId in areas) {
        if (areas[areaId].spawns?.some(s => s.id === monsterId)) return areas[areaId].name
    }
    return 'Inconnue'
}

function formatRarity(r) {
    return { commun: 'Commun', peu_commun: 'Peu Commun', rare: 'Rare', tres_rare: 'Très Rare' }[r] || r
}

function formatElement(e) {
    return { neutre: '⚪ Neutre', feu: '🔥 Feu', eau: '💧 Eau', air: '💨 Air', terre: '🌿 Terre' }[e] || e
}

function formatBonusStat(stat) {
    const map = {
        dropRate:     'Taux de drop',
        xpGain:       'Gain XP',
        atk:          'ATK',
        hp:           'PV',
        'res.eau':    'Rés. Eau',
        'res.feu':    'Rés. Feu',
        'res.air':    'Rés. Air',
        'res.terre':  'Rés. Terre',
        'res.neutre': 'Rés. Neutre'
    }
    return map[stat] || stat
}

function formatBonusType(t) {
    return { farming: '🌾 Farm', combat: '⚔ Combat', defense: '🛡 Défense' }[t] || t
}

function updateFamiliarUI() {}
