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

─────────────────────────────────────────────────────────────
TYPES D'EFFETS DISPONIBLES
─────────────────────────────────────────────────────────────

OFFENSIFS
----------
damage           → dégâts mono-cible
damage_zone      → dégâts sur tous les ennemis (réservé multi-ennemis)
dot              → dégâts sur plusieurs tours (tique en début de tour de la cible)

SOINS
------
heal             → soin mono-cible (caster)
heal_team        → soin sur tous les alliés vivants

BUFFS / DEBUFFS
----------------
buff             → bonus statistique sur le caster
buff_team        → même buff sur tous les alliés vivants
debuff           → buff négatif appliqué sur la cible (targetEnemy)

SPÉCIAUX
---------
shield           → bouclier absorbant les dégâts avant les HP
                   ne se restack pas : ignoré si un bouclier est déjà actif
lifesteal        → vol de vie basé sur les dégâts réels infligés (après bouclier)
summon           → invoque une entité pour N actions

─────────────────────────────────────────────────────────────
TARGET DISPONIBLES
─────────────────────────────────────────────────────────────

enemy       → ennemi actif (ou membre actif si cast par ennemi)
self        → le caster lui-même
all_enemies → tous les ennemis (réservé multi-ennemis, agit comme enemy pour l'instant)
all_allies  → tous les alliés vivants

─────────────────────────────────────────────────────────────
ÉLÉMENTS DISPONIBLES
─────────────────────────────────────────────────────────────

neutre
terre
feu
eau
air

─────────────────────────────────────────────────────────────
STATS DISPONIBLES POUR BUFFS / DEBUFFS
─────────────────────────────────────────────────────────────

atk
spd
flatDamage
finalDamagePct
spellDamagePct
damageReductionPct
critChance
critDamagePct

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

*/

// ─── IOP ─────────────────────────────────────────────

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

// ─── CRA ─────────────────────────────────────────────

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

// ─── ENIRIPSA ─────────────────────────────────────────

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