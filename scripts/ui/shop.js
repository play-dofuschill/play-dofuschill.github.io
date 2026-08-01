// ui/shop.js — Interface du shop DofusChill

let shopFilter = 'items'

const SHOP_TAB_LABELS = {
    items:       'Items',
    consumables: 'Consommables',
    runes:       'Runes',
    cosmetics:   'Cosmétiques',
    trophees:    'Trophées',
    ogrines:     'Ogrines'
}

function setShopFilter(cat) {
    shopFilter = cat
    updateShopUI()
}

function _hasAvailableTrophees() {
    return Object.values(item).some(i => i.trophy && !_ownsTrophy(i.id))
}

function updateShopUI() {
    const list      = document.getElementById('shop-list')
    const kamasEl   = document.getElementById('shop-kamas-amount')
    const ogrinesEl = document.getElementById('shop-ogrines-amount')
    if (!list) return

    if (kamasEl)   kamasEl.textContent   = state.kamas
    if (ogrinesEl) ogrinesEl.textContent = state.ogrines || 0

    const trophyTabVisible = _hasAvailableTrophees()
    const trophyTab = document.querySelector('.shop-tab[data-cat="trophees"]')
    if (trophyTab) trophyTab.style.display = trophyTabVisible ? '' : 'none'
    if (shopFilter === 'trophees' && !trophyTabVisible) shopFilter = 'items'

    document.querySelectorAll('.shop-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.cat === shopFilter)
    })

    list.innerHTML = ''

    const banner = document.createElement('div')
    banner.className = 'shop-rotation-banner'
    banner.textContent = `Rotation dans ${nextShopRotationLabel(shopFilter)}`
    list.appendChild(banner)

    if (shopFilter === 'items') {
        renderShopItemGroups(list)
        return
    }

    const entries = getShopEntries(shopFilter)

    if (entries.length === 0) {
        const empty = document.createElement('div')
        empty.className = 'shop-empty'
        const hasVisited = (state.visitedAreas || []).length > 0
        empty.innerHTML = hasVisited
            ? 'Aucun article disponible.<br>Revenez bientôt !'
            : 'Combattez dans des zones pour débloquer des articles !'
        list.appendChild(empty)
        return
    }

    for (const entry of entries) {
        const itm = item[entry.itemId]
        if (!itm) continue

        // ── Onglet Ogrines : équipements "sans panoplie", monnaie dédiée ──
        if (shopFilter === 'ogrines') {
            const currentLevel = state.inventory[entry.itemId]?.level || 0
            const isMaxed      = itm.itemLevelMax && currentLevel >= itm.itemLevelMax
            const canAfford    = (state.ogrines || 0) >= entry.price
            const isDisabled   = isMaxed || !canAfford

            const card = document.createElement('div')
            card.className = `shop-card${isMaxed ? ' shop-card-maxed' : (!canAfford ? ' shop-card-disabled' : '')}`
            card.innerHTML = `
                <div class="shop-card-bubble">
                    <img src="${itm.image || 'img/icons/icon.png'}" onerror="this.src='img/icons/icon.png'">
                </div>
                <div class="shop-card-info">
                    <span class="shop-card-name">${itm.name}${isMaxed ? '<span class="shop-card-max-badge">MAX</span>' : ''}</span>
                    ${itm.description ? `<span class="shop-card-desc">${itm.description}</span>` : ''}
                </div>
                <div class="shop-card-price${canAfford && !isMaxed ? '' : ' shop-price-unaffordable'}">
                    <img src="img/icons/ogrine.png" onerror="this.src='img/icons/icon.png'" class="shop-kamas-icon">
                    <span>${entry.price}</span>
                </div>`

            if (!isDisabled) {
                card.addEventListener('click', () => showOgrineShopBuyPicker(entry, itm))
            }
            card.addEventListener('contextmenu', e => { e.preventDefault(); showItemTooltip(entry.itemId) })
            list.appendChild(card)
            continue
        }

        // ── Skin cosmétique : achat unique ─────────────────────────────
        if (itm.type === 'cosmetic_skin') {
            const owned     = (state.ownedSkins || []).includes(entry.itemId)
            const canAfford = state.kamas >= entry.price
            const card = document.createElement('div')
            card.className = `shop-card${owned ? ' shop-card-maxed' : (!canAfford ? ' shop-card-disabled' : '')}`
            card.innerHTML = `
                <div class="shop-card-bubble">
                    <img src="${itm.image || 'img/icons/icon.png'}" onerror="this.src='img/icons/icon.png'">
                </div>
                <div class="shop-card-info">
                    <span class="shop-card-name">${itm.name}${owned ? '<span class="shop-card-max-badge">Possédé</span>' : ''}</span>
                    ${itm.description ? `<span class="shop-card-desc">${itm.description}</span>` : ''}
                </div>
                <div class="shop-card-price${canAfford || owned ? '' : ' shop-price-unaffordable'}">
                    ${owned
                        ? `<span style="font-size:0.75rem;opacity:0.5;">✔</span>`
                        : `<img src="img/icons/kamas.png" onerror="this.src='img/icons/icon.png'" class="shop-kamas-icon"><span>${entry.price}</span>`}
                </div>`
            if (!owned) card.addEventListener('click', () => buyShopItem(entry.itemId, entry.price))
            card.addEventListener('contextmenu', e => { e.preventDefault(); showItemTooltip(entry.itemId) })
            list.appendChild(card)
            continue
        }

        // ── Trophée : achat unique permanent ──────────────────────────────
        if (itm.trophy) {
            const owned     = _ownsTrophy(entry.itemId)
            const canAfford = state.kamas >= entry.price
            const card = document.createElement('div')
            card.className = `shop-card${owned ? ' shop-card-maxed' : (!canAfford ? ' shop-card-disabled' : '')}`
            card.innerHTML = `
                <div class="shop-card-bubble">
                    <img src="${itm.image || 'img/icons/icon.png'}" onerror="this.src='img/icons/icon.png'">
                </div>
                <div class="shop-card-info">
                    <span class="shop-card-name">${itm.name}${owned ? '<span class="shop-card-max-badge">Possédé</span>' : ''}</span>
                    ${itm.description ? `<span class="shop-card-desc">${itm.description}</span>` : ''}
                </div>
                <div class="shop-card-price${canAfford || owned ? '' : ' shop-price-unaffordable'}">
                    ${owned
                        ? `<span style="font-size:0.75rem;opacity:0.5;">✔</span>`
                        : `<img src="img/icons/kamas.png" onerror="this.src='img/icons/icon.png'" class="shop-kamas-icon"><span>${entry.price}</span>`}
                </div>`
            if (!owned) card.addEventListener('click', () => buyShopItem(entry.itemId, entry.price))
            card.addEventListener('contextmenu', e => { e.preventDefault(); showItemTooltip(entry.itemId) })
            list.appendChild(card)
            continue
        }

        // ── Item avec limite de stock ───────────────────────────────────
        const limit     = _shopItemLimit(entry.itemId)
        const remaining = shopRemaining(entry.itemId)
        const hasLimit  = limit !== Infinity
        const soldOut   = hasLimit && remaining === 0

        const currentLevel = state.inventory[entry.itemId]?.level || 0
        const isMaxed      = itm.itemLevelMax && currentLevel >= itm.itemLevelMax
        const canAfford    = state.kamas >= entry.price
        const isDisabled   = soldOut || isMaxed || !canAfford

        const stockBadge = hasLimit
            ? `<span class="shop-stock-badge${remaining === 0 ? ' shop-stock-empty' : ''}">${remaining}/${limit}</span>`
            : ''

        const card = document.createElement('div')
        card.className = `shop-card${(soldOut || isMaxed) ? ' shop-card-maxed' : (!canAfford ? ' shop-card-disabled' : '')}`
        card.innerHTML = `
            <div class="shop-card-bubble">
                <img src="${itm.image || 'img/icons/icon.png'}" onerror="this.src='img/icons/icon.png'">
            </div>
            <div class="shop-card-info">
                <span class="shop-card-name">${itm.name}${isMaxed ? '<span class="shop-card-max-badge">MAX</span>' : ''}${soldOut ? '<span class="shop-card-max-badge">Épuisé</span>' : ''}</span>
                ${itm.description ? `<span class="shop-card-desc">${itm.description}</span>` : ''}
            </div>
            <div class="shop-card-price${canAfford && !soldOut ? '' : ' shop-price-unaffordable'}">
                ${stockBadge}
                <img src="img/icons/kamas.png" onerror="this.src='img/icons/icon.png'" class="shop-kamas-icon">
                <span>${entry.price}</span>
            </div>`

        if (!isDisabled) {
            card.addEventListener('click', () => showShopBuyPicker(entry, itm))
        }
        card.addEventListener('contextmenu', e => {
            e.preventDefault()
            showItemTooltip(entry.itemId)
        })
        list.appendChild(card)
    }
}

// ── Onglet Items : catalogue en bulles, groupé par zone du jour ────────────
// (zones sauvages du moment + leur donjon associé + les raids normaux du jour)

function renderShopItemGroups(list) {
    const groups = getShopItemGroups()

    if (groups.length === 0) {
        const empty = document.createElement('div')
        empty.className = 'shop-empty'
        const hasVisited = (state.visitedAreas || []).length > 0
        empty.innerHTML = hasVisited
            ? 'Aucun article disponible.<br>Revenez bientôt !'
            : 'Combattez dans des zones pour débloquer des articles !'
        list.appendChild(empty)
        return
    }

    for (const group of groups) {
        const section = document.createElement('div')
        section.className = 'shop-zone-group'

        const title = document.createElement('div')
        title.className = 'shop-zone-title'
        title.textContent = group.label
        section.appendChild(title)

        const bubbles = document.createElement('div')
        bubbles.className = 'shop-zone-bubbles'
        for (const itemId of group.itemIds) bubbles.appendChild(_buildShopItemBubble(itemId))
        section.appendChild(bubbles)

        list.appendChild(section)
    }
}

function _buildShopItemBubble(itemId) {
    const itm = item[itemId]

    const price     = shopCurrentPrice(itemId)
    const limit     = _shopItemLimit(itemId)
    const remaining = shopRemaining(itemId)
    const hasLimit  = limit !== Infinity
    const soldOut   = hasLimit && remaining === 0

    const currentLevel = state.inventory[itemId]?.level || 0
    const isMaxed       = itm.itemLevelMax && currentLevel >= itm.itemLevelMax
    const canAfford      = state.kamas >= price
    const isDisabled     = soldOut || isMaxed || !canAfford

    const topBadge = soldOut
        ? `<span class="bubble-level shop-bubble-empty">Épuisé</span>`
        : isMaxed
            ? `<span class="bubble-level shop-bubble-maxed">MAX</span>`
            : hasLimit ? `<span class="bubble-level">${remaining}/${limit}</span>` : ''

    const bubble = document.createElement('div')
    bubble.className = `game-bubble shop-item-bubble${isDisabled ? ' shop-bubble-disabled' : ''}`
    bubble.title     = itm.name
    bubble.innerHTML = `
        ${topBadge}
        <img src="${itm.image || 'img/icons/icon.png'}" loading="lazy" onerror="this.src='img/icons/icon.png'">
        <span class="shop-bubble-price"><img src="img/icons/kamas.png" onerror="this.src='img/icons/icon.png'">${price}</span>`

    if (!isDisabled) bubble.addEventListener('click', () => showShopBuyPicker({ itemId, price }, itm))
    bubble.addEventListener('contextmenu', e => { e.preventDefault(); e.stopPropagation(); showItemTooltip(itemId) })
    return bubble
}

// Contexte du picker d'achat "kamas" actuellement ouvert (permet aux boutons de
// quantité de rafraîchir le popup en place au lieu de le fermer à chaque clic).
let _shopPickerCtx = null

function _shopBuyPickerState(ctx) {
    const itm = item[ctx.itemId]
    if (!itm) return null
    const isProgressive = itm.type === 'equipment'
    const price = isProgressive ? shopCurrentPrice(ctx.itemId) : ctx.price

    let maxAffordable
    if (isProgressive) {
        maxAffordable = 0
        while (_progressiveTotalCost(ctx.itemId, maxAffordable + 1) <= state.kamas) {
            maxAffordable++
            if (maxAffordable >= 100) break
        }
    } else {
        maxAffordable = Math.floor(state.kamas / price)
    }

    const currentLevel = state.inventory[ctx.itemId]?.level || 0
    const maxUseful     = itm.itemLevelMax ? Math.max(0, itm.itemLevelMax - currentLevel) : maxAffordable
    const remaining     = shopRemaining(ctx.itemId)
    const maxQty        = Math.min(
        maxAffordable,
        maxUseful,
        remaining === Infinity ? maxAffordable : remaining
    )

    if (maxQty <= 0) return null

    const maxTotal = isProgressive ? _progressiveTotalCost(ctx.itemId, maxQty) : maxQty * price
    return { itm, isProgressive, price, maxQty, maxTotal }
}

function _shopBuyPickerBody(ctx, st) {
    const { itm, isProgressive, price, maxQty, maxTotal } = st

    const fixedQtys = [1, 2, 5, 10, 100].filter(q => q < maxQty)

    const btnLabel = q => isProgressive
        ? `${q}<br><small>${_progressiveTotalCost(ctx.itemId, q)}k</small>`
        : `${q}`

    const priceNote = isProgressive
        ? `${price} kamas (prix actuel, +20% par achat)`
        : `${price} kamas / unité`

    const body = `<div class="shop-buy-picker">
        <div class="shop-buy-picker-item">
            <img src="${itm.image || 'img/icons/icon.png'}" onerror="this.src='img/icons/icon.png'">
            <span>${itm.name}</span>
        </div>
        <div class="shop-buy-qty-row">
            ${fixedQtys.map(q => `<button class="shop-buy-qty-btn" onclick="_shopBuyQty(${q})">${btnLabel(q)}</button>`).join('')}
            <button class="shop-buy-qty-btn shop-buy-qty-max" onclick="_confirmShopBuyMax()">
                Max<br><small>${maxQty}×&nbsp;(${maxTotal}k)</small>
            </button>
        </div>
        <div class="shop-buy-picker-price">
            <img src="img/icons/kamas.png" onerror="this.src='img/icons/icon.png'">
            ${priceNote} &nbsp;·&nbsp; ${state.kamas} disponibles
        </div>
    </div>`

    return { title: `Acheter — ${itm.name}`, body }
}

function showShopBuyPicker(entry, itm) {
    _shopPickerCtx = { itemId: entry.itemId, price: entry.price }
    const st = _shopBuyPickerState(_shopPickerCtx)
    if (!st) {
        showNotification('Pas assez de kamas !', 'error')
        _shopPickerCtx = null
        return
    }
    const { title, body } = _shopBuyPickerBody(_shopPickerCtx, st)
    openTooltip(title, body)
}

// Reconstruit le popup d'achat en place (sans empiler un nouveau niveau de
// tooltip) après un achat, pour que le popup reste ouvert entre deux clics.
function _refreshShopBuyPicker() {
    if (!_shopPickerCtx) return
    const st = _shopBuyPickerState(_shopPickerCtx)
    if (!st) { closeTooltip(); _shopPickerCtx = null; return }
    const { title, body } = _shopBuyPickerBody(_shopPickerCtx, st)
    const ttl = document.getElementById('tooltipTitle')
    const bot = document.getElementById('tooltipBottom')
    if (ttl) ttl.innerHTML = title
    if (bot) bot.innerHTML = body
    if (tooltipStack.length > 0) tooltipStack[tooltipStack.length - 1] = { title, body }
}

function _shopBuyQty(qty) {
    if (!_shopPickerCtx) return
    buyShopItem(_shopPickerCtx.itemId, _shopPickerCtx.price, qty)
    _refreshShopBuyPicker()
}

function _confirmShopBuyMax() {
    if (!_shopPickerCtx) return
    const st = _shopBuyPickerState(_shopPickerCtx)
    if (!st) return
    const body = `<div class="shop-buy-picker shop-confirm-picker">
        <p class="shop-confirm-text">Acheter <strong>${st.maxQty}× ${st.itm.name}</strong> pour <strong>${st.maxTotal} kamas</strong> ?</p>
        <div class="shop-buy-qty-row">
            <button class="shop-buy-qty-btn" onclick="closeTooltip()">Annuler</button>
            <button class="shop-buy-qty-btn shop-buy-qty-max" onclick="closeTooltip(); _shopBuyQty(${st.maxQty})">Confirmer</button>
        </div>
    </div>`
    openTooltip(`Confirmation — ${st.itm.name}`, body)
}

// Contexte du picker d'achat "ogrines" actuellement ouvert, même logique que
// _shopPickerCtx ci-dessus mais pour la monnaie ogrines.
let _ogrineShopPickerCtx = null

function _ogrineShopBuyPickerState(ctx) {
    const itm = item[ctx.itemId]
    if (!itm) return null
    const maxAffordable = Math.floor((state.ogrines || 0) / ctx.price)
    const currentLevel  = state.inventory[ctx.itemId]?.level || 0
    const maxUseful      = itm.itemLevelMax ? Math.max(0, itm.itemLevelMax - currentLevel) : maxAffordable
    const maxQty         = Math.min(maxAffordable, maxUseful)
    if (maxQty <= 0) return null
    return { itm, maxQty, maxTotal: maxQty * ctx.price }
}

function _ogrineShopBuyPickerBody(ctx, st) {
    const { itm, maxQty, maxTotal } = st
    const fixedQtys = [1, 2, 5, 10, 100].filter(q => q < maxQty)

    const body = `<div class="shop-buy-picker">
        <div class="shop-buy-picker-item">
            <img src="${itm.image || 'img/icons/icon.png'}" onerror="this.src='img/icons/icon.png'">
            <span>${itm.name}</span>
        </div>
        <div class="shop-buy-qty-row">
            ${fixedQtys.map(q => `<button class="shop-buy-qty-btn" onclick="_ogrineShopBuyQty(${q})">${q}</button>`).join('')}
            <button class="shop-buy-qty-btn shop-buy-qty-max" onclick="_confirmOgrineShopBuyMax()">
                Max<br><small>${maxQty}×&nbsp;(${maxTotal})</small>
            </button>
        </div>
        <div class="shop-buy-picker-price">
            <img src="img/icons/ogrine.png" onerror="this.src='img/icons/icon.png'">
            ${ctx.price} ogrine${ctx.price > 1 ? 's' : ''} / unité &nbsp;·&nbsp; ${state.ogrines || 0} disponibles
        </div>
    </div>`

    return { title: `Acheter — ${itm.name}`, body }
}

function showOgrineShopBuyPicker(entry, itm) {
    _ogrineShopPickerCtx = { itemId: entry.itemId, price: entry.price }
    const st = _ogrineShopBuyPickerState(_ogrineShopPickerCtx)
    if (!st) {
        showNotification('Pas assez d\'ogrines !', 'error')
        _ogrineShopPickerCtx = null
        return
    }
    const { title, body } = _ogrineShopBuyPickerBody(_ogrineShopPickerCtx, st)
    openTooltip(title, body)
}

function _refreshOgrineShopBuyPicker() {
    if (!_ogrineShopPickerCtx) return
    const st = _ogrineShopBuyPickerState(_ogrineShopPickerCtx)
    if (!st) { closeTooltip(); _ogrineShopPickerCtx = null; return }
    const { title, body } = _ogrineShopBuyPickerBody(_ogrineShopPickerCtx, st)
    const ttl = document.getElementById('tooltipTitle')
    const bot = document.getElementById('tooltipBottom')
    if (ttl) ttl.innerHTML = title
    if (bot) bot.innerHTML = body
    if (tooltipStack.length > 0) tooltipStack[tooltipStack.length - 1] = { title, body }
}

function _ogrineShopBuyQty(qty) {
    if (!_ogrineShopPickerCtx) return
    buyOgrineShopItem(_ogrineShopPickerCtx.itemId, _ogrineShopPickerCtx.price, qty)
    _refreshOgrineShopBuyPicker()
}

function _confirmOgrineShopBuyMax() {
    if (!_ogrineShopPickerCtx) return
    const st = _ogrineShopBuyPickerState(_ogrineShopPickerCtx)
    if (!st) return
    const body = `<div class="shop-buy-picker shop-confirm-picker">
        <p class="shop-confirm-text">Acheter <strong>${st.maxQty}× ${st.itm.name}</strong> pour <strong>${st.maxTotal} ogrine${st.maxTotal > 1 ? 's' : ''}</strong> ?</p>
        <div class="shop-buy-qty-row">
            <button class="shop-buy-qty-btn" onclick="closeTooltip()">Annuler</button>
            <button class="shop-buy-qty-btn shop-buy-qty-max" onclick="closeTooltip(); _ogrineShopBuyQty(${st.maxQty})">Confirmer</button>
        </div>
    </div>`
    openTooltip(`Confirmation — ${st.itm.name}`, body)
}
