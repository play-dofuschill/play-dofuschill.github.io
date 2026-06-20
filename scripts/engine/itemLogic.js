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

function getMaxForgeSlots(statCount) {
    return Math.ceil(statCount / 2)
}

// Interpole linéairement entre s.min (level 1) et s.max (level itemLevelMax).
// Si l'item n'a qu'une valeur fixe (ancien format), utilise s.value pour les deux bornes.
function getItemStats(itm, level, forgedStats = null, transForge = null) {
    const maxLevel = itm.itemLevelMax || 20
    const t = maxLevel > 1 ? (level - 1) / (maxLevel - 1) : 1

    const arr = Array.isArray(forgedStats) ? forgedStats : (forgedStats ? [forgedStats] : [])
    const map = {}
    for (const f of arr) { map[f.statIndex] = f }

    const result = itm.stats.map((s, i) => {
        const lo   = s.min ?? s.value ?? 0
        const hi   = s.max ?? s.value ?? 0
        const base = Math.round(lo + (hi - lo) * t)
        const forged = map[i]
        if (forged) {
            if (forged.stat !== s.stat) {
                return { stat: forged.stat, value: forged.value, isForged: true, isTranscendance: false }
            }
            return { stat: s.stat, value: base + forged.value, isForged: true, forgeBonus: forged.value }
        }
        return { stat: s.stat, value: base, isForged: false }
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
