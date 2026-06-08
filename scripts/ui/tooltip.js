// ui/tooltip.js — Aide contextuelle DofusChill (clic droit / long-press)

// ─── Image genrée ────────────────────────────────────────────────────────────
// Remplace le suffixe _Male / _Female dans le chemin d'image selon member.gender

function getMemberImage(member) {
    if (member?.image && !member?.classId) return member.image
    const cls = classes[member?.classId]
    if (!cls?.image) return 'img/icons/icon.png'
    const suffix = (member?.gender === 'female') ? 'Female' : 'Male'
    const skinId   = state.classEquip?.[member?.classId]?.skin
    const skinItem = skinId ? item[skinId] : null
    const base     = (skinItem?.image) ? skinItem.image : cls.image
    return base.replace(/_(?:Male|Female)\.png$/i, `_${suffix}.png`)
}

// ─── Changement de genre (persiste dans state.classEquip + saveGame) ─────────

function setMemberGender(classId, gender) {
    const member = state.team.find(m => m && m.classId === classId)
    if (!member) return
    member.gender = gender
    if (!state.classEquip)          state.classEquip = {}
    if (!state.classEquip[classId]) state.classEquip[classId] = {}
    state.classEquip[classId].gender = gender
    saveGame()
    // Pop silencieux : remplace la fiche sans l'empiler (évite la double-fermeture)
    if (tooltipStack.length > 0) tooltipStack.pop()
    showMemberSheet(member)
    updateTeamUI()
    if (typeof updateGuildeUI === 'function') updateGuildeUI()
}

// Slot actif sélectionné pour l'échange de sorts { classId, slot } | null
let _selectedMoveSlot = null

// ─── Renommage d'un membre ────────────────────────────────────────────────────

function renameMember(classId) {
    const member = state.team.find(m => m && m.classId === classId)
    if (!member) return
    const cls = classes[classId]
    const current = member.name || ''
    const newName = prompt(`Pseudo pour ${cls?.name || classId} (laisser vide pour revenir au nom de classe) :`, current)
    if (newName === null) return
    const trimmed = newName.trim().slice(0, 24)
    member.name = trimmed || null
    if (!state.classEquip)          state.classEquip = {}
    if (!state.classEquip[classId]) state.classEquip[classId] = {}
    state.classEquip[classId].name = member.name
    saveGame()
    if (tooltipStack.length > 0) tooltipStack.pop()
    showMemberSheet(member)
    updateTeamUI()
}

// Clic sur un slot actif : sélectionne, désélectionne ou échange deux slots
function selectMoveSlot(classId, slot) {
    if (typeof combat !== 'undefined' && combat) return
    const member = state.team.find(m => m && m.classId === classId)
    if (!member) return

    if (_selectedMoveSlot?.classId === classId && _selectedMoveSlot?.slot === slot) {
        _selectedMoveSlot = null
    } else if (_selectedMoveSlot?.classId === classId) {
        const a = _selectedMoveSlot.slot
        const tmp = member.moves[a]
        member.moves[a] = member.moves[slot]
        member.moves[slot] = tmp
        _selectedMoveSlot = null
        saveGame()
        updateTeamUI()
    } else {
        _selectedMoveSlot = { classId, slot }
    }

    if (tooltipStack.length > 0) tooltipStack.pop()
    showMemberSheet(member)
}

// Clic sur un sort appris : l'assigne dans le slot sélectionné
function assignMoveToSlot(classId, moveId) {
    if (typeof combat !== 'undefined' && combat) return
    if (!_selectedMoveSlot || _selectedMoveSlot.classId !== classId) return
    const member = state.team.find(m => m && m.classId === classId)
    if (!member) return

    const targetSlot = _selectedMoveSlot.slot
    const displaced  = member.moves[targetSlot]

    // Si le sort est déjà dans un autre slot actif → échange (garde 4 slots remplis)
    let sourceSlot = null
    for (const s of ['slot1', 'slot2', 'slot3', 'slot4']) {
        if (member.moves[s] === moveId && s !== targetSlot) { sourceSlot = s; break }
    }

    // Restriction : bloque si un autre slot (hors swap) a déjà le même sigle
    const newRestriction = move[moveId]?.restriction
    if (newRestriction && !sourceSlot) {
        const sigleLabel = { star: '★', arrow: '→', shield: '🛡', coeur: '❤' }[newRestriction] || newRestriction
        for (const s of ['slot1', 'slot2', 'slot3', 'slot4']) {
            if (s === targetSlot) continue
            if (move[member.moves[s]]?.restriction === newRestriction) {
                showNotification(`Un sort ${sigleLabel} est déjà équipé sur ce membre !`, 'error')
                _selectedMoveSlot = null
                return
            }
        }
    }

    member.moves[targetSlot] = moveId
    if (sourceSlot) member.moves[sourceSlot] = displaced

    _selectedMoveSlot = null
    saveGame()
    updateTeamUI()

    if (tooltipStack.length > 0) tooltipStack.pop()
    showMemberSheet(member)
}

const PATCH_STAT_LABELS = {
    atk:                'Puissance',
    spd:                'Initiative',
    maxHp:              'PV',
    flatDamage:         'Dégâts fixes',
    finalDamagePct:     'Dégâts finaux',
    spellDamagePct:     'Dégâts de sorts',
    damageReductionPct: 'Réduction de dégâts',
    critChance:         'Chance critique',
    critDamagePct:      'Dégâts critiques',
    healPct:            'Soins %',
    healTeamPct:        'Soins équipe %',
    healMaxHpPct:       'Soins PV max %',
    lifestealPct:       'Vol de vie %',
    res_all:            'Résistances',
    'res.feu':          'Résistance Feu',
    'res.eau':          'Résistance Eau',
    'res.terre':        'Résistance Terre',
    'res.air':          'Résistance Air',
    'res.neutre':       'Résistance Neutre',
    erosionBonus:       'Érosion',
}

const MS_SLOT_LABELS = {
    coiffe: 'Coiffe', bouclier: 'Bouclier', anneau: 'Anneau', ceinture: 'Ceinture',
    bottes: 'Bottes', amulette: 'Amulette', arme: 'Arme', cape: 'Cape',
    anneau2: 'Anneau', familier: 'Familier', accessoire: 'Accessoire'
}
const MS_SLOT_ICONS = {
    coiffe:     'img/items/panoplies/coiffe_bouftou.png',
    bouclier:   'img/items/panoplies/bouclier_bouftou.png',
    anneau:     'img/items/panoplies/anneau_bouftou.png',
    anneau2:    'img/items/panoplies/anneau_bouftou.png',
    ceinture:   'img/items/panoplies/ceinture_bouftou.png',
    bottes:     'img/items/panoplies/bottes_bouftou.png',
    amulette:   'img/items/panoplies/amulette_bouftou.png',
    arme:       'img/items/panoplies/marteau_bouftou.png',
    cape:       'img/items/panoplies/cape_bouftou.png',
    familier:   'img/monstres/sprites/bouftou.png',
    accessoire: 'img/items/objets_bonus/Dofus_Emeraude.png',
}

function showDataHelp(key) {
    // Priorité : si la clé correspond à une classe ET qu'il y a un membre en équipe → fiche détaillée
    if (typeof classes !== 'undefined' && classes[key]) {
        const member = state.team?.find(m => m && m.classId === key)
        if (member) { showMemberSheet(member); return }
    }

    let title = key
    let body  = ''

    if (typeof classes !== 'undefined' && classes[key]) {
        const cls = classes[key]
        title = cls.name
        body  = `<div class="tooltip-help">
            <img src="${cls.image}" onerror="this.src='img/icons/icon.png'" style="width:4rem;height:4rem;object-fit:contain;">
            <p><strong>Rôle :</strong> ${cls.role || '—'}</p>
            <p>${cls.description || ''}</p>
        </div>`

    } else if (typeof monsters !== 'undefined' && monsters[key]) {
        const mob = monsters[key]
        title = mob.name
        body  = `<div class="tooltip-help">
            <img src="${mob.image}" onerror="this.src='img/icons/icon.png'" style="width:4rem;height:4rem;object-fit:contain;">
            <p><strong>Élément :</strong> ${mob.element || '—'}</p>
        </div>`

    } else if (typeof move !== 'undefined' && move[key]) {
        const mv = move[key]
        title = mv.name
        const typeLabel = { atk: 'Attaque', atk_zone: 'Attaque zone', buff: 'Buff', heal: 'Soin' }[mv.type] || mv.type
        let effectLine = ''
        if (mv.type === 'buff' && mv.effect) {
            effectLine = `<p><strong>Effet :</strong> +${mv.effect.value} ${mv.effect.stat} pendant ${mv.effect.duration} tours</p>`
        } else if (mv.type === 'heal') {
            effectLine = `<p><strong>Puissance de soin :</strong> ×${mv.healPower || 1}</p>`
        } else if (mv.baseDmg) {
            effectLine = `<p><strong>Dégâts base :</strong> ${mv.baseDmg} (×${mv.power || 1})</p>`
        }
        body  = `<div class="tooltip-help">
            <p><strong>Élément :</strong> ${mv.element || '—'}</p>
            <p><strong>Type :</strong> ${typeLabel}</p>
            ${effectLine}
            ${mv.desc ? `<p>${mv.desc}</p>` : ''}
        </div>`

    } else if (typeof item !== 'undefined' && item[key]) {
        showItemTooltip(key)
        return

    } else if (typeof areas !== 'undefined' && areas[key]) {
        showAreaSheet(key)
        return
    }

    openTooltip(title, body)
}

// ─── Textes des passifs ───────────────────────────────────────────────────────

const PASSIVE_TEXTS = {
    iop:        'Augmente sa Puissance de 10 / niveau au lieu de 5.',
    cra:        'Augmente son Initiative de 0.2 / niveau au lieu de 0',
    eniripsa:   'Tous les 6 sorts, soigne un allié vivant aléatoire de 20% de ses PV max.',
    zobal:      'Tous les 6 sorts utilisés, gagne un bouclier = Niveau × 2 PV.',
    sacrieur:   '≤ 50% PV : +5% dégâts finaux. ≤ 15% PV : +10% dégâts finaux. Subit 2× l\'érosion.',
    sram:       '+1% dégâts finaux par ennemi éliminé dans le combat (max +5%).',
    feca:       '+2% résistances à tous les éléments par ennemi éliminé (max +10%).',
    osamodas:   'Les invocations ont 2× plus de PV et d\'ATK.',
    enutrof:   '+15% taux de drop d\'items. Kamas × 2 quand un item est au niveau maximum.',
    xelor:      'Cycle de 7 sorts (1→2→3→4→3→2→1) au lieu du cycle standard 1→2→3→4.',
    huppermage: '+10% dégâts finaux si les 4 sorts équipés couvrent 4 éléments différents.',
    sadida:     'Tous les 4 sorts, inflige −20 Initiative à l\'ennemi pendant 2 tours.',
    roublard:   'À la mort, inflige 30% de ses PV max en dégâts neutres à l\'ennemi.',
    ecaflip:    'À chaque cycle de 4 sorts, gagne un bonus ou malus aléatoire.',
    steamer:    'Peut déployer des tourelles autonomes infligeant des dégâts à chaque tour.',
    ouginak:    '+20% dégâts critiques.',
    forgelance: 'Tous les sorts frappent en zone (tous les ennemis présents sont touchés).',
    pandawa:    'Cycle : Normal → Ivresse (−20% Init, +20% dégâts, +10% rés.) → Gueule de bois (−20% dégâts, −10% rés.).',
    eliotrope:  'Sorts de type portail — amplifie les dégâts alliés et les siens via des portails.',
}

function togglePassiveInfo(classId) {
    const el = document.getElementById(`ms-passive-${classId}`)
    if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none'
}

// ─── Fiche personnage détaillée ───────────────────────────────────────────────

function showMemberSheet(member) {
    const cls = classes[member.classId]
    if (!cls) return

    const lvl = member.level || 1
    const g   = cls.growthPerLevel

    // Stats de base (classe × niveau, sans équipement ni familiars)
    const base = {
        hp:  Math.floor(cls.bst.hp  + g.hp  * (lvl - 1)),
        atk: Math.floor(cls.bst.atk + g.atk * (lvl - 1)),
        spd: Math.floor(cls.bst.spd + g.spd * (lvl - 1)),
        res: {
            eau:    Math.floor(cls.bst.res.eau    + (g.res?.eau    || 0) * (lvl - 1)),
            feu:    Math.floor(cls.bst.res.feu    + (g.res?.feu    || 0) * (lvl - 1)),
            air:    Math.floor(cls.bst.res.air    + (g.res?.air    || 0) * (lvl - 1)),
            terre:  Math.floor(cls.bst.res.terre  + (g.res?.terre  || 0) * (lvl - 1)),
            neutre: Math.floor(cls.bst.res.neutre + (g.res?.neutre || 0) * (lvl - 1))
        }
    }
    const eff = getEffectiveStats(member) || base

    // Slot d'équipement (cliquable)
    function msEquipSlot(slotId) {
        const itemId = member.equip?.[slotId]
        const label  = MS_SLOT_LABELS[slotId] || slotId
        const click  = `onclick="openEquipFromSheet('${member.classId}', '${slotId}')"`

        if (slotId === 'familier') {
            const fam  = itemId ? familiarById[itemId] : null
            const flvl = fam ? getFamiliarLevel(fam) : 0
            return fam
                ? `<div class="ms-equip-slot ms-equip-filled" ${click}
                       oncontextmenu="event.preventDefault(); showFamiliarTooltip('${itemId}')"
                       title="${fam.name}">
                       <img src="${fam.image}" onerror="this.src='img/icons/icon.png'">
                       <span class="ms-equip-ilvl">Niv.${flvl}</span>
                   </div>`
                : `<div class="ms-equip-slot ms-equip-empty" ${click} title="${label}">
                       <img class="ms-equip-placeholder" src="${MS_SLOT_ICONS[slotId] || 'img/icons/icon.png'}">
                   </div>`
        }

        const itm  = itemId ? item[itemId] : null
        const ilvl = itemId ? getItemLevel(itemId) : 0
        return itm
            ? `<div class="ms-equip-slot ms-equip-filled" ${click}
                   oncontextmenu="event.preventDefault(); showItemTooltip('${itemId}', '${member.classId}')"
                   title="${itm.name}">
                   <img src="${itm.image}" onerror="this.src='img/icons/icon.png'">
                   <span class="ms-equip-ilvl">Niv.${ilvl}</span>
               </div>`
            : `<div class="ms-equip-slot ms-equip-empty" ${click} title="${label}">
                   <img class="ms-equip-placeholder" src="${MS_SLOT_ICONS[slotId] || 'img/icons/icon.png'}">
               </div>`
    }

    // Ligne de stat avec couleur (delta vs base, ou valeur absolue pour résistances)
    function statRow(iconSrc, label, baseVal, effVal, unit = '', colorByAbsolute = false) {
        let color = ''
        if (colorByAbsolute) {
            if (effVal > 0) color = '#2D7A2D'
            else if (effVal < 0) color = '#d45a43'
        } else {
            const delta = effVal - baseVal
            if (delta > 0) color = '#2D7A2D'
            else if (delta < 0) color = '#d45a43'
        }
        return `<div class="ms-stat-row">
            <img src="${iconSrc}" class="ms-stat-icon" onerror="this.src='img/icons/icon.png'">
            <span class="ms-stat-label">${label}</span>
            <span class="ms-stat-val"${color ? ` style="color:${color}"` : ''}>${Math.round(effVal)}${unit}</span>
        </div>`
    }

    // Sorts actifs (4 slots)
    const slotKeys = ['slot1', 'slot2', 'slot3', 'slot4']
    const activeMoves = slotKeys.map(s => {
        const moveId     = member.moves?.[s]
        const mv         = move[moveId]
        const isSelected = _selectedMoveSlot?.classId === member.classId && _selectedMoveSlot?.slot === s
        const selStyle   = isSelected ? 'outline:2px solid #f44336;outline-offset:2px;' : ''
        const onclick    = `onclick="selectMoveSlot('${member.classId}','${s}')"`
        const dataAttrs  = mv ? `data-move-id="${moveId}" data-caster-class="${member.classId}" ${onclick}` : onclick
        return buildMoveBarHTML(mv, { attrs: dataAttrs, extraStyle: `cursor:pointer;${selStyle}` })
    }).join('')

    // Niveaux de débloquage des sorts (learnset est un objet {lvl: moveId})
    const unlockLevel = { [cls.startingMove]: 1 }
    for (const [lvl, moveId] of Object.entries(cls.learnset || {})) {
        if (moveId) unlockLevel[moveId] = parseInt(lvl)
    }

    // Tous les sorts (appris + à venir)
    const allMoveIds  = [cls.startingMove, ...Object.values(cls.learnset || {})].filter(Boolean)
    const equippedSet = new Set(slotKeys.map(s => member.moves?.[s]).filter(Boolean))

    const learnedRows = allMoveIds.map(moveId => {
        const mv = move[moveId]
        if (!mv) return ''
        const eff0      = mv.effects?.[0]
        const elem      = eff0?.element || 'neutre'
        const typeLabel = { damage: 'Attaque', damage_zone: 'Zone', dot: 'DOT', heal: 'Soin', heal_team: 'Soin éq.', buff: 'Buff', buff_team: 'Buff éq.', debuff: 'Débuff', shield: 'Bouclier', lifesteal: 'Vol de vie', summon: 'Invocation' }[eff0?.type] || eff0?.type || '—'
        const _statLabel = { spd: 'init', atk: 'atk', maxHp: 'PV', hp: 'PV', flatDamage: 'dég', finalDamagePct: 'dég%', damageReductionPct: 'rés%', critChance: 'crit%', critDamagePct: 'crit-dég%' }
        const statLbl = s => _statLabel[s] || s
        let detail = ''
        if (eff0?.damage)                               detail = `${eff0.damage.min}-${eff0.damage.max} dég`
        if (eff0?.type === 'heal' || eff0?.type === 'heal_team')  detail = `soin`
        if (eff0?.type === 'buff'   || eff0?.type === 'buff_team')   detail = eff0.stat ? `+${eff0.value} ${statLbl(eff0.stat)}` : 'buff'
        if (eff0?.type === 'debuff' || eff0?.type === 'debuff_team') detail = eff0.stat ? `${eff0.value} ${statLbl(eff0.stat)}` : 'débuff'

        const unlock  = unlockLevel[moveId] || 1
        const locked  = lvl < unlock
        const eqClass = !locked && equippedSet.has(moveId) ? ' ms-move-equipped' : ''
        const lockedClass = locked ? ' ms-move-locked' : ''
        const canAssign = !locked && _selectedMoveSlot?.classId === member.classId
        const assignAttrs = canAssign ? `onclick="assignMoveToSlot('${member.classId}','${moveId}')" style="cursor:pointer;"` : ''

        return `<div class="ms-learned-row${eqClass}${lockedClass}" data-move-id="${moveId}" data-caster-class="${member.classId}" ${assignAttrs}>
            ${elemIcon(moveIconKey(mv), 'ms-learned-icon')}
            <span class="ms-learned-name">${mv.name}${moveRestrictionSigle(mv, elem)}</span>
            ${locked
                ? `<span class="ms-learned-lock">débloqué lvl ${unlock}</span>`
                : `<span class="ms-learned-type">${typeLabel}</span>
                   <span class="ms-learned-detail">${detail}</span>`
            }
        </div>`
    }).join('')

    const body = `<div class="member-sheet">
        <div class="ms-equip-area">
            <div class="ms-equip-col">
                ${msEquipSlot('coiffe')}
                ${msEquipSlot('bouclier')}
                ${msEquipSlot('anneau')}
                ${msEquipSlot('ceinture')}
                ${msEquipSlot('bottes')}
            </div>
            <div class="ms-sprite-col">
                <img class="ms-sprite" src="${getMemberImage(member)}" onerror="this.src='img/icons/icon.png'">
                ${member.name ? `<div style="text-align:center;font-size:0.7rem;opacity:0.6;margin-top:0.2rem;">${cls.name}</div>` : ''}
                <div style="display:flex;gap:0.3rem;margin-top:0.3rem;justify-content:center;">
                    <button onclick="setMemberGender('${member.classId}','male')"
                        style="padding:0.2rem 0.5rem;border:none;border-radius:4px;cursor:pointer;font-size:0.75rem;
                               background:${(member.gender||'male')==='male'?'#5dade2':'rgba(255,255,255,0.12)'};
                               color:${(member.gender||'male')==='male'?'#0d0d1a':'#ccc'};">♂</button>
                    <button onclick="setMemberGender('${member.classId}','female')"
                        style="padding:0.2rem 0.5rem;border:none;border-radius:4px;cursor:pointer;font-size:0.75rem;
                               background:${member.gender==='female'?'#e25d9e':'rgba(255,255,255,0.12)'};
                               color:${member.gender==='female'?'#0d0d1a':'#ccc'};">♀</button>
                </div>
                <div style="display:flex;gap:0.3rem;justify-content:center;margin-top:0.25rem;">
                    <button onclick="renameMember('${member.classId}')"
                        style="padding:0.15rem 0.5rem;border:none;border-radius:4px;cursor:pointer;font-size:0.7rem;
                               background:var(--dark2);color:#fff;">✏ Renommer</button>
                    <button onclick="openCosmeticPicker('${member.classId}')"
                        style="padding:0.15rem 0.5rem;border:none;border-radius:4px;cursor:pointer;font-size:0.7rem;
                               background:var(--dark2);color:#fff;">🎨 Apparence</button>
                    ${cls.passive ? `<button onclick="togglePassiveInfo('${member.classId}')"
                        style="padding:0.15rem 0.5rem;border:none;border-radius:4px;cursor:pointer;font-size:0.7rem;
                               background:var(--dark2);color:#fff;">⚡ Passif</button>` : ''}
                </div>
                ${cls.passive ? `<div id="ms-passive-${member.classId}" style="display:none;margin-top:0.3rem;
                    padding:0.4rem 0.6rem;background:rgba(255,255,255,0.07);border-radius:4px;
                    font-size:0.75rem;text-align:center;color:#000;line-height:1.4;">
                    ${PASSIVE_TEXTS[member.classId] || 'Passif en cours d\'implémentation.'}
                </div>` : ''}
            </div>
            <div class="ms-equip-col">
                ${msEquipSlot('amulette')}
                ${msEquipSlot('arme')}
                ${msEquipSlot('cape')}
                ${msEquipSlot('anneau2')}
                ${msEquipSlot('familier')}
            </div>
        </div>
        <div class="ms-equip-bottom">
            ${msEquipSlot('accessoire')}
        </div>
        <div class="ms-stats-grid">
            <div class="ms-stats">
                ${statRow(STAT_ICONS.hp,     'PV',        base.hp,          eff.hp         )}
                ${statRow(STAT_ICONS.atk,    'Puissance', base.atk,         eff.atk        )}
                ${statRow(STAT_ICONS.spd,    'Initiative',base.spd,         eff.spd        )}
                ${statRow(ELEM_ICONS.neutre, 'Résistance Neutre', base.res.neutre,  eff.res.neutre, '%', true)}
                ${statRow(ELEM_ICONS.terre,  'Résistance Terre',  base.res.terre,   eff.res.terre,  '%', true)}
                ${statRow(ELEM_ICONS.feu,    'Résistance Feu',    base.res.feu,     eff.res.feu,    '%', true)}
                ${statRow(ELEM_ICONS.eau,    'Résistance Eau',    base.res.eau,     eff.res.eau,    '%', true)}
                ${statRow(ELEM_ICONS.air,    'Résistance Air',    base.res.air,     eff.res.air,    '%', true)}
            </div>
            <div class="ms-stats">
                ${statRow(STAT_ICONS.flatDamage, 'Dégâts fixes',        0,  eff.flatDamage,         ''  )}
                ${statRow(STAT_ICONS.atk,        'Dégâts finaux %',     0,  eff.finalDamagePct,    '%'  )}
                ${statRow(STAT_ICONS.atk,        'Dégâts sorts %',      0,  eff.spellDamagePct,    '%'  )}
                ${statRow(STAT_ICONS.buff,        'Réduction dégâts %',  0,  eff.damageReductionPct,'%'  )}
                ${statRow(STAT_ICONS.atk,        'Chance critique %',   0,  eff.critChance,        '%'  )}
                ${statRow(STAT_ICONS.atk,        'Dégâts critiques %',  50, eff.critDamagePct,     '%'  )}
                ${(() => { const erosionActive = (member.buffs || []).filter(b => b.stat === 'erosionBonus').reduce((s,b)=>s+b.value,0); return erosionActive ? statRow(STAT_ICONS.atk, 'Érosion bonus', 0, Math.round(erosionActive), '%') : '' })()}
                ${eff.healPct        ? statRow(STAT_ICONS.soin,   'Soins %',         0,  eff.healPct,        '%') : ''}
                ${eff.healTeamPct    ? statRow(STAT_ICONS.soin,   'Soins équipe %',  0,  eff.healTeamPct,    '%') : ''}
                ${eff.healMaxHpPct   ? statRow(STAT_ICONS.soin,   'Soins PV max %',  0,  eff.healMaxHpPct,   '%') : ''}
                ${eff.lifestealPct   ? statRow(STAT_ICONS.volVie, 'Vol de vie %',    0,  eff.lifestealPct,   '%') : ''}
            </div>
        </div>
        ${_renderCombatStatus(member)}
        <div class="ms-section-title" style="margin-top:0.6rem;">Sorts actifs</div>
        <div class="ms-active-moves">${activeMoves}</div>
        <div class="ms-section-title">Sorts appris</div>
        <div class="ms-learned-moves">${learnedRows}</div>
    </div>`

    openTooltip(`${member.name || cls.name} — Niveau ${lvl}`, body)
}

// ─── Sélecteur d'équipement depuis la fiche ───────────────────────────────────

function openEquipFromSheet(classId, slotId) {
    const memberIndex = state.team.findIndex(m => m && m.classId === classId)
    if (memberIndex === -1) return
    if (slotId === 'familier') { openFamiliarSelector(memberIndex, true); return }
    const member = state.team[memberIndex]
    if (!member) return

    const takenByOther = new Set()
    for (const other of state.team) {
        if (!other) continue
        for (const [s, itemId] of Object.entries(other.equip || {})) {
            if (other.classId === classId && s === slotId) continue
            if (itemId) takenByOther.add(itemId)
        }
    }

    const targetSlot = slotId === 'anneau2' ? 'anneau' : slotId
    const compatible = Object.values(item).filter(itm =>
        itm.type === 'equipment' &&
        state.inventory[itm.id] &&
        (!itm.slot || itm.slot === targetSlot)
    )

    const statSet = new Set()
    compatible.forEach(itm => itm.stats?.forEach(s => statSet.add(s.stat)))
    const filterStats = [...statSet].map(s => [s, EQUIP_STAT_LABELS[s] || s])

    _equipPickState = {
        items: compatible,
        filter: null,
        sort: 'level',
        takenByOther,
        skullMaxLevel: null,
        isFamiliar: false,
        fromClassId: classId,
        onEquip:  (id) => equipItemFromSheet(classId, slotId, id),
        onRemove: () => equipItemFromSheet(classId, slotId, null),
    }

    const label = MS_SLOT_LABELS[slotId] || slotId
    openTooltip(label, _buildEquipSelectorShell("Retirer l'équipement", filterStats, false))
    renderEquipPickGrid()
}

function equipItemFromSheet(classId, slotId, itemId) {
    const member = state.team.find(m => m && m.classId === classId)
    if (!member) return

    member.equip[slotId] = itemId
    const stats = getEffectiveStats(member)
    if (stats) member.maxHp = stats.hp

    saveGame()
    updateTeamUI()

    // Pop silencieux (sans passer par closeTooltip) pour ne pas déclencher le guard
    // iOS anti-ghost-click (_tooltipLastCloseTime) qui bloquerait le showMemberSheet immédiat.
    tooltipStack.length = 0
    showMemberSheet(member)
}

// ─── Statut combat (buffs / debuffs / DOTs / HOTs / bouclier) ────────────────

function _renderCombatStatus(entity) {
    if (typeof combat === 'undefined' || !combat || !state.isRunning) return ''
    const rows = []
    const STAT_N = {
        atk: 'Puissance', spd: 'Initiative', flatDamage: 'Dég. fixes',
        finalDamagePct: 'Dég. finaux', spellDamagePct: 'Dég. sorts',
        damageReductionPct: 'Réd. dégâts', critChance: 'Crit. %',
        critDamagePct: 'Dég. crit.', maxHp: 'PV max', res_all: 'Rés. all',
        antiHeal: 'Anti-soin', healOnCast: 'Fontaine',
        pendingLifesteal: 'Vol de vie', erosionBonus: 'Érosion'
    }
    const PCT = new Set(['finalDamagePct','spellDamagePct','damageReductionPct',
                         'critChance','critDamagePct','res_all','healOnCast','erosionBonus'])
    const sName = s => {
        if (!s) return '?'
        if (STAT_N[s]) return STAT_N[s]
        if (s.startsWith('res.')) return 'Rés. ' + s.split('.')[1]
        return s
    }
    const unitOf = s => (PCT.has(s) || s?.startsWith('res.')) ? '%' : ''

    if (entity.shield?.value > 0) {
        rows.push(`<div class="es-status-row es-status-shield">Bouclier : +${entity.shield.value} PV (${entity.shield.duration} t.)</div>`)
    }
    for (const b of (entity.buffs || [])) {
        if (b.stat === 'antiHeal') {
            rows.push(`<div class="es-status-row es-status-debuff">Anti-soin (${b.duration} t.)</div>`)
            continue
        }
        const name = sName(b.stat)
        const sign = b.value > 0 ? '+' : ''
        const unit = unitOf(b.stat)
        const cls  = b.value >= 0 ? 'es-status-buff' : 'es-status-debuff'
        rows.push(`<div class="es-status-row ${cls}">${sign}${Math.round(b.value)}${unit} ${name} (${b.duration} t.)</div>`)
    }
    for (const d of (entity.dots || [])) {
        rows.push(`<div class="es-status-row es-status-dot">${d.label || 'DOT'} : −${d.value} PV/${d.element || 'neutre'} (${d.duration} t.)</div>`)
    }
    for (const h of (entity.hots || [])) {
        rows.push(`<div class="es-status-row es-status-hot">${h.label || 'HOT'} : +${h.value} PV/tour (${h.duration} t.)</div>`)
    }
    if (!rows.length) return ''
    return `<div class="ms-section-title" style="margin-top:0.6rem;">Statut combat</div>
        <div class="es-combat-status">${rows.join('')}</div>`
}

// ─── Fiche ennemi ────────────────────────────────────────────────────────────

function showEnemySheet(enemy) {
    if (!enemy) return
    const mob = monsters[enemy.id] || {}

    const hpPct    = Math.max(0, Math.floor((enemy.currentHp / enemy.maxHp) * 100))
    const hpClass  = hpPct < 25 ? 'hp-low' : hpPct < 50 ? 'hp-mid' : ''

    // Rareté / tier
    const TIER_LABELS   = { boss: 'Boss', elite: 'Élite', normal: '' }
    const tierLabel     = TIER_LABELS[enemy.tier] || ''
    const tierHtml      = tierLabel ? `<span class="es-tier-badge es-tier-${enemy.tier}">${tierLabel}</span>` : ''
    const rarityHtml    = enemy.rarity ? `<span class="rarity-${enemy.rarity}" style="font-size:0.72rem;">${enemy.rarity.replace('_', ' ')}</span>` : ''
    const elemHtml      = enemy.element ? `<span class="elem-badge elem-${enemy.element}" style="font-size:0.72rem;">${enemy.element}</span>` : ''

    // Stats effectives (base + buffs actifs)
    let effAtk        = enemy.atk            || 0
    let effSpd        = enemy.spd            || 100
    let effFinal      = enemy.finalDamagePct || 0
    let effFlat       = enemy.flatDamage     || 0
    let effDmgRedPct  = 0
    let effSpellDmg   = 0
    let effCritChance = 0
    const effRes  = { ...enemy.res }
    for (const b of (enemy.buffs || [])) {
        if      (b.stat === 'atk')               effAtk       += b.value
        else if (b.stat === 'spd')               effSpd       += b.value
        else if (b.stat === 'finalDamagePct')    effFinal     += b.value
        else if (b.stat === 'flatDamage')        effFlat      += b.value
        else if (b.stat === 'damageReductionPct') effDmgRedPct += b.value
        else if (b.stat === 'spellDamagePct')    effSpellDmg  += b.value
        else if (b.stat === 'critChance')        effCritChance+= b.value
        else if (b.stat === 'res_all')           { for (const e in effRes) effRes[e] += b.value }
        else if (b.stat?.startsWith('res.'))     { const e = b.stat.split('.')[1]; if (e in effRes) effRes[e] += b.value }
    }
    effSpd = Math.max(1, effSpd)

    // Ligne de stat avec coloration si la valeur a changé par rapport à la base
    function statRow(iconSrc, label, baseVal, effVal, unit = '') {
        const delta = effVal - baseVal
        const color = delta > 0 ? '#2D7A2D' : delta < 0 ? '#d45a43' : ''
        return `<div class="ms-stat-row">
            <img src="${iconSrc}" class="ms-stat-icon" onerror="this.src='img/icons/icon.png'">
            <span class="ms-stat-label">${label}</span>
            <span class="ms-stat-val"${color ? ` style="color:${color}"` : ''}>${Math.round(effVal)}${unit}</span>
        </div>`
    }

    const elems = ['neutre', 'terre', 'feu', 'eau', 'air']
    const resRows = elems.map(el => {
        const base = enemy.res?.[el] ?? 0
        const eff  = effRes[el] ?? base
        const delta = eff - base
        const color = delta !== 0 ? (delta > 0 ? 'color:#2D7A2D' : 'color:#d45a43') : (eff > 0 ? 'color:#2D7A2D' : eff < 0 ? 'color:#d45a43' : '')
        return `<div class="ms-stat-row">
            <img src="${ELEM_ICONS[el] || ELEM_ICONS.neutre}" class="ms-stat-icon">
            <span class="ms-stat-label">${el.charAt(0).toUpperCase() + el.slice(1)}</span>
            <span class="ms-stat-val" style="${color}">${eff}%</span>
        </div>`
    }).join('')

    // Sorts
    const TYPE_LABELS = {
        damage: 'Attaque', damage_zone: 'Zone', dot: 'DOT',
        heal: 'Soin', heal_team: 'Soin (éq.)',
        buff: 'Buff', buff_team: 'Buff (éq.)', debuff: 'Débuff',
        shield: 'Bouclier', lifesteal: 'Vol de vie', summon: 'Invocation'
    }
    const moveRows = (enemy.moves || []).map(moveId => {
        const mv   = move[moveId]
        if (!mv) return ''
        const eff0      = mv.effects?.[0]
        const mvType    = eff0?.type || ''
        const typeLabel = TYPE_LABELS[mvType] || mvType || '—'
        let detail = ''
        if (eff0?.damage) detail = `${eff0.damage.min}–${eff0.damage.max}`
        else if (mvType === 'heal' || mvType === 'heal_team') detail = 'soin'
        else if (mvType === 'buff' || mvType === 'buff_team') detail = eff0?.stat ? `+${eff0.value} ${eff0.stat}` : 'buff'
        else if (mvType === 'debuff') detail = eff0?.stat ? `${eff0.value} ${eff0.stat}` : 'débuff'
        const { bgClass, bgStyle } = getMoveElemBg(mv)
        const bgSty = bgStyle ? ` style="${bgStyle}"` : ''
        const cdSec = mv.cooldownMs ? (mv.cooldownMs / 1000).toFixed(1) + 's' : ''
        return `<div class="es-move-row ${bgClass}"${bgSty} data-move-id="${moveId}" data-caster-enemy="1">
            ${elemIcon(moveIconKey(mv), 'es-move-elem-icon')}
            <span class="es-move-name">${mv.name}</span>
            <span class="es-move-type">${typeLabel}</span>
            <span class="es-move-detail">${detail}</span>
            ${cdSec ? `<span class="es-move-cd">${cdSec}</span>` : ''}
        </div>`
    }).join('')


    const body = `<div class="member-sheet es-sheet">
        <div class="es-header">
            <img class="es-sprite" src="${enemy.image}" onerror="this.src='img/icons/icon.png'">
            <div class="es-header-info">
                <span class="es-name">${enemy.name}</span>
                <div class="es-badges">
                    <span class="level-badge">lvl ${enemy.level}</span>
                    ${tierHtml}
                    ${rarityHtml}
                    ${elemHtml}
                </div>
            </div>
        </div>
        <div class="es-hp-bar">
            <div class="es-hp-fill ${hpClass}" style="width:${hpPct}%"></div>
        </div>
        <div class="es-hp-text">${enemy.currentHp} / ${enemy.maxHp} PV</div>
        <div class="ms-section-title" style="margin-top:0.5rem;">Stats</div>
        <div class="ms-stats">
            ${statRow(STAT_ICONS.atk,       'Puissance',  enemy.atk  || 0,   effAtk           )}
            ${statRow(STAT_ICONS.spd,       'Initiative', enemy.spd  || 100, effSpd           )}
            ${(enemy.finalDamagePct || effFinal)    ? statRow(STAT_ICONS.atk,        'Dég. finaux',    enemy.finalDamagePct || 0, effFinal,      '%') : ''}
            ${(enemy.flatDamage     || effFlat)     ? statRow(STAT_ICONS.flatDamage,  'Dég. fixes',    enemy.flatDamage     || 0, effFlat           ) : ''}
            ${effDmgRedPct                          ? statRow(STAT_ICONS.buff,         'Réd. dégâts',  0,                        effDmgRedPct,  '%') : ''}
            ${effSpellDmg                           ? statRow(STAT_ICONS.atk,          'Dég. sorts',   0,                        effSpellDmg,   '%') : ''}
            ${effCritChance                         ? statRow(STAT_ICONS.atk,          'Crit. %',      0,                        effCritChance, '%') : ''}
        </div>
        <div class="ms-section-title">Résistances</div>
        <div class="ms-stats">${resRows}</div>
        ${_renderCombatStatus(enemy)}
        <div class="ms-section-title" style="margin-top:0.6rem;">Sorts</div>
        <div class="es-moves">${moveRows || '<span style="opacity:0.4;font-size:0.8rem">Aucun sort</span>'}</div>
    </div>`

    openTooltip(`${enemy.name} — Niveau ${enemy.level}`, body)
}

function _showRaidEnemySheet(slotIdx) {
    const enemy = combat?.enemies?.[slotIdx]
    if (enemy && enemy.currentHp > 0) showEnemySheet(enemy)
}

// ─── Fiche zone détaillée ─────────────────────────────────────────────────────

function showAreaSheet(areaId) {
    const area = areas[areaId]
    if (!area) return

    // Spawns avec % de probabilité — silhouette si jamais rencontré
    const totalWeight = area.spawns?.reduce((s, sp) => s + sp.weight, 0) || 1
    const spawnRows = (area.spawns || []).map(sp => {
        const mob      = monsters[sp.id]
        if (!mob) return ''
        const pct      = Math.round((sp.weight / totalWeight) * 100)
        const seen     = !!state.seenMonsters?.[sp.id]
        const imgStyle = seen ? '' : 'filter:brightness(0);'
        const nameText = seen ? mob.name : '???'
        return `<div class="ms-stat-row" style="cursor:pointer;"
                onclick="showMobSheet('${sp.id}')"
                oncontextmenu="event.preventDefault(); showMobSheet('${sp.id}')">
            <img src="${mob.image}" onerror="this.src='img/icons/icon.png'"
                 style="width:2rem;height:2rem;object-fit:contain;image-rendering:pixelated;flex-shrink:0;${imgStyle}">
            <span class="ms-stat-label">${nameText}</span>
            <span class="ms-stat-val">${pct}%</span>
        </div>`
    }).join('')

    // Loot : icônes des items droppables — silhouette si jamais obtenu (sauf ressources)
    const lootIcons = (area.lootTable || []).map(e => {
        const itm      = item[e.itemId]
        if (!itm) return ''
        const isResource = itm.type === 'resource'
        const unlocked = isResource || !!state.inventory?.[e.itemId]
        const label    = unlocked ? (e.isKey ? `${itm.name} 🗝` : itm.name) : '???'
        const imgStyle = unlocked ? '' : 'filter:brightness(0);'
        return `<img src="${itm.image}" title="${label}" onerror="this.src='img/icons/icon.png'"
                     style="width:2.2rem;height:2.2rem;object-fit:contain;image-rendering:pixelated;cursor:pointer;${imgStyle}"
                     onclick="showItemSheet('${e.itemId}')"
                     oncontextmenu="event.preventDefault(); showItemSheet('${e.itemId}')">`
    }).join('')

    // Clé requise (donjons)
    const keyItm = area.keyId ? item[area.keyId] : null
    const keyCount = area.keyId ? (state.inventory[area.keyId]?.count || 0) : 0
    const keyHtml = keyItm ? `
        <div class="ms-section-title" style="margin-top:0.5rem;">Clé requise</div>
        <div class="ms-stat-row">
            <img src="${keyItm.image}" onerror="this.src='img/icons/icon.png'"
                 style="width:2rem;height:2rem;object-fit:contain;flex-shrink:0;">
            <span class="ms-stat-label">${keyItm.name}</span>
            <span class="ms-stat-val" style="color:${keyCount > 0 ? '#2D7A2D' : '#d45a43'}">
                ${keyCount > 0 ? `${keyCount} en stock` : 'Aucune'}
            </span>
        </div>` : ''

    const body = `<div class="member-sheet">
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:0.75rem;">
            <img src="${area.icon}" onerror="this.src='img/icons/icon.png'"
                 style="width:4rem;height:4rem;object-fit:contain;image-rendering:pixelated;flex-shrink:0;">
            <div>
                <div style="opacity:0.7;font-size:0.85em;">Niv. ${area.minLevel}–${area.maxLevel}</div>
                <div style="font-size:0.9em;margin-top:0.25rem;">${area.description || ''}</div>
            </div>
        </div>
        ${spawnRows ? `<div class="ms-section-title">Monstres</div><div class="ms-stats">${spawnRows}</div>` : ''}
        ${lootIcons ? `<div class="ms-section-title">Loot possible</div>
            <div style="display:flex;flex-wrap:wrap;gap:0.4rem;padding:0.4rem 0;">${lootIcons}</div>` : ''}
        ${keyHtml}
    </div>`

    openTooltip(area.name, body)
}

// ─── Fiche monstre (depuis zone) ─────────────────────────────────────────────

function showMobSheet(monsterId) {
    const mob      = monsters[monsterId]
    if (!mob) return
    const unlocked = !!state.seenMonsters?.[monsterId]

    if (!unlocked) {
        const body = `<div class="member-sheet" style="display:flex;flex-direction:column;align-items:center;gap:0.5rem;padding:0.5rem 0;">
            <img src="${mob.image}" onerror="this.src='img/icons/icon.png'"
                 style="width:5rem;height:5rem;object-fit:contain;image-rendering:pixelated;filter:brightness(0);">
            <p style="opacity:0.5;font-style:italic;font-size:0.85rem;margin:0;">Ce monstre n'a pas encore été rencontré.</p>
        </div>`
        openTooltip('???', body)
        return
    }

    const TIER_LABELS = { boss: 'Boss', elite: 'Élite', normal: '' }
    const tierLabel   = TIER_LABELS[mob.tier] || ''
    const tierHtml    = tierLabel ? `<span class="es-tier-badge es-tier-${mob.tier}">${tierLabel}</span>` : ''
    const rarityHtml  = mob.rarity ? `<span class="rarity-${mob.rarity}" style="font-size:0.72rem;">${mob.rarity.replace('_', ' ')}</span>` : ''
    const elemHtml    = mob.element ? `<span class="elem-badge elem-${mob.element}" style="font-size:0.72rem;">${mob.element}</span>` : ''

    const elems   = ['neutre', 'terre', 'feu', 'eau', 'air']
    const resRows = elems.map(el => {
        const val   = mob.bst.res?.[el] ?? 0
        const color = val > 0 ? '#2D7A2D' : val < 0 ? '#d45a43' : ''
        return `<div class="ms-stat-row">
            <img src="${ELEM_ICONS[el] || ELEM_ICONS.neutre}" class="ms-stat-icon">
            <span class="ms-stat-label">${el.charAt(0).toUpperCase() + el.slice(1)}</span>
            <span class="ms-stat-val"${color ? ` style="color:${color}"` : ''}>${val}%</span>
        </div>`
    }).join('')

    function bstRow(iconSrc, label, value) {
        return `<div class="ms-stat-row">
            <img src="${iconSrc}" class="ms-stat-icon" onerror="this.src='img/icons/icon.png'">
            <span class="ms-stat-label">${label}</span>
            <span class="ms-stat-val">${Math.round(value)}</span>
        </div>`
    }

    const TYPE_LABELS = { damage: 'Attaque', damage_zone: 'Zone', dot: 'DOT', heal: 'Soin', heal_team: 'Soin (éq.)', buff: 'Buff', buff_team: 'Buff (éq.)', debuff: 'Débuff', shield: 'Bouclier', lifesteal: 'Vol de vie', summon: 'Invocation' }
    const moveRows = (mob.moves || []).map(moveId => {
        const mv   = move[moveId]
        if (!mv) return ''
        const eff0      = mv.effects?.[0]
        const mvType    = eff0?.type || ''
        const typeLabel = TYPE_LABELS[mvType] || mvType || '—'
        let detail = ''
        if (eff0?.damage) detail = `${eff0.damage.min}–${eff0.damage.max}`
        const { bgClass, bgStyle } = getMoveElemBg(mv)
        const bgSty = bgStyle ? ` style="${bgStyle}"` : ''
        const cdSec = mv.cooldownMs ? (mv.cooldownMs / 1000).toFixed(1) + 's' : ''
        return `<div class="es-move-row ${bgClass}"${bgSty} data-move-id="${moveId}">
            ${elemIcon(moveIconKey(mv), 'es-move-elem-icon')}
            <span class="es-move-name">${mv.name}</span>
            <span class="es-move-type">${typeLabel}</span>
            <span class="es-move-detail">${detail}</span>
            ${cdSec ? `<span class="es-move-cd">${cdSec}</span>` : ''}
        </div>`
    }).join('')

    const body = `<div class="member-sheet es-sheet">
        <div class="es-header">
            <img class="es-sprite" src="${mob.image}" onerror="this.src='img/icons/icon.png'">
            <div class="es-header-info">
                <span class="es-name">${mob.name}</span>
                <div class="es-badges">${tierHtml} ${rarityHtml} ${elemHtml}</div>
            </div>
        </div>
        <div class="ms-section-title" style="margin-top:0.3rem;">Stats de base</div>
        <div class="ms-stats">
            ${bstRow(STAT_ICONS.hp,  'PV',      mob.bst.hp)}
            ${bstRow(STAT_ICONS.atk, 'Puissance',  mob.bst.atk)}
            ${bstRow(STAT_ICONS.spd, 'Initiative', mob.bst.spd)}
        </div>
        <div class="ms-section-title">Résistances</div>
        <div class="ms-stats">${resRows}</div>
        <div class="ms-section-title">Sorts</div>
        <div class="es-moves">${moveRows || '<span style="opacity:0.4;font-size:0.8rem">Aucun sort</span>'}</div>
    </div>`

    openTooltip(mob.name, body)
}

function showItemSheet(itemId) {
    const itm = item[itemId]
    if (!itm) return
    // Les ressources (non-équipement) s'affichent toujours normalement
    if (itm.type !== 'equipment' || state.inventory?.[itemId]) { showItemTooltip(itemId); return }
    const body = `<div class="member-sheet" style="display:flex;flex-direction:column;align-items:center;gap:0.5rem;padding:0.5rem 0;">
        <img src="${itm.image || 'img/icons/icon.png'}" onerror="this.src='img/icons/icon.png'"
             style="width:5rem;height:5rem;object-fit:contain;image-rendering:pixelated;filter:brightness(0);">
        <p style="opacity:0.5;font-style:italic;font-size:0.85rem;margin:0;">Cet item n'a pas encore été obtenu.</p>
    </div>`
    openTooltip('???', body)
}

// ─── Tooltip de sort ──────────────────────────────────────────────────────────

function _mvDmg(atkStats, baseRoll) {
    let dmg = baseRoll * (1 + (atkStats.atk || 0) / 100)
    dmg += (atkStats.flatDamage || 0)
    dmg *= (1 + (atkStats.finalDamagePct || 0) / 100)
    dmg *= (1 + (atkStats.spellDamagePct || 0) / 100)
    return Math.max(1, Math.floor(dmg))
}

function showMoveTooltip(moveId, casterStats) {
    const mv = move[moveId]
    if (!mv) return

    const TYPE_LABELS = {
        damage: 'Attaque', damage_zone: 'Zone', dot: 'DOT', best_element_damage: 'Attaque (meilleur élément)',
        absorbElementDmg: 'Attaque (élément actif)', cycleElement: 'Cycle élémentaire',
        esquive: 'Esquive', consumeElementBuff: 'Consomme élément',
        heal: 'Soin', heal_team: 'Soin (équipe)', 'heal%maxHp': 'Soin (% PV max)', 'heal%maxHp_team': 'Soin (% PV max équipe)', hot: 'Soin continu',
        buff: 'Buff', buff_team: 'Buff (équipe)', debuff: 'Débuff', debuff_team: 'Débuff (équipe)',
        shield: 'Bouclier', lifesteal: 'Vol de vie', antiHeal: 'Anti-soin',
        summon: 'Invocation', summon_random: 'Invocation',
        renvoi: 'Renvoi', renvoiTotal: 'Renvoi total', oeilPourOeil: 'Oeil pour Oeil',
        switch: 'Déplacement', repeat: 'Répétition', random: 'Aléatoire',
        portal: 'Portail', turret: 'Tourelle', recul: 'Recul', avance: 'Avance'
    }
    const _dmgStr = d => d == null ? null : typeof d === 'number' ? `${d}` : `${d.min}–${d.max}`
    const STAT_LABELS = {
        atk: 'Puissance', spd: 'Initiative', flatDamage: 'Dégâts fixes',
        finalDamagePct: 'Dég. finaux %', spellDamagePct: 'Dég. sorts %',
        damageReductionPct: 'Réd. dégâts %', critChance: 'Crit', critDamagePct: 'Dég. crit %',
        healPct: 'Soins %', healTeamPct: 'Soins équipe %', healMaxHpPct: 'Soins PV max %', lifestealPct: 'Vol de vie %',
        erosionBonus: 'Érosion', maxHp: 'PV'
    }

    // Niveau de déblocage depuis le learnset de la classe
    let unlockLvl = null
    if (mv.classId && typeof classes !== 'undefined' && classes[mv.classId]) {
        const cls = classes[mv.classId]
        if (cls.startingMove === moveId) {
            unlockLvl = 1
        } else {
            for (const [lvl, mid] of Object.entries(cls.learnset || {})) {
                if (mid === moveId) { unlockLvl = parseInt(lvl); break }
            }
        }
    }

    let effectsHtml = ''
    for (const eff of (mv.effects || [])) {
        const typeLabel = TYPE_LABELS[eff.type] || eff.type || '—'
        const elemBadge = eff.element ? `<span class="elem-badge elem-${eff.element}" style="font-size:0.7rem;padding:0.1rem 0.35rem;">${eff.element}</span>` : ''

        // Classe de couleur selon l'élément ou le type
        const effectClass = eff.element
            ? `mt-effect-${eff.element}`
            : (eff.type === 'heal' || eff.type === 'heal_team' || eff.type === 'heal%maxHp') ? 'mt-effect-heal'
            : (eff.type === 'buff' || eff.type === 'buff_team' || eff.type === 'shield') ? 'mt-effect-buff'
            : (eff.type === 'debuff' || eff.type === 'debuff_team') ? 'mt-effect-debuff'
            : 'mt-effect-neutre'

        let rows = `<div class="mt-row"><span class="mt-label">Type</span><span class="mt-val">${typeLabel} ${elemBadge}</span></div>`

        // Dégâts directs (damage, damage_zone, absorbElementDmg, best_element_damage)
        if (eff.type === 'best_element_damage' && eff.damage != null) {
            rows += `<div class="mt-row"><span class="mt-label">Base</span><span class="mt-val">${_dmgStr(eff.damage)}</span></div>`
            rows += `<div class="mt-row"><span class="mt-label">Élément</span><span class="mt-val">Adaptatif (résistance la plus faible)</span></div>`
        } else if ((eff.type === 'damage' || eff.type === 'damage_zone' || eff.type === 'absorbElementDmg') && eff.damage != null) {
            rows += `<div class="mt-row"><span class="mt-label">Base</span><span class="mt-val">${_dmgStr(eff.damage)}</span></div>`
            if (casterStats && typeof eff.damage === 'object') {
                const minF = _mvDmg(casterStats, eff.damage.min)
                const maxF = _mvDmg(casterStats, eff.damage.max)
                rows += `<div class="mt-row"><span class="mt-label">Final (0% rés.)</span><span class="mt-val mt-accent">${minF}–${maxF}</span></div>`
            }
            if (eff.type === 'absorbElementDmg' && eff.fallbackElement) {
                rows += `<div class="mt-row"><span class="mt-label">Élément</span><span class="mt-val">Actif sur l'ennemi (sinon ${eff.fallbackElement})</span></div>`
            }
        }

        // Multiplicateurs cycliques (ex: Tempête de Puissance — ×1 → ×1.2 → ×1.5)
        if (eff.scalingMultipliers?.length > 1) {
            rows += `<div class="mt-row"><span class="mt-label">Multiplicateurs</span><span class="mt-val">${eff.scalingMultipliers.map(m => `×${m}`).join(' → ')}</span></div>`
        }

        // DOT : value directe (ex: Flèche Empoisonnée) ou damage objet
        if (eff.type === 'dot') {
            const dotVal = eff.value != null ? `${eff.value}` : eff.damage != null ? _dmgStr(eff.damage) : null
            if (dotVal) rows += `<div class="mt-row"><span class="mt-label">Dégâts/tour</span><span class="mt-val">${dotVal}</span></div>`
            if (eff.duration) rows += `<div class="mt-row"><span class="mt-label">Durée</span><span class="mt-val">${eff.duration} tours</span></div>`
        }

        // HOT (soin continu)
        if (eff.type === 'hot' && eff.heal != null) {
            rows += `<div class="mt-row"><span class="mt-label">Soin/tour</span><span class="mt-val">${_dmgStr(eff.heal)}</span></div>`
            if (eff.duration) rows += `<div class="mt-row"><span class="mt-label">Durée</span><span class="mt-val">${eff.duration} tours</span></div>`
        }

        if (eff.type === 'random' && eff.choices?.length) {
            for (const choice of eff.choices) {
                const pct = Math.round((choice.chance || 0) * 100)
                const subLabels = (choice.effects || []).map(se => TYPE_LABELS[se.type] || se.type).join(', ')
                rows += `<div class="mt-row"><span class="mt-label">${pct}%</span><span class="mt-val">${subLabels}</span></div>`
            }
        }

        if (eff.type === 'heal' || eff.type === 'heal_team') {
            if (eff.heal != null) rows += `<div class="mt-row"><span class="mt-label">Soin</span><span class="mt-val">${_dmgStr(eff.heal)}</span></div>`
        }
        if (eff.type === 'heal%maxHp' || eff.type === 'heal%maxHp_team') {
            if (eff.heal != null) rows += `<div class="mt-row"><span class="mt-label">Soin</span><span class="mt-val">${eff.heal}% des PV max</span></div>`
        }

        // Renvoi ou Vol de vie (pas pour les ratios de dégâts multi-cibles)
        if ((eff.type === 'lifesteal' || eff.type === 'renvoi' || eff.type === 'renvoiTotal' || eff.type === 'oeilPourOeil') && eff.ratio != null) {
            const isRenvoi = eff.type !== 'lifesteal'
            rows += `<div class="mt-row"><span class="mt-label">${isRenvoi ? 'Renvoi' : 'Vol de vie'}</span><span class="mt-val">${Math.round(eff.ratio * 100)}% des dégâts</span></div>`
        }

        if ((eff.type === 'buff' || eff.type === 'buff_team' || eff.type === 'debuff' || eff.type === 'debuff_team') && eff.stat) {
            const statLbl = STAT_LABELS[eff.stat] || eff.stat
            const sign = eff.value >= 0 ? '+' : ''
            rows += `<div class="mt-row"><span class="mt-label">Effet</span><span class="mt-val">${sign}${eff.value} ${statLbl}</span></div>`
            if (eff.duration) rows += `<div class="mt-row"><span class="mt-label">Durée</span><span class="mt-val">${eff.duration} tours</span></div>`
        }

        if (eff.type === 'shield') {
            if (eff.value != null)    rows += `<div class="mt-row"><span class="mt-label">Absorption</span><span class="mt-val">${eff.value}</span></div>`
            if (eff.levelPct != null) rows += `<div class="mt-row"><span class="mt-label">Absorption</span><span class="mt-val">Niveau × ${eff.levelPct} PV</span></div>`
            if (eff.duration)         rows += `<div class="mt-row"><span class="mt-label">Durée</span><span class="mt-val">${eff.duration} tours</span></div>`
        }

        if (eff.type === 'esquive') {
            if (eff.chancePct != null)    rows += `<div class="mt-row"><span class="mt-label">Chance</span><span class="mt-val">${eff.chancePct}%</span></div>`
            if (eff.reductionPct != null) rows += `<div class="mt-row"><span class="mt-label">Réduction</span><span class="mt-val">${eff.reductionPct}%</span></div>`
            if (eff.duration)             rows += `<div class="mt-row"><span class="mt-label">Durée</span><span class="mt-val">${eff.duration} tours</span></div>`
        }

        if (eff.type === 'antiHeal' && eff.duration) {
            rows += `<div class="mt-row"><span class="mt-label">Durée</span><span class="mt-val">${eff.duration} tours</span></div>`
        }

        if (eff.type === 'consumeElementBuff' && eff.onElement) {
            rows += `<div class="mt-row"><span class="mt-label">Effets</span><span class="mt-val">Terre / Eau / Feu / Air</span></div>`
        }

        if (eff.type === 'summon' && eff.summonId) {
            const summonMob = monsters[eff.summonId] || summons[eff.summonId]
            if (summonMob) rows += `<div class="mt-row"><span class="mt-label">Invocation</span><span class="mt-val">${summonMob.name}</span></div>`
        }

        effectsHtml += `<div class="mt-effect ${effectClass}">${rows}</div>`
    }

    // Progression du sort
    let progressionHtml = ''
    if (mv.spellProgression?.length) {
        const progRows = mv.spellProgression.map(entry => {
            const patch = entry.patch || {}
            const changes = []
            if (patch.damage != null)    changes.push(`dégâts ${_dmgStr(patch.damage)}`)
            if (patch.lifesteal != null) changes.push(`vol de vie ${Math.round(patch.lifesteal.ratio * 100)}%`)
            if (patch.heal != null)      changes.push(`soin ${_dmgStr(patch.heal)}`)
            if (patch.healPct != null)   changes.push(`soin ${patch.healPct}% PV max`)
            if (patch.renvoi != null)    changes.push(`renvoi ${Math.round(patch.renvoi.ratio * 100)}%`)
            if (patch.shield != null) {
                if (patch.shield.value != null)    changes.push(`bouclier ${patch.shield.value}`)
                if (patch.shield.levelPct != null) changes.push(`bouclier Niv × ${patch.shield.levelPct}`)
                if (patch.shield.duration != null) changes.push(`durée ${patch.shield.duration} t.`)
            }
            if (patch.esquive != null && patch.esquive.chancePct != null) {
                changes.push(`esquive ${patch.esquive.chancePct}%`)
            }
            if (patch.buff != null) {
                const buffs = Array.isArray(patch.buff) ? patch.buff : [patch.buff]
                for (const b of buffs) {
                    const _s   = PATCH_STAT_LABELS[b.stat] || b.stat || ''
                    const _dur = b.duration ? ` (${b.duration} t.)` : ''
                    if (b.value != null) {
                        const _sgn = b.value >= 0 ? '+' : ''
                        changes.push(`${_sgn}${b.value} ${_s}${_dur}`)
                    } else if (_dur) {
                        changes.push(`${_s ? _s + ' ' : ''}durée${_dur}`.trim())
                    }
                }
            }
            if (patch.debuff != null) {
                const debuffs = Array.isArray(patch.debuff) ? patch.debuff : [patch.debuff]
                for (const d of debuffs) {
                    const _s   = PATCH_STAT_LABELS[d.stat] || d.stat || ''
                    if (d.value != null) changes.push(`−${d.value} ${_s}`.trim())
                }
            }
            if (patch.dot != null) {
                const _dur = patch.dot.duration ? ` ×${patch.dot.duration} tours` : ''
                if (patch.dot.value != null) changes.push(`DOT ${patch.dot.value}${_dur}`)
                else if (patch.dot.duration != null) changes.push(`durée ${patch.dot.duration} t.`)
            }
            if (patch.hot != null) {
                if (patch.hot.heal != null) changes.push(`soin ${_dmgStr(patch.hot.heal)}/tour`)
                if (patch.hot.duration != null) changes.push(`durée ${patch.hot.duration} t.`)
            }
            if (patch.consumeElementBuff != null) changes.push('effets améliorés')
            return `<div class="mt-prog-row">
                <span class="mt-prog-lvl">Niv. ${entry.lvl}</span>
                <span class="mt-prog-val">${changes.length ? changes.join(', ') : 'base'}</span>
            </div>`
        }).join('')
        progressionHtml = `<div class="mt-section-label">Progression</div><div class="mt-progression">${progRows}</div>`
    }

    const cooldownSec = mv.cooldownMs ? (mv.cooldownMs / 1000).toFixed(1) + 's' : '—'
    const unlockHtml  = unlockLvl !== null ? `<div class="mt-unlock">Débloqué au niveau ${unlockLvl}</div>` : ''
    const descHtml    = mv.description ? `<div class="mt-desc">${mv.description}</div>` : ''

    const body = `<div class="move-tooltip">
        <div class="mt-cooldown">Recharge : ${cooldownSec}</div>
        ${unlockHtml}
        ${descHtml}
        ${effectsHtml}
        ${progressionHtml}
    </div>`

    openTooltip(mv.name, body)
}

function equipFamiliarFromSheet(classId, familiarId) {
    const member = state.team.find(m => m && m.classId === classId)
    if (!member) return

    member.equip.familier = familiarId || null
    const stats = getEffectiveStats(member)
    if (stats) member.maxHp = stats.hp

    saveGame()
    updateTeamUI()

    tooltipStack.length = 0
    showMemberSheet(member)
}

// ─── Cosmétiques de classe ────────────────────────────────────────────────────

function openCosmeticPicker(classId) {
    const member = state.team.find(m => m && m.classId === classId)
    if (!member) return

    const suffix     = (member.gender === 'female') ? 'Female' : 'Male'
    const activeSkin = state.classEquip?.[classId]?.skin || null
    const cls        = classes[classId]
    const defaultImg = cls?.image?.replace(/_(?:Male|Female)\.png$/i, `_${suffix}.png`) || 'img/icons/icon.png'

    // Tous les skins compatibles avec cette classe
    const skins = Object.values(item).filter(i => i.type === 'cosmetic_skin' && i.classId === classId)

    const defaultCard = `
        <div class="cosm-card${!activeSkin ? ' cosm-card-active' : ''}" onclick="equipSkin('${classId}', null)">
            <img class="cosm-preview" src="${defaultImg}" onerror="this.src='img/icons/icon.png'">
            <span class="cosm-name">Défaut</span>
            <span class="cosm-status">${!activeSkin ? 'Équipé' : 'Appliquer'}</span>
        </div>`

    const skinCards = skins.map(sk => {
        const owned  = (state.ownedSkins || []).includes(sk.id)
        const active = activeSkin === sk.id
        const img    = sk.image?.replace(/_(?:Male|Female)\.png$/i, `_${suffix}.png`) || 'img/icons/icon.png'
        const price  = sk.price || 0
        return `
        <div class="cosm-card${active ? ' cosm-card-active' : ''}${!owned ? ' cosm-card-locked' : ''}"
             onclick="${owned ? `equipSkin('${classId}','${sk.id}')` : ''}">
            <img class="cosm-preview" src="${img}" onerror="this.src='img/icons/icon.png'">
            <span class="cosm-name">${sk.name}</span>
            ${active
                ? `<span class="cosm-status cosm-status-active">Équipé</span>`
                : owned
                    ? `<span class="cosm-status">Appliquer</span>`
                    : `<span class="cosm-status cosm-status-buy">Boutique</span>`
            }
        </div>`
    }).join('')

    const empty = !skins.length
        ? `<p style="opacity:0.5;font-size:0.8rem;margin:0.5rem 0 0;">Aucun skin disponible pour cette classe.</p>`
        : ''

    const body = `<div class="cosm-picker">${defaultCard}${skinCards}</div>${empty}`
    openTooltip(`Apparence — ${cls?.name || classId}`, body)
}

function equipSkin(classId, skinId) {
    const member = state.team.find(m => m && m.classId === classId)
    if (!member) return
    if (!state.classEquip)          state.classEquip = {}
    if (!state.classEquip[classId]) state.classEquip[classId] = {}
    state.classEquip[classId].skin = skinId || null
    saveGame()
    updateTeamUI()
    // Refresh le picker en place
    closeTooltip()
    openCosmeticPicker(classId)
}

function buySkin(classId, skinId, price) {
    if ((state.ownedSkins || []).includes(skinId)) { equipSkin(classId, skinId); return }
    if (state.kamas < price) { showNotification('Pas assez de kamas !', 'error'); return }
    state.kamas -= price
    if (!state.ownedSkins) state.ownedSkins = []
    state.ownedSkins.push(skinId)
    saveGame()
    updateKamasDisplay()
    showNotification(`${item[skinId]?.name || 'Skin'} débloqué !`, 'info')
    equipSkin(classId, skinId)
}
