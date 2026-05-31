// familiarDictionary.js — Familiers de zone DofusChill
//
// Chaque familier est lié à un ensemble de monstres (field monsters:[]).
// Niveau du familier = floor(moyenne des niveaux de collection des monstres assignés).
// Bonus archi     : chaque monstre capturé en version archimonstre ajoute +10% au bonus final.
//
// Format d'une entrée :
// {
//   id:       'familierNom',
//   name:     'Nom affiché',
//   image:    'img/familiars/nom.png',
//   rarity:   'commun' | 'peu_commun' | 'rare' | 'legendaire',
//   monsters: ['monsterId1', 'monsterId2', ...],
//   bonuses: [
//     { bonusType: 'farming' | 'combat' | 'defense', bonusStat: 'dropRate', min: 1, max: 10 }
//   ]
// }
//
// bonusType 'farming' → dropRate ou xpGain (%, appliqué dans loot.js)
// bonusType 'combat'  → atk, spd, flatDamage, critChance… (valeur brute, stats.js)
// bonusType 'defense' → maxHp, res.*, damageReductionPct (stats.js)

// ─── Courbes de progression ───────────────────────────────────────────────────

const familiarCurves = {
    commun:     'log',
    peu_commun: 'linear',
    rare:       1.2,
    legendaire: 2.2
}

function getFamiliarStatValue(level, min, max, rarity = 'commun', maxLevel = 200) {
    const clampedLevel = Math.min(level, maxLevel)
    if (clampedLevel >= maxLevel) return max

    const t = clampedLevel / maxLevel
    const curve = familiarCurves[rarity]
    let progression

    if      (curve === 'log')    progression = Math.log10(1 + 9 * t)
    else if (curve === 'linear') progression = t
    else                         progression = Math.pow(t, curve)

    return Math.floor(min + (max - min) * progression)
}

// ─── Niveau d'un familier de zone ────────────────────────────────────────────
// Moyenne arrondie à l'inférieur des niveaux de collection des monstres assignés.
// Un monstre jamais capturé compte pour 0.

function getFamiliarLevel(familiar) {
    if (!familiar?.monsters?.length) return 0
    const total = familiar.monsters.reduce(
        (sum, id) => sum + (state.collection[id]?.level ?? 0), 0
    )
    return Math.floor(total / familiar.monsters.length)
}

// ─── Multiplicateur archi d'un familier ──────────────────────────────────────

function _getFamiliarArchiMult(familiar) {
    const archiCount = familiar.monsters.filter(id => state.collection[id]?.isArchi).length
    return 1 + archiCount * 0.10
}

// ─── Bonus calculés d'un familier (pour affichage et application) ─────────────
// Retourne [{ bonusType, bonusStat, value }, ...]

function getFamiliarBonusesComputed(familiarId) {
    const fam = familiarById[familiarId]
    if (!fam?.bonuses?.length) return []
    const level     = getFamiliarLevel(fam)
    const archiMult = _getFamiliarArchiMult(fam)
    return fam.bonuses.map(b => ({
        bonusType: b.bonusType,
        bonusStat: b.bonusStat,
        value: Math.floor(getFamiliarStatValue(level, b.min, b.max, fam.rarity) * archiMult)
    }))
}

// ─── Agrégat de tous les bonus familiers équipés (farming + combat + defense) ─

function getAllFamiliarBonuses() {
    if (!state.team) return {}
    const totals = {}
    for (const member of state.team) {
        const famId = member?.equip?.familier
        if (!famId) continue
        for (const { bonusStat, value } of getFamiliarBonusesComputed(famId)) {
            if (value > 0) totals[bonusStat] = (totals[bonusStat] || 0) + value
        }
    }
    return totals
}

// ─── Définitions des familiers de zone ───────────────────────────────────────

const familiars = [

    // ─── Tainela ─────────────────────────────────────────────────────────────
    {
        id:       'familierBouftou',
        name:     'Esprit Bouftou',
        image:    'img/monstres/sprites/bouftou.png',
        rarity:   'commun',
        monsters: ['bouftou', 'bouftonBlanc', 'bouftonNoir', 'bouftouNoir', 'bouftouChefDeGuerre'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 10 }
        ]
    },

]

// Index id → familier pour accès O(1)
const familiarById = Object.fromEntries(familiars.map(f => [f.id, f]))
