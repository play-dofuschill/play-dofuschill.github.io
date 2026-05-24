// engine/offline.js — Reprise de session DofusChill
//
// Au rechargement, l'état exact du combat (ennemi, timers, loot de session)
// est restauré depuis la sauvegarde. La boucle de jeu (requestAnimationFrame)
// reprend là où elle s'était arrêtée, sans simulation accélérée.

function resumeSavedCombat() {
    if (!state.isRunning || !state.currentArea) return
    const area = areas[state.currentArea]
    if (!area || !state.team.some(Boolean)) {
        state.isRunning   = false
        state.currentArea = null
        return
    }
    // Restaure le pilote automatique en mémoire (loot accumulé inclus)
    if (!_autoPilot && state.offlineAutoPilotRemaining > 0 &&
        (state.inventory['piloteAutomatique']?.count || 0) > 0) {
        const accumulated = state.autoPilotAccumulated
            ? JSON.parse(JSON.stringify(state.autoPilotAccumulated))
            : _emptySessionLoot()
        _autoPilot = { remaining: state.offlineAutoPilotRemaining, accumulated }
    }
    startCombat(state.currentArea)
}
