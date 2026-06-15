// itemLogic.js — logique de calcul des items (tiers, multiplicateurs, forge)
//
// Ce fichier contient UNIQUEMENT la logique. Les données des items sont dans
// scripts/data/itemDictionary.js (objet global `item`).
//
// Doit être chargé AVANT engine/stats.js, engine/forge.js, ui/forge.js et
// ui/inventory.js, qui appellent getItemStats() / getMaxForgeSlots().

// ────────────────────────────────────────────────────────────────────────
// ───────────────── fonctionnalité de level de l'item ────────────────────
// ────────────────────────────────────────────────────────────────────────

const LEVEL_TIERS = [
    { maxLevel: 5, tier: 1 },
    { maxLevel: 12, tier: 2 },
    { maxLevel: 19, tier: 3 },
    { maxLevel: 20, tier: 4 }
]

function getItemTier(level) {
    return (LEVEL_TIERS.find(t => level <= t.maxLevel) ?? LEVEL_TIERS[LEVEL_TIERS.length - 1]).tier
}

const ITEM_TIER_MULTIPLIERS = {
    1: 1.00,
    2: 1.15,
    3: 1.30,
    4: 1.50
}

function getMaxForgeSlots(statCount) {
    return Math.ceil(statCount / 2)
}

function getItemStats(itm, level, forgedStats = null, transForge = null) {
    const tier       = getItemTier(level)
    const multiplier = ITEM_TIER_MULTIPLIERS[tier] || 1

    // support array (new) and single object (backward compat)
    const arr = Array.isArray(forgedStats) ? forgedStats : (forgedStats ? [forgedStats] : [])
    const map = {}
    for (const f of arr) { map[f.statIndex] = f }

    const result = itm.stats.map((s, i) => {
        const forged = map[i]
        if (forged) {
            const base = Math.round(s.value * multiplier)
            if (forged.stat !== s.stat) {
                return { stat: forged.stat, value: forged.value, isForged: true, isTranscendance: false }
            }
            return { stat: s.stat, value: base + forged.value, isForged: true, forgeBonus: forged.value }
        }
        return { stat: s.stat, value: Math.round(s.value * multiplier), isForged: false }
    })

    if (transForge) {
        result.push({ stat: transForge.stat, value: transForge.value, isForged: true, isTranscendance: true, forgeBonus: transForge.value })
    }

    return result
}

// ────────────────────────────────────────────────────────────────────────
// ────────────────── Pour une future implémentation ──────────────────────
// ───────────── augmenter le boost de passage de palier ──────────────────
// ────────────────────────────────────────────────────────────────────────
// const RARITY_MULT = {
//     commun: 1,
//     peu_commun: 1.1,
//     rare: 1.25,
//     legendaire: 1.7
// }
//
// finalValue = baseValue * tierMultiplier * rarityMultiplier
// ────────────────────────────────────────────────────────────────────────
