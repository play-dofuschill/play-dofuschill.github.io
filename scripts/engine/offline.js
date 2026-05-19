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

// État partagé avec combat.js (onDefeat l'interroge)
let _offlineTicksRun   = 0
let _offlineTotalTicks = 0
let _offlineLastUiMs   = 0

function simulateOfflineProgress() {
    if (!state.combatStartTime || !state.currentArea) return

    const area = areas[state.currentArea]
    if (!area || area.type === 'dungeon') {
        state.isRunning       = false
        state.combatStartTime = null
        return
    }

    const now        = Date.now()
    const rawElapsed = now - state.combatStartTime
    if (rawElapsed < OFFLINE_MIN_MS) {
        state.isRunning       = false
        state.combatStartTime = null
        return
    }
    const elapsed = Math.min(OFFLINE_CAP_MS, rawElapsed)

    if (!state.team.some(Boolean)) {
        state.isRunning       = false
        state.combatStartTime = null
        return
    }

    const hpSnapshot       = state.team.map(m => m ? (m.currentHp || 0) : null)
    _offlineTotalTicks     = Math.ceil(elapsed / TICK_MS)
    _offlineTicksRun       = 0
    _offlineLastUiMs       = 0

    startCombat(state.currentArea)

    // Restaure les HP au moment de la déconnexion (pas de soins gratuits)
    for (let i = 0; i < state.team.length; i++) {
        const m = state.team[i]
        if (!m || hpSnapshot[i] == null) continue
        m.currentHp = Math.min(Math.max(0, hpSnapshot[i]), m.maxHp)
    }

    // Équipe déjà morte au moment de la déconnexion : défaite immédiate
    if (!state.team.some(m => m && m.currentHp > 0)) {
        stopCombat()
        showSessionSummary('defeat')
        return
    }

    _startOfflineFastForwardLoop()
}

// Démarre (ou redémarre après un respawn autopilot) la boucle accélérée.
function _startOfflineFastForwardLoop() {
    clearInterval(combatLoop)
    _offlineFastForward = true

    combatLoop = setInterval(() => {
        if (!_offlineFastForward) return

        const frameStart = performance.now()
        while (
            performance.now() - frameStart < OFFLINE_FRAME_BUDGET_MS &&
            _offlineTicksRun < _offlineTotalTicks &&
            _offlineFastForward
        ) {
            gameTick()
            _offlineTicksRun++
        }

        const now = performance.now()
        if (now - _offlineLastUiMs >= OFFLINE_UI_MS) {
            if (state.isRunning) updateCombatUI()
            _offlineLastUiMs = now
        }

        // Tous les ticks simulés : reprise du combat au rythme normal
        if (_offlineTicksRun >= _offlineTotalTicks && _offlineFastForward) {
            _offlineFastForward = false
            clearInterval(combatLoop)
            combatLoop = setInterval(gameTick, TICK_MS)
            saveGame()
        }
    }, TICK_MS)
}

// Appelé depuis onDefeat quand _offlineFastForward était actif.
// Consomme un ticket autopilot et continue le fast-forward, ou stoppe proprement.
function _offlineHandleDefeat() {
    if (_autoPilot && _autoPilot.remaining > 0 &&
        (state.inventory['piloteAutomatique']?.count || 0) > 0) {

        // Fusionne le loot de cette session dans l'accumulateur autopilot
        if (combat) _mergeSessionLoot(_autoPilot.accumulated, combat.sessionLoot)
        _consumeAutoPilotTicket()
        _autoPilot.remaining--
        saveGame()

        if (_autoPilot.remaining > 0 && (state.inventory['piloteAutomatique']?.count || 0) > 0) {
            // Relance le combat et continue le fast-forward pour les ticks restants
            startCombat(state.currentArea)
            _startOfflineFastForwardLoop()
            return
        }
    }

    // Plus de tickets (ou pas de pilote) : fin du fast-forward, défaite normale
    _offlineFastForward    = false
    _offlineTotalTicks     = 0
    _offlineTicksRun       = 0
    if (_autoPilot) {
        if (combat) combat.sessionLoot = _autoPilot.accumulated
        _autoPilot = null
    }
    showSessionSummary('defeat')
}
