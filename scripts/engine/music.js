// scripts/engine/music.js — Système de musique DofusChill
//
// Ajouter les fichiers MP3 dans :
//   music/ambient/{wild,dungeon,raid,event}/
//   music/combat/{wild,dungeon,raid,event}/
//
// Déclarer chaque piste dans MUSIC_TRACKS ci-dessous.

const MUSIC_TRACKS = {
    ambient: {
        wild:    [
            // 'music/ambient/wild/nom_du_fichier.mp3',
        ],
        dungeon: [
            // 'music/ambient/dungeon/nom_du_fichier.mp3',
        ],
        raid:    [
            // 'music/ambient/raid/nom_du_fichier.mp3',
        ],
        event:   [
            // 'music/ambient/event/nom_du_fichier.mp3',
        ],
    },
    combat: {
        wild:    [
            // 'music/combat/wild/nom_du_fichier.mp3',
        ],
        dungeon: [
            // 'music/combat/dungeon/nom_du_fichier.mp3',
        ],
        raid:    [
            // 'music/combat/raid/nom_du_fichier.mp3',
        ],
        event:   [
            // 'music/combat/event/nom_du_fichier.mp3',
        ],
    },
}

// ─── État interne ─────────────────────────────────────────────────────────────

const MUSIC_FADE_MS = 800

let _musicEnabled   = localStorage.getItem('dofuschill_music') !== 'false'
let _ambientAudio   = null
let _combatAudio    = null
let _currentCtx     = 'wild'
let _inCombat       = false
let _ambientHistory = { wild: [], dungeon: [], raid: [], event: [] }
let _combatHistory  = { wild: [], dungeon: [], raid: [], event: [] }

// ─── Utilitaires ─────────────────────────────────────────────────────────────

function _ctxFromArea(areaId) {
    if (!areaId) return 'wild'
    const t = (typeof areas !== 'undefined' && areas[areaId]?.type) || 'wild'
    return (t === 'dungeon' || t === 'raid' || t === 'event') ? t : 'wild'
}

function _pickTrack(pool, history) {
    if (!pool?.length) return null
    if (pool.length === 1) return pool[0]
    const last  = history[history.length - 1]
    const avail = pool.filter(t => t !== last)
    const pick  = avail[Math.floor(Math.random() * avail.length)]
    history.push(pick)
    if (history.length > pool.length) history.shift()
    return pick
}

function _fadeOut(audio, ms, cb) {
    if (!audio || audio.paused) { cb?.(); return }
    const steps = Math.max(1, ms / 50)
    const delta = audio.volume / steps
    const iv = setInterval(() => {
        if (audio.volume <= delta) {
            audio.volume = 0
            audio.pause()
            clearInterval(iv)
            cb?.()
        } else {
            audio.volume -= delta
        }
    }, 50)
}

function _fadeIn(audio, ms) {
    if (!audio) return
    audio.volume = 0
    audio.play().catch(() => {})
    const steps = Math.max(1, ms / 50)
    const delta = 1 / steps
    const iv = setInterval(() => {
        if (audio.volume >= 1 - delta) {
            audio.volume = 1
            clearInterval(iv)
        } else {
            audio.volume += delta
        }
    }, 50)
}

function _makeAudio(src, onEnded) {
    const a = new Audio(src)
    a.preload = 'none'
    a.onended = onEnded
    return a
}

function _startAmbient(ctx) {
    const track = _pickTrack(MUSIC_TRACKS.ambient[ctx], _ambientHistory[ctx])
    if (!track) return
    _ambientAudio = _makeAudio(track, () => { if (!_inCombat) _startAmbient(ctx) })
    _fadeIn(_ambientAudio, MUSIC_FADE_MS)
}

function _startCombatTrack(ctx) {
    const track = _pickTrack(MUSIC_TRACKS.combat[ctx], _combatHistory[ctx])
    if (!track) return
    _combatAudio = _makeAudio(track, () => { if (_inCombat) _startCombatTrack(ctx) })
    _fadeIn(_combatAudio, MUSIC_FADE_MS)
}

// ─── API publique ─────────────────────────────────────────────────────────────

// Appelé depuis engine/combat.js — startCombat()
function musicStartCombat(areaId) {
    if (!_musicEnabled) return
    const newCtx    = _ctxFromArea(areaId)
    const ctxSame   = newCtx === _currentCtx
    _currentCtx = newCtx
    _inCombat   = true

    // Même contexte et musique de combat déjà active → on ne coupe pas le track en cours
    if (ctxSame && _combatAudio && !_combatAudio.paused) return

    _fadeOut(_ambientAudio, MUSIC_FADE_MS, () => { _ambientAudio = null })
    _fadeOut(_combatAudio,  MUSIC_FADE_MS, () => { _combatAudio  = null; _startCombatTrack(_currentCtx) })
}

// Appelé depuis engine/combat.js — exitCombat() et leaveCombat()
function musicExitZone() {
    if (!_musicEnabled) return
    _inCombat   = false
    _currentCtx = 'wild'
    _fadeOut(_combatAudio,  MUSIC_FADE_MS, () => { _combatAudio  = null })
    _fadeOut(_ambientAudio, MUSIC_FADE_MS, () => { _ambientAudio = null; _startAmbient('wild') })
}

// Appelé par le bouton 🔇/🔊
function toggleMusic() {
    _musicEnabled = !_musicEnabled
    localStorage.setItem('dofuschill_music', String(_musicEnabled))
    _updateMusicBtn()
    if (!_musicEnabled) {
        _fadeOut(_ambientAudio, MUSIC_FADE_MS, () => { _ambientAudio = null })
        _fadeOut(_combatAudio,  MUSIC_FADE_MS, () => { _combatAudio  = null })
    } else {
        if (_inCombat) _startCombatTrack(_currentCtx)
        else           _startAmbient(_currentCtx)
    }
}

// ─── Bouton UI ────────────────────────────────────────────────────────────────

const _SVG_ON  = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M3 9v6h4l5 5V4L7 9zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77"/></svg>`
const _SVG_OFF = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45q.05-.3.05-.63M19 12c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71M4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9zM12 4 9.91 6.09 12 8.18z"/></svg>`

function _updateMusicBtn() {
    const btn = document.getElementById('music-toggle-btn')
    if (btn) btn.innerHTML = _musicEnabled ? _SVG_ON : _SVG_OFF
}

_updateMusicBtn()
if (_musicEnabled) _startAmbient('wild')
