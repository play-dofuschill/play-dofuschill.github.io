// save.js — Sauvegarde / chargement DofusChill (localStorage)

const SAVE_KEY = 'dofuschill_v01'

function saveGame() {
    // Snapshote l'état du combat en cours avant de sérialiser
    if (typeof _syncCombatToState === 'function') _syncCombatToState()

    // Sync de l'équipe active dans previewTeams avant la sauvegarde
    state.previewTeams[state.currentPreviewTeam] = state.team

    const saveData = {
        team:               state.team,
        inventory:          state.inventory,
        collection:         state.collection,
        seenMonsters:       state.seenMonsters,
        kamas:              state.kamas,
        currentArea:        state.currentArea,
        isRunning:          state.isRunning || false,
        hasChosenStarter:   state.hasChosenStarter,
        theme:              state.theme,
        tutorial:           state.tutorial,
        previewTeams:       state.previewTeams,
        currentPreviewTeam: state.currentPreviewTeam,
        classEquip:         state.classEquip,
        teamNames:          state.teamNames,
        unlockedClasses:    state.unlockedClasses || [],
        totalKills:                state.totalKills || 0,
        defeatedBosses:            state.defeatedBosses || [],
        doubleCritAchieved:        state.doubleCritAchieved || false,
        lastFrameRecorded:         state.lastFrameRecorded    || null,
        offlineAutoPilotRemaining: state.offlineAutoPilotRemaining || 0,
        autoPilotAccumulated:      state.autoPilotAccumulated || null,
        savedCombatEnemy:          state.savedCombatEnemy || null,
        savedCombatState:          state.savedCombatState || null,
        dungeonAutoRestart:        state.dungeonAutoRestart || false,
        lastAlmanaxDate:           state.lastAlmanaxDate || null,
        dailyPool:                 state.dailyPool  || null,
        eventPool:                 state.eventPool  || null,
        raidPool:                  state.raidPool   || null,
        shopPool:                  state.shopPool      || null,
        shopPurchases:             state.shopPurchases || null,
        skullLevel:                state.skullLevel || 0,
        skullUnequipped:           state.skullUnequipped || null,
        ownedSkins:                state.ownedSkins || [],
        version:                   '0.2'
    }
    try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(saveData))
    } catch(e) {
        console.warn('Impossible de sauvegarder :', e)
    }
}

function loadGame() {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return false
    try {
        const data = JSON.parse(raw)
        if (data.team)             state.team             = data.team
        if (data.inventory)        state.inventory        = data.inventory
        // Migration : caisse d'équipement ne doit pas persister en inventaire
        delete state.inventory['caisseEquipement']
        if (data.collection)       state.collection       = data.collection
        if (data.seenMonsters)     state.seenMonsters     = data.seenMonsters
        if (data.kamas != null)    state.kamas            = data.kamas
        if (data.currentArea)      state.currentArea      = data.currentArea
        if (data.hasChosenStarter)   state.hasChosenStarter   = data.hasChosenStarter
        if (data.theme)              state.theme              = data.theme
        if (data.tutorial)           state.tutorial           = data.tutorial
        if (data.previewTeams)       state.previewTeams       = data.previewTeams
        if (data.currentPreviewTeam) state.currentPreviewTeam = data.currentPreviewTeam
        if (data.classEquip)         state.classEquip         = data.classEquip
        if (data.teamNames)          state.teamNames          = data.teamNames
        if (data.unlockedClasses)    state.unlockedClasses    = data.unlockedClasses
        if (data.totalKills != null)                state.totalKills                = data.totalKills
        if (data.defeatedBosses)                    state.defeatedBosses            = data.defeatedBosses
        if (data.doubleCritAchieved)                state.doubleCritAchieved        = data.doubleCritAchieved
        if (data.isRunning != null)                 state.isRunning                 = data.isRunning
        if (data.lastFrameRecorded != null)         state.lastFrameRecorded         = data.lastFrameRecorded
        if (data.offlineAutoPilotRemaining != null) state.offlineAutoPilotRemaining = data.offlineAutoPilotRemaining
        if (data.autoPilotAccumulated)              state.autoPilotAccumulated      = data.autoPilotAccumulated
        if (data.savedCombatEnemy)                  state.savedCombatEnemy          = data.savedCombatEnemy
        if (data.savedCombatState)                  state.savedCombatState          = data.savedCombatState
        if (data.dungeonAutoRestart != null)        state.dungeonAutoRestart        = data.dungeonAutoRestart
        if (data.lastAlmanaxDate)                   state.lastAlmanaxDate           = data.lastAlmanaxDate
        if (data.dailyPool)                         state.dailyPool                 = data.dailyPool
        if (data.eventPool)                         state.eventPool                 = data.eventPool
        if (data.raidPool)                          state.raidPool                  = data.raidPool
        if (data.shopPool)                          state.shopPool                  = data.shopPool
        if (data.shopPurchases)                     state.shopPurchases              = data.shopPurchases
        if (data.skullLevel != null)                state.skullLevel                = data.skullLevel
        if (data.skullUnequipped != null)           state.skullUnequipped           = data.skullUnequipped
        if (data.ownedSkins)                        state.ownedSkins                = data.ownedSkins

        // Migration : forgedStat (ancien) → forgedStats (tableau)
        for (const entry of Object.values(state.inventory)) {
            if (entry.forgedStat && !entry.forgedStats) {
                entry.forgedStats = [entry.forgedStat]
                delete entry.forgedStat
            }
        }

        // Migration : si previewTeams[clé active] est vide mais state.team ne l'est pas, sync
        const curKey = state.currentPreviewTeam || 'preview1'
        if (state.team.length > 0 &&
            (!state.previewTeams[curKey] || state.previewTeams[curKey].length === 0)) {
            state.previewTeams[curKey] = state.team
        } else if (Array.isArray(state.previewTeams[curKey]) && state.previewTeams[curKey].length > 0) {
            // Reconstruire state.team depuis previewTeams pour garantir la cohérence
            state.team = state.previewTeams[curKey].filter(Boolean)
        }

        return true
    } catch(e) {
        console.warn('Sauvegarde corrompue, réinitialisation :', e)
        return false
    }
}

function exportData() {
    const raw  = localStorage.getItem(SAVE_KEY) || '{}'
    const blob = new Blob([raw], { type: 'application/json' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `dofuschill_save_${new Date().toISOString().slice(0,10)}.json`
    a.click()
    URL.revokeObjectURL(url)
}

function importData() {
    const input = document.createElement('input')
    input.type  = 'file'
    input.accept = '.json'
    input.onchange = e => {
        const file = e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = ev => {
            try {
                const data = JSON.parse(ev.target.result)
                localStorage.setItem(SAVE_KEY, JSON.stringify(data))
                location.reload()
            } catch {
                showNotification('Fichier de sauvegarde invalide.', 'error')
            }
        }
        reader.readAsText(file)
    }
    input.click()
}

function clearData() {
    localStorage.removeItem(SAVE_KEY)
    location.reload()
}
