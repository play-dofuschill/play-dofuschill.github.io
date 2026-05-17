// mstrMoveDictionary.js — Sorts/attaques des monstres DofusChill
// Étend l'objet `move` défini dans moveDictionary.js

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RÉFÉRENCE EFFETS DE SORTS — copier-coller prêt à l'emploi
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ÉLÉMENTS   : neutre | terre | feu | eau | air
TARGET      : enemy (cible adverse) | self (le caster) | all_allies (toute l'équipe alliée)
STATS BUFF  : atk | spd | flatDamage | finalDamagePct | spellDamagePct | damageReductionPct | critChance | critDamagePct

──────────────────────────────────────────────────────────────────────────────
DÉGÂTS
──────────────────────────────────────────────────────────────────────────────

// Dégâts directs
{ type: 'damage', element: 'feu', damage: { min: 10, max: 20 }, target: 'enemy' }

// Dégâts sur la durée (DOT — tique au début du tour de la cible)
{ type: 'dot', element: 'feu', value: 10, duration: 3, target: 'enemy' }

──────────────────────────────────────────────────────────────────────────────
SOINS
──────────────────────────────────────────────────────────────────────────────

// Soin fixe sur le caster
{ type: 'heal', heal: 50, target: 'self' }

// Soin fixe sur toute l'équipe alliée
{ type: 'heal_team', heal: 30, target: 'all_allies' }

// Soin en % des HP max du caster (heal = valeur en %, ex: 70 = 70% des HP max)
{ type: 'heal%maxHp', heal: 70, target: 'self' }

// Vol de vie — soigne le caster d'un % des dégâts infligés par l'effet PRÉCÉDENT
// (placer obligatoirement après un effet damage dans le tableau effects)
{ type: 'lifesteal', ratio: 0.5, target: 'self' }

──────────────────────────────────────────────────────────────────────────────
BUFFS / DEBUFFS
──────────────────────────────────────────────────────────────────────────────

// Buff sur le caster
{ type: 'buff', stat: 'atk', value: 30, duration: 3, target: 'self' }

// Buff sur toute l'équipe alliée
{ type: 'buff_team', stat: 'atk', value: 20, duration: 2, target: 'all_allies' }

// Debuff sur la cible adverse
{ type: 'debuff', stat: 'atk', value: 40, duration: 3, target: 'enemy' }

──────────────────────────────────────────────────────────────────────────────
SPÉCIAUX
──────────────────────────────────────────────────────────────────────────────

// Bouclier absorbant les dégâts avant les HP (ne se restack pas)
{ type: 'shield', value: 100, duration: 3, target: 'self' }

// Renvoi de dégâts — le prochain coup reçu est renvoyé à l'attaquant au ratio indiqué
// (ratio: 0.5 = 50% renvoyé, la cible prend 0 dégâts, usage unique)
{ type: 'renvoi', ratio: 0.5, target: 'self' }

// Switch forcé du membre actif adverse
// value: nb de crans à avancer dans la liste des membres vivants
// (si pas assez de membres, prend le dernier disponible ; 1 seul vivant = aucun effet)
{ type: 'switch', value: 1, target: 'enemy' }

// Relance le sort PRÉCÉDENT dans la rotation une deuxième fois
// (sequence [A, B, repeat, C] → A – B – repeat – B – C – A – B – repeat – B – C)
{ type: 'repeat', target: 'self' }

// Invocation d'une entité fixe pour N actions
{ type: 'summon', summonId: 'kardorib', duration: 4, target: 'self' }

// Invocation aléatoire depuis une liste (un id tiré au hasard à chaque cast)
{ type: 'summon', summonPool: ['tofu', 'bouftou', 'arakne'], duration: 3, target: 'self' }

// Portail Éliotrope : boost caster (+selfBonus% dmg, -resMalus% rés) + alliés (+allyBonus% dmg)
// Tous les buffs durent N tours. Par défaut : selfBonus=25, resMalus=10, allyBonus=10
{ type: 'portal', duration: 3, selfBonus: 25, resMalus: 10, allyBonus: 10, target: 'self' }

// Tourelle Steamer : DoT élémentaire sur l'ennemi, s'affiche "Tourelle" dans le log
{ type: 'turret', element: 'feu', value: 20, duration: 3, target: 'enemy' }

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


