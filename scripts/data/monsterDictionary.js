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
        res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 },
        // Stats critiques (defaults si absent : critChance=5, critDamagePct=50, res.crit=0)
        critChance: 5, critDamagePct: 50,
        // res.crit : résistance critique — réduit le bonus de dégâts critiques reçus
    },
    // Format simple : tableau de sorts → ordre aléatoire au spawn (max 4 tirés si + de 4)
    moves: ['sort_A', 'sort_B', 'sort_C'],

    // Format avancé : pool (tirés aléatoirement) + fixed (toujours en dernier, dans l'ordre)
    // Le nb de slots aléatoires = 4 - fixed.length
    // Exemples :
    //   { pool: ['C','D','E'], fixed: ['A','B'] }  → [random, random, A, B]
    //   { pool: ['D','E'],     fixed: ['A','B','C'] } → [random, A, B, C]
    //   { fixed: ['A','B','C','D'] }               → [A, B, C, D]  (aucun aléa)
    moves: { pool: ['sort_C', 'sort_D'], fixed: ['sort_A', 'sort_B'] },
}
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
//     moves: ['', '']
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
}
// #endregion

// ═══════════════════════════════════════════════════════
// #region EVENT PIOUS 10-15
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
}

// ===============================================================
// DONJON TOURNESOL
// ===============================================================
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
}
// #endregion

// ===============================================================
// #region PLAGE ASTRUB = Zone niveau 10 - 30
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
}


// ===============================================================
// DONJON MOUSSE
// ===============================================================
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
}
// #endregion

// ===============================================================
// #region EVENT FORET ASTRUB 20 - 30
// ===============================================================
monsters.milimulou = {
    id: 'milimulou',
    name: 'Milimulou',
    image: 'img/monstres/Events/milimulou.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 180, atk: 90, spd: 100,
        res: {neutre: 26, terre: 0, feu: 16, eau: -9, air: -19 }},
    moves: ['flair','deboyautage']
}
monsters.prespic = {
    id: 'prespic',
    name: 'Prespic',
    image: 'img/monstres/Events/prespic.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 150, atk: 90, spd: 100,
        res: {neutre: -9, terre: -14, feu: -19, eau: -9, air: -14 }},
    moves: ['moquerie','cache_cache']
}
monsters.sanglier = {
    id: 'sanglier',
    name: 'Sanglier',
    image: 'img/monstres/Events/sanglier.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 170, atk: 88, spd: 100,
        res: {neutre: 6, terre: 16, feu: -14, eau: 0, air: 6 }},
    moves: ['perce_vessie','charge_forcee']
}
monsters.ecurouille = {
    id: 'ecurouille',
    name: 'Écurouille',
    image: 'img/monstres/Events/ecurouille.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 140, atk: 90, spd: 100,
        res: {neutre: -14, terre: -9, feu: 6, eau: 11, air: 16 }},
    moves: ['taie_de_gland','rafale_venteuse']
}
monsters.hommeOurs = {
    id: 'hommeOurs',
    name: 'Homme-Ours',
    image: 'img/monstres/Events/hommeOurs.png',
    rarity: 'peu_commun',
    tier: 'elite',
    bst: {
        hp: 300, atk: 100, spd: 100,
        res: {neutre: 20, terre: 15, feu: 15, eau: 15, air: 15 }},
    moves: ['rage_de_Ours','griffe_de_ours']
}

// #endregion

// ===============================================================
// #region TAINELA = Zone niveau 20 - 40

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
}

// ===============================================================
// DONJON BOUFTOU
// ===============================================================
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
}
// #endregion

monsters.Rathrosk = {
    id: 'Rathrosk',
    name: 'Rathrosk',
    image: 'img/monstres/Raids/Rathrosk.png',
    rarity: 'legendaire',
    tier: 'boss',
    bst: {
        hp: 4000, atk: 280, spd: 105,
        res: {neutre: 25, terre: 25, feu: 25, eau: 25, air: 25}
    },
    moves: ['souffle_de_rathrosk','queue_du_dragon','regain_de_vie'],
}

// ===============================================================
// #region EVENT BIBLOPS 25-30
// ===============================================================
monsters.biblop_coco = {
    id: 'biblop_coco',
    name: 'Biblop Coco',
    image: 'img/monstres/Events/biblop_coco.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 210, atk: 70, spd: 100,
        res: {neutre: 15, terre: -62, feu: 15, eau: 15, air: 50 }},
    moves: ['bibloperie_air','biblopiment_air']
}
monsters.biblop_reinette = {
    id: 'biblop_reinette',
    name: 'Biblop Reinette',
    image: 'img/monstres/Events/biblop_reinette.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 210, atk: 70, spd: 100,
        res: {neutre: 15, terre: 50, feu: 15, eau: 15, air: -62 }},
    moves: ['bibloperie_terre','biblopiment_terre']
}
monsters.biblop_griotte = {
    id: 'biblop_griotte',
    name: 'Biblop Griotte',
    image: 'img/monstres/Events/biblop_griotte.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 210, atk: 70, spd: 100,
        res: {neutre: 15, terre: 15, feu: 50, eau: -62, air: 15 }},
    moves: ['bibloperie_feu','biblopiment_feu']
}
monsters.biblop_indigo = {
    id: 'biblop_indigo',
    name: 'Biblop Indigo',
    image: 'img/monstres/Events/biblop_indigo.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 210, atk: 70, spd: 100,
        res: {neutre: 15, terre: 15, feu: -62, eau: 50, air: 15 }},
    moves: ['bibloperie_eau','biblopiment_eau']
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
    ownerId: 'scarabossDoree'
}
monsters.scarabossDoree = {
    id: 'scarabossDoree',
    name: 'Scaraboss Doree',
    image: 'img/monstres/sprites/scarabossDoree.png',
    rarity: 'rare',
    tier: 'boss',
    bst: {
        hp: 2000, atk: 280, spd: 105,
        res: {neutre: 25, terre: 25, feu: 25, eau: 25, air: 25}
    },
    moves: ['picoti', 'naissance', 'premier_soins', 'expulsion'],
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
        hp: 1600, atk: 500, spd: 110,
        res: {neutre: 100, terre: 50, feu: 50, eau: 50, air: 50 }
    },
    moves: ['kwakoukas_kwayal', 'wakpot_kwayal', 'kwabolition', 'kwarmee_kwayal'],
}
// #endregion

// ═══════════════════════════════════════════════════════
// #region BLOP — Zone niveau 50-70
monsters.blopCoco = {
    id: 'blopCoco',
    name: 'Blop Coco',
    image: 'img/monstres/sprites/blopCoco.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 600, atk: 250, spd: 100,
        res: {neutre: 15, terre: -62, feu: 15, eau: 15, air: 50 }},
    moves: ['bibloperie_air','biblopiment_air']
}
monsters.blopGriotte = {
    id: 'blopGriotte',
    name: 'Blop Griotte',
    image: 'img/monstres/sprites/blopGriotte.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 600, atk: 250, spd: 100,
        res: {neutre: 15, terre: 15, feu: 50, eau: -62, air: 15 }},
    moves: ['bibloperie_feu','biblopiment_feu']
}
monsters.blopIndigo = {
    id: 'blopIndigo',
    name: 'Blop Indigo',
    image: 'img/monstres/sprites/blopIndigo.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 600, atk: 250, spd: 100,
        res: {neutre: 15, terre: 15, feu: -62, eau: 50, air: 15 }},
    moves: ['bibloperie_eau','biblopiment_eau']
}
monsters.blopReinette = {
    id: 'blopReinette',
    name: 'Blop Reinette',
    image: 'img/monstres/sprites/blopReinette.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 600, atk: 250, spd: 100,
        res: {neutre: 15, terre: 50, feu: 15, eau: 15, air: -62 }},
    moves: ['bibloperie_terre','biblopiment_terre']
}
monsters.blopignon = {
    id: 'blopignon',
    name: 'Blopignon',
    image: 'img/monstres/sprites/blopignon.png',
    rarity: 'peu_commun',
    tier: 'normal',
    bst: {
        hp: 500, atk: 250, spd: 100,
        res: {neutre: 21, terre: -19, feu: -14, eau: 0, air: 26 }},
    moves: ['bloblo', 'blopiction', 'bloprojection']
}
monsters.tronkoBlop = {
    id: 'tronkoBlop',
    name: 'Tronko Blop',
    image: 'img/monstres/sprites/tronkoBlop.png',
    rarity: 'peu_commun',
    tier: 'normal',
    bst: {
        hp: 600, atk: 250, spd: 100,
        res: {neutre: 0, terre: 41, feu: 31, eau: -9, air: -24 }},
    moves: ['blopsoin', 'blopzone']
}
monsters.gloutoBlop = {
    id: 'gloutoBlop',
    name: 'Glouto Blop',
    image: 'img/monstres/sprites/gloutoBlop.png',
    rarity: 'peu_commun',
    tier: 'elite',
    bst: {
        hp: 600, atk: 250, spd: 100,
        res: {neutre: 21, terre: -9, feu: -24, eau: 26, air: 11 }},
    moves: ['gloutage']
}
monsters.blopCocoRoyal = {
    id: 'blopCocoRoyal',
    name: 'Blop Coco Royal',
    image: 'img/monstres/sprites/blopCocoRoyal.png',
    rarity: 'rare',
    tier: 'boss',
    bst: {
        hp: 2800, atk: 400, spd: 100,
        res: {neutre: -15, terre: -15, feu: -15, eau: -15, air: 95 }
    },
    moves: ['blotravail_Royal', 'blopunition_Royale_air', 'blotection_air']
}
monsters.blopGriotteRoyal = {
    id: 'blopGriotteRoyal',
    name: 'Blop Griotte Royal',
    image: 'img/monstres/sprites/blopGriotteRoyal.png',
    rarity: 'rare',
    tier: 'boss',
    bst: {
        hp: 2800, atk: 400, spd: 100,
        res: {neutre: -15, terre: -15, feu: 95, eau: -15, air: -15 }
    },
    moves: ['blotravail_Royal', 'blopunition_Royale_feu', 'blotection_feu']
}
monsters.blopIndigoRoyal = {
    id: 'blopIndigoRoyal',
    name: 'Blop Indigo Royal',
    image: 'img/monstres/sprites/blopIndigoRoyal.png',
    rarity: 'rare',
    tier: 'boss',
    bst: {
        hp: 2800, atk: 400, spd: 100,
        res: {neutre: -15, terre: -15, feu: -15, eau: 95, air: -15 }
    },
    moves: ['blotravail_Royal', 'blopunition_Royale_eau', 'blotection_eau']
}
monsters.blopReinetteRoyal = {
    id: 'blopReinetteRoyal',
    name: 'Blop Reinette Royal',
    image: 'img/monstres/sprites/blopReinetteRoyal.png',
    rarity: 'rare',
    tier: 'boss',
    bst: {
        hp: 2800, atk: 400, spd: 100,
        res: {neutre: -15, terre: 95, feu: -15, eau: -15, air: -15 }
    },
    moves: ['blotravail_Royal', 'blopunition_Royale_terre', 'blotection_terre']
}
// #endregion

// ═══════════════════════════════════════════════════════
// #region EVENT ROBOTS 55-65
// ═══════════════════════════════════════════════════════
monsters.robionicle = {
    id: 'robionicle',
    name: 'Robionicle',
    image: 'img/monstres/Events/robionicle.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 740, atk: 135, spd: 100,
        res: {neutre: 40, terre: -20, feu: 10, eau: 30, air: 10 }},
    moves: ['blast','turbine']
}
monsters.robotFleau = {
    id: 'robotFleau',
    name: 'Robot Fleau',
    image: 'img/monstres/Events/robotFleau.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 630, atk: 135, spd: 100,
        res: {neutre: 20, terre: 30, feu: -20, eau: 30, air: 10 }},
    moves: ['micro_onde','macro_onde']
}
monsters.robotPoussePousse = {
    id: 'robotPoussePousse',
    name: 'Robot Pousse-Pousse',
    image: 'img/monstres/Events/robotPoussePousse.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 610, atk: 135, spd: 100,
        res: {neutre: 20, terre: 20, feu: 30, eau: -10, air: -20 }},
    moves: ['pousse_moi','pousse_toi']
}
monsters.malleOutillee = {
    id: 'malleOutillee',
    name: 'Malle Outillée',
    image: 'img/monstres/Events/malleOutillee.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 570, atk: 135, spd: 100,
        res: {neutre: 40, terre: 10, feu: 10, eau: 10, air: 10 }},
    moves: ['construction']
}

// #endregion

// ═══════════════════════════════════════════════════════
// #region EVENT DOPEULS 55-70
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
    moves: ['cubitus_du_dopeul', 'molosse_du_dopeul']
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
}
// #endregion

// ═══════════════════════════════════════════════════════
// #region RAID GELAX — Zone niveau 55–65
// ═══════════════════════════════════════════════════════
monsters.gelee_fraise = {
    id: 'gelee_fraise',
    name: 'Gelée Fraise',
    image: 'img/monstres/Raids/gelee_fraise.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 600, atk: 250, spd: 100,
        res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }},
    moves: ['Gelpikes', 'Fraise_Os','Tartinade']
}
monsters.gelee_bleuet = {
    id: 'gelee_bleuet',
    name: 'Gelée Bleuet',
    image: 'img/monstres/Raids/gelee_bleuet.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 500, atk: 250, spd: 100,
        res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }},
    moves: ['Gelpikes', 'Bleuet_Os','Tartinade']
}
monsters.gelee_menthe = {
    id: 'gelee_menthe',
    name: 'Gelée Menthe',
    image: 'img/monstres/Raids/gelee_menthe.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 500, atk: 250, spd: 100,
        res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }},
    moves: ['Gelpikes', 'Menthe_Os','Tartinade']
}
monsters.gelee_citron = {
    id: 'gelee_citron',
    name: 'Gelée Citron',
    image: 'img/monstres/Raids/gelee_citron.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 500, atk: 250, spd: 100,
        res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }},
    moves: ['Gelpikes', 'Citron_Os','Tartinade']
}
monsters.gelee_fraise_royale = {
    id: 'gelee_fraise_royale',
    name: 'Gelée Fraise Royale',
    image: 'img/monstres/Raids/gelee_fraise_royale.png',
    rarity: 'rare',
    tier: 'boss',
    bst: {
        hp: 2000, atk: 400, spd: 100,
        res: {neutre: 70, terre: 70, feu: -10, eau: 70, air: 70 }},
    moves: ['Gelifiant', 'Royale_Fraise_Os','Tartinade']
}
monsters.gelee_bleuet_royale = {
    id: 'gelee_bleuet_royale',
    name: 'Gelée Bleuet Royale',
    image: 'img/monstres/Raids/gelee_bleuet_royale.png',
    rarity: 'rare',
    tier: 'boss',
    bst: {
        hp: 2000, atk: 400, spd: 100,
        res: {neutre: 70, terre: 70, feu: 70, eau: -10, air: 70 }},
    moves: ['Isometrie', 'Royale_Bleuet_Os','Tartinade']
}
monsters.gelee_menthe_royale = {
    id: 'gelee_menthe_royale',
    name: 'Gelée Menthe Royale',
    image: 'img/monstres/Raids/gelee_menthe_royale.png',
    rarity: 'rare',
    tier: 'boss',
    bst: {
        hp: 2000, atk: 400, spd: 100,
        res: {neutre: 70, terre: -10, feu: 70, eau: 70, air: 70 }},
    moves: ['Pik_assaut', 'Royale_Menthe_Os','Tartinade']
}
monsters.gelee_citron_royale = {
    id: 'gelee_citron_royale',
    name: 'Gelée Citron Royale',
    image: 'img/monstres/Raids/gelee_citron_royale.png',
    rarity: 'rare',
    tier: 'boss',
    bst: {
        hp: 2000, atk: 400, spd: 100,
        res: {neutre: 70, terre: 70, feu: 70, eau: 70, air: -10 }},
    moves: ['Fixation_Beton', 'Royale_Citron_Os','Tartinade']
}
// #endregion

// ═══════════════════════════════════════════════════════
// #region MANTISCORE — Zone niveau 60-80
monsters.ouroboulos = {
    id: 'ouroboulos',
    name: 'Ouroboulos',
    image: 'img/monstres/sprites/ouroboulos.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 800, atk: 250, spd: 100,
        res: {neutre: 26, terre: 16, feu: 21, eau: -14, air: -24 }
    },
    moves: ['Sablacane', 'Roulo-Boulos', 'Carapassable']
}
monsters.scordionBleu = {
    id: 'scordionBleu',
    name: 'Scordion Bleu',
    image: 'img/monstres/sprites/scordionBleu.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 800, atk: 250, spd: 100,
        res: {neutre: 26, terre: 16, feu: 21, eau: -14, air: -24 }
    },
    moves: ['Pince_pattes', 'Dard_Empoisonne', 'Creuse_sable']
}
monsters.fennex = {
    id: 'fennex',
    name: 'Fennex',
    image: 'img/monstres/sprites/fennex.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 800, atk: 250, spd: 100,
        res: {neutre: 6, terre: 16, feu: -24, eau: -19, air: 11 }
    },
    moves: ['Reconnaissance', 'Entrave_Sableuse', 'Enragement_Motivant']
}
monsters.leolhyene = {
    id: 'leolhyene',
    name: 'Léolhyène',
    image: 'img/monstres/sprites/leolhyene.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 800, atk: 250, spd: 100,
        res: {neutre: 24, terre: -21, feu: 9, eau: -9, air: 34 }
    },
    moves: ['Sirocco', 'Mort_sure', 'Hyaignement']
}
monsters.boulepique = {
    id: 'boulepique',
    name: 'Boulepique',
    image: 'img/monstres/sprites/boulepique.png',
    rarity: 'peu_commun',
    tier: 'elite',
    bst: {
        hp: 800, atk: 250, spd: 100,
        res: {neutre: 11, terre: 1, feu: 21, eau: 16, air: 6 }
    },
    moves: ['Lance-boulettes', 'Pique_rate', 'Durcissement']
}
monsters.mantiscore = {
    id: 'mantiscore',
    name: 'Mantiscore',
    image: 'img/monstres/sprites/mantiscore.png',
    rarity: 'rare',
    tier: 'boss',
    bst: {
        hp: 3500, atk: 450, spd: 100,
        res: {neutre: 42, terre: 27, feu: 18, eau: 10, air: 33 }
    },
    moves: ['darmocles', 'force_Poigne', 'tombeau_du_desert', 'garde_bouclier']
}
// #endregion

// ═══════════════════════════════════════════════════════
// #region DRAGOEUF — Zone niveau 70-90
monsters.dragoeufArdoise = {
    id: 'dragoeufArdoise',
    name: 'Dragoeuf Ardoise',
    image: 'img/monstres/sprites/dragoeufArdoise.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 800, atk: 250, spd: 100,
        res: {neutre: 17, terre: 12, feu: -10, eau: 22, air: 9 }
    },
    moves: ['Feuilletage', 'Fendage']
}
monsters.dragoeufArgile = {
    id: 'dragoeufArgile',
    name: 'Dragoeuf Argile',
    image: 'img/monstres/sprites/dragoeufArgile.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 800, atk: 250, spd: 100,
        res: {neutre: 17, terre: -10, feu: 9, eau: 12, air: 22 }
    },
    moves: ['Cataplasme', 'Engobage']
}
monsters.dragoeufCalcaire = {
    id: 'dragoeufCalcaire',
    name: 'Dragoeuf Calcaire',
    image: 'img/monstres/sprites/dragoeufCalcaire.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 800, atk: 250, spd: 100,
        res: {neutre: 17, terre: 22, feu: 12, eau: 9, air: -10 }
    },
    moves: ['Entartrage', 'Calcination']
}
monsters.dragoeufCharbon = {
    id: 'dragoeufCharbon',
    name: 'Dragoeuf Charbon',
    image: 'img/monstres/sprites/dragoeufCharbon.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 800, atk: 250, spd: 100,
        res: {neutre: 17, terre: 9, feu: 22, eau: -10, air: 12 }
    },
    moves: ['Crassier', 'Silicose']
}
monsters.dragoeufAlbatre = {
    id: 'dragoeufAlbatre',
    name: 'Dragoeuf Albâtre',
    image: 'img/monstres/sprites/dragoeufAlbatre.png',
    rarity: 'peu_commun',
    tier: 'elite',
    bst: {
        hp: 900, atk: 270, spd: 100,
        res: {neutre: 12, terre: 12, feu: 12, eau: 12, air: 12 }
    },
    moves: ['Dralbatre', 'Dragloméra']
}
monsters.draegnerys = {
    id: 'draegnerys',
    name: 'Draegnerys',
    image: 'img/monstres/sprites/draegnerys.png',
    rarity: 'rare',
    tier: 'boss',
    bst: {
        hp: 2500, atk: 400, spd: 120,
        res: {neutre: 12, terre: 8, feu: 17, eau: 10, air: 20 }
    },
    moves: ['Pepiniere', 'Knout', 'Drakaaris']
}
// #endregion

// ═══════════════════════════════════════════════════════
// #region ABRAKNYDE ANCESTRAL — Zone niveau 80-100
monsters.abrakneSombre = {
    id: 'abrakneSombre',
    name: 'Abrakne Sombre',
    image: 'img/monstres/sprites/abrakneSombre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 1000, atk: 270, spd: 100,
        res: {neutre: 15, terre: -25, feu: 25, eau: -15, air: 15 }
    },
    moves: ['Bond_affaiblissant', 'Abraknettoyage', 'Motivation_Sylvestre']
}
monsters.abraknydeSombre = {
    id: 'abraknydeSombre',
    name: 'Abraknyde Sombre',
    image: 'img/monstres/sprites/abraknydeSombre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 1000, atk: 270, spd: 100,
        res: {neutre: 20, terre: -5, feu: 25, eau: -5, air: 25 }
    },
    moves: ['Abrabranche', 'Branche_Paralysante', 'Ecrasement_Abraknydien']
}
monsters.araknotron = {
    id: 'araknotron',
    name: 'Araknotron',
    image: 'img/monstres/sprites/araknotron.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 1000, atk: 270, spd: 100,
        res: {neutre: 10, terre: -25, feu: 5, eau: -25, air: 5 }
    },
    moves: ['Lancer_d_Arakne_Morte', 'Complicite']
}
monsters.abraknydeVenerable = {
    id: 'abraknydeVenerable',
    name: 'Abraknyde Vénérable',
    image: 'img/monstres/sprites/abraknydeVenerable.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 1000, atk: 270, spd: 100,
        res: {neutre: 20, terre: 25, feu: -5, eau: 25, air: -5 }
    },
    moves: ['Ecrasement_Abraknydien', 'Abrakage', 'Ecorce_agressive', 'Reconstitution_Abraknydienne']
}
monsters.arakne_majeure = {
    id: 'arakne_majeure',
    name: 'Arakne Majeure',
    image: 'img/monstres/sprites/arakne_majeure.png',
    rarity: 'peu_commun',
    tier: 'elite',
    bst: {
        hp: 600, atk: 270, spd: 100,
        res: {neutre: -14, terre: -14, feu: 10, eau: 10, air: -14 }
    },
    moves: ['Ralentissement_Arakneen', 'Absorption_Sanguine'],
    ownerId: 'abraknydeAncestral'
}
monsters.abraknydeAncestral = {
    id: 'abraknydeAncestral',
    name: 'Abraknyde Ancestral',
    image: 'img/monstres/sprites/abraknydeAncestral.png',
    rarity: 'rare',
    tier: 'boss',
    bst: {
        hp: 4500, atk: 500, spd: 90,
        res: {neutre: 50, terre: 50, feu: -5, eau: 50, air: -5 }
    },
    moves: ['Branche_Paralysante', 'Morsure_Sylvestre', 'Reconstitution_Abraknydienne', 'Invocation_d_Arakne_Majeure']
}
// #endregion

// ═══════════════════════════════════════════════════════
// #region DRAGON COCHON — Zone niveau 90-110
monsters.cochonDeFarle = {
    id: 'cochonDeFarle',
    name: 'Cochon de Farle',
    image: 'img/monstres/sprites/cochonDeFarle.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 1200, atk: 270, spd: 100,
        res: {neutre: 50, terre: 50, feu: 12, eau: 12, air: -20 }
    },
    moves: ['Sucotement_Porcin']
}
monsters.donDorgan = {
    id: 'donDorgan',
    name: 'Don Dorgan',
    image: 'img/monstres/sprites/donDorgan.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 1300, atk: 270, spd: 100,
        res: {neutre: 10, terre: -20, feu: 50, eau: -20, air: -20 }
    },
    moves: ['Menotage', 'Charge Sanguinaire']
}
monsters.donDussAng = {
    id: 'donDussAng',
    name: "Don Duss'Ang",
    image: 'img/monstres/sprites/donDussAng.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 1300, atk: 270, spd: 100,
        res: {neutre: 20, terre: -20, feu: -20, eau: 20, air: 20 }
    },
    moves: ['Vampirisation_Cochonne', 'Tire-Bouffon', 'Perfusion']
}
monsters.porsalu = {
    id: 'porsalu',
    name: 'Porsalu',
    image: 'img/monstres/sprites/porsalu.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 1200, atk: 270, spd: 100,
        res: {neutre: 25, terre: 15, feu: -25, eau: -20, air: 60 }
    },
    moves: ['Fleche_Renifleuse', 'Fleche_Douloureuse', 'Exhalation_Porcine']
}
monsters.gorgouille = {
    id: 'gorgouille',
    name: 'Gorgouille',
    image: 'img/monstres/sprites/gorgouille.png',
    rarity: 'rare',
    tier: 'elite',
    fixedLevel: 100,
    bst: {
        hp: 5000, atk: 600, spd: 100,
        res: {neutre: -5, terre: -5, feu: -5, eau: 35, air: 35 }
    },
    moves: ['Oshi-Zumo', 'Yotsu-Zumo']
}
monsters.dragonCochon = {
    id: 'dragonCochon',
    name: 'Dragon Cochon',
    image: 'img/monstres/sprites/dragonCochon.png',
    rarity: 'rare',
    tier: 'boss',
    bst: {
        hp: 2500, atk: 1000, spd: 100,
        res: {neutre: 35, terre: 35, feu: 35, eau: -5, air: -5 }
    },
    moves: { pool: ['Ecrasement_Handicapant', 'Croutage', 'Immobilisation'], fixed: ['etourderie_Mortelle'] },
}
// #endregion

// ═══════════════════════════════════════════════════════
// #region TOURBES DU ROISSINGUE 100-110
monsters.LAouassingue = {
    id: 'LAouassingue',
    name: 'La Ouassingue',
    image: 'img/monstres/Raids/LAouassingue.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 800, atk: 120, spd: 100,
        res: {neutre: 20, terre: 20, feu: 10, eau: -5, air: -15 }},
    moves: ['oblativite','serpilliere','reconstitution_cellulaire']
}
monsters.LEouassingue = {
    id: 'LEouassingue',
    name: 'Le Ouassingue',
    image: 'img/monstres/Raids/LEouassingue.png',
    rarity: 'commun',
    tier: 'normal',
    bst: {
        hp: 800, atk: 120, spd: 100,
        res: {neutre: -5, terre: -5, feu: 20, eau: -15, air: 10 }},
    moves: ['equarrissage','interversion','reconstitution_cellulaire']
}
monsters.tourbassingue = {
    id: 'tourbassingue',
    name: 'Tourbassingue',
    image: 'img/monstres/Raids/tourbassingue.png',
    rarity: 'peu_commun',
    tier: 'normal',
    bst: {
        hp: 1500, atk: 250, spd: 100,
        res: {neutre: 20, terre: 15, feu: 33, eau: -27, air: -11 }},
    moves: ['tourbe_reparatrice','tourbe_malveillante']
}
monsters.bourbassingue = {
    id: 'bourbassingue',
    name: 'Bourbassingue',
    image: 'img/monstres/Raids/bourbassingue.png',
    rarity: 'peu_commun',
    tier: 'normal',
    bst: {
        hp: 1300, atk: 280, spd: 100,
        res: {neutre: 13, terre: 35, feu: -31, eau: 15, air: 9 }},
    moves: ['boue_sirupeuse','bourbier']
}
monsters.roissingue = {
    id: 'roissingue',
    name: 'Roissingue',
    image: 'img/monstres/Raids/roissingue.png',
    rarity: 'rare',
    tier: 'boss',
    bst: {
        hp: 5300, atk: 750, spd: 100,
        res: {neutre: 22, terre: 12, feu: -30, eau: 41, air: 5 }},
    moves: ['retour_du_roi','depouillage','dechaussage']
}
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
// }
// #endregion

// ═══════════════════════════════════════════════════════
// #region KRALAMOURE GEANT 180
monsters.tentaculePrimaire = {
    id: 'tentaculePrimaire',
    name: 'Tentacule Primaire',
    image: 'img/monstres/Raids/tentaculePrimaire.png',
    rarity: 'rare',
    tier: 'elite',
    bst: {
        hp: 250, atk: 520, spd: 100,
        res: {neutre: 95, terre: 95, feu: 95, eau: 95, air: 0 }},
    moves: ['motivation_naturelle','kraken_primaire']
}
monsters.tentaculeSecondaire = {
    id: 'tentaculeSecondaire',
    name: 'Tentacule Secondaire',
    image: 'img/monstres/Raids/tentaculeSecondaire.png',
    rarity: 'rare',
    tier: 'elite',
    bst: {
        hp: 250, atk: 520, spd: 100,
        res: {neutre: 95, terre: 95, feu: 95, eau: 0, air: 95 }},
    moves: ['empoisonnement_tentaculaire','kraken_secondaire']
}
monsters.tentaculeTertiaire = {
    id: 'tentaculeTertiaire',
    name: 'Tentacule Tertiaire',
    image: 'img/monstres/Raids/tentaculeTertiaire.png',
    rarity: 'rare',
    tier: 'elite',
    bst: {
        hp: 250, atk: 520, spd: 100,
        res: {neutre: 95, terre: 95, feu: 0, eau: 95, air: 95 }},
    moves: ['malediction_tentaculaire','kraken_tertiaire']
}
monsters.tentaculeQuartenaire = {
    id: 'tentaculeQuartenaire',
    name: 'Tentacule Quartenaire',
    image: 'img/monstres/Raids/tentaculeQuartenaire.png',
    rarity: 'rare',
    tier: 'elite',
    bst: {
        hp: 250, atk: 520, spd: 100,
        res: {neutre: 95, terre: 0, feu: 95, eau: 95, air: 95 }},
    moves: ['paralysie_tentaculaire','kraken_quartenaire']
}
monsters.kralamoureGeant = {
    id: 'kralamoureGeant',
    name: 'Kralamoure Geant',
    image: 'img/monstres/Raids/KralamourGeant.png',
    rarity: 'rare',
    tier: 'boss',
    bst: {
        hp: 5300, atk: 2500, spd: 100,
        res: {neutre: 95, terre: 95, feu: 95, eau: 95, air: 95 }},
    moves: ['kracheau_immobilisant','vulnerabilite_de_la_tourbiere','kraken','tourbe_ecrasante'],
}
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
// }
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
//     moves: ['', '']
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
//     moves: ['', '']
// }


// ═══════════════════════════════════════════════════════
// DONJON GLOURCELESTE
// ═══════════════════════════════════════════════════════
// monsters.glourceleste = {
//     id: 'glourceleste',
//     name: 'Glourcéleste',
//     image: 'img/monstres/sprites/glourceleste.png',
//     rarity: 'rare',
//     tier: 'boss',
//     bst: {
//         hp: 1, atk: 1, spd: 100,
//         res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
//     },
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
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
//     moves: ['', '']
// }
// #endregion



// ═══════════════════════════════════════════════════════












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
}
// #endregion


