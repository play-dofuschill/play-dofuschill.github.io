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
        { stat: 'fireResPct', value: 10 },
        { stat: 'waterResPct', value: 10 },
        { stat: 'earthResPct', value: 10 },
        { stat: 'airResPct', value: 10 },
        { stat: 'neutralResPct', value: 10 },
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
        pieces: ['capeKardorim','chapeauKardorim','anneauKardorim'],
        bonuses: {
            3: {stats: [{ stat: 'maxHp', value: 50 }]}
        }
    },
    bouftou: {
        name: 'Panoplie Bouftou',
        pieces: ['capeBouftou','coiffeBouftou','bottesBouftou','anneauBouftou','amuletteBouftou','ceintureBouftou','marteauBouftou','bouclierBouftou'],
        bonuses: {
            2: {stats: [{ stat: 'maxHp', value: 30 }]
        },
            4: {stats: [{ stat: 'maxHp', value: 30 },
                        { stat: 'atk', value: 10 }]
        },
            6: {stats: [{ stat: 'maxHp', value: 50 },
                        { stat: 'atk', value: 20 },
                        { stat: 'neutralResPct', value: 5 }]
        },
            8: {stats: [{ stat: 'maxHp', value: 50 },
                        { stat: 'atk', value: 50 },
                        { stat: 'neutralResPct', value: 10 },
                        { stat: 'flatDamage', value: 5 }]
        }}
    }
}