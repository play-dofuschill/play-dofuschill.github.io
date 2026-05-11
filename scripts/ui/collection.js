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

    const res = mob.bst.res
    const resLine = Object.entries(res)
        .filter(([, v]) => v !== 0)
        .map(([k, v]) => `${formatElement(k)}: ${v}%`)
        .join(', ') || 'Aucune'

    const body = `
        <div class="tooltip-monster">
            <img src="${mob.image}" onerror="this.src='img/icons/icon.png'">
            <div>
                <p><strong>${entry ? mob.name : '???'}</strong></p>
                <p>${_renderElementBadges(mob.element)}</p>
                <p>Rareté : ${formatRarity(mob.rarity)}</p>
                <p>PV: ${mob.bst.hp} | ATK: ${mob.bst.atk} | SPD: ${mob.bst.spd}</p>
                <p>Résistances : ${resLine}</p>
                ${mob.dropRate != null ? `<p>Taux de capture : ${(mob.dropRate * 100).toFixed(0)}%</p>` : ''}
                <hr>
                ${mob.familiar
                    ? `<p>Familier : ${formatBonusType(mob.familiar.bonusType)} — ${formatBonusStat(mob.familiar.bonusStat)} (${mob.familiar.min}–${mob.familiar.max})</p>`
                    : '<p><em>Pas de bonus familier</em></p>'}
                ${entry ? `<p><strong>Niveau familier : ${entry.level}</strong></p>` : '<p><em>Non capturé</em></p>'}
            </div>
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
