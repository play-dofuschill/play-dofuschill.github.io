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

item.potionDeMana = {
    id: 'potionDeMana',
    name: 'Potion de Mana',
    image: 'img/items/consommables/potion_mana.png',
    type: 'consumable',
    description: "Réduit le délai de rechargement des sorts. Usage unique."
}

item.elixirDeForce = {
    id: 'elixirDeForce',
    name: "Élixir de Force",
    image: 'img/items/consommables/elixir_force.png',
    type: 'consumable',
    description: "Augmente temporairement l'ATK d'un personnage pendant un combat."
}

// ─── Cosmétiques ──────────────────────────────────────────────────────────────

item.banniereDoree = {
    id: 'banniereDoree',
    name: "a terminer d'implanter",
    image: 'img/items/cosmetiques/banniere_doree.png',
    type: 'cosmetic',
    description: "Orne l'écran de combat d'une bannière aux reflets dorés."
}

