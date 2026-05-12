// ui/almanax.js — Menu sauvegarde + Almanax DofusChill

function updateAlmanaxUI() {
    _renderAlmanaxProgression()
    _renderAlmanaxButton()
}

// ─── Résumé de progression ────────────────────────────────────────────────────

function _renderAlmanaxProgression() {
    const el = document.getElementById('almanax-progression')
    if (!el) return

    const teamMembers   = state.team.filter(Boolean)
    const famCount      = Object.keys(state.collection).length
    const famTotal      = Object.keys(monsters).filter(id => monsters[id]?.familiar).length
    const pilotes       = state.inventory['piloteAutomatique']?.count || 0
    const area          = state.currentArea ? (areas[state.currentArea]?.name || state.currentArea) : 'Aucune'
    const bossCount     = (state.defeatedBosses || []).length

    const teamHtml = teamMembers.length > 0
        ? teamMembers.map(m => `
            <div class="alm-team-row">
                <img src="${classes[m.classId]?.image || 'img/icons/icon.png'}" class="alm-team-icon" onerror="this.src='img/icons/icon.png'">
                <span>${m.name || m.classId}</span>
                <span class="alm-stat-val">Niv. ${m.level}</span>
            </div>`).join('')
        : `<div style="opacity:0.4;font-size:0.8rem;">Aucun membre dans l'équipe</div>`

    el.innerHTML = `
        <div class="alm-section-title">Équipe</div>
        <div class="alm-team">${teamHtml}</div>

        <div class="alm-section-title">Progression</div>
        <div class="alm-stats">
            <div class="alm-stat-row"><span>Kamas</span><span class="alm-stat-val">${state.kamas.toLocaleString('fr-FR')}</span></div>
            <div class="alm-stat-row"><span>Zone actuelle</span><span class="alm-stat-val">${area}</span></div>
            <div class="alm-stat-row"><span>Monstres vaincus</span><span class="alm-stat-val">${(state.totalKills || 0).toLocaleString('fr-FR')}</span></div>
            <div class="alm-stat-row"><span>Boss vaincus</span><span class="alm-stat-val">${bossCount}</span></div>
            <div class="alm-stat-row"><span>Familiers capturés</span><span class="alm-stat-val">${famCount} / ${famTotal}</span></div>
            <div class="alm-stat-row"><span>Pilotes automatiques</span><span class="alm-stat-val">${pilotes}</span></div>
        </div>`
}

// ─── Bouton Almanax (récompense quotidienne) ──────────────────────────────────

function _todayStr() {
    return new Date().toISOString().slice(0, 10)
}

function _canClaimAlmanax() {
    return state.lastAlmanaxDate !== _todayStr()
}

function _renderAlmanaxButton() {
    const btn = document.getElementById('almanax-claim-btn')
    const status = document.getElementById('almanax-claim-status')
    if (!btn || !status) return

    if (_canClaimAlmanax()) {
        btn.disabled = false
        btn.classList.add('almanax-btn-ready')
        btn.classList.remove('almanax-btn-claimed')
        status.textContent = 'Récompense disponible !'
        status.style.color = '#2D7A2D'
    } else {
        btn.disabled = true
        btn.classList.remove('almanax-btn-ready')
        btn.classList.add('almanax-btn-claimed')
        status.textContent = 'Déjà réclamé aujourd\'hui. Revenez demain !'
        status.style.color = 'rgba(255,255,255,0.4)'
    }
}

function claimAlmanax() {
    if (!_canClaimAlmanax()) return

    // Récompense : 1 pilote automatique
    if (!state.inventory['piloteAutomatique']) state.inventory['piloteAutomatique'] = { count: 0 }
    state.inventory['piloteAutomatique'].count += 1

    // Marquer la date de réclamation
    state.lastAlmanaxDate = _todayStr()

    // Sauvegarde automatique
    saveGame()
    exportData()

    _renderAlmanaxButton()
    _renderAlmanaxProgression()

    // Popup de récompense
    const body = `
        <div style="display:flex;flex-direction:column;align-items:center;gap:1rem;padding:0.5rem 0;">
            <img src="img/items/divers/piloteAutomatique.png" onerror="this.src='img/icons/icon.png'"
                 style="width:5rem;height:5rem;object-fit:contain;filter:drop-shadow(0 0 12px #ffe15e);">
            <div style="font-size:1.1rem;font-weight:bold;color:#ffe15e;">Almanax du jour réclamé !</div>
            <div style="font-size:0.9rem;opacity:0.8;text-align:center;">
                Vous recevez <strong>1 Pilote Automatique</strong>.<br>
                Votre sauvegarde a été exportée automatiquement.
            </div>
            <div style="font-size:0.75rem;opacity:0.5;">Revenez demain pour une nouvelle récompense.</div>
        </div>`
    openTooltip('Almanax', body)
}
