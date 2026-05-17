// engine/dailyRoll.js — Tirage journalier des zones DofusChill

// Paliers de déblocage.
// Règle de chevauchement : zone lvl 10-30 → maxLevel=30 → palier "≤30" → exige un boss lvl 15.
// anyBossOf : n'importe lequel de ces boss suffit à valider le palier.
// hint      : texte affiché dans l'overlay de verrouillage.
const UNLOCK_TIERS = [
    // Boss lvl 15 → zones maxLevel 21-30  (Champs/Plage Astrub 10-30, donjons lvl 25)
    { anyBossOf: ['kardorim'],                      unlocksMaxLevel: 30, hint: 'le Kardorim' },
    // Boss lvl 25 → zones maxLevel 31-40  (Tainela 20-40, Donjon Bouftou lvl 35)
    { anyBossOf: ['mobLeponge', 'tournesolAffame'], unlocksMaxLevel: 40, hint: 'un boss de niveau 25' },
    // Boss lvl 35 → zones maxLevel 41-60
    { anyBossOf: ['bouftouRoyal'],                  unlocksMaxLevel: 60, hint: 'le Bouftou Royal' },
    // Futurs paliers — décommenter au fur et à mesure
    // Boss lvl 45 → zones maxLevel 61-80
    // { anyBossOf: ['...'], unlocksMaxLevel: 80,  hint: 'un boss de niveau 45' },
    // Boss lvl 55 → zones maxLevel 81-100
    // { anyBossOf: ['...'], unlocksMaxLevel: 100, hint: 'un boss de niveau 55' },
    // Boss lvl 75 → zones maxLevel 101-120
    // { anyBossOf: ['...'], unlocksMaxLevel: 120, hint: 'un boss de niveau 75' },
    // Boss lvl 95 → zones maxLevel 121-140
    // { anyBossOf: ['...'], unlocksMaxLevel: 140, hint: 'un boss de niveau 95' },
    // Boss lvl 115 → zones maxLevel 141-160
    // { anyBossOf: ['...'], unlocksMaxLevel: 160, hint: 'un boss de niveau 115' },
    // Boss lvl 135 → zones maxLevel 161-180
    // { anyBossOf: ['...'], unlocksMaxLevel: 180, hint: 'un boss de niveau 135' },
    // Boss lvl 155 → zones maxLevel 181-200
    // { anyBossOf: ['...'], unlocksMaxLevel: 200, hint: 'un boss de niveau 155' },
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
const EVENT_REFRESH_DAYS = 3

function _todayStr() {
    return new Date().toISOString().slice(0, 10)
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

// Retourne true si la zone est accessible d'après les boss battus.
function isZoneAccessible(area) {
    if (area.type === 'event') return true   // Les événements sont toujours accessibles
    if (area.maxLevel <= 20 || area.id.toLowerCase().includes('incarnam')) return true
    for (const tier of UNLOCK_TIERS) {
        if (area.maxLevel <= tier.unlocksMaxLevel)
            return tier.anyBossOf.some(id => (state.defeatedBosses || []).includes(id))
    }
    return false
}

// Retourne le texte d'indication pour l'overlay de verrouillage, ou null si toujours accessible.
function getZoneUnlockHint(area) {
    if (area.type === 'event') return null
    if (area.maxLevel <= 20 || area.id.toLowerCase().includes('incarnam')) return null
    for (const tier of UNLOCK_TIERS) {
        if (area.maxLevel <= tier.unlocksMaxLevel) return tier.hint
    }
    return null
}

// Génère / rafraîchit les pools journaliers. Appelé à chaque ouverture du menu zones.
function refreshDailyPools() {
    const today     = _todayStr()
    const bossCount = (state.defeatedBosses || []).length
    const seed      = _dateSeed(today)

    // Wild : stale si nouveau jour OU si un boss a été battu depuis le dernier tirage
    const wildStale = !state.dailyPool ||
        state.dailyPool.date !== today ||
        state.dailyPool.bossCount !== bossCount

    if (wildStale) {
        const accessible = Object.values(areas).filter(a =>
            (a.type || 'wild') === 'wild' && isZoneAccessible(a)
        )
        const picked = new Set()
        const zones  = []
        for (let i = 0; i < WILD_SLOTS.length; i++) {
            const { min, max } = WILD_SLOTS[i]
            const candidates = accessible.filter(a =>
                !picked.has(a.id) && a.minLevel <= max && a.maxLevel >= min
            )
            if (candidates.length === 0) continue
            // Seed différente par slot pour éviter de toujours choisir le même index
            let s = (seed + i * 2654435761) >>> 0
            s = (Math.imul(s, 1664525) + 1013904223) >>> 0
            const choice = candidates[s % candidates.length]
            picked.add(choice.id)
            zones.push(choice.id)
        }
        state.dailyPool = { date: today, bossCount, zones }
    }

    // Événements : refresh tous les EVENT_REFRESH_DAYS jours (pas lié aux boss)
    const eventStale = !state.eventPool || (() => {
        const ms = new Date(today) - new Date(state.eventPool.date)
        return ms / 86400000 >= EVENT_REFRESH_DAYS
    })()

    if (eventStale) {
        const allEvents = Object.values(areas).filter(a => a.type === 'event')
        state.eventPool = {
            date: today,
            zones: _seededShuffle(allEvents, seed ^ 0xdeadbeef).slice(0, DAILY_EVENT_MAX).map(a => a.id)
        }
    }
}

// Labels de countdown pour l'UI.
function nextWildRefreshLabel() {
    const now  = new Date()
    const next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1))
    const secs = Math.floor((next - now) / 1000)
    const h    = Math.floor(secs / 3600)
    const m    = Math.floor((secs % 3600) / 60)
    if (h > 0) return `${h}h${m > 0 ? ` ${m}min` : ''}`
    if (m > 0) return `${m} min`
    return 'bientôt'
}

function nextEventRefreshLabel() {
    if (!state.eventPool) return '3 jours'
    const today   = _todayStr()
    const elapsed = Math.floor((new Date(today) - new Date(state.eventPool.date)) / 86400000)
    const rem     = EVENT_REFRESH_DAYS - elapsed
    if (rem <= 1) return 'demain'
    return `${rem} jours`
}
