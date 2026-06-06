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
    scale: 1,           // taille du sprite (1 = 50% du wrap, 2 = 100% = taille classe)
    bst:   { spd: 100, res: { ... } },   // HP/ATK viennent du sort (effect.scale)
    moves: ['move_id']
    onDeath: [ ... ]    // optionnel — effets déclenchés à la mort
}

HP/ATK de l'invocation :
  - effect.scale: 0.3 sur le sort → 30% des stats du lanceur
  - pas de scale → bst.hp / bst.atk bruts (HP fixes)

Les tiers de puissance sont gérés dans spellProgression du sort via patch.summon.scale
et patch.summon.onDeath — plus besoin de définitions tier_2 / tier_3.

Les moves de l'invocation sont ajoutés dans l'objet `move` ci-dessous.
Les targets disponibles pour les moves d'invocations alliées :
  - 'enemy'        → l'ennemi actif (attaque)
  - 'self'         → l'invocation elle-même
  - 'all_allies'   → toute l'équipe alliée
  - 'ally_min_hp'  → le membre allié avec le moins de HP (en %)
*/

// #region ENIRIPSA ─────────────────────────────────────────────

move.soin_lapino = {
    id: 'soin_lapino',
    name: 'Soin',
    cooldownMs: 2000,
    effects: [{ type: 'heal%maxHp', heal: 5, target: 'ally_min_hp' }],
    spellProgression: [
        { lvl: 1,   patch: {} },
        { lvl: 72,  patch: { healPct: 7 } },
        { lvl: 139, patch: { healPct: 10 } }
    ]
}
move.lapinopoing = {
    id: 'lapinopoing',
    name: 'Lapinopoing',
    cooldownMs: 4000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 10, max: 14 }, target: 'enemy' },
        { type: 'damage', element: 'feu',   damage: { min: 10, max: 14 }, target: 'enemy' },
        { type: 'damage', element: 'eau',   damage: { min: 10, max: 14 }, target: 'enemy' },
        { type: 'damage', element: 'air',   damage: { min: 10, max: 14 }, target: 'enemy' }
    ]
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
    bst:   { spd: 110 },
    moves: ['soin_lapino']
}
summons.lapino_mutant = {
    id:    'lapino_mutant',
    name:  'Lapino Mutant',
    image: 'img/classes/invocations/lapino_mutant.png',
    bst:   { hp: 1000, atk: 500, spd: 110, res: { neutre: 10, terre: 10, feu: 10, eau: 10, air: 10 } },
    moves: ['prevention', 'bisou_magique', 'lapinopoing']
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
    bst:     { hp: 10, spd: 120 },
    moves:   ['vivification'],
    onDeath: [{ type: 'buff', stat: 'spd', value: 10, duration: 3, target: 'ally_random' }]
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
    bst:     { hp: 10, spd: 120 },
    moves:   ['jouvence'],
    onDeath: [{ type: 'heal%maxHp_team', heal: 3 }]
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
    bst:     { hp: 10, spd: 120 },
    moves:   ['accablement'],
    onDeath: [{ type: 'debuff', stat: 'spd', value: 10, duration: 3, target: 'enemy' }]
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
    effects: [
        { type: 'recul',        target: 'enemy' },
        { type: 'interception', target: 'self' }
    ]
}

summons.pelle_animee = {
    id:    'pelle_animee',
    name:  'Pelle Animée',
    image: 'img/classes/invocations/pelle_animee.png',
    bst:   { spd: 100 },
    moves: ['frappe_de_pelle']
}
summons.sac_anime = {
    id:    'sac_anime',
    name:  'Sac Animé',
    image: 'img/classes/invocations/sac_anime.png',
    bst:   { spd: 110 },
    moves: ['interception']
}

// #endregion
// #region SACRIEUR ────────────────────────────────────────────────

move.tranchee_sanglante = {
    id: 'tranchee_sanglante',
    name: 'Tranchée Sanglante',
    cooldownMs: 2200,
    effects: [
        { type: 'damage',    element: 'neutre', damage: { min: 10, max: 14 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.10, target: 'ally_min_hp' }
    ]
}

summons.epee_vorace = {
    id:    'epee_vorace',
    name:  'Épée Vorace',
    image: 'img/classes/invocations/epee_vorace.png',
    bst:   { spd: 100 },
    moves: ['tranchee_sanglante']
}

// #endregion
// #region ECAFLIP ─────────────────────────────────────────────────

move.griffade = {
    id: 'griffade',
    name: 'Griffade',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 6, max: 9 }, target: 'enemy' },
        { type: 'buff', stat: 'critChance', value: 5, duration: 2, target: 'ally_random' }
    ]
}

summons.chaton_enrage = {
    id:    'chaton_enrage',
    name:  'Chaton Enragé',
    image: 'img/classes/invocations/chaton_enrage.png',
    bst:   { spd: 120 },
    moves: ['griffade']
}

// #endregion
// #region HUPPERMAGE ──────────────────────────────────────────────

move.rayon_quadramental = {
    id: 'rayon_quadramental',
    name: 'Rayon Quadramental',
    cooldownMs: 2000,
    effects: [{ type: 'absorbElementDmg', damage: { min: 10, max: 15 }, fallbackElement: 'neutre', target: 'enemy' }]
}
summons.gardien_Elementaire = {
    id:    'gardien_Elementaire',
    name:  'Gardien Élémentaire',
    image: 'img/classes/invocations/gardien_Elementaire.png',
    scale: 2,
    bst:   { spd: 100 },
    moves: ['rayon_quadramental']
}

// #endregion
