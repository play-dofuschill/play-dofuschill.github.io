// engine/loot.js — Système de loot DofusChill

// ─── Capture de familier (Pierre d'âme) ───────────────────────────────────────
// Ajoute le monstre à la collection et retourne les infos pour le résumé.
// Ne révèle rien pendant le combat — la découverte se fait dans showSessionSummary.

function dropsNeededForLevel(level) {
    return Math.max(1, Math.ceil(level / 10))
}

function _captureFamiliar(monsterId) {
    if (!state.collection[monsterId]) {
        state.collection[monsterId] = { drops: 1, level: 1, isArchi: false }
        return { monsterId, isNew: true, newLevel: 1 }
    }

    const entry = state.collection[monsterId]
    // Migration : anciennes entrées sans drops
    if (entry.drops === undefined) entry.drops = entry.level * (entry.level + 1) / 2

    const oldLevel = entry.level
    entry.drops++
    entry.level = _familiarLevelFromDrops(entry.drops)
    return { monsterId, isNew: false, newLevel: entry.level, leveledUp: entry.level > oldLevel }
}

// ─── Drop d'items depuis la loot table d'une zone ────────────────────────────
// La pierreDame est exclue ici — elle est traitée dans processVictoryLoot.

function rollItemDrops(areaId) {
    const area = areas[areaId]
    if (!area || !area.lootTable) return []

    const famBonuses = getAllFamiliarBonuses()
    const dropBonus  = (famBonuses.dropRate || 0) / 100

    // Calcule la chance globale de drop (hors pierreDame et clés de donjon)
    const itemEntries = area.lootTable.filter(e => e.itemId !== 'pierreDame' && !e.isKey)
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
        const kamasGained = 1
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

function processVictoryLoot(enemy) {
    state.session.killCount++

    // XP distribuée par onVictory (combat.js) via calculateXPReward + giveXP
    const xpResults = []

    // Pierre d'âme → capture mystère du familier
    // Si la zone a une pierreDame dans sa loot table, on utilise son dropRate.
    // Sinon on utilise le dropRate propre au monstre (fallback).
    let familiarDrop = null
    const area = areas[state.currentArea]
    const pierreDameEntry = area?.lootTable?.find(e => e.itemId === 'pierreDame')

    const famBonuses  = getAllFamiliarBonuses()
    const dropBonus   = (famBonuses.dropRate || 0) / 100
    const baseChance  = pierreDameEntry
        ? pierreDameEntry.dropRate
        : (monsters[enemy.id]?.dropRate ?? 0)
    const dropChance  = Math.min(0.95, baseChance + dropBonus)

    if (Math.random() < dropChance) {
        familiarDrop = _captureFamiliar(enemy.id)
        if (familiarDrop) state.session.dropCount++
    }

    // Items ordinaires (pierreDame et clés exclues du pool principal)
    const itemDrops = rollItemDrops(state.currentArea)

    // 3e pull indépendant : clé de donjon
    const keyDrop = rollKeyDrop(state.currentArea)
    if (keyDrop) itemDrops.push(keyDrop)

    // Caisse d'équipement : indicateur visuel seulement, pas stocké en inventaire
    const equipDrops = itemDrops.filter(d => !item[d.itemId]?.isKey)
    const caisseDropped = equipDrops.length > 0

    saveGame()
    return { xpResults, familiarDrop, itemDrops, caisseDropped }
}
