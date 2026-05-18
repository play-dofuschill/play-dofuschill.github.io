// moveDictionary.js — Sorts des classes DofusChill

const move = {}

/* 
SYSTÈME DE SORTS — FORMAT STANDARD

Chaque sort possède :
- un id unique
- un nom
- une classe
- un cooldown
- une liste d'effets exécutés dans l'ordre

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

─────────────────────────────────────────────────────────────
EXEMPLE DE SORT SIMPLE SANS EFFETS
─────────────────────────────────────────────────────────────

move.exemple = {
    id: 'exemple',
    name: 'Sort Exemple',
    classId: 'iop',
    cooldownMs: 2000,
    effects: [{
    type: 'damage',
    element: 'feu',
    damage: {min: 10,max: 15},
    target: 'enemy'}]
}

─────────────────────────────────────────────────────────────
EXEMPLE DE SORT COMPLEXE
─────────────────────────────────────────────────────────────

move.exemple_complexe = {
    id: 'exemple_complexe',
    name: 'Sort Complexe',
    classId: 'eniripsa',
    cooldownMs: 3000,
    effects: [
    // dégâts{
    type: 'damage',
    element: 'eau',
    damage: {min: 20,max: 25},
    target: 'enemy'},
    // soin basé sur dégâts infligés{
    type: 'lifesteal',
    ratio: 0.5,
    target: 'self'},
    // buff{
    type: 'buff',
    stat: 'atk',
    value: 20,
    duration: 2,
    target: 'self'}]
}
─────────────────────────────────────────────POUR METTRE DE L'EROSION SUPP SUR LES SORTS─────────────────────────────────────────────
move.erosion_maximale = {
    id: 'erosion_maximale',
    name: 'Érosion Maximale',
    classId: 'iop',
    effects: [{
        type: 'buff_team',      // s'applique à tous les membres vivants
        stat: 'erosionBonus',
        value: 0.05,            // +5% d'érosion supplémentaire (soit 10% total)
        duration: 8
    }]
}
move.epee_divine = {
    effects: [{
        type: 'damage',
        element: 'air',
        damage: { min: 14, max: 17 },
        target: 'enemy',
        erosionRate: 0        // 0 = pas d'érosion, 0.10 = 10%
    }]
}
*/

// #region IOP ─────────────────────────────────────────────

move.pression = {
    id: 'pression',
    name: 'Pression',
    classId: 'iop',
    cooldownMs: 2000,
    effects: [
        {type: 'damage', element: 'terre', damage: {min: 16,max: 18}, target: 'enemy'}],
    spellProgression: [{lvl: 1,
                        patch: {}},
                       {lvl: 50,
                        patch: {damage: { min: 22, max: 26 }}},
                       {lvl: 120,
                        patch: {damage: { min: 30, max: 38 }}}]
}
move.epee_divine = {
    id: 'epee_divine',
    name: 'Épée Divine',
    classId: 'iop',
    cooldownMs: 2000,
    effects: [{
    type: 'damage',
    element: 'air',
    damage: {min: 14,max: 17},
    target: 'enemy'}]
}
move.couperet = {
    id: 'couperet',
    name: 'Couperet',
    classId: 'iop',
    cooldownMs: 2000,
    effects: [{
    type: 'damage',
    element: 'feu',
    damage: {min: 17,max: 19},
    target: 'enemy'}]
}
move.ferveur = {
    id: 'ferveur',
    name: 'Ferveur',
    classId: 'iop',
    cooldownMs: 2000,
    effects: [{
    type: 'damage',
    element: 'eau',
    damage: {min: 16,max: 19},
    target: 'enemy'}]
}
move.intimidation = {
    id: 'intimidation',
    name: 'Intimidation',
    classId: 'iop',
    cooldownMs: 2000,
    effects: [
        {type: 'damage', element: 'neutre', damage: {min: 16,max: 18}, target: 'enemy'}],
    spellProgression: [{lvl: 20,
                        patch: {}},
                       {lvl: 50,
                        patch: {damage: { min: 22, max: 26 }}},
                       {lvl: 120,
                        patch: {damage: { min: 30, max: 38 }}}]
}
move.bond = {
    id: 'bond',
    name: 'Bond',
    classId: 'iop',
    cooldownMs: 2000,
    effects: [
        {type: 'buff', stat: 'spd', value: 20, duration: 2, target: 'self'}],
    spellProgression: [{lvl: 24,
                        patch: {}},
                       {lvl: 50,  
                        patch: {buff: { value: 30 }}},
                       {lvl: 120,
                        patch: {buff: { value: 40 }}}]
}
// #endregion
// #region CRA ─────────────────────────────────────────────

move.fleche_optique = {
    id: 'fleche_optique',
    name: 'Flèche Optique',
    classId: 'cra',
    cooldownMs: 1500,
    effects: [{
    type: 'damage',
    element: 'air',
    damage: {min: 14,max: 16},
    target: 'enemy'}]
}

move.fleche_glacee = {
    id: 'fleche_glacee',
    name: 'Flèche Glacée',
    classId: 'cra',
    cooldownMs: 1650,
    effects: [{
    type: 'damage',
    element: 'eau',
    damage: {min: 17,max: 17},
    target: 'enemy'}]
}

move.fleche_cinglante = {
    id: 'fleche_cinglante',
    name: 'Flèche Cinglante',
    classId: 'cra',
    cooldownMs: 1800,
    effects: [{
    type: 'damage',
    element: 'terre',
    damage: {min: 15,max: 17},
    target: 'enemy'}]
}

move.tir_repulsif = {
    id: 'tir_repulsif',
    name: 'Tir Répulsif',
    classId: 'cra',
    cooldownMs: 1800,
    effects: [{
    type: 'damage',
    element: 'feu',
    damage: {min: 17,max: 19},
    target: 'enemy'}]
}
// #endregion
// #region ENIRIPSA ─────────────────────────────────────────

move.mot_tapageur = {
    id: 'mot_tapageur',
    name: 'Mot Tapageur',
    classId: 'eniripsa',
    cooldownMs: 2000,
    effects: [{
    type: 'damage',
    element: 'feu',
    damage: {min: 12,max: 14},
    target: 'enemy'}]
}

move.juron = {
    id: 'juron',
    name: 'Juron',
    classId: 'eniripsa',
    cooldownMs: 2000,
    effects: [{
    type: 'damage',
    element: 'terre',
    damage: {min: 14,max: 16},
    target: 'enemy'}]
}

move.mot_vampirique = {
    id: 'mot_vampirique',
    name: 'Mot Vampirique',
    classId: 'eniripsa',
    cooldownMs: 2300,
    effects: [
        {type: 'damage', element: 'eau', damage: { min: 16, max: 18 }, target: 'enemy'},
        {type: 'lifesteal', ratio: 0.5, target: 'self'}],
    spellProgression: [{ lvl: 1, 
                         patch: {} },
                       {lvl: 50,
                        patch: {damage: { min: 22, max: 26 }, lifesteal: { ratio: 0.60 }}},
                       {lvl: 120,
                        patch: {damage: { min: 30, max: 38 },lifesteal: { ratio: 0.65 }}}],
    description: "Tape l'ennemi et soigne de 50% des dégâts infligés."
}

move.mot_espiegle = {
    id: 'mot_espiegle',
    name: 'Mot Espiègle',
    classId: 'eniripsa',
    cooldownMs: 2000,
    effects: [
        {type: 'damage',
        element: 'air',
        damage: {min: 12,max: 14},
        target: 'enemy'}]
}
// #endregion


