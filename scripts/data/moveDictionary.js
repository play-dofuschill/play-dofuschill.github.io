// moveDictionary.js — Sorts des classes DofusChill

const move = {}

/*

restriction: 'star',   // ★  — ou 'arrow' (→) ou 'shield' (🛡) ou 'coeur' (❤)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RÉFÉRENCE EFFETS DE SORTS — copier-coller prêt à l'emploi
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ÉLÉMENTS    : neutre | terre | feu | eau | air
TARGET       : enemy | self | all_allies | ally_random | ally_min_hp | all_enemies (raid, solo = ennemi principal)
STATS BUFF   : atk | spd | flatDamage | finalDamagePct | spellDamagePct | damageReductionPct | critChance | critDamagePct
               healPct | healFlat | healTeamPct | healMaxHpPct | lifestealPct

──────────────────────────────────────────────────────────────────────────────
DÉGÂTS
──────────────────────────────────────────────────────────────────────────────

// Dégâts directs
{ type: 'damage', element: 'feu', damage: { min: 10, max: 20 }, target: 'enemy' }

// Auto-dégâts (caster ou allié — utilise les résistances de la cible)
{ type: 'damage', element: 'neutre', damage: { min: 10, max: 20 }, target: 'self' }
{ type: 'damage', element: 'neutre', damage: { min: 10, max: 20 }, target: 'ally_random' }

// Splash simple : e2 = X% des dégâts de e1 (bypass défenses, pas d'érosion)
{ type: 'damage', element: 'air', damage: { min: 10, max: 20 }, splashPct: 50, target: 'enemy' }

// Double splash : e2 = X% de e1, e3 = Y% de e1
{ type: 'damage', element: 'air', damage: { min: 10, max: 20 }, splashPct: 75, splashPct2: 50, target: 'enemy' }

// Double splash en cascade : e2 = X% de e1, e3 = Y% de e2 (chaîne brisée si e2 est mort)
{ type: 'damage', element: 'air', damage: { min: 10, max: 20 }, splashPct: 75, splashPct2: 50, splashChain: true, target: 'enemy' }

// Cible un slot ennemi fixe — enemy_1=slot0, enemy_2=slot1, enemy_3=slot2 (ratio : mult dégâts, défaut 1.0)
{ type: 'damage', element: 'terre', damage: { min: 10, max: 20 }, target: 'enemy_2', ratio: 0.5 }

// Rotation cyclique (raid) : stack%3 détermine cible ET palier scalingMultipliers
{ type: 'damage', element: 'terre', damage: { min: 10, max: 20 }, scalingMultipliers: [1.0, 1.2, 1.5], target: 'enemy_cycle' }

// Dégâts sur la durée (DOT — tique au début du tour de la cible)
{ type: 'dot', element: 'feu', value: 10, duration: 3, target: 'enemy' }

──────────────────────────────────────────────────────────────────────────────
SOINS
──────────────────────────────────────────────────────────────────────────────
// Formule heal : (heal × (1 + ATK×0.30/100) + healFlat) × (1 + healPct/100) × antiHeal
// heal accepte une valeur fixe ou une plage aléatoire : heal: 50  ou  heal: { min: 40, max: 60 }

// Soin sur le caster / l'allié le moins en vie / un allié aléatoire
{ type: 'heal', heal: 50,                   target: 'self' }
{ type: 'heal', heal: { min: 40, max: 60 }, target: 'ally_min_hp' }
{ type: 'heal', heal: 50,                   target: 'ally_random' }

// Soin fixe sur toute l'équipe (formule : heal × (1 + healTeamPct/100))
{ type: 'heal_team', heal: 30 }

// Soin en % des HP max de la cible (caster, ally_min_hp ou ally_random)
{ type: 'heal%maxHp', heal: 70, target: 'self' }
{ type: 'heal%maxHp', heal: 10, target: 'ally_min_hp' }

// Soin en % des HP max de chaque allié vivant (% calculé sur les HP max de chacun)
{ type: 'heal%maxHp_team', heal: 20 }

// Soin sur la durée (HoT — tique au début du tour de la cible, antiHeal bloque le tick)
// Formule identique à heal : (heal × (1 + ATK×0.30/100) + healFlat) × (1 + healPct/100), calculée à l'application
// heal accepte une valeur fixe ou une plage : heal: 20  ou  heal: { min: 15, max: 25 }
{ type: 'hot', heal: 20, duration: 3, target: 'self' }
{ type: 'hot', heal: 20, duration: 3, target: 'ally_random' }

// Vol de vie — soigne le caster d'un % des dégâts infligés par l'effet PRÉCÉDENT
// (placer obligatoirement après un effet damage dans le tableau effects)
{ type: 'lifesteal', ratio: 0.5, target: 'self' }

──────────────────────────────────────────────────────────────────────────────
BUFFS / DEBUFFS
──────────────────────────────────────────────────────────────────────────────

// Buff sur le caster / l'allié le moins en vie / un allié aléatoire
{ type: 'buff', stat: 'atk', value: 30, duration: 3, target: 'self' }
{ type: 'buff', stat: 'atk', value: 30, duration: 3, target: 'ally_min_hp' }
{ type: 'buff', stat: 'atk', value: 30, duration: 3, target: 'ally_random' }

// Buff sur toute l'équipe alliée
{ type: 'buff_team', stat: 'atk', value: 20, duration: 2 }

// Debuff sur la cible adverse
{ type: 'debuff', stat: 'atk', value: 40, duration: 3, target: 'enemy' }

// Auto-debuff (caster ou allié)
{ type: 'debuff', stat: 'atk', value: 10, duration: 2, target: 'self' }

──────────────────────────────────────────────────────────────────────────────
SPÉCIAUX
──────────────────────────────────────────────────────────────────────────────

// Bouclier absorbant les dégâts avant les HP (ne se restack pas)
{ type: 'shield', value: 100, duration: 3, target: 'self' }

// Renvoi partiel — renvoie ratio% du prochain coup reçu, le caster encaisse le reste (usage unique)
{ type: 'renvoi', ratio: 0.5, target: 'self' }

// Renvoi total — renvoie ratio% du prochain coup reçu, le caster encaisse 0 (usage unique)
{ type: 'renvoiTotal', ratio: 1.0, target: 'self' }

// Oeil pour Oeil — copie le prochain buff ennemi à ratio% sur le caster (usage unique)
{ type: 'oeilPourOeil', ratio: 0.8, target: 'self' }

// Switch forcé du membre actif adverse
// value: nb de crans à avancer dans la liste des membres vivants (1 seul vivant = aucun effet)
{ type: 'switch', value: 1, target: 'enemy' }

// Relance le sort PRÉCÉDENT dans la rotation une deuxième fois
// (sequence [A, B, repeat, C] → A – B – repeat – B – C – A – B – repeat – B – C)
{ type: 'repeat', target: 'self' }

// Invocation alliée — remplace le caster dans son slot pour N actions, onDeath déclenche à la fin
{ type: 'summon', summonId: 'lapino', duration: 2, target: 'self' }

// Invocation ennemie — remplace l'ennemi actif pour N actions
{ type: 'summon', summonId: 'kardorib', duration: 4, target: 'enemy' }

// Invocation aléatoire depuis une liste
{ type: 'summon', summonPool: ['tofu', 'bouftou', 'arakne'], duration: 3, target: 'enemy' }

// Portail Éliotrope : boost caster (+selfBonus% dmg, -resMalus% rés) + alliés (+allyBonus% dmg)
{ type: 'portal', duration: 3, selfBonus: 25, resMalus: 10, allyBonus: 10, target: 'self' }

// Tourelle Steamer : DoT élémentaire sur l'ennemi, s'affiche "Tourelle" dans le log
{ type: 'turret', element: 'feu', value: 20, duration: 3, target: 'enemy' }

──────────────────────────────────────────────────────────────────────────────
ESQUIVE
──────────────────────────────────────────────────────────────────────────────
// chancePct   : chance (%) que chaque coup reçu soit réduit/annulé
// reductionPct: % de réduction appliqué si le dé passe (100 = 0 dégât, 50 = moitié, 30 = 70% des dégâts)
// Ne s'applique qu'aux dégâts directs (type 'damage'), pas aux DoT

// Full miss — 40% de chance d'esquiver totalement pendant 3 tours
{ type: 'esquive', chancePct: 40, reductionPct: 100, duration: 3, target: 'self' }

// Réduction partielle — 50% de chance de ne prendre que la moitié des dégâts pendant 3 tours
{ type: 'esquive', chancePct: 50, reductionPct: 50, duration: 3, target: 'self' }

──────────────────────────────────────────────────────────────────────────────
BUFF DRAIN
──────────────────────────────────────────────────────────────────────────────
// Réduit de N tours la durée des buffs positifs (value > 0) de la cible — les buffs à 0 expirent immédiatement.
// Ne touche pas les debuffs appliqués par le joueur (valeurs négatives).

// Réduit de 1 tour tous les buffs positifs de l'ennemi
{ type: 'buffDrain', value: 1, target: 'enemy' }

// Réduit de 2 tours
{ type: 'buffDrain', value: 2, target: 'enemy' }

──────────────────────────────────────────────────────────────────────────────
ANTI-SOIN
──────────────────────────────────────────────────────────────────────────────

// Bloque totalement tous les soins de la cible pendant N tours (heal, heal%maxHp, lifesteal, etc.)
{ type: 'antiHeal', duration: 3, target: 'enemy' }

──────────────────────────────────────────────────────────────────────────────
ÉTATS ÉNUTROF (air / terre / eau)
──────────────────────────────────────────────────────────────────────────────
// Mécanique exclusive à l'Énutrof.
// Un sort pose un état interne (air, terre ou eau) qui dure N actions membres.
// Ce compteur décrémente à chaque action de n'importe quel membre — sauf si l'état
// a été (re)posé dans cette même action (pas de double-décrément).
//
// Tant que l'état est actif, les sorts qui ont l'effet enutrof_bonus correspondant
// déclenchent des dégâts bonus en PLUS de leurs effets normaux.
//
// RÈGLE D'ORDRE dans le tableau effects :
//   1. enutrof_bonus  ← en premier (vérifie l'état AVANT qu'il soit reposé)
//   2. damage / debuff / etc.
//   3. setEnutrof     ← en dernier (pose/rafraîchit l'état)
//
// ─ Sort qui POSE l'état ─────────────────────────────────────────────────────
// Monnaie Sonnante : pose enutrof_air_active=3 + bonus air SI l'ennemi a déjà un débuff spd
{ type: 'dmgIfDebuff', stat: 'spd', element: 'air', damage: { min: 18, max: 22 }, target: 'enemy' }
{ type: 'damage',      element: 'air', damage: { min: 14, max: 16 }, target: 'enemy' }
{ type: 'setEnutrof',  state: 'air' }
//
// ─ Sort qui PROFITE de l'état ────────────────────────────────────────────────
// Abattement : pose un débuff spd, bonus air SI enutrof_air_active > 0
{ type: 'enutrof_bonus', state: 'air', element: 'air', damage: { min: 18, max: 22 }, target: 'enemy' }
{ type: 'damage',        element: 'air', damage: { min: 14, max: 16 }, target: 'enemy' }
{ type: 'debuff',        stat: 'spd', value: 10, duration: 7, target: 'enemy' }
// (pas de setEnutrof ici — seul Monnaie Sonnante pose l'état)
//
// ─ dmgIfDebuff — générique ────────────────────────────────────────────────────
// Bonus damage si l'ennemi a actuellement un débuff actif sur le stat spécifié
{ type: 'dmgIfDebuff', stat: 'atk', element: 'terre', damage: { min: 10, max: 15 }, target: 'enemy' }
//
// Durée par défaut : 3. Modifiable : { type: 'setEnutrof', state: 'terre', duration: 4 }
// États disponibles : 'air' | 'terre' | 'eau'  (combat.enutrof_air_active, etc.)

──────────────────────────────────────────────────────────────────────────────
COMBOS ÉLÉMENTAIRES HUPPERMAGE
──────────────────────────────────────────────────────────────────────────────
// Mécanique exclusive à l'Huppermage (caster.classId === 'huppermage').
// Chaque effet damage à élément (terre/feu/eau/air) mémorise l'élément sur l'ennemi frappé :
//   combat.huppermageLastElement[enemyIndex]   (0 en solo, 0-2 en raid)
// Si l'effet suivant frappe le MÊME ennemi avec un élément DIFFÉRENT → combo déclenché, état réinitialisé.
// Si l'ennemi change (mort, cible différente en raid) → pas de combo.
// Les lignes d'un même sort se combinent entre elles normalement :
//   sort [terre, feu]           → combo terre/feu déclenché, état vidé
//   sort [terre, feu] + état eau → combo eau/terre (ligne 1) + combo terre/feu (ligne 2), état vidé
//
// TABLE DES COMBOS :
//   terre + feu  → +15% sur le prochain sort reçu par l'ennemi (tout lanceur)    [one-shot]
//   terre + air  → 7% de chance que le prochain sort Huppermage fasse +50%        [one-shot]
//   terre + eau  → debuff ATK -50 sur l'ennemi (2 tours)
//   feu   + eau  → 7% de chance que le prochain sort ennemi fasse -50%            [one-shot]
//   feu   + air  → debuff SPD -15 sur l'ennemi (2 tours)
//   eau   + air  → prochain sort ennemi fait -15%                                 [one-shot]
//
// COMPTEUR DE COMBOS (depuis le début du combat) :
//   combat.huppermageComboCount   // s'incrémente à chaque combo déclenché
// Exemple d'utilisation dans un effet de sort :
//   const n = combat.huppermageComboCount
//   const dmgBase = n <= 3 ? 2 : n <= 6 ? 5 : 10
//
// LIRE l'état élémentaire depuis un effet de sort :
//   const slotIdx = combat?.isRaid ? combat.enemies.indexOf(targetEnemy) : 0
//   const elem = combat.huppermageLastElement[slotIdx]   // 'terre'|'feu'|'eau'|'air'|undefined
//
// ABSORBER l'élément stocké : le consommer ET s'en servir comme élément du coup.
// Ne laisse pas de nouvel état, ne déclenche pas de combo.
{ type: 'absorbElementDmg', damage: { min: 10, max: 15 }, target: 'enemy' }
// Avec fallback si aucun élément stocké (défaut : 'neutre')
{ type: 'absorbElementDmg', damage: { min: 10, max: 15 }, fallbackElement: 'feu', target: 'enemy' }

*/

// #region IOP ─────────────────────────────────────────────
move.pression = {
    id: 'pression',
    name: 'Pression',
    classId: 'iop',
    cooldownMs: 2000,
    effects: [
        {type: 'damage', element: 'terre', damage: {min: 16, max: 18}, target: 'enemy'},
        {type: 'buff', stat: 'erosionBonus', value: 10, duration: 4, target: 'self'}],
    spellProgression: [{lvl: 1,
                        patch: {}},
                       {lvl: 66,
                        patch: {damage: {min: 20, max: 23}, buff: {duration: 5}}},
                       {lvl: 132,
                        patch: {damage: {min: 26, max: 30}, buff: {duration: 6}}}],
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
        {type: 'debuff', stat: 'spd', value: 10, duration: 3, target: 'enemy'}],
    spellProgression: [{lvl: 12,
                        patch: {}},
                       {lvl: 68,
                        patch: {damage: {min: 22, max: 25}, buff: {value: 15, duration: 3}}},
                       {lvl: 134,
                        patch: {damage: {min: 28, max: 32}, buff: {value: 20, duration: 4}}}],
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
    cooldownMs: 1000,
    effects: [{type: 'buff', stat: 'spd', value: 20, duration: 3, target: 'self'}],
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
    cooldownMs: 2200,
    effects: [{type: 'buff', stat: 'maxHp', value: 100, duration: 3, target: 'self'}],
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
    cooldownMs: 2200,
    effects: [{type: 'buff', stat: 'atk', value: 100, duration: 4, target: 'self'}],
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
    effects: [{ type: 'damage', element: 'feu', damage: {min: 17, max: 19}, scalingMultipliers: [1.0, 1.2, 1.5], target: 'enemy_cycle'}],
    spellProgression: [{lvl: 53,
                        patch: {}},
                       {lvl: 112,
                        patch: {damage: {min: 22, max: 25}}},
                       {lvl: 179,
                        patch: {damage: {min: 27, max: 30}}}],
    description: "Tape de plus en plus fort à chaque lancés, revient a la normale au 4ème. En raid, frappe successivement l'ennemi principal, le sondaire et le tertiaire."
}
move.endurance = {
    id: 'endurance',
    name: 'Endurance',
    classId: 'iop',
    cooldownMs: 2500,
    effects: [
        {type: 'damage', element: 'eau', damage: {min: 22, max: 25}, target: 'enemy'},
        {type: 'shield', levelPct: 0.75, duration: 4, target: 'self'}],
    spellProgression: [{lvl: 57,
                        patch: {}},
                       {lvl: 117,  
                        patch: {damage: {min: 27, max: 30}}},
                       {lvl: 184,
                        patch: {damage: {min: 30, max: 34}}}],
    description: "Tape l'ennemi dans l'élément eau et applique un bouclier égal à 75% de son niveau pour 2 coups."
}
move.vertu = {
    id: 'vertu',
    name: 'Vertu',
    classId: 'iop',
    cooldownMs: 3000,
    effects: [{type: 'shield', levelPct: 3, duration: 3, target: 'self'}],
    spellProgression: [{lvl: 37,
                        patch: {}},
                       {lvl: 92,  
                        patch: {shield: { levelPct: 4 }}},
                       {lvl: 159,
                        patch: {shield: { levelPct: 5, duration: 4 }}}],
    description: "S'applique des bouclier afin de résister aux prochains coups reçus."
}
move.epee_de_iop = {
    id: 'epee_de_iop',
    name: 'Épée de iop',
    classId: 'iop',
    cooldownMs: 3500,
    effects: [{type: 'damage', element: 'terre', damage: {min: 27, max: 30}, target: 'all_enemies'}],
    spellProgression: [{lvl: 65,
                        patch: {}},
                       {lvl: 127,  
                        patch: {damage: {min: 33, max: 37}}},
                       {lvl: 194,
                        patch: {damage: {min: 37, max: 41}}}],
    description: "Inflige des dommages terre à tous les ennemis en raid."
}
move.friction = {
    id: 'friction',
    name: 'Friction',
    classId: 'iop',
    cooldownMs: 1800,
    effects: [{ type: 'renvoi', ratio: 0.5, target: 'self' }],
    spellProgression: [{lvl: 69,
                        patch: {}},
                       {lvl: 131,
                        patch: {renvoi: { ratio: 0.6 }}},
                       {lvl: 198,
                        patch: {renvoi: { ratio: 0.75 }}}],
    description: "Se frictionne avec les ennemis lors qu'il va se faire attaquer, ça à pour effet de renvoyer une partie des dommages subits."
}
move.epee_celeste = {
    id: 'epee_celeste',
    name: 'Épée Céleste',
    classId: 'iop',
    cooldownMs: 3100,
    effects: [{type: 'damage', element: 'air', damage: {min: 28, max: 31}, target: 'all_enemies'}],
    spellProgression: [{lvl: 73,
                        patch: {}},
                       {lvl: 137,  
                        patch: {damage: {min: 36, max: 40}}}],
    description: "Frappe tous les ennemis dans l'élément air."
}
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
// move.pugilat = {
//     id: 'pugilat',
//     name: 'Pugilat',
//     classId: 'iop',
//     cooldownMs: 2000,
//     effects: [
//         {type: 'damage', element: 'terre', damage: {min: 24, max: 28}, scalingMultipliers: [1.0, 1.2, 1.5], target: 'enemy_1'},
//         {type: 'damage', element: 'terre', damage: {min: 24, max: 28}, scalingMultipliers: [1.0, 1.2, 1.5], target: 'enemy_2', ratio: 0.5},
//         {type: 'damage', element: 'terre', damage: {min: 24, max: 28}, scalingMultipliers: [1.0, 1.2, 1.5], target: 'enemy_3', ratio: 0.5}
//     ],
//     description: "Tape de plus en plus fort à chaque lancés, revient a la normale au 4ème. En raid, frappe l'ennemi principal avec 100% des dommages et les ennemis secondaire et tertiaires avec 50%."
// }
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
// move.zenith = {
//     id: 'zenith',
//     name: 'Zénith',
//     classId: 'iop',
//     cooldownMs: 2000,
//     effects: [{type: 'damage', element: 'air', damage: {min: 12, max: 16}, slot1BonusPct: 300, target: 'enemy'}],
//     description: "Frappe l'ennemi dans l'élément air. Si le sort est en première position, inflige 300% de dommages supplémentaires."
// }
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
        {type: 'debuff', stat: 'atk', value: 30, duration: 3, target: 'enemy'}],
    spellProgression: [{lvl: 8,
                        patch: {}},
                       {lvl: 67,
                        patch: {damage: {min: 19, max: 22}, buff: {value: 70, duration: 4}}},
                       {lvl: 133,
                        patch: {damage: {min: 24, max: 28}, buff: {value: 150, duration: 5}}}],
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
    cooldownMs: 1500,
    effects: [
        {type: 'debuff', stat: 'spd', value: 20, duration: 4, target: 'enemy'},
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
    cooldownMs: 1500,
    effects: [{type: 'buff', stat: 'spd', value: 20, duration: 4, target: 'self'}],
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
        {type: 'buff', stat: 'atk',        value: 100, duration: 4, target: 'self'},
        {type: 'buff', stat: 'flatDamage', value: 10,  duration: 4, target: 'self'}],
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
    effects: [{type: 'debuff', stat: 'erosionBonus', value: 10, duration: 2, target: 'enemy'}],
    spellProgression: [{lvl: 61,
                        patch: {}},
                       {lvl: 122,
                        patch: {buff: { value: 15 }}},
                       {lvl: 189,
                        patch: {buff: { value: 20, duration: 3 }}}],
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
    effects: [{ type: 'damage', element: 'terre', damage: {min: 21, max: 23}, scalingMultipliers: [1.0, 1.2, 1.5], stayAtMax: true, target: 'enemy'}],
    spellProgression: [{lvl: 69,
                        patch: {}},
                       {lvl: 131,
                        patch: {damage: {min: 26, max: 28}}},
                       {lvl: 198,
                        patch: {damage: {min: 29, max: 31}}}],
    description: "Tape dans la terre. Les dégâts augmentent à chaque lancé (limite de 3)."
}
move.oeil_pour_oeil = {
    id: 'oeil_pour_oeil',
    name: 'Oeil pour oeil',
    classId: 'cra',
    cooldownMs: 2000,
    effects: [{ type: 'oeilPourOeil', ratio: 0.6, target: 'self' }],
    spellProgression: [{lvl: 73,
                        patch: {}},
                       {lvl: 137,
                        patch: {oeilPourOeil: { ratio: 0.75 }}}],
    description: "Pour chaque boost que l'ennemi s'applique, gagne une valeur équivalente."
}
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
// move.fleche_explosive = {
//     id: 'fleche_explosive',
//     name: 'Flèche Explosive',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{type: 'damage', element: 'feu', damage: {min: 24, max: 27}, target: 'all_enemies'}],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,
//                         patch: {damage: {min: 30, max: 34}}}],
//     description: "Inflige des dommages feu à tous les ennemis en raid."
// }
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
// move.balise_de_rappel = {
//     id: 'balise_de_rappel',
//     name: 'Balise de Rappel',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{type: 'buff', stat: 'pendingLifesteal', value: 1.2, duration: 2, target: 'self'}],
//     description: "Octroi un effet de vol de vie sur le prochain sort."
// }
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
// move.fleche_devorante = {
//     id: 'fleche_devorante',
//     name: 'Flèche Dévorante',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{type: 'damage', element: 'air', stackedDamage: [{min:1,max:3},{min:2,max:5},{min:4,max:9},{min:8,max:15},{min:13,max:20}], target: 'enemy'}],
//     description: "Augmente les dégats a chaque lancer (limite de 5)"
// }
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
// move.miroir_aux_alouettes = {
//     id: 'miroir_aux_alouettes',
//     name: 'Miroir aux Alouettes',
//     classId: 'cra',
//     cooldownMs: 2000,
//     effects: [{type: 'renvoi', ratio: 1.0, target: 'self'}],
//     description: "Renvoi le prochain dégat reçu."
// }
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
    cooldownMs: 2500,
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
    cooldownMs: 2500,
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
    restriction: 'coeur',
    cooldownMs: 2500,
    effects: [
        {type: 'damage', element: 'eau', damage: { min: 16, max: 18 }, target: 'enemy'},
        {type: 'lifesteal', ratio: 0.2, target: 'self'}],
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
    cooldownMs: 2500,
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
    effects: [{type: 'summon', summonId: 'lapino', duration: 2, target: 'self'}],
    spellProgression: [{lvl: 20,
                        patch: {}},
                       {lvl: 72,
                        patch: {summon: { summonId: 'lapino2' }}},
                       {lvl: 139,
                        patch: {summon: { summonId: 'lapino3' }}}],
    description: "Invoque un lapino qui va soigner le membre ayant le moins de vie."
}
move.mot_stimulant = {
    id: 'mot_stimulant',
    name: 'Mot Stimulant',
    classId: 'eniripsa',
    cooldownMs: 1000,
    effects: [{type: 'buff', stat: 'spd', value: 20, duration: 4, target: 'self'}],
    spellProgression: [{lvl: 24,
                        patch: {}},
                       {lvl: 77,  
                        patch: {buff: { value: 30 }}},
                       {lvl: 144,
                        patch: {buff: { value: 40 }}}],
    description: "Augmente la vitesse du lanceur pour les 3 prochains tours."
}
move.mot_de_frayeur = {
    id: 'mot_de_frayeur',
    name: 'Mot de Frayeur',
    classId: 'eniripsa',
    cooldownMs: 2000,
    effects: [{type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy'},
              {type: 'recul', target: 'enemy'}],
    spellProgression: [{lvl: 28,
                        patch: {}},
                       {lvl: 82,
                        patch: {buff: { value: 30 }}},
                       {lvl: 149,
                        patch: {buff: { value: 40 }}}],
    description: "Réduit la vitesse de l'ennemi pour 3 tours et pousse l'ennemi en raid."
}
move.lamentations = {
    id: 'lamentations',
    name: 'Lamentations',
    classId: 'eniripsa',
    restriction: 'coeur',
    cooldownMs: 3500,
    effects: [
        {type: 'damage', element: 'eau', damage: { min: 18, max: 20 }, target: 'enemy'},
        {type: 'lifesteal', ratio: 0.5, target: 'self'}],
    spellProgression: [{lvl: 33,
                        patch: {}},
                       {lvl: 87,  
                        patch: {damage: { min: 23, max: 26 }}},
                       {lvl: 154,
                        patch: {damage: { min: 29, max: 32 }}}],
    description: "Frappe l'ennemi dans l'élément eau et se soigne de la moitié des dommages infligés."
}
move.mot_turbulent = {
    id: 'mot_turbulent',
    name: 'Mot Turbulent',
    classId: 'eniripsa',
    cooldownMs: 3000,
    effects: [{type: 'damage', element: 'feu', damage: {min: 23,max: 26}, target: 'enemy'},
              { type: 'heal', heal: {min: 23,max: 26}, target: 'ally_min_hp' }],
    spellProgression: [{lvl: 37,
                        patch: {}},
                       {lvl: 92,  
                        patch: {damage: {min: 29,max: 33}, heal: {min: 29,max: 33}}},
                       {lvl: 159,
                        patch: {damage: {min: 36,max: 41}, heal: {min: 36,max: 41}}}],
    description: "Frappe l'ennemi dans l'élément feu et soigne l'allier ayant le moins de PV."
}
move.mot_vivifiant = {
    id: 'mot_vivifiant',
    name: 'Mot Vivifiant',
    classId: 'eniripsa',
    cooldownMs: 2000,
    effects: [{type: 'summon', summonId: 'fee_vivifiante', duration: 2, target: 'self'}],
    spellProgression: [{lvl: 41,
                        patch: {}},
                       {lvl: 97,
                        patch: {summon: { summonId: 'fee_vivifiante_tier_2' }}},
                       {lvl: 164,
                        patch: {summon: { summonId: 'fee_vivifiante_tier_3' }}}],
    description: "Invoque une fée qui temporise et lorsqu'elle meurt, buff la vitesse d'un allier aléatoire."
}
move.mot_farceur = {
    id: 'mot_farceur',
    name: 'Mot Farceur',
    classId: 'eniripsa',
    cooldownMs: 2500,
    effects: [{type: 'damage', element: 'air', damage: {min: 15,max: 17}, target: 'enemy'},
              { type: 'heal', heal: {min: 15,max: 17}, target: 'ally_random' },
              {type: 'avance', target: 'enemy'}],
    spellProgression: [{lvl: 45,
                        patch: {}},
                       {lvl: 102,
                        patch: {damage: {min: 18,max: 20}, heal: {min: 18,max: 20}}},
                       {lvl: 169,
                        patch: {damage: {min: 22,max: 24}, heal: {min: 22,max: 24}}}],
    description: "Frappe l'enemis dans l'élément air, soigne un allier aléatoire et attire l'ennemi en raid."
}
move.peinture_de_guerre = {
    id: 'peinture_de_guerre',
    name: 'Peinture de Guerre',
    classId: 'eniripsa',
    cooldownMs: 1800,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 6,max: 7}, target: 'enemy'},
              { type: 'heal', heal: {min: 6,max: 7}, target: 'ally_random' }],
    spellProgression: [{lvl: 49,
                        patch: {}},
                       {lvl: 107,  
                        patch: {damage: {min: 7,max: 9},heal:{min: 7,max: 9}}},
                       {lvl: 174,
                        patch: {damage: {min: 9,max: 11},heal:{min: 9,max: 11}}}],
    description: "Frappe dans l'élément terre et soigne un allier aléatoire."
}
move.mot_de_jouvence = {
    id: 'mot_de_jouvence',
    name: 'Mot de Jouvence',
    classId: 'eniripsa',
    cooldownMs: 2000,
    effects: [{type: 'summon', summonId: 'fee_de_jouvence', duration: 2, target: 'self'}],
    spellProgression: [{lvl: 53,
                        patch: {}},
                       {lvl: 112,
                        patch: {summon: { summonId: 'fee_de_jouvence_tier_2' }}},
                       {lvl: 179,
                        patch: {summon: { summonId: 'fee_de_jouvence_tier_3' }}}],
    description: "Invoque une fée qui temporise et lorsqu'elle meurt, soigne l'ensemble des alliers encore en vie."
}
move.cri_de_guerre = {
    id: 'cri_de_guerre',
    name: 'Cri de Guerre',
    classId: 'eniripsa',
    cooldownMs: 3000,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 23,max: 26}, target: 'enemy'}],
    spellProgression: [{lvl: 57,
                        patch: {}},
                       {lvl: 117,  
                        patch: {damage: {min: 31,max: 35}}},
                       {lvl: 184,
                        patch: {damage: {min: 37,max: 41}}}],
    description: "Frappe dans l'élément terre."
}
move.mot_interdit = {
    id: 'mot_interdit',
    name: 'Mot Interdit',
    classId: 'eniripsa',
    cooldownMs: 3500,
    effects: [{ type: 'damage', element: 'eau', damage: {min: 30,max: 33}, target: 'enemy'}],
    spellProgression: [{lvl: 61,
                        patch: {}},
                       {lvl: 122,  
                        patch: {damage: {min: 40,max: 44}}},
                       {lvl: 189,
                        patch: {damage: {min: 46,max: 50}}}],
    description: "Frappe dans l'élément eau."
}
move.mot_accablant = {
    id: 'mot_accablant',
    name: 'Mot Accablant',
    classId: 'eniripsa',
    cooldownMs: 2000,
    effects: [{type: 'summon', summonId: 'fee_accablante', duration: 2, target: 'self'}],
    spellProgression: [{lvl: 65,
                        patch: {}},
                       {lvl: 127,  
                        patch: {summonId: 'fee_accablante_tier_2'}},
                       {lvl: 194,
                        patch: {summonId: 'fee_accablante_tier_3'}}],
    description: "Invoque une fée qui temporise et lorsqu'elle meurt, debuff la vitesse de l'ennemi."
}
move.chapardage = {
    id: 'chapardage',
    name: 'Chapardage',
    classId: 'eniripsa',
    restriction: 'coeur',
    cooldownMs: 3000,
    effects: [
        {type: 'damage', element: 'feu', damage: { min: 15, max: 17 }, target: 'enemy'},
        {type: 'lifesteal', ratio: 0.5, target: 'self'}],
    spellProgression: [{lvl: 69,
                        patch: {}},
                       {lvl: 131,  
                        patch: {damage: { min: 18, max: 20 }}},
                       {lvl: 198,
                        patch: {damage: { min: 20, max: 22 }}}],
    description: "Frappe l'ennemi dans l'élément feu et se soigne de la moitié des dommages infligés."
}
move.mot_fleuri = {
    id: 'mot_fleuri',
    name: 'Mot Fleuri',
    classId: 'eniripsa',
    cooldownMs: 2700,
    effects: [
        {type: 'damage', element: 'air', damage: { min: 26, max: 29 }, target: 'enemy'},
        { type: 'hot', heal: { min: 26, max: 29 }, duration : 2, target: 'ally_random' }],
    spellProgression: [{lvl: 73,
                        patch: {}},
                       {lvl: 137,  
                        patch: {damage: { min: 33, max: 37 }, heal: { min: 33, max: 37 }}}],
    description: "Frappe l'ennemi dans l'élément air et soigne un allier aléatoire pendant 2 tours."
}
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
// move.mot_distrayant = {
//     id: 'mot_distrayant',
//     name: 'Mot Distrayant',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [
//         {type: 'damage', element: 'feu', damage: {min: 22, max: 26}, target: 'enemy'},
//         {type: 'heal_adjacent%maxHp', heal: 5, target: 'self'}
//     ],
//     description: "Frappe dans l'élément feu et soigne les alliés adjacents de 5% HP max."
// }
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
// move.fontaine_de_jouvence = {
//     id: 'fontaine_de_jouvence',
//     name: 'Fontaine de Jouvence',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [{type: 'buff', stat: 'healOnCast', value: 0.1, duration: 4, target: 'self'}],
//     description: "Soigne aléatoirement un allié de 10% HP max à chaque sort lancé (3 sorts)."
// }
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
// move.mot_de_solidarité = {
//     id: 'mot_de_solidarité',
//     name: 'Mot de Solidarité',
//     classId: 'eniripsa',
//     cooldownMs: 2000,
//     effects: [{type: 'buff_team', stat: 'spd', value: 100, duration: 4}],
//     description: "Double l'initiative de tous les membres de l'équipe pendant 3 tours."
// }
// #endregion

// #region ENUTROF ─────────────────────────────────────────
move.lancer_de_pieces = {
    id: 'lancer_de_pieces',
    name: 'Lancer de Pièces',
    classId: 'enutrof',
    cooldownMs: 1300,
    effects: [{ type: 'damage', element: 'eau', damage: { min: 7, max: 9 }, target: 'enemy' }],
    spellProgression: [{lvl: 1,
                        patch: {}},
                       {lvl: 66,
                        patch: {damage: { min: 10, max: 12 }}},
                       {lvl: 132,
                        patch: {damage: { min: 13, max: 15 }}}],
    description: "Frappe rapidement l'ennemi dans l'élément eau."
}
move.roulage_de_pelle = {
    id: 'roulage_de_pelle',
    name: 'Roulage de Pelle',
    classId: 'enutrof',
    cooldownMs: 1900,
    effects: [{ type: 'damage', element: 'feu', damage: { min: 11, max: 13 }, target: 'enemy' }],
    spellProgression: [{lvl: 8,
                        patch: {}},
                       {lvl: 67,
                        patch: {damage: { min: 15, max: 18 }}},
                       {lvl: 133,
                        patch: {damage: { min: 19, max: 23 }}}],
    description: "Frappe l'ennemi dans l'élément feu."
}
move.force_de_l_age = {
    id: 'force_de_l_age',
    name: "Force de l'Âge",
    classId: 'enutrof',
    cooldownMs: 3000,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 10, max: 20 }, target: 'enemy' },
              { type: 'buff', stat: 'spd', value: 20, duration: 3, target: 'self' }],
    spellProgression: [{ lvl: 12,
                         patch: {} },
                       {lvl: 69,
                        patch: {damage: { min: 22, max: 25 }}},
                       {lvl: 136,
                        patch: {damage: { min: 28, max: 32 }}}],
    description: "Frappe l'ennemi dans l'élément terre et augmente sa propre vitesse de 20%."
}
move.opportunite = {
    id: 'opportunite',
    name: 'Opportunité',
    classId: 'enutrof',
    cooldownMs: 1800,
    effects: [{ type: 'damage', element: 'air', damage: { min: 8, max: 10 }, target: 'enemy' },
              { type: 'buff', stat: 'atk', value: 30, duration: 2, target: 'self' }],
    spellProgression: [{lvl: 16,
                        patch: {}},
                       {lvl: 68,
                        patch: {damage: { min: 11, max: 13 }, buff: {value: 50 }}},
                       {lvl: 134,
                        patch: {damage: { min: 14, max: 16 }, buff: {value: 100 }}}],
    description: "Frappe l'ennemi dans l'élément air et augmente légèrement sa puissance."
}
move.sac_anime = {
    id: 'sac_anime',
    name: 'Sac Animé',
    classId: 'enutrof',
    cooldownMs: 3500,
    effects: [{ type: 'summon', summonId: 'sac_anime', duration: 8, target: 'self' }],
    spellProgression: [{lvl: 20,
                        patch: {}},
                       {lvl: 72,
                        patch: { summon: { summonId: 'sac_anime2' } }},
                       {lvl: 139,
                        patch: { summon: { summonId: 'sac_anime3' } }}],
    description: "Invoque un sac animé qui permet de prendre les prochains dégats infligés à la place de l'équipe."
}
move.ruee_vers_l_or = {
    id: 'ruee_vers_l_or',
    name: "Ruée vers l'Or",
    classId: 'enutrof',
    cooldownMs: 2000,
    effects: [{ type: 'buff', stat: 'atk', value: 100, duration: 2, target: 'self' },
              { type: 'buff', stat: 'spd', value: 20,  duration: 2, delay: 2, target: 'self' }],
    spellProgression: [{lvl: 24,
                        patch: {}},
                       {lvl: 77,
                        patch: { buff: [{ stat: 'atk', value: 200 }, { stat: 'spd', value: 25 }] }},
                       {lvl: 144,
                        patch: { buff: [{ stat: 'atk', value: 350, duration: 3 }, { stat: 'spd', value: 30 }] }}],
    description: "Augmente la puissance d'attaque dans un premier temps puis la vitesse du lanceur pour plusieurs tours."
}
move.boite_de_pandore = {
    id: 'boite_de_pandore',
    name: 'Boîte de Pandore',
    classId: 'enutrof',
    cooldownMs: 5000,
    effects: [{ type: 'heal%maxHp', heal: 10, target: 'self' }],
    spellProgression: [{lvl: 28,
                        patch: {}},
                       {lvl: 82,
                        patch: { cooldownMs: 4500 }},
                       {lvl: 149,
                        patch: { cooldownMs: 3500 }}],
    description: "Une boite que l'on ouvre que pour se soigner en urgence."
}
move.remblai = {
    id: 'remblai',
    name: 'Remblai',
    classId: 'enutrof',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 12, max: 14 }, target: 'enemy', summonMultiplier: 1.2 }],
    spellProgression: [{lvl: 33,
                        patch: {}},
                       {lvl: 87,
                        patch: {damage: { min: 16, max: 18 }, summonMultiplier: 1.4}},
                       {lvl: 154,
                        patch: {damage: { min: 20, max: 22 }, summonMultiplier: 1.7}}],
    description: "Tape l'ennemi dans l'élément terre. Les dégâts sont multipliés sur les invocations."
}
move.clef_du_tresor = {
    id: 'clef_du_tresor',
    name: 'Clef du Trésor',
    classId: 'enutrof',
    cooldownMs: 2000,
    effects: [{ type: 'esquive', chancePct: 35, reductionPct: 100, duration: 3, target: 'self' }],
    spellProgression: [{lvl: 37,
                        patch: {}},
                       {lvl: 92,
                        patch: { esquive: { chancePct: 40 } }},
                       {lvl: 159,
                        patch: { esquive: { chancePct: 45 } }}],
    description: "Augmente les chances d'esquiver les prochains coups."
}
move.abattement = {
    id: 'abattement',
    name: 'Abattement',
    classId: 'enutrof',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'air', damage: { min: 14, max: 16 }, target: 'enemy' },
              { type: 'debuff', stat: 'spd', value: 10, duration: 7, target: 'enemy' }],
    spellProgression: [{lvl: 41,
                        patch: {}},
                       {lvl: 97,
                        patch: {damage: { min: 18, max: 20 }}},
                       {lvl: 164,
                        patch: {damage: { min: 23, max: 25 }}}],
    description: "Frappe dans l'élément air et retire 10% de vitesse à l'ennemi."
}
move.pelle_animee = {
    id: 'pelle_animee',
    name: 'Pelle Animée',
    classId: 'enutrof',
    cooldownMs: 2000,
    effects: [{type: 'summon', summonId: 'pelle_animee', duration: 3, target: 'self'}],
    spellProgression: [{lvl: 45,
                        patch: {}},
                       {lvl: 102,
                        patch: { summon: { summonId: 'pelle_animee2' } }},
                       {lvl: 169,
                        patch: { summon: { summonId: 'pelle_animee3' } }}],
    description: "Invoque une pelle animée qui pousse les ennemis et encaisse les dommages infligés à l'équipe."
}
move.avarice = {
    id: 'avarice',
    name: 'Avarice',
    classId: 'enutrof',
    cooldownMs: 2000,
    effects: [{ type: 'debuff', stat: 'atk', value: 100, duration: 2, target: 'enemy' },
              { type: 'debuff', stat: 'spd', value: 20,  duration: 2, delay: 2, target: 'enemy' }],
    spellProgression: [{lvl: 49,
                        patch: {}},
                       {lvl: 107,
                        patch: { debuff: [{ stat: 'atk', value: 200 }, { stat: 'spd', value: 25 }] }},
                       {lvl: 174,
                        patch: { debuff: [{ stat: 'atk', value: 350 }, { stat: 'spd', value: 30 }] }}],
    description: "Réduit la puissance d'attaque dans un premier temps puis la vitesse de l'ennemi pour plusieurs tours."
}
move.pelle_aurifere = {
    id: 'pelle_aurifere',
    name: 'Pelle Aurifère',
    classId: 'enutrof',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'eau', damage: { min: 21, max: 23 }, target: 'enemy' },
              { type: 'debuff', stat: 'atk', value: 50, duration: 7, target: 'enemy' }],
    spellProgression: [{lvl: 53,
                        patch: {}},
                       {lvl: 112,
                        patch: {damage: { min: 27, max: 31 }}},
                       {lvl: 179,
                        patch: {damage: { min: 33, max: 37 }}}],
    description: "Frappe dans l'élément eau et retire 50 de puissance à l'ennemi."
}
move.maladresse = {
    id: 'maladresse',
    name: 'Maladresse',
    classId: 'enutrof',
    cooldownMs: 2000,
    effects: [{ type: 'debuff', stat: 'spd', value: 50, duration: 3, target: 'enemy' }],
    spellProgression: [{lvl: 57,
                        patch: {}},
                       {lvl: 117,
                        patch: { debuff: { stat: 'spd', value: 60 }}},
                       {lvl: 184,
                        patch: { debuff: { stat: 'spd', value: 70 }}}],
    description: "Réduit drastiquement la vitesse d'un ennemi pour 2 tours."
}
move.pelle_fantomatique = {
    id: 'pelle_fantomatique',
    name: 'Pelle Fantomatique',
    classId: 'enutrof',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'feu', damage: { min: 17, max: 19 }, target: 'enemy' },
              { type: 'buffDrain', value: 1, target: 'enemy' }],
    spellProgression: [{lvl: 61,
                        patch: {}},
                       {lvl: 122,
                        patch: { damage: { min: 23, max: 25 }}},
                       {lvl: 189,
                        patch: { damage: { min: 26, max: 28 }, buffDrain: { value: 2 } }}],
    description: "Frappe dans l'élément feu et réduit la durée des buffs ennemis."
}
move.banqueroute = {
    id: 'banqueroute',
    name: 'Banqueroute',
    classId: 'enutrof',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'air', damage: { min: 26, max: 29 }, target: 'enemy', summonMultiplier: 1.2 }],
    spellProgression: [{lvl: 65,
                        patch: {}},
                       {lvl: 127,
                        patch: {damage: { min: 32, max: 36 }, summonMultiplier: 1.4}},
                       {lvl: 194,
                        patch: {damage: { min: 32, max: 36 }, summonMultiplier: 1.7}}],
    description: "Tape l'ennemi dans l'élément air. Les dégâts sont multipliés sur les invocations."
}
move.souterrain = {
    id: 'souterrain',
    name: 'Souterrain',
    classId: 'enutrof',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 19, max: 22 }, target: 'enemy'},
              {type: 'recul', target: 'enemy'}],
    spellProgression: [{lvl: 69,
                        patch: {}},
                       {lvl: 131,
                        patch: {damage: { min: 23, max: 26 }}},
                       {lvl: 198,
                        patch: {damage: { min: 26, max: 29 }}}],
    description: "Frappe dans l'élément terre et fait reculer l'ennemi de 1 en raid."
}
move.pelle_des_anciens = {
    id: 'pelle_des_anciens',
    name: 'Pelle des Anciens',
    classId: 'enutrof',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'eau', damage: { min: 31, max: 34 }, target: 'enemy'},
              { type: 'recul', target: 'enemy'},
              { type: 'debuff', stat: 'atk', value: 10, duration: 3, target: 'enemy' }],
    spellProgression: [{lvl: 73,
                        patch: {}},
                       {lvl: 137,
                        patch: {damage: { min: 40, max: 44 }}}],
    description: "Frappe dans l'élément eau, fait reculer l'ennemi de 1 place et réduit sa vitesse de 10% pour 2 tours."
}
// move.peremption = {
//     id: 'peremption',
//     name: 'Péremption',
//     classId: 'enutrof',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,
//                         patch: {}}],
//     description: ""
// }
// move.corruption = {
//     id: 'corruption',
//     name: 'Corruption',
//     classId: 'enutrof',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,
//                         patch: {}}],
//     description: ""
// }
// move.retraite_anticipee = {
//     id: 'retraite_anticipee',
//     name: 'Retraite Anticipée',
//     classId: 'enutrof',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,
//                         patch: {}}],
//     description: ""
// }
// move.coffre_anime = {
//     id: 'coffre_anime',
//     name: 'Coffre Animé',
//     classId: 'enutrof',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,
//                         patch: {}}],
//     description: ""
// }
// move.eboulement = {
//     id: 'eboulement',
//     name: 'Éboulement',
//     classId: 'enutrof',
//     cooldownMs: 2000,
//     effects: [{ type: 'damage', element: 'terre', damage: { min: 14, max: 16 }, target: 'enemy' },
//               { type: 'enutrof_trap', id: 'eboulement', duration: 3,
//                 trigger: { type: 'buff', stat: 'atk' }, element: 'terre', damage: { min: 10, max: 14 }, target: 'enemy' }],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,
//                         patch: {damage: { min: 18, max: 21 }}}],
//     description: "Frappe dans l'élément terre. Pose Éboulement (3 actions alliées) : tout buff de puissance sur un allié déclenche automatiquement des dégâts terre bonus."
// }
// move.monnaie_sonnante = {
//     id: 'monnaie_sonnante',
//     name: 'Monnaie Sonnante',
//     classId: 'enutrof',
//     cooldownMs: 2000,
//     effects: [{ type: 'damage', element: 'air', damage: { min: 14, max: 16 }, target: 'enemy' },
//               { type: 'enutrof_trap', id: 'monnaie_sonnante', duration: 3,
//                 trigger: { type: 'debuff', stat: 'spd' }, element: 'air', damage: { min: 10, max: 15 }, target: 'enemy' }],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,
//                         patch: {damage: { min: 18, max: 21 }}}],
//     description: "Frappe dans l'élément air. Pose Monnaie Sonnante (3 actions alliées) : tout débuff de vitesse sur l'ennemi déclenche automatiquement des dégâts air bonus."
// }
// move.orpaillage = {
//     id: 'orpaillage',
//     name: 'Orpaillage',
//     classId: 'enutrof',
//     cooldownMs: 2000,
//     effects: [{ type: 'damage', element: 'eau', damage: { min: 14, max: 16 }, target: 'enemy' },
//               { type: 'enutrof_trap', id: 'orpaillage', duration: 3,
//                 trigger: { type: 'debuff', stat: 'atk' }, element: 'eau', damage: { min: 10, max: 14 }, target: 'enemy' }],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,
//                         patch: {damage: { min: 18, max: 21 }}}],
//     description: "Frappe dans l'élément eau. Pose Orpaillage (3 actions alliées) : tout débuff de puissance sur l'ennemi déclenche automatiquement des dégâts eau bonus."
// }
// move.coup_de_grisou = {
//     id: 'coup_de_grisou',
//     name: 'Coup de Grisou',
//     classId: 'enutrof',
//     cooldownMs: 2000,
//     effects: [{ type: 'damage', element: 'feu', damage: { min: 14, max: 16 }, target: 'enemy' },
//               { type: 'enutrof_trap', id: 'coup_de_grisou', duration: 3,
//                 trigger: { type: 'heal' }, element: 'feu', damage: { min: 10, max: 14 }, target: 'enemy' }],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,
//                         patch: {damage: { min: 18, max: 21 }}}],
//     description: "Frappe dans l'élément feu. Pose Coup de Grisou (3 actions alliées) : tout soin reçu par un allié déclenche automatiquement des dégâts feu bonus."
// }
// move.musette_animee = {
//     id: 'musette_animee',
//     name: 'Musette Animée',
//     classId: 'enutrof',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,
//                         patch: {}}],
//     description: ""
// }
// move.deambulation = {
//     id: 'deambulation',
//     name: 'Déambulation',
//     classId: 'enutrof',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,
//                         patch: {}}],
//     description: ""
// }
// move.boite_a_outils = {
//     id: 'boite_a_outils',
//     name: 'Boîte à Outils',
//     classId: 'enutrof',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,
//                         patch: {}}],
//     description: ""
// }
// move.feu_de_mine = {
//     id: 'feu_de_mine',
//     name: 'Feu de Mine',
//     classId: 'enutrof',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,
//                         patch: {}}],
//     description: ""
// }
// move.clef_de_bras = {
//     id: 'clef_de_bras',
//     name: 'Clef de Bras',
//     classId: 'enutrof',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.obsolescence = {
//     id: 'obsolescence',
//     name: 'Obsolescence',
//     classId: 'enutrof',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.beche_animee = {
//     id: 'beche_animee',
//     name: 'Bêche Animée',
//     classId: 'enutrof',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.decadence = {
//     id: 'decadence',
//     name: 'Décadence',
//     classId: 'enutrof',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.tourbiere = {
//     id: 'tourbiere',
//     name: 'Tourbière',
//     classId: 'enutrof',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.age_d_or = {
//     id: 'age_d_or',
//     name: "Âge d'Or",
//     classId: 'enutrof',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.dernier_recours = {
//     id: 'dernier_recours',
//     name: 'Dernier Recours',
//     classId: 'enutrof',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.lancer_de_pelle = {
//     id: 'lancer_de_pelle',
//     name: 'Lancer de Pelle',
//     classId: 'enutrof',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.beche_des_anciens = {
//     id: 'beche_des_anciens',
//     name: 'Bêche des Anciens',
//     classId: 'enutrof',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.gisement = {
//     id: 'gisement',
//     name: 'Gisement',
//     classId: 'enutrof',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.tamisage = {
//     id: 'tamisage',
//     name: 'Tamisage',
//     classId: 'enutrof',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.tunnel_de_fortune = {
//     id: 'tunnel_de_fortune',
//     name: 'Tunnel de Fortune',
//     classId: 'enutrof',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.pelle_de_fortune = {
//     id: 'pelle_de_fortune',
//     name: 'Pelle de Fortune',
//     classId: 'enutrof',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.malle_animee = {
//     id: 'malle_animee',
//     name: 'Malle Animée',
//     classId: 'enutrof',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// #endregion

// #region HUPPERMAGE ─────────────────────────────────────────
move['lance-flamme'] = {
    id: 'lance-flamme',
    name: 'Lance-flamme',
    classId: 'huppermage',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'feu', damage: { min: 15, max: 17 }, target: 'enemy' }],
    spellProgression: [{lvl: 1,
                        patch: {}},
                       {lvl: 66,
                        patch: {damage: { min: 20, max: 23 }}},
                       {lvl: 132,
                        patch: {damage: { min: 26, max: 29 }}}],
    description: "Frappe dans l'élément feu et pose l'élément feu."
}
move.stalagmite = {
    id: 'stalagmite',
    name: 'Stalagmite',
    classId: 'huppermage',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'eau', damage: { min: 17, max: 19 }, target: 'enemy' }],
    spellProgression: [{lvl: 8,
                        patch: {}},
                       {lvl: 67,
                        patch: {damage: { min: 23, max: 25 }}},
                       {lvl: 133,
                        patch: {damage: { min: 29, max: 32 }}}],
    description: "Frappe dans l'élément eau et pose l'élément eau."
}
move.onde_sismique = {
    id: 'onde_sismique',
    name: 'Onde Sismique',
    classId: 'huppermage',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 15, max: 17 }, target: 'enemy' }],
    spellProgression: [{ lvl: 12,
                         patch: {} },
                       {lvl: 69,
                        patch: {damage: { min: 20, max: 22 }}},
                       {lvl: 136,
                        patch: {damage: { min: 25, max: 28 }}}],
    description: "Frappe dans l'élément terre et pose l'élément terre."
}
move.ether = {
    id: 'ether',
    name: 'Éther',
    classId: 'huppermage',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'air', damage: { min: 10, max: 20 }, target: 'enemy' }],
    spellProgression: [{lvl: 16,
                        patch: {}},
                       {lvl: 68,
                        patch: {damage: { min: 20, max: 22 }}},
                       {lvl: 134,
                        patch: {damage: { min: 25, max: 28 }}}],
    description: "Frappe dans l'élément air et pose l'élément air."
}
move.runification = {
    id: 'runification',
    name: 'Runification',
    classId: 'huppermage',
    cooldownMs: 2000,
    effects: [{ type: 'absorbElementDmg', damage: 9, target: 'enemy' },
              { type: 'lifesteal', ratio: 0.2, target: 'self' }],
    spellProgression: [{lvl: 20,
                        patch: {}},
                       {lvl: 72,
                        patch: {damage: 12}},
                       {lvl: 139,
                        patch: {damage: 15}}],
    description: "Frappe dans l'élément posé sur l'ennemi et le consomme pour se régénérer."
}
move.drain_elementaire = {
    id: 'drain_elementaire',
    name: 'Drain Élémentaire',
    classId: 'huppermage',
    cooldownMs: 3000,
    effects: [{ type: 'absorbElementDmg', damage: { min: 15, max: 17 }, target: 'enemy' },
              { type: 'buff', stat: 'atk', value: 60, duration: 2, target: 'self' },
              { type: 'debuff', stat: 'atk', value: 30, duration: 2, target: 'enemy' }],
    spellProgression: [{lvl: 24,
                        patch: {}},
                       {lvl: 77,
                        patch: {damage: { min: 21, max: 23 }, buff: {value: 120 }, debuff: {value: 60 }}},
                       {lvl: 144,
                        patch: {damage: { min: 26, max: 29 }, buff: {value: 200 }, debuff: {value: 120 }}}],
    description: "Frappe dans l'élément posé sur l'ennemi et le consomme. Vole de la puissance à l'ennemi pour se l'appliquer pour 1 tours."
}
move.meteore = {
    id: 'meteore',
    name: 'Météore',
    classId: 'huppermage',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 17, max: 19 }, target: 'enemy' },
              {type: 'recul', target: 'enemy'}],
    spellProgression: [{lvl: 28,
                        patch: {}},
                       {lvl: 82,
                        patch: {damage: { min: 22, max: 24 }}},
                       {lvl: 149,
                        patch: {damage: { min: 27, max: 30 }}}],
    description: "Frappe dans l'élément terre et recule de position l'ennemi."
}
move.lame_astrale = {
    id: 'lame_astrale',
    name: 'Lame Astrale',
    classId: 'huppermage',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'air', damage: { min: 18, max: 20 }, target: 'enemy' },
        {type: 'avance', target: 'enemy'}],
    spellProgression: [{lvl: 33,
                        patch: {}},
                       {lvl: 87,
                        patch: {damage: { min: 23, max: 26 }}},
                       {lvl: 154,
                        patch: {damage: { min: 29, max: 32 }}}],
    description: "Frappe dans l'élément air et avance de position l'ennemi."
}
move.cycle_elementaire = {
    id: 'cycle_elementaire',
    name: 'Cycle Élémentaire',
    classId: 'huppermage',
    cooldownMs: 2000,
    effects: [{ type: 'cycleElement', target: 'enemy' }],
    spellProgression: [{lvl: 37,
                        patch: {}},
                       {lvl: 92,
                        patch: {cooldownMs: 1300}},
                       {lvl: 159,
                        patch: {cooldownMs: 800}}],
    description: "Transforme l'élément posé sur l'ennemi : Terre → Eau → Feu → Air → Terre."
}
move.lance_solaire = {
    id: 'lance_solaire',
    name: 'Lance Solaire',
    classId: 'huppermage',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'feu', damage: { min: 18, max: 20 }, target: 'enemy' },
              { type: 'switch', value: 2, target: 'enemy' }],
    spellProgression: [{lvl: 41,
                        patch: {}},
                       {lvl: 97,
                        patch: {damage: { min: 23, max: 26 }}},
                       {lvl: 164,
                        patch: {damage: { min: 29, max: 32 }}}],
    description: "Frappe dans l'élément feu et switch les ennemis de postion."
}
move.deluge = {
    id: 'deluge',
    name: 'Déluge',
    classId: 'huppermage',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'eau', damage: { min: 17, max: 19 }, target: 'enemy' },
              { type: 'switch', value: 1, target: 'enemy' }],
    spellProgression: [{lvl: 45,
                        patch: {}},
                       {lvl: 102,
                        patch: {damage: { min: 22, max: 24 }}},
                       {lvl: 169,
                        patch: {damage: { min: 27, max: 30 }}}],
    description: "Frappe dans l'élément eau et switch les ennemis de postion."
}
move.traversee = {
    id: 'traversee',
    name: 'Traversée',
    classId: 'huppermage',
    cooldownMs: 2000,
    effects: [{ type: 'absorbElementDmg', damage: { min: 19, max: 21 }, fallbackElement: 'neutre', advanceCycle: 'A', target: 'enemy' }],
    spellProgression: [{lvl: 49,
                        patch: {}},
                       {lvl: 107,
                        patch: {damage: { min: 24, max: 27 }}},
                       {lvl: 174,
                        patch: {damage: { min: 30, max: 33 }}}],
    description: "Frappe dans l'élément actif sur l'ennemi, puis pose l'élément suivant (Terre→Eau→Feu→Air→Terre)."
}
move.contribution = {
    id: 'contribution',
    name: 'Contribution',
    classId: 'huppermage',
    cooldownMs: 3000,
    effects: [{
        type: 'consumeElementBuff',
        target: 'self',
        onElement: {
            terre: { stat: 'spd',        value: 10, duration: 3 },
            feu:   { shield: true, levelPct: 2,      duration: 3 },
            eau:   { stat: 'atk',        value: 100, duration: 3 },
            air:   { stat: 'flatDamage', value: 30,  duration: 3 },
        }
    }],
    spellProgression: [{lvl: 53,
                        patch: {}},
                       {lvl: 112,
                        patch: {cooldownMs: 2800}},
                       {lvl: 179,
                        patch: {cooldownMs: 2500}}],
    description: "Consomme l'élément posé et applique un buff en fonction de l'élément consommé."
}
move.trait_ardent = {
    id: 'trait_ardent',
    name: 'Trait Ardent',
    classId: 'huppermage',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'feu', damage: { min: 21, max: 23 }, target: 'enemy' }],
    spellProgression: [{lvl: 57,
                        patch: {}},
                       {lvl: 117,
                        patch: {damage: { min: 28, max: 31 }}},
                       {lvl: 184,
                        patch: {damage: { min: 33, max: 37 }}}],
    description: "Frappe dans l'élément feu et pose l'élément feu."
}
move.glacier = {
    id: 'glacier',
    name: 'Glacier',
    classId: 'huppermage',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'eau', damage: { min: 21, max: 24 }, target: 'enemy' }],
    spellProgression: [{lvl: 61,
                        patch: {}},
                       {lvl: 122,
                        patch: {damage: { min: 28, max: 32 }}},
                       {lvl: 189,
                        patch: {damage: { min: 32, max: 36 }}}],
    description: "Frappe dans l'élément eau et pose l'élément eau."
}
move.rafale = {
    id: 'rafale',
    name: 'Rafale',
    classId: 'huppermage',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'air', damage: { min: 21, max: 24 }, target: 'enemy' }],
    spellProgression: [{lvl: 65,
                        patch: {}},
                       {lvl: 127,
                        patch: {damage: { min: 26, max: 30 }}},
                       {lvl: 194,
                        patch: {damage: { min: 29, max: 33 }}}],
    description: "Frappe dans l'élément air et pose l'élément air."
}
move.orage = {
    id: 'orage',
    name: 'Orage',
    classId: 'huppermage',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 24, max: 27 }, target: 'enemy' }],
    spellProgression: [{lvl: 69,
                        patch: {}},
                       {lvl: 131,
                        patch: {damage: { min: 29, max: 32 }}},
                       {lvl: 198,
                        patch: {damage: { min: 32, max: 36 }}}],
    description: "Frappe dans l'élément terre et pose l'élément terre."
}
move.bouclier_elementaire = {
    id: 'bouclier_elementaire',
    name: 'Bouclier Élémentaire',
    classId: 'huppermage',
    cooldownMs: 2000,
    effects: [{
        type: 'consumeElementBuff',
        target: 'self',
        onElement: {terre: { stat: 'res.terre', value: 20, duration: 3 },
                    eau:   { stat: 'res.eau',   value: 20, duration: 3 },
                    feu:   { stat: 'res.feu',   value: 20, duration: 3 },
                    air:   { stat: 'res.air',   value: 20, duration: 3 }}}],
    spellProgression: [{lvl: 73,
                        patch: {}},
                       {lvl: 137,
                        patch: { consumeElementBuff: { onElement: {
                            terre: { value: 30 }, eau: { value: 30 },
                            feu:   { value: 30 }, air: { value: 30 }
                        }}}}],
    description: "Consomme l'élément actif et confère des résistances dans cet élément."
}
// move.polarite = {
//     id: 'polarite',
//     name: 'Polarité',
//     classId: 'huppermage',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,
//                         patch: {}}],
//     description: ""
// }
// move.surcharge_runique = {
//     id: 'surcharge_runique',
//     name: 'Surcharge Runique',
//     classId: 'huppermage',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,
//                         patch: {}}],
//     description: ""
// }
// move.propagation = {
//     id: 'propagation',
//     name: 'Propagation',
//     classId: 'huppermage',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,
//                         patch: {}}],
//     description: ""
// }
// move.supernova = {
//     id: 'supernova',
//     name: 'Supernova',
//     classId: 'huppermage',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,
//                         patch: {}}],
//     description: ""
// }
// move.lances_telluriques = {
//     id: 'lances_telluriques',
//     name: 'Lances Telluriques',
//     classId: 'huppermage',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,
//                         patch: {}}],
//     description: ""
// }
// move.onde_celeste = {
//     id: 'onde_celeste',
//     name: 'Onde Céleste',
//     classId: 'huppermage',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,
//                         patch: {}}],
//     description: ""
// }
// move.tison = {
//     id: 'tison',
//     name: 'Tison',
//     classId: 'huppermage',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,
//                         patch: {}}],
//     description: ""
// }
// move.cataracte = {
//     id: 'cataracte',
//     name: 'Cataracte',
//     classId: 'huppermage',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,
//                         patch: {}}],
//     description: ""
// }
// move.manifestation = {
//     id: 'manifestation',
//     name: 'Manifestation',
//     classId: 'huppermage',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,
//                         patch: {}}],
//     description: ""
// }
// move.tribut = {
//     id: 'tribut',
//     name: 'Tribut',
//     classId: 'huppermage',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,
//                         patch: {}}],
//     description: ""
// }
// move.avalanche = {
//     id: 'avalanche',
//     name: 'Avalanche',
//     classId: 'huppermage',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,
//                         patch: {}}],
//     description: ""
// }
// move.deflagration = {
//     id: 'deflagration',
//     name: 'Déflagration',
//     classId: 'huppermage',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,
//                         patch: {}}],
//     description: ""
// }
// move.courant_quadramental = {
//     id: 'courant_quadramental',
//     name: 'Courant Quadramental',
//     classId: 'huppermage',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.comete = {
//     id: 'comete',
//     name: 'Comète',
//     classId: 'huppermage',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.asteroide = {
//     id: 'asteroide',
//     name: 'Astéroïde',
//     classId: 'huppermage',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.repulsion_runique = {
//     id: 'repulsion_runique',
//     name: 'Répulsion Runique',
//     classId: 'huppermage',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.empreinte = {
//     id: 'empreinte',
//     name: 'Empreinte',
//     classId: 'huppermage',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.stalactite = {
//     id: 'stalactite',
//     name: 'Stalactite',
//     classId: 'huppermage',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.volcan = {
//     id: 'volcan',
//     name: 'Volcan',
//     classId: 'huppermage',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.breche = {
//     id: 'breche',
//     name: 'Brèche',
//     classId: 'huppermage',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.ouragan = {
//     id: 'ouragan',
//     name: 'Ouragan',
//     classId: 'huppermage',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.gardien_elementaire = {
//     id: 'gardien_elementaire',
//     name: 'Gardien Élémentaire',
//     classId: 'huppermage',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.convection = {
//     id: 'convection',
//     name: 'Convection',
//     classId: 'huppermage',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.sublimation = {
//     id: 'sublimation',
//     name: 'Sublimation',
//     classId: 'huppermage',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.prisme_runique = {
//     id: 'prisme_runique',
//     name: 'Prisme Runique',
//     classId: 'huppermage',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.torrent_arcanique = {
//     id: 'torrent_arcanique',
//     name: 'Torrent Arcanique',
//     classId: 'huppermage',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// #endregion

// #region Xelor ─────────────────────────────────────────
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 1,
//                         patch: {}},
//                        {lvl: 66,
//                         patch: {}},
//                        {lvl: 132,
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 8,
//                         patch: {}},
//                        {lvl: 67,
//                         patch: {}},
//                        {lvl: 133,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{ lvl: 12, 
//                          patch: {} },
//                        {lvl: 69,
//                         patch: {}},
//                        {lvl: 136,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 16,
//                         patch: {}},
//                        {lvl: 68,
//                         patch: {}},
//                        {lvl: 134,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 20,
//                         patch: {}},
//                        {lvl: 72,
//                         patch: {}},
//                        {lvl: 139,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 24,
//                         patch: {}},
//                        {lvl: 77,  
//                         patch: {}},
//                        {lvl: 144,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 28,
//                         patch: {}},
//                        {lvl: 82,
//                         patch: {}},
//                        {lvl: 149,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 33,
//                         patch: {}},
//                        {lvl: 87,  
//                         patch: {}},
//                        {lvl: 154,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 37,
//                         patch: {}},
//                        {lvl: 92,  
//                         patch: {}},
//                        {lvl: 159,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 41,
//                         patch: {}},
//                        {lvl: 97,
//                         patch: {}},
//                        {lvl: 164,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 45,
//                         patch: {}},
//                        {lvl: 102,
//                         patch: {}},
//                        {lvl: 169,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 49,
//                         patch: {}},
//                        {lvl: 107,  
//                         patch: {}},
//                        {lvl: 174,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 53,
//                         patch: {}},
//                        {lvl: 112,
//                         patch: {}},
//                        {lvl: 179,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 57,
//                         patch: {}},
//                        {lvl: 117,  
//                         patch: {}},
//                        {lvl: 184,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 61,
//                         patch: {}},
//                        {lvl: 122,  
//                         patch: {}},
//                        {lvl: 189,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 65,
//                         patch: {}},
//                        {lvl: 127,  
//                         patch: {}},
//                        {lvl: 194,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 69,
//                         patch: {}},
//                        {lvl: 131,  
//                         patch: {}},
//                        {lvl: 198,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 73,
//                         patch: {}},
//                        {lvl: 137,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// #endregion

// #region osamodas ─────────────────────────────────────────
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 1,
//                         patch: {}},
//                        {lvl: 66,
//                         patch: {}},
//                        {lvl: 132,
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 8,
//                         patch: {}},
//                        {lvl: 67,
//                         patch: {}},
//                        {lvl: 133,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{ lvl: 12, 
//                          patch: {} },
//                        {lvl: 69,
//                         patch: {}},
//                        {lvl: 136,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 16,
//                         patch: {}},
//                        {lvl: 68,
//                         patch: {}},
//                        {lvl: 134,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 20,
//                         patch: {}},
//                        {lvl: 72,
//                         patch: {}},
//                        {lvl: 139,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 24,
//                         patch: {}},
//                        {lvl: 77,  
//                         patch: {}},
//                        {lvl: 144,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 28,
//                         patch: {}},
//                        {lvl: 82,
//                         patch: {}},
//                        {lvl: 149,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 33,
//                         patch: {}},
//                        {lvl: 87,  
//                         patch: {}},
//                        {lvl: 154,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 37,
//                         patch: {}},
//                        {lvl: 92,  
//                         patch: {}},
//                        {lvl: 159,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 41,
//                         patch: {}},
//                        {lvl: 97,
//                         patch: {}},
//                        {lvl: 164,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 45,
//                         patch: {}},
//                        {lvl: 102,
//                         patch: {}},
//                        {lvl: 169,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 49,
//                         patch: {}},
//                        {lvl: 107,  
//                         patch: {}},
//                        {lvl: 174,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 53,
//                         patch: {}},
//                        {lvl: 112,
//                         patch: {}},
//                        {lvl: 179,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 57,
//                         patch: {}},
//                        {lvl: 117,  
//                         patch: {}},
//                        {lvl: 184,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 61,
//                         patch: {}},
//                        {lvl: 122,  
//                         patch: {}},
//                        {lvl: 189,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 65,
//                         patch: {}},
//                        {lvl: 127,  
//                         patch: {}},
//                        {lvl: 194,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 69,
//                         patch: {}},
//                        {lvl: 131,  
//                         patch: {}},
//                        {lvl: 198,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 73,
//                         patch: {}},
//                        {lvl: 137,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// #endregion

// #region feca ─────────────────────────────────────────
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 1,
//                         patch: {}},
//                        {lvl: 66,
//                         patch: {}},
//                        {lvl: 132,
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 8,
//                         patch: {}},
//                        {lvl: 67,
//                         patch: {}},
//                        {lvl: 133,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{ lvl: 12, 
//                          patch: {} },
//                        {lvl: 69,
//                         patch: {}},
//                        {lvl: 136,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 16,
//                         patch: {}},
//                        {lvl: 68,
//                         patch: {}},
//                        {lvl: 134,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 20,
//                         patch: {}},
//                        {lvl: 72,
//                         patch: {}},
//                        {lvl: 139,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 24,
//                         patch: {}},
//                        {lvl: 77,  
//                         patch: {}},
//                        {lvl: 144,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 28,
//                         patch: {}},
//                        {lvl: 82,
//                         patch: {}},
//                        {lvl: 149,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 33,
//                         patch: {}},
//                        {lvl: 87,  
//                         patch: {}},
//                        {lvl: 154,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 37,
//                         patch: {}},
//                        {lvl: 92,  
//                         patch: {}},
//                        {lvl: 159,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 41,
//                         patch: {}},
//                        {lvl: 97,
//                         patch: {}},
//                        {lvl: 164,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 45,
//                         patch: {}},
//                        {lvl: 102,
//                         patch: {}},
//                        {lvl: 169,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 49,
//                         patch: {}},
//                        {lvl: 107,  
//                         patch: {}},
//                        {lvl: 174,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 53,
//                         patch: {}},
//                        {lvl: 112,
//                         patch: {}},
//                        {lvl: 179,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 57,
//                         patch: {}},
//                        {lvl: 117,  
//                         patch: {}},
//                        {lvl: 184,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 61,
//                         patch: {}},
//                        {lvl: 122,  
//                         patch: {}},
//                        {lvl: 189,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 65,
//                         patch: {}},
//                        {lvl: 127,  
//                         patch: {}},
//                        {lvl: 194,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 69,
//                         patch: {}},
//                        {lvl: 131,  
//                         patch: {}},
//                        {lvl: 198,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 73,
//                         patch: {}},
//                        {lvl: 137,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// #endregion

// #region sram ─────────────────────────────────────────
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 1,
//                         patch: {}},
//                        {lvl: 66,
//                         patch: {}},
//                        {lvl: 132,
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 8,
//                         patch: {}},
//                        {lvl: 67,
//                         patch: {}},
//                        {lvl: 133,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{ lvl: 12, 
//                          patch: {} },
//                        {lvl: 69,
//                         patch: {}},
//                        {lvl: 136,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 16,
//                         patch: {}},
//                        {lvl: 68,
//                         patch: {}},
//                        {lvl: 134,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 20,
//                         patch: {}},
//                        {lvl: 72,
//                         patch: {}},
//                        {lvl: 139,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 24,
//                         patch: {}},
//                        {lvl: 77,  
//                         patch: {}},
//                        {lvl: 144,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 28,
//                         patch: {}},
//                        {lvl: 82,
//                         patch: {}},
//                        {lvl: 149,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 33,
//                         patch: {}},
//                        {lvl: 87,  
//                         patch: {}},
//                        {lvl: 154,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 37,
//                         patch: {}},
//                        {lvl: 92,  
//                         patch: {}},
//                        {lvl: 159,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 41,
//                         patch: {}},
//                        {lvl: 97,
//                         patch: {}},
//                        {lvl: 164,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 45,
//                         patch: {}},
//                        {lvl: 102,
//                         patch: {}},
//                        {lvl: 169,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 49,
//                         patch: {}},
//                        {lvl: 107,  
//                         patch: {}},
//                        {lvl: 174,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 53,
//                         patch: {}},
//                        {lvl: 112,
//                         patch: {}},
//                        {lvl: 179,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 57,
//                         patch: {}},
//                        {lvl: 117,  
//                         patch: {}},
//                        {lvl: 184,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 61,
//                         patch: {}},
//                        {lvl: 122,  
//                         patch: {}},
//                        {lvl: 189,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 65,
//                         patch: {}},
//                        {lvl: 127,  
//                         patch: {}},
//                        {lvl: 194,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 69,
//                         patch: {}},
//                        {lvl: 131,  
//                         patch: {}},
//                        {lvl: 198,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 73,
//                         patch: {}},
//                        {lvl: 137,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// #endregion

// #region sacrieur ─────────────────────────────────────────
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 1,
//                         patch: {}},
//                        {lvl: 66,
//                         patch: {}},
//                        {lvl: 132,
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 8,
//                         patch: {}},
//                        {lvl: 67,
//                         patch: {}},
//                        {lvl: 133,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{ lvl: 12, 
//                          patch: {} },
//                        {lvl: 69,
//                         patch: {}},
//                        {lvl: 136,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 16,
//                         patch: {}},
//                        {lvl: 68,
//                         patch: {}},
//                        {lvl: 134,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 20,
//                         patch: {}},
//                        {lvl: 72,
//                         patch: {}},
//                        {lvl: 139,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 24,
//                         patch: {}},
//                        {lvl: 77,  
//                         patch: {}},
//                        {lvl: 144,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 28,
//                         patch: {}},
//                        {lvl: 82,
//                         patch: {}},
//                        {lvl: 149,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 33,
//                         patch: {}},
//                        {lvl: 87,  
//                         patch: {}},
//                        {lvl: 154,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 37,
//                         patch: {}},
//                        {lvl: 92,  
//                         patch: {}},
//                        {lvl: 159,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 41,
//                         patch: {}},
//                        {lvl: 97,
//                         patch: {}},
//                        {lvl: 164,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 45,
//                         patch: {}},
//                        {lvl: 102,
//                         patch: {}},
//                        {lvl: 169,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 49,
//                         patch: {}},
//                        {lvl: 107,  
//                         patch: {}},
//                        {lvl: 174,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 53,
//                         patch: {}},
//                        {lvl: 112,
//                         patch: {}},
//                        {lvl: 179,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 57,
//                         patch: {}},
//                        {lvl: 117,  
//                         patch: {}},
//                        {lvl: 184,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 61,
//                         patch: {}},
//                        {lvl: 122,  
//                         patch: {}},
//                        {lvl: 189,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 65,
//                         patch: {}},
//                        {lvl: 127,  
//                         patch: {}},
//                        {lvl: 194,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 69,
//                         patch: {}},
//                        {lvl: 131,  
//                         patch: {}},
//                        {lvl: 198,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 73,
//                         patch: {}},
//                        {lvl: 137,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// #endregion

// #region zobal ─────────────────────────────────────────
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 1,
//                         patch: {}},
//                        {lvl: 66,
//                         patch: {}},
//                        {lvl: 132,
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 8,
//                         patch: {}},
//                        {lvl: 67,
//                         patch: {}},
//                        {lvl: 133,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{ lvl: 12, 
//                          patch: {} },
//                        {lvl: 69,
//                         patch: {}},
//                        {lvl: 136,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 16,
//                         patch: {}},
//                        {lvl: 68,
//                         patch: {}},
//                        {lvl: 134,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 20,
//                         patch: {}},
//                        {lvl: 72,
//                         patch: {}},
//                        {lvl: 139,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 24,
//                         patch: {}},
//                        {lvl: 77,  
//                         patch: {}},
//                        {lvl: 144,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 28,
//                         patch: {}},
//                        {lvl: 82,
//                         patch: {}},
//                        {lvl: 149,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 33,
//                         patch: {}},
//                        {lvl: 87,  
//                         patch: {}},
//                        {lvl: 154,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 37,
//                         patch: {}},
//                        {lvl: 92,  
//                         patch: {}},
//                        {lvl: 159,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 41,
//                         patch: {}},
//                        {lvl: 97,
//                         patch: {}},
//                        {lvl: 164,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 45,
//                         patch: {}},
//                        {lvl: 102,
//                         patch: {}},
//                        {lvl: 169,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 49,
//                         patch: {}},
//                        {lvl: 107,  
//                         patch: {}},
//                        {lvl: 174,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 53,
//                         patch: {}},
//                        {lvl: 112,
//                         patch: {}},
//                        {lvl: 179,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 57,
//                         patch: {}},
//                        {lvl: 117,  
//                         patch: {}},
//                        {lvl: 184,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 61,
//                         patch: {}},
//                        {lvl: 122,  
//                         patch: {}},
//                        {lvl: 189,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 65,
//                         patch: {}},
//                        {lvl: 127,  
//                         patch: {}},
//                        {lvl: 194,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 69,
//                         patch: {}},
//                        {lvl: 131,  
//                         patch: {}},
//                        {lvl: 198,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 73,
//                         patch: {}},
//                        {lvl: 137,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// #endregion

// #region sadida ─────────────────────────────────────────
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 1,
//                         patch: {}},
//                        {lvl: 66,
//                         patch: {}},
//                        {lvl: 132,
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 8,
//                         patch: {}},
//                        {lvl: 67,
//                         patch: {}},
//                        {lvl: 133,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{ lvl: 12, 
//                          patch: {} },
//                        {lvl: 69,
//                         patch: {}},
//                        {lvl: 136,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 16,
//                         patch: {}},
//                        {lvl: 68,
//                         patch: {}},
//                        {lvl: 134,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 20,
//                         patch: {}},
//                        {lvl: 72,
//                         patch: {}},
//                        {lvl: 139,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 24,
//                         patch: {}},
//                        {lvl: 77,  
//                         patch: {}},
//                        {lvl: 144,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 28,
//                         patch: {}},
//                        {lvl: 82,
//                         patch: {}},
//                        {lvl: 149,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 33,
//                         patch: {}},
//                        {lvl: 87,  
//                         patch: {}},
//                        {lvl: 154,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 37,
//                         patch: {}},
//                        {lvl: 92,  
//                         patch: {}},
//                        {lvl: 159,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 41,
//                         patch: {}},
//                        {lvl: 97,
//                         patch: {}},
//                        {lvl: 164,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 45,
//                         patch: {}},
//                        {lvl: 102,
//                         patch: {}},
//                        {lvl: 169,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 49,
//                         patch: {}},
//                        {lvl: 107,  
//                         patch: {}},
//                        {lvl: 174,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 53,
//                         patch: {}},
//                        {lvl: 112,
//                         patch: {}},
//                        {lvl: 179,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 57,
//                         patch: {}},
//                        {lvl: 117,  
//                         patch: {}},
//                        {lvl: 184,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 61,
//                         patch: {}},
//                        {lvl: 122,  
//                         patch: {}},
//                        {lvl: 189,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 65,
//                         patch: {}},
//                        {lvl: 127,  
//                         patch: {}},
//                        {lvl: 194,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 69,
//                         patch: {}},
//                        {lvl: 131,  
//                         patch: {}},
//                        {lvl: 198,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 73,
//                         patch: {}},
//                        {lvl: 137,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// #endregion

// #region roublard ─────────────────────────────────────────
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 1,
//                         patch: {}},
//                        {lvl: 66,
//                         patch: {}},
//                        {lvl: 132,
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 8,
//                         patch: {}},
//                        {lvl: 67,
//                         patch: {}},
//                        {lvl: 133,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{ lvl: 12, 
//                          patch: {} },
//                        {lvl: 69,
//                         patch: {}},
//                        {lvl: 136,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 16,
//                         patch: {}},
//                        {lvl: 68,
//                         patch: {}},
//                        {lvl: 134,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 20,
//                         patch: {}},
//                        {lvl: 72,
//                         patch: {}},
//                        {lvl: 139,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 24,
//                         patch: {}},
//                        {lvl: 77,  
//                         patch: {}},
//                        {lvl: 144,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 28,
//                         patch: {}},
//                        {lvl: 82,
//                         patch: {}},
//                        {lvl: 149,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 33,
//                         patch: {}},
//                        {lvl: 87,  
//                         patch: {}},
//                        {lvl: 154,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 37,
//                         patch: {}},
//                        {lvl: 92,  
//                         patch: {}},
//                        {lvl: 159,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 41,
//                         patch: {}},
//                        {lvl: 97,
//                         patch: {}},
//                        {lvl: 164,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 45,
//                         patch: {}},
//                        {lvl: 102,
//                         patch: {}},
//                        {lvl: 169,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 49,
//                         patch: {}},
//                        {lvl: 107,  
//                         patch: {}},
//                        {lvl: 174,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 53,
//                         patch: {}},
//                        {lvl: 112,
//                         patch: {}},
//                        {lvl: 179,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 57,
//                         patch: {}},
//                        {lvl: 117,  
//                         patch: {}},
//                        {lvl: 184,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 61,
//                         patch: {}},
//                        {lvl: 122,  
//                         patch: {}},
//                        {lvl: 189,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 65,
//                         patch: {}},
//                        {lvl: 127,  
//                         patch: {}},
//                        {lvl: 194,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 69,
//                         patch: {}},
//                        {lvl: 131,  
//                         patch: {}},
//                        {lvl: 198,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 73,
//                         patch: {}},
//                        {lvl: 137,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// #endregion

// #region ecaflip ─────────────────────────────────────────
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 1,
//                         patch: {}},
//                        {lvl: 66,
//                         patch: {}},
//                        {lvl: 132,
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 8,
//                         patch: {}},
//                        {lvl: 67,
//                         patch: {}},
//                        {lvl: 133,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{ lvl: 12, 
//                          patch: {} },
//                        {lvl: 69,
//                         patch: {}},
//                        {lvl: 136,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 16,
//                         patch: {}},
//                        {lvl: 68,
//                         patch: {}},
//                        {lvl: 134,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 20,
//                         patch: {}},
//                        {lvl: 72,
//                         patch: {}},
//                        {lvl: 139,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 24,
//                         patch: {}},
//                        {lvl: 77,  
//                         patch: {}},
//                        {lvl: 144,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 28,
//                         patch: {}},
//                        {lvl: 82,
//                         patch: {}},
//                        {lvl: 149,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 33,
//                         patch: {}},
//                        {lvl: 87,  
//                         patch: {}},
//                        {lvl: 154,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 37,
//                         patch: {}},
//                        {lvl: 92,  
//                         patch: {}},
//                        {lvl: 159,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 41,
//                         patch: {}},
//                        {lvl: 97,
//                         patch: {}},
//                        {lvl: 164,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 45,
//                         patch: {}},
//                        {lvl: 102,
//                         patch: {}},
//                        {lvl: 169,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 49,
//                         patch: {}},
//                        {lvl: 107,  
//                         patch: {}},
//                        {lvl: 174,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 53,
//                         patch: {}},
//                        {lvl: 112,
//                         patch: {}},
//                        {lvl: 179,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 57,
//                         patch: {}},
//                        {lvl: 117,  
//                         patch: {}},
//                        {lvl: 184,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 61,
//                         patch: {}},
//                        {lvl: 122,  
//                         patch: {}},
//                        {lvl: 189,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 65,
//                         patch: {}},
//                        {lvl: 127,  
//                         patch: {}},
//                        {lvl: 194,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 69,
//                         patch: {}},
//                        {lvl: 131,  
//                         patch: {}},
//                        {lvl: 198,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 73,
//                         patch: {}},
//                        {lvl: 137,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// #endregion

// #region steamer ─────────────────────────────────────────
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 1,
//                         patch: {}},
//                        {lvl: 66,
//                         patch: {}},
//                        {lvl: 132,
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 8,
//                         patch: {}},
//                        {lvl: 67,
//                         patch: {}},
//                        {lvl: 133,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{ lvl: 12, 
//                          patch: {} },
//                        {lvl: 69,
//                         patch: {}},
//                        {lvl: 136,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 16,
//                         patch: {}},
//                        {lvl: 68,
//                         patch: {}},
//                        {lvl: 134,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 20,
//                         patch: {}},
//                        {lvl: 72,
//                         patch: {}},
//                        {lvl: 139,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 24,
//                         patch: {}},
//                        {lvl: 77,  
//                         patch: {}},
//                        {lvl: 144,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 28,
//                         patch: {}},
//                        {lvl: 82,
//                         patch: {}},
//                        {lvl: 149,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 33,
//                         patch: {}},
//                        {lvl: 87,  
//                         patch: {}},
//                        {lvl: 154,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 37,
//                         patch: {}},
//                        {lvl: 92,  
//                         patch: {}},
//                        {lvl: 159,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 41,
//                         patch: {}},
//                        {lvl: 97,
//                         patch: {}},
//                        {lvl: 164,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 45,
//                         patch: {}},
//                        {lvl: 102,
//                         patch: {}},
//                        {lvl: 169,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 49,
//                         patch: {}},
//                        {lvl: 107,  
//                         patch: {}},
//                        {lvl: 174,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 53,
//                         patch: {}},
//                        {lvl: 112,
//                         patch: {}},
//                        {lvl: 179,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 57,
//                         patch: {}},
//                        {lvl: 117,  
//                         patch: {}},
//                        {lvl: 184,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 61,
//                         patch: {}},
//                        {lvl: 122,  
//                         patch: {}},
//                        {lvl: 189,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 65,
//                         patch: {}},
//                        {lvl: 127,  
//                         patch: {}},
//                        {lvl: 194,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 69,
//                         patch: {}},
//                        {lvl: 131,  
//                         patch: {}},
//                        {lvl: 198,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 73,
//                         patch: {}},
//                        {lvl: 137,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// #endregion

// #region ouginak ─────────────────────────────────────────
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 1,
//                         patch: {}},
//                        {lvl: 66,
//                         patch: {}},
//                        {lvl: 132,
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 8,
//                         patch: {}},
//                        {lvl: 67,
//                         patch: {}},
//                        {lvl: 133,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{ lvl: 12, 
//                          patch: {} },
//                        {lvl: 69,
//                         patch: {}},
//                        {lvl: 136,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 16,
//                         patch: {}},
//                        {lvl: 68,
//                         patch: {}},
//                        {lvl: 134,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 20,
//                         patch: {}},
//                        {lvl: 72,
//                         patch: {}},
//                        {lvl: 139,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 24,
//                         patch: {}},
//                        {lvl: 77,  
//                         patch: {}},
//                        {lvl: 144,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 28,
//                         patch: {}},
//                        {lvl: 82,
//                         patch: {}},
//                        {lvl: 149,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 33,
//                         patch: {}},
//                        {lvl: 87,  
//                         patch: {}},
//                        {lvl: 154,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 37,
//                         patch: {}},
//                        {lvl: 92,  
//                         patch: {}},
//                        {lvl: 159,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 41,
//                         patch: {}},
//                        {lvl: 97,
//                         patch: {}},
//                        {lvl: 164,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 45,
//                         patch: {}},
//                        {lvl: 102,
//                         patch: {}},
//                        {lvl: 169,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 49,
//                         patch: {}},
//                        {lvl: 107,  
//                         patch: {}},
//                        {lvl: 174,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 53,
//                         patch: {}},
//                        {lvl: 112,
//                         patch: {}},
//                        {lvl: 179,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 57,
//                         patch: {}},
//                        {lvl: 117,  
//                         patch: {}},
//                        {lvl: 184,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 61,
//                         patch: {}},
//                        {lvl: 122,  
//                         patch: {}},
//                        {lvl: 189,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 65,
//                         patch: {}},
//                        {lvl: 127,  
//                         patch: {}},
//                        {lvl: 194,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 69,
//                         patch: {}},
//                        {lvl: 131,  
//                         patch: {}},
//                        {lvl: 198,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 73,
//                         patch: {}},
//                        {lvl: 137,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// #endregion

// #region forgelance ─────────────────────────────────────────
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 1,
//                         patch: {}},
//                        {lvl: 66,
//                         patch: {}},
//                        {lvl: 132,
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 8,
//                         patch: {}},
//                        {lvl: 67,
//                         patch: {}},
//                        {lvl: 133,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{ lvl: 12, 
//                          patch: {} },
//                        {lvl: 69,
//                         patch: {}},
//                        {lvl: 136,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 16,
//                         patch: {}},
//                        {lvl: 68,
//                         patch: {}},
//                        {lvl: 134,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 20,
//                         patch: {}},
//                        {lvl: 72,
//                         patch: {}},
//                        {lvl: 139,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 24,
//                         patch: {}},
//                        {lvl: 77,  
//                         patch: {}},
//                        {lvl: 144,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 28,
//                         patch: {}},
//                        {lvl: 82,
//                         patch: {}},
//                        {lvl: 149,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 33,
//                         patch: {}},
//                        {lvl: 87,  
//                         patch: {}},
//                        {lvl: 154,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 37,
//                         patch: {}},
//                        {lvl: 92,  
//                         patch: {}},
//                        {lvl: 159,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 41,
//                         patch: {}},
//                        {lvl: 97,
//                         patch: {}},
//                        {lvl: 164,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 45,
//                         patch: {}},
//                        {lvl: 102,
//                         patch: {}},
//                        {lvl: 169,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 49,
//                         patch: {}},
//                        {lvl: 107,  
//                         patch: {}},
//                        {lvl: 174,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 53,
//                         patch: {}},
//                        {lvl: 112,
//                         patch: {}},
//                        {lvl: 179,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 57,
//                         patch: {}},
//                        {lvl: 117,  
//                         patch: {}},
//                        {lvl: 184,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 61,
//                         patch: {}},
//                        {lvl: 122,  
//                         patch: {}},
//                        {lvl: 189,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 65,
//                         patch: {}},
//                        {lvl: 127,  
//                         patch: {}},
//                        {lvl: 194,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 69,
//                         patch: {}},
//                        {lvl: 131,  
//                         patch: {}},
//                        {lvl: 198,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 73,
//                         patch: {}},
//                        {lvl: 137,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// #endregion

// #region pandawa ─────────────────────────────────────────
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 1,
//                         patch: {}},
//                        {lvl: 66,
//                         patch: {}},
//                        {lvl: 132,
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 8,
//                         patch: {}},
//                        {lvl: 67,
//                         patch: {}},
//                        {lvl: 133,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{ lvl: 12, 
//                          patch: {} },
//                        {lvl: 69,
//                         patch: {}},
//                        {lvl: 136,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 16,
//                         patch: {}},
//                        {lvl: 68,
//                         patch: {}},
//                        {lvl: 134,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 20,
//                         patch: {}},
//                        {lvl: 72,
//                         patch: {}},
//                        {lvl: 139,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 24,
//                         patch: {}},
//                        {lvl: 77,  
//                         patch: {}},
//                        {lvl: 144,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 28,
//                         patch: {}},
//                        {lvl: 82,
//                         patch: {}},
//                        {lvl: 149,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 33,
//                         patch: {}},
//                        {lvl: 87,  
//                         patch: {}},
//                        {lvl: 154,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 37,
//                         patch: {}},
//                        {lvl: 92,  
//                         patch: {}},
//                        {lvl: 159,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 41,
//                         patch: {}},
//                        {lvl: 97,
//                         patch: {}},
//                        {lvl: 164,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 45,
//                         patch: {}},
//                        {lvl: 102,
//                         patch: {}},
//                        {lvl: 169,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 49,
//                         patch: {}},
//                        {lvl: 107,  
//                         patch: {}},
//                        {lvl: 174,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 53,
//                         patch: {}},
//                        {lvl: 112,
//                         patch: {}},
//                        {lvl: 179,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 57,
//                         patch: {}},
//                        {lvl: 117,  
//                         patch: {}},
//                        {lvl: 184,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 61,
//                         patch: {}},
//                        {lvl: 122,  
//                         patch: {}},
//                        {lvl: 189,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 65,
//                         patch: {}},
//                        {lvl: 127,  
//                         patch: {}},
//                        {lvl: 194,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 69,
//                         patch: {}},
//                        {lvl: 131,  
//                         patch: {}},
//                        {lvl: 198,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 73,
//                         patch: {}},
//                        {lvl: 137,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// #endregion

// #region eliotrope ─────────────────────────────────────────
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 1,
//                         patch: {}},
//                        {lvl: 66,
//                         patch: {}},
//                        {lvl: 132,
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 8,
//                         patch: {}},
//                        {lvl: 67,
//                         patch: {}},
//                        {lvl: 133,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{ lvl: 12, 
//                          patch: {} },
//                        {lvl: 69,
//                         patch: {}},
//                        {lvl: 136,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 16,
//                         patch: {}},
//                        {lvl: 68,
//                         patch: {}},
//                        {lvl: 134,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 20,
//                         patch: {}},
//                        {lvl: 72,
//                         patch: {}},
//                        {lvl: 139,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 24,
//                         patch: {}},
//                        {lvl: 77,  
//                         patch: {}},
//                        {lvl: 144,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 28,
//                         patch: {}},
//                        {lvl: 82,
//                         patch: {}},
//                        {lvl: 149,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 33,
//                         patch: {}},
//                        {lvl: 87,  
//                         patch: {}},
//                        {lvl: 154,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 37,
//                         patch: {}},
//                        {lvl: 92,  
//                         patch: {}},
//                        {lvl: 159,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 41,
//                         patch: {}},
//                        {lvl: 97,
//                         patch: {}},
//                        {lvl: 164,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 45,
//                         patch: {}},
//                        {lvl: 102,
//                         patch: {}},
//                        {lvl: 169,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 49,
//                         patch: {}},
//                        {lvl: 107,  
//                         patch: {}},
//                        {lvl: 174,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 53,
//                         patch: {}},
//                        {lvl: 112,
//                         patch: {}},
//                        {lvl: 179,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 57,
//                         patch: {}},
//                        {lvl: 117,  
//                         patch: {}},
//                        {lvl: 184,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 61,
//                         patch: {}},
//                        {lvl: 122,  
//                         patch: {}},
//                        {lvl: 189,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 65,
//                         patch: {}},
//                        {lvl: 127,  
//                         patch: {}},
//                        {lvl: 194,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 69,
//                         patch: {}},
//                        {lvl: 131,  
//                         patch: {}},
//                        {lvl: 198,
//                         patch: {}}],
//     description: " "
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 73,
//                         patch: {}},
//                        {lvl: 137,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,  
//                         patch: {}}],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move. = {
//     id: '',
//     name: '',
//     classId: '',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// #endregion

