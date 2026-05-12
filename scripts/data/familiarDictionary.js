// familiarDictionary.js — Système de familiers DofusChill
//
// Les données familier sont dans monsterDictionary.js :
//   familiar: { bonusType, bonusStat, min, max }
//
// bonusType 'farming' → dropRate ou xpGain (%, appliqué dans loot.js et progression.js)
// bonusType 'combat'  → atk, hp, spd, flatDamage, critChance… (valeur brute, appliqué dans stats.js)
// bonusType 'defense' → res.feu, res.eau, res.air, res.terre, res.neutre, damageReductionPct (%, stats.js)
//
// La valeur du bonus suit une courbe de puissance (lente au début, forte en late game) :
//   valeur = min + (max - min) * (level / 200) ^ curvePower
// Toutes les entrées équipées sur l'équipe s'additionnent.

// ─── Courbe de progression ────────────────────────────────────────────────────

const familiarCurves = {
    commun:     'log',
    peu_commun: 'linear',
    rare:       1.2,
    legendaire: 2.2
}

function getFamiliarStatValue(
    level,
    min,
    max,
    rarity = 'commun',
    maxLevel = 200
) {
    const clampedLevel = Math.min(level, maxLevel)

    // le niveau max donne TOUJOURS exactement la valeur max
    if (clampedLevel >= maxLevel) {
        return max
    }

    const t = clampedLevel / maxLevel

    let progression

    const curve = familiarCurves[rarity]

    // COMMUN : logarithmique
    if (curve === 'log') {
        progression = Math.log10(1 + 9 * t)
    }

    // PEU COMMUN : linéaire
    else if (curve === 'linear') {
        progression = t
    }

    // RARE / LEGENDAIRE : exponentiel
    else {
        progression = Math.pow(t, curve)
    }

    const value = min + (max - min) * progression

    // IMPORTANT :
    // on arrondit toujours à l'entier inférieur
    // pour éviter d'atteindre max avant le niveau max
    return Math.floor(value)
}

// ─── Agrégat de tous les bonus familiers équipés ──────────────────────────────
// Retourne { bonusStat: valeurTotale, ... } pour toutes les stats

function getAllFamiliarBonuses() {
    if (!state.team) return {}

    const totals = {}

    for (const member of state.team) {
        const famId = member?.equip?.familier
        if (!famId) continue

        const mob = monsters[famId]
        const fam = mob?.familiar
        if (!fam?.bonusStat || fam.min == null || fam.max == null) continue

        const entry = state.collection[famId]
        const level = entry?.level || 0

        const value = Math.floor(getFamiliarStatValue(level, fam.min, fam.max, mob.rarity))
        if (value === 0) continue

        totals[fam.bonusStat] = (totals[fam.bonusStat] || 0) + value
    }

    return totals
}

// ─── Bonus d'un seul familier (pour l'affichage UI) ──────────────────────────

function getFamiliarBonusValue(monsterId) {
    const mob = monsters[monsterId]
    const fam = mob?.familiar
    if (!fam?.bonusStat) return null

    const entry = state.collection[monsterId]
    const level = entry?.level || 0

    return {
        stat:  fam.bonusStat,
        value: Math.floor(getFamiliarStatValue(level, fam.min, fam.max, mob.rarity))
    }
}
