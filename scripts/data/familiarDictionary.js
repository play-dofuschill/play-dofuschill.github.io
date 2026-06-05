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
//   ],
// }
//
// bonusType 'farming' → dropRate ou xpGain (%, appliqué dans loot.js)
// bonusType 'combat'  → atk, spd, flatDamage, critChance… (valeur brute, stats.js)
// bonusType 'defense' → maxHp, res.*, damageReductionPct (stats.js)
//   stats: [
//     { bonusStat: 'atk', min: 1, max: 50 }, valeur brute
//     { bonusStat: 'spd', min: 1, max: 50 }, valeur brute
//     { bonusStat: 'flatDamage', min: 1, max: 50 }, valeur brute
//     { bonusStat: 'finalDamagePct', min: 1, max: 50 }, valeur en %
//     { bonusStat: 'spellDamagePct', min: 1, max: 50 }, valeur en %
//     { bonusStat: 'damageReductionPct', min: 1, max: 50 }, valeur en %
//     { bonusStat: 'critChance', min: 1, max: 50 }, valeur brute
//     { bonusStat: 'critDamagePct', min: 1, max: 50 }, valeur en %
//     { bonusStat: 'maxHp', min: 1, max: 50 }, valeur brutes
//     { bonusStat: 'res.feu', min: 1, max: 50 }, valeur en %
//     { bonusStat: 'res.eau', min: 1, max: 50 }, valeur en %
//     { bonusStat: 'res.terre', min: 1, max: 50 }, valeur en %
//     { bonusStat: 'res.air', min: 1, max: 50 }, valeur en %
//     { bonusStat: 'res.neutre', min: 1, max: 50 }, valeur en %
//     { bonusStat: 'dropRate', min: 1, max: 50 }, valeur en %
//     { bonusStat: 'xpGain', min: 1, max: 50 }, valeur en %
// ]


// #region ─── Courbes de progression ───────────────────────────────────────────────────

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
// #endregion


// #region ─── Définitions des familiers de zone ───────────────────────────────────────

const familiars = [
    // ─── ZONE ─────────────────────────────────────────────────────────────
    // {
    //     id:       'familierNom',
    //     name:     'Nom affiché',
    //     image:    'img/familiars/nom.png',
    //     rarity:   'commun' | 'peu_commun' | 'rare' | 'legendaire',
    //     monsters: [mobs de l'area ],
    //     bonuses: [
    //         { bonusType: 'farming' | 'combat' | 'defense', bonusStat: 'dropRate', min: 1, max: 10 }
    //     ],
    //     stats: [
    //         { bonusStat: 'atk', min: 1, max: 50 }
    //     ]
    // },
    // ─── INCARNAM ─────────────────────────────────────────────────────────────
    {
        id:       'familierchacha',
        name:     'Chacha',
        image:    'img/familiers/chacha.png',
        rarity:   'commun',
        monsters: ['chaferDebutant', 'chaferEclaireur', 'chaferFurtif', 'chaferPiquier', 'sergentChafer'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 }
        ]
    },
    {
        id:       'familierkardorim',
        name:     "Kardorib Apprivoisé",
        image:    'img/monstres/sprites/kardorib.png',
        rarity:   'peu_commun',
        monsters: ['kardorim'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 2, max: 10 }
        ]
    },
    // ─── PIOU ─────────────────────────────────────────────────────────────
    {
        id:       'familierpiouteviolette',
        name:     'Pioute violette',
        image:    'img/familiers/piouteviolette.png',
        rarity:   'commun',
        monsters: ['piouViolet'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'spd', min: 1, max: 10 }
        ]
    },
    {
        id:       'familierpiouterose',
        name:     'Pioute rose',
        image:    'img/familiers/piouterose.png',
        rarity:   'commun',
        monsters: ['piouRose'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'heal', min: 1, max: 30 }
        ]
    },
    {
        id:       'familierpiouteverte',
        name:     'Pioute verte',
        image:    'img/familiers/piouteverte.png',
        rarity:   'commun',
        monsters: ['piouVert'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'spd', min: 1, max: 5 },
            { bonusType: 'defense', bonusStat: 'res.terre', min: 1, max: 5 }
        ]
    },
    {
        id:       'familierpioutejaune',
        name:     'Pioute jaune',
        image:    'img/familiers/pioutejaune.png',
        rarity:   'commun',
        monsters: ['piouJaune'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'spd', min: 1, max: 5 },
            { bonusType: 'defense', bonusStat: 'res.air', min: 1, max: 5 }
        ]
    },
    {
        id:       'familierpioutebleue',
        name:     'Pioute bleue',
        image:    'img/familiers/pioutebleue.png',
        rarity:   'commun',
        monsters: ['piouBleu'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'spd', min: 1, max: 5 },
            { bonusType: 'defense', bonusStat: 'res.eau', min: 1, max: 5 }
        ]
    },
    {
        id:       'familierpiouterouge',
        name:     'Pioute rouge',
        image:    'img/familiers/piouterouge.png',
        rarity:   'commun',
        monsters: ['piouRouge'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'spd', min: 1, max: 5 },
            { bonusType: 'defense', bonusStat: 'res.feu', min: 1, max: 5 }
        ]
    },
    // ─── CHAMPS ASTRUB ─────────────────────────────────────────────────────────────
    {
        id:       'familiermosk',
        name:     'Mosk',
        image:    'img/familiers/mosk.png',
        rarity:   'commun',
        monsters: ['tournesolSauvage', 'roseDemoniaque', 'pissenliDiabolique', 'epouvanteur', 'gardienneChampetre'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'atk', min: 1, max: 30 }
        ]
    },
    {
        id:       'familiertournesolAffame',
        name:     'Tournesol Affamé Apprivoisé',
        image:    'img/monstres/sprites/tournesolAffame.png',
        rarity:   'rare',
        monsters: ['tournesolAffame'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 }
        ]
    },
    // ─── PLAGE ASTRUB ─────────────────────────────────────────────────────────────
    {
        id:       'familiersurime',
        name:     'Surime',
        image:    'img/familiers/surime.png',
        rarity:   'commun',
        monsters: ['pichonOrange', 'pichonBleu', 'pichonBlanc', 'pichonVert', 'pichonKloune'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'maxHp', min: 1, max: 30 }
        ]
    },
    {
        id:       'familiermobLeponge',
        name:     "Mob L'éponge Apprivoisé",
        image:    'img/monstres/sprites/mobLeponge.png',
        rarity:   'rare',
        monsters: ['mobLeponge'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'maxHp', min: 2, max: 50 }
        ]
    },
    // ─── FORET ASTRUB ─────────────────────────────────────────────────────────────
    {
        id:       'familierpykur',
        name:     'Pykur',
        image:    'img/familiers/pykur.png',
        rarity:   'commun',
        monsters: ['milimulou', 'prespic', 'sanglier', 'ecurouille', 'hommeOurs'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 1, max: 10 }
        ]
    },
    // ─── Tainela ─────────────────────────────────────────────────────────────
    {
        id:       'familierbouloute',
        name:     'Bouloute',
        image:    'img/familiers/bouloute.png',
        rarity:   'commun',
        monsters: ['bouftou', 'bouftonBlanc', 'bouftonNoir', 'bouftouNoir', 'bouftouChefDeGuerre'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 5 }
        ]
    },
    {
        id:       'familierboulouteduparrain',
        name:     'Bouloute du Parrain',
        image:    'img/familiers/boulouteduparrain.png',
        rarity:   'peu_commun',
        monsters: ['bouftou', 'bouftonBlanc', 'bouftonNoir', 'bouftouNoir', 'bouftouChefDeGuerre'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 7 }
        ]
    },
    {
        id:       'familierbouftouRoyal',
        name:     'Bouftou Royal Apprivoisé',
        image:    'img/monstres/sprites/bouftouRoyal.png',
        rarity:   'rare',
        monsters: ['bouftouRoyal'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'dropRate', min: 2, max: 10 }
        ]
    },
    // ─── ROBOTS ─────────────────────────────────────────────────────────────
    {
        id:       'familierrobotPoussePousse',
        name:     'Robot ménager',
        image:    'img/monstres/Events/robotPoussePousse.png',
        rarity:   'commun',
        monsters: ['robionicle', 'robotFleau', 'robotPoussePousse', 'malleOutillee'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'critChance', min: 1, max: 5 }
        ]
    },
    // ─── BLOP ─────────────────────────────────────────────────────────────
    {
        id:       'familiergelutin',
        name:     'Gelutin',
        image:    'img/familiers/gelutin.png',
        rarity:   'commun',
        monsters: ['biblop_coco', 'biblop_reinette', 'biblop_griotte', 'biblop_indigo'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 }
        ]
    },
    {
        id:       'familierblopignon',
        name:     'Blopmignon',
        image:    'img/monstres/sprites/blopignon.png',
        rarity:   'commun',
        monsters: ['blopCoco', 'blopReinette', 'blopGriotte', 'blopIndigo', 'blopignon', 'tronkoBlop', 'gloutoBlop'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'maxHp', min: 1, max: 50 }
        ]
    },
    {
        id:       'familierblopReinetteRoyal',
        name:     'Blop Reinette Royal Apprivoisé',
        image:    'img/monstres/sprites/blopReinetteRoyal.png',
        rarity:   'rare',
        monsters: ['blopReinetteRoyal'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'maxHp', min: 1, max: 50 },
            { bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 }
        ]
    },
    {
        id:       'familierblopCocoRoyal',
        name:     'Blop Coco Royal Apprivoisé',
        image:    'img/monstres/sprites/blopCocoRoyal.png',
        rarity:   'rare',
        monsters: ['blopCocoRoyal'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'spd', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 }
        ]
    },
    {
        id:       'familierblopGriotteRoyal',
        name:     'Blop Griotte Royal Apprivoisé',
        image:    'img/monstres/sprites/blopGriotteRoyal.png',
        rarity:   'rare',
        monsters: ['blopGriotteRoyal'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'heal', min: 1, max: 30 },
            { bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 }
        ]
    },
    {
        id:       'familierblopIndigoRoyal',
        name:     'Blop Indigo Royal Apprivoisé',
        image:    'img/monstres/sprites/blopIndigoRoyal.png',
        rarity:   'rare',
        monsters: ['blopIndigoRoyal'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 1, max: 15 },
            { bonusType: 'combat', bonusStat: 'maxHp', min: 1, max: 50 },        ]
    },
    // ─── DOPEULS ─────────────────────────────────────────────────────────────
    {
        id:       'familierDarkvlad',
        name:     'Esprit du dopeul Darkvlad',
        image:    'img/monstres/Events/dopeul_darkvlad.png',
        rarity:   'rare',
        monsters: ['dopeul_cra', 'dopeul_ecaflip', 'dopeul_eliotrope', 'dopeul_eniripsa', 'dopeul_enutrof',
                   'dopeul_feca', 'dopeul_forgelance', 'dopeul_huppermage', 'dopeul_iop', 'dopeul_osamodas',
                   'dopeul_ouginak', 'dopeul_pandawa', 'dopeul_roublard', 'dopeul_sacrieur', 'dopeul_sadida',
                   'dopeul_sram', 'dopeul_steamer', 'dopeul_xelor', 'dopeul_zobal'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'dropRateElite', min: 5, max: 50 }
        ]
    },
    // ─── SCARAFEUILLE ─────────────────────────────────────────────────────────────
    {
        id:       'familierscarador',
        name:     'Scarador',
        image:    'img/familiers/scarador.png',
        rarity:   'commun',
        monsters: ['scarafeuilleBleu', 'scarafeuilleVert', 'scarafeuilleBlanc', 'scarafeuilleRouge', 'scarafeuilleNoir'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.terre', min: 1, max: 5 },
            { bonusType: 'defense', bonusStat: 'res.feu', min: 1, max: 5 },
            { bonusType: 'defense', bonusStat: 'res.eau', min: 1, max: 5 },
            { bonusType: 'defense', bonusStat: 'res.air', min: 1, max: 5 }
        ]
    },
    {
        id:       'familierscarabossDoree',
        name:     'Scaraboss Dorée Apprivoisé',
        image:    'img/monstres/sprites/scarabossDoree.png',
        rarity:   'rare',
        monsters: ['scarabossDoree'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.terre', min: 2, max: 7 },
            { bonusType: 'defense', bonusStat: 'res.feu', min: 2, max: 7 },
            { bonusType: 'defense', bonusStat: 'res.eau', min: 2, max: 7 },
            { bonusType: 'defense', bonusStat: 'res.air', min: 2, max: 7 },
            { bonusType: 'defense', bonusStat: 'res.neutre', min: 1, max: 4 }
        ]
    },
    // ─── BILBY ─────────────────────────────────────────────────────────────
    {
        id:       'familierbilby',
        name:     'Bilby',
        image:    'img/familiers/bilby.png',
        rarity:   'peu_commun',
        monsters: ['gelee_fraise','gelee_menthe','gelee_bleuet','gelee_citron'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'dropRate', min: 2, max: 20 }
        ]
    },
    // ─── KWAK ─────────────────────────────────────────────────────────────
    {
        id:       'familierphenix',
        name:     'Phénix',
        image:    'img/familiers/phenix.png',
        rarity:   'commun',
        monsters: ['kwakVent', 'kwakFlamme', 'kwakGlace', 'kwakTerre', 'kwakereVent', 'kwakereFlamme', 'kwakereGlace', 'kwakereTerre'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'spd', min: 1, max: 5 },
            { bonusType: 'defense', bonusStat: 'maxHp', min: 1, max: 30 },
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'atk', min: 1, max: 30 }
        ]
    },
    {
        id:       'familierkwakwa',
        name:     'Kwakwa Apprivoisé',
        image:    'img/monstres/sprites/kwakwa.png',
        rarity:   'rare',
        monsters: ['kwakwa'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'spd', min: 3, max: 10 },
            { bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 40 },
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 3, max: 15 },
            { bonusType: 'combat', bonusStat: 'atk', min: 5, max: 40 }
        ]
    },
    // ─── RAID DOFUS ARGENTE ─────────────────────────────────────────────────────────────
    {
        id:       'familierRathrosk',
        name:     'Rathrosk Apprivoisé',
        image:    'img/monstres/Raids/Rathrosk.png',
        rarity:   'rare',
        monsters: ['Rathrosk'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 10 },
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'atk', min: 5, max: 50 },
            { bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }
        ]
    },
    // ─── ABRAKNYDE ANCESTRAL ─────────────────────────────────────────────────────────────
    {
        id:       'familierabraKadabra',
        name:     'AbraKadabra',
        image:    'img/familiers/abraKadabra.png',
        rarity:   'rare',
        monsters: ['abrakneSombre','abraknydeSombre','araknotron','abraknydeVenerable'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'critResPct', min: 1, max: 20 }
        ]
    },
    // ─── MANTISCORE ─────────────────────────────────────────────────────────────
    {
        id:       'familiermantiscore',
        name:     'Mantiscore Apprivoisé',
        image:    'img/monstres/sprites/mantiscore.png',
        rarity:   'rare',
        monsters: ['mantiscore'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'damageReductionPct', min: 1, max: 5 }
        ]
    },
    // ─── DRAGON COCHON ─────────────────────────────────────────────────────────────
    {
        id:       'familierPorcaile',
        name:     'Porçailé',
        image:    'img/familiers/Porcaile.png',
        rarity:   'peu_commun',
        monsters: ['cochonDeFarle', 'donDorgan', 'donDussAng', 'porsalu', 'gorgouille'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'maxHp', min: 1, max: 50 },
            { bonusType: 'combat', bonusStat: 'spd', min: 1, max: 15 }
        ]
    },
    {
        id:       'familierdragonCochon',
        name:     'Dragon Cochon Apprivoisé',
        image:    'img/monstres/sprites/dragonCochon.png',
        rarity:   'rare',
        monsters: ['dragonCochon'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'maxHp', min: 1, max: 75 },
            { bonusType: 'combat', bonusStat: 'spd', min: 1, max: 15 },
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 3, max: 20 }
        ]
    },
    // // ─── KRALAMOUR ─────────────────────────────────────────────────────────────
    // {
    //     id:       'familierNom',
    //     name:     'Nom affiché',
    //     image:    'img/familiers/nom.png',
    //     rarity:   'rare',
    //     monsters: [mobs de l'area raidKralamoureGeant],
    //     bonuses: [
    //         { bonusType: 'farming' | 'combat' | 'defense', bonusStat: 'dropRate', min: 1, max: 10 }
    //     ]
    // },
    // // ─── TOURBIERE ─────────────────────────────────────────────────────────────
    // {
    //     id:       'familierNom',
    //     name:     'Nom affiché',
    //     image:    'img/familiers/nom.png',
    //     rarity:   'rare',
    //     monsters: [mobs de l'area raidTourbeduRoissingue],
    //     bonuses: [
    //         { bonusType: 'farming', bonusStat: 'dropRate', min: 5, max: 25 }
    //     ]
    // },
]

// #endregion


// Index id → familier pour accès O(1)
const familiarById = Object.fromEntries(familiars.map(f => [f.id, f]))
