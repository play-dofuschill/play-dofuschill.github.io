// engine/shop.js

const SHOP_KEY_PRICE     = 1
const SHOP_ROTATION_DAYS = 1
const OGRINE_ITEM_PRICE  = 1 // valeur de repli si un item sans_panoplie n'a pas de ogrinePrice défini

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

// Un trophée est "possédé" dès qu'il est dans l'inventaire, qu'il vienne d'un
// achat en boutique ou d'un drop en combat (les deux passent par addToInventory).
function _ownsTrophy(itemId) {
    return (state.inventory[itemId]?.count || 0) > 0
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

// Clés des donjons liés aux zones sauvages actuellement tirées (pool bi-journalier).
function _wildLinkedKeyIds() {
    if (typeof refreshDailyPools === 'function') refreshDailyPools()
    const dungeonIds = typeof getDailyDungeons === 'function' ? getDailyDungeons() : []
    const ids = []
    for (const dungeonId of dungeonIds) {
        const keyId = areas[dungeonId]?.keyId
        if (keyId && item[keyId] && !ids.includes(keyId)) ids.push(keyId)
    }
    return ids
}

// ─── Catalogue "Items" groupé par zone du jour ───────────────────────────────
// Zones sauvages tirées aujourd'hui + leur donjon associé + les raids normaux
// du jour. Un même item n'apparaît qu'une fois (dans la première zone où il
// est croisé), même s'il est droppable à plusieurs endroits.

function _equipmentDropsOf(area, seen) {
    if (!area?.lootTable) return []
    const ids = []
    for (const entry of area.lootTable) {
        if (!entry) continue
        const itm = item[entry.itemId]
        if (!itm || itm.type !== 'equipment' || itm.slot === 'accessoire') continue
        if (seen.has(entry.itemId)) continue
        seen.add(entry.itemId)
        ids.push(entry.itemId)
    }
    return ids
}

// Le donjon associé à une zone sauvage est celui dont la clé est droppée par cette zone.
function _dungeonForZone(zone) {
    const keyDrop = (zone.lootTable || []).find(e => e?.isKey)
    if (!keyDrop) return null
    return Object.values(areas).find(a => (a.type === 'dungeon' || a.type === 'saisonnier') && a.keyId === keyDrop.itemId) || null
}

function getShopItemGroups() {
    if (typeof refreshDailyPools === 'function') refreshDailyPools()

    const groups = []
    const seen   = new Set()

    for (const zoneId of (state.dailyPool?.zones || [])) {
        const zone = areas[zoneId]
        if (!zone) continue

        const zoneItems = _equipmentDropsOf(zone, seen)
        if (zoneItems.length) groups.push({ zoneId: zone.id, label: zone.name, itemIds: zoneItems })

        const dungeon = _dungeonForZone(zone)
        if (dungeon) {
            const dungeonItems = _equipmentDropsOf(dungeon, seen)
            if (dungeonItems.length) groups.push({ zoneId: dungeon.id, label: dungeon.name, itemIds: dungeonItems })
        }
    }

    for (const raidId of (state.raidPool?.zones || [])) {
        const raid = areas[raidId]
        if (!raid) continue
        const raidItems = _equipmentDropsOf(raid, seen)
        if (raidItems.length) groups.push({ zoneId: raid.id, label: raid.name, itemIds: raidItems })
    }

    return groups
}

// Nombre d'items tirés par slot et par rotation dans l'onglet Ogrines, pondéré
// selon la taille du pool de chaque slot (les slots avec beaucoup d'items en
// récupèrent plus, pour égaliser le pire cas d'attente entre slots).
const OGRINE_SLOT_ALLOCATION = { arme: 6, bouclier: 3, coiffe: 3, bottes: 2, cape: 2, anneau: 2, ceinture: 1, amulette: 1 }

function _ogrinePoolIdsBySlot() {
    const bySlot = {}
    for (const i of Object.values(item)) {
        if (i.set === 'sans_panoplie' && i.ogrinePrice != null) {
            (bySlot[i.slot] = bySlot[i.slot] || []).push(i.id)
        }
    }
    return bySlot
}

// Tire `count` ids dans le sac tournant d'un slot : on parcourt une permutation
// sans répétition, et on ne reshuffle qu'une fois le sac épuisé. Contrairement à
// un tirage purement aléatoire à chaque rotation, ça borne le pire cas d'attente
// pour un item donné à la taille du pool de son slot (pas d'attente infinie par malchance).
function _drawFromSlotBag(bags, slot, poolIds, count, seedBase) {
    let bag = bags[slot]
    if (!bag || bag.order.length !== poolIds.length || !poolIds.every(id => bag.order.includes(id))) {
        bag = { order: _seededShuffle(poolIds, _dateSeed(seedBase + slot)), index: 0 }
    }
    const picked = []
    for (let n = 0; n < count && bag.order.length > 0; n++) {
        if (bag.index >= bag.order.length) {
            bag.order = _seededShuffle(bag.order, _dateSeed(seedBase + slot + bag.index))
            bag.index = 0
        }
        picked.push(bag.order[bag.index])
        bag.index++
    }
    bags[slot] = bag
    return picked
}

function refreshShopPool() {
    const period     = _shopPeriod()
    const keysPeriod = typeof _periodStr === 'function' ? _periodStr() : String(period)

    const itemsStale   = state.shopPool?.period !== period
    const keysStale    = state.shopPool?.keysPeriod !== keysPeriod
    const ogrinesStale = state.shopPool?.ogrinePeriod !== keysPeriod
    if (!itemsStale && !keysStale && !ogrinesStale) return

    if (!state.shopPool) state.shopPool = {}

    if (itemsStale) {
        const seed     = (period * 2654435761) >>> 0

        const allRunes = Object.values(item).filter(i => i.type === 'rune')
        const allSkins = Object.values(item).filter(i => i.type === 'cosmetic_skin')

        state.shopPool.period = period
        state.shopPool.runes = _seededShuffle(allRunes, seed ^ 0x2222 ).slice(0, 5 ).map(i => i.id)
        state.shopPool.skins = _seededShuffle(allSkins, seed ^ 0x3333 ).slice(0, 5 ).map(i => i.id)

        if (!state.shopPurchases || state.shopPurchases.period !== period) {
            state.shopPurchases = { period, counts: {} }
        }
    }

    if (keysStale) {
        state.shopPool.keysPeriod = keysPeriod
        state.shopPool.keys       = _wildLinkedKeyIds()
    }

    // Onglet Ogrines : rotation bi-journalière indépendante (même cadence que
    // les clés de donjon), sur les équipements "hors panoplie", via un sac
    // tournant par slot (cf. OGRINE_SLOT_ALLOCATION et _drawFromSlotBag).
    if (ogrinesStale) {
        const bySlot = _ogrinePoolIdsBySlot()
        if (!state.shopPool.ogrineBags) state.shopPool.ogrineBags = {}
        let picked = []
        for (const [slot, count] of Object.entries(OGRINE_SLOT_ALLOCATION)) {
            picked = picked.concat(_drawFromSlotBag(state.shopPool.ogrineBags, slot, bySlot[slot] || [], count, keysPeriod))
        }
        state.shopPool.ogrinePeriod = keysPeriod
        state.shopPool.ogrineItems  = picked
    }

    saveGame()
}

function getShopEntries(cat) {
    refreshShopPool()
    const pool = state.shopPool

    switch (cat) {
        case 'items':
            return getShopItemGroups().flatMap(g => g.itemIds).map(id => ({ itemId: id, price: shopCurrentPrice(id) }))

        case 'consumables': {
            const keys = pool.keys.map(id => ({ itemId: id, price: SHOP_KEY_PRICE }))
            return [...keys, { itemId: 'piloteAutomatique', price: 5 }]
        }

        case 'runes':
            return pool.runes.map(id => ({ itemId: id, price: _runePrice(id) }))

        case 'cosmetics':
            return pool.skins.map(id => ({ itemId: id, price: item[id]?.price ?? 100 }))

        case 'trophees':
            return Object.values(item)
                .filter(i => i.trophy && !_ownsTrophy(i.id))
                .sort((a, b) => a.id.localeCompare(b.id))
                .map(i => ({ itemId: i.id, price: 10 }))

        case 'ogrines':
            return (pool.ogrineItems || [])
                .map(id => ({ itemId: id, price: item[id]?.ogrinePrice ?? OGRINE_ITEM_PRICE }))
                .sort((a, b) => a.price - b.price)

        default:
            return []
    }
}

function nextShopRotationLabel(cat) {
    if ((cat === 'items' || cat === 'consumables' || cat === 'ogrines') && typeof nextWildRefreshLabel === 'function') return nextWildRefreshLabel()

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

    if (itm?.trophy) {
        if (_ownsTrophy(itemId)) {
            showNotification('Vous possédez déjà ce trophée !', 'info')
            return
        }
        if (state.kamas < price) {
            showNotification('Pas assez de kamas !', 'error')
            return
        }
        state.kamas -= price
        addToInventory(itemId)
        saveGame()
        updateKamasDisplay()
        const el = document.getElementById('shop-kamas-amount')
        if (el) el.textContent = state.kamas
        updateShopUI()
        showNotification(`${itm.name} obtenu !`, 'info')
        return
    }

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

// ─── Achat en Ogrines (onglet "sans panoplie", prix fixe, pas de stock limité) ─

function buyOgrineShopItem(itemId, price, qty = 1) {
    const itm = item[itemId]
    if (!itm) return

    const currentLevel = state.inventory[itemId]?.level || 0
    const isMaxed       = itm.itemLevelMax && currentLevel >= itm.itemLevelMax
    if (isMaxed) {
        showNotification(`${itm.name} est déjà au niveau maximum !`, 'info')
        return
    }

    const total = price * qty
    if ((state.ogrines || 0) < total) {
        showNotification('Pas assez d\'ogrines !', 'error')
        return
    }

    state.ogrines -= total
    for (let i = 0; i < qty; i++) addToInventory(itemId)
    saveGame()
    const el = document.getElementById('shop-ogrines-amount')
    if (el) el.textContent = state.ogrines
    updateShopUI()
    const name = itm.name || itemId
    showNotification(qty > 1 ? `${qty}× ${name} achetés !` : `${name} acheté !`, 'info')
}
