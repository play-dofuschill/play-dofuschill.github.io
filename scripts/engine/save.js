// save.js — Sauvegarde / chargement DofusChill (localStorage)

const SAVE_KEY = 'dofuschill_v01'

let _clearingData    = false
let _lastSaveFailNotified = false
// loadGame() ne tourne qu'à l'évènement 'load' (initGame), qui peut être retardé de plusieurs
// secondes par le chargement des images/musiques. Tant qu'il n'a pas tourné, `state` contient
// encore ses valeurs par défaut (vierges) — il ne faut surtout pas les sauvegarder, sinon
// l'autosave (toutes les 5s) ou un changement d'onglet pendant ce délai écraserait la vraie
// sauvegarde du joueur avec un état neuf.
let _gameLoaded = false

function saveGame() {
    if (_clearingData) return
    if (!_gameLoaded) return

    // Snapshote l'état du combat en cours avant de sérialiser.
    // Isolé : une exception ici (état de combat incohérent) ne doit jamais empêcher
    // la sauvegarde du reste de la progression (inventaire, collection, kamas...).
    try {
        if (typeof _syncCombatToState === 'function') _syncCombatToState()
    } catch (e) {
        console.error('[saveGame] _syncCombatToState a échoué — snapshot de combat ignoré :', e)
    }

    // Sync de l'équipe active dans previewTeams avant la sauvegarde,
    // et classEquip.level/exp depuis tous les previewTeams
    // (les membres qui sont dans une équipe et qui ont levélé up ne mettent pas à jour classEquip en temps réel)
    try {
        state.previewTeams[state.currentPreviewTeam] = state.team
        if (!state.classEquip) state.classEquip = {}
        for (const teamArr of Object.values(state.previewTeams)) {
            for (const m of (teamArr || [])) {
                if (!m?.classId) continue
                if (!state.classEquip[m.classId]) state.classEquip[m.classId] = {}
                state.classEquip[m.classId].level = m.level
                state.classEquip[m.classId].exp   = m.exp ?? 0
                state.classEquip[m.classId].equip = { ...m.equip }
            }
        }
    } catch (e) {
        console.error('[saveGame] sync previewTeams/classEquip a échoué :', e)
    }

    let saveData
    try {
        saveData = {
            team:               state.team,
            inventory:          state.inventory,
            collection:         state.collection,
            seenMonsters:       state.seenMonsters,
            kamas:              state.kamas,
            ogrines:            state.ogrines || 0,
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
            newlyUnlockedClasses: state.newlyUnlockedClasses || [],
            totalKills:                state.totalKills || 0,
            defeatedBosses:            state.defeatedBosses || [],
            doubleCritAchieved:        state.doubleCritAchieved || false,
            lastFrameRecorded:         state.lastFrameRecorded    || null,
            offlineAutoPilotRemaining: state.offlineAutoPilotRemaining || 0,
            autoPilotAccumulated:      state.autoPilotAccumulated || null,
            savedCombatEnemy:          state.savedCombatEnemy || null,
            savedCombatState:          state.savedCombatState || null,
            savedCombatSummonStack:    state.savedCombatSummonStack || null,
            dungeonAutoRestart:        state.dungeonAutoRestart || false,
            lastAlmanaxDate:           state.lastAlmanaxDate || null,
            dailyPool:                 state.dailyPool  || null,
            eventPool:                 state.eventPool  || null,
            raidPool:                  state.raidPool   || null,
            shopPool:                  state.shopPool      || null,
            shopPurchases:             state.shopPurchases || null,
            skullLevel:                state.skullLevel || 0,
            skullUnequipped:           state.skullUnequipped || null,
            skullRecords:              state.skullRecords || {},
            ownedSkins:                state.ownedSkins || [],
            BossUltime:                state.BossUltime     || null,
            wanted:                    state.wanted         || null,
            visitedAreas:              state.visitedAreas   || [],
            version:                   '0.2'
        }
    } catch (e) {
        console.error('[saveGame] construction de saveData a échoué — sauvegarde annulée :', e)
        return
    }

    try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(saveData))
        _lastSaveFailNotified = false
    } catch(e) {
        console.warn('Impossible de sauvegarder :', e)
        // Évite de spammer l'utilisateur (appelé toutes les 5s) : une seule notif tant que
        // la sauvegarde échoue en continu (quota localStorage dépassé, mode privé, etc.)
        if (!_lastSaveFailNotified) {
            _lastSaveFailNotified = true
            if (typeof showNotification === 'function') {
                showNotification('⚠️ Sauvegarde impossible ! Exporte ta save (menu Options) pour ne rien perdre.', 'error')
            }
        }
    }
}

function loadGame() {
    const raw = localStorage.getItem(SAVE_KEY)
    // À partir d'ici, `state` reflète soit la sauvegarde restaurée, soit un état neuf légitime
    // (aucune sauvegarde trouvée) — dans les deux cas, saveGame() peut désormais écrire sans risque.
    _gameLoaded = true
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
        if (data.ogrines != null)  state.ogrines          = data.ogrines
        if (data.currentArea)      state.currentArea      = data.currentArea
        if (data.hasChosenStarter)   state.hasChosenStarter   = data.hasChosenStarter
        if (data.theme)              state.theme              = data.theme
        if (data.tutorial)           state.tutorial           = data.tutorial
        if (data.previewTeams)       state.previewTeams       = data.previewTeams
        if (data.currentPreviewTeam) state.currentPreviewTeam = data.currentPreviewTeam
        if (data.classEquip)         state.classEquip         = data.classEquip
        if (data.teamNames)          state.teamNames          = data.teamNames
        if (data.unlockedClasses)    state.unlockedClasses    = data.unlockedClasses
        if (data.newlyUnlockedClasses) state.newlyUnlockedClasses = data.newlyUnlockedClasses
        if (data.totalKills != null)                state.totalKills                = data.totalKills
        if (data.defeatedBosses)                    state.defeatedBosses            = data.defeatedBosses
        if (data.doubleCritAchieved)                state.doubleCritAchieved        = data.doubleCritAchieved
        if (data.isRunning != null)                 state.isRunning                 = data.isRunning
        if (data.lastFrameRecorded != null)         state.lastFrameRecorded         = data.lastFrameRecorded
        if (data.offlineAutoPilotRemaining != null) state.offlineAutoPilotRemaining = data.offlineAutoPilotRemaining
        if (data.autoPilotAccumulated)              state.autoPilotAccumulated      = data.autoPilotAccumulated
        // Migration : offlineAutoPilotRemaining peut être stale (tickets restants mais autopilote non actif).
        // Si autoPilotAccumulated est null, l'autopilote n'était pas en cours → on remet à 0.
        if (state.offlineAutoPilotRemaining > 0 && !state.autoPilotAccumulated) {
            state.offlineAutoPilotRemaining = 0
        }
        if (data.savedCombatEnemy)                  state.savedCombatEnemy          = data.savedCombatEnemy
        if (data.savedCombatState)                  state.savedCombatState          = data.savedCombatState
        if (data.savedCombatSummonStack)             state.savedCombatSummonStack    = data.savedCombatSummonStack
        if (data.dungeonAutoRestart != null)        state.dungeonAutoRestart        = data.dungeonAutoRestart
        if (data.lastAlmanaxDate)                   state.lastAlmanaxDate           = data.lastAlmanaxDate
        if (data.dailyPool)                         state.dailyPool                 = data.dailyPool
        if (data.eventPool)                         state.eventPool                 = data.eventPool
        if (data.raidPool)                          state.raidPool                  = data.raidPool
        if (data.shopPool)                          state.shopPool                  = data.shopPool
        if (data.shopPurchases)                     state.shopPurchases              = data.shopPurchases
        if (data.skullLevel != null)                state.skullLevel                = data.skullLevel
        if (data.skullUnequipped != null)           state.skullUnequipped           = data.skullUnequipped
        if (data.skullRecords)                      state.skullRecords              = data.skullRecords
        if (data.ownedSkins)                        state.ownedSkins                = data.ownedSkins
        if (data.BossUltime || data.Boss_Ultime)     state.BossUltime                = data.BossUltime || data.Boss_Ultime
        if (data.wanted)                                 state.wanted                         = data.wanted
        if (data.visitedAreas)                           state.visitedAreas                   = data.visitedAreas

        // Migration : forgedStat (ancien) → forgedStats (tableau)
        for (const entry of Object.values(state.inventory)) {
            if (entry.forgedStat && !entry.forgedStats) {
                entry.forgedStats = [entry.forgedStat]
                delete entry.forgedStat
            }
        }

        // Migration : vider les familiers équipés qui ne sont plus des familiers de zone valides
        const _allTeams = Object.values(state.previewTeams || {})
        if (state.team) _allTeams.push(state.team)
        for (const teamArr of _allTeams) {
            for (const member of (teamArr || [])) {
                if (!member?.equip) continue
                const famId = member.equip.familier
                if (famId && !familiarById[famId]) member.equip.familier = null
            }
        }

        // Migration : nettoyer les clés fantômes 'anneau1' créées par le bug equipFullPanoplie
        // (le bon slot s'appelle 'anneau', pas 'anneau1')
        const _allTeamsAnneau = [...Object.values(state.previewTeams || {})]
        if (state.team) _allTeamsAnneau.push(state.team)
        for (const teamArr of _allTeamsAnneau) {
            for (const member of (teamArr || [])) {
                if (!member?.equip?.anneau1) continue
                const ghostId = member.equip.anneau1
                if (!member.equip.anneau)       member.equip.anneau  = ghostId
                else if (!member.equip.anneau2) member.equip.anneau2 = ghostId
                delete member.equip.anneau1
            }
        }
        for (const ce of Object.values(state.classEquip || {})) {
            if (!ce?.equip?.anneau1) continue
            const ghostId = ce.equip.anneau1
            if (!ce.equip.anneau)       ce.equip.anneau  = ghostId
            else if (!ce.equip.anneau2) ce.equip.anneau2 = ghostId
            delete ce.equip.anneau1
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
    input.type   = 'file'
    input.accept = '.json'
    input.style.display = 'none'
    document.body.appendChild(input)
    input.onchange = e => {
        const file = e.target.files[0]
        document.body.removeChild(input)
        if (!file) return
        const reader = new FileReader()
        reader.onload = ev => {
            try {
                const data = JSON.parse(ev.target.result)
                _clearingData = true
                localStorage.setItem(SAVE_KEY, JSON.stringify(data))
                location.reload()
            } catch (err) {
                console.error('[importData] fichier illisible :', err)
                showNotification('Fichier de sauvegarde invalide.', 'error')
            }
        }
        // Sans ce handler, un fichier choisi via un picker cloud (Drive/Dropbox/OneDrive)
        // qui échoue à télécharger le contenu localement échoue en silence : aucune erreur,
        // aucun onload, l'utilisateur ne voit rien se passer.
        reader.onerror = () => {
            console.error('[importData] échec de lecture du fichier :', reader.error)
            showNotification('Impossible de lire ce fichier. Enregistre-le d\'abord sur l\'appareil (pas depuis un aperçu cloud), puis réessaie.', 'error')
        }
        reader.readAsText(file)
    }
    input.click()
}

function clearData() {
    _clearingData = true
    localStorage.removeItem(SAVE_KEY)
    location.reload()
}
