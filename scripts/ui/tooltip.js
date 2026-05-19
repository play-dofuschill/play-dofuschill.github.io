// ui/tooltip.js — Aide contextuelle DofusChill (clic droit / long-press)

// ─── Image genrée ────────────────────────────────────────────────────────────
// Remplace le suffixe _Male / _Female dans le chemin d'image selon member.gender

function getMemberImage(member) {
    const cls = classes[member?.classId]
    if (!cls?.image) return 'img/icons/icon.png'
    const suffix = (member?.gender === 'female') ? 'Female' : 'Male'
    return cls.image.replace(/_(?:Male|Female)\.png$/i, `_${suffix}.png`)
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
            const mob  = itemId ? monsters[itemId] : null
            const flvl = itemId ? (state.collection[itemId]?.level || 0) : 0
            return mob
                ? `<div class="ms-equip-slot ms-equip-filled" ${click}
                       oncontextmenu="event.preventDefault(); showMonsterTooltip('${itemId}')"
                       title="${mob.name}">
                       <img src="${mob.image}" onerror="this.src='img/icons/icon.png'">
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
                   oncontextmenu="event.preventDefault(); showItemTooltip('${itemId}')"
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
        if (!mv) return `<div class="ms-move-slot ms-move-empty" onclick="selectMoveSlot('${member.classId}','${s}')" style="cursor:pointer;${selStyle}">—</div>`
        const elem    = mv.effects?.[0]?.element || 'neutre'
        const mvType  = mv.effects?.[0]?.type || ''
        const barElem = mvType === 'buff' ? 'buff' : mvType === 'debuff' ? 'malus' : elem
        return `<div class="ms-move-slot elem-bar-${barElem}" data-move-id="${moveId}" data-caster-class="${member.classId}"
                     onclick="selectMoveSlot('${member.classId}','${s}')" style="cursor:pointer;${selStyle}">
            <span class="ms-move-name">${mv.name}</span>
            ${elemIcon(elem, 'ms-move-icon')}
        </div>`
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
        let detail = ''
        if (eff0?.damage)                               detail = `${eff0.damage.min}-${eff0.damage.max} dég`
        if (eff0?.type === 'heal' || eff0?.type === 'heal_team')  detail = `soin`
        if (eff0?.type === 'buff' || eff0?.type === 'buff_team')  detail = eff0.stat ? `+${eff0.value} ${eff0.stat}` : 'buff'

        const unlock  = unlockLevel[moveId] || 1
        const locked  = lvl < unlock
        const eqClass = !locked && equippedSet.has(moveId) ? ' ms-move-equipped' : ''
        const lockedClass = locked ? ' ms-move-locked' : ''
        const canAssign = !locked && _selectedMoveSlot?.classId === member.classId
        const assignAttrs = canAssign ? `onclick="assignMoveToSlot('${member.classId}','${moveId}')" style="cursor:pointer;"` : ''

        return `<div class="ms-learned-row${eqClass}${lockedClass}" data-move-id="${moveId}" data-caster-class="${member.classId}" ${assignAttrs}>
            ${elemIcon(elem, 'ms-learned-icon')}
            <span class="ms-learned-name">${mv.name}</span>
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
                <div style="display:flex;justify-content:center;margin-top:0.25rem;">
                    <button onclick="renameMember('${member.classId}')"
                        style="padding:0.15rem 0.5rem;border:none;border-radius:4px;cursor:pointer;font-size:0.7rem;
                               background:rgba(255,255,255,0.1);color:#ccc;">✏ Renommer</button>
                </div>
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
                ${eff.healPct        ? statRow(STAT_ICONS.soin,   'Soins %',         0,  eff.healPct,        '%') : ''}
                ${eff.healTeamPct    ? statRow(STAT_ICONS.soin,   'Soins équipe %',  0,  eff.healTeamPct,    '%') : ''}
                ${eff.healMaxHpPct   ? statRow(STAT_ICONS.soin,   'Soins PV max %',  0,  eff.healMaxHpPct,   '%') : ''}
                ${eff.lifestealPct   ? statRow(STAT_ICONS.volVie, 'Vol de vie %',    0,  eff.lifestealPct,   '%') : ''}
            </div>
        </div>
        <div class="ms-section-title">Sorts actifs</div>
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

    closeTooltip()
    closeTooltip()
    showMemberSheet(member)
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

    // Stats offensives
    function statRow(iconSrc, label, value, unit = '') {
        return `<div class="ms-stat-row">
            <img src="${iconSrc}" class="ms-stat-icon" onerror="this.src='img/icons/icon.png'">
            <span class="ms-stat-label">${label}</span>
            <span class="ms-stat-val">${Math.round(value)}${unit}</span>
        </div>`
    }

    const elems = ['neutre', 'terre', 'feu', 'eau', 'air']
    const resRows = elems.map(el => {
        const val = enemy.res?.[el] ?? 0
        return `<div class="ms-stat-row">
            <img src="${ELEM_ICONS[el] || ELEM_ICONS.neutre}" class="ms-stat-icon">
            <span class="ms-stat-label">${el.charAt(0).toUpperCase() + el.slice(1)}</span>
            <span class="ms-stat-val" style="${val > 0 ? 'color:#2D7A2D' : val < 0 ? 'color:#d45a43' : ''}">${val}%</span>
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
        const eff0     = mv.effects?.[0]
        const elem     = eff0?.element || 'neutre'
        const mvType   = eff0?.type || ''
        const barElem  = mvType === 'buff' ? 'buff' : mvType === 'debuff' ? 'malus' : elem
        const typeLabel = TYPE_LABELS[mvType] || mvType || '—'
        let detail = ''
        if (eff0?.damage) detail = `${eff0.damage.min}–${eff0.damage.max}`
        else if (mvType === 'heal' || mvType === 'heal_team') detail = 'soin'
        else if (mvType === 'buff' || mvType === 'buff_team') detail = eff0?.stat ? `+${eff0.value} ${eff0.stat}` : 'buff'
        else if (mvType === 'debuff') detail = eff0?.stat ? `${eff0.value} ${eff0.stat}` : 'débuff'

        const cdSec = mv.cooldownMs ? (mv.cooldownMs / 1000).toFixed(1) + 's' : ''
        return `<div class="es-move-row elem-bar-${barElem}" data-move-id="${moveId}" data-caster-enemy="1">
            ${elemIcon(elem, 'es-move-elem-icon')}
            <span class="es-move-name">${mv.name}</span>
            <span class="es-move-type">${typeLabel}</span>
            <span class="es-move-detail">${detail}</span>
            ${cdSec ? `<span class="es-move-cd">${cdSec}</span>` : ''}
        </div>`
    }).join('')

    // Familier (bonus)
    let familiarHtml = ''
    const fam = mob.familiar
    if (fam?.bonusStat && fam.min != null && fam.max != null && fam.bonusType !== 'farming') {
        const entry = state.collection?.[enemy.id]
        const famLvl = entry?.level || 0
        const famVal = famLvl > 0 ? Math.floor(getFamiliarStatValue(famLvl, fam.min, fam.max, mob.rarity)) : null
        const STAT_L = { atk: 'Puissance', maxHp: 'PV', spd: 'Initiative', flatDamage: 'Dégâts fixes', finalDamagePct: 'Dégâts finaux %', spellDamagePct: 'Dég. sorts', damageReductionPct: 'Réd. dégâts', critChance: 'Crit' }
        const statLbl = STAT_L[fam.bonusStat] || fam.bonusStat
        const valText = famLvl > 0 ? `Niv. ${famLvl} — +${famVal} ${statLbl}` : `+${fam.min}–${fam.max} ${statLbl}`
        familiarHtml = `<div class="ms-section-title">Familier</div>
        <div style="font-size:0.8rem;opacity:0.75;padding:0.15rem 0;">${valText}</div>`
    }

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
            ${statRow(STAT_ICONS.atk, 'Puissance', enemy.atk)}
            ${statRow(STAT_ICONS.spd, 'Initiative', enemy.spd)}
            ${enemy.finalDamagePct ? statRow(STAT_ICONS.atk, 'Dég. finaux', enemy.finalDamagePct, '%') : ''}
            ${enemy.flatDamage     ? statRow(STAT_ICONS.flatDamage, 'Dég. fixes', enemy.flatDamage) : ''}
        </div>
        <div class="ms-section-title">Résistances</div>
        <div class="ms-stats">${resRows}</div>
        <div class="ms-section-title">Sorts</div>
        <div class="es-moves">${moveRows || '<span style="opacity:0.4;font-size:0.8rem">Aucun sort</span>'}</div>
        ${familiarHtml}
    </div>`

    openTooltip(`${enemy.name} — Niveau ${enemy.level}`, body)
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
        const eff0     = mv.effects?.[0]
        const elem     = eff0?.element || 'neutre'
        const mvType   = eff0?.type || ''
        const barElem  = mvType === 'buff' ? 'buff' : mvType === 'debuff' ? 'malus' : elem
        const typeLabel = TYPE_LABELS[mvType] || mvType || '—'
        let detail = ''
        if (eff0?.damage) detail = `${eff0.damage.min}–${eff0.damage.max}`
        const cdSec = mv.cooldownMs ? (mv.cooldownMs / 1000).toFixed(1) + 's' : ''
        return `<div class="es-move-row elem-bar-${barElem}" data-move-id="${moveId}">
            ${elemIcon(elem, 'es-move-elem-icon')}
            <span class="es-move-name">${mv.name}</span>
            <span class="es-move-type">${typeLabel}</span>
            <span class="es-move-detail">${detail}</span>
            ${cdSec ? `<span class="es-move-cd">${cdSec}</span>` : ''}
        </div>`
    }).join('')

    let familiarHtml = ''
    const fam = mob.familiar
    if (fam?.bonusStat && fam.min != null && fam.max != null && fam.bonusType !== 'farming') {
        const STAT_L = { atk: 'Puissance', maxHp: 'PV', spd: 'Initiative', flatDamage: 'Dégâts fixes', finalDamagePct: 'Dégâts finaux %', spellDamagePct: 'Dég. sorts', damageReductionPct: 'Réd. dégâts', critChance: 'Crit' }
        const statLbl = STAT_L[fam.bonusStat] || fam.bonusStat
        familiarHtml = `<div class="ms-section-title">Familier</div>
        <div style="font-size:0.8rem;opacity:0.75;padding:0.15rem 0;">+${fam.min}–${fam.max} ${statLbl}</div>`
    }

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
        ${familiarHtml}
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
        damage: 'Attaque', damage_zone: 'Zone', dot: 'DOT',
        heal: 'Soin', heal_team: 'Soin (équipe)',
        buff: 'Buff', buff_team: 'Buff (équipe)', debuff: 'Débuff',
        shield: 'Bouclier', lifesteal: 'Vol de vie', summon: 'Invocation'
    }
    const STAT_LABELS = {
        atk: 'Puissance', spd: 'Initiative', flatDamage: 'Dégâts fixes',
        finalDamagePct: 'Dég. finaux %', spellDamagePct: 'Dég. sorts %',
        damageReductionPct: 'Réd. dégâts %', critChance: 'Crit', critDamagePct: 'Dég. crit %',
        healPct: 'Soins %', healTeamPct: 'Soins équipe %', healMaxHpPct: 'Soins PV max %', lifestealPct: 'Vol de vie %'
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
            : (eff.type === 'heal' || eff.type === 'heal_team') ? 'mt-effect-heal'
            : (eff.type === 'buff' || eff.type === 'buff_team' || eff.type === 'shield') ? 'mt-effect-buff'
            : eff.type === 'debuff' ? 'mt-effect-debuff'
            : 'mt-effect-neutre'

        let rows = `<div class="mt-row"><span class="mt-label">Type</span><span class="mt-val">${typeLabel} ${elemBadge}</span></div>`

        if (eff.damage) {
            rows += `<div class="mt-row"><span class="mt-label">Base</span><span class="mt-val">${eff.damage.min}–${eff.damage.max}</span></div>`
            if (casterStats) {
                const minF = _mvDmg(casterStats, eff.damage.min)
                const maxF = _mvDmg(casterStats, eff.damage.max)
                rows += `<div class="mt-row"><span class="mt-label">Final (0% rés.)</span><span class="mt-val mt-accent">${minF}–${maxF}</span></div>`
            }
            if (eff.type === 'dot' && eff.duration) {
                rows += `<div class="mt-row"><span class="mt-label">Durée</span><span class="mt-val">${eff.duration} tours</span></div>`
            }
        }

        if ((eff.type === 'heal' || eff.type === 'heal_team') && eff.value) {
            rows += `<div class="mt-row"><span class="mt-label">Soin</span><span class="mt-val">${eff.value}</span></div>`
        }

        if (eff.ratio != null) {
            rows += `<div class="mt-row"><span class="mt-label">Vol de vie</span><span class="mt-val">${Math.round(eff.ratio * 100)}% des dégâts</span></div>`
        }

        if ((eff.type === 'buff' || eff.type === 'buff_team' || eff.type === 'debuff') && eff.stat) {
            const statLbl = STAT_LABELS[eff.stat] || eff.stat
            const sign = eff.value >= 0 ? '+' : ''
            rows += `<div class="mt-row"><span class="mt-label">Effet</span><span class="mt-val">${sign}${eff.value} ${statLbl}</span></div>`
            if (eff.duration) rows += `<div class="mt-row"><span class="mt-label">Durée</span><span class="mt-val">${eff.duration} tours</span></div>`
        }

        if (eff.type === 'shield' && eff.value) {
            rows += `<div class="mt-row"><span class="mt-label">Absorption</span><span class="mt-val">${eff.value}</span></div>`
        }

        if (eff.type === 'summon' && eff.summonId) {
            const summonMob = monsters[eff.summonId]
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
            if (patch.damage)    changes.push(`dégâts ${patch.damage.min}–${patch.damage.max}`)
            if (patch.lifesteal) changes.push(`vol de vie ${Math.round(patch.lifesteal.ratio * 100)}%`)
            if (patch.heal != null)    changes.push(`soin ${patch.heal}`)
            if (patch.healPct != null) changes.push(`soin ${patch.healPct}% PV max`)
            if (patch.shield)    changes.push(`bouclier ${patch.shield.value ?? '?'}`)
            if (patch.buff) {
                const _s   = PATCH_STAT_LABELS[patch.buff.stat] || patch.buff.stat || ''
                const _sgn = patch.buff.value >= 0 ? '+' : ''
                const _dur = patch.buff.duration ? ` (${patch.buff.duration} tours)` : ''
                changes.push(`${_sgn}${patch.buff.value} ${_s}${_dur}`)
            }
            if (patch.dot) {
                const _dur = patch.dot.duration ? ` ×${patch.dot.duration} tours` : ''
                changes.push(`Brûlure ${patch.dot.value ?? '?'}${_dur}`)
            }
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

function equipFamiliarFromSheet(classId, monsterId) {
    const member = state.team.find(m => m && m.classId === classId)
    if (!member) return

    member.equip.familier = monsterId || null
    const stats = getEffectiveStats(member)
    if (stats) member.maxHp = stats.hp

    saveGame()
    updateTeamUI()

    closeTooltip()
    closeTooltip()
    showMemberSheet(member)
}
