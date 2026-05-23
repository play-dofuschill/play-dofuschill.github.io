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
    enutrofe: (s) => s.kamas >= 100,

    xelor: (s) => s.defeatedBosses?.includes('comteHarebourg'),

    huppermage: (s) => {
        const required = [
            'kwakereFlamme', 'kwakereGlace', 'kwakereTerre', 'kwakereVent',
            'kwakFlamme', 'kwakGlace', 'kwakTerre', 'kwakVent',
            'scarafeuilleBlanc', 'scarafeuilleVert', 'scarafeuilleBleu', 'scarafeuilleRouge', 'scarafeuilleNoir',
            'scrarabossDoree', 'kwakwa',
        ]
        return required.every(id => (s.collection[id]?.drops ?? 0) >= 1)
    },
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
