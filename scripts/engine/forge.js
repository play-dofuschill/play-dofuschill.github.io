// engine/forge.js — Système de forgemagie DofusChill

function applyForge(itemId, statIndex, runeItemId) {
    const itm = item[itemId]
    if (!itm || itm.type !== 'equipment' || !itm.stats?.length) return { error: 'ITEM_INVALID' }

    const entry = state.inventory[itemId]
    if (!entry) return { error: 'ITEM_INVALID' }

    const rune = item[runeItemId]
    if (!rune || rune.type !== 'rune') return { error: 'RUNE_INVALID' }

    const runeEntry = state.inventory[runeItemId]
    if (!runeEntry || (runeEntry.count ?? 1) < 1) return { error: 'RUNE_UNAVAILABLE' }

    const levelCost = rune.levelCost ?? 5
    if (entry.level <= levelCost) return { error: 'INSUFFICIENT_LEVEL', levelCost, itemLevel: entry.level }

    const runeMinLevel = rune.minRequiredLevel ?? 0
    const itemReqLevel = itm.requiredLevel ?? 1
    if (itemReqLevel < runeMinLevel) return { error: 'RUNE_TIER_MISMATCH', runeMinLevel, itemReqLevel }

    // ─── Rune de Transcendance : nouveau slot bonus, 1 seule par item ────────────
    if (rune.transcendance) {
        if (entry.transForge) return { error: 'TRANS_ALREADY_APPLIED' }
        entry.transForge = { stat: rune.stat, value: rune.value, transcendance: true }
        runeEntry.count = (runeEntry.count ?? 1) - 1
        if (runeEntry.count <= 0) delete state.inventory[runeItemId]
        entry.level = Math.max(1, entry.level - levelCost)
        saveGame()
        return { stat: rune.stat, value: rune.value, newLevel: entry.level, isTranscendance: true }
    }

    // ─── Rune normale : modifie un slot de stat existant ─────────────────────────
    if (statIndex < 0 || statIndex >= itm.stats.length) return { error: 'ITEM_INVALID' }

    const itemStat = itm.stats[statIndex]
    if (rune.stat !== itemStat.stat) return { error: 'STAT_MISMATCH', runeStat: rune.stat, slotStat: itemStat.stat }

    // migrate old single forgedStat → forgedStats array
    if (entry.forgedStat && !entry.forgedStats) {
        entry.forgedStats = [entry.forgedStat]
        delete entry.forgedStat
    }
    if (!entry.forgedStats) entry.forgedStats = []

    const maxSlots      = getMaxForgeSlots(itm.stats.length)
    const existingIdx   = entry.forgedStats.findIndex(f => f.statIndex === statIndex)
    const alreadyForged = existingIdx >= 0

    if (!alreadyForged && entry.forgedStats.length >= maxSlots) return { error: 'SLOTS_FULL' }

    const newForge = { statIndex, stat: rune.stat, value: rune.value }
    if (alreadyForged) {
        entry.forgedStats[existingIdx] = newForge
    } else {
        entry.forgedStats.push(newForge)
    }

    runeEntry.count = (runeEntry.count ?? 1) - 1
    if (runeEntry.count <= 0) delete state.inventory[runeItemId]
    entry.level = Math.max(1, entry.level - levelCost)

    saveGame()
    return { stat: rune.stat, value: rune.value, newLevel: entry.level, isTranscendance: false }
}

// Fusionne N runes normales en 1 rune de transcendance
function applyFusion(regularRuneId) {
    const rune = item[regularRuneId]
    if (!rune || rune.type !== 'rune' || rune.transcendance) return null

    const fusionCost = rune.fusionCost
    if (!fusionCost) return null

    const runeEntry = state.inventory[regularRuneId]
    const owned     = runeEntry?.count ?? 0
    if (owned < fusionCost) return null

    // ID de la rune de transcendance : 'runeTrans' + reste de l'ID après 'rune'
    const transRuneId = 'runeTrans' + regularRuneId.slice(4)
    const transRune   = item[transRuneId]
    if (!transRune) return null

    // Consommer les runes normales
    runeEntry.count -= fusionCost
    if (runeEntry.count <= 0) delete state.inventory[regularRuneId]

    // Ajouter la rune de transcendance
    if (state.inventory[transRuneId]) {
        state.inventory[transRuneId].count = (state.inventory[transRuneId].count ?? 0) + 1
    } else {
        state.inventory[transRuneId] = { count: 1 }
    }

    saveGame()
    return { transRuneId, transRune }
}

// Déplace une forgemagie d'un slot de stat vers un autre
function applyConcassageSwap(itemId, sourceStatIdx, targetStatIdx) {
    const itm   = item[itemId]
    const entry = state.inventory[itemId]
    if (!itm || !entry || sourceStatIdx === targetStatIdx) return null

    if (entry.forgedStat && !entry.forgedStats) {
        entry.forgedStats = [entry.forgedStat]; delete entry.forgedStat
    }
    if (!entry.forgedStats?.length) return null

    const cost = 5 * ((itm.stats?.length || 2) - 1)
    if (state.kamas < cost) return null

    const forgeToMove = entry.forgedStats.find(f => f.statIndex === sourceStatIdx)
    if (!forgeToMove) return null

    entry.forgedStats = entry.forgedStats.filter(
        f => f.statIndex !== sourceStatIdx && f.statIndex !== targetStatIdx
    )
    entry.forgedStats.push({ ...forgeToMove, statIndex: targetStatIdx })

    state.kamas -= cost
    saveGame()
    if (typeof updateKamasDisplay === 'function') updateKamasDisplay()
    return { cost }
}

// Retire une forgemagie d'un slot de stat (1 kama). statIdx === -1 retire le transForge.
function applyConcassageRemove(itemId, statIdx) {
    const itm   = item[itemId]
    const entry = state.inventory[itemId]
    if (!itm || !entry) return null
    if (state.kamas < 1) return null

    if (statIdx === -1) {
        if (!entry.transForge) return null
        delete entry.transForge
        state.kamas -= 1
        saveGame()
        if (typeof updateKamasDisplay === 'function') updateKamasDisplay()
        return { cost: 1 }
    }

    if (entry.forgedStat && !entry.forgedStats) {
        entry.forgedStats = [entry.forgedStat]; delete entry.forgedStat
    }
    if (!entry.forgedStats?.length) return null

    const before = entry.forgedStats.length
    entry.forgedStats = entry.forgedStats.filter(f => f.statIndex !== statIdx)
    if (entry.forgedStats.length === before) return null

    state.kamas -= 1
    saveGame()
    if (typeof updateKamasDisplay === 'function') updateKamasDisplay()
    return { cost: 1 }
}
