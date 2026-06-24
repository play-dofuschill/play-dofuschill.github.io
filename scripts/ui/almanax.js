// ui/almanax.js — Almanax + Archives DofusChill

function _todayStr() {
    return new Date().toISOString().slice(0, 10)
}

function _canClaimAlmanax() {
    return state.lastAlmanaxDate !== _todayStr()
}

// ─── Tableaux de récompenses par palier ──────────────────────────────────────
// Cascade rarest→commun : r < 0.01 → très rare, [0.01, 0.25[ → rare, [0.25, 1[ → commun.

const ALMANAX_REWARDS = {
    tresRare: {
        label: 'Très Rare',
        color: '#ff2626',
        chance: 0.01,
        pool: [
            { itemId: 'piloteAutomatique',       qty: 25 },
            { itemId: 'runeTransHpS',            qty: 1 },
            { itemId: 'runeTransAtkS',           qty: 1 },
            { itemId: 'runeTransSpdS',           qty: 1 },
            { itemId: 'runeTransFlatDmgS',       qty: 1 },
            { itemId: 'runeTransCritS',          qty: 1 },
            { itemId: 'runeTransCritDmgS',       qty: 1 },
            { itemId: 'runeTransFinalDmgS',      qty: 1 },
            { itemId: 'runeTransSpellDmgS',      qty: 1 },
            { itemId: 'runeTransDamRedS',        qty: 1 },
            { itemId: 'runeTransFireResS',       qty: 1 },
            { itemId: 'runeTransWaterResS',      qty: 1 },
            { itemId: 'runeTransEarthResS',      qty: 1 },
            { itemId: 'runeTransAirResS',        qty: 1 },
            { itemId: 'runeTransNeutralResS',    qty: 1 },
        ]
    },
    rare: {
        label: 'Rare',
        color: '#1f9108',
        chance: 0.25,
        pool: [
            { itemId: 'piloteAutomatique',    qty: 10 },
            // Runes M
            { itemId: 'runeHpM',             qty: 2 },
            { itemId: 'runeAtkM',            qty: 2 },
            { itemId: 'runeSpdM',            qty: 2 },
            { itemId: 'runeFlatDmgM',        qty: 2 },
            { itemId: 'runeCritM',           qty: 2 },
            { itemId: 'runeCritDmgM',        qty: 2 },
            { itemId: 'runeFinalDmgM',       qty: 2 },
            { itemId: 'runeSpellDmgM',       qty: 2 },
            { itemId: 'runeDamRedM',         qty: 2 },
            { itemId: 'runeFireResM',        qty: 2 },
            { itemId: 'runeWaterResM',       qty: 2 },
            { itemId: 'runeEarthResM',       qty: 2 },
            { itemId: 'runeAirResM',         qty: 2 },
            { itemId: 'runeNeutralResM',     qty: 2 },
            // Runes L
            { itemId: 'runeHpL',             qty: 1 },
            { itemId: 'runeAtkL',            qty: 1 },
            { itemId: 'runeSpdL',            qty: 1 },
            { itemId: 'runeFlatDmgL',        qty: 1 },
            { itemId: 'runeCritL',           qty: 1 },
            { itemId: 'runeCritDmgL',        qty: 1 },
            { itemId: 'runeFinalDmgL',       qty: 1 },
            { itemId: 'runeSpellDmgL',       qty: 1 },
            { itemId: 'runeDamRedL',         qty: 1 },
            { itemId: 'runeFireResL',        qty: 1 },
            { itemId: 'runeWaterResL',       qty: 1 },
            { itemId: 'runeEarthResL',       qty: 1 },
            { itemId: 'runeAirResL',         qty: 1 },
            { itemId: 'runeNeutralResL',     qty: 1 },
        ]
    },
    commun: {
        label: 'Commun',
        color: '#ECDEB7',
        chance: 1,
        pool: [
            { itemId: 'piloteAutomatique',      qty: 1 },
            // Runes S (pour les types qui l'ont)
            { itemId: 'runeHpS',               qty: 1 },
            { itemId: 'runeAtkS',              qty: 1 },
            { itemId: 'runeSpdS',              qty: 1 },
            { itemId: 'runeFlatDmgS',          qty: 1 },
            { itemId: 'runeCritS',             qty: 1 }
        ]
    },
}

function _rollAlmanaxReward() {
    const r = Math.random()
    let tier = null
    if      (r < ALMANAX_REWARDS.tresRare.chance) tier = ALMANAX_REWARDS.tresRare
    else if (r < ALMANAX_REWARDS.rare.chance)     tier = ALMANAX_REWARDS.rare
    else if (r < ALMANAX_REWARDS.commun.chance)   tier = ALMANAX_REWARDS.commun

    if (tier) {
        const entry = tier.pool[Math.floor(Math.random() * tier.pool.length)]
        return { ...entry, tier }
    }
    return { kamas: 50, tier: null }
}

// ─── Visibilité du bouton Almanax dans la nav ─────────────────────────────────

function updateAlmanaxNavItem() {
    const el = document.getElementById('menu-item-almanax')
    if (!el) return
    el.style.display = _canClaimAlmanax() ? '' : 'none'
}

// ─── Almanax : claim direct depuis la nav ─────────────────────────────────────

function claimAlmanax() {
    if (!_canClaimAlmanax()) return

    document.getElementById('menu-button').classList.remove('menu-button-open')
    activeMenu = null

    const reward = _rollAlmanaxReward()
    const tier   = reward.tier
    const color  = tier ? tier.color : '#aaaaaa'

    let imgSrc, rewardLine

    if (reward.itemId) {
        const itm = item[reward.itemId]
        const qty = reward.qty || 1
        for (let i = 0; i < qty; i++) addToInventory(reward.itemId)
        imgSrc     = itm?.image || 'img/icons/icon.png'
        const name = itm?.name || reward.itemId
        rewardLine = qty > 1 ? `<strong>${qty}× ${name}</strong>` : `<strong>${name}</strong>`
    } else {
        state.kamas += reward.kamas
        imgSrc     = 'img/icons/kamas.png'
        rewardLine = `<strong>${reward.kamas} Kamas</strong>`
    }

    addToInventory('sablierXelor')

    state.lastAlmanaxDate = _todayStr()
    saveGame()
    exportData()
    updateAlmanaxNavItem()

    const tierBadge = tier
        ? `<div style="font-size:0.75rem;font-weight:bold;color:${color};background:var(--dark2);padding:0.2rem 0.8rem;border-radius:1rem;border:1px solid ${color};letter-spacing:0.05em;margin-bottom:0.2rem;">${tier.label}</div>`
        : ''

    const body = `
        <div style="display:flex;flex-direction:column;align-items:center;gap:0.8rem;padding:0.5rem 0;">
            ${tierBadge}
            <div style="background:var(--dark2);border-radius:50%;padding:0.6rem;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <img src="${imgSrc}" onerror="this.src='img/icons/icon.png'"
                     style="width:4rem;height:4rem;object-fit:contain;filter:drop-shadow(0 0 10px ${color});">
            </div>
            <div style="font-size:1.1rem;font-weight:bold;color:${color};background:var(--dark2);padding:0.3rem 1rem;border-radius:0.5rem;">Almanax du jour réclamé !</div>
            <div style="font-size:0.9rem;opacity:0.8;text-align:center;">Vous recevez ${rewardLine}.</div>
            <div style="font-size:0.85rem;opacity:0.8;text-align:center;">+ <strong>1× Sablier de Xélor</strong></div>
            <div style="font-size:0.75rem;opacity:0.5;">Revenez demain pour une nouvelle récompense.</div>
        </div>`
    openTooltip('Almanax', body)
}

// ─── Archives : résumé + export/import ───────────────────────────────────────

function updateArchivesUI() {
    const el = document.getElementById('archives-progression')
    if (!el) return

    const teamMembers  = state.team.filter(Boolean)
    const pilotes      = state.inventory['piloteAutomatique']?.count || 0
    const area         = state.currentArea ? (areas[state.currentArea]?.name || state.currentArea) : 'Aucune'
    const bossCount    = (state.defeatedBosses || []).length
    const monsterTotal = Object.keys(monsters).length
    const captured     = Object.values(state.collection)
    const capturedCount = captured.length
    const archiCount   = captured.filter(e => e.isArchi).length

    const teamHtml = teamMembers.length > 0
        ? teamMembers.map(m => `
            <div class="alm-team-row">
                <img src="${getMemberImage(m)}" class="alm-team-icon" onerror="this.src='img/icons/icon.png'">
                <span>${m.name || m.classId}</span>
                <span class="alm-stat-val">Niv. ${m.level}</span>
            </div>`).join('')
        : `<div style="opacity:0.4;font-size:0.8rem;">Aucun membre dans l'équipe</div>`

    el.innerHTML = `
        <div class="alm-section-title">Équipe</div>
        <div class="alm-team">${teamHtml}</div>
        <div class="alm-section-title" style="margin-top:0.6rem;">Progression</div>
        <div class="alm-stats">
            <div class="alm-stat-row"><span>Kamas</span><span class="alm-stat-val">${state.kamas.toLocaleString('fr-FR')}</span></div>
            <div class="alm-stat-row"><span>Zone actuelle</span><span class="alm-stat-val">${area}</span></div>
            <div class="alm-stat-row"><span>Monstres vaincus</span><span class="alm-stat-val">${(state.totalKills || 0).toLocaleString('fr-FR')}</span></div>
            <div class="alm-stat-row"><span>Boss vaincus</span><span class="alm-stat-val">${bossCount}</span></div>
            <div class="alm-stat-row"><span>Monstres capturés</span><span class="alm-stat-val">${capturedCount} / ${monsterTotal}</span></div>
            <div class="alm-stat-row"><span>Archimonstres ★</span><span class="alm-stat-val">${archiCount}</span></div>
            <div class="alm-stat-row"><span>Pilotes automatiques</span><span class="alm-stat-val">${pilotes}</span></div>
        </div>`
}
