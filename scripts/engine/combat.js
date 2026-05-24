// engine/combat.js — Boucle de combat auto-battler DofusChill
//
// Chaque membre + l'ennemi a une barre de progression (0–100).
// La barre avance proportionnellement à la vitesse de lancé du sort
// À 100%, l'entité exécute son action et la barre se remet à 0.

const TICK_MS    = 1000 / 60   // 60 fps
const BASE_TIME  = 2000        // ms pour remplir la barre


let _rafId         = null
let _lastFrameTime = 0
let _accumulator   = 0
let combat         = null   // état du combat en cours
let _autoPilot        = null   // { remaining: N, accumulated: sessionLoot } | null
let _dungeonAutoRun   = null   // { accumulated: sessionLoot } | null — relance auto donjon
let _afkSeconds       = 0      // secondes d'absence à rattraper en fast-forward

// ─── Boucle de jeu (requestAnimationFrame) ────────────────────────────────────

function _gameLoop(now) {
    _rafId = requestAnimationFrame(_gameLoop)
    const delta = Math.min(now - _lastFrameTime, 250)
    _lastFrameTime = now
    state.lastFrameRecorded = Date.now()
    if (!state.isRunning || !combat) { _accumulator = 0; return }

    // Fast-forward AFK : drainer le temps accumulé avec un budget CPU par frame
    if (_afkSeconds > 0) {
        const frameStart = performance.now()
        while (_afkSeconds > 0 && performance.now() - frameStart < OFFLINE_FRAME_BUDGET_MS) {
            gameTick()
            _afkSeconds = Math.max(0, _afkSeconds - TICK_MS / 1000)
        }
        if (state.isRunning) updateCombatUI()
        if (_afkSeconds <= 0) saveGame()
        return
    }

    _accumulator += delta
    while (_accumulator >= TICK_MS) {
        gameTick()
        _accumulator -= TICK_MS
    }
}

function startGameLoop() {
    if (_rafId) cancelAnimationFrame(_rafId)
    _lastFrameTime = performance.now()
    _accumulator   = 0
    _rafId = requestAnimationFrame(_gameLoop)
}

// Snapshote l'état du combat vers state avant chaque sauvegarde.
function _syncCombatToState() {
    state.autoPilotAccumulated = _autoPilot
        ? JSON.parse(JSON.stringify(_autoPilot.accumulated)) : null
    if (!combat || !state.isRunning || combat.isRaid || combat.isPoutch) {
        state.savedCombatEnemy = null
        state.savedCombatState = null
        return
    }
    state.savedCombatEnemy = combat.enemy ? {
        id:             combat.enemy.id,
        name:           combat.enemy.name,
        element:        combat.enemy.element,
        level:          combat.enemy.level,
        image:          combat.enemy.image,
        maxHp:          combat.enemy.maxHp,
        currentHp:      combat.enemy.currentHp,
        atk:            combat.enemy.atk,
        spd:            combat.enemy.spd,
        res:            { ...combat.enemy.res },
        finalDamagePct: combat.enemy.finalDamagePct,
        flatDamage:     combat.enemy.flatDamage,
        moves:          [...(combat.enemy.moves || [])],
        moveIndex:      combat.enemy.moveIndex || 0,
        rarity:         combat.enemy.rarity,
        tier:           combat.enemy.tier,
        dropRate:       combat.enemy.dropRate,
        isArchi:        combat.enemy.isArchi || false,
        buffs:          JSON.parse(JSON.stringify(combat.enemy.buffs || [])),
        dots:           JSON.parse(JSON.stringify(combat.enemy.dots  || [])),
    } : null
    state.savedCombatState = {
        memberTimers:       [...combat.memberTimers],
        memberMoveIndex:    [...combat.memberMoveIndex],
        activeMemberIndex:  combat.activeMemberIndex,
        enemyTimer:         combat.enemyTimer,
        memberKillCount:    { ...combat.memberKillCount },
        memberPassiveState: JSON.parse(JSON.stringify(combat.memberPassiveState || {})),
        spellStacks:        JSON.parse(JSON.stringify(combat.spellStacks        || {})),
        sessionLoot:        JSON.parse(JSON.stringify(combat.sessionLoot)),
        syncedLevel:        combat.syncedLevel || null,
    }
}

// ─── gestion de l'xp ────────────────────────────────────────────────────────

const RARITY_MULTIPLIER = {
    commun: 1,
    peu_commun: 1.15,
    rare: 1.35,
    legendaire: 2
}

const TIER_MULTIPLIER = {
    normal: 1,
    elite: 2,
    boss: 3
}

function getBaseMobXP(level) {
    return 20 + (level * 8)
}

function getLevelPenalty(playerLevel, mobLevel) {
    const diff = playerLevel - mobLevel

    // Fenêtre XP : mob plus de 9 niveaux en dessous du joueur → 0 XP
    if (diff > 9) return 0

    // Mob plus fort que le joueur → léger bonus
    if (diff < 0) return 1 + Math.abs(diff) * 0.05

    // Dans la fenêtre (diff 0–9) : réduction douce, minimum 20%
    return Math.max(0.2, 1 - diff * 0.05)
}

function calculateXPReward(enemy, member) {

    const baseXP = getBaseMobXP(enemy.level)

    const rarityMult = RARITY_MULTIPLIER[enemy.rarity] || 1

    const tierMult = TIER_MULTIPLIER[enemy.tier] || 1

    const levelPenalty = getLevelPenalty(member.level, enemy.level)

    const SKULL_MULT = [1, 2, 3, 5]
    const skullMult = SKULL_MULT[state.skullLevel] || 1

    return Math.floor(baseXP * rarityMult * tierMult * levelPenalty * skullMult)
}

// ─── Spawn de l'ennemi ────────────────────────────────────────────────────────

function randomInt(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min
}

function spawnEnemy(areaId) {
    const area = areas[areaId]
    if (!area) return null

    // Sélection pondérée — dropRateElite booste le poids des mobs elite/rare/légendaire
    const _eliteBonus = (getAllFamiliarBonuses().dropRateElite || 0) / 100
    const _spawns = _eliteBonus > 0
        ? area.spawns.map(sp => {
            const m = monsters[sp.id]
            const isElite = m && (m.tier === 'elite' || m.rarity === 'rare' || m.rarity === 'legendaire')
            return isElite ? { id: sp.id, weight: sp.weight * (1 + _eliteBonus) } : sp
        })
        : area.spawns
    const total = _spawns.reduce((s, sp) => s + sp.weight, 0)
    let roll    = Math.random() * total
    let spawnId = _spawns[_spawns.length - 1].id
    for (const sp of _spawns) {
        roll -= sp.weight
        if (roll <= 0) { spawnId = sp.id; break }
    }

    const mob      = monsters[spawnId]
    const mobLevel = mob.fixedLevel ?? randomInt(area.mobMinLevel, area.mobMaxLevel)
    const scale    = mob.fixedLevel != null ? 1 : 1 + (mobLevel - area.mobMinLevel) * 0.05


    if (!state.seenMonsters) state.seenMonsters = {}
    state.seenMonsters[spawnId] = true

    const enemy = {
        id:       spawnId,
        name:     mob.name,
        element:  mob.element,
        level:    mobLevel,
        image:    mob.image,
        maxHp:    Math.floor(mob.bst.hp  * scale),
        currentHp:Math.floor(mob.bst.hp  * scale),
        atk:      Math.floor(mob.bst.atk * scale),
        spd:      mob.bst.spd,          // vitesse native 100 (pas de scaling par niveau)
        res:      { ...mob.bst.res },
        finalDamagePct: 0,
        flatDamage:     0,
        moves:     mob.moves || [],
        moveIndex: 0,
        rarity:    mob.rarity   || 'commun',
        tier:      mob.tier     || 'normal',
        dropRate:  mob.dropRate
    }

    // Chance d'archimonstre selon niveau skull : 1/600, 1/500, 1/450, 1/400
    const SKULL_ARCHI_CHANCE = [1 / 600, 1 / 500, 1 / 450, 1 / 400]
    const archiChance = SKULL_ARCHI_CHANCE[state.skullLevel] || 1 / 400
    if (Math.random() < archiChance) {
        enemy.isArchi   = true
        enemy.maxHp     = Math.floor(enemy.maxHp * 2)
        enemy.currentHp = enemy.maxHp
        enemy.atk       = Math.floor(enemy.atk   * 2)
        enemy.name      = `Archi-${enemy.name}`
    }

    // Difficulté modulée : multiplicateur skull appliqué après l'archi
    const SKULL_MULT = [1, 2, 3, 5]
    const skullMult  = SKULL_MULT[state.skullLevel] || 1
    if (skullMult > 1) {
        enemy.maxHp     = Math.floor(enemy.maxHp * skullMult)
        enemy.currentHp = enemy.maxHp
        enemy.atk       = Math.floor(enemy.atk   * skullMult)
    }

    return enemy
}

// ─── Démarrage / arrêt ────────────────────────────────────────────────────────

function startCombat(areaId) {
    // Détecte si on reprend un combat sauvegardé (rechargement de page)
    const _isResume = !!(
        state.savedCombatEnemy &&
        state.savedCombatState &&
        state.currentArea === areaId
    )
    // stopCombat restaure les équipements skull ; on le saute sur reprise car
    // l'état déséquipé est déjà dans state.team tel que sauvegardé.
    if (!_isResume) stopCombat()
    state.currentArea = areaId
    state.isRunning   = true

    // Donjon + relance auto : initialise l'accumulateur si pas déjà actif
    if (areas[areaId]?.type === 'dungeon' && state.dungeonAutoRestart) {
        if (!_dungeonAutoRun) _dungeonAutoRun = { accumulated: _emptySessionLoot() }
    } else if (areas[areaId]?.type !== 'dungeon') {
        _dungeonAutoRun = null
    }

    // Niveau synchro pour le mode modulé (skull > 0 → niveau = maxLevel de la zone)
    const _startArea   = areas[areaId]
    const _syncedLevel = (state.skullLevel > 0 && _startArea?.maxLevel)
        ? _startArea.maxLevel : null

    // Auto-déséquipement sur départ frais uniquement
    if (!_isResume && _syncedLevel !== null) {
        const unequipped = {}
        for (const m of state.team) {
            if (!m) continue
            for (const slot of Object.keys(m.equip || {})) {
                const itemId = m.equip[slot]
                if (!itemId) continue
                const reqLvl = item[itemId]?.requiredLevel
                if (reqLvl && reqLvl > _syncedLevel) {
                    if (!unequipped[m.classId]) unequipped[m.classId] = {}
                    unequipped[m.classId][slot] = itemId
                    m.equip[slot] = null
                }
            }
        }
        if (Object.keys(unequipped).length > 0) {
            state.skullUnequipped = unequipped
            const count = Object.values(unequipped).reduce((s, slots) => s + Object.keys(slots).length, 0)
            showNotification(`${count} équipement${count > 1 ? 's' : ''} retiré${count > 1 ? 's' : ''} (niveau trop élevé pour cette zone modulée)`, 'warning')
        }
    }

    // Réinitialise les HP seulement sur départ frais (reprise : HP sauvegardés dans state.team)
    if (!_isResume) {
        for (const m of state.team) {
            if (!m) continue
            const stats = getEffectiveStats(m, _syncedLevel)
            if (stats) { m.maxHp = stats.hp; m.currentHp = stats.hp }
            m.buffs  = []
            m.dots   = []
            m.hots   = []
            m.shield = null
        }
    }

    combat = {
        syncedLevel:        _isResume ? (state.savedCombatState?.syncedLevel ?? _syncedLevel) : _syncedLevel,
        memberTimers:       state.team.map(() => 0),
        memberMoveIndex:    state.team.map(() => 0),
        activeMemberIndex:  0,
        enemyTimer:         0,
        log:                [],
        pendingLoot:        null,
        savedEnemy:         null,
        memberKillCount:    {},
        memberPassiveState: {},
        memberDeathHandled: {},
        spellStacks:        {},
        sessionLoot:        _emptySessionLoot()
    }

    if (_isResume && state.savedCombatState) {
        // Restaure les timers, loot et états passifs depuis la sauvegarde
        const sc = state.savedCombatState
        if (sc.memberTimers)              combat.memberTimers       = [...sc.memberTimers]
        if (sc.memberMoveIndex)           combat.memberMoveIndex    = [...sc.memberMoveIndex]
        if (sc.activeMemberIndex != null) combat.activeMemberIndex  = sc.activeMemberIndex
        if (sc.enemyTimer        != null) combat.enemyTimer         = sc.enemyTimer
        if (sc.memberKillCount)           combat.memberKillCount    = { ...sc.memberKillCount }
        if (sc.memberPassiveState)        combat.memberPassiveState = JSON.parse(JSON.stringify(sc.memberPassiveState))
        if (sc.spellStacks)               combat.spellStacks        = JSON.parse(JSON.stringify(sc.spellStacks))
        if (sc.sessionLoot)               combat.sessionLoot        = JSON.parse(JSON.stringify(sc.sessionLoot))
        state.savedCombatState = null
    } else {
        // Pré-calcul des états passifs initiaux
        for (let i = 0; i < state.team.length; i++) {
            const m = state.team[i]
            if (!m) continue
            const passive = classes[m.classId]?.passive
            combat.memberPassiveState[i] = {}
            if (passive?.id === 'pandawa')     combat.memberPassiveState[i].state = 'normal'
            if (passive?.id === 'huppermage') {
                const slots    = ['slot1', 'slot2', 'slot3', 'slot4']
                const elements = slots.map(s => {
                    const mid = m.moves?.[s]
                    if (!mid) return null
                    const mv  = move[mid]
                    const eff = mv?.effects?.find(e => e.type === 'damage' || e.type === 'dot')
                    return eff?.element || null
                }).filter(Boolean)
                combat.memberPassiveState[i].huppermageBonus =
                    elements.length === 4 && new Set(elements).size === 4
            }
        }
    }

    if (_isResume && state.savedCombatEnemy) {
        combat.enemy = JSON.parse(JSON.stringify(state.savedCombatEnemy))
        combat.enemyNextMoveId = pickNextEnemyMove(combat.enemy)
        state.savedCombatEnemy = null
    } else if (areas[areaId]?.type === 'raid') {
        _initRaidCombat(areaId)
    } else {
        combat.enemy = spawnEnemy(areaId)
        combat.enemyNextMoveId = pickNextEnemyMove(combat.enemy)
    }

    document.getElementById('content-explore').style.display = 'flex'
    document.getElementById('area-end').style.display    = 'none'
    const exploreTeam       = document.getElementById('explore-team')
    const exploreLeave      = document.getElementById('explore-leave')
    const enemyDisplay      = document.getElementById('enemy-display')
    const raidEnemyDisplay  = document.getElementById('raid-enemy-display')
    if (exploreTeam)      exploreTeam.style.display  = ''
    if (exploreLeave)     exploreLeave.style.display = ''
    if (enemyDisplay)     enemyDisplay.style.display     = combat.isRaid ? 'none' : ''
    if (raidEnemyDisplay) raidEnemyDisplay.style.display = combat.isRaid ? 'flex' : 'none'
    const menuParent = document.getElementById('menu-button-parent')
    if (menuParent) menuParent.style.display = ''
    updateCombatUI()
}

function stopCombat() {
    state.isRunning = false
    // Restauration des équipements retirés pour modulation skull
    if (state.skullUnequipped) {
        for (const m of state.team) {
            if (!m || !state.skullUnequipped[m.classId]) continue
            if (!m.equip) m.equip = {}
            for (const [slot, itemId] of Object.entries(state.skullUnequipped[m.classId])) {
                m.equip[slot] = itemId
            }
        }
        state.skullUnequipped = null
    }
}

function exitCombat() {
    state.savedCombatEnemy = null
    state.savedCombatState = null
    stopCombat()
    state.currentArea = null
    combat = null

    // Remet les HP à fond entre deux sessions (XP/niveau conservés)
    for (const m of state.team) {
        if (!m) continue
        const stats = getEffectiveStats(m)
        if (stats) { m.maxHp = stats.hp; m.currentHp = stats.hp }
        m.buffs = []
    }

    advanceTutorial('outro')
    document.getElementById('content-explore').style.display = 'none'
    document.getElementById('area-end').style.display = 'none'
    const raidDisplay = document.getElementById('raid-enemy-display')
    if (raidDisplay) raidDisplay.style.display = 'none'
    const menuParent = document.getElementById('menu-button-parent')
    if (menuParent) menuParent.style.display = state.hasChosenStarter ? '' : 'none'
    saveGame()
    if (typeof updateCollectionUI === 'function') updateCollectionUI()
    switchMenu('worldmap')
}

function leaveCombat() {
    state.savedCombatEnemy = null
    state.savedCombatState = null
    if (combat?.isPoutch) {
        onPoutchEnd()
        return
    }
    stopCombat()
    if (_autoPilot) {
        _mergeSessionLoot(_autoPilot.accumulated, combat?.sessionLoot)
        if (combat) combat.sessionLoot = _autoPilot.accumulated
        _autoPilot = null
    }
    if (_dungeonAutoRun) {
        _mergeSessionLoot(_dungeonAutoRun.accumulated, combat?.sessionLoot)
        if (combat) combat.sessionLoot = _dungeonAutoRun.accumulated
        _dungeonAutoRun = null
    }
    showSessionSummary('leave')
}

function rejoinArea() {
    if (!state.currentArea) return
    const area = areas[state.currentArea]
    if (area?.keyId) {
        const keyCount = state.inventory[area.keyId]?.count || 0
        if (keyCount === 0) {
            showNotification('Aucune clé disponible pour ce donjon !', 'error')
            return
        }
    }
    document.getElementById('main-content').style.zIndex = ''
    const areaToRejoin = state.currentArea
    playZaapTransition(() => startCombat(areaToRejoin))
}

// ─── Pilote automatique ───────────────────────────────────────────────────────

function _emptySessionLoot() {
    return { itemDrops: [], familiarDrops: [], caisseCount: 0, keyDrops: {}, kamasFromDrops: 0, killCount: 0, memberDamage: {}, memberDamageReceived: {}, learnedMoves: [] }
}

function _mergeSessionLoot(dest, src) {
    if (!src) return
    dest.itemDrops.push(...(src.itemDrops || []))
    dest.familiarDrops.push(...(src.familiarDrops || []))
    dest.caisseCount    += src.caisseCount    || 0
    dest.kamasFromDrops += src.kamasFromDrops || 0
    dest.killCount      += src.killCount      || 0
    dest.learnedMoves.push(...(src.learnedMoves || []))
    for (const [idx, dmg] of Object.entries(src.memberDamage || {})) {
        dest.memberDamage[idx] = (dest.memberDamage[idx] || 0) + dmg
    }
    for (const [idx, dmg] of Object.entries(src.memberDamageReceived || {})) {
        dest.memberDamageReceived[idx] = (dest.memberDamageReceived[idx] || 0) + dmg
    }
    for (const [keyId, count] of Object.entries(src.keyDrops || {})) {
        dest.keyDrops[keyId] = (dest.keyDrops[keyId] || 0) + count
    }
}

function startAutoPilot(qty) {
    const available = state.inventory['piloteAutomatique']?.count || 0
    const n = qty === 'max' ? available : Math.min(qty, available)
    if (n <= 0) return
    _autoPilot = { remaining: n, accumulated: _emptySessionLoot() }
    state.offlineAutoPilotRemaining = n
    rejoinArea()
}

function _consumeAutoPilotTicket() {
    const entry = state.inventory['piloteAutomatique']
    if (!entry) return
    entry.count--
    if (entry.count <= 0) delete state.inventory['piloteAutomatique']
}

// ─── Mode Poutch ─────────────────────────────────────────────────────────────

function startPoutchCombat(mode) {
    stopCombat()
    state.currentArea = null
    state.isRunning   = true
    _dungeonAutoRun   = null
    _autoPilot        = null

    for (const m of state.team) {
        if (!m) continue
        const stats = getEffectiveStats(m)
        if (stats) { m.maxHp = stats.hp; m.currentHp = stats.hp }
        m.buffs  = []
        m.dots   = []
        m.hots   = []
        m.shield = null
    }

    combat = {
        memberTimers:       state.team.map(() => 0),
        memberMoveIndex:    state.team.map(() => 0),
        activeMemberIndex:  0,
        enemyTimer:         0,
        log:                [],
        pendingLoot:        null,
        savedEnemy:         null,
        memberKillCount:    {},
        memberPassiveState: {},
        memberDeathHandled: {},
        spellStacks:        {},
        isPoutch:           true,
        poutchMode:         mode,
        poutchTurns:        0,
        poutchBiggestHit:   0,
        sessionLoot: {
            itemDrops: [], familiarDrops: [], killCount: 0,
            memberDamage: {}, memberDamageReceived: {},
            learnedMoves: [], kamasFromDrops: 0, keyDrops: {}
        }
    }

    for (let i = 0; i < state.team.length; i++) {
        const m = state.team[i]
        if (!m) continue
        const passive = classes[m.classId]?.passive
        combat.memberPassiveState[i] = {}
        if (passive?.id === 'pandawa') combat.memberPassiveState[i].state = 'normal'
        if (passive?.id === 'huppermage') {
            const slots    = ['slot1', 'slot2', 'slot3', 'slot4']
            const elements = slots.map(s => {
                const mid = m.moves?.[s]
                if (!mid) return null
                const mv  = move[mid]
                const eff = mv?.effects?.find(e => e.type === 'damage' || e.type === 'dot')
                return eff?.element || null
            }).filter(Boolean)
            combat.memberPassiveState[i].huppermageBonus =
                elements.length === 4 && new Set(elements).size === 4
        }
    }

    const mob      = monsters.poutch
    const poutchHp = mob.bst.hp
    combat.enemy = {
        id:          'poutch',
        name:        'Poutch',
        level:       1,
        image:       mob.image,
        maxHp:       poutchHp,
        currentHp:   poutchHp,
        atk:         mob.bst.atk,
        spd:         mob.bst.spd,
        res:         { ...mob.bst.res },
        finalDamagePct: 0,
        flatDamage:     0,
        moves:       mob.moves || [],
        moveIndex:   0,
        rarity:      'commun',
        tier:        'normal',
        dropRate:    0,
        buffs:       [],
        dots:        []
    }
    combat.enemyNextMoveId = pickNextEnemyMove(combat.enemy)

    document.getElementById('content-explore').style.display = 'flex'
    document.getElementById('area-end').style.display        = 'none'
    const exploreTeam  = document.getElementById('explore-team')
    const exploreLeave = document.getElementById('explore-leave')
    const enemyDisplay = document.getElementById('enemy-display')
    if (exploreTeam)  exploreTeam.style.display  = ''
    if (exploreLeave) exploreLeave.style.display = ''
    if (enemyDisplay) enemyDisplay.style.display = ''
    const menuParent = document.getElementById('menu-button-parent')
    if (menuParent) menuParent.style.display = ''
    updateCombatUI()
}

function onPoutchEnd() {
    if (combat?.respawnPending) return
    if (combat) combat.respawnPending = true
    stopCombat()
    if (combat) combat.enemy = null
    showPoutchSummary('end')
}

// ─── Tick principal ───────────────────────────────────────────────────────────

function gameTick() {
    if (!combat) return
    if (combat.isRaid) {
        raidGameTick()
        if (state.isRunning) updateCombatUI()
        return
    }
    if (!combat.enemy) return
    try {

    // Garde-fou : HP NaN → 0 pour éviter la boucle infinie
    for (const m of state.team) {
        if (m && isNaN(m.currentHp)) m.currentHp = 0
    }
    if (combat.enemy && isNaN(combat.enemy.currentHp)) combat.enemy.currentHp = 0

    // Avance le timer du membre actif uniquement
    _autoSwitchActive()
    const activeIdx = combat.activeMemberIndex
    const activeM   = state.team[activeIdx]
    if (activeM && activeM.currentHp > 0) {
        const stats = getEffectiveStats(activeM)
        const rate  = (100 / (BASE_TIME / TICK_MS)) * ((stats?.spd ?? activeM.spd ?? 100) / 100)
        combat.memberTimers[activeIdx] = (combat.memberTimers[activeIdx] || 0) + rate

        if (combat.memberTimers[activeIdx] >= 100) {
            combat.memberTimers[activeIdx] = 0
            if (combat.enemy && combat.enemy.currentHp > 0 && !combat.respawnPending) executeMemberAction(activeIdx)
        }
    }

    // Timer de l'ennemi (vitesse effective = spd + buffs/debuffs de vitesse)
    if (combat.enemy && combat.enemy.currentHp > 0 && !combat.respawnPending) {
        let effectiveEnemySpd = combat.enemy.spd || 100
        for (const b of (combat.enemy.buffs || [])) {
            if (b.stat === 'spd') effectiveEnemySpd += b.value
        }
        effectiveEnemySpd = Math.max(1, effectiveEnemySpd)
        const rate = (100 / (BASE_TIME / TICK_MS)) * (effectiveEnemySpd / 100)
        combat.enemyTimer = (combat.enemyTimer || 0) + rate
        if (combat.enemyTimer >= 100) {
            combat.enemyTimer = 0
            executeEnemyAction()
        }
    }

    if (state.isRunning && _afkSeconds <= 0) updateCombatUI()
    } catch(e) { console.error('[gameTick]', e) }
}

// ─── Actions ─────────────────────────────────────────────────────────────────

function executeMemberAction(memberIndex) {

    const member = state.team[memberIndex]
    if (!member) return

    // DOTs du membre tick avant son action
    tickDots(member, () => {
        _autoSwitchActive()
        if (state.team.every(m => !m || m.currentHp <= 0)) onDefeat()
    })
    if (member.currentHp <= 0) return
    tickHots(member)

    const stats = getEffectiveStats(member) ?? member._stats

    const slots = ['slot1', 'slot2', 'slot3', 'slot4']
    const nonNull = slots.filter(s => {
        if (!member.moves[s]) return false
        if (!combat.syncedLevel) return true
        const cls = classes[member.classId]
        const moveId = member.moves[s]
        if (moveId === cls?.startingMove) return true
        const unlockLvl = Object.entries(cls?.learnset || {}).find(([, v]) => v === moveId)?.[0]
        return !unlockLvl || parseInt(unlockLvl) <= combat.syncedLevel
    })

    if (!nonNull.length) return

    // Rotation : Xelor = ping-pong 1-2-3-4-3-2-1 (7 pas), autres = cyclique
    const XELOR_PATTERN  = [0, 1, 2, 3, 2, 1, 0]
    const isXelor        = classes[member.classId]?.passive?.id === 'xelor' && nonNull.length === 4
    const rawMoveIdx     = combat.memberMoveIndex[memberIndex]

    let idx, prevNonNullIdx
    if (isXelor) {
        idx            = XELOR_PATTERN[rawMoveIdx % 7]
        prevNonNullIdx = XELOR_PATTERN[(rawMoveIdx + 6) % 7]
    } else {
        idx            = rawMoveIdx % nonNull.length
        prevNonNullIdx = (idx - 1 + nonNull.length) % nonNull.length
    }

    const moveId = member.moves[nonNull[idx]]
    combat.memberMoveIndex[memberIndex]++

    const rawMv = move[moveId]
    if (!rawMv) return
    const effectiveLvl = combat.syncedLevel ? Math.min(member.level, combat.syncedLevel) : member.level
    const mv = applyProgression(rawMv, effectiveLvl)

    if (!mv?.effects) return

    const rawPrevMv = move[member.moves[nonNull[prevNonNullIdx]]]
    const prevMv    = rawPrevMv ? applyProgression(rawPrevMv, effectiveLvl) : null

    // exécution des effets
    let lastDamageDealt = 0
    let sessionDmg = 0
    for (const effect of mv.effects) {
        const dmg = executeEffect({
            caster: member, casterStats: stats, targetEnemy: combat.enemy,
            effect, moveData: mv, prevMv, lastDamageDealt, moveId,
            onTargetKill: () => {
                if (combat.enemy?.isSummon) returnToOwner()
                else onVictory()
            }
        })
        if (dmg !== undefined) { lastDamageDealt = dmg; sessionDmg += dmg }
    }
    if (sessionDmg > 0) {
        combat.sessionLoot.memberDamage[memberIndex] = (combat.sessionLoot.memberDamage[memberIndex] || 0) + sessionDmg
        if (combat.isPoutch && sessionDmg > (combat.poutchBiggestHit || 0)) {
            combat.poutchBiggestHit = sessionDmg
        }
    }

    // Décompte des actions de l'invocation alliée
    if (member.isSummon && member.ownerSlot !== undefined) {
        member.actionsRemaining--
        if (member.actionsRemaining <= 0) returnAllyToOwner(member.ownerSlot)
    }

    // Décompte des tours en mode Poutch limité
    if (combat.isPoutch && typeof combat.poutchMode === 'number' && !combat.respawnPending) {
        combat.poutchTurns = (combat.poutchTurns || 0) + 1
        if (combat.poutchTurns >= combat.poutchMode) {
            onPoutchEnd()
            return
        }
    }

    _applyHealOnCast(member, mv)
    tickBuffs(member)

    // ─── Passifs déclenchés après l'action ───────────────────────────────────
    const newRawIdx   = combat.memberMoveIndex[memberIndex]  // après incrément
    const cycleLength = isXelor ? 7 : nonNull.length
    _applyPassiveTick(member, memberIndex, newRawIdx, cycleLength)

    combat.memberTimers[memberIndex] = 100 - ((mv.cooldownMs ?? BASE_TIME) / BASE_TIME * 100)
}

// ─── Passifs déclenchés par tick / cycle ─────────────────────────────────────

function _applyPassiveTick(member, memberIndex, newRawIdx, cycleLength, slotEnemy) {
    const passive = classes[member.classId]?.passive
    if (!passive) return

    // ─── Périodiques (toutes les N actions) ──────────────────────────────────

    // Eniripsa : tous les 6 sorts, soigne un membre vivant aléatoire de 20% PV max
    if (passive.id === 'eniripsa' && newRawIdx % 6 === 0) {
        const living = state.team.filter(m => m && m.currentHp > 0)
        if (living.length) {
            const target  = living[Math.floor(Math.random() * living.length)]
            const healAmt = Math.floor((target.maxHp || 0) * 0.20 * _getAntiHealFactor(target))
            target.currentHp = Math.min(target.maxHp, target.currentHp + healAmt)
            addLog(`Eniripsa [Passif] → soigne ${target.name || classes[target.classId]?.name || '?'} de ${healAmt} PV`)
        }
    }

    // Zobal : tous les 6 sorts, gagne un bouclier = niveau × 2 PV
    if (passive.id === 'zobal' && newRawIdx % 6 === 0) {
        const shieldVal = Math.floor((member.level || 1) * 2)
        if (!member.shield || member.shield.value <= 0) {
            member.shield = { value: shieldVal, duration: 999 }
        } else {
            member.shield.value += shieldVal
        }
        addLog(`Zobal [Passif] → bouclier +${shieldVal} PV`)
    }

    // Sadida : tous les 4 sorts, ralentit l'ennemi de -20 vitesse pendant 2 tours
    if (passive.id === 'sadida' && newRawIdx % 4 === 0) {
        const sadidaTarget = slotEnemy || combat.enemy
        if (sadidaTarget?.currentHp > 0) {
            sadidaTarget.buffs = sadidaTarget.buffs || []
            sadidaTarget.buffs.push({ stat: 'spd', value: -20, duration: 2 })
            addLog(`Sadida [Passif] → ${sadidaTarget.name} ralenti de 20% (2 tours)`)
        }
    }

    // ─── Fin de cycle ─────────────────────────────────────────────────────────

    if (newRawIdx % cycleLength !== 0) return

    // Pandawa : transition d'état à chaque cycle de sorts
    if (passive.id === 'pandawa') {
        const pst = combat.memberPassiveState[memberIndex] || {}
        if (pst.state === 'normal') {
            pst.state = 'ivresse'
            addLog(`${member.name || classes[member.classId]?.name || '?'} [Passif] → Ivresse ! (-20% vit, +20% dmg, +10% res all)`)
        } else if (pst.state === 'ivresse') {
            pst.state = 'gueule_de_bois'
            addLog(`${member.name || classes[member.classId]?.name || '?'} [Passif] → Gueule de bois... (-20% dmg, -10% res all)`)
        } else {
            pst.state = 'normal'
            addLog(`${member.name || classes[member.classId]?.name || '?'} [Passif] → Retrouve ses esprits.`)
        }
        combat.memberPassiveState[memberIndex] = pst
    }

    // Ecaflip : roulette à chaque cycle — tire 1 effet parmi 6, remplace le précédent
    if (passive.id === 'ecaflip') {
        const ROULETTE = [
            { stat: 'finalDamagePct', value:  15, label: '+15% dégâts' },
            { stat: 'finalDamagePct', value:  -5, label: '-5% dégâts'  },
            { stat: 'critChance',     value:  15, label: '+15% crit'    },
            { stat: 'critChance',     value:  -5, label: '-5% crit'     },
            { stat: 'res_all',        value:  10, label: '+10% rés all' },
            { stat: 'res_all',        value:  -5, label: '-5% rés all'  },
        ]
        const rolled = ROULETTE[Math.floor(Math.random() * ROULETTE.length)]
        if (!combat.memberPassiveState[memberIndex]) combat.memberPassiveState[memberIndex] = {}
        combat.memberPassiveState[memberIndex].ecaflipEffect = rolled
        addLog(`${member.name || classes[member.classId]?.name || '?'} [Roulette] → ${rolled.label} jusqu'au prochain cycle !`)
    }
}

function _resolveEffectValue(v) {
    if (v !== null && typeof v === 'object' && 'min' in v && 'max' in v)
        return Math.floor(Math.random() * (v.max - v.min + 1)) + v.min
    return v
}

// Retourne 0 si l'entité a un debuff antiHeal actif (tous les soins bloqués), 1 sinon
function _getAntiHealFactor(entity) {
    return (entity?.buffs || []).some(b => b.stat === 'antiHeal') ? 0 : 1
}

// Résout la cible alliée en fonction de effect.target
// Supporte : 'self' / défaut → caster, 'ally_random' → allié vivant aléatoire, 'ally_min_hp' → allié le moins en vie
function _resolveAllyTarget(effect, caster) {
    if (effect.target === 'ally_random') {
        const alive = state.team.filter(m => m && m.currentHp > 0)
        return alive.length > 0 ? alive[Math.floor(Math.random() * alive.length)] : caster
    }
    if (effect.target === 'ally_min_hp') {
        let best = caster, bestRatio = Infinity
        for (const m of state.team) {
            if (!m || m.currentHp <= 0) continue
            const r = m.currentHp / (m.maxHp || 1)
            if (r < bestRatio) { bestRatio = r; best = m }
        }
        return best
    }
    return caster
}

function executeEffect(ctx) {

    const {caster, casterStats, targetEnemy, effect, moveData, moveId} = ctx

    switch (effect.type) {

        case 'damage': {
            // cible alliée (auto-dégâts) : redirige avec les stats défensives de l'allié
            {
                const _ALLY_TARGETS = new Set(['self', 'ally_random', 'ally_min_hp'])
                if (_ALLY_TARGETS.has(effect.target)) {
                    const allyTarget = _resolveAllyTarget(effect, caster)
                    if (!allyTarget || allyTarget.currentHp <= 0) return 0
                    const allyEffStats = getEffectiveStats(allyTarget) ?? allyTarget._stats ?? {}
                    const allyDefStats = {
                        res:               allyEffStats.res || allyTarget.res || {},
                        damageReductionPct: allyEffStats.damageReductionPct || 0
                    }
                    return executeEffect({ ...ctx, targetEnemy: allyTarget, targetStats: allyDefStats, effect: { ...effect, target: 'enemy' } })
                }
            }
            // target:'all_enemies' — frappe tous les ennemis vivants en raid
            // Les stacks (scalingMultipliers / stackedDamage) n'incrémentent qu'une fois (premier hit)
            if (effect.target === 'all_enemies' && combat?.isRaid && combat.enemies) {
                const primaryEff   = { ...effect, target: 'enemy' }
                const secondaryEff = { ...effect, target: 'enemy' }
                delete secondaryEff.scalingMultipliers
                delete secondaryEff.stackedDamage
                let totalDmg = 0
                for (let i = 0; i < combat.enemies.length; i++) {
                    const e = combat.enemies[i]
                    if (!e || e.currentHp <= 0) continue
                    const d = executeEffect({ ...ctx, targetEnemy: e, effect: i === 0 ? primaryEff : secondaryEff })
                    if (typeof d === 'number') totalDmg += d
                }
                return totalDmg
            }
            // all_enemies en solo → frappe l'ennemi unique (fallthrough vers le chemin normal)
            if (effect.target === 'all_enemies' && !combat?.isRaid) {
                const eff = { ...effect, target: 'enemy' }
                return executeEffect({ ...ctx, effect: eff })
            }

            // enemy_cycle : en raid, cible enemy[stack%3] — le même stack pilote cible ET scalingMultipliers
            // En solo : frappe l'ennemi unique, scalingMultipliers cycle normalement
            if (effect.target === 'enemy_cycle') {
                if (combat?.isRaid && combat.enemies) {
                    const currentStack = combat?.spellStacks?.[moveId] || 0
                    const cycleSlot    = currentStack % 3
                    let cycleTarget    = combat.enemies[cycleSlot]
                    let resolvedSlot   = cycleSlot
                    if (!cycleTarget || cycleTarget.currentHp <= 0) {
                        // slot mort → premier ennemi vivant
                        for (let ci = 0; ci < 3; ci++) {
                            const ce = combat.enemies[ci]
                            if (ce && ce.currentHp > 0) { cycleTarget = ce; resolvedSlot = ci; break }
                        }
                    }
                    if (!cycleTarget || cycleTarget.currentHp <= 0) return 0
                    const killerIdx = state.team.indexOf(ctx.caster)
                    const onKill = () => onRaidEnemyDeath(resolvedSlot, killerIdx >= 0 ? killerIdx : -1)
                    return executeEffect({ ...ctx, targetEnemy: cycleTarget, effect: { ...effect, target: 'enemy' }, onTargetKill: onKill })
                }
                // Solo : frappe l'ennemi courant, scalingMultipliers gère le cycle normalement
                return executeEffect({ ...ctx, effect: { ...effect, target: 'enemy' } })
            }

            // Cible spécifique par slot ennemi : enemy_1=slot0, enemy_2=slot1, enemy_3=slot2
            // En solo : enemy_1 frappe l'ennemi unique, enemy_2/enemy_3 ignorés (return 0)
            // ratio : multiplicateur de dégâts appliqué sur les dommages de base
            if (effect.target === 'enemy_1' || effect.target === 'enemy_2' || effect.target === 'enemy_3') {
                const slotIdx = { 'enemy_1': 0, 'enemy_2': 1, 'enemy_3': 2 }[effect.target]
                let actualTarget
                if (combat?.isRaid && combat.enemies) {
                    actualTarget = combat.enemies[slotIdx]
                } else {
                    actualTarget = slotIdx === 0 ? targetEnemy : null
                }
                if (!actualTarget || actualTarget.currentHp <= 0) return 0
                const raidRatio = effect.ratio ?? 1.0
                const effCopy = { ...effect, target: 'enemy' }
                delete effCopy.ratio
                // Slots 2 et 3 : même palier de scaling que le slot 1, sans incrémenter le compteur
                if (slotIdx > 0) {
                    effCopy._noStackIncrement = true
                    delete effCopy.splashPct
                }
                if (raidRatio !== 1.0 && effCopy.damage) {
                    effCopy.damage = {
                        min: Math.max(1, Math.round(effCopy.damage.min * raidRatio)),
                        max: Math.max(1, Math.round(effCopy.damage.max * raidRatio))
                    }
                }
                // onTargetKill correct pour ce slot en raid
                let onKill = ctx.onTargetKill
                if (combat?.isRaid) {
                    const killerIdx = state.team.indexOf(ctx.caster)
                    onKill = () => onRaidEnemyDeath(slotIdx, killerIdx >= 0 ? killerIdx : -1)
                }
                return executeEffect({ ...ctx, targetEnemy: actualTarget, effect: effCopy, onTargetKill: onKill })
            }

            // Défense effective : stats passées (attaque sur joueur) ou buffs actifs (attaque sur ennemi)
            const defStats = ctx.targetStats || {
                res: targetEnemy.res || {},
                damageReductionPct: (targetEnemy.buffs || [])
                    .filter(b => b.stat === 'damageReductionPct')
                    .reduce((sum, b) => sum + b.value, 0)
            }
            // stackedDamage : remplace effect.damage par le palier courant
            // _noStackIncrement : lit le palier du hit précédent sans incrémenter (hits secondaires d'un même sort)
            let effectForCalc = effect
            if (effect.stackedDamage && moveId && combat?.spellStacks) {
                const s = combat.spellStacks
                if (effect._noStackIncrement) {
                    const prevTier = Math.min(Math.max(0, (s[moveId] || 0) - 1), effect.stackedDamage.length - 1)
                    effectForCalc = { ...effect, damage: effect.stackedDamage[prevTier] }
                } else {
                    const tier = Math.min(s[moveId] || 0, effect.stackedDamage.length - 1)
                    effectForCalc = { ...effect, damage: effect.stackedDamage[tier] }
                    s[moveId] = (s[moveId] || 0) + 1
                }
            }

            // scalingMultipliers : multiplicateur cyclique ×1 / ×1.2 / ×1.5
            // stayAtMax:true → plafonne au dernier palier au lieu de cycler
            // _noStackIncrement : lit le palier du hit précédent sans incrémenter (hits secondaires d'un même sort)
            let scalingMult = 1
            if (effect.scalingMultipliers && moveId && combat?.spellStacks) {
                const s = combat.spellStacks
                const mults = effect.scalingMultipliers
                if (effect._noStackIncrement) {
                    const prevStack = Math.max(0, (s[moveId] || 0) - 1)
                    const idx = effect.stayAtMax
                        ? Math.min(prevStack, mults.length - 1)
                        : prevStack % mults.length
                    scalingMult = mults[idx]
                } else {
                    const idx = effect.stayAtMax
                        ? Math.min(s[moveId] || 0, mults.length - 1)
                        : (s[moveId] || 0) % mults.length
                    scalingMult = mults[idx]
                    s[moveId] = (s[moveId] || 0) + 1
                }
            }

            // slot1BonusPct : +X% dégâts finaux si le sort est équipé en slot1
            let statsForCalc = casterStats
            if (effect.slot1BonusPct && moveId && caster.moves?.slot1 === moveId) {
                statsForCalc = { ...casterStats, finalDamagePct: (casterStats.finalDamagePct || 0) + effect.slot1BonusPct }
            }

            const hpCtx = {
                casterMaxHp:     caster.maxHp         || 0,
                casterCurrentHp: caster.currentHp     || 0,
                targetMaxHp:     targetEnemy.maxHp     || targetEnemy.bst?.hp || 0,
                targetCurrentHp: targetEnemy.currentHp || 0
            }
            const result = calcDamage(statsForCalc, defStats, effectForCalc, hpCtx)
            let dmg = result.damage

            if (effect.summonMultiplier && (targetEnemy.isSummon || targetEnemy.ownerId)) {
                dmg = Math.floor(dmg * effect.summonMultiplier)
            }

            if (scalingMult !== 1) dmg = Math.floor(dmg * scalingMult)

            // Le bouclier absorbe en priorité avant les HP
            if (!effect.ignoreShield && targetEnemy.shield?.value > 0) {
                const absorbed = Math.min(targetEnemy.shield.value, dmg)
                targetEnemy.shield.value -= absorbed
                dmg -= absorbed
                if (targetEnemy.shield.value <= 0) targetEnemy.shield = null
            }

            // RenvoiTotal : réfléchit ratio% des dégâts, le caster encaisse 0
            if (targetEnemy.renvoiTotal && dmg > 0) {
                const reflectedDmg = Math.max(1, Math.floor(dmg * targetEnemy.renvoiTotal.ratio))
                delete targetEnemy.renvoiTotal
                if (result.isCrit) addLog(`💥 Coup critique !`)
                addLog(`${ctx.logPrefix || ''}${moveData.name} → renvoyé ! ${reflectedDmg} dégâts à l'attaquant`)
                ctx.caster.currentHp = Math.max(0, (ctx.caster.currentHp || 0) - reflectedDmg)
                const renvoidIdx = state.team.indexOf(ctx.caster)
                if (combat && renvoidIdx !== -1) {
                    combat.sessionLoot.memberDamageReceived[renvoidIdx] = (combat.sessionLoot.memberDamageReceived[renvoidIdx] || 0) + reflectedDmg
                }
                if (ctx.caster.currentHp <= 0 && renvoidIdx !== -1) {
                    _autoSwitchActive()
                    if (state.team.every(m => !m || m.currentHp <= 0)) onDefeat()
                }
                return 0
            }

            // Renvoi : réfléchit ratio% des dégâts, le caster encaisse le reste
            if (targetEnemy.renvoi && dmg > 0) {
                const reflectedDmg = Math.max(1, Math.floor(dmg * targetEnemy.renvoi.ratio))
                const takenDmg     = dmg - reflectedDmg
                delete targetEnemy.renvoi
                if (result.isCrit) addLog(`💥 Coup critique !`)
                addLog(`${ctx.logPrefix || ''}${moveData.name} → ${reflectedDmg} renvoyés, ${takenDmg} absorbés`)
                ctx.caster.currentHp = Math.max(0, (ctx.caster.currentHp || 0) - reflectedDmg)
                const renvoidIdx = state.team.indexOf(ctx.caster)
                if (combat && renvoidIdx !== -1) {
                    combat.sessionLoot.memberDamageReceived[renvoidIdx] = (combat.sessionLoot.memberDamageReceived[renvoidIdx] || 0) + reflectedDmg
                }
                if (ctx.caster.currentHp <= 0 && renvoidIdx !== -1) {
                    _autoSwitchActive()
                    if (state.team.every(m => !m || m.currentHp <= 0)) onDefeat()
                }
                if (takenDmg > 0) {
                    targetEnemy.currentHp = Math.max(0, targetEnemy.currentHp - takenDmg)
                    const memberHitIdx = state.team.indexOf(targetEnemy)
                    if (combat && memberHitIdx !== -1) {
                        combat.sessionLoot.memberDamageReceived[memberHitIdx] = (combat.sessionLoot.memberDamageReceived[memberHitIdx] || 0) + takenDmg
                    }
                    if (targetEnemy.currentHp <= 0) ctx.onTargetKill?.()
                }
                return takenDmg
            }

            targetEnemy.currentHp = Math.max(0, targetEnemy.currentHp - dmg)

            // Érosion : réduit le maxHp de la cible (taux de base 5%, modifiable par effect.erosionRate,
            // un buff 'erosionBonus' sur le lanceur, ou un debuff 'erosionBonus' sur la cible)
            if (dmg > 0) {
                const baseRate = effect.erosionRate !== undefined ? effect.erosionRate : 0.05
                const casterBonus = (caster.buffs || [])
                    .filter(b => b.stat === 'erosionBonus')
                    .reduce((sum, b) => sum + b.value, 0)
                // debuff stocké comme valeur négative — on l'inverse pour obtenir le bonus positif
                const targetBonus = (targetEnemy.buffs || [])
                    .filter(b => b.stat === 'erosionBonus')
                    .reduce((sum, b) => sum - b.value, 0)
                const erosion = Math.floor(dmg * Math.max(0, baseRate + casterBonus + targetBonus))
                if (erosion > 0) {
                    targetEnemy.maxHp = Math.max(1, (targetEnemy.maxHp || 1) - erosion)
                    if (targetEnemy.currentHp > targetEnemy.maxHp) targetEnemy.currentHp = targetEnemy.maxHp
                }
            }

            const memberHitIdx = state.team.indexOf(targetEnemy)
            if (combat && memberHitIdx !== -1 && dmg > 0) {
                combat.sessionLoot.memberDamageReceived[memberHitIdx] = (combat.sessionLoot.memberDamageReceived[memberHitIdx] || 0) + dmg
            }
            // Popup dégâts uniquement quand c'est l'ennemi qui encaisse (pas un membre)
            if (dmg > 0 && memberHitIdx === -1 && typeof showDamageNumber === 'function') {
                showDamageNumber(dmg)
            }
            const absNote = dmg < result.damage ? ` (${result.damage - dmg} absorbés)` : ''
            addLog(`${ctx.logPrefix || ''}${moveData.name} → ${result.damage} dégâts${absNote}`)
            if (result.isCrit) addLog(`💥 Coup critique !`)
            // pendingLifesteal : vol de vie sur le prochain sort de dégâts
            if (dmg > 0 && caster.buffs) {
                const pendingLS = caster.buffs.find(b => b.stat === 'pendingLifesteal')
                if (pendingLS) {
                    const healAmt = Math.floor(dmg * pendingLS.value * _getAntiHealFactor(caster))
                    if (healAmt > 0) {
                        caster.currentHp = Math.min(caster.maxHp, (caster.currentHp || 0) + healAmt)
                        addLog(`${moveData.name} → vol de vie ${healAmt} PV`)
                    }
                    caster.buffs = caster.buffs.filter(b => b !== pendingLS)
                }
            }
            if (targetEnemy.currentHp <= 0) {
                if (combat?.isPoutch && targetEnemy === combat.enemy) {
                    targetEnemy.currentHp = targetEnemy.maxHp
                    combat.sessionLoot.killCount++
                    addLog(`Le Poutch reprend des forces !`)
                } else {
                    ctx.onTargetKill?.()
                }
            }

            // splashPct : ricochet brut sur e2 (bypass défenses, pas d'érosion)
            // splashPct2 : ricochet sur e3 — % de e1 par défaut, % de e2 si splashChain:true
            if (effect.splashPct && combat?.isRaid && dmg > 0) {
                const secondary = combat.enemies?.[1]
                let e2Dmg = 0
                if (secondary && secondary.currentHp > 0) {
                    e2Dmg = Math.max(1, Math.floor(dmg * effect.splashPct / 100))
                    secondary.currentHp = Math.max(0, secondary.currentHp - e2Dmg)
                    addLog(`${moveData.name} → ricochet : ${e2Dmg} dégâts (ennemi sec.)`)
                }
                if (effect.splashPct2) {
                    const tertiary = combat.enemies?.[2]
                    if (tertiary && tertiary.currentHp > 0) {
                        const base = effect.splashChain ? e2Dmg : dmg
                        if (base > 0) {
                            const e3Dmg = Math.max(1, Math.floor(base * effect.splashPct2 / 100))
                            tertiary.currentHp = Math.max(0, tertiary.currentHp - e3Dmg)
                            addLog(`${moveData.name} → ricochet : ${e3Dmg} dégâts (ennemi ter.)`)
                        }
                    }
                }
            }
            return dmg
        }

        case 'dot': {
            // enemy_2 / enemy_3 : applique le dot sur le slot ennemi ciblé (raid uniquement, ignoré en solo)
            if (effect.target === 'enemy_2' || effect.target === 'enemy_3') {
                if (!combat?.isRaid || !combat.enemies) break
                const slotIdx  = effect.target === 'enemy_2' ? 1 : 2
                const dotTarget = combat.enemies[slotIdx]
                if (!dotTarget || dotTarget.currentHp <= 0) break
                return executeEffect({ ...ctx, targetEnemy: dotTarget, effect: { ...effect, target: 'enemy' } })
            }
            const dotBase    = _resolveEffectValue(effect.value)
            const dotScaled  = Math.max(1, Math.floor(
                dotBase * (1 + (casterStats?.atk || 0) / 100) + (casterStats?.flatDamage || 0)
            ))
            targetEnemy.dots = targetEnemy.dots || []
            targetEnemy.dots.push({ element: resolveElement(effect), value: dotScaled, duration: effect.duration })
            addLog(`${ctx.logPrefix || ''}${moveData.name} → brûlure ${dotScaled}/tour (${effect.duration} tours)`)
            break
        }

        case 'heal': {
            const healTarget = _resolveAllyTarget(effect, caster)
            const healRoll   = _resolveEffectValue(effect.heal) || 0
            const baseHeal   = healRoll * (1 + (casterStats?.atk || 0) * 0.30 / 100)
            const healAmt    = Math.max(1, Math.floor(
                (baseHeal + (casterStats?.healFlat || 0)) * (1 + (casterStats?.healPct || 0) / 100) * _getAntiHealFactor(healTarget)
            ))
            healTarget.currentHp = Math.min(healTarget.maxHp, (healTarget.currentHp || 0) + healAmt)
            const tName = healTarget.name || classes[healTarget.classId]?.name || '?'
            addLog(`${moveData.name} → soigne ${tName} de ${healAmt} PV`)
            break
        }

        case 'heal%maxHp': {
            const healTarget = _resolveAllyTarget(effect, caster)
            const healPct = _resolveEffectValue(effect.heal) || 0
            const healAmt = Math.floor((healTarget.maxHp || 0) * (healPct / 100) * (1 + (casterStats?.healMaxHpPct || 0) / 100) * _getAntiHealFactor(healTarget))
            healTarget.currentHp = Math.min(healTarget.maxHp, (healTarget.currentHp || 0) + healAmt)
            const tName = healTarget.name || classes[healTarget.classId]?.name || '?'
            addLog(`${moveData.name} → soigne ${tName} de ${healAmt} PV (${healPct}% PV max)`)
            break
        }

        case 'heal%maxHp_team': {
            const healPctBonus = 1 + (casterStats?.healMaxHpPct || 0) / 100
            const healPct      = _resolveEffectValue(effect.heal) || 0
            for (const m of state.team) {
                if (!m || m.currentHp <= 0) continue
                const healAmt = Math.floor((m.maxHp || 0) * (healPct / 100) * healPctBonus * _getAntiHealFactor(m))
                m.currentHp = Math.min(m.maxHp, (m.currentHp || 0) + healAmt)
            }
            addLog(`${moveData.name} → soigne ${healPct}% PV max (équipe)`)
            break
        }

        case 'heal_team': {
            const healBase = Math.floor((_resolveEffectValue(effect.heal) || 0) * (1 + (casterStats?.healTeamPct || 0) / 100))
            for (const m of state.team) {
                if (!m || m.currentHp <= 0) continue
                const healAmt = Math.floor(healBase * _getAntiHealFactor(m))
                m.currentHp = Math.min(m.maxHp, (m.currentHp || 0) + healAmt)
            }
            addLog(`${moveData.name} → soigne ${healBase} PV (équipe)`)
            break
        }

        case 'hot': {
            const hotTarget = _resolveAllyTarget(effect, caster)
            const hotRoll   = _resolveEffectValue(effect.heal) || 0
            const baseHeal  = hotRoll * (1 + (casterStats?.atk || 0) * 0.30 / 100)
            const hotVal    = Math.max(1, Math.floor(
                (baseHeal + (casterStats?.healFlat || 0)) * (1 + (casterStats?.healPct || 0) / 100)
            ))
            hotTarget.hots = hotTarget.hots || []
            hotTarget.hots.push({ value: hotVal, duration: effect.duration, label: moveData.name })
            const tName = hotTarget.name || classes[hotTarget.classId]?.name || '?'
            addLog(`${moveData.name} → soin continu ${hotVal} PV/tour × ${effect.duration} tours → ${tName}`)
            break
        }

        case 'buff': {
            const buffTarget = _resolveAllyTarget(effect, caster)
            buffTarget.buffs = buffTarget.buffs || []
            const buffVal = _resolveEffectValue(effect.value)
            if (effect.stat === 'maxHp') {
                buffTarget.maxHp = (buffTarget.maxHp || 0) + buffVal
                buffTarget.currentHp = (buffTarget.currentHp || 0) + buffVal
                buffTarget.buffs.push({ stat: 'maxHp', value: buffVal, duration: effect.duration, directApplied: true })
                addLog(`${moveData.name} → +${buffVal} PV max et courants (${effect.duration} tours)`)
            } else {
                buffTarget.buffs.push({ stat: effect.stat, value: buffVal, duration: effect.duration })
                if (effect.stat === 'pendingLifesteal')
                    addLog(`${moveData.name} → vol de vie ×${buffVal} actif (prochain sort)`)
                else if (effect.stat === 'healOnCast')
                    addLog(`${moveData.name} → fontaine active (${effect.duration} sorts)`)
                else
                    addLog(`${moveData.name} → +${buffVal} ${effect.stat} (${effect.duration} tours)`)
            }
            // OeilPourOeil : si le caster est un ennemi, les membres actifs qui ont l'effet en miroir gagnent un buff équivalent
            if (state.team.indexOf(caster) === -1) {
                for (const m of state.team) {
                    if (!m || m.currentHp <= 0 || !m.oeilPourOeil) continue
                    const mirrorVal = Math.max(1, Math.floor(buffVal * m.oeilPourOeil.ratio))
                    m.buffs = m.buffs || []
                    m.buffs.push({ stat: effect.stat, value: mirrorVal, duration: effect.duration })
                    delete m.oeilPourOeil
                    addLog(`Oeil pour Oeil → +${mirrorVal} ${effect.stat} (${effect.duration} tours)`)
                }
            }
            break
        }

        case 'buff_team': {
            const buffTeamVal = _resolveEffectValue(effect.value)
            for (const m of state.team) {
                if (!m || m.currentHp <= 0) continue
                m.buffs = m.buffs || []
                m.buffs.push({ stat: effect.stat, value: buffTeamVal, duration: effect.duration })
            }
            addLog(`${moveData.name} → +${buffTeamVal} ${effect.stat} équipe (${effect.duration} tours)`)
            break
        }

        case 'debuff': {
            const _ALLY_TARGETS = new Set(['self', 'ally_random', 'ally_min_hp', 'all_allies'])
            const debuffEntity = _ALLY_TARGETS.has(effect.target) ? _resolveAllyTarget(effect, caster) : targetEnemy
            const debuffVal    = _resolveEffectValue(effect.value)
            debuffEntity.buffs = debuffEntity.buffs || []
            debuffEntity.buffs.push({ stat: effect.stat, value: -debuffVal, duration: effect.duration })
            addLog(`${ctx.logPrefix || ''}${moveData.name} → -${debuffVal} ${effect.stat} (${effect.duration} tours)`)
            break
        }

        case 'shield': {
            // N'applique pas si un bouclier est déjà actif (mais les autres effets du sort passent quand même)
            if (caster.shield?.value > 0) break
            const shieldVal = effect.levelPct
                ? Math.floor((caster.level || 1) * effect.levelPct)
                : effect.value
            caster.shield = { value: shieldVal, duration: effect.duration }
            addLog(`${moveData.name} → bouclier ${shieldVal} PV (${effect.duration} tours)`)
            break
        }

        case 'lifesteal': {
            const healAmt = Math.floor((ctx.lastDamageDealt || 0) * ((effect.ratio || 0) + (casterStats?.lifestealPct || 0) / 100) * _getAntiHealFactor(caster))
            if (healAmt > 0) {
                caster.currentHp = Math.min(caster.maxHp, (caster.currentHp || 0) + healAmt)
                addLog(`${moveData.name} → soigne ${healAmt} PV`)
            }
            break
        }

        case 'antiHeal': {
            targetEnemy.buffs = targetEnemy.buffs || []
            targetEnemy.buffs.push({ stat: 'antiHeal', duration: effect.duration })
            addLog(`${ctx.logPrefix || ''}${moveData.name} → anti-soin (${effect.duration} tours)`)
            break
        }

        case 'renvoi': {
            caster.renvoi = { ratio: effect.ratio }
            addLog(`${moveData.name} → renvoi ${Math.round(effect.ratio * 100)}% actif`)
            break
        }

        case 'renvoiTotal': {
            caster.renvoiTotal = { ratio: effect.ratio }
            addLog(`${moveData.name} → renvoi total ${Math.round(effect.ratio * 100)}% actif`)
            break
        }

        case 'oeilPourOeil': {
            caster.oeilPourOeil = { ratio: effect.ratio }
            addLog(`${moveData.name} → oeil pour oeil ${Math.round(effect.ratio * 100)}% actif`)
            break
        }

        case 'switch': {
            if (combat?.isRaid) break  // non implémenté en raid (pas de sorts de zone encore)
            // Liste des indices d'équipe encore en vie
            const living = []
            for (let i = 0; i < state.team.length; i++) {
                const m = state.team[i]
                if (m && m.currentHp > 0) living.push(i)
            }
            // Besoin d'au moins 2 membres vivants
            if (living.length <= 1) break
            const curPos = living.indexOf(combat.activeMemberIndex)
            // Avance de value positions en bouclant sur les membres vivants
            const targetPos = (curPos + (effect.value || 1)) % living.length
            if (targetPos === curPos) break
            addLog(`${moveData.name} → changement de membre forcé !`)
            setActiveMember(living[targetPos])
            break
        }

        case 'repeat': {
            const prevMv = ctx.prevMv
            if (!prevMv?.effects) break
            addLog(`${moveData.name} → relance ${prevMv.name} !`)
            let repeatLastDmg = 0
            for (const prevEffect of prevMv.effects) {
                if (prevEffect.type === 'repeat') continue  // évite la récursion infinie
                const dmg = executeEffect({ ...ctx, effect: prevEffect, moveData: prevMv, prevMv: null, lastDamageDealt: repeatLastDmg })
                if (dmg !== undefined) repeatLastDmg = dmg
            }
            break
        }

        case 'summon': {
            let summonId = effect.summonId
            if (effect.summonPool?.length) {
                summonId = effect.summonPool[Math.floor(Math.random() * effect.summonPool.length)]
            }
            if (summonId) spawnSummon(caster, { ...effect, summonId })
            break
        }

        case 'portal': {
            // Éliotrope : portail actif N tours — boost caster +25% dmg, -10% res, alliés +10% dmg
            const dur      = effect.duration || 3
            const selfBonus = effect.selfBonus  || 25
            const resMalus  = effect.resMalus   || 10
            const allyBonus = effect.allyBonus  || 10
            caster.buffs = caster.buffs || []
            caster.buffs.push({ stat: 'finalDamagePct', value:  selfBonus, duration: dur })
            caster.buffs.push({ stat: 'res_all',        value: -resMalus,  duration: dur })
            for (const m of state.team) {
                if (!m || m === caster || m.currentHp <= 0) continue
                m.buffs = m.buffs || []
                m.buffs.push({ stat: 'finalDamagePct', value: allyBonus, duration: dur })
            }
            addLog(`${moveData.name} → Portail ! +${selfBonus}% dmg, -${resMalus}% rés, alliés +${allyBonus}% dmg (${dur} tours)`)
            break
        }

        case 'turret': {
            // Steamer : tourelle — DoT élémentaire sur l'ennemi, label personnalisé
            const turretBase   = _resolveEffectValue(effect.value)
            const turretScaled = Math.max(1, Math.floor(
                turretBase * (1 + (casterStats?.atk || 0) / 100) + (casterStats?.flatDamage || 0)
            ))
            targetEnemy.dots = targetEnemy.dots || []
            targetEnemy.dots.push({
                label:    'Tourelle',
                element:  effect.element  || 'neutre',
                value:    turretScaled,
                duration: effect.duration || 3
            })
            addLog(`${moveData.name} → Tourelle déployée ! ${turretScaled} dégâts/${effect.element || 'neutre'} × ${effect.duration || 3} tours`)
            break
        }

        case 'recul': {
            if (!combat?.isRaid || !combat.enemies) break
            const enemySlot = ctx.enemySlotIdx ?? combat.enemies.indexOf(targetEnemy)
            if (enemySlot === -1) break
            const total    = combat.enemies.length
            const nextSlot = (enemySlot + 1) % total
            const tmpEnemy = combat.enemies[nextSlot]
            const tmpTimer = combat.enemyTimers?.[nextSlot] ?? 0
            const tmpMove  = combat.enemyNextMoveIds?.[nextSlot] ?? null
            combat.enemies[nextSlot] = combat.enemies[enemySlot]
            if (combat.enemyTimers)      combat.enemyTimers[nextSlot]      = combat.enemyTimers[enemySlot]
            if (combat.enemyNextMoveIds) combat.enemyNextMoveIds[nextSlot] = combat.enemyNextMoveIds[enemySlot]
            combat.enemies[enemySlot] = tmpEnemy
            if (combat.enemyTimers)      combat.enemyTimers[enemySlot]      = tmpTimer
            if (combat.enemyNextMoveIds) combat.enemyNextMoveIds[enemySlot] = tmpMove
            addLog(`${moveData.name} → recul ! L'ennemi passe en rang ${nextSlot + 1}`)
            break
        }

        case 'avance': {
            if (!combat?.isRaid || !combat.enemies) break
            const enemySlot = ctx.enemySlotIdx ?? combat.enemies.indexOf(targetEnemy)
            if (enemySlot === -1) break
            const total    = combat.enemies.length
            const prevSlot = (enemySlot - 1 + total) % total
            const tmpEnemy = combat.enemies[prevSlot]
            const tmpTimer = combat.enemyTimers?.[prevSlot] ?? 0
            const tmpMove  = combat.enemyNextMoveIds?.[prevSlot] ?? null
            combat.enemies[prevSlot] = combat.enemies[enemySlot]
            if (combat.enemyTimers)      combat.enemyTimers[prevSlot]      = combat.enemyTimers[enemySlot]
            if (combat.enemyNextMoveIds) combat.enemyNextMoveIds[prevSlot] = combat.enemyNextMoveIds[enemySlot]
            combat.enemies[enemySlot] = tmpEnemy
            if (combat.enemyTimers)      combat.enemyTimers[enemySlot]      = tmpTimer
            if (combat.enemyNextMoveIds) combat.enemyNextMoveIds[enemySlot] = tmpMove
            addLog(`${moveData.name} → avance ! L'ennemi passe en rang ${prevSlot + 1}`)
            break
        }

        case 'swap_enemies': {
            if (!combat?.isRaid || !combat.enemies || combat.enemies.length < 3) break
            const se1 = combat.enemies[1], st1 = combat.enemyTimers?.[1] ?? 0, sm1 = combat.enemyNextMoveIds?.[1] ?? null
            combat.enemies[1] = combat.enemies[2]
            if (combat.enemyTimers)      combat.enemyTimers[1]      = combat.enemyTimers[2]
            if (combat.enemyNextMoveIds) combat.enemyNextMoveIds[1] = combat.enemyNextMoveIds[2]
            combat.enemies[2] = se1
            if (combat.enemyTimers)      combat.enemyTimers[2]      = st1
            if (combat.enemyNextMoveIds) combat.enemyNextMoveIds[2] = sm1
            addLog(`${moveData.name} → positions ennemies échangées !`)
            break
        }

        case 'heal_adjacent%maxHp': {
            const casterIdx = state.team.indexOf(caster)
            if (casterIdx === -1) break
            const healPct = (effect.heal || 0) / 100
            for (const offset of [-1, 1]) {
                const adj = state.team[casterIdx + offset]
                if (!adj || adj.currentHp <= 0) continue
                const amt = Math.floor(adj.maxHp * healPct * _getAntiHealFactor(adj))
                if (amt > 0) {
                    adj.currentHp = Math.min(adj.maxHp, adj.currentHp + amt)
                    addLog(`${moveData.name} → soin ${adj.name || 'allié'} +${amt} PV`)
                }
            }
            break
        }

        case 'random': {
            if (!effect.choices?.length) break
            // Weighted random pick — cumulative sum, fallback to last entry
            const roll = Math.random()
            let cumulative = 0
            let chosen = effect.choices[effect.choices.length - 1]
            for (const choice of effect.choices) {
                cumulative += (choice.chance || 0)
                if (roll < cumulative) { chosen = choice; break }
            }
            if (!chosen?.effects?.length) break
            // Execute sub-effects, threading lastDamageDealt for lifesteal chaining
            let subLastDmg = undefined
            for (const subEffect of chosen.effects) {
                const dmg = executeEffect({
                    ...ctx,
                    effect: subEffect,
                    lastDamageDealt: subLastDmg ?? (ctx.lastDamageDealt || 0)
                })
                if (typeof dmg === 'number') subLastDmg = dmg
            }
            return subLastDmg
        }
    }
}

function executeEnemyAction() {

    if (!combat.enemy || combat.enemy.currentHp <= 0) return

    // DOTs de l'ennemi tick avant son action
    tickDots(combat.enemy, () => {
        if (combat.enemy?.isSummon) returnToOwner()
        else onVictory()
    })
    if (!combat.enemy || combat.enemy.currentHp <= 0) return

    const e          = combat.enemy
    const curMoveIdx = e.moveIndex % e.moves.length
    const moveId     = e.moves[curMoveIdx]
    e.moveIndex++
    if (!moveId) return
    const mv = move[moveId]
    if (!mv?.effects) return
    const prevMoveIdx = (curMoveIdx - 1 + e.moves.length) % e.moves.length
    const prevMv      = e.moves[prevMoveIdx] ? (move[e.moves[prevMoveIdx]] || null) : null

    // cible = membre actif
    const target = state.team[combat.activeMemberIndex]
    if (!target || target.currentHp <= 0) { onDefeat(); return }

    // Stats d'attaque de l'ennemi (buffs actifs inclus)
    const enemyStats = {
        atk:               combat.enemy.atk || 0,
        flatDamage:        0,
        finalDamagePct:    0,
        spellDamagePct:    0,
        damageReductionPct: 0,
        critChance:        0,
        critDamagePct:     50,
        res:               combat.enemy.res || {}
    }
    for (const b of (combat.enemy.buffs || [])) {
        if (b.stat in enemyStats) enemyStats[b.stat] += b.value
    }

    const targetStats = getEffectiveStats(target)
    const logPrefix   = `${combat.enemy.name} utilise `

    let lastDamageDealt = 0
    for (const effect of mv.effects) {
        const dmg = executeEffect({
            caster:      combat.enemy,
            casterStats: enemyStats,
            targetEnemy: target,
            targetStats,
            effect,
            moveData:    mv,
            prevMv,
            lastDamageDealt,
            logPrefix,
            onTargetKill: () => {
                _autoSwitchActive()
                if (state.team.every(m => !m || m.currentHp <= 0)) onDefeat()
            }
        })
        if (dmg !== undefined) lastDamageDealt = dmg
    }

    tickBuffs(combat.enemy)

    // Pré-sélection du prochain sort ennemi pour l'affichage
    if (combat.enemy) combat.enemyNextMoveId = pickNextEnemyMove(combat.enemy)

    // Décompte des actions du familier invoqué
    // _justSpawned : le summon vient d'apparaître dans ce même tick (invoqué par l'ennemi)
    // → on ne décompte pas cette "action" qui était en réalité l'action de l'invocateur
    if (combat.enemy?.isSummon) {
        if (combat.enemy._justSpawned) {
            delete combat.enemy._justSpawned
        } else {
            combat.enemy.actionsRemaining--
            if (combat.enemy.actionsRemaining <= 0) returnToOwner()
        }
    }

    combat.enemyTimer = 100 - ((mv.cooldownMs ?? BASE_TIME) / BASE_TIME * 100)
}

function pickNextEnemyMove(enemy) {
    if (!enemy?.moves?.length) return null
    return enemy.moves[enemy.moveIndex % enemy.moves.length]
}

// ─── DOTs ────────────────────────────────────────────────────────────────────

function tickDots(entity, onKill) {
    if (!entity.dots?.length) return
    let dotTotalDmg = 0
    for (const dot of entity.dots) {
        entity.currentHp = Math.max(0, entity.currentHp - dot.value)
        addLog(`${dot.label || 'Brûlure'} → ${dot.value} dégâts`)
        dotTotalDmg += dot.value
    }
    if (combat && dotTotalDmg > 0) {
        const idx = state.team.indexOf(entity)
        if (idx !== -1) {
            combat.sessionLoot.memberDamageReceived[idx] = (combat.sessionLoot.memberDamageReceived[idx] || 0) + dotTotalDmg
        }
    }
    entity.dots = entity.dots
        .map(d => ({ ...d, duration: d.duration - 1 }))
        .filter(d => d.duration > 0)
    if (entity.currentHp <= 0) {
        if (combat?.isPoutch && entity === combat.enemy) {
            entity.currentHp = entity.maxHp
            combat.sessionLoot.killCount++
            addLog(`Le Poutch reprend des forces !`)
        } else {
            onKill?.()
        }
    }
}

function tickHots(member) {
    if (!member.hots?.length) return
    const antiHeal = _getAntiHealFactor(member)
    for (const hot of member.hots) {
        const healAmt = Math.floor(hot.value * antiHeal)
        if (healAmt > 0) {
            member.currentHp = Math.min(member.maxHp, (member.currentHp || 0) + healAmt)
            addLog(`${hot.label || 'Soin continu'} → +${healAmt} PV`)
        }
    }
    member.hots = member.hots
        .map(h => ({ ...h, duration: h.duration - 1 }))
        .filter(h => h.duration > 0)
}

// ─── Invocations ─────────────────────────────────────────────────────────────

function spawnSummon(caster, effect) {
    const mob = monsters[effect.summonId] || summons[effect.summonId]
    if (!mob) return
    const rawLevel = caster.level || 1
    const slotIdx  = state.team.indexOf(caster)

    if (slotIdx !== -1) {
        // ── Invocation alliée : remplace le membre dans son slot ─────────────
        const scale  = 1 + ((rawLevel - 1) * 0.08)
        const maxHp  = Math.floor(mob.bst.hp  * scale)
        const atk    = Math.floor(mob.bst.atk * scale)
        const mvSlots = { slot1: null, slot2: null, slot3: null, slot4: null }
        ;(mob.moves || []).forEach((id, i) => { if (i < 4) mvSlots[`slot${i + 1}`] = id })
        combat.savedMembers          = combat.savedMembers || {}
        combat.savedMembers[slotIdx] = caster
        state.team[slotIdx] = {
            id:               effect.summonId,
            name:             mob.name,
            image:            mob.image,
            classId:          null,
            _stats:           { atk, spd: mob.bst.spd, hp: maxHp, flatDamage: 0, finalDamagePct: 0, spellDamagePct: 0, damageReductionPct: 0, critChance: 0, critDamagePct: 50, res: { ...(mob.bst.res || {}) }, healPct: 0 },
            level:            rawLevel,
            currentHp:        maxHp,
            maxHp,
            exp:              0,
            moves:            mvSlots,
            buffs:            [],
            dots:             [],
            shield:           null,
            isSummon:         true,
            ownerSlot:        slotIdx,
            actionsRemaining: effect.duration,
            onDeath:          mob.onDeath || null
        }
        combat.memberMoveIndex[slotIdx] = 0
        addLog(`${caster.name || classes[caster.classId]?.name || '?'} invoque ${mob.name} !`)
    } else {
        // ── Invocation ennemie : remplace l'ennemi (comportement existant) ───
        if (monsters[effect.summonId]) {
            if (!state.seenMonsters) state.seenMonsters = {}
            state.seenMonsters[effect.summonId] = true
        }
        const level    = mob.ownerId ? rawLevel : Math.min(rawLevel, Math.max(1, rawLevel - 10))
        const scale    = 1 + ((level - 1) * 0.08)
        const statMult = classes[caster.classId]?.passive?.id === 'osamodas' ? 2 : 1
        combat.savedEnemy = combat.enemy
        combat.enemy = {
            id:               effect.summonId,
            name:             mob.name,
            level,
            image:            mob.image,
            maxHp:            Math.floor(mob.bst.hp  * scale * statMult),
            currentHp:        Math.floor(mob.bst.hp  * scale * statMult),
            atk:              Math.floor(mob.bst.atk * scale * statMult),
            spd:              mob.bst.spd,
            res:              { ...(mob.bst.res || {}) },
            finalDamagePct:   0,
            flatDamage:       0,
            moves:            mob.moves || [],
            rarity:           mob.rarity  || 'commun',
            tier:             mob.tier    || 'normal',
            dropRate:         0,
            buffs:            [],
            dots:             [],
            moveIndex:        0,
            isSummon:         true,
            actionsRemaining: effect.duration,
            _justSpawned:     true
        }
        combat.enemyTimer = 0
        addLog(`${caster.name || classes[caster.classId]?.name || '?'} invoque ${mob.name} !`)
    }
}

function returnAllyToOwner(slotIdx) {
    const original = combat.savedMembers?.[slotIdx]
    if (!original) return
    const summon     = state.team[slotIdx]
    const summonName = summon?.name || '?'

    if (summon?.onDeath) {
        const summonStats = summon._stats || {}
        for (const eff of summon.onDeath) {
            executeEffect({
                caster:      summon,
                casterStats: summonStats,
                targetEnemy: combat.enemy,
                effect:      eff,
                moveData:    { name: summonName },
                moveId:      null
            })
        }
    }

    state.team[slotIdx] = original
    delete combat.savedMembers[slotIdx]
    addLog(`${original.name || classes[original.classId]?.name || '?'} reprend le combat !`)
}

function returnToOwner() {
    if (!combat.savedEnemy) return
    addLog(`${combat.savedEnemy.name} reprend le combat !`)
    combat.enemy           = combat.savedEnemy
    combat.savedEnemy      = null
    combat.enemyTimer      = 0
    combat.enemyNextMoveId = pickNextEnemyMove(combat.enemy)
}

// ─── Victoire / Défaite ───────────────────────────────────────────────────────

function onVictory() {
    // Double-appel possible si un sort a plusieurs effets de dégâts — on ignore les suivants
    if (combat.respawnPending) return
    combat.respawnPending = true

    // Capture l'ennemi — on le garde en place pour que le UI reste stable pendant
    // les 500ms de respawn ; gameTick ignore les actions quand respawnPending est vrai
    const defeatedEnemy = combat.enemy

    // XP calculée avant le loot pour ne pas être silencée par une erreur de loot
    const xpResults = []
    for (let i = 0; i < state.team.length; i++) {
        const member = state.team[i]
        if (!member || member.currentHp <= 0) continue          // mort → 0 XP
        const mult   = (i === combat.activeMemberIndex) ? 1.0 : 0.5
        const xp     = Math.floor(calculateXPReward(defeatedEnemy, member) * mult)
        const result = giveXP(member, xp)
        xpResults.push({ member, xp, ...result })
    }

    let loot = { xpResults, familiarDrop: null, itemDrops: [], caisseDropped: false }
    try {
        loot = processVictoryLoot(defeatedEnemy)
        loot.xpResults = xpResults
    } catch(e) {
        console.error('[onVictory] erreur traitement loot:', e)
    }

    combat.pendingLoot = loot
    combat.sessionLoot.killCount++

    // Kill credit pour passifs Sram / Féca
    const killerIdx = combat.activeMemberIndex
    combat.memberKillCount[killerIdx] = (combat.memberKillCount[killerIdx] || 0) + 1

    // Accumule le loot de session
    if (loot.itemDrops?.length > 0) {
        for (const d of loot.itemDrops) {
            if (d.convertedToKamas) {
                combat.sessionLoot.kamasFromDrops += d.kamas || 10
            } else {
                combat.sessionLoot.itemDrops.push(d)
                if (item[d.itemId]?.isKey) {
                    combat.sessionLoot.keyDrops[d.itemId] = (combat.sessionLoot.keyDrops[d.itemId] || 0) + 1
                }
            }
        }
    }
    if (loot.familiarDrop) {
        combat.sessionLoot.familiarDrops.push(loot.familiarDrop)
        if (activeMenu === 'collection' || activeMenu === 'Encyclopedie') updateCollectionUI()
    }
    if (loot.caisseDropped) {
        combat.sessionLoot.caisseCount++
    }
    let anyLevelUp = false
    for (const r of xpResults) {
        if (r.leveledUp) {
            anyLevelUp = true
            showNotification(`${classes[r.member.classId]?.name} → Niveau ${r.newLevel} !`, 'level')
        }
        for (const moveId of (r.newMoves || [])) {
            combat.sessionLoot.learnedMoves.push({ member: r.member, moveId })
        }
    }
    // Persiste immédiatement les niveaux gagnés pour ne pas les perdre en cas de changement de team
    if (anyLevelUp) saveGame()

    // Donjon : victoire finale — consomme la clé, relance si option active
    if (areas[state.currentArea]?.type === 'dungeon') {
        combat.respawnPending = false
        const doneArea = state.currentArea
        stopCombat()
        consumeDungeonKey(doneArea)

        if (_dungeonAutoRun) {
            _mergeSessionLoot(_dungeonAutoRun.accumulated, combat.sessionLoot)
            const keysLeft = state.inventory[areas[doneArea].keyId]?.count || 0
            if (keysLeft > 0) {
                if (_afkSeconds > 0) { startCombat(doneArea); return }
                setTimeout(() => startCombat(doneArea), 800)
                return
            }
            combat.sessionLoot = _dungeonAutoRun.accumulated
            _dungeonAutoRun = null
        }
        _afkSeconds = 0
        showSessionSummary('dungeon')
        return
    }

    // Respawn ennemi (zone normale) — synchrone en fast-forward, async sinon
    if (_afkSeconds > 0) {
        combat.respawnPending = false
        for (const m of state.team) {
            if (!m) continue
            m.buffs = []; m.dots = []; m.hots = []; m.shield = null
        }
        combat.enemy           = spawnEnemy(state.currentArea)
        combat.enemyNextMoveId = pickNextEnemyMove(combat.enemy)
        combat.savedEnemy      = null
        combat.enemyTimer      = 0
        return
    }
    setTimeout(() => {
        combat.respawnPending = false
        if (!state.isRunning || !state.currentArea) return
        for (const m of state.team) {
            if (!m) continue
            m.buffs  = []
            m.dots   = []
            m.hots   = []
            m.shield = null
        }
        combat.enemy          = spawnEnemy(state.currentArea)
        combat.enemyNextMoveId = pickNextEnemyMove(combat.enemy)
        combat.savedEnemy     = null
        combat.enemyTimer     = 0
        updateCombatUI()
    }, 500)
}

function onDefeat() {
    // Invalide toute reprise éventuelle : après une défaite on repart de zéro
    state.savedCombatEnemy = null
    state.savedCombatState = null

    if (_afkSeconds > 0) {
        stopCombat()
        if (combat) combat.enemy = null
        _offlineHandleDefeat()
        return
    }

    if (combat?.isPoutch) {
        stopCombat()
        if (combat) combat.enemy = null
        showPoutchSummary('defeat')
        return
    }
    stopCombat()
    state.isRunning = false
    combat.enemy = null

    if (_dungeonAutoRun) {
        _mergeSessionLoot(_dungeonAutoRun.accumulated, combat.sessionLoot)
        combat.sessionLoot = _dungeonAutoRun.accumulated
        _dungeonAutoRun = null
        showSessionSummary('defeat')
        return
    }

    if (_autoPilot && _autoPilot.remaining > 0) {
        _mergeSessionLoot(_autoPilot.accumulated, combat.sessionLoot)
        _consumeAutoPilotTicket()
        _autoPilot.remaining--
        state.offlineAutoPilotRemaining = _autoPilot.remaining
        if (_autoPilot.remaining > 0 && (state.inventory['piloteAutomatique']?.count || 0) > 0) {
            for (const m of state.team) {
                if (!m) continue
                const stats = getEffectiveStats(m)
                if (stats) { m.currentHp = stats.hp; m.maxHp = stats.hp }
                m.buffs = []; m.dots = []; m.hots = []; m.shield = null
            }
            saveGame()
            setTimeout(() => rejoinArea(), 800)
            return
        }
        saveGame()
        combat.sessionLoot = _autoPilot.accumulated
        _autoPilot = null
        showSessionSummary('leave')
        return
    }

    showSessionSummary('defeat')
}

// ─── Utilitaires ─────────────────────────────────────────────────────────────

function getMostWoundedMember() {
    let worst = null, worstRatio = 1
    for (const m of state.team) {
        if (!m || m.currentHp <= 0) continue
        const maxHp = m.maxHp || 1
        const ratio = m.currentHp / maxHp
        if (ratio < worstRatio) { worstRatio = ratio; worst = m }
    }
    return worst
}

function _applyHealOnCast(member, mv) {
    const buff = (member.buffs || []).find(b => b.stat === 'healOnCast')
    if (!buff) return
    const alive = state.team.filter(m => m && m.currentHp > 0)
    if (!alive.length) return
    const target = alive[Math.floor(Math.random() * alive.length)]
    const healAmt = Math.floor(target.maxHp * buff.value * _getAntiHealFactor(target))
    if (healAmt > 0) {
        target.currentHp = Math.min(target.maxHp, target.currentHp + healAmt)
        addLog(`${mv.name} → fontaine : ${healAmt} PV`)
    }
}

function tickBuffs(entity) {
    if (entity.buffs) {
        for (const b of entity.buffs) {
            if (b.duration === 1 && b.directApplied && b.stat === 'maxHp') {
                entity.maxHp = Math.max(1, (entity.maxHp || 1) - b.value)
                entity.currentHp = Math.min(entity.currentHp || 0, entity.maxHp)
            }
        }
        entity.buffs = entity.buffs
            .map(b => ({ ...b, duration: b.duration - 1 }))
            .filter(b => b.duration > 0)
    }
    if (entity.shield) {
        entity.shield.duration--
        if (entity.shield.duration <= 0) entity.shield = null
    }
}

function addLog(msg) {
    if (!combat) return
    combat.log.unshift(msg)
    if (combat.log.length > 8) combat.log.pop()
}

function setActiveMember(index) {
    if (!combat || !state.isRunning) return
    if (combat.isRaid) {
        setRaidMemberForSwap(index)
        return
    }
    const m = state.team[index]
    if (!m || m.currentHp <= 0) return
    if (index !== combat.activeMemberIndex) {
        combat.memberTimers[index] = 0  // le sort repart de zéro à chaque switch
    }
    combat.activeMemberIndex = index
    updateCombatUI()
}

function _autoSwitchActive() {
    if (!combat) return
    const cur    = state.team[combat.activeMemberIndex]
    const curIdx = combat.activeMemberIndex
    if (cur && cur.currentHp > 0) return

    // Invocation alliée morte : restaurer le propriétaire
    if (cur?.isSummon && cur.ownerSlot !== undefined) {
        returnAllyToOwner(cur.ownerSlot)
        if (state.team[curIdx]?.currentHp > 0) return
    }

    // Passif Roublard : explosion à la mort (une seule fois par membre)
    if (cur && !combat.memberDeathHandled?.[curIdx]) {
        combat.memberDeathHandled[curIdx] = true
        if (classes[cur.classId]?.passive?.id === 'roublard' && combat.enemy?.currentHp > 0) {
            const dmg = Math.floor((cur.maxHp || 0) * 0.30)
            combat.enemy.currentHp = Math.max(0, combat.enemy.currentHp - dmg)
            addLog(`${cur.name || classes[cur.classId]?.name || '?'} [Passif] → Mort Explosive ! ${dmg} dégâts à ${combat.enemy.name} !`)
            if (combat.enemy.currentHp <= 0) {
                if (combat.enemy.isSummon) returnToOwner()
                else onVictory()
                return
            }
        }
    }

    const next = state.team.findIndex(m => m && m.currentHp > 0)
    if (next !== -1) combat.activeMemberIndex = next
}

// ═══════════════════════════════════════════════════════════════
// MODE RAID — 3 vs 3
// ═══════════════════════════════════════════════════════════════

// ─── Initialisation spécifique au raid ───────────────────────

function _initRaidCombat(areaId) {
    combat.isRaid             = true
    combat.enemies            = [spawnEnemy(areaId), spawnEnemy(areaId), spawnEnemy(areaId)]
    combat.enemyTimers        = [0, 0, 0]
    combat.enemyNextMoveIds   = combat.enemies.map(e => pickNextEnemyMove(e))
    combat.raidRespawnPending = [false, false, false]
    combat.raidSavedEnemies   = [null, null, null]
    combat.pendingRaidSwap    = null
    combat.raidKillCount      = 0
    combat.raidMiniBossActive = false

    // Les 3 premiers membres vivants deviennent les slots actifs
    const aliveIdx = []
    for (let i = 0; i < state.team.length; i++) {
        if (state.team[i] && state.team[i].currentHp > 0) aliveIdx.push(i)
    }
    combat.raidSlots = [
        aliveIdx[0] !== undefined ? aliveIdx[0] : -1,
        aliveIdx[1] !== undefined ? aliveIdx[1] : -1,
        aliveIdx[2] !== undefined ? aliveIdx[2] : -1
    ]
}

// ─── Spawn d'un monstre spécifique (mini-boss) ───────────────

function _spawnEnemyById(monsterId, statMult = 1) {
    const area = areas[state.currentArea]
    const mob  = monsters[monsterId]
    if (!area || !mob) return null

    const minLvl   = area.mobMinLevel || area.minLevel
    const maxLvl   = area.mobMaxLevel || area.maxLevel
    const mobLevel = randomInt(minLvl, maxLvl)
    const scale    = 1 + (mobLevel - minLvl) * 0.05

    if (!state.seenMonsters) state.seenMonsters = {}
    state.seenMonsters[monsterId] = true

    const enemy = {
        id:             monsterId,
        name:           mob.name,
        element:        mob.element,
        level:          mobLevel,
        image:          mob.image,
        maxHp:          Math.floor(mob.bst.hp  * scale),
        currentHp:      Math.floor(mob.bst.hp  * scale),
        atk:            Math.floor(mob.bst.atk * scale),
        spd:            mob.bst.spd,
        res:            { ...mob.bst.res },
        finalDamagePct: 0,
        flatDamage:     0,
        moves:          mob.moves || [],
        moveIndex:      0,
        rarity:         mob.rarity   || 'commun',
        tier:           mob.tier     || 'normal',
        dropRate:       mob.dropRate,
        isRaidMiniBoss: true
    }

    // Multiplicateur de difficulté défini dans areaDictionary (ex. miniBoss.statMult: 3)
    if (statMult > 1) {
        enemy.maxHp     = Math.floor(enemy.maxHp * statMult)
        enemy.currentHp = enemy.maxHp
        enemy.atk       = Math.floor(enemy.atk   * statMult)
    }

    // Difficulté modulée skull (appliqué après statMult)
    const SKULL_MULT = [1, 2, 3, 5]
    const skullMult  = SKULL_MULT[state.skullLevel] || 1
    if (skullMult > 1) {
        enemy.maxHp     = Math.floor(enemy.maxHp * skullMult)
        enemy.currentHp = enemy.maxHp
        enemy.atk       = Math.floor(enemy.atk   * skullMult)
    }

    return enemy
}

// ─── Apparition du mini-boss (push chain slot 0←1←2) ─────────

function _spawnRaidMiniBoss() {
    const area = areas[state.currentArea]
    if (!area?.miniBoss) return
    const boss = _spawnEnemyById(area.miniBoss.id, area.miniBoss.statMult || 1)
    if (!boss) return

    // Sauvegarde des ennemis/timers existants
    const e0 = combat.enemies[0], t0 = combat.enemyTimers[0], m0 = combat.enemyNextMoveIds[0]
    const e1 = combat.enemies[1], t1 = combat.enemyTimers[1], m1 = combat.enemyNextMoveIds[1]

    // Push : slot1 → slot2, slot0 → slot1, boss → slot0
    // Si l'ennemi poussé est mort (ex: c'est lui qui a déclenché le seuil), on en spawn un frais
    // plutôt que de pousser un cadavre avec raidRespawnPending=false → slot bloqué indéfiniment
    const e1Live = e1 && e1.currentHp > 0
    combat.enemies[2]          = e1Live ? e1 : spawnEnemy(state.currentArea)
    combat.enemyTimers[2]      = e1Live ? t1 : 0
    combat.enemyNextMoveIds[2] = e1Live ? m1 : pickNextEnemyMove(combat.enemies[2])

    const e0Live = e0 && e0.currentHp > 0
    combat.enemies[1]          = e0Live ? e0 : spawnEnemy(state.currentArea)
    combat.enemyTimers[1]      = e0Live ? t0 : 0
    combat.enemyNextMoveIds[1] = e0Live ? m0 : pickNextEnemyMove(combat.enemies[1])

    combat.enemies[0]          = boss
    combat.enemyTimers[0]      = 0
    combat.enemyNextMoveIds[0] = pickNextEnemyMove(boss)

    combat.raidRespawnPending  = [false, false, false]
    combat.raidMiniBossActive  = true
    updateCombatUI()
}

// ─── Boucle principale Raid ───────────────────────────────────

function raidGameTick() {
    try {
    for (const m of state.team) {
        if (m && isNaN(m.currentHp)) m.currentHp = 0
    }
    for (let i = 0; i < 3; i++) {
        if (combat.enemies[i] && isNaN(combat.enemies[i].currentHp)) combat.enemies[i].currentHp = 0
    }

    // Tick des 3 slots membres
    for (let slotIdx = 0; slotIdx < 3; slotIdx++) {
        let memberIdx = combat.raidSlots[slotIdx]
        if (memberIdx === -1) continue
        const member = state.team[memberIdx]
        if (!member || member.currentHp <= 0) {
            _autoSwitchRaidSlot(slotIdx)
            continue
        }

        const targetSlot = _getRaidTargetSlot(slotIdx)
        if (targetSlot === -1) continue

        const stats = getEffectiveStats(member)
        const rate  = (100 / (BASE_TIME / TICK_MS)) * ((stats.spd || 100) / 100)
        combat.memberTimers[memberIdx] = (combat.memberTimers[memberIdx] || 0) + rate

        if (combat.memberTimers[memberIdx] >= 100) {
            combat.memberTimers[memberIdx] = 0
            if (!combat.raidRespawnPending[targetSlot]) {
                executeMemberActionRaid(memberIdx, slotIdx)
            }
        }
    }

    // Tick des 3 ennemis
    for (let slotIdx = 0; slotIdx < 3; slotIdx++) {
        const enemy = combat.enemies[slotIdx]
        if (!enemy || enemy.currentHp <= 0 || combat.raidRespawnPending[slotIdx]) continue

        let effectiveSpd = enemy.spd || 100
        for (const b of (enemy.buffs || [])) {
            if (b.stat === 'spd') effectiveSpd += b.value
        }
        effectiveSpd = Math.max(1, effectiveSpd)
        const rate = (100 / (BASE_TIME / TICK_MS)) * (effectiveSpd / 100)
        combat.enemyTimers[slotIdx] = (combat.enemyTimers[slotIdx] || 0) + rate

        if (combat.enemyTimers[slotIdx] >= 100) {
            combat.enemyTimers[slotIdx] = 0
            executeEnemyActionRaid(slotIdx)
        }
    }
    } catch(e) { console.error('[raidGameTick]', e) }
}

// ─── Ciblage ─────────────────────────────────────────────────

// Renvoie le slot ennemi cible depuis le slot membre fromSlotIdx
// → slot miroir si ennemi vivant, sinon premier ennemi vivant
function _getRaidTargetSlot(fromSlotIdx) {
    const primary = combat.enemies[fromSlotIdx]
    if (primary && primary.currentHp > 0 && !combat.raidRespawnPending[fromSlotIdx]) {
        return fromSlotIdx
    }
    for (let i = 0; i < 3; i++) {
        const e = combat.enemies[i]
        if (e && e.currentHp > 0 && !combat.raidRespawnPending[i]) return i
    }
    return -1
}

// Renvoie l'index de l'ennemi vivant de référence (premier trouvé)
function _getFirstAliveRaidEnemy() {
    for (let i = 0; i < 3; i++) {
        const e = combat.enemies[i]
        if (e && e.currentHp > 0 && !combat.raidRespawnPending[i]) return e
    }
    return null
}

// Renvoie l'index équipe du membre ciblé par l'ennemi du slot enemySlotIdx
// → membre du slot miroir si vivant, sinon premier membre vivant (dernier survivant prend tout)
function _getRaidTargetMember(enemySlotIdx) {
    const slotMemberIdx = combat.raidSlots[enemySlotIdx]
    if (slotMemberIdx !== -1) {
        const m = state.team[slotMemberIdx]
        if (m && m.currentHp > 0) return slotMemberIdx
    }
    for (let i = 0; i < state.team.length; i++) {
        const m = state.team[i]
        if (m && m.currentHp > 0) return i
    }
    return -1
}

// ─── Action d'un membre (Raid) ────────────────────────────────

function executeMemberActionRaid(memberIdx, slotIdx) {
    const member = state.team[memberIdx]
    if (!member) return

    tickDots(member, () => {
        _autoSwitchRaidSlot(slotIdx)
        if (state.team.every(m => !m || m.currentHp <= 0)) onDefeat()
    })
    if (member.currentHp <= 0) return
    tickHots(member)

    const targetSlotIdx = _getRaidTargetSlot(slotIdx)
    if (targetSlotIdx === -1) return
    combat.raidCurrentTargetSlot = targetSlotIdx
    const targetEnemy = combat.enemies[targetSlotIdx]

    const stats = getEffectiveStats(member)
    const slots = ['slot1', 'slot2', 'slot3', 'slot4']
    const nonNull = slots.filter(s => {
        if (!member.moves[s]) return false
        if (!combat.syncedLevel) return true
        const cls    = classes[member.classId]
        const moveId = member.moves[s]
        if (moveId === cls?.startingMove) return true
        const unlockLvl = Object.entries(cls?.learnset || {}).find(([, v]) => v === moveId)?.[0]
        return !unlockLvl || parseInt(unlockLvl) <= combat.syncedLevel
    })
    if (!nonNull.length) return

    const XELOR_PATTERN = [0, 1, 2, 3, 2, 1, 0]
    const isXelor       = classes[member.classId]?.passive?.id === 'xelor' && nonNull.length === 4
    const rawMoveIdx    = combat.memberMoveIndex[memberIdx]

    let idx, prevNonNullIdx
    if (isXelor) {
        idx            = XELOR_PATTERN[rawMoveIdx % 7]
        prevNonNullIdx = XELOR_PATTERN[(rawMoveIdx + 6) % 7]
    } else {
        idx            = rawMoveIdx % nonNull.length
        prevNonNullIdx = (idx - 1 + nonNull.length) % nonNull.length
    }

    const moveId = member.moves[nonNull[idx]]
    combat.memberMoveIndex[memberIdx]++

    const rawMv = move[moveId]
    if (!rawMv) return
    const effectiveLvl = combat.syncedLevel ? Math.min(member.level, combat.syncedLevel) : member.level
    const mv = applyProgression(rawMv, effectiveLvl)
    if (!mv?.effects) return

    const rawPrevMv = move[member.moves[nonNull[prevNonNullIdx]]]
    const prevMv    = rawPrevMv ? applyProgression(rawPrevMv, effectiveLvl) : null

    let lastDamageDealt = 0
    let sessionDmg = 0
    for (const effect of mv.effects) {
        const dmg = executeEffect({
            caster: member, casterStats: stats, targetEnemy,
            effect, moveData: mv, prevMv, lastDamageDealt, moveId,
            enemySlotIdx: targetSlotIdx,
            onTargetKill: () => onRaidEnemyDeath(targetSlotIdx, memberIdx),
            raidSlotIdx: slotIdx
        })
        if (dmg !== undefined) { lastDamageDealt = dmg; sessionDmg += dmg }
    }
    if (sessionDmg > 0) {
        combat.sessionLoot.memberDamage[memberIdx] = (combat.sessionLoot.memberDamage[memberIdx] || 0) + sessionDmg
    }

    _applyHealOnCast(member, mv)
    tickBuffs(member)

    const newRawIdx   = combat.memberMoveIndex[memberIdx]
    const cycleLength = isXelor ? 7 : nonNull.length
    _applyPassiveTick(member, memberIdx, newRawIdx, cycleLength, targetEnemy)

    combat.memberTimers[memberIdx] = 100 - ((mv.cooldownMs ?? BASE_TIME) / BASE_TIME * 100)
}

// ─── Action d'un ennemi (Raid) ────────────────────────────────

function executeEnemyActionRaid(slotIdx) {
    const enemy = combat.enemies[slotIdx]
    if (!enemy || enemy.currentHp <= 0) return

    tickDots(enemy, () => onRaidEnemyDeath(slotIdx, -1))
    if (!combat.enemies[slotIdx] || combat.enemies[slotIdx].currentHp <= 0) return

    const e          = combat.enemies[slotIdx]
    const curMoveIdx = e.moveIndex % e.moves.length
    const moveId     = e.moves[curMoveIdx]
    e.moveIndex++
    if (!moveId) return
    const mv = move[moveId]
    if (!mv?.effects) return
    const prevMoveIdx = (curMoveIdx - 1 + e.moves.length) % e.moves.length
    const prevMv      = e.moves[prevMoveIdx] ? (move[e.moves[prevMoveIdx]] || null) : null

    const targetMemberIdx = _getRaidTargetMember(slotIdx)
    if (targetMemberIdx === -1) { onDefeat(); return }
    const target = state.team[targetMemberIdx]
    if (!target || target.currentHp <= 0) { onDefeat(); return }

    const enemyStats = {
        atk: e.atk || 0, flatDamage: 0, finalDamagePct: 0,
        spellDamagePct: 0, damageReductionPct: 0,
        critChance: 0, critDamagePct: 50, res: e.res || {}
    }
    for (const b of (e.buffs || [])) {
        if (b.stat in enemyStats) enemyStats[b.stat] += b.value
    }

    const targetStats = getEffectiveStats(target)
    const logPrefix   = `${e.name} utilise `

    let lastDamageDealt = 0
    for (const effect of mv.effects) {
        const dmg = executeEffect({
            caster: e, casterStats: enemyStats,
            targetEnemy: target, targetStats,
            effect, moveData: mv, prevMv, lastDamageDealt,
            logPrefix,
            onTargetKill: () => {
                _autoSwitchRaidSlot(slotIdx)
                if (state.team.every(m => !m || m.currentHp <= 0)) onDefeat()
            }
        })
        if (dmg !== undefined) lastDamageDealt = dmg
    }

    tickBuffs(e)
    if (combat.enemies[slotIdx]) {
        combat.enemyNextMoveIds[slotIdx] = pickNextEnemyMove(combat.enemies[slotIdx])
    }

    combat.enemyTimers[slotIdx] = 100 - ((mv.cooldownMs ?? BASE_TIME) / BASE_TIME * 100)
}

// ─── Mort d'un ennemi Raid → loot + respawn ───────────────────

function onRaidEnemyDeath(slotIdx, killerMemberIdx) {
    if (combat.raidRespawnPending[slotIdx]) return
    combat.raidRespawnPending[slotIdx] = true

    const defeatedEnemy = combat.enemies[slotIdx]

    // XP : le tueur reçoit 1.0×, les autres vivants 0.5×
    const xpResults = []
    for (let i = 0; i < state.team.length; i++) {
        const member = state.team[i]
        if (!member || member.currentHp <= 0) continue
        const mult   = (i === killerMemberIdx) ? 1.0 : 0.5
        const xp     = Math.floor(calculateXPReward(defeatedEnemy, member) * mult)
        const result = giveXP(member, xp)
        xpResults.push({ member, xp, ...result })
    }

    const _raidLootTable = defeatedEnemy?.isRaidMiniBoss
        ? (areas[state.currentArea]?.miniBossLootTable || null)
        : null
    let loot = { xpResults, familiarDrop: null, itemDrops: [], caisseDropped: false }
    try {
        loot = processVictoryLoot(defeatedEnemy, _raidLootTable)
        loot.xpResults = xpResults
    } catch(e) {
        console.error('[onRaidEnemyDeath] loot error:', e)
    }

    combat.pendingLoot = loot
    combat.sessionLoot.killCount++
    if (killerMemberIdx >= 0) {
        combat.memberKillCount[killerMemberIdx] = (combat.memberKillCount[killerMemberIdx] || 0) + 1
    }

    if (loot.itemDrops?.length > 0) {
        for (const d of loot.itemDrops) {
            if (d.convertedToKamas) {
                combat.sessionLoot.kamasFromDrops += d.kamas || 10
            } else {
                combat.sessionLoot.itemDrops.push(d)
                if (item[d.itemId]?.isKey) {
                    combat.sessionLoot.keyDrops[d.itemId] = (combat.sessionLoot.keyDrops[d.itemId] || 0) + 1
                }
            }
        }
    }
    if (loot.familiarDrop) {
        combat.sessionLoot.familiarDrops.push(loot.familiarDrop)
        if (activeMenu === 'collection' || activeMenu === 'Encyclopedie') updateCollectionUI()
    }
    if (loot.caisseDropped) combat.sessionLoot.caisseCount++

    let anyLevelUp = false
    for (const r of xpResults) {
        if (r.leveledUp) {
            anyLevelUp = true
            showNotification(`${classes[r.member.classId]?.name} → Niveau ${r.newLevel} !`, 'level')
        }
        for (const moveId of (r.newMoves || [])) {
            combat.sessionLoot.learnedMoves.push({ member: r.member, moveId })
        }
    }
    if (anyLevelUp) saveGame()

    // ─── Sélection du comportement post-mort ─────────────────────
    const area       = areas[state.currentArea]
    const isMiniBoss = !!defeatedEnemy?.isRaidMiniBoss

    if (isMiniBoss) {
        // Mini-boss vaincu → reset compteur + respawn de tous les slots vides
        combat.raidMiniBossActive = false
        combat.raidKillCount      = 0
        setTimeout(() => {
            if (!state.isRunning || !state.currentArea) return
            for (let i = 0; i < 3; i++) {
                const e = combat.enemies[i]
                if (!e || e.currentHp <= 0) {
                    combat.enemies[i]           = spawnEnemy(state.currentArea)
                    combat.enemyTimers[i]        = 0
                    combat.enemyNextMoveIds[i]   = pickNextEnemyMove(combat.enemies[i])
                }
                combat.raidRespawnPending[i] = false
            }
            updateCombatUI()
        }, 500)
        return
    }

    if (combat.raidMiniBossActive) {
        // Mob lambda mort pendant la phase mini-boss → pas de respawn
        setTimeout(() => {
            combat.raidRespawnPending[slotIdx] = false
            updateCombatUI()
        }, 500)
        return
    }

    // Mob lambda normal → incrément compteur + éventuel déclenchement mini-boss
    combat.raidKillCount = (combat.raidKillCount || 0) + 1
    const everyKills = area?.miniBoss?.everyKills

    if (everyKills && combat.raidKillCount % everyKills === 0) {
        setTimeout(() => {
            if (!state.isRunning || !state.currentArea) return
            _spawnRaidMiniBoss()
        }, 500)
    } else {
        setTimeout(() => {
            combat.raidRespawnPending[slotIdx] = false
            if (!state.isRunning || !state.currentArea) return
            combat.enemies[slotIdx]          = spawnEnemy(state.currentArea)
            combat.enemyTimers[slotIdx]      = 0
            combat.enemyNextMoveIds[slotIdx] = pickNextEnemyMove(combat.enemies[slotIdx])
            combat.raidSavedEnemies[slotIdx] = null
            updateCombatUI()
        }, 500)
    }
}

// ─── Remplacement d'un membre mort (Raid) ────────────────────

function _autoSwitchRaidSlot(slotIdx) {
    if (!combat) return
    const memberIdx = combat.raidSlots[slotIdx]
    if (memberIdx === -1) return
    const member = state.team[memberIdx]
    if (member && member.currentHp > 0) return

    // Passif Roublard
    if (member && !combat.memberDeathHandled?.[memberIdx]) {
        combat.memberDeathHandled[memberIdx] = true
        if (classes[member.classId]?.passive?.id === 'roublard') {
            const targetEnemy = combat.enemies[slotIdx]?.currentHp > 0
                ? combat.enemies[slotIdx]
                : _getFirstAliveRaidEnemy()
            if (targetEnemy && targetEnemy.currentHp > 0) {
                const dmg         = Math.floor((member.maxHp || 0) * 0.30)
                targetEnemy.currentHp = Math.max(0, targetEnemy.currentHp - dmg)
                addLog(`${member.name || classes[member.classId]?.name || '?'} [Passif] → Mort Explosive ! ${dmg} dégâts !`)
                if (targetEnemy.currentHp <= 0) {
                    const enemySlot = combat.enemies.indexOf(targetEnemy)
                    if (enemySlot !== -1) onRaidEnemyDeath(enemySlot, memberIdx)
                    // Continue pour chercher un remplaçant
                }
            }
        }
    }

    // Cherche le premier membre du banc vivant
    const activeSet = new Set(combat.raidSlots.filter(i => i !== -1))
    let replacement = -1
    for (let i = 0; i < state.team.length; i++) {
        if (!activeSet.has(i) && state.team[i] && state.team[i].currentHp > 0) {
            replacement = i
            break
        }
    }

    if (replacement !== -1) {
        combat.raidSlots[slotIdx]         = replacement
        combat.memberTimers[replacement]  = 0
        const name = state.team[replacement]?.name || classes[state.team[replacement]?.classId]?.name || '?'
        addLog(`${name} entre en combat !`)
    } else {
        combat.raidSlots[slotIdx] = -1
        if (state.team.every(m => !m || m.currentHp <= 0)) onDefeat()
    }
}

// ─── Swap manuel de membres (Raid) ───────────────────────────

function setRaidMemberForSwap(teamIdx) {
    const member = state.team[teamIdx]
    if (!member || member.currentHp <= 0) {
        combat.pendingRaidSwap = null
        updateCombatUI()
        return
    }

    if (combat.pendingRaidSwap === null) {
        combat.pendingRaidSwap = teamIdx
        updateCombatUI()
        return
    }
    if (combat.pendingRaidSwap === teamIdx) {
        combat.pendingRaidSwap = null
        updateCombatUI()
        return
    }

    const idxA = combat.pendingRaidSwap
    const idxB = teamIdx
    const posA = combat.raidSlots.indexOf(idxA)
    const posB = combat.raidSlots.indexOf(idxB)

    if (posA !== -1 && posB !== -1) {
        // Les deux sont actifs → échange de slots
        combat.raidSlots[posA] = idxB
        combat.raidSlots[posB] = idxA
        combat.memberTimers[idxA] = 0
        combat.memberTimers[idxB] = 0
    } else if (posA !== -1) {
        // A actif, B banc → B entre dans le slot de A
        combat.raidSlots[posA] = idxB
        combat.memberTimers[idxB] = 0
    } else if (posB !== -1) {
        // B actif, A banc → A entre dans le slot de B
        combat.raidSlots[posB] = idxA
        combat.memberTimers[idxA] = 0
    }
    // Les deux au banc → aucun effet fonctionnel

    combat.pendingRaidSwap = null
    updateCombatUI()
}
