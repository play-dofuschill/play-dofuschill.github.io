// shop.js — Catalogue du shop DofusChill
//
// Pour ajouter un article, ajoute une entrée dans la bonne catégorie :
//
//   SHOP_CATALOGUE.items.push({
//       itemId: 'monItem',   // clé dans itemDictionary.js
//       price:  100          // prix en kamas
//   })
//
// Catégories disponibles : items | consumables | cosmetics
// L'item doit exister dans itemDictionary.js avec le bon type :
//   type: 'equipment'  → apparaît dans Inventaire > Items
//   type: 'consumable' → apparaît dans Inventaire > Consommables
//   type: 'cosmetic'   → apparaît dans Inventaire > Cosmétiques

const SHOP_CATALOGUE = {
    items: [
        { itemId: 'chapeauAventurier', price: 20 },
        { itemId: 'bottesAventurier',  price: 20 },
        { itemId: 'capeAventurier',    price: 20 }
    ],

    consumables: [
        { itemId: 'cleDonjonKardorim',   price: 2 },
        { itemId: 'cleDonjonBouftou',  price: 2 },
        { itemId: 'piloteAutomatique', price: 5 }
    ],

    cosmetics: [
        { itemId: 'banniereDoree',  price: 100 },
        { itemId: 'iop_skin_demo',  price: 500 }
    ]
}

// ─── Achat ────────────────────────────────────────────────────────────────────

function buyShopItem(itemId, price, qty = 1) {
    const itm = item[itemId]

    // Achat unique pour les skins (cosmetic_skin)
    if (itm?.type === 'cosmetic_skin') {
        if ((state.ownedSkins || []).includes(itemId)) {
            showNotification('Vous possédez déjà ce skin !', 'info')
            return
        }
        if (state.kamas < price) {
            showNotification('Pas assez de kamas !', 'error')
            return
        }
        state.kamas -= price
        if (!state.ownedSkins) state.ownedSkins = []
        state.ownedSkins.push(itemId)
        saveGame()
        updateKamasDisplay()
        const el = document.getElementById('shop-kamas-amount')
        if (el) el.textContent = state.kamas
        updateShopUI()
        showNotification(`${itm.name} débloqué !`, 'info')
        return
    }

    const total = price * qty
    if (state.kamas < total) {
        showNotification('Pas assez de kamas !', 'error')
        return
    }
    state.kamas -= total
    for (let i = 0; i < qty; i++) addToInventory(itemId)
    saveGame()
    updateKamasDisplay()
    const el = document.getElementById('shop-kamas-amount')
    if (el) el.textContent = state.kamas
    updateShopUI()
    const name = itm?.name || itemId
    showNotification(qty > 1 ? `${qty}× ${name} achetés !` : `${name} acheté !`, 'info')
}
