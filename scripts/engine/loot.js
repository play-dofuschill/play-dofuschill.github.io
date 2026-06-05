// engine/loot.js — Système de loot DofusChill

// ─── Capture de familier (Pierre d'âme) ───────────────────────────────────────
// Ajoute le monstre à la collection et retourne les infos pour le résumé.
// Ne révèle rien pendant le combat — la découverte se fait dans showSessionSummary.

function dropsNeededForLevel(level) {
    return Math.max(1, Math.ceil(level / 5))
}

const FAM_LEVEL_CAP = 200

function _familiarLevelFromDrops(drops) {
    let level = 1
    let threshold = 1
    while (level < FAM_LEVEL_CAP) {
        const next = threshold + dropsNeededForLevel(level)
        if (next > drops) return level
        threshold = next
        level++
    }
    return FAM_LEVEL_CAP
}

function _captureFamiliar(monsterId, isArchi = false) {
    if (!state.collection[monsterId]) {
        state.collection[monsterId] = { drops: 1, level: 1, isArchi }
        return { monsterId, isNew: true, newLevel: 1, isArchi }
    }

    const entry = state.collection[monsterId]
    // Migration : anciennes entrées sans drops
    if (entry.drops === undefined) entry.drops = entry.level * (entry.level + 1) / 2

    const oldLevel = entry.level
    entry.drops++
    entry.level = _familiarLevelFromDrops(entry.drops)
    if (isArchi) entry.isArchi = true  // une fois archi, toujours archi
    return { monsterId, isNew: false, newLevel: entry.level, leveledUp: entry.level > oldLevel, isArchi }
}

// ─── Énutrof : membre actif est-il un Énutrof ? ───────────────────────────────

function _isEnutrofActive() {
    if (typeof combat === 'undefined' || !combat) return false
    const m = state.team?.[combat.activeMemberIndex]
    return classes[m?.classId]?.passive?.id === 'enutrof'
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
    const skullBonus   = [0, 0.10, 0.15, 0.20][state.skullLevel] || 0
    const dropBonus    = (famBonuses.dropRate || 0) / 100 + (equipBonuses.dropRate || 0) / 100 + enutrofBonus + skullBonus

    // Calcule la chance globale de drop (hors pierres d'âme et clés de donjon)
    const itemEntries = lootTable.filter(e => e.itemId !== 'pierreDame' && e.itemId !== 'pierreDameGardien' && !e.isKey)
    const totalChance = Math.min(0.95, itemEntries.reduce((sum, e) => sum + e.dropRate, 0) + dropBonus)

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

    // Items sans levelMax (ressources, clés) : empilement par count uniquement
    if (!itm.levelMax) {
        if (!state.inventory[itemId]) state.inventory[itemId] = { count: 0 }
        state.inventory[itemId].count = (state.inventory[itemId].count || 0) + 1
        return { itemId, level: 0, leveledUp: false, convertedToKamas: false }
    }

    if (!state.inventory[itemId]) {
        state.inventory[itemId] = { level: 1, count: 1 }
        return { itemId, level: 1, leveledUp: true, convertedToKamas: false }
    }

    const current = state.inventory[itemId]
    const maxLvl  = itm.levelMax

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
    const dropBonus    = (famBonuses.dropRate || 0) / 100 + (equipBonuses.dropRate || 0) / 100

    if (enemy.isArchi) {
        // Archimonstre / Archiboss : capture garantie à 100%
        familiarDrop = _captureFamiliar(enemy.id, true)
        if (familiarDrop) state.session.dropCount++
    } else {
        const baseChance = soulStoneEntry
            ? soulStoneEntry.dropRate
            : (monsters[enemy.id]?.dropRate ?? 0)
        const dropChance = Math.min(0.95, baseChance + dropBonus)

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
