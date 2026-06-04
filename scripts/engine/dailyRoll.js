// engine/dailyRoll.js — Tirage journalier des zones DofusChill

// Paliers de déblocage.
// Règle de chevauchement : zone lvl 10-30 → maxLevel=30 → palier "≤30" → exige un boss lvl 15.
// anyBossOf : n'importe lequel de ces boss suffit à valider le palier.
// hint      : texte affiché dans l'overlay de verrouillage.
const UNLOCK_TIERS = [
    // Boss lvl 15 → zones maxLevel 21-30  (Champs/Plage Astrub 10-30, donjons lvl 25)
    { anyBossOf: ['kardorim'],                                                                    unlocksMaxLevel: 30,  hint: 'le Kardorim' },
    // Boss lvl 25 → zones maxLevel 31-40  (Tainela 20-40, Donjon Bouftou lvl 35)
    { anyBossOf: ['mobLeponge', 'tournesolAffame'],                                               unlocksMaxLevel: 40,  hint: 'un boss de niveau 25' },
    // Boss lvl 35 → zones maxLevel 41-50 (scaraboss dorée)
    { anyBossOf: ['bouftouRoyal'],                                                                unlocksMaxLevel: 50,  hint: 'un boss de niveau 35' },
    // Boss lvl 45 → zones maxLevel 51-60 (nid du kwakwa)
    { anyBossOf: ['scrarabossDoree'],                                                             unlocksMaxLevel: 60,  hint: 'un boss de niveau 45' },
    // Boss lvl 55 → zones maxLevel 61-70  (Blops 50-70)
    { anyBossOf: ['kwakwa'],                                                                      unlocksMaxLevel: 70,  hint: 'un boss de niveau 55' },
    // Boss lvl 65 → zones maxLevel 71-80  (Plateau Mantiscore 60-80)
    { anyBossOf: ['blopCocoRoyal', 'blopGriotteRoyal', 'blopIndigoRoyal', 'blopReinetteRoyal'], unlocksMaxLevel: 80,  hint: 'un boss de niveau 65' },
    // Boss lvl 75 → zones maxLevel 81-90  (Nids Dragaeufs 70-90)
    { anyBossOf: ['mantiscore'],                                                                  unlocksMaxLevel: 90,  hint: 'un boss de niveau 75' },
    // Boss lvl 85 → zones maxLevel 91-100  (Forêt Abraknydes 80-100)
    { anyBossOf: ['draegnerys'],                                                                  unlocksMaxLevel: 100, hint: 'un boss de niveau 85' },
    // Boss lvl 95 → zones maxLevel 101-110  (Ferme Dragon Cochon 90-110)
    { anyBossOf: ['abraknydeAncestral'],                                                          unlocksMaxLevel: 110, hint: 'un boss de niveau 95' },
    // Boss lvl 105 → zones maxLevel 111-120  (Landes Meulou + Canyons Rat 100-120)
    { anyBossOf: ['dragonCochon'],                                                                unlocksMaxLevel: 120, hint: 'un boss de niveau 105' },
    // Boss lvl 115 → zones maxLevel 121-130  (Plaines Boufmouth + Galeries Mansot 110-130)
    { anyBossOf: ['meulou', 'ratNoir', 'ratBlanc'],                                              unlocksMaxLevel: 130, hint: 'un boss de niveau 115' },
    // Boss lvl 125 → zones maxLevel 131-140  (Forêt Tofu Royal 120-140)
    { anyBossOf: ['boufmouthRoyal', 'mansotRoyal'],                                              unlocksMaxLevel: 140, hint: 'un boss de niveau 125' },
    // Boss lvl 135 → zones maxLevel 141-150  (Forêt Hell Mina + Monts Truche 130-150)
    { anyBossOf: ['tofuRoyal'],                                                                   unlocksMaxLevel: 150, hint: 'un boss de niveau 135' },
    // Boss lvl 145 → zones maxLevel 151-160  (Grottes Phossiles + Forêt Chêne Mou 140-160)
    { anyBossOf: ['hellMina', 'hauteTruche'],                                                     unlocksMaxLevel: 160, hint: 'un boss de niveau 145' },
    // Boss lvl 155 → zones maxLevel 161-170  (Labyrinthe Minotots + Volcans Obsidiantre 150-170)
    { anyBossOf: ['phossile', 'cheneMou'],                                                        unlocksMaxLevel: 170, hint: 'un boss de niveau 155' },
    // Boss lvl 165 → zones maxLevel 171-180  (Sommets Tengu Givrefoux 160-180)
    { anyBossOf: ['minotot', 'minotoror', 'obsidiantre'],                                         unlocksMaxLevel: 180, hint: 'un boss de niveau 165' },
    // Boss lvl 175 → zones maxLevel 181-190  (Jungle Ougah + Plaines Kolosso 170-190)
    { anyBossOf: ['fujiGivrefoux', 'tenguGivrefoux'],                                             unlocksMaxLevel: 190, hint: 'un boss de niveau 175' },
    // Boss lvl 185 → zones maxLevel 191-200  (Côtes Glourceleste 180-200)
    { anyBossOf: ['ougah', 'kolosso', 'professeurXa'],                                            unlocksMaxLevel: 200, hint: 'un boss de niveau 185' },
    // Boss lvl 195 → zones maxLevel 201+  (Domaine Harebourg 200-230)
    { anyBossOf: ['glourceleste'],                                                                  unlocksMaxLevel: 230, hint: 'un boss de niveau 195' },
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

const DAILY_EVENT_MAX    = 3
const EVENT_REFRESH_DAYS = 3
const DAILY_RAID_MAX     = 2
const RAID_REFRESH_DAYS  = 3

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
    if (area.type === 'event') return true
    if (area.type === 'raid')  return true
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
    if (area.type === 'raid')  return null
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

        // Garantir au moins une zone Incarnam/départ (maxLevel ≤ 20) dans le pool
        const starters = accessible.filter(a => a.maxLevel <= 20)
        if (starters.length > 0) {
            let s = (seed * 2654435761) >>> 0
            s = (Math.imul(s, 1664525) + 1013904223) >>> 0
            const starter = starters[s % starters.length]
            picked.add(starter.id)
            zones.push(starter.id)
        }

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

    // Raids : refresh tous les RAID_REFRESH_DAYS jours
    const raidStale = !state.raidPool || (() => {
        const ms = new Date(today) - new Date(state.raidPool.date)
        return ms / 86400000 >= RAID_REFRESH_DAYS
    })()

    if (raidStale) {
        const allRaids = Object.values(areas).filter(a => a.type === 'raid')
        state.raidPool = {
            date: today,
            zones: _seededShuffle(allRaids, seed ^ 0xc0ffee).slice(0, DAILY_RAID_MAX).map(a => a.id)
        }
    }
}

// Retourne les IDs des donjons liés aux zones sauvages du pool journalier.
// Un donjon est "du jour" si sa zone source (qui droppe sa clé) est dans le pool.
function getDailyDungeons() {
    const poolZoneIds = state.dailyPool?.zones || []

    const keyToDungeonId = {}
    for (const area of Object.values(areas)) {
        if (area.type === 'dungeon' && area.keyId) keyToDungeonId[area.keyId] = area.id
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

function nextRaidRefreshLabel() {
    if (!state.raidPool) return '3 jours'
    const today   = _todayStr()
    const elapsed = Math.floor((new Date(today) - new Date(state.raidPool.date)) / 86400000)
    const rem     = RAID_REFRESH_DAYS - elapsed
    if (rem <= 1) return 'demain'
    return `${rem} jours`
}
