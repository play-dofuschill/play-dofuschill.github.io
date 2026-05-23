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
        {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
        {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
    role: ['combat','farming','defense']
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
        { bonusStat: 'res.feu', min: 1, max: 50 }, valeur en %
        { bonusStat: 'res.eau', min: 1, max: 50 }, valeur en %
        { bonusStat: 'res.terre', min: 1, max: 50 }, valeur en %
        { bonusStat: 'res.air', min: 1, max: 50 }, valeur en %
        { bonusStat: 'res.neutre', min: 1, max: 50 }, valeur en %
        { bonusStat: 'dropRate', min: 1, max: 50 }, valeur en %
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
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
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
    familiar: { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 10 },
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
    role: ['defense']
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
    familiar: { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 10 },
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
    name: 'Pichon Blanc',
    image: 'img/monstres/sprites/pichonBlanc.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 90, atk: 60, spd: 100,
        res: {neutre: 18, terre: -1, feu: -1, eau: 18, air: 66 }
    },
    moves: ['bouffeedAir', 'onde_Enrageante'],
    familiar: {bonusType: 'defense', bonusStat: 'res.air', min: 1, max: 15 },
    role: ['defense']
}
monsters.pichonVert = {
    id: 'pichonVert',
    name: 'Pichon Vert',
    image: 'img/monstres/sprites/pichonVert.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 90, atk: 60, spd: 100,
        res: {neutre: 18, terre: 66, feu: -1, eau: 18, air: -1 }
    },
    moves: ['reflux', 'onde_Enrageante'],
    familiar: {bonusType: 'defense', bonusStat: 'res.terre', min: 1, max: 15 },
    role: ['defense']
}
monsters.pichonBleu = {
    id: 'pichonBleu',
    name: 'Pichon Bleu',
    image: 'img/monstres/sprites/pichonBleu.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 90, atk: 60, spd: 100,
        res: {neutre: 18, terre: -1, feu: -1, eau: 66, air: 18 }
    },
    moves: ['vaguelette', 'resistivite'],
    familiar: {bonusType: 'defense', bonusStat: 'res.eau', min: 1, max: 15 },
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
    familiar: {bonusType: 'defense', bonusStat: 'res.feu', min: 1, max: 15 },
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
    familiar: {bonusType: 'defense', bonusStat: 'res.neutre', min: 1, max: 15 },
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
        {bonusType: 'defense', bonusStat: 'res.neutre', min: 1, max: 7},
        {bonusType: 'defense', bonusStat: 'res.terre', min: 1, max: 7},
        {bonusType: 'defense', bonusStat: 'res.feu', min: 1, max: 7},
        {bonusType: 'defense', bonusStat: 'res.eau', min: 1, max: 7},
        {bonusType: 'defense', bonusStat: 'res.air', min: 1, max: 7}],
    role: ['defense']
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
    familiar: { bonusType: 'defense', bonusStat: 'maxHp', min: 1, max: 35 },
    role: ['defense']
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
    familiar: [{ bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 },
               { bonusType: 'farming', bonusStat: 'dropRate', min: 1, max: 10 }],
    role: ['farming','defense']
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
    moves: ['scaraforce', 'elemental_dispersion', 'spriti_element_blanc', 'flammeche_air'],
    familiar: {bonusType: 'defense', bonusStat: 'res.air', min: 1, max: 15 },
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
    moves: ['scaraforce', 'elemental_dispersion', 'spriti_element_vert', 'flammeche_terre'],
    familiar: {bonusType: 'defense', bonusStat: 'res.terre', min: 1, max: 15 },
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
    moves: ['scaraforce', 'elemental_dispersion', 'spriti_element_bleu', 'flammeche_eau'],
    familiar: {bonusType: 'defense', bonusStat: 'res.eau', min: 1, max: 15 },
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
    moves: ['scaraforce', 'elemental_dispersion', 'spriti_element_rouge', 'flammeche_feu'],
    familiar: {bonusType: 'defense', bonusStat: 'res.feu', min: 1, max: 15 },
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
    moves: ['scaraforce', 'elemental_dispersion', 'scarinvi'],
    familiar: {bonusType: 'defense', bonusStat: 'res.neutre', min: 1, max: 15 },
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
    moves: ['scarapoison'],
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
    moves: ['picoti', 'naissance', 'premier_soins', 'expulsion'],
    familiar: [
        {bonusType: 'defense', bonusStat: 'res.neutre', min: 1, max: 7},
        {bonusType: 'defense', bonusStat: 'res.terre', min: 1, max: 7},
        {bonusType: 'defense', bonusStat: 'res.feu', min: 1, max: 7},
        {bonusType: 'defense', bonusStat: 'res.eau', min: 1, max: 7},
        {bonusType: 'defense', bonusStat: 'res.air', min: 1, max: 7}],
    role: ['defense']
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
    moves: ['wakolanterne_flamme', 'wakzefeute_flamme', 'griffes_acerees'],
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
    moves: ['wakolanterne_glace', 'wakzefeute_glace', 'griffes_acerees'],
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
    moves: ['wakolanterne_terre', 'wakzefeute_terre', 'griffes_acerees'],
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
    moves: ['wakolanterne_vent', 'wakzefeute_vent', 'griffes_acerees'],
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
    moves: ['kwakoukas_flamme', 'wakpot_flamme', 'eventrement'],
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
    moves: ['kwakoukas_glace', 'wakpot_glace', 'eventrement'],
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
    moves: ['kwakoukas_terre', 'wakpot_terre', 'eventrement'],
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
    moves: ['kwakoukas_vent', 'wakpot_vent', 'eventrement'],
    familiar: {bonusType: 'farming', bonusStat: 'spd', min: 1, max: 15 },
    role: ['farming']
}


// ═══════════════════════════════════════════════════════
// DONJON KWAKWA
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
    moves: ['kwakoukas_kwayal', 'wakpot_kwayal', 'kwabolition', 'kwarmee_kwayal'],
    familiar: [
        {bonusType: 'farming', bonusStat: 'spd', min: 3, max: 25 },
        {bonusType: 'defense', bonusStat: 'maxHp', min: 3, max: 75 },
        {bonusType: 'combat', bonusStat: 'flatDamage', min: 2, max: 20 },
        {bonusType: 'combat', bonusStat: 'atk', min: 3, max: 65 }],
    role: ['combat','farming','defense']
}
// #endregion

// ═══════════════════════════════════════════════════════
// #region BLOP — Zone niveau 50-70
// monsters.blopCoco = {
//     id: 'blopCoco',
//     name: 'Blop Coco',
//     image: 'img/monstres/sprites/blopCoco.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.blopGriotte = {
//     id: 'blopGriotte',
//     name: 'Blop Griotte',
//     image: 'img/monstres/sprites/blopGriotte.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.blopIndigo = {
//     id: 'blopIndigo',
//     name: 'Blop Indigo',
//     image: 'img/monstres/sprites/blopIndigo.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.blopReinette = {
//     id: 'blopReinette',
//     name: 'Blop Reinette',
//     image: 'img/monstres/sprites/blopReinette.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.blopignon = {
//     id: 'blopignon',
//     name: 'Blopignon',
//     image: 'img/monstres/sprites/blopignon.png',
//     rarity: 'peu_commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.tronkoBlop = {
//     id: 'tronkoBlop',
//     name: 'Tronko Blop',
//     image: 'img/monstres/sprites/tronkoBlop.png',
//     rarity: 'peu_commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.gloutoBlop = {
//     id: 'gloutoBlop',
//     name: 'Glouto Blop',
//     image: 'img/monstres/sprites/gloutoBlop.png',
//     rarity: 'peu_commun',
//     tier: 'elite'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }


// ═══════════════════════════════════════════════════════
// DONJON BLOP
// ═══════════════════════════════════════════════════════
// monsters.blopCocoRoyal = {
//     id: 'blopCocoRoyal',
//     name: 'Blop Coco Royal',
//     image: 'img/monstres/sprites/blopCocoRoyal.png',
//     rarity: 'peu_commun',
//     tier: 'boss',
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.blopGriotteRoyal = {
//     id: 'blopGriotteRoyal',
//     name: 'Blop Griotte Royal',
//     image: 'img/monstres/sprites/blopGriotteRoyal.png',
//     rarity: 'peu_commun',
//     tier: 'boss',
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.blopIndigoRoyal = {
//     id: 'blopIndigoRoyal',
//     name: 'Blop Indigo Royal',
//     image: 'img/monstres/sprites/blopIndigoRoyal.png',
//     rarity: 'peu_commun',
//     tier: 'boss',
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.blopReinetteRoyal = {
//     id: 'blopReinetteRoyal',
//     name: 'Blop Reinette Royal',
//     image: 'img/monstres/sprites/blopReinetteRoyal.png',
//     rarity: 'peu_commun',
//     tier: 'boss',
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// #endregion

// ═══════════════════════════════════════════════════════
// #region MANTISCORE — Zone niveau 60-80
// monsters.ouroboulos = {
//     id: 'ouroboulos',
//     name: 'Ouroboulos',
//     image: 'img/monstres/sprites/ouroboulos.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.scordionBleu = {
//     id: 'scordionBleu',
//     name: 'Scordion Bleu',
//     image: 'img/monstres/sprites/scordionBleu.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.fennex = {
//     id: 'fennex',
//     name: 'Fennex',
//     image: 'img/monstres/sprites/fennex.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.leolhyene = {
//     id: 'leolhyene',
//     name: 'Léolhyène',
//     image: 'img/monstres/sprites/leolhyene.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.boulepique = {
//     id: 'boulepique',
//     name: 'Boulepique',
//     image: 'img/monstres/sprites/boulepique.png',
//     rarity: 'peu_commun',
//     tier: 'elite'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }


// ═══════════════════════════════════════════════════════
// DONJON MANTISCORE
// ═══════════════════════════════════════════════════════
// monsters.mantiscore = {
//     id: 'mantiscore',
//     name: 'Mantiscore',
//     image: 'img/monstres/sprites/mantiscore.png',
//     rarity: 'commun','peu_commun','rare','legendaire',
//     tier: 'boss',
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// #endregion

// ═══════════════════════════════════════════════════════
// #region DRAGOEUF — Zone niveau 70-90
// monsters.dragoeufArdoise = {
//     id: 'dragoeufArdoise',
//     name: 'Dragoeuf Ardoise',
//     image: 'img/monstres/sprites/dragoeufArdoise.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.dragoeufArgile = {
//     id: 'dragoeufArgile',
//     name: 'Dragoeuf Argile',
//     image: 'img/monstres/sprites/dragoeufArgile.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.dragoeufCalcaire = {
//     id: 'dragoeufCalcaire',
//     name: 'Dragoeuf Calcaire',
//     image: 'img/monstres/sprites/dragoeufCalcaire.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.dragoeufCharbon = {
//     id: 'dragoeufCharbon',
//     name: 'Dragoeuf Charbon',
//     image: 'img/monstres/sprites/dragoeufCharbon.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.dragoeufAlbatre = {
//     id: 'dragoeufAlbatre',
//     name: 'Dragoeuf Albâtre',
//     image: 'img/monstres/sprites/dragoeufAlbatre.png',
//     rarity: 'peu_commun',
//     tier: 'elite'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }


// ═══════════════════════════════════════════════════════
// DONJON DRAEGNERYS
// ═══════════════════════════════════════════════════════
// monsters.draegnerys = {
//     id: 'draegnerys',
//     name: 'Draegnerys',
//     image: 'img/monstres/sprites/draegnerys.png',
//     rarity: 'peu_commun',
//     tier: 'boss',
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// #endregion

// ═══════════════════════════════════════════════════════
// #region ABRAKNYDE ANCESTRAL — Zone niveau 80-100
// monsters.abrakneSombre = {
//     id: 'abrakneSombre',
//     name: 'Abrakne Sombre',
//     image: 'img/monstres/sprites/abrakneSombre.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.abraknydeSombre = {
//     id: 'abraknydeSombre',
//     name: 'Abraknyde Sombre',
//     image: 'img/monstres/sprites/abraknydeSombre.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.araknotron = {
//     id: 'araknotron',
//     name: 'Araknotron',
//     image: 'img/monstres/sprites/araknotron.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.abraknydeVenerable = {
//     id: 'abraknydeVenerable',
//     name: 'Abraknyde Vénérable',
//     image: 'img/monstres/sprites/abraknydeVenerable.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }

// ═══════════════════════════════════════════════════════
// DONJON CHENE MOU
// ═══════════════════════════════════════════════════════
// monsters.abraknydeAncestral = {
//     id: 'abraknydeAncestral',
//     name: 'Abraknyde Ancestral',
//     image: 'img/monstres/sprites/abraknydeAncestral.png',
//     rarity: 'rare',
//     tier: 'boss',
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// #endregion

// ═══════════════════════════════════════════════════════
// #region DRAGON COCHON — Zone niveau 90-110
// monsters.cochonDeFarle = {
//     id: 'cochonDeFarle',
//     name: 'Cochon de Farle',
//     image: 'img/monstres/sprites/cochonDeFarle.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.donDorgan = {
//     id: 'donDorgan',
//     name: 'Don Dorgan',
//     image: 'img/monstres/sprites/donDorgan.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.donDussAng = {
//     id: 'donDussAng',
//     name: "Don Duss'Ang",
//     image: 'img/monstres/sprites/donDussAng.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.porsalu = {
//     id: 'porsalu',
//     name: 'Porsalu',
//     image: 'img/monstres/sprites/porsalu.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.gorgouille = {
//     id: 'gorgouille',
//     name: 'Gorgouille',
//     image: 'img/monstres/sprites/gorgouille.png',
//     rarity: 'rare',
//     tier: 'elite'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }


// ═══════════════════════════════════════════════════════
// DONJON DRAGON COCHON
// ═══════════════════════════════════════════════════════
// monsters.dragonCochon = {
//     id: 'dragonCochon',
//     name: 'Dragon Cochon',
//     image: 'img/monstres/sprites/dragonCochon.png',
//     rarity: 'rare',
//     tier: 'boss',
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// #endregion

// ═══════════════════════════════════════════════════════
// #region MEULOU — Zone niveau 100-120
// monsters.mulou = {
//     id: 'mulou',
//     name: 'Mulou',
//     image: 'img/monstres/sprites/mulou.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.cocholou = {
//     id: 'cocholou',
//     name: 'Cocholou',
//     image: 'img/monstres/sprites/cocholou.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.mulounoke = {
//     id: 'mulounoke',
//     name: 'Mulounoke',
//     image: 'img/monstres/sprites/mulounoke.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.mergranlou = {
//     id: 'mergranlou',
//     name: 'Mergranlou',
//     image: 'img/monstres/sprites/mergranlou.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.muloubard = {
//     id: 'muloubard',
//     name: 'Muloubard',
//     image: 'img/monstres/sprites/muloubard.png',
//     rarity: 'peu_commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }


// ═══════════════════════════════════════════════════════
// DONJON MEULOU
// ═══════════════════════════════════════════════════════
// monsters.meulou = {
//     id: 'meulou',
//     name: 'Meulou',
//     image: 'img/monstres/sprites/meulou.png',
//     rarity: 'rare',
//     tier: 'boss',
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// #endregion

// ═══════════════════════════════════════════════════════
// #region RAT NOIR — Zone niveau 100-120
// monsters.rateAtinee = {
//     id: 'rateAtinee',
//     name: 'Raté Atinée',
//     image: 'img/monstres/sprites/rateAtinee.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.rateIboisee = {
//     id: 'rateIboisee',
//     name: 'Raté Iboisée',
//     image: 'img/monstres/sprites/rateIboisee.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.ratLi = {
//     id: 'ratLi',
//     name: 'Rat Li',
//     image: 'img/monstres/sprites/ratLi.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.ratPlapla = {
//     id: 'ratPlapla',
//     name: 'Rat Plapla',
//     image: 'img/monstres/sprites/ratPlapla.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.ratSio = {
//     id: 'ratSio',
//     name: 'Rat Sio',
//     image: 'img/monstres/sprites/ratSio.png',
//     rarity: 'peu_commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }


// ═══════════════════════════════════════════════════════
// DONJON RAT NOIR
// ═══════════════════════════════════════════════════════
// monsters.ratNoir = {
//     id: 'ratNoir',
//     name: 'Rat Noir',
//     image: 'img/monstres/sprites/ratNoir.png',
//     rarity: 'rare',
//     tier: 'boss',
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// #endregion

// ═══════════════════════════════════════════════════════
// #region RAT BLANC — Zone niveau 100-120
// monsters.sceleeRate = {
//     id: 'sceleeRate',
//     name: 'Scelée Raté',
//     image: 'img/monstres/sprites/sceleeRate.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.chikaRat = {
//     id: 'chikaRat',
//     name: 'Chika Rat',
//     image: 'img/monstres/sprites/chikaRat.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.chakRat = {
//     id: 'chakRat',
//     name: 'Chak Rat',
//     image: 'img/monstres/sprites/chakRat.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.aloeveRat = {
//     id: 'aloeveRat',
//     name: 'Aloëve Rat',
//     image: 'img/monstres/sprites/aloeveRat.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.capoeiRat = {
//     id: 'capoeiRat',
//     name: 'Capoei Rat',
//     image: 'img/monstres/sprites/capoeiRat.png',
//     rarity: 'peu_commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }


// ═══════════════════════════════════════════════════════
// DONJON RAT BLANC
// ═══════════════════════════════════════════════════════
// monsters.ratBlanc = {
//     id: 'ratBlanc',
//     name: 'Rat Blanc',
//     image: 'img/monstres/sprites/ratBlanc.png',
//     rarity: 'rare',
//     tier: 'boss',
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// #endregion

// ═══════════════════════════════════════════════════════
// #region BOUFMOUTH — Zone niveau 110-130
// monsters.boufmouth = {
//     id: 'boufmouth',
//     name: 'Boufmouth',
//     image: 'img/monstres/sprites/boufmouth.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.boufmouthLegendaire = {
//     id: 'boufmouthLegendaire',
//     name: 'Boufmouth Légendaire',
//     image: 'img/monstres/sprites/boufmouthLegendaire.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.bouftonMouth = {
//     id: 'bouftonMouth',
//     name: 'Boufton Mouth',
//     image: 'img/monstres/sprites/bouftonMouth.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.boufmouthDeGuerre = {
//     id: 'boufmouthDeGuerre',
//     name: 'Boufmouth de Guerre',
//     image: 'img/monstres/sprites/boufmouthDeGuerre.png',
//     rarity: 'peu_commun',
//     tier: 'elite'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }


// ═══════════════════════════════════════════════════════
// DONJON BOUFMOUTH ROYAL
// ═══════════════════════════════════════════════════════
// monsters.boufmouthRoyal = {
//     id: 'boufmouthRoyal',
//     name: 'Boufmouth Royal',
//     image: 'img/monstres/sprites/boufmouthRoyal.png',
//     rarity: 'rare',
//     tier: 'boss',
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// #endregion

// ═══════════════════════════════════════════════════════
// #region MANSOT — Zone niveau 110-130
// monsters.fuMansot = {
//     id: 'fuMansot',
//     name: 'Fu Mansot',
//     image: 'img/monstres/sprites/fuMansot.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.timansot = {
//     id: 'timansot',
//     name: 'Timansot',
//     image: 'img/monstres/sprites/timansot.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.shamansot = {
//     id: 'shamansot',
//     name: 'Shamansot',
//     image: 'img/monstres/sprites/shamansot.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.mamansot = {
//     id: 'mamansot',
//     name: 'Mamansot',
//     image: 'img/monstres/sprites/mamansot.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.mansobese = {
//     id: 'mansobese',
//     name: 'Mansobèse',
//     image: 'img/monstres/sprites/mansobese.png',
//     rarity: 'peu_commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }

// ═══════════════════════════════════════════════════════
// DONJON MANSOT ROYAL
// ═══════════════════════════════════════════════════════
// monsters.mansotRoyal = {
//     id: 'mansotRoyal',
//     name: 'Mansot Royal',
//     image: 'img/monstres/sprites/mansotRoyal.png',
//     rarity: 'legendaire',
//     tier: 'boss',
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// #endregion

// ═══════════════════════════════════════════════════════
// #region TOFU ROYAL — Zone niveau 120-140
// monsters.tofubine = {
//     id: 'tofubine',
//     name: 'Tofubine',
//     image: 'img/monstres/sprites/tofubine.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.tofuDodu = {
//     id: 'tofuDodu',
//     name: 'Tofu Dodu',
//     image: 'img/monstres/sprites/tofuDodu.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.tofutoflamme = {
//     id: 'tofutoflamme',
//     name: 'Tofutoflamme',
//     image: 'img/monstres/sprites/tofutoflamme.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.tofuzmo = {
//     id: 'tofuzmo',
//     name: 'Tofuzmo',
//     image: 'img/monstres/sprites/tofuzmo.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.vilainPetitTofu = {
//     id: 'vilainPetitTofu',
//     name: 'Vilain Petit Tofu',
//     image: 'img/monstres/sprites/vilainPetitTofu.png',
//     rarity: 'peu_commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }


// ═══════════════════════════════════════════════════════
// DONJON TOFU ROYAL
// ═══════════════════════════════════════════════════════
// monsters.tofuRoyal = {
//     id: 'tofuRoyal',
//     name: 'Tofu Royal',
//     image: 'img/monstres/sprites/tofuRoyal.png',
//     rarity: 'rare',
//     tier: 'boss',
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// #endregion

// ═══════════════════════════════════════════════════════
// #region HELL MINA — Zone niveau 130-150
// monsters.malalfa = {
//     id: 'malalfa',
//     name: 'Malalfa',
//     image: 'img/monstres/sprites/malalfa.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.malzerb = {
//     id: 'malzerb',
//     name: 'Malzerb',
//     image: 'img/monstres/sprites/malzerb.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.maltrio = {
//     id: 'maltrio',
//     name: 'Maltrio',
//     image: 'img/monstres/sprites/maltrio.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.malepik = {
//     id: 'malepik',
//     name: 'Malepik',
//     image: 'img/monstres/sprites/malepik.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.malbois = {
//     id: 'malbois',
//     name: 'Malbois',
//     image: 'img/monstres/sprites/malbois.png',
//     rarity: 'peu_commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }


// ═══════════════════════════════════════════════════════
// DONJON HELL MINA
// ═══════════════════════════════════════════════════════
// monsters.hellMina = {
//     id: 'hellMina',
//     name: 'Hell Mina',
//     image: 'img/monstres/sprites/hellMina.png',
//     rarity: 'rare',
//     tier: 'boss',
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// #endregion

// ═══════════════════════════════════════════════════════
// #region TRUCHE — Zone niveau 130-150
// monsters.gruche = {
//     id: 'gruche',
//     name: 'Gruche',
//     image: 'img/monstres/sprites/gruche.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.truchtine = {
//     id: 'truchtine',
//     name: 'Truchtine',
//     image: 'img/monstres/sprites/truchtine.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.truchon = {
//     id: 'truchon',
//     name: 'Truchon',
//     image: 'img/monstres/sprites/truchon.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.truchideur = {
//     id: 'truchideur',
//     name: 'Truchideur',
//     image: 'img/monstres/sprites/truchideur.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.truchemuche = {
//     id: 'truchemuche',
//     name: 'Truchemuche',
//     image: 'img/monstres/sprites/truchemuche.png',
//     rarity: 'peu_commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }


// ═══════════════════════════════════════════════════════
// DONJON TRUCHE
// ═══════════════════════════════════════════════════════
// monsters.hauteTruche = {
//     id: 'hauteTruche',
//     name: 'Haute Truche',
//     image: 'img/monstres/sprites/hauteTruche.png',
//     rarity: 'rare',
//     tier: 'boss','elite', 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// #endregion

// ═══════════════════════════════════════════════════════
// #region PHOSSILE — Zone niveau 140-160
// monsters.perePhorreur = {
//     id: 'perePhorreur',
//     name: 'Père Phorreur',
//     image: 'img/monstres/sprites/perePhorreur.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.phorreveur = {
//     id: 'phorreveur',
//     name: 'Phorreveur',
//     image: 'img/monstres/sprites/phorreveur.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.phozami = {
//     id: 'phozami',
//     name: 'Phozami',
//     image: 'img/monstres/sprites/phozami.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.metaphorreur = {
//     id: 'metaphorreur',
//     name: 'Métaphorreur',
//     image: 'img/monstres/sprites/metaphorreur.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.mereVeilleuse = {
//     id: 'mereVeilleuse',
//     name: 'Mère Veilleuse',
//     image: 'img/monstres/sprites/mereVeilleuse.png',
//     rarity: 'peu_commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }


// ═══════════════════════════════════════════════════════
// DONJON PHOSSILE
// ═══════════════════════════════════════════════════════
// monsters.phossile = {
//     id: 'phossile',
//     name: 'Phossile',
//     image: 'img/monstres/sprites/phossile.png',
//     rarity: 'legendaire',
//     tier: 'boss',
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// #endregion

// ═══════════════════════════════════════════════════════
// #region CHENE MOU — Zone niveau 140-160
// monsters.abrakneSombreIrascible = {
//     id: 'abrakneSombreIrascible',
//     name: 'Abrakne Sombre Irascible',
//     image: 'img/monstres/sprites/abrakneSombreIrascible.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.abraknydeSombreIrascible = {
//     id: 'abraknydeSombreIrascible',
//     name: 'Abraknyde Sombre Irascible',
//     image: 'img/monstres/sprites/abraknydeSombreIrascible.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.araknotronIrascible = {
//     id: 'araknotronIrascible',
//     name: 'Araknotron Irascible',
//     image: 'img/monstres/sprites/araknotronIrascible.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.brancheInvocatrice = {
//     id: 'brancheInvocatrice',
//     name: 'Branche Invocatrice',
//     image: 'img/monstres/sprites/brancheInvocatrice.png',
//     rarity: 'peu_commun',
//     tier: 'elite'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.brancheSoignante = {
//     id: 'brancheSoignante',
//     name: 'Branche Soignante',
//     image: 'img/monstres/sprites/brancheSoignante.png',
//     rarity: 'peu_commun',
//     tier: 'elite'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }


// ═══════════════════════════════════════════════════════
// DONJON CHENE MOU
// ═══════════════════════════════════════════════════════
// monsters.cheneMou = {
//     id: 'cheneMou',
//     name: 'Chêne Mou',
//     image: 'img/monstres/sprites/cheneMou.png',
//     rarity: 'rare',
//     tier: 'boss',
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// #endregion

// ═══════════════════════════════════════════════════════
// #region MINOTOT — Zone niveau 150-170
// monsters.gamino = {
//     id: 'gamino',
//     name: 'Gamino',
//     image: 'img/monstres/sprites/gamino.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.scaratos = {
//     id: 'scaratos',
//     name: 'Scaratos',
//     image: 'img/monstres/sprites/scaratos.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.serpiplume = {
//     id: 'serpiplume',
//     name: 'Serpiplume',
//     image: 'img/monstres/sprites/serpiplume.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.minoskito = {
//     id: 'minoskito',
//     name: 'Minoskito',
//     image: 'img/monstres/sprites/minoskito.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.deminoboule = {
//     id: 'deminoboule',
//     name: 'Deminoboule',
//     image: 'img/monstres/sprites/deminoboule.png',
//     rarity: 'rare',
//     tier: 'elite'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.mominotor = {
//     id: 'mominotor',
//     name: 'Mominotor',
//     image: 'img/monstres/sprites/mominotor.png',
//     rarity: 'rare',
//     tier: 'elite'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }


// ═══════════════════════════════════════════════════════
// DONJON MINOTOT/MINOTOROR/MOMI/DEMI
// ═══════════════════════════════════════════════════════
// monsters.minotot = {
//     id: 'minotot',
//     name: 'Minotot',
//     image: 'img/monstres/sprites/minotot.png',
//     rarity: 'rare',
//     tier: 'boss',
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.minotoror = {
//     id: 'minotoror',
//     name: 'Minotoror',
//     image: 'img/monstres/sprites/minotoror.png',
//     rarity: 'rare',
//     tier: 'boss',
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// #endregion

// ═══════════════════════════════════════════════════════
// #region OBSIDIANTRE — Zone niveau 150-170
// monsters.solfatare = {
//     id: 'solfatare',
//     name: 'Solfatare',
//     image: 'img/monstres/sprites/solfatare.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.atomystique = {
//     id: 'atomystique',
//     name: 'Atomystique',
//     image: 'img/monstres/sprites/atomystique.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.crapeur = {
//     id: 'crapeur',
//     name: 'Crapeur',
//     image: 'img/monstres/sprites/crapeur.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.fumrirolle = {
//     id: 'fumrirolle',
//     name: 'Fumrirolle',
//     image: 'img/monstres/sprites/fumrirolle.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.mofette = {
//     id: 'mofette',
//     name: 'Mofette',
//     image: 'img/monstres/sprites/mofette.png',
//     rarity: 'rare',
//     tier: 'elite'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }


// ═══════════════════════════════════════════════════════
// DONJON OBSIDIANTRE
// ═══════════════════════════════════════════════════════
// monsters.obsidiantre = {
//     id: 'obsidiantre',
//     name: 'Obsidiantre',
//     image: 'img/monstres/sprites/obsidiantre.png',
//     rarity: 'rare',
//     tier: 'boss',
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// #endregion

// ═══════════════════════════════════════════════════════
// #region TENGU GIVREFOUX — Zone niveau 160-180
// monsters.yokaiGivrefoux = {
//     id: 'yokaiGivrefoux',
//     name: 'Yokaï Givrefoux',
//     image: 'img/monstres/sprites/yokaiGivrefoux.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.yomiGivrefoux = {
//     id: 'yomiGivrefoux',
//     name: 'Yomi Givrefoux',
//     image: 'img/monstres/sprites/yomiGivrefoux.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.soryoGivrefoux = {
//     id: 'soryoGivrefoux',
//     name: 'Soryo Givrefoux',
//     image: 'img/monstres/sprites/soryoGivrefoux.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.mahoGivrefoux = {
//     id: 'mahoGivrefoux',
//     name: 'Maho Givrefoux',
//     image: 'img/monstres/sprites/mahoGivrefoux.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.kamiGivrefoux = {
//     id: 'kamiGivrefoux',
//     name: 'Kami Givrefoux',
//     image: 'img/monstres/sprites/kamiGivrefoux.png',
//     rarity: 'peu_commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }


// ═══════════════════════════════════════════════════════
// DONJON TENGU GIVREFOUX
// ═══════════════════════════════════════════════════════
// monsters.fujiGivrefoux = {
//     id: 'fujiGivrefoux',
//     name: 'Fuji Givrefoux',
//     image: 'img/monstres/sprites/fujiGivrefoux.png',
//     rarity: 'rare',
//     tier: 'boss',
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.tenguGivrefoux = {
//     id: 'tenguGivrefoux',
//     name: 'Tengu Givrefoux',
//     image: 'img/monstres/sprites/tenguGivrefoux.png',
//     rarity: 'rare',
//     tier: 'boss',
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// #endregion

// ═══════════════════════════════════════════════════════
// #region OUGAH — Zone niveau 170-190
// monsters.tromperelle = {
//     id: 'tromperelle',
//     name: 'Tromperelle',
//     image: 'img/monstres/sprites/tromperelle.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.champaknyde = {
//     id: 'champaknyde',
//     name: 'Champaknyde',
//     image: 'img/monstres/sprites/champaknyde.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.champbis = {
//     id: 'champbis',
//     name: 'Champbis',
//     image: 'img/monstres/sprites/champbis.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.champodonte = {
//     id: 'champodonte',
//     name: 'Champodonte',
//     image: 'img/monstres/sprites/champodonte.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.champAGnon = {
//     id: 'champAGnon',
//     name: "Champ'A'Gnon",
//     image: 'img/monstres/sprites/champAGnon.png',
//     rarity: 'peu_commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.champmane = {
//     id: 'champmane',
//     name: 'Champmane',
//     image: 'img/monstres/sprites/champmane.png',
//     rarity: 'peu_commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }


// ═══════════════════════════════════════════════════════
// DONJON OUGAH
// ═══════════════════════════════════════════════════════
// monsters.ougah = {
//     id: 'ougah',
//     name: 'Ougah',
//     image: 'img/monstres/sprites/ougah.png',
//     rarity: 'legendaire',
//     tier: 'boss',
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// #endregion

// ═══════════════════════════════════════════════════════
// #region KOLOSSO — Zone niveau 170-190
// monsters.croleur = {
//     id: 'croleur',
//     name: 'Croleur',
//     image: 'img/monstres/sprites/croleur.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.blerauve = {
//     id: 'blerauve',
//     name: 'Blérauve',
//     image: 'img/monstres/sprites/blerauve.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.blerom = {
//     id: 'blerom',
//     name: 'Blérom',
//     image: 'img/monstres/sprites/blerom.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.wolvero = {
//     id: 'wolvero',
//     name: 'Wolvero',
//     image: 'img/monstres/sprites/wolvero.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.fleuro = {
//     id: 'fleuro',
//     name: 'Fleuro',
//     image: 'img/monstres/sprites/fleuro.png',
//     rarity: 'peu_commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }blerice
// monsters.blerice = {
//     id: 'blerice',
//     name: 'Blérice',
//     image: 'img/monstres/sprites/blerice.png',
//     rarity: 'peu_commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }


// ═══════════════════════════════════════════════════════
// DONJON KOLOSSO/XA
// ═══════════════════════════════════════════════════════
// monsters.professeurXa = {
//     id: 'professeurXa',
//     name: 'Professeur Xa',
//     image: 'img/monstres/sprites/professeurXa.png',
//     rarity: 'rare',
//     tier: 'boss',
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.kolosso = {
//     id: 'kolosso',
//     name: 'Kolosso',
//     image: 'img/monstres/sprites/kolosso.png',
//     rarity: 'rare',
//     tier: 'boss',
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// #endregion

// ═══════════════════════════════════════════════════════
// #region GLOURCELESTE — Zone niveau 180-200
// monsters.glouragan = {
//     id: 'glouragan',
//     name: 'Glouragan',
//     image: 'img/monstres/sprites/glouragan.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.aperiglours = {
//     id: 'aperiglours',
//     name: 'Apériglours',
//     image: 'img/monstres/sprites/aperiglours.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.boulglours = {
//     id: 'boulglours',
//     name: 'Boulglours',
//     image: 'img/monstres/sprites/boulglours.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.gloursaya = {
//     id: 'gloursaya',
//     name: 'Gloursaya',
//     image: 'img/monstres/sprites/gloursaya.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }meliglours
// monsters.meliglours = {
//     id: 'meliglours',
//     name: 'Méliglours',
//     image: 'img/monstres/sprites/meliglours.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.glourmand = {
//     id: 'glourmand',
//     name: 'Glourmand',
//     image: 'img/monstres/sprites/glourmand.png',
//     rarity: 'peu_commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }


// ═══════════════════════════════════════════════════════
// DONJON GLOURCELESTE
// ═══════════════════════════════════════════════════════
// monsters.glouceleste = {
//     id: 'glouceleste',
//     name: 'Gloucéleste',
//     image: 'img/monstres/sprites/glouceleste.png',
//     rarity: 'rare',
//     tier: 'boss',
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// #endregion

// ═══════════════════════════════════════════════════════
// #region HAREBOURG — Zone niveau 200+
// monsters.sinistrofu = {
//     id: 'sinistrofu',
//     name: 'Sinistrofu',
//     image: 'img/monstres/sprites/sinistrofu.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.cycloide = {
//     id: 'cycloide',
//     name: 'Cycloïde',
//     image: 'img/monstres/sprites/cycloide.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.granduk = {
//     id: 'granduk',
//     name: 'Granduk',
//     image: 'img/monstres/sprites/granduk.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.nocturlable = {
//     id: 'nocturlable',
//     name: 'Nocturlable',
//     image: 'img/monstres/sprites/nocturlable.png',
//     rarity: 'commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// monsters.strigide = {
//     id: 'strigide',
//     name: 'Strigide',
//     image: 'img/monstres/sprites/strigide.png',
//     rarity: 'peu_commun',
//     tier: 'normal'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }


// ═══════════════════════════════════════════════════════
// DONJON HAREBOURG
// ═══════════════════════════════════════════════════════
// monsters.comteHarebourg = {
//     id: 'comteHarebourg',
//     name: 'Comte Harebourg',
//     image: 'img/monstres/sprites/comteHarebourg.png',
//     rarity: 'rare'
//     tier: 'boss'
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', ''],
//     familiar: [
//         {bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// #endregion




// ═══════════════════════════════════════════════════════
// #region EVENT PIOU
// ═══════════════════════════════════════════════════════
monsters.piouBleu = {
    id: 'piouBleu',
    name: 'Piou Bleu',
    image: 'img/monstres/sprites/piouBleu.png',
    rarity: 'commun',
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
    rarity: 'commun',
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
    rarity: 'commun',
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
    rarity: 'commun',
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
    rarity: 'commun',
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
    rarity: 'commun',
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
// #region EVENT DOPEULS
// ═══════════════════════════════════════════════════════
monsters.dopeul_cra = {
    id: 'dopeul_cra',
    name: 'Dopeul Cra',
    image: 'img/monstres/Events/dopeul_cra.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 370, atk: 170, spd: 100,
        res: {neutre: 8, terre: 8, feu: 8, eau: 8, air: 8 }},
    moves: ['fleche_optique_du_dopeul','fleche_glacee_du_dopeul']
}
monsters.dopeul_iop = {
    id: 'dopeul_iop',
    name: 'Dopeul Iop',
    image: 'img/monstres/Events/dopeul_iop.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 370, atk: 170, spd: 100,
        res: {neutre: 8, terre: 8, feu: 8, eau: 8, air: 8 }},
    moves: ['epee_divine_du_dopeul','pression_du_dopeul']
}
monsters.dopeul_eniripsa = {
    id: 'dopeul_eniripsa',
    name: 'Dopeul Eniripsa',
    image: 'img/monstres/Events/dopeul_eniripsa.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 370, atk: 170, spd: 100,
        res: {neutre: 8, terre: 8, feu: 8, eau: 8, air: 8 }},
    moves: ['mot_espiegle_du_dopeul','mot_tapageur_du_dopeul']
}
monsters.dopeul_ecaflip = {
    id: 'dopeul_ecaflip',
    name: 'Dopeul Ecaflip',
    image: 'img/monstres/Events/dopeul_ecaflip.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 370, atk: 170, spd: 100,
        res: {neutre: 8, terre: 8, feu: 8, eau: 8, air: 8 }},
    moves: ['pile_ou_face_du_dopeul', 'bonne_pioche_du_dopeul']
}
monsters.dopeul_eliotrope = {
    id: 'dopeul_eliotrope',
    name: 'Dopeul Eliotrope',
    image: 'img/monstres/Events/dopeul_eliotrope.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 370, atk: 170, spd: 100,
        res: {neutre: 8, terre: 8, feu: 8, eau: 8, air: 8 }},
    moves: ['affront_du_dopeul', 'rayon_de_wakfu_du_dopeul']
}
monsters.dopeul_enutrof = {
    id: 'dopeul_enutrof',
    name: 'Dopeul Enutrof',
    image: 'img/monstres/Events/dopeul_enutrof.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 370, atk: 170, spd: 100,
        res: {neutre: 8, terre: 8, feu: 8, eau: 8, air: 8 }},
    moves: ['roulage_de_pelle_du_dopeul', 'lancer_de_pieces_du_dopeul']
}
monsters.dopeul_feca = {
    id: 'dopeul_feca',
    name: 'Dopeul Feca',
    image: 'img/monstres/Events/dopeul_feca.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 370, atk: 170, spd: 100,
        res: {neutre: 8, terre: 8, feu: 8, eau: 8, air: 8 }},
    moves: ['retour_du_baton_du_dopeul', 'bulle_du_dopeul']
}
monsters.dopeul_forgelance = {
    id: 'dopeul_forgelance',
    name: 'Dopeul Forgelance',
    image: 'img/monstres/Events/dopeul_forgelance.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 370, atk: 170, spd: 100,
        res: {neutre: 8, terre: 8, feu: 8, eau: 8, air: 8 }},
    moves: ['trident_de_la_mer_du_dopeul', 'volee_d_airain_du_dopeul']
}
monsters.dopeul_huppermage = {
    id: 'dopeul_huppermage',
    name: 'Dopeul Huppermage',
    image: 'img/monstres/Events/dopeul_huppermage.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 370, atk: 170, spd: 100,
        res: {neutre: 8, terre: 8, feu: 8, eau: 8, air: 8 }},
    moves: ['onde_sismique_du_dopeul', 'stalagmite_du_dopeul']
}
monsters.dopeul_osamodas = {
    id: 'dopeul_osamodas',
    name: 'Dopeul Osamodas',
    image: 'img/monstres/Events/dopeul_osamodas.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 370, atk: 170, spd: 100,
        res: {neutre: 8, terre: 8, feu: 8, eau: 8, air: 8 }},
    moves: ['pics_du_prespic_du_dopeul', 'crocs_du_mulou_du_dopeul']
}
monsters.dopeul_ouginak = {
    id: 'dopeul_ouginak',
    name: 'Dopeul Ouginak',
    image: 'img/monstres/Events/dopeul_ouginak.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 370, atk: 170, spd: 100,
        res: {neutre: 8, terre: 8, feu: 8, eau: 8, air: 8 }},
    moves: ['traque_du_dopeul', 'molosse_du_dopeul']
}
monsters.dopeul_pandawa = {
    id: 'dopeul_pandawa',
    name: 'Dopeul Pandawa',
    image: 'img/monstres/Events/dopeul_pandawa.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 370, atk: 170, spd: 100,
        res: {neutre: 8, terre: 8, feu: 8, eau: 8, air: 8 }},
    moves: ['paume_explosive_du_dopeul', 'ethylo_du_dopeul']
}
monsters.dopeul_roublard = {
    id: 'dopeul_roublard',
    name: 'Dopeul Roublard',
    image: 'img/monstres/Events/dopeul_roublard.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 370, atk: 170, spd: 100,
        res: {neutre: 8, terre: 8, feu: 8, eau: 8, air: 8 }},
    moves: ['espingole_du_dopeul', 'pulsar_du_dopeul']
}
monsters.dopeul_sacrieur = {
    id: 'dopeul_sacrieur',
    name: 'Dopeul Sacrieur',
    image: 'img/monstres/Events/dopeul_sacrieur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 370, atk: 170, spd: 100,
        res: {neutre: 8, terre: 8, feu: 8, eau: 8, air: 8 }},
    moves: ['supplice_du_dopeul', 'absorption_du_dopeul']
}
monsters.dopeul_sadida = {
    id: 'dopeul_sadida',
    name: 'Dopeul Sadida',
    image: 'img/monstres/Events/dopeul_sadida.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 370, atk: 170, spd: 100,
        res: {neutre: 8, terre: 8, feu: 8, eau: 8, air: 8 }},
    moves: ['ronce_du_dopeul', 'buisson_ardent_du_dopeul']
}
monsters.dopeul_sram = {
    id: 'dopeul_sram',
    name: 'Dopeul Sram',
    image: 'img/monstres/Events/dopeul_sram.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 370, atk: 170, spd: 100,
        res: {neutre: 8, terre: 8, feu: 8, eau: 8, air: 8 }},
    moves: ['truanderie_du_dopeul', 'arsenic_du_dopeul']
}
monsters.dopeul_steamer = {
    id: 'dopeul_steamer',
    name: 'Dopeul Steamer',
    image: 'img/monstres/Events/dopeul_steamer.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 370, atk: 170, spd: 100,
        res: {neutre: 8, terre: 8, feu: 8, eau: 8, air: 8 }},
    moves: ['longue_vue_du_dopeul', 'amarrage_du_dopeul']
}
monsters.dopeul_xelor = {
    id: 'dopeul_xelor',
    name: 'Dopeul Xelor',
    image: 'img/monstres/Events/dopeul_xelor.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 370, atk: 170, spd: 100,
        res: {neutre: 8, terre: 8, feu: 8, eau: 8, air: 8 }},
    moves: ['gelure_du_dopeul', 'frappe_de_xelor_du_dopeul']
}
monsters.dopeul_zobal = {
    id: 'dopeul_zobal',
    name: 'Dopeul Zobal',
    image: 'img/monstres/Events/dopeul_zobal.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 370, atk: 170, spd: 100,
        res: {neutre: 8, terre: 8, feu: 8, eau: 8, air: 8 }},
    moves: ['parafuso_du_dopeul', 'plastron_du_dopeul']
}
monsters.dopeul_darkvlad = {
    id: 'dopeul_darkvlad',
    name: 'Dopeul Dark Vlad',
    image: 'img/monstres/Events/dopeul_darkvlad.png',
    rarity: 'peu_commun',
    tier: 'elite',
    fixedLevel: 110,
    bst: {
        hp: 1200, atk: 350, spd: 100,
        res: {neutre: 8, terre: 8, feu: 8, eau: 8, air: 8 }},
    moves: ['lame_de_iop','lame_divine','tension'],
    familiar: { bonusType: 'farming', bonusStat: 'dropRateElite', min: 5, max: 50 },
    role: ['farming']
}

// #endregion

// ═══════════════════════════════════════════════════════
// #region POUTCH — Cible d'entraînement
monsters.poutch = {
    id: 'poutch',
    name: 'Poutch',
    image: 'img/pnj/Poutch.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 50000,
        atk: 0,
        spd: 100,
        res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
    },
    moves: ['coupdepoutch'],
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
//         {bonusType: 'defense', bonusStat: 'xpGain', min: 1, max: 10 },
//         {bonusType: 'defense', bonusStat: 'maxHp', min: 5, max: 50 }],
//     role: ['combat','farming','defense']
// }
// #endregion


