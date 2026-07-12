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
        name:     'Kardorib Apprivoisé',
        image:    'images/monsters/Kardorib.png',
        rarity:   'commun',
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
        image:    'images/monsters/Tournesol_Affamé.png',
        rarity:   'peu_commun',
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
        name:     'Mob L\'éponge Apprivoisé',
        image:    'images/monsters/Mob_l_Éponge.png',
        rarity:   'peu_commun',
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
        rarity:   'commun',
        monsters: ['bouftou', 'bouftonBlanc', 'bouftonNoir', 'bouftouNoir', 'bouftouChefDeGuerre'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 7 }
        ]
    },
    {
        id:       'familierbouftouRoyal',
        name:     'Bouftou Royal Apprivoisé',
        image:    'images/monsters/Bouftou_Royal.png',
        rarity:   'peu_commun',
        monsters: ['bouftouRoyal'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'dropRate', min: 2, max: 10 }
        ]
    },
    // ─── ROBOTS ─────────────────────────────────────────────────────────────
    {
        id:       'familierrobotPoussePousse',
        name:     'Robot ménager',
        image:    'images/monsters/Robot_Pousse-Pousse.png',
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
        image:    'images/monsters/Blopignon.png',
        rarity:   'commun',
        monsters: ['blopCoco', 'blopReinette', 'blopGriotte', 'blopIndigo', 'blopignon', 'tronkoBlop', 'gloutoBlop'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'maxHp', min: 1, max: 50 }
        ]
    },
    {
        id:       'familierblopReinetteRoyal',
        name:     'Blop Reinette Royal Apprivoisé',
        image:    'images/monsters/Blop_Reinette_Royal.png',
        rarity:   'peu_commun',
        monsters: ['blopReinetteRoyal'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'maxHp', min: 1, max: 50 },
            { bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 }
        ]
    },
    {
        id:       'familierblopCocoRoyal',
        name:     'Blop Coco Royal Apprivoisé',
        image:    'images/monsters/Blop_Coco_Royal.png',
        rarity:   'peu_commun',
        monsters: ['blopCocoRoyal'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'spd', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 }
        ]
    },
    {
        id:       'familierblopGriotteRoyal',
        name:     'Blop Griotte Royal Apprivoisé',
        image:    'images/monsters/Blop_Griotte_Royal.png',
        rarity:   'peu_commun',
        monsters: ['blopGriotteRoyal'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'heal', min: 1, max: 30 },
            { bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 }
        ]
    },
    {
        id:       'familierblopIndigoRoyal',
        name:     'Blop Indigo Royal Apprivoisé',
        image:    'images/monsters/Blop_Indigo_Royal.png',
        rarity:   'peu_commun',
        monsters: ['blopIndigoRoyal'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 1, max: 15 },
            { bonusType: 'combat', bonusStat: 'maxHp', min: 1, max: 50 }
        ]
    },
    // ─── DOPEULS ─────────────────────────────────────────────────────────────
    {
        id:       'familierDarkvlad',
        name:     'Esprit du dopeul Darkvlad',
        image:    'images/monsters/Dopeul_Dark_Vlad.png',
        rarity:   'rare',
        monsters: ['dopeul_cra', 'dopeul_ecaflip', 'dopeul_eliotrope', 'dopeul_eniripsa', 'dopeul_enutrof', 'dopeul_feca', 'dopeul_forgelance', 'dopeul_huppermage', 'dopeul_iop', 'dopeul_osamodas', 'dopeul_ouginak', 'dopeul_pandawa', 'dopeul_roublard', 'dopeul_sacrieur', 'dopeul_sadida', 'dopeul_sram', 'dopeul_steamer', 'dopeul_xelor', 'dopeul_zobal'],
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
        image:    'images/monsters/Scarabosse_Doré.png',
        rarity:   'peu_commun',
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
        rarity:   'commun',
        monsters: ['gelee_fraise', 'gelee_menthe', 'gelee_bleuet', 'gelee_citron'],
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
        image:    'images/monsters/Kwakwa.png',
        rarity:   'peu_commun',
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
        image:    'images/monsters/Rathrosk.png',
        rarity:   'legendaire',
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
        rarity:   'commun',
        monsters: ['abrakneSombre', 'abraknydeSombre', 'araknotron', 'abraknydeVenerable'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'critResPct', min: 1, max: 20 }
        ]
    },
    // ─── MANTISCORE ─────────────────────────────────────────────────────────────
    {
        id:       'familiermantiscore',
        name:     'Mantiscore Apprivoisé',
        image:    'images/monsters/Mantiscore.png',
        rarity:   'peu_commun',
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
        rarity:   'commun',
        monsters: ['cochonDeFarle', 'donDorgan', 'donDussAng', 'porsalu', 'gorgouille'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'maxHp', min: 1, max: 50 },
            { bonusType: 'combat', bonusStat: 'spd', min: 1, max: 15 }
        ]
    },
    {
        id:       'familierdragonCochon',
        name:     'Dragon Cochon Apprivoisé',
        image:    'images/monsters/Dragon_Cochon.png',
        rarity:   'peu_commun',
        monsters: ['dragonCochon'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'maxHp', min: 1, max: 75 },
            { bonusType: 'combat', bonusStat: 'spd', min: 1, max: 15 },
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 3, max: 20 }
        ]
    },
    // ═══════════════════════════════════════════════════════════════════
    // ZONES NORMALE MANQUANTES (générées automatiquement — a completer par l'utilisateur)
    // ═══════════════════════════════════════════════════════════════════
    // ─── Campement des Gobs (campementDesGobs) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['gobet', 'gobaliste', 'gob_trotteur', 'gobichon', 'gobaladee'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'atk', min: 3, max: 22 }
        ]
    },
    // ─── Attraction fantôme (attractionFantome) ───
    {
        id:       'fotome',
        name:     'Fotome',
        image:    'img/familiers/fotome.png',
        rarity:   'commun',
        monsters: ['boostache_prepubere', 'tofu_malefique', 'gargrouille', 'kwoan', 'vampire'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 32 }
        ]
    },
    // ─── Crypte du cimetière (crypteDuCimetiere) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['chafer', 'rib', 'chafer_invisible', 'chafer_fantassin', 'chafer_draugr', 'chafer_primitif'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 4 }
        ]
    },
    // ─── Grenier de Kerubim (grenierDeKerubim) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['cafarcher', 'pyrasite', 'mirgrillon', 'sakarien', 'ceglumen'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 2, max: 10 }
        ]
    },
    // ─── Champs des Ingalsse (champsDesIngalsse) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['tofu', 'tofu_noir', 'tofoune', 'tofukaz', 'tofu_ventripotent', 'tofu_mutant'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'damageReductionPct', min: 1, max: 3 }
        ]
    },
    // ─── Campement Bwork (campementBwork) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['bwork_archer', 'bwork_mage', 'bwork', 'troollaraj'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 4 }
        ]
    },
    // ─── Territoire des bandits (territoireDesBandits) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['boulanger_sombre', 'mineur_sombre', 'forgeron_sombre', 'bandit_manchot'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'spd', min: 2, max: 6 }
        ]
    },
    // ─── Côte de corail (coteDeCorail) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['crustorail_kouracao', 'crustorail_malibout', 'crustorail_passaoh', 'crustorail_morito', 'corailleur', 'palmifleur_kouracao', 'palmifleur_malibout', 'palmifleur_passaoh', 'palmifleur_morito'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.feu', min: 1, max: 3 }
        ]
    },
    // ─── Prairies d'Astrub (prairiesAstrub) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['larve_bleue', 'larve_verte', 'larve_orange', 'larve_jaune', 'larve_saphir', 'larve_emeraude', 'larve_rubis', 'larve_doree'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 4 }
        ]
    },
    // ─── Futaie enneigée (futaieEnneigee) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['timongouste', 'thomondor', 'buffalourd', 'grolours', 'trankilou'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'critChance', min: 1, max: 3 }
        ]
    },
    // ─── Île des Wabbits (ileDesWabbits) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['tiwabbit_kiafin', 'tiwabbit', 'black_tiwabbit', 'wabbit', 'black_wabbit', 'wo_wabbit', 'grand_pa_wabbit', 'wabbit_squelette', 'black_wabbit_squelette'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.eau', min: 1, max: 3 }
        ]
    },
    // ─── Forêt des masques (foretDesMasques) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['kanniboul_ark', 'kanniboul_eth', 'kanniboul_jav', 'kanniboul_sarbak', 'kanniboul_tam'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 5 }
        ]
    },
    // ─── Tourbière sans fonds (tourbieresSansFond) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['sparo', 'barbroussa', 'le_flib', 'boomba', 'nakunbra', 'canondorf'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'critDamagePct', min: 2, max: 5 }
        ]
    },
    // ─── Désert de Saharash (plateauMantiscore) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['ouroboulos', 'scordionBleu', 'fennex', 'leolhyene', 'boulepique'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.terre', min: 1, max: 3 }
        ]
    },
    // ─── Montagne des craqueleurs (montagneDesCraqueleurs) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['craqueboule', 'craquelourd', 'craqueleur', 'craqueleur_des_plaines', 'craquelope', 'elementerre'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 5 }
        ]
    },
    // ─── Désolation de sidimote (desolationDeSidimote) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['scorbute', 'croc_gland', 'kolerat', 'crowneille', 'macien'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'atk', min: 5, max: 33 }
        ]
    },
    // ─── Nids des Dragoeufs (nidsDragaeufs) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['dragoeufArdoise', 'dragoeufArgile', 'dragoeufCalcaire', 'dragoeufCharbon', 'dragoeufAlbatre'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.air', min: 1, max: 4 }
        ]
    },
    // ─── Souterrains Wabbits (souterrainsWabbits) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['wobot', 'black_wo_wabbit', 'wobot_kiafin', 'blanc_pa_wabbit', 'tiwobot'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 5 }
        ]
    },
    // ─── Canyon sauvage (canyonSauvage) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['koalak_immature', 'mama_koalak', 'warko_marron', 'dok_alako', 'piralak', 'drakoalak'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 3, max: 15 }
        ]
    },
    // ─── Bois des arak_haï (boisDesArakhai) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['arapex', 'dardalaine', 'nefileuse', 'saltik', 'gargantul'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.neutre', min: 1, max: 4 }
        ]
    },
    // ─── Chemin du crâne (cheminDuCrane) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['boomba', 'nakunbra', 'canondorf', 'ricanif', 'ivremor'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 5 }
        ]
    },
    // ─── Route des roulottes (routeDesRoulottes) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['bozoteur', 'tivelo', 'pirolienne', 'roukouto', 'graboule'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'spd', min: 2, max: 7 }
        ]
    },
    // ─── Haut des hurlements (hautDesHurlements) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['mulou', 'mulounoke', 'mergranlou', 'cocholou', 'muloubard'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'maxHp', min: 9, max: 57 }
        ]
    },
    // ─── Plaines Herbeuses (plainesHerbeuses) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['craqueboule_poli', 'craqueleur_poli', 'bitouf_des_plaines', 'mufafah', 'kilibriss', 'kido'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 6 }
        ]
    },
    // ─── Ile de Kartonpath (ileDeKartonpath) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['rhinoferoce', 'molette', 'gobvious', 'bouledogre', 'dramak'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'critChance', min: 1, max: 4 }
        ]
    },
    // ─── Jungle Interdite (jungleInterdite) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['trukikol', 'gloutovore', 'fourbasse', 'dostrogo', 'domoizelle'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'damageReductionPct', min: 1, max: 4 }
        ]
    },
    // ─── Village des Dragoeufs (villageDragoeufs) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['dragoss_calcaire', 'dragoss_argile', 'dragoss_ardoise', 'dragoss_charbon', 'dragoss_proteiforme'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 6 }
        ]
    },
    // ─── Pénates du corbac (penatesDuCorbac) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['renarbo', 'buveur', 'corbac', 'corbac_dresse', 'kapotie_le_buveur', 'horace_le_corbac_apprivoise', 'rono_le_renarbo', 'capsaaloocke'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'critDamagePct', min: 2, max: 7 }
        ]
    },
    // ─── Égouts de Bonta (egoutsDeBonta) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['scelee_rate', 'chak_rat', 'capoei_rat', 'chika_rat', 'aloevee_rate'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.feu', min: 1, max: 4 }
        ]
    },
    // ─── Égouts de Brâkmar (egoutsDeBrakmar) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['rat_plapla', 'rat_li', 'rat_sio', 'rate_atinee', 'rate_iboisee'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 6 }
        ]
    },
    // ─── Plantala (plantala) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['bambouto', 'floristile', 'bulbuisson', 'bulbiflore', 'grenufar'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'atk', min: 6, max: 40 }
        ]
    },
    // ─── Ile du Minotoror (ileDuMinotoror) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['gamino', 'serpiplume', 'scaratos', 'minoskito', 'mandrine', 'kramelehon', 'mominotor', 'deminoboule'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.eau', min: 1, max: 4 }
        ]
    },
    // ─── Souterrains des Dragoeufs (souterrainsDragoeufs) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['dragnarok', 'dragueuse', 'draguaindrop', 'dragace', 'dragmatique'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 6 }
        ]
    },
    // ─── Champs des Tofus Sauvages (champsDesTofusSauvages) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['tofuzmo', 'vilain_petit_tofu', 'tofutoflamme', 'tofubine', 'tofu_dodu'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 3, max: 17 }
        ]
    },
    // ─── Champs de Glace (champsDeGlace) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['boufmouth', 'bouftonmouth', 'boufmouth_legendaire', 'boufmouth_de_guerre'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.terre', min: 1, max: 4 }
        ]
    },
    // ─── Vallée de la mort Kitu (valleeDeLaMortKitu) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['koalak_sanguin', 'guerrier_koalak', 'koalak_farouche', 'warko_violet', 'fauchalak'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 6 }
        ]
    },
    // ─── Lac de Cania (lacDeCaniaProfond) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['blopCocoRoyal', 'blopGriotteRoyal', 'blopIndigoRoyal', 'blopReinetteRoyal'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'spd', min: 3, max: 9 }
        ]
    },
    // ─── Cirque de Cania (cirqueDeCania) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['gruche', 'truchmuche', 'truchideur', 'truchtine', 'truchon'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.air', min: 1, max: 4 }
        ]
    },
    // ─── Territoire Cacterre (territoireCacterre) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['cactiflore', 'cactana', 'cactoblongo', 'pampactus', 'levito'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 6 }
        ]
    },
    // ─── Akwadala (akwadala) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['sarkapwane', 'kokom', 'akakwa', 'betto', 'kwamourai'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'critChance', min: 1, max: 4 }
        ]
    },
    // ─── Terrdala (terrdala) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'commun',
        monsters: ['shinibaru', 'ishigro_pake', 'tetonuki', 'parashukoui', 'lolojiki'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.neutre', min: 1, max: 4 }
        ]
    },
    // ─── Forêt sombre (foretSombre) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['branche_invocatrice', 'branche_soignante', 'araknotron_irascible', 'abrakne_sombre_irascible', 'abraknyde_sombre_irascible'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 7 },
            { bonusType: 'combat', bonusStat: 'critDamagePct', min: 2, max: 8 }
        ]
    },
    // ─── Lac gelé (lacGele) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['timansot', 'shamansot', 'mansobese', 'mamansot', 'fu_mansot'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'atk', min: 7, max: 44 },
            { bonusType: 'defense', bonusStat: 'maxHp', min: 10, max: 67 }
        ]
    },
    // ─── Jungle Obscure (jungleObscure) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['floribonde', 'bitouf_sombre', 'brouture', 'nerbe', 'fecorce', 'chiendent', 'abrakleur_sombre'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'damageReductionPct', min: 1, max: 4 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 7 }
        ]
    },
    // ─── Aerdala (aerdala) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['uchiwang', 'ino_naru', 'kurookin', 'fangshu', 'lichangoro'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 7 },
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 4, max: 18 }
        ]
    },
    // ─── Feudala (feudala) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['crachefoux', 'rouquette', 'boumbardier', 'petartifoux', 'founamboul'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'spd', min: 3, max: 9 },
            { bonusType: 'defense', bonusStat: 'res.feu', min: 1, max: 4 }
        ]
    },
    // ─── Égouts du château d'Amakna (egoutsDuChateauAmakna) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['ramane', 'rat_goutant', 'rat_masseur', 'rat_colleur', 'rat_pine', 'rat_caille', 'rat_fraichi', 'rat_botteur', 'rat_noir', 'rat_blanc'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.eau', min: 1, max: 5 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 7 }
        ]
    },
    // ─── Berceau d'Alma (berceauDAlma) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['fantomalamere', 'fantimonier', 'fantomat', 'harpirate', 'fancrome', 'vigie_pirate'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 7 },
            { bonusType: 'combat', bonusStat: 'critChance', min: 1, max: 5 }
        ]
    },
    // ─── Larmes d'Ouronigride (larmesDOuronigride) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['crapeur', 'atomystique', 'fumrirolle', 'solfatare', 'mofette'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'critDamagePct', min: 3, max: 9 },
            { bonusType: 'defense', bonusStat: 'res.terre', min: 1, max: 5 }
        ]
    },
    // ─── Feuillage de l'arbre Hakam (feuillageArbreHakam) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['bitouf_aerien', 'kaskargo', 'poolay', 'abrakleur_clair', 'meupette'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.air', min: 1, max: 5 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 7 }
        ]
    },
    // ─── Centre du Labyrinthe du Minotoror (centreDuLabyrintheMinotoror) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['mominotor', 'deminoboule', 'minotoror'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 7 },
            { bonusType: 'combat', bonusStat: 'atk', min: 7, max: 47 }
        ]
    },
    // ─── Dents de pierre (dentsDePierre) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['kanihilan', 'felygiene', 'panthegros', 'kaniblou', 'orfelin'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 4, max: 19 },
            { bonusType: 'defense', bonusStat: 'res.neutre', min: 1, max: 5 }
        ]
    },
    // ─── Cimetière de Grobe (cimetiereDeGrobe) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['tsukinochi', 'tambourai', 'onabu_geisha', 'jiangshi_nobi', 'kabushido'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'maxHp', min: 11, max: 71 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 7 }
        ]
    },
    // ─── Crevasse Perge (crevassePerge) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['yokai_givrefoux', 'maho_givrefoux', 'soryo_givrefoux', 'yomi_givrefoux', 'kami_givrefoux'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 7 },
            { bonusType: 'combat', bonusStat: 'spd', min: 3, max: 10 }
        ]
    },
    // ─── Gorge des vents hurlants (gorgeDesVentsHurlants) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['piktenia', 'tremorse', 'masticroc', 'morsquale', 'cycloporth'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'critChance', min: 1, max: 5 },
            { bonusType: 'defense', bonusStat: 'damageReductionPct', min: 1, max: 5 }
        ]
    },
    // ─── Mont des tombeaux (montDesTombeaux) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['madura', 'bakazako', 'kaonashi', 'tsume_bozu', 'onigori'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.feu', min: 1, max: 5 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 7 }
        ]
    },
    // ─── Gisgoul (gisgoul) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['mama_bwork', 'bwork_elemental_de_terre', 'bwork_elemental_de_feu', 'bwork_elemental_d_eau', 'bwork_elemental_d_air', 'cybwork'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 8 },
            { bonusType: 'combat', bonusStat: 'critDamagePct', min: 3, max: 9 }
        ]
    },
    // ─── Domaine des Fungus (domaineDesFungus) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['tromperelle', 'champaknyde', 'champodonte', 'champmane', 'champbis', 'champ_a_gnons', 'champ_champ'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'atk', min: 8, max: 50 },
            { bonusType: 'defense', bonusStat: 'res.eau', min: 1, max: 5 }
        ]
    },
    // ─── Crocs de verre (crocsDeVerre) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['blerauve', 'blerom', 'wolvero', 'croleur', 'fleuro', 'blerice'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.terre', min: 1, max: 5 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 8 }
        ]
    },
    // ─── Île de Sakaï (ileDeSakai) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['gobosteur', 'sapeur', 'ouilleur', 'perku', 'courtilieur'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 8 },
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 4, max: 20 }
        ]
    },
    // ─── Forêt pétrifiée (foretPetrifiee) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['dramanite', 'fistulor', 'fongeur', 'abrazif', 'merulette'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'spd', min: 3, max: 10 },
            { bonusType: 'defense', bonusStat: 'res.air', min: 1, max: 5 }
        ]
    },
    // ─── Mont Torrideau (montTorrideau) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['aperiglours', 'boulglours', 'gloursaya', 'glourmand', 'glouragan', 'meliglours'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.neutre', min: 1, max: 5 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 8 }
        ]
    },
    // ─── Cité oubliée (citeOubliee) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['noctulule', 'panterreur', 'brutopak', 'caznoar', 'somblero'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 8 },
            { bonusType: 'combat', bonusStat: 'critChance', min: 1, max: 5 }
        ]
    },
    // ─── Nimotopia (nimotopia) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['chevrotine', 'brokouillon', 'nemroz', 'crambo', 'viandargh'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'critDamagePct', min: 3, max: 9 },
            { bonusType: 'defense', bonusStat: 'maxHp', min: 12, max: 77 }
        ]
    },
    // ─── Ereboria (ereboria) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['blindur', 'marthos', 'serpyn', 'boufronde', 'sanglirok'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'damageReductionPct', min: 1, max: 5 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 8 }
        ]
    },
    // ─── Bastion des Froides légions (bastionFroidesLegions) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['ventrublion', 'stalak', 'karkanik', 'verglasseur', 'frimar'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 8 },
            { bonusType: 'combat', bonusStat: 'atk', min: 8, max: 52 }
        ]
    },
    // ─── Jardins d'Hivers (jardinsHivers) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['nessil', 'krakal', 'dodox', 'droserale', 'termystique'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 4, max: 21 },
            { bonusType: 'defense', bonusStat: 'res.feu', min: 1, max: 5 }
        ]
    },
    // ─── Remparts à vent (rempartsAVent) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['kanimate', 'brikoglours', 'mansordide', 'mecanofoux', 'merulor'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.eau', min: 1, max: 5 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 8 }
        ]
    },
    // ─── Tannerie Écarlate (tannerieEcarlate) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['harrogant', 'grodruche', 'empaille', 'cuirboule', 'peunch'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 8 },
            { bonusType: 'combat', bonusStat: 'spd', min: 3, max: 10 }
        ]
    },
    // ─── Tour de la Clepsydre (tourDeLaClepsydre) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['granduk', 'strigide', 'cycloide', 'sinistrofu', 'nocturlabe'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'critChance', min: 1, max: 5 },
            { bonusType: 'defense', bonusStat: 'res.terre', min: 1, max: 5 }
        ]
    },
    // ─── Abysses de Sufokia (abyssesDeSufokia) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['pikoleur', 'harpo', 'krabouilleur', 'eskoglyphe', 'cyclophandre'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.air', min: 1, max: 5 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 8 }
        ]
    },
    // ─── Roc des Salbatroce (rocDesSalbatroce) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['tabacille', 'bacterrib', 'virustine', 'pataugerme', 'verminocule'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 8 },
            { bonusType: 'combat', bonusStat: 'critDamagePct', min: 3, max: 10 }
        ]
    },
    // ─── Domaine des Trithons (domaineDesTrithons) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['tourthon', 'poulpee', 'tryde', 'rilur', 'diondin'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'atk', min: 8, max: 52 },
            { bonusType: 'defense', bonusStat: 'res.neutre', min: 1, max: 5 }
        ]
    },
    // ─── Ville submergée (villeSubmergee) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['mol_usk', 'crabe_yoloniste', 'gambaf', 'mantaze', 'tilamproie'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'maxHp', min: 12, max: 78 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 8 }
        ]
    },
    // ─── Plateau de R'lyugluglu (plateauRlyugluglu) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['grofond', 'n_yalg', 'shokkoth', 'li_fo', 'klutiste'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 8 },
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 4, max: 21 }
        ]
    },
    // ─── Caserne du jour sans fin (caserneDuJourSansFin) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['chause', 'ectorche', 'esprigne', 'feutome', 'crame'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'spd', min: 3, max: 10 },
            { bonusType: 'defense', bonusStat: 'damageReductionPct', min: 1, max: 5 }
        ]
    },
    // ─── Épave silencieuse (epaveSilencieuse) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['zombruth', 'tournoye', 'funespadon', 'cranonier', 'macrab'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.feu', min: 1, max: 5 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 8 }
        ]
    },
    // ─── Marches magmatiques (marchesMagmatiques) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['klemort', 'trepavois', 'hacharne', 'moribombe', 'halbardent'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 8 },
            { bonusType: 'combat', bonusStat: 'critChance', min: 1, max: 5 }
        ]
    },
    // ─── Royaume des martegel (royaumeDesMartegel) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['tanklume', 'boufbos', 'barbelier', 'kasrok', 'vatenbiere'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'critDamagePct', min: 3, max: 10 },
            { bonusType: 'defense', bonusStat: 'res.eau', min: 1, max: 5 }
        ]
    },
    // ─── Terres Désacrées (terresDesacrees) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['goulafre', 'kerigoule', 'gouligane', 'goultime', 'pipisteuse'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.terre', min: 1, max: 5 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 8 }
        ]
    },
    // ─── Crocuzko (crocuzko) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['kashkaille', 'voapah', 'caiguille', 'alashasss', 'cronnibal'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 8 },
            { bonusType: 'combat', bonusStat: 'atk', min: 8, max: 52 }
        ]
    },
    // ─── Royaume Corrompu (royaumeCorrompu) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['pistilangue', 'dolid', 'nheur_gueule', 'tentaclaque', 'gangredogue'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 4, max: 21 },
            { bonusType: 'defense', bonusStat: 'res.air', min: 1, max: 5 }
        ]
    },
    // ─── Galère de Servitude (galereDeServitude) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['tambourreau', 'armecreante', 'gentyran', 'boularbin', 'ecaptif'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.neutre', min: 1, max: 5 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 8 }
        ]
    },
    // ─── Désert de Misère (desertDeMisere) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['desosseur', 'ferrailleur', 'krevladal', 'skentu', 'dawaj'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 8 },
            { bonusType: 'combat', bonusStat: 'spd', min: 3, max: 10 }
        ]
    },
    // ─── Blessure de Guerre (blessureDeGuerre) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['olgoth', 'ravalame', 'fleaunide', 'macabrateur', 'trancharnier'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'critChance', min: 1, max: 5 },
            { bonusType: 'defense', bonusStat: 'maxHp', min: 12, max: 78 }
        ]
    },
    // ─── Pyramide maudite (pyramideMaudite) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['chakanoubis', 'bandleth', 'momistik', 'rykaon', 'griffotep'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'damageReductionPct', min: 1, max: 5 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 8 }
        ]
    },
    // ─── Pandamonium (pandamonium) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['kraradia', 'belilith', 'bwariok', 'porkzebuth', 'eninferno'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 8 },
            { bonusType: 'combat', bonusStat: 'critDamagePct', min: 3, max: 10 }
        ]
    },
    // ─── Cauchemar des Ravageurs (cauchemarDesRavageurs) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['brutasmodan', 'diabelial', 'typhomet', 'demoloch', 'malephisto'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'atk', min: 8, max: 52 },
            { bonusType: 'defense', bonusStat: 'res.feu', min: 1, max: 5 }
        ]
    },
    // ─── Ephedrya (ephedrya) ───
    {
        id:       '',
        name:     '',
        image:    'img/familiers/',
        rarity:   'peu_commun',
        monsters: ['soldalia', 'cameliache', 'armuguet', 'coquelicogne', 'statulipe'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.eau', min: 1, max: 5 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 8 }
        ]
    },
    // ═══════════════════════════════════════════════════════════════════
    // DONJONS MANQUANTS (générés automatiquement)
    // ═══════════════════════════════════════════════════════════════════
    // ─── Akadémie des Gobs (donjonAcademieGobs) ───
    {
        id:       'familierdirecteur_grunob',
        name:     'Directeur Grunob Apprivoisé',
        image:    'images/monsters/Directeur_Grunob.png',
        rarity:   'peu_commun',
        monsters: ['directeur_grunob'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 5 },
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 3, max: 14 }
        ]
    },
    // ─── Maison Fantôme (donjonMaisonFantome) ───
    {
        id:       'familierboostache',
        name:     'Boostache Apprivoisé',
        image:    'images/monsters/Boostache.png',
        rarity:   'peu_commun',
        monsters: ['boostache'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'spd', min: 3, max: 8 },
            { bonusType: 'defense', bonusStat: 'res.terre', min: 1, max: 4 }
        ]
    },
    // ─── Donjon des Squelettes (donjonSquelettes) ───
    {
        id:       'familierchafer_ronin',
        name:     'Chafer Rōnin Apprivoisé',
        image:    'images/monsters/Chafer_Rōnin.png',
        rarity:   'peu_commun',
        monsters: ['chafer_ronin'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.air', min: 1, max: 4 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 5 }
        ]
    },
    // ─── Donjon des Tofus (donjonTofus) ───
    {
        id:       'familierbatofu',
        name:     'Batofu Apprivoisé',
        image:    'images/monsters/Batofu.png',
        rarity:   'peu_commun',
        monsters: ['batofu'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 5 },
            { bonusType: 'combat', bonusStat: 'critChance', min: 1, max: 4 }
        ]
    },
    // ─── Cache de Kankreblath (donjonKankreblath) ───
    {
        id:       'familierkankreblath',
        name:     'Kankreblath Apprivoisé',
        image:    'images/monsters/Kankreblath.png',
        rarity:   'peu_commun',
        monsters: ['kankreblath'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'critDamagePct', min: 3, max: 7 },
            { bonusType: 'defense', bonusStat: 'res.neutre', min: 1, max: 4 }
        ]
    },
    // ─── Donjon des Bworks (donjonBworks) ───
    {
        id:       'familierbworkette',
        name:     'Bworkette Apprivoisé',
        image:    'images/monsters/Bworkette.png',
        rarity:   'peu_commun',
        monsters: ['bworkette'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'maxHp', min: 9, max: 61 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 7 }
        ]
    },
    // ─── Donjon des Forgerons (donjonForgerons) ───
    {
        id:       'familiercoffre_des_forgerons',
        name:     'Coffre des Forgerons Apprivoisé',
        image:    'images/monsters/Coffre_des_Forgerons.png',
        rarity:   'peu_commun',
        monsters: ['coffre_des_forgerons'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 7 },
            { bonusType: 'combat', bonusStat: 'atk', min: 7, max: 42 }
        ]
    },
    // ─── Grotte Hesque (donjonHesque) ───
    {
        id:       'familiercorailleur_magistral',
        name:     'Corailleur Magistral Apprivoisé',
        image:    'images/monsters/Corailleur_Magistral.png',
        rarity:   'peu_commun',
        monsters: ['corailleur_magistral'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 4, max: 17 },
            { bonusType: 'defense', bonusStat: 'damageReductionPct', min: 1, max: 4 }
        ]
    },
    // ─── Donjon des Larves (donjonLarves) ───
    {
        id:       'familiershin_larve',
        name:     'Shin Larve Apprivoisé',
        image:    'images/monsters/Shin_Larve.png',
        rarity:   'peu_commun',
        monsters: ['shin_larve'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.feu', min: 1, max: 4 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 7 }
        ]
    },
    // ─── Refuge sylvestre (donjonRefugeSylvestre) ───
    {
        id:       'familierrakoopeur',
        name:     'Rakoopeur Apprivoisé',
        image:    'images/monsters/Rakoopeur.png',
        rarity:   'peu_commun',
        monsters: ['rakoopeur'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 7 },
            { bonusType: 'combat', bonusStat: 'spd', min: 3, max: 8 }
        ]
    },
    // ─── Château du Wa Wabbit (donjonWabbit) ───
    {
        id:       'familierwa_wabbit',
        name:     'Wa Wabbit Apprivoisé',
        image:    'images/monsters/Wa_Wabbit.png',
        rarity:   'peu_commun',
        monsters: ['wa_wabbit'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'critChance', min: 1, max: 4 },
            { bonusType: 'defense', bonusStat: 'res.eau', min: 1, max: 4 }
        ]
    },
    // ─── Village Kanniboul (donjonKanniboul) ───
    {
        id:       'familierkanniboul_ebil',
        name:     'Kanniboul Ebil Apprivoisé',
        image:    'images/monsters/Kanniboul_Ebil.png',
        rarity:   'peu_commun',
        monsters: ['kanniboul_ebil'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.terre', min: 1, max: 4 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 7 }
        ]
    },
    // ─── Cale de l'Arche d'Otomaï (donjonOtomaj) ───
    {
        id:       'familiergourlo_le_terrible',
        name:     'Gourlo le Terrible Apprivoisé',
        image:    'images/monsters/Gourlo_le_Terrible.png',
        rarity:   'peu_commun',
        monsters: ['gourlo_le_terrible'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 7 },
            { bonusType: 'combat', bonusStat: 'critDamagePct', min: 3, max: 8 }
        ]
    },
    // ─── Pitons Rocheux des Craqueleurs (donjonCraqueleurs) ───
    {
        id:       'familiercraqueleur_legendaire',
        name:     'Craqueleur Légendaire Apprivoisé',
        image:    'images/monsters/Craqueleur_Légendaire.png',
        rarity:   'peu_commun',
        monsters: ['craqueleur_legendaire'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'atk', min: 7, max: 47 },
            { bonusType: 'defense', bonusStat: 'res.air', min: 1, max: 5 }
        ]
    },
    // ─── Laboratoire de Brumen Tinctorias (donjonBrumen) ───
    {
        id:       'familiernelween',
        name:     'Nelween Apprivoisé',
        image:    'images/monsters/Nelween.png',
        rarity:   'peu_commun',
        monsters: ['nelween'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.neutre', min: 1, max: 5 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 7 }
        ]
    },
    // ─── L'épreuve' de Draegnerys (donjonDraegnerys) ───
    {
        id:       'familierdraegnerys',
        name:     'Draegnerys Apprivoisé',
        image:    'images/monsters/Draegnerys.png',
        rarity:   'peu_commun',
        monsters: ['draegnerys'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 8 },
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 4, max: 20 }
        ]
    },
    // ─── Terrier du Wa Wabbit (donjonTerrierWabbit) ───
    {
        id:       'familierwa_wobot',
        name:     'Wa Wobot Apprivoisé',
        image:    'images/monsters/Wa_Wobot.png',
        rarity:   'peu_commun',
        monsters: ['wa_wobot'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'spd', min: 3, max: 10 },
            { bonusType: 'defense', bonusStat: 'maxHp', min: 10, max: 73 }
        ]
    },
    // ─── Domaine Ancestral (donjonAbraknydeAncestral) ───
    {
        id:       'familierabraknydeAncestral',
        name:     'Abraknyde Ancestral Apprivoisé',
        image:    'images/monsters/Abraknyde_Ancestral.png',
        rarity:   'peu_commun',
        monsters: ['abraknydeAncestral'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'damageReductionPct', min: 1, max: 5 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 8 }
        ]
    },
    // ─── Caverne du Koulosse (donjonKoulosse) ───
    {
        id:       'familierkoulosse',
        name:     'Koulosse Apprivoisé',
        image:    'images/monsters/Koulosse.png',
        rarity:   'peu_commun',
        monsters: ['koulosse'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 8 },
            { bonusType: 'combat', bonusStat: 'critChance', min: 1, max: 5 }
        ]
    },
    // ─── Antre de la Reine Nyée (donjonReineNyee) ───
    {
        id:       'familierreine_nyee',
        name:     'Reine Nyée Apprivoisé',
        image:    'images/monsters/Reine_Nyée.png',
        rarity:   'peu_commun',
        monsters: ['reine_nyee'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'critDamagePct', min: 3, max: 9 },
            { bonusType: 'defense', bonusStat: 'res.feu', min: 1, max: 5 }
        ]
    },
    // ─── Bateau du Chouque (donjonChouque) ───
    {
        id:       'familierle_chouque',
        name:     'Le Chouque Apprivoisé',
        image:    'images/monsters/Le_Chouque.png',
        rarity:   'peu_commun',
        monsters: ['le_chouque'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.eau', min: 1, max: 5 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 8 }
        ]
    },
    // ─── Chapiteau des Magik Riktus (donjonMagikRiktus) ───
    {
        id:       'familierchoudini',
        name:     'Choudini Apprivoisé',
        image:    'images/monsters/Choudini.png',
        rarity:   'peu_commun',
        monsters: ['choudini'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 8 },
            { bonusType: 'combat', bonusStat: 'atk', min: 8, max: 51 }
        ]
    },
    // ─── Tanière du Meulou (donjonMeulou) ───
    {
        id:       'familiermeulou',
        name:     'Meulou Apprivoisé',
        image:    'images/monsters/Meulou.png',
        rarity:   'rare',
        monsters: ['meulou'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 4, max: 21 },
            { bonusType: 'defense', bonusStat: 'res.terre', min: 1, max: 5 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 8 }
        ]
    },
    // ─── Goulet du Rasboul (donjonRasboul) ───
    {
        id:       'familiersilf_le_rasboul_majeur',
        name:     'Silf le Rasboul Majeur Apprivoisé',
        image:    'images/monsters/Silf_le_Rasboul_Majeur.png',
        rarity:   'rare',
        monsters: ['silf_le_rasboul_majeur'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.air', min: 1, max: 5 },
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 8 },
            { bonusType: 'combat', bonusStat: 'spd', min: 3, max: 10 }
        ]
    },
    // ─── Théâtre de Dramak (donjonDramak) ───
    {
        id:       'familiermaitre_des_pantins',
        name:     'Maître des Pantins Apprivoisé',
        image:    'images/monsters/Maître_des_Pantins.png',
        rarity:   'rare',
        monsters: ['maitre_des_pantins'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 8 },
            { bonusType: 'combat', bonusStat: 'critChance', min: 1, max: 5 },
            { bonusType: 'defense', bonusStat: 'res.neutre', min: 1, max: 5 }
        ]
    },
    // ─── Arbre de Moon (donjonMoon) ───
    {
        id:       'familiermoon',
        name:     'Moon Apprivoisé',
        image:    'images/monsters/Moon.png',
        rarity:   'rare',
        monsters: ['moon'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'critDamagePct', min: 3, max: 9 },
            { bonusType: 'defense', bonusStat: 'maxHp', min: 12, max: 79 },
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 8 }
        ]
    },
    // ─── Repaire du Kharnozor (donjonKharnozor) ───
    {
        id:       'familierkharnozor',
        name:     'Kharnozor Apprivoisé',
        image:    'images/monsters/Kharnozor.png',
        rarity:   'rare',
        monsters: ['kharnozor'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'damageReductionPct', min: 1, max: 5 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 8 },
            { bonusType: 'combat', bonusStat: 'atk', min: 8, max: 53 }
        ]
    },
    // ─── Bibliothèque du Maître Corbac (donjonCorbac) ───
    {
        id:       'familiermaitre_corbac',
        name:     'Maître Corbac Apprivoisé',
        image:    'images/monsters/Maître_Corbac.png',
        rarity:   'rare',
        monsters: ['maitre_corbac'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 8 },
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 4, max: 22 },
            { bonusType: 'defense', bonusStat: 'res.feu', min: 1, max: 5 }
        ]
    },
    // ─── Garde-manger du Rat Blanc (donjonRatBlanc) ───
    {
        id:       'familierrat_blanc',
        name:     'Rat Blanc Apprivoisé',
        image:    'images/monsters/Rat_Blanc.png',
        rarity:   'rare',
        monsters: ['rat_blanc'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'spd', min: 3, max: 10 },
            { bonusType: 'defense', bonusStat: 'res.eau', min: 1, max: 5 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 8 }
        ]
    },
    // ─── Sousouricière du Rat Noir (donjonRatNoir) ───
    {
        id:       'familierrat_noir',
        name:     'Rat Noir Apprivoisé',
        image:    'images/monsters/Rat_Noir.png',
        rarity:   'rare',
        monsters: ['rat_noir'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.terre', min: 1, max: 5 },
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 8 },
            { bonusType: 'combat', bonusStat: 'critChance', min: 1, max: 5 }
        ]
    },
    // ─── Bambusaie de Damadrya (donjonDamadrya) ───
    {
        id:       'familierdamadrya',
        name:     'Damadrya Apprivoisé',
        image:    'images/monsters/Damadrya.png',
        rarity:   'rare',
        monsters: ['damadrya'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 8 },
            { bonusType: 'combat', bonusStat: 'critDamagePct', min: 3, max: 10 },
            { bonusType: 'defense', bonusStat: 'res.air', min: 1, max: 5 }
        ]
    },
    // ─── Centre du Labyrinthe du Minotoror (donjonMinotoror) ───
    {
        id:       'familierminotoror',
        name:     'Minotoror Apprivoisé',
        image:    'images/monsters/Minotoror.png',
        rarity:   'rare',
        monsters: ['minotoror'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'atk', min: 9, max: 57 },
            { bonusType: 'defense', bonusStat: 'res.neutre', min: 1, max: 5 },
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 9 }
        ]
    },
    // ─── Antre de Crocabulia (donjonCrocabulia) ───
    {
        id:       'familiercrocabulia',
        name:     'Crocabulia Apprivoisé',
        image:    'images/monsters/Crocabulia.png',
        rarity:   'rare',
        monsters: ['crocabulia'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'maxHp', min: 13, max: 86 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 9 },
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 5, max: 23 }
        ]
    },
    // ─── Tofulailler Royal (donjonTofulaillerRoyal) ───
    {
        id:       'familiertofu_royal',
        name:     'Tofu Royal Apprivoisé',
        image:    'images/monsters/Tofu_Royal.png',
        rarity:   'rare',
        monsters: ['tofu_royal'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 9 },
            { bonusType: 'combat', bonusStat: 'spd', min: 4, max: 12 },
            { bonusType: 'defense', bonusStat: 'damageReductionPct', min: 1, max: 5 }
        ]
    },
    // ─── Serre du Royalmouth (donjonRoyalmouth) ───
    {
        id:       'familierroyalmouth',
        name:     'Royalmouth Apprivoisé',
        image:    'images/monsters/Royalmouth.png',
        rarity:   'rare',
        monsters: ['royalmouth'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'critChance', min: 1, max: 5 },
            { bonusType: 'defense', bonusStat: 'res.feu', min: 1, max: 5 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 9 }
        ]
    },
    // ─── Repaire de Skeunk (donjonSkeunk) ───
    {
        id:       'familierskeunk',
        name:     'Skeunk Apprivoisé',
        image:    'images/monsters/Skeunk.png',
        rarity:   'rare',
        monsters: ['skeunk'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.eau', min: 1, max: 5 },
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 9 },
            { bonusType: 'combat', bonusStat: 'critDamagePct', min: 3, max: 10 }
        ]
    },
    // ─── Antre du Blop Multicolore Royal (donjonBlopMulticolore) ───
    {
        id:       'familierblop_multicolore_royal',
        name:     'Blop Multicolore Royal Apprivoisé',
        image:    'images/monsters/Blop_Multicolore_Royal.png',
        rarity:   'rare',
        monsters: ['blop_multicolore_royal'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 9 },
            { bonusType: 'combat', bonusStat: 'atk', min: 9, max: 59 },
            { bonusType: 'defense', bonusStat: 'res.terre', min: 1, max: 5 }
        ]
    },
    // ─── Volière de la Haute Truche (donjonHauteTruche) ───
    {
        id:       'familierhaute_truche',
        name:     'Haute Truche Apprivoisé',
        image:    'images/monsters/Haute_Truche.png',
        rarity:   'rare',
        monsters: ['haute_truche'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 5, max: 23 },
            { bonusType: 'defense', bonusStat: 'res.air', min: 1, max: 5 },
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 9 }
        ]
    },
    // ─── Caverne d'El Piko (donjonElPiko) ───
    {
        id:       'familierel_piko',
        name:     'El Piko Apprivoisé',
        image:    'images/monsters/El_Piko.png',
        rarity:   'rare',
        monsters: ['el_piko'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.neutre', min: 1, max: 5 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 9 },
            { bonusType: 'combat', bonusStat: 'spd', min: 4, max: 12 }
        ]
    },
    // ─── Vallée de la Dame des eaux (donjonDameEaux) ───
    {
        id:       'familiernagate',
        name:     'Nagate Apprivoisé',
        image:    'images/monsters/Nagate.png',
        rarity:   'rare',
        monsters: ['nagate'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 9 },
            { bonusType: 'combat', bonusStat: 'critChance', min: 1, max: 5 },
            { bonusType: 'defense', bonusStat: 'maxHp', min: 13, max: 88 }
        ]
    },
    // ─── Atelier du Tanukouï San (donjonTanukoi) ───
    {
        id:       'familiertanukoui_san',
        name:     'Tanukouï San Apprivoisé',
        image:    'images/monsters/Tanukouï_San.png',
        rarity:   'rare',
        monsters: ['tanukoui_san'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'critDamagePct', min: 3, max: 10 },
            { bonusType: 'defense', bonusStat: 'damageReductionPct', min: 1, max: 5 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 9 }
        ]
    },
    // ─── Clairière du Chêne Mou (donjonCheneMou) ───
    {
        id:       'familierchene_mou',
        name:     'Chêne Mou Apprivoisé',
        image:    'images/monsters/Chêne_Mou.png',
        rarity:   'rare',
        monsters: ['chene_mou'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.feu', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 9 },
            { bonusType: 'combat', bonusStat: 'atk', min: 9, max: 61 }
        ]
    },
    // ─── Excavation du Mansot Royal (donjonMansot) ───
    {
        id:       'familiermansot_royal',
        name:     'Mansot Royal Apprivoisé',
        image:    'images/monsters/Mansot_Royal.png',
        rarity:   'rare',
        monsters: ['mansot_royal'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 9 },
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 5, max: 25 },
            { bonusType: 'defense', bonusStat: 'res.eau', min: 1, max: 7 }
        ]
    },
    // ─── Laboratoire du Tynril (donjonTynril) ───
    {
        id:       'familiertynril_consterne',
        name:     'Tynril Consterné Apprivoisé',
        image:    'images/monsters/Tynril_Consterné.png',
        rarity:   'rare',
        monsters: ['tynril_consterne'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'spd', min: 4, max: 12 },
            { bonusType: 'defense', bonusStat: 'res.terre', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 9 }
        ]
    },
    {
        id:       'familiertynril_deconcerte',
        name:     'Tynril Déconcerté Apprivoisé',
        image:    'images/monsters/Tynril_Déconcerté.png',
        rarity:   'rare',
        monsters: ['tynril_deconcerte'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.air', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 9 },
            { bonusType: 'combat', bonusStat: 'critChance', min: 1, max: 7 }
        ]
    },
    {
        id:       'familiertynril_perfide',
        name:     'Tynril Perfide Apprivoisé',
        image:    'images/monsters/Tynril_Perfide.png',
        rarity:   'rare',
        monsters: ['tynril_perfide'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 9 },
            { bonusType: 'combat', bonusStat: 'critDamagePct', min: 3, max: 10 },
            { bonusType: 'defense', bonusStat: 'res.neutre', min: 1, max: 7 }
        ]
    },
    {
        id:       'familiertynril_ahuri',
        name:     'Tynril Ahuri Apprivoisé',
        image:    'images/monsters/Tynril_Ahuri.png',
        rarity:   'rare',
        monsters: ['tynril_ahuri'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'atk', min: 9, max: 61 },
            { bonusType: 'defense', bonusStat: 'maxHp', min: 14, max: 91 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 9 }
        ]
    },
    // ─── Dojo du Vent (donjonDojoVent) ───
    {
        id:       'familiershihan',
        name:     'Shihan Apprivoisé',
        image:    'images/monsters/Shihan.png',
        rarity:   'rare',
        monsters: ['shihan'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'damageReductionPct', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 9 },
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 5, max: 25 }
        ]
    },
    {
        id:       'familierhanshi',
        name:     'Hanshi Apprivoisé',
        image:    'images/monsters/Hanshi.png',
        rarity:   'rare',
        monsters: ['hanshi'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 9 },
            { bonusType: 'combat', bonusStat: 'spd', min: 4, max: 12 },
            { bonusType: 'defense', bonusStat: 'res.feu', min: 1, max: 7 }
        ]
    },
    // ─── Fabrique de foux d'artifice (donjonFouxArtifice) ───
    {
        id:       'familierfounoroshi',
        name:     'Founoroshi Apprivoisé',
        image:    'images/monsters/Founoroshi.png',
        rarity:   'rare',
        monsters: ['founoroshi'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'critChance', min: 1, max: 7 },
            { bonusType: 'defense', bonusStat: 'res.eau', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 9 }
        ]
    },
    // ─── Repaire de Sphincter Cell (donjonSphincter) ───
    {
        id:       'familiersphincter_cell',
        name:     'Sphincter Cell Apprivoisé',
        image:    'images/monsters/Sphincter_Cell.png',
        rarity:   'rare',
        monsters: ['sphincter_cell'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.terre', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 9 },
            { bonusType: 'combat', bonusStat: 'critDamagePct', min: 4, max: 12 }
        ]
    },
    // ─── Épave du Grolandais violent (donjonGrolandais) ───
    {
        id:       'familierben_le_ripate',
        name:     'Ben le Ripate Apprivoisé',
        image:    'images/monsters/Ben_le_Ripate.png',
        rarity:   'rare',
        monsters: ['ben_le_ripate'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 9 },
            { bonusType: 'combat', bonusStat: 'atk', min: 9, max: 62 },
            { bonusType: 'defense', bonusStat: 'res.air', min: 1, max: 7 }
        ]
    },
    // ─── Tertre du long sommeil (donjonTertreSommeil) ───
    {
        id:       'familierhell_mina',
        name:     'Hell Mina Apprivoisé',
        image:    'images/monsters/Hell_Mina.png',
        rarity:   'rare',
        monsters: ['hell_mina'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 5, max: 25 },
            { bonusType: 'defense', bonusStat: 'res.neutre', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 9 }
        ]
    },
    // ─── Hypogée de l'Obsidiantre (donjonObsidiantre) ───
    {
        id:       'familierobsidiantre',
        name:     'Obsidiantre Apprivoisé',
        image:    'images/monsters/Obsidiantre.png',
        rarity:   'rare',
        monsters: ['obsidiantre'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'maxHp', min: 14, max: 96 },
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 9 },
            { bonusType: 'combat', bonusStat: 'spd', min: 4, max: 13 }
        ]
    },
    // ─── Canopée du Kimbo (donjonKimbo) ───
    {
        id:       'familierkimbo',
        name:     'Kimbo Apprivoisé',
        image:    'images/monsters/Kimbo.png',
        rarity:   'rare',
        monsters: ['kimbo'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 9 },
            { bonusType: 'combat', bonusStat: 'critChance', min: 1, max: 7 },
            { bonusType: 'defense', bonusStat: 'damageReductionPct', min: 1, max: 7 }
        ]
    },
    // ─── Salle du Minotot (donjonMinotot) ───
    {
        id:       'familierminotot',
        name:     'Minotot Apprivoisé',
        image:    'images/monsters/Minotot.png',
        rarity:   'rare',
        monsters: ['minotot'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'critDamagePct', min: 4, max: 12 },
            { bonusType: 'defense', bonusStat: 'res.feu', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 9 }
        ]
    },
    // ─── Grotte de Kanigroula (donjonKanigroula) ───
    {
        id:       'familierkanigroula',
        name:     'Kanigroula Apprivoisé',
        image:    'images/monsters/Kanigroula.png',
        rarity:   'rare',
        monsters: ['kanigroula'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.eau', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 9 },
            { bonusType: 'combat', bonusStat: 'atk', min: 9, max: 64 }
        ]
    },
    // ─── Tombe du Shogun Tofugawa (donjonShogunTofugawa) ───
    {
        id:       'familiershogun_tofugawa',
        name:     'Shogun Tofugawa Apprivoisé',
        image:    'images/monsters/Shogun_Tofugawa.png',
        rarity:   'rare',
        monsters: ['shogun_tofugawa'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 9 },
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 5, max: 26 },
            { bonusType: 'defense', bonusStat: 'res.terre', min: 1, max: 7 }
        ]
    },
    // ─── Tanière Givrefoux (donjonGivrefoux) ───
    {
        id:       'familiertengu_givrefoux',
        name:     'Tengu Givrefoux Apprivoisé',
        image:    'images/monsters/Tengu_Givrefoux.png',
        rarity:   'rare',
        monsters: ['tengu_givrefoux'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'spd', min: 4, max: 13 },
            { bonusType: 'defense', bonusStat: 'res.air', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 10 }
        ]
    },
    // ─── Boyau du Père Ver (donjonPereVer) ───
    {
        id:       'familierpere_ver',
        name:     'Père Ver Apprivoisé',
        image:    'images/monsters/Père_Ver.png',
        rarity:   'rare',
        monsters: ['pere_ver'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.neutre', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'critChance', min: 1, max: 7 }
        ]
    },
    // ─── Demeure des Esprits (donjonDemeureEsprits) ───
    {
        id:       'familierkoumiho',
        name:     'Koumiho Apprivoisé',
        image:    'images/monsters/Koumiho.png',
        rarity:   'rare',
        monsters: ['koumiho'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'critDamagePct', min: 4, max: 12 },
            { bonusType: 'defense', bonusStat: 'maxHp', min: 14, max: 99 }
        ]
    },
    // ─── Poste de contrôle du Supervizœuf (donjonSupervizoeuf) ───
    {
        id:       'familiersuperviz_uf',
        name:     'Supervizœuf Apprivoisé',
        image:    'images/monsters/Supervizœuf.png',
        rarity:   'rare',
        monsters: ['superviz_uf'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'atk', min: 10, max: 65 },
            { bonusType: 'defense', bonusStat: 'damageReductionPct', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 }
        ]
    },
    // ─── Grotte du Bworker (donjonBworker) ───
    {
        id:       'familierbworker',
        name:     'Bworker Apprivoisé',
        image:    'images/monsters/Bworker.png',
        rarity:   'legendaire',
        monsters: ['bworker'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.feu', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 5, max: 27 },
            { bonusType: 'defense', bonusStat: 'res.eau', min: 1, max: 7 }
        ]
    },
    // ─── Temple du Grand Ougah (donjonOugah) ───
    {
        id:       'familierougah',
        name:     'Ougah Apprivoisé',
        image:    'images/monsters/Ougah.png',
        rarity:   'legendaire',
        monsters: ['ougah'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'spd', min: 4, max: 13 },
            { bonusType: 'defense', bonusStat: 'res.terre', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 10 }
        ]
    },
    // ─── Cavernes du Kolosso (donjonKolosso) ───
    {
        id:       'familierkolosso',
        name:     'Kolosso Apprivoisé',
        image:    'images/monsters/Kolosso.png',
        rarity:   'legendaire',
        monsters: ['kolosso'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'critChance', min: 1, max: 7 },
            { bonusType: 'defense', bonusStat: 'res.air', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'critDamagePct', min: 4, max: 13 }
        ]
    },
    {
        id:       'familierprofesseur_xa',
        name:     'Professeur Xa Apprivoisé',
        image:    'images/monsters/Professeur_Xa.png',
        rarity:   'legendaire',
        monsters: ['professeur_xa'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.neutre', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'atk', min: 10, max: 68 },
            { bonusType: 'defense', bonusStat: 'maxHp', min: 16, max: 101 }
        ]
    },
    // ─── Donjon de la mine de Sakaï (donjonSakai) ───
    {
        id:       'familiergrolloum',
        name:     'Grolloum Apprivoisé',
        image:    'images/monsters/Grolloum.png',
        rarity:   'legendaire',
        monsters: ['grolloum'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 5, max: 27 },
            { bonusType: 'defense', bonusStat: 'damageReductionPct', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 10 }
        ]
    },
    // ─── Antre du Korriandre (donjonKorriandre) ───
    {
        id:       'familierkorriandre',
        name:     'Korriandre Apprivoisé',
        image:    'images/monsters/Korriandre.png',
        rarity:   'legendaire',
        monsters: ['korriandre'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'spd', min: 4, max: 13 },
            { bonusType: 'defense', bonusStat: 'res.feu', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'critChance', min: 1, max: 7 }
        ]
    },
    // ─── Antichambre des Gloursons (donjonGloursons) ───
    {
        id:       'familierglourseleste',
        name:     'Glourséleste Apprivoisé',
        image:    'images/monsters/Glourséleste.png',
        rarity:   'legendaire',
        monsters: ['glourseleste'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.eau', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'critDamagePct', min: 4, max: 13 },
            { bonusType: 'defense', bonusStat: 'res.terre', min: 1, max: 7 }
        ]
    },
    // ─── Pyramide d'Ombre (donjonOmbre) ───
    {
        id:       'familierombre',
        name:     'Ombre Apprivoisé',
        image:    'images/monsters/Ombre.png',
        rarity:   'legendaire',
        monsters: ['ombre'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'atk', min: 10, max: 69 },
            { bonusType: 'defense', bonusStat: 'res.air', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 10 }
        ]
    },
    // ─── Camp du Comte Razof (donjonRazof) ───
    {
        id:       'familiercomte_razof',
        name:     'Comte Razof Apprivoisé',
        image:    'images/monsters/Comte_Razof.png',
        rarity:   'legendaire',
        monsters: ['comte_razof'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 5, max: 27 },
            { bonusType: 'defense', bonusStat: 'res.neutre', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'spd', min: 4, max: 13 }
        ]
    },
    // ─── Bastion des Marteaux-Aigris (donjonBastionMarteaux) ───
    {
        id:       'familierbarberyl_clochecuivre',
        name:     'Barbéryl Clochecuivre Apprivoisé',
        image:    'images/monsters/Barbéryl_Clochecuivre.png',
        rarity:   'legendaire',
        monsters: ['barberyl_clochecuivre'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'maxHp', min: 16, max: 104 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'critChance', min: 1, max: 7 },
            { bonusType: 'defense', bonusStat: 'damageReductionPct', min: 1, max: 7 }
        ]
    },
    // ─── Transporteur de Sylargh (donjonSylargh) ───
    {
        id:       'familiersylargh',
        name:     'Sylargh Apprivoisé',
        image:    'images/monsters/Sylargh.png',
        rarity:   'legendaire',
        monsters: ['sylargh'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'critDamagePct', min: 4, max: 13 },
            { bonusType: 'defense', bonusStat: 'res.feu', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 10 }
        ]
    },
    // ─── Salons privés de Klime (donjonKlime) ───
    {
        id:       'familierklime',
        name:     'Klime Apprivoisé',
        image:    'images/monsters/Klime.png',
        rarity:   'legendaire',
        monsters: ['klime'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'atk', min: 10, max: 69 },
            { bonusType: 'defense', bonusStat: 'res.eau', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 5, max: 27 }
        ]
    },
    // ─── Forgefroide de Missiz Frizz (donjonMissizFrizz) ───
    {
        id:       'familiermissiz_frizz',
        name:     'Missiz Frizz Apprivoisé',
        image:    'images/monsters/Missiz_Frizz.png',
        rarity:   'legendaire',
        monsters: ['missiz_frizz'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.terre', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'spd', min: 4, max: 13 },
            { bonusType: 'defense', bonusStat: 'res.air', min: 1, max: 7 }
        ]
    },
    // ─── Laboratoire de Nileza (donjonNileza) ───
    {
        id:       'familiernileza',
        name:     'Nileza Apprivoisé',
        image:    'images/monsters/Nileza.png',
        rarity:   'legendaire',
        monsters: ['nileza'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'critChance', min: 1, max: 7 },
            { bonusType: 'defense', bonusStat: 'res.neutre', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 10 }
        ]
    },
    // ─── Donjon du Comte Harebourg (donjonHarebourg) ───
    {
        id:       'familiercomte_harebourg',
        name:     'Comte Harebourg Apprivoisé',
        image:    'images/monsters/Comte_Harebourg.png',
        rarity:   'legendaire',
        monsters: ['comte_harebourg'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'critDamagePct', min: 4, max: 13 },
            { bonusType: 'defense', bonusStat: 'maxHp', min: 16, max: 105 },
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'atk', min: 10, max: 69 }
        ]
    },
    // ─── Aquadôme de Merkator (donjonMerkator) ───
    {
        id:       'familiermerkator',
        name:     'Merkator Apprivoisé',
        image:    'images/monsters/Merkator.png',
        rarity:   'legendaire',
        monsters: ['merkator'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'damageReductionPct', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 5, max: 27 },
            { bonusType: 'defense', bonusStat: 'res.feu', min: 1, max: 7 }
        ]
    },
    // ─── Ventre de la Baleine (donjonBaleine) ───
    {
        id:       'familierprotozorreur',
        name:     'Protozorreur Apprivoisé',
        image:    'images/monsters/Protozorreur.png',
        rarity:   'legendaire',
        monsters: ['protozorreur'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'spd', min: 4, max: 13 },
            { bonusType: 'defense', bonusStat: 'res.eau', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 10 }
        ]
    },
    // ─── Vaisseau du Capitaine Meno (donjonMeno) ───
    {
        id:       'familiercapitaine_meno',
        name:     'Capitaine Meno Apprivoisé',
        image:    'images/monsters/Capitaine_Meno.png',
        rarity:   'legendaire',
        monsters: ['capitaine_meno'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'critChance', min: 1, max: 7 },
            { bonusType: 'defense', bonusStat: 'res.terre', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'critDamagePct', min: 4, max: 13 }
        ]
    },
    // ─── Temple de Koutoulou (donjonKoutoulou) ───
    {
        id:       'familierlarve_de_koutoulou',
        name:     'Larve de Koutoulou Apprivoisé',
        image:    'images/monsters/Larve_de_Koutoulou.png',
        rarity:   'legendaire',
        monsters: ['larve_de_koutoulou'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.air', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'atk', min: 10, max: 69 },
            { bonusType: 'defense', bonusStat: 'res.neutre', min: 1, max: 7 }
        ]
    },
    // ─── Palais de Dantinéa (donjonDantinea) ───
    {
        id:       'familierdantinea',
        name:     'Dantinéa Apprivoisé',
        image:    'images/monsters/Dantinéa.png',
        rarity:   'legendaire',
        monsters: ['dantinea'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 5, max: 27 },
            { bonusType: 'defense', bonusStat: 'maxHp', min: 16, max: 105 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 10 }
        ]
    },
    // ─── Manoir des Katrepat (donjonKatrepat) ───
    {
        id:       'familieranerice_la_shushess',
        name:     'Anerice la Shushess Apprivoisé',
        image:    'images/monsters/Anerice_la_Shushess.png',
        rarity:   'legendaire',
        monsters: ['anerice_la_shushess'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'spd', min: 4, max: 13 },
            { bonusType: 'defense', bonusStat: 'damageReductionPct', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'critChance', min: 1, max: 7 }
        ]
    },
    // ─── Belvédère d'Ilyzaelle (donjonIlyzaelle) ───
    {
        id:       'familierilyzaelle',
        name:     'Ilyzaelle Apprivoisé',
        image:    'images/monsters/Ilyzaelle.png',
        rarity:   'legendaire',
        monsters: ['ilyzaelle'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.feu', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'critDamagePct', min: 4, max: 13 },
            { bonusType: 'defense', bonusStat: 'res.eau', min: 1, max: 7 }
        ]
    },
    // ─── Tour de Bethel (donjonBethel) ───
    {
        id:       'familierbethel_akarna',
        name:     'Bethel Akarna Apprivoisé',
        image:    'images/monsters/Bethel_Akarna.png',
        rarity:   'legendaire',
        monsters: ['bethel_akarna'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'atk', min: 10, max: 69 },
            { bonusType: 'defense', bonusStat: 'res.terre', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 10 }
        ]
    },
    // ─── Tour de Solar (donjonSolar) ───
    {
        id:       'familiersolar',
        name:     'Solar Apprivoisé',
        image:    'images/monsters/Solar.png',
        rarity:   'legendaire',
        monsters: ['solar'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 5, max: 27 },
            { bonusType: 'defense', bonusStat: 'res.air', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'spd', min: 4, max: 13 }
        ]
    },
    // ─── Brasserie du roi Dazak (donjonDazak) ───
    {
        id:       'familierdazak_martegel',
        name:     'Dazak Martegel Apprivoisé',
        image:    'images/monsters/Dazak_Martegel.png',
        rarity:   'legendaire',
        monsters: ['dazak_martegel'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.neutre', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'critChance', min: 1, max: 7 },
            { bonusType: 'defense', bonusStat: 'maxHp', min: 16, max: 105 }
        ]
    },
    // ─── Sanctuaire de Torkélonia (donjonTorkelonia) ───
    {
        id:       'familiertorkelonia',
        name:     'Torkélonia Apprivoisé',
        image:    'images/monsters/Torkélonia.png',
        rarity:   'legendaire',
        monsters: ['torkelonia'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'critDamagePct', min: 4, max: 13 },
            { bonusType: 'defense', bonusStat: 'damageReductionPct', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 10 }
        ]
    },
    // ─── Arbre de Mort (donjonArbreMort) ───
    {
        id:       'familiercorruption',
        name:     'Corruption Apprivoisé',
        image:    'images/monsters/Corruption.png',
        rarity:   'legendaire',
        monsters: ['corruption'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'atk', min: 10, max: 69 },
            { bonusType: 'defense', bonusStat: 'res.feu', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 5, max: 27 }
        ]
    },
    // ─── Fers de la Tyrannie (donjonTyrannie) ───
    {
        id:       'familierservitude',
        name:     'Servitude Apprivoisé',
        image:    'images/monsters/Servitude.png',
        rarity:   'legendaire',
        monsters: ['servitude'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.eau', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'spd', min: 4, max: 13 },
            { bonusType: 'defense', bonusStat: 'res.terre', min: 1, max: 7 }
        ]
    },
    // ─── Sentence de la Balance (donjonBalance) ───
    {
        id:       'familiermisere',
        name:     'Misère Apprivoisé',
        image:    'images/monsters/Misère.png',
        rarity:   'legendaire',
        monsters: ['misere'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'critChance', min: 1, max: 7 },
            { bonusType: 'defense', bonusStat: 'res.air', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 10 }
        ]
    },
    // ─── Trône de Sang (donjonTroneSang) ───
    {
        id:       'familierguerre',
        name:     'Guerre Apprivoisé',
        image:    'images/monsters/Guerre.png',
        rarity:   'legendaire',
        monsters: ['guerre'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'critDamagePct', min: 4, max: 13 },
            { bonusType: 'defense', bonusStat: 'res.neutre', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'atk', min: 10, max: 69 }
        ]
    },
    // ─── Chambre de Tal Kasha (donjonTalKasha) ───
    {
        id:       'familiertal_kasha',
        name:     'Tal Kasha Apprivoisé',
        image:    'images/monsters/Tal_Kasha.png',
        rarity:   'legendaire',
        monsters: ['tal_kasha'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'maxHp', min: 16, max: 105 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 5, max: 27 },
            { bonusType: 'defense', bonusStat: 'damageReductionPct', min: 1, max: 7 }
        ]
    },
    // ─── Rituel de Kabahal (donjonKabahal) ───
    {
        id:       'familierkabahal',
        name:     'Kabahal Apprivoisé',
        image:    'images/monsters/Kabahal.png',
        rarity:   'legendaire',
        monsters: ['kabahal'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'spd', min: 4, max: 13 },
            { bonusType: 'defense', bonusStat: 'res.feu', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 10 }
        ]
    },
    // ─── Bataille de l'Aurore Pourpre (donjonAurorePourpre) ───
    {
        id:       'familierl_eternel_conflit',
        name:     'L\'Éternel Conflit Apprivoisé',
        image:    'images/monsters/L_Éternel_Conflit.png',
        rarity:   'legendaire',
        monsters: ['l_eternel_conflit'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'critChance', min: 1, max: 7 },
            { bonusType: 'defense', bonusStat: 'res.eau', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'critDamagePct', min: 4, max: 13 }
        ]
    },
    // ─── Chambre des maléfices (donjonMalefices) ───
    {
        id:       'familierbelladone',
        name:     'Belladone Apprivoisé',
        image:    'images/monsters/Belladone.png',
        rarity:   'legendaire',
        monsters: ['belladone'],
        bonuses: [
            { bonusType: 'defense', bonusStat: 'res.terre', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'atk', min: 10, max: 69 },
            { bonusType: 'defense', bonusStat: 'res.air', min: 1, max: 7 }
        ]
    },
    // ─── Breuil du Vénérable (donjonBreuil) ───
    {
        id:       'familiervenerable_endormi',
        name:     'Vénérable Endormi Apprivoisé',
        image:    'images/monsters/Vénérable_Endormi.png',
        rarity:   'legendaire',
        monsters: ['venerable_endormi'],
        bonuses: [
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'flatDamage', min: 5, max: 27 },
            { bonusType: 'defense', bonusStat: 'res.neutre', min: 1, max: 7 },
            { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 10 }
        ]
    },
    // ─── Autel de la Déchireuse (donjonDechireuse) ───
    {
        id:       'familierdechireuse',
        name:     'Déchireuse Apprivoisé',
        image:    'images/monsters/Déchireuse.png',
        rarity:   'legendaire',
        monsters: ['dechireuse'],
        bonuses: [
            { bonusType: 'combat', bonusStat: 'spd', min: 4, max: 13 },
            { bonusType: 'defense', bonusStat: 'maxHp', min: 16, max: 105 },
            { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
            { bonusType: 'combat', bonusStat: 'critChance', min: 1, max: 7 }
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
