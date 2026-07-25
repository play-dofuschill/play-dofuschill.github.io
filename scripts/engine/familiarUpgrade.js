// engine/familiarUpgrade.js — Améliorations de familiers (façon forgemagie) DofusChill

// Double le min/max d'une stat de bonus d'un familier. Consomme 1 cristalFamilierDouble + 25 kamas.
function applyFamiliarDoubler(familiarId, bonusStat) {
    const fam = familiarById[familiarId]
    if (!fam?.bonuses?.some(b => b.bonusStat === bonusStat)) return { error: 'STAT_INVALID' }

    const crystalEntry = state.inventory['cristalFamilierDouble']
    if (!crystalEntry || (crystalEntry.count ?? 0) < 1) return { error: 'ITEM_UNAVAILABLE' }
    if (state.kamas < 25) return { error: 'INSUFFICIENT_KAMAS' }

    if (!state.familiarUpgrades[familiarId]) state.familiarUpgrades[familiarId] = {}
    const upg = state.familiarUpgrades[familiarId]
    if (!upg.doubledStats) upg.doubledStats = []
    if (upg.doubledStats.includes(bonusStat)) return { error: 'ALREADY_DOUBLED' }

    const maxSlots = getFamiliarMaxDoubleSlots(fam)
    if (upg.doubledStats.length >= maxSlots) return { error: 'SLOTS_FULL' }

    upg.doubledStats.push(bonusStat)
    crystalEntry.count -= 1
    if (crystalEntry.count <= 0) delete state.inventory['cristalFamilierDouble']
    state.kamas -= 25

    saveGame()
    if (typeof updateKamasDisplay === 'function') updateKamasDisplay()
    return { bonusStat }
}

// Accorde un passif (type 'familiarUpgrade' / familiarUpgradeKind 'passif', ex. cristalFamilierChasse) à un familier.
// Équivalent de la rune de Transcendance : un seul passif actif par familier (peu importe lequel), quel
// que soit le nombre de stats déjà doublées. Consomme 1 exemplaire du cristal + 250 kamas.
// L'effet en combat de chaque passif est codé au cas par cas dans engine/stats.js (dispatch sur passifId).
function applyFamiliarPassif(familiarId, cristalItemId) {
    const fam = familiarById[familiarId]
    if (!fam) return { error: 'FAMILIAR_INVALID' }

    const cristalItm = item[cristalItemId]
    if (!cristalItm || cristalItm.type !== 'familiarUpgrade' || cristalItm.familiarUpgradeKind !== 'passif') {
        return { error: 'ITEM_INVALID' }
    }

    const crystalEntry = state.inventory[cristalItemId]
    if (!crystalEntry || (crystalEntry.count ?? 0) < 1) return { error: 'ITEM_UNAVAILABLE' }
    if (state.kamas < 250) return { error: 'INSUFFICIENT_KAMAS' }

    if (!state.familiarUpgrades[familiarId]) state.familiarUpgrades[familiarId] = {}
    const upg = state.familiarUpgrades[familiarId]
    if (upg.passifId) return { error: 'PASSIF_ALREADY_APPLIED' }

    upg.passifId = cristalItemId
    crystalEntry.count -= 1
    if (crystalEntry.count <= 0) delete state.inventory[cristalItemId]
    state.kamas -= 250

    saveGame()
    if (typeof updateKamasDisplay === 'function') updateKamasDisplay()
    return { cristalItemId }
}
