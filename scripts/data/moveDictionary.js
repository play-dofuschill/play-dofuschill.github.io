// moveDictionary.js — Sorts des classes DofusChill

const move = {}

/* 

restriction: 'star',   // ★  — ou 'arrow' (→) ou 'shield' (🛡)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RÉFÉRENCE EFFETS DE SORTS — copier-coller prêt à l'emploi
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ÉLÉMENTS   : neutre | terre | feu | eau | air
TARGET      : enemy (cible adverse) | self (le caster) | all_allies (toute l'équipe alliée) | all_enemies (tous les ennemis — raid uniquement, solo = ennemi principal)
STATS BUFF  : atk | spd | flatDamage | finalDamagePct | spellDamagePct | damageReductionPct | critChance | critDamagePct

──────────────────────────────────────────────────────────────────────────────
DÉGÂTS
──────────────────────────────────────────────────────────────────────────────

// Dégâts directs
{ type: 'damage', element: 'feu', damage: { min: 10, max: 20 }, target: 'enemy' }

// Splash simple : e2 = X% des dégâts de e1 (bypass défenses, pas d'érosion)
{ type: 'damage', element: 'air', damage: { min: 10, max: 20 }, splashPct: 50, target: 'enemy' }

// Double splash : e2 = X% de e1, e3 = Y% de e1
{ type: 'damage', element: 'air', damage: { min: 10, max: 20 }, splashPct: 75, splashPct2: 50, target: 'enemy' }

// Double splash en cascade : e2 = X% de e1, e3 = Y% de e2 (chaîne brisée si e2 est mort)
{ type: 'damage', element: 'air', damage: { min: 10, max: 20 }, splashPct: 75, splashPct2: 50, splashChain: true, target: 'enemy' }

// Cible un slot ennemi fixe — enemy_1=slot0, enemy_2=slot1, enemy_3=slot2
// En solo : enemy_1 = ennemi unique, enemy_2/enemy_3 = ignorés
// ratio : multiplicateur de dégâts (optionnel, défaut 1.0)
{ type: 'damage', element: 'terre', damage: { min: 10, max: 20 }, target: 'enemy_2', ratio: 0.5 }

// Rotation cyclique (raid) : stack%3 détermine à la fois la cible ET le palier scalingMultipliers
// Cast 1 → enemies[0] à mult[0], cast 2 → enemies[1] à mult[1], cast 3 → enemies[2] à mult[2], cycle
// En solo : frappe toujours l'ennemi unique, scalingMultipliers cycle normalement
{ type: 'damage', element: 'terre', damage: { min: 10, max: 20 }, scalingMultipliers: [1.0, 1.2, 1.5], target: 'enemy_cycle' }

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
        {type: 'damage', element: 'terre', damage: {min: 16, max: 18}, target: 'enemy'},
        {type: 'buff', stat: 'erosionBonus', value: 0.10, duration: 3, target: 'self'}],
    spellProgression: [{lvl: 1,
                        patch: {}},
                       {lvl: 66,
                        patch: {damage: {min: 20, max: 23}, buff: {duration: 4}}},
                       {lvl: 132,
                        patch: {damage: {min: 26, max: 30}, buff: {duration: 5}}}],
    description: "Tape l'ennemi dans l'élément terre et augmente l'érosion de 10% sur tous les prochains sorts."
}
move.epee_divine = {
    id: 'epee_divine',
    name: 'Épée Divine',
    classId: 'iop',
    cooldownMs: 2000,
    effects: [
        {type: 'damage', element: 'air', damage: {min: 14, max: 17}, target: 'enemy'},
        {type: 'buff', stat: 'flatDamage', value: 10, duration: 3, target: 'self'}],
    spellProgression: [{lvl: 8,
                        patch: {}},
                       {lvl: 69,
                        patch: {damage: {min: 19, max: 22}, buff: {value: 30, duration: 5}}},
                       {lvl: 136,
                        patch: {damage: {min: 24, max: 28}, buff: {value: 70, duration: 7}}}],
    description: "Tape l'ennemi dans l'élément air et augmente les dommages bruts pour les prochains coups."
}
move.couperet = {
    id: 'couperet',
    name: 'Couperet',
    classId: 'iop',
    cooldownMs: 2000,
    effects: [
        {type: 'damage', element: 'feu', damage: {min: 17, max: 19}, target: 'enemy'},
        {type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy'}],
    spellProgression: [{lvl: 12,
                        patch: {}},
                       {lvl: 68,
                        patch: {damage: {min: 22, max: 25}, buff: {value: 15, duration: 2}}},
                       {lvl: 134,
                        patch: {damage: {min: 28, max: 32}, buff: {value: 20, duration: 3}}}],
    description: "Tape l'ennemi dans l'élément feu et réduit sa vitesse pour ses prochains coups."
}
move.ferveur = {
    id: 'ferveur',
    name: 'Ferveur',
    classId: 'iop',
    cooldownMs: 2000,
    effects: [
        {type: 'damage', element: 'eau', damage: {min: 9, max: 11}, target: 'enemy'},
        {type: 'shield', levelPct: 0.50, duration: 3, target: 'self'}],
    spellProgression: [{lvl: 16,
                        patch: {}},
                       {lvl: 68,
                        patch: {damage: {min: 13, max: 15}}},
                       {lvl: 134,
                        patch: {damage: {min: 16, max: 19}}}],
    description: "Tape l'ennemi dans l'élément eau et applique un bouclier égal à 50% de son niveau pour 2 coups."
}
move.intimidation = {
    id: 'intimidation',
    name: 'Intimidation',
    classId: 'iop',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'neutre', damage: {min: 16,max: 18}, target: 'enemy'}],
    spellProgression: [{lvl: 20,
                        patch: {}},
                       {lvl: 72,
                        patch: {damage: { min: 20, max: 23 }}},
                       {lvl: 139,
                        patch: {damage: { min: 26, max: 30 }}}],
    description: "Tape l'ennemi dans l'élément neutre."
}
move.bond = {
    id: 'bond',
    name: 'Bond',
    classId: 'iop',
    cooldownMs: 2000,
    effects: [{type: 'buff', stat: 'spd', value: 20, duration: 2, target: 'self'}],
    spellProgression: [{lvl: 24,
                        patch: {}},
                       {lvl: 77,  
                        patch: {buff: { value: 30 }}},
                       {lvl: 144,
                        patch: {buff: { value: 40 }}}],
    description: "Augmente la vitesse du lanceur pour 2 tours."
}
move.concentration = {
    id: 'concentration',
    name: 'Concentration',
    classId: 'iop',
    cooldownMs: 1800,
    effects: [{type: 'damage', element: 'terre', damage: {min: 13, max: 15}, target: 'enemy', summonMultiplier: 2}],
    spellProgression: [{lvl: 28,
                        patch: {}},
                       {lvl: 82,
                        patch: {damage: {min: 16, max: 19}}},
                       {lvl: 149,
                        patch: {damage: {min: 20, max: 24}}}],
    description: "Tape l'ennemi dans l'élément terre. Les dégâts sont doublés sur les invocations."
}
move.deferlement = {
    id: 'deferlement',
    name: 'Déferlement',
    classId: 'iop',
    cooldownMs: 2300,
    effects: [{type: 'damage', element: 'eau', damage: {min: 24, max: 27}, target: 'enemy', ignoreShield: true}],
    spellProgression: [{lvl: 33,
                        patch: {}},
                       {lvl: 87,
                        patch: {damage: {min: 31, max: 34}}},
                       {lvl: 154,
                        patch: {damage: {min: 38, max: 42}}}],
    description: "Tape l'ennemi dans l'élément eau et ignore les boucliers."
}
move.vitalite = {
    id: 'vitalite',
    name: 'Vitalité',
    classId: 'iop',
    cooldownMs: 2000,
    effects: [{type: 'buff', stat: 'maxHp', value: 100, duration: 2, target: 'self'}],
    spellProgression: [{lvl: 37,
                        patch: {}},
                       {lvl: 92,  
                        patch: {buff: { value: 200 }}},
                       {lvl: 159,
                        patch: {buff: { value: 400 }}}],
    description: "Augmente temporairement les points de vie et points de vie max du lanceur."
}
move.souffle = {
    id: 'souffle',
    name: 'Souffle',
    classId: 'iop',
    cooldownMs: 2000,
    effects: [
        {type: 'damage', element: 'air', damage: {min: 8, max: 10}, target: 'enemy'},
        {type: 'recul', target: 'enemy'}],
    spellProgression: [{lvl: 41,
                        patch: {}},
                       {lvl: 97,
                        patch: {damage: {min: 10, max: 12}}},
                       {lvl: 164,
                        patch: {damage: {min: 13, max: 15}}}],
    description: "Tape l'ennemi dans l'élément air et le fait reculer d'un rang. Le second effet ne s'applique qu'en Raid."
}
move.epee_destructrice = {
    id: 'epee_destructrice',
    name: 'Épée Destructrice',
    classId: 'iop',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 20, max: 23}, target: 'enemy', erosionRate: 0.10}],
    spellProgression: [{lvl: 45,
                        patch: {}},
                       {lvl: 102,
                        patch: {damage: {min: 26, max: 29}, erosionRate: 0.15}},
                       {lvl: 169,
                        patch: {damage: {min: 32, max: 36}, erosionRate: 0.20}}],
    description: "Tape l'ennemi dans l'élément feu et l'érode en fonction des dégâts infligés."
}
move.puissance = {
    id: 'puissance',
    name: 'Puissance',
    classId: 'iop',
    cooldownMs: 2000,
    effects: [{type: 'buff', stat: 'atk', value: 100, duration: 3, target: 'self'}],
    spellProgression: [{lvl: 49,
                        patch: {}},
                       {lvl: 107,  
                        patch: {buff: { value: 200 }}},
                       {lvl: 174,
                        patch: {buff: { value: 400 }}}],
    description: "Augmente la puissance du lanceur pour 3 tours."
}
move.tempete_de_puissance = {
    id: 'tempete_de_puissance',
    name: 'Tempête de Puissance',
    classId: 'iop',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 17, max: 19}, scalingMultipliers: [1.0, 1.2, 1.5], target: 'enemy_cycle'}],
    spellProgression: [{lvl: 53,
                        patch: {}},
                       {lvl: 112,
                        patch: {damage: {min: 22, max: 25}}},
                       {lvl: 179,
                        patch: {damage: {min: 27, max: 30}}}],
    description: "Tape de plus en plus fort à chaque lancés, revient a la normale au 4ème. En raid, frappe successivement l'ennemi principal, le sondaire et le tertiaire."
}
// move.endurance = {
//     id: 'endurance',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 57,
//                         patch: {}},
//                        {lvl: 117,  
//                         patch: {buff: { value: 30 }}},
//                        {lvl: 184,
//                         patch: {buff: { value: 40 }}}],
//     description: ""
// }
// move.vertu = {
//     id: 'vertu',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 61,
//                         patch: {}},
//                        {lvl: 122,  
//                         patch: {buff: { value: 30 }}},
//                        {lvl: 189,
//                         patch: {buff: { value: 40 }}}],
//     description: ""
// }
// move.epee_de_iop = {
//     id: 'epee_de_iop',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 65,
//                         patch: {}},
//                        {lvl: 127,  
//                         patch: {buff: { value: 30 }}},
//                        {lvl: 194,
//                         patch: {buff: { value: 40 }}}],
//     description: ""
// }
// move.friction = {
//     id: 'friction',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 69,
//                         patch: {}},
//                        {lvl: 131,  
//                         patch: {buff: { value: 30 }}},
//                        {lvl: 198,
//                         patch: {buff: { value: 40 }}}],
//     description: ""
// }
// move.epee_celeste = {
//     id: 'epee_celeste',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 73,
//                         patch: {}},
//                        {lvl: 137,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.precipitation = {
//     id: 'precipitation',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.epee_du_destin = {
//     id: 'epee_du_destin',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.emprise = {
//     id: 'emprise',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.fureur = {
//     id: 'fureur',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.fracture = {
//     id: 'fracture',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.menace = {
//     id: 'menace',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.accumulation = {
//     id: 'accumulation',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.epee_du_jugement = {
//     id: 'epee_du_jugement',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.conquete = {
//     id: 'conquete',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.agitation = {
//     id: 'agitation',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.sentence = {
//     id: 'sentence',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.anneau_destructeur = {
//     id: 'anneau_destructeur',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.violence = {
//     id: 'violence',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
// move.rassemblement = {
//     id: 'rassemblement',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
// move.fustigation = {
//     id: 'fustigation',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
// move.vindicte = {
//     id: 'vindicte',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
// move.tannee = {
//     id: 'tannee',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
move.pugilat = {
    id: 'pugilat',
    name: 'Pugilat',
    classId: 'iop',
    cooldownMs: 2000,
    effects: [
        {type: 'damage', element: 'terre', damage: {min: 24, max: 28}, scalingMultipliers: [1.0, 1.2, 1.5], target: 'enemy_1'},
        {type: 'damage', element: 'terre', damage: {min: 24, max: 28}, scalingMultipliers: [1.0, 1.2, 1.5], target: 'enemy_2', ratio: 0.5},
        {type: 'damage', element: 'terre', damage: {min: 24, max: 28}, scalingMultipliers: [1.0, 1.2, 1.5], target: 'enemy_3', ratio: 0.5}
    ],
    description: "Tape de plus en plus fort à chaque lancés, revient a la normale au 4ème. En raid, frappe l'ennemi principal avec 100% des dommages et les ennemis secondaire et tertiaires avec 50%."
}
// move.massacre = {
//     id: 'massacre',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
// move.fendoir = {
//     id: 'fendoir',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
// move.coup_pour_coup = {
//     id: 'coup_pour_coup',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
move.zenith = {
    id: 'zenith',
    name: 'Zénith',
    classId: 'iop',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'feu', damage: {min: 12, max: 16}, slot1BonusPct: 300, target: 'enemy'}],
    description: "Frappe l'ennemi dans l'élément air. Si le sort est en première position, inflige 300% de dommages supplémentaires."
}
// move.determination = {
//     id: 'determination',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
// move.tumulte = {
//     id: 'tumulte',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
// move.duel = {
//     id: 'duel',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
// move.colere_de_iop = {
//     id: 'colere_de_iop',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
// #endregion
// #region CRA ─────────────────────────────────────────────

move.fleche_optique = {
    id: 'fleche_optique',
    name: 'Flèche Optique',
    classId: 'cra',
    cooldownMs: 1650,
    effects: [{type: 'damage', element: 'air', damage: {min: 14,max: 16}, target: 'enemy'}],
    spellProgression: [{lvl: 1,
                        patch: {}},
                       {lvl: 66,
                        patch: {damage: { min: 18, max: 21 }}},
                       {lvl: 132,
                        patch: {damage: { min: 23, max: 27 }}}],
    description: "Tape rapidement l'ennemi dans l'élément air."
}
move.fleche_glacee = {
    id: 'fleche_glacee',
    name: 'Flèche Glacée',
    classId: 'cra',
    cooldownMs: 1900,
    effects: [
        {type: 'damage', element: 'eau', damage: { min: 14, max: 17 }, target: 'enemy'},
        {type: 'debuff', stat: 'atk', value: 30, duration: 2, target: 'enemy'}],
    spellProgression: [{lvl: 8,
                        patch: {}},
                       {lvl: 67,
                        patch: {damage: {min: 19, max: 22}, buff: {value: 70, duration: 7}}},
                       {lvl: 133,
                        patch: {damage: {min: 24, max: 28}, buff: {value: 150, duration: 7}}}],
    description: "Tape l'ennemi dans l'élément eau et retire de la puissance à l'ennemi."
}
move.fleche_cinglante = {
    id: 'fleche_cinglante',
    name: 'Flèche Cinglante',
    classId: 'cra',
    cooldownMs: 1900,
    effects: [
        {type: 'damage', element: 'terre', damage: {min: 15, max: 17}, target: 'enemy'},
        {type: 'avance', target: 'enemy'}],
    spellProgression: [{lvl: 12,
                        patch: {}},
                       {lvl: 69,
                        patch: {damage: { min: 20, max: 23 }}},
                       {lvl: 136,
                        patch: {damage: { min: 25, max: 29 }}}],
    description: "Tape l'ennemi dans l'élément terre et le fait avancer d'un rang. Si l'ennemi est seul, la deuxième partie de l'effet ne se déclanche pas."
}
move.tir_repulsif = {
    id: 'tir_repulsif',
    name: 'Tir Répulsif',
    classId: 'cra',
    cooldownMs: 2000,
    effects: [
        {type: 'damage', element: 'feu', damage: {min: 17, max: 19}, target: 'enemy'},
        {type: 'recul', target: 'enemy'}],
    spellProgression: [{lvl: 16,
                        patch: {}},
                       {lvl: 68,
                        patch: {damage: { min: 22, max: 25 }}},
                       {lvl: 134,
                        patch: {damage: { min: 28, max: 32 }}}],
    description: "Tape l'ennemi dans l'élément feu et le fait reculer d'un rang. Si l'ennemi est seul, la deuxième partie de l'effet ne se déclanche pas."
}
move.fleche_de_dispersion = {
    id: 'fleche_de_dispersion',
    name: 'Flèche de Dispersion',
    classId: 'cra',
    cooldownMs: 2000,
    effects: [
        {type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy'},
        {type: 'recul', target: 'enemy'}],
    spellProgression: [{lvl: 20,
                        patch: {}},
                       {lvl: 72,  
                        patch: {buff: { value: 30 }}},
                       {lvl: 139,
                        patch: {buff: { value: 40 }}}],
    description: "Réduit la vitesse de l'ennemi pour 3 tours et le fais reculer."
}
move.tirs_eloignes = {
    id: 'tirs_eloignes',
    name: 'Tirs Éloignés',
    classId: 'cra',
    cooldownMs: 2000,
    effects: [{type: 'buff', stat: 'spd', value: 20, duration: 3, target: 'self'}],
    spellProgression: [{lvl: 24,
                        patch: {}},
                       {lvl: 77,  
                        patch: {buff: { value: 30 }}},
                       {lvl: 144,
                        patch: {buff: { value: 40 }}}],
    description: "Augmente la vitesse du lanceur pour 3 tours."
}
move.fleche_dimmobilisation = {
    id: 'fleche_dimmobilisation',
    name: "Flèche d'Immobilisation",
    classId: 'cra',
    cooldownMs: 2000,
    effects: [
        {type: 'damage',  element: 'eau', damage: {min: 7, max: 9}, target: 'enemy'},
        {type: 'lifesteal', ratio: 0.1, target: 'self'},
        {type: 'debuff', stat: 'spd', value: 10, duration: 2, target: 'enemy'}],
    spellProgression: [{lvl: 28,
                        patch: {}},
                       {lvl: 82,
                        patch: {damage: {min: 8, max: 10}, buff: { value: 15 }}},
                       {lvl: 149,
                        patch: {damage: {min: 11, max: 13}, buff: { value: 20 }}}],
    description: "Tape dans l'eau, vole de la vie et ralenti l'ennemi."
}
move.tir_de_recul = {
    id: 'tir_de_recul',
    name: 'Tir de Recul',
    classId: 'cra',
    cooldownMs: 2000,
    effects: [
        {type: 'damage', element: 'air', damage: {min: 15, max: 17}, target: 'enemy'},
        {type: 'recul', target: 'enemy'}],
    spellProgression: [{lvl: 33,
                        patch: {}},
                       {lvl: 87,
                        patch: {damage: { min: 20, max: 22 }}},
                       {lvl: 154,
                        patch: {damage: { min: 25, max: 38 }}}],
    description: "Tape dans l'air et fait reculer l'ennemi d'un rang. Le recul ne s'applique qu'en Raid."
}
move.balise_tactique = {
    id: 'balise_tactique',
    name: 'Balise Tactique',
    classId: 'cra',
    cooldownMs: 2000,
    effects: [{type: 'buff', stat: 'flatDamage', value: 60, duration: 2, target: 'self'}],
    spellProgression: [{lvl: 37,
                        patch: {}},
                       {lvl: 92,  
                        patch: {buff: { value: 130 }}},
                       {lvl: 159,
                        patch: {buff: { value: 300 }}}],
    description: "Utilise une balise qui augmente les dégats du prochain sort lancé."
}
move.fleche_détonante = {
    id: 'fleche_détonante',
    name: 'Flèche Détonante',
    classId: 'cra',
    cooldownMs: 2000,
    effects: [
        {type: 'damage',    element: 'feu', damage: {min: 7, max: 9}, target: 'enemy'},
        {type: 'lifesteal', ratio: 0.1, target: 'self'},
        {type: 'dot',       element: 'feu', value: 10, duration: 2, target: 'enemy_2'}],
    spellProgression: [{lvl: 41,
                        patch: {}},
                       {lvl: 97,
                        patch: {damage: { min: 10, max: 13 }}},
                       {lvl: 164,
                        patch: {damage: { min: 14, max: 17 }}}],
    description: "Tape dans le feu, vole de la vie et applique un poison feu de 10 dégâts à l'ennemi secondaire pour 2 tours."
}
move.fleche_empoisonnee = {
    id: 'fleche_empoisonnee',
    name: 'Flèche Empoisonnée',
    classId: 'cra',
    cooldownMs: 2000,
    effects: [{type: 'dot', element: 'neutre', value: 11, duration: 2, target: 'enemy'}],
    spellProgression: [{lvl: 45,
                        patch: {}},
                       {lvl: 102,
                        patch: {dot: {value: 15}}},
                       {lvl: 169,
                        patch: {dot: {value: 18, duration: 3}}}],
    description: "Applique un poison neutre pendant plusieurs tours."
}
move.tirs_puissants = {
    id: 'tirs_puissants',
    name: 'Tirs Puissants',
    classId: 'cra',
    cooldownMs: 2000,
    effects: [
        {type: 'buff', stat: 'atk',        value: 100, duration: 3, target: 'self'},
        {type: 'buff', stat: 'flatDamage', value: 10,  duration: 3, target: 'self'}],
    spellProgression: [{lvl: 49,
                        patch: {}},
                       {lvl: 107,
                        patch: {buff: [{stat: 'atk', value: 150}, {stat: 'flatDamage', value: 25}]}},
                       {lvl: 174,
                        patch: {buff: [{stat: 'atk', value: 200}, {stat: 'flatDamage', value: 50}]}}],
    description: "Augmente la puissance et les dommages bruts du lanceur pour 3 tours."
}
move.fleche_de_concentration = {
    id: 'fleche_de_concentration',
    name: 'Flèche de Concentration',
    classId: 'cra',
    cooldownMs: 2000,
    effects: [
        {type: 'damage',       element: 'air', damage: {min: 14, max: 16}, target: 'enemy'},
        {type: 'swap_enemies', target: 'enemy'}],
    spellProgression: [{lvl: 53,
                        patch: {}},
                       {lvl: 112,
                        patch: {damage: {min: 19, max: 22}}},
                       {lvl: 179,
                        patch: {damage: {min: 23, max: 26}}}],
    description: "Tape dans l'élément air et échange les positions des ennemis secondaire et tertiaire (raid uniquement)."
}
move.oeil_de_taupe = {
    id: 'oeil_de_taupe',
    name: 'Œil de Taupe',
    classId: 'cra',
    cooldownMs: 2000,
    effects: [
        {type: 'damage',    element: 'eau', damage: {min: 15, max: 17}, target: 'all_enemies'},
        {type: 'lifesteal', ratio: 0.1, target: 'self'}],
    spellProgression: [{lvl: 57,
                        patch: {}},
                       {lvl: 117,
                        patch: {damage: {min: 21, max: 23}}},
                       {lvl: 184,
                        patch: {damage: {min: 25, max: 27}}}],
    description: "Tape dans l'élément eau tous les ennemis (raid) et vole de la vie."
}
move.fleches_erosives = {
    id: 'fleches_erosives',
    name: 'Flèches Érosives',
    classId: 'cra',
    cooldownMs: 2000,
    effects: [{type: 'debuff', stat: 'erosionBonus', value: 0.10, duration: 3, target: 'enemy'}],
    spellProgression: [{lvl: 61,
                        patch: {}},
                       {lvl: 122,
                        patch: {buff: { value: 0.15 }}},
                       {lvl: 189,
                        patch: {buff: { value: 0.20, duration: 4 }}}],
    description: "L'ennemi subit plus d'érosion sur les prochains coups qu'il prend."
}
move.tir_perforant = {
    id: 'tir_perforant',
    name: 'Tir Perforant',
    classId: 'cra',
    cooldownMs: 2000,
    effects: [
        {type: 'damage', element: 'air', damage: {min: 29, max: 32}, splashPct: 50, target: 'enemy'}],
    spellProgression: [{lvl: 65,
                        patch: {}},
                       {lvl: 127,
                        patch: {damage: {min: 36, max: 39}}},
                       {lvl: 194,
                        patch: {damage: {min: 40, max: 44}}}],
    description: "Tape air et inflige 50% des dommages à l'ennemi secondaire. Le second effet ne s'applique qu'en Raid."
}
move.fleche_punitive = {
    id: 'fleche_punitive',
    name: 'Flèche Punitive',
    classId: 'cra',
    cooldownMs: 2000,
    effects: [{
        type: 'damage',
        element: 'terre',
        damage: {min: 21, max: 23},
        scalingMultipliers: [1.0, 1.2, 1.5],
        stayAtMax: true,
        target: 'enemy'
    }],
    spellProgression: [{lvl: 69,
                        patch: {}},
                       {lvl: 131,
                        patch: {damage: {min: 1, max: 1}}},
                       {lvl: 198,
                        patch: {damage: {min: 1, max: 1}}}],
    description: "Tape dans la terre. Les dégâts augmentent à chaque lancé (limite de 3)."
}
// move.oeil_pour_oeil = {
//     id: 'oeil_pour_oeil',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 73,
//                         patch: {}},
//                        {lvl: 137,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.fleche_dexpiation = {
//     id: 'fleche_dexpiation',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
move.fleche_explosive = {
    id: 'fleche_explosive',
    name: 'Flèche Explosive',
    classId: 'cra',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'feu', damage: {min: 24, max: 27}, target: 'all_enemies'}],
    spellProgression: [{lvl: 81,
                        patch: {}},
                       {lvl: 147,
                        patch: {damage: {min: 30, max: 34}}}],
    description: "Inflige des dommages feu à tous les ennemis en raid."
}
// move.fleche_persecutrice = {
//     id: 'fleche_persecutrice',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.vendetta = {
//     id: 'vendetta',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.pluie_de_fleches = {
//     id: 'pluie_de_fleches',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.fleche_ralentissante = {
//     id: 'fleche_ralentissante',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.fleches_enflammees = {
//     id: 'fleches_enflammees',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.tir_de_couverture = {
//     id: 'tir_de_couverture',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.represailles = {
//     id: 'represailles',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.acuite_absolue = {
//     id: 'acuite_absolue',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.fleche_assaillante = {
//     id: 'fleche_assaillante',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.tir_de_barrage = {
//     id: 'tir_de_barrage',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
move.balise_de_rappel = {
    id: 'balise_de_rappel',
    name: 'Balise de Rappel',
    classId: 'cra',
    cooldownMs: 2000,
    effects: [{type: 'buff', stat: 'pendingLifesteal', value: 1.2, duration: 2, target: 'self'}],
    description: "Octroi un effet de vol de vie sur le prochain sort."
}
// move.fleche_de_tourment = {
//     id: 'fleche_de_tourment',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
// move.fleche_paralysante = {
//     id: 'fleche_paralysante',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
// move.tirs_percants = {
//     id: 'tirs_percants',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
// move.carreaux_destructeurs = {
//     id: 'carreaux_destructeurs',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
// move.fleche_ecrasante = {
//     id: 'fleche_ecrasante',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
// move.fleches_de_repli = {
//     id: 'fleches_de_repli',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
move.fleche_devorante = {
    id: 'fleche_devorante',
    name: 'Flèche Dévorante',
    classId: 'cra',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'air', stackedDamage: [{min:1,max:3},{min:2,max:5},{min:4,max:9},{min:8,max:15},{min:13,max:20}], target: 'enemy'}],
    description: "Augmente les dégats a chaque lancer (limite de 5)"
}
// move.fleche_du_jugement = {
//     id: 'fleche_du_jugement',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
move.miroir_aux_alouettes = {
    id: 'miroir_aux_alouettes',
    name: 'Miroir aux Alouettes',
    classId: 'cra',
    cooldownMs: 2000,
    effects: [{type: 'renvoi', ratio: 1.0, target: 'self'}],
    description: "Renvoi le prochain dégat reçu."
}
// move.fleche_de_redemption = {
//     id: 'fleche_de_redemption',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
// move.fleche_fulminante = {
//     id: 'fleche_fulminante',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
// move.fleche_tyrannique = {
//     id: 'fleche_tyrannique',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
// move.sentinelle = {
//     id: 'sentinelle',
//     name: '',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
// #endregion
// #region ENIRIPSA ─────────────────────────────────────────

move.mot_tapageur = {
    id: 'mot_tapageur',
    name: 'Mot Tapageur',
    classId: 'eniripsa',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'feu', damage: {min: 12,max: 14}, target: 'enemy'}],
    spellProgression: [{lvl: 1,
                        patch: {}},
                       {lvl: 66,
                        patch: {damage: { min: 18, max: 21 }}},
                       {lvl: 132,
                        patch: {damage: { min: 23, max: 27 }}}],
    description: "Tape rapidement l'ennemi dans l'élément feu."
}
move.juron = {
    id: 'juron',
    name: 'Juron',
    classId: 'eniripsa',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'terre', damage: {min: 14,max: 16}, target: 'enemy'}],
    spellProgression: [{lvl: 8,
                        patch: {}},
                       {lvl: 67,
                        patch: {damage: { min: 19, max: 22 }}},
                       {lvl: 133,
                        patch: {damage: { min: 24, max: 28 }}}],
    description: "Tape l'ennemi dans l'élément terre."
}
move.mot_vampirique = {
    id: 'mot_vampirique',
    name: 'Mot Vampirique',
    classId: 'eniripsa',
    cooldownMs: 2300,
    effects: [
        {type: 'damage', element: 'eau', damage: { min: 16, max: 18 }, target: 'enemy'},
        {type: 'lifesteal', ratio: 0.3, target: 'self'}],
    spellProgression: [{ lvl: 12, 
                         patch: {} },
                       {lvl: 69,
                        patch: {damage: { min: 22, max: 26 }, lifesteal: { ratio: 0.40 }}},
                       {lvl: 136,
                        patch: {damage: { min: 30, max: 38 },lifesteal: { ratio: 0.50 }}}],
    description: "Tape l'ennemi et soigne un pourcentage des dégâts infligés."
}
move.mot_espiegle = {
    id: 'mot_espiegle',
    name: 'Mot Espiègle',
    classId: 'eniripsa',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'air', damage: {min: 12,max: 14}, target: 'enemy'}],
    spellProgression: [{lvl: 16,
                        patch: {}},
                       {lvl: 68,
                        patch: {damage: { min: 22, max: 25 }}},
                       {lvl: 134,
                        patch: {damage: { min: 28, max: 32 }}}],
    description: "Tape l'ennemi dans l'élément air."
}
move.mot_damitie = {
    id: 'mot_damitie',
    name: "Mot d'amitié",
    classId: 'eniripsa',
    cooldownMs: 2000,
    effects: [{type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy'}],
    spellProgression: [{lvl: 20,
                        patch: {}},
                       {lvl: 72,
                        patch: {buff: { value: 30 }}},
                       {lvl: 139,
                        patch: {buff: { value: 40 }}}],
    description: "Réduit la vitesse de l'ennemi pour 3 tours."
}
move.mot_stimulant = {
    id: 'mot_stimulant',
    name: 'Mot Stimulant',
    classId: 'eniripsa',
    cooldownMs: 2000,
    effects: [{type: 'buff', stat: 'spd', value: 20, duration: 3, target: 'self'}],
    spellProgression: [{lvl: 24,
                        patch: {}},
                       {lvl: 77,  
                        patch: {buff: { value: 30 }}},
                       {lvl: 144,
                        patch: {buff: { value: 40 }}}],
    description: "Augmente la vitesse du lanceur de xx% pour xx tours."
}
move.mot_de_frayeur = {
    id: 'mot_de_frayeur',
    name: '',
    classId: 'eniripsa',
    cooldownMs: 2000,
    effects: [{type: '', element: '', damage: {min: 1,max: 1}, stat: '', value: 1, duration: 1, target: ''}],
    spellProgression: [{lvl: 28,
                        patch: {}},
                       {lvl: 82,  
                        patch: {buff: { value: 30 }}},
                       {lvl: 149,
                        patch: {buff: { value: 40 }}}],
    description: ""
}
move.lamentations = {
    id: 'lamentations',
    name: '',
    classId: 'eniripsa',
    cooldownMs: 2000,
    effects: [{type: '', element: '', damage: {min: 1,max: 1}, stat: '', value: 1, duration: 1, target: ''}],
    spellProgression: [{lvl: 33,
                        patch: {}},
                       {lvl: 87,  
                        patch: {buff: { value: 30 }}},
                       {lvl: 154,
                        patch: {buff: { value: 40 }}}],
    description: ""
}
move.mot_turbulent = {
    id: 'mot_turbulent',
    name: '',
    classId: 'eniripsa',
    cooldownMs: 2000,
    effects: [{type: '', element: '', damage: {min: 1,max: 1}, stat: '', value: 1, duration: 1, target: ''}],
    spellProgression: [{lvl: 37,
                        patch: {}},
                       {lvl: 92,  
                        patch: {buff: { value: 30 }}},
                       {lvl: 159,
                        patch: {buff: { value: 40 }}}],
    description: ""
}
move.mot_vivifiant = {
    id: 'mot_vivifiant',
    name: '',
    classId: 'eniripsa',
    cooldownMs: 2000,
    effects: [{type: '', element: '', damage: {min: 1,max: 1}, stat: '', value: 1, duration: 1, target: ''}],
    spellProgression: [{lvl: 41,
                        patch: {}},
                       {lvl: 97,  
                        patch: {buff: { value: 30 }}},
                       {lvl: 164,
                        patch: {buff: { value: 40 }}}],
    description: ""
}
move.mot_farceur = {
    id: 'mot_farceur',
    name: '',
    classId: 'eniripsa',
    cooldownMs: 2000,
    effects: [{type: '', element: '', damage: {min: 1,max: 1}, stat: '', value: 1, duration: 1, target: ''}],
    spellProgression: [{lvl: 45,
                        patch: {}},
                       {lvl: 102,  
                        patch: {buff: { value: 30 }}},
                       {lvl: 169,
                        patch: {buff: { value: 40 }}}],
    description: ""
}
move.peinture_de_guerre = {
    id: 'peinture_de_guerre',
    name: '',
    classId: 'eniripsa',
    cooldownMs: 2000,
    effects: [{ type: '', element: '', damage: {min: 1,max: 1}, stat: '', value: 1, duration: 1, target: ''}],
    spellProgression: [{lvl: 49,
                        patch: {}},
                       {lvl: 107,  
                        patch: {buff: { value: 30 }}},
                       {lvl: 174,
                        patch: {buff: { value: 40 }}}],
    description: ""
}
// move.mot_de_jouvence = {
//     id: 'mot_de_jouvence',
//     name: '',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 53,
//                         patch: {}},
//                        {lvl: 112,  
//                         patch: {buff: { value: 30 }}},
//                        {lvl: 179,
//                         patch: {buff: { value: 40 }}}],
//     description: ""
// }
// move.cri_de_guerre = {
//     id: 'cri_de_guerre',
//     name: '',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 57,
//                         patch: {}},
//                        {lvl: 117,  
//                         patch: {buff: { value: 30 }}},
//                        {lvl: 184,
//                         patch: {buff: { value: 40 }}}],
//     description: ""
// }
// move.mot_interdit = {
//     id: 'mot_interdit',
//     name: '',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 61,
//                         patch: {}},
//                        {lvl: 122,  
//                         patch: {buff: { value: 30 }}},
//                        {lvl: 189,
//                         patch: {buff: { value: 40 }}}],
//     description: ""
// }
// move.mot_accablant = {
//     id: 'mot_accablant',
//     name: '',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 65,
//                         patch: {}},
//                        {lvl: 127,  
//                         patch: {buff: { value: 30 }}},
//                        {lvl: 194,
//                         patch: {buff: { value: 40 }}}],
//     description: ""
// }
// move.chapardage = {
//     id: 'chapardage',
//     name: '',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 69,
//                         patch: {}},
//                        {lvl: 131,  
//                         patch: {buff: { value: 30 }}},
//                        {lvl: 198,
//                         patch: {buff: { value: 40 }}}],
//     description: ""
// }
// move.mot_fleuri = {
//     id: 'mot_fleuri',
//     name: '',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 73,
//                         patch: {}},
//                        {lvl: 137,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.mot_denvol = {
//     id: 'mot_denvol',
//     name: '',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.pinceau_tribal = {
//     id: 'pinceau_tribal',
//     name: '',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.cryothérapie = {
//     id: 'cryothérapie',
//     name: '',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.mot_de_reconstitution = {
//     id: 'mot_de_reconstitution',
//     name: '',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.mot_malicieux = {
//     id: 'mot_malicieux',
//     name: '',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.cri_assourdissant = {
//     id: 'cri_assourdissant',
//     name: '',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.sanglots = {
//     id: 'sanglots',
//     name: '',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.onguent_ancestral = {
//     id: 'onguent_ancestral',
//     name: '',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.mot_alchimique = {
//     id: 'mot_alchimique',
//     name: '',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.mot_de_déclin = {
//     id: 'mot_de_déclin',
//     name: '',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.scalpel = {
//     id: 'scalpel',
//     name: '',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.vacarme = {
//     id: 'vacarme',
//     name: '',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,  
//                         patch: {buff: { value: 30 }}}],
//     description: ""
// }
// move.mot_furieux = {
//     id: 'mot_furieux',
//     name: '',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
// move.mot_galvanisant = {
//     id: 'mot_galvanisant',
//     name: '',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
// move.mot_défendu = {
//     id: 'mot_défendu',
//     name: '',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
// move.mot_secret = {
//     id: 'mot_secret',
//     name: '',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
// move.mot_déprimant = {
//     id: 'mot_déprimant',
//     name: '',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
// move.mot_rituel = {
//     id: 'mot_rituel',
//     name: '',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
// move.mot_exsangue = {
//     id: 'mot_exsangue',
//     name: '',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
// move.mot_décourageant = {
//     id: 'mot_décourageant',
//     name: '',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
move.mot_distrayant = {
    id: 'mot_distrayant',
    name: 'Mot Distrayant',
    classId: 'eniripsa',
    cooldownMs: 2000,
    effects: [
        {type: 'damage', element: 'feu', damage: {min: 22, max: 26}, target: 'enemy'},
        {type: 'heal_adjacent%maxHp', heal: 5, target: 'self'}
    ],
    description: "Frappe dans l'élément feu et soigne les alliés adjacents de 5% HP max."
}
// move.bosquet_enchante = {
//     id: 'bosquet_enchante',
//     name: '',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
move.fontaine_de_jouvence = {
    id: 'fontaine_de_jouvence',
    name: 'Fontaine de Jouvence',
    classId: 'eniripsa',
    cooldownMs: 2000,
    effects: [{type: 'buff', stat: 'healOnCast', value: 0.1, duration: 3, target: 'self'}],
    description: "Soigne aléatoirement un allié de 10% HP max à chaque sort lancé (3 sorts)."
}
// move.choeur_strident = {
//     id: 'choeur_strident',
//     name: '',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
// move.murmure = {
//     id: 'murmure',
//     name: '',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [{
//         type: '',
//         element: '',
//         damage: {min: 1,max: 1},
//         stat: '', 
//         value: 1, 
//         duration: 1, 
//         target: ''}],
//     description: ""
// }
move.mot_de_solidarité = {
    id: 'mot_de_solidarité',
    name: 'Mot de Solidarité',
    classId: 'eniripsa',
    cooldownMs: 2000,
    effects: [{type: 'buff_team', stat: 'spd', value: 100, duration: 3, target: 'all_allies'}],
    description: "Double l'initiative de tous les membres de l'équipe pendant 3 tours."
}
// #endregion


