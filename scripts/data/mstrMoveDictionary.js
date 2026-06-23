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
              {type: 'debuff', stat: 'atk', value: { min: 40, max: 40 }, duration: 3, target: 'enemy'}]
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
    effects: [{type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy'},
              {type: 'heal', heal: 50, target: 'self'}
    ]
}
move.resistivite = {
    id: 'resistivite',
    name: "Résistivité",
    cooldownMs: 2000,
    effects: [{type: 'debuff', stat: 'atk', value: 50 , duration: 3, target: 'enemy'},
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
    effects: [{type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy'}]
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
    cooldownMs: 3000,
    effects: [{ type: 'damage', element: 'air', damage: {min: 21,max: 30}, target: 'enemy'},
              { type: 'switch', value: 5, target: 'enemy' }],
}
move.pousse_toi = {
    id: 'pousse_toi',
    name: 'Pousse Toi',
    cooldownMs: 3000,
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
              {type: 'switch', value: 1, target: 'enemy'}],
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
              {type: 'switch', value: 1, target: 'enemy'}],
}
move.frappe_de_xelor_du_dopeul = {
    id: 'frappe_de_xelor_du_dopeul',
    name: 'Frappe de Xélor du Dopeul',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 18, max: 22 }, target: 'enemy' },
              {type: 'switch', value: 1, target: 'enemy'}],
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
// — Blopignon —
move.bloblo = {
    id: 'bloblo',
    name: 'Bloblo',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'air', damage: {min: 21, max: 30}, target: 'enemy'}],
}
move.blopiction = {
    id: 'blopiction',
    name: 'Blopiction',
    cooldownMs: 3000,
    effects: [{ type: 'damage', element: 'eau', damage: {min: 21, max: 40}, target: 'enemy'},
              { type: 'debuff', stat: 'atk', value: 40, duration: 2, target: 'enemy'}],
}
move.bloprojection = {
    id: 'bloprojection',
    name: 'Bloprojection',
    cooldownMs: 2500,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 7, max: 10}, target: 'enemy'},
              { type: 'dot', element: 'terre', value: 10, duration: 3, target: 'enemy' }],
}
// — Tronko Blop —
move.blopsoin = {
    id: 'blopsoin',
    name: 'Blopsoin',
    cooldownMs: 3000,
    effects: [{ type: 'heal', heal: { min: 21, max: 30 }, target: 'self' }],
}
move.blopzone = {
    id: 'blopzone',
    name: 'Blopzone',
    cooldownMs: 2500,
    effects: [{ type: 'damage', elements: ['feu', 'eau', 'terre', 'air'], damage: { min: 21, max: 30 }, target: 'enemy'}],
}
// — Glouto Blop —
move.gloutage = {
    id: 'gloutage',
    name: 'Gloutage',
    cooldownMs: 9000,
    effects: [{ type: 'damage', elements: ['feu', 'eau', 'terre', 'air'], damage: {min: 350, max: 500}, target: 'enemy'},
              { type: 'lifesteal', ratio: 0.33, target: 'self'}],
}
// ═══════════════════════════════════════════════════════
// DONJON BLOP — Royaume des Blops Royaux
// ═══════════════════════════════════════════════════════
// Partagé par les 4 Royaux
move.blotravail_Royal = {
    id: 'blotravail_Royal',
    name: 'Blotravail Royal',
    cooldownMs: 2000,
    effects: [{ type: 'buff', stat: 'flatDamage', value: 50, duration: 3, target: 'self'}],
}
// Blop Coco Royal (air)
move.blopunition_Royale_air = {
    id: 'blopunition_Royale_air',
    name: 'Blopunition Royale',
    cooldownMs: 2500,
    effects: [{ type: 'damage', element: 'air', damage: {min: 21, max: 30}, target: 'enemy'},
              { type: 'lifesteal', ratio: 0.3, target: 'self'}],
}
move.blotection_air = {
    id: 'blotection_air',
    name: 'Blotection',
    cooldownMs: 2500,
    effects: [{ type: 'shield', value: 500, duration: 1, target: 'self'},
              { type: 'buff', stat: 'res.terre', value: 40, duration: 2, target: 'self'}],
}
// Blop Griotte Royal (feu)
move.blopunition_Royale_feu = {
    id: 'blopunition_Royale_feu',
    name: 'Blopunition Royale',
    cooldownMs: 2500,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 21, max: 30}, target: 'enemy'},
              { type: 'lifesteal', ratio: 0.3, target: 'self'}],
}
move.blotection_feu = {
    id: 'blotection_feu',
    name: 'Blotection',
    cooldownMs: 2500,
    effects: [{ type: 'shield', value: 500, duration: 1, target: 'self'},
              { type: 'buff', stat: 'res.eau', value: 40, duration: 2, target: 'self'}],
}
// Blop Indigo Royal (eau)
move.blopunition_Royale_eau = {
    id: 'blopunition_Royale_eau',
    name: 'Blopunition Royale',
    cooldownMs: 2500,
    effects: [{ type: 'damage', element: 'eau', damage: {min: 21, max: 30}, target: 'enemy'},
              { type: 'lifesteal', ratio: 0.3, target: 'self'}],
}
move.blotection_eau = {
    id: 'blotection_eau',
    name: 'Blotection',
    cooldownMs: 2500,
    effects: [{ type: 'shield', value: 500, duration: 1, target: 'self'},
              { type: 'buff', stat: 'res.feu', value: 40, duration: 2, target: 'self'}],
}
// Blop Reinette Royal (terre)
move.blopunition_Royale_terre = {
    id: 'blopunition_Royale_terre',
    name: 'Blopunition Royale',
    cooldownMs: 2500,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 21, max: 30}, target: 'enemy'},
              { type: 'lifesteal', ratio: 0.3, target: 'self'}],
}
move.blotection_terre = {
    id: 'blotection_terre',
    name: 'Blotection',
    cooldownMs: 2500,
    effects: [{ type: 'shield', value: 500, duration: 1, target: 'self'},
              { type: 'buff', stat: 'res.air', value: 40, duration: 2, target: 'self'}],
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
    effects: [{ type: 'damage', element: 'eau', damage: {min: 21, max: 25}, target: 'enemy'},
              { type: 'damage', element: 'air', damage: {min: 15, max: 20}, target: 'enemy'}],
}
move['Roulo-Boulos'] = {
    id: 'Roulo-Boulos',
    name: 'Roulo-Boulos',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 21, max: 24}, target: 'enemy'},
              {type: 'switch', value: 1, target: 'enemy'}],
}
move.Carapassable = {
    id: 'Carapassable',
    name: 'Carapassable',
    cooldownMs: 3000,
    effects: [{ type: 'buff', stat: 'res_all', value: 10, duration: 2, target: 'self'}],
}
// — Scordion Bleu —
move.Pince_pattes = {
    id: 'Pince_pattes',
    name: 'Pince-pattes',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 31, max: 35}, target: 'enemy'}],
}
move.Dard_Empoisonne = {
    id: 'Dard_Empoisonne',
    name: 'Dard Empoisonné',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'eau', damage: {min: 11, max: 15}, target: 'enemy'},
              { type: 'debuff', stat: 'atk', value: 50, duration: 3,           target: 'enemy'}],
}
move.Creuse_sable = {
    id: 'Creuse_sable',
    name: 'Creuse Sable',
    cooldownMs: 2200,
    effects: [{ type: 'esquive', chancePct: 50, reductionPct: 100, duration: 3, target: 'self' }],
}
// — Fennex —
move.Reconnaissance = {
    id: 'Reconnaissance',
    name: 'Reconnaissance',
    cooldownMs: 2500,
    effects: [{ type: 'buff', stat: 'atk', value: 150, duration: 2, target: 'self'}],
}
move.Entrave_Sableuse = {
    id: 'Entrave_Sableuse',
    name: 'Entrave Sableuse',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 26, max: 30}, target: 'enemy'},
              { type: 'debuff', stat: 'spd', value: 20, duration: 2,           target: 'enemy'}],
}
move.Enragement_Motivant = {
    id: 'Enragement_Motivant',
    name: 'Enragement Motivant',
    cooldownMs: 2500,
    effects: [{type: 'buff', stat: 'maxHp', value: 300, duration: 2, target: 'self'},
              { type: 'buff', stat: 'atk', value: 100, duration: 2, target: 'self'}],
}
// — Léolhyène —
move.Sirocco = {
    id: 'Sirocco',
    name: 'Sirocco',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'air', damage: {min: 36, max: 39}, target: 'enemy'},
              { type: 'buff', stat: 'atk', value: 50, duration: 2, target: 'self'}],
}
move.Mort_sure = {
    id: 'Mort_sure',
    name: 'Mort Sûre',
    cooldownMs: 3500,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 51, max: 55}, target: 'enemy'}],
}
move.Hyaignement = {
    id: 'Hyaignement',
    name: 'Hyaignement',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 26, max: 30}, target: 'enemy'},
              { type: 'dot',    element: 'feu', value: 6, duration: 3,      target: 'all_enemies'}],
}
// — Boulepique (élite) —
move['Lance-boulettes'] = {
    id: 'Lance-boulettes',
    name: 'Lance-boulettes',
    cooldownMs: 4000,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 71, max: 75}, target: 'enemy'}],
}
move.Pique_rate = {
    id: 'Pique_rate',
    name: 'Pique Raté',
    cooldownMs: 2500,
    effects: [{ type: 'damage',   element: 'terre', damage: {min: 17, max: 21}, target: 'enemy'},
              { type: 'debuff', stat: 'spd', value: 10, duration: 3,            target: 'enemy'}],
}
move.Durcissement = {
    id: 'Durcissement',
    name: 'Durcissement',
    cooldownMs: 2000,
    effects: [{ type: 'shield', value: 200, duration: 2, target: 'self'}],
}
// — Mantiscore (boss, donjon, hp 3500 atk 290) —
move.darmocles = {
    id: 'darmocles',
    name: "Dar'Mocles",
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 31, max: 40}, target: 'enemy'},
              { type: 'debuff', stat: 'atk', value: 50, duration: 3,      target: 'enemy'}],
}
move.force_Poigne = {
    id: 'force_Poigne',
    name: 'Force Poigne',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'eau', damage: {min: 36, max: 45}, target: 'enemy'},
              { type: 'buff', stat: 'spd', value: 50, duration: 2,           target: 'self'}],
}
move.tombeau_du_desert = {
    id: 'tombeau_du_desert',
    name: 'Tombeau du Désert',
    cooldownMs: 3000,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 31, max: 40}, target: 'enemy'},
              { type: 'debuff', stat: 'spd', value: 50, duration: 2,           target: 'enemy'}],
}
move.garde_bouclier = {
    id: 'garde_bouclier',
    name: 'Garde Bouclier',
    cooldownMs: 3500,
    effects: [{ type: 'repulsion_guard', duration: 3, target: 'self' },
              { type: 'renvoi', ratio: 0.5, target: 'self' }],
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
    effects: [{ type: 'damage', element: 'eau', damage: {min: 26, max: 35}, target: 'enemy'},
              { type: 'debuff', stat: 'chance', value: 200, duration: 3,   target: 'enemy'}],
}
move.Fendage = {
    id: 'Fendage',
    name: 'Fendage',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'eau', damage: {min: 21, max: 30}, target: 'enemy'}],
}
// — Dragoeuf Argile (air rés) —
move.Cataplasme = {
    id: 'Cataplasme',
    name: 'Cataplasme',
    cooldownMs: 2500,
    effects: [{ type: 'damage', element: 'air', damage: {min: 28, max: 37}, target: 'enemy'}],
}
move.Engobage = {
    id: 'Engobage',
    name: 'Engobage',
    cooldownMs: 3000,
    effects: [{ type: 'damage', element: 'air', damage: {min: 41, max: 50}, target: 'enemy'}],
}
// — Dragoeuf Calcaire (terre+feu rés) —
move.Entartrage = {
    id: 'Entartrage',
    name: 'Entartrage',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 15, max: 25}, target: 'enemy'}],
}
move.Calcination = {
    id: 'Calcination',
    name: 'Calcination',
    cooldownMs: 2000,
    effects: [{ type: 'debuff', stat: 'spd', value: 30, duration: 2,  target: 'enemy'}],
}
// — Dragoeuf Charbon (feu rés) —
move.Crassier = {
    id: 'Crassier',
    name: 'Crassier',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 11, max: 20}, target: 'enemy'}],
}
move.Silicose = {
    id: 'Silicose',
    name: 'Silicose',
    cooldownMs: 2500,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 11, max: 15}, target: 'enemy'},
              { type: 'debuff', stat: 'atk', value: 30, duration: 3,        target: 'enemy'}],
}
// — Dragoeuf Albâtre (élite, all rés 12%) —
move.Dralbatre = {
    id: 'Dralbatre',
    name: 'Dralbatre',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'air', damage: {min: 11, max: 15}, target: 'enemy'}],
}
move['Dragloméra'] = {
    id: 'Dragloméra',
    name: 'Dragloméra',
    cooldownMs: 3000,
    effects: [{ type: 'damage', element: 'feu',   damage: {min: 5, max: 10}, target: 'enemy'},
              { type: 'damage', element: 'eau',   damage: {min: 5, max: 10}, target: 'enemy'},
              { type: 'damage', element: 'terre', damage: {min: 5, max: 10}, target: 'enemy'},
              { type: 'damage', element: 'air',   damage: {min: 5, max: 10}, target: 'enemy'}],
}
// — Draegnerys (boss, donjon, hp 2500 atk 200) —
move.Pepiniere = {
    id: 'Pepiniere',
    name: 'Pépinière',
    cooldownMs: 3500,
    effects: [{ type: 'summon', summonPool: ['dragoeufArdoise', 'dragoeufArgile', 'dragoeufCalcaire', 'dragoeufCharbon'], duration: 12, target: 'self'}],
}
move.Knout = {
    id: 'Knout',
    name: 'Knout',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 31, max: 40}, target: 'enemy'},
              { type: 'debuff', stat: 'atk', value: 50, duration: 2,        target: 'enemy'}],
}
move.Drakaaris = {
    id: 'Drakaaris',
    name: 'Drakaaris',
    cooldownMs: 3500,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 16, max: 25}, target: 'enemy'},
              { type: 'dot',    element: 'feu', value: 15, duration: 3,      target: 'enemy'}],
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
    effects: [{ type: 'debuff', stat: 'res_all', value: 25, duration: 3,           target: 'enemy'}],
}
move.Abraknettoyage = {
    id: 'Abraknettoyage',
    name: 'Abraknettoyage',
    cooldownMs: 2500,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 37, max: 43}, target: 'enemy'}],
}
move.Motivation_Sylvestre = {
    id: 'Motivation_Sylvestre',
    name: 'Motivation Sylvestre',
    cooldownMs: 1500,
    effects: [{ type: 'buff', stat: 'critChance', value: 20, duration: 3}],
}
// — Abraknyde Sombre —
move.Abrabranche = {
    id: 'Abrabranche',
    name: 'Abrabranche',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'eau', damage: {min: 41, max: 50}, target: 'enemy'}],
}
move.Branche_Paralysante = {
    id: 'Branche_Paralysante',
    name: 'Branche Paralysante',
    cooldownMs: 2500,
    effects: [{ type: 'damage', element: 'neutre', damage: {min: 3, max: 4}, target: 'enemy'},
              { type: 'dot', element: 'neutre', value: 5, duration: 6, target: 'enemy' },
              { type: 'debuff', stat: 'spd', value: 20, duration: 6,  target: 'enemy'}],
}
move.Ecrasement_Abraknydien = {
    id: 'Ecrasement_Abraknydien',
    name: 'Écrasement Abraknydien',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 13, max: 18}, target: 'enemy'}],
}
// — Araknotron —
move.Lancer_d_Arakne_Morte = {
    id: 'Lancer_d_Arakne_Morte',
    name: "Lancer d'Arakne Morte",
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'air', damage: {min: 31, max: 40}, target: 'enemy'},
              { type: 'debuff', stat: 'spd', value: 20, duration: 2,  target: 'enemy'}],
}
move.Complicite = {
    id: 'Complicite',
    name: 'Complicité',
    cooldownMs: 1500,
    effects: [{type: 'random', choices: [{ chance: 0.34, effects: [{ type: 'buff', stat: 'spd',       value: 20,  duration: 2, target: 'self'}]},
                                         { chance: 0.33, effects: [{ type: 'buff', stat: 'atk',       value: 200, duration: 2, target: 'self'}]},
                                         { chance: 0.33, effects: [{ type: 'buff', stat: 'critChance', value: 50, duration: 2, target: 'self'}]}]}],
}
// — Abraknyde Vénérable —
// (partage Ecrasement_Abraknydien et Branche_Paralysante avec Abraknyde Sombre)
move.Abrakage = {
    id: 'Abrakage',
    name: 'Abrakage',
    cooldownMs: 3000,
    effects: [{ type: 'damage', element: 'neutre', damage: {min: 25, max: 30}, target: 'enemy'},
              { type: 'buff', stat: 'atk', value: 100, duration: 2,  target: 'self'}
    ],
}
move.Ecorce_agressive = {
    id: 'Ecorce_agressive',
    name: 'Écorce Agressive',
    cooldownMs: 2500,
    effects: [{ type: 'renvoi', ratio: 0.3,               target: 'self'},
              { type: 'shield', value: 300, duration: 4, target: 'self'}],
}
move.Reconstitution_Abraknydienne = {
    id: 'Reconstitution_Abraknydienne',
    name: 'Reconstitution Abraknydienne',
    cooldownMs: 3500,
    effects: [{ type: 'heal', heal: {min: 150, max: 250}, target: 'self'}],
}
// — Arakne Majeure (élite du donjon) —
move.Ralentissement_Arakneen = {
    id: 'Ralentissement_Arakneen',
    name: 'Ralentissement Araknéen',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'neutre', damage: {min: 30, max: 40}, target: 'enemy'},
              { type: 'debuff', stat: 'spd', value: 30, duration: 3,            target: 'enemy'}],
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
    effects: [{ type: 'damage',   element: 'neutre', damage: {min: 21, max: 30}, target: 'enemy'},
              { type: 'debuff', stat: 'atk', value: 100, duration: 3,            target: 'enemy'}],
}
move.Invocation_d_Arakne_Majeure = {
    id: 'Invocation_d_Arakne_Majeure',
    name: "Invocation d'Arakne Majeure",
    cooldownMs: 3500,
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
    effects: [{ type: 'damage',   element: 'feu', damage: {min: 3, max: 5}, target: 'enemy'},
              { type: 'dot', element: 'feu', value: 5, duration: 12, target: 'enemy' }],
}
// — Don Dorgan —
move.Menotage = {
    id: 'Menotage',
    name: 'Menotage',
    cooldownMs: 2500,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 31, max: 45}, target: 'enemy'}],
}
move['Charge Sanguinaire'] = {
    id: 'Charge Sanguinaire',
    name: 'Charge Sanguinaire',
    cooldownMs: 2500,
    effects: [{ type: 'damage', element: 'eau', damage: {min: 30, max: 50}, target: 'enemy'},
              { type: 'debuff',   stat: 'atk', value: 150, duration: 2,     target: 'enemy' }],
}
// — Don Duss'Ang —
move.Vampirisation_Cochonne = {
    id: 'Vampirisation_Cochonne',
    name: 'Vampirisation Cochonne',
    cooldownMs: 2500,
    effects: [{ type: 'damage',   element: 'eau', damage: {min: 71, max: 100}, target: 'enemy'},
              { type: 'lifesteal', ratio: 0.2,                                  target: 'self' }],
}
move['Tire-Bouffon'] = {
    id: 'Tire-Bouffon',
    name: 'Tire-Bouffon',
    cooldownMs: 1500,
    effects: [{type: 'switch', value: 1, target: 'enemy'}],
}
move.Perfusion = {
    id: 'Perfusion',
    name: 'Perfusion',
    cooldownMs: 5000,
    effects: [{ type: 'heal', heal: {min: 70, max: 100}, target: 'self'},
              { type: 'damage', element: 'neutre', damage: {min: 30, max: 60}, target: 'enemy'}],
}
// — Porsalu —
move.Fleche_Renifleuse = {
    id: 'Fleche_Renifleuse',
    name: 'Flèche Renifleuse',
    cooldownMs: 1700,
    effects: [{type: 'damage', element: 'air', damage: {min: 16,max: 20}, target: 'enemy'}],
}
move.Fleche_Douloureuse = {
    id: 'Fleche_Douloureuse',
    name: 'Flèche Douloureuse',
    cooldownMs: 2500,
    effects: [{type: 'damage', elements: ['feu', 'eau', 'terre', 'air'], damage: {min: 6,max: 10}, target: 'enemy'},
              { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 5,        target: 'enemy'}],
}
move.Exhalation_Porcine = {
    id: 'Exhalation_Porcine',
    name: 'Exhalation Porcine',
    cooldownMs: 2500,
    effects: [{ type: 'buff', stat: 'spd', value: 20, duration: 3,     target: 'self'}],
}
// — Gorgouille (élite, hp 5000 atk 500) —
move['Oshi-Zumo'] = {
    id: 'Oshi-Zumo',
    name: 'Oshi-Zumo',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 41, max: 50}, target: 'enemy'},
              {type: 'switch', value: 1, target: 'enemy'}],
}
move['Yotsu-Zumo'] = {
    id: 'Yotsu-Zumo',
    name: 'Yotsu-Zumo',
    cooldownMs: 2500,
    effects: [{ type: 'damage', element: 'neutre', damage: {min: 21, max: 25}, target: 'enemy'},
              {type: 'switch', value: 3, target: 'enemy'}],
}
// — Dragon Cochon (boss, donjon, hp 2500 atk 1000) —
move.Ecrasement_Handicapant = {
    id: 'Ecrasement_Handicapant',
    name: 'Écrasement Handicapant',
    cooldownMs: 2500,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 13, max: 18}, target: 'enemy'},
              { type: 'debuff', stat: 'atk', value: 200, duration: 3,         target: 'enemy'}],
}
move.Croutage = {
    id: 'Croutage',
    name: 'Croutage',
    cooldownMs: 3500,
    effects: [{ type: 'damage', element: 'neutre', damage: {min: 31, max: 45}, target: 'enemy'},
              { type: 'buff',   stat: 'damageReductionPct', value: 20, duration: 2,   target: 'self'}],
}
move.Immobilisation = {
    id: 'Immobilisation',
    name: 'Immobilisation',
    cooldownMs: 2000,
    effects: [{ type: 'debuff', stat: 'spd', value: 70, duration: 2,  target: 'enemy'}],
}
move.etourderie_Mortelle = {
    id: 'etourderie_Mortelle',
    name: 'Étourderie Mortelle',
    cooldownMs: 6000,
    effects: [{ type: 'damage', element: 'neutre', damage: {min: 200, max: 250}, target: 'enemy'},
              { type: 'debuff', stat: 'spd', value: 20, duration: 3,             target: 'enemy'}],
}
// #endregion

// ═══════════════════════════════════════════════════════
// #region RAID GELAX
// ═══════════════════════════════════════════════════════

// — Gelées normales —
move.Tartinade = {
    id: 'Tartinade', name: 'Tartinade',
    cooldownMs: 2000,
    effects: [{ type: 'buff', stat: 'spd', value: 20, duration: 3, target: 'self'}],
}
move.Gelpikes = {
    id: 'Gelpikes', name: 'Gelpikes',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'neutre', damage: {min: 14, max: 22}, target: 'enemy'}],
}
move.Fraise_Os = {
    id: 'Fraise_Os', name: 'Fraise Os',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 18, max: 22}, target: 'enemy'}],
}
move.Bleuet_Os = {
    id: 'Bleuet_Os', name: 'Bleuet Os',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'eau', damage: {min: 18, max: 22}, target: 'enemy'}],
}
move.Menthe_Os = {
    id: 'Menthe_Os', name: 'Menthe Os',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 18, max: 22}, target: 'enemy'}],
}
move.Citron_Os = {
    id: 'Citron_Os', name: 'Citron Os',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'air', damage: {min: 18, max: 22}, target: 'enemy'}],
}
// — Gelées Royales —
move.Gelpikes = {
    id: 'Gelpikes', name: 'Gelpikes',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'neutre', damage: {min: 14, max: 22}, target: 'enemy'},
              { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy'}],
}
move.Royale_Fraise_Os = {
    id: 'Royale_Fraise_Os', name: 'Royale Fraise Os',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 18, max: 22}, target: 'enemy'},
              { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy'}],
}
move.Gelifiant = {
    id: 'Gelifiant', name: 'Gélifiant',
    cooldownMs: 2000,
    effects: [{type: 'heal', heal: 60, target: 'self'}],
}
move.Royale_Bleuet_Os = {
    id: 'Royale_Bleuet_Os', name: 'Royale Bleuet Os',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'eau', damage: {min: 18, max: 22}, target: 'enemy'},
              { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy'}],
}
move.Isometrie = {
    id: 'Isometrie', name: 'Isométrie',
    cooldownMs: 2000,
    effects: [{ type: 'debuff', stat: 'spd', value: 30, duration: 2, target: 'enemy'}],
}
move.Royale_Menthe_Os = {
    id: 'Royale_Menthe_Os', name: 'Royale Menthe Os',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 18, max: 22}, target: 'enemy'},
              { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy'}],
}
move.Pik_assaut = {
    id: 'Pik_assaut', name: 'Pik-assaut',
    cooldownMs: 2000,
    effects: [{ type: 'buff', stat: 'spd', value: 30, duration: 2, target: 'self'}],
}
move.Royale_Citron_Os = {
    id: 'Royale_Citron_Os', name: 'Royale Citron Os',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'air', damage: {min: 18, max: 22}, target: 'enemy'},
              { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy'}],
}
move.Fixation_Beton = {
    id: 'Fixation_Beton', name: 'Fixation Béton',
    cooldownMs: 3000,
    effects: [{ type: 'buff', stat: 'damageReductionPct', value: 10, duration: 2, target: 'self'}],
}
// #endregion


// -------- Poulpor ---------------
move.double_tranchant = {
    id: 'double_tranchant',
    name: 'Double Tranchant',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'heal%maxHp', value: 25, target: 'self' },
    ]
}

// -------- Percepteur aquatique ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Amas de Tentacules ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Volkornade ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Germinial ---------------
move.morsure_putride = {
    id: 'morsure_putride',
    name: 'Morsure Putride',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 19, max: 26 }, target: 'enemy' }
    ]
}
move.langue_morte = {
    id: 'langue_morte',
    name: 'Langue Morte',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 23, max: 30 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Capitaine Brâkmarien ---------------
move.porter_la_boufballe = {
    id: 'porter_la_boufballe',
    name: 'Porter la Boufballe',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', target: 'enemy' },
    ]
}
move.jeter_la_boufballe = {
    id: 'jeter_la_boufballe',
    name: 'Jeter la Boufballe',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
    ]
}
move.rapprochement = {
    id: 'rapprochement',
    name: 'Rapprochement',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}
move.amplification = {
    id: 'amplification',
    name: 'Amplification',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.tacle = {
    id: 'tacle',
    name: 'Tacle',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
    ]
}
move.triche = {
    id: 'triche',
    name: 'Triche',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Capitaine Bontarien ---------------
move.tu_pousses_le_bouchon_un_peu_trop_loin_joris = {
    id: 'tu_pousses_le_bouchon_un_peu_trop_loin_joris',
    name: 'Tu pousses le bouchon un peu trop loin Joris !',
    cooldownMs: 2000,
    effects: [
        { type: 'heal%maxHp', value: 100, target: 'self' },
        { type: 'buff', stat: 'atk', value: 300, duration: 3, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 101, max: 120 }, target: 'enemy' },
        { type: 'shield', value: 2000, duration: 3, target: 'self' }
    ]
}
move.verfeur = {
    id: 'verfeur',
    name: 'Verfeur',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 200, duration: 3, target: 'self' }
    ]
}
move.lioube = {
    id: 'lioube',
    name: 'Lioube',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 9, max: 13 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 9, max: 13 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 9, max: 13 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 9, max: 13 }, target: 'enemy' }
    ]
}
move.emportement = {
    id: 'emportement',
    name: 'Emportement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 6, max: 15 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 16, max: 25 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 26, max: 35 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 46, max: 55 }, target: 'enemy' }
    ]
}
move.eau_strasisme = {
    id: 'eau_strasisme',
    name: 'Eau strasisme',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' }
    ]
}

// -------- Attaquant Brâkmarien I ---------------
move.rapprochement_offensif = {
    id: 'rapprochement_offensif',
    name: 'Rapprochement Offensif',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}
move.tacle_offensif = {
    id: 'tacle_offensif',
    name: 'Tacle Offensif',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Attaquant Bontarien I ---------------

// -------- Attaquant Brâkmarien II ---------------

// -------- Attaquant Bontarien II ---------------

// -------- Défenseur Brâkmarien I ---------------
move.tacle_lourd = {
    id: 'tacle_lourd',
    name: 'Tacle Lourd',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Défenseur Bontarien I ---------------

// -------- Défenseur Brâkmarien II ---------------

// -------- Défenseur Bontarien II ---------------

// -------- Bourgeon de Dathura ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Sousouris Grise ---------------
move.morsure = {
    id: 'morsure',
    name: 'Morsure',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 2, max: 4 }, target: 'enemy' }
    ]
}

// -------- Flammèche Feu ---------------
move.elemental_spear = {
    id: 'elemental_spear',
    name: 'Elemental Spear',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 1, max: 1 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.bomball = {
    id: 'bomball',
    name: 'Bomball',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damageHpPct: { source: 'casterMaxHp', pct: 200 }, target: 'enemy' }
    ]
}

// -------- Flammèche Eau ---------------
move.elemental_speareau = {
    id: 'elemental_speareaus',
    name: 'Elemental Spear',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 1, max: 1 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.bombaleau = {
    id: 'bomballeau',
    name: 'Bomball',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damageHpPct: { source: 'casterMaxHp', pct: 200 }, target: 'enemy' }
    ]
}

// -------- Flammèche Terre ---------------
move.elemental_spearterre = {
    id: 'elemental_spearterre',
    name: 'Elemental Spear',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 1, max: 1 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.bomballterre = {
    id: 'bomballterre',
    name: 'Bomball',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damageHpPct: { source: 'casterMaxHp', pct: 200 }, target: 'enemy' }
    ]
}

// -------- Flammèche Air ---------------
move.elemental_spearair = {
    id: 'elemental_spearair',
    name: 'Elemental Spear',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 1, max: 1 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.bomballair = {
    id: 'bomballair',
    name: 'Bomball',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damageHpPct: { source: 'casterMaxHp', pct: 200 }, target: 'enemy' }
    ]
}

// -------- Tofu Chimérique ---------------
move.beco_du_tofu = {
    id: 'beco_du_tofu',
    name: 'Béco du Tofu',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 13, max: 18 }, target: 'enemy' }
    ]
}

// -------- Feu Vif ---------------
move.brulure_legere = {
    id: 'brulure_legere',
    name: 'Brûlure légère',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 6, max: 10 }, target: 'enemy' }
    ]
}

// -------- Krokille de Mer ---------------
move.crachat_sale = {
    id: 'crachat_sale',
    name: 'Crachat Salé',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 4, max: 5 }, target: 'enemy' }
    ]
}

// -------- Rose Vaporeuse ---------------
move.empoisonnement = {
    id: 'empoisonnement',
    name: 'Empoisonnement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 10, max: 10 }, target: 'enemy' }
    ]
}
move.effleurement = {
    id: 'effleurement',
    name: 'Effleurement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 11, max: 14 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Petit Gloot ---------------
move.glougloutte = {
    id: 'glougloutte',
    name: 'Glougloutte',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 6, max: 10 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Plikplok ---------------
move.plouf = {
    id: 'plouf',
    name: 'Plouf',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 6, max: 10 }, target: 'enemy' }
    ]
}

// -------- Bouftou Nuageux ---------------

// -------- Grand Splatch ---------------
move.splotch = {
    id: 'splotch',
    name: 'Splotch',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 6, max: 10 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Chakrobat ---------------
move.souffle_celeste = {
    id: 'souffle_celeste',
    name: 'Souffle Céleste',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 4, max: 5 }, target: 'enemy' }
    ]
}
move.particules_spirituelles = {
    id: 'particules_spirituelles',
    name: 'Particules Spirituelles',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: ['tigrimas'], duration: 3, target: 'enemy' }
    ]
}

// -------- Tigrimas ---------------
move.reconstitution_celeste = {
    id: 'reconstitution_celeste',
    name: 'Reconstitution Céleste',
    cooldownMs: 2000,
    effects: [
        { type: 'heal%maxHp', value: 100, target: 'self' },
    ]
}
move.lancer_de_feu_vif = {
    id: 'lancer_de_feu_vif',
    name: 'Lancer de Feu Vif',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 17, max: 23 }, target: 'enemy' }
    ]
}

// -------- Aminite ---------------
move.coup_de_pileus = {
    id: 'coup_de_pileus',
    name: 'Coup de Piléus',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 11, max: 20 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 2, duration: 3, target: 'self' }
    ]
}
move.spore_tensia = {
    id: 'spore_tensia',
    name: 'Spore Tensia',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 0, duration: 3, target: 'self' }
    ]
}

// -------- Ronronchon ---------------
move.ron_ron = {
    id: 'ron_ron',
    name: 'Ron-Ron',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 11, max: 20 }, target: 'enemy' }
    ]
}
move.invocation_de_feu_de_joie = {
    id: 'invocation_de_feu_de_joie',
    name: 'Invocation de Feu de Joie',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: ['feu_vif'], duration: 3, target: 'enemy' }
    ]
}
move.ecrasement_du_ronronchon = {
    id: 'ecrasement_du_ronronchon',
    name: 'Écrasement du Ronronchon',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 16, max: 20 }, target: 'enemy' }
    ]
}

// -------- Tofu Malade ---------------
move.beco_morveux = {
    id: 'beco_morveux',
    name: 'Béco Morveux',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 13, max: 16 }, target: 'enemy' }
    ]
}
move.tentative_d_envol = {
    id: 'tentative_d_envol',
    name: 'Tentative d\'Envol',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Arakne Minuscule ---------------
move.mandibules_toxiques = {
    id: 'mandibules_toxiques',
    name: 'Mandibules Toxiques',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 12, max: 14 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Arakne Malade ---------------
move.frappe_morveuse = {
    id: 'frappe_morveuse',
    name: 'Frappe Morveuse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 13, max: 18 }, target: 'enemy' }
    ]
}
move.glaire_obscure = {
    id: 'glaire_obscure',
    name: 'Glaire Obscure',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 11, max: 14 }, target: 'enemy' }
    ]
}

// -------- Araknelle ---------------
move.frappe = {
    id: 'frappe',
    name: 'Frappe',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 8, max: 10 }, target: 'enemy' }
    ]
}
move.invocation_d_arakne = {
    id: 'invocation_d_arakne',
    name: 'Invocation d\'Arakne',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: ['arakne_minuscule'], duration: 3, target: 'enemy' }
    ]
}
move.invocation_d_araknelle = {
    id: 'invocation_d_araknelle',
    name: 'Invocation d\'Araknelle',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: ['arakne_malade'], duration: 3, target: 'enemy' }
    ]
}

// -------- Kol'nenfan ---------------
move.gouter = {
    id: 'gouter',
    name: 'Goûter',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 20, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.2, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.attraction_enfantine = {
    id: 'attraction_enfantine',
    name: 'Attraction enfantine',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Koup'nenfan ---------------
move.coupage = {
    id: 'coupage',
    name: 'Coupage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 13, max: 17 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Pet'nenfan ---------------
move.bombombe = {
    id: 'bombombe',
    name: 'Bombombe',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: ['flammeche_feu'], duration: 3, target: 'enemy' }
    ]
}

// -------- Araknosé ---------------
move.toile_fragile = {
    id: 'toile_fragile',
    name: 'Toile Fragile',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}
move.rejet_acide = {
    id: 'rejet_acide',
    name: 'Rejet Acide',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 7, max: 12 }, target: 'enemy' }
    ]
}

// -------- Arakmuté ---------------
move.jet_de_poussiere = {
    id: 'jet_de_poussiere',
    name: 'Jet de Poussière',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.regard_effrayant = {
    id: 'regard_effrayant',
    name: 'Regard Effrayant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 11, max: 14 }, target: 'enemy' }
    ]
}

// -------- Cadeau animé ---------------
move.petit_paquet = {
    id: 'petit_paquet',
    name: 'Petit paquet',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 3, max: 7 }, target: 'enemy' }
    ]
}

// -------- Bomberfu ---------------
move.detonation_du_poulailler = {
    id: 'detonation_du_poulailler',
    name: 'Détonation du poulailler',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 6, max: 10 }, target: 'enemy' }
    ]
}

// -------- Kolérat Strubien ---------------
move.hypnose_brulante = {
    id: 'hypnose_brulante',
    name: 'Hypnose Brûlante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 10, max: 12 }, target: 'enemy' }
    ]
}
move.morstrubien = {
    id: 'morstrubien',
    name: 'Morstrubien',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 15, max: 17 }, target: 'enemy' }
    ]
}

// -------- Tofu Dégénéré ---------------

// -------- Tofu Mutant ---------------

// -------- Larve Bleue ---------------
move.postillon_handicapant = {
    id: 'postillon_handicapant',
    name: 'Postillon Handicapant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 13, max: 16 }, target: 'enemy' }
    ]
}
move.bulle_de_protection = {
    id: 'bulle_de_protection',
    name: 'Bulle de Protection',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}

// -------- Larve Verte ---------------
move.postillon_aveuglant = {
    id: 'postillon_aveuglant',
    name: 'Postillon Aveuglant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 13, max: 16 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.corps_spongieux = {
    id: 'corps_spongieux',
    name: 'Corps Spongieux',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 20, duration: 2, target: 'self' },
    ]
}

// -------- Larve Orange ---------------
move.bave_collante = {
    id: 'bave_collante',
    name: 'Bave Collante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 15, max: 20 }, target: 'enemy' }
    ]
}
move.dissuasion = {
    id: 'dissuasion',
    name: 'Dissuasion',
    cooldownMs: 2000,
    effects: [
        { type: 'renvoi', ratio: 0.5, target: 'self' },
    ]
}

// -------- Larve Verte Solitaire ---------------
move.larvement = {
    id: 'larvement',
    name: 'Larvement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 4, max: 5 }, target: 'enemy' }
    ]
}
move.retour_de_flamme = {
    id: 'retour_de_flamme',
    name: 'Retour de flamme',
    cooldownMs: 2000,
    effects: [
        { type: 'renvoi', ratio: 0.5, target: 'self' },
    ]
}

// -------- Larve Jaune ---------------
move.bave_affaiblissante = {
    id: 'bave_affaiblissante',
    name: 'Bave Affaiblissante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 15, max: 20 }, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.postillon_cauterisant = {
    id: 'postillon_cauterisant',
    name: 'Postillon Cautérisant',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 9, target: 'self' }
    ]
}

// -------- Arakne ---------------
move.frappe_ridicule = {
    id: 'frappe_ridicule',
    name: 'Frappe Ridicule',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 15, max: 20 }, target: 'enemy' }
    ]
}
move.petite_toile = {
    id: 'petite_toile',
    name: 'Petite Toile',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Champ Champ ---------------
move.champatate = {
    id: 'champatate',
    name: 'Champatate',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 13, max: 16 }, target: 'enemy' }
    ]
}
move.champoisonnement = {
    id: 'champoisonnement',
    name: 'Champoisonnement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 8, max: 8 }, target: 'enemy' }
    ]
}

// -------- Moskito ---------------
move.piqure = {
    id: 'piqure',
    name: 'Piqûre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 13, max: 18 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 4, max: 4 }, target: 'enemy' }
    ]
}
move.esquive_volante = {
    id: 'esquive_volante',
    name: 'Esquive Volante',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 0, duration: 3, target: 'self' }
    ]
}

// -------- Campagnoll ---------------
move.gnoll_haut = {
    id: 'gnoll_haut',
    name: 'Gnoll Haut',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.rongement = {
    id: 'rongement',
    name: 'Rongement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 13, max: 18 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Workette ---------------
move.baiser_de_kaliptus = {
    id: 'baiser_de_kaliptus',
    name: 'Baiser de Kaliptus',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'critChance', value: 4, duration: 3, target: 'self' }
    ]
}
move.implosion = {
    id: 'implosion',
    name: 'Implosion',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 51, max: 65 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 6, max: 10 }, target: 'enemy' }
    ]
}

// -------- Corbac Fantômatique ---------------
move.moquerie_fantomatique = {
    id: 'moquerie_fantomatique',
    name: 'Moquerie Fantômatique',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.replique_fantomatique = {
    id: 'replique_fantomatique',
    name: 'Réplique Fantômatique',
    cooldownMs: 2000,
    effects: [
        { type: 'renvoi', ratio: 0.5, target: 'self' },
    ]
}

// -------- Marcassin Fantômatique ---------------
move.embrochement_fantomatique = {
    id: 'embrochement_fantomatique',
    name: 'Embrochement Fantômatique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 7, max: 10 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- El Scarador Fantômatique ---------------
move.element_fantomatique = {
    id: 'element_fantomatique',
    name: 'Élément Fantômatique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 15, max: 20 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.scaraforce_fantomatique = {
    id: 'scaraforce_fantomatique',
    name: 'Scaraforce Fantômatique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 9, max: 11 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Croum Fantômatique ---------------
move.glaive_fantomatique = {
    id: 'glaive_fantomatique',
    name: 'Glaive Fantômatique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 5, max: 6 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'flatDamage', value: 4, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 4, duration: 3, target: 'self' }
    ]
}
move.bravoure_fantomatique = {
    id: 'bravoure_fantomatique',
    name: 'Bravoure Fantômatique',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 10, duration: 3, target: 'self' }
    ]
}

// -------- Poupoussière ---------------
move.nuage_de_poupoussiere = {
    id: 'nuage_de_poupoussiere',
    name: 'Nuage de Poupoussière',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 12, max: 15 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}

// -------- Rose Obscure ---------------

// -------- Coffre Maudit du Flib ---------------
move.disruption = {
    id: 'disruption',
    name: 'Disruption',
    cooldownMs: 2000,
    effects: [
        { type: 'renvoi', ratio: 0.5, target: 'self' },
    ]
}
move.malediction = {
    id: 'malediction',
    name: 'Malédiction',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'neutre', value: 12, duration: 1, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Sac Animé ---------------

// -------- Krokille Juvénile Insipide ---------------
move.septicemie = {
    id: 'septicemie',
    name: 'Septicémie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 6, max: 10 }, target: 'enemy' }
    ]
}
move.esprit_de_meute = {
    id: 'esprit_de_meute',
    name: 'Esprit de Meute',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 100, duration: 3, target: 'self' },
        { type: 'heal', heal: 50, target: 'self' },
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}
move.immunodeficience = {
    id: 'immunodeficience',
    name: 'Immunodéficience',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
    ]
}

// -------- Krokille Juvénile Boueuse ---------------
move.fange = {
    id: 'fange',
    name: 'Fange',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 8, max: 12 }, target: 'enemy' }
    ]
}
move.caprice = {
    id: 'caprice',
    name: 'Caprice',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 3, target: 'self' }
    ]
}
move.rebond_punitif = {
    id: 'rebond_punitif',
    name: 'Rebond punitif',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 12, max: 18 }, target: 'enemy' }
    ]
}

// -------- Krokille Juvénile Incandescente ---------------
move.anemie = {
    id: 'anemie',
    name: 'Anémie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 6, max: 8 }, target: 'enemy' },
        { type: 'antiHeal', duration: 3, target: 'enemy' }
    ]
}
move.curee = {
    id: 'curee',
    name: 'Curée',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 50, target: 'self' }
    ]
}
move.incubation = {
    id: 'incubation',
    name: 'Incubation',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 15, target: 'self' }
    ]
}

// -------- Krokille Juvénile Humide ---------------
move.humectation = {
    id: 'humectation',
    name: 'Humectation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 6, max: 10 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' }
    ]
}
move.flaque = {
    id: 'flaque',
    name: 'Flaque',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Krokille Juvénile Sèche ---------------
move.assechement = {
    id: 'assechement',
    name: 'Assèchement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 5, max: 8 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 5, max: 8 }, target: 'enemy' },
        { type: 'debuff', stat: 'flatDamage', value: 8, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 8, duration: 3, target: 'self' }
    ]
}
move.souffle_percutant = {
    id: 'souffle_percutant',
    name: 'Souffle Percutant',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Bwak de Feu ---------------
move.bwakikui = {
    id: 'bwakikui',
    name: 'Bwakikui',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 1, max: 80 }, target: 'enemy' }
    ]
}

// -------- Bwak de Terre ---------------
move.bwakikuiterre = {
    id: 'bwakikuiterre',
    name: 'Bwakikui',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 1, max: 80 }, target: 'enemy' }
    ]
}
// -------- Bwak d'Air ---------------
move.bwakikuiair = {
    id: 'bwakikuiair',
    name: 'Bwakikui',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 1, max: 80 }, target: 'enemy' }
    ]
}
// -------- Bwak d'Eau ---------------
move.bwakikuieau = {
    id: 'bwakikuieau',
    name: 'Bwakikui',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 1, max: 80 }, target: 'enemy' }
    ]
}
// -------- Ashi-magari ---------------
move.enchevetrement = {
    id: 'enchevetrement',
    name: 'Enchevêtrement',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Martoa ---------------
move.marteau_branlant = {
    id: 'marteau_branlant',
    name: 'Marteau Branlant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 13, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 9, max: 12 }, target: 'enemy' }
    ]
}
move.mur_de_pelles = {
    id: 'mur_de_pelles',
    name: 'Mur de Pelles',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: ['mur_de_pelles'], duration: 3, target: 'enemy' }
    ]
}

// -------- Sherpoa ---------------
move.lancer_de_caillou = {
    id: 'lancer_de_caillou',
    name: 'Lancer de Caillou',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 17, max: 24 }, target: 'enemy' }
    ]
}
move.piege_de_cailloux = {
    id: 'piege_de_cailloux',
    name: 'Piège de Cailloux',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 17, max: 24 }, target: 'enemy' }
    ]
}

// -------- Douzdoa ---------------
move.vissage = {
    id: 'vissage',
    name: 'Vissage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 17, max: 24 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.piege_de_vapeur = {
    id: 'piege_de_vapeur',
    name: 'Piège de Vapeur',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 17, max: 24 }, target: 'enemy' }
    ]
}

// -------- Pikdoa ---------------
move.piochage = {
    id: 'piochage',
    name: 'Piochage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 15, max: 20 }, target: 'enemy' }
    ]
}
move.piege_a_pieds = {
    id: 'piege_a_pieds',
    name: 'Piège à Pieds',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 17, max: 24 }, target: 'enemy' }
    ]
}

// -------- Arakne des Égouts ---------------
move.mandibules = {
    id: 'mandibules',
    name: 'Mandibules',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 15, max: 17 }, target: 'enemy' }
    ]
}
move.mere_porteuse = {
    id: 'mere_porteuse',
    name: 'Mère Porteuse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 11, max: 13 }, target: 'enemy' }
    ]
}

// -------- Ramane Strubien ---------------
move.roblochon_ancestral = {
    id: 'roblochon_ancestral',
    name: 'Roblochon ancestral',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 14, max: 16 }, target: 'enemy' },
        { type: 'debuff', stat: 'intelligence', value: 30, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'agility', value: 30, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'force', value: 30, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'chance', value: 30, duration: 3, target: 'enemy' }
    ]
}
move.trou_d_emmental = {
    id: 'trou_d_emmental',
    name: 'Trou d\'Emmental',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 25, duration: 3, target: 'self' },
        { type: 'heal', heal: 17, target: 'self' },
    ]
}

// -------- Scélérat Strubien ---------------
move.mordillage = {
    id: 'mordillage',
    name: 'Mordillage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 16, max: 18 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.coup_de_dents = {
    id: 'coup_de_dents',
    name: 'Coup de dents',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 16, max: 18 }, target: 'enemy' }
    ]
}

// -------- Milirat Strubien ---------------
move.lancer_de_lance = {
    id: 'lancer_de_lance',
    name: 'Lancer de Lance',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 12, max: 14 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 1, duration: 2, target: 'enemy' },
        { type: 'buff', stat: 'spd', value: 1, duration: 2, target: 'self' }
    ]
}
move.air_empoisonne = {
    id: 'air_empoisonne',
    name: 'Air Empoisonné',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 20, max: 24 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Boo ---------------
move.souillure_booeuse = {
    id: 'souillure_booeuse',
    name: 'Souillure Booeuse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 4, max: 6 }, target: 'enemy' }
    ]
}
move.embourbement = {
    id: 'embourbement',
    name: 'Embourbement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 1, max: 2 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Disciple du Kimbo ---------------
move.glyphe_pair = {
    id: 'glyphe_pair',
    name: 'Glyphe Pair',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'agility', value: 900, duration: 3, target: 'self' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.glyphe_impair = {
    id: 'glyphe_impair',
    name: 'Glyphe Impair',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'agility', value: 900, duration: 3, target: 'self' },
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Chafer Invisible ---------------
move.camouflage = {
    id: 'camouflage',
    name: 'Camouflage',
    cooldownMs: 2000,
    effects: [
        { type: 'esquive', chancePct: 40, reductionPct: 100, duration: 3, target: 'self' },
    ]
}
move.coup_du_chafer = {
    id: 'coup_du_chafer',
    name: 'Coup du Chafer',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 40 }, target: 'enemy' }
    ]
}
move.pantalonnade = {
    id: 'pantalonnade',
    name: 'Pantalonnade',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 17, max: 20 }, target: 'enemy' }
    ]
}

// -------- Citwouille ---------------
move.vol_de_pieces = {
    id: 'vol_de_pieces',
    name: 'Vol de Pièces',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 11, max: 15 }, currentHpScale: { stat: 'finalDamagePct', ratio: 0.5 }, target: 'enemy' }
    ]
}
move.peur_vegetarienne = {
    id: 'peur_vegetarienne',
    name: 'Peur Végétarienne',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
    ]
}
move.empoisonnement_vegetarien = {
    id: 'empoisonnement_vegetarien',
    name: 'Empoisonnement Végétarien',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'terre', value: 10, duration: 3, target: 'enemy' }
    ]
}

// -------- Rasboul Mineur ---------------
move.bisouille = {
    id: 'bisouille',
    name: 'Bisouille',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 10000, target: 'self' }
    ]
}

// -------- Kruella Freuz ---------------
move.invocation_de_kruella = {
    id: 'invocation_de_kruella',
    name: 'Invocation de Kruella',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: ['Chef_de_Guerre_Bouftou'], duration: 3, target: 'enemy' }
    ]
}
move.souffle_motivant = {
    id: 'souffle_motivant',
    name: 'Souffle Motivant',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 10, duration: 3, target: 'self' }
    ]
}
move.souffle_empoisonne = {
    id: 'souffle_empoisonne',
    name: 'Souffle Empoisonné',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'dot', element: 'terre', value: 10, duration: 3, target: 'enemy' }
    ]
}

// -------- Donatella ---------------
move.kawabunga = {
    id: 'kawabunga',
    name: 'Kawabunga',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'res.air', value: 200, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'maxHp', value: 600, duration: 3, target: 'self' }
    ]
}

// -------- Pierre Taillée ---------------

// -------- Dagobert ---------------
move.miaulement_agacant = {
    id: 'miaulement_agacant',
    name: 'Miaulement agaçant',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' }
    ]
}
move.minouille = {
    id: 'minouille',
    name: 'Minouille',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 17, max: 19 }, target: 'enemy' }
    ]
}

// -------- Tofu ---------------
move.beco = {
    id: 'beco',
    name: 'Béco',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 13, max: 18 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 4, target: 'self' },
    ]
}

// -------- Tofu Noir ---------------
move.beco_rosif = {
    id: 'beco_rosif',
    name: 'Béco Rosif',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 17, max: 24 }, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' }
    ]
}
move.fougue_tofuesque = {
    id: 'fougue_tofuesque',
    name: 'Fougue Tofuesque',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'heal%maxHp', value: 10, target: 'self' },
    ]
}

// -------- Œuf de Pwâk ---------------
move.embrouille_de_pwak = {
    id: 'embrouille_de_pwak',
    name: 'Embrouille de Pwâk',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 13, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 13, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 13, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 13, max: 20 }, target: 'enemy' }
    ]
}
move.ovation = {
    id: 'ovation',
    name: 'Ovation',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 20, duration: 3, target: 'self' }
    ]
}
move.regeneration_printaniere = {
    id: 'regeneration_printaniere',
    name: 'Régénération printanière',
    cooldownMs: 2000,
    effects: [
        { type: 'heal%maxHp', value: 20, target: 'self' },
    ]
}

// -------- Raphaela ---------------

// -------- Leonardawa ---------------

// -------- Vampire ---------------
move.vol_de_vie = {
    id: 'vol_de_vie',
    name: 'Vol de Vie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 15, max: 22 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.force_des_ames_putrides = {
    id: 'force_des_ames_putrides',
    name: 'Force des Âmes Putrides',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}
move.nosfurate = {
    id: 'nosfurate',
    name: 'Nosfuraté',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 13, max: 16 }, target: 'enemy' },
        { type: 'debuff', stat: 'force', value: 50, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'force', value: 50, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'chance', value: 50, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'chance', value: 50, duration: 3, target: 'self' }
    ]
}

// -------- Kwoan ---------------
move.frappe_gerbante = {
    id: 'frappe_gerbante',
    name: 'Frappe Gerbante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}
move.confusion_optique = {
    id: 'confusion_optique',
    name: 'Confusion Optique',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}

// -------- Tofoune ---------------
move.picota = {
    id: 'picota',
    name: 'Picota',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 11, target: 'self' },
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}
move.graine_empoisonnee = {
    id: 'graine_empoisonnee',
    name: 'Graine Empoisonnée',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.mot_de_jeunesse = {
    id: 'mot_de_jeunesse',
    name: 'Mot de Jeunesse',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
        { type: 'heal%maxHp', value: 10, target: 'self' },
    ]
}

// -------- Tofukaz ---------------
move.disparition_groupee = {
    id: 'disparition_groupee',
    name: 'Disparition groupée',
    cooldownMs: 2000,
    effects: [
        { type: 'esquive', chancePct: 40, reductionPct: 100, duration: 3, target: 'self' },
    ]
}
move.provocation = {
    id: 'provocation',
    name: 'Provocation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Boostache Prépubère ---------------
move.caresse_effrayante = {
    id: 'caresse_effrayante',
    name: 'Caresse Effrayante',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 21, target: 'self' }
    ]
}
move.timidite = {
    id: 'timidite',
    name: 'Timidité',
    cooldownMs: 2000,
    effects: [
        { type: 'esquive', chancePct: 40, reductionPct: 100, duration: 3, target: 'self' },
        { type: 'buff', stat: 'damageReductionPct', value: 0, duration: 3, target: 'self' }
    ]
}
move.boorrade = {
    id: 'boorrade',
    name: 'Boorrade',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 17, max: 24 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Cafarcher ---------------
move.tir_de_cure_dent = {
    id: 'tir_de_cure_dent',
    name: 'Tir de cure-dent',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 13, max: 18 }, target: 'enemy' }
    ]
}
move.coup_de_cure_dent = {
    id: 'coup_de_cure_dent',
    name: 'Coup de cure-dent',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 23, max: 28 }, target: 'enemy' }
    ]
}

// -------- Pyrasite ---------------
move.souffle_brulant = {
    id: 'souffle_brulant',
    name: 'Souffle brûlant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 27, max: 38 }, target: 'enemy' },
        { type: 'dot', element: 'feu', value: 10, duration: 3, target: 'enemy' }
    ]
}
move.cri_de_l_insecte_ardent = {
    id: 'cri_de_l_insecte_ardent',
    name: 'Cri de l\'insecte ardent',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}

// -------- Totem Motivant ---------------
move.encouragement = {
    id: 'encouragement',
    name: 'Encouragement',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'agility', value: 16, duration: 3, target: 'self' },
        { type: 'buff', stat: 'intelligence', value: 16, duration: 3, target: 'self' },
        { type: 'buff', stat: 'chance', value: 16, duration: 3, target: 'self' },
        { type: 'buff', stat: 'force', value: 16, duration: 3, target: 'self' },
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}

// -------- Totem Explosif ---------------
move.tentative_d_explosion = {
    id: 'tentative_d_explosion',
    name: 'Tentative d\'Explosion',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'flatDamage', value: 31, duration: 3, target: 'enemy' }
    ]
}

// -------- Totem Soignant ---------------
move.reconstitution_magique = {
    id: 'reconstitution_magique',
    name: 'Reconstitution Magique',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 31, target: 'self' }
    ]
}

// -------- Gobet ---------------
move.frappe_temeraire = {
    id: 'frappe_temeraire',
    name: 'Frappe Téméraire',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 17, max: 19 }, target: 'enemy' }
    ]
}
move.impact_maladroit = {
    id: 'impact_maladroit',
    name: 'Impact Maladroit',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 14, max: 16 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Fantôme Égérie ---------------
move.renvoi_fantomatique = {
    id: 'renvoi_fantomatique',
    name: 'Renvoi Fantômatique',
    cooldownMs: 2000,
    effects: [
        { type: 'renvoi', ratio: 0.5, target: 'self' }
    ]
}
move.explosion_fantomatique = {
    id: 'explosion_fantomatique',
    name: 'Explosion Fantômatique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 15, max: 17 }, target: 'enemy' }
    ]
}
move.fleche_fantomatique = {
    id: 'fleche_fantomatique',
    name: 'Flèche Fantômatique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 15, max: 17 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Fantôme Hicide ---------------
move.invocation_de_familiers_fantomatiques = {
    id: 'invocation_de_familiers_fantomatiques',
    name: 'Invocation de Familiers Fantômatiques',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: ['corbac_fantomatique','marcassin_fantomatique'], duration: 3, target: 'enemy' },
    ]
}
move.corbacame = {
    id: 'corbacame',
    name: 'Corbacamé',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 18, max: 20 }, target: 'enemy' }
    ]
}
move.cri_de_l_operette = {
    id: 'cri_de_l_operette',
    name: 'Cri de l\'Opérette',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 150, duration: 3, target: 'self' },
        { type: 'buff', stat: 'critChance', value: 20, duration: 3, target: 'self' }
    ]
}

// -------- Fantôme Apero ---------------
move.motivation_fantomatique = {
    id: 'motivation_fantomatique',
    name: 'Motivation Fantômatique',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}
move.invocation_d_esprits_familiers = {
    id: 'invocation_d_esprits_familiers',
    name: 'Invocation d\'Esprits Familiers',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: ['el_scarador_fantomatique','croum_fantomatique'], duration: 3, target: 'enemy' },
    ]
}
move.erikorbac = {
    id: 'erikorbac',
    name: 'Erikorbac',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 18, max: 20 }, target: 'enemy' }
    ]
}

// -------- Garglyphe ---------------
move.deterrage = {
    id: 'deterrage',
    name: 'Déterrage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 25, max: 29 }, target: 'enemy' }
    ]
}
move.gare_aux_glyphes = {
    id: 'gare_aux_glyphes',
    name: 'Gare aux Glyphes',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: ['gargrouille'], duration: 3, target: 'enemy' },
    ]
}
move.durete_ramollissante = {
    id: 'durete_ramollissante',
    name: 'Dureté Ramollissante',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'res.air', value: 20, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'res.eau', value: 20, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.feu', value: 20, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.terre', value: 20, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.air', value: 20, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'res.eau', value: 20, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'res.feu', value: 20, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.terre', value: 20, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.air', value: 20, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.eau', value: 20, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'res.feu', value: 20, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'res.terre', value: 20, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.air', value: 20, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.eau', value: 20, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.feu', value: 20, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'res.terre', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Gobaliste ---------------
move.flatuosite = {
    id: 'flatuosite',
    name: 'Flatuosité',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 14, max: 16 }, target: 'enemy' }
    ]
}
move.tir_de_gobaliste = {
    id: 'tir_de_gobaliste',
    name: 'Tir de Gobaliste',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 18, max: 20 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}

// -------- Gobaladée ---------------
move.co_balade = {
    id: 'co_balade',
    name: 'Co-balade',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', value: 120, duration: 3, target: 'self' }
    ]
}
move.egob_trip = {
    id: 'egob_trip',
    name: 'Egob trip',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 15, max: 17 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Tofu Maléfique ---------------
move.malefice = {
    id: 'malefice',
    name: 'Maléfice',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' }
    ]
}
move.beco_malefique = {
    id: 'beco_malefique',
    name: 'Béco Maléfique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 15, max: 18 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 15, max: 18 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.punksnotdede = {
    id: 'punksnotdede',
    name: 'Punksnotdède',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' }
    ]
}

// -------- Chafer ---------------

// -------- Brigandine ---------------
move.fronde = {
    id: 'fronde',
    name: 'Fronde',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 50 }, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.appel_de_papa = {
    id: 'appel_de_papa',
    name: 'Appel de Papa',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: ['brigandin'], duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' }
    ]
}

// -------- Brigandin ---------------
move.appel_de_la_mama = {
    id: 'appel_de_la_mama',
    name: 'Appel de la Mama',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: ['brigandine'], duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' }
    ]
}
move.elagage_de_cou = {
    id: 'elagage_de_cou',
    name: 'Elagage de cou',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 50 }, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Michelangela ---------------

// -------- Céglumen ---------------
move.badigeonnage_de_cerumen = {
    id: 'badigeonnage_de_cerumen',
    name: 'Badigeonnage de cérumen',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'terre', value: 10, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.attrape_coton_tige = {
    id: 'attrape_coton_tige',
    name: 'Attrape coton-tige',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 25, max: 30 }, target: 'enemy' }
    ]
}

// -------- Boulanger Sombre ---------------
move.eventration = {
    id: 'eventration',
    name: 'Éventration',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 31, max: 50 }, target: 'enemy' }
    ]
}
move.lancer_de_pain = {
    id: 'lancer_de_pain',
    name: 'Lancer de Pain',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 7, max: 11 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Rat Molo ---------------
move.rajusteur = {
    id: 'rajusteur',
    name: 'Rajusteur',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.raclerie = {
    id: 'raclerie',
    name: 'Raclerie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 21, max: 25 }, target: 'enemy' }
    ]
}

// -------- Champa Vert ---------------
move.teleportation_du_champa = {
    id: 'teleportation_du_champa',
    name: 'Téléportation du Champa',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'air', damageHpPct: { source: 'casterMaxHp', pct: 10 }, target: 'enemy' }
    ]
}
move.champ_oisone = {
    id: 'champ_oisone',
    name: 'Champ Oisoné',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Champa Rouge ---------------
move.champsoin = {
    id: 'champsoin',
    name: 'Champsoin',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 21, target: 'self' }
    ]
}
move.champ_hagne = {
    id: 'champ_hagne',
    name: 'Champ Hagne',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Champa Bleu ---------------
move.sacrifice_douloureux = {
    id: 'sacrifice_douloureux',
    name: 'Sacrifice Douloureux',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 31, max: 35 }, target: 'enemy' }
    ]
}
move.attraction_champetre = {
    id: 'attraction_champetre',
    name: 'Attraction champêtre',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'eau', value: 11, duration: 2, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 11, max: 20 }, target: 'enemy' }
    ]
}

// -------- Champa Marron ---------------
move.champ_homi = {
    id: 'champ_homi',
    name: 'Champ Homi',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.champ_hetre = {
    id: 'champ_hetre',
    name: 'Champ Hêtre',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 0, duration: 3, target: 'self' },
        { type: 'buff', stat: 'atk', value: 100, duration: 3, target: 'self' }
    ]
}

// -------- Charogne ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Tofu d'Halouine ---------------

// -------- Gargrouille ---------------
move.souffle_gargouillesque = {
    id: 'souffle_gargouillesque',
    name: 'Souffle Gargouillesque',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 9, max: 11 }, target: 'enemy' }
    ]
}
move.gargouilli = {
    id: 'gargouilli',
    name: 'Gargouilli',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 23, max: 27 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 30, duration: 3, target: 'enemy' }
    ]
}
move.couteau = {
    id: 'couteau',
    name: 'Couteau',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 19, max: 23 }, target: 'enemy' }
    ]
}

// -------- Kolérat d'Égoutant ---------------
move.morsure_affaiblissante = {
    id: 'morsure_affaiblissante',
    name: 'Morsure Affaiblissante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}

// -------- Crustorail Kouraçao ---------------
move.pince_de_corail = {
    id: 'pince_de_corail',
    name: 'Pince de Corail',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 3, duration: 3, target: 'self' }
    ]
}
move.protection_de_corail = {
    id: 'protection_de_corail',
    name: 'Protection de Corail',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'res.neutre', value: 20, duration: 3, target: 'self' }
    ]
}

// -------- Mirgrillon ---------------
move.mini_empalement = {
    id: 'mini_empalement',
    name: 'Mini empalement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 35, max: 40 }, target: 'enemy' }
    ]
}
move.coup_de_boutonclier = {
    id: 'coup_de_boutonclier',
    name: 'Coup de boutonclier',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 13, max: 24 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Chafer Fantassin ---------------

// -------- Dragodinde de Nowel ---------------
move.dindosoin = {
    id: 'dindosoin',
    name: 'Dindosoin',
    cooldownMs: 2000,
    effects: [
        { type: 'heal%maxHp', value: 5, target: 'self' },
    ]
}
move.frappodindo = {
    id: 'frappodindo',
    name: 'Frappodindo',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 16, max: 18 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Tronknyde ---------------
move.glyphe_sylvestre = {
    id: 'glyphe_sylvestre',
    name: 'Glyphe Sylvestre',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.tronc_commun = {
    id: 'tronc_commun',
    name: 'Tronc Commun',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 0, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Palmifleur Kouraçao ---------------
move.decapsulation = {
    id: 'decapsulation',
    name: 'Décapsulation',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'damageReductionPct', value: 100, duration: 3, target: 'enemy' }
    ]
}
move.fleur_des_iles = {
    id: 'fleur_des_iles',
    name: 'Fleur des îles',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'heal', heal: 11, target: 'self' }
    ]
}

// -------- Palmifleur Malibout ---------------
move.fleur_des_iles_terre = {
    id: 'fleur_des_iles_terre',
    name: 'Fleur des îles',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'heal', heal: 11, target: 'self' }
    ]
}

// -------- Palmifleur Passaoh ---------------
move.fleur_des_iles_feu = {
    id: 'fleur_des_iles_feu',
    name: 'Fleur des îles',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'heal', heal: 11, target: 'self' }
    ]
}

// -------- Palmifleur Morito ---------------
move.fleur_des_iles_air = {
    id: 'fleur_des_iles_air',
    name: 'Fleur des îles',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'heal', heal: 11, target: 'self' }
    ]
}

// -------- Gob-trotteur ---------------
move.gobond = {
    id: 'gobond',
    name: 'Gobond',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.gobrochette = {
    id: 'gobrochette',
    name: 'Gobrochette',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'critChance', value: 6, duration: 3, target: 'self' },
        { type: 'damage', element: 'air', damage: { min: 18, max: 20 }, target: 'enemy' }
    ]
}

// -------- Sakarien ---------------
move.frappe_circulaire = {
    id: 'frappe_circulaire',
    name: 'Frappe circulaire',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'neutre', value: 11, duration: 4, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 41, max: 54 }, target: 'enemy' }
    ]
}
move.invocation_de_poupoussiere = {
    id: 'invocation_de_poupoussiere',
    name: 'Invocation de Poupoussière',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: ['poupoussiere'], duration: 3, target: 'enemy' }
    ]
}

// -------- Corailleur ---------------
move.frappe_de_corail = {
    id: 'frappe_de_corail',
    name: 'Frappe de Corail',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.lancer_de_corail = {
    id: 'lancer_de_corail',
    name: 'Lancer de Corail',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 11, max: 20 }, target: 'enemy' }
    ]
}
move.coraillement = {
    id: 'coraillement',
    name: 'Coraillement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'debuff', stat: 'res.eau', value: 10, duration: 3, target: 'enemy' }
    ]
}

// -------- Bwork Archer ---------------
move.fleche_trouveuse = {
    id: 'fleche_trouveuse',
    name: 'Flèche Trouveuse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 16, max: 20 }, target: 'enemy' }
    ]
}
move.maitrise_des_armes_de_jet = {
    id: 'maitrise_des_armes_de_jet',
    name: 'Maîtrise des Armes de Jet',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 40, duration: 3, target: 'self' }
    ]
}
move.projectile_puissant = {
    id: 'projectile_puissant',
    name: 'Projectile Puissant',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 150, duration: 3, target: 'self' }
    ]
}

// -------- Maître Vampire ---------------

// -------- Glutin turbulent ---------------
move.boolkiroul = {
    id: 'boolkiroul',
    name: 'Boolkiroul',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 15, max: 18 }, target: 'enemy' }
    ]
}
move.namas_pamouss = {
    id: 'namas_pamouss',
    name: 'Namas\'Pamouss',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 24, max: 28 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.ebouledeneigement = {
    id: 'ebouledeneigement',
    name: 'Ebouledeneigement',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Bakaza kopi ---------------
move.dorobo = {
    id: 'dorobo',
    name: 'Dorobo',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 22, max: 28 }, target: 'enemy' }
    ]
}

// -------- Chafer Primitif ---------------
move.curare = {
    id: 'curare',
    name: 'Curare',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 13, max: 16 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 6, max: 6 }, target: 'enemy' }
    ]
}
move.elance_de_couteau = {
    id: 'elance_de_couteau',
    name: 'Élancé de Couteau',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'res.eau', value: 10, duration: 3, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.robustesse = {
    id: 'robustesse',
    name: 'Robustesse',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 1, duration: 3, target: 'self' }
    ]
}

// -------- Tiwabbit Kiafin ---------------
move.vent_de_panique = {
    id: 'vent_de_panique',
    name: 'Vent de panique',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'neutre', value: 11, duration: 4, target: 'enemy' }
    ]
}
move.panique = {
    id: 'panique',
    name: 'Panique',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Chevalier ---------------
move.laminagile = {
    id: 'laminagile',
    name: 'Laminagile',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}
move.virevoltige = {
    id: 'virevoltige',
    name: 'Virevoltige',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 20, max: 20 }, target: 'enemy' }
    ]
}
move.attirance_chevaleresque = {
    id: 'attirance_chevaleresque',
    name: 'Attirance Chevaleresque',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}
move.bond_chevaleresque = {
    id: 'bond_chevaleresque',
    name: 'Bond Chevaleresque',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'buff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'self' }
    ]
}

// -------- Boumbombe ---------------
move.tic_tac = {
    id: 'tic_tac',
    name: 'Tic Tac',
    cooldownMs: 2000,
    effects: [
        { type: 'renvoi', ratio: 0.5, target: 'self' },
        { type: 'debuff', stat: 'agility', value: 26, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'agility', value: 26, duration: 3, target: 'self' }
    ]
}
move.badaboum = {
    id: 'badaboum',
    name: 'Badaboum',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damageHpPct: { source: 'casterMaxHp', pct: 250 }, target: 'enemy' }
    ]
}

// -------- Trégénaire ---------------
move.protection_de_la_reine = {
    id: 'protection_de_la_reine',
    name: 'Protection de la Reine',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 61, target: 'self' }
    ]
}

// -------- Toile ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Kitsou nakwatus ---------------
move.ruse_hivernale = {
    id: 'ruse_hivernale',
    name: 'Ruse hivernale',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 100, duration: 3, target: 'self' }
    ]
}
move.kitsouqueue = {
    id: 'kitsouqueue',
    name: 'Kitsouqueue',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 29, max: 33 }, target: 'enemy' },
        { type: 'heal%maxHp', value: 10, target: 'self' },
    ]
}
move.kitsnition_frissonante = {
    id: 'kitsnition_frissonante',
    name: 'Kitsnition frissonante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 26, max: 30 }, target: 'enemy' }
    ]
}
move.kitsouflamme = {
    id: 'kitsouflamme',
    name: 'Kitsouflamme',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 9, max: 13 }, target: 'enemy' }
    ]
}

// -------- Tiwabbit ---------------
move.frappe_des_wabbits = {
    id: 'frappe_des_wabbits',
    name: 'Frappe des Wabbits',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 25 }, target: 'enemy' }
    ]
}
move.envoie_la_patate = {
    id: 'envoie_la_patate',
    name: 'Envoie la patate',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 100, duration: 3, target: 'self' },
        { type: 'buff', stat: 'flatDamage', value: 10, duration: 3, target: 'self' }
    ]
}

// -------- Tofu enneigé ---------------
move.tombee_de_neige = {
    id: 'tombee_de_neige',
    name: 'Tombée de Neige',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 15, max: 19 }, target: 'enemy' }
    ]
}
move.debarbouillage = {
    id: 'debarbouillage',
    name: 'Débarbouillage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 20, max: 24 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}

// -------- Larve Saphir ---------------
move.larvure = {
    id: 'larvure',
    name: 'Larvure',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 11, target: 'self' }
    ]
}

// -------- Larve Rubis ---------------
move.carapace = {
    id: 'carapace',
    name: 'Carapace',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 20, duration: 2, target: 'self' },
    ]
}

// -------- Larve Émeraude ---------------
move.larvage = {
    id: 'larvage',
    name: 'Larvage',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
    ]
}

// -------- Larve Dorée ---------------

// -------- Flammèche Fumeuse ---------------
move.rapprochement_elementaire = {
    id: 'rapprochement_elementaire',
    name: 'Rapprochement Élémentaire',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 5, max: 6 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.immolation = {
    id: 'immolation',
    name: 'Immolation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damageHpPct: { source: 'casterMaxHp', pct: 150 }, target: 'enemy' }
    ]
}

// -------- Flammèche Aqueuse ---------------
move.rapprochement_elementaireeau = {
    id: 'rapprochement_elementaireeau',
    name: 'Rapprochement Élémentaire',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 5, max: 6 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.immolationeau = {
    id: 'immolationeau',
    name: 'Immolation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damageHpPct: { source: 'casterMaxHp', pct: 150 }, target: 'enemy' }
    ]
}

// -------- Flammèche Terreuse ---------------
move.rapprochement_elementaireterre = {
    id: 'rapprochement_elementaireterre',
    name: 'Rapprochement Élémentaire',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 5, max: 6 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.immolationterre = {
    id: 'immolationterre',
    name: 'Immolation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damageHpPct: { source: 'casterMaxHp', pct: 150 }, target: 'enemy' }
    ]
}

// -------- Flammèche Venteuse ---------------
move.rapprochement_elementaireair = {
    id: 'rapprochement_elementaireair',
    name: 'Rapprochement Élémentaire',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 5, max: 6 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.immolation = {
    id: 'immolation',
    name: 'Immolation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damageHpPct: { source: 'casterMaxHp', pct: 150 }, target: 'enemy' }
    ]
}

// -------- Fantôme Aux Plates ---------------
move.tempete_fantomatique = {
    id: 'tempete_fantomatique',
    name: 'Tempête Fantômatique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 17, max: 19 }, target: 'enemy' }
    ]
}
move.epee_fantomatique = {
    id: 'epee_fantomatique',
    name: 'Épée Fantômatique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 4, max: 5 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 4, max: 5 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.aspiration_fragilisante = {
    id: 'aspiration_fragilisante',
    name: 'Aspiration Fragilisante',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Cochon de Lait ---------------
move.lard_bat_laite = {
    id: 'lard_bat_laite',
    name: 'Lard Bat Laite',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.reniflement = {
    id: 'reniflement',
    name: 'Reniflement',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'critChance', value: 10, duration: 3, target: 'enemy' }
    ]
}

// -------- Crabe ---------------
move.pince = {
    id: 'pince',
    name: 'Pince',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 25, max: 36 }, target: 'enemy' }
    ]
}
move.violon_sel = {
    id: 'violon_sel',
    name: 'Violon Sel',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.chancre = {
    id: 'chancre',
    name: 'Chancre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}

// -------- Black Tiwabbit ---------------
move.petit_wabehameha = {
    id: 'petit_wabehameha',
    name: 'Petit Wabehameha',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Tikoko ---------------
move.enfeuillage = {
    id: 'enfeuillage',
    name: 'Enfeuillage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 25 }, target: 'enemy' }
    ]
}

// -------- Kokoko ---------------
move.fremissement = {
    id: 'fremissement',
    name: 'Frémissement',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.aidchotte = {
    id: 'aidchotte',
    name: 'Aidchotte',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 25 }, target: 'enemy' }
    ]
}

// -------- Nodkoko ---------------
move.jus_baveux = {
    id: 'jus_baveux',
    name: 'Jus Baveux',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 25 }, target: 'enemy' }
    ]
}
move.kokojus = {
    id: 'kokojus',
    name: 'Kokojus',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}

// -------- Tortue Rouge ---------------
move.chapeau_incandescent = {
    id: 'chapeau_incandescent',
    name: 'Chapeau Incandescent',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 26, max: 30 }, target: 'enemy' }
    ]
}
move.feu_interieur = {
    id: 'feu_interieur',
    name: 'Feu Intérieur',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 300, duration: 3, target: 'self' }
    ]
}
move.coup_de_pied_tombant = {
    id: 'coup_de_pied_tombant',
    name: 'Coup de Pied Tombant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 36, max: 40 }, target: 'enemy' }
    ]
}

// -------- Tortue Bleue ---------------
move.carapace_reflechissante = {
    id: 'carapace_reflechissante',
    name: 'Carapace Réfléchissante',
    cooldownMs: 2000,
    effects: [
        { type: 'renvoiTotal', ratio: 1.0, target: 'self' },
    ]
}
move.feu_aquatique = {
    id: 'feu_aquatique',
    name: 'Feu Aquatique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 16, max: 20 }, target: 'enemy' }
    ]
}
move.poing_de_la_tortue = {
    id: 'poing_de_la_tortue',
    name: 'Poing de la Tortue',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 51, max: 55 }, target: 'enemy' }
    ]
}

// -------- Tortue Verte ---------------
move.vents_percants = {
    id: 'vents_percants',
    name: 'Vents Perçants',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 10, duration: 3, target: 'enemy' }
    ]
}
move.coup_de_patte_tournoyant = {
    id: 'coup_de_patte_tournoyant',
    name: 'Coup de Patte Tournoyant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.ecrasement_terrestre = {
    id: 'ecrasement_terrestre',
    name: 'Écrasement Terrestre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Tortue Jaune ---------------
move.frappe_eclair_de_la_tortue = {
    id: 'frappe_eclair_de_la_tortue',
    name: 'Frappe Éclair de la Tortue',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 26, max: 30 }, target: 'enemy' }
    ]
}
move.patte_explosive = {
    id: 'patte_explosive',
    name: 'Patte Explosive',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}

// -------- Berger Porkass ---------------
move.koudanlulk = {
    id: 'koudanlulk',
    name: 'Koudanlulk',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 1, max: 20 }, target: 'enemy' }
    ]
}
move.tridembrochement = {
    id: 'tridembrochement',
    name: 'Tridembrochement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 15, max: 20 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.appel_de_la_foudre = {
    id: 'appel_de_la_foudre',
    name: 'Appel de la Foudre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 15, max: 20 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 4, target: 'self' },
    ]
}

// -------- Kipik ---------------
move.savapike = {
    id: 'savapike',
    name: 'Savapiké',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'critChance', value: 10, duration: 3, target: 'self' }
    ]
}
move.branche_kipik = {
    id: 'branche_kipik',
    name: 'Branche Kipik',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 15, max: 17 }, target: 'enemy' }
    ]
}

// -------- Kwakus ---------------
move.kwakiboost = {
    id: 'kwakiboost',
    name: 'Kwakiboost',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 70, duration: 3, target: 'self' }
    ]
}
move.kwakikri = {
    id: 'kwakikri',
    name: 'Kwakikri',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 30, max: 34 }, target: 'enemy' }
    ]
}
move.kwakoukus = {
    id: 'kwakoukus',
    name: 'Kwakoukus',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 13, max: 17 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.wakpotus = {
    id: 'wakpotus',
    name: 'Wakpotus',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'intelligence', value: 50, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'intelligence', value: 50, duration: 3, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 17, max: 21 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Raul Mops ---------------
move.harponnage = {
    id: 'harponnage',
    name: 'Harponnage',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}
move.dispersion_sablee = {
    id: 'dispersion_sablee',
    name: 'Dispersion Sablée',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 11, max: 20 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.brise = {
    id: 'brise',
    name: 'Brise',
    cooldownMs: 2000,
    effects: [
        { type: 'renvoi', ratio: 0.5, target: 'self' },
    ]
}

// -------- Étoile de la Mer d'Asse ---------------
move.salage = {
    id: 'salage',
    name: 'Salage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 17, max: 24 }, target: 'enemy' }
    ]
}
move.crachat_de_sable = {
    id: 'crachat_de_sable',
    name: 'Crachat de Sable',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.soin_groupe = {
    id: 'soin_groupe',
    name: 'Soin Groupé',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 17, target: 'self' }
    ]
}

// -------- Moumoule ---------------
move.ninjattaque = {
    id: 'ninjattaque',
    name: 'Ninjattaque',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, erodedHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}
move.bubulle = {
    id: 'bubulle',
    name: 'Bubulle',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.coquille = {
    id: 'coquille',
    name: 'Coquille',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 0, duration: 3, target: 'self' },
        { type: 'heal', heal: 120, target: 'self' }
    ]
}

// -------- Grokoko ---------------
move.koulraoul = {
    id: 'koulraoul',
    name: 'Koulraoul',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 26, max: 30 }, target: 'enemy' }
    ]
}
move.kokospiration = {
    id: 'kokospiration',
    name: 'Kokospiration',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Blop Indigo invoqué ---------------
move.blyphe_koalak = {
    id: 'blyphe_koalak',
    name: 'Blyphe Koalak',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' }
    ]
}

// -------- Blop Coco invoqué ---------------

// -------- Blop Griotte invoqué ---------------

// -------- Blop Reinette invoqué ---------------

// -------- Black tiwabbitus ---------------
move.enewgie_tewestwe = {
    id: 'enewgie_tewestwe',
    name: 'Enewgie tewestwe',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 15, max: 19 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 1, duration: 2, target: 'enemy' },
        { type: 'buff', stat: 'spd', value: 1, duration: 2, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 18, max: 23 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 1, duration: 2, target: 'enemy' },
        { type: 'buff', stat: 'spd', value: 1, duration: 2, target: 'self' }
    ]
}
move.twansposition = {
    id: 'twansposition',
    name: 'Twansposition',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 20, max: 24 }, target: 'enemy' }
    ]
}
move.wabehameha = {
    id: 'wabehameha',
    name: 'Wabehameha',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 18, max: 22 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.frappus = {
    id: 'frappus',
    name: 'Frappus',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 10, duration: 3, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 13, max: 17 }, target: 'enemy' }
    ]
}

// -------- Wabbit ---------------
move.farandole_de_cawottes = {
    id: 'farandole_de_cawottes',
    name: 'Farandole de cawottes',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' },
        { type: 'heal%maxHp', value: 20, target: 'self' },
    ]
}

// -------- Chafer Draugr ---------------
move.mjollnir = {
    id: 'mjollnir',
    name: 'Mjöllnir',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 26 }, target: 'enemy' }
    ]
}
move.do_fus_rah = {
    id: 'do_fus_rah',
    name: 'Do Fus Rah !',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
    ]
}
move.hel = {
    id: 'hel',
    name: 'Hel',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Sanglier des Plaines ---------------
move.protection_de_la_plaine = {
    id: 'protection_de_la_plaine',
    name: 'Protection de la Plaine',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 10, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.air', value: 10, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.eau', value: 10, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.feu', value: 10, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.neutre', value: 10, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.terre', value: 10, duration: 3, target: 'self' }
    ]
}
move.coup_de_defenses = {
    id: 'coup_de_defenses',
    name: 'Coup de Défenses',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 13, max: 18 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.hardeur = {
    id: 'hardeur',
    name: 'Hardeur',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 20, duration: 3, target: 'self' }
    ]
}

// -------- Bwork Mage ---------------
move.eclair_en_serie = {
    id: 'eclair_en_serie',
    name: 'Éclair en Série',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 5, max: 9 }, target: 'enemy' }
    ]
}
move.tornade = {
    id: 'tornade',
    name: 'Tornade',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 3, max: 6 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.invocation_de_tofu_malefique = {
    id: 'invocation_de_tofu_malefique',
    name: 'Invocation de Tofu Maléfique',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: ['tofu_malefique'], duration: 3, target: 'enemy' }
    ]
}

// -------- Bwork ---------------
move.rage = {
    id: 'rage',
    name: 'Rage',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 6, duration: 3, target: 'self' }
    ]
}
move.soufflette = {
    id: 'soufflette',
    name: 'Soufflette',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Bandit Manchot ---------------
move.persecution = {
    id: 'persecution',
    name: 'Persécution',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 25, max: 30 }, target: 'enemy' }
    ]
}
move.lancer_de_hachette = {
    id: 'lancer_de_hachette',
    name: 'Lancer de Hachette',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 13, max: 20 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Mineur Sombre ---------------
move.coup_de_pioche = {
    id: 'coup_de_pioche',
    name: 'Coup de Pioche',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 16, max: 35 }, target: 'enemy' }
    ]
}
move.gaucherie_de_masse = {
    id: 'gaucherie_de_masse',
    name: 'Gaucherie de Masse',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.escroquerie = {
    id: 'escroquerie',
    name: 'Escroquerie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 31, max: 36 }, target: 'enemy' }
    ]
}

// -------- Cavalier Porkass ---------------
move.defonses = {
    id: 'defonses',
    name: 'Défonses',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
    ]
}
move.rudesse = {
    id: 'rudesse',
    name: 'Rudesse',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}
move.porkass_tete = {
    id: 'porkass_tete',
    name: 'Porkass Tête',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 19, max: 24 }, target: 'enemy' }
    ]
}

// -------- Timongouste ---------------
move.jet_de_salive = {
    id: 'jet_de_salive',
    name: 'Jet de salive',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 23, max: 27 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.cri_d_alerte = {
    id: 'cri_d_alerte',
    name: 'Cri d\'alerte',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}

// -------- Thomondor ---------------
move.rafale_de_plumes = {
    id: 'rafale_de_plumes',
    name: 'Rafale de plumes',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 23, max: 27 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.atterrissage = {
    id: 'atterrissage',
    name: 'Atterrissage',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Trankilou ---------------
move.laceration = {
    id: 'laceration',
    name: 'Lacération',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 19, max: 23 }, target: 'enemy' },
        { type: 'buff', stat: 'critChance', value: 10, duration: 3, target: 'self' }
    ]
}
move.croc_brulant = {
    id: 'croc_brulant',
    name: 'Croc brûlant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 19, max: 23 }, target: 'enemy' }
    ]
}

// -------- Totem du Feu ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Totem de l'Eau ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Totem de l'Air ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Totem de la Terre ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Sousouris Agressive ---------------
move.emmental = {
    id: 'emmental',
    name: 'Emmental',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'force', value: 51, duration: 3, target: 'self' },
        { type: 'heal', heal: 26, target: 'self' },
        { type: 'buff', stat: 'damageReductionPct', value: 20, duration: 2, target: 'self' },
    ]
}

// -------- Black Wabbit ---------------
move.wabeha = {
    id: 'wabeha',
    name: 'Wabeha',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 26, max: 28 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Chafer Lancier ---------------
move.euphorie_malsaine = {
    id: 'euphorie_malsaine',
    name: 'Euphorie malsaine',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}
move.transpercement = {
    id: 'transpercement',
    name: 'Transpercement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 31, max: 40 }, target: 'enemy' }
    ]
}
move.aouh = {
    id: 'aouh',
    name: 'Aouh !',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 0, duration: 3, target: 'self' }
    ]
}

// -------- Chafer d'Élite ---------------
move.frenesie = {
    id: 'frenesie',
    name: 'Frénésie',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 100, duration: 3, target: 'self' }
    ]
}
move.coup_d_elite = {
    id: 'coup_d_elite',
    name: 'Coup d\'Élite',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 40 }, target: 'enemy' }
    ]
}
move.coup_affaiblissant = {
    id: 'coup_affaiblissant',
    name: 'Coup Affaiblissant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 5, max: 6 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 5, max: 6 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 5, max: 6 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 5, max: 6 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 5, max: 6 }, target: 'enemy' }
    ]
}

// -------- Noeul ---------------
move.hypnose = {
    id: 'hypnose',
    name: 'Hypnose',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' },
        { type: 'debuff', stat: 'intelligence', value: 50, duration: 3, target: 'enemy' }
    ]
}
move.mirettes = {
    id: 'mirettes',
    name: 'Mirettes',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 6, max: 10 }, target: 'enemy' }
    ]
}

// -------- Wabbit Squelette ---------------
move.entetement = {
    id: 'entetement',
    name: 'Entêtement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 35 }, target: 'enemy' }
    ]
}

// -------- Bourdard ---------------
move.essaimage = {
    id: 'essaimage',
    name: 'Essaimage',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'res.air', value: 15, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'res.eau', value: 15, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'res.feu', value: 15, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'res.terre', value: 15, duration: 3, target: 'enemy' }
    ]
}
move.bizz = {
    id: 'bizz',
    name: 'Bizz',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 30, duration: 3, target: 'self' },
        { type: 'heal%maxHp', value: 5, target: 'self' },
    ]
}
move.buzz = {
    id: 'buzz',
    name: 'Buzz',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Ramane d'Égoutant ---------------
move.invocation_de_kolerat_d_egoutant = {
    id: 'invocation_de_kolerat_d_egoutant',
    name: 'Invocation de Kolérat d\'Égoutant',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.emmental_d_egoutant = {
    id: 'emmental_d_egoutant',
    name: 'Emmental d\'Égoutant',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 51, duration: 3, target: 'self' },
        { type: 'heal', heal: 31, target: 'self' },
        { type: 'buff', stat: 'damageReductionPct', value: 20, duration: 2, target: 'self' },
    ]
}
move.roblochon_d_egoutant = {
    id: 'roblochon_d_egoutant',
    name: 'Roblochon d\'Égoutant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'intelligence', value: 50, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'agility', value: 50, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'force', value: 50, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'chance', value: 50, duration: 3, target: 'enemy' }
    ]
}

// -------- Rupture d'encre ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Rupture de papier ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Milicien ---------------
move.virevolte = {
    id: 'virevolte',
    name: 'Virevolte',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 20, max: 20 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.laminage = {
    id: 'laminage',
    name: 'Laminage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}

// -------- Guerrier ---------------

// -------- Krokille Novice Insipide ---------------
move.venin_ankylosant = {
    id: 'venin_ankylosant',
    name: 'Venin Ankylosant',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.alanguissement = {
    id: 'alanguissement',
    name: 'Alanguissement',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Krokille Novice Boueuse ---------------
move.entetement_obsessionnel = {
    id: 'entetement_obsessionnel',
    name: 'Entêtement Obsessionnel',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 8, max: 12 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 4, target: 'self' },
    ]
}
move.attraction_stabilisante = {
    id: 'attraction_stabilisante',
    name: 'Attraction Stabilisante',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 8, max: 12 }, target: 'enemy' }
    ]
}

// -------- Krokille Novice Incandescente ---------------
move.agonie = {
    id: 'agonie',
    name: 'Agonie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 11, max: 15 }, target: 'enemy' }
    ]
}
move.contre_faiblesse = {
    id: 'contre_faiblesse',
    name: 'Contre-Faiblesse',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 100, target: 'self' },
    ]
}

// -------- Krokille Novice Humide ---------------
move.humidification = {
    id: 'humidification',
    name: 'Humidification',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 14, max: 17 }, target: 'enemy' }
    ]
}
move.noyade = {
    id: 'noyade',
    name: 'Noyade',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 13, max: 16 }, target: 'enemy' }
    ]
}

// -------- Krokille Novice Sèche ---------------
move.secheresse = {
    id: 'secheresse',
    name: 'Sècheresse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 14, max: 17 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.ouragan_renversant = {
    id: 'ouragan_renversant',
    name: 'Ouragan Renversant',
    cooldownMs: 2000,
    effects: [
        { type: 'esquive', chancePct: 40, reductionPct: 100, duration: 3, target: 'self' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}

// -------- Black Wabbit Squelette ---------------
move.coup_a_la_wizou = {
    id: 'coup_a_la_wizou',
    name: 'Coup à la Wizou',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 10, max: 10 }, currentHpScale: { stat: 'finalDamagePct', ratio: 0.5 }, target: 'enemy' }
    ]
}

// -------- Tofu Ventripotent ---------------
move.invocation_de_bomberfu = {
    id: 'invocation_de_bomberfu',
    name: 'Invocation de Bomberfu',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: ['bomberfu'], duration: 3, target: 'enemy' }
    ]
}
move.benediction_du_tofulailler = {
    id: 'benediction_du_tofulailler',
    name: 'Bénédiction du Tofulailler',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'maxHp', value: 21, duration: 3, target: 'self' },
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'agility', value: 31, duration: 3, target: 'self' }
    ]
}

// -------- Lanterne bombe ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Lanterne grappe de pétards ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Poupée Aycetroy ---------------
move.myopie_poupesque = {
    id: 'myopie_poupesque',
    name: 'Myopie Poupesque',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}

// -------- Rat d'Hyoactif ---------------
move.ratiboisement = {
    id: 'ratiboisement',
    name: 'Ratiboisement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.rayonnement_hyoactif = {
    id: 'rayonnement_hyoactif',
    name: 'Rayonnement Hyoactif',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 7, max: 10 }, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 10, duration: 3, target: 'enemy' }
    ]
}
move.coup_agglutinant = {
    id: 'coup_agglutinant',
    name: 'Coup Agglutinant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 19, max: 24 }, target: 'enemy' }
    ]
}

// -------- Wo Wabbit ---------------
move.invocation_de_tiwabbit = {
    id: 'invocation_de_tiwabbit',
    name: 'Invocation de Tiwabbit',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: ['tiwabbit'], duration: 3, target: 'enemy' }
    ]
}
move.invocation_de_black_tiwabbit = {
    id: 'invocation_de_black_tiwabbit',
    name: 'Invocation de Black Tiwabbit',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: ['black_tiwabbit'], duration: 3, target: 'enemy' }
    ]
}
move.ventroboom = {
    id: 'ventroboom',
    name: 'Ventroboom',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 26, max: 35 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.invocation_de_tiwabbit_kiafin = {
    id: 'invocation_de_tiwabbit_kiafin',
    name: 'Invocation de Tiwabbit Kiafin',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: ['tiwabbit_kiafin'], duration: 3, target: 'enemy' }
    ]
}

// -------- Kanniboul Ark ---------------
move.coup_de_masque = {
    id: 'coup_de_masque',
    name: 'Coup de Masque',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.tir_a_l_arc_primitif = {
    id: 'tir_a_l_arc_primitif',
    name: 'Tir à l\'Arc Primitif',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 5, duration: 3, target: 'enemy' }
    ]
}

// -------- Kanniboul Eth ---------------
move.fronde_poche = {
    id: 'fronde_poche',
    name: 'Fronde Poche',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'debuff', stat: 'agility', value: 50, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'agility', value: 50, duration: 3, target: 'self' }
    ]
}
move.inspiration_vaudou = {
    id: 'inspiration_vaudou',
    name: 'Inspiration Vaudou',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 100, duration: 3, target: 'self' }
    ]
}
move.eternuement_collateral = {
    id: 'eternuement_collateral',
    name: 'Éternuement Collatéral',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 25 }, target: 'enemy' }
    ]
}

// -------- Kanniboul Jav ---------------
move.poussee_amicale = {
    id: 'poussee_amicale',
    name: 'Poussée Amicale',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.javeline_fulgurante = {
    id: 'javeline_fulgurante',
    name: 'Javeline Fulgurante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 31, max: 35 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.iousholnotpasse = {
    id: 'iousholnotpasse',
    name: 'Iousholnotpasse',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}

// -------- Kanniboul Sarbak ---------------
move.sarbakanniboul = {
    id: 'sarbakanniboul',
    name: 'Sarbakanniboul',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 25 }, target: 'enemy' }
    ]
}
move.cri_sauvage = {
    id: 'cri_sauvage',
    name: 'Cri sauvage',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Kanniboul Tam ---------------
move.batou_kada = {
    id: 'batou_kada',
    name: 'Batou Kada',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 25 }, target: 'enemy' }
    ]
}
move.tambour_motivant = {
    id: 'tambour_motivant',
    name: 'Tambour Motivant',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}

// -------- Twakeuf ---------------
move.souffle_liqueuwant = {
    id: 'souffle_liqueuwant',
    name: 'Souffle Liqueuwant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}
move.spiwitueuw = {
    id: 'spiwitueuw',
    name: 'Spiwitueuw',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 26, max: 35 }, target: 'enemy' }
    ]
}
move.absowption = {
    id: 'absowption',
    name: 'Absowption',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'maxHp', value: 100, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'maxHp', value: 100, duration: 3, target: 'self' }
    ]
}
move.mowfal = {
    id: 'mowfal',
    name: 'Mowfal',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}

// -------- Warkaïk ---------------
move.chokobombawde = {
    id: 'chokobombawde',
    name: 'Chokobombawde',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 36, max: 45 }, target: 'enemy' }
    ]
}
move.twanchee = {
    id: 'twanchee',
    name: 'Twanchée',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 26, max: 35 }, target: 'enemy' }
    ]
}
move.ombwage = {
    id: 'ombwage',
    name: 'Ombwage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 21, max: 21 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}

// -------- Wadulant ---------------
move.celewite = {
    id: 'celewite',
    name: 'Céléwité',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.secouwiste = {
    id: 'secouwiste',
    name: 'Secouwiste',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 20, max: 29 }, target: 'enemy' }
    ]
}
move.ufowie = {
    id: 'ufowie',
    name: 'Œufowie',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'finalDamagePct', value: 10, duration: 3, target: 'self' },
        { type: 'buff', stat: 'damageReductionPct', value: 10, duration: 3, target: 'self' }
    ]
}

// -------- Waccro ---------------
move.stewoides = {
    id: 'stewoides',
    name: 'Stéwoïdes',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 100, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 100, duration: 3, target: 'self' }
    ]
}
move.skwat = {
    id: 'skwat',
    name: 'Skwat',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}
move.gwokwik = {
    id: 'gwokwik',
    name: 'Gwokwik',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 26, max: 35 }, target: 'enemy' }
    ]
}

// -------- Buffalourd ---------------
move.secousse_tellurique = {
    id: 'secousse_tellurique',
    name: 'Secousse tellurique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 20, max: 24 }, target: 'enemy' }
    ]
}
move.plaquage = {
    id: 'plaquage',
    name: 'Plaquage',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Grolours ---------------
move.impact_ecrasant = {
    id: 'impact_ecrasant',
    name: 'Impact écrasant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 25 }, target: 'enemy' }
    ]
}

// -------- Poupée Émeraude ---------------
move.transposition_poupesque = {
    id: 'transposition_poupesque',
    name: 'Transposition Poupesque',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 31, max: 50 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.calin_poupesque = {
    id: 'calin_poupesque',
    name: 'Câlin Poupesque',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 26, target: 'self' }
    ]
}
move.bond_poupesque = {
    id: 'bond_poupesque',
    name: 'Bond Poupesque',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 15, duration: 3, target: 'enemy' }
    ]
}

// -------- Souris Verte ---------------
move.regard_fondant = {
    id: 'regard_fondant',
    name: 'Regard Fondant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 17, max: 24 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.postillon_brulant = {
    id: 'postillon_brulant',
    name: 'Postillon Brûlant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 17, max: 20 }, target: 'enemy' },
        { type: 'debuff', stat: 'flatDamage', value: 6, duration: 3, target: 'enemy' }
    ]
}

// -------- Serpentin ---------------
move.dissimulation = {
    id: 'dissimulation',
    name: 'Dissimulation',
    cooldownMs: 2000,
    effects: [
        { type: 'esquive', chancePct: 40, reductionPct: 100, duration: 3, target: 'self' },
    ]
}
move.venin = {
    id: 'venin',
    name: 'Venin',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'air', value: 9, duration: 3, target: 'enemy' }
    ]
}
move.surprise = {
    id: 'surprise',
    name: 'Surprise!',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 5, max: 6 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 5, max: 6 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 5, max: 6 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 5, max: 6 }, target: 'enemy' },
        { type: 'debuff', stat: 'res.air', value: 4, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'res.terre', value: 4, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'res.eau', value: 4, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'res.feu', value: 4, duration: 3, target: 'enemy' }
    ]
}

// -------- Guerrier Mental ---------------
move.estocade_errante = {
    id: 'estocade_errante',
    name: 'Estocade Errante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.concentration_psychique = {
    id: 'concentration_psychique',
    name: 'Concentration Psychique',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 11, target: 'self' }
    ]
}

// -------- Wadnozéam ---------------
move.afwiandage = {
    id: 'afwiandage',
    name: 'Afwiandage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.wagglutinant = {
    id: 'wagglutinant',
    name: 'Wagglutinant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 26, max: 35 }, target: 'enemy' }
    ]
}
move.pouwsuite = {
    id: 'pouwsuite',
    name: 'Pouwsuite',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Larve Champêtre ---------------
move.larvaportation = {
    id: 'larvaportation',
    name: 'Larvaportation',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 21, max: 25 }, target: 'enemy' }
    ]
}
move.toussotement_larvesque = {
    id: 'toussotement_larvesque',
    name: 'Toussotement Larvesque',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 13, max: 17 }, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 10, duration: 3, target: 'self' }
    ]
}
move.larvement_champetre = {
    id: 'larvement_champetre',
    name: 'Larvement Champêtre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 11, max: 15 }, target: 'enemy' }
    ]
}

// -------- Le Flib ---------------
move.passton_tournoube = {
    id: 'passton_tournoube',
    name: 'Passton Tournoube',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.trinquons_ensemble_moussaillon = {
    id: 'trinquons_ensemble_moussaillon',
    name: 'Trinquons ensemble moussaillon !',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 200, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}
move.prestidigitation = {
    id: 'prestidigitation',
    name: 'Prestidigitation',
    cooldownMs: 2000,
    effects: [
        { type: 'esquive', chancePct: 40, reductionPct: 100, duration: 3, target: 'self' },
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}

// -------- Sparo ---------------
move.crochet = {
    id: 'crochet',
    name: 'Crochet',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 26, max: 35 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.glouto_rhum = {
    id: 'glouto_rhum',
    name: 'Glouto Rhum',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'agility', value: 100, duration: 3, target: 'enemy' }
    ]
}

// -------- Barbroussa ---------------
move.abordage = {
    id: 'abordage',
    name: 'Abordage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 25, max: 25 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.rapine = {
    id: 'rapine',
    name: 'Rapine',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damageHpPct: { source: 'casterMaxHp', pct: 15 }, target: 'enemy' }
    ]
}

// -------- Dragodinde amande sauvage ---------------
move.dindoboule = {
    id: 'dindoboule',
    name: 'Dindoboule',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}
move.stimulation_dragodinde = {
    id: 'stimulation_dragodinde',
    name: 'Stimulation Dragodinde',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}

// -------- Dragodinde rousse sauvage ---------------
move.dindofeu = {
    id: 'dindofeu',
    name: 'Dindofeu',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}

// -------- Dragodinde dorée sauvage ---------------
move.dindoneau = {
    id: 'dindoneau',
    name: 'Dindoneau',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}
move.dragodingue = {
    id: 'dragodingue',
    name: 'Dragodingue',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 3, target: 'self' },
        { type: 'buff', stat: 'critChance', value: 25, duration: 3, target: 'self' },
        { type: 'buff', stat: 'damageReductionPct', value: 5, duration: 3, target: 'self' }
    ]
}

// -------- Maître Bolet ---------------
move.sporification = {
    id: 'sporification',
    name: 'Sporification',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'maxHp', value: 200, duration: 2, target: 'self' }
    ]
}
move.champi_champsoin = {
    id: 'champi_champsoin',
    name: 'Champi Champsoin',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 21, target: 'self' },
        { type: 'summon', summonPool: ['champ_champ'], duration: 3, target: 'enemy' }
    ]
}
move.sabrochement = {
    id: 'sabrochement',
    name: 'Sabrochement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 15, max: 20 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Élémenterre ---------------
move.sismologie = {
    id: 'sismologie',
    name: 'Sismologie',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'res.terre', value: 25, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 21, duration: 3, target: 'self' }
    ]
}
move.terraportation = {
    id: 'terraportation',
    name: 'Terraportation',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 17, max: 24 }, target: 'enemy' }
    ]
}
move.terpanation = {
    id: 'terpanation',
    name: 'Terpanation',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'terre', value: 11, duration: 2, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 25, max: 36 }, target: 'enemy' }
    ]
}

// -------- Koalak Immature ---------------
move.decharge = {
    id: 'decharge',
    name: 'Décharge',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.decharge_magistrale = {
    id: 'decharge_magistrale',
    name: 'Décharge Magistrale',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 45 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.liberation_koalak = {
    id: 'liberation_koalak',
    name: 'Libération Koalak',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Dolbinos ---------------
move.coup_de_bec_affaiblissant = {
    id: 'coup_de_bec_affaiblissant',
    name: 'Coup de Bec Affaiblissant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 200, duration: 3, target: 'enemy' }
    ]
}
move.dotite = {
    id: 'dotite',
    name: 'Dotite',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Dokachu ---------------
move.dorage = {
    id: 'dorage',
    name: 'Dorage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 26, max: 30 }, target: 'enemy' }
    ]
}
move.donnerre = {
    id: 'donnerre',
    name: 'Donnerre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Dolivar ---------------

// -------- Garde de Pwâk ---------------
move.croquanibalisme = {
    id: 'croquanibalisme',
    name: 'Croquanibalisme',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' },
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' },
        { type: 'esquive', chancePct: 40, reductionPct: 100, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' },
        { type: 'heal%maxHp', value: 5, target: 'self' },
    ]
}
move.guimimauve = {
    id: 'guimimauve',
    name: 'Guimimauve',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'intelligence', value: 50, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'intelligence', value: 50, duration: 3, target: 'self' },
        { type: 'damage', element: 'neutre', damage: { min: 36, max: 39 }, target: 'enemy' }
    ]
}
move.englumauve = {
    id: 'englumauve',
    name: 'Englumauve',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.attrape_gourmand = {
    id: 'attrape_gourmand',
    name: 'Attrape Gourmand',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Shokipik ---------------
move.amstramgram = {
    id: 'amstramgram',
    name: 'Amstramgram',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 11, max: 20 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.bourebour = {
    id: 'bourebour',
    name: 'Bourébour',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 16, max: 25 }, target: 'enemy' }
    ]
}
move.ratatam = {
    id: 'ratatam',
    name: 'Ratatam',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 11, max: 15 }, target: 'enemy' }
    ]
}

// -------- Pandawasta ---------------
move.meditation = {
    id: 'meditation',
    name: 'Méditation',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'agility', value: 225, duration: 3, target: 'self' },
        { type: 'buff', stat: 'maxHp', value: 225, duration: 3, target: 'self' }
    ]
}
move.coup_de_bambou = {
    id: 'coup_de_bambou',
    name: 'Coup de Bambou',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' }
    ]
}

// -------- Chef Crocodaille ---------------
move.epee_de_panique = {
    id: 'epee_de_panique',
    name: 'Épée de Panique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 31, max: 35 }, target: 'enemy' }
    ]
}

// -------- Oeuf de Trégénaire ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Dégelée ---------------
move.decasse = {
    id: 'decasse',
    name: 'Décassé',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 11, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 11, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 11, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 11, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 11, max: 20 }, target: 'enemy' }
    ]
}
move.papouille = {
    id: 'papouille',
    name: 'Papouille',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 81, target: 'self' },
        { type: 'buff', stat: 'agility', value: 41, duration: 3, target: 'self' },
        { type: 'buff', stat: 'intelligence', value: 41, duration: 3, target: 'self' },
        { type: 'buff', stat: 'chance', value: 41, duration: 3, target: 'self' },
        { type: 'buff', stat: 'force', value: 41, duration: 3, target: 'self' },
        { type: 'buff', stat: 'maxHp', value: 121, duration: 3, target: 'self' }
    ]
}

// -------- Arakne Olithique ---------------
move.remous_marecageux = {
    id: 'remous_marecageux',
    name: 'Remous Marécageux',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 11, max: 16 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 11, max: 16 }, target: 'enemy' }
    ]
}
move.venin_dopant = {
    id: 'venin_dopant',
    name: 'Venin Dopant',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'finalDamagePct', value: 20, duration: 3, target: 'self' }
    ]
}

// -------- Craqueboule ---------------
move.martelement = {
    id: 'martelement',
    name: 'Martèlement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 6, duration: 3, target: 'self' }
    ]
}
move.motivation_tellurique = {
    id: 'motivation_tellurique',
    name: 'Motivation Tellurique',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}

// -------- Kanigrou ---------------
move.saut_majestueux = {
    id: 'saut_majestueux',
    name: 'Saut Majestueux',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}
move.destin_force = {
    id: 'destin_force',
    name: 'Destin Forcé',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'critChance', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'maxHp', value: 100, duration: 3, target: 'self' }
    ]
}
move.eventration_multiple = {
    id: 'eventration_multiple',
    name: 'Éventration multiple',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 25 }, target: 'enemy' }
    ]
}

// -------- Scorbute ---------------
move.alteration = {
    id: 'alteration',
    name: 'Altération',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'force', value: 51, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'agility', value: 51, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'chance', value: 51, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'intelligence', value: 51, duration: 3, target: 'enemy' }
    ]
}
move.poison_du_scorbute = {
    id: 'poison_du_scorbute',
    name: 'Poison du Scorbute',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 9, max: 12 }, target: 'enemy' }
    ]
}
move.coup_de_queue = {
    id: 'coup_de_queue',
    name: 'Coup de Queue',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 7, max: 8 }, target: 'enemy' }
    ]
}

// -------- Croc Gland ---------------
move.dechirement_intestinal = {
    id: 'dechirement_intestinal',
    name: 'Déchirement Intestinal',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 9, max: 12 }, target: 'enemy' }
    ]
}
move.ablation_testiculaire = {
    id: 'ablation_testiculaire',
    name: 'Ablation Testiculaire',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.desenvoutement_canin = {
    id: 'desenvoutement_canin',
    name: 'Désenvoutement Canin',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
    ]
}

// -------- Macien ---------------
move.chaine_chienne = {
    id: 'chaine_chienne',
    name: 'Chaîne Chienne',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.aboiement_sauvage = {
    id: 'aboiement_sauvage',
    name: 'Aboiement Sauvage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 10, max: 10 }, target: 'enemy' }
    ]
}
move.souffle_canin = {
    id: 'souffle_canin',
    name: 'Souffle Canin',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Crowneille ---------------
move.draveine = {
    id: 'draveine',
    name: 'Draveine',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}
move.catubodua = {
    id: 'catubodua',
    name: 'Catubodua',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 21, max: 24 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.baillement = {
    id: 'baillement',
    name: 'Bâillement',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Muldo indigo sauvage ---------------
move.coup_de_bouldo = {
    id: 'coup_de_bouldo',
    name: 'Coup de Bouldo',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}
move.souille = {
    id: 'souille',
    name: 'Souille',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'finalDamagePct', value: 10, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}

// -------- Craquelourd ---------------
move.snaille_pierre = {
    id: 'snaille_pierre',
    name: 'Snaille Pierre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 15, max: 20 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' }
    ]
}
move.gravure_dans_la_roche = {
    id: 'gravure_dans_la_roche',
    name: 'Gravure dans la Roche',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.choc_dessus = {
    id: 'choc_dessus',
    name: 'Choc Dessus',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Volkorne orchidée sauvage ---------------
move.volkardeur = {
    id: 'volkardeur',
    name: 'Volkardeur',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'heal', heal: 50, target: 'self' },
        { type: 'buffDrain', value: 2, target: 'enemy' }
    ]
}
move.volkolere = {
    id: 'volkolere',
    name: 'Volkolère',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Volkorne indigo sauvage ---------------
move.volkohue = {
    id: 'volkohue',
    name: 'Volkohue',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.volkonde = {
    id: 'volkonde',
    name: 'Volkonde',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}

// -------- Volkorne ébène sauvage ---------------
move.volkair = {
    id: 'volkair',
    name: 'Volkair',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.volkattirance = {
    id: 'volkattirance',
    name: 'Volkattirance',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}

// -------- Volkorne pourpre sauvage ---------------
move.volkalme = {
    id: 'volkalme',
    name: 'Volkalme',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'debuff', stat: 'force', value: 200, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'chance', value: 200, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'intelligence', value: 200, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'agility', value: 200, duration: 3, target: 'enemy' }
    ]
}
move.volkeclat = {
    id: 'volkeclat',
    name: 'Volkéclat',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'finalDamagePct', value: 30, duration: 3, target: 'enemy' }
    ]
}

// -------- Œuf de Pwâk doré ---------------

// -------- Foufayteur ---------------
move.quamehameha = {
    id: 'quamehameha',
    name: 'Quamehameha',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 26, max: 28 }, target: 'enemy' }
    ]
}
move.art_du_combat = {
    id: 'art_du_combat',
    name: 'Art du combat',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}
move.balayette = {
    id: 'balayette',
    name: 'Balayette',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 21, max: 25 }, target: 'enemy' }
    ]
}

// -------- Petite Marionnette ---------------
move.ainsi_font = {
    id: 'ainsi_font',
    name: 'Ainsi font',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 10, duration: 3, target: 'self' }
    ]
}

// -------- Pantin ---------------
move.coup_de_pied = {
    id: 'coup_de_pied',
    name: 'Coup de pied',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Milimeulou ---------------
move.grigriffes = {
    id: 'grigriffes',
    name: 'Grigriffes',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}

// -------- Kolérat ---------------

// -------- Craquelope ---------------
move.caillassage = {
    id: 'caillassage',
    name: 'Caillassage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 16, max: 25 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.percussion = {
    id: 'percussion',
    name: 'Percussion',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.pierrade = {
    id: 'pierrade',
    name: 'Pierrade',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 11, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 11, max: 20 }, target: 'enemy' }
    ]
}

// -------- Vétauran ---------------
move.craneur = {
    id: 'craneur',
    name: 'Crâneur',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 25, duration: 3, target: 'self' }
    ]
}
move.pull_vert_izele = {
    id: 'pull_vert_izele',
    name: 'Pull vert Izélé',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'debuff', stat: 'intelligence', value: 100, duration: 3, target: 'enemy' }
    ]
}
move.encornement = {
    id: 'encornement',
    name: 'Encornement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 25 }, target: 'enemy' }
    ]
}

// -------- Grand Pa Wabbit ---------------
move.cawotte_explosive = {
    id: 'cawotte_explosive',
    name: 'Cawotte Explosive',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 36, max: 45 }, target: 'enemy' }
    ]
}
move.cawotte_vitaminee = {
    id: 'cawotte_vitaminee',
    name: 'Cawotte Vitaminée',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 21, target: 'self' }
    ]
}
move.cawotte_paralysante = {
    id: 'cawotte_paralysante',
    name: 'Cawotte Paralysante',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Krokille Juvénile Crue ---------------
move.motivation_gluante = {
    id: 'motivation_gluante',
    name: 'Motivation Gluante',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' }
    ]
}
move.koque_chok = {
    id: 'koque_chok',
    name: 'Koque Chok',
    cooldownMs: 10000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 10000, max: 10000 }, target: 'enemy' }
    ]
}
move.krokille_de_neuf = {
    id: 'krokille_de_neuf',
    name: 'Krokille de neuf',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}

// -------- Koalak Forestier ---------------
move.abattage = {
    id: 'abattage',
    name: 'Abattage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 50 }, target: 'enemy' }
    ]
}
move.ebranchage = {
    id: 'ebranchage',
    name: 'Ébranchage',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' }
    ]
}
move.deracinage = {
    id: 'deracinage',
    name: 'Déracinage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 50 }, target: 'enemy' },
        { type: 'buff', stat: 'force', value: 21, duration: 3, target: 'self' }
    ]
}

// -------- Pékeualak ---------------
move.moulinet = {
    id: 'moulinet',
    name: 'Moulinet',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.amorce = {
    id: 'amorce',
    name: 'Amorce',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.coup_de_poisson = {
    id: 'coup_de_poisson',
    name: 'Coup de Poisson',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 21, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Black Wo Wabbit ---------------
move.aspiwation = {
    id: 'aspiwation',
    name: 'Aspiwation',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 16, max: 25 }, target: 'enemy' }
    ]
}
move.etweinte = {
    id: 'etweinte',
    name: 'Étweinte',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}

// -------- Étoile Swagante ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Wobot ---------------
move.massue_wotative = {
    id: 'massue_wotative',
    name: 'Massue Wotative',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 16, max: 25 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.wavelot = {
    id: 'wavelot',
    name: 'Wavelot',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 11, max: 20 }, target: 'enemy' }
    ]
}

// -------- Wobot Tamponneur ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Wobot Kiafin ---------------
move.weuche = {
    id: 'weuche',
    name: 'Weuche',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 16, max: 25 }, target: 'enemy' }
    ]
}
move.glissement_de_tewwain = {
    id: 'glissement_de_tewwain',
    name: 'Glissement de tewwain',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 16, max: 25 }, target: 'enemy' }
    ]
}

// -------- Dok Alako ---------------
move.devotion = {
    id: 'devotion',
    name: 'Dévotion',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 16, target: 'self' },
        { type: 'buff', stat: 'res.terre', value: 21, duration: 3, target: 'self' }
    ]
}
move.kalik = {
    id: 'kalik',
    name: 'Kalik',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'damageReductionPct', value: 10, duration: 3, target: 'enemy' }
    ]
}

// -------- Marionnette Blanche ---------------
move.croix_d_attelle = {
    id: 'croix_d_attelle',
    name: 'Croix d\'attelle',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.castelet = {
    id: 'castelet',
    name: 'Castelet',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.balancoire = {
    id: 'balancoire',
    name: 'Balançoire',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}

// -------- Marionnette Bleue ---------------
move.catharsis = {
    id: 'catharsis',
    name: 'Catharsis',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 100, duration: 3, target: 'enemy' }
    ]
}

// -------- Marionnette Rouge ---------------
move.scene_en_flammes = {
    id: 'scene_en_flammes',
    name: 'Scène en flammes',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 40 }, target: 'enemy' }
    ]
}

// -------- Marionnette Verte ---------------
move.fantoche = {
    id: 'fantoche',
    name: 'Fantoche',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 25, target: 'self' }
    ]
}

// -------- Marionnette Grise ---------------
move.marivaudage = {
    id: 'marivaudage',
    name: 'Marivaudage',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'damageReductionPct', value: 30, duration: 3, target: 'enemy' }
    ]
}

// -------- Blanc Pa Wabbit ---------------
move.cawotte_suwvitaminee = {
    id: 'cawotte_suwvitaminee',
    name: 'Cawotte Suwvitaminée',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 11, max: 20 }, target: 'enemy' },
        { type: 'heal', heal: 26, target: 'self' }
    ]
}
move.motivation_cawottique = {
    id: 'motivation_cawottique',
    name: 'Motivation Cawottique',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Tiwobot ---------------
move.wetouw_du_wabbit = {
    id: 'wetouw_du_wabbit',
    name: 'Wetouw du Wabbit',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 16, max: 25 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.lancew_de_cawotte = {
    id: 'lancew_de_cawotte',
    name: 'Lancew de Cawotte',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 16, max: 25 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.coup_de_boule = {
    id: 'coup_de_boule',
    name: 'Coup de Boule',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Kralab Rah ---------------
move.poulpe = {
    id: 'poulpe',
    name: 'Poulpe',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: ['poulpor'], duration: 3, target: 'enemy' }
    ]
}
move.lakazam = {
    id: 'lakazam',
    name: 'Lakazam',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 160, max: 160 }, target: 'enemy' }
    ]
}
move.connier = {
    id: 'connier',
    name: 'Connier',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 160, max: 160 }, target: 'enemy' }
    ]
}

// -------- Tabacille ---------------
move.echange_subtil = {
    id: 'echange_subtil',
    name: 'Échange subtil',
    cooldownMs: 5000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 31, max: 40 }, target: 'enemy' }
    ]
}
move.remontee_gastrique = {
    id: 'remontee_gastrique',
    name: 'Remontée gastrique',
    cooldownMs: 5000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}

// -------- Verminocule ---------------
move.gonflement = {
    id: 'gonflement',
    name: 'Gonflement',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 61, max: 70 }, target: 'enemy' }
    ]
}
move.jet_d_acide = {
    id: 'jet_d_acide',
    name: 'Jet d\'acide',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 131, max: 150 }, target: 'enemy' }
    ]
}

// -------- Bacterrib ---------------
move.secretion = {
    id: 'secretion',
    name: 'Sécrétion',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 61, max: 70 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.danse_repulsive = {
    id: 'danse_repulsive',
    name: 'Danse répulsive',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 71, max: 80 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Virustine ---------------
move.contamination = {
    id: 'contamination',
    name: 'Contamination',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 81, max: 100 }, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' }
    ]
}
move.boulet_viral = {
    id: 'boulet_viral',
    name: 'Boulet Viral',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 200, max: 200 }, erodedHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}

// -------- Pataugerme ---------------
move.brulure_d_estomac = {
    id: 'brulure_d_estomac',
    name: 'Brûlure d\'estomac',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 28, max: 32 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 28, max: 32 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 28, max: 32 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 28, max: 32 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 28, max: 32 }, target: 'enemy' }
    ]
}
move.attaque_souterraine = {
    id: 'attaque_souterraine',
    name: 'Attaque souterraine',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 71, max: 90 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Saltik ---------------
move.bond_etourdissant = {
    id: 'bond_etourdissant',
    name: 'Bond étourdissant',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.pressage = {
    id: 'pressage',
    name: 'Pressage',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}

// -------- Grokillage ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Éclat Kao ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Warko Marron ---------------
move.invocation_de_workette = {
    id: 'invocation_de_workette',
    name: 'Invocation de Workette',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: ['workette'], duration: 3, target: 'enemy' }
    ]
}
move.cecite = {
    id: 'cecite',
    name: 'Cécité',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 51, max: 60 }, target: 'enemy' }
    ]
}
move.vision_lointaine = {
    id: 'vision_lointaine',
    name: 'Vision Lointaine',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'maxHp', value: 41, duration: 3, target: 'self' }
    ]
}
move.pichenette = {
    id: 'pichenette',
    name: 'Pichenette',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 31, max: 50 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Troollogram ---------------
move.troollz = {
    id: 'troollz',
    name: 'Troollz',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'air', damage: { min: 17, max: 22 }, target: 'enemy' }
    ]
}
move.pettrooll = {
    id: 'pettrooll',
    name: 'Pettrooll',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 30, duration: 3, target: 'self' }
    ]
}

// -------- Imikaminokin ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Kinkutsubram ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Bribe de Zobal ---------------
move.agular = {
    id: 'agular',
    name: 'Agular',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 75, target: 'self' },
        { type: 'damage', element: 'air', damage: { min: 30, max: 34 }, target: 'enemy' }
    ]
}
move.furia = {
    id: 'furia',
    name: 'Furia',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 23 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 3, target: 'self' }
    ]
}
move.appui = {
    id: 'appui',
    name: 'Appui',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 6, max: 7 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 6, max: 7 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 6, max: 7 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 6, max: 7 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.plastron = {
    id: 'plastron',
    name: 'Plastron',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' },
    ]
}
move.apathie = {
    id: 'apathie',
    name: 'Apathie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 23, max: 26 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.cabriole = {
    id: 'cabriole',
    name: 'Cabriole',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 20, max: 23 }, target: 'enemy' }
    ]
}
move.reuche = {
    id: 'reuche',
    name: 'Reuche',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}
move.tortoruga = {
    id: 'tortoruga',
    name: 'Tortoruga',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' },
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}
move.catalepsie = {
    id: 'catalepsie',
    name: 'Catalepsie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 13, max: 15 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.cavalcade = {
    id: 'cavalcade',
    name: 'Cavalcade',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 23, max: 25 }, target: 'enemy' }
    ]
}
move.boliche = {
    id: 'boliche',
    name: 'Boliche',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 23, max: 25 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.l_arc_ifanss = {
    id: 'l_arc_ifanss',
    name: 'L\'Arc Ifanss',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 28, max: 34 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 6, max: 8 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'air', damage: { min: 6, max: 8 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Bribe de Steamer ---------------
move.exclamaton = {
    id: 'exclamaton',
    name: 'Exclamâton',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 13, max: 15 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'air', damage: { min: 13, max: 15 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.longue_vue = {
    id: 'longue_vue',
    name: 'Longue-vue',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 15, max: 17 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.torpille = {
    id: 'torpille',
    name: 'Torpille',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 15, max: 17 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.maree = {
    id: 'maree',
    name: 'Marée',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 21, max: 24 }, target: 'enemy' }
    ]
}
move.scaphandre = {
    id: 'scaphandre',
    name: 'Scaphandre',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' },
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}
move.periscope = {
    id: 'periscope',
    name: 'Périscope',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 24, max: 28 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.flibuste = {
    id: 'flibuste',
    name: 'Flibuste',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 33, max: 37 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 23, max: 25 }, target: 'enemy' }
    ]
}
move.ecume = {
    id: 'ecume',
    name: 'Écume',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 32, max: 36 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.embuscade = {
    id: 'embuscade',
    name: 'Embuscade',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 7, max: 9 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 7, max: 9 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 7, max: 9 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 7, max: 9 }, target: 'enemy' }
    ]
}
move.harmattan = {
    id: 'harmattan',
    name: 'Harmattan',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 31, max: 35 }, target: 'enemy' }
    ]
}

// -------- Bribe de Pandawa ---------------
move.picole = {
    id: 'picole',
    name: 'Picole',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.consolation = {
    id: 'consolation',
    name: 'Consolation',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'heal%maxHp', value: 5, target: 'self' },
    ]
}
move.brassage = {
    id: 'brassage',
    name: 'Brassage',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.fermentation = {
    id: 'fermentation',
    name: 'Fermentation',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' },
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}
move.pandjiu = {
    id: 'pandjiu',
    name: 'Pandjiu',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 28, max: 32 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.ribote = {
    id: 'ribote',
    name: 'Ribote',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 17, max: 19 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 17, max: 19 }, target: 'enemy' }
    ]
}
move.pandanlku = {
    id: 'pandanlku',
    name: 'Pandanlku',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Bribe d'Huppermage ---------------
move.lances_telluriques = {
    id: 'lances_telluriques',
    name: 'Lances Telluriques',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 9, max: 11 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 9, max: 11 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}
move.cataracte = {
    id: 'cataracte',
    name: 'Cataracte',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 11, max: 13 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 11, max: 13 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}
move.onde_celeste = {
    id: 'onde_celeste',
    name: 'Onde Céleste',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 9, max: 11 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 9, max: 11 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}
move.tison = {
    id: 'tison',
    name: 'Tison',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 10, max: 12 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 10, max: 12 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}
move.drain_elementaire = {
    id: 'drain_elementaire',
    name: 'Drain Élémentaire',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 10, max: 12 }, target: 'enemy' },
              { type: 'buff', stat: 'atk', value: 60, duration: 1, target: 'self' },
              { type: 'debuff', stat: 'atk', value: 30, duration: 2, target: 'enemy' }
    ]
}
move.orage = {
    id: 'orage',
    name: 'Orage',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 24, max: 27 }, target: 'enemy' }
    ]
}
move.rafale = {
    id: 'rafale',
    name: 'Rafale',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 21, max: 24 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.trait_ardent = {
    id: 'trait_ardent',
    name: 'Trait Ardent',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 21, max: 23 }, target: 'enemy' }
    ]
}
move.volcan = {
    id: 'volcan',
    name: 'Volcan',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 17, max: 19 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.traversee = {
    id: 'traversee',
    name: 'Traversée',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
                { type: 'best_element_damage', damage: { min: 10, max: 12 }, target: 'enemy' },

    ]
}
move.torrent_arcanique = {
    id: 'torrent_arcanique',
    name: 'Torrent Arcanique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 4, max: 4 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 4, max: 4 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 4, max: 4 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 4, max: 4 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 4, target: 'self' },
    ]
}
move.bouclier_elementaire = {
    id: 'bouclier_elementaire',
    name: 'Bouclier Élémentaire',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'res.neutre', value: 4, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'res.terre', value: 4, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'res.feu', value: 4, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'res.eau', value: 4, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'res.air', value: 4, duration: 3, target: 'enemy' }
    ]
}

// -------- Bribe d'Ouginak ---------------
move.gibier = {
    id: 'gibier',
    name: 'Gibier',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.charogne = {
    id: 'charogne',
    name: 'Charogne',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 10, duration: 3, target: 'self' },
        { type: 'damage', element: 'air', damage: { min: 18, max: 20 }, target: 'enemy' }
    ]
}
move.depecage = {
    id: 'depecage',
    name: 'Dépeçage',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 50, target: 'self' },
        { type: 'damage', element: 'air', damage: { min: 34, max: 38 }, target: 'enemy' }
    ]
}
move.carcasse = {
    id: 'carcasse',
    name: 'Carcasse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 5, max: 7 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 4, target: 'self' },
    ]
}
move.depouille = {
    id: 'depouille',
    name: 'Dépouille',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 4, target: 'self' },
        { type: 'damage', element: 'air', damage: { min: 35, max: 39 }, target: 'enemy' }
    ]
}
move.limier = {
    id: 'limier',
    name: 'Limier',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 23, max: 25 }, target: 'enemy' }
    ]
}
move.apaisement = {
    id: 'apaisement',
    name: 'Apaisement',
    cooldownMs: 2000,
    effects: [
        { type: 'heal%maxHp', value: 11, target: 'self' },
    ]
}
move.arcanin = {
    id: 'arcanin',
    name: 'Arcanin',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}

// -------- Bribe de Sadida ---------------
move.ronce = {
    id: 'ronce',
    name: 'Ronce',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 14, max: 16 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 14, max: 16 }, target: 'enemy' }
    ]
}
move.ronces_agressives = {
    id: 'ronces_agressives',
    name: 'Ronces Agressives',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 24, max: 27 }, target: 'enemy' }
    ]
}
move.foret_hantee = {
    id: 'foret_hantee',
    name: 'Forêt Hantée',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 29, max: 32 }, target: 'enemy' }
    ]
}
move.seve_paralysante = {
    id: 'seve_paralysante',
    name: 'Sève Paralysante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 9, max: 11 }, target: 'enemy' }
    ]
}
move.tremblement = {
    id: 'tremblement',
    name: 'Tremblement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 23, max: 27 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.vent_empoisonne = {
    id: 'vent_empoisonne',
    name: 'Vent Empoisonné',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 11, max: 13 }, target: 'enemy' }
    ]
}

// -------- Bribe d'Eliotrope ---------------
move.mepris = {
    id: 'mepris',
    name: 'Mépris',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 19, max: 22 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.sinecure = {
    id: 'sinecure',
    name: 'Sinécure',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 9, max: 11 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'heal', heal: 9, target: 'self' }
    ]
}
move.brimade = {
    id: 'brimade',
    name: 'Brimade',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 14, max: 16 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.raillerie = {
    id: 'raillerie',
    name: 'Raillerie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 26, max: 29 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.sermon = {
    id: 'sermon',
    name: 'Sermon',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 38, max: 42 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.cicatrisation = {
    id: 'cicatrisation',
    name: 'Cicatrisation',
    cooldownMs: 2000,
    effects: [
        { type: 'heal%maxHp', value: 6, target: 'self' },
    ]
}
move.distribution = {
    id: 'distribution',
    name: 'Distribution',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 15, target: 'self' }
    ]
}

// -------- Bribe de Xélor ---------------
move.poussiere = {
    id: 'poussiere',
    name: 'Poussière',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 23, max: 26 }, target: 'enemy' }
    ]
}
move.frappe_de_xelor = {
    id: 'frappe_de_xelor',
    name: 'Frappe de Xélor',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 13, max: 15 }, target: 'enemy' }
    ]
}
move.horloge = {
    id: 'horloge',
    name: 'Horloge',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 4, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 14, max: 16 }, target: 'enemy' }
    ]
}
move.astrolabe = {
    id: 'astrolabe',
    name: 'Astrolabe',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'avance', target: 'enemy' }
    ]
}
move.rouage = {
    id: 'rouage',
    name: 'Rouage',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 16, max: 18 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.glas = {
    id: 'glas',
    name: 'Glas',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 6, max: 6 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 6, max: 6 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 6, max: 6 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 6, max: 6 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 4, target: 'self' },
    ]
}
move.refraction = {
    id: 'refraction',
    name: 'Réfraction',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 10, max: 12 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 10, max: 12 }, target: 'enemy' }
    ]
}
move.sablier_de_xelor = {
    id: 'sablier_de_xelor',
    name: 'Sablier de Xélor',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 10, max: 12 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 23, max: 25 }, target: 'enemy' }
    ]
}

// -------- Wabbit Gm ---------------
move.rafale_de_terre = {
    id: 'rafale_de_terre',
    name: 'Rafale de terre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 11, max: 15 }, target: 'enemy' }
    ]
}
move.cawotte_gm = {
    id: 'cawotte_gm',
    name: 'Cawotte GM',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: ['cawottes'], duration: 3, target: 'enemy' }
    ]
}

// -------- Koalak Indigo ---------------
move.invocation_de_blop_indigo = {
    id: 'invocation_de_blop_indigo',
    name: 'Invocation de Blop Indigo',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: ['blop_indigo_invoque'], duration: 3, target: 'enemy' }
    ]
}
move.defaillance_indigo = {
    id: 'defaillance_indigo',
    name: 'Défaillance Indigo',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 31, max: 40 }, target: 'enemy' }
    ]
}

// -------- Koalak Coco ---------------
move.invocation_de_blop_coco = {
    id: 'invocation_de_blop_coco',
    name: 'Invocation de Blop Coco',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: ['blop_coco_invoque'], duration: 3, target: 'enemy' }
    ]
}
move.defaillance_coco = {
    id: 'defaillance_coco',
    name: 'Défaillance Coco',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}

// -------- Koalak Griotte ---------------
move.invocation_de_blop_griotte = {
    id: 'invocation_de_blop_griotte',
    name: 'Invocation de Blop Griotte',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: ['blop_griotte_invoque'], duration: 3, target: 'enemy' }
    ]
}
move.defaillance_griotte = {
    id: 'defaillance_griotte',
    name: 'Défaillance Griotte',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'antiHeal', duration: 3, target: 'enemy' }
    ]
}

// -------- Koalak Reinette ---------------
move.invocation_de_blop_reinette = {
    id: 'invocation_de_blop_reinette',
    name: 'Invocation de Blop Reinette',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: ['blop_reinette_invoque'], duration: 3, target: 'enemy' }
    ]
}
move.defaillance_reinette = {
    id: 'defaillance_reinette',
    name: 'Défaillance Reinette',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 41, duration: 3, target: 'enemy' }
    ]
}

// -------- Golem ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Bouftou des cavernes ---------------
move.morsure_du_bouftou_des_cavernes = {
    id: 'morsure_du_bouftou_des_cavernes',
    name: 'Morsure du Bouftou des Cavernes',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 36, max: 45 }, target: 'enemy' }
    ]
}
move.bavouille_des_cavernes = {
    id: 'bavouille_des_cavernes',
    name: 'Bavouille des Cavernes',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.crachouille_des_cavernes = {
    id: 'crachouille_des_cavernes',
    name: 'Crachouille des Cavernes',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Boomba ---------------
move.bombe_pirate = {
    id: 'bombe_pirate',
    name: 'Bombe Pirate',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 36, max: 40 }, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 15, duration: 3, target: 'self' }
    ]
}
move.feu_d_artifesse = {
    id: 'feu_d_artifesse',
    name: 'Feu d\'Artifesse',
    cooldownMs: 2000,
    effects: [
        { type: 'esquive', chancePct: 40, reductionPct: 100, duration: 3, target: 'self' },
        { type: 'buff', stat: 'critChance', value: 30, duration: 3, target: 'self' }
    ]
}

// -------- Nakunbra ---------------
move.sus_a_l_ennemi = {
    id: 'sus_a_l_ennemi',
    name: 'Sus à l\'ennemi !',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}
move.tranchage_mortel = {
    id: 'tranchage_mortel',
    name: 'Tranchage Mortel',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 36, max: 40 }, target: 'enemy' }
    ]
}

// -------- Canondorf ---------------
move.canon_tournoyant = {
    id: 'canon_tournoyant',
    name: 'Canon Tournoyant',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 25, duration: 3, target: 'enemy' }
    ]
}
move.gros_boulet_pirate = {
    id: 'gros_boulet_pirate',
    name: 'Gros Boulet Pirate',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 35 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Arapex ---------------
move.estocade = {
    id: 'estocade',
    name: 'Estocade',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 60, max: 60 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'buff', stat: 'critChance', value: 5, duration: 3, target: 'self' }
    ]
}
move.tourbillon_mortel = {
    id: 'tourbillon_mortel',
    name: 'Tourbillon mortel',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 41, max: 45 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Dardalaine ---------------
move.dards_paralysants = {
    id: 'dards_paralysants',
    name: 'Dards paralysants',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 25 }, target: 'enemy' }
    ]
}
move.secretion_acide = {
    id: 'secretion_acide',
    name: 'Sécrétion acide',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 200, duration: 3, target: 'enemy' }
    ]
}

// -------- Néfileuse ---------------
move.toile_paralysante = {
    id: 'toile_paralysante',
    name: 'Toile paralysante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'summon', summonPool: ['toile'], duration: 3, target: 'enemy' }
    ]
}
move.fil_collant = {
    id: 'fil_collant',
    name: 'Fil collant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 31, max: 35 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 5, duration: 3, target: 'enemy' }
    ]
}
move.prison_de_soie = {
    id: 'prison_de_soie',
    name: 'Prison de soie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Ricanif ---------------
move.tornade_de_lames = {
    id: 'tornade_de_lames',
    name: 'Tornade de Lames',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.coupe_genoux = {
    id: 'coupe_genoux',
    name: 'Coupe-genoux',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 31, max: 35 }, target: 'enemy' }
    ]
}

// -------- Ivremor ---------------
move.cocktail_rhumotov = {
    id: 'cocktail_rhumotov',
    name: 'Cocktail Rhumotov',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 26, max: 30 }, target: 'enemy' }
    ]
}
move.crachat_de_rhum = {
    id: 'crachat_de_rhum',
    name: 'Crachat de Rhum',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'buffDrain', value: 2, target: 'enemy' }
    ]
}
move.et_une_bouteille_de_rhum = {
    id: 'et_une_bouteille_de_rhum',
    name: 'Et une bouteille de Rhum !',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'intelligence', value: 100, duration: 3, target: 'self' }
    ]
}

// -------- Mégabwork ---------------
move.koup_puissant = {
    id: 'koup_puissant',
    name: 'Koup Puissant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 27, max: 34 }, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.grenabombe = {
    id: 'grenabombe',
    name: 'Grenabombe',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 11, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 11, max: 14 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.megarmure = {
    id: 'megarmure',
    name: 'Mégarmure',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 10, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Médibwork ---------------
move.implant_provizoar = {
    id: 'implant_provizoar',
    name: 'Implant Provizoâr',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 21, target: 'self' },
        { type: 'buff', stat: 'atk', value: 100, duration: 3, target: 'self' },
        { type: 'buff', stat: 'critChance', value: 10, duration: 3, target: 'self' },
        { type: 'buff', stat: 'maxHp', value: 200, duration: 2, target: 'self' },
        { type: 'heal', heal: 20, target: 'self' },
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}
move.chirurgie_approksimativ = {
    id: 'chirurgie_approksimativ',
    name: 'Chirurgie Approksimativ',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 11, target: 'self' },
        { type: 'buff', stat: 'atk', value: 200, duration: 3, target: 'self' },
        { type: 'buff', stat: 'critChance', value: 20, duration: 3, target: 'self' },
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'atk', value: 200, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'critChance', value: 20, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.douleur_atross = {
    id: 'douleur_atross',
    name: 'Douleur Atross',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 11, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 11, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 11, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 11, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 11, max: 20 }, target: 'enemy' }
    ]
}

// -------- Bizarbwork ---------------
move.kass_kabosh = {
    id: 'kass_kabosh',
    name: 'Kass\'Kabosh',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.krounch = {
    id: 'krounch',
    name: 'Krounch',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 11, max: 20 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Krambwork ---------------
move.flan_b = {
    id: 'flan_b',
    name: 'Flan B',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 11, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 11, max: 20 }, target: 'enemy' }
    ]
}
move.kremassion = {
    id: 'kremassion',
    name: 'Krémassion',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 11, max: 20 }, target: 'enemy' }
    ]
}
move.feu_grr_joie = {
    id: 'feu_grr_joie',
    name: 'Feu Grr Joie',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 11, max: 14 }, target: 'enemy' }
    ]
}

// -------- Bozoteur ---------------
move.bang = {
    id: 'bang',
    name: 'Bang',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 4, duration: 2, target: 'enemy' },
        { type: 'buff', stat: 'spd', value: 4, duration: 2, target: 'self' }
    ]
}
move.dans_la_boite = {
    id: 'dans_la_boite',
    name: 'Dans la Boîte',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 13, max: 18 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' }
    ]
}
move.baudruche = {
    id: 'baudruche',
    name: 'Baudruche',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' },
        { type: 'buff', stat: 'atk', value: 100, duration: 3, target: 'self' }
    ]
}

// -------- Tivelo ---------------
move.roule_ma_poule = {
    id: 'roule_ma_poule',
    name: 'Roule ma Poule',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 13, max: 18 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.fusee_explosive = {
    id: 'fusee_explosive',
    name: 'Fusée Explosive',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 25, max: 36 }, target: 'enemy' }
    ]
}

// -------- Pirolienne ---------------
move.chaudasse = {
    id: 'chaudasse',
    name: 'Chaudasse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 24 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.haleine_ardente = {
    id: 'haleine_ardente',
    name: 'Haleine Ardente',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 19, max: 24 }, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 200, duration: 3, target: 'self' }
    ]
}
move.roulette_infernale = {
    id: 'roulette_infernale',
    name: 'Roulette Infernale',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' }
    ]
}

// -------- Roukouto ---------------
move.chapeau_de_roue = {
    id: 'chapeau_de_roue',
    name: 'Chapeau de Roue',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 13, max: 18 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 13, max: 18 }, target: 'enemy' }
    ]
}
move.eriktion = {
    id: 'eriktion',
    name: 'Ériktion',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 16, max: 21 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 16, max: 21 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 200, duration: 3, target: 'enemy' }
    ]
}
move.peintures = {
    id: 'peintures',
    name: 'Peintures',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 100, duration: 3, target: 'self' }
    ]
}
































































































































































// -------- Graboule ---------------
move.balle_piegee = {
    id: 'balle_piegee',
    name: 'Balle Piégée',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 17, max: 24 }, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.poirier = {
    id: 'poirier',
    name: 'Poirier',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.jonglerie = {
    id: 'jonglerie',
    name: 'Jonglerie',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Cadob'Onux ---------------
move.cadeau_puissant = {
    id: 'cadeau_puissant',
    name: 'Cadeau puissant',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 150, duration: 3, target: 'self' }
    ]
}

// -------- Cadob'Omb ---------------

// -------- Cadob'Imbo ---------------
move.cadeau_soignant = {
    id: 'cadeau_soignant',
    name: 'Cadeau soignant',
    cooldownMs: 2000,
    effects: [
        { type: 'heal%maxHp', value: 5, target: 'self' },
    ]
}

// -------- Fantôme d'Aventurier Ardent ---------------
move.crasse_piration = {
    id: 'crasse_piration',
    name: 'Crasse Piration',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Fantôme d'Aventurier Arepo ---------------
move.invocation_de_corbac_fantomatique = {
    id: 'invocation_de_corbac_fantomatique',
    name: 'Invocation de Corbac Fantômatique',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Fantôme d'Aventurier Brave ---------------

// -------- Rat Bougri ---------------
move.ratissage = {
    id: 'ratissage',
    name: 'Ratissage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 16, max: 25 }, target: 'enemy' },
        { type: 'heal', heal: 16, target: 'self' }
    ]
}
move.rabot = {
    id: 'rabot',
    name: 'Rabot',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.racolage = {
    id: 'racolage',
    name: 'Racolage',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'critChance', value: 50, duration: 3, target: 'self' }
    ]
}

// -------- Crabe Hijacob ---------------
move.pincette = {
    id: 'pincette',
    name: 'Pincette',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 26, max: 35 }, target: 'enemy' }
    ]
}
move.sucette = {
    id: 'sucette',
    name: 'Sucette',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 2, duration: 2, target: 'enemy' },
        { type: 'buff', stat: 'spd', value: 2, duration: 2, target: 'self' }
    ]
}
move.briquette = {
    id: 'briquette',
    name: 'Briquette',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'res.air', value: 101, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.eau', value: 101, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.feu', value: 101, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.terre', value: 101, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.neutre', value: 101, duration: 3, target: 'self' }
    ]
}

// -------- Coquille Soigneuse ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Coquille Brutale ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Coquille Véloce ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Coquille Protectrice ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Dragoss Calcaire ---------------
move.dragoss_pelle = {
    id: 'dragoss_pelle',
    name: 'Dragoss Pelle',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.transmission_sismique = {
    id: 'transmission_sismique',
    name: 'Transmission sismique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.offrande_rocailleuse = {
    id: 'offrande_rocailleuse',
    name: 'Offrande Rocailleuse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 11, max: 15 }, target: 'enemy' }
    ]
}

// -------- Chachachovage ---------------
move.canine_putride = {
    id: 'canine_putride',
    name: 'Canine putride',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 16, max: 25 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 6, max: 10 }, target: 'enemy' }
    ]
}
move.mousse_tache = {
    id: 'mousse_tache',
    name: 'Mousse tache',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.coussinet_protecteur = {
    id: 'coussinet_protecteur',
    name: 'Coussinet protecteur',
    cooldownMs: 2000,
    effects: [
        { type: 'renvoi', ratio: 0.5, target: 'self' },
    ]
}

// -------- Gélikan ---------------
move.koudbec = {
    id: 'koudbec',
    name: 'Koudbec',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 26, duration: 3, target: 'self' }
    ]
}
move.convoitise = {
    id: 'convoitise',
    name: 'Convoitise',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}
move.enthousiasme = {
    id: 'enthousiasme',
    name: 'Enthousiasme',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Coffre Sombre ---------------
move.lancer_de_kamas = {
    id: 'lancer_de_kamas',
    name: 'Lancer de Kamas',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 11, max: 12 }, target: 'enemy' }
    ]
}

// -------- Dragodinde de Nowel sauvage ---------------

// -------- Koalak Farouche ---------------
move.sarbakane = {
    id: 'sarbakane',
    name: 'Sarbakane',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'air', value: 41, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'agility', value: 100, duration: 3, target: 'enemy' }
    ]
}
move.soufflette_de_kaliptus = {
    id: 'soufflette_de_kaliptus',
    name: 'Soufflette de Kaliptus',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'critChance', value: 6, duration: 3, target: 'enemy' }
    ]
}
move.invisibilite_farouche = {
    id: 'invisibilite_farouche',
    name: 'Invisibilité Farouche',
    cooldownMs: 2000,
    effects: [
        { type: 'esquive', chancePct: 40, reductionPct: 100, duration: 3, target: 'self' },
        { type: 'buff', stat: 'critChance', value: 10, duration: 3, target: 'self' }
    ]
}
move.invisibilite_farouche_d_autrui = {
    id: 'invisibilite_farouche_d_autrui',
    name: 'Invisibilité Farouche d\'Autrui',
    cooldownMs: 2000,
    effects: [
        { type: 'esquive', chancePct: 40, reductionPct: 100, duration: 3, target: 'self' },
    ]
}

// -------- Mama Koalak ---------------
move.liberation = {
    id: 'liberation',
    name: 'Libération',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
    ]
}
move.accouchement = {
    id: 'accouchement',
    name: 'Accouchement',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.chiquenaude = {
    id: 'chiquenaude',
    name: 'Chiquenaude',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' }
    ]
}

// -------- Piralak ---------------
move.bistouille = {
    id: 'bistouille',
    name: 'Bistouille',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 21, duration: 3, target: 'self' }
    ]
}
move.tourbe_empoisonnee = {
    id: 'tourbe_empoisonnee',
    name: 'Tourbe Empoisonnée',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 26, max: 35 }, target: 'enemy' }
    ]
}
move.bond_du_piralak = {
    id: 'bond_du_piralak',
    name: 'Bond du Piralak',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}

// -------- Bouboule de neige ---------------
move.boule_de_neige = {
    id: 'boule_de_neige',
    name: 'Boule de neige',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 18, max: 22 }, target: 'enemy' }
    ]
}
move.neige_soignante = {
    id: 'neige_soignante',
    name: 'Neige soignante',
    cooldownMs: 2000,
    effects: [
        { type: 'heal%maxHp', value: 10, target: 'self' },
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}
move.roulage_de_neige = {
    id: 'roulage_de_neige',
    name: 'Roulage de neige',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 22, max: 26 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Chauffe-Soutrille ---------------
move.pus_des_pieds = {
    id: 'pus_des_pieds',
    name: 'Pus des Pieds',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 11, max: 15 }, target: 'enemy' }
    ]
}
move.faux_fuyant = {
    id: 'faux_fuyant',
    name: 'Faux-Fuyant',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' }
    ]
}

// -------- Molette ---------------
move.clef_a_pipe = {
    id: 'clef_a_pipe',
    name: 'Clef à pipe',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'intelligence', value: 100, duration: 3, target: 'self' }
    ]
}
move.clef_plate = {
    id: 'clef_plate',
    name: 'Clef plate',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 26, target: 'self' },
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}
move.clef_de_douze = {
    id: 'clef_de_douze',
    name: 'Clef de douze',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 40 }, target: 'enemy' }
    ]
}

// -------- Gobvious ---------------
move.alareskouss = {
    id: 'alareskouss',
    name: 'Alareskouss',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 200, duration: 3, target: 'self' }
    ]
}
move.evidence = {
    id: 'evidence',
    name: 'Évidence',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 26, max: 35 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.kaptene = {
    id: 'kaptene',
    name: 'Kaptène',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Bouledogre ---------------
move.attaque = {
    id: 'attaque',
    name: 'Attaque !',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 31, max: 35 }, target: 'enemy' }
    ]
}
move.morzyloeil = {
    id: 'morzyloeil',
    name: 'Morzyloeil',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.glyphe_rose = {
    id: 'glyphe_rose',
    name: 'Glyphe rose',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Gargantûl ---------------
move.mastication = {
    id: 'mastication',
    name: 'Mastication',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 36, max: 40 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 3, target: 'self' }
    ]
}
move.blindage = {
    id: 'blindage',
    name: 'Blindage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}

// -------- Cactruc ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Minikrone ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Bombombre ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Bombombre à Eau ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Craqueboule Poli ---------------
move.rocaille = {
    id: 'rocaille',
    name: 'Rocaille',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damageHpPct: { source: 'casterMaxHp', pct: 10 }, target: 'enemy' }
    ]
}
move.glotte = {
    id: 'glotte',
    name: 'Glotte',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 200, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'damageReductionPct', value: 50, duration: 3, target: 'enemy' }
    ]
}
move.tourniquet = {
    id: 'tourniquet',
    name: 'Tourniquet',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}

// -------- Dragoss Argile ---------------
move.dragoss_tidkaliss = {
    id: 'dragoss_tidkaliss',
    name: 'Dragoss Tidkaliss',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 26, max: 35 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' }
    ]
}
move.dragoss_imoun = {
    id: 'dragoss_imoun',
    name: 'Dragoss Imoun',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.offrande_aerienne = {
    id: 'offrande_aerienne',
    name: 'Offrande Aérienne',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}

// -------- Dragoss Ardoise ---------------
move.fumerolle = {
    id: 'fumerolle',
    name: 'Fumerolle',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 26, max: 30 }, target: 'enemy' }
    ]
}
move.eauzone = {
    id: 'eauzone',
    name: 'Eauzone',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}
move.offrande_aqueuse = {
    id: 'offrande_aqueuse',
    name: 'Offrande Aqueuse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 16, max: 20 }, target: 'enemy' }
    ]
}

// -------- Mulou ---------------
move.cri_du_mulou = {
    id: 'cri_du_mulou',
    name: 'Cri du Mulou',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}
move.cesarienne = {
    id: 'cesarienne',
    name: 'Césarienne',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}
move.soin_accelere = {
    id: 'soin_accelere',
    name: 'Soin Accéléré',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 17, target: 'self' }
    ]
}

// -------- Trukikol ---------------
move.virevoltage_collant = {
    id: 'virevoltage_collant',
    name: 'Virevoltage collant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 36, max: 40 }, target: 'enemy' }
    ]
}
move.electromagnetisme = {
    id: 'electromagnetisme',
    name: 'Électromagnétisme',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 36, max: 40 }, target: 'enemy' }
    ]
}

// -------- Gloutovore ---------------
move.gobage = {
    id: 'gobage',
    name: 'Gobage',
    cooldownMs: 2000,
    effects: [
        { type: 'heal%maxHp', value: 100, target: 'self' },
    ]
}

// -------- Fourbasse ---------------
move.tir_embusque = {
    id: 'tir_embusque',
    name: 'Tir Embusqué',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 76, max: 80 }, target: 'enemy' }
    ]
}
move.l_attaque_du_chasseur = {
    id: 'l_attaque_du_chasseur',
    name: 'L\'Attaque du Chasseur',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Boufcoul ---------------
move.bise_du_boufcoul = {
    id: 'bise_du_boufcoul',
    name: 'Bise du Boufcoul',
    cooldownMs: 2000,
    effects: [
        { type: 'esquive', chancePct: 40, reductionPct: 100, duration: 3, target: 'self' },
        { type: 'buff', stat: 'critChance', value: 10, duration: 3, target: 'self' },
        { type: 'buff', stat: 'agility', value: 200, duration: 3, target: 'self' }
    ]
}
move.morsure_du_boufcoul = {
    id: 'morsure_du_boufcoul',
    name: 'Morsure du Boufcoul',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 21, max: 25 }, target: 'enemy' }
    ]
}

// -------- Drakoalak ---------------
move.coup_de_tete = {
    id: 'coup_de_tete',
    name: 'Coup de Tête',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 6, max: 10 }, target: 'enemy' }
    ]
}
move.echauffement = {
    id: 'echauffement',
    name: 'Échauffement',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 31, duration: 3, target: 'self' }
    ]
}

// -------- Mufafah ---------------
move.rugissement_mufafesque = {
    id: 'rugissement_mufafesque',
    name: 'Rugissement Mufafesque',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 3, target: 'self' }
    ]
}
move.dechirure = {
    id: 'dechirure',
    name: 'Déchirure',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'antiHeal', duration: 3, target: 'enemy' }
    ]
}

// -------- Kido ---------------
move.clapet = {
    id: 'clapet',
    name: 'Clapet',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.cuicui_d_amour = {
    id: 'cuicui_d_amour',
    name: 'Cuicui d\'Amour',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 16, target: 'self' },
        { type: 'heal', heal: 21, target: 'self' }
    ]
}

// -------- Champêtrouille ---------------
move.frappe_a_dingues = {
    id: 'frappe_a_dingues',
    name: 'Frappe à Dingues',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 31, max: 35 }, target: 'enemy' },
        { type: 'debuff', stat: 'critChance', value: 5, duration: 3, target: 'enemy' }
    ]
}
move.dinguerie = {
    id: 'dinguerie',
    name: 'Dinguerie',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.cueillette = {
    id: 'cueillette',
    name: 'Cueillette',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Lanverne ---------------
move.vermifuge = {
    id: 'vermifuge',
    name: 'Vermifuge',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 100, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'atk', value: 100, duration: 3, target: 'enemy' }
    ]
}
move.subterfuge = {
    id: 'subterfuge',
    name: 'Subterfuge',
    cooldownMs: 2000,
    effects: [
        { type: 'esquive', chancePct: 40, reductionPct: 100, duration: 3, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 25, max: 25 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}

// -------- Rhinoféroce ---------------
move.rhinoderme = {
    id: 'rhinoderme',
    name: 'Rhinoderme',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.rhinopharyngite = {
    id: 'rhinopharyngite',
    name: 'Rhinopharyngite',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 26, max: 35 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.rhinoplastie = {
    id: 'rhinoplastie',
    name: 'Rhinoplastie',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Boursoin ---------------
move.renflouage = {
    id: 'renflouage',
    name: 'Renflouage',
    cooldownMs: 2000,
    effects: [
        { type: 'heal%maxHp', value: 10, target: 'self' },
    ]
}
move.ponderation = {
    id: 'ponderation',
    name: 'Pondération',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'heal%maxHp', value: 7, target: 'self' },
    ]
}

// -------- Mimikado ---------------
move.mimissile = {
    id: 'mimissile',
    name: 'Mimissile',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.pou = {
    id: 'pou',
    name: 'Pou',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 100, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 26, max: 30 }, target: 'enemy' }
    ]
}
move.mimirage = {
    id: 'mimirage',
    name: 'Mimirage',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 3, duration: 2, target: 'enemy' },
        { type: 'buff', stat: 'spd', value: 3, duration: 2, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 31, max: 35 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Trésantène ---------------
move.deferlante = {
    id: 'deferlante',
    name: 'Déferlante',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'force', value: 50, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'force', value: 50, duration: 3, target: 'self' },
        { type: 'damage', element: 'neutre', damage: { min: 31, max: 35 }, target: 'enemy' }
    ]
}
move.decompression = {
    id: 'decompression',
    name: 'Décompression',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 100, duration: 3, target: 'self' }
    ]
}
move.eruption = {
    id: 'eruption',
    name: 'Éruption',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 36, max: 40 }, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' }
    ]
}

// -------- Berserkoffre ---------------
move.saut_de_joie = {
    id: 'saut_de_joie',
    name: 'Saut de Joie',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.langueur = {
    id: 'langueur',
    name: 'Langueur',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.fouetreinte = {
    id: 'fouetreinte',
    name: 'Fouetreinte',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 41, max: 45 }, target: 'enemy' }
    ]
}

// -------- Précieux ---------------
move.morsurprise = {
    id: 'morsurprise',
    name: 'Morsurprise',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 4, target: 'self' },
    ]
}
move.haleine_de_coffre = {
    id: 'haleine_de_coffre',
    name: 'Haleine de Coffre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 41, max: 45 }, target: 'enemy' }
    ]
}
move.bondulations = {
    id: 'bondulations',
    name: 'Bondulations',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Dostrogo ---------------
move.coup_de_bec_dominant = {
    id: 'coup_de_bec_dominant',
    name: 'Coup de Bec Dominant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.dochirure = {
    id: 'dochirure',
    name: 'Dochirure',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 26, max: 30 }, target: 'enemy' }
    ]
}

// -------- Domoizelle ---------------
move.invocation_de_dodoune = {
    id: 'invocation_de_dodoune',
    name: 'Invocation de Dodoune',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.protection_maternelle = {
    id: 'protection_maternelle',
    name: 'Protection Maternelle',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.poussee_dormone = {
    id: 'poussee_dormone',
    name: 'Poussée Dormone',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Muloubard ---------------
move.riffes = {
    id: 'riffes',
    name: 'Riffes',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.metalour = {
    id: 'metalour',
    name: 'Métalour',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 17, max: 20 }, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}
move.baikeur = {
    id: 'baikeur',
    name: 'Baïkeur',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 0, duration: 3, target: 'self' },
        { type: 'heal', heal: 50, target: 'self' }
    ]
}

// -------- Cocholou ---------------
move.dents_longues = {
    id: 'dents_longues',
    name: 'Dents Longues',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.faim_de_mulou = {
    id: 'faim_de_mulou',
    name: 'Faim de Mulou',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.grand_mechant = {
    id: 'grand_mechant',
    name: 'Grand Méchant',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 138, max: 100 }, currentHpScale: { stat: 'finalDamagePct', ratio: 0.5 }, target: 'enemy' }
    ]
}

// -------- Mulounoké ---------------
move.ruee_bestiale = {
    id: 'ruee_bestiale',
    name: 'Ruée Bestiale',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}
move.esprits_vengeurs = {
    id: 'esprits_vengeurs',
    name: 'Esprits Vengeurs',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'heal', heal: 70, target: 'self' }
    ]
}
move.froid_de_mulou = {
    id: 'froid_de_mulou',
    name: 'Froid de Mulou',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}

// -------- Mergranlou ---------------
move.mergran = {
    id: 'mergran',
    name: 'Mergran',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.peur_du_mulou = {
    id: 'peur_du_mulou',
    name: 'Peur du Mulou',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
    ]
}
move.chaperon = {
    id: 'chaperon',
    name: 'Chaperon',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 21, target: 'self' },
        { type: 'buff', stat: 'atk', value: 200, duration: 3, target: 'self' },
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'damageReductionPct', value: 10, duration: 3, target: 'enemy' }
    ]
}

// -------- Intercepteur ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Zœuf ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Glutin hargneux ---------------

// -------- Craqueleur Poli ---------------
move.polissage = {
    id: 'polissage',
    name: 'Polissage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'critChance', value: 5, duration: 3, target: 'enemy' }
    ]
}
move.je_vous_en_prie = {
    id: 'je_vous_en_prie',
    name: 'Je vous en prie',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' }
    ]
}

// -------- Minoskito ---------------
move.piqure_pesante = {
    id: 'piqure_pesante',
    name: 'Piqûre Pesante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.pheromones_de_jouvence = {
    id: 'pheromones_de_jouvence',
    name: 'Phéromones de Jouvence',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
    ]
}

// -------- Bonhomme de neige ---------------
move.poussee_d_egul = {
    id: 'poussee_d_egul',
    name: 'Poussée d\'Egul',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 24, max: 28 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.esprit_de_nowel = {
    id: 'esprit_de_nowel',
    name: 'Esprit de Nowel',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.tire_fesse = {
    id: 'tire_fesse',
    name: 'Tire-fesse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 18, max: 22 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Bitouf des Plaines ---------------
move.vrut_vrut = {
    id: 'vrut_vrut',
    name: 'Vrüt vrüt',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 10, max: 10 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' },
        { type: 'antiHeal', duration: 3, target: 'enemy' }
    ]
}
move.plumeau_cecitant = {
    id: 'plumeau_cecitant',
    name: 'Plumeau Cécitant',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 11, max: 15 }, target: 'enemy' }
    ]
}

// -------- Kilibriss ---------------
move.brisskote = {
    id: 'brisskote',
    name: 'Brisskote',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 41, max: 60 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.briss_deuniss = {
    id: 'briss_deuniss',
    name: 'Briss Deuniss',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}
move.brissolette = {
    id: 'brissolette',
    name: 'Brissolette',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 26, max: 35 }, target: 'enemy' }
    ]
}

// -------- Tofubine ---------------
move.graine_toxique = {
    id: 'graine_toxique',
    name: 'Graine Toxique',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Bulbiflore ---------------
move.bulbation = {
    id: 'bulbation',
    name: 'Bulbation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 11, max: 13 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 11, max: 13 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 11, max: 13 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 11, max: 13 }, target: 'enemy' },
        { type: 'buff', stat: 'critChance', value: 5, duration: 3, target: 'self' }
    ]
}
move.frappe_vivace = {
    id: 'frappe_vivace',
    name: 'Frappe Vivace',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 15, max: 17 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 15, max: 17 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 15, max: 17 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 15, max: 17 }, target: 'enemy' }
    ]
}
move.pollinisation = {
    id: 'pollinisation',
    name: 'Pollinisation',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 11, max: 13 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 11, max: 13 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 11, max: 13 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 11, max: 13 }, target: 'enemy' }
    ]
}

// -------- Aloevée Rate ---------------
move.soignerat = {
    id: 'soignerat',
    name: 'Soignerat',
    cooldownMs: 2000,
    effects: [
        { type: 'heal%maxHp', value: 20, target: 'self' },
    ]
}
move.drainerat = {
    id: 'drainerat',
    name: 'Drainerat',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 19, max: 22 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.pousserat = {
    id: 'pousserat',
    name: 'Pousserat',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 31, max: 35 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Feu ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Krokille Mature Insipide ---------------
move.frenesie_elementale = {
    id: 'frenesie_elementale',
    name: 'Frénésie Élémentale',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 50, duration: 3, target: 'self' },
        { type: 'shield', value: 200, duration: 3, target: 'self' },
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}

// -------- Krokille Mature Boueuse ---------------
move.eclosion = {
    id: 'eclosion',
    name: 'Éclosion',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'maxHp', value: 500, duration: 3, target: 'self' }
    ]
}

// -------- Krokille Mature Incandescente ---------------
move.recalcification = {
    id: 'recalcification',
    name: 'Recalcification',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 21, target: 'self' }
    ]
}

// -------- Krokille Mature Humide ---------------
move.hydrophobie = {
    id: 'hydrophobie',
    name: 'Hydrophobie',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Krokille Mature Sèche ---------------
move.il_du_cyclone = {
    id: 'il_du_cyclone',
    name: 'Œil du Cyclone',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Corbac ---------------
move.cri_destabilisateur = {
    id: 'cri_destabilisateur',
    name: 'Cri Déstabilisateur',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 17, max: 20 }, target: 'enemy' },
        { type: 'buffDrain', value: 2, target: 'enemy' },
    ]
}
move.lancer_d_uf = {
    id: 'lancer_d_uf',
    name: 'Lancer d\'œuf',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 26 }, target: 'enemy' }
    ]
}
move.dilaceration = {
    id: 'dilaceration',
    name: 'Dilacération',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 40 }, target: 'enemy' }
    ]
}

// -------- Guerrier Koalak ---------------
move.boutade = {
    id: 'boutade',
    name: 'Boutade',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.assommoir = {
    id: 'assommoir',
    name: 'Assommoir',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 21, max: 35 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.rage_du_guerrier = {
    id: 'rage_du_guerrier',
    name: 'Rage du Guerrier',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 31, duration: 3, target: 'self' }
    ]
}

// -------- Kanigrou hivernal ---------------
move.griffe_du_kanigrou_hivernal = {
    id: 'griffe_du_kanigrou_hivernal',
    name: 'Griffe du kanigrou hivernal',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 18, max: 22 }, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}
move.chute_majestueuse = {
    id: 'chute_majestueuse',
    name: 'Chute majestueuse',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 34, max: 38 }, target: 'enemy' }
    ]
}

// -------- Croc gland de Nowel ---------------
move.aboiement = {
    id: 'aboiement',
    name: 'Aboiement',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Zœuf perturbé ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Fossoyeur Koalak ---------------
move.enterrement = {
    id: 'enterrement',
    name: 'Enterrement',
    cooldownMs: 2000,
    effects: [
        { type: 'esquive', chancePct: 40, reductionPct: 100, duration: 3, target: 'self' },
    ]
}
move.motte_de_terre = {
    id: 'motte_de_terre',
    name: 'Motte de terre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 45 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 21, duration: 3, target: 'enemy' }
    ]
}

// -------- Buveur ---------------
move.daudoh = {
    id: 'daudoh',
    name: 'Daudoh',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'heal', heal: 21, target: 'self' }
    ]
}
move.buvette = {
    id: 'buvette',
    name: 'Buvette',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 75, duration: 3, target: 'self' }
    ]
}
move.parchotage = {
    id: 'parchotage',
    name: 'Parchotage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Buveur de Sang ---------------

// -------- Renarbo ---------------
move.croassement = {
    id: 'croassement',
    name: 'Croassement',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'res.air', value: 100, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'res.eau', value: 100, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'res.feu', value: 100, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'res.terre', value: 100, duration: 3, target: 'enemy' }
    ]
}
move.ramage = {
    id: 'ramage',
    name: 'Ramage',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.deplumage = {
    id: 'deplumage',
    name: 'Déplumage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' }
    ]
}

// -------- Renarbo Parleur ---------------

// -------- Mandrine ---------------
move.empoisonnement_affaiblissant = {
    id: 'empoisonnement_affaiblissant',
    name: 'Empoisonnement Affaiblissant',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'feu', value: 31, duration: 3, target: 'enemy' }
    ]
}
move.empoisonnement_poisseux = {
    id: 'empoisonnement_poisseux',
    name: 'Empoisonnement Poisseux',
    cooldownMs: 2000,
    effects: [
        // TODO: Minimise les effets aléatoires de la cible
    ]
}
move.empoisonnement_mouvemente = {
    id: 'empoisonnement_mouvemente',
    name: 'Empoisonnement Mouvementé',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 20, max: 20 }, currentHpScale: { stat: 'finalDamagePct', ratio: 0.5 }, target: 'enemy' }
    ]
}

// -------- Tofutoflamme ---------------
move.beco_ardent = {
    id: 'beco_ardent',
    name: 'Béco Ardent',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 11, max: 20 }, target: 'enemy' },
        { type: 'dot', element: 'feu', value: 25, duration: 3, target: 'enemy' }
    ]
}

// -------- Pupuce ---------------
move.pupunition = {
    id: 'pupunition',
    name: 'Pupunition',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 45, max: 49 }, target: 'enemy' }
    ]
}
move.pupussuccion = {
    id: 'pupussuccion',
    name: 'Pupussuccion',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 35, max: 39 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Morcac ---------------
move.roupetkifouette = {
    id: 'roupetkifouette',
    name: 'Roupetkifouette',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 27, max: 31 }, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 15, duration: 3, target: 'self' }
    ]
}

// -------- Pikbul ---------------
move.infestation = {
    id: 'infestation',
    name: 'Infestation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 35, max: 39 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.dejection_empoisonnee = {
    id: 'dejection_empoisonnee',
    name: 'Déjection Empoisonnée',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Gériatique ---------------
move.nuee_de_tiques = {
    id: 'nuee_de_tiques',
    name: 'Nuée de Tiques',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 47, max: 51 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 2, duration: 2, target: 'enemy' },
        { type: 'buff', stat: 'spd', value: 2, duration: 2, target: 'self' }
    ]
}
move.ponction_revitalisante = {
    id: 'ponction_revitalisante',
    name: 'Ponction Revitalisante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 32, max: 41 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 32, max: 41 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Grath ---------------
move.saut_de_puce = {
    id: 'saut_de_puce',
    name: 'Saut de Puce',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.demangeaisons = {
    id: 'demangeaisons',
    name: 'Démangeaisons',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 40, max: 44 }, target: 'enemy' },
        { type: 'debuff', stat: 'finalDamagePct', value: 50, duration: 3, target: 'enemy' }
    ]
}
move.secouage = {
    id: 'secouage',
    name: 'Secouage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 54, max: 58 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Bambouto ---------------
move.bambouffe = {
    id: 'bambouffe',
    name: 'Bambouffe',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 26, max: 30 }, target: 'enemy' }
    ]
}
move.photosynthese = {
    id: 'photosynthese',
    name: 'Photosynthèse',
    cooldownMs: 2000,
    effects: [
        { type: 'heal%maxHp', value: 10, target: 'self' },
    ]
}
move.presse_tige = {
    id: 'presse_tige',
    name: 'Presse Tige',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Rate Atinée ---------------
move.rapiat = {
    id: 'rapiat',
    name: 'Rapiat',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'heal', heal: 21, target: 'self' }
    ]
}
move.radotage = {
    id: 'radotage',
    name: 'Radotage',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Chika Rat ---------------
move.embrocherat = {
    id: 'embrocherat',
    name: 'Embrocherat',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 30, max: 34 }, target: 'enemy' }
    ]
}
move.lancerat = {
    id: 'lancerat',
    name: 'Lancerat',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 18, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 9, max: 11 }, target: 'enemy' }
    ]
}
move.aurat = {
    id: 'aurat',
    name: 'Aurat',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'damageReductionPct', value: 10, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'damageReductionPct', value: 10, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'finalDamagePct', value: 10, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'finalDamagePct', value: 10, duration: 3, target: 'enemy' }
    ]
}

// -------- Dragoss Charbon ---------------
move.combustion = {
    id: 'combustion',
    name: 'Combustion',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 40 }, target: 'enemy' }
    ]
}
move.offrande_ardente = {
    id: 'offrande_ardente',
    name: 'Offrande Ardente',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 36, max: 45 }, target: 'enemy' }
    ]
}

// -------- Tofuzmo ---------------
move.coup_de_bec_magistral = {
    id: 'coup_de_bec_magistral',
    name: 'Coup de Bec Magistral',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 11, max: 20 }, target: 'enemy' }
    ]
}
move.plumeau_aveuglant = {
    id: 'plumeau_aveuglant',
    name: 'Plumeau Aveuglant',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}

// -------- Chak Rat ---------------
move.preciserat = {
    id: 'preciserat',
    name: 'Préciserat',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'critChance', value: 15, duration: 3, target: 'self' }
    ]
}
move.affinerat = {
    id: 'affinerat',
    name: 'Affinerat',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 39, max: 45 }, target: 'enemy' }
    ]
}
move.assoifferat = {
    id: 'assoifferat',
    name: 'Assoifferat',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 9, max: 11 }, target: 'enemy' }
    ]
}

// -------- Vilain Petit Tofu ---------------
move.vilain_beco = {
    id: 'vilain_beco',
    name: 'Vilain Béco',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'agility', value: 10, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'agility', value: 10, duration: 3, target: 'self' }
    ]
}

// -------- Bulbuisson ---------------
move.nectarissement = {
    id: 'nectarissement',
    name: 'Nectarissement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 16, max: 18 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 16, max: 18 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 16, max: 18 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 16, max: 18 }, target: 'enemy' }
    ]
}
move.yuccanon = {
    id: 'yuccanon',
    name: 'Yuccanon',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 17, max: 20 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 17, max: 20 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 17, max: 20 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 17, max: 20 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Malterego de Malzerb ---------------

// -------- Rat Plapla ---------------
move.raclage = {
    id: 'raclage',
    name: 'Raclage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 32, max: 38 }, target: 'enemy' }
    ]
}
move.radioactivite = {
    id: 'radioactivite',
    name: 'Radioactivité',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 19, max: 22 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 19, max: 22 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.radar = {
    id: 'radar',
    name: 'Radar',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'damageReductionPct', value: 5, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'finalDamagePct', value: 10, duration: 3, target: 'self' }
    ]
}

// -------- Maître Koalak ---------------
move.frappe_du_maitre = {
    id: 'frappe_du_maitre',
    name: 'Frappe du Maître',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 101, max: 120 }, target: 'enemy' }
    ]
}
move.reconciliation = {
    id: 'reconciliation',
    name: 'Réconciliation',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 51, target: 'self' },
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}
move.transposition_du_maitre = {
    id: 'transposition_du_maitre',
    name: 'Transposition du Maître',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}

// -------- Koalak Sanguin ---------------
move.sang_chaud = {
    id: 'sang_chaud',
    name: 'Sang Chaud',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}
move.punition_sanguine = {
    id: 'punition_sanguine',
    name: 'Punition Sanguine',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damageHpPct: { source: 'casterMaxHp', pct: 10 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.transfert_de_vie_sanguin = {
    id: 'transfert_de_vie_sanguin',
    name: 'Transfert de Vie Sanguin',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 10, target: 'self' }
    ]
}
move.chatiment_sanguin = {
    id: 'chatiment_sanguin',
    name: 'Châtiment Sanguin',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 126, max: 140 }, currentHpScale: { stat: 'finalDamagePct', ratio: 0.5 }, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 5, duration: 3, target: 'self' }
    ]
}

// -------- Dragoss Protéiforme ---------------
move.hyoide = {
    id: 'hyoide',
    name: 'Hyoïde',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 20, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.2, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 36, max: 45 }, target: 'enemy' }
    ]
}
move.engouement = {
    id: 'engouement',
    name: 'Engouement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'buff', stat: 'force', value: 50, duration: 3, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'buff', stat: 'intelligence', value: 50, duration: 3, target: 'self' },
        { type: 'damage', element: 'air', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'buff', stat: 'agility', value: 50, duration: 3, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'buff', stat: 'chance', value: 50, duration: 3, target: 'self' },
        { type: 'damage', element: 'neutre', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 100, duration: 3, target: 'self' },
        { type: 'lifesteal', ratio: 0.2, target: 'self' }
    ]
}

// -------- Malterego de Malépik ---------------
move.malternatif = {
    id: 'malternatif',
    name: 'Malternatif',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'critChance', value: 30, duration: 3, target: 'self' },
        { type: 'buff', stat: 'critDamagePct', value: 40, duration: 3, target: 'self' }
    ]
}
move.maluminium = {
    id: 'maluminium',
    name: 'Maluminium',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 1, max: 1 }, target: 'enemy' }
    ]
}

// -------- Momie Koalak ---------------
move.malediction_de_la_momie = {
    id: 'malediction_de_la_momie',
    name: 'Malédiction de la Momie',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'feu', value: 16, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'force', value: 51, duration: 3, target: 'enemy' }
    ]
}
move.clepsydre = {
    id: 'clepsydre',
    name: 'Clepsydre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' }
    ]
}
move.bandelette_ancestrale = {
    id: 'bandelette_ancestrale',
    name: 'Bandelette Ancestrale',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 20, duration: 2, target: 'self' },
        { type: 'renvoi', ratio: 0.5, target: 'self' }
    ]
}

// -------- Fauchalak ---------------
move.malediction_koalak = {
    id: 'malediction_koalak',
    name: 'Malédiction Koalak',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'agility', value: 400, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'intelligence', value: 400, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'chance', value: 400, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'force', value: 400, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'critChance', value: 50, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'flatDamage', value: 200, duration: 3, target: 'enemy' },
        { type: 'antiHeal', duration: 3, target: 'enemy' }
    ]
}
move.fauche = {
    id: 'fauche',
    name: 'Fauche',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.renfort_du_cimetiere_primitif = {
    id: 'renfort_du_cimetiere_primitif',
    name: 'Renfort du Cimetière Primitif',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Miasme Polarisateur ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Crystal de Stasili ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Floristile ---------------
move.nez_bulleux = {
    id: 'nez_bulleux',
    name: 'Nez Bulleux',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 26, max: 30 }, target: 'enemy' }
    ]
}
move.pistirage = {
    id: 'pistirage',
    name: 'Pistirage',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 16, max: 20 }, target: 'enemy' }
    ]
}
move.petaclier = {
    id: 'petaclier',
    name: 'Pétaclier',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}

// -------- Bourgeon ---------------
move.germe = {
    id: 'germe',
    name: 'Germe',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 21, max: 25 }, target: 'enemy' }
    ]
}

// -------- Rat Li ---------------
move.rapport = {
    id: 'rapport',
    name: 'Rapport',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.rappel_a_l_ordre = {
    id: 'rappel_a_l_ordre',
    name: 'Rappel à l\'ordre',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}
move.rapia = {
    id: 'rapia',
    name: 'Rapia',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 20, max: 24 }, target: 'enemy' }
    ]
}

// -------- Wabbit Vampire ---------------
move.genewosite_cawottique = {
    id: 'genewosite_cawottique',
    name: 'Généwosité Cawottique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'heal%maxHp', value: 10, target: 'self' },
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' }
    ]
}
move.theowie_de_la_cawotte = {
    id: 'theowie_de_la_cawotte',
    name: 'Théowie de la Cawotte',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 50, max: 50 }, erodedHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' },
        { type: 'heal%maxHp', value: 10, target: 'self' },
    ]
}

// -------- Wabbit Fluo ---------------
move.empwise = {
    id: 'empwise',
    name: 'Empwise',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 26, max: 35 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.aveuglement_luminescent = {
    id: 'aveuglement_luminescent',
    name: 'Aveuglement Luminescent',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'debuff', stat: 'flatDamage', value: 40, duration: 3, target: 'enemy' }
    ]
}
move.dispawition_wetawdee = {
    id: 'dispawition_wetawdee',
    name: 'Dispawition Wetawdée',
    cooldownMs: 2000,
    effects: [
        { type: 'esquive', chancePct: 40, reductionPct: 100, duration: 3, target: 'self' },
    ]
}

// -------- Wabbit Céphale ---------------
move.ecwasement = {
    id: 'ecwasement',
    name: 'Écwasement',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 30, duration: 3, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 51, max: 60 }, target: 'enemy' }
    ]
}
move.tewatif = {
    id: 'tewatif',
    name: 'Téwatif',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 25, max: 25 }, erodedHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}

// -------- Wabbit Garou ---------------
move.suwpwise = {
    id: 'suwpwise',
    name: 'Suwpwise',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}
move.ecawtelement = {
    id: 'ecawtelement',
    name: 'Écawtèlement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Troollaraj ---------------
move.vindication_troollesque = {
    id: 'vindication_troollesque',
    name: 'Vindication Troollesque',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}
move.absorption_troollesque = {
    id: 'absorption_troollesque',
    name: 'Absorption Troollesque',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 100, target: 'self' }
    ]
}
move.ecrasement_troollesque = {
    id: 'ecrasement_troollesque',
    name: 'Écrasement Troollesque',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}

// -------- Rono le Renarbo ---------------

// -------- Kapotie le Buveur ---------------

// -------- Scaratos ---------------
move.defonce = {
    id: 'defonce',
    name: 'Défonce',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 25 }, target: 'enemy' }
    ]
}
move.cuticule = {
    id: 'cuticule',
    name: 'Cuticule',
    cooldownMs: 2000,
    effects: [
        { type: 'renvoi', ratio: 0.5, target: 'self' },
        { type: 'buff', stat: 'res.air', value: 21, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.eau', value: 21, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.feu', value: 21, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.terre', value: 21, duration: 3, target: 'self' }
    ]
}
move.recueillement = {
    id: 'recueillement',
    name: 'Recueillement',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' },
        { type: 'heal', heal: 41, target: 'self' }
    ]
}
move.scaracornos = {
    id: 'scaracornos',
    name: 'Scaracornos',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Kraméléhon ---------------
move.disparition = {
    id: 'disparition',
    name: 'Disparition',
    cooldownMs: 2000,
    effects: [
        { type: 'esquive', chancePct: 40, reductionPct: 100, duration: 3, target: 'self' },
    ]
}
move.coup_de_langue = {
    id: 'coup_de_langue',
    name: 'Coup de Langue',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 26, max: 30 }, target: 'enemy' }
    ]
}

// -------- Dragueuse ---------------
move.drague = {
    id: 'drague',
    name: 'Drague',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.coup_de_foudre = {
    id: 'coup_de_foudre',
    name: 'Coup de foudre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.tohu_bohu = {
    id: 'tohu_bohu',
    name: 'Tohu-bohu',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Draguaindrop ---------------
move.coupedaikalle = {
    id: 'coupedaikalle',
    name: 'Coupédaikallé',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 31, max: 40 }, target: 'enemy' }
    ]
}
move.souap = {
    id: 'souap',
    name: 'Souap',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.shinouque = {
    id: 'shinouque',
    name: 'Shinouque',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 24, max: 33 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}

// -------- Scélée Rate ---------------
move.affaiblirat = {
    id: 'affaiblirat',
    name: 'Affaiblirat',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'damageReductionPct', value: 10, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'critChance', value: 10, duration: 3, target: 'enemy' }
    ]
}
move.collapserat = {
    id: 'collapserat',
    name: 'Collapserat',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 24, max: 28 }, target: 'enemy' }
    ]
}
move.freinerat = {
    id: 'freinerat',
    name: 'Freinerat',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'buffDrain', value: 2, target: 'enemy' }
    ]
}

// -------- Boufmouth ---------------
move.krouth = {
    id: 'krouth',
    name: 'Krouth',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.klougmouth = {
    id: 'klougmouth',
    name: 'Klougmouth',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 26, max: 35 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 2, duration: 2, target: 'enemy' },
        { type: 'buff', stat: 'spd', value: 2, duration: 2, target: 'self' }
    ]
}
move.moumouth = {
    id: 'moumouth',
    name: 'Moumouth',
    cooldownMs: 2000,
    effects: [
        { type: 'renvoi', ratio: 0.5, target: 'self' },
    ]
}

// -------- Boufmouth de guerre ---------------
move.koudblouze = {
    id: 'koudblouze',
    name: 'Koudblouze',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 50, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'res.air', value: 50, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'res.eau', value: 50, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'res.feu', value: 50, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'res.terre', value: 50, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'res.neutre', value: 50, duration: 3, target: 'enemy' }
    ]
}
move.boufbaffe = {
    id: 'boufbaffe',
    name: 'Boufbaffe',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 26, max: 35 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.hubermouth = {
    id: 'hubermouth',
    name: 'Hubermouth',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 51, duration: 3, target: 'self' }
    ]
}

// -------- Boufmouth légendaire ---------------
move.koudkorn = {
    id: 'koudkorn',
    name: 'Koudkorn',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}
move.moutharde = {
    id: 'moutharde',
    name: 'Moutharde',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.moubilite = {
    id: 'moubilite',
    name: 'Moubilité',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Bouftonmouth ---------------
move.moursure = {
    id: 'moursure',
    name: 'Moursure',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'agility', value: 200, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'agility', value: 200, duration: 3, target: 'self' }
    ]
}
move.bizmouth = {
    id: 'bizmouth',
    name: 'Bizmouth',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 51, target: 'self' }
    ]
}

// -------- Cawotman ---------------
move.bond_appetissant = {
    id: 'bond_appetissant',
    name: 'Bond Appétissant',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 31, max: 40 }, target: 'enemy' }
    ]
}
move.goinfwage = {
    id: 'goinfwage',
    name: 'Goinfwage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 36, max: 45 }, target: 'enemy' }
    ]
}

// -------- Dramak ---------------
move.invocation_de_pantin = {
    id: 'invocation_de_pantin',
    name: 'Invocation de Pantin',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.manipulation = {
    id: 'manipulation',
    name: 'Manipulation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 36, max: 45 }, target: 'enemy' }
    ]
}
move.entracte = {
    id: 'entracte',
    name: 'Entracte',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.marionnette = {
    id: 'marionnette',
    name: 'Marionnette',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Truchideur ---------------
move.truchidage = {
    id: 'truchidage',
    name: 'Truchidage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'force', value: 100, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'force', value: 100, duration: 3, target: 'self' }
    ]
}
move.boulette_baveuse = {
    id: 'boulette_baveuse',
    name: 'Boulette baveuse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 31, max: 40 }, target: 'enemy' }
    ]
}
move.truchenrut = {
    id: 'truchenrut',
    name: 'Truchenrut',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}
move.bouffee_de_chaleur = {
    id: 'bouffee_de_chaleur',
    name: 'Bouffée de chaleur',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 40, max: 40 }, currentHpScale: { stat: 'finalDamagePct', ratio: 0.5 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 20, max: 20 }, erodedHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 40, max: 40 }, currentHpScale: { stat: 'finalDamagePct', ratio: 0.5 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 20, max: 20 }, erodedHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}

// -------- Truchtine ---------------
move.degage = {
    id: 'degage',
    name: 'Dégage !',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.vision_trouble = {
    id: 'vision_trouble',
    name: 'Vision trouble',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.rondelle_reparatrice = {
    id: 'rondelle_reparatrice',
    name: 'Rondelle réparatrice',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 51, target: 'self' }
    ]
}
move.myopie = {
    id: 'myopie',
    name: 'Myopie',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}

// -------- Truchon ---------------
move.claque_du_bec = {
    id: 'claque_du_bec',
    name: 'Claque du bec',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.proutoto = {
    id: 'proutoto',
    name: 'Proutoto',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 31, max: 40 }, target: 'enemy' }
    ]
}
move.exhalation_chetive = {
    id: 'exhalation_chetive',
    name: 'Exhalation chétive',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'critChance', value: 10, duration: 3, target: 'self' }
    ]
}
move.survie_de_l_espece = {
    id: 'survie_de_l_espece',
    name: 'Survie de l\'espèce',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'self' },
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}

// -------- Gromorso ---------------
move.transmission_instantanee = {
    id: 'transmission_instantanee',
    name: 'Transmission instantanée',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.echauffement_songeur = {
    id: 'echauffement_songeur',
    name: 'Echauffement songeur',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Farfacette ---------------
move.tornadhesive = {
    id: 'tornadhesive',
    name: 'Tornadhésive',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.cercle_de_lumiere = {
    id: 'cercle_de_lumiere',
    name: 'Cercle de lumière',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.farce_cachee = {
    id: 'farce_cachee',
    name: 'Farce cachée',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 0, duration: 3, target: 'self' }
    ]
}

// -------- Brikablak ---------------
move.attaque_surprise = {
    id: 'attaque_surprise',
    name: 'Attaque surprise',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'heal', heal: 50, target: 'self' }
    ]
}
move.pluixel = {
    id: 'pluixel',
    name: 'Pluixel',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'heal%maxHp', value: 5, target: 'self' },
    ]
}

// -------- Éklatleth ---------------
move.eklatlatete = {
    id: 'eklatlatete',
    name: 'Éklatlatête',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.secoust = {
    id: 'secoust',
    name: 'Secoust',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Segmantid ---------------
move.segmentation = {
    id: 'segmentation',
    name: 'Segmentation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' }
    ]
}
move.feu_use = {
    id: 'feu_use',
    name: 'Feu usé',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 20, max: 20 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}

// -------- Troolligark ---------------
move.controoll = {
    id: 'controoll',
    name: 'Controoll',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 11, max: 14 }, target: 'enemy' }
    ]
}
move.troollage = {
    id: 'troollage',
    name: 'Troollage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Troolléolé ---------------
move.troollahonte = {
    id: 'troollahonte',
    name: 'Troollahonte',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.troollfesse = {
    id: 'troollfesse',
    name: 'Troollfesse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 15, max: 20 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Dragacé ---------------
move.mort_d_illement = {
    id: 'mort_d_illement',
    name: 'Mort d\'illement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 31, max: 45 }, target: 'enemy' }
    ]
}
move.bourrascasse = {
    id: 'bourrascasse',
    name: 'Bourrascasse',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 21, max: 40 }, target: 'enemy' }
    ]
}

// -------- Grenufar ---------------
move.plongeon = {
    id: 'plongeon',
    name: 'Plongeon',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 16, max: 18 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 16, max: 18 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 16, max: 18 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 16, max: 18 }, target: 'enemy' }
    ]
}
move.bactrasoin = {
    id: 'bactrasoin',
    name: 'Bactrasoin',
    cooldownMs: 2000,
    effects: [
        { type: 'heal%maxHp', value: 20, target: 'self' },
    ]
}
move.amphibaffe = {
    id: 'amphibaffe',
    name: 'Amphibaffe',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'debuff', stat: 'agility', value: 50, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'agility', value: 50, duration: 3, target: 'self' }
    ]
}

// -------- Corbac Apprivoisé ---------------
move.plumeau_destabilisant = {
    id: 'plumeau_destabilisant',
    name: 'Plumeau Déstabilisant',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
    ]
}
move.bousculade_plumeuse = {
    id: 'bousculade_plumeuse',
    name: 'Bousculade plumeuse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 13, max: 18 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 13, max: 18 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'avance', target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Corbac Dressé ---------------

// -------- Poupée Affamée ---------------
move.coupe_faim = {
    id: 'coupe_faim',
    name: 'Coupe-faim',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}
move.digestion_explosive = {
    id: 'digestion_explosive',
    name: 'Digestion Explosive',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 101, max: 150 }, target: 'enemy' }
    ]
}
move.saphir_apaisant = {
    id: 'saphir_apaisant',
    name: 'Saphir Apaisant',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 1250, target: 'self' }
    ]
}

// -------- Rat Sio ---------------
move.rayonnage = {
    id: 'rayonnage',
    name: 'Rayonnage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 19, max: 23 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 19, max: 23 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 14, max: 16 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 14, max: 16 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 9, max: 11 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 9, max: 11 }, target: 'enemy' }
    ]
}
move.rapace = {
    id: 'rapace',
    name: 'Rapace',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}

// -------- Warko Violet ---------------

// -------- Malterego de Maltrio ---------------
move.malergie = {
    id: 'malergie',
    name: 'Malergie',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}
move.malezi = {
    id: 'malezi',
    name: 'Malézi',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'spd', value: 20, duration: 3, target: 'self' }
    ]
}

// -------- Malterego de Malbois ---------------
move.malgorithmie = {
    id: 'malgorithmie',
    name: 'Malgorithmie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 13, max: 13 }, target: 'enemy' }
    ]
}
move.malimentation = {
    id: 'malimentation',
    name: 'Malimentation',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'finalDamagePct', value: 30, duration: 3, target: 'self' }
    ]
}

// -------- Mininuit ---------------
move.patinage = {
    id: 'patinage',
    name: 'Patinage',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.marteau_d_okim = {
    id: 'marteau_d_okim',
    name: 'Marteau d\'Okim',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 15, duration: 3, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 20, max: 24 }, target: 'enemy' }
    ]
}
move.marteau_d_orelos = {
    id: 'marteau_d_orelos',
    name: 'Marteau d\'Orelos',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 29, max: 33 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 100, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 100, duration: 3, target: 'self' }
    ]
}

// -------- Gruche ---------------
move.envolee_brutale = {
    id: 'envolee_brutale',
    name: 'Envolée brutale',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}
move.rejet_toxique = {
    id: 'rejet_toxique',
    name: 'Rejet toxique',
    cooldownMs: 2000,
    effects: [
        // TODO: Maximise les effets aléatoires sur la cible
        { type: 'damage', element: 'feu', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}
move.pied_de_gruche = {
    id: 'pied_de_gruche',
    name: 'Pied de Gruche',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'damageReductionPct', value: 100, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Truchmuche ---------------
move.laxatif = {
    id: 'laxatif',
    name: 'Laxatif',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}
move.pourriture_intestinale = {
    id: 'pourriture_intestinale',
    name: 'Pourriture intestinale',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'heal', heal: 50, target: 'self' }
    ]
}
move.indigestion_contagieuse = {
    id: 'indigestion_contagieuse',
    name: 'Indigestion contagieuse',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 30, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.diarrhee_affaiblissante = {
    id: 'diarrhee_affaiblissante',
    name: 'Diarrhée affaiblissante',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'damageReductionPct', value: 100, duration: 3, target: 'enemy' }
    ]
}

// -------- Sarkapwane ---------------
move.crache_eau = {
    id: 'crache_eau',
    name: 'Crache eau',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 30, max: 34 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 30, max: 34 }, target: 'enemy' }
    ]
}
move.kwap = {
    id: 'kwap',
    name: 'Kwap',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 36, max: 42 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 36, max: 42 }, target: 'enemy' }
    ]
}
move.invocation_de_bombombre = {
    id: 'invocation_de_bombombre',
    name: 'Invocation de Bombombre',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Rate Iboisée ---------------
move.raviner = {
    id: 'raviner',
    name: 'Raviner',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 46, max: 54 }, target: 'enemy' }
    ]
}
move.raffinage = {
    id: 'raffinage',
    name: 'Raffinage',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Capoei Rat ---------------
move.confinerat = {
    id: 'confinerat',
    name: 'Confinerat',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}
move.dechiquetterat = {
    id: 'dechiquetterat',
    name: 'Déchiquetterat',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 33, max: 39 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 27, max: 31 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Gamine Zoth ---------------
move.tyrannie = {
    id: 'tyrannie',
    name: 'Tyrannie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 26, max: 35 }, target: 'enemy' },
        { type: 'debuff', stat: 'res.air', value: 200, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'res.eau', value: 200, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'res.feu', value: 200, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'res.neutre', value: 200, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'res.terre', value: 200, duration: 3, target: 'enemy' }
    ]
}
move.gaminerie = {
    id: 'gaminerie',
    name: 'Gaminerie',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 101, target: 'self' }
    ]
}
move.transgaminerie = {
    id: 'transgaminerie',
    name: 'Transgaminerie',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}

// -------- Tofu Dodu ---------------
move.malediction_du_tofulailler_royal = {
    id: 'malediction_du_tofulailler_royal',
    name: 'Malédiction du Tofulailler Royal',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 17, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'agility', value: 31, duration: 3, target: 'enemy' }
    ]
}
move.benediction_du_tofulailler_royal = {
    id: 'benediction_du_tofulailler_royal',
    name: 'Bénédiction du Tofulailler Royal',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'maxHp', value: 41, duration: 3, target: 'self' },
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'agility', value: 31, duration: 3, target: 'self' }
    ]
}
move.envol_liberateur = {
    id: 'envol_liberateur',
    name: 'Envol Libérateur',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Guerrier Zoth ---------------
move.hechaud_fourree = {
    id: 'hechaud_fourree',
    name: 'Héchaud Fourrée',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damageHpPct: { source: 'casterMaxHp', pct: 10 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 6, max: 10 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 200, duration: 3, target: 'self' }
    ]
}
move.melee = {
    id: 'melee',
    name: 'Mêlée',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 100, duration: 3, target: 'self' }
    ]
}

// -------- Chef Waddict ---------------
move.enwobage = {
    id: 'enwobage',
    name: 'Enwobage',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}
move.anawchie = {
    id: 'anawchie',
    name: 'Anawchie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.assasindic = {
    id: 'assasindic',
    name: 'Assasindic',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 16, max: 20 }, target: 'enemy' }
    ]
}

// -------- Gamino ---------------
move.chevauchee_malicieuse = {
    id: 'chevauchee_malicieuse',
    name: 'Chevauchée Malicieuse',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'agility', value: 100, duration: 3, target: 'self' }
    ]
}
move.esprit_d_equipe = {
    id: 'esprit_d_equipe',
    name: 'Esprit d\'équipe',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'flatDamage', value: 75, duration: 3, target: 'self' }
    ]
}
move.coup_de_sceptre = {
    id: 'coup_de_sceptre',
    name: 'Coup de Sceptre',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 31, max: 35 }, target: 'enemy' }
    ]
}

// -------- Serpiplume ---------------
move.boulette = {
    id: 'boulette',
    name: 'Boulette',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 41, max: 60 }, target: 'enemy' },
        { type: 'debuff', stat: 'res.eau', value: 11, duration: 3, target: 'enemy' }
    ]
}
move.sonnette = {
    id: 'sonnette',
    name: 'Sonnette',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 51, target: 'self' }
    ]
}
move.venin_destabilisateur = {
    id: 'venin_destabilisateur',
    name: 'Venin Déstabilisateur',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}

// -------- Chienchien Courant ---------------
move.accrochage = {
    id: 'accrochage',
    name: 'Accrochage',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Lampe Bleue ---------------
move.lumiere_bleue = {
    id: 'lumiere_bleue',
    name: 'Lumière Bleue',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 200, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Sergent Zoth ---------------
move.kulbutage = {
    id: 'kulbutage',
    name: 'Kulbutage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 26, max: 45 }, target: 'enemy' },
        { type: 'dot', element: 'neutre', value: 11, duration: 5, target: 'enemy' }
    ]
}

// -------- Ramane ---------------
move.poils_terrestres = {
    id: 'poils_terrestres',
    name: 'Poils Terrestres',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 20, duration: 2, target: 'self' },
    ]
}
move.desenvoutement_poilu = {
    id: 'desenvoutement_poilu',
    name: 'Désenvoûtement Poilu',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
    ]
}
move.comte_ancestral = {
    id: 'comte_ancestral',
    name: 'Comté ancestral',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 17, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'intelligence', value: 50, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'agility', value: 50, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'force', value: 50, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'chance', value: 50, duration: 3, target: 'enemy' }
    ]
}

// -------- Glutin colérique ---------------
move.glutinerie = {
    id: 'glutinerie',
    name: 'Glutinerie',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'finalDamagePct', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.glutincelle = {
    id: 'glutincelle',
    name: 'Glutincelle',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 41, max: 80 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 40 }, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' }
    ]
}

// -------- Glutin acariâtre ---------------
move.glutorpille = {
    id: 'glutorpille',
    name: 'Glutorpille',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 31, max: 60 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 16, max: 30 }, target: 'enemy' }
    ]
}

// -------- Glutin morose ---------------
move.glutimpact = {
    id: 'glutimpact',
    name: 'Glutimpact',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 31, max: 60 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 16, max: 30 }, target: 'enemy' }
    ]
}

// -------- Glutin boudeur ---------------
move.glutarc = {
    id: 'glutarc',
    name: 'Glutarc',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 41, max: 80 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 40 }, target: 'enemy' }
    ]
}

// -------- Malterego de Malalfa ---------------
move.malourdissement = {
    id: 'malourdissement',
    name: 'Malourdissement',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 13, max: 13 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 13, max: 13 }, target: 'enemy' }
    ]
}
move.malienisme = {
    id: 'malienisme',
    name: 'Maliénisme',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}

// -------- Horace le Corbac Apprivoisé ---------------

// -------- Silhouette ---------------
move.empoigne = {
    id: 'empoigne',
    name: 'Empoigne',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' }
    ]
}
move.strangulation = {
    id: 'strangulation',
    name: 'Strangulation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 40, max: 40 }, erodedHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}

// -------- Milimaître ---------------
move.feintrigue = {
    id: 'feintrigue',
    name: 'Feintrigue',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.coupression = {
    id: 'coupression',
    name: 'Coupression',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 35, max: 39 }, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 15, duration: 3, target: 'self' }
    ]
}
move.plantonyme = {
    id: 'plantonyme',
    name: 'Plantonyme',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 35, max: 39 }, target: 'enemy' }
    ]
}

// -------- Kartouche ---------------
move.decrossage = {
    id: 'decrossage',
    name: 'Décrossage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 35, max: 39 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.tir_progressif = {
    id: 'tir_progressif',
    name: 'Tir progressif',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 21, max: 24 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 4, target: 'self' },
    ]
}

// -------- Sramouraï ---------------
move.coupe_vent = {
    id: 'coupe_vent',
    name: 'Coupe-Vent',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 35, max: 39 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.moulinet_sournois = {
    id: 'moulinet_sournois',
    name: 'Moulinet sournois',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 28, max: 31 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Tromblion ---------------
move.decharge_en_salle = {
    id: 'decharge_en_salle',
    name: 'Décharge en salle',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 24 }, target: 'enemy' }
    ]
}
move.crosse_a_terre = {
    id: 'crosse_a_terre',
    name: 'Crosse à terre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 27, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}

// -------- Elsoummo ---------------
move.saut_de_lune = {
    id: 'saut_de_lune',
    name: 'Saut de lune',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 36, max: 39 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.kimarite = {
    id: 'kimarite',
    name: 'Kimarite',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 56, max: 60 }, target: 'enemy' }
    ]
}

// -------- Cactiflore ---------------
move.cacteau = {
    id: 'cacteau',
    name: 'Cacteau',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 17, max: 22 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 17, max: 22 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 17, max: 22 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 17, max: 22 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 17, max: 22 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.spores_assechantes = {
    id: 'spores_assechantes',
    name: 'Spores Asséchantes',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 100, duration: 3, target: 'self' }
    ]
}
move.ispores = {
    id: 'ispores',
    name: 'Ispores',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' },
        // TODO: Minimise les effets aléatoires de la cible
        // TODO: Minimise les effets aléatoires de la cible
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 200, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Cactana ---------------
move.cactanus = {
    id: 'cactanus',
    name: 'Cactanus',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.pixor = {
    id: 'pixor',
    name: 'Pixor',
    cooldownMs: 2000,
    effects: [
        { type: 'renvoiTotal', ratio: 1.0, target: 'self' },
    ]
}
move.bonussocac = {
    id: 'bonussocac',
    name: 'Bonussocac',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 30, duration: 3, target: 'self' }
    ]
}

// -------- Cactoblongo ---------------
move.mouerte = {
    id: 'mouerte',
    name: 'Mouerté',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' },
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.percepine = {
    id: 'percepine',
    name: 'Percépine',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 17, max: 22 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 17, max: 22 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 17, max: 22 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 17, max: 22 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'air', damage: { min: 17, max: 22 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.camocacterre = {
    id: 'camocacterre',
    name: 'Camocacterre',
    cooldownMs: 2000,
    effects: [
        { type: 'esquive', chancePct: 40, reductionPct: 100, duration: 3, target: 'self' },
        { type: 'buff', stat: 'critChance', value: 20, duration: 3, target: 'self' },
        { type: 'buff', stat: 'critChance', value: 20, duration: 3, target: 'self' },
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' },
        { type: 'buff', stat: 'atk', value: 200, duration: 3, target: 'self' }
    ]
}

// -------- Pampactus ---------------
move.unepine = {
    id: 'unepine',
    name: 'Unépine',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 15, max: 20 }, target: 'enemy' }
    ]
}
move.couche_pampars = {
    id: 'couche_pampars',
    name: 'Couche Pampars',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 0, duration: 3, target: 'self' },
        { type: 'buff', stat: 'damageReductionPct', value: 0, duration: 3, target: 'self' },
        { type: 'damage', element: 'neutre', damage: { min: 5, max: 5 }, erodedHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}

// -------- Lévito ---------------
move.maracac = {
    id: 'maracac',
    name: 'Maracac',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'avance', target: 'enemy' }
    ]
}
move.salsa = {
    id: 'salsa',
    name: 'Salsa',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'atk', value: 300, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.joropo = {
    id: 'joropo',
    name: 'Joropo',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 0, duration: 3, target: 'self' },
        { type: 'buff', stat: 'damageReductionPct', value: 0, duration: 3, target: 'self' },
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}

// -------- Kakoalak ---------------
move.kakoaklake = {
    id: 'kakoaklake',
    name: 'Kakoaklake',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 36, max: 45 }, target: 'enemy' }
    ]
}
move.pluie_de_pepite = {
    id: 'pluie_de_pepite',
    name: 'Pluie de Pépite',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 31, max: 40 }, target: 'enemy' }
    ]
}

// -------- Mansocolat ---------------
move.maskansocolat = {
    id: 'maskansocolat',
    name: 'Maskansocolat',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 46, max: 55 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.mansocolere = {
    id: 'mansocolere',
    name: 'Mansocolère',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 56, max: 65 }, erodedHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}
move.mansaut = {
    id: 'mansaut',
    name: 'Mansaut',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}

// -------- Glourson Guimauve ---------------

// -------- Chocoskargo ---------------
move.enrobage = {
    id: 'enrobage',
    name: 'Enrobage',
    cooldownMs: 2000,
    effects: [
        { type: 'heal%maxHp', value: 5, target: 'self' },
    ]
}
move.glycemie = {
    id: 'glycemie',
    name: 'Glycémie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 26, max: 35 }, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 10, duration: 3, target: 'self' }
    ]
}
move.chocoskarfarce = {
    id: 'chocoskarfarce',
    name: 'Chocoskarfarce',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 16, max: 25 }, target: 'enemy' }
    ]
}

// -------- Kwakao ---------------
move.kwakaoust = {
    id: 'kwakaoust',
    name: 'Kwakaoust',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.skwalala = {
    id: 'skwalala',
    name: 'Skwalala',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'debuff', stat: 'intelligence', value: 50, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'intelligence', value: 50, duration: 3, target: 'self' }
    ]
}

// -------- Shinibaru ---------------
move.henshin_no_numa = {
    id: 'henshin_no_numa',
    name: 'Henshin No Numa',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 25, max: 28 }, target: 'enemy' }
    ]
}
move.henshinobi = {
    id: 'henshinobi',
    name: 'Henshinobi',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.nukiyo_e = {
    id: 'nukiyo_e',
    name: 'Nukiyo-e',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 11, max: 13 }, target: 'enemy' },
        { type: 'dot', element: 'terre', value: 2, duration: 1, target: 'enemy' },
        { type: 'dot', element: 'feu', value: 2, duration: 1, target: 'enemy' },
        { type: 'dot', element: 'eau', value: 2, duration: 1, target: 'enemy' },
        { type: 'dot', element: 'air', value: 2, duration: 1, target: 'enemy' }
    ]
}
move.yama_no_tuki = {
    id: 'yama_no_tuki',
    name: 'Yama No Tuki',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 23, max: 26 }, target: 'enemy' }
    ]
}

// -------- Ishigro Pake ---------------
move.tsunamishi = {
    id: 'tsunamishi',
    name: 'Tsunamishi',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 27, max: 30 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.elevation_du_jardin_de_pierres = {
    id: 'elevation_du_jardin_de_pierres',
    name: 'Élévation du Jardin de Pierres',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' },
        { type: 'damage', element: 'neutre', damage: { min: 30, max: 34 }, target: 'enemy' }
    ]
}
move.ishi_nuken = {
    id: 'ishi_nuken',
    name: 'Ishi Nuken',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 6, max: 8 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 6, max: 8 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 6, max: 8 }, target: 'enemy' }
    ]
}

// -------- Tétonuki ---------------
move.tambourrin = {
    id: 'tambourrin',
    name: 'Tambourrin',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 40, duration: 3, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 28, max: 31 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.percusseins = {
    id: 'percusseins',
    name: 'Percusseins',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 26, max: 29 }, target: 'enemy' }
    ]
}

// -------- Parashukouï ---------------
move.valseuses = {
    id: 'valseuses',
    name: 'Valseuses',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 27, max: 30 }, target: 'enemy' }
    ]
}
move.transpompoko = {
    id: 'transpompoko',
    name: 'Transpompoko',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 29, max: 32 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' }
    ]
}
move.testirossa = {
    id: 'testirossa',
    name: 'Testirossa',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 20, max: 23 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' }
    ]
}

// -------- Lolojiki ---------------
move.poterie_tanuki = {
    id: 'poterie_tanuki',
    name: 'Poterie Tanuki',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 22, max: 25 }, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.kaolin = {
    id: 'kaolin',
    name: 'Kaolin',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 16, max: 19 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.terre_glaise = {
    id: 'terre_glaise',
    name: 'Terre Glaise',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 12, max: 14 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 12, max: 14 }, target: 'enemy' }
    ]
}

// -------- Kokom ---------------
move.kom_koko = {
    id: 'kom_koko',
    name: 'Kom koko',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 18, max: 21 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 18, max: 21 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 18, max: 21 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 18, max: 21 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.attirance_du_concombre = {
    id: 'attirance_du_concombre',
    name: 'Attirance du concombre',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Maître Zoth ---------------
move.bataille_pour_la_terre_des_zoths = {
    id: 'bataille_pour_la_terre_des_zoths',
    name: 'Bataille pour la terre des Zoths',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 41, max: 60 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' }
    ]
}
move.incitation = {
    id: 'incitation',
    name: 'Incitation',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}

// -------- Dragnarok ---------------
move.steune = {
    id: 'steune',
    name: 'Steune',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 100, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 100, duration: 3, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}
move.dragtaie = {
    id: 'dragtaie',
    name: 'Dragtaïe',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 26, max: 35 }, target: 'enemy' }
    ]
}
move.cuit_rasse = {
    id: 'cuit_rasse',
    name: 'Cuit Rasse',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}

// -------- Brouture ---------------
move.repousse = {
    id: 'repousse',
    name: 'Repousse',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 31, target: 'self' }
    ]
}
move.seve_nourrissante = {
    id: 'seve_nourrissante',
    name: 'Sève Nourrissante',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}
move.galle = {
    id: 'galle',
    name: 'Galle',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'air', value: 31, duration: 4, target: 'enemy' }
    ]
}

// -------- Nerbe ---------------
move.herbe_hacha = {
    id: 'herbe_hacha',
    name: 'Herbe Hacha',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 100, duration: 3, target: 'self' }
    ]
}
move.mauvaise_herbe = {
    id: 'mauvaise_herbe',
    name: 'Mauvaise Herbe',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damageHpPct: { source: 'casterMaxHp', pct: 11 }, target: 'enemy' }
    ]
}

// -------- Chiendent ---------------
move.morsure_critique = {
    id: 'morsure_critique',
    name: 'Morsure Critique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 51, max: 70 }, target: 'enemy' }
    ]
}
move.flair_obscur = {
    id: 'flair_obscur',
    name: 'Flair Obscur',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}

// -------- Rat Pine ---------------
move.ratatinage = {
    id: 'ratatinage',
    name: 'Ratatinage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 16, max: 25 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 16, max: 25 }, target: 'enemy' }
    ]
}
move.rature = {
    id: 'rature',
    name: 'Rature',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}
move.ratatouille = {
    id: 'ratatouille',
    name: 'Ratatouille',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Glutin Tapageur ---------------

// -------- Bitouf Sombre ---------------
move.glanage = {
    id: 'glanage',
    name: 'Glanage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}
move.ecrasement_sombre = {
    id: 'ecrasement_sombre',
    name: 'Écrasement Sombre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 51, max: 70 }, target: 'enemy' }
    ]
}

// -------- Floribonde ---------------
move.pistil_ensorcele = {
    id: 'pistil_ensorcele',
    name: 'Pistil Ensorcelé',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'res.air', value: 50, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'res.eau', value: 50, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'res.feu', value: 50, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'res.terre', value: 50, duration: 3, target: 'enemy' }
    ]
}
move.etamines_libertines = {
    id: 'etamines_libertines',
    name: 'Étamines libertines',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}
move.flagellation_florale = {
    id: 'flagellation_florale',
    name: 'Flagellation Florale',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 41, max: 80 }, target: 'enemy' }
    ]
}

// -------- Fécorce ---------------
move.ecorce_detonante = {
    id: 'ecorce_detonante',
    name: 'Écorce Détonante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.ecorce_malsaine = {
    id: 'ecorce_malsaine',
    name: 'Écorce Malsaine',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Larmichette de l'ogre ---------------
move.glougloutte_salee = {
    id: 'glougloutte_salee',
    name: 'Glougloutte Salée',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Abrakleur Sombre ---------------
move.nervure = {
    id: 'nervure',
    name: 'Nervure',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 50 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 16, max: 25 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.ecorce_putride = {
    id: 'ecorce_putride',
    name: 'Écorce Putride',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damageHpPct: { source: 'casterMaxHp', pct: 20 }, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}
move.plantage = {
    id: 'plantage',
    name: 'Plantage',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 100, duration: 3, target: 'self' }
    ]
}

// -------- Sanglacier ---------------
move.sanglancornage = {
    id: 'sanglancornage',
    name: 'Sanglancornage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.sanglobouste = {
    id: 'sanglobouste',
    name: 'Sanglobouste',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 51, duration: 3, target: 'self' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.sanglosoin = {
    id: 'sanglosoin',
    name: 'Sanglosoin',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 46, target: 'self' },
        { type: 'heal', heal: 46, target: 'self' }
    ]
}

// -------- Fricochère ---------------
move.fricochoncete = {
    id: 'fricochoncete',
    name: 'Fricochonceté',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.fricadelle = {
    id: 'fricadelle',
    name: 'Fricadelle',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'res.air', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.eau', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.feu', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.terre', value: 50, duration: 3, target: 'self' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.fricotage = {
    id: 'fricotage',
    name: 'Fricotage',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 26, max: 35 }, target: 'enemy' }
    ]
}

// -------- Kaniglou ---------------
move.glouglou = {
    id: 'glouglou',
    name: 'Glouglou',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 16, max: 25 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 20, max: 20 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}
move.kaniglouton = {
    id: 'kaniglouton',
    name: 'Kaniglouton',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 100, duration: 3, target: 'self' }
    ]
}
move.frigogol = {
    id: 'frigogol',
    name: 'Frigogol',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'critChance', value: 40, duration: 3, target: 'self' }
    ]
}

// -------- Timansot ---------------
move.mansonnette = {
    id: 'mansonnette',
    name: 'Mansonnette',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.mansotise = {
    id: 'mansotise',
    name: 'Mansotise',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 26, max: 35 }, target: 'enemy' },
        { type: 'debuff', stat: 'flatDamage', value: 31, duration: 3, target: 'enemy' }
    ]
}
move.mansovetage = {
    id: 'mansovetage',
    name: 'Mansovetage',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 31, target: 'self' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}

// -------- Shamansot ---------------
move.mansote_mouton = {
    id: 'mansote_mouton',
    name: 'Mansote-mouton',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.mansovage = {
    id: 'mansovage',
    name: 'Mansovage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 2, duration: 2, target: 'enemy' },
        { type: 'buff', stat: 'spd', value: 2, duration: 2, target: 'self' }
    ]
}
move.mansorcier = {
    id: 'mansorcier',
    name: 'Mansorcier',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 200, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'critChance', value: 10, duration: 3, target: 'enemy' },
        { type: 'antiHeal', duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'flatDamage', value: 100, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}

// -------- Mansobèse ---------------
move.mansolotage = {
    id: 'mansolotage',
    name: 'Mansolotage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.mansogrenu = {
    id: 'mansogrenu',
    name: 'Mansogrenu',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 46, max: 55 }, target: 'enemy' }
    ]
}
move.mansoldat = {
    id: 'mansoldat',
    name: 'Mansoldat',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 51, duration: 3, target: 'self' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}

// -------- Mamansot ---------------
move.mansolex = {
    id: 'mansolex',
    name: 'Mansolex',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.mansovietik = {
    id: 'mansovietik',
    name: 'Mansoviétik',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'critChance', value: 20, duration: 3, target: 'self' },
        { type: 'buff', stat: 'flatDamage', value: 50, duration: 3, target: 'self' },
        { type: 'heal', heal: 100, target: 'self' }
    ]
}
move.mansovegarde = {
    id: 'mansovegarde',
    name: 'Mansovegarde',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Fu Mansot ---------------
move.mansoron = {
    id: 'mansoron',
    name: 'Mansoron',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.mansolfatare = {
    id: 'mansolfatare',
    name: 'Mansolfatare',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 31, max: 35 }, target: 'enemy' }
    ]
}
move.mansoja = {
    id: 'mansoja',
    name: 'Mansoja',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 51, duration: 3, target: 'self' }
    ]
}

// -------- Écumouth ---------------
move.chataigne_glacee = {
    id: 'chataigne_glacee',
    name: 'Châtaigne glacée',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 26, max: 35 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.propulsogland = {
    id: 'propulsogland',
    name: 'Propulsogland',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.equilibrogland = {
    id: 'equilibrogland',
    name: 'Equilibrogland',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Smilomouth ---------------
move.griffemouth = {
    id: 'griffemouth',
    name: 'Griffemouth',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'debuff', stat: 'res.terre', value: 50, duration: 3, target: 'enemy' }
    ]
}
move.ramolimouth = {
    id: 'ramolimouth',
    name: 'Ramolimouth',
    cooldownMs: 2000,
    effects: [
        // TODO: Minimise les effets aléatoires de la cible
        { type: 'damage', element: 'eau', damage: { min: 16, max: 25 }, target: 'enemy' }
    ]
}
move.hurlomouth = {
    id: 'hurlomouth',
    name: 'Hurlomouth',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 51, duration: 3, target: 'self' }
    ]
}

// -------- Gliglibido ---------------
move.gland_d_ouil = {
    id: 'gland_d_ouil',
    name: 'Gland d\'Ouil',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'intelligence', value: 30, duration: 3, target: 'self' }
    ]
}
move.remontant = {
    id: 'remontant',
    name: 'Remontant',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 31, target: 'self' },
        { type: 'buff', stat: 'flatDamage', value: 41, duration: 3, target: 'self' }
    ]
}
move.fluide_brulant = {
    id: 'fluide_brulant',
    name: 'Fluide Brûlant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 34 }, target: 'enemy' }
    ]
}

// -------- Gliglitch ---------------
move.gliglag = {
    id: 'gliglag',
    name: 'Gliglag',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.gligliplication = {
    id: 'gligliplication',
    name: 'Gligliplication',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.embrochement_dephase = {
    id: 'embrochement_dephase',
    name: 'Embrochement Déphasé',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 51, max: 53 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 61, max: 63 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 71, max: 73 }, target: 'enemy' }
    ]
}

// -------- Ino-Naru ---------------
move.zephyr = {
    id: 'zephyr',
    name: 'Zéphyr',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.nun_shakrang = {
    id: 'nun_shakrang',
    name: 'Nun-Shakrang',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 26, max: 30 }, target: 'enemy' }
    ]
}
move.stratus = {
    id: 'stratus',
    name: 'Stratus',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Kurookin ---------------
move.rinku = {
    id: 'rinku',
    name: 'Rinku',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'finalDamagePct', value: 15, duration: 3, target: 'self' },
        { type: 'buff', stat: 'maxHp', value: 200, duration: 2, target: 'self' }
    ]
}
move.armure_des_vents = {
    id: 'armure_des_vents',
    name: 'Armure des vents',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', value: 250, duration: 3, target: 'self' }
    ]
}
move.kozaru_no_kotsu = {
    id: 'kozaru_no_kotsu',
    name: 'Kozaru No Kotsu',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.depression_atmospherique = {
    id: 'depression_atmospherique',
    name: 'Dépression Atmosphérique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Crachefoux ---------------
move.couleuvrine = {
    id: 'couleuvrine',
    name: 'Couleuvrine',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.a_bout_portant = {
    id: 'a_bout_portant',
    name: 'À bout portant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'debuff', stat: 'finalDamagePct', value: 30, duration: 3, target: 'enemy' }
    ]
}
move.boulet_magique = {
    id: 'boulet_magique',
    name: 'Boulet magique',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Rouquette ---------------
move.fusee_incendiaire = {
    id: 'fusee_incendiaire',
    name: 'Fusée incendiaire',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'heal', heal: 41, target: 'self' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.echec_critique = {
    id: 'echec_critique',
    name: 'Échec critique',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}
move.decollage_rate = {
    id: 'decollage_rate',
    name: 'Décollage raté',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Boumbardier ---------------
move.obus_aveuglant = {
    id: 'obus_aveuglant',
    name: 'Obus aveuglant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.feu_d_artifice = {
    id: 'feu_d_artifice',
    name: 'Feu d\'artifice',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'finalDamagePct', value: 20, duration: 3, target: 'self' },
        { type: 'buff', stat: 'spd', value: 10, duration: 2, target: 'self' }
    ]
}
move.obus_gluant = {
    id: 'obus_gluant',
    name: 'Obus gluant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Pétartifoux ---------------
move.petard = {
    id: 'petard',
    name: 'Pétard',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.phosphore = {
    id: 'phosphore',
    name: 'Phosphore',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.poudre_enervante = {
    id: 'poudre_enervante',
    name: 'Poudre énervante',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'finalDamagePct', value: 7, duration: 3, target: 'self' }
    ]
}

// -------- Founamboul ---------------
move.boumboule = {
    id: 'boumboule',
    name: 'Boumboule',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.tourniboule = {
    id: 'tourniboule',
    name: 'Tourniboule',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}

// -------- Malzerb ---------------
move.maltruisme = {
    id: 'maltruisme',
    name: 'Maltruisme',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 23, target: 'self' }
    ]
}
move.malveole = {
    id: 'malveole',
    name: 'Malvéole',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'maxHp', value: 500, duration: 3, target: 'self' }
    ]
}
move.malumeur = {
    id: 'malumeur',
    name: 'Malumeur',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'intelligence', value: 20, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'intelligence', value: 20, duration: 3, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 46, max: 54 }, target: 'enemy' }
    ]
}

// -------- Rat Masseur ---------------
move.ravin = {
    id: 'ravin',
    name: 'Ravin',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 26, max: 35 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.doctorat = {
    id: 'doctorat',
    name: 'Doctorat',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 21, target: 'self' }
    ]
}

// -------- Rat Colleur ---------------
move.rajustement = {
    id: 'rajustement',
    name: 'Rajustement',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}

// -------- Dévhorreur ---------------
move.terreur = {
    id: 'terreur',
    name: 'Terreur',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 46, max: 50 }, target: 'enemy' }
    ]
}
move.malheur = {
    id: 'malheur',
    name: 'Malheur',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'maxHp', value: 200, duration: 2, target: 'enemy' }
    ]
}
move.torpeur = {
    id: 'torpeur',
    name: 'Torpeur',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Akakwa ---------------
move.kwapoeira = {
    id: 'kwapoeira',
    name: 'Kwapoeira',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 39, max: 46 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 39, max: 46 }, target: 'enemy' }
    ]
}
move.akabond = {
    id: 'akabond',
    name: 'Akabond',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 31, max: 36 }, target: 'enemy' }
    ]
}

// -------- Kwamouraï ---------------
move.aikomu_tuyu = {
    id: 'aikomu_tuyu',
    name: 'Aikomu Tuyu',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 33, max: 39 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 33, max: 39 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.katanardent = {
    id: 'katanardent',
    name: 'Katanardent',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 36, max: 42 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 36, max: 42 }, target: 'enemy' }
    ]
}

// -------- Percepteur ---------------
move.labour = {
    id: 'labour',
    name: 'Labour',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 35 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.monnaie_trebuchante = {
    id: 'monnaie_trebuchante',
    name: 'Monnaie Trébuchante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.rente = {
    id: 'rente',
    name: 'Rente',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'heal', heal: 11, target: 'self' }
    ]
}
move.ferrage = {
    id: 'ferrage',
    name: 'Ferrage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 25 }, target: 'enemy' }
    ]
}
move.douane = {
    id: 'douane',
    name: 'Douane',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 35 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.gabelle = {
    id: 'gabelle',
    name: 'Gabelle',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' }
    ]
}
move.deficit = {
    id: 'deficit',
    name: 'Déficit',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'debuff', stat: 'flatDamage', value: 30, duration: 3, target: 'enemy' }
    ]
}
move.ruade = {
    id: 'ruade',
    name: 'Ruade',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 31, max: 35 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.liquidation = {
    id: 'liquidation',
    name: 'Liquidation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 26, max: 30 }, target: 'enemy' }
    ]
}
move.abreuvoir = {
    id: 'abreuvoir',
    name: 'Abreuvoir',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 31, max: 35 }, target: 'enemy' },
        { type: 'heal', heal: 50, target: 'self' }
    ]
}
move.cotisation = {
    id: 'cotisation',
    name: 'Cotisation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.rodeo = {
    id: 'rodeo',
    name: 'Rodéo',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 31, max: 35 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.levee_de_fonds = {
    id: 'levee_de_fonds',
    name: 'Levée de Fonds',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.saut_d_obstacle = {
    id: 'saut_d_obstacle',
    name: 'Saut d\'obstacle',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 31, max: 35 }, target: 'enemy' }
    ]
}
move.redevance = {
    id: 'redevance',
    name: 'Redevance',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'debuff', stat: 'critChance', value: 25, duration: 3, target: 'enemy' }
    ]
}
move.prelevement = {
    id: 'prelevement',
    name: 'Prélèvement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.sagittarius = {
    id: 'sagittarius',
    name: 'Sagittarius',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.dommages_et_interets = {
    id: 'dommages_et_interets',
    name: 'Dommages et Intérêts',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 20, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.2, target: 'self' },
        { type: 'lifesteal', ratio: 0.2, target: 'self' },
        { type: 'lifesteal', ratio: 0.2, target: 'self' }
    ]
}
move.courroux_de_menalt = {
    id: 'courroux_de_menalt',
    name: 'Courroux de Menalt',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.illeres = {
    id: 'illeres',
    name: 'Œillères',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.chancellerie = {
    id: 'chancellerie',
    name: 'Chancellerie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'debuff', stat: 'finalDamagePct', value: 15, duration: 3, target: 'enemy' }
    ]
}
move.surtaxe = {
    id: 'surtaxe',
    name: 'Surtaxe',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 11, max: 15 }, target: 'enemy' }
        // TODO: Minimise les effets aléatoires de la cible
    ]
}
move.faillite = {
    id: 'faillite',
    name: 'Faillite',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 13, duration: 3, target: 'self' }
    ]
}
move.malversation = {
    id: 'malversation',
    name: 'Malversation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'heal', heal: 50, target: 'self' }
    ]
}
move.affranchissement = {
    id: 'affranchissement',
    name: 'Affranchissement',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' }
    ]
}
move.exoneration = {
    id: 'exoneration',
    name: 'Exonération',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' }
    ]
}
move.bride = {
    id: 'bride',
    name: 'Bride',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.licol = {
    id: 'licol',
    name: 'Licol',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.lasso = {
    id: 'lasso',
    name: 'Lasso',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}
move.recit_hippique = {
    id: 'recit_hippique',
    name: 'Récit Hippique',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 150, duration: 3, target: 'self' }
    ]
}
move.eperon = {
    id: 'eperon',
    name: 'Éperon',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}
move.trot = {
    id: 'trot',
    name: 'Trot',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.galop = {
    id: 'galop',
    name: 'Galop',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.trop_percu = {
    id: 'trop_percu',
    name: 'Trop-perçu',
    cooldownMs: 2000,
    effects: [
        { type: 'heal%maxHp', value: 5, target: 'self' },
    ]
}
move.subvention = {
    id: 'subvention',
    name: 'Subvention',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 7, target: 'self' },
        { type: 'heal', heal: 7, target: 'self' },
        { type: 'heal', heal: 7, target: 'self' }
    ]
}
move.fin_de_l_abondance = {
    id: 'fin_de_l_abondance',
    name: 'Fin de l\'Abondance',
    cooldownMs: 2000,
    effects: [
        { type: 'heal%maxHp', value: 15, target: 'self' },
        { type: 'heal', heal: 30, target: 'self' }
    ]
}
move.maitre_etalon = {
    id: 'maitre_etalon',
    name: 'Maître-étalon',
    cooldownMs: 2000,
    effects: [
        { type: 'heal%maxHp', value: 10, target: 'self' },
        { type: 'buff', stat: 'atk', value: 150, duration: 3, target: 'self' }
    ]
}
move.pur_sang = {
    id: 'pur_sang',
    name: 'Pur-sang',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' }
    ]
}
move.gros_fiacre = {
    id: 'gros_fiacre',
    name: 'Gros Fiacre',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.endurance_de_centoror = {
    id: 'endurance_de_centoror',
    name: 'Endurance de Centoror',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Krokille fragile ---------------
move.volte = {
    id: 'volte',
    name: 'Volte',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 30, max: 34 }, target: 'enemy' }
    ]
}
move.eruption_vulkaine = {
    id: 'eruption_vulkaine',
    name: 'Éruption vulkaine',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 35, max: 41 }, target: 'enemy' }
    ]
}

// -------- Rat Fraîchi ---------------
move.radical = {
    id: 'radical',
    name: 'Radical',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'res.feu', value: 50, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'res.terre', value: 50, duration: 3, target: 'enemy' }
    ]
}
move.raclette = {
    id: 'raclette',
    name: 'Raclette',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'feu', value: 6, duration: 2, target: 'enemy' }
    ]
}

// -------- Boubourse ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Peluche tofu ---------------
move.entorse = {
    id: 'entorse',
    name: 'Entorse',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.pique_couic = {
    id: 'pique_couic',
    name: 'Pique-Couic',
    cooldownMs: 2000,
    effects: [
        // TODO: Minimise les effets aléatoires de la cible
    ]
}

// -------- Doublure ---------------
move.doublage = {
    id: 'doublage',
    name: 'Doublage',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'esquive', chancePct: 40, reductionPct: 100, duration: 3, target: 'self' },
    ]
}
move.coupe_circulaire = {
    id: 'coupe_circulaire',
    name: 'Coupe Circulaire',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.subtilite = {
    id: 'subtilite',
    name: 'Subtilité',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Gliglicérin ---------------
move.attirance_du_gligli = {
    id: 'attirance_du_gligli',
    name: 'Attirance du Gligli',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}
move.fauchage_de_glands = {
    id: 'fauchage_de_glands',
    name: 'Fauchage de Glands',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 36, max: 39 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.raffut_bestial = {
    id: 'raffut_bestial',
    name: 'Raffut Bestial',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 41, max: 43 }, target: 'enemy' },
        { type: 'debuff', stat: 'flatDamage', value: 16, duration: 3, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}

// -------- Dragmatique ---------------
move.lavomatik = {
    id: 'lavomatik',
    name: 'Lavomatik',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.magmorsure = {
    id: 'magmorsure',
    name: 'Magmorsure',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 26, max: 35 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 11, max: 15 }, target: 'enemy' }
    ]
}

// -------- Rat Caille ---------------
move.ramonage = {
    id: 'ramonage',
    name: 'Ramonage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 26, max: 35 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 11, max: 35 }, target: 'enemy' }
    ]
}
move.rapidite = {
    id: 'rapidite',
    name: 'Rapidité',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.racket = {
    id: 'racket',
    name: 'Racket',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 118, max: 100 }, currentHpScale: { stat: 'finalDamagePct', ratio: 0.5 }, target: 'enemy' }
    ]
}

// -------- Rat Botteur ---------------
move.rabotage = {
    id: 'rabotage',
    name: 'Rabotage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}
move.raffut = {
    id: 'raffut',
    name: 'Raffut',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 16, duration: 3, target: 'self' }
    ]
}

// -------- Poolay ---------------
move.fureur_de_vivre = {
    id: 'fureur_de_vivre',
    name: 'Fureur de vivre',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 3, target: 'self' }
    ]
}
move.haleine_de_vers = {
    id: 'haleine_de_vers',
    name: 'Haleine de vers',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 50 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 11, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 31, max: 50 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.poolay_frit = {
    id: 'poolay_frit',
    name: 'Poolay frit',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Fancrôme ---------------
move.ancre_d_echine = {
    id: 'ancre_d_echine',
    name: 'Ancre d\'échine',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 66, max: 75 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.ancre_harton = {
    id: 'ancre_harton',
    name: 'Ancre Harton',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 50, duration: 3, target: 'self' }
    ]
}
move.jet_d_ancre = {
    id: 'jet_d_ancre',
    name: 'Jet d\'Ancre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 2, duration: 2, target: 'enemy' },
        { type: 'buff', stat: 'spd', value: 2, duration: 2, target: 'self' }
    ]
}

// -------- Fantomalamère ---------------
move.boulay = {
    id: 'boulay',
    name: 'Boulay',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 61, max: 100 }, target: 'enemy' },
        { type: 'buff', stat: 'critChance', value: 10, duration: 3, target: 'self' }
    ]
}
move.bouhay = {
    id: 'bouhay',
    name: 'Bouhay',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 51, target: 'self' },
        { type: 'heal', heal: 51, target: 'self' }
    ]
}
move.bertha = {
    id: 'bertha',
    name: 'Bertha',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Vigie pirate ---------------
move.roce = {
    id: 'roce',
    name: 'Roce',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 20, max: 20 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.harde = {
    id: 'harde',
    name: 'Hardé',
    cooldownMs: 2000,
    effects: [
        { type: 'antiHeal', duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' }
    ]
}
move.herissage = {
    id: 'herissage',
    name: 'Hérissage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 10, max: 10 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}

// -------- Harpirate ---------------
move.hissage = {
    id: 'hissage',
    name: 'Hissage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 66, max: 95 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'agility', value: 100, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'agility', value: 100, duration: 3, target: 'self' }
    ]
}
move.hure = {
    id: 'hure',
    name: 'Hure',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 50, target: 'self' }
    ]
}
move.homiseur = {
    id: 'homiseur',
    name: 'Homiseur',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Fantômat ---------------
move.cedoine = {
    id: 'cedoine',
    name: 'Cédoine',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 76, max: 105 }, target: 'enemy' }
    ]
}
move.kake = {
    id: 'kake',
    name: 'Kake',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 41, max: 60 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Fantimonier ---------------
move.barre_barre = {
    id: 'barre_barre',
    name: 'Barre barre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 71, max: 90 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.barre_hikade = {
    id: 'barre_hikade',
    name: 'Barre Hikade',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.barre_botage = {
    id: 'barre_botage',
    name: 'Barre botage',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 71, target: 'self' },
        { type: 'buff', stat: 'flatDamage', value: 100, duration: 3, target: 'self' }
    ]
}

// -------- Pitraille ---------------
move.ch_boum = {
    id: 'ch_boum',
    name: 'Ch\'boum',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 301, max: 400 }, target: 'enemy' }
    ]
}
move.ch_bang = {
    id: 'ch_bang',
    name: 'Ch\'bang',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 40, duration: 3, target: 'self' }
    ]
}

// -------- Phorrêveur ---------------
move.flaqueduc = {
    id: 'flaqueduc',
    name: 'Flaqueduc',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.onde_repulsive = {
    id: 'onde_repulsive',
    name: 'Onde répulsive',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.appel_a_l_aide = {
    id: 'appel_a_l_aide',
    name: 'Appel à l\'aide',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Métaphorreur ---------------
move.dispersion = {
    id: 'dispersion',
    name: 'Dispersion',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 0, duration: 3, target: 'self' }
    ]
}
move.fracturgescence = {
    id: 'fracturgescence',
    name: 'Fracturgescence',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.phormol = {
    id: 'phormol',
    name: 'Phormol',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}

// -------- Père Phorreur ---------------
move.tunnellipse = {
    id: 'tunnellipse',
    name: 'Tunnellipse',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.perphorrage = {
    id: 'perphorrage',
    name: 'Perphorrage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 61, max: 70 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'atk', value: 200, duration: 3, target: 'enemy' }
    ]
}

// -------- Phozami ---------------
move.phorrage = {
    id: 'phorrage',
    name: 'Phorrage',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 31, max: 40 }, target: 'enemy' }
    ]
}
move.defense = {
    id: 'defense',
    name: 'Défense',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Mère Veilleuse ---------------
move.ephort_de_guerre = {
    id: 'ephort_de_guerre',
    name: 'Éphort de guerre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}

// -------- Fangshu ---------------
move.altocumulus = {
    id: 'altocumulus',
    name: 'Altocumulus',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 34, max: 40 }, target: 'enemy' }
    ]
}
move.raijin_yari = {
    id: 'raijin_yari',
    name: 'Raijin Yari',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 19, max: 22 }, target: 'enemy' }
    ]
}
move.shinatobe = {
    id: 'shinatobe',
    name: 'Shinatobe',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 23, max: 27 }, target: 'enemy' }
    ]
}

// -------- Assaïshin ---------------
move.sai_sai_sai_sai = {
    id: 'sai_sai_sai_sai',
    name: 'Saï Saï Saï Saï',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 7, max: 10 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 7, max: 10 }, target: 'enemy' }
    ]
}

// -------- Malépik ---------------
move.malagile = {
    id: 'malagile',
    name: 'Malagile',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 27, max: 31 }, target: 'enemy' },
        { type: 'buff', stat: 'critChance', value: 5, duration: 3, target: 'self' }
    ]
}
move.maltitude = {
    id: 'maltitude',
    name: 'Maltitude',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'force', value: 25, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'force', value: 25, duration: 3, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 44, max: 52 }, target: 'enemy' }
    ]
}
move.malibi = {
    id: 'malibi',
    name: 'Malibi',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 32, max: 38 }, target: 'enemy' }
    ]
}

// -------- Bitouf Aérien ---------------
move.envolupte = {
    id: 'envolupte',
    name: 'Envolupté',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.tornade_pernicieuse = {
    id: 'tornade_pernicieuse',
    name: 'Tornade pernicieuse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 71, max: 90 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.aeroportage = {
    id: 'aeroportage',
    name: 'Aéroportage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 41, max: 60 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}

// -------- Émeraude ---------------
move.transposition_amicale = {
    id: 'transposition_amicale',
    name: 'Transposition Amicale',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'maxHp', value: 81, duration: 3, target: 'self' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.transposition_destructrice = {
    id: 'transposition_destructrice',
    name: 'Transposition Destructrice',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 41, max: 60 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.bouh_m_rang_emeraude = {
    id: 'bouh_m_rang_emeraude',
    name: 'Bouh M\'Rang Émeraude',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 51, max: 100 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.tripotee = {
    id: 'tripotee',
    name: 'Tripotée',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
    ]
}

// -------- Saphira ---------------
move.bouh_m_rang_saphir = {
    id: 'bouh_m_rang_saphir',
    name: 'Bouh M\'Rang Saphir',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 51, max: 100 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'antiHeal', duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'critChance', value: 25, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 10, duration: 3, target: 'self' }
    ]
}
move.camouflage_saphiresque = {
    id: 'camouflage_saphiresque',
    name: 'Camouflage Saphiresque',
    cooldownMs: 2000,
    effects: [
        { type: 'esquive', chancePct: 40, reductionPct: 100, duration: 3, target: 'self' },
        { type: 'buff', stat: 'critChance', value: 10, duration: 3, target: 'self' },
        { type: 'buff', stat: 'critDamagePct', value: 20, duration: 3, target: 'self' }
    ]
}

// -------- Rubise ---------------
move.bouh_m_rang_rubis = {
    id: 'bouh_m_rang_rubis',
    name: 'Bouh M\'Rang Rubis',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 26, max: 50 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.invocation_de_totem_motivant = {
    id: 'invocation_de_totem_motivant',
    name: 'Invocation de Totem Motivant',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.invocation_de_totem_explosif = {
    id: 'invocation_de_totem_explosif',
    name: 'Invocation de Totem Explosif',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.bottage_de_fesses = {
    id: 'bottage_de_fesses',
    name: 'Bottage de Fesses',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 11, max: 20 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.invocation_de_totem_soignant = {
    id: 'invocation_de_totem_soignant',
    name: 'Invocation de Totem Soignant',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.totemisation = {
    id: 'totemisation',
    name: 'Totemisation',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 11, max: 15 }, target: 'enemy' }
    ]
}
move.bond_rubisant = {
    id: 'bond_rubisant',
    name: 'Bond Rubisant',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 15, duration: 3, target: 'enemy' }
    ]
}

// -------- Diamantine ---------------
move.lourdeur = {
    id: 'lourdeur',
    name: 'Lourdeur',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'maxHp', value: 501, duration: 3, target: 'self' }
    ]
}
move.bouh_m_rang_diamant = {
    id: 'bouh_m_rang_diamant',
    name: 'Bouh M\'Rang Diamant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 51, max: 100 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.invocation_de_poupee_mortelle = {
    id: 'invocation_de_poupee_mortelle',
    name: 'Invocation de Poupée Mortelle',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'heal', heal: 201, target: 'self' }
    ]
}
move.bond_etincelant = {
    id: 'bond_etincelant',
    name: 'Bond Étincelant',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Meupette ---------------
move.meurtrissure = {
    id: 'meurtrissure',
    name: 'Meurtrissure',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 61, max: 80 }, target: 'enemy' }
    ]
}
move.protection_feuillue = {
    id: 'protection_feuillue',
    name: 'Protection Feuillue',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Maltrio ---------------
move.malteration = {
    id: 'malteration',
    name: 'Malteration',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 28, max: 32 }, target: 'enemy' }
    ]
}
move.maleze = {
    id: 'maleze',
    name: 'Malèze',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 32, max: 38 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Malbois ---------------
move.piege_malechant = {
    id: 'piege_malechant',
    name: 'Piège Maléchant',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.glyphe_malterant = {
    id: 'glyphe_malterant',
    name: 'Glyphe Maltérant',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.malchimie = {
    id: 'malchimie',
    name: 'Malchimie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 21, max: 25 }, target: 'enemy' }
    ]
}

// -------- Toubibz ---------------
move.gueriz_uf = {
    id: 'gueriz_uf',
    name: 'Guérizœuf',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 79, target: 'self' }
    ]
}
move.tornabz = {
    id: 'tornabz',
    name: 'Tornabz',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 74, max: 86 }, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 100, duration: 3, target: 'self' }
    ]
}
move.evabzion = {
    id: 'evabzion',
    name: 'Évabzion',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}

// -------- Krokille Vénérable Insipide ---------------

// -------- Krokille Vénérable Boueuse ---------------

// -------- Krokille Vénérable Incandescente ---------------

// -------- Krokille Vénérable Humide ---------------

// -------- Krokille Vénérable Sèche ---------------

// -------- Dragodinde de Nowel fougueuse ---------------

// -------- Chef Glutin Tapageur ---------------

// -------- Hamrack ---------------
move.gouverne_ail = {
    id: 'gouverne_ail',
    name: 'Gouverne ail',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 71, max: 80 }, target: 'enemy' }
    ]
}

// -------- Félygiène ---------------
move.griffhanger = {
    id: 'griffhanger',
    name: 'Griffhanger',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'debuff', stat: 'agility', value: 50, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'agility', value: 50, duration: 3, target: 'self' }
    ]
}
move.griffes_aveuglantes = {
    id: 'griffes_aveuglantes',
    name: 'Griffes aveuglantes',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.hygiene_douteuse = {
    id: 'hygiene_douteuse',
    name: 'Hygiène douteuse',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'damageReductionPct', value: 10, duration: 3, target: 'enemy' }
    ]
}

// -------- Panthègros ---------------
move.gros_boulet = {
    id: 'gros_boulet',
    name: 'Gros boulet',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'chance', value: 100, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'chance', value: 100, duration: 3, target: 'self' }
    ]
}
move.boulet_sauteur = {
    id: 'boulet_sauteur',
    name: 'Boulet sauteur',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 61, max: 70 }, target: 'enemy' }
    ]
}
move.choc_electrique = {
    id: 'choc_electrique',
    name: 'Choc électrique',
    cooldownMs: 2000,
    effects: [
        // TODO: Minimise les effets aléatoires de la cible
    ]
}

// -------- Lichangoro ---------------
move.fujin_tsuinburedo = {
    id: 'fujin_tsuinburedo',
    name: 'Fujin Tsuinburedo',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 10, max: 12 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 10, max: 12 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 10, max: 12 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 10, max: 12 }, target: 'enemy' }
    ]
}
move.moussang = {
    id: 'moussang',
    name: 'Moussang',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 28, max: 33 }, target: 'enemy' }
    ]
}

// -------- Betto ---------------
move.pioche_concombre = {
    id: 'pioche_concombre',
    name: 'Pioche-concombre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 43, max: 50 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 43, max: 50 }, target: 'enemy' }
    ]
}
move.komatomi = {
    id: 'komatomi',
    name: 'Komatomi',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 27, max: 32 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 27, max: 32 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Abrakleur Clair ---------------
move.radicule = {
    id: 'radicule',
    name: 'Radicule',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 31, max: 50 }, target: 'enemy' }
    ]
}
move.radicelle = {
    id: 'radicelle',
    name: 'Radicelle',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 200, duration: 3, target: 'self' },
        { type: 'buff', stat: 'flatDamage', value: 10, duration: 3, target: 'self' }
    ]
}
move.pedoncule_perfide = {
    id: 'pedoncule_perfide',
    name: 'Pédoncule perfide',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 31, max: 50 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Kaskargo ---------------
move.bave = {
    id: 'bave',
    name: 'Bave',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.cooperation_baveuse = {
    id: 'cooperation_baveuse',
    name: 'Coopération Baveuse',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.mucus = {
    id: 'mucus',
    name: 'Mucus',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Crapeur ---------------
move.crapoute = {
    id: 'crapoute',
    name: 'Crapoute',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.crapitulation = {
    id: 'crapitulation',
    name: 'Crapitulation',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 41, target: 'self' },
        { type: 'buff', stat: 'flatDamage', value: 100, duration: 3, target: 'self' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.crapture = {
    id: 'crapture',
    name: 'Crapture',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 41, max: 60 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Atomystique ---------------
move.prothon = {
    id: 'prothon',
    name: 'Prothon',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 71, max: 80 }, target: 'enemy' }
    ]
}
move.daimocritique = {
    id: 'daimocritique',
    name: 'Daimocritique',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.neuthron = {
    id: 'neuthron',
    name: 'Neuthron',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 200, duration: 3, target: 'self' }
    ]
}

// -------- Mofette ---------------
move.duslipe = {
    id: 'duslipe',
    name: 'Duslipe',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 51, max: 70 }, target: 'enemy' }
    ]
}
move.depere = {
    id: 'depere',
    name: 'Dépère',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'heal', heal: 31, target: 'self' }
    ]
}

// -------- Fumrirolle ---------------
move.fumisterie = {
    id: 'fumisterie',
    name: 'Fumisterie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 61, max: 70 }, target: 'enemy' }
    ]
}
move.fumigene = {
    id: 'fumigene',
    name: 'Fumigène',
    cooldownMs: 2000,
    effects: [
        // TODO: Minimise les effets aléatoires de la cible
    ]
}
move.fumoir = {
    id: 'fumoir',
    name: 'Fumoir',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 2, duration: 2, target: 'enemy' },
        { type: 'buff', stat: 'spd', value: 2, duration: 2, target: 'self' }
    ]
}

// -------- Solfataré ---------------
move.soufre_hance = {
    id: 'soufre_hance',
    name: 'Soufre hance',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 46, max: 55 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.soufre_latte = {
    id: 'soufre_latte',
    name: 'Soufre latté',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Kanihilan ---------------
move.coup_d_epaule = {
    id: 'coup_d_epaule',
    name: 'Coup d\'épaule',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 51, max: 60 }, target: 'enemy' }
    ]
}
move.casse_caillou = {
    id: 'casse_caillou',
    name: 'Casse-caillou',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 61, max: 70 }, erodedHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.grrr = {
    id: 'grrr',
    name: 'Grrr',
    cooldownMs: 2000,
    effects: [
        { type: 'renvoiTotal', ratio: 1.0, target: 'self' },
    ]
}

// -------- Alhyène ---------------
move.vent_discordant = {
    id: 'vent_discordant',
    name: 'Vent discordant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}
move.invocation_de_flammes = {
    id: 'invocation_de_flammes',
    name: 'Invocation de flammes',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'maxHp', value: 100, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'maxHp', value: 100, duration: 3, target: 'self' }
    ]
}

// -------- Kaniblou ---------------
move.lance_enflammee = {
    id: 'lance_enflammee',
    name: 'Lance enflammée',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'debuff', stat: 'intelligence', value: 50, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'intelligence', value: 50, duration: 3, target: 'self' }
    ]
}
move.griffes_enflammees = {
    id: 'griffes_enflammees',
    name: 'Griffes enflammées',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damageHpPct: { source: 'casterMaxHp', pct: 10 }, target: 'enemy' }
    ]
}
move.kaniblouse = {
    id: 'kaniblouse',
    name: 'Kaniblouse',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 81, target: 'self' }
    ]
}

// -------- Orfélin ---------------
move.toupie = {
    id: 'toupie',
    name: 'Toupie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'debuff', stat: 'force', value: 50, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'force', value: 50, duration: 3, target: 'self' }
    ]
}
move.tranchlame = {
    id: 'tranchlame',
    name: 'Tranchlame',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 61, max: 70 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.boubou = {
    id: 'boubou',
    name: 'Boubou',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 0, duration: 3, target: 'self' }
    ]
}

// -------- Chasquatch ---------------
move.lechouille = {
    id: 'lechouille',
    name: 'Léchouille',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 52, max: 56 }, target: 'enemy' }
    ]
}
move.calin_felin = {
    id: 'calin_felin',
    name: 'Câlin Félin',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 66, max: 70 }, target: 'enemy' }
    ]
}

// -------- Chacrebleu ---------------
move.chamboulement = {
    id: 'chamboulement',
    name: 'Chamboulement',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' }
    ]
}
move.fortifichation = {
    id: 'fortifichation',
    name: 'Fortifichation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 66, max: 70 }, target: 'enemy' }
    ]
}
move.retour_de_chachaton = {
    id: 'retour_de_chachaton',
    name: 'Retour de Chachaton',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 76, max: 80 }, target: 'enemy' }
    ]
}

// -------- Chakichan ---------------
move.griffe_a_un_pouce = {
    id: 'griffe_a_un_pouce',
    name: 'Griffe à un Pouce',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 103, max: 107 }, erodedHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 53, max: 57 }, target: 'enemy' }
    ]
}
move.mawatougeri = {
    id: 'mawatougeri',
    name: 'Mawatougeri',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Chargus ---------------
move.vieillissement_premature = {
    id: 'vieillissement_premature',
    name: 'Vieillissement Prématuré',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 76, max: 80 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 200, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 200, duration: 3, target: 'self' }
    ]
}
move.duplichation = {
    id: 'duplichation',
    name: 'Duplichation',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.queue_de_poing = {
    id: 'queue_de_poing',
    name: 'Queue de Poing',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 71, max: 75 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Chakaroze ---------------
move.griffure_ondulante = {
    id: 'griffure_ondulante',
    name: 'Griffure Ondulante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 76, max: 80 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 76, max: 80 }, target: 'enemy' }
    ]
}
move.miaoulement = {
    id: 'miaoulement',
    name: 'Miaoulement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 66, max: 70 }, target: 'enemy' },
        { type: 'buffDrain', value: 2, target: 'enemy' }
    ]
}
move.chatomisation = {
    id: 'chatomisation',
    name: 'Chatomisation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 61, max: 65 }, target: 'enemy' }
    ]
}

// -------- Tsukinochi ---------------
move.glaive_lunaire = {
    id: 'glaive_lunaire',
    name: 'Glaive Lunaire',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.tsukuyomi = {
    id: 'tsukuyomi',
    name: 'Tsukuyomi',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 8, max: 10 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 8, max: 10 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 8, max: 10 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 8, max: 10 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 8, max: 10 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 8, max: 10 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 4, target: 'self' },
        { type: 'damage', element: 'neutre', damage: { min: 4, max: 5 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 4, max: 5 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 4, max: 5 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 4, max: 5 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 4, max: 5 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 4, max: 5 }, target: 'enemy' }
    ]
}

// -------- Tambouraï ---------------
move.fuhaku_tatsumaki = {
    id: 'fuhaku_tatsumaki',
    name: 'Fūhaku Tatsumaki',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.raiju_no_kiba = {
    id: 'raiju_no_kiba',
    name: 'Raijū No Kiba',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'debuff', stat: 'critChance', value: 15, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 5, max: 8 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 5, max: 8 }, target: 'enemy' },
        { type: 'debuff', stat: 'critChance', value: 15, duration: 3, target: 'enemy' }
    ]
}
move.tambourbelier = {
    id: 'tambourbelier',
    name: 'Tambourbélier',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 11, max: 13 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Onabu-Geisha ---------------
move.kiri_shigure = {
    id: 'kiri_shigure',
    name: 'Kiri Shigure',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 100, duration: 3, target: 'enemy' }
    ]
}
move.usugasumi_senbonzakura = {
    id: 'usugasumi_senbonzakura',
    name: 'Usugasumi Senbonzakura',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 61, max: 70 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 26, max: 35 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.ranga_cho = {
    id: 'ranga_cho',
    name: 'Ranga Cho',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'heal%maxHp', value: 7, target: 'self' },
        { type: 'damage', element: 'air', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 16, max: 20 }, target: 'enemy' }
    ]
}

// -------- Jiangshi-Nobi ---------------
move.griffes_de_la_nuit = {
    id: 'griffes_de_la_nuit',
    name: 'Griffes de la Nuit',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'dot', element: 'terre', value: 7, duration: 1, target: 'enemy' },
        { type: 'dot', element: 'terre', value: 7, duration: 2, target: 'enemy' },
        { type: 'dot', element: 'terre', value: 7, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'dot', element: 'terre', value: 3, duration: 1, target: 'enemy' },
        { type: 'dot', element: 'terre', value: 3, duration: 2, target: 'enemy' },
        { type: 'dot', element: 'terre', value: 3, duration: 3, target: 'enemy' }
    ]
}
move.poing_momifie = {
    id: 'poing_momifie',
    name: 'Poing Momifié',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 4, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 5, max: 8 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 5, max: 8 }, target: 'enemy' }
    ]
}
move.manie_la_maudite_momie = {
    id: 'manie_la_maudite_momie',
    name: 'Manie la maudite momie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 26, max: 35 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 13, max: 17 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Kabushido ---------------
move.hiryu_kaen = {
    id: 'hiryu_kaen',
    name: 'Hiryū Kaen',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'dot', element: 'feu', value: 7, duration: 1, target: 'enemy' },
        { type: 'dot', element: 'feu', value: 7, duration: 2, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'dot', element: 'feu', value: 4, duration: 1, target: 'enemy' },
        { type: 'dot', element: 'feu', value: 4, duration: 2, target: 'enemy' }
    ]
}
move.sanjuroku_pondo_ho = {
    id: 'sanjuroku_pondo_ho',
    name: 'Sanjūroku Pondo Hō',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' },
        { type: 'damage', element: 'neutre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' },
        { type: 'damage', element: 'neutre', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.shishi_sonson = {
    id: 'shishi_sonson',
    name: 'Shishi Sonson',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 50, max: 50 }, currentHpScale: { stat: 'finalDamagePct', ratio: 0.5 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 50, max: 50 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 25, max: 25 }, currentHpScale: { stat: 'finalDamagePct', ratio: 0.5 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 25, max: 25 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' }
    ]
}

// -------- Kamikabz ---------------
move.frakaz_uf = {
    id: 'frakaz_uf',
    name: 'Frakazœuf',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 83, max: 97 }, target: 'enemy' }
    ]
}
move.aspibz = {
    id: 'aspibz',
    name: 'Aspibz',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 31, max: 35 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.bzimpact = {
    id: 'bzimpact',
    name: 'Bzimpact',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 20, max: 24 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 20, max: 24 }, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}

// -------- Gliglidoudur ---------------
move.charge_emotive = {
    id: 'charge_emotive',
    name: 'Charge Émotive',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.contraction = {
    id: 'contraction',
    name: 'Contraction',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'damageReductionPct', value: 25, duration: 3, target: 'enemy' }
    ]
}
move.rejet = {
    id: 'rejet',
    name: 'Rejet',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 21, max: 26 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 16, max: 21 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Uchiwang ---------------
move.toppu = {
    id: 'toppu',
    name: 'Toppū',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.futon = {
    id: 'futon',
    name: 'Fûton',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 35, max: 41 }, target: 'enemy' }
    ]
}
move.etreinte_du_vent = {
    id: 'etreinte_du_vent',
    name: 'Étreinte du Vent',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Darkli Moon ---------------
move.obscure_singerie = {
    id: 'obscure_singerie',
    name: 'Obscure Singerie',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 100, duration: 3, target: 'self' }
    ]
}

// -------- Branche Soignante ---------------
move.graine_vitalisante = {
    id: 'graine_vitalisante',
    name: 'Graine Vitalisante',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 51, target: 'self' }
    ]
}

// -------- Pougnette ---------------
move.pikette = {
    id: 'pikette',
    name: 'Pikette',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 601, max: 800 }, target: 'enemy' }
    ]
}

// -------- Malalfa ---------------
move.maleluia = {
    id: 'maleluia',
    name: 'Maléluia',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 51, max: 59 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.malarmiste = {
    id: 'malarmiste',
    name: 'Malarmiste',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}
move.malcooliser = {
    id: 'malcooliser',
    name: 'Malcooliser',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 5, duration: 3, target: 'self' },
        { type: 'avance', target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 10, duration: 3, target: 'self' },
        { type: 'avance', target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 15, duration: 3, target: 'self' },
        { type: 'avance', target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' }
    ]
}

// -------- Glutin malfaisant ---------------

// -------- Yokaï Givrefoux ---------------
move.fourre_tout = {
    id: 'fourre_tout',
    name: 'Fourre-tout',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 15, max: 15 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}
move.foutaise = {
    id: 'foutaise',
    name: 'Foutaise',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}

// -------- Maho Givrefoux ---------------
move.fourrage = {
    id: 'fourrage',
    name: 'Fourrage',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}
move.fourapin = {
    id: 'fourapin',
    name: 'Fourapin',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 91, max: 110 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Soryo Givrefoux ---------------
move.fouraille = {
    id: 'fouraille',
    name: 'Fouraille',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 31, max: 40 }, target: 'enemy' }
    ]
}
move.fourbissage = {
    id: 'fourbissage',
    name: 'Fourbissage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 41, max: 60 }, target: 'enemy' }
    ]
}

// -------- Yomi Givrefoux ---------------
move.fouguefoux = {
    id: 'fouguefoux',
    name: 'Fouguefoux',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 56, max: 65 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.fouille = {
    id: 'fouille',
    name: 'Fouille',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 50, target: 'self' }
    ]
}

// -------- Kami Givrefoux ---------------
move.foulette = {
    id: 'foulette',
    name: 'Foulette',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'force', value: 500, duration: 3, target: 'self' },
        { type: 'buff', stat: 'chance', value: 500, duration: 3, target: 'self' },
        { type: 'buff', stat: 'intelligence', value: 500, duration: 3, target: 'self' },
        { type: 'buff', stat: 'agility', value: 500, duration: 3, target: 'self' }
    ]
}
move.foux_de_la_fortune = {
    id: 'foux_de_la_fortune',
    name: 'Foux de la fortune',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 25, duration: 3, target: 'self' },
        { type: 'damage', element: 'neutre', damageHpPct: { source: 'casterMaxHp', pct: 20 }, target: 'enemy' }
    ]
}
move.foux_ou_rien = {
    id: 'foux_ou_rien',
    name: 'Foux ou rien',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'air', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Trezz ---------------
move.rayons_entravants = {
    id: 'rayons_entravants',
    name: 'Rayons entravants',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 66, max: 75 }, target: 'enemy' }
    ]
}
move.rebond_manque = {
    id: 'rebond_manque',
    name: 'Rebond manqué',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 66, max: 75 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Vindeux ---------------
move.massurance = {
    id: 'massurance',
    name: 'Massurance',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 51, max: 60 }, target: 'enemy' }
    ]
}
move.mecontentement = {
    id: 'mecontentement',
    name: 'Mécontentement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 51, max: 60 }, target: 'enemy' }
    ]
}

// -------- Trantroa ---------------
move.brute_haleine = {
    id: 'brute_haleine',
    name: 'Brute Haleine',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 33, max: 33 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}
move.poing_terne = {
    id: 'poing_terne',
    name: 'Poing terne',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 33, max: 33 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}

// -------- Seith ---------------
move.tourbete = {
    id: 'tourbete',
    name: 'Tourbête',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 20, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 20, max: 20 }, target: 'enemy' }
    ]
}
move.massue = {
    id: 'massue',
    name: 'Massue',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 20, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 20, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 20, max: 20 }, target: 'enemy' }
    ]
}

// -------- Soissanth ---------------
move.poinzon = {
    id: 'poinzon',
    name: 'Poinzon',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 45, max: 45 }, target: 'enemy' }
    ]
}
move.taplaudissement = {
    id: 'taplaudissement',
    name: 'Taplaudissement',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Pikténia ---------------
move.gyroskopik = {
    id: 'gyroskopik',
    name: 'Gyroskopik',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.pik_a_saut = {
    id: 'pik_a_saut',
    name: 'Pik à Saut',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}

// -------- Trémorse ---------------
move.coups_de_langues = {
    id: 'coups_de_langues',
    name: 'Coups de Langues',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}
move.avalement = {
    id: 'avalement',
    name: 'Avalement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'atk', value: 300, duration: 3, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.crachat_amer = {
    id: 'crachat_amer',
    name: 'Crachat Amer',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 10, duration: 3, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 31, max: 40 }, target: 'enemy' }
    ]
}

// -------- Masticroc ---------------
move.ensablage = {
    id: 'ensablage',
    name: 'Ensablage',
    cooldownMs: 2000,
    effects: [
        { type: 'esquive', chancePct: 40, reductionPct: 100, duration: 3, target: 'self' },
        { type: 'buff', stat: 'critChance', value: 100, duration: 3, target: 'self' },
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.surgissement = {
    id: 'surgissement',
    name: 'Surgissement',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.gueule_des_sables = {
    id: 'gueule_des_sables',
    name: 'Gueule des Sables',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}

// -------- Morsquale ---------------
move.charge_croquante = {
    id: 'charge_croquante',
    name: 'Charge Croquante',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'air', damage: { min: 15, max: 20 }, target: 'enemy' }
    ]
}
move.sable_tourbillonnant = {
    id: 'sable_tourbillonnant',
    name: 'Sable Tourbillonnant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}
move.pattes_harassent = {
    id: 'pattes_harassent',
    name: 'Pattes Harassent',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 80, target: 'self' }
    ]
}

// -------- Cycloporth ---------------
move.cephalonde = {
    id: 'cephalonde',
    name: 'Céphalonde',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}
move.volvation = {
    id: 'volvation',
    name: 'Volvation',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 0, duration: 3, target: 'self' }
    ]
}
move.aspiration_gourmande = {
    id: 'aspiration_gourmande',
    name: 'Aspiration Gourmande',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        // TODO: Minimise les effets aléatoires de la cible
    ]
}

// -------- Bras démoniaque ---------------
move.rhizome_demoniaque = {
    id: 'rhizome_demoniaque',
    name: 'Rhizome Démoniaque',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 69, max: 81 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' }
    ]
}
move.aplatissement_demoniaque = {
    id: 'aplatissement_demoniaque',
    name: 'Aplatissement Démoniaque',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 57, max: 67 }, target: 'enemy' }
    ]
}
move.revers_demoniaque = {
    id: 'revers_demoniaque',
    name: 'Revers Démoniaque',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 74, max: 86 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Quadrabz ---------------
move.vaporiz_uf = {
    id: 'vaporiz_uf',
    name: 'Vaporizœuf',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 65, max: 75 }, target: 'enemy' }
    ]
}
move.akuabz = {
    id: 'akuabz',
    name: 'Akuabz',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 42, max: 48 }, target: 'enemy' }
    ]
}
move.bzeklabouss = {
    id: 'bzeklabouss',
    name: 'Bzéklabouss',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 31, max: 35 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Mominotor ---------------
move.kanope = {
    id: 'kanope',
    name: 'Kanope',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}
move.malediction_du_mominotor = {
    id: 'malediction_du_mominotor',
    name: 'Malédiction du Mominotor',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 301, max: 350 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.embaumement = {
    id: 'embaumement',
    name: 'Embaumement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 41, max: 60 }, target: 'enemy' },
        { type: 'dot', element: 'air', value: 11, duration: 5, lifestealRatio: 0.1, target: 'enemy' },
    ]
}
move.lancer_de_degelee = {
    id: 'lancer_de_degelee',
    name: 'Lancer de Dégelée',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 11, max: 30 }, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Déminoboule ---------------
move.souffle_etourdissant = {
    id: 'souffle_etourdissant',
    name: 'Souffle Étourdissant',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 31, max: 50 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 201, duration: 3, target: 'enemy' }
    ]
}
move.coup_de_boulet = {
    id: 'coup_de_boulet',
    name: 'Coup de Boulet',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 41, max: 70 }, target: 'enemy' }
    ]
}
move.minorage = {
    id: 'minorage',
    name: 'Minorage',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 201, duration: 3, target: 'self' }
    ]
}
move.souffle_liberatoire = {
    id: 'souffle_liberatoire',
    name: 'Souffle Libératoire',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Tipoune ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Tipoude ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Tipoutre ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Capsaaloocke ---------------
move.lancenglante = {
    id: 'lancenglante',
    name: 'Lancenglanté',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'agility', value: 100, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'agility', value: 100, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.saut_du_bison = {
    id: 'saut_du_bison',
    name: 'Saut du Bison',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.eclaireurs = {
    id: 'eclaireurs',
    name: 'Éclaireurs',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' }
    ]
}

// -------- Serpyn ---------------
move.nimpitoyable = {
    id: 'nimpitoyable',
    name: 'Nimpitoyable',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 25, max: 29 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 1, duration: 2, target: 'enemy' },
        { type: 'buff', stat: 'spd', value: 1, duration: 2, target: 'self' },
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 4, target: 'self' },
    ]
}
move.nincendie = {
    id: 'nincendie',
    name: 'Nincendie',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 37, max: 43 }, target: 'enemy' }
    ]
}
move.ninstabilite = {
    id: 'ninstabilite',
    name: 'Ninstabilité',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 39, max: 45 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 39, max: 45 }, target: 'enemy' }
    ]
}

// -------- Champ à Gnons ---------------
move.fesse_de_loup = {
    id: 'fesse_de_loup',
    name: 'Fesse de loup',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.invasion_fongique = {
    id: 'invasion_fongique',
    name: 'Invasion fongique',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.acceleration_fongique = {
    id: 'acceleration_fongique',
    name: 'Accélération fongique',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Cadob' ---------------
move.invocation_de_cadob = {
    id: 'invocation_de_cadob',
    name: 'Invocation de Cadob\'',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.surprise_drainante = {
    id: 'surprise_drainante',
    name: 'Surprise drainante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 28, max: 32 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.surprise_empoisonnante = {
    id: 'surprise_empoisonnante',
    name: 'Surprise empoisonnante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 15, max: 18 }, target: 'enemy' }
    ]
}

// -------- Bwork Élémental de Feu ---------------
move.sollicitude_elementaire_fumeuse = {
    id: 'sollicitude_elementaire_fumeuse',
    name: 'Sollicitude Élémentaire Fumeuse',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.communion_elementaire = {
    id: 'communion_elementaire',
    name: 'Communion Élémentaire',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'maxHp', value: 200, duration: 2, target: 'self' }
    ]
}
move.poussiere_temporelle_bwork = {
    id: 'poussiere_temporelle_bwork',
    name: 'Poussière Temporelle Bwork',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 37, max: 48 }, target: 'enemy' }
    ]
}

// -------- Bwork Élémental d'Eau ---------------
move.larme_bwork = {
    id: 'larme_bwork',
    name: 'Larme Bwork',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.sollicitude_elementaire_aqueuse = {
    id: 'sollicitude_elementaire_aqueuse',
    name: 'Sollicitude Élémentaire Aqueuse',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Bwork Élémental d'Air ---------------
move.epee_celeste_bwork = {
    id: 'epee_celeste_bwork',
    name: 'Épée Céleste Bwork',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 200, duration: 3, target: 'enemy' }
    ]
}
move.sollicitude_elementaire_venteuse = {
    id: 'sollicitude_elementaire_venteuse',
    name: 'Sollicitude Élémentaire Venteuse',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Bwork Élémental de Terre ---------------
move.epee_du_bwork = {
    id: 'epee_du_bwork',
    name: 'Épée du Bwork',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.sollicitude_elementaire_terreuse = {
    id: 'sollicitude_elementaire_terreuse',
    name: 'Sollicitude Élémentaire Terreuse',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Peluche wabbit ---------------
move.rembourrage = {
    id: 'rembourrage',
    name: 'Rembourrage',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 201, target: 'self' },
        { type: 'heal', heal: 101, target: 'self' },
        { type: 'heal', heal: 401, target: 'self' }
    ]
}
move.malediction_de_la_cawotte = {
    id: 'malediction_de_la_cawotte',
    name: 'Malédiction de la Cawotte',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'antiHeal', duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'maxHp', value: 800, duration: 3, target: 'self' }
    ]
}
move.cawotte_de_nowel = {
    id: 'cawotte_de_nowel',
    name: 'Cawotte de Nowel',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Tromperelle ---------------
move.volve_paralysante = {
    id: 'volve_paralysante',
    name: 'Volve paralysante',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.soufflette_sporadique = {
    id: 'soufflette_sporadique',
    name: 'Soufflette sporadique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'renvoi', ratio: 0.5, target: 'self' }
    ]
}
move.thalle_neutralisant = {
    id: 'thalle_neutralisant',
    name: 'Thalle neutralisant',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'flatDamage', value: 5, duration: 3, target: 'enemy' }
    ]
}

// -------- Champaknyde ---------------
move.graphiose = {
    id: 'graphiose',
    name: 'Graphiose',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damageHpPct: { source: 'casterMaxHp', pct: 1 }, target: 'enemy' }
    ]
}
move.fong_ku = {
    id: 'fong_ku',
    name: 'Fong Ku',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 11, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 11, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 11, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 11, max: 20 }, target: 'enemy' }
    ]
}
move.mycose_toujours = {
    id: 'mycose_toujours',
    name: 'Mycose toujours',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 20, target: 'self' }
    ]
}

// -------- Champodonte ---------------
move.mildiou = {
    id: 'mildiou',
    name: 'Mildiou',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 11, max: 20 }, target: 'enemy' }
    ]
}
move.amanite_roglicerine = {
    id: 'amanite_roglicerine',
    name: 'Amanite roglicérine',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'neutre', damageHpPct: { source: 'casterMaxHp', pct: 10 }, target: 'enemy' }
    ]
}
move.cepe_harti = {
    id: 'cepe_harti',
    name: 'Cèpe Harti',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 50, duration: 3, target: 'self' }
    ]
}

// -------- Champmane ---------------
move.sanction_fongique = {
    id: 'sanction_fongique',
    name: 'Sanction fongique',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'neutre', value: 17, duration: 3, target: 'enemy' }
    ]
}
move.soin_fongique = {
    id: 'soin_fongique',
    name: 'Soin fongique',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 21, target: 'self' },
        { type: 'heal', heal: 50, target: 'self' }
    ]
}
move.protection_fongique = {
    id: 'protection_fongique',
    name: 'Protection fongique',
    cooldownMs: 2000,
    effects: [
        { type: 'renvoi', ratio: 0.5, target: 'self' }
    ]
}

// -------- Champbis ---------------
move.spore_de_combat = {
    id: 'spore_de_combat',
    name: 'Spore de Combat',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 11, max: 20 }, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 25, duration: 3, target: 'enemy' }
    ]
}
move.mikota = {
    id: 'mikota',
    name: 'Mikota',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 50, duration: 3, target: 'self' }
    ]
}
move.levure = {
    id: 'levure',
    name: 'Levure',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Dramanite ---------------
move.spore_kepic = {
    id: 'spore_kepic',
    name: 'Spore Képic',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 56, max: 65 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.marasme = {
    id: 'marasme',
    name: 'Marasme',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.spore_teille = {
    id: 'spore_teille',
    name: 'Spore Teille',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 1000, target: 'self' },
        { type: 'buff', stat: 'flatDamage', value: 300, duration: 3, target: 'self' }
    ]
}

// -------- Fistulor ---------------
move.cepe_tique = {
    id: 'cepe_tique',
    name: 'Cèpe Tique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 46, max: 55 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.ami_celium = {
    id: 'ami_celium',
    name: 'Ami Célium',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 66, max: 75 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.spore_heole = {
    id: 'spore_heole',
    name: 'Spore Héole',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 10, target: 'self' }
    ]
}

// -------- Fongeur ---------------
move.spore_tafaux = {
    id: 'spore_tafaux',
    name: 'Spore Tafaux',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 10, max: 10 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}
move.volve_herine = {
    id: 'volve_herine',
    name: 'Volve Hérine',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 100, duration: 3, target: 'self' }
    ]
}

// -------- Abrazif ---------------
move.spore_d_oeuvre = {
    id: 'spore_d_oeuvre',
    name: 'Spore d\'oeuvre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 56, max: 65 }, target: 'enemy' }
    ]
}
move.spore_celaine = {
    id: 'spore_celaine',
    name: 'Spore Celaine',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.spore_taporte = {
    id: 'spore_taporte',
    name: 'Spore Taporte',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 100, duration: 3, target: 'self' }
    ]
}

// -------- Motte ---------------
move.hokulteur = {
    id: 'hokulteur',
    name: 'Hokulteur',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 100, max: 100 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 10, duration: 3, target: 'self' }
    ]
}
move.hivation = {
    id: 'hivation',
    name: 'Hivation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 100, max: 100 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 10, duration: 3, target: 'self' }
    ]
}
move.husse = {
    id: 'husse',
    name: 'Husse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 100, max: 100 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' }
    ]
}

// -------- Mérulette ---------------
move.merule_tihme = {
    id: 'merule_tihme',
    name: 'Mérule Tihme',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 56, max: 65 }, target: 'enemy' }
    ]
}
move.merule_saire = {
    id: 'merule_saire',
    name: 'Mérule Saire',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 66, max: 75 }, target: 'enemy' },
        { type: 'antiHeal', duration: 3, target: 'enemy' }
    ]
}

// -------- Scoliopode ---------------
move.coup_percutant = {
    id: 'coup_percutant',
    name: 'Coup percutant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 66, max: 75 }, target: 'enemy' }
    ]
}
move.salivraison = {
    id: 'salivraison',
    name: 'Salivraison',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 56, max: 65 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 15, duration: 3, target: 'self' }
    ]
}

// -------- Puceronde ---------------
move.langagement = {
    id: 'langagement',
    name: 'Langagement',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.brazero = {
    id: 'brazero',
    name: 'Brazéro',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 30, max: 30 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}
move.largage_personnel = {
    id: 'largage_personnel',
    name: 'Largage personnel',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 41, max: 46 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 50, max: 50 }, erodedHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}

// -------- Lucrane ---------------
move.offensiviere = {
    id: 'offensiviere',
    name: 'Offensivière',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 41, max: 46 }, target: 'enemy' }
    ]
}

// -------- Éperfide ---------------
move.etoile_d_arakne = {
    id: 'etoile_d_arakne',
    name: 'Etoile d\'arakne',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 41, max: 46 }, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.brulurgence = {
    id: 'brulurgence',
    name: 'Brûlurgence',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 41, max: 46 }, target: 'enemy' }
    ]
}
move.drain = {
    id: 'drain',
    name: 'Drain',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 66, max: 75 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Morfrelon ---------------
move.dardagnan = {
    id: 'dardagnan',
    name: 'Dardagnan',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 66, max: 70 }, target: 'enemy' }
    ]
}
move.plongeon_quille = {
    id: 'plongeon_quille',
    name: 'Plongeon quille',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 61, max: 70 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 3, duration: 2, target: 'enemy' },
        { type: 'buff', stat: 'spd', value: 3, duration: 2, target: 'self' }
    ]
}

// -------- Bakazako ---------------
move.hogo = {
    id: 'hogo',
    name: 'Hogo',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.kaba = {
    id: 'kaba',
    name: 'Kabā',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.suimin_mahi = {
    id: 'suimin_mahi',
    name: 'Suimin mahi',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 51, max: 60 }, target: 'enemy' }
    ]
}
move.kazkou = {
    id: 'kazkou',
    name: 'Kazkou',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 39, max: 45 }, target: 'enemy' }
    ]
}

// -------- Tsume-bozu ---------------
move.slurp = {
    id: 'slurp',
    name: 'Slurp',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}
move.yokaspiration = {
    id: 'yokaspiration',
    name: 'Yokaspiration',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 46, max: 54 }, target: 'enemy' }
    ]
}
move.lourde_langue = {
    id: 'lourde_langue',
    name: 'Lourde langue',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 32, max: 38 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Proto-Noxine ---------------
move.bombe_mecanique = {
    id: 'bombe_mecanique',
    name: 'Bombe Mécanique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 43, max: 49 }, target: 'enemy' }
    ]
}

// -------- Craqueleur des glaces ---------------
move.pic_de_glace = {
    id: 'pic_de_glace',
    name: 'Pic de glace',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 22, max: 26 }, target: 'enemy' }
    ]
}
move.ecrasement_glacial = {
    id: 'ecrasement_glacial',
    name: 'Écrasement glacial',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 32, max: 36 }, target: 'enemy' }
    ]
}
move.glace_paralysante = {
    id: 'glace_paralysante',
    name: 'Glace paralysante',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'neutre', value: 28, duration: 2, target: 'enemy' }
    ]
}

// -------- Boufronde ---------------
move.nimpuissance = {
    id: 'nimpuissance',
    name: 'Nimpuissance',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 31, max: 37 }, target: 'enemy' }
    ]
}
move.nincarceration = {
    id: 'nincarceration',
    name: 'Nincarcération',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.ninsolence = {
    id: 'ninsolence',
    name: 'Ninsolence',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 37, max: 43 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 37, max: 43 }, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 15, duration: 3, target: 'enemy' }
    ]
}

// -------- Balebz ---------------
move.exploz_uf = {
    id: 'exploz_uf',
    name: 'Explozœuf',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 79, max: 91 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 79, max: 91 }, target: 'enemy' }
    ]
}
move.vampibombz = {
    id: 'vampibombz',
    name: 'Vampibombz',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 32, max: 38 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.aegibz = {
    id: 'aegibz',
    name: 'Aegibz',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}

// -------- Kwakao surdosé ---------------

// -------- Sporakne ---------------
move.adehede = {
    id: 'adehede',
    name: 'Adéhédé',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Gobus ---------------
move.gobstruction = {
    id: 'gobstruction',
    name: 'Gobstruction',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 1001, max: 1500 }, target: 'enemy' }
    ]
}
move.gobtimisation = {
    id: 'gobtimisation',
    name: 'Gobtimisation',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 200, duration: 3, target: 'self' }
    ]
}

// -------- Cybwork ---------------
move.pulsation = {
    id: 'pulsation',
    name: 'Pulsation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 71, max: 90 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.cybarmure = {
    id: 'cybarmure',
    name: 'Cybarmure',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 20, duration: 2, target: 'self' },
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}

// -------- Abominable yiti des neiges ---------------
move.assaisonnement = {
    id: 'assaisonnement',
    name: 'Assaisonnement',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.gueuleton = {
    id: 'gueuleton',
    name: 'Gueuleton',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 30, max: 34 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.colere_du_yiti = {
    id: 'colere_du_yiti',
    name: 'Colère du yiti',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}

// -------- Apériglours ---------------
move.miellat = {
    id: 'miellat',
    name: 'Miellat',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 10, duration: 3, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 71, max: 80 }, target: 'enemy' },
        { type: 'antiHeal', duration: 3, target: 'enemy' }
    ]
}
move.nectar = {
    id: 'nectar',
    name: 'Nectar',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 36, target: 'self' }
    ]
}

// -------- Boulglours ---------------
move.fructose = {
    id: 'fructose',
    name: 'Fructose',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 86, max: 95 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.glucause_perdue = {
    id: 'glucause_perdue',
    name: 'Glucause perdue',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 66, max: 75 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Gloursaya ---------------
move.butinage = {
    id: 'butinage',
    name: 'Butinage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 66, max: 75 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.trophallaxie = {
    id: 'trophallaxie',
    name: 'Trophallaxie',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.propolis = {
    id: 'propolis',
    name: 'Propolis',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 100, duration: 3, target: 'self' }
    ]
}

// -------- Blérauve ---------------
move.detente = {
    id: 'detente',
    name: 'Détente',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 76, max: 85 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.biste = {
    id: 'biste',
    name: 'Biste',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 66, max: 75 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.hanque = {
    id: 'hanque',
    name: 'Hanque',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'maxHp', value: 500, duration: 3, target: 'self' }
    ]
}

// -------- Wolvero ---------------
move.glouton = {
    id: 'glouton',
    name: 'Glouton',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 66, max: 75 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.griffemort = {
    id: 'griffemort',
    name: 'Griffemort',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 20, max: 20 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}
move.mantium = {
    id: 'mantium',
    name: 'Mantium',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 150, target: 'self' }
    ]
}

// -------- Croleur ---------------
move.acrobatie = {
    id: 'acrobatie',
    name: 'Acrobatie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 76, max: 85 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.ombre = {
    id: 'ombre',
    name: 'Ombre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 46, max: 55 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 4, duration: 2, target: 'enemy' },
        { type: 'buff', stat: 'spd', value: 4, duration: 2, target: 'self' }
    ]
}
move.fugue = {
    id: 'fugue',
    name: 'Fugue',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' }
    ]
}

// -------- Gobosteur ---------------
move.piolaid = {
    id: 'piolaid',
    name: 'Piolaid',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 31, max: 40 }, target: 'enemy' }
    ]
}
move.piochekour = {
    id: 'piochekour',
    name: 'Piochekour',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 50, duration: 3, target: 'self' }
    ]
}
move.piochetron = {
    id: 'piochetron',
    name: 'Piochetron',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Sapeur ---------------
move.lipopette = {
    id: 'lipopette',
    name: 'Lipopette',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 50 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 25, duration: 3, target: 'self' }
    ]
}
move.nicheuze = {
    id: 'nicheuze',
    name: 'Nicheuze',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 16, max: 25 }, target: 'enemy' }
    ]
}

// -------- Ouilleur ---------------
move.daipe = {
    id: 'daipe',
    name: 'Daipe',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 46, max: 60 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.shatte = {
    id: 'shatte',
    name: 'Shatte',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 50, target: 'self' },
        { type: 'buff', stat: 'flatDamage', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'critChance', value: 50, duration: 3, target: 'self' }
    ]
}
move.krape = {
    id: 'krape',
    name: 'Krape',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 21, target: 'self' },
        { type: 'heal', heal: 41, target: 'self' }
    ]
}

// -------- Perkü ---------------
move.djatte = {
    id: 'djatte',
    name: 'Djatte',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 46, max: 65 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}
move.beni = {
    id: 'beni',
    name: 'Béni',
    cooldownMs: 2000,
    effects: [
        // TODO: Maximise les effets aléatoires sur la cible
        { type: 'buff', stat: 'flatDamage', value: 50, duration: 3, target: 'self' }
    ]
}
move.lautte = {
    id: 'lautte',
    name: 'Lautte',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Courtilieur ---------------
move.minage = {
    id: 'minage',
    name: 'Minage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 26, max: 35 }, target: 'enemy' }
    ]
}
move.detourage = {
    id: 'detourage',
    name: 'Détourage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 26, max: 35 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.chaupage = {
    id: 'chaupage',
    name: 'Chaupage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 10, max: 10 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Fleuro ---------------
move.pyro = {
    id: 'pyro',
    name: 'Pyro',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 26, max: 35 }, target: 'enemy' }
    ]
}
move.charbon = {
    id: 'charbon',
    name: 'Charbon',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 46, max: 55 }, target: 'enemy' },
        { type: 'debuff', stat: 'flatDamage', value: 200, duration: 3, target: 'enemy' }
    ]
}

// -------- Blérice ---------------
move.hydrokinesie = {
    id: 'hydrokinesie',
    name: 'Hydrokinésie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 66, max: 75 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.thermokinesie = {
    id: 'thermokinesie',
    name: 'Thermokinésie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 46, max: 55 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Glourmand ---------------
move.glourmandale = {
    id: 'glourmandale',
    name: 'Glourmandale',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 86, max: 95 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.glourmandise = {
    id: 'glourmandise',
    name: 'Glourmandise',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 56, max: 65 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'recul', target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.gloursbi_boulga = {
    id: 'gloursbi_boulga',
    name: 'Gloursbi-boulga',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Glouragan ---------------
move.gloursonde = {
    id: 'gloursonde',
    name: 'Gloursonde',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 86, max: 95 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 5, max: 5 }, currentHpScale: { stat: 'finalDamagePct', ratio: 0.5 }, target: 'enemy' }
    ]
}
move.glourdavu = {
    id: 'glourdavu',
    name: 'Glourdavu',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 56, max: 65 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 3, max: 3 }, currentHpScale: { stat: 'finalDamagePct', ratio: 0.5 }, target: 'enemy' },
        { type: 'heal', heal: 16, target: 'self' }
    ]
}

// -------- Noctulule ---------------
move.timatum = {
    id: 'timatum',
    name: 'Timatum',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.bouligane = {
    id: 'bouligane',
    name: 'Bouligane',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Panterreur ---------------
move.planque = {
    id: 'planque',
    name: 'Planque',
    cooldownMs: 2000,
    effects: [
        { type: 'esquive', chancePct: 40, reductionPct: 100, duration: 3, target: 'self' },
        { type: 'renvoi', ratio: 0.5, target: 'self' }
    ]
}
move.vent_d_etat = {
    id: 'vent_d_etat',
    name: 'Vent d\'état',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 81, max: 100 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.mesquinerie = {
    id: 'mesquinerie',
    name: 'Mesquinerie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Brutopak ---------------
move.brutalite = {
    id: 'brutalite',
    name: 'Brutalité',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 41, max: 60 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.mesquin_pacte = {
    id: 'mesquin_pacte',
    name: 'Mesquin Pacte',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Caznoar ---------------
move.detentrave = {
    id: 'detentrave',
    name: 'Détentrave',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.beclipse = {
    id: 'beclipse',
    name: 'Beclipse',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 51, max: 70 }, target: 'enemy' }
    ]
}
move.aigriffure = {
    id: 'aigriffure',
    name: 'Aigriffure',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 101, max: 120 }, target: 'enemy' },
        { type: 'buffDrain', value: 2, target: 'enemy' }
    ]
}

// -------- Sombléro ---------------
move.vaguichage = {
    id: 'vaguichage',
    name: 'Vaguichage',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'spd', value: 10, duration: 2, target: 'self' },
        { type: 'buff', stat: 'spd', value: 20, duration: 3, target: 'self' },
        { type: 'buff', stat: 'atk', value: 200, duration: 3, target: 'self' },
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'spd', value: 10, duration: 2, target: 'self' }
    ]
}
move.faille = {
    id: 'faille',
    name: 'Faille',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'damageReductionPct', value: 10, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 51, max: 70 }, target: 'enemy' }
    ]
}

// -------- Viandargh ---------------
move.saute_de_viande = {
    id: 'saute_de_viande',
    name: 'Sauté de Viande',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 61, max: 70 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 71, max: 80 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 81, max: 90 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 91, max: 100 }, target: 'enemy' }
    ]
}
move.viande_hachee = {
    id: 'viande_hachee',
    name: 'Viande Hachée',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 61, max: 70 }, target: 'enemy' },
        { type: 'heal', heal: 70, target: 'self' }
    ]
}
move.appater = {
    id: 'appater',
    name: 'Appâter',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 400, duration: 3, target: 'enemy' }
    ]
}

// -------- Chevrotine ---------------
move.tir_au_juge = {
    id: 'tir_au_juge',
    name: 'Tir au Jugé',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}
move.invocation_de_chienchien_courant = {
    id: 'invocation_de_chienchien_courant',
    name: 'Invocation de Chienchien Courant',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.dressage = {
    id: 'dressage',
    name: 'Dressage',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'maxHp', value: 200, duration: 2, target: 'self' },
        { type: 'buff', stat: 'maxHp', value: 200, duration: 2, target: 'self' }
    ]
}

// -------- Brokouillon ---------------
move.pandanois = {
    id: 'pandanois',
    name: 'Pandanois',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.pistage = {
    id: 'pistage',
    name: 'Pistage',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.hors_piste = {
    id: 'hors_piste',
    name: 'Hors Piste',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 51, max: 60 }, target: 'enemy' }
    ]
}

// -------- Nemroz ---------------
move.trempe_jusqu_a_l_eau = {
    id: 'trempe_jusqu_a_l_eau',
    name: 'Trempé jusqu\'à l\'Eau',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 51, max: 60 }, target: 'enemy' }
    ]
}
move.piege_erosif = {
    id: 'piege_erosif',
    name: 'Piège Érosif',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.piege_eblouissant = {
    id: 'piege_eblouissant',
    name: 'Piège Éblouissant',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Crâmbo ---------------
move.premier_sang = {
    id: 'premier_sang',
    name: 'Premier Sang',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 61, max: 70 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 101, max: 120 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 121, max: 140 }, target: 'enemy' }
    ]
}
move.lampe_bleue = {
    id: 'lampe_bleue',
    name: 'Lampe Bleue',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 200, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.uranus = {
    id: 'uranus',
    name: 'Uranus',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Madura ---------------
move.negai = {
    id: 'negai',
    name: 'Negai',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.zudzuki_bozu = {
    id: 'zudzuki_bozu',
    name: 'Zudzuki Bozu',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}
move.furue = {
    id: 'furue',
    name: 'Furue',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 54, max: 62 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.negai_o_kanaeru = {
    id: 'negai_o_kanaeru',
    name: 'Negai o kanaeru',
    cooldownMs: 2000,
    effects: [
        { type: 'heal%maxHp', value: 12, target: 'self' },
    ]
}

// -------- Kruorre le Chafer Haï ---------------
move.chafouette = {
    id: 'chafouette',
    name: 'Chafouette',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 100, duration: 3, target: 'self' }
    ]
}
move.charnaque = {
    id: 'charnaque',
    name: 'Charnaque',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 31, max: 35 }, target: 'enemy' }
    ]
}
move.invisibilite_alpha = {
    id: 'invisibilite_alpha',
    name: 'Invisibilité Alpha',
    cooldownMs: 2000,
    effects: [
        { type: 'esquive', chancePct: 40, reductionPct: 100, duration: 3, target: 'self' },
        { type: 'buff', stat: 'critDamagePct', value: 50, duration: 3, target: 'self' }
    ]
}
move.coup_mortel_du_chafer = {
    id: 'coup_mortel_du_chafer',
    name: 'Coup mortel du Chafer',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 41, max: 45 }, target: 'enemy' }
    ]
}

// -------- Germinion ---------------

// -------- Typhomet ---------------
move.faux_ouragan = {
    id: 'faux_ouragan',
    name: 'Faux-Ouragan',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 68, max: 80 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.regard_de_l_heretique = {
    id: 'regard_de_l_heretique',
    name: 'Regard de l\'Hérétique',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.resistance_du_tartare = {
    id: 'resistance_du_tartare',
    name: 'Résistance du Tartare',
    cooldownMs: 2000,
    effects: [
        { type: 'renvoi', ratio: 0.5, target: 'self' },
    ]
}

// -------- Marthos ---------------
move.ninsipide = {
    id: 'ninsipide',
    name: 'Ninsipide',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 21, max: 29 }, target: 'enemy' }
    ]
}
move.nimparable = {
    id: 'nimparable',
    name: 'Nimparable',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 43, max: 49 }, target: 'enemy' }
    ]
}
move.ninstantane = {
    id: 'ninstantane',
    name: 'Ninstantané',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 56, max: 65 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 56, max: 65 }, target: 'enemy' }
    ]
}

// -------- Bébé Gyrafor ---------------
move.kilinmandjaro = {
    id: 'kilinmandjaro',
    name: 'Kilinmandjaro',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.cou_ragan = {
    id: 'cou_ragan',
    name: 'Cou Ragan',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.gyvoirien = {
    id: 'gyvoirien',
    name: 'Gyvoirien',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 51, max: 65 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.kilin_tor = {
    id: 'kilin_tor',
    name: 'Kilin Tor',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'critChance', value: 50, duration: 3, target: 'enemy' }
    ]
}

// -------- Bébé Lapilope ---------------
move.lapopotin = {
    id: 'lapopotin',
    name: 'Lapopotin',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 51, max: 70 }, target: 'enemy' }
    ]
}
move.lagomorsure = {
    id: 'lagomorsure',
    name: 'Lagomorsure',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 10, duration: 3, target: 'self' },
        { type: 'damage', element: 'neutre', damage: { min: 56, max: 70 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'recul', target: 'enemy' }
    ]
}
move.koudulapin = {
    id: 'koudulapin',
    name: 'Koudulapin',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 61, max: 70 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.rabitole = {
    id: 'rabitole',
    name: 'Rabitole',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}

// -------- Bébé Brutapir ---------------
move.tapirateur = {
    id: 'tapirateur',
    name: 'Tapirateur',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'heal%maxHp', value: 8, target: 'self' },
        { type: 'damage', element: 'air', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.tapirogue = {
    id: 'tapirogue',
    name: 'Tapirogue',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 41, max: 60 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.tapirouge = {
    id: 'tapirouge',
    name: 'Tapirouge',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'heal', heal: 51, target: 'self' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.tapiroulant = {
    id: 'tapiroulant',
    name: 'Tapiroulant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Bébé Gropotam ---------------
move.barbotam = {
    id: 'barbotam',
    name: 'Barbotam',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'debuff', stat: 'critChance', value: 25, duration: 3, target: 'enemy' }
    ]
}
move.hajimeno_hippo = {
    id: 'hajimeno_hippo',
    name: 'Hajimeno Hippo',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.hippo_faringit = {
    id: 'hippo_faringit',
    name: 'Hippo Faringit',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'air', value: 41, duration: 2, target: 'enemy' }
    ]
}
move.kornofulgur = {
    id: 'kornofulgur',
    name: 'Kornofulgur',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 46, max: 60 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'critDamagePct', value: 40, duration: 3, target: 'enemy' }
    ]
}

// -------- Bébé Amphibouc ---------------
move.crapaud_belier = {
    id: 'crapaud_belier',
    name: 'Crapaud-Bélier',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 51, max: 70 }, target: 'enemy' }
    ]
}
move.batrattaque = {
    id: 'batrattaque',
    name: 'Batrattaque',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 26, max: 35 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 26, max: 35 }, target: 'enemy' }
    ]
}
move.perlambouc = {
    id: 'perlambouc',
    name: 'Perlambouc',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.cornebouc = {
    id: 'cornebouc',
    name: 'Cornebouc',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' }
    ]
}

// -------- Œuf de la Mort ---------------
move.attirance_de_la_mort = {
    id: 'attirance_de_la_mort',
    name: 'Attirance de la Mort',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Globilum ---------------
move.projection_ombreuse = {
    id: 'projection_ombreuse',
    name: 'Projection ombreuse',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Mansocolat surdosé ---------------

// -------- Chocoskargo surdosé ---------------

// -------- Blérom ---------------
move.carnage = {
    id: 'carnage',
    name: 'Carnage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 66, max: 75 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.toxin = {
    id: 'toxin',
    name: 'Toxin',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 500, target: 'self' }
    ]
}

// -------- Meliglours ---------------
move.glours_contre_la_montre = {
    id: 'glours_contre_la_montre',
    name: 'Glours contre la montre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 76, max: 85 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.gloursombilical = {
    id: 'gloursombilical',
    name: 'Gloursombilical',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'maxHp', value: 1000, duration: 3, target: 'self' }
    ]
}

// -------- Diabélial ---------------
move.langue_demoniaque = {
    id: 'langue_demoniaque',
    name: 'Langue Démoniaque',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 28, max: 32 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.tissu_de_mensonges = {
    id: 'tissu_de_mensonges',
    name: 'Tissu de Mensonges',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 40, max: 46 }, target: 'enemy' }
    ]
}
move.torrent_diabolique = {
    id: 'torrent_diabolique',
    name: 'Torrent Diabolique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 37, max: 43 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 37, max: 43 }, target: 'enemy' }
    ]
}

// -------- Onigori ---------------
move.gloutonnerie = {
    id: 'gloutonnerie',
    name: 'Gloutonnerie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 21, max: 24 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 21, max: 24 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.onnichiwa = {
    id: 'onnichiwa',
    name: 'Onnichiwa',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 18, max: 21 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 18, max: 21 }, target: 'enemy' }
    ]
}
move.kanabo_jutsu = {
    id: 'kanabo_jutsu',
    name: 'Kanabō-jutsu',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 12, max: 14 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 12, max: 14 }, target: 'enemy' }
    ]
}

// -------- Épée Géante ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Stratège Dompteur ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Dagon des Profondeurs ---------------
move.souffle_chaud = {
    id: 'souffle_chaud',
    name: 'Souffle Chaud',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 81, max: 100 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 81, max: 100 }, target: 'enemy' }
    ]
}
move.charge_aquatique = {
    id: 'charge_aquatique',
    name: 'Charge Aquatique',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Auroraire ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Malice ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Voapah ---------------
move.saut_a_l_aveugle = {
    id: 'saut_a_l_aveugle',
    name: 'Saut à l\'aveugle',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 41, max: 60 }, target: 'enemy' }
    ]
}
move.tornade_sanglante = {
    id: 'tornade_sanglante',
    name: 'Tornade sanglante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}
move.uppercut_brulant = {
    id: 'uppercut_brulant',
    name: 'Uppercut brûlant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 61, max: 80 }, target: 'enemy' }
    ]
}

// -------- Caïguille ---------------
move.prison_sanguine = {
    id: 'prison_sanguine',
    name: 'Prison sanguine',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.jeu_d_aiguilles = {
    id: 'jeu_d_aiguilles',
    name: 'Jeu d\'aiguilles',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 41, max: 55 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' }
    ]
}
move.dagyde_ensorcelee = {
    id: 'dagyde_ensorcelee',
    name: 'Dagyde ensorcelée',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Lunorbe ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Octolithe ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Armécréante ---------------
move.ancrepulsion = {
    id: 'ancrepulsion',
    name: 'Ancrépulsion',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 61, max: 70 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.domestication = {
    id: 'domestication',
    name: 'Domestication',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 61, max: 70 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' }
    ]
}

// -------- Iopprimé ---------------
move.traumasque = {
    id: 'traumasque',
    name: 'Traumasque',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 56, max: 70 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.moribond = {
    id: 'moribond',
    name: 'Moribond',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.barbarie = {
    id: 'barbarie',
    name: 'Barbarie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 61, max: 75 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Marteau Géant ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Hache Géante ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Morgenstern Géant ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Ravalame ---------------
move.psyclope = {
    id: 'psyclope',
    name: 'Psyclope',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 56, max: 70 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.pluie_de_lames = {
    id: 'pluie_de_lames',
    name: 'Pluie de Lames',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 66, max: 80 }, target: 'enemy' }
    ]
}

// -------- Fléaunide ---------------
move.esprit_destructeur = {
    id: 'esprit_destructeur',
    name: 'Esprit Destructeur',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}
move.cerebrute = {
    id: 'cerebrute',
    name: 'Cérébrute',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 51, max: 60 }, target: 'enemy' }
    ]
}
move.mortification = {
    id: 'mortification',
    name: 'Mortification',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 10, duration: 3, target: 'enemy' }
    ]
}

// -------- Olgoth ---------------
move.olguropoing = {
    id: 'olguropoing',
    name: 'Olguropoing',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 46, max: 60 }, target: 'enemy' }
    ]
}
move.presse = {
    id: 'presse',
    name: 'Presse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 61, max: 75 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.seisme = {
    id: 'seisme',
    name: 'Séisme',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 61, max: 75 }, target: 'enemy' }
    ]
}

// -------- Macabrateur ---------------
move.decoupe = {
    id: 'decoupe',
    name: 'Découpe',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 61, max: 75 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.hache_tirante = {
    id: 'hache_tirante',
    name: 'Hache-Tirante',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 81, max: 95 }, target: 'enemy' }
    ]
}

// -------- Trancharnier ---------------
move.euphorage = {
    id: 'euphorage',
    name: 'Euphorage',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.catacombe = {
    id: 'catacombe',
    name: 'Catacombe',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.decharner = {
    id: 'decharner',
    name: 'Décharner',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 61, max: 70 }, target: 'enemy' },
        { type: 'debuff', stat: 'critChance', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Kaonashi ---------------
move.noroi = {
    id: 'noroi',
    name: 'Noroi',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 75, max: 75 }, currentHpScale: { stat: 'finalDamagePct', ratio: 0.5 }, target: 'enemy' }
    ]
}
move.kaonashi_no_numa = {
    id: 'kaonashi_no_numa',
    name: 'Kaonashi no numa',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 47, max: 57 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 65, max: 75 }, target: 'enemy' }
    ]
}
move.kara_no = {
    id: 'kara_no',
    name: 'Kara no',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'maxHp', value: 200, duration: 2, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 28, max: 32 }, target: 'enemy' }
    ]
}
move.shunshin_no_shisui = {
    id: 'shunshin_no_shisui',
    name: 'Shunshin no Shisui',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' }
    ]
}

// -------- Imushin ---------------
move.shikigami_no_mai = {
    id: 'shikigami_no_mai',
    name: 'Shikigami No Mai',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 35, max: 39 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 43, max: 48 }, target: 'enemy' }
    ]
}
move.oriken = {
    id: 'oriken',
    name: 'Oriken',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'heal', heal: 50, target: 'self' }
    ]
}
move.aerogami = {
    id: 'aerogami',
    name: 'Aérogami',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 36, max: 45 }, target: 'enemy' }
    ]
}

// -------- Imorok ---------------
move.chute_de_papier = {
    id: 'chute_de_papier',
    name: 'Chute de Papier',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 200, duration: 3, target: 'enemy' }
    ]
}
move.pli_de_la_vallee = {
    id: 'pli_de_la_vallee',
    name: 'Pli de la Vallée',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 51, max: 70 }, target: 'enemy' }
    ]
}

// -------- Imiyama ---------------
move.ronces_de_papier = {
    id: 'ronces_de_papier',
    name: 'Ronces de Papier',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 9, max: 12 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 9, max: 12 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 9, max: 12 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 9, max: 12 }, target: 'enemy' }
    ]
}
move.kusudama = {
    id: 'kusudama',
    name: 'Kusudama',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 21, target: 'self' },
        { type: 'heal', heal: 31, target: 'self' },
        { type: 'heal', heal: 41, target: 'self' }
    ]
}
move.legende_des_mille_cygrues = {
    id: 'legende_des_mille_cygrues',
    name: 'Légende des Mille Cygrues',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'heal', heal: 31, target: 'self' }
    ]
}

// -------- Imetsu ---------------
move.shidekami = {
    id: 'shidekami',
    name: 'Shidekami',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.sonobe = {
    id: 'sonobe',
    name: 'Sonobe',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 31, max: 40 }, target: 'enemy' }
    ]
}
move.piege_de_miura = {
    id: 'piege_de_miura',
    name: 'Piège de Miura',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Imafugo ---------------
move.inspiration_creatrice = {
    id: 'inspiration_creatrice',
    name: 'Inspiration Créatrice',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' }
    ]
}
move.go_o_hanma = {
    id: 'go_o_hanma',
    name: 'Go-o Hanmā',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 51, max: 65 }, target: 'enemy' }
    ]
}
move.ressho_no_kiba = {
    id: 'ressho_no_kiba',
    name: 'Resshō No Kiba',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Shinlam ---------------
move.lames_noires = {
    id: 'lames_noires',
    name: 'Lames Noires',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 38, max: 44 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 45, max: 53 }, target: 'enemy' }
    ]
}
move.shurigami = {
    id: 'shurigami',
    name: 'Shurigami',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 48, max: 56 }, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 5, duration: 3, target: 'self' }
    ]
}
move.encrepulsion = {
    id: 'encrepulsion',
    name: 'Encrépulsion',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 31, max: 35 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Rokoram ---------------
move.gakuya = {
    id: 'gakuya',
    name: 'Gakuya',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}
move.encroulement = {
    id: 'encroulement',
    name: 'Encroulement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 54, max: 62 }, target: 'enemy' },
        { type: 'debuff', stat: 'flatDamage', value: 75, duration: 3, target: 'enemy' }
    ]
}
move.pli_de_la_montagne = {
    id: 'pli_de_la_montagne',
    name: 'Pli de la Montagne',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 76, max: 88 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Mabram ---------------
move.entracte_aux_papillons = {
    id: 'entracte_aux_papillons',
    name: 'Entracte aux papillons',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 14, max: 17 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 14, max: 17 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 14, max: 17 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 14, max: 17 }, target: 'enemy' }
    ]
}
move.ongurencre = {
    id: 'ongurencre',
    name: 'Ongurencre',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 46, target: 'self' },
        { type: 'heal', heal: 46, target: 'self' },
        { type: 'heal', heal: 50, target: 'self' },
        { type: 'heal', heal: 54, target: 'self' }
    ]
}
move.chant_du_grand_cerf = {
    id: 'chant_du_grand_cerf',
    name: 'Chant du Grand Cerf',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 15, max: 18 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 15, max: 18 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 15, max: 18 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 15, max: 18 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'heal', heal: 64, target: 'self' }
    ]
}

// -------- Tsunam ---------------
move.perle_d_encre = {
    id: 'perle_d_encre',
    name: 'Perle d\'encre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 40, max: 46 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.kagura = {
    id: 'kagura',
    name: 'Kagura',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 32, max: 38 }, target: 'enemy' }
    ]
}
move.choju_giga = {
    id: 'choju_giga',
    name: 'Chôjû Giga',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Fugokam ---------------
move.souffle_artistique = {
    id: 'souffle_artistique',
    name: 'Souffle artistique',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 42, max: 48 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.sangaku_hanma = {
    id: 'sangaku_hanma',
    name: 'Sangaku Hanmā',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 27, max: 31 }, target: 'enemy' }
    ]
}
move.kiba_o_kikisaku = {
    id: 'kiba_o_kikisaku',
    name: 'Kiba O Kikisaku',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 63, max: 73 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Krâradia ---------------
move.menace_grandissante = {
    id: 'menace_grandissante',
    name: 'Menace grandissante',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.rafale_diabolique = {
    id: 'rafale_diabolique',
    name: 'Rafale Diabolique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 28, max: 33 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 28, max: 33 }, target: 'enemy' }
    ]
}
move.dard_corrompu = {
    id: 'dard_corrompu',
    name: 'Dard Corrompu',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 41, max: 47 }, target: 'enemy' },
        { type: 'dot', element: 'feu', value: 16, duration: 2, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.tir_devastateur = {
    id: 'tir_devastateur',
    name: 'Tir Dévastateur',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 67, max: 77 }, target: 'enemy' },
        { type: 'debuff', stat: 'flatDamage', value: 40, duration: 3, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Monture ---------------

// -------- Krokille Novice Crue ---------------

// -------- Sanglirok ---------------
move.ningurgite = {
    id: 'ningurgite',
    name: 'Ningurgité',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'maxHp', value: 200, duration: 2, target: 'enemy' },
        { type: 'buff', stat: 'maxHp', value: 200, duration: 2, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 51, max: 59 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.ninsoumis = {
    id: 'ninsoumis',
    name: 'Ninsoumis',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}

// -------- Prisme d'alliance ---------------

// -------- Dolid ---------------
move.germintaide = {
    id: 'germintaide',
    name: 'Germintaïde',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 29, max: 38 }, target: 'enemy' },
        { type: 'heal%maxHp', value: 5, target: 'self' },
        { type: 'buff', stat: 'atk', value: 100, duration: 3, target: 'self' }
    ]
}
move.tetanysme = {
    id: 'tetanysme',
    name: 'Tétanysme',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 36, max: 49 }, target: 'enemy' }
    ]
}

// -------- Crabe Yoloniste ---------------
move.gesticulation_ridicule = {
    id: 'gesticulation_ridicule',
    name: 'Gesticulation Ridicule',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 53, max: 57 }, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.pince_ecrasante = {
    id: 'pince_ecrasante',
    name: 'Pince Écrasante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 144, max: 148 }, target: 'enemy' }
    ]
}
move.yolosouague = {
    id: 'yolosouague',
    name: 'Yolosouague',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Cavalier Chanceux ---------------
move.carreausillon = {
    id: 'carreausillon',
    name: 'Carreausillon',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 51, max: 60 }, target: 'enemy' }
    ]
}
move.carreautage = {
    id: 'carreautage',
    name: 'Carreautage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Golem Malakite ---------------
move.attraction_minerale = {
    id: 'attraction_minerale',
    name: 'Attraction Minérale',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 56, max: 65 }, target: 'enemy' }
    ]
}
move.boulet_emeraude = {
    id: 'boulet_emeraude',
    name: 'Boulet Émeraude',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 37, max: 43 }, target: 'enemy' }
    ]
}

// -------- Peluche bouftou ---------------
move.coutures_renforcees = {
    id: 'coutures_renforcees',
    name: 'Coutures Renforcées',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'maxHp', value: 500, duration: 3, target: 'self' }
    ]
}
move.ecchymose = {
    id: 'ecchymose',
    name: 'Ecchymose',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 91, max: 120 }, target: 'enemy' }
    ]
}
move.traumatisme = {
    id: 'traumatisme',
    name: 'Traumatisme',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 30, duration: 3, target: 'self' }
    ]
}

// -------- Harrogant ---------------
move.dedain = {
    id: 'dedain',
    name: 'Dédain',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.coupe_cuir = {
    id: 'coupe_cuir',
    name: 'Coupe-cuir',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}

// -------- Grodruche ---------------
move.vomito = {
    id: 'vomito',
    name: 'Vomito',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 91, max: 110 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.nerf_de_boeuf = {
    id: 'nerf_de_boeuf',
    name: 'Nerf de boeuf',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Peunch ---------------
move.ioupercute = {
    id: 'ioupercute',
    name: 'Ioupercute',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 50, max: 50 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.cire_culaire = {
    id: 'cire_culaire',
    name: 'Cire culaire',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 81, max: 100 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'intelligence', value: 100, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'intelligence', value: 100, duration: 3, target: 'self' }
    ]
}

// -------- Empaillé ---------------
move.taxidermie = {
    id: 'taxidermie',
    name: 'Taxidermie',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 61, max: 80 }, target: 'enemy' }
    ]
}
move.paillage = {
    id: 'paillage',
    name: 'Paillage',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 40, duration: 3, target: 'self' },
        { type: 'damage', element: 'air', damage: { min: 61, max: 80 }, target: 'enemy' }
    ]
}
move.gros_sac = {
    id: 'gros_sac',
    name: 'Gros sac',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 1000, duration: 3, target: 'self' }
    ]
}

// -------- Cuirboule ---------------
move.maboule = {
    id: 'maboule',
    name: 'Maboule',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 191, max: 210 }, erodedHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}
move.gonflage = {
    id: 'gonflage',
    name: 'Gonflage',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.bouffee = {
    id: 'bouffee',
    name: 'Bouffée',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 91, target: 'self' },
        { type: 'buff', stat: 'flatDamage', value: 600, duration: 3, target: 'self' }
    ]
}

// -------- Ventrublion ---------------
move.abdomination = {
    id: 'abdomination',
    name: 'Abdomination',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 71, max: 80 }, target: 'enemy' }
    ]
}
move.ventromatisme = {
    id: 'ventromatisme',
    name: 'Ventromatisme',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 71, max: 80 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.bidiotisme = {
    id: 'bidiotisme',
    name: 'Bidiotisme',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Stalak ---------------
move.brise_larmes = {
    id: 'brise_larmes',
    name: 'Brise-larmes',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 71, max: 90 }, target: 'enemy' }
    ]
}
move.legoglace = {
    id: 'legoglace',
    name: 'Légoglace',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 15, max: 15 }, currentHpScale: { stat: 'finalDamagePct', ratio: 0.5 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}

// -------- Karkanik ---------------
move.caroturier = {
    id: 'caroturier',
    name: 'Caroturier',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.karkanciel = {
    id: 'karkanciel',
    name: 'Karkanciel',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 21, max: 40 }, target: 'enemy' }
    ]
}

// -------- Verglasseur ---------------
move.braguette = {
    id: 'braguette',
    name: 'Braguette',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.bralong = {
    id: 'bralong',
    name: 'Bralong',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.braconnage = {
    id: 'braconnage',
    name: 'Braconnage',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Frimar ---------------
move.lame_soeur = {
    id: 'lame_soeur',
    name: 'Lame soeur',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 30, max: 30 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}
move.soupirsute = {
    id: 'soupirsute',
    name: 'Soupirsute',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.glacerbe = {
    id: 'glacerbe',
    name: 'Glacerbe',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Nessil ---------------
move.loch = {
    id: 'loch',
    name: 'Loch',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.bafre = {
    id: 'bafre',
    name: 'Bâfre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'avance', target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.drako = {
    id: 'drako',
    name: 'Drako',
    cooldownMs: 2000,
    effects: [
        { type: 'renvoi', ratio: 0.5, target: 'self' },
    ]
}

// -------- Krakal ---------------
move.jappement_dragor = {
    id: 'jappement_dragor',
    name: 'Jappement Dragor',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 71, max: 90 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.morsure_de_soie = {
    id: 'morsure_de_soie',
    name: 'Morsure de soie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 20, max: 20 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Dodox ---------------
move.picorection = {
    id: 'picorection',
    name: 'Picorection',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 30, duration: 3, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 71, max: 90 }, target: 'enemy' }
    ]
}
move.pligeon = {
    id: 'pligeon',
    name: 'Pligeon',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'antiHeal', duration: 3, target: 'enemy' }
    ]
}
move.duvet_teran = {
    id: 'duvet_teran',
    name: 'Duvet Téran',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', value: 500, duration: 3, target: 'self' }
    ]
}

// -------- Termystique ---------------
move.dard_dard = {
    id: 'dard_dard',
    name: 'Dard dard',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 71, max: 90 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.glusure = {
    id: 'glusure',
    name: 'Glusure',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Drosérâle ---------------
move.caduk = {
    id: 'caduk',
    name: 'Caduk',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.stigmatraque = {
    id: 'stigmatraque',
    name: 'Stigmatraque',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Kanimate ---------------
move.machine_ception = {
    id: 'machine_ception',
    name: 'Machine Ception',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'recul', target: 'enemy' }
    ]
}
move.marionnettoyage = {
    id: 'marionnettoyage',
    name: 'Marionnettoyage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}

// -------- Brikoglours ---------------
move.clef_en_glaise = {
    id: 'clef_en_glaise',
    name: 'Clef en glaise',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 40, max: 40 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}
move.clef_battue = {
    id: 'clef_battue',
    name: 'Clef battue',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 71, max: 90 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Mansordide ---------------
move.envol_de_mort = {
    id: 'envol_de_mort',
    name: 'Envol de mort',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 51, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.engrenage_de_glace = {
    id: 'engrenage_de_glace',
    name: 'Engrenage de glace',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'buff', stat: 'erosionBonus', value: 30, duration: 3, target: 'self' }
    ]
}
move.rotaplumes = {
    id: 'rotaplumes',
    name: 'Rotaplumes',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 200, target: 'self' }
    ]
}

// -------- Mécanofoux ---------------
move.de_grippant = {
    id: 'de_grippant',
    name: 'Dé grippant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 61, max: 80 }, target: 'enemy' }
    ]
}
move.petarade = {
    id: 'petarade',
    name: 'Pétarade',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.rotapousse = {
    id: 'rotapousse',
    name: 'Rotapousse',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Mérulor ---------------
move.degage_limite = {
    id: 'degage_limite',
    name: 'Dégage limite',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
    ]
}
move.brulage_bete = {
    id: 'brulage_bete',
    name: 'Brûlage bête',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 61, max: 80 }, target: 'enemy' }
    ]
}
move.vidange_gardien = {
    id: 'vidange_gardien',
    name: 'Vidange gardien',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 200, duration: 3, target: 'self' }
    ]
}

// -------- Granduk ---------------
move.hibouffonnerie = {
    id: 'hibouffonnerie',
    name: 'Hibouffonnerie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'intelligence', value: 200, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'intelligence', value: 200, duration: 3, target: 'self' }
    ]
}
move.hibougie = {
    id: 'hibougie',
    name: 'Hibougie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 30, max: 30 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}

// -------- Strigide ---------------
move.stricannement = {
    id: 'stricannement',
    name: 'Stricannement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 61, max: 80 }, target: 'enemy' }
    ]
}
move.strictus = {
    id: 'strictus',
    name: 'Strictus',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 71, max: 90 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.stridicule = {
    id: 'stridicule',
    name: 'Stridicule',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Cycloïde ---------------
move.cyclore = {
    id: 'cyclore',
    name: 'Cyclore',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 71, max: 90 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.cyclochette = {
    id: 'cyclochette',
    name: 'Cyclochette',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 81, max: 100 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.cyclaustrophobe = {
    id: 'cyclaustrophobe',
    name: 'Cyclaustrophobe',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 100, duration: 3, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 81, max: 100 }, target: 'enemy' }
    ]
}

// -------- Sinistrofu ---------------
move.sinisterie = {
    id: 'sinisterie',
    name: 'Sinistérie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.diligence = {
    id: 'diligence',
    name: 'Diligence',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Nocturlabe ---------------
move.tonnerre_mecanique = {
    id: 'tonnerre_mecanique',
    name: 'Tonnerre mécanique',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 81, max: 100 }, target: 'enemy' }
    ]
}
move.surchauffense = {
    id: 'surchauffense',
    name: 'Surchauffense',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 81, max: 100 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Pikoleur ---------------
move.par_ici = {
    id: 'par_ici',
    name: 'Par ici',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.perforage = {
    id: 'perforage',
    name: 'Perforage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 30, max: 30 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}

// -------- Harpo ---------------
move.moule_chote = {
    id: 'moule_chote',
    name: 'Moule Chote',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 71, max: 90 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.tireur_franc = {
    id: 'tireur_franc',
    name: 'Tireur Franc',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 71, max: 90 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.campeur_et_sans_reproches = {
    id: 'campeur_et_sans_reproches',
    name: 'Campeur et sans reproches',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 4, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Krabouilleur ---------------
move.pince_d_or = {
    id: 'pince_d_or',
    name: 'Pince d\'or',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 71, max: 90 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.pincendie = {
    id: 'pincendie',
    name: 'Pincendie',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 71, max: 90 }, target: 'enemy' }
    ]
}

// -------- Eskoglyphe ---------------
move.maraude_a_la_joie = {
    id: 'maraude_a_la_joie',
    name: 'Maraude à la Joie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 71, max: 90 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 10, max: 10 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}
move.glycol_roule = {
    id: 'glycol_roule',
    name: 'Glycol Roulé',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.predateur_de_gloire = {
    id: 'predateur_de_gloire',
    name: 'Prédateur de gloire',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Cyclophandre ---------------
move.apnee_crochue = {
    id: 'apnee_crochue',
    name: 'Apnée Crochue',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 30, duration: 3, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 101, max: 120 }, target: 'enemy' }
    ]
}
move.gras_de_maree = {
    id: 'gras_de_maree',
    name: 'Gras de marée',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 20, max: 20 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.relou_de_mer = {
    id: 'relou_de_mer',
    name: 'Relou de mer',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Kamasterisk ---------------
move.clignotement = {
    id: 'clignotement',
    name: 'Clignotement',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.assomnolence = {
    id: 'assomnolence',
    name: 'Assomnolence',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 71, max: 90 }, target: 'enemy' }
    ]
}

// -------- Barbétoal ---------------
move.barbe_a_trucs = {
    id: 'barbe_a_trucs',
    name: 'Barbe à trucs',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 4, target: 'self' },
    ]
}
move.super_saillant = {
    id: 'super_saillant',
    name: 'Super saillant',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 300, duration: 3, target: 'self' }
    ]
}

// -------- Lévitrof ---------------
move.kama_hamea = {
    id: 'kama_hamea',
    name: 'Kama Haméa',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 50, max: 50 }, erodedHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}

// -------- Paspartou ---------------
move.clemence = {
    id: 'clemence',
    name: 'Clémence',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 51, max: 70 }, target: 'enemy' }
    ]
}
move.guideal = {
    id: 'guideal',
    name: 'Guidéal',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 400, duration: 3, target: 'self' }
    ]
}
move.la_clef_du_succes = {
    id: 'la_clef_du_succes',
    name: 'La clef du succès',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 51, max: 70 }, target: 'enemy' }
    ]
}

// -------- Piloztère ---------------
move.claque = {
    id: 'claque',
    name: 'Claque',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 91, max: 110 }, target: 'enemy' }
    ]
}
move.sourire_ravageur = {
    id: 'sourire_ravageur',
    name: 'Sourire Ravageur',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Mâchassin ---------------
move.piege_a_le_ours = {
    id: 'piege_a_le_ours',
    name: 'Piège à Le Ours',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 50, max: 50 }, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.sans_se_mouiller = {
    id: 'sans_se_mouiller',
    name: 'Sans se mouiller',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 46, max: 55 }, target: 'enemy' }
    ]
}

// -------- Terristocrate ---------------
move.bombe_illicale = {
    id: 'bombe_illicale',
    name: 'Bombe Illicale',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.fumerus = {
    id: 'fumerus',
    name: 'Fumérus',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 81, max: 85 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.attentat = {
    id: 'attentat',
    name: 'Attentat',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 81, max: 100 }, target: 'enemy' }
    ]
}

// -------- Bourôliste ---------------
move.vers_la_lumiere = {
    id: 'vers_la_lumiere',
    name: 'Vers la lumière',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}
move.coupable = {
    id: 'coupable',
    name: 'Coupable',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 101, max: 120 }, target: 'enemy' }
    ]
}
move.tournoyade = {
    id: 'tournoyade',
    name: 'Tournoyade',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Magouille ---------------
move.craneantissement = {
    id: 'craneantissement',
    name: 'Crânéantissement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 46, max: 55 }, target: 'enemy' },
        { type: 'heal%maxHp', value: 15, target: 'self' },
    ]
}
move.crames = {
    id: 'crames',
    name: 'Crâmes',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 61, max: 70 }, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Ikargn ---------------
move.attraction_ailee = {
    id: 'attraction_ailee',
    name: 'Attraction ailée',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'agility', value: 100, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'agility', value: 100, duration: 3, target: 'self' }
    ]
}
move.cercle_de_feu = {
    id: 'cercle_de_feu',
    name: 'Cercle de feu',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'intelligence', value: 100, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'intelligence', value: 100, duration: 3, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 61, max: 80 }, target: 'enemy' }
    ]
}
move.terre_mythe = {
    id: 'terre_mythe',
    name: 'Terre mythe',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'force', value: 100, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'force', value: 100, duration: 3, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 51, max: 70 }, target: 'enemy' }
    ]
}

// -------- Méjaire ---------------
move.rayonirique = {
    id: 'rayonirique',
    name: 'Rayonirique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 31, max: 40 }, target: 'enemy' }
    ]
}
move.plumiere = {
    id: 'plumiere',
    name: 'Plumière',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Harpille ---------------
move.tirs_optiques = {
    id: 'tirs_optiques',
    name: 'Tirs optiques',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.superfidie = {
    id: 'superfidie',
    name: 'Superfidie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.petit_poison = {
    id: 'petit_poison',
    name: 'Petit poison',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 50, max: 50 }, target: 'enemy' }
    ]
}

// -------- Buboxor ---------------
move.bouclier_absorbant = {
    id: 'bouclier_absorbant',
    name: 'Bouclier absorbant',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 100, duration: 3, target: 'self' }
    ]
}
move.feinterception = {
    id: 'feinterception',
    name: 'Feinterception',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'heal', heal: 50, target: 'self' }
    ]
}
move.hoxor = {
    id: 'hoxor',
    name: 'Hoxor',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 41, max: 60 }, target: 'enemy' }
    ]
}

// -------- Brabuzar ---------------
move.mise_en_situation = {
    id: 'mise_en_situation',
    name: 'Mise en situation',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
    ]
}
move.neutralisation = {
    id: 'neutralisation',
    name: 'Neutralisation',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 56, max: 75 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Soldat de Fortune ---------------
move.jet_de_pique = {
    id: 'jet_de_pique',
    name: 'Jet de Pique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 46, max: 55 }, target: 'enemy' }
    ]
}
move.en_plein_c_ur = {
    id: 'en_plein_c_ur',
    name: 'En plein cœur',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 46, max: 55 }, target: 'enemy' }
    ]
}

// -------- Valet Veinard ---------------
move.piquepocket = {
    id: 'piquepocket',
    name: 'Piquepocket',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.epique = {
    id: 'epique',
    name: 'Épique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Dame du Hasard ---------------
move.tourne_griffe = {
    id: 'tourne_griffe',
    name: 'Tourne-Griffe',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}
move.creve_c_ur = {
    id: 'creve_c_ur',
    name: 'Crève-cœur',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 40 }, target: 'enemy' }
    ]
}

// -------- Roi Joueur ---------------
move.lueur_royale = {
    id: 'lueur_royale',
    name: 'Lueur royale',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 46, max: 60 }, target: 'enemy' }
    ]
}
move.adoubement_brutal = {
    id: 'adoubement_brutal',
    name: 'Adoubement brutal',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 61, max: 80 }, target: 'enemy' }
    ]
}

// -------- Tourthon ---------------
move.attraction_lumineuse = {
    id: 'attraction_lumineuse',
    name: 'Attraction Lumineuse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 34, max: 38 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.enlacement = {
    id: 'enlacement',
    name: 'Enlacement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 106, max: 110 }, target: 'enemy' }
    ]
}

// -------- Poulpée ---------------
move.siphonage = {
    id: 'siphonage',
    name: 'Siphonage',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'heal%maxHp', value: 13, target: 'self' },
    ]
}
move.tourbillonement = {
    id: 'tourbillonement',
    name: 'Tourbillonement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 48, max: 52 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}

// -------- Tryde ---------------
move.prison_aqueuse = {
    id: 'prison_aqueuse',
    name: 'Prison Aqueuse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 65, max: 69 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}

// -------- Rilur ---------------
move.harpon_eclair = {
    id: 'harpon_eclair',
    name: 'Harpon-éclair',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 36, max: 40 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 36, max: 40 }, target: 'enemy' }
    ]
}
move.charge_frontale = {
    id: 'charge_frontale',
    name: 'Charge Frontale',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 47, max: 51 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Diondin ---------------
move.projection_hydraulique = {
    id: 'projection_hydraulique',
    name: 'Projection Hydraulique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 66, max: 70 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.fougou_rebondissant = {
    id: 'fougou_rebondissant',
    name: 'Fougou Rebondissant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 53, max: 57 }, target: 'enemy' }
    ]
}
move.poussette_mortelle = {
    id: 'poussette_mortelle',
    name: 'Poussette Mortelle',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 62, max: 66 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Grofond ---------------
move.attraction_repugnante = {
    id: 'attraction_repugnante',
    name: 'Attraction Répugnante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 65, max: 69 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.sphere_corrosive = {
    id: 'sphere_corrosive',
    name: 'Sphère Corrosive',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 65, max: 69 }, target: 'enemy' }
    ]
}

// -------- N'yalg ---------------
move.expulsion_miasmatique = {
    id: 'expulsion_miasmatique',
    name: 'Expulsion Miasmatique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 84, max: 88 }, target: 'enemy' }
    ]
}
move.flagellation_paralysante = {
    id: 'flagellation_paralysante',
    name: 'Flagellation Paralysante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 83, max: 87 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Shokkoth ---------------
move.triangle_dement = {
    id: 'triangle_dement',
    name: 'Triangle Dément',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.il_horrifiant = {
    id: 'il_horrifiant',
    name: 'Œil Horrifiant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 51, max: 55 }, target: 'enemy' }
    ]
}

// -------- Li-Fo ---------------
move.ponction_morbide = {
    id: 'ponction_morbide',
    name: 'Ponction Morbide',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'maxHp', value: 1000, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'maxHp', value: 1000, duration: 3, target: 'self' }
    ]
}

// -------- Klûtiste ---------------
move.melopee_pernicieuse = {
    id: 'melopee_pernicieuse',
    name: 'Mélopée Pernicieuse',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 65, max: 69 }, target: 'enemy' }
    ]
}
move.folle_cacophonie = {
    id: 'folle_cacophonie',
    name: 'Folle Cacophonie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 83, max: 87 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.intensite_demoniaque = {
    id: 'intensite_demoniaque',
    name: 'Intensité Démoniaque',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'maxHp', value: 200, duration: 2, target: 'self' },
        { type: 'buff', stat: 'atk', value: 200, duration: 3, target: 'self' }
    ]
}

// -------- Mol Usk ---------------
move.bave_acide = {
    id: 'bave_acide',
    name: 'Bave Acide',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 41, max: 45 }, target: 'enemy' }
    ]
}
move.trainee_collante = {
    id: 'trainee_collante',
    name: 'Traînée Collante',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 77, max: 81 }, target: 'enemy' }
    ]
}
move.roulemboule = {
    id: 'roulemboule',
    name: 'Roulemboule',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 10, duration: 3, target: 'self' },
        { type: 'damage', element: 'neutre', damage: { min: 65, max: 69 }, target: 'enemy' }
    ]
}

// -------- Gambaf ---------------
move.pas_chasse_frontal = {
    id: 'pas_chasse_frontal',
    name: 'Pas Chassé Frontal',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 83, max: 87 }, target: 'enemy' }
    ]
}
move.poing_meteore = {
    id: 'poing_meteore',
    name: 'Poing-météore',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 71, max: 75 }, target: 'enemy' }
    ]
}
move.enchainement_de_coups_de_poings_normaux = {
    id: 'enchainement_de_coups_de_poings_normaux',
    name: 'Enchaînement de Coups de Poings Normaux',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 95, max: 99 }, target: 'enemy' },
        { type: 'buffDrain', value: 2, target: 'enemy' }
    ]
}

// -------- Mantaze ---------------
move.eclair_obscur = {
    id: 'eclair_obscur',
    name: 'Éclair Obscur',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 35, max: 39 }, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.electrochoc = {
    id: 'electrochoc',
    name: 'Électrochoc',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 100, max: 100 }, erodedHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}
move.foudre_marine = {
    id: 'foudre_marine',
    name: 'Foudre Marine',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 61, max: 65 }, target: 'enemy' }
    ]
}

// -------- Tilamproie ---------------
move.piege_parasite = {
    id: 'piege_parasite',
    name: 'Piège Parasite',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.succion_attractive = {
    id: 'succion_attractive',
    name: 'Succion Attractive',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 65, max: 69 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.morsure_filtrante = {
    id: 'morsure_filtrante',
    name: 'Morsure Filtrante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 53, max: 57 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 53, max: 57 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}

// -------- Chakanoubis ---------------
move.harcelement_de_la_pyramide = {
    id: 'harcelement_de_la_pyramide',
    name: 'Harcèlement de la pyramide',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.pyramide = {
    id: 'pyramide',
    name: 'Pyrâmide',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 151, max: 170 }, target: 'enemy' }
    ]
}

// -------- Bandleth ---------------
move.calin = {
    id: 'calin',
    name: 'Calin',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 71, max: 80 }, target: 'enemy' }
    ]
}
move.danse_comme_une_momie = {
    id: 'danse_comme_une_momie',
    name: 'Danse comme une momie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 71, max: 90 }, target: 'enemy' }
    ]
}

// -------- Momistik ---------------
move.frappe_elementaire = {
    id: 'frappe_elementaire',
    name: 'Frappe élémentaire',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'res.feu', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'res.air', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'res.terre', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'res.eau', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.grenattrition = {
    id: 'grenattrition',
    name: 'Grenattrition',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 81, max: 90 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 41, max: 45 }, target: 'enemy' },
        { type: 'debuff', stat: 'res.feu', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 41, max: 45 }, target: 'enemy' },
        { type: 'debuff', stat: 'res.air', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 41, max: 45 }, target: 'enemy' },
        { type: 'debuff', stat: 'res.terre', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 41, max: 45 }, target: 'enemy' },
        { type: 'debuff', stat: 'res.eau', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Rykaon ---------------
move.remplacement_maudit = {
    id: 'remplacement_maudit',
    name: 'Remplacement maudit',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 81, max: 100 }, target: 'enemy' }
    ]
}
move.sabrupt = {
    id: 'sabrupt',
    name: 'Sabrupt',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 100, duration: 3, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 100, duration: 3, target: 'enemy' }
    ]
}

// -------- Griffotep ---------------
move.aigriffes = {
    id: 'aigriffes',
    name: 'Aigriffes',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 71, max: 90 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.arrivee_fracassante = {
    id: 'arrivee_fracassante',
    name: 'Arrivée fracassante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 51, max: 60 }, target: 'enemy' }
    ]
}

// -------- Goulafre ---------------
move.bidonnage = {
    id: 'bidonnage',
    name: 'Bidonnage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 151, max: 170 }, target: 'enemy' },
        { type: 'debuff', stat: 'finalDamagePct', value: 50, duration: 3, target: 'enemy' }
    ]
}

// -------- Kérigoule ---------------
move.tranche_air = {
    id: 'tranche_air',
    name: 'Tranche air',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 101, max: 120 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Gouligane ---------------
move.gouli_gouli = {
    id: 'gouli_gouli',
    name: 'Gouli gouli',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}
move.griffouille = {
    id: 'griffouille',
    name: 'Griffouille',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 51, max: 60 }, target: 'enemy' }
    ]
}

// -------- Goultime ---------------
move.dantagoule = {
    id: 'dantagoule',
    name: 'Dantagoule',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 61, max: 80 }, target: 'enemy' }
    ]
}
move.poings_vire_goule = {
    id: 'poings_vire_goule',
    name: 'Poings vire-goule',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 61, max: 80 }, target: 'enemy' }
    ]
}

// -------- Pipisteuse ---------------
move.deplacement_furtif = {
    id: 'deplacement_furtif',
    name: 'Déplacement furtif',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.chauffe_kipeu = {
    id: 'chauffe_kipeu',
    name: 'Chauffe kipeu',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 81, max: 100 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Chause ---------------
move.flami = {
    id: 'flami',
    name: 'Flâmi',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 400, duration: 3, target: 'self' }
    ]
}
move.ebullition = {
    id: 'ebullition',
    name: 'Ébullition',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 101, max: 120 }, target: 'enemy' }
    ]
}
move.doublame = {
    id: 'doublame',
    name: 'Doublâme',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'critChance', value: 50, duration: 3, target: 'enemy' }
    ]
}

// -------- Ectorche ---------------
move.coupe_souffle = {
    id: 'coupe_souffle',
    name: 'Coupe-souffle',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 61, max: 80 }, target: 'enemy' }
    ]
}

// -------- Esprigné ---------------
move.bouillie = {
    id: 'bouillie',
    name: 'Bouillie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 150, max: 150 }, erodedHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}
move.tranche_ame = {
    id: 'tranche_ame',
    name: 'Tranche-âme',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 100, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 100, duration: 3, target: 'self' }
    ]
}

// -------- Feutôme ---------------
move.feu_critique = {
    id: 'feu_critique',
    name: 'Feu critique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 121, max: 140 }, target: 'enemy' },
        { type: 'debuff', stat: 'critChance', value: 30, duration: 3, target: 'enemy' }
    ]
}
move.revenant = {
    id: 'revenant',
    name: 'Revenant',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Crâme ---------------
move.boule_d_eau = {
    id: 'boule_d_eau',
    name: 'Boule d\'eau',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 51, max: 60 }, target: 'enemy' }
    ]
}

// -------- Klémort ---------------
move.eperuption = {
    id: 'eperuption',
    name: 'Épéruption',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 61, max: 70 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.conjuration_volcanique = {
    id: 'conjuration_volcanique',
    name: 'Conjuration Volcanique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.magmagique = {
    id: 'magmagique',
    name: 'Magmagique',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Trépavois ---------------
move.glaive_sommaire = {
    id: 'glaive_sommaire',
    name: 'Glaive Sommaire',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 61, max: 70 }, target: 'enemy' }
    ]
}
move.charge_au_bouclier = {
    id: 'charge_au_bouclier',
    name: 'Charge au Bouclier',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 51, max: 60 }, target: 'enemy' }
    ]
}

// -------- Hacharné ---------------
move.magmache = {
    id: 'magmache',
    name: 'Magmache',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 61, max: 70 }, target: 'enemy' }
    ]
}
move.haleine_enflammee = {
    id: 'haleine_enflammee',
    name: 'Haleine Enflammée',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'heal', heal: 50, target: 'self' }
    ]
}
move.visiosoufre = {
    id: 'visiosoufre',
    name: 'Visiosoufre',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 200, duration: 3, target: 'enemy' }
    ]
}

// -------- Moribombe ---------------
move.zhen_tian_lei = {
    id: 'zhen_tian_lei',
    name: 'Zhen Tian Lei',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.grenade_collante = {
    id: 'grenade_collante',
    name: 'Grenade Collante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.chaudiere = {
    id: 'chaudiere',
    name: 'Chaudière',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}

// -------- Halbardent ---------------
move.geoassaut = {
    id: 'geoassaut',
    name: 'Geoassaut',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 30, duration: 3, target: 'self' }
    ]
}
move.lance_flammes = {
    id: 'lance_flammes',
    name: 'Lance-flammes',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 31, max: 40 }, target: 'enemy' }
    ]
}
move.chauffard = {
    id: 'chauffard',
    name: 'Chauffard',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 200, duration: 3, target: 'self' }
    ]
}

// -------- Zombruth ---------------
move.cumul_des_mandales = {
    id: 'cumul_des_mandales',
    name: 'Cumul des Mandales',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.siphon = {
    id: 'siphon',
    name: 'Siphon',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 300, duration: 3, target: 'enemy' }
    ]
}
move.aquaponey = {
    id: 'aquaponey',
    name: 'Aquaponey',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Tournoyé ---------------
move.franchissement = {
    id: 'franchissement',
    name: 'Franchissement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.monodent = {
    id: 'monodent',
    name: 'Monodent',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 61, max: 70 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.restoute = {
    id: 'restoute',
    name: 'Restouté',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Funespadon ---------------
move.talion = {
    id: 'talion',
    name: 'Talion',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 51, max: 60 }, target: 'enemy' }
    ]
}
move.profondeurs_marines = {
    id: 'profondeurs_marines',
    name: 'Profondeurs Marines',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}

// -------- Crânonier ---------------
move.morlusque = {
    id: 'morlusque',
    name: 'Morlusque',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 10, duration: 3, target: 'self' },
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}
move.hydraire = {
    id: 'hydraire',
    name: 'Hydraire',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Macrab ---------------
move.putrefaction_marine = {
    id: 'putrefaction_marine',
    name: 'Putréfaction Marine',
    cooldownMs: 2000,
    effects: [
        // TODO: Minimise les effets aléatoires de la cible
        { type: 'damage', element: 'air', damage: { min: 41, max: 60 }, target: 'enemy' }
    ]
}
move.coup_de_pince = {
    id: 'coup_de_pince',
    name: 'Coup de Pince',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}
move.vapeur = {
    id: 'vapeur',
    name: 'Vapeur',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 51, max: 60 }, target: 'enemy' }
    ]
}

// -------- Boufbos ---------------
move.lance_pierre = {
    id: 'lance_pierre',
    name: 'Lance-pierre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 141, max: 150 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 301, max: 310 }, target: 'enemy' }
    ]
}
move.forte_tete = {
    id: 'forte_tete',
    name: 'Forte tête',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Barbélier ---------------
move.coup_de_cornes = {
    id: 'coup_de_cornes',
    name: 'Coup de cornes',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 151, max: 170 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 301, max: 320 }, target: 'enemy' },
        { type: 'debuff', stat: 'maxHp', value: 200, duration: 2, target: 'enemy' }
    ]
}
move.belier = {
    id: 'belier',
    name: 'Bélier',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}

// -------- Kasrok ---------------
move.marteau_pillon = {
    id: 'marteau_pillon',
    name: 'Marteau pillon',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 101, max: 110 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 201, max: 210 }, target: 'enemy' }
    ]
}
move.nimpulsion = {
    id: 'nimpulsion',
    name: 'Nimpulsion',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'debuff', stat: 'critChance', value: 50, duration: 3, target: 'enemy' }
    ]
}

// -------- Vatenbière ---------------
move.hachis = {
    id: 'hachis',
    name: 'Hachis',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 101, max: 110 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.nimplantation = {
    id: 'nimplantation',
    name: 'Nimplantation',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Chocoligarque ---------------
move.chocolat_sperger = {
    id: 'chocolat_sperger',
    name: 'Chocolat Sperger',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 41, max: 60 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.cacaobstruction = {
    id: 'cacaobstruction',
    name: 'Cacaobstruction',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 81, max: 100 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Torréfactueur ---------------
move.torreador = {
    id: 'torreador',
    name: 'Torréador',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 15, duration: 3, target: 'self' },
        { type: 'damage', element: 'neutre', damage: { min: 41, max: 60 }, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 30, duration: 3, target: 'self' },
        { type: 'damage', element: 'neutre', damage: { min: 81, max: 120 }, target: 'enemy' }
    ]
}
move.torrefaction = {
    id: 'torrefaction',
    name: 'Torréfaction',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 4, target: 'self' },
    ]
}
move.padbra = {
    id: 'padbra',
    name: 'Padbra',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}

// -------- Pralicienne ---------------
move.hydrolyse = {
    id: 'hydrolyse',
    name: 'Hydrolyse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.chococlier = {
    id: 'chococlier',
    name: 'Chococlier',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 41, max: 60 }, target: 'enemy' }
    ]
}
move.glacage = {
    id: 'glacage',
    name: 'Glaçage',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Températurge ---------------
move.refroidissement = {
    id: 'refroidissement',
    name: 'Refroidissement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 41, max: 60 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 11, max: 15 }, target: 'enemy' }
    ]
}
move.surchauffe = {
    id: 'surchauffe',
    name: 'Surchauffe',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'feu', value: 11, duration: 2, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 41, max: 60 }, target: 'enemy' }
    ]
}
move.chaudron_choco = {
    id: 'chaudron_choco',
    name: 'Chaudron Choco',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Cabosseur ---------------
move.eclabossage = {
    id: 'eclabossage',
    name: 'Éclabossage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 4, target: 'self' },
    ]
}
move.feve_du_samedi_soir = {
    id: 'feve_du_samedi_soir',
    name: 'Fève du samedi soir',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.piege_a_gourmands = {
    id: 'piege_a_gourmands',
    name: 'Piège à gourmands',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Kashkaille ---------------
move.traquenard_reptilien = {
    id: 'traquenard_reptilien',
    name: 'Traquenard reptilien',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.attirance_de_l_invisible = {
    id: 'attirance_de_l_invisible',
    name: 'Attirance de l\'invisible',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 36, max: 50 }, target: 'enemy' }
    ]
}

// -------- Alashasss ---------------
move.tir_de_precision = {
    id: 'tir_de_precision',
    name: 'Tir de précision',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 2, duration: 2, target: 'enemy' },
        { type: 'buff', stat: 'spd', value: 2, duration: 2, target: 'self' },
        { type: 'damage', element: 'neutre', damage: { min: 46, max: 55 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 2, duration: 2, target: 'enemy' },
        { type: 'buff', stat: 'spd', value: 2, duration: 2, target: 'self' }
    ]
}
move.regeneration_sacrificielle = {
    id: 'regeneration_sacrificielle',
    name: 'Régénération sacrificielle',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 36, max: 50 }, target: 'enemy' },
        { type: 'heal%maxHp', value: 10, target: 'self' },
    ]
}
move.accumulation_critique = {
    id: 'accumulation_critique',
    name: 'Accumulation critique',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'critChance', value: 20, duration: 3, target: 'self' },
        { type: 'buff', stat: 'critDamagePct', value: 25, duration: 3, target: 'self' }
    ]
}

// -------- Cronnibal ---------------
move.rage_nocturne = {
    id: 'rage_nocturne',
    name: 'Rage nocturne',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 56, max: 70 }, target: 'enemy' }
    ]
}
move.sauvagerie_reptilienne = {
    id: 'sauvagerie_reptilienne',
    name: 'Sauvagerie reptilienne',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 4, target: 'self' },
    ]
}
move.cronnibalisme = {
    id: 'cronnibalisme',
    name: 'Cronnibalisme ',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Ferrailleur ---------------
move.demantelement = {
    id: 'demantelement',
    name: 'Démantèlement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 16, max: 25 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 16, max: 25 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 16, max: 25 }, target: 'enemy' },
        { type: 'buff', stat: 'maxHp', value: 200, duration: 2, target: 'self' }
    ]
}
move.terminal_gris = {
    id: 'terminal_gris',
    name: 'Terminal Gris',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'flatDamage', value: 50, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 50, duration: 3, target: 'self' },
        { type: 'damage', element: 'neutre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.assembricolage = {
    id: 'assembricolage',
    name: 'Assembricolage',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}

// -------- Krèvladal ---------------
move.pouilleux_massacreur = {
    id: 'pouilleux_massacreur',
    name: 'Pouilleux Massacreur',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 41, max: 60 }, target: 'enemy' }
    ]
}
move.crache_misere = {
    id: 'crache_misere',
    name: 'Crache-Misère',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'chance', value: 200, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'chance', value: 200, duration: 3, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 26, max: 35 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Désosseur ---------------
move.desossage = {
    id: 'desossage',
    name: 'Désossage',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 41, max: 60 }, target: 'enemy' }
    ]
}
move.souffle_du_desert = {
    id: 'souffle_du_desert',
    name: 'Souffle du Désert',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'agility', value: 200, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'agility', value: 200, duration: 3, target: 'self' },
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Skentu ---------------
move.bantha = {
    id: 'bantha',
    name: 'Bantha',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.balle_vorace = {
    id: 'balle_vorace',
    name: 'Balle Vorace',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'intelligence', value: 200, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'intelligence', value: 200, duration: 3, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.grenade_aveuglante = {
    id: 'grenade_aveuglante',
    name: 'Grenade Aveuglante',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 2, duration: 2, target: 'enemy' },
        { type: 'buff', stat: 'spd', value: 2, duration: 2, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}

// -------- Dawaj ---------------
move.sol_aride = {
    id: 'sol_aride',
    name: 'Sol Aride',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'force', value: 200, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'force', value: 200, duration: 3, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.fouet_gadderfi = {
    id: 'fouet_gadderfi',
    name: 'Fouet Gadderfi',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'critChance', value: 15, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'critChance', value: 15, duration: 3, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 41, max: 55 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Gangredogue ---------------
move.tir_purulent = {
    id: 'tir_purulent',
    name: 'Tir Purulent',
    cooldownMs: 2000,
    effects: [
        { type: 'heal%maxHp', value: 5, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 27, max: 35 }, target: 'enemy' }
    ]
}
move.gangraine = {
    id: 'gangraine',
    name: 'Gangraine',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 36, max: 44 }, target: 'enemy' }
    ]
}
move.debarbouillie = {
    id: 'debarbouillie',
    name: 'Débarbouillie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 35, max: 45 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 2, duration: 2, target: 'enemy' },
        { type: 'buff', stat: 'spd', value: 2, duration: 2, target: 'self' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Belilith ---------------
move.compression_furieuse = {
    id: 'compression_furieuse',
    name: 'Compression Furieuse',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 15, duration: 3, target: 'self' },
        { type: 'damage', element: 'air', damage: { min: 57, max: 67 }, target: 'enemy' }
    ]
}
move.plongeon_tourmente = {
    id: 'plongeon_tourmente',
    name: 'Plongeon Tourmenté',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 70, max: 82 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.exaltation_terrifiante = {
    id: 'exaltation_terrifiante',
    name: 'Exaltation Terrifiante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 38, max: 44 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Eninferno ---------------
move.murmure_des_lamentations = {
    id: 'murmure_des_lamentations',
    name: 'Murmure des Lamentations',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 70, max: 82 }, target: 'enemy' },
        { type: 'heal', heal: 70, target: 'self' }
    ]
}
move.parabole_tordue = {
    id: 'parabole_tordue',
    name: 'Parabole Tordue',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 61, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 61, max: 71 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.rumeur_inquietante = {
    id: 'rumeur_inquietante',
    name: 'Rumeur Inquiétante',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'finalDamagePct', value: 10, duration: 3, target: 'self' },
        { type: 'heal%maxHp', value: 20, target: 'self' },
    ]
}
move.sermon_effroyable = {
    id: 'sermon_effroyable',
    name: 'Sermon Effroyable',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 59, max: 69 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Voracle ---------------
move.hauspice = {
    id: 'hauspice',
    name: 'Hauspice',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 37, max: 43 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.divination = {
    id: 'divination',
    name: 'Divination',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 74, max: 86 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 11, max: 13 }, target: 'enemy' },
        { type: 'heal', heal: 21, target: 'self' }
    ]
}
move.pres_age = {
    id: 'pres_age',
    name: 'Prés\'âge',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 46, max: 54 }, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Batail'heure ---------------
move.estoc = {
    id: 'estoc',
    name: 'Estoc',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 8, max: 10 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.entaille = {
    id: 'entaille',
    name: 'Entaille',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' },
        { type: 'damage', element: 'neutre', damage: { min: 26, max: 30 }, target: 'enemy' }
    ]
}
move.heroisme = {
    id: 'heroisme',
    name: 'Héroïsme',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 38, max: 42 }, target: 'enemy' }
    ]
}
move.providence = {
    id: 'providence',
    name: 'Providence',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 43, max: 48 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 25, max: 25 }, erodedHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}
move.condamnation = {
    id: 'condamnation',
    name: 'Condamnation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 81, max: 100 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 4, target: 'self' },
    ]
}
move.bond = {
    id: 'bond',
    name: 'Bond',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Éclair'heure ---------------
move.compas = {
    id: 'compas',
    name: 'Compas',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 33, max: 37 }, target: 'enemy' }
    ]
}
move.entourloupe = {
    id: 'entourloupe',
    name: 'Entourloupe',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 32, max: 34 }, target: 'enemy' }
    ]
}
move.magnetisme = {
    id: 'magnetisme',
    name: 'Magnétisme',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.recel = {
    id: 'recel',
    name: 'Recel',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 28, max: 30 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.pulsar = {
    id: 'pulsar',
    name: 'Pulsar',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 27, max: 29 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.botte = {
    id: 'botte',
    name: 'Botte',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.aimantation = {
    id: 'aimantation',
    name: 'Aimantation',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Protect'heure ---------------
move.somnolence = {
    id: 'somnolence',
    name: 'Somnolence',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 36, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' }
    ]
}
move.rempart = {
    id: 'rempart',
    name: 'Rempart',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.renfort = {
    id: 'renfort',
    name: 'Renfort',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.barriere = {
    id: 'barriere',
    name: 'Barrière',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Marionnette du Mulou meulé ---------------
move.reconstitution = {
    id: 'reconstitution',
    name: 'Reconstitution',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 51, target: 'self' }
    ]
}
move.invocation_de_milimeulou = {
    id: 'invocation_de_milimeulou',
    name: 'Invocation de Milimeulou',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Blindur ---------------
move.ninculpation = {
    id: 'ninculpation',
    name: 'Ninculpation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 46, max: 54 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.nindestructible = {
    id: 'nindestructible',
    name: 'Nindestructible',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 43, max: 49 }, target: 'enemy' }
    ]
}
move.nindemnite = {
    id: 'nindemnite',
    name: 'Nindemnité',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 41, max: 48 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 41, max: 48 }, target: 'enemy' }
    ]
}

// -------- Maléphisto ---------------
move.prison_de_haine = {
    id: 'prison_de_haine',
    name: 'Prison de Haine',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 40, max: 46 }, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.fausse_tragedie = {
    id: 'fausse_tragedie',
    name: 'Fausse Tragédie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 42, max: 48 }, target: 'enemy' }
    ]
}
move.pacte_demoniaque = {
    id: 'pacte_demoniaque',
    name: 'Pacte Démoniaque',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 42, max: 48 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 111, max: 129 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Porkzebuth ---------------
move.embrochement_meurtrier = {
    id: 'embrochement_meurtrier',
    name: 'Embrochement Meurtrier',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 68, max: 80 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.connivence_demoniaque = {
    id: 'connivence_demoniaque',
    name: 'Connivence Démoniaque',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}
move.ruee_malfaisante = {
    id: 'ruee_malfaisante',
    name: 'Ruée Malfaisante',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 57, max: 67 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Voracle perturbée ---------------

// -------- Tanklume ---------------
move.triple_attaque = {
    id: 'triple_attaque',
    name: 'Triple attaque',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 121, max: 130 }, target: 'enemy' }
    ]
}
move.ninrmure = {
    id: 'ninrmure',
    name: 'Ninrmure',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}

// -------- Gentyran ---------------
move.fouet_palliatif = {
    id: 'fouet_palliatif',
    name: 'Fouet Palliatif',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 61, target: 'self' }
    ]
}
move.fouet_cadence = {
    id: 'fouet_cadence',
    name: 'Fouet Cadencé',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}
move.fouet_dopant = {
    id: 'fouet_dopant',
    name: 'Fouet Dopant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 61, max: 80 }, target: 'enemy' }
    ]
}

// -------- Sonj ---------------
move.sonjerie = {
    id: 'sonjerie',
    name: 'Sonjerie',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 20, max: 20 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.stimulation = {
    id: 'stimulation',
    name: 'Stimulation',
    cooldownMs: 2000,
    effects: [
        { type: 'heal%maxHp', value: 12, target: 'self' },
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}
move.manipulation_des_ombres = {
    id: 'manipulation_des_ombres',
    name: 'Manipulation des Ombres',
    cooldownMs: 2000,
    effects: [
        { type: 'esquive', chancePct: 40, reductionPct: 100, duration: 3, target: 'self' },
    ]
}
move.piege_farceur = {
    id: 'piege_farceur',
    name: 'Piège Farceur',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.cabriole_simiesque = {
    id: 'cabriole_simiesque',
    name: 'Cabriole Simiesque',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 25, max: 25 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 40, max: 40 }, target: 'enemy' }
    ]
}

// -------- Démoloch ---------------
move.appetit_infernal = {
    id: 'appetit_infernal',
    name: 'Appétit Infernal',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 35, max: 41 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'heal', heal: 38, target: 'self' }
    ]
}
move.salammbo = {
    id: 'salammbo',
    name: 'Salammbô',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' },
        { type: 'buff', stat: 'critChance', value: 30, duration: 3, target: 'self' },
        { type: 'buff', stat: 'critDamagePct', value: 100, duration: 3, target: 'self' }
    ]
}
move.fruit_du_sacrifice = {
    id: 'fruit_du_sacrifice',
    name: 'Fruit du Sacrifice',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Soldalia ---------------
move.liane_adaptive = {
    id: 'liane_adaptive',
    name: 'Liane adaptive',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 51, max: 59 }, target: 'enemy' },
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' },
        { type: 'heal%maxHp', value: 7, target: 'self' },
    ]
}
move.liane_entravante = {
    id: 'liane_entravante',
    name: 'Liane entravante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 38, max: 44 }, target: 'enemy' }
    ]
}
move.liane_attirante = {
    id: 'liane_attirante',
    name: 'Liane attirante',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Coquelicogne ---------------
move.poing_aqueux = {
    id: 'poing_aqueux',
    name: 'Poing aqueux',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}
move.poing_de_repli = {
    id: 'poing_de_repli',
    name: 'Poing de repli',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 23, max: 27 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 23, max: 27 }, target: 'enemy' }
    ]
}
move.poing_destructeur = {
    id: 'poing_destructeur',
    name: 'Poing destructeur',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 46, max: 54 }, target: 'enemy' }
    ]
}

// -------- Kreuvète la Bwork Ingénue ---------------
move.moderation = {
    id: 'moderation',
    name: 'Modération',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.mordorsene = {
    id: 'mordorsene',
    name: 'Mordorsène',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 400, duration: 3, target: 'self' }
    ]
}
move.hedite = {
    id: 'hedite',
    name: 'Hédite',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 10, max: 10 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}
move.achesse = {
    id: 'achesse',
    name: 'Achesse',
    cooldownMs: 2000,
    effects: [
        { type: 'antiHeal', duration: 3, target: 'enemy' }
    ]
}

// -------- Tambourreau ---------------
move.arbaguette = {
    id: 'arbaguette',
    name: 'Arbaguette',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 61, max: 70 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.tambourre_pif = {
    id: 'tambourre_pif',
    name: 'Tambourre-Pif',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'critChance', value: 30, duration: 3, target: 'enemy' }
    ]
}

// -------- Pistilangue ---------------
move.spore_addikt = {
    id: 'spore_addikt',
    name: 'Spore Addikt',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.flemingysme = {
    id: 'flemingysme',
    name: 'Flemingysme',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 20, max: 30 }, target: 'enemy' }
    ]
}
move.maturation = {
    id: 'maturation',
    name: 'Maturation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 27, max: 38 }, target: 'enemy' }
    ]
}

// -------- Caméliache ---------------
move.choc_infini = {
    id: 'choc_infini',
    name: 'Choc infini',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 15, duration: 3, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 60, max: 70 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.bond_tactique = {
    id: 'bond_tactique',
    name: 'Bond tactique',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.poussee_tourbillonnante = {
    id: 'poussee_tourbillonnante',
    name: 'Poussée tourbillonnante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 74, max: 86 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Domptueuse ---------------
move.martignasse = {
    id: 'martignasse',
    name: 'Martignasse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 56, max: 65 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.detresse = {
    id: 'detresse',
    name: 'Détresse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 65, max: 75 }, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.braconatte = {
    id: 'braconatte',
    name: 'Braconatte',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'maxHp', value: 1000, duration: 3, target: 'self' }
    ]
}

// -------- Bwariok ---------------
move.grappin_abyssal = {
    id: 'grappin_abyssal',
    name: 'Grappin Abyssal',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 50, max: 58 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.rugissement_infernal = {
    id: 'rugissement_infernal',
    name: 'Rugissement Infernal',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 86, max: 100 }, target: 'enemy' },
        { type: 'buff', stat: 'finalDamagePct', value: 10, duration: 3, target: 'self' }
    ]
}
move.trombe_ravageuse = {
    id: 'trombe_ravageuse',
    name: 'Trombe Ravageuse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 62, max: 72 }, target: 'enemy' },
        { type: 'dot', element: 'feu', value: 42, duration: 2, target: 'enemy' }
    ]
}

// -------- Ecaptif ---------------
move.megalerien = {
    id: 'megalerien',
    name: 'Mégalérien',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'finalDamagePct', value: 100, duration: 3, target: 'self' }
    ]
}
move.pagaifrenee = {
    id: 'pagaifrenee',
    name: 'Pagaifrénée',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 41, max: 60 }, target: 'enemy' }
    ]
}

// -------- Tentaclaque ---------------
move.parasitysme = {
    id: 'parasitysme',
    name: 'Parasitysme',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 35, max: 42 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' }
    ]
}
move.ponction_lombric = {
    id: 'ponction_lombric',
    name: 'Ponction lombric',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 25, max: 32 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Statulipe ---------------
move.glyphe_des_protecteurs = {
    id: 'glyphe_des_protecteurs',
    name: 'Glyphe des protecteurs',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.assaut_alternatif = {
    id: 'assaut_alternatif',
    name: 'Assaut alternatif',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 100, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 100, duration: 3, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 60, max: 70 }, target: 'enemy' },
        { type: 'buff', stat: 'spd', value: 10, duration: 2, target: 'self' }
    ]
}
move.ecu_tranchant = {
    id: 'ecu_tranchant',
    name: 'Écu tranchant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 25, max: 29 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 25, max: 29 }, target: 'enemy' }
    ]
}

// -------- Domptueuse perturbée ---------------

// -------- Brutasmodan ---------------
move.festin_ardent = {
    id: 'festin_ardent',
    name: 'Festin Ardent',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 37 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}
move.uppercut_abyssal = {
    id: 'uppercut_abyssal',
    name: 'Uppercut Abyssal',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 46, max: 54 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 74, max: 86 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 102, max: 118 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 130, max: 151 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 157, max: 183 }, target: 'enemy' }
    ]
}
move.ruade_brutale = {
    id: 'ruade_brutale',
    name: 'Ruade Brutale',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'debuff', stat: 'force', value: 200, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'force', value: 200, duration: 3, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 44, max: 52 }, target: 'enemy' }
    ]
}

// -------- Garde du Conseil ---------------
move.relent = {
    id: 'relent',
    name: 'Relent',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 26 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.sepiolite = {
    id: 'sepiolite',
    name: 'Sépiolite',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 37, max: 42 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.trine = {
    id: 'trine',
    name: 'Trine',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'flatDamage', value: 15, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 27, max: 32 }, target: 'enemy' },
        { type: 'debuff', stat: 'flatDamage', value: 15, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 27, max: 32 }, target: 'enemy' }
    ]
}

// -------- Briko Altruiste ---------------
move.stase_regenerante = {
    id: 'stase_regenerante',
    name: 'Stase Régénérante',
    cooldownMs: 2000,
    effects: [
        { type: 'heal%maxHp', value: 10, target: 'self' },
        { type: 'heal%maxHp', value: 10, target: 'self' },
    ]
}
move.solidarite_chronique = {
    id: 'solidarite_chronique',
    name: 'Solidarité Chronique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 38, max: 44 }, target: 'enemy' },
        { type: 'heal%maxHp', value: 5, target: 'self' },
    ]
}

// -------- Briko Galvanisant ---------------
move.chronoxydation = {
    id: 'chronoxydation',
    name: 'Chronoxydation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 41, max: 47 }, target: 'enemy' }
        // TODO: Minimise les effets aléatoires de la cible
    ]
}
move.onde_protectrice = {
    id: 'onde_protectrice',
    name: 'Onde Protectrice',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 35, max: 41 }, target: 'enemy' },
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}

// -------- Briko Exaltant ---------------
move.frelaterie = {
    id: 'frelaterie',
    name: 'Frelaterie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 43, max: 49 }, target: 'enemy' }
    ]
}
move.deplacements_degradants = {
    id: 'deplacements_degradants',
    name: 'Déplacements dégradants',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 10, max: 14 }, erodedHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}

// -------- Nheur'Gueule ---------------
move.tourbe_ylol = {
    id: 'tourbe_ylol',
    name: 'Tourbe Ylol',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 39, max: 44 }, target: 'enemy' }
    ]
}
move.brutalysme = {
    id: 'brutalysme',
    name: 'Brutalysme',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 35, max: 47 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.crachacide = {
    id: 'crachacide',
    name: 'Crachacide',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 19, max: 27 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.germinator = {
    id: 'germinator',
    name: 'Germinator',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Armuguet ---------------
move.epine_revigorante = {
    id: 'epine_revigorante',
    name: 'Épine revigorante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 44, max: 52 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.attraction_brulante = {
    id: 'attraction_brulante',
    name: 'Attraction brûlante',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 39, max: 45 }, target: 'enemy' }
    ]
}

// -------- Ébourifauve ---------------
move.paresse = {
    id: 'paresse',
    name: 'Paresse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 42, max: 48 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'avance', target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.feligance = {
    id: 'feligance',
    name: 'Féligance',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 111, max: 129 }, target: 'enemy' },
        { type: 'buff', stat: 'damageReductionPct', value: 10, duration: 3, target: 'self' }
    ]
}

// -------- Sinj ---------------
move.sinjerie = {
    id: 'sinjerie',
    name: 'Sinjerie',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 15, duration: 3, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 50, max: 50 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.vague_destructrice_du_singe = {
    id: 'vague_destructrice_du_singe',
    name: 'Vague Destructrice du Singe',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 40, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.fulgurang_outan = {
    id: 'fulgurang_outan',
    name: 'Fulgurang-outan',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 30, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.ninjutsinj = {
    id: 'ninjutsinj',
    name: 'Ninjutsinj',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.super_sinj = {
    id: 'super_sinj',
    name: 'Super Sinj',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'finalDamagePct', value: 30, duration: 3, target: 'self' },
        { type: 'buff', stat: 'damageReductionPct', value: 30, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' }
    ]
}

// -------- Boularbin ---------------
move.renfortiche = {
    id: 'renfortiche',
    name: 'Renfortiche',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 100, duration: 3, target: 'self' }
    ]
}
move.compression = {
    id: 'compression',
    name: 'Compression',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 61, max: 70 }, target: 'enemy' },
        { type: 'buff', stat: 'damageReductionPct', value: 5, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'damageReductionPct', value: 5, duration: 3, target: 'enemy' }
    ]
}
move.penitence = {
    id: 'penitence',
    name: 'Pénitence',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 61, max: 70 }, target: 'enemy' }
    ]
}

// -------- Lapilope ---------------

// -------- Ébourifauve perturbée ---------------

// -------- Bonraphin ---------------
move.faux_seraphine = {
    id: 'faux_seraphine',
    name: 'Faux Séraphine',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 46, max: 54 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.colonne_de_lumiere = {
    id: 'colonne_de_lumiere',
    name: 'Colonne de Lumière',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 38, max: 44 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 66, max: 76 }, target: 'enemy' },
        { type: 'heal', heal: 80, target: 'self' }
    ]
}

// -------- Brâklotin ---------------
move.epee_diablotine = {
    id: 'epee_diablotine',
    name: 'Épée Diablotine',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 58, max: 68 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.colonne_de_flammes = {
    id: 'colonne_de_flammes',
    name: 'Colonne de Flammes',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 29, max: 33 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'recul', target: 'enemy' }
    ]
}

// -------- Brutapir ---------------

// -------- Briko Taquin ---------------
move.metaplasme = {
    id: 'metaplasme',
    name: 'Métaplasme',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 33, max: 39 }, target: 'enemy' }
    ]
}
move.perversion = {
    id: 'perversion',
    name: 'Perversion',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 41, max: 47 }, target: 'enemy' }
    ]
}

// -------- Briko Stimulant ---------------
move.devotion_combative = {
    id: 'devotion_combative',
    name: 'Dévotion Combative',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'finalDamagePct', value: 10, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'damageReductionPct', value: 10, duration: 3, target: 'enemy' }
    ]
}
move.chrono_calmant = {
    id: 'chrono_calmant',
    name: 'Chrono-Calmant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 37 }, target: 'enemy' }
    ]
}

// -------- Bruto Pernicieux ---------------
move.metathese = {
    id: 'metathese',
    name: 'Métathèse',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'feu', value: 50, duration: 2, target: 'enemy' }
    ]
}
move.pernipiege = {
    id: 'pernipiege',
    name: 'Pernipiège',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Bruto Frénétique ---------------
move.bombarde_kantik = {
    id: 'bombarde_kantik',
    name: 'Bombarde Kantik',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 46, max: 54 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 86, max: 100 }, target: 'enemy' }
    ]
}

// -------- Bruto Colérique ---------------
move.affaissement = {
    id: 'affaissement',
    name: 'Affaissement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 81, max: 95 }, target: 'enemy' }
    ]
}
move.encanaillement = {
    id: 'encanaillement',
    name: 'Encanaillement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 67, max: 77 }, target: 'enemy' }
    ]
}

// -------- Larve Cauchemardesque ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Toubibz perturbé ---------------

// -------- Gyrafor ---------------

// -------- Gropotam ---------------

// -------- Amphibouc ---------------

// -------- Bosko Tho ---------------
move.contre_courant = {
    id: 'contre_courant',
    name: 'Contre-Courant',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Draguisla Bonita ---------------
move.cratere = {
    id: 'cratere',
    name: 'Cratère',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 39, max: 45 }, target: 'enemy' }
    ]
}
move.crachat_anesthesiant = {
    id: 'crachat_anesthesiant',
    name: 'Crachat anesthésiant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 52, max: 60 }, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Kamikabz perturbé ---------------

// -------- Lapilope perturbé ---------------

// -------- Krokille Mature Crue ---------------

// -------- Chafer Lancier Vétéran ---------------

// -------- Quadrabz perturbé ---------------

// -------- Brutapir perturbé ---------------

// -------- Bruto Acharné ---------------
move.inimitie = {
    id: 'inimitie',
    name: 'Inimitié',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 65, max: 75 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 88, max: 102 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 111, max: 129 }, target: 'enemy' }
    ]
}
move.boulversement = {
    id: 'boulversement',
    name: 'Boulversement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 74, max: 86 }, target: 'enemy' },
        { type: 'debuff', stat: 'force', value: 150, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'force', value: 150, duration: 3, target: 'self' }
    ]
}

// -------- Bruto Virulent ---------------
move.perseverance = {
    id: 'perseverance',
    name: 'Persévérance',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 69, max: 81 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 4, target: 'self' },
    ]
}
move.aveuglette = {
    id: 'aveuglette',
    name: 'Aveuglette',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 57, max: 67 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}

// -------- Gropotam perturbé ---------------

// -------- Amphibouc perturbé ---------------

// -------- Monolithe ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Balebz perturbé ---------------

// -------- Gyrafor perturbé ---------------

// -------- Cocolune ---------------
move.attraction_lunaire = {
    id: 'attraction_lunaire',
    name: 'Attraction lunaire',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Gromo Envahissant ---------------
move.talonnade = {
    id: 'talonnade',
    name: 'Talonnade',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 69, max: 81 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.carcan = {
    id: 'carcan',
    name: 'Carcan',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 52, max: 60 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Gromo Écrasant ---------------
move.paralysie = {
    id: 'paralysie',
    name: 'Paralysie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 63, max: 73 }, target: 'enemy' }
    ]
}
move.anabolisme = {
    id: 'anabolisme',
    name: 'Anabolisme',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 48, max: 56 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Gromo Endurant ---------------
move.ingurgitation = {
    id: 'ingurgitation',
    name: 'Ingurgitation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 61, max: 71 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.jonction = {
    id: 'jonction',
    name: 'Jonction',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 56, max: 65 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Gromo Intercepteur ---------------
move.chrono_interception = {
    id: 'chrono_interception',
    name: 'Chrono-interception',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.chrono_trig_heure = {
    id: 'chrono_trig_heure',
    name: 'Chrono Trig\'Heure',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 52, max: 60 }, target: 'enemy' }
    ]
}
move.exclusion = {
    id: 'exclusion',
    name: 'Exclusion',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 35, max: 41 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Gromo Protecteur ---------------
move.chronoclier = {
    id: 'chronoclier',
    name: 'Chronoclier',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 55, max: 63 }, target: 'enemy' }
    ]
}
move.liquefaction = {
    id: 'liquefaction',
    name: 'Liquéfaction',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 47, max: 55 }, target: 'enemy' }
    ]
}

// -------- Cauchemar des Ravageurs ---------------
move.tourments_eternels = {
    id: 'tourments_eternels',
    name: 'Tourments Éternels',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 33, max: 38 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 33, max: 38 }, target: 'enemy' }
    ]
}
move.intrusion_cauchemardesque = {
    id: 'intrusion_cauchemardesque',
    name: 'Intrusion Cauchemardesque',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 39, max: 45 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 77, max: 89 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.mauvais_reves = {
    id: 'mauvais_reves',
    name: 'Mauvais Rêves',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'finalDamagePct', value: 15, duration: 3, target: 'self' }
    ]
}
move.songe_d_une_nuit_d_enfer = {
    id: 'songe_d_une_nuit_d_enfer',
    name: 'Songe d\'une nuit d\'enfer',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 60, max: 70 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 15, max: 15 }, erodedHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}

// -------- Artroolleur ---------------
move.tir_d_artroollerie = {
    id: 'tir_d_artroollerie',
    name: 'Tir d\'Artroollerie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 56, max: 65 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.mortrooll = {
    id: 'mortrooll',
    name: 'Mortrooll',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 81, max: 95 }, target: 'enemy' }
    ]
}

// -------- Krokille Vénérable Crue ---------------

// -------- Nitrooll ---------------
move.double_trooll = {
    id: 'double_trooll',
    name: 'Double Trooll',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 32, max: 38 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 32, max: 38 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.trooll_de_magie = {
    id: 'trooll_de_magie',
    name: 'Trooll de Magie',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 56, target: 'self' }
    ]
}
move.troollement_de_tambour = {
    id: 'troollement_de_tambour',
    name: 'Troollement de Tambour',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.coup_de_trooll = {
    id: 'coup_de_trooll',
    name: 'Coup de Trooll',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Bribes de gardien ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Troollibre ---------------
move.troollpoline = {
    id: 'troollpoline',
    name: 'Troollpoline',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 100, max: 116 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.aspiratrooll = {
    id: 'aspiratrooll',
    name: 'Aspiratrooll',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 65, max: 75 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'buff', stat: 'erosionBonus', value: 10, duration: 3, target: 'self' }
    ]
}
move.patroolleur = {
    id: 'patroolleur',
    name: 'Patroolleur',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'finalDamagePct', value: 15, duration: 3, target: 'self' }
    ]
}

// -------- Incarnation du Ch'Tyx ---------------

// -------- Mi ---------------
move.enveloppage = {
    id: 'enveloppage',
    name: 'Enveloppage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 16, max: 20 }, target: 'enemy' }
    ]
}

// -------- Chi ---------------
move.emoussage = {
    id: 'emoussage',
    name: 'Emoussage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 201, max: 220 }, target: 'enemy' }
    ]
}

// -------- Autel de la Chasse ---------------
// Aucun sort dans DofusDB pour ce monstre

// -------- Gargandyas ---------------
move.sceaux_telluriques = {
    id: 'sceaux_telluriques',
    name: 'Sceaux Telluriques',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 46, max: 54 }, target: 'enemy' }
    ]
}
move.amnesie_animale = {
    id: 'amnesie_animale',
    name: 'Amnésie Animale',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 10, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.gargameha = {
    id: 'gargameha',
    name: 'Gargameha',
    cooldownMs: 2000,
    effects: [
    ]
}

// -------- Mama Troollette ---------------
move.troollooportation = {
    id: 'troollooportation',
    name: 'Troollooportation',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 60, max: 70 }, target: 'enemy' }
    ]
}
move.uppertrooll = {
    id: 'uppertrooll',
    name: 'Uppertrooll',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 46, max: 54 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.mitroollette_de_poings = {
    id: 'mitroollette_de_poings',
    name: 'Mitroollette de Poings',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 93, max: 108 }, target: 'enemy' }
    ]
}
move.catastrooll = {
    id: 'catastrooll',
    name: 'Catastrooll',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'buff', stat: 'finalDamagePct', value: 20, duration: 3, target: 'self' }
    ]
}

// -------- Chafer Rōnin ---------------
move.bushido = {
    id: 'bushido',
    name: 'Bushido',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.kikoha = {
    id: 'kikoha',
    name: 'Kikoha',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Batofu ---------------
move.gotame = {
    id: 'gotame',
    name: 'Gotame',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.beco_de_batofu = {
    id: 'beco_de_batofu',
    name: 'Béco de Batofu',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 17, max: 26 }, target: 'enemy' }
    ]
}
move.lancer_de_tofu_fugace = {
    id: 'lancer_de_tofu_fugace',
    name: 'Lancer de Tofu Fugace',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.liberte = {
    id: 'liberte',
    name: 'Liberté',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Coffre des Forgerons ---------------
move.tchaiste = {
    id: 'tchaiste',
    name: 'Tchaiste',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 50, max: 50 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 30, duration: 3, target: 'self' }
    ]
}
move.avidite = {
    id: 'avidite',
    name: 'Avidité',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Boostache ---------------
move.frayeurs = {
    id: 'frayeurs',
    name: 'Frayeurs',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
    ]
}
move.l_enfer_des_zombies = {
    id: 'l_enfer_des_zombies',
    name: 'L\'Enfer des Zombies',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.le_dentiste = {
    id: 'le_dentiste',
    name: 'Le Dentiste',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'buff', stat: 'erosionBonus', value: 30, duration: 3, target: 'self' }
    ]
}
move.esprit_empetrant = {
    id: 'esprit_empetrant',
    name: 'Esprit empêtrant',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Kankreblath ---------------
move.blatheration = {
    id: 'blatheration',
    name: 'Blathération',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 23, max: 38 }, target: 'enemy' }
    ]
}
move.kankroulahoup = {
    id: 'kankroulahoup',
    name: 'Kankroulahoup',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 19, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 19, max: 30 }, target: 'enemy' }
    ]
}
move.sfvc_r = {
    id: 'sfvc_r',
    name: 'Sfvc%$*$R ?',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'esquive', chancePct: 40, reductionPct: 100, duration: 3, target: 'self' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Protozorreur ---------------
move.jet_proto = {
    id: 'jet_proto',
    name: 'Jet Proto',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 4, target: 'self' },
    ]
}
move.electrocution = {
    id: 'electrocution',
    name: 'Électrocution',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 81, max: 100 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.infection = {
    id: 'infection',
    name: 'Infection',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' },
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 50, max: 50 }, erodedHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Directeur Grunob ---------------
move.sermon_educatif = {
    id: 'sermon_educatif',
    name: 'Sermon Éducatif',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.chachagobert = {
    id: 'chachagobert',
    name: 'Chachagobert',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: ['dagobert'], duration: 3, target: 'enemy' }
    ]
}
move.cuvee_des_gobs = {
    id: 'cuvee_des_gobs',
    name: 'Cuvée des Gobs',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 19, max: 23 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Rakoopeur ---------------
move.serpette = {
    id: 'serpette',
    name: 'Serpette',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 6, max: 7 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 6, max: 7 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 6, max: 7 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 6, max: 7 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 6, max: 7 }, target: 'enemy' }
    ]
}
move.camaraderie = {
    id: 'camaraderie',
    name: 'Camaraderie',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}

// -------- Sapik ---------------
move.enguirlandage = {
    id: 'enguirlandage',
    name: 'Enguirlandage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 12, max: 14 }, target: 'enemy' },
        { type: 'debuff', stat: 'critChance', value: 15, duration: 3, target: 'enemy' }
    ]
}
move.calin_kipik = {
    id: 'calin_kipik',
    name: 'Câlin Kipik',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 28, max: 32 }, target: 'enemy' }
    ]
}
move.kokapik = {
    id: 'kokapik',
    name: 'Kokapik',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Mawabouaino ---------------
move.cacaobstwuant = {
    id: 'cacaobstwuant',
    name: 'Cacaobstwuant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.chocohowte = {
    id: 'chocohowte',
    name: 'Chocohowte',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.eclat = {
    id: 'eclat',
    name: 'Éclat',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' }
    ]
}
move.chocolave = {
    id: 'chocolave',
    name: 'Chocolave',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'res.terre', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Bworkette ---------------
move.abolissement = {
    id: 'abolissement',
    name: 'Abolissement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 200, max: 200 }, target: 'enemy' }
    ]
}
move.charge = {
    id: 'charge',
    name: 'Charge',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 40 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 1, duration: 3, target: 'self' }
    ]
}
move.mot_croise = {
    id: 'mot_croise',
    name: 'Mot Croisé',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 15, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 15, max: 18 }, target: 'enemy' }
    ]
}
move.reconstitution_bwork = {
    id: 'reconstitution_bwork',
    name: 'Reconstitution Bwork',
    cooldownMs: 2000,
    effects: [
        { type: 'heal%maxHp', value: 50, target: 'self' },
    ]
}

// -------- Kanniboul Ebil ---------------
move.inspiration_moonesque = {
    id: 'inspiration_moonesque',
    name: 'Inspiration Moonesque',
    cooldownMs: 3000,
    effects: [
        { type: 'summon', summonPool: ['kanniboul_ark','kanniboul_jav','kanniboul_eth','kanniboul_sarbak','kanniboul_tam'], duration: 3, target: 'enemy' }
    ]
}
move.bouboule = {
    id: 'bouboule',
    name: 'Bouboule',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 41, max: 45 }, target: 'enemy' }
    ]
}

// -------- Grozilla Somnambule ---------------
move.tyrannisation = {
    id: 'tyrannisation',
    name: 'Tyrannisation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 31, max: 50 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 50, max: 50 }, currentHpScale: { stat: 'finalDamagePct', ratio: 0.5 }, target: 'enemy' }
    ]
}
move.gravite = {
    id: 'gravite',
    name: 'Gravité',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        // TODO: Minimise les effets aléatoires de la cible
    ]
}

// -------- Gourlo le Terrible ---------------
move.invocation_de_tonneau = {
    id: 'invocation_de_tonneau',
    name: 'Invocation de Tonneau',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'agility', value: 200, duration: 3, target: 'self' }
    ]
}
move.un_gros_boulet_sur_un_autre_boulet = {
    id: 'un_gros_boulet_sur_un_autre_boulet',
    name: 'Un gros boulet sur un autre boulet',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 50 }, target: 'enemy' }
    ]
}
move.bombarde = {
    id: 'bombarde',
    name: 'Bombarde',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 11, max: 110 }, target: 'enemy' },
        { type: 'debuff', stat: 'critChance', value: 1, duration: 3, target: 'enemy' }
    ]
}

// -------- Nelween ---------------
move.exhalation_toxique = {
    id: 'exhalation_toxique',
    name: 'Exhalation Toxique',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'damageReductionPct', value: 30, duration: 3, target: 'enemy' }
    ]
}
move.mord_mollet = {
    id: 'mord_mollet',
    name: 'Mord Mollet',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 19, max: 24 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.soin_diffus = {
    id: 'soin_diffus',
    name: 'Soin Diffus',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 24 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Shin Larve ---------------
move.enlisement = {
    id: 'enlisement',
    name: 'Enlisement',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}
move.convocation_gluante = {
    id: 'convocation_gluante',
    name: 'Convocation gluante',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.deglutition = {
    id: 'deglutition',
    name: 'Déglutition',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 40 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Corailleur Magistral ---------------
move.coraillement_magistral = {
    id: 'coraillement_magistral',
    name: 'Coraillement Magistral',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'atk', value: 400, duration: 3, target: 'self' }
    ]
}
move.lancer_de_corail_magistral = {
    id: 'lancer_de_corail_magistral',
    name: 'Lancer de Corail Magistral',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 1, max: 10 }, target: 'enemy' },
        { type: 'debuff', stat: 'agility', value: 30, duration: 3, target: 'enemy' }
    ]
}
move.frappe_de_corail_magistrale = {
    id: 'frappe_de_corail_magistrale',
    name: 'Frappe de Corail Magistrale',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 9000, max: 9000 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Choudini ---------------
move.reste_assis = {
    id: 'reste_assis',
    name: 'Reste assis',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.vinriktus = {
    id: 'vinriktus',
    name: 'Vinriktus',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.detriktus = {
    id: 'detriktus',
    name: 'Détriktus',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Wa Wabbit ---------------
move.wawabehameha = {
    id: 'wawabehameha',
    name: 'WaWabehameha',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}
move.abrutissement = {
    id: 'abrutissement',
    name: 'Abrutissement',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'force', value: 101, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'intelligence', value: 101, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'agility', value: 101, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'chance', value: 101, duration: 3, target: 'enemy' }
    ]
}
move.awmuwe_woyale = {
    id: 'awmuwe_woyale',
    name: 'Awmuwe Woyale',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 0, duration: 3, target: 'self' }
    ]
}
move.cawotte_woyale = {
    id: 'cawotte_woyale',
    name: 'Cawotte Woyale',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Le Chouque ---------------
move.coup_de_sabre_maudit = {
    id: 'coup_de_sabre_maudit',
    name: 'Coup de Sabre Maudit',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 41, max: 45 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 150, duration: 3, target: 'enemy' }
    ]
}

// -------- Craqueleur Légendaire ---------------
move.peau_de_granite = {
    id: 'peau_de_granite',
    name: 'Peau de Granite',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 20, duration: 2, target: 'self' },
    ]
}
move.pierre_etourdissante = {
    id: 'pierre_etourdissante',
    name: 'Pierre Étourdissante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 11, max: 20 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' }
    ]
}
move.peau_de_silex = {
    id: 'peau_de_silex',
    name: 'Peau de Silex',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 50, duration: 3, target: 'self' }
    ]
}
move.invocation_montagnarde = {
    id: 'invocation_montagnarde',
    name: 'Invocation Montagnarde',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.peau_de_topaze = {
    id: 'peau_de_topaze',
    name: 'Peau de Topaze',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 20, duration: 2, target: 'self' },
    ]
}
move.coeur_de_craqueleur = {
    id: 'coeur_de_craqueleur',
    name: 'Coeur de Craqueleur',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}
move.frappe_du_craqueleur_legendaire = {
    id: 'frappe_du_craqueleur_legendaire',
    name: 'Frappe du Craqueleur Légendaire',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 26, max: 35 }, target: 'enemy' }
    ]
}

// -------- Halouine ---------------
move.rattirance = {
    id: 'rattirance',
    name: 'Râttirance',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}
move.moissonnage = {
    id: 'moissonnage',
    name: 'Moissonnage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 41, max: 45 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'buff', stat: 'maxHp', value: 200, duration: 2, target: 'self' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.plantes_zombies = {
    id: 'plantes_zombies',
    name: 'Plantes Zombies',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.citwouille_explosive = {
    id: 'citwouille_explosive',
    name: 'Citwouille Explosive',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 21, max: 25 }, target: 'enemy' }
        // TODO: Minimise les effets aléatoires de la cible
    ]
}

// -------- Tofu Royal ---------------
move.dechiquetage = {
    id: 'dechiquetage',
    name: 'Déchiquetage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 16, max: 25 }, target: 'enemy' }
    ]
}
move.ecrasement_royal = {
    id: 'ecrasement_royal',
    name: 'Écrasement Royal',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'maxHp', value: 51, duration: 3, target: 'enemy' }
    ]
}
move.invocation_royale_de_tofu = {
    id: 'invocation_royale_de_tofu',
    name: 'Invocation Royale de Tofu',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.beco_du_tofu_royal = {
    id: 'beco_du_tofu_royal',
    name: 'Béco du Tofu Royal',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 11, max: 15 }, target: 'enemy' }
    ]
}

// -------- Blop Multicolore Royal ---------------
move.blopoutrage_royal = {
    id: 'blopoutrage_royal',
    name: 'Blopoutrage Royal',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.blopacification = {
    id: 'blopacification',
    name: 'Blopacification',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 50, duration: 3, target: 'self' }
    ]
}

// -------- Wa Wobot ---------------
move.mekattwaction = {
    id: 'mekattwaction',
    name: 'Mékattwaction',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}
move.twansmutation = {
    id: 'twansmutation',
    name: 'Twansmutation',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.mekawapace = {
    id: 'mekawapace',
    name: 'Mékawapace',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'res.air', value: 30, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.eau', value: 30, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.feu', value: 30, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.neutre', value: 30, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.terre', value: 30, duration: 3, target: 'self' }
    ]
}
move.wouste = {
    id: 'wouste',
    name: 'Wouste',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.substitution = {
    id: 'substitution',
    name: 'Substitution',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}

// -------- Reine Nyée ---------------
move.ponte_d_oeuf = {
    id: 'ponte_d_oeuf',
    name: 'Ponte d\'Oeuf',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.cisaillage = {
    id: 'cisaillage',
    name: 'Cisaillage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 41, max: 45 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.mitraille_de_soie = {
    id: 'mitraille_de_soie',
    name: 'Mitraille de soie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 15, duration: 3, target: 'enemy' }
    ]
}

// -------- Moon ---------------
move.marteau_de_moon = {
    id: 'marteau_de_moon',
    name: 'Marteau de Moon',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 31, max: 35 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.choc_sismique = {
    id: 'choc_sismique',
    name: 'Choc Sismique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.face_cachee = {
    id: 'face_cachee',
    name: 'Face Cachée',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Malléfisk ---------------
move.ka_dabor = {
    id: 'ka_dabor',
    name: 'Ka Dabor',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}
move.chte_hu = {
    id: 'chte_hu',
    name: 'Chté Hu !',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.nonoube_noharnak = {
    id: 'nonoube_noharnak',
    name: 'Nonoube Noharnak',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 20, max: 20 }, erodedHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' },
        { type: 'shield', value: 1000, duration: 3, target: 'self' }
    ]
}

// -------- Tynril Consterné ---------------
move.hiffe = {
    id: 'hiffe',
    name: 'Hiffe',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'res.air', value: 2000, duration: 3, target: 'enemy' }
    ]
}
move.helse = {
    id: 'helse',
    name: 'Helse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 31, max: 50 }, target: 'enemy' }
    ]
}
move.forque = {
    id: 'forque',
    name: 'Forque',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 50, target: 'self' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}

// -------- Tynril Déconcerté ---------------
move.hiffe_eau = {
    id: 'hiffe_eau',
    name: 'Hiffe',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'res.eau', value: 2000, duration: 3, target: 'enemy' }
    ]
}
move.helse_eau = {
    id: 'helse_eau',
    name: 'Helse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 31, max: 50 }, target: 'enemy' }
    ]
}
// -------- Tynril Perfide ---------------
move.hiffe_feu = {
    id: 'hiffe_feu',
    name: 'Hiffe',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'res.feu', value: 2000, duration: 3, target: 'enemy' }
    ]
}
move.helse = {
    id: 'helse',
    name: 'Helse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 50 }, target: 'enemy' }
    ]
}
// -------- Tynril Ahuri ---------------
move.hiffe_terre = {
    id: 'hiffe_terre',
    name: 'Hiffe',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'res.terre', value: 2000, duration: 3, target: 'enemy' }
    ]
}
move.helse_terre = {
    id: 'helse_terre',
    name: 'Helse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 50 }, target: 'enemy' }
    ]
}
// -------- Papa Nowel ---------------
move.engluement = {
    id: 'engluement',
    name: 'Engluement',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 1, max: 2 }, target: 'enemy' }
    ]
}
move.dichotomie = {
    id: 'dichotomie',
    name: 'Dichotomie',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'maxHp', value: 200, duration: 2, target: 'enemy' }
    ]
}
move.aspir_nenfan = {
    id: 'aspir_nenfan',
    name: 'Aspir\'nenfan',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}
move.embuche_de_nowel = {
    id: 'embuche_de_nowel',
    name: 'Embûche de Nowel',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 10000, target: 'self' },
        { type: 'buff', stat: 'atk', value: 100, duration: 3, target: 'self' }
    ]
}
move.trak_nenfan = {
    id: 'trak_nenfan',
    name: 'Trak\'nenfan',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.infantophagie = {
    id: 'infantophagie',
    name: 'Infantophagie',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 500, target: 'self' }
    ]
}

// -------- Ush Galesh ---------------
move.eclair_rouge = {
    id: 'eclair_rouge',
    name: 'Éclair Rouge',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 52, max: 56 }, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 15, duration: 3, target: 'enemy' }
    ]
}
move.pulsation_malsaine = {
    id: 'pulsation_malsaine',
    name: 'Pulsation Malsaine',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 76, max: 80 }, target: 'enemy' }
    ]
}

// -------- Minotoror ---------------
move.lancer_de_tofu = {
    id: 'lancer_de_tofu',
    name: 'Lancer de Tofu',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.graines_magiques = {
    id: 'graines_magiques',
    name: 'Graines Magiques',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'maxHp', value: 100, duration: 3, target: 'self' },
        { type: 'buff', stat: 'flatDamage', value: 50, duration: 3, target: 'self' }
    ]
}
move.sabotage = {
    id: 'sabotage',
    name: 'Sabotage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 71, max: 110 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Founoroshi ---------------
move.fumee_alourdissante = {
    id: 'fumee_alourdissante',
    name: 'Fumée alourdissante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.fumee_asphyxiante = {
    id: 'fumee_asphyxiante',
    name: 'Fumée asphyxiante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 31, max: 40 }, target: 'enemy' }
    ]
}
move.fumee_aveuglante = {
    id: 'fumee_aveuglante',
    name: 'Fumée aveuglante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'air', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.fumee_brulante = {
    id: 'fumee_brulante',
    name: 'Fumée brûlante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 31, max: 40 }, target: 'enemy' }
    ]
}
move.petards_volants = {
    id: 'petards_volants',
    name: 'Pétards volants',
    cooldownMs: 2000,
    effects: [
        { type: 'esquive', chancePct: 40, reductionPct: 100, duration: 3, target: 'self' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Pounicheur ---------------
move.kissifrotsipik = {
    id: 'kissifrotsipik',
    name: 'Kissifrotsipik',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'damageReductionPct', value: 200, duration: 2, target: 'enemy' },
    ]
}
move.poulverisation = {
    id: 'poulverisation',
    name: 'Poulvérisation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 54, max: 58 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Maître Corbac ---------------
move.sanction_tenebreuse = {
    id: 'sanction_tenebreuse',
    name: 'Sanction Ténébreuse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 51, max: 70 }, target: 'enemy' }
    ]
}
move.lien_volatile = {
    id: 'lien_volatile',
    name: 'Lien Volatile',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'critChance', value: 7, duration: 3, target: 'self' }
    ]
}
move.invocation_de_corbac = {
    id: 'invocation_de_corbac',
    name: 'Invocation de Corbac',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.carapace_d_ailes = {
    id: 'carapace_d_ailes',
    name: 'Carapace d\'Ailes',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'renvoi', ratio: 0.5, target: 'self' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' }
    ]
}

// -------- Skeunk ---------------
move.chant_regenerant = {
    id: 'chant_regenerant',
    name: 'Chant Régénérant',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 26, target: 'self' },
        { type: 'heal', heal: 11, target: 'self' }
    ]
}
move.chant_stimulant = {
    id: 'chant_stimulant',
    name: 'Chant Stimulant',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'erosionBonus', value: 10, duration: 3, target: 'self' }
    ]
}
move.chant_de_jouvence = {
    id: 'chant_de_jouvence',
    name: 'Chant de Jouvence',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
    ]
}
move.chant_immobilisant = {
    id: 'chant_immobilisant',
    name: 'Chant Immobilisant',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.chant_foudroyant = {
    id: 'chant_foudroyant',
    name: 'Chant Foudroyant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 41, max: 60 }, target: 'enemy' }
    ]
}

// -------- Grozilla Épuisé ---------------

// -------- Nagate ---------------
move.eau_fraiche = {
    id: 'eau_fraiche',
    name: 'Eau fraîche',
    cooldownMs: 2000,
    effects: [
        { type: 'heal%maxHp', value: 25, target: 'self' },
        { type: 'heal%maxHp', value: 38, target: 'self' },
        { type: 'heal%maxHp', value: 50, target: 'self' },
        { type: 'heal%maxHp', value: 63, target: 'self' },
    ]
}
move.hatsunamiku = {
    id: 'hatsunamiku',
    name: 'Hatsunamiku',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 32, max: 37 }, target: 'enemy' }
    ]
}
move.colere_bouillonnante = {
    id: 'colere_bouillonnante',
    name: 'Colère bouillonnante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 63, max: 73 }, target: 'enemy' }
    ]
}
move.hors_de_ma_vue = {
    id: 'hors_de_ma_vue',
    name: 'Hors de ma vue',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 33, max: 39 }, target: 'enemy' }
    ]
}
move.invocation_de_bombombre_de_nagate = {
    id: 'invocation_de_bombombre_de_nagate',
    name: 'Invocation de Bombombre de Nagate',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Royalmouth ---------------
move.regroupmouth = {
    id: 'regroupmouth',
    name: 'Regroupmouth',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.lichemouth = {
    id: 'lichemouth',
    name: 'Lichemouth',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 66, max: 75 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.aleamouth = {
    id: 'aleamouth',
    name: 'Aléamouth',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Fraktale ---------------
move.instabilite_temporelle = {
    id: 'instabilite_temporelle',
    name: 'Instabilité temporelle',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.chaleur_fugace = {
    id: 'chaleur_fugace',
    name: 'Chaleur fugace',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 125, max: 125 }, erodedHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}
move.frakasse = {
    id: 'frakasse',
    name: 'Frakasse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}

// -------- Damadrya ---------------
move.aubepine = {
    id: 'aubepine',
    name: 'Aubépine',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.bourgeonnement = {
    id: 'bourgeonnement',
    name: 'Bourgeonnement',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.urticaire = {
    id: 'urticaire',
    name: 'Urticaire',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' }
    ]
}

// -------- Haute Truche ---------------
move.prendre_son_pied = {
    id: 'prendre_son_pied',
    name: 'Prendre son pied',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.flatulences_buccales = {
    id: 'flatulences_buccales',
    name: 'Flatulences buccales',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 200, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' }
    ]
}
move.degazage = {
    id: 'degazage',
    name: 'Dégazage',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.tete_dans_le_sable = {
    id: 'tete_dans_le_sable',
    name: 'Tête dans le sable',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- El Piko ---------------
move.pikak = {
    id: 'pikak',
    name: 'Pikak',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'agility', value: 50, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'agility', value: 50, duration: 3, target: 'self' },
        { type: 'damage', element: 'air', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'chance', value: 50, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'chance', value: 50, duration: 3, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'force', value: 50, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'force', value: 50, duration: 3, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'intelligence', value: 50, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'intelligence', value: 50, duration: 3, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 31, max: 40 }, target: 'enemy' }
    ]
}
move.pikepik = {
    id: 'pikepik',
    name: 'Piképik',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.bamba = {
    id: 'bamba',
    name: 'Bamba',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 2, duration: 2, target: 'enemy' },
        { type: 'buff', stat: 'spd', value: 2, duration: 2, target: 'self' },
        { type: 'debuff', stat: 'maxHp', value: 100, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'maxHp', value: 100, duration: 3, target: 'self' }
    ]
}

// -------- Meulou ---------------
move.etripage = {
    id: 'etripage',
    name: 'Étripage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.rage_reconstituante = {
    id: 'rage_reconstituante',
    name: 'Rage Reconstituante',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 400, target: 'self' }
    ]
}

// -------- Capitaine Ekarlatte ---------------
move.case_depart = {
    id: 'case_depart',
    name: 'Case départ',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'avance', target: 'enemy' }
    ]
}
move.tourbilaule = {
    id: 'tourbilaule',
    name: 'Tourbilaule',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'heal', heal: 50, target: 'self' }
    ]
}
move.dansorcellement = {
    id: 'dansorcellement',
    name: 'Dansorcellement',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.enfumage = {
    id: 'enfumage',
    name: 'Enfumage',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 100, duration: 3, target: 'enemy' }
    ]
}

// -------- Koulosse ---------------
move.invocation_de_bouftou_des_cavernes = {
    id: 'invocation_de_bouftou_des_cavernes',
    name: 'Invocation de Bouftou des cavernes',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.calumet_de_la_paix = {
    id: 'calumet_de_la_paix',
    name: 'Calumet de la paix',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'agility', value: 200, duration: 3, target: 'self' },
        { type: 'buff', stat: 'force', value: 200, duration: 3, target: 'self' },
        { type: 'buff', stat: 'maxHp', value: 200, duration: 3, target: 'self' },
        { type: 'buff', stat: 'chance', value: 200, duration: 3, target: 'self' }
    ]
}
move.appel_du_koulosse = {
    id: 'appel_du_koulosse',
    name: 'Appel du Koulosse',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}
move.souffle_du_koulosse = {
    id: 'souffle_du_koulosse',
    name: 'Souffle du Koulosse',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 10, duration: 3, target: 'self' }
    ]
}

// -------- Shihan ---------------
move.qikong = {
    id: 'qikong',
    name: 'Qìkǒng',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.grande_lame_du_vent = {
    id: 'grande_lame_du_vent',
    name: 'Grande Lame du Vent',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 43, max: 50 }, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.ba_gua_zhang = {
    id: 'ba_gua_zhang',
    name: 'Ba Gua Zhang',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 19, max: 22 }, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 10, duration: 3, target: 'self' }
    ]
}
move.brise_apaisante = {
    id: 'brise_apaisante',
    name: 'Brise apaisante',
    cooldownMs: 2000,
    effects: [
        { type: 'heal%maxHp', value: 10, target: 'self' },
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}

// -------- Hanshi ---------------
move.source_des_vents = {
    id: 'source_des_vents',
    name: 'Source des vents',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.jufang = {
    id: 'jufang',
    name: 'Jufang',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 16, max: 20 }, target: 'enemy' }
    ]
}
move.da_bang = {
    id: 'da_bang',
    name: 'Da Bàng',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 28, max: 33 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.ang_eurfiste = {
    id: 'ang_eurfiste',
    name: 'Ang Eurfiste',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 19, max: 22 }, target: 'enemy' },
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}

// -------- Maître des Pantins ---------------
move.tirer_les_ficelles = {
    id: 'tirer_les_ficelles',
    name: 'Tirer les ficelles',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
        { type: 'debuff', stat: 'agility', value: 100, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'agility', value: 100, duration: 3, target: 'self' },
        { type: 'damage', element: 'air', damage: { min: 46, max: 55 }, target: 'enemy' },
        { type: 'debuff', stat: 'chance', value: 100, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'chance', value: 100, duration: 3, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 46, max: 55 }, target: 'enemy' },
        { type: 'debuff', stat: 'intelligence', value: 100, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'intelligence', value: 100, duration: 3, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 46, max: 55 }, target: 'enemy' },
        { type: 'debuff', stat: 'force', value: 100, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'force', value: 100, duration: 3, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 46, max: 55 }, target: 'enemy' },
        { type: 'debuff', stat: 'force', value: 100, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'force', value: 100, duration: 3, target: 'self' },
        { type: 'damage', element: 'neutre', damage: { min: 46, max: 55 }, target: 'enemy' }
    ]
}

// -------- Tanukouï San ---------------
move.coup_de_boules = {
    id: 'coup_de_boules',
    name: 'Coup de boules',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.uchimizu = {
    id: 'uchimizu',
    name: 'Uchimizu',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 21, max: 25 }, target: 'enemy' }
    ]
}
move.casse_noisettes = {
    id: 'casse_noisettes',
    name: 'Casse-noisettes',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 200, duration: 3, target: 'enemy' }
    ]
}
move.tibagin = {
    id: 'tibagin',
    name: 'Tibagin',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'buffDrain', value: 2, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 26, max: 35 }, target: 'enemy' }
    ]
}
move.boulodrome = {
    id: 'boulodrome',
    name: 'Boulodrome',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}

// -------- Sphincter Cell ---------------
move.raccourci = {
    id: 'raccourci',
    name: 'Raccourci',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.rasoir = {
    id: 'rasoir',
    name: 'Rasoir',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 21, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 21, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 21, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.mutagen = {
    id: 'mutagen',
    name: 'Mutagen',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Jorbak ---------------
move.la_pelle_du_large = {
    id: 'la_pelle_du_large',
    name: 'La pelle du large',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 51, max: 56 }, target: 'enemy' }
    ]
}
move.la_pierre_philosophale = {
    id: 'la_pierre_philosophale',
    name: 'La pierre philosophale',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 251, max: 260 }, target: 'enemy' }
    ]
}

// -------- Mansot Royal ---------------
move.mansoluble = {
    id: 'mansoluble',
    name: 'Mansoluble',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 46, max: 55 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.mansolenoide = {
    id: 'mansolenoide',
    name: 'Mansolénoïde',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 10, max: 10 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}

// -------- Bethel Akarna ---------------
move.pantang = {
    id: 'pantang',
    name: 'Pantang',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 81, max: 100 }, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.etoile_de_mer = {
    id: 'etoile_de_mer',
    name: 'Étoile de Mer',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Croqueleur ---------------
move.attraction_gourmande = {
    id: 'attraction_gourmande',
    name: 'Attraction gourmande',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'debuff', stat: 'finalDamagePct', value: 50, duration: 3, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.total_impwakt = {
    id: 'total_impwakt',
    name: 'Total Impwâkt',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 51, max: 65 }, target: 'enemy' },
        // TODO: Minimise les effets aléatoires de la cible
        { type: 'damage', element: 'air', damage: { min: 51, max: 65 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 51, max: 65 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 51, max: 65 }, target: 'enemy' }
    ]
}
move.croustichoc = {
    id: 'croustichoc',
    name: 'Croustichoc',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 26, max: 35 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 26, max: 35 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 26, max: 35 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 26, max: 35 }, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 10, duration: 3, target: 'self' }
    ]
}

// -------- Kimbo ---------------
move.boum_boh = {
    id: 'boum_boh',
    name: 'Boum Boh',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'agility', value: 50, duration: 3, target: 'self' }
    ]
}
move.invocation_du_disciple = {
    id: 'invocation_du_disciple',
    name: 'Invocation du Disciple',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.etat_pair = {
    id: 'etat_pair',
    name: 'Etat pair',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'agility', value: 500, duration: 3, target: 'self' }
    ]
}
move.etat_impair = {
    id: 'etat_impair',
    name: 'Etat impair',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'agility', value: 500, duration: 3, target: 'self' }
    ]
}
move.furie_du_kimbo = {
    id: 'furie_du_kimbo',
    name: 'Furie du Kimbo',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 31, max: 50 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.teleportation_du_kimbo = {
    id: 'teleportation_du_kimbo',
    name: 'Téléportation du Kimbo',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}

// -------- Silf le Rasboul Majeur ---------------
move.rasage = {
    id: 'rasage',
    name: 'Rasage',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'maxHp', value: 100, duration: 3, target: 'self' },
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}
move.hololole = {
    id: 'hololole',
    name: 'Hololole',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 900, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'res.air', value: 50, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'res.eau', value: 50, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'res.feu', value: 50, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'res.terre', value: 50, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'res.neutre', value: 500, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.air', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.air', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.air', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.eau', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.eau', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.eau', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.feu', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.feu', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.feu', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.terre', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.terre', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.terre', value: 50, duration: 3, target: 'self' }
    ]
}
move.recrutement = {
    id: 'recrutement',
    name: 'Recrutement',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Hell Mina ---------------
move.bond_malefique = {
    id: 'bond_malefique',
    name: 'Bond Maléfique',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 42, max: 48 }, target: 'enemy' }
    ]
}
move.fatalite = {
    id: 'fatalite',
    name: 'Fatalité',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 48, max: 56 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.extermination_iopesque = {
    id: 'extermination_iopesque',
    name: 'Extermination Iopesque',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 25, max: 29 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' }
    ]
}
move.prejudice = {
    id: 'prejudice',
    name: 'Préjudice',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Ben le Ripate ---------------
move.mousse_haillon = {
    id: 'mousse_haillon',
    name: 'Mousse Haillon',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 56, max: 65 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.tore_tue = {
    id: 'tore_tue',
    name: 'Tore tue',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.frere_de_la_cote = {
    id: 'frere_de_la_cote',
    name: 'Frère de la côte',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.mate_l_eau = {
    id: 'mate_l_eau',
    name: 'Mâte l\'eau',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 10, max: 10 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}

// -------- Obsidiantre ---------------
move.objection = {
    id: 'objection',
    name: 'Objection',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 56, max: 65 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.scie_lisse = {
    id: 'scie_lisse',
    name: 'Scie lisse',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.andesite = {
    id: 'andesite',
    name: 'Andésite',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.scie_licate = {
    id: 'scie_licate',
    name: 'Scie licate',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 10, max: 10 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}

// -------- Shogun Tofugawa ---------------
move.hageshi_kaze = {
    id: 'hageshi_kaze',
    name: 'Hageshī Kaze',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 25, duration: 3, target: 'self' }
    ]
}
move.aspiration_du_yokomainu = {
    id: 'aspiration_du_yokomainu',
    name: 'Aspiration du Yokomaïnu',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'air', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 4, max: 7 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.shin_kudaigyoku = {
    id: 'shin_kudaigyoku',
    name: 'Shin Kûdaigyoku',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' }
    ]
}

// -------- Ougah ---------------
move.bizarrerie = {
    id: 'bizarrerie',
    name: 'Bizarrerie',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'atk', value: 300, duration: 3, target: 'self' }
    ]
}
move.opiniatrete = {
    id: 'opiniatrete',
    name: 'Opiniâtreté',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 16, max: 25 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'res.air', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 41, max: 60 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 41, max: 60 }, target: 'enemy' }
    ]
}
move.sirop_spore = {
    id: 'sirop_spore',
    name: 'Sirop Spore',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.spore_hanchambre = {
    id: 'spore_hanchambre',
    name: 'Spore Hanchambre',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'critChance', value: 50, duration: 3, target: 'self' },
        { type: 'heal', heal: 5000, target: 'self' },
        { type: 'heal', heal: 5000, target: 'self' },
        { type: 'heal', heal: 5000, target: 'self' }
    ]
}
move.les_coprins_d_abord = {
    id: 'les_coprins_d_abord',
    name: 'Les Coprins d\'abord',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Kanigroula ---------------
move.chachyene_cinglante = {
    id: 'chachyene_cinglante',
    name: 'Chachyène cinglante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 61, max: 70 }, target: 'enemy' },
        { type: 'debuff', stat: 'res.eau', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.rugissement_matriarcal = {
    id: 'rugissement_matriarcal',
    name: 'Rugissement matriarcal',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'neutre', damageHpPct: { source: 'casterMaxHp', pct: 5 }, target: 'enemy' }
    ]
}
move.motivation_captivante = {
    id: 'motivation_captivante',
    name: 'Motivation captivante',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'critChange', value: 20, duration: 2, target: 'self' },
    ]
}

// -------- Kolosso ---------------
move.razepoutine = {
    id: 'razepoutine',
    name: 'Razepoutine',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 86, max: 95 }, target: 'enemy' }
    ]
}
move.baikal = {
    id: 'baikal',
    name: 'Baïkal',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 50, duration: 3, target: 'self' }
    ]
}
move.illyana = {
    id: 'illyana',
    name: 'Illyana',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 86, target: 'self' },
        { type: 'avance', target: 'enemy' },
    ]
}

// -------- Professeur Xa ---------------
move.acolyte = {
    id: 'acolyte',
    name: 'Acolyte',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.cerebro = {
    id: 'cerebro',
    name: 'Cerebro',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 66, max: 75 }, target: 'enemy' }
    ]
}

// -------- Phossile ---------------
move.roc_phorreur = {
    id: 'roc_phorreur',
    name: 'Roc Phorreur',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' }
    ]
}
move.phorce = {
    id: 'phorce',
    name: 'Phorce',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 50, max: 50 }, erodedHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}
move.bain_de_lave = {
    id: 'bain_de_lave',
    name: 'Bain de lave',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 71, max: 80 }, target: 'enemy' }
    ]
}
move.epicentre = {
    id: 'epicentre',
    name: 'Épicentre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}

// -------- Tengu Givrefoux ---------------
move.torgnole_givree = {
    id: 'torgnole_givree',
    name: 'Torgnole givrée',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 30, duration: 3, target: 'self' }
    ]
}
move.calin_frigorifique = {
    id: 'calin_frigorifique',
    name: 'Câlin frigorifique',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}
move.farce = {
    id: 'farce',
    name: 'Farce',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 5, max: 5 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 66, max: 75 }, target: 'enemy' }
    ]
}
move.foux_d_amour = {
    id: 'foux_d_amour',
    name: 'Foux d\'amour',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.malice_glacee = {
    id: 'malice_glacee',
    name: 'Malice glacée',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 10, duration: 3, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 81, max: 100 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- XLII ---------------
move.coquetterie = {
    id: 'coquetterie',
    name: 'Coquetterie',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 61, max: 70 }, target: 'enemy' }
    ]
}
move.souffle_demoniaque = {
    id: 'souffle_demoniaque',
    name: 'Souffle démoniaque',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 81, max: 90 }, target: 'enemy' }
    ]
}
move.dereglement = {
    id: 'dereglement',
    name: 'Dérèglement',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}

// -------- Koumiho ---------------
move.hoshi_no_tama = {
    id: 'hoshi_no_tama',
    name: 'Hoshi no tama',
    cooldownMs: 2000,
    effects: [
        { type: 'heal%maxHp', value: 20, target: 'self' },
    ]
}
move.no_raj = {
    id: 'no_raj',
    name: 'No raj',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'intelligence', value: 200, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'intelligence', value: 200, duration: 3, target: 'self' }
    ]
}
move.aura_des_kitsounebi = {
    id: 'aura_des_kitsounebi',
    name: 'Aura des Kitsounebi',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 15, max: 17 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 15, max: 17 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 15, max: 17 }, target: 'enemy' }
    ]
}
move.koumiho_no_kaze = {
    id: 'koumiho_no_kaze',
    name: 'Koumiho no kaze',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }]
}
move.supaku = {
    id: 'supaku',
    name: 'Supāku',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 10, max: 11 }, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.pougix = {
    id: 'pougix',
    name: 'Pougix',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 7, max: 11 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 7, max: 11 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 10, max: 15 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 10, max: 15 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.kaiyo = {
    id: 'kaiyo',
    name: 'Kaiyo',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 50, max: 58 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 15, max: 15 }, currentHpScale: { stat: 'finalDamagePct', ratio: 0.5 }, target: 'enemy' }
    ]
}
move.retraite = {
    id: 'retraite',
    name: 'Retraite',
    cooldownMs: 6000,
    effects: [
        { type: 'esquive', chancePct: 40, reductionPct: 100, duration: 3, target: 'self' },
        { type: 'heal%maxHp', value: 15, target: 'self' },
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' },
        { type: 'buff', stat: 'atk', value: 250, duration: 3, target: 'self' }
    ]
}

// -------- Supervizœuf ---------------
move.invokabombz = {
    id: 'invokabombz',
    name: 'Invokabombz',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.bzelan = {
    id: 'bzelan',
    name: 'Bzélan',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.carapabz = {
    id: 'carapabz',
    name: 'Carapabz',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' },
        { type: 'avance', target: 'enemy' },
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}
move.clonabz = {
    id: 'clonabz',
    name: 'Clonabz',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.abzlation = {
    id: 'abzlation',
    name: 'Abzlation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 33, max: 37 }, target: 'enemy' },
        { type: 'dot', element: 'air', value: 23, duration: 2, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.bzovolution = {
    id: 'bzovolution',
    name: 'Bzovolution',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}

// -------- Bworker ---------------
move.sanction_bwork = {
    id: 'sanction_bwork',
    name: 'Sanction Bwork',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damageHpPct: { source: 'casterMaxHp', pct: 30 }, target: 'enemy' }
    ]
}
move.correction_bwork = {
    id: 'correction_bwork',
    name: 'Correction Bwork',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 30, max: 30 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}
move.fauchoir = {
    id: 'fauchoir',
    name: 'Fauchoir',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' }
    ]
}

// -------- Père Fwetar ---------------
move.fwetage = {
    id: 'fwetage',
    name: 'Fwetage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 141, max: 160 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 141, max: 160 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 141, max: 160 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 141, max: 160 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 141, max: 160 }, target: 'enemy' }
    ]
}
move.parade_des_vieux_jouets = {
    id: 'parade_des_vieux_jouets',
    name: 'Parade des vieux jouets',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.invocation_de_jouet_casse = {
    id: 'invocation_de_jouet_casse',
    name: 'Invocation de Jouet Cassé',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Korriandre ---------------
move.riraule = {
    id: 'riraule',
    name: 'Riraule',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.loute = {
    id: 'loute',
    name: 'Loute',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 10, max: 10 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 61, max: 70 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.hairpay = {
    id: 'hairpay',
    name: 'Hairpay',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 46, max: 55 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.paixe = {
    id: 'paixe',
    name: 'Paixe',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Toxoliath ---------------
move.venin_salvateur = {
    id: 'venin_salvateur',
    name: 'Venin Salvateur',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' },
        { type: 'heal', heal: 50, target: 'self' }
    ]
}
move.poison_volatile = {
    id: 'poison_volatile',
    name: 'Poison volatile',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 50, max: 50 }, target: 'enemy' }
    ]
}
move.vile_ruse = {
    id: 'vile_ruse',
    name: 'Vile ruse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 50, max: 50 }, target: 'enemy' }
    ]
}
move.flacune = {
    id: 'flacune',
    name: 'Flacune',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 71, max: 80 }, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' }
    ]
}

// -------- Agonie la Déterrée ---------------
move.frappe_cristalline = {
    id: 'frappe_cristalline',
    name: 'Frappe Cristalline',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 48, max: 56 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.rale_d_agonie = {
    id: 'rale_d_agonie',
    name: 'Râle d\'Agonie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 74, max: 86 }, target: 'enemy' },
        { type: 'dot', element: 'air', value: 12, duration: 3, target: 'enemy' }
    ]
}
move.geomancie = {
    id: 'geomancie',
    name: 'Géomancie',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'finalDamagePct', value: 20, duration: 3, target: 'self' }
    ]
}

// -------- Shuccube ---------------
move.bouillonnement = {
    id: 'bouillonnement',
    name: 'Bouillonnement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 43, max: 49 }, target: 'enemy' }
    ]
}
move.subreptice = {
    id: 'subreptice',
    name: 'Subreptice',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.ason_inshu = {
    id: 'ason_inshu',
    name: 'Ason Inshu',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.shurprise = {
    id: 'shurprise',
    name: 'Shurprise',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 47, max: 55 }, target: 'enemy' }
    ]
}
move.shuculbute = {
    id: 'shuculbute',
    name: 'Shuculbute',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 17, max: 19 }, target: 'enemy' }
    ]
}
move.piege_a_remous = {
    id: 'piege_a_remous',
    name: 'Piège à remous',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.affouillement = {
    id: 'affouillement',
    name: 'Affouillement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 19, max: 23 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 10, max: 14 }, target: 'enemy' }
    ]
}

// -------- Noximilien l'Horloger ---------------
move.temps_de_retard = {
    id: 'temps_de_retard',
    name: 'Temps de retard',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 47, max: 55 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' },
        { type: 'avance', target: 'enemy' }
    ]
}

// -------- Minotot ---------------
move.destinos = {
    id: 'destinos',
    name: 'Destinos',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' },
        { type: 'dot', element: 'feu', value: 51, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'agility', value: 500, duration: 3, target: 'self' },
        { type: 'recul', target: 'enemy' }
    ]
}
move.mythos = {
    id: 'mythos',
    name: 'Mythos',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 41, max: 70 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 41, max: 70 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 41, max: 70 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 41, max: 70 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' }
    ]
}
move.kitos = {
    id: 'kitos',
    name: 'Kitos',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 201, target: 'self' }
    ]
}
move.motivatos = {
    id: 'motivatos',
    name: 'Motivatos',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}

// -------- Grozilla Fatigué ---------------

// -------- Glourséleste ---------------
move.gloursondulation = {
    id: 'gloursondulation',
    name: 'Gloursondulation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 91, max: 100 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.gloursombre = {
    id: 'gloursombre',
    name: 'Gloursombre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 10, max: 10 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}
move.petit_glours_brun = {
    id: 'petit_glours_brun',
    name: 'Petit Glours Brun',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Grolloum ---------------
move.frimas = {
    id: 'frimas',
    name: 'Frimas',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 10, max: 10 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.gelee_blanche = {
    id: 'gelee_blanche',
    name: 'Gelée blanche',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 200, duration: 3, target: 'self' }
    ]
}
move.banquise = {
    id: 'banquise',
    name: 'Banquise',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' },
        { type: 'heal', heal: 101, target: 'self' }
    ]
}
move.cycle = {
    id: 'cycle',
    name: 'Cycle',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Fuji Givrefoux Nourricière ---------------
move.progeniture = {
    id: 'progeniture',
    name: 'Progéniture',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.lait_maternel = {
    id: 'lait_maternel',
    name: 'Lait Maternel',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: 91, target: 'self' },
        { type: 'buff', stat: 'flatDamage', value: 200, duration: 3, target: 'self' }
    ]
}
move.foufoux = {
    id: 'foufoux',
    name: 'Foufoux',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 71, max: 90 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Ombre ---------------
move.liaison = {
    id: 'liaison',
    name: 'Liaison',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 4, target: 'self' },
    ]
}
move.distorsion = {
    id: 'distorsion',
    name: 'Distorsion',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 100, max: 100 }, target: 'enemy' }
    ]
}
move.penombre = {
    id: 'penombre',
    name: 'Pénombre',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 4, target: 'self' },
    ]
}

// -------- Comte Razof ---------------
move.pelliste = {
    id: 'pelliste',
    name: 'Pelliste',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 61, max: 70 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 71, max: 80 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.archi_pelle = {
    id: 'archi_pelle',
    name: 'Archi-Pelle',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 51, max: 60 }, target: 'enemy' }
    ]
}
move.chasse_gardee = {
    id: 'chasse_gardee',
    name: 'Chasse Gardée',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 20, duration: 2, target: 'self' },
    ]
}
move.trophee_de_chasse = {
    id: 'trophee_de_chasse',
    name: 'Trophée de Chasse',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 200, duration: 3, target: 'self' }
    ]
}

// -------- Julith ---------------
move.charge_eclair = {
    id: 'charge_eclair',
    name: 'Charge Éclair',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}

// -------- Dathura ---------------
move.tige_empoisonnee = {
    id: 'tige_empoisonnee',
    name: 'Tige empoisonnée',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 16, max: 19 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 16, max: 19 }, target: 'enemy' }
    ]
}
move.bulbombe = {
    id: 'bulbombe',
    name: 'Bulbombe',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 65, max: 75 }, target: 'enemy' }
    ]
}
move.pistil_affaiblissant = {
    id: 'pistil_affaiblissant',
    name: 'Pistil affaiblissant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 51, max: 59 }, target: 'enemy' }
    ]
}

// -------- Père Ver ---------------
move.paternalisme = {
    id: 'paternalisme',
    name: 'Paternalisme',
    cooldownMs: 2000,
    effects: [
        { type: 'heal%maxHp', value: 10, target: 'self' },
        { type: 'damage', element: 'air', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.coup_d_il = {
    id: 'coup_d_il',
    name: 'Coup d\'Œil',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 31, max: 40 }, target: 'enemy' }
    ]
}
move.bien_vu_l_aveugle = {
    id: 'bien_vu_l_aveugle',
    name: 'Bien vu l\'Aveugle',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 200, duration: 3, target: 'self' }
    ]
}

// -------- Larve de Rushu ---------------
move.temps_mort = {
    id: 'temps_mort',
    name: 'Temps mort',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 111, max: 129 }, target: 'enemy' }
    ]
}
move.combustion_lente = {
    id: 'combustion_lente',
    name: 'Combustion lente',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 23, max: 27 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 13, max: 15 }, target: 'enemy' }
    ]
}
move.catachronie = {
    id: 'catachronie',
    name: 'Catachronie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 42, max: 48 }, target: 'enemy' }
    ]
}
move.alentissement = {
    id: 'alentissement',
    name: 'Alentissement',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.contraction_temporelle = {
    id: 'contraction_temporelle',
    name: 'Contraction temporelle',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.inexorabilis = {
    id: 'inexorabilis',
    name: 'Inexorabilis',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.chronostase = {
    id: 'chronostase',
    name: 'Chronostase',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Léorictus le Roi Grimaçant ---------------
move.mortelage = {
    id: 'mortelage',
    name: 'Mortelage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 37, max: 43 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 18, max: 19 }, currentHpScale: { stat: 'finalDamagePct', ratio: 0.5 }, target: 'enemy' }
    ]
}
move.oppression = {
    id: 'oppression',
    name: 'Oppression',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 49, max: 57 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.trombe_d_acier = {
    id: 'trombe_d_acier',
    name: 'Trombe d\'acier',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}
move.martel = {
    id: 'martel',
    name: 'Martel',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 44, max: 52 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 63, max: 73 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 91, max: 105 }, target: 'enemy' }
    ]
}

// -------- Klime ---------------
move.cuir_a_feu_doux = {
    id: 'cuir_a_feu_doux',
    name: 'Cuir à feu doux',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 300, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.cuir_moustache = {
    id: 'cuir_moustache',
    name: 'Cuir moustache',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}
move.moustacheron = {
    id: 'moustacheron',
    name: 'Moustacheron',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 10, max: 10 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Missiz Frizz ---------------
move.cristallisation = {
    id: 'cristallisation',
    name: 'Cristallisation',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.sang_froid = {
    id: 'sang_froid',
    name: 'Sang froid',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 81, max: 100 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 91, max: 110 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.glace_trop_physique = {
    id: 'glace_trop_physique',
    name: 'Glace trop physique',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 35, max: 35 }, erodedHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}

// -------- Nileza ---------------
move.fraction_de_molaire = {
    id: 'fraction_de_molaire',
    name: 'Fraction de molaire',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 10, max: 10 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }        ,
        { type: 'recul', target: 'enemy' }
    ]
}
move.glace_seche = {
    id: 'glace_seche',
    name: 'Glace sèche',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 71, max: 90 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.liqueur_de_fee_ling = {
    id: 'liqueur_de_fee_ling',
    name: 'Liqueur de Fée Ling',
    cooldownMs: 2000,
    effects: [
        { type: 'heal%maxHp', value: 5, target: 'self' },
        { type: 'buff', stat: 'flatDamage', value: 300, duration: 3, target: 'self' }
    ]
}

// -------- Sylargh ---------------
move.poincon = {
    id: 'poincon',
    name: 'Poinçon',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 101, max: 140 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'buffDrain', value: 2, target: 'enemy' },
    ]
}
move.mortier = {
    id: 'mortier',
    name: 'Mortier',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 71, max: 80 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 71, max: 80 }, target: 'enemy' }
    ]
}
move.degage_de_qualite = {
    id: 'degage_de_qualite',
    name: 'Dégage de qualité',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 500, duration: 3, target: 'self' },
        { type: 'recul', target: 'enemy' }
    ]
}

// -------- Comte Harebourg ---------------
move.contretemps = {
    id: 'contretemps',
    name: 'Contretemps',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 71, max: 90 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 7, max: 7 }, missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' }
    ]
}
move.multicomte = {
    id: 'multicomte',
    name: 'Multicomte',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 61, max: 80 }, target: 'enemy' }
    ]
}
move.jaquemart = {
    id: 'jaquemart',
    name: 'Jaquemart',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 71, max: 90 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Merkator ---------------
move.torpillage_de_glace = {
    id: 'torpillage_de_glace',
    name: 'Torpillage de glace',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 121, max: 140 }, target: 'enemy' }
    ]
}
move.sondage_de_bronze = {
    id: 'sondage_de_bronze',
    name: 'Sondage de Bronze',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 101, max: 120 }, target: 'enemy' }
    ]
}
move.baphe_thysca = {
    id: 'baphe_thysca',
    name: 'Baphe Thysca',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 4, target: 'self' },
    ]
}
move.bouche_a_bouche = {
    id: 'bouche_a_bouche',
    name: 'Bouche-à-Bouche',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Solar ---------------
move.aube_saine = {
    id: 'aube_saine',
    name: 'Aube Saine',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 101, max: 120 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.leve_tot = {
    id: 'leve_tot',
    name: 'Lève-tôt',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 81, max: 100 }, target: 'enemy' }
    ]
}
move.rossee_matinale = {
    id: 'rossee_matinale',
    name: 'Rossée Matinale',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 20, max: 20 }, erodedHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}
move.demon_de_midi = {
    id: 'demon_de_midi',
    name: 'Démon de Midi',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 101, max: 120 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 4, target: 'self' },
    ]
}
move.coup_de_soleil = {
    id: 'coup_de_soleil',
    name: 'Coup de Soleil',
    cooldownMs: 2000,
    effects: [
        // TODO: Maximise les effets aléatoires sur la cible
        { type: 'damage', element: 'terre', damage: { min: 121, max: 140 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 151, max: 170 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 4, target: 'self' },
    ]
}
move.eruption_solaire = {
    id: 'eruption_solaire',
    name: 'Éruption Solaire',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 81, max: 100 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 121, max: 140 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.coucher_de_soleil = {
    id: 'coucher_de_soleil',
    name: 'Coucher de Soleil',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.cours_du_soir = {
    id: 'cours_du_soir',
    name: 'Cours du Soir',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 71, max: 80 }, target: 'enemy' }
    ]
}
move.le_grand_soir = {
    id: 'le_grand_soir',
    name: 'Le Grand Soir',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 61, max: 80 }, target: 'enemy' }
    ]
}
move.demons_de_minuit = {
    id: 'demons_de_minuit',
    name: 'Démons de Minuit',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.nuit_blanche = {
    id: 'nuit_blanche',
    name: 'Nuit Blanche',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}
move.protecteur_d_emoi = {
    id: 'protecteur_d_emoi',
    name: 'Protecteur d\'émoi',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Percimol ---------------
move.coup_de_marre_d_eau = {
    id: 'coup_de_marre_d_eau',
    name: 'Coup de Marre d\'eau',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 50, max: 58 }, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.courage_de_l_epouvantail = {
    id: 'courage_de_l_epouvantail',
    name: 'Courage de l\'Épouvantail',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'finalDamagePct', value: 25, duration: 3, target: 'self' },
        { type: 'buff', stat: 'finalDamagePct', value: 15, duration: 3, target: 'self' },
        { type: 'buff', stat: 'finalDamagePct', value: 7, duration: 3, target: 'self' }
    ]
}
move.impatience = {
    id: 'impatience',
    name: 'Impatience',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'finalDamagePct', value: 40, duration: 3, target: 'self' }
    ]
}

// -------- Déchireuse ---------------
move.hemorasoir = {
    id: 'hemorasoir',
    name: 'Hémorasoir',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 46, max: 54 }, target: 'enemy' }
    ]
}
move.brutank = {
    id: 'brutank',
    name: 'Brutank',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 31, max: 35 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 31, max: 35 }, target: 'enemy' }
    ]
}
move.atermoiement = {
    id: 'atermoiement',
    name: 'Atermoiement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 93, max: 108 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' }
    ]
}
move.recentrage = {
    id: 'recentrage',
    name: 'Recentrage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 56, max: 65 }, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 10, duration: 3, target: 'self' }
    ]
}
move.proxicaire = {
    id: 'proxicaire',
    name: 'Proxicaire',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 83, max: 97 }, target: 'enemy' }
    ]
}
move.musculot = {
    id: 'musculot',
    name: 'Musculot',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 47, max: 54 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 47, max: 54 }, target: 'enemy' }
    ]
}

// -------- Torkélonia ---------------
move.faisceau_lunaire = {
    id: 'faisceau_lunaire',
    name: 'Faisceau lunaire',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 66, max: 85 }, target: 'enemy' }
    ]
}
move.carapace_lunaire = {
    id: 'carapace_lunaire',
    name: 'Carapace lunaire',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.ricochet_sacre = {
    id: 'ricochet_sacre',
    name: 'Ricochet sacré',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 71, max: 100 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' }
    ]
}
move.goutte_lunaire = {
    id: 'goutte_lunaire',
    name: 'Goutte lunaire',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 71, max: 90 }, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 10, duration: 3, target: 'self' }
    ]
}

// -------- Kabahal ---------------
move.ratafia_putride = {
    id: 'ratafia_putride',
    name: 'Ratafia Putride',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'air', value: 49, duration: 2, target: 'enemy' },
        { type: 'heal', heal: 50, target: 'self' }
    ]
}
move.offrande_au_chaos = {
    id: 'offrande_au_chaos',
    name: 'Offrande au Chaos',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 34, max: 39 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 34, max: 39 }, target: 'enemy' },
        { type: 'heal', heal: 50, target: 'self' }
    ]
}
move.paume_incandescente = {
    id: 'paume_incandescente',
    name: 'Paume Incandescente',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 47, max: 55 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 47, max: 55 }, target: 'enemy' },
        { type: 'debuff', stat: 'critChance', value: 25, duration: 3, target: 'enemy' }
    ]
}
move.il_du_nocher = {
    id: 'il_du_nocher',
    name: 'Œil du Nocher',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' },
        { type: 'heal%maxHp', value: 10, target: 'self' },
        { type: 'buff', stat: 'atk', value: 200, duration: 3, target: 'self' }
    ]
}
move.d_une_main_de_maitre = {
    id: 'd_une_main_de_maitre',
    name: 'D\'une main de maître',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'finalDamagePct', value: 30, duration: 3, target: 'self' }
    ]
}

move.Pentademonium = {
    id: 'Pentademonium',
    name: 'Pentadémonium',
    cooldownMs: 10000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 600, max: 700 }, target: 'enemy' }
    ]
}
// -------- Roi Nidas ---------------
move.confusion = {
    id: 'confusion',
    name: 'Confusion',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 61, max: 80 }, target: 'enemy' }
    ]
}
move.attrape_mutin = {
    id: 'attrape_mutin',
    name: 'Attrape-Mutin',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.mon_precieux = {
    id: 'mon_precieux',
    name: 'Mon précieux',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 1000, max: 1000 }, target: 'enemy' },
        { type: 'debuff', stat: 'finalDamagePct', value: 50, duration: 3, target: 'enemy' }
    ]
}

// -------- Reine des Voleurs ---------------
move.mort_en_sursis = {
    id: 'mort_en_sursis',
    name: 'Mort en Sursis',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 20, max: 20 }, erodedHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}
move.coup_critique = {
    id: 'coup_critique',
    name: 'Coup critique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 150, max: 150 }, erodedHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
    ]
}

// -------- Vortex ---------------
move.heuristique = {
    id: 'heuristique',
    name: 'Heuristique',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}
move.morfaille = {
    id: 'morfaille',
    name: 'Morfaille',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' }
    ]
}
move.en_temps_et_en_heure = {
    id: 'en_temps_et_en_heure',
    name: 'En temps et en heure',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}

// -------- Chalœil ---------------
move.toilette_ecaflip = {
    id: 'toilette_ecaflip',
    name: 'Toilette Ecaflip',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 101, max: 120 }, target: 'enemy' }
    ]
}
move.farce_et_attrape = {
    id: 'farce_et_attrape',
    name: 'Farce et Attrape',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 101, max: 120 }, target: 'enemy' }
    ]
}
move.gros_yeux = {
    id: 'gros_yeux',
    name: 'Gros Yeux',
    cooldownMs: 2000,
    effects: [
        { type: 'heal%maxHp', value: 20, target: 'self' },
        { type: 'buff', stat: 'atk', value: 600, duration: 3, target: 'self' }
    ]
}

// -------- Grozilla ---------------

// -------- Dantinéa ---------------
move.siphon_d_ame = {
    id: 'siphon_d_ame',
    name: 'Siphon d\'Âme',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 107, max: 111 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.cooquillation = {
    id: 'cooquillation',
    name: 'Cooquillation',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}

// -------- Larve de Koutoulou ---------------
move.frappe_koutonienne = {
    id: 'frappe_koutonienne',
    name: 'Frappe Koutonienne',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 151, max: 155 }, target: 'enemy' }
    ]
}
move.permutation_inquietante = {
    id: 'permutation_inquietante',
    name: 'Permutation Inquiétante',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}

// -------- Tal Kasha ---------------
move.cheveux_partir_de_la = {
    id: 'cheveux_partir_de_la',
    name: 'Cheveux partir de là',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.filature = {
    id: 'filature',
    name: 'Filature',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 81, max: 100 }, target: 'enemy' }
    ]
}
move.transe_perse = {
    id: 'transe_perse',
    name: 'Transe-Perse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 200, max: 200 }, target: 'enemy' }
    ]
}

// -------- Anerice la Shushess ---------------
move.goulification = {
    id: 'goulification',
    name: 'Goulification',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 121, max: 140 }, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.vampyrisme = {
    id: 'vampyrisme',
    name: 'Vampyrisme',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 101, max: 120 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.appetit_sanguinaire = {
    id: 'appetit_sanguinaire',
    name: 'Appétit sanguinaire',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'finalDamagePct', value: 50, duration: 3, target: 'self' },
        { type: 'buff', stat: 'finalDamagePct', value: 50, duration: 3, target: 'self' }
    ]
}

// -------- Dazak Martegel ---------------
move.empalement_royal = {
    id: 'empalement_royal',
    name: 'Empalement royal',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 101, max: 120 }, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 40, duration: 3, target: 'self' },
        { type: 'debuff', stat: 'damageReductionPct', value: 10, duration: 3, target: 'enemy' }
    ]
}
move.ninflitration = {
    id: 'ninflitration',
    name: 'Ninflitration',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 81, max: 100 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.nintrepidite = {
    id: 'nintrepidite',
    name: 'Nintrépidité',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', value: 1500, duration: 3, target: 'self' }
    ]
}

// -------- Prêtresse de Kao ---------------
move.cloches_du_kao = {
    id: 'cloches_du_kao',
    name: 'Cloches du Kao',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'buff', stat: 'flatDamage', value: 20, duration: 4, target: 'self' },
    ]
}
move.equador = {
    id: 'equador',
    name: 'Equador',
    cooldownMs: 2000,
    effects: [
        { type: 'heal%maxHp', value: 10, target: 'self' },
        { type: 'buff', stat: 'flatDamage', value: 50, duration: 3, target: 'self' }
    ]
}
move.spatule_tranche_gourmands = {
    id: 'spatule_tranche_gourmands',
    name: 'Spatule Tranche-Gourmands',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 51, max: 70 }, target: 'enemy' }
    ]
}
move.commerce_inequitable = {
    id: 'commerce_inequitable',
    name: 'Commerce Inéquitable',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Misère ---------------
move.balance_fleau = {
    id: 'balance_fleau',
    name: 'Balance-Fléau',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 200, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 200, duration: 3, target: 'self' },
        { type: 'damage', element: 'air', damage: { min: 9, max: 13 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 9, max: 13 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 9, max: 13 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 9, max: 13 }, target: 'enemy' }
    ]
}
move.funerailles_celestes = {
    id: 'funerailles_celestes',
    name: 'Funérailles Célestes',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}
move.grand_urubu = {
    id: 'grand_urubu',
    name: 'Grand Urubu',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 41, max: 60 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.dakhma = {
    id: 'dakhma',
    name: 'Dakhma',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' },
        { type: 'recul', target: 'enemy' }
    ]
}
move.barchan = {
    id: 'barchan',
    name: 'Barchan',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'heal', heal: 50, target: 'self' },
        { type: 'antiHeal', duration: 3, target: 'enemy' }
    ]
}

// -------- Barbéryl Clochecuivre ---------------
move.ninfernal = {
    id: 'ninfernal',
    name: 'Ninfernal',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 32, max: 38 }, target: 'enemy' }
    ]
}
move.nimparabilite = {
    id: 'nimparabilite',
    name: 'Nimparabilité',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 31, max: 35 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.ninvasion = {
    id: 'ninvasion',
    name: 'Ninvasion',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 15, duration: 3, target: 'self' }
    ]
}

// -------- Déchireuse perturbée ---------------

// -------- Champion de l'Aurore Pourpre ---------------
move.embrigadement = {
    id: 'embrigadement',
    name: 'Embrigadement',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'buff', stat: 'finalDamagePct', value: 10, duration: 3, target: 'self' }
    ]
}
move.troolverisation = {
    id: 'troolverisation',
    name: 'Troolvérisation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 60, max: 70 }, target: 'enemy' }
    ]
}
move.exaction = {
    id: 'exaction',
    name: 'Exaction',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 45, max: 53 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 50, duration: 3, target: 'enemy' }
    ]
}
move.catapultage = {
    id: 'catapultage',
    name: 'Catapultage',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}

// -------- L'Éternel Conflit ---------------
move.poing_de_la_cite_sombre = {
    id: 'poing_de_la_cite_sombre',
    name: 'Poing de la Cité Sombre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 83, max: 97 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.poing_de_la_cite_blanche = {
    id: 'poing_de_la_cite_blanche',
    name: 'Poing de la Cité Blanche',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 10, duration: 3, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 46, max: 54 }, target: 'enemy' }
    ]
}
move.cycle_de_la_violence = {
    id: 'cycle_de_la_violence',
    name: 'Cycle de la Violence',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}
move.massacre_de_l_aurore_pourpre = {
    id: 'massacre_de_l_aurore_pourpre',
    name: 'Massacre de l\'Aurore Pourpre',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 38, max: 44 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 38, max: 44 }, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' },
        { type: 'buffDrain', value: 2, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 38, max: 44 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 38, max: 44 }, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' }
    ]
}

// -------- Supervizœuf perturbé ---------------

// -------- Corruption ---------------
move.beche_corrompue = {
    id: 'beche_corrompue',
    name: 'Bêche corrompue',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 2, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 34, max: 46 }, target: 'enemy' }
    ]
}
move.incu_batteur = {
    id: 'incu_batteur',
    name: 'Incu-Batteur',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 48, max: 56 }, target: 'enemy' }
    ]
}
move.convalescence_prolifique = {
    id: 'convalescence_prolifique',
    name: 'Convalescence Prolifique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 28, max: 35 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.putrefaction = {
    id: 'putrefaction',
    name: 'Putréfaction',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 56, max: 68 }, target: 'enemy' }
    ]
}
move.bombe_bacteriologique = {
    id: 'bombe_bacteriologique',
    name: 'Bombe Bactériologique',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}
move.eclosion_germinal = {
    id: 'eclosion_germinal',
    name: 'Éclosion germinal',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 24, max: 30 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 200, duration: 3, target: 'enemy' },
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}

// -------- Guerre ---------------
move.bravoure = {
    id: 'bravoure',
    name: 'Bravoure',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 19, max: 21 }, target: 'enemy' }
    ]
}
move.impact = {
    id: 'impact',
    name: 'Impact',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 20, duration: 3, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 71, max: 85 }, target: 'enemy' }
    ]
}
move.lynchage = {
    id: 'lynchage',
    name: 'Lynchage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 71, max: 85 }, target: 'enemy' }
    ]
}
move.magmalefice = {
    id: 'magmalefice',
    name: 'Magmaléfice',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 61, max: 70 }, target: 'enemy' }
    ]
}
move.celerite = {
    id: 'celerite',
    name: 'Célérité',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' }
    ]
}
move.martyre = {
    id: 'martyre',
    name: 'Martyre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 71, max: 80 }, target: 'enemy' }
    ]
}

// -------- Servitude ---------------
move.trahison = {
    id: 'trahison',
    name: 'Trahison',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}
move.asservissement = {
    id: 'asservissement',
    name: 'Asservissement',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
    ]
}
move.joug_protecteur = {
    id: 'joug_protecteur',
    name: 'Joug Protecteur',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 76, max: 85 }, target: 'enemy' }
    ]
}

// -------- Roi Imagami ---------------
move.parchemin_de_traverse = {
    id: 'parchemin_de_traverse',
    name: 'Parchemin de Traverse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 41, max: 60 }, target: 'enemy' }
    ]
}
move.papetuerie = {
    id: 'papetuerie',
    name: 'Papetuerie',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}
move.roque_papier_ciseaux = {
    id: 'roque_papier_ciseaux',
    name: 'Roque Papier Ciseaux',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 71, max: 100 }, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 40, duration: 3, target: 'self' },
        { type: 'buffDrain', value: 2, target: 'enemy' }
    ]
}
move.kami_no_jishin = {
    id: 'kami_no_jishin',
    name: 'Kami no Jishin',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 41, max: 60 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Reine Amirukam ---------------
move.toner_deubraiste = {
    id: 'toner_deubraiste',
    name: 'Toner Deubraiste',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 29, max: 33 }, target: 'enemy' },
        { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }
    ]
}
move.getsuga_tensho = {
    id: 'getsuga_tensho',
    name: 'Getsuga Tenshō',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 58, max: 68 }, target: 'enemy' }
    ]
}
move.monarchie_des_roses_noires = {
    id: 'monarchie_des_roses_noires',
    name: 'Monarchie des Roses Noires',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 66, max: 76 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy' }
    ]
}

// -------- Vénérable Endormi ---------------
move.saut_imperieux = {
    id: 'saut_imperieux',
    name: 'Saut Impérieux',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 71, max: 90 }, target: 'enemy' }
    ]
}
move.cri_venerable = {
    id: 'cri_venerable',
    name: 'Cri Vénérable',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 61, max: 70 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.primattaque = {
    id: 'primattaque',
    name: 'Primattaque',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.primartelement = {
    id: 'primartelement',
    name: 'Primartèlement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'avance', target: 'enemy' },
    ]
}
move.charge_fantastique = {
    id: 'charge_fantastique',
    name: 'Charge Fantastique',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 71, max: 90 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' },
    ]
}
move.boulet_fantastique = {
    id: 'boulet_fantastique',
    name: 'Boulet Fantastique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 71, max: 80 }, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

// -------- Qilby ---------------
move.faux_espoirs = {
    id: 'faux_espoirs',
    name: 'Faux espoirs',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 61, max: 69 }, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.resonance_sempiternelle = {
    id: 'resonance_sempiternelle',
    name: 'Résonance sempiternelle',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 66, max: 74 }, target: 'enemy' }
    ]
}
move.portail = {
    id: 'portail',
    name: 'Portail',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}

// -------- Belladone ---------------
move.enchantement_fatal = {
    id: 'enchantement_fatal',
    name: 'Enchantement fatal',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' },
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' },
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' },
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' }
    ]
}
move.charme_malefique = {
    id: 'charme_malefique',
    name: 'Charme maléfique',
    cooldownMs: 2000,
    effects: [
        { type: 'heal%maxHp', value: 10, target: 'self' },
        { type: 'buff', stat: 'finalDamagePct', value: 10, duration: 3, target: 'self' },
        { type: 'heal%maxHp', value: 12, target: 'self' },
        { type: 'buff', stat: 'finalDamagePct', value: 13, duration: 3, target: 'self' },
        { type: 'heal%maxHp', value: 14, target: 'self' },
        { type: 'buff', stat: 'finalDamagePct', value: 16, duration: 3, target: 'self' },
        { type: 'heal%maxHp', value: 18, target: 'self' },
        { type: 'buff', stat: 'finalDamagePct', value: 22, duration: 3, target: 'self' }
    ]
}
move.glyphe_de_condamnation = {
    id: 'glyphe_de_condamnation',
    name: 'Glyphe de condamnation',
    cooldownMs: 2000,
    effects: [
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' },
        { type: 'summon', summonPool: [], duration: 3, target: 'enemy' }
    ]
}
move.dechainement_fantasmagorique = {
    id: 'dechainement_fantasmagorique',
    name: 'Déchainement fantasmagorique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 42, max: 48 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 42, max: 48 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}
move.malefice_immobile = {
    id: 'malefice_immobile',
    name: 'Maléfice immobile',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 93, max: 108 }, target: 'enemy' }
    ]
}
move.conjuration_entravante = {
    id: 'conjuration_entravante',
    name: 'Conjuration entravante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 60, max: 70 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' }
    ]
}

// -------- Vénérable Endormi perturbé ---------------

// -------- Capitaine Meno ---------------
move.crystalisation = {
    id: 'crystalisation',
    name: 'Crystalisation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 47, max: 51 }, target: 'enemy' }
    ]
}
move.matiere_volatile = {
    id: 'matiere_volatile',
    name: 'Matière Volatile',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 48, max: 52 }, target: 'enemy' }
    ]
}

// -------- Cire Momore ---------------
move.metal_hurlant = {
    id: 'metal_hurlant',
    name: 'Métal Hurlant',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', levelPct: 1.5, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.neutre', value: 8, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.terre', value: 8, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.feu', value: 8, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.eau', value: 8, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.air', value: 8, duration: 3, target: 'self' },
        { type: 'buff', stat: 'damageReductionPct', value: 15, duration: 3, target: 'self' }
    ]
}
move.briselame = {
    id: 'briselame',
    name: 'Briselâme',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'erosionBonus', value: 10, duration: 3, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 59, max: 69 }, target: 'enemy' }
    ]
}
move.triste_cire = {
    id: 'triste_cire',
    name: 'Triste Cire',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 18, max: 20 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 20, max: 24 }, target: 'enemy' }
    ]
}

// -------- Ilyzaelle ---------------
move.hantame = {
    id: 'hantame',
    name: 'Hantâme',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 151, max: 170 }, target: 'enemy' },
        { type: 'buff', stat: 'erosionBonus', value: 40, duration: 3, target: 'self' }
    ]
}
move.lance_de_l_effroi = {
    id: 'lance_de_l_effroi',
    name: 'Lance de l\'effroi',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 151, max: 170 }, target: 'enemy' }
    ]
}

