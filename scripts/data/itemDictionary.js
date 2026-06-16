// itemDictionary.js — Équipements DofusChill

// maxHp = vie
// atk = puissance
// spd = vitesse permet d'excecuter les sorts plus vite
// flatDamage = dommages butes 
// finalDamagePct = % de dommages finaux
// spellDamagePct = % de dommages des sorts 
// damageReductionPct = % de réduction de dommages
// critChance = %de chances de critique
// critDamagePct = %de dommages en plus lors de critiques
// res.feu = % de résistance feu
// res.eau = % de résistance eau
// res.terre = % de résistance terre
// res.air = % de résistance air
// res.neutre = % de résistance neutre
// stat: 'healPct'
/*
    ═══════════════════════════════════════════════════════════════════
    EFFETS PASSIFS SUR LES ITEMS — comment les implémenter
    ═══════════════════════════════════════════════════════════════════

    Ajouter un tableau `effects` à l'item. Trois modes de déclenchement,
    non cumulables entre eux. Le format des effets est IDENTIQUE aux sorts.

    ── CIBLAGE ──────────────────────────────────────────────────────
    Pas de champ target (ou target:'self')  →  soi-même
    target:'ally_random'                    →  allié vivant aléatoire
    target:'ally_min_hp'                    →  allié avec le moins de PV
    dot / debuff / damage                   →  ennemi actif (pas de target)


    ══ MODE 1 — PÉRIODIQUE : every ══════════════════════════════════

    Se déclenche tous les N coups joués par le porteur.

    { every:4, type:'heal%maxHp', heal:3, target:'self' }
        → soin 3% PV max tous les 4 coups

    { every:6, type:'shield', value:80, duration:999 }
        → bouclier 80 PV tous les 6 coups (ignoré si bouclier déjà actif)

    { every:5, type:'buff', stat:'finalDamagePct', value:10, duration:3, target:'self' }
        → +10% dégâts pendant 3 tours, tous les 5 coups

    { every:4, type:'dot', element:'feu', value:20, duration:2 }
        → brûlure 20/tour × 2 tours sur l'ennemi, tous les 4 coups

    { every:6, type:'debuff', stat:'spd', value:15, duration:2 }
        → -15 vitesse ennemi 2 tours, tous les 6 coups

    { every:3, type:'heal', heal:30, target:'ally_min_hp' }
        → soigne l'allié le plus bas de 30 PV, tous les 3 coups

    { every:4, type:'hot', heal:15, duration:3, target:'self' }
        → soin continu 15/tour × 3 tours sur soi, tous les 4 coups


    ══ MODE 2 — PÉRIODIQUE AVEC DÉLAI : every + after ═══════════════

    Comme le mode 1, mais ne commence qu'à partir du Nème coup joué.

    { every:4, after:8, type:'heal%maxHp', heal:5, target:'self' }
        → ne se déclenche qu'à partir du 8e coup, puis tous les 4 coups


    ══ MODE 3 — RÉACTIF : on_effect ═════════════════════════════════

    Se déclenche quand un effet précis est lancé (par un allié ou un ennemi).
    PAS de champ `every` dans ce mode.

    Champs de on_effect :
      source : 'enemy'  → réagit aux effets lancés par l'ennemi
               'ally'   → réagit aux effets lancés par un allié/sort allié
      type   : 'dot' / 'heal' / 'buff' / 'debuff' / 'damage' / etc.
               (optionnel — si absent, réagit à n'importe quel type)

    reaction : 'cancel'  → annule l'effet original
               'trigger' → déclenche l'effet de l'item (l'original se passe quand même)

    Exemples :

    { on_effect:{ source:'enemy', type:'dot' }, reaction:'cancel' }
        → annule le prochain DOT ennemi

    { on_effect:{ source:'enemy', type:'dot' }, reaction:'trigger',
      type:'heal%maxHp', heal:5, target:'self' }
        → quand l'ennemi applique un DOT, se soigne de 5% PV max (le DOT passe quand même)

    { on_effect:{ source:'enemy', type:'debuff' }, reaction:'cancel' }
        → annule tous les debuffs ennemis

    { on_effect:{ source:'ally', type:'heal' }, reaction:'trigger',
      type:'buff', stat:'critChance', value:10, duration:2, target:'self' }
        → quand un sort allié soigne, gagne +10% crit pendant 2 tours


    ── MODÈLE D'ITEM LÉGENDAIRE COMPLET ─────────────────────────────
    item.Dofus_Exemple = {
        id:     'Dofus_Exemple',
        name:   'Dofus Exemple',
        rarity: 'legendaire',
        stats:  [{ stat: 'atk', value: 20 }, { stat: 'maxHp', value: 50 }],
        effects: [
            { every:4, after:8, type:'heal%maxHp', heal:3, target:'self' },
            { on_effect:{ source:'enemy', type:'dot' }, reaction:'cancel' }]
    }
*/

// ────────────────────────────────────────────────────────────────────────
// FICHIER DE DONNÉES PURES.
// La logique de calcul (LEVEL_TIERS, getItemTier, ITEM_TIER_MULTIPLIERS,
// getMaxForgeSlots, getItemStats) vit désormais dans scripts/engine/itemLogic.js
// et doit être chargée avant les fichiers qui l'utilisent.
//
// Vocabulaire `rarity` (aligné sur monstres/familiers et les classes CSS) :
//   'commun' | 'peu_commun' | 'rare' | 'legendaire'
// ────────────────────────────────────────────────────────────────────────

const item = {}

item.Dofus_Argente = {
    id: 'Dofus_Argente',
    name: 'Dofus Argenté',
    image: 'img/items/objets_bonus/Dofus_Argente.png',
    type: 'equipment',
    slot: 'accessoire',
    rarity: 'legendaire',
    itemLevelMax: 20,
    stats: [{ stat: 'atk', value: 20 }, { stat: 'maxHp', value: 50 }],
    effects: [{ every: 4, after: 8, type: 'heal%maxHp', heal: 5, target: 'self' }],
    description: 'Pondu par Rathrosk le dragon gris, cet œuf est une énigme. Bien que son pouvoir n\'égale pas celui d\'un Dofus Primordial, il semble plus ancien que le temps... Vous feriez bien de le garder précieusement. Après tout, seules les Nordes et le dieu Xélor savent de quoi l\'avenir sera fait.'
}

item.Dofus_Ocre = {
    id: 'Dofus_Ocre',
    name: 'Dofus Ocre',
    image: 'img/items/objets_bonus/Dofus_Ocre.png',
    type: 'equipment',
    slot: 'accessoire',
    rarity: 'legendaire',
    itemLevelMax: 20,
    stats: [{ stat: 'spd', value: 20 }, { stat: 'finalDamagePct', value: 10 }],
    effects: [{ on_effect: { source: 'enemy', type: 'dot' }, reaction: 'cancel' }],
    description: 'Pondu par Terrakourial, le Dragon de la Terre, puis avalé par le Kralamour Géant, ce Dofus concentre de grands pouvoirs à ne pas mettre entre toutes les mains... Ni entre tous les pieds d\'ailleurs.'
}

item.Dofus_Pourpre = {
    id: 'Dofus_Pourpre',
    name: 'Dofus Pourpre',
    image: 'img/items/objets_bonus/Dofus_Pourpre.png',
    type: 'equipment',
    slot: 'accessoire',
    rarity: 'legendaire',
    itemLevelMax: 20,
    stats: [{ stat: 'atk', value: 50 }, { stat: 'critDamagePct', value: 20 }],
    effects: [{ on_effect: { source: 'enemy', type: ['heal', 'heal%maxHp'] }, reaction: 'heal_to_damage', element: 'feu', rawDamage: { min: 5, max: 15 } }],
    description: 'Pondu par Ignemikhal, Dragon Élémentaire du Feu, par amour pour la poupée divine Ladysally. Cet œuf incandescent renferme une puissance ardente sans égale... seuls les plus courageux méritent de le porter.'
}

item.Dofus_Turquoise = {
    id: 'Dofus_Turquoise',
    name: 'Dofus Turquoise',
    image: 'img/items/objets_bonus/Dofus_Turquoise.png',
    type: 'equipment',
    slot: 'accessoire',
    rarity: 'legendaire',
    itemLevelMax: 20,
    stats: [{ stat: 'atk', value: 50 }, { stat: 'critChance', value: 13 }],
    effects: [{ on_effect: { source: 'enemy', crit_only: true, type: ['damage'] }, reaction: 'crit_absorb_heal', heal_pct: 20 }],
    description: 'Pondu par Aguabrial, Dragon Élémentaire de l\'Eau, par amour pour la poupée Dathura. Cet œuf limpide renferme une puissance d\'une profondeur sans égale... seuls les plus courageux méritent de le porter.'
}

item.trophee_de_la_cadence = {
    id:    'trophee_de_la_cadence',
    name:  'Trophée de la Cadence',
    image: 'img/items/objets_bonus/trophee_de_la_cadence.png',
    type:  'equipment',
    slot:  'accessoire',
    rarity: 'rare',
    stats: [{ stat: 'maxHp', value: 150 }],
    trophy: {
        trigger:  { type: 'spells_cast', count: 1, resetOnTrigger: true },
        switchTo: { type: 'next' }
    },
    description: 'Après chaque sort lancé, passe automatiquement au membre suivant. Idéal pour faire tourner toute l\'équipe à vitesse maximale.'
}

item.trophee_du_maestro = {
    id:    'trophee_du_maestro',
    name:  'Trophée du Maestro',
    image: 'img/items/objets_bonus/trophee_du_maestro.png',
    type:  'equipment',
    slot:  'accessoire',
    rarity: 'rare',
    stats: [{ stat: 'maxHp', value: 150 }, { stat: 'atk', value: 20 }],
    trophy: {
        trigger:  { type: 'spells_cast', count: 2, resetOnTrigger: true },
        switchTo: { type: 'next' }
    },
    description: 'Après 2 sorts lancés, passe automatiquement au membre suivant. L\'équilibre entre durée de tour et rotation fluide.'
}

item.trophee_du_veteran = {
    id:    'trophee_du_veteran',
    name:  'Trophée du Vétéran',
    image: 'img/items/objets_bonus/trophee_du_veteran.png',
    type:  'equipment',
    slot:  'accessoire',
    rarity: 'epique',
    stats: [{ stat: 'maxHp', value: 200 }, { stat: 'atk', value: 30 }],
    trophy: {
        trigger:  { type: 'spells_cast', count: 4, resetOnTrigger: true },
        switchTo: { type: 'next' }
    },
    description: 'Après 4 sorts lancés, passe automatiquement au membre suivant. Permet à chaque membre de dérouler une rotation complète avant de céder la place.'
}

item.trophee_de_l_architecte = {
    id:    'trophee_de_l_architecte',
    name:  'Trophée de l\'Architecte',
    image: 'img/items/objets_bonus/trophee_de_l_architecte.png',
    type:  'equipment',
    slot:  'accessoire',
    rarity: 'epique',
    stats: [{ stat: 'maxHp', value: 100 }],
    trophy: {
        trigger:  { type: 'spells_cast', count: 1, resetOnTrigger: true },
        switchTo: { type: 'slot', index: 0 }
    },
    description: 'Après chaque sort lancé, revient toujours au membre du slot 1. Pensé pour des stratégies où un membre principal doit agir entre chaque action des autres.'
}

item.amulette_de_l_intrepide = {
    id: 'amulette_de_l_intrepide',
    name: 'Amulette de l\'intrépide',
    image: 'images/items/Amulette_de_l_intrépide.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_l_intrepide',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 1,
    stats: [{ stat: 'maxHp', value: 1 }, { stat: 'spd', value: 1 }],
    description: ''
}

item.anneau_de_l_intrepide = {
    id: 'anneau_de_l_intrepide',
    name: 'Anneau de l\'intrépide',
    image: 'images/items/Anneau_de_l_intrépide.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_l_intrepide',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 1,
    stats: [{ stat: 'maxHp', value: 1 }, { stat: 'spd', value: 1 }],
    description: ''
}

item.bottes_de_l_intrepide = {
    id: 'bottes_de_l_intrepide',
    name: 'Bottes de l\'intrépide',
    image: 'images/items/Bottes_de_l_intrépide.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_l_intrepide',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 1,
    stats: [{ stat: 'maxHp', value: 1 }, { stat: 'spd', value: 1 }],
    description: ''
}

item.bouclier_de_l_intrepide = {
    id: 'bouclier_de_l_intrepide',
    name: 'Bouclier de l\'intrépide',
    image: 'images/items/Bouclier_de_l_intrépide.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_de_l_intrepide',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 1,
    stats: [{ stat: 'maxHp', value: 3 }],
    description: ''
}

item.cape_de_l_intrepide = {
    id: 'cape_de_l_intrepide',
    name: 'Cape de l\'intrépide',
    image: 'images/items/Cape_de_l_intrépide.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_l_intrepide',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 1,
    stats: [{ stat: 'maxHp', value: 1 }, { stat: 'spd', value: 1 }],
    description: ''
}

item.ceinture_de_l_intrepide = {
    id: 'ceinture_de_l_intrepide',
    name: 'Ceinture de l\'intrépide',
    image: 'images/items/Ceinture_de_l_intrépide.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_l_intrepide',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 1,
    stats: [{ stat: 'maxHp', value: 1 }, { stat: 'spd', value: 1 }],
    description: ''
}

item.chapeau_de_l_intrepide = {
    id: 'chapeau_de_l_intrepide',
    name: 'Chapeau de l\'intrépide',
    image: 'images/items/Chapeau_de_l_intrépide.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_l_intrepide',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 1,
    stats: [{ stat: 'maxHp', value: 1 }, { stat: 'spd', value: 1 }],
    description: ''
}

item.epee_tulante = {
    id: 'epee_tulante',
    name: 'Épée Tulante',
    image: 'images/items/Épée_Tulante.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_l_intrepide',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 1,
    stats: [{ stat: 'maxHp', value: 1 }, { stat: 'spd', value: 1 }, { stat: 'lifestealPct', value: 5 }],
    description: ''
}

item.bounihimee = {
    id: 'bounihimee',
    name: 'Bounihimée',
    image: 'images/items/Bounihimée.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_boune',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 1,
    stats: [{ stat: 'flatDamage', value: 15 }],
    description: ''
}

item.la_cape_s_loque = {
    id: 'la_cape_s_loque',
    name: 'La Cape S\'loque',
    image: 'images/items/La_Cape_S_loque.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_boune',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 1,
    stats: [{ stat: 'atk', value: 4 }],
    description: ''
}

item.la_halte_efkat = {
    id: 'la_halte_efkat',
    name: 'La Halte Efkat',
    image: 'images/items/La_Halte_Efkat.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_du_boune',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 1,
    stats: [{ stat: 'res.feu', value: 1 }, { stat: 'res.eau', value: 1 }, { stat: 'res.terre', value: 1 }, { stat: 'res.air', value: 1 }, { stat: 'res.neutre', value: 1 }],
    description: ''
}

item.la_spamette = {
    id: 'la_spamette',
    name: 'La Spamette',
    image: 'images/items/La_Spamette.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_boune',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 1,
    stats: [{ stat: 'maxHp', value: 7 }, { stat: 'atk', value: 4 }],
    description: ''
}

item.le_floude = {
    id: 'le_floude',
    name: 'Le Floude',
    image: 'images/items/Le_Floude.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_boune',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 1,
    stats: [{ stat: 'atk', value: 4 }],
    description: ''
}

item.le_plussain = {
    id: 'le_plussain',
    name: 'Le Plussain',
    image: 'images/items/Le_Plussain.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_boune',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 1,
    stats: [{ stat: 'atk', value: 4 }],
    description: ''
}

item.le_s_mesme = {
    id: 'le_s_mesme',
    name: 'Le S\'Mesme',
    image: 'images/items/Le_S_Mesme.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_boune',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 1,
    stats: [{ stat: 'maxHp', value: 7 }, { stat: 'atk', value: 4 }],
    description: ''
}

item.les_incrustes = {
    id: 'les_incrustes',
    name: 'Les Incrustes',
    image: 'images/items/Les_Incrustes.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_boune',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 1,
    stats: [{ stat: 'atk', value: 4 }],
    description: ''
}

item.anneau_de_l_aventurier = {
    id: 'anneau_de_l_aventurier',
    name: 'Anneau de l\'Aventurier',
    image: 'images/items/Anneau_de_l_Aventurier.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_jeune_aventurier',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 4,
    stats: [{ stat: 'atk', value: 2 }],
    description: ''
}

item.amulette_de_l_aventurier = {
    id: 'amulette_de_l_aventurier',
    name: 'Amulette de l\'Aventurier',
    image: 'images/items/Amulette_de_l_Aventurier.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_jeune_aventurier',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 5,
    stats: [{ stat: 'atk', value: 5 }],
    description: ''
}

item.ceinture_de_l_aventurier = {
    id: 'ceinture_de_l_aventurier',
    name: 'Ceinture de l\'aventurier',
    image: 'images/items/Ceinture_de_l_aventurier.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_jeune_aventurier',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 6,
    stats: [{ stat: 'atk', value: 5 }],
    description: ''
}

item.animulette = {
    id: 'animulette',
    name: 'Animulette',
    image: 'images/items/Animulette.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_des_ames',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 7,
    stats: [{ stat: 'critChance', value: -5 }],
    description: ''
}

item.bottes_de_l_aventurier = {
    id: 'bottes_de_l_aventurier',
    name: 'Bottes de l\'Aventurier',
    image: 'images/items/Bottes_de_l_Aventurier.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_jeune_aventurier',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 7,
    stats: [{ stat: 'atk', value: 5 }],
    description: ''
}

item.cape_du_piou_bleu = {
    id: 'cape_du_piou_bleu',
    name: 'Cape du Piou Bleu',
    image: 'images/items/Cape_du_Piou_Bleu.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_piou_bleu',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 7,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'flatDamage', value: 1 }],
    description: ''
}

item.amulette_du_piou_jaune = {
    id: 'amulette_du_piou_jaune',
    name: 'Amulette du Piou Jaune',
    image: 'images/items/Amulette_du_Piou_Jaune.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_piou_jaune',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 7,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'flatDamage', value: 1 }],
    description: ''
}

item.anneau_du_piou_rose = {
    id: 'anneau_du_piou_rose',
    name: 'Anneau du Piou Rose',
    image: 'images/items/Anneau_du_Piou_Rose.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_piou_rose',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 7,
    stats: [{ stat: 'heal', value: 1 }],
    description: ''
}

item.ceinture_du_piou_rouge = {
    id: 'ceinture_du_piou_rouge',
    name: 'Ceinture du Piou Rouge',
    image: 'images/items/Ceinture_du_Piou_Rouge.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_piou_rouge',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 7,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'flatDamage', value: 1 }],
    description: ''
}

item.chapeau_du_piou_vert = {
    id: 'chapeau_du_piou_vert',
    name: 'Chapeau du Piou Vert',
    image: 'images/items/Chapeau_du_Piou_Vert.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_piou_vert',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 7,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'flatDamage', value: 1 }],
    description: ''
}

item.sandales_du_piou_violet = {
    id: 'sandales_du_piou_violet',
    name: 'Sandales du Piou Violet',
    image: 'images/items/Sandales_du_Piou_Violet.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_piou_violet',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 7,
    stats: [{ stat: 'maxHp', value: 16 }],
    description: ''
}

item.cape_syche = {
    id: 'cape_syche',
    name: 'Cape Syché',
    image: 'images/items/Cape_Syché.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_des_ames',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 8,
    stats: [{ stat: 'maxHp', value: 11 }, { stat: 'atk', value: 7 }],
    description: ''
}

item.coiffe_antome = {
    id: 'coiffe_antome',
    name: 'Coiffe Antôme',
    image: 'images/items/Coiffe_Antôme.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_des_ames',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 8,
    stats: [{ stat: 'maxHp', value: 11 }],
    description: ''
}

item.cape_de_l_aventurier = {
    id: 'cape_de_l_aventurier',
    name: 'Cape de l\'Aventurier',
    image: 'images/items/Cape_de_l_Aventurier.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_jeune_aventurier',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 8,
    stats: [{ stat: 'atk', value: 5 }],
    description: ''
}

item.sandales_du_piou_bleu = {
    id: 'sandales_du_piou_bleu',
    name: 'Sandales du Piou Bleu',
    image: 'images/items/Sandales_du_Piou_Bleu.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_piou_bleu',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 8,
    stats: [{ stat: 'maxHp', value: 16 }],
    description: ''
}

item.chapeau_du_piou_jaune = {
    id: 'chapeau_du_piou_jaune',
    name: 'Chapeau du Piou Jaune',
    image: 'images/items/Chapeau_du_Piou_Jaune.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_piou_jaune',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 8,
    stats: [{ stat: 'maxHp', value: 16 }],
    description: ''
}

item.amulette_du_piou_rose = {
    id: 'amulette_du_piou_rose',
    name: 'Amulette du Piou Rose',
    image: 'images/items/Amulette_du_Piou_Rose.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_piou_rose',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 8,
    stats: [{ stat: 'maxHp', value: 16 }],
    description: ''
}

item.cape_du_piou_rouge = {
    id: 'cape_du_piou_rouge',
    name: 'Cape du Piou Rouge',
    image: 'images/items/Cape_du_Piou_Rouge.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_piou_rouge',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 8,
    stats: [{ stat: 'maxHp', value: 16 }],
    description: ''
}

item.ceinture_du_piou_vert = {
    id: 'ceinture_du_piou_vert',
    name: 'Ceinture du Piou Vert',
    image: 'images/items/Ceinture_du_Piou_Vert.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_piou_vert',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 8,
    stats: [{ stat: 'maxHp', value: 16 }],
    description: ''
}

item.anneau_du_piou_violet = {
    id: 'anneau_du_piou_violet',
    name: 'Anneau du Piou Violet',
    image: 'images/items/Anneau_du_Piou_Violet.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_piou_violet',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 8,
    stats: [{ stat: 'atk', value: 7 }, { stat: 'spd', value: 4 }],
    description: ''
}

item.araknoton = {
    id: 'araknoton',
    name: 'Araknoton',
    image: 'images/items/Araknoton.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_arakne',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 9,
    stats: [{ stat: 'maxHp', value: 11 }],
    description: ''
}

item.chapeau_de_l_aventurier = {
    id: 'chapeau_de_l_aventurier',
    name: 'Chapeau de l\'Aventurier',
    image: 'images/items/Chapeau_de_l_Aventurier.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_jeune_aventurier',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 9,
    stats: [{ stat: 'atk', value: 5 }],
    description: ''
}

item.anneau_du_piou_bleu = {
    id: 'anneau_du_piou_bleu',
    name: 'Anneau du Piou Bleu',
    image: 'images/items/Anneau_du_Piou_Bleu.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_piou_bleu',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 9,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 1 }],
    description: ''
}

item.ceinture_du_piou_jaune = {
    id: 'ceinture_du_piou_jaune',
    name: 'Ceinture du Piou Jaune',
    image: 'images/items/Ceinture_du_Piou_Jaune.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_piou_jaune',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 9,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 1 }],
    description: ''
}

item.chapeau_du_piou_rose = {
    id: 'chapeau_du_piou_rose',
    name: 'Chapeau du Piou Rose',
    image: 'images/items/Chapeau_du_Piou_Rose.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_piou_rose',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 9,
    stats: [{ stat: 'critChance', value: 2 }],
    description: ''
}

item.sandales_du_piou_rouge = {
    id: 'sandales_du_piou_rouge',
    name: 'Sandales du Piou Rouge',
    image: 'images/items/Sandales_du_Piou_Rouge.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_piou_rouge',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 9,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 1 }],
    description: ''
}

item.cape_du_piou_vert = {
    id: 'cape_du_piou_vert',
    name: 'Cape du Piou Vert',
    image: 'images/items/Cape_du_Piou_Vert.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_piou_vert',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 9,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 1 }],
    description: ''
}

item.amulette_du_piou_violet = {
    id: 'amulette_du_piou_violet',
    name: 'Amulette du Piou Violet',
    image: 'images/items/Amulette_du_Piou_Violet.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_piou_violet',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 9,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 7 }],
    description: ''
}

item.pacmabottes = {
    id: 'pacmabottes',
    name: 'Pacmabottes',
    image: 'images/items/Pacmabottes.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'pacmanoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 10,
    stats: [{ stat: 'spd', value: 6 }],
    description: ''
}

item.pacmamulette = {
    id: 'pacmamulette',
    name: 'Pacmamulette',
    image: 'images/items/Pacmamulette.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'pacmanoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 10,
    stats: [{ stat: 'atk', value: 7 }],
    description: ''
}

item.l_araknacoiffe = {
    id: 'l_araknacoiffe',
    name: 'L\'Araknacoiffe',
    image: 'images/items/L_Araknacoiffe.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_arakne',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 10,
    stats: [{ stat: 'atk', value: 7 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.amulette_de_fouduglen = {
    id: 'amulette_de_fouduglen',
    name: 'Amulette de Fouduglen',
    image: 'images/items/Amulette_de_Fouduglen.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_fouduglen',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 10,
    stats: [{ stat: 'atk', value: 15 }],
    description: ''
}

item.bottes_de_fouduglen = {
    id: 'bottes_de_fouduglen',
    name: 'Bottes de Fouduglen',
    image: 'images/items/Bottes_de_Fouduglen.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_fouduglen',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 10,
    stats: [{ stat: 'atk', value: 8 }],
    description: ''
}

item.coiffe_de_fouduglen = {
    id: 'coiffe_de_fouduglen',
    name: 'Coiffe de Fouduglen',
    image: 'images/items/Coiffe_de_Fouduglen.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_fouduglen',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 10,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 10 }],
    description: ''
}

item.amulette_tetriste = {
    id: 'amulette_tetriste',
    name: 'Amulette Tétriste',
    image: 'images/items/Amulette_Tétriste.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_tetriste',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 10,
    stats: [],
    description: ''
}

item.anneau_tetriste = {
    id: 'anneau_tetriste',
    name: 'Anneau Tétriste',
    image: 'images/items/Anneau_Tétriste.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_tetriste',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 10,
    stats: [{ stat: 'res.feu', value: -1 }, { stat: 'res.eau', value: -1 }, { stat: 'res.terre', value: -1 }, { stat: 'res.air', value: -1 }],
    description: ''
}

item.collier_de_khan_karkass = {
    id: 'collier_de_khan_karkass',
    name: 'Collier de Khan Karkass',
    image: 'images/items/Collier_de_Khan_Karkass.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_khan_karkass',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 10,
    stats: [{ stat: 'maxHp', value: 6 }, { stat: 'atk', value: 11 }],
    description: ''
}

item.slip_de_khan_karkass = {
    id: 'slip_de_khan_karkass',
    name: 'Slip de Khan Karkass',
    image: 'images/items/Slip_de_Khan_Karkass.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_khan_karkass',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 10,
    stats: [{ stat: 'flatDamage', value: 3 }],
    description: ''
}

item.anneau_de_l_envahisseur = {
    id: 'anneau_de_l_envahisseur',
    name: 'Anneau de l\'Envahisseur',
    image: 'images/items/Anneau_de_l_Envahisseur.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_l_envahisseur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 10,
    stats: [{ stat: 'atk', value: 6 }, { stat: 'heal', value: 2 }],
    description: ''
}

item.ceinture_de_l_envahisseur = {
    id: 'ceinture_de_l_envahisseur',
    name: 'Ceinture de l\'Envahisseur',
    image: 'images/items/Ceinture_de_l_Envahisseur.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_l_envahisseur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 10,
    stats: [{ stat: 'maxHp', value: 11 }, { stat: 'critChance', value: 1 }],
    description: ''
}

item.amulette_du_piou_bleu = {
    id: 'amulette_du_piou_bleu',
    name: 'Amulette du Piou Bleu',
    image: 'images/items/Amulette_du_Piou_Bleu.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_piou_bleu',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 10,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 16 }],
    description: ''
}

item.cape_du_piou_jaune = {
    id: 'cape_du_piou_jaune',
    name: 'Cape du Piou Jaune',
    image: 'images/items/Cape_du_Piou_Jaune.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_piou_jaune',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 10,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 16 }],
    description: ''
}

item.ceinture_du_piou_rose = {
    id: 'ceinture_du_piou_rose',
    name: 'Ceinture du Piou Rose',
    image: 'images/items/Ceinture_du_Piou_Rose.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_piou_rose',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 10,
    stats: [{ stat: 'heal', value: 1 }],
    description: ''
}

item.anneau_du_piou_rouge = {
    id: 'anneau_du_piou_rouge',
    name: 'Anneau du Piou Rouge',
    image: 'images/items/Anneau_du_Piou_Rouge.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_piou_rouge',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 10,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 16 }],
    description: ''
}

item.sandales_du_piou_vert = {
    id: 'sandales_du_piou_vert',
    name: 'Sandales du Piou Vert',
    image: 'images/items/Sandales_du_Piou_Vert.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_piou_vert',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 10,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 16 }],
    description: ''
}

item.chapeau_du_piou_violet = {
    id: 'chapeau_du_piou_violet',
    name: 'Chapeau du Piou Violet',
    image: 'images/items/Chapeau_du_Piou_Violet.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_piou_violet',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 10,
    stats: [{ stat: 'atk', value: 7 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.amulettong = {
    id: 'amulettong',
    name: 'Amulettong',
    image: 'images/items/Amulettong.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplong',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 10,
    stats: [],
    description: ''
}

item.ceinturong = {
    id: 'ceinturong',
    name: 'Ceinturong',
    image: 'images/items/Ceinturong.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplong',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 10,
    stats: [{ stat: 'maxHp', value: 11 }, { stat: 'flatDamage', value: 1 }],
    description: ''
}

item.araknoture = {
    id: 'araknoture',
    name: 'Araknoture',
    image: 'images/items/Araknoture.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_arakne',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 11,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 7 }],
    description: ''
}

item.la_trancheuse_d_arakne = {
    id: 'la_trancheuse_d_arakne',
    name: 'La Trancheuse d\'Arakne',
    image: 'images/items/La_Trancheuse_d_Arakne.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_arakne',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 11,
    stats: [{ stat: 'maxHp', value: 11 }, { stat: 'atk', value: 9 }, { stat: 'flatDamage', value: 7 }],
    description: ''
}

item.alliance_du_champ_champ = {
    id: 'alliance_du_champ_champ',
    name: 'Alliance Du Champ Champ',
    image: 'images/items/Alliance_Du_Champ_Champ.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_champ_champ',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 11,
    stats: [{ stat: 'maxHp', value: 16 }],
    description: ''
}

item.cape_du_champ_champ = {
    id: 'cape_du_champ_champ',
    name: 'Cape du Champ Champ',
    image: 'images/items/Cape_du_Champ_Champ.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_champ_champ',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 11,
    stats: [{ stat: 'maxHp', value: 21 }],
    description: ''
}

item.chapeau_du_piou_bleu = {
    id: 'chapeau_du_piou_bleu',
    name: 'Chapeau du Piou Bleu',
    image: 'images/items/Chapeau_du_Piou_Bleu.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_piou_bleu',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 11,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.sandales_du_piou_jaune = {
    id: 'sandales_du_piou_jaune',
    name: 'Sandales du Piou Jaune',
    image: 'images/items/Sandales_du_Piou_Jaune.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_piou_jaune',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 11,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.cape_du_piou_rose = {
    id: 'cape_du_piou_rose',
    name: 'Cape du Piou Rose',
    image: 'images/items/Cape_du_Piou_Rose.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_piou_rose',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 11,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'heal', value: 4 }],
    description: ''
}

item.amulette_du_piou_rouge = {
    id: 'amulette_du_piou_rouge',
    name: 'Amulette du Piou Rouge',
    image: 'images/items/Amulette_du_Piou_Rouge.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_piou_rouge',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 11,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.anneau_du_piou_vert = {
    id: 'anneau_du_piou_vert',
    name: 'Anneau du Piou Vert',
    image: 'images/items/Anneau_du_Piou_Vert.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_piou_vert',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 11,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.ceinture_du_piou_violet = {
    id: 'ceinture_du_piou_violet',
    name: 'Ceinture du Piou Violet',
    image: 'images/items/Ceinture_du_Piou_Violet.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_piou_violet',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 11,
    stats: [{ stat: 'spd', value: 4 }],
    description: ''
}

item.champcoiffe = {
    id: 'champcoiffe',
    name: 'Champcoiffe',
    image: 'images/items/Champcoiffe.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_champ_champ',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 12,
    stats: [{ stat: 'maxHp', value: 21 }],
    description: ''
}

item.bracelet_de_kardorim = {
    id: 'bracelet_de_kardorim',
    name: 'Bracelet de Kardorim',
    image: 'images/items/Bracelet_de_Kardorim.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_kardorim',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 12,
    stats: [{ stat: 'atk', value: 11 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.cape_de_kardorim = {
    id: 'cape_de_kardorim',
    name: 'Cape de Kardorim',
    image: 'images/items/Cape_de_Kardorim.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_kardorim',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 12,
    stats: [{ stat: 'atk', value: 7 }],
    description: ''
}

item.casque_de_kardorim = {
    id: 'casque_de_kardorim',
    name: 'Casque de Kardorim',
    image: 'images/items/Casque_de_Kardorim.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_kardorim',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 12,
    stats: [{ stat: 'atk', value: 11 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.dagues_du_bandit = {
    id: 'dagues_du_bandit',
    name: 'Dagues du Bandit',
    image: 'images/items/Dagues_du_Bandit.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_bandit',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 12,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 7 }, { stat: 'flatDamage', value: 3 }],
    description: ''
}

item.mitaines_mitees_du_paysan = {
    id: 'mitaines_mitees_du_paysan',
    name: 'Mitaines Mitées du Paysan',
    image: 'images/items/Mitaines_Mitées_du_Paysan.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_paysan',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 12,
    stats: [{ stat: 'maxHp', value: -40 }],
    description: ''
}

item.ceinture_du_piou_bleu = {
    id: 'ceinture_du_piou_bleu',
    name: 'Ceinture du Piou Bleu',
    image: 'images/items/Ceinture_du_Piou_Bleu.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_piou_bleu',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 12,
    stats: [{ stat: 'flatDamage', value: 1 }],
    description: ''
}

item.anneau_du_piou_jaune = {
    id: 'anneau_du_piou_jaune',
    name: 'Anneau du Piou Jaune',
    image: 'images/items/Anneau_du_Piou_Jaune.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_piou_jaune',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 12,
    stats: [{ stat: 'flatDamage', value: 1 }],
    description: ''
}

item.sandales_du_piou_rose = {
    id: 'sandales_du_piou_rose',
    name: 'Sandales du Piou Rose',
    image: 'images/items/Sandales_du_Piou_Rose.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_piou_rose',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 12,
    stats: [{ stat: 'maxHp', value: 16 }],
    description: ''
}

item.chapeau_du_piou_rouge = {
    id: 'chapeau_du_piou_rouge',
    name: 'Chapeau du Piou Rouge',
    image: 'images/items/Chapeau_du_Piou_Rouge.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_piou_rouge',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 12,
    stats: [{ stat: 'flatDamage', value: 1 }],
    description: ''
}

item.amulette_du_piou_vert = {
    id: 'amulette_du_piou_vert',
    name: 'Amulette du Piou Vert',
    image: 'images/items/Amulette_du_Piou_Vert.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_piou_vert',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 12,
    stats: [{ stat: 'flatDamage', value: 1 }],
    description: ''
}

item.cape_du_piou_violet = {
    id: 'cape_du_piou_violet',
    name: 'Cape du Piou Violet',
    image: 'images/items/Cape_du_Piou_Violet.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_piou_violet',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 12,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'spd', value: 4 }],
    description: ''
}

item.anneau_du_champ_champ = {
    id: 'anneau_du_champ_champ',
    name: 'Anneau du Champ Champ',
    image: 'images/items/Anneau_du_Champ_Champ.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_champ_champ',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 13,
    stats: [{ stat: 'maxHp', value: 16 }],
    description: ''
}

item.capouze_des_champs = {
    id: 'capouze_des_champs',
    name: 'Capouze des Champs',
    image: 'images/items/Capouze_des_Champs.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_champetre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 13,
    stats: [{ stat: 'atk', value: 16 }],
    description: ''
}

item.ceinture_fleurie = {
    id: 'ceinture_fleurie',
    name: 'Ceinture Fleurie',
    image: 'images/items/Ceinture_Fleurie.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_champetre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 13,
    stats: [{ stat: 'atk', value: 16 }],
    description: ''
}

item.bottes_champetres = {
    id: 'bottes_champetres',
    name: 'Bottes Champêtres',
    image: 'images/items/Bottes_Champêtres.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_champetre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 14,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 9 }],
    description: ''
}

item.coiffe_champetre = {
    id: 'coiffe_champetre',
    name: 'Coiffe Champêtre',
    image: 'images/items/Coiffe_Champêtre.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_champetre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 14,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 11 }],
    description: ''
}

item.amulette_des_champs = {
    id: 'amulette_des_champs',
    name: 'Amulette des Champs',
    image: 'images/items/Amulette_des_Champs.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_champetre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 15,
    stats: [{ stat: 'spd', value: 8 }],
    description: ''
}

item.anneau_champetre = {
    id: 'anneau_champetre',
    name: 'Anneau Champêtre',
    image: 'images/items/Anneau_Champêtre.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_champetre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 15,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 16 }],
    description: ''
}

item.la_plantouze_des_champs = {
    id: 'la_plantouze_des_champs',
    name: 'La Plantouze des Champs',
    image: 'images/items/La_Plantouze_des_Champs.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_champetre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 15,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 7 }, { stat: 'flatDamage', value: 8 }],
    description: ''
}

item.amulette_du_moskito = {
    id: 'amulette_du_moskito',
    name: 'Amulette du Moskito',
    image: 'images/items/Amulette_du_Moskito.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_moskito',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 15,
    stats: [{ stat: 'maxHp', value: 11 }, { stat: 'atk', value: 16 }],
    description: ''
}

item.moskitogalurette = {
    id: 'moskitogalurette',
    name: 'Moskitogalurette',
    image: 'images/items/Moskitogalurette.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_moskito',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 15,
    stats: [{ stat: 'atk', value: 21 }],
    description: ''
}

item.ceinture_du_bandit = {
    id: 'ceinture_du_bandit',
    name: 'Ceinture du Bandit',
    image: 'images/items/Ceinture_du_Bandit.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_bandit',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 15,
    stats: [{ stat: 'maxHp', value: 7 }, { stat: 'flatDamage', value: 5 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.sac_du_petit_moskito = {
    id: 'sac_du_petit_moskito',
    name: 'Sac du Petit Moskito',
    image: 'images/items/Sac_du_Petit_Moskito.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_moskito',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 16,
    stats: [{ stat: 'atk', value: 11 }],
    description: ''
}

item.amulette_du_bandit = {
    id: 'amulette_du_bandit',
    name: 'Amulette du Bandit',
    image: 'images/items/Amulette_du_Bandit.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_bandit',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 16,
    stats: [{ stat: 'maxHp', value: 7 }, { stat: 'flatDamage', value: 5 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.anneau_du_bandit = {
    id: 'anneau_du_bandit',
    name: 'Anneau du Bandit',
    image: 'images/items/Anneau_du_Bandit.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_bandit',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 17,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.faux_usee_du_paysan = {
    id: 'faux_usee_du_paysan',
    name: 'Faux usée du Paysan',
    image: 'images/items/Faux_usée_du_Paysan.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_paysan',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 17,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'flatDamage', value: 2 }, { stat: 'critChance', value: 2 }, { stat: 'lifestealPct', value: 4 }],
    description: ''
}

item.sac_du_paysan = {
    id: 'sac_du_paysan',
    name: 'Sac du Paysan',
    image: 'images/items/Sac_du_Paysan.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_paysan',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 18,
    stats: [{ stat: 'atk', value: 16 }],
    description: ''
}

item.sanglature = {
    id: 'sanglature',
    name: 'Sanglature',
    image: 'images/items/Sanglature.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_sanglier',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 18,
    stats: [{ stat: 'maxHp', value: 26 }, { stat: 'critChance', value: 2 }, { stat: 'heal', value: 5 }],
    description: ''
}

item.cape_du_papa_nowel = {
    id: 'cape_du_papa_nowel',
    name: 'Cape du Papa Nowel',
    image: 'images/items/Cape_du_Papa_Nowel.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_nowel',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 19,
    stats: [{ stat: 'maxHp', value: 16 }],
    description: ''
}

item.bob_du_paysan = {
    id: 'bob_du_paysan',
    name: 'Bob du Paysan',
    image: 'images/items/Bob_du_Paysan.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_paysan',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 19,
    stats: [{ stat: 'maxHp', value: 26 }, { stat: 'critChance', value: 3 }],
    description: ''
}

item.bottes_paysannes = {
    id: 'bottes_paysannes',
    name: 'Bottes Paysannes',
    image: 'images/items/Bottes_Paysannes.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_paysan',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 19,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 7 }],
    description: ''
}

item.anneau_du_sanglier = {
    id: 'anneau_du_sanglier',
    name: 'Anneau du Sanglier',
    image: 'images/items/Anneau_du_Sanglier.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_sanglier',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 19,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.bouclier_invisible = {
    id: 'bouclier_invisible',
    name: 'Bouclier Invisible',
    image: 'images/items/Bouclier_Invisible.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_invisible',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'maxHp', value: 31 }],
    description: ''
}

item.cape_invisible = {
    id: 'cape_invisible',
    name: 'Cape Invisible',
    image: 'images/items/Cape_Invisible.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_invisible',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'maxHp', value: 26 }, { stat: 'atk', value: 11 }],
    description: ''
}

item.coiffe_invisible = {
    id: 'coiffe_invisible',
    name: 'Coiffe Invisible',
    image: 'images/items/Coiffe_Invisible.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_invisible',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'maxHp', value: 26 }, { stat: 'atk', value: 11 }],
    description: ''
}

item.bottes_karnaval = {
    id: 'bottes_karnaval',
    name: 'Bottes Karnaval',
    image: 'images/items/Bottes_Karnaval.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_karnaval',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'maxHp', value: 11 }, { stat: 'atk', value: 7 }, { stat: 'flatDamage', value: 10 }],
    description: ''
}

item.ceinture_karnaval = {
    id: 'ceinture_karnaval',
    name: 'Ceinture Karnaval',
    image: 'images/items/Ceinture_Karnaval.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_karnaval',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'critDamagePct', value: -20 }],
    description: ''
}

item.cape_de_bowisse = {
    id: 'cape_de_bowisse',
    name: 'Cape de Bowisse',
    image: 'images/items/Cape_de_Bowisse.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_bowisse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'atk', value: 21 }],
    description: ''
}

item.alliance_de_l_homme_ours = {
    id: 'alliance_de_l_homme_ours',
    name: 'Alliance de l\'Homme Ours',
    image: 'images/items/Alliance_de_l_Homme_Ours.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_l_homme_ours',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'spd', value: 8 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.amulette_de_l_homme_ours = {
    id: 'amulette_de_l_homme_ours',
    name: 'Amulette de l\'Homme Ours',
    image: 'images/items/Amulette_de_l_Homme_Ours.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_l_homme_ours',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'atk', value: 15 }, { stat: 'res.feu', value: -7 }],
    description: ''
}

item.bottes_de_l_homme_ours = {
    id: 'bottes_de_l_homme_ours',
    name: 'Bottes de l\'Homme Ours',
    image: 'images/items/Bottes_de_l_Homme_Ours.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_l_homme_ours',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'atk', value: 7 }, { stat: 'critChance', value: 4 }],
    description: ''
}

item.baton_de_l_homme_ours = {
    id: 'baton_de_l_homme_ours',
    name: 'Bâton de l\'Homme Ours',
    image: 'images/items/Bâton_de_l_Homme_Ours.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_l_homme_ours',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'atk', value: 5 }, { stat: 'flatDamage', value: 8 }],
    description: ''
}

item.cape_de_l_homme_ours = {
    id: 'cape_de_l_homme_ours',
    name: 'Cape de l\'Homme Ours',
    image: 'images/items/Cape_de_l_Homme_Ours.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_l_homme_ours',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'atk', value: 16 }],
    description: ''
}

item.ceinture_de_l_homme_ours = {
    id: 'ceinture_de_l_homme_ours',
    name: 'Ceinture de l\'Homme Ours',
    image: 'images/items/Ceinture_de_l_Homme_Ours.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_l_homme_ours',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'maxHp', value: 26 }, { stat: 'atk', value: 16 }, { stat: 'heal', value: 2 }],
    description: ''
}

item.coiffe_de_l_homme_ours = {
    id: 'coiffe_de_l_homme_ours',
    name: 'Coiffe de l\'Homme Ours',
    image: 'images/items/Coiffe_de_l_Homme_Ours.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_l_homme_ours',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'maxHp', value: 11 }, { stat: 'atk', value: 26 }],
    description: ''
}

item.amulette_du_bouftou = {
    id: 'amulette_du_bouftou',
    name: 'Amulette du Bouftou',
    image: 'images/items/Amulette_du_Bouftou.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_bouftou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'maxHp', value: 11 }, { stat: 'atk', value: 11 }],
    description: ''
}

item.anneau_de_bouze_le_clerc = {
    id: 'anneau_de_bouze_le_clerc',
    name: 'Anneau de Bouze le Clerc',
    image: 'images/items/Anneau_de_Bouze_le_Clerc.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_bouftou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'spd', value: 8 }],
    description: ''
}

item.bouclier_du_bouftou = {
    id: 'bouclier_du_bouftou',
    name: 'Bouclier du Bouftou',
    image: 'images/items/Bouclier_du_Bouftou.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_du_bouftou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 6 }],
    description: ''
}

item.boufbottes = {
    id: 'boufbottes',
    name: 'Boufbottes',
    image: 'images/items/Boufbottes.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_bouftou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 11 }],
    description: ''
}

item.cape_bouffante = {
    id: 'cape_bouffante',
    name: 'Cape Bouffante',
    image: 'images/items/Cape_Bouffante.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_bouftou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'maxHp', value: 36 }, { stat: 'spd', value: 16 }],
    description: ''
}

item.ceinture_du_bouftou = {
    id: 'ceinture_du_bouftou',
    name: 'Ceinture du Bouftou',
    image: 'images/items/Ceinture_du_Bouftou.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_bouftou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'atk', value: 11 }],
    description: ''
}

item.coiffe_du_bouftou = {
    id: 'coiffe_du_bouftou',
    name: 'Coiffe du Bouftou',
    image: 'images/items/Coiffe_du_Bouftou.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_bouftou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'atk', value: 16 }],
    description: ''
}

item.marteau_du_bouftou = {
    id: 'marteau_du_bouftou',
    name: 'Marteau du Bouftou',
    image: 'images/items/Marteau_du_Bouftou.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_bouftou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'flatDamage', value: 8 }],
    description: ''
}

item.amulette_paysanne = {
    id: 'amulette_paysanne',
    name: 'Amulette Paysanne',
    image: 'images/items/Amulette_Paysanne.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_paysan',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'atk', value: 11 }, { stat: 'spd', value: 6 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.ceinturemuda_du_paysan = {
    id: 'ceinturemuda_du_paysan',
    name: 'Ceinturemuda du Paysan',
    image: 'images/items/Ceinturemuda_du_Paysan.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_paysan',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 16 }],
    description: ''
}

item.amulette_en_mousse = {
    id: 'amulette_en_mousse',
    name: 'Amulette en Mousse',
    image: 'images/items/Amulette_en_Mousse.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_en_mousse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 16 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.anneau_en_mousse = {
    id: 'anneau_en_mousse',
    name: 'Anneau en Mousse',
    image: 'images/items/Anneau_en_Mousse.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_en_mousse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.bottes_en_mousse = {
    id: 'bottes_en_mousse',
    name: 'Bottes en Mousse',
    image: 'images/items/Bottes_en_Mousse.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_en_mousse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 16 }],
    description: ''
}

item.cape_en_mousse = {
    id: 'cape_en_mousse',
    name: 'Cape en Mousse',
    image: 'images/items/Cape_en_Mousse.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_en_mousse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'atk', value: 16 }],
    description: ''
}

item.ceinture_en_mousse = {
    id: 'ceinture_en_mousse',
    name: 'Ceinture en Mousse',
    image: 'images/items/Ceinture_en_Mousse.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_en_mousse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'atk', value: 21 }],
    description: ''
}

item.coiffe_en_mousse = {
    id: 'coiffe_en_mousse',
    name: 'Coiffe en Mousse',
    image: 'images/items/Coiffe_en_Mousse.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_en_mousse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'maxHp', value: 11 }, { stat: 'atk', value: 11 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.pelle_en_mousse = {
    id: 'pelle_en_mousse',
    name: 'Pelle en Mousse',
    image: 'images/items/Pelle_en_Mousse.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_en_mousse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'maxHp', value: 7 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.ailes_en_bois = {
    id: 'ailes_en_bois',
    name: 'Ailes en bois',
    image: 'images/items/Ailes_en_bois.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_prototype_du_pilote',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'spd', value: 6 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.casque = {
    id: 'casque',
    name: 'Casque',
    image: 'images/items/Casque.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_prototype_du_pilote',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 20,
    stats: [{ stat: 'maxHp', value: 26 }],
    description: ''
}

item.mos_kitano = {
    id: 'mos_kitano',
    name: 'Mos Kitano',
    image: 'images/items/Mos_Kitano.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_moskito',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 21,
    stats: [{ stat: 'atk', value: 11 }, { stat: 'flatDamage', value: 2 }, { stat: 'heal', value: 2 }],
    description: ''
}

item.anneau_du_tofu = {
    id: 'anneau_du_tofu',
    name: 'Anneau du Tofu',
    image: 'images/items/Anneau_du_Tofu.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_tofu',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 21,
    stats: [{ stat: 'atk', value: 6 }],
    description: ''
}

item.chapeau_du_papa_nowel = {
    id: 'chapeau_du_papa_nowel',
    name: 'Chapeau du Papa Nowel',
    image: 'images/items/Chapeau_du_Papa_Nowel.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_nowel',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 22,
    stats: [{ stat: 'maxHp', value: 26 }],
    description: ''
}

item.pieds_du_sanglier = {
    id: 'pieds_du_sanglier',
    name: 'Pieds du Sanglier',
    image: 'images/items/Pieds_du_Sanglier.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_sanglier',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 22,
    stats: [{ stat: 'maxHp', value: 11 }, { stat: 'atk', value: -10 }, { stat: 'critChance', value: 4 }],
    description: ''
}

item.amulette_du_tofu = {
    id: 'amulette_du_tofu',
    name: 'Amulette du Tofu',
    image: 'images/items/Amulette_du_Tofu.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_tofu',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 22,
    stats: [{ stat: 'atk', value: 11 }, { stat: 'critChance', value: 3 }],
    description: ''
}

item.ceinture_du_tofu = {
    id: 'ceinture_du_tofu',
    name: 'Ceinture du Tofu',
    image: 'images/items/Ceinture_du_Tofu.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_tofu',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 22,
    stats: [{ stat: 'atk', value: 7 }],
    description: ''
}

item.kaskofu = {
    id: 'kaskofu',
    name: 'Kaskofu',
    image: 'images/items/Kaskofu.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_tofu',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 23,
    stats: [{ stat: 'maxHp', value: 31 }],
    description: ''
}

item.pantoufles_du_tofu = {
    id: 'pantoufles_du_tofu',
    name: 'Pantoufles du Tofu',
    image: 'images/items/Pantoufles_du_Tofu.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_tofu',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 23,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 11 }],
    description: ''
}

item.bonnet_du_glutin = {
    id: 'bonnet_du_glutin',
    name: 'Bonnet du Glutin',
    image: 'images/items/Bonnet_du_Glutin.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_glutin',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 25,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 7 }],
    description: ''
}

item.bracelet_du_glutin = {
    id: 'bracelet_du_glutin',
    name: 'Bracelet du Glutin',
    image: 'images/items/Bracelet_du_Glutin.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_glutin',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 25,
    stats: [{ stat: 'maxHp', value: 11 }, { stat: 'atk', value: 7 }],
    description: ''
}

item.calecon_fourre_du_glutin = {
    id: 'calecon_fourre_du_glutin',
    name: 'Caleçon Fourré du Glutin',
    image: 'images/items/Caleçon_Fourré_du_Glutin.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_glutin',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 25,
    stats: [{ stat: 'atk', value: 15 }],
    description: ''
}

item.manteau_du_glutin = {
    id: 'manteau_du_glutin',
    name: 'Manteau du Glutin',
    image: 'images/items/Manteau_du_Glutin.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_glutin',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 25,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 11 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.baguette_du_tofu = {
    id: 'baguette_du_tofu',
    name: 'Baguette du Tofu',
    image: 'images/items/Baguette_du_Tofu.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_tofu',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 25,
    stats: [{ stat: 'atk', value: 21 }, { stat: 'lifestealPct', value: 6 }],
    description: ''
}

item.bouclier_en_mousse = {
    id: 'bouclier_en_mousse',
    name: 'Bouclier en Mousse',
    image: 'images/items/Bouclier_en_Mousse.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_en_mousse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 25,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 11 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.larvamulette = {
    id: 'larvamulette',
    name: 'Larvamulette',
    image: 'images/items/Larvamulette.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_larvesque',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 26,
    stats: [{ stat: 'maxHp', value: 6 }, { stat: 'atk', value: 6 }],
    description: ''
}

item.cape_du_tofu = {
    id: 'cape_du_tofu',
    name: 'Cape du Tofu',
    image: 'images/items/Cape_du_Tofu.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_tofu',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 26,
    stats: [{ stat: 'flatDamage', value: 2 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.larvasac = {
    id: 'larvasac',
    name: 'Larvasac',
    image: 'images/items/Larvasac.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_larvesque',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 27,
    stats: [{ stat: 'maxHp', value: 6 }, { stat: 'flatDamage', value: 1 }],
    description: ''
}

item.pompamulette = {
    id: 'pompamulette',
    name: 'Pompamulette',
    image: 'images/items/Pompamulette.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'pompanoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 27,
    stats: [{ stat: 'maxHp', value: 4 }, { stat: 'atk', value: 15 }],
    description: ''
}

item.bottes_de_boufbowl = {
    id: 'bottes_de_boufbowl',
    name: 'Bottes de Boufbowl',
    image: 'images/items/Bottes_de_Boufbowl.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_boufbowl',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 28,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 7 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.masque_de_frakacia = {
    id: 'masque_de_frakacia',
    name: 'Masque de Frakacia',
    image: 'images/items/Masque_de_Frakacia.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_frakacia_leukocytine',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 28,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.amulette_royale_du_bouftou = {
    id: 'amulette_royale_du_bouftou',
    name: 'Amulette Royale du Bouftou',
    image: 'images/items/Amulette_Royale_du_Bouftou.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_bouftou_royal',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 28,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.casque_de_boufbowl = {
    id: 'casque_de_boufbowl',
    name: 'Casque de Boufbowl',
    image: 'images/items/Casque_de_Boufbowl.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_boufbowl',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 29,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'res.terre', value: 2 }, { stat: 'res.neutre', value: 2 }],
    description: ''
}

item.cape_bouffante_royale = {
    id: 'cape_bouffante_royale',
    name: 'Cape Bouffante Royale',
    image: 'images/items/Cape_Bouffante_Royale.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_bouftou_royal',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 29,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 21 }, { stat: 'res.terre', value: 2 }],
    description: ''
}

item.amulette_verrehor = {
    id: 'amulette_verrehor',
    name: 'Amulette Verréhor',
    image: 'images/items/Amulette_Verréhor.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_verrehor',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 30,
    stats: [{ stat: 'atk', value: 26 }, { stat: 'res.eau', value: -4 }],
    description: ''
}

item.ceinture_verrehor = {
    id: 'ceinture_verrehor',
    name: 'Ceinture Verréhor',
    image: 'images/items/Ceinture_Verréhor.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_verrehor',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 30,
    stats: [{ stat: 'atk', value: 16 }],
    description: ''
}

item.ailes_en_bois_ameliorees = {
    id: 'ailes_en_bois_ameliorees',
    name: 'Ailes en bois améliorées',
    image: 'images/items/Ailes_en_bois_améliorées.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_amelioree_du_pilote',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 30,
    stats: [{ stat: 'maxHp', value: 36 }, { stat: 'spd', value: 16 }],
    description: ''
}

item.casque_ameliore = {
    id: 'casque_ameliore',
    name: 'Casque amélioré',
    image: 'images/items/Casque_amélioré.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_amelioree_du_pilote',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 30,
    stats: [{ stat: 'maxHp', value: 36 }, { stat: 'spd', value: 6 }],
    description: ''
}

item.bouclier_de_bowisse = {
    id: 'bouclier_de_bowisse',
    name: 'Bouclier de Bowisse',
    image: 'images/items/Bouclier_de_Bowisse.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_de_bowisse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 30,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 11 }, { stat: 'res.feu', value: 3 }, { stat: 'res.terre', value: 3 }, { stat: 'res.air', value: 3 }],
    description: ''
}

item.bottes_de_frakacia = {
    id: 'bottes_de_frakacia',
    name: 'Bottes de Frakacia',
    image: 'images/items/Bottes_de_Frakacia.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_frakacia_leukocytine',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 30,
    stats: [{ stat: 'atk', value: 21 }, { stat: 'spd', value: 5 }, { stat: 'flatDamage', value: 3 }],
    description: ''
}

item.ceinture_de_phong_huss = {
    id: 'ceinture_de_phong_huss',
    name: 'Ceinture de Phong Huss',
    image: 'images/items/Ceinture_de_Phong_Huss.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_phong_huss',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 30,
    stats: [{ stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 1 }],
    description: ''
}

item.baton_carnivore = {
    id: 'baton_carnivore',
    name: 'Bâton Carnivore',
    image: 'images/items/Bâton_Carnivore.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_toady',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 30,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 21 }, { stat: 'heal', value: 4 }, { stat: 'lifestealPct', value: 4 }],
    description: ''
}

item.toady = {
    id: 'toady',
    name: 'Toady',
    image: 'images/items/Toady.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_toady',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 30,
    stats: [{ stat: 'atk', value: 41 }],
    description: ''
}

item.bottes_des_grocoricos = {
    id: 'bottes_des_grocoricos',
    name: 'Bottes des Grocoricos',
    image: 'images/items/Bottes_des_Grocoricos.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_des_grocoricos',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 30,
    stats: [{ stat: 'atk', value: 31 }, { stat: 'critResPct', value: -10 }],
    description: ''
}

item.ceinture_des_grocoricos = {
    id: 'ceinture_des_grocoricos',
    name: 'Ceinture des Grocoricos',
    image: 'images/items/Ceinture_des_Grocoricos.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_des_grocoricos',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 30,
    stats: [{ stat: 'atk', value: 16 }],
    description: ''
}

item.bottes_des_pamous = {
    id: 'bottes_des_pamous',
    name: 'Bottes des Pamous',
    image: 'images/items/Bottes_des_Pamous.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_des_pamous',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 30,
    stats: [{ stat: 'atk', value: 31 }],
    description: ''
}

item.ceinture_des_pamous = {
    id: 'ceinture_des_pamous',
    name: 'Ceinture des Pamous',
    image: 'images/items/Ceinture_des_Pamous.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_des_pamous',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 30,
    stats: [{ stat: 'atk', value: 16 }],
    description: ''
}

item.bottes_des_redroz = {
    id: 'bottes_des_redroz',
    name: 'Bottes des Redroz',
    image: 'images/items/Bottes_des_Redroz.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_des_redroz',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 30,
    stats: [{ stat: 'maxHp', value: -100 }, { stat: 'atk', value: 31 }, { stat: 'critChance', value: -5 }],
    description: ''
}

item.bottes_des_zoblaks = {
    id: 'bottes_des_zoblaks',
    name: 'Bottes des Zoblaks',
    image: 'images/items/Bottes_des_Zoblaks.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_des_zoblaks',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 30,
    stats: [{ stat: 'atk', value: 31 }, { stat: 'res.feu', value: -2 }, { stat: 'res.terre', value: -2 }],
    description: ''
}

item.ceinture_des_zoblaks = {
    id: 'ceinture_des_zoblaks',
    name: 'Ceinture des Zoblaks',
    image: 'images/items/Ceinture_des_Zoblaks.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_des_zoblaks',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 30,
    stats: [{ stat: 'atk', value: 16 }],
    description: ''
}

item.boufbottes_royales = {
    id: 'boufbottes_royales',
    name: 'Boufbottes Royales',
    image: 'images/items/Boufbottes_Royales.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_bouftou_royal',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 30,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'flatDamage', value: 3 }],
    description: ''
}

item.ceinture_royale_du_bouftou = {
    id: 'ceinture_royale_du_bouftou',
    name: 'Ceinture Royale du Bouftou',
    image: 'images/items/Ceinture_Royale_du_Bouftou.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_bouftou_royal',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 30,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.cuirasse_royale_du_bouftou = {
    id: 'cuirasse_royale_du_bouftou',
    name: 'Cuirasse Royale du Bouftou',
    image: 'images/items/Cuirasse_Royale_du_Bouftou.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_du_bouftou_royal',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 30,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 21 }, { stat: 'res.feu', value: 2 }],
    description: ''
}

item.epee_royale_du_bouftou = {
    id: 'epee_royale_du_bouftou',
    name: 'Épée Royale du Bouftou',
    image: 'images/items/Épée_Royale_du_Bouftou.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_bouftou_royal',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 30,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 16 }],
    description: ''
}

item.pompanneau = {
    id: 'pompanneau',
    name: 'Pompanneau',
    image: 'images/items/Pompanneau.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'pompanoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 30,
    stats: [{ stat: 'atk', value: 11 }, { stat: 'flatDamage', value: 1 }],
    description: ''
}

item.bague_de_boufbowl = {
    id: 'bague_de_boufbowl',
    name: 'Bague de Boufbowl',
    image: 'images/items/Bague_de_Boufbowl.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_boufbowl',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 31,
    stats: [{ stat: 'maxHp', value: 21 }],
    description: ''
}

item.amulette_de_rapine = {
    id: 'amulette_de_rapine',
    name: 'Amulette de Rapine',
    image: 'images/items/Amulette_de_Rapine.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_rapine',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 31,
    stats: [{ stat: 'maxHp', value: 36 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.ceinture_de_rapine = {
    id: 'ceinture_de_rapine',
    name: 'Ceinture de Rapine',
    image: 'images/items/Ceinture_de_Rapine.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_rapine',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 31,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.anneau_royal_du_bouftou = {
    id: 'anneau_royal_du_bouftou',
    name: 'Anneau Royal du Bouftou',
    image: 'images/items/Anneau_Royal_du_Bouftou.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_bouftou_royal',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 31,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.amulette_du_molosse = {
    id: 'amulette_du_molosse',
    name: 'Amulette du Molosse',
    image: 'images/items/Amulette_du_Molosse.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_molosse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 31,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'critChance', value: 1 }],
    description: ''
}

item.ceinture_du_molosse = {
    id: 'ceinture_du_molosse',
    name: 'Ceinture du Molosse',
    image: 'images/items/Ceinture_du_Molosse.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_molosse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 31,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 4 }],
    description: ''
}

item.clementamulette = {
    id: 'clementamulette',
    name: 'Clémentamulette',
    image: 'images/items/Clémentamulette.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'clementopanoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 32,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 16 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.amulette_d_hectaupe = {
    id: 'amulette_d_hectaupe',
    name: 'Amulette d\'Hectaupe',
    image: 'images/items/Amulette_d_Hectaupe.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_d_hectaupe',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 32,
    stats: [{ stat: 'atk', value: 26 }],
    description: ''
}

item.anneau_d_hectaupe = {
    id: 'anneau_d_hectaupe',
    name: 'Anneau d\'Hectaupe',
    image: 'images/items/Anneau_d_Hectaupe.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_d_hectaupe',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 32,
    stats: [{ stat: 'maxHp', value: 11 }, { stat: 'atk', value: 6 }],
    description: ''
}

item.ceinture_d_hectaupe = {
    id: 'ceinture_d_hectaupe',
    name: 'Ceinture d\'Hectaupe',
    image: 'images/items/Ceinture_d_Hectaupe.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_d_hectaupe',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 32,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 1 }],
    description: ''
}

item.gant_de_frakacia = {
    id: 'gant_de_frakacia',
    name: 'Gant de Frakacia',
    image: 'images/items/Gant_de_Frakacia.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_frakacia_leukocytine',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 32,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 2 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.bottes_de_phong_huss = {
    id: 'bottes_de_phong_huss',
    name: 'Bottes de Phong Huss',
    image: 'images/items/Bottes_de_Phong_Huss.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_phong_huss',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 32,
    stats: [{ stat: 'atk', value: 31 }],
    description: ''
}

item.bottes_de_rapine = {
    id: 'bottes_de_rapine',
    name: 'Bottes de Rapine',
    image: 'images/items/Bottes_de_Rapine.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_rapine',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 32,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 2 }, { stat: 'heal', value: 2 }],
    description: ''
}

item.boufcoiffe_royale = {
    id: 'boufcoiffe_royale',
    name: 'Boufcoiffe Royale',
    image: 'images/items/Boufcoiffe_Royale.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_bouftou_royal',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 32,
    stats: [{ stat: 'atk', value: 21 }],
    description: ''
}

item.bottes_du_corbeau_noir = {
    id: 'bottes_du_corbeau_noir',
    name: 'Bottes du Corbeau Noir',
    image: 'images/items/Bottes_du_Corbeau_Noir.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_corbeau_noir',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 32,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 27 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.givrabottes = {
    id: 'givrabottes',
    name: 'Givrabottes',
    image: 'images/items/Givrabottes.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'givranoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 33,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.larvabottes = {
    id: 'larvabottes',
    name: 'Larvabottes',
    image: 'images/items/Larvabottes.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_larvesque',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 33,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 19 }, { stat: 'heal', value: 4 }],
    description: ''
}

item.anneau_de_phong_huss = {
    id: 'anneau_de_phong_huss',
    name: 'Anneau de Phong Huss',
    image: 'images/items/Anneau_de_Phong_Huss.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_phong_huss',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 33,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.anneau_du_corbeau_noir = {
    id: 'anneau_du_corbeau_noir',
    name: 'Anneau du Corbeau Noir',
    image: 'images/items/Anneau_du_Corbeau_Noir.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_corbeau_noir',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 33,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.ceinture_du_prespic = {
    id: 'ceinture_du_prespic',
    name: 'Ceinture du Prespic',
    image: 'images/items/Ceinture_du_Prespic.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_prespic',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 33,
    stats: [{ stat: 'atk', value: 15 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.clementobottes = {
    id: 'clementobottes',
    name: 'Clémentobottes',
    image: 'images/items/Clémentobottes.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'clementopanoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 34,
    stats: [{ stat: 'atk', value: 21 }, { stat: 'res.feu', value: 3 }],
    description: ''
}

item.larvacoiffe = {
    id: 'larvacoiffe',
    name: 'Larvacoiffe',
    image: 'images/items/Larvacoiffe.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_larvesque',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 34,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'critChance', value: 2 }, { stat: 'heal', value: 2 }],
    description: ''
}

item.puissance_de_crocoburio = {
    id: 'puissance_de_crocoburio',
    name: 'Puissance de Crocoburio',
    image: 'images/items/Puissance_de_Crocoburio.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'ame_de_crocoburio',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 34,
    stats: [{ stat: 'maxHp', value: 61 }, { stat: 'atk', value: 11 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.givrature = {
    id: 'givrature',
    name: 'Givrature',
    image: 'images/items/Givrature.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'givranoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 35,
    stats: [{ stat: 'atk', value: 26 }],
    description: ''
}

item.geta_akwadala = {
    id: 'geta_akwadala',
    name: 'Geta Akwadala',
    image: 'images/items/Geta_Akwadala.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_akwadala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 35,
    stats: [{ stat: 'atk', value: 28 }],
    description: ''
}

item.bouclier_herisse_du_prespic = {
    id: 'bouclier_herisse_du_prespic',
    name: 'Bouclier hérissé du Prespic',
    image: 'images/items/Bouclier_hérissé_du_Prespic.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_du_prespic',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 35,
    stats: [{ stat: 'maxHp', value: 26 }, { stat: 'atk', value: 11 }, { stat: 'flatDamage', value: 3 }],
    description: ''
}

item.anneau_bille = {
    id: 'anneau_bille',
    name: 'Anneau Bille',
    image: 'images/items/Anneau_Bille.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'microplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 36,
    stats: [{ stat: 'atk', value: 28 }],
    description: ''
}

item.ceinture_du_directeur_grunob = {
    id: 'ceinture_du_directeur_grunob',
    name: 'Ceinture du Directeur Grunob',
    image: 'images/items/Ceinture_du_Directeur_Grunob.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_directeur_grunob',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 36,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'spd', value: 6 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.coiffe_du_prespic = {
    id: 'coiffe_du_prespic',
    name: 'Coiffe du Prespic',
    image: 'images/items/Coiffe_du_Prespic.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_prespic',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 36,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.amulette_perle = {
    id: 'amulette_perle',
    name: 'Amulette Perle',
    image: 'images/items/Amulette_Perle.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'microplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 37,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 28 }],
    description: ''
}

item.alliance_akwadala = {
    id: 'alliance_akwadala',
    name: 'Alliance Akwadala',
    image: 'images/items/Alliance_Akwadala.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_akwadala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 37,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 7 }, { stat: 'spd', value: 11 }, { stat: 'res.eau', value: 2 }],
    description: ''
}

item.bague_cristalline = {
    id: 'bague_cristalline',
    name: 'Bague Cristalline',
    image: 'images/items/Bague_Cristalline.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_cristalline',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 37,
    stats: [{ stat: 'atk', value: 11 }],
    description: ''
}

item.l_oxolature = {
    id: 'l_oxolature',
    name: 'L\'oxolature',
    image: 'images/items/L_oxolature.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_la_denree',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 37,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'spd', value: 16 }],
    description: ''
}

item.oxano = {
    id: 'oxano',
    name: 'Oxano',
    image: 'images/items/Oxano.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_la_denree',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 37,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'critChance', value: 1 }, { stat: 'heal', value: 1 }],
    description: ''
}

item.cape_du_prespic = {
    id: 'cape_du_prespic',
    name: 'Cape du Prespic',
    image: 'images/items/Cape_du_Prespic.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_prespic',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 37,
    stats: [{ stat: 'maxHp', value: 26 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.cape_lumette = {
    id: 'cape_lumette',
    name: 'Cape Lumette',
    image: 'images/items/Cape_Lumette.png',
    type: 'equipment',
    slot: 'cape',
    set: 'microplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 38,
    stats: [{ stat: 'atk', value: 57 }, { stat: 'critChance', value: -3 }],
    description: ''
}

item.bottines_de_la_denree = {
    id: 'bottines_de_la_denree',
    name: 'Bottines de la Denrée',
    image: 'images/items/Bottines_de_la_Denrée.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_la_denree',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 38,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 1 }],
    description: ''
}

item.faux_du_directeur_grunob = {
    id: 'faux_du_directeur_grunob',
    name: 'Faux du Directeur Grunob',
    image: 'images/items/Faux_du_Directeur_Grunob.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_directeur_grunob',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 38,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 40 }, { stat: 'spd', value: 6 }, { stat: 'lifestealPct', value: 10 }],
    description: ''
}

item.bottes_du_garde_royal = {
    id: 'bottes_du_garde_royal',
    name: 'Bottes du Garde Royal',
    image: 'images/items/Bottes_du_Garde_Royal.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_garde_royal',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 38,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 11 }],
    description: ''
}

item.ceinture_du_garde_royal = {
    id: 'ceinture_du_garde_royal',
    name: 'Ceinture du Garde Royal',
    image: 'images/items/Ceinture_du_Garde_Royal.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_garde_royal',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 38,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 21 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.anneau_du_prespic = {
    id: 'anneau_du_prespic',
    name: 'Anneau du Prespic',
    image: 'images/items/Anneau_du_Prespic.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_prespic',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 38,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 11 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.ceinture_du_tetounik = {
    id: 'ceinture_du_tetounik',
    name: 'Ceinture du Tétounik',
    image: 'images/items/Ceinture_du_Tétounik.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_tetounik',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 38,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 26 }, { stat: 'heal', value: 4 }],
    description: ''
}

item.abrarc = {
    id: 'abrarc',
    name: 'Abrarc',
    image: 'images/items/Abrarc.png',
    type: 'equipment',
    slot: 'arme',
    set: 'abranoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 39,
    stats: [{ stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 11 }],
    description: ''
}

item.libottes = {
    id: 'libottes',
    name: 'Libottes',
    image: 'images/items/Libottes.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_mace',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 39,
    stats: [{ stat: 'atk', value: 21 }, { stat: 'spd', value: 6 }],
    description: ''
}

item.botte_de_kalkaneus = {
    id: 'botte_de_kalkaneus',
    name: 'Botte de Kalkanéus',
    image: 'images/items/Botte_de_Kalkanéus.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_kalkaneus',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 39,
    stats: [{ stat: 'atk', value: 15 }, { stat: 'flatDamage', value: 4 }],
    description: ''
}

item.ceinture_lardiere = {
    id: 'ceinture_lardiere',
    name: 'Ceinture Lardière',
    image: 'images/items/Ceinture_Lardière.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_peggy_la_porkass',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 39,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 16 }, { stat: 'critChance', value: 1 }],
    description: ''
}

item.ceinture_de_rapiat = {
    id: 'ceinture_de_rapiat',
    name: 'Ceinture de Rapiat',
    image: 'images/items/Ceinture_de_Rapiat.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_rapiat',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 39,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 3 }],
    description: ''
}

item.abracape = {
    id: 'abracape',
    name: 'Abracape',
    image: 'images/items/Abracape.png',
    type: 'equipment',
    slot: 'cape',
    set: 'abranoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [{ stat: 'maxHp', value: 1 }, { stat: 'atk', value: -15 }],
    description: ''
}

item.abranneau = {
    id: 'abranneau',
    name: 'Abranneau',
    image: 'images/items/Abranneau.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'abranoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [{ stat: 'atk', value: -50 }],
    description: ''
}

item.casque_noix = {
    id: 'casque_noix',
    name: 'Casque Noix',
    image: 'images/items/Casque_Noix.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'microplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 37 }],
    description: ''
}

item.bouclier_akwadala = {
    id: 'bouclier_akwadala',
    name: 'Bouclier Akwadala',
    image: 'images/items/Bouclier_Akwadala.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_akwadala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 16 }, { stat: 'critChance', value: 1 }, { stat: 'res.eau', value: 4 }],
    description: ''
}

item.coiffe_fere = {
    id: 'coiffe_fere',
    name: 'Coiffe Fère',
    image: 'images/items/Coiffe_Fère.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_altruiste',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [],
    description: ''
}

item.chapeau_grave = {
    id: 'chapeau_grave',
    name: 'Chapeau Grave',
    image: 'images/items/Chapeau_Grave.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_criminelle',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [],
    description: ''
}

item.bottes_dragocourse = {
    id: 'bottes_dragocourse',
    name: 'Bottes Dragocourse',
    image: 'images/items/Bottes_Dragocourse.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_dragocourse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [{ stat: 'maxHp', value: 11 }, { stat: 'atk', value: 11 }],
    description: ''
}

item.ceinture_dragocourse = {
    id: 'ceinture_dragocourse',
    name: 'Ceinture Dragocourse',
    image: 'images/items/Ceinture_Dragocourse.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_dragocourse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 11 }, { stat: 'spd', value: 6 }],
    description: ''
}

item.chapeau_devin = {
    id: 'chapeau_devin',
    name: 'Chapeau Devin',
    image: 'images/items/Chapeau_Devin.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_enragee',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [],
    description: ''
}

item.chapeau_lithique = {
    id: 'chapeau_lithique',
    name: 'Chapeau Lithique',
    image: 'images/items/Chapeau_Lithique.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_ethylique',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [],
    description: ''
}

item.coiffe_ainte = {
    id: 'coiffe_ainte',
    name: 'Coiffe Ainte',
    image: 'images/items/Coiffe_Ainte.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_explosive',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [],
    description: ''
}

item.bonnet_spairance = {
    id: 'bonnet_spairance',
    name: 'Bonnet Spairance',
    image: 'images/items/Bonnet_Spairance.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_exsangue',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [],
    description: ''
}

item.bonnet_toual = {
    id: 'bonnet_toual',
    name: 'Bonnet Toual',
    image: 'images/items/Bonnet_Toual.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_indestructible',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [],
    description: ''
}

item.bonnet_nufar = {
    id: 'bonnet_nufar',
    name: 'Bonnet Nufar',
    image: 'images/items/Bonnet_Nufar.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_intemporelle',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [],
    description: ''
}

item.baguette_larvesque = {
    id: 'baguette_larvesque',
    name: 'Baguette Larvesque',
    image: 'images/items/Baguette_Larvesque.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_larvesque',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: -19 }, { stat: 'heal', value: 15 }],
    description: ''
}

item.masque_arpone = {
    id: 'masque_arpone',
    name: 'Masque Arpone',
    image: 'images/items/Masque_Arpone.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_lunatique',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [],
    description: ''
}

item.ceinture_pomdeupin = {
    id: 'ceinture_pomdeupin',
    name: 'Ceinture Pomdeupin',
    image: 'images/items/Ceinture_Pomdeupin.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_pomdeupin',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 21 }, { stat: 'spd', value: 16 }],
    description: ''
}

item.coiffe_ondamentale = {
    id: 'coiffe_ondamentale',
    name: 'Coiffe Ondamentale',
    image: 'images/items/Coiffe_Ondamentale.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_quadramentale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [],
    description: ''
}

item.chapeau_tyron = {
    id: 'chapeau_tyron',
    name: 'Chapeau Tyron',
    image: 'images/items/Chapeau_Tyron.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_sauvage',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [],
    description: ''
}

item.scaphandre_ojine = {
    id: 'scaphandre_ojine',
    name: 'Scaphandre Ojine',
    image: 'images/items/Scaphandre_Ojine.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_submersible',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [],
    description: ''
}

item.masque_rosmique = {
    id: 'masque_rosmique',
    name: 'Masque Rosmique',
    image: 'images/items/Masque_Rosmique.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_transcendante',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [],
    description: ''
}

item.casque_keutumedi = {
    id: 'casque_keutumedi',
    name: 'Casque Keutumedi',
    image: 'images/items/Casque_Keutumedi.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_temeraire',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [],
    description: ''
}

item.vegamu = {
    id: 'vegamu',
    name: 'Vegamu',
    image: 'images/items/Vegamu.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_vegetatif',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: -10 }],
    description: ''
}

item.vegacoiffe = {
    id: 'vegacoiffe',
    name: 'Végacoiffe',
    image: 'images/items/Végacoiffe.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_vegetatif',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 2 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.chapeau_taufeu = {
    id: 'chapeau_taufeu',
    name: 'Chapeau Taufeu',
    image: 'images/items/Chapeau_Taufeu.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_venerable',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [],
    description: ''
}

item.caponion = {
    id: 'caponion',
    name: 'Caponion',
    image: 'images/items/Caponion.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_d_ambi_guman',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 16 }],
    description: ''
}

item.chapeau_leufere = {
    id: 'chapeau_leufere',
    name: 'Chapeau Leufère',
    image: 'images/items/Chapeau_Leufère.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_gouttiere',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [],
    description: ''
}

item.ceinture_de_grut = {
    id: 'ceinture_de_grut',
    name: 'Ceinture de Grüt',
    image: 'images/items/Ceinture_de_Grüt.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_grut',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.slip_de_kalkaneus = {
    id: 'slip_de_kalkaneus',
    name: 'Slip de Kalkanéus',
    image: 'images/items/Slip_de_Kalkanéus.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_kalkaneus',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 4 }],
    description: ''
}

item.jambanneau = {
    id: 'jambanneau',
    name: 'Jambanneau',
    image: 'images/items/Jambanneau.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_peggy_la_porkass',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [{ stat: 'atk', value: 7 }, { stat: 'flatDamage', value: 4 }],
    description: ''
}

item.ceinture_de_rekto_topi = {
    id: 'ceinture_de_rekto_topi',
    name: 'Ceinture de Rekto Topi',
    image: 'images/items/Ceinture_de_Rekto_Topi.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_rekto_topi',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'heal', value: 1 }],
    description: ''
}

item.anobra = {
    id: 'anobra',
    name: 'Anobra',
    image: 'images/items/Anobra.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_l_abraknyde',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'flatDamage', value: 2 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.araknamu = {
    id: 'araknamu',
    name: 'Araknamu',
    image: 'images/items/Araknamu.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_l_abraknyde',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [{ stat: 'atk', value: 41 }],
    description: ''
}

item.heaume_erik = {
    id: 'heaume_erik',
    name: 'Heaume Erik',
    image: 'images/items/Heaume_Erik.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_l_heritage',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [],
    description: ''
}

item.capuche_apin = {
    id: 'capuche_apin',
    name: 'Capuche Apin',
    image: 'images/items/Capuche_Apin.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_l_innombrable',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [],
    description: ''
}

item.ceinture_des_redroz = {
    id: 'ceinture_des_redroz',
    name: 'Ceinture des Redroz',
    image: 'images/items/Ceinture_des_Redroz.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_des_redroz',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [{ stat: 'atk', value: 21 }],
    description: ''
}

item.chapeau_du_directeur_grunob = {
    id: 'chapeau_du_directeur_grunob',
    name: 'Chapeau du Directeur Grunob',
    image: 'images/items/Chapeau_du_Directeur_Grunob.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_directeur_grunob',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 43 }, { stat: 'critChance', value: -3 }],
    description: ''
}

item.kwakobottes_de_flammes = {
    id: 'kwakobottes_de_flammes',
    name: 'Kwakobottes de Flammes',
    image: 'images/items/Kwakobottes_de_Flammes.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_kwak_de_flammes',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 1 }, { stat: 'res.feu', value: 3 }],
    description: ''
}

item.kwakobottes_de_glace = {
    id: 'kwakobottes_de_glace',
    name: 'Kwakobottes de Glace',
    image: 'images/items/Kwakobottes_de_Glace.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_kwak_de_glace',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 1 }, { stat: 'res.eau', value: 3 }],
    description: ''
}

item.kwakobottes_de_terre = {
    id: 'kwakobottes_de_terre',
    name: 'Kwakobottes de Terre',
    image: 'images/items/Kwakobottes_de_Terre.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_kwak_de_terre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 1 }, { stat: 'res.terre', value: 3 }],
    description: ''
}

item.kwakobottes_de_vent = {
    id: 'kwakobottes_de_vent',
    name: 'Kwakobottes de Vent',
    image: 'images/items/Kwakobottes_de_Vent.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_kwak_de_vent',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 1 }, { stat: 'res.air', value: 3 }],
    description: ''
}

item.bottes_du_monarque = {
    id: 'bottes_du_monarque',
    name: 'Bottes du Monarque',
    image: 'images/items/Bottes_du_Monarque.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_monarque',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 21 }, { stat: 'critChance', value: 3 }],
    description: ''
}

item.ceinture_du_monarque = {
    id: 'ceinture_du_monarque',
    name: 'Ceinture du Monarque',
    image: 'images/items/Ceinture_du_Monarque.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_monarque',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [{ stat: 'atk', value: 31 }],
    description: ''
}

item.torque_du_monarque = {
    id: 'torque_du_monarque',
    name: 'Torque du Monarque',
    image: 'images/items/Torque_du_Monarque.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_monarque',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 27 }, { stat: 'critChance', value: 2 }, { stat: 'heal', value: 2 }],
    description: ''
}

item.grosse_bagouze_du_parrain = {
    id: 'grosse_bagouze_du_parrain',
    name: 'Grosse Bagouze du Parrain',
    image: 'images/items/Grosse_Bagouze_du_Parrain.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_parrain',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 11 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.souliers_laques_du_parrain = {
    id: 'souliers_laques_du_parrain',
    name: 'Souliers laqués du Parrain',
    image: 'images/items/Souliers_laqués_du_Parrain.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_parrain',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 16 }],
    description: ''
}

item.coiffe_de_robbie_capuche = {
    id: 'coiffe_de_robbie_capuche',
    name: 'Coiffe de Robbie Capuche',
    image: 'images/items/Coiffe_de_Robbie_Capuche.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_prince_des_voleurs',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [],
    description: ''
}

item.chaussures_du_tetounik = {
    id: 'chaussures_du_tetounik',
    name: 'Chaussures du Tétounik',
    image: 'images/items/Chaussures_du_Tétounik.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_tetounik',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'heal', value: 7 }],
    description: ''
}

item.force_de_crocoburio = {
    id: 'force_de_crocoburio',
    name: 'Force de Crocoburio',
    image: 'images/items/Force_de_Crocoburio.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'ame_de_crocoburio',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 40,
    stats: [{ stat: 'maxHp', value: 26 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 4 }],
    description: ''
}

item.mes_petits_sabots = {
    id: 'mes_petits_sabots',
    name: 'Mes Petits Sabots',
    image: 'images/items/Mes_Petits_Sabots.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'ma_petite_panoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 21 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.amulette_akwadala = {
    id: 'amulette_akwadala',
    name: 'Amulette Akwadala',
    image: 'images/items/Amulette_Akwadala.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_akwadala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'maxHp', value: 11 }, { stat: 'atk', value: 11 }, { stat: 'flatDamage', value: 1 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.cape_akwadala = {
    id: 'cape_akwadala',
    name: 'Cape Akwadala',
    image: 'images/items/Cape_Akwadala.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_akwadala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 26 }],
    description: ''
}

item.ceinture_akwadala = {
    id: 'ceinture_akwadala',
    name: 'Ceinture Akwadala',
    image: 'images/items/Ceinture_Akwadala.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_akwadala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'res.eau', value: 4 }],
    description: ''
}

item.ceinture_cristalline = {
    id: 'ceinture_cristalline',
    name: 'Ceinture Cristalline',
    image: 'images/items/Ceinture_Cristalline.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_cristalline',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 4 }, { stat: 'res.feu', value: -5 }],
    description: ''
}

item.ceinture_siks_won_naine = {
    id: 'ceinture_siks_won_naine',
    name: 'Ceinture Siks Won Naïne',
    image: 'images/items/Ceinture_Siks_Won_Naïne.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_siks_won_naine',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 1 }, { stat: 'critChance', value: 1 }],
    description: ''
}

item.bottes_donion = {
    id: 'bottes_donion',
    name: 'Bottes Donion',
    image: 'images/items/Bottes_Donion.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_d_ambi_guman',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 4 }],
    description: ''
}

item.bottes_de_grizou = {
    id: 'bottes_de_grizou',
    name: 'Bottes de Grizou',
    image: 'images/items/Bottes_de_Grizou.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_grizou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.anneau_de_kocksis = {
    id: 'anneau_de_kocksis',
    name: 'Anneau de Kocksis',
    image: 'images/items/Anneau_de_Kocksis.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_kocksis',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'atk', value: 11 }],
    description: ''
}

item.amulette_de_kubitus = {
    id: 'amulette_de_kubitus',
    name: 'Amulette de Kubitus',
    image: 'images/items/Amulette_de_Kubitus.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_kubitus',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'atk', value: 21 }, { stat: 'critChance', value: 3 }],
    description: ''
}

item.amulette_de_laikteur = {
    id: 'amulette_de_laikteur',
    name: 'Amulette de Laikteur',
    image: 'images/items/Amulette_de_Laikteur.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_laikteur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 1 }],
    description: ''
}

item.bottes_de_rapiat = {
    id: 'bottes_de_rapiat',
    name: 'Bottes de Rapiat',
    image: 'images/items/Bottes_de_Rapiat.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_rapiat',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 16 }, { stat: 'spd', value: 6 }, { stat: 'flatDamage', value: 3 }],
    description: ''
}

item.amulette_de_rekto_topi = {
    id: 'amulette_de_rekto_topi',
    name: 'Amulette de Rekto Topi',
    image: 'images/items/Amulette_de_Rekto_Topi.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_rekto_topi',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'atk', value: 31 }, { stat: 'heal', value: 1 }],
    description: ''
}

item.bottes_de_rekto_topi = {
    id: 'bottes_de_rekto_topi',
    name: 'Bottes de Rekto Topi',
    image: 'images/items/Bottes_de_Rekto_Topi.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_rekto_topi',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'atk', value: 23 }, { stat: 'critChance', value: 2 }, { stat: 'heal', value: 2 }],
    description: ''
}

item.ceinture_de_stroud = {
    id: 'ceinture_de_stroud',
    name: 'Ceinture de Stroud',
    image: 'images/items/Ceinture_de_Stroud.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_stroud',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'atk', value: 21 }, { stat: 'spd', value: 6 }],
    description: ''
}

item.bottes_du_chafer_primitif = {
    id: 'bottes_du_chafer_primitif',
    name: 'Bottes du Chafer Primitif',
    image: 'images/items/Bottes_du_Chafer_Primitif.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_des_anciens_chafers',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 6 }],
    description: ''
}

item.cape_du_boostache = {
    id: 'cape_du_boostache',
    name: 'Cape du Boostache',
    image: 'images/items/Cape_du_Boostache.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_boostache',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 5 }],
    description: ''
}

item.kwaklame_de_flammes = {
    id: 'kwaklame_de_flammes',
    name: 'Kwaklame de Flammes',
    image: 'images/items/Kwaklame_de_Flammes.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_kwak_de_flammes',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 2 }, { stat: 'res.feu', value: 2 }],
    description: ''
}

item.kwakoiffe_de_flammes = {
    id: 'kwakoiffe_de_flammes',
    name: 'Kwakoiffe de Flammes',
    image: 'images/items/Kwakoiffe_de_Flammes.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_kwak_de_flammes',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 21 }, { stat: 'res.feu', value: 5 }],
    description: ''
}

item.kwakture_de_flammes = {
    id: 'kwakture_de_flammes',
    name: 'Kwakture de Flammes',
    image: 'images/items/Kwakture_de_Flammes.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_kwak_de_flammes',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 21 }, { stat: 'res.feu', value: 5 }],
    description: ''
}

item.kwape_de_flammes = {
    id: 'kwape_de_flammes',
    name: 'Kwape de Flammes',
    image: 'images/items/Kwape_de_Flammes.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_kwak_de_flammes',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'atk', value: 11 }, { stat: 'spd', value: 3 }, { stat: 'res.feu', value: 3 }],
    description: ''
}

item.kwaklame_de_glace = {
    id: 'kwaklame_de_glace',
    name: 'Kwaklame de Glace',
    image: 'images/items/Kwaklame_de_Glace.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_kwak_de_glace',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 2 }, { stat: 'res.eau', value: 2 }],
    description: ''
}

item.kwakoiffe_de_glace = {
    id: 'kwakoiffe_de_glace',
    name: 'Kwakoiffe de Glace',
    image: 'images/items/Kwakoiffe_de_Glace.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_kwak_de_glace',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 21 }, { stat: 'res.eau', value: 5 }],
    description: ''
}

item.kwakture_de_glace = {
    id: 'kwakture_de_glace',
    name: 'Kwakture de Glace',
    image: 'images/items/Kwakture_de_Glace.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_kwak_de_glace',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 21 }, { stat: 'res.eau', value: 5 }],
    description: ''
}

item.kwape_de_glace = {
    id: 'kwape_de_glace',
    name: 'Kwape de Glace',
    image: 'images/items/Kwape_de_Glace.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_kwak_de_glace',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'atk', value: 11 }, { stat: 'spd', value: 3 }, { stat: 'res.eau', value: 3 }],
    description: ''
}

item.kwaklame_de_terre = {
    id: 'kwaklame_de_terre',
    name: 'Kwaklame de Terre',
    image: 'images/items/Kwaklame_de_Terre.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_kwak_de_terre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 2 }, { stat: 'res.terre', value: 2 }],
    description: ''
}

item.kwakoiffe_de_terre = {
    id: 'kwakoiffe_de_terre',
    name: 'Kwakoiffe de Terre',
    image: 'images/items/Kwakoiffe_de_Terre.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_kwak_de_terre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 21 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.kwakture_de_terre = {
    id: 'kwakture_de_terre',
    name: 'Kwakture de Terre',
    image: 'images/items/Kwakture_de_Terre.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_kwak_de_terre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 21 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.kwape_de_terre = {
    id: 'kwape_de_terre',
    name: 'Kwape de Terre',
    image: 'images/items/Kwape_de_Terre.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_kwak_de_terre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'atk', value: 11 }, { stat: 'spd', value: 3 }, { stat: 'res.terre', value: 3 }],
    description: ''
}

item.kwaklame_de_vent = {
    id: 'kwaklame_de_vent',
    name: 'Kwaklame de Vent',
    image: 'images/items/Kwaklame_de_Vent.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_kwak_de_vent',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 2 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.kwakoiffe_de_vent = {
    id: 'kwakoiffe_de_vent',
    name: 'Kwakoiffe de Vent',
    image: 'images/items/Kwakoiffe_de_Vent.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_kwak_de_vent',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 21 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.kwakture_de_vent = {
    id: 'kwakture_de_vent',
    name: 'Kwakture de Vent',
    image: 'images/items/Kwakture_de_Vent.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_kwak_de_vent',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 21 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.kwape_de_vent = {
    id: 'kwape_de_vent',
    name: 'Kwape de Vent',
    image: 'images/items/Kwape_de_Vent.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_kwak_de_vent',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'atk', value: 11 }, { stat: 'spd', value: 3 }, { stat: 'res.air', value: 3 }],
    description: ''
}

item.bottes_du_vampyre = {
    id: 'bottes_du_vampyre',
    name: 'Bottes du Vampyre',
    image: 'images/items/Bottes_du_Vampyre.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_vampyre_maudit',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 2 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.cape_du_vampyre = {
    id: 'cape_du_vampyre',
    name: 'Cape du Vampyre',
    image: 'images/items/Cape_du_Vampyre.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_vampyre_maudit',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 36 }],
    description: ''
}

item.yugoufle = {
    id: 'yugoufle',
    name: 'Yugoufle',
    image: 'images/items/Yugoufle.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'yugoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 41,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.chispottes = {
    id: 'chispottes',
    name: 'Chispottes',
    image: 'images/items/Chispottes.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'chispanoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 42,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 32 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.golbottes = {
    id: 'golbottes',
    name: 'Golbottes',
    image: 'images/items/Golbottes.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'golpanoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 42,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 21 }, { stat: 'spd', value: 11 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.peignentif = {
    id: 'peignentif',
    name: 'Peignentif',
    image: 'images/items/Peignentif.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'ma_petite_panoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 42,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 3 }, { stat: 'critChance', value: 3 }],
    description: ''
}

item.collertue = {
    id: 'collertue',
    name: 'Collertue',
    image: 'images/items/Collertue.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_mace',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 42,
    stats: [{ stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 3 }, { stat: 'critDamagePct', value: 4 }],
    description: ''
}

item.bottes_siks_won_naine = {
    id: 'bottes_siks_won_naine',
    name: 'Bottes Siks Won Naïne',
    image: 'images/items/Bottes_Siks_Won_Naïne.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_siks_won_naine',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 42,
    stats: [{ stat: 'atk', value: 11 }, { stat: 'flatDamage', value: 2 }, { stat: 'heal', value: 1 }],
    description: ''
}

item.chaponion = {
    id: 'chaponion',
    name: 'Chaponion',
    image: 'images/items/Chaponion.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_d_ambi_guman',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 42,
    stats: [{ stat: 'atk', value: 31 }],
    description: ''
}

item.amulette_de_gobeuf = {
    id: 'amulette_de_gobeuf',
    name: 'Amulette de Gobeuf',
    image: 'images/items/Amulette_de_Gobeuf.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_gobeuf',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 42,
    stats: [{ stat: 'atk', value: 22 }, { stat: 'critChance', value: 3 }],
    description: ''
}

item.ceinture_de_gobeuf = {
    id: 'ceinture_de_gobeuf',
    name: 'Ceinture de Gobeuf',
    image: 'images/items/Ceinture_de_Gobeuf.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_gobeuf',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 42,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.amulette_de_grut = {
    id: 'amulette_de_grut',
    name: 'Amulette de Grüt',
    image: 'images/items/Amulette_de_Grüt.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_grut',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 42,
    stats: [{ stat: 'atk', value: 27 }, { stat: 'flatDamage', value: 1 }],
    description: ''
}

item.bottes_de_kocksis = {
    id: 'bottes_de_kocksis',
    name: 'Bottes de Kocksis',
    image: 'images/items/Bottes_de_Kocksis.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_kocksis',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 42,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.ceinture_de_kocksis = {
    id: 'ceinture_de_kocksis',
    name: 'Ceinture de Kocksis',
    image: 'images/items/Ceinture_de_Kocksis.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_kocksis',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 42,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 31 }, { stat: 'critChance', value: 1 }],
    description: ''
}

item.ceinture_de_kubitus = {
    id: 'ceinture_de_kubitus',
    name: 'Ceinture de Kubitus',
    image: 'images/items/Ceinture_de_Kubitus.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_kubitus',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 42,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 16 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 3 }],
    description: ''
}

item.anneau_de_laikteur = {
    id: 'anneau_de_laikteur',
    name: 'Anneau de Laikteur',
    image: 'images/items/Anneau_de_Laikteur.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_laikteur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 42,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.amulette_de_rapiat = {
    id: 'amulette_de_rapiat',
    name: 'Amulette de Rapiat',
    image: 'images/items/Amulette_de_Rapiat.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_rapiat',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 42,
    stats: [{ stat: 'atk', value: 33 }, { stat: 'critChance', value: -4 }],
    description: ''
}

item.bottes_des_bouftons_rouges = {
    id: 'bottes_des_bouftons_rouges',
    name: 'Bottes des Bouftons Rouges',
    image: 'images/items/Bottes_des_Bouftons_Rouges.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_des_bouftons_rouges',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 42,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.bottes_du_directeur_grunob = {
    id: 'bottes_du_directeur_grunob',
    name: 'Bottes du Directeur Grunob',
    image: 'images/items/Bottes_du_Directeur_Grunob.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_directeur_grunob',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 42,
    stats: [{ stat: 'maxHp', value: 11 }, { stat: 'atk', value: 17 }, { stat: 'spd', value: 15 }],
    description: ''
}

item.bottes_du_kanniboul_ebil = {
    id: 'bottes_du_kanniboul_ebil',
    name: 'Bottes du Kanniboul Ebil',
    image: 'images/items/Bottes_du_Kanniboul_Ebil.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_kanniboul_ebil',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 42,
    stats: [{ stat: 'flatDamage', value: 6 }],
    description: ''
}

item.amukwak_de_flammes = {
    id: 'amukwak_de_flammes',
    name: 'Amukwak de Flammes',
    image: 'images/items/Amukwak_de_Flammes.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_kwak_de_flammes',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 42,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 21 }, { stat: 'critChance', value: 2 }, { stat: 'res.feu', value: 4 }],
    description: ''
}

item.kwakanneau_de_flammes = {
    id: 'kwakanneau_de_flammes',
    name: 'Kwakanneau de Flammes',
    image: 'images/items/Kwakanneau_de_Flammes.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_kwak_de_flammes',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 42,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'res.feu', value: 4 }],
    description: ''
}

item.amukwak_de_glace = {
    id: 'amukwak_de_glace',
    name: 'Amukwak de Glace',
    image: 'images/items/Amukwak_de_Glace.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_kwak_de_glace',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 42,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 21 }, { stat: 'critChance', value: 2 }, { stat: 'res.eau', value: 4 }],
    description: ''
}

item.kwakanneau_de_glace = {
    id: 'kwakanneau_de_glace',
    name: 'Kwakanneau de Glace',
    image: 'images/items/Kwakanneau_de_Glace.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_kwak_de_glace',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 42,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'res.eau', value: 4 }],
    description: ''
}

item.amukwak_de_terre = {
    id: 'amukwak_de_terre',
    name: 'Amukwak de Terre',
    image: 'images/items/Amukwak_de_Terre.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_kwak_de_terre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 42,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 21 }, { stat: 'critChance', value: 2 }, { stat: 'res.terre', value: 4 }],
    description: ''
}

item.kwakanneau_de_terre = {
    id: 'kwakanneau_de_terre',
    name: 'Kwakanneau de Terre',
    image: 'images/items/Kwakanneau_de_Terre.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_kwak_de_terre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 42,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'res.terre', value: 4 }],
    description: ''
}

item.amukwak_de_vent = {
    id: 'amukwak_de_vent',
    name: 'Amukwak de Vent',
    image: 'images/items/Amukwak_de_Vent.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_kwak_de_vent',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 42,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 21 }, { stat: 'critChance', value: 2 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.kwakanneau_de_vent = {
    id: 'kwakanneau_de_vent',
    name: 'Kwakanneau de Vent',
    image: 'images/items/Kwakanneau_de_Vent.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_kwak_de_vent',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 42,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.bottes_du_real_boitar = {
    id: 'bottes_du_real_boitar',
    name: 'Bottes du Real Boitar',
    image: 'images/items/Bottes_du_Real_Boitar.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_real_boitar',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 42,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.anneau_du_vampyre = {
    id: 'anneau_du_vampyre',
    name: 'Anneau du Vampyre',
    image: 'images/items/Anneau_du_Vampyre.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_vampyre_maudit',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 42,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 16 }],
    description: ''
}

item.ceinture_du_vampyre = {
    id: 'ceinture_du_vampyre',
    name: 'Ceinture du Vampyre',
    image: 'images/items/Ceinture_du_Vampyre.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_vampyre_maudit',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 42,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 21 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 4 }],
    description: ''
}

item.masque_du_vampyre = {
    id: 'masque_du_vampyre',
    name: 'Masque du Vampyre',
    image: 'images/items/Masque_du_Vampyre.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_vampyre_maudit',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 42,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.esprit_de_crocoburio = {
    id: 'esprit_de_crocoburio',
    name: 'Esprit de Crocoburio',
    image: 'images/items/Esprit_de_Crocoburio.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'ame_de_crocoburio',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 42,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 31 }, { stat: 'res.feu', value: 4 }],
    description: ''
}

item.la_chaplivate = {
    id: 'la_chaplivate',
    name: 'La Chaplivate',
    image: 'images/items/La_Chaplivate.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'chapanoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 43,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 16 }, { stat: 'critChance', value: 2 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.les_chaplures = {
    id: 'les_chaplures',
    name: 'Les Chaplures',
    image: 'images/items/Les_Chaplures.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'chapanoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 43,
    stats: [{ stat: 'atk', value: 31 }],
    description: ''
}

item.megabottes = {
    id: 'megabottes',
    name: 'Mégabottes',
    image: 'images/items/Mégabottes.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'meganoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 43,
    stats: [{ stat: 'atk', value: 32 }, { stat: 'spd', value: 6 }, { stat: 'res.eau', value: 4 }],
    description: ''
}

item.baton_akwadala = {
    id: 'baton_akwadala',
    name: 'Bâton Akwadala',
    image: 'images/items/Bâton_Akwadala.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_akwadala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 43,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 7 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.chapeau_akwadala = {
    id: 'chapeau_akwadala',
    name: 'Chapeau Akwadala',
    image: 'images/items/Chapeau_Akwadala.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_akwadala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 43,
    stats: [{ stat: 'atk', value: 11 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.bottes_o_feu = {
    id: 'bottes_o_feu',
    name: 'Bottes O\'Feu',
    image: 'images/items/Bottes_O_Feu.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_mijotee',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 43,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 23 }, { stat: 'critResPct', value: 3 }],
    description: ''
}

item.bottes_paupayahn = {
    id: 'bottes_paupayahn',
    name: 'Bottes Paupayahn',
    image: 'images/items/Bottes_Paupayahn.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_paupayahn',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 43,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 7 }, { stat: 'spd', value: 6 }, { stat: 'critChance', value: 2 }, { stat: 'res.air', value: 3 }],
    description: ''
}

item.anneau_pomdeupin = {
    id: 'anneau_pomdeupin',
    name: 'Anneau Pomdeupin',
    image: 'images/items/Anneau_Pomdeupin.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_pomdeupin',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 43,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.collier_sleump = {
    id: 'collier_sleump',
    name: 'Collier Sleump',
    image: 'images/items/Collier_Sleump.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_sleump',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 43,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 11 }, { stat: 'critChance', value: 2 }, { stat: 'heal', value: 1 }],
    description: ''
}

item.les_sleumpettes = {
    id: 'les_sleumpettes',
    name: 'Les Sleumpettes',
    image: 'images/items/Les_Sleumpettes.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_sleump',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 43,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'flatDamage', value: 1 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.bottes_vioutifoule = {
    id: 'bottes_vioutifoule',
    name: 'Bottes Vioutifoule',
    image: 'images/items/Bottes_Vioutifoule.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_vioutifoule',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 43,
    stats: [{ stat: 'atk', value: 23 }, { stat: 'spd', value: 6 }, { stat: 'critChance', value: 2 }, { stat: 'res.feu', value: 3 }],
    description: ''
}

item.anneau_de_grizou = {
    id: 'anneau_de_grizou',
    name: 'Anneau de Grizou',
    image: 'images/items/Anneau_de_Grizou.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_grizou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 43,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 16 }, { stat: 'spd', value: 6 }, { stat: 'critChance', value: 1 }],
    description: ''
}

item.ceinture_de_grizou = {
    id: 'ceinture_de_grizou',
    name: 'Ceinture de Grizou',
    image: 'images/items/Ceinture_de_Grizou.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_grizou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 43,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 1 }],
    description: ''
}

item.ceinture_de_grouillot = {
    id: 'ceinture_de_grouillot',
    name: 'Ceinture de Grouillot',
    image: 'images/items/Ceinture_de_Grouillot.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_grouillot',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 43,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 16 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 4 }],
    description: ''
}

item.amulette_de_kalkaneus = {
    id: 'amulette_de_kalkaneus',
    name: 'Amulette de Kalkanéus',
    image: 'images/items/Amulette_de_Kalkanéus.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_kalkaneus',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 43,
    stats: [{ stat: 'atk', value: 21 }, { stat: 'spd', value: 6 }, { stat: 'flatDamage', value: 3 }, { stat: 'critChance', value: 3 }],
    description: ''
}

item.bottes_de_laikteur = {
    id: 'bottes_de_laikteur',
    name: 'Bottes de Laikteur',
    image: 'images/items/Bottes_de_Laikteur.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_laikteur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 43,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 31 }],
    description: ''
}

item.anneau_de_slait = {
    id: 'anneau_de_slait',
    name: 'Anneau de Slait',
    image: 'images/items/Anneau_de_Slait.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_slait',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 43,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 11 }, { stat: 'heal', value: 1 }],
    description: ''
}

item.bottes_de_slait = {
    id: 'bottes_de_slait',
    name: 'Bottes de Slait',
    image: 'images/items/Bottes_de_Slait.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_slait',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 43,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 4 }, { stat: 'critResPct', value: 4 }, { stat: 'heal', value: 2 }],
    description: ''
}

item.ceinture_de_tracon = {
    id: 'ceinture_de_tracon',
    name: 'Ceinture de Traçon',
    image: 'images/items/Ceinture_de_Traçon.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_tracon',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 43,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 16 }],
    description: ''
}

item.marteau_du_chafer_draugr = {
    id: 'marteau_du_chafer_draugr',
    name: 'Marteau du Chafer Draugr',
    image: 'images/items/Marteau_du_Chafer_Draugr.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_des_anciens_chafers',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 43,
    stats: [{ stat: 'maxHp', value: 26 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 16 }, { stat: 'lifestealPct', value: 3 }],
    description: ''
}

item.gantelet_des_bouftons_rouges = {
    id: 'gantelet_des_bouftons_rouges',
    name: 'Gantelet des Bouftons Rouges',
    image: 'images/items/Gantelet_des_Bouftons_Rouges.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_des_bouftons_rouges',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 43,
    stats: [{ stat: 'atk', value: 26 }, { stat: 'res.eau', value: -2 }, { stat: 'res.terre', value: -2 }],
    description: ''
}

item.alliance_du_kanniboul_ebil = {
    id: 'alliance_du_kanniboul_ebil',
    name: 'Alliance du Kanniboul Ebil',
    image: 'images/items/Alliance_du_Kanniboul_Ebil.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_kanniboul_ebil',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 43,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'flatDamage', value: 4 }],
    description: ''
}

item.gantelet_du_real_boitar = {
    id: 'gantelet_du_real_boitar',
    name: 'Gantelet du Real Boitar',
    image: 'images/items/Gantelet_du_Real_Boitar.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_real_boitar',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 43,
    stats: [{ stat: 'atk', value: 26 }, { stat: 'res.feu', value: -2 }, { stat: 'res.air', value: -2 }],
    description: ''
}

item.anneau_du_scarabosse_dore = {
    id: 'anneau_du_scarabosse_dore',
    name: 'Anneau du Scarabosse Doré',
    image: 'images/items/Anneau_du_Scarabosse_Doré.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_scarabosse_dore',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 43,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 11 }, { stat: 'flatDamage', value: 1 }, { stat: 'heal', value: 4 }],
    description: ''
}

item.scaranneau_blanc = {
    id: 'scaranneau_blanc',
    name: 'Scaranneau Blanc',
    image: 'images/items/Scaranneau_Blanc.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_scarafeuille_blanc',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 43,
    stats: [{ stat: 'maxHp', value: 11 }, { stat: 'atk', value: 16 }, { stat: 'critChance', value: 2 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.scaranneau_bleu = {
    id: 'scaranneau_bleu',
    name: 'Scaranneau Bleu',
    image: 'images/items/Scaranneau_Bleu.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_scarafeuille_bleu',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 43,
    stats: [{ stat: 'maxHp', value: 11 }, { stat: 'atk', value: 16 }, { stat: 'critChance', value: 2 }, { stat: 'res.eau', value: 2 }],
    description: ''
}

item.scarature_noire = {
    id: 'scarature_noire',
    name: 'Scarature Noire',
    image: 'images/items/Scarature_Noire.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_scarafeuille_noir',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 43,
    stats: [{ stat: 'spd', value: 1 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.scaranneau_rouge = {
    id: 'scaranneau_rouge',
    name: 'Scaranneau Rouge',
    image: 'images/items/Scaranneau_Rouge.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_scarafeuille_rouge',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 43,
    stats: [{ stat: 'maxHp', value: 11 }, { stat: 'atk', value: 16 }, { stat: 'critChance', value: 2 }, { stat: 'res.feu', value: 2 }],
    description: ''
}

item.scaranneau_vert = {
    id: 'scaranneau_vert',
    name: 'Scaranneau Vert',
    image: 'images/items/Scaranneau_Vert.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_scarafeuille_vert',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 43,
    stats: [{ stat: 'maxHp', value: 11 }, { stat: 'atk', value: 16 }, { stat: 'critChance', value: 2 }, { stat: 'res.terre', value: 2 }],
    description: ''
}

item.yugolette = {
    id: 'yugolette',
    name: 'Yugolette',
    image: 'images/items/Yugolette.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'yugoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 43,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 21 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 3 }],
    description: ''
}

item.yugure = {
    id: 'yugure',
    name: 'Yugure',
    image: 'images/items/Yugure.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'yugoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 43,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'spd', value: 6 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.mitaines_de_chisp = {
    id: 'mitaines_de_chisp',
    name: 'Mitaines de Chisp',
    image: 'images/items/Mitaines_de_Chisp.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'chispanoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 44,
    stats: [{ stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.fulgu_au_poing = {
    id: 'fulgu_au_poing',
    name: 'Fulgu au poing',
    image: 'images/items/Fulgu_au_poing.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'golpanoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 44,
    stats: [{ stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 2 }, { stat: 'critChance', value: 1 }],
    description: ''
}

item.anneau_de_gobeuf = {
    id: 'anneau_de_gobeuf',
    name: 'Anneau de Gobeuf',
    image: 'images/items/Anneau_de_Gobeuf.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_gobeuf',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 44,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 22 }],
    description: ''
}

item.bottes_de_grouillot = {
    id: 'bottes_de_grouillot',
    name: 'Bottes de Grouillot',
    image: 'images/items/Bottes_de_Grouillot.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_grouillot',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 44,
    stats: [{ stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.bottes_de_grut = {
    id: 'bottes_de_grut',
    name: 'Bottes de Grüt',
    image: 'images/items/Bottes_de_Grüt.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_grut',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 44,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 31 }],
    description: ''
}

item.kabuto_du_chafer_ronin = {
    id: 'kabuto_du_chafer_ronin',
    name: 'Kabuto du Chafer Rōnin',
    image: 'images/items/Kabuto_du_Chafer_Rōnin.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_des_anciens_chafers',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 44,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 2 }, { stat: 'critResPct', value: 4 }],
    description: ''
}

item.anneau_du_boostache = {
    id: 'anneau_du_boostache',
    name: 'Anneau du Boostache',
    image: 'images/items/Anneau_du_Boostache.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_boostache',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 44,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'flatDamage', value: 4 }],
    description: ''
}

item.scaracoiffe_blanche = {
    id: 'scaracoiffe_blanche',
    name: 'Scaracoiffe Blanche',
    image: 'images/items/Scaracoiffe_Blanche.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_scarafeuille_blanc',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 44,
    stats: [{ stat: 'maxHp', value: 1 }, { stat: 'atk', value: 1 }, { stat: 'res.air', value: 1 }],
    description: ''
}

item.scaracoiffe_bleue = {
    id: 'scaracoiffe_bleue',
    name: 'Scaracoiffe Bleue',
    image: 'images/items/Scaracoiffe_Bleue.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_scarafeuille_bleu',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 44,
    stats: [{ stat: 'maxHp', value: 1 }, { stat: 'atk', value: 1 }, { stat: 'res.eau', value: 1 }],
    description: ''
}

item.scaracoiffe_rouge = {
    id: 'scaracoiffe_rouge',
    name: 'Scaracoiffe Rouge',
    image: 'images/items/Scaracoiffe_Rouge.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_scarafeuille_rouge',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 44,
    stats: [{ stat: 'maxHp', value: 1 }, { stat: 'atk', value: 1 }, { stat: 'res.feu', value: 1 }],
    description: ''
}

item.scaracoiffe_verte = {
    id: 'scaracoiffe_verte',
    name: 'Scaracoiffe Verte',
    image: 'images/items/Scaracoiffe_Verte.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_scarafeuille_vert',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 44,
    stats: [{ stat: 'maxHp', value: 1 }, { stat: 'atk', value: 1 }, { stat: 'res.terre', value: 1 }],
    description: ''
}

item.gladiabottes = {
    id: 'gladiabottes',
    name: 'Gladiabottes',
    image: 'images/items/Gladiabottes.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'gladianoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 45,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'flatDamage', value: 4 }, { stat: 'critResPct', value: 7 }],
    description: ''
}

item.megature = {
    id: 'megature',
    name: 'Mégature',
    image: 'images/items/Mégature.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'meganoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 45,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'res.feu', value: 2 }, { stat: 'res.eau', value: 2 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.anneau_paupayahn = {
    id: 'anneau_paupayahn',
    name: 'Anneau Paupayahn',
    image: 'images/items/Anneau_Paupayahn.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_paupayahn',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 45,
    stats: [{ stat: 'maxHp', value: 6 }, { stat: 'atk', value: 11 }, { stat: 'res.air', value: 3 }],
    description: ''
}

item.amulette_de_grilliane = {
    id: 'amulette_de_grilliane',
    name: 'Amulette de Grilliane',
    image: 'images/items/Amulette_de_Grilliane.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_grilliane',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 45,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 14 }, { stat: 'critChance', value: 3 }, { stat: 'heal', value: 1 }],
    description: ''
}

item.bottes_de_kubitus = {
    id: 'bottes_de_kubitus',
    name: 'Bottes de Kubitus',
    image: 'images/items/Bottes_de_Kubitus.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_kubitus',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 45,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.bottes_de_stroud = {
    id: 'bottes_de_stroud',
    name: 'Bottes de Stroud',
    image: 'images/items/Bottes_de_Stroud.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_stroud',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 45,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 21 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.amulette_de_tracon = {
    id: 'amulette_de_tracon',
    name: 'Amulette de Traçon',
    image: 'images/items/Amulette_de_Traçon.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_tracon',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 45,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'flatDamage', value: 6 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.abrabottes = {
    id: 'abrabottes',
    name: 'Abrabottes',
    image: 'images/items/Abrabottes.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_l_abraknyde',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 45,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 6 }, { stat: 'heal', value: 4 }],
    description: ''
}

item.abracapa = {
    id: 'abracapa',
    name: 'Abracapa',
    image: 'images/items/Abracapa.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_l_abraknyde',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 45,
    stats: [{ stat: 'maxHp', value: 1 }, { stat: 'atk', value: 1 }, { stat: 'flatDamage', value: 1 }],
    description: ''
}

item.abracaska = {
    id: 'abracaska',
    name: 'Abracaska',
    image: 'images/items/Abracaska.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_l_abraknyde',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 45,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 35 }, { stat: 'heal', value: 4 }],
    description: ''
}

item.abraton = {
    id: 'abraton',
    name: 'Abraton',
    image: 'images/items/Abraton.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_l_abraknyde',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 45,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: -35 }, { stat: 'spd', value: 16 }, { stat: 'flatDamage', value: 15 }],
    description: ''
}

item.abrature = {
    id: 'abrature',
    name: 'Abrature',
    image: 'images/items/Abrature.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_l_abraknyde',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 45,
    stats: [{ stat: 'atk', value: 11 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.pagne_du_chafer_ronin = {
    id: 'pagne_du_chafer_ronin',
    name: 'Pagne du Chafer Rōnin',
    image: 'images/items/Pagne_du_Chafer_Rōnin.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_des_anciens_chafers',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 45,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 6 }, { stat: 'critResPct', value: 4 }],
    description: ''
}

item.ceinture_du_boostache = {
    id: 'ceinture_du_boostache',
    name: 'Ceinture du Boostache',
    image: 'images/items/Ceinture_du_Boostache.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_boostache',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 45,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 35 }, { stat: 'flatDamage', value: 4 }],
    description: ''
}

item.amulette_du_scarabosse_dore = {
    id: 'amulette_du_scarabosse_dore',
    name: 'Amulette du Scarabosse Doré',
    image: 'images/items/Amulette_du_Scarabosse_Doré.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_scarabosse_dore',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 45,
    stats: [{ stat: 'atk', value: 36 }],
    description: ''
}

item.scaracape_blanche = {
    id: 'scaracape_blanche',
    name: 'Scaracape Blanche',
    image: 'images/items/Scaracape_Blanche.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_scarafeuille_blanc',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 45,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 2 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.scaracape_bleue = {
    id: 'scaracape_bleue',
    name: 'Scaracape Bleue',
    image: 'images/items/Scaracape_Bleue.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_scarafeuille_bleu',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 45,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 2 }, { stat: 'res.eau', value: 4 }],
    description: ''
}

item.scaracape_rouge = {
    id: 'scaracape_rouge',
    name: 'Scaracape Rouge',
    image: 'images/items/Scaracape_Rouge.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_scarafeuille_rouge',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 45,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 2 }, { stat: 'res.feu', value: 4 }],
    description: ''
}

item.scaracape_verte = {
    id: 'scaracape_verte',
    name: 'Scaracape Verte',
    image: 'images/items/Scaracape_Verte.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_scarafeuille_vert',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 45,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 2 }, { stat: 'res.terre', value: 4 }],
    description: ''
}

item.bracelet_du_tetounik = {
    id: 'bracelet_du_tetounik',
    name: 'Bracelet du Tétounik',
    image: 'images/items/Bracelet_du_Tétounik.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_tetounik',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 45,
    stats: [{ stat: 'maxHp', value: 11 }, { stat: 'atk', value: 15 }, { stat: 'heal', value: 2 }],
    description: ''
}

item.amulette_du_vampyre = {
    id: 'amulette_du_vampyre',
    name: 'Amulette du Vampyre',
    image: 'images/items/Amulette_du_Vampyre.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_vampyre_maudit',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 45,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 11 }],
    description: ''
}

item.printanneau = {
    id: 'printanneau',
    name: 'Printanneau',
    image: 'images/items/Printanneau.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'printanoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 45,
    stats: [{ stat: 'maxHp', value: 11 }, { stat: 'atk', value: 22 }],
    description: ''
}

item.abramu = {
    id: 'abramu',
    name: 'Abramu',
    image: 'images/items/Abramu.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'abranoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 46,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: -15 }, { stat: 'flatDamage', value: 4 }],
    description: ''
}

item.abranneau_mou = {
    id: 'abranneau_mou',
    name: 'Abranneau Mou',
    image: 'images/items/Abranneau_Mou.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'abranoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 46,
    stats: [{ stat: 'maxHp', value: 31 }],
    description: ''
}

item.gladialecon = {
    id: 'gladialecon',
    name: 'Gladialeçon',
    image: 'images/items/Gladialeçon.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'gladianoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 46,
    stats: [{ stat: 'atk', value: 31 }],
    description: ''
}

item.ceinture_vioutifoule = {
    id: 'ceinture_vioutifoule',
    name: 'Ceinture Vioutifoule',
    image: 'images/items/Ceinture_Vioutifoule.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_vioutifoule',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 46,
    stats: [{ stat: 'maxHp', value: 26 }, { stat: 'res.feu', value: 2 }, { stat: 'res.eau', value: 2 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.amulette_d_haku = {
    id: 'amulette_d_haku',
    name: 'Amulette d\'Haku',
    image: 'images/items/Amulette_d_Haku.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_d_haku',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 46,
    stats: [{ stat: 'maxHp', value: 26 }, { stat: 'atk', value: 26 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 4 }],
    description: ''
}

item.anneau_d_haku = {
    id: 'anneau_d_haku',
    name: 'Anneau d\'Haku',
    image: 'images/items/Anneau_d_Haku.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_d_haku',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 46,
    stats: [{ stat: 'atk', value: 11 }, { stat: 'spd', value: 6 }, { stat: 'flatDamage', value: 3 }, { stat: 'critResPct', value: 3 }],
    description: ''
}

item.bottes_de_grilliane = {
    id: 'bottes_de_grilliane',
    name: 'Bottes de Grilliane',
    image: 'images/items/Bottes_de_Grilliane.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_grilliane',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 46,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 2 }, { stat: 'heal', value: 1 }],
    description: ''
}

item.anneau_de_grouillot = {
    id: 'anneau_de_grouillot',
    name: 'Anneau de Grouillot',
    image: 'images/items/Anneau_de_Grouillot.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_grouillot',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 46,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 3 }],
    description: ''
}

item.bottes_de_tracon = {
    id: 'bottes_de_tracon',
    name: 'Bottes de Traçon',
    image: 'images/items/Bottes_de_Traçon.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_tracon',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 46,
    stats: [{ stat: 'atk', value: 36 }, { stat: 'flatDamage', value: 3 }],
    description: ''
}

item.ceinture_du_black_wab = {
    id: 'ceinture_du_black_wab',
    name: 'Ceinture du Black Wab',
    image: 'images/items/Ceinture_du_Black_Wab.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_black_wab',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 46,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'flatDamage', value: 4 }, { stat: 'critDamagePct', value: 7 }],
    description: ''
}

item.masque_du_kanniboul_ebil = {
    id: 'masque_du_kanniboul_ebil',
    name: 'Masque du Kanniboul Ebil',
    image: 'images/items/Masque_du_Kanniboul_Ebil.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_kanniboul_ebil',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 46,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'flatDamage', value: 6 }, { stat: 'critResPct', value: 7 }],
    description: ''
}

item.scarature_blanche = {
    id: 'scarature_blanche',
    name: 'Scarature Blanche',
    image: 'images/items/Scarature_Blanche.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_scarafeuille_blanc',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 46,
    stats: [{ stat: 'maxHp', value: 1 }, { stat: 'res.feu', value: 1 }, { stat: 'res.eau', value: 1 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.scarature_bleue = {
    id: 'scarature_bleue',
    name: 'Scarature Bleue',
    image: 'images/items/Scarature_Bleue.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_scarafeuille_bleu',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 46,
    stats: [{ stat: 'maxHp', value: 1 }, { stat: 'res.feu', value: 1 }, { stat: 'res.eau', value: 2 }, { stat: 'res.air', value: 1 }],
    description: ''
}

item.scarature_rouge = {
    id: 'scarature_rouge',
    name: 'Scarature Rouge',
    image: 'images/items/Scarature_Rouge.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_scarafeuille_rouge',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 46,
    stats: [{ stat: 'maxHp', value: 1 }, { stat: 'res.feu', value: 2 }, { stat: 'res.eau', value: 1 }, { stat: 'res.air', value: 1 }],
    description: ''
}

item.scarature_verte = {
    id: 'scarature_verte',
    name: 'Scarature Verte',
    image: 'images/items/Scarature_Verte.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_scarafeuille_vert',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 46,
    stats: [{ stat: 'maxHp', value: 1 }, { stat: 'res.feu', value: 1 }, { stat: 'res.eau', value: 1 }, { stat: 'res.terre', value: 1 }, { stat: 'res.air', value: 1 }],
    description: ''
}

item.amulette_papayou = {
    id: 'amulette_papayou',
    name: 'Amulette Papayou',
    image: 'images/items/Amulette_Papayou.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_papayou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 47,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 3 }],
    description: ''
}

item.bottines_du_black_wab = {
    id: 'bottines_du_black_wab',
    name: 'Bottines du Black Wab',
    image: 'images/items/Bottines_du_Black_Wab.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_black_wab',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 47,
    stats: [{ stat: 'atk', value: 26 }, { stat: 'critChance', value: 1 }],
    description: ''
}

item.sceptre_du_kanniboul_ebil = {
    id: 'sceptre_du_kanniboul_ebil',
    name: 'Sceptre du Kanniboul Ebil',
    image: 'images/items/Sceptre_du_Kanniboul_Ebil.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_kanniboul_ebil',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 47,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 22 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.lainture = {
    id: 'lainture',
    name: 'Lainture',
    image: 'images/items/Lainture.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplienlaine',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 47,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 5 }, { stat: 'res.eau', value: 2 }],
    description: ''
}

item.printatanes = {
    id: 'printatanes',
    name: 'Printatanes',
    image: 'images/items/Printatanes.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'printanoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 47,
    stats: [{ stat: 'atk', value: -4 }, { stat: 'spd', value: 15 }],
    description: ''
}

item.bracelet_gume = {
    id: 'bracelet_gume',
    name: 'Bracelet Gume',
    image: 'images/items/Bracelet_Gume.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_mijotee',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 48,
    stats: [{ stat: 'flatDamage', value: 2 }],
    description: ''
}

item.bottes_d_haku = {
    id: 'bottes_d_haku',
    name: 'Bottes d\'Haku',
    image: 'images/items/Bottes_d_Haku.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_d_haku',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 48,
    stats: [{ stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 3 }, { stat: 'res.eau', value: -2 }],
    description: ''
}

item.anneau_de_karotz = {
    id: 'anneau_de_karotz',
    name: 'Anneau de Karotz',
    image: 'images/items/Anneau_de_Karotz.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_karotz',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 48,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.casquette_de_rakoopeur = {
    id: 'casquette_de_rakoopeur',
    name: 'Casquette de Rakoopeur',
    image: 'images/items/Casquette_de_Rakoopeur.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_rakoopeur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 48,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 6 }, { stat: 'flatDamage', value: 4 }],
    description: ''
}

item.alliance_des_rebelles = {
    id: 'alliance_des_rebelles',
    name: 'Alliance des Rebelles',
    image: 'images/items/Alliance_des_Rebelles.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_des_rebelles',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 48,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 6 }, { stat: 'critChance', value: -11 }],
    description: ''
}

item.amulette_du_boostache = {
    id: 'amulette_du_boostache',
    name: 'Amulette du Boostache',
    image: 'images/items/Amulette_du_Boostache.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_boostache',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 48,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 15 }, { stat: 'flatDamage', value: 4 }],
    description: ''
}

item.calecon_a_bretelles_du_parrain = {
    id: 'calecon_a_bretelles_du_parrain',
    name: 'Caleçon à bretelles du Parrain',
    image: 'images/items/Caleçon_à_bretelles_du_Parrain.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_parrain',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 48,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'critChance', value: 4 }],
    description: ''
}

item.scaranneau_noir = {
    id: 'scaranneau_noir',
    name: 'Scaranneau Noir',
    image: 'images/items/Scaranneau_Noir.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_scarafeuille_noir',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 48,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'critChance', value: 2 }, { stat: 'heal', value: 4 }, { stat: 'res.neutre', value: 2 }],
    description: ''
}

item.sandales_papayou = {
    id: 'sandales_papayou',
    name: 'Sandales Papayou',
    image: 'images/items/Sandales_Papayou.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_papayou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 49,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 4 }],
    description: ''
}

item.tutu_rose = {
    id: 'tutu_rose',
    name: 'Tutu Rose',
    image: 'images/items/Tutu_Rose.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_rose',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 49,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'critChance', value: 3 }],
    description: ''
}

item.anneau_de_gadjete = {
    id: 'anneau_de_gadjete',
    name: 'Anneau de Gadjète',
    image: 'images/items/Anneau_de_Gadjète.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_gadjete',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 49,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 16 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.ceinture_de_gadjete = {
    id: 'ceinture_de_gadjete',
    name: 'Ceinture de Gadjète',
    image: 'images/items/Ceinture_de_Gadjète.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_gadjete',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 49,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 37 }, { stat: 'spd', value: 16 }],
    description: ''
}

item.amulette_de_karotz = {
    id: 'amulette_de_karotz',
    name: 'Amulette de Karotz',
    image: 'images/items/Amulette_de_Karotz.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_karotz',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 49,
    stats: [{ stat: 'atk', value: 21 }, { stat: 'spd', value: 6 }, { stat: 'critChance', value: 3 }],
    description: ''
}

item.amulette_de_logram = {
    id: 'amulette_de_logram',
    name: 'Amulette de Logram',
    image: 'images/items/Amulette_de_Logram.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_logram',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 49,
    stats: [{ stat: 'maxHp', value: 36 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.string_du_mulou = {
    id: 'string_du_mulou',
    name: 'String du Mulou',
    image: 'images/items/String_du_Mulou.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_mulou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 49,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 2 }, { stat: 'res.terre', value: 2 }],
    description: ''
}

item.anodindo = {
    id: 'anodindo',
    name: 'Anodindo',
    image: 'images/items/Anodindo.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panodindo',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'atk', value: 11 }],
    description: ''
}

item.botodindo = {
    id: 'botodindo',
    name: 'Botodindo',
    image: 'images/items/Botodindo.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panodindo',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'flatDamage', value: 4 }, { stat: 'heal', value: 4 }],
    description: ''
}

item.capodindo = {
    id: 'capodindo',
    name: 'Capodindo',
    image: 'images/items/Capodindo.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panodindo',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'spd', value: 15 }],
    description: ''
}

item.chapodindo = {
    id: 'chapodindo',
    name: 'Chapodindo',
    image: 'images/items/Chapodindo.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panodindo',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'flatDamage', value: 3 }, { stat: 'dropRate', value: 2 }],
    description: ''
}

item.coiffe_du_bouftou_ankarton = {
    id: 'coiffe_du_bouftou_ankarton',
    name: 'Coiffe du Bouftou Ankarton',
    image: 'images/items/Coiffe_du_Bouftou_Ankarton.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_ankarton',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [],
    description: ''
}

item.goultard_ankarton = {
    id: 'goultard_ankarton',
    name: 'Goultard Ankarton',
    image: 'images/items/Goultard_Ankarton.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_ankarton',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'flatDamage', value: 12 }],
    description: ''
}

item.amublop_coco = {
    id: 'amublop_coco',
    name: 'Amublop Coco',
    image: 'images/items/Amublop_Coco.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_blop_coco',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 26 }, { stat: 'critChance', value: 4 }],
    description: ''
}

item.blopanneau_coco = {
    id: 'blopanneau_coco',
    name: 'Blopanneau Coco',
    image: 'images/items/Blopanneau_Coco.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_blop_coco',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'atk', value: 31 }],
    description: ''
}

item.bloptes_coco = {
    id: 'bloptes_coco',
    name: 'Bloptes Coco',
    image: 'images/items/Bloptes_Coco.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_blop_coco',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 22 }, { stat: 'spd', value: 11 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.blopture_coco = {
    id: 'blopture_coco',
    name: 'Blopture Coco',
    image: 'images/items/Blopture_Coco.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_blop_coco',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 26 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.amublop_griotte = {
    id: 'amublop_griotte',
    name: 'Amublop Griotte',
    image: 'images/items/Amublop_Griotte.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_blop_griotte',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 26 }, { stat: 'critChance', value: 4 }],
    description: ''
}

item.blopanneau_griotte = {
    id: 'blopanneau_griotte',
    name: 'Blopanneau Griotte',
    image: 'images/items/Blopanneau_Griotte.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_blop_griotte',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'atk', value: 31 }],
    description: ''
}

item.bloptes_griottes = {
    id: 'bloptes_griottes',
    name: 'Bloptes Griottes',
    image: 'images/items/Bloptes_Griottes.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_blop_griotte',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 22 }, { stat: 'spd', value: 11 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.blopture_griotte = {
    id: 'blopture_griotte',
    name: 'Blopture Griotte',
    image: 'images/items/Blopture_Griotte.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_blop_griotte',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 26 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.amublop_indigo = {
    id: 'amublop_indigo',
    name: 'Amublop Indigo',
    image: 'images/items/Amublop_Indigo.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_blop_indigo',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 26 }, { stat: 'critChance', value: 4 }],
    description: ''
}

item.blopanneau_indigo = {
    id: 'blopanneau_indigo',
    name: 'Blopanneau Indigo',
    image: 'images/items/Blopanneau_Indigo.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_blop_indigo',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'atk', value: 31 }],
    description: ''
}

item.bloptes_indigo = {
    id: 'bloptes_indigo',
    name: 'Bloptes Indigo',
    image: 'images/items/Bloptes_Indigo.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_blop_indigo',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 22 }, { stat: 'spd', value: 11 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.blopture_indigo = {
    id: 'blopture_indigo',
    name: 'Blopture Indigo',
    image: 'images/items/Blopture_Indigo.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_blop_indigo',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 26 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.amublop_reinette = {
    id: 'amublop_reinette',
    name: 'Amublop Reinette',
    image: 'images/items/Amublop_Reinette.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_blop_reinette',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 26 }, { stat: 'critChance', value: 4 }],
    description: ''
}

item.blopanneau_reinette = {
    id: 'blopanneau_reinette',
    name: 'Blopanneau Reinette',
    image: 'images/items/Blopanneau_Reinette.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_blop_reinette',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'atk', value: 31 }],
    description: ''
}

item.bloptes_reinette = {
    id: 'bloptes_reinette',
    name: 'Bloptes Reinette',
    image: 'images/items/Bloptes_Reinette.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_blop_reinette',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 22 }, { stat: 'spd', value: 11 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.blopture_reinette = {
    id: 'blopture_reinette',
    name: 'Blopture Reinette',
    image: 'images/items/Blopture_Reinette.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_blop_reinette',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 26 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.ceinture_fulgurante = {
    id: 'ceinture_fulgurante',
    name: 'Ceinture Fulgurante',
    image: 'images/items/Ceinture_Fulgurante.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_fulgurante',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'maxHp', value: 1 }, { stat: 'atk', value: 35 }, { stat: 'flatDamage', value: 1 }],
    description: ''
}

item.cape_ouginak = {
    id: 'cape_ouginak',
    name: 'Cape Ouginak',
    image: 'images/items/Cape_Ouginak.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_ouginakale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 26 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.bottes_de_bowisse = {
    id: 'bottes_de_bowisse',
    name: 'Bottes de Bowisse',
    image: 'images/items/Bottes_de_Bowisse.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_bowisse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'spd', value: 15 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.sabots_aiguilles_de_feline = {
    id: 'sabots_aiguilles_de_feline',
    name: 'Sabots Aiguilles de Féline',
    image: 'images/items/Sabots_Aiguilles_de_Féline.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_feline',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'atk', value: 21 }, { stat: 'spd', value: 15 }],
    description: ''
}

item.anneau_de_logram = {
    id: 'anneau_de_logram',
    name: 'Anneau de Logram',
    image: 'images/items/Anneau_de_Logram.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_logram',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'atk', value: 11 }, { stat: 'critChance', value: 2 }, { stat: 'critResPct', value: 3 }, { stat: 'heal', value: 2 }],
    description: ''
}

item.queue_de_rakoopeur = {
    id: 'queue_de_rakoopeur',
    name: 'Queue de Rakoopeur',
    image: 'images/items/Queue_de_Rakoopeur.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_rakoopeur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.lance_de_guerrier_albueran = {
    id: 'lance_de_guerrier_albueran',
    name: 'Lance de guerrier albueran',
    image: 'images/items/Lance_de_guerrier_albueran.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_guerrier_albueran',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 16 }, { stat: 'lifestealPct', value: 3 }],
    description: ''
}

item.amuronce = {
    id: 'amuronce',
    name: 'Amuronce',
    image: 'images/items/Amuronce.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_ronces',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 46 }, { stat: 'critChance', value: -4 }],
    description: ''
}

item.ceinturonce = {
    id: 'ceinturonce',
    name: 'Ceinturonce',
    image: 'images/items/Ceinturonce.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_ronces',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 6 }],
    description: ''
}

item.lance_de_trappeur_albueran = {
    id: 'lance_de_trappeur_albueran',
    name: 'Lance de trappeur albueran',
    image: 'images/items/Lance_de_trappeur_albueran.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_trappeur_albueran',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 31 }, { stat: 'heal', value: 20 }],
    description: ''
}

item.cape_des_rebelles = {
    id: 'cape_des_rebelles',
    name: 'Cape des Rebelles',
    image: 'images/items/Cape_des_Rebelles.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_des_rebelles',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 10 }, { stat: 'critChance', value: -9 }],
    description: ''
}

item.sac_de_voyage_du_parfait_petit_vulkain = {
    id: 'sac_de_voyage_du_parfait_petit_vulkain',
    name: 'Sac de Voyage du Parfait Petit Vulkain',
    image: 'images/items/Sac_de_Voyage_du_Parfait_Petit_Vulkain.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_vulkain',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'flatDamage', value: 4 }],
    description: ''
}

item.chaussettenlaine = {
    id: 'chaussettenlaine',
    name: 'Chaussettenlaine',
    image: 'images/items/Chaussettenlaine.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplienlaine',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 50,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 16 }, { stat: 'spd', value: 15 }, { stat: 'res.eau', value: 1 }],
    description: ''
}

item.ceinture_de_coffrete = {
    id: 'ceinture_de_coffrete',
    name: 'Ceinture de Coffreté',
    image: 'images/items/Ceinture_de_Coffreté.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_coffre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 51,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 5 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.ballerines_roses = {
    id: 'ballerines_roses',
    name: 'Ballerines Roses',
    image: 'images/items/Ballerines_Roses.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_rose',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 51,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'spd', value: 16 }, { stat: 'flatDamage', value: 3 }, { stat: 'critChance', value: 3 }, { stat: 'critDamagePct', value: 5 }],
    description: ''
}

item.ceinture_d_hulkrap = {
    id: 'ceinture_d_hulkrap',
    name: 'Ceinture d\'Hulkrap',
    image: 'images/items/Ceinture_d_Hulkrap.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_d_hulkrap',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 51,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 2 }, { stat: 'critChance', value: 3 }],
    description: ''
}

item.bottes_de_karotz = {
    id: 'bottes_de_karotz',
    name: 'Bottes de Karotz',
    image: 'images/items/Bottes_de_Karotz.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_karotz',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 51,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 16 }, { stat: 'spd', value: 15 }],
    description: ''
}

item.anneau_de_kloug = {
    id: 'anneau_de_kloug',
    name: 'Anneau de Kloug',
    image: 'images/items/Anneau_de_Kloug.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_kloug',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 51,
    stats: [{ stat: 'atk', value: 22 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.ceinture_de_kloug = {
    id: 'ceinture_de_kloug',
    name: 'Ceinture de Kloug',
    image: 'images/items/Ceinture_de_Kloug.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_kloug',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 51,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 36 }],
    description: ''
}

item.mitaine_des_scalarcin = {
    id: 'mitaine_des_scalarcin',
    name: 'Mitaine des Scalarcin',
    image: 'images/items/Mitaine_des_Scalarcin.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_des_scalarcin',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 51,
    stats: [{ stat: 'atk', value: 32 }, { stat: 'flatDamage', value: 2 }, { stat: 'critChance', value: 3 }],
    description: ''
}

item.anneau_du_mulou = {
    id: 'anneau_du_mulou',
    name: 'Anneau du Mulou',
    image: 'images/items/Anneau_du_Mulou.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_mulou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 51,
    stats: [{ stat: 'atk', value: 21 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.anneau_du_roks_or = {
    id: 'anneau_du_roks_or',
    name: 'Anneau du Roks Or',
    image: 'images/items/Anneau_du_Roks_Or.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_roks_or',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 51,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 11 }, { stat: 'heal', value: 1 }],
    description: ''
}

item.scarature_doree = {
    id: 'scarature_doree',
    name: 'Scarature Dorée',
    image: 'images/items/Scarature_Dorée.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_scarabosse_dore',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 51,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 21 }, { stat: 'critChance', value: 2 }, { stat: 'heal', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.scaracape_noire = {
    id: 'scaracape_noire',
    name: 'Scaracape Noire',
    image: 'images/items/Scaracape_Noire.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_scarafeuille_noir',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 51,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'flatDamage', value: 18 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.bottes_de_klume = {
    id: 'bottes_de_klume',
    name: 'Bottes de Klüme',
    image: 'images/items/Bottes_de_Klüme.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_klume',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 52,
    stats: [{ stat: 'maxHp', value: -30 }, { stat: 'atk', value: -15 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 3 }],
    description: ''
}

item.ceinture_de_klume = {
    id: 'ceinture_de_klume',
    name: 'Ceinture de Klüme',
    image: 'images/items/Ceinture_de_Klüme.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_klume',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 52,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 52 }],
    description: ''
}

item.serpe_de_rakoopeur = {
    id: 'serpe_de_rakoopeur',
    name: 'Serpe de Rakoopeur',
    image: 'images/items/Serpe_de_Rakoopeur.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_rakoopeur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 52,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: -4 }, { stat: 'flatDamage', value: 16 }],
    description: ''
}

item.anneau_de_guerrier_albueran = {
    id: 'anneau_de_guerrier_albueran',
    name: 'Anneau de guerrier albueran',
    image: 'images/items/Anneau_de_guerrier_albueran.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_guerrier_albueran',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 52,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 31 }],
    description: ''
}

item.ceinture_de_trappeur_albueran = {
    id: 'ceinture_de_trappeur_albueran',
    name: 'Ceinture de trappeur albueran',
    image: 'images/items/Ceinture_de_trappeur_albueran.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_trappeur_albueran',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 52,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 31 }, { stat: 'heal', value: 6 }],
    description: ''
}

item.bottes_des_rebelles = {
    id: 'bottes_des_rebelles',
    name: 'Bottes des Rebelles',
    image: 'images/items/Bottes_des_Rebelles.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_des_rebelles',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 52,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 11 }, { stat: 'spd', value: 15 }, { stat: 'critChance', value: -10 }],
    description: ''
}

item.kwakwalliance = {
    id: 'kwakwalliance',
    name: 'Kwakwalliance',
    image: 'images/items/Kwakwalliance.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_kwakwa',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 52,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'flatDamage', value: 8 }],
    description: ''
}

item.kwakwanneau = {
    id: 'kwakwanneau',
    name: 'Kwakwanneau',
    image: 'images/items/Kwakwanneau.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_kwakwa',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 52,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'flatDamage', value: 8 }],
    description: ''
}

item.casque_du_roks_or = {
    id: 'casque_du_roks_or',
    name: 'Casque du Roks Or',
    image: 'images/items/Casque_du_Roks_Or.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_roks_or',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 52,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 16 }, { stat: 'critChance', value: 4 }],
    description: ''
}

item.chapeau_du_vulkain = {
    id: 'chapeau_du_vulkain',
    name: 'Chapeau du Vulkain',
    image: 'images/items/Chapeau_du_Vulkain.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_vulkain',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 52,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 26 }, { stat: 'flatDamage', value: 4 }, { stat: 'critResPct', value: 5 }],
    description: ''
}

item.boffes_cottre = {
    id: 'boffes_cottre',
    name: 'Boffes Cottre',
    image: 'images/items/Boffes_Cottre.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_coffre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 53,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 2 }, { stat: 'critChance', value: 2 }, { stat: 'critResPct', value: -10 }],
    description: ''
}

item.alliance_d_hichete = {
    id: 'alliance_d_hichete',
    name: 'Alliance d\'Hichète',
    image: 'images/items/Alliance_d_Hichète.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_d_hichete',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 53,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 3 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.amulette_d_hulkrap = {
    id: 'amulette_d_hulkrap',
    name: 'Amulette d\'Hulkrap',
    image: 'images/items/Amulette_d_Hulkrap.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_d_hulkrap',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 53,
    stats: [{ stat: 'atk', value: 46 }, { stat: 'spd', value: 6 }],
    description: ''
}

item.bottes_d_hulkrap = {
    id: 'bottes_d_hulkrap',
    name: 'Bottes d\'Hulkrap',
    image: 'images/items/Bottes_d_Hulkrap.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_d_hulkrap',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 53,
    stats: [{ stat: 'maxHp', value: -30 }, { stat: 'atk', value: -15 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 3 }],
    description: ''
}

item.collier_de_feline = {
    id: 'collier_de_feline',
    name: 'Collier de Féline',
    image: 'images/items/Collier_de_Féline.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_feline',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 53,
    stats: [{ stat: 'maxHp', value: 26 }, { stat: 'atk', value: 26 }, { stat: 'spd', value: 11 }, { stat: 'critChance', value: 1 }, { stat: 'critResPct', value: 4 }],
    description: ''
}

item.amulette_de_kloug = {
    id: 'amulette_de_kloug',
    name: 'Amulette de Kloug',
    image: 'images/items/Amulette_de_Kloug.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_kloug',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 53,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 4 }],
    description: ''
}

item.geta_de_logram = {
    id: 'geta_de_logram',
    name: 'Geta de Logram',
    image: 'images/items/Geta_de_Logram.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_logram',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 53,
    stats: [{ stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 4 }, { stat: 'critResPct', value: 4 }, { stat: 'res.neutre', value: -3 }],
    description: ''
}

item.amulette_de_mirh = {
    id: 'amulette_de_mirh',
    name: 'Amulette de Mirh',
    image: 'images/items/Amulette_de_Mirh.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_mirh',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 53,
    stats: [{ stat: 'atk', value: 41 }, { stat: 'spd', value: 6 }, { stat: 'heal', value: 2 }],
    description: ''
}

item.chaussettes_des_scalarcin = {
    id: 'chaussettes_des_scalarcin',
    name: 'Chaussettes des Scalarcin',
    image: 'images/items/Chaussettes_des_Scalarcin.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_des_scalarcin',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 53,
    stats: [{ stat: 'atk', value: 32 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 2 }, { stat: 'critChance', value: 3 }],
    description: ''
}

item.anneau_du_koalak = {
    id: 'anneau_du_koalak',
    name: 'Anneau du Koalak',
    image: 'images/items/Anneau_du_Koalak.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_koalak',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 53,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'res.feu', value: 4 }],
    description: ''
}

item.ceinture_amincissante = {
    id: 'ceinture_amincissante',
    name: 'Ceinture Amincissante',
    image: 'images/items/Ceinture_Amincissante.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_mawabouaino',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 53,
    stats: [{ stat: 'maxHp', value: 42 }, { stat: 'atk', value: 24 }, { stat: 'spd', value: 3 }, { stat: 'flatDamage', value: 3 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.ceinture_du_roks_or = {
    id: 'ceinture_du_roks_or',
    name: 'Ceinture du Roks Or',
    image: 'images/items/Ceinture_du_Roks_Or.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_roks_or',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 53,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 31 }],
    description: ''
}

item.scaracoiffe_noire = {
    id: 'scaracoiffe_noire',
    name: 'Scaracoiffe Noire',
    image: 'images/items/Scaracoiffe_Noire.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_scarafeuille_noir',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 53,
    stats: [{ stat: 'maxHp', value: 6 }, { stat: 'atk', value: 15 }, { stat: 'flatDamage', value: 1 }],
    description: ''
}

item.annokami = {
    id: 'annokami',
    name: 'Annokami',
    image: 'images/items/Annokami.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panokami',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 54,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 3 }],
    description: ''
}

item.amulette_d_ougicle = {
    id: 'amulette_d_ougicle',
    name: 'Amulette d\'Ougicle',
    image: 'images/items/Amulette_d_Ougicle.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_d_ougicle',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 54,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 51 }],
    description: ''
}

item.ceinture_de_danioule = {
    id: 'ceinture_de_danioule',
    name: 'Ceinture de Danioule',
    image: 'images/items/Ceinture_de_Danioule.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_danioule',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 54,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 7 }, { stat: 'res.terre', value: 3 }],
    description: ''
}

item.anneau_de_klume = {
    id: 'anneau_de_klume',
    name: 'Anneau de Klüme',
    image: 'images/items/Anneau_de_Klüme.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_klume',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 54,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'spd', value: 6 }, { stat: 'flatDamage', value: 3 }],
    description: ''
}

item.amulette_de_guerrier_albueran = {
    id: 'amulette_de_guerrier_albueran',
    name: 'Amulette de guerrier albueran',
    image: 'images/items/Amulette_de_guerrier_albueran.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_guerrier_albueran',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 54,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 46 }],
    description: ''
}

item.bottes_de_trappeur_albueran = {
    id: 'bottes_de_trappeur_albueran',
    name: 'Bottes de trappeur albueran',
    image: 'images/items/Bottes_de_trappeur_albueran.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_trappeur_albueran',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 54,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 16 }, { stat: 'spd', value: 15 }],
    description: ''
}

item.kwakwaffe = {
    id: 'kwakwaffe',
    name: 'Kwakwaffe',
    image: 'images/items/Kwakwaffe.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_kwakwa',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 54,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 7 }, { stat: 'flatDamage', value: 16 }],
    description: ''
}

item.cape_du_roks_or = {
    id: 'cape_du_roks_or',
    name: 'Cape du Roks Or',
    image: 'images/items/Cape_du_Roks_Or.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_roks_or',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 54,
    stats: [{ stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 3 }],
    description: ''
}

item.scarabottes_dorees = {
    id: 'scarabottes_dorees',
    name: 'Scarabottes Dorées',
    image: 'images/items/Scarabottes_Dorées.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_scarabosse_dore',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 54,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'spd', value: 15 }],
    description: ''
}

item.anneau_du_vulkain = {
    id: 'anneau_du_vulkain',
    name: 'Anneau du Vulkain',
    image: 'images/items/Anneau_du_Vulkain.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_vulkain',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 54,
    stats: [{ stat: 'atk', value: 21 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.bracilozite = {
    id: 'bracilozite',
    name: 'Bracilozité',
    image: 'images/items/Bracilozité.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplilozite',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 54,
    stats: [{ stat: 'atk', value: 6 }, { stat: 'flatDamage', value: 6 }],
    description: ''
}

item.amusonnier = {
    id: 'amusonnier',
    name: 'Amusonnier',
    image: 'images/items/Amusonnier.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplisonnier',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 54,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 3 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.diplamu = {
    id: 'diplamu',
    name: 'Diplamu',
    image: 'images/items/Diplamu.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'diplanoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 55,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 29 }, { stat: 'dropRate', value: 1 }, { stat: 'res.air', value: 3 }],
    description: ''
}

item.glaglano = {
    id: 'glaglano',
    name: 'Glaglano',
    image: 'images/items/Glaglano.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'glaglanoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 55,
    stats: [{ stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 3 }],
    description: ''
}

item.botomuldo = {
    id: 'botomuldo',
    name: 'Botomuldo',
    image: 'images/items/Botomuldo.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panomuldo',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 55,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'spd', value: 15 }, { stat: 'res.feu', value: 3 }, { stat: 'res.air', value: 3 }],
    description: ''
}

item.capomuldo = {
    id: 'capomuldo',
    name: 'Capomuldo',
    image: 'images/items/Capomuldo.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panomuldo',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 55,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'res.eau', value: 3 }, { stat: 'res.terre', value: 3 }],
    description: ''
}

item.chapomuldo = {
    id: 'chapomuldo',
    name: 'Chapomuldo',
    image: 'images/items/Chapomuldo.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panomuldo',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 55,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'spd', value: 15 }, { stat: 'res.neutre', value: 3 }],
    description: ''
}

item.caskoffre = {
    id: 'caskoffre',
    name: 'Caskoffre',
    image: 'images/items/Caskoffre.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_coffre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 55,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 8 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.cape_fulgurante = {
    id: 'cape_fulgurante',
    name: 'Cape Fulgurante',
    image: 'images/items/Cape_Fulgurante.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_fulgurante',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 55,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 35 }],
    description: ''
}

item.ceinture_de_mirh = {
    id: 'ceinture_de_mirh',
    name: 'Ceinture de Mirh',
    image: 'images/items/Ceinture_de_Mirh.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_mirh',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 55,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.dagu_os_des_scalarcin = {
    id: 'dagu_os_des_scalarcin',
    name: 'Dagu\'os des Scalarcin',
    image: 'images/items/Dagu_os_des_Scalarcin.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_des_scalarcin',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 55,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 32 }, { stat: 'flatDamage', value: 9 }, { stat: 'critChance', value: 3 }, { stat: 'lifestealPct', value: 5 }],
    description: ''
}

item.anneau_du_kitsou = {
    id: 'anneau_du_kitsou',
    name: 'Anneau du Kitsou',
    image: 'images/items/Anneau_du_Kitsou.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_kitsou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 55,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'res.eau', value: 4 }, { stat: 'res.terre', value: 4 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.hache_du_mulou = {
    id: 'hache_du_mulou',
    name: 'Hache du Mulou',
    image: 'images/items/Hache_du_Mulou.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_mulou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 55,
    stats: [{ stat: 'maxHp', value: 46 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 20 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.bottokami = {
    id: 'bottokami',
    name: 'Bottokami',
    image: 'images/items/Bottokami.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panokami',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 56,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 36 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.pendentiffre = {
    id: 'pendentiffre',
    name: 'Pendentiffre',
    image: 'images/items/Pendentiffre.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_coffre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 56,
    stats: [{ stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 4 }],
    description: ''
}

item.vegacape = {
    id: 'vegacape',
    name: 'Vegacape',
    image: 'images/items/Vegacape.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_vegetatif',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 56,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 5 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.ceinture_d_hichete = {
    id: 'ceinture_d_hichete',
    name: 'Ceinture d\'Hichète',
    image: 'images/items/Ceinture_d_Hichète.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_d_hichete',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 56,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 50 }],
    description: ''
}

item.anneau_d_ougicle = {
    id: 'anneau_d_ougicle',
    name: 'Anneau d\'Ougicle',
    image: 'images/items/Anneau_d_Ougicle.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_d_ougicle',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 56,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 16 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.sabottes_de_danioule = {
    id: 'sabottes_de_danioule',
    name: 'Sabottes de Danioule',
    image: 'images/items/Sabottes_de_Danioule.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_danioule',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 56,
    stats: [{ stat: 'atk', value: 21 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.anneau_de_mirh = {
    id: 'anneau_de_mirh',
    name: 'Anneau de Mirh',
    image: 'images/items/Anneau_de_Mirh.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_mirh',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 56,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 14 }, { stat: 'flatDamage', value: 3 }],
    description: ''
}

item.ceinture_de_piggy_paupe = {
    id: 'ceinture_de_piggy_paupe',
    name: 'Ceinture de Piggy Paupe',
    image: 'images/items/Ceinture_de_Piggy_Paupe.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_piggy_paupe',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 56,
    stats: [{ stat: 'maxHp', value: 26 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 3 }, { stat: 'critChance', value: 2 }, { stat: 'critResPct', value: 3 }],
    description: ''
}

item.kwakwalame = {
    id: 'kwakwalame',
    name: 'Kwakwalame',
    image: 'images/items/Kwakwalame.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_kwakwa',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 56,
    stats: [{ stat: 'atk', value: -21 }, { stat: 'flatDamage', value: 32 }],
    description: ''
}

item.rondelle_de_waddict = {
    id: 'rondelle_de_waddict',
    name: 'Rondelle de Waddict',
    image: 'images/items/Rondelle_de_Waddict.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_mawabouaino',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 56,
    stats: [{ stat: 'maxHp', value: 18 }, { stat: 'atk', value: 27 }],
    description: ''
}

item.bottes_du_vulkain = {
    id: 'bottes_du_vulkain',
    name: 'Bottes du Vulkain',
    image: 'images/items/Bottes_du_Vulkain.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_vulkain',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 56,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 11 }, { stat: 'spd', value: 15 }, { stat: 'heal', value: 2 }],
    description: ''
}

item.bottilozite = {
    id: 'bottilozite',
    name: 'Bottilozité',
    image: 'images/items/Bottilozité.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplilozite',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 56,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 6 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.plumodales = {
    id: 'plumodales',
    name: 'Plumodales',
    image: 'images/items/Plumodales.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'plumoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 56,
    stats: [{ stat: 'atk', value: 21 }, { stat: 'spd', value: 16 }, { stat: 'critChance', value: 4 }, { stat: 'heal', value: 7 }],
    description: ''
}

item.diplanneau = {
    id: 'diplanneau',
    name: 'Diplanneau',
    image: 'images/items/Diplanneau.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'diplanoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 57,
    stats: [{ stat: 'flatDamage', value: 12 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.glaglamu = {
    id: 'glaglamu',
    name: 'Glaglamu',
    image: 'images/items/Glaglamu.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'glaglanoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 57,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 4 }],
    description: ''
}

item.alliance_aerdala = {
    id: 'alliance_aerdala',
    name: 'Alliance Aerdala',
    image: 'images/items/Alliance_Aerdala.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_aerdala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 57,
    stats: [{ stat: 'atk', value: 21 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.geta_aerdala = {
    id: 'geta_aerdala',
    name: 'Geta Aerdala',
    image: 'images/items/Geta_Aerdala.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_aerdala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 57,
    stats: [{ stat: 'atk', value: 21 }, { stat: 'spd', value: 15 }],
    description: ''
}

item.bottauffe_souris = {
    id: 'bottauffe_souris',
    name: 'Bottauffe-souris',
    image: 'images/items/Bottauffe-souris.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_chauffe_souris',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 57,
    stats: [{ stat: 'atk', value: 19 }, { stat: 'flatDamage', value: 6 }, { stat: 'heal', value: 3 }],
    description: ''
}

item.amulette_d_hichete = {
    id: 'amulette_d_hichete',
    name: 'Amulette d\'Hichète',
    image: 'images/items/Amulette_d_Hichète.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_d_hichete',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 57,
    stats: [{ stat: 'atk', value: 46 }],
    description: ''
}

item.ceinture_d_ougicle = {
    id: 'ceinture_d_ougicle',
    name: 'Ceinture d\'Ougicle',
    image: 'images/items/Ceinture_d_Ougicle.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_d_ougicle',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 57,
    stats: [{ stat: 'maxHp', value: 26 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.mawabottes = {
    id: 'mawabottes',
    name: 'Mawabottes',
    image: 'images/items/Mawabottes.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_mawabouaino',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 57,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 11 }, { stat: 'spd', value: 15 }],
    description: ''
}

item.amuloumulette = {
    id: 'amuloumulette',
    name: 'Amuloumulette',
    image: 'images/items/Amuloumulette.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_mulou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 57,
    stats: [{ stat: 'atk', value: 6 }, { stat: 'flatDamage', value: 2 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.amulette_stroplante = {
    id: 'amulette_stroplante',
    name: 'Amulette Stroplante',
    image: 'images/items/Amulette_Stroplante.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_stroplante',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 58,
    stats: [{ stat: 'atk', value: 51 }],
    description: ''
}

item.amulette_de_piggy_paupe = {
    id: 'amulette_de_piggy_paupe',
    name: 'Amulette de Piggy Paupe',
    image: 'images/items/Amulette_de_Piggy_Paupe.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_piggy_paupe',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 58,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 46 }],
    description: ''
}

item.craquamulette = {
    id: 'craquamulette',
    name: 'Craquamulette',
    image: 'images/items/Craquamulette.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_craqueleur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 58,
    stats: [{ stat: 'atk', value: 46 }, { stat: 'res.terre', value: 1 }],
    description: ''
}

item.amulette_du_kitsou = {
    id: 'amulette_du_kitsou',
    name: 'Amulette du Kitsou',
    image: 'images/items/Amulette_du_Kitsou.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_kitsou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 58,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 15 }, { stat: 'spd', value: 21 }],
    description: ''
}

item.scaracape_doree = {
    id: 'scaracape_doree',
    name: 'Scaracape Dorée',
    image: 'images/items/Scaracape_Dorée.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_scarabosse_dore',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 58,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 15 }, { stat: 'spd', value: 16 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.scaracoiffe_doree = {
    id: 'scaracoiffe_doree',
    name: 'Scaracoiffe Dorée',
    image: 'images/items/Scaracoiffe_Dorée.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_scarabosse_dore',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 58,
    stats: [{ stat: 'atk', value: 21 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 1 }, { stat: 'res.neutre', value: 2 }],
    description: ''
}

item.bracelet_du_vulkain = {
    id: 'bracelet_du_vulkain',
    name: 'Bracelet du Vulkain',
    image: 'images/items/Bracelet_du_Vulkain.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_vulkain',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 58,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'flatDamage', value: 4 }, { stat: 'heal', value: 11 }],
    description: ''
}

item.bottinokio = {
    id: 'bottinokio',
    name: 'Bottinokio',
    image: 'images/items/Bottinokio.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplinokio',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 58,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 36 }, { stat: 'flatDamage', value: 4 }],
    description: ''
}

item.ceintusonnier = {
    id: 'ceintusonnier',
    name: 'Ceintusonnier',
    image: 'images/items/Ceintusonnier.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplisonnier',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 58,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 21 }, { stat: 'critChance', value: 4 }, { stat: 'heal', value: 4 }],
    description: ''
}

item.anoppinz = {
    id: 'anoppinz',
    name: 'Anoppinz',
    image: 'images/items/Anoppinz.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoppinz',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 58,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 14 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.anauffe_souris = {
    id: 'anauffe_souris',
    name: 'Anauffe-souris',
    image: 'images/items/Anauffe-souris.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_chauffe_souris',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 59,
    stats: [{ stat: 'atk', value: 14 }, { stat: 'flatDamage', value: 3 }],
    description: ''
}

item.alliance_apaisante = {
    id: 'alliance_apaisante',
    name: 'Alliance Apaisante',
    image: 'images/items/Alliance_Apaisante.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_palliative',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 59,
    stats: [{ stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 4 }],
    description: ''
}

item.anneau_stroplante = {
    id: 'anneau_stroplante',
    name: 'Anneau Stroplante',
    image: 'images/items/Anneau_Stroplante.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_stroplante',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 59,
    stats: [{ stat: 'atk', value: 29 }, { stat: 'spd', value: 6 }],
    description: ''
}

item.anneau_de_piggy_paupe = {
    id: 'anneau_de_piggy_paupe',
    name: 'Anneau de Piggy Paupe',
    image: 'images/items/Anneau_de_Piggy_Paupe.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_piggy_paupe',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 59,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 26 }],
    description: ''
}

item.oreilles_de_wabbits = {
    id: 'oreilles_de_wabbits',
    name: 'Oreilles de Wabbits',
    image: 'images/items/Oreilles_de_Wabbits.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_la_cawotte',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 59,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 36 }, { stat: 'flatDamage', value: 4 }],
    description: ''
}

item.bottes_du_craqueleur = {
    id: 'bottes_du_craqueleur',
    name: 'Bottes du Craqueleur',
    image: 'images/items/Bottes_du_Craqueleur.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_craqueleur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 59,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 7 }, { stat: 'spd', value: 15 }, { stat: 'res.terre', value: 2 }],
    description: ''
}

item.baguette_du_scarabosse_dore = {
    id: 'baguette_du_scarabosse_dore',
    name: 'Baguette du Scarabosse Doré',
    image: 'images/items/Baguette_du_Scarabosse_Doré.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_scarabosse_dore',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 59,
    stats: [{ stat: 'atk', value: 32 }, { stat: 'heal', value: 22 }],
    description: ''
}

item.slip_kangouwou_du_wabbit_gm = {
    id: 'slip_kangouwou_du_wabbit_gm',
    name: 'Slip Kangouwou du Wabbit GM',
    image: 'images/items/Slip_Kangouwou_du_Wabbit_GM.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_wabbit',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 59,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'critChance', value: 6 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.bottoppinz = {
    id: 'bottoppinz',
    name: 'Bottoppinz',
    image: 'images/items/Bottoppinz.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoppinz',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 59,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 26 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.plumamulette = {
    id: 'plumamulette',
    name: 'Plumamulette',
    image: 'images/items/Plumamulette.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'plumoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 59,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 16 }, { stat: 'heal', value: 3 }],
    description: ''
}

item.gelamu = {
    id: 'gelamu',
    name: 'Gelamu',
    image: 'images/items/Gelamu.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_gelax',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 60,
    stats: [{ stat: 'atk', value: 15 }, { stat: 'spd', value: 21 }],
    description: ''
}

item.gelano = {
    id: 'gelano',
    name: 'Gelano',
    image: 'images/items/Gelano.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_gelax',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 60,
    stats: [{ stat: 'atk', value: 35 }],
    description: ''
}

item.gelobottes = {
    id: 'gelobottes',
    name: 'Gelobottes',
    image: 'images/items/Gelobottes.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_gelax',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 60,
    stats: [{ stat: 'spd', value: 15 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.gelocape = {
    id: 'gelocape',
    name: 'Gelocape',
    image: 'images/items/Gelocape.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_gelax',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 60,
    stats: [{ stat: 'atk', value: 30 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.gelocoiffe = {
    id: 'gelocoiffe',
    name: 'Gelocoiffe',
    image: 'images/items/Gelocoiffe.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_gelax',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 60,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 21 }, { stat: 'heal', value: 4 }, { stat: 'dropRate', value: 3 }],
    description: ''
}

item.geloture = {
    id: 'geloture',
    name: 'Geloture',
    image: 'images/items/Geloture.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_gelax',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 60,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 41 }, { stat: 'critChance', value: 4 }],
    description: ''
}

item.pendentif_curatif = {
    id: 'pendentif_curatif',
    name: 'Pendentif Curatif',
    image: 'images/items/Pendentif_Curatif.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_palliative',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 60,
    stats: [{ stat: 'atk', value: 61 }, { stat: 'heal', value: 4 }, { stat: 'res.feu', value: -5 }, { stat: 'res.terre', value: -5 }],
    description: ''
}

item.carabottes = {
    id: 'carabottes',
    name: 'Carabottes',
    image: 'images/items/Carabottes.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_tortue',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 60,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 41 }, { stat: 'heal', value: 4 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.caracape = {
    id: 'caracape',
    name: 'Caracape',
    image: 'images/items/Caracape.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_tortue',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 60,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 21 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.caracoiffe = {
    id: 'caracoiffe',
    name: 'Caracoiffe',
    image: 'images/items/Caracoiffe.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_tortue',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 60,
    stats: [{ stat: 'maxHp', value: 1 }, { stat: 'atk', value: 35 }],
    description: ''
}

item.sac_cawotte = {
    id: 'sac_cawotte',
    name: 'Sac-Cawotte',
    image: 'images/items/Sac-Cawotte.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_la_cawotte',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 60,
    stats: [{ stat: 'atk', value: 11 }, { stat: 'flatDamage', value: 2 }, { stat: 'res.eau', value: 2 }, { stat: 'res.terre', value: 2 }],
    description: ''
}

item.tongues_wabbits = {
    id: 'tongues_wabbits',
    name: 'Tongues Wabbits',
    image: 'images/items/Tongues_Wabbits.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_la_cawotte',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 60,
    stats: [{ stat: 'atk', value: 36 }, { stat: 'spd', value: 9 }, { stat: 'flatDamage', value: 6 }, { stat: 'res.terre', value: 3 }],
    description: ''
}

item.bottes_des_1001_griffes = {
    id: 'bottes_des_1001_griffes',
    name: 'Bottes des 1001 Griffes',
    image: 'images/items/Bottes_des_1001_Griffes.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_des_1001_griffes',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 60,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'spd', value: 15 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.culotte_des_1001_griffes = {
    id: 'culotte_des_1001_griffes',
    name: 'Culotte des 1001 Griffes',
    image: 'images/items/Culotte_des_1001_Griffes.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_des_1001_griffes',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 60,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 64 }],
    description: ''
}

item.torque_des_1001_griffes = {
    id: 'torque_des_1001_griffes',
    name: 'Torque des 1001 Griffes',
    image: 'images/items/Torque_des_1001_Griffes.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_des_1001_griffes',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 60,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 14 }, { stat: 'flatDamage', value: 3 }, { stat: 'res.eau', value: 2 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.ceinture_du_craqueleur = {
    id: 'ceinture_du_craqueleur',
    name: 'Ceinture du Craqueleur',
    image: 'images/items/Ceinture_du_Craqueleur.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_craqueleur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 60,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 16 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.amulette_du_koalak = {
    id: 'amulette_du_koalak',
    name: 'Amulette du Koalak',
    image: 'images/items/Amulette_du_Koalak.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_koalak',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 60,
    stats: [{ stat: 'atk', value: 15 }, { stat: 'spd', value: -30 }, { stat: 'critDamagePct', value: 4 }, { stat: 'res.eau', value: 3 }, { stat: 'res.terre', value: 3 }],
    description: ''
}

item.bottes_du_koalak = {
    id: 'bottes_du_koalak',
    name: 'Bottes du Koalak',
    image: 'images/items/Bottes_du_Koalak.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_koalak',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 60,
    stats: [{ stat: 'spd', value: 15 }, { stat: 'heal', value: 1 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.ceinture_du_koalak = {
    id: 'ceinture_du_koalak',
    name: 'Ceinture du Koalak',
    image: 'images/items/Ceinture_du_Koalak.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_koalak',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 60,
    stats: [{ stat: 'spd', value: 21 }, { stat: 'heal', value: 5 }, { stat: 'dropRate', value: 2 }],
    description: ''
}

item.coiffe_du_koalak = {
    id: 'coiffe_du_koalak',
    name: 'Coiffe du Koalak',
    image: 'images/items/Coiffe_du_Koalak.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_koalak',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 60,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 3 }],
    description: ''
}

item.baton_du_wa_wabbit = {
    id: 'baton_du_wa_wabbit',
    name: 'Bâton du Wa Wabbit',
    image: 'images/items/Bâton_du_Wa_Wabbit.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_wa',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 60,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 7 }, { stat: 'flatDamage', value: 25 }],
    description: ''
}

item.cape_du_wa_wabbit = {
    id: 'cape_du_wa_wabbit',
    name: 'Cape du Wa Wabbit',
    image: 'images/items/Cape_du_Wa_Wabbit.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_wa',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 60,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 36 }],
    description: ''
}

item.couronne_du_wa_wabbit = {
    id: 'couronne_du_wa_wabbit',
    name: 'Couronne du Wa Wabbit',
    image: 'images/items/Couronne_du_Wa_Wabbit.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_wa',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 60,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: -15 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.amulette_dents_de_wabbits = {
    id: 'amulette_dents_de_wabbits',
    name: 'Amulette "Dents de Wabbits"',
    image: 'images/items/Amulette_"Dents_de_Wabbits".png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_wabbit',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 60,
    stats: [{ stat: 'atk', value: 31 }, { stat: 'spd', value: 6 }],
    description: ''
}

item.taille_haie_primitif_du_wobot = {
    id: 'taille_haie_primitif_du_wobot',
    name: 'Taille-haie primitif du Wobot',
    image: 'images/items/Taille-haie_primitif_du_Wobot.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_wabbit',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 60,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 35 }],
    description: ''
}

item.bottoduvet = {
    id: 'bottoduvet',
    name: 'Bottoduvet',
    image: 'images/items/Bottoduvet.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_a_plumes',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 60,
    stats: [{ stat: 'atk', value: 11 }, { stat: 'spd', value: 15 }],
    description: ''
}

item.ceinturoduvet = {
    id: 'ceinturoduvet',
    name: 'Ceinturoduvet',
    image: 'images/items/Ceinturoduvet.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_a_plumes',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 60,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 16 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 4 }],
    description: ''
}

item.botovolko = {
    id: 'botovolko',
    name: 'Botovolko',
    image: 'images/items/Botovolko.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panovolko',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 60,
    stats: [{ stat: 'maxHp', value: 26 }, { stat: 'atk', value: 35 }, { stat: 'spd', value: -15 }],
    description: ''
}

item.bouclovolko = {
    id: 'bouclovolko',
    name: 'Bouclovolko',
    image: 'images/items/Bouclovolko.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panovolko',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 60,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 16 }],
    description: ''
}

item.capovolko = {
    id: 'capovolko',
    name: 'Capovolko',
    image: 'images/items/Capovolko.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panovolko',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 60,
    stats: [{ stat: 'maxHp', value: 26 }, { stat: 'atk', value: 26 }],
    description: ''
}

item.slipapier = {
    id: 'slipapier',
    name: 'Slipapier',
    image: 'images/items/Slipapier.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panopapier',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 61,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 2 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.craquelocape = {
    id: 'craquelocape',
    name: 'Craquelocape',
    image: 'images/items/Craquelocape.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_craqueleur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 61,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 21 }, { stat: 'res.feu', value: 3 }],
    description: ''
}

item.coiffe_du_kitsou = {
    id: 'coiffe_du_kitsou',
    name: 'Coiffe du Kitsou',
    image: 'images/items/Coiffe_du_Kitsou.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_kitsou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 61,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 16 }, { stat: 'res.eau', value: 3 }, { stat: 'res.neutre', value: 3 }],
    description: ''
}

item.arc_du_koalak = {
    id: 'arc_du_koalak',
    name: 'Arc du Koalak',
    image: 'images/items/Arc_du_Koalak.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_koalak',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 61,
    stats: [{ stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 9 }, { stat: 'critChance', value: 3 }, { stat: 'critDamagePct', value: 5 }, { stat: 'lifestealPct', value: 4 }],
    description: ''
}

item.cape_du_koalak = {
    id: 'cape_du_koalak',
    name: 'Cape du Koalak',
    image: 'images/items/Cape_du_Koalak.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_koalak',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 61,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 31 }, { stat: 'res.feu', value: 2 }, { stat: 'res.eau', value: 2 }, { stat: 'res.terre', value: 2 }],
    description: ''
}

item.bottines_du_mulou = {
    id: 'bottines_du_mulou',
    name: 'Bottines du Mulou',
    image: 'images/items/Bottines_du_Mulou.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_mulou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 61,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 16 }, { stat: 'spd', value: 15 }, { stat: 'res.terre', value: 2 }],
    description: ''
}

item.coiffe_du_mulou = {
    id: 'coiffe_du_mulou',
    name: 'Coiffe du Mulou',
    image: 'images/items/Coiffe_du_Mulou.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_mulou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 61,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 2 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.anokio = {
    id: 'anokio',
    name: 'Anokio',
    image: 'images/items/Anokio.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplinokio',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 61,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 22 }],
    description: ''
}

item.amupapier = {
    id: 'amupapier',
    name: 'Amupapier',
    image: 'images/items/Amupapier.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panopapier',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 62,
    stats: [{ stat: 'atk', value: 21 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }],
    description: ''
}

item.amulette_aerdala = {
    id: 'amulette_aerdala',
    name: 'Amulette Aerdala',
    image: 'images/items/Amulette_Aerdala.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_aerdala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 62,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 56 }, { stat: 'flatDamage', value: 2 }],
    description: ''
}

item.dagues_aerdala = {
    id: 'dagues_aerdala',
    name: 'Dagues Aerdala',
    image: 'images/items/Dagues_Aerdala.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_aerdala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 62,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 21 }, { stat: 'spd', value: 16 }, { stat: 'flatDamage', value: 11 }, { stat: 'critChance', value: 2 }, { stat: 'res.feu', value: 2 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.ceinture_anesthesiante = {
    id: 'ceinture_anesthesiante',
    name: 'Ceinture Anesthésiante',
    image: 'images/items/Ceinture_Anesthésiante.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_palliative',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 62,
    stats: [{ stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 4 }, { stat: 'heal', value: 4 }],
    description: ''
}

item.oreilles_de_marzwel = {
    id: 'oreilles_de_marzwel',
    name: 'Oreilles de Marzwel',
    image: 'images/items/Oreilles_de_Marzwel.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_marzwel',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 62,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 21 }, { stat: 'critChance', value: 4 }],
    description: ''
}

item.casque_du_craqueleur = {
    id: 'casque_du_craqueleur',
    name: 'Casque du Craqueleur',
    image: 'images/items/Casque_du_Craqueleur.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_craqueleur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 62,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 6 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 3 }],
    description: ''
}

item.cape_du_kitsou = {
    id: 'cape_du_kitsou',
    name: 'Cape du Kitsou',
    image: 'images/items/Cape_du_Kitsou.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_kitsou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 62,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'heal', value: 5 }, { stat: 'res.feu', value: 4 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.cape_terrdala = {
    id: 'cape_terrdala',
    name: 'Cape Terrdala',
    image: 'images/items/Cape_Terrdala.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_terrdala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 63,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 4 }, { stat: 'res.eau', value: 2 }, { stat: 'res.terre', value: 2 }],
    description: ''
}

item.bouclier_du_craqueleur = {
    id: 'bouclier_du_craqueleur',
    name: 'Bouclier du Craqueleur',
    image: 'images/items/Bouclier_du_Craqueleur.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_du_craqueleur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 63,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 16 }, { stat: 'res.feu', value: 3 }, { stat: 'res.eau', value: 3 }, { stat: 'res.terre', value: 3 }, { stat: 'res.air', value: 3 }, { stat: 'res.neutre', value: 3 }],
    description: ''
}

item.chapeau_aerdala = {
    id: 'chapeau_aerdala',
    name: 'Chapeau Aerdala',
    image: 'images/items/Chapeau_Aerdala.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_aerdala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 64,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 2 }, { stat: 'res.feu', value: 2 }, { stat: 'res.neutre', value: 2 }],
    description: ''
}

item.bracelet_de_marzwel = {
    id: 'bracelet_de_marzwel',
    name: 'Bracelet de Marzwel',
    image: 'images/items/Bracelet_de_Marzwel.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_marzwel',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 64,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'critResPct', value: 7 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.lame_du_craqueleur = {
    id: 'lame_du_craqueleur',
    name: 'Lame du Craqueleur',
    image: 'images/items/Lame_du_Craqueleur.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_craqueleur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 64,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 28 }, { stat: 'spd', value: -15 }, { stat: 'flatDamage', value: 30 }, { stat: 'critChance', value: 2 }, { stat: 'res.neutre', value: 3 }],
    description: ''
}

item.cape_du_mulou = {
    id: 'cape_du_mulou',
    name: 'Cape du Mulou',
    image: 'images/items/Cape_du_Mulou.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_mulou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 64,
    stats: [{ stat: 'maxHp', value: 61 }, { stat: 'atk', value: 36 }, { stat: 'heal', value: 7 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.bouclier_aerdala = {
    id: 'bouclier_aerdala',
    name: 'Bouclier Aerdala',
    image: 'images/items/Bouclier_Aerdala.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_aerdala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 65,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 31 }, { stat: 'critChance', value: 2 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.cape_aerdala = {
    id: 'cape_aerdala',
    name: 'Cape Aerdala',
    image: 'images/items/Cape_Aerdala.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_aerdala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 65,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 4 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 2 }, { stat: 'res.eau', value: 2 }],
    description: ''
}

item.ceinture_ouginakale = {
    id: 'ceinture_ouginakale',
    name: 'Ceinture Ouginakale',
    image: 'images/items/Ceinture_Ouginakale.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_ouginakale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 65,
    stats: [{ stat: 'atk', value: 32 }, { stat: 'res.feu', value: 4 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.javeline_de_marzwel = {
    id: 'javeline_de_marzwel',
    name: 'Javeline de Marzwel',
    image: 'images/items/Javeline_de_Marzwel.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_marzwel',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 66,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 36 }, { stat: 'flatDamage', value: 42 }],
    description: ''
}

item.anneau_poli = {
    id: 'anneau_poli',
    name: 'Anneau Poli',
    image: 'images/items/Anneau_Poli.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_des_herboricoles',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 66,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 37 }, { stat: 'spd', value: 16 }, { stat: 'flatDamage', value: 4 }, { stat: 'res.feu', value: -5 }, { stat: 'res.eau', value: -5 }, { stat: 'res.terre', value: -5 }, { stat: 'res.air', value: -5 }, { stat: 'res.neutre', value: -5 }],
    description: ''
}

item.ceinture_du_chef_crocodaille = {
    id: 'ceinture_du_chef_crocodaille',
    name: 'Ceinture du Chef Crocodaille',
    image: 'images/items/Ceinture_du_Chef_Crocodaille.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_chef_crocodaille',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 66,
    stats: [{ stat: 'atk', value: 32 }, { stat: 'res.feu', value: 4 }, { stat: 'res.eau', value: 4 }],
    description: ''
}

item.cape_du_desir_o_boul = {
    id: 'cape_du_desir_o_boul',
    name: 'Cape du Désir O\'Boul',
    image: 'images/items/Cape_du_Désir_O_Boul.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_o_boul',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 67,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'spd', value: 16 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 4 }],
    description: ''
}

item.geta_feudala = {
    id: 'geta_feudala',
    name: 'Geta Feudala',
    image: 'images/items/Geta_Feudala.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_feudala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 68,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 21 }, { stat: 'spd', value: 15 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.kryst_o_boul = {
    id: 'kryst_o_boul',
    name: 'Kryst O\'Boul',
    image: 'images/items/Kryst_O_Boul.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_o_boul',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 68,
    stats: [{ stat: 'maxHp', value: -11 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 10 }, { stat: 'critChance', value: 3 }],
    description: ''
}

item.casque_du_scorbute = {
    id: 'casque_du_scorbute',
    name: 'Casque du Scorbute',
    image: 'images/items/Casque_du_Scorbute.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_scorbute',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 68,
    stats: [{ stat: 'maxHp', value: 61 }, { stat: 'atk', value: 36 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.pantoufles_crochues_du_chef_crocodaille = {
    id: 'pantoufles_crochues_du_chef_crocodaille',
    name: 'Pantoufles Crochues du Chef Crocodaille',
    image: 'images/items/Pantoufles_Crochues_du_Chef_Crocodaille.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_chef_crocodaille',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 69,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'spd', value: 15 }, { stat: 'res.eau', value: 2 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.sac_du_koulosse = {
    id: 'sac_du_koulosse',
    name: 'Sac du Koulosse',
    image: 'images/items/Sac_du_Koulosse.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_koulosse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 69,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: -100 }, { stat: 'flatDamage', value: 7 }, { stat: 'critChance', value: 4 }, { stat: 'res.eau', value: 4 }, { stat: 'res.terre', value: 4 }],
    description: ''
}

item.ceinture_aerdala = {
    id: 'ceinture_aerdala',
    name: 'Ceinture Aerdala',
    image: 'images/items/Ceinture_Aerdala.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_aerdala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 70,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 31 }, { stat: 'res.feu', value: 4 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.amulette_du_chef_crocodaille = {
    id: 'amulette_du_chef_crocodaille',
    name: 'Amulette du Chef Crocodaille',
    image: 'images/items/Amulette_du_Chef_Crocodaille.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_chef_crocodaille',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 70,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 35 }, { stat: 'res.eau', value: 2 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.bouclier_du_chef_crocodaille = {
    id: 'bouclier_du_chef_crocodaille',
    name: 'Bouclier du Chef Crocodaille',
    image: 'images/items/Bouclier_du_Chef_Crocodaille.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_du_chef_crocodaille',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 70,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 16 }, { stat: 'res.feu', value: 4 }, { stat: 'res.eau', value: 4 }, { stat: 'res.neutre', value: 2 }],
    description: ''
}

item.bracelet_du_chef_crocodaille = {
    id: 'bracelet_du_chef_crocodaille',
    name: 'Bracelet du Chef Crocodaille',
    image: 'images/items/Bracelet_du_Chef_Crocodaille.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_chef_crocodaille',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 70,
    stats: [{ stat: 'atk', value: 21 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 2 }, { stat: 'res.terre', value: 2 }],
    description: ''
}

item.coiffe_du_chef_crocodaille = {
    id: 'coiffe_du_chef_crocodaille',
    name: 'Coiffe du Chef Crocodaille',
    image: 'images/items/Coiffe_du_Chef_Crocodaille.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_chef_crocodaille',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 70,
    stats: [{ stat: 'maxHp', value: 16 }, { stat: 'atk', value: 36 }, { stat: 'res.feu', value: 2 }],
    description: ''
}

item.lame_du_chef_crocodaille = {
    id: 'lame_du_chef_crocodaille',
    name: 'Lame du Chef Crocodaille',
    image: 'images/items/Lame_du_Chef_Crocodaille.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_chef_crocodaille',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 70,
    stats: [{ stat: 'maxHp', value: 46 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 23 }, { stat: 'lifestealPct', value: 1 }],
    description: ''
}

item.petit_sac_d_ecolier_du_chef_crocodaille = {
    id: 'petit_sac_d_ecolier_du_chef_crocodaille',
    name: 'Petit sac d\'écolier du Chef Crocodaille',
    image: 'images/items/Petit_sac_d_écolier_du_Chef_Crocodaille.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_chef_crocodaille',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 70,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 21 }, { stat: 'critChance', value: 2 }, { stat: 'res.feu', value: 2 }, { stat: 'res.eau', value: 2 }],
    description: ''
}

item.cape_du_scorbute = {
    id: 'cape_du_scorbute',
    name: 'Cape du Scorbute',
    image: 'images/items/Cape_du_Scorbute.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_scorbute',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 70,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 8 }, { stat: 'heal', value: 7 }],
    description: ''
}

item.cape_de_nelween = {
    id: 'cape_de_nelween',
    name: 'Cape de Nelween',
    image: 'images/items/Cape_de_Nelween.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_nelween',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 71,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'flatDamage', value: 4 }, { stat: 'critDamagePct', value: 7 }, { stat: 'critResPct', value: 7 }],
    description: ''
}

item.crystal_o_boul = {
    id: 'crystal_o_boul',
    name: 'Crystal O\'Boul',
    image: 'images/items/Crystal_O_Boul.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_o_boul',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 72,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 47 }, { stat: 'flatDamage', value: 3 }, { stat: 'critChance', value: 2 }, { stat: 'heal', value: 4 }],
    description: ''
}

item.craquanneau_legendaire = {
    id: 'craquanneau_legendaire',
    name: 'Craquanneau Légendaire',
    image: 'images/items/Craquanneau_Légendaire.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_craqueleur_legendaire',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 72,
    stats: [{ stat: 'atk', value: 31 }, { stat: 'res.eau', value: 2 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.amulette_du_scorbute = {
    id: 'amulette_du_scorbute',
    name: 'Amulette du Scorbute',
    image: 'images/items/Amulette_du_Scorbute.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_scorbute',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 72,
    stats: [{ stat: 'atk', value: 61 }, { stat: 'spd', value: -30 }, { stat: 'flatDamage', value: 4 }],
    description: ''
}

item.casque_de_qil_bil = {
    id: 'casque_de_qil_bil',
    name: 'Casque de Qil Bil',
    image: 'images/items/Casque_de_Qil_Bil.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_qil_bil',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 73,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 53 }, { stat: 'critChance', value: 4 }],
    description: ''
}

item.bracelet_magique_de_shika = {
    id: 'bracelet_magique_de_shika',
    name: 'Bracelet Magique de Shika',
    image: 'images/items/Bracelet_Magique_de_Shika.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_shika_ingalsse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 73,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 22 }, { stat: 'res.terre', value: 2 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.bottes_du_koulosse = {
    id: 'bottes_du_koulosse',
    name: 'Bottes du Koulosse',
    image: 'images/items/Bottes_du_Koulosse.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_koulosse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 73,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: -100 }, { stat: 'spd', value: 15 }, { stat: 'heal', value: 16 }, { stat: 'res.terre', value: 4 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.baton_du_koulosse = {
    id: 'baton_du_koulosse',
    name: 'Bâton du Koulosse',
    image: 'images/items/Bâton_du_Koulosse.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_koulosse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 73,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: -135 }, { stat: 'flatDamage', value: 7 }, { stat: 'heal', value: 16 }, { stat: 'lifestealPct', value: 4 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.amulette_de_nelween = {
    id: 'amulette_de_nelween',
    name: 'Amulette de Nelween',
    image: 'images/items/Amulette_de_Nelween.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_nelween',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 74,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'flatDamage', value: 5 }, { stat: 'critDamagePct', value: 7 }, { stat: 'critResPct', value: 7 }],
    description: ''
}

item.bottes_de_nelween = {
    id: 'bottes_de_nelween',
    name: 'Bottes de Nelween',
    image: 'images/items/Bottes_de_Nelween.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_nelween',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 74,
    stats: [{ stat: 'maxHp', value: 61 }, { stat: 'atk', value: 14 }, { stat: 'flatDamage', value: 7 }],
    description: ''
}

item.cape_fulgurante_ankarton = {
    id: 'cape_fulgurante_ankarton',
    name: 'Cape Fulgurante Ankarton',
    image: 'images/items/Cape_Fulgurante_Ankarton.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_ankarton',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 75,
    stats: [],
    description: ''
}

item.bouclier_terrdala = {
    id: 'bouclier_terrdala',
    name: 'Bouclier Terrdala',
    image: 'images/items/Bouclier_Terrdala.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_terrdala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 75,
    stats: [{ stat: 'maxHp', value: 61 }, { stat: 'atk', value: 31 }, { stat: 'critChance', value: 3 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.chapeau_terrdala = {
    id: 'chapeau_terrdala',
    name: 'Chapeau Terrdala',
    image: 'images/items/Chapeau_Terrdala.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_terrdala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 75,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 46 }, { stat: 'res.feu', value: 2 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.epis_de_farle = {
    id: 'epis_de_farle',
    name: 'Epis de Farle',
    image: 'images/items/Epis_de_Farle.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_farle_ingalsse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 75,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 56 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.anneau_de_qil_bil = {
    id: 'anneau_de_qil_bil',
    name: 'Anneau de Qil Bil',
    image: 'images/items/Anneau_de_Qil_Bil.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_qil_bil',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 75,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 30 }, { stat: 'critChance', value: 3 }],
    description: ''
}

item.sabre_feudala = {
    id: 'sabre_feudala',
    name: 'Sabre Feudala',
    image: 'images/items/Sabre_Feudala.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_feudala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 76,
    stats: [{ stat: 'maxHp', value: 56 }, { stat: 'atk', value: 6 }, { stat: 'flatDamage', value: 11 }, { stat: 'critChance', value: 3 }, { stat: 'lifestealPct', value: 2 }, { stat: 'res.feu', value: 4 }, { stat: 'res.terre', value: 4 }],
    description: ''
}

item.geta_terrdala = {
    id: 'geta_terrdala',
    name: 'Geta Terrdala',
    image: 'images/items/Geta_Terrdala.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_terrdala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 76,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 21 }, { stat: 'spd', value: 15 }, { stat: 'res.feu', value: 2 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.cape_de_farle = {
    id: 'cape_de_farle',
    name: 'Cape de Farle',
    image: 'images/items/Cape_de_Farle.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_farle_ingalsse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 76,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 26 }, { stat: 'res.eau', value: 2 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.fourche_de_farle = {
    id: 'fourche_de_farle',
    name: 'Fourche de Farle',
    image: 'images/items/Fourche_de_Farle.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_farle_ingalsse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 76,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 72 }, { stat: 'spd', value: 16 }, { stat: 'flatDamage', value: 17 }, { stat: 'critChance', value: 2 }, { stat: 'lifestealPct', value: 2 }],
    description: ''
}

item.epis_de_shika = {
    id: 'epis_de_shika',
    name: 'Epis de Shika',
    image: 'images/items/Epis_de_Shika.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_shika_ingalsse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 76,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 56 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.la_doubitch_o_boul = {
    id: 'la_doubitch_o_boul',
    name: 'La Doubitch O\'Boul',
    image: 'images/items/La_Doubitch_O_Boul.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_o_boul',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 77,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 66 }, { stat: 'dropRate', value: 2 }],
    description: ''
}

item.alliance_terrdala = {
    id: 'alliance_terrdala',
    name: 'Alliance Terrdala',
    image: 'images/items/Alliance_Terrdala.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_terrdala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 77,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'flatDamage', value: 3 }, { stat: 'res.eau', value: 2 }, { stat: 'res.terre', value: 2 }],
    description: ''
}

item.tonfas_de_qil_bil = {
    id: 'tonfas_de_qil_bil',
    name: 'Tonfas de Qil Bil',
    image: 'images/items/Tonfas_de_Qil_Bil.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_qil_bil',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 77,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 43 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 5 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.kidorteau = {
    id: 'kidorteau',
    name: 'Kidorteau',
    image: 'images/items/Kidorteau.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_des_herboricoles',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 77,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 11 }, { stat: 'flatDamage', value: 23 }],
    description: ''
}

item.cape_ouroboulos = {
    id: 'cape_ouroboulos',
    name: 'Cape Ouroboulos',
    image: 'images/items/Cape_Ouroboulos.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_ouroboulos',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 78,
    stats: [{ stat: 'maxHp', value: 61 }, { stat: 'atk', value: 26 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.amulette_terrdala = {
    id: 'amulette_terrdala',
    name: 'Amulette Terrdala',
    image: 'images/items/Amulette_Terrdala.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_terrdala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 78,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 35 }, { stat: 'res.eau', value: 2 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.farlacoiffe = {
    id: 'farlacoiffe',
    name: 'Farlacoiffe',
    image: 'images/items/Farlacoiffe.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_farle_ingalsse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 78,
    stats: [{ stat: 'maxHp', value: 61 }, { stat: 'atk', value: 15 }, { stat: 'flatDamage', value: 2 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 4 }],
    description: ''
}

item.ceinture_de_nelween = {
    id: 'ceinture_de_nelween',
    name: 'Ceinture de Nelween',
    image: 'images/items/Ceinture_de_Nelween.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_nelween',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 78,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 14 }, { stat: 'flatDamage', value: 7 }],
    description: ''
}

item.bracelet_magique_de_farle = {
    id: 'bracelet_magique_de_farle',
    name: 'Bracelet Magique de Farle',
    image: 'images/items/Bracelet_Magique_de_Farle.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_farle_ingalsse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 79,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 22 }, { stat: 'res.feu', value: 2 }, { stat: 'res.eau', value: 2 }],
    description: ''
}

item.ceinture_du_craqueleur_legendaire = {
    id: 'ceinture_du_craqueleur_legendaire',
    name: 'Ceinture du Craqueleur Légendaire',
    image: 'images/items/Ceinture_du_Craqueleur_Légendaire.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_craqueleur_legendaire',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 79,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 21 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 4 }],
    description: ''
}

item.cape_du_desert = {
    id: 'cape_du_desert',
    name: 'Cape du Désert',
    image: 'images/items/Cape_du_Désert.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_desert',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 79,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 56 }, { stat: 'res.terre', value: 2 }],
    description: ''
}

item.cape_sulhit = {
    id: 'cape_sulhit',
    name: 'Cape Sulhit',
    image: 'images/items/Cape_Sulhit.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_altruiste',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [],
    description: ''
}

item.amublop_coco_royale = {
    id: 'amublop_coco_royale',
    name: 'Amublop Coco Royale',
    image: 'images/items/Amublop_Coco_Royale.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_blop_coco_royale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 56 }, { stat: 'flatDamage', value: 4 }, { stat: 'heal', value: 4 }],
    description: ''
}

item.blopanneau_coco_royal = {
    id: 'blopanneau_coco_royal',
    name: 'Blopanneau Coco Royal',
    image: 'images/items/Blopanneau_Coco_Royal.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_blop_coco_royale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 16 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 4 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.bloptes_coco_royales = {
    id: 'bloptes_coco_royales',
    name: 'Bloptes Coco Royales',
    image: 'images/items/Bloptes_Coco_Royales.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_blop_coco_royale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 36 }, { stat: 'spd', value: 15 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.blopture_coco_royale = {
    id: 'blopture_coco_royale',
    name: 'Blopture Coco Royale',
    image: 'images/items/Blopture_Coco_Royale.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_blop_coco_royale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [{ stat: 'maxHp', value: 26 }, { stat: 'atk', value: 16 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 1 }, { stat: 'res.air', value: 3 }],
    description: ''
}

item.amublop_griotte_royale = {
    id: 'amublop_griotte_royale',
    name: 'Amublop Griotte Royale',
    image: 'images/items/Amublop_Griotte_Royale.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_blop_griotte_royale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 56 }, { stat: 'flatDamage', value: 4 }, { stat: 'heal', value: 4 }],
    description: ''
}

item.blopanneau_griotte_royal = {
    id: 'blopanneau_griotte_royal',
    name: 'Blopanneau Griotte Royal',
    image: 'images/items/Blopanneau_Griotte_Royal.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_blop_griotte_royale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 16 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 4 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.bloptes_griotte_royales = {
    id: 'bloptes_griotte_royales',
    name: 'Bloptes Griotte Royales',
    image: 'images/items/Bloptes_Griotte_Royales.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_blop_griotte_royale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 36 }, { stat: 'spd', value: 15 }, { stat: 'res.feu', value: 2 }],
    description: ''
}

item.blopture_griotte_royale = {
    id: 'blopture_griotte_royale',
    name: 'Blopture Griotte Royale',
    image: 'images/items/Blopture_Griotte_Royale.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_blop_griotte_royale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [{ stat: 'maxHp', value: 26 }, { stat: 'atk', value: 16 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 3 }],
    description: ''
}

item.amublop_indigo_royale = {
    id: 'amublop_indigo_royale',
    name: 'Amublop Indigo Royale',
    image: 'images/items/Amublop_Indigo_Royale.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_blop_indigo_royale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 56 }, { stat: 'flatDamage', value: 4 }, { stat: 'heal', value: 4 }],
    description: ''
}

item.blopanneau_indigo_royal = {
    id: 'blopanneau_indigo_royal',
    name: 'Blopanneau Indigo Royal',
    image: 'images/items/Blopanneau_Indigo_Royal.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_blop_indigo_royale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 16 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 4 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.bloptes_indigo_royales = {
    id: 'bloptes_indigo_royales',
    name: 'Bloptes Indigo Royales',
    image: 'images/items/Bloptes_Indigo_Royales.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_blop_indigo_royale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 36 }, { stat: 'spd', value: 15 }, { stat: 'res.eau', value: 2 }],
    description: ''
}

item.blopture_indigo_royale = {
    id: 'blopture_indigo_royale',
    name: 'Blopture Indigo Royale',
    image: 'images/items/Blopture_Indigo_Royale.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_blop_indigo_royale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [{ stat: 'maxHp', value: 26 }, { stat: 'atk', value: 16 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 3 }],
    description: ''
}

item.amublop_reinette_royale = {
    id: 'amublop_reinette_royale',
    name: 'Amublop Reinette Royale',
    image: 'images/items/Amublop_Reinette_Royale.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_blop_reinette_royale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 56 }, { stat: 'flatDamage', value: 4 }, { stat: 'heal', value: 4 }],
    description: ''
}

item.blopanneau_reinette_royal = {
    id: 'blopanneau_reinette_royal',
    name: 'Blopanneau Reinette Royal',
    image: 'images/items/Blopanneau_Reinette_Royal.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_blop_reinette_royale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 16 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 4 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.bloptes_reinette_royales = {
    id: 'bloptes_reinette_royales',
    name: 'Bloptes Reinette Royales',
    image: 'images/items/Bloptes_Reinette_Royales.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_blop_reinette_royale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 36 }, { stat: 'spd', value: 15 }, { stat: 'res.terre', value: 2 }],
    description: ''
}

item.blopture_reinette_royale = {
    id: 'blopture_reinette_royale',
    name: 'Blopture Reinette Royale',
    image: 'images/items/Blopture_Reinette_Royale.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_blop_reinette_royale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [{ stat: 'maxHp', value: 26 }, { stat: 'atk', value: 16 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 1 }, { stat: 'res.terre', value: 3 }],
    description: ''
}

item.cape_routh = {
    id: 'cape_routh',
    name: 'Cape Routh',
    image: 'images/items/Cape_Routh.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_criminelle',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [],
    description: ''
}

item.cape_hoile = {
    id: 'cape_hoile',
    name: 'Cape Hoile',
    image: 'images/items/Cape_Hoile.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_enragee',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [],
    description: ''
}

item.cape_wera = {
    id: 'cape_wera',
    name: 'Cape Wéra',
    image: 'images/items/Cape_Wéra.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_ethylique',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [],
    description: ''
}

item.cape_endaison = {
    id: 'cape_endaison',
    name: 'Cape Endaison',
    image: 'images/items/Cape_Endaison.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_explosive',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [],
    description: ''
}

item.cape_ytale = {
    id: 'cape_ytale',
    name: 'Cape Ytale',
    image: 'images/items/Cape_Ytale.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_exsangue',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [],
    description: ''
}

item.cape_hadosse = {
    id: 'cape_hadosse',
    name: 'Cape Hadosse',
    image: 'images/items/Cape_Hadosse.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_indestructible',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [],
    description: ''
}

item.cape_huchon = {
    id: 'cape_huchon',
    name: 'Cape Huchon',
    image: 'images/items/Cape_Huchon.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_intemporelle',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [],
    description: ''
}

item.cape_aircussion = {
    id: 'cape_aircussion',
    name: 'Cape Aircussion',
    image: 'images/items/Cape_Aircussion.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_lunatique',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [],
    description: ''
}

item.anneau_ouroboulos = {
    id: 'anneau_ouroboulos',
    name: 'Anneau Ouroboulos',
    image: 'images/items/Anneau_Ouroboulos.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_ouroboulos',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 36 }, { stat: 'spd', value: -40 }, { stat: 'flatDamage', value: 2 }, { stat: 'res.feu', value: 2 }],
    description: ''
}

item.cape_rimordiale = {
    id: 'cape_rimordiale',
    name: 'Cape Rimordiale',
    image: 'images/items/Cape_Rimordiale.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_quadramentale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [],
    description: ''
}

item.cape_hitton = {
    id: 'cape_hitton',
    name: 'Cape Hitton',
    image: 'images/items/Cape_Hitton.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_sauvage',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [],
    description: ''
}

item.sac_rebleux = {
    id: 'sac_rebleux',
    name: 'Sac Rebleux',
    image: 'images/items/Sac_Rebleux.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_submersible',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [],
    description: ''
}

item.ceinture_terrdala = {
    id: 'ceinture_terrdala',
    name: 'Ceinture Terrdala',
    image: 'images/items/Ceinture_Terrdala.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_terrdala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 3 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.cape_ortail = {
    id: 'cape_ortail',
    name: 'Cape Ortail',
    image: 'images/items/Cape_Ortail.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_transcendante',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [],
    description: ''
}

item.cape_aurale = {
    id: 'cape_aurale',
    name: 'Cape Aurale',
    image: 'images/items/Cape_Aurale.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_temeraire',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [],
    description: ''
}

item.cape_haharnum = {
    id: 'cape_haharnum',
    name: 'Cape Haharnum',
    image: 'images/items/Cape_Haharnum.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_venerable',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [],
    description: ''
}

item.cape_d_elya_wood = {
    id: 'cape_d_elya_wood',
    name: 'Cape d\'Elya Wood',
    image: 'images/items/Cape_d_Elya_Wood.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_d_elya_wood',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [{ stat: 'atk', value: 51 }, { stat: 'flatDamage', value: 2 }, { stat: 'res.feu', value: 2 }, { stat: 'res.eau', value: 2 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.farlature = {
    id: 'farlature',
    name: 'Farlature',
    image: 'images/items/Farlature.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_farle_ingalsse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [{ stat: 'atk', value: 28 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 4 }, { stat: 'res.eau', value: 4 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.sabots_de_farle = {
    id: 'sabots_de_farle',
    name: 'Sabots de Farle',
    image: 'images/items/Sabots_de_Farle.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_farle_ingalsse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 21 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 2 }, { stat: 'res.eau', value: 2 }],
    description: ''
}

item.cape_aille = {
    id: 'cape_aille',
    name: 'Cape Aillé',
    image: 'images/items/Cape_Aillé.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_gouttiere',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [],
    description: ''
}

item.binette_de_shika = {
    id: 'binette_de_shika',
    name: 'Binette de Shika',
    image: 'images/items/Binette_de_Shika.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_shika_ingalsse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 40 }, { stat: 'spd', value: 16 }, { stat: 'flatDamage', value: 17 }, { stat: 'critChance', value: 4 }, { stat: 'lifestealPct', value: 2 }],
    description: ''
}

item.cape_de_shika = {
    id: 'cape_de_shika',
    name: 'Cape de Shika',
    image: 'images/items/Cape_de_Shika.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_shika_ingalsse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 21 }, { stat: 'res.feu', value: 4 }, { stat: 'res.terre', value: 4 }],
    description: ''
}

item.sabots_de_shika = {
    id: 'sabots_de_shika',
    name: 'Sabots de Shika',
    image: 'images/items/Sabots_de_Shika.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_shika_ingalsse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 21 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 2 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.shikacoiffe = {
    id: 'shikacoiffe',
    name: 'Shikacoiffe',
    image: 'images/items/Shikacoiffe.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_shika_ingalsse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [{ stat: 'maxHp', value: 61 }, { stat: 'atk', value: 15 }, { stat: 'flatDamage', value: 2 }, { stat: 'dropRate', value: 1 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.shikature = {
    id: 'shikature',
    name: 'Shikature',
    image: 'images/items/Shikature.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_shika_ingalsse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [{ stat: 'atk', value: 28 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 4 }, { stat: 'res.terre', value: 4 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.cape_antheon = {
    id: 'cape_antheon',
    name: 'Cape Anthéon',
    image: 'images/items/Cape_Anthéon.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_l_heritage',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [],
    description: ''
}

item.cape_lyne = {
    id: 'cape_lyne',
    name: 'Cape Lyne',
    image: 'images/items/Cape_Lyne.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_l_innombrable',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [],
    description: ''
}

item.casque_du_craqueleur_legendaire = {
    id: 'casque_du_craqueleur_legendaire',
    name: 'Casque du Craqueleur Légendaire',
    image: 'images/items/Casque_du_Craqueleur_Légendaire.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_craqueleur_legendaire',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 57 }, { stat: 'spd', value: 16 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.string_leolhyene = {
    id: 'string_leolhyene',
    name: 'String Léolhyène',
    image: 'images/items/String_Léolhyène.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_desert',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 2 }, { stat: 'dropRate', value: 1 }, { stat: 'res.neutre', value: 3 }],
    description: ''
}

item.cape_hulco = {
    id: 'cape_hulco',
    name: 'Cape Hulco',
    image: 'images/items/Cape_Hulco.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_prince_des_voleurs',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [],
    description: ''
}

item.couronne_du_wa_wobot = {
    id: 'couronne_du_wa_wobot',
    name: 'Couronne du Wa Wobot',
    image: 'images/items/Couronne_du_Wa_Wobot.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_wa_wobot',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 6 }],
    description: ''
}

item.puissante_ceinture_fulgurante = {
    id: 'puissante_ceinture_fulgurante',
    name: 'Puissante Ceinture Fulgurante',
    image: 'images/items/Puissante_Ceinture_Fulgurante.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'puissante_panoplie_fulgurante',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 80,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 35 }, { stat: 'flatDamage', value: 4 }],
    description: ''
}

item.alliance_feudala = {
    id: 'alliance_feudala',
    name: 'Alliance Feudala',
    image: 'images/items/Alliance_Feudala.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_feudala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 81,
    stats: [{ stat: 'maxHp', value: 26 }, { stat: 'atk', value: 26 }, { stat: 'critChance', value: 2 }, { stat: 'heal', value: 4 }, { stat: 'res.eau', value: 2 }],
    description: ''
}

item.ceinture_feudala = {
    id: 'ceinture_feudala',
    name: 'Ceinture Feudala',
    image: 'images/items/Ceinture_Feudala.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_feudala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 81,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 4 }, { stat: 'heal', value: 16 }],
    description: ''
}

item.capuche_de_tyranne = {
    id: 'capuche_de_tyranne',
    name: 'Capuche de Tyranne',
    image: 'images/items/Capuche_de_Tyranne.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_la_terrible',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 81,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 63 }, { stat: 'res.feu', value: 3 }],
    description: ''
}

item.marteau_du_craqueleur_legendaire = {
    id: 'marteau_du_craqueleur_legendaire',
    name: 'Marteau du Craqueleur Légendaire',
    image: 'images/items/Marteau_du_Craqueleur_Légendaire.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_craqueleur_legendaire',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 81,
    stats: [{ stat: 'maxHp', value: 61 }, { stat: 'atk', value: 47 }, { stat: 'flatDamage', value: 27 }],
    description: ''
}

item.cape_du_wa_wobot = {
    id: 'cape_du_wa_wobot',
    name: 'Cape du Wa Wobot',
    image: 'images/items/Cape_du_Wa_Wobot.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_wa_wobot',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 81,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 36 }, { stat: 'flatDamage', value: 4 }],
    description: ''
}

item.pagne_de_daigoro = {
    id: 'pagne_de_daigoro',
    name: 'Pagne de Daïgoro',
    image: 'images/items/Pagne_de_Daïgoro.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_daigoro',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 82,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 3 }, { stat: 'res.terre', value: 3 }],
    description: ''
}

item.bague_des_scalptaras = {
    id: 'bague_des_scalptaras',
    name: 'Bague des Scalptaras',
    image: 'images/items/Bague_des_Scalptaras.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_des_scalptaras',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 82,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 16 }, { stat: 'res.terre', value: 3 }],
    description: ''
}

item.casque_du_blanc_pa_wabbit = {
    id: 'casque_du_blanc_pa_wabbit',
    name: 'Casque du Blanc Pa Wabbit',
    image: 'images/items/Casque_du_Blanc_Pa_Wabbit.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_blanc_pa_wabbit',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 82,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 26 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 1 }, { stat: 'heal', value: 6 }],
    description: ''
}

item.coiffennex = {
    id: 'coiffennex',
    name: 'Coiffennex',
    image: 'images/items/Coiffennex.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_desert',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 82,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 3 }, { stat: 'critChance', value: 2 }, { stat: 'res.feu', value: 2 }],
    description: ''
}

item.coiffe_du_koulosse = {
    id: 'coiffe_du_koulosse',
    name: 'Coiffe du Koulosse',
    image: 'images/items/Coiffe_du_Koulosse.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_koulosse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 82,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: -85 }, { stat: 'flatDamage', value: 2 }, { stat: 'heal', value: 16 }, { stat: 'res.feu', value: 4 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.bottes_ouroboulos = {
    id: 'bottes_ouroboulos',
    name: 'Bottes Ouroboulos',
    image: 'images/items/Bottes_Ouroboulos.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_ouroboulos',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 83,
    stats: [{ stat: 'maxHp', value: 61 }, { stat: 'atk', value: 21 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 6 }],
    description: ''
}

item.hache_terrdala = {
    id: 'hache_terrdala',
    name: 'Hache Terrdala',
    image: 'images/items/Hache_Terrdala.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_terrdala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 83,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 57 }, { stat: 'flatDamage', value: 11 }, { stat: 'critChance', value: 3 }, { stat: 'lifestealPct', value: 3 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.coiffe_de_daigoro = {
    id: 'coiffe_de_daigoro',
    name: 'Coiffe de Daïgoro',
    image: 'images/items/Coiffe_de_Daïgoro.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_daigoro',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 83,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 2 }, { stat: 'res.feu', value: 2 }, { stat: 'res.eau', value: 2 }],
    description: ''
}

item.capuche_de_musha = {
    id: 'capuche_de_musha',
    name: 'Capuche de Musha',
    image: 'images/items/Capuche_de_Musha.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_musha',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 83,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'flatDamage', value: 7 }, { stat: 'critChance', value: -10 }, { stat: 'dropRate', value: 1 }, { stat: 'res.terre', value: 3 }, { stat: 'res.neutre', value: 3 }],
    description: ''
}

item.ceinture_de_tyranne = {
    id: 'ceinture_de_tyranne',
    name: 'Ceinture de Tyranne',
    image: 'images/items/Ceinture_de_Tyranne.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_la_terrible',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 83,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 29 }, { stat: 'flatDamage', value: 14 }, { stat: 'dropRate', value: 1 }, { stat: 'res.neutre', value: 3 }],
    description: ''
}

item.amufafah = {
    id: 'amufafah',
    name: 'Amufafah',
    image: 'images/items/Amufafah.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_des_herboricoles',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 83,
    stats: [{ stat: 'atk', value: 21 }, { stat: 'spd', value: 15 }, { stat: 'critDamagePct', value: 4 }, { stat: 'res.feu', value: 2 }, { stat: 'res.eau', value: 2 }],
    description: ''
}

item.ceinture_du_blanc_pa_wabbit = {
    id: 'ceinture_du_blanc_pa_wabbit',
    name: 'Ceinture du Blanc Pa Wabbit',
    image: 'images/items/Ceinture_du_Blanc_Pa_Wabbit.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_blanc_pa_wabbit',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 83,
    stats: [{ stat: 'maxHp', value: 61 }, { stat: 'atk', value: 36 }, { stat: 'heal', value: 5 }, { stat: 'res.terre', value: 3 }],
    description: ''
}

item.ceinture_du_wa_wobot = {
    id: 'ceinture_du_wa_wobot',
    name: 'Ceinture du Wa Wobot',
    image: 'images/items/Ceinture_du_Wa_Wobot.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_wa_wobot',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 83,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 6 }, { stat: 'heal', value: 5 }],
    description: ''
}

item.tablier_des_scalptaras = {
    id: 'tablier_des_scalptaras',
    name: 'Tablier des Scalptaras',
    image: 'images/items/Tablier_des_Scalptaras.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_des_scalptaras',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 84,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 21 }, { stat: 'spd', value: 11 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 3 }],
    description: ''
}

item.bracelet_du_blanc_pa_wabbit = {
    id: 'bracelet_du_blanc_pa_wabbit',
    name: 'Bracelet du Blanc Pa Wabbit',
    image: 'images/items/Bracelet_du_Blanc_Pa_Wabbit.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_blanc_pa_wabbit',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 84,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 21 }, { stat: 'spd', value: 6 }, { stat: 'flatDamage', value: 4 }, { stat: 'heal', value: 5 }],
    description: ''
}

item.amulette_du_boufcoul = {
    id: 'amulette_du_boufcoul',
    name: 'Amulette du Boufcoul',
    image: 'images/items/Amulette_du_Boufcoul.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_boufcoul',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 84,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 51 }, { stat: 'spd', value: -5 }, { stat: 'flatDamage', value: 3 }, { stat: 'heal', value: 4 }],
    description: ''
}

item.amulette_du_craqueleur_legendaire = {
    id: 'amulette_du_craqueleur_legendaire',
    name: 'Amulette du Craqueleur Légendaire',
    image: 'images/items/Amulette_du_Craqueleur_Légendaire.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_craqueleur_legendaire',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 84,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 51 }, { stat: 'res.eau', value: 4 }, { stat: 'res.terre', value: 4 }],
    description: ''
}

item.craquelocape_legendaire = {
    id: 'craquelocape_legendaire',
    name: 'Craquelocape Légendaire',
    image: 'images/items/Craquelocape_Légendaire.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_craqueleur_legendaire',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 84,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 47 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.voile_de_musha = {
    id: 'voile_de_musha',
    name: 'Voile de Musha',
    image: 'images/items/Voile_de_Musha.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_musha',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 85,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'flatDamage', value: 7 }, { stat: 'critChance', value: -10 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 3 }, { stat: 'res.eau', value: 3 }],
    description: ''
}

item.coiffe_de_redolphe = {
    id: 'coiffe_de_redolphe',
    name: 'Coiffe de Redolphe',
    image: 'images/items/Coiffe_de_Redolphe.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_redolphe',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 85,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'spd', value: 16 }, { stat: 'flatDamage', value: 20 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.licol_de_redolphe = {
    id: 'licol_de_redolphe',
    name: 'Licol de Redolphe',
    image: 'images/items/Licol_de_Redolphe.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_redolphe',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 85,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 56 }, { stat: 'flatDamage', value: 4 }, { stat: 'critResPct', value: 4 }, { stat: 'heal', value: 2 }],
    description: ''
}

item.sabots_de_redolphe = {
    id: 'sabots_de_redolphe',
    name: 'Sabots de Redolphe',
    image: 'images/items/Sabots_de_Redolphe.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_redolphe',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 85,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 21 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 4 }, { stat: 'critResPct', value: 4 }],
    description: ''
}

item.sacoche_de_redolphe = {
    id: 'sacoche_de_redolphe',
    name: 'Sacoche de Redolphe',
    image: 'images/items/Sacoche_de_Redolphe.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_redolphe',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 85,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 46 }, { stat: 'res.neutre', value: 2 }],
    description: ''
}

item.gant_de_tyranne = {
    id: 'gant_de_tyranne',
    name: 'Gant de Tyranne',
    image: 'images/items/Gant_de_Tyranne.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_la_terrible',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 85,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 45 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 3 }],
    description: ''
}

item.ceinture_du_boufcoul = {
    id: 'ceinture_du_boufcoul',
    name: 'Ceinture du Boufcoul',
    image: 'images/items/Ceinture_du_Boufcoul.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_boufcoul',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 85,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 21 }, { stat: 'spd', value: -5 }, { stat: 'flatDamage', value: 6 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.bouclier_du_chouque = {
    id: 'bouclier_du_chouque',
    name: 'Bouclier du Chouque',
    image: 'images/items/Bouclier_du_Chouque.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_du_capitaine_pirate',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 85,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 35 }],
    description: ''
}

item.collier_rouge_de_daigoro = {
    id: 'collier_rouge_de_daigoro',
    name: 'Collier Rouge de Daïgoro',
    image: 'images/items/Collier_Rouge_de_Daïgoro.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_daigoro',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 86,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 56 }, { stat: 'flatDamage', value: 4 }, { stat: 'critResPct', value: 5 }],
    description: ''
}

item.bottines_des_scalptaras = {
    id: 'bottines_des_scalptaras',
    name: 'Bottines des Scalptaras',
    image: 'images/items/Bottines_des_Scalptaras.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_des_scalptaras',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 86,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 21 }, { stat: 'spd', value: 31 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 3 }],
    description: ''
}

item.anneau_du_boufcoul = {
    id: 'anneau_du_boufcoul',
    name: 'Anneau du Boufcoul',
    image: 'images/items/Anneau_du_Boufcoul.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_boufcoul',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 86,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 16 }, { stat: 'spd', value: -5 }, { stat: 'heal', value: 4 }, { stat: 'res.feu', value: 2 }, { stat: 'res.terre', value: 2 }],
    description: ''
}

item.bottes_du_craqueleur_legendaire = {
    id: 'bottes_du_craqueleur_legendaire',
    name: 'Bottes du Craqueleur Légendaire',
    image: 'images/items/Bottes_du_Craqueleur_Légendaire.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_craqueleur_legendaire',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 86,
    stats: [{ stat: 'atk', value: 16 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 4 }, { stat: 'heal', value: 4 }, { stat: 'res.eau', value: 5 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.boucli_il_de_musha = {
    id: 'boucli_il_de_musha',
    name: 'Boucliœil de Musha',
    image: 'images/items/Boucliœil_de_Musha.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_de_musha',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 87,
    stats: [{ stat: 'maxHp', value: 61 }, { stat: 'atk', value: 30 }, { stat: 'critChance', value: -10 }, { stat: 'res.feu', value: 3 }, { stat: 'res.eau', value: 3 }, { stat: 'res.terre', value: 3 }, { stat: 'res.neutre', value: 3 }],
    description: ''
}

item.bottes_du_boufcoul = {
    id: 'bottes_du_boufcoul',
    name: 'Bottes du Boufcoul',
    image: 'images/items/Bottes_du_Boufcoul.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_boufcoul',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 87,
    stats: [{ stat: 'maxHp', value: 61 }, { stat: 'atk', value: 21 }, { stat: 'spd', value: 10 }, { stat: 'res.terre', value: 2 }],
    description: ''
}

item.blopture_multicolore_royale = {
    id: 'blopture_multicolore_royale',
    name: 'Blopture Multicolore Royale',
    image: 'images/items/Blopture_Multicolore_Royale.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_blop_multicolore_royale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 88,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 26 }, { stat: 'flatDamage', value: 5 }, { stat: 'heal', value: 7 }, { stat: 'res.terre', value: 2 }],
    description: ''
}

item.anneau_riktus = {
    id: 'anneau_riktus',
    name: 'Anneau Riktus',
    image: 'images/items/Anneau_Riktus.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_riktus',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 88,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 4 }, { stat: 'heal', value: 5 }, { stat: 'res.eau', value: 2 }],
    description: ''
}

item.masque_de_choudini = {
    id: 'masque_de_choudini',
    name: 'Masque de Choudini',
    image: 'images/items/Masque_de_Choudini.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_choudini',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 88,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 2 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.baton_de_daigoro = {
    id: 'baton_de_daigoro',
    name: 'Bâton de Daïgoro',
    image: 'images/items/Bâton_de_Daïgoro.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_daigoro',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 88,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 28 }, { stat: 'res.air', value: 3 }, { stat: 'res.neutre', value: 3 }],
    description: ''
}

item.marteau_du_boufcoul = {
    id: 'marteau_du_boufcoul',
    name: 'Marteau du Boufcoul',
    image: 'images/items/Marteau_du_Boufcoul.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_boufcoul',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 88,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 21 }, { stat: 'spd', value: -5 }, { stat: 'flatDamage', value: 12 }, { stat: 'critChance', value: 2 }, { stat: 'lifestealPct', value: 6 }, { stat: 'res.neutre', value: 2 }],
    description: ''
}

item.coiffe_du_boufcoul = {
    id: 'coiffe_du_boufcoul',
    name: 'Coiffe du Boufcoul',
    image: 'images/items/Coiffe_du_Boufcoul.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_boufcoul',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 89,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 21 }, { stat: 'spd', value: -5 }, { stat: 'flatDamage', value: 6 }, { stat: 'heal', value: 4 }, { stat: 'res.feu', value: 2 }, { stat: 'res.terre', value: 2 }],
    description: ''
}

item.amublop_multicolore_royale = {
    id: 'amublop_multicolore_royale',
    name: 'Amublop Multicolore Royale',
    image: 'images/items/Amublop_Multicolore_Royale.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_blop_multicolore_royale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 90,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 56 }, { stat: 'flatDamage', value: 4 }, { stat: 'res.feu', value: 2 }],
    description: ''
}

item.blopanneau_multicolore_royal = {
    id: 'blopanneau_multicolore_royal',
    name: 'Blopanneau Multicolore Royal',
    image: 'images/items/Blopanneau_Multicolore_Royal.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_blop_multicolore_royale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 90,
    stats: [{ stat: 'maxHp', value: 21 }, { stat: 'atk', value: 16 }, { stat: 'heal', value: 3 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.bloptes_multicolores_royales = {
    id: 'bloptes_multicolores_royales',
    name: 'Bloptes Multicolores Royales',
    image: 'images/items/Bloptes_Multicolores_Royales.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_blop_multicolore_royale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 90,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 21 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 2 }, { stat: 'res.eau', value: 2 }],
    description: ''
}

item.cape_riktus = {
    id: 'cape_riktus',
    name: 'Cape Riktus',
    image: 'images/items/Cape_Riktus.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_riktus',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 90,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 4 }, { stat: 'critResPct', value: 11 }, { stat: 'heal', value: 7 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.bouclier_de_choudini = {
    id: 'bouclier_de_choudini',
    name: 'Bouclier de Choudini',
    image: 'images/items/Bouclier_de_Choudini.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_de_choudini',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 90,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 21 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.gaine_nyee = {
    id: 'gaine_nyee',
    name: 'Gaine Nyée',
    image: 'images/items/Gaine_Nyée.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_la_pondeuse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 90,
    stats: [{ stat: 'maxHp', value: 61 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 8 }, { stat: 'res.eau', value: 2 }],
    description: ''
}

item.coiffe_de_la_nefileuse = {
    id: 'coiffe_de_la_nefileuse',
    name: 'Coiffe de la Néfileuse',
    image: 'images/items/Coiffe_de_la_Néfileuse.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_la_tisseuse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 90,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 16 }, { stat: 'flatDamage', value: 4 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.cape_du_boufcoul = {
    id: 'cape_du_boufcoul',
    name: 'Cape du Boufcoul',
    image: 'images/items/Cape_du_Boufcoul.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_boufcoul',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 90,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 21 }, { stat: 'spd', value: -5 }, { stat: 'flatDamage', value: 6 }, { stat: 'heal', value: 4 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.amulette_feudala = {
    id: 'amulette_feudala',
    name: 'Amulette Feudala',
    image: 'images/items/Amulette_Feudala.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_feudala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 91,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 66 }, { stat: 'heal', value: 7 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.cape_feudala = {
    id: 'cape_feudala',
    name: 'Cape Feudala',
    image: 'images/items/Cape_Feudala.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_feudala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 92,
    stats: [{ stat: 'maxHp', value: 61 }, { stat: 'atk', value: 41 }, { stat: 'critChance', value: 4 }, { stat: 'res.eau', value: 4 }, { stat: 'res.terre', value: 4 }],
    description: ''
}

item.masque_riktus = {
    id: 'masque_riktus',
    name: 'Masque Riktus',
    image: 'images/items/Masque_Riktus.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_riktus',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 92,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 5 }, { stat: 'heal', value: 4 }, { stat: 'dropRate', value: 1 }, { stat: 'res.terre', value: 4 }],
    description: ''
}

item.bottes_de_choudini = {
    id: 'bottes_de_choudini',
    name: 'Bottes de Choudini',
    image: 'images/items/Bottes_de_Choudini.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_choudini',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 92,
    stats: [{ stat: 'atk', value: 31 }, { stat: 'spd', value: -5 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 5 }],
    description: ''
}

item.cage_de_simbadas = {
    id: 'cage_de_simbadas',
    name: 'Cage de Simbadas',
    image: 'images/items/Cage_de_Simbadas.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_simbadas',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 92,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 35 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 11 }, { stat: 'res.neutre', value: 3 }],
    description: ''
}

item.amulette_des_huit_yeux = {
    id: 'amulette_des_huit_yeux',
    name: 'Amulette des Huit Yeux',
    image: 'images/items/Amulette_des_Huit_Yeux.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_la_pondeuse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 92,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 56 }, { stat: 'flatDamage', value: 4 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.cape_du_capitaine_pirate = {
    id: 'cape_du_capitaine_pirate',
    name: 'Cape du Capitaine Pirate',
    image: 'images/items/Cape_du_Capitaine_Pirate.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_capitaine_pirate',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 92,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 8 }],
    description: ''
}

item.anneau_tisse = {
    id: 'anneau_tisse',
    name: 'Anneau Tissé',
    image: 'images/items/Anneau_Tissé.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_la_tisseuse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 93,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 31 }, { stat: 'critChance', value: 2 }, { stat: 'res.terre', value: 4 }],
    description: ''
}

item.bottes_soyeuses = {
    id: 'bottes_soyeuses',
    name: 'Bottes Soyeuses',
    image: 'images/items/Bottes_Soyeuses.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_la_tisseuse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 93,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 36 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 2 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 2 }],
    description: ''
}

item.chapeau_du_capitaine_pirate = {
    id: 'chapeau_du_capitaine_pirate',
    name: 'Chapeau du Capitaine Pirate',
    image: 'images/items/Chapeau_du_Capitaine_Pirate.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_capitaine_pirate',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 93,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 39 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 8 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.porte_bonheur_de_rok_gnorok = {
    id: 'porte_bonheur_de_rok_gnorok',
    name: 'Porte-bonheur de Rok Gnorok',
    image: 'images/items/Porte-bonheur_de_Rok_Gnorok.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_rok_gnorok',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 94,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 66 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 3 }, { stat: 'res.terre', value: 3 }],
    description: ''
}

item.barriere_de_simbadas = {
    id: 'barriere_de_simbadas',
    name: 'Barrière de Simbadas',
    image: 'images/items/Barrière_de_Simbadas.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_de_simbadas',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 94,
    stats: [{ stat: 'maxHp', value: 61 }, { stat: 'atk', value: 15 }, { stat: 'critChance', value: 5 }, { stat: 'dropRate', value: 1 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.caparak = {
    id: 'caparak',
    name: 'Caparak',
    image: 'images/items/Caparak.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_la_pondeuse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 94,
    stats: [{ stat: 'maxHp', value: 61 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 8 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 4 }],
    description: ''
}

item.alliance_du_capitaine_pirate = {
    id: 'alliance_du_capitaine_pirate',
    name: 'Alliance du Capitaine Pirate',
    image: 'images/items/Alliance_du_Capitaine_Pirate.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_capitaine_pirate',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 94,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 28 }, { stat: 'flatDamage', value: 5 }],
    description: ''
}

item.mules_du_dragon_cochon = {
    id: 'mules_du_dragon_cochon',
    name: 'Mules du Dragon Cochon',
    image: 'images/items/Mules_du_Dragon_Cochon.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_dragon_cochon',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 94,
    stats: [{ stat: 'maxHp', value: 61 }, { stat: 'atk', value: 21 }, { stat: 'spd', value: 15 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.bouclier_feudala = {
    id: 'bouclier_feudala',
    name: 'Bouclier Feudala',
    image: 'images/items/Bouclier_Feudala.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_feudala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 95,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 31 }, { stat: 'critChance', value: 3 }, { stat: 'heal', value: 7 }, { stat: 'res.feu', value: 7 }],
    description: ''
}

item.le_rok_gnorok = {
    id: 'le_rok_gnorok',
    name: 'Le Rok Gnorok',
    image: 'images/items/Le_Rok_Gnorok.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_rok_gnorok',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 96,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: -14 }, { stat: 'spd', value: -15 }, { stat: 'flatDamage', value: 16 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 1 }, { stat: 'res.eau', value: 1 }, { stat: 'res.terre', value: 1 }, { stat: 'res.air', value: 1 }],
    description: ''
}

item.patte_de_simbadas = {
    id: 'patte_de_simbadas',
    name: 'Patte de Simbadas',
    image: 'images/items/Patte_de_Simbadas.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_simbadas',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 96,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 11 }, { stat: 'res.neutre', value: 3 }],
    description: ''
}

item.ceinture_dracochoune = {
    id: 'ceinture_dracochoune',
    name: 'Ceinture Dracochoune',
    image: 'images/items/Ceinture_Dracochoune.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_dragon_cochon',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 96,
    stats: [{ stat: 'maxHp', value: 61 }, { stat: 'atk', value: 47 }, { stat: 'flatDamage', value: 2 }, { stat: 'res.eau', value: 2 }],
    description: ''
}

item.coiffe_du_dragon_cochon = {
    id: 'coiffe_du_dragon_cochon',
    name: 'Coiffe du Dragon Cochon',
    image: 'images/items/Coiffe_du_Dragon_Cochon.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_dragon_cochon',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 96,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 32 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 1 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.amulette_du_gorgouille = {
    id: 'amulette_du_gorgouille',
    name: 'Amulette du Gorgouille',
    image: 'images/items/Amulette_du_Gorgouille.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_gorgouille',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 96,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 66 }, { stat: 'spd', value: 6 }, { stat: 'flatDamage', value: 6 }],
    description: ''
}

item.brighellaniere = {
    id: 'brighellaniere',
    name: 'Brighellanière',
    image: 'images/items/Brighellanière.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_talienne',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 97,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 2 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.casque_de_maitre_nabur = {
    id: 'casque_de_maitre_nabur',
    name: 'Casque de Maître Nabur',
    image: 'images/items/Casque_de_Maître_Nabur.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_maitre_nabur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 97,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 42 }, { stat: 'spd', value: 36 }, { stat: 'res.eau', value: 5 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.gantelet_du_gorgouille = {
    id: 'gantelet_du_gorgouille',
    name: 'Gantelet du Gorgouille',
    image: 'images/items/Gantelet_du_Gorgouille.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_gorgouille',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 97,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 25 }, { stat: 'flatDamage', value: 6 }],
    description: ''
}

item.pagne_du_muloubar = {
    id: 'pagne_du_muloubar',
    name: 'Pagne du Muloubar',
    image: 'images/items/Pagne_du_Muloubar.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_muloubar',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 97,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 40 }, { stat: 'flatDamage', value: 6 }, { stat: 'res.eau', value: 4 }],
    description: ''
}

item.chapeau_feudala = {
    id: 'chapeau_feudala',
    name: 'Chapeau Feudala',
    image: 'images/items/Chapeau_Feudala.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_feudala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 98,
    stats: [{ stat: 'maxHp', value: 61 }, { stat: 'atk', value: 41 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 4 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.bottes_precieuses = {
    id: 'bottes_precieuses',
    name: 'Bottes Précieuses',
    image: 'images/items/Bottes_Précieuses.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_precieuse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 98,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 21 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 6 }],
    description: ''
}

item.rempierre_de_rok_gnorok = {
    id: 'rempierre_de_rok_gnorok',
    name: 'Rempierre de Rok Gnorok',
    image: 'images/items/Rempierre_de_Rok_Gnorok.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_de_rok_gnorok',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 98,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 31 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 3 }, { stat: 'res.air', value: 3 }],
    description: ''
}

item.gant_du_rat_noir = {
    id: 'gant_du_rat_noir',
    name: 'Gant du Rat Noir',
    image: 'images/items/Gant_du_Rat_Noir.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_rat_noir',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 98,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 9 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.cape_du_gorgouille = {
    id: 'cape_du_gorgouille',
    name: 'Cape du Gorgouille',
    image: 'images/items/Cape_du_Gorgouille.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_gorgouille',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 99,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 9 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.bottes_du_rat_blanc = {
    id: 'bottes_du_rat_blanc',
    name: 'Bottes du Rat Blanc',
    image: 'images/items/Bottes_du_Rat_Blanc.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_rat_blanc',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 99,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 8 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.krosmangle = {
    id: 'krosmangle',
    name: 'Krosmangle',
    image: 'images/items/Krosmangle.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'krosmanoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'maxHp', value: 61 }, { stat: 'atk', value: 42 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 12 }, { stat: 'critResPct', value: 7 }],
    description: ''
}

item.krosmaussures = {
    id: 'krosmaussures',
    name: 'Krosmaussures',
    image: 'images/items/Krosmaussures.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'krosmanoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 6 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 8 }, { stat: 'critChance', value: 2 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.bottes_ulisme = {
    id: 'bottes_ulisme',
    name: 'Bottes Ulisme',
    image: 'images/items/Bottes_Ulisme.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_altruiste',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'spd', value: 15 }],
    description: ''
}

item.bouclier_de_bowisse_ankarton = {
    id: 'bouclier_de_bowisse_ankarton',
    name: 'Bouclier de Bowisse Ankarton',
    image: 'images/items/Bouclier_de_Bowisse_Ankarton.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_ankarton',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [],
    description: ''
}

item.bottes_hox = {
    id: 'bottes_hox',
    name: 'Bottes Hox',
    image: 'images/items/Bottes_Hox.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_criminelle',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'spd', value: 15 }],
    description: ''
}

item.bottes_harcie = {
    id: 'bottes_harcie',
    name: 'Bottes Harcie',
    image: 'images/items/Bottes_Harcie.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_enragee',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'spd', value: 15 }],
    description: ''
}

item.geta_bernacle = {
    id: 'geta_bernacle',
    name: 'Geta Bernacle',
    image: 'images/items/Geta_Bernacle.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_ethylique',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'spd', value: 15 }],
    description: ''
}

item.bottes_opsy = {
    id: 'bottes_opsy',
    name: 'Bottes Opsy',
    image: 'images/items/Bottes_Opsy.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_explosive',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'spd', value: 15 }],
    description: ''
}

item.tong_aclou = {
    id: 'tong_aclou',
    name: 'Tong Aclou',
    image: 'images/items/Tong_Aclou.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_exsangue',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'spd', value: 15 }],
    description: ''
}

item.bottes_antouche = {
    id: 'bottes_antouche',
    name: 'Bottes Antouche',
    image: 'images/items/Bottes_Antouche.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_indestructible',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'spd', value: 15 }],
    description: ''
}

item.bottes_hairo = {
    id: 'bottes_hairo',
    name: 'Bottes Hairo',
    image: 'images/items/Bottes_Hairo.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_intemporelle',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'spd', value: 15 }],
    description: ''
}

item.sabots_taj = {
    id: 'sabots_taj',
    name: 'Sabots Taj',
    image: 'images/items/Sabots_Taj.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_lunatique',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'spd', value: 15 }],
    description: ''
}

item.bottes_initiales = {
    id: 'bottes_initiales',
    name: 'Bottes Initiales',
    image: 'images/items/Bottes_Initiales.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_quadramentale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'spd', value: 15 }],
    description: ''
}

item.bottes_hanik = {
    id: 'bottes_hanik',
    name: 'Bottes Hanik',
    image: 'images/items/Bottes_Hanik.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_sauvage',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'spd', value: 15 }],
    description: ''
}

item.bottes_omates = {
    id: 'bottes_omates',
    name: 'Bottes Omates',
    image: 'images/items/Bottes_Omates.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_submersible',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'spd', value: 15 }],
    description: ''
}

item.bottes_ransitoires = {
    id: 'bottes_ransitoires',
    name: 'Bottes Ransitoires',
    image: 'images/items/Bottes_Ransitoires.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_transcendante',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'spd', value: 15 }],
    description: ''
}

item.bottes_antrin = {
    id: 'bottes_antrin',
    name: 'Bottes Antrin',
    image: 'images/items/Bottes_Antrin.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_temeraire',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'spd', value: 15 }],
    description: ''
}

item.chaussures_lepon_davignon = {
    id: 'chaussures_lepon_davignon',
    name: 'Chaussures Lepon-Davignon',
    image: 'images/items/Chaussures_Lepon-Davignon.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_venerable',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'spd', value: 15 }],
    description: ''
}

item.charentaises_a_poils = {
    id: 'charentaises_a_poils',
    name: 'Charentaises à poils',
    image: 'images/items/Charentaises_à_poils.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_gouttiere',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'spd', value: 15 }],
    description: ''
}

item.ceinture_ding_dong = {
    id: 'ceinture_ding_dong',
    name: 'Ceinture Ding Dong',
    image: 'images/items/Ceinture_Ding_Dong.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_maitre_nabur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'atk', value: 31 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 7 }, { stat: 'res.feu', value: 4 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.jambieres_hitaj = {
    id: 'jambieres_hitaj',
    name: 'Jambières Hitaj',
    image: 'images/items/Jambières_Hitaj.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_l_heritage',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'spd', value: 15 }],
    description: ''
}

item.bottes_swana = {
    id: 'bottes_swana',
    name: 'Bottes Swana',
    image: 'images/items/Bottes_Swana.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_l_innombrable',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'spd', value: 15 }],
    description: ''
}

item.ceinture_du_berserkoffre = {
    id: 'ceinture_du_berserkoffre',
    name: 'Ceinture du Berserkoffre',
    image: 'images/items/Ceinture_du_Berserkoffre.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_berserkoffre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 8 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 2 }],
    description: ''
}

item.fourbacoiffe = {
    id: 'fourbacoiffe',
    name: 'Fourbacoiffe',
    image: 'images/items/Fourbacoiffe.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_chasseur_embusque',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 26 }, { stat: 'spd', value: 26 }, { stat: 'flatDamage', value: 8 }, { stat: 'critChance', value: 2 }, { stat: 'res.eau', value: 2 }, { stat: 'res.terre', value: 2 }],
    description: ''
}

item.amulette_du_chef_bwork = {
    id: 'amulette_du_chef_bwork',
    name: 'Amulette du Chef Bwork',
    image: 'images/items/Amulette_du_Chef_Bwork.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_chef_bwork',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 54 }, { stat: 'critChance', value: 2 }, { stat: 'res.eau', value: 2 }, { stat: 'res.terre', value: 2 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.bottes_du_chef_bwork = {
    id: 'bottes_du_chef_bwork',
    name: 'Bottes du Chef Bwork',
    image: 'images/items/Bottes_du_Chef_Bwork.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_chef_bwork',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 26 }, { stat: 'spd', value: 15 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 2 }, { stat: 'res.terre', value: 2 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.bracelet_du_chef_bwork = {
    id: 'bracelet_du_chef_bwork',
    name: 'Bracelet du Chef Bwork',
    image: 'images/items/Bracelet_du_Chef_Bwork.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_chef_bwork',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 30 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 2 }, { stat: 'res.terre', value: 2 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.cape_du_chef_bwork = {
    id: 'cape_du_chef_bwork',
    name: 'Cape du Chef Bwork',
    image: 'images/items/Cape_du_Chef_Bwork.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_chef_bwork',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 3 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 4 }, { stat: 'res.eau', value: 4 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.casque_du_chef_bwork = {
    id: 'casque_du_chef_bwork',
    name: 'Casque du Chef Bwork',
    image: 'images/items/Casque_du_Chef_Bwork.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_chef_bwork',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 43 }, { stat: 'flatDamage', value: 2 }, { stat: 'res.feu', value: 2 }, { stat: 'res.eau', value: 2 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.lame_du_chef_bwork = {
    id: 'lame_du_chef_bwork',
    name: 'Lame du Chef Bwork',
    image: 'images/items/Lame_du_Chef_Bwork.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_chef_bwork',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 52 }, { stat: 'flatDamage', value: 27 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 4 }],
    description: ''
}

item.slip_du_chef_bwork = {
    id: 'slip_du_chef_bwork',
    name: 'Slip du Chef Bwork',
    image: 'images/items/Slip_du_Chef_Bwork.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_chef_bwork',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 3 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: -4 }, { stat: 'res.eau', value: 4 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.collier_du_dragon_cochon = {
    id: 'collier_du_dragon_cochon',
    name: 'Collier du Dragon Cochon',
    image: 'images/items/Collier_du_Dragon_Cochon.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_dragon_cochon',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 56 }, { stat: 'flatDamage', value: 2 }, { stat: 'critChance', value: 1 }, { stat: 'heal', value: 4 }],
    description: ''
}

item.cape_du_muloubar = {
    id: 'cape_du_muloubar',
    name: 'Cape du Muloubar',
    image: 'images/items/Cape_du_Muloubar.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_muloubar',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 53 }, { stat: 'flatDamage', value: 6 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 2 }],
    description: ''
}

item.bottes_deuradi = {
    id: 'bottes_deuradi',
    name: 'Bottes Deuradi',
    image: 'images/items/Bottes_Deuradi.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_prince_des_voleurs',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 100,
    stats: [{ stat: 'spd', value: 15 }],
    description: ''
}

item.ceinture_hetorique = {
    id: 'ceinture_hetorique',
    name: 'Ceinture Hétorique',
    image: 'images/items/Ceinture_Hétorique.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_dramatik',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 101,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 31 }, { stat: 'critDamagePct', value: 7 }, { stat: 'res.eau', value: 4 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.ceinture_precieuse = {
    id: 'ceinture_precieuse',
    name: 'Ceinture Précieuse',
    image: 'images/items/Ceinture_Précieuse.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_precieuse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 101,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 61 }, { stat: 'flatDamage', value: 12 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.fourbacapa = {
    id: 'fourbacapa',
    name: 'Fourbacapa',
    image: 'images/items/Fourbacapa.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_chasseur_embusque',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 101,
    stats: [{ stat: 'maxHp', value: 91 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 8 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.cape_du_krokilleur = {
    id: 'cape_du_krokilleur',
    name: 'Cape du Krokilleur',
    image: 'images/items/Cape_du_Krokilleur.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_krokilleur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 101,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 8 }, { stat: 'critChance', value: 2 }, { stat: 'critResPct', value: 4 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 4 }, { stat: 'res.terre', value: 4 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.gant_du_rat_blanc = {
    id: 'gant_du_rat_blanc',
    name: 'Gant du Rat Blanc',
    image: 'images/items/Gant_du_Rat_Blanc.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_rat_blanc',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 101,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 36 }, { stat: 'flatDamage', value: 6 }, { stat: 'heal', value: 3 }],
    description: ''
}

item.bottes_du_rat_noir = {
    id: 'bottes_du_rat_noir',
    name: 'Bottes du Rat Noir',
    image: 'images/items/Bottes_du_Rat_Noir.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_rat_noir',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 101,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 12 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.ceinture_du_rat_noir = {
    id: 'ceinture_du_rat_noir',
    name: 'Ceinture du Rat Noir',
    image: 'images/items/Ceinture_du_Rat_Noir.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_rat_noir',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 101,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 9 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 5 }],
    description: ''
}

item.capitrouille = {
    id: 'capitrouille',
    name: 'Capitrouille',
    image: 'images/items/Capitrouille.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplitrouille',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 101,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 6 }, { stat: 'critResPct', value: 6 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 4 }, { stat: 'res.terre', value: 4 }],
    description: ''
}

item.chapokipik = {
    id: 'chapokipik',
    name: 'Chapokipik',
    image: 'images/items/Chapokipik.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panokipik',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 102,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 36 }, { stat: 'flatDamage', value: 4 }, { stat: 'critResPct', value: 7 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.masque_iproquo = {
    id: 'masque_iproquo',
    name: 'Masque Iproquo',
    image: 'images/items/Masque_Iproquo.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_dramatik',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 102,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 46 }, { stat: 'critChance', value: 3 }, { stat: 'res.feu', value: 4 }, { stat: 'res.terre', value: 4 }],
    description: ''
}

item.fourbasse_ton = {
    id: 'fourbasse_ton',
    name: 'Fourbasse-Ton',
    image: 'images/items/Fourbasse-Ton.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_fourbasse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 102,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 31 }, { stat: 'res.feu', value: 5 }],
    description: ''
}

item.scaramouchapeau = {
    id: 'scaramouchapeau',
    name: 'Scaramouchapeau',
    image: 'images/items/Scaramouchapeau.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_talienne',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 102,
    stats: [{ stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 5 }, { stat: 'res.feu', value: 5 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.bottes_horchons = {
    id: 'bottes_horchons',
    name: 'Bottes Horchons',
    image: 'images/items/Bottes_Horchons.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_vassale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 102,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 21 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 6 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 2 }],
    description: ''
}

item.amulette_de_moon = {
    id: 'amulette_de_moon',
    name: 'Amulette de Moon',
    image: 'images/items/Amulette_de_Moon.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_moon',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 102,
    stats: [{ stat: 'maxHp', value: 91 }, { stat: 'atk', value: 61 }, { stat: 'flatDamage', value: 5 }, { stat: 'critDamagePct', value: 7 }, { stat: 'res.eau', value: 10 }],
    description: ''
}

item.bandeau_de_carlita = {
    id: 'bandeau_de_carlita',
    name: 'Bandeau de Carlita',
    image: 'images/items/Bandeau_de_Carlita.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_l_aguerfelde',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 102,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 31 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 7 }, { stat: 'dropRate', value: 1 }, { stat: 'res.terre', value: 3 }],
    description: ''
}

item.bottes_du_berserkoffre = {
    id: 'bottes_du_berserkoffre',
    name: 'Bottes du Berserkoffre',
    image: 'images/items/Bottes_du_Berserkoffre.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_berserkoffre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 102,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 8 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.cape_du_rat_blanc = {
    id: 'cape_du_rat_blanc',
    name: 'Cape du Rat Blanc',
    image: 'images/items/Cape_du_Rat_Blanc.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_rat_blanc',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 102,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 8 }, { stat: 'dropRate', value: 1 }, { stat: 'res.terre', value: 2 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.ceinture_du_rat_blanc = {
    id: 'ceinture_du_rat_blanc',
    name: 'Ceinture du Rat Blanc',
    image: 'images/items/Ceinture_du_Rat_Blanc.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_rat_blanc',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 102,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 6 }, { stat: 'dropRate', value: 1 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.collier_du_rat_blanc = {
    id: 'collier_du_rat_blanc',
    name: 'Collier du Rat Blanc',
    image: 'images/items/Collier_du_Rat_Blanc.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_rat_blanc',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 102,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 4 }, { stat: 'heal', value: 3 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.masque_du_rat_noir = {
    id: 'masque_du_rat_noir',
    name: 'Masque du Rat Noir',
    image: 'images/items/Masque_du_Rat_Noir.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_rat_noir',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 102,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 12 }, { stat: 'critChance', value: 2 }, { stat: 'res.eau', value: 5 }],
    description: ''
}

item.ratrouille = {
    id: 'ratrouille',
    name: 'Râtrouille',
    image: 'images/items/Râtrouille.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplitrouille',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 102,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 24 }, { stat: 'heal', value: 4 }, { stat: 'lifestealPct', value: 4 }, { stat: 'dropRate', value: 1 }, { stat: 'res.terre', value: 6 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.ceinture_fourbissante = {
    id: 'ceinture_fourbissante',
    name: 'Ceinture Fourbissante',
    image: 'images/items/Ceinture_Fourbissante.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_fourbasse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 103,
    stats: [{ stat: 'maxHp', value: 91 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 12 }, { stat: 'critChance', value: 3 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.fourbamulette = {
    id: 'fourbamulette',
    name: 'Fourbamulette',
    image: 'images/items/Fourbamulette.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_fourbasse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 103,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 56 }, { stat: 'flatDamage', value: 12 }, { stat: 'critChance', value: 3 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.cape_de_la_ouassingue = {
    id: 'cape_de_la_ouassingue',
    name: 'Cape de la Ouassingue',
    image: 'images/items/Cape_de_la_Ouassingue.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_vassale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 103,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: -20 }, { stat: 'flatDamage', value: 6 }, { stat: 'heal', value: 4 }, { stat: 'res.eau', value: 2 }, { stat: 'res.terre', value: 2 }],
    description: ''
}

item.cape_de_moon = {
    id: 'cape_de_moon',
    name: 'Cape de Moon',
    image: 'images/items/Cape_de_Moon.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_moon',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 103,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 5 }, { stat: 'critChance', value: 3 }, { stat: 'res.eau', value: 12 }],
    description: ''
}

item.marteau_de_moon = {
    id: 'marteau_de_moon',
    name: 'Marteau de Moon',
    image: 'images/items/Marteau_de_Moon.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_moon',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 103,
    stats: [{ stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 26 }, { stat: 'critChance', value: 7 }, { stat: 'res.eau', value: 12 }],
    description: ''
}

item.cape_du_dragon_cochon = {
    id: 'cape_du_dragon_cochon',
    name: 'Cape du Dragon Cochon',
    image: 'images/items/Cape_du_Dragon_Cochon.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_dragon_cochon',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 103,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 28 }, { stat: 'flatDamage', value: 4 }, { stat: 'res.feu', value: 2 }, { stat: 'res.neutre', value: 2 }],
    description: ''
}

item.bottes_du_gorgouille = {
    id: 'bottes_du_gorgouille',
    name: 'Bottes du Gorgouille',
    image: 'images/items/Bottes_du_Gorgouille.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_gorgouille',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 103,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 38 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 9 }, { stat: 'critChance', value: 1 }, { stat: 'res.feu', value: 3 }, { stat: 'res.terre', value: 3 }, { stat: 'res.neutre', value: 6 }],
    description: ''
}

item.coiffe_du_muloubar = {
    id: 'coiffe_du_muloubar',
    name: 'Coiffe du Muloubar',
    image: 'images/items/Coiffe_du_Muloubar.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_muloubar',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 103,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 53 }, { stat: 'flatDamage', value: 12 }, { stat: 'res.feu', value: 5 }],
    description: ''
}

item.collier_du_rat_noir = {
    id: 'collier_du_rat_noir',
    name: 'Collier du Rat Noir',
    image: 'images/items/Collier_du_Rat_Noir.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_rat_noir',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 103,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 6 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.martokipik = {
    id: 'martokipik',
    name: 'Martokipik',
    image: 'images/items/Martokipik.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panokipik',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 104,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 33 }, { stat: 'critResPct', value: 7 }, { stat: 'dropRate', value: 2 }],
    description: ''
}

item.bracelet_tmotiv = {
    id: 'bracelet_tmotiv',
    name: 'Bracelet Tmotiv',
    image: 'images/items/Bracelet_Tmotiv.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_dramatik',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 104,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 3 }],
    description: ''
}

item.fourballiance = {
    id: 'fourballiance',
    name: 'Fourballiance',
    image: 'images/items/Fourballiance.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_fourbasse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 104,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 9 }, { stat: 'res.feu', value: 5 }, { stat: 'res.air', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.cape_precieuse = {
    id: 'cape_precieuse',
    name: 'Cape Précieuse',
    image: 'images/items/Cape_Précieuse.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_precieuse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 104,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 12 }, { stat: 'critChance', value: 2 }, { stat: 'res.feu', value: 4 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.arc_lequin = {
    id: 'arc_lequin',
    name: 'Arc Lequin',
    image: 'images/items/Arc_Lequin.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_talienne',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 104,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: 3 }, { stat: 'lifestealPct', value: 4 }, { stat: 'dropRate', value: 3 }],
    description: ''
}

item.capuche_de_la_ouassingue = {
    id: 'capuche_de_la_ouassingue',
    name: 'Capuche de la Ouassingue',
    image: 'images/items/Capuche_de_la_Ouassingue.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_vassale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 104,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 9 }, { stat: 'critResPct', value: -10 }, { stat: 'heal', value: 4 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 2 }, { stat: 'res.terre', value: 2 }],
    description: ''
}

item.sangle_de_carlita = {
    id: 'sangle_de_carlita',
    name: 'Sangle de Carlita',
    image: 'images/items/Sangle_de_Carlita.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_l_aguerfelde',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 104,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 21 }, { stat: 'critChance', value: 1 }, { stat: 'critDamagePct', value: 9 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 3 }],
    description: ''
}

item.fourbabottes = {
    id: 'fourbabottes',
    name: 'Fourbabottes',
    image: 'images/items/Fourbabottes.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_chasseur_embusque',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 104,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 8 }, { stat: 'critChance', value: 2 }, { stat: 'res.eau', value: 5 }],
    description: ''
}

item.corbottes = {
    id: 'corbottes',
    name: 'Corbottes',
    image: 'images/items/Corbottes.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_corbac',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 104,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 8 }],
    description: ''
}

item.kaiser = {
    id: 'kaiser',
    name: 'Kaiser',
    image: 'images/items/Kaiser.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_dragon_cochon',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 104,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: -3 }, { stat: 'flatDamage', value: 31 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 5 }, { stat: 'res.terre', value: 2 }],
    description: ''
}

item.ceinture_du_krokilleur = {
    id: 'ceinture_du_krokilleur',
    name: 'Ceinture du Krokilleur',
    image: 'images/items/Ceinture_du_Krokilleur.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_krokilleur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 104,
    stats: [{ stat: 'maxHp', value: 61 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 8 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 4 }, { stat: 'res.terre', value: 4 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.chapitrouille = {
    id: 'chapitrouille',
    name: 'Chapitrouille',
    image: 'images/items/Chapitrouille.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplitrouille',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 104,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 26 }, { stat: 'flatDamage', value: 8 }, { stat: 'critChance', value: 2 }, { stat: 'heal', value: 4 }, { stat: 'res.air', value: 5 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.cape_houte = {
    id: 'cape_houte',
    name: 'Cape Houte',
    image: 'images/items/Cape_Houte.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panododo',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 105,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 26 }, { stat: 'heal', value: 6 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 6 }, { stat: 'res.air', value: 6 }],
    description: ''
}

item.ouassulette = {
    id: 'ouassulette',
    name: 'Ouassulette',
    image: 'images/items/Ouassulette.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_vassale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 105,
    stats: [{ stat: 'maxHp', value: 91 }, { stat: 'atk', value: 61 }, { stat: 'heal', value: 4 }, { stat: 'dropRate', value: 1 }, { stat: 'res.terre', value: 2 }],
    description: ''
}

item.cape_de_naganita = {
    id: 'cape_de_naganita',
    name: 'Cape de Naganita',
    image: 'images/items/Cape_de_Naganita.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_naganita',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 105,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 5 }, { stat: 'critChance', value: 3 }, { stat: 'heal', value: 5 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.casque_du_berserkoffre = {
    id: 'casque_du_berserkoffre',
    name: 'Casque du Berserkoffre',
    image: 'images/items/Casque_du_Berserkoffre.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_berserkoffre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 105,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 10 }, { stat: 'critChance', value: 2 }, { stat: 'heal', value: 4 }],
    description: ''
}

item.couvre_chef_du_rat_blanc = {
    id: 'couvre_chef_du_rat_blanc',
    name: 'Couvre-chef du Rat Blanc',
    image: 'images/items/Couvre-chef_du_Rat_Blanc.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_rat_blanc',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 105,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 8 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.cape_du_rat_noir = {
    id: 'cape_du_rat_noir',
    name: 'Cape du Rat Noir',
    image: 'images/items/Cape_du_Rat_Noir.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_rat_noir',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 105,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 12 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 2 }, { stat: 'res.eau', value: 2 }],
    description: ''
}

item.ekukipik = {
    id: 'ekukipik',
    name: 'Ékukipik',
    image: 'images/items/Ékukipik.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panokipik',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 106,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 31 }, { stat: 'critResPct', value: 11 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.boutures = {
    id: 'boutures',
    name: 'Boutures',
    image: 'images/items/Boutures.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_plantala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 106,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 21 }, { stat: 'spd', value: 15 }, { stat: 'dropRate', value: 1 }, { stat: 'res.terre', value: 2 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.tromblon_de_carlita = {
    id: 'tromblon_de_carlita',
    name: 'Tromblon de Carlita',
    image: 'images/items/Tromblon_de_Carlita.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_l_aguerfelde',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 106,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: -15 }, { stat: 'flatDamage', value: 42 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 7 }, { stat: 'dropRate', value: 3 }, { stat: 'res.terre', value: 3 }, { stat: 'res.neutre', value: 3 }],
    description: ''
}

item.corbacoiffe = {
    id: 'corbacoiffe',
    name: 'Corbacoiffe',
    image: 'images/items/Corbacoiffe.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_corbac',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 106,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 55 }, { stat: 'spd', value: 16 }, { stat: 'flatDamage', value: 8 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.ceintrouille = {
    id: 'ceintrouille',
    name: 'Ceintrouille',
    image: 'images/items/Ceintrouille.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplitrouille',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 106,
    stats: [{ stat: 'maxHp', value: 61 }, { stat: 'atk', value: 40 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 7 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 4 }, { stat: 'res.air', value: 6 }],
    description: ''
}

item.arc_de_fleche_mauve = {
    id: 'arc_de_fleche_mauve',
    name: 'Arc de Flèche Mauve',
    image: 'images/items/Arc_de_Flèche_Mauve.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_fleche_mauve',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 107,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'spd', value: 31 }, { stat: 'critChance', value: 2 }, { stat: 'heal', value: 31 }, { stat: 'lifestealPct', value: 9 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.collier_de_naganita = {
    id: 'collier_de_naganita',
    name: 'Collier de Naganita',
    image: 'images/items/Collier_de_Naganita.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_naganita',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 107,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 5 }, { stat: 'heal', value: 3 }, { stat: 'dropRate', value: 1 }, { stat: 'res.air', value: 3 }],
    description: ''
}

item.amulette_du_krokilleur = {
    id: 'amulette_du_krokilleur',
    name: 'Amulette du Krokilleur',
    image: 'images/items/Amulette_du_Krokilleur.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_krokilleur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 107,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 91 }, { stat: 'flatDamage', value: 6 }, { stat: 'critChance', value: 1 }, { stat: 'res.eau', value: 4 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.cape_du_minotoror = {
    id: 'cape_du_minotoror',
    name: 'Cape du Minotoror',
    image: 'images/items/Cape_du_Minotoror.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_minotoror',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 107,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 14 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 7 }, { stat: 'heal', value: 7 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.plantamulette = {
    id: 'plantamulette',
    name: 'Plantamulette',
    image: 'images/items/Plantamulette.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_plantala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 108,
    stats: [{ stat: 'maxHp', value: 61 }, { stat: 'atk', value: 56 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 1 }, { stat: 'res.terre', value: 1 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.corbacape = {
    id: 'corbacape',
    name: 'Corbacape',
    image: 'images/items/Corbacape.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_corbac',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 108,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 49 }, { stat: 'critChance', value: 2 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.anneau_du_dragon_cochon = {
    id: 'anneau_du_dragon_cochon',
    name: 'Anneau du Dragon Cochon',
    image: 'images/items/Anneau_du_Dragon_Cochon.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_dragon_cochon',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 108,
    stats: [{ stat: 'maxHp', value: 61 }, { stat: 'atk', value: 21 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 3 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.dagues_du_rat_noir = {
    id: 'dagues_du_rat_noir',
    name: 'Dagues du Rat Noir',
    image: 'images/items/Dagues_du_Rat_Noir.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_rat_noir',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 108,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 25 }, { stat: 'critChance', value: 1 }, { stat: 'lifestealPct', value: 4 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.cape_de_fleche_mauve = {
    id: 'cape_de_fleche_mauve',
    name: 'Cape de Flèche Mauve',
    image: 'images/items/Cape_de_Flèche_Mauve.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_fleche_mauve',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 109,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'heal', value: 9 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.naginata_de_naganita = {
    id: 'naginata_de_naganita',
    name: 'Naginata de Naganita',
    image: 'images/items/Naginata_de_Naganita.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_naganita',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 109,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 39 }, { stat: 'critChance', value: 3 }, { stat: 'heal', value: 3 }, { stat: 'lifestealPct', value: 2 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.ceinture_du_minotoror = {
    id: 'ceinture_du_minotoror',
    name: 'Ceinture du Minotoror',
    image: 'images/items/Ceinture_du_Minotoror.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_minotoror',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 109,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 14 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 7 }, { stat: 'heal', value: 7 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 7 }, { stat: 'res.terre', value: 2 }, { stat: 'res.neutre', value: 2 }],
    description: ''
}

item.hache_du_minotoror = {
    id: 'hache_du_minotoror',
    name: 'Hache du Minotoror',
    image: 'images/items/Hache_du_Minotoror.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_minotoror',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 109,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 14 }, { stat: 'flatDamage', value: 21 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 7 }, { stat: 'heal', value: 7 }, { stat: 'lifestealPct', value: 3 }, { stat: 'dropRate', value: 3 }, { stat: 'res.feu', value: 7 }, { stat: 'res.terre', value: 2 }, { stat: 'res.neutre', value: 2 }],
    description: ''
}

item.rapiere_du_rat_blanc = {
    id: 'rapiere_du_rat_blanc',
    name: 'Rapière du Rat Blanc',
    image: 'images/items/Rapière_du_Rat_Blanc.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_rat_blanc',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 109,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: -4 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 40 }, { stat: 'heal', value: 2 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.protege_tibias_ancestraux = {
    id: 'protege_tibias_ancestraux',
    name: 'Protège-Tibias Ancestraux',
    image: 'images/items/Protège-Tibias_Ancestraux.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_ancestrale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 110,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 26 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }],
    description: ''
}

item.torque_ancestral = {
    id: 'torque_ancestral',
    name: 'Torque Ancestral',
    image: 'images/items/Torque_Ancestral.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_ancestrale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 110,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 59 }, { stat: 'flatDamage', value: 4 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 11 }],
    description: ''
}

item.bulbouclier = {
    id: 'bulbouclier',
    name: 'Bulbouclier',
    image: 'images/items/Bulbouclier.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_plantala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 110,
    stats: [{ stat: 'maxHp', value: 86 }, { stat: 'atk', value: 21 }, { stat: 'critChance', value: 4 }, { stat: 'res.feu', value: 4 }, { stat: 'res.eau', value: 4 }, { stat: 'res.terre', value: 4 }, { stat: 'res.air', value: 4 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.casque_de_fleche_mauve = {
    id: 'casque_de_fleche_mauve',
    name: 'Casque de Flèche Mauve',
    image: 'images/items/Casque_de_Flèche_Mauve.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_fleche_mauve',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 110,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 15 }, { stat: 'critChance', value: 4 }, { stat: 'heal', value: 11 }, { stat: 'res.eau', value: 5 }],
    description: ''
}

item.corbalame = {
    id: 'corbalame',
    name: 'Corbalame',
    image: 'images/items/Corbalame.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_corbac',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 110,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 59 }, { stat: 'flatDamage', value: 44 }, { stat: 'critChance', value: 1 }, { stat: 'res.air', value: 2 }, { stat: 'res.neutre', value: 2 }],
    description: ''
}

item.minotokorno = {
    id: 'minotokorno',
    name: 'Minotokorno',
    image: 'images/items/Minotokorno.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_minotoror',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 110,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 14 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 7 }, { stat: 'heal', value: 7 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.bottes_du_mominotor = {
    id: 'bottes_du_mominotor',
    name: 'Bottes du Mominotor',
    image: 'images/items/Bottes_du_Mominotor.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_mominotor',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 110,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'spd', value: 15 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 7 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.coiffe_du_mominotor = {
    id: 'coiffe_du_mominotor',
    name: 'Coiffe du Mominotor',
    image: 'images/items/Coiffe_du_Mominotor.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_mominotor',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 110,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 15 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.puissante_cape_fulgurante = {
    id: 'puissante_cape_fulgurante',
    name: 'Puissante Cape Fulgurante',
    image: 'images/items/Puissante_Cape_Fulgurante.png',
    type: 'equipment',
    slot: 'cape',
    set: 'puissante_panoplie_fulgurante',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 110,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 35 }, { stat: 'flatDamage', value: 4 }],
    description: ''
}

item.abrature_ancestrale = {
    id: 'abrature_ancestrale',
    name: 'Abrature Ancestrale',
    image: 'images/items/Abrature_Ancestrale.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_ancestrale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 111,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 26 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 4 }, { stat: 'res.eau', value: 4 }, { stat: 'res.terre', value: 4 }, { stat: 'res.air', value: 4 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.collier_du_minotoror = {
    id: 'collier_du_minotoror',
    name: 'Collier du Minotoror',
    image: 'images/items/Collier_du_Minotoror.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_minotoror',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 111,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 49 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 7 }, { stat: 'heal', value: 7 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.alliance_du_mominotor = {
    id: 'alliance_du_mominotor',
    name: 'Alliance du Mominotor',
    image: 'images/items/Alliance_du_Mominotor.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_mominotor',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 111,
    stats: [{ stat: 'maxHp', value: 61 }, { stat: 'atk', value: 15 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 2 }, { stat: 'res.eau', value: 2 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.cape_du_mominotor = {
    id: 'cape_du_mominotor',
    name: 'Cape du Mominotor',
    image: 'images/items/Cape_du_Mominotor.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_mominotor',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 111,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 15 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.pendentif_du_mominotor = {
    id: 'pendentif_du_mominotor',
    name: 'Pendentif du Mominotor',
    image: 'images/items/Pendentif_du_Mominotor.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_mominotor',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 111,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 35 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.abracapa_ancestrale = {
    id: 'abracapa_ancestrale',
    name: 'Abracapa Ancestrale',
    image: 'images/items/Abracapa_Ancestrale.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_ancestrale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 112,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 30 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 4 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 6 }, { stat: 'res.air', value: 6 }],
    description: ''
}

item.capistil = {
    id: 'capistil',
    name: 'Capistil',
    image: 'images/items/Capistil.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_plantala',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 112,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 10 }, { stat: 'critChance', value: 4 }, { stat: 'res.feu', value: 4 }, { stat: 'res.eau', value: 4 }, { stat: 'res.terre', value: 4 }, { stat: 'res.air', value: 4 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.cape_des_ecaflipuces = {
    id: 'cape_des_ecaflipuces',
    name: 'Cape des Ecaflipuces',
    image: 'images/items/Cape_des_Ecaflipuces.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_des_ecaflipuces',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 112,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 10 }, { stat: 'res.eau', value: 5 }, { stat: 'res.terre', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.anneau_du_minotoror = {
    id: 'anneau_du_minotoror',
    name: 'Anneau du Minotoror',
    image: 'images/items/Anneau_du_Minotoror.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_minotoror',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 112,
    stats: [{ stat: 'maxHp', value: 61 }, { stat: 'atk', value: 6 }, { stat: 'critChance', value: 1 }, { stat: 'critDamagePct', value: 3 }, { stat: 'heal', value: 3 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 2 }, { stat: 'res.eau', value: 2 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.ceinture_du_mominotor = {
    id: 'ceinture_du_mominotor',
    name: 'Ceinture du Mominotor',
    image: 'images/items/Ceinture_du_Mominotor.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_mominotor',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 112,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 15 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 7 }, { stat: 'res.terre', value: 2 }, { stat: 'res.neutre', value: 2 }],
    description: ''
}

item.marteau_du_mominotor = {
    id: 'marteau_du_mominotor',
    name: 'Marteau du Mominotor',
    image: 'images/items/Marteau_du_Mominotor.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_mominotor',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 112,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: -35 }, { stat: 'spd', value: -15 }, { stat: 'flatDamage', value: 27 }, { stat: 'lifestealPct', value: 3 }, { stat: 'dropRate', value: 3 }, { stat: 'res.feu', value: 7 }, { stat: 'res.terre', value: 2 }, { stat: 'res.neutre', value: 2 }],
    description: ''
}

item.anneau_ancestral = {
    id: 'anneau_ancestral',
    name: 'Anneau Ancestral',
    image: 'images/items/Anneau_Ancestral.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_ancestrale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 113,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 24 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 4 }, { stat: 'res.terre', value: 4 }],
    description: ''
}

item.bottes_du_minotoror = {
    id: 'bottes_du_minotoror',
    name: 'Bottes du Minotoror',
    image: 'images/items/Bottes_du_Minotoror.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_minotoror',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 113,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 14 }, { stat: 'spd', value: 15 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 7 }, { stat: 'heal', value: 7 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 7 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.abracaska_ancestral = {
    id: 'abracaska_ancestral',
    name: 'Abracaska Ancestral',
    image: 'images/items/Abracaska_Ancestral.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_ancestrale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 114,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 35 }, { stat: 'flatDamage', value: 5 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 5 }],
    description: ''
}

item.bague_des_ecaflipuces = {
    id: 'bague_des_ecaflipuces',
    name: 'Bague des Ecaflipuces',
    image: 'images/items/Bague_des_Ecaflipuces.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_des_ecaflipuces',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 114,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 8 }, { stat: 'res.terre', value: 4 }],
    description: ''
}

item.collier_des_ecaflipuces = {
    id: 'collier_des_ecaflipuces',
    name: 'Collier des Ecaflipuces',
    image: 'images/items/Collier_des_Ecaflipuces.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_des_ecaflipuces',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 114,
    stats: [{ stat: 'maxHp', value: 91 }, { stat: 'atk', value: 61 }, { stat: 'flatDamage', value: 10 }, { stat: 'res.eau', value: 5 }],
    description: ''
}

item.ceinture_du_pounicheur = {
    id: 'ceinture_du_pounicheur',
    name: 'Ceinture du Pounicheur',
    image: 'images/items/Ceinture_du_Pounicheur.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_pounicheur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 114,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 57 }, { stat: 'flatDamage', value: 14 }, { stat: 'heal', value: 4 }],
    description: ''
}

item.anneau_skargo = {
    id: 'anneau_skargo',
    name: 'Anneau Skargo',
    image: 'images/items/Anneau_Skargo.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_baveuse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 115,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 26 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 10 }],
    description: ''
}

item.amulette_du_wabbit_cephale = {
    id: 'amulette_du_wabbit_cephale',
    name: 'Amulette du Wabbit Céphale',
    image: 'images/items/Amulette_du_Wabbit_Céphale.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_wabbit_cephale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 116,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 14 }],
    description: ''
}

item.anneau_xelomorphe = {
    id: 'anneau_xelomorphe',
    name: 'Anneau Xélomorphe',
    image: 'images/items/Anneau_Xélomorphe.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_xelomorphe',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 117,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 26 }, { stat: 'flatDamage', value: 8 }, { stat: 'heal', value: 5 }],
    description: ''
}

item.baguette_d_elya_wood = {
    id: 'baguette_d_elya_wood',
    name: 'Baguette d\'Elya Wood',
    image: 'images/items/Baguette_d_Elya_Wood.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_d_elya_wood',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 117,
    stats: [{ stat: 'atk', value: 36 }, { stat: 'flatDamage', value: 20 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 3 }],
    description: ''
}

item.scalp_du_pounicheur = {
    id: 'scalp_du_pounicheur',
    name: 'Scalp du Pounicheur',
    image: 'images/items/Scalp_du_Pounicheur.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_pounicheur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 117,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 42 }, { stat: 'flatDamage', value: 12 }, { stat: 'heal', value: 7 }],
    description: ''
}

item.arc_du_dragoeuf = {
    id: 'arc_du_dragoeuf',
    name: 'Arc du Dragoeuf',
    image: 'images/items/Arc_du_Dragoeuf.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_dragoeuf_vagabond',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 118,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 37 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 4 }, { stat: 'res.eau', value: 3 }],
    description: ''
}

item.bottes_du_pounicheur = {
    id: 'bottes_du_pounicheur',
    name: 'Bottes du Pounicheur',
    image: 'images/items/Bottes_du_Pounicheur.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_pounicheur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 118,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 67 }, { stat: 'spd', value: 36 }, { stat: 'flatDamage', value: 7 }, { stat: 'heal', value: 7 }],
    description: ''
}

item.bottes_du_royalmouth = {
    id: 'bottes_du_royalmouth',
    name: 'Bottes du Royalmouth',
    image: 'images/items/Bottes_du_Royalmouth.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_royalmouth',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 118,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 45 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 12 }, { stat: 'heal', value: 6 }, { stat: 'dropRate', value: 1 }, { stat: 'res.air', value: 6 }, { stat: 'res.neutre', value: 6 }],
    description: ''
}

item.alliance_d_elya_wood = {
    id: 'alliance_d_elya_wood',
    name: 'Alliance d\'Elya Wood',
    image: 'images/items/Alliance_d_Elya_Wood.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_d_elya_wood',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 119,
    stats: [{ stat: 'maxHp', value: 61 }, { stat: 'atk', value: 21 }, { stat: 'heal', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 14 }, { stat: 'res.terre', value: 14 }],
    description: ''
}

item.bottes_du_wabbit_cephale = {
    id: 'bottes_du_wabbit_cephale',
    name: 'Bottes du Wabbit Céphale',
    image: 'images/items/Bottes_du_Wabbit_Céphale.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_wabbit_cephale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 119,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 36 }, { stat: 'spd', value: 15 }, { stat: 'res.eau', value: 7 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.cape_du_wabbit_garou = {
    id: 'cape_du_wabbit_garou',
    name: 'Cape du Wabbit Garou',
    image: 'images/items/Cape_du_Wabbit_Garou.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_wabbit_garou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 119,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 10 }, { stat: 'critDamagePct', value: 7 }, { stat: 'res.feu', value: 7 }, { stat: 'res.eau', value: 9 }],
    description: ''
}

item.bottes_de_mandrin = {
    id: 'bottes_de_mandrin',
    name: 'Bottes de Mandrin',
    image: 'images/items/Bottes_de_Mandrin.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_contrebandiere',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 120,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 41 }, { stat: 'flatDamage', value: 8 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 18 }, { stat: 'res.air', value: -7 }],
    description: ''
}

item.bottes_de_styx = {
    id: 'bottes_de_styx',
    name: 'Bottes de Styx',
    image: 'images/items/Bottes_de_Styx.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_fluviale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 120,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 41 }, { stat: 'flatDamage', value: 8 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: -7 }, { stat: 'res.eau', value: 18 }],
    description: ''
}

item.bottes_d_inferno = {
    id: 'bottes_d_inferno',
    name: 'Bottes d\'Inferno',
    image: 'images/items/Bottes_d_Inferno.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_infernale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 120,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 41 }, { stat: 'flatDamage', value: 8 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 18 }, { stat: 'res.eau', value: -7 }],
    description: ''
}

item.bottes_de_will_killson = {
    id: 'bottes_de_will_killson',
    name: 'Bottes de Will Killson',
    image: 'images/items/Bottes_de_Will_Killson.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_meurtriere',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 120,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 41 }, { stat: 'flatDamage', value: 8 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: -7 }, { stat: 'res.air', value: 18 }],
    description: ''
}

item.anneau_de_fraktale = {
    id: 'anneau_de_fraktale',
    name: 'Anneau de Fraktale',
    image: 'images/items/Anneau_de_Fraktale.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_fraktale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 120,
    stats: [{ stat: 'maxHp', value: 51 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 9 }, { stat: 'critChance', value: 3 }],
    description: ''
}

item.bague_moutheuze = {
    id: 'bague_moutheuze',
    name: 'Bague Moutheuze',
    image: 'images/items/Bague_Moutheuze.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_moutheuze',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 121,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 7 }, { stat: 'critChance', value: 4 }, { stat: 'res.air', value: 11 }],
    description: ''
}

item.bottes_du_wabbit_garou = {
    id: 'bottes_du_wabbit_garou',
    name: 'Bottes du Wabbit Garou',
    image: 'images/items/Bottes_du_Wabbit_Garou.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_wabbit_garou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 121,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 12 }, { stat: 'critDamagePct', value: 9 }, { stat: 'res.feu', value: 4 }, { stat: 'res.eau', value: 4 }],
    description: ''
}

item.holoune = {
    id: 'holoune',
    name: 'Holoune',
    image: 'images/items/Holoune.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panododo',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 122,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 31 }, { stat: 'critChance', value: 4 }, { stat: 'heal', value: 6 }, { stat: 'res.feu', value: 6 }, { stat: 'res.terre', value: 6 }],
    description: ''
}

item.kask_arc_go = {
    id: 'kask_arc_go',
    name: 'Kask\'Arc Go',
    image: 'images/items/Kask_Arc_Go.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_baveuse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 122,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 57 }, { stat: 'flatDamage', value: 14 }, { stat: 'lifestealPct', value: 2 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 12 }, { stat: 'res.neutre', value: 6 }],
    description: ''
}

item.mourtheau = {
    id: 'mourtheau',
    name: 'Mourtheau',
    image: 'images/items/Mourtheau.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_moutheuze',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 122,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 18 }, { stat: 'critResPct', value: 7 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 11 }, { stat: 'res.terre', value: 11 }],
    description: ''
}

item.ceinture_de_fraktale = {
    id: 'ceinture_de_fraktale',
    name: 'Ceinture de Fraktale',
    image: 'images/items/Ceinture_de_Fraktale.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_fraktale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 122,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 31 }, { stat: 'res.eau', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.anneau_du_wabbit_cephale = {
    id: 'anneau_du_wabbit_cephale',
    name: 'Anneau du Wabbit Céphale',
    image: 'images/items/Anneau_du_Wabbit_Céphale.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_wabbit_cephale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 122,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 36 }, { stat: 'flatDamage', value: 14 }, { stat: 'heal', value: 7 }],
    description: ''
}

item.kaskargo = {
    id: 'kaskargo',
    name: 'Kaskargo',
    image: 'images/items/Kaskargo.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_baveuse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 123,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 3 }, { stat: 'res.feu', value: 6 }, { stat: 'res.eau', value: 6 }, { stat: 'res.terre', value: 6 }, { stat: 'res.air', value: 6 }, { stat: 'res.neutre', value: 6 }],
    description: ''
}

item.bottes_xelomorphes = {
    id: 'bottes_xelomorphes',
    name: 'Bottes Xélomorphes',
    image: 'images/items/Bottes_Xélomorphes.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_xelomorphe',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 123,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 32 }, { stat: 'spd', value: 36 }, { stat: 'flatDamage', value: 8 }, { stat: 'heal', value: 5 }, { stat: 'dropRate', value: 2 }],
    description: ''
}

item.marteau_du_dragoeuf = {
    id: 'marteau_du_dragoeuf',
    name: 'Marteau du Dragoeuf',
    image: 'images/items/Marteau_du_Dragoeuf.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_dragoeuf_cuirasse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 123,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 27 }, { stat: 'critChance', value: 3 }, { stat: 'heal', value: 5 }, { stat: 'lifestealPct', value: 3 }, { stat: 'res.eau', value: 3 }, { stat: 'res.air', value: 3 }],
    description: ''
}

item.ceinture_du_wabbit_garou = {
    id: 'ceinture_du_wabbit_garou',
    name: 'Ceinture du Wabbit Garou',
    image: 'images/items/Ceinture_du_Wabbit_Garou.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_wabbit_garou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 123,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 8 }, { stat: 'critDamagePct', value: 7 }, { stat: 'res.eau', value: 4 }],
    description: ''
}

item.couteau_de_mer = {
    id: 'couteau_de_mer',
    name: 'Couteau de Mer',
    image: 'images/items/Couteau_de_Mer.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_autochtone',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 124,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 17 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 5 }, { stat: 'lifestealPct', value: 5 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 11 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.cape_mouthante = {
    id: 'cape_mouthante',
    name: 'Cape Mouthante',
    image: 'images/items/Cape_Mouthante.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_moutheuze',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 124,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 15 }, { stat: 'flatDamage', value: 22 }, { stat: 'dropRate', value: 1 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.coiffe_de_fraktale = {
    id: 'coiffe_de_fraktale',
    name: 'Coiffe de Fraktale',
    image: 'images/items/Coiffe_de_Fraktale.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_fraktale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 124,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 21 }, { stat: 'res.eau', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.amulette_du_dragoeuf = {
    id: 'amulette_du_dragoeuf',
    name: 'Amulette du Dragoeuf',
    image: 'images/items/Amulette_du_Dragoeuf.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_dragoeuf_vagabond',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 124,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 87 }, { stat: 'spd', value: 16 }, { stat: 'critDamagePct', value: 7 }, { stat: 'res.eau', value: 6 }, { stat: 'res.terre', value: 3 }],
    description: ''
}

item.baguette_du_dragoeuf = {
    id: 'baguette_du_dragoeuf',
    name: 'Baguette du Dragoeuf',
    image: 'images/items/Baguette_du_Dragoeuf.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_dragoeuf_vagabond',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 124,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 6 }, { stat: 'heal', value: 4 }, { stat: 'lifestealPct', value: 5 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 6 }, { stat: 'res.eau', value: 6 }, { stat: 'res.neutre', value: 3 }],
    description: ''
}

item.baton_du_dragoeuf = {
    id: 'baton_du_dragoeuf',
    name: 'Bâton du Dragoeuf',
    image: 'images/items/Bâton_du_Dragoeuf.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_dragoeuf_vagabond',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 124,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 16 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 28 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 4 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.geta_ankarton = {
    id: 'geta_ankarton',
    name: 'Geta Ankarton',
    image: 'images/items/Geta_Ankarton.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_ankarton',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 125,
    stats: [],
    description: ''
}

item.cape_xelomorphe = {
    id: 'cape_xelomorphe',
    name: 'Cape Xélomorphe',
    image: 'images/items/Cape_Xélomorphe.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_xelomorphe',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 125,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 52 }, { stat: 'flatDamage', value: 10 }, { stat: 'heal', value: 7 }, { stat: 'dropRate', value: 2 }],
    description: ''
}

item.nenuphar_de_nenufor = {
    id: 'nenuphar_de_nenufor',
    name: 'Nénuphar de Nenufor',
    image: 'images/items/Nénuphar_de_Nenufor.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_nenufor_tilotus',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 125,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 15 }, { stat: 'heal', value: 5 }, { stat: 'res.eau', value: 5 }],
    description: ''
}

item.cape_dragoeuf = {
    id: 'cape_dragoeuf',
    name: 'Cape Dragoeuf',
    image: 'images/items/Cape_Dragoeuf.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_dragoeuf_cuirasse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 125,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 33 }, { stat: 'critChance', value: 3 }, { stat: 'critResPct', value: 11 }],
    description: ''
}

item.ceinture_du_meulou = {
    id: 'ceinture_du_meulou',
    name: 'Ceinture du Meulou',
    image: 'images/items/Ceinture_du_Meulou.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_meulou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 125,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 3 }, { stat: 'res.air', value: -4 }, { stat: 'res.neutre', value: 3 }],
    description: ''
}

item.coiffe_du_royalmouth = {
    id: 'coiffe_du_royalmouth',
    name: 'Coiffe du Royalmouth',
    image: 'images/items/Coiffe_du_Royalmouth.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_royalmouth',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 125,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 45 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.ceinture_claire_en_abrakleur = {
    id: 'ceinture_claire_en_abrakleur',
    name: 'Ceinture Claire en Abrakleur',
    image: 'images/items/Ceinture_Claire_en_Abrakleur.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_claire',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 126,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 37 }, { stat: 'spd', value: 21 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 6 }, { stat: 'res.neutre', value: 6 }],
    description: ''
}

item.bottes_croquantes = {
    id: 'bottes_croquantes',
    name: 'Bottes Croquantes',
    image: 'images/items/Bottes_Croquantes.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_croquante',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 126,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 73 }, { stat: 'spd', value: 36 }, { stat: 'flatDamage', value: 4 }, { stat: 'dropRate', value: 2 }],
    description: ''
}

item.nun_charang = {
    id: 'nun_charang',
    name: 'Nun-Charang',
    image: 'images/items/Nun-Charang.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_kozaru',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 126,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 12 }, { stat: 'critDamagePct', value: 4 }, { stat: 'heal', value: 6 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 7 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.kwarapace = {
    id: 'kwarapace',
    name: 'Kwarapace',
    image: 'images/items/Kwarapace.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_kwapa',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 126,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 3 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 4 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.masque_de_l_abrakleur_sombre = {
    id: 'masque_de_l_abrakleur_sombre',
    name: 'Masque de l\'Abrakleur sombre',
    image: 'images/items/Masque_de_l_Abrakleur_sombre.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_sombre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 126,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 2 }, { stat: 'heal', value: 3 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 4 }],
    description: ''
}

item.les_casse_noisettes = {
    id: 'les_casse_noisettes',
    name: 'Les Casse-noisettes',
    image: 'images/items/Les_Casse-noisettes.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_tanuki',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 126,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 31 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 3 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.cape_d_ali_grothor = {
    id: 'cape_d_ali_grothor',
    name: 'Cape d\'Ali Grothor',
    image: 'images/items/Cape_d_Ali_Grothor.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_d_ali_grothor',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 126,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'critChance', value: 3 }, { stat: 'critResPct', value: 11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.hache_du_dragoeuf = {
    id: 'hache_du_dragoeuf',
    name: 'Hache du Dragoeuf',
    image: 'images/items/Hache_du_Dragoeuf.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_dragoeuf_cuirasse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 126,
    stats: [{ stat: 'maxHp', value: 91 }, { stat: 'atk', value: 37 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: 3 }, { stat: 'lifestealPct', value: 6 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.ceinture_du_dragoeuf = {
    id: 'ceinture_du_dragoeuf',
    name: 'Ceinture du Dragoeuf',
    image: 'images/items/Ceinture_du_Dragoeuf.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_dragoeuf_vagabond',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 126,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 33 }, { stat: 'critDamagePct', value: 7 }, { stat: 'res.feu', value: 8 }, { stat: 'res.air', value: 8 }],
    description: ''
}

item.anneau_du_meulou = {
    id: 'anneau_du_meulou',
    name: 'Anneau du Meulou',
    image: 'images/items/Anneau_du_Meulou.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_meulou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 126,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 39 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 4 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 5 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.gruchaussures = {
    id: 'gruchaussures',
    name: 'Gruchaussures',
    image: 'images/items/Gruchaussures.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'gruchoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 127,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 46 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 5 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 3 }],
    description: ''
}

item.anneau_moutheur = {
    id: 'anneau_moutheur',
    name: 'Anneau Moutheur',
    image: 'images/items/Anneau_Moutheur.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_moutheuze',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 127,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 7 }, { stat: 'critResPct', value: 7 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 11 }],
    description: ''
}

item.lotus_de_nenufor = {
    id: 'lotus_de_nenufor',
    name: 'Lotus de Nenufor',
    image: 'images/items/Lotus_de_Nenufor.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_de_nenufor_tilotus',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 127,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 26 }, { stat: 'spd', value: 11 }, { stat: 'heal', value: 7 }, { stat: 'res.eau', value: 5 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.casque_de_l_ecumouth = {
    id: 'casque_de_l_ecumouth',
    name: 'Casque de l\'Écumouth',
    image: 'images/items/Casque_de_l_Écumouth.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_des_pins_perdus',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 127,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 14 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.anneau_du_dragoeuf = {
    id: 'anneau_du_dragoeuf',
    name: 'Anneau du Dragoeuf',
    image: 'images/items/Anneau_du_Dragoeuf.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_dragoeuf_cuirasse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 127,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 26 }, { stat: 'spd', value: 16 }, { stat: 'heal', value: 6 }],
    description: ''
}

item.pelle_dragoeuf = {
    id: 'pelle_dragoeuf',
    name: 'Pelle Dragoeuf',
    image: 'images/items/Pelle_Dragoeuf.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_dragoeuf_cuirasse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 127,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 21 }, { stat: 'critDamagePct', value: 11 }, { stat: 'lifestealPct', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 8 }, { stat: 'res.air', value: 8 }],
    description: ''
}

item.epee_du_dragoeuf = {
    id: 'epee_du_dragoeuf',
    name: 'Épée du Dragoeuf',
    image: 'images/items/Épée_du_Dragoeuf.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_dragoeuf_cuirasse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 127,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 37 }, { stat: 'flatDamage', value: 32 }, { stat: 'critDamagePct', value: 6 }, { stat: 'critResPct', value: 5 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 4 }, { stat: 'res.eau', value: 4 }],
    description: ''
}

item.croquasque = {
    id: 'croquasque',
    name: 'Croquasque',
    image: 'images/items/Croquasque.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_croquante',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 128,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 63 }, { stat: 'flatDamage', value: 8 }, { stat: 'res.feu', value: 9 }, { stat: 'res.air', value: 6 }],
    description: ''
}

item.caparavent = {
    id: 'caparavent',
    name: 'Caparavent',
    image: 'images/items/Caparavent.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_kozaru',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 128,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 51 }, { stat: 'flatDamage', value: 3 }, { stat: 'heal', value: 5 }, { stat: 'dropRate', value: 1 }, { stat: 'res.air', value: 7 }, { stat: 'res.neutre', value: 3 }],
    description: ''
}

item.kwaflaque = {
    id: 'kwaflaque',
    name: 'Kwaflaque',
    image: 'images/items/Kwaflaque.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_kwapa',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 128,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 4 }, { stat: 'dropRate', value: 3 }, { stat: 'res.feu', value: 5 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.ceinture_sombre_en_abrakleur = {
    id: 'ceinture_sombre_en_abrakleur',
    name: 'Ceinture sombre en Abrakleur',
    image: 'images/items/Ceinture_sombre_en_Abrakleur.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_sombre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 128,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 3 }, { stat: 'critChance', value: 2 }, { stat: 'heal', value: 4 }, { stat: 'dropRate', value: 1 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.chapeau_kasse = {
    id: 'chapeau_kasse',
    name: 'Chapeau Kassé',
    image: 'images/items/Chapeau_Kassé.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_tanuki',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 128,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 41 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 3 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.ceintruche = {
    id: 'ceintruche',
    name: 'Ceintruche',
    image: 'images/items/Ceintruche.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_truche',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 128,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 41 }, { stat: 'flatDamage', value: 5 }, { stat: 'res.eau', value: 9 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.sombrero_d_el_piko = {
    id: 'sombrero_d_el_piko',
    name: 'Sombrero d\'El Piko',
    image: 'images/items/Sombrero_d_El_Piko.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_d_el_piko',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 128,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 15 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }],
    description: ''
}

item.amulette_de_bouflouth = {
    id: 'amulette_de_bouflouth',
    name: 'Amulette de Bouflouth',
    image: 'images/items/Amulette_de_Bouflouth.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_bouflouth',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 128,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 12 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 1 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.string_fouetteur = {
    id: 'string_fouetteur',
    name: 'String Fouetteur',
    image: 'images/items/String_Fouetteur.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_la_voleuse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 128,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 15 }, { stat: 'flatDamage', value: 55 }],
    description: ''
}

item.ceinture_du_capitaine_ekarlatte = {
    id: 'ceinture_du_capitaine_ekarlatte',
    name: 'Ceinture du Capitaine Ekarlatte',
    image: 'images/items/Ceinture_du_Capitaine_Ekarlatte.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_capitaine_ekarlatte',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 128,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 47 }, { stat: 'flatDamage', value: 25 }, { stat: 'critChance', value: 2 }, { stat: 'res.feu', value: 5 }],
    description: ''
}

item.bottes_du_dragoeuf = {
    id: 'bottes_du_dragoeuf',
    name: 'Bottes du Dragoeuf',
    image: 'images/items/Bottes_du_Dragoeuf.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_dragoeuf_vagabond',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 128,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 21 }, { stat: 'spd', value: 15 }, { stat: 'critChance', value: 4 }, { stat: 'res.eau', value: 2 }, { stat: 'res.terre', value: 6 }, { stat: 'res.neutre', value: 2 }],
    description: ''
}

item.dagues_du_dragoeuf = {
    id: 'dagues_du_dragoeuf',
    name: 'Dagues du Dragoeuf',
    image: 'images/items/Dagues_du_Dragoeuf.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_dragoeuf_vagabond',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 128,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 61 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 2 }, { stat: 'heal', value: 4 }],
    description: ''
}

item.amulette_du_royalmouth = {
    id: 'amulette_du_royalmouth',
    name: 'Amulette du Royalmouth',
    image: 'images/items/Amulette_du_Royalmouth.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_royalmouth',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 128,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 80 }, { stat: 'flatDamage', value: 8 }, { stat: 'critChance', value: 1 }, { stat: 'heal', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.chapeau_de_la_gamine_zoth = {
    id: 'chapeau_de_la_gamine_zoth',
    name: 'Chapeau de la Gamine Zoth',
    image: 'images/items/Chapeau_de_la_Gamine_Zoth.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_zoth_zotheur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 128,
    stats: [{ stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 6 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 12 }, { stat: 'res.neutre', value: 12 }],
    description: ''
}

item.capterre = {
    id: 'capterre',
    name: 'Capterre',
    image: 'images/items/Capterre.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_cacterre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 129,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 15 }, { stat: 'critDamagePct', value: 11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.nenufaur = {
    id: 'nenufaur',
    name: 'Nenufaur',
    image: 'images/items/Nenufaur.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_nenufor_tilotus',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 129,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 63 }, { stat: 'dropRate', value: 2 }],
    description: ''
}

item.anneau_tranchant = {
    id: 'anneau_tranchant',
    name: 'Anneau Tranchant',
    image: 'images/items/Anneau_Tranchant.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_la_voleuse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 129,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 35 }],
    description: ''
}

item.casque_dragoeuf = {
    id: 'casque_dragoeuf',
    name: 'Casque Dragoeuf',
    image: 'images/items/Casque_Dragoeuf.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_dragoeuf_cuirasse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 129,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'res.feu', value: 6 }, { stat: 'res.eau', value: 6 }, { stat: 'res.terre', value: 6 }, { stat: 'res.air', value: 6 }, { stat: 'res.neutre', value: 6 }],
    description: ''
}

item.gruchape = {
    id: 'gruchape',
    name: 'Gruchape',
    image: 'images/items/Gruchape.png',
    type: 'equipment',
    slot: 'cape',
    set: 'gruchoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 5 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }],
    description: ''
}

item.sangle_holon = {
    id: 'sangle_holon',
    name: 'Sangle Holon',
    image: 'images/items/Sangle_Holon.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_altruiste',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [],
    description: ''
}

item.sangle_glinglin = {
    id: 'sangle_glinglin',
    name: 'Sangle Glinglin',
    image: 'images/items/Sangle_Glinglin.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_criminelle',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [],
    description: ''
}

item.sac_a_croquer = {
    id: 'sac_a_croquer',
    name: 'Sac à Croquer',
    image: 'images/items/Sac_à_Croquer.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_croquante',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 73 }, { stat: 'res.feu', value: 4 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.cape_ceremoniale_du_seigneur_des_rats = {
    id: 'cape_ceremoniale_du_seigneur_des_rats',
    name: 'Cape Cérémoniale du Seigneur des Rats',
    image: 'images/items/Cape_Cérémoniale_du_Seigneur_des_Rats.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_ceremoniale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 39 }, { stat: 'flatDamage', value: 4 }, { stat: 'heal', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 9 }, { stat: 'res.air', value: 9 }],
    description: ''
}

item.ceinture_leumant = {
    id: 'ceinture_leumant',
    name: 'Ceinture Leumant',
    image: 'images/items/Ceinture_Leumant.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_enragee',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [],
    description: ''
}

item.sangle_huee = {
    id: 'sangle_huee',
    name: 'Sangle Huée',
    image: 'images/items/Sangle_Huée.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_ethylique',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [],
    description: ''
}

item.sangle_hysserine = {
    id: 'sangle_hysserine',
    name: 'Sangle Hyssérine',
    image: 'images/items/Sangle_Hyssérine.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_explosive',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [],
    description: ''
}

item.sangle_hans = {
    id: 'sangle_hans',
    name: 'Sangle Hans',
    image: 'images/items/Sangle_Hans.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_exsangue',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [],
    description: ''
}

item.gaine_hage = {
    id: 'gaine_hage',
    name: 'Gaine Hage',
    image: 'images/items/Gaine_Hage.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_indestructible',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [],
    description: ''
}

item.ceinture_lupine = {
    id: 'ceinture_lupine',
    name: 'Ceinture Lupine',
    image: 'images/items/Ceinture_Lupine.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_intemporelle',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [],
    description: ''
}

item.collier_de_perlouzes = {
    id: 'collier_de_perlouzes',
    name: 'Collier de perlouzes',
    image: 'images/items/Collier_de_perlouzes.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_kozaru',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 76 }, { stat: 'critDamagePct', value: 5 }, { stat: 'heal', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 7 }, { stat: 'res.neutre', value: 3 }],
    description: ''
}

item.kwache = {
    id: 'kwache',
    name: 'Kwache',
    image: 'images/items/Kwache.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_kwapa',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 29 }, { stat: 'lifestealPct', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 3 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.corde_ure = {
    id: 'corde_ure',
    name: 'Corde Ure',
    image: 'images/items/Corde_Ure.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_lunatique',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [],
    description: ''
}

item.l_elementure = {
    id: 'l_elementure',
    name: 'L\'Élémenture',
    image: 'images/items/L_Élémenture.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_quadramentale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [],
    description: ''
}

item.ceinture_luthe = {
    id: 'ceinture_luthe',
    name: 'Ceinture Luthe',
    image: 'images/items/Ceinture_Luthe.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_sauvage',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [],
    description: ''
}

item.branche_de_l_abrakleur_sombre = {
    id: 'branche_de_l_abrakleur_sombre',
    name: 'Branche de l\'Abrakleur sombre',
    image: 'images/items/Branche_de_l_Abrakleur_sombre.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_sombre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 20 }, { stat: 'heal', value: 4 }, { stat: 'lifestealPct', value: 4 }, { stat: 'res.terre', value: 4 }],
    description: ''
}

item.ceinture_blot = {
    id: 'ceinture_blot',
    name: 'Ceinture Blot',
    image: 'images/items/Ceinture_Blot.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_submersible',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [],
    description: ''
}

item.ceinture_pitude = {
    id: 'ceinture_pitude',
    name: 'Ceinture Pitude',
    image: 'images/items/Ceinture_Pitude.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_tanuki',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 56 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 3 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.ceinture_billonnante = {
    id: 'ceinture_billonnante',
    name: 'Ceinture Billonnante',
    image: 'images/items/Ceinture_Billonnante.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_transcendante',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [],
    description: ''
}

item.anneau_truche = {
    id: 'anneau_truche',
    name: 'Anneau Truche',
    image: 'images/items/Anneau_Truche.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_truche',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 7 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 9 }, { stat: 'res.air', value: 9 }],
    description: ''
}

item.sangle_hynere = {
    id: 'sangle_hynere',
    name: 'Sangle Hynère',
    image: 'images/items/Sangle_Hynère.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_temeraire',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [],
    description: ''
}

item.ceinture_gessant = {
    id: 'ceinture_gessant',
    name: 'Ceinture Gessant',
    image: 'images/items/Ceinture_Gessant.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_venerable',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [],
    description: ''
}

item.anneau_d_el_piko = {
    id: 'anneau_d_el_piko',
    name: 'Anneau d\'El Piko',
    image: 'images/items/Anneau_d_El_Piko.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_d_el_piko',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 12 }],
    description: ''
}

item.ceinture_de_bouflouth = {
    id: 'ceinture_de_bouflouth',
    name: 'Ceinture de Bouflouth',
    image: 'images/items/Ceinture_de_Bouflouth.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_bouflouth',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 12 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 5 }],
    description: ''
}

item.ceinture_buhlent = {
    id: 'ceinture_buhlent',
    name: 'Ceinture Buhlent',
    image: 'images/items/Ceinture_Buhlent.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_gouttiere',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [],
    description: ''
}

item.baudrier_popee = {
    id: 'baudrier_popee',
    name: 'Baudrier Popée',
    image: 'images/items/Baudrier_Popée.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_l_heritage',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [],
    description: ''
}

item.ceinture_bodiezele = {
    id: 'ceinture_bodiezele',
    name: 'Ceinture Bodiézèle',
    image: 'images/items/Ceinture_Bodiézèle.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_l_innombrable',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [],
    description: ''
}

item.coiffe_du_fricochere = {
    id: 'coiffe_du_fricochere',
    name: 'Coiffe du Fricochère',
    image: 'images/items/Coiffe_du_Fricochère.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_des_pins_perdus',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 26 }, { stat: 'flatDamage', value: 13 }, { stat: 'heal', value: 5 }, { stat: 'res.feu', value: 8 }, { stat: 'res.terre', value: 8 }],
    description: ''
}

item.bottes_du_capitaine_ekarlatte = {
    id: 'bottes_du_capitaine_ekarlatte',
    name: 'Bottes du Capitaine Ekarlatte',
    image: 'images/items/Bottes_du_Capitaine_Ekarlatte.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_capitaine_ekarlatte',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 32 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 25 }, { stat: 'critChance', value: 2 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.sangle_cible = {
    id: 'sangle_cible',
    name: 'Sangle Cible',
    image: 'images/items/Sangle_Cible.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_prince_des_voleurs',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [],
    description: ''
}

item.ceinture_du_royalmouth = {
    id: 'ceinture_du_royalmouth',
    name: 'Ceinture du Royalmouth',
    image: 'images/items/Ceinture_du_Royalmouth.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_royalmouth',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 130,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 60 }, { stat: 'flatDamage', value: 12 }, { stat: 'heal', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.eau', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.gruchette = {
    id: 'gruchette',
    name: 'Gruchette',
    image: 'images/items/Gruchette.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'gruchoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 131,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 7 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.cascterre = {
    id: 'cascterre',
    name: 'Cascterre',
    image: 'images/items/Cascterre.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_cacterre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 131,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 15 }, { stat: 'critChance', value: 4 }, { stat: 'res.feu', value: 5 }],
    description: ''
}

item.anneau_ceremonial_du_seigneur_des_rats = {
    id: 'anneau_ceremonial_du_seigneur_des_rats',
    name: 'Anneau Cérémonial du Seigneur des Rats',
    image: 'images/items/Anneau_Cérémonial_du_Seigneur_des_Rats.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_ceremoniale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 131,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 32 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.terre', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.bottes_du_meulou = {
    id: 'bottes_du_meulou',
    name: 'Bottes du Meulou',
    image: 'images/items/Bottes_du_Meulou.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_meulou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 131,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 35 }, { stat: 'spd', value: 26 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 4 }, { stat: 'res.eau', value: 10 }, { stat: 'res.air', value: 10 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.branche_de_l_abrakleur_clair = {
    id: 'branche_de_l_abrakleur_clair',
    name: 'Branche de l\'Abrakleur clair',
    image: 'images/items/Branche_de_l_Abrakleur_clair.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_claire',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 132,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 26 }, { stat: 'flatDamage', value: 14 }, { stat: 'lifestealPct', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 6 }, { stat: 'res.neutre', value: 6 }],
    description: ''
}

item.casque_d_ali_grothor = {
    id: 'casque_d_ali_grothor',
    name: 'Casque d\'Ali Grothor',
    image: 'images/items/Casque_d_Ali_Grothor.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_d_ali_grothor',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 132,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 15 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 7 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.amulette_d_el_piko = {
    id: 'amulette_d_el_piko',
    name: 'Amulette d\'El Piko',
    image: 'images/items/Amulette_d_El_Piko.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_d_el_piko',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 132,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 46 }, { stat: 'res.terre', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.coiffe_de_bouflouth = {
    id: 'coiffe_de_bouflouth',
    name: 'Coiffe de Bouflouth',
    image: 'images/items/Coiffe_de_Bouflouth.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_bouflouth',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 132,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 8 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 1 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.gant_du_capitaine_ekarlatte = {
    id: 'gant_du_capitaine_ekarlatte',
    name: 'Gant du Capitaine Ekarlatte',
    image: 'images/items/Gant_du_Capitaine_Ekarlatte.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_capitaine_ekarlatte',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 132,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 54 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 11 }],
    description: ''
}

item.marteau_de_la_gamine_zoth = {
    id: 'marteau_de_la_gamine_zoth',
    name: 'Marteau de la Gamine Zoth',
    image: 'images/items/Marteau_de_la_Gamine_Zoth.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_zoth_zotheur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 132,
    stats: [{ stat: 'maxHp', value: 91 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 28 }, { stat: 'dropRate', value: 2 }, { stat: 'res.neutre', value: 6 }],
    description: ''
}

item.cacture = {
    id: 'cacture',
    name: 'Cacture',
    image: 'images/items/Cacture.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_cacterre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 133,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 12 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 11 }, { stat: 'dropRate', value: 1 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.ceinture_ceremoniale_du_seigneur_des_rats = {
    id: 'ceinture_ceremoniale_du_seigneur_des_rats',
    name: 'Ceinture Cérémoniale du Seigneur des Rats',
    image: 'images/items/Ceinture_Cérémoniale_du_Seigneur_des_Rats.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_ceremoniale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 133,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 30 }, { stat: 'flatDamage', value: 6 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 11 }, { stat: 'res.neutre', value: 6 }],
    description: ''
}

item.coiffe_ceremoniale_du_seigneur_des_rats = {
    id: 'coiffe_ceremoniale_du_seigneur_des_rats',
    name: 'Coiffe Cérémoniale du Seigneur des Rats',
    image: 'images/items/Coiffe_Cérémoniale_du_Seigneur_des_Rats.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_ceremoniale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 133,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 37 }, { stat: 'flatDamage', value: 4 }, { stat: 'heal', value: 5 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 9 }, { stat: 'res.terre', value: 9 }],
    description: ''
}

item.chapeau_truche = {
    id: 'chapeau_truche',
    name: 'Chapeau Truche',
    image: 'images/items/Chapeau_Truche.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_truche',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 133,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 5 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 4 }, { stat: 'res.terre', value: 4 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.amulette_d_ali_grothor = {
    id: 'amulette_d_ali_grothor',
    name: 'Amulette d\'Ali Grothor',
    image: 'images/items/Amulette_d_Ali_Grothor.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_d_ali_grothor',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 133,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 35 }, { stat: 'spd', value: 31 }, { stat: 'res.eau', value: 7 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.masque_de_panteroz = {
    id: 'masque_de_panteroz',
    name: 'Masque de Pantèroz',
    image: 'images/items/Masque_de_Pantèroz.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_la_voleuse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 133,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'flatDamage', value: 55 }, { stat: 'critChance', value: 4 }],
    description: ''
}

item.masque_de_l_abrakleur_clair = {
    id: 'masque_de_l_abrakleur_clair',
    name: 'Masque de l\'Abrakleur clair',
    image: 'images/items/Masque_de_l_Abrakleur_clair.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_claire',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 134,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 37 }, { stat: 'flatDamage', value: 6 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 6 }, { stat: 'res.air', value: 6 }],
    description: ''
}

item.bottes_ceremoniales_du_seigneur_des_rats = {
    id: 'bottes_ceremoniales_du_seigneur_des_rats',
    name: 'Bottes Cérémoniales du Seigneur des Rats',
    image: 'images/items/Bottes_Cérémoniales_du_Seigneur_des_Rats.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_ceremoniale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 134,
    stats: [{ stat: 'maxHp', value: 121 }, { stat: 'atk', value: 24 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 5 }, { stat: 'heal', value: 5 }, { stat: 'dropRate', value: 1 }, { stat: 'res.terre', value: 4 }, { stat: 'res.neutre', value: 8 }],
    description: ''
}

item.collier_ceremonial_du_seigneur_des_rats = {
    id: 'collier_ceremonial_du_seigneur_des_rats',
    name: 'Collier Cérémonial du Seigneur des Rats',
    image: 'images/items/Collier_Cérémonial_du_Seigneur_des_Rats.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_ceremoniale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 134,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 56 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 6 }, { stat: 'dropRate', value: 2 }, { stat: 'res.neutre', value: 6 }],
    description: ''
}

item.casque_du_guerrier_zoth = {
    id: 'casque_du_guerrier_zoth',
    name: 'Casque du Guerrier Zoth',
    image: 'images/items/Casque_du_Guerrier_Zoth.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_zothicien',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 134,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 61 }, { stat: 'flatDamage', value: 6 }, { stat: 'dropRate', value: 1 }, { stat: 'res.terre', value: 12 }, { stat: 'res.neutre', value: -6 }],
    description: ''
}

item.bottines_en_bois_d_abrakleur = {
    id: 'bottines_en_bois_d_abrakleur',
    name: 'Bottines en bois d\'abrakleur',
    image: 'images/items/Bottines_en_bois_d_abrakleur.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_claire',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 135,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 26 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 6 }, { stat: 'res.eau', value: 12 }, { stat: 'res.neutre', value: 6 }],
    description: ''
}

item.talisman_d_elya_wood = {
    id: 'talisman_d_elya_wood',
    name: 'Talisman d\'Elya Wood',
    image: 'images/items/Talisman_d_Elya_Wood.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_d_elya_wood',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 135,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 46 }, { stat: 'heal', value: 6 }, { stat: 'res.feu', value: 9 }, { stat: 'res.eau', value: 5 }, { stat: 'res.terre', value: 9 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.ceinture_des_demoel = {
    id: 'ceinture_des_demoel',
    name: 'Ceinture des Demoël',
    image: 'images/items/Ceinture_des_Demoël.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_des_demoel',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 135,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 56 }, { stat: 'flatDamage', value: 10 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 7 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.nageanneau = {
    id: 'nageanneau',
    name: 'Nageanneau',
    image: 'images/items/Nageanneau.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_engloutie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 136,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 47 }, { stat: 'flatDamage', value: 10 }, { stat: 'res.feu', value: 5 }, { stat: 'res.terre', value: 10 }],
    description: ''
}

item.alliance_des_firefoux = {
    id: 'alliance_des_firefoux',
    name: 'Alliance des Firefoux',
    image: 'images/items/Alliance_des_Firefoux.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_firefoux',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 136,
    stats: [{ stat: 'maxHp', value: 81 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 3 }, { stat: 'heal', value: 7 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 5 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.tongues_du_dimanche_du_chene_mou = {
    id: 'tongues_du_dimanche_du_chene_mou',
    name: 'Tongues du dimanche du Chêne Mou',
    image: 'images/items/Tongues_du_dimanche_du_Chêne_Mou.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_chene_mou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 136,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 37 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 6 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 4 }, { stat: 'res.terre', value: 4 }, { stat: 'res.neutre', value: 6 }],
    description: ''
}

item.couronne_du_mansot_royal = {
    id: 'couronne_du_mansot_royal',
    name: 'Couronne du Mansot Royal',
    image: 'images/items/Couronne_du_Mansot_Royal.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_mansot_royal',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 136,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 47 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 7 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.bouclier_des_demoel = {
    id: 'bouclier_des_demoel',
    name: 'Bouclier des Demoël',
    image: 'images/items/Bouclier_des_Demoël.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_des_demoel',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 137,
    stats: [{ stat: 'maxHp', value: 31 }, { stat: 'atk', value: 31 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 11 }, { stat: 'res.air', value: 11 }],
    description: ''
}

item.pagniglou = {
    id: 'pagniglou',
    name: 'Pagniglou',
    image: 'images/items/Pagniglou.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_des_pins_perdus',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 137,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 43 }, { stat: 'flatDamage', value: 14 }, { stat: 'dropRate', value: 3 }, { stat: 'res.feu', value: 5 }, { stat: 'res.eau', value: 7 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.poolache = {
    id: 'poolache',
    name: 'Poolache',
    image: 'images/items/Poolache.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_poolay',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 137,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 26 }, { stat: 'flatDamage', value: 28 }, { stat: 'lifestealPct', value: 6 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 6 }, { stat: 'res.terre', value: 6 }],
    description: ''
}

item.bottes_hoktone = {
    id: 'bottes_hoktone',
    name: 'Bottes Hoktone',
    image: 'images/items/Bottes_Hoktone.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_autochtone',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 138,
    stats: [{ stat: 'maxHp', value: 111 }, { stat: 'atk', value: 46 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 14 }, { stat: 'critResPct', value: 7 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.eau', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.coiffe_medusoide = {
    id: 'coiffe_medusoide',
    name: 'Coiffe Médusoïde',
    image: 'images/items/Coiffe_Médusoïde.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_engloutie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 138,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 9 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.ceinture_d_artifices = {
    id: 'ceinture_d_artifices',
    name: 'Ceinture d\'artifices',
    image: 'images/items/Ceinture_d_artifices.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_firefoux',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 138,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 5 }, { stat: 'heal', value: 16 }, { stat: 'dropRate', value: 3 }, { stat: 'res.feu', value: 10 }],
    description: ''
}

item.palmes_de_monsieur_pingouin = {
    id: 'palmes_de_monsieur_pingouin',
    name: 'Palmes de Monsieur Pingouin',
    image: 'images/items/Palmes_de_Monsieur_Pingouin.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_monsieur_pingouin',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 138,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 28 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 16 }, { stat: 'critResPct', value: 7 }, { stat: 'dropRate', value: 1 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.talisman_du_chene_mou = {
    id: 'talisman_du_chene_mou',
    name: 'Talisman du Chêne Mou',
    image: 'images/items/Talisman_du_Chêne_Mou.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_chene_mou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 138,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 61 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 6 }, { stat: 'heal', value: 6 }, { stat: 'dropRate', value: 2 }],
    description: ''
}

item.kalypsoton = {
    id: 'kalypsoton',
    name: 'Kalypsoton',
    image: 'images/items/Kalypsoton.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_engloutie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 139,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 26 }, { stat: 'critChance', value: 3 }, { stat: 'lifestealPct', value: 4 }, { stat: 'res.feu', value: 11 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.epee_des_demoel = {
    id: 'epee_des_demoel',
    name: 'Épée des Demoël',
    image: 'images/items/Épée_des_Demoël.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_des_demoel',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 139,
    stats: [{ stat: 'maxHp', value: 41 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 45 }, { stat: 'critChance', value: 5 }, { stat: 'critDamagePct', value: 11 }, { stat: 'dropRate', value: 2 }],
    description: ''
}

item.anneau_du_chene_mou = {
    id: 'anneau_du_chene_mou',
    name: 'Anneau du Chêne Mou',
    image: 'images/items/Anneau_du_Chêne_Mou.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_chene_mou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 139,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 1 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 4 }, { stat: 'res.terre', value: 4 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.cape_du_meulou = {
    id: 'cape_du_meulou',
    name: 'Cape du Meulou',
    image: 'images/items/Cape_du_Meulou.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_meulou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 139,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 42 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 5 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 6 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.hache_du_guerrier_zoth = {
    id: 'hache_du_guerrier_zoth',
    name: 'Hache du Guerrier Zoth',
    image: 'images/items/Hache_du_Guerrier_Zoth.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_zothicien',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 139,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 35 }, { stat: 'flatDamage', value: 31 }, { stat: 'dropRate', value: 2 }],
    description: ''
}

item.sac_des_firefoux = {
    id: 'sac_des_firefoux',
    name: 'Sac des Firefoux',
    image: 'images/items/Sac_des_Firefoux.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_firefoux',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 140,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 56 }, { stat: 'flatDamage', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 12 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.ceinture_de_frigostine = {
    id: 'ceinture_de_frigostine',
    name: 'Ceinture de Frigostine',
    image: 'images/items/Ceinture_de_Frigostine.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_frigostine',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 140,
    stats: [{ stat: 'maxHp', value: 176 }, { stat: 'atk', value: 63 }, { stat: 'flatDamage', value: 8 }, { stat: 'critChance', value: 3 }, { stat: 'critResPct', value: 7 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 7 }, { stat: 'res.air', value: 11 }],
    description: ''
}

item.sangle_de_monsieur_pingouin = {
    id: 'sangle_de_monsieur_pingouin',
    name: 'Sangle de Monsieur Pingouin',
    image: 'images/items/Sangle_de_Monsieur_Pingouin.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_monsieur_pingouin',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 140,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 28 }, { stat: 'flatDamage', value: 16 }, { stat: 'critResPct', value: 7 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }],
    description: ''
}

item.vieille_branche_du_chene_mou = {
    id: 'vieille_branche_du_chene_mou',
    name: 'Vieille Branche du Chêne Mou',
    image: 'images/items/Vieille_Branche_du_Chêne_Mou.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_chene_mou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 140,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 59 }, { stat: 'critChance', value: 3 }, { stat: 'heal', value: 11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.anneau_du_mansot_royal = {
    id: 'anneau_du_mansot_royal',
    name: 'Anneau du Mansot Royal',
    image: 'images/items/Anneau_du_Mansot_Royal.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_mansot_royal',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 140,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 37 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.air', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.string_automnal_du_chene_mou = {
    id: 'string_automnal_du_chene_mou',
    name: 'String Automnal du Chêne Mou',
    image: 'images/items/String_Automnal_du_Chêne_Mou.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_chene_mou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 141,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 6 }, { stat: 'critChance', value: 3 }, { stat: 'heal', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 6 }, { stat: 'res.neutre', value: 6 }],
    description: ''
}

item.coiffe_du_meulou = {
    id: 'coiffe_du_meulou',
    name: 'Coiffe du Meulou',
    image: 'images/items/Coiffe_du_Meulou.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_meulou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 141,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 32 }, { stat: 'flatDamage', value: 6 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.neutre', value: 3 }],
    description: ''
}

item.masque_de_fojumo = {
    id: 'masque_de_fojumo',
    name: 'Masque de Fojumo',
    image: 'images/items/Masque_de_Fojumo.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_fojumo',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 142,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 56 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 9 }, { stat: 'critResPct', value: 7 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.bottes_de_frigostine = {
    id: 'bottes_de_frigostine',
    name: 'Bottes de Frigostine',
    image: 'images/items/Bottes_de_Frigostine.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_frigostine',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 142,
    stats: [{ stat: 'maxHp', value: 126 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 1 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.mitaine_de_katigrou = {
    id: 'mitaine_de_katigrou',
    name: 'Mitaine de Katigrou',
    image: 'images/items/Mitaine_de_Katigrou.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_katigrou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 142,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 46 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.chaine_de_monsieur_pingouin = {
    id: 'chaine_de_monsieur_pingouin',
    name: 'Chaîne de Monsieur Pingouin',
    image: 'images/items/Chaîne_de_Monsieur_Pingouin.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_monsieur_pingouin',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 142,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 63 }, { stat: 'flatDamage', value: 16 }, { stat: 'critResPct', value: 7 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 5 }],
    description: ''
}

item.cape_usee_du_chene_mou = {
    id: 'cape_usee_du_chene_mou',
    name: 'Cape Usée du Chêne Mou',
    image: 'images/items/Cape_Usée_du_Chêne_Mou.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_chene_mou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 142,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 26 }, { stat: 'flatDamage', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.eau', value: 4 }, { stat: 'res.terre', value: 5 }, { stat: 'res.air', value: 4 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.perruque_du_poolay = {
    id: 'perruque_du_poolay',
    name: 'Perruque du Poolay',
    image: 'images/items/Perruque_du_Poolay.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_poolay',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 142,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 36 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 6 }, { stat: 'res.air', value: 6 }],
    description: ''
}

item.la_meulette = {
    id: 'la_meulette',
    name: 'La Meulette',
    image: 'images/items/La_Meulette.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_meulou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 143,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 72 }, { stat: 'flatDamage', value: 2 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 6 }, { stat: 'res.air', value: 6 }],
    description: ''
}

item.nageoiture = {
    id: 'nageoiture',
    name: 'Nageoiture',
    image: 'images/items/Nageoiture.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_engloutie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 144,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 26 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.terre', value: 9 }],
    description: ''
}

item.geta_de_fojumo = {
    id: 'geta_de_fojumo',
    name: 'Geta de Fojumo',
    image: 'images/items/Geta_de_Fojumo.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_fojumo',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 144,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 51 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 7 }, { stat: 'dropRate', value: 3 }, { stat: 'res.feu', value: 5 }],
    description: ''
}

item.anneau_de_frigostine = {
    id: 'anneau_de_frigostine',
    name: 'Anneau de Frigostine',
    image: 'images/items/Anneau_de_Frigostine.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_frigostine',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 144,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 15 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 4 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.cape_de_katigrou = {
    id: 'cape_de_katigrou',
    name: 'Cape de Katigrou',
    image: 'images/items/Cape_de_Katigrou.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_katigrou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 144,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 41 }, { stat: 'critChance', value: 7 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.cape_du_mansot_royal = {
    id: 'cape_du_mansot_royal',
    name: 'Cape du Mansot Royal',
    image: 'images/items/Cape_du_Mansot_Royal.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_mansot_royal',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 144,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 14 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 5 }, { stat: 'res.terre', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.coiffe_du_chene_mou = {
    id: 'coiffe_du_chene_mou',
    name: 'Coiffe du Chêne Mou',
    image: 'images/items/Coiffe_du_Chêne_Mou.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_chene_mou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 145,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 42 }, { stat: 'flatDamage', value: 6 }, { stat: 'critChance', value: 4 }, { stat: 'heal', value: 4 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 4 }, { stat: 'res.terre', value: 4 }],
    description: ''
}

item.alliance_d_hell_mina = {
    id: 'alliance_d_hell_mina',
    name: 'Alliance d\'Hell Mina',
    image: 'images/items/Alliance_d_Hell_Mina.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_d_hell_mina',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 146,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 53 }, { stat: 'flatDamage', value: 7 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.epee_de_fojumo = {
    id: 'epee_de_fojumo',
    name: 'Épée de Fojumo',
    image: 'images/items/Épée_de_Fojumo.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_fojumo',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 146,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 45 }, { stat: 'critDamagePct', value: 7 }, { stat: 'dropRate', value: 1 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.pattes_de_katigrou = {
    id: 'pattes_de_katigrou',
    name: 'Pattes de Katigrou',
    image: 'images/items/Pattes_de_Katigrou.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_katigrou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 146,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 15 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.anneau_poli_de_malter = {
    id: 'anneau_poli_de_malter',
    name: 'Anneau poli de Malter',
    image: 'images/items/Anneau_poli_de_Malter.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_des_malters',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 146,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 15 }, { stat: 'heal', value: 7 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.cape_du_pere_phorreur = {
    id: 'cape_du_pere_phorreur',
    name: 'Cape du Père Phorreur',
    image: 'images/items/Cape_du_Père_Phorreur.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_pere_phorreur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 146,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 3 }, { stat: 'critResPct', value: 7 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.ceinture_phossile = {
    id: 'ceinture_phossile',
    name: 'Ceinture Phossile',
    image: 'images/items/Ceinture_Phossile.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_phossile',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 147,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 30 }, { stat: 'res.terre', value: 4 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.amulette_de_frigostine = {
    id: 'amulette_de_frigostine',
    name: 'Amulette de Frigostine',
    image: 'images/items/Amulette_de_Frigostine.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_frigostine',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 147,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 82 }, { stat: 'flatDamage', value: 29 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 8 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.ceinture_bitoufale_de_prosper_youpla = {
    id: 'ceinture_bitoufale_de_prosper_youpla',
    name: 'Ceinture Bitoufale de Prosper Youpla',
    image: 'images/items/Ceinture_Bitoufale_de_Prosper_Youpla.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_bitoufale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 148,
    stats: [{ stat: 'atk', value: 31 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 1 }, { stat: 'heal', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 6 }, { stat: 'res.air', value: 6 }, { stat: 'res.neutre', value: 6 }],
    description: ''
}

item.cape_d_hell_mina = {
    id: 'cape_d_hell_mina',
    name: 'Cape d\'Hell Mina',
    image: 'images/items/Cape_d_Hell_Mina.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_d_hell_mina',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 148,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 78 }, { stat: 'spd', value: 26 }, { stat: 'flatDamage', value: 8 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.bottes_crepitantes_de_malter = {
    id: 'bottes_crepitantes_de_malter',
    name: 'Bottes Crépitantes de Malter',
    image: 'images/items/Bottes_Crépitantes_de_Malter.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_des_malters',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 148,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'spd', value: 15 }, { stat: 'heal', value: 16 }, { stat: 'res.feu', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.cape_phossile = {
    id: 'cape_phossile',
    name: 'Cape Phossile',
    image: 'images/items/Cape_Phossile.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_phossile',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 149,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 31 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 9 }, { stat: 'dropRate', value: 3 }, { stat: 'res.feu', value: 7 }, { stat: 'res.terre', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.baguette_de_frigostine = {
    id: 'baguette_de_frigostine',
    name: 'Baguette de Frigostine',
    image: 'images/items/Baguette_de_Frigostine.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_frigostine',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 149,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 42 }, { stat: 'flatDamage', value: 35 }, { stat: 'critResPct', value: 7 }, { stat: 'heal', value: 5 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.bracelet_du_minotot = {
    id: 'bracelet_du_minotot',
    name: 'Bracelet du Minotot',
    image: 'images/items/Bracelet_du_Minotot.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_minotot',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 149,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 32 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 4 }, { stat: 'heal', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 4 }, { stat: 'res.eau', value: 4 }, { stat: 'res.terre', value: 4 }],
    description: ''
}

item.ceinture_du_minotot = {
    id: 'ceinture_du_minotot',
    name: 'Ceinture du Minotot',
    image: 'images/items/Ceinture_du_Minotot.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_minotot',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 149,
    stats: [{ stat: 'maxHp', value: 181 }, { stat: 'atk', value: 42 }, { stat: 'heal', value: 5 }, { stat: 'dropRate', value: 3 }, { stat: 'res.terre', value: 4 }, { stat: 'res.air', value: 4 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.anneau_zamour = {
    id: 'anneau_zamour',
    name: 'Anneau Zamour',
    image: 'images/items/Anneau_Zamour.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_altruiste',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 150,
    stats: [],
    description: ''
}

item.ceinture_du_meulou_ankarton = {
    id: 'ceinture_du_meulou_ankarton',
    name: 'Ceinture du Meulou Ankarton',
    image: 'images/items/Ceinture_du_Meulou_Ankarton.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_ankarton',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 150,
    stats: [],
    description: ''
}

item.mandrano = {
    id: 'mandrano',
    name: 'Mandrano',
    image: 'images/items/Mandrano.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_contrebandiere',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 150,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 26 }, { stat: 'flatDamage', value: 7 }, { stat: 'critChance', value: 2 }, { stat: 'res.terre', value: 18 }, { stat: 'res.air', value: -7 }],
    description: ''
}

item.anneau_hell = {
    id: 'anneau_hell',
    name: 'Anneau Hell',
    image: 'images/items/Anneau_Hell.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_criminelle',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 150,
    stats: [],
    description: ''
}

item.anneau_nos = {
    id: 'anneau_nos',
    name: 'Anneau Nos',
    image: 'images/items/Anneau_Nos.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_enragee',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 150,
    stats: [],
    description: ''
}

item.anneau_raille = {
    id: 'anneau_raille',
    name: 'Anneau Raille',
    image: 'images/items/Anneau_Raille.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_ethylique',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 150,
    stats: [],
    description: ''
}

item.mitaine_aibre = {
    id: 'mitaine_aibre',
    name: 'Mitaine Aibre',
    image: 'images/items/Mitaine_Aibre.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_explosive',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 150,
    stats: [],
    description: ''
}

item.anneau_pitale = {
    id: 'anneau_pitale',
    name: 'Anneau Pitale',
    image: 'images/items/Anneau_Pitale.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_exsangue',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 150,
    stats: [],
    description: ''
}

item.styxano = {
    id: 'styxano',
    name: 'Styxano',
    image: 'images/items/Styxano.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_fluviale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 150,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 26 }, { stat: 'flatDamage', value: 7 }, { stat: 'critChance', value: 2 }, { stat: 'res.feu', value: -7 }, { stat: 'res.eau', value: 18 }],
    description: ''
}

item.anneau_tassion = {
    id: 'anneau_tassion',
    name: 'Anneau Tassion',
    image: 'images/items/Anneau_Tassion.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_indestructible',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 150,
    stats: [],
    description: ''
}

item.infernano = {
    id: 'infernano',
    name: 'Infernano',
    image: 'images/items/Infernano.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_infernale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 150,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 26 }, { stat: 'flatDamage', value: 7 }, { stat: 'critChance', value: 2 }, { stat: 'res.feu', value: 18 }, { stat: 'res.eau', value: -7 }],
    description: ''
}

item.anneau_tilus = {
    id: 'anneau_tilus',
    name: 'Anneau Tilus',
    image: 'images/items/Anneau_Tilus.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_intemporelle',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 150,
    stats: [],
    description: ''
}

item.bracelet_jande = {
    id: 'bracelet_jande',
    name: 'Bracelet Jande',
    image: 'images/items/Bracelet_Jande.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_lunatique',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 150,
    stats: [],
    description: ''
}

item.willkillsano = {
    id: 'willkillsano',
    name: 'Willkillsano',
    image: 'images/items/Willkillsano.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_meurtriere',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 150,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 26 }, { stat: 'flatDamage', value: 7 }, { stat: 'critChance', value: 2 }, { stat: 'res.terre', value: -7 }, { stat: 'res.air', value: 18 }],
    description: ''
}

item.anneau_riginel = {
    id: 'anneau_riginel',
    name: 'Anneau Riginel',
    image: 'images/items/Anneau_Riginel.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_quadramentale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 150,
    stats: [],
    description: ''
}

item.anneau_pwal = {
    id: 'anneau_pwal',
    name: 'Anneau Pwal',
    image: 'images/items/Anneau_Pwal.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_sauvage',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 150,
    stats: [],
    description: ''
}

item.steamanneau_maitre = {
    id: 'steamanneau_maitre',
    name: 'Steamanneau Maître',
    image: 'images/items/Steamanneau_Maître.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_submersible',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 150,
    stats: [],
    description: ''
}

item.anneau_vae = {
    id: 'anneau_vae',
    name: 'Anneau Vae',
    image: 'images/items/Anneau_Vae.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_transcendante',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 150,
    stats: [],
    description: ''
}

item.bague_harre = {
    id: 'bague_harre',
    name: 'Bague Harre',
    image: 'images/items/Bague_Harre.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_temeraire',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 150,
    stats: [],
    description: ''
}

item.anneau_stalgik = {
    id: 'anneau_stalgik',
    name: 'Anneau Stalgik',
    image: 'images/items/Anneau_Stalgik.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_venerable',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 150,
    stats: [],
    description: ''
}

item.pertuisane_d_hell_mina = {
    id: 'pertuisane_d_hell_mina',
    name: 'Pertuisane d\'Hell Mina',
    image: 'images/items/Pertuisane_d_Hell_Mina.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_d_hell_mina',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 150,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 83 }, { stat: 'flatDamage', value: 23 }, { stat: 'lifestealPct', value: 4 }, { stat: 'res.feu', value: 7 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.bague_houx = {
    id: 'bague_houx',
    name: 'Bague Houx',
    image: 'images/items/Bague_Houx.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_gouttiere',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 150,
    stats: [],
    description: ''
}

item.baton_de_zatoishwan = {
    id: 'baton_de_zatoishwan',
    name: 'Bâton de Zatoïshwan',
    image: 'images/items/Bâton_de_Zatoïshwan.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_zatoishwan',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 150,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 47 }, { stat: 'critDamagePct', value: 7 }, { stat: 'res.feu', value: 8 }, { stat: 'res.air', value: 8 }],
    description: ''
}

item.gants_tologie = {
    id: 'gants_tologie',
    name: 'Gants Tologie',
    image: 'images/items/Gants_Tologie.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_l_heritage',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 150,
    stats: [],
    description: ''
}

item.bague_hera = {
    id: 'bague_hera',
    name: 'Bague Héra',
    image: 'images/items/Bague_Héra.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_l_innombrable',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 150,
    stats: [],
    description: ''
}

item.faux_enracinee_de_malter = {
    id: 'faux_enracinee_de_malter',
    name: 'Faux Enracinée de Malter',
    image: 'images/items/Faux_Enracinée_de_Malter.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_des_malters',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 150,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'spd', value: 26 }, { stat: 'heal', value: 49 }, { stat: 'res.eau', value: 5 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.bottes_du_nowel_cauchemardesque = {
    id: 'bottes_du_nowel_cauchemardesque',
    name: 'Bottes du Nowel Cauchemardesque',
    image: 'images/items/Bottes_du_Nowel_Cauchemardesque.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_nowel_cauchemardesque',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 150,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 46 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 7 }, { stat: 'res.air', value: 14 }],
    description: ''
}

item.cape_du_nowel_cauchemardesque = {
    id: 'cape_du_nowel_cauchemardesque',
    name: 'Cape du Nowel Cauchemardesque',
    image: 'images/items/Cape_du_Nowel_Cauchemardesque.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_nowel_cauchemardesque',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 150,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 11 }, { stat: 'critResPct', value: 7 }, { stat: 'heal', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 7 }, { stat: 'res.terre', value: 14 }],
    description: ''
}

item.masque_du_nowel_cauchemardesque = {
    id: 'masque_du_nowel_cauchemardesque',
    name: 'Masque du Nowel Cauchemardesque',
    image: 'images/items/Masque_du_Nowel_Cauchemardesque.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_nowel_cauchemardesque',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 150,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 11 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 14 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.porte_malheur_du_nowel_cauchemardesque = {
    id: 'porte_malheur_du_nowel_cauchemardesque',
    name: 'Porte-Malheur du Nowel Cauchemardesque',
    image: 'images/items/Porte-Malheur_du_Nowel_Cauchemardesque.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_nowel_cauchemardesque',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 150,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 80 }, { stat: 'flatDamage', value: 11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.eau', value: 14 }],
    description: ''
}

item.anneau_bhli = {
    id: 'anneau_bhli',
    name: 'Anneau Bhli',
    image: 'images/items/Anneau_Bhli.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_prince_des_voleurs',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 150,
    stats: [],
    description: ''
}

item.bottes_phossiles = {
    id: 'bottes_phossiles',
    name: 'Bottes Phossiles',
    image: 'images/items/Bottes_Phossiles.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_phossile',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 151,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 20 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 9 }],
    description: ''
}

item.amulette_de_grozilla = {
    id: 'amulette_de_grozilla',
    name: 'Amulette de Grozilla',
    image: 'images/items/Amulette_de_Grozilla.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_grozilla',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 151,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 81 }, { stat: 'flatDamage', value: 16 }, { stat: 'critResPct', value: 7 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 11 }, { stat: 'res.terre', value: 11 }],
    description: ''
}

item.sceptre_du_minotot = {
    id: 'sceptre_du_minotot',
    name: 'Sceptre du Minotot',
    image: 'images/items/Sceptre_du_Minotot.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_minotot',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 151,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 13 }, { stat: 'heal', value: 4 }, { stat: 'lifestealPct', value: 6 }, { stat: 'dropRate', value: 3 }, { stat: 'res.eau', value: 8 }],
    description: ''
}

item.cape_souveraine_du_roissingue = {
    id: 'cape_souveraine_du_roissingue',
    name: 'Cape Souveraine du Roissingue',
    image: 'images/items/Cape_Souveraine_du_Roissingue.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_souveraine',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 152,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 36 }, { stat: 'flatDamage', value: 5 }, { stat: 'critChance', value: 1 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 6 }, { stat: 'res.eau', value: 6 }, { stat: 'res.neutre', value: 6 }],
    description: ''
}

item.slip_hie = {
    id: 'slip_hie',
    name: 'Slip Hie',
    image: 'images/items/Slip_Hie.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_yeye',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 152,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 42 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 10 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.eau', value: 5 }],
    description: ''
}

item.sabre_de_ben_le_ripate = {
    id: 'sabre_de_ben_le_ripate',
    name: 'Sabre de Ben le Ripate',
    image: 'images/items/Sabre_de_Ben_le_Ripate.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_ben_le_ripate',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 152,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 47 }, { stat: 'flatDamage', value: 35 }, { stat: 'critResPct', value: 7 }, { stat: 'lifestealPct', value: 2 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 5 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.amulette_du_pere_phorreur = {
    id: 'amulette_du_pere_phorreur',
    name: 'Amulette du Père Phorreur',
    image: 'images/items/Amulette_du_Père_Phorreur.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_pere_phorreur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 152,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 3 }, { stat: 'res.feu', value: 5 }],
    description: ''
}

item.anneau_de_cantile = {
    id: 'anneau_de_cantile',
    name: 'Anneau de Cantile',
    image: 'images/items/Anneau_de_Cantile.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_cantile',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 153,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 26 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 15 }, { stat: 'critChance', value: 2 }, { stat: 'critResPct', value: 8 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.cape_de_cantile = {
    id: 'cape_de_cantile',
    name: 'Cape de Cantile',
    image: 'images/items/Cape_de_Cantile.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_cantile',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 153,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 21 }, { stat: 'critChance', value: 1 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.eau', value: 7 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.bracelet_de_fantomayte = {
    id: 'bracelet_de_fantomayte',
    name: 'Bracelet de Fantômayte',
    image: 'images/items/Bracelet_de_Fantômayte.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_fantomayte',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 153,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 36 }, { stat: 'flatDamage', value: 25 }],
    description: ''
}

item.ceinture_de_zatoishwan = {
    id: 'ceinture_de_zatoishwan',
    name: 'Ceinture de Zatoïshwan',
    image: 'images/items/Ceinture_de_Zatoïshwan.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_zatoishwan',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 153,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 19 }, { stat: 'critChance', value: 3 }, { stat: 'res.feu', value: 12 }],
    description: ''
}

item.ceinture_du_frelon_noir = {
    id: 'ceinture_du_frelon_noir',
    name: 'Ceinture du Frelon Noir',
    image: 'images/items/Ceinture_du_Frelon_Noir.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_frelon_noir',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 153,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.hache_du_fancrome = {
    id: 'hache_du_fancrome',
    name: 'Hache du Fancrôme',
    image: 'images/items/Hache_du_Fancrôme.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_grolandais',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 153,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 36 }, { stat: 'critChance', value: 4 }, { stat: 'critResPct', value: 7 }, { stat: 'lifestealPct', value: 5 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 5 }, { stat: 'res.terre', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.casque_du_bitouf_aerien = {
    id: 'casque_du_bitouf_aerien',
    name: 'Casque du Bitouf Aérien',
    image: 'images/items/Casque_du_Bitouf_Aérien.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_bitoufale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 154,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 5 }, { stat: 'heal', value: 5 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 4 }, { stat: 'res.eau', value: 4 }, { stat: 'res.terre', value: 4 }, { stat: 'res.air', value: 4 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.chapeau_de_ben_le_ripate = {
    id: 'chapeau_de_ben_le_ripate',
    name: 'Chapeau de Ben le Ripate',
    image: 'images/items/Chapeau_de_Ben_le_Ripate.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_ben_le_ripate',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 154,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 57 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 3 }, { stat: 'critResPct', value: 7 }, { stat: 'heal', value: 5 }, { stat: 'res.eau', value: 7 }, { stat: 'res.terre', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.sac_mortuaire_de_jiangshi_nobi = {
    id: 'sac_mortuaire_de_jiangshi_nobi',
    name: 'Sac mortuaire de Jiangshi-Nobi',
    image: 'images/items/Sac_mortuaire_de_Jiangshi-Nobi.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_brume',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 154,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 38 }, { stat: 'flatDamage', value: 25 }, { stat: 'critChance', value: -10 }, { stat: 'dropRate', value: 3 }, { stat: 'res.feu', value: 4 }],
    description: ''
}

item.coiffe_de_grozilla = {
    id: 'coiffe_de_grozilla',
    name: 'Coiffe de Grozilla',
    image: 'images/items/Coiffe_de_Grozilla.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_grozilla',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 154,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 68 }, { stat: 'flatDamage', value: 12 }, { stat: 'critChance', value: 1 }, { stat: 'dropRate', value: 3 }, { stat: 'res.terre', value: 11 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.barbe_de_zatoishwan = {
    id: 'barbe_de_zatoishwan',
    name: 'Barbe de Zatoïshwan',
    image: 'images/items/Barbe_de_Zatoïshwan.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_zatoishwan',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 154,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 15 }, { stat: 'critChance', value: 3 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.lance_du_harpirate = {
    id: 'lance_du_harpirate',
    name: 'Lance du Harpirate',
    image: 'images/items/Lance_du_Harpirate.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_harpirate',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 154,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 45 }, { stat: 'spd', value: 16 }, { stat: 'flatDamage', value: 44 }, { stat: 'heal', value: 5 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.ceinture_du_pere_phorreur = {
    id: 'ceinture_du_pere_phorreur',
    name: 'Ceinture du Père Phorreur',
    image: 'images/items/Ceinture_du_Père_Phorreur.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_pere_phorreur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 154,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 3 }, { stat: 'res.terre', value: 7 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.crochet_de_ben_le_ripate = {
    id: 'crochet_de_ben_le_ripate',
    name: 'Crochet de Ben le Ripate',
    image: 'images/items/Crochet_de_Ben_le_Ripate.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_ben_le_ripate',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 155,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 26 }, { stat: 'flatDamage', value: 10 }, { stat: 'critChance', value: 3 }, { stat: 'critResPct', value: 7 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.bouclier_du_yokomainu = {
    id: 'bouclier_du_yokomainu',
    name: 'Bouclier du Yokomaïnu',
    image: 'images/items/Bouclier_du_Yokomaïnu.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_de_brume',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 155,
    stats: [{ stat: 'maxHp', value: 111 }, { stat: 'atk', value: 26 }, { stat: 'res.feu', value: 3 }, { stat: 'res.eau', value: 3 }, { stat: 'res.terre', value: 3 }, { stat: 'res.neutre', value: 3 }],
    description: ''
}

item.voile_de_fantomayte = {
    id: 'voile_de_fantomayte',
    name: 'Voile de Fantômayte',
    image: 'images/items/Voile_de_Fantômayte.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_fantomayte',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 155,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 71 }, { stat: 'flatDamage', value: 20 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 3 }, { stat: 'res.terre', value: 3 }],
    description: ''
}

item.bottes_de_grozilla = {
    id: 'bottes_de_grozilla',
    name: 'Bottes de Grozilla',
    image: 'images/items/Bottes_de_Grozilla.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_grozilla',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 155,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 4 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.bandeau_de_spiritueur = {
    id: 'bandeau_de_spiritueur',
    name: 'Bandeau de Spiritueur',
    image: 'images/items/Bandeau_de_Spiritueur.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_des_spiritueurs',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 155,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 46 }, { stat: 'spd', value: -20 }, { stat: 'flatDamage', value: 20 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 7 }, { stat: 'res.feu', value: 4 }],
    description: ''
}

item.masque_du_harpirate = {
    id: 'masque_du_harpirate',
    name: 'Masque du Harpirate',
    image: 'images/items/Masque_du_Harpirate.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_harpirate',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 155,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'critResPct', value: 11 }, { stat: 'res.feu', value: 11 }, { stat: 'res.eau', value: 11 }, { stat: 'res.terre', value: 11 }, { stat: 'res.air', value: 11 }, { stat: 'res.neutre', value: 11 }],
    description: ''
}

item.bottes_de_brume = {
    id: 'bottes_de_brume',
    name: 'Bottes de Brume',
    image: 'images/items/Bottes_de_Brume.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_brume',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 156,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 28 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: -10 }, { stat: 'dropRate', value: 4 }, { stat: 'res.terre', value: 3 }],
    description: ''
}

item.amulette_de_cantile = {
    id: 'amulette_de_cantile',
    name: 'Amulette de Cantile',
    image: 'images/items/Amulette_de_Cantile.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_cantile',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 156,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 81 }, { stat: 'flatDamage', value: 24 }, { stat: 'critChance', value: 1 }, { stat: 'dropRate', value: 2 }, { stat: 'res.neutre', value: 11 }],
    description: ''
}

item.bottes_de_cantile = {
    id: 'bottes_de_cantile',
    name: 'Bottes de Cantile',
    image: 'images/items/Bottes_de_Cantile.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_cantile',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 156,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 57 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 21 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.masque_du_frelon_noir = {
    id: 'masque_du_frelon_noir',
    name: 'Masque du Frelon Noir',
    image: 'images/items/Masque_du_Frelon_Noir.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_frelon_noir',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 156,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 16 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 21 }, { stat: 'critResPct', value: 11 }, { stat: 'dropRate', value: 3 }, { stat: 'res.eau', value: 6 }],
    description: ''
}

item.fantomasque = {
    id: 'fantomasque',
    name: 'Fantômasque',
    image: 'images/items/Fantômasque.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_grolandais',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 156,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 32 }, { stat: 'flatDamage', value: 26 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.marteau_de_la_vigie_pirate = {
    id: 'marteau_de_la_vigie_pirate',
    name: 'Marteau de la Vigie Pirate',
    image: 'images/items/Marteau_de_la_Vigie_Pirate.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_grolandais',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 156,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 47 }, { stat: 'flatDamage', value: 39 }, { stat: 'lifestealPct', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 7 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.cape_du_minotot = {
    id: 'cape_du_minotot',
    name: 'Cape du Minotot',
    image: 'images/items/Cape_du_Minotot.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_minotot',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 156,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 6 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 3 }],
    description: ''
}

item.coiffe_du_maitre_zoth = {
    id: 'coiffe_du_maitre_zoth',
    name: 'Coiffe du Maître Zoth',
    image: 'images/items/Coiffe_du_Maître_Zoth.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_zothuliste',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 156,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 6 }, { stat: 'critChance', value: 4 }, { stat: 'heal', value: 6 }, { stat: 'dropRate', value: 3 }],
    description: ''
}

item.ceinture_de_ben_le_ripate = {
    id: 'ceinture_de_ben_le_ripate',
    name: 'Ceinture de Ben le Ripate',
    image: 'images/items/Ceinture_de_Ben_le_Ripate.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_ben_le_ripate',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 157,
    stats: [{ stat: 'maxHp', value: 181 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 3 }, { stat: 'critResPct', value: 7 }, { stat: 'heal', value: 7 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.collier_de_fantomayte = {
    id: 'collier_de_fantomayte',
    name: 'Collier de Fantômayte',
    image: 'images/items/Collier_de_Fantômayte.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_fantomayte',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 157,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 91 }, { stat: 'flatDamage', value: 25 }, { stat: 'res.eau', value: 3 }, { stat: 'res.terre', value: 3 }],
    description: ''
}

item.amulette_de_l_orfelin = {
    id: 'amulette_de_l_orfelin',
    name: 'Amulette de l\'Orfélin',
    image: 'images/items/Amulette_de_l_Orfélin.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_l_orfelin',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 157,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 84 }, { stat: 'flatDamage', value: 7 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.hache_a_lamelles = {
    id: 'hache_a_lamelles',
    name: 'Hache à Lamelles',
    image: 'images/items/Hache_à_Lamelles.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_des_sous_bois',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 157,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 56 }, { stat: 'flatDamage', value: 28 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 6 }],
    description: ''
}

item.katana_de_spiritueur = {
    id: 'katana_de_spiritueur',
    name: 'Katana de Spiritueur',
    image: 'images/items/Katana_de_Spiritueur.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_des_spiritueurs',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 157,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 11 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 46 }, { stat: 'critChance', value: 3 }, { stat: 'critDamagePct', value: 11 }, { stat: 'critResPct', value: -10 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.coiffe_du_minotot = {
    id: 'coiffe_du_minotot',
    name: 'Coiffe du Minotot',
    image: 'images/items/Coiffe_du_Minotot.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_minotot',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 157,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 47 }, { stat: 'spd', value: 11 }, { stat: 'critChance', value: 3 }, { stat: 'heal', value: 5 }, { stat: 'dropRate', value: 3 }, { stat: 'res.feu', value: 4 }],
    description: ''
}

item.sceau_souverain_du_roissingue = {
    id: 'sceau_souverain_du_roissingue',
    name: 'Sceau Souverain du Roissingue',
    image: 'images/items/Sceau_Souverain_du_Roissingue.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_souveraine',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 158,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 5 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 6 }, { stat: 'res.terre', value: 11 }],
    description: ''
}

item.ceinture_de_tsukinochi = {
    id: 'ceinture_de_tsukinochi',
    name: 'Ceinture de Tsukinochi',
    image: 'images/items/Ceinture_de_Tsukinochi.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_brume',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 158,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 25 }, { stat: 'critChance', value: -10 }, { stat: 'dropRate', value: 4 }, { stat: 'res.eau', value: 4 }],
    description: ''
}

item.ceinture_de_grozilla = {
    id: 'ceinture_de_grozilla',
    name: 'Ceinture de Grozilla',
    image: 'images/items/Ceinture_de_Grozilla.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_grozilla',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 158,
    stats: [{ stat: 'maxHp', value: 171 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 16 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 11 }, { stat: 'res.air', value: 11 }, { stat: 'res.neutre', value: 11 }],
    description: ''
}

item.ceinture_de_l_orfelin = {
    id: 'ceinture_de_l_orfelin',
    name: 'Ceinture de l\'Orfélin',
    image: 'images/items/Ceinture_de_l_Orfélin.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_l_orfelin',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 158,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 85 }, { stat: 'flatDamage', value: 5 }, { stat: 'critChance', value: 3 }, { stat: 'res.feu', value: 4 }, { stat: 'res.eau', value: 14 }],
    description: ''
}

item.ceinture_du_kaniblou = {
    id: 'ceinture_du_kaniblou',
    name: 'Ceinture du Kaniblou',
    image: 'images/items/Ceinture_du_Kaniblou.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_kaniblou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 158,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 56 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.air', value: 16 }],
    description: ''
}

item.collier_du_minotot = {
    id: 'collier_du_minotot',
    name: 'Collier du Minotot',
    image: 'images/items/Collier_du_Minotot.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_minotot',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 158,
    stats: [{ stat: 'maxHp', value: 181 }, { stat: 'atk', value: 87 }, { stat: 'flatDamage', value: 6 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 3 }],
    description: ''
}

item.baton_du_maitre_zoth = {
    id: 'baton_du_maitre_zoth',
    name: 'Bâton du Maître Zoth',
    image: 'images/items/Bâton_du_Maître_Zoth.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_zothuliste',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 158,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: -6 }, { stat: 'flatDamage', value: 27 }, { stat: 'dropRate', value: 2 }, { stat: 'res.neutre', value: 6 }],
    description: ''
}

item.fut_d_aspiratueur = {
    id: 'fut_d_aspiratueur',
    name: 'Fût d\'Aspiratueur',
    image: 'images/items/Fût_d_Aspiratueur.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_des_spiritueurs',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 159,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: -15 }, { stat: 'flatDamage', value: 24 }, { stat: 'critChance', value: 1 }, { stat: 'critDamagePct', value: 4 }, { stat: 'critResPct', value: -20 }, { stat: 'res.terre', value: 4 }],
    description: ''
}

item.collier_ye = {
    id: 'collier_ye',
    name: 'Collier Yé',
    image: 'images/items/Collier_Yé.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_yeye',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 160,
    stats: [{ stat: 'atk', value: 80 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.eau', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.coiffe_de_l_orfelin = {
    id: 'coiffe_de_l_orfelin',
    name: 'Coiffe de l\'Orfélin',
    image: 'images/items/Coiffe_de_l_Orfélin.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_l_orfelin',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 160,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 59 }, { stat: 'flatDamage', value: 5 }, { stat: 'critResPct', value: 9 }, { stat: 'dropRate', value: 3 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.ceinture_des_matougarous = {
    id: 'ceinture_des_matougarous',
    name: 'Ceinture des Matougarous',
    image: 'images/items/Ceinture_des_Matougarous.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_des_matougarous',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 160,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 21 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 9 }, { stat: 'res.feu', value: 5 }],
    description: ''
}

item.pupille_de_madura = {
    id: 'pupille_de_madura',
    name: 'Pupille de Madura',
    image: 'images/items/Pupille_de_Madura.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_des_tombeaux',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 160,
    stats: [{ stat: 'maxHp', value: 111 }, { stat: 'atk', value: 56 }, { stat: 'flatDamage', value: 11 }, { stat: 'res.feu', value: 7 }, { stat: 'res.eau', value: 7 }, { stat: 'res.terre', value: 7 }, { stat: 'res.air', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.epee_du_bretteur_celeste = {
    id: 'epee_du_bretteur_celeste',
    name: 'Épée du Bretteur Céleste',
    image: 'images/items/Épée_du_Bretteur_Céleste.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_bretteur_celeste',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 160,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 42 }, { stat: 'flatDamage', value: 44 }, { stat: 'critDamagePct', value: 7 }, { stat: 'critResPct', value: 11 }, { stat: 'lifestealPct', value: 4 }, { stat: 'res.neutre', value: 11 }],
    description: ''
}

item.cape_du_kaniblou = {
    id: 'cape_du_kaniblou',
    name: 'Cape du Kaniblou',
    image: 'images/items/Cape_du_Kaniblou.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_kaniblou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 160,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 7 }, { stat: 'critChance', value: 3 }, { stat: 'critResPct', value: 11 }, { stat: 'dropRate', value: 3 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.sandales_du_minotot = {
    id: 'sandales_du_minotot',
    name: 'Sandales du Minotot',
    image: 'images/items/Sandales_du_Minotot.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_minotot',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 160,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 39 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 6 }, { stat: 'heal', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: -4 }],
    description: ''
}

item.bague_de_l_obsidiantre = {
    id: 'bague_de_l_obsidiantre',
    name: 'Bague de l\'Obsidiantre',
    image: 'images/items/Bague_de_l_Obsidiantre.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_l_obsidiantre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 161,
    stats: [{ stat: 'maxHp', value: 121 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 15 }, { stat: 'critChance', value: 2 }, { stat: 'heal', value: 5 }],
    description: ''
}

item.anneau_des_matougarous = {
    id: 'anneau_des_matougarous',
    name: 'Anneau des Matougarous',
    image: 'images/items/Anneau_des_Matougarous.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_des_matougarous',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 161,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 21 }, { stat: 'critDamagePct', value: 7 }],
    description: ''
}

item.cape_tivante = {
    id: 'cape_tivante',
    name: 'Cape Tivante',
    image: 'images/items/Cape_Tivante.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_frigostien_envoutant',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 161,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 70 }, { stat: 'flatDamage', value: 16 }, { stat: 'dropRate', value: 3 }, { stat: 'res.terre', value: 7 }, { stat: 'res.air', value: 5 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.cape_des_matougarous = {
    id: 'cape_des_matougarous',
    name: 'Cape des Matougarous',
    image: 'images/items/Cape_des_Matougarous.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_des_matougarous',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 162,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 41 }, { stat: 'flatDamage', value: 21 }, { stat: 'critDamagePct', value: 9 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.cape_du_bretteur_celeste = {
    id: 'cape_du_bretteur_celeste',
    name: 'Cape du Bretteur Céleste',
    image: 'images/items/Cape_du_Bretteur_Céleste.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_bretteur_celeste',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 162,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 46 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 10 }, { stat: 'critChance', value: 4 }, { stat: 'critResPct', value: 11 }, { stat: 'res.eau', value: 11 }, { stat: 'res.terre', value: 11 }],
    description: ''
}

item.ceinture_du_bretteur_celeste = {
    id: 'ceinture_du_bretteur_celeste',
    name: 'Ceinture du Bretteur Céleste',
    image: 'images/items/Ceinture_du_Bretteur_Céleste.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_bretteur_celeste',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 162,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 10 }, { stat: 'critChance', value: 4 }, { stat: 'res.feu', value: 11 }, { stat: 'res.air', value: 11 }],
    description: ''
}

item.anneau_du_kaniblou = {
    id: 'anneau_du_kaniblou',
    name: 'Anneau du Kaniblou',
    image: 'images/items/Anneau_du_Kaniblou.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_kaniblou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 162,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 7 }, { stat: 'critChance', value: 2 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.slip_noze = {
    id: 'slip_noze',
    name: 'Slip Noze',
    image: 'images/items/Slip_Noze.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_frigostien_envoutant',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 162,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 24 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.eau', value: 5 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.bottes_de_ush = {
    id: 'bottes_de_ush',
    name: 'Bottes de Ush',
    image: 'images/items/Bottes_de_Ush.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_ush_galesh',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 163,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 59 }, { stat: 'spd', value: 36 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 3 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.cape_de_l_obsidiantre = {
    id: 'cape_de_l_obsidiantre',
    name: 'Cape de l\'Obsidiantre',
    image: 'images/items/Cape_de_l_Obsidiantre.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_l_obsidiantre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 163,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 56 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 18 }, { stat: 'res.eau', value: 7 }, { stat: 'res.terre', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.ceinture_des_prophetes = {
    id: 'ceinture_des_prophetes',
    name: 'Ceinture des Prophètes',
    image: 'images/items/Ceinture_des_Prophètes.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_des_prophetes',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 163,
    stats: [{ stat: 'maxHp', value: 181 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 11 }, { stat: 'res.air', value: 11 }],
    description: ''
}

item.col_de_ush = {
    id: 'col_de_ush',
    name: 'Col de Ush',
    image: 'images/items/Col_de_Ush.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_ush_galesh',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 164,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 94 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 3 }, { stat: 'res.eau', value: 5 }],
    description: ''
}

item.amulette_de_l_obsidiantre = {
    id: 'amulette_de_l_obsidiantre',
    name: 'Amulette de l\'Obsidiantre',
    image: 'images/items/Amulette_de_l_Obsidiantre.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_l_obsidiantre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 164,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 76 }, { stat: 'flatDamage', value: 15 }, { stat: 'heal', value: 5 }, { stat: 'res.feu', value: 5 }, { stat: 'res.terre', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.anneau_de_koumiho = {
    id: 'anneau_de_koumiho',
    name: 'Anneau de Koumiho',
    image: 'images/items/Anneau_de_Koumiho.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_des_tombeaux',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 164,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 56 }, { stat: 'flatDamage', value: 7 }, { stat: 'critChance', value: 2 }, { stat: 'res.eau', value: 11 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.coiffe_du_tynril = {
    id: 'coiffe_du_tynril',
    name: 'Coiffe du Tynril',
    image: 'images/items/Coiffe_du_Tynril.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_tynril',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 164,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 35 }, { stat: 'dropRate', value: 4 }, { stat: 'res.feu', value: 6 }, { stat: 'res.eau', value: 6 }, { stat: 'res.terre', value: 6 }, { stat: 'res.air', value: 6 }, { stat: 'res.neutre', value: 6 }],
    description: ''
}

item.rhizome_du_tynril = {
    id: 'rhizome_du_tynril',
    name: 'Rhizome du Tynril',
    image: 'images/items/Rhizome_du_Tynril.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_tynril',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 164,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 28 }, { stat: 'critChance', value: 3 }, { stat: 'heal', value: 5 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 3 }, { stat: 'res.eau', value: 3 }, { stat: 'res.terre', value: 3 }, { stat: 'res.air', value: 3 }, { stat: 'res.neutre', value: 3 }],
    description: ''
}

item.epee_de_ush = {
    id: 'epee_de_ush',
    name: 'Épée de Ush',
    image: 'images/items/Épée_de_Ush.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_ush_galesh',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 165,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 85 }, { stat: 'flatDamage', value: 33 }, { stat: 'critChance', value: 3 }, { stat: 'lifestealPct', value: 6 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.anneau_tabene = {
    id: 'anneau_tabene',
    name: 'Anneau Tabéné',
    image: 'images/items/Anneau_Tabéné.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_abregee',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 166,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 18 }, { stat: 'critResPct', value: 4 }, { stat: 'res.eau', value: 7 }, { stat: 'res.air', value: 5 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.coquille_de_vengeuse_masquee = {
    id: 'coquille_de_vengeuse_masquee',
    name: 'Coquille de Vengeuse Masquée',
    image: 'images/items/Coquille_de_Vengeuse_Masquée.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_de_vengeuse_masquee',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 166,
    stats: [{ stat: 'maxHp', value: 131 }, { stat: 'atk', value: 46 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 3 }, { stat: 'res.terre', value: 3 }],
    description: ''
}

item.casque_de_l_obsidiantre = {
    id: 'casque_de_l_obsidiantre',
    name: 'Casque de l\'Obsidiantre',
    image: 'images/items/Casque_de_l_Obsidiantre.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_l_obsidiantre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 166,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 47 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: 4 }, { stat: 'heal', value: 6 }, { stat: 'res.terre', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.geta_des_tombeaux = {
    id: 'geta_des_tombeaux',
    name: 'Geta des Tombeaux',
    image: 'images/items/Geta_des_Tombeaux.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_des_tombeaux',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 166,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 36 }, { stat: 'flatDamage', value: 7 }, { stat: 'critChance', value: 3 }, { stat: 'heal', value: 4 }, { stat: 'res.feu', value: 7 }, { stat: 'res.air', value: 12 }],
    description: ''
}

item.bottes_de_l_obsidiantre = {
    id: 'bottes_de_l_obsidiantre',
    name: 'Bottes de l\'Obsidiantre',
    image: 'images/items/Bottes_de_l_Obsidiantre.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_l_obsidiantre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 167,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 21 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 4 }, { stat: 'res.terre', value: 4 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.capuche_souveraine_du_roissingue = {
    id: 'capuche_souveraine_du_roissingue',
    name: 'Capuche Souveraine du Roissingue',
    image: 'images/items/Capuche_Souveraine_du_Roissingue.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_souveraine',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 168,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 51 }, { stat: 'spd', value: 21 }, { stat: 'dropRate', value: 3 }, { stat: 'res.feu', value: 6 }, { stat: 'res.eau', value: 5 }, { stat: 'res.air', value: 11 }],
    description: ''
}

item.brassard_de_vengeuse_masquee = {
    id: 'brassard_de_vengeuse_masquee',
    name: 'Brassard de Vengeuse Masquée',
    image: 'images/items/Brassard_de_Vengeuse_Masquée.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_vengeuse_masquee',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 168,
    stats: [{ stat: 'maxHp', value: 131 }, { stat: 'flatDamage', value: 28 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 3 }, { stat: 'res.terre', value: 3 }],
    description: ''
}

item.anneau_des_prophetes = {
    id: 'anneau_des_prophetes',
    name: 'Anneau des Prophètes',
    image: 'images/items/Anneau_des_Prophètes.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_des_prophetes',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 168,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 14 }, { stat: 'dropRate', value: 1 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.ceinture_d_onigori = {
    id: 'ceinture_d_onigori',
    name: 'Ceinture d\'Onigori',
    image: 'images/items/Ceinture_d_Onigori.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_des_tombeaux',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 168,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 7 }, { stat: 'heal', value: 4 }, { stat: 'res.eau', value: 4 }, { stat: 'res.air', value: 4 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.baton_des_prophetes = {
    id: 'baton_des_prophetes',
    name: 'Bâton des Prophètes',
    image: 'images/items/Bâton_des_Prophètes.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_des_prophetes',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 169,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 11 }, { stat: 'flatDamage', value: 36 }, { stat: 'critChance', value: 2 }, { stat: 'critResPct', value: 7 }, { stat: 'heal', value: 4 }, { stat: 'lifestealPct', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.veranneau = {
    id: 'veranneau',
    name: 'Veranneau',
    image: 'images/items/Veranneau.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'pernoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 169,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 2 }, { stat: 'critResPct', value: 11 }],
    description: ''
}

item.crolier = {
    id: 'crolier',
    name: 'Crolier',
    image: 'images/items/Crolier.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'vernoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 169,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 2 }, { stat: 'heal', value: 11 }, { stat: 'res.feu', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.masque_de_vengeuse_masquee = {
    id: 'masque_de_vengeuse_masquee',
    name: 'Masque de Vengeuse Masquée',
    image: 'images/items/Masque_de_Vengeuse_Masquée.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_vengeuse_masquee',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 170,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 36 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 3 }, { stat: 'res.eau', value: 3 }],
    description: ''
}

item.ceinture_de_xlii = {
    id: 'ceinture_de_xlii',
    name: 'Ceinture de XLII',
    image: 'images/items/Ceinture_de_XLII.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_xlii',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 170,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 41 }, { stat: 'flatDamage', value: 15 }, { stat: 'critChance', value: 4 }, { stat: 'res.terre', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.dagues_de_kabombz = {
    id: 'dagues_de_kabombz',
    name: 'Dagues de Kabombz',
    image: 'images/items/Dagues_de_Kabombz.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_des_kabombz',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 170,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 46 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 20 }, { stat: 'critChance', value: 1 }, { stat: 'lifestealPct', value: 3 }, { stat: 'res.feu', value: 3 }, { stat: 'res.eau', value: 3 }, { stat: 'res.air', value: 3 }],
    description: ''
}

item.ceinture_de_soissanth = {
    id: 'ceinture_de_soissanth',
    name: 'Ceinture de Soissanth',
    image: 'images/items/Ceinture_de_Soissanth.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_soissanth',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 171,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 14 }, { stat: 'res.air', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.anneau_de_xlii = {
    id: 'anneau_de_xlii',
    name: 'Anneau de XLII',
    image: 'images/items/Anneau_de_XLII.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_xlii',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 171,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 8 }, { stat: 'critChance', value: 2 }, { stat: 'critResPct', value: 9 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.pagne_de_kabombz = {
    id: 'pagne_de_kabombz',
    name: 'Pagne de Kabombz',
    image: 'images/items/Pagne_de_Kabombz.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_des_kabombz',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 171,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 4 }, { stat: 'heal', value: 5 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 3 }, { stat: 'res.terre', value: 3 }, { stat: 'res.air', value: 3 }],
    description: ''
}

item.capiktenia = {
    id: 'capiktenia',
    name: 'Capikténia',
    image: 'images/items/Capikténia.png',
    type: 'equipment',
    slot: 'cape',
    set: 'pernoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 171,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 56 }, { stat: 'flatDamage', value: 10 }, { stat: 'critChance', value: 2 }, { stat: 'critResPct', value: 11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.casquoporth = {
    id: 'casquoporth',
    name: 'Casquoporth',
    image: 'images/items/Casquoporth.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'vernoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 171,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 36 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }],
    description: ''
}

item.panier_de_z_ufs = {
    id: 'panier_de_z_ufs',
    name: 'Panier de zœufs',
    image: 'images/items/Panier_de_zœufs.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_des_kabombz',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 172,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 4 }, { stat: 'heal', value: 5 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 3 }, { stat: 'res.terre', value: 3 }],
    description: ''
}

item.bottines_des_sous_bois = {
    id: 'bottines_des_sous_bois',
    name: 'Bottines des sous-bois',
    image: 'images/items/Bottines_des_sous-bois.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_des_sous_bois',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 172,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 52 }, { stat: 'spd', value: 56 }, { stat: 'flatDamage', value: 5 }, { stat: 'dropRate', value: 4 }, { stat: 'res.neutre', value: 6 }],
    description: ''
}

item.amulette_c_tera = {
    id: 'amulette_c_tera',
    name: 'Amulette Cætera',
    image: 'images/items/Amulette_Cætera.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_abregee',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 173,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 97 }, { stat: 'flatDamage', value: 28 }, { stat: 'dropRate', value: 3 }],
    description: ''
}

item.alliance_de_guten_tak = {
    id: 'alliance_de_guten_tak',
    name: 'Alliance de Guten Tak',
    image: 'images/items/Alliance_de_Guten_Tak.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_guten_tak',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 173,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 15 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 16 }, { stat: 'res.eau', value: 5 }, { stat: 'res.terre', value: 5 }, { stat: 'res.air', value: 16 }],
    description: ''
}

item.arc_de_guten_tak = {
    id: 'arc_de_guten_tak',
    name: 'Arc de Guten Tak',
    image: 'images/items/Arc_de_Guten_Tak.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_guten_tak',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 173,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 42 }, { stat: 'critChance', value: 2 }, { stat: 'critResPct', value: 11 }, { stat: 'lifestealPct', value: 2 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 11 }, { stat: 'res.terre', value: 11 }],
    description: ''
}

item.coiffe_de_soissanth = {
    id: 'coiffe_de_soissanth',
    name: 'Coiffe de Soissanth',
    image: 'images/items/Coiffe_de_Soissanth.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_soissanth',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 173,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 56 }, { stat: 'flatDamage', value: 21 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 14 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.bottes_du_tengu_givrefoux = {
    id: 'bottes_du_tengu_givrefoux',
    name: 'Bottes du Tengu Givrefoux',
    image: 'images/items/Bottes_du_Tengu_Givrefoux.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_tengu_givrefoux',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 173,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 36 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 2 }, { stat: 'heal', value: 5 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 8 }],
    description: ''
}

item.chaussquales = {
    id: 'chaussquales',
    name: 'Chaussquales',
    image: 'images/items/Chaussquales.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'pernoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 173,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: 4 }, { stat: 'critResPct', value: 11 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.ceintremorse = {
    id: 'ceintremorse',
    name: 'Ceintrémorse',
    image: 'images/items/Ceintrémorse.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'vernoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 173,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 10 }, { stat: 'critChance', value: 2 }, { stat: 'heal', value: 11 }, { stat: 'res.terre', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.pantoufles_de_soissanth = {
    id: 'pantoufles_de_soissanth',
    name: 'Pantoufles de Soissanth',
    image: 'images/items/Pantoufles_de_Soissanth.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_soissanth',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 174,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 21 }, { stat: 'critChance', value: 3 }, { stat: 'res.eau', value: 14 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.anneau_blitere = {
    id: 'anneau_blitere',
    name: 'Anneau Bliteré',
    image: 'images/items/Anneau_Bliteré.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_bworker_gladiateur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 174,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 26 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 6 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 12 }],
    description: ''
}

item.chapeau_pourih = {
    id: 'chapeau_pourih',
    name: 'Chapeau Pourih',
    image: 'images/items/Chapeau_Pourih.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_frigostien_douteux',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 174,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 47 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 4 }, { stat: 'critResPct', value: 7 }, { stat: 'dropRate', value: 4 }, { stat: 'res.feu', value: 7 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.la_broche_celeste_ankarton = {
    id: 'la_broche_celeste_ankarton',
    name: 'La Broche Céleste Ankarton',
    image: 'images/items/La_Broche_Céleste_Ankarton.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_ankarton',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 175,
    stats: [],
    description: ''
}

item.anneau_de_guten_tak = {
    id: 'anneau_de_guten_tak',
    name: 'Anneau de Guten Tak',
    image: 'images/items/Anneau_de_Guten_Tak.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_guten_tak',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 175,
    stats: [{ stat: 'atk', value: 63 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 33 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.coiffe_de_tengu_givrefoux = {
    id: 'coiffe_de_tengu_givrefoux',
    name: 'Coiffe de Tengu Givrefoux',
    image: 'images/items/Coiffe_de_Tengu_Givrefoux.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_tengu_givrefoux',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 175,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 62 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 14 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 7 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.chapeau_de_dremoan = {
    id: 'chapeau_de_dremoan',
    name: 'Chapeau de Dremoan',
    image: 'images/items/Chapeau_de_Dremoan.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_dremoan',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 176,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 11 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.bottes_de_xlii = {
    id: 'bottes_de_xlii',
    name: 'Bottes de XLII',
    image: 'images/items/Bottes_de_XLII.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_xlii',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 176,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 15 }, { stat: 'critResPct', value: 11 }, { stat: 'res.feu', value: 5 }, { stat: 'res.eau', value: 5 }],
    description: ''
}

item.anneau_du_korriandre = {
    id: 'anneau_du_korriandre',
    name: 'Anneau du Korriandre',
    image: 'images/items/Anneau_du_Korriandre.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_korriandre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 176,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 3 }, { stat: 'critResPct', value: 5 }, { stat: 'res.feu', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.collier_du_yech_ti = {
    id: 'collier_du_yech_ti',
    name: 'Collier du YeCh\'Ti',
    image: 'images/items/Collier_du_YeCh_Ti.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_yech_ti',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 176,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 76 }, { stat: 'flatDamage', value: 21 }, { stat: 'dropRate', value: 1 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.bottes_necrotiques = {
    id: 'bottes_necrotiques',
    name: 'Bottes Nécrotiques',
    image: 'images/items/Bottes_Nécrotiques.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_necrotique',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 177,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 33 }, { stat: 'critChance', value: 3 }],
    description: ''
}

item.amulette_de_guten_tak = {
    id: 'amulette_de_guten_tak',
    name: 'Amulette de Guten Tak',
    image: 'images/items/Amulette_de_Guten_Tak.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_guten_tak',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 177,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 77 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 24 }, { stat: 'dropRate', value: 2 }, { stat: 'res.neutre', value: 16 }],
    description: ''
}

item.cape_de_tengu_givrefoux = {
    id: 'cape_de_tengu_givrefoux',
    name: 'Cape de Tengu Givrefoux',
    image: 'images/items/Cape_de_Tengu_Givrefoux.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_tengu_givrefoux',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 177,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 3 }, { stat: 'heal', value: 5 }, { stat: 'dropRate', value: 3 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.ceinture_du_tengu_givrefoux = {
    id: 'ceinture_du_tengu_givrefoux',
    name: 'Ceinture du Tengu Givrefoux',
    image: 'images/items/Ceinture_du_Tengu_Givrefoux.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_tengu_givrefoux',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 177,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 5 }, { stat: 'res.air', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.baguette_nolog = {
    id: 'baguette_nolog',
    name: 'Baguette Nolog',
    image: 'images/items/Baguette_Nolog.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_frigostien_curieux',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 177,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 41 }, { stat: 'critChance', value: 4 }, { stat: 'heal', value: 5 }, { stat: 'lifestealPct', value: 3 }, { stat: 'dropRate', value: 1 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.ceinture_mycosine = {
    id: 'ceinture_mycosine',
    name: 'Ceinture Mycosine',
    image: 'images/items/Ceinture_Mycosine.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplycelium',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 177,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 6 }, { stat: 'res.eau', value: 6 }, { stat: 'res.terre', value: 6 }],
    description: ''
}

item.amulette_necrotique = {
    id: 'amulette_necrotique',
    name: 'Amulette Nécrotique',
    image: 'images/items/Amulette_Nécrotique.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_necrotique',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 178,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 81 }, { stat: 'flatDamage', value: 33 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.ougalurette = {
    id: 'ougalurette',
    name: 'Ougalurette',
    image: 'images/items/Ougalurette.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_ougah',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 178,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 8 }, { stat: 'dropRate', value: 4 }, { stat: 'res.neutre', value: 8 }],
    description: ''
}

item.carapace_ailee_du_superviz_uf = {
    id: 'carapace_ailee_du_superviz_uf',
    name: 'Carapace ailée du Supervizœuf',
    image: 'images/items/Carapace_ailée_du_Supervizœuf.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_superviz_uf',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 178,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 42 }, { stat: 'flatDamage', value: 5 }, { stat: 'critChance', value: 3 }, { stat: 'heal', value: 7 }, { stat: 'res.air', value: 23 }],
    description: ''
}

item.mitaine_du_yech_ti = {
    id: 'mitaine_du_yech_ti',
    name: 'Mitaine du YeCh\'Ti',
    image: 'images/items/Mitaine_du_YeCh_Ti.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_yech_ti',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 178,
    stats: [{ stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 33 }, { stat: 'dropRate', value: 1 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.tranche_des_sous_bois = {
    id: 'tranche_des_sous_bois',
    name: 'Tranche des Sous-bois',
    image: 'images/items/Tranche_des_Sous-bois.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_des_sous_bois',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 179,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 6 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 4 }, { stat: 'res.terre', value: 6 }],
    description: ''
}

item.bracelet_ventre = {
    id: 'bracelet_ventre',
    name: 'Bracelet Ventré',
    image: 'images/items/Bracelet_Ventré.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_bworker_berserker',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 179,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 26 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 6 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 12 }],
    description: ''
}

item.cape_du_korriandre = {
    id: 'cape_du_korriandre',
    name: 'Cape du Korriandre',
    image: 'images/items/Cape_du_Korriandre.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_korriandre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 179,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 42 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 4 }, { stat: 'critResPct', value: 7 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 7 }, { stat: 'res.neutre', value: 8 }],
    description: ''
}

item.poing_du_superviz_uf = {
    id: 'poing_du_superviz_uf',
    name: 'Poing du Supervizœuf',
    image: 'images/items/Poing_du_Supervizœuf.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_superviz_uf',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 179,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 37 }, { stat: 'flatDamage', value: 3 }, { stat: 'critChance', value: 2 }, { stat: 'heal', value: 4 }, { stat: 'res.terre', value: 23 }],
    description: ''
}

item.bottes_de_dremoan = {
    id: 'bottes_de_dremoan',
    name: 'Bottes de Dremoan',
    image: 'images/items/Bottes_de_Dremoan.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_dremoan',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 180,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.bottes_du_k_o = {
    id: 'bottes_du_k_o',
    name: 'Bottes du K.O.',
    image: 'images/items/Bottes_du_K.O..png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_k_o',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 180,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 73 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 21 }, { stat: 'res.feu', value: 8 }, { stat: 'res.eau', value: 8 }],
    description: ''
}

item.ougarteau = {
    id: 'ougarteau',
    name: 'Ougarteau',
    image: 'images/items/Ougarteau.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_ougah',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 180,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 32 }, { stat: 'lifestealPct', value: 5 }, { stat: 'dropRate', value: 1 }],
    description: ''
}

item.casque_du_superviz_uf = {
    id: 'casque_du_superviz_uf',
    name: 'Casque du Supervizœuf',
    image: 'images/items/Casque_du_Supervizœuf.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_superviz_uf',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 180,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 57 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 3 }, { stat: 'heal', value: 5 }, { stat: 'res.feu', value: 23 }],
    description: ''
}

item.bras_du_yech_ti = {
    id: 'bras_du_yech_ti',
    name: 'Bras du YeCh\'Ti',
    image: 'images/items/Bras_du_YeCh_Ti.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_du_yech_ti',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 180,
    stats: [{ stat: 'maxHp', value: 131 }, { stat: 'atk', value: 31 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }],
    description: ''
}

item.anneau_chevelu = {
    id: 'anneau_chevelu',
    name: 'Anneau Chevelu',
    image: 'images/items/Anneau_Chevelu.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplycelium',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 180,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 6 }, { stat: 'res.terre', value: 12 }, { stat: 'res.neutre', value: 6 }],
    description: ''
}

item.ceinture_tore = {
    id: 'ceinture_tore',
    name: 'Ceinture Toré',
    image: 'images/items/Ceinture_Toré.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_bworker_gladiateur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 181,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 52 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 1 }, { stat: 'heal', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.neutre', value: 12 }],
    description: ''
}

item.amulette_du_k_o = {
    id: 'amulette_du_k_o',
    name: 'Amulette du K.O.',
    image: 'images/items/Amulette_du_K.O..png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_k_o',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 181,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 87 }, { stat: 'flatDamage', value: 21 }, { stat: 'critChance', value: 3 }, { stat: 'res.feu', value: 7 }],
    description: ''
}

item.ougamulette = {
    id: 'ougamulette',
    name: 'Ougamulette',
    image: 'images/items/Ougamulette.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_ougah',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 181,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 66 }, { stat: 'spd', value: 51 }, { stat: 'flatDamage', value: 5 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 6 }],
    description: ''
}

item.dard_du_superviz_uf = {
    id: 'dard_du_superviz_uf',
    name: 'Dard du Supervizœuf',
    image: 'images/items/Dard_du_Supervizœuf.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_superviz_uf',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 181,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 42 }, { stat: 'flatDamage', value: 45 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: -8 }, { stat: 'heal', value: 9 }, { stat: 'res.eau', value: 23 }],
    description: ''
}

item.bottines_hodore = {
    id: 'bottines_hodore',
    name: 'Bottines Hodore',
    image: 'images/items/Bottines_Hodore.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_frigostien_douteux',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 181,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 46 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 28 }, { stat: 'dropRate', value: 4 }, { stat: 'res.feu', value: 7 }, { stat: 'res.air', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.caprin = {
    id: 'caprin',
    name: 'Caprin',
    image: 'images/items/Caprin.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplignon',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 181,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 6 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 4 }, { stat: 'res.feu', value: 6 }, { stat: 'res.terre', value: 6 }, { stat: 'res.neutre', value: 6 }],
    description: ''
}

item.chaussons_pignons = {
    id: 'chaussons_pignons',
    name: 'Chaussons Pignons',
    image: 'images/items/Chaussons_Pignons.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplycelium',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 181,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 51 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 6 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 6 }, { stat: 'res.terre', value: 6 }, { stat: 'res.air', value: 6 }],
    description: ''
}

item.cape_necrotique = {
    id: 'cape_necrotique',
    name: 'Cape Nécrotique',
    image: 'images/items/Cape_Nécrotique.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_necrotique',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 182,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 33 }, { stat: 'critChance', value: 3 }, { stat: 'res.feu', value: 7 }],
    description: ''
}

item.cape_de_dremoan = {
    id: 'cape_de_dremoan',
    name: 'Cape de Dremoan',
    image: 'images/items/Cape_de_Dremoan.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_dremoan',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 182,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 11 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 11 }, { stat: 'heal', value: 9 }],
    description: ''
}

item.lame_assacre = {
    id: 'lame_assacre',
    name: 'Lame Assacre',
    image: 'images/items/Lame_Assacre.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_bworker_berserker',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 182,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 2 }, { stat: 'lifestealPct', value: 3 }, { stat: 'res.air', value: 12 }],
    description: ''
}

item.amulette_du_korriandre = {
    id: 'amulette_du_korriandre',
    name: 'Amulette du Korriandre',
    image: 'images/items/Amulette_du_Korriandre.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_korriandre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 182,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 81 }, { stat: 'flatDamage', value: 16 }, { stat: 'critResPct', value: 7 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.blindage_du_superviz_uf = {
    id: 'blindage_du_superviz_uf',
    name: 'Blindage du Supervizœuf',
    image: 'images/items/Blindage_du_Supervizœuf.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_du_superviz_uf',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 182,
    stats: [{ stat: 'maxHp', value: 131 }, { stat: 'atk', value: 21 }, { stat: 'critChance', value: 3 }, { stat: 'heal', value: 9 }, { stat: 'res.neutre', value: 23 }],
    description: ''
}

item.cape_peupret = {
    id: 'cape_peupret',
    name: 'Cape Peupret',
    image: 'images/items/Cape_Peupret.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_frigostien_approximatif',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 182,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 61 }, { stat: 'spd', value: 16 }, { stat: 'flatDamage', value: 25 }, { stat: 'critChance', value: 1 }, { stat: 'dropRate', value: 3 }, { stat: 'res.neutre', value: 10 }],
    description: ''
}

item.bague_de_boreale = {
    id: 'bague_de_boreale',
    name: 'Bague de Boréale',
    image: 'images/items/Bague_de_Boréale.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_boreale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 183,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 16 }, { stat: 'critResPct', value: 7 }, { stat: 'res.feu', value: 16 }],
    description: ''
}

item.ceinture_du_k_o = {
    id: 'ceinture_du_k_o',
    name: 'Ceinture du K.O.',
    image: 'images/items/Ceinture_du_K.O..png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_k_o',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 183,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 88 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 24 }, { stat: 'critChance', value: 4 }, { stat: 'res.eau', value: 5 }],
    description: ''
}

item.cape_debruk_sayl = {
    id: 'cape_debruk_sayl',
    name: 'Cape Debruk\'Sayl',
    image: 'images/items/Cape_Debruk_Sayl.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_shushu_debruk_sayl',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 183,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 3 }, { stat: 'res.terre', value: 3 }, { stat: 'res.air', value: 3 }],
    description: ''
}

item.ceinture_bine = {
    id: 'ceinture_bine',
    name: 'Ceinture Bine',
    image: 'images/items/Ceinture_Bine.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_frigostien_approximatif',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 183,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 32 }, { stat: 'flatDamage', value: 21 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 3 }, { stat: 'res.eau', value: 8 }, { stat: 'res.air', value: 8 }],
    description: ''
}

item.chapignon = {
    id: 'chapignon',
    name: 'Chapignon',
    image: 'images/items/Chapignon.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplignon',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 183,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 42 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 6 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 6 }, { stat: 'res.air', value: 6 }],
    description: ''
}

item.amulette_ripage = {
    id: 'amulette_ripage',
    name: 'Amulette Ripage',
    image: 'images/items/Amulette_Ripage.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_bworker_berserker',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 184,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 66 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 17 }, { stat: 'critChance', value: 1 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 6 }],
    description: ''
}

item.bottes_repane = {
    id: 'bottes_repane',
    name: 'Bottes Répané',
    image: 'images/items/Bottes_Répané.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_bworker_gladiateur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 184,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 6 }, { stat: 'heal', value: 6 }, { stat: 'dropRate', value: 1 }, { stat: 'res.neutre', value: 6 }],
    description: ''
}

item.ceinture_de_boreale = {
    id: 'ceinture_de_boreale',
    name: 'Ceinture de Boréale',
    image: 'images/items/Ceinture_de_Boréale.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_boreale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 185,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 61 }, { stat: 'spd', value: 41 }, { stat: 'flatDamage', value: 16 }, { stat: 'dropRate', value: 3 }, { stat: 'res.air', value: 16 }],
    description: ''
}

item.cape_erforee = {
    id: 'cape_erforee',
    name: 'Cape Erforée',
    image: 'images/items/Cape_Erforée.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_bworker_berserker',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 185,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 62 }, { stat: 'flatDamage', value: 25 }, { stat: 'dropRate', value: 4 }, { stat: 'res.eau', value: 6 }],
    description: ''
}

item.ougature = {
    id: 'ougature',
    name: 'Ougature',
    image: 'images/items/Ougature.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_ougah',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 185,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 6 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 6 }],
    description: ''
}

item.collier_debruk_sayl = {
    id: 'collier_debruk_sayl',
    name: 'Collier Debruk\'Sayl',
    image: 'images/items/Collier_Debruk_Sayl.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_shushu_debruk_sayl',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 185,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 76 }, { stat: 'flatDamage', value: 21 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 3 }, { stat: 'res.eau', value: 3 }, { stat: 'res.terre', value: 3 }],
    description: ''
}

item.amulette_heroclite = {
    id: 'amulette_heroclite',
    name: 'Amulette Héroclite',
    image: 'images/items/Amulette_Héroclite.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_frigostien_curieux',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 185,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 96 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.alliance_boletee = {
    id: 'alliance_boletee',
    name: 'Alliance Boletée',
    image: 'images/items/Alliance_Boletée.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_tue_mouche',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 186,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 4 }, { stat: 'heal', value: 6 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 6 }, { stat: 'res.air', value: 6 }, { stat: 'res.neutre', value: 6 }],
    description: ''
}

item.cape_d_ogivol = {
    id: 'cape_d_ogivol',
    name: 'Cape d\'Ogivol',
    image: 'images/items/Cape_d_Ogivol.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_d_ogivol',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 186,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 56 }, { stat: 'flatDamage', value: 24 }, { stat: 'critChance', value: 2 }, { stat: 'critResPct', value: 7 }, { stat: 'dropRate', value: 3 }, { stat: 'res.feu', value: 8 }],
    description: ''
}

item.coiffe_de_boreale = {
    id: 'coiffe_de_boreale',
    name: 'Coiffe de Boréale',
    image: 'images/items/Coiffe_de_Boréale.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_boreale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 187,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 76 }, { stat: 'flatDamage', value: 16 }, { stat: 'heal', value: 7 }, { stat: 'dropRate', value: 3 }, { stat: 'res.terre', value: 16 }],
    description: ''
}

item.ceinture_de_kolosso = {
    id: 'ceinture_de_kolosso',
    name: 'Ceinture de Kolosso',
    image: 'images/items/Ceinture_de_Kolosso.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_kolosso',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 187,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 57 }, { stat: 'flatDamage', value: 16 }, { stat: 'dropRate', value: 3 }, { stat: 'res.terre', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.anneau_debruk_sayl = {
    id: 'anneau_debruk_sayl',
    name: 'Anneau Debruk\'Sayl',
    image: 'images/items/Anneau_Debruk_Sayl.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_shushu_debruk_sayl',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 187,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 21 }, { stat: 'critChance', value: 1 }, { stat: 'res.feu', value: 2 }, { stat: 'res.eau', value: 2 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.couteaux_a_champignons = {
    id: 'couteaux_a_champignons',
    name: 'Couteaux à Champignons',
    image: 'images/items/Couteaux_à_Champignons.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplignon',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 187,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: -4 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 52 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 2 }],
    description: ''
}

item.frimacoiffe = {
    id: 'frimacoiffe',
    name: 'Frimacoiffe',
    image: 'images/items/Frimacoiffe.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'frimanoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 188,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 56 }, { stat: 'flatDamage', value: 7 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 3 }, { stat: 'res.feu', value: 8 }, { stat: 'res.air', value: 8 }],
    description: ''
}

item.ceinture_de_danathor = {
    id: 'ceinture_de_danathor',
    name: 'Ceinture de Danathor',
    image: 'images/items/Ceinture_de_Danathor.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_danathor',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 188,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 61 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 4 }, { stat: 'critResPct', value: 11 }, { stat: 'dropRate', value: 4 }],
    description: ''
}

item.hache_du_korriandre = {
    id: 'hache_du_korriandre',
    name: 'Hache du Korriandre',
    image: 'images/items/Hache_du_Korriandre.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_korriandre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 188,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: -4 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 2 }, { stat: 'critResPct', value: 7 }, { stat: 'lifestealPct', value: 16 }, { stat: 'dropRate', value: 4 }],
    description: ''
}

item.anneau_colerette = {
    id: 'anneau_colerette',
    name: 'Anneau Colerette',
    image: 'images/items/Anneau_Colerette.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplignon',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 188,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 16 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 12 }, { stat: 'res.terre', value: 6 }, { stat: 'res.neutre', value: 6 }],
    description: ''
}

item.amunite = {
    id: 'amunite',
    name: 'Amunite',
    image: 'images/items/Amunite.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_tue_mouche',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 189,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 72 }, { stat: 'flatDamage', value: 6 }, { stat: 'heal', value: 6 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 6 }, { stat: 'res.terre', value: 6 }],
    description: ''
}

item.annolamour = {
    id: 'annolamour',
    name: 'Annolamour',
    image: 'images/items/Annolamour.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_ventouse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 189,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 42 }, { stat: 'spd', value: 51 }, { stat: 'flatDamage', value: 6 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 6 }, { stat: 'res.eau', value: 6 }],
    description: ''
}

item.bottes_de_boreale = {
    id: 'bottes_de_boreale',
    name: 'Bottes de Boréale',
    image: 'images/items/Bottes_de_Boréale.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_boreale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 189,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 3 }, { stat: 'res.eau', value: 16 }],
    description: ''
}

item.casque_harnage = {
    id: 'casque_harnage',
    name: 'Casque Harnage',
    image: 'images/items/Casque_Harnage.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_bworker_gladiateur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 189,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 6 }, { stat: 'critChance', value: 3 }, { stat: 'heal', value: 6 }, { stat: 'dropRate', value: 4 }, { stat: 'res.eau', value: 6 }],
    description: ''
}

item.gresilobottes = {
    id: 'gresilobottes',
    name: 'Grésilobottes',
    image: 'images/items/Grésilobottes.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_gresil',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 190,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 46 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 7 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 9 }, { stat: 'res.terre', value: 9 }],
    description: ''
}

item.capignon = {
    id: 'capignon',
    name: 'Capignon',
    image: 'images/items/Capignon.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_tue_mouche',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 190,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 5 }, { stat: 'critChance', value: 1 }, { stat: 'heal', value: 5 }, { stat: 'dropRate', value: 2 }, { stat: 'res.neutre', value: 12 }],
    description: ''
}

item.grelots_de_barberyl = {
    id: 'grelots_de_barberyl',
    name: 'Grelots de Barbéryl',
    image: 'images/items/Grelots_de_Barbéryl.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_barberyl',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 190,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 51 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 9 }, { stat: 'critChance', value: 3 }, { stat: 'critDamagePct', value: 6 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 6 }, { stat: 'res.air', value: 6 }],
    description: ''
}

item.flashaux = {
    id: 'flashaux',
    name: 'Flashaux',
    image: 'images/items/Flashaux.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_flasho',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 190,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 27 }, { stat: 'flatDamage', value: 54 }, { stat: 'critChance', value: 4 }, { stat: 'lifestealPct', value: 6 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.anneau_de_kolosso = {
    id: 'anneau_de_kolosso',
    name: 'Anneau de Kolosso',
    image: 'images/items/Anneau_de_Kolosso.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_kolosso',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 190,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 42 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 1 }, { stat: 'res.neutre', value: 8 }],
    description: ''
}

item.perruque_de_predagob = {
    id: 'perruque_de_predagob',
    name: 'Perruque de Predagob',
    image: 'images/items/Perruque_de_Predagob.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_predagob',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 190,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 83 }, { stat: 'flatDamage', value: 18 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 4 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.marteau_aigri = {
    id: 'marteau_aigri',
    name: 'Marteau Aigri',
    image: 'images/items/Marteau_Aigri.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_des_marteaux_aigris',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 190,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 62 }, { stat: 'flatDamage', value: 76 }, { stat: 'critChance', value: 4 }, { stat: 'lifestealPct', value: 6 }, { stat: 'res.terre', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.serpe_aigrie = {
    id: 'serpe_aigrie',
    name: 'Serpe Aigrie',
    image: 'images/items/Serpe_Aigrie.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_des_marteaux_aigris',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 190,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 62 }, { stat: 'flatDamage', value: 64 }, { stat: 'critChance', value: 4 }, { stat: 'lifestealPct', value: 6 }, { stat: 'res.eau', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.bottes_d_allister = {
    id: 'bottes_d_allister',
    name: 'Bottes d\'Allister',
    image: 'images/items/Bottes_d_Allister.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_d_allister',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 191,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 61 }, { stat: 'spd', value: 36 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 11 }, { stat: 'res.neutre', value: 11 }],
    description: ''
}

item.lunettes_du_docteur_eggob = {
    id: 'lunettes_du_docteur_eggob',
    name: 'Lunettes du Docteur Eggob',
    image: 'images/items/Lunettes_du_Docteur_Eggob.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_docteur_eggob',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 191,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 83 }, { stat: 'flatDamage', value: 27 }, { stat: 'dropRate', value: 3 }, { stat: 'res.eau', value: 4 }, { stat: 'res.terre', value: 4 }],
    description: ''
}

item.anneau_du_professeur_xa = {
    id: 'anneau_du_professeur_xa',
    name: 'Anneau du Professeur Xa',
    image: 'images/items/Anneau_du_Professeur_Xa.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_professeur_xa',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 191,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 29 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 32 }, { stat: 'dropRate', value: 1 }, { stat: 'res.air', value: 11 }],
    description: ''
}

item.pelle_du_professeur_xa = {
    id: 'pelle_du_professeur_xa',
    name: 'Pelle du Professeur Xa',
    image: 'images/items/Pelle_du_Professeur_Xa.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_professeur_xa',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 191,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 39 }, { stat: 'critChance', value: 4 }, { stat: 'lifestealPct', value: 5 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.frimamulette = {
    id: 'frimamulette',
    name: 'Frimamulette',
    image: 'images/items/Frimamulette.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'frimanoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 192,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 96 }, { stat: 'spd', value: 16 }, { stat: 'flatDamage', value: 7 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 6 }, { stat: 'res.air', value: 6 }],
    description: ''
}

item.gresilosceptre = {
    id: 'gresilosceptre',
    name: 'Grésilosceptre',
    image: 'images/items/Grésilosceptre.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_gresil',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 192,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 21 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 31 }, { stat: 'dropRate', value: 4 }, { stat: 'res.feu', value: 6 }, { stat: 'res.neutre', value: 6 }],
    description: ''
}

item.binocle_airvoyant = {
    id: 'binocle_airvoyant',
    name: 'Binocle Airvoyant',
    image: 'images/items/Binocle_Airvoyant.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_quartzesienne',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 192,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 82 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 2 }, { stat: 'heal', value: 9 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.string_tue_mouche = {
    id: 'string_tue_mouche',
    name: 'String Tue-Mouche',
    image: 'images/items/String_Tue-Mouche.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_tue_mouche',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 192,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 2 }, { stat: 'heal', value: 6 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.bottes_d_otomai = {
    id: 'bottes_d_otomai',
    name: 'Bottes d\'Otomaï',
    image: 'images/items/Bottes_d_Otomaï.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_d_otomai',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 192,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 76 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 12 }, { stat: 'critChance', value: 2 }, { stat: 'heal', value: 6 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.subligar_de_barberyl = {
    id: 'subligar_de_barberyl',
    name: 'Subligar de Barbéryl',
    image: 'images/items/Subligar_de_Barbéryl.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_barberyl',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 192,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 76 }, { stat: 'flatDamage', value: 9 }, { stat: 'critChance', value: 3 }, { stat: 'critDamagePct', value: 7 }, { stat: 'dropRate', value: 3 }, { stat: 'res.eau', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.bouclieclair_de_flasho = {
    id: 'bouclieclair_de_flasho',
    name: 'Boucliéclair de Flasho',
    image: 'images/items/Boucliéclair_de_Flasho.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_de_flasho',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 192,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 67 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 4 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.bracelet_de_predagob = {
    id: 'bracelet_de_predagob',
    name: 'Bracelet de Predagob',
    image: 'images/items/Bracelet_de_Predagob.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_predagob',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 192,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 55 }, { stat: 'flatDamage', value: 10 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.bague_de_san_jifu = {
    id: 'bague_de_san_jifu',
    name: 'Bague de San Jifu',
    image: 'images/items/Bague_de_San_Jifu.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_san_jifu',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 192,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 1 }, { stat: 'critResPct', value: 7 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.anneau_de_la_fuji_givrefoux = {
    id: 'anneau_de_la_fuji_givrefoux',
    name: 'Anneau de la Fuji Givrefoux',
    image: 'images/items/Anneau_de_la_Fuji_Givrefoux.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_la_fuji_givrefoux',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 192,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 24 }, { stat: 'critChance', value: 1 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.terre', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.collier_gris = {
    id: 'collier_gris',
    name: 'Collier Gris',
    image: 'images/items/Collier_Gris.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_des_marteaux_aigris',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 192,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 86 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 3 }, { stat: 'res.eau', value: 3 }, { stat: 'res.terre', value: 3 }, { stat: 'res.neutre', value: 3 }],
    description: ''
}

item.marteau_d_henual = {
    id: 'marteau_d_henual',
    name: 'Marteau d\'Henual',
    image: 'images/items/Marteau_d_Henual.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_d_henual',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 193,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 71 }, { stat: 'flatDamage', value: 51 }, { stat: 'critResPct', value: -11 }, { stat: 'heal', value: 4 }, { stat: 'lifestealPct', value: 6 }, { stat: 'dropRate', value: 3 }, { stat: 'res.feu', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.coiffe_d_ogivol = {
    id: 'coiffe_d_ogivol',
    name: 'Coiffe d\'Ogivol',
    image: 'images/items/Coiffe_d_Ogivol.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_d_ogivol',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 193,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 32 }, { stat: 'critChance', value: 4 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.coiffe_de_kolosso = {
    id: 'coiffe_de_kolosso',
    name: 'Coiffe de Kolosso',
    image: 'images/items/Coiffe_de_Kolosso.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_kolosso',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 193,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 77 }, { stat: 'flatDamage', value: 16 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 8 }, { stat: 'res.eau', value: 8 }],
    description: ''
}

item.amulette_de_theodoran_ax = {
    id: 'amulette_de_theodoran_ax',
    name: 'Amulette de Théodoran Ax',
    image: 'images/items/Amulette_de_Théodoran_Ax.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_theodoran_ax',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 193,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 2 }, { stat: 'heal', value: 11 }, { stat: 'dropRate', value: 1 }, { stat: 'res.air', value: 11 }, { stat: 'res.neutre', value: 11 }],
    description: ''
}

item.cape_de_la_fuji_givrefoux = {
    id: 'cape_de_la_fuji_givrefoux',
    name: 'Cape de la Fuji Givrefoux',
    image: 'images/items/Cape_de_la_Fuji_Givrefoux.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_la_fuji_givrefoux',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 193,
    stats: [{ stat: 'atk', value: 55 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 33 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 5 }, { stat: 'res.air', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.amulette_hale = {
    id: 'amulette_hale',
    name: 'Amulette Hale',
    image: 'images/items/Amulette_Hale.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_des_chassouilleurs',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 193,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.terre', value: 4 }],
    description: ''
}

item.chaussons_du_comte_razof = {
    id: 'chaussons_du_comte_razof',
    name: 'Chaussons du Comte Razof',
    image: 'images/items/Chaussons_du_Comte_Razof.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_comte_razof',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 193,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 56 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 21 }, { stat: 'critChance', value: 3 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.anneau_dore_du_docteur_eggob = {
    id: 'anneau_dore_du_docteur_eggob',
    name: 'Anneau doré du Docteur Eggob',
    image: 'images/items/Anneau_doré_du_Docteur_Eggob.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_docteur_eggob',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 193,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 70 }, { stat: 'flatDamage', value: 15 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 5 }],
    description: ''
}

item.bottes_du_professeur_xa = {
    id: 'bottes_du_professeur_xa',
    name: 'Bottes du Professeur Xa',
    image: 'images/items/Bottes_du_Professeur_Xa.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_professeur_xa',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 193,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 56 }, { stat: 'flatDamage', value: 28 }, { stat: 'critChance', value: 1 }, { stat: 'heal', value: 7 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 11 }, { stat: 'res.neutre', value: 11 }],
    description: ''
}

item.anneau_clochecuivre = {
    id: 'anneau_clochecuivre',
    name: 'Anneau Clochecuivre',
    image: 'images/items/Anneau_Clochecuivre.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_clochecuivre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 194,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 45 }, { stat: 'spd', value: -20 }, { stat: 'flatDamage', value: 20 }, { stat: 'heal', value: 7 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 3 }, { stat: 'res.terre', value: 3 }],
    description: ''
}

item.gresilocape = {
    id: 'gresilocape',
    name: 'Grésilocape',
    image: 'images/items/Grésilocape.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_gresil',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 194,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 57 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 6 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 6 }, { stat: 'res.air', value: 6 }, { stat: 'res.neutre', value: 6 }],
    description: ''
}

item.pendentif_oton = {
    id: 'pendentif_oton',
    name: 'Pendentif Oton',
    image: 'images/items/Pendentif_Oton.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_quartzesienne',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 194,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 102 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 4 }, { stat: 'heal', value: 9 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 6 }],
    description: ''
}

item.sept_ans_de_malheur = {
    id: 'sept_ans_de_malheur',
    name: 'Sept ans de malheur',
    image: 'images/items/Sept_ans_de_malheur.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_superstitieuse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 194,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 26 }, { stat: 'flatDamage', value: 21 }, { stat: 'res.eau', value: 5 }, { stat: 'res.terre', value: 5 }, { stat: 'res.neutre', value: 3 }],
    description: ''
}

item.kralamansion = {
    id: 'kralamansion',
    name: 'Kralamansion',
    image: 'images/items/Kralamansion.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_ventouse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 194,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 86 }, { stat: 'flatDamage', value: 11 }, { stat: 'critChance', value: 4 }, { stat: 'heal', value: 6 }, { stat: 'dropRate', value: 4 }],
    description: ''
}

item.rouleau_a_patisserie_d_aermyne = {
    id: 'rouleau_a_patisserie_d_aermyne',
    name: 'Rouleau à Pâtisserie d\'Aermyne',
    image: 'images/items/Rouleau_à_Pâtisserie_d_Aermyne.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_d_aermyne',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 194,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: -91 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: -11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.eau', value: 7 }, { stat: 'res.terre', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.cape_d_hel_munster = {
    id: 'cape_d_hel_munster',
    name: 'Cape d\'Hel Munster',
    image: 'images/items/Cape_d_Hel_Munster.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_d_hel_munster',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 194,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 76 }, { stat: 'spd', value: -30 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 2 }, { stat: 'critResPct', value: 11 }, { stat: 'res.eau', value: 5 }, { stat: 'res.air', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.tonfas_de_barberyl = {
    id: 'tonfas_de_barberyl',
    name: 'Tonfas de Barbéryl',
    image: 'images/items/Tonfas_de_Barbéryl.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_barberyl',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 194,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 61 }, { stat: 'spd', value: 51 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 9 }, { stat: 'lifestealPct', value: 7 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 3 }, { stat: 'res.air', value: 3 }],
    description: ''
}

item.ceinture_de_brouce = {
    id: 'ceinture_de_brouce',
    name: 'Ceinture de Brouce',
    image: 'images/items/Ceinture_de_Brouce.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_brouce_boulgoure',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 194,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 101 }, { stat: 'flatDamage', value: 28 }, { stat: 'critChance', value: 4 }, { stat: 'critResPct', value: 11 }, { stat: 'res.neutre', value: 11 }],
    description: ''
}

item.amulette_de_danathor = {
    id: 'amulette_de_danathor',
    name: 'Amulette de Danathor',
    image: 'images/items/Amulette_de_Danathor.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_danathor',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 194,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 101 }, { stat: 'spd', value: 41 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 2 }, { stat: 'res.air', value: 16 }],
    description: ''
}

item.anneau_de_flasho = {
    id: 'anneau_de_flasho',
    name: 'Anneau de Flasho',
    image: 'images/items/Anneau_de_Flasho.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_flasho',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 194,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 57 }, { stat: 'flatDamage', value: 9 }, { stat: 'res.feu', value: 7 }],
    description: ''
}

item.bottes_de_lethaline = {
    id: 'bottes_de_lethaline',
    name: 'Bottes de Léthaline',
    image: 'images/items/Bottes_de_Léthaline.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_lethaline_sigisbul',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 194,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 15 }, { stat: 'spd', value: 56 }, { stat: 'critChance', value: 3 }, { stat: 'critResPct', value: 16 }, { stat: 'heal', value: 11 }, { stat: 'res.neutre', value: 8 }],
    description: ''
}

item.cape_de_lethaline = {
    id: 'cape_de_lethaline',
    name: 'Cape de Léthaline',
    image: 'images/items/Cape_de_Léthaline.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_lethaline_sigisbul',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 194,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 47 }, { stat: 'spd', value: 15 }, { stat: 'res.feu', value: 14 }, { stat: 'res.eau', value: 14 }, { stat: 'res.terre', value: 14 }, { stat: 'res.air', value: 14 }],
    description: ''
}

item.ceinture_de_lethaline = {
    id: 'ceinture_de_lethaline',
    name: 'Ceinture de Léthaline',
    image: 'images/items/Ceinture_de_Léthaline.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_lethaline_sigisbul',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 194,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 15 }, { stat: 'spd', value: 31 }, { stat: 'critChance', value: 7 }, { stat: 'heal', value: 11 }, { stat: 'dropRate', value: 3 }],
    description: ''
}

item.amulette_de_nevark = {
    id: 'amulette_de_nevark',
    name: 'Amulette de Nevark',
    image: 'images/items/Amulette_de_Nevark.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_nevark',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 194,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 76 }, { stat: 'flatDamage', value: 48 }, { stat: 'critDamagePct', value: -21 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 11 }],
    description: ''
}

item.pagne_de_predagob = {
    id: 'pagne_de_predagob',
    name: 'Pagne de Predagob',
    image: 'images/items/Pagne_de_Predagob.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_predagob',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 194,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 51 }, { stat: 'flatDamage', value: 14 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.faux_de_san_jifu = {
    id: 'faux_de_san_jifu',
    name: 'Faux de San Jifu',
    image: 'images/items/Faux_de_San_Jifu.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_san_jifu',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 194,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 6 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: 3 }, { stat: 'lifestealPct', value: 36 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.eau', value: 5 }],
    description: ''
}

item.bottes_de_la_fuji_givrefoux = {
    id: 'bottes_de_la_fuji_givrefoux',
    name: 'Bottes de la Fuji Givrefoux',
    image: 'images/items/Bottes_de_la_Fuji_Givrefoux.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_la_fuji_givrefoux',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 194,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 24 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 11 }, { stat: 'res.neutre', value: 11 }],
    description: ''
}

item.bouclier_gris = {
    id: 'bouclier_gris',
    name: 'Bouclier Gris',
    image: 'images/items/Bouclier_Gris.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_des_marteaux_aigris',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 194,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 41 }, { stat: 'damageReductionPct', value: 4 }, { stat: 'critChance', value: 4 }, { stat: 'res.neutre', value: 11 }],
    description: ''
}

item.cape_du_professeur_xa = {
    id: 'cape_du_professeur_xa',
    name: 'Cape du Professeur Xa',
    image: 'images/items/Cape_du_Professeur_Xa.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_professeur_xa',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 194,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 56 }, { stat: 'flatDamage', value: 28 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 3 }, { stat: 'res.eau', value: 3 }, { stat: 'res.terre', value: 3 }, { stat: 'res.neutre', value: 3 }],
    description: ''
}

item.frimanneau = {
    id: 'frimanneau',
    name: 'Frimanneau',
    image: 'images/items/Frimanneau.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'frimanoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 195,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 9 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.eau', value: 7 }, { stat: 'res.terre', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.ceinture_hyolite = {
    id: 'ceinture_hyolite',
    name: 'Ceinture Hyolite',
    image: 'images/items/Ceinture_Hyolite.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_magmatique',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 195,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 36 }, { stat: 'flatDamage', value: 48 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 7 }, { stat: 'res.terre', value: 4 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.obscture = {
    id: 'obscture',
    name: 'Obscture',
    image: 'images/items/Obscture.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_obscure',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 195,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 28 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.amulette_d_hel_munster = {
    id: 'amulette_d_hel_munster',
    name: 'Amulette d\'Hel Munster',
    image: 'images/items/Amulette_d_Hel_Munster.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_d_hel_munster',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 195,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 86 }, { stat: 'spd', value: -20 }, { stat: 'flatDamage', value: 20 }, { stat: 'critChance', value: 3 }, { stat: 'critResPct', value: 11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 11 }],
    description: ''
}

item.ceinture_d_ogivol = {
    id: 'ceinture_d_ogivol',
    name: 'Ceinture d\'Ogivol',
    image: 'images/items/Ceinture_d_Ogivol.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_d_ogivol',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 195,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 28 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 1 }, { stat: 'res.terre', value: 5 }, { stat: 'res.air', value: 11 }],
    description: ''
}

item.casqnoar = {
    id: 'casqnoar',
    name: 'Casqnoar',
    image: 'images/items/Casqnoar.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_d_ombre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 195,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 61 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 3 }, { stat: 'res.eau', value: 5 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.l_ecu_de_danathor = {
    id: 'l_ecu_de_danathor',
    name: 'L\'Écu de Danathor',
    image: 'images/items/L_Écu_de_Danathor.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_de_danathor',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 195,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 51 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.ceinture_de_nevark = {
    id: 'ceinture_de_nevark',
    name: 'Ceinture de Nevark',
    image: 'images/items/Ceinture_de_Nevark.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_nevark',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 195,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 48 }, { stat: 'critDamagePct', value: -16 }, { stat: 'res.neutre', value: 11 }],
    description: ''
}

item.sangle_de_sylargh = {
    id: 'sangle_de_sylargh',
    name: 'Sangle de Sylargh',
    image: 'images/items/Sangle_de_Sylargh.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_sylargh',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 195,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 51 }, { stat: 'flatDamage', value: 24 }, { stat: 'critChance', value: 3 }, { stat: 'critDamagePct', value: 7 }, { stat: 'dropRate', value: 1 }, { stat: 'res.terre', value: 11 }, { stat: 'res.air', value: 18 }],
    description: ''
}

item.bottes_de_theodoran_ax = {
    id: 'bottes_de_theodoran_ax',
    name: 'Bottes de Théodoran Ax',
    image: 'images/items/Bottes_de_Théodoran_Ax.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_theodoran_ax',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 195,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 63 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 16 }, { stat: 'heal', value: 7 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.coiffe_de_la_fuji_givrefoux = {
    id: 'coiffe_de_la_fuji_givrefoux',
    name: 'Coiffe de la Fuji Givrefoux',
    image: 'images/items/Coiffe_de_la_Fuji_Givrefoux.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_la_fuji_givrefoux',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 195,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 56 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 24 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.eau', value: 5 }],
    description: ''
}

item.chaussures_face = {
    id: 'chaussures_face',
    name: 'Chaussures Face',
    image: 'images/items/Chaussures_Face.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_des_chassouilleurs',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 195,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 46 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 14 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.ceinture_du_comte_razof = {
    id: 'ceinture_du_comte_razof',
    name: 'Ceinture du Comte Razof',
    image: 'images/items/Ceinture_du_Comte_Razof.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_comte_razof',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 195,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 21 }, { stat: 'critChance', value: 3 }, { stat: 'heal', value: 9 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.fleau_du_docteur_eggob = {
    id: 'fleau_du_docteur_eggob',
    name: 'Fléau du Docteur Eggob',
    image: 'images/items/Fléau_du_Docteur_Eggob.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_docteur_eggob',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 195,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 78 }, { stat: 'flatDamage', value: 61 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 4 }, { stat: 'res.terre', value: 4 }],
    description: ''
}

item.ceinture_du_glourseleste = {
    id: 'ceinture_du_glourseleste',
    name: 'Ceinture du Glourséleste',
    image: 'images/items/Ceinture_du_Glourséleste.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_glourseleste',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 195,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 61 }, { stat: 'flatDamage', value: 21 }, { stat: 'critChance', value: 3 }, { stat: 'res.feu', value: 8 }, { stat: 'res.eau', value: 8 }, { stat: 'res.terre', value: 8 }, { stat: 'res.air', value: 8 }, { stat: 'res.neutre', value: 8 }],
    description: ''
}

item.sandales_circulaires_du_kimbo = {
    id: 'sandales_circulaires_du_kimbo',
    name: 'Sandales Circulaires du Kimbo',
    image: 'images/items/Sandales_Circulaires_du_Kimbo.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_kimbo',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 195,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 51 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 6 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 6 }, { stat: 'res.terre', value: 6 }],
    description: ''
}

item.amulette_du_professeur_xa = {
    id: 'amulette_du_professeur_xa',
    name: 'Amulette du Professeur Xa',
    image: 'images/items/Amulette_du_Professeur_Xa.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_professeur_xa',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 195,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 72 }, { stat: 'spd', value: 56 }, { stat: 'flatDamage', value: 44 }, { stat: 'critResPct', value: 16 }, { stat: 'heal', value: 7 }, { stat: 'dropRate', value: 2 }],
    description: ''
}

item.chapeau_lochon = {
    id: 'chapeau_lochon',
    name: 'Chapeau Lochon',
    image: 'images/items/Chapeau_Lochon.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplit',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 195,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 3 }, { stat: 'heal', value: 8 }, { stat: 'res.eau', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.pikano = {
    id: 'pikano',
    name: 'Pikano',
    image: 'images/items/Pikano.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'pikoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 195,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 32 }, { stat: 'flatDamage', value: 27 }, { stat: 'critChance', value: 4 }, { stat: 'res.feu', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.masse_clochecuivre = {
    id: 'masse_clochecuivre',
    name: 'Masse Clochecuivre',
    image: 'images/items/Masse_Clochecuivre.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_clochecuivre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 60 }, { stat: 'spd', value: -30 }, { stat: 'flatDamage', value: 68 }, { stat: 'lifestealPct', value: 15 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 4 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.ceinture_glaciale = {
    id: 'ceinture_glaciale',
    name: 'Ceinture Glaciale',
    image: 'images/items/Ceinture_Glaciale.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_glaciale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 83 }, { stat: 'spd', value: 41 }, { stat: 'flatDamage', value: 16 }, { stat: 'res.eau', value: 6 }, { stat: 'res.air', value: 6 }],
    description: ''
}

item.gresilanneau = {
    id: 'gresilanneau',
    name: 'Grésilanneau',
    image: 'images/items/Grésilanneau.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_gresil',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 6 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 6 }, { stat: 'res.eau', value: 6 }],
    description: ''
}

item.ceinture_instable = {
    id: 'ceinture_instable',
    name: 'Ceinture Instable',
    image: 'images/items/Ceinture_Instable.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_instable',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 30 }, { stat: 'critChance', value: 8 }, { stat: 'heal', value: 8 }, { stat: 'dropRate', value: 3 }],
    description: ''
}

item.calotte_spot = {
    id: 'calotte_spot',
    name: 'Calotte Spot',
    image: 'images/items/Calotte_Spot.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_magmatique',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 48 }, { stat: 'critChance', value: 2 }, { stat: 'critResPct', value: 7 }, { stat: 'res.eau', value: 4 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.chaussures_hau = {
    id: 'chaussures_hau',
    name: 'Chaussures Hau',
    image: 'images/items/Chaussures_Hau.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_obscure',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 28 }, { stat: 'critChance', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.amulette_rangleur = {
    id: 'amulette_rangleur',
    name: 'Amulette Rangleur',
    image: 'images/items/Amulette_Rangleur.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_superstitieuse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 82 }, { stat: 'flatDamage', value: 16 }, { stat: 'critResPct', value: -11 }, { stat: 'heal', value: 6 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 15 }],
    description: ''
}

item.bague_nostik = {
    id: 'bague_nostik',
    name: 'Bague Nostik',
    image: 'images/items/Bague_Nostik.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_superstitieuse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 16 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 4 }, { stat: 'critResPct', value: 11 }, { stat: 'dropRate', value: 2 }],
    description: ''
}

item.cape_d_aermyne = {
    id: 'cape_d_aermyne',
    name: 'Cape d\'Aermyne',
    image: 'images/items/Cape_d_Aermyne.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_d_aermyne',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'spd', value: 41 }, { stat: 'flatDamage', value: -55 }, { stat: 'heal', value: 16 }, { stat: 'res.eau', value: 7 }, { stat: 'res.terre', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.couronne_d_allister = {
    id: 'couronne_d_allister',
    name: 'Couronne d\'Allister',
    image: 'images/items/Couronne_d_Allister.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_d_allister',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 86 }, { stat: 'flatDamage', value: 16 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.anneau_d_henual = {
    id: 'anneau_d_henual',
    name: 'Anneau d\'Henual',
    image: 'images/items/Anneau_d_Henual.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_d_henual',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 33 }, { stat: 'critResPct', value: -7 }, { stat: 'res.feu', value: 8 }, { stat: 'res.terre', value: 8 }, { stat: 'res.neutre', value: 8 }],
    description: ''
}

item.anneau_kturne = {
    id: 'anneau_kturne',
    name: 'Anneau Kturne',
    image: 'images/items/Anneau_Kturne.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_d_ombre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 36 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.amulette_d_oshimo = {
    id: 'amulette_d_oshimo',
    name: 'Amulette d\'Oshimo',
    image: 'images/items/Amulette_d_Oshimo.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_d_oshimo',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 83 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 24 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 1 }, { stat: 'res.neutre', value: 16 }],
    description: ''
}

item.fiole_d_otomai = {
    id: 'fiole_d_otomai',
    name: 'Fiole d\'Otomaï',
    image: 'images/items/Fiole_d_Otomaï.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_d_otomai',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 51 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.epee_d_otomai = {
    id: 'epee_d_otomai',
    name: 'Épée d\'Otomaï',
    image: 'images/items/Épée_d_Otomaï.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_d_otomai',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 76 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 50 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 16 }, { stat: 'res.neutre', value: 16 }],
    description: ''
}

item.ecorce_de_brouce = {
    id: 'ecorce_de_brouce',
    name: 'Écorce de Brouce',
    image: 'images/items/Écorce_de_Brouce.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_de_brouce_boulgoure',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 51 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.coiffe_de_danathor = {
    id: 'coiffe_de_danathor',
    name: 'Coiffe de Danathor',
    image: 'images/items/Coiffe_de_Danathor.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_danathor',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 86 }, { stat: 'spd', value: 41 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 4 }, { stat: 'res.neutre', value: 11 }],
    description: ''
}

item.masque_de_klime = {
    id: 'masque_de_klime',
    name: 'Masque de Klime',
    image: 'images/items/Masque_de_Klime.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_klime',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 3 }, { stat: 'res.feu', value: 7 }, { stat: 'res.eau', value: 11 }],
    description: ''
}

item.bottes_de_missiz_frizz = {
    id: 'bottes_de_missiz_frizz',
    name: 'Bottes de Missiz Frizz',
    image: 'images/items/Bottes_de_Missiz_Frizz.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_missiz_frizz',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 43 }, { stat: 'spd', value: -5 }, { stat: 'flatDamage', value: 28 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 8 }, { stat: 'res.neutre', value: 8 }],
    description: ''
}

item.casque_de_missiz_frizz = {
    id: 'casque_de_missiz_frizz',
    name: 'Casque de Missiz Frizz',
    image: 'images/items/Casque_de_Missiz_Frizz.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_missiz_frizz',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 62 }, { stat: 'flatDamage', value: 28 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.cape_de_nevark = {
    id: 'cape_de_nevark',
    name: 'Cape de Nevark',
    image: 'images/items/Cape_de_Nevark.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_nevark',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 48 }, { stat: 'critDamagePct', value: -16 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 6 }, { stat: 'res.terre', value: 6 }],
    description: ''
}

item.amulette_de_nileza = {
    id: 'amulette_de_nileza',
    name: 'Amulette de Nileza',
    image: 'images/items/Amulette_de_Nileza.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_nileza',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 101 }, { stat: 'flatDamage', value: 16 }, { stat: 'critDamagePct', value: 8 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.geta_de_padgref = {
    id: 'geta_de_padgref',
    name: 'Geta de Padgref',
    image: 'images/items/Geta_de_Padgref.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_padgref',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 63 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 12 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 16 }, { stat: 'heal', value: 8 }, { stat: 'dropRate', value: 3 }, { stat: 'res.feu', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.ceinture_de_san_jifu = {
    id: 'ceinture_de_san_jifu',
    name: 'Ceinture de San Jifu',
    image: 'images/items/Ceinture_de_San_Jifu.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_san_jifu',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 56 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.capuche_de_sylargh = {
    id: 'capuche_de_sylargh',
    name: 'Capuche de Sylargh',
    image: 'images/items/Capuche_de_Sylargh.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_sylargh',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 24 }, { stat: 'critChance', value: 3 }, { stat: 'res.feu', value: 10 }, { stat: 'res.air', value: 10 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.cape_hiculteur = {
    id: 'cape_hiculteur',
    name: 'Cape Hiculteur',
    image: 'images/items/Cape_Hiculteur.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_l_apiculteur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 47 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 3 }, { stat: 'heal', value: 4 }, { stat: 'dropRate', value: 1 }, { stat: 'res.terre', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.amulette_ikete = {
    id: 'amulette_ikete',
    name: 'Amulette Ikête',
    image: 'images/items/Amulette_Ikête.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_cartographe',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 18 }, { stat: 'critDamagePct', value: -16 }, { stat: 'critResPct', value: 11 }, { stat: 'heal', value: 9 }, { stat: 'dropRate', value: 3 }, { stat: 'res.feu', value: 7 }, { stat: 'res.neutre', value: 11 }],
    description: ''
}

item.bottes_du_glourseleste = {
    id: 'bottes_du_glourseleste',
    name: 'Bottes du Glourséleste',
    image: 'images/items/Bottes_du_Glourséleste.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_glourseleste',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 42 }, { stat: 'spd', value: 46 }, { stat: 'flatDamage', value: 24 }, { stat: 'critChance', value: 2 }, { stat: 'res.terre', value: 8 }, { stat: 'res.neutre', value: 8 }],
    description: ''
}

item.amulette_du_kanimate = {
    id: 'amulette_du_kanimate',
    name: 'Amulette du Kanimate',
    image: 'images/items/Amulette_du_Kanimate.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_kanimate',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 56 }, { stat: 'spd', value: -30 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 4 }, { stat: 'heal', value: 7 }, { stat: 'res.feu', value: 16 }, { stat: 'res.air', value: 16 }],
    description: ''
}

item.le_kim = {
    id: 'le_kim',
    name: 'Le Kim',
    image: 'images/items/Le_Kim.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_kimbo',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 51 }, { stat: 'flatDamage', value: 6 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 3 }, { stat: 'res.feu', value: 6 }, { stat: 'res.terre', value: 6 }, { stat: 'res.air', value: 6 }],
    description: ''
}

item.cape_matelassee = {
    id: 'cape_matelassee',
    name: 'Cape Matelassée',
    image: 'images/items/Cape_Matelassée.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplit',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 14 }, { stat: 'critDamagePct', value: 7 }, { stat: 'critResPct', value: -7 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 4 }, { stat: 'res.terre', value: 4 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.pantoufles_emar = {
    id: 'pantoufles_emar',
    name: 'Pantoufles Émar',
    image: 'images/items/Pantoufles_Émar.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplit',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 66 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 14 }, { stat: 'heal', value: 4 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.casquipik = {
    id: 'casquipik',
    name: 'Casquipik',
    image: 'images/items/Casquipik.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'pikoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 196,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 36 }, { stat: 'flatDamage', value: 48 }, { stat: 'critDamagePct', value: 9 }, { stat: 'dropRate', value: 3 }, { stat: 'res.feu', value: 6 }, { stat: 'res.air', value: 6 }],
    description: ''
}

item.frimature = {
    id: 'frimature',
    name: 'Frimature',
    image: 'images/items/Frimature.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'frimanoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 7 }, { stat: 'dropRate', value: 1 }, { stat: 'res.terre', value: 10 }, { stat: 'res.air', value: 10 }, { stat: 'res.neutre', value: 10 }],
    description: ''
}

item.anneau_glacial = {
    id: 'anneau_glacial',
    name: 'Anneau Glacial',
    image: 'images/items/Anneau_Glacial.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_glaciale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 11 }, { stat: 'critChance', value: 3 }, { stat: 'critResPct', value: 16 }, { stat: 'dropRate', value: 2 }],
    description: ''
}

item.cape_glaciale = {
    id: 'cape_glaciale',
    name: 'Cape Glaciale',
    image: 'images/items/Cape_Glaciale.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_glaciale',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 76 }, { stat: 'flatDamage', value: 12 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.terre', value: 16 }],
    description: ''
}

item.bague_gloursonne = {
    id: 'bague_gloursonne',
    name: 'Bague Gloursonne',
    image: 'images/items/Bague_Gloursonne.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_gloursonne',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 24 }, { stat: 'critChance', value: 3 }, { stat: 'heal', value: 6 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.phylactere_mic = {
    id: 'phylactere_mic',
    name: 'Phylactère Mic',
    image: 'images/items/Phylactère_Mic.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_magmatique',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 42 }, { stat: 'critChance', value: 2 }, { stat: 'critResPct', value: 7 }, { stat: 'dropRate', value: 2 }],
    description: ''
}

item.amulule = {
    id: 'amulule',
    name: 'Amulule',
    image: 'images/items/Amulule.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_obscure',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 28 }, { stat: 'critChance', value: 4 }],
    description: ''
}

item.bonnet_vicieux = {
    id: 'bonnet_vicieux',
    name: 'Bonnet Vicieux',
    image: 'images/items/Bonnet_Vicieux.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_vicieuse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 24 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 6 }, { stat: 'res.eau', value: 6 }],
    description: ''
}

item.anneau_d_allister = {
    id: 'anneau_d_allister',
    name: 'Anneau d\'Allister',
    image: 'images/items/Anneau_d_Allister.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_d_allister',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 51 }, { stat: 'flatDamage', value: 11 }, { stat: 'critChance', value: 4 }, { stat: 'critResPct', value: 11 }, { stat: 'dropRate', value: 2 }],
    description: ''
}

item.egide_d_allister = {
    id: 'egide_d_allister',
    name: 'Égide d\'Allister',
    image: 'images/items/Égide_d_Allister.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_d_allister',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 51 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.ceinture_d_henual = {
    id: 'ceinture_d_henual',
    name: 'Ceinture d\'Henual',
    image: 'images/items/Ceinture_d_Henual.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_d_henual',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 33 }, { stat: 'critChance', value: 2 }, { stat: 'critResPct', value: -11 }, { stat: 'dropRate', value: 3 }, { stat: 'res.eau', value: 6 }, { stat: 'res.terre', value: 6 }, { stat: 'res.neutre', value: 6 }],
    description: ''
}

item.amulette_d_otomai = {
    id: 'amulette_d_otomai',
    name: 'Amulette d\'Otomaï',
    image: 'images/items/Amulette_d_Otomaï.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_d_otomai',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 96 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 4 }, { stat: 'heal', value: 8 }, { stat: 'res.feu', value: 5 }, { stat: 'res.eau', value: 5 }],
    description: ''
}

item.bottes_de_brouce = {
    id: 'bottes_de_brouce',
    name: 'Bottes de Brouce',
    image: 'images/items/Bottes_de_Brouce.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_brouce_boulgoure',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 61 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 28 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 3 }, { stat: 'res.eau', value: 7 }, { stat: 'res.air', value: 11 }],
    description: ''
}

item.cape_de_klime = {
    id: 'cape_de_klime',
    name: 'Cape de Klime',
    image: 'images/items/Cape_de_Klime.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_klime',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 66 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.nev_arc = {
    id: 'nev_arc',
    name: 'Nev\'Arc',
    image: 'images/items/Nev_Arc.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_nevark',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 56 }, { stat: 'flatDamage', value: 70 }, { stat: 'critDamagePct', value: -21 }, { stat: 'lifestealPct', value: 22 }, { stat: 'res.eau', value: 11 }],
    description: ''
}

item.anneau_de_padgref = {
    id: 'anneau_de_padgref',
    name: 'Anneau de Padgref',
    image: 'images/items/Anneau_de_Padgref.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_padgref',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 71 }, { stat: 'atk', value: 56 }, { stat: 'flatDamage', value: 10 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 8 }, { stat: 'res.eau', value: 6 }, { stat: 'res.terre', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.amulette_de_viti_glourson = {
    id: 'amulette_de_viti_glourson',
    name: 'Amulette de Viti Glourson',
    image: 'images/items/Amulette_de_Viti_Glourson.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_viti_glourson',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 76 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 28 }, { stat: 'critChance', value: 3 }, { stat: 'critResPct', value: 21 }],
    description: ''
}

item.cape_tif = {
    id: 'cape_tif',
    name: 'Cape Tif',
    image: 'images/items/Cape_Tif.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_des_chassouilleurs',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 3 }, { stat: 'res.feu', value: 7 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.bottes_des_voyageurs = {
    id: 'bottes_des_voyageurs',
    name: 'Bottes des Voyageurs',
    image: 'images/items/Bottes_des_Voyageurs.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_des_voyageurs_dimensionnels',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 21 }, { stat: 'spd', value: 41 }, { stat: 'flatDamage', value: 7 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 4 }, { stat: 'res.air', value: 3 }],
    description: ''
}

item.bouclier_des_voyageurs = {
    id: 'bouclier_des_voyageurs',
    name: 'Bouclier des Voyageurs',
    image: 'images/items/Bouclier_des_Voyageurs.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_des_voyageurs_dimensionnels',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 63 }, { stat: 'spd', value: 16 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 4 }, { stat: 'res.eau', value: 4 }, { stat: 'res.terre', value: 4 }],
    description: ''
}

item.capuche_des_voyageurs = {
    id: 'capuche_des_voyageurs',
    name: 'Capuche des Voyageurs',
    image: 'images/items/Capuche_des_Voyageurs.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_des_voyageurs_dimensionnels',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 61 }, { stat: 'spd', value: 26 }, { stat: 'flatDamage', value: 7 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 7 }, { stat: 'res.air', value: 3 }],
    description: ''
}

item.ceinture_des_voyageurs = {
    id: 'ceinture_des_voyageurs',
    name: 'Ceinture des Voyageurs',
    image: 'images/items/Ceinture_des_Voyageurs.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_des_voyageurs_dimensionnels',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 21 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 7 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 4 }, { stat: 'res.air', value: 3 }],
    description: ''
}

item.gant_des_voyageurs = {
    id: 'gant_des_voyageurs',
    name: 'Gant des Voyageurs',
    image: 'images/items/Gant_des_Voyageurs.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_des_voyageurs_dimensionnels',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 53 }, { stat: 'spd', value: 26 }, { stat: 'flatDamage', value: 5 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 4 }, { stat: 'res.air', value: 3 }],
    description: ''
}

item.portail_des_voyageurs = {
    id: 'portail_des_voyageurs',
    name: 'Portail des Voyageurs',
    image: 'images/items/Portail_des_Voyageurs.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_des_voyageurs_dimensionnels',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 68 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 5 }, { stat: 'res.eau', value: 7 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.cape_parition = {
    id: 'cape_parition',
    name: 'Cape Parition',
    image: 'images/items/Cape_Parition.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_cartographe',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: -11 }, { stat: 'critResPct', value: 11 }, { stat: 'heal', value: 7 }, { stat: 'res.air', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.chapeau_du_comte_razof = {
    id: 'chapeau_du_comte_razof',
    name: 'Chapeau du Comte Razof',
    image: 'images/items/Chapeau_du_Comte_Razof.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_comte_razof',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 51 }, { stat: 'flatDamage', value: 21 }, { stat: 'heal', value: 9 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.cape_du_glourseleste = {
    id: 'cape_du_glourseleste',
    name: 'Cape du Glourséleste',
    image: 'images/items/Cape_du_Glourséleste.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_glourseleste',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 24 }, { stat: 'critChance', value: 4 }, { stat: 'heal', value: 7 }, { stat: 'res.feu', value: 8 }, { stat: 'res.eau', value: 8 }, { stat: 'res.air', value: 8 }],
    description: ''
}

item.coiffe_du_kanimate = {
    id: 'coiffe_du_kanimate',
    name: 'Coiffe du Kanimate',
    image: 'images/items/Coiffe_du_Kanimate.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_kanimate',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 21 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 8 }, { stat: 'heal', value: 7 }, { stat: 'dropRate', value: 3 }, { stat: 'res.eau', value: 5 }],
    description: ''
}

item.bottes_du_pere_fwetar = {
    id: 'bottes_du_pere_fwetar',
    name: 'Bottes du Père Fwetar',
    image: 'images/items/Bottes_du_Père_Fwetar.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_pere_fwetar',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 42 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 35 }, { stat: 'critResPct', value: 21 }, { stat: 'dropRate', value: 2 }],
    description: ''
}

item.bivalve = {
    id: 'bivalve',
    name: 'Bivalve',
    image: 'images/items/Bivalve.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_du_frigostien_douteux',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 93 }, { stat: 'critChance', value: 4 }, { stat: 'heal', value: 11 }, { stat: 'res.eau', value: 7 }, { stat: 'res.neutre', value: 2 }],
    description: ''
}

item.zarbappeau = {
    id: 'zarbappeau',
    name: 'Zarbappeau',
    image: 'images/items/Zarbappeau.png',
    type: 'equipment',
    slot: 'arme',
    set: 'zarbinoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 63 }, { stat: 'flatDamage', value: 26 }, { stat: 'critChance', value: 2 }, { stat: 'critResPct', value: 11 }, { stat: 'res.feu', value: 3 }, { stat: 'res.terre', value: 3 }, { stat: 'res.neutre', value: 3 }],
    description: ''
}

item.zarbaudrier = {
    id: 'zarbaudrier',
    name: 'Zarbaudrier',
    image: 'images/items/Zarbaudrier.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'zarbinoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 63 }, { stat: 'flatDamage', value: 7 }, { stat: 'critChance', value: 2 }, { stat: 'res.feu', value: 3 }, { stat: 'res.terre', value: 3 }],
    description: ''
}

item.zarbottes = {
    id: 'zarbottes',
    name: 'Zarbottes',
    image: 'images/items/Zarbottes.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'zarbinoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 63 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 7 }, { stat: 'critChance', value: 2 }, { stat: 'critResPct', value: 11 }, { stat: 'res.eau', value: 3 }, { stat: 'res.air', value: 3 }],
    description: ''
}

item.zarbouclier = {
    id: 'zarbouclier',
    name: 'Zarbouclier',
    image: 'images/items/Zarbouclier.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'zarbinoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 197,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 63 }, { stat: 'critChance', value: 2 }, { stat: 'res.eau', value: 3 }, { stat: 'res.air', value: 3 }, { stat: 'res.neutre', value: 3 }],
    description: ''
}

item.heaume_clochecuivre = {
    id: 'heaume_clochecuivre',
    name: 'Heaume Clochecuivre',
    image: 'images/items/Heaume_Clochecuivre.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_clochecuivre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 198,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 48 }, { stat: 'spd', value: -30 }, { stat: 'flatDamage', value: 28 }, { stat: 'heal', value: 11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 4 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.alliance_gloursonne = {
    id: 'alliance_gloursonne',
    name: 'Alliance Gloursonne',
    image: 'images/items/Alliance_Gloursonne.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_gloursonne',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 198,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 56 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 16 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 5 }, { stat: 'res.terre', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.batonnet_ronien = {
    id: 'batonnet_ronien',
    name: 'Bâtonnet Ronien',
    image: 'images/items/Bâtonnet_Ronien.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_quartzesienne',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 198,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 47 }, { stat: 'flatDamage', value: 38 }, { stat: 'critChance', value: 2 }, { stat: 'heal', value: 9 }, { stat: 'res.feu', value: 11 }, { stat: 'res.eau', value: 11 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.bottes_vicieuses = {
    id: 'bottes_vicieuses',
    name: 'Bottes Vicieuses',
    image: 'images/items/Bottes_Vicieuses.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_vicieuse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 198,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 24 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 6 }, { stat: 'dropRate', value: 3 }, { stat: 'res.air', value: 10 }, { stat: 'res.neutre', value: 10 }],
    description: ''
}

item.coiffe_d_aermyne = {
    id: 'coiffe_d_aermyne',
    name: 'Coiffe d\'Aermyne',
    image: 'images/items/Coiffe_d_Aermyne.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_d_aermyne',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 198,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 15 }, { stat: 'flatDamage', value: -55 }, { stat: 'dropRate', value: 3 }, { stat: 'res.feu', value: 7 }, { stat: 'res.air', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.coiffe_d_hel_munster = {
    id: 'coiffe_d_hel_munster',
    name: 'Coiffe d\'Hel Munster',
    image: 'images/items/Coiffe_d_Hel_Munster.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_d_hel_munster',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 198,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 83 }, { stat: 'spd', value: -30 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: 4 }, { stat: 'critResPct', value: 16 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 11 }],
    description: ''
}

item.bottes_refois = {
    id: 'bottes_refois',
    name: 'Bottes Refois',
    image: 'images/items/Bottes_Refois.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_d_ombre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 198,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 51 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 3 }, { stat: 'res.feu', value: 7 }, { stat: 'res.terre', value: 9 }],
    description: ''
}

item.coiffe_d_oshimo = {
    id: 'coiffe_d_oshimo',
    name: 'Coiffe d\'Oshimo',
    image: 'images/items/Coiffe_d_Oshimo.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_d_oshimo',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 198,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 16 }, { stat: 'spd', value: 41 }, { stat: 'flatDamage', value: 33 }, { stat: 'critChance', value: 2 }, { stat: 'critResPct', value: 7 }, { stat: 'dropRate', value: 3 }],
    description: ''
}

item.anneau_de_brouce = {
    id: 'anneau_de_brouce',
    name: 'Anneau de Brouce',
    image: 'images/items/Anneau_de_Brouce.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_brouce_boulgoure',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 198,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 22 }, { stat: 'res.feu', value: 7 }],
    description: ''
}

item.ceinture_de_klime = {
    id: 'ceinture_de_klime',
    name: 'Ceinture de Klime',
    image: 'images/items/Ceinture_de_Klime.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_klime',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 198,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 61 }, { stat: 'flatDamage', value: 8 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 8 }, { stat: 'dropRate', value: 3 }, { stat: 'res.feu', value: 16 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.alliance_de_missiz_frizz = {
    id: 'alliance_de_missiz_frizz',
    name: 'Alliance de Missiz Frizz',
    image: 'images/items/Alliance_de_Missiz_Frizz.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_missiz_frizz',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 198,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 7 }, { stat: 'heal', value: 7 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.cape_de_nileza = {
    id: 'cape_de_nileza',
    name: 'Cape de Nileza',
    image: 'images/items/Cape_de_Nileza.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_nileza',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 198,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 76 }, { stat: 'flatDamage', value: 11 }, { stat: 'heal', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.coiffe_de_padgref = {
    id: 'coiffe_de_padgref',
    name: 'Coiffe de Padgref',
    image: 'images/items/Coiffe_de_Padgref.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_padgref',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 198,
    stats: [{ stat: 'maxHp', value: 101 }, { stat: 'atk', value: 56 }, { stat: 'spd', value: 41 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 5 }, { stat: 'critDamagePct', value: 11 }, { stat: 'heal', value: 6 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 8 }, { stat: 'res.terre', value: 6 }, { stat: 'res.air', value: 6 }],
    description: ''
}

item.cape_de_sylargh = {
    id: 'cape_de_sylargh',
    name: 'Cape de Sylargh',
    image: 'images/items/Cape_de_Sylargh.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_sylargh',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 198,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 61 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.eau', value: 5 }],
    description: ''
}

item.cape_de_theodoran_ax = {
    id: 'cape_de_theodoran_ax',
    name: 'Cape de Théodoran Ax',
    image: 'images/items/Cape_de_Théodoran_Ax.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_theodoran_ax',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 198,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 46 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 4 }, { stat: 'heal', value: 8 }, { stat: 'res.terre', value: 12 }],
    description: ''
}

item.pagne_de_viti_glourson = {
    id: 'pagne_de_viti_glourson',
    name: 'Pagne de Viti Glourson',
    image: 'images/items/Pagne_de_Viti_Glourson.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_viti_glourson',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 198,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 28 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 3 }, { stat: 'res.eau', value: 5 }, { stat: 'res.terre', value: 1 }],
    description: ''
}

item.amulette_du_glourseleste = {
    id: 'amulette_du_glourseleste',
    name: 'Amulette du Glourséleste',
    image: 'images/items/Amulette_du_Glourséleste.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_glourseleste',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 198,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 81 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 21 }, { stat: 'critChance', value: 3 }],
    description: ''
}

item.cape_du_kanimate = {
    id: 'cape_du_kanimate',
    name: 'Cape du Kanimate',
    image: 'images/items/Cape_du_Kanimate.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_kanimate',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 198,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 36 }, { stat: 'flatDamage', value: 21 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.ceinture_du_pere_fwetar = {
    id: 'ceinture_du_pere_fwetar',
    name: 'Ceinture du Père Fwetar',
    image: 'images/items/Ceinture_du_Père_Fwetar.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_pere_fwetar',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 198,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 35 }, { stat: 'critChance', value: 3 }, { stat: 'critResPct', value: 21 }, { stat: 'dropRate', value: 2 }],
    description: ''
}

item.pikottes = {
    id: 'pikottes',
    name: 'Pikottes',
    image: 'images/items/Pikottes.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'pikoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 198,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 46 }, { stat: 'spd', value: 46 }, { stat: 'flatDamage', value: 33 }, { stat: 'critDamagePct', value: 7 }, { stat: 'res.feu', value: 9 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.epee_gloursonne = {
    id: 'epee_gloursonne',
    name: 'Épée Gloursonne',
    image: 'images/items/Épée_Gloursonne.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_gloursonne',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 199,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'spd', value: 41 }, { stat: 'flatDamage', value: 27 }, { stat: 'critChance', value: 6 }, { stat: 'critResPct', value: 7 }, { stat: 'dropRate', value: 3 }, { stat: 'res.feu', value: 7 }, { stat: 'res.eau', value: 7 }, { stat: 'res.terre', value: 7 }, { stat: 'res.air', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.anneau_instable = {
    id: 'anneau_instable',
    name: 'Anneau Instable',
    image: 'images/items/Anneau_Instable.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_instable',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 199,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'res.feu', value: 4 }, { stat: 'res.eau', value: 4 }, { stat: 'res.terre', value: 4 }, { stat: 'res.air', value: 4 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.bague_instable = {
    id: 'bague_instable',
    name: 'Bague Instable',
    image: 'images/items/Bague_Instable.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_instable',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 199,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 62 }, { stat: 'flatDamage', value: 20 }],
    description: ''
}

item.kralano = {
    id: 'kralano',
    name: 'Kralano',
    image: 'images/items/Kralano.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_ventouse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 199,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 2 }, { stat: 'heal', value: 6 }, { stat: 'dropRate', value: 1 }, { stat: 'res.neutre', value: 12 }],
    description: ''
}

item.anneau_vicieux = {
    id: 'anneau_vicieux',
    name: 'Anneau Vicieux',
    image: 'images/items/Anneau_Vicieux.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_vicieuse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 199,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 39 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 7 }, { stat: 'critChance', value: 3 }, { stat: 'critDamagePct', value: 7 }, { stat: 'res.terre', value: 11 }],
    description: ''
}

item.bottes_d_oshimo = {
    id: 'bottes_d_oshimo',
    name: 'Bottes d\'Oshimo',
    image: 'images/items/Bottes_d_Oshimo.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_d_oshimo',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 199,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 16 }, { stat: 'spd', value: 46 }, { stat: 'flatDamage', value: 24 }, { stat: 'critChance', value: 2 }, { stat: 'res.feu', value: 7 }],
    description: ''
}

item.bottes_de_nileza = {
    id: 'bottes_de_nileza',
    name: 'Bottes de Nileza',
    image: 'images/items/Bottes_de_Nileza.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_nileza',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 199,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 8 }, { stat: 'res.terre', value: 8 }, { stat: 'res.air', value: 8 }],
    description: ''
}

item.pot_de_miel_de_viti_glourson = {
    id: 'pot_de_miel_de_viti_glourson',
    name: 'Pot de miel de Viti Glourson',
    image: 'images/items/Pot_de_miel_de_Viti_Glourson.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_viti_glourson',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 199,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 63 }, { stat: 'flatDamage', value: 28 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 3 }, { stat: 'res.eau', value: 1 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.bouclier_alveole = {
    id: 'bouclier_alveole',
    name: 'Bouclier alvéolé',
    image: 'images/items/Bouclier_alvéolé.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_de_l_apiculteur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 199,
    stats: [{ stat: 'maxHp', value: 151 }, { stat: 'atk', value: 41 }, { stat: 'critChance', value: 4 }, { stat: 'critResPct', value: 16 }, { stat: 'res.feu', value: 4 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.bandeau_culaire = {
    id: 'bandeau_culaire',
    name: 'Bandeau Culaire',
    image: 'images/items/Bandeau_Culaire.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_cartographe',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 199,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 4 }, { stat: 'critResPct', value: 16 }, { stat: 'dropRate', value: 3 }, { stat: 'res.eau', value: 11 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.masque_du_glourseleste = {
    id: 'masque_du_glourseleste',
    name: 'Masque du Glourséleste',
    image: 'images/items/Masque_du_Glourséleste.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_glourseleste',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 199,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 62 }, { stat: 'flatDamage', value: 24 }, { stat: 'critChance', value: 2 }, { stat: 'critResPct', value: 11 }],
    description: ''
}

item.anneau_du_pere_fwetar = {
    id: 'anneau_du_pere_fwetar',
    name: 'Anneau du Père Fwetar',
    image: 'images/items/Anneau_du_Père_Fwetar.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_pere_fwetar',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 199,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 35 }, { stat: 'critChance', value: 2 }, { stat: 'critResPct', value: 16 }],
    description: ''
}

item.anneau_en_grithril = {
    id: 'anneau_en_grithril',
    name: 'Anneau en Grithril',
    image: 'images/items/Anneau_en_Grithril.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'grithriloplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 15 }, { stat: 'critChance', value: 2 }, { stat: 'critResPct', value: 11 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.casque_en_grithril = {
    id: 'casque_en_grithril',
    name: 'Casque en Grithril',
    image: 'images/items/Casque_en_Grithril.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'grithriloplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 51 }, { stat: 'flatDamage', value: 21 }, { stat: 'critResPct', value: 16 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.ceinture_en_grithril = {
    id: 'ceinture_en_grithril',
    name: 'Ceinture en Grithril',
    image: 'images/items/Ceinture_en_Grithril.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'grithriloplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 27 }, { stat: 'critChance', value: 3 }, { stat: 'critResPct', value: 16 }, { stat: 'res.air', value: 11 }],
    description: ''
}

item.bottarpille = {
    id: 'bottarpille',
    name: 'Bottarpille',
    image: 'images/items/Bottarpille.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'harpinoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'spd', value: 15 }, { stat: 'critChance', value: 2 }, { stat: 'heal', value: 11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.capille = {
    id: 'capille',
    name: 'Capille',
    image: 'images/items/Capille.png',
    type: 'equipment',
    slot: 'cape',
    set: 'harpinoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 41 }, { stat: 'critChance', value: 2 }, { stat: 'heal', value: 11 }, { stat: 'res.feu', value: 7 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.harpendentif = {
    id: 'harpendentif',
    name: 'Harpendentif',
    image: 'images/items/Harpendentif.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'harpinoplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 65 }, { stat: 'critChance', value: 4 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.chagrin_de_cire = {
    id: 'chagrin_de_cire',
    name: 'Chagrin de Cire',
    image: 'images/items/Chagrin_de_Cire.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'malediction_de_cire_momore',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 451 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 36 }, { stat: 'dropRate', value: 2 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.claymomore = {
    id: 'claymomore',
    name: 'Claymomore',
    image: 'images/items/Claymomore.png',
    type: 'equipment',
    slot: 'arme',
    set: 'malediction_de_cire_momore',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 451 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 108 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 2 }, { stat: 'res.eau', value: 2 }, { stat: 'res.terre', value: 2 }, { stat: 'res.air', value: 2 }, { stat: 'res.neutre', value: 2 }],
    description: ''
}

item.lourd_fardeau = {
    id: 'lourd_fardeau',
    name: 'Lourd Fardeau',
    image: 'images/items/Lourd_Fardeau.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'malediction_de_cire_momore',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 76 }, { stat: 'flatDamage', value: 28 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.triste_sceau = {
    id: 'triste_sceau',
    name: 'Triste Sceau',
    image: 'images/items/Triste_Sceau.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'malediction_de_cire_momore',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 28 }, { stat: 'dropRate', value: 1 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.ames_hurlantes = {
    id: 'ames_hurlantes',
    name: 'Âmes Hurlantes',
    image: 'images/items/Âmes_Hurlantes.png',
    type: 'equipment',
    slot: 'cape',
    set: 'malediction_de_cire_momore',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 451 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 51 }, { stat: 'flatDamage', value: 28 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.eternelle_poursuite = {
    id: 'eternelle_poursuite',
    name: 'Éternelle Poursuite',
    image: 'images/items/Éternelle_Poursuite.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'malediction_de_cire_momore',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 44 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 7 }],
    description: ''
}

item.amertume_de_belladone = {
    id: 'amertume_de_belladone',
    name: 'Amertume de Belladone',
    image: 'images/items/Amertume_de_Belladone.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'malefices_d_ephedrya',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 21 }, { stat: 'critResPct', value: 7 }, { stat: 'res.eau', value: 3 }, { stat: 'res.air', value: 3 }],
    description: ''
}

item.cruaute_de_belladone = {
    id: 'cruaute_de_belladone',
    name: 'Cruauté de Belladone',
    image: 'images/items/Cruauté_de_Belladone.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'malefices_d_ephedrya',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 41 }, { stat: 'flatDamage', value: 28 }, { stat: 'critResPct', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.mur_de_ronces = {
    id: 'mur_de_ronces',
    name: 'Mur de Ronces',
    image: 'images/items/Mur_de_Ronces.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'malefices_d_ephedrya',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 21 }, { stat: 'critResPct', value: 16 }, { stat: 'res.neutre', value: 11 }],
    description: ''
}

item.pilier_d_ephedrya = {
    id: 'pilier_d_ephedrya',
    name: 'Pilier d\'Ephedrya',
    image: 'images/items/Pilier_d_Ephedrya.png',
    type: 'equipment',
    slot: 'arme',
    set: 'malefices_d_ephedrya',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 401 }, { stat: 'atk', value: 71 }, { stat: 'spd', value: -15 }, { stat: 'flatDamage', value: -114 }, { stat: 'critChance', value: -10 }, { stat: 'critResPct', value: 21 }, { stat: 'res.feu', value: 5 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.potence_d_ephedrya = {
    id: 'potence_d_ephedrya',
    name: 'Potence d\'Ephedrya',
    image: 'images/items/Potence_d_Ephedrya.png',
    type: 'equipment',
    slot: 'arme',
    set: 'malefices_d_ephedrya',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 451 }, { stat: 'atk', value: 26 }, { stat: 'flatDamage', value: -104 }, { stat: 'critChance', value: -10 }, { stat: 'critResPct', value: 21 }, { stat: 'res.eau', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.tendresse_de_belladone = {
    id: 'tendresse_de_belladone',
    name: 'Tendresse de Belladone',
    image: 'images/items/Tendresse_de_Belladone.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'malefices_d_ephedrya',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 21 }, { stat: 'critResPct', value: 7 }, { stat: 'res.feu', value: 3 }, { stat: 'res.terre', value: 3 }],
    description: ''
}

item.amibou = {
    id: 'amibou',
    name: 'Amibou',
    image: 'images/items/Amibou.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplibou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 123 }, { stat: 'flatDamage', value: 11 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 5 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.capibou = {
    id: 'capibou',
    name: 'Capibou',
    image: 'images/items/Capibou.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplibou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 73 }, { stat: 'flatDamage', value: 11 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 7 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 25 }],
    description: ''
}

item.chapibou = {
    id: 'chapibou',
    name: 'Chapibou',
    image: 'images/items/Chapibou.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplibou',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 73 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 7 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 16 }, { stat: 'res.neutre', value: 16 }],
    description: ''
}

item.gelano_ankarton = {
    id: 'gelano_ankarton',
    name: 'Gelano Ankarton',
    image: 'images/items/Gelano_Ankarton.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_ankarton',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [],
    description: ''
}

item.cape_ardente = {
    id: 'cape_ardente',
    name: 'Cape Ardente',
    image: 'images/items/Cape_Ardente.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_ardente',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 51 }, { stat: 'flatDamage', value: 11 }, { stat: 'critChance', value: -10 }, { stat: 'heal', value: 7 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.chaussures_ardentes = {
    id: 'chaussures_ardentes',
    name: 'Chaussures Ardentes',
    image: 'images/items/Chaussures_Ardentes.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_ardente',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 61 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 11 }, { stat: 'critChance', value: -10 }, { stat: 'heal', value: 9 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.masque_ardent = {
    id: 'masque_ardent',
    name: 'Masque Ardent',
    image: 'images/items/Masque_Ardent.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_ardente',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 98 }, { stat: 'flatDamage', value: 11 }, { stat: 'critChance', value: -10 }, { stat: 'heal', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.alliance_brulame = {
    id: 'alliance_brulame',
    name: 'Alliance Brûlâme',
    image: 'images/items/Alliance_Brûlâme.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_brulame',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 20 }, { stat: 'res.eau', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.masque_brulame = {
    id: 'masque_brulame',
    name: 'Masque Brûlâme',
    image: 'images/items/Masque_Brûlâme.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_brulame',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 51 }, { stat: 'flatDamage', value: 36 }, { stat: 'critChance', value: 3 }, { stat: 'critResPct', value: 16 }, { stat: 'res.eau', value: 5 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.pompes_funebres = {
    id: 'pompes_funebres',
    name: 'Pompes Funèbres',
    image: 'images/items/Pompes_Funèbres.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_brulame',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 36 }, { stat: 'critChance', value: 2 }, { stat: 'critResPct', value: 16 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.amulette_cryochrone = {
    id: 'amulette_cryochrone',
    name: 'Amulette Cryochrone',
    image: 'images/items/Amulette_Cryochrone.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_cryochrone',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 76 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 20 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 1 }, { stat: 'res.terre', value: 6 }, { stat: 'res.air', value: 6 }],
    description: ''
}

item.anneau_cryochrone = {
    id: 'anneau_cryochrone',
    name: 'Anneau Cryochrone',
    image: 'images/items/Anneau_Cryochrone.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_cryochrone',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 16 }, { stat: 'critDamagePct', value: 7 }, { stat: 'heal', value: 7 }],
    description: ''
}

item.coiffe_cryochrone = {
    id: 'coiffe_cryochrone',
    name: 'Coiffe Cryochrone',
    image: 'images/items/Coiffe_Cryochrone.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_cryochrone',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 56 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: 4 }, { stat: 'critResPct', value: 7 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 11 }, { stat: 'res.terre', value: 11 }],
    description: ''
}

item.baguette_heroclite = {
    id: 'baguette_heroclite',
    name: 'Baguette Héroclite',
    image: 'images/items/Baguette_Héroclite.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_ensevelie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 66 }, { stat: 'heal', value: 11 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.cape_solution = {
    id: 'cape_solution',
    name: 'Cape Solution',
    image: 'images/items/Cape_Solution.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_ensevelie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 118 }, { stat: 'flatDamage', value: 11 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.amulette_luminescente = {
    id: 'amulette_luminescente',
    name: 'Amulette Luminescente',
    image: 'images/items/Amulette_Luminescente.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_luminescente',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 108 }, { stat: 'flatDamage', value: 21 }, { stat: 'critChance', value: 3 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.cape_luminescente = {
    id: 'cape_luminescente',
    name: 'Cape Luminescente',
    image: 'images/items/Cape_Luminescente.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_luminescente',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 98 }, { stat: 'flatDamage', value: 27 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.ceinture_luminescente = {
    id: 'ceinture_luminescente',
    name: 'Ceinture Luminescente',
    image: 'images/items/Ceinture_Luminescente.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_luminescente',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 83 }, { stat: 'flatDamage', value: 27 }, { stat: 'critChance', value: 3 }, { stat: 'res.feu', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.anneau_lunaire = {
    id: 'anneau_lunaire',
    name: 'Anneau Lunaire',
    image: 'images/items/Anneau_Lunaire.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_lunaire',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 11 }, { stat: 'dropRate', value: 2 }],
    description: ''
}

item.bottes_lunaires = {
    id: 'bottes_lunaires',
    name: 'Bottes Lunaires',
    image: 'images/items/Bottes_Lunaires.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_lunaire',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 51 }, { stat: 'spd', value: 46 }, { stat: 'flatDamage', value: 22 }, { stat: 'heal', value: 4 }],
    description: ''
}

item.collier_lunaire = {
    id: 'collier_lunaire',
    name: 'Collier Lunaire',
    image: 'images/items/Collier_Lunaire.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_lunaire',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 86 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 32 }, { stat: 'dropRate', value: 3 }],
    description: ''
}

item.amulette_martegel = {
    id: 'amulette_martegel',
    name: 'Amulette Martegel',
    image: 'images/items/Amulette_Martegel.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_martegel',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 96 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: -10 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.cape_martegel = {
    id: 'cape_martegel',
    name: 'Cape Martegel',
    image: 'images/items/Cape_Martegel.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_martegel',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 91 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: -10 }, { stat: 'heal', value: 9 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.masquegel = {
    id: 'masquegel',
    name: 'Masquegel',
    image: 'images/items/Masquegel.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_martegel',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 61 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: -10 }, { stat: 'res.eau', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.anneau_toriete = {
    id: 'anneau_toriete',
    name: 'Anneau Toriété',
    image: 'images/items/Anneau_Toriété.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_noyee',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 15 }, { stat: 'res.feu', value: 5 }, { stat: 'res.eau', value: 5 }],
    description: ''
}

item.collier_rophante = {
    id: 'collier_rophante',
    name: 'Collier Rophante',
    image: 'images/items/Collier_Rophante.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_noyee',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 401 }, { stat: 'atk', value: 35 }, { stat: 'spd', value: 15 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.cape_paztek = {
    id: 'cape_paztek',
    name: 'Cape Paztek',
    image: 'images/items/Cape_Paztek.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_paztek',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 78 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: -10 }, { stat: 'res.terre', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.couteaux_sacrificiels = {
    id: 'couteaux_sacrificiels',
    name: 'Couteaux Sacrificiels',
    image: 'images/items/Couteaux_Sacrificiels.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_paztek',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 36 }, { stat: 'flatDamage', value: 32 }, { stat: 'critResPct', value: -30 }, { stat: 'lifestealPct', value: 24 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.masque_paztek = {
    id: 'masque_paztek',
    name: 'Masque Paztek',
    image: 'images/items/Masque_Paztek.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_paztek',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 103 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: -10 }, { stat: 'res.eau', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.sandales_paztek = {
    id: 'sandales_paztek',
    name: 'Sandales Paztek',
    image: 'images/items/Sandales_Paztek.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_paztek',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 93 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: -10 }, { stat: 'critResPct', value: -30 }, { stat: 'res.feu', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.bottes_owesli = {
    id: 'bottes_owesli',
    name: 'Bottes Owesli',
    image: 'images/items/Bottes_Owesli.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_pnose',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 78 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 32 }, { stat: 'res.terre', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.ceintrigue = {
    id: 'ceintrigue',
    name: 'Ceintrigue',
    image: 'images/items/Ceintrigue.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_pnose',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 88 }, { stat: 'flatDamage', value: 32 }, { stat: 'critChance', value: 3 }, { stat: 'heal', value: 11 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.talisman_igans = {
    id: 'talisman_igans',
    name: 'Talisman Igans',
    image: 'images/items/Talisman_Igans.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_pnose',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 91 }, { stat: 'flatDamage', value: 32 }, { stat: 'critChance', value: 3 }, { stat: 'res.terre', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.amulette_possedee = {
    id: 'amulette_possedee',
    name: 'Amulette Possédée',
    image: 'images/items/Amulette_Possédée.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_possedee',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 133 }, { stat: 'flatDamage', value: 27 }, { stat: 'critChance', value: 2 }, { stat: 'res.terre', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.anneau_possede = {
    id: 'anneau_possede',
    name: 'Anneau Possédé',
    image: 'images/items/Anneau_Possédé.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_possedee',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 56 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 1 }, { stat: 'res.air', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.bouclier_possede = {
    id: 'bouclier_possede',
    name: 'Bouclier Possédé',
    image: 'images/items/Bouclier_Possédé.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_possedee',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 103 }, { stat: 'res.feu', value: 5 }, { stat: 'res.eau', value: 5 }],
    description: ''
}

item.ceinture_possedee = {
    id: 'ceinture_possedee',
    name: 'Ceinture Possédée',
    image: 'images/items/Ceinture_Possédée.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_possedee',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 84 }, { stat: 'flatDamage', value: 33 }, { stat: 'critChance', value: 3 }, { stat: 'res.terre', value: 11 }],
    description: ''
}

item.collier_rhoarim = {
    id: 'collier_rhoarim',
    name: 'Collier Rhoarim',
    image: 'images/items/Collier_Rhoarim.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_rhoarim',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 76 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 21 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 11 }],
    description: ''
}

item.faux_ve = {
    id: 'faux_ve',
    name: 'Faux\'ve',
    image: 'images/items/Faux_ve.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_rhoarim',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 40 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 11 }, { stat: 'lifestealPct', value: 13 }, { stat: 'dropRate', value: 3 }, { stat: 'res.feu', value: 4 }, { stat: 'res.eau', value: 4 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.masse_osseuse = {
    id: 'masse_osseuse',
    name: 'Masse Osseuse',
    image: 'images/items/Masse_Osseuse.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_rhoarim',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 42 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 11 }, { stat: 'lifestealPct', value: 14 }, { stat: 'dropRate', value: 3 }, { stat: 'res.terre', value: 4 }, { stat: 'res.air', value: 4 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.pagne_rhoarim = {
    id: 'pagne_rhoarim',
    name: 'Pagne Rhoarim',
    image: 'images/items/Pagne_Rhoarim.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_rhoarim',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 16 }, { stat: 'flatDamage', value: 21 }, { stat: 'critChance', value: 3 }, { stat: 'critDamagePct', value: 11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 11 }],
    description: ''
}

item.cape_de_cranonier = {
    id: 'cape_de_cranonier',
    name: 'Cape de Crânonier',
    image: 'images/items/Cape_de_Crânonier.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_submergee',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 3 }, { stat: 'res.eau', value: 7 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.chapeau_de_tournoye = {
    id: 'chapeau_de_tournoye',
    name: 'Chapeau de Tournoyé',
    image: 'images/items/Chapeau_de_Tournoyé.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_submergee',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 61 }, { stat: 'flatDamage', value: 11 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 5 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.lance_horsele = {
    id: 'lance_horsele',
    name: 'Lance Horselé',
    image: 'images/items/Lance_Horselé.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_submergee',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 61 }, { stat: 'flatDamage', value: 60 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 9 }, { stat: 'res.feu', value: 7 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.sangle_oriole = {
    id: 'sangle_oriole',
    name: 'Sangle Oriole',
    image: 'images/items/Sangle_Oriole.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_submergee',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 76 }, { stat: 'flatDamage', value: 11 }, { stat: 'critChance', value: 3 }, { stat: 'critDamagePct', value: 9 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 7 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.amulette_seculaire = {
    id: 'amulette_seculaire',
    name: 'Amulette Séculaire',
    image: 'images/items/Amulette_Séculaire.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_seculaire',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 74 }, { stat: 'flatDamage', value: 16 }, { stat: 'critResPct', value: 11 }, { stat: 'dropRate', value: 3 }, { stat: 'res.feu', value: 6 }, { stat: 'res.neutre', value: 6 }],
    description: ''
}

item.ceinture_seculaire = {
    id: 'ceinture_seculaire',
    name: 'Ceinture Séculaire',
    image: 'images/items/Ceinture_Séculaire.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_seculaire',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 61 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 7 }, { stat: 'critChance', value: 5 }, { stat: 'critDamagePct', value: 11 }, { stat: 'heal', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.coiffe_seculaire = {
    id: 'coiffe_seculaire',
    name: 'Coiffe Séculaire',
    image: 'images/items/Coiffe_Séculaire.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_seculaire',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 51 }, { stat: 'flatDamage', value: 14 }, { stat: 'heal', value: 8 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 5 }, { stat: 'res.terre', value: 5 }, { stat: 'res.air', value: 11 }],
    description: ''
}

item.bague_trithon = {
    id: 'bague_trithon',
    name: 'Bague Trithon',
    image: 'images/items/Bague_Trithon.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_trithon',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 22 }, { stat: 'critDamagePct', value: 16 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 5 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.bottes_trithon = {
    id: 'bottes_trithon',
    name: 'Bottes Trithon',
    image: 'images/items/Bottes_Trithon.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_trithon',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 401 }, { stat: 'atk', value: 57 }, { stat: 'spd', value: 15 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 21 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.masque_trithon = {
    id: 'masque_trithon',
    name: 'Masque Trithon',
    image: 'images/items/Masque_Trithon.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_trithon',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 42 }, { stat: 'spd', value: 61 }, { stat: 'critChance', value: 3 }, { stat: 'critDamagePct', value: 21 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }],
    description: ''
}

item.amulette_volcanique = {
    id: 'amulette_volcanique',
    name: 'Amulette Volcanique',
    image: 'images/items/Amulette_Volcanique.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_volcanique',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 86 }, { stat: 'flatDamage', value: 27 }, { stat: 'critChance', value: 4 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.bouclier_de_solar = {
    id: 'bouclier_de_solar',
    name: 'Bouclier de Solar',
    image: 'images/items/Bouclier_de_Solar.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_volcanique',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 51 }, { stat: 'res.feu', value: 5 }, { stat: 'res.terre', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.sabots_volcaniques = {
    id: 'sabots_volcaniques',
    name: 'Sabots Volcaniques',
    image: 'images/items/Sabots_Volcaniques.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_volcanique',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 21 }, { stat: 'critChance', value: 3 }, { stat: 'heal', value: 9 }, { stat: 'res.eau', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.sac_volcanique = {
    id: 'sac_volcanique',
    name: 'Sac Volcanique',
    image: 'images/items/Sac_Volcanique.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_volcanique',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 61 }, { stat: 'flatDamage', value: 33 }, { stat: 'critChance', value: 2 }, { stat: 'heal', value: 9 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.amulette_volkorne = {
    id: 'amulette_volkorne',
    name: 'Amulette Volkorne',
    image: 'images/items/Amulette_Volkorne.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_volkorne',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 116 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }],
    description: ''
}

item.anneau_volkorne = {
    id: 'anneau_volkorne',
    name: 'Anneau Volkorne',
    image: 'images/items/Anneau_Volkorne.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_volkorne',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 81 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 4 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.arc_volkorne = {
    id: 'arc_volkorne',
    name: 'Arc Volkorne',
    image: 'images/items/Arc_Volkorne.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_volkorne',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 51 }, { stat: 'flatDamage', value: 99 }, { stat: 'critChance', value: 4 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.casque_volkorne = {
    id: 'casque_volkorne',
    name: 'Casque Volkorne',
    image: 'images/items/Casque_Volkorne.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_volkorne',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 81 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.ceinture_volkorne = {
    id: 'ceinture_volkorne',
    name: 'Ceinture Volkorne',
    image: 'images/items/Ceinture_Volkorne.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_volkorne',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 96 }, { stat: 'flatDamage', value: 32 }, { stat: 'critChance', value: 4 }, { stat: 'res.terre', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.bouclier_d_anerice = {
    id: 'bouclier_d_anerice',
    name: 'Bouclier d\'Anerice',
    image: 'images/items/Bouclier_d_Anerice.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_d_anerice',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'damageReductionPct', value: 7 }, { stat: 'critChance', value: 4 }],
    description: ''
}

item.cape_d_anerice = {
    id: 'cape_d_anerice',
    name: 'Cape d\'Anerice',
    image: 'images/items/Cape_d_Anerice.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_d_anerice',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 401 }, { stat: 'critChance', value: 7 }, { stat: 'dropRate', value: 3 }, { stat: 'res.feu', value: 5 }, { stat: 'res.eau', value: 5 }, { stat: 'res.terre', value: 5 }, { stat: 'res.air', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.masque_d_anerice = {
    id: 'masque_d_anerice',
    name: 'Masque d\'Anerice',
    image: 'images/items/Masque_d_Anerice.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_d_anerice',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 401 }, { stat: 'atk', value: 15 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 4 }, { stat: 'res.eau', value: 4 }, { stat: 'res.terre', value: 4 }, { stat: 'res.air', value: 4 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.cape_d_atcham = {
    id: 'cape_d_atcham',
    name: 'Cape d\'Atcham',
    image: 'images/items/Cape_d_Atcham.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_d_atcham',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 27 }, { stat: 'critChance', value: 3 }, { stat: 'critDamagePct', value: 11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.sabres_d_atcham = {
    id: 'sabres_d_atcham',
    name: 'Sabres d\'Atcham',
    image: 'images/items/Sabres_d_Atcham.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_d_atcham',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 22 }, { stat: 'flatDamage', value: 81 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 11 }, { stat: 'res.feu', value: 7 }],
    description: ''
}

item.sandales_d_atcham = {
    id: 'sandales_d_atcham',
    name: 'Sandales d\'Atcham',
    image: 'images/items/Sandales_d_Atcham.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_d_atcham',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 21 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 7 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.amulette_d_ilyzaelle = {
    id: 'amulette_d_ilyzaelle',
    name: 'Amulette d\'Ilyzaelle',
    image: 'images/items/Amulette_d_Ilyzaelle.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_d_ilyzaelle',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 111 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: -10 }, { stat: 'res.feu', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.bouclier_d_ilyzaelle = {
    id: 'bouclier_d_ilyzaelle',
    name: 'Bouclier d\'Ilyzaelle',
    image: 'images/items/Bouclier_d_Ilyzaelle.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_d_ilyzaelle',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 51 }, { stat: 'critChance', value: -10 }, { stat: 'res.eau', value: 7 }, { stat: 'res.air', value: 7 }, { stat: 'res.neutre', value: 3 }],
    description: ''
}

item.casque_d_ilyzaelle = {
    id: 'casque_d_ilyzaelle',
    name: 'Casque d\'Ilyzaelle',
    image: 'images/items/Casque_d_Ilyzaelle.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_d_ilyzaelle',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 71 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: -10 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.chaussons_de_macrab = {
    id: 'chaussons_de_macrab',
    name: 'Chaussons de Macrab',
    image: 'images/items/Chaussons_de_Macrab.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_bethel',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 27 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.culotte_de_bethel = {
    id: 'culotte_de_bethel',
    name: 'Culotte de Bethel',
    image: 'images/items/Culotte_de_Bethel.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_bethel',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 33 }, { stat: 'res.eau', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.masque_de_funespadon = {
    id: 'masque_de_funespadon',
    name: 'Masque de Funespadon',
    image: 'images/items/Masque_de_Funespadon.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_bethel',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 61 }, { stat: 'flatDamage', value: 33 }, { stat: 'critChance', value: 3 }, { stat: 'res.feu', value: 7 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.alliance_de_corruption = {
    id: 'alliance_de_corruption',
    name: 'Alliance de Corruption',
    image: 'images/items/Alliance_de_Corruption.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_corruption',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 56 }, { stat: 'critChance', value: 2 }, { stat: 'res.terre', value: 4 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.bague_de_corruption = {
    id: 'bague_de_corruption',
    name: 'Bague de Corruption',
    image: 'images/items/Bague_de_Corruption.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_corruption',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 7 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.ceinturonce_de_corruption = {
    id: 'ceinturonce_de_corruption',
    name: 'Ceinturonce de Corruption',
    image: 'images/items/Ceinturonce_de_Corruption.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_corruption',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 16 }, { stat: 'res.terre', value: 4 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.crocanneau = {
    id: 'crocanneau',
    name: 'Crocanneau',
    image: 'images/items/Crocanneau.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_crocuzko',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 56 }, { stat: 'critChance', value: 3 }, { stat: 'critResPct', value: 11 }],
    description: ''
}

item.croclier = {
    id: 'croclier',
    name: 'Croclier',
    image: 'images/items/Croclier.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_de_crocuzko',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 61 }, { stat: 'critChance', value: 4 }, { stat: 'res.eau', value: 11 }],
    description: ''
}

item.anneau_de_culbut_uf = {
    id: 'anneau_de_culbut_uf',
    name: 'Anneau de Culbutœuf',
    image: 'images/items/Anneau_de_Culbutœuf.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_culbut_uf',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 63 }, { stat: 'flatDamage', value: 28 }, { stat: 'dropRate', value: 1 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.arc_de_culbut_uf = {
    id: 'arc_de_culbut_uf',
    name: 'Arc de Culbutœuf',
    image: 'images/items/Arc_de_Culbutœuf.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_culbut_uf',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 83 }, { stat: 'flatDamage', value: 78 }, { stat: 'lifestealPct', value: 14 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.disque_de_culbut_uf = {
    id: 'disque_de_culbut_uf',
    name: 'Disque de Culbutœuf',
    image: 'images/items/Disque_de_Culbutœuf.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_de_culbut_uf',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 88 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 9 }, { stat: 'res.terre', value: 4 }],
    description: ''
}

item.belier_de_gargandyas = {
    id: 'belier_de_gargandyas',
    name: 'Bélier de Gargandyas',
    image: 'images/items/Bélier_de_Gargandyas.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_de_gargandyas',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 52 }, { stat: 'spd', value: 41 }, { stat: 'damageReductionPct', value: 3 }, { stat: 'res.feu', value: 4 }, { stat: 'res.eau', value: 4 }, { stat: 'res.terre', value: 4 }, { stat: 'res.air', value: 4 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.collier_de_gargandyas = {
    id: 'collier_de_gargandyas',
    name: 'Collier de Gargandyas',
    image: 'images/items/Collier_de_Gargandyas.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_gargandyas',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 451 }, { stat: 'atk', value: 158 }, { stat: 'spd', value: -15 }, { stat: 'damageReductionPct', value: 6 }, { stat: 'critChance', value: 3 }],
    description: ''
}

item.fureur_de_gargandyas = {
    id: 'fureur_de_gargandyas',
    name: 'Fureur de Gargandyas',
    image: 'images/items/Fureur_de_Gargandyas.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_gargandyas',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 451 }, { stat: 'atk', value: 61 }, { stat: 'spd', value: 11 }, { stat: 'flatDamage', value: 148 }, { stat: 'damageReductionPct', value: 3 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 16 }],
    description: ''
}

item.griffe_de_gargandyas = {
    id: 'griffe_de_gargandyas',
    name: 'Griffe de Gargandyas',
    image: 'images/items/Griffe_de_Gargandyas.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_gargandyas',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 451 }, { stat: 'atk', value: 88 }, { stat: 'spd', value: 41 }, { stat: 'flatDamage', value: 156 }, { stat: 'damageReductionPct', value: 3 }, { stat: 'critChance', value: 4 }],
    description: ''
}

item.amulette_de_gein = {
    id: 'amulette_de_gein',
    name: 'Amulette de Gein',
    image: 'images/items/Amulette_de_Gein.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_gein',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 101 }, { stat: 'flatDamage', value: 21 }, { stat: 'critDamagePct', value: 21 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.ceinture_de_gein = {
    id: 'ceinture_de_gein',
    name: 'Ceinture de Gein',
    image: 'images/items/Ceinture_de_Gein.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_gein',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 56 }, { stat: 'flatDamage', value: 21 }, { stat: 'critDamagePct', value: 21 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 11 }],
    description: ''
}

item.chapeau_de_gein = {
    id: 'chapeau_de_gein',
    name: 'Chapeau de Gein',
    image: 'images/items/Chapeau_de_Gein.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_gein',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 51 }, { stat: 'flatDamage', value: 33 }, { stat: 'critChance', value: 2 }, { stat: 'res.terre', value: 7 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.bouclier_de_glourdorak = {
    id: 'bouclier_de_glourdorak',
    name: 'Bouclier de Glourdorak',
    image: 'images/items/Bouclier_de_Glourdorak.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_de_glourdorak',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 42 }, { stat: 'critChance', value: 4 }, { stat: 'heal', value: 7 }, { stat: 'dropRate', value: 3 }, { stat: 'res.eau', value: 4 }, { stat: 'res.terre', value: 7 }, { stat: 'res.air', value: 2 }],
    description: ''
}

item.cape_de_glourdorak = {
    id: 'cape_de_glourdorak',
    name: 'Cape de Glourdorak',
    image: 'images/items/Cape_de_Glourdorak.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_glourdorak',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 30 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 21 }, { stat: 'critResPct', value: -30 }, { stat: 'heal', value: 7 }, { stat: 'dropRate', value: 3 }, { stat: 'res.eau', value: 4 }, { stat: 'res.terre', value: 2 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.masse_de_glourdorak = {
    id: 'masse_de_glourdorak',
    name: 'Masse de Glourdorak',
    image: 'images/items/Masse_de_Glourdorak.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_glourdorak',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 451 }, { stat: 'atk', value: 32 }, { stat: 'critChance', value: 5 }, { stat: 'critDamagePct', value: 16 }, { stat: 'heal', value: 7 }, { stat: 'lifestealPct', value: 27 }, { stat: 'dropRate', value: 4 }, { stat: 'res.neutre', value: 11 }],
    description: ''
}

item.ceste_de_guerre = {
    id: 'ceste_de_guerre',
    name: 'Ceste de Guerre',
    image: 'images/items/Ceste_de_Guerre.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_guerre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 7 }, { stat: 'critChance', value: 3 }, { stat: 'critDamagePct', value: 11 }, { stat: 'heal', value: -10 }, { stat: 'res.terre', value: 4 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.forteresse_de_guerre = {
    id: 'forteresse_de_guerre',
    name: 'Forteresse de Guerre',
    image: 'images/items/Forteresse_de_Guerre.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_de_guerre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 46 }, { stat: 'critChance', value: 3 }, { stat: 'res.feu', value: 11 }, { stat: 'res.neutre', value: 3 }],
    description: ''
}

item.heaume_de_guerre = {
    id: 'heaume_de_guerre',
    name: 'Heaume de Guerre',
    image: 'images/items/Heaume_de_Guerre.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_guerre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 401 }, { stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 11 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 7 }, { stat: 'res.terre', value: 7 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.solerets_de_guerre = {
    id: 'solerets_de_guerre',
    name: 'Solerets de Guerre',
    image: 'images/items/Solerets_de_Guerre.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_guerre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 81 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 3 }, { stat: 'critDamagePct', value: 11 }, { stat: 'res.eau', value: 4 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.boucle_d_oreille_de_kongoku = {
    id: 'boucle_d_oreille_de_kongoku',
    name: 'Boucle d\'oreille de Kongoku',
    image: 'images/items/Boucle_d_oreille_de_Kongoku.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_kongoku',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 21 }, { stat: 'spd', value: 41 }, { stat: 'critChance', value: 7 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.cape_de_kongoku = {
    id: 'cape_de_kongoku',
    name: 'Cape de Kongoku',
    image: 'images/items/Cape_de_Kongoku.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_kongoku',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 36 }, { stat: 'critChance', value: 5 }, { stat: 'critResPct', value: 16 }, { stat: 'dropRate', value: 3 }, { stat: 'res.feu', value: 5 }, { stat: 'res.eau', value: 5 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.ceinture_de_kongoku = {
    id: 'ceinture_de_kongoku',
    name: 'Ceinture de Kongoku',
    image: 'images/items/Ceinture_de_Kongoku.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_kongoku',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 36 }, { stat: 'spd', value: 41 }, { stat: 'critChance', value: 4 }, { stat: 'critResPct', value: 11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.eau', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.bandana_de_mama_ayuto = {
    id: 'bandana_de_mama_ayuto',
    name: 'Bandana de Mama Ayuto',
    image: 'images/items/Bandana_de_Mama_Ayuto.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_mama_ayuto',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 68 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: 3 }, { stat: 'heal', value: 16 }, { stat: 'res.terre', value: 3 }, { stat: 'res.air', value: 3 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.paravoile_de_mama_ayuto = {
    id: 'paravoile_de_mama_ayuto',
    name: 'Paravoile de Mama Ayuto',
    image: 'images/items/Paravoile_de_Mama_Ayuto.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_de_mama_ayuto',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 103 }, { stat: 'spd', value: 15 }, { stat: 'heal', value: 11 }, { stat: 'res.terre', value: 7 }, { stat: 'res.air', value: 3 }],
    description: ''
}

item.rouleau_de_mama_ayuto = {
    id: 'rouleau_de_mama_ayuto',
    name: 'Rouleau de Mama Ayuto',
    image: 'images/items/Rouleau_de_Mama_Ayuto.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_mama_ayuto',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 401 }, { stat: 'atk', value: 103 }, { stat: 'flatDamage', value: 50 }, { stat: 'critChance', value: 2 }, { stat: 'heal', value: 7 }, { stat: 'lifestealPct', value: 9 }, { stat: 'res.eau', value: 5 }, { stat: 'res.air', value: 3 }],
    description: ''
}

item.boulon_de_mekamouth = {
    id: 'boulon_de_mekamouth',
    name: 'Boulon de Mekamouth',
    image: 'images/items/Boulon_de_Mekamouth.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_mekamouth',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 46 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 4 }, { stat: 'res.terre', value: 4 }],
    description: ''
}

item.beche_de_mekamouth = {
    id: 'beche_de_mekamouth',
    name: 'Bêche de Mekamouth',
    image: 'images/items/Bêche_de_Mekamouth.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_mekamouth',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 401 }, { stat: 'atk', value: 6 }, { stat: 'flatDamage', value: 83 }, { stat: 'critChance', value: 2 }, { stat: 'lifestealPct', value: 12 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 4 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.ecrou_de_mekamouth = {
    id: 'ecrou_de_mekamouth',
    name: 'Écrou de Mekamouth',
    image: 'images/items/Écrou_de_Mekamouth.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_mekamouth',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'flatDamage', value: 28 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.bottes_de_meno = {
    id: 'bottes_de_meno',
    name: 'Bottes de Meno',
    image: 'images/items/Bottes_de_Meno.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_meno',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 66 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 3 }, { stat: 'heal', value: 9 }, { stat: 'res.terre', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.cape_de_meno = {
    id: 'cape_de_meno',
    name: 'Cape de Meno',
    image: 'images/items/Cape_de_Meno.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_meno',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 11 }, { stat: 'heal', value: 9 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.casquette_de_meno = {
    id: 'casquette_de_meno',
    name: 'Casquette de Meno',
    image: 'images/items/Casquette_de_Meno.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_meno',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 11 }, { stat: 'heal', value: 9 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.convoitise_de_misere = {
    id: 'convoitise_de_misere',
    name: 'Convoitise de Misère',
    image: 'images/items/Convoitise_de_Misère.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_misere',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.corset_de_misere = {
    id: 'corset_de_misere',
    name: 'Corset de Misère',
    image: 'images/items/Corset_de_Misère.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_misere',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 51 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 16 }, { stat: 'res.feu', value: 4 }, { stat: 'res.terre', value: 4 }],
    description: ''
}

item.solerets_de_misere = {
    id: 'solerets_de_misere',
    name: 'Solerets de Misère',
    image: 'images/items/Solerets_de_Misère.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_misere',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 66 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 28 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 7 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.anneau_de_nidas = {
    id: 'anneau_de_nidas',
    name: 'Anneau de Nidas',
    image: 'images/items/Anneau_de_Nidas.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_nidas',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 9 }, { stat: 'heal', value: 7 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.couronne_de_nidas = {
    id: 'couronne_de_nidas',
    name: 'Couronne de Nidas',
    image: 'images/items/Couronne_de_Nidas.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_nidas',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 11 }, { stat: 'critChance', value: 4 }, { stat: 'heal', value: 11 }, { stat: 'res.terre', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.tongues_de_nidas = {
    id: 'tongues_de_nidas',
    name: 'Tongues de Nidas',
    image: 'images/items/Tongues_de_Nidas.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_nidas',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 56 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 11 }, { stat: 'dropRate', value: 3 }, { stat: 'res.eau', value: 7 }, { stat: 'res.air', value: 9 }],
    description: ''
}

item.amulette_de_pol_ouatnos = {
    id: 'amulette_de_pol_ouatnos',
    name: 'Amulette de Pol Ouatnos',
    image: 'images/items/Amulette_de_Pol_Ouatnos.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_pol_ouatnos',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 86 }, { stat: 'spd', value: 15 }, { stat: 'critChance', value: 2 }, { stat: 'critResPct', value: 21 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 5 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.anneau_de_pol_ouatnos = {
    id: 'anneau_de_pol_ouatnos',
    name: 'Anneau de Pol Ouatnos',
    image: 'images/items/Anneau_de_Pol_Ouatnos.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_pol_ouatnos',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 15 }, { stat: 'spd', value: 15 }, { stat: 'critChance', value: 3 }, { stat: 'res.terre', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.aiguille_de_psikopompe = {
    id: 'aiguille_de_psikopompe',
    name: 'Aiguille de Psikopompe',
    image: 'images/items/Aiguille_de_Psikopompe.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_psikopompe',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 401 }, { stat: 'atk', value: 77 }, { stat: 'spd', value: -15 }, { stat: 'flatDamage', value: 58 }, { stat: 'critResPct', value: 11 }, { stat: 'lifestealPct', value: 14 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.bouton_de_psikopompe = {
    id: 'bouton_de_psikopompe',
    name: 'Bouton de Psikopompe',
    image: 'images/items/Bouton_de_Psikopompe.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_de_psikopompe',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 77 }, { stat: 'critResPct', value: 11 }, { stat: 'heal', value: 11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.gant_de_psikopompe = {
    id: 'gant_de_psikopompe',
    name: 'Gant de Psikopompe',
    image: 'images/items/Gant_de_Psikopompe.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_psikopompe',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 42 }, { stat: 'flatDamage', value: 10 }, { stat: 'critResPct', value: 11 }, { stat: 'heal', value: 4 }, { stat: 'dropRate', value: 1 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.anneau_rifique = {
    id: 'anneau_rifique',
    name: 'Anneau Rifique',
    image: 'images/items/Anneau_Rifique.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_r_lyugluglu',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 61 }, { stat: 'flatDamage', value: 10 }, { stat: 'critResPct', value: 11 }, { stat: 'heal', value: 11 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.casque_cyclopeen = {
    id: 'casque_cyclopeen',
    name: 'Casque Cyclopéen',
    image: 'images/items/Casque_Cyclopéen.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_r_lyugluglu',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 22 }, { stat: 'critResPct', value: 16 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.pendentif_mignon_de_koutoulou = {
    id: 'pendentif_mignon_de_koutoulou',
    name: 'Pendentif mignon de Koutoulou',
    image: 'images/items/Pendentif_mignon_de_Koutoulou.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_r_lyugluglu',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 96 }, { stat: 'flatDamage', value: 22 }, { stat: 'critResPct', value: 16 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 5 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.dora_de_servitude = {
    id: 'dora_de_servitude',
    name: 'Dora de Servitude',
    image: 'images/items/Dora_de_Servitude.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_servitude',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 401 }, { stat: 'atk', value: 76 }, { stat: 'spd', value: 41 }, { stat: 'flatDamage', value: 11 }, { stat: 'critChance', value: 2 }, { stat: 'res.eau', value: 4 }, { stat: 'res.terre', value: 2 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.manteau_de_servitude = {
    id: 'manteau_de_servitude',
    name: 'Manteau de Servitude',
    image: 'images/items/Manteau_de_Servitude.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_servitude',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 81 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 3 }, { stat: 'res.eau', value: 4 }, { stat: 'res.terre', value: 4 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.echarpe_de_servitude = {
    id: 'echarpe_de_servitude',
    name: 'Écharpe de Servitude',
    image: 'images/items/Écharpe_de_Servitude.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_servitude',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 131 }, { stat: 'spd', value: 41 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 2 }, { stat: 'res.eau', value: 4 }, { stat: 'res.terre', value: 4 }],
    description: ''
}

item.chevelure_de_tal_kasha = {
    id: 'chevelure_de_tal_kasha',
    name: 'Chevelure de Tal Kasha',
    image: 'images/items/Chevelure_de_Tal_Kasha.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_tal_kasha',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 10 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 21 }, { stat: 'res.eau', value: 5 }, { stat: 'res.air', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.nemes_de_tal_kasha = {
    id: 'nemes_de_tal_kasha',
    name: 'Némès de Tal Kasha',
    image: 'images/items/Némès_de_Tal_Kasha.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_tal_kasha',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 32 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 11 }, { stat: 'res.feu', value: 5 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.sandales_de_tal_kasha = {
    id: 'sandales_de_tal_kasha',
    name: 'Sandales de Tal Kasha',
    image: 'images/items/Sandales_de_Tal_Kasha.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_tal_kasha',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 7 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.baguette_de_torkelonia = {
    id: 'baguette_de_torkelonia',
    name: 'Baguette de Torkélonia',
    image: 'images/items/Baguette_de_Torkélonia.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_torkelonia',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 62 }, { stat: 'flatDamage', value: 80 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 16 }, { stat: 'dropRate', value: 3 }, { stat: 'res.eau', value: 11 }, { stat: 'res.terre', value: 11 }],
    description: ''
}

item.carapace_de_torkelonia = {
    id: 'carapace_de_torkelonia',
    name: 'Carapace de Torkélonia',
    image: 'images/items/Carapace_de_Torkélonia.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_torkelonia',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 36 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 8 }, { stat: 'res.feu', value: 6 }, { stat: 'res.air', value: 6 }],
    description: ''
}

item.corne_de_torkelonia = {
    id: 'corne_de_torkelonia',
    name: 'Corne de Torkélonia',
    image: 'images/items/Corne_de_Torkélonia.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_torkelonia',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 36 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 8 }, { stat: 'dropRate', value: 3 }, { stat: 'res.terre', value: 6 }, { stat: 'res.neutre', value: 6 }],
    description: ''
}

item.amulette_voldelor = {
    id: 'amulette_voldelor',
    name: 'Amulette Voldelor',
    image: 'images/items/Amulette_Voldelor.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_voldelor',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 86 }, { stat: 'flatDamage', value: 18 }, { stat: 'critDamagePct', value: 11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.bottes_voldelor = {
    id: 'bottes_voldelor',
    name: 'Bottes Voldelor',
    image: 'images/items/Bottes_Voldelor.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_voldelor',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 51 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 7 }],
    description: ''
}

item.ceinture_voldelor = {
    id: 'ceinture_voldelor',
    name: 'Ceinture Voldelor',
    image: 'images/items/Ceinture_Voldelor.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_voldelor',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 22 }, { stat: 'critDamagePct', value: 11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.cagoule_de_vortex = {
    id: 'cagoule_de_vortex',
    name: 'Cagoule de Vortex',
    image: 'images/items/Cagoule_de_Vortex.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_vortex',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: 3 }, { stat: 'heal', value: 9 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.ceinture_de_vortex = {
    id: 'ceinture_de_vortex',
    name: 'Ceinture de Vortex',
    image: 'images/items/Ceinture_de_Vortex.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_vortex',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 3 }, { stat: 'heal', value: 9 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.sabots_de_vortex = {
    id: 'sabots_de_vortex',
    name: 'Sabots de Vortex',
    image: 'images/items/Sabots_de_Vortex.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_vortex',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 51 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: 3 }, { stat: 'critResPct', value: 16 }, { stat: 'heal', value: 9 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.amulette_de_wulan = {
    id: 'amulette_de_wulan',
    name: 'Amulette de Wulan',
    image: 'images/items/Amulette_de_Wulan.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_wulan',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 91 }, { stat: 'flatDamage', value: 33 }, { stat: 'critChance', value: 3 }, { stat: 'critDamagePct', value: 16 }, { stat: 'res.eau', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.arc_de_wulan = {
    id: 'arc_de_wulan',
    name: 'Arc de Wulan',
    image: 'images/items/Arc_de_Wulan.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_wulan',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 61 }, { stat: 'spd', value: -15 }, { stat: 'flatDamage', value: 61 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 11 }, { stat: 'res.terre', value: 9 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.diademe_de_wulan = {
    id: 'diademe_de_wulan',
    name: 'Diadème de Wulan',
    image: 'images/items/Diadème_de_Wulan.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_wulan',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 51 }, { stat: 'flatDamage', value: 42 }, { stat: 'critChance', value: 3 }, { stat: 'res.feu', value: 3 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.bottes_de_l_esprit_malsain = {
    id: 'bottes_de_l_esprit_malsain',
    name: 'Bottes de l\'Esprit Malsain',
    image: 'images/items/Bottes_de_l_Esprit_Malsain.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_l_esprit_malsain',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 2 }, { stat: 'heal', value: 11 }, { stat: 'res.feu', value: 7 }],
    description: ''
}

item.ceinture_de_l_esprit_malsain = {
    id: 'ceinture_de_l_esprit_malsain',
    name: 'Ceinture de l\'Esprit Malsain',
    image: 'images/items/Ceinture_de_l_Esprit_Malsain.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_l_esprit_malsain',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 9 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.masque_de_l_esprit_malsain = {
    id: 'masque_de_l_esprit_malsain',
    name: 'Masque de l\'Esprit Malsain',
    image: 'images/items/Masque_de_l_Esprit_Malsain.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_l_esprit_malsain',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 73 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: 3 }, { stat: 'heal', value: 9 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.bottes_de_l_esprit_salvateur = {
    id: 'bottes_de_l_esprit_salvateur',
    name: 'Bottes de l\'Esprit Salvateur',
    image: 'images/items/Bottes_de_l_Esprit_Salvateur.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_l_esprit_salvateur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 55 }, { stat: 'critChance', value: -10 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.ceinture_de_l_esprit_salvateur = {
    id: 'ceinture_de_l_esprit_salvateur',
    name: 'Ceinture de l\'Esprit Salvateur',
    image: 'images/items/Ceinture_de_l_Esprit_Salvateur.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_l_esprit_salvateur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 55 }, { stat: 'critChance', value: -10 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.eau', value: 5 }],
    description: ''
}

item.masque_de_l_esprit_salvateur = {
    id: 'masque_de_l_esprit_salvateur',
    name: 'Masque de l\'Esprit Salvateur',
    image: 'images/items/Masque_de_l_Esprit_Salvateur.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_l_esprit_salvateur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 61 }, { stat: 'flatDamage', value: 55 }, { stat: 'critChance', value: -10 }, { stat: 'critResPct', value: 16 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.amulette_de_l_indicible = {
    id: 'amulette_de_l_indicible',
    name: 'Amulette de l\'Indicible',
    image: 'images/items/Amulette_de_l_Indicible.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_l_indicible',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 81 }, { stat: 'flatDamage', value: 55 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.bottes_de_l_indicible = {
    id: 'bottes_de_l_indicible',
    name: 'Bottes de l\'Indicible',
    image: 'images/items/Bottes_de_l_Indicible.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_l_indicible',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 15 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 80 }, { stat: 'res.feu', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.ceinture_de_l_indicible = {
    id: 'ceinture_de_l_indicible',
    name: 'Ceinture de l\'Indicible',
    image: 'images/items/Ceinture_de_l_Indicible.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_l_indicible',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 45 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.amulette_de_l_il_attentif = {
    id: 'amulette_de_l_il_attentif',
    name: 'Amulette de l\'Œil Attentif',
    image: 'images/items/Amulette_de_l_Œil_Attentif.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_l_il_attentif',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 96 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.cape_de_l_il_attentif = {
    id: 'cape_de_l_il_attentif',
    name: 'Cape de l\'Œil Attentif',
    image: 'images/items/Cape_de_l_Œil_Attentif.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_l_il_attentif',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 71 }, { stat: 'spd', value: 41 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.capuche_de_l_il_attentif = {
    id: 'capuche_de_l_il_attentif',
    name: 'Capuche de l\'Œil Attentif',
    image: 'images/items/Capuche_de_l_Œil_Attentif.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_l_il_attentif',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 76 }, { stat: 'spd', value: 41 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 3 }, { stat: 'res.terre', value: 7 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.amulette_de_l_il_putride = {
    id: 'amulette_de_l_il_putride',
    name: 'Amulette de l\'Œil Putride',
    image: 'images/items/Amulette_de_l_Œil_Putride.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_l_il_putride',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 76 }, { stat: 'flatDamage', value: 21 }, { stat: 'critChance', value: 3 }, { stat: 'critDamagePct', value: 11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.cape_de_l_il_putride = {
    id: 'cape_de_l_il_putride',
    name: 'Cape de l\'Œil Putride',
    image: 'images/items/Cape_de_l_Œil_Putride.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_l_il_putride',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 21 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.capuche_de_l_il_putride = {
    id: 'capuche_de_l_il_putride',
    name: 'Capuche de l\'Œil Putride',
    image: 'images/items/Capuche_de_l_Œil_Putride.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_l_il_putride',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 401 }, { stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 33 }, { stat: 'critChance', value: 4 }],
    description: ''
}

item.baleinabottes = {
    id: 'baleinabottes',
    name: 'Baleinabottes',
    image: 'images/items/Baleinabottes.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_la_baleine',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 76 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 27 }, { stat: 'critResPct', value: 11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.capchalot = {
    id: 'capchalot',
    name: 'Capchalot',
    image: 'images/items/Capchalot.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_la_baleine',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 35 }, { stat: 'critResPct', value: 11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.ceintace = {
    id: 'ceintace',
    name: 'Ceintacé',
    image: 'images/items/Ceintacé.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_la_baleine',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 66 }, { stat: 'critChance', value: 3 }, { stat: 'critDamagePct', value: 16 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.kidibonnet = {
    id: 'kidibonnet',
    name: 'Kidibonnet',
    image: 'images/items/Kidibonnet.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_la_baleine',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 87 }, { stat: 'flatDamage', value: 11 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.masse_etacee = {
    id: 'masse_etacee',
    name: 'Masse Étacée',
    image: 'images/items/Masse_Étacée.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_la_baleine',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 45 }, { stat: 'flatDamage', value: 74 }, { stat: 'critChance', value: 3 }, { stat: 'lifestealPct', value: 16 }, { stat: 'dropRate', value: 3 }, { stat: 'res.terre', value: 5 }, { stat: 'res.air', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.bottes_de_la_cour_sombre = {
    id: 'bottes_de_la_cour_sombre',
    name: 'Bottes de la Cour Sombre',
    image: 'images/items/Bottes_de_la_Cour_Sombre.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_la_cour_sombre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 32 }, { stat: 'critChance', value: 3 }, { stat: 'critResPct', value: 11 }, { stat: 'dropRate', value: 3 }, { stat: 'res.feu', value: 5 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.cape_de_la_cour_sombre = {
    id: 'cape_de_la_cour_sombre',
    name: 'Cape de la Cour Sombre',
    image: 'images/items/Cape_de_la_Cour_Sombre.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_la_cour_sombre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 81 }, { stat: 'flatDamage', value: 32 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 9 }],
    description: ''
}

item.ceinture_de_la_cour_sombre = {
    id: 'ceinture_de_la_cour_sombre',
    name: 'Ceinture de la Cour Sombre',
    image: 'images/items/Ceinture_de_la_Cour_Sombre.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_la_cour_sombre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }],
    description: ''
}

item.bottes_de_la_dame_du_hasard = {
    id: 'bottes_de_la_dame_du_hasard',
    name: 'Bottes de la Dame du Hasard',
    image: 'images/items/Bottes_de_la_Dame_du_Hasard.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_la_dame_du_hasard',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 51 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: 3 }, { stat: 'critDamagePct', value: 11 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.cape_de_la_dame_du_hasard = {
    id: 'cape_de_la_dame_du_hasard',
    name: 'Cape de la Dame du Hasard',
    image: 'images/items/Cape_de_la_Dame_du_Hasard.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_la_dame_du_hasard',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 5 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.collier_de_la_dame_du_hasard = {
    id: 'collier_de_la_dame_du_hasard',
    name: 'Collier de la Dame du Hasard',
    image: 'images/items/Collier_de_la_Dame_du_Hasard.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_la_dame_du_hasard',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 76 }, { stat: 'flatDamage', value: 18 }, { stat: 'critDamagePct', value: 16 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.criniere_de_la_dechireuse = {
    id: 'criniere_de_la_dechireuse',
    name: 'Crinière de la Déchireuse',
    image: 'images/items/Crinière_de_la_Déchireuse.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_la_dechireuse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 401 }, { stat: 'atk', value: 68 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 7 }, { stat: 'dropRate', value: 3 }, { stat: 'res.terre', value: 4 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.griffes_de_la_dechireuse = {
    id: 'griffes_de_la_dechireuse',
    name: 'Griffes de la Déchireuse',
    image: 'images/items/Griffes_de_la_Déchireuse.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_la_dechireuse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 83 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 29 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 5 }, { stat: 'lifestealPct', value: 11 }, { stat: 'dropRate', value: 3 }, { stat: 'res.eau', value: 4 }, { stat: 'res.terre', value: 4 }],
    description: ''
}

item.hachoir_de_la_dechireuse = {
    id: 'hachoir_de_la_dechireuse',
    name: 'Hachoir de la Déchireuse',
    image: 'images/items/Hachoir_de_la_Déchireuse.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_la_dechireuse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 83 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 52 }, { stat: 'critChance', value: 1 }, { stat: 'critDamagePct', value: 5 }, { stat: 'lifestealPct', value: 10 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 4 }, { stat: 'res.eau', value: 4 }],
    description: ''
}

item.trophee_de_la_dechireuse = {
    id: 'trophee_de_la_dechireuse',
    name: 'Trophée de la Déchireuse',
    image: 'images/items/Trophée_de_la_Déchireuse.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_de_la_dechireuse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 73 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 4 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.amulette_de_shokkoth = {
    id: 'amulette_de_shokkoth',
    name: 'Amulette de Shokkoth',
    image: 'images/items/Amulette_de_Shokkoth.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_de_la_fosse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 146 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 2 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.cape_de_mantaze = {
    id: 'cape_de_mantaze',
    name: 'Cape de Mantaze',
    image: 'images/items/Cape_de_Mantaze.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_la_fosse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 401 }, { stat: 'atk', value: 76 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.dagoulinantes = {
    id: 'dagoulinantes',
    name: 'Dagoulinantes',
    image: 'images/items/Dagoulinantes.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_la_fosse',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 76 }, { stat: 'flatDamage', value: 42 }, { stat: 'critChance', value: 4 }, { stat: 'res.feu', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.heaume_oplate = {
    id: 'heaume_oplate',
    name: 'Heaume Oplate',
    image: 'images/items/Heaume_Oplate.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_la_fournaise',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 111 }, { stat: 'flatDamage', value: 11 }, { stat: 'critChance', value: 3 }, { stat: 'res.air', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.massier = {
    id: 'massier',
    name: 'Massier',
    image: 'images/items/Massier.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_la_fournaise',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 61 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 4 }, { stat: 'heal', value: 9 }, { stat: 'lifestealPct', value: 24 }, { stat: 'res.terre', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.goulano = {
    id: 'goulano',
    name: 'Goulano',
    image: 'images/items/Goulano.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_de_la_goule',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 20 }, { stat: 'critResPct', value: 16 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.goulbottes = {
    id: 'goulbottes',
    name: 'Goulbottes',
    image: 'images/items/Goulbottes.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_la_goule',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 36 }, { stat: 'critResPct', value: 16 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.goulclier = {
    id: 'goulclier',
    name: 'Goulclier',
    image: 'images/items/Goulclier.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_de_la_goule',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 51 }, { stat: 'critResPct', value: 21 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.ankhape = {
    id: 'ankhape',
    name: 'Ankhape',
    image: 'images/items/Ankhape.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_de_la_pyramide',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 401 }, { stat: 'atk', value: 76 }, { stat: 'flatDamage', value: 32 }, { stat: 'critChance', value: 3 }, { stat: 'critDamagePct', value: -30 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.capuche_de_moum_ra = {
    id: 'capuche_de_moum_ra',
    name: 'Capuche de Moum-Ra',
    image: 'images/items/Capuche_de_Moum-Ra.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_la_pyramide',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 401 }, { stat: 'atk', value: 76 }, { stat: 'flatDamage', value: 7 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.heqache = {
    id: 'heqache',
    name: 'Héqache',
    image: 'images/items/Héqache.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_de_la_pyramide',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 58 }, { stat: 'flatDamage', value: 47 }, { stat: 'critChance', value: 3 }, { stat: 'lifestealPct', value: 20 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.eau', value: 5 }],
    description: ''
}

item.bottes_de_la_reine_des_voleurs = {
    id: 'bottes_de_la_reine_des_voleurs',
    name: 'Bottes de la Reine des Voleurs',
    image: 'images/items/Bottes_de_la_Reine_des_Voleurs.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_de_la_reine_des_voleurs',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: 2 }, { stat: 'critResPct', value: 16 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.ceinture_de_la_reine_des_voleurs = {
    id: 'ceinture_de_la_reine_des_voleurs',
    name: 'Ceinture de la Reine des Voleurs',
    image: 'images/items/Ceinture_de_la_Reine_des_Voleurs.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_de_la_reine_des_voleurs',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 33 }, { stat: 'critChance', value: 3 }, { stat: 'critResPct', value: 21 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.coiffe_de_la_reine_des_voleurs = {
    id: 'coiffe_de_la_reine_des_voleurs',
    name: 'Coiffe de la Reine des Voleurs',
    image: 'images/items/Coiffe_de_la_Reine_des_Voleurs.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_de_la_reine_des_voleurs',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 61 }, { stat: 'flatDamage', value: 33 }, { stat: 'critResPct', value: 16 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.anneau_tique = {
    id: 'anneau_tique',
    name: 'Anneau Tique',
    image: 'images/items/Anneau_Tique.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_des_abysses',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 15 }, { stat: 'critChance', value: 2 }, { stat: 'critResPct', value: -21 }, { stat: 'dropRate', value: 3 }, { stat: 'res.eau', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.dorabysses = {
    id: 'dorabysses',
    name: 'Dorabysses',
    image: 'images/items/Dorabysses.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_des_abysses',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 31 }, { stat: 'flatDamage', value: 15 }, { stat: 'critChance', value: 3 }, { stat: 'critResPct', value: -21 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.eau', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.talisman_glouti = {
    id: 'talisman_glouti',
    name: 'Talisman Glouti',
    image: 'images/items/Talisman_Glouti.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_des_abysses',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 81 }, { stat: 'flatDamage', value: 15 }, { stat: 'critChance', value: 3 }, { stat: 'critResPct', value: -21 }, { stat: 'res.feu', value: 7 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.cape_indescriptible = {
    id: 'cape_indescriptible',
    name: 'Cape Indescriptible',
    image: 'images/items/Cape_Indescriptible.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_des_abimes',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 401 }, { stat: 'atk', value: 101 }, { stat: 'flatDamage', value: 16 }, { stat: 'critDamagePct', value: 11 }, { stat: 'res.feu', value: 7 }],
    description: ''
}

item.manthache = {
    id: 'manthache',
    name: 'Manthache',
    image: 'images/items/Manthache.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_des_abimes',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 61 }, { stat: 'flatDamage', value: 41 }, { stat: 'critResPct', value: 21 }, { stat: 'lifestealPct', value: 16 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.palmes_trithons = {
    id: 'palmes_trithons',
    name: 'Palmes Trithons',
    image: 'images/items/Palmes_Trithons.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_des_abimes',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 81 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.arc_du_karkanik = {
    id: 'arc_du_karkanik',
    name: 'Arc du Karkanik',
    image: 'images/items/Arc_du_Karkanik.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_des_armutins',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 451 }, { stat: 'atk', value: 102 }, { stat: 'lifestealPct', value: 29 }, { stat: 'res.feu', value: 9 }, { stat: 'res.neutre', value: 9 }],
    description: ''
}

item.bouclier_du_stalak = {
    id: 'bouclier_du_stalak',
    name: 'Bouclier du Stalak',
    image: 'images/items/Bouclier_du_Stalak.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_des_armutins',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 62 }, { stat: 'flatDamage', value: 11 }, { stat: 'damageReductionPct', value: 8 }, { stat: 'critResPct', value: 26 }],
    description: ''
}

item.col_du_ventrublion = {
    id: 'col_du_ventrublion',
    name: 'Col du Ventrublion',
    image: 'images/items/Col_du_Ventrublion.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_des_armutins',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 451 }, { stat: 'atk', value: 169 }, { stat: 'res.terre', value: 9 }, { stat: 'res.air', value: 9 }],
    description: ''
}

item.amulette_des_chocomanciens = {
    id: 'amulette_des_chocomanciens',
    name: 'Amulette des Chocomanciens',
    image: 'images/items/Amulette_des_Chocomanciens.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_des_chocomanciens',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 14 }, { stat: 'dropRate', value: 1 }, { stat: 'res.air', value: 4 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.bouclier_des_chocomanciens = {
    id: 'bouclier_des_chocomanciens',
    name: 'Bouclier des Chocomanciens',
    image: 'images/items/Bouclier_des_Chocomanciens.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_des_chocomanciens',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 31 }, { stat: 'res.terre', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.ceinture_des_chocomanciens = {
    id: 'ceinture_des_chocomanciens',
    name: 'Ceinture des Chocomanciens',
    image: 'images/items/Ceinture_des_Chocomanciens.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_des_chocomanciens',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 401 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 14 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 4 }, { stat: 'res.air', value: 4 }, { stat: 'res.neutre', value: 4 }],
    description: ''
}

item.bracelet_des_fonds_marins = {
    id: 'bracelet_des_fonds_marins',
    name: 'Bracelet des Fonds marins',
    image: 'images/items/Bracelet_des_Fonds_marins.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_des_fonds_marins',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 56 }, { stat: 'flatDamage', value: 9 }, { stat: 'critChance', value: 2 }, { stat: 'res.feu', value: 7 }],
    description: ''
}

item.masque_des_fonds_marins = {
    id: 'masque_des_fonds_marins',
    name: 'Masque des Fonds marins',
    image: 'images/items/Masque_des_Fonds_marins.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_des_fonds_marins',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 61 }, { stat: 'flatDamage', value: 11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.terre', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.sandales_des_fonds_marins = {
    id: 'sandales_des_fonds_marins',
    name: 'Sandales des Fonds marins',
    image: 'images/items/Sandales_des_Fonds_marins.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_des_fonds_marins',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 51 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 11 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.bouclier_du_captain_amakna = {
    id: 'bouclier_du_captain_amakna',
    name: 'Bouclier du Captain Amakna',
    image: 'images/items/Bouclier_du_Captain_Amakna.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_des_justiciers',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 26 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 4 }, { stat: 'res.feu', value: 2 }, { stat: 'res.eau', value: 2 }, { stat: 'res.terre', value: 2 }, { stat: 'res.air', value: 2 }, { stat: 'res.neutre', value: 2 }],
    description: ''
}

item.cape_des_justiciers = {
    id: 'cape_des_justiciers',
    name: 'Cape des Justiciers',
    image: 'images/items/Cape_des_Justiciers.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_des_justiciers',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 35 }, { stat: 'critChance', value: 2 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.maskrobe = {
    id: 'maskrobe',
    name: 'Maskrobe',
    image: 'images/items/Maskrobe.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_des_krobes',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 45 }, { stat: 'critChance', value: 2 }],
    description: ''
}

item.pataugastrique = {
    id: 'pataugastrique',
    name: 'Pataugastrique',
    image: 'images/items/Pataugastrique.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_des_krobes',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 76 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 18 }, { stat: 'critDamagePct', value: 11 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.protopagne = {
    id: 'protopagne',
    name: 'Protopagne',
    image: 'images/items/Protopagne.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_des_krobes',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'spd', value: 15 }, { stat: 'critResPct', value: 21 }, { stat: 'res.feu', value: 7 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.voilamibe = {
    id: 'voilamibe',
    name: 'Voilamibe',
    image: 'images/items/Voilamibe.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_des_krobes',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 66 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 55 }, { stat: 'critDamagePct', value: -20 }, { stat: 'res.eau', value: 5 }],
    description: ''
}

item.bottes_des_malveilleurs = {
    id: 'bottes_des_malveilleurs',
    name: 'Bottes des Malveilleurs',
    image: 'images/items/Bottes_des_Malveilleurs.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_des_malveilleurs',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 63 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 27 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 2 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.cape_des_malveilleurs = {
    id: 'cape_des_malveilleurs',
    name: 'Cape des Malveilleurs',
    image: 'images/items/Cape_des_Malveilleurs.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_des_malveilleurs',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 103 }, { stat: 'flatDamage', value: 27 }, { stat: 'critChance', value: 2 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.chapeau_des_malveilleurs = {
    id: 'chapeau_des_malveilleurs',
    name: 'Chapeau des Malveilleurs',
    image: 'images/items/Chapeau_des_Malveilleurs.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_des_malveilleurs',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 73 }, { stat: 'flatDamage', value: 27 }, { stat: 'critChance', value: 2 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.anneaur_us = {
    id: 'anneaur_us',
    name: 'Anneauræus',
    image: 'images/items/Anneauræus.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_des_maudits',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 51 }, { stat: 'flatDamage', value: 9 }, { stat: 'critChance', value: 2 }, { stat: 'critResPct', value: -30 }, { stat: 'heal', value: 9 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 5 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.pagne_du_rykaon = {
    id: 'pagne_du_rykaon',
    name: 'Pagne du Rykaon',
    image: 'images/items/Pagne_du_Rykaon.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_des_maudits',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 401 }, { stat: 'atk', value: 76 }, { stat: 'flatDamage', value: 7 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 16 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.pyraguette = {
    id: 'pyraguette',
    name: 'Pyraguette',
    image: 'images/items/Pyraguette.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_des_maudits',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 77 }, { stat: 'critChance', value: -10 }, { stat: 'critResPct', value: 11 }, { stat: 'heal', value: 11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.bottes_innommables = {
    id: 'bottes_innommables',
    name: 'Bottes Innommables',
    image: 'images/items/Bottes_Innommables.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_des_profondeurs',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 401 }, { stat: 'atk', value: 81 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 14 }, { stat: 'heal', value: 11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.harpelle = {
    id: 'harpelle',
    name: 'Harpelle',
    image: 'images/items/Harpelle.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_des_profondeurs',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 26 }, { stat: 'flatDamage', value: 47 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 16 }, { stat: 'heal', value: 11 }, { stat: 'res.air', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.pendentif_affame = {
    id: 'pendentif_affame',
    name: 'Pendentif affamé',
    image: 'images/items/Pendentif_affamé.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_des_profondeurs',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 116 }, { stat: 'flatDamage', value: 11 }, { stat: 'critChance', value: 3 }, { stat: 'heal', value: 7 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.ceste_de_ravageur = {
    id: 'ceste_de_ravageur',
    name: 'Ceste de Ravageur',
    image: 'images/items/Ceste_de_Ravageur.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_des_ravageurs',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 55 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 1 }, { stat: 'res.feu', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.hachoir_de_ravageur = {
    id: 'hachoir_de_ravageur',
    name: 'Hachoir de Ravageur',
    image: 'images/items/Hachoir_de_Ravageur.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_des_ravageurs',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 83 }, { stat: 'flatDamage', value: 46 }, { stat: 'critChance', value: 3 }, { stat: 'lifestealPct', value: 8 }, { stat: 'res.feu', value: 4 }, { stat: 'res.eau', value: 5 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.torque_de_ravageur = {
    id: 'torque_de_ravageur',
    name: 'Torque de Ravageur',
    image: 'images/items/Torque_de_Ravageur.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_des_ravageurs',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 133 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 2 }, { stat: 'res.terre', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.anneau_crustique = {
    id: 'anneau_crustique',
    name: 'Anneau Crustique',
    image: 'images/items/Anneau_Crustique.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_des_trefonds',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 61 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 2 }, { stat: 'res.eau', value: 5 }],
    description: ''
}

item.collier_de_tourthon = {
    id: 'collier_de_tourthon',
    name: 'Collier de Tourthon',
    image: 'images/items/Collier_de_Tourthon.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_des_trefonds',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 401 }, { stat: 'atk', value: 116 }, { stat: 'flatDamage', value: 32 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.marteau_r_ture = {
    id: 'marteau_r_ture',
    name: 'Marteau R\'ture',
    image: 'images/items/Marteau_R_ture.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_des_trefonds',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 61 }, { stat: 'flatDamage', value: 84 }, { stat: 'critChance', value: 3 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.anneau_des_egares = {
    id: 'anneau_des_egares',
    name: 'Anneau des égarés',
    image: 'images/items/Anneau_des_égarés.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_des_egares',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 42 }, { stat: 'flatDamage', value: 27 }, { stat: 'res.feu', value: 7 }],
    description: ''
}

item.bottes_des_egares = {
    id: 'bottes_des_egares',
    name: 'Bottes des égarés',
    image: 'images/items/Bottes_des_égarés.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_des_egares',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 51 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 27 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.casque_des_egares = {
    id: 'casque_des_egares',
    name: 'Casque des égarés',
    image: 'images/items/Casque_des_égarés.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_des_egares',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 33 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.cape_du_barbetoal = {
    id: 'cape_du_barbetoal',
    name: 'Cape du Barbétoal',
    image: 'images/items/Cape_du_Barbétoal.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_barbetoal',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 63 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 4 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.ceinture_du_barbetoal = {
    id: 'ceinture_du_barbetoal',
    name: 'Ceinture du Barbétoal',
    image: 'images/items/Ceinture_du_Barbétoal.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_barbetoal',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 51 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.terre', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.masque_du_barbetoal = {
    id: 'masque_du_barbetoal',
    name: 'Masque du Barbétoal',
    image: 'images/items/Masque_du_Barbétoal.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_barbetoal',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 103 }, { stat: 'flatDamage', value: 18 }, { stat: 'critResPct', value: 16 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.cape_ovri = {
    id: 'cape_ovri',
    name: 'Cape Ovri',
    image: 'images/items/Cape_Ovri.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_bonimenteur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 36 }, { stat: 'critChance', value: 4 }, { stat: 'res.feu', value: 16 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.sangle_ouare = {
    id: 'sangle_ouare',
    name: 'Sangle Ouare',
    image: 'images/items/Sangle_Ouare.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_bonimenteur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 94 }, { stat: 'spd', value: -15 }, { stat: 'critDamagePct', value: 16 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.talisman_songe = {
    id: 'talisman_songe',
    name: 'Talisman Songe',
    image: 'images/items/Talisman_Songe.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_bonimenteur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 76 }, { stat: 'flatDamage', value: 44 }, { stat: 'critDamagePct', value: 11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 11 }, { stat: 'res.air', value: 6 }],
    description: ''
}

item.bottes_du_captain_chafer = {
    id: 'bottes_du_captain_chafer',
    name: 'Bottes du Captain Chafer',
    image: 'images/items/Bottes_du_Captain_Chafer.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_captain_chafer',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 51 }, { stat: 'spd', value: 46 }, { stat: 'flatDamage', value: 22 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.poignards_du_captain_chafer = {
    id: 'poignards_du_captain_chafer',
    name: 'Poignards du Captain Chafer',
    image: 'images/items/Poignards_du_Captain_Chafer.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_captain_chafer',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 51 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 35 }, { stat: 'lifestealPct', value: 12 }, { stat: 'dropRate', value: 3 }, { stat: 'res.eau', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.slip_du_captain_chafer = {
    id: 'slip_du_captain_chafer',
    name: 'Slip du Captain Chafer',
    image: 'images/items/Slip_du_Captain_Chafer.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_captain_chafer',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 66 }, { stat: 'spd', value: 41 }, { stat: 'flatDamage', value: 22 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.eau', value: 5 }],
    description: ''
}

item.bottes_du_chal_il = {
    id: 'bottes_du_chal_il',
    name: 'Bottes du Chalœil',
    image: 'images/items/Bottes_du_Chalœil.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_chal_il',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 53 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 35 }, { stat: 'critChance', value: 3 }, { stat: 'critResPct', value: 16 }, { stat: 'res.feu', value: 7 }],
    description: ''
}

item.cape_du_chal_il = {
    id: 'cape_du_chal_il',
    name: 'Cape du Chalœil',
    image: 'images/items/Cape_du_Chalœil.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_chal_il',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 38 }, { stat: 'flatDamage', value: 35 }, { stat: 'critChance', value: 3 }, { stat: 'critResPct', value: 16 }, { stat: 'res.terre', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.casque_du_chal_il = {
    id: 'casque_du_chal_il',
    name: 'Casque du Chalœil',
    image: 'images/items/Casque_du_Chalœil.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_chal_il',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 38 }, { stat: 'flatDamage', value: 35 }, { stat: 'critChance', value: 3 }, { stat: 'critResPct', value: 16 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.ceste_gele_du_chevalier_de_glace = {
    id: 'ceste_gele_du_chevalier_de_glace',
    name: 'Ceste gelé du Chevalier de Glace',
    image: 'images/items/Ceste_gelé_du_Chevalier_de_Glace.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_chevalier_de_glace',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 57 }, { stat: 'flatDamage', value: 10 }, { stat: 'dropRate', value: 1 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.lame_givree_du_chevalier_de_glace = {
    id: 'lame_givree_du_chevalier_de_glace',
    name: 'Lame givrée du Chevalier de Glace',
    image: 'images/items/Lame_givrée_du_Chevalier_de_Glace.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_chevalier_de_glace',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 401 }, { stat: 'atk', value: 77 }, { stat: 'spd', value: -15 }, { stat: 'flatDamage', value: 51 }, { stat: 'lifestealPct', value: 11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.eau', value: 5 }],
    description: ''
}

item.pavois_frigorifie_du_chevalier_de_glace = {
    id: 'pavois_frigorifie_du_chevalier_de_glace',
    name: 'Pavois frigorifié du Chevalier de Glace',
    image: 'images/items/Pavois_frigorifié_du_Chevalier_de_Glace.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_du_chevalier_de_glace',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 62 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.anneau_du_comte_harebourg = {
    id: 'anneau_du_comte_harebourg',
    name: 'Anneau du Comte Harebourg',
    image: 'images/items/Anneau_du_Comte_Harebourg.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_comte_harebourg',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: -40 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: 5 }, { stat: 'critResPct', value: 16 }],
    description: ''
}

item.bottes_du_comte_harebourg = {
    id: 'bottes_du_comte_harebourg',
    name: 'Bottes du Comte Harebourg',
    image: 'images/items/Bottes_du_Comte_Harebourg.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_comte_harebourg',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 61 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 32 }, { stat: 'res.neutre', value: 21 }],
    description: ''
}

item.coiffe_du_comte_harebourg = {
    id: 'coiffe_du_comte_harebourg',
    name: 'Coiffe du Comte Harebourg',
    image: 'images/items/Coiffe_du_Comte_Harebourg.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_comte_harebourg',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 451 }, { stat: 'atk', value: 86 }, { stat: 'flatDamage', value: 32 }, { stat: 'dropRate', value: 4 }, { stat: 'res.feu', value: -4 }, { stat: 'res.eau', value: -4 }, { stat: 'res.terre', value: -4 }, { stat: 'res.air', value: -4 }, { stat: 'res.neutre', value: -4 }],
    description: ''
}

item.amulette_du_cycloide = {
    id: 'amulette_du_cycloide',
    name: 'Amulette du Cycloïde',
    image: 'images/items/Amulette_du_Cycloïde.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_cycloide',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 76 }, { stat: 'flatDamage', value: 32 }, { stat: 'res.feu', value: 6 }, { stat: 'res.neutre', value: 6 }],
    description: ''
}

item.anneau_du_cycloide = {
    id: 'anneau_du_cycloide',
    name: 'Anneau du Cycloïde',
    image: 'images/items/Anneau_du_Cycloïde.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_cycloide',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 28 }, { stat: 'res.eau', value: 6 }],
    description: ''
}

item.bottes_du_cycloide = {
    id: 'bottes_du_cycloide',
    name: 'Bottes du Cycloïde',
    image: 'images/items/Bottes_du_Cycloïde.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_cycloide',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 4 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 28 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 7 }, { stat: 'res.terre', value: 11 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.bouclier_du_cycloide = {
    id: 'bouclier_du_cycloide',
    name: 'Bouclier du Cycloïde',
    image: 'images/items/Bouclier_du_Cycloïde.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_du_cycloide',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 51 }, { stat: 'critChance', value: 4 }, { stat: 'res.feu', value: 4 }, { stat: 'res.terre', value: 5 }, { stat: 'res.air', value: 3 }],
    description: ''
}

item.amulette_du_c_ur_saignant = {
    id: 'amulette_du_c_ur_saignant',
    name: 'Amulette du Cœur Saignant',
    image: 'images/items/Amulette_du_Cœur_Saignant.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_c_ur_saignant',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 96 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }],
    description: ''
}

item.bottes_du_c_ur_saignant = {
    id: 'bottes_du_c_ur_saignant',
    name: 'Bottes du Cœur Saignant',
    image: 'images/items/Bottes_du_Cœur_Saignant.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_c_ur_saignant',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 86 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 3 }, { stat: 'critDamagePct', value: 9 }, { stat: 'res.eau', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.cape_du_c_ur_saignant = {
    id: 'cape_du_c_ur_saignant',
    name: 'Cape du Cœur Saignant',
    image: 'images/items/Cape_du_Cœur_Saignant.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_c_ur_saignant',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 61 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 7 }, { stat: 'res.terre', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.amulette_du_c_ur_vaillant = {
    id: 'amulette_du_c_ur_vaillant',
    name: 'Amulette du Cœur Vaillant',
    image: 'images/items/Amulette_du_Cœur_Vaillant.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_c_ur_vaillant',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 108 }, { stat: 'flatDamage', value: 27 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }],
    description: ''
}

item.bottes_du_c_ur_vaillant = {
    id: 'bottes_du_c_ur_vaillant',
    name: 'Bottes du Cœur Vaillant',
    image: 'images/items/Bottes_du_Cœur_Vaillant.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_c_ur_vaillant',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 98 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 27 }, { stat: 'critChance', value: 2 }, { stat: 'res.eau', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.cape_du_c_ur_vaillant = {
    id: 'cape_du_c_ur_vaillant',
    name: 'Cape du Cœur Vaillant',
    image: 'images/items/Cape_du_Cœur_Vaillant.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_c_ur_vaillant',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 63 }, { stat: 'flatDamage', value: 27 }, { stat: 'critChance', value: 3 }, { stat: 'res.feu', value: 5 }, { stat: 'res.eau', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.alliance_du_dark_vlad = {
    id: 'alliance_du_dark_vlad',
    name: 'Alliance du Dark Vlad',
    image: 'images/items/Alliance_du_Dark_Vlad.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_dark_vlad',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 68 }, { stat: 'flatDamage', value: 9 }, { stat: 'critChance', value: 2 }, { stat: 'res.feu', value: 3 }, { stat: 'res.terre', value: 3 }],
    description: ''
}

item.col_du_dark_vlad = {
    id: 'col_du_dark_vlad',
    name: 'Col du Dark Vlad',
    image: 'images/items/Col_du_Dark_Vlad.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_dark_vlad',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 113 }, { stat: 'flatDamage', value: 13 }, { stat: 'critChance', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.eau', value: -14 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.flamberge_du_dark_vlad = {
    id: 'flamberge_du_dark_vlad',
    name: 'Flamberge du Dark Vlad',
    image: 'images/items/Flamberge_du_Dark_Vlad.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_dark_vlad',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 108 }, { stat: 'flatDamage', value: 65 }, { stat: 'critChance', value: 3 }, { stat: 'res.feu', value: 9 }, { stat: 'res.eau', value: -14 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.tabard_du_dark_vlad = {
    id: 'tabard_du_dark_vlad',
    name: 'Tabard du Dark Vlad',
    image: 'images/items/Tabard_du_Dark_Vlad.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_dark_vlad',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 78 }, { stat: 'flatDamage', value: 13 }, { stat: 'critChance', value: 3 }, { stat: 'res.feu', value: 9 }, { stat: 'res.eau', value: -14 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.ceinture_gence = {
    id: 'ceinture_gence',
    name: 'Ceinture Gence',
    image: 'images/items/Ceinture_Gence.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_fourneau',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 128 }, { stat: 'flatDamage', value: 28 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.lav_hache = {
    id: 'lav_hache',
    name: 'Lav\'Hache',
    image: 'images/items/Lav_Hache.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_fourneau',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 58 }, { stat: 'flatDamage', value: 34 }, { stat: 'lifestealPct', value: 12 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.amulette_du_granduk = {
    id: 'amulette_du_granduk',
    name: 'Amulette du Granduk',
    image: 'images/items/Amulette_du_Granduk.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_granduk',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 91 }, { stat: 'flatDamage', value: 11 }, { stat: 'critChance', value: 3 }, { stat: 'critDamagePct', value: 7 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 16 }, { stat: 'res.air', value: 16 }],
    description: ''
}

item.masque_du_granduk = {
    id: 'masque_du_granduk',
    name: 'Masque du Granduk',
    image: 'images/items/Masque_du_Granduk.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_granduk',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 46 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 6 }, { stat: 'res.neutre', value: 6 }],
    description: ''
}

item.epee_du_granduk = {
    id: 'epee_du_granduk',
    name: 'Épée du Granduk',
    image: 'images/items/Épée_du_Granduk.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_granduk',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 46 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 44 }, { stat: 'critChance', value: 4 }, { stat: 'critResPct', value: 16 }, { stat: 'lifestealPct', value: 9 }, { stat: 'dropRate', value: 3 }, { stat: 'res.feu', value: 11 }],
    description: ''
}

item.amulette_du_kamasterisk = {
    id: 'amulette_du_kamasterisk',
    name: 'Amulette du Kamasterisk',
    image: 'images/items/Amulette_du_Kamasterisk.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_kamasterisk',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 86 }, { stat: 'flatDamage', value: 27 }, { stat: 'critResPct', value: 16 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.bottes_du_kamasterisk = {
    id: 'bottes_du_kamasterisk',
    name: 'Bottes du Kamasterisk',
    image: 'images/items/Bottes_du_Kamasterisk.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_kamasterisk',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 56 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 27 }, { stat: 'critResPct', value: 11 }, { stat: 'dropRate', value: 4 }, { stat: 'res.feu', value: 7 }, { stat: 'res.eau', value: 9 }],
    description: ''
}

item.cape_du_kamasterisk = {
    id: 'cape_du_kamasterisk',
    name: 'Cape du Kamasterisk',
    image: 'images/items/Cape_du_Kamasterisk.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_kamasterisk',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 56 }, { stat: 'flatDamage', value: 27 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 5 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.anneau_du_katcheur = {
    id: 'anneau_du_katcheur',
    name: 'Anneau du Katcheur',
    image: 'images/items/Anneau_du_Katcheur.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_katcheur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 28 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 2 }],
    description: ''
}

item.bottes_du_katcheur = {
    id: 'bottes_du_katcheur',
    name: 'Bottes du Katcheur',
    image: 'images/items/Bottes_du_Katcheur.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_katcheur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 46 }, { stat: 'flatDamage', value: 36 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }],
    description: ''
}

item.masque_du_katcheur = {
    id: 'masque_du_katcheur',
    name: 'Masque du Katcheur',
    image: 'images/items/Masque_du_Katcheur.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_katcheur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 401 }, { stat: 'atk', value: 56 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 36 }, { stat: 'critChance', value: 3 }, { stat: 'heal', value: 9 }, { stat: 'dropRate', value: 2 }],
    description: ''
}

item.alliance_du_levitrof = {
    id: 'alliance_du_levitrof',
    name: 'Alliance du Lévitrof',
    image: 'images/items/Alliance_du_Lévitrof.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_levitrof',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 28 }, { stat: 'res.feu', value: 4 }],
    description: ''
}

item.bottes_du_levitrof = {
    id: 'bottes_du_levitrof',
    name: 'Bottes du Lévitrof',
    image: 'images/items/Bottes_du_Lévitrof.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_levitrof',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 44 }, { stat: 'res.terre', value: 6 }],
    description: ''
}

item.coiffe_du_levitrof = {
    id: 'coiffe_du_levitrof',
    name: 'Coiffe du Lévitrof',
    image: 'images/items/Coiffe_du_Lévitrof.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_levitrof',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 31 }, { stat: 'spd', value: 41 }, { stat: 'flatDamage', value: 44 }, { stat: 'critChance', value: 3 }, { stat: 'critResPct', value: -21 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.amulette_du_nocturlabe = {
    id: 'amulette_du_nocturlabe',
    name: 'Amulette du Nocturlabe',
    image: 'images/items/Amulette_du_Nocturlabe.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_nocturlabe',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 106 }, { stat: 'flatDamage', value: 11 }, { stat: 'critChance', value: -5 }, { stat: 'critDamagePct', value: 11 }, { stat: 'dropRate', value: 3 }, { stat: 'res.eau', value: 16 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.bottes_du_nocturlabe = {
    id: 'bottes_du_nocturlabe',
    name: 'Bottes du Nocturlabe',
    image: 'images/items/Bottes_du_Nocturlabe.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_nocturlabe',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 86 }, { stat: 'spd', value: 36 }, { stat: 'flatDamage', value: 11 }, { stat: 'critDamagePct', value: -11 }, { stat: 'dropRate', value: 3 }, { stat: 'res.terre', value: 7 }, { stat: 'res.air', value: 16 }],
    description: ''
}

item.ceinture_du_nocturlabe = {
    id: 'ceinture_du_nocturlabe',
    name: 'Ceinture du Nocturlabe',
    image: 'images/items/Ceinture_du_Nocturlabe.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_nocturlabe',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 88 }, { stat: 'flatDamage', value: 11 }, { stat: 'critChance', value: 5 }, { stat: 'dropRate', value: 3 }, { stat: 'res.eau', value: 7 }, { stat: 'res.terre', value: 16 }],
    description: ''
}

item.alliance_du_pandamonium = {
    id: 'alliance_du_pandamonium',
    name: 'Alliance du Pandamonium',
    image: 'images/items/Alliance_du_Pandamonium.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_pandamonium',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 21 }, { stat: 'flatDamage', value: 12 }, { stat: 'res.terre', value: 5 }],
    description: ''
}

item.amulette_du_pandamonium = {
    id: 'amulette_du_pandamonium',
    name: 'Amulette du Pandamonium',
    image: 'images/items/Amulette_du_Pandamonium.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_pandamonium',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 101 }, { stat: 'spd', value: 41 }, { stat: 'flatDamage', value: 18 }, { stat: 'heal', value: 16 }, { stat: 'res.air', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.baguette_du_pandamonium = {
    id: 'baguette_du_pandamonium',
    name: 'Baguette du Pandamonium',
    image: 'images/items/Baguette_du_Pandamonium.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_pandamonium',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 76 }, { stat: 'flatDamage', value: 22 }, { stat: 'heal', value: 11 }, { stat: 'lifestealPct', value: 36 }, { stat: 'res.terre', value: 5 }, { stat: 'res.air', value: 5 }],
    description: ''
}

item.amulette_du_piloztere = {
    id: 'amulette_du_piloztere',
    name: 'Amulette du Piloztère',
    image: 'images/items/Amulette_du_Piloztère.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_piloztere',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 51 }, { stat: 'flatDamage', value: 48 }, { stat: 'critChance', value: 3 }, { stat: 'critResPct', value: 21 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.bracelet_du_piloztere = {
    id: 'bracelet_du_piloztere',
    name: 'Bracelet du Piloztère',
    image: 'images/items/Bracelet_du_Piloztère.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_piloztere',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 71 }, { stat: 'flatDamage', value: 21 }, { stat: 'critChance', value: 3 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.pantoufles_du_piloztere = {
    id: 'pantoufles_du_piloztere',
    name: 'Pantoufles du Piloztère',
    image: 'images/items/Pantoufles_du_Piloztère.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_piloztere',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 56 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 27 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 5 }],
    description: ''
}

item.bottes_du_roi_joueur = {
    id: 'bottes_du_roi_joueur',
    name: 'Bottes du Roi Joueur',
    image: 'images/items/Bottes_du_Roi_Joueur.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_roi_joueur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 56 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 33 }, { stat: 'critChance', value: 4 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.chevaliere_du_roi_joueur = {
    id: 'chevaliere_du_roi_joueur',
    name: 'Chevalière du Roi Joueur',
    image: 'images/items/Chevalière_du_Roi_Joueur.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_roi_joueur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 27 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 7 }],
    description: ''
}

item.couronne_du_roi_joueur = {
    id: 'couronne_du_roi_joueur',
    name: 'Couronne du Roi Joueur',
    image: 'images/items/Couronne_du_Roi_Joueur.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_roi_joueur',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 76 }, { stat: 'flatDamage', value: 27 }, { stat: 'critChance', value: 4 }, { stat: 'critResPct', value: 16 }, { stat: 'dropRate', value: 2 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.amulette_du_sinistrofu = {
    id: 'amulette_du_sinistrofu',
    name: 'Amulette du Sinistrofu',
    image: 'images/items/Amulette_du_Sinistrofu.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_sinistrofu',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 133 }, { stat: 'critChance', value: 4 }, { stat: 'critResPct', value: 11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 6 }, { stat: 'res.air', value: 16 }],
    description: ''
}

item.bottes_du_sinistrofu = {
    id: 'bottes_du_sinistrofu',
    name: 'Bottes du Sinistrofu',
    image: 'images/items/Bottes_du_Sinistrofu.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_sinistrofu',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 61 }, { stat: 'spd', value: 36 }, { stat: 'flatDamage', value: -2 }, { stat: 'dropRate', value: 3 }, { stat: 'res.eau', value: 11 }, { stat: 'res.terre', value: 7 }, { stat: 'res.air', value: 7 }, { stat: 'res.neutre', value: 11 }],
    description: ''
}

item.cape_du_sinistrofu = {
    id: 'cape_du_sinistrofu',
    name: 'Cape du Sinistrofu',
    image: 'images/items/Cape_du_Sinistrofu.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_sinistrofu',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 71 }, { stat: 'flatDamage', value: 3 }, { stat: 'critChance', value: 4 }, { stat: 'heal', value: 7 }, { stat: 'dropRate', value: 3 }, { stat: 'res.eau', value: 6 }, { stat: 'res.terre', value: 11 }, { stat: 'res.neutre', value: 8 }],
    description: ''
}

item.amulette_du_strigide = {
    id: 'amulette_du_strigide',
    name: 'Amulette du Strigide',
    image: 'images/items/Amulette_du_Strigide.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_strigide',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 86 }, { stat: 'critChance', value: 4 }, { stat: 'critDamagePct', value: 16 }, { stat: 'critResPct', value: -16 }, { stat: 'res.terre', value: 6 }, { stat: 'res.air', value: 6 }],
    description: ''
}

item.bottes_du_strigide = {
    id: 'bottes_du_strigide',
    name: 'Bottes du Strigide',
    image: 'images/items/Bottes_du_Strigide.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_strigide',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 51 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 45 }, { stat: 'critResPct', value: -16 }, { stat: 'res.feu', value: 6 }],
    description: ''
}

item.ceinture_du_strigide = {
    id: 'ceinture_du_strigide',
    name: 'Ceinture du Strigide',
    image: 'images/items/Ceinture_du_Strigide.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_strigide',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 31 }, { stat: 'flatDamage', value: 35 }, { stat: 'critChance', value: 5 }, { stat: 'critDamagePct', value: 11 }, { stat: 'critResPct', value: -16 }, { stat: 'heal', value: 5 }, { stat: 'res.neutre', value: 6 }],
    description: ''
}

item.cape_du_valet_veinard = {
    id: 'cape_du_valet_veinard',
    name: 'Cape du Valet Veinard',
    image: 'images/items/Cape_du_Valet_Veinard.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_valet_veinard',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 61 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: -5 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 7 }, { stat: 'res.neutre', value: 7 }],
    description: ''
}

item.collier_du_valet_veinard = {
    id: 'collier_du_valet_veinard',
    name: 'Collier du Valet Veinard',
    image: 'images/items/Collier_du_Valet_Veinard.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_valet_veinard',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 111 }, { stat: 'flatDamage', value: 16 }, { stat: 'critChance', value: -5 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 7 }, { stat: 'res.eau', value: 5 }],
    description: ''
}

item.gant_du_valet_veinard = {
    id: 'gant_du_valet_veinard',
    name: 'Gant du Valet Veinard',
    image: 'images/items/Gant_du_Valet_Veinard.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_valet_veinard',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 56 }, { stat: 'flatDamage', value: 11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 7 }],
    description: ''
}

item.arc_du_venerable_endormi = {
    id: 'arc_du_venerable_endormi',
    name: 'Arc du Vénérable Endormi',
    image: 'images/items/Arc_du_Vénérable_Endormi.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_venerable_endormi',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 401 }, { stat: 'atk', value: 86 }, { stat: 'spd', value: -20 }, { stat: 'flatDamage', value: 56 }, { stat: 'critChance', value: 5 }, { stat: 'heal', value: 7 }, { stat: 'dropRate', value: 2 }, { stat: 'res.eau', value: 4 }, { stat: 'res.terre', value: 4 }],
    description: ''
}

item.cornes_du_venerable_endormi = {
    id: 'cornes_du_venerable_endormi',
    name: 'Cornes du Vénérable Endormi',
    image: 'images/items/Cornes_du_Vénérable_Endormi.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_venerable_endormi',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 401 }, { stat: 'atk', value: 71 }, { stat: 'spd', value: -30 }, { stat: 'critChance', value: 4 }, { stat: 'heal', value: 5 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 3 }, { stat: 'res.eau', value: 3 }, { stat: 'res.air', value: 3 }],
    description: ''
}

item.malediction_du_venerable_endormi = {
    id: 'malediction_du_venerable_endormi',
    name: 'Malédiction du Vénérable Endormi',
    image: 'images/items/Malédiction_du_Vénérable_Endormi.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplie_du_venerable_endormi',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 71 }, { stat: 'spd', value: -30 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 1 }, { stat: 'res.feu', value: 4 }, { stat: 'res.eau', value: 4 }],
    description: ''
}

item.manteau_du_venerable_endormi = {
    id: 'manteau_du_venerable_endormi',
    name: 'Manteau du Vénérable Endormi',
    image: 'images/items/Manteau_du_Vénérable_Endormi.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_venerable_endormi',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 71 }, { stat: 'spd', value: -20 }, { stat: 'flatDamage', value: 7 }, { stat: 'critChance', value: 4 }, { stat: 'heal', value: 11 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 3 }, { stat: 'res.eau', value: 3 }, { stat: 'res.terre', value: 3 }],
    description: ''
}

item.bouclier_ponyme = {
    id: 'bouclier_ponyme',
    name: 'Bouclier Ponyme',
    image: 'images/items/Bouclier_Ponyme.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_du_wukang',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 51 }, { stat: 'critChance', value: -3 }, { stat: 'critResPct', value: 11 }, { stat: 'res.feu', value: -3 }, { stat: 'res.eau', value: -3 }, { stat: 'res.terre', value: 6 }, { stat: 'res.air', value: 6 }],
    description: ''
}

item.cape_ostrophe = {
    id: 'cape_ostrophe',
    name: 'Cape Ostrophe',
    image: 'images/items/Cape_Ostrophe.png',
    type: 'equipment',
    slot: 'cape',
    set: 'panoplie_du_wukang',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: -4 }, { stat: 'res.feu', value: 7 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.casque_onsonne = {
    id: 'casque_onsonne',
    name: 'Casque Onsonne',
    image: 'images/items/Casque_Onsonne.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'panoplie_du_wukang',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: -5 }, { stat: 'critResPct', value: 16 }, { stat: 'res.feu', value: 7 }, { stat: 'res.eau', value: 7 }],
    description: ''
}

item.faux_neme = {
    id: 'faux_neme',
    name: 'Faux Nème',
    image: 'images/items/Faux_Nème.png',
    type: 'equipment',
    slot: 'arme',
    set: 'panoplie_du_wukang',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 401 }, { stat: 'atk', value: 61 }, { stat: 'spd', value: -15 }, { stat: 'flatDamage', value: 72 }, { stat: 'critChance', value: -3 }, { stat: 'critResPct', value: 16 }, { stat: 'res.feu', value: 3 }, { stat: 'res.eau', value: 3 }],
    description: ''
}

item.amulette_rinne = {
    id: 'amulette_rinne',
    name: 'Amulette Rinne',
    image: 'images/items/Amulette_Rinne.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplie_du_wukin',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 76 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 3 }, { stat: 'critResPct', value: -25 }, { stat: 'res.terre', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.carapace_onance = {
    id: 'carapace_onance',
    name: 'Carapace Onance',
    image: 'images/items/Carapace_Onance.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplie_du_wukin',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 51 }, { stat: 'critChance', value: 2 }, { stat: 'res.feu', value: 6 }, { stat: 'res.eau', value: 6 }, { stat: 'res.terre', value: -3 }, { stat: 'res.air', value: -3 }],
    description: ''
}

item.sangle_icisme = {
    id: 'sangle_icisme',
    name: 'Sangle Icisme',
    image: 'images/items/Sangle_Icisme.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'panoplie_du_wukin',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 18 }, { stat: 'critChance', value: 3 }, { stat: 'res.terre', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.solerets_kritur = {
    id: 'solerets_kritur',
    name: 'Solerets Kritur',
    image: 'images/items/Solerets_Kritur.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplie_du_wukin',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 401 }, { stat: 'atk', value: 61 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 22 }, { stat: 'critChance', value: 2 }, { stat: 'critResPct', value: -25 }, { stat: 'res.terre', value: 3 }, { stat: 'res.air', value: 3 }],
    description: ''
}

item.baguistik = {
    id: 'baguistik',
    name: 'Baguistik',
    image: 'images/items/Baguistik.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'panoplistik',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 46 }, { stat: 'flatDamage', value: 15 }, { stat: 'critChance', value: 3 }, { stat: 'critResPct', value: 21 }, { stat: 'heal', value: 7 }, { stat: 'res.eau', value: 5 }],
    description: ''
}

item.bottistik = {
    id: 'bottistik',
    name: 'Bottistik',
    image: 'images/items/Bottistik.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'panoplistik',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 63 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 21 }, { stat: 'critResPct', value: 21 }, { stat: 'heal', value: 9 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.bouclistik = {
    id: 'bouclistik',
    name: 'Bouclistik',
    image: 'images/items/Bouclistik.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'panoplistik',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 201 }, { stat: 'atk', value: 118 }, { stat: 'damageReductionPct', value: 5 }, { stat: 'dropRate', value: 3 }, { stat: 'res.neutre', value: 3 }],
    description: ''
}

item.torquistik = {
    id: 'torquistik',
    name: 'Torquistik',
    image: 'images/items/Torquistik.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'panoplistik',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 113 }, { stat: 'flatDamage', value: 21 }, { stat: 'critResPct', value: 16 }, { stat: 'heal', value: 7 }, { stat: 'dropRate', value: 2 }, { stat: 'res.feu', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.ceintouse = {
    id: 'ceintouse',
    name: 'Ceintouse',
    image: 'images/items/Ceintouse.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'poulplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 41 }, { stat: 'flatDamage', value: 27 }, { stat: 'critChance', value: 3 }, { stat: 'res.feu', value: 7 }, { stat: 'res.air', value: 7 }],
    description: ''
}

item.chapoulpe = {
    id: 'chapoulpe',
    name: 'Chapoulpe',
    image: 'images/items/Chapoulpe.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'poulplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 66 }, { stat: 'flatDamage', value: 27 }, { stat: 'critChance', value: 3 }, { stat: 'res.feu', value: 7 }],
    description: ''
}

item.tentassons = {
    id: 'tentassons',
    name: 'Tentassons',
    image: 'images/items/Tentassons.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'poulplie',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 41 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 33 }, { stat: 'dropRate', value: 2 }, { stat: 'res.terre', value: 5 }, { stat: 'res.neutre', value: 5 }],
    description: ''
}

item.bois_de_la_liche = {
    id: 'bois_de_la_liche',
    name: 'Bois de la Liche',
    image: 'images/items/Bois_de_la_Liche.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'reliques_de_l_aurore_pourpre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 54 }, { stat: 'flatDamage', value: 46 }, { stat: 'critResPct', value: -16 }, { stat: 'res.feu', value: -3 }, { stat: 'res.eau', value: 4 }, { stat: 'res.terre', value: -3 }, { stat: 'res.air', value: 4 }],
    description: ''
}

item.chant_du_necromant = {
    id: 'chant_du_necromant',
    name: 'Chant du Nécromant',
    image: 'images/items/Chant_du_Nécromant.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'reliques_de_l_aurore_pourpre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 74 }, { stat: 'flatDamage', value: 26 }, { stat: 'critResPct', value: 7 }, { stat: 'res.feu', value: 6 }, { stat: 'res.eau', value: -4 }, { stat: 'res.terre', value: 6 }, { stat: 'res.air', value: -4 }],
    description: ''
}

item.ciel_de_foudre_noire = {
    id: 'ciel_de_foudre_noire',
    name: 'Ciel de Foudre Noire',
    image: 'images/items/Ciel_de_Foudre_Noire.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'reliques_de_l_aurore_pourpre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 301 }, { stat: 'atk', value: 39 }, { stat: 'spd', value: 15 }, { stat: 'flatDamage', value: 26 }, { stat: 'critResPct', value: -20 }, { stat: 'res.feu', value: -4 }, { stat: 'res.eau', value: 6 }, { stat: 'res.terre', value: -4 }, { stat: 'res.air', value: 6 }],
    description: ''
}

item.derniere_aube = {
    id: 'derniere_aube',
    name: 'Dernière Aube',
    image: 'images/items/Dernière_Aube.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'reliques_de_l_aurore_pourpre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 29 }, { stat: 'flatDamage', value: 16 }, { stat: 'critResPct', value: 9 }, { stat: 'res.feu', value: 3 }, { stat: 'res.eau', value: -2 }, { stat: 'res.terre', value: 3 }, { stat: 'res.air', value: -2 }],
    description: ''
}

item.mort_du_centoror = {
    id: 'mort_du_centoror',
    name: 'Mort du Centoror',
    image: 'images/items/Mort_du_Centoror.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'reliques_de_l_aurore_pourpre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 251 }, { stat: 'atk', value: 29 }, { stat: 'flatDamage', value: 16 }, { stat: 'critResPct', value: -24 }, { stat: 'res.feu', value: -2 }, { stat: 'res.eau', value: 3 }, { stat: 'res.terre', value: -2 }, { stat: 'res.air', value: 3 }],
    description: ''
}

item.portes_de_bonta = {
    id: 'portes_de_bonta',
    name: 'Portes de Bonta',
    image: 'images/items/Portes_de_Bonta.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'reliques_de_l_aurore_pourpre',
    rarity: 'commun',
    itemLevelMax: 20,
    requiredLevel: 200,
    stats: [{ stat: 'maxHp', value: 351 }, { stat: 'atk', value: 54 }, { stat: 'flatDamage', value: 46 }, { stat: 'critResPct', value: 5 }, { stat: 'res.feu', value: 4 }, { stat: 'res.eau', value: -3 }, { stat: 'res.terre', value: 4 }, { stat: 'res.air', value: -3 }],
    description: ''
}
