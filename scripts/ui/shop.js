// ui/shop.js — Interface du shop DofusChill

let shopFilter = 'items'

const SHOP_TAB_LABELS = {
    items:       'Items',
    consumables: 'Consommables',
    cosmetics:   'Cosmétiques'
}

function setShopFilter(cat) {
    shopFilter = cat
    updateShopUI()
}

function updateShopUI() {
    const list      = document.getElementById('shop-list')
    const kamasEl   = document.getElementById('shop-kamas-amount')
    if (!list) return

    if (kamasEl) kamasEl.textContent = state.kamas

    document.querySelectorAll('.shop-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.cat === shopFilter)
    })

    list.innerHTML = ''
    const entries = SHOP_CATALOGUE[shopFilter] || []

    if (entries.length === 0) {
        list.innerHTML = `<div class="shop-empty">Aucun article disponible.<br>Revenez bientôt !</div>`
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

        // ── Item standard ──────────────────────────────────────────────
        const currentLevel = state.inventory[entry.itemId]?.level || 0
        const isMaxed      = itm.levelMax && currentLevel >= itm.levelMax
        const canAfford    = state.kamas >= entry.price
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
            <div class="shop-card-price${canAfford ? '' : ' shop-price-unaffordable'}">
                <img src="img/icons/kamas.png" onerror="this.src='img/icons/icon.png'" class="shop-kamas-icon">
                <span>${entry.price}</span>
            </div>`

        if (!isMaxed) {
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
    if (state.kamas < entry.price) {
        showNotification('Pas assez de kamas !', 'error')
        return
    }

    const currentLevel  = state.inventory[entry.itemId]?.level || 0
    const maxAffordable = Math.floor(state.kamas / entry.price)
    const maxUseful     = itm.levelMax ? Math.max(0, itm.levelMax - currentLevel) : maxAffordable
    const maxQty        = Math.min(maxAffordable, maxUseful)

    if (maxQty <= 0) {
        showNotification('Pas assez de kamas !', 'error')
        return
    }

    const fixedQtys = [1, 2, 5, 10].filter(q => q < maxQty)

    const body = `<div class="shop-buy-picker">
        <div class="shop-buy-picker-item">
            <img src="${itm.image || 'img/icons/icon.png'}" onerror="this.src='img/icons/icon.png'">
            <span>${itm.name}</span>
        </div>
        <div class="shop-buy-qty-row">
            ${fixedQtys.map(q => `<button class="shop-buy-qty-btn" onclick="closeTooltip(); buyShopItem('${entry.itemId}', ${entry.price}, ${q})">${q}</button>`).join('')}
            <button class="shop-buy-qty-btn shop-buy-qty-max" onclick="closeTooltip(); buyShopItem('${entry.itemId}', ${entry.price}, ${maxQty})">
                Max<br><small>${maxQty}</small>
            </button>
        </div>
        <div class="shop-buy-picker-price">
            <img src="img/icons/kamas.png" onerror="this.src='img/icons/icon.png'">
            ${entry.price} kamas / unité &nbsp;·&nbsp; ${state.kamas} disponibles
        </div>
    </div>`

    openTooltip(`Acheter — ${itm.name}`, body)
}
