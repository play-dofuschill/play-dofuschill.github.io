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
// fireResPct = % de résistance feu
// waterResPct = % de résistance eau
// earthResPct = % de résistance terre
// airResPct = % de résistance air
// neutralResPct = % de résistance neutre
/*
item.exemple = {
    id: 'exemple',
    name: 'Exemple',
    rarity: 'legendary',
    stats: [
        { stat: 'atk', value: 10 },
        { stat: 'spd', value: 10 },
        { stat: 'flatDamage', value: 10 },
        { stat: 'finalDamagePct', value: 10 },
        { stat: 'spellDamagePct', value: 10 },
        { stat: 'damageReductionPct', value: 10 },
        { stat: 'critChance', value: 10 },
        { stat: 'critDamagePct', value: 10 },
        { stat: 'maxHp', value: 10 },
        { stat: 'fireResPct', value: 10 },
        { stat: 'waterResPct', value: 10 },
        { stat: 'earthResPct', value: 10 },
        { stat: 'airResPct', value: 10 },
        { stat: 'neutralResPct', value: 10 },
    ],
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

function getItemStats(item, level) {

    const tier = getItemTier(level)
    const multiplier = ITEM_TIER_MULTIPLIERS[tier] || 1

    return item.stats.map(stat => ({
        stat: stat.stat,
        value: Math.round(stat.value * multiplier)
    }))
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
    type: 'equipment',
    slot: 'bottes',
    set: 'aventurier',
    rarity: 'common',
    levelMax: 20,
    stats: [
        { stat: 'maxHp', value: 5 },
        { stat: 'atk', value: 5 }],
    description: 'Bottes de simple facture, idéales pour les jeunes aventuriers.'
}
item.capeAventurier = {
    id: 'capeAventurier',
    name: "Cape de l'Aventurier",
    image: 'img/items/panoplies/cape_aventurier.png',
    type: 'equipment',
    slot: 'cape',
    set: 'aventurier',
    rarity: 'common',
    levelMax: 20,
    stats: [
        { stat: 'maxHp', value: 5 },
        { stat: 'atk', value: 5 }],
    description: 'Classe mais peu performante, comblera les jeunes aventuriers.'
}
item.chapeauAventurier = {
    id: 'chapeauAventurier',
    name: "Chapeau de l'Aventurier",
    image: 'img/items/panoplies/chapeau_aventurier.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'aventurier',
    rarity: 'common',
    levelMax: 20,
    stats: [
        { stat: 'maxHp', value: 5 },
        { stat: 'atk', value: 5 }],
    description: "Pas très classe, mais ça fait le travail."
}
item.anneauAventurier = {
    id: 'anneauAventurier',
    name: "Anneau de l'Aventurier",
    image: 'img/items/panoplies/anneau_aventurier.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'aventurier',
    rarity: 'common',
    levelMax: 20,
    stats: [
        { stat: 'maxHp', value: 5 },
        { stat: 'atk', value: 5 }],
    description: "Un petit anneau sympathique pour les débutants."
}
item.ceintureAventurier = {
    id: 'ceintureAventurier',
    name: "Ceinture de l'Aventurier",
    image: 'img/items/panoplies/ceinture_aventurier.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'aventurier',
    rarity: 'common',
    levelMax: 20,
    stats: [
        { stat: 'maxHp', value: 5 },
        { stat: 'atk', value: 5 }],
    description: 'Une petite ceinture pour les aventuriers en herbe.'
}
item.amuletteAventurier = {
    id: 'amuletteAventurier',
    name: "Amulette de l'Aventurier",
    image: 'img/items/panoplies/amulette_aventurier.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'aventurier',
    rarity: 'common',
    levelMax: 20,
    stats: [
        { stat: 'maxHp', value: 5 },
        { stat: 'atk', value: 5 }],
    description: "Sympathique lorsque l'on possède la panoplie."
}
// #endregion
// #region Panoplie Kardorim — Donjon kardorim ──────────────────
item.anneauKardorim = {
    id: 'anneauKardorim',
    name: "Bracelet de Kardorim",
    image: 'img/items/panoplies/anneau_kardorim.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'kardorim',
    rarity: 'peu_commun',
    levelMax: 20,
    stats: [
        { stat: 'atk', value: 10 },
        { stat: 'flatDamage', value: 2 }],
    description: "Fait à partir d'os de Chafer, ce magnifique bracelet protègera votre poignet des coups d'épée visant à le trancher, tout en vous musclant le bras. Un objet incontournable pour le débutant que vous êtes."
}
item.capeKardorim = {
    id: 'capeKardorim',
    name: "Cape de Kardorim",
    image: 'img/items/panoplies/cape_kardorim.png',
    type: 'equipment',
    slot: 'cape',
    set: 'kardorim',
    rarity: 'peu_commun',
    levelMax: 20,
    stats: [
        { stat: 'atk', value: 10 }],
    description: "En portant cette cape, vous pourriez faire croire aux Chafers d'Incarnam que vous êtes leur capitaine. Dommage qu'ils n'aient pas d'yeux pour voir ça !"
}
item.coiffeKardorim = {
    id: 'coiffeKardorim',
    name: "Casque de Kardorim",
    image: 'img/items/panoplies/coiffe_kardorim.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'kardorim',
    rarity: 'peu_commun',
    levelMax: 20,
    stats: [
        { stat: 'atk', value: 10 },
        { stat: 'flatDamage', value: 2 }],
    description: "« Casque à pointes » rime avec « courtepointe », une couverture doublée qu'on étend sur le lit pour avoir chaud en hiver. Savoir cela ne fera pas de vous un héros, mais vous serez certainement plus cultivé !"
}
// #endregion
// #region Panoplie Bouftou — Tainela ────────────────────────
item.cape_bouftou = {
    id: 'cape_bouftou',
    name: 'Cape Bouftou',
    image: 'img/items/panoplies/cape_bouftou.png',
    type: 'equipment',
    slot: 'cape',
    set: 'bouftou',
    rarity: 'uncommon',
    levelMax: 20,
    stats: [
        { stat: 'maxHp', value: 28 }],
    description: "Résistante et confortable. L'odeur est une autre histoire."
}
item.coiffe_bouftou = {
    id: 'coiffe_bouftou',
    name: 'Coiffe Bouftou',
    image: 'img/items/panoplies/coiffe_bouftou.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'bouftou',
    rarity: 'uncommon',
    levelMax: 20,
    stats: [
        { stat: 'atk', value: 14 }],
    description: "Permet de gagner en force à qui s'habitue à l'odeur."
}
item.bottes_bouftou = {
    id: 'bottes_bouftou',
    name: 'Bottes Bouftou',
    image: 'img/items/panoplies/bottes_bouftou.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'bouftou',
    rarity: 'uncommon',
    levelMax: 20,
    stats: [
        { stat: 'maxHp', value: 14 },
        { stat: 'atk', value: 10 }],
    description: "D'un confort inégalé. L'intérieur est doublé en laine de Bouftou."
}
item.anneau_bouftou = {
    id: 'anneau_bouftou',
    name: 'Anneau Bouftou',
    image: 'img/items/panoplies/anneau_bouftou.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'bouftou',
    rarity: 'uncommon',
    levelMax: 20,
    stats: [
        { stat: 'maxHp', value: 20 }],
    description: 'Provient du fameux Bouze le Clerc.'
}
item.amulette_bouftou = {
    id: 'amulette_bouftou',
    name: 'Amulette Bouftou',
    image: 'img/items/panoplies/amulette_bouftou.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'bouftou',
    rarity: 'uncommon',
    levelMax: 20,
    stats: [
        { stat: 'maxHp', value: 8 },
        { stat: 'atk', value: 8 }],
    description: "Procure calme et sagesse. Ou l'inverse."
}
item.ceinture_bouftou = {
    id: 'ceinture_bouftou',
    name: 'Ceinture Bouftou',
    image: 'img/items/panoplies/ceinture_bouftou.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'bouftou',
    rarity: 'uncommon',
    levelMax: 20,
    stats: [
        { stat: 'maxHp', value: 15 }],
    description: "Rapide à équiper, doublée en laine soyeuse de Boufton."
}
item.marteau_bouftou = {
    id: 'marteau_bouftou',
    name: 'Marteau Bouftou',
    image: 'img/items/panoplies/marteau_bouftou.png',
    type: 'equipment',
    slot: 'arme',
    set: 'bouftou',
    rarity: 'uncommon',
    levelMax: 20,
    stats: [
        { stat: 'atk', value: 2 },
        { stat: 'flatDamage', value: 1 }],
    description: "Capable de libérer une énergie colossale lorsque bien manié."
}
item.bouclier_bouftou = {
    id: 'bouclier_bouftou',
    name: 'Bouclier Bouftou',
    image: 'img/items/panoplies/bouclier_bouftou.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'bouftou',
    rarity: 'uncommon',
    levelMax: 20,
    stats: [
        { stat: 'maxHp', value: 20 },
        { stat: 'neutralResPct', value: 7 }],
    description: "Impressionnant grâce à l'odeur qu'il dégage."
}
// #endregion
// #region Panoplie Bouftou — Tainela ────────────────────────
item.cape_bouftou_royal = {
    id: 'cape_bouftou_royal',
    name: 'Cape Bouftou Royal',
    image: 'img/items/panoplies/cape_bouftou_royal.png',
    type: 'equipment',
    slot: 'cape',
    set: 'bouftou',
    rarity: 'uncommon',
    levelMax: 20,
    stats: [
        { stat: 'maxHp', value: 25 },
        { stat: 'earthResPct', value: 4 }],
    description: "Cette cape portée par le grand Bouftou Royal confère, en plus d'un style fabuleux, une force hors du commun."
}
item.coiffe_bouftou_royal = {
    id: 'coiffe_bouftou_royal',
    name: 'Coiffe Bouftou Royal',
    image: 'img/items/panoplies/coiffe_bouftou_royal.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'bouftou',
    rarity: 'uncommon',
    levelMax: 20,
    stats: [
        { stat: 'atk', value: 25 }],
    description: "La Boufcoiffe Royale est un objet indémodable. Elégante, elle procure à son porteur force et intelligence."
}
item.bottes_bouftou_royal = {
    id: 'bottes_bouftou_royal',
    name: 'Bottes Bouftou Royal',
    image: 'img/items/panoplies/bottes_bouftou_royal.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'bouftou',
    rarity: 'uncommon',
    levelMax: 20,
    stats: [
        { stat: 'maxHp', value: 25 },
        { stat: 'flatDamage', value: 2 }],
    description: "Elles brillent, elles respirent la puissance, ces bottes sont en tous points royales."
}
item.anneau_bouftou_royal = {
    id: 'anneau_bouftou_royal',
    name: 'Anneau Bouftou Royal',
    image: 'img/items/panoplies/anneau_bouftou_royal.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'bouftou',
    rarity: 'uncommon',
    levelMax: 20,
    stats: [
        { stat: 'maxHp', value: 30 },
        { stat: 'flatDamage', value: 1 }],
    description: "Cet anneau tout comme l'odeur de la femelle du Bouftou Royal augmente votre charme."
}
item.amulette_bouftou_royal = {
    id: 'amulette_bouftou_royal',
    name: 'Amulette Bouftou Royal',
    image: 'img/items/panoplies/amulette_bouftou_royal.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'bouftou',
    rarity: 'uncommon',
    levelMax: 20,
    stats: [
        { stat: 'atk', value: 14 },
        { stat: 'critChance', value: 2 }],
    description: "Cette amulette augmente la force et l'intelligence de son porteur."
}
item.ceinture_bouftou_royal = {
    id: 'ceinture_bouftou_royal',
    name: 'Ceinture Bouftou Royal',
    image: 'img/items/panoplies/ceinture_bouftou_royal.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'bouftou',
    rarity: 'uncommon',
    levelMax: 20,
    stats: [
        { stat: 'maxHp', value: 35 },
        { stat: 'critChance', value: 2 }],
    description: "Elle est si douce qu'elle permet même de ligoter sa dulcinée lorsque celle-ci refuse de rester à la maison."
}
item.epee_bouftou_royal = {
    id: 'epee_bouftou_royal',
    name: 'Marteau Bouftou Royal',
    image: 'img/items/panoplies/epee_bouftou_royal.png',
    type: 'equipment',
    slot: 'arme',
    set: 'bouftou',
    rarity: 'uncommon',
    levelMax: 20,
    stats: [
        { stat: 'flatDamage', value: 5 }],
    description: "Cette épée ne sait pas trop sur quel sabot danser..."
}
item.bouclier_bouftou_royal = {
    id: 'bouclier_bouftou_royal',
    name: 'Bouclier Bouftou Royal',
    image: 'img/items/panoplies/bouclier_bouftou_royal.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'bouftou',
    rarity: 'uncommon',
    levelMax: 20,
    stats: [
        { stat: 'maxHp', value: 14 },
        { stat: 'atk', value: 14 },
        { stat: 'fireResPct', value: 7 }],
    description: "Cette cuirasse royale vous donnera autorité sur les bouftous de Tainéla."
}
// #endregion
// #region Panoplie Mousse — Plage d'Astrub ──────────────────
item.cape_mousse = {
    id: 'cape_mousse',
    name: 'Cape en mousse',
    image: 'img/items/panoplies/cape_mousse.png',
    type: 'equipment',
    slot: 'cape',
    set: 'mousse',
    rarity: 'common',
    levelMax: 20,
    stats: [
        { stat: 'atk', value: 20 }],
    description: "Cette cape est idéale pour le camouflage en milieu naturel, mais uniquement s'il n'y a personne pour vous voir."
}
item.coiffe_mousse = {
    id: 'coiffe_mousse',
    name: 'Coiffe en mousse',
    image: 'img/items/panoplies/coiffe_mousse.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'mousse',
    rarity: 'common',
    levelMax: 20,
    stats: [
        { stat: 'maxHp', value: 10 },
        { stat: 'atk', value: 10 },
        { stat: 'flatDamage', value: 2 },],
    description: "Cette coiffe résume la conception moderne du ménage et de la répartition des tâches ménagères au sein des couples épanouïs."
}
item.bottes_mousse = {
    id: 'bottes_mousse',
    name: 'Bottes en mousse',
    image: 'img/items/panoplies/bottes_mousse.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'mousse',
    rarity: 'common',
    levelMax: 20,
    stats: [
        { stat: 'maxHp', value: 20 },
        { stat: 'atk', value: 15 }],
    description: "Certains se servent de ces bottes pour se gratter les pieds en marchant, ou tout simplement pour les nettoyer."
}
item.anneau_mousse = {
    id: 'anneau_mousse',
    name: 'Anneau en mousse',
    image: 'img/items/panoplies/anneau_mousse.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'mousse',
    rarity: 'common',
    levelMax: 20,
    stats: [
        { stat: 'maxHp', value: 14 },
        { stat: 'flatDamage', value: 1 }],
    description: "Offert en alliance, cet anneau permet de faire passer deux messages à l'être aimé : \"Je t'aime\" et \"Va faire la vaisselle\"."
}
item.amulette_mousse = {
    id: 'amulette_mousse',
    name: 'Amulette en mousse',
    image: 'img/items/panoplies/amulette_mousse.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'mousse',
    rarity: 'common',
    levelMax: 20,
    stats: [
        { stat: 'atk', value: 10 },
        { stat: 'critChance', value: 1 }],
    description: "Cette amulette est souvent confondue avec un jouet à trouver dans des pochettes surprises, alors qu'en fait elle se gagne au stand de tir."
}
item.ceinture_mousse = {
    id: 'ceinture_mousse',
    name: 'Ceinture en mousse',
    image: 'img/items/panoplies/ceinture_mousse.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'mousse',
    rarity: 'common',
    levelMax: 20,
    stats: [
        { stat: 'atk', value: 20 }],
    description: "Cette ceinture permettait à Vald de prendre son bain sans danger car aucun Iop n'a encore réussi à apprendre à nager."
}
item.pelle_mousse = {
    id: 'pelle_mousse',
    name: 'Pelle en mousse',
    image: 'img/items/panoplies/pelle_mousse.png',
    type: 'equipment',
    slot: 'arme',
    set: 'mousse',
    rarity: 'common',
    levelMax: 20,
    stats: [
        { stat: 'maxHp', value: 5 },
        { stat: 'atk', value: 14 },
        { stat: 'critChance', value: 1 }],
    description: "Cette arme terriblement puissante contre les mottes de terre, a marqué plus d'un aventurier débutant."
}
item.bouclier_mousse = {
    id: 'bouclier_mousse',
    name: 'Bouclier en mousse',
    image: 'img/items/panoplies/bouclier_mousse.png',
    type: 'equipment',
    slot: 'bouclier',
    set: 'mousse',
    rarity: 'common',
    levelMax: 20,
    stats: [
        { stat: 'maxHp', value: 14 },
        { stat: 'atk', value: 10 },
        { stat: 'airResPct', value: 4 }],
    description: "Ce bouclier jaune, poreux mais absorbant a été conçu à partir des restes d'un animal qui avait élu domicile dans un ananas tombé au fond de la mer."
}
// #endregion
// #region Panoplie Paysan — Champs d'Astrub ──────────────────
item.sac_paysan = {
    id: 'sac_paysan',
    name: 'Sac du Paysan',
    image: 'img/items/panoplies/sac_paysan.png',
    type: 'equipment',
    slot: 'cape',
    set: 'paysan',
    rarity: 'common',
    levelMax: 20,
    stats: [
        { stat: 'atk', value: 14 },
        { stat: 'spd', value: 2 }],
    description: "Ce sac très en vogue chez les jeunes écoliers, est idéal pour entreposer des farines animales et végétales."
}
item.chapeau_paysan = {
    id: 'chapeau_paysan',
    name: 'Bob du Paysan',
    image: 'img/items/panoplies/chapeau_paysan.png',
    type: 'equipment',
    slot: 'coiffe',
    set: 'paysan',
    rarity: 'common',
    levelMax: 20,
    stats: [
        { stat: 'maxHp', value: 20 },
        { stat: 'critChance', value: 2 },],
    description: "Pour se protéger du soleil lorsque vous travaillez dans les champs et que vous êtes pauvre, rien de mieux que le célèbre Bob du Paysan."
}
item.bottes_paysan = {
    id: 'bottes_paysan',
    name: 'Bottes Paysannes',
    image: 'img/items/panoplies/bottes_paysan.png',
    type: 'equipment',
    slot: 'bottes',
    set: 'paysan',
    rarity: 'common',
    levelMax: 20,
    stats: [
        { stat: 'maxHp', value: 14 },
        { stat: 'atk', value: 7 }],
    description: "Ces bottes sont rembourrées avec de la paille de blé, ce qui permet d'absorber la transpiration et de cultiver des champignons toxiques à moindre frais."
}
item.anneau_paysan = {
    id: 'anneau_paysan',
    name: 'Mitaines Mitées du Paysan',
    image: 'img/items/panoplies/anneau_paysan.png',
    type: 'equipment',
    slot: 'anneau',
    set: 'paysan',
    rarity: 'common',
    levelMax: 20,
    stats: [
        { stat: 'maxHp', value: -40 },
        { stat: 'spd', value: 3 }],
    description: "Elles disposent d'une face abrasive, idéale pour frotter le derrière des Bouftous, ou celui de votre épouse."
}
item.amulette_paysan = {
    id: 'amulette_paysan',
    name: 'Amulette Paysanne',
    image: 'img/items/panoplies/amulette_paysan.png',
    type: 'equipment',
    slot: 'amulette',
    set: 'paysan',
    rarity: 'common',
    levelMax: 20,
    stats: [
        { stat: 'atk', value: 10 },
        { stat: 'flatDamage', value: 1 },
        { stat: 'spd', value: 2 }],
    description: "Cette amulette est parfumée à l'huile de Tournesol Sauvage et aux fines herbes. Elle peut donc servir d'appât pour les ruminants dangereux que vous voudrez piéger, comme les Bouftous, ou les belles-mères par exemple."
}
item.ceinture_paysan = {
    id: 'ceinture_paysan',
    name: 'Ceinturemuda du Paysan',
    image: 'img/items/panoplies/ceinture_paysan.png',
    type: 'equipment',
    slot: 'ceinture',
    set: 'paysan',
    rarity: 'common',
    levelMax: 20,
    stats: [
        { stat: 'maxHp', value: 14 },
        { stat: 'atk', value: 14 }],
    description: "Cette ceinture est franchement exceptionnelle, puisqu'un bermuda en fibre de lin y est attaché."
}
item.faux_paysan = {
    id: 'faux_paysan',
    name: 'Faux usée du Paysan',
    image: 'img/items/panoplies/faux_paysan.png',
    type: 'equipment',
    slot: 'arme',
    set: 'paysan',
    rarity: 'common',
    levelMax: 20,
    stats: [
        { stat: 'maxHp', value: 14 },
        { stat: 'flatDamage', value: 14 },
        { stat: 'critChance', value: 1 }],
    description: "Cette faux robuste mais abîmée a déjà beaucoup servi et coupe assez mal. En revanche, elle est très utile pour lutter contre les varices de vos adversaires."
}
// #endregion


// ────────────────────────────────────────────────────────────────────────
// ─────────────────── ITEMS ACCESOIRES ──────────────────────
// ────────────────────────────────────────────────────────────────────────


