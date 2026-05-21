// shopDictionary.js — Articles du shop DofusChill (consommables, cosmétiques, divers)
// Les équipements et dofus/trophées restent dans itemDictionary.js.
// Les entrées ici s'ajoutent au même objet `item` global.

// ─── Consommables ─────────────────────────────────────────────────────────────

item.potionDeVie = {
    id: 'potionDeVie',
    name: 'Potion de Vie',
    image: 'img/items/consommables/potion_vie.png',
    type: 'consumable',
    description: "Restaure une quantité de PV à un personnage hors combat."
}

// ─── Cosmétiques (non-skin) ───────────────────────────────────────────────────

item.banniereDoree = {
    id: 'banniereDoree',
    name: "a terminer d'implanter",
    image: 'img/items/cosmetiques/banniere_doree.png',
    type: 'cosmetic',
    description: "Orne l'écran de combat d'une bannière aux reflets dorés."
}

// ─── Cosmétiques de classe (skins) ────────────────────────────────────────────
// type: 'cosmetic_skin'  →  achat unique, débloque un skin dans le picker
// classId : la classe concernée
// image   : chemin vers la version _Male.png (le suffixe Female est géré auto)
// price   : prix en kamas (utilisé dans le picker et la boutique)

// Exemple — à remplacer par tes vrais skins :
// item.iop_skin_demo = {
//     id: 'iop_skin_demo',
//     name: 'Iop Alternatif',
//     image: 'img/classes/skin/Iop_Male.png',  // ← doit exister en _Male et _Female
//     type: 'cosmetic_skin',
//     classId: 'iop',
//     price: 100,
//     description: 'Apparence alternative pour le Iop.'
// }
// item.cra_skin_archer = {
//     id: 'cra_skin_archer',
//     name: 'Cra Forestier',
//     image: 'img/classes/skin/Cra_Forestier_Male.png',  // ← doit exister en _Male et _Female
//     type: 'cosmetic_skin',
//     classId: 'cra',
//     price: 100,
//     description: 'Tenue de chasseur des bois.'
// }
