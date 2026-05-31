// ui/almanax.js — Almanax + Archives DofusChill

function _todayStr() {
    return new Date().toISOString().slice(0, 10)
}

function _canClaimAlmanax() {
    return state.lastAlmanaxDate !== _todayStr()
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

    // Ferme le menu si ouvert
    document.getElementById('menu-button').classList.remove('menu-button-open')
    activeMenu = null

    // Récompense : 1 pilote automatique
    if (!state.inventory['piloteAutomatique']) state.inventory['piloteAutomatique'] = { count: 0 }
    state.inventory['piloteAutomatique'].count += 1

    state.lastAlmanaxDate = _todayStr()
    saveGame()
    exportData()

    // Cache le bouton jusqu'à demain
    updateAlmanaxNavItem()

    // Popup de récompense
    const body = `
        <div style="display:flex;flex-direction:column;align-items:center;gap:1rem;padding:0.5rem 0;">
            <img src="img/items/divers/piloteAutomatique.png" onerror="this.src='img/icons/icon.png'"
                 style="width:5rem;height:5rem;object-fit:contain;filter:drop-shadow(0 0 12px #ffe15e);">
            <div style="font-size:1.1rem;font-weight:bold;color:#ffe15e;background:var(--dark2);padding:0.3rem 1rem;border-radius:0.5rem;">Almanax du jour réclamé !</div>
            <div style="font-size:0.9rem;opacity:0.8;text-align:center;">
                Vous recevez <strong>1 Pilote Automatique</strong>.<br>
                Votre sauvegarde a été exportée automatiquement.
            </div>
            <div style="font-size:0.75rem;opacity:0.5;">Revenez demain pour une nouvelle récompense.</div>
        </div>`
    openTooltip('Almanax', body)
}

// ─── Archives : résumé + export/import ───────────────────────────────────────

function updateArchivesUI() {
    const el = document.getElementById('archives-progression')
    if (!el) return

    const teamMembers = state.team.filter(Boolean)
    const famCount    = Object.keys(state.collection).length
    const famTotal    = familiars.length
    const pilotes     = state.inventory['piloteAutomatique']?.count || 0
    const area        = state.currentArea ? (areas[state.currentArea]?.name || state.currentArea) : 'Aucune'
    const bossCount   = (state.defeatedBosses || []).length

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
            <div class="alm-stat-row"><span>Familiers capturés</span><span class="alm-stat-val">${famCount} / ${famTotal}</span></div>
            <div class="alm-stat-row"><span>Pilotes automatiques</span><span class="alm-stat-val">${pilotes}</span></div>
        </div>`
}
