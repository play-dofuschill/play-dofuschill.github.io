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
// astralLevel (0-20) applique +1% à toutes les stats (dont transForge) via amélioration
// astrale (engine/forge.js: applyAstralUpgrade) — exposé séparément en `astralBonus` pour
// que l'UI puisse l'afficher à part, tout en restant fondu dans `value` pour le combat.
function getItemStats(itm, level, forgedStats = null, transForge = null, astralLevel = 0) {
    const maxLevel = itm.itemLevelMax || 20
    const t = maxLevel > 1 ? (level - 1) / (maxLevel - 1) : 1
    const astralMult = 1 + (astralLevel || 0) * 0.01

    const arr = Array.isArray(forgedStats) ? forgedStats : (forgedStats ? [forgedStats] : [])
    const map = {}
    for (const f of arr) { map[f.statIndex] = f }

    const result = itm.stats.map((s, i) => {
        const lo   = s.min ?? s.value ?? 0
        const hi   = s.max ?? s.value ?? 0
        const base = Math.round(lo + (hi - lo) * t)
        const forged = map[i]

        let stat, preAstral, isForged = false, forgeBonus
        if (forged) {
            isForged = true
            if (forged.stat !== s.stat) {
                stat = forged.stat
                preAstral = forged.value
            } else {
                stat = s.stat
                preAstral = base + forged.value
                forgeBonus = forged.value
            }
        } else {
            stat = s.stat
            preAstral = base
        }

        const value = Math.round(preAstral * astralMult)
        const astralBonus = value - preAstral
        const entry = { stat, value, isForged, isTranscendance: false }
        if (forgeBonus !== undefined) entry.forgeBonus = forgeBonus
        if (astralBonus) entry.astralBonus = astralBonus
        return entry
    })

    if (transForge) {
        const value = Math.round(transForge.value * astralMult)
        const astralBonus = value - transForge.value
        const entry = { stat: transForge.stat, value, isForged: true, isTranscendance: true, forgeBonus: transForge.value }
        if (astralBonus) entry.astralBonus = astralBonus
        result.push(entry)
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
