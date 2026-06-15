// engine/stats.js — Calcul des stats et des dégâts DofusChill

function getEffectiveStats(member, syncedLevel = null) {
    const cls = classes[member.classId]
    if (!cls) return null

    const _activeCombat = typeof combat !== 'undefined' ? combat : null
    const _cap = syncedLevel ?? _activeCombat?.syncedLevel ?? null
    const lvl  = _cap !== null ? Math.min(member.level ?? 1, _cap) : (member.level ?? 1)
    const g = cls.growthPerLevel

    let hp  = Math.floor(cls.bst.hp  + g.hp  * (lvl - 1))
    let atk = Math.floor(cls.bst.atk + g.atk * (lvl - 1))
    let spd = Math.floor(cls.bst.spd + g.spd * (lvl - 1))

    let res = {
        eau:    cls.bst.res.eau,
        feu:    cls.bst.res.feu,
        air:    cls.bst.res.air,
        terre:  cls.bst.res.terre,
        neutre: cls.bst.res.neutre
    }

    // nouvelles stats
    let flatDamage         = 0
    let finalDamagePct     = 0
    let spellDamagePct     = 0
    let damageReductionPct = 0
    let critChance         = cls.bst.critChance    ?? 0
    let critDamagePct      = cls.bst.critDamagePct ?? 50
    let healPct            = 0
    let healTeamPct        = 0
    let healMaxHpPct       = 0
    let healStat           = 0
    let lifestealPct       = 0
    let force              = 0
    let intelligence       = 0
    let chance             = 0
    let agilite            = 0
    let critResPct         = cls.bst.res?.crit     ?? 0

    // scaling résistances
    for (const elem in res) {
        res[elem] += (g.res?.[elem] || 0) * (lvl - 1)
    }

    // ─── Equipements ─────────────────────────────

    if (member.equip) {
        for (const slotId in member.equip) {
            const itemId = member.equip[slotId]
            if (!itemId) continue

            const itm = item[itemId]
            if (!itm?.stats) continue

            const ilvl     = Math.max(1, getItemLevel(itemId))
            const computed = getItemStats(itm, ilvl, state.inventory[itemId]?.forgedStats || null, state.inventory[itemId]?.transForge || null)

            for (const { stat, value } of computed) {
                if      (stat === 'maxHp')              hp                 += value
                else if (stat === 'atk')                atk                += value
                else if (stat === 'spd')                spd                += value
                else if (stat === 'flatDamage')         flatDamage         += value
                else if (stat === 'finalDamagePct')     finalDamagePct     += value
                else if (stat === 'spellDamagePct')     spellDamagePct     += value
                else if (stat === 'damageReductionPct') damageReductionPct += value
                else if (stat === 'critChance')         critChance         += value
                else if (stat === 'critDamagePct')      critDamagePct      += value
                else if (stat === 'healPct')            healPct            += value
                else if (stat === 'healTeamPct')        healTeamPct        += value
                else if (stat === 'healMaxHpPct')       healMaxHpPct       += value
                else if (stat === 'heal')               healStat           += value
                else if (stat === 'lifestealPct')       lifestealPct       += value
                else if (stat === 'force')              force              += value
                else if (stat === 'intelligence')       intelligence       += value
                else if (stat === 'chance')             chance             += value
                else if (stat === 'agilite')            agilite            += value
                else if (stat === 'critResPct')         critResPct         += value
                else if (stat.startsWith('res.'))        { const e = stat.split('.')[1]; if (res[e] !== undefined) res[e] += value }
            }
        }
    }

    // ─── Buffs ───────────────────────────────────

    if (member.buffs) {
        for (const buff of member.buffs) {
            if ((buff.delay ?? 0) > 0) continue

            if (buff.stat === 'atk')
                atk += buff.value

            if (buff.stat === 'flatDamage')
                flatDamage += buff.value

            if (buff.stat === 'finalDamagePct')
                finalDamagePct += buff.value

            if (buff.stat === 'spellDamagePct')
                spellDamagePct += buff.value

            if (buff.stat === 'damageReductionPct')
                damageReductionPct += buff.value

            if (buff.stat === 'spd')
                spd += buff.value

            if (buff.stat === 'critChance')
                critChance += buff.value

            if (buff.stat === 'critDamagePct')
                critDamagePct += buff.value

            if (buff.stat === 'healPct')        healPct        += buff.value
            if (buff.stat === 'healTeamPct')    healTeamPct    += buff.value
            if (buff.stat === 'healMaxHpPct')   healMaxHpPct   += buff.value
            if (buff.stat === 'heal')           healStat       += buff.value
            if (buff.stat === 'lifestealPct')   lifestealPct   += buff.value
            if (buff.stat === 'force')          force          += buff.value
            if (buff.stat === 'intelligence')   intelligence   += buff.value
            if (buff.stat === 'chance')         chance         += buff.value
            if (buff.stat === 'agilite')        agilite        += buff.value
            if (buff.stat === 'critResPct')     critResPct     += buff.value

            if (buff.stat === 'res_all') {
                for (const e in res) res[e] += buff.value
            } else if (buff.stat?.startsWith('res.')) {
                const e = buff.stat.split('.')[1]
                if (res[e] !== undefined) res[e] += buff.value
            }
        }
    }
    // ─── Bonus de panoplie ───────────────────────────────────

    if (typeof panoplies !== 'undefined') {
        const setCounts = countSetPieces(member.equip)
        for (const [setId, count] of Object.entries(setCounts)) {
            const pano = panoplies[setId]
            if (!pano?.bonuses) continue
            // Seul le palier le plus élevé atteint s'applique (remplace les paliers inférieurs)
            const thresholds = Object.keys(pano.bonuses).map(Number).sort((a, b) => a - b)
            let activeT = null
            for (const t of thresholds) { if (count >= t) activeT = t }
            if (activeT === null) continue
            for (const { stat, value } of (pano.bonuses[activeT].stats || [])) {
                if      (stat === 'maxHp')              hp                 += value
                else if (stat === 'atk')                atk                += value
                else if (stat === 'spd')                spd                += value
                else if (stat === 'flatDamage')         flatDamage         += value
                else if (stat === 'finalDamagePct')     finalDamagePct     += value
                else if (stat === 'spellDamagePct')     spellDamagePct     += value
                else if (stat === 'damageReductionPct') damageReductionPct += value
                else if (stat === 'critChance')         critChance         += value
                else if (stat === 'critDamagePct')      critDamagePct      += value
                else if (stat === 'healPct')            healPct            += value
                else if (stat === 'healTeamPct')        healTeamPct        += value
                else if (stat === 'healMaxHpPct')       healMaxHpPct       += value
                else if (stat === 'heal')               healStat           += value
                else if (stat === 'lifestealPct')       lifestealPct       += value
                else if (stat === 'force')              force              += value
                else if (stat === 'intelligence')       intelligence       += value
                else if (stat === 'chance')             chance             += value
                else if (stat === 'agilite')            agilite            += value
                else if (stat === 'critResPct')         critResPct         += value
                else if (stat.startsWith('res.'))       { const e = stat.split('.')[1]; if (res[e] !== undefined) res[e] += value }
            }
        }
    }

    // ─── Familier de ce membre uniquement ────────────────────

    const famId = member.equip?.familier
    if (famId) {
        for (const { bonusType, bonusStat: bs, value } of getFamiliarBonusesComputed(famId)) {
            if (bonusType === 'farming' || value <= 0) continue
            if      (bs === 'atk')                atk                += value
            else if (bs === 'maxHp')              hp                 += value
            else if (bs === 'spd')                spd                += value
            else if (bs === 'flatDamage')         flatDamage         += value
            else if (bs === 'finalDamagePct')     finalDamagePct     += value
            else if (bs === 'spellDamagePct')     spellDamagePct     += value
            else if (bs === 'damageReductionPct') damageReductionPct += value
            else if (bs === 'critChance')         critChance         += value
            else if (bs === 'critDamagePct')      critDamagePct      += value
            else if (bs === 'healPct')            healPct            += value
            else if (bs === 'healTeamPct')        healTeamPct        += value
            else if (bs === 'healMaxHpPct')       healMaxHpPct       += value
            else if (bs === 'heal')               healStat           += value
            else if (bs === 'lifestealPct')       lifestealPct       += value
            else if (bs === 'force')              force              += value
            else if (bs === 'intelligence')       intelligence       += value
            else if (bs === 'chance')             chance             += value
            else if (bs === 'agilite')            agilite            += value
            else if (bs === 'critResPct')         critResPct         += value
            else if (bs.startsWith('res.')) {
                const elem = bs.split('.')[1]
                if (res[elem] !== undefined) res[elem] += value
            }
        }
    }

    // ─── Passifs de classe ─────────────────────────────────────────────────────

    const passive = cls.passive
    if (passive) {
        const _combat  = typeof combat !== 'undefined' ? combat : null
        const memberIdx = _combat ? state.team.indexOf(member) : -1

        // Ouginak : +X% dégâts critiques de base
        if (passive.baseCritDamagePct) {
            critDamagePct += passive.baseCritDamagePct
        }

        // Sacrieur : bonus finalDamagePct selon seuil de PV
        if (passive.id === 'sacrieur' && member.maxHp > 0 && member.currentHp != null) {
            const hpPct = (member.currentHp / member.maxHp) * 100
            if (hpPct <= 15)      finalDamagePct += 10
            else if (hpPct <= 50) finalDamagePct += 5
        }

        // Sram : +1% finalDamagePct par ennemi tué (cap 5%)
        if (passive.id === 'sram' && memberIdx !== -1 && _combat) {
            const kills = _combat.memberKillCount?.[memberIdx] || 0
            finalDamagePct += Math.min(5, kills)
        }

        // Féca : +2% résistances all par ennemi tué (cap 10%)
        if (passive.id === 'feca' && memberIdx !== -1 && _combat) {
            const kills = _combat.memberKillCount?.[memberIdx] || 0
            const bonus = Math.min(10, kills * 2)
            for (const e in res) res[e] += bonus
        }

        // Huppermage : +10% finalDamagePct si 4 sorts d'éléments tous différents (pré-calculé au départ du combat)
        if (passive.id === 'huppermage' && memberIdx !== -1 && _combat) {
            if (_combat.memberPassiveState?.[memberIdx]?.huppermageBonus) {
                finalDamagePct += 10
            }
        }

        // Ecaflip : effet roulette actif (tiré à chaque fin de cycle)
        if (passive.id === 'ecaflip' && memberIdx !== -1 && _combat) {
            const eff = _combat.memberPassiveState?.[memberIdx]?.ecaflipEffect
            if (eff) {
                if      (eff.stat === 'finalDamagePct') finalDamagePct += eff.value
                else if (eff.stat === 'critChance')     critChance     += eff.value
                else if (eff.stat === 'res_all')        for (const e in res) res[e] += eff.value
            }
        }

        // Pandawa : bonus/malus selon état d'ébriété (état stocké dans combat.memberPassiveState)
        if (passive.id === 'pandawa' && memberIdx !== -1 && _combat) {
            const pst = _combat.memberPassiveState?.[memberIdx]?.state || 'normal'
            if (pst === 'ivresse') {
                spd             = Math.floor(spd * 0.8)
                finalDamagePct += 20
                for (const e in res) res[e] += 10
            } else if (pst === 'gueule_de_bois') {
                finalDamagePct -= 20
                for (const e in res) res[e] -= 10
            }
        }
    }

    // spdInvert : inverse la vitesse autour de 100 (200 - spd_eff)
    if ((member.buffs || []).some(b => b.stat === 'spdInvert' && !(b.delay ?? 0))) {
        spd = 200 - spd
    }

    // ─── Passif companion (ownerPassive) ──────────────────────────────────────
    const _cp = member.companion?.ownerPassive
    if (_cp && member.companion.currentHp > 0) {
        if      (_cp.stat === 'finalDamagePct') finalDamagePct += _cp.value
        else if (_cp.stat === 'spellDamagePct') spellDamagePct += _cp.value
        else if (_cp.stat === 'flatDamage')     flatDamage     += _cp.value
        else if (_cp.stat === 'atk')            atk            += _cp.value
        else if (_cp.stat === 'critChance')     critChance     += _cp.value
        else if (_cp.stat === 'critDamagePct')  critDamagePct  += _cp.value
    }

    // ─── Caps défensifs ───────────────────────────

    // résistances élémentaires max = 50%
    for (const elem in res) {res[elem] = Math.min(res[elem], 50)}

    // réduction dégâts max = 50%
    damageReductionPct = Math.min(damageReductionPct,50)

    // critiques max 100%
    critChance = Math.max(0, Math.min(critChance, 100))

    // dégâts critiques minimum 0%
    critDamagePct = Math.max(0, critDamagePct)


    return {
        hp: Math.max(1, hp),

        atk,
        spd: Math.max(25, spd),

        res,

        flatDamage,
        finalDamagePct,
        spellDamagePct,
        damageReductionPct,
        critChance,
        critDamagePct,

        healPct,
        healTeamPct,
        healMaxHpPct,
        healStat,
        lifestealPct,

        force,
        intelligence,
        chance,
        agilite,
        critResPct
    }
}

// ─── Résolution de l'élément (fixe ou aléatoire parmi une liste) ─────────────

function resolveElement(effect) {
    if (Array.isArray(effect.elements) && effect.elements.length)
        return effect.elements[Math.floor(Math.random() * effect.elements.length)]
    return effect.element || 'neutre'
}

// ─── Calcul des dégâts ────────────────────────────────────────────────────────

// hpCtx      : { casterMaxHp, casterCurrentHp, targetMaxHp, targetCurrentHp }
// forcedCrit : true/false pré-rollé par l'appelant (null = rouler ici)
function calcDamage(attackerStats, defenderStats, effect, hpCtx = {}, forcedCrit = null) {

    const elem = resolveElement(effect)

    // ─── Base roll : fixe, aléatoire, ou % de HP ──────────────────────────────
    let baseRoll
    let hpBased = false
    if (effect.damageHpPct) {
        const src    = effect.damageHpPct.source || 'casterMaxHp'
        const hpVal  = hpCtx[src] || 0
        baseRoll     = Math.floor(hpVal * effect.damageHpPct.pct / 100)
        hpBased      = true
    } else {
        const damageData = effect.damage || { min: 0, max: 0 }
        baseRoll =
            Math.floor(
                Math.random() *
                (damageData.max - damageData.min + 1)
            ) + damageData.min
    }

    // ─── Stats offensives ─────────────────────

    // Bonus élémentaire : force/intelligence/chance/agilite selon l'élément du sort
    const _elemStatMap = { terre: 'force', feu: 'intelligence', eau: 'chance', air: 'agilite' }
    const _elemStatKey = _elemStatMap[elem]
    const elemBonus    = _elemStatKey ? (attackerStats[_elemStatKey] || 0) : 0

    const atkPower = (attackerStats.atk || 0) + elemBonus

    const flatDamage = attackerStats.flatDamage || 0

    const finalDamagePct = attackerStats.finalDamagePct || 0

    const spellDamagePct = attackerStats.spellDamagePct || 0

    // ─── Stats défensives ─────────────────────

    const resistance = defenderStats.res?.[elem] || 0

    const damageReductionPct = defenderStats.damageReductionPct || 0

    // ─── Critiques ────────────────────────────

    const critChance    = attackerStats.critChance    || 0
    const critDamagePct = attackerStats.critDamagePct || 50
    // Résistance critique du défenseur : réduit le bonus de dégâts critiques reçus
    const critResPct    = defenderStats.critResPct    || 0

    // ─── Calcul dégâts ────────────────────────

    const isCrit = forcedCrit !== null ? forcedCrit : (Math.random() * 100 < critChance)

    // Le critique s'applique sur le roll de base (avant ATK et multiplicateurs finaux)
    let effectiveBase = baseRoll
    if (isCrit) {
        const critBonus = Math.max(0, critDamagePct - critResPct)
        effectiveBase = Math.floor(baseRoll * (1 + critBonus / 100))
    }

    // Les dégâts basés sur les HP ignorent l'ATK et le flatDamage (comme dans Dofus)
    let damage = hpBased
        ? effectiveBase
        : effectiveBase * (1 + atkPower / 100)

    // dégâts fixes (ignorés pour les sorts HP%)
    if (!hpBased) damage += flatDamage

    // dégâts finaux
    damage *= (1 + finalDamagePct / 100)

    // bonus dégâts sorts
    damage *= (1 + spellDamagePct / 100)

    // résistances
    damage *= (1 - resistance / 100)

    // réduction dégâts
    damage *= (1 - damageReductionPct / 100)

    return { damage: Math.max(0, Math.floor(damage)), isCrit }
}

// ─── Niveau d'item ────────────────────────────────────────────────────────────

function getItemLevel(itemId) {
    const entry = state.inventory[itemId]
    if (!entry) return 0
    return Math.min(entry.level || 0, item[itemId]?.itemLevelMax || 20)
}

// ─── Comptage des pièces de panoplie équipées ─────────────────────────────────
// Retourne { setId: count } pour chaque set représenté dans l'équip

function countSetPieces(equip) {
    if (!equip) return {}
    const counts = {}
    for (const slotId in equip) {
        const itemId = equip[slotId]
        if (!itemId) continue
        if (slotId === 'familier') {
            for (const [setId, pano] of Object.entries(panoplies)) {
                if (pano.familiar === itemId) counts[setId] = (counts[setId] || 0) + 1
            }
            continue
        }
        const itm = item[itemId]
        if (!itm || !itm.set) continue
        const _sets = Array.isArray(itm.set) ? itm.set : [itm.set]
        for (const _setId of _sets) counts[_setId] = (counts[_setId] || 0) + 1
    }
    return counts
}

// ─── Bonus farming de toute l'équipe (familiers uniquement) ──────────────────
// Agrège dropRate, xpGain, dropRateElite depuis les familiers de TOUS les membres.
// Les bonus panoplie et items ne sont PAS inclus ici — ils dépendent du membre actif.

function getAllTeamFarmingBonuses() {
    return getAllFamiliarBonuses()
}

// ─── Bonus farming du membre actif (panoplies + items) ───────────────────────
// Lit uniquement le membre en cours d'action (combat.activeMemberIndex).
// Appelé au moment du kill/drop pour appliquer les bonus de façon conditionnelle.

function getActiveMemberEquipFarmingBonuses() {
    if (typeof combat === 'undefined' || !combat || !state.team) return {}
    const member = state.team[combat.activeMemberIndex]
    if (!member?.equip) return {}

    const totals = {}
    const FARMING_STATS = new Set(['dropRate', 'xpGain', 'dropRateElite'])

    // Panoplies du membre actif
    if (typeof panoplies !== 'undefined') {
        const setCounts = countSetPieces(member.equip)
        for (const [setId, count] of Object.entries(setCounts)) {
            const pano = panoplies[setId]
            if (!pano?.bonuses) continue
            const thresholds = Object.keys(pano.bonuses).map(Number).sort((a, b) => a - b)
            let activeT = null
            for (const t of thresholds) { if (count >= t) activeT = t }
            if (activeT === null) continue
            for (const { stat, value } of (pano.bonuses[activeT].stats || [])) {
                if (FARMING_STATS.has(stat)) totals[stat] = (totals[stat] || 0) + value
            }
        }
    }

    // Items du membre actif (hors familier)
    if (typeof item !== 'undefined') {
        for (const slotId in member.equip) {
            if (slotId === 'familier') continue
            const itemId = member.equip[slotId]
            if (!itemId) continue
            const itm = item[itemId]
            if (!itm?.stats) continue
            for (const s of itm.stats) {
                if (s.stat && FARMING_STATS.has(s.stat)) totals[s.stat] = (totals[s.stat] || 0) + (s.value || 0)
            }
        }
    }

    return totals
}
