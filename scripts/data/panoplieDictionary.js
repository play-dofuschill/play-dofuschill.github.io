// panoplieDictionary.js — bonus panoplie DofusChill
/*
stats: [
        { stat: 'atk', value: 10 },
        { stat: 'spd', value: 10 },
        { stat: 'flatDamage', value: 10 },
        { stat: 'finalDamagePct', value: 10 },
        { stat: 'spellDamagePct', value: 10 },
        { stat: 'damageReductionPct', value: 10 },
        { stat: 'critChance', value: 10 },
        { stat: 'critDamagePct', value: 10 },
        { stat: 'maxHp', value: 10 },
        { stat: 'res.feu', value: 10 },
        { stat: 'res.eau', value: 10 },
        { stat: 'res.terre', value: 10 },
        { stat: 'res.air', value: 10 },
        { stat: 'res.neutre', value: 10 },
    ],
*/

const panoplies = {

    aventurier: {
        name: 'Panoplie Aventurier',
        pieces: ['bottesAventurier','capeAventurier','chapeauAventurier','anneauAventurier','ceintureAventurier','amuletteAventurier'],
        bonuses: {
            3: {stats: [{ stat: 'maxHp', value: 20 }]
        },
            6: {stats: [{ stat: 'maxHp', value: 20 },
                        { stat: 'flatDamage', value: 5 },]
        }}
    },
    kardorim: {
        name: 'Panoplie de Kardorim',
        pieces: ['capeKardorim','coiffeKardorim','anneauKardorim'],
        bonuses: {
            3: {stats: [{ stat: 'maxHp', value: 50 }]}
        }
    },
    bouftou: {
        name: 'Panoplie Bouftou',
        pieces: ['cape_bouftou','coiffe_bouftou','bottes_bouftou','anneau_bouftou','amulette_bouftou','ceinture_bouftou','marteau_bouftou','bouclier_bouftou'],
        bonuses: {
            2: {stats: [{ stat: 'maxHp', value: 30 }]
        },
            4: {stats: [{ stat: 'maxHp', value: 30 },
                        { stat: 'atk', value: 10 }]
        },
            6: {stats: [{ stat: 'maxHp', value: 50 },
                        { stat: 'atk', value: 20 },
                        { stat: 'res.neutre', value: 5 }]
        },
            8: {stats: [{ stat: 'maxHp', value: 50 },
                        { stat: 'atk', value: 50 },
                        { stat: 'res.neutre', value: 10 },
                        { stat: 'flatDamage', value: 5 }]
        }}
    },
    bouftouRoyal: {
        name: 'Panoplie du Bouftou Royal',
        pieces: ['cape_bouftou_royal','coiffe_bouftou_royal','bottes_bouftou_royal','anneau_bouftou_royal','amulette_bouftou_royal','ceinture_bouftou_royal','epee_bouftou_royal','bouclier_bouftou_royal'],
        bonuses: {
            2: {stats: [{ stat: 'maxHp', value: 40 },
                        { stat: 'atk', value: 20 }]
        },
            4: {stats: [{ stat: 'maxHp', value: 50 },
                        { stat: 'atk', value: 20 }]
        },
            6: {stats: [{ stat: 'maxHp', value: 75 },
                        { stat: 'atk', value: 40 },
                        { stat: 'flatDamage', value: 5 }]
        },
            8: {stats: [{ stat: 'maxHp', value: 100 },
                        { stat: 'atk', value: 50 },
                        { stat: 'flatDamage', value: 10 },
                        { stat: 'res.neutre', value: 5 }]
        }}
    },
    paysan: {
        name: 'Panoplie du paysan',
        pieces: ['sac_paysan','chapeau_paysan','bottes_paysan','anneau_paysan','amulette_paysan','ceinture_paysan','faux_paysan'],
        bonuses: {
            3: {stats: [{ stat: 'maxHp', value: 20 },
                        { stat: 'atk', value: 10 }]
        },
            5: {stats: [{ stat: 'maxHp', value: 20 },
                        { stat: 'atk', value: 20 },
                        { stat: 'spd', value: 2 },
                        { stat: 'res.air', value: 5 }]
        },
            7: {stats: [{ stat: 'maxHp', value: 30 },
                        { stat: 'atk', value: 30 },
                        { stat: 'spd', value: 5 },
                        { stat: 'res.air', value: 10 },
                        { stat: 'flatDamage', value: 5 }]
        }}
    },
    mousse: {
        name: "Panoplie de Mob l'Eponge",
        pieces: ['cape_mousse','coiffe_mousse','bottes_mousse','anneau_mousse','amulette_mousse','ceinture_mousse','pelle_mousse','bouclier_mousse'],
        bonuses: {
            2: {stats: [{ stat: 'maxHp', value: 20 }]
        },
            4: {stats: [{ stat: 'maxHp', value: 20 },
                        { stat: 'atk', value: 10 }]
        },
            6: {stats: [{ stat: 'maxHp', value: 20 },
                        { stat: 'atk', value: 20 },
                        { stat: 'critChance', value: 2 },
                        { stat: 'res.eau', value: 5 }]
        },
            8: {stats: [{ stat: 'maxHp', value: 30 },
                        { stat: 'atk', value: 30 },
                        { stat: 'critChance', value: 5 },
                        { stat: 'res.eau', value: 10 },
                        { stat: 'flatDamage', value: 5 }]
        }}
    },
    scarafeuille_blanc: {
        name: "Panoplie du scarafeuille blanc",
        pieces: ['cape_scarafeuille_blanc','coiffe_scarafeuille_blanc','anneau_scarafeuille_blanc','ceinture_scarafeuille_blanc'],
        familiar: 'scarafeuilleBlanc',
        bonuses: {
            2: {stats: [{ stat: 'maxHp', value: 20 },
                        { stat: 'atk', value: 20 },
                        { stat: 'res.air', value: 5 }]
        },
            4: {stats: [{ stat: 'maxHp', value: 80 },
                        { stat: 'atk', value: 60 },
                        { stat: 'res.air', value: 20 }]
        }}
    },
    scarafeuille_vert: {
        name: "Panoplie du scarafeuille vert",
        pieces: ['cape_scarafeuille_vert','coiffe_scarafeuille_vert','anneau_scarafeuille_vert','ceinture_scarafeuille_vert'],
        familiar: 'scarafeuilleVert',
        bonuses: {
            2: {stats: [{ stat: 'maxHp', value: 20 },
                        { stat: 'atk', value: 20 },
                        { stat: 'res.terre', value: 5 }]
        },
            4: {stats: [{ stat: 'maxHp', value: 80 },
                        { stat: 'atk', value: 60 },
                        { stat: 'res.terre', value: 20 }]
        }}
    },
    scarafeuille_bleu: {
        name: "Panoplie du scarafeuille bleu",
        pieces: ['cape_scarafeuille_bleu','coiffe_scarafeuille_bleu','anneau_scarafeuille_bleu','ceinture_scarafeuille_bleu'],
        familiar: 'scarafeuilleBleu',
        bonuses: {
            2: {stats: [{ stat: 'maxHp', value: 20 },
                        { stat: 'atk', value: 20 },
                        { stat: 'res.eau', value: 5 }]
        },
            4: {stats: [{ stat: 'maxHp', value: 80 },
                        { stat: 'atk', value: 60 },
                        { stat: 'res.eau', value: 20 }]
        }}
    },
    scarafeuille_rouge: {
        name: "Panoplie du scarafeuille rouge",
        pieces: ['cape_scarafeuille_rouge','coiffe_scarafeuille_rouge','anneau_scarafeuille_rouge','ceinture_scarafeuille_rouge'],
        familiar: 'scarafeuilleRouge',
        bonuses: {
            2: {stats: [{ stat: 'maxHp', value: 20 },
                        { stat: 'atk', value: 20 },
                        { stat: 'res.feu', value: 5 }]
        },
            4: {stats: [{ stat: 'maxHp', value: 80 },
                        { stat: 'atk', value: 60 },
                        { stat: 'res.feu', value: 20 }]
        }}
    },
    scarafeuille_noir: {
        name: "Panoplie du scarafeuille noir",
        pieces: ['cape_scarafeuille_noir','coiffe_scarafeuille_noir','anneau_scarafeuille_noir','ceinture_scarafeuille_noir'],
        familiar: 'scarafeuilleNoir',
        bonuses: {
            2: {stats: [{ stat: 'maxHp', value: 20 },
                        { stat: 'atk', value: 20 },
                        { stat: 'res.neutre', value: 5 }]
        },
            4: {stats: [{ stat: 'maxHp', value: 80 },
                        { stat: 'atk', value: 60 },
                        { stat: 'res.neutre', value: 20 }]
        }}
    },
    scraraboss_doree: {
        name: "Panoplie du Scraraboss Dorée",
        pieces: ['cape_scaraboss_doree','coiffe_scaraboss_doree','bottes_scaraboss_doree','anneau_scaraboss_doree','amulette_scaraboss_doree','ceinture_scaraboss_doree','baguette_scaraboss_doree'],
        familiar: 'scrarabossDoree',
        bonuses: {
            3: {stats: [{ stat: 'maxHp', value: 20 },
                        { stat: 'atk', value: 30 },
                        { stat: 'flatDamage', value: 5 }]
        },
            5: {stats: [{ stat: 'maxHp', value: 40 },
                        { stat: 'atk', value: 60 },
                        { stat: 'flatDamage', value: 7 },
                        { stat: 'critChance', value: 2 }]
        },
            7: {stats: [{ stat: 'maxHp', value: 80 },
                        { stat: 'atk', value: 80 },
                        { stat: 'flatDamage', value: 10 },
                        { stat: 'critChance', value: 3 },
                        { stat: 'res.neutre', value: 5 },
                        { stat: 'res.terre', value: 5 },
                        { stat: 'res.feu', value: 5 },
                        { stat: 'res.eau', value: 5 },
                        { stat: 'res.air', value: 5 }]
        }}
    },
    kwak_vent: {
        name: "Panoplie du kwak de vent",
        pieces: ['cape_kwak_vent','coiffe_kwak_vent','anneau_kwak_vent','ceinture_kwak_vent','bottes_kwak_vent','amulette_kwak_vent','epee_kwak_vent'],
        familiar: 'kwakVent',
        bonuses: {
            3: {stats: [{ stat: 'maxHp', value: 20 },
                        { stat: 'atk', value: 30 },
                        { stat: 'res.air', value: 3 }]
        },
            5: {stats: [{ stat: 'maxHp', value: 30 },
                        { stat: 'atk', value: 50 },
                        { stat: 'res.air', value: 6 },
                        { stat: 'flatDamage', value: 5 }]
        },
            7: {stats: [{ stat: 'maxHp', value: 80 },
                        { stat: 'atk', value: 80 },
                        { stat: 'res.air', value: 10 },
                        { stat: 'flatDamage', value: 10 }]
        }}
    },
    kwak_glace: {
        name: "Panoplie du kwak de glace",
        pieces: ['cape_kwak_glace','coiffe_kwak_glace','anneau_kwak_glace','ceinture_kwak_glace','bottes_kwak_glace','amulette_kwak_glace','epee_kwak_glace'],
        familiar: 'kwakGlace',
        bonuses: {
            3: {stats: [{ stat: 'maxHp', value: 20 },
                        { stat: 'atk', value: 30 },
                        { stat: 'res.eau', value: 3 }]
        },
            5: {stats: [{ stat: 'maxHp', value: 30 },
                        { stat: 'atk', value: 50 },
                        { stat: 'res.eau', value: 6 },
                        { stat: 'flatDamage', value: 5 }]
        },
            7: {stats: [{ stat: 'maxHp', value: 80 },
                        { stat: 'atk', value: 80 },
                        { stat: 'res.eau', value: 10 },
                        { stat: 'flatDamage', value: 10 }]
        }}
    },
    kwak_flamme: {
        name: "Panoplie du kwak de flamme",
        pieces: ['cape_kwak_flamme','coiffe_kwak_flamme','anneau_kwak_flamme','ceinture_kwak_flamme','bottes_kwak_flamme','amulette_kwak_flamme','epee_kwak_flamme'],
        familiar: 'kwakFlamme',
        bonuses: {
            3: {stats: [{ stat: 'maxHp', value: 20 },
                        { stat: 'atk', value: 30 },
                        { stat: 'res.feu', value: 3 }]
        },
            5: {stats: [{ stat: 'maxHp', value: 30 },
                        { stat: 'atk', value: 50 },
                        { stat: 'res.feu', value: 6 },
                        { stat: 'flatDamage', value: 5 }]
        },
            7: {stats: [{ stat: 'maxHp', value: 80 },
                        { stat: 'atk', value: 80 },
                        { stat: 'res.feu', value: 10 },
                        { stat: 'flatDamage', value: 10 }]
        }}
    },
    kwak_terre: {
        name: "Panoplie du kwak de terre",
        pieces: ['cape_kwak_terre','coiffe_kwak_terre','anneau_kwak_terre','ceinture_kwak_terre','bottes_kwak_terre','amulette_kwak_terre','epee_kwak_terre'],
        familiar: 'kwakTerre',
        bonuses: {
            3: {stats: [{ stat: 'maxHp', value: 20 },
                        { stat: 'atk', value: 30 },
                        { stat: 'res.terre', value: 3 }]
        },
            5: {stats: [{ stat: 'maxHp', value: 30 },
                        { stat: 'atk', value: 50 },
                        { stat: 'res.terre', value: 6 },
                        { stat: 'flatDamage', value: 5 }]
        },
            7: {stats: [{ stat: 'maxHp', value: 80 },
                        { stat: 'atk', value: 80 },
                        { stat: 'res.terre', value: 10 },
                        { stat: 'flatDamage', value: 10 }]
        }}
    },
    kwakwa: {
        name: "Panoplie du Kwakwa",
        pieces: ['kwakwanneau','kwakwalliance','kwakwaffe','kwakwalame'],
        familiar: 'kwakwa',
        bonuses: {
            2: {stats: [{ stat: 'maxHp', value: 40 },
                        { stat: 'atk', value: 50 },
                        { stat: 'res.terre', value: 4 },
                        { stat: 'res.feu', value: 4 },
                        { stat: 'res.eau', value: 4 },
                        { stat: 'res.air', value: 4 }]
        },
            4: {stats: [{ stat: 'maxHp', value: 130 },
                        { stat: 'atk', value: 100 },
                        { stat: 'res.terre', value: 10 },
                        { stat: 'res.feu', value: 10 },
                        { stat: 'res.eau', value: 10 },
                        { stat: 'res.air', value: 10 }]
        }}
    },
    

    Homme_Ours: {
        name: "Panoplie de l'Homme Ours",
        pieces: ['cape_de_lHomme_Ours','coiffe_de_lHomme_Ours','bottes_de_lHomme_Ours','anneau_de_lHomme_Ours','amulette_de_lHomme_Ours','ceinture_de_lHomme_Ours','baton_de_lHomme_Ours'],
        bonuses: {
            3: {stats: [{ stat: 'atk', value: 10 },
                        { stat: 'res.terre', value: 2 }, 
                        { stat: 'res.feu', value: 2 }, 
                        { stat: 'res.eau', value: 2 }, 
                        { stat: 'res.air', value: 2 }, 
                        { stat: 'res.neutre', value: 2 },
                        { stat: 'flatDamage', value: 2 }]
        },
            5: {stats: [{ stat: 'atk', value: 30 },
                        { stat: 'res.terre', value: 4 }, 
                        { stat: 'res.feu', value: 4 }, 
                        { stat: 'res.eau', value: 4 }, 
                        { stat: 'res.air', value: 4 }, 
                        { stat: 'res.neutre', value: 4 },
                        { stat: 'flatDamage', value: 4 }]
        },
            7: {stats: [{ stat: 'atk', value: 40 }, 
                        { stat: 'maxHp', value: 40 },
                        { stat: 'res.terre', value: 4 }, 
                        { stat: 'res.feu', value: 4 }, 
                        { stat: 'res.eau', value: 4 }, 
                        { stat: 'res.air', value: 4 }, 
                        { stat: 'res.neutre', value: 4 },
                        { stat: 'flatDamage', value: 4 }]
        }}
    },
    Sanglier: {
        name: "Panoplie du Sanglier",
        pieces: ['bottes_du_sanglier','anneau_du_sanglier','ceinture_du_sanglier'],
        bonuses: {
            2: {stats: [{ stat: 'maxHp', value: 30 }, 
                        { stat: 'critChance', value: 3 }, 
                        { stat: 'spd', value: 10 }]
        },
            3: {stats: [{ stat: 'maxHp', value: 60 }, 
                        { stat: 'critChance', value: 6 }, 
                        { stat: 'spd', value: 15 }]
        }}
    },
    Prespic: {
        name: "Panoplie du Prespic",
        pieces: ['cape_du_prespic','coiffe_du_prespic','anneau_du_prespic','ceinture_du_prespic','bouclier_du_prespic'],
        bonuses: {
            2: {stats: [{ stat: 'flatDamage', value: 2 }, 
                        { stat: 'atk', value: 20 }]
        },
            4: {stats: [{ stat: 'flatDamage', value: 5 }, 
                        { stat: 'atk', value: 50 }]
        },
            5: {stats: [{ stat: 'flatDamage', value: 10 }, 
                        { stat: 'atk', value: 80 }]
        }}
    },

    ouassingue: {
        name: "Panoplie Vassale",
        pieces: ['cape_ouassingue','coiffe_ouassingue','bottes_ouassingue','amulette_ouassingue'],
        bonuses: {
            2: {stats: [{ stat: 'atk', value: 60 },
                        { stat: 'dropRate', value: 5 },
                        { stat: 'healFlat', value: 10 }]
        },
            4: {stats: [{ stat: 'atk', value: 80 },
                        { stat: 'dropRate', value: 10 },
                        { stat: 'healFlat', value: 30 }]
        }}
    },
    roissingue: {
        name: "Panoplie Souveraine",
        pieces: ['cape_roissingue','coiffe_roissingue','anneau_roissingue'],
        bonuses: {
            2: {stats: [{ stat: 'maxHp', value: 40 },
                        { stat: 'atk', value: 60 },
                        { stat: 'dropRate', value: 5 }]
        },
            3: {stats: [{ stat: 'maxHp', value: 50 },
                        { stat: 'atk', value: 80 },
                        { stat: 'dropRate', value: 10 }]
        }}
    },
    kralamoure: {
        name: "Panoplie Ventouse",
        pieces: ['annolamour','kralano','kralamansion'],
        bonuses: {
            2: {stats: [{ stat: 'healFlat', value: 50 },
                        { stat: 'atk', value: 50 },
                        { stat: 'res.terre', value: 5 },
                        { stat: 'res.feu', value: 5 },
                        { stat: 'res.eau', value: 5 },
                        { stat: 'res.air', value: 5 },
                        { stat: 'dropRate', value: 5 }]
        },
            3: {stats: [{ stat: 'healFlat', value: 70 },
                        { stat: 'atk', value: 60 },
                        { stat: 'res.terre', value: 10 },
                        { stat: 'res.feu', value: 10 },
                        { stat: 'res.eau', value: 10 },
                        { stat: 'res.air', value: 10 },
                        { stat: 'dropRate', value: 15 }]
        }}
    },

}