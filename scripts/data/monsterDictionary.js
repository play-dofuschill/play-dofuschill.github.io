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

monsters.poulpor = {
    id: 'poulpor',
    name: 'Poulpor',
    image: 'images/monsters/Poulpor.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1, atk: 700, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['double_tranchant']
}
monsters.amas_de_tentacules = {
    id: 'amas_de_tentacules',
    name: 'Amas de Tentacules',
    image: 'images/monsters/Amas_de_Tentacules.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.germinial = {
    id: 'germinial',
    name: 'Germinial',
    image: 'images/monsters/Germinial.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1, atk: 800, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['morsure_putride', 'langue_morte']
}

monsters.bourgeon_de_dathura = {
    id: 'bourgeon_de_dathura',
    name: 'Bourgeon de Dathura',
    image: 'images/monsters/Bourgeon_de_Dathura.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.sousouris_grise = {
    id: 'sousouris_grise',
    name: 'Sousouris Grise',
    image: 'images/monsters/Sousouris_Grise.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['morsure']
}

monsters.flammeche_feu = {
    id: 'flammeche_feu',
    name: 'Flammèche Feu',
    image: 'images/monsters/Flammèche_Feu.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 9, atk: 100, spd: 100, res: { neutre: 100, terre: 0, feu: 100, eau: 0, air: 0 } },
    moves: ['elemental_spear', 'bomball']
}

monsters.flammeche_eau = {
    id: 'flammeche_eau',
    name: 'Flammèche Eau',
    image: 'images/monsters/Flammèche_Eau.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 9, atk: 100, spd: 100, res: { neutre: 100, terre: 0, feu: 0, eau: 100, air: 0 } },
    moves: ['elemental_speareau', 'bomballeau']
}

monsters.flammeche_terre = {
    id: 'flammeche_terre',
    name: 'Flammèche Terre',
    image: 'images/monsters/Flammèche_Terre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 9, atk: 100, spd: 100, res: { neutre: 100, terre: 100, feu: 0, eau: 0, air: 0 } },
    moves: ['elemental_spearterre', 'bomballterre']
}

monsters.flammeche_air = {
    id: 'flammeche_air',
    name: 'Flammèche Air',
    image: 'images/monsters/Flammèche_Air.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 9, atk: 100, spd: 100, res: { neutre: 100, terre: 0, feu: 0, eau: 0, air: 100 } },
    moves: ['elemental_spearair', 'bomballair']
}

monsters.tofu_chimerique = {
    id: 'tofu_chimerique',
    name: 'Tofu Chimérique',
    image: 'images/monsters/Tofu_Chimérique.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 15, atk: 5, spd: 100, res: { neutre: 0, terre: -10, feu: -5, eau: 0, air: 5 } },
    moves: ['beco_du_tofu']
}

monsters.feu_vif = {
    id: 'feu_vif',
    name: 'Feu Vif',
    image: 'images/monsters/Feu_Vif.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 15, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 10 } },
    moves: ['brulure_legere']
}

monsters.feu_de_joie = {
    id: 'feu_de_joie',
    name: 'Feu de Joie',
    image: 'images/monsters/Feu_de_Joie.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 15, atk: 0, spd: 100, res: { neutre: 0, terre: 10, feu: 0, eau: 0, air: 0 } },
    moves: ['brulure_legere']
}

monsters.feu_furieux = {
    id: 'feu_furieux',
    name: 'Feu Furieux',
    image: 'images/monsters/Feu_Furieux.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 15, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 10, air: 0 } },
    moves: ['brulure_legere']
}

monsters.feu_follet = {
    id: 'feu_follet',
    name: 'Feu Follet',
    image: 'images/monsters/Feu_Follet.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 15, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 10, eau: 0, air: 0 } },
    moves: ['brulure_legere']
}

monsters.krokille_de_mer = {
    id: 'krokille_de_mer',
    name: 'Krokille de Mer',
    image: 'images/monsters/Krokille_de_Mer.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 15, atk: 0, spd: 100, res: { neutre: 75, terre: 75, feu: 75, eau: 75, air: 75 } },
    moves: ['crachat_sale']
}

monsters.rose_vaporeuse = {
    id: 'rose_vaporeuse',
    name: 'Rose Vaporeuse',
    image: 'images/monsters/Rose_Vaporeuse.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 18, atk: 3, spd: 100, res: { neutre: -4, terre: -10, feu: -3, eau: -10, air: -4 } },
    moves: ['empoisonnement', 'effleurement']
}

monsters.pissenlit_miroitant = {
    id: 'pissenlit_miroitant',
    name: 'Pissenlit Miroitant',
    image: 'images/monsters/Pissenlit_Miroitant.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 18, atk: 0, spd: 100, res: { neutre: -25, terre: 0, feu: -25, eau: -10, air: -4 } },
    moves: ['herbeSauvage']
}

monsters.petit_gloot = {
    id: 'petit_gloot',
    name: 'Petit Gloot',
    image: 'images/monsters/Petit_Gloot.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 18, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 10, air: -20 } },
    moves: ['glougloutte']
}

monsters.tournesol_nebuleux = {
    id: 'tournesol_nebuleux',
    name: 'Tournesol Nébuleux',
    image: 'images/monsters/Tournesol_Nébuleux.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 21, atk: 0, spd: 100, res: { neutre: 10, terre: 0, feu: -10, eau: 0, air: -15 } },
    moves: ['poisonSauvage']
}

monsters.boufton_palichon = {
    id: 'boufton_palichon',
    name: 'Boufton Pâlichon',
    image: 'images/monsters/Boufton_Pâlichon.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 21, atk: 4, spd: 100, res: { neutre: 0, terre: -4, feu: -5, eau: -5, air: 1 } },
    moves: ['machouillage']
}

monsters.boufton_orageux = {
    id: 'boufton_orageux',
    name: 'Boufton Orageux',
    image: 'images/monsters/Boufton_Orageux.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 21, atk: 4, spd: 100, res: { neutre: -3, terre: -10, feu: -8, eau: -8, air: -2 } },
    moves: ['mordillement']
}

monsters.plikplok = {
    id: 'plikplok',
    name: 'Plikplok',
    image: 'images/monsters/Plikplok.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 21, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: -15, eau: 15, air: 0 } },
    moves: ['plouf']
}

monsters.bouftou_nuageux = {
    id: 'bouftou_nuageux',
    name: 'Bouftou Nuageux',
    image: 'images/monsters/Bouftou_Nuageux.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 24, atk: 3, spd: 100, res: { neutre: 10, terre: -10, feu: -15, eau: 0, air: 0 } },
    moves: ['mordillement']
}

monsters.grand_splatch = {
    id: 'grand_splatch',
    name: 'Grand Splatch',
    image: 'images/monsters/Grand_Splatch.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 24, atk: 0, spd: 100, res: { neutre: 0, terre: -10, feu: 0, eau: 20, air: 0 } },
    moves: ['splotch']
}

monsters.chakrobat = {
    id: 'chakrobat',
    name: 'Chakrobat',
    image: 'images/monsters/Chakrobat.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 24, atk: 0, spd: 100, res: { neutre: -10, terre: -4, feu: -4, eau: -5, air: 0 } },
    moves: ['souffle_celeste', 'particules_spirituelles']
}

monsters.chaferDebutant = {
    id: 'chaferDebutant',
    name: 'Chafer Débutant',
    image: 'images/monsters/Chafer_Débutant.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 28, atk: 5, spd: 100, res: { neutre: 10, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['petit_coup_du_Chafer']
}

monsters.bouftor_ethere = {
    id: 'bouftor_ethere',
    name: 'Bouftor Éthéré',
    image: 'images/monsters/Bouftor_Éthéré.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 28, atk: 9, spd: 100, res: { neutre: 0, terre: 0, feu: -10, eau: -10, air: -4 } },
    moves: ['morsure_du_bouftou', 'fureur_du_bouftou']
}

monsters.tigrimas = {
    id: 'tigrimas',
    name: 'Tigrimas',
    image: 'images/monsters/Tigrimas.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 28, atk: 10, spd: 100, res: { neutre: 2, terre: 0, feu: -10, eau: 2, air: 0 } },
    moves: ['reconstitution_celeste', 'lancer_de_feu_vif']
}

monsters.aminite = {
    id: 'aminite',
    name: 'Aminite',
    image: 'images/monsters/Aminite.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 28, atk: 45, spd: 100, res: { neutre: 20, terre: 0, feu: -10, eau: 10, air: -10 } },
    moves: ['coup_de_pileus', 'spore_tensia']
}

monsters.chaferEclaireur = {
    id: 'chaferEclaireur',
    name: 'Chafer Éclaireur',
    image: 'images/monsters/Chafer_Archer.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 32, atk: 13, spd: 100, res: { neutre: 0, terre: 10, feu: 0, eau: 0, air: 0 } },
    moves: ['fleche_de_feu']
}

monsters.chaferFurtif = {
    id: 'chaferFurtif',
    name: 'Chafer Furtif',
    image: 'images/monsters/Chafer_Furtif.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 32, atk: 8, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 10 } },
    moves: ['petit_coup_du_Chafer']
}

monsters.ronronchon = {
    id: 'ronronchon',
    name: 'Ronronchon',
    image: 'images/monsters/Ronronchon.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 32, atk: 10, spd: 100, res: { neutre: 0, terre: 0, feu: -10, eau: 2, air: -10 } },
    moves: ['ron_ron', 'invocation_de_feu_de_joie', 'ecrasement_du_ronronchon']
}

monsters.chaferPiquier = {
    id: 'chaferPiquier',
    name: 'Chafer Piquier',
    image: 'images/monsters/Chafer_Piquier.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 36, atk: 5, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 10, air: 0 } },
    moves: ['empalement']
}

monsters.sergentChafer = {
    id: 'sergentChafer',
    name: 'Sergent Chafer',
    image: 'images/monsters/Sergent_Chafer.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 36, atk: 30, spd: 100, res: { neutre: 0, terre: 0, feu: 10, eau: 0, air: 0 } },
    moves: ['petit_coup_du_Chafer']
}

monsters.tofu_malade = {
    id: 'tofu_malade',
    name: 'Tofu Malade',
    image: 'images/monsters/Tofu_Malade.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 44, atk: 44, spd: 100, res: { neutre: 0, terre: 0, feu: 6, eau: 0, air: -14 } },
    moves: ['beco_morveux', 'tentative_d_envol']
}

monsters.arakne_minuscule = {
    id: 'arakne_minuscule',
    name: 'Arakne Minuscule',
    image: 'images/monsters/Arakne_Minuscule.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 45, atk: 96, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['mandibules_toxiques']
}

monsters.arakne_malade = {
    id: 'arakne_malade',
    name: 'Arakne Malade',
    image: 'images/monsters/Arakne_Malade.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 49, atk: 44, spd: 100, res: { neutre: -9, terre: 6, feu: 1, eau: -9, air: 6 } },
    moves: ['frappe_morveuse', 'glaire_obscure']
}

monsters.piouBleu = {
    id: 'piouBleu',
    name: 'Piou Bleu',
    image: 'images/monsters/Piou_Bleu.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 49, atk: 44, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 25, air: 0 } },
    moves: ['picore']
}

monsters.piouRouge = {
    id: 'piouRouge',
    name: 'Piou Rouge',
    image: 'images/monsters/Piou_Rouge.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 49, atk: 44, spd: 100, res: { neutre: 0, terre: 0, feu: 25, eau: 0, air: 0 } },
    moves: ['picore']
}

monsters.piouVert = {
    id: 'piouVert',
    name: 'Piou Vert',
    image: 'images/monsters/Piou_Vert.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 49, atk: 44, spd: 100, res: { neutre: 0, terre: 25, feu: 0, eau: 0, air: 0 } },
    moves: ['picore']
}

monsters.piouJaune = {
    id: 'piouJaune',
    name: 'Piou Jaune',
    image: 'images/monsters/Piou_Jaune.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 49, atk: 44, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 25 } },
    moves: ['picore']
}

monsters.piouRose = {
    id: 'piouRose',
    name: 'Piou Rose',
    image: 'images/monsters/Piou_Rose.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 49, atk: 44, spd: 100, res: { neutre: 0, terre: 13, feu: 0, eau: 0, air: 13 } },
    moves: ['picore']
}

monsters.piouViolet = {
    id: 'piouViolet',
    name: 'Piou Violet',
    image: 'images/monsters/Piou_Violet.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 49, atk: 44, spd: 100, res: { neutre: 0, terre: 0, feu: 13, eau: 13, air: 0 } },
    moves: ['picore']
}

monsters.araknelle = {
    id: 'araknelle',
    name: 'Araknelle',
    image: 'images/monsters/Araknelle.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 49, atk: 13, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['frappe', 'invocation_d_arakne', 'invocation_d_araknelle']
}

monsters.kol_nenfan = {
    id: 'kol_nenfan',
    name: 'Kol\'nenfan',
    image: 'images/monsters/Kol_nenfan.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 49, atk: 500, spd: 100, res: { neutre: 40, terre: 40, feu: 40, eau: 40, air: 40 } },
    moves: ['gouter', 'attraction_enfantine']
}

monsters.koup_nenfan = {
    id: 'koup_nenfan',
    name: 'Koup\'nenfan',
    image: 'images/monsters/Koup_nenfan.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 49, atk: 38, spd: 100, res: { neutre: 40, terre: 40, feu: 40, eau: 40, air: 40 } },
    moves: ['coupage']
}

monsters.pet_nenfan = {
    id: 'pet_nenfan',
    name: 'Pet\'nenfan',
    image: 'images/monsters/Pet_nenfan.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 49, atk: 88, spd: 100, res: { neutre: 40, terre: 40, feu: 40, eau: 40, air: 40 } },
    moves: ['bombombe']
}

monsters.araknose = {
    id: 'araknose',
    name: 'Araknosé',
    image: 'images/monsters/Araknosé.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 49, atk: 44, spd: 100, res: { neutre: 6, terre: 0, feu: 1, eau: 1, air: -9 } },
    moves: ['toile_fragile', 'rejet_acide']
}

monsters.arakmute = {
    id: 'arakmute',
    name: 'Arakmuté',
    image: 'images/monsters/Arakmuté.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 49, atk: 44, spd: 100, res: { neutre: 0, terre: 0, feu: -14, eau: 6, air: 11 } },
    moves: ['jet_de_poussiere', 'regard_effrayant']
}

monsters.cadeau_anime = {
    id: 'cadeau_anime',
    name: 'Cadeau animé',
    image: 'images/monsters/Cadeau_animé.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 55, atk: 38, spd: 100, res: { neutre: -5, terre: 5, feu: 10, eau: -20, air: 10 } },
    moves: ['petit_paquet']
}

monsters.bomberfu = {
    id: 'bomberfu',
    name: 'Bomberfu',
    image: 'images/monsters/Bomberfu.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 66, atk: 100, spd: 100, res: { neutre: 0, terre: 5, feu: -10, eau: 0, air: 0 } },
    moves: ['detonation_du_poulailler']
}

monsters.kolerat_strubien = {
    id: 'kolerat_strubien',
    name: 'Kolérat Strubien',
    image: 'images/monsters/Kolérat.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 72, atk: 96, spd: 100, res: { neutre: -5, terre: -5, feu: -5, eau: -5, air: -5 } },
    moves: ['hypnose_brulante', 'morstrubien']
}

monsters.tofu_degenere = {
    id: 'tofu_degenere',
    name: 'Tofu Dégénéré',
    image: 'images/monsters/Tofu_Dégénéré.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 75, atk: 50, spd: 100, res: { neutre: 10, terre: 5, feu: -29, eau: -19, air: 30 } },
    moves: ['beco_rosif', 'fougue_tofuesque']
}

monsters.tofu_mutant = {
    id: 'tofu_mutant',
    name: 'Tofu Mutant',
    image: 'images/monsters/Tofu_Mutant.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 75, atk: 50, spd: 100, res: { neutre: 10, terre: 5, feu: -29, eau: -19, air: 30 } },
    moves: ['beco_rosif', 'fougue_tofuesque','beco_morveux', 'tentative_d_envol']
}

monsters.gardienneChampetre = {
    id: 'gardienneChampetre',
    name: 'Gardienne Champêtre',
    image: 'images/monsters/Gardienne_Champêtre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 90, atk: 64, spd: 100, res: { neutre: -9, terre: -9, feu: -14, eau: 16, air: 21 } },
    moves: ['protectiondesChamps', 'engrais']
}

monsters.larve_bleue = {
    id: 'larve_bleue',
    name: 'Larve Bleue',
    image: 'images/monsters/Larve_Bleue.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 90, atk: 64, spd: 100, res: { neutre: 1, terre: 6, feu: 6, eau: -9, air: -9 } },
    moves: ['postillon_handicapant', 'bulle_de_protection']
}

monsters.larve_verte = {
    id: 'larve_verte',
    name: 'Larve Verte',
    image: 'images/monsters/Larve_Verte.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 90, atk: 64, spd: 100, res: { neutre: 0, terre: 1, feu: -9, eau: 1, air: 6 } },
    moves: ['postillon_aveuglant', 'corps_spongieux']
}

monsters.larve_orange = {
    id: 'larve_orange',
    name: 'Larve Orange',
    image: 'images/monsters/Larve_Orange.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 90, atk: 64, spd: 100, res: { neutre: 1, terre: -9, feu: -9, eau: 21, air: 6 } },
    moves: ['bave_collante', 'dissuasion']
}

monsters.larve_verte_solitaire = {
    id: 'larve_verte_solitaire',
    name: 'Larve Verte Solitaire',
    image: 'images/monsters/Larve_Verte_Solitaire.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 90, atk: 63, spd: 100, res: { neutre: 6, terre: 5, feu: -10, eau: 6, air: 10 } },
    moves: ['larvement', 'retour_de_flamme']
}

monsters.larve_jaune = {
    id: 'larve_jaune',
    name: 'Larve Jaune',
    image: 'images/monsters/Larve_Jaune.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 90, atk: 64, spd: 100, res: { neutre: 0, terre: 6, feu: 16, eau: -9, air: 1 } },
    moves: ['bave_affaiblissante', 'postillon_cauterisant']
}

monsters.roseDemoniaque = {
    id: 'roseDemoniaque',
    name: 'Rose Démoniaque',
    image: 'images/monsters/Rose_Démoniaque.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 90, atk: 64, spd: 100, res: { neutre: 0, terre: -19, feu: 31, eau: -9, air: 6 } },
    moves: ['petalesEmpoisonnes', 'roseEpineuse']
}

monsters.pissenlit_diabolique = {
    id: 'pissenlit_diabolique',
    name: 'Pissenlit Diabolique',
    image: 'images/monsters/Pissenlit_Diabolique.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 90, atk: 64, spd: 100, res: { neutre: -9, terre: 16, feu: -9, eau: 0, air: 11 } },
    moves: ['herbeSauvage', 'zizou']
}

monsters.tournesolSauvage = {
    id: 'tournesolSauvage',
    name: 'Tournesol Sauvage',
    image: 'images/monsters/Tournesol_Sauvage.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 90, atk: 64, spd: 100, res: { neutre: 11, terre: 6, feu: -9, eau: 11, air: -14 } },
    moves: ['poisonSauvage', 'racinePivotante']
}

monsters.arakne = {
    id: 'arakne',
    name: 'Arakne',
    image: 'images/monsters/Arakne.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 90, atk: 64, spd: 100, res: { neutre: -9, terre: 1, feu: 11, eau: -14, air: 11 } },
    moves: ['frappe_ridicule', 'petite_toile']
}

monsters.pissenliDiabolique = {
    id: 'pissenliDiabolique',
    name: 'Pissenli Diabolique',
    image: 'images/monsters/Pissenlit_Diabolique.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 90, atk: 60, spd: 100, res: { neutre: -10, terre: 20, feu: -10, eau: 0, air: 15 } },
    moves: ['zizou', 'herbeSauvage']
}

monsters.pichonBlanc = {
    id: 'pichonBlanc',
    name: 'Pichon Blanc',
    image: 'images/monsters/Pichon_Blanc.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 90, atk: 64, spd: 100, res: { neutre: 10, terre: -9, feu: -9, eau: 10, air: 50 } },
    moves: ['bouffeedAir', 'onde_Enrageante']
}

monsters.pichonVert = {
    id: 'pichonVert',
    name: 'Pichon Vert',
    image: 'images/monsters/Pichon_Vert.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 90, atk: 64, spd: 100, res: { neutre: 10, terre: 50, feu: -9, eau: 10, air: -9 } },
    moves: ['reflux', 'onde_Enrageante']
}

monsters.pichonBleu = {
    id: 'pichonBleu',
    name: 'Pichon Bleu',
    image: 'images/monsters/Pichon_Bleu.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 90, atk: 64, spd: 100, res: { neutre: 10, terre: 10, feu: -9, eau: 50, air: -9 } },
    moves: ['vaguelette', 'resistivite']
}

monsters.pichonOrange = {
    id: 'pichonOrange',
    name: 'Pichon Orange',
    image: 'images/monsters/Pichon_Orange.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 90, atk: 64, spd: 100, res: { neutre: 10, terre: -9, feu: 50, eau: 10, air: -9 } },
    moves: ['Sable_Brulant', 'sel_Marin']
}

monsters.pichonKloune = {
    id: 'pichonKloune',
    name: 'Pichon Kloune',
    image: 'images/monsters/Pichon_Kloune.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 90, atk: 64, spd: 100, res: { neutre: 16, terre: 16, feu: 16, eau: 16, air: 16 } },
    moves: ['blag', 'klounerie']
}

monsters.champ_champ = {
    id: 'champ_champ',
    name: 'Champ Champ',
    image: 'images/monsters/Champ_Champ.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 90, atk: 64, spd: 100, res: { neutre: -14, terre: 0, feu: -9, eau: 21, air: 6 } },
    moves: ['champatate', 'champoisonnement']
}

monsters.moskito = {
    id: 'moskito',
    name: 'Moskito',
    image: 'images/monsters/Moskito.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 90, atk: 64, spd: 100, res: { neutre: 0, terre: 16, feu: 0, eau: 6, air: -14 } },
    moves: ['piqure', 'esquive_volante']
}

monsters.campagnoll = {
    id: 'campagnoll',
    name: 'Campagnoll',
    image: 'images/monsters/Campagnoll.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 90, atk: 64, spd: 100, res: { neutre: 11, terre: -9, feu: 6, eau: -9, air: 1 } },
    moves: ['gnoll_haut', 'rongement']
}

monsters.cadob_oum = {
    id: 'cadob_oum',
    name: 'Cadob\'Oum',
    image: 'images/monsters/Cadob_Oum.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 99, atk: 200, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.poutch = {
    id: 'poutch',
    name: 'Poutch',
    image: 'img/pnj/Poutch.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 50000, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['coupdepoutch']
}

monsters.poutch_ingball = {
    id: 'poutch_ingball',
    name: 'Poutch Ingball',
    image: 'images/monsters/Poutch_Ingball.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 50000, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['tuerie']
}

monsters.poutch_vil_smisse = {
    id: 'poutch_vil_smisse',
    name: 'Poutch Vil Smisse',
    image: 'images/monsters/Poutch_Vil_Smisse.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 50000, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.poutch_ombre = {
    id: 'poutch_ombre',
    name: 'Poutch Ombre',
    image: 'images/monsters/Poutch_Ombre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 50000, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.poutch_hyperscampe = {
    id: 'poutch_hyperscampe',
    name: 'Poutch Hyperscampe',
    image: 'images/monsters/Poutch_Hyperscampe.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 50000, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.poutch_sylargh = {
    id: 'poutch_sylargh',
    name: 'Poutch Sylargh',
    image: 'images/monsters/Poutch_Sylargh.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 50000, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.poutch_crane_rose = {
    id: 'poutch_crane_rose',
    name: 'Poutch Crâne Rose',
    image: 'images/monsters/Poutch_Crâne_Rose.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 50000, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.workette = {
    id: 'workette',
    name: 'Workette',
    image: 'images/monsters/Workette.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 100, atk: 50, spd: 100, res: { neutre: 10, terre: 50, feu: -10, eau: -10, air: 20 } },
    moves: ['baiser_de_kaliptus', 'implosion']
}

monsters.epouvanteur = {
    id: 'epouvanteur',
    name: 'Épouvanteur',
    image: 'images/monsters/epouvanteur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 110, atk: 64, spd: 100, res: { neutre: 1, terre: 0, feu: -9, eau: 11, air: 6 } },
    moves: ['fuyezPauvresFous', 'desherbant']
}

monsters.corbac_fantomatique = {
    id: 'corbac_fantomatique',
    name: 'Corbac Fantômatique',
    image: 'images/monsters/Corbac_Fantômatique.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 110, atk: 144, spd: 100, res: { neutre: 0, terre: -10, feu: 0, eau: 10, air: 0 } },
    moves: ['moquerie_fantomatique', 'replique_fantomatique']
}

monsters.marcassin_fantomatique = {
    id: 'marcassin_fantomatique',
    name: 'Marcassin Fantômatique',
    image: 'images/monsters/Marcassin_Fantômatique.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 110, atk: 144, spd: 100, res: { neutre: 0, terre: 10, feu: 0, eau: -10, air: 0 } },
    moves: ['embrochement_fantomatique']
}

monsters.el_scarador_fantomatique = {
    id: 'el_scarador_fantomatique',
    name: 'El Scarador Fantômatique',
    image: 'images/monsters/El_Scarador_Fantômatique.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 110, atk: 144, spd: 100, res: { neutre: 5, terre: 5, feu: 5, eau: 5, air: 5 } },
    moves: ['element_fantomatique', 'scaraforce_fantomatique']
}

monsters.croum_fantomatique = {
    id: 'croum_fantomatique',
    name: 'Croum Fantômatique',
    image: 'images/monsters/Croum_Fantômatique.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 110, atk: 144, spd: 100, res: { neutre: 18, terre: -9, feu: 11, eau: -9, air: 11 } },
    moves: ['glaive_fantomatique', 'bravoure_fantomatique']
}

monsters.poupoussiere = {
    id: 'poupoussiere',
    name: 'Poupoussière',
    image: 'images/monsters/Poupoussière.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 110, atk: 160, spd: 100, res: { neutre: 10, terre: 0, feu: -20, eau: 10, air: 0 } },
    moves: ['nuage_de_poupoussiere']
}

monsters.rose_obscure = {
    id: 'rose_obscure',
    name: 'Rose Obscure',
    image: 'images/monsters/Rose_Obscure.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 120, atk: 150, spd: 100, res: { neutre: 10, terre: 25, feu: 0, eau: 30, air: 0 } },
    moves: ['petalesEmpoisonnes', 'roseEpineuse']
}

monsters.coffre_maudit_du_flib = {
    id: 'coffre_maudit_du_flib',
    name: 'Coffre Maudit du Flib',
    image: 'images/monsters/Coffre_des_Forgerons.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 130, atk: 0, spd: 100, res: { neutre: 11, terre: -19, feu: -19, eau: -19, air: -19 } },
    moves: ['disruption', 'malediction']
}

monsters.sac_anime = {
    id: 'sac_anime',
    name: 'Sac Animé',
    image: 'images/monsters/Sac_Animé.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 130, atk: 0, spd: 100, res: { neutre: 50, terre: 19, feu: 32, eau: 23, air: 23 } },
    moves: []
}

monsters.krokille_juvenile_insipide = {
    id: 'krokille_juvenile_insipide',
    name: 'Krokille Juvénile Insipide',
    image: 'images/monsters/Krokille_Juvénile_Insipide.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 130, atk: 25, spd: 100, res: { neutre: 70, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['septicemie', 'esprit_de_meute', 'immunodeficience']
}

monsters.krokille_juvenile_boueuse = {
    id: 'krokille_juvenile_boueuse',
    name: 'Krokille Juvénile Boueuse',
    image: 'images/monsters/Krokille_Juvénile_Boueuse.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 130, atk: 25, spd: 100, res: { neutre: 0, terre: 70, feu: 0, eau: 0, air: -15 } },
    moves: ['fange', 'caprice', 'rebond_punitif']
}

monsters.krokille_juvenile_incandescente = {
    id: 'krokille_juvenile_incandescente',
    name: 'Krokille Juvénile Incandescente',
    image: 'images/monsters/Krokille_Juvénile_Incandescente.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 130, atk: 25, spd: 100, res: { neutre: 0, terre: 0, feu: 70, eau: -15, air: 0 } },
    moves: ['anemie', 'curee', 'incubation']
}

monsters.krokille_juvenile_humide = {
    id: 'krokille_juvenile_humide',
    name: 'Krokille Juvénile Humide',
    image: 'images/monsters/Krokille_Juvénile_Humide.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 130, atk: 25, spd: 100, res: { neutre: 0, terre: 0, feu: -15, eau: 70, air: 0 } },
    moves: ['humectation', 'flaque']
}

monsters.krokille_juvenile_seche = {
    id: 'krokille_juvenile_seche',
    name: 'Krokille Juvénile Sèche',
    image: 'images/monsters/Krokille_Juvénile_Sèche.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 130, atk: 25, spd: 100, res: { neutre: 0, terre: -15, feu: 0, eau: 0, air: 70 } },
    moves: ['assechement', 'souffle_percutant']
}

monsters.ecurouille = {
    id: 'ecurouille',
    name: 'Écurouille',
    image: 'images/monsters/ecurouille.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 140, atk: 88, spd: 100, res: { neutre: -14, terre: -9, feu: 6, eau: 11, air: 16 } },
    moves: ['taie_de_gland', 'rafale_venteuse']
}

monsters.dopeul_roublard = {
    id: 'dopeul_roublard',
    name: 'Dopeul Roublard',
    image: 'images/monsters/Dopeul_Roublard.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 140, atk: 90, spd: 100, res: { neutre: 2, terre: 2, feu: 2, eau: 2, air: 2 } },
    moves: ['espingole_du_dopeul', 'pulsar_du_dopeul']
}

monsters.bwak_de_feu = {
    id: 'bwak_de_feu',
    name: 'Bwak de Feu',
    image: 'images/monsters/Bwak_de_Feu.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 140, atk: 0, spd: 100, res: { neutre: 100, terre: 0, feu: 100, eau: 0, air: 0 } },
    moves: ['bwakikui']
}

monsters.bwak_de_terre = {
    id: 'bwak_de_terre',
    name: 'Bwak de Terre',
    image: 'images/monsters/Bwak_de_Terre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 140, atk: 0, spd: 100, res: { neutre: 100, terre: 100, feu: 0, eau: 0, air: 0 } },
    moves: ['bwakikuiterre']
}

monsters.bwak_d_air = {
    id: 'bwak_d_air',
    name: 'Bwak d\'Air',
    image: 'images/monsters/Bwak_d_Air.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 140, atk: 0, spd: 100, res: { neutre: 100, terre: 0, feu: 0, eau: 0, air: 100 } },
    moves: ['bwakikuiair']
}

monsters.bwak_d_eau = {
    id: 'bwak_d_eau',
    name: 'Bwak d\'Eau',
    image: 'images/monsters/Bwak_d_Eau.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 140, atk: 0, spd: 100, res: { neutre: 100, terre: 0, feu: 0, eau: 100, air: 0 } },
    moves: ['bwakikuieau']
}

monsters.bouftonBlanc = {
    id: 'bouftonBlanc',
    name: 'Boufton Blanc',
    image: 'images/monsters/Boufton_Blanc.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 150, atk: 88, spd: 100, res: { neutre: 1, terre: 16, feu: -9, eau: -14, air: 11 } },
    moves: ['machouillage']
}

monsters.bouftonNoir = {
    id: 'bouftonNoir',
    name: 'Boufton Noir',
    image: 'images/monsters/Boufton_Noir.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 150, atk: 88, spd: 100, res: { neutre: 1, terre: -14, feu: 11, eau: 16, air: -9 } },
    moves: ['mordillement']
}

monsters.bambou = {
    id: 'bambou',
    name: 'Bambou',
    image: 'images/monsters/Bambou.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 150, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.milimulou = {
    id: 'milimulou',
    name: 'Milimulou',
    image: 'images/monsters/Milimulou.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 150, atk: 88, spd: 100, res: { neutre: 26, terre: 0, feu: 16, eau: -9, air: -19 } },
    moves: ['flair', 'deboyautage']
}

monsters.prespic = {
    id: 'prespic',
    name: 'Prespic',
    image: 'images/monsters/Prespic.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 150, atk: 88, spd: 100, res: { neutre: -9, terre: -14, feu: -19, eau: -9, air: -14 } },
    moves: ['moquerie', 'cache_cache']
}

monsters.poupee_mortelle = {
    id: 'poupee_mortelle',
    name: 'Poupée Mortelle',
    image: 'images/monsters/Workette.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 150, atk: 0, spd: 100, res: { neutre: 90, terre: -90, feu: 90, eau: 90, air: 90 } },
    moves: []
}

monsters.ashi_magari = {
    id: 'ashi_magari',
    name: 'Ashi-magari',
    image: 'images/monsters/Ashi-magari.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 150, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['enchevetrement']
}

monsters.martoa = {
    id: 'martoa',
    name: 'Martoa',
    image: 'images/monsters/Martoa.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 150, atk: 88, spd: 100, res: { neutre: 6, terre: 21, feu: 6, eau: -14, air: 11 } },
    moves: ['marteau_branlant', 'mur_de_pelles']
}

summons.mur_de_pelles = {
    id:    'mur_de_pelles',
    name:  'Mur de pelles',
    image: 'img/classes/invocations/pelle_animee.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 150, atk: 88, spd: 100, res: { neutre: 6, terre: 21, feu: 6, eau: -14, air: 11 } },
    moves: []
}

monsters.sherpoa = {
    id: 'sherpoa',
    name: 'Sherpoa',
    image: 'images/monsters/Sherpoa.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 150, atk: 88, spd: 100, res: { neutre: 6, terre: 11, feu: 11, eau: 11, air: -9 } },
    moves: ['lancer_de_caillou', 'piege_de_cailloux']
}

monsters.douzdoa = {
    id: 'douzdoa',
    name: 'Douzdoa',
    image: 'images/monsters/Douzdoa.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 150, atk: 88, spd: 100, res: { neutre: 6, terre: 1, feu: 1, eau: 16, air: 6 } },
    moves: ['vissage', 'piege_de_vapeur']
}

monsters.pikdoa = {
    id: 'pikdoa',
    name: 'Pikdoa',
    image: 'images/monsters/Pikdoa.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 150, atk: 88, spd: 100, res: { neutre: 6, terre: -9, feu: 6, eau: 11, air: 16 } },
    moves: ['piochage', 'piege_a_pieds']
}

monsters.bouftou = {
    id: 'bouftou',
    name: 'Bouftou',
    image: 'images/monsters/Bouftou.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 170, atk: 88, spd: 100, res: { neutre: 1, terre: 11, feu: -14, eau: -9, air: 16 } },
    moves: ['morsure_du_bouftou']
}

monsters.sanglier = {
    id: 'sanglier',
    name: 'Sanglier',
    image: 'images/monsters/Sanglier_des_Plaines.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 170, atk: 88, spd: 100, res: { neutre: 6, terre: 16, feu: -14, eau: 0, air: 6 } },
    moves: ['perce_vessie', 'charge_forcee']
}

monsters.ballotin_le_bouftou = {
    id: 'ballotin_le_bouftou',
    name: 'Ballotin le Bouftou',
    image: 'images/monsters/Ballotin_le_Bouftou.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 170, atk: 88, spd: 100, res: { neutre: 1, terre: 11, feu: -14, eau: -9, air: 16 } },
    moves: ['morsure_du_bouftou']
}

monsters.bouftouNoir = {
    id: 'bouftouNoir',
    name: 'Bouftou Noir',
    image: 'images/monsters/Bouftou_noir.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 180, atk: 88, spd: 100, res: { neutre: 1, terre: -9, feu: 16, eau: 11, air: -14 } },
    moves: ['morsure_obscure', 'halaine_du_bouftou']
}

monsters.arakne_des_egouts = {
    id: 'arakne_des_egouts',
    name: 'Arakne des Égouts',
    image: 'images/monsters/Arakne_des_Égouts.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 180, atk: 96, spd: 100, res: { neutre: -5, terre: 20, feu: -5, eau: -15, air: 10 } },
    moves: ['mandibules', 'mere_porteuse']
}

monsters.ramane_strubien = {
    id: 'ramane_strubien',
    name: 'Ramane Strubien',
    image: 'images/monsters/Ramane.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 180, atk: 96, spd: 100, res: { neutre: 20, terre: 10, feu: 20, eau: -5, air: -15 } },
    moves: ['roblochon_ancestral', 'trou_d_emmental']
}

monsters.scelerat_strubien = {
    id: 'scelerat_strubien',
    name: 'Scélérat Strubien',
    image: 'images/monsters/Scélérat_Strubien.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 180, atk: 96, spd: 100, res: { neutre: -15, terre: -5, feu: -15, eau: 10, air: 20 } },
    moves: ['mordillage', 'coup_de_dents']
}

monsters.milirat_strubien = {
    id: 'milirat_strubien',
    name: 'Milirat Strubien',
    image: 'images/monsters/Milirat_Strubien.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 180, atk: 96, spd: 100, res: { neutre: 10, terre: -15, feu: 10, eau: 20, air: -5 } },
    moves: ['lancer_de_lance', 'air_empoisonne']
}

monsters.tonneau_pirate = {
    id: 'tonneau_pirate',
    name: 'Tonneau Pirate',
    image: 'images/monsters/Tonneau_Pirate.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 190, atk: 0, spd: 100, res: { neutre: 100, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['motivation_naturelle']
}

monsters.boo = {
    id: 'boo',
    name: 'Boo',
    image: 'images/monsters/Boo.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 190, atk: 115, spd: 100, res: { neutre: 10, terre: 6, feu: -12, eau: 6, air: -12 } },
    moves: ['souillure_booeuse', 'embourbement']
}

monsters.disciple_du_kimbo = {
    id: 'disciple_du_kimbo',
    name: 'Disciple du Kimbo',
    image: 'images/monsters/Disciple_du_Kimbo.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 190, atk: 225, spd: 100, res: { neutre: 800, terre: 800, feu: 800, eau: 800, air: 800 } },
    moves: ['glyphe_pair', 'glyphe_impair']
}

monsters.tentacule_quaternaire = {
    id: 'tentacule_quaternaire',
    name: 'Tentacule Quaternaire',
    image: 'images/monsters/Tentacule_Quaternaire.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 190, atk: 400, spd: 100, res: { neutre: 90, terre: 0, feu: 90, eau: 90, air: 90 } },
    moves: ['paralysie_tentaculaire']
}

monsters.pepite_croquante = {
    id: 'pepite_croquante',
    name: 'Pépite croquante',
    image: 'images/monsters/Pépite_croquante.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 200, atk: 0, spd: 100, res: { neutre: 10, terre: 10, feu: 10, eau: 10, air: 10 } },
    moves: []
}

monsters.dopeul_iop = {
    id: 'dopeul_iop',
    name: 'Dopeul Iop',
    image: 'images/monsters/Dopeul_Iop.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 200, atk: 80, spd: 100, res: { neutre: 2, terre: 2, feu: 2, eau: 2, air: 2 } },
    moves: ['epee_divine_du_dopeul', 'pression_du_dopeul']
}

monsters.dopeul_eniripsa = {
    id: 'dopeul_eniripsa',
    name: 'Dopeul Eniripsa',
    image: 'images/monsters/Dopeul_Eniripsa.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 200, atk: 80, spd: 100, res: { neutre: 2, terre: 2, feu: 2, eau: 2, air: 2 } },
    moves: ['mot_espiegle_du_dopeul', 'mot_tapageur_du_dopeul']
}

monsters.dopeul_ecaflip = {
    id: 'dopeul_ecaflip',
    name: 'Dopeul Ecaflip',
    image: 'images/monsters/Dopeul_Ecaflip.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 200, atk: 80, spd: 100, res: { neutre: 2, terre: 2, feu: 2, eau: 2, air: 2 } },
    moves: ['pile_ou_face_du_dopeul', 'bonne_pioche_du_dopeul']
}

monsters.dopeul_enutrof = {
    id: 'dopeul_enutrof',
    name: 'Dopeul Enutrof',
    image: 'images/monsters/Dopeul_Enutrof.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 200, atk: 100, spd: 100, res: { neutre: 2, terre: 2, feu: 2, eau: 2, air: 2 } },
    moves: ['roulage_de_pelle_du_dopeul', 'lancer_de_pieces_du_dopeul']
}

monsters.dopeul_feca = {
    id: 'dopeul_feca',
    name: 'Dopeul Feca',
    image: 'images/monsters/Dopeul_Féca.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 200, atk: 80, spd: 100, res: { neutre: 2, terre: 2, feu: 2, eau: 2, air: 2 } },
    moves: ['retour_du_baton_du_dopeul', 'bulle_du_dopeul']
}

monsters.dopeul_forgelance = {
    id: 'dopeul_forgelance',
    name: 'Dopeul Forgelance',
    image: 'images/monsters/Dopeul_Forgelance.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 200, atk: 90, spd: 100, res: { neutre: 2, terre: 2, feu: 2, eau: 2, air: 2 } },
    moves: ['trident_de_la_mer_du_dopeul', 'volee_d_airain_du_dopeul']
}

monsters.dopeul_osamodas = {
    id: 'dopeul_osamodas',
    name: 'Dopeul Osamodas',
    image: 'images/monsters/Dopeul_Osamodas.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 200, atk: 60, spd: 100, res: { neutre: 2, terre: 2, feu: 2, eau: 2, air: 2 } },
    moves: ['pics_du_prespic_du_dopeul', 'crocs_du_mulou_du_dopeul']
}

monsters.dopeul_pandawa = {
    id: 'dopeul_pandawa',
    name: 'Dopeul Pandawa',
    image: 'images/monsters/Dopeul_Pandawa.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 200, atk: 70, spd: 100, res: { neutre: 2, terre: 2, feu: 2, eau: 2, air: 2 } },
    moves: ['paume_explosive_du_dopeul', 'ethylo_du_dopeul']
}

monsters.dopeul_sacrieur = {
    id: 'dopeul_sacrieur',
    name: 'Dopeul Sacrieur',
    image: 'images/monsters/Dopeul_Sacrieur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 200, atk: 80, spd: 100, res: { neutre: 2, terre: 2, feu: 2, eau: 2, air: 2 } },
    moves: ['supplice_du_dopeul', 'absorption_du_dopeul']
}

monsters.dopeul_sadida = {
    id: 'dopeul_sadida',
    name: 'Dopeul Sadida',
    image: 'images/monsters/Dopeul_Sadida.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 200, atk: 90, spd: 100, res: { neutre: 2, terre: 2, feu: 2, eau: 2, air: 2 } },
    moves: ['ronce_du_dopeul', 'buisson_ardent_du_dopeul']
}

monsters.dopeul_sram = {
    id: 'dopeul_sram',
    name: 'Dopeul Sram',
    image: 'images/monsters/Dopeul_Sram.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 200, atk: 80, spd: 100, res: { neutre: 2, terre: 2, feu: 2, eau: 2, air: 2 } },
    moves: ['truanderie_du_Dopeul', 'arsenic_du_dopeul']
}

monsters.dopeul_steamer = {
    id: 'dopeul_steamer',
    name: 'Dopeul Steamer',
    image: 'images/monsters/Dopeul_Steamer.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 200, atk: 80, spd: 100, res: { neutre: 2, terre: 2, feu: 2, eau: 2, air: 2 } },
    moves: ['longue_vue_du_dopeul', 'amarrage_du_dopeul']
}

monsters.dopeul_xelor = {
    id: 'dopeul_xelor',
    name: 'Dopeul Xelor',
    image: 'images/monsters/Dopeul_Xélor.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 200, atk: 80, spd: 100, res: { neutre: 2, terre: 2, feu: 2, eau: 2, air: 2 } },
    moves: ['gelure_du_dopeul', 'frappe_de_xelor_du_dopeul']
}

monsters.dopeul_zobal = {
    id: 'dopeul_zobal',
    name: 'Dopeul Zobal',
    image: 'images/monsters/Dopeul_Zobal.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 200, atk: 80, spd: 100, res: { neutre: 2, terre: 2, feu: 2, eau: 2, air: 2 } },
    moves: ['parafuso_du_dopeul', 'plastron_du_dopeul']
}

monsters.biblop_coco = {
    id: 'biblop_coco',
    name: 'Biblop Coco',
    image: 'images/monsters/Biblop_Coco.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 210, atk: 70, spd: 100, res: { neutre: 15, terre: -62, feu: 15, eau: 15, air: 50 } },
    moves: ['bibloperie_air', 'biblopiment_air']
}

monsters.biblop_reinette = {
    id: 'biblop_reinette',
    name: 'Biblop Reinette',
    image: 'images/monsters/Biblop_Reinette.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 210, atk: 70, spd: 100, res: { neutre: 15, terre: 50, feu: 15, eau: 15, air: -62 } },
    moves: ['bibloperie_terre', 'biblopiment_terre']
}

monsters.biblop_griotte = {
    id: 'biblop_griotte',
    name: 'Biblop Griotte',
    image: 'images/monsters/Biblop_Griotte.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 210, atk: 70, spd: 100, res: { neutre: 15, terre: 15, feu: 50, eau: -62, air: 15 } },
    moves: ['bibloperie_feu', 'biblopiment_feu']
}

monsters.biblop_indigo = {
    id: 'biblop_indigo',
    name: 'Biblop Indigo',
    image: 'images/monsters/Biblop_Indigo.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 210, atk: 70, spd: 100, res: { neutre: 15, terre: 15, feu: -62, eau: 50, air: 15 } },
    moves: ['bibloperie_eau', 'biblopiment_eau']
}

monsters.bouftou_d_halouine = {
    id: 'bouftou_d_halouine',
    name: 'Bouftou d\'Halouine',
    image: 'images/monsters/Bouftou_d_Halouine.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 220, atk: 88, spd: 100, res: { neutre: 1, terre: 11, feu: -14, eau: -9, air: 16 } },
    moves: ['morsure_du_bouftou']
}

monsters.chafer_invisible = {
    id: 'chafer_invisible',
    name: 'Chafer Invisible',
    image: 'images/monsters/Chafer_Invisible.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 220, atk: 22, spd: 100, res: { neutre: 6, terre: 0, feu: 0, eau: -18, air: 18 } },
    moves: ['camouflage', 'coup_du_chafer', 'pantalonnade']
}

monsters.citwouille = {
    id: 'citwouille',
    name: 'Citwouille',
    image: 'images/monsters/Citwouille.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 220, atk: 113, spd: 100, res: { neutre: 1, terre: -9, feu: 1, eau: 0, air: 0 } },
    moves: ['vol_de_pieces', 'peur_vegetarienne', 'empoisonnement_vegetarien']
}

monsters.rasboul_mineur = {
    id: 'rasboul_mineur',
    name: 'Rasboul Mineur',
    image: 'images/monsters/Rasboul_Mineur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 220, atk: 0, spd: 100, res: { neutre: 75, terre: -75, feu: 75, eau: 75, air: 75 } },
    moves: ['bisouille']
}

monsters.kruella_freuz = {
    id: 'kruella_freuz',
    name: 'Kruella Freuz',
    image: 'images/monsters/Kruella_Freuz.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 230, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['invocation_de_kruella', 'souffle_motivant', 'souffle_empoisonne']
}

monsters.donatella = {
    id: 'donatella',
    name: 'Donatella',
    image: 'images/monsters/Donatella.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 240, atk: 60, spd: 100, res: { neutre: 50, terre: 0, feu: 0, eau: 0, air: 30 } },
    moves: ['kawabunga']
}

monsters.pierre_taillee = {
    id: 'pierre_taillee',
    name: 'Pierre Taillée',
    image: 'images/monsters/Pierre_Taillée.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 240, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.dagobert = {
    id: 'dagobert',
    name: 'Dagobert',
    image: 'images/monsters/Dagobert.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 240, atk: 118, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['miaulement_agacant', 'minouille']
}

monsters.tofu = {
    id: 'tofu',
    name: 'Tofu',
    image: 'images/monsters/Tofu.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 250, atk: 128, spd: 100, res: { neutre: 5, terre: -9, feu: 9, eau: 9, air: -9 } },
    moves: ['beco']
}

monsters.tofu_noir = {
    id: 'tofu_noir',
    name: 'Tofu Noir',
    image: 'images/monsters/Tofu_Noir.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 250, atk: 128, spd: 100, res: { neutre: 12, terre: 9, feu: -10, eau: 16, air: 17 } },
    moves: ['beco_rosif', 'fougue_tofuesque']
}

monsters.uf_de_pwak = {
    id: 'uf_de_pwak',
    name: 'Œuf de Pwâk',
    image: 'images/monsters/Œuf_de_Pwâk.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 250, atk: 50, spd: 100, res: { neutre: 100, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.raphaela = {
    id: 'raphaela',
    name: 'Raphaela',
    image: 'images/monsters/Raphaela.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 260, atk: 63, spd: 100, res: { neutre: 50, terre: 0, feu: 0, eau: 30, air: 0 } },
    moves: []
}

monsters.leonardawa = {
    id: 'leonardawa',
    name: 'Leonardawa',
    image: 'images/monsters/Leonardawa.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 270, atk: 65, spd: 100, res: { neutre: 50, terre: 0, feu: 30, eau: 0, air: 0 } },
    moves: []
}

monsters.vampire = {
    id: 'vampire',
    name: 'Vampire',
    image: 'images/monsters/Vampire.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 280, atk: 128, spd: 100, res: { neutre: 16, terre: 21, feu: -14, eau: -14, air: 11 } },
    moves: ['vol_de_vie', 'force_des_ames_putrides', 'nosfurate']
}

monsters.kwoan = {
    id: 'kwoan',
    name: 'Kwoan',
    image: 'images/monsters/Kwoan.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 280, atk: 128, spd: 100, res: { neutre: 16, terre: 6, feu: 0, eau: 11, air: -14 } },
    moves: ['frappe_gerbante', 'confusion_optique']
}

monsters.tofoune = {
    id: 'tofoune',
    name: 'Tofoune',
    image: 'images/monsters/Tofoune.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 280, atk: 128, spd: 100, res: { neutre: 10, terre: -10, feu: 31, eau: 36, air: -23 } },
    moves: ['picota', 'graine_empoisonnee', 'mot_de_jeunesse']
}

monsters.tofukaz = {
    id: 'tofukaz',
    name: 'Tofukaz',
    image: 'images/monsters/Tofukaz.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 280, atk: 128, spd: 100, res: { neutre: 29, terre: 32, feu: -16, eau: -14, air: 13 } },
    moves: ['disparition_groupee', 'provocation']
}

monsters.boostache_prepubere = {
    id: 'boostache_prepubere',
    name: 'Boostache Prépubère',
    image: 'images/monsters/Boostache_Prépubère.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 280, atk: 128, spd: 100, res: { neutre: 16, terre: 0, feu: 0, eau: 1, air: 26 } },
    moves: ['caresse_effrayante', 'timidite', 'boorrade']
}

monsters.cafarcher = {
    id: 'cafarcher',
    name: 'Cafarcher',
    image: 'images/monsters/Cafarcher.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 280, atk: 128, spd: 100, res: { neutre: 11, terre: -9, feu: 0, eau: 0, air: -13 } },
    moves: ['tir_de_cure_dent', 'coup_de_cure_dent']
}

monsters.pyrasite = {
    id: 'pyrasite',
    name: 'Pyrasite',
    image: 'images/monsters/Pyrasite.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 280, atk: 128, spd: 100, res: { neutre: -13, terre: 0, feu: 12, eau: -28, air: 0 } },
    moves: ['souffle_brulant', 'cri_de_l_insecte_ardent']
}

monsters.totem_motivant = {
    id: 'totem_motivant',
    name: 'Totem Motivant',
    image: 'images/monsters/Totem_Motivant.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 300, atk: 0, spd: 100, res: { neutre: 90, terre: 90, feu: -20, eau: 90, air: 90 } },
    moves: ['encouragement']
}

monsters.totem_explosif = {
    id: 'totem_explosif',
    name: 'Totem Explosif',
    image: 'images/monsters/Totem_Explosif.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 300, atk: 0, spd: 100, res: { neutre: 90, terre: 90, feu: 100, eau: 90, air: 90 } },
    moves: ['tentative_d_explosion']
}

monsters.totem_soignant = {
    id: 'totem_soignant',
    name: 'Totem Soignant',
    image: 'images/monsters/Totem_Soignant.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 300, atk: 50, spd: 100, res: { neutre: 90, terre: 90, feu: -20, eau: 90, air: 90 } },
    moves: ['reconstitution_magique']
}

monsters.LAouassingue = {
    id: 'LAouassingue',
    name: 'La Ouassingue',
    image: 'images/monsters/La_Ouassingue.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 300, atk: 118, spd: 110, res: { neutre: 20, terre: 20, feu: 10, eau: -5, air: -15 } },
    moves: ['oblativite', 'reconstitution_cellulaire', 'serpilliere']
}

monsters.LEouassingue = {
    id: 'LEouassingue',
    name: 'Le Ouassingue',
    image: 'images/monsters/Le_Ouassingue.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 300, atk: 118, spd: 110, res: { neutre: -5, terre: -5, feu: 20, eau: -15, air: 10 } },
    moves: ['equarrissage', 'interversion', 'reconstitution_cellulaire']
}

monsters.gobet = {
    id: 'gobet',
    name: 'Gobet',
    image: 'images/monsters/Gobet.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 300, atk: 118, spd: 100, res: { neutre: 2, terre: 9, feu: 3, eau: -6, air: -8 } },
    moves: ['frappe_temeraire', 'impact_maladroit']
}

monsters.fantome_egerie = {
    id: 'fantome_egerie',
    name: 'Fantôme Égérie',
    image: 'images/monsters/Fantôme_Égérie.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 300, atk: 144, spd: 100, res: { neutre: -15, terre: -5, feu: 10, eau: -15, air: 20 } },
    moves: ['renvoi_fantomatique', 'explosion_fantomatique', 'fleche_fantomatique']
}

monsters.fantome_hicide = {
    id: 'fantome_hicide',
    name: 'Fantôme Hicide',
    image: 'images/monsters/Fantôme_Hicide.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 300, atk: 144, spd: 100, res: { neutre: 10, terre: 20, feu: -5, eau: 10, air: -15 } },
    moves: ['invocation_de_familiers_fantomatiques', 'corbacame', 'cri_de_l_operette']
}

monsters.fantome_apero = {
    id: 'fantome_apero',
    name: 'Fantôme Apero',
    image: 'images/monsters/Fantôme_Apero.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 300, atk: 144, spd: 100, res: { neutre: -5, terre: -15, feu: 20, eau: -5, air: 10 } },
    moves: ['motivation_fantomatique', 'invocation_d_esprits_familiers', 'erikorbac']
}

monsters.garglyphe = {
    id: 'garglyphe',
    name: 'Garglyphe',
    image: 'images/monsters/Garglyphe.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 300, atk: 118, spd: 100, res: { neutre: 10, terre: 10, feu: -15, eau: 20, air: -5 } },
    moves: ['deterrage', 'gare_aux_glyphes', 'durete_ramollissante']
}

monsters.gobaliste = {
    id: 'gobaliste',
    name: 'Gobaliste',
    image: 'images/monsters/Gobaliste.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 300, atk: 118, spd: 100, res: { neutre: -5, terre: -10, feu: 2, eau: 9, air: 4 } },
    moves: ['flatuosite', 'tir_de_gobaliste']
}

monsters.gobaladee = {
    id: 'gobaladee',
    name: 'Gobaladée',
    image: 'images/monsters/Gobaladée.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 300, atk: 118, spd: 100, res: { neutre: 1, terre: 2, feu: -6, eau: 9, air: -6 } },
    moves: ['co_balade', 'egob_trip']
}

monsters.tofu_malefique = {
    id: 'tofu_malefique',
    name: 'Tofu Maléfique',
    image: 'images/monsters/Tofu_Maléfique.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 310, atk: 128, spd: 100, res: { neutre: -14, terre: 16, feu: -24, eau: 26, air: -19 } },
    moves: ['malefice', 'beco_malefique', 'punksnotdede']
}

monsters.chafer = {
    id: 'chafer',
    name: 'Chafer',
    image: 'images/monsters/Chafer.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 310, atk: 43, spd: 100, res: { neutre: 0, terre: -10, feu: 10, eau: 0, air: 5 } },
    moves: []
}

monsters.scarafeuilleBlanc = {
    id: 'scarafeuilleBlanc',
    name: 'Scarafeuille Blanc',
    image: 'images/monsters/Scarafeuille_Blanc.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 310, atk: 80, spd: 100, res: { neutre: 25, terre: -50, feu: 0, eau: 0, air: 100 } },
    moves: ['scaraforce', 'elemental_dispersion', 'spriti_element_blanc', 'flammeche_air']
}

monsters.scarafeuilleVert = {
    id: 'scarafeuilleVert',
    name: 'Scarafeuille Vert',
    image: 'images/monsters/Scarafeuille_Vert.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 310, atk: 80, spd: 100, res: { neutre: 25, terre: 100, feu: 0, eau: 0, air: -50 } },
    moves: ['scaraforce', 'elemental_dispersion', 'spriti_element_vert', 'flammeche_terre']
}

monsters.scarafeuilleBleu = {
    id: 'scarafeuilleBleu',
    name: 'Scarafeuille Bleu',
    image: 'images/monsters/Scarafeuille_Bleu.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 310, atk: 80, spd: 100, res: { neutre: 25, terre: 0, feu: -50, eau: 100, air: 0 } },
    moves: ['scaraforce', 'elemental_dispersion', 'spriti_element_bleu', 'flammeche_eau']
}

monsters.scarafeuilleRouge = {
    id: 'scarafeuilleRouge',
    name: 'Scarafeuille Rouge',
    image: 'images/monsters/Scarafeuille_Rouge.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 310, atk: 80, spd: 100, res: { neutre: 25, terre: 0, feu: 100, eau: -50, air: 0 } },
    moves: ['scaraforce', 'elemental_dispersion', 'spriti_element_rouge', 'flammeche_feu']
}

monsters.brigandine = {
    id: 'brigandine',
    name: 'Brigandine',
    image: 'images/monsters/Brigandine.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 310, atk: 70, spd: 100, res: { neutre: 30, terre: 0, feu: 30, eau: 30, air: 30 } },
    moves: ['fronde', 'appel_de_papa']
}

monsters.brigandin = {
    id: 'brigandin',
    name: 'Brigandin',
    image: 'images/monsters/Brigandin.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 310, atk: 70, spd: 100, res: { neutre: 5, terre: 20, feu: 30, eau: 0, air: 80 } },
    moves: ['appel_de_la_mama', 'elagage_de_cou']
}

monsters.michelangela = {
    id: 'michelangela',
    name: 'Michelangela',
    image: 'images/monsters/Michelangela.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 310, atk: 128, spd: 100, res: { neutre: 50, terre: 30, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.ceglumen = {
    id: 'ceglumen',
    name: 'Céglumen',
    image: 'images/monsters/Céglumen.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 310, atk: 128, spd: 100, res: { neutre: 10, terre: 0, feu: 0, eau: -33, air: 10 } },
    moves: ['badigeonnage_de_cerumen', 'attrape_coton_tige']
}

monsters.boulanger_sombre = {
    id: 'boulanger_sombre',
    name: 'Boulanger Sombre',
    image: 'images/monsters/Boulanger_Sombre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 320, atk: 65, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['eventration', 'lancer_de_pain']
}

monsters.rat_molo = {
    id: 'rat_molo',
    name: 'Rat Molo',
    image: 'images/monsters/Rat_Molo.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 320, atk: 304, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['rajusteur', 'raclerie']
}

monsters.champa_vert = {
    id: 'champa_vert',
    name: 'Champa Vert',
    image: 'images/monsters/Champa_Vert.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 320, atk: 100, spd: 100, res: { neutre: 50, terre: -9, feu: -9, eau: -9, air: 60 } },
    moves: ['teleportation_du_champa', 'champ_oisone']
}

monsters.champa_rouge = {
    id: 'champa_rouge',
    name: 'Champa Rouge',
    image: 'images/monsters/Champa_Rouge.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 320, atk: 100, spd: 100, res: { neutre: 50, terre: -9, feu: 60, eau: -9, air: -9 } },
    moves: ['champsoin', 'champ_hagne']
}

monsters.champa_bleu = {
    id: 'champa_bleu',
    name: 'Champa Bleu',
    image: 'images/monsters/Champa_Bleu.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 320, atk: 100, spd: 100, res: { neutre: 50, terre: -9, feu: -9, eau: 60, air: -9 } },
    moves: ['sacrifice_douloureux', 'attraction_champetre']
}

monsters.champa_marron = {
    id: 'champa_marron',
    name: 'Champa Marron',
    image: 'images/monsters/Champa_Marron.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 320, atk: 100, spd: 100, res: { neutre: 50, terre: 60, feu: -9, eau: -9, air: -9 } },
    moves: ['champ_homi', 'champ_hetre']
}

monsters.charogne = {
    id: 'charogne',
    name: 'Charogne',
    image: 'images/monsters/Charogne.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 320, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.tofu_d_halouine = {
    id: 'tofu_d_halouine',
    name: 'Tofu d\'Halouine',
    image: 'images/monsters/Tofu_d_Halouine.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 330, atk: 128, spd: 100, res: { neutre: 5, terre: -9, feu: 9, eau: 9, air: -9 } },
    moves: ['beco_rosif', 'fougue_tofuesque']
}

monsters.gargrouille = {
    id: 'gargrouille',
    name: 'Gargrouille',
    image: 'images/monsters/Gargrouille.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 330, atk: 118, spd: 100, res: { neutre: 50, terre: 50, feu: 50, eau: 50, air: 50 } },
    moves: ['souffle_gargouillesque', 'gargouilli', 'couteau']
}

monsters.kolerat_d_egoutant = {
    id: 'kolerat_d_egoutant',
    name: 'Kolérat d\'Égoutant',
    image: 'images/monsters/Kolérat.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 340, atk: 208, spd: 100, res: { neutre: -14, terre: 31, feu: -14, eau: 41, air: -9 } },
    moves: ['morsure_affaiblissante']
}

monsters.rib = {
    id: 'rib',
    name: 'Rib',
    image: 'images/monsters/Rib.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 340, atk: 75, spd: 100, res: { neutre: 10, terre: 10, feu: -10, eau: -20, air: 10 } },
    moves: ['embrochement']
}

monsters.crustorail_kouracao = {
    id: 'crustorail_kouracao',
    name: 'Crustorail Kouraçao',
    image: 'images/monsters/Crustorail_Kouraçao.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 340, atk: 100, spd: 100, res: { neutre: 5, terre: 5, feu: -20, eau: 30, air: 5 } },
    moves: ['pince_de_corail', 'protection_de_corail']
}

monsters.crustorail_malibout = {
    id: 'crustorail_malibout',
    name: 'Crustorail Malibout',
    image: 'images/monsters/Crustorail_Malibout.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 340, atk: 100, spd: 100, res: { neutre: 5, terre: 30, feu: 5, eau: 5, air: -20 } },
    moves: ['pince_de_corail', 'protection_de_corail']
}

monsters.crustorail_passaoh = {
    id: 'crustorail_passaoh',
    name: 'Crustorail Passaoh',
    image: 'images/monsters/Crustorail_Passaoh.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 340, atk: 100, spd: 100, res: { neutre: 5, terre: 5, feu: 30, eau: -20, air: 5 } },
    moves: ['pince_de_corail', 'protection_de_corail']
}

monsters.crustorail_morito = {
    id: 'crustorail_morito',
    name: 'Crustorail Morito',
    image: 'images/monsters/Crustorail_Morito.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 340, atk: 100, spd: 100, res: { neutre: 5, terre: -20, feu: 5, eau: 5, air: 30 } },
    moves: ['pince_de_corail', 'protection_de_corail']
}

monsters.mirgrillon = {
    id: 'mirgrillon',
    name: 'Mirgrillon',
    image: 'images/monsters/Mirgrillon.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 340, atk: 128, spd: 100, res: { neutre: 0, terre: 6, feu: 2, eau: 0, air: -14 } },
    moves: ['mini_empalement', 'coup_de_boutonclier']
}

monsters.chafer_fantassin = {
    id: 'chafer_fantassin',
    name: 'Chafer Fantassin',
    image: 'images/monsters/Chafer_Fantassin.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 350, atk: 45, spd: 100, res: { neutre: -5, terre: -5, feu: 15, eau: 0, air: 10 } },
    moves: []
}

monsters.dragodinde_de_nowel = {
    id: 'dragodinde_de_nowel',
    name: 'Dragodinde de Nowel',
    image: 'images/monsters/Dragodinde_de_Nowel.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 350, atk: 144, spd: 100, res: { neutre: 26, terre: -8, feu: -8, eau: 26, air: -8 } },
    moves: ['dindosoin', 'frappodindo']
}

monsters.tronknyde = {
    id: 'tronknyde',
    name: 'Tronknyde',
    image: 'images/monsters/Tronknyde.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 350, atk: 100, spd: 100, res: { neutre: 5, terre: 28, feu: -17, eau: 38, air: 38 } },
    moves: ['glyphe_sylvestre', 'tronc_commun']
}

monsters.palmifleur_kouracao = {
    id: 'palmifleur_kouracao',
    name: 'Palmifleur Kouraçao',
    image: 'images/monsters/Palmifleur_Kouraçao.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 350, atk: 100, spd: 100, res: { neutre: 5, terre: -9, feu: -15, eau: 10, air: -9 } },
    moves: ['decapsulation', 'fleur_des_iles']
}

monsters.palmifleur_malibout = {
    id: 'palmifleur_malibout',
    name: 'Palmifleur Malibout',
    image: 'images/monsters/Palmifleur_Malibout.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 350, atk: 100, spd: 100, res: { neutre: 5, terre: 10, feu: -9, eau: -9, air: -15 } },
    moves: ['fleur_des_iles_terre']
}

monsters.palmifleur_passaoh = {
    id: 'palmifleur_passaoh',
    name: 'Palmifleur Passaoh',
    image: 'images/monsters/Palmifleur_Passaoh.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 350, atk: 100, spd: 100, res: { neutre: 5, terre: -9, feu: 10, eau: -15, air: -9 } },
    moves: ['fleur_des_iles_feu']
}

monsters.palmifleur_morito = {
    id: 'palmifleur_morito',
    name: 'Palmifleur Morito',
    image: 'images/monsters/Palmifleur_Morito.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 350, atk: 100, spd: 100, res: { neutre: 5, terre: -15, feu: -9, eau: -9, air: 10 } },
    moves: ['fleur_des_iles_air']
}

monsters.gob_trotteur = {
    id: 'gob_trotteur',
    name: 'Gob-trotteur',
    image: 'images/monsters/Gob-trotteur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 360, atk: 118, spd: 100, res: { neutre: -2, terre: 7, feu: -8, eau: -3, air: 6 } },
    moves: ['gobond', 'gobrochette']
}

monsters.sakarien = {
    id: 'sakarien',
    name: 'Sakarien',
    image: 'images/monsters/Sakarien.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 360, atk: 128, spd: 100, res: { neutre: 0, terre: 2, feu: 0, eau: -16, air: -10 } },
    moves: ['frappe_circulaire', 'invocation_de_poupoussiere']
}

monsters.dopeul_cra = {
    id: 'dopeul_cra',
    name: 'Dopeul Cra',
    image: 'images/monsters/Dopeul_Cra.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 370, atk: 270, spd: 100, res: { neutre: 8, terre: 8, feu: 8, eau: 8, air: 8 } },
    moves: ['fleche_optique_du_dopeul', 'fleche_glacee_du_dopeul']
}

monsters.dopeul_eliotrope = {
    id: 'dopeul_eliotrope',
    name: 'Dopeul Eliotrope',
    image: 'images/monsters/Dopeul_Eliotrope.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 370, atk: 270, spd: 100, res: { neutre: 8, terre: 8, feu: 8, eau: 8, air: 8 } },
    moves: ['affront_du_dopeul', 'rayon_de_wakfu_du_dopeul']
}

monsters.dopeul_huppermage = {
    id: 'dopeul_huppermage',
    name: 'Dopeul Huppermage',
    image: 'images/monsters/Dopeul_Huppermage.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 370, atk: 270, spd: 100, res: { neutre: 8, terre: 8, feu: 8, eau: 8, air: 8 } },
    moves: ['onde_sismique_du_dopeul', 'stalagmite_du_dopeul']
}

monsters.dopeul_ouginak = {
    id: 'dopeul_ouginak',
    name: 'Dopeul Ouginak',
    image: 'images/monsters/Dopeul_Ouginak.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 370, atk: 270, spd: 100, res: { neutre: 8, terre: 8, feu: 8, eau: 8, air: 8 } },
    moves: ['cubitus_du_dopeul', 'molosse_du_dopeul']
}

monsters.corailleur = {
    id: 'corailleur',
    name: 'Corailleur',
    image: 'images/monsters/Corailleur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 370, atk: 100, spd: 100, res: { neutre: 5, terre: 17, feu: -10, eau: -5, air: 12 } },
    moves: ['frappe_de_corail', 'lancer_de_corail', 'coraillement']
}

monsters.chafer_archer = {
    id: 'chafer_archer',
    name: 'Chafer Archer',
    image: 'images/monsters/Chafer_Archer.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 390, atk: 168, spd: 100, res: { neutre: 0, terre: 11, feu: -9, eau: 6, air: 16 } },
    moves: ['fleche_de_feu']
}

monsters.bwork_archer = {
    id: 'bwork_archer',
    name: 'Bwork Archer',
    image: 'images/monsters/Bwork_Archer.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 390, atk: 25, spd: 100, res: { neutre: 0, terre: -15, feu: 5, eau: 0, air: 0 } },
    moves: ['fleche_trouveuse', 'maitrise_des_armes_de_jet', 'projectile_puissant']
}

monsters.maitre_vampire = {
    id: 'maitre_vampire',
    name: 'Maître Vampire',
    image: 'images/monsters/Maître_Vampire.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 390, atk: 113, spd: 100, res: { neutre: 10, terre: 10, feu: -10, eau: -10, air: 10 } },
    moves: []
}

monsters.glutin_turbulent = {
    id: 'glutin_turbulent',
    name: 'Glutin turbulent',
    image: 'images/monsters/Glutin_Tapageur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 390, atk: 144, spd: 100, res: { neutre: 3, terre: 3, feu: 3, eau: 3, air: 3 } },
    moves: ['boolkiroul', 'namas_pamouss', 'ebouledeneigement']
}

monsters.bakaza_kopi = {
    id: 'bakaza_kopi',
    name: 'Bakaza kopi',
    image: 'images/monsters/Bakaza_kopi.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 390, atk: 640, spd: 100, res: { neutre: 17, terre: 12, feu: 8, eau: -10, air: -19 } },
    moves: ['dorobo']
}

monsters.chafer_primitif = {
    id: 'chafer_primitif',
    name: 'Chafer Primitif',
    image: 'images/monsters/Chafer_Primitif.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 400, atk: 95, spd: 100, res: { neutre: 10, terre: 8, feu: 4, eau: 0, air: -4 } },
    moves: ['curare', 'elance_de_couteau', 'robustesse']
}

monsters.arakne_poilue = {
    id: 'arakne_poilue',
    name: 'Arakne Poilue',
    image: 'images/monsters/Arakne_Majeure.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 400, atk: 100, spd: 100, res: { neutre: -14, terre: -14, feu: 10, eau: 10, air: -14 } },
    moves: ['Absorption_Sanguine', 'Ralentissement_Arakneen']
}

monsters.tiwabbit_kiafin = {
    id: 'tiwabbit_kiafin',
    name: 'Tiwabbit Kiafin',
    image: 'images/monsters/Tiwabbit_Kiafin.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 400, atk: 100, spd: 100, res: { neutre: 12, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['vent_de_panique', 'panique']
}

monsters.chevalier = {
    id: 'chevalier',
    name: 'Chevalier',
    image: 'images/monsters/Chevalier.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 400, atk: 100, spd: 100, res: { neutre: 30, terre: 30, feu: 30, eau: 30, air: 30 } },
    moves: ['laminagile', 'virevoltige', 'attirance_chevaleresque', 'bond_chevaleresque']
}

monsters.boumbombe = {
    id: 'boumbombe',
    name: 'Boumbombe',
    image: 'images/monsters/Boumbombe.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 400, atk: 25, spd: 100, res: { neutre: 75, terre: 75, feu: 50, eau: 50, air: 75 } },
    moves: ['tic_tac', 'badaboum']
}

monsters.tregenaire = {
    id: 'tregenaire',
    name: 'Trégénaire',
    image: 'images/monsters/Trégénaire.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 400, atk: 50, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['protection_de_la_reine']
}

monsters.toile = {
    id: 'toile',
    name: 'Toile',
    image: 'images/monsters/Toile.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 400, atk: 0, spd: 100, res: { neutre: -5, terre: 10, feu: -15, eau: 15, air: 5 } },
    moves: []
}

monsters.gobichon = {
    id: 'gobichon',
    name: 'Gobichon',
    image: 'images/monsters/Gobichon.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 400, atk: 118, spd: 100, res: { neutre: 4, terre: -8, feu: 9, eau: -9, air: 4 } },
    moves: ['cassecrane']
}

monsters.kitsou_nakwatus = {
    id: 'kitsou_nakwatus',
    name: 'Kitsou nakwatus',
    image: 'images/monsters/Kitsou_nakwatus.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 410, atk: 144, spd: 100, res: { neutre: 50, terre: 25, feu: -10, eau: 100, air: 15 } },
    moves: ['ruse_hivernale', 'kitsouqueue', 'kitsnition_frissonante', 'kitsouflamme']
}

monsters.tiwabbit = {
    id: 'tiwabbit',
    name: 'Tiwabbit',
    image: 'images/monsters/Tiwabbit.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 420, atk: 25, spd: 100, res: { neutre: 2, terre: 1, feu: 0, eau: -5, air: 0 } },
    moves: ['frappe_des_wabbits', 'envoie_la_patate']
}

monsters.tofu_enneige = {
    id: 'tofu_enneige',
    name: 'Tofu enneigé',
    image: 'images/monsters/Tofu_enneigé.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 430, atk: 144, spd: 100, res: { neutre: 40, terre: 15, feu: 20, eau: -39, air: 50 } },
    moves: ['tombee_de_neige', 'debarbouillage']
}

monsters.larve_saphir = {
    id: 'larve_saphir',
    name: 'Larve Saphir',
    image: 'images/monsters/Larve_Saphir.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 430, atk: 63, spd: 100, res: { neutre: 10, terre: 10, feu: 0, eau: 10, air: 10 } },
    moves: ['larvure']
}

monsters.larve_rubis = {
    id: 'larve_rubis',
    name: 'Larve Rubis',
    image: 'images/monsters/Larve_Rubis.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 430, atk: 123, spd: 100, res: { neutre: 20, terre: 20, feu: -10, eau: 20, air: 20 } },
    moves: ['carapace']
}

monsters.larve_emeraude = {
    id: 'larve_emeraude',
    name: 'Larve Émeraude',
    image: 'images/monsters/Larve_Émeraude.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 430, atk: 100, spd: 100, res: { neutre: 15, terre: 15, feu: -10, eau: 15, air: 0 } },
    moves: ['larvage']
}

monsters.larve_doree = {
    id: 'larve_doree',
    name: 'Larve Dorée',
    image: 'images/monsters/Larve_Dorée.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 430, atk: 125, spd: 100, res: { neutre: 0, terre: 0, feu: -10, eau: 10, air: 0 } },
    moves: ['larvure','larvage','carapace']
}

monsters.flammeche_fumeuse = {
    id: 'flammeche_fumeuse',
    name: 'Flammèche Fumeuse',
    image: 'images/monsters/Flammèche_Feu.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 430, atk: 688, spd: 100, res: { neutre: 0, terre: 0, feu: 100, eau: 0, air: 0 } },
    moves: ['rapprochement_elementaire', 'immolation']
}

monsters.flammeche_aqueuse = {
    id: 'flammeche_aqueuse',
    name: 'Flammèche Aqueuse',
    image: 'images/monsters/Flammèche_Eau.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 430, atk: 688, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 100, air: 0 } },
    moves: ['rapprochement_elementaireeau', 'immolationeau']
}

monsters.flammeche_terreuse = {
    id: 'flammeche_terreuse',
    name: 'Flammèche Terreuse',
    image: 'images/monsters/Flammèche_Terre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 430, atk: 688, spd: 100, res: { neutre: 0, terre: 100, feu: 0, eau: 0, air: 0 } },
    moves: ['rapprochement_elementaireterre', 'immolationterre']
}

monsters.flammeche_venteuse = {
    id: 'flammeche_venteuse',
    name: 'Flammèche Venteuse',
    image: 'images/monsters/Flammèche_Air.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 430, atk: 688, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 100 } },
    moves: ['rapprochement_elementaireair', 'immolation']
}

monsters.fantome_aux_plates = {
    id: 'fantome_aux_plates',
    name: 'Fantôme Aux Plates',
    image: 'images/monsters/Fantôme_Aux_Plates.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 430, atk: 144, spd: 100, res: { neutre: 20, terre: 10, feu: -15, eau: 20, air: -5 } },
    moves: ['tempete_fantomatique', 'epee_fantomatique', 'aspiration_fragilisante']
}

monsters.cochon_de_lait = {
    id: 'cochon_de_lait',
    name: 'Cochon de Lait',
    image: 'images/monsters/Cochon_de_Lait.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 430, atk: 168, spd: 100, res: { neutre: 11, terre: 0, feu: -19, eau: -24, air: 56 } },
    moves: ['lard_bat_laite', 'reniflement']
}

monsters.crabe = {
    id: 'crabe',
    name: 'Crabe',
    image: 'images/monsters/Crabe.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 430, atk: 168, spd: 100, res: { neutre: -9, terre: 21, feu: 21, eau: -24, air: 26 } },
    moves: ['pince', 'violon_sel', 'chancre']
}

monsters.black_tiwabbit = {
    id: 'black_tiwabbit',
    name: 'Black Tiwabbit',
    image: 'images/monsters/Black_Tiwabbit.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 430, atk: 50, spd: 100, res: { neutre: 5, terre: -10, feu: 0, eau: 11, air: 12 } },
    moves: ['petit_wabehameha']
}

monsters.tikoko = {
    id: 'tikoko',
    name: 'Tikoko',
    image: 'images/monsters/Tikoko.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 430, atk: 100, spd: 100, res: { neutre: 0, terre: -16, feu: 10, eau: 12, air: 2 } },
    moves: ['enfeuillage']
}

monsters.kokoko = {
    id: 'kokoko',
    name: 'Kokoko',
    image: 'images/monsters/Kokoko.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 430, atk: 100, spd: 100, res: { neutre: 2, terre: 0, feu: 12, eau: 10, air: -16 } },
    moves: ['fremissement', 'aidchotte']
}

monsters.nodkoko = {
    id: 'nodkoko',
    name: 'Nodkoko',
    image: 'images/monsters/Nodkoko.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 430, atk: 100, spd: 100, res: { neutre: 0, terre: 10, feu: 2, eau: -16, air: 12 } },
    moves: ['jus_baveux', 'kokojus']
}

monsters.tortue_rouge = {
    id: 'tortue_rouge',
    name: 'Tortue Rouge',
    image: 'images/monsters/Tortue_Rouge.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 430, atk: 109, spd: 100, res: { neutre: -18, terre: 2, feu: 32, eau: 0, air: 0 } },
    moves: ['chapeau_incandescent', 'feu_interieur', 'coup_de_pied_tombant']
}

monsters.tortue_bleue = {
    id: 'tortue_bleue',
    name: 'Tortue Bleue',
    image: 'images/monsters/Tortue_Bleue.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 430, atk: 109, spd: 100, res: { neutre: -18, terre: 0, feu: 2, eau: 32, air: 0 } },
    moves: ['carapace_reflechissante', 'feu_aquatique', 'poing_de_la_tortue']
}

monsters.tortue_verte = {
    id: 'tortue_verte',
    name: 'Tortue Verte',
    image: 'images/monsters/Tortue_Verte.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 430, atk: 109, spd: 100, res: { neutre: -18, terre: 0, feu: 0, eau: 2, air: 32 } },
    moves: ['vents_percants', 'coup_de_patte_tournoyant', 'ecrasement_terrestre']
}

monsters.tortue_jaune = {
    id: 'tortue_jaune',
    name: 'Tortue Jaune',
    image: 'images/monsters/Tortue_Jaune.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 430, atk: 109, spd: 100, res: { neutre: -18, terre: 32, feu: 0, eau: 0, air: 2 } },
    moves: ['frappe_eclair_de_la_tortue', 'patte_explosive']
}

monsters.crocodaille = {
    id: 'crocodaille',
    name: 'Crocodaille',
    image: 'images/monsters/Crocodaille.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 430, atk: 35, spd: 100, res: { neutre: 31, terre: 16, feu: 0, eau: 85, air: 25 } },
    moves: ['Croutage']
}

monsters.berger_porkass = {
    id: 'berger_porkass',
    name: 'Berger Porkass',
    image: 'images/monsters/Berger_Porkass.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 430, atk: 168, spd: 100, res: { neutre: -14, terre: -9, feu: 21, eau: 31, air: -19 } },
    moves: ['koudanlulk', 'tridembrochement', 'appel_de_la_foudre']
}

monsters.kipik = {
    id: 'kipik',
    name: 'Kipik',
    image: 'images/monsters/Kipik.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 430, atk: 144, spd: 100, res: { neutre: -10, terre: 10, feu: 10, eau: 10, air: 10 } },
    moves: ['savapike', 'branche_kipik']
}

monsters.kwakus = {
    id: 'kwakus',
    name: 'Kwakus',
    image: 'images/monsters/Kwakus.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 430, atk: 144, spd: 100, res: { neutre: 50, terre: 0, feu: -100, eau: 100, air: 0 } },
    moves: ['kwakiboost', 'kwakikri', 'kwakoukus', 'wakpotus']
}

monsters.raul_mops = {
    id: 'raul_mops',
    name: 'Raul Mops',
    image: 'images/monsters/Raul_Mops.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 430, atk: 168, spd: 100, res: { neutre: 16, terre: -9, feu: 26, eau: 11, air: -9 } },
    moves: ['harponnage', 'dispersion_sablee', 'brise']
}

monsters.etoile_de_la_mer_d_asse = {
    id: 'etoile_de_la_mer_d_asse',
    name: 'Étoile de la Mer d\'Asse',
    image: 'images/monsters/Étoile_de_la_Mer_d_Asse.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 430, atk: 168, spd: 100, res: { neutre: 6, terre: 26, feu: -9, eau: -9, air: 21 } },
    moves: ['salage', 'crachat_de_sable', 'soin_groupe']
}

monsters.moumoule = {
    id: 'moumoule',
    name: 'Moumoule',
    image: 'images/monsters/Moumoule.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 430, atk: 168, spd: 100, res: { neutre: 100, terre: 0, feu: 0, eau: 100, air: 0 } },
    moves: ['ninjattaque', 'bubulle', 'coquille']
}

monsters.grokoko = {
    id: 'grokoko',
    name: 'Grokoko',
    image: 'images/monsters/Grokoko.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 430, atk: 100, spd: 100, res: { neutre: 10, terre: 12, feu: -16, eau: 0, air: 2 } },
    moves: ['koulraoul', 'kokospiration']
}

monsters.abraknyde = {
    id: 'abraknyde',
    name: 'Abraknyde',
    image: 'images/monsters/Abraknyde.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 440, atk: 150, spd: 100, res: { neutre: 4, terre: 5, feu: -20, eau: 5, air: -20 } },
    moves: ['Ecrasement_Abraknydien', 'Abrakage', 'Ecorce_agressive', 'Reconstitution_Abraknydienne']
}

monsters.kwakereFlamme = {
    id: 'kwakereFlamme',
    name: 'Kwakere Flamme',
    image: 'images/monsters/Kwakere_de_Flamme.png',
    rarity: 'peu_commun',
    tier: 'normal',
    bst: { hp: 440, atk: 155, spd: 105, res: { neutre: 100, terre: 25, feu: 100, eau: -25, air: 25 } },
    moves: ['wakolanterne_flamme', 'wakzefeute_flamme', 'griffes_acerees']
}

monsters.kwakereGlace = {
    id: 'kwakereGlace',
    name: 'Kwakere Glace',
    image: 'images/monsters/Kwakere_de_Glace.png',
    rarity: 'peu_commun',
    tier: 'normal',
    bst: { hp: 440, atk: 155, spd: 105, res: { neutre: 100, terre: 25, feu: -25, eau: 100, air: 25 } },
    moves: ['wakolanterne_glace', 'wakzefeute_glace', 'griffes_acerees']
}

monsters.kwakereTerre = {
    id: 'kwakereTerre',
    name: 'Kwakere Terre',
    image: 'images/monsters/Kwakere_de_Terre.png',
    rarity: 'peu_commun',
    tier: 'normal',
    bst: { hp: 440, atk: 155, spd: 105, res: { neutre: 100, terre: 100, feu: 25, eau: 25, air: -25 } },
    moves: ['wakolanterne_terre', 'wakzefeute_terre', 'griffes_acerees']
}

monsters.kwakereVent = {
    id: 'kwakereVent',
    name: 'Kwakere Vent',
    image: 'images/monsters/Kwakere_de_Vent.png',
    rarity: 'peu_commun',
    tier: 'normal',
    bst: { hp: 440, atk: 155, spd: 105, res: { neutre: 100, terre: -25, feu: 25, eau: 25, air: 100 } },
    moves: ['wakolanterne_vent', 'wakzefeute_vent', 'griffes_acerees']
}

monsters.blop_indigo_invoque = {
    id: 'blop_indigo_invoque',
    name: 'Blop Indigo invoqué',
    image: 'images/monsters/Blop_Indigo_invoqué.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 440, atk: 100, spd: 100, res: { neutre: 15, terre: 15, feu: -62, eau: 50, air: 15 } },
    moves: ['blyphe_koalak']
}

monsters.blop_coco_invoque = {
    id: 'blop_coco_invoque',
    name: 'Blop Coco invoqué',
    image: 'images/monsters/Blop_Coco_invoqué.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 440, atk: 100, spd: 100, res: { neutre: 15, terre: -62, feu: 15, eau: 15, air: 50 } },
    moves: ['blyphe_koalak']
}

monsters.blop_griotte_invoque = {
    id: 'blop_griotte_invoque',
    name: 'Blop Griotte invoqué',
    image: 'images/monsters/Blop_Griotte_invoqué.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 440, atk: 100, spd: 100, res: { neutre: 15, terre: 15, feu: 50, eau: -62, air: 15 } },
    moves: ['blyphe_koalak']
}

monsters.blop_reinette_invoque = {
    id: 'blop_reinette_invoque',
    name: 'Blop Reinette invoqué',
    image: 'images/monsters/Blop_Reinette_invoqué.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 440, atk: 100, spd: 100, res: { neutre: 15, terre: 50, feu: 15, eau: 15, air: -62 } },
    moves: ['blyphe_koalak']
}

monsters.black_tiwabbitus = {
    id: 'black_tiwabbitus',
    name: 'Black tiwabbitus',
    image: 'images/monsters/Black_tiwabbitus.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 460, atk: 144, spd: 100, res: { neutre: 50, terre: -10, feu: -10, eau: 2, air: 2 } },
    moves: ['enewgie_tewestwe', 'twansposition', 'wabehameha', 'frappus']
}

monsters.wabbit = {
    id: 'wabbit',
    name: 'Wabbit',
    image: 'images/monsters/Wabbit.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 470, atk: 43, spd: 100, res: { neutre: 10, terre: 5, feu: 0, eau: -5, air: 0 } },
    moves: ['farandole_de_cawottes']
}

monsters.cawottes = {
    id: 'cawottes',
    name: 'Cawottes',
    image: 'images/monsters/Cawottes.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 470, atk: 0, spd: 100, res: { neutre: 10, terre: 5, feu: 0, eau: -5, air: 0 } },
    moves: []
}

monsters.chafer_draugr = {
    id: 'chafer_draugr',
    name: 'Chafer Draugr',
    image: 'images/monsters/Chafer_Draugr.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 480, atk: 168, spd: 100, res: { neutre: 6, terre: -14, feu: 11, eau: 6, air: 11 } },
    moves: ['mjollnir', 'do_fus_rah', 'hel']
}

monsters.sanglier_des_plaines = {
    id: 'sanglier_des_plaines',
    name: 'Sanglier des Plaines',
    image: 'images/monsters/Sanglier_des_Plaines.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 480, atk: 160, spd: 100, res: { neutre: 0, terre: 11, feu: 16, eau: 26, air: -29 } },
    moves: ['protection_de_la_plaine', 'coup_de_defenses', 'hardeur']
}

monsters.bwork_mage = {
    id: 'bwork_mage',
    name: 'Bwork Mage',
    image: 'images/monsters/Bwork_Mage.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 480, atk: 72, spd: 100, res: { neutre: 2, terre: 0, feu: 5, eau: 2, air: 0 } },
    moves: ['eclair_en_serie', 'tornade', 'invocation_de_tofu_malefique']
}

monsters.bwork = {
    id: 'bwork',
    name: 'Bwork',
    image: 'images/monsters/Bwork.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 480, atk: 38, spd: 100, res: { neutre: 1, terre: 2, feu: 5, eau: -20, air: 0 } },
    moves: ['rage', 'soufflette']
}

monsters.bandit_manchot = {
    id: 'bandit_manchot',
    name: 'Bandit Manchot',
    image: 'images/monsters/Bandit_Manchot.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 480, atk: 168, spd: 100, res: { neutre: 0, terre: -16, feu: 0, eau: 0, air: 0 } },
    moves: ['persecution', 'lancer_de_hachette']
}

monsters.kwakere_de_flamme = {
    id: 'kwakere_de_flamme',
    name: 'Kwakere de Flamme',
    image: 'images/monsters/Kwakere_de_Flamme.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 480, atk: 168, spd: 100, res: { neutre: 100, terre: 21, feu: 100, eau: -29, air: 21 } },
    moves: ['wakolanterne_terre', 'wakzefeute_terre', 'griffes_acerees']
}

monsters.kwakere_de_terre = {
    id: 'kwakere_de_terre',
    name: 'Kwakere de Terre',
    image: 'images/monsters/Kwakere_de_Terre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 480, atk: 168, spd: 100, res: { neutre: 100, terre: 100, feu: 21, eau: 21, air: -29 } },
    moves: ['wakolanterne_terre', 'wakzefeute_terre', 'griffes_acerees']
}

monsters.kwakere_de_glace = {
    id: 'kwakere_de_glace',
    name: 'Kwakere de Glace',
    image: 'images/monsters/Kwakere_de_Glace.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 480, atk: 168, spd: 100, res: { neutre: 100, terre: 21, feu: -29, eau: 100, air: 21 } },
    moves: ['wakolanterne_terre', 'wakzefeute_terre', 'griffes_acerees']
}

monsters.kwakere_de_vent = {
    id: 'kwakere_de_vent',
    name: 'Kwakere de Vent',
    image: 'images/monsters/Kwakere_de_Vent.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 480, atk: 168, spd: 100, res: { neutre: 100, terre: -29, feu: 21, eau: 21, air: 100 } },
    moves: ['griffes_acerees', 'wakzefeute_terre', 'wakolanterne_terre']
}

monsters.kwakFlamme = {
    id: 'kwakFlamme',
    name: 'Kwak de Flamme',
    image: 'images/monsters/Kwak_de_Flamme.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 480, atk: 168, spd: 100, res: { neutre: 75, terre: 6, feu: 75, eau: -54, air: 6 } },
    moves: ['kwakoukas_flamme', 'wakpot_flamme', 'eventrement']
}

monsters.kwakGlace = {
    id: 'kwakGlace',
    name: 'Kwak de Glace',
    image: 'images/monsters/Kwak_de_Glace.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 480, atk: 168, spd: 100, res: { neutre: 75, terre: 6, feu: -54, eau: 75, air: 6 } },
    moves: ['kwakoukas_glace', 'wakpot_glace', 'eventrement']
}

monsters.kwakTerre = {
    id: 'kwakTerre',
    name: 'Kwak de Terre',
    image: 'images/monsters/Kwak_de_Terre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 480, atk: 168, spd: 100, res: { neutre: 75, terre: 75, feu: 6, eau: 6, air: -54 } },
    moves: ['kwakoukas_terre', 'wakpot_terre', 'eventrement']
}

monsters.kwakVent = {
    id: 'kwakVent',
    name: 'Kwak de Vent',
    image: 'images/monsters/Kwak_de_Vent.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 480, atk: 168, spd: 100, res: { neutre: 75, terre: -54, feu: 6, eau: 6, air: 75 } },
    moves: ['kwakoukas_vent', 'wakpot_vent', 'eventrement']
}

monsters.abrakne = {
    id: 'abrakne',
    name: 'Abrakne',
    image: 'images/monsters/Abrakne.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 480, atk: 144, spd: 100, res: { neutre: 10, terre: -20, feu: 20, eau: -9, air: 10 } },
    moves: ['Motivation_Sylvestre', 'Bond_affaiblissant', 'Abraknettoyage']
}

monsters.mineur_sombre = {
    id: 'mineur_sombre',
    name: 'Mineur Sombre',
    image: 'images/monsters/Mineur_Sombre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 480, atk: 72, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['coup_de_pioche', 'gaucherie_de_masse', 'escroquerie']
}

monsters.forgeron_sombre = {
    id: 'forgeron_sombre',
    name: 'Forgeron Sombre',
    image: 'images/monsters/Forgeron_Sombre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 480, atk: 72, spd: 100, res: { neutre: 4, terre: 5, feu: 5, eau: -10, air: -10 } },
    moves: ['embrochement']
}

monsters.cavalier_porkass = {
    id: 'cavalier_porkass',
    name: 'Cavalier Porkass',
    image: 'images/monsters/Cavalier_Porkass.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 480, atk: 168, spd: 100, res: { neutre: 1, terre: 21, feu: 1, eau: -14, air: 11 } },
    moves: ['defonses', 'rudesse', 'porkass_tete']
}

monsters.timongouste = {
    id: 'timongouste',
    name: 'Timongouste',
    image: 'images/monsters/Timongouste.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 480, atk: 144, spd: 100, res: { neutre: -5, terre: 5, feu: -10, eau: 10, air: 0 } },
    moves: ['jet_de_salive', 'cri_d_alerte']
}

monsters.thomondor = {
    id: 'thomondor',
    name: 'Thomondor',
    image: 'images/monsters/Thomondor.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 480, atk: 144, spd: 100, res: { neutre: -5, terre: 0, feu: -10, eau: 5, air: 10 } },
    moves: ['rafale_de_plumes', 'atterrissage']
}

monsters.trankilou = {
    id: 'trankilou',
    name: 'Trankilou',
    image: 'images/monsters/Trankilou.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 480, atk: 144, spd: 100, res: { neutre: 0, terre: -5, feu: 10, eau: -10, air: 5 } },
    moves: ['laceration', 'croc_brulant']
}

monsters.totem_du_feu = {
    id: 'totem_du_feu',
    name: 'Totem du Feu',
    image: 'images/monsters/Totem_du_Feu.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 500, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 100, eau: 0, air: 0 } },
    moves: []
}

monsters.totem_de_l_eau = {
    id: 'totem_de_l_eau',
    name: 'Totem de l\'Eau',
    image: 'images/monsters/Totem_de_l_Eau.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 500, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 100, air: 0 } },
    moves: []
}

monsters.totem_de_l_air = {
    id: 'totem_de_l_air',
    name: 'Totem de l\'Air',
    image: 'images/monsters/Totem_de_l_Air.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 500, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 100 } },
    moves: []
}

monsters.totem_de_la_terre = {
    id: 'totem_de_la_terre',
    name: 'Totem de la Terre',
    image: 'images/monsters/Totem_de_la_Terre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 500, atk: 0, spd: 100, res: { neutre: 0, terre: 100, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.sousouris_agressive = {
    id: 'sousouris_agressive',
    name: 'Sousouris Agressive',
    image: 'images/monsters/Sousouris_Agressive.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 500, atk: 250, spd: 100, res: { neutre: 20, terre: 20, feu: 20, eau: 20, air: 20 } },
    moves: ['emmental']
}

monsters.black_wabbit = {
    id: 'black_wabbit',
    name: 'Black Wabbit',
    image: 'images/monsters/Black_Wabbit.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 500, atk: 73, spd: 100, res: { neutre: 10, terre: -5, feu: 5, eau: 11, air: 12 } },
    moves: ['wabeha']
}

monsters.chafer_lancier = {
    id: 'chafer_lancier',
    name: 'Chafer Lancier',
    image: 'images/monsters/Chafer_Lancier.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 520, atk: 168, spd: 100, res: { neutre: 11, terre: 1, feu: 26, eau: 16, air: 0 } },
    moves: ['euphorie_malsaine', 'transpercement', 'aouh']
}

monsters.chafer_d_elite = {
    id: 'chafer_d_elite',
    name: 'Chafer d\'Élite',
    image: 'images/monsters/Chafer_d_Élite.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 520, atk: 168, spd: 100, res: { neutre: 0, terre: 16, feu: 21, eau: 6, air: 11 } },
    moves: ['frenesie', 'coup_d_elite', 'coup_affaiblissant']
}

monsters.noeul = {
    id: 'noeul',
    name: 'Noeul',
    image: 'images/monsters/Noeul.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 520, atk: 44, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['hypnose', 'mirettes']
}

monsters.wabbit_squelette = {
    id: 'wabbit_squelette',
    name: 'Wabbit Squelette',
    image: 'images/monsters/Wabbit_Squelette.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 540, atk: 50, spd: 100, res: { neutre: 50, terre: 40, feu: 10, eau: -14, air: 15 } },
    moves: ['entetement']
}

monsters.bourdard = {
    id: 'bourdard',
    name: 'Bourdard',
    image: 'images/monsters/Bourdard.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 540, atk: 120, spd: 100, res: { neutre: 7, terre: -18, feu: 20, eau: -5, air: 5 } },
    moves: ['essaimage', 'bizz', 'buzz']
}

monsters.ramane_d_egoutant = {
    id: 'ramane_d_egoutant',
    name: 'Ramane d\'Égoutant',
    image: 'images/monsters/Ramane.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 550, atk: 208, spd: 100, res: { neutre: 1, terre: 41, feu: 5, eau: 23, air: -10 } },
    moves: ['invocation_de_kolerat_d_egoutant', 'emmental_d_egoutant', 'roblochon_d_egoutant']
}

monsters.rat_d_egoutant = {
    id: 'rat_d_egoutant',
    name: 'Rat d\'Égoutant',
    image: 'images/monsters/Rat_d_Égoutant.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 550, atk: 208, spd: 100, res: { neutre: 5, terre: 47, feu: -24, eau: 24, air: -17 } },
    moves: ['empalement']
}

monsters.rupture_d_encre = {
    id: 'rupture_d_encre',
    name: 'Rupture d\'encre',
    image: 'images/monsters/Rupture_d_encre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 550, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.rupture_de_papier = {
    id: 'rupture_de_papier',
    name: 'Rupture de papier',
    image: 'images/monsters/Rupture_de_papier.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 550, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.malleOutillee = {
    id: 'malleOutillee',
    name: 'Malle Outillée',
    image: 'images/monsters/Malle_Outillée.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 570, atk: 133, spd: 100, res: { neutre: 40, terre: 10, feu: 10, eau: 10, air: 10 } },
    moves: ['construction']
}

monsters.milicien = {
    id: 'milicien',
    name: 'Milicien',
    image: 'images/monsters/Milicien.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 570, atk: 0, spd: 100, res: { neutre: 4, terre: 30, feu: 30, eau: 30, air: 30 } },
    moves: ['virevolte', 'laminage']
}

monsters.krokille_novice_insipide = {
    id: 'krokille_novice_insipide',
    name: 'Krokille Novice Insipide',
    image: 'images/monsters/Krokille_Novice_Insipide.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 580, atk: 57, spd: 100, res: { neutre: 70, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['venin_ankylosant', 'alanguissement']
}

monsters.krokille_novice_boueuse = {
    id: 'krokille_novice_boueuse',
    name: 'Krokille Novice Boueuse',
    image: 'images/monsters/Krokille_Novice_Boueuse.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 580, atk: 57, spd: 100, res: { neutre: 0, terre: 70, feu: 0, eau: 0, air: -15 } },
    moves: ['entetement_obsessionnel', 'attraction_stabilisante']
}

monsters.krokille_novice_incandescente = {
    id: 'krokille_novice_incandescente',
    name: 'Krokille Novice Incandescente',
    image: 'images/monsters/Krokille_Novice_Incandescente.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 580, atk: 57, spd: 100, res: { neutre: 0, terre: 0, feu: 70, eau: -15, air: 0 } },
    moves: ['agonie', 'contre_faiblesse']
}

monsters.krokille_novice_humide = {
    id: 'krokille_novice_humide',
    name: 'Krokille Novice Humide',
    image: 'images/monsters/Krokille_Novice_Humide.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 580, atk: 57, spd: 100, res: { neutre: 0, terre: 0, feu: -15, eau: 70, air: 0 } },
    moves: ['humidification', 'noyade']
}

monsters.krokille_novice_seche = {
    id: 'krokille_novice_seche',
    name: 'Krokille Novice Sèche',
    image: 'images/monsters/Krokille_Novice_Sèche.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 580, atk: 57, spd: 100, res: { neutre: 0, terre: -15, feu: 0, eau: 0, air: 70 } },
    moves: ['secheresse', 'ouragan_renversant']
}

monsters.black_wabbit_squelette = {
    id: 'black_wabbit_squelette',
    name: 'Black Wabbit Squelette',
    image: 'images/monsters/Black_Wabbit_Squelette.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 580, atk: 100, spd: 100, res: { neutre: -20, terre: 0, feu: 5, eau: 50, air: 5 } },
    moves: ['coup_a_la_wizou']
}

monsters.tofu_ventripotent = {
    id: 'tofu_ventripotent',
    name: 'Tofu Ventripotent',
    image: 'images/monsters/Tofu_Ventripotent.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 610, atk: 146, spd: 100, res: { neutre: 40, terre: 38, feu: 23, eau: -25, air: 32 } },
    moves: ['invocation_de_bomberfu', 'benediction_du_tofulailler']
}

monsters.lanterne_bombe = {
    id: 'lanterne_bombe',
    name: 'Lanterne bombe',
    image: 'images/monsters/Lanterne_bombe.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 610, atk: 500, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['elemental_spear', 'bomball']
}

monsters.lanterne_grappe_de_petards = {
    id: 'lanterne_grappe_de_petards',
    name: 'Lanterne grappe de pétards',
    image: 'images/monsters/Lanterne_grappe_de_pétards.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 610, atk: 500, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['elemental_spear', 'bomball']
}

monsters.poupee_aycetroy = {
    id: 'poupee_aycetroy',
    name: 'Poupée Aycetroy',
    image: 'images/monsters/Poupée_Aycetroy.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 610, atk: 25, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['myopie_poupesque']
}

monsters.rat_d_hyoactif = {
    id: 'rat_d_hyoactif',
    name: 'Rat d\'Hyoactif',
    image: 'images/monsters/Rat_d_Hyoactif.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 610, atk: 208, spd: 100, res: { neutre: 17, terre: -31, feu: 25, eau: -16, air: 40 } },
    moves: ['ratiboisement', 'rayonnement_hyoactif', 'coup_agglutinant']
}

monsters.blopignon = {
    id: 'blopignon',
    name: 'Blopignon',
    image: 'images/monsters/Blopignon.png',
    rarity: 'peu_commun',
    tier: 'normal',
    bst: { hp: 610, atk: 208, spd: 110, res: { neutre: 21, terre: -19, feu: -14, eau: 0, air: 26 } },
    moves: ['bloblo', 'blopiction', 'bloprojection']
}

monsters.tronkoBlop = {
    id: 'tronkoBlop',
    name: 'Tronko Blop',
    image: 'images/monsters/TronkoBlop.png',
    rarity: 'peu_commun',
    tier: 'normal',
    bst: { hp: 610, atk: 208, spd: 110, res: { neutre: 0, terre: 41, feu: 31, eau: -9, air: -24 } },
    moves: ['blopzone', 'blopsoin']
}

monsters.robotPoussePousse = {
    id: 'robotPoussePousse',
    name: 'Robot Pousse-Pousse',
    image: 'images/monsters/Robot_Pousse-Pousse.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 610, atk: 100, spd: 100, res: { neutre: 20, terre: 20, feu: 30, eau: -10, air: -20 } },
    moves: ['pousse_moi', 'pousse_toi']
}

monsters.wo_wabbit = {
    id: 'wo_wabbit',
    name: 'Wo Wabbit',
    image: 'images/monsters/Wo_Wabbit.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 610, atk: 25, spd: 100, res: { neutre: 18, terre: 18, feu: 10, eau: -15, air: 0 } },
    moves: ['invocation_de_tiwabbit', 'invocation_de_black_tiwabbit', 'ventroboom', 'invocation_de_tiwabbit_kiafin']
}

monsters.kanniboul_ark = {
    id: 'kanniboul_ark',
    name: 'Kanniboul Ark',
    image: 'images/monsters/Kanniboul_Ark.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 610, atk: 100, spd: 100, res: { neutre: -18, terre: 2, feu: 22, eau: 2, air: 0 } },
    moves: ['coup_de_masque', 'tir_a_l_arc_primitif']
}

monsters.kanniboul_eth = {
    id: 'kanniboul_eth',
    name: 'Kanniboul Eth',
    image: 'images/monsters/Kanniboul_Eth.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 610, atk: 100, spd: 100, res: { neutre: 2, terre: 0, feu: -18, eau: 2, air: 22 } },
    moves: ['fronde_poche', 'inspiration_vaudou', 'eternuement_collateral']
}

monsters.kanniboul_jav = {
    id: 'kanniboul_jav',
    name: 'Kanniboul Jav',
    image: 'images/monsters/Kanniboul_Jav.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 610, atk: 100, spd: 100, res: { neutre: 0, terre: -18, feu: 2, eau: 22, air: 2 } },
    moves: ['poussee_amicale', 'javeline_fulgurante', 'iousholnotpasse']
}

monsters.kanniboul_sarbak = {
    id: 'kanniboul_sarbak',
    name: 'Kanniboul Sarbak',
    image: 'images/monsters/Kanniboul_Sarbak.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 610, atk: 100, spd: 100, res: { neutre: 2, terre: 22, feu: 2, eau: 0, air: -18 } },
    moves: ['sarbakanniboul', 'cri_sauvage']
}

monsters.kanniboul_tam = {
    id: 'kanniboul_tam',
    name: 'Kanniboul Tam',
    image: 'images/monsters/Kanniboul_Tam.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 610, atk: 100, spd: 100, res: { neutre: 22, terre: 2, feu: 0, eau: -18, air: 2 } },
    moves: ['batou_kada', 'tambour_motivant']
}

monsters.twakeuf = {
    id: 'twakeuf',
    name: 'Twakeuf',
    image: 'images/monsters/Twakeuf.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 610, atk: 118, spd: 100, res: { neutre: -5, terre: 0, feu: 5, eau: 10, air: 15 } },
    moves: ['souffle_liqueuwant', 'spiwitueuw', 'absowption', 'mowfal']
}

monsters.warkaik = {
    id: 'warkaik',
    name: 'Warkaïk',
    image: 'images/monsters/Warkaïk.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 610, atk: 100, spd: 100, res: { neutre: 2, terre: 12, feu: 5, eau: 10, air: 15 } },
    moves: ['chokobombawde', 'twanchee', 'ombwage']
}

monsters.wadulant = {
    id: 'wadulant',
    name: 'Wadulant',
    image: 'images/monsters/Wadulant.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 610, atk: 100, spd: 100, res: { neutre: 2, terre: 1, feu: 2, eau: 1, air: 15 } },
    moves: ['celewite', 'secouwiste', 'ufowie']
}

monsters.robotFleau = {
    id: 'robotFleau',
    name: 'Robot Fleau',
    image: 'images/monsters/Robot_Fléau.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 630, atk: 133, spd: 100, res: { neutre: 20, terre: 30, feu: -20, eau: 30, air: 10 } },
    moves: ['micro_onde', 'macro_onde']
}

monsters.waccro = {
    id: 'waccro',
    name: 'Waccro',
    image: 'images/monsters/Waccro.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 630, atk: 103, spd: 100, res: { neutre: 7, terre: 12, feu: 0, eau: 5, air: 10 } },
    moves: ['stewoides', 'skwat', 'gwokwik']
}

monsters.buffalourd = {
    id: 'buffalourd',
    name: 'Buffalourd',
    image: 'images/monsters/Buffalourd.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 630, atk: 144, spd: 100, res: { neutre: 5, terre: 10, feu: -5, eau: -10, air: 0 } },
    moves: ['secousse_tellurique', 'plaquage']
}

monsters.grolours = {
    id: 'grolours',
    name: 'Grolours',
    image: 'images/monsters/Grolours.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 630, atk: 144, spd: 100, res: { neutre: 10, terre: 5, feu: 0, eau: -5, air: -10 } },
    moves: ['impact_ecrasant']
}

monsters.poupee_emeraude = {
    id: 'poupee_emeraude',
    name: 'Poupée Émeraude',
    image: 'images/monsters/Workette.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 650, atk: 50, spd: 100, res: { neutre: 90, terre: 90, feu: 90, eau: 90, air: -20 } },
    moves: ['transposition_poupesque', 'calin_poupesque', 'bond_poupesque']
}

monsters.gelee_fraise = {
    id: 'gelee_fraise',
    name: 'Gelée Fraise',
    image: 'images/monsters/Gelée_Fraise.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 650, atk: 150, spd: 110, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['Gelpikes', 'Fraise_Os', 'Tartinade']
}

monsters.gelee_bleuet = {
    id: 'gelee_bleuet',
    name: 'Gelée Bleuet',
    image: 'images/monsters/Gelée_Bleuet.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 650, atk: 150, spd: 110, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['Gelpikes', 'Bleuet_Os', 'Tartinade']
}

monsters.gelee_menthe = {
    id: 'gelee_menthe',
    name: 'Gelée Menthe',
    image: 'images/monsters/Gelée_Menthe.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 650, atk: 150, spd: 110, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['Gelpikes', 'Menthe_Os', 'Tartinade']
}

monsters.gelee_citron = {
    id: 'gelee_citron',
    name: 'Gelée Citron',
    image: 'images/monsters/Gelée_Citron.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 650, atk: 150, spd: 110, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['Gelpikes', 'Citron_Os', 'Tartinade']
}

monsters.souris_verte = {
    id: 'souris_verte',
    name: 'Souris Verte',
    image: 'images/monsters/Souris_Verte.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 650, atk: 216, spd: 100, res: { neutre: 20, terre: 15, feu: 7, eau: 7, air: 30 } },
    moves: ['regard_fondant', 'postillon_brulant']
}

monsters.serpentin = {
    id: 'serpentin',
    name: 'Serpentin',
    image: 'images/monsters/Serpentin.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 680, atk: 208, spd: 100, res: { neutre: -20, terre: 9, feu: -10, eau: 15, air: 5 } },
    moves: ['dissimulation', 'venin', 'surprise']
}

monsters.blopCoco = {
    id: 'blopCoco',
    name: 'Blop Coco',
    image: 'images/monsters/Biblop_Coco.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 680, atk: 208, spd: 110, res: { neutre: 15, terre: -62, feu: 15, eau: 15, air: 50 } },
    moves: ['bibloperie_air', 'biblopiment_air']
}

monsters.blopGriotte = {
    id: 'blopGriotte',
    name: 'Blop Griotte',
    image: 'images/monsters/Biblop_Griotte.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 680, atk: 208, spd: 110, res: { neutre: 15, terre: 15, feu: 50, eau: -62, air: 15 } },
    moves: ['bibloperie_feu', 'biblopiment_feu']
}

monsters.blopIndigo = {
    id: 'blopIndigo',
    name: 'Blop Indigo',
    image: 'images/monsters/Biblop_Indigo.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 680, atk: 208, spd: 110, res: { neutre: 15, terre: 15, feu: -62, eau: 50, air: 15 } },
    moves: ['bibloperie_eau', 'biblopiment_eau']
}

monsters.blopReinette = {
    id: 'blopReinette',
    name: 'Blop Reinette',
    image: 'images/monsters/Biblop_Reinette.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 680, atk: 208, spd: 110, res: { neutre: 15, terre: 50, feu: 15, eau: 15, air: -62 } },
    moves: ['bibloperie_terre', 'biblopiment_terre']
}

monsters.guerrier_mental = {
    id: 'guerrier_mental',
    name: 'Guerrier Mental',
    image: 'images/monsters/Guerrier_Mental.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 680, atk: 208, spd: 100, res: { neutre: -10, terre: -19, feu: 32, eau: 7, air: 25 } },
    moves: ['estocade_errante', 'concentration_psychique']
}

monsters.wadnozeam = {
    id: 'wadnozeam',
    name: 'Wadnozéam',
    image: 'images/monsters/Wadnozéam.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 680, atk: 100, spd: 100, res: { neutre: 10, terre: 15, feu: 5, eau: 0, air: 7 } },
    moves: ['afwiandage', 'wagglutinant', 'pouwsuite']
}

monsters.larve_champetre = {
    id: 'larve_champetre',
    name: 'Larve Champêtre',
    image: 'images/monsters/Larve_Champêtre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 690, atk: 224, spd: 100, res: { neutre: 15, terre: 1, feu: 18, eau: 8, air: -15 } },
    moves: ['larvaportation', 'toussotement_larvesque', 'larvement_champetre']
}

monsters.le_flib = {
    id: 'le_flib',
    name: 'Le Flib',
    image: 'images/monsters/Le_Flib.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 690, atk: 100, spd: 100, res: { neutre: 5, terre: 12, feu: 25, eau: 15, air: -30 } },
    moves: ['passton_tournoube', 'trinquons_ensemble_moussaillon', 'prestidigitation']
}

monsters.sparo = {
    id: 'sparo',
    name: 'Sparo',
    image: 'images/monsters/Sparo.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 710, atk: 100, spd: 100, res: { neutre: 10, terre: -9, feu: -31, eau: 5, air: 29 } },
    moves: ['crochet', 'glouto_rhum']
}

monsters.barbroussa = {
    id: 'barbroussa',
    name: 'Barbroussa',
    image: 'images/monsters/Barbroussa.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 730, atk: 100, spd: 100, res: { neutre: 5, terre: -26, feu: -18, eau: 35, air: 10 } },
    moves: ['abordage', 'rapine']
}

monsters.dragodinde_amande_sauvage = {
    id: 'dragodinde_amande_sauvage',
    name: 'Dragodinde amande sauvage',
    image: 'images/monsters/Dragodinde_amande_sauvage.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 740, atk: 192, spd: 100, res: { neutre: 25, terre: 15, feu: -9, eau: 50, air: -9 } },
    moves: ['dindoboule', 'stimulation_dragodinde']
}

monsters.dragodinde_rousse_sauvage = {
    id: 'dragodinde_rousse_sauvage',
    name: 'Dragodinde rousse sauvage',
    image: 'images/monsters/Dragodinde_rousse_sauvage.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 740, atk: 192, spd: 100, res: { neutre: 25, terre: -9, feu: 50, eau: -9, air: 15 } },
    moves: ['dindofeu']
}

monsters.dragodinde_doree_sauvage = {
    id: 'dragodinde_doree_sauvage',
    name: 'Dragodinde dorée sauvage',
    image: 'images/monsters/Dragodinde_dorée_sauvage.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 740, atk: 192, spd: 100, res: { neutre: 25, terre: -9, feu: -9, eau: 15, air: 50 } },
    moves: ['dindoneau', 'dragodingue']
}

monsters.maitre_bolet = {
    id: 'maitre_bolet',
    name: 'Maître Bolet',
    image: 'images/monsters/Maître_Bolet.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 740, atk: 248, spd: 100, res: { neutre: 10, terre: 12, feu: 5, eau: -15, air: -9 } },
    moves: ['sporification', 'champi_champsoin', 'sabrochement']
}

monsters.robionicle = {
    id: 'robionicle',
    name: 'Robionicle',
    image: 'images/monsters/Robionicle.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 740, atk: 133, spd: 100, res: { neutre: 40, terre: -20, feu: 10, eau: 30, air: -10 } },
    moves: ['blast', 'turbine']
}

monsters.elementerre = {
    id: 'elementerre',
    name: 'Élémenterre',
    image: 'images/monsters/Élémenterre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 750, atk: 236, spd: 100, res: { neutre: 21, terre: 50, feu: -24, eau: 9, air: -14 } },
    moves: ['sismologie', 'terraportation', 'terpanation']
}

monsters.koalak_immature = {
    id: 'koalak_immature',
    name: 'Koalak Immature',
    image: 'images/monsters/Koalak_Immature.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 780, atk: 113, spd: 100, res: { neutre: 20, terre: -9, feu: -40, eau: 30, air: 40 } },
    moves: ['decharge', 'decharge_magistrale', 'liberation_koalak']
}

monsters.dolbinos = {
    id: 'dolbinos',
    name: 'Dolbinos',
    image: 'images/monsters/Dolbinos.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 780, atk: 200, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['coup_de_bec_affaiblissant', 'dotite']
}

monsters.dokachu = {
    id: 'dokachu',
    name: 'Dokachu',
    image: 'images/monsters/Dokachu.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 780, atk: 200, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['dorage', 'donnerre']
}

monsters.dolivar = {
    id: 'dolivar',
    name: 'Dolivar',
    image: 'images/monsters/Dolivar.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 780, atk: 200, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['dorage', 'donnerre']
}

monsters.garde_de_pwak = {
    id: 'garde_de_pwak',
    name: 'Garde de Pwâk',
    image: 'images/monsters/Garde_de_Pwâk.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 780, atk: 250, spd: 100, res: { neutre: 2, terre: -18, feu: 12, eau: -13, air: 6 } },
    moves: ['croquanibalisme', 'guimimauve', 'englumauve', 'attrape_gourmand']
}

monsters.shokipik = {
    id: 'shokipik',
    name: 'Shokipik',
    image: 'images/monsters/Shokipik.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 780, atk: 180, spd: 100, res: { neutre: -24, terre: 13, feu: -24, eau: 4, air: -1 } },
    moves: ['amstramgram', 'bourebour', 'ratatam']
}

monsters.pandawasta = {
    id: 'pandawasta',
    name: 'Pandawasta',
    image: 'images/monsters/Pandawasta.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 800, atk: 39, spd: 100, res: { neutre: 20, terre: 20, feu: 20, eau: 20, air: 20 } },
    moves: ['meditation', 'coup_de_bambou']
}

monsters.chef_crocodaille = {
    id: 'chef_crocodaille',
    name: 'Chef Crocodaille',
    image: 'images/monsters/Chef_Crocodaille.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 800, atk: 55, spd: 100, res: { neutre: 15, terre: 40, feu: 35, eau: 50, air: 15 } },
    moves: ['epee_de_panique']
}

monsters.oeuf_de_tregenaire = {
    id: 'oeuf_de_tregenaire',
    name: 'Oeuf de Trégénaire',
    image: 'images/monsters/Oeuf_de_Trégénaire.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 800, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.degelee = {
    id: 'degelee',
    name: 'Dégelée',
    image: 'images/monsters/Dégelée.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 810, atk: 100, spd: 100, res: { neutre: 10, terre: 10, feu: 10, eau: 10, air: 10 } },
    moves: ['decasse', 'papouille']
}

monsters.arakne_olithique = {
    id: 'arakne_olithique',
    name: 'Arakne Olithique',
    image: 'images/monsters/Arakne_Majeure.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 820, atk: 248, spd: 100, res: { neutre: 6, terre: -17, feu: 50, eau: -46, air: 37 } },
    moves: ['remous_marecageux', 'venin_dopant']
}

monsters.craqueboule = {
    id: 'craqueboule',
    name: 'Craqueboule',
    image: 'images/monsters/Craqueboule.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 820, atk: 248, spd: 100, res: { neutre: 20, terre: 20, feu: 20, eau: 20, air: 20 } },
    moves: ['martelement', 'motivation_tellurique']
}

monsters.dragoeufArdoise = {
    id: 'dragoeufArdoise',
    name: 'Dragoeuf Ardoise',
    image: 'images/monsters/Dragoeuf_Ardoise.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 820, atk: 190, spd: 110, res: { neutre: 17, terre: 12, feu: -10, eau: 22, air: 9 } },
    moves: ['Feuilletage', 'Fendage']
}

monsters.dragoeufArgile = {
    id: 'dragoeufArgile',
    name: 'Dragoeuf Argile',
    image: 'images/monsters/Dragoeuf_Argile.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 820, atk: 190, spd: 110, res: { neutre: 17, terre: -10, feu: 9, eau: 12, air: 22 } },
    moves: ['Cataplasme', 'Engobage']
}

monsters.dragoeufCalcaire = {
    id: 'dragoeufCalcaire',
    name: 'Dragoeuf Calcaire',
    image: 'images/monsters/Dragoeuf_Calcaire.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 820, atk: 190, spd: 110, res: { neutre: 17, terre: 22, feu: 12, eau: 9, air: -10 } },
    moves: ['Entartrage', 'Calcination']
}

monsters.dragoeufCharbon = {
    id: 'dragoeufCharbon',
    name: 'Dragoeuf Charbon',
    image: 'images/monsters/Dragoeuf_Charbon.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 820, atk: 190, spd: 110, res: { neutre: 17, terre: 9, feu: 22, eau: -10, air: 12 } },
    moves: ['Silicose', 'Crassier']
}

monsters.kanigrou = {
    id: 'kanigrou',
    name: 'Kanigrou',
    image: 'images/monsters/Kanigrou.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 820, atk: 248, spd: 100, res: { neutre: 22, terre: 22, feu: 22, eau: -9, air: -9 } },
    moves: ['saut_majestueux', 'destin_force', 'eventration_multiple']
}

monsters.scorbute = {
    id: 'scorbute',
    name: 'Scorbute',
    image: 'images/monsters/Scorbute.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 820, atk: 248, spd: 100, res: { neutre: 1, terre: 6, feu: 21, eau: 11, air: 0 } },
    moves: ['alteration', 'poison_du_scorbute', 'coup_de_queue']
}

monsters.croc_gland = {
    id: 'croc_gland',
    name: 'Croc Gland',
    image: 'images/monsters/Croc_Gland.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 820, atk: 248, spd: 100, res: { neutre: 21, terre: -9, feu: -9, eau: 1, air: 31 } },
    moves: ['dechirement_intestinal', 'ablation_testiculaire', 'desenvoutement_canin']
}

monsters.macien = {
    id: 'macien',
    name: 'Macien',
    image: 'images/monsters/Macien.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 820, atk: 248, spd: 100, res: { neutre: 1, terre: 31, feu: 16, eau: -9, air: 0 } },
    moves: ['chaine_chienne', 'aboiement_sauvage', 'souffle_canin']
}

monsters.crowneille = {
    id: 'crowneille',
    name: 'Crowneille',
    image: 'images/monsters/Crowneille.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 820, atk: 248, spd: 100, res: { neutre: 21, terre: -14, feu: 21, eau: -14, air: 21 } },
    moves: ['draveine', 'catubodua', 'baillement']
}

monsters.muldo_indigo_sauvage = {
    id: 'muldo_indigo_sauvage',
    name: 'Muldo indigo sauvage',
    image: 'images/monsters/Muldo_indigo_sauvage.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 820, atk: 192, spd: 100, res: { neutre: 10, terre: 10, feu: 10, eau: -10, air: 10 } },
    moves: ['coup_de_bouldo', 'souille']
}

monsters.muldo_ebene_sauvage = {
    id: 'muldo_ebene_sauvage',
    name: 'Muldo ébène sauvage',
    image: 'images/monsters/Muldo_ébène_sauvage.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 820, atk: 192, spd: 100, res: { neutre: 10, terre: -10, feu: 10, eau: 10, air: 10 } },
    moves: []
}

monsters.muldo_orchidee_sauvage = {
    id: 'muldo_orchidee_sauvage',
    name: 'Muldo orchidée sauvage',
    image: 'images/monsters/Muldo_orchidée_sauvage.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 820, atk: 192, spd: 100, res: { neutre: 10, terre: 10, feu: 10, eau: 10, air: -10 } },
    moves: []
}

monsters.muldo_pourpre_sauvage = {
    id: 'muldo_pourpre_sauvage',
    name: 'Muldo pourpre sauvage',
    image: 'images/monsters/Muldo_pourpre_sauvage.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 820, atk: 192, spd: 100, res: { neutre: 10, terre: 10, feu: -10, eau: 10, air: 10 } },
    moves: []
}

monsters.muldo_dore_sauvage = {
    id: 'muldo_dore_sauvage',
    name: 'Muldo doré sauvage',
    image: 'images/monsters/Muldo_doré_sauvage.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 820, atk: 192, spd: 100, res: { neutre: -10, terre: 10, feu: 10, eau: 10, air: 10 } },
    moves: []
}

monsters.craquelourd = {
    id: 'craquelourd',
    name: 'Craquelourd',
    image: 'images/monsters/Craquelourd.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 820, atk: 248, spd: 100, res: { neutre: 20, terre: 15, feu: -28, eau: 5, air: 28 } },
    moves: ['snaille_pierre', 'gravure_dans_la_roche', 'choc_dessus']
}

monsters.volkorne_orchidee_sauvage = {
    id: 'volkorne_orchidee_sauvage',
    name: 'Volkorne orchidée sauvage',
    image: 'images/monsters/Volkorne_orchidée_sauvage.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 820, atk: 192, spd: 100, res: { neutre: 20, terre: 20, feu: 0, eau: 20, air: 0 } },
    moves: ['volkardeur', 'volkolere']
}

monsters.volkorne_indigo_sauvage = {
    id: 'volkorne_indigo_sauvage',
    name: 'Volkorne indigo sauvage',
    image: 'images/monsters/Volkorne_indigo_sauvage.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 820, atk: 192, spd: 100, res: { neutre: 20, terre: 0, feu: 20, eau: 0, air: 20 } },
    moves: ['volkohue', 'volkonde']
}

monsters.volkorne_ebene_sauvage = {
    id: 'volkorne_ebene_sauvage',
    name: 'Volkorne ébène sauvage',
    image: 'images/monsters/Volkorne_ébène_sauvage.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 820, atk: 192, spd: 100, res: { neutre: 20, terre: 0, feu: 20, eau: 20, air: 0 } },
    moves: ['volkair', 'volkattirance']
}

monsters.volkorne_pourpre_sauvage = {
    id: 'volkorne_pourpre_sauvage',
    name: 'Volkorne pourpre sauvage',
    image: 'images/monsters/Volkorne_pourpre_sauvage.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 820, atk: 192, spd: 100, res: { neutre: 20, terre: 20, feu: 0, eau: 0, air: 20 } },
    moves: ['volkalme', 'volkeclat']
}

monsters.uf_de_pwak_dore = {
    id: 'uf_de_pwak_dore',
    name: 'Œuf de Pwâk doré',
    image: 'images/monsters/Œuf_de_Pwâk_doré.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 860, atk: 180, spd: 100, res: { neutre: 100, terre: 5, feu: 5, eau: 5, air: 5 } },
    moves: []
}

monsters.foufayteur = {
    id: 'foufayteur',
    name: 'Foufayteur',
    image: 'images/monsters/Foufayteur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 860, atk: 133, spd: 100, res: { neutre: -9, terre: -11, feu: -19, eau: 4, air: 20 } },
    moves: ['quamehameha', 'art_du_combat', 'balayette']
}

monsters.petite_marionnette = {
    id: 'petite_marionnette',
    name: 'Petite Marionnette',
    image: 'images/monsters/Petite_Marionnette.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 890, atk: 100, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['ainsi_font']
}

monsters.pantin = {
    id: 'pantin',
    name: 'Pantin',
    image: 'images/monsters/Pantin.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 890, atk: 100, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['coup_de_pied']
}

monsters.milimeulou = {
    id: 'milimeulou',
    name: 'Milimeulou',
    image: 'images/monsters/Meulou.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 890, atk: 400, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['grigriffes']
}

monsters.kolerat = {
    id: 'kolerat',
    name: 'Kolérat',
    image: 'images/monsters/Kolérat.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 900, atk: 248, spd: 100, res: { neutre: -14, terre: 31, feu: -14, eau: 41, air: -9 } },
    moves: ['morsure_affaiblissante','hypnose_brulante', 'morstrubien']
}

monsters.craqueleur = {
    id: 'craqueleur',
    name: 'Craqueleur',
    image: 'images/monsters/Craqueleur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 900, atk: 248, spd: 100, res: { neutre: 6, terre: 14, feu: 6, eau: -6, air: -16 } },
    moves: ['Ecrasement_Handicapant']
}

monsters.craqueleur_des_plaines = {
    id: 'craqueleur_des_plaines',
    name: 'Craqueleur des Plaines',
    image: 'images/monsters/Craqueleur_des_Plaines.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 900, atk: 248, spd: 100, res: { neutre: -8, terre: -8, feu: 6, eau: 36, air: 16 } },
    moves: ['Ecrasement_Handicapant']
}

monsters.craquelope = {
    id: 'craquelope',
    name: 'Craquelope',
    image: 'images/monsters/Craquelope.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 900, atk: 133, spd: 100, res: { neutre: 2, terre: 12, feu: 32, eau: -12, air: -12 } },
    moves: ['caillassage', 'percussion', 'pierrade']
}

monsters.vetauran = {
    id: 'vetauran',
    name: 'Vétauran',
    image: 'images/monsters/Vétauran.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 910, atk: 133, spd: 100, res: { neutre: -9, terre: -19, feu: 12, eau: 7, air: 5 } },
    moves: ['craneur', 'pull_vert_izele', 'encornement']
}

monsters.grand_pa_wabbit = {
    id: 'grand_pa_wabbit',
    name: 'Grand Pa Wabbit',
    image: 'images/monsters/Grand_Pa_Wabbit.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 920, atk: 113, spd: 100, res: { neutre: 18, terre: 0, feu: -15, eau: 11, air: 0 } },
    moves: ['cawotte_explosive', 'cawotte_vitaminee', 'cawotte_paralysante']
}

monsters.krokille_juvenile_crue = {
    id: 'krokille_juvenile_crue',
    name: 'Krokille Juvénile Crue',
    image: 'images/monsters/Krokille_Juvénile_Crue.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 930, atk: 25, spd: 100, res: { neutre: 10, terre: 10, feu: 10, eau: 10, air: 10 } },
    moves: ['motivation_gluante', 'koque_chok', 'krokille_de_neuf']
}

monsters.koalak_forestier = {
    id: 'koalak_forestier',
    name: 'Koalak Forestier',
    image: 'images/monsters/Koalak_Forestier.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 990, atk: 125, spd: 100, res: { neutre: 10, terre: 10, feu: 20, eau: -25, air: -15 } },
    moves: ['abattage', 'ebranchage', 'deracinage']
}

monsters.pekeualak = {
    id: 'pekeualak',
    name: 'Pékeualak',
    image: 'images/monsters/Pékeualak.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 990, atk: 138, spd: 100, res: { neutre: 10, terre: -10, feu: 60, eau: 50, air: 10 } },
    moves: ['moulinet', 'amorce', 'coup_de_poisson']
}

monsters.black_wo_wabbit = {
    id: 'black_wo_wabbit',
    name: 'Black Wo Wabbit',
    image: 'images/monsters/Black_Wo_Wabbit.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1000, atk: 140, spd: 100, res: { neutre: 11, terre: 21, feu: 6, eau: -14, air: 1 } },
    moves: ['aspiwation', 'etweinte']
}

monsters.etoile_swagante = {
    id: 'etoile_swagante',
    name: 'Étoile Swagante',
    image: 'images/monsters/Étoile_Swagante.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1000, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.ouroboulos = {
    id: 'ouroboulos',
    name: 'Ouroboulos',
    image: 'images/monsters/Ouroboulos.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1000, atk: 133, spd: 110, res: { neutre: 26, terre: 16, feu: 21, eau: -14, air: -24 } },
    moves: ['Sablacane', 'Roulo-Boulos', 'Carapassable']
}

monsters.scordionBleu = {
    id: 'scordionBleu',
    name: 'Scordion Bleu',
    image: 'images/monsters/Scordion_Bleu.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1000, atk: 133, spd: 110, res: { neutre: 26, terre: 16, feu: 21, eau: -14, air: -24 } },
    moves: ['Pince_pattes', 'Dard_Empoisonne', 'Creuse_sable']
}

monsters.fennex = {
    id: 'fennex',
    name: 'Fennex',
    image: 'images/monsters/Fennex.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1000, atk: 133, spd: 110, res: { neutre: 6, terre: 16, feu: -24, eau: -19, air: 11 } },
    moves: ['Reconnaissance', 'Entrave_Sableuse', 'Enragement_Motivant']
}

monsters.leolhyene = {
    id: 'leolhyene',
    name: 'Léolhyène',
    image: 'images/monsters/leolhyene.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1000, atk: 133, spd: 110, res: { neutre: 24, terre: -21, feu: 9, eau: -9, air: 34 } },
    moves: ['Sirocco', 'Hyaignement', 'Mort_sure']
}

monsters.coquille_explosive = {
    id: 'coquille_explosive',
    name: 'Coquille Explosive',
    image: 'images/monsters/Coquille_Brutale.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1000, atk: 13, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['motivation_naturelle']
}

monsters.wobot = {
    id: 'wobot',
    name: 'Wobot',
    image: 'images/monsters/Wobot.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1000, atk: 140, spd: 100, res: { neutre: 12, terre: 12, feu: 12, eau: -10, air: -10 } },
    moves: ['massue_wotative', 'wavelot']
}

monsters.wobot_tamponneur = {
    id: 'wobot_tamponneur',
    name: 'Wobot Tamponneur',
    image: 'images/monsters/Wobot_Tamponneur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1000, atk: 0, spd: 100, res: { neutre: 150, terre: 150, feu: 150, eau: 150, air: 150 } },
    moves: []
}

monsters.wobot_kiafin = {
    id: 'wobot_kiafin',
    name: 'Wobot Kiafin',
    image: 'images/monsters/Wobot_Kiafin.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1000, atk: 140, spd: 100, res: { neutre: 6, terre: 11, feu: 21, eau: 1, air: -14 } },
    moves: ['weuche', 'glissement_de_tewwain']
}

monsters.dok_alako = {
    id: 'dok_alako',
    name: 'Dok Alako',
    image: 'images/monsters/Dok_Alako.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1000, atk: 150, spd: 100, res: { neutre: 30, terre: -15, feu: 30, eau: -28, air: 60 } },
    moves: ['devotion', 'kalik']
}

monsters.marionnette_blanche = {
    id: 'marionnette_blanche',
    name: 'Marionnette Blanche',
    image: 'images/monsters/Marionnette_Blanche.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1000, atk: 200, spd: 100, res: { neutre: 0, terre: 0, feu: -20, eau: -20, air: 200 } },
    moves: ['croix_d_attelle', 'castelet', 'balancoire']
}

monsters.marionnette_bleue = {
    id: 'marionnette_bleue',
    name: 'Marionnette Bleue',
    image: 'images/monsters/Marionnette_Bleue.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1000, atk: 200, spd: 100, res: { neutre: 0, terre: -20, feu: 0, eau: 200, air: -20 } },
    moves: ['catharsis']
}

monsters.marionnette_rouge = {
    id: 'marionnette_rouge',
    name: 'Marionnette Rouge',
    image: 'images/monsters/Marionnette_Rouge.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1000, atk: 200, spd: 100, res: { neutre: 0, terre: -20, feu: 200, eau: 0, air: -20 } },
    moves: ['scene_en_flammes']
}

monsters.marionnette_verte = {
    id: 'marionnette_verte',
    name: 'Marionnette Verte',
    image: 'images/monsters/Marionnette_Verte.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1000, atk: 200, spd: 100, res: { neutre: 0, terre: 200, feu: -20, eau: -20, air: 0 } },
    moves: ['fantoche']
}

monsters.marionnette_grise = {
    id: 'marionnette_grise',
    name: 'Marionnette Grise',
    image: 'images/monsters/Marionnette_Grise.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1000, atk: 200, spd: 100, res: { neutre: 200, terre: -10, feu: -10, eau: -10, air: -10 } },
    moves: ['marivaudage']
}

monsters.blanc_pa_wabbit = {
    id: 'blanc_pa_wabbit',
    name: 'Blanc Pa Wabbit',
    image: 'images/monsters/Blanc_Pa_Wabbit.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1000, atk: 140, spd: 100, res: { neutre: 21, terre: -14, feu: 1, eau: 6, air: 11 } },
    moves: ['cawotte_suwvitaminee', 'motivation_cawottique']
}

monsters.tiwobot = {
    id: 'tiwobot',
    name: 'Tiwobot',
    image: 'images/monsters/Tiwobot.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1000, atk: 140, spd: 100, res: { neutre: 21, terre: 6, feu: -14, eau: 1, air: 11 } },
    moves: ['wetouw_du_wabbit', 'lancew_de_cawotte', 'coup_de_boule']
}

monsters.kralab_rah = {
    id: 'kralab_rah',
    name: 'Kralab Rah',
    image: 'images/monsters/Kralab_Rah.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1000, atk: 700, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['poulpe', 'lakazam', 'connier']
}

monsters.tabacille = {
    id: 'tabacille',
    name: 'Tabacille',
    image: 'images/monsters/Tabacille.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1000, atk: 600, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['echange_subtil', 'remontee_gastrique']
}

monsters.verminocule = {
    id: 'verminocule',
    name: 'Verminocule',
    image: 'images/monsters/Verminocule.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1000, atk: 600, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['gonflement', 'jet_d_acide']
}

monsters.bacterrib = {
    id: 'bacterrib',
    name: 'Bacterrib',
    image: 'images/monsters/Bacterrib.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1000, atk: 600, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['secretion', 'danse_repulsive']
}

monsters.virustine = {
    id: 'virustine',
    name: 'Virustine',
    image: 'images/monsters/Virustine.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1000, atk: 600, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['contamination', 'boulet_viral']
}

monsters.pataugerme = {
    id: 'pataugerme',
    name: 'Pataugerme',
    image: 'images/monsters/Pataugerme.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1000, atk: 600, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['brulure_d_estomac', 'attaque_souterraine']
}

monsters.saltik = {
    id: 'saltik',
    name: 'Saltik',
    image: 'images/monsters/Saltik.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1000, atk: 200, spd: 100, res: { neutre: 2, terre: 1, feu: 0, eau: -28, air: 2 } },
    moves: ['bond_etourdissant', 'pressage']
}

monsters.grokillage = {
    id: 'grokillage',
    name: 'Grokillage',
    image: 'images/monsters/Grokillage.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1000, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.eclat_kao = {
    id: 'eclat_kao',
    name: 'Éclat Kao',
    image: 'images/monsters/Éclat_Kao.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1000, atk: 800, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.araknotron = {
    id: 'araknotron',
    name: 'Araknotron',
    image: 'images/monsters/Araknotron.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1100, atk: 100, spd: 115, res: { neutre: 6, terre: -27, feu: 7, eau: -27, air: 7 } },
    moves: ['Lancer_d_Arakne_Morte', 'Complicite']
}

monsters.warko_marron = {
    id: 'warko_marron',
    name: 'Warko Marron',
    image: 'images/monsters/Warko_Marron.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1100, atk: 50, spd: 100, res: { neutre: 20, terre: 25, feu: -18, eau: -10, air: 60 } },
    moves: ['invocation_de_workette', 'cecite', 'vision_lointaine', 'pichenette']
}

monsters.troollogram = {
    id: 'troollogram',
    name: 'Troollogram',
    image: 'images/monsters/Troollogram.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1100, atk: 448, spd: 100, res: { neutre: 16, terre: 26, feu: -19, eau: 26, air: -9 } },
    moves: ['troollz', 'pettrooll']
}

monsters.imikaminokin = {
    id: 'imikaminokin',
    name: 'Imikaminokin',
    image: 'images/monsters/Imikaminokin.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1100, atk: 160, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.kinkutsubram = {
    id: 'kinkutsubram',
    name: 'Kinkutsubram',
    image: 'images/monsters/Kinkutsubram.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1100, atk: 160, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.bribe_de_zobal = {
    id: 'bribe_de_zobal',
    name: 'Bribe de Zobal',
    image: 'images/monsters/Bribe_de_Zobal.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1100, atk: 558, spd: 100, res: { neutre: 25, terre: 29, feu: 14, eau: 14, air: 39 } },
    moves: ['agular', 'furia', 'appui', 'plastron', 'apathie', 'cabriole', 'reuche', 'tortoruga', 'catalepsie', 'cavalcade', 'boliche', 'l_arc_ifanss']
}

monsters.bribe_de_steamer = {
    id: 'bribe_de_steamer',
    name: 'Bribe de Steamer',
    image: 'images/monsters/Bribe_de_Steamer.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1100, atk: 460, spd: 100, res: { neutre: 15, terre: 41, feu: 33, eau: 18, air: 18 } },
    moves: ['exclamaton', 'longue_vue', 'torpille', 'maree', 'scaphandre', 'periscope', 'flibuste', 'ecume', 'embuscade', 'harmattan']
}

monsters.bribe_de_cra = {
    id: 'bribe_de_cra',
    name: 'Bribe de Crâ',
    image: 'images/monsters/Bribe_de_Crâ.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1100, atk: 649, spd: 100, res: { neutre: 0, terre: 16, feu: 31, eau: 26, air: 32 } },
    moves: ['fleche_détonante']
}

monsters.bribe_d_enutrof = {
    id: 'bribe_d_enutrof',
    name: 'Bribe d\'Enutrof',
    image: 'images/monsters/Bribe_d_Enutrof.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1100, atk: 487, spd: 100, res: { neutre: 0, terre: 39, feu: 15, eau: 38, air: 32 } },
    moves: ['lancer_de_pieces', 'sac_anime', 'ruee_vers_l_or', 'boite_de_pandore']
}

monsters.bribe_de_iop = {
    id: 'bribe_de_iop',
    name: 'Bribe de Iop',
    image: 'images/monsters/Bribe_de_Iop.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1100, atk: 495, spd: 100, res: { neutre: 8, terre: 18, feu: 11, eau: 16, air: 26 } },
    moves: ['pression', 'concentration', 'puissance', 'epee_de_iop']
}

monsters.bribe_de_pandawa = {
    id: 'bribe_de_pandawa',
    name: 'Bribe de Pandawa',
    image: 'images/monsters/Bribe_de_Pandawa.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1100, atk: 139, spd: 100, res: { neutre: 50, terre: 50, feu: 50, eau: 50, air: 50 } },
    moves: ['picole', 'consolation', 'brassage', 'fermentation', 'pandjiu', 'ribote', 'pandanlku']
}

monsters.bribe_d_eniripsa = {
    id: 'bribe_d_eniripsa',
    name: 'Bribe d\'Eniripsa',
    image: 'images/monsters/Bribe_d_Eniripsa.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1100, atk: 615, spd: 100, res: { neutre: 8, terre: 27, feu: 19, eau: 35, air: 24 } },
    moves: ['mot_tapageur', 'mot_damitie', 'mot_stimulant', 'mot_de_frayeur']
}

monsters.bribe_d_ecaflip = {
    id: 'bribe_d_ecaflip',
    name: 'Bribe d\'Ecaflip',
    image: 'images/monsters/Bribe_d_Ecaflip.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1100, atk: 654, spd: 100, res: { neutre: 25, terre: 28, feu: 38, eau: 35, air: 28 } },
    moves: ['reflexes', 'yams', 'topkaj', 'pile_ou_face']
}

monsters.bribe_d_huppermage = {
    id: 'bribe_d_huppermage',
    name: 'Bribe d\'Huppermage',
    image: 'images/monsters/Bribe_d_Huppermage.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1100, atk: 604, spd: 100, res: { neutre: 31, terre: 24, feu: 29, eau: 24, air: 26 } },
    moves: ['lances_telluriques', 'cataracte', 'onde_celeste', 'tison', 'drain_elementaire', 'orage', 'rafale', 'trait_ardent', 'volcan', 'traversee', 'torrent_arcanique', 'bouclier_elementaire']
}

monsters.bribe_d_ouginak = {
    id: 'bribe_d_ouginak',
    name: 'Bribe d\'Ouginak',
    image: 'images/monsters/Bribe_d_Ouginak.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1100, atk: 454, spd: 100, res: { neutre: 14, terre: 20, feu: 20, eau: 34, air: 27 } },
    moves: ['gibier', 'charogne', 'depecage', 'carcasse', 'depouille', 'limier', 'apaisement', 'arcanin']
}

monsters.bribe_de_sadida = {
    id: 'bribe_de_sadida',
    name: 'Bribe de Sadida',
    image: 'images/monsters/Bribe_de_Sadida.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1100, atk: 465, spd: 100, res: { neutre: 6, terre: 16, feu: 9, eau: 6, air: 19 } },
    moves: ['ronce', 'ronces_agressives', 'foret_hantee', 'seve_paralysante', 'tremblement', 'vent_empoisonne']
}

monsters.bribe_d_eliotrope = {
    id: 'bribe_d_eliotrope',
    name: 'Bribe d\'Eliotrope',
    image: 'images/monsters/Bribe_d_Eliotrope.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1100, atk: 408, spd: 100, res: { neutre: 43, terre: 41, feu: 50, eau: 50, air: 37 } },
    moves: ['mepris', 'sinecure', 'brimade', 'raillerie', 'sermon', 'cicatrisation', 'distribution']
}

monsters.bribe_de_xelor = {
    id: 'bribe_de_xelor',
    name: 'Bribe de Xélor',
    image: 'images/monsters/Bribe_de_Xélor.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1100, atk: 413, spd: 100, res: { neutre: 20, terre: 21, feu: 31, eau: 40, air: 28 } },
    moves: ['poussiere', 'frappe_de_xelor', 'horloge', 'astrolabe', 'rouage', 'glas', 'refraction', 'sablier_de_xelor']
}

monsters.wabbit_gm = {
    id: 'wabbit_gm',
    name: 'Wabbit Gm',
    image: 'images/monsters/Wabbit_Gm.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1200, atk: 143, spd: 100, res: { neutre: 43, terre: 33, feu: 40, eau: -6, air: -15 } },
    moves: ['rafale_de_terre', 'cawotte_gm']
}

monsters.koalak_indigo = {
    id: 'koalak_indigo',
    name: 'Koalak Indigo',
    image: 'images/monsters/Koalak_Indigo.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1200, atk: 75, spd: 100, res: { neutre: 10, terre: -20, feu: -20, eau: 70, air: -20 } },
    moves: ['invocation_de_blop_indigo', 'defaillance_indigo']
}

monsters.koalak_coco = {
    id: 'koalak_coco',
    name: 'Koalak Coco',
    image: 'images/monsters/Koalak_Coco.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1200, atk: 50, spd: 100, res: { neutre: 10, terre: -20, feu: -20, eau: -20, air: 70 } },
    moves: ['invocation_de_blop_coco', 'defaillance_coco']
}

monsters.koalak_griotte = {
    id: 'koalak_griotte',
    name: 'Koalak Griotte',
    image: 'images/monsters/Koalak_Griotte.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1200, atk: 75, spd: 100, res: { neutre: 10, terre: -20, feu: 70, eau: -20, air: -20 } },
    moves: ['invocation_de_blop_griotte', 'defaillance_griotte']
}

monsters.koalak_reinette = {
    id: 'koalak_reinette',
    name: 'Koalak Reinette',
    image: 'images/monsters/Koalak_Reinette.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1200, atk: 75, spd: 100, res: { neutre: 10, terre: 70, feu: -20, eau: -20, air: -20 } },
    moves: ['invocation_de_blop_reinette', 'defaillance_reinette']
}

monsters.porsalu = {
    id: 'porsalu',
    name: 'Porsalu',
    image: 'images/monsters/Porsalu.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1200, atk: 188, spd: 120, res: { neutre: 25, terre: 15, feu: -25, eau: -20, air: 60 } },
    moves: ['Fleche_Renifleuse', 'Fleche_Douloureuse', 'Exhalation_Porcine']
}

monsters.golem = {
    id: 'golem',
    name: 'Golem',
    image: 'images/monsters/Golem.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1200, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.bouftou_des_cavernes = {
    id: 'bouftou_des_cavernes',
    name: 'Bouftou des cavernes',
    image: 'images/monsters/Bouftou_des_cavernes.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1300, atk: 105, spd: 100, res: { neutre: 30, terre: -18, feu: 50, eau: 20, air: -25 } },
    moves: ['morsure_du_bouftou_des_cavernes', 'bavouille_des_cavernes', 'crachouille_des_cavernes']
}

monsters.boomba = {
    id: 'boomba',
    name: 'Boomba',
    image: 'images/monsters/Boomba.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1300, atk: 200, spd: 100, res: { neutre: -18, terre: 2, feu: 12, eau: 0, air: 12 } },
    moves: ['bombe_pirate', 'feu_d_artifesse']
}

monsters.nakunbra = {
    id: 'nakunbra',
    name: 'Nakunbra',
    image: 'images/monsters/Nakunbra.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1300, atk: 200, spd: 100, res: { neutre: 14, terre: -18, feu: 0, eau: 6, air: 6 } },
    moves: ['sus_a_l_ennemi', 'tranchage_mortel']
}

monsters.canondorf = {
    id: 'canondorf',
    name: 'Canondorf',
    image: 'images/monsters/Canondorf.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1300, atk: 200, spd: 100, res: { neutre: 2, terre: 18, feu: 6, eau: 0, air: -18 } },
    moves: ['canon_tournoyant', 'gros_boulet_pirate']
}

monsters.arapex = {
    id: 'arapex',
    name: 'Arapex',
    image: 'images/monsters/Arapex.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1300, atk: 200, spd: 100, res: { neutre: -20, terre: 20, feu: 10, eau: 5, air: -20 } },
    moves: ['estocade', 'tourbillon_mortel']
}

monsters.dardalaine = {
    id: 'dardalaine',
    name: 'Dardalaine',
    image: 'images/monsters/Dardalaine.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1300, atk: 200, spd: 100, res: { neutre: 2, terre: -18, feu: -28, eau: 5, air: 12 } },
    moves: ['dards_paralysants', 'secretion_acide']
}

monsters.nefileuse = {
    id: 'nefileuse',
    name: 'Néfileuse',
    image: 'images/monsters/Néfileuse.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1300, atk: 200, spd: 100, res: { neutre: -14, terre: 0, feu: -30, eau: 22, air: 10 } },
    moves: ['toile_paralysante', 'fil_collant', 'prison_de_soie']
}

monsters.ricanif = {
    id: 'ricanif',
    name: 'Ricanif',
    image: 'images/monsters/Ricanif.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1300, atk: 200, spd: 100, res: { neutre: 0, terre: 0, feu: -2, eau: 17, air: 17 } },
    moves: ['tornade_de_lames', 'coupe_genoux']
}

monsters.ivremor = {
    id: 'ivremor',
    name: 'Ivremor',
    image: 'images/monsters/Ivremor.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1300, atk: 200, spd: 100, res: { neutre: 0, terre: 2, feu: 10, eau: -18, air: 14 } },
    moves: ['cocktail_rhumotov', 'crachat_de_rhum', 'et_une_bouteille_de_rhum']
}

monsters.megabwork = {
    id: 'megabwork',
    name: 'Mégabwork',
    image: 'images/monsters/Mégabwork.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1300, atk: 328, spd: 100, res: { neutre: 21, terre: 26, feu: 16, eau: 11, air: 6 } },
    moves: ['koup_puissant', 'grenabombe', 'megarmure']
}

monsters.medibwork = {
    id: 'medibwork',
    name: 'Médibwork',
    image: 'images/monsters/Médibwork.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1300, atk: 328, spd: 100, res: { neutre: 11, terre: 31, feu: -24, eau: 21, air: -9 } },
    moves: ['implant_provizoar', 'chirurgie_approksimativ', 'douleur_atross']
}

monsters.bizarbwork = {
    id: 'bizarbwork',
    name: 'Bizarbwork',
    image: 'images/monsters/Bizarbwork.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1300, atk: 328, spd: 100, res: { neutre: 1, terre: -9, feu: 11, eau: 16, air: 11 } },
    moves: ['kass_kabosh', 'krounch']
}

monsters.krambwork = {
    id: 'krambwork',
    name: 'Krambwork',
    image: 'images/monsters/Krambwork.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1300, atk: 328, spd: 100, res: { neutre: -9, terre: 6, feu: 36, eau: -24, air: 21 } },
    moves: ['flan_b', 'kremassion', 'feu_grr_joie']
}

monsters.bozoteur = {
    id: 'bozoteur',
    name: 'Bozoteur',
    image: 'images/monsters/Bozoteur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1300, atk: 328, spd: 100, res: { neutre: 56, terre: -24, feu: 11, eau: 1, air: -14 } },
    moves: ['bang', 'dans_la_boite', 'baudruche']
}

monsters.tivelo = {
    id: 'tivelo',
    name: 'Tivelo',
    image: 'images/monsters/Tivelo.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1300, atk: 328, spd: 100, res: { neutre: -14, terre: 56, feu: -24, eau: 11, air: 1 } },
    moves: ['roule_ma_poule', 'fusee_explosive']
}

monsters.pirolienne = {
    id: 'pirolienne',
    name: 'Pirolienne',
    image: 'images/monsters/Pirolienne.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1300, atk: 328, spd: 100, res: { neutre: 1, terre: -14, feu: 56, eau: -24, air: 11 } },
    moves: ['chaudasse', 'haleine_ardente', 'roulette_infernale']
}

monsters.roukouto = {
    id: 'roukouto',
    name: 'Roukouto',
    image: 'images/monsters/Roukouto.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1300, atk: 328, spd: 100, res: { neutre: 11, terre: 1, feu: -14, eau: 56, air: -24 } },
    moves: ['chapeau_de_roue', 'eriktion', 'peintures']
}

monsters.graboule = {
    id: 'graboule',
    name: 'Graboule',
    image: 'images/monsters/Graboule.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1300, atk: 328, spd: 100, res: { neutre: -24, terre: 11, feu: 1, eau: -14, air: 56 } },
    moves: ['balle_piegee', 'poirier', 'jonglerie']
}

monsters.cadob_onux = {
    id: 'cadob_onux',
    name: 'Cadob\'Onux',
    image: 'images/monsters/Cadob_Onux.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1400, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['cadeau_puissant']
}

monsters.cadob_omb = {
    id: 'cadob_omb',
    name: 'Cadob\'Omb',
    image: 'images/monsters/Cadob_Omb.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1400, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.cadob_imbo = {
    id: 'cadob_imbo',
    name: 'Cadob\'Imbo',
    image: 'images/monsters/Cadob_Imbo.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1400, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['cadeau_soignant']
}

monsters.abraknydeSombre = {
    id: 'abraknydeSombre',
    name: 'Abraknyde Sombre',
    image: 'images/monsters/Abraknyde_Sombre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1400, atk: 100, spd: 100, res: { neutre: 31, terre: 31, feu: -27, eau: 29, air: 11 } },
    moves: ['Abrabranche', 'Branche_Paralysante', 'Ecrasement_Abraknydien']
}

monsters.fantome_d_aventurier_ardent = {
    id: 'fantome_d_aventurier_ardent',
    name: 'Fantôme d\'Aventurier Ardent',
    image: 'images/monsters/Fantôme_d_Aventurier_Ardent.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1400, atk: 283, spd: 100, res: { neutre: 10, terre: 100, feu: -20, eau: 100, air: -20 } },
    moves: ['crasse_piration']
}

monsters.fantome_d_aventurier_arepo = {
    id: 'fantome_d_aventurier_arepo',
    name: 'Fantôme d\'Aventurier Arepo',
    image: 'images/monsters/Fantôme_d_Aventurier_Arepo.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1400, atk: 288, spd: 100, res: { neutre: 50, terre: 50, feu: 50, eau: 50, air: 50 } },
    moves: ['invocation_de_corbac_fantomatique']
}

monsters.fantome_d_aventurier_brave = {
    id: 'fantome_d_aventurier_brave',
    name: 'Fantôme d\'Aventurier Brave',
    image: 'images/monsters/Fantôme_d_Aventurier_Brave.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1400, atk: 195, spd: 100, res: { neutre: 20, terre: -20, feu: 100, eau: -20, air: 100 } },
    moves: []
}

monsters.rat_bougri = {
    id: 'rat_bougri',
    name: 'Rat Bougri',
    image: 'images/monsters/Rat_Bougri.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1400, atk: 260, spd: 100, res: { neutre: 19, terre: 22, feu: 10, eau: -24, air: 5 } },
    moves: ['ratissage', 'rabot', 'racolage']
}

monsters.crabe_hijacob = {
    id: 'crabe_hijacob',
    name: 'Crabe Hijacob',
    image: 'images/monsters/Crabe_Hijacob.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1400, atk: 260, spd: 100, res: { neutre: 4, terre: 14, feu: 10, eau: 28, air: -39 } },
    moves: ['pincette', 'sucette', 'briquette']
}

monsters.coquille_soigneuse = {
    id: 'coquille_soigneuse',
    name: 'Coquille Soigneuse',
    image: 'images/monsters/Coquille_Brutale.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1400, atk: 420, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.coquille_brutale = {
    id: 'coquille_brutale',
    name: 'Coquille Brutale',
    image: 'images/monsters/Coquille_Brutale.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1400, atk: 420, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.coquille_veloce = {
    id: 'coquille_veloce',
    name: 'Coquille Véloce',
    image: 'images/monsters/Coquille_Brutale.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1400, atk: 420, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.coquille_protectrice = {
    id: 'coquille_protectrice',
    name: 'Coquille Protectrice',
    image: 'images/monsters/Coquille_Brutale.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1400, atk: 420, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.dragoss_calcaire = {
    id: 'dragoss_calcaire',
    name: 'Dragoss Calcaire',
    image: 'images/monsters/Dragoss_Calcaire.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1400, atk: 310, spd: 100, res: { neutre: 22, terre: 32, feu: 16, eau: 11, air: -15 } },
    moves: ['dragoss_pelle', 'transmission_sismique', 'offrande_rocailleuse']
}

monsters.chachachovage = {
    id: 'chachachovage',
    name: 'Chachachovage',
    image: 'images/monsters/Chachachovage.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1400, atk: 260, spd: 100, res: { neutre: 15, terre: -24, feu: 30, eau: 8, air: 4 } },
    moves: ['canine_putride', 'mousse_tache', 'coussinet_protecteur']
}

monsters.gelikan = {
    id: 'gelikan',
    name: 'Gélikan',
    image: 'images/monsters/Gélikan.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1400, atk: 260, spd: 100, res: { neutre: 5, terre: 13, feu: 10, eau: -20, air: 25 } },
    moves: ['koudbec', 'convoitise', 'enthousiasme']
}

monsters.coffre_sombre = {
    id: 'coffre_sombre',
    name: 'Coffre Sombre',
    image: 'images/monsters/Coffre_des_Forgerons.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1500, atk: 425, spd: 100, res: { neutre: 100, terre: 0, feu: 0, eau: 100, air: 0 } },
    moves: ['lancer_de_kamas']
}

monsters.dragodinde_de_nowel_sauvage = {
    id: 'dragodinde_de_nowel_sauvage',
    name: 'Dragodinde de Nowel sauvage',
    image: 'images/monsters/Dragodinde_de_Nowel.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1500, atk: 304, spd: 100, res: { neutre: 36, terre: 2, feu: 2, eau: 36, air: 2 } },
    moves: []
}

monsters.cochonDeFarle = {
    id: 'cochonDeFarle',
    name: 'Cochon de Farle',
    image: 'images/monsters/Cochon_de_Farle.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1500, atk: 45, spd: 120, res: { neutre: 50, terre: 50, feu: 12, eau: 12, air: -20 } },
    moves: ['Sucotement_Porcin']
}

monsters.abrakneSombre = {
    id: 'abrakneSombre',
    name: 'Abrakne Sombre',
    image: 'images/monsters/Abrakne_Sombre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1500, atk: 160, spd: 115, res: { neutre: 16, terre: -24, feu: 24, eau: -17, air: 12 } },
    moves: ['Motivation_Sylvestre', 'Bond_affaiblissant', 'Abraknettoyage']
}

monsters.koalak_farouche = {
    id: 'koalak_farouche',
    name: 'Koalak Farouche',
    image: 'images/monsters/Koalak_Farouche.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1500, atk: 75, spd: 100, res: { neutre: 20, terre: 10, feu: -9, eau: -9, air: 10 } },
    moves: ['sarbakane', 'soufflette_de_kaliptus', 'invisibilite_farouche', 'invisibilite_farouche_d_autrui']
}

monsters.mama_koalak = {
    id: 'mama_koalak',
    name: 'Mama Koalak',
    image: 'images/monsters/Mama_Koalak.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1500, atk: 100, spd: 100, res: { neutre: 30, terre: 50, feu: 30, eau: -10, air: -18 } },
    moves: ['liberation', 'accouchement', 'chiquenaude']
}

monsters.piralak = {
    id: 'piralak',
    name: 'Piralak',
    image: 'images/monsters/Piralak.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1500, atk: 125, spd: 100, res: { neutre: 10, terre: 50, feu: -10, eau: -19, air: -10 } },
    moves: ['bistouille', 'tourbe_empoisonnee', 'bond_du_piralak']
}

monsters.bouboule_de_neige = {
    id: 'bouboule_de_neige',
    name: 'Bouboule de neige',
    image: 'images/monsters/Bouboule_de_neige.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1500, atk: 304, spd: 100, res: { neutre: 20, terre: 6, feu: -22, eau: 30, air: 30 } },
    moves: ['boule_de_neige', 'neige_soignante', 'roulage_de_neige']
}

monsters.chauffe_soutrille = {
    id: 'chauffe_soutrille',
    name: 'Chauffe-Soutrille',
    image: 'images/monsters/Chauffe-Soutrille.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1500, atk: 63, spd: 100, res: { neutre: 5, terre: 17, feu: -15, eau: 15, air: 12 } },
    moves: ['pus_des_pieds', 'faux_fuyant']
}

monsters.molette = {
    id: 'molette',
    name: 'Molette',
    image: 'images/monsters/Molette.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1500, atk: 210, spd: 100, res: { neutre: 0, terre: -21, feu: 16, eau: 28, air: -19 } },
    moves: ['clef_a_pipe', 'clef_plate', 'clef_de_douze']
}

monsters.gobvious = {
    id: 'gobvious',
    name: 'Gobvious',
    image: 'images/monsters/Gobvious.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1500, atk: 200, spd: 100, res: { neutre: 0, terre: 10, feu: -13, eau: -19, air: 26 } },
    moves: ['alareskouss', 'evidence', 'kaptene']
}

monsters.bouledogre = {
    id: 'bouledogre',
    name: 'Bouledogre',
    image: 'images/monsters/Bouledogre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1500, atk: 190, spd: 100, res: { neutre: 16, terre: -19, feu: 24, eau: -24, air: 23 } },
    moves: ['attaque', 'morzyloeil', 'glyphe_rose']
}

monsters.gargantul = {
    id: 'gargantul',
    name: 'Gargantûl',
    image: 'images/monsters/Gargantûl.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1500, atk: 200, spd: 100, res: { neutre: 12, terre: 1, feu: 2, eau: -10, air: 11 } },
    moves: ['mastication', 'blindage']
}

monsters.cactruc = {
    id: 'cactruc',
    name: 'Cactruc',
    image: 'images/monsters/Cactruc.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1500, atk: 50, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.minikrone = {
    id: 'minikrone',
    name: 'Minikrone',
    image: 'images/monsters/Minikrone.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1500, atk: 250, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.bombombre = {
    id: 'bombombre',
    name: 'Bombombre',
    image: 'images/monsters/Bombombre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1500, atk: 400, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.bombombre_a_eau = {
    id: 'bombombre_a_eau',
    name: 'Bombombre à Eau',
    image: 'images/monsters/Bombombre_à_Eau.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1500, atk: 368, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.craqueboule_poli = {
    id: 'craqueboule_poli',
    name: 'Craqueboule Poli',
    image: 'images/monsters/Craqueboule_Poli.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1600, atk: 150, spd: 100, res: { neutre: 1, terre: 5, feu: -25, eau: 5, air: 25 } },
    moves: ['rocaille', 'glotte', 'tourniquet']
}

monsters.dragoss_argile = {
    id: 'dragoss_argile',
    name: 'Dragoss Argile',
    image: 'images/monsters/Dragoss_Argile.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1600, atk: 310, spd: 100, res: { neutre: 22, terre: -15, feu: 11, eau: 16, air: 32 } },
    moves: ['dragoss_tidkaliss', 'dragoss_imoun', 'offrande_aerienne']
}

monsters.dragoss_ardoise = {
    id: 'dragoss_ardoise',
    name: 'Dragoss Ardoise',
    image: 'images/monsters/Dragoss_Ardoise.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1600, atk: 310, spd: 100, res: { neutre: 22, terre: 11, feu: -15, eau: 32, air: 16 } },
    moves: ['fumerolle', 'eauzone', 'offrande_aqueuse']
}

monsters.donDorgan = {
    id: 'donDorgan',
    name: 'Don Dorgan',
    image: 'images/monsters/Don_Dorgan.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1600, atk: 75, spd: 120, res: { neutre: 10, terre: -20, feu: 50, eau: -20, air: -20 } },
    moves: ['Menotage', 'Charge Sanguinaire']
}

monsters.donDussAng = {
    id: 'donDussAng',
    name: 'Don Duss\'Ang',
    image: 'images/monsters/Don_Duss_Ang.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1600, atk: 38, spd: 120, res: { neutre: 20, terre: -20, feu: -20, eau: 20, air: 20 } },
    moves: ['Vampirisation_Cochonne', 'Tire-Bouffon', 'Perfusion']
}

monsters.bourbassingue = {
    id: 'bourbassingue',
    name: 'Bourbassingue',
    image: 'images/monsters/Bourbassingue.png',
    rarity: 'peu_commun',
    tier: 'normal',
    bst: { hp: 1600, atk: 200, spd: 120, res: { neutre: 13, terre: 35, feu: -31, eau: 15, air: 9 } },
    moves: ['boue_sirupeuse', 'bourbier']
}

monsters.mulou = {
    id: 'mulou',
    name: 'Mulou',
    image: 'images/monsters/Mulou.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1600, atk: 368, spd: 100, res: { neutre: 26, terre: -14, feu: 21, eau: 6, air: -9 } },
    moves: ['cri_du_mulou', 'cesarienne', 'soin_accelere']
}

monsters.trukikol = {
    id: 'trukikol',
    name: 'Trukikol',
    image: 'images/monsters/Trukikol.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1600, atk: 200, spd: 100, res: { neutre: 0, terre: -18, feu: 0, eau: 18, air: 16 } },
    moves: ['virevoltage_collant', 'electromagnetisme']
}

monsters.gloutovore = {
    id: 'gloutovore',
    name: 'Gloutovore',
    image: 'images/monsters/Gloutovore.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1600, atk: 200, spd: 100, res: { neutre: 20, terre: 6, feu: -20, eau: 0, air: 0 } },
    moves: ['gobage']
}

monsters.fourbasse = {
    id: 'fourbasse',
    name: 'Fourbasse',
    image: 'images/monsters/Fourbasse.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1600, atk: 200, spd: 100, res: { neutre: -14, terre: 10, feu: 0, eau: 6, air: 4 } },
    moves: ['tir_embusque', 'l_attaque_du_chasseur']
}

monsters.boufcoul = {
    id: 'boufcoul',
    name: 'Boufcoul',
    image: 'images/monsters/Boufcoul.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1600, atk: 138, spd: 100, res: { neutre: 30, terre: 50, feu: -20, eau: -25, air: 20 } },
    moves: ['bise_du_boufcoul', 'morsure_du_boufcoul']
}

monsters.drakoalak = {
    id: 'drakoalak',
    name: 'Drakoalak',
    image: 'images/monsters/Drakoalak.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1600, atk: 275, spd: 100, res: { neutre: 30, terre: -9, feu: -9, eau: -9, air: -18 } },
    moves: ['coup_de_tete', 'echauffement']
}

monsters.mufafah = {
    id: 'mufafah',
    name: 'Mufafah',
    image: 'images/monsters/Mufafah.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1600, atk: 90, spd: 100, res: { neutre: 5, terre: -36, feu: 27, eau: 5, air: 3 } },
    moves: ['rugissement_mufafesque', 'dechirure']
}

monsters.kido = {
    id: 'kido',
    name: 'Kido',
    image: 'images/monsters/Kido.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1600, atk: 180, spd: 100, res: { neutre: 5, terre: -25, feu: 25, eau: -5, air: 6 } },
    moves: ['clapet', 'cuicui_d_amour']
}

monsters.mega_craqueleur_des_plaines = {
    id: 'mega_craqueleur_des_plaines',
    name: 'Méga Craqueleur des plaines',
    image: 'images/monsters/Méga_Craqueleur_des_plaines.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1600, atk: 630, spd: 100, res: { neutre: 44, terre: 44, feu: 58, eau: 88, air: 68 } },
    moves: ['Ecrasement_Handicapant']
}

monsters.champetrouille = {
    id: 'champetrouille',
    name: 'Champêtrouille',
    image: 'images/monsters/Champêtrouille.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1600, atk: 63, spd: 100, res: { neutre: 10, terre: 18, feu: 7, eau: -16, air: 6 } },
    moves: ['frappe_a_dingues', 'dinguerie', 'cueillette']
}

monsters.lanverne = {
    id: 'lanverne',
    name: 'Lanverne',
    image: 'images/monsters/Lanverne.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1600, atk: 63, spd: 100, res: { neutre: 15, terre: 5, feu: 11, eau: 3, air: -18 } },
    moves: ['vermifuge', 'subterfuge']
}

monsters.rhinoferoce = {
    id: 'rhinoferoce',
    name: 'Rhinoféroce',
    image: 'images/monsters/Rhinoféroce.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1600, atk: 220, spd: 100, res: { neutre: 32, terre: 34, feu: -23, eau: 19, air: -26 } },
    moves: ['rhinoderme', 'rhinopharyngite', 'rhinoplastie']
}

monsters.boursoin = {
    id: 'boursoin',
    name: 'Boursoin',
    image: 'images/monsters/Boursoin.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1600, atk: 300, spd: 100, res: { neutre: 36, terre: 16, feu: -24, eau: 6, air: -14 } },
    moves: ['renflouage', 'ponderation']
}

monsters.mimikado = {
    id: 'mimikado',
    name: 'Mimikado',
    image: 'images/monsters/Mimikado.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1600, atk: 300, spd: 100, res: { neutre: 16, terre: -24, feu: 6, eau: -14, air: 36 } },
    moves: ['mimissile', 'pou', 'mimirage']
}

monsters.tresantene = {
    id: 'tresantene',
    name: 'Trésantène',
    image: 'images/monsters/Trésantène.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1600, atk: 300, spd: 100, res: { neutre: -24, terre: 6, feu: -14, eau: 36, air: 16 } },
    moves: ['deferlante', 'decompression', 'eruption']
}

monsters.berserkoffre = {
    id: 'berserkoffre',
    name: 'Berserkoffre',
    image: 'images/monsters/Berserkoffre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1600, atk: 300, spd: 100, res: { neutre: 6, terre: -14, feu: 36, eau: 16, air: -24 } },
    moves: ['saut_de_joie', 'langueur', 'fouetreinte']
}

monsters.precieux = {
    id: 'precieux',
    name: 'Précieux',
    image: 'images/monsters/Précieux.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1600, atk: 300, spd: 100, res: { neutre: -14, terre: 36, feu: 16, eau: -24, air: 6 } },
    moves: ['morsurprise', 'haleine_de_coffre', 'bondulations']
}

monsters.dostrogo = {
    id: 'dostrogo',
    name: 'Dostrogo',
    image: 'images/monsters/Dostrogo.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1600, atk: 200, spd: 100, res: { neutre: 0, terre: 12, feu: 0, eau: -14, air: 18 } },
    moves: ['coup_de_bec_dominant', 'dochirure']
}

monsters.domoizelle = {
    id: 'domoizelle',
    name: 'Domoizelle',
    image: 'images/monsters/Domoizelle.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1600, atk: 200, spd: 100, res: { neutre: 0, terre: 0, feu: 10, eau: -16, air: 22 } },
    moves: ['invocation_de_dodoune', 'protection_maternelle', 'poussee_dormone']
}

monsters.muloubard = {
    id: 'muloubard',
    name: 'Muloubard',
    image: 'images/monsters/Muloubard.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1600, atk: 368, spd: 100, res: { neutre: 11, terre: 16, feu: 26, eau: -14, air: -9 } },
    moves: ['riffes', 'metalour', 'baikeur']
}

monsters.cocholou = {
    id: 'cocholou',
    name: 'Cocholou',
    image: 'images/monsters/Cocholou.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1600, atk: 368, spd: 100, res: { neutre: -9, terre: 16, feu: 11, eau: 1, air: 11 } },
    moves: ['dents_longues', 'faim_de_mulou', 'grand_mechant']
}

monsters.mulounoke = {
    id: 'mulounoke',
    name: 'Mulounoké',
    image: 'images/monsters/Mulounoké.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1600, atk: 368, spd: 100, res: { neutre: 16, terre: -14, feu: 0, eau: 21, air: 11 } },
    moves: ['ruee_bestiale', 'esprits_vengeurs', 'froid_de_mulou']
}

monsters.mergranlou = {
    id: 'mergranlou',
    name: 'Mergranlou',
    image: 'images/monsters/Mergranlou.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1600, atk: 368, spd: 100, res: { neutre: -29, terre: 26, feu: 11, eau: 6, air: 16 } },
    moves: ['mergran', 'peur_du_mulou', 'chaperon']
}

monsters.intercepteur = {
    id: 'intercepteur',
    name: 'Intercepteur',
    image: 'images/monsters/Intercepteur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1600, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.z_uf = {
    id: 'z_uf',
    name: 'Zœuf',
    image: 'images/monsters/Zœuf.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1600, atk: 502, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.glutin_hargneux = {
    id: 'glutin_hargneux',
    name: 'Glutin hargneux',
    image: 'images/monsters/Glutin_hargneux.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1700, atk: 304, spd: 100, res: { neutre: 6, terre: 6, feu: 6, eau: 6, air: 6 } },
    moves: []
}

monsters.craqueleur_poli = {
    id: 'craqueleur_poli',
    name: 'Craqueleur Poli',
    image: 'images/monsters/Craqueleur_Poli.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1700, atk: 180, spd: 100, res: { neutre: 1, terre: 25, feu: -5, eau: -40, air: 5 } },
    moves: ['polissage', 'je_vous_en_prie']
}

monsters.minoskito = {
    id: 'minoskito',
    name: 'Minoskito',
    image: 'images/monsters/Minoskito.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1700, atk: 228, spd: 100, res: { neutre: 10, terre: 10, feu: -9, eau: 10, air: -9 } },
    moves: ['piqure_pesante', 'pheromones_de_jouvence']
}

monsters.bonhomme_de_neige = {
    id: 'bonhomme_de_neige',
    name: 'Bonhomme de neige',
    image: 'images/monsters/Bonhomme_de_neige.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1700, atk: 304, spd: 100, res: { neutre: 10, terre: -18, feu: -25, eau: 25, air: 25 } },
    moves: ['poussee_d_egul', 'esprit_de_nowel', 'tire_fesse']
}

monsters.bitouf_des_plaines = {
    id: 'bitouf_des_plaines',
    name: 'Bitouf des Plaines',
    image: 'images/monsters/Bitouf_des_Plaines.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1700, atk: 220, spd: 100, res: { neutre: 5, terre: -19, feu: -23, eau: -9, air: -9 } },
    moves: ['vrut_vrut', 'plumeau_cecitant']
}

monsters.kilibriss = {
    id: 'kilibriss',
    name: 'Kilibriss',
    image: 'images/monsters/Kilibriss.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1700, atk: 180, spd: 100, res: { neutre: 27, terre: 20, feu: -9, eau: 17, air: -27 } },
    moves: ['brisskote', 'briss_deuniss', 'brissolette']
}

monsters.tofubine = {
    id: 'tofubine',
    name: 'Tofubine',
    image: 'images/monsters/Tofubine.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1700, atk: 175, spd: 100, res: { neutre: 15, terre: 0, feu: 15, eau: 30, air: -15 } },
    moves: ['graine_toxique']
}

monsters.cauchemarakne = {
    id: 'cauchemarakne',
    name: 'Cauchemarakne',
    image: 'images/monsters/Cauchemarakne.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1700, atk: 63, spd: 100, res: { neutre: 7, terre: -18, feu: -1, eau: 5, air: 14 } },
    moves: ['Mort_sure']
}

monsters.bulbiflore = {
    id: 'bulbiflore',
    name: 'Bulbiflore',
    image: 'images/monsters/Bulbiflore.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1700, atk: 304, spd: 100, res: { neutre: 5, terre: 11, feu: 1, eau: 13, air: 8 } },
    moves: ['bulbation', 'frappe_vivace', 'pollinisation']
}

monsters.aloevee_rate = {
    id: 'aloevee_rate',
    name: 'Aloevée Rate',
    image: 'images/monsters/Aloevée_Rate.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1700, atk: 304, spd: 100, res: { neutre: 2, terre: 3, feu: -5, eau: 3, air: -3 } },
    moves: ['soignerat', 'drainerat', 'pousserat']
}

monsters.feu = {
    id: 'feu',
    name: 'Feu',
    image: 'images/monsters/Feu.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1800, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.krokille_mature_insipide = {
    id: 'krokille_mature_insipide',
    name: 'Krokille Mature Insipide',
    image: 'images/monsters/Krokille_Mature_Insipide.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1800, atk: 88, spd: 100, res: { neutre: 70, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['frenesie_elementale']
}

monsters.krokille_mature_boueuse = {
    id: 'krokille_mature_boueuse',
    name: 'Krokille Mature Boueuse',
    image: 'images/monsters/Krokille_Mature_Boueuse.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1800, atk: 88, spd: 100, res: { neutre: 0, terre: 70, feu: 0, eau: 0, air: -15 } },
    moves: ['eclosion']
}

monsters.krokille_mature_incandescente = {
    id: 'krokille_mature_incandescente',
    name: 'Krokille Mature Incandescente',
    image: 'images/monsters/Krokille_Mature_Incandescente.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1800, atk: 88, spd: 100, res: { neutre: 0, terre: 0, feu: 70, eau: -15, air: 0 } },
    moves: ['recalcification']
}

monsters.krokille_mature_humide = {
    id: 'krokille_mature_humide',
    name: 'Krokille Mature Humide',
    image: 'images/monsters/Krokille_Mature_Humide.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1800, atk: 88, spd: 100, res: { neutre: 0, terre: 0, feu: -15, eau: 70, air: 0 } },
    moves: ['hydrophobie']
}

monsters.krokille_mature_seche = {
    id: 'krokille_mature_seche',
    name: 'Krokille Mature Sèche',
    image: 'images/monsters/Krokille_Mature_Sèche.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1800, atk: 88, spd: 100, res: { neutre: 0, terre: -15, feu: 0, eau: 0, air: 70 } },
    moves: ['il_du_cyclone']
}

monsters.corbac = {
    id: 'corbac',
    name: 'Corbac',
    image: 'images/monsters/Corbac.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1800, atk: 408, spd: 100, res: { neutre: 26, terre: 26, feu: 26, eau: -19, air: -19 } },
    moves: ['cri_destabilisateur', 'lancer_d_uf', 'dilaceration']
}

monsters.guerrier_koalak = {
    id: 'guerrier_koalak',
    name: 'Guerrier Koalak',
    image: 'images/monsters/Guerrier_Koalak.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1800, atk: 120, spd: 100, res: { neutre: 40, terre: 10, feu: 10, eau: -9, air: -19 } },
    moves: ['boutade', 'assommoir', 'rage_du_guerrier']
}

monsters.kanigrou_hivernal = {
    id: 'kanigrou_hivernal',
    name: 'Kanigrou hivernal',
    image: 'images/monsters/Kanigrou_hivernal.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1800, atk: 304, spd: 100, res: { neutre: 10, terre: 10, feu: 10, eau: -9, air: -9 } },
    moves: ['griffe_du_kanigrou_hivernal', 'chute_majestueuse']
}

monsters.croc_gland_de_nowel = {
    id: 'croc_gland_de_nowel',
    name: 'Croc gland de Nowel',
    image: 'images/monsters/Croc_gland_de_Nowel.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1800, atk: 304, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['aboiement']
}

monsters.z_uf_perturbe = {
    id: 'z_uf_perturbe',
    name: 'Zœuf perturbé',
    image: 'images/monsters/Zœuf_perturbé.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1800, atk: 1000, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.tourbassingue = {
    id: 'tourbassingue',
    name: 'Tourbassingue',
    image: 'images/monsters/Tourbassingue.png',
    rarity: 'peu_commun',
    tier: 'normal',
    bst: { hp: 1800, atk: 250, spd: 120, res: { neutre: 20, terre: 15, feu: 33, eau: -27, air: -11 } },
    moves: ['tourbe_reparatrice', 'tourbe_malveillante']
}

monsters.chevaucheur_koalak = {
    id: 'chevaucheur_koalak',
    name: 'Chevaucheur Koalak',
    image: 'images/monsters/Chevaucheur_Koalak.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1800, atk: 125, spd: 100, res: { neutre: 20, terre: 29, feu: -58, eau: 10, air: 50 } },
    moves: ['prevention']
}

monsters.fossoyeur_koalak = {
    id: 'fossoyeur_koalak',
    name: 'Fossoyeur Koalak',
    image: 'images/monsters/Fossoyeur_Koalak.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1800, atk: 163, spd: 100, res: { neutre: 10, terre: 50, feu: 20, eau: -19, air: 20 } },
    moves: ['enterrement', 'motte_de_terre']
}

monsters.buveur = {
    id: 'buveur',
    name: 'Buveur',
    image: 'images/monsters/Buveur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1800, atk: 408, spd: 100, res: { neutre: 1, terre: -9, feu: -9, eau: 66, air: -9 } },
    moves: ['daudoh', 'buvette', 'parchotage']
}

monsters.buveur_de_sang = {
    id: 'buveur_de_sang',
    name: 'Buveur de Sang',
    image: 'images/monsters/Buveur_de_Sang.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1800, atk: 408, spd: 100, res: { neutre: 1, terre: -9, feu: -9, eau: 66, air: -9 } },
    moves: []
}

monsters.renarbo = {
    id: 'renarbo',
    name: 'Renarbo',
    image: 'images/monsters/Renarbo.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1800, atk: 408, spd: 100, res: { neutre: -14, terre: 21, feu: -9, eau: -24, air: 66 } },
    moves: ['croassement', 'ramage', 'deplumage']
}

monsters.renarbo_parleur = {
    id: 'renarbo_parleur',
    name: 'Renarbo Parleur',
    image: 'images/monsters/Renarbo_Parleur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1800, atk: 408, spd: 100, res: { neutre: -14, terre: 21, feu: -9, eau: -24, air: 66 } },
    moves: []
}

monsters.mandrine = {
    id: 'mandrine',
    name: 'Mandrine',
    image: 'images/monsters/Mandrine.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1800, atk: 228, spd: 100, res: { neutre: 10, terre: -9, feu: 10, eau: -9, air: 10 } },
    moves: ['empoisonnement_affaiblissant', 'empoisonnement_poisseux', 'empoisonnement_mouvemente']
}

monsters.tofutoflamme = {
    id: 'tofutoflamme',
    name: 'Tofutoflamme',
    image: 'images/monsters/Tofutoflamme.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1800, atk: 150, spd: 100, res: { neutre: 45, terre: 3, feu: 30, eau: -30, air: -30 } },
    moves: ['beco_ardent']
}

monsters.pupuce = {
    id: 'pupuce',
    name: 'Pupuce',
    image: 'images/monsters/Pupuce.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1800, atk: 340, spd: 100, res: { neutre: 10, terre: -14, feu: 8, eau: 16, air: 10 } },
    moves: ['pupunition', 'pupussuccion']
}

monsters.morcac = {
    id: 'morcac',
    name: 'Morcac',
    image: 'images/monsters/Morcac.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1800, atk: 340, spd: 100, res: { neutre: 8, terre: 2, feu: -4, eau: 4, air: 10 } },
    moves: ['roupetkifouette']
}

monsters.pikbul = {
    id: 'pikbul',
    name: 'Pikbul',
    image: 'images/monsters/Pikbul.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1800, atk: 340, spd: 100, res: { neutre: 14, terre: 6, feu: 8, eau: 6, air: -14 } },
    moves: ['infestation', 'dejection_empoisonnee']
}

monsters.geriatique = {
    id: 'geriatique',
    name: 'Gériatique',
    image: 'images/monsters/Gériatique.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1800, atk: 340, spd: 100, res: { neutre: -14, terre: 4, feu: 10, eau: 4, air: 16 } },
    moves: ['nuee_de_tiques', 'ponction_revitalisante']
}

monsters.grath = {
    id: 'grath',
    name: 'Grath',
    image: 'images/monsters/Grath.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1800, atk: 340, spd: 100, res: { neutre: 6, terre: 12, feu: 10, eau: -14, air: 6 } },
    moves: ['saut_de_puce', 'demangeaisons', 'secouage']
}

monsters.bambouto = {
    id: 'bambouto',
    name: 'Bambouto',
    image: 'images/monsters/Bambouto.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1800, atk: 304, spd: 100, res: { neutre: 10, terre: 9, feu: 9, eau: 4, air: 7 } },
    moves: ['bambouffe', 'photosynthese', 'presse_tige']
}

monsters.rate_atinee = {
    id: 'rate_atinee',
    name: 'Rate Atinée',
    image: 'images/monsters/Rate_Atinée.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1800, atk: 304, spd: 100, res: { neutre: 2, terre: 2, feu: 13, eau: -20, air: 3 } },
    moves: ['rapiat', 'radotage']
}

monsters.chika_rat = {
    id: 'chika_rat',
    name: 'Chika Rat',
    image: 'images/monsters/Chika_Rat.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1800, atk: 304, spd: 100, res: { neutre: -2, terre: 5, feu: 2, eau: -6, air: 1 } },
    moves: ['embrocherat', 'lancerat', 'aurat']
}

monsters.dragoss_charbon = {
    id: 'dragoss_charbon',
    name: 'Dragoss Charbon',
    image: 'images/monsters/Dragoss_Charbon.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1900, atk: 310, spd: 100, res: { neutre: 22, terre: 16, feu: 32, eau: -15, air: 11 } },
    moves: ['combustion', 'offrande_ardente']
}

monsters.tofuzmo = {
    id: 'tofuzmo',
    name: 'Tofuzmo',
    image: 'images/monsters/Tofuzmo.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1900, atk: 200, spd: 100, res: { neutre: 10, terre: 5, feu: -30, eau: -20, air: 30 } },
    moves: ['coup_de_bec_magistral', 'plumeau_aveuglant']
}

monsters.kirboule_l_erode = {
    id: 'kirboule_l_erode',
    name: 'Kirboule l\'Érodé',
    image: 'images/monsters/Kirboule_l_Érodé.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1900, atk: 363, spd: 100, res: { neutre: 6, terre: 6, feu: 20, eau: 50, air: 30 } },
    moves: ['Ecrasement_Handicapant']
}

monsters.chak_rat = {
    id: 'chak_rat',
    name: 'Chak Rat',
    image: 'images/monsters/Chak_Rat.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1900, atk: 304, spd: 100, res: { neutre: 4, terre: -5, feu: 3, eau: 2, air: -4 } },
    moves: ['preciserat', 'affinerat', 'assoifferat']
}

monsters.vilain_petit_tofu = {
    id: 'vilain_petit_tofu',
    name: 'Vilain Petit Tofu',
    image: 'images/monsters/Vilain_Petit_Tofu.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1900, atk: 100, spd: 100, res: { neutre: 25, terre: 15, feu: -15, eau: -30, air: 30 } },
    moves: ['vilain_beco']
}

monsters.bulbuisson = {
    id: 'bulbuisson',
    name: 'Bulbuisson',
    image: 'images/monsters/Bulbuisson.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1900, atk: 304, spd: 100, res: { neutre: 4, terre: 2, feu: 10, eau: 9, air: 7 } },
    moves: ['nectarissement', 'yuccanon']
}

monsters.malterego_de_malzerb = {
    id: 'malterego_de_malzerb',
    name: 'Malterego de Malzerb',
    image: 'images/monsters/Malterego_de_Malzerb.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 1900, atk: 432, spd: 100, res: { neutre: 3, terre: -3, feu: -14, eau: 2, air: 22 } },
    moves: []
}

monsters.rat_plapla = {
    id: 'rat_plapla',
    name: 'Rat Plapla',
    image: 'images/monsters/Rat_Plapla.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2000, atk: 304, spd: 100, res: { neutre: -8, terre: 7, feu: -18, eau: 11, air: 8 } },
    moves: ['raclage', 'radioactivite', 'radar']
}

monsters.maitre_koalak = {
    id: 'maitre_koalak',
    name: 'Maître Koalak',
    image: 'images/monsters/Maître_Koalak.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2000, atk: 200, spd: 100, res: { neutre: -25, terre: -10, feu: 50, eau: -10, air: -10 } },
    moves: ['frappe_du_maitre', 'reconciliation', 'transposition_du_maitre']
}

monsters.koalak_sanguin = {
    id: 'koalak_sanguin',
    name: 'Koalak Sanguin',
    image: 'images/monsters/Koalak_Sanguin.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2000, atk: 25, spd: 100, res: { neutre: 20, terre: 15, feu: 10, eau: -10, air: -20 } },
    moves: ['sang_chaud', 'punition_sanguine', 'transfert_de_vie_sanguin', 'chatiment_sanguin']
}

monsters.dragoss_proteiforme = {
    id: 'dragoss_proteiforme',
    name: 'Dragoss Protéiforme',
    image: 'images/monsters/Dragoss_Protéiforme.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2000, atk: 310, spd: 100, res: { neutre: 18, terre: 18, feu: 18, eau: 18, air: 18 } },
    moves: ['hyoide', 'engouement']
}

monsters.malterego_de_malepik = {
    id: 'malterego_de_malepik',
    name: 'Malterego de Malépik',
    image: 'images/monsters/Malterego_de_Malépik.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2000, atk: 432, spd: 100, res: { neutre: 0, terre: -8, feu: 21, eau: -7, air: 4 } },
    moves: ['malternatif', 'maluminium']
}

monsters.momie_koalak = {
    id: 'momie_koalak',
    name: 'Momie Koalak',
    image: 'images/monsters/Momie_Koalak.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2000, atk: 138, spd: 100, res: { neutre: 60, terre: -25, feu: 10, eau: 50, air: -50 } },
    moves: ['malediction_de_la_momie', 'clepsydre', 'bandelette_ancestrale']
}

monsters.fauchalak = {
    id: 'fauchalak',
    name: 'Fauchalak',
    image: 'images/monsters/Fauchalak.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2000, atk: 225, spd: 100, res: { neutre: 30, terre: 10, feu: -10, eau: 20, air: -10 } },
    moves: ['malediction_koalak', 'fauche', 'renfort_du_cimetiere_primitif']
}

monsters.miasme_polarisateur = {
    id: 'miasme_polarisateur',
    name: 'Miasme Polarisateur',
    image: 'images/monsters/Miasme_Polarisateur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2000, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.crystal_de_stasili = {
    id: 'crystal_de_stasili',
    name: 'Crystal de Stasili',
    image: 'images/monsters/Crystal_de_Stasili.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2000, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.floristile = {
    id: 'floristile',
    name: 'Floristile',
    image: 'images/monsters/Floristile.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2000, atk: 304, spd: 100, res: { neutre: 11, terre: 7, feu: 8, eau: 9, air: 0 } },
    moves: ['nez_bulleux', 'pistirage', 'petaclier']
}

monsters.bourgeon = {
    id: 'bourgeon',
    name: 'Bourgeon',
    image: 'images/monsters/Bourgeon.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 304, spd: 100, res: { neutre: 10, terre: 15, feu: 15, eau: 15, air: 15 } },
    moves: ['germe']
}

monsters.rat_li = {
    id: 'rat_li',
    name: 'Rat Li',
    image: 'images/monsters/Rat_Li.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 304, spd: 100, res: { neutre: -6, terre: -15, feu: 3, eau: 14, air: 4 } },
    moves: ['rapport', 'rappel_a_l_ordre', 'rapia']
}

monsters.wabbit_vampire = {
    id: 'wabbit_vampire',
    name: 'Wabbit Vampire',
    image: 'images/monsters/Wabbit_Vampire.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 200, spd: 100, res: { neutre: 6, terre: -33, feu: 16, eau: 32, air: 7 } },
    moves: ['genewosite_cawottique', 'theowie_de_la_cawotte']
}

monsters.wabbit_fluo = {
    id: 'wabbit_fluo',
    name: 'Wabbit Fluo',
    image: 'images/monsters/Wabbit_Fluo.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 200, spd: 100, res: { neutre: 16, terre: 32, feu: 7, eau: 6, air: -33 } },
    moves: ['empwise', 'aveuglement_luminescent', 'dispawition_wetawdee']
}

monsters.wabbit_cephale = {
    id: 'wabbit_cephale',
    name: 'Wabbit Céphale',
    image: 'images/monsters/Wabbit_Céphale.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 200, spd: 100, res: { neutre: 32, terre: 7, feu: 6, eau: -33, air: 16 } },
    moves: ['ecwasement', 'tewatif']
}

monsters.wabbit_garou = {
    id: 'wabbit_garou',
    name: 'Wabbit Garou',
    image: 'images/monsters/Wabbit_Garou.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 200, spd: 100, res: { neutre: 7, terre: 6, feu: -33, eau: 16, air: 32 } },
    moves: ['suwpwise', 'ecawtelement']
}

monsters.troollaraj = {
    id: 'troollaraj',
    name: 'Troollaraj',
    image: 'images/monsters/Troollaraj.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 448, spd: 100, res: { neutre: 26, terre: 26, feu: -9, eau: -19, air: 16 } },
    moves: ['vindication_troollesque', 'absorption_troollesque', 'ecrasement_troollesque']
}

monsters.rono_le_renarbo = {
    id: 'rono_le_renarbo',
    name: 'Rono le Renarbo',
    image: 'images/monsters/Rono_le_Renarbo.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 440, spd: 100, res: { neutre: -10, terre: 25, feu: -5, eau: -20, air: 70 } },
    moves: []
}

monsters.kapotie_le_buveur = {
    id: 'kapotie_le_buveur',
    name: 'Kapotie le Buveur',
    image: 'images/monsters/Kapotie_le_Buveur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 440, spd: 100, res: { neutre: 5, terre: -5, feu: -5, eau: 70, air: -5 } },
    moves: []
}

monsters.scaratos = {
    id: 'scaratos',
    name: 'Scaratos',
    image: 'images/monsters/Scaratos.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 225, spd: 100, res: { neutre: 10, terre: 5, feu: 9, eau: -9, air: -9 } },
    moves: ['defonce', 'cuticule', 'recueillement', 'scaracornos']
}

monsters.kramelehon = {
    id: 'kramelehon',
    name: 'Kraméléhon',
    image: 'images/monsters/Kraméléhon.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 175, spd: 100, res: { neutre: -30, terre: 20, feu: 10, eau: 20, air: 10 } },
    moves: ['disparition', 'coup_de_langue']
}

monsters.dragueuse = {
    id: 'dragueuse',
    name: 'Dragueuse',
    image: 'images/monsters/Dragueuse.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 390, spd: 100, res: { neutre: 10, terre: -13, feu: 14, eau: -6, air: 24 } },
    moves: ['drague', 'coup_de_foudre', 'tohu_bohu']
}

monsters.draguaindrop = {
    id: 'draguaindrop',
    name: 'Draguaindrop',
    image: 'images/monsters/Draguaindrop.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 390, spd: 100, res: { neutre: -8, terre: 9, feu: 16, eau: 24, air: -18 } },
    moves: ['coupedaikalle', 'souap', 'shinouque']
}

monsters.scelee_rate = {
    id: 'scelee_rate',
    name: 'Scélée Rate',
    image: 'images/monsters/Scélée_Rate.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 304, spd: 100, res: { neutre: -6, terre: 4, feu: 2, eau: 1, air: 3 } },
    moves: ['affaiblirat', 'collapserat', 'freinerat']
}

monsters.boufmouth = {
    id: 'boufmouth',
    name: 'Boufmouth',
    image: 'images/monsters/Boufmouth.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 380, spd: 100, res: { neutre: 23, terre: 15, feu: 5, eau: -32, air: 45 } },
    moves: ['krouth', 'klougmouth', 'moumouth']
}

monsters.boufmouth_de_guerre = {
    id: 'boufmouth_de_guerre',
    name: 'Boufmouth de guerre',
    image: 'images/monsters/Boufmouth_de_guerre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 380, spd: 100, res: { neutre: 50, terre: 20, feu: -38, eau: 30, air: 15 } },
    moves: ['koudblouze', 'boufbaffe', 'hubermouth']
}

monsters.boufmouth_legendaire = {
    id: 'boufmouth_legendaire',
    name: 'Boufmouth légendaire',
    image: 'images/monsters/Boufmouth_légendaire.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 380, spd: 100, res: { neutre: 15, terre: -35, feu: 51, eau: 10, air: 19 } },
    moves: ['koudkorn', 'moutharde', 'moubilite']
}

monsters.bouftonmouth = {
    id: 'bouftonmouth',
    name: 'Bouftonmouth',
    image: 'images/monsters/Bouftonmouth.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 380, spd: 100, res: { neutre: 10, terre: 60, feu: 20, eau: 15, air: -40 } },
    moves: ['moursure', 'bizmouth']
}

monsters.cawotman = {
    id: 'cawotman',
    name: 'Cawotman',
    image: 'images/monsters/Cawotman.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 200, spd: 100, res: { neutre: -33, terre: 16, feu: 32, eau: 7, air: 6 } },
    moves: ['bond_appetissant', 'goinfwage']
}

monsters.dramak = {
    id: 'dramak',
    name: 'Dramak',
    image: 'images/monsters/Dramak.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 300, spd: 100, res: { neutre: 40, terre: -10, feu: 25, eau: -15, air: 20 } },
    moves: ['invocation_de_pantin', 'manipulation', 'entracte', 'marionnette']
}

monsters.truchideur = {
    id: 'truchideur',
    name: 'Truchideur',
    image: 'images/monsters/Truchideur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 220, spd: 100, res: { neutre: 32, terre: 22, feu: -23, eau: 17, air: -13 } },
    moves: ['truchidage', 'boulette_baveuse', 'truchenrut', 'bouffee_de_chaleur']
}

monsters.truchtine = {
    id: 'truchtine',
    name: 'Truchtine',
    image: 'images/monsters/Truchtine.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 210, spd: 100, res: { neutre: -18, terre: -23, feu: 17, eau: -13, air: 32 } },
    moves: ['degage', 'vision_trouble', 'rondelle_reparatrice', 'myopie']
}

monsters.truchon = {
    id: 'truchon',
    name: 'Truchon',
    image: 'images/monsters/Truchon.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 200, spd: 100, res: { neutre: 2, terre: 12, feu: 22, eau: -3, air: -18 } },
    moves: ['claque_du_bec', 'proutoto', 'exhalation_chetive', 'survie_de_l_espece']
}

monsters.gromorso = {
    id: 'gromorso',
    name: 'Gromorso',
    image: 'images/monsters/Gromorso.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 340, spd: 100, res: { neutre: 17, terre: -14, feu: -21, eau: 28, air: 10 } },
    moves: ['transmission_instantanee', 'echauffement_songeur']
}

monsters.farfacette = {
    id: 'farfacette',
    name: 'Farfacette',
    image: 'images/monsters/Farfacette.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 340, spd: 100, res: { neutre: -14, terre: -21, feu: 28, eau: 10, air: 17 } },
    moves: ['tornadhesive', 'cercle_de_lumiere', 'farce_cachee']
}

monsters.brikablak = {
    id: 'brikablak',
    name: 'Brikablak',
    image: 'images/monsters/Brikablak.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 340, spd: 100, res: { neutre: -21, terre: 28, feu: 10, eau: 17, air: -14 } },
    moves: ['attaque_surprise', 'pluixel']
}

monsters.eklatleth = {
    id: 'eklatleth',
    name: 'Éklatleth',
    image: 'images/monsters/Éklatleth.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 340, spd: 100, res: { neutre: 28, terre: 10, feu: 17, eau: -14, air: -21 } },
    moves: ['eklatlatete', 'secoust']
}

monsters.segmantid = {
    id: 'segmantid',
    name: 'Segmantid',
    image: 'images/monsters/Segmantid.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 340, spd: 100, res: { neutre: 10, terre: 17, feu: -14, eau: -21, air: 28 } },
    moves: ['segmentation', 'feu_use']
}

monsters.troolligark = {
    id: 'troolligark',
    name: 'Troolligark',
    image: 'images/monsters/Troolligark.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 448, spd: 100, res: { neutre: -9, terre: -19, feu: 16, eau: 26, air: 26 } },
    moves: ['controoll', 'troollage']
}

monsters.troolleole = {
    id: 'troolleole',
    name: 'Troolléolé',
    image: 'images/monsters/Troolléolé.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 448, spd: 100, res: { neutre: -19, terre: 16, feu: 26, eau: -9, air: 26 } },
    moves: ['troollahonte', 'troollfesse']
}

monsters.dragace = {
    id: 'dragace',
    name: 'Dragacé',
    image: 'images/monsters/Dragacé.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 390, spd: 100, res: { neutre: -10, terre: 24, feu: -18, eau: 9, air: 18 } },
    moves: ['mort_d_illement', 'bourrascasse']
}

monsters.grenufar = {
    id: 'grenufar',
    name: 'Grenufar',
    image: 'images/monsters/Grenufar.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2100, atk: 304, spd: 100, res: { neutre: 10, terre: 15, feu: 15, eau: 15, air: 15 } },
    moves: ['plongeon', 'bactrasoin', 'amphibaffe']
}

monsters.corbac_apprivoise = {
    id: 'corbac_apprivoise',
    name: 'Corbac Apprivoisé',
    image: 'images/monsters/Corbac_Apprivoisé.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2200, atk: 408, spd: 100, res: { neutre: 21, terre: -14, feu: 26, eau: 26, air: -29 } },
    moves: ['plumeau_destabilisant', 'bousculade_plumeuse']
}

monsters.corbac_dresse = {
    id: 'corbac_dresse',
    name: 'Corbac Dressé',
    image: 'images/monsters/Corbac_Dressé.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2200, atk: 408, spd: 100, res: { neutre: 21, terre: -14, feu: 26, eau: 26, air: -29 } },
    moves: []
}

monsters.poupee_affamee = {
    id: 'poupee_affamee',
    name: 'Poupée Affamée',
    image: 'images/monsters/Workette.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2200, atk: 75, spd: 100, res: { neutre: 130, terre: 130, feu: 130, eau: 130, air: 130 } },
    moves: ['coupe_faim', 'digestion_explosive', 'saphir_apaisant']
}

monsters.disciple_zoth = {
    id: 'disciple_zoth',
    name: 'Disciple Zoth',
    image: 'images/monsters/Disciple_Zoth.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2200, atk: 400, spd: 100, res: { neutre: 10, terre: 10, feu: -38, eau: 5, air: 32 } },
    moves: ['supplice']
}

monsters.rat_sio = {
    id: 'rat_sio',
    name: 'Rat Sio',
    image: 'images/monsters/Rat_Sio.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2200, atk: 304, spd: 100, res: { neutre: 20, terre: 20, feu: 20, eau: 20, air: 20 } },
    moves: ['rayonnage', 'rapace']
}

monsters.warko_violet = {
    id: 'warko_violet',
    name: 'Warko Violet',
    image: 'images/monsters/Warko_Violet.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2200, atk: 150, spd: 100, res: { neutre: 30, terre: -19, feu: 10, eau: -19, air: 10 } },
    moves: []
}

monsters.malterego_de_maltrio = {
    id: 'malterego_de_maltrio',
    name: 'Malterego de Maltrio',
    image: 'images/monsters/Malterego_de_Maltrio.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2200, atk: 432, spd: 100, res: { neutre: 2, terre: 14, feu: 7, eau: -2, air: -11 } },
    moves: ['malergie', 'malezi']
}

monsters.malterego_de_malbois = {
    id: 'malterego_de_malbois',
    name: 'Malterego de Malbois',
    image: 'images/monsters/Malterego_de_Malbois.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2200, atk: 432, spd: 100, res: { neutre: -17, terre: 12, feu: 31, eau: -9, air: -7 } },
    moves: ['malgorithmie', 'malimentation']
}

monsters.mininuit = {
    id: 'mininuit',
    name: 'Mininuit',
    image: 'images/monsters/Mininuit.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2200, atk: 304, spd: 100, res: { neutre: 30, terre: -20, feu: 10, eau: 10, air: 10 } },
    moves: ['patinage', 'marteau_d_okim', 'marteau_d_orelos']
}

monsters.gruche = {
    id: 'gruche',
    name: 'Gruche',
    image: 'images/monsters/Gruche.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2200, atk: 240, spd: 100, res: { neutre: 22, terre: 27, feu: -18, eau: -18, air: 12 } },
    moves: ['envolee_brutale', 'rejet_toxique', 'pied_de_gruche']
}

monsters.truchmuche = {
    id: 'truchmuche',
    name: 'Truchmuche',
    image: 'images/monsters/Truchmuche.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2200, atk: 230, spd: 100, res: { neutre: -8, terre: -23, feu: 17, eau: 27, air: -3 } },
    moves: ['laxatif', 'pourriture_intestinale', 'indigestion_contagieuse', 'diarrhee_affaiblissante']
}

monsters.sarkapwane = {
    id: 'sarkapwane',
    name: 'Sarkapwane',
    image: 'images/monsters/Sarkapwane.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2200, atk: 368, spd: 100, res: { neutre: 10, terre: 10, feu: -5, eau: -5, air: 20 } },
    moves: ['crache_eau', 'kwap', 'invocation_de_bombombre']
}

monsters.rate_iboisee = {
    id: 'rate_iboisee',
    name: 'Rate Iboisée',
    image: 'images/monsters/Rate_Iboisée.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2300, atk: 304, spd: 100, res: { neutre: 12, terre: 6, feu: 2, eau: -5, air: -15 } },
    moves: ['raviner', 'raffinage']
}

monsters.capoei_rat = {
    id: 'capoei_rat',
    name: 'Capoei Rat',
    image: 'images/monsters/Capoei_Rat.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2300, atk: 304, spd: 100, res: { neutre: 2, terre: -7, feu: 2, eau: 0, air: 3 } },
    moves: ['confinerat', 'dechiquetterat']
}

monsters.gamine_zoth = {
    id: 'gamine_zoth',
    name: 'Gamine Zoth',
    image: 'images/monsters/Gamine_Zoth.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2300, atk: 400, spd: 100, res: { neutre: 10, terre: -39, feu: 7, eau: 30, air: 0 } },
    moves: ['tyrannie', 'gaminerie', 'transgaminerie']
}

monsters.tofu_dodu = {
    id: 'tofu_dodu',
    name: 'Tofu Dodu',
    image: 'images/monsters/Tofu_Dodu.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2400, atk: 0, spd: 100, res: { neutre: 40, terre: -40, feu: 10, eau: 20, air: 40 } },
    moves: ['malediction_du_tofulailler_royal', 'benediction_du_tofulailler_royal', 'envol_liberateur']
}

monsters.guerrier_zoth = {
    id: 'guerrier_zoth',
    name: 'Guerrier Zoth',
    image: 'images/monsters/Guerrier_Zoth.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2400, atk: 500, spd: 100, res: { neutre: -15, terre: 5, feu: 38, eau: 10, air: -30 } },
    moves: ['hechaud_fourree', 'melee']
}

monsters.chef_waddict = {
    id: 'chef_waddict',
    name: 'Chef Waddict',
    image: 'images/monsters/Chef_Waddict.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2400, atk: 420, spd: 100, res: { neutre: 5, terre: 11, feu: 0, eau: 10, air: 14 } },
    moves: ['enwobage', 'anawchie', 'assasindic']
}

monsters.gamino = {
    id: 'gamino',
    name: 'Gamino',
    image: 'images/monsters/Gamino.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2400, atk: 150, spd: 100, res: { neutre: 10, terre: 50, feu: 5, eau: -9, air: -30 } },
    moves: ['chevauchee_malicieuse', 'esprit_d_equipe', 'coup_de_sceptre']
}

monsters.serpiplume = {
    id: 'serpiplume',
    name: 'Serpiplume',
    image: 'images/monsters/Serpiplume.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2400, atk: 175, spd: 100, res: { neutre: 10, terre: 10, feu: -9, eau: -9, air: 10 } },
    moves: ['boulette', 'sonnette', 'venin_destabilisateur']
}

monsters.chienchien_courant = {
    id: 'chienchien_courant',
    name: 'Chienchien Courant',
    image: 'images/monsters/Chienchien_Courant.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2400, atk: 728, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['accrochage']
}

monsters.lampe_bleue = {
    id: 'lampe_bleue',
    name: 'Lampe Bleue',
    image: 'images/monsters/Lampe_Bleue.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2400, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['lumiere_bleue']
}

monsters.sergent_zoth = {
    id: 'sergent_zoth',
    name: 'Sergent Zoth',
    image: 'images/monsters/Sergent_Zoth.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2500, atk: 400, spd: 100, res: { neutre: -8, terre: 7, feu: 5, eau: 34, air: -35 } },
    moves: ['kulbutage']
}

monsters.ramane = {
    id: 'ramane',
    name: 'Ramane',
    image: 'images/monsters/Ramane.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2500, atk: 350, spd: 100, res: { neutre: -10, terre: 20, feu: 69, eau: -30, air: 5 } },
    moves: ['poils_terrestres', 'desenvoutement_poilu', 'comte_ancestral']
}

monsters.abraknyde_sombre_irascible = {
    id: 'abraknyde_sombre_irascible',
    name: 'Abraknyde Sombre Irascible',
    image: 'images/monsters/Abraknyde_Sombre_Irascible.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2500, atk: 300, spd: 100, res: { neutre: 31, terre: 31, feu: -27, eau: 29, air: 11 } },
    moves: ['Abrabranche']
}

monsters.glutin_colerique = {
    id: 'glutin_colerique',
    name: 'Glutin colérique',
    image: 'images/monsters/Glutin_colérique.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2500, atk: 125, spd: 100, res: { neutre: 100, terre: 100, feu: 0, eau: 100, air: 100 } },
    moves: ['glutinerie', 'glutincelle']
}

monsters.glutin_acariatre = {
    id: 'glutin_acariatre',
    name: 'Glutin acariâtre',
    image: 'images/monsters/Glutin_acariâtre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2500, atk: 125, spd: 100, res: { neutre: 100, terre: 100, feu: 100, eau: 0, air: 100 } },
    moves: ['glutorpille']
}

monsters.glutin_morose = {
    id: 'glutin_morose',
    name: 'Glutin morose',
    image: 'images/monsters/Glutin_morose.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2500, atk: 125, spd: 100, res: { neutre: 100, terre: 100, feu: 100, eau: 100, air: 0 } },
    moves: ['glutimpact']
}

monsters.glutin_boudeur = {
    id: 'glutin_boudeur',
    name: 'Glutin boudeur',
    image: 'images/monsters/Glutin_boudeur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2500, atk: 125, spd: 100, res: { neutre: 100, terre: 0, feu: 100, eau: 100, air: 100 } },
    moves: ['glutarc']
}

monsters.malterego_de_malalfa = {
    id: 'malterego_de_malalfa',
    name: 'Malterego de Malalfa',
    image: 'images/monsters/Malterego_de_Malalfa.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2500, atk: 432, spd: 100, res: { neutre: -28, terre: 5, feu: 6, eau: 21, air: 6 } },
    moves: ['malourdissement', 'malienisme']
}

monsters.horace_le_corbac_apprivoise = {
    id: 'horace_le_corbac_apprivoise',
    name: 'Horace le Corbac Apprivoisé',
    image: 'images/monsters/Horace_le_Corbac_Apprivoisé.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2500, atk: 440, spd: 100, res: { neutre: 25, terre: -10, feu: 30, eau: 30, air: -25 } },
    moves: []
}

monsters.silhouette = {
    id: 'silhouette',
    name: 'Silhouette',
    image: 'images/monsters/Silhouette.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2500, atk: 400, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['empoigne', 'strangulation']
}

monsters.milimaitre = {
    id: 'milimaitre',
    name: 'Milimaître',
    image: 'images/monsters/Milimaître.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2500, atk: 380, spd: 100, res: { neutre: -14, terre: 16, feu: -24, eau: 26, air: 6 } },
    moves: ['feintrigue', 'coupression', 'plantonyme']
}

monsters.kartouche = {
    id: 'kartouche',
    name: 'Kartouche',
    image: 'images/monsters/Kartouche.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2500, atk: 380, spd: 100, res: { neutre: 6, terre: -14, feu: 16, eau: -24, air: 26 } },
    moves: ['decrossage', 'tir_progressif']
}

monsters.sramourai = {
    id: 'sramourai',
    name: 'Sramouraï',
    image: 'images/monsters/Sramouraï.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2500, atk: 380, spd: 100, res: { neutre: 16, terre: -24, feu: 26, eau: 6, air: -14 } },
    moves: ['coupe_vent', 'moulinet_sournois']
}

monsters.tromblion = {
    id: 'tromblion',
    name: 'Tromblion',
    image: 'images/monsters/Tromblion.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2500, atk: 380, spd: 100, res: { neutre: -24, terre: 26, feu: 6, eau: -14, air: 16 } },
    moves: ['decharge_en_salle', 'crosse_a_terre']
}

monsters.elsoummo = {
    id: 'elsoummo',
    name: 'Elsoummo',
    image: 'images/monsters/Elsoummo.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2500, atk: 380, spd: 100, res: { neutre: 26, terre: 6, feu: -14, eau: 16, air: -24 } },
    moves: ['saut_de_lune', 'kimarite']
}

monsters.cactiflore = {
    id: 'cactiflore',
    name: 'Cactiflore',
    image: 'images/monsters/Cactiflore.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2500, atk: 488, spd: 100, res: { neutre: -24, terre: 26, feu: 31, eau: -19, air: 21 } },
    moves: ['cacteau', 'spores_assechantes', 'ispores']
}

monsters.cactana = {
    id: 'cactana',
    name: 'Cactana',
    image: 'images/monsters/Cactana.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2500, atk: 488, spd: 100, res: { neutre: 16, terre: 0, feu: -14, eau: 6, air: 26 } },
    moves: ['cactanus', 'pixor', 'bonussocac']
}

monsters.cactoblongo = {
    id: 'cactoblongo',
    name: 'Cactoblongo',
    image: 'images/monsters/Cactoblongo.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2500, atk: 488, spd: 100, res: { neutre: 0, terre: 31, feu: 21, eau: 16, air: -29 } },
    moves: ['mouerte', 'percepine', 'camocacterre']
}

monsters.pampactus = {
    id: 'pampactus',
    name: 'Pampactus',
    image: 'images/monsters/Pampactus.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2500, atk: 488, spd: 100, res: { neutre: 0, terre: 11, feu: 16, eau: 6, air: -9 } },
    moves: ['unepine', 'couche_pampars']
}

monsters.levito = {
    id: 'levito',
    name: 'Lévito',
    image: 'images/monsters/Lévito.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2500, atk: 488, spd: 100, res: { neutre: 6, terre: -24, feu: -9, eau: 26, air: 31 } },
    moves: ['maracac', 'salsa', 'joropo']
}

monsters.kakoalak = {
    id: 'kakoalak',
    name: 'Kakoalak',
    image: 'images/monsters/Kakoalak.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2500, atk: 432, spd: 100, res: { neutre: 17, terre: 9, feu: -13, eau: 21, air: -8 } },
    moves: ['kakoaklake', 'pluie_de_pepite']
}

monsters.mansocolat = {
    id: 'mansocolat',
    name: 'Mansocolat',
    image: 'images/monsters/Mansocolat.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2500, atk: 432, spd: 100, res: { neutre: -17, terre: 16, feu: 7, eau: -8, air: 10 } },
    moves: ['maskansocolat', 'mansocolere', 'mansaut']
}

monsters.glourson_guimauve = {
    id: 'glourson_guimauve',
    name: 'Glourson Guimauve',
    image: 'images/monsters/Glourson_Guimauve.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2500, atk: 432, spd: 100, res: { neutre: 8, terre: -12, feu: 18, eau: -7, air: 12 } },
    moves: []
}

monsters.chocoskargo = {
    id: 'chocoskargo',
    name: 'Chocoskargo',
    image: 'images/monsters/Chocoskargo.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2500, atk: 432, spd: 100, res: { neutre: 13, terre: -8, feu: 5, eau: 9, air: -19 } },
    moves: ['enrobage', 'glycemie', 'chocoskarfarce']
}

monsters.kwakao = {
    id: 'kwakao',
    name: 'Kwakao',
    image: 'images/monsters/Kwakao.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2500, atk: 432, spd: 100, res: { neutre: 8, terre: 13, feu: -15, eau: -11, air: 10 } },
    moves: ['kwakaoust', 'skwalala']
}

monsters.shinibaru = {
    id: 'shinibaru',
    name: 'Shinibaru',
    image: 'images/monsters/Shinibaru.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2500, atk: 368, spd: 100, res: { neutre: 20, terre: 30, feu: -20, eau: -10, air: -10 } },
    moves: ['henshin_no_numa', 'henshinobi', 'nukiyo_e', 'yama_no_tuki']
}

monsters.ishigro_pake = {
    id: 'ishigro_pake',
    name: 'Ishigro Pake',
    image: 'images/monsters/Ishigro_Pake.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2500, atk: 368, spd: 100, res: { neutre: 5, terre: 40, feu: 10, eau: -15, air: -30 } },
    moves: ['tsunamishi', 'elevation_du_jardin_de_pierres', 'ishi_nuken']
}

monsters.tetonuki = {
    id: 'tetonuki',
    name: 'Tétonuki',
    image: 'images/monsters/Tétonuki.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2500, atk: 368, spd: 100, res: { neutre: -5, terre: 20, feu: 30, eau: -30, air: -5 } },
    moves: ['tambourrin', 'percusseins']
}

monsters.parashukoui = {
    id: 'parashukoui',
    name: 'Parashukouï',
    image: 'images/monsters/Parashukouï.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2500, atk: 368, spd: 100, res: { neutre: -15, terre: -20, feu: 5, eau: 10, air: 30 } },
    moves: ['valseuses', 'transpompoko', 'testirossa']
}

monsters.lolojiki = {
    id: 'lolojiki',
    name: 'Lolojiki',
    image: 'images/monsters/Lolojiki.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2500, atk: 368, spd: 100, res: { neutre: 15, terre: 15, feu: -30, eau: 30, air: -15 } },
    moves: ['poterie_tanuki', 'kaolin', 'terre_glaise']
}

monsters.kokom = {
    id: 'kokom',
    name: 'Kokom',
    image: 'images/monsters/Kokom.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2500, atk: 368, spd: 100, res: { neutre: -15, terre: -15, feu: 20, eau: 20, air: -5 } },
    moves: ['kom_koko', 'attirance_du_concombre']
}

monsters.maitre_zoth = {
    id: 'maitre_zoth',
    name: 'Maître Zoth',
    image: 'images/monsters/Maître_Zoth.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2600, atk: 450, spd: 100, res: { neutre: 11, terre: 40, feu: -7, eau: -47, air: 14 } },
    moves: ['bataille_pour_la_terre_des_zoths', 'incitation']
}

monsters.araknotron_irascible = {
    id: 'araknotron_irascible',
    name: 'Araknotron Irascible',
    image: 'images/monsters/Araknotron.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2600, atk: 300, spd: 100, res: { neutre: 6, terre: -24, feu: 7, eau: -27, air: 7 } },
    moves: ['Lancer_d_Arakne_Morte', 'Complicite']
}

monsters.dragnarok = {
    id: 'dragnarok',
    name: 'Dragnarok',
    image: 'images/monsters/Dragnarok.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2600, atk: 390, spd: 100, res: { neutre: 24, terre: 18, feu: 12, eau: -5, air: -10 } },
    moves: ['steune', 'dragtaie', 'cuit_rasse']
}

monsters.brouture = {
    id: 'brouture',
    name: 'Brouture',
    image: 'images/monsters/Brouture.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2600, atk: 120, spd: 100, res: { neutre: -10, terre: -34, feu: 9, eau: 36, air: 10 } },
    moves: ['repousse', 'seve_nourrissante', 'galle']
}

monsters.nerbe = {
    id: 'nerbe',
    name: 'Nerbe',
    image: 'images/monsters/Nerbe.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2600, atk: 110, spd: 100, res: { neutre: 30, terre: 5, feu: -22, eau: 3, air: 25 } },
    moves: ['herbe_hacha', 'mauvaise_herbe']
}

monsters.chiendent = {
    id: 'chiendent',
    name: 'Chiendent',
    image: 'images/monsters/Chiendent.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2600, atk: 100, spd: 100, res: { neutre: 10, terre: 35, feu: -20, eau: 9, air: -10 } },
    moves: ['morsure_critique', 'flair_obscur']
}

monsters.rat_pine = {
    id: 'rat_pine',
    name: 'Rat Pine',
    image: 'images/monsters/Rat_Pine.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2700, atk: 473, spd: 100, res: { neutre: 20, terre: -10, feu: 69, eau: -30, air: 5 } },
    moves: ['ratatinage', 'rature', 'ratatouille']
}

monsters.glutin_tapageur = {
    id: 'glutin_tapageur',
    name: 'Glutin Tapageur',
    image: 'images/monsters/Glutin_Tapageur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2700, atk: 250, spd: 100, res: { neutre: 31, terre: -5, feu: -5, eau: 20, air: 23 } },
    moves: []
}

monsters.bitouf_sombre = {
    id: 'bitouf_sombre',
    name: 'Bitouf Sombre',
    image: 'images/monsters/Bitouf_Sombre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2700, atk: 150, spd: 100, res: { neutre: 13, terre: 13, feu: 13, eau: -33, air: 25 } },
    moves: ['glanage', 'ecrasement_sombre']
}

monsters.floribonde = {
    id: 'floribonde',
    name: 'Floribonde',
    image: 'images/monsters/Floribonde.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2700, atk: 140, spd: 100, res: { neutre: 10, terre: 25, feu: 10, eau: -30, air: -5 } },
    moves: ['pistil_ensorcele', 'etamines_libertines', 'flagellation_florale']
}

monsters.fecorce = {
    id: 'fecorce',
    name: 'Fécorce',
    image: 'images/monsters/Fécorce.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2700, atk: 130, spd: 100, res: { neutre: 15, terre: 8, feu: 30, eau: 40, air: -7 } },
    moves: ['ecorce_detonante', 'ecorce_malsaine']
}

monsters.larmichette_de_l_ogre = {
    id: 'larmichette_de_l_ogre',
    name: 'Larmichette de l\'ogre',
    image: 'images/monsters/Larmichette_de_l_ogre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2700, atk: 500, spd: 100, res: { neutre: 5, terre: 5, feu: 5, eau: 5, air: 5 } },
    moves: ['glougloutte_salee']
}

monsters.rat_goutant = {
    id: 'rat_goutant',
    name: 'Rat Goûtant',
    image: 'images/monsters/Rat_Goûtant.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2800, atk: 178, spd: 100, res: { neutre: 5, terre: 69, feu: 20, eau: -10, air: -30 } },
    moves: ['empalement']
}

monsters.abrakleur_sombre = {
    id: 'abrakleur_sombre',
    name: 'Abrakleur Sombre',
    image: 'images/monsters/Abrakleur_Sombre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2800, atk: 160, spd: 100, res: { neutre: 1, terre: 1, feu: 1, eau: -19, air: 19 } },
    moves: ['nervure', 'ecorce_putride', 'plantage']
}

monsters.sanglacier = {
    id: 'sanglacier',
    name: 'Sanglacier',
    image: 'images/monsters/Sanglacier.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2800, atk: 460, spd: 100, res: { neutre: 14, terre: 10, feu: 5, eau: 30, air: -23 } },
    moves: ['sanglancornage', 'sanglobouste', 'sanglosoin']
}

monsters.fricochere = {
    id: 'fricochere',
    name: 'Fricochère',
    image: 'images/monsters/Fricochère.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2800, atk: 460, spd: 100, res: { neutre: 1, terre: 14, feu: 13, eau: -26, air: 22 } },
    moves: ['fricochoncete', 'fricadelle', 'fricotage']
}

monsters.kaniglou = {
    id: 'kaniglou',
    name: 'Kaniglou',
    image: 'images/monsters/Kaniglou.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2800, atk: 460, spd: 100, res: { neutre: -21, terre: 15, feu: 10, eau: 14, air: 31 } },
    moves: ['glouglou', 'kaniglouton', 'frigogol']
}

monsters.timansot = {
    id: 'timansot',
    name: 'Timansot',
    image: 'images/monsters/Timansot.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2800, atk: 460, spd: 100, res: { neutre: 14, terre: -26, feu: 10, eau: 32, air: 8 } },
    moves: ['mansonnette', 'mansotise', 'mansovetage']
}

monsters.shamansot = {
    id: 'shamansot',
    name: 'Shamansot',
    image: 'images/monsters/Shamansot.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2800, atk: 460, spd: 100, res: { neutre: 16, terre: 10, feu: 32, eau: 12, air: -32 } },
    moves: ['mansote_mouton', 'mansovage', 'mansorcier']
}

monsters.mansobese = {
    id: 'mansobese',
    name: 'Mansobèse',
    image: 'images/monsters/Mansobèse.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2800, atk: 460, spd: 100, res: { neutre: 5, terre: 31, feu: 10, eau: -29, air: 7 } },
    moves: ['mansolotage', 'mansogrenu', 'mansoldat']
}

monsters.mamansot = {
    id: 'mamansot',
    name: 'Mamansot',
    image: 'images/monsters/Mamansot.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2800, atk: 460, spd: 100, res: { neutre: 15, terre: 10, feu: -25, eau: 5, air: 31 } },
    moves: ['mansolex', 'mansovietik', 'mansovegarde']
}

monsters.fu_mansot = {
    id: 'fu_mansot',
    name: 'Fu Mansot',
    image: 'images/monsters/Fu_Mansot.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2800, atk: 460, spd: 100, res: { neutre: 36, terre: 14, feu: 16, eau: -25, air: 12 } },
    moves: ['mansoron', 'mansolfatare', 'mansoja']
}

monsters.ecumouth = {
    id: 'ecumouth',
    name: 'Écumouth',
    image: 'images/monsters/Écumouth.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2800, atk: 460, spd: 100, res: { neutre: 7, terre: 30, feu: -24, eau: 12, air: 5 } },
    moves: ['chataigne_glacee', 'propulsogland', 'equilibrogland']
}

monsters.smilomouth = {
    id: 'smilomouth',
    name: 'Smilomouth',
    image: 'images/monsters/Smilomouth.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2800, atk: 460, spd: 100, res: { neutre: 13, terre: -23, feu: 25, eau: 2, air: 10 } },
    moves: ['griffemouth', 'ramolimouth', 'hurlomouth']
}

monsters.gliglibido = {
    id: 'gliglibido',
    name: 'Gliglibido',
    image: 'images/monsters/Gliglibido.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2800, atk: 333, spd: 100, res: { neutre: 32, terre: -9, feu: 27, eau: 11, air: -23 } },
    moves: ['gland_d_ouil', 'remontant', 'fluide_brulant']
}

monsters.gliglitch = {
    id: 'gliglitch',
    name: 'Gliglitch',
    image: 'images/monsters/Gliglitch.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2800, atk: 333, spd: 100, res: { neutre: 5, terre: 17, feu: 7, eau: -5, air: -17 } },
    moves: ['gliglag', 'gligliplication', 'embrochement_dephase']
}

monsters.ino_naru = {
    id: 'ino_naru',
    name: 'Ino-Naru',
    image: 'images/monsters/Ino-Naru.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2800, atk: 400, spd: 100, res: { neutre: 15, terre: -10, feu: 25, eau: -20, air: 20 } },
    moves: ['zephyr', 'nun_shakrang', 'stratus']
}

monsters.kurookin = {
    id: 'kurookin',
    name: 'Kurookin',
    image: 'images/monsters/Kurookin.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2800, atk: 400, spd: 100, res: { neutre: 10, terre: 15, feu: -10, eau: 25, air: -10 } },
    moves: ['rinku', 'armure_des_vents', 'kozaru_no_kotsu', 'depression_atmospherique']
}

monsters.crachefoux = {
    id: 'crachefoux',
    name: 'Crachefoux',
    image: 'images/monsters/Crachefoux.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2800, atk: 400, spd: 100, res: { neutre: 6, terre: 16, feu: 16, eau: 0, air: -9 } },
    moves: ['couleuvrine', 'a_bout_portant', 'boulet_magique']
}

monsters.rouquette = {
    id: 'rouquette',
    name: 'Rouquette',
    image: 'images/monsters/Rouquette.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2800, atk: 400, spd: 100, res: { neutre: 11, terre: 1, feu: 16, eau: 21, air: -19 } },
    moves: ['fusee_incendiaire', 'echec_critique', 'decollage_rate']
}

monsters.boumbardier = {
    id: 'boumbardier',
    name: 'Boumbardier',
    image: 'images/monsters/Boumbardier.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2800, atk: 400, spd: 100, res: { neutre: 1, terre: 21, feu: -14, eau: -14, air: 26 } },
    moves: ['obus_aveuglant', 'feu_d_artifice', 'obus_gluant']
}

monsters.petartifoux = {
    id: 'petartifoux',
    name: 'Pétartifoux',
    image: 'images/monsters/Pétartifoux.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2800, atk: 400, spd: 100, res: { neutre: 6, terre: -24, feu: 21, eau: 11, air: 11 } },
    moves: ['petard', 'phosphore', 'poudre_enervante']
}

monsters.founamboul = {
    id: 'founamboul',
    name: 'Founamboul',
    image: 'images/monsters/Founamboul.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2800, atk: 400, spd: 100, res: { neutre: 16, terre: 0, feu: 11, eau: 6, air: 6 } },
    moves: ['boumboule', 'tourniboule']
}

monsters.malzerb = {
    id: 'malzerb',
    name: 'Malzerb',
    image: 'images/monsters/Malzerb.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2800, atk: 432, spd: 100, res: { neutre: 3, terre: -3, feu: -14, eau: 2, air: 22 } },
    moves: ['maltruisme', 'malveole', 'malumeur']
}

monsters.rat_masseur = {
    id: 'rat_masseur',
    name: 'Rat Masseur',
    image: 'images/monsters/Rat_Masseur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2900, atk: 398, spd: 100, res: { neutre: 69, terre: 5, feu: -30, eau: 20, air: -10 } },
    moves: ['ravin', 'doctorat']
}

monsters.rat_colleur = {
    id: 'rat_colleur',
    name: 'Rat Colleur',
    image: 'images/monsters/Rat_Colleur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2900, atk: 193, spd: 100, res: { neutre: 69, terre: 20, feu: 5, eau: -30, air: -10 } },
    moves: ['rajustement']
}

monsters.devhorreur = {
    id: 'devhorreur',
    name: 'Dévhorreur',
    image: 'images/monsters/Dévhorreur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2900, atk: 63, spd: 100, res: { neutre: -7, terre: 12, feu: 6, eau: 11, air: 4 } },
    moves: ['terreur', 'malheur', 'torpeur']
}

monsters.akakwa = {
    id: 'akakwa',
    name: 'Akakwa',
    image: 'images/monsters/Akakwa.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2900, atk: 368, spd: 100, res: { neutre: 20, terre: 20, feu: 10, eau: 5, air: -15 } },
    moves: ['kwapoeira', 'akabond']
}

monsters.kwamourai = {
    id: 'kwamourai',
    name: 'Kwamouraï',
    image: 'images/monsters/Kwamouraï.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 2900, atk: 368, spd: 100, res: { neutre: 15, terre: 15, feu: 10, eau: 5, air: -15 } },
    moves: ['aikomu_tuyu', 'katanardent']
}

monsters.percepteur = {
    id: 'percepteur',
    name: 'Percepteur',
    image: 'images/monsters/Percepteur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3000, atk: 600, spd: 100, res: { neutre: 24, terre: 24, feu: 24, eau: 24, air: 24 } },
    moves: ['labour', 'monnaie_trebuchante', 'rente', 'ferrage', 'douane', 'gabelle', 'deficit', 'ruade', 'liquidation', 'abreuvoir', 'cotisation', 'rodeo', 'levee_de_fonds', 'saut_d_obstacle', 'redevance', 'prelevement', 'sagittarius', 'dommages_et_interets', 'courroux_de_menalt', 'illeres', 'chancellerie', 'surtaxe', 'faillite', 'malversation', 'affranchissement', 'exoneration', 'bride', 'licol', 'lasso', 'recit_hippique', 'eperon', 'trot', 'galop', 'trop_percu', 'subvention', 'fin_de_l_abondance', 'maitre_etalon', 'pur_sang', 'gros_fiacre', 'endurance_de_centoror']
}

monsters.krokille_fragile = {
    id: 'krokille_fragile',
    name: 'Krokille fragile',
    image: 'images/monsters/Krokille_fragile.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3000, atk: 450, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['volte', 'eruption_vulkaine']
}

monsters.rat_fraichi = {
    id: 'rat_fraichi',
    name: 'Rat Fraîchi',
    image: 'images/monsters/Rat_Fraîchi.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3000, atk: 473, spd: 100, res: { neutre: 20, terre: 69, feu: -10, eau: 5, air: -30 } },
    moves: ['radical', 'raclette']
}

monsters.boubourse = {
    id: 'boubourse',
    name: 'Boubourse',
    image: 'images/monsters/Boubourse.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3000, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.peluche_tofu = {
    id: 'peluche_tofu',
    name: 'Peluche tofu',
    image: 'images/monsters/Peluche_tofu.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3000, atk: 50, spd: 100, res: { neutre: -30, terre: 10, feu: 10, eau: 10, air: 30 } },
    moves: ['entorse', 'pique_couic']
}

monsters.doublure = {
    id: 'doublure',
    name: 'Doublure',
    image: 'images/monsters/Doublure.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3000, atk: 650, spd: 100, res: { neutre: 6, terre: -24, feu: 21, eau: 11, air: 26 } },
    moves: ['doublage', 'coupe_circulaire', 'subtilite']
}

monsters.gliglicerin = {
    id: 'gliglicerin',
    name: 'Gliglicérin',
    image: 'images/monsters/Gliglicérin.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3000, atk: 350, spd: 100, res: { neutre: 5, terre: 11, feu: -25, eau: 1, air: 22 } },
    moves: ['attirance_du_gligli', 'fauchage_de_glands', 'raffut_bestial']
}

monsters.dragmatique = {
    id: 'dragmatique',
    name: 'Dragmatique',
    image: 'images/monsters/Dragmatique.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3000, atk: 390, spd: 100, res: { neutre: 17, terre: -7, feu: 24, eau: 15, air: -17 } },
    moves: ['lavomatik', 'magmorsure']
}

monsters.rat_caille = {
    id: 'rat_caille',
    name: 'Rat Caille',
    image: 'images/monsters/Rat_Caille.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3100, atk: 243, spd: 100, res: { neutre: 20, terre: -30, feu: -10, eau: 69, air: 5 } },
    moves: ['ramonage', 'rapidite', 'racket']
}

monsters.rat_botteur = {
    id: 'rat_botteur',
    name: 'Rat Botteur',
    image: 'images/monsters/Rat_Botteur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3100, atk: 138, spd: 100, res: { neutre: 20, terre: -10, feu: -30, eau: 5, air: 69 } },
    moves: ['rabotage', 'raffut']
}

monsters.poolay = {
    id: 'poolay',
    name: 'Poolay',
    image: 'images/monsters/Poolay.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3100, atk: 288, spd: 100, res: { neutre: 5, terre: 40, feu: 5, eau: -9, air: -40 } },
    moves: ['fureur_de_vivre', 'haleine_de_vers', 'poolay_frit']
}

monsters.fancrome = {
    id: 'fancrome',
    name: 'Fancrôme',
    image: 'images/monsters/Fancrôme.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3100, atk: 420, spd: 100, res: { neutre: 5, terre: -26, feu: 10, eau: 32, air: 14 } },
    moves: ['ancre_d_echine', 'ancre_harton', 'jet_d_ancre']
}

monsters.fantomalamere = {
    id: 'fantomalamere',
    name: 'Fantomalamère',
    image: 'images/monsters/Fantomalamère.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3100, atk: 420, spd: 100, res: { neutre: 21, terre: 33, feu: -28, eau: 10, air: 15 } },
    moves: ['boulay', 'bouhay', 'bertha']
}

monsters.vigie_pirate = {
    id: 'vigie_pirate',
    name: 'Vigie pirate',
    image: 'images/monsters/Vigie_pirate.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3100, atk: 420, spd: 100, res: { neutre: -22, terre: 18, feu: 40, eau: 22, air: 25 } },
    moves: ['roce', 'harde', 'herissage']
}

monsters.harpirate = {
    id: 'harpirate',
    name: 'Harpirate',
    image: 'images/monsters/Harpirate.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3100, atk: 420, spd: 100, res: { neutre: 31, terre: 15, feu: -26, eau: 12, air: 19 } },
    moves: ['hissage', 'hure', 'homiseur']
}

monsters.fantomat = {
    id: 'fantomat',
    name: 'Fantômat',
    image: 'images/monsters/Fantômat.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3100, atk: 420, spd: 100, res: { neutre: 15, terre: 10, feu: 12, eau: 32, air: -22 } },
    moves: ['cedoine', 'kake']
}

monsters.fantimonier = {
    id: 'fantimonier',
    name: 'Fantimonier',
    image: 'images/monsters/Fantimonier.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3100, atk: 420, spd: 100, res: { neutre: 13, terre: 21, feu: 15, eau: -28, air: 31 } },
    moves: ['barre_barre', 'barre_hikade', 'barre_botage']
}

monsters.pitraille = {
    id: 'pitraille',
    name: 'Pitraille',
    image: 'images/monsters/Pitraille.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3100, atk: 420, spd: 100, res: { neutre: 21, terre: -26, feu: 28, eau: 12, air: 34 } },
    moves: ['ch_boum', 'ch_bang']
}

monsters.phorreveur = {
    id: 'phorreveur',
    name: 'Phorrêveur',
    image: 'images/monsters/Phorrêveur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3100, atk: 460, spd: 100, res: { neutre: -19, terre: 21, feu: -14, eau: 11, air: 26 } },
    moves: ['flaqueduc', 'onde_repulsive', 'appel_a_l_aide']
}

monsters.metaphorreur = {
    id: 'metaphorreur',
    name: 'Métaphorreur',
    image: 'images/monsters/Métaphorreur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3100, atk: 460, spd: 100, res: { neutre: 21, terre: -14, feu: 11, eau: 26, air: -19 } },
    moves: ['dispersion', 'fracturgescence', 'phormol']
}

monsters.pere_phorreur = {
    id: 'pere_phorreur',
    name: 'Père Phorreur',
    image: 'images/monsters/Père_Phorreur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3100, atk: 460, spd: 100, res: { neutre: -14, terre: 11, feu: 26, eau: -19, air: 21 } },
    moves: ['tunnellipse', 'perphorrage']
}

monsters.phozami = {
    id: 'phozami',
    name: 'Phozami',
    image: 'images/monsters/Phozami.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3100, atk: 460, spd: 100, res: { neutre: 11, terre: 26, feu: -19, eau: 21, air: -14 } },
    moves: ['phorrage', 'defense']
}

monsters.mere_veilleuse = {
    id: 'mere_veilleuse',
    name: 'Mère Veilleuse',
    image: 'images/monsters/Mère_Veilleuse.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3100, atk: 460, spd: 100, res: { neutre: 26, terre: -19, feu: 21, eau: -14, air: 11 } },
    moves: ['ephort_de_guerre']
}

monsters.fangshu = {
    id: 'fangshu',
    name: 'Fangshu',
    image: 'images/monsters/Fangshu.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3100, atk: 400, spd: 100, res: { neutre: -20, terre: 15, feu: 20, eau: -10, air: 25 } },
    moves: ['altocumulus', 'raijin_yari', 'shinatobe']
}

monsters.assaishin = {
    id: 'assaishin',
    name: 'Assaïshin',
    image: 'images/monsters/Assaïshin.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3100, atk: 630, spd: 100, res: { neutre: 20, terre: -5, feu: -10, eau: 15, air: -20 } },
    moves: ['sai_sai_sai_sai']
}

monsters.malepik = {
    id: 'malepik',
    name: 'Malépik',
    image: 'images/monsters/Malépik.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3100, atk: 432, spd: 100, res: { neutre: 0, terre: -8, feu: 21, eau: -7, air: 4 } },
    moves: ['malagile', 'maltitude', 'malibi']
}

monsters.abrakne_sombre_irascible = {
    id: 'abrakne_sombre_irascible',
    name: 'Abrakne Sombre Irascible',
    image: 'images/monsters/Abrakne_Sombre_Irascible.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3200, atk: 300, spd: 100, res: { neutre: 16, terre: -24, feu: 24, eau: -17, air: 12 } },
    moves: ['Motivation_Sylvestre', 'Bond_affaiblissant', 'Abraknettoyage']
}

monsters.bitouf_aerien = {
    id: 'bitouf_aerien',
    name: 'Bitouf Aérien',
    image: 'images/monsters/Bitouf_Aérien.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3200, atk: 330, spd: 100, res: { neutre: -17, terre: -35, feu: -15, eau: -6, air: 27 } },
    moves: ['envolupte', 'tornade_pernicieuse', 'aeroportage']
}

monsters.emeraude = {
    id: 'emeraude',
    name: 'Émeraude',
    image: 'images/monsters/Émeraude.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3200, atk: 100, spd: 100, res: { neutre: 98, terre: -15, feu: -15, eau: -15, air: 98 } },
    moves: ['transposition_amicale', 'transposition_destructrice', 'bouh_m_rang_emeraude', 'tripotee']
}

monsters.saphira = {
    id: 'saphira',
    name: 'Saphira',
    image: 'images/monsters/Saphira.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3200, atk: 118, spd: 100, res: { neutre: 98, terre: -15, feu: -15, eau: 98, air: -15 } },
    moves: ['bouh_m_rang_saphir', 'camouflage_saphiresque']
}

monsters.rubise = {
    id: 'rubise',
    name: 'Rubise',
    image: 'images/monsters/Rubise.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3200, atk: 100, spd: 100, res: { neutre: 98, terre: -15, feu: 98, eau: -15, air: -15 } },
    moves: ['bouh_m_rang_rubis', 'invocation_de_totem_motivant', 'invocation_de_totem_explosif', 'bottage_de_fesses', 'invocation_de_totem_soignant', 'totemisation', 'bond_rubisant']
}

monsters.diamantine = {
    id: 'diamantine',
    name: 'Diamantine',
    image: 'images/monsters/Diamantine.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3200, atk: 59, spd: 100, res: { neutre: 98, terre: 98, feu: -15, eau: -15, air: -15 } },
    moves: ['lourdeur', 'bouh_m_rang_diamant', 'invocation_de_poupee_mortelle', 'bond_etincelant']
}

monsters.meupette = {
    id: 'meupette',
    name: 'Meupette',
    image: 'images/monsters/Meupette.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3200, atk: 220, spd: 100, res: { neutre: 13, terre: -11, feu: 30, eau: -25, air: 5 } },
    moves: ['meurtrissure', 'protection_feuillue']
}

monsters.maltrio = {
    id: 'maltrio',
    name: 'Maltrio',
    image: 'images/monsters/Maltrio.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3300, atk: 432, spd: 100, res: { neutre: 2, terre: 14, feu: 7, eau: -2, air: -11 } },
    moves: ['malteration', 'maleze']
}

monsters.malbois = {
    id: 'malbois',
    name: 'Malbois',
    image: 'images/monsters/Malbois.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3300, atk: 432, spd: 100, res: { neutre: -17, terre: 12, feu: 31, eau: -9, air: -7 } },
    moves: ['piege_malechant', 'glyphe_malterant', 'malchimie']
}

monsters.toubibz = {
    id: 'toubibz',
    name: 'Toubibz',
    image: 'images/monsters/Toubibz.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3300, atk: 502, spd: 100, res: { neutre: 6, terre: -9, feu: -3, eau: -4, air: 10 } },
    moves: ['gueriz_uf', 'tornabz', 'evabzion']
}

monsters.krokille_venerable_insipide = {
    id: 'krokille_venerable_insipide',
    name: 'Krokille Vénérable Insipide',
    image: 'images/monsters/Krokille_Vénérable_Insipide.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3400, atk: 119, spd: 100, res: { neutre: 70, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.krokille_venerable_boueuse = {
    id: 'krokille_venerable_boueuse',
    name: 'Krokille Vénérable Boueuse',
    image: 'images/monsters/Krokille_Vénérable_Boueuse.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3400, atk: 119, spd: 100, res: { neutre: 0, terre: 70, feu: 0, eau: 0, air: -15 } },
    moves: []
}

monsters.krokille_venerable_incandescente = {
    id: 'krokille_venerable_incandescente',
    name: 'Krokille Vénérable Incandescente',
    image: 'images/monsters/Krokille_Vénérable_Incandescente.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3400, atk: 119, spd: 100, res: { neutre: 0, terre: 0, feu: 70, eau: -15, air: 0 } },
    moves: []
}

monsters.krokille_venerable_humide = {
    id: 'krokille_venerable_humide',
    name: 'Krokille Vénérable Humide',
    image: 'images/monsters/Krokille_Vénérable_Humide.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3400, atk: 119, spd: 100, res: { neutre: 0, terre: 0, feu: -15, eau: 70, air: 0 } },
    moves: []
}

monsters.krokille_venerable_seche = {
    id: 'krokille_venerable_seche',
    name: 'Krokille Vénérable Sèche',
    image: 'images/monsters/Krokille_Vénérable_Sèche.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3400, atk: 119, spd: 100, res: { neutre: 0, terre: -15, feu: 0, eau: 0, air: 70 } },
    moves: []
}

monsters.dragodinde_de_nowel_fougueuse = {
    id: 'dragodinde_de_nowel_fougueuse',
    name: 'Dragodinde de Nowel fougueuse',
    image: 'images/monsters/Dragodinde_de_Nowel.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3400, atk: 534, spd: 100, res: { neutre: 49, terre: 14, feu: 14, eau: 49, air: 14 } },
    moves: []
}

monsters.chef_glutin_tapageur = {
    id: 'chef_glutin_tapageur',
    name: 'Chef Glutin Tapageur',
    image: 'images/monsters/Chef_Glutin_Tapageur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3400, atk: 625, spd: 100, res: { neutre: 12, terre: -14, feu: -14, eau: 4, air: 4 } },
    moves: []
}

monsters.hamrack = {
    id: 'hamrack',
    name: 'Hamrack',
    image: 'images/monsters/Hamrack.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3400, atk: 600, spd: 100, res: { neutre: 20, terre: 12, feu: 13, eau: 16, air: 22 } },
    moves: ['gouverne_ail']
}

monsters.felygiene = {
    id: 'felygiene',
    name: 'Félygiène',
    image: 'images/monsters/Félygiène.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3400, atk: 460, spd: 100, res: { neutre: 6, terre: -24, feu: 21, eau: 6, air: 16 } },
    moves: ['griffhanger', 'griffes_aveuglantes', 'hygiene_douteuse']
}

monsters.panthegros = {
    id: 'panthegros',
    name: 'Panthègros',
    image: 'images/monsters/Panthègros.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3400, atk: 460, spd: 100, res: { neutre: 26, terre: 26, feu: 1, eau: 6, air: -19 } },
    moves: ['gros_boulet', 'boulet_sauteur', 'choc_electrique']
}

monsters.lichangoro = {
    id: 'lichangoro',
    name: 'Lichangoro',
    image: 'images/monsters/Lichangoro.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3400, atk: 400, spd: 100, res: { neutre: 25, terre: -20, feu: 10, eau: 15, air: 0 } },
    moves: ['fujin_tsuinburedo', 'moussang']
}

monsters.betto = {
    id: 'betto',
    name: 'Betto',
    image: 'images/monsters/Betto.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3400, atk: 368, spd: 100, res: { neutre: -5, terre: -5, feu: -15, eau: 30, air: 10 } },
    moves: ['pioche_concombre', 'komatomi']
}

monsters.abrakleur_clair = {
    id: 'abrakleur_clair',
    name: 'Abrakleur Clair',
    image: 'images/monsters/Abrakleur_Clair.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3500, atk: 480, spd: 100, res: { neutre: 5, terre: 35, feu: -5, eau: 1, air: -43 } },
    moves: ['radicule', 'radicelle', 'pedoncule_perfide']
}

monsters.kaskargo = {
    id: 'kaskargo',
    name: 'Kaskargo',
    image: 'images/monsters/Kaskargo.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3500, atk: 300, spd: 100, res: { neutre: 1, terre: 15, feu: -33, eau: 25, air: 5 } },
    moves: ['bave', 'cooperation_baveuse', 'mucus']
}

monsters.crapeur = {
    id: 'crapeur',
    name: 'Crapeur',
    image: 'images/monsters/Crapeur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3500, atk: 460, spd: 100, res: { neutre: 16, terre: 28, feu: 19, eau: -28, air: 14 } },
    moves: ['crapoute', 'crapitulation', 'crapture']
}

monsters.atomystique = {
    id: 'atomystique',
    name: 'Atomystique',
    image: 'images/monsters/Atomystique.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3500, atk: 460, spd: 100, res: { neutre: 12, terre: 20, feu: 35, eau: 19, air: -30 } },
    moves: ['prothon', 'daimocritique', 'neuthron']
}

monsters.mofette = {
    id: 'mofette',
    name: 'Mofette',
    image: 'images/monsters/Mofette.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3500, atk: 460, spd: 100, res: { neutre: -29, terre: 17, feu: 10, eau: 9, air: 31 } },
    moves: ['duslipe', 'depere']
}

monsters.fumrirolle = {
    id: 'fumrirolle',
    name: 'Fumrirolle',
    image: 'images/monsters/Fumrirolle.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3500, atk: 460, spd: 100, res: { neutre: 15, terre: 37, feu: 25, eau: -41, air: 23 } },
    moves: ['fumisterie', 'fumigene', 'fumoir']
}

monsters.solfatare = {
    id: 'solfatare',
    name: 'Solfataré',
    image: 'images/monsters/Solfataré.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3500, atk: 460, spd: 100, res: { neutre: 10, terre: 15, feu: -24, eau: 20, air: 29 } },
    moves: ['soufre_hance', 'soufre_latte']
}

monsters.kanihilan = {
    id: 'kanihilan',
    name: 'Kanihilan',
    image: 'images/monsters/Kanihilan.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3500, atk: 460, spd: 100, res: { neutre: 46, terre: -9, feu: 6, eau: 11, air: -14 } },
    moves: ['coup_d_epaule', 'casse_caillou', 'grrr']
}

monsters.alhyene = {
    id: 'alhyene',
    name: 'Alhyène',
    image: 'images/monsters/Alhyène.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3500, atk: 460, spd: 100, res: { neutre: 21, terre: 11, feu: -9, eau: -4, air: 11 } },
    moves: ['vent_discordant', 'invocation_de_flammes']
}

monsters.kaniblou = {
    id: 'kaniblou',
    name: 'Kaniblou',
    image: 'images/monsters/Kaniblou.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3500, atk: 460, spd: 100, res: { neutre: -24, terre: 16, feu: -19, eau: 26, air: 21 } },
    moves: ['lance_enflammee', 'griffes_enflammees', 'kaniblouse']
}

monsters.orfelin = {
    id: 'orfelin',
    name: 'Orfélin',
    image: 'images/monsters/Orfélin.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3500, atk: 460, spd: 100, res: { neutre: 6, terre: 11, feu: 26, eau: -19, air: 16 } },
    moves: ['toupie', 'tranchlame', 'boubou']
}

monsters.chasquatch = {
    id: 'chasquatch',
    name: 'Chasquatch',
    image: 'images/monsters/Chasquatch.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3500, atk: 460, spd: 100, res: { neutre: 18, terre: 11, feu: 24, eau: -19, air: 6 } },
    moves: ['lechouille', 'calin_felin']
}

monsters.chacrebleu = {
    id: 'chacrebleu',
    name: 'Chacrebleu',
    image: 'images/monsters/Chacrebleu.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3500, atk: 460, spd: 100, res: { neutre: 12, terre: 20, feu: -14, eau: 8, air: 14 } },
    moves: ['chamboulement', 'fortifichation', 'retour_de_chachaton']
}

monsters.chakichan = {
    id: 'chakichan',
    name: 'Chakichan',
    image: 'images/monsters/Chakichan.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3500, atk: 460, spd: 100, res: { neutre: -18, terre: 26, feu: 0, eau: 20, air: 16 } },
    moves: ['griffe_a_un_pouce', 'mawatougeri']
}

monsters.chargus = {
    id: 'chargus',
    name: 'Chargus',
    image: 'images/monsters/Chargus.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3500, atk: 460, spd: 100, res: { neutre: 17, terre: 12, feu: 10, eau: 20, air: -19 } },
    moves: ['vieillissement_premature', 'duplichation', 'queue_de_poing']
}

monsters.chakaroze = {
    id: 'chakaroze',
    name: 'Chakaroze',
    image: 'images/monsters/Chakaroze.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3500, atk: 460, spd: 100, res: { neutre: 24, terre: -22, feu: 18, eau: 12, air: 8 } },
    moves: ['griffure_ondulante', 'miaoulement', 'chatomisation']
}

monsters.tsukinochi = {
    id: 'tsukinochi',
    name: 'Tsukinochi',
    image: 'images/monsters/Tsukinochi.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3500, atk: 590, spd: 100, res: { neutre: 20, terre: 15, feu: -20, eau: -5, air: -10 } },
    moves: ['glaive_lunaire', 'tsukuyomi']
}

monsters.tambourai = {
    id: 'tambourai',
    name: 'Tambouraï',
    image: 'images/monsters/Tambouraï.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3500, atk: 590, spd: 100, res: { neutre: -15, terre: -20, feu: 10, eau: 5, air: 20 } },
    moves: ['fuhaku_tatsumaki', 'raiju_no_kiba', 'tambourbelier']
}

monsters.onabu_geisha = {
    id: 'onabu_geisha',
    name: 'Onabu-Geisha',
    image: 'images/monsters/Onabu-Geisha.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3500, atk: 590, spd: 100, res: { neutre: 5, terre: -15, feu: -20, eau: 20, air: 10 } },
    moves: ['kiri_shigure', 'usugasumi_senbonzakura', 'ranga_cho']
}

monsters.jiangshi_nobi = {
    id: 'jiangshi_nobi',
    name: 'Jiangshi-Nobi',
    image: 'images/monsters/Jiangshi-Nobi.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3500, atk: 590, spd: 100, res: { neutre: 5, terre: 20, feu: -15, eau: 10, air: -20 } },
    moves: ['griffes_de_la_nuit', 'poing_momifie', 'manie_la_maudite_momie']
}

monsters.kabushido = {
    id: 'kabushido',
    name: 'Kabushido',
    image: 'images/monsters/Kabushido.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3500, atk: 590, spd: 100, res: { neutre: 10, terre: 5, feu: 20, eau: -30, air: -5 } },
    moves: ['hiryu_kaen', 'sanjuroku_pondo_ho', 'shishi_sonson']
}

monsters.kamikabz = {
    id: 'kamikabz',
    name: 'Kamikabz',
    image: 'images/monsters/Kamikabz.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3500, atk: 502, spd: 100, res: { neutre: 5, terre: 9, feu: -2, eau: -2, air: -10 } },
    moves: ['frakaz_uf', 'aspibz', 'bzimpact']
}

monsters.gliglidoudur = {
    id: 'gliglidoudur',
    name: 'Gliglidoudur',
    image: 'images/monsters/Gliglidoudur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3600, atk: 333, spd: 100, res: { neutre: -11, terre: 30, feu: -9, eau: 26, air: 11 } },
    moves: ['charge_emotive', 'contraction', 'rejet']
}

monsters.uchiwang = {
    id: 'uchiwang',
    name: 'Uchiwang',
    image: 'images/monsters/Uchiwang.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3600, atk: 400, spd: 100, res: { neutre: -10, terre: 20, feu: -20, eau: 10, air: 25 } },
    moves: ['toppu', 'futon', 'etreinte_du_vent']
}

monsters.darkli_moon = {
    id: 'darkli_moon',
    name: 'Darkli Moon',
    image: 'images/monsters/Darkli_Moon.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3700, atk: 300, spd: 100, res: { neutre: 10, terre: 20, feu: 10, eau: -15, air: 10 } },
    moves: ['obscure_singerie']
}

monsters.branche_invocatrice = {
    id: 'branche_invocatrice',
    name: 'Branche Invocatrice',
    image: 'images/monsters/Branche_Invocatrice.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3800, atk: 380, spd: 100, res: { neutre: 42, terre: -20, feu: 42, eau: 42, air: -20 } },
    moves: ['motivation_naturelle']
}

monsters.branche_soignante = {
    id: 'branche_soignante',
    name: 'Branche Soignante',
    image: 'images/monsters/Branche_Soignante.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3800, atk: 380, spd: 100, res: { neutre: 42, terre: 42, feu: -20, eau: -20, air: 42 } },
    moves: ['graine_vitalisante']
}

monsters.pougnette = {
    id: 'pougnette',
    name: 'Pougnette',
    image: 'images/monsters/Pougnette.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3800, atk: 300, spd: 100, res: { neutre: 25, terre: 17, feu: 10, eau: 9, air: -29 } },
    moves: ['pikette']
}

monsters.malalfa = {
    id: 'malalfa',
    name: 'Malalfa',
    image: 'images/monsters/Malalfa.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3800, atk: 432, spd: 100, res: { neutre: -28, terre: 5, feu: 6, eau: 21, air: 6 } },
    moves: ['maleluia', 'malarmiste', 'malcooliser']
}

monsters.glutin_malfaisant = {
    id: 'glutin_malfaisant',
    name: 'Glutin malfaisant',
    image: 'images/monsters/Glutin_malfaisant.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3900, atk: 825, spd: 100, res: { neutre: 9, terre: 9, feu: 9, eau: 9, air: 9 } },
    moves: []
}

monsters.yokai_givrefoux = {
    id: 'yokai_givrefoux',
    name: 'Yokaï Givrefoux',
    image: 'images/monsters/Yokaï_Givrefoux.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3900, atk: 500, spd: 100, res: { neutre: 12, terre: 10, feu: -40, eau: 61, air: 13 } },
    moves: ['fourre_tout', 'foutaise']
}

monsters.maho_givrefoux = {
    id: 'maho_givrefoux',
    name: 'Maho Givrefoux',
    image: 'images/monsters/Maho_Givrefoux.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3900, atk: 500, spd: 100, res: { neutre: 12, terre: 60, feu: 5, eau: 15, air: -44 } },
    moves: ['fourrage', 'fourapin']
}

monsters.soryo_givrefoux = {
    id: 'soryo_givrefoux',
    name: 'Soryo Givrefoux',
    image: 'images/monsters/Soryo_Givrefoux.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3900, atk: 500, spd: 100, res: { neutre: 10, terre: -40, feu: 15, eau: 20, air: 52 } },
    moves: ['fouraille', 'fourbissage']
}

monsters.yomi_givrefoux = {
    id: 'yomi_givrefoux',
    name: 'Yomi Givrefoux',
    image: 'images/monsters/Yomi_Givrefoux.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3900, atk: 500, spd: 100, res: { neutre: 20, terre: 5, feu: 55, eau: -35, air: 18 } },
    moves: ['fouguefoux', 'fouille']
}

monsters.kami_givrefoux = {
    id: 'kami_givrefoux',
    name: 'Kami Givrefoux',
    image: 'images/monsters/Kami_Givrefoux.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3900, atk: 500, spd: 100, res: { neutre: 60, terre: -50, feu: 22, eau: 15, air: 23 } },
    moves: ['foulette', 'foux_de_la_fortune', 'foux_ou_rien']
}

monsters.trezz = {
    id: 'trezz',
    name: 'Trezz',
    image: 'images/monsters/Trezz.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3900, atk: 500, spd: 100, res: { neutre: 11, terre: 22, feu: 2, eau: -20, air: 25 } },
    moves: ['rayons_entravants', 'rebond_manque']
}

monsters.vindeux = {
    id: 'vindeux',
    name: 'Vindeux',
    image: 'images/monsters/Vindeux.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3900, atk: 500, spd: 100, res: { neutre: 22, terre: 2, feu: -20, eau: 25, air: 11 } },
    moves: ['massurance', 'mecontentement']
}

monsters.trantroa = {
    id: 'trantroa',
    name: 'Trantroa',
    image: 'images/monsters/Trantroa.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3900, atk: 500, spd: 100, res: { neutre: 2, terre: -20, feu: 25, eau: 11, air: 22 } },
    moves: ['brute_haleine', 'poing_terne']
}

monsters.seith = {
    id: 'seith',
    name: 'Seith',
    image: 'images/monsters/Seith.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3900, atk: 500, spd: 100, res: { neutre: -20, terre: 25, feu: 11, eau: 22, air: 2 } },
    moves: ['tourbete', 'massue']
}

monsters.soissanth = {
    id: 'soissanth',
    name: 'Soissanth',
    image: 'images/monsters/Soissanth.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3900, atk: 500, spd: 100, res: { neutre: 25, terre: 11, feu: 22, eau: 2, air: -20 } },
    moves: ['poinzon', 'taplaudissement']
}

monsters.piktenia = {
    id: 'piktenia',
    name: 'Pikténia',
    image: 'images/monsters/Pikténia.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3900, atk: 648, spd: 100, res: { neutre: -14, terre: 0, feu: 46, eau: 16, air: -19 } },
    moves: ['gyroskopik', 'pik_a_saut']
}

monsters.tremorse = {
    id: 'tremorse',
    name: 'Trémorse',
    image: 'images/monsters/Trémorse.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3900, atk: 648, spd: 100, res: { neutre: 26, terre: 1, feu: -24, eau: 6, air: 16 } },
    moves: ['coups_de_langues', 'avalement', 'crachat_amer']
}

monsters.masticroc = {
    id: 'masticroc',
    name: 'Masticroc',
    image: 'images/monsters/Masticroc.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3900, atk: 648, spd: 100, res: { neutre: 16, terre: 16, feu: 11, eau: -24, air: 6 } },
    moves: ['ensablage', 'surgissement', 'gueule_des_sables']
}

monsters.morsquale = {
    id: 'morsquale',
    name: 'Morsquale',
    image: 'images/monsters/Morsquale.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3900, atk: 648, spd: 100, res: { neutre: 6, terre: 6, feu: 0, eau: 31, air: -14 } },
    moves: ['charge_croquante', 'sable_tourbillonnant', 'pattes_harassent']
}

monsters.cycloporth = {
    id: 'cycloporth',
    name: 'Cycloporth',
    image: 'images/monsters/Cycloporth.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3900, atk: 648, spd: 100, res: { neutre: -9, terre: 21, feu: 21, eau: 21, air: 21 } },
    moves: ['cephalonde', 'volvation', 'aspiration_gourmande']
}

monsters.bras_demoniaque = {
    id: 'bras_demoniaque',
    name: 'Bras démoniaque',
    image: 'images/monsters/Bras_démoniaque.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3900, atk: 720, spd: 100, res: { neutre: 25, terre: 25, feu: 25, eau: 25, air: 25 } },
    moves: ['rhizome_demoniaque', 'aplatissement_demoniaque', 'revers_demoniaque']
}

monsters.quadrabz = {
    id: 'quadrabz',
    name: 'Quadrabz',
    image: 'images/monsters/Quadrabz.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 3900, atk: 502, spd: 100, res: { neutre: 4, terre: 0, feu: -11, eau: 8, air: -1 } },
    moves: ['vaporiz_uf', 'akuabz', 'bzeklabouss']
}

monsters.mominotor = {
    id: 'mominotor',
    name: 'Mominotor',
    image: 'images/monsters/Mominotor.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4000, atk: 125, spd: 100, res: { neutre: 30, terre: 10, feu: 30, eau: 30, air: -13 } },
    moves: ['kanope', 'malediction_du_mominotor', 'embaumement', 'lancer_de_degelee']
}

monsters.deminoboule = {
    id: 'deminoboule',
    name: 'Déminoboule',
    image: 'images/monsters/Déminoboule.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4000, atk: 138, spd: 100, res: { neutre: 30, terre: 30, feu: -13, eau: -13, air: 30 } },
    moves: ['souffle_etourdissant', 'coup_de_boulet', 'minorage', 'souffle_liberatoire']
}

monsters.tipoune = {
    id: 'tipoune',
    name: 'Tipoune',
    image: 'images/monsters/Tipoune.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4000, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.tipoude = {
    id: 'tipoude',
    name: 'Tipoude',
    image: 'images/monsters/Tipoude.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4000, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.tipoutre = {
    id: 'tipoutre',
    name: 'Tipoutre',
    image: 'images/monsters/Tipoutre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4000, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.capsaaloocke = {
    id: 'capsaaloocke',
    name: 'Capsaaloocke',
    image: 'images/monsters/Capsaaloocke.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4200, atk: 440, spd: 100, res: { neutre: 5, terre: 15, feu: 15, eau: 0, air: 20 } },
    moves: ['lancenglante', 'saut_du_bison', 'eclaireurs']
}

monsters.serpyn = {
    id: 'serpyn',
    name: 'Serpyn',
    image: 'images/monsters/Serpyn.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4200, atk: 566, spd: 100, res: { neutre: 32, terre: -27, feu: 7, eau: 9, air: -21 } },
    moves: ['nimpitoyable', 'nincendie', 'ninstabilite']
}

monsters.champ_a_gnons = {
    id: 'champ_a_gnons',
    name: 'Champ à Gnons',
    image: 'images/monsters/Champ_à_Gnons.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4300, atk: 688, spd: 100, res: { neutre: 37, terre: -37, feu: 11, eau: 6, air: 13 } },
    moves: ['fesse_de_loup', 'invasion_fongique', 'acceleration_fongique']
}

monsters.cadob = {
    id: 'cadob',
    name: 'Cadob\'',
    image: 'images/monsters/Cadob_.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4300, atk: 534, spd: 100, res: { neutre: 10, terre: 10, feu: -20, eau: 30, air: 10 } },
    moves: ['invocation_de_cadob', 'surprise_drainante', 'surprise_empoisonnante']
}

monsters.bwork_elemental_de_feu = {
    id: 'bwork_elemental_de_feu',
    name: 'Bwork Élémental de Feu',
    image: 'images/monsters/Bwork_Élémental_de_Feu.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4300, atk: 688, spd: 100, res: { neutre: 21, terre: 11, feu: 100, eau: -19, air: 6 } },
    moves: ['sollicitude_elementaire_fumeuse', 'communion_elementaire', 'poussiere_temporelle_bwork']
}

monsters.bwork_elemental_d_eau = {
    id: 'bwork_elemental_d_eau',
    name: 'Bwork Élémental d\'Eau',
    image: 'images/monsters/Bwork_Élémental_d_Eau.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4300, atk: 688, spd: 100, res: { neutre: 21, terre: 6, feu: -19, eau: 100, air: 11 } },
    moves: ['larme_bwork', 'sollicitude_elementaire_aqueuse']
}

monsters.bwork_elemental_d_air = {
    id: 'bwork_elemental_d_air',
    name: 'Bwork Élémental d\'Air',
    image: 'images/monsters/Bwork_Élémental_d_Air.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4300, atk: 688, spd: 100, res: { neutre: 21, terre: -19, feu: 6, eau: 11, air: 100 } },
    moves: ['epee_celeste_bwork', 'sollicitude_elementaire_venteuse']
}

monsters.bwork_elemental_de_terre = {
    id: 'bwork_elemental_de_terre',
    name: 'Bwork Élémental de Terre',
    image: 'images/monsters/Bwork_Élémental_de_Terre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4300, atk: 688, spd: 100, res: { neutre: 21, terre: 100, feu: 11, eau: 6, air: -19 } },
    moves: ['epee_du_bwork', 'sollicitude_elementaire_terreuse']
}

monsters.mama_bwork = {
    id: 'mama_bwork',
    name: 'Mama Bwork',
    image: 'images/monsters/Mama_Bwork.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4300, atk: 688, spd: 100, res: { neutre: 31, terre: -24, feu: 21, eau: 41, air: 16 } },
    moves: ['couperet']
}

monsters.peluche_wabbit = {
    id: 'peluche_wabbit',
    name: 'Peluche wabbit',
    image: 'images/monsters/Peluche_wabbit.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4300, atk: 100, spd: 100, res: { neutre: 10, terre: 10, feu: 30, eau: 10, air: -30 } },
    moves: ['rembourrage', 'malediction_de_la_cawotte', 'cawotte_de_nowel']
}

monsters.tromperelle = {
    id: 'tromperelle',
    name: 'Tromperelle',
    image: 'images/monsters/Tromperelle.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4300, atk: 688, spd: 100, res: { neutre: 11, terre: 13, feu: 6, eau: 37, air: -37 } },
    moves: ['volve_paralysante', 'soufflette_sporadique', 'thalle_neutralisant']
}

monsters.champaknyde = {
    id: 'champaknyde',
    name: 'Champaknyde',
    image: 'images/monsters/Champaknyde.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4300, atk: 688, spd: 100, res: { neutre: 13, terre: 37, feu: 11, eau: -37, air: 6 } },
    moves: ['graphiose', 'fong_ku', 'mycose_toujours']
}

monsters.champodonte = {
    id: 'champodonte',
    name: 'Champodonte',
    image: 'images/monsters/Champodonte.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4300, atk: 688, spd: 100, res: { neutre: -37, terre: 6, feu: 13, eau: 11, air: 37 } },
    moves: ['mildiou', 'amanite_roglicerine', 'cepe_harti']
}

monsters.champmane = {
    id: 'champmane',
    name: 'Champmane',
    image: 'images/monsters/Champmane.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4300, atk: 688, spd: 100, res: { neutre: 37, terre: 13, feu: -37, eau: 6, air: 11 } },
    moves: ['sanction_fongique', 'soin_fongique', 'protection_fongique']
}

monsters.champbis = {
    id: 'champbis',
    name: 'Champbis',
    image: 'images/monsters/Champbis.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4300, atk: 688, spd: 100, res: { neutre: -37, terre: 11, feu: 37, eau: 13, air: 6 } },
    moves: ['spore_de_combat', 'mikota', 'levure']
}

monsters.dramanite = {
    id: 'dramanite',
    name: 'Dramanite',
    image: 'images/monsters/Dramanite.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4300, atk: 500, spd: 100, res: { neutre: 65, terre: -46, feu: 10, eau: 5, air: 9 } },
    moves: ['spore_kepic', 'marasme', 'spore_teille']
}

monsters.fistulor = {
    id: 'fistulor',
    name: 'Fistulor',
    image: 'images/monsters/Fistulor.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4300, atk: 500, spd: 100, res: { neutre: 21, terre: 10, feu: -37, eau: 47, air: 5 } },
    moves: ['cepe_tique', 'ami_celium', 'spore_heole']
}

monsters.fongeur = {
    id: 'fongeur',
    name: 'Fongeur',
    image: 'images/monsters/Fongeur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4300, atk: 500, spd: 100, res: { neutre: 5, terre: 10, feu: 58, eau: 21, air: -37 } },
    moves: ['spore_tafaux', 'volve_herine']
}

monsters.abrazif = {
    id: 'abrazif',
    name: 'Abrazif',
    image: 'images/monsters/Abrazif.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4300, atk: 500, spd: 100, res: { neutre: 3, terre: 64, feu: 20, eau: -41, air: 15 } },
    moves: ['spore_d_oeuvre', 'spore_celaine', 'spore_taporte']
}

monsters.motte = {
    id: 'motte',
    name: 'Motte',
    image: 'images/monsters/Motte.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4300, atk: 500, spd: 100, res: { neutre: 25, terre: -36, feu: 12, eau: 55, air: 6 } },
    moves: ['hokulteur', 'hivation', 'husse']
}

monsters.merulette = {
    id: 'merulette',
    name: 'Mérulette',
    image: 'images/monsters/Mérulette.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4300, atk: 500, spd: 100, res: { neutre: 6, terre: 5, feu: -55, eau: 13, air: 30 } },
    moves: ['merule_tihme', 'merule_saire']
}

monsters.scoliopode = {
    id: 'scoliopode',
    name: 'Scoliopode',
    image: 'images/monsters/Scoliopode.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4300, atk: 550, spd: 100, res: { neutre: 31, terre: 0, feu: 21, eau: 11, air: -29 } },
    moves: ['coup_percutant', 'salivraison']
}

monsters.puceronde = {
    id: 'puceronde',
    name: 'Puceronde',
    image: 'images/monsters/Puceronde.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4300, atk: 550, spd: 100, res: { neutre: -29, terre: 31, feu: 0, eau: 21, air: 11 } },
    moves: ['langagement', 'brazero', 'largage_personnel']
}

monsters.lucrane = {
    id: 'lucrane',
    name: 'Lucrane',
    image: 'images/monsters/Lucrane.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4300, atk: 550, spd: 100, res: { neutre: 21, terre: 11, feu: -29, eau: 31, air: 0 } },
    moves: ['offensiviere']
}

monsters.eperfide = {
    id: 'eperfide',
    name: 'Éperfide',
    image: 'images/monsters/Éperfide.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4300, atk: 550, spd: 100, res: { neutre: 0, terre: 21, feu: 11, eau: -29, air: 31 } },
    moves: ['etoile_d_arakne', 'brulurgence', 'drain']
}

monsters.morfrelon = {
    id: 'morfrelon',
    name: 'Morfrelon',
    image: 'images/monsters/Morfrelon.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4300, atk: 550, spd: 100, res: { neutre: 11, terre: -29, feu: 31, eau: 0, air: 21 } },
    moves: ['dardagnan', 'plongeon_quille']
}

monsters.bakazako = {
    id: 'bakazako',
    name: 'Bakazako',
    image: 'images/monsters/Bakazako.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4300, atk: 640, spd: 100, res: { neutre: -12, terre: 11, feu: 16, eau: 21, air: -18 } },
    moves: ['hogo', 'kaba', 'suimin_mahi', 'kazkou']
}

monsters.tsume_bozu = {
    id: 'tsume_bozu',
    name: 'Tsume-bozu',
    image: 'images/monsters/Tsume-bozu.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4300, atk: 640, spd: 100, res: { neutre: 13, terre: -12, feu: 22, eau: 11, air: -16 } },
    moves: ['slurp', 'yokaspiration', 'lourde_langue']
}

monsters.proto_noxine = {
    id: 'proto_noxine',
    name: 'Proto-Noxine',
    image: 'images/monsters/Proto-Noxine.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4400, atk: 800, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['bombe_mecanique']
}

monsters.craqueleur_des_glaces = {
    id: 'craqueleur_des_glaces',
    name: 'Craqueleur des glaces',
    image: 'images/monsters/Craqueleur_des_glaces.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4500, atk: 534, spd: 100, res: { neutre: 0, terre: 0, feu: -38, eau: 80, air: 50 } },
    moves: ['pic_de_glace', 'ecrasement_glacial', 'glace_paralysante']
}

monsters.boufronde = {
    id: 'boufronde',
    name: 'Boufronde',
    image: 'images/monsters/Boufronde.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4500, atk: 566, spd: 100, res: { neutre: 22, terre: 9, feu: -16, eau: -24, air: 9 } },
    moves: ['nimpuissance', 'nincarceration', 'ninsolence']
}

monsters.balebz = {
    id: 'balebz',
    name: 'Balebz',
    image: 'images/monsters/Balebz.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4500, atk: 502, spd: 100, res: { neutre: 7, terre: -4, feu: 11, eau: -8, air: -6 } },
    moves: ['exploz_uf', 'vampibombz', 'aegibz']
}

monsters.kwakao_surdose = {
    id: 'kwakao_surdose',
    name: 'Kwakao surdosé',
    image: 'images/monsters/Kwakao.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4600, atk: 600, spd: 100, res: { neutre: 18, terre: 23, feu: -5, eau: -1, air: 20 } },
    moves: []
}

monsters.sporakne = {
    id: 'sporakne',
    name: 'Sporakne',
    image: 'images/monsters/Sporakne.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4600, atk: 500, spd: 100, res: { neutre: -45, terre: 12, feu: 20, eau: 5, air: 45 } },
    moves: ['adehede']
}

monsters.gobus = {
    id: 'gobus',
    name: 'Gobus',
    image: 'images/monsters/Gobus.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4700, atk: 550, spd: 100, res: { neutre: 52, terre: 12, feu: 20, eau: 33, air: -9 } },
    moves: ['gobstruction', 'gobtimisation']
}

monsters.cybwork = {
    id: 'cybwork',
    name: 'Cybwork',
    image: 'images/monsters/Cybwork.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4700, atk: 688, spd: 100, res: { neutre: 36, terre: 41, feu: 6, eau: -14, air: 46 } },
    moves: ['pulsation', 'cybarmure']
}

monsters.abominable_yiti_des_neiges = {
    id: 'abominable_yiti_des_neiges',
    name: 'Abominable yiti des neiges',
    image: 'images/monsters/Abominable_yiti_des_neiges.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4700, atk: 534, spd: 100, res: { neutre: 20, terre: 15, feu: 15, eau: -15, air: -15 } },
    moves: ['assaisonnement', 'gueuleton', 'colere_du_yiti']
}

monsters.aperiglours = {
    id: 'aperiglours',
    name: 'Apériglours',
    image: 'images/monsters/Apériglours.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4700, atk: 550, spd: 100, res: { neutre: 5, terre: 17, feu: 70, eau: 10, air: -44 } },
    moves: ['miellat', 'nectar']
}

monsters.boulglours = {
    id: 'boulglours',
    name: 'Boulglours',
    image: 'images/monsters/Boulglours.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4700, atk: 550, spd: 100, res: { neutre: 18, terre: 64, feu: 11, eau: -33, air: 21 } },
    moves: ['fructose', 'glucause_perdue']
}

monsters.gloursaya = {
    id: 'gloursaya',
    name: 'Gloursaya',
    image: 'images/monsters/Gloursaya.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4700, atk: 550, spd: 100, res: { neutre: 12, terre: 20, feu: -30, eau: 7, air: 55 } },
    moves: ['butinage', 'trophallaxie', 'propolis']
}

monsters.blerauve = {
    id: 'blerauve',
    name: 'Blérauve',
    image: 'images/monsters/Blérauve.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4700, atk: 550, spd: 100, res: { neutre: 63, terre: -45, feu: 11, eau: 15, air: 20 } },
    moves: ['detente', 'biste', 'hanque']
}

monsters.wolvero = {
    id: 'wolvero',
    name: 'Wolvero',
    image: 'images/monsters/Wolvero.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4700, atk: 550, spd: 100, res: { neutre: 21, terre: 5, feu: -36, eau: 58, air: 13 } },
    moves: ['glouton', 'griffemort', 'mantium']
}

monsters.croleur = {
    id: 'croleur',
    name: 'Croleur',
    image: 'images/monsters/Croleur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4700, atk: 550, spd: 100, res: { neutre: -38, terre: 44, feu: 22, eau: 1, air: 6 } },
    moves: ['acrobatie', 'ombre', 'fugue']
}

monsters.gobosteur = {
    id: 'gobosteur',
    name: 'Gobosteur',
    image: 'images/monsters/Gobosteur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4700, atk: 550, spd: 100, res: { neutre: 5, terre: 35, feu: 10, eau: 12, air: -23 } },
    moves: ['piolaid', 'piochekour', 'piochetron']
}

monsters.sapeur = {
    id: 'sapeur',
    name: 'Sapeur',
    image: 'images/monsters/Sapeur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4700, atk: 550, spd: 100, res: { neutre: 10, terre: 21, feu: 32, eau: -30, air: 14 } },
    moves: ['lipopette', 'nicheuze']
}

monsters.ouilleur = {
    id: 'ouilleur',
    name: 'Ouilleur',
    image: 'images/monsters/Ouilleur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4700, atk: 550, spd: 100, res: { neutre: 15, terre: -24, feu: 5, eau: 31, air: 10 } },
    moves: ['daipe', 'shatte', 'krape']
}

monsters.marodeur = {
    id: 'marodeur',
    name: 'Marôdeur',
    image: 'images/monsters/Marôdeur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4700, atk: 550, spd: 100, res: { neutre: 24, terre: 15, feu: -30, eau: 18, air: 36 } },
    moves: []
}

monsters.perku = {
    id: 'perku',
    name: 'Perkü',
    image: 'images/monsters/Perkü.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4700, atk: 550, spd: 100, res: { neutre: -26, terre: 10, feu: 17, eau: 19, air: 35 } },
    moves: ['djatte', 'beni', 'lautte']
}

monsters.courtilieur = {
    id: 'courtilieur',
    name: 'Courtilieur',
    image: 'images/monsters/Courtilieur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4700, atk: 550, spd: 100, res: { neutre: 27, terre: 12, feu: 20, eau: 22, air: -15 } },
    moves: ['minage', 'detourage', 'chaupage']
}

monsters.fleuro = {
    id: 'fleuro',
    name: 'Fleuro',
    image: 'images/monsters/Fleuro.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4700, atk: 550, spd: 100, res: { neutre: 12, terre: 5, feu: 60, eau: -43, air: 15 } },
    moves: ['pyro', 'charbon']
}

monsters.blerice = {
    id: 'blerice',
    name: 'Blérice',
    image: 'images/monsters/Blérice.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4700, atk: 550, spd: 100, res: { neutre: 5, terre: 17, feu: 16, eau: 63, air: -41 } },
    moves: ['hydrokinesie', 'thermokinesie']
}

monsters.glourmand = {
    id: 'glourmand',
    name: 'Glourmand',
    image: 'images/monsters/Glourmand.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4700, atk: 550, spd: 100, res: { neutre: -46, terre: 5, feu: 15, eau: 45, air: 10 } },
    moves: ['glourmandale', 'glourmandise', 'gloursbi_boulga']
}

monsters.glouragan = {
    id: 'glouragan',
    name: 'Glouragan',
    image: 'images/monsters/Glouragan.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4700, atk: 550, spd: 100, res: { neutre: 20, terre: 7, feu: 10, eau: -39, air: 51 } },
    moves: ['gloursonde', 'glourdavu']
}

monsters.noctulule = {
    id: 'noctulule',
    name: 'Noctulule',
    image: 'images/monsters/Noctulule.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4700, atk: 400, spd: 100, res: { neutre: -23, terre: 21, feu: 1, eau: 16, air: 2 } },
    moves: ['timatum', 'bouligane']
}

monsters.panterreur = {
    id: 'panterreur',
    name: 'Panterreur',
    image: 'images/monsters/Panterreur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4700, atk: 400, spd: 100, res: { neutre: 2, terre: 1, feu: 16, eau: 21, air: -23 } },
    moves: ['planque', 'vent_d_etat', 'mesquinerie']
}

monsters.brutopak = {
    id: 'brutopak',
    name: 'Brutopak',
    image: 'images/monsters/Brutopak.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4700, atk: 400, spd: 100, res: { neutre: 1, terre: 16, feu: 2, eau: -23, air: 21 } },
    moves: ['brutalite', 'mesquin_pacte']
}

monsters.caznoar = {
    id: 'caznoar',
    name: 'Caznoar',
    image: 'images/monsters/Caznoar.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4700, atk: 400, spd: 100, res: { neutre: 16, terre: 21, feu: -23, eau: 2, air: 1 } },
    moves: ['detentrave', 'beclipse', 'aigriffure']
}

monsters.somblero = {
    id: 'somblero',
    name: 'Sombléro',
    image: 'images/monsters/Sombléro.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4700, atk: 400, spd: 100, res: { neutre: 1, terre: -23, feu: 21, eau: 16, air: 2 } },
    moves: ['vaguichage', 'faille']
}

monsters.viandargh = {
    id: 'viandargh',
    name: 'Viandargh',
    image: 'images/monsters/Viandargh.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4700, atk: 728, spd: 100, res: { neutre: 16, terre: 16, feu: 11, eau: 6, air: 6 } },
    moves: ['saute_de_viande', 'viande_hachee', 'appater']
}

monsters.chevrotine = {
    id: 'chevrotine',
    name: 'Chevrotine',
    image: 'images/monsters/Chevrotine.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4700, atk: 728, spd: 100, res: { neutre: 6, terre: -9, feu: 6, eau: 11, air: 16 } },
    moves: ['tir_au_juge', 'invocation_de_chienchien_courant', 'dressage']
}

monsters.brokouillon = {
    id: 'brokouillon',
    name: 'Brokouillon',
    image: 'images/monsters/Brokouillon.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4700, atk: 728, spd: 100, res: { neutre: 0, terre: 16, feu: 26, eau: -14, air: 31 } },
    moves: ['pandanois', 'pistage', 'hors_piste']
}

monsters.nemroz = {
    id: 'nemroz',
    name: 'Nemroz',
    image: 'images/monsters/Nemroz.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4700, atk: 728, spd: 100, res: { neutre: 1, terre: 0, feu: -9, eau: 11, air: 6 } },
    moves: ['trempe_jusqu_a_l_eau', 'piege_erosif', 'piege_eblouissant']
}

monsters.crambo = {
    id: 'crambo',
    name: 'Crâmbo',
    image: 'images/monsters/Crâmbo.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4700, atk: 728, spd: 100, res: { neutre: -9, terre: 11, feu: 0, eau: 21, air: -14 } },
    moves: ['premier_sang', 'lampe_bleue', 'uranus']
}

monsters.madura = {
    id: 'madura',
    name: 'Madura',
    image: 'images/monsters/Madura.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4700, atk: 640, spd: 100, res: { neutre: 13, terre: -16, feu: 18, eau: -10, air: 9 } },
    moves: ['negai', 'zudzuki_bozu', 'furue', 'negai_o_kanaeru']
}

monsters.kruorre_le_chafer_hai = {
    id: 'kruorre_le_chafer_hai',
    name: 'Kruorre le Chafer Haï',
    image: 'images/monsters/Kruorre_le_Chafer_Haï.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4800, atk: 900, spd: 100, res: { neutre: -10, terre: -5, feu: 15, eau: 5, air: 15 } },
    moves: ['chafouette', 'charnaque', 'invisibilite_alpha', 'coup_mortel_du_chafer']
}

monsters.germinion = {
    id: 'germinion',
    name: 'Germinion',
    image: 'images/monsters/Germinion.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4900, atk: 800, spd: 100, res: { neutre: -6, terre: 13, feu: -15, eau: 21, air: 16 } },
    moves: []
}

monsters.typhomet = {
    id: 'typhomet',
    name: 'Typhomet',
    image: 'images/monsters/Typhomet.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4900, atk: 640, spd: 100, res: { neutre: 16, terre: -21, feu: -15, eau: 9, air: 22 } },
    moves: ['faux_ouragan', 'regard_de_l_heretique', 'resistance_du_tartare']
}

monsters.marthos = {
    id: 'marthos',
    name: 'Marthos',
    image: 'images/monsters/Marthos.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4900, atk: 566, spd: 100, res: { neutre: 4, terre: -8, feu: 13, eau: -20, air: 11 } },
    moves: ['ninsipide', 'nimparable', 'ninstantane']
}

monsters.bebe_gyrafor = {
    id: 'bebe_gyrafor',
    name: 'Bébé Gyrafor',
    image: 'images/monsters/Bébé_Gyrafor.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4900, atk: 320, spd: 100, res: { neutre: 0, terre: -20, feu: 0, eau: -20, air: 0 } },
    moves: ['kilinmandjaro', 'cou_ragan', 'gyvoirien', 'kilin_tor']
}

monsters.bebe_lapilope = {
    id: 'bebe_lapilope',
    name: 'Bébé Lapilope',
    image: 'images/monsters/Bébé_Lapilope.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4900, atk: 320, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: -20, air: -20 } },
    moves: ['lapopotin', 'lagomorsure', 'koudulapin', 'rabitole']
}

monsters.bebe_brutapir = {
    id: 'bebe_brutapir',
    name: 'Bébé Brutapir',
    image: 'images/monsters/Bébé_Brutapir.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4900, atk: 320, spd: 100, res: { neutre: -20, terre: -20, feu: 0, eau: 0, air: 0 } },
    moves: ['tapirateur', 'tapirogue', 'tapirouge', 'tapiroulant']
}

monsters.bebe_gropotam = {
    id: 'bebe_gropotam',
    name: 'Bébé Gropotam',
    image: 'images/monsters/Bébé_Gropotam.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4900, atk: 320, spd: 100, res: { neutre: -20, terre: 0, feu: 0, eau: 0, air: -20 } },
    moves: ['barbotam', 'hajimeno_hippo', 'hippo_faringit', 'kornofulgur']
}

monsters.bebe_amphibouc = {
    id: 'bebe_amphibouc',
    name: 'Bébé Amphibouc',
    image: 'images/monsters/Bébé_Amphibouc.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 4900, atk: 320, spd: 100, res: { neutre: 0, terre: 0, feu: -20, eau: 0, air: -20 } },
    moves: ['crapaud_belier', 'batrattaque', 'perlambouc', 'cornebouc']
}

monsters.uf_de_la_mort = {
    id: 'uf_de_la_mort',
    name: 'Œuf de la Mort',
    image: 'images/monsters/Œuf_de_la_Mort.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5000, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.globilum = {
    id: 'globilum',
    name: 'Globilum',
    image: 'images/monsters/Globilum.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5000, atk: 600, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['projection_ombreuse']
}

monsters.mansocolat_surdose = {
    id: 'mansocolat_surdose',
    name: 'Mansocolat surdosé',
    image: 'images/monsters/Mansocolat.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5100, atk: 600, spd: 100, res: { neutre: -8, terre: 25, feu: 16, eau: 1, air: 19 } },
    moves: []
}

monsters.chocoskargo_surdose = {
    id: 'chocoskargo_surdose',
    name: 'Chocoskargo surdosé',
    image: 'images/monsters/Chocoskargo.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5100, atk: 600, spd: 100, res: { neutre: 22, terre: 1, feu: 14, eau: 18, air: -10 } },
    moves: []
}

monsters.blerom = {
    id: 'blerom',
    name: 'Blérom',
    image: 'images/monsters/Blérom.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5200, atk: 550, spd: 100, res: { neutre: 15, terre: 12, feu: 21, eau: -33, air: 60 } },
    moves: ['carnage', 'toxin']
}

monsters.meliglours = {
    id: 'meliglours',
    name: 'Meliglours',
    image: 'images/monsters/Meliglours.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5200, atk: 550, spd: 100, res: { neutre: 22, terre: -41, feu: 11, eau: 68, air: 15 } },
    moves: ['glours_contre_la_montre', 'gloursombilical']
}

monsters.diabelial = {
    id: 'diabelial',
    name: 'Diabélial',
    image: 'images/monsters/Diabélial.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5200, atk: 640, spd: 100, res: { neutre: 6, terre: 16, feu: -12, eau: -20, air: 18 } },
    moves: ['langue_demoniaque', 'tissu_de_mensonges', 'torrent_diabolique']
}

monsters.onigori = {
    id: 'onigori',
    name: 'Onigori',
    image: 'images/monsters/Onigori.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5300, atk: 640, spd: 100, res: { neutre: -15, terre: 17, feu: -7, eau: 24, air: 15 } },
    moves: ['gloutonnerie', 'onnichiwa', 'kanabo_jutsu']
}

monsters.epee_geante = {
    id: 'epee_geante',
    name: 'Épée Géante',
    image: 'images/monsters/Épée_Géante.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 800, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.stratege_dompteur = {
    id: 'stratege_dompteur',
    name: 'Stratège Dompteur',
    image: 'images/monsters/Stratège_Dompteur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.dagon_des_profondeurs = {
    id: 'dagon_des_profondeurs',
    name: 'Dagon des Profondeurs',
    image: 'images/monsters/Dagon_des_Profondeurs.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 800, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['souffle_chaud', 'charge_aquatique']
}

monsters.chazino = {
    id: 'chazino',
    name: 'Chazino',
    image: 'images/monsters/Chazino.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 800, spd: 100, res: { neutre: 20, terre: 20, feu: 20, eau: 20, air: 20 } },
    moves: ['expulsion']
}

monsters.auroraire = {
    id: 'auroraire',
    name: 'Auroraire',
    image: 'images/monsters/Auroraire.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.malice = {
    id: 'malice',
    name: 'Malice',
    image: 'images/monsters/Malice.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.voapah = {
    id: 'voapah',
    name: 'Voapah',
    image: 'images/monsters/Voapah.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 600, spd: 100, res: { neutre: -12, terre: 14, feu: 26, eau: 23, air: 5 } },
    moves: ['saut_a_l_aveugle', 'tornade_sanglante', 'uppercut_brulant']
}

monsters.caiguille = {
    id: 'caiguille',
    name: 'Caïguille',
    image: 'images/monsters/Caïguille.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 600, spd: 100, res: { neutre: 29, terre: 9, feu: 22, eau: -16, air: 7 } },
    moves: ['prison_sanguine', 'jeu_d_aiguilles', 'dagyde_ensorcelee']
}

monsters.lunorbe = {
    id: 'lunorbe',
    name: 'Lunorbe',
    image: 'images/monsters/Lunorbe.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.octolithe = {
    id: 'octolithe',
    name: 'Octolithe',
    image: 'images/monsters/Octolithe.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 800, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.armecreante = {
    id: 'armecreante',
    name: 'Armécréante',
    image: 'images/monsters/Armécréante.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 800, spd: 100, res: { neutre: 20, terre: 30, feu: 30, eau: 15, air: 20 } },
    moves: ['ancrepulsion', 'domestication']
}

monsters.iopprime = {
    id: 'iopprime',
    name: 'Iopprimé',
    image: 'images/monsters/Iopprimé.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 800, spd: 100, res: { neutre: 15, terre: 30, feu: 30, eau: 15, air: 30 } },
    moves: ['traumasque', 'moribond', 'barbarie']
}

monsters.marteau_geant = {
    id: 'marteau_geant',
    name: 'Marteau Géant',
    image: 'images/monsters/Marteau_Géant.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 800, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.hache_geante = {
    id: 'hache_geante',
    name: 'Hache Géante',
    image: 'images/monsters/Hache_Géante.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 800, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.morgenstern_geant = {
    id: 'morgenstern_geant',
    name: 'Morgenstern Géant',
    image: 'images/monsters/Morgenstern_Géant.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 800, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.ravalame = {
    id: 'ravalame',
    name: 'Ravalame',
    image: 'images/monsters/Ravalame.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 800, spd: 100, res: { neutre: 20, terre: 25, feu: 20, eau: 35, air: 25 } },
    moves: ['psyclope', 'pluie_de_lames']
}

monsters.fleaunide = {
    id: 'fleaunide',
    name: 'Fléaunide',
    image: 'images/monsters/Fléaunide.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 800, spd: 100, res: { neutre: 5, terre: 10, feu: 5, eau: 20, air: 10 } },
    moves: ['esprit_destructeur', 'cerebrute', 'mortification']
}

monsters.olgoth = {
    id: 'olgoth',
    name: 'Olgoth',
    image: 'images/monsters/Olgoth.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 800, spd: 100, res: { neutre: 5, terre: 10, feu: 5, eau: 20, air: 10 } },
    moves: ['olguropoing', 'presse', 'seisme']
}

monsters.macabrateur = {
    id: 'macabrateur',
    name: 'Macabrateur',
    image: 'images/monsters/Macabrateur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 800, spd: 100, res: { neutre: 5, terre: 10, feu: 5, eau: 20, air: 10 } },
    moves: ['decoupe', 'hache_tirante']
}

monsters.trancharnier = {
    id: 'trancharnier',
    name: 'Trancharnier',
    image: 'images/monsters/Trancharnier.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 800, spd: 100, res: { neutre: 18, terre: 22, feu: 17, eau: 30, air: 19 } },
    moves: ['euphorage', 'catacombe', 'decharner']
}

monsters.kaonashi = {
    id: 'kaonashi',
    name: 'Kaonashi',
    image: 'images/monsters/Kaonashi.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 640, spd: 100, res: { neutre: 19, terre: 15, feu: 12, eau: -5, air: -10 } },
    moves: ['noroi', 'kaonashi_no_numa', 'kara_no', 'shunshin_no_shisui']
}

monsters.imushin = {
    id: 'imushin',
    name: 'Imushin',
    image: 'images/monsters/Imushin.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 640, spd: 100, res: { neutre: -15, terre: -12, feu: -17, eau: 19, air: 25 } },
    moves: ['shikigami_no_mai', 'oriken', 'aerogami']
}

monsters.imorok = {
    id: 'imorok',
    name: 'Imorok',
    image: 'images/monsters/Imorok.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 640, spd: 100, res: { neutre: 14, terre: 26, feu: -11, eau: -16, air: -13 } },
    moves: ['chute_de_papier', 'pli_de_la_vallee']
}

monsters.imiyama = {
    id: 'imiyama',
    name: 'Imiyama',
    image: 'images/monsters/Imiyama.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 640, spd: 100, res: { neutre: -20, terre: 5, feu: 5, eau: 5, air: 5 } },
    moves: ['ronces_de_papier', 'kusudama', 'legende_des_mille_cygrues']
}

monsters.imetsu = {
    id: 'imetsu',
    name: 'Imetsu',
    image: 'images/monsters/Imetsu.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 640, spd: 100, res: { neutre: 11, terre: -22, feu: 10, eau: 21, air: -20 } },
    moves: ['shidekami', 'sonobe', 'piege_de_miura']
}

monsters.imafugo = {
    id: 'imafugo',
    name: 'Imafugo',
    image: 'images/monsters/Imafugo.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 640, spd: 100, res: { neutre: -6, terre: -15, feu: 24, eau: -21, air: 18 } },
    moves: ['inspiration_creatrice', 'go_o_hanma', 'ressho_no_kiba']
}

monsters.shinlam = {
    id: 'shinlam',
    name: 'Shinlam',
    image: 'images/monsters/Shinlam.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 640, spd: 100, res: { neutre: -15, terre: -12, feu: -17, eau: 19, air: 25 } },
    moves: ['lames_noires', 'shurigami', 'encrepulsion']
}

monsters.rokoram = {
    id: 'rokoram',
    name: 'Rokoram',
    image: 'images/monsters/Rokoram.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 640, spd: 100, res: { neutre: 14, terre: 26, feu: -11, eau: -16, air: -13 } },
    moves: ['gakuya', 'encroulement', 'pli_de_la_montagne']
}

monsters.mabram = {
    id: 'mabram',
    name: 'Mabram',
    image: 'images/monsters/Mabram.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 640, spd: 100, res: { neutre: -20, terre: 5, feu: 5, eau: 5, air: 5 } },
    moves: ['entracte_aux_papillons', 'ongurencre', 'chant_du_grand_cerf']
}

monsters.tsunam = {
    id: 'tsunam',
    name: 'Tsunam',
    image: 'images/monsters/Tsunam.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 640, spd: 100, res: { neutre: 11, terre: -22, feu: 10, eau: 21, air: -20 } },
    moves: ['perle_d_encre', 'kagura', 'choju_giga']
}

monsters.fugokam = {
    id: 'fugokam',
    name: 'Fugokam',
    image: 'images/monsters/Fugokam.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 640, spd: 100, res: { neutre: -6, terre: -15, feu: 24, eau: -21, air: 18 } },
    moves: ['souffle_artistique', 'sangaku_hanma', 'kiba_o_kikisaku']
}

monsters.kraradia = {
    id: 'kraradia',
    name: 'Krâradia',
    image: 'images/monsters/Krâradia.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 640, spd: 100, res: { neutre: 15, terre: -20, feu: 5, eau: 20, air: -15 } },
    moves: ['menace_grandissante', 'rafale_diabolique', 'dard_corrompu', 'tir_devastateur']
}

monsters.monture = {
    id: 'monture',
    name: 'Monture',
    image: 'images/monsters/Monture.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5500, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.krokille_novice_crue = {
    id: 'krokille_novice_crue',
    name: 'Krokille Novice Crue',
    image: 'images/monsters/Krokille_Novice_Crue.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5600, atk: 38, spd: 100, res: { neutre: 10, terre: 10, feu: 10, eau: 10, air: 10 } },
    moves: []
}

monsters.sanglirok = {
    id: 'sanglirok',
    name: 'Sanglirok',
    image: 'images/monsters/Sanglirok.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5600, atk: 566, spd: 100, res: { neutre: -24, terre: 5, feu: -8, eau: 18, air: 9 } },
    moves: ['ningurgite', 'ninsoumis']
}

monsters.prisme_d_alliance = {
    id: 'prisme_d_alliance',
    name: 'Prisme d\'alliance',
    image: 'images/monsters/Prisme_d_alliance.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5800, atk: 800, spd: 100, res: { neutre: 25, terre: 25, feu: 25, eau: 25, air: 25 } },
    moves: []
}

monsters.dolid = {
    id: 'dolid',
    name: 'Dolid',
    image: 'images/monsters/Dolid.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 5800, atk: 800, spd: 100, res: { neutre: 9, terre: 15, feu: -11, eau: -8, air: 14 } },
    moves: ['germintaide', 'tetanysme']
}

monsters.crabe_yoloniste = {
    id: 'crabe_yoloniste',
    name: 'Crabe Yoloniste',
    image: 'images/monsters/Crabe_Yoloniste.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 21, terre: 11, feu: 26, eau: -9, air: 11 } },
    moves: ['gesticulation_ridicule', 'pince_ecrasante', 'yolosouague']
}

monsters.cavalier_chanceux = {
    id: 'cavalier_chanceux',
    name: 'Cavalier Chanceux',
    image: 'images/monsters/Cavalier_Chanceux.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 650, spd: 100, res: { neutre: 1, terre: -14, feu: 11, eau: 36, air: 26 } },
    moves: ['carreausillon', 'carreautage']
}

monsters.golem_malakite = {
    id: 'golem_malakite',
    name: 'Golem Malakite',
    image: 'images/monsters/Golem_Malakite.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 800, spd: 100, res: { neutre: 31, terre: 27, feu: 19, eau: 6, air: 14 } },
    moves: ['attraction_minerale', 'boulet_emeraude']
}

monsters.peluche_bouftou = {
    id: 'peluche_bouftou',
    name: 'Peluche bouftou',
    image: 'images/monsters/Peluche_bouftou.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 100, spd: 100, res: { neutre: 30, terre: 30, feu: 10, eau: -30, air: 10 } },
    moves: ['coutures_renforcees', 'ecchymose', 'traumatisme']
}

monsters.harrogant = {
    id: 'harrogant',
    name: 'Harrogant',
    image: 'images/monsters/Harrogant.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: -31, terre: 10, feu: 20, eau: 5, air: 30 } },
    moves: ['dedain', 'coupe_cuir']
}

monsters.grodruche = {
    id: 'grodruche',
    name: 'Grodruche',
    image: 'images/monsters/Grodruche.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 500, spd: 100, res: { neutre: 4, terre: 42, feu: 11, eau: 19, air: -34 } },
    moves: ['vomito', 'nerf_de_boeuf']
}

monsters.peunch = {
    id: 'peunch',
    name: 'Peunch',
    image: 'images/monsters/Peunch.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 500, spd: 100, res: { neutre: 10, terre: 13, feu: -38, eau: 41, air: 1 } },
    moves: ['ioupercute', 'cire_culaire']
}

monsters.empaille = {
    id: 'empaille',
    name: 'Empaillé',
    image: 'images/monsters/Empaillé.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 500, spd: 100, res: { neutre: 15, terre: 11, feu: 40, eau: -30, air: 20 } },
    moves: ['taxidermie', 'paillage', 'gros_sac']
}

monsters.cuirboule = {
    id: 'cuirboule',
    name: 'Cuirboule',
    image: 'images/monsters/Cuirboule.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 500, spd: 100, res: { neutre: 42, terre: -40, feu: 3, eau: 5, air: 15 } },
    moves: ['maboule', 'gonflage', 'bouffee']
}

monsters.ventrublion = {
    id: 'ventrublion',
    name: 'Ventrublion',
    image: 'images/monsters/Ventrublion.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 500, spd: 100, res: { neutre: 15, terre: 30, feu: -31, eau: 5, air: 7 } },
    moves: ['abdomination', 'ventromatisme', 'bidiotisme']
}

monsters.stalak = {
    id: 'stalak',
    name: 'Stalak',
    image: 'images/monsters/Stalak.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 500, spd: 100, res: { neutre: -31, terre: 19, feu: 33, eau: 13, air: 22 } },
    moves: ['brise_larmes', 'legoglace']
}

monsters.karkanik = {
    id: 'karkanik',
    name: 'Karkanik',
    image: 'images/monsters/Karkanik.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 500, spd: 100, res: { neutre: 36, terre: 14, feu: 14, eau: 16, air: -39 } },
    moves: ['caroturier', 'karkanciel']
}

monsters.verglasseur = {
    id: 'verglasseur',
    name: 'Verglasseur',
    image: 'images/monsters/Verglasseur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 500, spd: 100, res: { neutre: 15, terre: 8, feu: 12, eau: -33, air: 33 } },
    moves: ['braguette', 'bralong', 'braconnage']
}

monsters.frimar = {
    id: 'frimar',
    name: 'Frimar',
    image: 'images/monsters/Frimar.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 500, spd: 100, res: { neutre: 5, terre: -31, feu: 12, eau: 39, air: 17 } },
    moves: ['lame_soeur', 'soupirsute', 'glacerbe']
}

monsters.nessil = {
    id: 'nessil',
    name: 'Nessil',
    image: 'images/monsters/Nessil.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 500, spd: 100, res: { neutre: 13, terre: 41, feu: -26, eau: 15, air: 12 } },
    moves: ['loch', 'bafre', 'drako']
}

monsters.krakal = {
    id: 'krakal',
    name: 'Krakal',
    image: 'images/monsters/Krakal.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 500, spd: 100, res: { neutre: 10, terre: -40, feu: 4, eau: 36, air: 15 } },
    moves: ['jappement_dragor', 'morsure_de_soie']
}

monsters.dodox = {
    id: 'dodox',
    name: 'Dodox',
    image: 'images/monsters/Dodox.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 500, spd: 100, res: { neutre: 9, terre: 13, feu: 37, eau: -35, air: 14 } },
    moves: ['picorection', 'pligeon', 'duvet_teran']
}

monsters.termystique = {
    id: 'termystique',
    name: 'Termystique',
    image: 'images/monsters/Termystique.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 500, spd: 100, res: { neutre: -32, terre: 10, feu: 20, eau: 5, air: 35 } },
    moves: ['dard_dard', 'glusure']
}

monsters.droserale = {
    id: 'droserale',
    name: 'Drosérâle',
    image: 'images/monsters/Drosérâle.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 500, spd: 100, res: { neutre: 40, terre: 16, feu: 5, eau: 19, air: -36 } },
    moves: ['caduk', 'stigmatraque']
}

monsters.kanimate = {
    id: 'kanimate',
    name: 'Kanimate',
    image: 'images/monsters/Kanimate.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 500, spd: 100, res: { neutre: 41, terre: 14, feu: 7, eau: -40, air: 12 } },
    moves: ['machine_ception', 'marionnettoyage']
}

monsters.brikoglours = {
    id: 'brikoglours',
    name: 'Brikoglours',
    image: 'images/monsters/Brikoglours.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 500, spd: 100, res: { neutre: 5, terre: 42, feu: -39, eau: 13, air: 12 } },
    moves: ['clef_en_glaise', 'clef_battue']
}

monsters.mansordide = {
    id: 'mansordide',
    name: 'Mansordide',
    image: 'images/monsters/Mansordide.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 500, spd: 100, res: { neutre: 21, terre: 14, feu: 35, eau: 15, air: -36 } },
    moves: ['envol_de_mort', 'engrenage_de_glace', 'rotaplumes']
}

monsters.mecanofoux = {
    id: 'mecanofoux',
    name: 'Mécanofoux',
    image: 'images/monsters/Mécanofoux.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 500, spd: 100, res: { neutre: 10, terre: -38, feu: 15, eau: 12, air: 41 } },
    moves: ['de_grippant', 'petarade', 'rotapousse']
}

monsters.merulor = {
    id: 'merulor',
    name: 'Mérulor',
    image: 'images/monsters/Mérulor.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 500, spd: 100, res: { neutre: -37, terre: 8, feu: 22, eau: 40, air: 11 } },
    moves: ['degage_limite', 'brulage_bete', 'vidange_gardien']
}

monsters.granduk = {
    id: 'granduk',
    name: 'Granduk',
    image: 'images/monsters/Granduk.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 11, terre: -31, feu: 45, eau: 8, air: 15 } },
    moves: ['hibouffonnerie', 'hibougie']
}

monsters.strigide = {
    id: 'strigide',
    name: 'Strigide',
    image: 'images/monsters/Strigide.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 20, terre: 40, feu: 10, eau: -40, air: 5 } },
    moves: ['stricannement', 'strictus', 'stridicule']
}

monsters.cycloide = {
    id: 'cycloide',
    name: 'Cycloïde',
    image: 'images/monsters/Cycloïde.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 19, terre: 5, feu: 13, eau: 40, air: -31 } },
    moves: ['cyclore', 'cyclochette', 'cyclaustrophobe']
}

monsters.sinistrofu = {
    id: 'sinistrofu',
    name: 'Sinistrofu',
    image: 'images/monsters/Sinistrofu.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: -50, terre: 9, feu: 5, eau: 20, air: 45 } },
    moves: ['sinisterie', 'diligence']
}

monsters.nocturlabe = {
    id: 'nocturlabe',
    name: 'Nocturlabe',
    image: 'images/monsters/Nocturlabe.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 40, terre: 17, feu: -33, eau: 12, air: 6 } },
    moves: ['tonnerre_mecanique', 'surchauffense']
}

monsters.pikoleur = {
    id: 'pikoleur',
    name: 'Pikoleur',
    image: 'images/monsters/Pikoleur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 500, spd: 100, res: { neutre: 16, terre: 36, feu: 2, eau: 11, air: -29 } },
    moves: ['par_ici', 'perforage']
}

monsters.harpo = {
    id: 'harpo',
    name: 'Harpo',
    image: 'images/monsters/Harpo.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 500, spd: 100, res: { neutre: 2, terre: 11, feu: -29, eau: 36, air: 16 } },
    moves: ['moule_chote', 'tireur_franc', 'campeur_et_sans_reproches']
}

monsters.krabouilleur = {
    id: 'krabouilleur',
    name: 'Krabouilleur',
    image: 'images/monsters/Krabouilleur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 500, spd: 100, res: { neutre: -29, terre: 2, feu: 11, eau: 16, air: 36 } },
    moves: ['pince_d_or', 'pincendie']
}

monsters.eskoglyphe = {
    id: 'eskoglyphe',
    name: 'Eskoglyphe',
    image: 'images/monsters/Eskoglyphe.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 500, spd: 100, res: { neutre: 16, terre: 2, feu: 36, eau: -29, air: 11 } },
    moves: ['maraude_a_la_joie', 'glycol_roule', 'predateur_de_gloire']
}

monsters.cyclophandre = {
    id: 'cyclophandre',
    name: 'Cyclophandre',
    image: 'images/monsters/Cyclophandre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 500, spd: 100, res: { neutre: 36, terre: -29, feu: 16, eau: 11, air: 2 } },
    moves: ['apnee_crochue', 'gras_de_maree', 'relou_de_mer']
}

monsters.kamasterisk = {
    id: 'kamasterisk',
    name: 'Kamasterisk',
    image: 'images/monsters/Kamasterisk.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 650, spd: 100, res: { neutre: 11, terre: 31, feu: 26, eau: -14, air: 6 } },
    moves: ['clignotement', 'assomnolence']
}

monsters.barbetoal = {
    id: 'barbetoal',
    name: 'Barbétoal',
    image: 'images/monsters/Barbétoal.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 650, spd: 100, res: { neutre: 31, terre: 26, feu: -14, eau: 6, air: 11 } },
    moves: ['barbe_a_trucs', 'super_saillant']
}

monsters.levitrof = {
    id: 'levitrof',
    name: 'Lévitrof',
    image: 'images/monsters/Lévitrof.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 650, spd: 100, res: { neutre: 26, terre: -14, feu: 6, eau: 11, air: 31 } },
    moves: ['kama_hamea']
}

monsters.paspartou = {
    id: 'paspartou',
    name: 'Paspartou',
    image: 'images/monsters/Paspartou.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 650, spd: 100, res: { neutre: -14, terre: 6, feu: 11, eau: 31, air: 26 } },
    moves: ['clemence', 'guideal', 'la_clef_du_succes']
}

monsters.piloztere = {
    id: 'piloztere',
    name: 'Piloztère',
    image: 'images/monsters/Piloztère.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 650, spd: 100, res: { neutre: 6, terre: 11, feu: 31, eau: 26, air: -14 } },
    moves: ['claque', 'sourire_ravageur']
}

monsters.machassin = {
    id: 'machassin',
    name: 'Mâchassin',
    image: 'images/monsters/Mâchassin.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 650, spd: 100, res: { neutre: 21, terre: 11, feu: 26, eau: 6, air: -24 } },
    moves: ['piege_a_le_ours', 'sans_se_mouiller']
}

monsters.terristocrate = {
    id: 'terristocrate',
    name: 'Terristocrate',
    image: 'images/monsters/Terristocrate.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 650, spd: 100, res: { neutre: 11, terre: 26, feu: 6, eau: -24, air: 21 } },
    moves: ['bombe_illicale', 'fumerus', 'attentat']
}

monsters.bouroliste = {
    id: 'bouroliste',
    name: 'Bourôliste',
    image: 'images/monsters/Bourôliste.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 650, spd: 100, res: { neutre: 26, terre: 6, feu: -24, eau: 21, air: 11 } },
    moves: ['vers_la_lumiere', 'coupable', 'tournoyade']
}

monsters.magouille = {
    id: 'magouille',
    name: 'Magouille',
    image: 'images/monsters/Magouille.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 650, spd: 100, res: { neutre: -24, terre: 21, feu: 11, eau: 26, air: 6 } },
    moves: ['craneantissement', 'crames']
}

monsters.ikargn = {
    id: 'ikargn',
    name: 'Ikargn',
    image: 'images/monsters/Ikargn.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 650, spd: 100, res: { neutre: 3, terre: 8, feu: -14, eau: 24, air: 39 } },
    moves: ['attraction_ailee', 'cercle_de_feu', 'terre_mythe']
}

monsters.mejaire = {
    id: 'mejaire',
    name: 'Méjaire',
    image: 'images/monsters/Méjaire.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 650, spd: 100, res: { neutre: 8, terre: -14, feu: 24, eau: 39, air: 3 } },
    moves: ['rayonirique', 'plumiere']
}

monsters.harpille = {
    id: 'harpille',
    name: 'Harpille',
    image: 'images/monsters/Harpille.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 650, spd: 100, res: { neutre: -14, terre: 24, feu: 39, eau: 3, air: 8 } },
    moves: ['tirs_optiques', 'superfidie', 'petit_poison']
}

monsters.buboxor = {
    id: 'buboxor',
    name: 'Buboxor',
    image: 'images/monsters/Buboxor.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 650, spd: 100, res: { neutre: 24, terre: 39, feu: 3, eau: 8, air: -14 } },
    moves: ['bouclier_absorbant', 'feinterception', 'hoxor']
}

monsters.brabuzar = {
    id: 'brabuzar',
    name: 'Brabuzar',
    image: 'images/monsters/Brabuzar.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 650, spd: 100, res: { neutre: 39, terre: 3, feu: 8, eau: -14, air: 24 } },
    moves: ['mise_en_situation', 'neutralisation']
}

monsters.soldat_de_fortune = {
    id: 'soldat_de_fortune',
    name: 'Soldat de Fortune',
    image: 'images/monsters/Soldat_de_Fortune.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 650, spd: 100, res: { neutre: 26, terre: 1, feu: -14, eau: 11, air: 36 } },
    moves: ['jet_de_pique', 'en_plein_c_ur']
}

monsters.valet_veinard = {
    id: 'valet_veinard',
    name: 'Valet Veinard',
    image: 'images/monsters/Valet_Veinard.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 650, spd: 100, res: { neutre: -14, terre: 11, feu: 36, eau: 26, air: 1 } },
    moves: ['piquepocket', 'epique']
}

monsters.dame_du_hasard = {
    id: 'dame_du_hasard',
    name: 'Dame du Hasard',
    image: 'images/monsters/Dame_du_Hasard.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 650, spd: 100, res: { neutre: 11, terre: 36, feu: 26, eau: 1, air: -14 } },
    moves: ['tourne_griffe', 'creve_c_ur']
}

monsters.roi_joueur = {
    id: 'roi_joueur',
    name: 'Roi Joueur',
    image: 'images/monsters/Roi_Joueur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 650, spd: 100, res: { neutre: 36, terre: 26, feu: 1, eau: -14, air: 11 } },
    moves: ['lueur_royale', 'adoubement_brutal']
}

monsters.tourthon = {
    id: 'tourthon',
    name: 'Tourthon',
    image: 'images/monsters/Tourthon.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: -14, terre: 1, feu: 16, eau: 21, air: 36 } },
    moves: ['attraction_lumineuse', 'enlacement']
}

monsters.poulpee = {
    id: 'poulpee',
    name: 'Poulpée',
    image: 'images/monsters/Poulpée.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 21, terre: 36, feu: -14, eau: 1, air: 16 } },
    moves: ['siphonage', 'tourbillonement']
}

monsters.tryde = {
    id: 'tryde',
    name: 'Tryde',
    image: 'images/monsters/Tryde.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 1, terre: 16, feu: 21, eau: 36, air: -14 } },
    moves: ['prison_aqueuse']
}

monsters.rilur = {
    id: 'rilur',
    name: 'Rilur',
    image: 'images/monsters/Rilur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 36, terre: -6, feu: 1, eau: 16, air: 21 } },
    moves: ['harpon_eclair', 'charge_frontale']
}

monsters.diondin = {
    id: 'diondin',
    name: 'Diondin',
    image: 'images/monsters/Diondin.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 16, terre: 21, feu: 36, eau: -14, air: 1 } },
    moves: ['projection_hydraulique', 'fougou_rebondissant', 'poussette_mortelle']
}

monsters.grofond = {
    id: 'grofond',
    name: 'Grofond',
    image: 'images/monsters/Grofond.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 6, terre: 26, feu: -9, eau: 16, air: 16 } },
    moves: ['attraction_repugnante', 'sphere_corrosive']
}

monsters.n_yalg = {
    id: 'n_yalg',
    name: 'N\'yalg',
    image: 'images/monsters/N_yalg.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 16, terre: 16, feu: 6, eau: 26, air: -9 } },
    moves: ['expulsion_miasmatique', 'flagellation_paralysante']
}

monsters.shokkoth = {
    id: 'shokkoth',
    name: 'Shokkoth',
    image: 'images/monsters/Shokkoth.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 16, terre: 6, feu: 26, eau: -9, air: 16 } },
    moves: ['triangle_dement', 'il_horrifiant']
}

monsters.li_fo = {
    id: 'li_fo',
    name: 'Li-Fo',
    image: 'images/monsters/Li-Fo.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: -9, terre: 16, feu: 16, eau: 6, air: 26 } },
    moves: ['ponction_morbide']
}

monsters.klutiste = {
    id: 'klutiste',
    name: 'Klûtiste',
    image: 'images/monsters/Klûtiste.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 26, terre: -9, feu: 16, eau: 16, air: 6 } },
    moves: ['melopee_pernicieuse', 'folle_cacophonie', 'intensite_demoniaque']
}

monsters.mol_usk = {
    id: 'mol_usk',
    name: 'Mol Usk',
    image: 'images/monsters/Mol_Usk.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: -9, terre: 11, feu: 21, eau: 11, air: 26 } },
    moves: ['bave_acide', 'trainee_collante', 'roulemboule']
}

monsters.gambaf = {
    id: 'gambaf',
    name: 'Gambaf',
    image: 'images/monsters/Gambaf.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 11, terre: 26, feu: -9, eau: 11, air: 21 } },
    moves: ['pas_chasse_frontal', 'poing_meteore', 'enchainement_de_coups_de_poings_normaux']
}

monsters.mantaze = {
    id: 'mantaze',
    name: 'Mantaze',
    image: 'images/monsters/Mantaze.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 26, terre: -9, feu: 11, eau: 21, air: 11 } },
    moves: ['eclair_obscur', 'electrochoc', 'foudre_marine']
}

monsters.tilamproie = {
    id: 'tilamproie',
    name: 'Tilamproie',
    image: 'images/monsters/Tilamproie.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 11, terre: 21, feu: 11, eau: 26, air: -9 } },
    moves: ['piege_parasite', 'succion_attractive', 'morsure_filtrante']
}

monsters.chakanoubis = {
    id: 'chakanoubis',
    name: 'Chakanoubis',
    image: 'images/monsters/Chakanoubis.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 21, terre: -14, feu: 31, eau: 1, air: 16 } },
    moves: ['harcelement_de_la_pyramide', 'pyramide']
}

monsters.bandleth = {
    id: 'bandleth',
    name: 'Bandleth',
    image: 'images/monsters/Bandleth.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 16, terre: 21, feu: -14, eau: 31, air: 1 } },
    moves: ['calin', 'danse_comme_une_momie']
}

monsters.momistik = {
    id: 'momistik',
    name: 'Momistik',
    image: 'images/monsters/Momistik.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 31, terre: 1, feu: 16, eau: 21, air: -14 } },
    moves: ['frappe_elementaire', 'grenattrition']
}

monsters.rykaon = {
    id: 'rykaon',
    name: 'Rykaon',
    image: 'images/monsters/Rykaon.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 1, terre: 16, feu: 21, eau: -14, air: 31 } },
    moves: ['remplacement_maudit', 'sabrupt']
}

monsters.griffotep = {
    id: 'griffotep',
    name: 'Griffotep',
    image: 'images/monsters/Griffotep.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: -14, terre: 31, feu: 1, eau: 16, air: 21 } },
    moves: ['aigriffes', 'arrivee_fracassante']
}

monsters.goulafre = {
    id: 'goulafre',
    name: 'Goulafre',
    image: 'images/monsters/Goulafre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 11, terre: 6, feu: 16, eau: -9, air: 31 } },
    moves: ['bidonnage']
}

monsters.kerigoule = {
    id: 'kerigoule',
    name: 'Kérigoule',
    image: 'images/monsters/Kérigoule.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 6, terre: 16, feu: -9, eau: 31, air: 11 } },
    moves: ['tranche_air']
}

monsters.gouligane = {
    id: 'gouligane',
    name: 'Gouligane',
    image: 'images/monsters/Gouligane.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 16, terre: -9, feu: 31, eau: 11, air: 6 } },
    moves: ['gouli_gouli', 'griffouille']
}

monsters.goultime = {
    id: 'goultime',
    name: 'Goultime',
    image: 'images/monsters/Goultime.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: -9, terre: 31, feu: 11, eau: 6, air: 16 } },
    moves: ['dantagoule', 'poings_vire_goule']
}

monsters.pipisteuse = {
    id: 'pipisteuse',
    name: 'Pipisteuse',
    image: 'images/monsters/Pipisteuse.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 31, terre: 11, feu: 6, eau: 16, air: -9 } },
    moves: ['deplacement_furtif', 'chauffe_kipeu']
}

monsters.chause = {
    id: 'chause',
    name: 'Chause',
    image: 'images/monsters/Chause.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 21, terre: 6, feu: -14, eau: 36, air: 11 } },
    moves: ['flami', 'ebullition', 'doublame']
}

monsters.ectorche = {
    id: 'ectorche',
    name: 'Ectorche',
    image: 'images/monsters/Ectorche.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 11, terre: 21, feu: 6, eau: -14, air: 36 } },
    moves: ['coupe_souffle']
}

monsters.esprigne = {
    id: 'esprigne',
    name: 'Esprigné',
    image: 'images/monsters/Esprigné.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 36, terre: 11, feu: 21, eau: 6, air: -14 } },
    moves: ['bouillie', 'tranche_ame']
}

monsters.feutome = {
    id: 'feutome',
    name: 'Feutôme',
    image: 'images/monsters/Feutôme.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: -14, terre: 36, feu: 11, eau: 21, air: 6 } },
    moves: ['feu_critique', 'revenant']
}

monsters.crame = {
    id: 'crame',
    name: 'Crâme',
    image: 'images/monsters/Crâme.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 6, terre: -14, feu: 36, eau: 11, air: 21 } },
    moves: ['boule_d_eau']
}

monsters.klemort = {
    id: 'klemort',
    name: 'Klémort',
    image: 'images/monsters/Klémort.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: -24, terre: 21, feu: 16, eau: 26, air: 11 } },
    moves: ['eperuption', 'conjuration_volcanique', 'magmagique']
}

monsters.trepavois = {
    id: 'trepavois',
    name: 'Trépavois',
    image: 'images/monsters/Trépavois.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 11, terre: 11, feu: -19, eau: 31, air: 16 } },
    moves: ['glaive_sommaire', 'charge_au_bouclier']
}

monsters.hacharne = {
    id: 'hacharne',
    name: 'Hacharné',
    image: 'images/monsters/Hacharné.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 6, terre: -19, feu: 21, eau: 6, air: 36 } },
    moves: ['magmache', 'haleine_enflammee', 'visiosoufre']
}

monsters.moribombe = {
    id: 'moribombe',
    name: 'Moribombe',
    image: 'images/monsters/Moribombe.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 6, terre: 16, feu: 31, eau: -24, air: 21 } },
    moves: ['zhen_tian_lei', 'grenade_collante', 'chaudiere']
}

monsters.halbardent = {
    id: 'halbardent',
    name: 'Halbardent',
    image: 'images/monsters/Halbardent.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 1, terre: 26, feu: 21, eau: 16, air: -14 } },
    moves: ['geoassaut', 'lance_flammes', 'chauffard']
}

monsters.zombruth = {
    id: 'zombruth',
    name: 'Zombruth',
    image: 'images/monsters/Zombruth.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 6, terre: -9, feu: 16, eau: 6, air: 31 } },
    moves: ['cumul_des_mandales', 'siphon', 'aquaponey']
}

monsters.tournoye = {
    id: 'tournoye',
    name: 'Tournoyé',
    image: 'images/monsters/Tournoyé.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 16, terre: 21, feu: 11, eau: -14, air: 16 } },
    moves: ['franchissement', 'monodent', 'restoute']
}

monsters.funespadon = {
    id: 'funespadon',
    name: 'Funespadon',
    image: 'images/monsters/Funespadon.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 16, terre: 21, feu: 6, eau: 26, air: -19 } },
    moves: ['talion', 'profondeurs_marines']
}

monsters.cranonier = {
    id: 'cranonier',
    name: 'Crânonier',
    image: 'images/monsters/Crânonier.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 11, terre: 31, feu: -19, eau: 11, air: 16 } },
    moves: ['morlusque', 'hydraire']
}

monsters.macrab = {
    id: 'macrab',
    name: 'Macrab',
    image: 'images/monsters/Macrab.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 1, terre: -14, feu: 36, eau: 21, air: 6 } },
    moves: ['putrefaction_marine', 'coup_de_pince', 'vapeur']
}

monsters.boufbos = {
    id: 'boufbos',
    name: 'Boufbos',
    image: 'images/monsters/Boufbos.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 26, terre: 6, feu: 21, eau: 16, air: -9 } },
    moves: ['lance_pierre', 'forte_tete']
}

monsters.barbelier = {
    id: 'barbelier',
    name: 'Barbélier',
    image: 'images/monsters/Barbélier.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 16, terre: -9, feu: 26, eau: 6, air: 21 } },
    moves: ['coup_de_cornes', 'belier']
}

monsters.kasrok = {
    id: 'kasrok',
    name: 'Kasrok',
    image: 'images/monsters/Kasrok.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 6, terre: 21, feu: 16, eau: -9, air: 26 } },
    moves: ['marteau_pillon', 'nimpulsion']
}

monsters.vatenbiere = {
    id: 'vatenbiere',
    name: 'Vatenbière',
    image: 'images/monsters/Vatenbière.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 21, terre: 16, feu: -9, eau: 26, air: 6 } },
    moves: ['hachis', 'nimplantation']
}

monsters.chocoligarque = {
    id: 'chocoligarque',
    name: 'Chocoligarque',
    image: 'images/monsters/Chocoligarque.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 800, spd: 100, res: { neutre: 9, terre: 32, feu: 19, eau: -12, air: 28 } },
    moves: ['chocolat_sperger', 'cacaobstruction']
}

monsters.torrefactueur = {
    id: 'torrefactueur',
    name: 'Torréfactueur',
    image: 'images/monsters/Torréfactueur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 800, spd: 100, res: { neutre: 36, terre: 29, feu: 18, eau: -6, air: 11 } },
    moves: ['torreador', 'torrefaction', 'padbra']
}

monsters.pralicienne = {
    id: 'pralicienne',
    name: 'Pralicienne',
    image: 'images/monsters/Pralicienne.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 800, spd: 100, res: { neutre: 13, terre: 21, feu: -10, eau: 37, air: 19 } },
    moves: ['hydrolyse', 'chococlier', 'glacage']
}

monsters.temperaturge = {
    id: 'temperaturge',
    name: 'Températurge',
    image: 'images/monsters/Températurge.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 800, spd: 100, res: { neutre: -15, terre: 9, feu: 24, eau: 18, air: 34 } },
    moves: ['refroidissement', 'surchauffe', 'chaudron_choco']
}

monsters.cabosseur = {
    id: 'cabosseur',
    name: 'Cabosseur',
    image: 'images/monsters/Cabosseur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 800, spd: 100, res: { neutre: 16, terre: 19, feu: 35, eau: 23, air: -11 } },
    moves: ['eclabossage', 'feve_du_samedi_soir', 'piege_a_gourmands']
}

monsters.kashkaille = {
    id: 'kashkaille',
    name: 'Kashkaille',
    image: 'images/monsters/Kashkaille.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 7, terre: -17, feu: 29, eau: 13, air: 15 } },
    moves: ['traquenard_reptilien', 'attirance_de_l_invisible']
}

monsters.alashasss = {
    id: 'alashasss',
    name: 'Alashasss',
    image: 'images/monsters/Alashasss.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: 11, terre: -14, feu: 11, eau: 16, air: 21 } },
    moves: ['tir_de_precision', 'regeneration_sacrificielle', 'accumulation_critique']
}

monsters.cronnibal = {
    id: 'cronnibal',
    name: 'Cronnibal',
    image: 'images/monsters/Cronnibal.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 600, spd: 100, res: { neutre: -15, terre: 30, feu: 11, eau: 5, air: -5 } },
    moves: ['rage_nocturne', 'sauvagerie_reptilienne', 'cronnibalisme']
}

monsters.ferrailleur = {
    id: 'ferrailleur',
    name: 'Ferrailleur',
    image: 'images/monsters/Ferrailleur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 800, spd: 100, res: { neutre: 34, terre: -8, feu: 17, eau: 15, air: 26 } },
    moves: ['demantelement', 'terminal_gris', 'assembricolage']
}

monsters.krevladal = {
    id: 'krevladal',
    name: 'Krèvladal',
    image: 'images/monsters/Krèvladal.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 800, spd: 100, res: { neutre: 16, terre: 19, feu: 23, eau: 35, air: -11 } },
    moves: ['pouilleux_massacreur', 'crache_misere']
}

monsters.desosseur = {
    id: 'desosseur',
    name: 'Désosseur',
    image: 'images/monsters/Désosseur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 800, spd: 100, res: { neutre: 13, terre: 21, feu: -10, eau: 19, air: 37 } },
    moves: ['desossage', 'souffle_du_desert']
}

monsters.skentu = {
    id: 'skentu',
    name: 'Skentu',
    image: 'images/monsters/Skentu.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 800, spd: 100, res: { neutre: -15, terre: 9, feu: 34, eau: 18, air: 24 } },
    moves: ['bantha', 'balle_vorace', 'grenade_aveuglante']
}

monsters.dawaj = {
    id: 'dawaj',
    name: 'Dawaj',
    image: 'images/monsters/Dawaj.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 800, spd: 100, res: { neutre: 29, terre: 36, feu: 18, eau: -6, air: 11 } },
    moves: ['sol_aride', 'fouet_gadderfi']
}

monsters.gangredogue = {
    id: 'gangredogue',
    name: 'Gangredogue',
    image: 'images/monsters/Gangredogue.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 800, spd: 100, res: { neutre: -10, terre: -14, feu: 9, eau: 16, air: 12 } },
    moves: ['tir_purulent', 'gangraine', 'debarbouillie']
}

monsters.belilith = {
    id: 'belilith',
    name: 'Belilith',
    image: 'images/monsters/Belilith.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 640, spd: 100, res: { neutre: -15, terre: 15, feu: -20, eau: 5, air: 20 } },
    moves: ['compression_furieuse', 'plongeon_tourmente', 'exaltation_terrifiante']
}

monsters.eninferno = {
    id: 'eninferno',
    name: 'Eninferno',
    image: 'images/monsters/Eninferno.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 640, spd: 100, res: { neutre: -15, terre: 5, feu: 20, eau: -15, air: 15 } },
    moves: ['murmure_des_lamentations', 'parabole_tordue', 'rumeur_inquietante', 'sermon_effroyable']
}

monsters.voracle = {
    id: 'voracle',
    name: 'Voracle',
    image: 'images/monsters/Voracle.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 640, spd: 100, res: { neutre: 13, terre: -5, feu: 26, eau: 1, air: 21 } },
    moves: ['hauspice', 'divination', 'pres_age']
}

monsters.batail_heure = {
    id: 'batail_heure',
    name: 'Batail\'heure',
    image: 'images/monsters/Batail_heure.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 300, spd: 100, res: { neutre: 20, terre: 25, feu: 15, eau: 10, air: 5 } },
    moves: ['estoc', 'entaille', 'heroisme', 'providence', 'condamnation', 'bond']
}

monsters.tir_heure = {
    id: 'tir_heure',
    name: 'Tir\'heure',
    image: 'images/monsters/Tir_heure.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 300, spd: 100, res: { neutre: 25, terre: 20, feu: 15, eau: 10, air: 5 } },
    moves: ['punition']
}

monsters.gueris_heure = {
    id: 'gueris_heure',
    name: 'Guéris\'heure',
    image: 'images/monsters/Guéris_heure.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 300, spd: 100, res: { neutre: 5, terre: 10, feu: 15, eau: 25, air: 20 } },
    moves: ['jouvence']
}

monsters.eclair_heure = {
    id: 'eclair_heure',
    name: 'Éclair\'heure',
    image: 'images/monsters/Éclair_heure.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 300, spd: 100, res: { neutre: 15, terre: 20, feu: 5, eau: 10, air: 25 } },
    moves: ['compas', 'entourloupe', 'magnetisme', 'recel', 'pulsar', 'botte', 'aimantation']
}

monsters.protect_heure = {
    id: 'protect_heure',
    name: 'Protect\'heure',
    image: 'images/monsters/Protect_heure.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 300, spd: 100, res: { neutre: 20, terre: 25, feu: 15, eau: 5, air: 10 } },
    moves: ['somnolence', 'rempart', 'renfort', 'barriere']
}

monsters.berserk_heure = {
    id: 'berserk_heure',
    name: 'Berserk\'heure',
    image: 'images/monsters/Berserk_heure.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6000, atk: 300, spd: 100, res: { neutre: 20, terre: 5, feu: 25, eau: 15, air: 10 } },
    moves: ['assaut', 'attirance']
}

monsters.marionnette_du_mulou_meule = {
    id: 'marionnette_du_mulou_meule',
    name: 'Marionnette du Mulou meulé',
    image: 'images/monsters/Marionnette_du_Mulou_meulé.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6100, atk: 500, spd: 100, res: { neutre: 22, terre: -10, feu: -5, eau: 42, air: 42 } },
    moves: ['reconstitution', 'invocation_de_milimeulou']
}

monsters.blindur = {
    id: 'blindur',
    name: 'Blindur',
    image: 'images/monsters/Blindur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6100, atk: 566, spd: 100, res: { neutre: -34, terre: 21, feu: 4, eau: 17, air: -8 } },
    moves: ['ninculpation', 'nindestructible', 'nindemnite']
}

monsters.malephisto = {
    id: 'malephisto',
    name: 'Maléphisto',
    image: 'images/monsters/Maléphisto.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6300, atk: 640, spd: 100, res: { neutre: 19, terre: -20, feu: 8, eau: 12, air: -18 } },
    moves: ['prison_de_haine', 'fausse_tragedie', 'pacte_demoniaque']
}

monsters.gardienne_des_egouts = {
    id: 'gardienne_des_egouts',
    name: 'Gardienne des Égouts',
    image: 'images/monsters/Gardienne_des_Égouts.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6500, atk: 675, spd: 100, res: { neutre: 90, terre: 37, feu: 35, eau: 20, air: 10 } },
    moves: ['Invocation_d_Arakne_Majeure']
}

monsters.porkzebuth = {
    id: 'porkzebuth',
    name: 'Porkzebuth',
    image: 'images/monsters/Porkzebuth.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6500, atk: 640, spd: 100, res: { neutre: 5, terre: 20, feu: -15, eau: 15, air: -20 } },
    moves: ['embrochement_meurtrier', 'connivence_demoniaque', 'ruee_malfaisante']
}

monsters.voracle_perturbee = {
    id: 'voracle_perturbee',
    name: 'Voracle perturbée',
    image: 'images/monsters/Voracle_perturbée.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6600, atk: 800, spd: 100, res: { neutre: 17, terre: -1, feu: 30, eau: 5, air: 25 } },
    moves: []
}

monsters.tanklume = {
    id: 'tanklume',
    name: 'Tanklume',
    image: 'images/monsters/Tanklume.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6600, atk: 600, spd: 100, res: { neutre: -9, terre: 26, feu: 6, eau: 21, air: 16 } },
    moves: ['triple_attaque', 'ninrmure']
}

monsters.gentyran = {
    id: 'gentyran',
    name: 'Gentyran',
    image: 'images/monsters/Gentyran.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6600, atk: 790, spd: 100, res: { neutre: 30, terre: 25, feu: 20, eau: 20, air: 30 } },
    moves: ['fouet_palliatif', 'fouet_cadence', 'fouet_dopant']
}

monsters.sonj = {
    id: 'sonj',
    name: 'Sonj',
    image: 'images/monsters/Sonj.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6600, atk: 1500, spd: 100, res: { neutre: 20, terre: 20, feu: 20, eau: 20, air: 20 } },
    moves: ['sonjerie', 'stimulation', 'manipulation_des_ombres', 'piege_farceur', 'cabriole_simiesque']
}

monsters.demoloch = {
    id: 'demoloch',
    name: 'Démoloch',
    image: 'images/monsters/Démoloch.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6900, atk: 640, spd: 100, res: { neutre: -22, terre: 10, feu: 17, eau: -10, air: 25 } },
    moves: ['appetit_infernal', 'salammbo', 'fruit_du_sacrifice']
}

monsters.soldalia = {
    id: 'soldalia',
    name: 'Soldalia',
    image: 'images/monsters/Soldalia.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 6900, atk: 640, spd: 100, res: { neutre: 18, terre: -24, feu: 7, eau: 12, air: -17 } },
    moves: ['liane_adaptive', 'liane_entravante', 'liane_attirante']
}

monsters.coquelicogne = {
    id: 'coquelicogne',
    name: 'Coquelicogne',
    image: 'images/monsters/Coquelicogne.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 7000, atk: 640, spd: 100, res: { neutre: -18, terre: 20, feu: 7, eau: -20, air: 9 } },
    moves: ['poing_aqueux', 'poing_de_repli', 'poing_destructeur']
}

monsters.kreuvete_la_bwork_ingenue = {
    id: 'kreuvete_la_bwork_ingenue',
    name: 'Kreuvète la Bwork Ingénue',
    image: 'images/monsters/Kreuvète_la_Bwork_Ingénue.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 7100, atk: 800, spd: 100, res: { neutre: -10, terre: 5, feu: 10, eau: -20, air: 5 } },
    moves: ['moderation', 'mordorsene', 'hedite', 'achesse']
}

monsters.tambourreau = {
    id: 'tambourreau',
    name: 'Tambourreau',
    image: 'images/monsters/Tambourreau.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 7100, atk: 700, spd: 100, res: { neutre: 20, terre: 25, feu: 15, eau: 20, air: 25 } },
    moves: ['arbaguette', 'tambourre_pif']
}

monsters.pistilangue = {
    id: 'pistilangue',
    name: 'Pistilangue',
    image: 'images/monsters/Pistilangue.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 7100, atk: 800, spd: 100, res: { neutre: -13, terre: 26, feu: 10, eau: 17, air: -7 } },
    moves: ['spore_addikt', 'flemingysme', 'maturation']
}

monsters.cameliache = {
    id: 'cameliache',
    name: 'Caméliache',
    image: 'images/monsters/Caméliache.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 7100, atk: 640, spd: 100, res: { neutre: 6, terre: 13, feu: -21, eau: -16, air: 14 } },
    moves: ['choc_infini', 'bond_tactique', 'poussee_tourbillonnante']
}

monsters.domptueuse = {
    id: 'domptueuse',
    name: 'Domptueuse',
    image: 'images/monsters/Domptueuse.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 7100, atk: 640, spd: 100, res: { neutre: 16, terre: 21, feu: -6, eau: 14, air: 0 } },
    moves: ['martignasse', 'detresse', 'braconatte']
}

monsters.krtek = {
    id: 'krtek',
    name: 'Krtek',
    image: 'images/monsters/Krtek.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 7500, atk: 23, spd: 100, res: { neutre: 50, terre: 45, feu: 25, eau: 0, air: 35 } },
    moves: ['bonne_pioche']
}

monsters.bwariok = {
    id: 'bwariok',
    name: 'Bwariok',
    image: 'images/monsters/Bwariok.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 7500, atk: 640, spd: 100, res: { neutre: 20, terre: -15, feu: 15, eau: -20, air: 5 } },
    moves: ['grappin_abyssal', 'rugissement_infernal', 'trombe_ravageuse']
}

monsters.ecaptif = {
    id: 'ecaptif',
    name: 'Ecaptif',
    image: 'images/monsters/Ecaptif.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 7700, atk: 800, spd: 100, res: { neutre: 25, terre: 20, feu: 25, eau: 30, air: 30 } },
    moves: ['megalerien', 'pagaifrenee']
}

monsters.tentaclaque = {
    id: 'tentaclaque',
    name: 'Tentaclaque',
    image: 'images/monsters/Tentaclaque.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 7700, atk: 800, spd: 100, res: { neutre: 24, terre: -13, feu: 14, eau: 21, air: -10 } },
    moves: ['parasitysme', 'ponction_lombric']
}

monsters.statulipe = {
    id: 'statulipe',
    name: 'Statulipe',
    image: 'images/monsters/Statulipe.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 7700, atk: 640, spd: 100, res: { neutre: 23, terre: 10, feu: -16, eau: 7, air: -14 } },
    moves: ['glyphe_des_protecteurs', 'assaut_alternatif', 'ecu_tranchant']
}

monsters.domptueuse_perturbee = {
    id: 'domptueuse_perturbee',
    name: 'Domptueuse perturbée',
    image: 'images/monsters/Domptueuse_perturbée.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 7800, atk: 800, spd: 100, res: { neutre: 20, terre: 25, feu: -2, eau: 18, air: 4 } },
    moves: []
}

monsters.brutasmodan = {
    id: 'brutasmodan',
    name: 'Brutasmodan',
    image: 'images/monsters/Brutasmodan.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 8000, atk: 640, spd: 100, res: { neutre: -19, terre: 22, feu: 5, eau: 24, air: -13 } },
    moves: ['festin_ardent', 'uppercut_abyssal', 'ruade_brutale']
}

monsters.garde_du_conseil = {
    id: 'garde_du_conseil',
    name: 'Garde du Conseil',
    image: 'images/monsters/Garde_du_Conseil.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 8200, atk: 800, spd: 100, res: { neutre: 20, terre: 10, feu: 10, eau: 50, air: 10 } },
    moves: ['relent', 'sepiolite', 'trine']
}

monsters.briko_altruiste = {
    id: 'briko_altruiste',
    name: 'Briko Altruiste',
    image: 'images/monsters/Briko_Altruiste.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 8200, atk: 800, spd: 100, res: { neutre: -14, terre: -22, feu: 15, eau: 8, air: 2 } },
    moves: ['stase_regenerante', 'solidarite_chronique']
}

monsters.briko_galvanisant = {
    id: 'briko_galvanisant',
    name: 'Briko Galvanisant',
    image: 'images/monsters/Briko_Galvanisant.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 8200, atk: 800, spd: 100, res: { neutre: 3, terre: -9, feu: -16, eau: 17, air: 10 } },
    moves: ['chronoxydation', 'onde_protectrice']
}

monsters.briko_exaltant = {
    id: 'briko_exaltant',
    name: 'Briko Exaltant',
    image: 'images/monsters/Briko_Exaltant.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 8200, atk: 800, spd: 100, res: { neutre: 14, terre: -3, feu: -8, eau: -17, air: 20 } },
    moves: ['frelaterie', 'deplacements_degradants']
}

monsters.nheur_gueule = {
    id: 'nheur_gueule',
    name: 'Nheur\'Gueule',
    image: 'images/monsters/Nheur_Gueule.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 8200, atk: 800, spd: 100, res: { neutre: 15, terre: 10, feu: 17, eau: -12, air: 20 } },
    moves: ['tourbe_ylol', 'brutalysme', 'crachacide', 'germinator']
}

monsters.armuguet = {
    id: 'armuguet',
    name: 'Armuguet',
    image: 'images/monsters/Armuguet.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 8200, atk: 640, spd: 100, res: { neutre: -29, terre: -19, feu: 23, eau: 17, air: 8 } },
    moves: ['epine_revigorante', 'attraction_brulante']
}

monsters.ebourifauve = {
    id: 'ebourifauve',
    name: 'Ébourifauve',
    image: 'images/monsters/Ébourifauve.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 8200, atk: 640, spd: 100, res: { neutre: 6, terre: 21, feu: 4, eau: 9, air: 26 } },
    moves: ['paresse', 'feligance']
}

monsters.sinj = {
    id: 'sinj',
    name: 'Sinj',
    image: 'images/monsters/Sinj.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 8200, atk: 1500, spd: 100, res: { neutre: 30, terre: 30, feu: 30, eau: 30, air: 30 } },
    moves: ['sinjerie', 'vague_destructrice_du_singe', 'fulgurang_outan', 'ninjutsinj', 'super_sinj']
}

monsters.boularbin = {
    id: 'boularbin',
    name: 'Boularbin',
    image: 'images/monsters/Boularbin.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 8800, atk: 700, spd: 100, res: { neutre: 30, terre: 30, feu: 30, eau: 20, air: 20 } },
    moves: ['renfortiche', 'compression', 'penitence']
}

monsters.lapilope = {
    id: 'lapilope',
    name: 'Lapilope',
    image: 'images/monsters/Lapilope.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 8800, atk: 640, spd: 100, res: { neutre: 10, terre: 10, feu: 10, eau: -10, air: -10 } },
    moves: []
}

monsters.ebourifauve_perturbee = {
    id: 'ebourifauve_perturbee',
    name: 'Ébourifauve perturbée',
    image: 'images/monsters/Ébourifauve_perturbée.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 9000, atk: 800, spd: 100, res: { neutre: 10, terre: 25, feu: 8, eau: 13, air: 30 } },
    moves: []
}

monsters.bonraphin = {
    id: 'bonraphin',
    name: 'Bonraphin',
    image: 'images/monsters/Bonraphin.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 9100, atk: 640, spd: 100, res: { neutre: 8, terre: -12, feu: -23, eau: 23, air: 16 } },
    moves: ['faux_seraphine', 'colonne_de_lumiere']
}

monsters.braklotin = {
    id: 'braklotin',
    name: 'Brâklotin',
    image: 'images/monsters/Brâklotin.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 9100, atk: 640, spd: 100, res: { neutre: 8, terre: 16, feu: 23, eau: -23, air: -12 } },
    moves: ['epee_diablotine', 'colonne_de_flammes']
}

monsters.brutapir = {
    id: 'brutapir',
    name: 'Brutapir',
    image: 'images/monsters/Brutapir.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 9300, atk: 640, spd: 100, res: { neutre: -10, terre: -10, feu: 10, eau: 10, air: 10 } },
    moves: []
}

monsters.briko_taquin = {
    id: 'briko_taquin',
    name: 'Briko Taquin',
    image: 'images/monsters/Briko_Taquin.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 9900, atk: 800, spd: 100, res: { neutre: 19, terre: 13, feu: -4, eau: -10, air: -17 } },
    moves: ['metaplasme', 'perversion']
}

monsters.briko_stimulant = {
    id: 'briko_stimulant',
    name: 'Briko Stimulant',
    image: 'images/monsters/Briko_Stimulant.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 9900, atk: 800, spd: 100, res: { neutre: -19, terre: 17, feu: 8, eau: 4, air: -7 } },
    moves: ['devotion_combative', 'chrono_calmant']
}

monsters.bruto_pernicieux = {
    id: 'bruto_pernicieux',
    name: 'Bruto Pernicieux',
    image: 'images/monsters/Bruto_Pernicieux.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 9900, atk: 800, spd: 100, res: { neutre: -10, terre: -15, feu: 16, eau: 11, air: 4 } },
    moves: ['metathese', 'pernipiege']
}

monsters.bruto_frenetique = {
    id: 'bruto_frenetique',
    name: 'Bruto Frénétique',
    image: 'images/monsters/Bruto_Frénétique.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 9900, atk: 800, spd: 100, res: { neutre: 3, terre: -7, feu: -16, eau: 19, air: 12 } },
    moves: ['bombarde_kantik']
}

monsters.bruto_colerique = {
    id: 'bruto_colerique',
    name: 'Bruto Colérique',
    image: 'images/monsters/Bruto_Colérique.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 9900, atk: 800, spd: 100, res: { neutre: 10, terre: -3, feu: -9, eau: -17, air: 15 } },
    moves: ['affaissement', 'encanaillement']
}

monsters.larve_cauchemardesque = {
    id: 'larve_cauchemardesque',
    name: 'Larve Cauchemardesque',
    image: 'images/monsters/Larve_Cauchemardesque.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 10000, atk: 800, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.toubibz_perturbe = {
    id: 'toubibz_perturbe',
    name: 'Toubibz perturbé',
    image: 'images/monsters/Toubibz_perturbé.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 10000, atk: 1000, spd: 100, res: { neutre: 6, terre: -9, feu: -3, eau: -4, air: 10 } },
    moves: []
}

monsters.gyrafor = {
    id: 'gyrafor',
    name: 'Gyrafor',
    image: 'images/monsters/Gyrafor.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 10000, atk: 640, spd: 100, res: { neutre: 10, terre: -10, feu: 10, eau: -10, air: 10 } },
    moves: []
}

monsters.gropotam = {
    id: 'gropotam',
    name: 'Gropotam',
    image: 'images/monsters/Gropotam.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 10000, atk: 640, spd: 100, res: { neutre: -10, terre: 10, feu: 10, eau: 10, air: -10 } },
    moves: []
}

monsters.amphibouc = {
    id: 'amphibouc',
    name: 'Amphibouc',
    image: 'images/monsters/Amphibouc.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 10000, atk: 640, spd: 100, res: { neutre: 10, terre: 10, feu: -10, eau: 10, air: -10 } },
    moves: []
}

monsters.bosko_tho = {
    id: 'bosko_tho',
    name: 'Bosko Tho',
    image: 'images/monsters/Bosko_Tho.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 11000, atk: 700, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['contre_courant']
}

monsters.draguisla_bonita = {
    id: 'draguisla_bonita',
    name: 'Draguisla Bonita',
    image: 'images/monsters/Draguisla_Bonita.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 11000, atk: 566, spd: 100, res: { neutre: 30, terre: 30, feu: 30, eau: 30, air: 30 } },
    moves: ['cratere', 'crachat_anesthesiant']
}

monsters.kamikabz_perturbe = {
    id: 'kamikabz_perturbe',
    name: 'Kamikabz perturbé',
    image: 'images/monsters/Kamikabz_perturbé.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 12000, atk: 1000, spd: 100, res: { neutre: 5, terre: 9, feu: -2, eau: -2, air: -10 } },
    moves: []
}

monsters.lapilope_perturbe = {
    id: 'lapilope_perturbe',
    name: 'Lapilope perturbé',
    image: 'images/monsters/Lapilope_perturbé.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 12000, atk: 800, spd: 100, res: { neutre: 10, terre: 10, feu: 10, eau: -10, air: -10 } },
    moves: []
}

monsters.krokille_mature_crue = {
    id: 'krokille_mature_crue',
    name: 'Krokille Mature Crue',
    image: 'images/monsters/Krokille_Mature_Crue.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 13000, atk: 63, spd: 100, res: { neutre: 10, terre: 10, feu: 10, eau: 10, air: 10 } },
    moves: []
}

monsters.chafer_lancier_veteran = {
    id: 'chafer_lancier_veteran',
    name: 'Chafer Lancier Vétéran',
    image: 'images/monsters/Chafer_Lancier_Vétéran.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 13000, atk: 600, spd: 100, res: { neutre: 15, terre: 5, feu: 30, eau: 20, air: 0 } },
    moves: []
}

monsters.quadrabz_perturbe = {
    id: 'quadrabz_perturbe',
    name: 'Quadrabz perturbé',
    image: 'images/monsters/Quadrabz_perturbé.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 13000, atk: 1000, spd: 100, res: { neutre: 4, terre: 0, feu: -11, eau: 8, air: -1 } },
    moves: []
}

monsters.brutapir_perturbe = {
    id: 'brutapir_perturbe',
    name: 'Brutapir perturbé',
    image: 'images/monsters/Brutapir_perturbé.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 13000, atk: 800, spd: 100, res: { neutre: -10, terre: -10, feu: 10, eau: 10, air: 10 } },
    moves: []
}

monsters.bruto_acharne = {
    id: 'bruto_acharne',
    name: 'Bruto Acharné',
    image: 'images/monsters/Bruto_Acharné.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 13000, atk: 800, spd: 100, res: { neutre: 20, terre: 12, feu: 5, eau: -14, air: -19 } },
    moves: ['inimitie', 'boulversement']
}

monsters.bruto_virulent = {
    id: 'bruto_virulent',
    name: 'Bruto Virulent',
    image: 'images/monsters/Bruto_Virulent.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 13000, atk: 800, spd: 100, res: { neutre: -14, terre: 16, feu: 11, eau: 4, air: -8 } },
    moves: ['perseverance', 'aveuglette']
}

monsters.gropotam_perturbe = {
    id: 'gropotam_perturbe',
    name: 'Gropotam perturbé',
    image: 'images/monsters/Gropotam_perturbé.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 13000, atk: 800, spd: 100, res: { neutre: 10, terre: 0, feu: -10, eau: 0, air: 0 } },
    moves: []
}

monsters.amphibouc_perturbe = {
    id: 'amphibouc_perturbe',
    name: 'Amphibouc perturbé',
    image: 'images/monsters/Amphibouc_perturbé.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 13000, atk: 800, spd: 100, res: { neutre: 10, terre: 10, feu: -10, eau: 10, air: -10 } },
    moves: []
}

monsters.monolithe = {
    id: 'monolithe',
    name: 'Monolithe',
    image: 'images/monsters/Monolithe.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 13000, atk: 800, spd: 100, res: { neutre: 50, terre: 20, feu: 20, eau: 20, air: 20 } },
    moves: []
}

monsters.balebz_perturbe = {
    id: 'balebz_perturbe',
    name: 'Balebz perturbé',
    image: 'images/monsters/Balebz_perturbé.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 14000, atk: 1000, spd: 100, res: { neutre: 7, terre: -4, feu: 11, eau: -8, air: -6 } },
    moves: []
}

monsters.gyrafor_perturbe = {
    id: 'gyrafor_perturbe',
    name: 'Gyrafor perturbé',
    image: 'images/monsters/Gyrafor_perturbé.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 14000, atk: 800, spd: 100, res: { neutre: 10, terre: 10, feu: -10, eau: 10, air: -10 } },
    moves: []
}

monsters.cocolune = {
    id: 'cocolune',
    name: 'Cocolune',
    image: 'images/monsters/Cocolune.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 15000, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['attraction_lunaire']
}

monsters.gromo_envahissant = {
    id: 'gromo_envahissant',
    name: 'Gromo Envahissant',
    image: 'images/monsters/Gromo_Envahissant.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 16000, atk: 800, spd: 100, res: { neutre: 17, terre: 15, feu: 2, eau: -12, air: -18 } },
    moves: ['talonnade', 'carcan']
}

monsters.gromo_ecrasant = {
    id: 'gromo_ecrasant',
    name: 'Gromo Écrasant',
    image: 'images/monsters/Gromo_Écrasant.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 16000, atk: 800, spd: 100, res: { neutre: -16, terre: 20, feu: 11, eau: 8, air: -2 } },
    moves: ['paralysie', 'anabolisme']
}

monsters.gromo_endurant = {
    id: 'gromo_endurant',
    name: 'Gromo Endurant',
    image: 'images/monsters/Gromo_Endurant.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 16000, atk: 800, spd: 100, res: { neutre: -5, terre: -15, feu: 24, eau: 11, air: 7 } },
    moves: ['ingurgitation', 'jonction']
}

monsters.gromo_intercepteur = {
    id: 'gromo_intercepteur',
    name: 'Gromo Intercepteur',
    image: 'images/monsters/Gromo_Intercepteur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 16000, atk: 800, spd: 100, res: { neutre: 7, terre: -8, feu: -16, eau: 25, air: 12 } },
    moves: ['chrono_interception', 'chrono_trig_heure', 'exclusion']
}

monsters.gromo_protecteur = {
    id: 'gromo_protecteur',
    name: 'Gromo Protecteur',
    image: 'images/monsters/Gromo_Protecteur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 16000, atk: 800, spd: 100, res: { neutre: 13, terre: 7, feu: -4, eau: -13, air: 23 } },
    moves: ['chronoclier', 'liquefaction']
}

monsters.cauchemar_des_ravageurs = {
    id: 'cauchemar_des_ravageurs',
    name: 'Cauchemar des Ravageurs',
    image: 'images/monsters/Cauchemar_des_Ravageurs.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 17000, atk: 800, spd: 100, res: { neutre: 18, terre: -11, feu: -8, eau: 12, air: 23 } },
    moves: ['tourments_eternels', 'intrusion_cauchemardesque', 'mauvais_reves', 'songe_d_une_nuit_d_enfer']
}

monsters.artroolleur = {
    id: 'artroolleur',
    name: 'Artroolleur',
    image: 'images/monsters/Artroolleur.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 19000, atk: 750, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['tir_d_artroollerie', 'mortrooll']
}

monsters.krokille_venerable_crue = {
    id: 'krokille_venerable_crue',
    name: 'Krokille Vénérable Crue',
    image: 'images/monsters/Krokille_Vénérable_Crue.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 22000, atk: 100, spd: 100, res: { neutre: 10, terre: 10, feu: 10, eau: 10, air: 40 } },
    moves: []
}

monsters.nitrooll = {
    id: 'nitrooll',
    name: 'Nitrooll',
    image: 'images/monsters/Nitrooll.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 22000, atk: 875, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['double_trooll', 'trooll_de_magie', 'troollement_de_tambour', 'coup_de_trooll']
}

monsters.bribes_de_gardien = {
    id: 'bribes_de_gardien',
    name: 'Bribes de gardien',
    image: 'images/monsters/Bribes_de_gardien.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 22000, atk: 2000, spd: 100, res: { neutre: 30, terre: 30, feu: 30, eau: 30, air: 30 } },
    moves: []
}

monsters.troollibre = {
    id: 'troollibre',
    name: 'Troollibre',
    image: 'images/monsters/Troollibre.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 25000, atk: 1000, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['troollpoline', 'aspiratrooll', 'patroolleur']
}

monsters.incarnation_du_ch_tyx = {
    id: 'incarnation_du_ch_tyx',
    name: 'Incarnation du Ch\'Tyx',
    image: 'images/monsters/Incarnation_du_Ch_Tyx.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 27000, atk: 640, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: []
}

monsters.mi = {
    id: 'mi',
    name: 'Mi',
    image: 'images/monsters/Mi.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 30000, atk: 800, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['enveloppage']
}

monsters.chi = {
    id: 'chi',
    name: 'Chi',
    image: 'images/monsters/Chi.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 30000, atk: 800, spd: 100, res: { neutre: 15, terre: 15, feu: 15, eau: 15, air: 15 } },
    moves: ['emoussage']
}

monsters.autel_de_la_chasse = {
    id: 'autel_de_la_chasse',
    name: 'Autel de la Chasse',
    image: 'images/monsters/Autel_de_la_Chasse.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 100000, atk: 640, spd: 100, res: { neutre: 100, terre: 100, feu: 100, eau: 100, air: 100 } },
    moves: []
}

monsters.gargandyas = {
    id: 'gargandyas',
    name: 'Gargandyas',
    image: 'images/monsters/Gargandyas.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 100000, atk: 1000, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['sceaux_telluriques', 'amnesie_animale', 'gargameha']
}

monsters.mama_troollette = {
    id: 'mama_troollette',
    name: 'Mama Troollette',
    image: 'images/monsters/Mama_Troollette.png',
    rarity: 'commun',
    tier: 'normal',
    bst: { hp: 150000, atk: 1125, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['troollooportation', 'uppertrooll', 'mitroollette_de_poings', 'catastrooll']
}

monsters.kardorib = {
    id: 'kardorib',
    name: 'Kardorib',
    image: 'images/monsters/Kardorib.png',
    rarity: 'peu_commun',
    tier: 'elite',
    bst: { hp: 60, atk: 20, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['embrochement'],
    ownerId: 'kardorim'
}

monsters.hommeOurs = {
    id: 'hommeOurs',
    name: 'Homme-Ours',
    image: 'images/monsters/hommeOurs.png',
    rarity: 'peu_commun',
    tier: 'elite',
    bst: { hp: 300, atk: 100, spd: 100, res: { neutre: 20, terre: 15, feu: 15, eau: 15, air: 15 } },
    moves: ['rage_de_Ours', 'griffe_de_ours']
}

monsters.Chef_de_Guerre_Bouftou = {
    id: 'Chef_de_Guerre_Bouftou',
    name: 'Chef de Guerre Bouftou',
    image: 'images/monsters/Chef_de_Guerre_Bouftou.png',
    rarity: 'peu_commun',
    tier: 'elite',
    bst: { hp: 170, atk: 88, spd: 100, res: { neutre: 11, terre: 0, feu: 0, eau: -9, air: 11 } },
    moves: ['fureur_du_bouftou', 'morsure_de_guerre']
}

monsters.scarafeuilleNoir = {
    id: 'scarafeuilleNoir',
    name: 'Scarafeuille Noir',
    image: 'images/monsters/Scarafeuille_Noir.png',
    rarity: 'peu_commun',
    tier: 'elite',
    bst: { hp: 340, atk: 100, spd: 100, res: { neutre: 100, terre: 20, feu: 20, eau: 20, air: 20 } },
    moves: ['elemental_dispersion', 'scaraforce', 'scarinvi']
}

monsters.scarafeuilleImmature = {
    id: 'scarafeuilleImmature',
    name: 'Scarafeuille Immature',
    image: 'images/monsters/Scarafeuille_Immature.png',
    rarity: 'commun',
    tier: 'elite',
    bst: { hp: 250, atk: 80, spd: 100, res: { neutre: -10, terre: 100, feu: -10, eau: -10, air: -10 } },
    moves: ['scarapoison'],
    ownerId: 'scarabosse_dore'
}

monsters.gloutoBlop = {
    id: 'gloutoBlop',
    name: 'Glouto Blop',
    image: 'images/monsters/GloutoBlop.png',
    rarity: 'peu_commun',
    tier: 'elite',
    bst: { hp: 800, atk: 208, spd: 110, res: { neutre: 21, terre: -9, feu: -24, eau: 26, air: 11 } },
    moves: ['gloutage']
}

monsters.dopeul_darkvlad = {
    id: 'dopeul_darkvlad',
    name: 'Dopeul Dark Vlad',
    image: 'images/monsters/Dopeul_Dark_Vlad.png',
    rarity: 'peu_commun',
    tier: 'elite',
    fixedLevel: 110,
    bst: { hp: 4800, atk: 500, spd: 130, res: { neutre: 50, terre: -20, feu: 40, eau: -20, air: 40 } },
    moves: ['lame_de_iop', 'lame_divine', 'tension']
}

monsters.boulepique = {
    id: 'boulepique',
    name: 'Boulepique',
    image: 'images/monsters/Boulepique.png',
    rarity: 'peu_commun',
    tier: 'elite',
    bst: { hp: 1000, atk: 133, spd: 110, res: { neutre: 11, terre: 1, feu: 21, eau: 16, air: 6 } },
    moves: ['Lance-boulettes', 'Pique_rate', 'Durcissement']
}

monsters.dragoeufAlbatre = {
    id: 'dragoeufAlbatre',
    name: 'Dragoeuf Albâtre',
    image: 'images/monsters/Dragoeuf_Albâtre.png',
    rarity: 'peu_commun',
    tier: 'elite',
    bst: { hp: 980, atk: 190, spd: 120, res: { neutre: 12, terre: 12, feu: 12, eau: 12, air: 12 } },
    moves: ['Dragloméra', 'Dralbatre']
}

monsters.arakne_majeure = {
    id: 'arakne_majeure',
    name: 'Arakne Majeure',
    image: 'images/monsters/Arakne_Majeure.png',
    rarity: 'peu_commun',
    tier: 'elite',
    bst: { hp: 400, atk: 100, spd: 115, res: { neutre: -14, terre: -14, feu: 10, eau: 10, air: -14 } },
    moves: ['Absorption_Sanguine', 'Ralentissement_Arakneen'],
    ownerId: 'abraknydeAncestral'
}

monsters.gorgouille = {
    id: 'gorgouille',
    name: 'Gorgouille',
    image: 'images/monsters/Gorgouille.png',
    rarity: 'rare',
    tier: 'elite',
    fixedLevel: 100,
    bst: { hp: 5300, atk: 0, spd: 130, res: { neutre: -5, terre: -5, feu: -5, eau: 38, air: 38 } },
    moves: ['Yotsu-Zumo', 'Oshi-Zumo']
}

monsters.tentaculePrimaire = {
    id: 'tentaculePrimaire',
    name: 'Tentacule Primaire',
    image: 'images/monsters/Tentacule_Primaire.png',
    rarity: 'rare',
    tier: 'elite',
    bst: { hp: 190, atk: 400, spd: 100, res: { neutre: 90, terre: 90, feu: 90, eau: 90, air: 0 } },
    moves: ['motivation_naturelle', 'kraken_primaire']
}

monsters.tentaculeSecondaire = {
    id: 'tentaculeSecondaire',
    name: 'Tentacule Secondaire',
    image: 'images/monsters/Tentacule_Secondaire.png',
    rarity: 'rare',
    tier: 'elite',
    bst: { hp: 190, atk: 400, spd: 100, res: { neutre: 90, terre: 90, feu: 90, eau: 0, air: 90 } },
    moves: ['kraken_secondaire', 'empoisonnement_tentaculaire']
}

monsters.tentaculeTertiaire = {
    id: 'tentaculeTertiaire',
    name: 'Tentacule Tertiaire',
    image: 'images/monsters/Tentacule_Tertiaire.png',
    rarity: 'rare',
    tier: 'elite',
    bst: { hp: 190, atk: 400, spd: 100, res: { neutre: 90, terre: 90, feu: 0, eau: 90, air: 90 } },
    moves: ['kraken_tertiaire', 'malediction_tentaculaire']
}

monsters.tentaculeQuartenaire = {
    id: 'tentaculeQuartenaire',
    name: 'Tentacule Quartenaire',
    image: 'images/monsters/Tentacule_Quaternaire.png',
    rarity: 'rare',
    tier: 'elite',
    bst: { hp: 250, atk: 520, spd: 100, res: { neutre: 95, terre: 0, feu: 95, eau: 95, air: 95 } },
    moves: ['paralysie_tentaculaire', 'kraken_quartenaire']
}

monsters.kardorim = {
    id: 'kardorim',
    name: 'Kardorim',
    image: 'images/monsters/Kardorim.png',
    rarity: 'peu_commun',
    tier: 'boss',
    bst: { hp: 250, atk: 100, spd: 100, res: { neutre: 10, terre: -15, feu: 20, eau: -10, air: 5 } },
    moves: ['cassecrane', 'appeldeKardorib']
}

monsters.mobLeponge = {
    id: 'mobLeponge',
    name: 'Mob l\'éponge',
    image: 'images/monsters/Mob_l_Éponge.png',
    rarity: 'peu_commun',
    tier: 'boss',
    bst: { hp: 450, atk: 120, spd: 110, res: { neutre: 14, terre: 14, feu: 14, eau: 14, air: 14 } },
    moves: ['degraissage', 'rincage', 'Regeneration_Spontanee']
}

monsters.tournesolAffame = {
    id: 'tournesolAffame',
    name: 'Tournesol Affamé',
    image: 'images/monsters/Tournesol_Affamé.png',
    rarity: 'peu_commun',
    tier: 'boss',
    bst: { hp: 600, atk: 120, spd: 100, res: { neutre: 25, terre: 25, feu: 25, eau: -10, air: -15 } },
    moves: ['soinFeuillu', 'appeldesChamps', 'goinfrage']
}

monsters.bouftouRoyal = {
    id: 'bouftouRoyal',
    name: 'Bouftou Royal',
    image: 'images/monsters/Bouftou_Royal.png',
    rarity: 'peu_commun',
    tier: 'boss',
    bst: { hp: 800, atk: 150, spd: 110, res: { neutre: 35, terre: 20, feu: 20, eau: 25, air: 5 } },
    moves: ['morsure_royale', 'guerison_bouftou', 'morsure_de_guerre', 'cuirasse_laineuse']
}

monsters.chafer_ronin = {
    id: 'chafer_ronin',
    name: 'Chafer Rōnin',
    image: 'images/monsters/Chafer_Rōnin.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 680, atk: 150, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['bushido', 'kikoha']
}

monsters.batofu = {
    id: 'batofu',
    name: 'Batofu',
    image: 'images/monsters/Batofu.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 760, atk: 108, spd: 150, res: { neutre: 37, terre: 9, feu: -14, eau: -4, air: 36 } },
    moves: ['gotame', 'beco_de_batofu', 'lancer_de_tofu_fugace', 'liberte']
}

monsters.coffre_des_forgerons = {
    id: 'coffre_des_forgerons',
    name: 'Coffre des Forgerons',
    image: 'images/monsters/Coffre_des_Forgerons.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 820, atk: 200, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['tchaiste', 'avidite']
}

monsters.boostache = {
    id: 'boostache',
    name: 'Boostache',
    image: 'images/monsters/Boostache.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 820, atk: 160, spd: 100, res: { neutre: 55, terre: 0, feu: 0, eau: 15, air: 85 } },
    moves: ['frayeurs', 'l_enfer_des_zombies', 'le_dentiste', 'esprit_empetrant']
}

monsters.kankreblath = {
    id: 'kankreblath',
    name: 'Kankreblath',
    image: 'images/monsters/Kankreblath.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 1020, atk: 200, spd: 100, res: { neutre: 0, terre: 34, feu: 12, eau: 26, air: 18 } },
    moves: ['blatheration', 'kankroulahoup', 'sfvc_r']
}

monsters.protozorreur = {
    id: 'protozorreur',
    name: 'Protozorreur',
    image: 'images/monsters/Protozorreur.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 1000, atk: 800, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['jet_proto', 'electrocution', 'infection']
}

monsters.kwakwa = {
    id: 'kwakwa',
    name: 'Kwakwa',
    image: 'images/monsters/Kwakwa.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 1100, atk: 300, spd: 130, res: { neutre: 80, terre: 80, feu: 80, eau: 80, air: 80 } },
    moves: ['kwarmee_kwayal', 'wakpot_kwayal', 'kwakoukas_kwayal', 'kwabolition']
}

monsters.directeur_grunob = {
    id: 'directeur_grunob',
    name: 'Directeur Grunob',
    image: 'images/monsters/Directeur_Grunob.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 1200, atk: 200, spd: 100, res: { neutre: 6, terre: -8, feu: -8, eau: 15, air: 15 } },
    moves: ['sermon_educatif', 'chachagobert', 'cuvee_des_gobs']
}

monsters.rakoopeur = {
    id: 'rakoopeur',
    name: 'Rakoopeur',
    image: 'images/monsters/Rakoopeur.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 1200, atk: 200, spd: 100, res: { neutre: 0, terre: 5, feu: 5, eau: 5, air: 5 } },
    moves: ['serpette', 'camaraderie']
}

monsters.sapik = {
    id: 'sapik',
    name: 'Sapik',
    image: 'images/monsters/Sapik.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 1300, atk: 144, spd: 100, res: { neutre: -20, terre: 20, feu: 20, eau: 20, air: 20 } },
    moves: ['enguirlandage', 'calin_kipik', 'kokapik']
}

monsters.draegnerys = {
    id: 'draegnerys',
    name: 'Draegnerys',
    image: 'images/monsters/Draegnerys.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 1400, atk: 220, spd: 130, res: { neutre: 12, terre: 8, feu: 17, eau: 10, air: 20 } },
    moves: ['Pepiniere', 'Knout', 'Drakaaris']
}

monsters.gelee_royale_bleuet = {
    id: 'gelee_royale_bleuet',
    name: 'Gelée Royale Bleuet',
    image: 'images/monsters/Gelée_Royale_Bleuet.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 1400, atk: 250, spd: 100, res: { neutre: 70, terre: 70, feu: 70, eau: -10, air: 70 } },
    moves: ['Isometrie', 'Royale_Bleuet_Os', 'Tartinade']
}

monsters.gelee_royale_menthe = {
    id: 'gelee_royale_menthe',
    name: 'Gelée Royale Menthe',
    image: 'images/monsters/Gelée_Royale_Menthe.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 1400, atk: 250, spd: 100, res: { neutre: 70, terre: -10, feu: 70, eau: 70, air: 70 } },
    moves: ['Tartinade', 'Pik_assaut', 'Royale_Menthe_Os']
}

monsters.gelee_royale_fraise = {
    id: 'gelee_royale_fraise',
    name: 'Gelée Royale Fraise',
    image: 'images/monsters/Gelée_Royale_Fraise.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 1400, atk: 250, spd: 100, res: { neutre: 70, terre: 70, feu: -10, eau: 70, air: 70 } },
    moves: ['Tartinade', 'Gelifiant', 'Royale_Fraise_Os']
}

monsters.gelee_royale_citron = {
    id: 'gelee_royale_citron',
    name: 'Gelée Royale Citron',
    image: 'images/monsters/Gelée_Royale_Citron.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 1400, atk: 250, spd: 100, res: { neutre: 70, terre: 70, feu: 70, eau: 70, air: -10 } },
    moves: ['Tartinade', 'Fixation_Beton', 'Royale_Citron_Os']
}

monsters.mawabouaino = {
    id: 'mawabouaino',
    name: 'Mawabouaino',
    image: 'images/monsters/Mawabouaino.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 1400, atk: 168, spd: 100, res: { neutre: 35, terre: 25, feu: 15, eau: 15, air: 15 } },
    moves: ['cacaobstwuant', 'chocohowte', 'eclat', 'chocolave']
}

monsters.bworkette = {
    id: 'bworkette',
    name: 'Bworkette',
    image: 'images/monsters/Bworkette.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 1600, atk: 190, spd: 100, res: { neutre: 33, terre: 33, feu: 48, eau: 18, air: 28 } },
    moves: ['abolissement', 'charge', 'mot_croise', 'reconstitution_bwork']
}

monsters.scarabosse_dore = {
    id: 'scarabosse_dore',
    name: 'Scarabosse Doré',
    image: 'images/monsters/Scarabosse_Doré.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 1600, atk: 280, spd: 100, res: { neutre: 24, terre: 24, feu: 24, eau: 24, air: 24 } },
    moves: ['picoti', 'naissance', 'premier_soins', 'expulsion']
}

monsters.kanniboul_ebil = {
    id: 'kanniboul_ebil',
    name: 'Kanniboul Ebil',
    image: 'images/monsters/Kanniboul_Ebil.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 1600, atk: 150, spd: 100, res: { neutre: -10, terre: 30, feu: 10, eau: 20, air: -10 } },
    moves: ['inspiration_moonesque', 'bouboule']
}

monsters.grozilla_somnambule = {
    id: 'grozilla_somnambule',
    name: 'Grozilla Somnambule',
    image: 'images/monsters/Grozilla.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 1600, atk: 130, spd: 100, res: { neutre: 20, terre: 20, feu: 50, eau: 20, air: 20 } },
    moves: ['tyrannisation', 'gravite']
}

monsters.grasmera_somnambule = {
    id: 'grasmera_somnambule',
    name: 'Grasmera Somnambule',
    image: 'images/monsters/Grasmera.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 1600, atk: 130, spd: 100, res: { neutre: 50, terre: 30, feu: 30, eau: 30, air: 30 } },
    moves: ['meteore']
}

monsters.gourlo_le_terrible = {
    id: 'gourlo_le_terrible',
    name: 'Gourlo le Terrible',
    image: 'images/monsters/Gourlo_le_Terrible.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 1900, atk: 140, spd: 100, res: { neutre: 200, terre: 200, feu: 200, eau: 200, air: 200 } },
    moves: ['invocation_de_tonneau', 'un_gros_boulet_sur_un_autre_boulet', 'bombarde']
}

monsters.nelween = {
    id: 'nelween',
    name: 'Nelween',
    image: 'images/monsters/Nelween.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 1900, atk: 280, spd: 100, res: { neutre: 20, terre: 5, feu: 15, eau: 20, air: 15 } },
    moves: ['exhalation_toxique', 'mord_mollet', 'soin_diffus']
}

monsters.gelee_fraise_royale = {
    id: 'gelee_fraise_royale',
    name: 'Gelée Fraise Royale',
    image: 'images/monsters/Gelée_Royale_Fraise.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 2000, atk: 400, spd: 120, res: { neutre: 70, terre: 70, feu: -10, eau: 70, air: 70 } },
    moves: ['Gelifiant', 'Royale_Fraise_Os', 'Tartinade']
}

monsters.gelee_bleuet_royale = {
    id: 'gelee_bleuet_royale',
    name: 'Gelée Bleuet Royale',
    image: 'images/monsters/Gelée_Royale_Bleuet.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 2000, atk: 400, spd: 120, res: { neutre: 70, terre: 70, feu: 70, eau: -10, air: 70 } },
    moves: ['Isometrie', 'Royale_Bleuet_Os', 'Tartinade']
}

monsters.gelee_menthe_royale = {
    id: 'gelee_menthe_royale',
    name: 'Gelée Menthe Royale',
    image: 'images/monsters/Gelée_Royale_Menthe.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 2000, atk: 400, spd: 120, res: { neutre: 70, terre: -10, feu: 70, eau: 70, air: 70 } },
    moves: ['Pik_assaut', 'Royale_Menthe_Os', 'Tartinade']
}

monsters.gelee_citron_royale = {
    id: 'gelee_citron_royale',
    name: 'Gelée Citron Royale',
    image: 'images/monsters/Gelée_Royale_Citron.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 2000, atk: 400, spd: 120, res: { neutre: 70, terre: 70, feu: 70, eau: 70, air: -10 } },
    moves: ['Fixation_Beton', 'Royale_Citron_Os', 'Tartinade']
}

monsters.shin_larve = {
    id: 'shin_larve',
    name: 'Shin Larve',
    image: 'images/monsters/Shin_Larve.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 2000, atk: 280, spd: 100, res: { neutre: 54, terre: 34, feu: 34, eau: -26, air: -26 } },
    moves: ['enlisement', 'convocation_gluante', 'deglutition']
}

monsters.corailleur_magistral = {
    id: 'corailleur_magistral',
    name: 'Corailleur Magistral',
    image: 'images/monsters/Corailleur_Magistral.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 2000, atk: 140, spd: 100, res: { neutre: 23, terre: -6, feu: 13, eau: 18, air: -7 } },
    moves: ['coraillement_magistral', 'lancer_de_corail_magistral', 'frappe_de_corail_magistrale']
}

monsters.dragonCochon = {
    id: 'dragonCochon',
    name: 'Dragon Cochon',
    image: 'images/monsters/Dragon_Cochon.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 2100, atk: 825, spd: 140, res: { neutre: 38, terre: 38, feu: 38, eau: -5, air: -5 } },
    moves: { pool: ['Ecrasement_Handicapant', 'Croutage', 'Immobilisation'], fixed: ['etourderie_Mortelle'] }
}

monsters.blopCocoRoyal = {
    id: 'blopCocoRoyal',
    name: 'Blop Coco Royal',
    image: 'images/monsters/Blop_Coco_Royal.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 2400, atk: 280, spd: 120, res: { neutre: -12, terre: -12, feu: -12, eau: -12, air: 94 } },
    moves: ['blotravail_Royal', 'blopunition_Royale_air', 'blotection_air']
}

monsters.blopGriotteRoyal = {
    id: 'blopGriotteRoyal',
    name: 'Blop Griotte Royal',
    image: 'images/monsters/Blop_Griotte_Royal.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 2400, atk: 280, spd: 120, res: { neutre: -12, terre: -12, feu: 94, eau: -12, air: -12 } },
    moves: ['blotravail_Royal', 'blopunition_Royale_feu', 'blotection_feu']
}

monsters.blopIndigoRoyal = {
    id: 'blopIndigoRoyal',
    name: 'Blop Indigo Royal',
    image: 'images/monsters/Blop_Indigo_Royal.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 2400, atk: 280, spd: 120, res: { neutre: -12, terre: -12, feu: -12, eau: 94, air: -12 } },
    moves: ['blotravail_Royal', 'blopunition_Royale_eau', 'blotection_eau']
}

monsters.blopReinetteRoyal = {
    id: 'blopReinetteRoyal',
    name: 'Blop Reinette Royal',
    image: 'images/monsters/Blop_Reinette_Royal.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 2400, atk: 280, spd: 120, res: { neutre: -12, terre: 94, feu: -12, eau: -12, air: -12 } },
    moves: ['blotravail_Royal', 'blopunition_Royale_terre', 'blotection_terre']
}

monsters.mantiscore = {
    id: 'mantiscore',
    name: 'Mantiscore',
    image: 'images/monsters/Mantiscore.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 2600, atk: 200, spd: 120, res: { neutre: 42, terre: 27, feu: 18, eau: 10, air: 33 } },
    moves: ['darmocles', 'force_Poigne', 'tombeau_du_desert', 'garde_bouclier']
}

monsters.choudini = {
    id: 'choudini',
    name: 'Choudini',
    image: 'images/monsters/Choudini.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 2900, atk: 360, spd: 100, res: { neutre: 0, terre: 20, feu: 20, eau: 20, air: 20 } },
    moves: ['reste_assis', 'vinriktus', 'detriktus']
}

monsters.wa_wabbit = {
    id: 'wa_wabbit',
    name: 'Wa Wabbit',
    image: 'images/monsters/Wa_Wabbit.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 3000, atk: 128, spd: 100, res: { neutre: 28, terre: 28, feu: 18, eau: -7, air: -12 } },
    moves: ['wawabehameha', 'abrutissement', 'awmuwe_woyale', 'cawotte_woyale']
}

monsters.le_chouque = {
    id: 'le_chouque',
    name: 'Le Chouque',
    image: 'images/monsters/Le_Chouque.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 3100, atk: 300, spd: 100, res: { neutre: 14, terre: 0, feu: -10, eau: 36, air: 0 } },
    moves: ['coup_de_sabre_maudit']
}

monsters.craqueleur_legendaire = {
    id: 'craqueleur_legendaire',
    name: 'Craqueleur Légendaire',
    image: 'images/monsters/Craqueleur_Légendaire.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 3100, atk: 235, spd: 100, res: { neutre: 58, terre: -12, feu: 58, eau: 67, air: -17 } },
    moves: ['peau_de_granite', 'pierre_etourdissante', 'peau_de_silex', 'invocation_montagnarde', 'peau_de_topaze', 'coeur_de_craqueleur', 'frappe_du_craqueleur_legendaire']
}

monsters.halouine = {
    id: 'halouine',
    name: 'Halouine',
    image: 'images/monsters/Halouine.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 3300, atk: 330, spd: 100, res: { neutre: 13, terre: 15, feu: 0, eau: 18, air: 5 } },
    moves: ['rattirance', 'moissonnage', 'plantes_zombies', 'citwouille_explosive']
}

monsters.tofu_royal = {
    id: 'tofu_royal',
    name: 'Tofu Royal',
    image: 'images/monsters/Tofu_Royal.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 3400, atk: 300, spd: 100, res: { neutre: 38, terre: 23, feu: 18, eau: 23, air: 58 } },
    moves: ['dechiquetage', 'ecrasement_royal', 'invocation_royale_de_tofu', 'beco_du_tofu_royal']
}

monsters.blop_multicolore_royal = {
    id: 'blop_multicolore_royal',
    name: 'Blop Multicolore Royal',
    image: 'images/monsters/Blop_Multicolore_Royal.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 3400, atk: 350, spd: 100, res: { neutre: -15, terre: 15, feu: 15, eau: 15, air: 15 } },
    moves: ['blopoutrage_royal', 'blopacification']
}

monsters.wa_wobot = {
    id: 'wa_wobot',
    name: 'Wa Wobot',
    image: 'images/monsters/Wa_Wobot.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 3500, atk: 200, spd: 100, res: { neutre: -10, terre: 16, feu: 8, eau: 25, air: 21 } },
    moves: ['mekattwaction', 'twansmutation', 'mekawapace', 'wouste', 'substitution']
}

monsters.abraknydeAncestral = {
    id: 'abraknydeAncestral',
    name: 'Abraknyde Ancestral',
    image: 'images/monsters/Abraknyde_Ancestral.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 3600, atk: 605, spd: 90, res: { neutre: 53, terre: 53, feu: -5, eau: 53, air: -5 } },
    moves: ['Morsure_Sylvestre', 'Branche_Paralysante', 'Invocation_d_Arakne_Majeure', 'Reconstitution_Abraknydienne']
}

monsters.reine_nyee = {
    id: 'reine_nyee',
    name: 'Reine Nyée',
    image: 'images/monsters/Reine_Nyée.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 3600, atk: 300, spd: 100, res: { neutre: 20, terre: 30, feu: -5, eau: -20, air: 40 } },
    moves: ['ponte_d_oeuf', 'cisaillage', 'mitraille_de_soie']
}

monsters.kralamoureGeant = {
    id: 'kralamoureGeant',
    name: 'Kralamoure Geant',
    image: 'images/monsters/Kralamoure_Géant.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 3700, atk: 1600, spd: 100, res: { neutre: 900, terre: 900, feu: 900, eau: 900, air: 900 } },
    moves: ['kracheau_immobilisant', 'vulnerabilite_de_la_tourbiere', 'kraken', 'tourbe_ecrasante']
}

monsters.moon = {
    id: 'moon',
    name: 'Moon',
    image: 'images/monsters/Moon.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 3700, atk: 300, spd: 100, res: { neutre: 200, terre: 200, feu: 200, eau: 200, air: 200 } },
    moves: ['marteau_de_moon', 'choc_sismique', 'face_cachee']
}

monsters.mallefisk = {
    id: 'mallefisk',
    name: 'Malléfisk',
    image: 'images/monsters/Malléfisk.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 3700, atk: 300, spd: 100, res: { neutre: 22, terre: 12, feu: 28, eau: 6, air: -5 } },
    moves: ['ka_dabor', 'chte_hu', 'nonoube_noharnak']
}

monsters.tynril_consterne = {
    id: 'tynril_consterne',
    name: 'Tynril Consterné',
    image: 'images/monsters/Tynril_Consterné.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 3800, atk: 350, spd: 100, res: { neutre: 200, terre: 200, feu: 200, eau: 200, air: 0 } },
    moves: ['hiffe', 'helse', 'forque']
}

monsters.tynril_deconcerte = {
    id: 'tynril_deconcerte',
    name: 'Tynril Déconcerté',
    image: 'images/monsters/Tynril_Déconcerté.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 3800, atk: 350, spd: 100, res: { neutre: 200, terre: 200, feu: 200, eau: 0, air: 200 } },
    moves: ['hiffe_eau', 'helse_eau']
}

monsters.tynril_perfide = {
    id: 'tynril_perfide',
    name: 'Tynril Perfide',
    image: 'images/monsters/Tynril_Perfide.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 3800, atk: 350, spd: 100, res: { neutre: 200, terre: 200, feu: 0, eau: 200, air: 200 } },
    moves: ['hiffe_feu', 'helse']
}

monsters.tynril_ahuri = {
    id: 'tynril_ahuri',
    name: 'Tynril Ahuri',
    image: 'images/monsters/Tynril_Ahuri.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 3800, atk: 350, spd: 100, res: { neutre: 200, terre: 0, feu: 200, eau: 200, air: 200 } },
    moves: ['hiffe_terre', 'helse_terre']
}

monsters.papa_nowel = {
    id: 'papa_nowel',
    name: 'Papa Nowel',
    image: 'images/monsters/Papa_Nowel.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 3900, atk: 1300, spd: 100, res: { neutre: -2, terre: -2, feu: 40, eau: 40, air: 40 } },
    moves: ['engluement', 'dichotomie', 'aspir_nenfan', 'embuche_de_nowel', 'trak_nenfan', 'infantophagie']
}

monsters.Rathrosk = {
    id: 'Rathrosk',
    name: 'Rathrosk',
    image: 'images/monsters/Rathrosk.png',
    rarity: 'legendaire',
    tier: 'boss',
    bst: { hp: 4000, atk: 320, spd: 125, res: { neutre: 25, terre: 25, feu: 25, eau: 25, air: 25 } },
    moves: ['souffle_de_rathrosk', 'queue_du_dragon', 'regain_de_vie']
}

monsters.ush_galesh = {
    id: 'ush_galesh',
    name: 'Ush Galesh',
    image: 'images/monsters/Ush_Galesh.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 4000, atk: 500, spd: 100, res: { neutre: 20, terre: 10, feu: 20, eau: 20, air: 10 } },
    moves: ['eclair_rouge', 'pulsation_malsaine']
}

monsters.minotoror = {
    id: 'minotoror',
    name: 'Minotoror',
    image: 'images/monsters/Minotoror.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 4100, atk: 325, spd: 100, res: { neutre: 40, terre: -20, feu: 50, eau: 60, air: 50 } },
    moves: ['lancer_de_tofu', 'graines_magiques', 'sabotage']
}

monsters.founoroshi = {
    id: 'founoroshi',
    name: 'Founoroshi',
    image: 'images/monsters/Founoroshi.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 4200, atk: 500, spd: 100, res: { neutre: 50, terre: 15, feu: 35, eau: 5, air: 10 } },
    moves: ['fumee_alourdissante', 'fumee_asphyxiante', 'fumee_aveuglante', 'fumee_brulante', 'petards_volants']
}

monsters.rat_noir = {
    id: 'rat_noir',
    name: 'Rat Noir',
    image: 'images/monsters/Rat_Noir.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 4400, atk: 380, spd: 100, res: { neutre: 5, terre: 50, feu: -20, eau: 20, air: -20 } },
    moves: ['rafale']
}

monsters.rat_blanc = {
    id: 'rat_blanc',
    name: 'Rat Blanc',
    image: 'images/monsters/Rat_Blanc.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 4400, atk: 380, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['ravage']
}

monsters.pounicheur = {
    id: 'pounicheur',
    name: 'Pounicheur',
    image: 'images/monsters/Pounicheur.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 4400, atk: 300, spd: 100, res: { neutre: 12, terre: 28, feu: -5, eau: 23, air: 12 } },
    moves: ['kissifrotsipik', 'poulverisation']
}

monsters.maitre_corbac = {
    id: 'maitre_corbac',
    name: 'Maître Corbac',
    image: 'images/monsters/Maître_Corbac.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 4500, atk: 440, spd: 100, res: { neutre: 25, terre: 25, feu: 45, eau: 55, air: 55 } },
    moves: ['sanction_tenebreuse', 'lien_volatile', 'invocation_de_corbac', 'carapace_d_ailes']
}

monsters.skeunk = {
    id: 'skeunk',
    name: 'Skeunk',
    image: 'images/monsters/Skeunk.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 4700, atk: 163, spd: 100, res: { neutre: 28, terre: 28, feu: -5, eau: -5, air: 38 } },
    moves: ['chant_regenerant', 'chant_stimulant', 'chant_de_jouvence', 'chant_immobilisant', 'chant_foudroyant']
}

monsters.grozilla_epuise = {
    id: 'grozilla_epuise',
    name: 'Grozilla Épuisé',
    image: 'images/monsters/Grozilla.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 4800, atk: 400, spd: 100, res: { neutre: 20, terre: 20, feu: 50, eau: 20, air: 20 } },
    moves: []
}

monsters.grasmera_epuise = {
    id: 'grasmera_epuise',
    name: 'Grasmera Épuisé',
    image: 'images/monsters/Grasmera.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 4800, atk: 400, spd: 100, res: { neutre: 50, terre: 30, feu: 30, eau: 30, air: 30 } },
    moves: ['meteore']
}

monsters.nagate = {
    id: 'nagate',
    name: 'Nagate',
    image: 'images/monsters/Nagate.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 4900, atk: 460, spd: 100, res: { neutre: 5, terre: 5, feu: -5, eau: 15, air: 10 } },
    moves: ['eau_fraiche', 'hatsunamiku', 'colere_bouillonnante', 'hors_de_ma_vue', 'invocation_de_bombombre_de_nagate']
}

monsters.royalmouth = {
    id: 'royalmouth',
    name: 'Royalmouth',
    image: 'images/monsters/Royalmouth.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 5000, atk: 500, spd: 100, res: { neutre: 23, terre: 33, feu: 26, eau: -11, air: 48 } },
    moves: ['regroupmouth', 'lichemouth', 'aleamouth']
}

monsters.fraktale = {
    id: 'fraktale',
    name: 'Fraktale',
    image: 'images/monsters/Fraktale.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 5000, atk: 300, spd: 100, res: { neutre: 26, terre: 12, feu: 21, eau: -8, air: 9 } },
    moves: ['instabilite_temporelle', 'chaleur_fugace', 'frakasse']
}

monsters.damadrya = {
    id: 'damadrya',
    name: 'Damadrya',
    image: 'images/monsters/Damadrya.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 5000, atk: 380, spd: 100, res: { neutre: 7, terre: 12, feu: 2, eau: 8, air: 10 } },
    moves: ['aubepine', 'bourgeonnement', 'urticaire']
}

monsters.haute_truche = {
    id: 'haute_truche',
    name: 'Haute Truche',
    image: 'images/monsters/Haute_Truche.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 5200, atk: 600, spd: 100, res: { neutre: -15, terre: 10, feu: 10, eau: 30, air: 25 } },
    moves: ['prendre_son_pied', 'flatulences_buccales', 'degazage', 'tete_dans_le_sable']
}

monsters.roissingue = {
    id: 'roissingue',
    name: 'Roissingue',
    image: 'images/monsters/Roissingue.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 5500, atk: 600, spd: 140, res: { neutre: 22, terre: 12, feu: -30, eau: 41, air: 5 } },
    moves: ['retour_du_roi', 'depouillage', 'dechaussage']
}

monsters.el_piko = {
    id: 'el_piko',
    name: 'El Piko',
    image: 'images/monsters/El_Piko.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 5600, atk: 520, spd: 100, res: { neutre: 30, terre: 20, feu: 15, eau: 25, air: 20 } },
    moves: ['pikak', 'pikepik', 'bamba']
}

monsters.meulou = {
    id: 'meulou',
    name: 'Meulou',
    image: 'images/monsters/Meulou.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 5700, atk: 400, spd: 100, res: { neutre: 20, terre: 30, feu: -5, eau: 40, air: 40 } },
    moves: ['etripage', 'rage_reconstituante']
}

monsters.capitaine_ekarlatte = {
    id: 'capitaine_ekarlatte',
    name: 'Capitaine Ekarlatte',
    image: 'images/monsters/Capitaine_Ekarlatte.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 5700, atk: 400, spd: 100, res: { neutre: 12, terre: 23, feu: 7, eau: 14, air: 31 } },
    moves: ['case_depart', 'tourbilaule', 'dansorcellement', 'enfumage']
}

monsters.kharnozor = {
    id: 'kharnozor',
    name: 'Kharnozor',
    image: 'images/monsters/Kharnozor.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 5700, atk: 400, spd: 100, res: { neutre: 10, terre: 10, feu: 10, eau: 10, air: 10 } },
    moves: ['Mort_sure']
}

monsters.koulosse = {
    id: 'koulosse',
    name: 'Koulosse',
    image: 'images/monsters/Koulosse.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 5800, atk: 2625, spd: 100, res: { neutre: 78, terre: 28, feu: -12, eau: -12, air: 33 } },
    moves: ['invocation_de_bouftou_des_cavernes', 'calumet_de_la_paix', 'appel_du_koulosse', 'souffle_du_koulosse']
}

monsters.shihan = {
    id: 'shihan',
    name: 'Shihan',
    image: 'images/monsters/Shihan.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 5800, atk: 500, spd: 100, res: { neutre: 15, terre: -15, feu: 10, eau: -20, air: 30 } },
    moves: ['qikong', 'grande_lame_du_vent', 'ba_gua_zhang', 'brise_apaisante']
}

monsters.hanshi = {
    id: 'hanshi',
    name: 'Hanshi',
    image: 'images/monsters/Hanshi.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 5800, atk: 500, spd: 100, res: { neutre: -20, terre: 10, feu: -15, eau: 20, air: 25 } },
    moves: ['source_des_vents', 'jufang', 'da_bang', 'ang_eurfiste']
}

monsters.maitre_des_pantins = {
    id: 'maitre_des_pantins',
    name: 'Maître des Pantins',
    image: 'images/monsters/Maître_des_Pantins.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 6000, atk: 200, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['tirer_les_ficelles']
}

monsters.tanukoui_san = {
    id: 'tanukoui_san',
    name: 'Tanukouï San',
    image: 'images/monsters/Tanukouï_San.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 6100, atk: 460, spd: 100, res: { neutre: 30, terre: 15, feu: -25, eau: -2, air: 15 } },
    moves: ['coup_de_boules', 'uchimizu', 'casse_noisettes', 'tibagin', 'boulodrome']
}

monsters.sphincter_cell = {
    id: 'sphincter_cell',
    name: 'Sphincter Cell',
    image: 'images/monsters/Sphincter_Cell.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 6400, atk: 355, spd: 100, res: { neutre: 200, terre: 200, feu: 200, eau: 200, air: 200 } },
    moves: ['raccourci', 'rasoir', 'mutagen']
}

monsters.jorbak = {
    id: 'jorbak',
    name: 'Jorbak',
    image: 'images/monsters/Jorbak.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 6500, atk: 440, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['la_pelle_du_large', 'la_pierre_philosophale']
}

monsters.mansot_royal = {
    id: 'mansot_royal',
    name: 'Mansot Royal',
    image: 'images/monsters/Mansot_Royal.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 6500, atk: 600, spd: 100, res: { neutre: 29, terre: 25, feu: 24, eau: 34, air: 22 } },
    moves: ['mansoluble', 'mansolenoide']
}

monsters.bethel_akarna = {
    id: 'bethel_akarna',
    name: 'Bethel Akarna',
    image: 'images/monsters/Bethel_Akarna.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 6500, atk: 800, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['pantang', 'etoile_de_mer']
}

monsters.croqueleur = {
    id: 'croqueleur',
    name: 'Croqueleur',
    image: 'images/monsters/Croqueleur.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 6800, atk: 467, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['attraction_gourmande', 'total_impwakt', 'croustichoc']
}

monsters.kimbo = {
    id: 'kimbo',
    name: 'Kimbo',
    image: 'images/monsters/Kimbo.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 6900, atk: 3100, spd: 100, res: { neutre: 400, terre: 400, feu: 400, eau: 400, air: 400 } },
    moves: ['boum_boh', 'invocation_du_disciple', 'etat_pair', 'etat_impair', 'furie_du_kimbo', 'teleportation_du_kimbo']
}

monsters.crocabulia = {
    id: 'crocabulia',
    name: 'Crocabulia',
    image: 'images/monsters/Crocabulia.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 7000, atk: 500, spd: 100, res: { neutre: 13, terre: 15, feu: 21, eau: 18, air: 9 } },
    moves: ['souffle']
}

monsters.silf_le_rasboul_majeur = {
    id: 'silf_le_rasboul_majeur',
    name: 'Silf le Rasboul Majeur',
    image: 'images/monsters/Silf_le_Rasboul_Majeur.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 7000, atk: 215, spd: 100, res: { neutre: 200, terre: 200, feu: 200, eau: 200, air: 200 } },
    moves: ['rasage', 'hololole', 'recrutement']
}

monsters.hell_mina = {
    id: 'hell_mina',
    name: 'Hell Mina',
    image: 'images/monsters/Hell_Mina.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 7200, atk: 540, spd: 100, res: { neutre: -17, terre: 12, feu: 31, eau: -9, air: -7 } },
    moves: ['bond_malefique', 'fatalite', 'extermination_iopesque', 'prejudice']
}

monsters.ben_le_ripate = {
    id: 'ben_le_ripate',
    name: 'Ben le Ripate',
    image: 'images/monsters/Ben_le_Ripate.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 7200, atk: 700, spd: 100, res: { neutre: 24, terre: 16, feu: 17, eau: 20, air: 26 } },
    moves: ['mousse_haillon', 'tore_tue', 'frere_de_la_cote', 'mate_l_eau']
}

monsters.chene_mou = {
    id: 'chene_mou',
    name: 'Chêne Mou',
    image: 'images/monsters/Chêne_Mou.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 7800, atk: 650, spd: 100, res: { neutre: 82, terre: 52, feu: 52, eau: -5, air: -5 } },
    moves: ['Complicite']
}

monsters.obsidiantre = {
    id: 'obsidiantre',
    name: 'Obsidiantre',
    image: 'images/monsters/Obsidiantre.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 8000, atk: 800, spd: 100, res: { neutre: 25, terre: 23, feu: 27, eau: 21, air: 26 } },
    moves: ['objection', 'scie_lisse', 'andesite', 'scie_licate']
}

monsters.shogun_tofugawa = {
    id: 'shogun_tofugawa',
    name: 'Shogun Tofugawa',
    image: 'images/monsters/Shogun_Tofugawa.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 8000, atk: 630, spd: 100, res: { neutre: -20, terre: 5, feu: -10, eau: 10, air: 20 } },
    moves: ['hageshi_kaze', 'aspiration_du_yokomainu', 'shin_kudaigyoku']
}

monsters.ougah = {
    id: 'ougah',
    name: 'Ougah',
    image: 'images/monsters/Ougah.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 8400, atk: 900, spd: 100, res: { neutre: 18, terre: 13, feu: 15, eau: 20, air: 20 } },
    moves: ['bizarrerie', 'opiniatrete', 'sirop_spore', 'spore_hanchambre', 'les_coprins_d_abord']
}

monsters.kanigroula = {
    id: 'kanigroula',
    name: 'Kanigroula',
    image: 'images/monsters/Kanigroula.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 8400, atk: 600, spd: 100, res: { neutre: 40, terre: 20, feu: 15, eau: 25, air: 15 } },
    moves: ['chachyene_cinglante', 'rugissement_matriarcal', 'motivation_captivante']
}

monsters.kolosso = {
    id: 'kolosso',
    name: 'Kolosso',
    image: 'images/monsters/Kolosso.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 8600, atk: 750, spd: 100, res: { neutre: 25, terre: 16, feu: 22, eau: 10, air: 29 } },
    moves: ['razepoutine', 'baikal', 'illyana']
}

monsters.professeur_xa = {
    id: 'professeur_xa',
    name: 'Professeur Xa',
    image: 'images/monsters/Professeur_Xa.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 8600, atk: 750, spd: 100, res: { neutre: 18, terre: 24, feu: 29, eau: 16, air: 9 } },
    moves: ['acolyte', 'cerebro']
}

monsters.phossile = {
    id: 'phossile',
    name: 'Phossile',
    image: 'images/monsters/Phossile.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 8600, atk: 500, spd: 100, res: { neutre: -5, terre: 22, feu: 28, eau: 13, air: 37 } },
    moves: ['roc_phorreur', 'phorce', 'bain_de_lave', 'epicentre']
}

monsters.tengu_givrefoux = {
    id: 'tengu_givrefoux',
    name: 'Tengu Givrefoux',
    image: 'images/monsters/Tengu_Givrefoux.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 8800, atk: 700, spd: 100, res: { neutre: 33, terre: 13, feu: 19, eau: 28, air: 21 } },
    moves: ['torgnole_givree', 'calin_frigorifique', 'farce', 'foux_d_amour', 'malice_glacee']
}

monsters.xlii = {
    id: 'xlii',
    name: 'XLII',
    image: 'images/monsters/XLII.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 8800, atk: 600, spd: 100, res: { neutre: 6, terre: 2, feu: 18, eau: 8, air: 26 } },
    moves: ['coquetterie', 'souffle_demoniaque', 'dereglement']
}

monsters.koumiho = {
    id: 'koumiho',
    name: 'Koumiho',
    image: 'images/monsters/Koumiho.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 8800, atk: 680, spd: 100, res: { neutre: 19, terre: -11, feu: 23, eau: -6, air: 12 } },
    moves: ['hoshi_no_tama', 'no_raj', 'aura_des_kitsounebi', 'koumiho_no_kaze', 'supaku', 'pougix', 'kaiyo', 'retraite']
}

monsters.superviz_uf = {
    id: 'superviz_uf',
    name: 'Supervizœuf',
    image: 'images/monsters/Supervizœuf.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 8800, atk: 600, spd: 100, res: { neutre: -11, terre: 5, feu: 2, eau: 1, air: 3 } },
    moves: ['invokabombz', 'bzelan', 'carapabz', 'clonabz', 'abzlation', 'bzovolution']
}

monsters.bworker = {
    id: 'bworker',
    name: 'Bworker',
    image: 'images/monsters/Bworker.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 9600, atk: 720, spd: 100, res: { neutre: 20, terre: 30, feu: 25, eau: 20, air: -15 } },
    moves: ['sanction_bwork', 'correction_bwork', 'fauchoir']
}

monsters.pere_fwetar = {
    id: 'pere_fwetar',
    name: 'Père Fwetar',
    image: 'images/monsters/Père_Fwetar.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 9600, atk: 320, spd: 100, res: { neutre: -2, terre: -2, feu: 30, eau: 30, air: 30 } },
    moves: ['fwetage', 'parade_des_vieux_jouets', 'invocation_de_jouet_casse']
}

monsters.korriandre = {
    id: 'korriandre',
    name: 'Korriandre',
    image: 'images/monsters/Korriandre.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 9700, atk: 700, spd: 100, res: { neutre: 45, terre: 9, feu: 15, eau: 5, air: 17 } },
    moves: ['riraule', 'loute', 'hairpay', 'paixe']
}

monsters.toxoliath = {
    id: 'toxoliath',
    name: 'Toxoliath',
    image: 'images/monsters/Toxoliath.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 9700, atk: 600, spd: 100, res: { neutre: 26, terre: 13, feu: 19, eau: 32, air: 23 } },
    moves: ['venin_salvateur', 'poison_volatile', 'vile_ruse', 'flacune']
}

monsters.agonie_la_deterree = {
    id: 'agonie_la_deterree',
    name: 'Agonie la Déterrée',
    image: 'images/monsters/Agonie_la_Déterrée.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 9900, atk: 800, spd: 100, res: { neutre: 18, terre: 34, feu: 13, eau: 15, air: 26 } },
    moves: ['frappe_cristalline', 'rale_d_agonie', 'geomancie']
}

monsters.shuccube = {
    id: 'shuccube',
    name: 'Shuccube',
    image: 'images/monsters/Shuccube.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 9900, atk: 800, spd: 100, res: { neutre: 7, terre: -5, feu: 23, eau: 18, air: 12 } },
    moves: ['bouillonnement', 'subreptice', 'ason_inshu', 'shurprise', 'shuculbute', 'piege_a_remous', 'affouillement']
}

monsters.noximilien_l_horloger = {
    id: 'noximilien_l_horloger',
    name: 'Noximilien l\'Horloger',
    image: 'images/monsters/Noximilien_l_Horloger.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 9900, atk: 800, spd: 100, res: { neutre: 9, terre: 17, feu: 34, eau: 22, air: 13 } },
    moves: ['temps_de_retard']
}

monsters.minotot = {
    id: 'minotot',
    name: 'Minotot',
    image: 'images/monsters/Minotot.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 10000, atk: 600, spd: 100, res: { neutre: 40, terre: 40, feu: 40, eau: -5, air: -5 } },
    moves: ['destinos', 'mythos', 'kitos', 'motivatos']
}

monsters.grozilla_fatigue = {
    id: 'grozilla_fatigue',
    name: 'Grozilla Fatigué',
    image: 'images/monsters/Grozilla.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 10000, atk: 680, spd: 100, res: { neutre: 20, terre: 20, feu: 50, eau: 20, air: 20 } },
    moves: []
}

monsters.grasmera_fatigue = {
    id: 'grasmera_fatigue',
    name: 'Grasmera Fatigué',
    image: 'images/monsters/Grasmera.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 10000, atk: 680, spd: 100, res: { neutre: 50, terre: 30, feu: 30, eau: 30, air: 30 } },
    moves: ['meteore']
}

monsters.glourseleste = {
    id: 'glourseleste',
    name: 'Glourséleste',
    image: 'images/monsters/Glourséleste.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 11000, atk: 750, spd: 100, res: { neutre: 25, terre: 21, feu: 16, eau: 24, air: 23 } },
    moves: ['gloursondulation', 'gloursombre', 'petit_glours_brun']
}

monsters.grolloum = {
    id: 'grolloum',
    name: 'Grolloum',
    image: 'images/monsters/Grolloum.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 11000, atk: 1000, spd: 100, res: { neutre: 34, terre: 21, feu: 31, eau: -5, air: 24 } },
    moves: ['frimas', 'gelee_blanche', 'banquise', 'cycle']
}

monsters.fuji_givrefoux_nourriciere = {
    id: 'fuji_givrefoux_nourriciere',
    name: 'Fuji Givrefoux Nourricière',
    image: 'images/monsters/Fuji_Givrefoux_Nourricière.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 11000, atk: 750, spd: 100, res: { neutre: -6, terre: 6, feu: 14, eau: 12, air: -11 } },
    moves: ['progeniture', 'lait_maternel', 'foufoux']
}

monsters.ombre = {
    id: 'ombre',
    name: 'Ombre',
    image: 'images/monsters/Ombre.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 11000, atk: 600, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['liaison', 'distorsion', 'penombre']
}

monsters.comte_razof = {
    id: 'comte_razof',
    name: 'Comte Razof',
    image: 'images/monsters/Comte_Razof.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 11000, atk: 760, spd: 100, res: { neutre: 100, terre: 120, feu: 115, eau: 135, air: 105 } },
    moves: ['pelliste', 'archi_pelle', 'chasse_gardee', 'trophee_de_chasse']
}

monsters.julith = {
    id: 'julith',
    name: 'Julith',
    image: 'images/monsters/Julith.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 11000, atk: 800, spd: 100, res: { neutre: 100, terre: 100, feu: 100, eau: 100, air: 100 } },
    moves: ['charge_eclair']
}

monsters.dathura = {
    id: 'dathura',
    name: 'Dathura',
    image: 'images/monsters/Dathura.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 11000, atk: 800, spd: 100, res: { neutre: 10, terre: 10, feu: 10, eau: 10, air: 10 } },
    moves: ['tige_empoisonnee', 'bulbombe', 'pistil_affaiblissant']
}

monsters.pere_ver = {
    id: 'pere_ver',
    name: 'Père Ver',
    image: 'images/monsters/Père_Ver.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 12000, atk: 680, spd: 100, res: { neutre: 35, terre: 20, feu: 10, eau: 10, air: 50 } },
    moves: ['paternalisme', 'coup_d_il', 'bien_vu_l_aveugle']
}

monsters.larve_de_rushu = {
    id: 'larve_de_rushu',
    name: 'Larve de Rushu',
    image: 'images/monsters/Larve_de_Rushu.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 12000, atk: 800, spd: 100, res: { neutre: 19, terre: -10, feu: 26, eau: 14, air: -7 } },
    moves: ['temps_mort', 'combustion_lente', 'catachronie', 'alentissement', 'contraction_temporelle', 'inexorabilis', 'chronostase']
}

monsters.leorictus_le_roi_grimacant = {
    id: 'leorictus_le_roi_grimacant',
    name: 'Léorictus le Roi Grimaçant',
    image: 'images/monsters/Léorictus_le_Roi_Grimaçant.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 12000, atk: 800, spd: 100, res: { neutre: 16, terre: 23, feu: 15, eau: 19, air: 10 } },
    moves: ['mortelage', 'oppression', 'trombe_d_acier', 'martel']
}

monsters.klime = {
    id: 'klime',
    name: 'Klime',
    image: 'images/monsters/Klime.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 13000, atk: 700, spd: 100, res: { neutre: 14, terre: 27, feu: 16, eau: 9, air: 25 } },
    moves: ['cuir_a_feu_doux', 'cuir_moustache', 'moustacheron']
}

monsters.missiz_frizz = {
    id: 'missiz_frizz',
    name: 'Missiz Frizz',
    image: 'images/monsters/Missiz_Frizz.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 13000, atk: 700, spd: 100, res: { neutre: 14, terre: 27, feu: 16, eau: 21, air: 25 } },
    moves: ['cristallisation', 'sang_froid', 'glace_trop_physique']
}

monsters.nileza = {
    id: 'nileza',
    name: 'Nileza',
    image: 'images/monsters/Nileza.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 13000, atk: 700, spd: 100, res: { neutre: 14, terre: 15, feu: 16, eau: 32, air: 25 } },
    moves: ['fraction_de_molaire', 'glace_seche', 'liqueur_de_fee_ling']
}

monsters.sylargh = {
    id: 'sylargh',
    name: 'Sylargh',
    image: 'images/monsters/Sylargh.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 13000, atk: 700, spd: 100, res: { neutre: 14, terre: 27, feu: 16, eau: 22, air: 12 } },
    moves: ['poincon', 'mortier', 'degage_de_qualite']
}

monsters.comte_harebourg = {
    id: 'comte_harebourg',
    name: 'Comte Harebourg',
    image: 'images/monsters/Comte_Harebourg.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 13000, atk: 800, spd: 100, res: { neutre: 14, terre: 17, feu: 16, eau: 29, air: 25 } },
    moves: ['contretemps', 'multicomte', 'jaquemart']
}

monsters.merkator = {
    id: 'merkator',
    name: 'Merkator',
    image: 'images/monsters/Merkator.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 13000, atk: 700, spd: 100, res: { neutre: 14, terre: 27, feu: 16, eau: 22, air: 12 } },
    moves: ['torpillage_de_glace', 'sondage_de_bronze', 'baphe_thysca', 'bouche_a_bouche']
}

monsters.solar = {
    id: 'solar',
    name: 'Solar',
    image: 'images/monsters/Solar.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 13000, atk: 800, spd: 100, res: { neutre: 40, terre: 20, feu: 5, eau: 20, air: 5 } },
    moves: ['aube_saine', 'leve_tot', 'rossee_matinale', 'demon_de_midi', 'coup_de_soleil', 'eruption_solaire', 'coucher_de_soleil', 'cours_du_soir', 'le_grand_soir', 'demons_de_minuit', 'nuit_blanche', 'protecteur_d_emoi']
}

monsters.percimol = {
    id: 'percimol',
    name: 'Percimol',
    image: 'images/monsters/Percimol.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 13000, atk: 800, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['coup_de_marre_d_eau', 'courage_de_l_epouvantail', 'impatience']
}

monsters.dechireuse = {
    id: 'dechireuse',
    name: 'Déchireuse',
    image: 'images/monsters/Déchireuse.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 13000, atk: 800, spd: 100, res: { neutre: 25, terre: 20, feu: 15, eau: 15, air: 20 } },
    moves: ['hemorasoir', 'brutank', 'atermoiement', 'recentrage', 'proxicaire', 'musculot']
}

monsters.torkelonia = {
    id: 'torkelonia',
    name: 'Torkélonia',
    image: 'images/monsters/Torkélonia.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 14000, atk: 800, spd: 100, res: { neutre: 12, terre: 14, feu: 22, eau: 24, air: 18 } },
    moves: ['faisceau_lunaire', 'carapace_lunaire', 'ricochet_sacre', 'goutte_lunaire']
}

monsters.kabahal = {
    id: 'kabahal',
    name: 'Kabahal',
    image: 'images/monsters/Kabahal.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 14000, atk: 800, spd: 100, res: { neutre: 50, terre: 50, feu: 50, eau: 50, air: 50 } },
    moves: ['ratafia_putride', 'offrande_au_chaos', 'paume_incandescente', 'il_du_nocher', 'd_une_main_de_maitre', 'Pentademonium']
}

monsters.roi_nidas = {
    id: 'roi_nidas',
    name: 'Roi Nidas',
    image: 'images/monsters/Roi_Nidas.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 15000, atk: 800, spd: 100, res: { neutre: 16, terre: 42, feu: 25, eau: 20, air: 12 } },
    moves: ['confusion', 'attrape_mutin', 'mon_precieux']
}

monsters.reine_des_voleurs = {
    id: 'reine_des_voleurs',
    name: 'Reine des Voleurs',
    image: 'images/monsters/Reine_des_Voleurs.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 15000, atk: 800, spd: 100, res: { neutre: 31, terre: 26, feu: 42, eau: 13, air: 18 } },
    moves: ['mort_en_sursis', 'coup_critique']
}

monsters.vortex = {
    id: 'vortex',
    name: 'Vortex',
    image: 'images/monsters/Vortex.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 15000, atk: 800, spd: 100, res: { neutre: 6, terre: 33, feu: 12, eau: 21, air: 28 } },
    moves: ['heuristique', 'morfaille', 'en_temps_et_en_heure']
}

monsters.chal_il = {
    id: 'chal_il',
    name: 'Chalœil',
    image: 'images/monsters/Chalœil.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 15000, atk: 800, spd: 100, res: { neutre: 21, terre: 21, feu: 11, eau: 31, air: 16 } },
    moves: ['toilette_ecaflip', 'farce_et_attrape', 'gros_yeux']
}

monsters.grozilla = {
    id: 'grozilla',
    name: 'Grozilla',
    image: 'images/monsters/Grozilla.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 16000, atk: 950, spd: 100, res: { neutre: 20, terre: 20, feu: 50, eau: 20, air: 20 } },
    moves: []
}

monsters.grasmera = {
    id: 'grasmera',
    name: 'Grasmera',
    image: 'images/monsters/Grasmera.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 16000, atk: 950, spd: 100, res: { neutre: 50, terre: 30, feu: 30, eau: 30, air: 30 } },
    moves: ['meteore']
}

monsters.dantinea = {
    id: 'dantinea',
    name: 'Dantinéa',
    image: 'images/monsters/Dantinéa.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 18000, atk: 800, spd: 100, res: { neutre: 14, terre: 18, feu: 28, eau: 23, air: 17 } },
    moves: ['siphon_d_ame', 'cooquillation']
}

monsters.larve_de_koutoulou = {
    id: 'larve_de_koutoulou',
    name: 'Larve de Koutoulou',
    image: 'images/monsters/Larve_de_Koutoulou.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 18000, atk: 800, spd: 100, res: { neutre: 16, terre: 22, feu: 17, eau: 17, air: 28 } },
    moves: ['frappe_koutonienne', 'permutation_inquietante']
}

monsters.tal_kasha = {
    id: 'tal_kasha',
    name: 'Tal Kasha',
    image: 'images/monsters/Tal_Kasha.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 18000, atk: 800, spd: 100, res: { neutre: 20, terre: 30, feu: 15, eau: 20, air: 10 } },
    moves: ['cheveux_partir_de_la', 'filature', 'transe_perse']
}

monsters.anerice_la_shushess = {
    id: 'anerice_la_shushess',
    name: 'Anerice la Shushess',
    image: 'images/monsters/Anerice_la_Shushess.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 18000, atk: 800, spd: 100, res: { neutre: 15, terre: 20, feu: 10, eau: 25, air: 30 } },
    moves: ['goulification', 'vampyrisme', 'appetit_sanguinaire']
}

monsters.dazak_martegel = {
    id: 'dazak_martegel',
    name: 'Dazak Martegel',
    image: 'images/monsters/Dazak_Martegel.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 18000, atk: 800, spd: 100, res: { neutre: 110, terre: 140, feu: 120, eau: 105, air: 130 } },
    moves: ['empalement_royal', 'ninflitration', 'nintrepidite']
}

monsters.pretresse_de_kao = {
    id: 'pretresse_de_kao',
    name: 'Prêtresse de Kao',
    image: 'images/monsters/Prêtresse_de_Kao.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 18000, atk: 901, spd: 100, res: { neutre: 34, terre: -8, feu: 17, eau: 15, air: 26 } },
    moves: ['cloches_du_kao', 'equador', 'spatule_tranche_gourmands', 'commerce_inequitable']
}

monsters.misere = {
    id: 'misere',
    name: 'Misère',
    image: 'images/monsters/Misère.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 18000, atk: 901, spd: 100, res: { neutre: 9, terre: 32, feu: 19, eau: 12, air: 28 } },
    moves: ['balance_fleau', 'funerailles_celestes', 'grand_urubu', 'dakhma', 'barchan']
}

monsters.barberyl_clochecuivre = {
    id: 'barberyl_clochecuivre',
    name: 'Barbéryl Clochecuivre',
    image: 'images/monsters/Barbéryl_Clochecuivre.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 18000, atk: 566, spd: 100, res: { neutre: -9, terre: 10, feu: 2, eau: 4, air: -7 } },
    moves: ['ninfernal', 'nimparabilite', 'ninvasion']
}

monsters.dechireuse_perturbee = {
    id: 'dechireuse_perturbee',
    name: 'Déchireuse perturbée',
    image: 'images/monsters/Déchireuse_perturbée.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 18000, atk: 800, spd: 100, res: { neutre: 25, terre: 20, feu: 15, eau: 15, air: 20 } },
    moves: []
}

monsters.champion_de_l_aurore_pourpre = {
    id: 'champion_de_l_aurore_pourpre',
    name: 'Champion de l\'Aurore Pourpre',
    image: 'images/monsters/Champion_de_l_Aurore_Pourpre.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 19000, atk: 800, spd: 100, res: { neutre: 50, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['embrigadement', 'troolverisation', 'exaction', 'catapultage']
}

monsters.l_eternel_conflit = {
    id: 'l_eternel_conflit',
    name: 'L\'Éternel Conflit',
    image: 'images/monsters/L_Éternel_Conflit.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 20000, atk: 800, spd: 100, res: { neutre: 20, terre: 29, feu: 17, eau: 23, air: 31 } },
    moves: ['poing_de_la_cite_sombre', 'poing_de_la_cite_blanche', 'cycle_de_la_violence', 'massacre_de_l_aurore_pourpre']
}

monsters.superviz_uf_perturbe = {
    id: 'superviz_uf_perturbe',
    name: 'Supervizœuf perturbé',
    image: 'images/monsters/Supervizœuf_perturbé.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 20000, atk: 1000, spd: 100, res: { neutre: -11, terre: 5, feu: 2, eau: 1, air: 3 } },
    moves: []
}

monsters.corruption = {
    id: 'corruption',
    name: 'Corruption',
    image: 'images/monsters/Corruption.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 21000, atk: 901, spd: 100, res: { neutre: 22, terre: 16, feu: 5, eau: 11, air: 25 } },
    moves: ['beche_corrompue', 'incu_batteur', 'convalescence_prolifique', 'putrefaction', 'bombe_bacteriologique', 'eclosion_germinal']
}

monsters.guerre = {
    id: 'guerre',
    name: 'Guerre',
    image: 'images/monsters/Guerre.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 22000, atk: 901, spd: 100, res: { neutre: 30, terre: 35, feu: 35, eau: 25, air: 25 } },
    moves: ['bravoure', 'impact', 'lynchage', 'magmalefice', 'celerite', 'martyre']
}

monsters.servitude = {
    id: 'servitude',
    name: 'Servitude',
    image: 'images/monsters/Servitude.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 26000, atk: 800, spd: 100, res: { neutre: 20, terre: 15, feu: 30, eau: 25, air: 25 } },
    moves: ['trahison', 'asservissement', 'joug_protecteur']
}

monsters.roi_imagami = {
    id: 'roi_imagami',
    name: 'Roi Imagami',
    image: 'images/monsters/Roi_Imagami.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 27000, atk: 800, spd: 100, res: { neutre: 22, terre: 18, feu: -11, eau: -8, air: -21 } },
    moves: ['parchemin_de_traverse', 'papetuerie', 'roque_papier_ciseaux', 'kami_no_jishin']
}

monsters.reine_amirukam = {
    id: 'reine_amirukam',
    name: 'Reine Amirukam',
    image: 'images/monsters/Reine_Amirukam.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 27000, atk: 800, spd: 100, res: { neutre: 22, terre: 18, feu: -11, eau: -8, air: -21 } },
    moves: ['toner_deubraiste', 'getsuga_tensho', 'monarchie_des_roses_noires']
}

monsters.venerable_endormi = {
    id: 'venerable_endormi',
    name: 'Vénérable Endormi',
    image: 'images/monsters/Vénérable_Endormi.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 27000, atk: 800, spd: 100, res: { neutre: 25, terre: 25, feu: 25, eau: 25, air: 25 } },
    moves: ['saut_imperieux', 'cri_venerable', 'primattaque', 'primartelement', 'charge_fantastique', 'boulet_fantastique']
}

monsters.qilby = {
    id: 'qilby',
    name: 'Qilby',
    image: 'images/monsters/Qilby.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 27000, atk: 1000, spd: 100, res: { neutre: 31, terre: 27, feu: 25, eau: 39, air: 20 } },
    moves: ['faux_espoirs', 'resonance_sempiternelle', 'portail']
}

monsters.belladone = {
    id: 'belladone',
    name: 'Belladone',
    image: 'images/monsters/Belladone.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 29000, atk: 640, spd: 100, res: { neutre: 22, terre: 18, feu: 8, eau: 24, air: 14 } },
    moves: ['enchantement_fatal', 'charme_malefique', 'glyphe_de_condamnation', 'dechainement_fantasmagorique', 'malefice_immobile', 'conjuration_entravante']
}

monsters.venerable_endormi_perturbe = {
    id: 'venerable_endormi_perturbe',
    name: 'Vénérable Endormi perturbé',
    image: 'images/monsters/Vénérable_Endormi_perturbé.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 30000, atk: 1000, spd: 100, res: { neutre: 25, terre: 20, feu: 15, eau: 15, air: 20 } },
    moves: []
}

monsters.capitaine_meno = {
    id: 'capitaine_meno',
    name: 'Capitaine Meno',
    image: 'images/monsters/Capitaine_Meno.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 40000, atk: 800, spd: 100, res: { neutre: 11, terre: 33, feu: 26, eau: 13, air: 17 } },
    moves: ['crystalisation', 'matiere_volatile']
}

monsters.cire_momore = {
    id: 'cire_momore',
    name: 'Cire Momore',
    image: 'images/monsters/Cire_Momore.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 41000, atk: 800, spd: 100, res: { neutre: 15, terre: 15, feu: 15, eau: 15, air: 15 } },
    moves: ['metal_hurlant', 'briselame', 'triste_cire']
}

monsters.ilyzaelle = {
    id: 'ilyzaelle',
    name: 'Ilyzaelle',
    image: 'images/monsters/Ilyzaelle.png',
    rarity: 'rare',
    tier: 'boss',
    bst: { hp: 42000, atk: 800, spd: 100, res: { neutre: 20, terre: 30, feu: 40, eau: 15, air: 25 } },
    moves: ['hantame', 'lance_de_l_effroi']
}
