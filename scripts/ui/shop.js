// ui/shop.js — Interface du shop DofusChill

let shopFilter = 'items'

const SHOP_TAB_LABELS = {
    items:       'Items',
    consumables: 'Consommables',
    runes:       'Runes',
    cosmetics:   'Cosmétiques'
}

function setShopFilter(cat) {
    shopFilter = cat
    updateShopUI()
}

function updateShopUI() {
    const list    = document.getElementById('shop-list')
    const kamasEl = document.getElementById('shop-kamas-amount')
    if (!list) return

    if (kamasEl) kamasEl.textContent = state.kamas

    document.querySelectorAll('.shop-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.cat === shopFilter)
    })

    list.innerHTML = ''

    const banner = document.createElement('div')
    banner.className = 'shop-rotation-banner'
    banner.textContent = `Rotation dans ${nextShopRotationLabel()}`
    list.appendChild(banner)

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

function showShopBuyPicker(entry, itm) {
    const isProgressive = itm.type === 'equipment'

    let maxAffordable
    if (isProgressive) {
        maxAffordable = 0
        while (_progressiveTotalCost(entry.itemId, maxAffordable + 1) <= state.kamas) {
            maxAffordable++
            if (maxAffordable >= 100) break
        }
    } else {
        maxAffordable = Math.floor(state.kamas / entry.price)
    }

    if (maxAffordable === 0) {
        showNotification('Pas assez de kamas !', 'error')
        return
    }

    const currentLevel = state.inventory[entry.itemId]?.level || 0
    const maxUseful    = itm.itemLevelMax ? Math.max(0, itm.itemLevelMax - currentLevel) : maxAffordable
    const remaining    = shopRemaining(entry.itemId)
    const maxQty       = Math.min(
        maxAffordable,
        maxUseful,
        remaining === Infinity ? maxAffordable : remaining
    )

    if (maxQty <= 0) {
        showNotification('Pas assez de kamas !', 'error')
        return
    }

    const fixedQtys = [1, 2, 5, 10].filter(q => q < maxQty)

    const btnLabel = q => isProgressive
        ? `${q}<br><small>${_progressiveTotalCost(entry.itemId, q)}k</small>`
        : `${q}`

    const maxTotal   = isProgressive ? _progressiveTotalCost(entry.itemId, maxQty) : maxQty * entry.price
    const priceNote  = isProgressive
        ? `${entry.price} kamas (prix actuel, +20% par achat)`
        : `${entry.price} kamas / unité`

    const body = `<div class="shop-buy-picker">
        <div class="shop-buy-picker-item">
            <img src="${itm.image || 'img/icons/icon.png'}" onerror="this.src='img/icons/icon.png'">
            <span>${itm.name}</span>
        </div>
        <div class="shop-buy-qty-row">
            ${fixedQtys.map(q => `<button class="shop-buy-qty-btn" onclick="closeTooltip(); buyShopItem('${entry.itemId}', ${entry.price}, ${q})">${btnLabel(q)}</button>`).join('')}
            <button class="shop-buy-qty-btn shop-buy-qty-max" onclick="closeTooltip(); buyShopItem('${entry.itemId}', ${entry.price}, ${maxQty})">
                Max<br><small>${maxQty}×&nbsp;(${maxTotal}k)</small>
            </button>
        </div>
        <div class="shop-buy-picker-price">
            <img src="img/icons/kamas.png" onerror="this.src='img/icons/icon.png'">
            ${priceNote} &nbsp;·&nbsp; ${state.kamas} disponibles
        </div>
    </div>`

    openTooltip(`Acheter — ${itm.name}`, body)
}
