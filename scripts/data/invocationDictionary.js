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

move.Sac_Rifice = {
    id: 'Sac_Rifice',
    name: 'Sac Rifice',
    cooldownMs: 2000,
    effects: [{ type: 'interception', target: 'self' }]
}
move.Deblayage = {
    id: 'Deblayage',
    name: 'Déblayage',
    cooldownMs: 1500,
    effects: [{ type: 'recul', target: 'enemy' }]
}
move.Butin_Partage = {
    id: 'Butin_Partage',
    name: 'Butin Partagé',
    cooldownMs: 2000,
    effects: [{ type: 'damageShare', redirectPct: 50, duration: 3, splitToTeam: true, target: 'owner' }]
}
move.Bechattaque = {
    id: 'Bechattaque',
    name: 'Bêchattaque',
    cooldownMs: 2000,
    effects: [{ type: 'damage',    element: 'terre', damage: { min: 24, max: 30 }, target: 'enemy' }]
}
move.Prospection = {
    id: 'Prospection',
    name: 'Prospection',
    cooldownMs: 2000,
    effects: [{ type: 'damage',    element: 'eau', damage: { min: 24, max: 30 }, target: 'enemy' }]
}
move.Malle_aux_Tresors = {
    id: 'Malle_aux_Tresors',
    name: 'Malle aux Trésors',
    cooldownMs: 2000,
    effects: [{ type: 'damage',    element: 'feu', damage: { min: 24, max: 30 }, target: 'enemy' },{type: 'drop_bonus', value: 10}]
}
move.Pelle_de_Fortune = {
    id: 'Pelle_de_Fortune',
    name: 'Pelle de Fortune',
    cooldownMs: 2000,
    effects: [{ type: 'damage',    element: 'air', damage: { min: 24, max: 30 }, target: 'enemy' },{type: 'drop_bonus', value: 10}]
}
summons.pelle_animee = {
    id:    'pelle_animee',
    name:  'Pelle Animée',
    image: 'img/classes/invocations/pelle_animee.png',
    bst:   { spd: 100 },
    moves: ['Deblayage']
}
summons.sac_anime = {
    id:    'sac_anime',
    name:  'Sac Animé',
    image: 'img/classes/invocations/sac_anime.png',
    bst:   { spd: 110 },
    moves: ['Sac_Rifice']
}
summons.musette_anime = {
    id:    'musette_anime',
    name:  'Musette Animée',
    image: 'img/classes/invocations/musette_anime.png',
    bst:   { spd: 110 },
    moves: ['Butin_Partage']
}
summons.beche_anime = {
    id:    'beche_anime',
    name:  'Bêche Animée',
    image: 'img/classes/invocations/beche_anime.png',
    bst:   { spd: 110 },
    moves: ['Bechattaque']
}
summons.coffre_anime = {
    id:    'coffre_anime',
    name:  'Coffre Animé',
    image: 'img/classes/invocations/coffre_anime.png',
    bst:   { spd: 110 },
    moves: ['Prospection']
}
summons.malle_anime = {
    id:    'malle_anime',
    name:  'Malle Animée',
    image: 'img/classes/invocations/malle_anime.png',
    bst:   { spd: 110 },
    moves: ['Malle_aux_Tresors']
}
summons.Pelle_Fortunee = {
    id:    'Pelle_Fortunee',
    name:  'Pelle Fortunée',
    image: 'img/classes/invocations/pelle_de_fortune.png',
    bst:   { spd: 110 },
    moves: ['Pelle_de_Fortune']
}

// #endregion
// #region SACRIEUR ────────────────────────────────────────────────

move.tourbillon_Sanglant = {
    id: 'tourbillon_Sanglant',
    name: 'Tourbillon Sanglant',
    cooldownMs: 2200,
    effects: [
        { type: 'damage',    element: 'neutre', damage: { min: 24, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.10, target: 'ally_min_hp' }]
}
move.Soif_de_Sang = {
    id: 'Soif_de_Sang',
    name: 'Soif de Sang',
    cooldownMs: 2200,
    effects: [
        { type: 'damage',    element: 'neutre', damage: { min: 24, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.10, target: 'self' }]
}
summons.epee_vorace = {
    id:    'epee_vorace',
    name:  'Épée Vorace',
    image: 'img/classes/invocations/epee_vorace.png',
    bst:   { spd: 100 },
    moves: ['tourbillon_Sanglant','Soif_de_Sang']
}

move.tourbillon_Sanglant = {
    id: 'tourbillon_Sanglant',
    name: 'Tourbillon Sanglant',
    cooldownMs: 2200,
    effects: [
        { type: 'damage',    element: 'neutre', damage: { min: 24, max: 30 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' }]
}
move.Danse_Mortelle = {
    id: 'Danse_Mortelle',
    name: 'Danse Mortelle',
    cooldownMs: 2200,
    effects: [
        { type: 'damage',    element: 'neutre', damage: { min: 24, max: 30 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' }]
}
summons.Danse_lames = {
    id:    'Danse_lames',
    name:  'Danse-lames',
    image: 'img/classes/invocations/epee_dansante.png',
    bst:   { spd: 100 },
    moves: ['Danse_lames','Danse Mortelle']
}
// #endregion
// #region ECAFLIP ─────────────────────────────────────────────────

move.ame_Feline = {
    id: 'ame_Feline',
    name: 'Âme Féline',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 50, max: 65 }, target: 'enemy' },
        { type: 'buff', stat: 'critChance', value: 5, duration: 2, target: 'ally_random' }
    ]
}
move.Deplacement_Felin = {
    id: 'Deplacement_Felin',
    name: 'Déplacement Félin',
    cooldownMs: 2000,
    effects: [{ type: 'buff', stat: 'spd', value: 15, duration: 2, target: 'self' }]
}
move.Rugissement = {
    id: 'Rugissement',
    name: 'Rugissement',
    cooldownMs: 2000,
    effects: [{ type: 'buff', stat: 'atk', value: 50, duration: 2, target: 'self' }]
}
summons.chaton_enrage = {
    id:    'chaton_enrage',
    name:  'Chaton Enragé',
    image: 'img/classes/invocations/chaton_enrage.png',
    bst:   { spd: 120 },
    moves: ['ame_Feline','Rugissement','Deplacement_Felin']
}
move.Pattes_de_lExpert = {
    id: 'Pattes_de_lExpert',
    name: "Pattes de l'Expert",
    cooldownMs: 2000,
    effects: [{ type: 'buff', stat: 'spd', value: 15, duration: 2, target: 'ally_random' }]
}
move.Mistigri = {
    id: 'Mistigri',
    name: 'Mistigri',
    cooldownMs: 2000,
    effects: [{ type: 'heal', heal: { min: 120, max: 130 }, target: 'ally_min_hp' }]
}
summons.chaton_affectueux = {
    id:    'chaton_affectueux',
    name:  'Chaton Affectueux',
    image: 'img/classes/invocations/chaton_affectueux.png',
    bst:   { spd: 100 },
    moves: ['Mistigri','Pattes_de_lExpert']
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
// #region IOP ──────────────────────────────────────────────────────────────────

summons.stratege_iop = {
    id:    'stratege_iop',
    name:  'Stratège Iop',
    image: 'img/classes/invocations/stratege_iop.png',
    bst:   { spd: 100 },
    moves: [],
    ownerPassive: { stat: 'finalDamagePct', value: 50, damageCostPct: 50 }
}

// #endregion
// #region ZOBAL ────────────────────────────────────────────────────────────────

move.partage_douleur = {
    id: 'partage_douleur',
    name: 'Partage de Douleur',
    cooldownMs: 3000,
    effects: [{ type: 'damageShare', redirectPct: 50, duration: 3, target: 'owner' }]
}

summons.grimace_zobal = {
    id:    'grimace_zobal',
    name:  'Grimace',
    image: 'img/classes/invocations/grimace_zobal.png',
    bst:   { spd: 110 },
    moves: ['partage_douleur']
}

// #endregion
