// engine/offline.js — Progression offline DofusChill
//
// Au chargement, calcule le temps écoulé depuis la dernière frame enregistrée
// et l'injecte dans _afkSeconds (combat.js). La boucle RAF principale drainera
// ce temps en fast-forward avec un budget CPU de OFFLINE_FRAME_BUDGET_MS ms/frame.
// Si l'équipe meurt sans autopilot → écran de défaite normal.
// Si l'équipe meurt avec autopilot → ticket consommé, HP remis à fond, fast-forward continue.

const OFFLINE_CAP_MS          = 8 * 60 * 60 * 1000  // plafond 8 h
const OFFLINE_MIN_MS          = 10 * 1000            // ignore si < 10 secondes
const _isMobile               = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
const OFFLINE_FRAME_BUDGET_MS = _isMobile ? 4 : 12  // 4ms mobile, 12ms desktop

// ─── Gestion onglet en arrière-plan ──────────────────────────────────────────

let _tabHiddenAt = null

function onTabHidden() {
    if (state.isRunning) _tabHiddenAt = Date.now()
}

// Injecte le temps passé en arrière-plan comme fast-forward (même logique que simulateOfflineProgress).
function onTabVisible() {
    if (_tabHiddenAt === null) return
    const elapsed = Math.min(OFFLINE_CAP_MS, Date.now() - _tabHiddenAt)
    _tabHiddenAt = null
    if (elapsed < OFFLINE_MIN_MS) return
    if (!state.isRunning || !combat || combat.isRaid || combat.isPoutch) return
    _afkSeconds += elapsed / 1000
}

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
    // Les raids utilisent des setTimeout de 500ms pour les respawns → incompatible avec le fast-forward
    // (onTabVisible fait déjà ça correctement ; on aligne simulateOfflineProgress sur ce comportement)
    if (combat?.isRaid || combat?.isPoutch) return
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

// Utilisé depuis le tooltip inventaire pour les items avec offlineMinutes.
function useOfflineBoostItem(itemId) {
    const itm   = item[itemId]
    const entry = state.inventory[itemId]
    if (!itm?.offlineMinutes || !entry || entry.count <= 0) return

    const canApply = state.isRunning && !combat?.isRaid && !combat?.isPoutch

    if (!canApply) {
        openTooltip(
            '⚠️ Aucun combat en cours',
            `<div class="item-sheet">
                <p style="margin-bottom:0.5rem;">Attention, vous êtes sur le point d'utiliser <strong>${itm.name}</strong> alors qu'aucun combat n'est en cours.</p>
                <p style="color:#e07b39;margin-bottom:1rem;font-weight:bold;">Utiliser cet objet n'accordera aucun effet.</p>
                <div style="display:flex;gap:0.5rem;justify-content:flex-end">
                    <button class="forge-btn" onclick="closeTooltip()">Annuler</button>
                    <button class="forge-btn" style="background:#7a3030;border-color:#7a3030" onclick="_applyOfflineBoostItem('${itemId}')">Utiliser quand même</button>
                </div>
            </div>`
        )
        return
    }

    _applyOfflineBoostItem(itemId)
}

function _applyOfflineBoostItem(itemId) {
    const itm   = item[itemId]
    const entry = state.inventory[itemId]
    if (!itm || !entry || entry.count <= 0) return

    const canApply = state.isRunning && !combat?.isRaid && !combat?.isPoutch
    const minutes  = itm.offlineMinutes || 0

    entry.count--
    if (entry.count <= 0) delete state.inventory[itemId]

    if (minutes > 0 && canApply) {
        _afkSeconds += minutes * 60
    }

    saveGame()
    closeAllTooltips()

    const label = minutes >= 60 ? `${minutes / 60}h` : `${minutes} min`
    showNotification(
        canApply
            ? `⏩ ${itm.name} utilisé — +${label} en avance rapide !`
            : `${itm.name} utilisé sans effet.`,
        canApply ? 'success' : 'info'
    )
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
        if (combat) combat.sessionLoot = JSON.parse(JSON.stringify(_autoPilot.accumulated))
        _autoPilot = null
        showSessionSummary('autopilot')
        return
    }
    showSessionSummary('defeat')
}
