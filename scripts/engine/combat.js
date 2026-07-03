// engine/combat.js — Boucle de combat auto-battler DofusChill
//
// Chaque membre + l'ennemi a une barre de progression (0–100).
// La barre avance proportionnellement à la vitesse de lancé du sort
// À 100%, l'entité exécute son action et la barre se remet à 0.

const TICK_MS    = 1000 / 60   // 60 fps
const BASE_TIME  = 2000        // cooldown par défaut (ms) si un sort n'en a pas

// Résout la définition de moves d'un monstre en tableau plat de 0-4 IDs.
// Format simple  : ['A','B','C']          → shufflé, max 4 pris
// Format avancé  : { pool:[], fixed:[] }  → N slots tirés du pool + fixed toujours en dernier
// Ratios (HPmax/HPmin − 1) et (ATKmax/ATKmin − 1) par maxLevel de zone.
// Le scaleStep réel = ratio / (mobMaxLevel − mobMinLevel), calculé à la volée
// pour gérer les zones à range variable (ex: 200 range 10 vs range 15).
const _HP_RATIO = {
     20: 0.333,  30: 1.500,  40: 1.667,  50: 1.857,  60: 1.870,
     70: 1.879,  80: 1.949,  90: 1.944, 100: 2.000,
    110: 1.278, 120: 1.000, 130: 0.853, 140: 0.762, 150: 0.700,
    160: 0.655, 170: 0.621, 180: 0.595, 190: 0.573, 200: 0.556
}
const _ATK_RATIO = {
     20: 5.000,  30: 1.400,  40: 1.125,  50: 0.917,  60: 0.750,
     70: 0.789,  80: 0.696,  90: 0.731, 100: 0.667,
    110: 0.629, 120: 0.600, 130: 0.578, 140: 0.560, 150: 0.545,
    160: 0.533, 170: 0.523, 180: 0.514, 190: 0.507, 200: 0.500
}

function resolveMonsterMoves(movesDef) {
    if (!movesDef) return []
    const _shuffle = arr => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]]
        }
        return arr
    }
    if (Array.isArray(movesDef)) return _shuffle([...movesDef]).slice(0, 4)
    const pool        = _shuffle([...(movesDef.pool  || [])])
    const fixed       = (movesDef.fixed || []).slice(0, 4)
    const randomCount = Math.max(0, 4 - fixed.length)
    return [...pool.slice(0, randomCount), ...fixed]
}

// Retourne le cooldown (ms) du prochain sort qu'un membre va lancer.
// Utilisé pour calibrer le taux de remplissage de la barre : barre = cooldownMs / (spd/100).
function _peekNextCastCooldown(member, memberIndex) {
    if (!member?.moves) return BASE_TIME
    const effectiveLvl = combat?.syncedLevel ? Math.min(member.level, combat.syncedLevel) : member.level
    const slots = ['slot1', 'slot2', 'slot3', 'slot4']
    const nonNull = slots.filter(s => {
        if (!member.moves[s]) return false
        if (!combat?.syncedLevel) return true
        const cls = classes[member.classId]
        const moveId = member.moves[s]
        if (moveId === cls?.startingMove) return true
        const unlockLvl = Object.entries(cls?.learnset || {}).find(([, v]) => v === moveId)?.[0]
        return !unlockLvl || parseInt(unlockLvl) <= combat.syncedLevel
    })
    if (!nonNull.length) return BASE_TIME
    const XELOR_PATTERN = [0, 1, 2, 3, 2, 1, 0]
    const isXelor = classes[member.classId]?.passive?.id === 'xelor' && nonNull.length === 4
    const rawIdx = combat?.memberMoveIndex?.[memberIndex] ?? 0
    const idx = isXelor ? XELOR_PATTERN[rawIdx % 7] : rawIdx % nonNull.length
    const rawSpell = move[member.moves[nonNull[idx]]]
    const cd = rawSpell ? applyProgression(rawSpell, effectiveLvl).cooldownMs : undefined
    return cd ?? BASE_TIME
}

// Retourne le cooldown (ms) du prochain sort d'un ennemi.
function _peekEnemyCastCooldown(enemy) {
    if (!enemy?.moves?.length) return BASE_TIME
    const nextMoveId = enemy.moves[enemy.moveIndex % enemy.moves.length]
    if (!nextMoveId) return BASE_TIME
    const rawSpell = move[nextMoveId]
    return rawSpell ? (applyProgression(rawSpell, enemy.level || 1).cooldownMs ?? BASE_TIME) : BASE_TIME
}


let _rafId         = null
let _lastFrameTime = 0
let _accumulator   = 0
let combat         = null   // état du combat en cours
let _autoPilot        = null   // { remaining: N, accumulated: sessionLoot } | null
let _dungeonAutoRun   = null   // { accumulated: sessionLoot } | null — relance auto donjon
let _afkSeconds       = 0      // secondes d'absence à rattraper en fast-forward
let _combatSpeedMult  = 1.0    // 1=normal, 0=pause, 0.5=lent×2, 0.33=lent×3, 0.25=lent×4
let _lastAfkUiUpdate  = 0      // timestamp du dernier updateCombatUI pendant le fast-forward

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
        if (state.isRunning) {
            const now = performance.now()
            if (_afkSeconds <= 0 || now - _lastAfkUiUpdate > 300) {
                _lastAfkUiUpdate = now
                updateCombatUI()
            }
        }
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
    state.autoPilotAccumulated      = _autoPilot ? JSON.parse(JSON.stringify(_autoPilot.accumulated)) : null
    state.offlineAutoPilotRemaining = _autoPilot ? _autoPilot.remaining : 0
    // Wanted : pas de reprise de page (team morte au restart), mais on sync les PV du boss en cours
    // Ne sync que si le boss est encore vivant — évite d'écraser le currentHp=maxHp posé par _onWantedVictory
    if (combat?.isWanted && combat.enemy && combat.enemy.currentHp > 0) {
        const _wsSync = _wantedBossState(combat.isWanted)
        if (_wsSync) _wsSync.currentHp = Math.max(0, combat.enemy.currentHp ?? 0)
    }
    if (!combat || !state.isRunning || combat.isRaid || combat.isPoutch || combat.isWanted) {
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
        critChance:     combat.enemy.critChance    || 0,
        critDamagePct:  combat.enemy.critDamagePct ?? 50,
        critResPct:     combat.enemy.critResPct    || 0,
        moves:          [...(combat.enemy.moves || [])],
        moveIndex:      combat.enemy.moveIndex || 0,
        rarity:         combat.enemy.rarity,
        tier:           combat.enemy.tier,
        dropRate:       combat.enemy.dropRate,
        isArchi:        combat.enemy.isArchi || false,
        buffs:          JSON.parse(JSON.stringify(combat.enemy.buffs  || [])),
        dots:           JSON.parse(JSON.stringify(combat.enemy.dots   || [])),
        shield:         combat.enemy.shield ? JSON.parse(JSON.stringify(combat.enemy.shield)) : null,
    } : null
    state.savedCombatState = {
        memberTimers:         [...combat.memberTimers],
        memberMoveIndex:      [...combat.memberMoveIndex],
        activeMemberIndex:    combat.activeMemberIndex,
        enemyTimer:           combat.enemyTimer,
        memberKillCount:      { ...combat.memberKillCount },
        memberPassiveState:   JSON.parse(JSON.stringify(combat.memberPassiveState   || {})),
        spellStacks:          JSON.parse(JSON.stringify(combat.spellStacks          || {})),
        memberTrophyCounters: JSON.parse(JSON.stringify(combat.memberTrophyCounters || {})),
        sessionLoot:          JSON.parse(JSON.stringify(combat.sessionLoot)),
        syncedLevel:          combat.syncedLevel || null,
        dofusKillStacks:      JSON.parse(JSON.stringify(combat.dofusKillStacks   || {})),
        dofusDamageCounter:   JSON.parse(JSON.stringify(combat.dofusDamageCounter || {})),
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
    if (!area.spawns || area.spawns.length === 0) return null

    // Sélection pondérée — dropRateElite booste le poids des mobs elite/rare/légendaire
    const _eliteBonus = (getAllTeamFarmingBonuses().dropRateElite || 0) / 100
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
    if (!mob) { console.error(`[spawnEnemy] Unknown monster: ${spawnId}`); return null }
    const mobLevel = mob.fixedLevel ?? randomInt(area.mobMinLevel, area.mobMaxLevel)
    const _range   = (area.mobMaxLevel - area.mobMinLevel) || 1
    const _t       = mob.fixedLevel != null ? 0 : (mobLevel - area.mobMinLevel)
    const hpScale  = 1 + _t * (_HP_RATIO[area.maxLevel]  ?? 0.556) / _range
    const atkScale = 1 + _t * (_ATK_RATIO[area.maxLevel] ?? 0.500) / _range

    if (!state.seenMonsters) state.seenMonsters = {}
    state.seenMonsters[spawnId] = true

    const enemy = {
        id:       spawnId,
        name:     mob.name,
        element:  mob.element,
        level:    mobLevel,
        image:    mob.image,
        maxHp:    Math.floor(mob.bst.hp  * hpScale),
        currentHp:Math.floor(mob.bst.hp  * hpScale),
        atk:      Math.floor(mob.bst.atk * atkScale),
        spd:      mob.bst.spd,          // vitesse native 100 (pas de scaling par niveau)
        res:      { ...mob.bst.res },
        finalDamagePct: 0,
        flatDamage:     0,
        critChance:     mob.bst.critChance    ?? 5,
        critDamagePct:  mob.bst.critDamagePct ?? 50,
        critResPct:     mob.bst.res?.crit     ?? 0,
        moves:     resolveMonsterMoves(mob.moves),
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

    enemy._baseMaxHp = enemy.maxHp
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
    if (!state.visitedAreas) state.visitedAreas = []
    if (!state.visitedAreas.includes(areaId)) {
        state.visitedAreas.push(areaId)
        state.shopPool = null
    }
    if (typeof musicStartCombat === 'function') musicStartCombat(areaId)

    // Donjon + relance auto : initialise l'accumulateur si pas déjà actif
    if (areas[areaId]?.type === 'dungeon' && state.dungeonAutoRestart) {
        if (!_dungeonAutoRun) _dungeonAutoRun = { accumulated: _emptySessionLoot() }
    } else if (areas[areaId]?.type !== 'dungeon') {
        _dungeonAutoRun = null
    }

    // Niveau synchro pour le mode modulé (skull > 0 → niveau = maxLevel de la zone)
    const _startArea = areas[areaId]
    let _syncedLevel = (state.skullLevel > 0 && _startArea?.maxLevel)
        ? _startArea.maxLevel : null

    // Wanted : cap de niveau sans difficulté skull
    const _pendingWantedId = state.pendingWantedId
        || (areas[areaId]?.type === 'wanted' ? areaId.replace(/^_wanted_/, '') : null)
    if (_pendingWantedId) {
        state.pendingWantedId = null
        const _wd = WantedBosses[_pendingWantedId]
        if (_wd?.levelCap) _syncedLevel = _wd.levelCap
    }

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
            const reason = _pendingWantedId ? 'Avis de Recherche — niveau trop élevé' : 'niveau trop élevé pour cette zone modulée'
            showNotification(`${count} équipement${count > 1 ? 's' : ''} retiré${count > 1 ? 's' : ''} (${reason})`, 'warning')
        }
    }

    // Réinitialise les HP seulement sur départ frais (reprise : HP sauvegardés dans state.team)
    if (!_isResume) {
        for (const m of state.team) {
            if (!m) continue
            const stats = getEffectiveStats(m, _syncedLevel)
            if (stats) { m.maxHp = stats.hp; m.currentHp = stats.hp }
            m.buffs      = []
            m.dots       = []
            m.hots       = []
            m.shield     = null
            m._baseMaxHp = m.maxHp
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
        dofusKillStacks:    {},
        dofusDamageCounter: {},
        spellStacks:           {},
        huppermageLastElement: {},
        huppermageComboCount:  0,
        enutrof_air_active:    0,
        enutrof_terre_active:  0,
        enutrof_eau_active:    0,
        enutrof_traps:         [],
        trapStacks:            {},
        trapOwners:            {},
        trapEffects:           {},
        sessionLoot:           _emptySessionLoot(),
        dungeonBossQueue:      null,
        playerAttackCount:     0,
        memberTrophyCounters:  {}
    }
    if (_pendingWantedId) {
        combat.isWanted      = _pendingWantedId
        combat.wantedStartHp = _wantedBossState(_pendingWantedId)?.currentHp ?? 0
    }

    if (_isResume && state.savedCombatState) {
        // Restaure les timers, loot et états passifs depuis la sauvegarde
        const sc = state.savedCombatState
        if (sc.memberTimers)              combat.memberTimers       = [...sc.memberTimers]
        if (sc.memberMoveIndex)           combat.memberMoveIndex    = [...sc.memberMoveIndex]
        if (sc.activeMemberIndex != null) combat.activeMemberIndex  = sc.activeMemberIndex
        if (sc.enemyTimer        != null) combat.enemyTimer         = sc.enemyTimer
        if (sc.memberKillCount)           combat.memberKillCount    = { ...sc.memberKillCount }
        if (sc.memberPassiveState)        combat.memberPassiveState   = JSON.parse(JSON.stringify(sc.memberPassiveState))
        if (sc.spellStacks)               combat.spellStacks          = JSON.parse(JSON.stringify(sc.spellStacks))
        if (sc.memberTrophyCounters)      combat.memberTrophyCounters = JSON.parse(JSON.stringify(sc.memberTrophyCounters))
        if (sc.sessionLoot)               combat.sessionLoot          = JSON.parse(JSON.stringify(sc.sessionLoot))
        if (sc.dofusKillStacks)           combat.dofusKillStacks      = JSON.parse(JSON.stringify(sc.dofusKillStacks))
        if (sc.dofusDamageCounter)        combat.dofusDamageCounter   = JSON.parse(JSON.stringify(sc.dofusDamageCounter))
        state.savedCombatState = null
    } else {
        // Pré-calcul des états passifs initiaux
        for (let i = 0; i < state.team.length; i++) {
            const m = state.team[i]
            if (!m) continue
            const passive = classes[m.classId]?.passive
            combat.memberPassiveState[i] = {}
            if (passive?.id === 'pandawa')     combat.memberPassiveState[i].state = 'normal'
            if (passive?.id === 'ecaflip') {
                const ROULETTE = [
                    { stat: 'finalDamagePct', value:  15, label: '+15% dégâts' },
                    { stat: 'finalDamagePct', value:  -5, label: '-5% dégâts'  },
                    { stat: 'critChance',     value:  15, label: '+15% crit'    },
                    { stat: 'critChance',     value:  -5, label: '-5% crit'     },
                    { stat: 'res_all',        value:  10, label: '+10% rés all' },
                    { stat: 'res_all',        value:  -5, label: '-5% rés all'  },
                ]
                const rolled = ROULETTE[Math.floor(Math.random() * ROULETTE.length)]
                combat.memberPassiveState[i].ecaflipEffect = rolled
                addLog(`${m.name || classes[m.classId]?.name || '?'} [Roulette] → ${rolled.label} pour ce cycle !`)
            }
            if (passive?.id === 'huppermage') {
                const slots = ['slot1', 'slot2', 'slot3', 'slot4']
                const _DYNAMIC = new Set(['best_element_damage', 'worst_element_damage',
                    'absorbElementDmg', 'elementDmgPeek', 'nextElementDmg'])
                const elements = slots.map(s => {
                    const mid = m.moves?.[s]
                    if (!mid) return null
                    const mv = move[mid]
                    if (!mv) return null
                    // Sort à élément dynamique → ne compte pas
                    if (mv.effects?.some(e => _DYNAMIC.has(e.type))) return null
                    const dmgElems = new Set(
                        (mv.effects || [])
                            .filter(e => e.type === 'damage' || e.type === 'dot' || e.type === 'damage_zone')
                            .map(e => e.element).filter(e => e && e !== 'neutre')
                    )
                    // Doit avoir exactement 1 élément fixe
                    return dmgElems.size === 1 ? [...dmgElems][0] : null
                }).filter(Boolean)
                combat.memberPassiveState[i].huppermageBonus =
                    elements.length === 4 && new Set(elements).size === 4
            }
        }
    }

    if (_isResume && state.savedCombatEnemy) {
        if ((state.savedCombatEnemy.currentHp ?? 1) <= 0) {
            // Enemy was dead at save time (killed during 500 ms respawn window) — spawn fresh
            combat.enemy = spawnEnemy(areaId)
        } else {
            combat.enemy = JSON.parse(JSON.stringify(state.savedCombatEnemy))
        }
        combat.enemyNextMoveId = pickNextEnemyMove(combat.enemy)
        state.savedCombatEnemy = null
    } else if (areas[areaId]?.type === 'raid') {
        _initRaidCombat(areaId)
    } else {
        const _areaSeq = areas[areaId]
        if (_areaSeq?.bossMode === 'sequential' && _areaSeq.spawns?.length > 1) {
            const _order = [..._areaSeq.spawns].sort(() => Math.random() - 0.5).map(s => s.id)
            combat.dungeonBossQueue = _order.slice(1)
            combat.enemy = _spawnEnemyById(_order[0])
            if (combat.enemy) combat.enemy.isRaidMiniBoss = false
        } else {
            combat.enemy = spawnEnemy(areaId)
            // Wanted : remplace les stats spawned par les valeurs persistées
            if (_pendingWantedId && combat.enemy) {
                const _ws = _wantedBossState(_pendingWantedId)
                const _wd = WantedBosses[_pendingWantedId]
                if (_ws && _wd) {
                    combat.enemy.maxHp      = _ws.maxHp
                    combat.enemy.currentHp  = _ws.currentHp
                    combat.enemy.atk        = Math.floor(_wd.bst.atk * _ws.statMultiplier)
                    combat.enemy._baseMaxHp = _ws.maxHp
                }
            }
        }
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
    setCombatSpeed('play')
    if (!_isResume) {
        const _initActiveIdx = state.team.findIndex(m => m && m.currentHp > 0)
        if (_initActiveIdx !== -1) _triggerDofusOnActive(_initActiveIdx)
        _triggerSpawnWeaknessTrophies(combat.enemy)
    }
    updateCombatUI()
}

function stopCombat() {
    state.isRunning = false
    // Restaurer les membres remplacés par des invocations alliées actives
    if (combat?.savedMembers) {
        for (const [slotIdx, original] of Object.entries(combat.savedMembers)) {
            state.team[Number(slotIdx)] = original
        }
        combat.savedMembers = {}
    }
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

// ─── Contrôles de vitesse ─────────────────────────────────────────────────────

const _SPEED_MODES = { play: 1, pause: 0, slow1: 0.5, slow2: 1 / 3, slow3: 0.25 }

function setCombatSpeed(mode) {
    _combatSpeedMult = _SPEED_MODES[mode] ?? 1
    document.querySelectorAll('.combat-speed-btn').forEach(b => b.classList.remove('active'))
    const btn = document.getElementById('btn-speed-' + mode)
    if (btn) btn.classList.add('active')
}

function exitCombat() {
    const _exitAreaType = areas[state.currentArea]?.type || null
    state.savedCombatEnemy = null
    state.savedCombatState = null
    if (typeof musicExitZone === 'function') musicExitZone()
    _afkSeconds = 0
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
    if (_exitAreaType === 'wanted') switchMenu('wanted')
    else                            switchMenu('worldmap')
}

function leaveCombat() {
    state.savedCombatEnemy = null
    state.savedCombatState = null
    if (typeof musicExitZone === 'function') musicExitZone()
    if (combat?.isPoutch) {
        onPoutchEnd()
        return
    }
    const _wasRaid = !!combat?.isRaid
    _afkSeconds = 0
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
    showSessionSummary(_wasRaid ? 'raid' : 'leave')
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
    return { itemDrops: [], familiarDrops: [], caisseCount: 0, keyDrops: {}, dofusDrops: {}, kamasFromDrops: 0, killCount: 0, memberDamage: {}, memberDamageReceived: {}, learnedMoves: [] }
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
    for (const [dofusId, count] of Object.entries(src.dofusDrops || {})) {
        dest.dofusDrops[dofusId] = (dest.dofusDrops[dofusId] || 0) + count
    }
}

function startAutoPilot(qty) {
    const available = state.inventory['piloteAutomatique']?.count || 0
    const n = qty === 'max' ? available : Math.min(qty, available)
    if (n <= 0) return
    _autoPilot = { remaining: n, accumulated: _emptySessionLoot() }
    state.offlineAutoPilotRemaining = n
    saveGame()   // persiste immédiatement pour que le rechargement puisse restaurer _autoPilot
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
        m.buffs      = []
        m.dots       = []
        m.hots       = []
        m.shield     = null
        m._baseMaxHp = m.maxHp
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
        dofusKillStacks:    {},
        dofusDamageCounter: {},
        spellStacks:           {},
        huppermageLastElement: {},
        huppermageComboCount:  0,
        enutrof_air_active:    0,
        enutrof_terre_active:  0,
        enutrof_eau_active:    0,
        enutrof_traps:         [],
        isPoutch:              true,
        poutchMode:         mode,
        poutchTurns:        0,
        poutchBiggestHit:   0,
        memberTrophyCounters:  {},
        sessionLoot: {
            itemDrops: [], familiarDrops: [], killCount: 0,
            memberDamage: {}, memberDamageReceived: {},
            learnedMoves: [], kamasFromDrops: 0, keyDrops: {}, dofusDrops: {}
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
        moves:       resolveMonsterMoves(mob.moves),
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
        if (state.isRunning && _afkSeconds <= 0) updateCombatUI()
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
    const _spdMult = _afkSeconds > 0 ? 1 : _combatSpeedMult
    _autoSwitchActive()
    const activeIdx = combat.activeMemberIndex
    const activeM   = state.team[activeIdx]
    if (activeM && activeM.currentHp > 0) {
        if (!combat.respawnPending) {
            const stats = getEffectiveStats(activeM)
            const _mCd  = _peekNextCastCooldown(activeM, activeIdx)
            const rate  = (100 / (_mCd / TICK_MS)) * ((stats?.spd ?? activeM.spd ?? 100) / 100) * _spdMult
            combat.memberTimers[activeIdx] = (combat.memberTimers[activeIdx] || 0) + rate

            if (combat.memberTimers[activeIdx] >= 100) {
                combat.memberTimers[activeIdx] = 0
                if (combat.enemy && combat.enemy.currentHp > 0) executeMemberAction(activeIdx)
            }
        }
    }

    // Timer de l'ennemi (vitesse effective = spd + buffs/debuffs de vitesse)
    if (combat.enemy && combat.enemy.currentHp > 0 && !combat.respawnPending) {
        let effectiveEnemySpd = combat.enemy.spd || 100
        for (const b of (combat.enemy.buffs || [])) {
            if ((b.delay ?? 0) > 0) continue
            if (b.stat === 'spd') effectiveEnemySpd += b.value
        }
        if ((combat.enemy.buffs || []).some(b => b.stat === 'spdInvert' && !(b.delay ?? 0)))
            effectiveEnemySpd = 200 - effectiveEnemySpd
        effectiveEnemySpd = Math.max(25, effectiveEnemySpd)
        const _eCd = _peekEnemyCastCooldown(combat.enemy)
        const rate = (100 / (_eCd / TICK_MS)) * (effectiveEnemySpd / 100) * _spdMult
        combat.enemyTimer = (combat.enemyTimer || 0) + rate
        if (combat.enemyTimer >= 100) {
            combat.enemyTimer = 0
            executeEnemyAction()
        }
    }

    // Timer des compagnons alliés (indépendant du membre actif)
    for (let _ci = 0; _ci < state.team.length; _ci++) {
        const _cm = state.team[_ci]
        if (!_cm?.companion || _cm.companion.currentHp <= 0) continue
        const _comp      = _cm.companion
        if (!_comp.moves?.length) continue
        const _compMvId  = _comp.moves[_comp.moveIndex % _comp.moves.length]
        const _compCd    = move[_compMvId]?.cooldownMs || 2000
        const _compRate  = (100 / (_compCd / TICK_MS)) * _spdMult
        _comp.timer = (_comp.timer || 0) + _compRate
        if (_comp.timer >= 100) {
            _comp.timer = 0
            if (!combat.respawnPending) actCompanion(_cm)
        }
    }

    if (state.isRunning && _afkSeconds <= 0) updateCombatUI()
    combat._criticalErrors = 0
    } catch(e) {
        console.error('[gameTick]', e)
        if (combat) {
            combat._criticalErrors = (combat._criticalErrors || 0) + 1
            if (combat._criticalErrors > 10) {
                console.error('[gameTick] Erreur critique répétée — sortie forcée du combat')
                leaveCombat()
            }
        }
    }
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
    if (state.skullLevel > 0 && areas[state.currentArea]?.type === 'dungeon') {
        combat.playerAttackCount = (combat.playerAttackCount || 0) + 1
    }
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

    // Snapshot des états Énutrof avant l'action (pour la règle de décrément)
    const _prevEnutrof = {
        air:   combat.enutrof_air_active   || 0,
        terre: combat.enutrof_terre_active || 0,
        eau:   combat.enutrof_eau_active   || 0
    }

    // Déclenchement des brûlures Sentence en attente (ennemis 2 et 3 en raid uniquement)
    if (member.pendingBurns?.length && combat?.isRaid && combat.enemies) {
        const _burns = member.pendingBurns.splice(0)
        for (const burn of _burns) {
            for (let _bi = 1; _bi < combat.enemies.length; _bi++) {
                const _bTarget = combat.enemies[_bi]
                if (!_bTarget || _bTarget.currentHp <= 0) continue
                executeEffect({
                    caster: member, casterStats: stats, targetEnemy: _bTarget,
                    effect: { type: 'damage', element: burn.element, damage: burn.damage, target: 'enemy' },
                    moveData: { name: 'Sentence (brûlure)' }, moveId: 'sentence',
                    onTargetKill: () => { if (!_bTarget.isSummon) onRaidEnemyDeath(_bi, state.team.indexOf(member)) }
                })
            }
        }
    }

    const _skipSummonCompanion = mv.effects.some(e => e.type === 'summon_companion' && member.companion?.id === e.summonId && (member.companion?.currentHp ?? 0) > 0)

    // exécution des effets
    if (!_skipSummonCompanion) {
        const isCritRoll = Math.random() * 100 < (stats?.critChance || 0)
        let lastDamageDealt = 0
        let sessionDmg = 0
        for (const effect of mv.effects) {
            const dmg = executeEffect({
                caster: member, casterStats: stats, targetEnemy: combat.enemy,
                effect, moveData: mv, prevMv, lastDamageDealt, moveId,
                isCrit: isCritRoll,
                onTargetKill: () => {
                    if (combat.enemy?.isSummon) returnToOwner(true)
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

        const _SHIMMER_TYPES = new Set(['buff','buff_team','buff_adjacent','buff_slot','debuff','heal','heal_team','heal%maxHp','heal%maxHp_team'])
        if (isCritRoll && typeof showCritShimmer === 'function' && mv.effects.some(e => _SHIMMER_TYPES.has(e.type))) {
            showCritShimmer(memberIndex)
        }
    }

    // Décrément des états Énutrof — pas de décrément si l'état a été (re)posé ce tour
    for (const s of ['air', 'terre', 'eau']) {
        const k = `enutrof_${s}_active`
        if ((combat[k] || 0) > 0 && combat[k] === _prevEnutrof[s]) combat[k]--
    }

    // Décrément des pièges Énutrof (par action alliée)
    if (combat.enutrof_traps?.length) {
        for (const trap of combat.enutrof_traps) {
            if (trap._justSet) { trap._justSet = false; continue }
            if (trap.active > 0) trap.active--
        }
        combat.enutrof_traps = combat.enutrof_traps.filter(t => t.active > 0)
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

    _applyCastProcs(member, mv)
    _applyHealOnCast(member, mv)
    tickBuffs(member)

    // ─── Passifs déclenchés après l'action ───────────────────────────────────
    const newRawIdx   = combat.memberMoveIndex[memberIndex]  // après incrément
    const cycleLength = isXelor ? 7 : nonNull.length
    _applyPassiveTick(member, memberIndex, newRawIdx, cycleLength)
    _applyItemPassives(member, memberIndex, newRawIdx)

    // Décompte de la durée du partage de douleur (par action du membre)
    if (member.damageShare) {
        member.damageShare.duration--
        if (member.damageShare.duration <= 0) delete member.damageShare
    }

    _checkTrophyTrigger(memberIndex)

    combat.memberTimers[memberIndex] = 0
}

// ─── Passifs déclenchés par tick / cycle ─────────────────────────────────────

function _applyPassiveTick(member, memberIndex, newRawIdx, cycleLength, slotEnemy) {
    const passive = classes[member.classId]?.passive
    if (!passive) return

    // ─── Périodiques (toutes les N actions) ──────────────────────────────────

    // Eniripsa : tous les 6 sorts, soigne un allié vivant aléatoire de 10% PV max (pas soi-même)
    if (passive.id === 'eniripsa' && newRawIdx % 6 === 0) {
        const allies = state.team.filter(m => m && m.currentHp > 0 && m !== member)
        if (allies.length) {
            const target  = allies[Math.floor(Math.random() * allies.length)]
            const healAmt = Math.floor((target.maxHp || 0) * 0.10 * _getAntiHealFactor(target))
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

    // Ecaflip : roulette tous les 4 sorts joués par l'Écaflip — tire 1 effet parmi 6, remplace le précédent
    if (passive.id === 'ecaflip' && newRawIdx % 4 === 0) {
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

}

// ─── Effets passifs des items équipés ─────────────────────────────────────────

function _applyItemPassives(member, memberIndex, newRawIdx, slotEnemy) {
    if (!member.equip) return
    const stats = getEffectiveStats(member) ?? member._stats
    const enemy = slotEnemy || combat.enemy

    for (const slotId in member.equip) {
        const itemId = member.equip[slotId]
        if (!itemId) continue
        const itm = item[itemId]
        if (!itm?.effects?.length) continue

        for (const eff of itm.effects) {
            if (eff.on_effect) continue           // géré dans _applyItemOnEffectTriggers
            if (eff.on_active) continue           // géré dans setActiveMember / startCombat
            if (eff.on_damage_received) continue  // géré dans _handleDofusDamageReceived
            if (eff.on_kill) continue             // géré dans _handleDofusOnKill
            if (eff.type === 'stat_bonus') continue // géré dans getEffectiveStats
            if (eff.after  && newRawIdx < eff.after)  continue
            if (!eff.every || newRawIdx % eff.every !== 0) continue

            if (eff.condition === 'no_direct_dmg'  && _memberHasDirectDmg(member))  continue
            if (eff.condition === 'no_buff_debuff' && _memberHasBuffDebuff(member)) continue

            if (eff.type === 'alternating_buff_debuff') {
                combat.memberPassiveState[memberIndex] = combat.memberPassiveState[memberIndex] || {}
                const _altPst = combat.memberPassiveState[memberIndex]
                const _altKey = itemId + '_altPhase'
                const _isBuffPhase = !_altPst[_altKey]
                executeEffect({
                    caster: member, casterStats: stats, targetEnemy: enemy,
                    effect: { type: 'buff', stat: eff.stat, value: _isBuffPhase ? eff.buff_value : -eff.debuff_value, duration: eff.duration, target: 'self' },
                    moveData: { name: itm.name }, moveId: itm.id,
                    fromItemPassive: true
                })
                _altPst[_altKey] = !_altPst[_altKey]
                continue
            }

            if (eff.type === 'random_buff_debuff') {
                if (Math.random() < 0.5) {
                    executeEffect({
                        caster: member, casterStats: stats, targetEnemy: enemy,
                        effect: { type: 'buff', stat: eff.stat, value: eff.value, duration: eff.duration, target: 'ally_random' },
                        moveData: { name: itm.name }, moveId: itm.id,
                        fromItemPassive: true
                    })
                } else {
                    executeEffect({
                        caster: member, casterStats: stats, targetEnemy: enemy,
                        effect: { type: 'debuff', stat: eff.stat, value: eff.value, duration: eff.duration },
                        moveData: { name: itm.name }, moveId: itm.id,
                        fromItemPassive: true
                    })
                }
                continue
            }

            executeEffect({
                caster: member, casterStats: stats, targetEnemy: enemy,
                effect: eff, moveData: { name: itm.name }, moveId: itm.id,
                fromItemPassive: true
            })
        }
    }
}

// ─── Réactions d'items aux effets de sorts ────────────────────────────────────
// Retourne true si l'effet doit être annulé.

function _applyItemOnEffectTriggers(ctx) {
    if (ctx.fromItemPassive) return false
    const { caster, effect } = ctx
    const isCasterEnemy = state.team.indexOf(caster) === -1
    let cancelled = false

    for (const member of state.team) {
        if (!member || member.currentHp <= 0 || !member.equip) continue
        if (combat && state.team.indexOf(member) !== combat.activeMemberIndex) continue
        for (const slotId in member.equip) {
            const itemId = member.equip[slotId]
            if (!itemId) continue
            const itm = item[itemId]
            if (!itm?.effects?.length) continue

            for (const eff of itm.effects) {
                if (!eff.on_effect) continue
                const trigger = eff.on_effect
                if (trigger.source === 'enemy' && !isCasterEnemy) continue
                if (trigger.source === 'ally'  &&  isCasterEnemy) continue
                if (trigger.crit_only && !ctx.isCrit) continue
                if (trigger.type) {
                    const types = Array.isArray(trigger.type) ? trigger.type : [trigger.type]
                    if (!types.includes(effect.type)) continue
                }
                if (trigger.stat !== undefined && effect.stat !== trigger.stat) continue

                const mName = member.name || classes[member.classId]?.name || '?'
                if (eff.reaction === 'cancel') {
                    addLog(`${mName} [${itm.name}] → annule ${effect.type} !`)
                    cancelled = true
                } else if (eff.reaction === 'invert') {
                    const _invertVal = Math.abs(_resolveEffectValue(effect.value) || 0)
                    const _invertStats = getEffectiveStats(member) ?? member._stats
                    executeEffect({
                        caster: member, casterStats: _invertStats, targetEnemy: ctx.targetEnemy || combat.enemy,
                        effect: { type: 'buff', stat: effect.stat, value: _invertVal, duration: effect.duration || 2, target: 'self' },
                        moveData: { name: itm.name }, moveId: itm.id,
                        fromItemPassive: true,
                        onTargetKill: () => _handleReactionKill(ctx.targetEnemy || combat.enemy, member)
                    })
                    addLog(`${mName} [${itm.name}] → débuff ${effect.stat} inversé en buff !`)
                    cancelled = true
                } else if (eff.reaction === 'trigger') {
                    const stats = getEffectiveStats(member) ?? member._stats
                    const _trigEff = eff.value_from_level
                        ? { ...eff, value: member.level || 1 }
                        : eff
                    executeEffect({
                        caster: member, casterStats: stats, targetEnemy: ctx.targetEnemy || combat.enemy,
                        effect: _trigEff, moveData: { name: itm.name }, moveId: itm.id,
                        fromItemPassive: true,
                        onTargetKill: () => _handleReactionKill(ctx.targetEnemy || combat.enemy, member)
                    })
                } else if (eff.reaction === 'heal_to_damage') {
                    const target = isCasterEnemy ? caster : (ctx.targetEnemy || combat?.enemy)
                    if (!target || target.currentHp <= 0) continue
                    const stats = getEffectiveStats(member) ?? member._stats
                    executeEffect({
                        caster: member, casterStats: stats, targetEnemy: target,
                        effect: { type: 'damage', element: eff.element || 'neutre', damage: eff.rawDamage || { min: 1, max: 5 }, target: 'enemy' },
                        moveData: { name: itm.name }, moveId: itm.id,
                        fromItemPassive: true,
                        onTargetKill: () => _handleReactionKill(target, member)
                    })
                    cancelled = true
                }
            }
        }
    }
    return cancelled
}

function _resolveEffectValue(v) {
    if (v !== null && typeof v === 'object' && 'min' in v && 'max' in v)
        return Math.floor(Math.random() * (v.max - v.min + 1)) + v.min
    return v
}

// Retourne 0 si antiHeal full, ou (1 - value/100) si antiHeal partiel (ex: value:70 → facteur 0.3)
function _getAntiHealFactor(entity) {
    const buff = (entity?.buffs || []).find(b => b.stat === 'antiHeal')
    if (!buff) return 1
    return buff.value !== undefined ? Math.max(0, 1 - buff.value / 100) : 0
}

// Résout la cible alliée en fonction de effect.target
// Supporte : 'self'/défaut → caster, 'ally_random', 'ally_min_hp',
//            'owner' → propriétaire du companion (si caster est un companion),
//            'companion' → le companion du caster (ou null si absent/mort)
function _resolveAllyTarget(effect, caster) {
    if (effect.target === 'owner') {
        if (caster.ownerSlot !== undefined) return state.team[caster.ownerSlot] || caster
        return caster
    }
    if (effect.target === 'companion') {
        const comp = caster.companion
        return (comp && comp.currentHp > 0) ? comp : null
    }
    if (effect.target === 'ally_random') {
        const alive = state.team.filter(m => m && m.currentHp > 0)
        return alive.length > 0 ? alive[Math.floor(Math.random() * alive.length)] : caster
    }
    if (effect.target === 'ally_min_hp') {
        let best = caster, bestRatio = Infinity
        const saved = Object.values(combat?.savedMembers || {})
        for (const m of [...state.team, ...saved]) {
            if (!m || m.currentHp <= 0) continue
            const r = m.currentHp / (m.maxHp || 1)
            if (r < bestRatio) { bestRatio = r; best = m }
        }
        return best
    }
    const _allySlotM = effect.target?.match(/^ally_(\d)$/)
    if (_allySlotM) {
        const t = state.team[parseInt(_allySlotM[1], 10) - 1]
        return (t && t.currentHp > 0) ? t : null
    }
    return caster
}

// Résout les cibles pour un effet réactif.
// Alliés : 'self'/défaut → [caster], 'team'/'all_allies' → équipe vivante, slot: N → slot absolu
// Ennemis : 'enemy' → targetEnemy, 'all_enemies'/'all_enemy' → tous les ennemis vivants (raid ou solo)
function _resolveReactiveTargets(effect, caster, targetEnemy) {
    const t = effect.target
    if (t === 'team' || t === 'all_allies') return state.team.filter(m => m && m.currentHp > 0)
    if (t === 'enemy') return (targetEnemy && targetEnemy.currentHp > 0) ? [targetEnemy] : []
    if (t === 'all_enemies' || t === 'all_enemy') {
        return (combat?.isRaid && combat.enemies)
            ? combat.enemies.filter(e => e && e.currentHp > 0)
            : (targetEnemy && targetEnemy.currentHp > 0 ? [targetEnemy] : [])
    }
    if (effect.slot != null) {
        const m = state.team[(effect.slot || 1) - 1]
        return (m && m.currentHp > 0) ? [m] : []
    }
    return [caster]
}

// ─── Combos élémentaires Huppermage ──────────────────────────────────────────
// Déclenché quand 2 sorts élémentaires différents frappent le même ennemi en séquence.
// Effets one-shot stockés avec duration:Infinity → jamais tickés, consommés manuellement.

// Gère la mort d'un ennemi tué par une réaction (piège Énutrof, état réactif...).
// Ces dégâts sont hors du flux normal d'exécution d'un sort et n'ont donc pas
// d'onTargetKill fourni par l'appelant : sans ce callback, un ennemi tué par
// une réaction reste bloqué à 0 PV et le combat boucle indéfiniment.
function _handleReactionKill(target, killerEntity) {
    if (!target || state.team.includes(target)) return
    if (combat?.isRaid && combat.enemies) {
        const slotIdx = combat.enemies.indexOf(target)
        if (slotIdx !== -1) onRaidEnemyDeath(slotIdx, state.team.indexOf(killerEntity))
        return
    }
    if (target.isSummon) { returnToOwner(true); return }
    onVictory()
}

// Déclenche les pièges Énutrof actifs correspondant au trigger donné.
// triggerType : 'debuff' | 'buff' | 'heal'
// triggerStat : stat concernée (ignoré si trap.trigger.stat est absent)
// reactionTarget : l'ennemi qui subit les dégâts de réaction
function _fireEnutrofTraps(triggerType, triggerStat, reactionTarget) {
    if (!combat?.enutrof_traps?.length || !reactionTarget) return
    for (const trap of combat.enutrof_traps) {
        if (trap.active <= 0) continue
        if (trap.trigger.type !== triggerType) continue
        if (trap.trigger.stat && trap.trigger.stat !== triggerStat) continue
        addLog(`Réaction ${trap.id} → ${trap.element} !`)
        executeEffect({
            caster:      trap.caster,
            casterStats: trap.casterStats,
            targetEnemy: reactionTarget,
            targetStats: null,
            effect:      { type: 'damage', element: trap.element, damage: trap.damage, target: 'enemy' },
            moveData:    { name: trap.id },
            moveId:      trap.id,
            memberHitIdx: -1,
            onTargetKill: () => _handleReactionKill(reactionTarget, trap.caster)
        })
    }
}

// Vérifie les états réactifs d'une entité et déclenche ceux qui correspondent.
// triggerType : 'damage' | 'debuff' | 'buff' | 'heal' | 'dot' | 'shield'
// opts : { stat?, element?, value? }  (value = montant du trigger, utilisé pour '_reflect')
function _checkWatchStates(entity, triggerType, opts) {
    if (!entity?.reactiveStates?.length) return
    const { stat, element, value } = opts || {}
    const toFire = []
    const remaining = []
    for (const r of entity.reactiveStates) {
        const t = r.trigger
        let matches = t.type === triggerType
        if (matches && t.stat    && t.stat    !== stat)    matches = false
        if (matches && t.element && t.element !== element) matches = false
        if (matches) toFire.push(r)
        else         remaining.push(r)
    }
    entity.reactiveStates = remaining
    for (const r of toFire) {
        addLog(`[${r.moveId}] réactif déclenché !`)
        const reactions = r.reactions ?? (r.reaction ? [r.reaction] : [])
        const stats = getEffectiveStats(r.caster) ?? r.caster._stats
        for (const rxn of reactions) {
            const reactionEff = { ...rxn }
            if (reactionEff.damage === '_reflect' && value !== undefined)
                reactionEff.damage = { min: value, max: value }
            executeEffect({
                caster: r.caster, casterStats: stats,
                targetEnemy: combat?.enemy,
                effect: reactionEff,
                moveData: { name: r.moveId }, moveId: r.moveId,
                fromItemPassive: true,
                onTargetKill: () => _handleReactionKill(combat?.enemy, r.caster)
            })
        }
    }
}

function _triggerHuppermageCombo(elemA, elemB, caster, enemy) {
    if (combat) combat.huppermageComboCount = (combat.huppermageComboCount || 0) + 1
    const key = [elemA, elemB].sort().join('/')
    enemy.buffs = enemy.buffs || []
    switch (key) {
        case 'feu/terre':
            enemy.buffs.push({ stat: 'amplifie_incoming', duration: Infinity })
            addLog(`Combo ${elemA}/${elemB} → Amplification ! Prochain sort +15%`)
            break
        case 'air/terre':
            caster.buffs = caster.buffs || []
            caster.buffs.push({ stat: 'huppermage_amplify', duration: Infinity })
            addLog(`Combo ${elemA}/${elemB} → Instabilité ! 7% de chance +50%`)
            break
        case 'eau/terre':
            enemy.buffs.push({ stat: 'atk', value: -50, duration: 2 })
            addLog(`Combo ${elemA}/${elemB} → Affaiblissement ! ATK -50 (2 tours)`)
            break
        case 'eau/feu':
            enemy.buffs.push({ stat: 'feu_eau_debuff', duration: Infinity })
            addLog(`Combo ${elemA}/${elemB} → Perturbation ! 7% de chance -50%`)
            break
        case 'air/feu':
            enemy.buffs.push({ stat: 'spd', value: -15, duration: 2 })
            addLog(`Combo ${elemA}/${elemB} → Ralentissement ! SPD -15 (2 tours)`)
            break
        case 'air/eau':
            enemy.buffs.push({ stat: 'eau_air_debuff', duration: Infinity })
            addLog(`Combo ${elemA}/${elemB} → Bouclier ! Prochain sort ennemi -15%`)
            break
    }
}

function executeEffect(ctx) {

    const {caster, casterStats, targetEnemy, effect, moveData, moveId} = ctx

    // Support multi-target : target: ['enemy_2', 'enemy_3']
    // En solo, les cibles enemy_2/enemy_3 sont ignorées → fallback sur 'enemy' si aucune cible valide
    if (Array.isArray(effect.target)) {
        const SLOT_TARGETS = new Set(['enemy_1', 'enemy_2', 'enemy_3'])
        const isRaid = ctx.combat?.isRaid
        const validTargets = effect.target.filter(t => isRaid || !SLOT_TARGETS.has(t))
        const resolvedTargets = validTargets.length > 0 ? validTargets : (effect.noFallback ? [] : ['enemy'])
        let total = 0
        for (const t of resolvedTargets) {
            total += executeEffect({ ...ctx, effect: { ...effect, target: t } }) || 0
        }
        return total
    }

    if (_applyItemOnEffectTriggers(ctx)) return

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

            // random_enemy : en raid, cible un ennemi vivant aléatoire parmi combat.enemies
            // En solo : frappe l'ennemi unique
            if (effect.target === 'random_enemy') {
                if (combat?.isRaid && combat.enemies) {
                    const living = combat.enemies.filter(e => e && e.currentHp > 0)
                    if (!living.length) return 0
                    const picked = living[Math.floor(Math.random() * living.length)]
                    const slotIdx = combat.enemies.indexOf(picked)
                    const killerIdx = state.team.indexOf(ctx.caster)
                    const onKill = () => onRaidEnemyDeath(slotIdx, killerIdx >= 0 ? killerIdx : -1)
                    return executeEffect({ ...ctx, targetEnemy: picked, effect: { ...effect, target: 'enemy' }, onTargetKill: onKill })
                }
                return executeEffect({ ...ctx, effect: { ...effect, target: 'enemy' } })
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
                        min: Math.max(0, Math.round(effCopy.damage.min * raidRatio)),
                        max: Math.max(0, Math.round(effCopy.damage.max * raidRatio))
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
                    .reduce((sum, b) => sum + b.value, 0),
                critResPct: targetEnemy.critResPct || 0
            }
            // stackedDamage : remplace effect.damage par le palier courant
            // _noStackIncrement : lit le palier du hit précédent sans incrémenter (hits secondaires d'un même sort)
            let effectForCalc = effect
            if (effect.stackedDamage && moveId) {
                caster.spellStacks = caster.spellStacks || {}
                const s = caster.spellStacks
                if (effect.stackSource === 'comboCount') {
                    const tier = Math.min(combat.huppermageComboCount || 0, effect.stackedDamage.length - 1)
                    effectForCalc = { ...effect, damage: effect.stackedDamage[tier] }
                } else if (effect._noStackIncrement) {
                    const prevTier = effect.cycle
                        ? Math.max(0, (s[moveId] || 0) - 1) % effect.stackedDamage.length
                        : Math.min(Math.max(0, (s[moveId] || 0) - 1), effect.stackedDamage.length - 1)
                    effectForCalc = { ...effect, damage: effect.stackedDamage[prevTier] }
                } else if (effect.cycle) {
                    const tier = (s[moveId] || 0) % effect.stackedDamage.length
                    effectForCalc = { ...effect, damage: effect.stackedDamage[tier] }
                    s[moveId] = (s[moveId] || 0) + 1
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
            if (effect.scalingMultipliers && moveId) {
                caster.spellStacks = caster.spellStacks || {}
                const s = caster.spellStacks
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

            // Scaling HP : boost temporaire d'une stat choisie, calculé en % relatif au lanceur.
            // Chaque scale = { stat: 'finalDamagePct'|'flatDamage'|'atk'|..., ratio: 1.0 }
            //   shieldScale    : (bouclier / maxHp) × 100 × ratio  → ex: 300/1000 × ratio = 30 × ratio
            //   currentHpScale : (PV actuels / maxHp) × 100 × ratio
            //   missingHpScale : ((maxHp − PV actuels) / maxHp) × 100 × ratio
            //   erodedHpScale  : ((_baseMaxHp − maxHp) / _baseMaxHp) × 100 × ratio
            {
                const _maxHp  = caster.maxHp || 1
                const _base   = caster._baseMaxHp || _maxHp
                const _shield = caster.shield?.value || 0
                const _curHp  = caster.currentHp || 0
                const _selfDebuffTotal = effect.selfDebuffScale
                    ? Math.abs((caster.buffs || []).filter(b => b.stat === (effect.selfDebuffScale.debuffStat || 'spd') && b.value < 0).reduce((s, b) => s + b.value, 0))
                    : 0
                const _scaleDefs = [
                    [effect.shieldScale,          (_shield / _maxHp) * 100],
                    [effect.currentHpScale,        (_curHp  / _maxHp) * 100],
                    [effect.missingHpScale,        ((_maxHp - _curHp) / _maxHp) * 100],
                    [effect.erodedHpScale,         ((_base  - _maxHp) / _base)  * 100],
                    [effect.erodedHpScaleTarget,   (() => { const _tb = targetEnemy._baseMaxHp || targetEnemy.maxHp || 1; const _tm = targetEnemy.maxHp || 1; return Math.max(0, (_tb - _tm) / _tb * 100) })()],
                    [effect.selfDebuffScale,       _selfDebuffTotal],
                    [effect.maxHpScale,            _maxHp],
                ]
                for (const [cfg, pct] of _scaleDefs) {
                    if (!cfg) continue
                    const _stat  = cfg.stat  || 'finalDamagePct'
                    const _bonus = Math.floor(pct * (cfg.ratio || 1))
                    if (_bonus !== 0)
                        statsForCalc = { ...statsForCalc, [_stat]: (statsForCalc[_stat] || 0) + _bonus }
                }
            }

            const hpCtx = {
                casterMaxHp:     caster.maxHp         || 0,
                casterCurrentHp: caster.currentHp     || 0,
                targetMaxHp:     targetEnemy.maxHp     || targetEnemy.bst?.hp || 0,
                targetCurrentHp: targetEnemy.currentHp || 0
            }
            const result = calcDamage(statsForCalc, defStats, effectForCalc, hpCtx, ctx.isCrit ?? null)
            let dmg = result.damage

            if (combat && state.team.includes(ctx.caster) && !state.doubleCritAchieved) {
                if (result.isCrit) {
                    combat.critStreak = (combat.critStreak || 0) + 1
                    if (combat.critStreak >= 3) {
                        state.doubleCritAchieved = true
                        checkClassUnlocks()
                    }
                } else {
                    combat.critStreak = 0
                }
            }

            if (effect.summonMultiplier && (targetEnemy.isSummon || targetEnemy.ownerId)) {
                dmg = Math.floor(dmg * effect.summonMultiplier)
            }

            if (scalingMult !== 1) dmg = Math.floor(dmg * scalingMult)

            // Le bouclier absorbe en priorité avant les HP
            if (!effect.ignoreShield && targetEnemy.shield?.value > 0) {
                const absorbed = Math.min(targetEnemy.shield.value, dmg)
                targetEnemy.shield.value -= absorbed
                dmg -= absorbed
                if (targetEnemy.shield.value <= 0) {
                    targetEnemy.shield = null
                    if (state.team.includes(targetEnemy) && !state.team.includes(caster)) _triggerReuche(targetEnemy)
                }
            }

            // RenvoiTotal : réfléchit ratio% des dégâts, le caster encaisse 0
            if (targetEnemy.renvoiTotal && dmg > 0) {
                const reflectedDmg = Math.max(0, Math.floor(dmg * targetEnemy.renvoiTotal.ratio))
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
            // Si duration défini → persistant (géré par tickBuffs), sinon one-shot
            if (targetEnemy.renvoi && dmg > 0) {
                const reflectedDmg = Math.max(0, Math.floor(dmg * targetEnemy.renvoi.ratio))
                const takenDmg     = dmg - reflectedDmg
                if (targetEnemy.renvoi.duration === undefined) delete targetEnemy.renvoi
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

            // Esquive : chance de réduire ou annuler les dégâts reçus
            const _esquiveBuff = (targetEnemy.buffs || []).find(b => b.stat === 'esquive')
            if (_esquiveBuff && dmg > 0 && Math.random() * 100 < _esquiveBuff.value) {
                const _reduction = _esquiveBuff.reductionPct ?? 100
                if (_reduction >= 100) {
                    addLog(`${ctx.logPrefix || ''}${moveData.name} → esquivé !`)
                    return 0
                }
                dmg = Math.max(0, Math.floor(dmg * (1 - _reduction / 100)))
                addLog(`${ctx.logPrefix || ''}${moveData.name} → esquive partielle ! ${dmg} dégâts`)
            }

            // Combo Huppermage: huppermage_amplify (terre/air) — one-shot, 7% chance +50%
            if (caster.classId === 'huppermage') {
                const _huppAmp = (caster.buffs || []).find(b => b.stat === 'huppermage_amplify')
                if (_huppAmp) {
                    caster.buffs = caster.buffs.filter(b => b !== _huppAmp)
                    if (Math.random() * 100 < 7) {
                        dmg = Math.floor(dmg * 1.5)
                        addLog(`Instabilité → +50% dégâts !`)
                    }
                }
            }
            // Combo Huppermage: amplifie_incoming (terre/feu) — one-shot +15%
            {
                const _ampInc = (targetEnemy.buffs || []).find(b => b.stat === 'amplifie_incoming')
                if (_ampInc) {
                    targetEnemy.buffs = targetEnemy.buffs.filter(b => b !== _ampInc)
                    dmg = Math.floor(dmg * 1.15)
                    addLog(`Amplification → +15% dégâts !`)
                }
            }

            // Proie : boost dégâts pour tous les attaquants + lifesteal à l'attaquant
            // duration = nombre de sorts restants à recevoir (décrémenté à chaque hit)
            let _proieLifestealPct = 0
            if (targetEnemy.proie && dmg > 0) {
                const _pr = targetEnemy.proie
                _proieLifestealPct = _pr.lifestealPct || 0
                dmg = Math.floor(dmg * (1 + (_pr.damageBonusPct || 0) / 100))
                _pr.duration--
                if (_pr.duration <= 0) delete targetEnemy.proie
            }

            // Absorption de coup critique : annule les dégâts et soigne le porteur
            if (result.isCrit && dmg > 0 && !state.team.includes(caster)) {
                const _critTarget = state.team.find(m => m === targetEnemy)
                if (_critTarget) {
                    for (const _slotId in _critTarget.equip) {
                        const _itmId = _critTarget.equip[_slotId]
                        if (!_itmId) continue
                        const _itm = item[_itmId]
                        if (!_itm?.effects?.length) continue
                        for (const _eff of _itm.effects) {
                            if (_eff.reaction !== 'crit_absorb_heal') continue
                            if (_eff.on_effect?.source !== 'enemy') continue
                            if (_eff.on_effect?.chancePct != null && Math.random() * 100 >= _eff.on_effect.chancePct) continue
                            const _healAmt = Math.floor(dmg * (_eff.heal_pct || 20) / 100 * _getAntiHealFactor(_critTarget))
                            const _mName = _critTarget.name || classes[_critTarget.classId]?.name || '?'
                            addLog(`${ctx.logPrefix || ''}${moveData.name} → 💥 Coup critique absorbé ! [${_itm.name}] soigne ${_mName} de ${_healAmt} PV`)
                            if (_healAmt > 0) _critTarget.currentHp = Math.min(_critTarget.maxHp, (_critTarget.currentHp || 0) + _healAmt)
                            return 0
                        }
                    }
                }
            }

            // corrupt : annule les dégâts du prochain sort ennemi
            if (dmg > 0 && !state.team.includes(caster)) {
                const _corrIdx = caster.buffs?.findIndex(b => b.stat === 'corrupt') ?? -1
                if (_corrIdx !== -1) {
                    caster.buffs.splice(_corrIdx, 1)
                    addLog(`${ctx.logPrefix || ''}${moveData.name} → dégâts annulés (Corruption)`)
                    dmg = 0
                }
            }

            // fatal_intercept : si coup fatal ennemi sur un allié, l'intercepteur subit ratio% des dégâts et devient actif
            if (dmg > 0 && dmg >= (targetEnemy.currentHp || 0) && state.team.includes(targetEnemy) && !state.team.includes(caster) && combat?.transposerSlot !== undefined) {
                const _tpSlot = combat.transposerSlot
                const _tp = state.team[_tpSlot]
                if (_tp && _tp !== targetEnemy && _tp.currentHp > 0) {
                    const _tpRatio = _tp.transposition?.ratio ?? 1.30
                    delete combat.transposerSlot
                    if (_tp.transposition) delete _tp.transposition
                    const _tpDmg = Math.floor(dmg * _tpRatio)
                    _tp.currentHp = Math.max(0, (_tp.currentHp || 0) - _tpDmg)
                    addLog(`Transposition → ${_tp.name || classes[_tp.classId]?.name || '?'} intercepte ! ${_tpDmg} dégâts (${Math.round(_tpRatio * 100)}%)`)
                    if (!combat?.isBossUltime) setActiveMember(_tpSlot)
                    if (_tp.currentHp <= 0) {
                        if (combat?.isBossUltime) {
                            if (typeof _Boss_UltimeHandleMemberDeath === 'function') _Boss_UltimeHandleMemberDeath(_tp)
                        } else {
                            _autoSwitchActive()
                            if (state.team.every(m => !m || m.currentHp <= 0)) { onDefeat(); return 0 }
                        }
                    }
                    return 0
                }
            }

            // deathSave (Mot de Reconstitution) : coup fatal sur un allié avec sauvegarde → soigné 100%, insoignable
            if (dmg > 0 && dmg >= (targetEnemy.currentHp || 0) && state.team.includes(targetEnemy) && !state.team.includes(caster) && targetEnemy.deathSave) {
                delete targetEnemy.deathSave
                const _dsInsoignable = (targetEnemy.buffs || []).some(b => b.stat === 'antiHeal' && b.value >= 100)
                if (!_dsInsoignable) {
                    targetEnemy.currentHp = targetEnemy.maxHp
                    targetEnemy.buffs = targetEnemy.buffs || []
                    targetEnemy.buffs.push({ stat: 'antiHeal', value: 100, duration: Infinity })
                    const _dsName = targetEnemy.name || classes[targetEnemy.classId]?.name || '?'
                    addLog(`Mot de Reconstitution → ${_dsName} survit au coup fatal ! Soigné à 100% PV, insoignable.`)
                    return 0
                }
            }

            // Passif companion ownerPassive : le companion paie un coût quand son owner inflige des dégâts
            if (dmg > 0 && state.team.includes(caster) && !state.team.includes(targetEnemy)) {
                const _op = caster.companion?.ownerPassive
                if (_op?.damageCostPct && (caster.companion?.currentHp ?? 0) > 0) {
                    const _cost = Math.floor(dmg * (_op.damageCostPct / 100) / (1 + (_op.value || 0) / 100))
                    if (_cost > 0) {
                        caster.companion.currentHp = Math.max(0, caster.companion.currentHp - _cost)
                        addLog(`${caster.companion.name} absorbe ${_cost} (coût passif)`)
                        if (caster.companion.currentHp <= 0) {
                            addLog(`${caster.companion.name} tombe !`)
                            caster.companion = null
                        }
                    }
                }
            }

            // Partage de douleur : le companion allié absorbe redirectPct% des dégâts
            if (dmg > 0 && targetEnemy.damageShare && !state.team.includes(caster) && state.team.includes(targetEnemy)) {
                const _ds        = targetEnemy.damageShare
                const _companion = targetEnemy.companion
                if (_companion && _companion.currentHp > 0) {
                    const _redirected = Math.min(Math.floor(dmg * _ds.redirectPct / 100), _companion.currentHp)
                    _companion.currentHp = Math.max(0, _companion.currentHp - _redirected)
                    dmg -= _redirected
                    addLog(`${moveData.name} → ${_redirected} absorbés par ${_companion.name}`)
                    if (_companion.currentHp <= 0) {
                        addLog(`${_companion.name} tombe en absorbant les dégâts !`)
                        targetEnemy.companion = null
                    }
                    if (_ds.splitToTeam && dmg > 0) {
                        const _others = state.team.filter(m => m && m !== targetEnemy && m.currentHp > 0)
                        if (_others.length > 0) {
                            const _share = Math.max(1, Math.floor(dmg / _others.length))
                            for (const _om of _others) {
                                _om.currentHp = Math.max(0, (_om.currentHp || 0) - _share)
                                if (_om.currentHp <= 0) _autoSwitchActive()
                            }
                            if (state.team.every(m => !m || m.currentHp <= 0)) { onDefeat(); return 0 }
                            dmg = 0
                        }
                    }
                } else {
                    delete targetEnemy.damageShare
                }
            }

            // damage_split : répartit les dégâts parmi tous les membres vivants
            if (dmg > 0 && state.team.includes(targetEnemy) && !state.team.includes(caster) && targetEnemy.buffs?.some(b => b.stat === 'damage_split')) {
                const _living = state.team.filter(m => m && m.currentHp > 0)
                if (_living.length > 1) {
                    const _splitDmg = Math.max(1, Math.floor(dmg / _living.length))
                    for (const _sm of _living) {
                        if (_sm === targetEnemy) continue
                        _sm.currentHp = Math.max(0, (_sm.currentHp || 0) - _splitDmg)
                        if (_sm.currentHp <= 0) _autoSwitchActive()
                    }
                    if (state.team.every(m => !m || m.currentHp <= 0)) { onDefeat(); return 0 }
                    dmg = _splitDmg
                }
            }

            // blood_link : partage 50% des dégâts avec le Sacrieur lié
            if (dmg > 0 && state.team.includes(targetEnemy) && !state.team.includes(caster)) {
                const _blBuff = targetEnemy.buffs?.find(b => b.stat === 'blood_link')
                if (_blBuff !== undefined) {
                    const _sacrieur = state.team[_blBuff.value]
                    if (_sacrieur && _sacrieur !== targetEnemy && _sacrieur.currentHp > 0) {
                        const _shared = Math.floor(dmg * 0.5)
                        _sacrieur.currentHp = Math.max(0, (_sacrieur.currentHp || 0) - _shared)
                        if (_sacrieur.currentHp <= 0) _autoSwitchActive()
                        if (state.team.every(m => !m || m.currentHp <= 0)) { onDefeat(); return 0 }
                        dmg -= _shared
                    }
                }
            }

            // Dofus Ivoire : damage_block — annule le prochain coup reçu (one-shot)
            if (dmg > 0 && state.team.includes(targetEnemy) && !state.team.includes(caster)) {
                const _blockIdx = (targetEnemy.buffs || []).findIndex(b => b.stat === 'damage_block')
                if (_blockIdx !== -1) {
                    targetEnemy.buffs.splice(_blockIdx, 1)
                    addLog(`${targetEnemy.name || classes[targetEnemy.classId]?.name || '?'} [Dofus Ivoire] → coup annulé !`)
                    return 0
                }
            }

            const _hpBeforeHit = targetEnemy.currentHp || 0
            targetEnemy.currentHp = Math.max(0, targetEnemy.currentHp - dmg)
            const _effectiveDmg = _hpBeforeHit - targetEnemy.currentHp   // dégâts réels (sans overkill)

            // Érosion : réduit le maxHp de la cible (taux de base 5%, modifiable par effect.erosionRate,
            // un buff 'erosionBonus' sur le lanceur, ou un debuff 'erosionBonus' sur la cible)
            if (dmg > 0) {
                const baseRate = effect.erosionRate !== undefined ? effect.erosionRate : 0.05
                // erosionBonus stocké en entiers (10 = +10%) — division par 100 pour la formule
                const casterBonus = (caster.buffs || [])
                    .filter(b => b.stat === 'erosionBonus')
                    .reduce((sum, b) => sum + b.value, 0) / 100
                // debuff stocké comme valeur négative — on l'inverse pour obtenir le bonus positif
                const targetBonus = (targetEnemy.buffs || [])
                    .filter(b => b.stat === 'erosionBonus')
                    .reduce((sum, b) => sum - b.value, 0) / 100
                const passiveErosionMult = targetEnemy.passive?.erosionMultiplier ?? 1
                const erosion = Math.floor(dmg * Math.max(0, baseRate + casterBonus + targetBonus) * passiveErosionMult)
                if (erosion > 0) {
                    targetEnemy.maxHp = Math.max(1, (targetEnemy.maxHp || 1) - erosion)
                    if (targetEnemy.currentHp > targetEnemy.maxHp) targetEnemy.currentHp = targetEnemy.maxHp
                }
            }

            const memberHitIdx = state.team.indexOf(targetEnemy)
            if (combat && memberHitIdx !== -1 && dmg > 0) {
                combat.sessionLoot.memberDamageReceived[memberHitIdx] = (combat.sessionLoot.memberDamageReceived[memberHitIdx] || 0) + dmg
                // Dofus Ivoire : compteur de coups reçus → applique damage_block au seuil
                if (!state.team.includes(caster)) _handleDofusDamageReceived(memberHitIdx, targetEnemy)
            }
            // Popup dégâts uniquement quand c'est l'ennemi qui encaisse (pas un membre)
            if (dmg > 0 && memberHitIdx === -1 && typeof showDamageNumber === 'function') {
                showDamageNumber(dmg, result.isCrit)
            }
            const absNote = dmg < result.damage ? ` (${result.damage - dmg} absorbés)` : ''
            addLog(`${ctx.logPrefix || ''}${moveData.name} → ${result.damage} dégâts${absNote}`)
            if (result.isCrit) addLog(`💥 Coup critique !`)
            if (dmg > 0) _checkWatchStates(targetEnemy, 'damage', { element: effect.element, value: dmg })
            // Repulsion Guard : si le membre touché a le buff actif, recule l'ennemi attaquant (raid uniquement)
            if (dmg > 0 && !state.team.includes(caster) && state.team.includes(targetEnemy)) {
                const _repGuard = (targetEnemy.buffs || []).find(b => b.stat === 'repulsion_guard')
                if (_repGuard && combat?.isRaid && combat.enemies) {
                    const _enemySlot = combat.enemies.indexOf(caster)
                    if (_enemySlot !== -1) {
                        executeEffect({
                            caster: targetEnemy, casterStats: getEffectiveStats(targetEnemy) ?? targetEnemy._stats,
                            targetEnemy: caster,
                            effect: { type: 'recul', target: 'enemy' },
                            moveData: { name: 'Garde Bouclier' }, moveId: 'garde_bouclier',
                            fromItemPassive: true, enemySlotIdx: _enemySlot
                        })
                    }
                }
            }
            // renvoiAdditif : défenseur subit 100% des dégâts ET attaquant subit ratio% en retour
            if (dmg > 0 && state.team.includes(targetEnemy) && !state.team.includes(caster) && targetEnemy.renvoiAdditif && !targetEnemy.renvoiAdditif._new) {
                const _raReflect = Math.floor(dmg * targetEnemy.renvoiAdditif.ratio)
                if (_raReflect > 0) {
                    caster.currentHp = Math.max(0, (caster.currentHp || 0) - _raReflect)
                    addLog(`Couronne d'Épines → ${_raReflect} dégâts renvoyés`)
                    if (caster.currentHp <= 0) {
                        if (combat?.isRaid && combat.enemies) {
                            const _raEnemyIdx = combat.enemies.indexOf(caster)
                            if (_raEnemyIdx !== -1) onRaidEnemyDeath(_raEnemyIdx, state.team.indexOf(targetEnemy))
                        } else {
                            onVictory()
                        }
                    }
                }
            }
            // Proie lifesteal — calculé sur les dégâts réels post-shield et post-overkill
            if (_proieLifestealPct > 0 && _effectiveDmg > 0 && state.team.includes(caster)) {
                const _proieLsHeal = Math.floor(_effectiveDmg * _proieLifestealPct / 100 * _getAntiHealFactor(caster))
                if (_proieLsHeal > 0) {
                    caster.currentHp = Math.min(caster.maxHp, (caster.currentHp || 0) + _proieLsHeal)
                    addLog(`Proie → vol de vie ${_proieLsHeal} PV`)
                }
            }
            // pendingLifesteal : vol de vie sur le prochain sort de dégâts
            if (_effectiveDmg > 0 && caster.buffs) {
                const pendingLS = caster.buffs.find(b => b.stat === 'pendingLifesteal')
                if (pendingLS) {
                    const healAmt = Math.floor(_effectiveDmg * pendingLS.value * _getAntiHealFactor(caster))
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

            // Suivi élémentaire Huppermage : mémorise l'élément ou déclenche un combo.
            // Les lignes d'un même sort se combinent entre elles normalement.
            // _elementConsumed : posé par absorbElementDmg → pas de nouvel état élémentaire
            if (caster.classId === 'huppermage' && effect.element && effect.element !== 'neutre' && memberHitIdx === -1 && !effect._elementConsumed) {
                const slotIdx = (combat?.isRaid && combat.enemies)
                    ? combat.enemies.indexOf(targetEnemy)
                    : 0
                const key = slotIdx >= 0 ? slotIdx : 0
                if (combat.huppermageLastElement !== undefined) {
                    const prev = combat.huppermageLastElement[key]
                    if (prev && prev !== effect.element) {
                        _triggerHuppermageCombo(prev, effect.element, caster, targetEnemy)
                        delete combat.huppermageLastElement[key]
                    } else {
                        combat.huppermageLastElement[key] = effect.element
                    }
                }
            }

            // splashPct : ricochet brut sur e2 (bypass défenses, pas d'érosion)
            // splashPct2 : ricochet sur e3 — % de e1 par défaut, % de e2 si splashChain:true
            if (effect.splashPct && combat?.isRaid && dmg > 0) {
                const killerIdx = state.team.indexOf(caster)
                const secondary = combat.enemies?.[1]
                let e2Dmg = 0
                if (secondary && secondary.currentHp > 0) {
                    e2Dmg = Math.max(0, Math.floor(dmg * effect.splashPct / 100))
                    secondary.currentHp = Math.max(0, secondary.currentHp - e2Dmg)
                    addLog(`${moveData.name} → ricochet : ${e2Dmg} dégâts (ennemi sec.)`)
                    if (secondary.currentHp <= 0) onRaidEnemyDeath(1, killerIdx >= 0 ? killerIdx : -1)
                }
                if (effect.splashPct2) {
                    const tertiary = combat.enemies?.[2]
                    if (tertiary && tertiary.currentHp > 0) {
                        const base = effect.splashChain ? e2Dmg : dmg
                        if (base > 0) {
                            const e3Dmg = Math.max(0, Math.floor(base * effect.splashPct2 / 100))
                            tertiary.currentHp = Math.max(0, tertiary.currentHp - e3Dmg)
                            addLog(`${moveData.name} → ricochet : ${e3Dmg} dégâts (ennemi ter.)`)
                            if (tertiary.currentHp <= 0) onRaidEnemyDeath(2, killerIdx >= 0 ? killerIdx : -1)
                        }
                    }
                }
            }
            return _effectiveDmg
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
            const dotScaled  = Math.max(0, Math.floor(
                dotBase * (1 + (casterStats?.atk || 0) / 100) + (casterStats?.flatDamage || 0)
            ))
            const _lsRatio = effect.lifestealRatio ?? null
            const _dotEntry = (val) => ({
                element: resolveElement(effect), value: val, duration: effect.duration,
                ...(_lsRatio != null ? { lifestealRatio: _lsRatio, casterRef: caster } : {})
            })
            if (effect.target === 'all_enemies' || effect.target === 'all_enemy') {
                const isEnemyCasterDot = !state.team.includes(caster)
                const dotTargets = isEnemyCasterDot
                    ? state.team.filter(m => m && m.currentHp > 0)
                    : combat?.isRaid && combat.enemies ? combat.enemies.filter(e => e && e.currentHp > 0) : [targetEnemy]
                for (const t of dotTargets) {
                    t.dots = t.dots || []
                    t.dots.push(_dotEntry(dotScaled))
                }
                addLog(`${ctx.logPrefix || ''}${moveData.name} → brûlure ${dotScaled}/tour × ${effect.duration} tours (tous)`)
                break
            }
            if (effect.target === 'all_allies') {
                for (const m of state.team) {
                    if (!m || m.currentHp <= 0) continue
                    m.dots = m.dots || []
                    m.dots.push(_dotEntry(dotScaled))
                }
                addLog(`${ctx.logPrefix || ''}${moveData.name} → brûlure ${dotScaled}/tour × ${effect.duration} tours (équipe)`)
                break
            }
            targetEnemy.dots = targetEnemy.dots || []
            targetEnemy.dots.push(_dotEntry(dotScaled))
            addLog(`${ctx.logPrefix || ''}${moveData.name} → brûlure ${dotScaled}/tour (${effect.duration} tours)`)
            _checkWatchStates(targetEnemy, 'dot', { element: resolveElement(effect) })
            break
        }

        case 'duelLock': {
            caster.duelLock = true
            addLog(`${ctx.logPrefix || ''}${moveData.name} → Duel engagé ! Échange de position impossible.`)
            break
        }

        case 'burnMark': {
            // Pose une brûlure différée : se déclenche au prochain sort du lanceur.
            // En raid : touche les ennemis 2 et 3. En solo : inactif.
            caster.pendingBurns = caster.pendingBurns || []
            caster.pendingBurns.push({ element: effect.element || 'feu', damage: effect.damage || { min: 0, max: 0 } })
            addLog(`${ctx.logPrefix || ''}${moveData.name} → brûlure posée (déclenche au prochain sort)`)
            break
        }

        case 'heal': {
            const healRoll = _resolveEffectValue(effect.heal) || 0
            const _healCritMult = ctx.isCrit ? (1 + Math.max(0, casterStats?.critDamagePct ?? 50) / 100) : 1
            const healBase = Math.max(1, Math.floor(
                (healRoll * (1 + (casterStats?.atk || 0) * 0.10 / 100) + (casterStats?.healStat || 0)) * (1 + (casterStats?.healPct || 0) / 100) * _healCritMult
            ))
            if (effect.target === 'all_allies') {
                for (const m of state.team) {
                    if (!m || m.currentHp <= 0) continue
                    m.currentHp = Math.min(m.maxHp, (m.currentHp || 0) + Math.floor(healBase * _getAntiHealFactor(m)))
                }
                addLog(`${moveData.name} → soigne ${healBase} PV (équipe)`)
                _fireEnutrofTraps('heal', null, targetEnemy)
                break
            }
            if (effect.target === 'enemy') {
                const healAmt = Math.floor(healBase * _getAntiHealFactor(targetEnemy))
                targetEnemy.currentHp = Math.min(targetEnemy.maxHp, (targetEnemy.currentHp || 0) + healAmt)
                addLog(`${moveData.name} → soigne l'ennemi de ${healAmt} PV`)
                _fireEnutrofTraps('heal', null, targetEnemy)
                break
            }
            const healTarget = _resolveAllyTarget(effect, caster)
            if (!healTarget) break
            const healAmt    = Math.floor(healBase * _getAntiHealFactor(healTarget))
            healTarget.currentHp = Math.min(healTarget.maxHp, (healTarget.currentHp || 0) + healAmt)
            const tName = healTarget.name || classes[healTarget.classId]?.name || '?'
            addLog(`${moveData.name} → soigne ${tName} de ${healAmt} PV`)
            _fireEnutrofTraps('heal', null, targetEnemy)
            if (healAmt > 0) _checkWatchStates(healTarget, 'heal', { value: healAmt })
            break
        }

        case 'heal%currentHp': {
            const _hcPct      = _resolveEffectValue(effect.heal) || 0
            const _hcCritMult = ctx.isCrit ? (1 + Math.max(0, casterStats?.critDamagePct ?? 50) / 100) : 1
            const _hcBonus    = (1 + (casterStats?.healMaxHpPct || 0) / 100) * _hcCritMult
            const _hcTarget   = _resolveAllyTarget(effect, caster)
            if (!_hcTarget) break
            const _hcAmt = Math.floor((_hcTarget.currentHp || 0) * (_hcPct / 100) * _hcBonus * _getAntiHealFactor(_hcTarget))
            if (_hcAmt > 0) _hcTarget.currentHp = Math.min(_hcTarget.maxHp, (_hcTarget.currentHp || 0) + _hcAmt)
            addLog(`${moveData.name} → soigne ${_hcTarget.name || classes[_hcTarget.classId]?.name || '?'} de ${_hcAmt} PV (${_hcPct}% PV actuels)`)
            _fireEnutrofTraps('heal', null, targetEnemy)
            break
        }

        case 'heal%maxHp': {
            const healPct      = _resolveEffectValue(effect.heal) || 0
            const _hpCritMult  = ctx.isCrit ? (1 + Math.max(0, casterStats?.critDamagePct ?? 50) / 100) : 1
            const healPctBonus = (1 + (casterStats?.healMaxHpPct || 0) / 100) * _hpCritMult
            if (effect.target === 'all_allies') {
                for (const m of state.team) {
                    if (!m || m.currentHp <= 0) continue
                    const healAmt = Math.floor((m.maxHp || 0) * (healPct / 100) * healPctBonus * _getAntiHealFactor(m))
                    m.currentHp = Math.min(m.maxHp, (m.currentHp || 0) + healAmt)
                }
                addLog(`${moveData.name} → soigne ${healPct}% PV max (équipe)`)
                _fireEnutrofTraps('heal', null, targetEnemy)
                break
            }
            if (effect.target === 'enemy') {
                const healAmt = Math.floor((targetEnemy.maxHp || 0) * (healPct / 100) * _getAntiHealFactor(targetEnemy))
                targetEnemy.currentHp = Math.min(targetEnemy.maxHp, (targetEnemy.currentHp || 0) + healAmt)
                addLog(`${moveData.name} → soigne l'ennemi de ${healAmt} PV (${healPct}% PV max)`)
                break
            }
            const healTarget = _resolveAllyTarget(effect, caster)
            if (!healTarget) break
            const healAmt = Math.floor((healTarget.maxHp || 0) * (healPct / 100) * healPctBonus * _getAntiHealFactor(healTarget))
            healTarget.currentHp = Math.min(healTarget.maxHp, (healTarget.currentHp || 0) + healAmt)
            const tName = healTarget.name || classes[healTarget.classId]?.name || '?'
            addLog(`${moveData.name} → soigne ${tName} de ${healAmt} PV (${healPct}% PV max)`)
            _fireEnutrofTraps('heal', null, targetEnemy)
            break
        }

        case 'heal%maxHp_team': {
            const _hpTeamCritMult = ctx.isCrit ? (1 + Math.max(0, casterStats?.critDamagePct ?? 50) / 100) : 1
            const healPctBonus = (1 + (casterStats?.healMaxHpPct || 0) / 100) * _hpTeamCritMult
            const healPct      = _resolveEffectValue(effect.heal) || 0
            for (const m of state.team) {
                if (!m || m.currentHp <= 0) continue
                const healAmt = Math.floor((m.maxHp || 0) * (healPct / 100) * healPctBonus * _getAntiHealFactor(m))
                m.currentHp = Math.min(m.maxHp, (m.currentHp || 0) + healAmt)
            }
            addLog(`${moveData.name} → soigne ${healPct}% PV max (équipe)`)
            _fireEnutrofTraps('heal', null, targetEnemy)
            break
        }

        case 'heal_team': {
            const _healTeamCritMult = ctx.isCrit ? (1 + Math.max(0, casterStats?.critDamagePct ?? 50) / 100) : 1
            const healBase = Math.max(1, Math.floor(
                ((_resolveEffectValue(effect.heal) || 0) * (1 + (casterStats?.atk || 0) * 0.10 / 100) + (casterStats?.healStat || 0)) * (1 + (casterStats?.healTeamPct || 0) / 100) * _healTeamCritMult
            ))
            for (const m of state.team) {
                if (!m || m.currentHp <= 0) continue
                const healAmt = Math.floor(healBase * _getAntiHealFactor(m))
                m.currentHp = Math.min(m.maxHp, (m.currentHp || 0) + healAmt)
            }
            addLog(`${moveData.name} → soigne ${healBase} PV (équipe)`)
            _fireEnutrofTraps('heal', null, targetEnemy)
            break
        }

        case 'hot': {
            const hotRoll  = effect.pctMaxHp !== undefined
                ? Math.floor((caster.maxHp || 0) * effect.pctMaxHp / 100)
                : _resolveEffectValue(effect.heal) || 0
            const hotVal   = Math.max(1, Math.floor(
                (hotRoll * (1 + (casterStats?.atk || 0) * 0.30 / 100) + (casterStats?.healStat || 0)) * (1 + (casterStats?.healPct || 0) / 100)
            ))
            if (effect.target === 'all_allies') {
                for (const m of state.team) {
                    if (!m || m.currentHp <= 0) continue
                    m.hots = m.hots || []
                    if (m.hots.some(h => h.label === moveData.name)) continue
                    m.hots.push({ value: hotVal, duration: effect.duration, label: moveData.name })
                }
                addLog(`${moveData.name} → soin continu ${hotVal} PV/tour × ${effect.duration} tours (équipe)`)
                break
            }
            const hotTarget = _resolveAllyTarget(effect, caster)
            if (!hotTarget) break
            hotTarget.hots = hotTarget.hots || []
            if (hotTarget.hots.some(h => h.label === moveData.name)) break
            hotTarget.hots.push({ value: hotVal, duration: effect.duration, label: moveData.name })
            const tName = hotTarget.name || classes[hotTarget.classId]?.name || '?'
            addLog(`${moveData.name} → soin continu ${hotVal} PV/tour × ${effect.duration} tours → ${tName}`)
            break
        }

        case 'buff': {
            let buffVal = (_resolveEffectValue(effect.value) || 0)
            if (ctx.isCrit && buffVal > 0) {
                const _critBonus = Math.max(0, (casterStats?.critDamagePct ?? 50))
                buffVal = Math.floor(buffVal * (1 + _critBonus / 100))
            }
            // Scaling HP : (stat implicite = effect.stat) — { ratio: 1.0 }
            {
                const _bMaxHp = caster.maxHp || 1
                const _bBase  = caster._baseMaxHp || _bMaxHp
                const _bShld  = caster.shield?.value || 0
                const _bCurHp = caster.currentHp || 0
                const _bDefs  = [
                    [effect.shieldScale,      (_bShld / _bMaxHp) * 100],
                    [effect.shieldValueScale, _bShld],
                    [effect.maxHpScale,       _bMaxHp],
                    [effect.currentHpScale,  (_bCurHp  / _bMaxHp) * 100],
                    [effect.missingHpScale,  ((_bMaxHp - _bCurHp) / _bMaxHp) * 100],
                    [effect.erodedHpScale,   ((_bBase  - _bMaxHp) / _bBase)  * 100],
                ]
                for (const [cfg, pct] of _bDefs) {
                    if (!cfg) continue
                    buffVal += Math.floor(pct * (cfg.ratio || 1))
                }
            }
            if (effect.target === 'all_allies') {
                for (const m of state.team) {
                    if (!m || m.currentHp <= 0) continue
                    m.buffs = m.buffs || []
                    if (m.buffs.some(b => b._label === moveData.name && b.stat === effect.stat)) continue
                    const _newFlag = (!effect.delay && m === caster) ? { _new: true } : {}
                    if (effect.stat === 'maxHp') {
                        m.maxHp = (m.maxHp || 0) + buffVal
                        m.currentHp = (m.currentHp || 0) + buffVal
                        m.buffs.push({ stat: 'maxHp', value: buffVal, duration: effect.duration, directApplied: true, _label: moveData.name, ..._newFlag })
                    } else {
                        m.buffs.push({ stat: effect.stat, value: buffVal, duration: effect.duration, _label: moveData.name, ...(effect.delay ? { delay: effect.delay } : {}), ..._newFlag })
                    }
                }
                addLog(`${moveData.name} → +${buffVal} ${effect.stat} équipe (${effect.duration} tours)`)
                _fireEnutrofTraps('buff', effect.stat, targetEnemy)
                for (const m of state.team) { if (m && m.currentHp > 0) _checkWatchStates(m, 'buff', { stat: effect.stat }) }
                break
            }
            if (effect.target === 'enemy' || effect.target === 'all_enemies' || effect.target === 'all_enemy') {
                const isEnemyCasterBuff = !state.team.includes(caster)
                const buffEnemyTargets = (effect.target === 'all_enemies' || effect.target === 'all_enemy')
                    ? (isEnemyCasterBuff
                        ? (combat?.isRaid && combat.enemies ? combat.enemies : [combat?.enemy]).filter(t => t && t.currentHp > 0)
                        : (combat?.isRaid && combat.enemies ? combat.enemies : [targetEnemy]).filter(t => t && t.currentHp > 0))
                    : [targetEnemy]
                for (const t of buffEnemyTargets) {
                    t.buffs = t.buffs || []
                    if (t.buffs.some(b => b._label === moveData.name && b.stat === effect.stat)) continue
                    t.buffs.push({ stat: effect.stat, value: buffVal, duration: effect.duration, _label: moveData.name, ...(effect.delay ? { delay: effect.delay } : {}) })
                }
                addLog(`${moveData.name} → +${buffVal} ${effect.stat} (ennemi(s)) (${effect.duration} tours)`)
                break
            }
            const buffTarget = _resolveAllyTarget(effect, caster)
            if (!buffTarget) break
            buffTarget.buffs = buffTarget.buffs || []
            if (effect.noStack && moveId) {
                const _existing = buffTarget.buffs.find(b => b._source === moveId && b.stat === effect.stat)
                if (_existing) { _existing.duration = effect.duration; addLog(`${moveData.name} → refresh ${effect.stat} (${effect.duration} tours)`); break }
            }
            const _selfNewFlag = (!effect.delay && buffTarget === caster) ? { _new: true } : {}
            if (effect.stat === 'maxHp') {
                buffTarget.maxHp = (buffTarget.maxHp || 0) + buffVal
                buffTarget.currentHp = (buffTarget.currentHp || 0) + buffVal
                buffTarget.buffs.push({ stat: 'maxHp', value: buffVal, duration: effect.duration, directApplied: true, ..._selfNewFlag })
                addLog(`${moveData.name} → +${buffVal} PV max et courants (${effect.duration} tours)`)
            } else {
                const _noStackTag = (effect.noStack && moveId) ? { _source: moveId } : {}
                buffTarget.buffs.push({ stat: effect.stat, value: buffVal, duration: effect.duration, ...(effect.delay ? { delay: effect.delay } : {}), ..._selfNewFlag, ..._noStackTag })
                if (effect.stat === 'pendingLifesteal')
                    addLog(`${moveData.name} → vol de vie ×${buffVal} actif (prochain sort)`)
                else if (effect.stat === 'healOnCast')
                    addLog(`${moveData.name} → fontaine active (${effect.duration} sorts)`)
                else
                    addLog(`${moveData.name} → +${buffVal} ${effect.stat} (${effect.duration} tours)`)
            }
            _fireEnutrofTraps('buff', effect.stat, targetEnemy)
            _checkWatchStates(buffTarget, 'buff', { stat: effect.stat })
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
            let buffTeamVal = _resolveEffectValue(effect.value)
            if (ctx.isCrit && buffTeamVal > 0) {
                const _critBonus = Math.max(0, (casterStats?.critDamagePct ?? 50))
                buffTeamVal = Math.floor(buffTeamVal * (1 + _critBonus / 100))
            }
            for (const m of state.team) {
                if (!m || m.currentHp <= 0) continue
                m.buffs = m.buffs || []
                if (m.buffs.some(b => b._label === moveData.name && b.stat === effect.stat)) continue
                const _teamNewFlag = (!effect.delay && m === caster) ? { _new: true } : {}
                m.buffs.push({ stat: effect.stat, value: buffTeamVal, duration: effect.duration, _label: moveData.name, ...(effect.delay ? { delay: effect.delay } : {}), ..._teamNewFlag })
            }
            addLog(`${moveData.name} → +${buffTeamVal} ${effect.stat} équipe (${effect.duration} tours)`)
            break
        }

        case 'debuff': {
            const _ALLY_TARGETS = new Set(['self', 'ally_random', 'ally_min_hp'])
            let debuffVal = _resolveEffectValue(effect.value)
            if (ctx.isCrit && debuffVal > 0) {
                const _critBonus = Math.max(0, (casterStats?.critDamagePct ?? 50))
                debuffVal = Math.floor(debuffVal * (1 + _critBonus / 100))
            }
            const isEnemyCasterDebuff = !state.team.includes(caster)
            if (effect.target === 'all_enemy' || effect.target === 'all_enemies') {
                if (isEnemyCasterDebuff) {
                    for (const m of state.team) {
                        if (!m || m.currentHp <= 0) continue
                        m.buffs = m.buffs || []
                        if (m.buffs.some(b => b._label === moveData.name && b.stat === effect.stat)) continue
                        m.buffs.push({ stat: effect.stat, value: -debuffVal, duration: effect.duration, _label: moveData.name })
                        _checkWatchStates(m, 'debuff', { stat: effect.stat })
                    }
                } else if (combat?.isRaid && combat.enemies) {
                    for (const e of combat.enemies) {
                        if (!e || e.currentHp <= 0) continue
                        e.buffs = e.buffs || []
                        if (e.buffs.some(b => b._label === moveData.name && b.stat === effect.stat)) continue
                        e.buffs.push({ stat: effect.stat, value: -debuffVal, duration: effect.duration, _label: moveData.name })
                        _fireEnutrofTraps('debuff', effect.stat, e)
                    }
                } else {
                    targetEnemy.buffs = targetEnemy.buffs || []
                    if (!targetEnemy.buffs.some(b => b._label === moveData.name && b.stat === effect.stat)) {
                        targetEnemy.buffs.push({ stat: effect.stat, value: -debuffVal, duration: effect.duration, _label: moveData.name })
                        _fireEnutrofTraps('debuff', effect.stat, targetEnemy)
                    }
                }
                addLog(`${ctx.logPrefix || ''}${moveData.name} → -${debuffVal} ${effect.stat} (tous) (${effect.duration} tours)`)
                break
            }
            if (effect.target === 'all_allies') {
                for (const m of state.team) {
                    if (!m || m.currentHp <= 0) continue
                    m.buffs = m.buffs || []
                    if (m.buffs.some(b => b._label === moveData.name && b.stat === effect.stat)) continue
                    const _debuffTeamNewFlag = (!effect.delay && m === caster) ? { _new: true } : {}
                    m.buffs.push({ stat: effect.stat, value: -debuffVal, duration: effect.duration, _label: moveData.name, ..._debuffTeamNewFlag })
                    _checkWatchStates(m, 'debuff', { stat: effect.stat })
                }
                addLog(`${ctx.logPrefix || ''}${moveData.name} → -${debuffVal} ${effect.stat} équipe (${effect.duration} tours)`)
                break
            }
            const debuffEntity = _ALLY_TARGETS.has(effect.target) ? _resolveAllyTarget(effect, caster) : targetEnemy
            debuffEntity.buffs = debuffEntity.buffs || []
            const _debuffNewFlag = (!effect.delay && debuffEntity === caster) ? { _new: true } : {}
            debuffEntity.buffs.push({ stat: effect.stat, value: -debuffVal, duration: effect.duration, ..._debuffNewFlag })
            if (!_ALLY_TARGETS.has(effect.target)) _fireEnutrofTraps('debuff', effect.stat, debuffEntity)
            addLog(`${ctx.logPrefix || ''}${moveData.name} → -${debuffVal} ${effect.stat} (${effect.duration} tours)`)
            _checkWatchStates(debuffEntity, 'debuff', { stat: effect.stat })
            break
        }

        case 'shield': {
            const shieldVal = effect.maxHpPct
                ? Math.floor((caster.maxHp || 1) * effect.maxHpPct / 100)
                : effect.levelPct
                    ? Math.floor((caster.level || 1) * effect.levelPct)
                    : effect.value
            if (effect.target === 'all_allies') {
                for (const m of state.team) {
                    if (!m || m.currentHp <= 0 || m.shield?.value > 0) continue
                    m.shield = { value: shieldVal, duration: effect.duration, ...(m === caster ? { _new: true } : {}) }
                }
                addLog(`${moveData.name} → bouclier ${shieldVal} PV équipe (${effect.duration} tours)`)
                break
            }
            const shieldTarget = ['ally_random', 'ally_min_hp'].includes(effect.target)
                ? _resolveAllyTarget(effect, caster)
                : caster
            if (shieldTarget.shield?.value > 0) break
            shieldTarget.shield = { value: shieldVal, duration: effect.duration, ...(shieldTarget === caster ? { _new: true } : {}) }
            addLog(`${moveData.name} → bouclier ${shieldVal} PV (${effect.duration} tours)`)
            break
        }

        case 'purify':
        case 'purify_offensive':
        case 'purify_defensive':
        case 'purify_status': {
            const _pTurns = effect.value || 1
            const _pType  = effect.type
            // Offensif : stats qui affectent la puissance d'attaque/soin du personnage
            const _OFF = new Set(['atk','flatDamage','finalDamagePct','spellDamagePct',
                                   'critChance','critDamagePct','healPct','healTeamPct',
                                   'lifestealPct','erosionBonus'])
            // Défensif : stats qui affectent la survie / réduction de dégâts
            const _DEF = new Set(['res_all','damageReductionPct','maxHp'])
            // Statuts : effets intrinsèquement négatifs (indépendamment de la valeur)
            const _STA = new Set(['antiHeal','spdInvert','feu_eau_debuff','eau_air_debuff'])
            const _isTarget = b => {
                if (b.directApplied) return false   // maxHp directApplied a une logique de reversal dans tickBuffs
                if (_pType === 'purify')           return (b.value < 0 || _STA.has(b.stat))
                if (_pType === 'purify_offensive') return b.value < 0 && _OFF.has(b.stat)
                if (_pType === 'purify_defensive') return b.value < 0 && _DEF.has(b.stat)
                if (_pType === 'purify_status')    return _STA.has(b.stat) || (b.stat === 'spd' && b.value < 0)
                return false
            }
            const _purgeDots = _pType === 'purify' || _pType === 'purify_status'
            const _LABELS = { purify: 'purification', purify_offensive: 'purif. offensive',
                              purify_defensive: 'purif. défensive', purify_status: 'purif. statuts' }
            const _pLabel = _LABELS[_pType] || 'purification'
            const _purifyOne = m => {
                if (!m || m.currentHp <= 0) return
                if (m.buffs) m.buffs = m.buffs
                    .map(b => _isTarget(b) ? { ...b, duration: b.duration - _pTurns } : b)
                    .filter(b => b.duration > 0)
                if (_purgeDots && m.dots) m.dots = m.dots
                    .map(d => ({ ...d, duration: d.duration - _pTurns }))
                    .filter(d => d.duration > 0)
            }
            if (effect.target === 'all_allies') {
                for (const m of state.team) _purifyOne(m)
                addLog(`${moveData.name} → ${_pLabel} équipe (${_pTurns} tour${_pTurns > 1 ? 's' : ''})`)
                break
            }
            const _slotM = effect.target?.match(/^ally_(\d)$/)
            if (_slotM) {
                const t = state.team[parseInt(_slotM[1], 10) - 1]
                _purifyOne(t)
                addLog(`${moveData.name} → ${_pLabel} ${t?.name || classes[t?.classId]?.name || '?'} (${_pTurns} tour${_pTurns > 1 ? 's' : ''})`)
                break
            }
            const _pt = ['ally_random','ally_min_hp'].includes(effect.target)
                ? _resolveAllyTarget(effect, caster)
                : caster
            _purifyOne(_pt)
            addLog(`${moveData.name} → ${_pLabel} ${_pt?.name || classes[_pt?.classId]?.name || '?'} (${_pTurns} tour${_pTurns > 1 ? 's' : ''})`)
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
            const _ahVal = effect.value  // undefined = full block, number = % réduction
            const _ahLog = _ahVal !== undefined ? `anti-soin ${_ahVal}%` : 'anti-soin'
            if (effect.target === 'all_enemies' || effect.target === 'all_enemy') {
                const isEnemyCasterAH = !state.team.includes(caster)
                if (isEnemyCasterAH) {
                    for (const m of state.team) {
                        if (!m || m.currentHp <= 0) continue
                        m.buffs = m.buffs || []
                        m.buffs.push({ stat: 'antiHeal', value: _ahVal, duration: effect.duration })
                    }
                } else if (combat?.isRaid && combat.enemies) {
                    for (const e of combat.enemies) {
                        if (!e || e.currentHp <= 0) continue
                        e.buffs = e.buffs || []
                        e.buffs.push({ stat: 'antiHeal', value: _ahVal, duration: effect.duration })
                    }
                } else {
                    targetEnemy.buffs = targetEnemy.buffs || []
                    targetEnemy.buffs.push({ stat: 'antiHeal', value: _ahVal, duration: effect.duration })
                }
                addLog(`${ctx.logPrefix || ''}${moveData.name} → ${_ahLog} (tous) (${effect.duration} tours)`)
            } else {
                targetEnemy.buffs = targetEnemy.buffs || []
                targetEnemy.buffs.push({ stat: 'antiHeal', value: _ahVal, duration: effect.duration })
                addLog(`${ctx.logPrefix || ''}${moveData.name} → ${_ahLog} (${effect.duration} tours)`)
            }
            break
        }

        case 'corrupt': {
            targetEnemy.buffs = targetEnemy.buffs || []
            targetEnemy.buffs = targetEnemy.buffs.filter(b => b.stat !== 'corrupt')
            targetEnemy.buffs.push({ stat: 'corrupt', duration: 1 })
            const _corrName = targetEnemy.name || '?'
            addLog(`${ctx.logPrefix || ''}${moveData.name} → ${_corrName} est corrompu (prochain sort annulé)`)
            break
        }

        case 'interception': {
            const interceptorSlot = state.team.indexOf(caster)
            if (interceptorSlot !== -1) {
                combat.interceptor = interceptorSlot
                addLog(`${moveData.name} → ${caster.name || classes[caster.classId]?.name || '?'} intercepte tous les dégâts !`)
            }
            break
        }

        case 'self_dmg_pct_current': {
            // Coût en PV courants du lanceur (jamais fatal : minimum 1 PV)
            const _selfCost = Math.min(
                Math.floor((caster.currentHp || 0) * (effect.ratio || 0)),
                Math.max(0, (caster.currentHp || 1) - 1)
            )
            if (_selfCost > 0) {
                caster.currentHp -= _selfCost
                addLog(`${moveData.name} → ${caster.name || classes[caster.classId]?.name || '?'} sacrifie ${_selfCost} PV`)
                const _selfIdx = state.team.indexOf(caster)
                if (combat && _selfIdx !== -1)
                    combat.sessionLoot.memberDamageReceived[_selfIdx] = (combat.sessionLoot.memberDamageReceived[_selfIdx] || 0) + _selfCost
            }
            break
        }

        case 'deathSave': {
            // Pose une sauvegarde mortelle sur tous les alliés vivants.
            // Au prochain coup fatal reçu : soigné à 100% PV mais insoignable pour le reste du combat.
            let _dsCount = 0
            for (const _dsM of state.team) {
                if (!_dsM || _dsM.currentHp <= 0 || _dsM.deathSave) continue
                _dsM.deathSave = true
                _dsCount++
            }
            addLog(`${moveData.name} → sauvegarde mortelle active (${_dsCount} allié${_dsCount > 1 ? 's' : ''})`)
            break
        }

        case 'fatal_intercept': {
            // Pose l'état d'interception fatale : si un allié reçoit un coup fatal, subit ratio% des dégâts à sa place et devient actif
            // Non-stackable : si déjà actif sur ce membre, relancer le sort est sans effet
            const _tpSlot = state.team.indexOf(caster)
            if (_tpSlot !== -1) {
                if (combat.transposerSlot === _tpSlot) {
                    addLog(`${moveData.name} → déjà en attente d'interception`)
                    break
                }
                combat.transposerSlot = _tpSlot
                caster.transposition = { ratio: effect.ratio ?? 1.30 }
                addLog(`${moveData.name} → ${caster.name || classes[caster.classId]?.name || '?'} prêt à intercepter`)
            }
            break
        }

        case 'blood_link': {
            // Lie le caster à l'allié au slot (effect.slot, 1-indexé) — les dégâts reçus par l'allié sont partagés 50/50
            const _blSacIdx = state.team.indexOf(caster)
            const _blSlot   = (effect.slot ?? 1) - 1
            const _blTarget = state.team[_blSlot]
            if (!_blTarget || _blTarget === caster || _blTarget.currentHp <= 0) {
                addLog(`${moveData.name} → aucun allié valide en position ${effect.slot ?? 1}`)
                break
            }
            _blTarget.buffs = (_blTarget.buffs || []).filter(b => b.stat !== 'blood_link')
            _blTarget.buffs.push({ stat: 'blood_link', value: _blSacIdx, duration: effect.duration ?? 4 })
            const _blTName = _blTarget.name || classes[_blTarget.classId]?.name || '?'
            const _blCName = caster.name || classes[caster.classId]?.name || '?'
            addLog(`${moveData.name} → ${_blCName} se lie à ${_blTName} (${effect.duration ?? 4} tours)`)
            break
        }

        case 'damage_split': {
            // Pose un partage de dégâts permanent : les dégâts reçus sont divisés également entre tous les membres vivants
            if (!caster.buffs.some(b => b.stat === 'damage_split')) {
                caster.buffs.push({ stat: 'damage_split', value: 1, duration: Infinity })
                addLog(`${moveData.name} → partage des dégâts actif`)
            } else {
                addLog(`${moveData.name} → partage des dégâts déjà actif`)
            }
            break
        }

        case 'reuche_guard': {
            // Pose la garde Reuche : si un allié perd son dernier bouclier (coup ennemi), le caster prend sa place
            const _rgBuff = caster.buffs.find(b => b.stat === 'reuche_guard')
            if (_rgBuff) {
                _rgBuff.duration = effect.duration
                addLog(`${moveData.name} → garde Reuche rafraîchie (${effect.duration} tours)`)
            } else {
                caster.buffs.push({ stat: 'reuche_guard', value: 1, duration: effect.duration })
                addLog(`${moveData.name} → garde Reuche active (${effect.duration} tours)`)
            }
            break
        }

        case 'sacrifice_shield': {
            // Sacrifie pct% des PV actuels du caster (min 1 PV) → bouclier de valeur égale sur l'allié le moins en vie (hors caster)
            const _sacPct   = effect.pct ?? 70
            const _sacCur   = caster.currentHp || 0
            const _sacAmt   = Math.floor(_sacCur * _sacPct / 100)
            caster.currentHp = Math.max(1, _sacCur - _sacAmt)
            const _sacAllies = state.team.filter(m => m && m !== caster && m.currentHp > 0)
            const _cName = caster.name || classes[caster.classId]?.name || '?'
            if (_sacAllies.length === 0 || _sacAmt === 0) {
                addLog(`${moveData.name} → ${_cName} sacrifie ${_sacAmt} PV (aucun allié vivant)`)
                break
            }
            const _sacTarget = _sacAllies.reduce((min, m) => m.currentHp < min.currentHp ? m : min, _sacAllies[0])
            if (!_sacTarget.shield || _sacTarget.shield.value <= 0) {
                _sacTarget.shield = { value: _sacAmt, duration: effect.duration }
            } else {
                _sacTarget.shield.value += _sacAmt
            }
            const _sacTName = _sacTarget.name || classes[_sacTarget.classId]?.name || '?'
            addLog(`${moveData.name} → ${_cName} sacrifie ${_sacAmt} PV → bouclier +${_sacAmt} PV sur ${_sacTName} (${effect.duration} tours)`)
            break
        }

        case 'buffDrain': {
            const drainTarget = effect.target === 'enemy' ? targetEnemy : _resolveAllyTarget(effect, caster)
            if (drainTarget?.buffs?.length) {
                const before = drainTarget.buffs.length
                drainTarget.buffs = drainTarget.buffs
                    .map(b => b.value > 0 ? { ...b, duration: b.duration - effect.value } : b)
                    .filter(b => b.duration > 0)
                const removed = before - drainTarget.buffs.length
                addLog(`${ctx.logPrefix || ''}${moveData.name} → buffs réduits de ${effect.value} tour(s)${removed ? ` (${removed} expiré(s))` : ''}`)
            } else {
                addLog(`${ctx.logPrefix || ''}${moveData.name} → aucun buff à drainer`)
            }
            break
        }

        case 'debuffDrain': {
            const _ddTarget = effect.target === 'enemy' ? targetEnemy : _resolveAllyTarget(effect, caster)
            if (_ddTarget?.buffs?.length) {
                const _ddBefore = _ddTarget.buffs.length
                _ddTarget.buffs = _ddTarget.buffs
                    .map(b => b.value < 0 ? { ...b, duration: b.duration - effect.value } : b)
                    .filter(b => b.duration > 0)
                const _ddRemoved = _ddBefore - _ddTarget.buffs.length
                addLog(`${ctx.logPrefix || ''}${moveData.name} → debuffs réduits de ${effect.value} tour(s)${_ddRemoved ? ` (${_ddRemoved} expiré(s))` : ''}`)
            } else {
                addLog(`${ctx.logPrefix || ''}${moveData.name} → aucun debuff à purger`)
            }
            break
        }

        case 'esquive': {
            const esquiveTarget = _resolveAllyTarget(effect, caster)
            esquiveTarget.buffs = esquiveTarget.buffs || []
            esquiveTarget.buffs.push({ stat: 'esquive', value: effect.chancePct, reductionPct: effect.reductionPct ?? 100, duration: effect.duration })
            addLog(`${moveData.name} → esquive ${effect.chancePct}% (${effect.duration} tours)`)
            break
        }

        case 'absorbElementDmg': {
            // Lit l'élément stocké sur l'ennemi, le consomme, puis inflige des dégâts avec cet élément.
            // Ne laisse pas de nouvel élément et ne déclenche pas de combo.
            // advanceCycle ('A'|'B') : après consommation, pose l'élément suivant du cycle indiqué.
            const _absSlot = (combat?.isRaid && combat.enemies)
                ? combat.enemies.indexOf(targetEnemy) : 0
            const _absKey  = _absSlot >= 0 ? _absSlot : 0
            const _stored  = combat.huppermageLastElement?.[_absKey] || null
            if (_stored && combat.huppermageLastElement) delete combat.huppermageLastElement[_absKey]
            const _absElem = _stored || effect.fallbackElement || 'neutre'
            if (!_stored) addLog(`${moveData.name} → aucun élément à absorber (neutre)`)
            if (_stored && effect.advanceCycle) {
                const _advMaps = {
                    A: { terre: 'eau', eau: 'feu', feu: 'air', air: 'terre' },
                    B: { eau: 'terre', terre: 'air', air: 'feu', feu: 'eau' },
                }
                const _next = (_advMaps[effect.advanceCycle] || _advMaps.A)[_stored]
                if (_next) {
                    combat.huppermageLastElement[_absKey] = _next
                    addLog(`${moveData.name} → pose ${_next}`)
                }
            }
            return executeEffect({ ...ctx, effect: { ...effect, type: 'damage', element: _absElem, _elementConsumed: true } })
        }

        case 'consumeElementBuff': {
            // Consomme l'élément posé sur l'ennemi et applique un buff selon l'élément consommé.
            // effect.onElement : { terre: {stat, value, duration}, eau: {...}, feu: {...}, air: {...} }
            // effect.target : 'self' (défaut/caster) | 'ally_random' | 'ally_min_hp' | 'enemy'
            const _cebSlot = (combat?.isRaid && combat.enemies) ? combat.enemies.indexOf(targetEnemy) : 0
            const _cebKey  = _cebSlot >= 0 ? _cebSlot : 0
            const _cebElem = combat.huppermageLastElement?.[_cebKey] || null
            if (!_cebElem) { addLog(`${moveData.name} → aucun élément à consommer`); break }
            delete combat.huppermageLastElement[_cebKey]
            const _cebCfg = effect.onElement?.[_cebElem]
            if (!_cebCfg) { addLog(`${moveData.name} → ${_cebElem} consommé (pas de buff configuré)`); break }
            if (_cebCfg.type) {
                // Entrée onElement complète : dispatch vers executeEffect
                addLog(`${moveData.name} → ${_cebElem} consommé`)
                return executeEffect({ ...ctx, effect: _cebCfg })
            }
            const _cebTgt = effect.target === 'enemy' ? targetEnemy : _resolveAllyTarget(effect, caster)
            if (_cebCfg.shield) {
                const _shieldVal = Math.floor((caster.level || 1) * (_cebCfg.levelPct || 1))
                if (!_cebTgt.shield || _cebTgt.shield.value <= 0)
                    _cebTgt.shield = { value: _shieldVal, duration: _cebCfg.duration }
                else
                    _cebTgt.shield.value += _shieldVal
                addLog(`${moveData.name} → ${_cebElem} consommé → bouclier +${_shieldVal} PV (${_cebCfg.duration} tours)`)
            } else {
                _cebTgt.buffs = _cebTgt.buffs || []
                _cebTgt.buffs.push({ stat: _cebCfg.stat, value: _cebCfg.value, duration: _cebCfg.duration })
                const _cebSign = _cebCfg.value >= 0 ? '+' : ''
                addLog(`${moveData.name} → ${_cebElem} consommé → ${_cebCfg.stat} ${_cebSign}${_cebCfg.value} (${_cebCfg.duration} tours)`)
            }
            break
        }

        case 'cycleElement': {
            // variant 'A' (défaut) : terre→eau→feu→air→terre
            // variant 'B'          : eau→terre→air→feu→eau
            const _cycleMaps = {
                A: { terre: 'eau',   eau: 'feu',  feu: 'air',  air: 'terre' },
                B: { eau: 'terre', terre: 'air', air: 'feu',   feu: 'eau'   },
            }
            const _cycleMap = _cycleMaps[effect.variant || 'A']
            const _cycSlot  = (combat?.isRaid && combat.enemies) ? combat.enemies.indexOf(targetEnemy) : 0
            const _cycKey   = _cycSlot >= 0 ? _cycSlot : 0
            const _curElem  = combat.huppermageLastElement?.[_cycKey]
            if (!_curElem) { addLog(`${moveData.name} → aucun élément à cycler`); break }
            const _nextElem = _cycleMap[_curElem] || _curElem
            combat.huppermageLastElement[_cycKey] = _nextElem
            addLog(`${moveData.name} → ${_curElem} → ${_nextElem}`)
            break
        }

        case 'propagation': {
            // En raid : copie l'élément posé sur l'ennemi ciblé vers tous les autres ennemis vivants.
            if (!combat?.isRaid || !combat.enemies) {
                addLog(`${moveData.name} → inactif hors raid`)
                break
            }
            const _propSlot = combat.enemies.indexOf(targetEnemy)
            const _propKey  = _propSlot >= 0 ? _propSlot : 0
            const _propElem = combat.huppermageLastElement?.[_propKey] || null
            if (!_propElem) { addLog(`${moveData.name} → aucun élément à propager`); break }
            combat.huppermageLastElement = combat.huppermageLastElement || {}
            let _propCount = 0
            for (let i = 0; i < combat.enemies.length; i++) {
                if (i === _propKey) continue
                const _other = combat.enemies[i]
                if (!_other || _other.currentHp <= 0) continue
                combat.huppermageLastElement[i] = _propElem
                _propCount++
            }
            addLog(`${moveData.name} → ${_propElem} propagé à ${_propCount} ennemi${_propCount > 1 ? 's' : ''}`)
            break
        }

        case 'elementDmgPeek': {
            // Frappe dans l'élément stocké SANS le consommer (_elementConsumed → pas de combo sur ce hit).
            // Si rien n'est stocké : pose fallbackElement d'abord pour que nextElementDmg puisse combo.
            const _pkSlot = (combat?.isRaid && combat.enemies) ? combat.enemies.indexOf(targetEnemy) : 0
            const _pkKey  = _pkSlot >= 0 ? _pkSlot : 0
            let _pkElem   = combat.huppermageLastElement?.[_pkKey] || null
            if (!_pkElem) {
                _pkElem = effect.fallbackElement || 'neutre'
                if (combat.huppermageLastElement) combat.huppermageLastElement[_pkKey] = _pkElem
                addLog(`${moveData.name} → aucun élément, initialisation ${_pkElem}`)
            }
            return executeEffect({ ...ctx, effect: { ...effect, type: 'damage', element: _pkElem, _elementConsumed: true } })
        }

        case 'nextElementDmg': {
            // Frappe dans l'élément SUIVANT du cycle (A ou B) SANS modifier l'état stocké.
            const _nxCycles = {
                A: { terre: 'eau', eau: 'feu', feu: 'air', air: 'terre' },
                B: { eau: 'terre', terre: 'air', air: 'feu', feu: 'eau' },
            }
            const _nxSlot  = (combat?.isRaid && combat.enemies) ? combat.enemies.indexOf(targetEnemy) : 0
            const _nxKey   = _nxSlot >= 0 ? _nxSlot : 0
            const _nxCurr  = combat.huppermageLastElement?.[_nxKey] || null
            const _nxMap   = _nxCycles[effect.cycle || 'A']
            const _nxElem  = _nxCurr ? (_nxMap[_nxCurr] || _nxCurr) : (effect.fallbackElement || 'neutre')
            if (!_nxCurr) addLog(`${moveData.name} → aucun élément stocké (neutre)`)
            return executeEffect({ ...ctx, effect: { ...effect, type: 'damage', element: _nxElem } })
        }

        case 'dmgIfDebuff': {
            // Dégâts bonus si l'ennemi a un débuff actif sur le stat indiqué.
            // Si la condition n'est pas remplie : 0 dégâts (loggué).
            const _hasDebuff = (targetEnemy.buffs || []).some(b => b.stat === effect.stat && b.value < 0)
            if (!_hasDebuff) { addLog(`${moveData.name} → bonus annulé (pas de débuff ${effect.stat})`); break }
            addLog(`${moveData.name} → bonus (débuff ${effect.stat} présent) !`)
            return executeEffect({ ...ctx, effect: { ...effect, type: 'damage' } })
        }

        case 'setEnutrof': {
            // Pose l'état Énutrof (air/terre/eau) pour N actions membres.
            // Mettre en DERNIER dans le tableau effects (après enutrof_bonus).
            const _sk = `enutrof_${effect.state}_active`
            if (combat) combat[_sk] = effect.duration ?? 3
            addLog(`${moveData.name} → état ${effect.state} actif (${effect.duration ?? 3} tours)`)
            break
        }

        case 'enutrof_bonus': {
            // Dégâts bonus si l'état Énutrof correspondant est actif.
            // requiresDebuff (optionnel) : si présent, le bonus fait 0 si le débuff n'est pas sur l'ennemi
            //   — mais l'état se consomme quand même (décrément géré dans executeMemberAction).
            // Mettre en PREMIER dans le tableau effects (avant setEnutrof).
            const _sk = `enutrof_${effect.state}_active`
            if ((combat?.[_sk] || 0) <= 0) break
            if (effect.requiresDebuff) {
                const _hasReqDebuff = (targetEnemy.buffs || []).some(b => b.stat === effect.requiresDebuff && b.value < 0)
                if (!_hasReqDebuff) {
                    addLog(`${moveData.name} → bonus ${effect.state} : 0 (pas de débuff ${effect.requiresDebuff})`)
                    break
                }
            }
            addLog(`${moveData.name} → bonus ${effect.state} !`)
            return executeEffect({ ...ctx, effect: { ...effect, type: 'damage' } })
        }

        case 'enutrof_trap': {
            // Piège réactif Énutrof : se déclenche automatiquement quand trigger.type survient.
            // trigger : { type: 'debuff'|'buff'|'heal', stat?: 'spd'|'atk'|... }
            // La durée (en actions alliées) est décrémentée dans executeMemberAction.
            combat.enutrof_traps = combat.enutrof_traps || []
            combat.enutrof_traps = combat.enutrof_traps.filter(t => t.id !== effect.id)
            combat.enutrof_traps.push({
                id:       effect.id,
                active:   effect.duration ?? 3,
                trigger:  effect.trigger,
                element:  effect.element,
                damage:   effect.damage,
                caster,
                casterStats,
                _justSet: true
            })
            addLog(`${moveData.name} → ${effect.id} actif (${effect.duration ?? 3} actions alliées)`)
            break
        }

        case 'renvoi': {
            const _rvDur = effect.duration
            caster.renvoi = _rvDur !== undefined ? { ratio: effect.ratio, duration: _rvDur, _new: true } : { ratio: effect.ratio }
            const _rvLog = _rvDur !== undefined ? `renvoi ${Math.round(effect.ratio * 100)}% (${_rvDur} tours)` : `renvoi ${Math.round(effect.ratio * 100)}% actif`
            addLog(`${moveData.name} → ${_rvLog}`)
            break
        }

        case 'renvoiTotal': {
            caster.renvoiTotal = { ratio: effect.ratio }
            addLog(`${moveData.name} → renvoi total ${Math.round(effect.ratio * 100)}% actif`)
            break
        }

        case 'renvoiAdditif': {
            // Défenseur subit 100% des dégâts ET inflige ratio% à l'attaquant en plus
            const _raDur = effect.duration
            caster.renvoiAdditif = _raDur !== undefined ? { ratio: effect.ratio, duration: _raDur, _new: true } : { ratio: effect.ratio }
            const _raLog = _raDur !== undefined ? `contre-coup ${Math.round(effect.ratio * 100)}% (${_raDur} tours)` : `contre-coup ${Math.round(effect.ratio * 100)}% actif`
            addLog(`${moveData.name} → ${_raLog}`)
            break
        }

        case 'oeilPourOeil': {
            caster.oeilPourOeil = { ratio: effect.ratio }
            addLog(`${moveData.name} → oeil pour oeil ${Math.round(effect.ratio * 100)}% actif`)
            break
        }

        case 'switch': {
            if (combat?.isBossUltime) { addLog(`${moveData?.name ?? '?'} → ignoré en Boss Ultime`); break }
            if (!state.team.includes(caster)) {
                const _trophyM = state.team[combat.activeMemberIndex]
                if (_trophyM?.equip?.accessoire && item[_trophyM.equip.accessoire]?.trophy) {
                    addLog(`${moveData?.name ?? '?'} → ${_trophyM.name || '?'} [trophée] immunisé au déplacement !`)
                    break
                }
            }
            if (combat?.isRaid) {
                const _isTeamCaster = state.team.includes(caster)
                if (_isTeamCaster && effect.target !== 'self') {
                    // Membre de l'équipe sur ennemi : effet aléatoire recul ou avance
                    const _rndType = Math.random() < 0.5 ? 'recul' : 'avance'
                    executeEffect({ ...ctx, effect: { ...effect, type: _rndType, target: 'enemy' } })
                } else {
                    // Monstre sur équipe, ou membre sur self : remapping fixe 1→5, 2→4, 3→6 (0-indexed: 0→4, 1→3, 2→5, 3→1, 4→0, 5→2)
                    const _switchRaidMap = [4, 3, 5, 1, 0, 2]
                    const _curIdx = combat.activeMemberIndex
                    const _dstIdx = _switchRaidMap[_curIdx] ?? -1
                    if (_dstIdx === -1) break
                    const _dstMember = state.team[_dstIdx]
                    if (!_dstMember || _dstMember.currentHp <= 0) break
                    addLog(`${moveData.name} → switch ! Passage au membre en position ${_dstIdx + 1}`)
                    setActiveMember(_dstIdx)
                }
                break
            }
            // Solo : force le changement de membre actif sur l'équipe du joueur
            const living = []
            for (let i = 0; i < state.team.length; i++) {
                const m = state.team[i]
                if (m && m.currentHp > 0) living.push(i)
            }
            if (living.length <= 1) break
            const curPos = living.indexOf(combat.activeMemberIndex)
            const targetPos = (curPos + (effect.value || 1)) % living.length
            if (targetPos === curPos) break
            addLog(`${moveData.name} → changement de membre forcé !`)
            setActiveMember(living[targetPos])
            break
        }

        case 'activate_slot': {
            const _asIdx = (effect.slot || 1) - 1
            const _asM = state.team[_asIdx]
            if (!_asM || _asM.currentHp <= 0) break
            if (_asIdx === combat.activeMemberIndex) break
            addLog(`${moveData.name} → ${_asM.name || classes[_asM.classId]?.name || '?'} devient actif !`)
            setActiveMember(_asIdx)
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

        case 'summon_companion': {
            spawnCompanion(caster, effect)
            break
        }

        case 'damageShare': {
            const _ownerMember = caster.ownerSlot !== undefined ? state.team[caster.ownerSlot] : null
            if (!_ownerMember) break
            _ownerMember.damageShare = { redirectPct: effect.redirectPct || 50, duration: effect.duration || 1, splitToTeam: !!effect.splitToTeam }
            addLog(`${moveData.name} → partage de douleur (${effect.redirectPct || 50}% redirigé, ${effect.duration || 1} tours)`)
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
            const turretScaled = Math.max(0, Math.floor(
                turretBase * (1 + (casterStats?.atk || 0) / 100) + (casterStats?.flatDamage || 0)
            ))
            const turretEntry  = { label: 'Tourelle', element: effect.element || 'neutre', value: turretScaled, duration: effect.duration || 3 }
            if (effect.target === 'all_enemies' || effect.target === 'all_enemy') {
                const isEnemyCasterTurret = !state.team.includes(caster)
                const turretTargets = isEnemyCasterTurret
                    ? state.team.filter(m => m && m.currentHp > 0)
                    : combat?.isRaid && combat.enemies ? combat.enemies.filter(e => e && e.currentHp > 0) : [targetEnemy]
                for (const t of turretTargets) {
                    t.dots = t.dots || []
                    t.dots.push({ ...turretEntry })
                }
                addLog(`${moveData.name} → Tourelle déployée ! ${turretScaled} dégâts/${turretEntry.element} × ${turretEntry.duration} tours (tous)`)
                break
            }
            targetEnemy.dots = targetEnemy.dots || []
            targetEnemy.dots.push(turretEntry)
            addLog(`${moveData.name} → Tourelle déployée ! ${turretScaled} dégâts/${turretEntry.element} × ${turretEntry.duration} tours`)
            break
        }

        case 'recul': {
            if (combat?.isBossUltime) { addLog(`${moveData?.name ?? '?'} → ignoré en Boss Ultime`); break }
            if (!state.team.includes(caster)) {
                const _trophyMR = state.team[combat.activeMemberIndex]
                if (_trophyMR?.equip?.accessoire && item[_trophyMR.equip.accessoire]?.trophy) {
                    addLog(`${moveData?.name ?? '?'} → ${_trophyMR.name || '?'} [trophée] immunisé au déplacement !`)
                    break
                }
            }
            // Sur self (membre de l'équipe) : active le prochain membre vivant N+1 (solo et raid)
            if (effect.target === 'self' && state.team.includes(caster)) {
                {
                    const _cur   = combat.activeMemberIndex
                    const _total = state.team.length
                    for (let _i = 1; _i < _total; _i++) {
                        const _nextIdx = (_cur + _i) % _total
                        const _m = state.team[_nextIdx]
                        if (_m && _m.currentHp > 0) {
                            addLog(`${moveData.name} → recul ! Passage au membre en position ${_nextIdx + 1}`)
                            setActiveMember(_nextIdx)
                            break
                        }
                    }
                }
                break
            }
            // Sur ennemi en solo : ignoré
            if (!combat?.isRaid || !combat.enemies) break
            // Sur ennemi en raid : swap vers le rang suivant
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
            if (combat?.isBossUltime) { addLog(`${moveData?.name ?? '?'} → ignoré en Boss Ultime`); break }
            if (!state.team.includes(caster)) {
                const _trophyMA = state.team[combat.activeMemberIndex]
                if (_trophyMA?.equip?.accessoire && item[_trophyMA.equip.accessoire]?.trophy) {
                    addLog(`${moveData?.name ?? '?'} → ${_trophyMA.name || '?'} [trophée] immunisé au déplacement !`)
                    break
                }
            }
            // Sur self (membre de l'équipe) : active le membre vivant précédent N-1 (solo et raid)
            if (effect.target === 'self' && state.team.includes(caster)) {
                {
                    const _cur   = combat.activeMemberIndex
                    const _total = state.team.length
                    for (let _i = 1; _i < _total; _i++) {
                        const _prevIdx = (_cur - _i + _total) % _total
                        const _m = state.team[_prevIdx]
                        if (_m && _m.currentHp > 0) {
                            addLog(`${moveData.name} → avance ! Passage au membre en position ${_prevIdx + 1}`)
                            setActiveMember(_prevIdx)
                            break
                        }
                    }
                }
                break
            }
            // Sur ennemi en solo : ignoré
            if (!combat?.isRaid || !combat.enemies) break
            // Sur ennemi en raid : swap vers le rang précédent
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

        case 'repulsion_guard': {
            const _guardTarget = _resolveAllyTarget(effect, caster)
            _guardTarget.buffs = _guardTarget.buffs || []
            _guardTarget.buffs.push({ stat: 'repulsion_guard', value: 1, duration: effect.duration || 3 })
            const _guardName = _guardTarget.name || classes[_guardTarget.classId]?.name || '?'
            addLog(`${moveData.name} → Garde active ${effect.duration || 3} tours → ${_guardName} (recul ennemi si attaqué)`)
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

        case 'best_element_damage': {
            const _ELEMENTS = ['neutre', 'terre', 'feu', 'eau', 'air']
            const _res = targetEnemy.res || {}
            let bestEl = 'neutre', lowestRes = Infinity
            for (const el of _ELEMENTS) {
                const r = _res[el] ?? 0
                if (r < lowestRes) { lowestRes = r; bestEl = el }
            }
            return executeEffect({ ...ctx, effect: { ...effect, type: 'damage', element: bestEl } })
        }

        case 'worst_element_damage': {
            const _ELEMENTS_W = ['neutre', 'terre', 'feu', 'eau', 'air']
            const _resW = targetEnemy.res || {}
            let worstEl = 'neutre', highestRes = -Infinity
            for (const el of _ELEMENTS_W) {
                const r = _resW[el] ?? 0
                if (r > highestRes) { highestRes = r; worstEl = el }
            }
            return executeEffect({ ...ctx, effect: { ...effect, type: 'damage', element: worstEl } })
        }

        case 'best_element_dot': {
            const _ELEMENTS_BD = ['neutre', 'terre', 'feu', 'eau', 'air']
            const _resBD = targetEnemy.res || {}
            let bestElBD = 'neutre', lowestResBD = Infinity
            for (const el of _ELEMENTS_BD) {
                const r = _resBD[el] ?? 0
                if (r < lowestResBD) { lowestResBD = r; bestElBD = el }
            }
            return executeEffect({ ...ctx, effect: { ...effect, type: 'dot', element: bestElBD } })
        }

        case 'best_element_res_debuff': {
            const _ELEMENTS_BR = ['neutre', 'terre', 'feu', 'eau', 'air']
            const _resBR = targetEnemy.res || {}
            let bestElBR = 'neutre', lowestResBR = Infinity
            for (const el of _ELEMENTS_BR) {
                const r = _resBR[el] ?? 0
                if (r < lowestResBR) { lowestResBR = r; bestElBR = el }
            }
            return executeEffect({ ...ctx, effect: { ...effect, type: 'debuff', stat: `res.${bestElBR}` } })
        }

        case 'mark_proie': {
            // Pose l'état Proie sur l'ennemi : les N prochains hits reçus gagnent +damageBonusPct%
            // et lifesteal lifestealPct% pour l'attaquant. Refresh la durée si déjà actif.
            const _proieTargets = (effect.target === 'all_enemies' && combat?.isRaid && combat.enemies)
                ? combat.enemies.filter(e => e && e.currentHp > 0)
                : [targetEnemy]
            for (const _pt of _proieTargets) {
                if (!_pt || _pt.currentHp <= 0) continue
                _pt.proie = {
                    duration:       effect.duration      || 3,
                    damageBonusPct: effect.damageBonusPct || 10,
                    lifestealPct:   effect.lifestealPct  || 5
                }
            }
            addLog(`${moveData.name} → Proie ! (+${effect.damageBonusPct || 10}% dmg, vol de vie ${effect.lifestealPct || 5}% × ${effect.duration || 3} hits)`)
            break
        }

        case 'buff_adjacent': {
            // Applique un buff aux membres dans les slots N-1 et N+1 du lanceur.
            // Non-cumulable par sort : un membre qui a déjà un buff avec _source === moveId est ignoré.
            const _adjCasterIdx = state.team.indexOf(caster)
            if (_adjCasterIdx === -1) break
            let _adjVal = _resolveEffectValue(effect.value)
            if (ctx.isCrit && _adjVal > 0) {
                const _critBonus = Math.max(0, (casterStats?.critDamagePct ?? 50))
                _adjVal = Math.floor(_adjVal * (1 + _critBonus / 100))
            }
            let _adjCount = 0
            for (const _offset of [-1, 1]) {
                const _adjTarget = state.team[_adjCasterIdx + _offset]
                if (!_adjTarget || _adjTarget.currentHp <= 0) continue
                _adjTarget.buffs = _adjTarget.buffs || []
                const _adjExisting = moveId ? _adjTarget.buffs.find(b => b._source === moveId && b.stat === effect.stat) : null
                if (_adjExisting) { _adjExisting.duration = effect.duration; _adjCount++; continue }
                _adjTarget.buffs.push({ stat: effect.stat, value: _adjVal, duration: effect.duration, _source: moveId })
                _adjCount++
            }
            if (_adjCount > 0)
                addLog(`${moveData.name} → +${_adjVal} ${effect.stat} slots adjacents (${effect.duration} tours)`)
            else
                addLog(`${moveData.name} → aucun allié adjacent à booster`)
            break
        }

        case 'buff_slot': {
            // Applique un buff au membre présent dans le slot absolu effect.slot (1-indexé).
            // Si le slot est vide ou mort, l'effet est perdu.
            const _slotIdx = (effect.slot || 1) - 1
            const _slotTarget = state.team[_slotIdx]
            if (!_slotTarget || _slotTarget.currentHp <= 0) {
                addLog(`${moveData.name} → slot ${effect.slot} vide (effet perdu)`)
                break
            }
            let _slotVal = _resolveEffectValue(effect.value)
            if (ctx.isCrit && _slotVal > 0) {
                const _critBonus = Math.max(0, (casterStats?.critDamagePct ?? 50))
                _slotVal = Math.floor(_slotVal * (1 + _critBonus / 100))
            }
            _slotTarget.buffs = _slotTarget.buffs || []
            _slotTarget.buffs.push({ stat: effect.stat, value: _slotVal, duration: effect.duration })
            addLog(`${moveData.name} → +${_slotVal} ${effect.stat} slot ${effect.slot} (${effect.duration} tours)`)
            break
        }

        case 'spd_invert': {
            // Inverse la vitesse d'une entité autour de 100 : spd_eff → 200 - spd_eff.
            // Double application sur la même entité = annulation (retour à la normale).
            const _invertTargets = []
            if (effect.target === 'enemy') {
                if (targetEnemy && targetEnemy.currentHp > 0) _invertTargets.push(targetEnemy)
            } else if (effect.target === 'all_enemies') {
                if (combat?.isRaid && combat.enemies) {
                    for (const _ie of combat.enemies) { if (_ie && _ie.currentHp > 0) _invertTargets.push(_ie) }
                } else if (targetEnemy && targetEnemy.currentHp > 0) {
                    _invertTargets.push(targetEnemy)
                }
            } else if (effect.target === 'all_allies') {
                for (const _im of state.team) { if (_im && _im.currentHp > 0) _invertTargets.push(_im) }
            } else {
                _invertTargets.push(caster)
            }
            for (const _it of _invertTargets) {
                _it.buffs = _it.buffs || []
                const _existingIdx = _it.buffs.findIndex(b => b.stat === 'spdInvert')
                if (_existingIdx !== -1) {
                    _it.buffs.splice(_existingIdx, 1)
                    addLog(`${moveData.name} → vitesse rétablie (double inversion)`)
                } else {
                    _it.buffs.push({ stat: 'spdInvert', duration: effect.duration || 3, _new: true })
                    addLog(`${moveData.name} → vitesse inversée (${effect.duration || 3} tours)`)
                }
            }
            break
        }

        case 'trap':
        case 'retardement': {
            // Piège/retardement cumulatif : les effect.threshold premiers lancers posent des charges silencieuses.
            // Au (threshold+1)ème lancer : déclenche les dégâts de TOUTES les charges accumulées.
            // Compteurs INDÉPENDANTS par moveId → plusieurs sorts coexistent. Reset auto à chaque mort d'ennemi (voir onVictory).
            // Explosion anticipée : si le lanceur quitte la position active (swap, mort...) avant le seuil,
            // les charges posées explosent immédiatement — voir _explodeOwnedTraps.
            if (!combat) break
            combat.trapStacks  = combat.trapStacks  || {}
            combat.trapOwners  = combat.trapOwners  || {}
            combat.trapEffects = combat.trapEffects || {}
            const _trapKey  = moveId || effect.id || 'trap'
            combat.trapOwners[_trapKey]  = state.team.indexOf(caster)
            combat.trapEffects[_trapKey] = { effect, moveName: moveData.name }
            const _newCount = (combat.trapStacks[_trapKey] || 0) + 1
            if (_newCount > (effect.threshold || 3)) {
                addLog(`${moveData.name} → EXPLOSION ! ${_newCount} pièges déclenchés !`)
                for (let _ti = 0; _ti < _newCount; _ti++) {
                    executeEffect({ ...ctx, effect: { ...effect, type: 'damage' }, moveId: _trapKey + '_blast' })
                }
                combat.trapStacks[_trapKey] = 0
            } else {
                combat.trapStacks[_trapKey] = _newCount
                addLog(`${moveData.name} → piège posé (${_newCount}/${effect.threshold || 3})`)
            }
            break
        }

        case 'reactive': {
            // État réactif : pose un listener sur une ou plusieurs cibles.
            // Non-cumulable par moveId : si déjà actif sur la cible, le nouveau lancer est silencieux.
            // trigger : { type, stat?, element? } — reaction : effect ou reactions : [effect, ...]
            const _rTargets = _resolveReactiveTargets(effect, caster, targetEnemy)
            const _reactions = effect.reactions ?? (effect.reaction ? [effect.reaction] : [])
            for (const t of _rTargets) {
                t.reactiveStates = t.reactiveStates || []
                if (t.reactiveStates.some(r => r.moveId === moveId)) continue
                t.reactiveStates.push({
                    moveId,
                    caster,
                    trigger: effect.trigger,
                    reactions: _reactions,
                    duration: effect.duration !== undefined ? effect.duration : Infinity,
                    _new: true,
                })
                const tName = t.name || classes[t.classId]?.name || '?'
                addLog(`${moveData.name} → état réactif posé sur ${tName}`)
            }
            break
        }

        case 'cast_proc': {
            // Passif on-cast : stocke un proc dans les buffs des cibles.
            // A chaque lancer de sort, le proc se déclenche et turnsRemaining décrémente.
            // Non-cumulable par moveId : refresh turnsRemaining si déjà actif.
            // target: 'self' | 'adjacent' | 'self_and_adjacent'
            const _cpTargets = []
            if (effect.target === 'self' || effect.target === 'self_and_adjacent')
                _cpTargets.push(caster)
            if (effect.target === 'adjacent' || effect.target === 'self_and_adjacent') {
                const _cpIdx = state.team.indexOf(caster)
                for (const _off of [-1, 1]) {
                    const _adj = state.team[_cpIdx + _off]
                    if (_adj && _adj.currentHp > 0) _cpTargets.push(_adj)
                }
            }
            for (const _cpt of _cpTargets) {
                _cpt.buffs = _cpt.buffs || []
                const _cpEx = moveId ? _cpt.buffs.find(b => b.stat === 'cast_proc' && b._source === moveId) : null
                if (_cpEx) { _cpEx.turnsRemaining = effect.duration || 3 }
                else        { _cpt.buffs.push({ stat: 'cast_proc', procEffect: effect.procEffect, turnsRemaining: effect.duration || 3, _source: moveId }) }
            }
            addLog(`${moveData.name} → passif posé (${effect.duration || 3} prochains sorts)`)
            break
        }

        case 'drop_bonus': {
            // Bonus de drop pour CE combat uniquement (non-cumulable : ignoré si déjà actif)
            if (!combat) break
            if (combat.dropBonusCombat) {
                addLog(`${moveData.name} → bonus drop déjà actif (non cumulable)`)
                break
            }
            combat.dropBonusCombat = effect.value || 10
            addLog(`${moveData.name} → taux de drop +${combat.dropBonusCombat}% ce combat`)
            break
        }

    }
}

function executeEnemyAction() {

    if (!combat.enemy || combat.enemy.currentHp <= 0) return

    // DOTs de l'ennemi tick avant son action
    tickDots(combat.enemy, () => {
        if (combat.enemy?.isSummon) returnToOwner(true)
        else onVictory()
    })
    if (!combat.enemy || combat.enemy.currentHp <= 0) return

    const e          = combat.enemy
    if (!e.moves?.length) return
    const curMoveIdx = e.moveIndex % e.moves.length
    const moveId     = e.moves[curMoveIdx]
    e.moveIndex++
    if (!moveId) return
    const mv = move[moveId]
    if (!mv?.effects) return
    const prevMoveIdx = (curMoveIdx - 1 + e.moves.length) % e.moves.length
    const prevMv      = e.moves[prevMoveIdx] ? (move[e.moves[prevMoveIdx]] || null) : null

    // cible = membre actif (ou intercepteur si actif)
    let target = state.team[combat.activeMemberIndex]
    if (combat.interceptor !== undefined) {
        const interceptor = state.team[combat.interceptor]
        if (interceptor?.currentHp > 0) target = interceptor
        else delete combat.interceptor
    }
    if (!target || target.currentHp <= 0) { onDefeat(); return }

    // Stats d'attaque de l'ennemi (buffs actifs inclus)
    const enemyStats = {
        atk:               combat.enemy.atk || 0,
        flatDamage:        0,
        finalDamagePct:    0,
        spellDamagePct:    0,
        damageReductionPct: 0,
        critChance:        combat.enemy.critChance    ?? 5,
        critDamagePct:     combat.enemy.critDamagePct ?? 50,
        res:               combat.enemy.res || {}
    }
    for (const b of (combat.enemy.buffs || [])) {
        if ((b.delay ?? 0) > 0) continue
        if (b.stat in enemyStats) enemyStats[b.stat] += b.value
    }

    // Combos Huppermage one-shots : réduction dégâts ennemi ce tour
    {
        const _feuEau = (e.buffs || []).find(b => b.stat === 'feu_eau_debuff')
        if (_feuEau) {
            e.buffs = e.buffs.filter(b => b !== _feuEau)
            if (Math.random() * 100 < 7) {
                enemyStats.finalDamagePct -= 50
                addLog(`Perturbation élémentaire → ${e.name} -50% dégâts ce tour`)
            }
        }
        const _eauAir = (e.buffs || []).find(b => b.stat === 'eau_air_debuff')
        if (_eauAir) {
            e.buffs = e.buffs.filter(b => b !== _eauAir)
            enemyStats.finalDamagePct -= 15
            addLog(`Bouclier élémentaire → ${e.name} -15% dégâts ce tour`)
        }
    }

    const targetStats = getEffectiveStats(target) ?? target._stats ?? null
    const logPrefix   = `${combat.enemy.name} utilise `

    const isCritRoll = Math.random() * 100 < (enemyStats.critChance || 0)

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
            isCrit:      isCritRoll,
            onTargetKill: () => {
                const interceptorSlot = combat.interceptor
                if (interceptorSlot !== undefined && target === state.team[interceptorSlot]) {
                    returnAllyToOwner(interceptorSlot)
                } else {
                    _autoSwitchActive()
                }
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

    combat.enemyTimer = 0
}

function pickNextEnemyMove(enemy) {
    if (!enemy?.moves?.length) return null
    return enemy.moves[enemy.moveIndex % enemy.moves.length]
}

// ─── DOTs ────────────────────────────────────────────────────────────────────

function tickDots(entity, onKill) {
    if (!entity.dots?.length) return
    let dotTotalDmg = 0
    const _dotMemberIdx = state.team.indexOf(entity)
    for (const dot of entity.dots) {
        // Dofus Ivoire : damage_block absorbe aussi les DOTs
        if (dot.value > 0 && _dotMemberIdx !== -1) {
            const _dbIdx = (entity.buffs || []).findIndex(b => b.stat === 'damage_block')
            if (_dbIdx !== -1) {
                entity.buffs.splice(_dbIdx, 1)
                addLog(`${entity.name || classes[entity.classId]?.name || '?'} [Dofus Ivoire] → brûlure annulée !`)
                continue
            }
        }
        entity.currentHp = Math.max(0, entity.currentHp - dot.value)
        addLog(`${dot.label || 'Brûlure'} → ${dot.value} dégâts`)
        dotTotalDmg += dot.value
        if (dot.lifestealRatio && dot.casterRef && dot.casterRef.currentHp > 0) {
            const _lsHeal = Math.floor(dot.value * dot.lifestealRatio * _getAntiHealFactor(dot.casterRef))
            if (_lsHeal > 0) {
                dot.casterRef.currentHp = Math.min(dot.casterRef.maxHp, dot.casterRef.currentHp + _lsHeal)
                addLog(`Vol de vie (brûlure) → +${_lsHeal} PV`)
            }
        }
        // Dofus Ivoire : chaque tick de DOT compte comme un coup reçu
        if (dot.value > 0 && _dotMemberIdx !== -1) _handleDofusDamageReceived(_dotMemberIdx, entity)
    }
    if (combat && dotTotalDmg > 0) {
        if (_dotMemberIdx !== -1) {
            combat.sessionLoot.memberDamageReceived[_dotMemberIdx] = (combat.sessionLoot.memberDamageReceived[_dotMemberIdx] || 0) + dotTotalDmg
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
        let maxHp, atk
        if (effect.scale != null) {
            const _cs = getEffectiveStats(caster) || {}
            maxHp = Math.floor((_cs.hp  || caster.maxHp || 1) * effect.scale)
            atk   = Math.floor((_cs.atk || 0) * effect.scale)
        } else {
            maxHp = mob.bst?.hp  || 0
            atk   = mob.bst?.atk || 0
        }
        const mvSlots = { slot1: null, slot2: null, slot3: null, slot4: null }
        resolveMonsterMoves(mob.moves).forEach((id, i) => { if (i < 4) mvSlots[`slot${i + 1}`] = id })
        combat.savedMembers          = combat.savedMembers || {}
        combat.savedMembers[slotIdx] = caster
        combat.savedMemberMoveIndex              = combat.savedMemberMoveIndex || {}
        combat.savedMemberMoveIndex[slotIdx]     = combat.memberMoveIndex[slotIdx]
        state.team[slotIdx] = {
            id:               effect.summonId,
            name:             mob.name,
            image:            mob.image,
            classId:          null,
            _stats:           { atk, spd: mob.bst?.spd ?? 100, hp: maxHp, flatDamage: 0, finalDamagePct: 0, spellDamagePct: 0, damageReductionPct: 0, critChance: 0, critDamagePct: 50, res: { ...(mob.bst?.res || {}) }, healPct: 0 },
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
            actionsRemaining: effect.duration ?? Infinity,
            onDeath:          effect.onDeath || mob.onDeath || null
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
        const scale    = mob.ownerId ? 1 : 1.25
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
            moves:            resolveMonsterMoves(mob.moves),
            rarity:           mob.rarity  || 'commun',
            tier:             mob.tier    || 'normal',
            dropRate:         0,
            buffs:            [],
            dots:             [],
            moveIndex:        0,
            isSummon:         true,
            actionsRemaining: effect.duration ?? Infinity,
            onDeath:          effect.onDeath || mob.onDeath || null,
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
        const _summonDeathTarget = (combat.isRaid && combat.enemies)
            ? (combat.enemies.find(e => e && e.currentHp > 0) || null)
            : (combat.enemy || null)
        for (const eff of summon.onDeath) {
            executeEffect({
                caster:      summon,
                casterStats: summonStats,
                targetEnemy: _summonDeathTarget,
                effect:      eff,
                moveData:    { name: summonName },
                moveId:      null,
                onTargetKill: () => _handleReactionKill(_summonDeathTarget, summon)
            })
        }
    }

    state.team[slotIdx] = original
    delete combat.savedMembers[slotIdx]
    combat.memberTimers[slotIdx] = 0
    if (combat.savedMemberMoveIndex?.[slotIdx] != null) {
        combat.memberMoveIndex[slotIdx] = combat.savedMemberMoveIndex[slotIdx]
        delete combat.savedMemberMoveIndex[slotIdx]
    }
    if (combat.interceptor === slotIdx) delete combat.interceptor
    addLog(`${original.name || classes[original.classId]?.name || '?'} reprend le combat !`)
}

// ─── Compagnons (summon_companion) ───────────────────────────────────────────

function spawnCompanion(caster, effect) {
    const mob     = summons[effect.summonId]
    if (!mob) return
    const slotIdx = state.team.indexOf(caster)
    if (slotIdx === -1) return

    let maxHp, atk
    if (effect.scale != null) {
        const cs = getEffectiveStats(caster) || {}
        maxHp = Math.floor((cs.hp  || caster.maxHp || 1) * effect.scale)
        atk   = Math.floor((cs.atk || 0) * effect.scale)
    } else {
        maxHp = mob.bst?.hp  || 0
        atk   = mob.bst?.atk || 0
    }

    caster.companion = {
        id:               mob.id,
        name:             mob.name,
        image:            mob.image,
        _stats:           { atk, spd: mob.bst?.spd ?? 100, hp: maxHp, flatDamage: 0, finalDamagePct: 0, spellDamagePct: 0, damageReductionPct: 0, critChance: 0, critDamagePct: 50, res: { ...(mob.bst?.res || {}) }, healPct: 0 },
        currentHp:        maxHp,
        maxHp,
        moves:            mob.moves || [],
        moveIndex:        0,
        timer:            0,
        buffs:            [],
        isCompanion:      true,
        ownerSlot:        slotIdx,
        actionsRemaining: effect.duration ?? Infinity,
    }
    addLog(`${caster.name || classes[caster.classId]?.name || '?'} invoque ${mob.name} à ses côtés !`)
}

function actCompanion(owner) {
    const companion = owner.companion
    if (!companion) return
    if (companion.currentHp <= 0) { owner.companion = null; return }

    if (companion.actionsRemaining !== Infinity) {
        companion.actionsRemaining--
        if (companion.actionsRemaining <= 0) {
            addLog(`${companion.name} disparaît.`)
            owner.companion = null
            return
        }
    }

    const moveId = companion.moves[companion.moveIndex % companion.moves.length]
    companion.moveIndex++
    const mv = move[moveId]
    if (!mv?.effects) return

    const _companionTarget = combat.isRaid && combat.enemies
        ? (combat.enemies.find(e => e && e.currentHp > 0) || null)
        : (combat.enemy || null)
    for (const eff of mv.effects) {
        executeEffect({
            caster:      companion,
            casterStats: companion._stats,
            targetEnemy: _companionTarget,
            effect:      eff,
            moveData:    mv,
            moveId,
            onTargetKill: () => _handleReactionKill(_companionTarget, companion)
        })
    }
    addLog(`${companion.name} → ${mv.name}`)
}

function returnToOwner(died = false) {
    if (!combat.savedEnemy) return
    const dyingSummon = combat.enemy
    if (died && dyingSummon?.onDeath) {
        const target = state.team[combat.activeMemberIndex]
        if (target && target.currentHp > 0) {
            const summonStats = {
                atk: dyingSummon.atk || 0, flatDamage: 0, finalDamagePct: 0, spellDamagePct: 0,
                damageReductionPct: 0, critChance: dyingSummon.critChance ?? 5, critDamagePct: dyingSummon.critDamagePct ?? 50,
                res: dyingSummon.res || {}
            }
            for (const eff of dyingSummon.onDeath) {
                executeEffect({
                    caster: dyingSummon, casterStats: summonStats, targetEnemy: target,
                    effect: eff, moveData: { name: dyingSummon.name }, moveId: null
                })
            }
        }
    }
    addLog(`${combat.savedEnemy.name} reprend le combat !`)
    combat.enemy           = combat.savedEnemy
    combat.savedEnemy      = null
    combat.enemyTimer      = 0
    combat.enemyNextMoveId = pickNextEnemyMove(combat.enemy)
}

// ─── Victoire / Défaite ───────────────────────────────────────────────────────

function _checkWildSkullRecord(areaId, killCount) {
    if (!state.skullRecords) state.skullRecords = {}
    if (!state.skullRecords[areaId]) state.skullRecords[areaId] = {}
    const prev = state.skullRecords[areaId][state.skullLevel]
    if (prev === undefined || killCount > prev) {
        state.skullRecords[areaId][state.skullLevel] = killCount
        if (prev !== undefined) showNotification(`Nouveau record skull ${state.skullLevel} ! ${killCount} kills`, 'info')
        saveGame()
    }
}

function _checkDungeonSkullRecord(areaId, attackCount) {
    if (!attackCount) return
    if (!state.skullRecords) state.skullRecords = {}
    if (!state.skullRecords[areaId]) state.skullRecords[areaId] = {}
    const prev = state.skullRecords[areaId][state.skullLevel]
    if (prev === undefined || attackCount < prev) {
        state.skullRecords[areaId][state.skullLevel] = attackCount
        if (prev !== undefined) showNotification(`Nouveau record skull ${state.skullLevel} ! ${attackCount} attaques`, 'info')
        saveGame()
    }
}

function onVictory() {
    // Double-appel possible si un sort a plusieurs effets de dégâts — on ignore les suivants
    if (combat.respawnPending) return
    combat.respawnPending = true
    combat.trapStacks = {}

    // Tout le corps est protégé : une exception ici (XP, loot, level-up...) ne doit jamais
    // laisser respawnPending bloqué à true, sinon le combat reste gelé avec l'ennemi à 0 PV
    // pour toujours (plus de mort, plus de respawn, plus de fin de combat).
    try {
        _onVictoryBody()
    } catch (e) {
        console.error('[onVictory] erreur inattendue — combat débloqué de force:', e)
        combat.respawnPending = false
        addLog('⚠️ Erreur de combat — combat interrompu')
        stopCombat()
        state.isRunning = false
    }
}

function _onVictoryBody() {
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

    // Skull record — zones sauvages / events
    if (state.skullLevel > 0 && !combat.isPoutch && !combat.isRaid) {
        const _aType = areas[state.currentArea]?.type
        if (_aType !== 'dungeon') _checkWildSkullRecord(state.currentArea, combat.sessionLoot.killCount)
    }

    // Kill credit pour passifs Sram / Féca
    const killerIdx = combat.activeMemberIndex
    combat.memberKillCount[killerIdx] = (combat.memberKillCount[killerIdx] || 0) + 1
    _handleDofusOnKill(killerIdx)

    // Limite 200 kills/personnage : KO forcé, le suivant prend le relais
    if (combat.memberKillCount[killerIdx] >= 200) {
        const _km = state.team[killerIdx]
        if (_km && _km.currentHp > 0) {
            _km.currentHp = 0
            addLog(`${_km.name || classes[_km.classId]?.name || '?'} a vaincu 200 ennemis — relève !`)
            _autoSwitchActive()
            if (state.team.every(m => !m || m.currentHp <= 0)) { onDefeat(); return }
        }
    }

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
                if (d.itemId?.startsWith('Dofus_')) {
                    combat.sessionLoot.dofusDrops[d.itemId] = (combat.sessionLoot.dofusDrops[d.itemId] || 0) + 1
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

    // Donjon séquentiel : il reste des boss à vaincre avant de valider
    if (areas[state.currentArea]?.type === 'dungeon' && combat.dungeonBossQueue?.length > 0) {
        const _nextBossId = combat.dungeonBossQueue.shift()
        const _respawnNext = () => {
            combat.respawnPending = false
            if (!state.isRunning || !state.currentArea) return
            const _nb = _spawnEnemyById(_nextBossId)
            if (_nb) _nb.isRaidMiniBoss = false
            combat.enemy           = _nb
            combat.enemyNextMoveId = pickNextEnemyMove(combat.enemy)
            combat.savedEnemy      = null
            combat.enemyTimer      = 0
            updateCombatUI()
        }
        if (_afkSeconds > 0) { _respawnNext(); return }
        setTimeout(_respawnNext, 500)
        return
    }

    // Wanted boss : victoire — récompense panoplie + mise à l'échelle de difficulté
    // L'autopilot s'arrête toujours sur une victoire wanted (boss vaincu = fin de cycle)
    if (combat.isWanted) {
        const _wid = combat.isWanted
        combat.respawnPending = false
        _onWantedVictory(_wid)
        stopCombat()
        state.isRunning = false
        _afkSeconds = 0
        if (_autoPilot) {
            _mergeSessionLoot(_autoPilot.accumulated, combat.sessionLoot)
            combat.sessionLoot = JSON.parse(JSON.stringify(_autoPilot.accumulated))
            _autoPilot = null
        }
        saveGame()
        showSessionSummary('wanted_victory')
        return
    }

    // Donjon : victoire finale — consomme la clé, relance si option active
    if (areas[state.currentArea]?.type === 'dungeon') {
        combat.respawnPending = false
        const doneArea = state.currentArea
        const _dungeonAttacks = combat.playerAttackCount || 0
        stopCombat()
        if (state.skullLevel > 0) _checkDungeonSkullRecord(doneArea, _dungeonAttacks)
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
        combat.enemy           = spawnEnemy(state.currentArea)
        combat.enemyNextMoveId = pickNextEnemyMove(combat.enemy)
        combat.savedEnemy      = null
        combat.enemyTimer      = 0
        _triggerSpawnWeaknessTrophies(combat.enemy)
        return
    }
    setTimeout(() => {
        combat.respawnPending = false
        if (!state.isRunning || !state.currentArea) return
        combat.enemy          = spawnEnemy(state.currentArea)
        combat.enemyNextMoveId = pickNextEnemyMove(combat.enemy)
        combat.savedEnemy     = null
        combat.enemyTimer     = 0
        _triggerSpawnWeaknessTrophies(combat.enemy)
        updateCombatUI()
    }, 500)
}

function onDefeat() {
    // Invalide toute reprise éventuelle : après une défaite on repart de zéro
    state.savedCombatEnemy = null
    state.savedCombatState = null

    if (_afkSeconds > 0) {
        const _afkWantedId = combat?.isWanted || null
        if (_afkWantedId) _onWantedDefeat(_afkWantedId)
        stopCombat()
        if (combat) combat.enemy = null
        if (_afkWantedId) saveGame()
        _offlineHandleDefeat()
        return
    }

    if (combat?.isPoutch) {
        stopCombat()
        if (combat) combat.enemy = null
        showPoutchSummary('defeat')
        return
    }

    // Wanted boss : défaite → persiste les PV restants du boss
    if (combat?.isWanted) {
        _onWantedDefeat(combat.isWanted)
        stopCombat()
        state.isRunning = false
        combat.enemy = null
        if (_autoPilot && _autoPilot.remaining > 0 &&
            (state.inventory['piloteAutomatique']?.count || 0) > 0) {
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
            combat.sessionLoot = JSON.parse(JSON.stringify(_autoPilot.accumulated))
            _autoPilot = null
            showSessionSummary('autopilot')
            return
        }
        saveGame()
        showSessionSummary('defeat')
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
        combat.sessionLoot = JSON.parse(JSON.stringify(_autoPilot.accumulated))
        _autoPilot = null
        showSessionSummary('autopilot')
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

function _applyCastProcs(member, mv) {
    const procs = (member.buffs || []).filter(b => b.stat === 'cast_proc' && b.turnsRemaining > 0)
    if (!procs.length) return
    const stats = getEffectiveStats(member) ?? member._stats
    for (const proc of procs) {
        executeEffect({
            caster: member, casterStats: stats,
            targetEnemy: combat?.enemy,
            effect: proc.procEffect,
            moveData: mv, moveId: proc._source,
            fromItemPassive: true,
            onTargetKill: () => _handleReactionKill(combat?.enemy, member)
        })
        proc.turnsRemaining--
    }
    member.buffs = member.buffs.filter(b => b.stat !== 'cast_proc' || b.turnsRemaining > 0)
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
        // hpCostPerTurnPct : coût en PV courants par tour (ex: Mutilation)
        for (const b of entity.buffs) {
            if (b.stat === 'hpCostPerTurnPct' && (b.delay ?? 0) <= 0 && !b._new) {
                const _hpCost = Math.min(
                    Math.floor((entity.currentHp || 0) * b.value / 100),
                    Math.max(0, (entity.currentHp || 1) - 1)
                )
                if (_hpCost > 0) {
                    entity.currentHp -= _hpCost
                    addLog(`Mutilation → ${entity.name || classes[entity.classId]?.name || '?'} sacrifie ${_hpCost} PV`)
                }
            }
        }
        for (const b of entity.buffs) {
            if (!b._new && b.duration === 1 && b.directApplied && b.stat === 'maxHp') {
                entity.maxHp = Math.max(1, (entity.maxHp || 1) - b.value)
                entity.currentHp = Math.min(entity.currentHp || 0, entity.maxHp)
            }
        }
        entity.buffs = entity.buffs
            .map(b => {
                if (b.stat === 'cast_proc') return b
                if (b._new) return { ...b, _new: false }
                if ((b.delay ?? 0) > 0) return { ...b, delay: b.delay - 1 }
                return { ...b, duration: b.duration - 1 }
            })
            .filter(b => b.stat === 'cast_proc' || (b.delay ?? 0) > 0 || b.duration > 0)
    }
    if (entity.shield) {
        if (entity.shield._new) {
            delete entity.shield._new
        } else {
            entity.shield.duration--
        }
        if (entity.shield.duration <= 0) entity.shield = null
    }
    if (entity.reactiveStates?.length) {
        entity.reactiveStates = entity.reactiveStates
            .map(r => r._new ? { ...r, _new: false } : { ...r, duration: r.duration - 1 })
            .filter(r => r.duration > 0)
    }
    // Renvoi persistant : tick durée (one-shot = pas de duration, géré dans le path dégâts)
    if (entity.renvoi?.duration !== undefined) {
        if (entity.renvoi._new) {
            delete entity.renvoi._new
        } else {
            entity.renvoi.duration--
            if (entity.renvoi.duration <= 0) delete entity.renvoi
        }
    }
    // renvoiAdditif persistant : tick durée
    if (entity.renvoiAdditif?.duration !== undefined) {
        if (entity.renvoiAdditif._new) {
            delete entity.renvoiAdditif._new
        } else {
            entity.renvoiAdditif.duration--
            if (entity.renvoiAdditif.duration <= 0) delete entity.renvoiAdditif
        }
    }
}

function addLog(msg) {
    if (!combat) return
    combat.log.unshift(msg)
    if (combat.log.length > 8) combat.log.pop()
}

// Fait exploser immédiatement les pièges/retardements (voir case 'trap'/'retardement') posés par un
// membre qui quitte la position active (swap manuel, swap raid, ou mort → auto-switch), avant d'avoir
// atteint le seuil de déclenchement normal.
// raidSlotIdx : slot raid (0-2) qu'occupait le membre — utilisé pour retrouver son adversaire en raid.
function _explodeOwnedTraps(memberIdx, raidSlotIdx) {
    if (!combat?.trapStacks) return
    const member = state.team[memberIdx]
    if (!member) return
    const stats = getEffectiveStats(member) ?? member._stats
    let targetEnemy = combat.enemy
    if (combat.isRaid) {
        const slotIdx      = raidSlotIdx !== undefined ? raidSlotIdx : (combat.raidSlots?.indexOf(memberIdx) ?? -1)
        const targetSlotIdx = slotIdx !== -1 ? _getRaidTargetSlot(slotIdx) : -1
        targetEnemy = targetSlotIdx !== -1 ? combat.enemies[targetSlotIdx] : _getFirstAliveRaidEnemy()
    }
    if (!targetEnemy || targetEnemy.currentHp <= 0) return
    for (const key in combat.trapStacks) {
        if (combat.trapOwners?.[key] !== memberIdx) continue
        const count = combat.trapStacks[key]
        if (!count) continue
        combat.trapStacks[key] = 0
        const meta = combat.trapEffects?.[key]
        if (!meta) continue
        addLog(`${meta.moveName} → changement d'actif : ${count} piège(s) déclenché(s) !`)
        for (let i = 0; i < count; i++) {
            executeEffect({
                caster: member, casterStats: stats, targetEnemy,
                effect: { ...meta.effect, type: 'damage' }, moveData: { name: meta.moveName }, moveId: key + '_blast',
                onTargetKill: () => _handleReactionKill(targetEnemy, member)
            })
        }
    }
}

function setActiveMember(index) {
    if (!combat || !state.isRunning) return
    if (combat.isRaid) {
        setRaidMemberForSwap(index)
        return
    }
    const m = state.team[index]
    if (!m || m.currentHp <= 0) return
    const _wasSwap = index !== combat.activeMemberIndex
    if (_wasSwap) {
        combat.memberTimers[index] = 0
        const _prevM = state.team[combat.activeMemberIndex]
        if (_prevM) _prevM.spellStacks = {}
        _explodeOwnedTraps(combat.activeMemberIndex)
        _handleDofusSwapEffects(combat.activeMemberIndex)
    }
    combat.activeMemberIndex = index
    if (_wasSwap) _triggerDofusOnActive(index)
    updateCombatUI()
}

function _checkTrophyTrigger(memberIndex) {
    const member = state.team[memberIndex]
    if (!member?.equip) return
    const trophyId = member.equip.accessoire
    if (!trophyId) return
    const itm = item[trophyId]
    if (!itm?.trophy) return

    const { trigger, switchTo } = itm.trophy
    if (trigger.type === 'spells_cast') {
        combat.memberTrophyCounters[memberIndex] = (combat.memberTrophyCounters[memberIndex] || 0) + 1
        if (combat.memberTrophyCounters[memberIndex] >= trigger.count) {
            if (trigger.resetOnTrigger) combat.memberTrophyCounters[memberIndex] = 0
            _switchByTrophy(memberIndex, switchTo, itm.name)
        }
    }
}

function _triggerSpawnWeaknessTrophies(enemy) {
    if (!enemy || !combat || !state.isRunning || combat.isRaid) return
    const res = enemy.res || {}
    const elements = ['terre', 'feu', 'eau', 'air', 'neutre']
    const minRes = Math.min(...elements.map(e => res[e] ?? 0))
    const weakestElems = new Set(elements.filter(e => (res[e] ?? 0) === minRes))

    for (let i = 0; i < state.team.length; i++) {
        if (i === combat.activeMemberIndex) continue
        const m = state.team[i]
        if (!m || m.currentHp <= 0 || !m.equip) continue
        const trophyId = m.equip.accessoire
        if (!trophyId) continue
        const itm = item[trophyId]
        if (!itm?.trophy?.trigger) continue
        const { trigger } = itm.trophy
        if (trigger.type === 'enemy_spawn_weakness' && weakestElems.has(trigger.element)) {
            const memberName = m.name || classes[m.classId]?.name || `Slot ${i + 1}`
            addLog(`${itm.name} → ${memberName} entre en jeu !`)
            setActiveMember(i)
            return
        }
    }
}

function _switchByTrophy(fromIndex, switchTo, trophyName) {
    const living = []
    for (let i = 0; i < state.team.length; i++) {
        const m = state.team[i]
        if (m && m.currentHp > 0) living.push(i)
    }
    if (living.length <= 1) return

    const curPos = living.indexOf(fromIndex)
    let targetIndex

    if (switchTo.type === 'next') {
        targetIndex = living[(curPos + 1) % living.length]
    } else if (switchTo.type === 'prev') {
        targetIndex = living[(curPos - 1 + living.length) % living.length]
    } else if (switchTo.type === 'slot') {
        const desired = switchTo.index
        const m = state.team[desired]
        if (m && m.currentHp > 0) {
            targetIndex = desired
        } else {
            targetIndex = living[(curPos + 1) % living.length]
        }
    }

    if (targetIndex !== undefined && targetIndex !== fromIndex) {
        const memberName = state.team[targetIndex]?.name || classes[state.team[targetIndex]?.classId]?.name || `Slot ${targetIndex + 1}`
        addLog(`${trophyName} → ${memberName}`)
        setActiveMember(targetIndex)
    }
}

function _triggerReuche(depletedAlly) {
    const zIdx = state.team.findIndex(m => m && m !== depletedAlly && m.currentHp > 0 && m.buffs?.some(b => b.stat === 'reuche_guard'))
    if (zIdx === -1) return
    const zobal = state.team[zIdx]
    const bIdx = zobal.buffs.findIndex(b => b.stat === 'reuche_guard')
    zobal.buffs.splice(bIdx, 1)
    const allyName = depletedAlly.name || classes[depletedAlly.classId]?.name || '?'
    const zobalName = zobal.name || classes[zobal.classId]?.name || '?'
    addLog(`Reuche → ${zobalName} prend la place de ${allyName} !`)
    setActiveMember(zIdx)
}

// ─── Helpers Dofus passifs avancés ───────────────────────────────────────────

// Dofus Ivoire : compte les coups reçus et applique damage_block au seuil
function _handleDofusDamageReceived(memberIdx, member) {
    if (!member?.equip || !combat) return
    for (const slotId in member.equip) {
        const itemId = member.equip[slotId]
        if (!itemId) continue
        const itm = item[itemId]
        if (!itm?.effects?.length) continue
        for (const eff of itm.effects) {
            if (!eff.on_damage_received) continue
            const every = eff.on_damage_received.every || 4
            combat.dofusDamageCounter[memberIdx] = combat.dofusDamageCounter[memberIdx] || {}
            combat.dofusDamageCounter[memberIdx][itemId] = (combat.dofusDamageCounter[memberIdx][itemId] || 0) + 1
            if (combat.dofusDamageCounter[memberIdx][itemId] >= every) {
                combat.dofusDamageCounter[memberIdx][itemId] = 0
                if (eff.reaction === 'cancel_next_damage') {
                    member.buffs = member.buffs || []
                    member.buffs.push({ stat: 'damage_block', duration: Infinity })
                    addLog(`${member.name || classes[member.classId]?.name || '?'} [${itm.name}] → prochain coup annulé !`)
                }
            }
        }
    }
}

// Dofus Sylvestre / Abyssal : accumule des stacks de stat à chaque kill
function _handleDofusOnKill(memberIdx) {
    const m = state.team[memberIdx]
    if (!m?.equip || !combat) return
    for (const slotId in m.equip) {
        const itemId = m.equip[slotId]
        if (!itemId) continue
        const itm = item[itemId]
        if (!itm?.effects?.length) continue
        for (const eff of itm.effects) {
            if (!eff.on_kill) continue
            const cfg = eff.on_kill
            combat.dofusKillStacks[memberIdx] = combat.dofusKillStacks[memberIdx] || {}
            const current = combat.dofusKillStacks[memberIdx][itemId] || 0
            if (current >= cfg.max_value) continue
            const newVal = Math.min(current + cfg.per_kill, cfg.max_value)
            combat.dofusKillStacks[memberIdx][itemId] = newVal
            addLog(`${m.name || classes[m.classId]?.name || '?'} [${itm.name}] → +${cfg.per_kill} ${cfg.stat} (${newVal}/${cfg.max_value})`)
        }
    }
}

// Dofus Sylvestre : gère le heal on_inactive_at_max et reset des stacks au swap
function _handleDofusSwapEffects(prevIdx) {
    const prevM = state.team[prevIdx]
    if (!prevM?.equip || !combat) return
    for (const slotId in prevM.equip) {
        const itemId = prevM.equip[slotId]
        if (!itemId) continue
        const itm = item[itemId]
        if (!itm?.effects?.length) continue
        for (const eff of itm.effects) {
            if (!eff.on_kill?.swap_reset) continue
            const cfg = eff.on_kill
            const stacks = combat.dofusKillStacks?.[prevIdx]?.[itemId] || 0
            if (cfg.on_inactive_at_max && stacks >= cfg.max_value) {
                const stats = getEffectiveStats(prevM) ?? prevM._stats
                executeEffect({
                    caster: prevM, casterStats: stats, targetEnemy: combat.enemy,
                    effect: cfg.on_inactive_at_max, moveData: { name: itm.name }, moveId: itm.id,
                    fromItemPassive: true,
                    onTargetKill: () => _handleReactionKill(combat.enemy, prevM)
                })
                addLog(`${prevM.name || classes[prevM.classId]?.name || '?'} [${itm.name}] → compteur max, soin au passage !`)
            }
            if (combat.dofusKillStacks[prevIdx]) {
                delete combat.dofusKillStacks[prevIdx][itemId]
            }
        }
    }
}

// Dofus Émeraude : déclenche les effets on_active quand un membre devient actif
function _triggerDofusOnActive(memberIdx) {
    if (!combat) return
    const m = state.team[memberIdx]
    if (!m?.equip || m.currentHp <= 0) return
    const stats = getEffectiveStats(m) ?? m._stats
    for (const slotId in m.equip) {
        const itemId = m.equip[slotId]
        if (!itemId) continue
        const itm = item[itemId]
        if (!itm?.effects?.length) continue
        for (const eff of itm.effects) {
            if (!eff.on_active) continue
            const effToExec = eff.value_level_mult
                ? { ...eff, value: (m.level || 1) * eff.value_level_mult }
                : eff
            executeEffect({
                caster: m, casterStats: stats, targetEnemy: combat.enemy,
                effect: effToExec, moveData: { name: itm.name }, moveId: itm.id,
                fromItemPassive: true,
                onTargetKill: () => _handleReactionKill(combat.enemy, m)
            })
        }
    }
}

function _autoSwitchActive() {
    if (!combat) return
    const cur    = state.team[combat.activeMemberIndex]
    const curIdx = combat.activeMemberIndex
    if (cur && cur.currentHp > 0) return

    if (cur) _explodeOwnedTraps(curIdx)

    // Invocation alliée morte : restaurer le propriétaire
    if (cur?.isSummon && cur.ownerSlot !== undefined) {
        returnAllyToOwner(cur.ownerSlot)
        if (state.team[curIdx]?.currentHp > 0) return
    }

    // Nettoyage fatal_intercept : si le membre mort était le transposeur, on retire l'état
    if (cur && combat.transposerSlot === curIdx) {
        delete combat.transposerSlot
        if (cur.transposition) delete cur.transposition
    }

    // Passif Roublard : explosion à la mort (une seule fois par membre)
    if (cur && !combat.memberDeathHandled?.[curIdx]) {
        combat.memberDeathHandled[curIdx] = true
        if (classes[cur.classId]?.passive?.id === 'roublard' && combat.enemy?.currentHp > 0) {
            const dmg = Math.floor((cur.maxHp || 0) * 0.30)
            combat.enemy.currentHp = Math.max(0, combat.enemy.currentHp - dmg)
            addLog(`${cur.name || classes[cur.classId]?.name || '?'} [Passif] → Mort Explosive ! ${dmg} dégâts à ${combat.enemy.name} !`)
            if (combat.enemy.currentHp <= 0) {
                if (combat.enemy.isSummon) returnToOwner(true)
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
    combat.raidRespawnPending    = [false, false, false]
    combat.raidSavedEnemies      = [null, null, null]
    combat.huppermageLastElement = {}
    combat.huppermageComboCount  = 0
    combat.enutrof_air_active    = 0
    combat.enutrof_terre_active  = 0
    combat.enutrof_eau_active    = 0
    combat.enutrof_traps         = []
    combat.pendingRaidSwap    = null
    combat.raidKillCount      = 0
    combat.raidTotalSpawned   = 3
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
    const _range   = (maxLvl - minLvl) || 1
    const _t       = mobLevel - minLvl
    const hpScale  = 1 + _t * (_HP_RATIO[area.maxLevel]  ?? 0.556) / _range
    const atkScale = 1 + _t * (_ATK_RATIO[area.maxLevel] ?? 0.500) / _range

    if (!state.seenMonsters) state.seenMonsters = {}
    state.seenMonsters[monsterId] = true

    const enemy = {
        id:             monsterId,
        name:           mob.name,
        element:        mob.element,
        level:          mobLevel,
        image:          mob.image,
        maxHp:          Math.floor(mob.bst.hp  * hpScale),
        currentHp:      Math.floor(mob.bst.hp  * hpScale),
        atk:            Math.floor(mob.bst.atk * atkScale),
        spd:            mob.bst.spd,
        res:            { ...mob.bst.res },
        finalDamagePct: 0,
        flatDamage:     0,
        critChance:     mob.bst.critChance    ?? 5,
        critDamagePct:  mob.bst.critDamagePct ?? 50,
        critResPct:     mob.bst.res?.crit     ?? 0,
        moves:          resolveMonsterMoves(mob.moves),
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

    enemy._baseMaxHp = enemy.maxHp
    return enemy
}

// ─── Apparition du mini-boss (push chain slot 0←1←2) ─────────

function _spawnRaidMiniBoss() {
    if (combat.raidMiniBossActive) return
    try {
        const area = areas[state.currentArea]
        if (!area?.miniBoss) return
        const bossIds = area.miniBoss.ids || [area.miniBoss.id]
        const bossId  = bossIds[Math.floor(Math.random() * bossIds.length)]
        const boss = _spawnEnemyById(bossId, area.miniBoss.statMult || 1)
        if (!boss) throw new Error(`spawn du mini-boss échoué (id invalide: ${bossId})`)

        // Boss seul au slot 0 — slots 1 et 2 vidés pour qu'aucun mob normal ne combat en même temps
        combat.enemies[0]          = boss
        combat.enemyTimers[0]      = 0
        combat.enemyNextMoveIds[0] = pickNextEnemyMove(boss)
        combat.enemies[1]          = null
        combat.enemyTimers[1]      = 0
        combat.enemyNextMoveIds[1] = null
        combat.enemies[2]          = null
        combat.enemyTimers[2]      = 0
        combat.enemyNextMoveIds[2] = null

        combat.raidRespawnPending  = [false, false, false]
        combat.raidMiniBossActive  = true
        addLog(`${boss.name} apparaît !`)
        updateCombatUI()
    } catch (e) {
        // Ne jamais laisser le raid bloqué en attente du watchdog (5s) si le spawn du
        // boss échoue (donnée invalide, exception de rendu...) — on relance des mobs normaux.
        console.error('[_spawnRaidMiniBoss] échec — fallback sur un mob normal', e)
        combat.raidMiniBossActive = false
        combat.enemies[0]         = spawnEnemy(state.currentArea)
        combat.enemyTimers[0]     = 0
        combat.enemyNextMoveIds[0] = combat.enemies[0] ? pickNextEnemyMove(combat.enemies[0]) : null
        combat.raidRespawnPending  = [false, false, false]
        updateCombatUI()
    }
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

    // Watchdog : si aucun ennemi valide depuis trop longtemps → force-spawn de secours
    // (évite les états bloqués permanents si un raidRespawnPending reste à true par accident)
    const _anyValidEnemy = combat.enemies.some((e, i) => e && e.currentHp > 0 && !combat.raidRespawnPending[i])
    if (!_anyValidEnemy && !(_afkSeconds > 0)) {
        combat._stuckFrames = (combat._stuckFrames || 0) + 1
        if (combat._stuckFrames > 300) {
            combat._stuckFrames = 0
            combat.raidMiniBossActive = false
            for (let i = 0; i < 3; i++) {
                combat.raidRespawnPending[i] = false
                if (!combat.enemies[i] || combat.enemies[i].currentHp <= 0) {
                    combat.enemies[i] = spawnEnemy(state.currentArea)
                    combat.enemyTimers[i] = 0
                    if (combat.enemies[i]) combat.enemyNextMoveIds[i] = pickNextEnemyMove(combat.enemies[i])
                }
            }
            updateCombatUI()
        }
    } else {
        combat._stuckFrames = 0
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
        const _rMCd = _peekNextCastCooldown(member, memberIdx)
        const rate  = (100 / (_rMCd / TICK_MS)) * ((stats.spd || 100) / 100) * (_afkSeconds > 0 ? 1 : _combatSpeedMult)
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
            if ((b.delay ?? 0) > 0) continue
            if (b.stat === 'spd') effectiveSpd += b.value
        }
        if ((enemy.buffs || []).some(b => b.stat === 'spdInvert' && !(b.delay ?? 0)))
            effectiveSpd = 200 - effectiveSpd
        effectiveSpd = Math.max(25, effectiveSpd)
        const _rECd = _peekEnemyCastCooldown(enemy)
        const rate = (100 / (_rECd / TICK_MS)) * (effectiveSpd / 100) * (_afkSeconds > 0 ? 1 : _combatSpeedMult)
        combat.enemyTimers[slotIdx] = (combat.enemyTimers[slotIdx] || 0) + rate

        if (combat.enemyTimers[slotIdx] >= 100) {
            combat.enemyTimers[slotIdx] = 0
            executeEnemyActionRaid(slotIdx)
        }
    }
    // Timer des compagnons alliés (raid)
    for (let _ci = 0; _ci < state.team.length; _ci++) {
        const _cm = state.team[_ci]
        if (!_cm?.companion || _cm.companion.currentHp <= 0) continue
        const _comp      = _cm.companion
        if (!_comp.moves?.length) continue
        const _compMvId  = _comp.moves[_comp.moveIndex % _comp.moves.length]
        const _compCd    = move[_compMvId]?.cooldownMs || 2000
        const _compRate  = (100 / (_compCd / TICK_MS)) * (_afkSeconds > 0 ? 1 : _combatSpeedMult)
        _comp.timer = (_comp.timer || 0) + _compRate
        if (_comp.timer >= 100) {
            _comp.timer = 0
            if (!combat.raidRespawnPending?.some(Boolean)) actCompanion(_cm)
        }
    }
    combat._criticalErrors = 0
    } catch(e) {
        console.error('[raidGameTick]', e)
        if (combat) {
            combat._criticalErrors = (combat._criticalErrors || 0) + 1
            if (combat._criticalErrors > 10) {
                console.error('[raidGameTick] Erreur critique répétée — sortie forcée du combat')
                leaveCombat()
            }
        }
    }
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

    const _prevEnutrofRaid = {
        air:   combat.enutrof_air_active   || 0,
        terre: combat.enutrof_terre_active || 0,
        eau:   combat.enutrof_eau_active   || 0
    }

    const _skipSummonCompanionRaid = mv.effects.some(e => e.type === 'summon_companion' && member.companion?.id === e.summonId && (member.companion?.currentHp ?? 0) > 0)

    if (!_skipSummonCompanionRaid) {
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
    }

    for (const s of ['air', 'terre', 'eau']) {
        const k = `enutrof_${s}_active`
        if ((combat[k] || 0) > 0 && combat[k] === _prevEnutrofRaid[s]) combat[k]--
    }

    // Décrément des pièges Énutrof (par action alliée)
    if (combat.enutrof_traps?.length) {
        for (const trap of combat.enutrof_traps) {
            if (trap._justSet) { trap._justSet = false; continue }
            if (trap.active > 0) trap.active--
        }
        combat.enutrof_traps = combat.enutrof_traps.filter(t => t.active > 0)
    }

    _applyCastProcs(member, mv)
    _applyHealOnCast(member, mv)
    tickBuffs(member)

    const newRawIdx   = combat.memberMoveIndex[memberIdx]
    const cycleLength = isXelor ? 7 : nonNull.length
    _applyPassiveTick(member, memberIdx, newRawIdx, cycleLength, targetEnemy)
    _applyItemPassives(member, memberIdx, newRawIdx, targetEnemy)

    // Décompte des actions de l'invocation alliée
    if (member.isSummon && member.ownerSlot !== undefined) {
        member.actionsRemaining--
        if (member.actionsRemaining <= 0) returnAllyToOwner(member.ownerSlot)
    }

    // Décompte de la durée du partage de douleur (par action du membre)
    if (member.damageShare) {
        member.damageShare.duration--
        if (member.damageShare.duration <= 0) delete member.damageShare
    }

    combat.memberTimers[memberIdx] = 0
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
    let target = state.team[targetMemberIdx]
    if (combat.interceptor !== undefined) {
        const interceptor = state.team[combat.interceptor]
        if (interceptor?.currentHp > 0) target = interceptor
        else delete combat.interceptor
    }
    if (!target || target.currentHp <= 0) { onDefeat(); return }

    const enemyStats = {
        atk: e.atk || 0, flatDamage: 0, finalDamagePct: 0,
        spellDamagePct: 0, damageReductionPct: 0,
        critChance: e.critChance ?? 5, critDamagePct: e.critDamagePct ?? 50, res: e.res || {}
    }
    for (const b of (e.buffs || [])) {
        if (b.stat in enemyStats) enemyStats[b.stat] += b.value
    }

    // Combos Huppermage one-shots : réduction dégâts ennemi ce tour
    {
        const _feuEau = (e.buffs || []).find(b => b.stat === 'feu_eau_debuff')
        if (_feuEau) {
            e.buffs = e.buffs.filter(b => b !== _feuEau)
            if (Math.random() * 100 < 7) {
                enemyStats.finalDamagePct -= 50
                addLog(`Perturbation élémentaire → ${e.name} -50% dégâts ce tour`)
            }
        }
        const _eauAir = (e.buffs || []).find(b => b.stat === 'eau_air_debuff')
        if (_eauAir) {
            e.buffs = e.buffs.filter(b => b !== _eauAir)
            enemyStats.finalDamagePct -= 15
            addLog(`Bouclier élémentaire → ${e.name} -15% dégâts ce tour`)
        }
    }

    const targetStats = getEffectiveStats(target) ?? target._stats ?? null
    const logPrefix   = `${e.name} utilise `

    const isCritRoll = Math.random() * 100 < (enemyStats.critChance || 0)

    let lastDamageDealt = 0
    for (const effect of mv.effects) {
        const dmg = executeEffect({
            caster: e, casterStats: enemyStats,
            targetEnemy: target, targetStats,
            effect, moveData: mv, prevMv, lastDamageDealt,
            logPrefix,
            isCrit: isCritRoll,
            onTargetKill: () => {
                const interceptorSlot = combat.interceptor
                if (interceptorSlot !== undefined && target === state.team[interceptorSlot]) {
                    returnAllyToOwner(interceptorSlot)
                } else {
                    _autoSwitchRaidSlot(slotIdx)
                }
                if (state.team.every(m => !m || m.currentHp <= 0)) onDefeat()
            }
        })
        if (dmg !== undefined) lastDamageDealt = dmg
    }

    tickBuffs(e)
    if (combat.enemies[slotIdx]) {
        combat.enemyNextMoveIds[slotIdx] = pickNextEnemyMove(combat.enemies[slotIdx])
    }

    combat.enemyTimers[slotIdx] = 0
}

// ─── Mort d'un ennemi Raid → loot + respawn ───────────────────

function onRaidEnemyDeath(slotIdx, killerMemberIdx) {
    if (combat.raidRespawnPending[slotIdx]) return
    combat.raidRespawnPending[slotIdx] = true

    // Tout le corps est protégé : une exception ici (XP, loot, notifications...) ne doit
    // jamais laisser raidRespawnPending bloqué à true, sinon le slot reste mort pour
    // toujours sans jamais déclencher le watchdog tant qu'un autre slot reste valide.
    try {

    if (combat.huppermageLastElement) delete combat.huppermageLastElement[slotIdx]

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
        _handleDofusOnKill(killerMemberIdx)

        // Limite 200 kills/personnage en Raid
        if (combat.memberKillCount[killerMemberIdx] >= 200) {
            const _km = state.team[killerMemberIdx]
            if (_km && _km.currentHp > 0) {
                _km.currentHp = 0
                addLog(`${_km.name || classes[_km.classId]?.name || '?'} a vaincu 200 ennemis — relève !`)
                const _rs = combat.raidSlots.indexOf(killerMemberIdx)
                if (_rs !== -1) _autoSwitchRaidSlot(_rs)
                if (state.team.every(m => !m || m.currentHp <= 0)) { onDefeat(); return }
            }
        }
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
                if (d.itemId?.startsWith('Dofus_')) {
                    combat.sessionLoot.dofusDrops[d.itemId] = (combat.sessionLoot.dofusDrops[d.itemId] || 0) + 1
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
        // Mini-boss vaincu → reset complet + 3 nouveaux ennemis
        combat.raidMiniBossActive = false
        combat.raidKillCount      = 0
        combat.raidTotalSpawned   = 3
        // Respawn synchrone en fast-forward (setTimeout incompatible avec le drain de _afkSeconds)
        if (_afkSeconds > 0) {
            for (let i = 0; i < 3; i++) {
                combat.enemies[i]         = spawnEnemy(state.currentArea)
                combat.enemyTimers[i]     = 0
                combat.enemyNextMoveIds[i] = pickNextEnemyMove(combat.enemies[i])
                combat.raidRespawnPending[i] = false
            }
            return
        }
        setTimeout(() => {
            if (!state.isRunning || !state.currentArea) return
            for (let i = 0; i < 3; i++) {
                combat.enemies[i]         = spawnEnemy(state.currentArea)
                combat.enemyTimers[i]     = 0
                combat.enemyNextMoveIds[i] = pickNextEnemyMove(combat.enemies[i])
                combat.raidRespawnPending[i] = false
            }
            updateCombatUI()
        }, 500)
        return
    }

    if (combat.raidMiniBossActive) {
        // Mob lambda mort pendant la phase mini-boss → pas de respawn
        if (_afkSeconds > 0) {
            combat.raidRespawnPending[slotIdx] = false
            return
        }
        setTimeout(() => {
            combat.raidRespawnPending[slotIdx] = false
            updateCombatUI()
        }, 500)
        return
    }

    // Mob lambda normal : incrément du compteur de kills
    combat.raidKillCount = (combat.raidKillCount || 0) + 1
    const everyKills = area?.miniBoss?.everyKills

    if (everyKills && combat.raidKillCount >= everyKills) {
        // Seuil atteint → mini-boss (seul, slots 1-2 vides)
        if (_afkSeconds > 0) {
            combat.raidRespawnPending[slotIdx] = false
            _spawnRaidMiniBoss()
        } else {
            setTimeout(() => {
                combat.raidRespawnPending[slotIdx] = false
                if (!state.isRunning || !state.currentArea) return
                _spawnRaidMiniBoss()
            }, 500)
        }
    } else if (!everyKills || combat.raidTotalSpawned < everyKills) {
        // Phase de remplacement : on spawn un nouvel ennemi dans ce slot
        combat.raidTotalSpawned = (combat.raidTotalSpawned || 3) + 1
        if (_afkSeconds > 0) {
            combat.raidRespawnPending[slotIdx] = false
            combat.enemies[slotIdx]         = spawnEnemy(state.currentArea)
            combat.enemyTimers[slotIdx]     = 0
            combat.enemyNextMoveIds[slotIdx] = pickNextEnemyMove(combat.enemies[slotIdx])
        } else {
            setTimeout(() => {
                combat.raidRespawnPending[slotIdx] = false
                if (!state.isRunning || !state.currentArea) return
                combat.enemies[slotIdx]         = spawnEnemy(state.currentArea)
                combat.enemyTimers[slotIdx]     = 0
                combat.enemyNextMoveIds[slotIdx] = pickNextEnemyMove(combat.enemies[slotIdx])
                updateCombatUI()
            }, 500)
        }
    } else {
        // Phase de drain : tous les ennemis ont été introduits, le slot reste vide
        if (_afkSeconds > 0) {
            combat.raidRespawnPending[slotIdx] = false
        } else {
            setTimeout(() => {
                combat.raidRespawnPending[slotIdx] = false
                if (!state.isRunning || !state.currentArea) return
                updateCombatUI()
            }, 500)
        }
    }

    } catch (e) {
        console.error('[onRaidEnemyDeath] erreur inattendue — slot débloqué de force', e)
        combat.raidRespawnPending[slotIdx] = false
        combat.enemies[slotIdx]          = spawnEnemy(state.currentArea)
        combat.enemyTimers[slotIdx]      = 0
        combat.enemyNextMoveIds[slotIdx] = combat.enemies[slotIdx] ? pickNextEnemyMove(combat.enemies[slotIdx]) : null
        updateCombatUI()
    }
}

// ─── Remplacement d'un membre mort (Raid) ────────────────────

function _autoSwitchRaidSlot(slotIdx) {
    if (!combat) return
    const memberIdx = combat.raidSlots[slotIdx]
    if (memberIdx === -1) return
    const member = state.team[memberIdx]
    if (member && member.currentHp > 0) return

    if (member) _explodeOwnedTraps(memberIdx, slotIdx)

    // Invocation alliée morte : restaurer le propriétaire
    if (member?.isSummon && member.ownerSlot !== undefined) {
        returnAllyToOwner(member.ownerSlot)
        if (state.team[memberIdx]?.currentHp > 0) return
    }

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
    if (state.team[idxA]?.duelLock || state.team[idxB]?.duelLock) {
        const _lockedName = (state.team[idxA]?.duelLock ? state.team[idxA] : state.team[idxB])
        addLog(`Duel → ${_lockedName.name || classes[_lockedName.classId]?.name || '?'} ne peut pas être échangé !`)
        combat.pendingRaidSwap = null
        updateCombatUI()
        return
    }
    const posA = combat.raidSlots.indexOf(idxA)
    const posB = combat.raidSlots.indexOf(idxB)

    if (posA !== -1 && posB !== -1) {
        // Les deux sont actifs → échange de slots, aucun ne quitte le combat actif
        combat.raidSlots[posA] = idxB
        combat.raidSlots[posB] = idxA
        combat.memberTimers[idxA] = 0
        combat.memberTimers[idxB] = 0
    } else if (posA !== -1) {
        // A actif, B banc → B entre dans le slot de A, A quitte la position active
        _explodeOwnedTraps(idxA, posA)
        combat.raidSlots[posA] = idxB
        combat.memberTimers[idxB] = 0
    } else if (posB !== -1) {
        // B actif, A banc → A entre dans le slot de B, B quitte la position active
        _explodeOwnedTraps(idxB, posB)
        combat.raidSlots[posB] = idxA
        combat.memberTimers[idxA] = 0
    }
    // Les deux au banc → aucun effet fonctionnel

    combat.pendingRaidSwap = null
    updateCombatUI()
}
