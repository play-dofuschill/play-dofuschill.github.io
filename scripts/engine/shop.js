// engine/shop.js

const SHOP_KEY_PRICE     = 1
const SHOP_ROTATION_DAYS = 2

const SHOP_RUNE_BASE_PRICES = { S: 10, M: 15, L: 25 }

const SHOP_ITEM_LEVEL_PRICES = [
    { maxLevel: 50,  price: 5   },
    { maxLevel: 100, price: 15  },
    { maxLevel: 150, price: 50  },
    { maxLevel: 200, price: 100 },
]

function _itemBasePrice(itemId) {
    const itm = item[itemId]
    if (!itm) return 5
    const lvl = itm.requiredLevel || 1
    for (const tier of SHOP_ITEM_LEVEL_PRICES) {
        if (lvl <= tier.maxLevel) return tier.price
    }
    return 100
}

function shopCurrentPrice(itemId) {
    const base = _itemBasePrice(itemId)
    if (item[itemId]?.type !== 'equipment') return base
    const purchased = state.shopPurchases?.counts?.[itemId] || 0
    return purchased === 0 ? base : Math.round(base * Math.pow(1.2, purchased))
}

function _progressiveTotalCost(itemId, qty) {
    const base = _itemBasePrice(itemId)
    if (item[itemId]?.type !== 'equipment') return base * qty
    const purchased = state.shopPurchases?.counts?.[itemId] || 0
    let total = 0
    for (let i = 0; i < qty; i++) {
        total += Math.round(base * Math.pow(1.2, purchased + i))
    }
    return total
}

function _runePrice(runeId) {
    const itm  = item[runeId]
    if (!itm || itm.type !== 'rune') return 10
    const size      = runeId.slice(-1).toUpperCase()
    const basePrice = SHOP_RUNE_BASE_PRICES[size] || 10
    if (!itm.transcendance) return basePrice
    const normalId   = runeId.replace('Trans', '')
    const normalRune = item[normalId]
    return (normalRune?.fusionCost || 5) * basePrice
}

// ─── Pool de rotation ─────────────────────────────────────────────────────────

function _shopPeriod() {
    return Math.floor(Math.floor(Date.now() / 86400000) / SHOP_ROTATION_DAYS)
}

function refreshShopPool() {
    const period = _shopPeriod()
    if (state.shopPool?.period === period) return

    const seed = (period * 2654435761) >>> 0

    const allItems = Object.values(item).filter(i => i.type === 'equipment' && i.slot !== 'accessoire')
    const allKeys  = Object.values(item).filter(i => i.isKey === true)
    const allRunes = Object.values(item).filter(i => i.type === 'rune')
    const allSkins = Object.values(item).filter(i => i.type === 'cosmetic_skin')

    state.shopPool = {
        period,
        items: _seededShuffle(allItems, seed          ).slice(0, 10).map(i => i.id),
        keys:  _seededShuffle(allKeys,  seed ^ 0x1111 ).slice(0, 5 ).map(i => i.id),
        runes: _seededShuffle(allRunes, seed ^ 0x2222 ).slice(0, 5 ).map(i => i.id),
        skins: _seededShuffle(allSkins, seed ^ 0x3333 ).slice(0, 5 ).map(i => i.id),
    }
    state.shopPurchases = { period, counts: {} }
    saveGame()
}

function getShopEntries(cat) {
    refreshShopPool()
    const pool = state.shopPool

    switch (cat) {
        case 'items':
            return pool.items.map(id => ({ itemId: id, price: shopCurrentPrice(id) }))

        case 'consumables': {
            const keys = pool.keys.map(id => ({ itemId: id, price: SHOP_KEY_PRICE }))
            return [...keys, { itemId: 'piloteAutomatique', price: 5 }]
        }

        case 'runes':
            return pool.runes.map(id => ({ itemId: id, price: _runePrice(id) }))

        case 'cosmetics':
            return pool.skins.map(id => ({ itemId: id, price: item[id]?.price ?? 100 }))

        default:
            return []
    }
}

function nextShopRotationLabel() {
    const nextMs = (_shopPeriod() + 1) * SHOP_ROTATION_DAYS * 86400000
    const secs   = Math.max(0, Math.floor((nextMs - Date.now()) / 1000))
    const h = Math.floor(secs / 3600)
    const m = Math.floor((secs % 3600) / 60)
    if (h >= 24) return `${Math.ceil(h / 24)} jour${Math.ceil(h / 24) > 1 ? 's' : ''}`
    if (h > 0)   return `${h}h${m > 0 ? ` ${m}min` : ''}`
    if (m > 0)   return `${m} min`
    return 'bientôt'
}

// ─── Limites de stock par rotation ───────────────────────────────────────────

function _shopItemLimit(itemId) {
    const itm = item[itemId]
    if (!itm)                return Infinity
    if (itm.type === 'equipment') return 5
    if (itm.isKey)           return Infinity
    if (itm.type === 'rune') return itm.transcendance ? 1 : 2
    return Infinity
}

function shopRemaining(itemId) {
    const limit = _shopItemLimit(itemId)
    if (limit === Infinity) return Infinity
    const period = _shopPeriod()
    if (!state.shopPurchases || state.shopPurchases.period !== period) return limit
    return Math.max(0, limit - (state.shopPurchases.counts?.[itemId] || 0))
}

function _recordPurchase(itemId, qty) {
    const period = _shopPeriod()
    if (!state.shopPurchases || state.shopPurchases.period !== period) {
        state.shopPurchases = { period, counts: {} }
    }
    state.shopPurchases.counts[itemId] = (state.shopPurchases.counts[itemId] || 0) + qty
}

// ─── Achat ────────────────────────────────────────────────────────────────────

function buyShopItem(itemId, price, qty = 1) {
    const itm = item[itemId]

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

    const remaining = shopRemaining(itemId)
    if (remaining === 0) {
        showNotification('Stock épuisé pour cette rotation !', 'error')
        return
    }
    if (remaining !== Infinity) qty = Math.min(qty, remaining)

    const total = itm?.type === 'equipment'
        ? _progressiveTotalCost(itemId, qty)
        : price * qty
    if (state.kamas < total) {
        showNotification('Pas assez de kamas !', 'error')
        return
    }
    state.kamas -= total
    for (let i = 0; i < qty; i++) addToInventory(itemId)
    if (remaining !== Infinity) _recordPurchase(itemId, qty)
    saveGame()
    updateKamasDisplay()
    const el = document.getElementById('shop-kamas-amount')
    if (el) el.textContent = state.kamas
    updateShopUI()
    const name = itm?.name || itemId
    showNotification(qty > 1 ? `${qty}× ${name} achetés !` : `${name} acheté !`, 'info')
}
