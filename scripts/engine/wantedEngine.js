// scripts/engine/wantedEngine.js — Persistance et logique Avis de Recherche

const WANTED_REFRESH_DAYS = 1

// ─── Paliers de déblocage ─────────────────────────────────────────────────────

function _wantedBossUnlockTier(levelCap) {
    if (levelCap <= 40)  return 1
    if (levelCap <= 80)  return 2
    if (levelCap <= 120) return 3
    if (levelCap <= 160) return 4
    return 5
}

const WANTED_TIER_LABELS = {
    1: 'Niv. 1–40',
    2: 'Niv. 41–80',
    3: 'Niv. 81–120',
    4: 'Niv. 121–160',
    5: 'Niv. 161+'
}

const WANTED_TIER_HINT = {
    2: 'Vaincre un boss Niv. 1–40 pour débloquer',
    3: 'Vaincre un boss Niv. 41–80 pour débloquer',
    4: 'Vaincre un boss Niv. 81–120 pour débloquer',
    5: 'Vaincre un boss Niv. 121–160 pour débloquer'
}

// ─── Init état ────────────────────────────────────────────────────────────────

function _initWantedState() {
    if (!state.wanted) state.wanted = { bosses: {}, maxUnlockedTier: 1 }
    if (!state.wanted.bosses) state.wanted.bosses = {}

    // Migration : recalcule maxUnlockedTier depuis les kills existants
    if (!state.wanted.maxUnlockedTier) {
        let max = 1
        for (const [id, ws] of Object.entries(state.wanted.bosses)) {
            const wd = WantedBosses[id]
            if (wd && ws.killCount > 0)
                max = Math.max(max, _wantedBossUnlockTier(wd.levelCap) + 1)
        }
        state.wanted.maxUnlockedTier = max
    }
}

function _wantedBossState(wantedId) {
    _initWantedState()
    if (!state.wanted.bosses[wantedId]) {
        const wd = WantedBosses[wantedId]
        if (!wd) return null
        state.wanted.bosses[wantedId] = {
            currentHp:         wd.bst.hp,
            maxHp:             wd.bst.hp,
            killCount:         0,
            statMultiplier:    1.0,
            bestSessionDamage: 0
        }
    }
    return state.wanted.bosses[wantedId]
}

// ─── Pool triennal ────────────────────────────────────────────────────────────

function _wantedPoolStale() {
    if (!state.wanted?.pool) return true
    const ms = new Date(_todayStr()) - new Date(state.wanted.pool.date)
    return ms / 86400000 >= WANTED_REFRESH_DAYS
}

function _refreshWantedPool() {
    if (!_wantedPoolStale()) return
    _initWantedState()

    const today = _todayStr()
    const seed  = _dateSeed(today)

    const all     = Object.keys(WantedBosses)
    const bucket1 = all.filter(id => WantedBosses[id].levelCap <= 80)
    const bucket2 = all.filter(id => WantedBosses[id].levelCap > 80  && WantedBosses[id].levelCap <= 130)
    const bucket3 = all.filter(id => WantedBosses[id].levelCap > 130 && WantedBosses[id].levelCap <= 190)
    const bucket4 = all.filter(id => WantedBosses[id].levelCap > 190)

    const pick = (arr, n, offset) =>
        _seededShuffle(arr, (seed + offset * 2654435761) >>> 0).slice(0, n)

    state.wanted.pool = {
        date:   today,
        bosses: [
            ...pick(bucket1, 3, 0),
            ...pick(bucket2, 3, 1),
            ...pick(bucket3, 3, 2),
            ...pick(bucket4, 5, 3)
        ]
    }
    saveGame()
}

// ─── Accessibilité des paliers ────────────────────────────────────────────────

// Tier minimum effectivement présent dans le pool (pour auto-passer les tiers absents)
function _wantedMinPoolTier() {
    const pool = state.wanted?.pool?.bosses || []
    if (!pool.length) return 1
    return Math.min(...pool.map(id => {
        const wd = WantedBosses[id]
        return wd ? _wantedBossUnlockTier(wd.levelCap) : 99
    }))
}

function _wantedTierAccessible(tier) {
    const min    = _wantedMinPoolTier()
    const maxUnl = state.wanted?.maxUnlockedTier || 1
    if (tier <  min) return true    // palier absent du pool → pas de verrou
    if (tier === min) return true   // premier palier disponible → toujours ouvert
    return maxUnl >= tier
}

// ─── Countdown ────────────────────────────────────────────────────────────────

function nextWantedRefreshLabel() {
    const now = new Date()
    return _countdownLabel(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1))
}

// ─── Victoire / Défaite ───────────────────────────────────────────────────────

function _onWantedVictory(wantedId) {
    const ws = _wantedBossState(wantedId)
    const wd = WantedBosses[wantedId]
    if (!ws || !wd) return

    ws.killCount++
    ws.statMultiplier = Math.min(1.0 + ws.killCount * 0.1, 2.0)

    const sessionDamage = combat.wantedStartHp || 0
    if (ws.killCount >= 20 && sessionDamage > 0)
        ws.bestSessionDamage = Math.max(ws.bestSessionDamage || 0, sessionDamage)

    ws.maxHp     = Math.round(wd.bst.hp * ws.statMultiplier)
    ws.currentHp = ws.maxHp

    // Déblocage du palier suivant (permanent)
    const killedTier = _wantedBossUnlockTier(wd.levelCap)
    state.wanted.maxUnlockedTier = Math.max(state.wanted.maxUnlockedTier || 1, killedTier + 1)

    for (const itemId of (wd.panoplie || [])) {
        addToInventory(itemId)
        if (combat.sessionLoot) combat.sessionLoot.itemDrops.push({ itemId, level: 0 })
    }
    // saveGame() est appelé par combat.js APRÈS stopCombat()
}

function _onWantedDefeat(wantedId) {
    const ws = _wantedBossState(wantedId)
    if (!ws) return
    ws.maxHp     = Math.max(1, combat.enemy?.maxHp     ?? ws.maxHp)
    ws.currentHp = Math.max(0, combat.enemy?.currentHp ?? 0)
    // saveGame() est appelé par combat.js APRÈS stopCombat()
}
