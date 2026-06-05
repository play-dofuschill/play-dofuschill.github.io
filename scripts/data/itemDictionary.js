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
        rarity: 'legendary',
        stats:  [{ stat: 'atk', value: 20 }, { stat: 'maxHp', value: 50 }],
        effects: [
            { every:4, after:8, type:'heal%maxHp', heal:3, target:'self' },
            { on_effect:{ source:'enemy', type:'dot' }, reaction:'cancel' }]
    }
*/

// ────────────────────────────────────────────────────────────────────────
// ───────────────── fonctionnalité de level de l'item ────────────────────
// ────────────────────────────────────────────────────────────────────────

const LEVEL_TIERS = [
    { maxLevel: 5, tier: 1 },
    { maxLevel: 12, tier: 2 },
    { maxLevel: 19, tier: 3 },
    { maxLevel: 20, tier: 4 }
]

function getItemTier(level) {
    return (LEVEL_TIERS.find(t => level <= t.maxLevel) ?? LEVEL_TIERS[LEVEL_TIERS.length - 1]).tier
}

const ITEM_TIER_MULTIPLIERS = {
    1: 1.00,
    2: 1.15,
    3: 1.30,
    4: 1.50
}

function getMaxForgeSlots(statCount) {
    return Math.ceil(statCount / 2)
}

function getItemStats(itm, level, forgedStats = null, transForge = null) {
    const tier       = getItemTier(level)
    const multiplier = ITEM_TIER_MULTIPLIERS[tier] || 1

    // support array (new) and single object (backward compat)
    const arr = Array.isArray(forgedStats) ? forgedStats : (forgedStats ? [forgedStats] : [])
    const map = {}
    for (const f of arr) { map[f.statIndex] = f }

    const result = itm.stats.map((s, i) => {
        const forged = map[i]
        if (forged) {
            const base = Math.round(s.value * multiplier)
            if (forged.stat !== s.stat) {
                return { stat: forged.stat, value: forged.value, isForged: true, isTranscendance: false }
            }
            return { stat: s.stat, value: base + forged.value, isForged: true, forgeBonus: forged.value }
        }
        return { stat: s.stat, value: Math.round(s.value * multiplier), isForged: false }
    })

    if (transForge) {
        result.push({ stat: transForge.stat, value: transForge.value, isForged: true, isTranscendance: true, forgeBonus: transForge.value })
    }

    return result
}

// ────────────────────────────────────────────────────────────────────────
// ────────────────── Pour une future implémentation ──────────────────────
// ───────────── augmenter le boost de passage de palier ──────────────────
// ────────────────────────────────────────────────────────────────────────
// const RARITY_MULT = {
//     common: 1,
//     uncommon: 1.1,
//     rare: 1.25,
//     epic: 1.45,
//     legendary: 1.7
// }

// finalValue = baseValue * tierMultiplier * rarityMultiplier
// ────────────────────────────────────────────────────────────────────────
// ────────────────── Pour une future implémentation ──────────────────────
// ────────────────────────────────────────────────────────────────────────

const item = {}

// #region Panoplie Aventurier — Incarnam ──────────────────
item.bottesAventurier = {
    id: 'bottesAventurier',
    name: "Bottes de l'Aventurier",
    image: 'img/items/panoplies/bottes_aventurier.png',
    type: 'equipment', slot: 'bottes', set: 'aventurier', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 5 }, { stat: 'atk', value: 5 }],
    description: 'Bottes de simple facture, idéales pour les jeunes aventuriers.'
}
item.capeAventurier = {
    id: 'capeAventurier',
    name: "Cape de l'Aventurier",
    image: 'img/items/panoplies/cape_aventurier.png',
    type: 'equipment', slot: 'cape', set: 'aventurier', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 5 }, { stat: 'atk', value: 5 }],
    description: 'Classe mais peu performante, comblera les jeunes aventuriers.'
}
item.chapeauAventurier = {
    id: 'chapeauAventurier',
    name: "Chapeau de l'Aventurier",
    image: 'img/items/panoplies/chapeau_aventurier.png',
    type: 'equipment', slot: 'coiffe', set: 'aventurier', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 5 }, { stat: 'atk', value: 5 }],
    description: "Pas très classe, mais ça fait le travail."
}
item.anneauAventurier = {
    id: 'anneauAventurier',
    name: "Anneau de l'Aventurier",
    image: 'img/items/panoplies/anneau_aventurier.png',
    type: 'equipment', slot: 'anneau', set: 'aventurier', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 5 }, { stat: 'atk', value: 5 }],
    description: "Un petit anneau sympathique pour les débutants."
}
item.ceintureAventurier = {
    id: 'ceintureAventurier',
    name: "Ceinture de l'Aventurier",
    image: 'img/items/panoplies/ceinture_aventurier.png',
    type: 'equipment', slot: 'ceinture', set: 'aventurier', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 5 }, { stat: 'atk', value: 5 }],
    description: 'Une petite ceinture pour les aventuriers en herbe.'
}
item.amuletteAventurier = {
    id: 'amuletteAventurier',
    name: "Amulette de l'Aventurier",
    image: 'img/items/panoplies/amulette_aventurier.png',
    type: 'equipment', slot: 'amulette', set: 'aventurier', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 5 }, { stat: 'atk', value: 5 }],
    description: "Sympathique lorsque l'on possède la panoplie."
}
// #endregion
// #region Panoplie Kardorim — Donjon kardorim ──────────────────
item.anneauKardorim = {
    id: 'anneauKardorim',
    name: "Bracelet de Kardorim",
    image: 'img/items/panoplies/anneau_kardorim.png',
    type: 'equipment', slot: 'anneau', set: 'kardorim', rarity: 'peu_commun', levelMax: 20,
    stats: [{ stat: 'atk', value: 10 }, { stat: 'flatDamage', value: 2 }],
    description: "Fait à partir d'os de Chafer, ce magnifique bracelet protègera votre poignet des coups d'épée visant à le trancher, tout en vous musclant le bras. Un objet incontournable pour le débutant que vous êtes."
}
item.capeKardorim = {
    id: 'capeKardorim',
    name: "Cape de Kardorim",
    image: 'img/items/panoplies/cape_kardorim.png',
    type: 'equipment', slot: 'cape', set: 'kardorim', rarity: 'peu_commun', levelMax: 20,
    stats: [{ stat: 'atk', value: 10 }],
    description: "En portant cette cape, vous pourriez faire croire aux Chafers d'Incarnam que vous êtes leur capitaine. Dommage qu'ils n'aient pas d'yeux pour voir ça !"
}
item.coiffeKardorim = {
    id: 'coiffeKardorim',
    name: "Casque de Kardorim",
    image: 'img/items/panoplies/coiffe_kardorim.png',
    type: 'equipment', slot: 'coiffe', set: 'kardorim', rarity: 'peu_commun', levelMax: 20,
    stats: [{ stat: 'atk', value: 10 }, { stat: 'flatDamage', value: 2 }],
    description: "« Casque à pointes » rime avec « courtepointe », une couverture doublée qu'on étend sur le lit pour avoir chaud en hiver. Savoir cela ne fera pas de vous un héros, mais vous serez certainement plus cultivé !"
}
// #endregion
// #region Panoplie Bouftou — Tainela ────────────────────────
item.cape_bouftou = {
    id: 'cape_bouftou',
    name: 'Cape Bouftou',
    image: 'img/items/panoplies/cape_bouftou.png',
    type: 'equipment', slot: 'cape', set: 'bouftou', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 28 }],
    description: "Résistante et confortable. L'odeur est une autre histoire."
}
item.coiffe_bouftou = {
    id: 'coiffe_bouftou',
    name: 'Coiffe Bouftou',
    image: 'img/items/panoplies/coiffe_bouftou.png',
    type: 'equipment', slot: 'coiffe', set: 'bouftou', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'atk', value: 14 }],
    description: "Permet de gagner en force à qui s'habitue à l'odeur."
}
item.bottes_bouftou = {
    id: 'bottes_bouftou',
    name: 'Bottes Bouftou',
    image: 'img/items/panoplies/bottes_bouftou.png',
    type: 'equipment', slot: 'bottes', set: 'bouftou', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 14 }, { stat: 'atk', value: 10 }],
    description: "D'un confort inégalé. L'intérieur est doublé en laine de Bouftou."
}
item.anneau_bouftou = {
    id: 'anneau_bouftou',
    name: 'Anneau Bouftou',
    image: 'img/items/panoplies/anneau_bouftou.png',
    type: 'equipment', slot: 'anneau', set: 'bouftou', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }],
    description: 'Provient du fameux Bouze le Clerc.'
}
item.amulette_bouftou = {
    id: 'amulette_bouftou',
    name: 'Amulette Bouftou',
    image: 'img/items/panoplies/amulette_bouftou.png',
    type: 'equipment', slot: 'amulette', set: 'bouftou', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 8 }, { stat: 'atk', value: 8 }],
    description: "Procure calme et sagesse. Ou l'inverse."
}
item.ceinture_bouftou = {
    id: 'ceinture_bouftou',
    name: 'Ceinture Bouftou',
    image: 'img/items/panoplies/ceinture_bouftou.png',
    type: 'equipment', slot: 'ceinture', set: 'bouftou', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 15 }],
    description: "Rapide à équiper, doublée en laine soyeuse de Boufton."
}
item.marteau_bouftou = {
    id: 'marteau_bouftou',
    name: 'Marteau Bouftou',
    image: 'img/items/panoplies/marteau_bouftou.png',
    type: 'equipment', slot: 'arme', set: 'bouftou', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'atk', value: 2 }, { stat: 'flatDamage', value: 1 }],
    description: "Capable de libérer une énergie colossale lorsque bien manié."
}
item.bouclier_bouftou = {
    id: 'bouclier_bouftou',
    name: 'Bouclier Bouftou',
    image: 'img/items/panoplies/bouclier_bouftou.png',
    type: 'equipment', slot: 'bouclier', set: 'bouftou', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'res.neutre', value: 7 }],
    description: "Impressionnant grâce à l'odeur qu'il dégage."
}
// #endregion
// #region Panoplie Bouftou royal — Tainela ────────────────────────
item.cape_bouftou_royal = {
    id: 'cape_bouftou_royal',
    name: 'Cape Bouftou Royal',
    image: 'img/items/panoplies/cape_bouftou_royal.png',
    type: 'equipment', slot: 'cape', set: 'bouftouRoyal', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 25 }, { stat: 'res.terre', value: 4 }],
    description: "Cette cape portée par le grand Bouftou Royal confère, en plus d'un style fabuleux, une force hors du commun."
}
item.coiffe_bouftou_royal = {
    id: 'coiffe_bouftou_royal',
    name: 'Coiffe Bouftou Royal',
    image: 'img/items/panoplies/coiffe_bouftou_royal.png',
    type: 'equipment', slot: 'coiffe', set: 'bouftouRoyal', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'atk', value: 25 }],
    description: "La Boufcoiffe Royale est un objet indémodable. Elégante, elle procure à son porteur force et intelligence."
}
item.bottes_bouftou_royal = {
    id: 'bottes_bouftou_royal',
    name: 'Bottes Bouftou Royal',
    image: 'img/items/panoplies/bottes_bouftou_royal.png',
    type: 'equipment', slot: 'bottes', set: 'bouftouRoyal', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 25 }, { stat: 'flatDamage', value: 2 }],
    description: "Elles brillent, elles respirent la puissance, ces bottes sont en tous points royales."
}
item.anneau_bouftou_royal = {
    id: 'anneau_bouftou_royal',
    name: 'Anneau Bouftou Royal',
    image: 'img/items/panoplies/anneau_bouftou_royal.png',
    type: 'equipment', slot: 'anneau', set: 'bouftouRoyal', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 30 }, { stat: 'flatDamage', value: 1 }],
    description: "Cet anneau tout comme l'odeur de la femelle du Bouftou Royal augmente votre charme."
}
item.amulette_bouftou_royal = {
    id: 'amulette_bouftou_royal',
    name: 'Amulette Bouftou Royal',
    image: 'img/items/panoplies/amulette_bouftou_royal.png',
    type: 'equipment', slot: 'amulette', set: 'bouftouRoyal', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'atk', value: 14 }, { stat: 'critChance', value: 2 }],
    description: "Cette amulette augmente la force et l'intelligence de son porteur."
}
item.ceinture_bouftou_royal = {
    id: 'ceinture_bouftou_royal',
    name: 'Ceinture Bouftou Royal',
    image: 'img/items/panoplies/ceinture_bouftou_royal.png',
    type: 'equipment', slot: 'ceinture', set: 'bouftouRoyal', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 35 }, { stat: 'critChance', value: 2 }],
    description: "Elle est si douce qu'elle permet même de ligoter sa dulcinée lorsque celle-ci refuse de rester à la maison."
}
item.epee_bouftou_royal = {
    id: 'epee_bouftou_royal',
    name: 'Épée du Bouftou Royal',
    image: 'img/items/panoplies/epee_bouftou_royal.png',
    type: 'equipment', slot: 'arme', set: 'bouftouRoyal', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'flatDamage', value: 5 }],
    description: "Cette épée ne sait pas trop sur quel sabot danser..."
}
item.bouclier_bouftou_royal = {
    id: 'bouclier_bouftou_royal',
    name: 'Bouclier Bouftou Royal',
    image: 'img/items/panoplies/bouclier_bouftou_royal.png',
    type: 'equipment', slot: 'bouclier', set: 'bouftouRoyal', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 14 }, { stat: 'atk', value: 14 }, { stat: 'res.feu', value: 7 }],
    description: "Cette cuirasse royale vous donnera autorité sur les bouftous de Tainéla."
}
// #endregion
// #region Panoplie Homme_Ours — foret ────────────────────────
item.cape_de_lHomme_Ours = {
    id: 'cape_de_lHomme_Ours',
    name: "Cape de l'Homme Ours",
    image: 'img/items/panoplies/cape_de_lHomme_Ours.png',
    type: 'equipment', slot: 'cape', set: 'Homme_Ours', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'atk', value: 16 }],
    description: "Cette jolie cape a été portée pendant des années par le célèbre Homme Ours. Elle ne fera pas de vous un ours, mais vous pourrez rivaliser avec les plus grands."
}
item.coiffe_de_lHomme_Ours = {
    id: 'coiffe_de_lHomme_Ours',
    name: "Coiffe de l'Homme Ours",
    image: 'img/items/panoplies/coiffe_de_lHomme_Ours.png',
    type: 'equipment', slot: 'coiffe', set: 'Homme_Ours', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 10 }, { stat: 'atk', value: 20 }],
    description: "Cette étrange coiffe a appartenu au tristement célèbre Homme Ours. Cousue à partir des restes de la tête d'un ours en décomposition, cette coiffe vous permettra de ne pas passer inaperçu, et surtout, de laisser grâce à son odeur originale, une trace de votre passage."
}
item.bottes_de_lHomme_Ours = {
    id: 'bottes_de_lHomme_Ours',
    name: "Bottes de l'Homme Ours",
    image: 'img/items/panoplies/bottes_de_lHomme_Ours.png',
    type: 'equipment', slot: 'bottes', set: 'Homme_Ours', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'atk', value: 10 }, { stat: 'critChance', value: 2 }],
    description: "Ces bottes sont rembourrées avec de la fourrure d'ours. De quoi garder les pieds au chaud même pour ceux qui ont le sang froid."
}
item.anneau_de_lHomme_Ours = {
    id: 'anneau_de_lHomme_Ours',
    name: "Anneau de l'Homme Ours",
    image: 'img/items/panoplies/anneau_de_lHomme_Ours.png',
    type: 'equipment', slot: 'anneau', set: 'Homme_Ours', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 15 }, { stat: 'spd', value: 5 }, { stat: 'flatDamage', value: 1 }],
    description: "L'Homme Ours n'a jamais quitté cette alliance, bien que sa femme fût dévorée sous ses yeux, par un des ours qu'il venait d'invoquer, et cela pour impressionner sa dulcinée. Elle a effectivement été très impressionnée."
}
item.amulette_de_lHomme_Ours = {
    id: 'amulette_de_lHomme_Ours',
    name: "Amulette de l'Homme Ours",
    image: 'img/items/panoplies/amulette_de_lHomme_Ours.png',
    type: 'equipment', slot: 'amulette', set: 'Homme_Ours', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'atk', value: 14 }, { stat: 'res.feu', value: 4 }],
    description: "L'Homme Ours portait cette amulette autour du cou, lorsqu'il a affronté les brigandins de la tanière de Bimdhoul. La légende raconte qu'elle lui a sauvé la vie, mais quand on la regarde de près, on s'aperçoit qu'il s'agit bien d'une légende."
}
item.ceinture_de_lHomme_Ours = {
    id: 'ceinture_de_lHomme_Ours',
    name: "Ceinture de l'Homme Ours",
    image: 'img/items/panoplies/ceinture_de_lHomme_Ours.png',
    type: 'equipment', slot: 'ceinture', set: 'Homme_Ours', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 14 }, { stat: 'healPct', value: 1 }],
    description: "Cette petite ceinture recouverte de poils d'ours est idéale pour cacher vos poignées d'amour. Il est donc conseillé de ne jamais l'enlever, pour ne pas décevoir l'élu de votre cœur."
}
item.baton_de_lHomme_Ours = {
    id: 'baton_de_lHomme_Ours',
    name: "Bâton de l'Homme Ours",
    image: 'img/items/panoplies/baton_de_lHomme_Ours.png',
    type: 'equipment', slot: 'arme', set: 'Homme_Ours', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'atk', value: 10 }],
    description: "L'Homme Ours utilisait ce bâton pour dresser ses invocations d'ours, et parfois pour frapper les doigts de ses enfants, lorsque ces derniers ne faisaient pas leurs devoirs en revenant de l'école. Voilà un homme qui avait tout compris à l'éducation des enfants."
}
// #endregion
// #region Panoplie sanglier — foret ────────────────────────
item.bottes_du_sanglier = {
    id: 'bottes_du_sanglier',
    name: "Pied du Sanglier",
    image: 'img/items/panoplies/bottes_de_lHomme_Ours.png',
    type: 'equipment', slot: 'bottes', set: 'Sanglier', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 10 }, { stat: 'atk', value: -10 }, { stat: 'critChance', value: 3 }],
    description: "Ces bottes sont parfaites pour marcher dans la boue et rayer les parquets. Elles sont généralement interdites sur toutes les pistes de danse."
}
item.anneau_du_sanglier = {
    id: 'anneau_du_sanglier',
    name: "Anneau du Sanglier",
    image: 'img/items/panoplies/anneau_du_sanglier.png',
    type: 'equipment', slot: 'anneau', set: 'Sanglier', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'critChance', value: 3 }],
    description: "Cet anneau était placé sur les pattes des sangliers en rut, pour que les éleveurs puissent facilement les reconnaître. Aujourd'hui, c'est vous qui portez cet anneau. Toutes les interprétations sont possibles."
}
item.ceinture_du_sanglier = {
    id: 'ceinture_du_sanglier',
    name: "Sanglature",
    image: 'img/items/panoplies/ceinture_du_sanglier.png',
    type: 'equipment', slot: 'ceinture', set: 'Sanglier', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'critChance', value: 2 }, { stat: 'healPct', value: 2 }],
    description: "Poilue mais élégante, cette ceinture devrait parfois vous faire penser à votre dulcinée."
}
// #endregion
// #region Panoplie prespic — Tainela ────────────────────────
item.cape_du_prespic = {
    id: 'cape_du_prespic',
    name: 'Cape du Prespic',
    image: 'img/items/panoplies/cape_du_prespic.png',
    type: 'equipment', slot: 'cape', set: 'Prespic', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 25 }, { stat: 'atk', value: 10 }, { stat: 'flatDamage', value: 3 }],
    description: "Cette petite cape rousse peut également faire office de descente de lit, ou de paillasson, de quoi remettre au goût du jour l'intérieur de votre habitation, de manière économique."
}
item.coiffe_du_prespic = {
    id: 'coiffe_du_prespic',
    name: 'Coiffe du Prespic',
    image: 'img/items/panoplies/coiffe_du_prespic.png',
    type: 'equipment', slot: 'coiffe', set: 'Prespic', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'flatDamage', value: 3 }],
    description: "Avec cette coiffe de Prespic sur la tête, vous ressemblez presque à Dévie Cloquette, célèbre chasseuse des temps modernes, prête à tout pour cacher sa calvitie naissante. Pas de chance pour vous si vous vouliez faire de même, vous devrez vous contenter d'une coiffe de couleur rousse, qui de toute évidence, dégagera une horrible odeur dès qu'il se mettra à pleuvoir."
}
item.anneau_du_prespic = {
    id: 'anneau_du_prespic',
    name: 'Anneau du Prespic',
    image: 'img/items/panoplies/anneau_du_prespic.png',
    type: 'equipment', slot: 'anneau', set: 'Prespic', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 10 }, { stat: 'critChance', value: 1 }],
    description: "À la fois sobre et tout de même original, cet anneau saura séduire les aventuriers avides d'apparat de luxes mais complètement fauchés, au point d'aller dépouiller de ridicules petites créatures sauvages pour s'orner de bijoux. La mesquinerie ne connaît aucune limite."
}
item.ceinture_du_prespic = {
    id: 'ceinture_du_prespic',
    name: 'Ceinture du Prespic',
    image: 'img/items/panoplies/ceinture_du_prespic.png',
    type: 'equipment', slot: 'ceinture', set: 'Prespic', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'flatDamage', value: 4 }],
    description: "Idéale pour garder ses hanches au chaud, cette ceinture a tout de même l'inconvénient d'irriter et de démanger les peaux douces. À réserver aux durs à cuir."
}
item.bouclier_du_prespic = {
    id: 'bouclier_du_prespic',
    name: 'Bouclier hérissé du Prespic',
    image: 'img/items/panoplies/bouclier_du_prespic.png',
    type: 'equipment', slot: 'bouclier', set: 'Prespic', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 10 }, { stat: 'flatDamage', value: 3 }],
    description: "Ce bouclier en véritables poils de prespic se hérisse en présence d'ennemis. C'est bien pratique pour dissuader les plus hardis : qui s'approche trop près s'y pique !"
}
// #endregion
// #region Panoplie Mousse — Plage d'Astrub ──────────────────
item.cape_mousse = {
    id: 'cape_mousse',
    name: 'Cape en mousse',
    image: 'img/items/panoplies/cape_mousse.png',
    type: 'equipment', slot: 'cape', set: 'mousse', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'atk', value: 20 }],
    description: "Cette cape est idéale pour le camouflage en milieu naturel, mais uniquement s'il n'y a personne pour vous voir."
}
item.coiffe_mousse = {
    id: 'coiffe_mousse',
    name: 'Coiffe en mousse',
    image: 'img/items/panoplies/coiffe_mousse.png',
    type: 'equipment', slot: 'coiffe', set: 'mousse', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 10 }, { stat: 'atk', value: 10 }, { stat: 'flatDamage', value: 2 }],
    description: "Cette coiffe résume la conception moderne du ménage et de la répartition des tâches ménagères au sein des couples épanouïs."
}
item.bottes_mousse = {
    id: 'bottes_mousse',
    name: 'Bottes en mousse',
    image: 'img/items/panoplies/bottes_mousse.png',
    type: 'equipment', slot: 'bottes', set: 'mousse', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 15 }],
    description: "Certains se servent de ces bottes pour se gratter les pieds en marchant, ou tout simplement pour les nettoyer."
}
item.anneau_mousse = {
    id: 'anneau_mousse',
    name: 'Anneau en mousse',
    image: 'img/items/panoplies/anneau_mousse.png',
    type: 'equipment', slot: 'anneau', set: 'mousse', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 14 }, { stat: 'flatDamage', value: 1 }],
    description: "Offert en alliance, cet anneau permet de faire passer deux messages à l'être aimé : \"Je t'aime\" et \"Va faire la vaisselle\"."
}
item.amulette_mousse = {
    id: 'amulette_mousse',
    name: 'Amulette en mousse',
    image: 'img/items/panoplies/amulette_mousse.png',
    type: 'equipment', slot: 'amulette', set: 'mousse', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'atk', value: 10 }, { stat: 'critChance', value: 1 }],
    description: "Cette amulette est souvent confondue avec un jouet à trouver dans des pochettes surprises, alors qu'en fait elle se gagne au stand de tir."
}
item.ceinture_mousse = {
    id: 'ceinture_mousse',
    name: 'Ceinture en mousse',
    image: 'img/items/panoplies/ceinture_mousse.png',
    type: 'equipment', slot: 'ceinture', set: 'mousse', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'atk', value: 20 }],
    description: "Cette ceinture permettait à Vald de prendre son bain sans danger car aucun Iop n'a encore réussi à apprendre à nager."
}
item.pelle_mousse = {
    id: 'pelle_mousse',
    name: 'Pelle en mousse',
    image: 'img/items/panoplies/pelle_mousse.png',
    type: 'equipment', slot: 'arme', set: 'mousse', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 5 }, { stat: 'atk', value: 14 }, { stat: 'critChance', value: 1 }],
    description: "Cette arme terriblement puissante contre les mottes de terre, a marqué plus d'un aventurier débutant."
}
item.bouclier_mousse = {
    id: 'bouclier_mousse',
    name: 'Bouclier en mousse',
    image: 'img/items/panoplies/bouclier_mousse.png',
    type: 'equipment', slot: 'bouclier', set: 'mousse', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 14 }, { stat: 'atk', value: 10 }, { stat: 'res.air', value: 4 }],
    description: "Ce bouclier jaune, poreux mais absorbant a été conçu à partir des restes d'un animal qui avait élu domicile dans un ananas tombé au fond de la mer."
}
// #endregion
// #region Panoplie Paysan — Champs d'Astrub ──────────────────
item.sac_paysan = {
    id: 'sac_paysan',
    name: 'Sac du Paysan',
    image: 'img/items/panoplies/sac_paysan.png',
    type: 'equipment', slot: 'cape', set: 'paysan', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'atk', value: 14 }, { stat: 'spd', value: 2 }],
    description: "Ce sac très en vogue chez les jeunes écoliers, est idéal pour entreposer des farines animales et végétales."
}
item.chapeau_paysan = {
    id: 'chapeau_paysan',
    name: 'Bob du Paysan',
    image: 'img/items/panoplies/chapeau_paysan.png',
    type: 'equipment', slot: 'coiffe', set: 'paysan', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'critChance', value: 2 }],
    description: "Pour se protéger du soleil lorsque vous travaillez dans les champs et que vous êtes pauvre, rien de mieux que le célèbre Bob du Paysan."
}
item.bottes_paysan = {
    id: 'bottes_paysan',
    name: 'Bottes Paysannes',
    image: 'img/items/panoplies/bottes_paysan.png',
    type: 'equipment', slot: 'bottes', set: 'paysan', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 14 }, { stat: 'atk', value: 7 }],
    description: "Ces bottes sont rembourrées avec de la paille de blé, ce qui permet d'absorber la transpiration et de cultiver des champignons toxiques à moindre frais."
}
item.anneau_paysan = {
    id: 'anneau_paysan',
    name: 'Mitaines Mitées du Paysan',
    image: 'img/items/panoplies/anneau_paysan.png',
    type: 'equipment', slot: 'anneau', set: 'paysan', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: -40 }, { stat: 'spd', value: 3 }],
    description: "Elles disposent d'une face abrasive, idéale pour frotter le derrière des Bouftous, ou celui de votre épouse."
}
item.amulette_paysan = {
    id: 'amulette_paysan',
    name: 'Amulette Paysanne',
    image: 'img/items/panoplies/amulette_paysan.png',
    type: 'equipment', slot: 'amulette', set: 'paysan', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'atk', value: 10 }, { stat: 'flatDamage', value: 1 }, { stat: 'spd', value: 2 }],
    description: "Cette amulette est parfumée à l'huile de Tournesol Sauvage et aux fines herbes. Elle peut donc servir d'appât pour les ruminants dangereux que vous voudrez piéger, comme les Bouftous, ou les belles-mères par exemple."
}
item.ceinture_paysan = {
    id: 'ceinture_paysan',
    name: 'Ceinturemuda du Paysan',
    image: 'img/items/panoplies/ceinture_paysan.png',
    type: 'equipment', slot: 'ceinture', set: 'paysan', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 14 }, { stat: 'atk', value: 14 }],
    description: "Cette ceinture est franchement exceptionnelle, puisqu'un bermuda en fibre de lin y est attaché."
}
item.faux_paysan = {
    id: 'faux_paysan',
    name: 'Faux usée du Paysan',
    image: 'img/items/panoplies/faux_paysan.png',
    type: 'equipment', slot: 'arme', set: 'paysan', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 14 }, { stat: 'flatDamage', value: 14 }, { stat: 'critChance', value: 1 }],
    description: "Cette faux robuste mais abîmée a déjà beaucoup servi et coupe assez mal. En revanche, elle est très utile pour lutter contre les varices de vos adversaires."
}
item.bouclier_tournesol = {
    id: 'bouclier_tournesol',
    name: 'Bouclier du Tournesol',
    image: 'img/items/panoplies/bouclier_tournesol.png',
    type: 'equipment', slot: 'bouclier', set: 'paysan', rarity: 'uncommun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 14 }, { stat: 'critChance', value: 2 }],
    description: "L'artisan à l'origine de ce bouclier voulait l'appeler \"La fleur du mâle\", mais la censure locale l'en a empêché."
}
// #endregion
// #region Panoplie scarafeuille — Scarafeuilles ────────────────────────
item.cape_scarafeuille_blanc = {
    id: 'cape_scarafeuille_blanc',
    name: 'Scaracape Blanche',
    image: 'img/items/panoplies/cape_scarafeuille_blanc.png',
    type: 'equipment', slot: 'cape', set: 'scarafeuille_blanc', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 30 }, { stat: 'atk', value: 24 }, { stat: 'flatDamage', value: 4 }, { stat: 'res.air', value: 4 }],
    description: "Qui n'a jamais rêvé de revêtir une cape en coquille de Scarafeuilles ? Une fois équipée, vous devriez réussir à vous prendre pour un véritable Scarafeuille, et peut-être arriverez-vous à vous déplacer en glissant et en dérapant. De quoi décontenancer une horde de Trools."
}
item.coiffe_scarafeuille_blanc = {
    id: 'coiffe_scarafeuille_blanc',
    name: 'Scaracoiffe Blanche',
    image: 'img/items/panoplies/coiffe_scarafeuille_blanc.png',
    type: 'equipment', slot: 'coiffe', set: 'scarafeuille_blanc', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 24 },{ stat: 'atk', value: 24 }, { stat: 'res.air', value: 4 }],
    description: "Affublé de cette coiffe originale, vous pourrez enfin faire croire à vos amis que vous êtes un chasseur de Scarafeuilles."
}
item.anneau_scarafeuille_blanc = {
    id: 'anneau_scarafeuille_blanc',
    name: 'Scaranneau Blanc',
    image: 'img/items/panoplies/anneau_scarafeuille_blanc.png',
    type: 'equipment', slot: 'anneau', set: 'scarafeuille_blanc', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 10 }, { stat: 'atk', value: 14 }, { stat: 'critChance', value: 2 }, { stat: 'res.air', value: 2 }],
    description: "Porter cet anneau autour du doigt vous permettra d'avoir une pensée émue pour tous les Scarafeuilles que vous avez exterminés. Alors peut-être, vous vous demanderez si tout cela en valait réellement la peine."
}
item.ceinture_scarafeuille_blanc = {
    id: 'ceinture_scarafeuille_blanc',
    name: 'Scarature Blanche',
    image: 'img/items/panoplies/ceinture_scarafeuille_blanc.png',
    type: 'equipment', slot: 'ceinture', set: 'scarafeuille_blanc', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'critChance', value: 2 }],
    description: "La Scarature servait autrefois à donner une indication sur votre niveau en combat à mains nues. Posséder une Scarature verte signifiait que vous étiez un débutant, une rouge, signifiait que vous léchiez le sang de vos ennemis une fois ceux-ci exterminés, une blanche, signifiait que vous étiez une véritable machine à exterminer les ennemis, et une bleue signifiait que vous n'aviez pas assez de kamas pour vous acheter une des trois autres Scaratures."
}
item.cape_scarafeuille_vert = {
    id: 'cape_scarafeuille_vert',
    name: 'Scaracape Verte',
    image: 'img/items/panoplies/cape_scarafeuille_vert.png',
    type: 'equipment', slot: 'cape', set: 'scarafeuille_vert', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 30 }, { stat: 'atk', value: 24 }, { stat: 'flatDamage', value: 4 }, { stat: 'res.terre', value: 4 }],
    description: "Qui n'a jamais rêvé de revêtir une cape en coquille de Scarafeuilles ? Une fois équipée, vous devriez réussir à vous prendre pour un véritable Scarafeuille, et peut-être arriverez-vous à vous déplacer en glissant et en dérapant. De quoi décontenancer une horde de Trools."
}
item.coiffe_scarafeuille_vert = {
    id: 'coiffe_scarafeuille_vert',
    name: 'Scaracoiffe Verte',
    image: 'img/items/panoplies/coiffe_scarafeuille_vert.png',
    type: 'equipment', slot: 'coiffe', set: 'scarafeuille_vert', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 24 }, { stat: 'atk', value: 24 }, { stat: 'res.terre', value: 4 }],
    description: "Affublé de cette coiffe originale, vous pourrez enfin faire croire à vos amis que vous êtes un chasseur de Scarafeuilles."
}
item.anneau_scarafeuille_vert = {
    id: 'anneau_scarafeuille_vert',
    name: 'Scaranneau Vert',
    image: 'img/items/panoplies/anneau_scarafeuille_vert.png',
    type: 'equipment', slot: 'anneau', set: 'scarafeuille_vert', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 10 }, { stat: 'atk', value: 14 }, { stat: 'critChance', value: 2 }, { stat: 'res.terre', value: 2 }],
    description: "Porter cet anneau autour du doigt vous permettra d'avoir une pensée émue pour tous les Scarafeuilles que vous avez exterminés. Alors peut-être, vous vous demanderez si tout cela en valait réellement la peine."
}
item.ceinture_scarafeuille_vert = {
    id: 'ceinture_scarafeuille_vert',
    name: 'Scarature Verte',
    image: 'img/items/panoplies/ceinture_scarafeuille_vert.png',
    type: 'equipment', slot: 'ceinture', set: 'scarafeuille_vert', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'critChance', value: 2 }],
    description: "La Scarature servait autrefois à donner une indication sur votre niveau en combat à mains nues. Posséder une Scarature verte signifiait que vous étiez un débutant, une rouge, signifiait que vous léchiez le sang de vos ennemis une fois ceux-ci exterminés, une blanche, signifiait que vous étiez une véritable machine à exterminer les ennemis, et une bleue signifiait que vous n'aviez pas assez de kamas pour vous acheter une des trois autres Scaratures."
}
item.cape_scarafeuille_bleu = {
    id: 'cape_scarafeuille_bleu',
    name: 'Scaracape Bleue',
    image: 'img/items/panoplies/cape_scarafeuille_bleu.png',
    type: 'equipment', slot: 'cape', set: 'scarafeuille_bleu', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 30 }, { stat: 'atk', value: 24 }, { stat: 'flatDamage', value: 4 }, { stat: 'res.eau', value: 4 }],
    description: "Qui n'a jamais rêvé de revêtir une cape en coquille de Scarafeuilles ? Une fois équipée, vous devriez réussir à vous prendre pour un véritable Scarafeuille, et peut-être arriverez-vous à vous déplacer en glissant et en dérapant. De quoi décontenancer une horde de Trools."
}
item.coiffe_scarafeuille_bleu = {
    id: 'coiffe_scarafeuille_bleu',
    name: 'Scaracoiffe Bleue',
    image: 'img/items/panoplies/coiffe_scarafeuille_bleu.png',
    type: 'equipment', slot: 'coiffe', set: 'scarafeuille_bleu', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 24 }, { stat: 'atk', value: 24 }, { stat: 'res.eau', value: 4 }],
    description: "Affublé de cette coiffe originale, vous pourrez enfin faire croire à vos amis que vous êtes un chasseur de Scarafeuilles."
}
item.anneau_scarafeuille_bleu = {
    id: 'anneau_scarafeuille_bleu',
    name: 'Scaranneau Bleu',
    image: 'img/items/panoplies/anneau_scarafeuille_bleu.png',
    type: 'equipment', slot: 'anneau', set: 'scarafeuille_bleu', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 10 }, { stat: 'atk', value: 14 }, { stat: 'critChance', value: 2 }, { stat: 'res.eau', value: 2 }],
    description: "Porter cet anneau autour du doigt vous permettra d'avoir une pensée émue pour tous les Scarafeuilles que vous avez exterminés. Alors peut-être, vous vous demanderez si tout cela en valait réellement la peine."
}
item.ceinture_scarafeuille_bleu = {
    id: 'ceinture_scarafeuille_bleu',
    name: 'Scarature Bleue',
    image: 'img/items/panoplies/ceinture_scarafeuille_bleu.png',
    type: 'equipment', slot: 'ceinture', set: 'scarafeuille_bleu', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'critChance', value: 2 }],
    description: "La Scarature servait autrefois à donner une indication sur votre niveau en combat à mains nues. Posséder une Scarature verte signifiait que vous étiez un débutant, une rouge, signifiait que vous léchiez le sang de vos ennemis une fois ceux-ci exterminés, une blanche, signifiait que vous étiez une véritable machine à exterminer les ennemis, et une bleue signifiait que vous n'aviez pas assez de kamas pour vous acheter une des trois autres Scaratures."
}
item.cape_scarafeuille_rouge = {
    id: 'cape_scarafeuille_rouge',
    name: 'Scaracape Rouge',
    image: 'img/items/panoplies/cape_scarafeuille_rouge.png',
    type: 'equipment', slot: 'cape', set: 'scarafeuille_rouge', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 30 }, { stat: 'atk', value: 24 }, { stat: 'flatDamage', value: 4 }, { stat: 'res.feu', value: 4 }],
    description: "Qui n'a jamais rêvé de revêtir une cape en coquille de Scarafeuilles ? Une fois équipée, vous devriez réussir à vous prendre pour un véritable Scarafeuille, et peut-être arriverez-vous à vous déplacer en glissant et en dérapant. De quoi décontenancer une horde de Trools."
}
item.coiffe_scarafeuille_rouge = {
    id: 'coiffe_scarafeuille_rouge',
    name: 'Scaracoiffe Rouge',
    image: 'img/items/panoplies/coiffe_scarafeuille_rouge.png',
    type: 'equipment', slot: 'coiffe', set: 'scarafeuille_rouge', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 24 }, { stat: 'atk', value: 24 }, { stat: 'res.feu', value: 4 }],
    description: "Affublé de cette coiffe originale, vous pourrez enfin faire croire à vos amis que vous êtes un chasseur de Scarafeuilles."
}
item.anneau_scarafeuille_rouge = {
    id: 'anneau_scarafeuille_rouge',
    name: 'Scaranneau Rouge',
    image: 'img/items/panoplies/anneau_scarafeuille_rouge.png',
    type: 'equipment', slot: 'anneau', set: 'scarafeuille_rouge', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 10 }, { stat: 'atk', value: 14 }, { stat: 'critChance', value: 2 }, { stat: 'res.feu', value: 2 }],
    description: "Porter cet anneau autour du doigt vous permettra d'avoir une pensée émue pour tous les Scarafeuilles que vous avez exterminés. Alors peut-être, vous vous demanderez si tout cela en valait réellement la peine."
}
item.ceinture_scarafeuille_rouge = {
    id: 'ceinture_scarafeuille_rouge',
    name: 'Scarature Rouge',
    image: 'img/items/panoplies/ceinture_scarafeuille_rouge.png',
    type: 'equipment', slot: 'ceinture', set: 'scarafeuille_rouge', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'critChance', value: 2 }],
    description: "La Scarature servait autrefois à donner une indication sur votre niveau en combat à mains nues. Posséder une Scarature verte signifiait que vous étiez un débutant, une rouge, signifiait que vous léchiez le sang de vos ennemis une fois ceux-ci exterminés, une blanche, signifiait que vous étiez une véritable machine à exterminer les ennemis, et une bleue signifiait que vous n'aviez pas assez de kamas pour vous acheter une des trois autres Scaratures."
}
item.cape_scarafeuille_noir = {
    id: 'cape_scarafeuille_noir',
    name: 'Scaracape Noire',
    image: 'img/items/panoplies/cape_scarafeuille_noir.png',
    type: 'equipment', slot: 'cape', set: 'scarafeuille_noir', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 30 }, { stat: 'atk', value: 24 }, { stat: 'flatDamage', value: 4 }, { stat: 'res.neutre', value: 4 }],
    description: "Si vous n'avez pas les moyens de vous acheter une Corbacape Mastralis, mais que vous aimez faire peur aux Araknes en vous habillant en noir, c'est la cape qu'il vous faut."
}
item.coiffe_scarafeuille_noir = {
    id: 'coiffe_scarafeuille_noir',
    name: 'Scaracoiffe Noire',
    image: 'img/items/panoplies/coiffe_scarafeuille_noir.png',
    type: 'equipment', slot: 'coiffe', set: 'scarafeuille_noir', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 24 }, { stat: 'atk', value: 24 }, { stat: 'res.neutre', value: 4 }],
    description: "C'est la coiffe parfaite pour ceux qui veulent avoir des idées noires."
}
item.anneau_scarafeuille_noir = {
    id: 'anneau_scarafeuille_noir',
    name: 'Scaranneau Noir',
    image: 'img/items/panoplies/anneau_scarafeuille_noir.png',
    type: 'equipment', slot: 'anneau', set: 'scarafeuille_noir', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 10 }, { stat: 'atk', value: 14 }, { stat: 'critChance', value: 2 }, { stat: 'res.neutre', value: 2 }],
    description: "Cet anneau magnifique peut être porté autour du gros orteil. Idéal pour cacher vos verrues et vos ongles incarnés."
}
item.ceinture_scarafeuille_noir = {
    id: 'ceinture_scarafeuille_noir',
    name: 'Scarature Noire',
    image: 'img/items/panoplies/ceinture_scarafeuille_noir.png',
    type: 'equipment', slot: 'ceinture', set: 'scarafeuille_noir', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'critChance', value: 2 }],
    description: "Cette ceinture manque cruellement d'originalité. Elle semble cependant assortie à votre coiffure."
}
item.cape_scaraboss_doree = {
    id: 'cape_scaraboss_doree',
    name: 'Scaracape Dorée',
    image: 'img/items/panoplies/cape_scaraboss_doree.png',
    type: 'equipment', slot: 'cape', set: 'scaraboss_doree', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'atk', value: 40 }, { stat: 'spd', value: 7 }, { stat: 'res.terre', value: 2 }],
    description: "Plus dorée qu'une Scaracape classique et moins noire qu'une Scaracape Noire, cette cape est parfaite pour cacher vos excroissances. Elle servait autrefois au Scarabosse Doré qui l'utilisait pour cacher son horrible bosse. De nos jours, cette cape est avant tout utilisée pour cacher les horribles postérieurs. Autant dire que cette cape est populaire."
}
item.coiffe_scaraboss_doree = {
    id: 'coiffe_scaraboss_doree',
    name: 'Scaracoiffe Dorée',
    image: 'img/items/panoplies/coiffe_scaraboss_doree.png',
    type: 'equipment', slot: 'coiffe', set: 'scaraboss_doree', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 40 }, { stat: 'flatDamage', value: 3 }, { stat: 'res.feu', value: 2 }],
    description: "Cette coiffe est parfaite pour cacher votre acné, ou votre visage de chérubin."
}
item.bottes_scaraboss_doree = {
    id: 'bottes_scaraboss_doree',
    name: 'Scarabottes Dorées',
    image: 'img/items/panoplies/bottes_scaraboss_doree.png',
    type: 'equipment', slot: 'bottes', set: 'scaraboss_doree', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 30 }, { stat: 'atk', value: 20 }, { stat: 'flatDamage', value: 2 }, { stat: 'res.eau', value: 2 }],
    description: "Ces bottes crochues permettent d'escalader facilement les falaises les plus abruptes, ou de labourer les champs sans charrue."
}
item.anneau_scaraboss_doree = {
    id: 'anneau_scaraboss_doree',
    name: 'Anneau du Scarabosse Doré',
    image: 'img/items/panoplies/anneau_scaraboss_doree.png',
    type: 'equipment', slot: 'anneau', set: 'scaraboss_doree', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 30 }, { stat: 'flatDamage', value: 2 }, { stat: 'res.air', value: 2 }],
    description: "Le Scarabosse est une étrange créature. Bossue et laide depuis sa naissance, elle s'est retrouvée être la risée des autres Scarafeuilles. C'est peut-être pour cela que vous vous sentez si proche de cette créature."
}
item.amulette_scaraboss_doree = {
    id: 'amulette_scaraboss_doree',
    name: 'Amulette du Scarabosse Doré',
    image: 'img/items/panoplies/amulette_scaraboss_doree.png',
    type: 'equipment', slot: 'amulette', set: 'scaraboss_doree', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 30 }, { stat: 'critChance', value: 1 }],
    description: "Portée sur un torse velu, cette amulette a tout pour plaire tant elle se marie bien avec les touffes de poils."
}
item.ceinture_scaraboss_doree = {
    id: 'ceinture_scaraboss_doree',
    name: 'Scarature Dorée',
    image: 'img/items/panoplies/ceinture_scaraboss_doree.png',
    type: 'equipment', slot: 'ceinture', set: 'scaraboss_doree', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 40 }, { stat: 'atk', value: 20 }, { stat: 'critChance', value: 2 }, { stat: 'res.neutre', value: 2 }],
    description: "Si vous aimez parader entièrement nu sur les plages de l'île de Moon, vous devriez rapidement tomber amoureux de cette ceinture, réputée pour être un excellent cache-misère."
}
item.baguette_scaraboss_doree = {
    id: 'baguette_scaraboss_doree',
    name: 'Baguette du Scarabosse Doré',
    image: 'img/items/panoplies/baguette_scaraboss_doree.png',
    type: 'equipment', slot: 'arme', set: 'scaraboss_doree', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'atk', value: 45 }, { stat: 'flatDamage', value: 7 }],
    description: "Cette baguette magique est parfaite pour dépoussiérer les vieux meubles ou les vieilles personnes."
}
// #endregion
// #region Panoplie Kwak — Montagne des kwaks ──────────────────
item.cape_kwak_vent = {
    id: 'cape_kwak_vent',
    name: 'Kwape de Vent',
    image: 'img/items/panoplies/cape_kwak_vent.png',
    type: 'equipment', slot: 'cape', set: 'kwak_vent', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'atk', value: 10 }, { stat: 'spd', value: 7 }, { stat: 'res.air', value: 3 }],
    description: "Légère et raffinée, cette création peut accessoirement servir de rideau pour les plus dépourvus. Elle était jadis très convoitée par la Momie Nova en personne, qui désirait être correctement habillée pour sortir le soir. Un exemple à suivre pour certains."
}
item.coiffe_kwak_vent = {
    id: 'coiffe_kwak_vent',
    name: 'Kwakoiffe de Vent',
    image: 'img/items/panoplies/coiffe_kwak_vent.png',
    type: 'equipment', slot: 'coiffe', set: 'kwak_vent', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 15 }, { stat: 'atk', value: 20 }, { stat: 'flatDamage', value: 2 }, { stat: 'res.air', value: 3 }],
    description: "Pour garder les cheveux au vent même une fois équipé d'une coiffe, rien ne vaut cette sympathique Kwakoiffe du Vent, qui vous permettra sans aucun doute de laisser libre court à votre expression capillaire dans la plupart des circonstances. C'est suffisant pour réussir à interloquer le plus blasé des Chafers."
}
item.bottes_kwak_vent = {
    id: 'bottes_kwak_vent',
    name: 'Kwakobottes de Vent',
    image: 'img/items/panoplies/bottes_kwak_vent.png',
    type: 'equipment', slot: 'bottes', set: 'kwak_vent', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 35 }, { stat: 'atk', value: 20 }, { stat: 'flatDamage', value: 1 }, { stat: 'res.air', value: 2 }],
    description: "Rudimentaires mais efficaces, ces bottes d'une légéreté surprenante sont parfois utilisées après avoir été retravaillées, comme manche à air pour indiquer la direction et la force du vent. Il est alors conseillé de se placer du bon côté de la manche à air, pour ne pas mourir asphyxié."
}
item.anneau_kwak_vent = {
    id: 'anneau_kwak_vent',
    name: 'Kwakanneau de Vent',
    image: 'img/items/panoplies/anneau_kwak_vent.png',
    type: 'equipment', slot: 'anneau', set: 'kwak_vent', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'atk', value: 20 }, { stat: 'flatDamage', value: 1 }, { stat: 'res.air', value: 2 }],
    description: "Cet anneau est si léger, qu'il pourrait s'envoler au premier coup de vent. Mais ne rêvez pas, si cela se produit, vous ne vous envolerez pas avec lui. On se moquera de vous dans le meilleur des cas."
}
item.amulette_kwak_vent = {
    id: 'amulette_kwak_vent',
    name: 'Amukwak de Vent',
    image: 'img/items/panoplies/amulette_kwak_vent.png',
    type: 'equipment', slot: 'amulette', set: 'kwak_vent', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 14 }, { stat: 'critChance', value: 1 }, { stat: 'res.air', value: 2 }],
    description: "Lorsque le vent souffle dans ses plumes, le Kwak du Vent se sent libre comme l'air, et se laisse planer tel une vieille feuille morte emportée par une bourrasque. Contrairement aux idées reçues, c'est assez impressionnant."
}
item.ceinture_kwak_vent = {
    id: 'ceinture_kwak_vent',
    name: 'Kwakture de Vent',
    image: 'img/items/panoplies/ceinture_kwak_vent.png',
    type: 'equipment', slot: 'ceinture', set: 'kwak_vent', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 20 }, { stat: 'res.air', value: 2 }],
    description: "\"La seule façon d'attraper un vieux mâle Kwak du Vent contrarié, c'est de se déguiser en femelle Kwak du Vent contrariée. Dès lors, le mâle tentera de comprendre pourquoi la femelle est contrariée et tentera avec tous les moyens dont il dispose, de satisfaire la femelle. Une fois le mâle satisfait de sa prestation, il faut profiter de sa béatitude pour le plumer.\" Voici ce que l'on peut lire dans la section douze du tome trois sur la chasse aux Kwaks du Vent. Il y est en outre clairement indiqué, que cette ceinture est un élément indispensable pour se faire passer pour une femelle Kwak du Vent. Vous savez ce qu'il vous reste à faire."
}
item.epee_kwak_vent = {
    id: 'epee_kwak_vent',
    name: 'Kwaklame de Vent',
    image: 'img/items/panoplies/epee_kwak_vent.png',
    type: 'equipment', slot: 'arme', set: 'kwak_vent', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 20 }, { stat: 'critChance', value: 2 }, { stat: 'res.air', value: 2 }],
    description: "Idéale pour couper les nuages, cette lame pourra également vous servir à faire du vent si vous l'agitez comme un éventail. Une excellente technique pour décimer les Moskitos ou défigurer vos amis."
}
item.cape_kwak_glace = {
    id: 'cape_kwak_glace',
    name: 'Kwape de Glace',
    image: 'img/items/panoplies/cape_kwak_glace.png',
    type: 'equipment', slot: 'cape', set: 'kwak_glace', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'atk', value: 10 }, { stat: 'spd', value: 7 }, { stat: 'res.eau', value: 3 }],
    description: "Idéale pour se rafraîchir sur l'île de Moon pendant la saison chaude, et parfaite pour refroidir les ardeurs de vos amis les plus entreprenants, cette cape saura répondre aux attentes de l'aventurier des temps modernes."
}
item.coiffe_kwak_glace = {
    id: 'coiffe_kwak_glace',
    name: 'Kwakoiffe de Glace',
    image: 'img/items/panoplies/coiffe_kwak_glace.png',
    type: 'equipment', slot: 'coiffe', set: 'kwak_glace', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 15 }, { stat: 'atk', value: 20 }, { stat: 'flatDamage', value: 2 }, { stat: 'res.eau', value: 3 }],
    description: "Cette Kwakoiffe de Glace vous permettra de toujours avoir des idées fraîches, même lorsque vous serez à court d'idées. Elle n'est cependant pas assez puissante pour un Iop."
}
item.bottes_kwak_glace = {
    id: 'bottes_kwak_glace',
    name: 'Kwakobottes de Glace',
    image: 'img/items/panoplies/bottes_kwak_glace.png',
    type: 'equipment', slot: 'bottes', set: 'kwak_glace', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 35 }, { stat: 'atk', value: 20 }, { stat: 'flatDamage', value: 1 }, { stat: 'res.eau', value: 2 }],
    description: "Idéales comme patins à glace sur les lacs gelés, ces bottes sont également très utiles pour garder les pieds au frais, ou pour y stocker votre goûter durant les journées de forte chaleur. Il est cependant déconseillé de les faire sécher au coin du feu, sous peine de ne plus jamais les revoir."
}
item.anneau_kwak_glace = {
    id: 'anneau_kwak_glace',
    name: 'Kwakanneau de Glace',
    image: 'img/items/panoplies/anneau_kwak_glace.png',
    type: 'equipment', slot: 'anneau', set: 'kwak_glace', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'atk', value: 20 }, { stat: 'flatDamage', value: 1 }, { stat: 'res.eau', value: 2 }],
    description: "Ce petit anneau était jadis très convoité par les Enutrofettes qui préféraient s'en servir pour décorer leurs orteils. Une excellente façon de cacher leurs verrues."
}
item.amulette_kwak_glace = {
    id: 'amulette_kwak_glace',
    name: 'Amukwak de Glace',
    image: 'img/items/panoplies/amulette_kwak_glace.png',
    type: 'equipment', slot: 'amulette', set: 'kwak_glace', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 14 }, { stat: 'critChance', value: 1 }, { stat: 'res.eau', value: 2 }],
    description: "Avec cette amulette autour du cou, vous pourriez tenter de faire croire à votre entourage que vous avez une haleine fraîche. Laissez tomber, c'est peine perdue."
}
item.ceinture_kwak_glace = {
    id: 'ceinture_kwak_glace',
    name: 'Kwakture de Glace',
    image: 'img/items/panoplies/ceinture_kwak_glace.png',
    type: 'equipment', slot: 'ceinture', set: 'kwak_glace', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 20 }, { stat: 'res.eau', value: 2 }],
    description: "Idéale pour vous raffermir les hanches, cette ceinture vous permettra de garder bien au frais ce que vous avez en dessous de la ceinture."
}
item.epee_kwak_glace = {
    id: 'epee_kwak_glace',
    name: 'Kwaklame de Glace',
    image: 'img/items/panoplies/epee_kwak_glace.png',
    type: 'equipment', slot: 'arme', set: 'kwak_glace', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 20 }, { stat: 'critChance', value: 2 }, { stat: 'res.eau', value: 2 }],
    description: "Lame froide et tranchante, elle réveillera les instincts les plus primitifs de ceux qui l'utilisent."
}
item.cape_kwak_flamme = {
    id: 'cape_kwak_flamme',
    name: 'Kwape de Flamme',
    image: 'img/items/panoplies/cape_kwak_flamme.png',
    type: 'equipment', slot: 'cape', set: 'kwak_flamme', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'atk', value: 10 }, { stat: 'spd', value: 7 }, { stat: 'res.feu', value: 3 }],
    description: "Très peu irritante, mais un peu quand même il faut l'avouer, cette cape ne pourra pas hélas vous faire voler, ni même planer. Même en y cousant un grand \"M\" dessus, ça ne marchera pas, certains y croyaient pourtant dur comme fer. Dommage."
}
item.coiffe_kwak_flamme = {
    id: 'coiffe_kwak_flamme',
    name: 'Kwakoiffe de Flamme',
    image: 'img/items/panoplies/coiffe_kwak_flamme.png',
    type: 'equipment', slot: 'coiffe', set: 'kwak_flamme', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 15 }, { stat: 'atk', value: 20 }, { stat: 'flatDamage', value: 2 }, { stat: 'res.feu', value: 3 }],
    description: "La Kwakoiffe de Flammes vous donne réellement une allure de tombeur, ce qui est très pratique pour mettre à terre vos adversaires, lorsque ceux-ci n'arrivent plus à tenir debout tellement ils rigolent, en vous voyant affublé de cette coiffe."
}
item.bottes_kwak_flamme = {
    id: 'bottes_kwak_flamme',
    name: 'Kwakobottes de Flamme',
    image: 'img/items/panoplies/bottes_kwak_flamme.png',
    type: 'equipment', slot: 'bottes', set: 'kwak_flamme', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 35 }, { stat: 'atk', value: 20 }, { stat: 'flatDamage', value: 1 }, { stat: 'res.feu', value: 2 }],
    description: "Muni de ces ergots de Kwak de Feu, il ne vous reste plus qu'à marcher sur des œufs pour ne pas vous les faire voler par un Sram mal intentionné."
}
item.anneau_kwak_flamme = {
    id: 'anneau_kwak_flamme',
    name: 'Kwakanneau de Flamme',
    image: 'img/items/panoplies/anneau_kwak_flamme.png',
    type: 'equipment', slot: 'anneau', set: 'kwak_flamme', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'atk', value: 20 }, { stat: 'flatDamage', value: 1 }, { stat: 'res.feu', value: 2 }],
    description: "Grâce à cet anneau, si vous vous perdez en allant délivrer un message, votre maître pourra peut-être vous retrouver."
}
item.amulette_kwak_flamme = {
    id: 'amulette_kwak_flamme',
    name: 'Amukwak de Flamme',
    image: 'img/items/panoplies/amulette_kwak_flamme.png',
    type: 'equipment', slot: 'amulette', set: 'kwak_flamme', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 14 }, { stat: 'critChance', value: 1 }, { stat: 'res.feu', value: 2 }],
    description: "Avec toutes ces plumes autour du cou, vous ressemblerez à Aldo Rado, grand Sacrieur aventurier en quête d'une cité d'or."
}
item.ceinture_kwak_flamme = {
    id: 'ceinture_kwak_flamme',
    name: 'Kwakture de Flamme',
    image: 'img/items/panoplies/ceinture_kwak_flamme.png',
    type: 'equipment', slot: 'ceinture', set: 'kwak_flamme', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 20 }, { stat: 'res.feu', value: 2 }],
    description: "Pour parader comme un Kwak de Flammes pendant la saison des amours, cette ceinture sera parfaite, à condition de ne porter que ça."
}
item.epee_kwak_flamme = {
    id: 'epee_kwak_flamme',
    name: 'Kwaklame de Flamme',
    image: 'img/items/panoplies/epee_kwak_flamme.png',
    type: 'equipment', slot: 'arme', set: 'kwak_flamme', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 20 }, { stat: 'critChance', value: 2 }, { stat: 'res.feu', value: 2 }],
    description: "La Kwaklame de Flammes est une arme vraiment stylée. A défaut de faire peur à votre adversaire, elle vous servira à l'impressionner, pour ensuite mieux le surprendre par une vieille ruse de fourbe."
}
item.cape_kwak_terre = {
    id: 'cape_kwak_terre',
    name: 'Kwape de Terre',
    image: 'img/items/panoplies/cape_kwak_terre.png',
    type: 'equipment', slot: 'cape', set: 'kwak_terre', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'atk', value: 10 }, { stat: 'spd', value: 7 }, { stat: 'res.terre', value: 3 }],
    description: "Idéale pour se camoufler en motte de terre géante, cette cape vous permettra d'attaquer par surprise les laboureurs et leur voler leurs richesses. Elle est donc avant tout réservée aux collectionneurs de silex."
}
item.coiffe_kwak_terre = {
    id: 'coiffe_kwak_terre',
    name: 'Kwakoiffe de Terre',
    image: 'img/items/panoplies/coiffe_kwak_terre.png',
    type: 'equipment', slot: 'coiffe', set: 'kwak_terre', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 15 }, { stat: 'atk', value: 20 }, { stat: 'flatDamage', value: 2 }, { stat: 'res.terre', value: 3 }],
    description: "Cette Kwakoiffe de Terre est tellement lourde qu'elle vous permettra de garder en permanence les pieds sur terre, mais vous fera également parfois tomber par terre. On ne peut pas tout avoir."
}
item.bottes_kwak_terre = {
    id: 'bottes_kwak_terre',
    name: 'Kwakobottes de Terre',
    image: 'img/items/panoplies/bottes_kwak_terre.png',
    type: 'equipment', slot: 'bottes', set: 'kwak_terre', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 35 }, { stat: 'atk', value: 20 }, { stat: 'flatDamage', value: 1 }, { stat: 'res.terre', value: 2 }],
    description: "\"Rien de mieux que les Kwakobottes de Terre pour marcher dans la terre\", telles étaient les paroles de Rola Ingalsse la célèbre laboureuse, juste avant de devenir aveugle, en recevant une motte de terre géante dans les yeux."
}
item.anneau_kwak_terre = {
    id: 'anneau_kwak_terre',
    name: 'Kwakanneau de Terre',
    image: 'img/items/panoplies/anneau_kwak_terre.png',
    type: 'equipment', slot: 'anneau', set: 'kwak_terre', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'atk', value: 20 }, { stat: 'flatDamage', value: 1 }, { stat: 'res.terre', value: 2 }],
    description: "Judicieusement porté, cet anneau vous permettra d'embellir vos doigts boudinés. Malheureusement pour certains, il n'est efficace que sur les doigts."
}
item.amulette_kwak_terre = {
    id: 'amulette_kwak_terre',
    name: 'Amukwak de Terre',
    image: 'img/items/panoplies/amulette_kwak_terre.png',
    type: 'equipment', slot: 'amulette', set: 'kwak_terre', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 14 }, { stat: 'critChance', value: 1 }, { stat: 'res.terre', value: 2 }],
    description: "Jadis portée par Oto Mustam, chef des guerriers de Brâkmar, cette petite amulette ne lui servait qu'à se faire beau lors des orgies organisées à Brâkmar. Tout un programme."
}
item.ceinture_kwak_terre = {
    id: 'ceinture_kwak_terre',
    name: 'Kwakture de Terre',
    image: 'img/items/panoplies/ceinture_kwak_terre.png',
    type: 'equipment', slot: 'ceinture', set: 'kwak_terre', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 20 }, { stat: 'res.terre', value: 2 }],
    description: "Le Kwak de Terre n'est pas très social et surtout très chassé pour ses plumes, c'est bien connu. En portant cette ceinture autour des hanches, vous vous exposez donc à de multiples fourberies de la part des chasseurs de Kwaks de Terre, qui vous prendront de loin pour un vieux Kwak grabataire sur le déclin. Les apparences ne sont finalement pas toujours trompeuses."
}
item.epee_kwak_terre = {
    id: 'epee_kwak_terre',
    name: 'Kwaklame de Terre',
    image: 'img/items/panoplies/epee_kwak_terre.png',
    type: 'equipment', slot: 'arme', set: 'kwak_terre', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 20 }, { stat: 'critChance', value: 2 }, { stat: 'res.terre', value: 2 }],
    description: "\"Cette lame aiguisée mais pas déguisée, conviendra parfaitement aux aventuriers déjà expérimentés en quête de nouvelles sensations\". Voici ce que l'on peut lire sur le manuel de cette épée. Les manuels ne sont plus ce qu'ils étaient décidément."
}
item.kwakwaffe = {
    id: 'kwakwaffe',
    name: 'Kwakwaffe',
    image: 'img/items/panoplies/kwakwaffe.png',
    type: 'equipment', slot: 'coiffe', set: 'kwakwa', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 20 }, { stat: 'flatDamage', value: 10 }],
    description: "Cette coiffe, en plus de couvrir votre crâne d'œuf, vous donnera fière allure et fera peut-être même oublier votre tête de piaf. Que demander de plus ?"
}
item.kwakwalliance = {
    id: 'kwakwalliance',
    name: 'Kwakwalliance',
    image: 'img/items/panoplies/kwakwalliance.png',
    type: 'equipment', slot: 'anneau', set: 'kwakwa', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'flatDamage', value: 7 }, { stat: 'atk', value: 20 }],
    description: "Pour séduire les Kwakeres, le Kwakwa effectue sa parade nuptiale, qui consiste à faire la roue avec les plumes de sa queue. Il se rend alors profondément ridicule puisqu'il n'en a que cinq. Une parfaite illustration de l'adage \"femme qui rit, à moitié dans ton lit\"."
}
item.kwakwanneau = {
    id: 'kwakwanneau',
    name: 'Kwakwanneau',
    image: 'img/items/panoplies/kwakwanneau.png',
    type: 'equipment', slot: 'anneau', set: 'kwakwa', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'flatDamage', value: 7 }, { stat: 'maxHp', value: 20 }],
    description: "Alors qu'il n'a pas de maître, le Kwakwa a lui aussi un anneau matricule. Il se sert de celui des Kwaks pour les identifier et les retrouver lorsqu'ils se perdent pour les ramener au nid. Il se sert du sien pour qu'on puisse venir le chercher quand il se perd en cherchant les Kwaks perdus. À tourner ainsi en rond, ils ne sont jamais sortis de la montagne des Craqueleurs."
}
item.kwakwalame = {
    id: 'kwakwalame',
    name: 'Kwakwalame',
    image: 'img/items/panoplies/kwakwalame.png',
    type: 'equipment', slot: 'arme', set: 'kwakwa', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'atk', value: 20 }, { stat: 'flatDamage', value: 10 }],
    description: "À l'instar de ses sujets les Kwaks, le Kwakwa a une lame à son nom. Même si on ne sait toujours pas pourquoi ni en quel honneur un oiseau aurait une épée, celle-ci semble plus légère et plus maniable que les Kwaklames. Vous allez peut-être enfin pouvoir déplumer vos ennemis avec."
}
// #endregion
// #region Panoplie ventouse
item.kralano = {
    id: 'kralano',
    name: 'Kralano',
    image: 'img/items/panoplies/kralano.png',
    type: 'equipment', slot: 'anneau', set: 'kralamoure', rarity: 'rare', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 200 }, { stat: 'atk', value: 150 }, { stat: 'critChance', value: 3 }, { stat: 'flatDamage', value: 20 }, { stat: 'healPct', value: 7 }, { stat: 'dropRate', value: 5 }, { stat: 'res.neutre', value: 6 }],
    description: "Une fois enfilé, vous ne pourrez plus jamais l'enlever tellement ses ventouses sont efficaces."
}
item.annolamour = {
    id: 'annolamour',
    name: 'Annolamour',
    image: 'img/items/panoplies/annolamour.png',
    type: 'equipment', slot: 'anneau', set: 'kralamoure', rarity: 'rare', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 150 }, { stat: 'atk', value: 200 }, { stat: 'spd', value: 20 }, { stat: 'flatDamage', value: 20 }, { stat: 'dropRate', value: 10 },{ stat: 'res.eau', value: 6 }, { stat: 'res.feu', value: 6 }],
    description: "Cet anneau vous suce le doigt en permanence, il est gluant et froid, si vous supportez ça vous pourrez profiter de ses immenses pouvoirs."
}
item.kralamansion = {
    id: 'kralamansion',
    name: 'Kralamansion',
    image: 'img/items/panoplies/kralamansion.png',
    type: 'equipment', slot: 'amulette', set: 'kralamoure', rarity: 'rare', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 350 }, { stat: 'atk', value: 50 }, { stat: 'flatDamage', value: 20 }, { stat: 'critChance', value: 3 }, { stat: 'dropRate', value: 15 }, { stat: 'healPct', value: 10 },],
    description: "Cette effrayante amulette est longtemps restée cachée dans un manoir perdu. Autrefois vivante, elle voulait conquérir le monde. Finalement elle n'aura que votre cou. La pauvre."
}
// #endregion
// #region Panoplie ouassingue
item.cape_ouassingue = {
    id: 'cape_ouassingue',
    name: 'Cape de la Ouassingue',
    image: 'img/items/panoplies/cape_ouassingue.png',
    type: 'equipment', slot: 'cape', set: 'ouassingue', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 75 }, { stat: 'atk', value: 55 },{ stat: 'flatDamage', value: 6 }, { stat: 'dropRate', value: 4 },{ stat: 'res.eau', value: 4 }, { stat: 'res.terre', value: 4 }, { stat: 'spd', value: -4 }],
    description: "Moins performante que la Cape du Roissingue, cette cape présente néanmoins les mêmes avantages quant à l'évacuation de la sueur. Avec elle, vous allez pouvoir faire face à toutes les situations... Si vous arrivez à combattre en apnée, car vu l'odeur, il est vraiment impossible de ne pas défaillir."
}
item.coiffe_ouassingue = {
    id: 'coiffe_ouassingue',
    name: 'Capuche de la Ouassingue',
    image: 'img/items/panoplies/coiffe_ouassingue.png',
    type: 'equipment', slot: 'coiffe', set: 'ouassingue', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 75 }, { stat: 'atk', value: 55 },{ stat: 'flatDamage', value: 6 }, { stat: 'dropRate', value: 4 },{ stat: 'res.eau', value: 4 }, { stat: 'res.terre', value: 4 }],
    description: "Moins efficace que la Coiffe royale, cette capuche permet toutefois une très bonne évacuation de la sueur. Un peu trop bonne, en fait. Du coup, que l'on porte la capuche ou qu'on ne la porte pas ne fait aucune différence."
}
item.bottes_ouassingue = {
    id: 'bottes_ouassingue',
    name: 'Bottes Horchons',
    image: 'img/items/panoplies/bottes_ouassingue.png',
    type: 'equipment', slot: 'bottes', set: 'ouassingue', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 75 }, { stat: 'atk', value: 35 }, { stat: 'flatDamage', value: 6 }, { stat: 'res.terre', value: 4 }, { stat: 'dropRate', value: 4 }],
    description: "Ces Bottes émettent un immonde bruit de succion à chaque pas, ce qui n'est pas sans vous rappeler le chant d'amour des Trools en rut. Un souvenir douloureux dont vous vous seriez bien passé."
}
item.amulette_ouassingue = {
    id: 'amulette_ouassingue',
    name: 'Ouassulette',
    image: 'img/items/panoplies/amulette_ouassingue.png',
    type: 'equipment', slot: 'amulette', set: 'ouassingue', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 80 }, { stat: 'atk', value: 45 }, { stat: 'res.terre', value: 4 }, { stat: 'dropRate', value: 4 }, { stat: 'healPct', value: 4 }],
    description: "Ce bijou essaye parfois de vous voler des aliments au passage pendant votre repas, ne le laissez pas pendre trop bas."
}
// #endregion
// #region Panoplie roissingue
item.cape_roissingue = {
    id: 'cape_roissingue',
    name: 'Cape Souveraine du Roissingue',
    image: 'img/items/panoplies/cape_roissingue.png',
    type: 'equipment', slot: 'cape', set: 'roissingue', rarity: 'rare', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 150 }, { stat: 'atk', value: 110 },{ stat: 'flatDamage', value: 7 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 10 },{ stat: 'res.neutre', value: 6 }, { stat: 'res.feu', value: 6 }],
    description: "Constituée d'une étoffe de Roissingue, cette cape comporte des micro trous permettant une meilleure évacuation de la sueur en cas d'effort intense, comme lors de mêlées belliqueuses en zone marécageuse. Cette cape laisse passer l'humidité mais garde la chaleur. Ainsi, vous restez sec quelle que soit la situation. Dommage que l'odeur persistante de moisissure soit inaltérable."
}
item.coiffe_roissingue = {
    id: 'coiffe_roissingue',
    name: 'Capuche Souveraine du Roissingue',
    image: 'img/items/panoplies/coiffe_roissingue.png',
    type: 'equipment', slot: 'coiffe', set: 'roissingue', rarity: 'rare', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 150 }, { stat: 'atk', value: 100 },{ stat: 'spd', value: 10 }, { stat: 'dropRate', value: 10 },{ stat: 'res.eau', value: 4 }, { stat: 'res.air', value: 4 }],
    description: "Coiffe royale, cette capuche possède les mêmes vertus que la Cape du Roissingue. Ses micro-aérations contribuent à une meilleure évacuation de la sueur pour toujours garder la tête froide. Hélas, elle possède également les défauts de la cape : son odeur nauséabonde est si présente qu'on pourrait presque la découper au couteau."
}
item.anneau_roissingue = {
    id: 'anneau_roissingue',
    name: 'Sceau Souverain du Roissingue',
    image: 'img/items/panoplies/anneau_roissingue.png',
    type: 'equipment', slot: 'anneau', set: 'roissingue', rarity: 'rare', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 100 }, { stat: 'atk', value: 50 }, { stat: 'flatDamage', value: 7 }, { stat: 'res.terre', value: 5 }, { stat: 'dropRate', value: 6 }],
    description: "Ce sceau désigne son possesseur comme étant le souverain incontesté de la Tourbière sans fond de l'île d'Otomaï. Difficile d'imaginer un royaume plus bucolique."
}
// #endregion
// #region Panoplie blop reinette / reinette royal — BLOP ────────────────────────
item.bottes_blop_reinette = {
    id: 'bottes_blop_reinette',
    name: 'Bloptes Reinette',
    image: 'img/items/panoplies/bottes_blop_reinette.png',
    type: 'equipment', slot: 'bottes', set: 'blop_reinette', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 15 }, { stat: 'dropRate', value: 1 }, { stat: 'spd', value: 2 }],
    description: "Inutile de râler parce que le nom de ces bottes est imprononçable, cette particularité vous sauvera la vie, quand un brigand de grand chemin vous demandera : \"Donne-moi tes Blopetes, non tes Blotpes, non tes Plobtes, non...\". Vous aurez alors tout le temps nécessaire pour vous enfuir en courant."
}
item.anneau_blop_reinette = {
    id: 'anneau_blop_reinette',
    name: 'Blopanneau Reinette',
    image: 'img/items/panoplies/anneau_blop_reinette.png',
    type: 'equipment', slot: 'anneau', set: 'blop_reinette', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'atk', value: 30 }, { stat: 'flatDamage', value: 3 }],
    description: "Une fois enfilé au bout d'un doigt, il n'est plus possible de se débarrasser de cet anneau. Plus vous y pensez, et plus il vous rappelle quelqu'un."
}
item.amulette_blop_reinette = {
    id: 'amulette_blop_reinette',
    name: 'Amublop Reinette',
    image: 'img/items/panoplies/amulette_blop_reinette.png',
    type: 'equipment', slot: 'amulette', set: 'blop_reinette', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 35 }, { stat: 'atk', value: 23 }, { stat: 'critChance', value: 2 }],
    description: "Quand Lorkos voulut pénétrer dans le Labyrinthe du Minotoror, il n'hésita pas une seconde à équiper son Amublop. Personne n'a jamais su pourquoi."
}
item.ceinture_blop_reinette = {
    id: 'ceinture_blop_reinette',
    name: 'Blopture Reinette',
    image: 'img/items/panoplies/ceinture_blop_reinette.png',
    type: 'equipment', slot: 'ceinture', set: 'blop_reinette', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 35 }, { stat: 'atk', value: 20 }, { stat: 'flatDamage', value: 2 }],
    description: "Derrière ce nom stupide, se cache en réalité une ceinture originale, dont on ne connaît pas vraiment les défauts, ni les qualités. On sait tout de même qu'elle est reconnue d'utilité publique grâce à la protection exceptionnelle qu'elle confère aux poignées d'amour."
}
item.bottes_blop_reinette_royal = {
    id: 'bottes_blop_reinette_royal',
    name: 'Bloptes Reinette Royales',
    image: 'img/items/panoplies/bottes_blop_reinette_royal.png',
    type: 'equipment', slot: 'bottes', set: 'blop_reinette_royal', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 20 }, { stat: 'spd', value: 3 }],
    description: "Prononcez dix-huit fois le mot \"Bloptes\" le plus rapidement possible. Voilà, vous avez l'air d'un Iop."
}
item.anneau_blop_reinette_royal = {
    id: 'anneau_blop_reinette_royal',
    name: 'Blopanneau Reinette Royal',
    image: 'img/items/panoplies/anneau_blop_reinette_royal.png',
    type: 'equipment', slot: 'anneau', set: 'blop_reinette_royal', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 15 }, { stat: 'flatDamage', value: 3 }, { stat: 'spd', value: 3 }, { stat: 'dropRate', value: 1 } ],
    description: "Kroula avait jadis tenté d'enfiler cet anneau autour de son gros orteil. Il espérait ainsi que ses ennemis daigneraient lui lécher les pieds dans l'espoir de récupérer quelques gouttes de jus de Blop Royal."
}
item.amulette_blop_reinette_royal = {
    id: 'amulette_blop_reinette_royal',
    name: 'Amublop Reinette Royale',
    image: 'img/items/panoplies/amulette_blop_reinette_royal.png',
    type: 'equipment', slot: 'amulette', set: 'blop_reinette_royal', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 30 }, { stat: 'atk', value: 20 }, { stat: 'spd', value: 3 }, { stat: 'flatDamage', value: 3 }, { stat: 'healPct', value: 3 }],
    description: "Cette amulette est beaucoup plus dure à obtenir qu'une Amublop classique. Mais il faut voir le bon côté des choses, elle est aussi plus puissante qu'une amublop normale, avec elle vous aurez une allure royale !"
}
item.ceinture_blop_reinette_royal = {
    id: 'ceinture_blop_reinette_royal',
    name: 'Blopture Reinette Royale',
    image: 'img/items/panoplies/ceinture_blop_reinette_royal.png',
    type: 'equipment', slot: 'ceinture', set: 'blop_reinette_royal', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 25 }, { stat: 'atk', value: 15 }, { stat: 'flatDamage', value: 2 }, { stat: 'critChance', value: 2 }, { stat: 'res.terre', value: 3 }, { stat: 'dropRate', value: 1 }],
    description: "Dépourvue de boucle, cette ceinture peut tout de même faire très mal si vous vous en servez comme fouet sur un postérieur à la peau fragile. Les pointes en fer rouillées sont à commander séparément."
}

// #endregion
// #region Panoplie blop coco / coco royal — BLOP ────────────────────────
item.bottes_blop_coco = {
    id: 'bottes_blop_coco',
    name: 'Bloptes Coco',
    image: 'img/items/panoplies/bottes_blop_coco.png',
    type: 'equipment', slot: 'bottes', set: 'blop_coco', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 15 }, { stat: 'dropRate', value: 1 }, { stat: 'spd', value: 2 }],
    description: "Inutile de râler parce que le nom de ces bottes est imprononçable, cette particularité vous sauvera la vie, quand un brigand de grand chemin vous demandera : \"Donne-moi tes Blopetes, non tes Blotpes, non tes Plobtes, non...\". Vous aurez alors tout le temps nécessaire pour vous enfuir en courant."
}
item.anneau_blop_coco = {
    id: 'anneau_blop_coco',
    name: 'Blopanneau Coco',
    image: 'img/items/panoplies/anneau_blop_coco.png',
    type: 'equipment', slot: 'anneau', set: 'blop_coco', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'atk', value: 30 }, { stat: 'flatDamage', value: 3 }],
    description: "Une fois enfilé au bout d'un doigt, il n'est plus possible de se débarrasser de cet anneau. Plus vous y pensez, et plus il vous rappelle quelqu'un."
}
item.amulette_blop_coco = {
    id: 'amulette_blop_coco',
    name: 'Amublop Coco',
    image: 'img/items/panoplies/amulette_blop_coco.png',
    type: 'equipment', slot: 'amulette', set: 'blop_coco', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 35 }, { stat: 'atk', value: 23 }, { stat: 'critChance', value: 2 }],
    description: "Quand Lorkos voulut pénétrer dans le Labyrinthe du Minotoror, il n'hésita pas une seconde à équiper son Amublop. Personne n'a jamais su pourquoi."
}
item.ceinture_blop_coco = {
    id: 'ceinture_blop_coco',
    name: 'Blopture Coco',
    image: 'img/items/panoplies/ceinture_blop_coco.png',
    type: 'equipment', slot: 'ceinture', set: 'blop_coco', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 35 }, { stat: 'atk', value: 20 }, { stat: 'flatDamage', value: 2 }],
    description: "Derrière ce nom stupide, se cache en réalité une ceinture originale, dont on ne connaît pas vraiment les défauts, ni les qualités. On sait tout de même qu'elle est reconnue d'utilité publique grâce à la protection exceptionnelle qu'elle confère aux poignées d'amour."
}
item.bottes_blop_coco_royal = {
    id: 'bottes_blop_coco_royal',
    name: 'Bloptes Coco Royales',
    image: 'img/items/panoplies/bottes_blop_coco_royal.png',
    type: 'equipment', slot: 'bottes', set: 'blop_coco_royal', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 20 }, { stat: 'spd', value: 3 }],
    description: "Prononcez dix-huit fois le mot \"Bloptes\" le plus rapidement possible. Voilà, vous avez l'air d'un Iop."
}
item.anneau_blop_coco_royal = {
    id: 'anneau_blop_coco_royal',
    name: 'Blopanneau Coco Royal',
    image: 'img/items/panoplies/anneau_blop_coco_royal.png',
    type: 'equipment', slot: 'anneau', set: 'blop_coco_royal', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 15 }, { stat: 'flatDamage', value: 3 }, { stat: 'spd', value: 3 }, { stat: 'dropRate', value: 1 }],
    description: "Kroula avait jadis tenté d'enfiler cet anneau autour de son gros orteil. Il espérait ainsi que ses ennemis daigneraient lui lécher les pieds dans l'espoir de récupérer quelques gouttes de jus de Blop Royal."
}
item.amulette_blop_coco_royal = {
    id: 'amulette_blop_coco_royal',
    name: 'Amublop Coco Royale',
    image: 'img/items/panoplies/amulette_blop_coco_royal.png',
    type: 'equipment', slot: 'amulette', set: 'blop_coco_royal', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 30 }, { stat: 'atk', value: 20 }, { stat: 'spd', value: 3 }, { stat: 'flatDamage', value: 3 }, { stat: 'healPct', value: 3 }],
    description: "Cette amulette est beaucoup plus dure à obtenir qu'une Amublop classique. Mais il faut voir le bon côté des choses, elle est aussi plus puissante qu'une amublop normale, avec elle vous aurez une allure royale !"
}
item.ceinture_blop_coco_royal = {
    id: 'ceinture_blop_coco_royal',
    name: 'Blopture Coco Royale',
    image: 'img/items/panoplies/ceinture_blop_coco_royal.png',
    type: 'equipment', slot: 'ceinture', set: 'blop_coco_royal', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 25 }, { stat: 'atk', value: 15 }, { stat: 'flatDamage', value: 2 }, { stat: 'critChance', value: 2 }, { stat: 'res.air', value: 3 }, { stat: 'dropRate', value: 1 }],
    description: "Dépourvue de boucle, cette ceinture peut tout de même faire très mal si vous vous en servez comme fouet sur un postérieur à la peau fragile. Les pointes en fer rouillées sont à commander séparément."
}
// #endregion
// #region Panoplie blop griotte / griotte royal — BLOP ────────────────────────
item.bottes_blop_griotte = {
    id: 'bottes_blop_griotte',
    name: 'Bloptes Griotte',
    image: 'img/items/panoplies/bottes_blop_griotte.png',
    type: 'equipment', slot: 'bottes', set: 'blop_griotte', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 15 }, { stat: 'dropRate', value: 1 }, { stat: 'spd', value: 2 }],
    description: "Inutile de râler parce que le nom de ces bottes est imprononçable, cette particularité vous sauvera la vie, quand un brigand de grand chemin vous demandera : \"Donne-moi tes Blopetes, non tes Blotpes, non tes Plobtes, non...\". Vous aurez alors tout le temps nécessaire pour vous enfuir en courant."
}
item.anneau_blop_griotte = {
    id: 'anneau_blop_griotte',
    name: 'Blopanneau Griotte',
    image: 'img/items/panoplies/anneau_blop_griotte.png',
    type: 'equipment', slot: 'anneau', set: 'blop_griotte', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'atk', value: 30 }, { stat: 'flatDamage', value: 3 }],
    description: "Une fois enfilé au bout d'un doigt, il n'est plus possible de se débarrasser de cet anneau. Plus vous y pensez, et plus il vous rappelle quelqu'un."
}
item.amulette_blop_griotte = {
    id: 'amulette_blop_griotte',
    name: 'Amublop Griotte',
    image: 'img/items/panoplies/amulette_blop_griotte.png',
    type: 'equipment', slot: 'amulette', set: 'blop_griotte', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 35 }, { stat: 'atk', value: 23 }, { stat: 'critChance', value: 2 }],
    description: "Quand Lorkos voulut pénétrer dans le Labyrinthe du Minotoror, il n'hésita pas une seconde à équiper son Amublop. Personne n'a jamais su pourquoi."
}
item.ceinture_blop_griotte = {
    id: 'ceinture_blop_griotte',
    name: 'Blopture Griotte',
    image: 'img/items/panoplies/ceinture_blop_griotte.png',
    type: 'equipment', slot: 'ceinture', set: 'blop_griotte', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 35 }, { stat: 'atk', value: 20 }, { stat: 'flatDamage', value: 2 }],
    description: "Derrière ce nom stupide, se cache en réalité une ceinture originale, dont on ne connaît pas vraiment les défauts, ni les qualités. On sait tout de même qu'elle est reconnue d'utilité publique grâce à la protection exceptionnelle qu'elle confère aux poignées d'amour."
}
item.bottes_blop_griotte_royal = {
    id: 'bottes_blop_griotte_royal',
    name: 'Bloptes Griotte Royales',
    image: 'img/items/panoplies/bottes_blop_griotte_royal.png',
    type: 'equipment', slot: 'bottes', set: 'blop_griotte_royal', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 20 }, { stat: 'spd', value: 3 }],
    description: "Prononcez dix-huit fois le mot \"Bloptes\" le plus rapidement possible. Voilà, vous avez l'air d'un Iop."
}
item.anneau_blop_griotte_royal = {
    id: 'anneau_blop_griotte_royal',
    name: 'Blopanneau Griotte Royal',
    image: 'img/items/panoplies/anneau_blop_griotte_royal.png',
    type: 'equipment', slot: 'anneau', set: 'blop_griotte_royal', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 15 }, { stat: 'flatDamage', value: 3 }, { stat: 'spd', value: 3 }, { stat: 'dropRate', value: 1 }],
    description: "Kroula avait jadis tenté d'enfiler cet anneau autour de son gros orteil. Il espérait ainsi que ses ennemis daigneraient lui lécher les pieds dans l'espoir de récupérer quelques gouttes de jus de Blop Royal."
}
item.amulette_blop_griotte_royal = {
    id: 'amulette_blop_griotte_royal',
    name: 'Amublop Griotte Royale',
    image: 'img/items/panoplies/amulette_blop_griotte_royal.png',
    type: 'equipment', slot: 'amulette', set: 'blop_griotte_royal', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 30 }, { stat: 'atk', value: 20 }, { stat: 'spd', value: 3 }, { stat: 'flatDamage', value: 3 }, { stat: 'healPct', value: 3 }],
    description: "Cette amulette est beaucoup plus dure à obtenir qu'une Amublop classique. Mais il faut voir le bon côté des choses, elle est aussi plus puissante qu'une amublop normale, avec elle vous aurez une allure royale !"
}
item.ceinture_blop_griotte_royal = {
    id: 'ceinture_blop_griotte_royal',
    name: 'Blopture Griotte Royale',
    image: 'img/items/panoplies/ceinture_blop_griotte_royal.png',
    type: 'equipment', slot: 'ceinture', set: 'blop_griotte_royal', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 25 }, { stat: 'atk', value: 15 }, { stat: 'flatDamage', value: 2 }, { stat: 'critChance', value: 2 }, { stat: 'res.feu', value: 3 }, { stat: 'dropRate', value: 1 }],
    description: "Dépourvue de boucle, cette ceinture peut tout de même faire très mal si vous vous en servez comme fouet sur un postérieur à la peau fragile. Les pointes en fer rouillées sont à commander séparément."
}
// #endregion
// #region Panoplie blop indigo / indigo royal — BLOP ────────────────────────
item.bottes_blop_indigo = {
    id: 'bottes_blop_indigo',
    name: 'Bloptes Indigo',
    image: 'img/items/panoplies/bottes_blop_indigo.png',
    type: 'equipment', slot: 'bottes', set: 'blop_indigo', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 15 }, { stat: 'dropRate', value: 1 }, { stat: 'spd', value: 2 }],
    description: "Inutile de râler parce que le nom de ces bottes est imprononçable, cette particularité vous sauvera la vie, quand un brigand de grand chemin vous demandera : \"Donne-moi tes Blopetes, non tes Blotpes, non tes Plobtes, non...\". Vous aurez alors tout le temps nécessaire pour vous enfuir en courant."
}
item.anneau_blop_indigo = {
    id: 'anneau_blop_indigo',
    name: 'Blopanneau Indigo',
    image: 'img/items/panoplies/anneau_blop_indigo.png',
    type: 'equipment', slot: 'anneau', set: 'blop_indigo', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'atk', value: 30 }, { stat: 'flatDamage', value: 3 }],
    description: "Une fois enfilé au bout d'un doigt, il n'est plus possible de se débarrasser de cet anneau. Plus vous y pensez, et plus il vous rappelle quelqu'un."
}
item.amulette_blop_indigo = {
    id: 'amulette_blop_indigo',
    name: 'Amublop Indigo',
    image: 'img/items/panoplies/amulette_blop_indigo.png',
    type: 'equipment', slot: 'amulette', set: 'blop_indigo', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 35 }, { stat: 'atk', value: 23 }, { stat: 'critChance', value: 2 }],
    description: "Quand Lorkos voulut pénétrer dans le Labyrinthe du Minotoror, il n'hésita pas une seconde à équiper son Amublop. Personne n'a jamais su pourquoi."
}
item.ceinture_blop_indigo = {
    id: 'ceinture_blop_indigo',
    name: 'Blopture Indigo',
    image: 'img/items/panoplies/ceinture_blop_indigo.png',
    type: 'equipment', slot: 'ceinture', set: 'blop_indigo', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 35 }, { stat: 'atk', value: 20 }, { stat: 'flatDamage', value: 2 }],
    description: "Derrière ce nom stupide, se cache en réalité une ceinture originale, dont on ne connaît pas vraiment les défauts, ni les qualités. On sait tout de même qu'elle est reconnue d'utilité publique grâce à la protection exceptionnelle qu'elle confère aux poignées d'amour."
}
item.bottes_blop_indigo_royal = {
    id: 'bottes_blop_indigo_royal',
    name: 'Bloptes Indigo Royales',
    image: 'img/items/panoplies/bottes_blop_indigo_royal.png',
    type: 'equipment', slot: 'bottes', set: 'blop_indigo_royal', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 20 }, { stat: 'spd', value: 3 }],
    description: "Prononcez dix-huit fois le mot \"Bloptes\" le plus rapidement possible. Voilà, vous avez l'air d'un Iop."
}
item.anneau_blop_indigo_royal = {
    id: 'anneau_blop_indigo_royal',
    name: 'Blopanneau Indigo Royal',
    image: 'img/items/panoplies/anneau_blop_indigo_royal.png',
    type: 'equipment', slot: 'anneau', set: 'blop_indigo_royal', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 15 }, { stat: 'flatDamage', value: 3 }, { stat: 'spd', value: 3 }, { stat: 'dropRate', value: 1 }],
    description: "Kroula avait jadis tenté d'enfiler cet anneau autour de son gros orteil. Il espérait ainsi que ses ennemis daigneraient lui lécher les pieds dans l'espoir de récupérer quelques gouttes de jus de Blop Royal."
}
item.amulette_blop_indigo_royal = {
    id: 'amulette_blop_indigo_royal',
    name: 'Amublop Indigo Royale',
    image: 'img/items/panoplies/amulette_blop_indigo_royal.png',
    type: 'equipment', slot: 'amulette', set: 'blop_indigo_royal', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 30 }, { stat: 'atk', value: 20 }, { stat: 'spd', value: 3 }, { stat: 'flatDamage', value: 3 }, { stat: 'healPct', value: 3 }],
    description: "Cette amulette est beaucoup plus dure à obtenir qu'une Amublop classique. Mais il faut voir le bon côté des choses, elle est aussi plus puissante qu'une amublop normale, avec elle vous aurez une allure royale !"
}
item.ceinture_blop_indigo_royal = {
    id: 'ceinture_blop_indigo_royal',
    name: 'Blopture Indigo Royale',
    image: 'img/items/panoplies/ceinture_blop_indigo_royal.png',
    type: 'equipment', slot: 'ceinture', set: 'blop_indigo_royal', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 25 }, { stat: 'atk', value: 15 }, { stat: 'flatDamage', value: 2 }, { stat: 'critChance', value: 2 }, { stat: 'res.eau', value: 3 }, { stat: 'dropRate', value: 1 }],
    description: "Dépourvue de boucle, cette ceinture peut tout de même faire très mal si vous vous en servez comme fouet sur un postérieur à la peau fragile. Les pointes en fer rouillées sont à commander séparément."
}
// #endregion
// #region Panoplie gelax ────────────────────────
item.cape_gelax = {
    id: 'cape_gelax',
    name: 'Gelocape',
    image: 'img/items/panoplies/cape_gelax.png',
    type: 'equipment', slot: 'cape', set: 'gelax', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'dropRate', value: 20 }],
    description: "Dépourvue de fils et de poils, cette Cape reste un mystère pour les têtes pensantes d'Amakna, ce qui ne doit pas représenter plus d'une dizaine de personnes."
}
item.coiffe_gelax = {
    id: 'coiffe_gelax',
    name: 'Gelocoiffe',
    image: 'img/items/panoplies/coiffe_gelax.png',
    type: 'equipment', slot: 'coiffe', set: 'gelax', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 40 }, { stat: 'atk', value: 40 }, { stat: 'heal', value: 40 }, { stat: 'dropRate', value: 7 }],
    description: "Avec cette coiffe sur la tête, vous pouvez être certain que vos amis rêveront enfin de vous lécher. Voilà un chapeau qui aurait comblé le Captain Chafer à la grande époque."
}
item.bottes_gelax = {
    id: 'bottes_gelax',
    name: 'Gelobottes',
    image: 'img/items/panoplies/bottes_gelax.png',
    type: 'equipment', slot: 'bottes', set: 'gelax', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'spd', value: 10 }, { stat: 'dropRate', value: 14 }],
    description: "Ces bottes sont très confortables en été, car elles libèrent une odeur de fraise des bois, couvrant facilement l'odeur de transpiration qui pourrait se dégager des orteils d'un vieux Sadida aux pieds poilus."
}
item.anneau_gelano = {
    id: 'anneau_gelano',
    name: 'Gelano',
    image: 'img/items/panoplies/anneau_gelano.png',
    type: 'equipment', slot: 'anneau', set: 'gelax', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'spd', value: 35 }],
    description: 'Inutile de vous ronger les ongles avec cet anneau, léchez-vous les doigts !'
}
item.amulette_gelax = {
    id: 'amulette_gelax',
    name: 'Gelamu',
    image: 'img/items/panoplies/amulette_gelax.png',
    type: 'equipment', slot: 'amulette', set: 'gelax', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 60 }, { stat: 'spd', value: 10 }, { stat: 'flatDamage', value: 4 }],
    description: "Voilà une amulette, qui trahira votre goût prononcé pour les orgies de Gelée. On peut trouver mieux pour se mettre en valeur ou briller en société, mais il faut assumer jusqu'au bout votre faible pour la gelée."
}
item.ceinture_gelax = {
    id: 'ceinture_gelax',
    name: 'Geloture',
    image: 'img/items/panoplies/ceinture_gelax.png',
    type: 'equipment', slot: 'ceinture', set: 'gelax', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 40 }, { stat: 'atk', value: 40 }, { stat: 'critChance', value: 4 }],
    description: "Le plus dur avec cette Geloture, c'est qu'en cas de fringale, on est vite tenté de croquer dedans."
}
// #endregion
// #region Panoplie dragon_cochon ────────────────────────
item.cape_dragon_cochon = {
    id: 'cape_dragon_cochon',
    name: 'Cape du Dragon Cochon',
    image: 'img/items/panoplies/cape_dragon_cochon.png',
    type: 'equipment', slot: 'cape', set: 'dragon_cochon', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 80 }, { stat: 'atk', value: 20 }, { stat: 'agilite', value: 20 }, { stat: 'force', value: 20 }, { stat: 'chance', value: 20 }, { stat: 'flatDamage', value: 4 }, { stat: 'res.feu', value: 2 }, { stat: 'res.neutre', value: 2 }],
    description: "Cette cape ne fera pas de vous un petit Cochon de Lait, mais elle vous permettra peut-être de vous travestir l'espace d'une soirée, afin de séduire une belle Cochonne."
}
item.coiffe_dragon_cochon = {
    id: 'coiffe_dragon_cochon',
    name: 'Coiffe du Dragon Cochon',
    image: 'img/items/panoplies/coiffe_dragon_cochon.png',
    type: 'equipment', slot: 'coiffe', set: 'dragon_cochon', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 70 }, { stat: 'atk', value: 20 }, { stat: 'agilite', value: 20 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 2 }, { stat: 'res.air', value: 2 }],
    description: "Affublé de cet énorme crâne, vous aurez l'air d'un Grizboule à poils durs, mais sans poils. De quoi laisser sans voix vos admiratrices."
}
item.bottes_dragon_cochon = {
    id: 'bottes_dragon_cochon',
    name: 'Mules du Dragon Cochon',
    image: 'img/items/panoplies/bottes_dragon_cochon.png',
    type: 'equipment', slot: 'bottes', set: 'dragon_cochon', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 54 }, { stat: 'atk', value: 20 }, { stat: 'dropRate', value: 2 }, { stat: 'spd', value: 4 }],
    description: "Une bonne paire de mules et vous vous sentez de suite plus fort, plus puissant, plus performant. Alors que ce ne sont que des mules."
}
item.anneau_dragon_cochon = {
    id: 'anneau_dragon_cochon',
    name: 'Anneau du Dragon Cochon',
    image: 'img/items/panoplies/anneau_dragon_cochon.png',
    type: 'equipment', slot: 'anneau', set: 'dragon_cochon', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 54 }, { stat: 'atk', value: 20 }, { stat: 'flatDamage', value: 3 }, { stat: 'critChance', value: 2 }, { stat: 'dropRate', value: 3 }, { stat: 'spd', value: 4 }],
    description: 'Cet anneau en cuir et en ivoire permet de stimuler plus facilement vos partenaires.'
}
item.amulette_dragon_cochon = {
    id: 'amulette_dragon_cochon',
    name: 'Collier du Dragon Cochon',
    image: 'img/items/panoplies/amulette_dragon_cochon.png',
    type: 'equipment', slot: 'amulette', set: 'dragon_cochon', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 80 }, { stat: 'atk', value: 20 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 2 }, { stat: 'healPct', value: 2 }],
    description: "Ce collier dispose d'une petite boucle, qui permettait d'accrocher une laisse au cou du Dragon Cochon, lorsque son propriétaire voulait l'emmener faire une petite promenade nocturne."
}
item.ceinture_dragon_cochon = {
    id: 'ceinture_dragon_cochon',
    name: 'Ceinture Dracochoune',
    image: 'img/items/panoplies/ceinture_dragon_cochon.png',
    type: 'equipment', slot: 'ceinture', set: 'dragon_cochon', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 54 }, { stat: 'atk', value: 20 }, { stat: 'chance', value: 20 }, { stat: 'flatDamage', value: 2 }, { stat: 'res.eau', value: 2 }],
    description: "Cette ceinture fera de vous une personne irrésistible. Bowisse recommande cependant de ne pas s'approcher du Dragon Cochon avec cette ceinture, cela pourrait réveiller certaines de ses pulsions les plus tourmentées."
}
item.arme_dragon_cochon = {
    id: 'arme_dragon_cochon',
    name: 'Kaiser',
    image: 'img/items/panoplies/arme_dragon_cochon.png',
    type: 'equipment', slot: 'arme', set: 'dragon_cochon', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 100 }, { stat: 'atk', value: 30 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 2 }, { stat: 'critDamagePct', value: 3 }],
    description: "Kaiser est le nom d'un Dragon Cochon qui jadis dévasta le village de Bounkaïda. Lorsque la milice eut enfin raison du monstre, les forgerons créèrent de nombreuses armes à partir des restes de la bête. Ce marteau en fait partie."
}
// #endregion
// #region Panoplie draegnerys ────────────────────────
item.cape_de_shika = {
    id: 'cape_de_shika',
    name: 'Cape de Shika',
    image: 'img/items/panoplies/cape_de_shika.png',
    type: 'equipment', slot: 'cape', set: 'shika', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 20 }, { stat: 'res.terre', value: 3 }, { stat: 'res.feu', value: 3 }],
    description: "Des fleurs des moissons ont été cousues sur cette cape confectionnée à partir de céréales magiques tissées entre elles. Elle est animée d'une magie si puissante, que Shika s'en servait de protection contre la foudre, les soirs d'orage."
}
item.coiffe_de_shika = {
    id: 'coiffe_de_shika',
    name: 'Shikacoiffe',
    image: 'img/items/panoplies/coiffe_de_shika.png',
    type: 'equipment', slot: 'coiffe', set: 'shika', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 54 }, { stat: 'flatDamage', value: 2 }, { stat: 'dropRate', value: 4 }, { stat: 'res.air', value: 3 }],
    description: "Recouverte d'une multitude de fleurs des moissons, cette coiffe donnait une allure guillerette à Shika, lorsqu'elle partait au petit matin, labourer les collines Koln."
}
item.bottes_de_shika = {
    id: 'bottes_de_shika',
    name: 'Sabots de Shika',
    image: 'img/items/panoplies/bottes_de_shika.png',
    type: 'equipment', slot: 'bottes', set: 'shika', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 35 }, { stat: 'atk', value: 35 }, { stat: 'flatDamage', value: 2 }, { stat: 'spd', value: 2 }, { stat: 'res.air', value: 2 }],
    description: "Ces sabots ont été conçus pour permettre à Shika de ne jamais écraser les semis, lorsqu'elle ensemençait les plaines de Snossios. Elle y fit rajouter des talons hauts, pour qu'elle puisse courir librement le matin dans les éteules, sans remplir ses sabots de rosée, ou sans abîmer ses chevilles fragiles."
}
item.anneau_de_shika = {
    id: 'anneau_de_shika',
    name: 'Bracelet Magique de Shika',
    image: 'img/items/panoplies/anneau_de_shika.png',
    type: 'equipment', slot: 'anneau', set: 'shika', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 35 }, { stat: 'res.terre', value: 2 }, { stat: 'res.air', value: 2 }],
    description: 'Ce bracelet couvrait les bras de Shika, la protégeant des coups de soleil, et des coups de bec des Corbacs attirés par sa beauté rayonnante. Ils sont encore imprégnés de sa sueur suave.'
}
item.amulette_de_shika = {
    id: 'amulette_de_shika',
    name: 'Epis de Shika',
    image: 'img/items/panoplies/amulette_de_shika.png',
    type: 'equipment', slot: 'amulette', set: 'shika', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 20 }, { stat: 'dropRate', value: 2 }, { stat: 'spd', value: 4 }],
    description: "Shika assistait Farle lors des moissons, en récupérant les épis magiques qui tombaient sous sa faux. Elle prit l'habitude au fil des moissons, de les accrocher autour de son cou. Privés de leurs racines et du reste de leur tige, ces épis magiques continuent tout de même de mûrir chaque année à la même période."
}
item.ceinture_de_shika = {
    id: 'ceinture_de_shika',
    name: 'Shikature',
    image: 'img/items/panoplies/ceinture_de_shika.png',
    type: 'equipment', slot: 'ceinture', set: 'shika', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'atk', value: 30 }, { stat: 'res.terre', value: 2 }, { stat: 'res.feu', value: 2 }, { stat: 'res.neutre', value: 2 }, { stat: 'dropRate', value: 2 }],
    description: "Cette ceinture en cuir protégeait les cuisses de Shika, lorsqu'elle traversait des champs de blé en courant pour rattraper les Bouftous égarés de son troupeau. Recouverte de pollen de céréales magiques, on raconte qu'elle brillait au clair de lune, et permettait à Farle de ne pas sectionner les jambes de sa propre femme lorsqu'il fauchait des champs entiers de céréales une fois la nuit tombée."
}
item.arme_de_shika = {
    id: 'arme_de_shika',
    name: 'Binette de Shika',
    image: 'img/items/panoplies/arme_de_shika.png',
    type: 'equipment', slot: 'arme', set: 'shika', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 50 }, { stat: 'atk', value: 35 }, { stat: 'flatDamage', value: 2 }, { stat: 'critChance', value: 3 }, { stat: 'spd', value: 2 }],
    description: "Cette binette taillée sur mesure permettait à Shika de créer les meules de foin les plus hautes de tout le royaume. La légende raconte qu'elles étaient si grandes que les marins s'en servaient de points de repère pour savoir s'ils approchaient ou non des côtes d'Amakna."
}
// #endregion
// #region Panoplie mantiscore ────────────────────────
item.cape_Ouroboulos = {
    id: 'cape_Ouroboulos',
    name: 'Cape Ouroboulos',
    image: 'img/items/panoplies/cape_Ouroboulos.png',
    type: 'equipment', slot: 'cape', set: 'Ouroboulos', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 55 }, { stat: 'atk', value: 47 }, { stat: 'res.air', value: 3 }],
    description: "Si vous recherchez un moyen de vous camoufler dans le désert, cette cape peut se révéler utile."
}
item.cape_du_desert = {
    id: 'cape_du_desert',
    name: 'Cape du Désert',
    image: 'img/items/panoplies/cape_du_desert.png',
    type: 'equipment', slot: 'cape', set: 'du_desert', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 47 }, { stat: 'atk', value: 40 }, { stat: 'res.terre', value: 3 }],
    description: "Si de la fourrure n'est pas forcément la tenue recommandée en milieu aride, celle de Fennex protège en réalité de la chaleur, extérieure."
}
item.coiffe_du_desert = {
    id: 'coiffe_du_desert',
    name: 'Coiffennex',
    image: 'img/items/panoplies/coiffe_du_desert.png',
    type: 'equipment', slot: 'coiffe', set: 'du_desert', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 34 }, { stat: 'atk', value: 34 }, { stat: 'critChance', value: 2 }, { stat: 'flatDamage', value: 2 }, { stat: 'res.feu', value: 2 }],
    description: "Utiliser des queues de Fennex pour faire des couettes, voilà."
}
item.bottes_Ouroboulos = {
    id: 'bottes_Ouroboulos',
    name: 'Bottes Ouroboulos',
    image: 'img/items/panoplies/bottes_Ouroboulos.png',
    type: 'equipment', slot: 'bottes', set: 'Ouroboulos', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 55 }, { stat: 'atk', value: 20 }, { stat: 'flatDamage', value: 4 }],
    description: "Essentielles pour marcher sur le sable chaud sans s'abîmer la voûte plantaire, ces bottes vous empêcheront également de vous enfoncer dans les sables mouvants."
}
item.anneau_Ouroboulos = {
    id: 'anneau_Ouroboulos',
    name: 'Anneau Ouroboulos',
    image: 'img/items/panoplies/anneau_Ouroboulos.png',
    type: 'equipment', slot: 'anneau', set: 'Ouroboulos', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 20 }, { stat: 'atk', value: 40 }, { stat: 'flatDamage', value: 2 }, { stat: 'res.feu', value: 2 }, { stat: 'spd', value: -4 }],
    description: "Cet anneau se met soudainement à briller en cas de forte chaleur, pouvant prévenir d'incident dramatique si jamais vous ne vous en étiez pas rendu compte par vous-même."
}
item.ceinture_du_desert = {
    id: 'ceinture_du_desert',
    name: 'String Léolhyène',
    image: 'img/items/panoplies/ceinture_du_desert.png',
    type: 'equipment', slot: 'ceinture', set: 'du_desert', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 34 }, { stat: 'atk', value: 27 }, { stat: 'flatDamage', value: 3 }, { stat: 'res.neutre', value: 2 }, { stat: 'dropRate', value: 2 }],
    description: "\"Mais il fait chaud !\", vous avez au moins cette excuse."
}
item.arme_du_mantiscore = {
    id: 'arme_du_mantiscore',
    name: 'Hache du Mantiscore',
    image: 'img/items/panoplies/arme_du_mantiscore.png',
    type: 'equipment', slot: 'arme', set: ['du_desert','Ouroboulos'], rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'atk', value: 40 }, { stat: 'flatDamage', value: 3 }, { stat: 'critChance', value: 3 }, { stat: 'res.air', value: 2 }, { stat: 'heal', value: 10 }],
    description: "L'objectif ici n'est pas de trancher, une simple piqûre est déjà suffisamment dangereuse."
}
// #endregion
// #region Panoplie abraknyde  ────────────────────────
// ------ Panoplie Abraknyde ---- lvl 90
item.cape_abraknyde = {
    id: 'cape_abraknyde',
    name: 'Abracapa',
    image: 'img/items/panoplies/cape_abraknyde.png',
    type: 'equipment', slot: 'cape', set: 'abraknyde', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 60 }, { stat: 'atk', value: 40 }, { stat: 'flatDamage', value: 3 }],
    description: "Vêtu de Feuilles d'Abraknydes, vous pourrez vous pavaner au beau milieu de la forêt sans que l'on vous reconnaisse vraiment. Attention toutefois aux Abraknydes en quête de bourgeonnements printaniers."
}
item.coiffe_abraknyde = {
    id: 'coiffe_abraknyde',
    name: 'Abracaska',
    image: 'img/items/panoplies/coiffe_abraknyde.png',
    type: 'equipment', slot: 'coiffe', set: 'abraknyde', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 50 }, { stat: 'heal', value: 30 }, { stat: 'spd', value: 2 }],
    description: "L'Abracaska permet d'éviter les gueules de bois."
}
item.bottes_abraknyde = {
    id: 'bottes_abraknyde',
    name: 'Abrabottes',
    image: 'img/items/panoplies/bottes_abraknyde.png',
    type: 'equipment', slot: 'bottes', set: 'abraknyde', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 60 }, { stat: 'atk', value: 35 }, { stat: 'flatDamage', value: 3 }, { stat: 'spd', value: 3 }, { stat: 'heal', value: 15 }],
    description: "Les effets de cette paire de Bottes peuvent aussi parfaitement être retrouvés en se rendant dans une taverne. Il faut ensuite consommer un peu, voire beaucoup pour un effet optimum. Le lendemain vous aurez des jambes aussi lourdes que ces bottes."
}
item.anneau_abraknyde = {
    id: 'anneau_abraknyde',
    name: 'Anobra',
    image: 'img/items/panoplies/anneau_abraknyde.png',
    type: 'equipment', slot: 'anneau', set: 'abraknyde', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 55 }, { stat: 'critChance', value: 3 }, { stat: 'flatDamage', value: 3 }],
    description: "Travailler la Branche d'Abraknyde n'est pas chose aisée. Mais avec de la persévérance, on peut finir par obtenir un anneau à la fois sobre, élégant et raffiné. Tout le contraire d'un Sadida dans une taverne."
}
item.amulette_abraknyde = {
    id: 'amulette_abraknyde',
    name: 'Araknamu',
    image: 'img/items/panoplies/amulette_abraknyde.png',
    type: 'equipment', slot: 'amulette', set: 'abraknyde', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'atk', value: 55 }, { stat: 'heal', value: 35 }],
    description: "Cette petite Arakne est la preuve vivante que l'on est pas obligé d'empailler un animal pour en faire une Amulette. Elle vous chatouillera le cou, et tissera peut-être une toile devant votre bouche, si vous baillez trop souvent, ou si vous avez trop mauvaise haleine."
}
item.ceinture_abraknyde = {
    id: 'ceinture_abraknyde',
    name: 'Abrature',
    image: 'img/items/panoplies/ceinture_abraknyde.png',
    type: 'equipment', slot: 'ceinture', set: 'abraknyde', rarity: 'common', levelMax: 20,
    stats: [{ stat: 'atk', value: 60 }, { stat: 'res.neutre', value: 5 }],
    description: "Cette ceinture vous apportera assurance et abdominaux en bois. Un traitement anti-Arakne est néanmoins recommandé tous les ans. Un peu comme la coiffure d'un Sadida, avec heureusement trois fois moins d'anti-parasites."
}
item.arme_abraknyde = {
    id: 'arme_abraknyde',
    name: 'Abraton',
    image: 'img/items/panoplies/arme_abraknyde.png',
    type: 'equipment', slot: 'arme', set: 'abraknyde', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 50 }, { stat: 'flatDamage', value: 5 }, { stat: 'spd', value: 5 }],
    description: "Ce bâton a été sculpté à partir d'un Abraknyde d'un certain âge : on le reconnaît à sa forme agressive, mais il n'a pas conservé l'odeur de bois moisi qui caractérise souvent les vieilles branches."
}
item.bouclier_abraknyde = {
    id: 'bouclier_abraknyde',
    name: 'Bouclier Abraknyde',
    image: 'img/items/panoplies/bouclier_abraknyde.png',
    type: 'equipment', slot: 'bouclier', set: 'abraknyde', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 55 }, { stat: 'atk', value: 20 }, { stat: 'res.terre', value: 3 }, { stat: 'res.neutre', value: 3 }],
    description: "Caché derrière ce bouclier, les aventuriers les plus naïfs pourront vous prendre pour un Abraknyde et se sauver en courant. Les autres vous agresseront en pensant récupérer quelques ambres."
}
// ------ Panoplie Abraknyde Ancestral ---- lvl 110
item.cape_abraknydeAncestral = {
    id: 'cape_abraknydeAncestral',
    name: 'Abracapa Ancestrale',
    image: 'img/items/panoplies/cape_abraknydeAncestral.png',
    type: 'equipment', slot: 'cape', set: 'abraknydeAncestral', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 75 }, { stat: 'atk', value: 50 }, { stat: 'flatDamage', value: 3 }, { stat: 'spd', value: 3 }, { stat: 'res.eau', value: 6 }, { stat: 'res.air', value: 6 }, { stat: 'dropRate', value: 4 }],
    description: "En été, l'Abraknyde Ancestral aime se dorer au soleil, mais son bois habitué aux forêts sombres le supporte mal. Cette cape est confectionnée avec les pelures de son écorce."
}
item.coiffe_abraknydeAncestral = {
    id: 'coiffe_abraknydeAncestral',
    name: 'Abracaska Ancestral',
    image: 'img/items/panoplies/coiffe_abraknydeAncestral.png',
    type: 'equipment', slot: 'coiffe', set: 'abraknydeAncestral', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 130 }, { stat: 'atk', value: 50 }, { stat: 'flatDamage', value: 5 }, { stat: 'res.feu', value: 5 }, { stat: 'dropRate', value: 4 }],
    description: "Cette Coiffe fut créée pour Jicé Aouaire car il a la tête plate, aucun soucis d'équilibre pour l'arborer donc. Il l'a faite faire après avoir vaincu l'Abraknyde Ancestral en brisant ses noisettes entre ses fesses, mais il s'en vante moins."
}
item.bottes_abraknydeAncestral = {
    id: 'bottes_abraknydeAncestral',
    name: 'Protège-Tibias Ancestraux',
    image: 'img/items/panoplies/bottes_abraknydeAncestral.png',
    type: 'equipment', slot: 'bottes', set: 'abraknydeAncestral', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 80 }, { stat: 'atk', value: 50 }, { stat: 'flatDamage', value: 3 }, { stat: 'res.feu', value: 5 }, { stat: 'dropRate', value: 4 }],
    description: "Avec ces protège-tibias en bois massif, vos jambes ne craignent plus rien. Ils sont en revanche incompatibles avec le port de bottes. Vous pourrez les utiliser pour vous protéger lors des compétitions de Boufball, mais vous ne pourrez plus faire de pointu avec vos bottes coquées."
}
item.anneau_abraknydeAncestral = {
    id: 'anneau_abraknydeAncestral',
    name: 'Anneau Ancestral',
    image: 'img/items/panoplies/anneau_abraknydeAncestral.png',
    type: 'equipment', slot: 'anneau', set: 'abraknydeAncestral', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 80 }, { stat: 'atk', value: 40 }, { stat: 'flatDamage', value: 3 }, { stat: 'res.terre', value: 5 }, { stat: 'res.eau', value: 5 }, { stat: 'dropRate', value: 4 }],
    description: "Les soirs où vous aurez trop bu, vous verrez peut-être le Moskito pris dans cet anneau vous faire un clin d'œil. Mais évitez d'en parler à vos amis, il fait seulement semblant."
}
item.amulette_abraknydeAncestral = {
    id: 'amulette_abraknydeAncestral',
    name: 'Torque Ancestral',
    image: 'img/items/panoplies/amulette_abraknydeAncestral.png',
    type: 'equipment', slot: 'amulette', set: 'abraknydeAncestral', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 70 }, { stat: 'atk', value: 45 }, { stat: 'flatDamage', value: 4 }, { stat: 'res.feu', value: 6 }, { stat: 'dropRate', value: 4 }],
    description: "Autour du cou, ce torque met en valeur votre barbe. Si vous n'avez pas de barbe, vous ne pouvez vous en prendre qu'à vous-même."
}
item.ceinture_abraknydeAncestral = {
    id: 'ceinture_abraknydeAncestral',
    name: 'Abrature Ancestrale',
    image: 'img/items/panoplies/ceinture_abraknydeAncestral.png',
    type: 'equipment', slot: 'ceinture', set: 'abraknydeAncestral', rarity: 'uncommon', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 100 }, { stat: 'atk', value: 55 }, { stat: 'flatDamage', value: 4 }, { stat: 'critChance', value: 3 },{ stat: 'res.terre', value: 1 }, { stat: 'res.feu', value: 1 }, { stat: 'res.eau', value: 1 }, { stat: 'res.air', value: 1 }, { stat: 'res.neutre', value: 1 }, { stat: 'dropRate', value: 3 }],
    description: "Cette ceinture est censée vous donner la virilité ancestrale. Que ce soit vrai ou pas, l'effet est périmé."
}
// #endregion




// ────────────────────────────────────────────────────────────────────────
// ─────────────────── ITEMS ACCESOIRES ──────────────────────
// ────────────────────────────────────────────────────────────────────────
item.Dofus_Argente = {
    id: 'Dofus_Argente',
    name: 'Dofus Argenté',
    image: 'img/items/objets_bonus/Dofus_Argente.png',
    type: 'equipment', slot: 'accessoire', rarity: 'legendaire', levelMax: 20,
    stats:  [{ stat: 'atk', value: 20 }, { stat: 'maxHp', value: 50 }],
    effects: [{ every: 4, after: 8, type:'heal%maxHp', heal:5, target:'self' }],
    description: "Pondu par Rathrosk le dragon gris, cet œuf est une énigme. Bien que son pouvoir n'égale pas celui d'un Dofus Primordial, il semble plus ancien que le temps... Vous feriez bien de le garder précieusement. Après tout, seules les Nordes et le dieu Xélor savent de quoi l'avenir sera fait."
}
item.Dofus_Ocre = {
    id: 'Dofus_Ocre',
    name: 'Dofus Ocre',
    image: 'img/items/objets_bonus/Dofus_Ocre.png',
    type: 'equipment', slot: 'accessoire', rarity: 'legendaire', levelMax: 20,
    stats: [{ stat: 'spd', value: 20 }, { stat: 'finalDamagePct', value: 10 }],
    effects: [{ on_effect:{ source:'enemy', type:'dot' }, reaction:'cancel' }],
    description: "Pondu par Terrakourial, le Dragon de la Terre, puis avalé par le Kralamour Géant, ce Dofus concentre de grands pouvoirs à ne pas mettre entre toutes les mains... Ni entre tous les pieds d'ailleurs."
}
item.Dofus_Pourpre = {
    id: 'Dofus_Pourpre',
    name: 'Dofus Pourpre',
    image: 'img/items/objets_bonus/Dofus_Pourpre.png',
    type: 'equipment', slot: 'accessoire', rarity: 'legendaire', levelMax: 20,
    stats: [{ stat: 'atk', value: 50 }, { stat: 'critDamagePct', value: 20 }],
    effects: [{ on_effect: { source: 'enemy', type: ['heal', 'heal%maxHp'] }, reaction: 'heal_to_damage', element: 'feu', rawDamage: { min: 5, max: 15 } }],
    description: "Pondu par Ignemikhal, Dragon Élémentaire du Feu, par amour pour la poupée divine Ladysally. Cet œuf incandescent renferme une puissance ardente sans égale... seuls les plus courageux méritent de le porter."
}
item.Dofus_Turquoise = {
    id: 'Dofus_Turquoise',
    name: 'Dofus Turquoise',
    image: 'img/items/objets_bonus/Dofus_Turquoise.png',
    type: 'equipment', slot: 'accessoire', rarity: 'legendaire', levelMax: 20,
    stats: [{ stat: 'atk', value: 50 }, { stat: 'critChance', value: 13 }],
    effects: [{ on_effect: { source: 'enemy', crit_only: true, type: ['damage'] }, reaction: 'crit_absorb_heal', heal_pct: 20 }],
    description: "Pondu par Aguabrial, Dragon Élémentaire de l'Eau, par amour pour la poupée Dathura. Cet œuf limpide renferme une puissance d'une profondeur sans égale... seuls les plus courageux méritent de le porter."
}



// ─── Niveau minimum requis (modulation skull) ─────────────────────────────────
;(function() {
    const REQ = {
        1:  ['bottesAventurier','capeAventurier','chapeauAventurier','anneauAventurier','ceintureAventurier','amuletteAventurier'],
        10: ['cape_mousse','coiffe_mousse','bottes_mousse','anneau_mousse','amulette_mousse','ceinture_mousse','pelle_mousse','bouclier_mousse',
             'sac_paysan','chapeau_paysan','bottes_paysan','anneau_paysan','amulette_paysan','ceinture_paysan','faux_paysan','bouclier_tournesol'],
        15: ['anneauKardorim','capeKardorim','coiffeKardorim'],
        20: ['cape_bouftou','coiffe_bouftou','bottes_bouftou','anneau_bouftou','amulette_bouftou','ceinture_bouftou','marteau_bouftou','bouclier_bouftou',
             'cape_de_lHomme_Ours','coiffe_de_lHomme_Ours','bottes_de_lHomme_Ours','anneau_de_lHomme_Ours','amulette_de_lHomme_Ours','ceinture_de_lHomme_Ours','baton_de_lHomme_Ours',
             'bottes_du_sanglier','anneau_du_sanglier','ceinture_du_sanglier',
             'cape_du_prespic','coiffe_du_prespic','anneau_du_prespic','ceinture_du_prespic','bouclier_du_prespic'],
        25: [],
        30: ['cape_scarafeuille_blanc','coiffe_scarafeuille_blanc','anneau_scarafeuille_blanc','ceinture_scarafeuille_blanc',
             'cape_scarafeuille_vert','coiffe_scarafeuille_vert','anneau_scarafeuille_vert','ceinture_scarafeuille_vert',
             'cape_scarafeuille_bleu','coiffe_scarafeuille_bleu','anneau_scarafeuille_bleu','ceinture_scarafeuille_bleu',
             'cape_scarafeuille_rouge','coiffe_scarafeuille_rouge','anneau_scarafeuille_rouge','ceinture_scarafeuille_rouge',
             'cape_scarafeuille_noir','coiffe_scarafeuille_noir','anneau_scarafeuille_noir','ceinture_scarafeuille_noir'],
        35: ['cape_bouftou_royal','coiffe_bouftou_royal','bottes_bouftou_royal','anneau_bouftou_royal','amulette_bouftou_royal','ceinture_bouftou_royal','epee_bouftou_royal','bouclier_bouftou_royal'],
        40: ['cape_kwak_vent','coiffe_kwak_vent','bottes_kwak_vent','anneau_kwak_vent','amulette_kwak_vent','ceinture_kwak_vent','epee_kwak_vent',
             'cape_kwak_glace','coiffe_kwak_glace','bottes_kwak_glace','anneau_kwak_glace','amulette_kwak_glace','ceinture_kwak_glace','epee_kwak_glace',
             'cape_kwak_flamme','coiffe_kwak_flamme','bottes_kwak_flamme','anneau_kwak_flamme','amulette_kwak_flamme','ceinture_kwak_flamme','epee_kwak_flamme',
             'cape_kwak_terre','coiffe_kwak_terre','bottes_kwak_terre','anneau_kwak_terre','amulette_kwak_terre','ceinture_kwak_terre','epee_kwak_terre'],
        45: ['cape_scaraboss_doree','coiffe_scaraboss_doree','bottes_scaraboss_doree','anneau_scaraboss_doree','amulette_scaraboss_doree','ceinture_scaraboss_doree','baguette_scaraboss_doree'],
        50: ['bottes_blop_indigo','anneau_blop_indigo','amulette_blop_indigo','ceinture_blop_indigo','bottes_blop_griotte','anneau_blop_griotte','amulette_blop_griotte','ceinture_blop_griotte','bottes_blop_coco','anneau_blop_coco','amulette_blop_coco','ceinture_blop_coco',
             'bottes_blop_reinette','anneau_blop_reinette','amulette_blop_reinette','ceinture_blop_reinette'],
        55: ['kwakwaffe','kwakwalliance','kwakwanneau','kwakwalame'],
        60: ['cape_gelax', 'coiffe_gelax', 'bottes_gelax', 'amulette_gelax', 'ceinture_gelax', 'anneau_gelano'],
        65: [],
        70: ['cape_Ouroboulos', 'bottes_Ouroboulos','anneau_Ouroboulos','arme_du_mantiscore','cape_du_desert', 'coiffe_du_desert','ceinture_du_desert'],
        75: ['arme_du_mantiscore'],
        80: ['cape_de_shika', 'coiffe_de_shika','bottes_de_shika','anneau_de_shika','amulette_de_shika','ceinture_de_shika','arme_de_shika',
             'bottes_blop_indigo_royal','anneau_blop_indigo_royal','amulette_blop_indigo_royal','ceinture_blop_indigo_royal','bottes_blop_griotte_royal','anneau_blop_griotte_royal','amulette_blop_griotte_royal','ceinture_blop_griotte_royal',
             'bottes_blop_reinette_royal','anneau_blop_reinette_royal','amulette_blop_reinette_royal','ceinture_blop_reinette_royal','bottes_blop_coco_royal','anneau_blop_coco_royal','amulette_blop_coco_royal','ceinture_blop_coco_royal'],
        85: [],
        90: ['cape_abraknyde', 'coiffe_abraknyde', 'bottes_abraknyde', 'anneau_abraknyde', 'amulette_abraknyde', 'ceinture_abraknyde', 'arme_abraknyde', 'bouclier_abraknyde'],
        95: [],
        100: ['cape_dragon_cochon', 'coiffe_dragon_cochon','bottes_dragon_cochon','anneau_dragon_cochon','amulette_dragon_cochon','ceinture_dragon_cochon','arme_dragon_cochon',
              'cape_ouassingue','coiffe_ouassingue','bottes_ouassingue','amulette_ouassingue'],
        105: [],
        110: ['cape_abraknydeAncestral', 'coiffe_abraknydeAncestral', 'bottes_abraknydeAncestral', 'anneau_abraknydeAncestral', 'amulette_abraknydeAncestral', 'ceinture_abraknydeAncestral'],
        115: [],
        120: [],
        125: [],
        130: [],
        135: [],
        140: [],
        145: [],
        150: [],
        155: [],
        160: ['cape_roissingue','coiffe_roissingue','anneau_roissingue'],
        165: [],
        170: [],
        175: [],
        180: ['kralamansion','kralano','annolamour','Dofus_Ocre'],
        185: [],
        190: [],
        195: [],
        200: []
    }
    for (const [lvl, ids] of Object.entries(REQ)) {
        for (const id of ids) { if (item[id]) item[id].requiredLevel = Number(lvl) }
    }
})()
