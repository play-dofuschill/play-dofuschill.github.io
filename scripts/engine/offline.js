// engine/offline.js — Progression offline DofusChill
//
// Au chargement, rejoue le combat en accéléré pour couvrir la durée d'absence.
// Si l'équipe survit → le combat reprend au rythme normal sans interruption.
// Si l'équipe meurt sans autopilot → écran de défaite normal.
// Si l'équipe meurt avec autopilot → ticket consommé, HP remis à fond, fast-forward continue.

const OFFLINE_CAP_MS          = 8 * 60 * 60 * 1000  // plafond 8 h
const OFFLINE_MIN_MS          = 10 * 1000            // ignore si < 10 secondes
const OFFLINE_FRAME_BUDGET_MS = 8                    // budget CPU max par frame (ms)
const OFFLINE_UI_MS           = 100                  // période de refresh UI (~10 fps)

let _offlineTicksRun       = 0
let _offlineTotalTicks     = 0
let _offlineLastUiMs       = 0
let _offlineLoopId         = null
let _offlineLoopGeneration = 0   // invalide l'ancien callback après un restart

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

    _offlineTotalTicks = Math.ceil(elapsed / TICK_MS)
    _offlineTicksRun   = 0
    _offlineLastUiMs   = 0
    _startOfflineFastForwardLoop()
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

// Démarre (ou redémarre après un respawn autopilot) la boucle accélérée.
function _startOfflineFastForwardLoop() {
    if (_offlineLoopId) clearInterval(_offlineLoopId)
    _offlineFastForward = true
    const myGeneration  = ++_offlineLoopGeneration

    _offlineLoopId = setInterval(() => {
        // Invalide le callback zombie si un restart a créé une nouvelle génération
        if (!_offlineFastForward || _offlineLoopGeneration !== myGeneration) {
            clearInterval(_offlineLoopId)
            _offlineLoopId = null
            return
        }

        const frameStart = performance.now()
        while (
            performance.now() - frameStart < OFFLINE_FRAME_BUDGET_MS &&
            _offlineTicksRun < _offlineTotalTicks &&
            _offlineFastForward
        ) {
            gameTick()
            _offlineTicksRun++
        }

        // Refresh UI léger (~10 fps)
        const now = performance.now()
        if (now - _offlineLastUiMs >= OFFLINE_UI_MS) {
            if (state.isRunning) updateCombatUI()
            _offlineLastUiMs = now
        }

        // Tous les ticks simulés → reprise du combat au rythme normal
        if (_offlineTicksRun >= _offlineTotalTicks && _offlineFastForward) {
            _offlineFastForward = false
            clearInterval(_offlineLoopId)
            _offlineLoopId     = null
            _offlineTotalTicks = 0
            _offlineTicksRun   = 0
            saveGame()
        }
    }, TICK_MS)
}

// Appelé depuis onDefeat quand _offlineFastForward était actif.
// Consomme un ticket autopilot et continue le fast-forward, ou stoppe proprement.
function _offlineHandleDefeat() {
    if (_autoPilot && _autoPilot.remaining > 0 &&
        (state.inventory['piloteAutomatique']?.count || 0) > 0) {

        if (combat) _mergeSessionLoot(_autoPilot.accumulated, combat.sessionLoot)
        _consumeAutoPilotTicket()
        _autoPilot.remaining--
        state.offlineAutoPilotRemaining = _autoPilot.remaining

        if (_autoPilot.remaining > 0 && (state.inventory['piloteAutomatique']?.count || 0) > 0) {
            // Relance le combat et continue le fast-forward pour les ticks restants
            startCombat(state.currentArea)
            _startOfflineFastForwardLoop()
            return
        }
    }

    // Plus de tickets (ou pas de pilote) : fin du fast-forward
    _offlineFastForward = false
    if (_offlineLoopId) { clearInterval(_offlineLoopId); _offlineLoopId = null }
    _offlineTotalTicks  = 0
    _offlineTicksRun    = 0
    if (_autoPilot) {
        if (combat) combat.sessionLoot = _autoPilot.accumulated
        _autoPilot = null
    }
    showSessionSummary('defeat')
}
