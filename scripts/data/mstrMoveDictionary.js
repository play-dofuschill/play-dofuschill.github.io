// mstrMoveDictionary.js — Sorts/attaques des monstres DofusChill
// Étend l'objet `move` défini dans moveDictionary.js

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

// mstrMoveDictionary.js — version format effects

// ═══════════════════════════════════════════════════════
// INCARNAM
// ═══════════════════════════════════════════════════════
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

// ═══════════════════════════════════════════════════════
// TAINELA
// ═══════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════
// EVENT PIOU
// ═══════════════════════════════════════════════════════

move.picore = {
    id: 'picore',
    name: 'Picore',
    cooldownMs: 1500,
    effects: [{type: 'damage', element: 'neutre', damage: { min: 16, max: 20 }, target: 'enemy'}]
}