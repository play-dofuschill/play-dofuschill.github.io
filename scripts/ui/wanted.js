// scripts/ui/wanted.js — Menu Avis de Recherche

function updateWantedUI() {
    _refreshWantedPool()

    const content = document.getElementById('wanted-content')
    if (!content) return
    content.innerHTML = ''

    const pool = state.wanted?.pool?.bosses || []
    if (!pool.length) {
        content.innerHTML = '<div style="padding:1rem;opacity:0.5;text-align:center">Aucun avis disponible</div>'
        return
    }

    // Countdown de renouvellement
    const infoRow = document.createElement('div')
    infoRow.className = 'zone-daily-info'
    infoRow.innerHTML = `<span>Renouvellement dans <strong>${nextWantedRefreshLabel()}</strong> &bull; <strong>${pool.length}</strong> cibles</span>`
    content.appendChild(infoRow)

    // Grouper les boss par palier de déblocage
    const tiers = {}
    for (const wantedId of pool) {
        const wd = WantedBosses[wantedId]
        if (!wd) continue
        const tier = _wantedBossUnlockTier(wd.levelCap)
        if (!tiers[tier]) tiers[tier] = []
        tiers[tier].push(wantedId)
    }

    for (const tier of [1, 2, 3, 4, 5]) {
        const bossIds = tiers[tier]
        if (!bossIds?.length) continue

        const accessible = _wantedTierAccessible(tier)

        // En-tête de palier
        const tierHeader = document.createElement('div')
        tierHeader.style.cssText = [
            'display:flex',
            'align-items:center',
            'gap:0.5rem',
            'margin:0.7rem 0 0.25rem',
            'padding:0.3rem 0.5rem',
            'background:rgba(255,255,255,0.06)',
            'border-radius:0.3rem',
            'font-size:0.78em'
        ].join(';')

        const statusMark = accessible ? '▶' : '▷'
        const hint = !accessible && WANTED_TIER_HINT[tier]
            ? `<span style="margin-left:auto;opacity:0.5;font-size:0.9em">${WANTED_TIER_HINT[tier]}</span>`
            : ''
        tierHeader.innerHTML = `<span style="opacity:${accessible ? '0.85' : '0.45'}">${statusMark} <strong>${WANTED_TIER_LABELS[tier]}</strong></span>${hint}`
        content.appendChild(tierHeader)

        for (const wantedId of bossIds) {
            const wd  = WantedBosses[wantedId]
            const ws  = _wantedBossState(wantedId)
            if (!ws) continue

            const hpPct   = ws.maxHp > 0 ? Math.round((ws.currentHp / ws.maxHp) * 100) : 0
            const hpColor = hpPct > 50 ? '#4caf50' : hpPct > 20 ? '#ff9800' : '#f44336'
            const isPostGame = ws.killCount >= 20

            const multLabel = isPostGame
                ? `<span style="color:#ffd700;font-size:0.78em">★ Difficulté max (${ws.killCount} victoires)</span>`
                : ws.killCount > 0
                    ? `<span style="opacity:0.7;font-size:0.78em">${ws.killCount}/20 victoires</span>`
                    : ''
            const bestDmgLabel = (isPostGame && ws.bestSessionDamage > 0)
                ? `<span style="opacity:0.6;font-size:0.72em">Record : ${ws.bestSessionDamage.toLocaleString('fr-FR')} dégâts</span>`
                : ''

            const card = document.createElement('div')
            card.className = 'explore-ticket' + (!accessible ? ' explore-ticket-locked' : '')
            card.innerHTML = `
                <div>
                    <div class="explore-ticket-left">
                        <span>${wd.name} <span style="font-size:0.75em;opacity:0.55">— Niv. max ${wd.levelCap}</span></span>
                        <div class="Boss_Ultime-hp-bar-inline">
                            <div class="Boss_Ultime-hp-bar-inline-track">
                                <div class="Boss_Ultime-hp-bar-inline-fill" style="width:${hpPct}%;background:${hpColor}"></div>
                            </div>
                            <span style="font-size:0.72em;opacity:0.7;white-space:nowrap">${ws.currentHp.toLocaleString('fr-FR')} / ${ws.maxHp.toLocaleString('fr-FR')} PV</span>
                        </div>
                        ${multLabel}
                        ${bestDmgLabel}
                        <span class="explore-ticket-desc">${wd.lore}</span>
                        ${!accessible ? `<span class="Boss_Ultime-locked-notice">${WANTED_TIER_HINT[tier] || 'Palier verrouillé'}</span>` : ''}
                    </div>
                    <div class="explore-ticket-right">
                        <img class="explore-ticket-sprite" src="${wd.icon}" onerror="this.src='img/icons/icon.png'"${!accessible ? ' style="opacity:0.3;filter:grayscale(1)"' : ''}>
                    </div>
                </div>`

            if (accessible) card.onclick = () => _launchWanted(wantedId)
            card.addEventListener('contextmenu', e => { e.preventDefault(); _showWantedDetail(wantedId) })
            content.appendChild(card)
        }
    }
}

function _showWantedDetail(wantedId) {
    const wd = WantedBosses[wantedId]
    const ws = _wantedBossState(wantedId)
    if (!wd || !ws) return

    const panoplieRows = (wd.panoplie || []).map(itemId => {
        const itm = item[itemId]
        return itm
            ? `<div style="display:flex;align-items:center;gap:0.4rem;margin:0.15rem 0">
                   <img src="${itm.image}" style="width:1.4rem;height:1.4rem;object-fit:contain" onerror="this.src='img/icons/icon.png'">
                   <span>${itm.name} <span style="opacity:0.5;font-size:0.8em">niv.${itm.requiredLevel || '?'}</span></span>
               </div>`
            : `<div style="opacity:0.4">${itemId}</div>`
    }).join('')

    const hpPct   = ws.maxHp > 0 ? Math.round((ws.currentHp / ws.maxHp) * 100) : 0
    const hpColor = hpPct > 50 ? '#4caf50' : hpPct > 20 ? '#ff9800' : '#f44336'
    const isPostGame = ws.killCount >= 20

    const body = `
        <div style="display:flex;flex-direction:column;gap:0.7rem">
            <div style="display:flex;align-items:center;gap:0.6rem">
                <img src="${wd.icon}" style="width:3rem;height:3rem;object-fit:contain" onerror="this.src='img/icons/icon.png'">
                <div>
                    <div style="font-weight:bold">${wd.name}</div>
                    <div style="opacity:0.6;font-size:0.85em">Niveau max : ${wd.levelCap} &bull; ${WANTED_TIER_LABELS[_wantedBossUnlockTier(wd.levelCap)]}</div>
                </div>
            </div>
            <div style="opacity:0.75;font-size:0.88em;font-style:italic">${wd.lore}</div>
            <div style="background:rgba(255,255,255,0.05);border-radius:0.4rem;padding:0.5rem 0.6rem">
                <div style="font-size:0.8em;opacity:0.55;margin-bottom:0.3rem;text-transform:uppercase;letter-spacing:0.05em">Points de vie</div>
                <div style="display:flex;align-items:center;gap:0.5rem">
                    <div style="flex:1;height:6px;background:rgba(255,255,255,0.12);border-radius:3px;overflow:hidden">
                        <div style="width:${hpPct}%;height:100%;background:${hpColor};border-radius:3px"></div>
                    </div>
                    <span style="font-size:0.82em;opacity:0.8;white-space:nowrap">${ws.currentHp.toLocaleString('fr-FR')} / ${ws.maxHp.toLocaleString('fr-FR')}</span>
                </div>
                <div style="font-size:0.78em;opacity:0.5;margin-top:0.25rem">ATK de base : ${Math.floor(wd.bst.atk * ws.statMultiplier).toLocaleString('fr-FR')}</div>
            </div>
            <div style="background:rgba(255,255,255,0.05);border-radius:0.4rem;padding:0.5rem 0.6rem">
                <div style="font-size:0.8em;opacity:0.55;margin-bottom:0.3rem;text-transform:uppercase;letter-spacing:0.05em">Progression</div>
                ${isPostGame
                    ? `<div style="color:#ffd700;font-size:0.85em">★ Difficulté maximale (${ws.killCount} victoires)</div>`
                    : `<div style="font-size:0.85em">${ws.killCount} / 20 victoires</div>`}
                ${isPostGame && ws.bestSessionDamage > 0
                    ? `<div style="opacity:0.6;font-size:0.8em;margin-top:0.2rem">Record : ${ws.bestSessionDamage.toLocaleString('fr-FR')} dégâts</div>`
                    : ''}
            </div>
            <div>
                <div style="font-size:0.8em;opacity:0.55;margin-bottom:0.3rem;text-transform:uppercase;letter-spacing:0.05em">Récompenses (100% chacune)</div>
                ${panoplieRows || '<div style="opacity:0.4;font-size:0.85em">Aucune</div>'}
            </div>
        </div>`

    openTooltip(wd.name, body)
}

function _launchWanted(wantedId) {
    if (!state.hasChosenStarter) {
        showNotification('Choisissez d\'abord une classe !', 'error')
        return
    }
    if (state.isRunning) {
        showNotification('Un combat est déjà en cours !', 'error')
        return
    }

    const wd = WantedBosses[wantedId]
    if (!wd) return

    const ws = _wantedBossState(wantedId)
    if (!ws) return
    // Auto-réparation : currentHp=0 après victoire = artefact de l'ancien bug de save
    if (ws.currentHp <= 0) ws.currentHp = ws.maxHp

    const wantedEl = document.getElementById('wanted-menu')
    if (wantedEl) { wantedEl.style.display = 'none'; wantedEl.style.zIndex = '30' }
    document.getElementById('menu-button').classList.remove('menu-button-open')
    document.getElementById('main-content').style.zIndex = ''
    activeMenu = null

    const areaId = '_wanted_' + wantedId
    _pendingAreaId        = areaId
    state.pendingWantedId = wantedId

    playZaapTransition(() => {
        const bar     = document.getElementById('zone-confirm-bar')
        const barName = document.getElementById('zone-confirm-bar-name')
        if (bar)     bar.style.display = 'flex'
        if (barName) barName.textContent = wd.name

        const btnText = document.getElementById('zone-confirm-btn-text')
        const btnSub  = document.getElementById('zone-confirm-btn-sub')
        if (btnText) btnText.textContent  = 'Affronter le boss'
        if (btnSub)  btnSub.style.display = 'none'

        const teamMenu = document.getElementById('team-menu')
        if (teamMenu) { teamMenu.style.display = 'flex'; teamMenu.style.zIndex = '40' }
        activeMenu = 'team'
        updateTeamUI()
    })
}
