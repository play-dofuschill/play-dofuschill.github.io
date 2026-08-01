// engine/loot.js — Système de loot DofusChill

// ─── Capture de familier (Pierre d'âme) ───────────────────────────────────────
// Ajoute le monstre à la collection et retourne les infos pour le résumé.
// Ne révèle rien pendant le combat — la découverte se fait dans showSessionSummary.

const BASE_DROP_DIVISOR = 7

// ─── Compensation de dilution de spawn ────────────────────────────────────────
// Dans une zone à plusieurs mobs (famille), chaque combat ne cible qu'un seul
// monstre tiré au sort selon son poids (spawnEnemy, combat.js). Un mob sous-
// représenté (ex. elite à poids réduit) serait donc bien plus long à monter
// que les autres si on gardait un coût fixe par pierre. On compense en rendant
// le coût par pierre inversement proportionnel à la probabilité de spawn du
// monstre : ratio=1 (mob seul dans sa zone, ex. boss) → coût inchangé.

let _monsterSpawnRatioCache = null

function _getMonsterSpawnRatio(monsterId) {
    if (!_monsterSpawnRatioCache) {
        _monsterSpawnRatioCache = new Map()
        for (const area of Object.values(areas)) {
            if (!area.spawns || area.spawns.length < 2) continue
            const total = area.spawns.reduce((sum, sp) => sum + sp.weight, 0)
            for (const sp of area.spawns) {
                _monsterSpawnRatioCache.set(sp.id, sp.weight / total)
            }
        }
    }
    return _monsterSpawnRatioCache.get(monsterId) ?? 1
}

// Compensation partielle (exposant 0.45) : pleine compensation (1/ratio) ramènerait
// une famille de 5 quasiment au coût d'un boss solo, ce qui est jugé trop radical.
// À 0.45, une famille type (mob dilué à 12-22%) demande environ 10 000 combats
// de zone pour être maxée, contre ~25 700 sans compensation et ~3 900 en full.
const SPAWN_COMPENSATION_EXPONENT = 0.45

function dropsNeededForLevel(level, monsterId = null, isSlowFamiliar = false) {
    if (isSlowFamiliar) return 5
    const ratio   = monsterId ? _getMonsterSpawnRatio(monsterId) : 1
    const divisor = BASE_DROP_DIVISOR / Math.pow(ratio, SPAWN_COMPENSATION_EXPONENT)
    return Math.max(1, Math.ceil(level / divisor))
}

const FAM_LEVEL_CAP = 200

function _familiarLevelFromDrops(drops, monsterId = null, isSlowFamiliar = false) {
    let level = 1
    let threshold = 1
    while (level < FAM_LEVEL_CAP) {
        const next = threshold + dropsNeededForLevel(level, monsterId, isSlowFamiliar)
        if (next > drops) return level
        threshold = next
        level++
    }
    return FAM_LEVEL_CAP
}

// ─── Familiers "lents" : minibosses de raid + boss d'anomalie ────────────────
// Ces familiers montent d'1 niveau tous les 5 pierres d'âme (≈1000 pour lvl 200),
// au lieu de la courbe standard.

let _slowFamiliarMonsterIdsCache = null

function _getSlowFamiliarMonsterIds() {
    if (_slowFamiliarMonsterIdsCache) return _slowFamiliarMonsterIdsCache
    const ids = new Set()
    for (const area of Object.values(areas)) {
        if (area.type === 'raid' && area.miniBoss) {
            if (area.miniBoss.id) ids.add(area.miniBoss.id)
            if (Array.isArray(area.miniBoss.ids)) area.miniBoss.ids.forEach(id => ids.add(id))
        }
        if (area.type === 'anomalie' && area.boss?.id) ids.add(area.boss.id)
    }
    _slowFamiliarMonsterIdsCache = ids
    return ids
}

function _isSlowLevelFamiliar(monsterId) {
    return _getSlowFamiliarMonsterIds().has(monsterId)
}

function _captureFamiliar(monsterId, isArchi = false) {
    const isSlow = _isSlowLevelFamiliar(monsterId)

    if (!state.collection[monsterId]) {
        state.collection[monsterId] = { drops: 1, level: 1, isArchi }
        return { monsterId, isNew: true, newLevel: 1, isArchi }
    }

    const entry = state.collection[monsterId]
    // Migration : anciennes entrées sans drops
    if (entry.drops === undefined) entry.drops = entry.level * (entry.level + 1) / 2

    const oldLevel = entry.level
    entry.drops++
    entry.level = _familiarLevelFromDrops(entry.drops, monsterId, isSlow)
    if (isArchi) entry.isArchi = true  // une fois archi, toujours archi
    return { monsterId, isNew: false, newLevel: entry.level, leveledUp: entry.level > oldLevel, isArchi }
}

// ─── Énutrof : membre actif est-il un Énutrof ? ───────────────────────────────

function _isEnutrofActive() {
    if (typeof combat === 'undefined' || !combat) return false
    const m = state.team?.[combat.activeMemberIndex]
    return classes[m?.classId]?.passive?.id === 'enutrof'
}

// ─── Pénalité de drop par delta de niveau ────────────────────────────────────
// Aucune pénalité si le niveau max de l'équipe <= niveau max de la zone,
// ou si la modulation de difficulté (skull) est active.
// Sinon : pénalité = delta / 1.5 %, plafonnée à 95 %.

function _getLevelDropPenaltyMult(areaId) {
    if (typeof combat !== 'undefined' && combat?.syncedLevel) return 1
    const area = areas[areaId]
    if (!area?.maxLevel) return 1
    const alive = state.team.filter(m => m && m.currentHp > 0)
    if (!alive.length) return 1
    const teamMaxLevel = Math.max(...alive.map(m => m.level || 1))
    const delta = Math.max(0, teamMaxLevel - area.maxLevel)
    if (delta === 0) return 1
    const penaltyPct = Math.min(95, delta / 1.5)
    return (100 - penaltyPct) / 100
}

// ─── Drop d'items depuis la loot table d'une zone ────────────────────────────
// La pierreDame est exclue ici — elle est traitée dans processVictoryLoot.

function rollItemDrops(areaId, lootTableOverride = null) {
    const area      = areas[areaId]
    const lootTable = lootTableOverride || area?.lootTable
    if (!lootTable) return []

    const famBonuses   = getAllTeamFarmingBonuses()
    const equipBonuses = getActiveMemberEquipFarmingBonuses()
    const enutrofBonus = _isEnutrofActive() ? 0.15 : 0
    const dropBonus    = (famBonuses.dropRate || 0) / 100 + (equipBonuses.dropRate || 0) / 100 + enutrofBonus

    // Calcule la chance globale de drop (hors pierres d'âme et clés de donjon).
    // Les runes astrales ne sont accessibles qu'en difficulté modulée maximale (3/3) —
    // exclues du pool sinon, pour ne pas trivialiser le farm en modulation normale.
    const baseEntries      = lootTable.filter(e =>
        e.itemId !== 'pierreDame' && e.itemId !== 'pierreDameGardien' && !e.isKey &&
        (item[e.itemId]?.type !== 'runeAstrale' || state.skullLevel >= 3)
    )
    const levelableEntries = baseEntries.filter(e => item[e.itemId]?.itemLevelMax)
    const maxedCount       = levelableEntries.filter(e => {
        const inv = state.inventory[e.itemId]
        return inv && inv.level >= item[e.itemId].itemLevelMax
    }).length
    const maxedRatio  = levelableEntries.length > 0 ? maxedCount / levelableEntries.length : 0
    const maxedFactor = 1 - 0.9 * maxedRatio * maxedRatio  // quadratique : [1.0 → 0.1]

    const itemEntries = baseEntries.map(e => {
        const itm     = item[e.itemId]
        if (!itm?.itemLevelMax) return e
        const inv     = state.inventory[e.itemId]
        const isMaxed = inv && inv.level >= itm.itemLevelMax
        return isMaxed ? { ...e, dropRate: e.dropRate * maxedFactor } : e
    })

    const levelMult   = _getLevelDropPenaltyMult(areaId)
    // Difficulté modulée : multiplicateur de loot skull (niveau 1 = pas de bonus)
    const lootMult    = [1, 1, 2, 4][state.skullLevel] || 1
    const totalChance = Math.min(0.95, (itemEntries.reduce((sum, e) => sum + e.dropRate, 0) + dropBonus) * levelMult * lootMult)

    if (Math.random() >= totalChance) return []

    // Un seul item droppé, sélectionné de façon pondérée
    let roll = Math.random() * itemEntries.reduce((sum, e) => sum + e.dropRate, 0)
    for (const entry of itemEntries) {
        roll -= entry.dropRate
        if (roll <= 0) {
            const result = addToInventory(entry.itemId)
            return [{ itemId: entry.itemId, ...result }]
        }
    }
    return []
}

// ─── Ajout d'un item à l'inventaire ──────────────────────────────────────────

function addToInventory(itemId) {
    const itm = item[itemId]
    if (!itm) return null

    // Trophées : possession unique, jamais de stack — un doublon se convertit en kamas
    if (itm.trophy) {
        if (state.inventory[itemId]) {
            const kamasGained = _isEnutrofActive() ? 2 : 1
            state.kamas += kamasGained
            return { itemId, level: 0, leveledUp: false, convertedToKamas: true, kamas: kamasGained }
        }
        state.inventory[itemId] = { count: 1 }
        return { itemId, level: 0, leveledUp: false, convertedToKamas: false }
    }

    // Items sans levelMax (ressources, clés) : empilement par count uniquement
    if (!itm.itemLevelMax) {
        if (!state.inventory[itemId]) state.inventory[itemId] = { count: 0 }
        state.inventory[itemId].count = (state.inventory[itemId].count || 0) + 1
        return { itemId, level: 0, leveledUp: false, convertedToKamas: false }
    }

    if (!state.inventory[itemId]) {
        state.inventory[itemId] = { level: 1, count: 1 }
        return { itemId, level: 1, leveledUp: true, convertedToKamas: false }
    }

    const current = state.inventory[itemId]
    const maxLvl  = itm.itemLevelMax

    if (current.level < maxLvl) {
        current.level++
        current.count = (current.count || 0) + 1
        return { itemId, level: current.level, leveledUp: true, convertedToKamas: false }
    } else {
        const kamasGained = _isEnutrofActive() ? 2 : 1
        state.kamas += kamasGained
        return { itemId, level: current.level, leveledUp: false, convertedToKamas: true, kamas: kamasGained }
    }
}

// ─── 3e pull : clé de donjon ─────────────────────────────────────────────────

function rollKeyDrop(areaId) {
    const area = areas[areaId]
    if (!area?.lootTable) return null
    for (const entry of area.lootTable) {
        if (!entry.isKey) continue
        if (Math.random() < entry.dropRate) {
            addToInventory(entry.itemId)
            return { itemId: entry.itemId, level: 0 }
        }
    }
    return null
}

function consumeDungeonKey(areaId) {
    const area = areas[areaId]
    if (!area?.keyId) return
    const entry = state.inventory[area.keyId]
    if (!entry) return
    entry.count = (entry.count || 1) - 1
    if (entry.count <= 0) delete state.inventory[area.keyId]
    saveGame()
}

// ─── Résumé de fin de combat ──────────────────────────────────────────────────

function processVictoryLoot(enemy, lootTableOverride = null) {
    state.session.killCount++
    state.totalKills = (state.totalKills || 0) + 1
    if (enemy.tier === 'boss' || enemy.tier === 'dungeon_boss') {
        if (!state.defeatedBosses) state.defeatedBosses = []
        if (!state.defeatedBosses.includes(enemy.id)) state.defeatedBosses.push(enemy.id)
    }

    // XP distribuée par onVictory (combat.js) via calculateXPReward + giveXP
    const xpResults = []

    // Pierre d'âme → capture du familier
    // Cherche pierreDame OU pierreDameGardien (donjons) dans la loot table.
    let familiarDrop = null
    const area = areas[state.currentArea]
    const activeLootTable = lootTableOverride || area?.lootTable
    const soulStoneEntry = activeLootTable?.find(e => e.itemId === 'pierreDame' || e.itemId === 'pierreDameGardien')
    const isGardienZone  = soulStoneEntry?.itemId === 'pierreDameGardien'

    const famBonuses   = getAllTeamFarmingBonuses()
    const equipBonuses = getActiveMemberEquipFarmingBonuses()
    const dropBonus    = (famBonuses.dropRate || 0) / 100 + (equipBonuses.dropRate || 0) / 100 + (combat?.dropBonusCombat || 0) / 100

    if (enemy.isArchi) {
        // Archimonstre / Archiboss : capture garantie à 100%
        familiarDrop = _captureFamiliar(enemy.id, true)
        if (familiarDrop) state.session.dropCount++
    } else {
        const baseChance = soulStoneEntry
            ? soulStoneEntry.dropRate
            : (monsters[enemy.id]?.dropRate ?? 0)
        const levelMult  = _getLevelDropPenaltyMult(state.currentArea)
        // Difficulté modulée : multiplicateur de loot skull (niveau 1 = pas de bonus)
        const lootMult   = [1, 1, 2, 4][state.skullLevel] || 1
        const dropChance = Math.min(0.95, (baseChance + dropBonus) * levelMult * lootMult)

        if (Math.random() < dropChance) {
            familiarDrop = _captureFamiliar(enemy.id)
            if (familiarDrop) {
                familiarDrop.isGardien = isGardienZone
                state.session.dropCount++
            }
        }
    }

    // Items ordinaires (pierres d'âme et clés exclues du pool principal)
    const itemDrops = rollItemDrops(state.currentArea, lootTableOverride)

    // Archimonstre : ajoute silencieusement la pierre archi à l'inventaire (pas dans le résumé)
    if (enemy.isArchi && familiarDrop) {
        addToInventory('pierreDameArchimonstre')
    }

    // 3e pull indépendant : clé de donjon
    const keyDrop = rollKeyDrop(state.currentArea)
    if (keyDrop) itemDrops.push(keyDrop)

    // Caisse d'équipement : indicateur visuel seulement, pas stocké en inventaire
    const equipDrops = itemDrops.filter(d => !item[d.itemId]?.isKey)
    const caisseDropped = equipDrops.length > 0

    checkClassUnlocks()
    saveGame()
    return { xpResults, familiarDrop, itemDrops, caisseDropped }
}
