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
    let critChance         = 0
    let critDamagePct      = 50
    let healPct            = 0
    let healTeamPct        = 0
    let healMaxHpPct       = 0
    let healFlat           = 0
    let lifestealPct       = 0

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
                else if (stat === 'healFlat')           healFlat           += value
                else if (stat === 'lifestealPct')       lifestealPct       += value
                else if (stat.startsWith('res.'))        { const e = stat.split('.')[1]; if (res[e] !== undefined) res[e] += value }
            }
        }
    }

    // ─── Buffs ───────────────────────────────────

    if (member.buffs) {
        for (const buff of member.buffs) {

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
            if (buff.stat === 'healFlat')       healFlat       += buff.value
            if (buff.stat === 'lifestealPct')   lifestealPct   += buff.value

            if (buff.stat === 'res_all') {
                for (const e in res) res[e] += buff.value
            } else if (buff.stat.startsWith('res.')) {
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
                else if (stat === 'healFlat')           healFlat           += value
                else if (stat === 'lifestealPct')       lifestealPct       += value
                else if (stat.startsWith('res.'))       { const e = stat.split('.')[1]; if (res[e] !== undefined) res[e] += value }
            }
        }
    }

    // ─── Familier de ce membre uniquement ────────────────────

    const famId = member.equip?.familier
    if (famId) {
        const mob = monsters[famId]
        const fam = mob?.familiar
        if (fam?.bonusStat && fam.min != null && fam.max != null && fam.bonusType !== 'farming') {
            const entry  = state.collection[famId]
            const level  = entry?.level || 0
            const effMax = fam.max * (entry?.isArchi ? 1.5 : 1)
            const value  = Math.floor(getFamiliarStatValue(level, fam.min, effMax, mob.rarity))
            if (value > 0) {
                const bs = fam.bonusStat
                if      (bs === 'atk')               atk                += value
                else if (bs === 'maxHp')             hp                 += value
                else if (bs === 'spd')               spd                += value
                else if (bs === 'flatDamage')        flatDamage         += value
                else if (bs === 'finalDamagePct')    finalDamagePct     += value
                else if (bs === 'spellDamagePct')    spellDamagePct     += value
                else if (bs === 'damageReductionPct') damageReductionPct += value
                else if (bs === 'critChance')        critChance         += value
                else if (bs === 'critDamagePct')     critDamagePct      += value
                else if (bs === 'healPct')           healPct            += value
                else if (bs === 'healTeamPct')       healTeamPct        += value
                else if (bs === 'healMaxHpPct')      healMaxHpPct       += value
                else if (bs === 'healFlat')          healFlat           += value
                else if (bs === 'lifestealPct')      lifestealPct       += value
                else if (bs.startsWith('res.')) {
                    const elem = bs.split('.')[1]
                    if (res[elem] !== undefined) res[elem] += value
                }
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

    // ─── Caps défensifs ───────────────────────────

    // résistances élémentaires max = 50%
    for (const elem in res) {res[elem] = Math.min(res[elem], 50)}

    // réduction dégâts max = 50%
    damageReductionPct = Math.min(damageReductionPct,50)

    // critiques max 100%
    critChance = Math.min(critChance, 100)

    // dégâts critiques minimum 0%
    critDamagePct = Math.max(0, critDamagePct)


    return {
        hp: Math.max(1, hp),

        atk,
        spd,

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
        healFlat,
        lifestealPct
    }
}

// ─── Résolution de l'élément (fixe ou aléatoire parmi une liste) ─────────────

function resolveElement(effect) {
    if (Array.isArray(effect.elements) && effect.elements.length)
        return effect.elements[Math.floor(Math.random() * effect.elements.length)]
    return effect.element || 'neutre'
}

// ─── Calcul des dégâts ────────────────────────────────────────────────────────

// hpCtx : { casterMaxHp, casterCurrentHp, targetMaxHp, targetCurrentHp }
function calcDamage(attackerStats, defenderStats, effect, hpCtx = {}) {

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

    const atkPower = attackerStats.atk || 0

    const flatDamage = attackerStats.flatDamage || 0

    const finalDamagePct = attackerStats.finalDamagePct || 0

    const spellDamagePct = attackerStats.spellDamagePct || 0

    // ─── Stats défensives ─────────────────────

    const resistance = defenderStats.res?.[elem] || 0

    const damageReductionPct = defenderStats.damageReductionPct || 0

    // ─── Critiques ────────────────────────────

    const critChance = attackerStats.critChance || 0

    const critDamagePct = attackerStats.critDamagePct || 50

    // ─── Calcul dégâts ────────────────────────
    // Les dégâts basés sur les HP ignorent l'ATK et le flatDamage (comme dans Dofus)

    let damage = hpBased
        ? baseRoll
        : baseRoll * (1 + atkPower / 100)

    // dégâts fixes (ignorés pour les sorts HP%)
    if (!hpBased) damage += flatDamage

    // dégâts finaux
    damage *=(1 + finalDamagePct / 100)

    // bonus dégâts sorts
    damage *=(1 + spellDamagePct / 100)

    // résistances
    damage *=(1 - resistance / 100)

    // réduction dégâts
    damage *=(1 - damageReductionPct / 100)

    // ─── Critique ─────────────────────────────

    const isCrit =Math.random() * 100 < critChance

    if (isCrit) {damage *=(1 + critDamagePct / 100)}

    return {damage: Math.max(1,Math.floor(damage)),isCrit
    }
}

// ─── Niveau d'item ────────────────────────────────────────────────────────────

function getItemLevel(itemId) {
    const entry = state.inventory[itemId]
    if (!entry) return 0
    return Math.min(entry.level || 0, item[itemId]?.levelMax || 20)
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
        counts[itm.set] = (counts[itm.set] || 0) + 1
    }
    return counts
}
