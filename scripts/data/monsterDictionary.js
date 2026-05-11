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
        { stat: 'atk', min: 1, max: 50 },
        { stat: 'xpGain', min: 1, max: 10 },
        { stat: 'maxHp', min: 5, max: 50 }],
    role: ['combat','farming','défense']
}
stats: [
        { stat: 'atk', value: 10 }, valeur brute
        { stat: 'spd', value: 10 }, valeur brute
        { stat: 'flatDamage', value: 10 }, valeur brute
        { stat: 'finalDamagePct', value: 10 }, valeur en %
        { stat: 'spellDamagePct', value: 10 }, valeur en %
        { stat: 'damageReductionPct', value: 10 }, valeur en %
        { stat: 'critChance', value: 10 }, valeur brute
        { stat: 'critDamagePct', value: 10 }, valeur en %
        { stat: 'maxHp', value: 10 }, valeur brutes
        { stat: 'fireResPct', value: 10 }, valeur en %
        { stat: 'waterResPct', value: 10 }, valeur en %
        { stat: 'earthResPct', value: 10 }, valeur en %
        { stat: 'airResPct', value: 10 }, valeur en %
        { stat: 'neutralResPct', value: 10 }, valeur en %
        { stat: 'droprate', value: 10 }, valeur en %
        { stat: 'xpGain', value: 10 }, valeur en %
    ],
*/

// possibilité d'ajouter la fonction de trigger pour déclancher l'effet d'un familier

// trigger: 'onKill',
// effects: [
//     { type: 'stat', stat: 'atk', value: 1 }
// ]

const monsters = {}

// ═══════════════════════════════════════════════════════
// INCARNAM — Zone niveau 1–10
// ═══════════════════════════════════════════════════════

monsters.chaferDebutant = {
    id: 'chaferDebutant',
    name: 'Chafer Débutant',
    image: 'img/monstres/sprites/chaferDebutant.png',
    rarity: 'commun',
    tier: 'normal',
    dropRate: 0.40,
    bst: {
        hp: 44, atk: 60, spd: 100,
        res:{neutre: 14, terre: 0, feu: 0, eau: 0, air: 0 }
    },
    moves: ['petit_coup_du_Chafer'],
    familiar: { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
    role: ['farming']
}

monsters.chaferEclaireur = {
    id: 'chaferEclaireur',
    name: 'Chafer Éclaireur',
    image: 'img/monstres/sprites/chaferEclaireur.png',
    rarity: 'commun',
    tier: 'normal',
    dropRate: 0.35,
    bst: {
        hp: 45, atk: 10, spd: 100,
        res:{neutre: 0, terre: 14, feu: 0, eau: 0, air: 0 }
    },
    moves: ['fleche_de_feu'],
    familiar: { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
    role: ['farming']
}

monsters.chaferFurtif = {
    id: 'chaferFurtif',
    name: 'Chafer Furtif',
    image: 'img/monstres/sprites/chaferFurtif.png',
    rarity: 'commun',
    tier: 'normal',
    dropRate: 0.35,
    bst: {
        hp: 50, atk: 10, spd: 100,
        res:{neutre: 0, terre: 0, feu: 0, eau: 0, air: 14 }
    },
    moves: ['petit_coup_du_Chafer'],
    familiar: { bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
    role: ['combat']
}

monsters.chaferPiquier = {
    id: 'chaferPiquier',
    name: 'Chafer Piquier',
    image: 'img/monstres/sprites/chaferPiquier.png',
    rarity: 'commun',
    tier: 'normal',
    dropRate: 0.30,
    bst: {
        hp: 60, atk: 14, spd: 100,
        res:{neutre: 0, terre: 0, feu: 0, eau: 14, air: 0 }
    },
    moves: ['empalement'],
    familiar: { bonusType: 'combat', bonusStat: 'hp', min: 1, max: 10 },
    role: ['défense']
}

monsters.sergentChafer = {
    id: 'sergentChafer',
    name: 'Sergent Chafer',
    image: 'img/monstres/sprites/sergentChafer.png',
    rarity: 'peu_commun',
    tier: 'normal',
    dropRate: 0.25,
    bst: {
        hp: 75, atk: 20, spd: 100,
        res:{neutre: 0, terre: 0, feu: 14, eau: 0, air: 0 }
    },
    moves: ['petit_coup_du_Chafer'],
    familiar: { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
    role: ['farming']
}

// ═══════════════════════════════════════════════════════
// DONJON KARDORIM
// ═══════════════════════════════════════════════════════
monsters.kardorib = {
    id: 'kardorib',
    name: 'Kardorib',
    image: 'img/monstres/sprites/kardorib.png',
    rarity: 'commun',
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
    rarity: 'commun',
    tier: 'boss',
    bst: {
        hp: 200, atk: 50, spd: 100,
        res: {neutre: 10, terre: -15, feu: 20, eau: -10, air: 5 }
    },
    moves: ['cassecrane', 'appeldeKardorib'],
    familiar: { bonusType: 'combat', bonusStat: 'atk', min: 1, max: 50 },
    role: ['combat']
}

// ═══════════════════════════════════════════════════════
// ASTRUB — Zone niveau 20–30
// ═══════════════════════════════════════════════════════

monsters.bouftou = {
    id: 'bouftou',
    name: 'Bouftou',
    image: 'img/monstres/sprites/bouftou.png',
    rarity: 'commun',
    tier: 'normal',
    dropRate: 0.35,
    bst: {
        hp: 280, atk: 120, spd: 100,
        res: {neutre: 5, terre: 15, feu: -10, eau: -5, air: 20 }
    },
    moves: ['morsure_du_bouftou'],
    familiar: { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
    role: ['farming']
}

monsters.bouftonBlanc = {
    id: 'bouftonBlanc',
    name: 'Boufton Blanc',
    image: 'img/monstres/sprites/bouftonBlanc.png',
    rarity: 'commun',
    tier: 'normal',
    dropRate: 0.30,
    bst: {
        hp: 250, atk: 120, spd: 100,
        res: {neutre: 5, terre: 20, feu: -5, eau: -10, air: 15 }
    },
    moves: ['machouillage'],
    familiar: { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
    role: ['farming']
}

monsters.bouftonNoir = {
    id: 'bouftonNoir',
    name: 'Boufton Noir',
    image: 'img/monstres/sprites/bouftonNoir.png',
    rarity: 'commun',
    tier: 'normal',
    dropRate: 0.30,
    bst: {
        hp: 250, atk: 120, spd: 100,
        res: {neutre: 5, terre: -10, feu: 15, eau: 20, air: -5 }
    },
    moves: ['mordillement'],
    familiar: { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
    role: ['farming']
}

monsters.bouftouNoir = {
    id: 'bouftouNoir',
    name: 'Bouftou Noir',
    image: 'img/monstres/sprites/bouftouNoir.png',
    rarity: 'peu_commun',
    tier: 'normal',
    dropRate: 0.25,
    bst: {
        hp: 300, atk: 120, spd: 100,
        res: {neutre: 5, terre: -5, feu: 20, eau: 15, air: -10 }
    },
    moves: ['morsure_obscure', 'halaine_du_bouftou'],
    familiar: { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
    role: ['farming']
}

monsters.bouftouChefDeGuerre = {
    id: 'bouftouChefDeGuerre',
    name: 'Chef de Guerre Bouftou',
    image: 'img/monstres/sprites/bouftouChefDeGuerre.png',
    rarity: 'rare',
    tier: 'normal',
    dropRate: 0.20,
    bst: {
        hp: 280, atk: 120, spd: 100,
        res: {neutre: 15, terre: 0, feu: 0, eau: -5, air: 15 }
    },
    moves: ['fureur_du_bouftou', 'morsure_de_guerre'],
    familiar: { bonusType: 'farming', bonusStat: 'xpGain', min: 1, max: 10 },
    role: ['farming']
}

// ═══════════════════════════════════════════════════════
// DONJON BOUFTOU
// ═══════════════════════════════════════════════════════
monsters.bouftouRoyal = {
    id: 'bouftouRoyal',
    name: 'Bouftou Royal',
    image: 'img/monstres/sprites/bouftouRoyal.png',
    rarity: 'commun',
    tier: 'boss',
    bst: {
        hp: 900, atk: 120, spd: 100,
        res: {neutre: 35, terre: 20, feu: 20, eau: 25, air: 5 }
    },
    moves: ['morsure_royale', 'guerison_bouftou', 'morsure_de_guerre', 'cuirasse_laineuse'],
    familiar: { bonusType: 'combat', bonusStat: 'hp', min: 5, max: 50 },
    role: ['farming','défense']
}


// ═══════════════════════════════════════════════════════
// EVENT PIOU
// ═══════════════════════════════════════════════════════
monsters.piouBleu = {
    id: 'piouBleu',
    name: 'Piou Bleu',
    image: 'img/monstres/sprites/piouBleu.png',
    rarity: 'rare',
    tier: 'normal',
    bst: {
        hp: 81, atk: 60, spd: 100,
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
        hp: 81, atk: 60, spd: 100,
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
        hp: 81, atk: 60, spd: 100,
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
        hp: 81, atk: 60, spd: 100,
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
        hp: 81, atk: 60, spd: 100,
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
        hp: 81, atk: 60, spd: 100,
        res: {neutre: 0, terre: 0, feu: 17, eau: 17, air: 0 }
    },
    moves: ['picore'],
    familiar: { bonusType: 'combat', bonusStat: 'spd', min: 1, max: 15 },
    role: ['combat']
}