// engine/stats.js — Calcul des stats et des dégâts DofusChill

function getEffectiveStats(member) {
    const cls = classes[member.classId]
    if (!cls) return null

    const lvl = member.level || 1
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
    let critChance     = 0
    let critDamagePct  = 50

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
            const computed = getItemStats(itm, ilvl)

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
                else if (stat === 'fireResPct')         res.feu            += value
                else if (stat === 'waterResPct')        res.eau            += value
                else if (stat === 'earthResPct')        res.terre          += value
                else if (stat === 'airResPct')          res.air            += value
                else if (stat === 'neutralResPct')      res.neutre         += value
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

            if (buff.stat === 'res_all') {
                for (const e in res) {
                    res[e] += buff.value
                }
            }
        }
    }
    // ─── Bonus de panoplie ───────────────────────────────────

    if (typeof panoplies !== 'undefined') {
        const setCounts = countSetPieces(member.equip)
        for (const [setId, count] of Object.entries(setCounts)) {
            const pano = panoplies[setId]
            if (!pano?.bonuses) continue
            const thresholds = Object.keys(pano.bonuses).map(Number).sort((a, b) => a - b)
            for (const t of thresholds) {
                if (count < t) break
                for (const { stat, value } of (pano.bonuses[t].stats || [])) {
                    if      (stat === 'maxHp')              hp                 += value
                    else if (stat === 'atk')                atk                += value
                    else if (stat === 'spd')                spd                += value
                    else if (stat === 'flatDamage')         flatDamage         += value
                    else if (stat === 'finalDamagePct')     finalDamagePct     += value
                    else if (stat === 'spellDamagePct')     spellDamagePct     += value
                    else if (stat === 'damageReductionPct') damageReductionPct += value
                    else if (stat === 'critChance')         critChance         += value
                    else if (stat === 'critDamagePct')      critDamagePct      += value
                    else if (stat === 'fireResPct')         res.feu            += value
                    else if (stat === 'waterResPct')        res.eau            += value
                    else if (stat === 'earthResPct')        res.terre          += value
                    else if (stat === 'airResPct')          res.air            += value
                    else if (stat === 'neutralResPct')      res.neutre         += value
                }
            }
        }
    }

    // ─── Familier de ce membre uniquement ────────────────────

    const famId = member.equip?.familier
    if (famId) {
        const mob = monsters[famId]
        const fam = mob?.familiar
        if (fam?.bonusStat && fam.min != null && fam.max != null && fam.bonusType !== 'farming') {
            const entry = state.collection[famId]
            const level = entry?.level || 0
            const value = Math.floor(getFamiliarStatValue(level, fam.min, fam.max))
            if (value > 0) {
                const bs = fam.bonusStat
                if      (bs === 'atk')               atk                += value
                else if (bs === 'hp')                hp                 += value
                else if (bs === 'spd')               spd                += value
                else if (bs === 'flatDamage')        flatDamage         += value
                else if (bs === 'finalDamagePct')    finalDamagePct     += value
                else if (bs === 'spellDamagePct')    spellDamagePct     += value
                else if (bs === 'damageReductionPct') damageReductionPct += value
                else if (bs === 'critChance')        critChance         += value
                else if (bs === 'critDamagePct')     critDamagePct      += value
                else if (bs.startsWith('res.')) {
                    const elem = bs.split('.')[1]
                    if (res[elem] !== undefined) res[elem] += value
                }
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
        critDamagePct
    }
}

// ─── Calcul des dégâts ────────────────────────────────────────────────────────

function calcDamage(attackerStats, defenderStats, effect) {

    const elem =
        effect.element || 'neutre'

    const damageData =
        effect.damage || { min: 0, max: 0 }

    const baseRoll =
        Math.floor(
            Math.random() *
            (damageData.max - damageData.min + 1)
        ) + damageData.min

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

    let damage =baseRoll *(1 + atkPower / 100)

    // dégâts fixes
    damage += flatDamage

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
        const itm = item[itemId]
        if (!itm || !itm.set) continue
        counts[itm.set] = (counts[itm.set] || 0) + 1
    }
    return counts
}
