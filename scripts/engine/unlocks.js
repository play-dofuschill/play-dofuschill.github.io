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

const CLASS_UNLOCK_CONDITIONS = {
    // Exemples (décommenter et adapter pour chaque future classe) :
    // futurClasse1: (s) => s.defeatedBosses?.includes('kardorim'),
    // futurClasse2: (s) => Object.values(s.collection).filter(f => f.level >= 100).length >= 5,
    // futurClasse3: (s) => s.kamas >= 100,
    // futurClasse4: (s) => s.totalKills >= 1000,
}

function checkClassUnlocks() {
    if (!state.unlockedClasses) state.unlockedClasses = []
    let anyNew = false
    for (const [classId, condition] of Object.entries(CLASS_UNLOCK_CONDITIONS)) {
        if (state.unlockedClasses.includes(classId)) continue
        if (!classes[classId]) continue
        try {
            if (condition(state)) {
                state.unlockedClasses.push(classId)
                showNotification(`Nouvelle classe débloquée : ${classes[classId].name} !`, 'info')
                anyNew = true
            }
        } catch(e) {
            console.warn(`[unlocks] erreur condition ${classId}:`, e)
        }
    }
    if (anyNew) saveGame()
}
