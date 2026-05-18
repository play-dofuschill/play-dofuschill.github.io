// ui/poutch.js — Menu et résumé du mode Poutch (cible d'entraînement)

let _pendingPoutchMode = null

const POUTCH_MODES = [
    {
        id: 'infinite',
        label: 'Vie et tours infinis',
        desc: 'Le Poutch se régénère indéfiniment. Quittez quand vous voulez pour voir vos stats.',
        icon: '∞'
    },
    {
        id: 20,
        label: '20 tours',
        desc: '20 actions d\'équipe pour maximiser vos dégâts.',
        icon: '20'
    },
    {
        id: 40,
        label: '40 tours',
        desc: '40 actions pour tester votre puissance.',
        icon: '40'
    },
    {
        id: 80,
        label: '80 tours',
        desc: 'Un combat long pour optimiser votre DPT.',
        icon: '80'
    },
    {
        id: 200,
        label: '200 tours',
        desc: 'Simulation longue durée — voyez votre DPT réel sur la durée.',
        icon: '200'
    }
]

function updatePoutchUI() {
    const listing = document.getElementById('poutch-listing')
    if (!listing) return
    listing.innerHTML = ''

    const info = document.createElement('div')
    info.className = 'zone-daily-info'
    info.innerHTML = `<span>Poutch &bull; Choisissez un mode</span>
        <span style="opacity:0.6;font-size:0.8em;">Le Poutch ne peut pas mourir — testez vos dégâts librement</span>`
    listing.appendChild(info)

    for (const m of POUTCH_MODES) {
        const card = document.createElement('div')
        card.className = 'explore-ticket'
        card.innerHTML = `
            <div>
                <div class="explore-ticket-left">
                    <span>${m.label}</span>
                    <span class="explore-ticket-desc">${m.desc}</span>
                </div>
                <div class="explore-ticket-right" style="align-items:center;justify-content:center;min-width:3.5rem;">
                    <span style="font-size:1.6rem;font-weight:bold;opacity:0.85;">${m.icon}</span>
                </div>
            </div>`
        card.onclick = () => joinPoutch(m.id)
        listing.appendChild(card)
    }
}

function joinPoutch(mode) {
    if (!state.hasChosenStarter) {
        showNotification('Choisissez d\'abord une classe !', 'error')
        return
    }

    _pendingPoutchMode = mode

    // Ferme le menu Poutch
    const poutchMenu = document.getElementById('poutch-menu')
    if (poutchMenu) { poutchMenu.style.display = 'none'; poutchMenu.style.zIndex = '30' }
    document.getElementById('menu-button').classList.remove('menu-button-open')
    document.getElementById('main-content').style.zIndex = ''
    activeMenu = null

    // Libellé du mode
    const modeLabel = mode === 'infinite' ? 'Poutch — Vie et tours infinis' : `Poutch — ${mode} tours`

    // Affiche la barre de confirmation dans le menu team
    const bar     = document.getElementById('zone-confirm-bar')
    const barName = document.getElementById('zone-confirm-bar-name')
    if (bar)     bar.style.display = 'flex'
    if (barName) barName.textContent = modeLabel

    const btnText = document.getElementById('zone-confirm-btn-text')
    const btnSub  = document.getElementById('zone-confirm-btn-sub')
    if (btnText) btnText.textContent  = 'Lancer le combat'
    if (btnSub)  btnSub.style.display = 'none'

    // Ouvre le menu team
    const teamMenu = document.getElementById('team-menu')
    if (teamMenu) { teamMenu.style.display = 'flex'; teamMenu.style.zIndex = '40' }
    activeMenu = 'team'
    updateTeamUI()
}

// ─── Écran de résultats Poutch ────────────────────────────────────────────────

function showPoutchSummary(type) {
    const end = document.getElementById('area-end')
    if (!end) return

    const session  = (typeof combat !== 'undefined' && combat) ? combat.sessionLoot  : {}
    const mode     = (typeof combat !== 'undefined' && combat) ? combat.poutchMode   : null
    const bigHit   = (typeof combat !== 'undefined' && combat) ? (combat.poutchBiggestHit || 0) : 0
    const cycles   = session.killCount || 0
    const totalDmg = Object.values(session.memberDamage || {}).reduce((s, v) => s + v, 0)

    const modeLabel = mode === 'infinite' ? '∞ Infini' : `${mode} tours`
    const titleText = type === 'defeat'
        ? 'Équipe vaincue !'
        : mode === 'infinite'
            ? 'Séance terminée'
            : `${mode} tours accomplis !`

    // Ferme les menus
    for (const id of Object.values(MENU_MAP)) {
        const el = document.getElementById(id)
        if (el) { el.style.display = 'none'; el.style.zIndex = '30' }
    }
    document.getElementById('menu-button')?.classList.remove('menu-button-open')
    document.getElementById('main-content').style.zIndex = ''
    activeMenu = null

    const exploreTeam  = document.getElementById('explore-team')
    const exploreLeave = document.getElementById('explore-leave')
    const enemyDisplay = document.getElementById('enemy-display')
    const menuParent   = document.getElementById('menu-button-parent')
    if (exploreTeam)  exploreTeam.style.display  = 'none'
    if (exploreLeave) exploreLeave.style.display = 'none'
    if (enemyDisplay) enemyDisplay.style.display = 'none'
    if (menuParent)   menuParent.style.display   = 'none'
    end.style.display = 'flex'

    end.innerHTML = `
        <div class="ae-header">Résumé Poutch</div>
        <div class="ae-title">${titleText}</div>
        <div class="ae-actions">
            <div class="ae-btn ae-btn-quit" onclick="exitPoutch()">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"/></svg>
                Quitter
            </div>
            <div class="ae-btn ae-btn-rejoin" onclick="rejoinPoutch()">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6c0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8m0 14c-3.31 0-6-2.69-6-6c0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4l-4-4z"/></svg>
                Rejouer
            </div>
        </div>
        <div class="ae-box">
            <div class="ae-box-title">Mode : ${modeLabel}</div>
            <div class="ae-box-content" style="flex-direction:column;gap:0.55rem;padding:0.85rem 1rem;">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <span style="opacity:0.7;font-size:0.9rem;">Dégâts totaux infligés</span>
                    <span style="font-size:1.2rem;font-weight:bold;">${totalDmg.toLocaleString('fr-FR')}</span>
                </div>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <span style="opacity:0.7;font-size:0.9rem;">Plus gros coup unique</span>
                    <span style="font-size:1.2rem;font-weight:bold;color:#e2a45d;">${bigHit.toLocaleString('fr-FR')}</span>
                </div>
                ${cycles > 0 ? `<div style="display:flex;justify-content:space-between;align-items:center;">
                    <span style="opacity:0.7;font-size:0.9rem;">Poutch mis KO</span>
                    <span style="font-size:1.1rem;font-weight:bold;">${cycles}</span>
                </div>` : ''}
            </div>
        </div>
        <div class="ae-box">
            <div class="ae-box-title">Dégâts par membre</div>
            <div class="ae-box-content" style="padding:0.85rem 1rem;flex-direction:column;gap:0.6rem;">
                ${_buildPoutchDmgRows(session.memberDamage || {}, totalDmg)}
            </div>
        </div>`
}

function _buildPoutchDmgRows(dmgMap, total) {
    if (total === 0) return '<span style="opacity:0.45;font-size:0.85rem">Aucun dégât enregistré.</span>'
    return Object.entries(dmgMap)
        .sort(([, a], [, b]) => b - a)
        .map(([idx, dmg]) => {
            const member = state.team[parseInt(idx)]
            if (!member) return ''
            const cls = classes[member.classId]
            const pct = Math.round((dmg / total) * 100)
            return `<div style="display:flex;flex-direction:column;gap:0.1rem;">
                <div style="display:flex;align-items:center;gap:0.5rem;">
                    <img src="${cls?.image || 'img/icons/icon.png'}" onerror="this.src='img/icons/icon.png'"
                         style="width:2rem;height:2rem;object-fit:contain;flex-shrink:0;image-rendering:pixelated;">
                    <span style="flex:1;font-size:0.88rem;">${cls?.name || '?'} <small style="opacity:0.45">niv.${member.level}</small></span>
                    <span style="font-size:0.88rem;font-weight:bold;">${dmg.toLocaleString('fr-FR')} — ${pct}%</span>
                </div>
                <div style="height:0.35rem;border-radius:0.2rem;background:rgba(255,255,255,0.12);">
                    <div style="width:${pct}%;height:100%;background:#e2a45d;border-radius:0.2rem;"></div>
                </div>
            </div>`
        }).join('')
}

function exitPoutch() {
    exitCombat()
    switchMenu('poutch')
}

function rejoinPoutch() {
    const mode = (typeof combat !== 'undefined' && combat) ? combat.poutchMode : null
    exitCombat()
    if (mode !== null && mode !== undefined) {
        startPoutchCombat(mode)
    } else {
        switchMenu('poutch')
    }
}
