// scripts/engine/bossUltimeEngine.js — Persistance et logique Boss Ultime
//
// Le combat lui-même passe entièrement par le moteur normal (scripts/engine/combat.js) :
// ce fichier ne gère que la persistance des PV entre sessions, la limite d'un combat/jour,
// et le changement de phase en cours de combat. Calqué sur wantedEngine.js.

// ─── Init état ────────────────────────────────────────────────────────────────

function _bossUltimeDragonState(dragonId) {
    if (!state.BossUltime) state.BossUltime = { dragons: {} }
    if (!state.BossUltime.dragons) state.BossUltime.dragons = {}
    if (!state.BossUltime.dragons[dragonId]) {
        state.BossUltime.dragons[dragonId] = {
            phase:         1,
            lastFightDate: null,
            firstVictory:  false
        }
    }
    const ds = state.BossUltime.dragons[dragonId]
    // Entrée neuve (pas encore de PV) ou héritée de l'ancien système / save corrompue :
    // (re)calcule maxHp ET currentHp ensemble depuis les PV de base du monstre.
    if (typeof ds.maxHp !== 'number' || !(ds.maxHp > 0)) {
        ds.maxHp     = monsters[dragonId]?.bst.hp ?? 1
        ds.currentHp = ds.maxHp
    }
    if (typeof ds.currentHp !== 'number' || ds.currentHp < 0) {
        ds.currentHp = ds.maxHp
    }
    if (ds.phase !== 1 && ds.phase !== 2) ds.phase = 1
    return ds
}

function bossUltimeCanFight(dragonId) {
    const ds = _bossUltimeDragonState(dragonId)
    return ds.lastFightDate !== _todayStr()
}

function nextBossUltimeResetLabel() {
    const now = new Date()
    return _countdownLabel(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1))
}

// ─── Victoire / Défaite ───────────────────────────────────────────────────────

function _onBossUltimeVictory(dragonId) {
    const ds = _bossUltimeDragonState(dragonId)
    const bd = BossUltimeDragons[dragonId]
    if (!bd) return
    const isFirst = !ds.firstVictory

    if (bd.reward?.kamas) {
        state.kamas = (state.kamas || 0) + bd.reward.kamas
        showNotification(`+${bd.reward.kamas} kamas — ${bd.name} vaincu !`, 'success')
    }
    if (bd.reward?.item) {
        addToInventory(bd.reward.item)
        const itm = item[bd.reward.item]
        showNotification(`${itm?.name || bd.reward.item} obtenu ! — ${bd.name} vaincu !`, 'success')
    }

    if (isFirst) {
        ds.firstVictory = true
        if (dragonId === 'dragon_ignemikhal') {
            if (!state.unlockedClasses) state.unlockedClasses = []
            if (!state.unlockedClasses.includes('eliotrope')) {
                state.unlockedClasses.push('eliotrope')
                if (!state.newlyUnlockedClasses) state.newlyUnlockedClasses = []
                state.newlyUnlockedClasses.push('eliotrope')
                showNotification('Classe débloquée : Éliotrope !', 'success')
            }
        }
    }

    ds.currentHp      = monsters[dragonId]?.bst.hp ?? ds.maxHp
    ds.maxHp          = monsters[dragonId]?.bst.hp ?? ds.maxHp
    ds.phase          = 1
    ds.lastFightDate  = _todayStr()
    // saveGame() est appelé par combat.js APRÈS stopCombat()
}

function _onBossUltimeDefeat(dragonId) {
    const ds = _bossUltimeDragonState(dragonId)
    ds.maxHp          = Math.max(1, combat.enemy?.maxHp     ?? ds.maxHp)
    ds.currentHp      = Math.max(0, combat.enemy?.currentHp ?? 0)
    ds.phase          = combat.enemy?.phase ?? ds.phase
    ds.lastFightDate  = _todayStr()
    // saveGame() est appelé par combat.js APRÈS stopCombat()
}

// ─── Changement de phase en cours de combat ───────────────────────────────────

function _checkBossUltimePhase() {
    const dragonId = combat.isBossUltime
    const bd       = BossUltimeDragons[dragonId]
    const enemy    = combat.enemy
    if (!bd?.phase2 || !enemy || enemy.phase === 2) return
    const ratio = enemy.currentHp / enemy.maxHp
    if (ratio > bd.phase2Threshold) return

    enemy.phase = 2
    enemy.atk   = bd.phase2.bst.atk ?? enemy.atk
    if (bd.phase2.bst.res) enemy.res = { ...bd.phase2.bst.res }
    if (bd.phase2.image)   enemy.image = bd.phase2.image
    enemy.moves     = resolveMonsterMoves(bd.phase2.moves)
    enemy.moveIndex = 0
    addLog(`⚠ ${enemy.name} entre en Phase 2 !`)
    if (typeof updateCombatUI === 'function') updateCombatUI()
}
