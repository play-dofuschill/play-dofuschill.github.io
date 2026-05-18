// monsterDictionary.js — Monstres DofusChill
//
/*
monsters. = {
    id: '',
    name: '',
    image: 'img/monstres/sprites/.png',
    rarity: 'commun','peu_commun','rare','legendaire',
    tier: 'boss','elite', 'normal'
    bst: {
        hp: 1, atk: 1, spd: 100,
        res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
    },
    moves: ['', ''],
    familiar: [
        {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
        {bonusType: 'défense', bonusStat: 'xpGain', min: 1, max: 10 },
        {bonusType: 'défense', bonusStat: 'maxHp', min: 5, max: 50 }],
    role: ['combat','farming','défense']
}
stats: [
        { bonusStat: 'atk', min: 1, max: 50 }, valeur brute
        { bonusStat: 'spd', min: 1, max: 50 }, valeur brute
        { bonusStat: 'flatDamage', min: 1, max: 50 }, valeur brute
        { bonusStat: 'finalDamagePct', min: 1, max: 50 }, valeur en %
        { bonusStat: 'spellDamagePct', min: 1, max: 50 }, valeur en %
        { bonusStat: 'damageReductionPct', min: 1, max: 50 }, valeur en %
        { bonusStat: 'critChance', min: 1, max: 50 }, valeur brute
        { bonusStat: 'critDamagePct', min: 1, max: 50 }, valeur en %
        { bonusStat: 'maxHp', min: 1, max: 50 }, valeur brutes
        { bonusStat: 'fireResPct', min: 1, max: 50 }, valeur en %
        { bonusStat: 'waterResPct', min: 1, max: 50 }, valeur en %
        { bonusStat: 'earthResPct', min: 1, max: 50 }, valeur en %
        { bonusStat: 'airResPct', min: 1, max: 50 }, valeur en %
        { bonusStat: 'neutralResPct', min: 1, max: 50 }, valeur en %
        { bonusStat: 'droprate', min: 1, max: 50 }, valeur en %
        { bonusStat: 'xpGain', min: 1, max: 50 }, valeur en %
    ],
*/

// ═══════════════════════════════════════════════════════
// #region EXEMPLE



// ═══════════════════════════════════════════════════════
// DONJON EXEMPLE
// ═══════════════════════════════════════════════════════
// monsters. = {
//     id: '',
//     name: '',
//     image: 'img/monstres/sprites/.png',
//     rarity: 'commun','peu_commun','rare','legendaire',
//     tier: 'boss','elite', 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'défense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'défense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','défense']
// }
// #endregion


// possibilité d'ajouter la fonction de trigger pour déclancher l'effet d'un familier

// trigger: 'onKill',
// effects: [
//     { type: 'stat', stat: 'atk', value: 1 }
// ]

const monsters = {}

// ═══════════════════════════════════════════════════════
// #region INCARNAM — Zone niveau 1–20
monsters.chaferDebutant = {
    id: 'chaferDebutant',
    name: 'Chafer Débutant',
    image: 'img/monstres/sprites/chaferDebutant.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 44, atk: 40, spd: 100,
        res:{neutre: 14, terre: 0, feu: 0, eau: 0, air: 0 }
    },
    moves: ['petit_coup_du_Chafer'],
    familiar: { bonusType: 'farming', bonusStat: 'droprate', min: 1, max: 10 },
    role: ['farming']
}

monsters.chaferEclaireur = {
    id: 'chaferEclaireur',
    name: 'Chafer Éclaireur',
    image: 'img/monstres/sprites/chaferEclaireur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 44, atk: 40, spd: 100,
        res:{neutre: 0, terre: 14, feu: 0, eau: 0, air: 0 }
    },
    moves: ['fleche_de_feu'],
    familiar: { bonusType: 'farming', bonusStat: 'spd', min: 1, max: 10 },
    role: ['farming']
}

monsters.chaferFurtif = {
    id: 'chaferFurtif',
    name: 'Chafer Furtif',
    image: 'img/monstres/sprites/chaferFurtif.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 44, atk: 40, spd: 100,
        res:{neutre: 0, terre: 0, feu: 0, eau: 0, air: 14 }
    },
    moves: ['petit_coup_du_Chafer'],
    familiar: { bonusType: 'combat', bonusStat: 'atk', min: 1, max: 30 },
    role: ['combat']
}

monsters.chaferPiquier = {
    id: 'chaferPiquier',
    name: 'Chafer Piquier',
    image: 'img/monstres/sprites/chaferPiquier.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 60, atk: 40, spd: 100,
        res:{neutre: 0, terre: 0, feu: 0, eau: 14, air: 0 }
    },
    moves: ['empalement'],
    familiar: { bonusType: 'defense', bonusStat: 'maxHp', min: 1, max: 20 },
    role: ['défense']
}

monsters.sergentChafer = {
    id: 'sergentChafer',
    name: 'Sergent Chafer',
    image: 'img/monstres/sprites/sergentChafer.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 60, atk: 40, spd: 100,
        res:{neutre: 0, terre: 0, feu: 14, eau: 0, air: 0 }
    },
    moves: ['petit_coup_du_Chafer'],
    familiar: { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 20 },
    role: ['farming']
}

// ═══════════════════════════════════════════════════════
// DONJON KARDORIM
// ═══════════════════════════════════════════════════════
monsters.kardorib = {
    id: 'kardorib',
    name: 'Kardorib',
    image: 'img/monstres/sprites/kardorib.png',
    rarity: 'peu_commun',
    tier: 'elite',
    bst: {
        hp: 60, atk: 40, spd: 100,
        res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
    },
    moves: ['embrochement'],
    ownerId: 'kardorim'
}
monsters.kardorim = {
    id: 'kardorim',
    name: 'Kardorim',
    image: 'img/monstres/sprites/kardorim.png',
    rarity: 'peu_commun',
    tier: 'boss',
    bst: {
        hp: 350, atk: 70, spd: 100,
        res: {neutre: 10, terre: -15, feu: 20, eau: -10, air: 5 }
    },
    moves: ['cassecrane', 'appeldeKardorib'],
    familiar: { bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
    role: ['combat']
}
// #endregion

// ═══════════════════════════════════════════════════════
// #region CHAMPS ASTRUB — Zone niveau 10–30
monsters.pissenliDiabolique = {
    id: 'pissenliDiabolique',
    name: 'Pissenli Diabolique',
    image: 'img/monstres/sprites/pissenliDiabolique.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 90, atk: 60, spd: 100,
        res:{neutre: -10, terre: 20, feu: -10, eau: 0, air: 15 }
    },
    moves: ['zizou','herbeSauvage'],
    familiar: { bonusType: 'defense', bonusStat: 'maxHp', min: 1, max: 30 },
    role: ['defense']
}
monsters.epouvanteur = {
    id: 'epouvanteur',
    name: 'Epouvanteur',
    image: 'img/monstres/sprites/epouvanteur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 90, atk: 60, spd: 100,
        res:{neutre: 5, terre: 0, feu: -10, eau: 15, air: 10 }
    },
    moves: ['fuyezPauvresFous','desherbant'],
    familiar: { bonusType: 'farming', bonusStat: 'droprate', min: 1, max: 10 },
    role: ['farming']
}
monsters.gardienneChampetre = {
    id: 'gardienneChampetre',
    name: 'Gardienne Champêtre',
    image: 'img/monstres/sprites/gardienneChampetre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 90, atk: 60, spd: 100,
        res:{neutre: -10, terre: -10, feu: -15, eau: 20, air: 25 }
    },
    moves: ['protectiondesChamps','engrais'],
    familiar: { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 20 },
    role: ['farming']
}
monsters.roseDemoniaque = {
    id: 'roseDemoniaque',
    name: 'Rose Démoniaque',
    image: 'img/monstres/sprites/roseDemoniaque.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 90, atk: 60, spd: 100,
        res:{neutre: 0, terre: -10, feu: 35, eau: -10, air: 10 }
    },
    moves: ['roseEpineuse','petalesEmpoisonnes'],
    familiar: { bonusType: 'farming', bonusStat: 'spd', min: 1, max: 10 },
    role: ['farming']
}
monsters.tournesolSauvage = {
    id: 'tournesolSauvage',
    name: 'Tournesol Sauvage',
    image: 'img/monstres/sprites/tournesolSauvage.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 100, atk: 60, spd: 100,
        res:{neutre: 15, terre: 10, feu: -10, eau: 15, air: -15 }
    },
    moves: ['poisonSauvage','racinePivotante'],
    familiar: { bonusType: 'combat', bonusStat: 'atk', min: 1, max: 40 },
    role: ['combat']
}

// ═══════════════════════════════════════════════════════
// DONJON TOURNESOL
// ═══════════════════════════════════════════════════════
monsters.tournesolAffame = {
    id: 'tournesolAffame',
    name: 'Tournesol Affamé',
    image: 'img/monstres/sprites/tournesolAffame.png',
    rarity: 'peu_commun',
    tier: 'boss',
    bst: {
        hp: 810, atk: 100, spd: 100,
        res: {neutre: 25, terre: 25, feu: 25, eau: -10, air: -15 }
    },
    moves: ['goinfrage','soinFeuillu','appeldesChamps'],
    familiar: [
        { bonusType: 'combat', bonusStat: 'atk', min: 1, max: 40 },
        {bonusType: 'combat', bonusStat: 'flatDamage', min: 1, max: 10 }],
    role: ['combat']
}
// #endregion

// ═══════════════════════════════════════════════════════
// #region PLAGE ASTRUB — Zone niveau 10–30
monsters.pichonBlanc = {
    id: 'pichonBlanc',
    name: 'Scarafeuille Blanc',
    image: 'img/monstres/sprites/pichonBlanc.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 90, atk: 60, spd: 100,
        res: {neutre: 18, terre: -1, feu: -1, eau: 18, air: 66 }
    },
    moves: ['bouffeedAir', 'onde_Enrageante'],
    familiar: {bonusType: 'defense', bonusStat: 'airResPct', min: 1, max: 15 },
    role: ['defense']
}
monsters.pichonVert = {
    id: 'pichonVert',
    name: 'Scarafeuille Vert',
    image: 'img/monstres/sprites/pichonVert.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 90, atk: 60, spd: 100,
        res: {neutre: 18, terre: 66, feu: -1, eau: 18, air: -1 }
    },
    moves: ['reflux', 'onde_Enrageante'],
    familiar: {bonusType: 'defense', bonusStat: 'earthResPct', min: 1, max: 15 },
    role: ['defense']
}
monsters.pichonBleu = {
    id: 'pichonBleu',
    name: 'Scarafeuille Bleu',
    image: 'img/monstres/sprites/pichonBleu.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 90, atk: 60, spd: 100,
        res: {neutre: 18, terre: -1, feu: -1, eau: 66, air: 18 }
    },
    moves: ['vaguelette', 'resistivite'],
    familiar: {bonusType: 'defense', bonusStat: 'waterResPct', min: 1, max: 15 },
    role: ['defense']
}
monsters.pichonOrange = {
    id: 'pichonOrange',
    name: 'Pichon Orange',
    image: 'img/monstres/sprites/pichonOrange.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 90, atk: 60, spd: 100,
        res: {neutre: 18, terre: -1, feu: 66, eau: 18, air: -1 }
    },
    moves: ['Sable_Brulant', 'sel_Marin'],
    familiar: {bonusType: 'defense', bonusStat: 'fireResPct', min: 1, max: 15 },
    role: ['defense']
}
monsters.pichonKloune = {
    id: 'pichonKloune',
    name: 'Pichon Kloune',
    image: 'img/monstres/sprites/pichonKloune.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 100, atk: 60, spd: 100,
        res: {neutre: 20, terre: 20, feu: 20, eau: -1, air: 20 }
    },
    moves: ['blag', 'klounerie'],
    familiar: {bonusType: 'defense', bonusStat: 'neutralResPct', min: 1, max: 15 },
    role: ['defense']
}


// ═══════════════════════════════════════════════════════
// DONJON MOUSSE
// ═══════════════════════════════════════════════════════
monsters.mobLeponge = {
    id: 'mobLeponge',
    name: "Mob l'éponge",
    image: 'img/monstres/sprites/mobLeponge.png',
    rarity: 'peu_commun',
    tier: 'boss',
    bst: {
        hp: 420, atk: 80, spd: 102,
        res: {neutre: 14, terre: 14, feu: 14, eau: 14, air: 14}
    },
    moves: ['degraissage','rincage','Regeneration_Spontanee'],
    familiar: [
        {bonusType: 'defense', bonusStat: 'neutralResPct', min: 1, max: 7},
        {bonusType: 'defense', bonusStat: 'earthResPct', min: 1, max: 7},
        {bonusType: 'defense', bonusStat: 'fireResPct', min: 1, max: 7},
        {bonusType: 'defense', bonusStat: 'waterResPct', min: 1, max: 7},
        {bonusType: 'defense', bonusStat: 'airResPct', min: 1, max: 7}],
    role: ['défense']
}
// #endregion

// ═══════════════════════════════════════════════════════
// #region TAINELA — Zone niveau 20–40

monsters.bouftou = {
    id: 'bouftou',
    name: 'Bouftou',
    image: 'img/monstres/sprites/bouftou.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 170, atk: 80, spd: 100,
        res: {neutre: 5, terre: 15, feu: -10, eau: -5, air: 20 }
    },
    moves: ['morsure_du_bouftou'],
    familiar: { bonusType: 'défense', bonusStat: 'maxHp', min: 1, max: 35 },
    role: ['défense']
}

monsters.bouftonBlanc = {
    id: 'bouftonBlanc',
    name: 'Boufton Blanc',
    image: 'img/monstres/sprites/bouftonBlanc.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 150, atk: 80, spd: 100,
        res: {neutre: 5, terre: 20, feu: -5, eau: -10, air: 15 }
    },
    moves: ['machouillage'],
    familiar: { bonusType: 'farming', bonusStat: 'xpGain', min: 3, max: 10 },
    role: ['farming']
}

monsters.bouftonNoir = {
    id: 'bouftonNoir',
    name: 'Boufton Noir',
    image: 'img/monstres/sprites/bouftonNoir.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 150, atk: 80, spd: 100,
        res: {neutre: 5, terre: -10, feu: 15, eau: 20, air: -5 }
    },
    moves: ['mordillement'],
    familiar: { bonusType: 'farming', bonusStat: 'xpGain', min: 3, max: 10 },
    role: ['farming']
}

monsters.bouftouNoir = {
    id: 'bouftouNoir',
    name: 'Bouftou Noir',
    image: 'img/monstres/sprites/bouftouNoir.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 180, atk: 80, spd: 100,
        res: {neutre: 5, terre: -5, feu: 20, eau: 15, air: -10 }
    },
    moves: ['morsure_obscure', 'halaine_du_bouftou'],
    familiar: { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 15 },
    role: ['farming']
}

monsters.bouftouChefDeGuerre = {
    id: 'bouftouChefDeGuerre',
    name: 'Chef de Guerre Bouftou',
    image: 'img/monstres/sprites/bouftouChefDeGuerre.png',
    rarity: 'peu_commun',
    tier: 'elite',
    bst: {
        hp: 200, atk: 90, spd: 100,
        res: {neutre: 15, terre: 0, feu: 0, eau: -5, air: 15 }
    },
    moves: ['fureur_du_bouftou', 'morsure_de_guerre'],
    familiar: { bonusType: 'combat', bonusStat: 'flatDamage', min: 1, max: 15 },
    role: ['combat']
}

// ═══════════════════════════════════════════════════════
// DONJON BOUFTOU
// ═══════════════════════════════════════════════════════
monsters.bouftouRoyal = {
    id: 'bouftouRoyal',
    name: 'Bouftou Royal',
    image: 'img/monstres/sprites/bouftouRoyal.png',
    rarity: 'peu_commun',
    tier: 'boss',
    bst: {
        hp: 1300, atk: 150, spd: 100,
        res: {neutre: 35, terre: 20, feu: 20, eau: 25, air: 5 }
    },
    moves: ['morsure_royale', 'guerison_bouftou', 'morsure_de_guerre', 'cuirasse_laineuse'],
    familiar: [{ bonusType: 'défense', bonusStat: 'maxHp', min: 5, max: 50 },
               { bonusType: 'farming', bonusStat: 'droprate', min: 1, max: 10 }],
    role: ['farming','défense']
}
// #endregion

// ═══════════════════════════════════════════════════════
// #region SCARAFEUILLE — Zone niveau 30–50
monsters.scarafeuilleBlanc = {
    id: 'scarafeuilleBlanc',
    name: 'Scarafeuille Blanc',
    image: 'img/monstres/sprites/scarafeuilleBlanc.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 310, atk: 90, spd: 100,
        res: {neutre: 25, terre: -50, feu: 25, eau: 25, air: 100 }
    },
    moves: ['', ''],
    familiar: {bonusType: 'defense', bonusStat: 'airResPct', min: 1, max: 15 },
    role: ['defense']
}
monsters.scarafeuilleVert = {
    id: 'scarafeuilleVert',
    name: 'Scarafeuille Vert',
    image: 'img/monstres/sprites/scarafeuilleVert.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 310, atk: 90, spd: 100,
        res: {neutre: 25, terre: 100, feu: 25, eau: 25, air: -50 }
    },
    moves: ['', ''],
    familiar: {bonusType: 'defense', bonusStat: 'earthResPct', min: 1, max: 15 },
    role: ['defense']
}
monsters.scarafeuilleBleu = {
    id: 'scarafeuilleBleu',
    name: 'Scarafeuille Bleu',
    image: 'img/monstres/sprites/scarafeuilleBleu.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 310, atk: 90, spd: 100,
        res: {neutre: 25, terre: 25, feu: -50, eau: 100, air: 25 }
    },
    moves: ['', ''],
    familiar: {bonusType: 'defense', bonusStat: 'waterResPct', min: 1, max: 15 },
    role: ['defense']
}
monsters.scarafeuilleRouge = {
    id: 'scarafeuilleRouge',
    name: 'Scarafeuille Rouge',
    image: 'img/monstres/sprites/scarafeuilleRouge.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 310, atk: 90, spd: 100,
        res: {neutre: 25, terre: 25, feu: 100, eau: -50, air: 25 }
    },
    moves: ['', ''],
    familiar: {bonusType: 'defense', bonusStat: 'fireResPct', min: 1, max: 15 },
    role: ['defense']
}
monsters.scarafeuilleNoir = {
    id: 'scarafeuilleNoir',
    name: 'Scarafeuille Noir',
    image: 'img/monstres/sprites/scarafeuilleNoir.png',
    rarity: 'peu_commun',
    tier: 'elite',
    bst: {
        hp: 350, atk: 100, spd: 100,
        res: {neutre: 100, terre: 25, feu: 25, eau: 25, air: 25 }
    },
    moves: ['', ''],
    familiar: {bonusType: 'defense', bonusStat: 'neutralResPct', min: 1, max: 15 },
    role: ['defense']
}

// ═══════════════════════════════════════════════════════
// DONJON SCARAFEUILLE
// ═══════════════════════════════════════════════════════
monsters.scarafeuilleImmature = {
    id: 'scarafeuilleImmature',
    name: 'Scarafeuille Immature',
    image: 'img/monstres/sprites/scarafeuilleImmature.png',
    rarity: 'commun',
    tier: 'elite',
    bst: {
        hp: 250, atk: 80, spd: 100,
        res: {neutre: -10, terre: -10, feu: -10, eau: -10, air: -10}
    },
    moves: [''],
    ownerId: 'scrarabossDoree'
}
monsters.scrarabossDoree = {
    id: 'scrarabossDoree',
    name: 'Scraraboss Doree',
    image: 'img/monstres/sprites/scrarabossDoree.png',
    rarity: 'rare',
    tier: 'boss',
    bst: {
        hp: 2400, atk: 280, spd: 105,
        res: {neutre: 25, terre: 25, feu: 25, eau: 25, air: 25}
    },
    moves: ['', ''],
    familiar: [
        {bonusType: 'defense', bonusStat: 'neutralResPct', min: 1, max: 7},
        {bonusType: 'defense', bonusStat: 'earthResPct', min: 1, max: 7},
        {bonusType: 'defense', bonusStat: 'fireResPct', min: 1, max: 7},
        {bonusType: 'defense', bonusStat: 'waterResPct', min: 1, max: 7},
        {bonusType: 'defense', bonusStat: 'airResPct', min: 1, max: 7}],
    role: ['défense']
}
// #endregion

// ═══════════════════════════════════════════════════════
// #region KWAKWA — Zone niveau 40–60
monsters.kwakereFlamme = {
    id: 'kwakereFlamme',
    name: 'Kwakere Flamme',
    image: 'img/monstres/sprites/kwakereFlamme.png',
    rarity: 'peu_commun',
    tier: 'normal',
    bst: {
        hp: 440, atk: 140, spd: 105,
        res: {neutre: 100, terre: 25, feu: 100, eau: -25, air: 25 }
    },
    moves: ['', ''],
    familiar: {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 65 },
    role: ['combat']
}
monsters.kwakereGlace = {
    id: 'kwakereGlace',
    name: 'Kwakere Glace',
    image: 'img/monstres/sprites/kwakereGlace.png',
    rarity: 'peu_commun',
    tier: 'normal',
    bst: {
        hp: 440, atk: 140, spd: 105,
        res: {neutre: 100, terre: 25, feu: -25, eau: 100, air: 25 }
    },
    moves: ['', ''],
    familiar: {bonusType: 'combat', bonusStat: 'flatDamage', min: 1, max: 20 },
    role: ['combat']
}
monsters.kwakereTerre = {
    id: 'kwakereTerre',
    name: 'Kwakere Terre',
    image: 'img/monstres/sprites/kwakereTerre.png',
    rarity: 'peu_commun',
    tier: 'normal',
    bst: {
        hp: 440, atk: 140, spd: 105,
        res: {neutre: 100, terre: 100, feu: 25, eau: 25, air: -25 }
    },
    moves: ['', ''],
    familiar: {bonusType: 'defense', bonusStat: 'maxHp', min: 1, max: 75 },
    role: ['defense']
}
monsters.kwakereVent = {
    id: 'kwakereVent',
    name: 'Kwakere Vent',
    image: 'img/monstres/sprites/kwakereVent.png',
    rarity: 'peu_commun',
    tier: 'normal',
    bst: {
        hp: 440, atk: 140, spd: 105,
        res: {neutre: 100, terre: -25, feu: 25, eau: 25, air: 100 }
    },
    moves: ['', ''],
    familiar: {bonusType: 'farming', bonusStat: 'spd', min: 1, max: 25 },
    role: ['farming']
}

monsters.kwakFlamme = {
    id: 'kwakFlamme',
    name: 'Kwak de Flamme',
    image: 'img/monstres/sprites/kwakFlamme.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 440, atk: 140, spd: 100,
        res: {neutre: 75, terre: 10, feu: 75, eau: -50, air: 10 }
    },
    moves: ['', ''],
    familiar: {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
    role: ['combat']
}
monsters.kwakGlace = {
    id: 'kwakGlace',
    name: 'Kwak de Glace',
    image: 'img/monstres/sprites/kwakGlace.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 440, atk: 140, spd: 100,
        res: {neutre: 75, terre: 10, feu: -50, eau: 75, air: 10 }
    },
    moves: ['', ''],
    familiar: {bonusType: 'combat', bonusStat: 'flatDamage', min: 1, max: 10 },
    role: ['combat']
}
monsters.kwakTerre = {
    id: 'kwakTerre',
    name: 'Kwak de Terre',
    image: 'img/monstres/sprites/kwakTerre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 440, atk: 140, spd: 100,
        res: {neutre: 75, terre: 75, feu: 10, eau: 10, air: -50 }
    },
    moves: ['', ''],
    familiar: {bonusType: 'defense', bonusStat: 'maxHp', min: 1, max: 50 },
    role: ['defense']
}
monsters.kwakVent = {
    id: 'kwakVent',
    name: 'Kwak de Vent',
    image: 'img/monstres/sprites/kwakVent.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 440, atk: 140, spd: 100,
        res: {neutre: 75, terre: -50, feu: 10, eau: 10, air: 75 }
    },
    moves: ['', ''],
    familiar: {bonusType: 'farming', bonusStat: 'spd', min: 1, max: 15 },
    role: ['farming']
}


// ═══════════════════════════════════════════════════════
// DONJON EXEMPLE
// ═══════════════════════════════════════════════════════
monsters.kwakwa = {
    id: 'kwakwa',
    name: 'Kwakwa',
    image: 'img/monstres/sprites/kwakwa.png',
    rarity: 'rare',
    tier: 'boss',
    bst: {
        hp: 1600, atk: 300, spd: 110,
        res: {neutre: 100, terre: 50, feu: 50, eau: 50, air: 50 }
    },
    moves: ['', ''],
    familiar: [
        {bonusType: 'farming', bonusStat: 'spd', min: 3, max: 25 },
        {bonusType: 'defense', bonusStat: 'maxHp', min: 3, max: 75 },
        {bonusType: 'combat', bonusStat: 'flatDamage', min: 2, max: 20 },
        {bonusType: 'combat', bonusStat: 'atk', min: 3, max: 65 }],
    role: ['combat','farming','défense']
}
// #endregion




// ═══════════════════════════════════════════════════════
// #region EVENT PIOU
// ═══════════════════════════════════════════════════════
monsters.piouBleu = {
    id: 'piouBleu',
    name: 'Piou Bleu',
    image: 'img/monstres/sprites/piouBleu.png',
    rarity: 'rare',
    tier: 'normal',
    bst: {
        hp: 80, atk: 60, spd: 100,
        res: {neutre: 0, terre: 0, feu: 0, eau: 33, air: 0 }
    },
    moves: ['picore'],
    familiar: { bonusType: 'combat', bonusStat: 'spd', min: 1, max: 15 },
    role: ['combat']
}
monsters.piouRouge = {
    id: 'piouRouge',
    name: 'Piou Rouge',
    image: 'img/monstres/sprites/piouRouge.png',
    rarity: 'rare',
    tier: 'normal',
    bst: {
        hp: 80, atk: 60, spd: 100,
        res: {neutre: 0, terre: 0, feu: 33, eau: 0, air: 0 }
    },
    moves: ['picore'],
    familiar: { bonusType: 'combat', bonusStat: 'spd', min: 1, max: 15 },
    role: ['combat']
}
monsters.piouVert = {
    id: 'piouVert',
    name: 'Piou Vert',
    image: 'img/monstres/sprites/piouVert.png',
    rarity: 'rare',
    tier: 'normal',
    bst: {
        hp: 80, atk: 60, spd: 100,
        res: {neutre: 0, terre: 33, feu: 0, eau: 0, air: 0 }
    },
    moves: ['picore'],
    familiar: { bonusType: 'combat', bonusStat: 'spd', min: 1, max: 15 },
    role: ['combat']
}
monsters.piouJaune = {
    id: 'piouJaune',
    name: 'Piou Jaune',
    image: 'img/monstres/sprites/piouJaune.png',
    rarity: 'rare',
    tier: 'normal',
    bst: {
        hp: 80, atk: 60, spd: 100,
        res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 33 }
    },
    moves: ['picore'],
    familiar: { bonusType: 'combat', bonusStat: 'spd', min: 1, max: 15 },
    role: ['combat']
}
monsters.piouRose = {
    id: 'piouRose',
    name: 'Piou Rose',
    image: 'img/monstres/sprites/piouRose.png',
    rarity: 'rare',
    tier: 'normal',
    bst: {
        hp: 80, atk: 60, spd: 100,
        res: {neutre: 0, terre: 17, feu: 0, eau: 0, air: 17 }
    },
    moves: ['picore'],
    familiar: { bonusType: 'combat', bonusStat: 'spd', min: 1, max: 15 },
    role: ['combat']
}
monsters.piouViolet = {
    id: 'piouViolet',
    name: 'Piou Violet',
    image: 'img/monstres/sprites/piouViolet.png',
    rarity: 'rare',
    tier: 'normal',
    bst: {
        hp: 80, atk: 60, spd: 100,
        res: {neutre: 0, terre: 0, feu: 17, eau: 17, air: 0 }
    },
    moves: ['picore'],
    familiar: { bonusType: 'combat', bonusStat: 'spd', min: 1, max: 15 },
    role: ['combat']
}
// #endregion

// ═══════════════════════════════════════════════════════
// #region POUTCH — Cible d'entraînement
monsters.poutch = {
    id: 'poutch',
    name: 'Poutch',
    image: 'img/monstres/sprites/poutch.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 5000,
        atk: 25,
        spd: 60,
        res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
    },
    moves: ['petit_coup_du_Chafer'],
    role: []
}
// #endregion

// ═══════════════════════════════════════════════════════
// #region EXEMPLE



// ═══════════════════════════════════════════════════════
// DONJON EXEMPLE
// ═══════════════════════════════════════════════════════
// monsters. = {
//     id: '',
//     name: '',
//     image: 'img/monstres/sprites/.png',
//     rarity: 'commun','peu_commun','rare','legendaire',
//     tier: 'boss','elite', 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'défense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'défense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','défense']
// }
// #endregion


