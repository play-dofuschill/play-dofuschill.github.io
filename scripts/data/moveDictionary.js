// moveDictionary.js — Sorts des classes DofusChill

const move = {}
//#region dico move
/* 

restriction: 'star',    // ★
restriction: 'arrow',   //  →
restriction: 'shield',  // 🛡
restriction: 'coeur',   // ❤

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RÉFÉRENCE EFFETS DE SORTS — copier-coller prêt à l'emploi
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ÉLÉMENTS    : neutre | terre | feu | eau | air
TARGET       : enemy | self | all_allies | ally_random | ally_min_hp | all_enemies (raid, solo = ennemi principal)
STATS BUFF   : atk | spd | flatDamage | finalDamagePct | spellDamagePct | damageReductionPct | critChance | critDamagePct
               healPct | heal | healTeamPct | healMaxHpPct | lifestealPct

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
// Formule heal : (heal × (1 + ATK×0.30/100) + healStat) × (1 + healPct/100) × antiHeal
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
// Formule identique à heal : (heal × (1 + ATK×0.30/100) + healStat) × (1 + healPct/100), calculée à l'application
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
// scale : multiplie les stats effectives du caster par ce coefficient (0.30 = 30% des stats de la classe qui invoque)
{ type: 'summon', summonId: 'lapino', scale: 0.30, duration: 2, target: 'self' }

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

──────────────────────────────────────────────────────────────────────────────
ÉTAT PROIE (Ouginak)
──────────────────────────────────────────────────────────────────────────────
// Pose l'état Proie sur l'ennemi : les N prochains hits reçus par l'ennemi
// gagnent +damageBonusPct% de dégâts ET lifesteal lifestealPct% pour l'attaquant.
// Fonctionne pour TOUT allié qui frappe l'ennemi marqué (pas seulement le lanceur).
// Re-cast : refresh la durée (pas de stack).
// target: 'enemy' | 'all_enemies'
{ type: 'mark_proie', duration: 3, damageBonusPct: 10, lifestealPct: 5, target: 'enemy' }

──────────────────────────────────────────────────────────────────────────────
BUFF SLOTS ADJACENTS (Chasse)
──────────────────────────────────────────────────────────────────────────────
// Applique un buff aux membres dans les slots N-1 et N+1 du lanceur.
// Si le slot est vide ou mort → ignoré. Non-cumulable par sort (même moveId) :
// si le voisin a déjà un buff de ce sort actif, le re-cast est ignoré pour ce voisin.
{ type: 'buff_adjacent', stat: 'flatDamage', value: 50, duration: 2 }

──────────────────────────────────────────────────────────────────────────────
BUFF SLOT ABSOLU
──────────────────────────────────────────────────────────────────────────────
// Applique un buff au membre présent dans le slot ABSOLU indiqué (1-indexé : slots 1–6).
// Si le slot est vide ou mort → effet perdu.
{ type: 'buff_slot', slot: 5, stat: 'finalDamagePct', value: 20, duration: 3 }
{ type: 'buff_slot', slot: 2, stat: 'flatDamage',     value: 40, duration: 2 }

──────────────────────────────────────────────────────────────────────────────
INVERSION DE VITESSE
──────────────────────────────────────────────────────────────────────────────
// Inverse la vitesse d'une entité autour de 100 : vitesse_effective → 200 - vitesse_effective.
//   Exemple : 120 vit → 80 | 60 vit → 140 | 100 vit → 100 (inchangé)
// Double application sur la MÊME entité = annulation (retour à la normale).
// target : 'self' | 'enemy' | 'all_enemies' | 'all_allies'
{ type: 'spd_invert', duration: 3, target: 'enemy'      }
{ type: 'spd_invert', duration: 2, target: 'all_enemies' }
{ type: 'spd_invert', duration: 4, target: 'self'        }

──────────────────────────────────────────────────────────────────────────────
PIÈGES CUMULATIFS (Sram / Roublard)
──────────────────────────────────────────────────────────────────────────────
// Les threshold premiers lancers posent des pièges silencieux (log "X/threshold").
// Au (threshold+1)ème lancer : tous les pièges explosent — (threshold+1) × les dégâts.
// Compteurs INDÉPENDANTS par moveId → plusieurs sorts de piège coexistent.
// Reset automatique à chaque mort d'ennemi.
//   threshold: 3  →  casts 1-2-3 = pose,  cast 4 = explosion × 4
{ type: 'trap', threshold: 3, damage: { min: 20, max: 30 }, element: 'air',   target: 'enemy' }
{ type: 'trap', threshold: 2, damage: { min: 35, max: 45 }, element: 'terre', target: 'enemy' }

──────────────────────────────────────────────────────────────────────────────
SCALING BASÉ SUR LES HP / BOUCLIER / ÉROSION DU LANCEUR
──────────────────────────────────────────────────────────────────────────────
// Ces champs s'ajoutent à un effet 'damage' ou 'buff'.
// Chaque scale est un objet { stat?, ratio } — le calcul est toujours POURCENTAGE RELATIF :
//
//   shieldScale    : (bouclier / maxHp) × 100 × ratio
//                     ex: 300 shield, 1000 maxHp → 30% × ratio
//   currentHpScale : (PV actuels / maxHp) × 100 × ratio
//                     ex: 200 PV, 1000 maxHp → 20% × ratio
//   missingHpScale : ((maxHp − PV actuels) / maxHp) × 100 × ratio
//                     ex: 200 PV, 1000 maxHp → 80% × ratio
//   erodedHpScale  : ((_baseMaxHp − maxHp) / _baseMaxHp) × 100 × ratio
//                     ex: parti à 1000 maxHp, maintenant 500 → 50% × ratio
//                     (_baseMaxHp = maxHp au tout début du combat)
//
// ─ Pour un effet 'damage' ─────────────────────────────────────────────────────
//   stat : la stat à booster temporairement pour CE calcul
//           (finalDamagePct | flatDamage | atk | spellDamagePct | critChance | ...)
//   ratio: multiplicateur du % calculé
//
{ type: 'damage', element: 'feu', damage: { min: 10, max: 20 },
  shieldScale: { stat: 'finalDamagePct', ratio: 1 }, target: 'enemy' }
// → bouclier=300 / maxHp=1000 → +30% finalDamagePct pour CE sort
//
{ type: 'damage', element: 'neutre', damage: { min: 0, max: 0 },
  missingHpScale: { stat: 'flatDamage', ratio: 0.5 }, target: 'enemy' }
// → 800 PV manquants sur 1000 → 80% × 0.5 = +40 flatDamage
//
{ type: 'damage', element: 'terre', damage: { min: 5, max: 10 },
  erodedHpScale: { stat: 'finalDamagePct', ratio: 1 }, target: 'enemy' }
// → 500 HP érodés sur 1000 de base → +50% finalDamagePct
//
// ─ Pour un effet 'buff' ──────────────────────────────────────────────────────
//   pas de 'stat' dans l'objet — la stat est déjà effect.stat
//   le bonus calculé est ajouté à value
//
{ type: 'buff', stat: 'finalDamagePct', value: 0, shieldScale: { ratio: 1 }, duration: 3, target: 'self' }
// → bouclier=300 / maxHp=1000 → +30 finalDamagePct (soit +30%)
//
{ type: 'buff', stat: 'atk', value: 10, missingHpScale: { ratio: 0.5 }, duration: 2, target: 'self' }
// → 800 PV manquants / 1000 maxHp → 80% × 0.5 = +40, total buffVal = 10 + 40 = 50 ATK
//
{ type: 'buff', stat: 'critChance', value: 0, erodedHpScale: { ratio: 0.2 }, duration: 3, target: 'self' }
// → 500 HP érodés / 1000 base → 50% × 0.2 = +10% critChance
//
// Combinaisons : plusieurs scales sur le même effet
{ type: 'damage', element: 'feu', damage: { min: 5, max: 10 },
  shieldScale:    { stat: 'finalDamagePct', ratio: 0.5 },
  erodedHpScale:  { stat: 'flatDamage',     ratio: 1.0 }, target: 'enemy' }

──────────────────────────────────────────────────────────────────────────────
ÉTAT RÉACTIF (reactive)
──────────────────────────────────────────────────────────────────────────────
// Pose un état "en attente" sur une cible (self, team, slot absolu).
// Quand la cible reçoit le type d'effet défini dans trigger, la réaction s'exécute.
// NON-CUMULABLE : si un réactif du même sort est déjà actif, le nouveau lancer est silencieux.
// duration : nombre d'actions de la cible avant expiration (Infinity = pas d'expiration)
//
// Champs :
//   target    : 'self' | 'team' | 'all_allies'   (ou slot: N pour slot absolu)
//   slot      : 1..5   (optionnel, cible le slot N même si ce n'est pas le lanceur)
//   trigger   : { type, stat?, element? }
//     type    : 'damage' | 'debuff' | 'buff' | 'heal' | 'dot' | 'shield'
//     stat    : filtre sur la stat affectée (buff/debuff)
//     element : filtre sur l'élément (damage/dot)
//   reaction  : un effet complet — tout type supporté par executeEffect
//   duration  : nombre d'actions de la cible avant expiration (défaut : Infinity)
//
// Exemple 1 — si le lanceur reçoit un debuff spd, pose un poison de 5 tours sur l'ennemi :
{ type: 'reactive', target: 'self',
  trigger: { type: 'debuff', stat: 'spd' },
  reaction: { type: 'dot', element: 'poison', damage: { min: 20, max: 30 }, duration: 5, target: 'enemy' },
  duration: 3 }
//
// Exemple 2 — si le membre du slot 3 reçoit des dégâts, les renvoie à l'ennemi :
// (damage: '_reflect' → utilise le montant exact reçu)
{ type: 'reactive', slot: 3,
  trigger: { type: 'damage' },
  reaction: { type: 'damage', element: 'neutre', damage: '_reflect', target: 'enemy' },
  duration: 2 }
//
// Exemple 3 — si toute l'équipe reçoit un buff quelconque, boost le lanceur :
{ type: 'reactive', target: 'team',
  trigger: { type: 'buff' },
  reaction: { type: 'buff', stat: 'atk', value: 15, duration: 2, target: 'self' },
  duration: 4 }
//
// Exemple 4 — si le lanceur reçoit des dégâts feu, il gagne un bouclier :
{ type: 'reactive', target: 'self',
  trigger: { type: 'damage', element: 'feu' },
  reaction: { type: 'shield', value: 200, duration: 3, target: 'self' },
  duration: 2 }
//
// Exemple 5 — pose un réactif sur l'ENNEMI : s'il reçoit un soin (ex: boss se régénère), annuler avec un debuff :
{ type: 'reactive', target: 'enemy',
  trigger: { type: 'heal' },
  reaction: { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' },
  duration: 5 }
//
// Exemple 6 — tous les ennemis (raid) : si l'un reçoit un buff, lui infliger un dot :
{ type: 'reactive', target: 'all_enemies',
  trigger: { type: 'buff' },
  reaction: { type: 'dot', element: 'air', damage: { min: 15, max: 25 }, duration: 3, target: 'enemy' },
  duration: 3 }

*/

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GRILLE D'ÉQUILIBRAGE DES COOLDOWNS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Le tier est calculé sur le MAX des dégâts du sort.

──────────────────────────────────────────────────────────────────────────────
A — DÉGÂTS PURS (aucun effet secondaire)
──────────────────────────────────────────────────────────────────────────────
  max  1– 9 dmg  →  1500ms
  max 10–19 dmg  →  1700ms
  max 20–29 dmg  →  2000ms
  max 30–39 dmg  →  2500ms
  max 40+   dmg  →  3000ms

──────────────────────────────────────────────────────────────────────────────
B — EFFETS PURS (aucun dégât direct)
──────────────────────────────────────────────────────────────────────────────
  Base : 2000ms, puis ajouter le modificateur de l'effet :
  Buff / debuff standard (atk, flatDamage…)  →  +0ms   (= 2000ms)
  Buff / debuff vitesse (spd)                →  +500ms  (= 2500ms)
  Buff / debuff AOE                          →  +1000ms (= 3000ms)
  Heal direct (allié unique)                 →  +500ms  (= 2500ms)
  Heal % maxHp                               →  +1000ms (= 3000ms)
  Heal team                                  →  +2000ms (= 4000ms)
  HOT (heal over time)                       →  +1500ms (= 3500ms)
  Invocation                                 →  base fixe 3500ms (remplace le 2000ms)

──────────────────────────────────────────────────────────────────────────────
C — SORTS COMBINÉS (dégâts + au moins un effet)
──────────────────────────────────────────────────────────────────────────────
  Formule : tier dégâts + MAX des modificateurs d'effets ci-dessous
  (on prend uniquement le modificateur le plus élevé parmi tous les effets)

  Buff / debuff standard            →  +500ms
  Buff / debuff vitesse             →  +500ms
  Buff / debuff AOE                 →  +1000ms
  Heal direct                       →  +500ms
  Heal % maxHp                      →  +1000ms
  Heal team                         →  +2000ms
  HOT (heal over time)              →  +1500ms
  Lifesteal ≤ 10% (inclus)          →  +500ms   (pas de restriction)
  Lifesteal ≥ 11%                   →  +1000ms  + restriction (coeur/etoile…)
  DOT < 15 dmg/tick                 →  +500ms
  DOT ≥ 15 dmg/tick                 →  +1000ms
  Splash                            →  +500ms
  Érosion                           →  +500ms
  AntiHeal                          →  +500ms
  Switch / Renvoi / Esquive / Recul →  +0ms

──────────────────────────────────────────────────────────────────────────────
D — SPELLPROGRESSION
──────────────────────────────────────────────────────────────────────────────
  Si le MAX des dégâts franchit un tier en montant → ajouter cooldownMs: X
  dans le patch concerné, avec X = CD du palier précédent + 200ms.
  Si deux tiers sont franchis d'un coup → +200ms une seule fois.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/ 
//#endregion 
// #region IOP ─────────────────────────────────────────────
move.pression = {
    id: 'pression',
    name: 'Pression',
    classId: 'iop',
    cooldownMs: 2200,
    effects: [
        {type: 'damage', element: 'terre', damage: {min: 16, max: 18}, target: 'enemy'},
        {type: 'buff', stat: 'erosionBonus', value: 10, duration: 3, target: 'self'}],
    spellProgression: [{lvl: 1,
                        patch: {}},
                       {lvl: 66,
                        patch: {cooldownMs: 2400, damage: {min: 20, max: 23}, buff: {duration: 4}}},
                       {lvl: 132,
                        patch: {cooldownMs: 2600, damage: {min: 26, max: 30}, buff: {duration: 5}}}],
    description: "Tape l'ennemi dans l'élément terre et augmente l'érosion de 10% sur tous les prochains sorts."
}
move.epee_divine = {
    id: 'epee_divine',
    name: 'Épée Divine',
    classId: 'iop',
    cooldownMs: 2200,
    effects: [
        {type: 'damage', element: 'air', damage: {min: 14, max: 17}, target: 'enemy'},
        {type: 'buff', stat: 'flatDamage', value: 10, duration: 2, target: 'self'}],
    spellProgression: [{lvl: 8,
                        patch: {}},
                       {lvl: 69,
                        patch: {cooldownMs: 2400, damage: {min: 19, max: 22}, buff: {value: 30, duration: 4}}},
                       {lvl: 136,
                        patch: {damage: {min: 24, max: 28}, buff: {value: 70, duration: 6}}}],
    description: "Tape l'ennemi dans l'élément air et augmente les dommages bruts pour les prochains coups."
}
move.couperet = {
    id: 'couperet',
    name: 'Couperet',
    classId: 'iop',
    cooldownMs: 2200,
    effects: [
        {type: 'damage', element: 'feu', damage: {min: 17, max: 19}, target: 'enemy'},
        {type: 'debuff', stat: 'spd', value: 10, duration: 3, target: 'enemy'}],
    spellProgression: [{lvl: 12,
                        patch: {}},
                       {lvl: 68,
                        patch: {cooldownMs: 2400, damage: {min: 22, max: 25}, buff: {value: 15, duration: 3}}},
                       {lvl: 134,
                        patch: {cooldownMs: 2600, damage: {min: 28, max: 32}, buff: {value: 20, duration: 4}}}],
    description: "Tape l'ennemi dans l'élément feu et réduit sa vitesse pour ses prochains coups."
}
move.ferveur = {
    id: 'ferveur',
    name: 'Ferveur',
    classId: 'iop',
    cooldownMs: 2200,
    effects: [
        {type: 'damage', element: 'eau', damage: {min: 9, max: 11}, target: 'enemy'},
        {type: 'shield', levelPct: 0.50, duration: 2, target: 'self'}],
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
    cooldownMs: 1700,
    effects: [{type: 'damage', element: 'neutre', damage: {min: 16,max: 18}, target: 'enemy'}],
    spellProgression: [{lvl: 20,
                        patch: {}},
                       {lvl: 72,
                        patch: {cooldownMs: 1900, damage: { min: 20, max: 23 }}},
                       {lvl: 139,
                        patch: {cooldownMs: 2100, damage: { min: 26, max: 30 }}}],
    description: "Tape l'ennemi dans l'élément neutre."
}
move.bond = {
    id: 'bond',
    name: 'Bond',
    classId: 'iop',
    cooldownMs: 2500,
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
    cooldownMs: 1700,
    effects: [{type: 'damage', element: 'terre', damage: {min: 13, max: 15}, target: 'enemy', summonMultiplier: 2}],
    spellProgression: [{lvl: 28,
                        patch: {}},
                       {lvl: 82,
                        patch: {damage: {min: 16, max: 19}}},
                       {lvl: 149,
                        patch: {cooldownMs: 1900, damage: {min: 20, max: 24}}}],
    description: "Tape l'ennemi dans l'élément terre. Les dégâts sont doublés sur les invocations."
}
move.deferlement = {
    id: 'deferlement',
    name: 'Déferlement',
    classId: 'iop',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'eau', damage: {min: 24, max: 27}, target: 'enemy', ignoreShield: true}],
    spellProgression: [{lvl: 33,
                        patch: {}},
                       {lvl: 87,
                        patch: {cooldownMs: 2200, damage: {min: 31, max: 34}}},
                       {lvl: 154,
                        patch: {cooldownMs: 2400, damage: {min: 38, max: 42}}}],
    description: "Tape l'ennemi dans l'élément eau et ignore les boucliers."
}
move.vitalite = {
    id: 'vitalite',
    name: 'Vitalité',
    classId: 'iop',
    cooldownMs: 2000,
    effects: [{type: 'buff', stat: 'maxHp', value: 200, duration: 2, target: 'self'}],
    spellProgression: [{lvl: 37,
                        patch: {}},
                       {lvl: 92,  
                        patch: {buff: { value: 400 }}},
                       {lvl: 159,
                        patch: {buff: { value: 700 }}}],
    description: "Augmente temporairement les points de vie et points de vie max du lanceur."
}
move.souffle = {
    id: 'souffle',
    name: 'Souffle',
    classId: 'iop',
    cooldownMs: 1700,
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
    cooldownMs: 2500,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 20, max: 23}, target: 'enemy', erosionRate: 0.10}],
    spellProgression: [{lvl: 45,
                        patch: {}},
                       {lvl: 102,
                        patch: {damage: {min: 26, max: 29}, erosionRate: 0.15}},
                       {lvl: 169,
                        patch: {cooldownMs: 2700, damage: {min: 32, max: 36}, erosionRate: 0.20}}],
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
    restriction: 'star',
    cooldownMs: 1700,
    effects: [{ type: 'damage', element: 'feu', damage: {min: 17, max: 19}, scalingMultipliers: [1.0, 1.2, 1.5], target: 'enemy_cycle'}],
    spellProgression: [{lvl: 53,
                        patch: {}},
                       {lvl: 112,
                        patch: {cooldownMs: 1900, damage: {min: 22, max: 25}}},
                       {lvl: 179,
                        patch: {cooldownMs: 2100, damage: {min: 27, max: 30}}}],
    description: "Tape de plus en plus fort à chaque lancés, revient a la normale au 4ème. En raid, frappe successivement l'ennemi principal, le sondaire et le tertiaire."
}
move.endurance = {
    id: 'endurance',
    name: 'Endurance',
    classId: 'iop',
    cooldownMs: 2500,
    effects: [
        {type: 'damage', element: 'eau', damage: {min: 22, max: 25}, target: 'enemy'},
        {type: 'shield', levelPct: 0.75, duration: 3, target: 'self'}],
    spellProgression: [{lvl: 57,
                        patch: {}},
                       {lvl: 117,
                        patch: {cooldownMs: 2700, damage: {min: 27, max: 30}}},
                       {lvl: 184,
                        patch: {damage: {min: 30, max: 34}}}],
    description: "Tape l'ennemi dans l'élément eau et applique un bouclier égal à 75% de son niveau pour 2 coups."
}
move.vertu = {
    id: 'vertu',
    name: 'Vertu',
    classId: 'iop',
    restriction: 'shield', 
    cooldownMs: 2500,
    effects: [{type: 'shield', levelPct: 3, duration: 2, target: 'self'}],
    spellProgression: [{lvl: 37,
                        patch: {}},
                       {lvl: 92,
                        patch: {shield: { levelPct: 4 }}},
                       {lvl: 159,
                        patch: {shield: { levelPct: 5, duration: 3 }}}],
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
                        patch: {cooldownMs: 3700, damage: {min: 37, max: 41}}}],
    description: "Inflige des dommages terre à tous les ennemis en raid."
}
move.friction = {
    id: 'friction',
    name: 'Friction',
    classId: 'iop',
    cooldownMs: 2000,
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
    cooldownMs: 3500,
    effects: [{type: 'damage', element: 'air', damage: {min: 28, max: 31}, target: 'all_enemies'}],
    spellProgression: [{lvl: 73,
                        patch: {}},
                       {lvl: 137,
                        patch: {cooldownMs: 3700, damage: {min: 36, max: 40}}}],
    description: "Frappe tous les ennemis dans l'élément air."
}
// move.precipitation = {
//     id: 'precipitation',
//     name: 'Précipitation',
//     classId: 'iop',
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
//     name: 'Épée du Destin',
//     classId: 'iop',
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
//     name: 'Emprise',
//     classId: 'iop',
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
//     name: 'Fureur',
//     classId: 'iop',
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
//     name: 'Fracture',
//     classId: 'iop',
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
//     name: 'Menace',
//     classId: 'iop',
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
//     name: 'Accumulation',
//     classId: 'iop',
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
//     name: 'Épée du Jugement',
//     classId: 'iop',
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
//     name: 'Conquête',
//     classId: 'iop',
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
//     name: 'Agitation',
//     classId: 'iop',
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
//     name: 'Sentence',
//     classId: 'iop',
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
//     name: 'Anneau Destructeur',
//     classId: 'iop',
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
//     name: 'Violence',
//     classId: 'iop',
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
//     name: 'Rassemblement',
//     classId: 'iop',
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
//     name: 'Fustigation',
//     classId: 'iop',
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
//     name: 'Vindicte',
//     classId: 'iop',
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
//     name: 'Tannée',
//     classId: 'iop',
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
//     restriction: 'star',
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
//     name: 'Massacre',
//     classId: 'iop',
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
//     name: 'Fendoir',
//     classId: 'iop',
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
//     name: 'Coup pour Coup',
//     classId: 'iop',
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
//     restriction: 'star',
//     cooldownMs: 2000,
//     effects: [{type: 'damage', element: 'air', damage: {min: 12, max: 16}, slot1BonusPct: 300, target: 'enemy'}],
//     description: "Frappe l'ennemi dans l'élément air. Si le sort est en première position, inflige 300% de dommages supplémentaires."
// }
// move.determination = {
//     id: 'determination',
//     name: 'Détermination',
//     classId: 'iop',
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
//     name: 'Tumulte',
//     classId: 'iop',
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
//     name: 'Duel',
//     classId: 'iop',
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
//     name: 'Colère de Iop',
//     classId: 'iop',
//     restriction: 'star',
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
    cooldownMs: 1700,
    effects: [{type: 'damage', element: 'air', damage: {min: 14,max: 16}, target: 'enemy'}],
    spellProgression: [{lvl: 1,
                        patch: {}},
                       {lvl: 66,
                        patch: {cooldownMs: 1900, damage: { min: 18, max: 21 }}},
                       {lvl: 132,
                        patch: {damage: { min: 23, max: 27 }}}],
    description: "Tape rapidement l'ennemi dans l'élément air."
}
move.fleche_glacee = {
    id: 'fleche_glacee',
    name: 'Flèche Glacée',
    classId: 'cra',
    cooldownMs: 2200,
    effects: [
        {type: 'damage', element: 'eau', damage: { min: 14, max: 17 }, target: 'enemy'},
        {type: 'debuff', stat: 'atk', value: 30, duration: 3, target: 'enemy'}],
    spellProgression: [{lvl: 8,
                        patch: {}},
                       {lvl: 67,
                        patch: {cooldownMs: 2400, damage: {min: 19, max: 22}, buff: {value: 70, duration: 4}}},
                       {lvl: 133,
                        patch: {damage: {min: 24, max: 28}, buff: {value: 150, duration: 5}}}],
    description: "Tape l'ennemi dans l'élément eau et retire de la puissance à l'ennemi."
}
move.fleche_cinglante = {
    id: 'fleche_cinglante',
    name: 'Flèche Cinglante',
    classId: 'cra',
    cooldownMs: 1700,
    effects: [
        {type: 'damage', element: 'terre', damage: {min: 15, max: 17}, target: 'enemy'},
        {type: 'avance', target: 'enemy'}],
    spellProgression: [{lvl: 12,
                        patch: {}},
                       {lvl: 69,
                        patch: {cooldownMs: 1900, damage: { min: 20, max: 23 }}},
                       {lvl: 136,
                        patch: {damage: { min: 25, max: 29 }}}],
    description: "Tape l'ennemi dans l'élément terre et le fait avancer d'un rang. Si l'ennemi est seul, la deuxième partie de l'effet ne se déclanche pas."
}
move.tir_repulsif = {
    id: 'tir_repulsif',
    name: 'Tir Répulsif',
    classId: 'cra',
    cooldownMs: 1700,
    effects: [
        {type: 'damage', element: 'feu', damage: {min: 17, max: 19}, target: 'enemy'},
        {type: 'recul', target: 'enemy'}],
    spellProgression: [{lvl: 16,
                        patch: {}},
                       {lvl: 68,
                        patch: {cooldownMs: 1900, damage: { min: 22, max: 25 }}},
                       {lvl: 134,
                        patch: {cooldownMs: 2100, damage: { min: 28, max: 32 }}}],
    description: "Tape l'ennemi dans l'élément feu et le fait reculer d'un rang. Si l'ennemi est seul, la deuxième partie de l'effet ne se déclanche pas."
}
move.fleche_de_dispersion = {
    id: 'fleche_de_dispersion',
    name: 'Flèche de Dispersion',
    classId: 'cra',
    cooldownMs: 2500,
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
    cooldownMs: 2500,
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
                        patch: {cooldownMs: 2200, damage: {min: 8, max: 10}, buff: { value: 15 }}},
                       {lvl: 149,
                        patch: {damage: {min: 11, max: 13}, buff: { value: 20 }}}],
    description: "Tape dans l'eau, vole de la vie et ralenti l'ennemi."
}
move.tir_de_recul = {
    id: 'tir_de_recul',
    name: 'Tir de Recul',
    classId: 'cra',
    cooldownMs: 1700,
    effects: [
        {type: 'damage', element: 'air', damage: {min: 15, max: 17}, target: 'enemy'},
        {type: 'recul', target: 'enemy'}],
    spellProgression: [{lvl: 33,
                        patch: {}},
                       {lvl: 87,
                        patch: {cooldownMs: 1900, damage: { min: 20, max: 22 }}},
                       {lvl: 154,
                        patch: {cooldownMs: 2100, damage: { min: 25, max: 38 }}}],
    description: "Tape dans l'air et fait reculer l'ennemi d'un rang. Le recul ne s'applique qu'en Raid."
}
move.balise_tactique = {
    id: 'balise_tactique',
    name: 'Balise Tactique',
    classId: 'cra',
    cooldownMs: 2000,
    effects: [{type: 'buff', stat: 'flatDamage', value: 60, duration: 1, target: 'self'}],
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
                        patch: {cooldownMs: 2200, damage: { min: 10, max: 13 }}},
                       {lvl: 164,
                        patch: {damage: { min: 14, max: 17 }}}],
    description: "Tape dans le feu, vole de la vie et applique un poison feu de 10 dégâts à l'ennemi secondaire pour 2 tours."
}
move.fleche_empoisonnee = {
    id: 'fleche_empoisonnee',
    name: 'Flèche Empoisonnée',
    classId: 'cra',
    cooldownMs: 2500,
    effects: [{type: 'dot', element: 'neutre', value: 11, duration: 2, target: 'enemy'}],
    spellProgression: [{lvl: 45,
                        patch: {}},
                       {lvl: 102,
                        patch: {cooldownMs: 3000, dot: {value: 15}}},
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
    cooldownMs: 1700,
    effects: [
        {type: 'damage',       element: 'air', damage: {min: 14, max: 16}, target: 'enemy'},
        {type: 'swap_enemies', target: 'enemy'}],
    spellProgression: [{lvl: 53,
                        patch: {}},
                       {lvl: 112,
                        patch: {cooldownMs: 1900, damage: {min: 19, max: 22}}},
                       {lvl: 179,
                        patch: {damage: {min: 23, max: 26}}}],
    description: "Tape dans l'élément air et échange les positions des ennemis secondaire et tertiaire (raid uniquement)."
}
move.oeil_de_taupe = {
    id: 'oeil_de_taupe',
    name: 'Œil de Taupe',
    classId: 'cra',
    cooldownMs: 2700,
    effects: [
        {type: 'damage',    element: 'eau', damage: {min: 15, max: 17}, target: 'all_enemies'},
        {type: 'lifesteal', ratio: 0.1, target: 'self'}],
    spellProgression: [{lvl: 57,
                        patch: {}},
                       {lvl: 117,
                        patch: {cooldownMs: 2900, damage: {min: 21, max: 23}}},
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
    cooldownMs: 3000,
    effects: [
        {type: 'damage', element: 'air', damage: {min: 29, max: 32}, splashPct: 50, target: 'enemy'}],
    spellProgression: [{lvl: 65,
                        patch: {}},
                       {lvl: 127,
                        patch: {damage: {min: 36, max: 39}}},
                       {lvl: 194,
                        patch: {cooldownMs: 3200, damage: {min: 40, max: 44}}}],
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
                        patch: {cooldownMs: 2200, damage: {min: 29, max: 31}}}],
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
//     name: "Flèche d'Expiation",
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
//     name: 'Flèche Persécutrice',
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
//     name: 'Vendetta',
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
//     name: 'Pluie de Flèches',
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
//     name: 'Flèche Ralentissante',
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
//     name: 'Flèches Enflammées',
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
//     name: 'Tir de Couverture',
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
//     name: 'Représailles',
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
//     name: 'Acuité Absolue',
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
//     name: 'Flèche Assaillante',
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
//     name: 'Tir de Barrage',
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
//     name: 'Flèche de Tourment',
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
//     name: 'Flèche Paralysante',
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
//     name: 'Tirs Perçants',
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
//     name: 'Carreaux Destructeurs',
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
//     name: 'Flèche Écrasante',
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
//     name: 'Flèches de Repli',
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
//     name: 'Flèche du Jugement',
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
//     name: 'Flèche de Rédemption',
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
//     name: 'Flèche Fulminante',
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
//     name: 'Flèche Tyrannique',
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
//     name: 'Sentinelle',
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
    cooldownMs: 1700,
    effects: [{type: 'damage', element: 'feu', damage: {min: 12,max: 14}, target: 'enemy'}],
    spellProgression: [{lvl: 1,
                        patch: {}},
                       {lvl: 66,
                        patch: {cooldownMs: 1900, damage: { min: 18, max: 21 }}},
                       {lvl: 132,
                        patch: {damage: { min: 23, max: 27 }}}],
    description: "Tape rapidement l'ennemi dans l'élément feu."
}
move.juron = {
    id: 'juron',
    name: 'Juron',
    classId: 'eniripsa',
    cooldownMs: 1700,
    effects: [{type: 'damage', element: 'terre', damage: {min: 14,max: 16}, target: 'enemy'}],
    spellProgression: [{lvl: 8,
                        patch: {}},
                       {lvl: 67,
                        patch: {cooldownMs: 1900, damage: { min: 19, max: 22 }}},
                       {lvl: 133,
                        patch: {damage: { min: 24, max: 28 }}}],
    description: "Tape l'ennemi dans l'élément terre."
}
move.mot_vampirique = {
    id: 'mot_vampirique',
    name: 'Mot Vampirique',
    classId: 'eniripsa',
    restriction: 'coeur',
    cooldownMs: 2700,
    effects: [
        {type: 'damage', element: 'eau', damage: { min: 16, max: 18 }, target: 'enemy'},
        {type: 'lifesteal', ratio: 0.2, target: 'self'}],
    spellProgression: [{ lvl: 12,
                         patch: {} },
                       {lvl: 69,
                        patch: {cooldownMs: 2900, damage: { min: 22, max: 26 }, lifesteal: { ratio: 0.40 }}},
                       {lvl: 136,
                        patch: {cooldownMs: 3100, damage: { min: 30, max: 38 },lifesteal: { ratio: 0.50 }}}],
    description: "Tape l'ennemi et soigne un pourcentage des dégâts infligés."
}
move.mot_espiegle = {
    id: 'mot_espiegle',
    name: 'Mot Espiègle',
    classId: 'eniripsa',
    cooldownMs: 1700,
    effects: [{type: 'damage', element: 'air', damage: {min: 12,max: 14}, target: 'enemy'}],
    spellProgression: [{lvl: 16,
                        patch: {}},
                       {lvl: 68,
                        patch: {cooldownMs: 1900, damage: { min: 22, max: 25 }}},
                       {lvl: 134,
                        patch: {cooldownMs: 2100, damage: { min: 28, max: 32 }}}],
    description: "Tape l'ennemi dans l'élément air."
}
move.mot_damitie = {
    id: 'mot_damitie',
    name: "Mot d'amitié",
    classId: 'eniripsa',
    cooldownMs: 3500,
    effects: [{type: 'summon', summonId: 'lapino', scale: 0.30, duration: 2, target: 'self'}],
    spellProgression: [{lvl: 20,
                        patch: {}},
                       {lvl: 72,
                        patch: {summon: { scale: 0.35 }}},
                       {lvl: 139,
                        patch: {summon: { scale: 0.40 }}}],
    description: "Invoque un lapino qui va soigner le membre ayant le moins de vie."
}
move.mot_stimulant = {
    id: 'mot_stimulant',
    name: 'Mot Stimulant',
    classId: 'eniripsa',
    cooldownMs: 2500,
    effects: [{type: 'buff', stat: 'spd', value: 20, duration: 3, target: 'self'}],
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
    cooldownMs: 2500,
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
    cooldownMs: 3000,
    effects: [
        {type: 'damage', element: 'eau', damage: { min: 18, max: 20 }, target: 'enemy'},
        {type: 'lifesteal', ratio: 0.5, target: 'self'}],
    spellProgression: [{lvl: 33,
                        patch: {}},
                       {lvl: 87,
                        patch: {damage: { min: 23, max: 26 }}},
                       {lvl: 154,
                        patch: {cooldownMs: 3200, damage: { min: 29, max: 32 }}}],
    description: "Frappe l'ennemi dans l'élément eau et se soigne de la moitié des dommages infligés."
}
move.mot_turbulent = {
    id: 'mot_turbulent',
    name: 'Mot Turbulent',
    classId: 'eniripsa',
    cooldownMs: 2500,
    effects: [{type: 'damage', element: 'feu', damage: {min: 23,max: 26}, target: 'enemy'},
              { type: 'heal', heal: {min: 23,max: 26}, target: 'ally_min_hp' }],
    spellProgression: [{lvl: 37,
                        patch: {}},
                       {lvl: 92,
                        patch: {cooldownMs: 2700, damage: {min: 29,max: 33}, heal: {min: 29,max: 33}}},
                       {lvl: 159,
                        patch: {cooldownMs: 2900, damage: {min: 36,max: 41}, heal: {min: 36,max: 41}}}],
    description: "Frappe l'ennemi dans l'élément feu et soigne l'allier ayant le moins de PV."
}
move.mot_vivifiant = {
    id: 'mot_vivifiant',
    name: 'Mot Vivifiant',
    classId: 'eniripsa',
    cooldownMs: 3500,
    effects: [{type: 'summon', summonId: 'fee_vivifiante', duration: 2, target: 'self'}],
    spellProgression: [{lvl: 41,
                        patch: {}},
                       {lvl: 97,
                        patch: {summon: { onDeath: [{ type: 'buff', stat: 'spd', value: 20, duration: 3, target: 'ally_random' }] }}},
                       {lvl: 164,
                        patch: {summon: { onDeath: [{ type: 'buff', stat: 'spd', value: 30, duration: 3, target: 'ally_random' }] }}}],
    description: "Invoque une fée qui temporise et lorsqu'elle meurt, buff la vitesse d'un allier aléatoire."
}
move.mot_farceur = {
    id: 'mot_farceur',
    name: 'Mot Farceur',
    classId: 'eniripsa',
    cooldownMs: 2200,
    effects: [{type: 'damage', element: 'air', damage: {min: 15,max: 17}, target: 'enemy'},
              { type: 'heal', heal: {min: 15,max: 17}, target: 'ally_random' },
              {type: 'avance', target: 'enemy'}],
    spellProgression: [{lvl: 45,
                        patch: {}},
                       {lvl: 102,
                        patch: {cooldownMs: 2400, damage: {min: 18,max: 20}, heal: {min: 18,max: 20}}},
                       {lvl: 169,
                        patch: {damage: {min: 22,max: 24}, heal: {min: 22,max: 24}}}],
    description: "Frappe l'enemis dans l'élément air, soigne un allier aléatoire et attire l'ennemi en raid."
}
move.peinture_de_guerre = {
    id: 'peinture_de_guerre',
    name: 'Peinture de Guerre',
    classId: 'eniripsa',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 6,max: 7}, target: 'enemy'},
              { type: 'heal', heal: {min: 6,max: 7}, target: 'ally_random' }],
    spellProgression: [{lvl: 49,
                        patch: {}},
                       {lvl: 107,
                        patch: {damage: {min: 7,max: 9},heal:{min: 7,max: 9}}},
                       {lvl: 174,
                        patch: {cooldownMs: 2200, damage: {min: 9,max: 11},heal:{min: 9,max: 11}}}],
    description: "Frappe dans l'élément terre et soigne un allier aléatoire."
}
move.mot_de_jouvence = {
    id: 'mot_de_jouvence',
    name: 'Mot de Jouvence',
    classId: 'eniripsa',
    cooldownMs: 3500,
    effects: [{type: 'summon', summonId: 'fee_de_jouvence', duration: 2, target: 'self'}],
    spellProgression: [{lvl: 53,
                        patch: {}},
                       {lvl: 112,
                        patch: {summon: { onDeath: [{ type: 'heal%maxHp_team', heal: 5 }] }}},
                       {lvl: 179,
                        patch: {summon: { onDeath: [{ type: 'heal%maxHp_team', heal: 7 }] }}}],
    description: "Invoque une fée qui temporise et lorsqu'elle meurt, soigne l'ensemble des alliers encore en vie."
}
move.cri_de_guerre = {
    id: 'cri_de_guerre',
    name: 'Cri de Guerre',
    classId: 'eniripsa',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'terre', damage: {min: 23,max: 26}, target: 'enemy'}],
    spellProgression: [{lvl: 57,
                        patch: {}},
                       {lvl: 117,
                        patch: {cooldownMs: 2200, damage: {min: 31,max: 35}}},
                       {lvl: 184,
                        patch: {cooldownMs: 2400, damage: {min: 37,max: 41}}}],
    description: "Frappe dans l'élément terre."
}
move.mot_interdit = {
    id: 'mot_interdit',
    name: 'Mot Interdit',
    classId: 'eniripsa',
    cooldownMs: 2500,
    effects: [{ type: 'damage', element: 'eau', damage: {min: 30,max: 33}, target: 'enemy'}],
    spellProgression: [{lvl: 61,
                        patch: {}},
                       {lvl: 122,
                        patch: {cooldownMs: 2700, damage: {min: 40,max: 44}}},
                       {lvl: 189,
                        patch: {damage: {min: 46,max: 50}}}],
    description: "Frappe dans l'élément eau."
}
move.mot_accablant = {
    id: 'mot_accablant',
    name: 'Mot Accablant',
    classId: 'eniripsa',
    cooldownMs: 3500,
    effects: [{type: 'summon', summonId: 'fee_accablante', duration: 2, target: 'self'}],
    spellProgression: [{lvl: 65,
                        patch: {}},
                       {lvl: 127,
                        patch: {summon: { onDeath: [{ type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }] }}},
                       {lvl: 194,
                        patch: {summon: { onDeath: [{ type: 'debuff', stat: 'spd', value: 30, duration: 3, target: 'enemy' }] }}}],
    description: "Invoque une fée qui temporise et lorsqu'elle meurt, debuff la vitesse de l'ennemi."
}
move.chapardage = {
    id: 'chapardage',
    name: 'Chapardage',
    classId: 'eniripsa',
    restriction: 'coeur',
    cooldownMs: 2700,
    effects: [
        {type: 'damage', element: 'feu', damage: { min: 15, max: 17 }, target: 'enemy'},
        {type: 'lifesteal', ratio: 0.5, target: 'self'}],
    spellProgression: [{lvl: 69,
                        patch: {}},
                       {lvl: 131,
                        patch: {cooldownMs: 2900, damage: { min: 18, max: 20 }}},
                       {lvl: 198,
                        patch: {damage: { min: 20, max: 22 }}}],
    description: "Frappe l'ennemi dans l'élément feu et se soigne de la moitié des dommages infligés."
}
move.mot_fleuri = {
    id: 'mot_fleuri',
    name: 'Mot Fleuri',
    classId: 'eniripsa',
    cooldownMs: 3500,
    effects: [
        {type: 'damage', element: 'air', damage: { min: 26, max: 29 }, target: 'enemy'},
        { type: 'hot', heal: { min: 26, max: 29 }, duration : 2, target: 'ally_random' }],
    spellProgression: [{lvl: 73,
                        patch: {}},
                       {lvl: 137,
                        patch: {cooldownMs: 3700, damage: { min: 33, max: 37 }, heal: { min: 33, max: 37 }}}],
    description: "Frappe l'ennemi dans l'élément air et soigne un allier aléatoire pendant 2 tours."
}
// move.mot_denvol = {
//     id: 'mot_denvol',
//     name: "Mot d'Envol",
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
//     name: 'Pinceau Tribal',
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
//     name: 'Cryothérapie',
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
//     name: 'Mot de Reconstitution',
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
//     name: 'Mot Malicieux',
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
//     name: 'Cri Assourdissant',
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
//     name: 'Sanglots',
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
//     name: 'Onguent Ancestral',
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
//     name: 'Mot Alchimique',
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
//     name: 'Mot de Déclin',
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
//     name: 'Scalpel',
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
//     name: 'Vacarme',
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
//     name: 'Mot Furieux',
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
//     name: 'Mot Galvanisant',
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
//     name: 'Mot Défendu',
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
//     name: 'Mot Secret',
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
//     name: 'Mot Déprimant',
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
//     name: 'Mot Rituel',
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
//     name: 'Mot Exsangue',
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
//     name: 'Mot Décourageant',
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
//     name: 'Bosquet Enchanté',
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
//     name: 'Chœur Strident',
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
//     name: 'Murmure',
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
    cooldownMs: 1500,
    effects: [{ type: 'damage', element: 'eau', damage: { min: 7, max: 9 }, target: 'enemy' }],
    spellProgression: [{lvl: 1,
                        patch: {}},
                       {lvl: 66,
                        patch: {cooldownMs: 1700, damage: { min: 10, max: 12 }}},
                       {lvl: 132,
                        patch: {damage: { min: 13, max: 15 }}}],
    description: "Frappe rapidement l'ennemi dans l'élément eau."
}
move.roulage_de_pelle = {
    id: 'roulage_de_pelle',
    name: 'Roulage de Pelle',
    classId: 'enutrof',
    cooldownMs: 1700,
    effects: [{ type: 'damage', element: 'feu', damage: { min: 11, max: 13 }, target: 'enemy' }],
    spellProgression: [{lvl: 8,
                        patch: {}},
                       {lvl: 67,
                        patch: {damage: { min: 15, max: 18 }}},
                       {lvl: 133,
                        patch: {cooldownMs: 1900, damage: { min: 19, max: 23 }}}],
    description: "Frappe l'ennemi dans l'élément feu."
}
move.force_de_l_age = {
    id: 'force_de_l_age',
    name: "Force de l'Âge",
    classId: 'enutrof',
    cooldownMs: 2500,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 10, max: 20 }, target: 'enemy' },
              { type: 'buff', stat: 'spd', value: 20, duration: 2, target: 'self' }],
    spellProgression: [{ lvl: 12,
                         patch: {} },
                       {lvl: 69,
                        patch: {damage: { min: 22, max: 25 }}},
                       {lvl: 136,
                        patch: {cooldownMs: 2700, damage: { min: 28, max: 32 }}}],
    description: "Frappe l'ennemi dans l'élément terre et augmente sa propre vitesse de 20%."
}
move.opportunite = {
    id: 'opportunite',
    name: 'Opportunité',
    classId: 'enutrof',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'air', damage: { min: 8, max: 10 }, target: 'enemy' },
              { type: 'buff', stat: 'atk', value: 30, duration: 1, target: 'self' }],
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
    effects: [{ type: 'summon', summonId: 'sac_anime', scale: 0.30, duration: 8, target: 'self' }],
    spellProgression: [{lvl: 20,
                        patch: {}},
                       {lvl: 72,
                        patch: { summon: { scale: 0.40 } }},
                       {lvl: 139,
                        patch: { summon: { scale: 0.50 } }}],
    description: "Invoque un sac animé qui permet de prendre les prochains dégats infligés à la place de l'équipe."
}
move.ruee_vers_l_or = {
    id: 'ruee_vers_l_or',
    name: "Ruée vers l'Or",
    classId: 'enutrof',
    cooldownMs: 2500,
    effects: [{ type: 'buff', stat: 'atk', value: 100, duration: 1, target: 'self' },
              { type: 'buff', stat: 'spd', value: 20,  duration: 2, delay: 2, target: 'self' }],
    spellProgression: [{lvl: 24,
                        patch: {}},
                       {lvl: 77,
                        patch: { buff: [{ stat: 'atk', value: 200 }, { stat: 'spd', value: 25 }] }},
                       {lvl: 144,
                        patch: { buff: [{ stat: 'atk', value: 350, duration: 2 }, { stat: 'spd', value: 30 }] }}],
    description: "Augmente la puissance d'attaque dans un premier temps puis la vitesse du lanceur pour plusieurs tours."
}
move.boite_de_pandore = {
    id: 'boite_de_pandore',
    name: 'Boîte de Pandore',
    classId: 'enutrof',
    cooldownMs: 3000,
    effects: [{ type: 'heal%maxHp', heal: 10, target: 'self' }],
    spellProgression: [{lvl: 28,
                        patch: {}},
                       {lvl: 82,
                        patch: {}},
                       {lvl: 149,
                        patch: {}}],
    description: "Une boite que l'on ouvre que pour se soigner en urgence."
}
move.remblai = {
    id: 'remblai',
    name: 'Remblai',
    classId: 'enutrof',
    cooldownMs: 1700,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 12, max: 14 }, target: 'enemy', summonMultiplier: 1.2 }],
    spellProgression: [{lvl: 33,
                        patch: {}},
                       {lvl: 87,
                        patch: {damage: { min: 16, max: 18 }, summonMultiplier: 1.4}},
                       {lvl: 154,
                        patch: {cooldownMs: 1900, damage: { min: 20, max: 22 }, summonMultiplier: 1.7}}],
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
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'air', damage: { min: 14, max: 16 }, target: 'enemy' },
              { type: 'debuff', stat: 'spd', value: 10, duration: 7, target: 'enemy' }],
    spellProgression: [{lvl: 41,
                        patch: {}},
                       {lvl: 97,
                        patch: {cooldownMs: 2400, damage: { min: 18, max: 20 }}},
                       {lvl: 164,
                        patch: {damage: { min: 23, max: 25 }}}],
    description: "Frappe dans l'élément air et retire 10% de vitesse à l'ennemi."
}
move.pelle_animee = {
    id: 'pelle_animee',
    name: 'Pelle Animée',
    classId: 'enutrof',
    cooldownMs: 3500,
    effects: [{type: 'summon', summonId: 'pelle_animee', scale: 0.15, duration: 3, target: 'self'}],
    spellProgression: [{lvl: 45,
                        patch: {}},
                       {lvl: 102,
                        patch: { summon: { scale: 0.25 } }},
                       {lvl: 169,
                        patch: { summon: { scale: 0.35 } }}],
    description: "Invoque une pelle animée qui pousse les ennemis et encaisse les dommages infligés à l'équipe."
}
move.avarice = {
    id: 'avarice',
    name: 'Avarice',
    classId: 'enutrof',
    cooldownMs: 2500,
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
    cooldownMs: 2500,
    effects: [{ type: 'damage', element: 'eau', damage: { min: 21, max: 23 }, target: 'enemy' },
              { type: 'debuff', stat: 'atk', value: 50, duration: 7, target: 'enemy' }],
    spellProgression: [{lvl: 53,
                        patch: {}},
                       {lvl: 112,
                        patch: {cooldownMs: 2700, damage: { min: 27, max: 31 }}},
                       {lvl: 179,
                        patch: {damage: { min: 33, max: 37 }}}],
    description: "Frappe dans l'élément eau et retire 50 de puissance à l'ennemi."
}
move.maladresse = {
    id: 'maladresse',
    name: 'Maladresse',
    classId: 'enutrof',
    restriction: 'arrow',   // →
    cooldownMs: 2500,
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
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'feu', damage: { min: 17, max: 19 }, target: 'enemy' },
              { type: 'buffDrain', value: 1, target: 'enemy' }],
    spellProgression: [{lvl: 61,
                        patch: {}},
                       {lvl: 122,
                        patch: {cooldownMs: 2400, damage: { min: 23, max: 25 }}},
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
                        patch: {cooldownMs: 2200, damage: { min: 32, max: 36 }, summonMultiplier: 1.4}},
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
    cooldownMs: 3000,
    effects: [{ type: 'damage', element: 'eau', damage: { min: 31, max: 34 }, target: 'enemy'},
              { type: 'recul', target: 'enemy'},
              { type: 'debuff', stat: 'atk', value: 10, duration: 3, target: 'enemy' }],
    spellProgression: [{lvl: 73,
                        patch: {}},
                       {lvl: 137,
                        patch: {cooldownMs: 3200, damage: { min: 40, max: 44 }}}],
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
//     restriction: 'star',
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
//     restriction: 'star',
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
//     restriction: 'star',
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
//     restriction: 'star',
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
    cooldownMs: 1700,
    effects: [{ type: 'damage', element: 'feu', damage: { min: 15, max: 17 }, target: 'enemy' }],
    spellProgression: [{lvl: 1,
                        patch: {}},
                       {lvl: 66,
                        patch: {cooldownMs: 1900, damage: { min: 20, max: 23 }}},
                       {lvl: 132,
                        patch: {damage: { min: 26, max: 29 }}}],
    description: "Frappe dans l'élément feu et pose l'élément feu."
}
move.stalagmite = {
    id: 'stalagmite',
    name: 'Stalagmite',
    classId: 'huppermage',
    cooldownMs: 1700,
    effects: [{ type: 'damage', element: 'eau', damage: { min: 17, max: 19 }, target: 'enemy' }],
    spellProgression: [{lvl: 8,
                        patch: {}},
                       {lvl: 67,
                        patch: {cooldownMs: 1900, damage: { min: 23, max: 25 }}},
                       {lvl: 133,
                        patch: {cooldownMs: 2100, damage: { min: 29, max: 32 }}}],
    description: "Frappe dans l'élément eau et pose l'élément eau."
}
move.onde_sismique = {
    id: 'onde_sismique',
    name: 'Onde Sismique',
    classId: 'huppermage',
    cooldownMs: 1700,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 15, max: 17 }, target: 'enemy' }],
    spellProgression: [{ lvl: 12,
                         patch: {} },
                       {lvl: 69,
                        patch: {cooldownMs: 1900, damage: { min: 20, max: 22 }}},
                       {lvl: 136,
                        patch: {damage: { min: 25, max: 28 }}}],
    description: "Frappe dans l'élément terre et pose l'élément terre."
}
move.ether = {
    id: 'ether',
    name: 'Éther',
    classId: 'huppermage',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'air', damage: { min: 18, max: 20 }, target: 'enemy' }],
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
    cooldownMs: 2500,
    effects: [{ type: 'absorbElementDmg', damage: 9, target: 'enemy' },
              { type: 'lifesteal', ratio: 0.2, target: 'self' }],
    spellProgression: [{lvl: 20,
                        patch: {}},
                       {lvl: 72,
                        patch: {cooldownMs: 2700, damage: 12}},
                       {lvl: 139,
                        patch: {damage: 15}}],
    description: "Frappe dans l'élément posé sur l'ennemi et le consomme pour se régénérer."
}
move.drain_elementaire = {
    id: 'drain_elementaire',
    name: 'Drain Élémentaire',
    classId: 'huppermage',
    cooldownMs: 2200,
    effects: [{ type: 'absorbElementDmg', damage: { min: 15, max: 17 }, target: 'enemy' },
              { type: 'buff', stat: 'atk', value: 60, duration: 1, target: 'self' },
              { type: 'debuff', stat: 'atk', value: 30, duration: 2, target: 'enemy' }],
    spellProgression: [{lvl: 24,
                        patch: {}},
                       {lvl: 77,
                        patch: {cooldownMs: 2400, damage: { min: 21, max: 23 }, buff: {value: 120 }, debuff: {value: 60 }}},
                       {lvl: 144,
                        patch: {damage: { min: 26, max: 29 }, buff: {value: 200 }, debuff: {value: 120 }}}],
    description: "Frappe dans l'élément posé sur l'ennemi et le consomme. Vole de la puissance à l'ennemi pour se l'appliquer pour 1 tours."
}
move.meteore = {
    id: 'meteore',
    name: 'Météore',
    classId: 'huppermage',
    cooldownMs: 1700,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 17, max: 19 }, target: 'enemy' },
              {type: 'recul', target: 'enemy'}],
    spellProgression: [{lvl: 28,
                        patch: {}},
                       {lvl: 82,
                        patch: {cooldownMs: 1900, damage: { min: 22, max: 24 }}},
                       {lvl: 149,
                        patch: {cooldownMs: 2100, damage: { min: 27, max: 30 }}}],
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
                        patch: {cooldownMs: 2200, damage: { min: 29, max: 32 }}}],
    description: "Frappe dans l'élément air et avance de position l'ennemi."
}
move.cycle_elementaire = {
    id: 'cycle_elementaire',
    name: 'Cycle Élémentaire',
    classId: 'huppermage',
    cooldownMs: 1000,
    effects: [{ type: 'cycleElement', target: 'enemy' }],
    spellProgression: [{lvl: 37,
                        patch: {}},
                       {lvl: 92,
                        patch: {}},
                       {lvl: 159,
                        patch: {}}],
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
                        patch: {cooldownMs: 2200, damage: { min: 29, max: 32 }}}],
    description: "Frappe dans l'élément feu et switch les ennemis de postion."
}
move.deluge = {
    id: 'deluge',
    name: 'Déluge',
    classId: 'huppermage',
    cooldownMs: 1700,
    effects: [{ type: 'damage', element: 'eau', damage: { min: 17, max: 19 }, target: 'enemy' },
              { type: 'switch', value: 1, target: 'enemy' }],
    spellProgression: [{lvl: 45,
                        patch: {}},
                       {lvl: 102,
                        patch: {cooldownMs: 1900, damage: { min: 22, max: 24 }}},
                       {lvl: 169,
                        patch: {cooldownMs: 2100, damage: { min: 27, max: 30 }}}],
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
                        patch: {cooldownMs: 2200, damage: { min: 30, max: 33 }}}],
    description: "Frappe dans l'élément actif sur l'ennemi, puis pose l'élément suivant (Terre→Eau→Feu→Air→Terre)."
}
move.contribution = {
    id: 'contribution',
    name: 'Contribution',
    classId: 'huppermage',
    cooldownMs: 2000,
    effects: [{type: 'consumeElementBuff', target: 'self',
        onElement: {terre: { stat: 'spd',        value: 10, duration: 3 },
                    feu:   { shield: true, levelPct: 2,      duration: 3 },
                    eau:   { stat: 'atk',        value: 100, duration: 3 },
                    air:   { stat: 'flatDamage', value: 30,  duration: 3 }}}],
    spellProgression: [{lvl: 53,
                        patch: {}},
                       {lvl: 112,
                        patch: {}},
                       {lvl: 179,
                        patch: {}}],
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
                        patch: {cooldownMs: 2200, damage: { min: 28, max: 31 }}},
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
                        patch: {cooldownMs: 2200, damage: { min: 28, max: 32 }}},
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
                        patch: {cooldownMs: 2200, damage: { min: 26, max: 30 }}},
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
                        patch: {cooldownMs: 2200, damage: { min: 29, max: 32 }}},
                       {lvl: 198,
                        patch: {damage: { min: 32, max: 36 }}}],
    description: "Frappe dans l'élément terre et pose l'élément terre."
}
move.bouclier_elementaire = {
    id: 'bouclier_elementaire',
    name: 'Bouclier Élémentaire',
    classId: 'huppermage',
    cooldownMs: 2000,
    effects: [{type: 'consumeElementBuff', target: 'self',
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

// #region Ecaflip ─────────────────────────────────────────
move.pile_ou_face = {
    id: 'pile_ou_face',
    name: 'Pile ou Face',
    classId: 'ecaflip',
    cooldownMs: 2000,
    effects: [{type: 'random', choices: [{ chance: 0.70, effects: [{ type: 'damage', element: 'terre', damage: { min: 20, max: 23 }, target: 'enemy' }] },
                                         { chance: 0.30, effects: [{ type: 'heal', heal: { min: 20, max: 23 }, target: 'enemy' }]}]}],
    spellProgression: [
        { lvl: 1,   patch: {} },
        { lvl: 66,  patch: { effects: [{ type: 'random', choices: [
            { chance: 0.70, effects: [{ type: 'damage', element: 'terre', damage: { min: 26, max: 29 }, target: 'enemy' }] },
            { chance: 0.30, effects: [{ type: 'heal',   heal:   { min: 26, max: 29 }, target: 'enemy' }] }
        ]}] } },
        { lvl: 132, patch: { cooldownMs: 2200, effects: [{ type: 'random', choices: [
            { chance: 0.70, effects: [{ type: 'damage', element: 'terre', damage: { min: 31, max: 34 }, target: 'enemy' }] },
            { chance: 0.30, effects: [{ type: 'heal',   heal:   { min: 31, max: 34 }, target: 'enemy' }] }
        ]}] } }
    ],
    description: "70% de chances d'infliger des dégâts Terre, 30% de chances de soigner l'ennemi."
}
move.reflexes = {
    id: 'reflexes',
    name: 'Réflexes',
    classId: 'ecaflip',
    cooldownMs: 2200,
    effects: [{type: 'damage', element: 'air', damage: {min: 8, max: 10}, target: 'enemy'},
              {type: 'buff', stat: 'spd', value: 20, duration: 2, target: 'self'}],
    spellProgression: [
        { lvl: 8,   patch: {} },
        { lvl: 67,  patch: { damage: { min: 11, max: 13 }, buff: { value: 30, duration: 2 } } },
        { lvl: 133, patch: { damage: { min: 14, max: 17 }, buff: { value: 30, duration: 3 } } }
    ],
    description: "Inflige des dégâts Air et augmente la vitesse du lanceur pendant 2 tours."
}
move.yams = {
    id: 'yams',
    name: 'Yams',
    classId: 'ecaflip',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'eau', damage: {min: 1, max: 6}, target: 'enemy'},
              {type: 'buff', stat: 'critChance', value: {min: 3, max: 18}, duration: 2, target: 'self'}],
    spellProgression: [{ lvl: 12, 
                         patch: {} },
                       {lvl: 69,
                        patch: {cooldownMs: 2200, damage: {min: 2, max: 12}}},
                       {lvl: 136,
                        patch: {cooldownMs: 2200, damage: {min: 3, max: 18}}}],
    description: "Frappe dans l'élément Eau et augmente aléatoirement sa chance de critique pendant 2 tours."
}
move.topkaj = {
    id: 'topkaj',
    name: 'Topkaj',
    classId: 'ecaflip',
    cooldownMs: 2200,
    effects: [{type: 'random', choices: [{ chance: 0.60, effects: [{ type: 'damage', element: 'feu', damage: { min: 7, max: 13 }, target: 'enemy' }] },
                                         { chance: 0.40, effects: [{ type: 'heal', heal: { min: 7, max: 13 }, target: 'self' }]}]}],
    spellProgression: [
        { lvl: 16,  patch: {} },
        { lvl: 68,  patch: { effects: [{ type: 'random', choices: [
            { chance: 0.60, effects: [{ type: 'damage', element: 'feu', damage: { min: 13, max: 19 }, target: 'enemy' }] },
            { chance: 0.40, effects: [{ type: 'heal',   heal:   { min: 13, max: 19 }, target: 'self' }] }
        ]}] } },
        { lvl: 134, patch: { cooldownMs: 2400, effects: [{ type: 'random', choices: [
            { chance: 0.60, effects: [{ type: 'damage', element: 'feu', damage: { min: 16, max: 22 }, target: 'enemy' }] },
            { chance: 0.40, effects: [{ type: 'heal',   heal:   { min: 16, max: 22 }, target: 'self' }] }
        ]}] } }
    ],
    description: "60% de chances d'infliger des dégâts Feu, 40% de chances de se soigner."
}
move.bonne_pioche = {
    id: 'bonne_pioche',
    name: 'Bonne Pioche',
    classId: 'ecaflip',
    cooldownMs: 2200,
    effects: [{ type: 'random', choices: [
        { chance: 0.25, effects: [{ type: 'best_element_damage', damage: { min: 16, max: 19 }, target: 'enemy' }] },
        { chance: 0.25, effects: [{ type: 'buff', stat: 'atk',        value: 80, duration: 3, target: 'self' }] },
        { chance: 0.25, effects: [{ type: 'buff', stat: 'critChance',  value: 10, duration: 3, target: 'self' }] },
        { chance: 0.25, effects: [{ type: 'buff', stat: 'spd',         value: 15, duration: 3, target: 'self' }] }
    ]}],
    spellProgression: [{lvl: 20,
                        patch: {}},
                       {lvl: 72,
                        patch: {}},
                       {lvl: 139,
                        patch: {}}],
    description: "Tire une carte au hasard : dégâts dans le meilleur élément, ou bonus d'Attaque, de Chance critique ou de Vitesse pendant 3 tours."
}
move.bond_du_felin = {
    id: 'bond_du_felin',
    name: 'Bond du Félin',
    classId: 'ecaflip',
    cooldownMs: 2500,
    effects: [{type: 'buff', stat: 'spd', value: 10, duration: 2, target: 'self'}],
    spellProgression: [{lvl: 24,
                        patch: {}},
                       {lvl: 77,
                        patch: {buff: { value: 20 }}},
                       {lvl: 144,
                        patch: {buff: { value: 30 }}}],
    description: "Augmente la vitesse du lanceur pour 2 tours."
}
move.jass = {
    id: 'jass',
    name: 'Jass',
    classId: 'ecaflip',
    cooldownMs: 2200,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 16, max: 18 }, target: 'enemy' },
        { type: 'debuff', stat: 'critResPct', value: 20, duration: 2, target: 'enemy' }
    ],
    spellProgression: [
        { lvl: 28,  patch: {} },
        { lvl: 82,  patch: { cooldownMs: 2400, damage: { min: 21, max: 23 } } },
        { lvl: 149, patch: { cooldownMs: 2400, damage: { min: 26, max: 29 } } }
    ],
    description: "Occasionne des dommages Air et réduit les résistances critiques de l'ennemi pendant 2 tours."
}
move.perception = {
    id: 'perception',
    name: 'Perception',
    classId: 'ecaflip',
    cooldownMs: 3000,
    effects: [
        { type: 'heal%maxHp', value: 5, target: 'all_allies' },
        { type: 'buff', stat: 'damageReductionPct', value: 30, duration: 1, target: 'self' }
    ],
    spellProgression: [
        { lvl: 33,  patch: {} },
        { lvl: 87,  patch: { healPct: 7, buff: { stat: 'damageReductionPct', value: 35, duration: 1 } } },
        { lvl: 154, patch: { healPct: 10, buff: { stat: 'damageReductionPct', value: 40, duration: 1 } } }
    ],
    description: "Soigne tous les alliés de 5% de leurs PV max et réduit les dégâts reçus de 30% pendant 1 tour."
}
move.baraka = {
    id: 'baraka',
    name: 'Baraka',
    classId: 'ecaflip',
    cooldownMs: 2200,
    effects: [{type: 'damage', element: 'eau', damage: {min: 16, max: 18}, target: 'enemy'},
              {type: 'debuff', stat: 'critChance', value: {min: 4, max: 10}, duration: 3, target: 'self'}],
    spellProgression: [{lvl: 37,
                        patch: {}},
                       {lvl: 92,
                        patch: {cooldownMs: 2400, damage: {min: 20, max: 23}}},
                       {lvl: 159,
                        patch: {cooldownMs: 2600, damage: {min: 27, max: 30}}}],
    description: "Frappe dans l'élément Eau au risque de perdre aléatoirement de la Chance critique pendant 3 tours."
}
move.chateau_de_cartes = {
    id: 'chateau_de_cartes',
    name: 'Château de Cartes',
    classId: 'ecaflip',
    cooldownMs: 2000,
    effects: [{ type: 'random', choices: [
        { chance: 0.10, effects: [{ type: 'shield', levelPct: 3,    duration: 2, target: 'self' }] },
        { chance: 0.20, effects: [{ type: 'shield', levelPct: 2,    duration: 2, target: 'self' }] },
        { chance: 0.30, effects: [{ type: 'shield', levelPct: 1,    duration: 2, target: 'self' }] },
        { chance: 0.40, effects: [{ type: 'shield', levelPct: 0.50, duration: 2, target: 'self' }] }
    ]}],
    spellProgression: [{lvl: 41,
                        patch: {}},
                       {lvl: 97,
                        patch: {}},
                       {lvl: 164,
                        patch: {}}],
    description: "Érige un bouclier aléatoire pendant 2 tours. Plus le tirage est favorable, plus le bouclier est puissant."
}
move.blakjak = {
    id: 'blakjak',
    name: 'Blakjak',
    classId: 'ecaflip',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'feu', damage: {min: 17, max: 20}, target: 'enemy'}],
    spellProgression: [{lvl: 45,
                        patch: {}},
                       {lvl: 102,
                        patch: {damage: {min: 22, max: 25}}},
                       {lvl: 169,
                        patch: {cooldownMs: 2200, damage: {min: 27, max: 30}}}],
    description: "Frappe dans l'élément Feu."
}
move.roulette = {
    id: 'roulette',
    name: 'Roulette',
    classId: 'ecaflip',
    cooldownMs: 3000,
    effects: [{ type: 'random', choices: [
        { chance: 0.25, effects: [
            { type: 'buff', stat: 'finalDamagePct',     value: 20, duration: 2, target: 'all_allies' },
            { type: 'buff', stat: 'finalDamagePct',     value: 20, duration: 2, target: 'all_enemies' }
        ]},
        { chance: 0.25, effects: [
            { type: 'buff', stat: 'spd',                value: 20, duration: 2, target: 'all_allies' },
            { type: 'buff', stat: 'spd',                value: 20, duration: 2, target: 'all_enemies' }
        ]},
        { chance: 0.25, effects: [
            { type: 'buff', stat: 'critChance',         value: 20, duration: 2, target: 'all_allies' },
            { type: 'buff', stat: 'critChance',         value: 20, duration: 2, target: 'all_enemies' }
        ]},
        { chance: 0.25, effects: [
            { type: 'buff', stat: 'damageReductionPct', value: 20, duration: 2, target: 'all_allies' },
            { type: 'buff', stat: 'damageReductionPct', value: 20, duration: 2, target: 'all_enemies' }
        ]}
    ]}],
    description: "Applique aléatoirement un buff à tous les combattants (alliés ET ennemi) pendant 2 tours."
}
move.belote = {
    id: 'belote',
    name: 'Belote',
    classId: 'ecaflip',
    cooldownMs: 2000,
    effects: [{type: 'damage', element: 'terre', damage: {min: 17, max: 20}, target: 'enemy'}],
    spellProgression: [{lvl: 53,
                        patch: {}},
                       {lvl: 112,
                        patch: {damage: {min: 22, max: 25}}},
                       {lvl: 179,
                        patch: {cooldownMs: 2200, damage: {min: 27, max: 30}}}],
    description: "Frappe dans l'élément Terre."
}
move.tromperie = {
    id: 'tromperie',
    name: 'Tromperie',
    classId: 'ecaflip',
    restriction: 'coeur',
    cooldownMs: 2700,
    effects: [
        { type: 'damage', elements: ['terre', 'feu', 'eau', 'air'], damage: { min: 11, max: 12 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.3, target: 'self' }
    ],
    spellProgression: [{lvl: 57,
                        patch: {}},
                       {lvl: 117,  
                        patch: {}},
                       {lvl: 184,
                        patch: {}}],
    description: "Frappe dans un élément aléatoire et vole une partie des dégâts infligés."
}
move.pelotage = {
    id: 'pelotage',
    name: 'Pelotage',
    classId: 'ecaflip',
    cooldownMs: 1700,
    effects: [{type: 'damage', element: 'feu', damage: {min: 17, max: 19}, target: 'enemy'},
              { type: 'switch', value: 1, target: 'enemy' }],
    spellProgression: [{lvl: 61,
                        patch: {}},
                       {lvl: 122,
                        patch: {cooldownMs: 1900, damage: {min: 23, max: 25}}},
                       {lvl: 189,
                        patch: {cooldownMs: 2100, damage: {min: 29, max: 32}}}],
    description: "Frappe dans l'élément Feu et force le changement de membre actif."
}
// move.griffe_invocatrice = {
//     id: 'griffe_invocatrice',
//     name: 'Griffe Invocatrice',
//     classId: 'ecaflip',
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
// move.esprit_felin = {
//     id: 'esprit_felin',
//     name: 'Esprit Félin',
//     classId: 'ecaflip',
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
// move.odorat = {
//     id: 'odorat',
//     name: 'Odorat',
//     classId: 'ecaflip',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 73,
//                         patch: {}},
//                        {lvl: 137,  
//                         patch: {}}],
//     description: ""
// }
// move.coussinets = {
//     id: 'coussinets',
//     name: 'Coussinets',
//     classId: 'ecaflip',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,  
//                         patch: {}}],
//     description: ""
// }
// move.seconde_chance = {
//     id: 'seconde_chance',
//     name: 'Seconde Chance',
//     classId: 'ecaflip',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,  
//                         patch: {}}],
//     description: ""
// }
// move.felintion = {
//     id: 'felintion',
//     name: 'Félintion',
//     classId: 'ecaflip',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,  
//                         patch: {}}],
//     description: ""
// }
// move.bluff = {
//     id: 'bluff',
//     name: 'Bluff',
//     classId: 'ecaflip',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,  
//                         patch: {}}],
//     description: ""
// }
// move.lapement = {
//     id: 'lapement',
//     name: 'Lapement',
//     classId: 'ecaflip',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,  
//                         patch: {}}],
//     description: ""
// }
// move.langue_rapeuse = {
//     id: 'langue_rapeuse',
//     name: 'Langue Râpeuse',
//     classId: 'ecaflip',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,  
//                         patch: {}}],
//     description: ""
// }
// move.griffe_joueuse = {
//     id: 'griffe_joueuse',
//     name: 'Griffe Joueuse',
//     classId: 'ecaflip',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,  
//                         patch: {}}],
//     description: ""
// }
// move.fanfaronnade = {
//     id: 'fanfaronnade',
//     name: 'Fanfaronnade',
//     classId: 'ecaflip',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,  
//                         patch: {}}],
//     description: ""
// }
// move.redistribution = {
//     id: 'redistribution',
//     name: 'Redistribution',
//     classId: 'ecaflip',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,  
//                         patch: {}}],
//     description: ""
// }
// move.entrechat = {
//     id: 'entrechat',
//     name: 'Entrechat',
//     classId: 'ecaflip',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,  
//                         patch: {}}],
//     description: ""
// }
// move.infortune = {
//     id: 'infortune',
//     name: 'Infortune',
//     classId: 'ecaflip',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,  
//                         patch: {}}],
//     description: ""
// }
// move.predation = {
//     id: 'predation',
//     name: 'Prédation',
//     classId: 'ecaflip',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,  
//                         patch: {}}],
//     description: ""
// }
// move.toupet = {
//     id: 'toupet',
//     name: 'Toupet',
//     classId: 'ecaflip',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.bonne_etoile = {
//     id: 'bonne_etoile',
//     name: 'Bonne Étoile',
//     classId: 'ecaflip',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.destin_decaflip = {
//     id: 'destin_decaflip',
//     name: 'Destin d'Écaflip',
//     classId: 'ecaflip',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.tarot_decaflip = {
//     id: 'tarot_decaflip',
//     name: 'Tarot d'Écaflip',
//     classId: 'ecaflip',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.peril = {
//     id: 'peril',
//     name: 'Péril',
//     classId: 'ecaflip',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.tout_ou_rien = {
//     id: 'tout_ou_rien',
//     name: 'Tout ou Rien',
//     classId: 'ecaflip',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.griffe_de_ceangal = {
//     id: 'griffe_de_ceangal',
//     name: 'Griffe de Ceangal',
//     classId: 'ecaflip',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.caresse_invocatrice = {
//     id: 'caresse_invocatrice',
//     name: 'Caresse Invocatrice',
//     classId: 'ecaflip',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.kraps = {
//     id: 'kraps',
//     name: 'Kraps',
//     classId: 'ecaflip',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.roue_de_la_fortune = {
//     id: 'roue_de_la_fortune',
//     name: 'Roue de la Fortune',
//     classId: 'ecaflip',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.feulement = {
//     id: 'feulement',
//     name: 'Feulement',
//     classId: 'ecaflip',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.neuf_vies = {
//     id: 'neuf_vies',
//     name: 'Neuf Vies',
//     classId: 'ecaflip',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.mesaventure = {
//     id: 'mesaventure',
//     name: 'Mésaventure',
//     classId: 'ecaflip',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.rekop = {
//     id: 'rekop',
//     name: 'Rekop',
//     classId: 'ecaflip',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// #endregion

// #region osamodas ─────────────────────────────────────────
// move.cri_du_corbac = {
//     id: 'cri_du_corbac',
//     name: 'Cri du Corbac',
//     classId: 'osamodas',
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
// move.pics_du_prespic = {
//     id: 'pics_du_prespic',
//     name: 'Pics du Prespic',
//     classId: 'osamodas',
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
// move.dents_du_piranya = {
//     id: 'dents_du_piranya',
//     name: 'Dents du Piranya',
//     classId: 'osamodas',
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
// move.cri_de_lours = {
//     id: 'cri_de_lours',
//     name: 'Cri de l'Ours',
//     classId: 'osamodas',
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
// move.fouet = {
//     id: 'fouet',
//     name: 'Fouet',
//     classId: 'osamodas',
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
// move.tofu = {
//     id: 'tofu',
//     name: 'Tofu',
//     classId: 'osamodas',
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
// move.bouftou = {
//     id: 'bouftou',
//     name: 'Bouftou',
//     classId: 'osamodas',
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
// move.crapipou = {
//     id: 'crapipou',
//     name: 'Crapipou',
//     classId: 'osamodas',
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
// move.dragoune = {
//     id: 'dragoune',
//     name: 'Dragoune',
//     classId: 'osamodas',
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
// move.cortege_sauvage = {
//     id: 'cortege_sauvage',
//     name: 'Cortège Sauvage',
//     classId: 'osamodas',
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
// move.piqure_motivante = {
//     id: 'piqure_motivante',
//     name: 'Piqûre Motivante',
//     classId: 'osamodas',
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
// move.saute_granouille = {
//     id: 'saute_granouille',
//     name: 'Saute-granouille',
//     classId: 'osamodas',
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
// move.souffle_draconique = {
//     id: 'souffle_draconique',
//     name: 'Souffle Draconique',
//     classId: 'osamodas',
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
// move.charge_bestiale = {
//     id: 'charge_bestiale',
//     name: 'Charge Bestiale',
//     classId: 'osamodas',
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
// move.aeropique = {
//     id: 'aeropique',
//     name: 'Aéropique',
//     classId: 'osamodas',
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
// move.discipline = {
//     id: 'discipline',
//     name: 'Discipline',
//     classId: 'osamodas',
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
// move.laisse_spirituelle = {
//     id: 'laisse_spirituelle',
//     name: 'Laisse Spirituelle',
//     classId: 'osamodas',
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
// move.ventritofu = {
//     id: 'ventritofu',
//     name: 'Ventritofu',
//     classId: 'osamodas',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 73,
//                         patch: {}},
//                        {lvl: 137,  
//                         patch: {}}],
//     description: ""
// }
// move.bouflourd = {
//     id: 'bouflourd',
//     name: 'Bouflourd',
//     classId: 'osamodas',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,  
//                         patch: {}}],
//     description: ""
// }
// move.crapipaud = {
//     id: 'crapipaud',
//     name: 'Crapipaud',
//     classId: 'osamodas',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,  
//                         patch: {}}],
//     description: ""
// }
// move.dragonnet = {
//     id: 'dragonnet',
//     name: 'Dragonnet',
//     classId: 'osamodas',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,  
//                         patch: {}}],
//     description: ""
// }
// move.esprit_glouton = {
//     id: 'esprit_glouton',
//     name: 'Esprit Glouton',
//     classId: 'osamodas',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,  
//                         patch: {}}],
//     description: ""
// }
// move.crocs_du_mulou = {
//     id: 'crocs_du_mulou',
//     name: 'Crocs du Mulou',
//     classId: 'osamodas',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,  
//                         patch: {}}],
//     description: ""
// }
// move.deplumage = {
//     id: 'deplumage',
//     name: 'Déplumage',
//     classId: 'osamodas',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,  
//                         patch: {}}],
//     description: ""
// }
// move.coeur_sauvage = {
//     id: 'coeur_sauvage',
//     name: 'Cœur Sauvage',
//     classId: 'osamodas',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,  
//                         patch: {}}],
//     description: ""
// }
// move.bave_du_crapaud = {
//     id: 'bave_du_crapaud',
//     name: 'Bave du Crapaud',
//     classId: 'osamodas',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,  
//                         patch: {}}],
//     description: ""
// }
// move.cravache = {
//     id: 'cravache',
//     name: 'Cravache',
//     classId: 'osamodas',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,  
//                         patch: {}}],
//     description: ""
// }
// move.griffes_du_chtigre = {
//     id: 'griffes_du_chtigre',
//     name: 'Griffes du Chtigre',
//     classId: 'osamodas',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,  
//                         patch: {}}],
//     description: ""
// }
// move.serres_du_vautour = {
//     id: 'serres_du_vautour',
//     name: 'Serres du Vautour',
//     classId: 'osamodas',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,  
//                         patch: {}}],
//     description: ""
// }
// move.toison_dor = {
//     id: 'toison_dor',
//     name: 'Toison d'Or',
//     classId: 'osamodas',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,  
//                         patch: {}}],
//     description: ""
// }
// move.morsure_du_serpent = {
//     id: 'morsure_du_serpent',
//     name: 'Morsure du Serpent',
//     classId: 'osamodas',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.pacte_bestial = {
//     id: 'pacte_bestial',
//     name: 'Pacte Bestial',
//     classId: 'osamodas',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.communion_animale = {
//     id: 'communion_animale',
//     name: 'Communion Animale',
//     classId: 'osamodas',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.tornade_de_plumes = {
//     id: 'tornade_de_plumes',
//     name: 'Tornade de Plumes',
//     classId: 'osamodas',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.frappe_du_craqueleur = {
//     id: 'frappe_du_craqueleur',
//     name: 'Frappe du Craqueleur',
//     classId: 'osamodas',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.chant_du_phenix = {
//     id: 'chant_du_phenix',
//     name: 'Chant du Phénix',
//     classId: 'osamodas',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.tourbillon = {
//     id: 'tourbillon',
//     name: 'Tourbillon',
//     classId: 'osamodas',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.martinet = {
//     id: 'martinet',
//     name: 'Martinet',
//     classId: 'osamodas',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.relais_spirituel = {
//     id: 'relais_spirituel',
//     name: 'Relais Spirituel',
//     classId: 'osamodas',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.craquolosse = {
//     id: 'craquolosse',
//     name: 'Craquolosse',
//     classId: 'osamodas',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.crocolereux = {
//     id: 'crocolereux',
//     name: 'Crocoléreux',
//     classId: 'osamodas',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.sulfenix = {
//     id: 'sulfenix',
//     name: 'Sulfénix',
//     classId: 'osamodas',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.scarafoudre = {
//     id: 'scarafoudre',
//     name: 'Scarafoudre',
//     classId: 'osamodas',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.esprit_facetieux = {
//     id: 'esprit_facetieux',
//     name: 'Esprit Facétieux',
//     classId: 'osamodas',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// #endregion

// #region feca ─────────────────────────────────────────
// move.retour_du_baton = {
//     id: 'retour_du_baton',
//     name: 'Retour du Bâton',
//     classId: 'feca',
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
// move.langueur = {
//     id: 'langueur',
//     name: 'Langueur',
//     classId: 'feca',
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
// move.nimbus = {
//     id: 'nimbus',
//     name: 'Nimbus',
//     classId: 'feca',
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
// move.typhon = {
//     id: 'typhon',
//     name: 'Typhon',
//     classId: 'feca',
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
// move.rempart = {
//     id: 'rempart',
//     name: 'Rempart',
//     classId: 'feca',
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
// move.barricade = {
//     id: 'barricade',
//     name: 'Barricade',
//     classId: 'feca',
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
// move.somnolence = {
//     id: 'somnolence',
//     name: 'Somnolence',
//     classId: 'feca',
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
// move.lethargie = {
//     id: 'lethargie',
//     name: 'Léthargie',
//     classId: 'feca',
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
// move.bastion = {
//     id: 'bastion',
//     name: 'Bastion',
//     classId: 'feca',
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
// move.frisson = {
//     id: 'frisson',
//     name: 'Frisson',
//     classId: 'feca',
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
// move.bulle = {
//     id: 'bulle',
//     name: 'Bulle',
//     classId: 'feca',
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
// move.transhumance = {
//     id: 'transhumance',
//     name: 'Transhumance',
//     classId: 'feca',
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
// move.prairie = {
//     id: 'prairie',
//     name: 'Prairie',
//     classId: 'feca',
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
// move.vallee = {
//     id: 'vallee',
//     name: 'Vallée',
//     classId: 'feca',
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
// move.terre_battue = {
//     id: 'terre_battue',
//     name: 'Terre Battue',
//     classId: 'feca',
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
// move.terre_brulee = {
//     id: 'terre_brulee',
//     name: 'Terre Brûlée',
//     classId: 'feca',
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
// move.renfort = {
//     id: 'renfort',
//     name: 'Renfort',
//     classId: 'feca',
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
// move.silbo = {
//     id: 'silbo',
//     name: 'Silbo',
//     classId: 'feca',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 73,
//                         patch: {}},
//                        {lvl: 137,  
//                         patch: {}}],
//     description: ""
// }
// move.torpeur = {
//     id: 'torpeur',
//     name: 'Torpeur',
//     classId: 'feca',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,  
//                         patch: {}}],
//     description: ""
// }
// move.bergerie = {
//     id: 'bergerie',
//     name: 'Bergerie',
//     classId: 'feca',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,  
//                         patch: {}}],
//     description: ""
// }
// move.defiance = {
//     id: 'defiance',
//     name: 'Défiance',
//     classId: 'feca',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,  
//                         patch: {}}],
//     description: ""
// }
// move.bouclier_feca = {
//     id: 'bouclier_feca',
//     name: 'Bouclier Féca',
//     classId: 'feca',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,  
//                         patch: {}}],
//     description: ""
// }
// move.tetanie = {
//     id: 'tetanie',
//     name: 'Tétanie',
//     classId: 'feca',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,  
//                         patch: {}}],
//     description: ""
// }
// move.atonie = {
//     id: 'atonie',
//     name: 'Atonie',
//     classId: 'feca',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,  
//                         patch: {}}],
//     description: ""
// }
// move.stratus = {
//     id: 'stratus',
//     name: 'Stratus',
//     classId: 'feca',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,  
//                         patch: {}}],
//     description: ""
// }
// move.bourrasque = {
//     id: 'bourrasque',
//     name: 'Bourrasque',
//     classId: 'feca',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,  
//                         patch: {}}],
//     description: ""
// }
// move.fortification = {
//     id: 'fortification',
//     name: 'Fortification',
//     classId: 'feca',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,  
//                         patch: {}}],
//     description: ""
// }
// move.pavois = {
//     id: 'pavois',
//     name: 'Pavois',
//     classId: 'feca',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,  
//                         patch: {}}],
//     description: ""
// }
// move.manoeuvre = {
//     id: 'manoeuvre',
//     name: 'Manœuvre',
//     classId: 'feca',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,  
//                         patch: {}}],
//     description: ""
// }
// move.regroupement = {
//     id: 'regroupement',
//     name: 'Regroupement',
//     classId: 'feca',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,  
//                         patch: {}}],
//     description: ""
// }
// move.treve = {
//     id: 'treve',
//     name: 'Trêve',
//     classId: 'feca',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.giboulee = {
//     id: 'giboulee',
//     name: 'Giboulée',
//     classId: 'feca',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.sonnailles = {
//     id: 'sonnailles',
//     name: 'Sonnailles',
//     classId: 'feca',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.egide = {
//     id: 'egide',
//     name: 'Égide',
//     classId: 'feca',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.paturage = {
//     id: 'paturage',
//     name: 'Pâturage',
//     classId: 'feca',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.verglas = {
//     id: 'verglas',
//     name: 'Verglas',
//     classId: 'feca',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.refuge = {
//     id: 'refuge',
//     name: 'Refuge',
//     classId: 'feca',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.vigie = {
//     id: 'vigie',
//     name: 'Vigie',
//     classId: 'feca',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.ataraxie = {
//     id: 'ataraxie',
//     name: 'Ataraxie',
//     classId: 'feca',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.houlette = {
//     id: 'houlette',
//     name: 'Houlette',
//     classId: 'feca',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.escapade = {
//     id: 'escapade',
//     name: 'Escapade',
//     classId: 'feca',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.excursion = {
//     id: 'excursion',
//     name: 'Excursion',
//     classId: 'feca',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.barriere = {
//     id: 'barriere',
//     name: 'Barrière',
//     classId: 'feca',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.mise_en_garde = {
//     id: 'mise_en_garde',
//     name: 'Mise en Garde',
//     classId: 'feca',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// #endregion

// #region sram ─────────────────────────────────────────
// move.truanderie = {
//     id: 'truanderie',
//     name: 'Truanderie',
//     classId: 'sram',
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
// move.sournoiserie = {
//     id: 'sournoiserie',
//     name: 'Sournoiserie',
//     classId: 'sram',
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
// move.arsenic = {
//     id: 'arsenic',
//     name: 'Arsenic',
//     classId: 'sram',
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
// move.cruaute = {
//     id: 'cruaute',
//     name: 'Cruauté',
//     classId: 'sram',
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
// move.invisibilite = {
//     id: 'invisibilite',
//     name: 'Invisibilité',
//     classId: 'sram',
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
// move.double = {
//     id: 'double',
//     name: 'Double',
//     classId: 'sram',
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
// move.piege_sournois = {
//     id: 'piege_sournois',
//     name: 'Piège Sournois',
//     classId: 'sram',
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
// move.piege_fangeux = {
//     id: 'piege_fangeux',
//     name: 'Piège Fangeux',
//     classId: 'sram',
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
// move.piege_funeste = {
//     id: 'piege_funeste',
//     name: 'Piège Funeste',
//     classId: 'sram',
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
// move.piege_repulsif = {
//     id: 'piege_repulsif',
//     name: 'Piège Répulsif',
//     classId: 'sram',
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
// move.piege_dimmobilisation = {
//     id: 'piege_dimmobilisation',
//     name: 'Piège d'Immobilisation',
//     classId: 'sram',
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
// move.extorsion = {
//     id: 'extorsion',
//     name: 'Extorsion',
//     classId: 'sram',
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
// move.arnaque = {
//     id: 'arnaque',
//     name: 'Arnaque',
//     classId: 'sram',
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
// move.pillage = {
//     id: 'pillage',
//     name: 'Pillage',
//     classId: 'sram',
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
// move.fourberie = {
//     id: 'fourberie',
//     name: 'Fourberie',
//     classId: 'sram',
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
// move.peur = {
//     id: 'peur',
//     name: 'Peur',
//     classId: 'sram',
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
// move.piege_de_derive = {
//     id: 'piege_de_derive',
//     name: 'Piège de Dérive',
//     classId: 'sram',
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
// move.piege_scelerat = {
//     id: 'piege_scelerat',
//     name: 'Piège Scélérat',
//     classId: 'sram',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 73,
//                         patch: {}},
//                        {lvl: 137,  
//                         patch: {}}],
//     description: ""
// }
// move.concentration_de_chakra = {
//     id: 'concentration_de_chakra',
//     name: 'Concentration de Chakra',
//     classId: 'sram',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,  
//                         patch: {}}],
//     description: ""
// }
// move.piege_mortel = {
//     id: 'piege_mortel',
//     name: 'Piège Mortel',
//     classId: 'sram',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,  
//                         patch: {}}],
//     description: ""
// }
// move.fourvoiement = {
//     id: 'fourvoiement',
//     name: 'Fourvoiement',
//     classId: 'sram',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,  
//                         patch: {}}],
//     description: ""
// }
// move.derobade = {
//     id: 'derobade',
//     name: 'Dérobade',
//     classId: 'sram',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,  
//                         patch: {}}],
//     description: ""
// }
// move.chausse_trappe = {
//     id: 'chausse_trappe',
//     name: 'Chausse-trappe',
//     classId: 'sram',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,  
//                         patch: {}}],
//     description: ""
// }
// move.coupe_gorge = {
//     id: 'coupe_gorge',
//     name: 'Coupe-gorge',
//     classId: 'sram',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,  
//                         patch: {}}],
//     description: ""
// }
// move.toxines = {
//     id: 'toxines',
//     name: 'Toxines',
//     classId: 'sram',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,  
//                         patch: {}}],
//     description: ""
// }
// move.poisse = {
//     id: 'poisse',
//     name: 'Poisse',
//     classId: 'sram',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,  
//                         patch: {}}],
//     description: ""
// }
// move.brume = {
//     id: 'brume',
//     name: 'Brume',
//     classId: 'sram',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,  
//                         patch: {}}],
//     description: ""
// }
// move.comploteur = {
//     id: 'comploteur',
//     name: 'Comploteur',
//     classId: 'sram',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,  
//                         patch: {}}],
//     description: ""
// }
// move.guet_apens = {
//     id: 'guet_apens',
//     name: 'Guet-apens',
//     classId: 'sram',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,  
//                         patch: {}}],
//     description: ""
// }
// move.epidemie = {
//     id: 'epidemie',
//     name: 'Épidémie',
//     classId: 'sram',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,  
//                         patch: {}}],
//     description: ""
// }
// move.effraction = {
//     id: 'effraction',
//     name: 'Effraction',
//     classId: 'sram',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.piege_effroyable = {
//     id: 'piege_effroyable',
//     name: 'Piège Effroyable',
//     classId: 'sram',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.fosse_commune = {
//     id: 'fosse_commune',
//     name: 'Fosse Commune',
//     classId: 'sram',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.perquisition = {
//     id: 'perquisition',
//     name: 'Perquisition',
//     classId: 'sram',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.larcin = {
//     id: 'larcin',
//     name: 'Larcin',
//     classId: 'sram',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.attaque_mortelle = {
//     id: 'attaque_mortelle',
//     name: 'Attaque Mortelle',
//     classId: 'sram',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.injection_toxique = {
//     id: 'injection_toxique',
//     name: 'Injection Toxique',
//     classId: 'sram',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.meprise = {
//     id: 'meprise',
//     name: 'Méprise',
//     classId: 'sram',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.piege_insidieux = {
//     id: 'piege_insidieux',
//     name: 'Piège Insidieux',
//     classId: 'sram',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.piege_a_fragmentation = {
//     id: 'piege_a_fragmentation',
//     name: 'Piège à Fragmentation',
//     classId: 'sram',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.manigance = {
//     id: 'manigance',
//     name: 'Manigance',
//     classId: 'sram',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.calamite = {
//     id: 'calamite',
//     name: 'Calamité',
//     classId: 'sram',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.perfidie = {
//     id: 'perfidie',
//     name: 'Perfidie',
//     classId: 'sram',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.marque_mortuaire = {
//     id: 'marque_mortuaire',
//     name: 'Marque Mortuaire',
//     classId: 'sram',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// #endregion

// #region sacrieur ─────────────────────────────────────────
move.absorption = {
    id: 'absorption',
    name: 'Absorption',
    classId: 'sacrieur',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'feu', damage: { min: 12, max: 14 }, target: 'enemy' },
              { type: 'debuff', stat: 'atk', value: 50, duration: 1, target: 'enemy' },
              { type: 'lifesteal', ratio: 0.03, target: 'self' }],
    spellProgression: [{lvl: 1,
                        patch: {}},
                       {lvl: 66,
                        patch: {damage: { min: 17, max: 20 },lifesteal: { ratio: 0.05 },buff: { value: 90 }}},
                       {lvl: 132,
                        patch: {damage: { min: 22, max: 26 },lifesteal: { ratio: 0.07 },buff: { value: 150 }}}],
    description: "Vole de la vie dans l'élément Feu et retire de la Puissance aux ennemis."
}
move.hemorragie = {
    id: 'hemorragie',
    name: 'Hémorragie',
    classId: 'sacrieur',
    restriction: 'coeur',
    cooldownMs: 2700,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 13, max: 16 }, target: 'enemy' },
        { type: 'antiHeal', value: 70, duration: 2, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.15, target: 'self' }
    ],
    spellProgression: [
        { lvl: 8,   patch: {} },
        { lvl: 67,  patch: { cooldownMs: 2900, effects: [
            { type: 'damage', element: 'air', damage: { min: 18, max: 22 }, target: 'enemy' },
            { type: 'antiHeal', value: 70, duration: 2, target: 'enemy' },
            { type: 'lifesteal', ratio: 0.15, target: 'self' }
        ]}},
        { lvl: 133, patch: { cooldownMs: 2900, effects: [
            { type: 'damage', element: 'air', damage: { min: 22, max: 27 }, target: 'enemy' },
            { type: 'antiHeal', value: 70, duration: 2, target: 'enemy' },
            { type: 'lifesteal', ratio: 0.20, target: 'self' }
        ]}}
    ],
    description: "Réduit les soins reçus par la cible de 70% et vole de la vie dans l'élément Air."
}
move.supplice = {
    id: 'supplice',
    name: 'Supplice',
    classId: 'sacrieur',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 13, max: 16 }, target: 'enemy' },
              { type: 'lifesteal', ratio: 0.06, target: 'self' }],
    spellProgression: [{ lvl: 12,
                         patch: {} },
                       {lvl: 69,
                        patch: {cooldownMs: 2400, damage: { min: 17, max: 20 },lifesteal: { ratio: 0.08 }}},
                       {lvl: 136,
                        patch: {damage: { min: 22, max: 26 },lifesteal: { ratio: 0.10 }}}],
    description: "Vole de la vie dans l'élément Terre."
}
move.stase = {
    id: 'stase',
    name: 'Stase',
    classId: 'sacrieur',
    cooldownMs: 2200,
    effects: [{ type: 'damage', element: 'eau', damage: { min: 12, max: 14 }, target: 'enemy' },
              { type: 'debuff', stat: 'critChance', value: 10, duration: 1, target: 'enemy' }],
    spellProgression: [{lvl: 16,
                        patch: {}},
                       {lvl: 68,
                        patch: {damage: { min: 16, max: 19 }, buff: { value: 15 }}},
                       {lvl: 134,
                        patch: {cooldownMs: 2400, damage: { min: 20, max: 24 }, buff: { value: 20 }}}],
    description: "Frappe dans l'élément Eau et réduit les chances de Critique de la cible."
}
move.attirance = {
    id: 'attirance',
    name: 'Attirance',
    classId: 'sacrieur',
    cooldownMs: 2000,
    effects: [{ type: 'avance', value: 2, target: 'enemy' }],
    description: "Attire la cible."
}
move.mutilation = {
    id: 'mutilation',
    name: 'Mutilation',
    classId: 'sacrieur',
    cooldownMs: 2000,
    effects: [{ type: 'self_dmg_pct_current', ratio: 0.10 },
              { type: 'buff', stat: 'finalDamagePct', value: 10, duration: 4, target: 'self' },
              { type: 'buff', stat: 'hpCostPerTurnPct', value: 3, duration: 3, target: 'self' }],
    spellProgression: [
        { lvl: 24,  patch: {} },
        { lvl: 77,  patch: { effects: [
            { type: 'self_dmg_pct_current', ratio: 0.10 },
            { type: 'buff', stat: 'finalDamagePct', value: 15, duration: 4, target: 'self' },
            { type: 'buff', stat: 'hpCostPerTurnPct', value: 5, duration: 3, target: 'self' }]}},
        { lvl: 144, patch: { effects: [
            { type: 'self_dmg_pct_current', ratio: 0.10 },
            { type: 'buff', stat: 'finalDamagePct', value: 20, duration: 4, target: 'self' },
            { type: 'buff', stat: 'hpCostPerTurnPct', value: 7, duration: 3, target: 'self' }]}}
    ],
    description: "Sacrifie une partie de ses PV pour gagner des dommages finaux. Sacrifie à nouveau une partie de ses PV à chaque tour tant que l'effet reste actif."
}
move.epee_vorace = {
    id: 'epee_vorace',
    name: 'Épée Vorace',
    classId: 'sacrieur',
    cooldownMs: 3500,
    effects: [{ type: 'summon', summonId: 'epee_vorace', scale: 0.30, duration: 2, target: 'self' }],
    spellProgression: [{lvl: 28,
                        patch: {}},
                       {lvl: 82,
                        patch: {summon: { scale: 0.35 }}},
                       {lvl: 149,
                        patch: {summon: { scale: 0.40 }}}],
    description: "Invoque une Épée Vorace maîtrisable qui peut voler de la vie dans l'élément Neutre."
}
move.ravage = {
    id: 'ravage',
    name: 'Ravage',
    classId: 'sacrieur',
    cooldownMs: 2000,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 17, max: 20 }, target: 'enemy' }],
    spellProgression: [{lvl: 33,
                        patch: {}},
                       {lvl: 87,
                        patch: {damage: { min: 22, max: 26 }}},
                       {lvl: 154,
                        patch: {cooldownMs: 2200, damage: { min: 28, max: 32 }}}],
    description: "Frappe dans l'élément Terre."
}
move.assaut = {
    id: 'assaut',
    name: 'Assaut',
    classId: 'sacrieur',
    cooldownMs: 1700,
    effects: [{ type: 'damage', element: 'air', damage: { min: 16, max: 19 }, target: 'enemy' }],
    spellProgression: [{lvl: 37,
                        patch: {}},
                       {lvl: 92,
                        patch: {cooldownMs: 1900, damage: { min: 21, max: 24 }}},
                       {lvl: 159,
                        patch: {cooldownMs: 2100, damage: { min: 26, max: 30 }}}],
    description: "Frappe dans l'élément Air."
}
move.transposition = {
    id: 'transposition',
    name: 'Transposition',
    classId: 'sacrieur',
    cooldownMs: 2000,
    effects: [{ type: 'fatal_intercept', ratio: 1.30, target: 'self' }],
    description: "Si un allié reçoit un coup fatal, intercepte et subit 130% des dégâts à sa place, puis devient le membre actif."
}
move.condensation = {
    id: 'condensation',
    name: 'Condensation',
    classId: 'sacrieur',
    cooldownMs: 1700,
    effects: [{ type: 'damage', element: 'eau', damage: { min: 13, max: 16 }, target: 'all_enemies' },
              { type: 'switch', value: 1, target: 'enemy' }],
    spellProgression: [{lvl: 45,
                        patch: {}},
                       {lvl: 102,
                        patch: {cooldownMs: 1900, damage: { min: 21, max: 24 }}},
                       {lvl: 169,
                        patch: {cooldownMs: 2100, damage: { min: 26, max: 30 }}}],
    description: "Occasionne des dommages Eau aux ennemis et attire les cibles en zone."
}
move.hostilite = {
    id: 'hostilite',
    name: 'Hostilité',
    classId: 'sacrieur',
    cooldownMs: 1700,
    effects: [{ type: 'damage', element: 'feu', damage: { min: 16, max: 19 }, target: 'enemy' }],
    spellProgression: [{lvl: 49,
                        patch: {}},
                       {lvl: 107,
                        patch: {cooldownMs: 1900, damage: { min: 21, max: 24 }}},
                       {lvl: 174,
                        patch: {cooldownMs: 2100, damage: { min: 26, max: 30 }}}],
    description: "Frappe dans l'élément Feu."
}
move.couronne_depines = {
    id: 'couronne_depines',
    name: "Couronne d'Épines",
    classId: 'sacrieur',
    cooldownMs: 2000,
    effects: [
        { type: 'renvoiAdditif', ratio: 0.5, duration: 2, target: 'self' }
    ],
    spellProgression: [
        { lvl: 53,  patch: {} },
        { lvl: 112, patch: { effects: [{ type: 'renvoiAdditif', ratio: 0.5, duration: 3, target: 'self' }] } },
        { lvl: 179, patch: { effects: [{ type: 'renvoiAdditif', ratio: 0.5, duration: 4, target: 'self' }] } }
    ],
    description: "À chaque coup reçu, subit 100% des dégâts et renvoie 50% en plus à l'attaquant pendant 2 tours."
}
move.transfusion = {
    id: 'transfusion',
    name: 'Transfusion',
    classId: 'sacrieur',
    cooldownMs: 3000,
    effects: [
        { type: 'self_dmg_pct_current', ratio: 0.20 },
        { type: 'heal%maxHp', value: 15, target: 'ally_min_hp' }
    ],
    spellProgression: [
        { lvl: 57,  patch: {} },
        { lvl: 117, patch: { effects: [
            { type: 'self_dmg_pct_current', ratio: 0.25 },
            { type: 'heal%maxHp', value: 20, target: 'ally_min_hp' }
        ]}},
        { lvl: 184, patch: { effects: [
            { type: 'self_dmg_pct_current', ratio: 0.30 },
            { type: 'heal%maxHp', value: 25, target: 'ally_min_hp' }
        ]}}
    ],
    description: "Sacrifie 20% de ses PV courants pour soigner l'allié avec le moins de points de vie."
}
move.dissolution = {
    id: 'dissolution',
    name: 'Dissolution',
    classId: 'sacrieur',
    restriction: 'coeur',
    cooldownMs: 2700,
    effects: [{ type: 'damage', element: 'eau', damage: { min: 16, max: 19 }, target: 'all_enemies' },
              { type: 'lifesteal', ratio: 0.11, target: 'self' }],
    spellProgression: [{lvl: 61,
                        patch: {}},
                       {lvl: 122,
                        patch: {cooldownMs: 2900, damage: { min: 21, max: 25 }}},
                       {lvl: 189,
                        patch: {damage: { min: 25, max: 29 }}}],
    description: "Vole de la vie dans l'élément Eau en zone."
}
move.desolation = {
    id: 'desolation',
    name: 'Désolation',
    classId: 'sacrieur',
    restriction: 'coeur',
    cooldownMs: 2700,
    effects: [{ type: 'damage', element: 'air', damage: { min: 16, max: 19 }, target: 'all_enemies' },
              { type: 'lifesteal', ratio: 0.11, target: 'self' }],
    spellProgression: [{lvl: 65,
                        patch: {}},
                       {lvl: 127,
                        patch: {damage: { min: 23, max: 27 }}},
                       {lvl: 194,
                        patch: {cooldownMs: 2900, damage: { min: 26, max: 30 }}}],
    description: "Vole de la vie dans l'élément Air en zone."
}
move.sacrifice = {
    id: 'sacrifice',
    name: 'Sacrifice',
    classId: 'sacrieur',
    cooldownMs: 2000,
    effects: [{ type: 'interception', target: 'self' }],
    description: "Intercepte tous les dégâts subis par les alliés."
}
move.bain_de_sang = {
    id: 'bain_de_sang',
    name: 'Bain de Sang',
    classId: 'sacrieur',
    restriction: 'coeur',
    cooldownMs: 3000,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 21, max: 24 }, target: 'all_enemies' },
              { type: 'lifesteal', ratio: 0.3, target: 'self' }],
    spellProgression: [{lvl: 73,
                        patch: {}},
                       {lvl: 137,
                        patch: {cooldownMs: 3200, damage: { min: 27, max: 31 }}}],
    description: "Vole de la vie dans l'élément Terre en zone."
}
move.hecatombe = {
    id: 'hecatombe',
    name: 'Hécatombe',
    classId: 'sacrieur',
    restriction: 'coeur',
    cooldownMs: 3000,
    effects: [{ type: 'damage', element: 'feu', damage: { min: 21, max: 24 }, target: 'all_enemies' },
              { type: 'lifesteal', ratio: 0.3, target: 'self' }],
    spellProgression: [{lvl: 77,
                        patch: {}},
                       {lvl: 142,
                        patch: {cooldownMs: 3200, damage: { min: 26, max: 30 }}}],
    description: "Vole de la vie dans l'élément Feu en zone."
}
move.libation = {
    id: 'libation',
    name: 'Libation',
    classId: 'sacrieur',
    cooldownMs: 3500,
    effects: [
        { type: 'self_dmg_pct_current', ratio: 0.30 },
        { type: 'hot', pctMaxHp: 10, duration: 4, target: 'self' }
    ],
    spellProgression: [
        { lvl: 81,  patch: {} },
        { lvl: 147, patch: { effects: [
            { type: 'self_dmg_pct_current', ratio: 0.30 },
            { type: 'hot', pctMaxHp: 10, duration: 5, target: 'self' }
        ]}}
    ],
    description: "Sacrifie 30% de ses PV courants pour se soigner pendant 4 tours."
}
move.berserk = {
    id: 'berserk',
    name: 'Berserk',
    classId: 'sacrieur',
    cooldownMs: 2000,
    effects: [
        { type: 'self_dmg_pct_current', ratio: 0.70 },
        { type: 'buff', stat: 'finalDamagePct', value: 10, duration: 3, target: 'self' }
    ],
    spellProgression: [
        { lvl: 85,  patch: {} },
        { lvl: 152, patch: { effects: [
            { type: 'self_dmg_pct_current', ratio: 0.70 },
            { type: 'buff', stat: 'finalDamagePct', value: 20, duration: 3, target: 'self' }
        ]}}
    ],
    description: "Sacrifie 70% de ses PV courants pour gagner en dommages finaux pendant 3 tours."
}
move.punition = {
    id: 'punition',
    name: 'Punition',
    classId: 'sacrieur',
    cooldownMs: 2000,
    effects: [
        { type: 'best_element_damage', damage: { min: 25, max: 28 }, target: 'enemy', erodedHpScaleTarget: { stat: 'finalDamagePct', ratio: 1.0 } }
    ],
    spellProgression: [
        { lvl: 90,  patch: {} },
        { lvl: 157, patch: { cooldownMs: 2200, effects: [
            { type: 'best_element_damage', damage: { min: 31, max: 35 }, target: 'enemy', erodedHpScaleTarget: { stat: 'finalDamagePct', ratio: 1.0 } }
        ]}}
    ],
    description: "Frappe dans le meilleur élément. Inflige des dégâts supplémentaires en fonction des PV érodés de la cible."
}
// move.furie = {
//     id: 'furie',
//     name: 'Furie',
//     classId: 'sacrieur',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,  
//                         patch: {}}],
//     description: ""
// }
// move.decimation = {
//     id: 'decimation',
//     name: 'Décimation',
//     classId: 'sacrieur',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,  
//                         patch: {}}],
//     description: ""
// }
// move.nervosite = {
//     id: 'nervosite',
//     name: 'Nervosité',
//     classId: 'sacrieur',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,  
//                         patch: {}}],
//     description: ""
// }
// move.douleur_cuisante = {
//     id: 'douleur_cuisante',
//     name: 'Douleur Cuisante',
//     classId: 'sacrieur',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,  
//                         patch: {}}],
//     description: ""
// }
// move.perfusion = {
//     id: 'perfusion',
//     name: 'Perfusion',
//     classId: 'sacrieur',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,  
//                         patch: {}}],
//     description: ""
// }
// move.pacte_de_sang = {
//     id: 'pacte_de_sang',
//     name: 'Pacte de Sang',
//     classId: 'sacrieur',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,  
//                         patch: {}}],
//     description: ""
// }
// move.epee_dansante = {
//     id: 'epee_dansante',
//     name: 'Épée Dansante',
//     classId: 'sacrieur',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,  
//                         patch: {}}],
//     description: ""
// }
// move.fulgurance = {
//     id: 'fulgurance',
//     name: 'Fulgurance',
//     classId: 'sacrieur',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,  
//                         patch: {}}],
//     description: ""
// }
// move.aversion = {
//     id: 'aversion',
//     name: 'Aversion',
//     classId: 'sacrieur',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.fluctuation = {
//     id: 'fluctuation',
//     name: 'Fluctuation',
//     classId: 'sacrieur',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.afflux = {
//     id: 'afflux',
//     name: 'Afflux',
//     classId: 'sacrieur',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.projection = {
//     id: 'projection',
//     name: 'Projection',
//     classId: 'sacrieur',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.pilori = {
//     id: 'pilori',
//     name: 'Pilori',
//     classId: 'sacrieur',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.liens_du_sang = {
//     id: 'liens_du_sang',
//     name: 'Liens du Sang',
//     classId: 'sacrieur',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.carnage = {
//     id: 'carnage',
//     name: 'Carnage',
//     classId: 'sacrieur',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.dechainement = {
//     id: 'dechainement',
//     name: 'Déchaînement',
//     classId: 'sacrieur',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.penitence = {
//     id: 'penitence',
//     name: 'Pénitence',
//     classId: 'sacrieur',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.immolation = {
//     id: 'immolation',
//     name: 'Immolation',
//     classId: 'sacrieur',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.entaille = {
//     id: 'entaille',
//     name: 'Entaille',
//     classId: 'sacrieur',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.chatiment = {
//     id: 'chatiment',
//     name: 'Châtiment',
//     classId: 'sacrieur',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.rituel_de_jashin = {
//     id: 'rituel_de_jashin',
//     name: 'Rituel de Jashin',
//     classId: 'sacrieur',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.folie_sanguinaire = {
//     id: 'folie_sanguinaire',
//     name: 'Folie Sanguinaire',
//     classId: 'sacrieur',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// #endregion

// #region zobal ─────────────────────────────────────────
// move.brincadeira = {
//     id: 'brincadeira',
//     name: 'Brincadeira',
//     classId: 'zobal',
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
// move.catalepsie = {
//     id: 'catalepsie',
//     name: 'Catalepsie',
//     classId: 'zobal',
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
// move.parafuso = {
//     id: 'parafuso',
//     name: 'Parafuso',
//     classId: 'zobal',
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
// move.cavalcade = {
//     id: 'cavalcade',
//     name: 'Cavalcade',
//     classId: 'zobal',
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
// move.masque_de_lintrepide = {
//     id: 'masque_de_lintrepide',
//     name: 'Masque de l'Intrépide',
//     classId: 'zobal',
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
// move.plastron = {
//     id: 'plastron',
//     name: 'Plastron',
//     classId: 'zobal',
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
// move.appui = {
//     id: 'appui',
//     name: 'Appui',
//     classId: 'zobal',
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
// move.masque_du_pleutre = {
//     id: 'masque_du_pleutre',
//     name: 'Masque du Pleutre',
//     classId: 'zobal',
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
// move.ponteira = {
//     id: 'ponteira',
//     name: 'Ponteira',
//     classId: 'zobal',
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
// move.masque_du_psychopathe = {
//     id: 'masque_du_psychopathe',
//     name: 'Masque du Psychopathe',
//     classId: 'zobal',
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
// move.furia = {
//     id: 'furia',
//     name: 'Furia',
//     classId: 'zobal',
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
// move.tortoruga = {
//     id: 'tortoruga',
//     name: 'Tortoruga',
//     classId: 'zobal',
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
// move.cabriole = {
//     id: 'cabriole',
//     name: 'Cabriole',
//     classId: 'zobal',
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
// move.debandade = {
//     id: 'debandade',
//     name: 'Débandade',
//     classId: 'zobal',
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
// move.inferno = {
//     id: 'inferno',
//     name: 'Inferno',
//     classId: 'zobal',
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
// move.reuche = {
//     id: 'reuche',
//     name: 'Reuche',
//     classId: 'zobal',
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
// move.apathie = {
//     id: 'apathie',
//     name: 'Apathie',
//     classId: 'zobal',
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
// move.boliche = {
//     id: 'boliche',
//     name: 'Boliche',
//     classId: 'zobal',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 73,
//                         patch: {}},
//                        {lvl: 137,  
//                         patch: {}}],
//     description: ""
// }
// move.fougue = {
//     id: 'fougue',
//     name: 'Fougue',
//     classId: 'zobal',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,  
//                         patch: {}}],
//     description: ""
// }
// move.transe = {
//     id: 'transe',
//     name: 'Transe',
//     classId: 'zobal',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,  
//                         patch: {}}],
//     description: ""
// }
// move.grimace = {
//     id: 'grimace',
//     name: 'Grimace',
//     classId: 'zobal',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,  
//                         patch: {}}],
//     description: ""
// }
// move.carnavalo = {
//     id: 'carnavalo',
//     name: 'Carnavalo',
//     classId: 'zobal',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,  
//                         patch: {}}],
//     description: ""
// }
// move.picada = {
//     id: 'picada',
//     name: 'Picada',
//     classId: 'zobal',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,  
//                         patch: {}}],
//     description: ""
// }
// move.apostasie = {
//     id: 'apostasie',
//     name: 'Apostasie',
//     classId: 'zobal',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,  
//                         patch: {}}],
//     description: ""
// }
// move.martelo = {
//     id: 'martelo',
//     name: 'Martelo',
//     classId: 'zobal',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,  
//                         patch: {}}],
//     description: ""
// }
// move.appeau = {
//     id: 'appeau',
//     name: 'Appeau',
//     classId: 'zobal',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,  
//                         patch: {}}],
//     description: ""
// }
// move.masque_de_linfatigable = {
//     id: 'masque_de_linfatigable',
//     name: 'Masque de l'Infatigable',
//     classId: 'zobal',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,  
//                         patch: {}}],
//     description: ""
// }
// move.ginga = {
//     id: 'ginga',
//     name: 'Ginga',
//     classId: 'zobal',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,  
//                         patch: {}}],
//     description: ""
// }
// move.pivot = {
//     id: 'pivot',
//     name: 'Pivot',
//     classId: 'zobal',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,  
//                         patch: {}}],
//     description: ""
// }
// move.masque_du_couard = {
//     id: 'masque_du_couard',
//     name: 'Masque du Couard',
//     classId: 'zobal',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,  
//                         patch: {}}],
//     description: ""
// }
// move.agular = {
//     id: 'agular',
//     name: 'Agular',
//     classId: 'zobal',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.masque_de_lhysterique = {
//     id: 'masque_de_lhysterique',
//     name: 'Masque de l'Hystérique',
//     classId: 'zobal',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.bocciara = {
//     id: 'bocciara',
//     name: 'Bocciara',
//     classId: 'zobal',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.armadur = {
//     id: 'armadur',
//     name: 'Armadur',
//     classId: 'zobal',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.purgatorio = {
//     id: 'purgatorio',
//     name: 'Purgatorio',
//     classId: 'zobal',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.comedie = {
//     id: 'comedie',
//     name: 'Comédie',
//     classId: 'zobal',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.distance = {
//     id: 'distance',
//     name: 'Distance',
//     classId: 'zobal',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.scudo = {
//     id: 'scudo',
//     name: 'Scudo',
//     classId: 'zobal',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.retention = {
//     id: 'retention',
//     name: 'Rétention',
//     classId: 'zobal',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.ronda = {
//     id: 'ronda',
//     name: 'Ronda',
//     classId: 'zobal',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.mascarade = {
//     id: 'mascarade',
//     name: 'Mascarade',
//     classId: 'zobal',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.nevrose = {
//     id: 'nevrose',
//     name: 'Névrose',
//     classId: 'zobal',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.diffraction = {
//     id: 'diffraction',
//     name: 'Diffraction',
//     classId: 'zobal',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.transfiguration = {
//     id: 'transfiguration',
//     name: 'Transfiguration',
//     classId: 'zobal',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// #endregion

// #region sadida ─────────────────────────────────────────
// move.ronce = {
//     id: 'ronce',
//     name: 'Ronce',
//     classId: 'sadida',
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
// move.larme_de_sadida = {
//     id: 'larme_de_sadida',
//     name: 'Larme de Sadida',
//     classId: 'sadida',
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
// move.buisson_ardent = {
//     id: 'buisson_ardent',
//     name: 'Buisson Ardent',
//     classId: 'sadida',
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
// move.cigue = {
//     id: 'cigue',
//     name: 'Cigüe',
//     classId: 'sadida',
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
// move.arbre = {
//     id: 'arbre',
//     name: 'Arbre',
//     classId: 'sadida',
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
// move.la_folle = {
//     id: 'la_folle',
//     name: 'La Folle',
//     classId: 'sadida',
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
// move.seve_paralysante = {
//     id: 'seve_paralysante',
//     name: 'Sève Paralysante',
//     classId: 'sadida',
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
// move.contagion = {
//     id: 'contagion',
//     name: 'Contagion',
//     classId: 'sadida',
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
// move.ronce_apaisante = {
//     id: 'ronce_apaisante',
//     name: 'Ronce Apaisante',
//     classId: 'sadida',
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
// move.la_bloqueuse = {
//     id: 'la_bloqueuse',
//     name: 'La Bloqueuse',
//     classId: 'sadida',
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
// move.ronces_agressives = {
//     id: 'ronces_agressives',
//     name: 'Ronces Agressives',
//     classId: 'sadida',
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
// move.fleau = {
//     id: 'fleau',
//     name: 'Fléau',
//     classId: 'sadida',
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
// move.puissance_sylvestre = {
//     id: 'puissance_sylvestre',
//     name: 'Puissance Sylvestre',
//     classId: 'sadida',
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
// move.la_sacrifiee = {
//     id: 'la_sacrifiee',
//     name: 'La Sacrifiée',
//     classId: 'sadida',
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
// move.herbes_folles = {
//     id: 'herbes_folles',
//     name: 'Herbes Folles',
//     classId: 'sadida',
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
// move.sacrifice_vaudou = {
//     id: 'sacrifice_vaudou',
//     name: 'Sacrifice Vaudou',
//     classId: 'sadida',
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
// move.arbre_de_vie = {
//     id: 'arbre_de_vie',
//     name: 'Arbre de Vie',
//     classId: 'sadida',
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
// move.la_gonflable = {
//     id: 'la_gonflable',
//     name: 'La Gonflable',
//     classId: 'sadida',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 73,
//                         patch: {}},
//                        {lvl: 137,  
//                         patch: {}}],
//     description: ""
// }
// move.tremblement = {
//     id: 'tremblement',
//     name: 'Tremblement',
//     classId: 'sadida',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,  
//                         patch: {}}],
//     description: ""
// }
// move.inoculation = {
//     id: 'inoculation',
//     name: 'Inoculation',
//     classId: 'sadida',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,  
//                         patch: {}}],
//     description: ""
// }
// move.don_naturel = {
//     id: 'don_naturel',
//     name: 'Don Naturel',
//     classId: 'sadida',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,  
//                         patch: {}}],
//     description: ""
// }
// move.la_surpuissante = {
//     id: 'la_surpuissante',
//     name: 'La Surpuissante',
//     classId: 'sadida',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,  
//                         patch: {}}],
//     description: ""
// }
// move.ronce_insolente = {
//     id: 'ronce_insolente',
//     name: 'Ronce Insolente',
//     classId: 'sadida',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,  
//                         patch: {}}],
//     description: ""
// }
// move.montee_de_seve = {
//     id: 'montee_de_seve',
//     name: 'Montée de Sève',
//     classId: 'sadida',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,  
//                         patch: {}}],
//     description: ""
// }
// move.feu_de_brousse = {
//     id: 'feu_de_brousse',
//     name: 'Feu de Brousse',
//     classId: 'sadida',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,  
//                         patch: {}}],
//     description: ""
// }
// move.vent_empoisonne = {
//     id: 'vent_empoisonne',
//     name: 'Vent Empoisonné',
//     classId: 'sadida',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,  
//                         patch: {}}],
//     description: ""
// }
// move.arbre_feuillu = {
//     id: 'arbre_feuillu',
//     name: 'Arbre Feuillu',
//     classId: 'sadida',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,  
//                         patch: {}}],
//     description: ""
// }
// move.la_folle_transmutee = {
//     id: 'la_folle_transmutee',
//     name: 'La Folle Transmutée',
//     classId: 'sadida',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,  
//                         patch: {}}],
//     description: ""
// }
// move.miasmes = {
//     id: 'miasmes',
//     name: 'Miasmes',
//     classId: 'sadida',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,  
//                         patch: {}}],
//     description: ""
// }
// move.mangrove = {
//     id: 'mangrove',
//     name: 'Mangrove',
//     classId: 'sadida',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,  
//                         patch: {}}],
//     description: ""
// }
// move.rempotage = {
//     id: 'rempotage',
//     name: 'Rempotage',
//     classId: 'sadida',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.la_bloqueuse_transmutee = {
//     id: 'la_bloqueuse_transmutee',
//     name: 'La Bloqueuse Transmutée',
//     classId: 'sadida',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.fetiches_calcines = {
//     id: 'fetiches_calcines',
//     name: 'Fétiches Calcinés',
//     classId: 'sadida',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.foret_hantee = {
//     id: 'foret_hantee',
//     name: 'Forêt Hantée',
//     classId: 'sadida',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.influence_vegetale = {
//     id: 'influence_vegetale',
//     name: 'Influence Végétale',
//     classId: 'sadida',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.la_sacrifiee_transmutee = {
//     id: 'la_sacrifiee_transmutee',
//     name: 'La Sacrifiée Transmutée',
//     classId: 'sadida',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.malediction_vaudou = {
//     id: 'malediction_vaudou',
//     name: 'Malédiction Vaudou',
//     classId: 'sadida',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.chardons_ardents = {
//     id: 'chardons_ardents',
//     name: 'Chardons Ardents',
//     classId: 'sadida',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.altruisme_vegetal = {
//     id: 'altruisme_vegetal',
//     name: 'Altruisme Végétal',
//     classId: 'sadida',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.la_gonflable_transmutee = {
//     id: 'la_gonflable_transmutee',
//     name: 'La Gonflable Transmutée',
//     classId: 'sadida',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.mandragore = {
//     id: 'mandragore',
//     name: 'Mandragore',
//     classId: 'sadida',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.force_de_la_nature = {
//     id: 'force_de_la_nature',
//     name: 'Force de la Nature',
//     classId: 'sadida',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.harmonie = {
//     id: 'harmonie',
//     name: 'Harmonie',
//     classId: 'sadida',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.la_surpuissante_transmutee = {
//     id: 'la_surpuissante_transmutee',
//     name: 'La Surpuissante Transmutée',
//     classId: 'sadida',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// #endregion

// #region roublard ─────────────────────────────────────────
// move.explobombe = {
//     id: 'explobombe',
//     name: 'Explobombe',
//     classId: 'roublard',
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
// move.tornabombe = {
//     id: 'tornabombe',
//     name: 'Tornabombe',
//     classId: 'roublard',
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
// move.bombe_a_eau = {
//     id: 'bombe_a_eau',
//     name: 'Bombe à Eau',
//     classId: 'roublard',
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
// move.sismobombe = {
//     id: 'sismobombe',
//     name: 'Sismobombe',
//     classId: 'roublard',
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
// move.detonateur = {
//     id: 'detonateur',
//     name: 'Détonateur',
//     classId: 'roublard',
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
// move.pulsar = {
//     id: 'pulsar',
//     name: 'Pulsar',
//     classId: 'roublard',
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
// move.espingole = {
//     id: 'espingole',
//     name: 'Espingole',
//     classId: 'roublard',
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
// move.botte = {
//     id: 'botte',
//     name: 'Botte',
//     classId: 'roublard',
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
// move.recel = {
//     id: 'recel',
//     name: 'Recel',
//     classId: 'roublard',
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
// move.bombarde = {
//     id: 'bombarde',
//     name: 'Bombarde',
//     classId: 'roublard',
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
// move.aimantation = {
//     id: 'aimantation',
//     name: 'Aimantation',
//     classId: 'roublard',
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
// move.entourloupe = {
//     id: 'entourloupe',
//     name: 'Entourloupe',
//     classId: 'roublard',
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
// move.roublabot = {
//     id: 'roublabot',
//     name: 'Roublabot',
//     classId: 'roublard',
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
// move.dagues_boomerang = {
//     id: 'dagues_boomerang',
//     name: 'Dagues Boomerang',
//     classId: 'roublard',
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
// move.roublardise = {
//     id: 'roublardise',
//     name: 'Roublardise',
//     classId: 'roublard',
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
// move.extraction = {
//     id: 'extraction',
//     name: 'Extraction',
//     classId: 'roublard',
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
// move.remission = {
//     id: 'remission',
//     name: 'Rémission',
//     classId: 'roublard',
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
// move.mousquet = {
//     id: 'mousquet',
//     name: 'Mousquet',
//     classId: 'roublard',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 73,
//                         patch: {}},
//                        {lvl: 137,  
//                         patch: {}}],
//     description: ""
// }
// move.poudre = {
//     id: 'poudre',
//     name: 'Poudre',
//     classId: 'roublard',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,  
//                         patch: {}}],
//     description: ""
// }
// move.resquille = {
//     id: 'resquille',
//     name: 'Resquille',
//     classId: 'roublard',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,  
//                         patch: {}}],
//     description: ""
// }
// move.dernier_souffle = {
//     id: 'dernier_souffle',
//     name: 'Dernier Souffle',
//     classId: 'roublard',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,  
//                         patch: {}}],
//     description: ""
// }
// move.kaboom = {
//     id: 'kaboom',
//     name: 'Kaboom',
//     classId: 'roublard',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,  
//                         patch: {}}],
//     description: ""
// }
// move.explobombe_resiliente = {
//     id: 'explobombe_resiliente',
//     name: 'Explobombe Résiliente',
//     classId: 'roublard',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,  
//                         patch: {}}],
//     description: ""
// }
// move.tornabombe_resiliente = {
//     id: 'tornabombe_resiliente',
//     name: 'Tornabombe Résiliente',
//     classId: 'roublard',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,  
//                         patch: {}}],
//     description: ""
// }
// move.bombe_a_eau_resiliente = {
//     id: 'bombe_a_eau_resiliente',
//     name: 'Bombe à Eau Résiliente',
//     classId: 'roublard',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,  
//                         patch: {}}],
//     description: ""
// }
// move.sismobombe_resiliente = {
//     id: 'sismobombe_resiliente',
//     name: 'Sismobombe Résiliente',
//     classId: 'roublard',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,  
//                         patch: {}}],
//     description: ""
// }
// move.etoupille = {
//     id: 'etoupille',
//     name: 'Étoupille',
//     classId: 'roublard',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,  
//                         patch: {}}],
//     description: ""
// }
// move.shrapnel = {
//     id: 'shrapnel',
//     name: 'Shrapnel',
//     classId: 'roublard',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,  
//                         patch: {}}],
//     description: ""
// }
// move.obliteration = {
//     id: 'obliteration',
//     name: 'Oblitération',
//     classId: 'roublard',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,  
//                         patch: {}}],
//     description: ""
// }
// move.ruse = {
//     id: 'ruse',
//     name: 'Ruse',
//     classId: 'roublard',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,  
//                         patch: {}}],
//     description: ""
// }
// move.plombage = {
//     id: 'plombage',
//     name: 'Plombage',
//     classId: 'roublard',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.mitraille = {
//     id: 'mitraille',
//     name: 'Mitraille',
//     classId: 'roublard',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.croisement = {
//     id: 'croisement',
//     name: 'Croisement',
//     classId: 'roublard',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.bombe_ambulante = {
//     id: 'bombe_ambulante',
//     name: 'Bombe Ambulante',
//     classId: 'roublard',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.megabombe = {
//     id: 'megabombe',
//     name: 'Mégabombe',
//     classId: 'roublard',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.tromblon = {
//     id: 'tromblon',
//     name: 'Tromblon',
//     classId: 'roublard',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.stratageme = {
//     id: 'stratageme',
//     name: 'Stratagème',
//     classId: 'roublard',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.cadence = {
//     id: 'cadence',
//     name: 'Cadence',
//     classId: 'roublard',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.casemate = {
//     id: 'casemate',
//     name: 'Casemate',
//     classId: 'roublard',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.grenaille = {
//     id: 'grenaille',
//     name: 'Grenaille',
//     classId: 'roublard',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.bombe_collante = {
//     id: 'bombe_collante',
//     name: 'Bombe Collante',
//     classId: 'roublard',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.arquebuse = {
//     id: 'arquebuse',
//     name: 'Arquebuse',
//     classId: 'roublard',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.piege_magnetique = {
//     id: 'piege_magnetique',
//     name: 'Piège Magnétique',
//     classId: 'roublard',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.imposture = {
//     id: 'imposture',
//     name: 'Imposture',
//     classId: 'roublard',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// #endregion

// #region Xelor ─────────────────────────────────────────
// move.perturbation = {
//     id: 'perturbation',
//     name: 'Perturbation',
//     classId: 'xelor',
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
// move.gelure = {
//     id: 'gelure',
//     name: 'Gelure',
//     classId: 'xelor',
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
// move.souvenir = {
//     id: 'souvenir',
//     name: 'Souvenir',
//     classId: 'xelor',
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
// move.frappe_de_xelor = {
//     id: 'frappe_de_xelor',
//     name: 'Frappe de Xélor',
//     classId: 'xelor',
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
// move.complice = {
//     id: 'complice',
//     name: 'Complice',
//     classId: 'xelor',
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
// move.teleportation = {
//     id: 'teleportation',
//     name: 'Téléportation',
//     classId: 'xelor',
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
// move.fletrissement = {
//     id: 'fletrissement',
//     name: 'Flétrissement',
//     classId: 'xelor',
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
// move.engrenage = {
//     id: 'engrenage',
//     name: 'Engrenage',
//     classId: 'xelor',
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
// move.fuite_du_temps = {
//     id: 'fuite_du_temps',
//     name: 'Fuite du Temps',
//     classId: 'xelor',
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
// move.rayon_obscur = {
//     id: 'rayon_obscur',
//     name: 'Rayon Obscur',
//     classId: 'xelor',
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
// move.ralentissement = {
//     id: 'ralentissement',
//     name: 'Ralentissement',
//     classId: 'xelor',
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
// move.flou_temporel = {
//     id: 'flou_temporel',
//     name: 'Flou Temporel',
//     classId: 'xelor',
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
// move.raulebaque = {
//     id: 'raulebaque',
//     name: 'Raulebaque',
//     classId: 'xelor',
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
// move.horloge = {
//     id: 'horloge',
//     name: 'Horloge',
//     classId: 'xelor',
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
// move.refraction = {
//     id: 'refraction',
//     name: 'Réfraction',
//     classId: 'xelor',
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
// move.rembobinage = {
//     id: 'rembobinage',
//     name: 'Rembobinage',
//     classId: 'xelor',
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
// move.paradoxe = {
//     id: 'paradoxe',
//     name: 'Paradoxe',
//     classId: 'xelor',
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
// move.petrification = {
//     id: 'petrification',
//     name: 'Pétrification',
//     classId: 'xelor',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 73,
//                         patch: {}},
//                        {lvl: 137,  
//                         patch: {}}],
//     description: ""
// }
// move.distorsion = {
//     id: 'distorsion',
//     name: 'Distorsion',
//     classId: 'xelor',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,  
//                         patch: {}}],
//     description: ""
// }
// move.desynchronisation = {
//     id: 'desynchronisation',
//     name: 'Désynchronisation',
//     classId: 'xelor',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,  
//                         patch: {}}],
//     description: ""
// }
// move.momification = {
//     id: 'momification',
//     name: 'Momification',
//     classId: 'xelor',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,  
//                         patch: {}}],
//     description: ""
// }
// move.synchro = {
//     id: 'synchro',
//     name: 'Synchro',
//     classId: 'xelor',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,  
//                         patch: {}}],
//     description: ""
// }
// move.rouage = {
//     id: 'rouage',
//     name: 'Rouage',
//     classId: 'xelor',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,  
//                         patch: {}}],
//     description: ""
// }
// move.poussiere = {
//     id: 'poussiere',
//     name: 'Poussière',
//     classId: 'xelor',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,  
//                         patch: {}}],
//     description: ""
// }
// move.permutation = {
//     id: 'permutation',
//     name: 'Permutation',
//     classId: 'xelor',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,  
//                         patch: {}}],
//     description: ""
// }
// move.pendule = {
//     id: 'pendule',
//     name: 'Pendule',
//     classId: 'xelor',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,  
//                         patch: {}}],
//     description: ""
// }
// move.cadran_de_xelor = {
//     id: 'cadran_de_xelor',
//     name: 'Cadran de Xélor',
//     classId: 'xelor',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,  
//                         patch: {}}],
//     description: ""
// }
// move.astrolabe = {
//     id: 'astrolabe',
//     name: 'Astrolabe',
//     classId: 'xelor',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,  
//                         patch: {}}],
//     description: ""
// }
// move.aiguille = {
//     id: 'aiguille',
//     name: 'Aiguille',
//     classId: 'xelor',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,  
//                         patch: {}}],
//     description: ""
// }
// move.compte_goutte = {
//     id: 'compte_goutte',
//     name: 'Compte-goutte',
//     classId: 'xelor',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,  
//                         patch: {}}],
//     description: ""
// }
// move.premonition = {
//     id: 'premonition',
//     name: 'Prémonition',
//     classId: 'xelor',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.dessechement = {
//     id: 'dessechement',
//     name: 'Dessèchement',
//     classId: 'xelor',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.sablier_de_xelor = {
//     id: 'sablier_de_xelor',
//     name: 'Sablier de Xélor',
//     classId: 'xelor',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.conservation = {
//     id: 'conservation',
//     name: 'Conservation',
//     classId: 'xelor',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.instabilite = {
//     id: 'instabilite',
//     name: 'Instabilité',
//     classId: 'xelor',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.clepsydre = {
//     id: 'clepsydre',
//     name: 'Clepsydre',
//     classId: 'xelor',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.regulateur = {
//     id: 'regulateur',
//     name: 'Régulateur',
//     classId: 'xelor',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.remanence = {
//     id: 'remanence',
//     name: 'Rémanence',
//     classId: 'xelor',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.faille = {
//     id: 'faille',
//     name: 'Faille',
//     classId: 'xelor',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.gousset = {
//     id: 'gousset',
//     name: 'Gousset',
//     classId: 'xelor',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.sables_du_temps = {
//     id: 'sables_du_temps',
//     name: 'Sables du Temps',
//     classId: 'xelor',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.espace_temps = {
//     id: 'espace_temps',
//     name: 'Espace-temps',
//     classId: 'xelor',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.vingt_cinquieme_heure = {
//     id: 'vingt_cinquieme_heure',
//     name: 'Vingt-cinquième Heure',
//     classId: 'xelor',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.glas = {
//     id: 'glas',
//     name: 'Glas',
//     classId: 'xelor',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// #endregion

// #region steamer ─────────────────────────────────────────
// move['longue-vue'] = {
//     id: 'longue-vue',
//     name: 'Longue-vue',
//     classId: 'steamer',
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
// move.amarrage = {
//     id: 'amarrage',
//     name: 'Amarrage',
//     classId: 'steamer',
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
// move.torpille = {
//     id: 'torpille',
//     name: 'Torpille',
//     classId: 'steamer',
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
// move.sabotage = {
//     id: 'sabotage',
//     name: 'Sabotage',
//     classId: 'steamer',
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
// move.harponneuse = {
//     id: 'harponneuse',
//     name: 'Harponneuse',
//     classId: 'steamer',
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
// move.evolution = {
//     id: 'evolution',
//     name: 'Évolution',
//     classId: 'steamer',
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
// move.gardienne = {
//     id: 'gardienne',
//     name: 'Gardienne',
//     classId: 'steamer',
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
// move.aspiration = {
//     id: 'aspiration',
//     name: 'Aspiration',
//     classId: 'steamer',
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
// move.maree = {
//     id: 'maree',
//     name: 'Marée',
//     classId: 'steamer',
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
// move.turbine = {
//     id: 'turbine',
//     name: 'Turbine',
//     classId: 'steamer',
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
// move.tactirelle = {
//     id: 'tactirelle',
//     name: 'Tactirelle',
//     classId: 'steamer',
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
// move.scaphandre = {
//     id: 'scaphandre',
//     name: 'Scaphandre',
//     classId: 'steamer',
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
// move.foene = {
//     id: 'foene',
//     name: 'Foène',
//     classId: 'steamer',
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
// move.ressac = {
//     id: 'ressac',
//     name: 'Ressac',
//     classId: 'steamer',
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
// move.sonar = {
//     id: 'sonar',
//     name: 'Sonar',
//     classId: 'steamer',
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
// move.courant = {
//     id: 'courant',
//     name: 'Courant',
//     classId: 'steamer',
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
// move.secourisme = {
//     id: 'secourisme',
//     name: 'Secourisme',
//     classId: 'steamer',
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
// move.ancrage = {
//     id: 'ancrage',
//     name: 'Ancrage',
//     classId: 'steamer',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 73,
//                         patch: {}},
//                        {lvl: 137,  
//                         patch: {}}],
//     description: ""
// }
// move.plongee = {
//     id: 'plongee',
//     name: 'Plongée',
//     classId: 'steamer',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,  
//                         patch: {}}],
//     description: ""
// }
// move.compas = {
//     id: 'compas',
//     name: 'Compas',
//     classId: 'steamer',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,  
//                         patch: {}}],
//     description: ""
// }
// move.assistance = {
//     id: 'assistance',
//     name: 'Assistance',
//     classId: 'steamer',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,  
//                         patch: {}}],
//     description: ""
// }
// move.brise_lame = {
//     id: 'brise_lame',
//     name: 'Brise l'Âme',
//     classId: 'steamer',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,  
//                         patch: {}}],
//     description: ""
// }
// move.corrosion = {
//     id: 'corrosion',
//     name: 'Corrosion',
//     classId: 'steamer',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,  
//                         patch: {}}],
//     description: ""
// }
// move.soupape = {
//     id: 'soupape',
//     name: 'Soupape',
//     classId: 'steamer',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,  
//                         patch: {}}],
//     description: ""
// }
// move.gouvernail = {
//     id: 'gouvernail',
//     name: 'Gouvernail',
//     classId: 'steamer',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,  
//                         patch: {}}],
//     description: ""
// }
// move.periscope = {
//     id: 'periscope',
//     name: 'Périscope',
//     classId: 'steamer',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,  
//                         patch: {}}],
//     description: ""
// }
// move.chalutier = {
//     id: 'chalutier',
//     name: 'Chalutier',
//     classId: 'steamer',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,  
//                         patch: {}}],
//     description: ""
// }
// move.surtension = {
//     id: 'surtension',
//     name: 'Surtension',
//     classId: 'steamer',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,  
//                         patch: {}}],
//     description: ""
// }
// move.foreuse = {
//     id: 'foreuse',
//     name: 'Foreuse',
//     classId: 'steamer',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,  
//                         patch: {}}],
//     description: ""
// }
// move.piston = {
//     id: 'piston',
//     name: 'Piston',
//     classId: 'steamer',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,  
//                         patch: {}}],
//     description: ""
// }
// move.vapor = {
//     id: 'vapor',
//     name: 'Vapor',
//     classId: 'steamer',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.flibuste = {
//     id: 'flibuste',
//     name: 'Flibuste',
//     classId: 'steamer',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.bathyscaphe = {
//     id: 'bathyscaphe',
//     name: 'Bathyscaphe',
//     classId: 'steamer',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.blindage = {
//     id: 'blindage',
//     name: 'Blindage',
//     classId: 'steamer',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.cabestan = {
//     id: 'cabestan',
//     name: 'Cabestan',
//     classId: 'steamer',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.ecume = {
//     id: 'ecume',
//     name: 'Écume',
//     classId: 'steamer',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.embuscade = {
//     id: 'embuscade',
//     name: 'Embuscade',
//     classId: 'steamer',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.harmattan = {
//     id: 'harmattan',
//     name: 'Harmattan',
//     classId: 'steamer',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.sauvetage = {
//     id: 'sauvetage',
//     name: 'Sauvetage',
//     classId: 'steamer',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.court_circuit = {
//     id: 'court_circuit',
//     name: 'Court-circuit',
//     classId: 'steamer',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.submersion = {
//     id: 'submersion',
//     name: 'Submersion',
//     classId: 'steamer',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.boussole = {
//     id: 'boussole',
//     name: 'Boussole',
//     classId: 'steamer',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.aiguillage = {
//     id: 'aiguillage',
//     name: 'Aiguillage',
//     classId: 'steamer',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.recursivite = {
//     id: 'recursivite',
//     name: 'Récursivité',
//     classId: 'steamer',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// #endregion

// #region ouginak ─────────────────────────────────────────
// move.molosse = {
//     id: 'molosse',
//     name: 'Molosse',
//     classId: 'ouginak',
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
// move.os_a_moelle = {
//     id: 'os_a_moelle',
//     name: 'Os à Moelle',
//     classId: 'ouginak',
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
// move.charogne = {
//     id: 'charogne',
//     name: 'Charogne',
//     classId: 'ouginak',
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
// move.traque = {
//     id: 'traque',
//     name: 'Traque',
//     classId: 'ouginak',
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
// move.proie = {
//     id: 'proie',
//     name: 'Proie',
//     classId: 'ouginak',
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
// move.convergence = {
//     id: 'convergence',
//     name: 'Convergence',
//     classId: 'ouginak',
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
// move.lance_roquet = {
//     id: 'lance_roquet',
//     name: 'Lance-roquet',
//     classId: 'ouginak',
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
// move.amarok = {
//     id: 'amarok',
//     name: 'Amarok',
//     classId: 'ouginak',
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
// move.cubitus = {
//     id: 'cubitus',
//     name: 'Cubitus',
//     classId: 'ouginak',
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
// move.arcanin = {
//     id: 'arcanin',
//     name: 'Arcanin',
//     classId: 'ouginak',
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
// move.rabattage = {
//     id: 'rabattage',
//     name: 'Rabattage',
//     classId: 'ouginak',
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
// move.carcasse = {
//     id: 'carcasse',
//     name: 'Carcasse',
//     classId: 'ouginak',
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
// move.pelage_protecteur = {
//     id: 'pelage_protecteur',
//     name: 'Pelage Protecteur',
//     classId: 'ouginak',
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
// move.chasse = {
//     id: 'chasse',
//     name: 'Chasse',
//     classId: 'ouginak',
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
// move.tibia = {
//     id: 'tibia',
//     name: 'Tibia',
//     classId: 'ouginak',
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
// move.apaisement = {
//     id: 'apaisement',
//     name: 'Apaisement',
//     classId: 'ouginak',
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
// move.dogue = {
//     id: 'dogue',
//     name: 'Dogue',
//     classId: 'ouginak',
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
// move.panique = {
//     id: 'panique',
//     name: 'Panique',
//     classId: 'ouginak',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 73,
//                         patch: {}},
//                        {lvl: 137,  
//                         patch: {}}],
//     description: ""
// }
// move.aboiement = {
//     id: 'aboiement',
//     name: 'Aboiement',
//     classId: 'ouginak',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,  
//                         patch: {}}],
//     description: ""
// }
// move.limier = {
//     id: 'limier',
//     name: 'Limier',
//     classId: 'ouginak',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,  
//                         patch: {}}],
//     description: ""
// }
// move.flair = {
//     id: 'flair',
//     name: 'Flair',
//     classId: 'ouginak',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,  
//                         patch: {}}],
//     description: ""
// }
// move.appel_de_la_meute = {
//     id: 'appel_de_la_meute',
//     name: 'Appel de la Meute',
//     classId: 'ouginak',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,  
//                         patch: {}}],
//     description: ""
// }
// move.machoire = {
//     id: 'machoire',
//     name: 'Mâchoire',
//     classId: 'ouginak',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,  
//                         patch: {}}],
//     description: ""
// }
// move.museliere = {
//     id: 'museliere',
//     name: 'Muselière',
//     classId: 'ouginak',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,  
//                         patch: {}}],
//     description: ""
// }
// move.radius = {
//     id: 'radius',
//     name: 'Radius',
//     classId: 'ouginak',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,  
//                         patch: {}}],
//     description: ""
// }
// move.depecage = {
//     id: 'depecage',
//     name: 'Dépeçage',
//     classId: 'ouginak',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,  
//                         patch: {}}],
//     description: ""
// }
// move.gibier = {
//     id: 'gibier',
//     name: 'Gibier',
//     classId: 'ouginak',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,  
//                         patch: {}}],
//     description: ""
// }
// move.pistage = {
//     id: 'pistage',
//     name: 'Pistage',
//     classId: 'ouginak',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,  
//                         patch: {}}],
//     description: ""
// }
// move.gangrene = {
//     id: 'gangrene',
//     name: 'Gangrène',
//     classId: 'ouginak',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,  
//                         patch: {}}],
//     description: ""
// }
// move.cerbere = {
//     id: 'cerbere',
//     name: 'Cerbère',
//     classId: 'ouginak',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,  
//                         patch: {}}],
//     description: ""
// }
// move.calcaneus = {
//     id: 'calcaneus',
//     name: 'Calcanéus',
//     classId: 'ouginak',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.caninos = {
//     id: 'caninos',
//     name: 'Caninos',
//     classId: 'ouginak',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.aboi = {
//     id: 'aboi',
//     name: 'Aboi',
//     classId: 'ouginak',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.battue = {
//     id: 'battue',
//     name: 'Battue',
//     classId: 'ouginak',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.ferocite = {
//     id: 'ferocite',
//     name: 'Férocité',
//     classId: 'ouginak',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.vertebre = {
//     id: 'vertebre',
//     name: 'Vertèbre',
//     classId: 'ouginak',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.humerus = {
//     id: 'humerus',
//     name: 'Humérus',
//     classId: 'ouginak',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.affection = {
//     id: 'affection',
//     name: 'Affection',
//     classId: 'ouginak',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.depouille = {
//     id: 'depouille',
//     name: 'Dépouille',
//     classId: 'ouginak',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.poursuite = {
//     id: 'poursuite',
//     name: 'Poursuite',
//     classId: 'ouginak',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.rogne = {
//     id: 'rogne',
//     name: 'Rogne',
//     classId: 'ouginak',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.tetanisation = {
//     id: 'tetanisation',
//     name: 'Tétanisation',
//     classId: 'ouginak',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.acharnement = {
//     id: 'acharnement',
//     name: 'Acharnement',
//     classId: 'ouginak',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.nouvelle_lune = {
//     id: 'nouvelle_lune',
//     name: 'Nouvelle Lune',
//     classId: 'ouginak',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// #endregion

// #region forgelance ─────────────────────────────────────────
// move.trident_de_la_mer = {
//     id: 'trident_de_la_mer',
//     name: 'Trident de la Mer',
//     classId: 'forgelance',
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
// move.effondrement = {
//     id: 'effondrement',
//     name: 'Effondrement',
//     classId: 'forgelance',
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
// move.estoc_brulant = {
//     id: 'estoc_brulant',
//     name: 'Estoc Brûlant',
//     classId: 'forgelance',
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
// move.volee_dairain = {
//     id: 'volee_dairain',
//     name: 'Volée d'Airain',
//     classId: 'forgelance',
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
// move.epilogue = {
//     id: 'epilogue',
//     name: 'Épilogue',
//     classId: 'forgelance',
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
// move.charge_heroique = {
//     id: 'charge_heroique',
//     name: 'Charge Héroïque',
//     classId: 'forgelance',
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
// move.lance_du_lac = {
//     id: 'lance_du_lac',
//     name: 'Lance du Lac',
//     classId: 'forgelance',
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
// move.lance_pierre = {
//     id: 'lance_pierre',
//     name: 'Lance-pierre',
//     classId: 'forgelance',
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
// move.phalange = {
//     id: 'phalange',
//     name: 'Phalange',
//     classId: 'forgelance',
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
// move.lance_a_incendie = {
//     id: 'lance_a_incendie',
//     name: 'Lance à Incendie',
//     classId: 'forgelance',
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
// move.javeline_de_myr = {
//     id: 'javeline_de_myr',
//     name: 'Javeline de Myr',
//     classId: 'forgelance',
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
// move.balestra = {
//     id: 'balestra',
//     name: 'Balestra',
//     classId: 'forgelance',
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
// move.talon_dargile = {
//     id: 'talon_dargile',
//     name: 'Talon d'Argile',
//     classId: 'forgelance',
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
// move.kyrja = {
//     id: 'kyrja',
//     name: 'Kyrja',
//     classId: 'forgelance',
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
// move.muspel = {
//     id: 'muspel',
//     name: 'Muspel',
//     classId: 'forgelance',
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
// move.prelude_au_fer = {
//     id: 'prelude_au_fer',
//     name: 'Prélude au Fer',
//     classId: 'forgelance',
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
// move.terre_du_milieu = {
//     id: 'terre_du_milieu',
//     name: 'Terre du Milieu',
//     classId: 'forgelance',
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
// move.chevalerie = {
//     id: 'chevalerie',
//     name: 'Chevalerie',
//     classId: 'forgelance',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 73,
//                         patch: {}},
//                        {lvl: 137,  
//                         patch: {}}],
//     description: ""
// }
// move.jormun = {
//     id: 'jormun',
//     name: 'Jormun',
//     classId: 'forgelance',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,  
//                         patch: {}}],
//     description: ""
// }
// move.poincon = {
//     id: 'poincon',
//     name: 'Poinçon',
//     classId: 'forgelance',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,  
//                         patch: {}}],
//     description: ""
// }
// move.noa = {
//     id: 'noa',
//     name: 'Noa',
//     classId: 'forgelance',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,  
//                         patch: {}}],
//     description: ""
// }
// move.eclipse = {
//     id: 'eclipse',
//     name: 'Éclipse',
//     classId: 'forgelance',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,  
//                         patch: {}}],
//     description: ""
// }
// move.maelstrom = {
//     id: 'maelstrom',
//     name: 'Maelstrom',
//     classId: 'forgelance',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,  
//                         patch: {}}],
//     description: ""
// }
// move.lance_cyclone = {
//     id: 'lance_cyclone',
//     name: 'Lance-cyclone',
//     classId: 'forgelance',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,  
//                         patch: {}}],
//     description: ""
// }
// move.octave = {
//     id: 'octave',
//     name: 'Octave',
//     classId: 'forgelance',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,  
//                         patch: {}}],
//     description: ""
// }
// move.soulevement = {
//     id: 'soulevement',
//     name: 'Soulèvement',
//     classId: 'forgelance',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,  
//                         patch: {}}],
//     description: ""
// }
// move.parade = {
//     id: 'parade',
//     name: 'Parade',
//     classId: 'forgelance',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,  
//                         patch: {}}],
//     description: ""
// }
// move.galanterie = {
//     id: 'galanterie',
//     name: 'Galanterie',
//     classId: 'forgelance',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,  
//                         patch: {}}],
//     description: ""
// }
// move.epieu_sismique = {
//     id: 'epieu_sismique',
//     name: 'Épieu Sismique',
//     classId: 'forgelance',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,  
//                         patch: {}}],
//     description: ""
// }
// move.javelot_foudre = {
//     id: 'javelot_foudre',
//     name: 'Javelot-foudre',
//     classId: 'forgelance',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,  
//                         patch: {}}],
//     description: ""
// }
// move.oriflamme = {
//     id: 'oriflamme',
//     name: 'Oriflamme',
//     classId: 'forgelance',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.pluie_dairain = {
//     id: 'pluie_dairain',
//     name: 'Pluie d'Airain',
//     classId: 'forgelance',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.moulin_rouge = {
//     id: 'moulin_rouge',
//     name: 'Moulin Rouge',
//     classId: 'forgelance',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.moulin_a_vent = {
//     id: 'moulin_a_vent',
//     name: 'Moulin à Vent',
//     classId: 'forgelance',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.fente = {
//     id: 'fente',
//     name: 'Fente',
//     classId: 'forgelance',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.vajra = {
//     id: 'vajra',
//     name: 'Vajra',
//     classId: 'forgelance',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.ydra = {
//     id: 'ydra',
//     name: 'Ydra',
//     classId: 'forgelance',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.crepuscule = {
//     id: 'crepuscule',
//     name: 'Crépuscule',
//     classId: 'forgelance',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.degagement = {
//     id: 'degagement',
//     name: 'Dégagement',
//     classId: 'forgelance',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.renommee = {
//     id: 'renommee',
//     name: 'Renommée',
//     classId: 'forgelance',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.fer_rouge = {
//     id: 'fer_rouge',
//     name: 'Fer Rouge',
//     classId: 'forgelance',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.etreinte_de_valkyr = {
//     id: 'etreinte_de_valkyr',
//     name: 'Étreinte de Valkyr',
//     classId: 'forgelance',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.elding = {
//     id: 'elding',
//     name: 'Elding',
//     classId: 'forgelance',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.holmgang = {
//     id: 'holmgang',
//     name: 'Holmgang',
//     classId: 'forgelance',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// #endregion

// #region pandawa ─────────────────────────────────────────
// move.gueule_de_bois = {
//     id: 'gueule_de_bois',
//     name: 'Gueule de Bois',
//     classId: 'pandawa',
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
// move.paume_explosive = {
//     id: 'paume_explosive',
//     name: 'Paume Explosive',
//     classId: 'pandawa',
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
// move.schnaps = {
//     id: 'schnaps',
//     name: 'Schnaps',
//     classId: 'pandawa',
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
// move.ethylo = {
//     id: 'ethylo',
//     name: 'Ethylo',
//     classId: 'pandawa',
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
// move.bombance = {
//     id: 'bombance',
//     name: 'Bombance',
//     classId: 'pandawa',
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
// move.karcham = {
//     id: 'karcham',
//     name: 'Karcham',
//     classId: 'pandawa',
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
// move.epouvante = {
//     id: 'epouvante',
//     name: 'Épouvante',
//     classId: 'pandawa',
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
// move.brancard = {
//     id: 'brancard',
//     name: 'Brancard',
//     classId: 'pandawa',
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
// move.pandikulation = {
//     id: 'pandikulation',
//     name: 'Pandikulation',
//     classId: 'pandawa',
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
// move.ebriete = {
//     id: 'ebriete',
//     name: 'Ébriété',
//     classId: 'pandawa',
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
// move.stabilisation = {
//     id: 'stabilisation',
//     name: 'Stabilisation',
//     classId: 'pandawa',
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
// move.propulsion = {
//     id: 'propulsion',
//     name: 'Propulsion',
//     classId: 'pandawa',
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
// move.eau_de_vie = {
//     id: 'eau_de_vie',
//     name: 'Eau-de-vie',
//     classId: 'pandawa',
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
// move.souillure = {
//     id: 'souillure',
//     name: 'Souillure',
//     classId: 'pandawa',
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
// move.fermentation = {
//     id: 'fermentation',
//     name: 'Fermentation',
//     classId: 'pandawa',
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
// move.eviction = {
//     id: 'eviction',
//     name: 'Éviction',
//     classId: 'pandawa',
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
// move.flasque_explosive = {
//     id: 'flasque_explosive',
//     name: 'Flasque Explosive',
//     classId: 'pandawa',
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
// move.lait_de_bambou = {
//     id: 'lait_de_bambou',
//     name: 'Lait de Bambou',
//     classId: 'pandawa',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 73,
//                         patch: {}},
//                        {lvl: 137,  
//                         patch: {}}],
//     description: ""
// }
// move.nausee = {
//     id: 'nausee',
//     name: 'Nausée',
//     classId: 'pandawa',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,  
//                         patch: {}}],
//     description: ""
// }
// move.vague_a_lame = {
//     id: 'vague_a_lame',
//     name: 'Vague à Lame',
//     classId: 'pandawa',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,  
//                         patch: {}}],
//     description: ""
// }
// move.lien_spiritueux = {
//     id: 'lien_spiritueux',
//     name: 'Lien Spiritueux',
//     classId: 'pandawa',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,  
//                         patch: {}}],
//     description: ""
// }
// move.pandanlku = {
//     id: 'pandanlku',
//     name: 'Pandanlku',
//     classId: 'pandawa',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,  
//                         patch: {}}],
//     description: ""
// }
// move.souffle_enflamme = {
//     id: 'souffle_enflamme',
//     name: 'Souffle Enflammé',
//     classId: 'pandawa',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,  
//                         patch: {}}],
//     description: ""
// }
// move.distillation = {
//     id: 'distillation',
//     name: 'Distillation',
//     classId: 'pandawa',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,  
//                         patch: {}}],
//     description: ""
// }
// move.ribote = {
//     id: 'ribote',
//     name: 'Ribote',
//     classId: 'pandawa',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,  
//                         patch: {}}],
//     description: ""
// }
// move.engourdissement = {
//     id: 'engourdissement',
//     name: 'Engourdissement',
//     classId: 'pandawa',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,  
//                         patch: {}}],
//     description: ""
// }
// move.picole = {
//     id: 'picole',
//     name: 'Picole',
//     classId: 'pandawa',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,  
//                         patch: {}}],
//     description: ""
// }
// move.chamrak = {
//     id: 'chamrak',
//     name: 'Chamrak',
//     classId: 'pandawa',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,  
//                         patch: {}}],
//     description: ""
// }
// move.consolation = {
//     id: 'consolation',
//     name: 'Consolation',
//     classId: 'pandawa',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,  
//                         patch: {}}],
//     description: ""
// }
// move.alcoshu = {
//     id: 'alcoshu',
//     name: 'Alcoshu',
//     classId: 'pandawa',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,  
//                         patch: {}}],
//     description: ""
// }
// move.liqueur = {
//     id: 'liqueur',
//     name: 'Liqueur',
//     classId: 'pandawa',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.ivresse = {
//     id: 'ivresse',
//     name: 'Ivresse',
//     classId: 'pandawa',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.varappe = {
//     id: 'varappe',
//     name: 'Varappe',
//     classId: 'pandawa',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.absinthe = {
//     id: 'absinthe',
//     name: 'Absinthe',
//     classId: 'pandawa',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.bistouille = {
//     id: 'bistouille',
//     name: 'Bistouille',
//     classId: 'pandawa',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.brassage = {
//     id: 'brassage',
//     name: 'Brassage',
//     classId: 'pandawa',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.bambouseraie = {
//     id: 'bambouseraie',
//     name: 'Bambouseraie',
//     classId: 'pandawa',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.souffle_alcoolise = {
//     id: 'souffle_alcoolise',
//     name: 'Souffle Alcoolisé',
//     classId: 'pandawa',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.pandatak = {
//     id: 'pandatak',
//     name: 'Pandatak',
//     classId: 'pandawa',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.prohibition = {
//     id: 'prohibition',
//     name: 'Prohibition',
//     classId: 'pandawa',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.cascade = {
//     id: 'cascade',
//     name: 'Cascade',
//     classId: 'pandawa',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.pandjiu = {
//     id: 'pandjiu',
//     name: 'Pandjiu',
//     classId: 'pandawa',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.bambou = {
//     id: 'bambou',
//     name: 'Bambou',
//     classId: 'pandawa',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.main_de_pandawa = {
//     id: 'main_de_pandawa',
//     name: 'Main de Pandawa',
//     classId: 'pandawa',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// #endregion

// #region eliotrope ─────────────────────────────────────────
// move.affront = {
//     id: 'affront',
//     name: 'Affront',
//     classId: 'eliotrope',
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
// move.audace = {
//     id: 'audace',
//     name: 'Audace',
//     classId: 'eliotrope',
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
// move.commotion = {
//     id: 'commotion',
//     name: 'Commotion',
//     classId: 'eliotrope',
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
// move.rayon_de_wakfu = {
//     id: 'rayon_de_wakfu',
//     name: 'Rayon de Wakfu',
//     classId: 'eliotrope',
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
// move.portail = {
//     id: 'portail',
//     name: 'Portail',
//     classId: 'eliotrope',
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
// move.neutral = {
//     id: 'neutral',
//     name: 'Neutral',
//     classId: 'eliotrope',
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
// move.persiflage = {
//     id: 'persiflage',
//     name: 'Persiflage',
//     classId: 'eliotrope',
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
// move.cicatrisation = {
//     id: 'cicatrisation',
//     name: 'Cicatrisation',
//     classId: 'eliotrope',
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
// move.outrage = {
//     id: 'outrage',
//     name: 'Outrage',
//     classId: 'eliotrope',
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
// move.odyssee = {
//     id: 'odyssee',
//     name: 'Odyssée',
//     classId: 'eliotrope',
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
// move.insolence = {
//     id: 'insolence',
//     name: 'Insolence',
//     classId: 'eliotrope',
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
// move.cabale = {
//     id: 'cabale',
//     name: 'Cabale',
//     classId: 'eliotrope',
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
// move.brimade = {
//     id: 'brimade',
//     name: 'Brimade',
//     classId: 'eliotrope',
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
// move.sillage = {
//     id: 'sillage',
//     name: 'Sillage',
//     classId: 'eliotrope',
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
// move.therapie = {
//     id: 'therapie',
//     name: 'Thérapie',
//     classId: 'eliotrope',
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
// move.distribution = {
//     id: 'distribution',
//     name: 'Distribution',
//     classId: 'eliotrope',
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
// move.affliction = {
//     id: 'affliction',
//     name: 'Affliction',
//     classId: 'eliotrope',
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
// move.transcendance = {
//     id: 'transcendance',
//     name: 'Transcendance',
//     classId: 'eliotrope',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 73,
//                         patch: {}},
//                        {lvl: 137,  
//                         patch: {}}],
//     description: ""
// }
// move.raillerie = {
//     id: 'raillerie',
//     name: 'Raillerie',
//     classId: 'eliotrope',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 77,
//                         patch: {}},
//                        {lvl: 142,  
//                         patch: {}}],
//     description: ""
// }
// move.resonance = {
//     id: 'resonance',
//     name: 'Résonance',
//     classId: 'eliotrope',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 81,
//                         patch: {}},
//                        {lvl: 147,  
//                         patch: {}}],
//     description: ""
// }
// move.extinction = {
//     id: 'extinction',
//     name: 'Extinction',
//     classId: 'eliotrope',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 85,
//                         patch: {}},
//                        {lvl: 152,  
//                         patch: {}}],
//     description: ""
// }
// move.entraide = {
//     id: 'entraide',
//     name: 'Entraide',
//     classId: 'eliotrope',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 90,
//                         patch: {}},
//                        {lvl: 157,  
//                         patch: {}}],
//     description: ""
// }
// move.mepris = {
//     id: 'mepris',
//     name: 'Mépris',
//     classId: 'eliotrope',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 95,
//                         patch: {}},
//                        {lvl: 162,  
//                         patch: {}}],
//     description: ""
// }
// move.tribulation = {
//     id: 'tribulation',
//     name: 'Tribulation',
//     classId: 'eliotrope',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 100,
//                         patch: {}},
//                        {lvl: 167,  
//                         patch: {}}],
//     description: ""
// }
// move.convulsion = {
//     id: 'convulsion',
//     name: 'Convulsion',
//     classId: 'eliotrope',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 105,
//                         patch: {}},
//                        {lvl: 177,  
//                         patch: {}}],
//     description: ""
// }
// move.faisceau = {
//     id: 'faisceau',
//     name: 'Faisceau',
//     classId: 'eliotrope',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 110,
//                         patch: {}},
//                        {lvl: 172,  
//                         patch: {}}],
//     description: ""
// }
// move.errance = {
//     id: 'errance',
//     name: 'Errance',
//     classId: 'eliotrope',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 115,
//                         patch: {}},
//                        {lvl: 182,  
//                         patch: {}}],
//     description: ""
// }
// move.interruption = {
//     id: 'interruption',
//     name: 'Interruption',
//     classId: 'eliotrope',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 120,
//                         patch: {}},
//                        {lvl: 187,  
//                         patch: {}}],
//     description: ""
// }
// move.sinecure = {
//     id: 'sinecure',
//     name: 'Sinécure',
//     classId: 'eliotrope',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 125,
//                         patch: {}},
//                        {lvl: 192,  
//                         patch: {}}],
//     description: ""
// }
// move.conjuration = {
//     id: 'conjuration',
//     name: 'Conjuration',
//     classId: 'eliotrope',
//     cooldownMs: 2000,
//     effects: [],
//     spellProgression: [{lvl: 130,
//                         patch: {}},
//                        {lvl: 197,  
//                         patch: {}}],
//     description: ""
// }
// move.aplomb = {
//     id: 'aplomb',
//     name: 'Aplomb',
//     classId: 'eliotrope',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.exode = {
//     id: 'exode',
//     name: 'Exode',
//     classId: 'eliotrope',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.camouflet = {
//     id: 'camouflet',
//     name: 'Camouflet',
//     classId: 'eliotrope',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.resilience = {
//     id: 'resilience',
//     name: 'Résilience',
//     classId: 'eliotrope',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.cataclysme = {
//     id: 'cataclysme',
//     name: 'Cataclysme',
//     classId: 'eliotrope',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.stupeur = {
//     id: 'stupeur',
//     name: 'Stupeur',
//     classId: 'eliotrope',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.poing_fulgurant = {
//     id: 'poing_fulgurant',
//     name: 'Poing Fulgurant',
//     classId: 'eliotrope',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.orgueil = {
//     id: 'orgueil',
//     name: 'Orgueil',
//     classId: 'eliotrope',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.offense = {
//     id: 'offense',
//     name: 'Offense',
//     classId: 'eliotrope',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.exil = {
//     id: 'exil',
//     name: 'Exil',
//     classId: 'eliotrope',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.sarcasme = {
//     id: 'sarcasme',
//     name: 'Sarcasme',
//     classId: 'eliotrope',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.vestige = {
//     id: 'vestige',
//     name: 'Vestige',
//     classId: 'eliotrope',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.sermon = {
//     id: 'sermon',
//     name: 'Sermon',
//     classId: 'eliotrope',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// move.coalition = {
//     id: 'coalition',
//     name: 'Coalition',
//     classId: 'eliotrope',
//     cooldownMs: 2000,
//     effects: [],
//     description: ""
// }
// #endregion

