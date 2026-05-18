// engine/combat.js — Boucle de combat auto-battler DofusChill
//
// Chaque membre + l'ennemi a une barre de progression (0–100).
// La barre avance proportionnellement à la vitesse de lancé du sort
// À 100%, l'entité exécute son action et la barre se remet à 0.

const TICK_MS    = 1000 / 60   // 60 fps
const BASE_TIME  = 2000        // ms pour remplir la barre


let combatLoop      = null
let combat          = null  // état du combat en cours
let _autoPilot      = null  // { remaining: N, accumulated: sessionLoot } | null
let _dungeonAutoRun = null  // { accumulated: sessionLoot } | null — relance auto donjon

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

    return Math.floor(baseXP * rarityMult * tierMult * levelPenalty)
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

    // Sélection pondérée
    const total = area.spawns.reduce((s, sp) => s + sp.weight, 0)
    let roll    = Math.random() * total
    let spawnId = area.spawns[area.spawns.length - 1].id
    for (const sp of area.spawns) {
        roll -= sp.weight
        if (roll <= 0) { spawnId = sp.id; break }
    }

    

    const mobLevel = randomInt(area.mobMinLevel, area.mobMaxLevel)
    const mob   = monsters[spawnId]
    const scale = 1 + (mobLevel - area.mobMinLevel) * 0.05


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
        bonusAtkPct: 0,
        flatBonus:   0,
        moves:     mob.moves || [],
        moveIndex: 0,
        rarity:    mob.rarity   || 'commun',
        tier:      mob.tier     || 'normal',
        dropRate:  mob.dropRate
    }

    // 1/400 chance d'archimonstre (archiboss pour les boss) : stats ×2, capture garantie
    if (Math.random() < 1 / 400) {
        enemy.isArchi   = true
        enemy.maxHp     = Math.floor(enemy.maxHp * 2)
        enemy.currentHp = enemy.maxHp
        enemy.atk       = Math.floor(enemy.atk   * 2)
        enemy.name      = `Archi-${enemy.name}`
    }

    return enemy
}

// ─── Démarrage / arrêt ────────────────────────────────────────────────────────

function startCombat(areaId) {
    stopCombat()
    state.currentArea     = areaId
    state.isRunning       = true
    state.combatStartTime = Date.now()

    // Donjon + relance auto : initialise l'accumulateur si pas déjà actif
    if (areas[areaId]?.type === 'dungeon' && state.dungeonAutoRestart) {
        if (!_dungeonAutoRun) _dungeonAutoRun = { accumulated: _emptySessionLoot() }
    } else if (areas[areaId]?.type !== 'dungeon') {
        _dungeonAutoRun = null
    }

    // Réinitialise les HP de l'équipe
    for (const m of state.team) {
        if (!m) continue
        const stats = getEffectiveStats(m)
        if (stats) { m.maxHp = stats.hp; m.currentHp = stats.hp }
        m.buffs  = []
        m.dots   = []
        m.shield = null
    }

    combat = {
        memberTimers: state.team.map(() => 0),
        memberMoveIndex: state.team.map(() => 0),
        activeMemberIndex: 0,
        enemyTimer: 0,
        log: [],
        pendingLoot: null,
        savedEnemy: null,
        memberKillCount:    {},
        memberPassiveState: {},
        memberDeathHandled: {},
        sessionLoot: { itemDrops: [], familiarDrops: [], caisseCount: 0, keyDrops: {}, kamasFromDrops: 0, killCount: 0, memberDamage: {}, memberDamageReceived: {}, learnedMoves: [] }
    }

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

    combat.enemy = spawnEnemy(areaId)
    combat.enemyNextMoveId = pickNextEnemyMove(combat.enemy)

    document.getElementById('content-explore').style.display = 'flex'
    document.getElementById('area-end').style.display    = 'none'
    const exploreTeam  = document.getElementById('explore-team')
    const exploreLeave = document.getElementById('explore-leave')
    const enemyDisplay = document.getElementById('enemy-display')
    if (exploreTeam)  exploreTeam.style.display  = ''
    if (exploreLeave) exploreLeave.style.display = ''
    if (enemyDisplay) enemyDisplay.style.display = ''
    const menuParent = document.getElementById('menu-button-parent')
    if (menuParent) menuParent.style.display = ''
    updateCombatUI()

    combatLoop = setInterval(gameTick, TICK_MS)
}

function stopCombat() {
    if (combatLoop) { clearInterval(combatLoop); combatLoop = null }
    state.isRunning       = false
    state.combatStartTime = null
}

function exitCombat() {
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
    const menuParent = document.getElementById('menu-button-parent')
    if (menuParent) menuParent.style.display = state.hasChosenStarter ? '' : 'none'
    saveGame()
    if (typeof updateCollectionUI === 'function') updateCollectionUI()
}

function leaveCombat() {
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
    startCombat(state.currentArea)
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
    state.currentArea     = null
    state.isRunning       = true
    state.combatStartTime = Date.now()
    _dungeonAutoRun       = null
    _autoPilot            = null

    for (const m of state.team) {
        if (!m) continue
        const stats = getEffectiveStats(m)
        if (stats) { m.maxHp = stats.hp; m.currentHp = stats.hp }
        m.buffs  = []
        m.dots   = []
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
        bonusAtkPct: 0,
        flatBonus:   0,
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

    combatLoop = setInterval(gameTick, TICK_MS)
}

function onPoutchEnd() {
    if (combat?.respawnPending) return
    if (combat) combat.respawnPending = true
    stopCombat()
    showPoutchSummary('end')
}

// ─── Tick principal ───────────────────────────────────────────────────────────

function gameTick() {
    if (!combat || !combat.enemy) return
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
        const rate  = (100 / (BASE_TIME / TICK_MS)) * ((stats.spd || 100) / 100)
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

    updateCombatUI()
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

    const stats = getEffectiveStats(member)

    const slots = ['slot1', 'slot2', 'slot3', 'slot4']
    const nonNull = slots.filter(s => member.moves[s])

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
    const mv = applyProgression(rawMv, member.level)

    if (!mv?.effects) return

    const rawPrevMv = move[member.moves[nonNull[prevNonNullIdx]]]
    const prevMv    = rawPrevMv ? applyProgression(rawPrevMv, member.level) : null

    // exécution des effets
    let lastDamageDealt = 0
    let sessionDmg = 0
    for (const effect of mv.effects) {
        const dmg = executeEffect({
            caster: member, casterStats: stats, targetEnemy: combat.enemy,
            effect, moveData: mv, prevMv, lastDamageDealt,
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

    // Décompte des tours en mode Poutch limité
    if (combat.isPoutch && typeof combat.poutchMode === 'number' && !combat.respawnPending) {
        combat.poutchTurns = (combat.poutchTurns || 0) + 1
        if (combat.poutchTurns >= combat.poutchMode) {
            onPoutchEnd()
            return
        }
    }

    tickBuffs(member)

    // ─── Passifs déclenchés après l'action ───────────────────────────────────
    const newRawIdx   = combat.memberMoveIndex[memberIndex]  // après incrément
    const cycleLength = isXelor ? 7 : nonNull.length
    _applyPassiveTick(member, memberIndex, newRawIdx, cycleLength)
}

// ─── Passifs déclenchés par tick / cycle ─────────────────────────────────────

function _applyPassiveTick(member, memberIndex, newRawIdx, cycleLength) {
    const passive = classes[member.classId]?.passive
    if (!passive) return

    // ─── Périodiques (toutes les N actions) ──────────────────────────────────

    // Eniripsa : tous les 6 sorts, soigne un membre vivant aléatoire de 20% PV max
    if (passive.id === 'eniripsa' && newRawIdx % 6 === 0) {
        const living = state.team.filter(m => m && m.currentHp > 0)
        if (living.length) {
            const target  = living[Math.floor(Math.random() * living.length)]
            const healAmt = Math.floor((target.maxHp || 0) * 0.20)
            target.currentHp = Math.min(target.maxHp, target.currentHp + healAmt)
            addLog(`Eniripsa [Passif] → soigne ${target.name} de ${healAmt} PV`)
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
    if (passive.id === 'sadida' && newRawIdx % 4 === 0 && combat.enemy?.currentHp > 0) {
        combat.enemy.buffs = combat.enemy.buffs || []
        combat.enemy.buffs.push({ stat: 'spd', value: -20, duration: 2 })
        addLog(`Sadida [Passif] → ${combat.enemy.name} ralenti de 20% (2 tours)`)
    }

    // ─── Fin de cycle ─────────────────────────────────────────────────────────

    if (newRawIdx % cycleLength !== 0) return

    // Pandawa : transition d'état à chaque cycle de sorts
    if (passive.id === 'pandawa') {
        const pst = combat.memberPassiveState[memberIndex] || {}
        if (pst.state === 'normal') {
            pst.state = 'ivresse'
            addLog(`${member.name} [Passif] → Ivresse ! (-20% vit, +20% dmg, +10% res all)`)
        } else if (pst.state === 'ivresse') {
            pst.state = 'gueule_de_bois'
            addLog(`${member.name} [Passif] → Gueule de bois... (-20% dmg, -10% res all)`)
        } else {
            pst.state = 'normal'
            addLog(`${member.name} [Passif] → Retrouve ses esprits.`)
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
        addLog(`${member.name} [Roulette] → ${rolled.label} jusqu'au prochain cycle !`)
    }
}

function _resolveEffectValue(v) {
    if (v !== null && typeof v === 'object' && 'min' in v && 'max' in v)
        return Math.floor(Math.random() * (v.max - v.min + 1)) + v.min
    return v
}

function executeEffect(ctx) {

    const {caster, casterStats, targetEnemy, effect, moveData} = ctx

    switch (effect.type) {

        case 'damage': {
            // Défense effective : stats passées (attaque sur joueur) ou buffs actifs (attaque sur ennemi)
            const defStats = ctx.targetStats || {
                res: targetEnemy.res || {},
                damageReductionPct: (targetEnemy.buffs || [])
                    .filter(b => b.stat === 'damageReductionPct')
                    .reduce((sum, b) => sum + b.value, 0)
            }
            const result = calcDamage(casterStats, defStats, effect)
            let dmg = result.damage

            // Le bouclier absorbe en priorité avant les HP
            if (targetEnemy.shield?.value > 0) {
                const absorbed = Math.min(targetEnemy.shield.value, dmg)
                targetEnemy.shield.value -= absorbed
                dmg -= absorbed
                if (targetEnemy.shield.value <= 0) targetEnemy.shield = null
            }

            // Renvoi : la cible renvoie les dégâts à l'attaquant
            if (targetEnemy.renvoi && dmg > 0) {
                const reflectedDmg = Math.max(1, Math.floor(dmg * targetEnemy.renvoi.ratio))
                delete targetEnemy.renvoi
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

            targetEnemy.currentHp = Math.max(0, targetEnemy.currentHp - dmg)

            // Érosion : réduit le maxHp de la cible (taux de base 5%, modifiable par effect.erosionRate
            // ou par un buff 'erosionBonus' sur le lanceur)
            if (dmg > 0) {
                const baseRate = effect.erosionRate !== undefined ? effect.erosionRate : 0.05
                const bonus = (caster.buffs || [])
                    .filter(b => b.stat === 'erosionBonus')
                    .reduce((sum, b) => sum + b.value, 0)
                const erosion = Math.floor(dmg * Math.max(0, baseRate + bonus))
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
            if (targetEnemy.currentHp <= 0) {
                if (combat?.isPoutch && targetEnemy === combat.enemy) {
                    targetEnemy.currentHp = targetEnemy.maxHp
                    combat.sessionLoot.killCount++
                    addLog(`Le Poutch reprend des forces !`)
                } else {
                    ctx.onTargetKill?.()
                }
            }
            return dmg
        }

        case 'dot': {
            targetEnemy.dots = targetEnemy.dots || []
            targetEnemy.dots.push({ element: effect.element, value: effect.value, duration: effect.duration })
            addLog(`${ctx.logPrefix || ''}${moveData.name} → brûlure ${effect.value}/tour (${effect.duration} tours)`)
            break
        }

        case 'heal': {
            const healAmt = effect.heal || 0
            caster.currentHp = Math.min(caster.maxHp, (caster.currentHp || 0) + healAmt)
            addLog(`${moveData.name} → soigne ${healAmt} PV`)
            break
        }

        case 'heal%maxHp': {
            const healAmt = Math.floor((caster.maxHp || 0) * ((effect.heal || 0) / 100))
            caster.currentHp = Math.min(caster.maxHp, (caster.currentHp || 0) + healAmt)
            addLog(`${moveData.name} → soigne ${healAmt} PV (${effect.heal}% PV max)`)
            break
        }

        case 'heal_team': {
            const healAmt = effect.heal || 0
            for (const m of state.team) {
                if (!m || m.currentHp <= 0) continue
                m.currentHp = Math.min(m.maxHp, (m.currentHp || 0) + healAmt)
            }
            addLog(`${moveData.name} → soigne ${healAmt} PV (équipe)`)
            break
        }

        case 'buff': {
            caster.buffs = caster.buffs || []
            const buffVal = _resolveEffectValue(effect.value)
            caster.buffs.push({ stat: effect.stat, value: buffVal, duration: effect.duration })
            addLog(`${moveData.name} → +${buffVal} ${effect.stat} (${effect.duration} tours)`)
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
            // Applique un buff négatif à la cible
            const debuffVal = _resolveEffectValue(effect.value)
            targetEnemy.buffs = targetEnemy.buffs || []
            targetEnemy.buffs.push({ stat: effect.stat, value: -debuffVal, duration: effect.duration })
            addLog(`${ctx.logPrefix || ''}${moveData.name} → -${debuffVal} ${effect.stat} (${effect.duration} tours)`)
            break
        }

        case 'shield': {
            // N'applique pas si un bouclier est déjà actif (mais les autres effets du sort passent quand même)
            if (caster.shield?.value > 0) break
            caster.shield = { value: effect.value, duration: effect.duration }
            addLog(`${moveData.name} → bouclier ${effect.value} PV (${effect.duration} tours)`)
            break
        }

        case 'lifesteal': {
            const healAmt = Math.floor((ctx.lastDamageDealt || 0) * (effect.ratio || 0))
            if (healAmt > 0) {
                caster.currentHp = Math.min(caster.maxHp, (caster.currentHp || 0) + healAmt)
                addLog(`${moveData.name} → soigne ${healAmt} PV`)
            }
            break
        }

        case 'renvoi': {
            caster.renvoi = { ratio: effect.ratio }
            addLog(`${moveData.name} → renvoi ${Math.round(effect.ratio * 100)}% actif`)
            break
        }

        case 'switch': {
            // Liste des indices d'équipe encore en vie
            const living = []
            for (let i = 0; i < state.team.length; i++) {
                const m = state.team[i]
                if (m && m.currentHp > 0) living.push(i)
            }
            // Besoin d'au moins 2 membres vivants
            if (living.length <= 1) break
            const curPos = living.indexOf(combat.activeMemberIndex)
            // Si pas assez de membres pour avancer de value, aller au dernier disponible
            const targetPos = Math.min(curPos + (effect.value || 1), living.length - 1)
            // Aucun suivant (membre actif est déjà le dernier vivant)
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
            targetEnemy.dots = targetEnemy.dots || []
            targetEnemy.dots.push({
                label:    'Tourelle',
                element:  effect.element  || 'neutre',
                value:    effect.value,
                duration: effect.duration || 3
            })
            addLog(`${moveData.name} → Tourelle déployée ! ${effect.value} dégâts/${effect.element || 'neutre'} × ${effect.duration || 3} tours`)
            break
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

// ─── Invocations ─────────────────────────────────────────────────────────────

function spawnSummon(caster, effect) {
    const mob = monsters[effect.summonId]
    if (!mob) return
    const level    = caster.level || 1
    const scale    = 1 + ((level - 1) * 0.08)
    // Osamodas : invocations avec 2× PV et ATK
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
        res:              { ...mob.bst.res },
        bonusAtkPct:      0,
        flatBonus:        0,
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
    addLog(`${caster.name} invoque ${mob.name} !`)
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
                setTimeout(() => startCombat(doneArea), 800)
                return
            }
            combat.sessionLoot = _dungeonAutoRun.accumulated
            _dungeonAutoRun = null
        }
        showSessionSummary('dungeon')
        return
    }

    // Respawn ennemi (zone normale) — garanti même si le bloc loot a throw
    setTimeout(() => {
        combat.respawnPending = false
        if (!state.isRunning || !state.currentArea) return
        for (const m of state.team) {
            if (!m) continue
            m.buffs  = []
            m.dots   = []
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
    if (combat?.isPoutch) {
        stopCombat()
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
        saveGame()
        if (_autoPilot.remaining > 0 && (state.inventory['piloteAutomatique']?.count || 0) > 0) {
            setTimeout(() => rejoinArea(), 800)
            return
        }
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

function tickBuffs(entity) {
    if (entity.buffs) {
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

    // Passif Roublard : explosion à la mort (une seule fois par membre)
    if (cur && !combat.memberDeathHandled?.[curIdx]) {
        combat.memberDeathHandled[curIdx] = true
        if (classes[cur.classId]?.passive?.id === 'roublard' && combat.enemy?.currentHp > 0) {
            const dmg = Math.floor((cur.maxHp || 0) * 0.30)
            combat.enemy.currentHp = Math.max(0, combat.enemy.currentHp - dmg)
            addLog(`${cur.name} [Passif] → Mort Explosive ! ${dmg} dégâts à ${combat.enemy.name} !`)
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
