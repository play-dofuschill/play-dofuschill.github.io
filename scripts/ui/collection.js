// ui/collection.js — Encyclopédie DofusChill (Monstres / Familiers / Équipements)

// ─── Page active ──────────────────────────────────────────────────────────────

let _encyclopediaPage = 'monstres'

function switchEncyclopediaPage(page) {
    _encyclopediaPage = page

    const monsterFilters  = document.getElementById('encyclopédie-monster-filters')
    const familiarFiltersEl = document.getElementById('encyclopédie-familiar-filters')
    const searchInput     = document.getElementById('encyclopédie-search')
    const mobList         = document.getElementById('collection-list')
    const famList         = document.getElementById('familiar-list')

    const isMonsters  = page === 'monstres'
    const isFamiliars = page === 'familiers'

    if (monsterFilters)    monsterFilters.style.display    = isMonsters  ? '' : 'none'
    if (familiarFiltersEl) familiarFiltersEl.style.display = isFamiliars ? '' : 'none'

    if (mobList) mobList.style.display = isMonsters  ? '' : 'none'
    if (famList) famList.style.display = isFamiliars ? '' : 'none'

    if (searchInput) {
        searchInput.value       = ''
        searchInput.placeholder = isFamiliars ? 'Rechercher un familier…' : 'Rechercher…'
    }
    collectionFilters.search = ''
    familiarFilters.search   = ''

    document.querySelectorAll('.enc-tab').forEach(btn => {
        const label = { monstres: 'Monstres', familiers: 'Familiers' }[page]
        btn.classList.toggle('enc-tab-active', btn.textContent.trim() === label)
    })

    if (isMonsters)  updateCollectionUI()
    if (isFamiliars) updateFamiliarListUI()
}

// ─── PAGE 1 : MONSTRES ───────────────────────────────────────────────────────

const collectionFilters = { search: '' }
let _collectionFuse = null

function _getCollectionFuse() {
    if (!_collectionFuse) {
        const entries = Object.values(monsters).map(m => ({ id: m.id, name: m.name }))
        _collectionFuse = new Fuse(entries, { keys: ['name'], threshold: 0.4 })
    }
    return _collectionFuse
}

function onCollectionSearch(val) {
    collectionFilters.search = val.trim()
    updateCollectionUI()
}

// Routeur de recherche partagé (barre unique pour les deux pages)
function onEncyclopediaSearch(val) {
    if (_encyclopediaPage === 'monstres') {
        collectionFilters.search = val.trim()
        updateCollectionUI()
    } else {
        familiarFilters.search = val.trim()
        updateFamiliarListUI()
    }
}

function resetCollectionFilters() {
    collectionFilters.search = ''
    const srch   = document.getElementById('encyclopédie-search')
    const lvl    = document.getElementById('encyclopédie-filter-level')
    const rarity = document.getElementById('encyclopédie-filter-rarity')
    const tier   = document.getElementById('encyclopédie-filter-tier')
    const archi  = document.getElementById('encyclopédie-filter-archi')
    if (srch)   srch.value   = ''
    if (lvl)    lvl.value    = 'all'
    if (rarity) rarity.value = 'all'
    if (tier)   tier.value   = 'all'
    if (archi)  archi.value  = 'all'
    updateCollectionUI()
}

function updateCollectionUI() {
    const list = document.getElementById('collection-list')
    if (!list) return

    const levelFilter  = document.getElementById('encyclopédie-filter-level')?.value  || 'all'
    const rarityFilter = document.getElementById('encyclopédie-filter-rarity')?.value || 'all'
    const tierFilter   = document.getElementById('encyclopédie-filter-tier')?.value   || 'all'
    const archiFilter  = document.getElementById('encyclopédie-filter-archi')?.value  || 'all'

    let searchIds = null
    if (collectionFilters.search.length >= 1) {
        const results = _getCollectionFuse().search(collectionFilters.search)
        searchIds = new Set(results.map(r => r.item.id))
    }

    list.innerHTML = ''
    const total = Object.keys(monsters).length

    const allIds = Object.keys(monsters)
    const seenIds   = allIds.filter(id => !!state.seenMonsters?.[id])
    const unseenIds = allIds.filter(id => !state.seenMonsters?.[id])
    const sortedIds = [...seenIds, ...unseenIds]

    for (const monsterId of sortedIds) {
        const mob = monsters[monsterId]

        if (levelFilter !== 'all') {
            const lvl   = _getMonsterLevel(monsterId)
            const ranges = { '10': [1, 10], '20': [11, 20], '30': [21, 30], '50': [31, 50] }
            const range  = ranges[levelFilter]
            if (range && (lvl < range[0] || lvl > range[1])) continue
        }

        if (rarityFilter !== 'all' && mob.rarity !== rarityFilter) continue
        if (tierFilter   !== 'all' && mob.tier   !== tierFilter)   continue

        if (archiFilter === 'archi' && !state.collection[monsterId]?.isArchi) continue

        if (searchIds && !searchIds.has(monsterId)) continue

        const entry = state.collection[monsterId]
        const seen  = !!state.seenMonsters?.[monsterId]
        const card  = document.createElement('div')
        card.className = `game-bubble ${seen ? '' : 'bubble-unknown'}`
        card.title     = seen ? mob.name : '???'

        if (seen) {
            const lvlLabel = entry
                ? (entry.isArchi
                    ? `<span class="bubble-level bubble-level-archi">★ Niv.${entry.level} ★</span>`
                    : `<span class="bubble-level">Niv.${entry.level}</span>`)
                : ''
            card.innerHTML = `${lvlLabel}<img src="${mob.image}" onerror="this.src='img/icons/icon.png'">`
        } else {
            card.innerHTML = `<img class="silhouette" src="${mob.image}" onerror="this.src='img/icons/icon.png'">`
        }

        card.addEventListener('click',       () => showMonsterTooltip(monsterId))
        card.addEventListener('contextmenu', e  => { e.preventDefault(); showMonsterTooltip(monsterId) })
        list.appendChild(card)
    }

    const caught  = Object.keys(state.collection).length
    const totalEl = document.getElementById('encyclopédie-total')
    if (totalEl) totalEl.textContent = `${caught} / ${total}`
}

// ─── Tooltip monstre ──────────────────────────────────────────────────────────

function showMonsterTooltip(monsterId) {
    const mob   = monsters[monsterId]
    const entry = state.collection[monsterId]
    const seen  = !!state.seenMonsters?.[monsterId]
    if (!mob) return

    const rarityHtml = seen && mob.rarity ? `<span class="rarity-${mob.rarity}" style="font-size:0.72rem;">${mob.rarity.replace('_', ' ')}</span>` : ''
    const elemHtml   = seen && mob.element ? `<span class="elem-badge elem-${mob.element}" style="font-size:0.72rem;">${mob.element}</span>` : ''

    const famLvlBadge = entry
        ? `<span class="level-badge">Niv. ${entry.level}/200</span>`
        : seen ? `<span class="level-badge" style="opacity:0.5;">Non capturé</span>` : ''
    const archiBadgeHtml = entry?.isArchi
        ? `<span class="bubble-archi-badge" style="position:relative;top:0;right:0;font-size:0.7rem;padding:0.1rem 0.4rem;border-radius:0.3rem;">★ ARCHI</span>`
        : ''

    const imgStyle = seen ? '' : 'filter:brightness(0);'

    let statsHtml = ''
    let movesHtml = ''

    if (seen) {
        const mobArea  = Object.values(areas).find(a => a.spawns?.some(s => s.id === monsterId))
        const maxScale = (mobArea && mob.fixedLevel == null)
            ? 1 + (mobArea.mobMaxLevel - mobArea.mobMinLevel) * 0.05
            : 1
        const hasScale = maxScale > 1

        const baseAtk = mob.bst.atk
        const maxAtk  = Math.floor(baseAtk * maxScale)

        function bstRow(iconSrc, label, baseVal, maxVal = null) {
            const valHtml = (maxVal !== null && hasScale)
                ? `${baseVal} <span class="mob-stat-scaled">(→ ${maxVal})</span>`
                : `${baseVal}`
            return `<div class="ms-stat-row">
                <img src="${iconSrc}" class="ms-stat-icon" onerror="this.src='img/icons/icon.png'">
                <span class="ms-stat-label">${label}</span>
                <span class="ms-stat-val">${valHtml}</span>
            </div>`
        }

        const elems   = ['neutre', 'terre', 'feu', 'eau', 'air']
        const resRows = elems.map(el => {
            const val   = mob.bst.res?.[el] ?? 0
            const color = val > 0 ? '#2D7A2D' : val < 0 ? '#d45a43' : ''
            return `<div class="ms-stat-row">
                <img src="${ELEM_ICONS[el] || ELEM_ICONS.neutre}" class="ms-stat-icon">
                <span class="ms-stat-label">${el.charAt(0).toUpperCase() + el.slice(1)}</span>
                <span class="ms-stat-val"${color ? ` style="color:${color}"` : ''}>${val}%</span>
            </div>`
        }).join('')

        statsHtml = `
        <div class="ms-section-title" style="margin-top:0.3rem;">Stats de base</div>
        <div class="ms-stats">
            ${bstRow(STAT_ICONS.hp,  'PV',         mob.bst.hp,  Math.floor(mob.bst.hp  * maxScale))}
            ${bstRow(STAT_ICONS.atk, 'Puissance',  baseAtk,     maxAtk)}
            ${bstRow(STAT_ICONS.spd, 'Initiative', mob.bst.spd)}
        </div>
        <div class="ms-section-title">Résistances</div>
        <div class="ms-stats">${resRows}</div>`

        if (mob.moves?.length > 0) {
            const TYPE_LABELS = { damage: 'Attaque', damage_zone: 'Zone', dot: 'DOT', heal: 'Soin', heal_team: 'Soin (éq.)', buff: 'Buff', buff_team: 'Buff (éq.)', debuff: 'Débuff', shield: 'Bouclier', lifesteal: 'Vol de vie', summon: 'Invocation' }

            const moveRows = mob.moves.map(moveId => {
                const mv = move[moveId]
                if (!mv) return ''
                const eff0    = mv.effects?.[0]
                const elem    = eff0?.element || 'neutre'
                const mvType  = eff0?.type    || ''
                const barElem = mvType === 'buff' ? 'buff' : mvType === 'debuff' ? 'debuff' : elem
                const typeLabel = TYPE_LABELS[mvType] || mvType || '—'
                const cdSec   = mv.cooldownMs ? (mv.cooldownMs / 1000).toFixed(1) + 's' : ''

                let detail = ''
                if (eff0?.damage) {
                    const lo = Math.round(eff0.damage.min * (1 + baseAtk / 100))
                    const hi = Math.round(eff0.damage.max * (1 + baseAtk / 100))
                    if (hasScale) {
                        const loM = Math.round(eff0.damage.min * (1 + maxAtk / 100))
                        const hiM = Math.round(eff0.damage.max * (1 + maxAtk / 100))
                        detail = `${lo}–${hi} <span class="mob-stat-scaled">(→ ${loM}–${hiM})</span>`
                    } else {
                        detail = `${lo}–${hi}`
                    }
                }

                return `<div class="es-move-row elem-bar-${barElem}" data-move-id="${moveId}">
                    ${elemIcon(moveIconKey(mv), 'es-move-elem-icon')}
                    <span class="es-move-name">${mv.name}</span>
                    <span class="es-move-type">${typeLabel}</span>
                    <span class="es-move-detail">${detail}</span>
                    ${cdSec ? `<span class="es-move-cd">${cdSec}</span>` : ''}
                </div>`
            }).filter(Boolean).join('')

            movesHtml = `
            <div class="ms-section-title">Sorts</div>
            <div class="es-moves mob-moves">${moveRows || '<span style="opacity:0.4;font-size:0.8rem">Aucun sort</span>'}</div>`
        }
    }

    const body = `<div class="member-sheet es-sheet">
        <div class="es-header">
            <img class="es-sprite" src="${mob.image}" style="${imgStyle}" onerror="this.src='img/icons/icon.png'">
            <div class="es-header-info">
                <span class="es-name">${seen ? mob.name : '???'}</span>
                <div class="es-badges">
                    ${famLvlBadge}
                    ${archiBadgeHtml}
                    ${rarityHtml}
                    ${elemHtml}
                </div>
            </div>
        </div>
        ${statsHtml}
        ${movesHtml}
    </div>`

    openTooltip(seen ? mob.name : '???', body)
}

// ─── PAGE 2 : FAMILIERS ──────────────────────────────────────────────────────

const familiarFilters = { search: '', rarity: 'all', bonus: 'all' }
let _familiarFuse = null

function _getFamiliarFuse() {
    if (!_familiarFuse) {
        const entries = familiars.map(f => ({ id: f.id, name: f.name }))
        _familiarFuse = new Fuse(entries, { keys: ['name'], threshold: 0.4 })
    }
    return _familiarFuse
}

function resetFamiliarFilters() {
    familiarFilters.search = ''
    familiarFilters.rarity = 'all'
    familiarFilters.bonus  = 'all'
    const srch   = document.getElementById('encyclopédie-search')
    const rarity = document.getElementById('encyclopédie-filter-fam-rarity')
    const bonus  = document.getElementById('encyclopédie-filter-fam-bonus')
    if (srch)   srch.value   = ''
    if (rarity) rarity.value = 'all'
    if (bonus)  bonus.value  = 'all'
    updateFamiliarListUI()
}

function updateFamiliarListUI() {
    const list = document.getElementById('familiar-list')
    if (!list) return
    list.innerHTML = ''

    const rarityFilter = document.getElementById('encyclopédie-filter-fam-rarity')?.value || 'all'
    const bonusFilter  = document.getElementById('encyclopédie-filter-fam-bonus')?.value  || 'all'

    let searchIds = null
    if (familiarFilters.search.length >= 1) {
        const results = _getFamiliarFuse().search(familiarFilters.search)
        searchIds = new Set(results.map(r => r.item.id))
    }

    for (const fam of familiars) {
        if (rarityFilter !== 'all' && fam.rarity !== rarityFilter) continue
        if (bonusFilter  !== 'all' && !fam.bonuses.some(b => b.bonusType === bonusFilter)) continue
        if (searchIds && !searchIds.has(fam.id)) continue

        const level      = getFamiliarLevel(fam)
        const archiCount = fam.monsters.filter(id => state.collection[id]?.isArchi).length
        const unlocked   = level > 0
        const card = document.createElement('div')
        card.className = `game-bubble${unlocked ? '' : ' bubble-unknown'}`
        card.title     = fam.name

        if (unlocked) {
            const archiLabel = archiCount > 0
                ? `<span class="bubble-level bubble-level-archi">★ ×${archiCount}</span>`
                : `<span class="bubble-level">Niv.${level}</span>`
            card.innerHTML = `${archiLabel}<img src="${fam.image}" onerror="this.src='img/icons/icon.png'">`
        } else {
            card.innerHTML = `<img class="silhouette" src="${fam.image}" onerror="this.src='img/icons/icon.png'">`
        }

        card.addEventListener('click',       () => showFamiliarTooltip(fam.id))
        card.addEventListener('contextmenu', e  => { e.preventDefault(); showFamiliarTooltip(fam.id) })
        list.appendChild(card)
    }

    if (!familiars.length) {
        list.innerHTML = '<div style="opacity:0.4;padding:2rem;text-align:center;font-size:0.9rem;">Aucun familier défini.</div>'
    }

    const unlockedCount = familiars.filter(f => getFamiliarLevel(f) > 0).length
    const totalEl = document.getElementById('encyclopédie-total')
    if (totalEl) totalEl.textContent = `${unlockedCount} / ${familiars.length}`
}

function showFamiliarTooltip(familiarId) {
    const fam = familiarById[familiarId]
    if (!fam) return

    const level = getFamiliarLevel(fam)

    if (level === 0) {
        const body = `<div class="member-sheet es-sheet">
            <div class="es-header">
                <img class="es-sprite" src="${fam.image}" style="filter:brightness(0);" onerror="this.src='img/icons/icon.png'">
                <div class="es-header-info">
                    <span class="es-name">???</span>
                </div>
            </div>
        </div>`
        openTooltip('???', body)
        return
    }

    const archiMult = _getFamiliarArchiMult(fam)
    const bonuses   = getFamiliarBonusesComputed(familiarId)
    const archiCount = fam.monsters.filter(id => state.collection[id]?.isArchi).length

    const STAT_L = {
        atk: 'Puissance', maxHp: 'PV', spd: 'Initiative', dropRate: 'Taux de drop', xpGain: 'Gain XP',
        flatDamage: 'Dégâts fixes', finalDamagePct: 'Dégâts finaux %', damageReductionPct: 'Réd. dégâts',
        critChance: 'Crit', critDamagePct: 'Dég. crit.', healPct: 'Soins %', healTeamPct: 'Soins équipe %',
        healMaxHpPct: 'Soins PV max %', lifestealPct: 'Vol de vie %',
        'res.eau': 'Rés. Eau', 'res.feu': 'Rés. Feu', 'res.air': 'Rés. Air',
        'res.terre': 'Rés. Terre', 'res.neutre': 'Rés. Neutre'
    }

    const isPercent = stat =>
        stat === 'dropRate' || stat === 'xpGain' || stat.endsWith('Pct') || stat.startsWith('res.')

    // bonuses (computed) n'a pas min/max → on lit fam.bonuses pour le max théorique
    const bonusRows = fam.bonuses.map((bDef, i) => {
        const b      = bonuses[i]
        const label  = STAT_L[bDef.bonusStat] || bDef.bonusStat
        const unit   = isPercent(bDef.bonusStat) ? '%' : ''
        const maxVal = Math.floor(getFamiliarStatValue(200, bDef.min, bDef.max, fam.rarity) * archiMult)
        const curVal = b?.value ?? 0
        return `<div class="ms-stat-row">
            <span class="ms-stat-label">${formatBonusType(bDef.bonusType)} ${label}</span>
            <span class="ms-stat-val">+${curVal}${unit} <span style="opacity:0.5;font-size:0.75em">(max +${maxVal}${unit})</span></span>
        </div>`
    }).join('')

    const mobRows = fam.monsters.map(id => {
        const mob     = monsters[id]
        const entry   = state.collection[id]
        const captured = !!entry
        const isArchi  = !!entry?.isArchi
        const rowStyle = captured ? '' : 'opacity:0.4;'
        const imgStyle = captured ? 'width:1.2rem;height:1.2rem;object-fit:contain;'
                                  : 'width:1.2rem;height:1.2rem;object-fit:contain;filter:brightness(0);'
        return `<div class="ms-stat-row" style="${rowStyle}">
            <span class="ms-stat-label" style="display:flex;align-items:center;gap:0.3rem;">
                <img src="${mob?.image || 'img/icons/icon.png'}" style="${imgStyle}" onerror="this.src='img/icons/icon.png'">
                ${captured ? (mob?.name || id) : '???'}${isArchi ? ' <span style="color:#ffd700">★</span>' : ''}
            </span>
            <span class="ms-stat-val">${captured ? `Niv.${entry.level}` : 'Non capturé'}</span>
        </div>`
    }).join('')

    const archiNote = archiCount > 0
        ? `<div class="ms-stat-row" style="margin-top:0.3rem;">
               <span class="ms-stat-label" style="color:#ffd700">Bonus archi (×${archiCount})</span>
               <span class="ms-stat-val" style="color:#ffd700">+${Math.round((archiMult - 1) * 100)}%</span>
           </div>`
        : ''

    const body = `<div class="member-sheet es-sheet">
        <div class="es-header">
            <img class="es-sprite" src="${fam.image}" onerror="this.src='img/icons/icon.png'">
            <div class="es-header-info">
                <span class="es-name">${fam.name}</span>
                <div class="es-badges">
                    <span class="level-badge">Niv. ${level}/200</span>
                    <span class="rarity-${fam.rarity}" style="font-size:0.72rem;">${fam.rarity.replace('_',' ')}</span>
                </div>
            </div>
        </div>
        <div class="ms-section-title" style="margin-top:0.5rem;">Bonus</div>
        <div class="ms-stats">${bonusRows || '<span style="opacity:0.4;font-size:0.8rem">Aucun bonus</span>'}${archiNote}</div>
        <div class="ms-section-title" style="margin-top:0.5rem;">Monstres assignés</div>
        <div class="ms-stats">${mobRows}</div>
    </div>`

    openTooltip(fam.name, body)
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

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
        atk:          'Puissance',
        maxHp:        'PV',
        healPct:      'Soins %',
        healTeamPct:  'Soins équipe %',
        healMaxHpPct: 'Soins PV max %',
        lifestealPct: 'Vol de vie %',
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
