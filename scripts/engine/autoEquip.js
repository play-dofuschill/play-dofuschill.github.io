// engine/autoEquip.js — Auto-équipement optimal d'un personnage selon des stats choisies
//
// Règles respectées :
// 1. Un item déjà porté par un AUTRE personnage (en équipe ou non) n'est jamais proposé.
// 2. Le familier n'est jamais touché (EQUIP_SLOT_ORDER est filtré de 'familier').
// 3. Les stats réellement lues sont celles de getItemStats() — donc forgemagie/transcendance incluses.
// 4. Les bonus de panoplie sont pris en compte via countSetPieces(), y compris les scénarios
//    "3/5 panoplie A + 2/3 panoplie B" comparés explicitement à un 5/5 d'une seule panoplie.
//
// Ce fichier ne contient que la logique (aucun DOM). L'UI est dans ui/autoEquip.js.

const AUTO_EQUIP_SLOTS = EQUIP_SLOT_ORDER.filter(s => s !== 'familier')

const AUTO_EQUIP_STATS = [
    ['atk',                'Puissance'],
    ['flatDamage',         'Dégâts fixes'],
    ['finalDamagePct',     'Dégâts finaux %'],
    ['spellDamagePct',     'Dégâts sorts %'],
    ['critChance',         'Chance critique %'],
    ['critDamagePct',      'Dégâts critiques %'],
    ['force',              'Force (Terre)'],
    ['intelligence',       'Intelligence (Feu)'],
    ['chance',             'Chance (Eau)'],
    ['agilite',            'Agilité (Air)'],
    ['maxHp',              'PV'],
    ['spd',                'Initiative'],
    ['damageReductionPct', 'Réduction de dégâts %'],
    ['critResPct',         'Résistance critique'],
    ['healPct',            'Soins %'],
    ['healTeamPct',        'Soins équipe %'],
    ['healMaxHpPct',       'Soins % PV max'],
    ['heal',               'Soins fixes'],
    ['lifestealPct',       'Vol de vie %'],
    ['res.neutre',         'Résistance Neutre'],
    ['res.terre',          'Résistance Terre'],
    ['res.feu',            'Résistance Feu'],
    ['res.eau',            'Résistance Eau'],
    ['res.air',            'Résistance Air'],
    ['dropRate',           'Taux de drop %'],
    ['xpGain',             'Gain d\'XP %'],
]
const AUTO_EQUIP_STAT_LABELS = Object.fromEntries(AUTO_EQUIP_STATS)

// ─── Contexte du personnage ────────────────────────────────────────────────

function _autoEquipLevelCap(member) {
    if (typeof combat !== 'undefined' && combat?.syncedLevel) return combat.syncedLevel
    if (typeof _pendingAreaId !== 'undefined' && _pendingAreaId) {
        const pa = areas[_pendingAreaId]
        if (pa?.maxLevel && (state.skullLevel > 0 || pa.type === 'wanted')) return pa.maxLevel
    }
    return member.level || 0
}

// Items déjà portés par un AUTRE personnage (en équipe active, ou en réserve via classEquip)
function _autoEquipTakenElsewhere(excludeClassId) {
    const taken = new Set()
    const seenClasses = new Set()
    for (const m of state.team) {
        if (!m) continue
        seenClasses.add(m.classId)
        if (m.classId === excludeClassId) continue
        for (const [slot, itemId] of Object.entries(m.equip || {})) {
            if (slot === 'familier' || !itemId) continue
            taken.add(itemId)
        }
    }
    for (const [classId, saved] of Object.entries(state.classEquip || {})) {
        if (classId === excludeClassId || seenClasses.has(classId)) continue
        for (const [slot, itemId] of Object.entries(saved?.equip || {})) {
            if (slot === 'familier' || !itemId) continue
            taken.add(itemId)
        }
    }
    return taken
}

// ─── Stats réelles d'un item (forgemagie/transcendance incluses) ──────────

function _autoEquipItemStatMap(itemId) {
    const itm = item[itemId]
    if (!itm?.stats) return {}
    const lvl = Math.max(1, getItemLevel(itemId))
    const computed = getItemStats(itm, lvl, state.inventory[itemId]?.forgedStats || null, state.inventory[itemId]?.transForge || null)
    const map = {}
    for (const { stat, value } of computed) map[stat] = (map[stat] || 0) + value
    return map
}

function _autoEquipCandidatesForSlot(slot, lvlCap, taken) {
    const targetSlot = slot === 'anneau2' ? 'anneau' : slot
    return Object.values(item)
        .filter(itm =>
            itm.type === 'equipment' &&
            state.inventory[itm.id] &&
            (!itm.slot || itm.slot === targetSlot) &&
            !taken.has(itm.id) &&
            (!itm.requiredLevel || itm.requiredLevel <= lvlCap)
        )
        .map(itm => ({
            id: itm.id,
            statMap: _autoEquipItemStatMap(itm.id),
            sets: itm.set ? (Array.isArray(itm.set) ? itm.set : [itm.set]) : [],
        }))
}

// ─── Normalisation par stat (0..1) pour pondérer équitablement les stats choisies ─

function _autoEquipBuildNorm(selectedStats, candidatesBySlot) {
    const norm = {}
    for (const s of selectedStats) norm[s] = 0
    for (const slot of AUTO_EQUIP_SLOTS) {
        for (const c of candidatesBySlot[slot]) {
            for (const s of selectedStats) {
                const v = Math.abs(c.statMap[s] || 0)
                if (v > norm[s]) norm[s] = v
            }
        }
    }
    const relevantSets = new Set()
    for (const slot of AUTO_EQUIP_SLOTS)
        for (const c of candidatesBySlot[slot])
            for (const setId of c.sets) relevantSets.add(setId)
    for (const setId of relevantSets) {
        const pano = panoplies[setId]
        if (!pano?.bonuses) continue
        for (const tier of Object.values(pano.bonuses)) {
            for (const { stat, value } of (tier.stats || [])) {
                if (!selectedStats.includes(stat)) continue
                const v = Math.abs(value)
                if (v > norm[stat]) norm[stat] = v
            }
        }
    }
    for (const s of selectedStats) if (!norm[s]) norm[s] = 1
    return norm
}

function _autoEquipItemScore(statMap, selectedStats, norm) {
    let total = 0
    for (const s of selectedStats) total += (statMap[s] || 0) / norm[s]
    return total
}

// Résout, pour un décompte de pièces de panoplie donné, le palier actif et ses stats
// (même logique que getEffectiveStats — seul le palier le plus haut atteint s'applique)
function _autoEquipPanoplyBonusStats(setCounts) {
    const out = {}
    for (const [setId, count] of Object.entries(setCounts)) {
        const pano = panoplies[setId]
        if (!pano?.bonuses) continue
        const thresholds = Object.keys(pano.bonuses).map(Number).sort((a, b) => a - b)
        let activeT = null
        for (const t of thresholds) { if (count >= t) activeT = t }
        if (activeT === null) continue
        for (const { stat, value } of (pano.bonuses[activeT].stats || [])) out[stat] = (out[stat] || 0) + value
    }
    return out
}

function _autoEquipScoreAssignment(member, assignment, selectedStats, norm, itemScoreCache) {
    let total = 0
    for (const slot of AUTO_EQUIP_SLOTS) {
        const itemId = assignment[slot]
        if (itemId) total += itemScoreCache[itemId] || 0
    }
    const tempEquip = { ...member.equip, ...assignment }
    const setCounts = countSetPieces(tempEquip)
    const panoBonus = _autoEquipPanoplyBonusStats(setCounts)
    for (const s of selectedStats) total += (panoBonus[s] || 0) / norm[s]
    return total
}

// anneau / anneau2 partagent le même pool d'items (targetSlot 'anneau') — un item ne peut
// pas être équipé aux deux doigts en même temps (une seule entrée logique en inventaire).
function _autoEquipDedupeRings(assignment, scoredBySlot) {
    if (!assignment.anneau || !assignment.anneau2 || assignment.anneau !== assignment.anneau2) return assignment
    const asg = { ...assignment }
    const alt = scoredBySlot.anneau2.find(c => c.id !== asg.anneau)
    asg.anneau2 = alt ? alt.id : null
    return asg
}

// ─── Calcul de la meilleure combinaison ────────────────────────────────────

function computeAutoEquip(classId, selectedStats) {
    if (!Array.isArray(selectedStats) || !selectedStats.length) return null
    const stats = selectedStats.slice(0, 3)
    const member = state.team.find(m => m && m.classId === classId)
    if (!member) return null

    const lvlCap = _autoEquipLevelCap(member)
    const taken  = _autoEquipTakenElsewhere(classId)

    const candidatesBySlot = {}
    for (const slot of AUTO_EQUIP_SLOTS) candidatesBySlot[slot] = _autoEquipCandidatesForSlot(slot, lvlCap, taken)

    const norm = _autoEquipBuildNorm(stats, candidatesBySlot)

    const itemScoreCache = {}
    const scoredBySlot = {}
    for (const slot of AUTO_EQUIP_SLOTS) {
        scoredBySlot[slot] = candidatesBySlot[slot]
            .map(c => {
                const score = _autoEquipItemScore(c.statMap, stats, norm)
                itemScoreCache[c.id] = score
                return { ...c, score }
            })
            .sort((a, b) => b.score - a.score)
    }

    // Pool de candidats par slot : top K individuel + meilleur représentant de chaque
    // panoplie (même hors top K) pour pouvoir explorer les scénarios de panoplie.
    const K = 6
    const poolBySlot = {}
    const bestPerSetBySlot = {}
    for (const slot of AUTO_EQUIP_SLOTS) {
        const scored = scoredBySlot[slot]
        const pool = scored.slice(0, K)
        const poolIds = new Set(pool.map(c => c.id))
        const bestPerSet = {}
        for (const c of scored) {
            for (const setId of c.sets) {
                if (!bestPerSet[setId] || c.score > bestPerSet[setId].score) bestPerSet[setId] = c
            }
        }
        for (const c of Object.values(bestPerSet)) {
            if (!poolIds.has(c.id)) { pool.push(c); poolIds.add(c.id) }
        }
        poolBySlot[slot] = pool
        bestPerSetBySlot[slot] = bestPerSet
    }

    const baseline = {}
    for (const slot of AUTO_EQUIP_SLOTS) baseline[slot] = scoredBySlot[slot][0]?.id || null

    const allSets = new Set()
    for (const slot of AUTO_EQUIP_SLOTS)
        for (const c of poolBySlot[slot])
            for (const setId of c.sets) allSets.add(setId)

    function buildSetAssignment(setIds, base) {
        const asg = { ...base }
        for (const setId of setIds) {
            for (const slot of AUTO_EQUIP_SLOTS) {
                const best = bestPerSetBySlot[slot][setId]
                if (best) asg[slot] = best.id
            }
        }
        return _autoEquipDedupeRings(asg, scoredBySlot)
    }

    let bestAssignment = _autoEquipDedupeRings(baseline, scoredBySlot)
    let bestScore = _autoEquipScoreAssignment(member, bestAssignment, stats, norm, itemScoreCache)

    // Scénario "tout sur une panoplie" pour chaque set candidat
    for (const setId of allSets) {
        const asg = buildSetAssignment([setId], baseline)
        const sc = _autoEquipScoreAssignment(member, asg, stats, norm, itemScoreCache)
        if (sc > bestScore) { bestScore = sc; bestAssignment = asg }
    }

    // Scénarios mixtes "panoplie A + panoplie B" (les deux ordres de priorité, pour couvrir
    // par ex. 3/5 A + 2/3 B vs 2/3 B + 3/5 A quand les deux se disputent un même slot)
    const setList = [...allSets]
    for (let i = 0; i < setList.length; i++) {
        for (let j = 0; j < setList.length; j++) {
            if (i === j) continue
            const asg = buildSetAssignment([setList[i], setList[j]], baseline)
            const sc = _autoEquipScoreAssignment(member, asg, stats, norm, itemScoreCache)
            if (sc > bestScore) { bestScore = sc; bestAssignment = asg }
        }
    }

    // Affinage local : essaie chaque candidat du pool sur chaque slot, garde si ça améliore
    let improved = true
    let guard = 0
    while (improved && guard < 5) {
        improved = false
        guard++
        for (const slot of AUTO_EQUIP_SLOTS) {
            for (const c of poolBySlot[slot]) {
                if (bestAssignment[slot] === c.id) continue
                const asg = _autoEquipDedupeRings({ ...bestAssignment, [slot]: c.id }, scoredBySlot)
                const sc = _autoEquipScoreAssignment(member, asg, stats, norm, itemScoreCache)
                if (sc > bestScore + 1e-9) { bestScore = sc; bestAssignment = asg; improved = true }
            }
        }
    }

    return { assignment: bestAssignment, score: bestScore }
}

// Applique le résultat sur le personnage. Un slot sans meilleur candidat trouvé
// (aucun item dispo) n'est pas touché — l'équipement actuel reste en place.
function applyAutoEquip(classId, selectedStats) {
    const result = computeAutoEquip(classId, selectedStats)
    if (!result) return null
    const member = state.team.find(m => m && m.classId === classId)
    if (!member) return null

    const lvlCap = _autoEquipLevelCap(member)

    let changed = 0
    for (const slot of AUTO_EQUIP_SLOTS) {
        const itemId = result.assignment[slot] || null
        if (itemId && member.equip[slot] !== itemId) {
            member.equip[slot] = itemId
            changed++
        } else if (!itemId) {
            // Aucun candidat valide trouvé pour ce slot : si l'objet actuellement équipé
            // dépasse le niveau autorisé (perso/zone), on le retire plutôt que de le laisser
            // en place — sinon l'auto-équipement ne corrige jamais un équipement trop haut niveau.
            const current = member.equip[slot]
            const itm = current ? item[current] : null
            if (itm?.requiredLevel && itm.requiredLevel > lvlCap) {
                member.equip[slot] = null
                changed++
            }
        }
    }

    const stats = getEffectiveStats(member)
    if (stats) member.maxHp = stats.hp

    saveGame()
    updateTeamUI()

    return { changed }
}
