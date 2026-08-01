// engine/autoTeam.js — Auto-sélection du kit de sorts actifs (dégâts + survie) selon la cible courante
//
// Contrairement à l'auto-équipement (objets), les sorts d'un personnage sont figés par sa
// classe (classes[classId].learnset) : on ne compose pas un "kit" cross-classe, on choisit
// simplement, parmi les sorts déjà appris, les 4 meilleurs à mettre en slots actifs face à
// une cible donnée (résistances élémentaires du boss/de la zone en préparation).
//
// Heuristique (comme engine/autoEquip.js) : les formules de dégâts/soin/dot/bouclier
// répliquent celles de combat.js, mais en valeur moyenne (pas de random) pour un score stable.
//
// Ce fichier ne contient que la logique (aucun DOM). L'UI est dans ui/autoTeam.js.

const AUTO_TEAM_UTILITY_SCORE   = 0.15  // petit bonus pour les sorts sans dégâts/survie mesurables (buff, invocation...)
const AUTO_TEAM_MOVE_SLOTS      = ['slot1', 'slot2', 'slot3', 'slot4']
const AUTO_TEAM_DEFAULT_PROFILE = 3

// Curseur "glass cannon" (1) → "safe" (5) : pondère le score de survie (soin/bouclier/vol de vie)
// et le plancher de sorts offensifs obligatoires parmi les 4 slots.
const AUTO_TEAM_PROFILES = {
    1: { label: 'Glass cannon', sustainWeight: 0.4, minOffensive: 3 },
    2: { label: 'Offensif',     sustainWeight: 0.8, minOffensive: 3 },
    3: { label: 'Équilibré',    sustainWeight: 1.5, minOffensive: 2 },
    4: { label: 'Prudent',      sustainWeight: 2.5, minOffensive: 2 },
    5: { label: 'Sécurisé',     sustainWeight: 4.0, minOffensive: 1 },
}

const AUTO_TEAM_NEUTRAL_RES = { neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 }
const AUTO_TEAM_ELEM_STAT_MAP = { terre: 'force', feu: 'intelligence', eau: 'chance', air: 'agilite' }

// Hypothèse utilisée pour chiffrer la valeur des buffs/debuffs défensifs (réduction de dégâts,
// debuff atk/spd ennemi) : faute de connaître précisément le rythme d'attaque de la cible, on
// estime qu'un "coup" ennemi moyen retire ~8% des PV max du perso — juste assez pour comparer
// équitablement un sort défensif à un sort de soin/bouclier équivalent, pas une simulation exacte.
const AUTO_TEAM_ASSUMED_INCOMING_HIT_PCT = 8

function getAutoTeamProfileLevel() {
    const lvl = Math.round(state.autoTeamProfile ?? AUTO_TEAM_DEFAULT_PROFILE)
    return Math.min(5, Math.max(1, lvl))
}

function setAutoTeamProfileLevel(level) {
    state.autoTeamProfile = Math.min(5, Math.max(1, Math.round(level)))
    saveGame()
    return state.autoTeamProfile
}

function _autoTeamProfile(profileLevel) {
    return AUTO_TEAM_PROFILES[profileLevel] || AUTO_TEAM_PROFILES[AUTO_TEAM_DEFAULT_PROFILE]
}

// ─── Résolution de la cible (résistances + atk/spd, pour valoriser les debuffs) ────────────

function _autoTeamNeutralTarget() { return { res: { ...AUTO_TEAM_NEUTRAL_RES }, atk: 100, spd: 100 } }

function _autoTeamTargetFromBst(bst) {
    if (!bst) return _autoTeamNeutralTarget()
    return { res: { ...AUTO_TEAM_NEUTRAL_RES, ...(bst.res || {}) }, atk: bst.atk || 100, spd: bst.spd || 100 }
}

// target = { res: {neutre,terre,feu,eau,air}, atk, spd } — atk/spd sont des moyennes pondérées
// (comme les résistances), utilisées pour chiffrer la valeur des debuffs enemy atk/spd.
function resolveAutoTeamTarget() {
    if (!_pendingAreaId) return _autoTeamNeutralTarget()

    if (_pendingAreaId.startsWith('_wanted_')) {
        const wantedId = _pendingAreaId.slice('_wanted_'.length)
        const wd = typeof WantedBosses !== 'undefined' ? WantedBosses[wantedId] : null
        return _autoTeamTargetFromBst(wd?.bst)
    }

    if (_pendingAreaId.startsWith('_bossultime_')) {
        const dragonId = _pendingAreaId.slice('_bossultime_'.length)
        const bd = typeof BossUltimeDragons !== 'undefined' ? BossUltimeDragons[dragonId] : null
        return _autoTeamTargetFromBst(bd?.bst)
    }

    const area = areas[_pendingAreaId]
    if (!area?.spawns?.length) return _autoTeamNeutralTarget()

    const res = { ...AUTO_TEAM_NEUTRAL_RES }
    let atk = 0, spd = 0, totalWeight = 0
    for (const sp of area.spawns) {
        const mob = monsters[sp.id]
        if (!mob?.bst) continue
        const w = sp.weight || 1
        totalWeight += w
        for (const elem in res) res[elem] += (mob.bst.res?.[elem] || 0) * w
        atk += (mob.bst.atk || 0) * w
        spd += (mob.bst.spd || 100) * w
    }
    if (totalWeight <= 0) return _autoTeamNeutralTarget()
    for (const elem in res) res[elem] /= totalWeight
    return { res, atk: atk / totalWeight, spd: spd / totalWeight }
}

// ─── Niveau de puissance (stats + scaling des sorts, jamais l'éligibilité) ─
// Même plafond que la fiche perso / l'auto-équipement / combat.js:1051 : un perso surlevé
// modulé pour une zone plus faible y est aussi FORT que le niveau de la zone, mais garde
// accès à tous les sorts appris à son niveau réel (cf. le filtre d'éligibilité plus bas).

function _autoTeamEffectiveLevel(member) {
    let cap = member.level || 1
    if (typeof combat !== 'undefined' && combat?.syncedLevel) return Math.min(cap, combat.syncedLevel)
    if (_pendingAreaId) {
        const area = areas[_pendingAreaId]
        if (area?.maxLevel && (state.skullLevel > 0 || area.type === 'wanted')) cap = Math.min(cap, area.maxLevel)
    }
    return cap
}

// ─── Valeur moyenne d'un champ fixe ou {min,max} ───────────────────────────

function _autoTeamAvg(v) {
    if (v !== null && typeof v === 'object' && 'min' in v && 'max' in v) return (v.min + v.max) / 2
    return v || 0
}

function _autoTeamResolveElements(effect) {
    if (Array.isArray(effect.elements) && effect.elements.length) return effect.elements
    return [effect.element || 'neutre']
}

// ─── Dégâts espérés (réplique calcDamage de stats.js, en valeur moyenne) ───

function _autoTeamExpectedDamage(effect, attackerStats, target, elem) {
    let baseRoll, hpBased = false
    if (effect.damageHpPct) {
        baseRoll = (attackerStats.hp || 0) * (effect.damageHpPct.pct || 0) / 100
        hpBased  = true
    } else {
        baseRoll = _autoTeamAvg(effect.damage)
    }

    const critChance    = Math.min(100, Math.max(0, attackerStats.critChance || 0))
    const critDamagePct = attackerStats.critDamagePct || 50
    const expEffectiveBase = baseRoll * (1 + (critChance / 100) * (critDamagePct / 100))

    const elemBonus = AUTO_TEAM_ELEM_STAT_MAP[elem] ? (attackerStats[AUTO_TEAM_ELEM_STAT_MAP[elem]] || 0) : 0
    const atkPower  = (attackerStats.atk || 0) + elemBonus

    let damage = hpBased ? expEffectiveBase : expEffectiveBase * (1 + atkPower / 100)
    if (!hpBased) damage += (attackerStats.flatDamage || 0)
    damage *= (1 + (attackerStats.finalDamagePct || 0) / 100)
    damage *= (1 + (attackerStats.spellDamagePct  || 0) / 100)
    damage *= (1 - (target.res[elem] || 0) / 100)

    return Math.max(0, damage)
}

function _autoTeamDamageEffectValue(effect, attackerStats, target) {
    const elems = _autoTeamResolveElements(effect)
    let workingEffect = effect
    if (effect.stackedDamage?.length) {
        const avgTier = effect.stackedDamage.reduce((s, t) => s + (t.min + t.max) / 2, 0) / effect.stackedDamage.length
        workingEffect = { ...effect, damage: { min: avgTier, max: avgTier } }
    }
    let value = elems.reduce((sum, elem) => sum + _autoTeamExpectedDamage(workingEffect, attackerStats, target, elem), 0) / elems.length
    if (effect.scalingMultipliers?.length) {
        const avgMult = effect.scalingMultipliers.reduce((a, b) => a + b, 0) / effect.scalingMultipliers.length
        value *= avgMult
    }
    return value
}

// ─── DOT — pas de résistance ni de réduction (cf. combat.js tickDots) ──────

function _autoTeamDotValue(effect, attackerStats) {
    const base    = _autoTeamAvg(effect.value)
    const perTick = Math.max(0, base * (1 + (attackerStats.atk || 0) / 100) + (attackerStats.flatDamage || 0))
    return perTick * (effect.duration || 1)
}

// ─── Soin / soin continu / bouclier / vol de vie ───────────────────────────

function _autoTeamHealValue(effect, attackerStats) {
    const roll = _autoTeamAvg(effect.heal)
    return Math.max(0, (roll * (1 + (attackerStats.atk || 0) * 0.10 / 100) + (attackerStats.healStat || 0)) * (1 + (attackerStats.healPct || 0) / 100))
}

function _autoTeamHealMaxHpPctValue(effect, attackerStats) {
    const pct = _autoTeamAvg(effect.heal)
    return Math.max(0, (attackerStats.hp || 0) * pct / 100 * (1 + (attackerStats.healMaxHpPct || 0) / 100))
}

function _autoTeamHotValue(effect, attackerStats) {
    if (effect.pctMaxHp !== undefined) return Math.max(0, (attackerStats.hp || 0) * effect.pctMaxHp / 100 * (effect.duration || 1))
    const roll     = _autoTeamAvg(effect.heal)
    const perTick  = Math.max(0, (roll * (1 + (attackerStats.atk || 0) * 0.30 / 100) + (attackerStats.healStat || 0)) * (1 + (attackerStats.healPct || 0) / 100))
    return perTick * (effect.duration || 1)
}

function _autoTeamShieldValue(effect, member, attackerStats) {
    if (effect.maxHpPct) return Math.max(0, (attackerStats.hp || member.maxHp || 0) * effect.maxHpPct / 100)
    if (effect.levelPct) return Math.max(0, (member.level || 1) * effect.levelPct)
    return Math.max(0, effect.value || 0)
}

// ─── Valeur d'un buff/debuff, ramenée dans les mêmes unités que dégâts/soin ────
//
// Principe : un buff/debuff ne vaut rien en soi, il amplifie (ou évite) d'AUTRES dégâts.
// On le convertit donc en un multiple d'une valeur de référence :
//   - referenceOffenseHit : le meilleur dégât "brut" (par cast) déjà trouvé dans le kit du
//     perso (cf. pass 1 dans computeAutoKit) — sert de proxy pour "un coup que ce buff amplifie".
//   - referenceIncomingHit : PV max du perso × AUTO_TEAM_ASSUMED_INCOMING_HIT_PCT — proxy pour
//     "un coup ennemi moyen", faute de connaître le rythme d'attaque réel de la cible.
// `target.atk`/`target.spd` (moyenne pondérée de la zone/du boss) servent à chiffrer combien un
// debuff atk/spd sur l'ennemi réduit réellement sa sortie de dégâts (même forme que le calcul
// de dégâts : réduire l'ATK d'un point vaut proportionnellement moins si l'ATK de base est déjà élevé).
// Retourne null si le stat n'est pas modélisé (le sort retombe alors sur le petit bonus utilitaire).

function _autoTeamBuffDebuffValue(effect, attackerStats, target, referenceOffenseHit, referenceIncomingHit) {
    const value    = effect.value || 0
    const duration = effect.duration || 1
    const isEnemyTarget = effect.target === 'enemy' || effect.target === 'all_enemy' || effect.target === 'all_enemies'

    if (effect.type === 'buff' && !isEnemyTarget) {
        switch (effect.stat) {
            case 'atk': {
                const ratio = value / (100 + (attackerStats.atk || 0))
                return { offense: referenceOffenseHit * ratio * duration, sustain: 0 }
            }
            case 'flatDamage': {
                const perHit = value * (1 + (attackerStats.finalDamagePct || 0) / 100) * (1 + (attackerStats.spellDamagePct || 0) / 100)
                return { offense: perHit * duration, sustain: 0 }
            }
            case 'finalDamagePct':
            case 'spellDamagePct':
                return { offense: referenceOffenseHit * (value / 100) * duration, sustain: 0 }
            case 'critChance': {
                const delta = (value / 100) * ((attackerStats.critDamagePct || 50) / 100)
                return { offense: referenceOffenseHit * delta * duration, sustain: 0 }
            }
            case 'critDamagePct': {
                const delta = ((attackerStats.critChance || 0) / 100) * (value / 100)
                return { offense: referenceOffenseHit * delta * duration, sustain: 0 }
            }
            case 'spd': {
                const ratio = value / (attackerStats.spd || 100)
                return { offense: referenceOffenseHit * ratio * duration, sustain: 0 }
            }
            case 'damageReductionPct':
                return { offense: 0, sustain: referenceIncomingHit * (value / 100) * duration }
            default:
                if (effect.stat === 'res_all' || effect.stat?.startsWith('res.'))
                    return { offense: 0, sustain: referenceIncomingHit * (value / 100) * duration }
                return null
        }
    }

    if (effect.type === 'debuff' && isEnemyTarget) {
        switch (effect.stat) {
            case 'atk': {
                const ratio = value / (100 + (target.atk || 100))
                return { offense: 0, sustain: referenceIncomingHit * ratio * duration }
            }
            case 'spd': {
                const ratio = value / (target.spd || 100)
                return { offense: 0, sustain: referenceIncomingHit * ratio * duration }
            }
            default:
                return null
        }
    }

    return null
}

// ─── Score total d'un sort (déjà scalé au niveau effectif via applyProgression) ─
//
// refs = { referenceOffenseHit, referenceIncomingHit } | null. En pass 1 (refs=null, cf.
// computeAutoKit), les buffs/debuffs sont ignorés — on ne connaît pas encore referenceOffenseHit,
// qui dépend justement des dégâts bruts calculés dans cette même pass sur tout le pool de sorts.
// Le résultat n'est PAS divisé par le cooldown ici : c'est une valeur "par cast", à normaliser
// par l'appelant (cohérent avec dot/hot qui retournent déjà un total sur toute leur durée).

function _autoTeamScoreMove(scaledMove, attackerStats, target, member, refs) {
    let offense = 0, sustain = 0, utility = 0, isOffensive = false

    for (const effect of scaledMove.effects || []) {
        if (effect.type === 'dot') {
            offense += _autoTeamDotValue(effect, attackerStats)
            isOffensive = true
        } else if (effect.damage || effect.damageHpPct || effect.stackedDamage) {
            // Couvre 'damage' ainsi que les variantes (best/worst_element_damage, absorbElementDmg, ...)
            // qui portent toutes un champ damage/damageHpPct exploitable, quel que soit leur `type`.
            offense += _autoTeamDamageEffectValue(effect, attackerStats, target)
            isOffensive = true
        } else if (effect.type === 'heal') {
            sustain += _autoTeamHealValue(effect, attackerStats)
        } else if (effect.type === 'heal%maxHp') {
            sustain += _autoTeamHealMaxHpPctValue(effect, attackerStats)
        } else if (effect.type === 'hot') {
            sustain += _autoTeamHotValue(effect, attackerStats)
        } else if (effect.type === 'shield') {
            sustain += _autoTeamShieldValue(effect, member, attackerStats)
        } else if (effect.type === 'lifesteal') {
            // Proportionnel aux dégâts déjà comptés pour ce sort (vol de vie = ratio des dégâts infligés)
            sustain += (effect.ratio || 0) * offense
        } else if (effect.type === 'buff' || effect.type === 'debuff') {
            if (!refs) continue // pass 1 : réévalué en pass 2 une fois referenceOffenseHit connu
            const bd = _autoTeamBuffDebuffValue(effect, attackerStats, target, refs.referenceOffenseHit, refs.referenceIncomingHit)
            if (bd) { offense += bd.offense; sustain += bd.sustain }
            else utility += AUTO_TEAM_UTILITY_SCORE
        } else {
            utility += AUTO_TEAM_UTILITY_SCORE
        }
    }

    return { offense, sustain, utility, isOffensive }
}

// ─── Sélection des 4 sorts ──────────────────────────────────────────────────

// profileLevel : 1 (glass cannon) .. 5 (safe), cf. AUTO_TEAM_PROFILES. Par défaut, le réglage
// courant du curseur (state.autoTeamProfile).
function computeAutoKit(classId, target, profileLevel = getAutoTeamProfileLevel()) {
    const member = state.team.find(m => m && m.classId === classId)
    const cls = classes[classId]
    if (!member || !cls) return null

    const profile = _autoTeamProfile(profileLevel)
    const effLevel = _autoTeamEffectiveLevel(member)
    const attackerStats = getEffectiveStats(member, effLevel)
    if (!attackerStats) return null

    const unlockLevel = { [cls.startingMove]: 1 }
    for (const [lvl, moveId] of Object.entries(cls.learnset || {})) {
        if (moveId) unlockLevel[moveId] = parseInt(lvl)
    }

    // L'éligibilité d'un sort dépend du niveau RÉEL (les sorts appris ne s'oublient pas en
    // modulation) ; seule la PUISSANCE du sort (applyProgression, stats) suit le niveau
    // modulé/synchronisé (effLevel), comme en combat réel (cf. combat.js:1051).
    const eligibleIds = Object.keys(unlockLevel)
        .filter(moveId => unlockLevel[moveId] <= (member.level || 1) && move[moveId])

    // Pass 1 (refs=null) : dégâts/soin/dot/bouclier/vol de vie bruts de chaque sort, sans les
    // buffs/debuffs — sert à établir referenceOffenseHit (le meilleur coup du kit), nécessaire
    // pour chiffrer la valeur des buffs/debuffs en pass 2.
    const rawScored = eligibleIds.map(moveId => {
        const scaled = applyProgression(move[moveId], effLevel)
        const hard = _autoTeamScoreMove(scaled, attackerStats, target, member, null)
        return { id: moveId, scaled, hard }
    })

    const referenceOffenseHit  = Math.max(0, ...rawScored.map(r => r.hard.offense))
    const referenceIncomingHit = (attackerStats.hp || 0) * AUTO_TEAM_ASSUMED_INCOMING_HIT_PCT / 100
    const refs = { referenceOffenseHit, referenceIncomingHit }

    // Pass 2 : score final, buffs/debuffs inclus, normalisé en "par seconde" sur le cooldown.
    const candidates = rawScored.map(({ id, scaled }) => {
        const full = _autoTeamScoreMove(scaled, attackerStats, target, member, refs)
        const cooldownS = Math.max(0.1, (scaled.cooldownMs || 2000) / 1000)
        const score = (full.offense + full.sustain * profile.sustainWeight + full.utility) / cooldownS
        return { id, restriction: move[id].restriction || null, score, isOffensive: full.isOffensive }
    }).sort((a, b) => b.score - a.score)

    if (!candidates.length) return null

    // Remplissage glouton (meilleur score d'abord), une seule occurrence par sigle de restriction
    const chosen = []
    const usedRestrictions = new Set()
    for (const c of candidates) {
        if (chosen.length >= 4) break
        if (c.restriction && usedRestrictions.has(c.restriction)) continue
        chosen.push(c)
        if (c.restriction) usedRestrictions.add(c.restriction)
    }

    // Plancher offensif du profil courant : au moins profile.minOffensive sorts offensifs parmi les 4 (si dispo)
    let guard = 0
    while (chosen.filter(c => c.isOffensive).length < profile.minOffensive && guard++ < 8) {
        const weakIdx = chosen.reduce((worst, c, i) => {
            if (c.isOffensive) return worst
            if (worst === -1 || c.score < chosen[worst].score) return i
            return worst
        }, -1)
        if (weakIdx === -1) break // plus aucun sort non-offensif à remplacer

        const weak = chosen[weakIdx]
        const stillUsed = new Set(usedRestrictions)
        if (weak.restriction) stillUsed.delete(weak.restriction)

        const replacement = candidates.find(c =>
            c.isOffensive && !chosen.includes(c) && (!c.restriction || !stillUsed.has(c.restriction))
        )
        if (!replacement) break

        if (weak.restriction) usedRestrictions.delete(weak.restriction)
        chosen[weakIdx] = replacement
        if (replacement.restriction) usedRestrictions.add(replacement.restriction)
    }

    const assignment = {}
    AUTO_TEAM_MOVE_SLOTS.forEach((slot, i) => { assignment[slot] = chosen[i]?.id || null })

    return { assignment, score: chosen.reduce((s, c) => s + c.score, 0) }
}

// ─── Application ────────────────────────────────────────────────────────────

function _applyAutoKitAssignment(member, assignment) {
    let changed = 0
    for (const slot of AUTO_TEAM_MOVE_SLOTS) {
        const moveId = assignment[slot] || null
        if (member.moves[slot] !== moveId) { member.moves[slot] = moveId; changed++ }
    }
    return changed
}

function applyAutoKit(classId, target, profileLevel = getAutoTeamProfileLevel()) {
    const result = computeAutoKit(classId, target, profileLevel)
    if (!result) return null
    const member = state.team.find(m => m && m.classId === classId)
    if (!member) return null

    const changed = _applyAutoKitAssignment(member, result.assignment)
    saveGame()
    updateTeamUI()
    return { changed }
}

function applyAutoTeam(profileLevel = getAutoTeamProfileLevel()) {
    const target = resolveAutoTeamTarget()
    let totalChanged = 0
    let membersUpdated = 0
    for (const member of state.team) {
        if (!member) continue
        const result = computeAutoKit(member.classId, target, profileLevel)
        if (!result) continue
        totalChanged += _applyAutoKitAssignment(member, result.assignment)
        membersUpdated++
    }
    if (membersUpdated > 0) { saveGame(); updateTeamUI() }
    return { membersUpdated, totalChanged }
}
