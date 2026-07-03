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
    image: 'img/classes/invocations/pelle_anime.png',
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
// #region OSAMODAS ────────────────────────────────────────────────────────────

// ── Tofu (Air, soigne, retire Tacle, repousse) ──
move.beco_beco = {
    id: 'beco_beco',
    name: 'Béco-béco',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 12, max: 14 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' }
    ]
}
move.voltige_tofu = {
    id: 'voltige_tofu',
    name: 'Voltige',
    cooldownMs: 3000,
    effects: [{ type: 'heal%maxHp', heal: 4, target: 'ally_min_hp' }]
}
summons.tofu_osamodas = {
    id:    'tofu_osamodas',
    name:  'Tofu',
    image: 'img/classes/invocations/osa_tofu.png',
    bst:   { spd: 120 },
    moves: ['beco_beco', 'voltige_tofu']
}

// ── Bouftou (Terre, soigne, retire Fuite, se téléporte) ──
move.meuuuh = {
    id: 'meuuuh',
    name: 'Meuuuh',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 12, max: 14 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.vigueur_bouftou = {
    id: 'vigueur_bouftou',
    name: 'Vigueur',
    cooldownMs: 3000,
    effects: [{ type: 'heal%maxHp', heal: 4, target: 'ally_min_hp' }]
}
summons.bouftou_osamodas = {
    id:    'bouftou_osamodas',
    name:  'Bouftou',
    image: 'img/classes/invocations/osa_bouftou.png',
    bst:   { spd: 90 },
    moves: ['meuuuh', 'vigueur_bouftou']
}

// ── Crapipou (Eau + poison, soigne, s'éloigne) ──
move.crachat_visqueux = {
    id: 'crachat_visqueux',
    name: 'Crachat Visqueux',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 12, max: 14 }, target: 'enemy' },
        { type: 'dot', element: 'eau', value: 5, duration: 3, label: 'Poison', target: 'enemy' }
    ]
}
move.regeneration_crapipou = {
    id: 'regeneration_crapipou',
    name: 'Régénération',
    cooldownMs: 3000,
    effects: [
        { type: 'heal%maxHp', heal: 4, target: 'ally_min_hp' },
        { type: 'recul', target: 'self' }
    ]
}
summons.crapipou_osamodas = {
    id:    'crapipou_osamodas',
    name:  'Crapipou',
    image: 'img/classes/invocations/crapeau.png',
    bst:   { spd: 100 },
    moves: ['crachat_visqueux', 'regeneration_crapipou']
}

// ── Dragoune (Feu, soigne, retire Puissance) ──
move.souffle_de_feu_dragoune = {
    id: 'souffle_de_feu_dragoune',
    name: 'Souffle de Feu',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 12, max: 14 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 20, duration: 2, target: 'enemy' }
    ]
}
move.soins_dragoune = {
    id: 'soins_dragoune',
    name: 'Secours',
    cooldownMs: 3000,
    effects: [{ type: 'heal%maxHp', heal: 4, target: 'ally_min_hp' }]
}
summons.dragoune_osamodas = {
    id:    'dragoune_osamodas',
    name:  'Dragoune',
    image: 'img/classes/invocations/dragoune.png',
    bst:   { spd: 100 },
    moves: ['souffle_de_feu_dragoune', 'soins_dragoune']
}

// ── Ventritofu (Air renforcé, repousse, gagne de la vitesse) ──
move.picpic_aile = {
    id: 'picpic_aile',
    name: 'Pic-Pic Aile',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' }
    ]
}
move.envol_ventri = {
    id: 'envol_ventri',
    name: 'Envol',
    cooldownMs: 2500,
    effects: [{ type: 'buff', stat: 'spd', value: 20, duration: 2, target: 'self' }]
}
summons.ventritofu_osamodas = {
    id:    'ventritofu_osamodas',
    name:  'Ventritofu',
    image: 'img/classes/invocations/gwotofu.png',
    bst:   { spd: 130 },
    moves: ['picpic_aile', 'envol_ventri']
}

// ── Bouflourd (Terre renforcé, réduit dommages subis, attire) ──
move.charge_bouflourd = {
    id: 'charge_bouflourd',
    name: 'Charge',
    cooldownMs: 2200,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'buff', stat: 'damageReductionPct', value: 15, duration: 2, target: 'self' }
    ]
}
move.attraction_bouflourd = {
    id: 'attraction_bouflourd',
    name: 'Attraction',
    cooldownMs: 2500,
    effects: [{ type: 'avance', target: 'enemy' }]
}
summons.bouflourd_osamodas = {
    id:    'bouflourd_osamodas',
    name:  'Bouflourd',
    image: 'img/classes/invocations/chefbouftou.png',
    bst:   { spd: 85 },
    moves: ['charge_bouflourd', 'attraction_bouflourd']
}

// ── Crapipaud (Eau + venin renforcé, repousse, gagne de la vitesse) ──
move.crachat_acide = {
    id: 'crachat_acide',
    name: 'Crachat Acide',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'dot', element: 'eau', value: 8, duration: 3, label: 'Venin', target: 'enemy' }
    ]
}
move.bond_crapipaud = {
    id: 'bond_crapipaud',
    name: 'Bond',
    cooldownMs: 2500,
    effects: [
        { type: 'buff', stat: 'spd', value: 10, duration: 2, target: 'self' },
        { type: 'recul', target: 'enemy' }
    ]
}
summons.crapipaud_osamodas = {
    id:    'crapipaud_osamodas',
    name:  'Crapipaud',
    image: 'img/classes/invocations/gros crapeau.png',
    bst:   { spd: 105 },
    moves: ['crachat_acide', 'bond_crapipaud']
}

// ── Dragonnet (Feu renforcé, augmente Puissance, repousse) ──
move.souffle_dragonnet = {
    id: 'souffle_dragonnet',
    name: 'Souffle',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 20, duration: 2, target: 'self' },
        { type: 'recul', target: 'enemy' }
    ]
}
summons.dragonnet_osamodas = {
    id:    'dragonnet_osamodas',
    name:  'Dragonnet',
    image: 'img/classes/invocations/osa_dragonnet.png',
    bst:   { spd: 105 },
    moves: ['souffle_dragonnet']
}

// ── Gobgob Glouton (Neutre, intercepte les dommages alliés) ──
move.morsure_gloutonne = {
    id: 'morsure_gloutonne',
    name: 'Morsure Gloutonne',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'neutre', damage: { min: 18, max: 22 }, target: 'enemy' }]
}
move.interception_gobgob = {
    id: 'interception_gobgob',
    name: 'Interception',
    cooldownMs: 4000,
    effects: [{ type: 'damageShare', redirectPct: 50, duration: 3, target: 'owner' }]
}
summons.esprit_glouton_osamodas = {
    id:    'esprit_glouton_osamodas',
    name:  'Gobgob Glouton',
    image: 'img/classes/invocations/Gobgob_Glouton.png',
    bst:   { spd: 80 },
    moves: ['morsure_gloutonne', 'interception_gobgob']
}

// ── Craquolosse (Terre, retire des PM, augmente ses résistances) ──
move.fronde_rocheuse = {
    id: 'fronde_rocheuse',
    name: 'Fronde Rocheuse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 22, max: 26 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.coeur_de_pierre = {
    id: 'coeur_de_pierre',
    name: 'Cœur de Pierre',
    cooldownMs: 2500,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 18, max: 22 }, target: 'enemy' },
        { type: 'buff', stat: 'res_all', value: 15, duration: 2, target: 'self' }
    ]
}
summons.craquolosse_osamodas = {
    id:    'craquolosse_osamodas',
    name:  'Craquolosse',
    image: 'img/classes/invocations/craqueleur.png',
    bst:   { spd: 95 },
    moves: ['fronde_rocheuse', 'coeur_de_pierre']
}

// ── Crocoléreux (Eau, retire des Critiques, réduit dommages reçus) ──
move.crocs_colereux = {
    id: 'crocs_colereux',
    name: 'Crocs Coléreux',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 24, max: 28 }, target: 'enemy' },
        { type: 'debuff', stat: 'critChance', value: 15, duration: 2, target: 'enemy' }
    ]
}
move.trombe_bourbeuse = {
    id: 'trombe_bourbeuse',
    name: 'Trombe Bourbeuse',
    cooldownMs: 2500,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 18, max: 22 }, target: 'enemy' },
        { type: 'buff', stat: 'damageReductionPct', value: 15, duration: 2, target: 'self' }
    ]
}
summons.crocolereux_osamodas = {
    id:    'crocolereux_osamodas',
    name:  'Crocoléreux',
    image: 'img/classes/invocations/croco.png',
    bst:   { spd: 90 },
    moves: ['crocs_colereux', 'trombe_bourbeuse']
}

// ── Sulfénix (Feu, augmente ses Soins, se soigne/téléporte) ──
move.sulfuria = {
    id: 'sulfuria',
    name: 'Sulfuria',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 20, max: 24 }, target: 'enemy' },
        { type: 'buff', stat: 'healPct', value: 20, duration: 2, target: 'self' }
    ]
}
move.danse_flammes = {
    id: 'danse_flammes',
    name: 'Danse Flammes',
    cooldownMs: 2500,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'heal%maxHp', heal: 6, target: 'ally_min_hp' }
    ]
}
summons.sulfenix_osamodas = {
    id:    'sulfenix_osamodas',
    name:  'Sulfénix',
    image: 'img/classes/invocations/phoenix.png',
    bst:   { spd: 100 },
    moves: ['sulfuria', 'danse_flammes']
}

// ── Scarafoudre (Air, bouclier, retire des Critiques) ──
move.scarapace = {
    id: 'scarapace',
    name: 'Scarapace',
    cooldownMs: 2500,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'shield', value: 100, duration: 2, target: 'self' }
    ]
}
move.scarafusee = {
    id: 'scarafusee',
    name: 'Scarafusée',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 22, max: 26 }, target: 'enemy' },
        { type: 'debuff', stat: 'critChance', value: 15, duration: 2, target: 'enemy' }
    ]
}
summons.scarafoudre_osamodas = {
    id:    'scarafoudre_osamodas',
    name:  'Scarafoudre',
    image: 'img/classes/invocations/scara.png',
    bst:   { spd: 110 },
    moves: ['scarapace', 'scarafusee']
}

// ── Esprit Facétieux / Gobgob Facétieux (Neutre, échange de position) ──
move.gobstitution = {
    id: 'gobstitution',
    name: 'Gobstitution',
    cooldownMs: 2500,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 20, max: 24 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.gobjection = {
    id: 'gobjection',
    name: 'Gobjection',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 15, duration: 2, target: 'enemy' }
    ]
}
summons.esprit_facetieux_osamodas = {
    id:    'esprit_facetieux_osamodas',
    name:  'Gobgob Facétieux',
    image: 'img/classes/invocations/Gobgob_facécieux.png',
    bst:   { spd: 85 },
    moves: ['gobstitution', 'gobjection']
}

// #endregion
// #region SADIDA ──────────────────────────────────────────────────────────────

// ── La Folle (dot Air + ralentissement) ──
move.agacement = {
    id: 'agacement',
    name: 'Agacement',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'air', value: 8, duration: 3, label: 'Infection', target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
summons.la_folle_sadida = {
    id:    'la_folle_sadida',
    name:  'La Folle',
    image: 'img/classes/invocations/la_folle.png',
    bst:   { spd: 110 },
    moves: ['agacement']
}

// ── La Bloqueuse (interception des dommages reçus par le lanceur) ──
move.substitution_bloqueuse = {
    id: 'substitution_bloqueuse',
    name: 'Substitution',
    cooldownMs: 3000,
    effects: [{ type: 'damageShare', redirectPct: 60, duration: 3, target: 'owner' }]
}
summons.la_bloqueuse_sadida = {
    id:    'la_bloqueuse_sadida',
    name:  'La Bloqueuse',
    image: 'img/classes/invocations/la_bloqueuse.png',
    bst:   { spd: 80 },
    moves: ['substitution_bloqueuse']
}

// ── La Sacrifiée (attaque Eau faible, explose à la mort) ──
move.morsure_sacrifiee = {
    id: 'morsure_sacrifiee',
    name: 'Morsure',
    cooldownMs: 2500,
    effects: [{ type: 'damage', element: 'eau', damage: { min: 12, max: 16 }, target: 'enemy' }]
}
summons.la_sacrifiee_sadida = {
    id:    'la_sacrifiee_sadida',
    name:  'La Sacrifiée',
    image: 'img/classes/invocations/la_sacrifiee.png',
    bst:   { spd: 100 },
    moves: ['morsure_sacrifiee'],
    onDeath: [
        { type: 'damage', element: 'eau', damage: { min: 40, max: 55 }, target: 'enemy' },
        { type: 'heal%maxHp', heal: 5, target: 'ally_min_hp' }
    ]
}

// ── La Gonflable (soin + feu + repousse) ──
move.soin_gonflable = {
    id: 'soin_gonflable',
    name: 'Sève Curative',
    cooldownMs: 2500,
    effects: [{ type: 'heal%maxHp', heal: 5, target: 'ally_min_hp' }]
}
move.explosion_gonflable = {
    id: 'explosion_gonflable',
    name: 'Explosion',
    cooldownMs: 3000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 14, max: 18 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' }
    ]
}
summons.la_gonflable_sadida = {
    id:    'la_gonflable_sadida',
    name:  'La Gonflable',
    image: 'img/classes/invocations/la_gonflable.png',
    bst:   { spd: 95 },
    moves: ['soin_gonflable', 'explosion_gonflable']
}

// ── Arbre de Vie (soin passif de l'allié le plus faible) ──
move.soin_arbre = {
    id: 'soin_arbre',
    name: 'Sève de Vie',
    cooldownMs: 2000,
    effects: [{ type: 'heal%maxHp', heal: 5, target: 'ally_min_hp' }]
}
summons.arbre_de_vie_sadida = {
    id:    'arbre_de_vie_sadida',
    name:  'Arbre de Vie',
    image: 'img/classes/invocations/arbre.png',
    bst:   { spd: 60 },
    moves: ['soin_arbre']
}

// ── Puissance Sylvestre / Tréant (infect + soin allié) ──
move.infection_treant = {
    id: 'infection_treant',
    name: 'Infection',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'air', value: 10, duration: 3, label: 'Infection', target: 'enemy' }
    ]
}
move.seve_treant = {
    id: 'seve_treant',
    name: 'Sève',
    cooldownMs: 2500,
    effects: [{ type: 'heal%maxHp', heal: 5, target: 'ally_min_hp' }]
}
summons.puissance_sylvestre_sadida = {
    id:    'puissance_sylvestre_sadida',
    name:  'Tréant',
    image: 'img/classes/invocations/trean.png',
    bst:   { spd: 70 },
    moves: ['infection_treant', 'seve_treant']
}

// ── La Surpuissante (Terre, debuff spd, se buff) ──
move.frappe_sylvestre = {
    id: 'frappe_sylvestre',
    name: 'Frappe Sylvestre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 18, max: 22 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.puissance_terrienne = {
    id: 'puissance_terrienne',
    name: 'Puissance Terrienne',
    cooldownMs: 3000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 22, max: 28 }, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 20, duration: 2, target: 'self' }
    ]
}
summons.la_surpuissante_sadida = {
    id:    'la_surpuissante_sadida',
    name:  'La Surpuissante',
    image: 'img/classes/invocations/la_surpuissante.png',
    bst:   { spd: 100 },
    moves: ['frappe_sylvestre', 'puissance_terrienne']
}

// ── Versions transmutées (tier supérieur) ──
move.agacement_transmute = {
    id: 'agacement_transmute',
    name: 'Agacement Virulent',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'air', value: 14, duration: 3, label: 'Infection Virulente', target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 15, duration: 2, target: 'enemy' }
    ]
}
summons.la_folle_transmutee_sadida = {
    id:    'la_folle_transmutee_sadida',
    name:  'La Folle Transmutée',
    image: 'img/classes/invocations/la_folle.png',
    bst:   { spd: 120 },
    moves: ['agacement_transmute']
}

move.substitution_transmutee = {
    id: 'substitution_transmutee',
    name: 'Substitution Renforcée',
    cooldownMs: 3000,
    effects: [
        { type: 'damageShare', redirectPct: 75, duration: 3, target: 'owner' },
        { type: 'buff', stat: 'damageReductionPct', value: 15, duration: 2, target: 'owner' }
    ]
}
summons.la_bloqueuse_transmutee_sadida = {
    id:    'la_bloqueuse_transmutee_sadida',
    name:  'La Bloqueuse Transmutée',
    image: 'img/classes/invocations/la_bloqueuse.png',
    bst:   { spd: 85 },
    moves: ['substitution_transmutee']
}

summons.la_sacrifiee_transmutee_sadida = {
    id:    'la_sacrifiee_transmutee_sadida',
    name:  'La Sacrifiée Transmutée',
    image: 'img/classes/invocations/la_sacrifiee.png',
    bst:   { spd: 100 },
    moves: ['morsure_sacrifiee'],
    onDeath: [
        { type: 'damage', element: 'eau', damage: { min: 60, max: 80 }, target: 'enemy' },
        { type: 'heal%maxHp', heal: 10, target: 'ally_min_hp' }
    ]
}

// ── Influence Végétale (buff allié + debuff ennemi) ──
move.seve_fortifiante = {
    id: 'seve_fortifiante',
    name: 'Sève Fortifiante',
    cooldownMs: 2500,
    effects: [{ type: 'buff', stat: 'atk', value: 20, duration: 2, target: 'ally_min_hp' }]
}
move.affaiblissement_vegetal = {
    id: 'affaiblissement_vegetal',
    name: 'Affaiblissement Végétal',
    cooldownMs: 2500,
    effects: [{ type: 'debuff', stat: 'atk', value: 20, duration: 2, target: 'enemy' }]
}
summons.influence_vegetale_sadida = {
    id:    'influence_vegetale_sadida',
    name:  'Influence Végétale',
    image: 'img/classes/invocations/groute.png',
    bst:   { spd: 90 },
    moves: ['seve_fortifiante', 'affaiblissement_vegetal']
}

move.soin_gonflable_transmute = {
    id: 'soin_gonflable_transmute',
    name: 'Sève Curative Renforcée',
    cooldownMs: 2500,
    effects: [{ type: 'heal%maxHp', heal: 8, target: 'ally_min_hp' }]
}
move.explosion_gonflable_transmute = {
    id: 'explosion_gonflable_transmute',
    name: 'Explosion Renforcée',
    cooldownMs: 3000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 20, max: 24 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' }
    ]
}
summons.la_gonflable_transmutee_sadida = {
    id:    'la_gonflable_transmutee_sadida',
    name:  'La Gonflable Transmutée',
    image: 'img/classes/invocations/la_gonflable.png',
    bst:   { spd: 105 },
    moves: ['soin_gonflable_transmute', 'explosion_gonflable_transmute']
}

move.frappe_sylvestre_transmute = {
    id: 'frappe_sylvestre_transmute',
    name: 'Frappe Sylvestre Renforcée',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 15, duration: 2, target: 'enemy' }
    ]
}
move.puissance_terrienne_transmute = {
    id: 'puissance_terrienne_transmute',
    name: 'Puissance Terrienne Renforcée',
    cooldownMs: 3000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 32, max: 38 }, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 30, duration: 2, target: 'self' }
    ]
}
summons.la_surpuissante_transmutee_sadida = {
    id:    'la_surpuissante_transmutee_sadida',
    name:  'La Surpuissante Transmutée',
    image: 'img/classes/invocations/la_surpuissante.png',
    bst:   { spd: 110 },
    moves: ['frappe_sylvestre_transmute', 'puissance_terrienne_transmute']
}

// #endregion
// #region XELOR ────────────────────────────────────────────────────────────────

move.ralentissement_complice = {
    id: 'ralentissement_complice',
    name: 'Ralentissement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 10, max: 12 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
summons.complice_xelor = {
    id:    'complice_xelor',
    name:  'Complice',
    image: 'img/classes/invocations/complice.png',
    bst:   { spd: 100 },
    moves: ['ralentissement_complice']
}

move.synchronisation = {
    id: 'synchronisation',
    name: 'Synchronisation',
    cooldownMs: 2000,
    effects: [{ type: 'buff', stat: 'spd', value: 20, duration: 2, target: 'ally_random' }]
}
move.chronodrain = {
    id: 'chronodrain',
    name: 'Chronodrain',
    cooldownMs: 2200,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 16, max: 18 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 8, duration: 2, target: 'enemy' }
    ]
}
summons.synchro_xelor = {
    id:    'synchro_xelor',
    name:  'Synchro',
    image: 'img/classes/invocations/synchro.png',
    bst:   { spd: 110 },
    moves: ['synchronisation', 'chronodrain']
}

move.detraquement = {
    id: 'detraquement',
    name: 'Détraquement',
    cooldownMs: 2200,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 20, max: 24 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 15, duration: 3, target: 'enemy' }
    ]
}
move.avance_temporelle = {
    id: 'avance_temporelle',
    name: 'Avance Temporelle',
    cooldownMs: 2500,
    effects: [{ type: 'buff', stat: 'spd', value: 25, duration: 2, target: 'self' }]
}
summons.cadran_de_xelor_xelor = {
    id:    'cadran_de_xelor_xelor',
    name:  'Cadran de Xélor',
    image: 'img/classes/invocations/cadran_xelor.png',
    bst:   { spd: 120 },
    moves: ['detraquement', 'avance_temporelle']
}

// #endregion
// #region STEAMER ──────────────────────────────────────────────────────────────

move.harpon_perforant = {
    id: 'harpon_perforant',
    name: 'Harpon Perforant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 14, max: 16 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' }
    ]
}
summons.harponneuse_steamer = {
    id:    'harponneuse_steamer',
    name:  'Harponneuse',
    image: 'img/classes/invocations/harponneuse.png',
    bst:   { spd: 100 },
    moves: ['harpon_perforant']
}

move.rempart_vapeur = {
    id: 'rempart_vapeur',
    name: 'Rempart de Vapeur',
    cooldownMs: 2500,
    effects: [{ type: 'shield', value: 100, duration: 2, target: 'ally_random' }]
}
summons.gardienne_steamer = {
    id:    'gardienne_steamer',
    name:  'Gardienne',
    image: 'img/classes/invocations/gardienne.png',
    bst:   { spd: 80 },
    moves: ['rempart_vapeur']
}

move.manoeuvre_tactique = {
    id: 'manoeuvre_tactique',
    name: 'Manœuvre Tactique',
    cooldownMs: 2500,
    effects: [{ type: 'buff', stat: 'atk', value: 20, duration: 2, target: 'ally_random' }]
}
move.tir_ajuste_tactirelle = {
    id: 'tir_ajuste_tactirelle',
    name: 'Tir Ajusté',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'air', damage: { min: 18, max: 20 }, target: 'enemy' }]
}
summons.tactirelle_steamer = {
    id:    'tactirelle_steamer',
    name:  'Tactirelle',
    image: 'img/classes/invocations/tactirelle.png',
    bst:   { spd: 105 },
    moves: ['manoeuvre_tactique', 'tir_ajuste_tactirelle']
}

move.filet_de_chalut = {
    id: 'filet_de_chalut',
    name: 'Filet de Chalut',
    cooldownMs: 2500,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 20, max: 24 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
summons.chalutier_steamer = {
    id:    'chalutier_steamer',
    name:  'Chalutier',
    image: 'img/classes/invocations/chalutier.png',
    bst:   { spd: 90 },
    moves: ['filet_de_chalut']
}

move.forage_profond = {
    id: 'forage_profond',
    name: 'Forage Profond',
    cooldownMs: 2200,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 22, max: 26 }, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 10, duration: 2, target: 'enemy' }
    ]
}
summons.foreuse_steamer = {
    id:    'foreuse_steamer',
    name:  'Foreuse',
    image: 'img/classes/invocations/foreuse.png',
    bst:   { spd: 95 },
    moves: ['forage_profond']
}

move.plongee_abyssale = {
    id: 'plongee_abyssale',
    name: 'Plongée Abyssale',
    cooldownMs: 3000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 20, duration: 2, target: 'self' },
        { type: 'shield', value: 120, duration: 2, target: 'self' }
    ]
}
summons.bathyscaphe_steamer = {
    id:    'bathyscaphe_steamer',
    name:  'Bathyscaphe',
    image: 'img/classes/invocations/bathyscaphe.png',
    bst:   { spd: 75 },
    moves: ['plongee_abyssale']
}

// #endregion
// #region ELIOTROPE ────────────────────────────────────────────────────────────

move.frappe_multielementaire = {
    id: 'frappe_multielementaire',
    name: 'Frappe Multiélémentaire',
    cooldownMs: 3000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 8, max: 10 }, target: 'enemy' },
        { type: 'damage', element: 'feu',   damage: { min: 8, max: 10 }, target: 'enemy' },
        { type: 'damage', element: 'eau',   damage: { min: 8, max: 10 }, target: 'enemy' },
        { type: 'damage', element: 'air',   damage: { min: 8, max: 10 }, target: 'enemy' }
    ]
}
move.saut_de_portail = {
    id: 'saut_de_portail',
    name: 'Saut de Portail',
    cooldownMs: 2500,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'buff', stat: 'spd', value: 15, duration: 2, target: 'self' }
    ]
}
summons.vestige_eliotrope = {
    id:    'vestige_eliotrope',
    name:  'Vestige',
    image: 'img/classes/invocations/totem_elio.png',
    bst:   { spd: 100 },
    moves: ['frappe_multielementaire', 'saut_de_portail']
}

// #endregion
