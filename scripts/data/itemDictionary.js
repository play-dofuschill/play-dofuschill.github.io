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

// ─── Panoplie Aventurier — Incarnam ──────────────────

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

// ─── Panoplie Kardorim — Donjon kardorim ──────────────────

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
// ─── Panoplie Bouftou — Astrub ────────────────────────

item.capeBouftou = {
    id: 'capeBouftou',
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

item.coiffeBouftou = {
    id: 'coiffeBouftou',
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

item.bottesBouftou = {
    id: 'bottesBouftou',
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

item.anneauBouftou = {
    id: 'anneauBouftou',
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

item.amuletteBouftou = {
    id: 'amuletteBouftou',
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

item.ceintureBouftou = {
    id: 'ceintureBouftou',
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

item.marteauBouftou = {
    id: 'marteauBouftou',
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

item.bouclierBouftou = {
    id: 'bouclierBouftou',
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