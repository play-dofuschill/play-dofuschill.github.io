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
item.exemple = {
    id: 'exemple',
    name: 'Exemple',
    rarity: 'legendary',
    stats: [{ stat: 'atk', value: 10 }, { stat: 'spd', value: 10 }, { stat: 'flatDamage', value: 10 }, { stat: 'finalDamagePct', value: 10 }, { stat: 'spellDamagePct', value: 10 }, { stat: 'damageReductionPct', value: 10 }, { stat: 'critChance', value: 10 }, { stat: 'critDamagePct', value: 10 }, { stat: 'maxHp', value: 10 }, { stat: 'res.feu', value: 10 }, { stat: 'res.eau', value: 10 }, { stat: 'res.terre', value: 10 }, { stat: 'res.air', value: 10 }, { stat: 'res.neutre', value: 10 }],
    // effects: [ pour plus tard si je veux rajouter des effets passifs aux équipements
    //     {type: 'shield',
    //      shield: 10,
    //      target: 'self'},
    //     {type: 'lifesteal',
    //      ratio: 0.10,
    //      target: 'self'
    //     }
    // ]
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
    return LEVEL_TIERS.find(t => level <= t.maxLevel).tier
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
// #region Panoplie Bouftou — Tainela ────────────────────────
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
    name: 'Marteau Bouftou Royal',
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
    stats: [{ stat: 'atk', value: 20 }, { stat: 'flatDamage', value: 14 }],
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
    stats: [{ stat: 'maxHp', value: 80 }, { stat: 'atk', value: 60 },{ stat: 'flatDamage', value: 6 }, { stat: 'dropRate', value: 4 },{ stat: 'res.eau', value: 4 }, { stat: 'res.terre', value: 4 }, { stat: 'spd', value: -4 }],
    description: "Moins performante que la Cape du Roissingue, cette cape présente néanmoins les mêmes avantages quant à l'évacuation de la sueur. Avec elle, vous allez pouvoir faire face à toutes les situations... Si vous arrivez à combattre en apnée, car vu l'odeur, il est vraiment impossible de ne pas défaillir."
}
item.coiffe_ouassingue = {
    id: 'coiffe_ouassingue',
    name: 'Capuche de la Ouassingue',
    image: 'img/items/panoplies/coiffe_ouassingue.png',
    type: 'equipment', slot: 'coiffe', set: 'ouassingue', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 80 }, { stat: 'atk', value: 60 },{ stat: 'flatDamage', value: 6 }, { stat: 'dropRate', value: 4 },{ stat: 'res.eau', value: 4 }, { stat: 'res.terre', value: 4 }],
    description: "Moins efficace que la Coiffe royale, cette capuche permet toutefois une très bonne évacuation de la sueur. Un peu trop bonne, en fait. Du coup, que l'on porte la capuche ou qu'on ne la porte pas ne fait aucune différence."
}
item.bottes_ouassingue = {
    id: 'bottes_ouassingue',
    name: 'Bottes Horchons',
    image: 'img/items/panoplies/bottes_ouassingue.png',
    type: 'equipment', slot: 'bottes', set: 'ouassingue', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 80 }, { stat: 'atk', value: 40 }, { stat: 'flatDamage', value: 6 }, { stat: 'res.terre', value: 4 }, { stat: 'dropRate', value: 4 }],
    description: "Ces Bottes émettent un immonde bruit de succion à chaque pas, ce qui n'est pas sans vous rappeler le chant d'amour des Trools en rut. Un souvenir douloureux dont vous vous seriez bien passé."
}
item.amulette_ouassingue = {
    id: 'amulette_ouassingue',
    name: 'Ouassulette',
    image: 'img/items/panoplies/amulette_ouassingue.png',
    type: 'equipment', slot: 'amulette', set: 'ouassingue', rarity: 'commun', levelMax: 20,
    stats: [{ stat: 'maxHp', value: 90 }, { stat: 'atk', value: 50 }, { stat: 'res.terre', value: 4 }, { stat: 'dropRate', value: 4 }, { stat: 'healPct', value: 4 }],
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




// ────────────────────────────────────────────────────────────────────────
// ─────────────────── ITEMS ACCESOIRES ──────────────────────
// ────────────────────────────────────────────────────────────────────────
item.Dofus_Ocre = {
    id: 'Dofus_Ocre',
    name: 'Dofus Ocre',
    image: 'img/items/objets_bonus/Dofus_Ocre.png',
    type: 'equipment', slot: 'accessoire', rarity: 'legendaire', levelMax: 20,
    stats: [{ stat: 'spd', value: 100 }, { stat: 'finalDamagePct', value: 15 }],
    description: "Créé par Terrakourial, le Dragon de la Terre, puis avalé par le Kralamour Géant, ce Dofus concentre de grands pouvoirs à ne pas mettre entre toutes les mains... Ni entre tous les pieds d'ailleurs."
}



// ─── Niveau minimum requis (modulation skull) ─────────────────────────────────
;(function() {
    const REQ = {
        1:  ['bottesAventurier','capeAventurier','chapeauAventurier','anneauAventurier','ceintureAventurier','amuletteAventurier'],
        10: ['cape_mousse','coiffe_mousse','bottes_mousse','anneau_mousse','amulette_mousse','ceinture_mousse','pelle_mousse','bouclier_mousse',
             'sac_paysan','chapeau_paysan','bottes_paysan','anneau_paysan','amulette_paysan','ceinture_paysan','faux_paysan'],
        15: ['anneauKardorim','capeKardorim','coiffeKardorim'],
        20: ['cape_bouftou','coiffe_bouftou','bottes_bouftou','anneau_bouftou','amulette_bouftou','ceinture_bouftou','marteau_bouftou','bouclier_bouftou'],
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
        50: [],
        55: ['kwakwaffe','kwakwalliance','kwakwanneau','kwakwalame'],
        60: [],
        65: [],
        70: [],
        75: [],
        80: [],
        85: [],
        90: [],
        95: [],
        100: ['cape_ouassingue','coiffe_ouassingue','bottes_ouassingue','amulette_ouassingue'],
        105: [],
        110: [],
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
