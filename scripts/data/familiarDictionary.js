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
//
//  curvePower | effet
//  ───────────┼──────────────────────────────────
//  1.0        │ linéaire
//  1.5        │ léger ramp-up
//  2.0        │ classique RPG
//  2.2        │ (défaut) lent début + gros late game
//  3.0        │ très lent début + très gros late game

function getFamiliarStatValue(level, min, max, maxLevel = 200, curvePower = 2.2) {
    const t = Math.min(level, maxLevel) / maxLevel
    return min + (max - min) * Math.pow(t, curvePower)
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

        const value = Math.floor(getFamiliarStatValue(level, fam.min, fam.max))
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
        value: Math.floor(getFamiliarStatValue(level, fam.min, fam.max))
    }
}
