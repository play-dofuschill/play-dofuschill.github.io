// engine/dailyRoll.js — Tirage journalier des zones DofusChill

// Paliers de déblocage.
// Règle de chevauchement : zone lvl 10-30 → maxLevel=30 → palier "≤30" → exige un boss lvl 15.
// anyBossOf : n'importe lequel de ces boss suffit à valider le palier.
// hint      : texte affiché dans l'overlay de verrouillage.
const UNLOCK_TIERS = [
    { anyBossOf: ['kardorim'],
      unlocksMaxLevel: 30,  hint: 'le Kardorim' },
    { anyBossOf: ['mobLeponge', 'tournesolAffame'],
      unlocksMaxLevel: 40,  hint: 'un boss de niveau 25' },
    { anyBossOf: ['bouftouRoyal', 'directeur_grunob'],
      unlocksMaxLevel: 50,  hint: 'un boss de niveau 35' },
    { anyBossOf: ['scarabosse_dore', 'chafer_ronin', 'batofu', 'kankreblath'],
      unlocksMaxLevel: 60,  hint: 'un boss de niveau 45' },
    { anyBossOf: ['kwakwa', 'bworkette', 'coffre_des_forgerons', 'corailleur_magistral', 'shin_larve', 'rakoopeur'],
      unlocksMaxLevel: 70,  hint: 'un boss de niveau 55' },
    { anyBossOf: ['blopCocoRoyal', 'blopGriotteRoyal', 'blopIndigoRoyal', 'blopReinetteRoyal', 'wa_wabbit', 'kanniboul_ebil', 'gourlo_le_terrible'],
      unlocksMaxLevel: 80,  hint: 'un boss de niveau 65' },
    { anyBossOf: ['mantiscore', 'craqueleur_legendaire', 'nelween'],
      unlocksMaxLevel: 90,  hint: 'un boss de niveau 75' },
    { anyBossOf: ['draegnerys', 'wa_wobot'],
      unlocksMaxLevel: 100, hint: 'un boss de niveau 85' },
    { anyBossOf: ['abraknydeAncestral', 'koulosse', 'reine_nyee', 'le_chouque', 'choudini'],
      unlocksMaxLevel: 110, hint: 'un boss de niveau 95' },
    { anyBossOf: ['dragonCochon', 'silf_le_rasboul_majeur', 'maitre_des_pantins', 'moon', 'kharnozor'],
      unlocksMaxLevel: 120, hint: 'un boss de niveau 105' },
    { anyBossOf: ['meulou', 'rat_noir', 'rat_blanc', 'maitre_corbac', 'damadrya'],
      unlocksMaxLevel: 130, hint: 'un boss de niveau 115' },
    { anyBossOf: ['mansot_royal', 'minotoror', 'crocabulia', 'royalmouth', 'skeunk'],
      unlocksMaxLevel: 140, hint: 'un boss de niveau 125' },
    { anyBossOf: ['tofu_royal', 'blop_multicolore_royal', 'el_piko', 'nagate', 'tanukoui_san'],
      unlocksMaxLevel: 150, hint: 'un boss de niveau 135' },
    { anyBossOf: ['hell_mina', 'haute_truche', 'tynril_consterne', 'tynril_deconcerte', 'tynril_perfide', 'tynril_ahuri', 'shihan', 'hanshi', 'founoroshi'],
      unlocksMaxLevel: 160, hint: 'un boss de niveau 145' },
    { anyBossOf: ['phossile', 'chene_mou', 'sphincter_cell', 'ben_le_ripate'],
      unlocksMaxLevel: 170, hint: 'un boss de niveau 155' },
    { anyBossOf: ['minotot', 'minotoror', 'obsidiantre', 'kimbo', 'kanigroula', 'shogun_tofugawa'],
      unlocksMaxLevel: 180, hint: 'un boss de niveau 165' },
    { anyBossOf: ['fuji_givrefoux_nourriciere', 'tengu_givrefoux', 'pere_ver', 'koumiho', 'superviz_uf'],
      unlocksMaxLevel: 190, hint: 'un boss de niveau 175' },
    { anyBossOf: ['ougah', 'kolosso', 'professeur_xa', 'bworker', 'grolloum', 'korriandre'],
      unlocksMaxLevel: 200, hint: 'un boss de niveau 185' },
    { anyBossOf: ['glourseleste', 'ombre', 'comte_razof', 'barberyl_clochecuivre'],
      unlocksMaxLevel: 230, hint: 'un boss de niveau 195' },
]

// Un slot = une zone tirée aléatoirement parmi les zones accessibles dont le range chevauche la tranche.
// Une zone déjà tirée est exclue des slots suivants (pas de doublon).
const WILD_SLOTS = [
    { min: 1,   max: 20  },   // slot  1 — incarnam / départ (obligatoire)
    { min: 10,  max: 40  },   // slot  2
    { min: 30,  max: 60  },   // slot  3
    { min: 50,  max: 80  },   // slot  4
    { min: 70,  max: 100 },   // slot  5
    { min: 90,  max: 120 },   // slot  6
    { min: 110, max: 140 },   // slot  7
    { min: 130, max: 160 },   // slot  8
    { min: 150, max: 180 },   // slot  9
    { min: 170, max: 200 },   // slot 10
]

const DAILY_EVENT_MAX    = 5
const EVENT_REFRESH_DAYS = 1
const DAILY_RAID_MAX     = 3
const RAID_REFRESH_DAYS  = 1

function _todayStr() {
    return new Date().toISOString().slice(0, 10)
}

// Identifiant de demi-journée UTC : "YYYY-MM-DD-0" (minuit–midi) ou "YYYY-MM-DD-1" (midi–minuit)
function _periodStr() {
    const now = new Date()
    return `${now.toISOString().slice(0, 10)}-${now.getUTCHours() < 12 ? 0 : 1}`
}

function _dateSeed(str) {
    return str.split('').reduce((a, c) => ((a * 31 + c.charCodeAt(0)) | 0), 0)
}

function _seededShuffle(arr, seed) {
    const a = [...arr]
    let s   = seed >>> 0
    for (let i = a.length - 1; i > 0; i--) {
        s = (Math.imul(s, 1664525) + 1013904223) >>> 0
        const j = s % (i + 1);
        [a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

// Retourne true si la saison d'une zone saisonnière est active.
// Gère le chevauchement d'année (ex: déc → jan) quand start > end.
function isSeasonActive(season) {
    if (!season) return true
    const now   = new Date()
    const today = (now.getMonth() + 1) * 100 + now.getDate()
    const start = season.start[0] * 100 + season.start[1]
    const end   = season.end[0]   * 100 + season.end[1]
    return start <= end
        ? today >= start && today <= end
        : today >= start || today <= end
}

// Retourne true si la zone est accessible d'après les boss battus.
function isZoneAccessible(area) {
    if (area.type === 'event')      return true
    if (area.type === 'raid')       return true
    if (area.type === 'saisonnier') return isSeasonActive(area.season)
    if (area.maxLevel <= 20 || area.id.toLowerCase().includes('incarnam')) return true
    for (const tier of UNLOCK_TIERS) {
        if (area.maxLevel <= tier.unlocksMaxLevel)
            return tier.anyBossOf.some(id => (state.defeatedBosses || []).includes(id))
    }
    return false
}

// Retourne le texte d'indication pour l'overlay de verrouillage, ou null si toujours accessible.
function getZoneUnlockHint(area) {
    if (area.type === 'event')      return null
    if (area.type === 'raid')       return null
    if (area.type === 'saisonnier') return null
    if (area.maxLevel <= 20 || area.id.toLowerCase().includes('incarnam')) return null
    for (const tier of UNLOCK_TIERS) {
        if (area.maxLevel <= tier.unlocksMaxLevel) return tier.hint
    }
    return null
}

// Génère / rafraîchit les pools journaliers. Appelé à chaque ouverture du menu zones.
function refreshDailyPools() {
    const today      = _todayStr()
    const period     = _periodStr()
    const wildSeed   = _dateSeed(period)   // change deux fois par jour (minuit + midi UTC)
    const dailySeed  = _dateSeed(today)    // change une fois par jour (minuit UTC)

    // Wild : stale si nouvelle demi-journée (bi-journalier)
    const wildStale = !state.dailyPool || state.dailyPool.period !== period

    if (!wildStale && state.dailyPool?.zones) {
        // Nettoyer le pool existant : retirer les zones devenues inaccessibles (ex. typo corrigée)
        const cleaned = state.dailyPool.zones.filter(id => {
            const a = areas[id]
            return a && isZoneAccessible(a)
        })
        if (cleaned.length !== state.dailyPool.zones.length) {
            state.dailyPool.zones = cleaned.includes('cimetiereincarnam')
                ? cleaned
                : ['cimetiereincarnam', ...cleaned]
        }

        // Ajouter les zones devenues accessibles depuis la génération du pool (ex. boss battu en cours de journée)
        const poolSet    = new Set(state.dailyPool.zones)
        const poolRanges = new Set(
            state.dailyPool.zones.map(id => areas[id]).filter(Boolean).map(a => `${a.minLevel}-${a.maxLevel}`)
        )
        for (let i = 0; i < WILD_SLOTS.length; i++) {
            const { min, max } = WILD_SLOTS[i]
            const candidates = Object.values(areas).filter(a =>
                (a.type || 'wild') === 'wild' &&
                isZoneAccessible(a) &&
                !poolSet.has(a.id) &&
                !poolRanges.has(`${a.minLevel}-${a.maxLevel}`) &&
                a.minLevel <= max && a.maxLevel >= min
            )
            if (candidates.length === 0) continue
            let s = (wildSeed + i * 2654435761) >>> 0
            s = (Math.imul(s, 1664525) + 1013904223) >>> 0
            const choice = candidates[s % candidates.length]
            poolSet.add(choice.id)
            poolRanges.add(`${choice.minLevel}-${choice.maxLevel}`)
            state.dailyPool.zones.push(choice.id)
        }
    }

    if (wildStale) {
        const accessible = Object.values(areas).filter(a =>
            (a.type || 'wild') === 'wild' && isZoneAccessible(a)
        )
        const picked       = new Set()
        const pickedRanges = new Set()  // évite deux zones avec le même minLevel-maxLevel
        const zones        = []

        // Toujours forcer cimetiereincarnam comme premier slot (zone de départ obligatoire)
        const incarnam = areas['cimetiereincarnam']
        if (incarnam) {
            picked.add('cimetiereincarnam')
            pickedRanges.add(`${incarnam.minLevel}-${incarnam.maxLevel}`)
            zones.push('cimetiereincarnam')
        }

        for (let i = 0; i < WILD_SLOTS.length; i++) {
            const { min, max } = WILD_SLOTS[i]
            const candidates = accessible.filter(a =>
                !picked.has(a.id) &&
                !pickedRanges.has(`${a.minLevel}-${a.maxLevel}`) &&
                a.minLevel <= max && a.maxLevel >= min
            )
            if (candidates.length === 0) continue
            // Seed différente par slot pour éviter de toujours choisir le même index
            let s = (wildSeed + i * 2654435761) >>> 0
            s = (Math.imul(s, 1664525) + 1013904223) >>> 0
            const choice = candidates[s % candidates.length]
            picked.add(choice.id)
            pickedRanges.add(`${choice.minLevel}-${choice.maxLevel}`)
            zones.push(choice.id)
        }
        state.dailyPool = { period, zones }
    }

    // Zones saisonnières : injectées dans le pool wild si leur saison est active.
    // Retirées automatiquement lors du prochain refresh si la saison est terminée
    // (le nettoyage du pool non-stale passe par isZoneAccessible qui vérifie isSeasonActive).
    {
        const poolSet = new Set(state.dailyPool.zones)
        for (const area of Object.values(areas)) {
            if (area.type === 'saisonnier' && !area.keyId && isSeasonActive(area.season) && !poolSet.has(area.id)) {
                state.dailyPool.zones.push(area.id)
                poolSet.add(area.id)
            }
        }
    }

    // Événements : refresh journalier (pas lié aux boss)
    const eventStale = !state.eventPool || (() => {
        const ms = new Date(today) - new Date(state.eventPool.date)
        return ms / 86400000 >= EVENT_REFRESH_DAYS
    })()

    if (eventStale) {
        const allEvents = Object.values(areas).filter(a => a.type === 'event')
        state.eventPool = {
            date: today,
            zones: _seededShuffle(allEvents, dailySeed ^ 0xdeadbeef).slice(0, DAILY_EVENT_MAX).map(a => a.id)
        }
    }

    // Raids : refresh journalier
    const raidStale = !state.raidPool || (() => {
        const ms = new Date(today) - new Date(state.raidPool.date)
        return ms / 86400000 >= RAID_REFRESH_DAYS
    })()

    if (raidStale) {
        const allRaids = Object.values(areas).filter(a => a.type === 'raid')
        state.raidPool = {
            date: today,
            zones: _seededShuffle(allRaids, dailySeed ^ 0xc0ffee).slice(0, DAILY_RAID_MAX).map(a => a.id)
        }
    }
}

// Retourne les IDs des donjons liés aux zones sauvages du pool journalier.
// Un donjon est "du jour" si sa zone source (qui droppe sa clé) est dans le pool.
function getDailyDungeons() {
    const poolZoneIds = state.dailyPool?.zones || []

    const keyToDungeonId = {}
    for (const area of Object.values(areas)) {
        if ((area.type === 'dungeon' || area.type === 'saisonnier') && area.keyId)
            keyToDungeonId[area.keyId] = area.id
    }

    const result = []
    const seen   = new Set()
    for (const zoneId of poolZoneIds) {
        const zone = areas[zoneId]
        if (!zone) continue
        for (const drop of (zone.lootTable || [])) {
            if (drop.isKey && keyToDungeonId[drop.itemId] && !seen.has(keyToDungeonId[drop.itemId])) {
                seen.add(keyToDungeonId[drop.itemId])
                result.push(keyToDungeonId[drop.itemId])
            }
        }
    }
    return result
}

// Labels de countdown pour l'UI.
function _countdownLabel(targetMs) {
    const secs = Math.floor((targetMs - Date.now()) / 1000)
    if (secs <= 0) return 'bientôt'
    const h = Math.floor(secs / 3600)
    const m = Math.floor((secs % 3600) / 60)
    if (h > 0) return `${h}h${m > 0 ? ` ${m}min` : ''}`
    if (m > 0) return `${m} min`
    return 'bientôt'
}

function nextWildRefreshLabel() {
    const now = new Date()
    const nextMs = now.getUTCHours() < 12
        ? Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 12)
        : Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)
    return _countdownLabel(nextMs)
}

function nextEventRefreshLabel() {
    const now = new Date()
    return _countdownLabel(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1))
}

function nextRaidRefreshLabel() {
    const now = new Date()
    return _countdownLabel(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1))
}
