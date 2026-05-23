// mstrMoveDictionary.js — Sorts/attaques des monstres DofusChill
// Étend l'objet `move` défini dans moveDictionary.js

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RÉFÉRENCE EFFETS DE SORTS — copier-coller prêt à l'emploi
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ÉLÉMENTS    : neutre | terre | feu | eau | air
TARGET       : enemy | self | all_allies | ally_random | ally_min_hp | all_enemies (raid, solo = ennemi principal)
STATS BUFF   : atk | spd | flatDamage | finalDamagePct | spellDamagePct | damageReductionPct | critChance | critDamagePct

──────────────────────────────────────────────────────────────────────────────
DÉGÂTS
──────────────────────────────────────────────────────────────────────────────

// Dégâts directs (élément fixe)
{ type: 'damage', element: 'feu', damage: { min: 10, max: 20 }, target: 'enemy' }

// Dégâts directs (élément aléatoire parmi une liste, tiré à chaque cast)
{ type: 'damage', elements: ['feu', 'eau', 'terre', 'air'], damage: { min: 10, max: 20 }, target: 'enemy' }

// Dégâts basés sur les HP (ignorent ATK et flatDamage, soumis aux résistances et critiques)
// source : 'casterMaxHp' | 'casterCurrentHp' | 'targetMaxHp' | 'targetCurrentHp'
{ type: 'damage', element: 'feu', damageHpPct: { source: 'casterMaxHp',     pct: 33 }, target: 'enemy' }
{ type: 'damage', element: 'feu', damageHpPct: { source: 'casterCurrentHp', pct: 20 }, target: 'enemy' }
{ type: 'damage', element: 'feu', damageHpPct: { source: 'targetMaxHp',     pct: 15 }, target: 'enemy' }
{ type: 'damage', element: 'feu', damageHpPct: { source: 'targetCurrentHp', pct: 10 }, target: 'enemy' }

// Dégâts sur la durée (DOT — tique au début du tour de la cible)
{ type: 'dot', element: 'feu', value: 10, duration: 3, target: 'enemy' }

──────────────────────────────────────────────────────────────────────────────
SOINS
──────────────────────────────────────────────────────────────────────────────

// heal accepte une valeur fixe ou une plage aléatoire : heal: 50  ou  heal: { min: 40, max: 60 }
{ type: 'heal', heal: 50,                   target: 'self' }
{ type: 'heal', heal: { min: 40, max: 60 }, target: 'self' }

// Soin fixe sur toute l'équipe (formule : heal × (1 + healTeamPct/100))
{ type: 'heal_team', heal: 30 }

// Soin en % des HP max du caster
{ type: 'heal%maxHp', heal: 70, target: 'self' }

// Soin en % des HP max de chaque allié vivant
{ type: 'heal%maxHp_team', heal: 20 }

// Vol de vie — soigne le caster d'un % des dégâts infligés par l'effet PRÉCÉDENT
// (placer obligatoirement après un effet damage dans le tableau effects)
{ type: 'lifesteal', ratio: 0.5, target: 'self' }

──────────────────────────────────────────────────────────────────────────────
BUFFS / DEBUFFS
──────────────────────────────────────────────────────────────────────────────

// Buff sur le caster
{ type: 'buff', stat: 'atk', value: 30, duration: 3, target: 'self' }

// Buff sur toute l'équipe alliée
{ type: 'buff_team', stat: 'atk', value: 20, duration: 2 }

// Debuff sur la cible adverse
{ type: 'debuff', stat: 'atk', value: 40, duration: 3, target: 'enemy' }

──────────────────────────────────────────────────────────────────────────────
SPÉCIAUX
──────────────────────────────────────────────────────────────────────────────

// Bouclier absorbant les dégâts avant les HP (ne se restack pas)
{ type: 'shield', value: 100, duration: 3, target: 'self' }

// Renvoi partiel — renvoie ratio% du prochain coup reçu, le caster encaisse le reste (usage unique)
{ type: 'renvoi', ratio: 0.5, target: 'self' }

// Renvoi total — renvoie ratio% du prochain coup reçu, le caster encaisse 0 (usage unique)
{ type: 'renvoiTotal', ratio: 1.0, target: 'self' }

// Switch forcé du membre actif adverse
// value: nb de crans à avancer dans la liste des membres vivants (1 seul vivant = aucun effet)
{ type: 'switch', value: 1, target: 'enemy' }

// Relance le sort PRÉCÉDENT dans la rotation une deuxième fois
// (sequence [A, B, repeat, C] → A – B – repeat – B – C – A – B – repeat – B – C)
{ type: 'repeat', target: 'self' }

// Invocation ennemie — remplace l'ennemi actif pour N actions
{ type: 'summon', summonId: 'kardorib', duration: 4, target: 'enemy' }

// Invocation aléatoire depuis une liste
{ type: 'summon', summonPool: ['tofu', 'bouftou', 'arakne'], duration: 3, target: 'enemy' }

// Portail Éliotrope : boost caster (+selfBonus% dmg, -resMalus% rés) + alliés (+allyBonus% dmg)
{ type: 'portal', duration: 3, selfBonus: 25, resMalus: 10, allyBonus: 10, target: 'self' }

// Tourelle Steamer : DoT élémentaire sur l'ennemi, s'affiche "Tourelle" dans le log
{ type: 'turret', element: 'feu', value: 20, duration: 3, target: 'enemy' }

// Bloque totalement tous les soins de la cible pendant N tours
{ type: 'antiHeal', duration: 3, target: 'enemy' }

// Effet aléatoire pondéré — tire une branche parmi choices selon les probabilités (sum = 1.0)
// Chaque branche a un `chance` (0.0–1.0) et un tableau `effects` exécuté si tiré
// Les sous-effets sont complets : damage, buff, heal, dot, etc.
// Le lastDamageDealt est propagé pour permettre lifesteal en sous-effet
{ type: 'random', choices: [
    { chance: 0.70, effects: [{ type: 'damage', element: 'terre', damage: {min: 18, max: 18}, target: 'enemy' }] },
    { chance: 0.30, effects: [{ type: 'heal', heal: 50, target: 'self' }] }
]}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STRUCTURE D'UN SORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

move.monSort = {
    id: 'monSort',
    name: 'Nom du Sort',
    cooldownMs: 2000,
    effects: [
        { type: 'damage',    element: 'feu',  damage: { min: 10, max: 20 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5,                                    target: 'self'  },
        { type: 'debuff',    stat: 'atk', value: 20, duration: 2,           target: 'enemy' },
    ]
}

*/

// mstrMoveDictionary.js — version format effects

move.coupdepoutch = {
    id: 'coupdepoutch',
    name: "Coup de poutch",
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'neutre', damage: { min: 0, max: 0 }, target: 'enemy'}]
}

// ═══════════════════════════════════════════════════════
// #region INCARNAM
move.petit_coup_du_Chafer = {
    id: 'petit_coup_du_Chafer',
    name: "Petit coup du Chafer",
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'terre', damage: { min: 21, max: 25 }, target: 'enemy'}]
}
move.fleche_de_feu = {
    id: 'fleche_de_feu',
    name: 'Flèche de feu',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'feu', damage: { min: 8, max: 12 }, target: 'enemy'},
              {type: 'dot', element: 'feu', value: 5, duration: 2, target: 'enemy'}]
}
move.empalement = {
    id: 'empalement',
    name: 'empalement',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy'}]
}
move.embrochement = {
    id: 'embrochement',
    name: 'Embrochement',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'neutre', damage: { min: 21, max: 25 }, target: 'enemy'}]
}
move.cassecrane = {
    id: 'cassecrane',
    name: 'Casse-crâne',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'neutre', damage: { min: 34, max: 38 }, target: 'enemy'}]
}
move.appeldeKardorib = {
    id: 'appeldeKardorib',
    name: 'Aappel de Kardorib',
    cooldownMs: 2000,
    effects: [{type: 'summon', summonId: 'kardorib',duration: 4, target: 'self'}]
}
// #endregion

// ═══════════════════════════════════════════════════════
// #region CHAMPS ASTRUB 
move.herbeSauvage = {
    id: 'herbeSauvage',
    name: 'Herbe Sauvage',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'feu', damage: { min: 21, max: 30 }, target: 'enemy'}]
}
move.zizou = {
    id: 'zizou',
    name: 'ZIZOU !',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'terre', damage: { min: 11, max: 20 }, target: 'enemy'}]
}
move.petalesEmpoisonnes = {
    id: 'petalesEmpoisonnes',
    name: 'Pétale Empoisonné',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'terre', damage: { min: 10, max: 10 }, target: 'enemy'},
              {type: 'dot', element: 'terre', value: 10, duration: 2, target: 'enemy'}]
}
move.roseEpineuse = {
    id: 'roseEpineuse',
    name: 'Rose Épineuse',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'eau', damage: { min: 11, max: 14 }, target: 'enemy'}]
}
move.racinePivotante = {
    id: 'racinePivotante',
    name: 'Racine Pivotante',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'terre', damage: { min: 13, max: 18 }, target: 'enemy'}]
}
move.poisonSauvage = {
    id: 'poisonSauvage',
    name: 'Poison Sauvage',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'feu', damage: { min: 10, max: 10 }, target: 'enemy'},
              {type: 'dot', element: 'feu', value: 10, duration: 2, target: 'enemy'}]
}
move.protectiondesChamps = {
    id: 'protectiondesChamps',
    name: 'Protection des Champs',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'air', damage: { min: 13, max: 16 }, target: 'enemy'}]
}
move.fuyezPauvresFous = {
    id: 'fuyezPauvresFous',
    name: 'Fuyez ! Pauvres fous !',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'eau', damage: { min: 15, max: 20 }, target: 'enemy'},
              {type: 'debuff', stat: 'atk', value: { min: -40, max: -40 }, duration: 3, target: 'enemy'}]
}
move.desherbant = {
    id: 'desherbant',
    name: 'Désherbant',
    cooldownMs: 2000,
    effects: [
        {type: 'damage', element: 'feu', damage: { min: 11, max: 14 }, target: 'enemy'},
        {type: 'lifesteal', ratio: 0.5, target: 'self'}],
    description: "Tape l'ennemi et soigne de 50% des dégâts infligés."
}
move.engrais = {
    id: 'engrais',
    name: 'Engrais',
    cooldownMs: 2000,
    effects: [{type: 'buff', stat: 'atk', value: { min: 50, max: 75 }, duration: 3, target: 'self'}]
}
move.goinfrage = {
    id: 'goinfrage',
    name: 'Goinfrage',
    cooldownMs: 2000,
    effects: [
        {type: 'damage', element: 'eau', damage: { min: 17, max: 30 }, target: 'enemy'},
        {type: 'lifesteal', ratio: 0.5, target: 'self'}],
    description: "Tape l'ennemi et soigne de 50% des dégâts infligés."
}
move.soinFeuillu = {
    id: 'soinFeuillu',
    name: 'Soin Feuillu',
    cooldownMs: 2000,
    effects: [{type: 'heal', heal: 60, target: 'self'}],
}
move.appeldesChamps = {
    id: 'appeldesChamps',
    name: 'Appel des Champs',
    cooldownMs: 2000,
    effects: [{type: 'summon', summonPool: ['tournesolSauvage', 'roseDemoniaque', 'gardienneChampetre', 'pissenliDiabolique'], duration: 4, target: 'self'}]
}
// #endregion

// ═══════════════════════════════════════════════════════
// #region PLAGE ASTRUB 
move.Sable_Brulant = {
    id: 'Sable_Brulant',
    name: 'Sable Brûlant',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'feu', damage: { min: 13, max: 16 }, target: 'enemy'},
              {type: 'dot', element: 'feu', value: 10, duration: 2, target: 'enemy'}]
}
move.sel_Marin = {
    id: 'sel_Marin',
    name: "Sel Marin",
    cooldownMs: 2000,
    effects: [{type: 'debuff', stat: 'atk', value: { min: -50, max: -50 }, duration: 3, target: 'enemy'},
              {type: 'heal', heal: 50, target: 'self'}
    ]
}
move.resistivite = {
    id: 'resistivite',
    name: "Résistivité",
    cooldownMs: 2000,
    effects: [{type: 'debuff', stat: 'atk', value: { min: -50, max: -50 }, duration: 3, target: 'enemy'},
              {type: 'buff', stat: 'damageReductionPct', value: { min: 10, max: 10 }, duration: 2, target: 'self'}
    ]
}
move.vaguelette = {
    id: 'vaguelette',
    name: "Vaguelette",
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'eau', damage: { min: 18, max: 18 }, target: 'enemy'}]
}
move.bouffeedAir = {
    id: 'bouffeedAir',
    name: "Bouffée d'Air",
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'air', damage: { min: 17, max: 22 }, target: 'enemy'}]
}
move.onde_Enrageante = {
    id: 'onde_Enrageante',
    name: 'Onde Enrageante',
    cooldownMs: 2000,
    effects: [{type: 'debuff', stat: 'atk', value: { min: -50, max: -50 }, duration: 3, target: 'enemy'}]
}
move.reflux = {
    id: 'reflux',
    name: 'Reflux',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'terre', damage: { min: 17, max: 22 }, target: 'enemy'},
              {type: 'switch', value: 1, target: 'enemy'}]
}
move.blag = {
    id: 'blag',
    name: 'Blag',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'terre', damage: { min: 10, max: 10 }, target: 'enemy'},
              {type: 'damage', element: 'feu', damage: { min: 10, max: 10 }, target: 'enemy'},
              {type: 'damage', element: 'air', damage: { min: 10, max: 10 }, target: 'enemy'},]
}
move.klounerie = {
    id: 'klounerie',
    name: 'Klounerie',
    cooldownMs: 2000,
    effects: [{type: 'renvoi', element: 'neutre', ratio: 0.5, target: 'ennemi'}],
    description: "Renvoi 50% des dégâts infligés."
}
move.degraissage = {
    id: 'degraissage',
    name: 'Dégraissage',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'eau', damage: { min: 15, max: 20 }, target: 'enemy'},
              {type: 'lifesteal', ratio: 0.2, target: 'self'}]
}
move.rincage = {
    id: 'rincage',
    name: 'Rinçage',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'eau', damage: { min: 5, max: 15 }, target: 'enemy'}]
}
move.Regeneration_Spontanee = {
    id: 'Regeneration_Spontanee',
    name: 'Régénération Spontanée',
    cooldownMs: 3000,
    effects: [{type: 'heal%maxHp', heal: 70, target: 'self'}]
}
// #endregion

// ═══════════════════════════════════════════════════════
// #region TAINELA

move.morsure_obscure = {
    id: 'morsure_obscure',
    name: 'Morsure obscure',
    cooldownMs: 1800,
    effects: [{type: 'damage', element: 'neutre', damage: { min: 16, max: 16 }, target: 'enemy'}]
}
move.morsure_de_guerre = {
    id: 'morsure_de_guerre',
    name: 'Morsure de guerre',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'neutre', damage: { min: 25, max: 25 }, target: 'enemy'}]
}
move.halaine_du_bouftou = {
    id: 'halaine_du_bouftou',
    name: 'Halaine du bouftou',
    cooldownMs: 1800,
    effects: [{type: 'damage', element: 'air', damage: { min: 16, max: 16 }, target: 'enemy'}]
}
move.fureur_du_bouftou = {
    id: 'fureur_du_bouftou',
    name: 'Fureur du bouftou',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'terre', damage: { min: 25, max: 25 }, target: 'enemy'}]
}
move.morsure_du_bouftou = {
    id: 'morsure_du_bouftou',
    name: 'Morsure du bouftou',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'feu', damage: { min: 21, max: 21 }, target: 'enemy'}]
}
move.machouillage = {
    id: 'machouillage',
    name: 'Machouillage',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'air', damage: { min: 19, max: 19 }, target: 'enemy'}]
}
move.mordillement = {
    id: 'mordillement',
    name: 'Mordillement',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'eau', damage: { min: 19, max: 19 }, target: 'enemy'}]
}
move.morsure_royale = {
    id: 'morsure_royale',
    name: 'Morsure royale',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'feu', damage: { min: 35, max: 35 }, target: 'enemy'}]
}
move.guerison_bouftou = {
    id: 'guerison_bouftou',
    name: 'Guerison bouftou',
    cooldownMs: 2000,
    effects: [{type: 'heal', heal: 60, target: 'self'}]
}
move.cuirasse_laineuse = {
    id: 'cuirasse_laineuse',
    name: 'Cuirasse laineuse',
    cooldownMs: 3000,
    effects: [{type: 'buff', stat: 'damageReductionPct', value: 30, duration: 3, target: 'self'}]
}
// #endregion

// ═══════════════════════════════════════════════════════
// #region EVENT PIOU
move.picore = {
    id: 'picore',
    name: 'Picore',
    cooldownMs: 1500,
    effects: [{type: 'damage', element: 'neutre', damage: { min: 16, max: 20 }, target: 'enemy'}]
}
// #endregion

// ═══════════════════════════════════════════════════════
// #region SCARAFEUILLE
// Sorts partagés par les 5 scarafeuilles
move.scaraforce = {
    id: 'scaraforce',
    name: 'Scaraforce',
    cooldownMs: 2000,
    effects: [{type: 'damage', elements: ['feu', 'eau', 'terre', 'air'], damage: { min: 17, max: 19 }, target: 'enemy'}]
}
move.elemental_dispersion = {
    id: 'elemental_dispersion',
    name: 'Élémental Dispersion',
    cooldownMs: 2500,
    effects: [{type: 'buff', stat: 'flatDamage', value: 10, duration: 4, target: 'self'}]
}
// Scarafeuille Noir uniquement
move.scarinvi = {
    id: 'scarinvi',
    name: 'Scarinvi',
    cooldownMs: 3000,
    // 50% de chance d'esquiver le prochain coup — modélisé comme renvoi ratio 0 (esquive totale 1 coup)
    effects: [{type: 'renvoi', ratio: 0, target: 'self'}]
}
// Scarafeuille Blanc
move.spriti_element_blanc = {
    id: 'spriti_element_blanc',
    name: 'Spriti Élémental',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'air', damage: { min: 11, max: 15 }, target: 'enemy'}]
}
move.flammeche_air = {
    id: 'flammeche_air',
    name: 'Flammèche Air',
    cooldownMs: 3000,
    effects: [{type: 'damage', element: 'air', damageHpPct: { source: 'casterMaxHp', pct: 33 }, target: 'enemy'}]
}
// Scarafeuille Vert
move.spriti_element_vert = {
    id: 'spriti_element_vert',
    name: 'Spriti Élémental',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'terre', damage: { min: 11, max: 15 }, target: 'enemy'}]
}
move.flammeche_terre = {
    id: 'flammeche_terre',
    name: 'Flammèche Terre',
    cooldownMs: 3000,
    effects: [{type: 'damage', element: 'terre', damageHpPct: { source: 'casterMaxHp', pct: 33 }, target: 'enemy'}]
}
// Scarafeuille Rouge
move.spriti_element_rouge = {
    id: 'spriti_element_rouge',
    name: 'Spriti Élémental',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'feu', damage: { min: 11, max: 15 }, target: 'enemy'}]
}
move.flammeche_feu = {
    id: 'flammeche_feu',
    name: 'Flammèche Feu',
    cooldownMs: 3000,
    effects: [{type: 'damage', element: 'feu', damageHpPct: { source: 'casterMaxHp', pct: 33 }, target: 'enemy'}]
}
// Scarafeuille Bleu
move.spriti_element_bleu = {
    id: 'spriti_element_bleu',
    name: 'Spriti Élémental',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'eau', damage: { min: 11, max: 15 }, target: 'enemy'}]
}
move.flammeche_eau = {
    id: 'flammeche_eau',
    name: 'Flammèche Eau',
    cooldownMs: 3000,
    effects: [{type: 'damage', element: 'eau', damageHpPct: { source: 'casterMaxHp', pct: 33 }, target: 'enemy'}]
}
// Scarafeuille Immature
move.scarapoison = {
    id: 'scarapoison',
    name: 'Scarapoison',
    cooldownMs: 2000,
    effects: [{type: 'dot', elements: ['feu', 'eau', 'terre', 'air'], value: 11, duration: 3, target: 'enemy'}]
}
// Scraraboss Dorée (boss)
move.picoti = {
    id: 'picoti',
    name: 'Picoti',
    cooldownMs: 2000,
    effects: [
        {type: 'damage',    elements: ['feu', 'eau', 'terre', 'air'], damage: { min: 11, max: 15 }, target: 'enemy'},
        {type: 'lifesteal', ratio: 1.0,                                                              target: 'self'}
    ]
}
move.naissance = {
    id: 'naissance',
    name: 'Naissance',
    cooldownMs: 3000,
    effects: [{type: 'summon', summonId: 'scarafeuilleImmature', duration: 4, target: 'self'}]
}
move.premier_soins = {
    id: 'premier_soins',
    name: 'Premier Soins',
    cooldownMs: 3000,
    // soin entre 17% et 26% des HP max — valeur médiane fixe en attendant support de plage
    effects: [{type: 'heal%maxHp', heal: 20, target: 'self'}]
}
move.expulsion = {
    id: 'expulsion',
    name: 'Expulsion',
    cooldownMs: 2000,
    effects: [
        {type: 'damage', element: 'neutre', damage: { min: 22, max: 30 }, target: 'enemy'},
        {type: 'switch', value: 1,                                         target: 'enemy'}
    ]
}
// #endregion

// ═══════════════════════════════════════════════════════
// #region KWAKWA
move.griffes_acerees = {
    id: 'griffes_acerees',
    name: 'Griffes Acérées',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'neutre', damage: { min: 26, max: 35 }, target: 'enemy'}]
}
move.eventrement = {
    id: 'eventrement',
    name: 'Éventrement',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'neutre', damage: { min: 21, max: 30 }, target: 'enemy'}]
}
// Kwakere de Vent
move.wakolanterne_vent = {
    id: 'wakolanterne_vent',
    name: 'Wakolanterne',
    cooldownMs: 2000,
    effects: [
        {type: 'damage',    element: 'air', damage: { min: 6, max: 8 }, target: 'enemy'},
        {type: 'lifesteal', ratio: 1.0,                                  target: 'self'},
        {type: 'switch',    value: 1,                                    target: 'enemy'}
    ]
}
move.wakzefeute_vent = {
    id: 'wakzefeute_vent',
    name: 'Wakzefeute',
    cooldownMs: 2000,
    effects: [
        {type: 'debuff',    stat: 'atk', value: -50, duration: 2,       target: 'enemy'},
        {type: 'buff',      stat: 'atk', value:  50, duration: 2,       target: 'self'},
        {type: 'damage',    element: 'air', damage: { min: 8, max: 11 }, target: 'enemy'},
        {type: 'lifesteal', ratio: 1.0,                                  target: 'self'}
    ]
}
// Kwakere de Glace
move.wakolanterne_glace = {
    id: 'wakolanterne_glace',
    name: 'Wakolanterne',
    cooldownMs: 2000,
    effects: [
        {type: 'damage',    element: 'eau', damage: { min: 6, max: 8 }, target: 'enemy'},
        {type: 'lifesteal', ratio: 1.0,                                  target: 'self'},
        {type: 'switch',    value: 1,                                    target: 'enemy'}
    ]
}
move.wakzefeute_glace = {
    id: 'wakzefeute_glace',
    name: 'Wakzefeute',
    cooldownMs: 2000,
    effects: [
        {type: 'debuff',    stat: 'atk', value: -50, duration: 2,       target: 'enemy'},
        {type: 'buff',      stat: 'atk', value:  50, duration: 2,       target: 'self'},
        {type: 'damage',    element: 'eau', damage: { min: 8, max: 11 }, target: 'enemy'},
        {type: 'lifesteal', ratio: 1.0,                                  target: 'self'}
    ]
}
// Kwakere de Flamme
move.wakolanterne_flamme = {
    id: 'wakolanterne_flamme',
    name: 'Wakolanterne',
    cooldownMs: 2000,
    effects: [
        {type: 'damage',    element: 'feu', damage: { min: 6, max: 8 }, target: 'enemy'},
        {type: 'lifesteal', ratio: 1.0,                                  target: 'self'},
        {type: 'switch',    value: 1,                                    target: 'enemy'}
    ]
}
move.wakzefeute_flamme = {
    id: 'wakzefeute_flamme',
    name: 'Wakzefeute',
    cooldownMs: 2000,
    effects: [
        {type: 'debuff',    stat: 'atk', value: -50, duration: 2,       target: 'enemy'},
        {type: 'buff',      stat: 'atk', value:  50, duration: 2,       target: 'self'},
        {type: 'damage',    element: 'feu', damage: { min: 8, max: 11 }, target: 'enemy'},
        {type: 'lifesteal', ratio: 1.0,                                  target: 'self'}
    ]
}
// Kwakere de Terre
move.wakolanterne_terre = {
    id: 'wakolanterne_terre',
    name: 'Wakolanterne',
    cooldownMs: 2000,
    effects: [
        {type: 'damage',    element: 'terre', damage: { min: 6, max: 8 }, target: 'enemy'},
        {type: 'lifesteal', ratio: 1.0,                                    target: 'self'},
        {type: 'switch',    value: 1,                                      target: 'enemy'}
    ]
}
move.wakzefeute_terre = {
    id: 'wakzefeute_terre',
    name: 'Wakzefeute',
    cooldownMs: 2000,
    effects: [
        {type: 'debuff',    stat: 'atk', value: -50, duration: 2,         target: 'enemy'},
        {type: 'buff',      stat: 'atk', value:  50, duration: 2,         target: 'self'},
        {type: 'damage',    element: 'terre', damage: { min: 8, max: 11 }, target: 'enemy'},
        {type: 'lifesteal', ratio: 1.0,                                    target: 'self'}
    ]
}
// Kwak de Vent
move.kwakoukas_vent = {
    id: 'kwakoukas_vent',
    name: 'Kwakoukas',
    cooldownMs: 2000,
    effects: [
        {type: 'damage', element: 'air', damage: { min: 11, max: 15 }, target: 'enemy'},
        {type: 'switch', value: 1,                                      target: 'enemy'}
    ]
}
move.wakpot_vent = {
    id: 'wakpot_vent',
    name: 'Wakpot',
    cooldownMs: 2000,
    effects: [
        {type: 'debuff',  stat: 'atk', value: -50, duration: 2,       target: 'enemy'},
        {type: 'buff',    stat: 'atk', value:  50, duration: 2,       target: 'self'},
        {type: 'damage',  element: 'air', damage: { min: 6, max: 7 }, target: 'enemy'}
    ]
}
// Kwak de Flamme
move.kwakoukas_flamme = {
    id: 'kwakoukas_flamme',
    name: 'Kwakoukas',
    cooldownMs: 2000,
    effects: [
        {type: 'damage', element: 'feu', damage: { min: 11, max: 15 }, target: 'enemy'},
        {type: 'switch', value: 1,                                      target: 'enemy'}
    ]
}
move.wakpot_flamme = {
    id: 'wakpot_flamme',
    name: 'Wakpot',
    cooldownMs: 2000,
    effects: [
        {type: 'debuff',  stat: 'atk', value: -50, duration: 2,       target: 'enemy'},
        {type: 'buff',    stat: 'atk', value:  50, duration: 2,       target: 'self'},
        {type: 'damage',  element: 'feu', damage: { min: 6, max: 7 }, target: 'enemy'}
    ]
}
// Kwak de Glace
move.kwakoukas_glace = {
    id: 'kwakoukas_glace',
    name: 'Kwakoukas',
    cooldownMs: 2000,
    effects: [
        {type: 'damage', element: 'eau', damage: { min: 11, max: 15 }, target: 'enemy'},
        {type: 'switch', value: 1,                                      target: 'enemy'}
    ]
}
move.wakpot_glace = {
    id: 'wakpot_glace',
    name: 'Wakpot',
    cooldownMs: 2000,
    effects: [
        {type: 'debuff',  stat: 'atk', value: -50, duration: 2,       target: 'enemy'},
        {type: 'buff',    stat: 'atk', value:  50, duration: 2,       target: 'self'},
        {type: 'damage',  element: 'eau', damage: { min: 6, max: 7 }, target: 'enemy'}
    ]
}
// Kwak de Terre
move.kwakoukas_terre = {
    id: 'kwakoukas_terre',
    name: 'Kwakoukas',
    cooldownMs: 2000,
    effects: [
        {type: 'damage', element: 'terre', damage: { min: 11, max: 15 }, target: 'enemy'},
        {type: 'switch', value: 1,                                        target: 'enemy'}
    ]
}
move.wakpot_terre = {
    id: 'wakpot_terre',
    name: 'Wakpot',
    cooldownMs: 2000,
    effects: [
        {type: 'debuff',  stat: 'atk', value: -50, duration: 2,         target: 'enemy'},
        {type: 'buff',    stat: 'atk', value:  50, duration: 2,         target: 'self'},
        {type: 'damage',  element: 'terre', damage: { min: 6, max: 7 }, target: 'enemy'}
    ]
}
// Kwakwa (boss)
move.kwakoukas_kwayal = {
    id: 'kwakoukas_kwayal',
    name: 'Kwakoukas Kwayal',
    cooldownMs: 2000,
    effects: [
        {type: 'damage', element: 'neutre', damage: { min: 11, max: 15 }, target: 'enemy'},
        {type: 'switch', value: 1,                                         target: 'enemy'}
    ]
}
move.wakpot_kwayal = {
    id: 'wakpot_kwayal',
    name: 'Wakpot Kwayal',
    cooldownMs: 2000,
    effects: [
        {type: 'debuff',    stat: 'atk', value: -50, duration: 4,                                    target: 'enemy'},
        {type: 'buff',      stat: 'atk', value:  50, duration: 4,                                    target: 'self'},
        {type: 'damage',    elements: ['feu', 'eau', 'terre', 'air'], damage: { min: 8, max: 11 },   target: 'enemy'},
        {type: 'lifesteal', ratio: 1.0,                                                               target: 'self'}
    ]
}
move.kwabolition = {
    id: 'kwabolition',
    name: 'Kwabolition',
    cooldownMs: 3000,
    effects: [
        {type: 'damage', element: 'feu',   damage: { min: 7, max: 9 }, target: 'enemy'},
        {type: 'damage', element: 'eau',   damage: { min: 7, max: 9 }, target: 'enemy'},
        {type: 'damage', element: 'terre', damage: { min: 7, max: 9 }, target: 'enemy'},
        {type: 'damage', element: 'air',   damage: { min: 7, max: 9 }, target: 'enemy'}
    ]
}
move.kwarmee_kwayal = {
    id: 'kwarmee_kwayal',
    name: 'Kwarmée Kwayal',
    cooldownMs: 3000,
    effects: [{type: 'summon', summonPool: ['kwakGlace', 'kwakVent', 'kwakTerre', 'kwakFlamme'], duration: 1, target: 'self'}]
}
// #endregion

// ═══════════════════════════════════════════════════════
// #region EVENT DOPEUL
move.fleche_optique_du_dopeul = {
    id: 'fleche_optique_du_dopeul',
    name: 'Flèche Optique du Dopeul',
    cooldownMs: 1650,
    effects: [{ type: 'damage', element: 'air', damage: {min: 14,max: 16}, target: 'enemy'}],
}
move.fleche_glacee_du_dopeul = {
    id: 'fleche_glacee_du_dopeul',
    name: 'Flèche Glacée du Dopeul',
    cooldownMs: 1900,
    effects: [{type: 'damage', element: 'eau', damage: {min: 14,max: 16}, target: 'enemy'},
              {type: 'debuff', stat: 'atk', value: 30, duration: 2, target: 'enemy'}],
}
move.pression_du_dopeul = {
    id: 'pression_du_dopeul',
    name: 'Pression du Dopeul',
    cooldownMs: 2000,
    effects: [
        {type: 'damage', element: 'terre', damage: {min: 16, max: 18}, target: 'enemy'},
        {type: 'buff', stat: 'erosionBonus', value: 0.10, duration: 3, target: 'self'}]
}
move.epee_divine_du_dopeul = {
    id: 'epee_divine_du_dopeul',
    name: 'Épée Divine du Dopeul',
    cooldownMs: 2000,
    effects: [
        {type: 'damage', element: 'air', damage: {min: 14, max: 17}, target: 'enemy'},
        {type: 'buff', stat: 'flatDamage', value: 10, duration: 3, target: 'self'}],
}
move.mot_espiegle_du_dopeul = {
    id: 'mot_espiegle_du_dopeul',
    name: 'Mot Espiègle du Dopeul',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'air', damage: {min: 12,max: 14}, target: 'enemy'}],
}
move.mot_tapageur_du_dopeul = {
    id: 'mot_tapageur_du_dopeul',
    name: 'Mot Tapageur du Dopeul',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'feu', damage: {min: 12,max: 14}, target: 'enemy'}],
}
// feca
move.retour_du_baton_du_dopeul = {
    id: 'retour_du_baton_du_dopeul',
    name: 'Retour du Bâton du Dopeul',
    cooldownMs: 2000,
    effects: [
        {type: 'damage', element: 'terre', damage: {min: 17, max: 20}, target: 'enemy'},
        {type: 'debuff', stat: 'atk', value: 40, duration: 2, target: 'enemy'}
    ],
}
move.bulle_du_dopeul = {
    id: 'bulle_du_dopeul',
    name: 'Bulle du Dopeul',
    cooldownMs: 1800,
    effects: [{type: 'damage', element: 'eau', damage: {min: 10, max: 12}, target: 'enemy'}],
}
// osamodas
move.pics_du_prespic_du_dopeul = {
    id: 'pics_du_prespic_du_dopeul',
    name: 'Pics du Prespic du Dopeul',
    cooldownMs: 2000,
    effects: [
        {type: 'damage', element: 'neutre', damage: {min: 8, max: 10}, target: 'enemy'},
        {type: 'lifesteal', ratio: 1.0, target: 'self'}
    ],
}
move.crocs_du_mulou_du_dopeul = {
    id: 'crocs_du_mulou_du_dopeul',
    name: 'Crocs du Mulou du Dopeul',
    cooldownMs: 2200,
    effects: [
        {type: 'damage', element: 'terre', damage: {min: 17, max: 20}, target: 'enemy'},
        {type: 'buff', stat: 'flatDamage', value: 10, duration: 3, target: 'self'}
    ],
}
// enutrof
move.roulage_de_pelle_du_dopeul = {
    id: 'roulage_de_pelle_du_dopeul',
    name: 'Roulage de Pelle du Dopeul',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'feu', damage: {min: 11, max: 13}, target: 'enemy'}],
}
move.lancer_de_pieces_du_dopeul = {
    id: 'lancer_de_pieces_du_dopeul',
    name: 'Lancer de Pièces du Dopeul',
    cooldownMs: 1800,
    effects: [{type: 'damage', element: 'eau', damage: {min: 7, max: 9}, target: 'enemy'}],
}
// sram
move.truanderie_du_dopeul = {
    id: 'truanderie_du_dopeul',
    name: 'Truanderie du Dopeul',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'terre', damage: {min: 15, max: 17}, target: 'enemy'}],
}
move.arsenic_du_dopeul = {
    id: 'arsenic_du_dopeul',
    name: 'Arsenic du Dopeul',
    cooldownMs: 2000,
    effects: [{type: 'dot', element: 'air', value: 11, duration: 3, target: 'enemy'}],
}
// xelor
move.gelure_du_dopeul = {
    id: 'gelure_du_dopeul',
    name: 'Gelure du Dopeul',
    cooldownMs: 2000,
    effects: [
        {type: 'damage', element: 'eau', damage: {min: 8, max: 10}, target: 'enemy'},
        {type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy'}
    ],
}
move.frappe_de_xelor_du_dopeul = {
    id: 'frappe_de_xelor_du_dopeul',
    name: 'Frappe de Xélor du Dopeul',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'terre', damage: {min: 13, max: 15}, target: 'enemy'},
              {type: 'recul', target: 'enemy'}],
}
// ecaflip
move.pile_ou_face_du_dopeul = {
    id: 'pile_ou_face_du_dopeul',
    name: 'Pile ou Face du Dopeul',
    cooldownMs: 2000,
    effects: [{
        type: 'random',
        choices: [
            { chance: 0.70, effects: [{type: 'damage', element: 'terre', damage: {min: 18, max: 18}, target: 'enemy'}] },
            { chance: 0.30, effects: [{type: 'heal', heal: 50, target: 'self'}] }
        ]
    }],
}
move.bonne_pioche_du_dopeul = {
    id: 'bonne_pioche_du_dopeul',
    name: 'Bonne Pioche du Dopeul',
    cooldownMs: 2200,
    effects: [{
        type: 'random',
        choices: [
            { chance: 0.30, effects: [{type: 'buff', stat: 'flatDamage', value: 10, duration: 3, target: 'self'}] },
            { chance: 0.30, effects: [{type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self'}] },
            { chance: 0.30, effects: [{type: 'buff', stat: 'spd', value: 10, duration: 3, target: 'self'}] },
            { chance: 0.10, effects: [{type: 'heal', heal: -80, target: 'self'}] }]}],
}
// sadida
move.ronce_du_dopeul = {
    id: 'ronce_du_dopeul',
    name: 'Ronce du Dopeul',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'terre', damage: {min: 14, max: 16}, target: 'enemy'}],
}
move.buisson_ardent_du_dopeul = {
    id: 'buisson_ardent_du_dopeul',
    name: 'Buisson Ardent du Dopeul',
    cooldownMs: 2000,
    effects: [{type: 'dot', element: 'feu', value: 11, duration: 3, target: 'enemy'}],
}
// sacrieur
move.supplice_du_dopeul = {
    id: 'supplice_du_dopeul',
    name: 'Supplice du Dopeul',
    cooldownMs: 2000,
    effects: [
        {type: 'damage', element: 'terre', damage: {min: 13, max: 16}, target: 'enemy'},
        {type: 'lifesteal', ratio: 1.0, target: 'self'}
    ],
}
move.absorption_du_dopeul = {
    id: 'absorption_du_dopeul',
    name: 'Absorption du Dopeul',
    cooldownMs: 2000,
    effects: [
        {type: 'damage', element: 'feu', damage: {min: 13, max: 16}, target: 'enemy'},
        {type: 'lifesteal', ratio: 1.0, target: 'self'}
    ],
}
// roublard
move.espingole_du_dopeul = {
    id: 'espingole_du_dopeul',
    name: 'Espingole du Dopeul',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'air', damage: {min: 15, max: 17}, target: 'enemy'}],
}
move.pulsar_du_dopeul = {
    id: 'pulsar_du_dopeul',
    name: 'Pulsar du Dopeul',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'feu', damage: {min: 17, max: 19}, target: 'enemy'}],
}
// pandawa
move.paume_explosive_du_dopeul = {
    id: 'paume_explosive_du_dopeul',
    name: 'Paume Explosive du Dopeul',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'feu', damage: {min: 12, max: 14}, target: 'enemy'}],
}
move.ethylo_du_dopeul = {
    id: 'ethylo_du_dopeul',
    name: 'Ethylo du Dopeul',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'eau', damage: {min: 15, max: 17}, target: 'enemy'}],
}
// zobal
move.parafuso_du_dopeul = {
    id: 'parafuso_du_dopeul',
    name: 'Parafuso du Dopeul',
    cooldownMs: 2000,
    effects: [
        {type: 'damage', element: 'eau', damage: {min: 13, max: 15}, target: 'enemy'},
        {type: 'lifesteal', ratio: 1.0, target: 'self'}
    ],
}
move.plastron_du_dopeul = {
    id: 'plastron_du_dopeul',
    name: 'Plastron du Dopeul',
    cooldownMs: 2000,
    effects: [{type: 'shield', value: 200, duration: 3, target: 'self'}],
}
// steamer
move.longue_vue_du_dopeul = {
    id: 'longue_vue_du_dopeul',
    name: 'Longue-vue du Dopeul',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'eau', damage: {min: 15, max: 17}, target: 'enemy'}],
}
move.amarrage_du_dopeul = {
    id: 'amarrage_du_dopeul',
    name: 'Amarrage du Dopeul',
    cooldownMs: 2000,
    effects: [
        {type: 'damage', element: 'terre', damage: {min: 11, max: 13}, target: 'enemy'},
        {type: 'lifesteal', ratio: 1.0, target: 'self'}
    ],
}
// eliotrope
move.affront_du_dopeul = {
    id: 'affront_du_dopeul',
    name: 'Affront du Dopeul',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'air', damage: {min: 15, max: 17}, target: 'enemy'}],
}
move.rayon_de_wakfu_du_dopeul = {
    id: 'rayon_de_wakfu_du_dopeul',
    name: 'Rayon de Wakfu du Dopeul',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'feu', damage: {min: 15, max: 17}, target: 'enemy'}],
}
// huppermage
move.onde_sismique_du_dopeul = {
    id: 'onde_sismique_du_dopeul',
    name: 'Onde Sismique du Dopeul',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'terre', damage: {min: 15, max: 17}, target: 'enemy'}],
}
move.stalagmite_du_dopeul = {
    id: 'stalagmite_du_dopeul',
    name: 'Stalagmite du Dopeul',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'eau', damage: {min: 17, max: 19}, target: 'enemy'}],
}
// ouginak
move.traque_du_dopeul = {
    id: 'traque_du_dopeul',
    name: 'Traque du Dopeul',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'feu', damage: {min: 19, max: 21}, target: 'enemy'}],
}
move.molosse_du_dopeul = {
    id: 'molosse_du_dopeul',
    name: 'Molosse du Dopeul',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'terre', damage: {min: 18, max: 20}, target: 'enemy'}],
}
// forgelance
move.trident_de_la_mer_du_dopeul = {
    id: 'trident_de_la_mer_du_dopeul',
    name: 'Trident de la Mer du Dopeul',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'eau', damage: {min: 13, max: 15}, target: 'enemy'}],
}
move.volee_d_airain_du_dopeul = {
    id: 'volee_d_airain_du_dopeul',
    name: "Volée d'Airain du Dopeul",
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'air', damage: {min: 14, max: 16}, target: 'enemy'}],
}
// dopeul_darkvlad
move.lame_de_iop = {
    id: 'lame_de_iop',
    name: 'lame de Iop',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'terre', damage: {min: 30, max: 45}, target: 'enemy'}],
}
move.lame_divine = {
    id: 'lame_divine',
    name: "Lame Divine",
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'air', damage: {min: 25, max: 40}, target: 'enemy'}],
}
move.tession = {
    id: 'tession',
    name: 'Tession',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'feu', damage: {min: 20, max: 35}, target: 'enemy', erosionRate: 0.15}]
}
// #endregion