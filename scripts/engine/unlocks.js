// engine/unlocks.js — Conditions de déblocage des classes DofusChill
//
// Pour ajouter une classe future :
//   1. Ajouter l'entrée dans CLASS_UNLOCK_CONDITIONS avec sa condition
//   2. Ajouter le texte d'obtention dans CLASS_OBTAIN (ui/team.js)
//
// Variables d'état disponibles dans les conditions :
//   s.totalKills                          — total kills persistant toutes sessions
//   s.defeatedBosses                      — tableau des IDs de boss vaincus au moins une fois
//   s.kamas                               — kamas actuels
//   s.collection                          — { [monsterId]: { level, drops } }
//   s.inventory                           — { [itemId]: { count, level } }
//   s.team                                — membres actifs
//   s.unlockedClasses                     — classes déjà débloquées
//   s.doubleCritAchieved                  — vrai si 3 crits consécutifs ont été infligés

const CLASS_UNLOCK_CONDITIONS = {
    enutrof: (s) => s.kamas >= 100,

    xelor: (s) => s.defeatedBosses?.includes('comteHarebourg'),

    huppermage: (s) => {
        const byElement = [
            ['kwakFlamme', 'kwakereFlamme', 'scarafeuilleRouge'],
            ['kwakGlace',  'kwakereGlace',  'scarafeuilleBleu'],
            ['kwakTerre',  'kwakereTerre',  'scarafeuilleVert'],
            ['kwakVent',   'kwakereVent',   'scarafeuilleBlanc'],
        ]
        const elementsCovered = byElement.every(group => group.some(id => (s.collection[id]?.drops ?? 0) >= 1))
        const bossesLeveled   = ['scarabossDoree', 'kwakwa'].every(id => (s.collection[id]?.level ?? 0) >= 10)
        return elementsCovered && bossesLeveled
    },

    sacrieur: (s) => s.totalKills >= 10000,

    osamodas: (s) => Object.values(s.collection).filter(c => (c.drops ?? 0) >= 1).length >= 200,

    zobal: (s) => s.defeatedBosses?.includes('dragonCochon'),

    sram: (s) => {
        const ratItems = Object.values(item).filter(i => i.set === 'panoplie_du_rat_noir' || i.set === 'panoplie_du_rat_blanc')
        return ratItems.length > 0 && ratItems.every(i => (s.inventory[i.id]?.count ?? 0) >= 1)
    },

    feca: (s) => {
        const bouftouRoyalItems = Object.values(item).filter(i => i.set === 'panoplie_du_bouftou_royal')
        return bouftouRoyalItems.length > 0 && bouftouRoyalItems.every(i => (s.inventory[i.id]?.level ?? 0) >= i.itemLevelMax)
    },

    ouginak: (s) => s.defeatedBosses?.includes('meulou'),

    sadida: (s) => s.defeatedBosses?.includes('cheneMou'),

    steamer: (s) => s.defeatedBosses?.includes('hyperscampe'),

    pandawa: (s) => s.defeatedBosses?.includes('kralamourGeant'),

    forgelance: (s) => {
        const highLevelBossIds = ['belladone', 'barberyl_clochecuivre']
        return highLevelBossIds.every(id => s.defeatedBosses?.includes(id))
    },

    ecaflip: (s) => s.doubleCritAchieved === true,
}

function checkClassUnlocks() {
    if (!state.unlockedClasses) state.unlockedClasses = []
    if (!state.newlyUnlockedClasses) state.newlyUnlockedClasses = []
    let anyNew = false
    for (const [classId, condition] of Object.entries(CLASS_UNLOCK_CONDITIONS)) {
        if (state.unlockedClasses.includes(classId)) continue
        if (!classes[classId]) continue
        try {
            if (condition(state)) {
                state.unlockedClasses.push(classId)
                state.newlyUnlockedClasses.push(classId)
                showNotification(`Nouvelle classe débloquée : ${classes[classId].name} !`, 'info')
                anyNew = true
            }
        } catch(e) {
            console.warn(`[unlocks] erreur condition ${classId}:`, e)
        }
    }
    if (anyNew) {
        saveGame()
        updateGuildeUnlockBadge()
    }
}
