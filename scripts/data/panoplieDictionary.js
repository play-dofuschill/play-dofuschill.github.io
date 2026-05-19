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





}