// invocationDictionary.js — Invocations des classes DofusChill
// Les invocations ennemies/monstres restent dans monsterDictionary.js

const summons = {}

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STRUCTURE D'UNE INVOCATION DE CLASSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

summons.id = {
    id:    'id',
    name:  'Nom',
    image: 'img/invocations/nom.png',
    bst: { hp: 100, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['move_id_1', 'move_id_2']   // jusqu'à 4, mappés sur slot1-slot4
}

Les moves de l'invocation sont ajoutés dans l'objet `move` ci-dessous.
Les targets disponibles pour les moves d'invocations alliées :
  - 'enemy'        → l'ennemi actif (attaque)
  - 'self'         → l'invocation elle-même
  - 'all_allies'   → toute l'équipe alliée
  - 'ally_min_hp'  → le membre allié avec le moins de HP (en %)
*/

// #region ENIRIPSA ─────────────────────────────────────────────

move.soin_lapino_tier_1 = {
    id: 'soin_lapino_tier_1',
    name: 'Soin',
    cooldownMs: 2000,
    effects: [{ type: 'heal%maxHp', heal: 5, target: 'ally_min_hp' }]
}
move.soin_lapino_tier_2 = {
    id: 'soin_lapino_tier_2',
    name: 'Soin',
    cooldownMs: 2000,
    effects: [{ type: 'heal%maxHp', heal: 7, target: 'ally_min_hp' }]
}
move.soin_lapino_tier_3 = {
    id: 'soin_lapino_tier_3',
    name: 'Soin',
    cooldownMs: 2000,
    effects: [{ type: 'heal%maxHp', heal: 10, target: 'ally_min_hp' }]
}
move.lapinopoing = {
    id: 'lapinopoing',
    name: 'Lapinopoing',
    cooldownMs: 4000,
    effects: [{type: 'damage', element: 'terre', damage: {min: 10, max: 14}, target: 'enemy'},
              {type: 'damage', element: 'feu', damage: {min: 10, max: 14}, target: 'enemy'},
              {type: 'damage', element: 'eay', damage: {min: 10, max: 14}, target: 'enemy'},
              {type: 'damage', element: 'air', damage: {min: 10, max: 14}, target: 'enemy'}]
}
move.prevention = {
    id: 'prevention',
    name: 'Prévention',
    cooldownMs: 2000,
    effects: [{ type: 'heal%maxHp', heal: 5, target: 'ally_min_hp' }]
}
move.bisou_magique = {
    id: 'bisou_magique',
    name: 'Bisou Magique',
    cooldownMs: 2000,
    effects: [{ type: 'shield', value: 100, target: 'ally_random' }]
}

summons.lapino = {
    id:    'lapino',
    name:  'Lapino',
    image: 'img/classes/invocations/lapino.png',
    bst:   { hp: 150, atk: 0, spd: 110, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['soin_lapino_tier_1']
}
summons.lapino2 = {
    id:    'lapino2',
    name:  'Lapino',
    image: 'img/classes/invocations/lapino.png',
    bst:   { hp: 300, atk: 0, spd: 110, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['soin_lapino_tier_2']
}
summons.lapino3 = {
    id:    'lapino3',
    name:  'Lapino',
    image: 'img/classes/invocations/lapino.png',
    bst:   { hp: 450, atk: 0, spd: 110, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves: ['soin_lapino_tier_3']
}
summons.lapino_mutant = {
    id:    'lapino_mutant',
    name:  'Lapino Mutant',
    image: 'img/classes/invocations/lapino_mutant.png',
    bst:   { hp: 1000, atk: 500, spd: 110, res: { neutre: 10, terre: 10, feu: 10, eau: 10, air: 10 } },
    moves: ['prevention','bisou_magique', 'lapinopoing']
}

move.vivification = {
    id: 'vivification',
    name: 'Vivification',
    cooldownMs: 2000,
    effects: []
}
summons.fee_vivifiante = {
    id:      'fee_vivifiante',
    name:    'Fée Vivifiante',
    image:   'img/classes/invocations/fee_buff.png',
    bst:     { hp: 10, atk: 0, spd: 120, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves:   ['vivification'],
    onDeath: [{ type: 'buff', stat: 'spd', value: 10, duration: 3, target: 'ally_random' }]
}
summons.fee_vivifiante_tier_2 = {
    id:      'fee_vivifiante_tier_2',
    name:    'Fée Vivifiante',
    image:   'img/classes/invocations/fee_buff.png',
    bst:     { hp: 50, atk: 0, spd: 125, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves:   ['vivification'],
    onDeath: [{ type: 'buff', stat: 'spd', value: 20, duration: 3, target: 'ally_random' }]
}
summons.fee_vivifiante_tier_3 = {
    id:      'fee_vivifiante_tier_3',
    name:    'Fée Vivifiante',
    image:   'img/classes/invocations/fee_buff.png',
    bst:     { hp: 100, atk: 0, spd: 130, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves:   ['vivification'],
    onDeath: [{ type: 'buff', stat: 'spd', value: 30, duration: 3, target: 'ally_random' }]
}
move.jouvence = {
    id: 'jouvence',
    name: 'Jouvence',
    cooldownMs: 2000,
    effects: []
}
summons.fee_de_jouvence = {
    id:      'fee_de_jouvence',
    name:    'Fée de Jouvence',
    image:   'img/classes/invocations/fee_buff.png',
    bst:     { hp: 10, atk: 0, spd: 120, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves:   ['jouvence'],
    onDeath: [{ type: 'heal%maxHp_team', heal: 3 }]
}
summons.fee_de_jouvence_tier_2 = {
    id:      'fee_de_jouvence_tier_2',
    name:    'Fée de Jouvence',
    image:   'img/classes/invocations/fee_buff.png',
    bst:     { hp: 50, atk: 0, spd: 125, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves:   ['jouvence'],
    onDeath: [{ type: 'heal%maxHp_team', heal: 5 }]
}
summons.fee_de_jouvence_tier_3 = {
    id:      'fee_de_jouvence_tier_3',
    name:    'Fée de Jouvence',
    image:   'img/classes/invocations/fee_buff.png',
    bst:     { hp: 100, atk: 0, spd: 130, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves:   ['jouvence'],
    onDeath: [{ type: 'heal%maxHp_team', heal: 7 }]
}
move.accablement = {
    id: 'accablement',
    name: 'Accablement',
    cooldownMs: 2000,
    effects: []
}
summons.fee_accablante = {
    id:      'fee_accablante',
    name:    'Fée Accablante',
    image:   'img/classes/invocations/fee_debuff.png',
    bst:     { hp: 10, atk: 0, spd: 120, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves:   ['accablement'],
    onDeath: [{ type: 'debuff', stat: 'spd', value: 10, duration: 3, target: 'enemy' }]
}
summons.fee_accablante_tier_2 = {
    id:      'fee_accablante_tier_2',
    name:    'Fée Accablante',
    image:   'img/classes/invocations/fee_debuff.png',
    bst:     { hp: 50, atk: 0, spd: 125, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves:   ['accablement'],
    onDeath: [{ type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }]
}
summons.fee_accablante_tier_3 = {
    id:      'fee_accablante_tier_3',
    name:    'Fée Accablante',
    image:   'img/classes/invocations/fee_debuff.png',
    bst:     { hp: 100, atk: 0, spd: 130, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves:   ['accablement'],
    onDeath: [{ type: 'debuff', stat: 'spd', value: 30, duration: 3, target: 'enemy' }]
}
// #endregion
// #region ENUTROF ──────────────────────────────────────────────

move.interception = {
    id: 'interception',
    name: 'Interception',
    cooldownMs: 2000,
    effects: [{ type: 'interception', target: 'self' }]
}
move.frappe_de_pelle = {
    id: 'frappe_de_pelle',
    name: 'Frappe de Pelle',
    cooldownMs: 2000,
    effects: [{ type: 'recul', target: 'enemy' },
              { type: 'interception', target: 'self' }]
}
summons.pelle_animee = {
    id:      'pelle_animee',
    name:    'Pelle Animée',
    image:   'img/classes/invocations/pelle_animee.png',
    bst:     { hp: 150, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves:   ['frappe_de_pelle']
}
summons.pelle_animee2 = {
    id:      'pelle_animee2',
    name:    'Pelle Animée',
    image:   'img/classes/invocations/pelle_animee.png',
    bst:     { hp: 300, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves:   ['frappe_de_pelle']
}
summons.pelle_animee3 = {
    id:      'pelle_animee3',
    name:    'Pelle Animée',
    image:   'img/classes/invocations/pelle_animee.png',
    bst:     { hp: 600, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves:   ['frappe_de_pelle']
}
summons.sac_anime = {
    id:      'sac_anime',
    name:    'Sac Animé',
    image:   'img/classes/invocations/sac_anime.png',
    bst:     { hp: 300, atk: 0, spd: 110, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves:   ['interception']
}
summons.sac_anime2 = {
    id:      'sac_anime2',
    name:    'Sac Animé',
    image:   'img/classes/invocations/sac_anime.png',
    bst:     { hp: 1000, atk: 0, spd: 110, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves:   ['interception']
}
summons.sac_anime3 = {
    id:      'sac_anime3',
    name:    'Sac Animé',
    image:   'img/classes/invocations/sac_anime.png',
    bst:     { hp: 2500, atk: 0, spd: 110, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves:   ['interception']
}

// #endregion
// #region HUPPERMAGE ──────────────────────────────────────────────

move.interception = {
    id: 'interception',
    name: 'Interception',
    cooldownMs: 2000,
    effects: [{ type: 'interception', target: 'self' }]
}
move.rayon_quadramental = {
    id: 'rayon_quadramental',
    name: 'Rayon Quadramental',
    cooldownMs: 2000,
    effects: [{ type: 'absorbElementDmg', damage: { min: 10, max: 15 }, fallbackElement: 'neutre', target: 'enemy' }]
    //description : Occasionne des dommages Neutre ou dans l'état élémentaire sur la cible.
}
summons.gardien_Elementaire = {
    id:      'gardien_Elementaire',
    name:    'Gardien Élémentaire',
    image:   'img/classes/invocations/gardien_Elementaire.png',
    scale: 2,
    bst:     { hp: 150, atk: 0, spd: 100, res: { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 } },
    moves:   ['frappe_de_pelle']
}
// #endregion