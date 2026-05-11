
// engine/progression.js — XP, niveaux, apprentissage des sorts DofusChill

function getXPRequired(level) {

    if (level <= 20) {
        return Math.floor(40 + level * 25);
    }

    if (level <= 40) {
        return Math.floor(600 + Math.pow(level, 1.9) * 20);
    }

    if (level <= 60) {
        return Math.floor(1200 + Math.pow(level, 2.0) * 22);
    }

    if (level <= 80) {
        return Math.floor(2500 + Math.pow(level, 2.1) * 25);
    }

    if (level <= 100) {
        return Math.floor(5000 + Math.pow(level, 2.2) * 28);
    }

    if (level <= 120) {
        return Math.floor(8000 + Math.pow(level, 2.3) * 32);
    }

    if (level <= 140) {
        return Math.floor(12000 + Math.pow(level, 2.4) * 38);
    }

    if (level <= 160) {
        return Math.floor(16000 + Math.pow(level, 2.5) * 45);
    }

    if (level <= 180) {
        return Math.floor(22000 + Math.pow(level, 2.6) * 55);
    }

    return Math.floor(30000 + Math.pow(level, 2.75) * 70);
}

// const XP_PER_LEVEL = 100  // XP nécessaire par niveau (linéaire pour la démo)
const LEVEL_CAP    = 200

// ─── Initialise un membre d'équipe à partir d'un classId ─────────────────────

function createTeamMember(classId, level) {
    const cls = classes[classId]
    if (!cls) return null
    const lv = level || 1

    const member = {
        classId,
        level: lv,
        exp: 0,
        moves: { slot1: null, slot2: null, slot3: null, slot4: null },
        equip: {
            coiffe: null, bouclier: null, anneau: null, ceinture: null, bottes: null,
            amulette: null, arme: null, cape: null, anneau2: null, familier: null,
            accessoire: null
        },
        buffs: [],
        currentHp: null  // calculé au premier combat
    }

    // Apprentissage initial
    const learnedMoves = []
    for (let lvl = 1; lvl <= lv; lvl++) {
        const learned = learnMoveAtLevel(classId, lvl)
        if (learned && !learnedMoves.includes(learned)) learnedMoves.push(learned)
    }

    // Remplit les slots disponibles
    let i = 0
    for (const slot of ['slot1', 'slot2', 'slot3', 'slot4']) {
        if (learnedMoves[i]) { member.moves[slot] = learnedMoves[i]; i++ }
    }

    return member
}

// Retourne l'id du sort appris au niveau lvl, ou null

function learnMoveAtLevel(classId, lvl) {
    const cls = classes[classId]
    if (!cls) return null

    if (lvl === 1) return cls.startingMove || null

    return cls.learnset?.[lvl] || null
}

// ─── Donne de l'XP à un membre d'équipe ──────────────────────────────────────
// Retourne { leveledUp: bool, newLevel: Number, newMoves: [] }

function giveXP(member, xpAmount) {
    if (member.level >= LEVEL_CAP) return { leveledUp: false, newLevel: member.level, newMoves: [] }

    const famBonuses = getAllFamiliarBonuses()
    const xpBonus    = 1 + (famBonuses.xpGain || 0) / 100
    const actualXp   = Math.floor(xpAmount * xpBonus)

    member.exp = (member.exp || 0) + actualXp

    let leveledUp = false
    const newMoves = []

    while (member.exp >= getXPRequired(member.level)&& member.level < LEVEL_CAP) {
        member.exp -= getXPRequired(member.level)
        member.level++
        leveledUp = true

        const learned = learnMoveAtLevel(member.classId, member.level)
        if (learned) {
            // Place le sort dans le premier slot libre
            for (const slot of ['slot1', 'slot2', 'slot3', 'slot4']) {
                if (!member.moves[slot]) { member.moves[slot] = learned; break }
            }
            newMoves.push(learned)
        }
    }

    if (member.level >= LEVEL_CAP) member.exp = 0

    return { leveledUp, newLevel: member.level, newMoves }
}

// ─── Donne de l'XP à toute l'équipe ─────────────────────────────────────────
// activeMemberIndex : index du membre actif (100% XP), inactifs vivants = 50%, morts = 0%

function distributeXP(xpGain, activeMemberIndex) {
    const results = []
    for (let i = 0; i < state.team.length; i++) {
        const member = state.team[i]
        if (!member) continue
        if (member.currentHp <= 0) continue                       // mort → 0 XP
        const mult   = (i === activeMemberIndex) ? 1.0 : 0.5
        const result = giveXP(member, Math.floor(xpGain * mult))
        if (result.leveledUp || result.newMoves.length > 0) results.push({ member, ...result })
    }
    return results
}

// ─── Progression des sorts ────────────────────────────────────────────────────
// Applique les paliers de spellProgression d'un sort selon le niveau du lanceur.
// Retourne une copie du sort avec les effets du palier actif.

function applyProgression(spell, lvl) {
    const result = structuredClone(spell)

    const prog = spell.spellProgression
    if (!prog) return result

    let active = prog[0]
    for (const p of prog) {
        if (lvl >= p.lvl) active = p
    }

    if (!active.patch) return result

    for (const effect of result.effects) {
        const patch = active.patch
        if (effect.type === 'damage' && patch.damage) {
            effect.damage = patch.damage
        }
        if (effect.type === 'lifesteal' && patch.lifesteal) {
            effect.ratio = patch.lifesteal.ratio
        }
    }

    return result
}

// Variante qui lit la progression depuis cls.spellProgression (format classe)
// plutôt que depuis spell.spellProgression (format sort).

function getScaledSpell(classId, spellId, lvl) {
    const base = move[spellId]
    const cls = classes[classId]

    if (!base || !cls?.spellProgression?.[spellId]) return base

    const progression = cls.spellProgression[spellId]

    let current = progression[0]
    for (const tier of progression) {
        if (lvl >= tier.lvl) { current = tier }
    }

    return { ...base, effects: structuredClone(current.effects) }
}

// ─── Sélection du personnage de départ ────────────────────────────────────────

function selectStarterClass(classId) {
    if (state.hasChosenStarter) return
    const member = createTeamMember(classId, 1)
    if (!member) return

    state.team = [member]
    state.hasChosenStarter = true

    document.getElementById('starter-menu').style.display = 'none'
    const menuParent = document.getElementById('menu-button-parent')
    if (menuParent) menuParent.style.display = ''
    saveGame()
    updateTeamUI()
    showNotification(`Bienvenue, ${classes[classId].name} !`, 'info')
    advanceTutorial('intro')
}
