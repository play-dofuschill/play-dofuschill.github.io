// scripts/engine/Boss_UltimeCombat.js — Moteur de combat Boss_Ultime (dragons persistants)
//
// Mécanique :
//  - 1 tentative par jour par dragon (reset minuit). La défaite consomme la charge.
//  - Les PV du boss persistent entre les sessions.
//  - Tour : joueur choisit un membre → sélectionne 5 sorts dans l'ordre → résolution →
//    boss attaque tous les membres → tick suivant.
//  - DoTs/buffs tickent après chaque sort (membre ou boss).
//  - Transition de phase à 30 % HP, à la fin des 5 sorts du membre en cours.

// ─── État de session (non persisté) ──────────────────────────────────────────

let Boss_UltimeSession = null   // actif seulement pendant un combat

// ─── Helpers d'état persisté ─────────────────────────────────────────────────

function _Boss_UltimePersist() {
    if (!state.Boss_Ultime) state.Boss_Ultime = { team: [], memberDecks: {}, dragons: {} }
    return state.Boss_Ultime
}

function _Boss_UltimeDragonState(dragonId) {
    const st = _Boss_UltimePersist()
    if (!st.dragons[dragonId]) {
        const dragon = Boss_UltimeDragons[dragonId]
        st.dragons[dragonId] = {
            currentHp:      dragon?.phase1.bst.hp ?? 1000000,
            phase:          1,
            lastFightDate:  null,
            hasFoughtToday: false
        }
    }
    return st.dragons[dragonId]
}

// ─── Utilitaires ─────────────────────────────────────────────────────────────

function Boss_UltimeTodayStr() {
    return new Date().toISOString().slice(0, 10)
}

function Boss_UltimeCanFight(dragonId) {
    return true   // TODO : retirer pour la prod (limite 1 combat/jour désactivée pour les tests)
}

// Retourne tous les sorts débloqués d'un membre (startingMove + learnset ≤ level)
function Boss_UltimeUnlockedMoves(member) {
    const cls = classes[member.classId]
    if (!cls) return []
    const result = []
    if (cls.startingMove) result.push(cls.startingMove)
    for (const [lvl, id] of Object.entries(cls.learnset || {})) {
        if (parseInt(lvl) <= member.level && !result.includes(id)) result.push(id)
    }
    return result
}

// Valide si on peut ajouter spellId aux 5 slots (pas de restriction dupliquée)
function Boss_UltimeCanAddToSlot(spellId, alreadySelected) {
    const mv = move[spellId]
    if (!mv?.restriction) return true
    return !alreadySelected.some(id => {
        const m = move[id]
        return m?.restriction && m.restriction === mv.restriction
    })
}

// ─── Stats du boss ────────────────────────────────────────────────────────────

function _Boss_UltimeBossStats() {
    const s = Boss_UltimeSession
    const dragon = Boss_UltimeDragons[s.dragonId]
    const phase  = s.boss.phase === 2 ? dragon.phase2 : dragon.phase1
    const base   = { ...dragon.phase1.bst, ...phase.bst }

    const stats = {
        atk:            base.atk || 0,
        flatDamage:     0,
        finalDamagePct: 0,
        spellDamagePct: 0,
        critChance:     0,
        critDamagePct:  50,
        res:            { ...(base.res || {}) }
    }
    for (const b of (s.boss.buffs || [])) {
        if ((b.delay ?? 0) > 0) continue
        if (b.stat in stats) stats[b.stat] += b.value
    }
    return stats
}

// ─── Contexte d'exécution : swap temporaire de state.team + combat ────────────
// Permet à executeEffect() et ses sous-fonctions d'utiliser les membres Boss_Ultime
// comme cibles alliées, sans interférer avec l'auto-battler.

function _withBoss_UltimeCtx(fn) {
    const _savedTeam   = state.team
    const _savedCombat = combat
    // Référence directe (pas de filter) : les mutations de spawnSummon sur state.team[i]
    // modifient directement Boss_UltimeSession.members[i] et persistent après la sortie du contexte.
    state.team = Boss_UltimeSession.members

    const _engineLog = []
    combat = {
        log:                   _engineLog,
        isRaid:                false,
        isPoutch:              false,
        enemy:                 Boss_UltimeSession.boss,
        sessionLoot:           Boss_UltimeSession.sessionLoot,
        spellStacks:           Boss_UltimeSession.spellStacks,
        // Champs manquants qui causent des crashes ou des comportements cassés
        memberMoveIndex:       Boss_UltimeSession.memberMoveIndex,
        savedMembers:          Boss_UltimeSession.savedMembers,
        huppermageLastElement: Boss_UltimeSession.huppermageLastElement,
        critStreak:            Boss_UltimeSession.critStreak || 0,
    }
    try {
        return fn()
    } finally {
        Boss_UltimeSession.critStreak = combat.critStreak || 0
        state.team = _savedTeam
        combat     = _savedCombat
        // Flush dans l'ordre chronologique (le moteur unshift = plus récent en [0])
        for (let i = _engineLog.length - 1; i >= 0; i--) {
            Boss_UltimeSession.log.push(_engineLog[i])
            if (Boss_UltimeSession.log.length > 60) Boss_UltimeSession.log.shift()
        }
    }
}

// ─── Tick ─────────────────────────────────────────────────────────────────────
// Appelé après chaque sort (membre ou boss). Décrémente DoTs/HoTs/buffs de toutes
// les entités et gère les morts par DoT.

function _Boss_UltimeTickAll() {
    const s = Boss_UltimeSession

    // Boss
    _withBoss_UltimeCtx(() => {
        tickDots(s.boss, () => Boss_UltimeEndCombat('victory'))
        tickHots(s.boss)
        tickBuffs(s.boss)
    })

    // Membres
    for (const m of s.members) {
        if (!m) continue
        const _mName   = m.name || classes[m.classId]?.name || '?'
        const _mPreLen = s.log.length
        _withBoss_UltimeCtx(() => {
            tickDots(m, () => _Boss_UltimeHandleMemberDeath(m))
            tickHots(m)
            tickBuffs(m)
        })
        _Boss_UltimePrefixNewLog(_mPreLen, _mName)
    }

    if (typeof updateBoss_UltimeCombatUI === 'function') updateBoss_UltimeCombatUI()
}

function _Boss_UltimeHandleMemberDeath(member) {
    member.currentHp = 0
    const name = member.name || classes[member.classId]?.name || '?'
    _Boss_UltimeLog(`${name} est tombé au combat !`)
    if (Boss_UltimeSession.members.every(m => !m || m.currentHp <= 0)) {
        Boss_UltimeEndCombat('defeat')
    }
}

function _Boss_UltimeLog(msg) {
    if (!Boss_UltimeSession) return
    Boss_UltimeSession.log.push(msg)                          // chronologique : ancien→récent
    if (Boss_UltimeSession.log.length > 60) Boss_UltimeSession.log.shift()
}

// Préfixe toutes les nouvelles entrées de log (indices preLen..end) avec le nom du membre.
function _Boss_UltimePrefixNewLog(preLen, memberName) {
    const log = Boss_UltimeSession?.log
    if (!log) return
    for (let i = preLen; i < log.length; i++) log[i] = `[${memberName}] ${log[i]}`
}

// ─── Délais cosmétiques ───────────────────────────────────────────────────────

const STASIS_DELAY = { spell: 550, boss: 750 }

function _Boss_UltimeDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// ─── Exécution d'un sort membre ───────────────────────────────────────────────

// _summonDepth : 0 = sort normal, 1 = sort lancé par une invocation (pas de sous-tour récursif)
async function _Boss_UltimeCastSpell(member, spellId, _summonDepth) {
    const s  = Boss_UltimeSession
    const mv = move[spellId]
    if (!mv) return

    const effectiveLvl = member.level || 1
    const resolved     = applyProgression(mv, effectiveLvl)
    const memberStats  = getEffectiveStats(member) ?? member._stats ?? {}

    const memberName = member.name || classes[member.classId]?.name || '?'
    _Boss_UltimeLog(`${memberName} → ${resolved.name}`)
    if (typeof updateBoss_UltimeCombatUI === 'function') updateBoss_UltimeCombatUI()

    // Snapshot des slots d'invocation AVANT le sort (pour détecter les nouvelles)
    const prevSummonSlots = new Set(
        s.members.map((m, i) => (m?.isSummon ? i : -1)).filter(i => i >= 0)
    )

    let lastDmg = 0
    for (const effect of (resolved.effects || [])) {
        _withBoss_UltimeCtx(() => {
            const dmg = executeEffect({
                caster:      member,
                casterStats: memberStats,
                targetEnemy: s.boss,
                targetStats: null,
                effect,
                moveData:    resolved,
                moveId:      spellId,
                lastDamageDealt: lastDmg,
                onTargetKill: () => Boss_UltimeEndCombat('victory')
            })
            if (typeof dmg === 'number') lastDmg = dmg
        })
        if (s.ended) return
    }

    // Cooldown Boss_Ultime (mv.Boss_UltimeCooldown = N → bloqué pendant N tours)
    if (mv.Boss_UltimeCooldown > 0 && s.spellCooldowns) {
        s.spellCooldowns[spellId] = mv.Boss_UltimeCooldown
    }

    // Track dégâts infligés par ce membre
    const key = member.classId || 'unknown'
    s.sessionLoot.memberDamage[key] = (s.sessionLoot.memberDamage[key] || 0) +
        (s.boss._lastDmgReceived || 0)

    _Boss_UltimeTickAll()
    await _Boss_UltimeDelay(resolved.cooldownMs ?? BASE_TIME)

    // Tour immédiat des invocations nouvellement apparues (1 niveau max, pas de récursion)
    if (!_summonDepth) {
        for (let i = 0; i < s.members.length; i++) {
            const m = s.members[i]
            if (!m?.isSummon || prevSummonSlots.has(i)) continue
            if (s.ended) return
            await _Boss_UltimeCastSummonTurn(i, m)
        }
    }
}

// Tour automatique d'une invocation : lance tous ses sorts, puis disparaît
async function _Boss_UltimeCastSummonTurn(slotIdx, summon) {
    const s = Boss_UltimeSession
    _Boss_UltimeLog(`↪ ${summon.name || '?'} entre en jeu !`)
    if (typeof updateBoss_UltimeCombatUI === 'function') updateBoss_UltimeCombatUI()

    const summonMoveIds = Object.values(summon.moves || {}).filter(Boolean)
    for (const spellId of summonMoveIds) {
        if (s.ended) return
        // depth=1 : les sorts lancés par une invocation ne déclenchent pas de sous-invocations
        await _Boss_UltimeCastSpell(summon, spellId, 1)
    }

    // Retour à l'invocateur après tous les sorts
    _withBoss_UltimeCtx(() => {
        if (s.members[slotIdx]?.isSummon) returnAllyToOwner(slotIdx)
    })
    _Boss_UltimeLog(`↩ ${summon.name || '?'} a terminé son tour.`)
    if (typeof updateBoss_UltimeCombatUI === 'function') updateBoss_UltimeCombatUI()
}

// ─── Tour d'un membre (5 sorts) ───────────────────────────────────────────────

async function Boss_UltimeExecuteMemberTurn(memberIdx, spellIds) {
    const s = Boss_UltimeSession
    if (!s || s.ended) return
    if (spellIds.length !== 5) { _Boss_UltimeLog('Erreur : 5 sorts requis.'); return }

    const member = s.members[memberIdx]
    if (!member || member.currentHp <= 0) {
        _Boss_UltimeLog('Ce membre est KO !'); return
    }

    s.state = 'resolving'

    // Décrémente les cooldowns au début de la résolution du joueur
    for (const [id, val] of Object.entries(s.spellCooldowns || {})) {
        if (val <= 1) delete s.spellCooldowns[id]
        else          s.spellCooldowns[id] = val - 1
    }

    s.currentTurnSpells   = [...spellIds]
    s.currentTurnMemberIdx = memberIdx
    s.currentCastIdx      = -1
    if (typeof updateBoss_UltimeCombatUI === 'function') updateBoss_UltimeCombatUI()

    // Overlay de transition — tour du joueur
    if (typeof _Boss_UltimePlayTurnTransition === 'function') await _Boss_UltimePlayTurnTransition(s.halfTurns++, true)
    if (s.ended) return

    for (let _ci = 0; _ci < spellIds.length; _ci++) {
        if (s.ended) return
        s.currentCastIdx = _ci
        // Durée de la barre de remplissage = cooldownMs du sort résolu
        const _rawMv = move[spellIds[_ci]]
        const _resMv = _rawMv ? applyProgression(_rawMv, member.level || 1) : null
        s.currentCastDuration = _resMv?.cooldownMs ?? BASE_TIME
        if (typeof updateBoss_UltimeCombatUI === 'function') updateBoss_UltimeCombatUI()
        await _Boss_UltimeCastSpell(member, spellIds[_ci])
    }
    s.currentCastIdx    = -1
    s.currentTurnSpells = []
    if (s.ended) return

    // Vérification transition de phase (après les 5 sorts, avant l'attaque du boss)
    _Boss_UltimeCheckPhase()
    if (s.ended) return

    // Overlay de transition — tour du boss
    if (typeof _Boss_UltimePlayTurnTransition === 'function') await _Boss_UltimePlayTurnTransition(s.halfTurns++, false)
    if (s.ended) return

    // Attaque du boss
    await _Boss_UltimeBossAttack()
    if (s.ended) return

    s.bossAttackCycle++
    s.turn++
    s.state = 'select_member'
    if (typeof updateBoss_UltimeCombatUI === 'function') updateBoss_UltimeCombatUI()
}

// ─── Attaque du boss ──────────────────────────────────────────────────────────

async function _Boss_UltimeBossAttack() {
    const s      = Boss_UltimeSession
    const dragon = Boss_UltimeDragons[s.dragonId]
    const phase  = s.boss.phase === 2 ? dragon.phase2 : dragon.phase1
    const moveId = phase.moves[s.bossAttackCycle % 4]
    const mv     = Boss_UltimeMoves[moveId]
    if (!mv) return

    _Boss_UltimeLog(`${s.boss.name} utilise ${mv.name} !`)
    // Déclenche l'animation de remplissage de la barre boss
    s.bossCastingIdx  = s.bossAttackCycle % 4
    s.bossCastDuration = mv.cooldownMs ?? BASE_TIME
    if (typeof updateBoss_UltimeCombatUI === 'function') updateBoss_UltimeCombatUI()
    await _Boss_UltimeDelay(s.bossCastDuration)
    s.bossCastingIdx = -1

    const bossStats = _Boss_UltimeBossStats()

    for (const effect of (mv.effects || [])) {
        // Applique l'effet à chaque membre vivant
        for (const member of s.members) {
            if (!member || member.currentHp <= 0) continue
            const memberStats = getEffectiveStats(member) ?? member._stats ?? {}

            // Effets qui ciblent 'self' (le boss lui-même) : une seule fois
            if (effect.target === 'self') {
                _withBoss_UltimeCtx(() => {
                    executeEffect({
                        caster:      s.boss,
                        casterStats: bossStats,
                        targetEnemy: member,
                        targetStats: memberStats,
                        effect,
                        moveData:    mv,
                        moveId,
                        onTargetKill: () => _Boss_UltimeHandleMemberDeath(member)
                    })
                })
                break   // 'self' : une seule exécution suffit
            }

            const _bPreLen = s.log.length
            const _bName   = member.name || classes[member.classId]?.name || '?'
            _withBoss_UltimeCtx(() => {
                executeEffect({
                    caster:      s.boss,
                    casterStats: bossStats,
                    targetEnemy: member,
                    targetStats: memberStats,
                    effect,
                    moveData:    mv,
                    moveId,
                    onTargetKill: () => _Boss_UltimeHandleMemberDeath(member)
                })
            })
            _Boss_UltimePrefixNewLog(_bPreLen, _bName)

            if (s.ended) return
        }
        if (s.ended) return
    }

    _Boss_UltimeTickAll()

    // Vérification défaite globale
    if (!s.ended && s.members.every(m => !m || m.currentHp <= 0)) {
        Boss_UltimeEndCombat('defeat')
    }
}

// ─── Transition de phase ──────────────────────────────────────────────────────

function _Boss_UltimeCheckPhase() {
    const s      = Boss_UltimeSession
    const dragon = Boss_UltimeDragons[s.dragonId]
    if (s.boss.phase === 2) return
    const ratio = s.boss.currentHp / s.boss.maxHp
    if (ratio <= dragon.phase2Threshold) {
        s.boss.phase = 2
        s.boss.image = dragon.phase2.image
        _Boss_UltimeLog(`⚠ ${s.boss.name} entre en Phase 2 !`)
        if (typeof updateBoss_UltimeCombatUI === 'function') updateBoss_UltimeCombatUI()
    }
}

// ─── Fin de combat ────────────────────────────────────────────────────────────

function Boss_UltimeEndCombat(result) {
    const s = Boss_UltimeSession
    if (!s || s.ended) return
    s.ended = true
    s.state = result

    if (result === 'victory') {
        _Boss_UltimeOnVictory()
    } else if (result === 'defeat') {
        _Boss_UltimeOnDefeat()
    }
    // 'leave' : pas de sauvegarde, géré par Boss_UltimeLeaveCombat()
}

function _Boss_UltimeOnVictory() {
    const s      = Boss_UltimeSession
    const ds     = _Boss_UltimeDragonState(s.dragonId)
    const dragon = Boss_UltimeDragons[s.dragonId]

    // Récompense
    if (dragon.reward?.kamas) {
        state.kamas = (state.kamas || 0) + dragon.reward.kamas
        showNotification(`+${dragon.reward.kamas} kamas — ${s.boss.name} vaincu !`, 'success')
    }

    // Reset le dragon (nouveau dragon, PV max, phase 1)
    ds.currentHp      = dragon.phase1.bst.hp
    ds.phase          = 1
    ds.hasFoughtToday = false   // combat gratuit : charge NON consommée
    ds.lastFightDate  = Boss_UltimeTodayStr()

    saveGame()
    if (typeof renderBoss_UltimeVictory === 'function') renderBoss_UltimeVictory()
}

function _Boss_UltimeOnDefeat() {
    const s  = Boss_UltimeSession
    const ds = _Boss_UltimeDragonState(s.dragonId)

    // Persistance des PV du boss
    ds.currentHp      = Math.max(0, s.boss.currentHp)
    ds.phase          = s.boss.phase
    ds.hasFoughtToday = true
    ds.lastFightDate  = Boss_UltimeTodayStr()

    saveGame()
    if (typeof renderBoss_UltimeDefeat === 'function') renderBoss_UltimeDefeat()
}

// Quitter sans combattre (ou mid-combat sans mourir) → aucune sauvegarde
function Boss_UltimeLeaveCombat() {
    if (!Boss_UltimeSession) return
    Boss_UltimeSession = null
    if (typeof renderBoss_UltimeSelect === 'function') renderBoss_UltimeSelect()
}

// ─── Démarrage du combat ──────────────────────────────────────────────────────

function Boss_UltimeStartCombat(dragonId) {
    if (!Boss_UltimeCanFight(dragonId)) {
        showNotification('Vous avez déjà affronté ce dragon aujourd\'hui.', 'error')
        return
    }

    const dragon = Boss_UltimeDragons[dragonId]
    if (!dragon) return

    const ds      = _Boss_UltimeDragonState(dragonId)
    const persist = _Boss_UltimePersist()

    // Clone les membres Boss_Ultime avec HP calculé
    const members = (persist.team || []).filter(Boolean).slice(0, 3).map(m => {
        const clone  = JSON.parse(JSON.stringify(m))
        const stats  = getEffectiveStats(clone)
        clone.maxHp  = stats?.hp ?? clone.maxHp ?? 100
        clone.currentHp = clone.maxHp
        clone.buffs  = []
        clone.dots   = []
        clone.hots   = []
        clone.shield = null
        return clone
    })

    if (!members.length) {
        showNotification('Configurez au moins un membre dans l\'équipe Boss_Ultime.', 'error')
        return
    }

    // Instance boss
    const phase    = ds.phase === 2 ? dragon.phase2 : dragon.phase1
    const bstBase  = { ...dragon.phase1.bst, ...(ds.phase === 2 ? dragon.phase2.bst : {}) }
    const boss = {
        id:        dragonId,
        name:      dragon.name,
        image:     phase.image,
        phase:     ds.phase,
        maxHp:     dragon.phase1.bst.hp,
        currentHp: ds.currentHp,
        atk:       bstBase.atk,
        res:       { ...bstBase.res },
        buffs:     [],
        dots:      [],
        hots:      [],
        shield:    null
    }

    Boss_UltimeSession = {
        dragonId,
        boss,
        members,
        bossAttackCycle:    0,
        turn:               0,
        halfTurns:          0,
        state:              'select_member',
        ended:              false,
        log:                [],
        spellStacks:        {},
        spellCooldowns:     {},  // spellId → tours restants avant réutilisation
        memberMoveIndex:       {},   // requis par spawnSummon / returnAllyToOwner
        savedMembers:          {},   // requis par spawnSummon / returnAllyToOwner
        huppermageLastElement: {},   // requis par les combos Huppermage
        critStreak:            0,    // streak de critiques
        currentTurnSpells:    [],  // les 5 sorts du tour en cours
        currentCastIdx:       -1,  // index du sort en cours dans currentTurnSpells
        currentCastDuration:  0,   // cooldownMs du sort en cours (pour l'animation)
        currentTurnMemberIdx: -1,
        bossCastingIdx:       -1,  // index du sort boss en cours (-1 = pas en train de caster)
        bossCastDuration:     0,   // cooldownMs du sort boss (pour l'animation)
        sessionLoot: {
            memberDamage:         {},
            memberDamageReceived: {}
        }
    }

    if (typeof renderBoss_UltimeCombat === 'function') renderBoss_UltimeCombat()
}

// ─── Getters pour l'UI ────────────────────────────────────────────────────────

function Boss_UltimeGetSession()  { return Boss_UltimeSession }
function Boss_UltimeGetPersist()  { return _Boss_UltimePersist() }

function Boss_UltimeGetDragonInfo(dragonId) {
    const dragon = Boss_UltimeDragons[dragonId]
    if (!dragon) return null
    const ds = _Boss_UltimeDragonState(dragonId)
    return {
        dragon,
        currentHp:     ds.currentHp,
        maxHp:         dragon.phase1.bst.hp,
        phase:         ds.phase,
        canFight:      Boss_UltimeCanFight(dragonId),
        hpPct:         Math.round((ds.currentHp / dragon.phase1.bst.hp) * 100)
    }
}

// Sauvegarder la compo + decks Boss_Ultime
function Boss_UltimeSaveTeamConfig() {
    saveGame()
}
