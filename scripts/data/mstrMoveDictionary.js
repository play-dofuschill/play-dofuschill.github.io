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
    effects: [{type: 'buff', stat: 'atk', value: { min: 50, max: 75 }, duration: 2, target: 'self'}]
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
              {type: 'buff', stat: 'damageReductionPct', value: { min: 10, max: 10 }, duration: 1, target: 'self'}
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
    effects: [{type: 'buff', stat: 'damageReductionPct', value: 30, duration: 2, target: 'self'}]
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
    effects: [{type: 'buff', stat: 'flatDamage', value: 10, duration: 3, target: 'self'}]
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
        {type: 'lifesteal', ratio: 0.2, target: 'self'}]
}
move.naissance = {
    id: 'naissance',
    name: 'Naissance',
    cooldownMs: 4000,
    effects: [{type: 'summon', summonId: 'scarafeuilleImmature', duration: 4, target: 'self'}]
}
move.premier_soins = {
    id: 'premier_soins',
    name: 'Premier Soins',
    cooldownMs: 3500,
    effects: [{type: 'heal%maxHp', heal: 5, target: 'self'}]
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
        {type: 'buff',      stat: 'atk', value:  50, duration: 1,       target: 'self'},
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
        {type: 'buff',      stat: 'atk', value:  50, duration: 1,       target: 'self'},
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
        {type: 'buff',      stat: 'atk', value:  50, duration: 1,       target: 'self'},
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
        {type: 'buff',      stat: 'atk', value:  50, duration: 1,         target: 'self'},
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
        {type: 'buff',    stat: 'atk', value:  50, duration: 1,       target: 'self'},
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
        {type: 'buff',    stat: 'atk', value:  50, duration: 1,       target: 'self'},
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
        {type: 'buff',    stat: 'atk', value:  50, duration: 1,       target: 'self'},
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
        {type: 'buff',    stat: 'atk', value:  50, duration: 1,         target: 'self'},
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
        {type: 'buff',      stat: 'atk', value:  50, duration: 3,                                    target: 'self'},
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
// #region EVENT FORET ASTRUB
move.flair = {
    id: 'flair',
    name: 'Flair',
    cooldownMs: 2000,
    effects: [{ type: 'buff', stat: 'atk', value: 40, duration: 2, target: 'self' }],
}
move.deboyautage = {
    id: 'deboyautage',
    name: 'Déboyautage',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 21,max: 30}, target: 'enemy'}],
}
move.moquerie = {
    id: 'moquerie',
    name: 'Moquerie',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 21,max: 26}, target: 'enemy'}],
}
move.cache_cache = {
    id: 'cache_cache',
    name: 'Cache Cache',
    cooldownMs: 2200,
    effects: [{type: 'renvoi', ratio: 0, target: 'self'}],
}
move.perce_vessie = {
    id: 'perce_vessie',
    name: 'Perce-Vessie',
    cooldownMs: 1650,
    effects: [{type: 'damage', element: 'terre', damage: { min: 17, max: 22 }, target: 'enemy'},
              {type: 'switch', value: 1, target: 'enemy'}]
}
move.charge_forcee = {
    id: 'charge_forcee',
    name: 'Charge Forcée',
    cooldownMs: 2200,
    effects: [{ type: 'buff', stat: 'spd', value: 20, duration: 1, target: 'self' }],
}
move.taie_de_gland = {
    id: 'taie_de_gland',
    name: 'Taie de Gland',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'neutre', damage: {min: 11,max: 16}, target: 'enemy'}],
}
move.rafale_venteuse = {
    id: 'rafale_venteuse',
    name: 'Rafale Venteuse',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'vent', damage: {min: 21,max: 28}, target: 'enemy'},
              { type: 'heal', heal: { min: 11, max: 20 }, target: 'self'}],
}
move.griffe_de_ours = {
    id: 'griffe_de_ours',
    name: "Griffe de l'Homme-Ours",
    cooldownMs: 3000,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 50,max: 56}, target: 'enemy'}],
}
move.rage_de_Ours = {
    id: 'rage_de_Ours',
    name: "Rage de l'Ours",
    cooldownMs: 2200,
    effects: [{ type: 'buff', stat: 'flatDamage', value: 20, duration: 2, target: 'self' }],
}

// #endregion

// ═══════════════════════════════════════════════════════
// #region EVENT BIBLOP
move.bibloperie_air = {
    id: 'bibloperie_air',
    name: 'Bibloperie',
    cooldownMs: 1650,
    effects: [{ type: 'damage', element: 'air', damage: {min: 17,max: 24}, target: 'enemy'}],
}
move.biblopiment_air = {
    id: 'biblopiment_air',
    name: 'Biblopiment',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'air', damage: {min: 17,max: 24}, target: 'enemy'},
              { type: 'heal', heal: { min: 11, max: 20 }, target: 'self'}],
}
move.bibloperie_terre = {
    id: 'bibloperie_terre',
    name: 'Bibloperie',
    cooldownMs: 1650,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 17,max: 24}, target: 'enemy'}],
}
move.biblopiment_terre = {
    id: 'biblopiment_terre',
    name: 'Biblopiment',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 17,max: 24}, target: 'enemy'},
              { type: 'heal', heal: { min: 11, max: 20 }, target: 'self'}],
}
move.bibloperie_feu = {
    id: 'bibloperie_feu',
    name: 'Bibloperie',
    cooldownMs: 1650,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 17,max: 24}, target: 'enemy'}],
}
move.biblopiment_feu = {
    id: 'biblopiment_feu',
    name: 'Biblopiment',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 17,max: 24}, target: 'enemy'},
              { type: 'heal', heal: { min: 11, max: 20 }, target: 'self'}],
}
move.bibloperie_eau = {
    id: 'bibloperie_eau',
    name: 'Bibloperie',
    cooldownMs: 1650,
    effects: [{ type: 'damage', element: 'eau', damage: {min: 17,max: 24}, target: 'enemy'}],
}
move.biblopiment_eau = {
    id: 'biblopiment_eau',
    name: 'Biblopiment',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'eau', damage: {min: 17,max: 24}, target: 'enemy'},
              { type: 'heal', heal: { min: 11, max: 20 }, target: 'self'}],
}
// #endregion

// ═══════════════════════════════════════════════════════
// #region EVENT ROBOT CANIA
move.blast = {
    id: 'blast',
    name: 'Blast',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'eau', damage: {min: 21,max: 30}, target: 'enemy'},
              {type: 'buff', stat: 'atk', value:  50, duration: 3, target: 'self'}],
}
move.turbine = {
    id: 'turbine',
    name: 'Turbine',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'air', damage: {min: 21,max: 30}, target: 'enemy'},
              {type: 'debuff', stat: 'atk', value: -50, duration: 4, target: 'enemy'}],
}
move.micro_onde = {
    id: 'micro_onde',
    name: 'Micro Onde',
    cooldownMs: 2500,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 21,max: 30}, target: 'enemy'},
              { type: 'shield', value: 50, duration: 1, target: 'self' }],
}
move.macro_onde = {
    id: 'macro_onde',
    name: 'Macro Onde',
    cooldownMs: 2500,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 21,max: 30}, target: 'enemy'},
              { type: 'heal', heal: { min: 11, max: 20 }, target: 'self'}],
}
move.pousse_moi = {
    id: 'pousse_moi',
    name: 'Pousse Moi',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'air', damage: {min: 21,max: 30}, target: 'enemy'},
              { type: 'switch', value: 5, target: 'enemy' }],
}
move.pousse_toi = {
    id: 'pousse_toi',
    name: 'Pousse Toi',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 21,max: 30}, target: 'enemy'},
              { type: 'switch', value: 1, target: 'enemy' }],
}
move.construction = {
    id: 'construction',
    name: 'Construction',
    cooldownMs: 3000,
    effects: [{type: 'summon', summonPool: ['robotPoussePousse', 'robotFleau', 'robionicle'], duration: 2, target: 'self'}]
}
// #endregion

// ═══════════════════════════════════════════════════════
// #region RAID DOFUS ARGENTE
move.regain_de_vie = {
    id: 'regain_de_vie',
    name: 'Regain de vie',
    cooldownMs: 2000,
    effects: [{ type: 'heal%maxHp', heal: 15, target: 'self'},
              { type: 'antiHeal', duration: 6, target: 'all_enemies' }],
}
move.queue_du_dragon = {
    id: 'queue_du_dragon',
    name: 'Queue du dragon',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'neutre', damage: {min: 35,max: 55}, target: 'enemy'}],
}
move.souffle_de_rathrosk = {
    id: 'souffle_de_rathrosk',
    name: 'Souffle de Rathrosk',
    cooldownMs: 3500,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 25,max: 35}, target: 'all_enemies' },
              { type: 'lifesteal', ratio: 0.1, target: 'self' }],
}
// #endregion

// ═══════════════════════════════════════════════════════
// #region RAID KRALAMOUR GEANT
move.kraken_primaire = {
    id: 'kraken_primaire',
    name: 'Kraken Primaire',
    cooldownMs: 5000,
    effects: [{ type: 'damage', element: 'air', damage: {min: 3000,max: 4000}, target: 'enemy'}],
}
move.kraken_secondaire = {
    id: 'kraken_secondaire',
    name: 'Kraken Secondaire',
    cooldownMs: 5000,
    effects: [{ type: 'damage', element: 'eau', damage: {min: 55,max: 100}, target: 'enemy'},
              { type: 'antiHeal', duration: 6, target: 'enemy' }],
}
move.kraken_tertiaire = {
    id: 'kraken_tertiaire',
    name: 'Kraken Tertiaire',
    cooldownMs: 5000,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 55,max: 100}, target: 'enemy'},
              { type: 'debuff', stat: 'atk', value: 400, duration: 6, target: 'enemy' }],
}
move.kraken_quartenaire = {
    id: 'kraken_quartenaire',
    name: 'Kraken Quartenaire',
    cooldownMs: 5000,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 55,max: 100}, target: 'enemy'},
              { type: 'debuff', stat: 'spd', value: 80, duration: 2, target: 'enemy' }],
}
move.motivation_naturelle = {
    id: 'motivation_naturelle',
    name: 'Motivation Naturelle',
    cooldownMs: 3000,
    effects: [{ type: 'damage', element: 'air', damage: {min: 55,max: 100}, target: 'enemy'}],
}
move.empoisonnement_tentaculaire = {
    id: 'empoisonnement_tentaculaire',
    name: 'Empoisonnement Tentaculaire',
    cooldownMs: 3000,
    effects: [{ type: 'dot', element: 'feu', value: 75, duration: 3, target: 'enemy'}],
}
move.malediction_tentaculaire = {
    id: 'malediction_tentaculaire',
    name: 'Malédiction Tentaculaire',
    cooldownMs: 3000,
    effects: [{ type: 'dot', element: 'eau', value: 75, duration: 3, target: 'enemy'},
              { type: 'debuff', stat: 'flatDamage', value: 200, duration: 6, target: 'enemy' }],
}
move.paralysie_tentaculaire = {
    id: 'paralysie_tentaculaire',
    name: 'Paralysie Tentaculaire',
    cooldownMs: 3000,
    effects: [{ type: 'dot', element: 'eau', value: 75, duration: 3, target: 'enemy'},
              { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }],
}
move.kracheau_immobilisant = {
    id: 'kracheau_immobilisant',
    name: 'Kracheau Immobilisant',
    cooldownMs: 3500,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 250,max: 350}, target: 'random_enemy'},
              { type: 'lifesteal', ratio: 0.5, target: 'self' },
              { type: 'debuff', stat: 'spd', value: 10, duration: 3, target: 'random_enemy' }],
}
move.vulnerabilite_de_la_tourbiere = {
    id: 'vulnerabilite_de_la_tourbiere',
    name: 'Vulnérabilité de la Tourbière',
    cooldownMs: 2500,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 250,max: 350}, target: 'random_enemy'},
              { type: 'debuff', stat: 'res_all', value: 25, duration: 3, target: 'all_enemies' },
              { type: 'buff', stat: 'res_all', value: -70, duration: 3, target: 'self' }],
}
move.kraken = {
    id: 'kraken',
    name: 'Kraken',
    cooldownMs: 2000,
    effects: [{ type: 'debuff', stat: 'flatDamage', value: 800, duration: 3, target: 'enemy' }],
}
move.tourbe_ecrasante = {
    id: 'tourbe_ecrasante',
    name: 'Tourbe écrasante',
    cooldownMs: 3500,
    effects: [{ type: 'debuff', stat: 'spd', value: 50, duration: 3, target: 'all_enemies' }],
}
// #endregion

// ═══════════════════════════════════════════════════════
// #region RAID TOURBES DU ROISSINGUE

// — La Ouassingue —
move.oblativite = {
    id: 'oblativite',
    name: 'Oblativité',
    cooldownMs: 2000,
    effects: [{ type: 'renvoiTotal', ratio: 0.1, target: 'self' }],
}
move.serpilliere = {
    id: 'serpilliere',
    name: 'Serpillière',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'eau', damage: {min: 22, max: 26}, target: 'enemy'},
              { type: 'lifesteal', ratio: 0.3, target: 'self' },],
}
move.reconstitution_cellulaire = {
    id: 'reconstitution_cellulaire',
    name: 'Reconstitution Cellulaire',
    cooldownMs: 3000,
    effects: [{ type: 'heal%maxHp', heal: 15, target: 'self' }],
}

// — Le Ouassingue —
move.equarrissage = {
    id: 'equarrissage',
    name: 'Équarrissage',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'air', damage: {min: 22, max: 26}, target: 'enemy'}],
}
move.interversion = {
    id: 'interversion',
    name: 'Interversion',
    cooldownMs: 2000,
    effects: [{type: 'recul', target: 'enemy'}],
}

// — Tourbassingue —
move.tourbe_reparatrice = {
    id: 'tourbe_reparatrice',
    name: 'Tourbe réparatrice',
    cooldownMs: 2000,
    effects: [{ type: 'heal', heal: {min: 25, max: 30}, target: 'self'}],
}
move.tourbe_malveillante = {
    id: 'tourbe_malveillante',
    name: 'Tourbe Malveillante',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'air', damage: {min: 21, max: 30}, target: 'enemy'}],
}

// — Bourbassingue —
move.boue_sirupeuse = {
    id: 'boue_sirupeuse',
    name: 'Boue sirupeuse',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 21, max: 30}, target: 'enemy'}],
}
move.bourbier = {
    id: 'bourbier',
    name: 'Bourbier',
    cooldownMs: 2000,
    effects: [{ type: 'debuff', stat: 'spd', value: 20, duration: 4, target: 'enemy'}],
}

// — Roissingue (boss) —
move.retour_du_roi = {
    id: 'retour_du_roi',
    name: 'Retour du Roi',
    cooldownMs: 2000,
    effects: [{ type: 'buff', stat: 'atk', value: 100, duration: 5, target: 'self'}],
}
move.depouillage = {
    id: 'depouillage',
    name: 'Dépouillage',
    cooldownMs: 2000,
    effects: [{ type: 'debuff', stat: 'atk', value: 500, duration: 4, target: 'all_enemy'}],
}
move.dechaussage = {
    id: 'dechaussage',
    name: 'Déchaussage',
    cooldownMs: 4000,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 41, max: 60}, target: 'enemy'}],
}

// #endregion


// ═══════════════════════════════════════════════════════
// #region EVENT DOPEULS 55-70
// ═══════════════════════════════════════════════════════

// — Dopeul Cra —
move.fleche_optique_du_dopeul = {
    id: 'fleche_optique_du_dopeul',
    name: 'Flèche Optique du Dopeul',
    cooldownMs: 1600,
    effects: [{ type: 'damage', element: 'air', damage: { min: 14, max: 18 }, target: 'enemy' }],
}
move.fleche_glacee_du_dopeul = {
    id: 'fleche_glacee_du_dopeul',
    name: 'Flèche Glacée du Dopeul',
    cooldownMs: 1600,
    effects: [{ type: 'damage', element: 'eau', damage: { min: 14, max: 18 }, target: 'enemy' }],
}

// — Dopeul Iop —
move.epee_divine_du_dopeul = {
    id: 'epee_divine_du_dopeul',
    name: 'Épée Divine du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'air', damage: { min: 18, max: 22 }, target: 'enemy' },
              {type: 'buff', stat: 'flatDamage', value: 10, duration: 2, target: 'self'}],
}
move.pression_du_dopeul = {
    id: 'pression_du_dopeul',
    name: 'Pression du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 18, max: 22 }, target: 'enemy' }],
}

// — Dopeul Eniripsa —
move.mot_espiegle_du_dopeul = {
    id: 'mot_espiegle_du_dopeul',
    name: 'Mot Espiègle du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'air', damage: { min: 18, max: 22 }, target: 'enemy' }],
}
move.mot_tapageur_du_dopeul = {
    id: 'mot_tapageur_du_dopeul',
    name: 'Mot Tapageur du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'feu', damage: { min: 18, max: 22 }, target: 'enemy' }],
}

// — Dopeul Ecaflip —
move.pile_ou_face_du_dopeul = {
    id: 'pile_ou_face_du_dopeul',
    name: 'Pile ou Face du Dopeul',
    cooldownMs: 2000,
    effects: [{
        type: 'random',
        choices: [{ chance: 0.70, effects: [{ type: 'damage', element: 'terre', damage: { min: 25, max: 30 }, target: 'enemy' }] },
                  { chance: 0.30, effects: [{ type: 'heal%maxHp', heal: 10, target: 'enemy' }] }]
    }],
}
move.bonne_pioche_du_dopeul = {
    id: 'bonne_pioche_du_dopeul',
    name: 'Bonne Pioche du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'best_element_damage', damage: { min: 18, max: 22 }, target: 'enemy' }],
}

// — Dopeul Eliotrope —
move.affront_du_dopeul = {
    id: 'affront_du_dopeul',
    name: 'Affront du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'air', damage: { min: 18, max: 22 }, target: 'enemy' }],
}
move.rayon_de_wakfu_du_dopeul = {
    id: 'rayon_de_wakfu_du_dopeul',
    name: 'Rayon de Wakfu du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'feu', damage: { min: 18, max: 22 }, target: 'enemy' }],
}

// — Dopeul Enutrof —
move.roulage_de_pelle_du_dopeul = {
    id: 'roulage_de_pelle_du_dopeul',
    name: 'Roulage de Pelle du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'feu', damage: { min: 18, max: 22 }, target: 'enemy' }],
}
move.lancer_de_pieces_du_dopeul = {
    id: 'lancer_de_pieces_du_dopeul',
    name: 'Lancer de Pièces du Dopeul',
    cooldownMs: 1000,
    effects: [{ type: 'damage', element: 'eau', damage: { min: 8, max: 12 }, target: 'enemy' }],
}

// — Dopeul Feca —
move.retour_du_baton_du_dopeul = {
    id: 'retour_du_baton_du_dopeul',
    name: 'Retour du Bâton du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 18, max: 22 }, target: 'enemy' },
              { type: 'debuff', stat: 'atk', value: 20,  duration: 3, target: 'enemy'},
              { type: 'buff', stat: 'atk', value: 20,  duration: 2, target: 'self'}],
}
move.bulle_du_dopeul = {
    id: 'bulle_du_dopeul',
    name: 'Bulle du Dopeul',
    cooldownMs: 1000,
    effects: [{ type: 'damage', element: 'eau', damage: { min: 8, max: 12 }, target: 'enemy' }],
}

// — Dopeul Forgelance —
move.trident_de_la_mer_du_dopeul = {
    id: 'trident_de_la_mer_du_dopeul',
    name: 'Trident de la Mer du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'eau', damage: { min: 18, max: 22 }, target: 'enemy' }],
}
move.volee_d_airain_du_dopeul = {
    id: 'volee_d_airain_du_dopeul',
    name: "Volée d'Airain du Dopeul",
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'air', damage: { min: 18, max: 22 }, target: 'enemy' }],
}

// — Dopeul Huppermage —
move.onde_sismique_du_dopeul = {
    id: 'onde_sismique_du_dopeul',
    name: 'Onde Sismique du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 18, max: 22 }, target: 'enemy' }],
}
move.stalagmite_du_dopeul = {
    id: 'stalagmite_du_dopeul',
    name: 'Stalagmite du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'eau', damage: { min: 12, max: 18 }, target: 'enemy' },
              { type: 'lifesteal', ratio: 0.2, target: 'self' }],
}

// — Dopeul Osamodas —
move.pics_du_prespic_du_dopeul = {
    id: 'pics_du_prespic_du_dopeul',
    name: 'Pics du Prespic du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'feu', damage: { min: 18, max: 22 }, target: 'enemy' }],
}
move.crocs_du_mulou_du_dopeul = {
    id: 'crocs_du_mulou_du_dopeul',
    name: 'Crocs du Mulou du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 18, max: 22 }, target: 'enemy' }],
}

// — Dopeul Ouginak —
move.cubitus_du_dopeul = {
    id: 'cubitus_du_dopeul',
    name: 'Cubitus du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'eau', damage: { min: 14, max: 18 }, target: 'enemy' },
              {type: 'buff', stat: 'spd', value: 20,  duration: 2, target: 'self'}],
}
move.molosse_du_dopeul = {
    id: 'molosse_du_dopeul',
    name: 'Molosse du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 18, max: 22 }, target: 'enemy' }],
}

// — Dopeul Pandawa —
move.paume_explosive_du_dopeul = {
    id: 'paume_explosive_du_dopeul',
    name: 'Paume Explosive du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'feu', damage: { min: 18, max: 22 }, target: 'enemy' }],
}
move.ethylo_du_dopeul = {
    id: 'ethylo_du_dopeul',
    name: 'Éthylo du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'eau', damage: { min: 18, max: 22 }, target: 'enemy' },
              {type: 'debuff', stat: 'spd', value: 20,  duration: 3, target: 'enemy'}],
}

// — Dopeul Roublard —
move.espingole_du_dopeul = {
    id: 'espingole_du_dopeul',
    name: 'Espingole du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'air', damage: { min: 14, max: 18 }, target: 'enemy' },
              {type: 'recul', target: 'enemy'}],
}
move.pulsar_du_dopeul = {
    id: 'pulsar_du_dopeul',
    name: 'Pulsar du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'feu', damage: { min: 18, max: 22 }, target: 'enemy' }],
}

// — Dopeul Sacrieur —
move.supplice_du_dopeul = {
    id: 'supplice_du_dopeul',
    name: 'Supplice du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 18, max: 22 }, target: 'enemy' },
              { type: 'lifesteal', ratio: 0.1, target: 'self' }],
}
move.absorption_du_dopeul = {
    id: 'absorption_du_dopeul',
    name: 'Absorption du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'feu', damage: { min: 18, max: 22 }, target: 'enemy' },
              { type: 'lifesteal', ratio: 0.1, target: 'self' }],
}

// — Dopeul Sadida —
move.ronce_du_dopeul = {
    id: 'ronce_du_dopeul',
    name: 'Ronce du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 18, max: 22 }, target: 'enemy' }],
}
move.buisson_ardent_du_dopeul = {
    id: 'buisson_ardent_du_dopeul',
    name: 'Buisson Ardent du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'feu', damage: { min: 8, max: 12 }, target: 'enemy' },
              { type: 'dot', element: 'feu', value: 10, duration: 3, target: 'enemy' }],
}

// — Dopeul Sram —
move.truanderie_du_dopeul = {
    id: 'truanderie_du_dopeul',
    name: 'Truanderie du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 18, max: 22 }, target: 'enemy' }],
}
move.arsenic_du_dopeul = {
    id: 'arsenic_du_dopeul',
    name: 'Arsenic du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'air', damage: { min: 8, max: 12 }, target: 'enemy' },
              { type: 'dot', element: 'air', value: 10, duration: 3, target: 'enemy' }],
}

// — Dopeul Steamer —
move.longue_vue_du_dopeul = {
    id: 'longue_vue_du_dopeul',
    name: 'Longue Vue du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'eau', damage: { min: 18, max: 22 }, target: 'enemy' }],
}
move.amarrage_du_dopeul = {
    id: 'amarrage_du_dopeul',
    name: 'Amarrage du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'air', damage: { min: 18, max: 22 }, target: 'enemy' }],
}

// — Dopeul Zobal —
move.parafuso_du_dopeul = {
    id: 'parafuso_du_dopeul',
    name: 'Parafuso du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'eau', damage: { min: 18, max: 22 }, target: 'enemy' }],
}
move.plastron_du_dopeul = {
    id: 'plastron_du_dopeul',
    name: 'Plastron du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'shield', value: 200, duration: 2, target: 'self' }],
}

// — Dopeul Xelor —
move.gelure_du_dopeul = {
    id: 'gelure_du_dopeul',
    name: 'Gelure du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'air', damage: { min: 18, max: 22 }, target: 'enemy' },
              {type: 'recul', target: 'enemy'}],
}
move.frappe_de_xelor_du_dopeul = {
    id: 'frappe_de_xelor_du_dopeul',
    name: 'Frappe de Xélor du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 18, max: 22 }, target: 'enemy' },
              {type: 'avance', target: 'enemy'}],
}
move.lame_de_iop = {
    id: 'lame_de_iop',
    name: 'Lame de iop',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 37, max: 40 }, target: 'enemy' }],
}
move.lame_divine = {
    id: 'lame_divine',
    name: 'Lame divine',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'air', damage: { min: 21, max: 24 }, target: 'enemy' },
              {type: 'buff', stat: 'flatDamage', value: 20,  duration: 3, target: 'self'}],
}
move.tension = {
    id: 'tension',
    name: 'Tension',
    cooldownMs: 2000,
    effects: [
        {type: 'damage', element: 'feu', damage: {min: 21, max: 26}, target: 'enemy'},
        {type: 'buff', stat: 'erosionBonus', value: 15, duration: 3, target: 'self'}]
}
// #endregion


// ═══════════════════════════════════════════════════════
// #region BLOP — Zone niveau 50-70
// ═══════════════════════════════════════════════════════

// — Blop Coco (air) —
move.bloperie_air = {
    id: 'bloperie_air',
    name: 'Bloperie',
    cooldownMs: 1650,
    effects: [{ type: 'damage', element: 'air', damage: {min: 35, max: 45}, target: 'enemy'}],
}
move.blopiment_air = {
    id: 'blopiment_air',
    name: 'Blopiment',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'air',   damage: {min: 25, max: 35}, target: 'enemy'},
              { type: 'heal',                      heal:   {min: 22, max: 32}, target: 'self' }],
}

// — Blop Griotte (feu) —
move.bloperie_feu = {
    id: 'bloperie_feu',
    name: 'Bloperie',
    cooldownMs: 1650,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 35, max: 45}, target: 'enemy'}],
}
move.blopiment_feu = {
    id: 'blopiment_feu',
    name: 'Blopiment',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'feu',   damage: {min: 25, max: 35}, target: 'enemy'},
              { type: 'heal',                      heal:   {min: 22, max: 32}, target: 'self' }],
}

// — Blop Indigo (eau) —
move.bloperie_eau = {
    id: 'bloperie_eau',
    name: 'Bloperie',
    cooldownMs: 1650,
    effects: [{ type: 'damage', element: 'eau', damage: {min: 35, max: 45}, target: 'enemy'}],
}
move.blopiment_eau = {
    id: 'blopiment_eau',
    name: 'Blopiment',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'eau',   damage: {min: 25, max: 35}, target: 'enemy'},
              { type: 'heal',                      heal:   {min: 22, max: 32}, target: 'self' }],
}

// — Blop Reinette (terre) —
move.bloperie_terre = {
    id: 'bloperie_terre',
    name: 'Bloperie',
    cooldownMs: 1650,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 35, max: 45}, target: 'enemy'}],
}
move.blopiment_terre = {
    id: 'blopiment_terre',
    name: 'Blopiment',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 25, max: 35}, target: 'enemy'},
              { type: 'heal',                      heal:   {min: 22, max: 32}, target: 'self' }],
}

// — Blopignon —
move.bloblo = {
    id: 'bloblo',
    name: 'Bloblo',
    cooldownMs: 2000,
    effects: [{ type: 'damage', elements: ['feu', 'eau', 'terre', 'air'], damage: {min: 30, max: 40}, target: 'enemy'}],
}
move.blopiction = {
    id: 'blopiction',
    name: 'Blopiction',
    cooldownMs: 2200,
    effects: [{ type: 'damage', elements: ['feu', 'eau', 'terre', 'air'], damage: {min: 15, max: 20}, target: 'enemy'},
              { type: 'debuff', stat: 'atk', value: -40, duration: 2, target: 'enemy'}],
}
move.bloprojection = {
    id: 'bloprojection',
    name: 'Bloprojection',
    cooldownMs: 2000,
    effects: [{ type: 'damage', elements: ['feu', 'eau', 'terre', 'air'], damage: {min: 30, max: 40}, target: 'enemy'},
              { type: 'switch', value: 1, target: 'enemy'}],
}

// — Tronko Blop —
move.blopsoin = {
    id: 'blopsoin',
    name: 'Blopsoin',
    cooldownMs: 3000,
    effects: [{ type: 'heal%maxHp', heal: 20, target: 'self'}],
}
move.blopzone = {
    id: 'blopzone',
    name: 'Blopzone',
    cooldownMs: 2500,
    effects: [{ type: 'damage', elements: ['feu', 'eau', 'terre', 'air'], damage: {min: 25, max: 35}, target: 'all_enemies'}],
}

// — Glouto Blop —
move.gloutage = {
    id: 'gloutage',
    name: 'Gloutage',
    cooldownMs: 2200,
    effects: [{ type: 'damage', elements: ['feu', 'eau', 'terre', 'air'], damage: {min: 35, max: 50}, target: 'enemy'},
              { type: 'lifesteal', ratio: 0.5, target: 'self'}],
}

// ═══════════════════════════════════════════════════════
// DONJON BLOP — Royaume des Blops Royaux
// ═══════════════════════════════════════════════════════

// Partagé par les 4 Royaux
move.blotravail_Royal = {
    id: 'blotravail_Royal',
    name: 'Blotravail Royal',
    cooldownMs: 2500,
    effects: [{ type: 'buff', stat: 'flatDamage', value: 30, duration: 3, target: 'self'}],
}

// Blop Coco Royal (air)
move.blopunition_Royale_air = {
    id: 'blopunition_Royale_air',
    name: 'Blopunition Royale',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'air', damage: {min: 60, max: 80}, target: 'enemy'}],
}
move.blotection_air = {
    id: 'blotection_air',
    name: 'Blotection',
    cooldownMs: 3000,
    effects: [{ type: 'shield', value: 500, duration: 2, target: 'self'},
              { type: 'buff', stat: 'damageReductionPct', value: 20, duration: 2, target: 'self'}],
}

// Blop Griotte Royal (feu)
move.blopunition_Royale_feu = {
    id: 'blopunition_Royale_feu',
    name: 'Blopunition Royale',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 60, max: 80}, target: 'enemy'}],
}
move.blotection_feu = {
    id: 'blotection_feu',
    name: 'Blotection',
    cooldownMs: 3000,
    effects: [{ type: 'shield', value: 500, duration: 2, target: 'self'},
              { type: 'buff', stat: 'damageReductionPct', value: 20, duration: 2, target: 'self'}],
}

// Blop Indigo Royal (eau)
move.blopunition_Royale_eau = {
    id: 'blopunition_Royale_eau',
    name: 'Blopunition Royale',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'eau', damage: {min: 60, max: 80}, target: 'enemy'}],
}
move.blotection_eau = {
    id: 'blotection_eau',
    name: 'Blotection',
    cooldownMs: 3000,
    effects: [{ type: 'shield', value: 500, duration: 2, target: 'self'},
              { type: 'buff', stat: 'damageReductionPct', value: 20, duration: 2, target: 'self'}],
}

// Blop Reinette Royal (terre)
move.blopunition_Royale_terre = {
    id: 'blopunition_Royale_terre',
    name: 'Blopunition Royale',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 60, max: 80}, target: 'enemy'}],
}
move.blotection_terre = {
    id: 'blotection_terre',
    name: 'Blotection',
    cooldownMs: 3000,
    effects: [{ type: 'shield', value: 500, duration: 2, target: 'self'},
              { type: 'buff', stat: 'damageReductionPct', value: 20, duration: 2, target: 'self'}],
}

// #endregion


// ═══════════════════════════════════════════════════════
// #region MANTISCORE — Zone niveau 60-80
// ═══════════════════════════════════════════════════════

// — Ouroboulos —
move.Sablacane = {
    id: 'Sablacane',
    name: 'Sablacane',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 35, max: 45}, target: 'enemy'},
              { type: 'dot',    element: 'terre', value: 12, duration: 2,      target: 'enemy'}],
}
move['Roulo-Boulos'] = {
    id: 'Roulo-Boulos',
    name: 'Roulo-Boulos',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'neutre', damage: {min: 40, max: 55}, target: 'enemy'},
              { type: 'switch', value: 1,                                       target: 'enemy'}],
}
move.Carapassable = {
    id: 'Carapassable',
    name: 'Carapassable',
    cooldownMs: 3000,
    effects: [{ type: 'buff', stat: 'damageReductionPct', value: 25, duration: 2, target: 'self'}],
}

// — Scordion Bleu —
move.Pince_pattes = {
    id: 'Pince_pattes',
    name: 'Pince-pattes',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'neutre', damage: {min: 40, max: 55}, target: 'enemy'}],
}
move.Dard_Empoisonne = {
    id: 'Dard_Empoisonne',
    name: 'Dard Empoisonné',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 20, max: 25}, target: 'enemy'},
              { type: 'dot',    element: 'terre', value: 18, duration: 3,      target: 'enemy'}],
}
move.Creuse_sable = {
    id: 'Creuse_sable',
    name: 'Creuse Sable',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 30, max: 40}, target: 'enemy'},
              { type: 'debuff', stat: 'atk', value: -40, duration: 2,          target: 'enemy'}],
}

// — Fennex —
move.Reconnaissance = {
    id: 'Reconnaissance',
    name: 'Reconnaissance',
    cooldownMs: 2500,
    effects: [{ type: 'buff', stat: 'spd', value: 20, duration: 2, target: 'self'}],
}
move.Entrave_Sableuse = {
    id: 'Entrave_Sableuse',
    name: 'Entrave Sableuse',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 30, max: 40}, target: 'enemy'},
              { type: 'debuff', stat: 'spd', value: -20, duration: 2,          target: 'enemy'}],
}
move.Enragement_Motivant = {
    id: 'Enragement_Motivant',
    name: 'Enragement Motivant',
    cooldownMs: 2500,
    effects: [{ type: 'buff', stat: 'atk', value: 50, duration: 2, target: 'self'},
              { type: 'buff', stat: 'atk', value: 30, duration: 2, target: 'ally_random'}],
}

// — Léolhyène —
move.Sirocco = {
    id: 'Sirocco',
    name: 'Sirocco',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'air', damage: {min: 40, max: 55}, target: 'enemy'}],
}
move.Mort_sure = {
    id: 'Mort_sure',
    name: 'Mort Sûre',
    cooldownMs: 2500,
    effects: [{ type: 'damage', element: 'neutre', damage: {min: 50, max: 65}, target: 'enemy'}],
}
move.Hyaignement = {
    id: 'Hyaignement',
    name: 'Hyaignement',
    cooldownMs: 2000,
    effects: [{ type: 'debuff', stat: 'atk', value: -50, duration: 3, target: 'enemy'}],
}

// — Boulepique (élite) —
move['Lance-boulettes'] = {
    id: 'Lance-boulettes',
    name: 'Lance-boulettes',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'neutre', damage: {min: 20, max: 28}, target: 'enemy'},
              { type: 'damage', element: 'neutre', damage: {min: 20, max: 28}, target: 'enemy'}],
}
move.Pique_rate = {
    id: 'Pique_rate',
    name: 'Pique Raté',
    cooldownMs: 2200,
    effects: [{ type: 'damage',   element: 'neutre', damage: {min: 45, max: 60}, target: 'enemy'},
              { type: 'lifesteal', ratio: 0.3,                                    target: 'self' }],
}
move.Durcissement = {
    id: 'Durcissement',
    name: 'Durcissement',
    cooldownMs: 3000,
    effects: [{ type: 'shield', value: 600, duration: 2, target: 'self'}],
}

// — Mantiscore (boss, donjon, hp 3500 atk 290) —
move.darmocles = {
    id: 'darmocles',
    name: "Dar'Mocles",
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'neutre', damage: {min: 60, max: 80}, target: 'enemy'},
              { type: 'debuff', stat: 'atk', value: -50, duration: 3,           target: 'enemy'}],
}
move.force_Poigne = {
    id: 'force_Poigne',
    name: 'Force Poigne',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 70, max: 90}, target: 'enemy'}],
}
move.tombeau_du_desert = {
    id: 'tombeau_du_desert',
    name: 'Tombeau du Désert',
    cooldownMs: 3000,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 40, max: 55}, target: 'all_enemies'},
              { type: 'dot',    element: 'terre', value: 20, duration: 3,      target: 'all_enemies'}],
}
move.garde_bouclier = {
    id: 'garde_bouclier',
    name: 'Garde Bouclier',
    cooldownMs: 3500,
    effects: [{ type: 'shield', value: 800, duration: 2,                             target: 'self'},
              { type: 'buff',   stat: 'damageReductionPct', value: 25, duration: 2,  target: 'self'}],
}
// #endregion


// ═══════════════════════════════════════════════════════
// #region DRAGOEUF — Zone niveau 70-90
// ═══════════════════════════════════════════════════════

// — Dragoeuf Ardoise (eau rés) —
move.Feuilletage = {
    id: 'Feuilletage',
    name: 'Feuilletage',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'eau', damage: {min: 45, max: 60}, target: 'enemy'},
              { type: 'dot',    element: 'eau', value: 15, duration: 2,      target: 'enemy'}],
}
move.Fendage = {
    id: 'Fendage',
    name: 'Fendage',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'neutre', damage: {min: 50, max: 65}, target: 'enemy'}],
}

// — Dragoeuf Argile (air rés) —
move.Cataplasme = {
    id: 'Cataplasme',
    name: 'Cataplasme',
    cooldownMs: 2500,
    effects: [{ type: 'heal',   heal: {min: 40, max: 60},             target: 'self' },
              { type: 'debuff', stat: 'atk', value: -30, duration: 2, target: 'enemy'}],
}
move.Engobage = {
    id: 'Engobage',
    name: 'Engobage',
    cooldownMs: 3000,
    effects: [{ type: 'shield', value: 500, duration: 2,                              target: 'self'},
              { type: 'buff',   stat: 'damageReductionPct', value: 15, duration: 2,   target: 'self'}],
}

// — Dragoeuf Calcaire (terre+feu rés) —
move.Entartrage = {
    id: 'Entartrage',
    name: 'Entartrage',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 35, max: 45}, target: 'enemy'},
              { type: 'debuff', stat: 'flatDamage', value: -20, duration: 3,   target: 'enemy'}],
}
move.Calcination = {
    id: 'Calcination',
    name: 'Calcination',
    cooldownMs: 2500,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 25, max: 35}, target: 'enemy'},
              { type: 'dot',    element: 'feu', value: 20, duration: 3,      target: 'enemy'}],
}

// — Dragoeuf Charbon (feu rés) —
move.Crassier = {
    id: 'Crassier',
    name: 'Crassier',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 40, max: 55}, target: 'enemy'},
              { type: 'dot',    element: 'feu',   value: 15, duration: 2,     target: 'enemy'}],
}
move.Silicose = {
    id: 'Silicose',
    name: 'Silicose',
    cooldownMs: 2500,
    effects: [{ type: 'dot',    element: 'neutre', value: 20, duration: 4,    target: 'enemy'},
              { type: 'debuff', stat: 'atk', value: -30, duration: 3,         target: 'enemy'}],
}

// — Dragoeuf Albâtre (élite, all rés 12%) —
move.Dralbatre = {
    id: 'Dralbatre',
    name: 'Dralbatre',
    cooldownMs: 2200,
    effects: [{ type: 'damage', elements: ['feu', 'eau', 'terre', 'air'], damage: {min: 45, max: 60}, target: 'enemy'}],
}
move['Dragloméra'] = {
    id: 'Dragloméra',
    name: 'Dragloméra',
    cooldownMs: 3000,
    effects: [{ type: 'damage', element: 'feu',   damage: {min: 15, max: 20}, target: 'enemy'},
              { type: 'damage', element: 'eau',   damage: {min: 15, max: 20}, target: 'enemy'},
              { type: 'damage', element: 'terre', damage: {min: 15, max: 20}, target: 'enemy'},
              { type: 'damage', element: 'air',   damage: {min: 15, max: 20}, target: 'enemy'}],
}

// — Draegnerys (boss, donjon, hp 2500 atk 200) —
move.Pepiniere = {
    id: 'Pepiniere',
    name: 'Pépinière',
    cooldownMs: 3500,
    effects: [{ type: 'summon', summonPool: ['dragoeufArdoise', 'dragoeufArgile', 'dragoeufCalcaire', 'dragoeufCharbon'], duration: 3, target: 'self'}],
}
move.Knout = {
    id: 'Knout',
    name: 'Knout',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'neutre', damage: {min: 55, max: 70}, target: 'enemy'},
              { type: 'debuff', stat: 'atk', value: -50, duration: 2,           target: 'enemy'}],
}
move.Drakaaris = {
    id: 'Drakaaris',
    name: 'Drakaaris',
    cooldownMs: 3500,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 45, max: 60}, target: 'all_enemies'},
              { type: 'dot',    element: 'feu', value: 25, duration: 3,      target: 'all_enemies'}],
}
// #endregion


// ═══════════════════════════════════════════════════════
// #region ABRAKNYDE ANCESTRAL — Zone niveau 80-100
// ═══════════════════════════════════════════════════════

// — Abrakne Sombre —
move.Bond_affaiblissant = {
    id: 'Bond_affaiblissant',
    name: 'Bond Affaiblissant',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'neutre', damage: {min: 45, max: 60}, target: 'enemy'},
              { type: 'debuff', stat: 'atk', value: -50, duration: 3,           target: 'enemy'}],
}
move.Abraknettoyage = {
    id: 'Abraknettoyage',
    name: 'Abraknettoyage',
    cooldownMs: 2500,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 40, max: 55}, target: 'enemy'},
              { type: 'debuff', stat: 'flatDamage', value: -25, duration: 3,  target: 'enemy'}],
}
move.Motivation_Sylvestre = {
    id: 'Motivation_Sylvestre',
    name: 'Motivation Sylvestre',
    cooldownMs: 2500,
    effects: [{ type: 'buff_team', stat: 'atk', value: 40, duration: 2}],
}

// — Abraknyde Sombre —
move.Abrabranche = {
    id: 'Abrabranche',
    name: 'Abrabranche',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 50, max: 65}, target: 'enemy'}],
}
move.Branche_Paralysante = {
    id: 'Branche_Paralysante',
    name: 'Branche Paralysante',
    cooldownMs: 2500,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 35, max: 45}, target: 'enemy'},
              { type: 'debuff', stat: 'spd', value: -30, duration: 2,        target: 'enemy'}],
}
move.Ecrasement_Abraknydien = {
    id: 'Ecrasement_Abraknydien',
    name: 'Écrasement Abraknydien',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'neutre', damage: {min: 55, max: 70}, target: 'enemy'}],
}

// — Araknotron —
move.Lancer_d_Arakne_Morte = {
    id: 'Lancer_d_Arakne_Morte',
    name: "Lancer d'Arakne Morte",
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'neutre', damage: {min: 40, max: 55}, target: 'enemy'},
              { type: 'dot',    element: 'neutre', value: 18, duration: 3,      target: 'enemy'}],
}
move.Complicite = {
    id: 'Complicite',
    name: 'Complicité',
    cooldownMs: 3000,
    effects: [{ type: 'buff_team', stat: 'atk', value: 30, duration: 3}],
}

// — Abraknyde Vénérable —
// (partage Ecrasement_Abraknydien et Branche_Paralysante avec Abraknyde Sombre)
move.Abrakage = {
    id: 'Abrakage',
    name: 'Abrakage',
    cooldownMs: 3000,
    effects: [{ type: 'renvoi', ratio: 0.5, target: 'self'}],
}
move.Ecorce_agressive = {
    id: 'Ecorce_agressive',
    name: 'Écorce Agressive',
    cooldownMs: 2500,
    effects: [{ type: 'shield', value: 700, duration: 2, target: 'self'},
              { type: 'renvoi', ratio: 0.3,               target: 'self'}],
}
move.Reconstitution_Abraknydienne = {
    id: 'Reconstitution_Abraknydienne',
    name: 'Reconstitution Abraknydienne',
    cooldownMs: 3500,
    effects: [{ type: 'heal%maxHp', heal: 20, target: 'self'}],
}

// — Arakne Majeure (élite du donjon) —
move.Ralentissement_Arakneen = {
    id: 'Ralentissement_Arakneen',
    name: 'Ralentissement Araknéen',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'neutre', damage: {min: 30, max: 40}, target: 'enemy'},
              { type: 'debuff', stat: 'spd', value: -30, duration: 3,           target: 'enemy'}],
}
move.Absorption_Sanguine = {
    id: 'Absorption_Sanguine',
    name: 'Absorption Sanguine',
    cooldownMs: 2500,
    effects: [{ type: 'damage',   element: 'neutre', damage: {min: 35, max: 50}, target: 'enemy'},
              { type: 'lifesteal', ratio: 0.5,                                    target: 'self' }],
}

// — Abraknyde Ancestral (boss, donjon, hp 4500 atk 500) —
// (partage Branche_Paralysante et Reconstitution_Abraknydienne)
move.Morsure_Sylvestre = {
    id: 'Morsure_Sylvestre',
    name: 'Morsure Sylvestre',
    cooldownMs: 2500,
    effects: [{ type: 'damage',   element: 'feu', damage: {min: 80, max: 110}, target: 'enemy'},
              { type: 'lifesteal', ratio: 0.2,                                  target: 'self' }],
}
move.Invocation_d_Arakne_Majeure = {
    id: 'Invocation_d_Arakne_Majeure',
    name: "Invocation d'Arakne Majeure",
    cooldownMs: 4000,
    effects: [{ type: 'summon', summonId: 'arakne_majeure', duration: 4, target: 'self'}],
}
// #endregion


// ═══════════════════════════════════════════════════════
// #region DRAGON COCHON — Zone niveau 90-110
// ═══════════════════════════════════════════════════════

// — Cochon de Farle —
move.Sucotement_Porcin = {
    id: 'Sucotement_Porcin',
    name: 'Sucotement Porcin',
    cooldownMs: 2200,
    effects: [{ type: 'damage',   element: 'neutre', damage: {min: 55, max: 70}, target: 'enemy'},
              { type: 'lifesteal', ratio: 0.4,                                    target: 'self' }],
}

// — Don Dorgan —
move.Menotage = {
    id: 'Menotage',
    name: 'Menotage',
    cooldownMs: 2500,
    effects: [{ type: 'damage', element: 'neutre', damage: {min: 35, max: 50}, target: 'enemy'},
              { type: 'debuff', stat: 'spd', value: -30, duration: 3,           target: 'enemy'}],
}
move['Charge Sanguinaire'] = {
    id: 'Charge Sanguinaire',
    name: 'Charge Sanguinaire',
    cooldownMs: 2500,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 55, max: 75}, target: 'enemy'},
              { type: 'buff',   stat: 'atk', value: 50, duration: 2,         target: 'self' }],
}

// — Don Duss'Ang —
move.Vampirisation_Cochonne = {
    id: 'Vampirisation_Cochonne',
    name: 'Vampirisation Cochonne',
    cooldownMs: 2500,
    effects: [{ type: 'damage',   element: 'eau', damage: {min: 45, max: 65}, target: 'enemy'},
              { type: 'lifesteal', ratio: 0.6,                                  target: 'self' }],
}
move['Tire-Bouffon'] = {
    id: 'Tire-Bouffon',
    name: 'Tire-Bouffon',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'neutre', damage: {min: 45, max: 60}, target: 'enemy'},
              { type: 'debuff', stat: 'flatDamage', value: -25, duration: 3,    target: 'enemy'}],
}
move.Perfusion = {
    id: 'Perfusion',
    name: 'Perfusion',
    cooldownMs: 3000,
    effects: [{ type: 'heal%maxHp', heal: 15, target: 'self'}],
}

// — Porsalu —
move.Fleche_Renifleuse = {
    id: 'Fleche_Renifleuse',
    name: 'Flèche Renifleuse',
    cooldownMs: 1800,
    effects: [{ type: 'damage', element: 'air', damage: {min: 45, max: 60}, target: 'enemy'}],
}
move.Fleche_Douloureuse = {
    id: 'Fleche_Douloureuse',
    name: 'Flèche Douloureuse',
    cooldownMs: 2500,
    effects: [{ type: 'damage', element: 'air', damage: {min: 55, max: 75}, target: 'enemy'},
              { type: 'debuff', stat: 'atk', value: -40, duration: 2,        target: 'enemy'}],
}
move.Exhalation_Porcine = {
    id: 'Exhalation_Porcine',
    name: 'Exhalation Porcine',
    cooldownMs: 2500,
    effects: [{ type: 'dot',    element: 'air', value: 25, duration: 3,  target: 'enemy'},
              { type: 'debuff', stat: 'spd', value: -20, duration: 2,     target: 'enemy'}],
}

// — Gorgouille (élite, hp 5000 atk 500) —
move['Oshi-Zumo'] = {
    id: 'Oshi-Zumo',
    name: 'Oshi-Zumo',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'neutre', damage: {min: 70, max: 90}, target: 'enemy'},
              { type: 'switch', value: 2,                                        target: 'enemy'}],
}
move['Yotsu-Zumo'] = {
    id: 'Yotsu-Zumo',
    name: 'Yotsu-Zumo',
    cooldownMs: 2500,
    effects: [{ type: 'damage', element: 'neutre', damage: {min: 60, max: 80}, target: 'enemy'},
              { type: 'debuff', stat: 'spd', value: -40, duration: 3,           target: 'enemy'}],
}

// — Dragon Cochon (boss, donjon, hp 2500 atk 1000) —
move.Ecrasement_Handicapant = {
    id: 'Ecrasement_Handicapant',
    name: 'Écrasement Handicapant',
    cooldownMs: 2500,
    effects: [{ type: 'damage', element: 'neutre', damage: {min: 50, max: 70}, target: 'enemy'},
              { type: 'debuff', stat: 'atk', value: -80, duration: 3,           target: 'enemy'}],
}
move.Croutage = {
    id: 'Croutage',
    name: 'Croutage',
    cooldownMs: 3500,
    effects: [{ type: 'shield', value: 1200, duration: 2,                             target: 'self'},
              { type: 'buff',   stat: 'damageReductionPct', value: 30, duration: 2,   target: 'self'}],
}
move.Immobilisation = {
    id: 'Immobilisation',
    name: 'Immobilisation',
    cooldownMs: 3000,
    effects: [{ type: 'debuff', stat: 'spd', value: -60, duration: 3, target: 'enemy'}],
}
move['Étourderie Mortelle'] = {
    id: 'Étourderie Mortelle',
    name: 'Étourderie Mortelle',
    cooldownMs: 4000,
    effects: [{ type: 'damage', element: 'neutre', damage: {min: 70, max: 100}, target: 'all_enemies'},
              { type: 'debuff', stat: 'spd', value: -40, duration: 2,            target: 'all_enemies'}],
}
// #endregion




















































