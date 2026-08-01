// ui/autoTeam.js — Déclencheurs UI de l'auto-kit de sorts (engine/autoTeam.js)

// ─── Popup du curseur safe (gauche) ↔ glass cannon (droite) ────────────────
// Le slider HTML va de 1 (gauche) à 5 (droite) ; on l'inverse par rapport au
// profil interne (AUTO_TEAM_PROFILES: 1=glass cannon .. 5=safe) pour que la
// gauche affiche "safe" comme demandé : profileLevel = 6 - sliderValue.

function _autoTeamSliderValueFromProfile(level) { return 6 - level }
function _autoTeamProfileFromSliderValue(value) { return 6 - Number(value) }

function _renderAutoTeamPicker() {
    const level = getAutoTeamProfileLevel()
    const sliderValue = _autoTeamSliderValueFromProfile(level)
    return `<div class="equip-selector auto-team-picker">
        <p style="font-size:0.8rem;opacity:0.75;margin:0 0 0.6rem;line-height:1.4;">
            Règle l'équilibre dégâts / survie utilisé pour choisir les 4 sorts actifs de toute
            l'équipe contre la cible actuelle.
        </p>
        <div style="display:flex;align-items:center;gap:0.5rem;">
            <span style="font-size:0.75rem;opacity:0.75;white-space:nowrap;">🛡 Safe</span>
            <input id="auto-team-profile-slider" type="range" min="1" max="5" step="1" value="${sliderValue}"
                style="flex:1;" oninput="onAutoTeamProfileInput(this.value)">
            <span style="font-size:0.75rem;opacity:0.75;white-space:nowrap;">🔥 Glass cannon</span>
        </div>
        <div style="text-align:center;margin-top:0.3rem;">
            <strong id="auto-team-profile-label" style="font-size:0.8rem;">${_autoTeamProfile(level).label}</strong>
        </div>
        <div style="margin-top:0.8rem;display:flex;justify-content:flex-end;">
            <button class="equip-remove-btn" onclick="_confirmAutoTeamPicker()">⚡ Lancer l'optimisation</button>
        </div>
    </div>`
}

function openAutoTeamPicker() {
    if (!state.team.some(m => m)) {
        showNotification('Équipe vide !', 'error')
        return
    }
    openTooltip('Auto Team', _renderAutoTeamPicker())
}

function onAutoTeamProfileInput(sliderValue) {
    const level = setAutoTeamProfileLevel(_autoTeamProfileFromSliderValue(sliderValue))
    const label = document.getElementById('auto-team-profile-label')
    if (label) label.textContent = _autoTeamProfile(level).label
}

function _confirmAutoTeamPicker() {
    closeTooltip()
    runAutoTeam()
}

// ─── Exécution ──────────────────────────────────────────────────────────────

function runAutoTeam() {
    if (!state.team.some(m => m)) {
        showNotification('Équipe vide !', 'error')
        return
    }
    const { membersUpdated, totalChanged } = applyAutoTeam()
    if (!membersUpdated) {
        showNotification('Aucun sort à optimiser.', 'error')
        return
    }
    showNotification(
        totalChanged > 0
            ? `Kits optimisés pour ${membersUpdated} perso${membersUpdated > 1 ? 's' : ''} (${totalChanged} sort${totalChanged > 1 ? 's' : ''} changé${totalChanged > 1 ? 's' : ''})`
            : `Kits déjà optimaux pour ${membersUpdated} perso${membersUpdated > 1 ? 's' : ''} !`,
        'info'
    )
}

function runAutoKitFromSheet(classId) {
    const result = applyAutoKit(classId, resolveAutoTeamTarget())
    const member = state.team.find(m => m && m.classId === classId)
    if (tooltipStack.length > 0) tooltipStack.pop()
    if (member) showMemberSheet(member)
    else closeTooltip()
    if (result) showNotification(result.changed > 0 ? 'Kit de sorts optimisé !' : 'Kit déjà optimal !', 'info')
}
