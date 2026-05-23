// ui/team.js — Gestion de l'équipe DofusChill

const MAX_TEAM = 6
let _guildeTargetSlot = -1
let _dragSourceIndex  = -1
let _tutoTeamPicked   = false  // true une fois que le joueur a "ajouté" son perso pendant team_prep

// ─── Rendu du menu équipe ─────────────────────────────────────────────────────

function updateTeamUI() {
    const preview = document.getElementById('team-preview')
    if (!preview) return
    preview.innerHTML = ''

    const isTutoPrepEmpty = state.tutorial === 'team_prep' && !_tutoTeamPicked

    for (let i = 0; i < MAX_TEAM; i++) {
        const member = isTutoPrepEmpty ? null : state.team[i]
        const card   = document.createElement('div')

        if (member) {
            const cls   = classes[member.classId]
            const stats = getEffectiveStats(member)
            const maxHp = member.maxHp || stats?.hp || 1
            const hpPct = Math.max(0, Math.floor(((member.currentHp ?? maxHp) / maxHp) * 100))
            const xpRequired = getXPRequired(member.level)
            const xpPct = Math.min(100, Math.floor(((member.exp || 0) / xpRequired) * 100))

            const moveSlots = ['slot1', 'slot2', 'slot3', 'slot4']
            const moveBars  = moveSlots.map(s => {
                if (!member.moves[s]) {
                    return `<div class="combat-move-bar combat-move-empty"><span class="combat-move-name">—</span></div>`
                }
                const mv      = move[member.moves[s]]
                const elem    = mv?.effects?.[0]?.element || 'neutre'
                const mvType  = mv?.effects?.[0]?.type || ''
                const barElem = mvType === 'buff' ? 'buff' : mvType === 'debuff' ? 'debuff' : elem
                return `<div class="combat-move-bar elem-bar-${barElem}" data-move-id="${member.moves[s]}" data-caster-class="${member.classId}">
                    <div class="combat-move-fill elem-bar-${barElem}" style="width:0%"></div>
                    <span class="combat-move-name">${mv?.name || '—'}${moveRestrictionSigle(mv, elem)}</span>
                    <div class="combat-move-icon-bg elem-bar-${barElem}">${elemIcon(moveIconKey(mv), 'combat-move-icon')}</div>
                </div>`
            }).join('')

            card.className   = 'explore-team-member team-menu-card'
            card.dataset.help = member.classId
            card.dataset.slotIndex = i
            if (!state.isRunning) card.draggable = true
            card.innerHTML   = `
                <div class="explore-team-member-flair"></div>
                <div class="member-sprite-wrap">
                    <img class="member-sprite" src="${getMemberImage(member)}" onerror="this.src='img/icons/icon.png'">
                </div>
                <div class="member-info">
                    <div class="member-title-row">
                        <span class="member-name">${member.name || cls?.name || '?'}</span>
                        <span class="member-level level-badge${_getTeamPrepSyncedLevel(member) ? ' level-synced' : ''}">lvl ${_getTeamPrepSyncedLevel(member) || member.level}</span>
                        <button class="team-slot-remove" onclick="removeFromTeam(${i})" title="Retirer">✕</button>
                    </div>
                    <div class="member-xp-bar">
                        <div class="member-xp-fill" style="width:${xpPct}%"></div>
                    </div>
                    <div class="member-moves">${moveBars}</div>
                    <div class="member-equip-row">${renderEquipSlots(member, i)}</div>
                </div>`
        } else {
            const emptyMoves = Array(4).fill(
                `<div class="combat-move-bar combat-move-empty"><span class="combat-move-name">—</span></div>`
            ).join('')
            const emptyEquip = EQUIP_SLOT_ORDER.map(slot => {
                const label = EQUIP_SLOT_LABEL[slot] || slot
                return `<div class="equip-bubble equip-bubble-placeholder" title="${label}">
                    <span class="equip-bubble-empty">${label.substring(0, 3)}</span>
                </div>`
            }).join('')

            card.className = 'explore-team-member team-menu-card team-menu-empty-card'
            card.dataset.slotIndex = i
            card.style.opacity = isTutoPrepEmpty && i > 0 ? '0.2' : '0.45'
            card.style.cursor  = isTutoPrepEmpty && i > 0 ? 'default' : 'pointer'
            card.onclick = isTutoPrepEmpty && i > 0 ? null : () => openGuildePicker(i)
            card.innerHTML = `
                <div class="explore-team-member-flair"></div>
                <div class="member-sprite-wrap">
                    <img class="member-sprite" src="img/classes/choixdeclasse.png" onerror="this.src='img/icons/icon.png'">
                </div>
                <div class="member-info">
                    <div class="member-title-row">
                        <span class="member-name">—</span>
                        <span style="margin-left:auto; font-size:1.2rem; opacity:0.7; line-height:1;">+</span>
                    </div>
                    <div class="member-xp-bar"><div class="member-xp-fill" style="width:0%"></div></div>
                    <div class="member-moves">${emptyMoves}</div>
                    <div class="member-equip-row">${emptyEquip}</div>
                </div>`
        }
        preview.appendChild(card)
    }
}

const EQUIP_SLOT_ORDER = [
    'coiffe', 'bouclier', 'anneau', 'ceinture', 'bottes',
    'amulette', 'arme', 'cape', 'anneau2', 'familier', 'accessoire'
]
const EQUIP_SLOT_LABEL = {
    coiffe: 'Coiffe', bouclier: 'Bouclier', anneau: 'Anneau', ceinture: 'Ceinture',
    bottes: 'Bottes', amulette: 'Amulette', arme: 'Arme', cape: 'Cape',
    anneau2: 'Anneau', familier: 'Familier', accessoire: 'Accessoire'
}

function renderEquipSlots(member, slotIndex) {
    return EQUIP_SLOT_ORDER.map(slot => {
        const itemId = member.equip?.[slot]
        const label  = EQUIP_SLOT_LABEL[slot] || slot

        if (slot === 'familier') {
            const mob  = itemId ? monsters[itemId] : null
            const flvl = itemId ? (state.collection[itemId]?.level || 0) : 0
            return `<div class="equip-bubble"
                         onclick="openEquipSelector(${slotIndex}, 'familier')"
                         ${mob ? `oncontextmenu="event.preventDefault(); event.stopPropagation(); showMonsterTooltip('${itemId}')"` : ''}
                         title="Familier">
                        ${mob
                            ? `<span class="bubble-level">Niv.${flvl}</span>
                               <img src="${mob.image}" onerror="this.src='img/icons/icon.png'">`
                            : `<img class="equip-bubble-placeholder" src="${MS_SLOT_ICONS['familier']}">`}
                    </div>`
        }

        const itm  = itemId ? item[itemId] : null
        const ilvl = itemId ? getItemLevel(itemId) : 0
        const _skullCap = (() => {
            if (_pendingAreaId && state.skullLevel > 0) return areas[_pendingAreaId]?.maxLevel || null
            if (typeof combat !== 'undefined' && combat?.syncedLevel) return combat.syncedLevel
            return null
        })()
        const isLocked = itm && _skullCap !== null && itm.requiredLevel && itm.requiredLevel > _skullCap
        return `<div class="equip-bubble${isLocked ? ' equip-bubble-locked' : ''}"
                     onclick="openEquipSelector(${slotIndex}, '${slot}')"
                     ${itemId ? `data-help="${itemId}"` : ''}
                     title="${label}${isLocked ? ` (🔒 niv. ${itm.requiredLevel} requis)` : ''}">
                    ${itm
                        ? `<span class="bubble-level">Niv.${ilvl}</span>
                           <img src="${itm.image}" onerror="this.src='img/icons/icon.png'" style="${isLocked ? 'opacity:0.35;filter:grayscale(1)' : ''}">
                           ${isLocked ? '<span class="bubble-lock">🔒</span>' : ''}`
                        : `<img class="equip-bubble-placeholder" src="${MS_SLOT_ICONS[slot] || 'img/icons/icon.png'}">`}
                </div>`
    }).join('')
}

// ─── Guilde (sélecteur de classe) ────────────────────────────────────────────

function openGuildePicker(slotIndex) {
    _guildeTargetSlot = slotIndex
    const list   = document.getElementById('guilde-picker-list')
    const picker = document.getElementById('guilde-picker')
    if (!list || !picker) return

    _fillGuildeList(list, classId => pickClassForSlot(classId))

    document.getElementById('team-preview').style.display = 'none'
    picker.style.display = 'flex'
}

const CLASS_OBTAIN = {
        iop:        'Nouvel aventurier également, il se peut que vos routes se croisent rapidement...',
        cra:        'Nouvel aventurier également, il se peut que vos routes se croisent rapidement...',
        eniripsa:   'Nouvel aventurier également, il se peut que vos routes se croisent rapidement...',
        enutrofe:   'Vieillard ayant connu la guerre opposant Bonta à Brâkmar, il est particulièrement proche de ses kamas... Peut-être que si vous en accumulez assez, il acceptera de rejoindre votre guilde ?',
        xelor:      "Maîtres du temps, ce n'est qu'après avoir prouvé votre valeur en vous imposant victorieux face à l'un de ses semblables qu'il vous rejoindra.",
        huppermage: "Grand maître des éléments, il vous faudra lui prouver que vous aussi, vous savez dompter les créatures maîtrisant ces quatre magies que sont la Terre, le Feu, l'Eau et l'Air.",
        zobal:      "Gardiens des Masques Ancestraux, ils ne s'allient qu'à ceux dont la collection de familiers témoigne d'une vraie compréhension du monde.",
        sacrieur:   "Guerriers au sang lié à leurs douleurs, ils ne s'éveillent qu'au contact de ceux qui ont encaissé des centaines de combats sans jamais fuir.",
        sram:       "Assassin des ombres qui tire sa puissance des âmes terrassées, le Sram n'émerge que lorsqu'il flaire un chasseur d'élite.",
        feca:       "Gardien de troupeau aux glyphes impénétrables, cet aventurier ne vous rejoindra que si vous triomphez d'un adversaire aussi inébranlable que lui.",
        osamodas:   "Maître du monde animal, il ne fait confiance qu'aux aventuriers dont la collection de créatures rivalise avec la sienne.",
        sadida:     "Esprit de la forêt qui communique avec les plantes, il est trop occupé à essayer d'apaiser les arbres corrompus. Attendez que quelqu'un parvienne à trouver comment soigner ce mal avant de vous accorder sa bénédiction.",
        roublard:   "Artificier kamikaze au sens du danger... inexistant, vous ne le recruterez pas, car il n'accepte dans ses rangs que les téméraires ayant survécu aux pires affrontements... (Enfin, c'est son amour-propre qui parle ; il saura vous prêter main-forte contre quelques kamas).",
        ecaflip:    "Joueur invétéré dont la fortune ne tient qu'à un fil, si vous le battez aux cartes, peut-être aurez-vous la chance de le compter parmi vous.",
        steamer:    "Ingénieur de guerre implacable, cet homme de fer ne vous prêtera main-forte que si vous capturez un certain pirate des hauts-fonds en possession d'un important arsenal technomagique.",
        ouginak:    "Chasseur bestial dont l'instinct prédateur ne s'éveille qu'au contact de vrais guerriers — ceux capables de traquer et d'abattre les proies les plus redoutables.",
        forgelance: "Lancier dont la puissance n'a d'égal que sa précision, il ne jure que par sa lance et ne ploie le genou que devant les aventuriers ayant mis à genoux les plus grands boss du monde.",
        pandawa:    "Bretteur ivre dont l'équilibre défie toute logique, il s'allie à ceux qui savent rester... à peu près debout face aux adversaires les plus coriaces. Son péché mignon (après l'alcool) ? Il adore le poulpe.",
        eliotrope:  "Maître des portails dont les arcanes transcendent l'espace, cet être à l'apparence rappelant celle des dragons ne vous rejoindra que si vous êtes plus fort qu'eux.",
}

function showClassObtain(classId) {
    const cls = classes[classId]
    if (!cls) return
    const obtainText = CLASS_OBTAIN[classId] || 'Moyen d\'obtention à venir.'
    const body = `<div class="member-sheet">
        <div style="text-align:center;padding:1rem 0;">
            <img src="${cls.image}" style="width:6rem;height:6rem;object-fit:contain;filter:brightness(0) saturate(0);" onerror="this.src='img/icons/icon.png'">
        </div>
        <div class="ms-section-title">Classe verrouillée</div>
        <div style="padding:0.5rem;opacity:0.7;font-size:0.9rem;line-height:1.5;">${obtainText}</div>
    </div>`
    openTooltip('???', body)
}

function closeGuildePicker() {
    const picker = document.getElementById('guilde-picker')
    if (picker) picker.style.display = 'none'
    document.getElementById('team-preview').style.display = ''
    _guildeTargetSlot = -1
}

function showClassPreview(classId) {
    const saved  = state.classEquip?.[classId]
    const level  = saved?.level || 1
    const member = state.team.find(m => m?.classId === classId)
        || createTeamMember(classId, level)
    if (member) { member.exp = member.exp ?? (saved?.exp || 0); showMemberSheet(member) }
}

function _fillGuildeList(list, onClickFn, showAll = false) {
    list.innerHTML = ''
    const isTutoPick = state.tutorial === 'team_prep'
    for (const classId of Object.keys(classes)) {
        const isUnlocked = state.unlockedClasses?.includes(classId)

        // Picker (ajout à l'équipe) : exclure locked + déjà en équipe (sauf pendant tuto)
        if (!showAll) {
            if (!isUnlocked) continue
            const alreadyInTeam = state.team.some(m => m && m.classId === classId)
            if (alreadyInTeam && !isTutoPick) continue
        }

        const cls  = classes[classId]
        const card = document.createElement('div')
        card.className = 'guilde-class-card' + (!isUnlocked ? ' guilde-class-locked' : '')

        if (showAll) {
            // Guilde menu : clic → fiche ou page d'obtention
            const handler = () => isUnlocked ? showClassPreview(classId) : showClassObtain(classId)
            card.onclick = handler
            card.addEventListener('contextmenu', e => { e.preventDefault(); handler() })
        } else if (onClickFn) {
            card.onclick = () => onClickFn(classId)
        }

        const teamMember = state.team.find(m => m && m.classId === classId)
        const imgSrc     = (isUnlocked && teamMember) ? getMemberImage(teamMember) : cls.image
        const imgStyle   = isUnlocked ? '' : 'filter:brightness(0) saturate(0);'
        card.innerHTML = `
            <div class="guilde-sprite-wrap">
                <img class="guilde-sprite" src="${imgSrc}" style="${imgStyle}" onerror="this.src='img/icons/icon.png'">
            </div>
            <span class="guilde-class-name">${isUnlocked ? cls.name : '???'}</span>`
        list.appendChild(card)
    }
}

function updateGuildeUI() {
    const list = document.getElementById('guilde-menu-list')
    if (!list) return
    _fillGuildeList(list, null, true)
}

function pickClassForSlot(classId) {
    const slot = _guildeTargetSlot
    closeGuildePicker()
    // Pendant team_prep, on réajoute vraiment le perso (il avait été vidé de state.team)
    if (state.tutorial === 'team_prep') {
        _tutoTeamPicked = true
    }
    addToTeam(classId, slot)
}

// ─── Actions équipe ───────────────────────────────────────────────────────────

function addToTeam(classId, slotIndex) {
    if (state.team.some(m => m && m.classId === classId)) {
        showNotification('Ce personnage est déjà dans l\'équipe !', 'error')
        return
    }

    const saved  = state.classEquip?.[classId]
    const level  = saved?.level || 1
    const member = createTeamMember(classId, level)
    if (!member) return
    member.exp    = saved?.exp    || 0
    member.gender = saved?.gender || 'male'
    member.name   = saved?.name   || null

    const stats = getEffectiveStats(member)
    if (stats) member.maxHp = stats.hp

    while (state.team.length <= slotIndex) state.team.push(null)
    state.team[slotIndex] = member

    saveGame()
    updateTeamUI()
    showNotification(`${classes[classId].name} rejoint l'équipe !`, 'info')
}

function removeFromTeam(slotIndex) {
    if (state.isRunning || (typeof combat !== 'undefined' && combat !== null)) {
        showNotification('Impossible de modifier l\'équipe en combat !', 'error')
        return
    }
    const member = state.team[slotIndex]
    if (member) {
        if (!state.classEquip) state.classEquip = {}
        state.classEquip[member.classId] = {
            level:  member.level,
            exp:    member.exp,
            gender: member.gender || 'male',
            name:   member.name   || null
        }
    }
    state.team[slotIndex] = null
    state.team = state.team.filter(m => m !== null)
    saveGame()
    updateTeamUI()
}

// ─── Sélecteur d'équipement — grille avec filtre/tri ────────────────────────

let _equipPickState = null

const EQUIP_STAT_LABELS = {
    maxHp: 'PV', atk: 'Puissance', spd: 'Initiative',
    flatDamage: 'Dégâts fixes', finalDamagePct: 'Dégâts finaux %',
    spellDamagePct: 'Sorts %', critChance: 'Crit.',
    critDamagePct: 'Dég. crit.', damageReductionPct: 'Réduction',
    healPct: 'Soins %', healTeamPct: 'Soins équipe %', healMaxHpPct: 'Soins PV max %', lifestealPct: 'Vol de vie %',
    'res.feu': 'Rés. Feu', 'res.eau': 'Rés. Eau',
    'res.terre': 'Rés. Terre', 'res.air': 'Rés. Air',
    'res.neutre': 'Rés. Neutre',
}

function _doEquipPick(itemId) {
    if (_equipPickState?.onEquip) _equipPickState.onEquip(itemId)
}
function _doEquipRemove() {
    if (_equipPickState?.onRemove) _equipPickState.onRemove()
}

function setEquipPickFilter(stat) {
    if (!_equipPickState) return
    _equipPickState.filter = stat || null
    document.querySelectorAll('.equip-filter-btn').forEach(btn =>
        btn.classList.toggle('active', (btn.dataset.filter || '') === (stat || ''))
    )
    renderEquipPickGrid()
}

function setEquipPickSort(sortKey) {
    if (!_equipPickState) return
    _equipPickState.sort = sortKey
    document.querySelectorAll('.equip-sort-btn').forEach(btn =>
        btn.classList.toggle('active', btn.dataset.sort === sortKey)
    )
    renderEquipPickGrid()
}

function renderEquipPickGrid() {
    const grid = document.querySelector('.equip-pick-grid')
    if (!grid || !_equipPickState) return
    const { items, filter, sort, takenByOther, skullMaxLevel, isFamiliar } = _equipPickState

    let filtered = filter
        ? items.filter(e => isFamiliar
            ? e.famBonus?.stat === filter
            : e.stats?.some(s => s.stat === filter))
        : [...items]

    filtered.sort((a, b) => {
        if (sort === 'bonus')  return (b.famBonus?.value || 0) - (a.famBonus?.value || 0)
        if (sort === 'req')    return (a.requiredLevel   || 0) - (b.requiredLevel   || 0)
        if (isFamiliar) return (b.entry?.level || 0) - (a.entry?.level || 0)
        return getItemLevel(b.id) - getItemLevel(a.id)
    })

    const isDisabled = e =>
        takenByOther.has(e.id) ||
        (!isFamiliar && skullMaxLevel !== null && e.requiredLevel && e.requiredLevel > skullMaxLevel)

    const available = filtered.filter(e => !isDisabled(e))
    const disabled  = filtered.filter(e =>  isDisabled(e))

    let html = ''
    for (const e of [...available, ...disabled]) {
        const taken    = takenByOther.has(e.id)
        const locked   = !isFamiliar && skullMaxLevel !== null && e.requiredLevel && e.requiredLevel > skullMaxLevel
        const disClass = locked ? ' equip-pick-locked' : taken ? ' equip-pick-disabled' : ''
        const handler  = (taken || locked) ? '' : `onclick="_doEquipPick('${e.id}')"`

        if (isFamiliar) {
            const FAM_BUBBLE_LABELS = { atk: 'Pui', dropRate: '% drop', xpGain: 'XP' }
            const statLabel = e.famBonus ? (FAM_BUBBLE_LABELS[e.famBonus.stat] ?? formatBonusStat(e.famBonus.stat)) : null
            const bonus = e.famBonus ? `+${e.famBonus.value} ${statLabel}` : '—'
            html += `<div class="equip-pick-item${disClass}" ${handler}
                         oncontextmenu="event.preventDefault(); showMonsterTooltip('${e.id}')"
                         title="${e.mob?.name || e.id}">
                <div class="equip-pick-bubble">
                    <span class="bubble-level">${bonus}</span>
                    <img src="${e.mob?.image || 'img/icons/icon.png'}" onerror="this.src='img/icons/icon.png'">
                </div>
            </div>`
        } else {
            const lvl = getItemLevel(e.id)
            const req = e.requiredLevel ? `lvl req. ${e.requiredLevel}` : '—'
            html += `<div class="equip-pick-item${disClass}" ${handler}
                         oncontextmenu="event.preventDefault(); showItemTooltip('${e.id}')"
                         title="${e.name}">
                <div class="equip-pick-bubble">
                    <span class="bubble-level">Niv.${lvl}</span>
                    <img src="${e.image}" onerror="this.src='img/icons/icon.png'">
                </div>
                <span class="pick-bubble-req">${req}</span>
            </div>`
        }
    }

    if (!html) {
        if (items.length === 0) html = `<div class="equip-pick-empty">Aucun équipement disponible.</div>`
        else html = `<div class="equip-pick-empty">Aucun résultat pour ce filtre.</div>`
    }
    grid.innerHTML = html

    // Re-snapshot le contenu rendu dans le tooltip stack pour que closeTooltip
    // puisse le restaurer intact (la grille était vide au moment du push initial)
    const bot = document.getElementById('tooltipBottom')
    const stackEntry = tooltipStack[tooltipStack.length - 1]
    if (stackEntry && bot && bot.contains(grid)) stackEntry.body = bot.innerHTML
}

function _buildEquipSelectorShell(removeLabel, filterStats, isFamiliar) {
    let filterHtml = `<button class="equip-filter-btn active" data-filter="" onclick="setEquipPickFilter(null)">Tous</button>`
    for (const [stat, label] of filterStats) {
        filterHtml += `<button class="equip-filter-btn" data-filter="${stat}" onclick="setEquipPickFilter('${stat}')">${label}</button>`
    }

    const sorts = isFamiliar
        ? `<button class="equip-sort-btn active" data-sort="level" onclick="setEquipPickSort('level')">Niv. ↓</button>
           <button class="equip-sort-btn" data-sort="bonus" onclick="setEquipPickSort('bonus')">Bonus ↓</button>`
        : `<button class="equip-sort-btn active" data-sort="level" onclick="setEquipPickSort('level')">Niv. item ↓</button>
           <button class="equip-sort-btn" data-sort="req" onclick="setEquipPickSort('req')">Niv. requis ↑</button>`

    return `<div class="equip-selector">
        <div class="equip-remove-row">
            <button class="equip-remove-btn" onclick="_doEquipRemove()">${removeLabel}</button>
        </div>
        <div class="equip-controls">
            <div class="equip-filter-bar">${filterHtml}</div>
            <div class="equip-sort-bar">${sorts}</div>
        </div>
        <div class="equip-pick-grid"></div>
    </div>`
}

function openFamiliarSelector(memberIndex, fromSheet = false) {
    const member = state.team[memberIndex]
    if (!member) return

    const takenByOther = new Set()
    for (const [idx, other] of state.team.entries()) {
        if (!other || idx === memberIndex) continue
        if (other.equip?.familier) takenByOther.add(other.equip.familier)
    }

    const famItems = Object.keys(state.collection).map(monsterId => {
        const mob      = monsters[monsterId]
        const entry    = state.collection[monsterId]
        if (!mob || !entry) return null
        const famBonus = mob.familiar ? getFamiliarBonusValue(monsterId) : null
        return { id: monsterId, mob, entry, famBonus }
    }).filter(Boolean)

    const bonusStats   = [...new Set(famItems.filter(e => e.famBonus).map(e => e.famBonus.stat))]
    const filterStats  = bonusStats.map(s => [s, formatBonusStat(s)])

    _equipPickState = {
        items: famItems,
        filter: null,
        sort: 'level',
        takenByOther,
        skullMaxLevel: null,
        isFamiliar: true,
        onEquip:  fromSheet
            ? (id) => equipFamiliarFromSheet(member.classId, id)
            : (id) => { equipFamiliar(memberIndex, id); closeTooltip() },
        onRemove: fromSheet
            ? () => equipFamiliarFromSheet(member.classId, null)
            : () => { equipFamiliar(memberIndex, null); closeTooltip() },
    }

    openTooltip('Familier', _buildEquipSelectorShell('Retirer le familier', filterStats, true))
    renderEquipPickGrid()
}

function equipFamiliar(memberIndex, monsterId) {
    const member = state.team[memberIndex]
    if (!member) return
    member.equip.familier = monsterId || null
    const stats = getEffectiveStats(member)
    if (stats) member.maxHp = stats.hp
    saveGame()
    updateTeamUI()
}

function openEquipSelector(memberIndex, equipSlot) {
    if (equipSlot === 'familier') { openFamiliarSelector(memberIndex); return }
    const member = state.team[memberIndex]
    if (!member) return

    const takenByOther = new Set()
    for (const [idx, other] of state.team.entries()) {
        if (!other) continue
        for (const [s, itemId] of Object.entries(other.equip || {})) {
            if (idx === memberIndex && s === equipSlot) continue
            if (itemId) takenByOther.add(itemId)
        }
    }

    const targetSlot = equipSlot === 'anneau2' ? 'anneau' : equipSlot
    const compatible = Object.values(item).filter(itm =>
        itm.type === 'equipment' && state.inventory[itm.id] &&
        (!itm.slot || itm.slot === targetSlot)
    )

    const _skullMaxLevel = (() => {
        if (_pendingAreaId && state.skullLevel > 0) return areas[_pendingAreaId]?.maxLevel || null
        if (typeof combat !== 'undefined' && combat?.syncedLevel) return combat.syncedLevel
        return null
    })()

    const statSet = new Set()
    compatible.forEach(itm => itm.stats?.forEach(s => statSet.add(s.stat)))
    const filterStats = [...statSet].map(s => [s, EQUIP_STAT_LABELS[s] || s])

    _equipPickState = {
        items: compatible,
        filter: null,
        sort: 'level',
        takenByOther,
        skullMaxLevel: _skullMaxLevel,
        isFamiliar: false,
        onEquip:  (id) => { equipItem(memberIndex, equipSlot, id); closeTooltip() },
        onRemove: () => { equipItem(memberIndex, equipSlot, null); closeTooltip() },
    }

    const slotLabel = EQUIP_SLOT_LABEL[equipSlot] || equipSlot
    openTooltip(slotLabel, _buildEquipSelectorShell("Retirer l'équipement", filterStats, false))
    renderEquipPickGrid()
}

function equipItem(memberIndex, equipSlot, itemId) {
    const member = state.team[memberIndex]
    if (!member) return
    member.equip[equipSlot] = itemId

    const stats = getEffectiveStats(member)
    if (stats) member.maxHp = stats.hp

    saveGame()
    updateTeamUI()
}

// ─── Drag-and-drop reorder ────────────────────────────────────────────────────

function initTeamDragDrop() {
    const preview = document.getElementById('team-preview')
    if (!preview) return

    // ── Desktop (HTML5 drag API) ──────────────────────────────────────────────

    preview.addEventListener('dragstart', e => {
        const card = e.target.closest('[data-slot-index]')
        if (!card || !card.classList.contains('explore-team-member')) return
        _dragSourceIndex = parseInt(card.dataset.slotIndex)
        card.classList.add('drag-dragging')
    })

    preview.addEventListener('dragend', e => {
        preview.querySelectorAll('.drag-dragging, .drag-over')
            .forEach(el => el.classList.remove('drag-dragging', 'drag-over'))
        _dragSourceIndex = -1
    })

    preview.addEventListener('dragover', e => {
        const card = e.target.closest('[data-slot-index]')
        if (!card || _dragSourceIndex === -1) return
        const targetIndex = parseInt(card.dataset.slotIndex)
        if (targetIndex === _dragSourceIndex) return
        if (!card.classList.contains('explore-team-member')) return
        e.preventDefault()
        preview.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'))
        card.classList.add('drag-over')
    })

    preview.addEventListener('drop', e => {
        const card = e.target.closest('[data-slot-index]')
        if (!card || _dragSourceIndex === -1) return
        const targetIndex = parseInt(card.dataset.slotIndex)
        if (targetIndex === _dragSourceIndex) return
        if (!card.classList.contains('explore-team-member')) return
        e.preventDefault()

        const tmp = state.team[_dragSourceIndex]
        state.team[_dragSourceIndex] = state.team[targetIndex]
        state.team[targetIndex] = tmp

        saveGame()
        updateTeamUI()
    })

    // ── Mobile (touch drag) ───────────────────────────────────────────────────

    let _touchDragCard   = null
    let _touchDragSrc    = -1
    let _canStartDrag    = false
    let _touchDragActive = false
    let _touchDragTimer  = null
    let _touchStartX     = 0
    let _touchStartY     = 0
    let _touchGhost      = null

    function _touchDragCleanup() {
        if (_touchGhost) { _touchGhost.remove(); _touchGhost = null }
        if (_touchDragCard) {
            _touchDragCard.style.opacity    = ''
            _touchDragCard.style.transform  = ''
            _touchDragCard.style.transition = ''
        }
        preview.querySelectorAll('.drag-dragging, .drag-over')
            .forEach(el => el.classList.remove('drag-dragging', 'drag-over'))
        _touchDragCard   = null
        _touchDragSrc    = -1
        _canStartDrag    = false
        _touchDragActive = false
    }

    preview.addEventListener('touchstart', e => {
        const card = e.target.closest('.explore-team-member[data-slot-index]')
        if (!card || state.isRunning || e.touches.length !== 1) return
        // Laisse les clics sur les boutons équip / retirer se propager normalement
        if (e.target.closest('.equip-bubble, .team-slot-remove')) return

        _touchDragCard   = card
        _touchDragSrc    = parseInt(card.dataset.slotIndex)
        _touchStartX     = e.touches[0].clientX
        _touchStartY     = e.touches[0].clientY
        _canStartDrag    = false
        _touchDragActive = false

        clearTimeout(_touchDragTimer)
        _touchDragTimer = setTimeout(() => {
            _touchDragTimer = null
            _canStartDrag   = true
            window.cancelLongPress?.()   // empêche l'ouverture du tooltip de classe
            navigator.vibrate?.(50)
            card.style.transform  = 'scale(1.02)'
            card.style.transition = 'transform 0.1s'
        }, 250)
    }, { passive: true })

    preview.addEventListener('touchmove', e => {
        if (_touchDragSrc === -1 || !_touchDragCard) return

        const touch = e.touches[0]
        const dx    = touch.clientX - _touchStartX
        const dy    = touch.clientY - _touchStartY

        if (!_canStartDrag) {
            if (Math.hypot(dx, dy) > 10) {
                // Mouvement trop rapide → scroll normal, annule le drag
                clearTimeout(_touchDragTimer)
                _touchDragTimer = null
                _touchDragCard.style.transform  = ''
                _touchDragCard.style.transition = ''
                _touchDragCard  = null
                _touchDragSrc   = -1
            }
            return
        }

        e.preventDefault()

        if (!_touchDragActive) {
            _touchDragActive = true
            _touchDragCard.style.opacity    = '0.4'
            _touchDragCard.style.transform  = ''
            _touchDragCard.style.transition = ''

            _touchGhost = _touchDragCard.cloneNode(true)
            Object.assign(_touchGhost.style, {
                position:      'fixed',
                pointerEvents: 'none',
                zIndex:        '9999',
                opacity:       '0.85',
                transform:     'scale(1.05)',
                transition:    'none',
                width:         _touchDragCard.offsetWidth  + 'px',
                left:          (touch.clientX - _touchDragCard.offsetWidth  / 2) + 'px',
                top:           (touch.clientY - _touchDragCard.offsetHeight / 2) + 'px',
            })
            document.body.appendChild(_touchGhost)
        }

        if (_touchGhost) {
            _touchGhost.style.left = (touch.clientX - _touchGhost.offsetWidth  / 2) + 'px'
            _touchGhost.style.top  = (touch.clientY - _touchGhost.offsetHeight / 2) + 'px'
        }

        const below  = document.elementFromPoint(touch.clientX, touch.clientY)
        const target = below?.closest('.explore-team-member[data-slot-index]')
        preview.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'))
        if (target && parseInt(target.dataset.slotIndex) !== _touchDragSrc) {
            target.classList.add('drag-over')
        }
    }, { passive: false })

    // touchend sur document pour capturer le relâché hors du preview
    document.addEventListener('touchend', e => {
        if (_touchDragSrc === -1) return
        clearTimeout(_touchDragTimer)
        _touchDragTimer = null

        if (_touchDragActive) {
            window.suppressNextClick?.()
            const touch  = e.changedTouches[0]
            const below  = document.elementFromPoint(touch.clientX, touch.clientY)
            const target = below?.closest('.explore-team-member[data-slot-index]')
            const tIdx   = target ? parseInt(target.dataset.slotIndex) : -1
            if (tIdx !== -1 && tIdx !== _touchDragSrc) {
                const tmp = state.team[_touchDragSrc]
                state.team[_touchDragSrc] = state.team[tIdx]
                state.team[tIdx]          = tmp
                saveGame()
                updateTeamUI()
            }
        }

        _touchDragCleanup()
    })
}
