// engine/offline.js — Progression offline DofusChill
//
// Au chargement, calcule le temps écoulé depuis la dernière frame enregistrée
// et l'injecte dans _afkSeconds (combat.js). La boucle RAF principale drainera
// ce temps en fast-forward avec un budget CPU de OFFLINE_FRAME_BUDGET_MS ms/frame.
// Si l'équipe meurt sans autopilot → écran de défaite normal.
// Si l'équipe meurt avec autopilot → ticket consommé, HP remis à fond, fast-forward continue.

const OFFLINE_CAP_MS          = 8 * 60 * 60 * 1000  // plafond 8 h
const OFFLINE_MIN_MS          = 10 * 1000            // ignore si < 10 secondes
const OFFLINE_FRAME_BUDGET_MS = 8                    // budget CPU max par frame (ms)

// Point d'entrée appelé depuis initGame() au chargement de la page.
function simulateOfflineProgress() {
    if (!state.isRunning || !state.currentArea) {
        _resumeSavedCombat()
        return
    }

    const area = areas[state.currentArea]
    if (!area || !state.team.some(Boolean)) {
        state.isRunning   = false
        state.currentArea = null
        return
    }

    // Restaure _autoPilot en mémoire (perdu au rechargement de page)
    if (!_autoPilot && state.offlineAutoPilotRemaining > 0 &&
        (state.inventory['piloteAutomatique']?.count || 0) > 0) {
        const accumulated = state.autoPilotAccumulated
            ? JSON.parse(JSON.stringify(state.autoPilotAccumulated))
            : _emptySessionLoot()
        _autoPilot = { remaining: state.offlineAutoPilotRemaining, accumulated }
    }

    const elapsed = state.lastFrameRecorded
        ? Math.min(OFFLINE_CAP_MS, Date.now() - state.lastFrameRecorded)
        : 0

    if (elapsed < OFFLINE_MIN_MS) {
        _resumeSavedCombat()
        return
    }

    // Démarre le combat en mode reprise exacte (ennemi + timers tels que sauvegardés)
    _resumeSavedCombat()

    // Si l'équipe était déjà morte : défaite immédiate (sans fast-forward)
    if (!state.team.some(m => m && m.currentHp > 0)) {
        stopCombat()
        showSessionSummary('defeat')
        return
    }

    // Injecte le temps à rattraper — la boucle RAF (_gameLoop) s'en charge
    _afkSeconds = elapsed / 1000
}

// Reprise exacte de l'état sauvegardé (sans fast-forward).
function _resumeSavedCombat() {
    if (!state.isRunning || !state.currentArea) return
    const area = areas[state.currentArea]
    if (!area || !state.team.some(Boolean)) {
        state.isRunning   = false
        state.currentArea = null
        return
    }
    startCombat(state.currentArea)
}

// Appelé depuis onDefeat quand _afkSeconds était actif.
// Consomme un ticket autopilot et continue le fast-forward, ou stoppe proprement.
function _offlineHandleDefeat() {
    if (_autoPilot && _autoPilot.remaining > 0 &&
        (state.inventory['piloteAutomatique']?.count || 0) > 0) {

        if (combat) _mergeSessionLoot(_autoPilot.accumulated, combat.sessionLoot)
        _consumeAutoPilotTicket()
        _autoPilot.remaining--
        state.offlineAutoPilotRemaining = _autoPilot.remaining

        if (_autoPilot.remaining > 0 && (state.inventory['piloteAutomatique']?.count || 0) > 0) {
            // Relance le combat — _afkSeconds est toujours > 0, le fast-forward continue
            startCombat(state.currentArea)
            return
        }
    }

    // Plus de tickets (ou pas de pilote) : arrêt du fast-forward
    _afkSeconds = 0
    if (_autoPilot) {
        if (combat) combat.sessionLoot = _autoPilot.accumulated
        _autoPilot = null
    }
    showSessionSummary('defeat')
}
