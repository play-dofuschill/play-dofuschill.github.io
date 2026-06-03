// scripts/ui/Boss_Ultime.js — Interface Boss_Ultime (sélection dragon, préparation, combat)

// ─── Point d'entrée menu ─────────────────────────────────────────────────────

function updateBoss_UltimeUI() {
    renderBoss_UltimeSelect()
}

// ─── Écran 1 : Sélection du dragon ───────────────────────────────────────────

function renderBoss_UltimeSelect() {
    const content = document.getElementById('Boss_Ultime-content')
    if (!content) return
    content.innerHTML = ''

    const dragonList = Object.entries(Boss_UltimeDragons)

    // En-tête info (même style que zone-daily-info)
    const infoRow = document.createElement('div')
    infoRow.className = 'zone-daily-info'
    infoRow.innerHTML = `<span>Boss_Ultime &bull; <strong>${dragonList.length}</strong> dragon${dragonList.length > 1 ? 's' : ''} disponible${dragonList.length > 1 ? 's' : ''}</span>`
    content.appendChild(infoRow)

    for (const [dragonId, dragon] of dragonList) {
        const info   = Boss_UltimeGetDragonInfo(dragonId)
        const locked = !info.canFight
        const hpPct  = info.hpPct
        const hpColor = hpPct > 50 ? '#4caf50' : hpPct > 20 ? '#ff9800' : '#f44336'

        const card = document.createElement('div')
        card.className = 'explore-ticket' + (locked ? ' explore-ticket-locked' : '')
        card.innerHTML = `
            <div>
                <div class="explore-ticket-left">
                    <span>${dragon.name}${info.phase === 2 ? '<span class="Boss_Ultime-phase2-badge">Phase 2</span>' : ''}</span>
                    <div class="Boss_Ultime-hp-bar-inline">
                        <div class="Boss_Ultime-hp-bar-inline-track">
                            <div class="Boss_Ultime-hp-bar-inline-fill" style="width:${hpPct}%;background:${hpColor}"></div>
                        </div>
                        <span style="font-size:0.72em;opacity:0.7;white-space:nowrap">${info.currentHp.toLocaleString('fr-FR')} / ${info.maxHp.toLocaleString('fr-FR')} PV</span>
                    </div>
                    <span class="explore-ticket-desc">${dragon.lore}</span>
                    ${locked ? '<span class="Boss_Ultime-locked-notice">Déjà affronté aujourd\'hui — revenez demain</span>' : ''}
                </div>
                <div class="explore-ticket-right">
                    <img class="explore-ticket-sprite" src="${dragon.icon}" onerror="this.src='img/icons/icon.png'"${locked ? ' style="opacity:0.3;filter:grayscale(1)"' : ''}>
                </div>
            </div>`

        if (!locked) card.onclick = () => renderBoss_UltimePrep(dragonId)
        card.oncontextmenu = (e) => { e.preventDefault(); showBoss_UltimeDragonSheet(dragonId) }
        content.appendChild(card)
    }
}

// ─── Écran 2 : Préparation ────────────────────────────────────────────────────

let _Boss_UltimePrepDragonId = null

function renderBoss_UltimePrep(dragonId) {
    _Boss_UltimePrepDragonId = dragonId
    const content = document.getElementById('Boss_Ultime-content')
    if (!content) return
    content.innerHTML = ''

    const persist = Boss_UltimeGetPersist()
    const info    = Boss_UltimeGetDragonInfo(dragonId)
    const dragon  = info.dragon
    const hpPct   = info.hpPct
    const hpColor = hpPct > 50 ? '#4caf50' : hpPct > 20 ? '#ff9800' : '#f44336'

    // Bouton retour
    const backRow = document.createElement('div')
    backRow.className = 'Boss_Ultime-back-row'
    backRow.innerHTML = `
        <button class="Boss_Ultime-back-btn" onclick="renderBoss_UltimeSelect()">← Retour</button>`
    content.appendChild(backRow)

    // Carte boss (même structure explore-ticket, non cliquable)
    const bossCard = document.createElement('div')
    bossCard.className = 'explore-ticket'
    bossCard.style.cursor = 'default'
    bossCard.oncontextmenu = (e) => { e.preventDefault(); showBoss_UltimeDragonSheet(dragonId) }
    bossCard.innerHTML = `
        <div>
            <div class="explore-ticket-left">
                <span>${dragon.name}${info.phase === 2 ? '<span class="Boss_Ultime-phase2-badge">Phase 2</span>' : ''}</span>
                <div class="Boss_Ultime-hp-bar-inline">
                    <div class="Boss_Ultime-hp-bar-inline-track">
                        <div class="Boss_Ultime-hp-bar-inline-fill" style="width:${hpPct}%;background:${hpColor}"></div>
                    </div>
                    <span style="font-size:0.72em;opacity:0.7;white-space:nowrap">${info.currentHp.toLocaleString('fr-FR')} / ${info.maxHp.toLocaleString('fr-FR')} PV</span>
                </div>
                <span class="explore-ticket-desc">${dragon.lore}</span>
            </div>
            <div class="explore-ticket-right">
                <img class="explore-ticket-sprite" src="${dragon.icon}" onerror="this.src='img/icons/icon.png'">
            </div>
        </div>`
    content.appendChild(bossCard)

    // Label équipe
    const teamLabel = document.createElement('div')
    teamLabel.className = 'Boss_Ultime-section-label Boss_Ultime-section-label-centered'
    teamLabel.textContent = 'Équipe (3 membres max)'
    content.appendChild(teamLabel)

    // Slots équipe
    const teamGrid = document.createElement('div')
    teamGrid.id = 'Boss_Ultime-team-slots'
    teamGrid.className = 'Boss_Ultime-team-grid'
    content.appendChild(teamGrid)

    // Label deck (masqué au départ)
    const deckSection = document.createElement('div')
    deckSection.id = 'Boss_Ultime-deck-section'
    deckSection.style.display = 'none'
    deckSection.style.width = '100%'
    deckSection.innerHTML = `
        <div class="Boss_Ultime-deck-header">
            <div class="Boss_Ultime-section-label" style="margin:0">
                Sorts de <span id="Boss_Ultime-deck-member-name">—</span>
            </div>
            <span class="Boss_Ultime-deck-counter" id="Boss_Ultime-deck-counter">0/10</span>
        </div>
        <div id="Boss_Ultime-deck-pool" class="Boss_Ultime-deck-grid"></div>`
    content.appendChild(deckSection)

    // Bouton lancer
    const launchRow = document.createElement('div')
    launchRow.className = 'Boss_Ultime-launch-row'
    launchRow.innerHTML = `<button class="Boss_Ultime-launch-btn" onclick="_Boss_UltimeLaunchCombat('${dragonId}')">Lancer le combat</button>`
    content.appendChild(launchRow)

    _syncBoss_UltimeTeamLevels(persist)
    _renderBoss_UltimeTeamSlots(persist)
}

// Resynchronise les niveaux des membres Boss_Ultime avec leur niveau actuel dans le jeu
function _syncBoss_UltimeTeamLevels(persist) {
    if (!persist.team) return
    for (let i = 0; i < persist.team.length; i++) {
        const m = persist.team[i]
        if (!m) continue
        const live  = state.team.find(t => t?.classId === m.classId)
        const level = live?.level || state.classEquip?.[m.classId]?.level || 1
        if (m.level === level) continue
        const refreshed = createTeamMember(m.classId, level)
        if (!refreshed) continue
        refreshed.name  = m.name
        const equip = live?.equip || state.classEquip?.[m.classId]?.equip
        if (equip) refreshed.equip = { ...equip }
        persist.team[i] = refreshed
    }
    Boss_UltimeSaveTeamConfig()
}

function _renderBoss_UltimeTeamSlots(persist) {
    const slots = document.getElementById('Boss_Ultime-team-slots')
    if (!slots) return
    slots.innerHTML = ''

    const emptyMoveBars = Array(4).fill(
        `<div class="combat-move-bar combat-move-empty"><span class="combat-move-name">—</span></div>`
    ).join('')

    for (let i = 0; i < 3; i++) {
        const member = (persist.team || [])[i]
        const slot   = document.createElement('div')

        if (member) {
            const cls       = classes[member.classId]
            const img       = typeof getMemberImage === 'function' ? getMemberImage(member) : (cls?.image || 'img/icons/icon.png')
            const deck      = persist.memberDecks?.[member.classId] || []
            const deckCount = deck.length

            const moveBars = deck.length > 0
                ? deck.map(spellId => {
                    const mv = move[spellId]
                    if (!mv) return ''
                    return buildMoveBarHTML(mv, {
                        fillStyle: 'width:100%;opacity:0.35',
                        attrs: `oncontextmenu="event.preventDefault();showMoveTooltip('${spellId}')"`
                    })
                }).join('')
                : emptyMoveBars

            slot.className = 'explore-team-member team-menu-card'
            slot.innerHTML = `
                <div class="explore-team-member-flair"></div>
                <div class="member-sprite-wrap">
                    <img class="member-sprite" src="${img}" onerror="this.src='img/icons/icon.png'">
                </div>
                <div class="member-info">
                    <div class="member-title-row">
                        <span class="member-name">${member.name || cls?.name || '?'}</span>
                        <span class="level-badge">lvl ${member.level || 1}</span>
                        <button class="team-slot-remove" onclick="_Boss_UltimeRemoveMember(${i})" title="Retirer">✕</button>
                    </div>
                    <div class="member-xp-bar"><div class="member-xp-fill" style="width:0%"></div></div>
                    <div class="Boss_Ultime-deck-2col">${moveBars}</div>
                    <div class="member-equip-row" style="padding-top:0.3rem;">
                        <button class="Boss_Ultime-btn-small" style="width:100%;font-size:0.75rem;"
                            onclick="_Boss_UltimeOpenDeckTooltip(${i})">
                            Gérer les sorts (${deckCount}/10)
                        </button>
                    </div>
                </div>`
        } else {
            slot.className = 'explore-team-member team-menu-card team-menu-empty-card'
            slot.style.opacity = '0.45'
            slot.style.cursor  = 'pointer'
            slot.onclick = () => _Boss_UltimeOpenMemberPicker(i)
            slot.innerHTML = `
                <div class="explore-team-member-flair"></div>
                <div class="member-sprite-wrap">
                    <img class="member-sprite" src="img/classes/choixdeclasse.png" onerror="this.src='img/icons/icon.png'">
                </div>
                <div class="member-info">
                    <div class="member-title-row">
                        <span class="member-name">—</span>
                        <span style="margin-left:auto;font-size:1.2rem;opacity:0.7;line-height:1;">+</span>
                    </div>
                    <div class="member-xp-bar"><div class="member-xp-fill" style="width:0%"></div></div>
                    <div class="member-moves">${emptyMoveBars}</div>
                </div>`
        }
        slots.appendChild(slot)
    }
}

function _Boss_UltimeDeckCount(member, persist) {
    return (persist.memberDecks?.[member.classId] || []).length
}

function _Boss_UltimeRemoveMember(slotIdx) {
    const persist = Boss_UltimeGetPersist()
    if (!persist.team) persist.team = []
    persist.team[slotIdx] = null
    persist.team = persist.team.filter((_, i) => i !== slotIdx)
    Boss_UltimeSaveTeamConfig()
    _renderBoss_UltimeTeamSlots(persist)
    document.getElementById('Boss_Ultime-deck-section').style.display = 'none'
}

function _Boss_UltimeOpenMemberPicker(slotIdx) {
    const unlockedClasses = state.unlockedClasses || []
    const body = `
        <div class="Boss_Ultime-picker-grid">
            ${unlockedClasses.map(classId => {
                const cls = classes[classId]
                if (!cls) return ''
                const liveLvl = state.team.find(m => m?.classId === classId)?.level
                const level   = liveLvl || state.classEquip?.[classId]?.level || 1
                return `<div class="Boss_Ultime-class-pick" onclick="_Boss_UltimePickMember('${classId}', ${slotIdx}); closeTooltip()">
                    <img src="${cls.image}" onerror="this.src='img/icons/icon.png'">
                    <span>${cls.name}</span>
                    <small>Niv. ${level}</small>
                </div>`
            }).join('')}
        </div>`
    openTooltip('Choisir un membre', body)
}

function _Boss_UltimePickMember(classId, slotIdx) {
    const persist = Boss_UltimeGetPersist()
    if (!persist.team) persist.team = []

    // Niveau réel : priorité membre actif dans state.team, sinon classEquip
    const liveMember = state.team.find(m => m?.classId === classId)
    const level = liveMember?.level || state.classEquip?.[classId]?.level || 1
    const member = createTeamMember(classId, level)
    if (!member) return

    // Équipement : préférer le membre actif, sinon classEquip
    const equip = liveMember?.equip || state.classEquip?.[classId]?.equip
    if (equip) member.equip = { ...equip }

    // Conserve le nom si déjà configuré en Boss_Ultime
    const existing = persist.team.find(m => m?.classId === classId)
    if (existing?.name) member.name = existing.name

    persist.team[slotIdx] = member
    Boss_UltimeSaveTeamConfig()
    _renderBoss_UltimeTeamSlots(persist)
}

// ─── Éditeur de deck (10 sorts par membre) ───────────────────────────────────

let _Boss_UltimeDeckEditingSlot = null

function _Boss_UltimeOpenDeckEditor(slotIdx) {
    _Boss_UltimeDeckEditingSlot = slotIdx
    const persist = Boss_UltimeGetPersist()
    const member  = (persist.team || [])[slotIdx]
    if (!member) return

    const deckSection = document.getElementById('Boss_Ultime-deck-section')
    const deckName    = document.getElementById('Boss_Ultime-deck-member-name')
    if (!deckSection) return

    deckSection.style.display = ''
    deckSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    if (deckName) deckName.textContent = member.name || classes[member.classId]?.name || '?'

    _renderDeckPool(member, persist)
}

function _renderDeckPool(member, persist) {
    const deckPool   = document.getElementById('Boss_Ultime-deck-pool')
    const deckCounter = document.getElementById('Boss_Ultime-deck-counter')
    if (!deckPool) return

    const unlocked = Boss_UltimeUnlockedMoves(member)
    const deck     = persist.memberDecks?.[member.classId] || []

    if (deckCounter) deckCounter.textContent = `${deck.length}/10`

    deckPool.innerHTML = unlocked.map(spellId => {
        const mv = move[spellId]
        if (!mv) return ''
        const inDeck = deck.includes(spellId)
        const { bgClass, bgStyle } = getMoveElemBg(mv)
        const bgSty    = bgStyle ? ` style="${bgStyle}"` : ''
        const restrict = typeof moveRestrictionSigle === 'function' ? moveRestrictionSigle(mv, getMoveBarElems(mv).elems[0]) : ''
        return `<div class="Boss_Ultime-deck-spell ${bgClass}${inDeck ? ' Boss_Ultime-spell-selected' : ''}"${bgSty}
                    onclick="_Boss_UltimeToggleSpell('${member.classId}', '${spellId}')"
                    oncontextmenu="event.preventDefault();showMoveTooltip('${spellId}')">
            ${elemIcon(moveIconKey(mv), 'ae-move-icon')}
            <span>${mv.name}</span>
            ${restrict}
        </div>`
    }).join('')
}

function _Boss_UltimeToggleSpell(classId, spellId) {
    const persist = Boss_UltimeGetPersist()
    if (!persist.memberDecks) persist.memberDecks = {}
    let deck = persist.memberDecks[classId] || []

    if (deck.includes(spellId)) {
        deck = deck.filter(id => id !== spellId)
    } else {
        if (deck.length >= 10) {
            showNotification('Maximum 10 sorts par membre.', 'error')
            return
        }
        deck.push(spellId)
    }
    persist.memberDecks[classId] = deck
    Boss_UltimeSaveTeamConfig()

    const member = (persist.team || []).find(m => m?.classId === classId)
    if (member) _renderDeckPool(member, persist)
    _renderBoss_UltimeTeamSlots(persist)
}

// ─── Tooltip de gestion du deck ───────────────────────────────────────────────

function _Boss_UltimeOpenDeckTooltip(slotIdx) {
    const persist = Boss_UltimeGetPersist()
    const member  = (persist.team || [])[slotIdx]
    if (!member) return
    const name = member.name || classes[member.classId]?.name || '?'
    openTooltip(`Sorts de ${name}`, _buildDeckTooltipBody(slotIdx))
}

function _buildDeckTooltipBody(slotIdx) {
    const persist  = Boss_UltimeGetPersist()
    const member   = (persist.team || [])[slotIdx]
    if (!member) return ''
    const unlocked = Boss_UltimeUnlockedMoves(member)
    const deck     = persist.memberDecks?.[member.classId] || []

    const GROUPS = [
        { key: 'feu',    label: 'Feu' },
        { key: 'eau',    label: 'Eau' },
        { key: 'air',    label: 'Air' },
        { key: 'terre',  label: 'Terre' },
        { key: 'neutre', label: 'Neutre' },
        { key: 'buff',   label: 'Soutien' },
        { key: 'debuff', label: 'Débuff' },
        { key: 'heal',   label: 'Soins' },
        { key: 'autre',  label: 'Divers' },
    ]
    const ELEM_KEYS = new Set(['feu','eau','air','terre','neutre'])

    const grouped = {}
    for (const g of GROUPS) grouped[g.key] = []
    for (const spellId of unlocked) {
        const mv = move[spellId]
        if (!mv) continue
        const eff0 = mv.effects?.[0]
        const type = eff0?.type || ''
        const elem = eff0?.element || 'neutre'
        let key
        if (type === 'buff' || type === 'hot')                         key = 'buff'
        else if (type === 'debuff')                                    key = 'debuff'
        else if (type === 'heal')                                      key = 'heal'
        else if ((type === 'damage' || type === 'dot') && ELEM_KEYS.has(elem)) key = elem
        else                                                           key = 'autre'
        grouped[key].push(spellId)
    }

    let html = `<div class="Boss_Ultime-deck-tip-header">
        <span>Deck : <strong>${deck.length}/10</strong></span>
        <small style="opacity:0.5">Clic = ajouter/retirer &bull; clic droit = détails</small>
    </div>`

    for (const g of GROUPS) {
        const spells = grouped[g.key]
        if (!spells.length) continue
        const icon = ELEM_KEYS.has(g.key) ? elemIcon(g.key, 'ae-move-icon') : ''
        html += `<div class="Boss_Ultime-deck-group-label">${icon}${g.label}</div>`
        html += `<div class="Boss_Ultime-deck-tip-grid">`
        for (const spellId of spells) {
            const mv      = move[spellId]
            const inDeck  = deck.includes(spellId)
            const count   = deck.filter(id => id === spellId).length
            const maxed   = !inDeck && deck.length >= 10
            const extraCls = `${inDeck ? ' Boss_Ultime-spell-selected' : ''}${maxed ? ' Boss_Ultime-spell-blocked' : ''}`
            const onclick  = maxed ? '' : `_Boss_UltimeToggleSpellInTooltip(${slotIdx}, '${spellId}')`
            const restrict = typeof moveRestrictionSigle === 'function' ? moveRestrictionSigle(mv, getMoveBarElems(mv).elems[0]) : ''
            html += buildMoveBarHTML(mv, {
                fillStyle:   `width:${inDeck ? 100 : 0}%;opacity:0.45`,
                attrs:       `${onclick ? `onclick="${onclick}"` : ''} oncontextmenu="event.preventDefault();showMoveTooltip('${spellId}')"`,
                extraClass:  extraCls,
                extraStyle:  `cursor:${maxed ? 'not-allowed' : 'pointer'}`,
                nameContent: `${mv.name}${count > 1 ? ` ×${count}` : ''}${restrict}`
            })
        }
        html += `</div>`
    }
    return html
}

function _Boss_UltimeToggleSpellInTooltip(slotIdx, spellId) {
    const persist = Boss_UltimeGetPersist()
    const member  = (persist.team || [])[slotIdx]
    if (!member) return
    _Boss_UltimeToggleSpell(member.classId, spellId)
    // Rafraîchit le tooltip sans le fermer
    const bot = document.getElementById('tooltipBottom')
    if (bot) {
        const newBody = _buildDeckTooltipBody(slotIdx)
        bot.innerHTML = newBody
        const stackEntry = tooltipStack[tooltipStack.length - 1]
        if (stackEntry) stackEntry.body = newBody
    }
}

function _Boss_UltimeLaunchCombat(dragonId) {
    const persist = Boss_UltimeGetPersist()
    const members = (persist.team || []).filter(Boolean)
    if (!members.length) {
        showNotification('Ajoutez au moins un membre.', 'error'); return
    }
    for (const m of members) {
        const deck = persist.memberDecks?.[m.classId] || []
        if (deck.length < 1) {
            showNotification(`${classes[m.classId]?.name || '?'} n'a aucun sort sélectionné.`, 'error')
            return
        }
    }
    // Ferme le menu et affiche l'écran de combat
    const menu = document.getElementById('Boss_Ultime-menu')
    if (menu) { menu.style.display = 'none'; menu.style.zIndex = '30' }
    document.getElementById('menu-button')?.classList.remove('menu-button-open')
    if (typeof activeMenu !== 'undefined') window.activeMenu = null

    Boss_UltimeStartCombat(dragonId)
}

// ─── Fiche détaillée dragon (clic droit) ─────────────────────────────────────

function showBoss_UltimeDragonSheet(dragonId) {
    const dragon = Boss_UltimeDragons[dragonId]
    if (!dragon) return
    const ds      = Boss_UltimeGetDragonInfo(dragonId)
    const phase   = ds.phase === 2 ? dragon.phase2 : dragon.phase1
    const bst     = { ...dragon.phase1.bst, ...phase.bst }
    const hpPct   = ds.hpPct
    const hpColor = hpPct > 50 ? '#4caf50' : hpPct > 20 ? '#ff9800' : '#f44336'
    const phaseLbl = ds.phase === 2 ? 'Phase 2' : 'Phase 1'

    const STAT_LBL = {
        atk: 'Puissance', maxHp: 'PV', spd: 'Initiative',
        flatDamage: 'Dég. fixes', finalDamagePct: 'Dég. finaux %',
        spellDamagePct: 'Dég. sorts %', damageReductionPct: 'Réd. dégâts %',
        critChance: 'Critique %'
    }
    const ELEMS = ['neutre', 'feu', 'eau', 'air', 'terre']

    function _resRows(res) {
        return ELEMS.map(el => {
            const v = res?.[el] ?? 0
            const c = v > 0 ? 'color:#2D7A2D' : v < 0 ? 'color:#d45a43' : ''
            return `<div class="ms-stat-row">
                <img src="${ELEM_ICONS[el] || ELEM_ICONS.neutre}" class="ms-stat-icon">
                <span class="ms-stat-label">${el.charAt(0).toUpperCase() + el.slice(1)}</span>
                <span class="ms-stat-val" style="${c}">${v > 0 ? '+' : ''}${v}%</span>
            </div>`
        }).join('')
    }

    function _effectLine(eff) {
        const elem = eff.element || 'neutre'
        const icon = elemIcon(elem, 'ae-move-icon')
        let txt = ''
        if (eff.type === 'damage')
            txt = `${eff.damage.min}–${eff.damage.max} dégâts ${elem}`
        else if (eff.type === 'dot')
            txt = `${eff.value}/tour × ${eff.duration} (${eff.label || 'DoT'})`
        else if (eff.type === 'buff') {
            const who = eff.target === 'self' ? 'Boss' : 'Cible'
            txt = `+${eff.value} ${STAT_LBL[eff.stat] || eff.stat} — ${eff.duration}t (${who})`
        } else if (eff.type === 'debuff') {
            txt = `-${eff.value} ${STAT_LBL[eff.stat] || eff.stat} — ${eff.duration}t`
        } else {
            txt = eff.type
        }
        return `<div style="display:flex;align-items:center;gap:0.3rem;font-size:0.76rem;opacity:0.85;padding-left:0.5rem;">${icon}<span>${txt}</span></div>`
    }

    function _moveRows(moveIds) {
        return moveIds.map((moveId, i) => {
            const mv = Boss_UltimeMoves[moveId]
            if (!mv) return ''
            const { bgClass, bgStyle } = getMoveElemBg(mv)
            const baseStyle = 'flex-direction:column;align-items:flex-start;gap:0.2rem;padding:0.4rem 0.5rem;margin-bottom:0.2rem'
            const rowStyle  = bgStyle ? `${bgStyle};${baseStyle}` : baseStyle
            const lines     = (mv.effects || []).map(_effectLine).join('')
            return `<div class="es-move-row ${bgClass}" style="${rowStyle}">
                <div style="display:flex;align-items:center;gap:0.4rem;width:100%;">
                    <span style="font-size:0.6rem;opacity:0.4;flex-shrink:0;">${i + 1}/4</span>
                    <span style="font-weight:bold;font-size:0.85rem;color:var(--dark1,#eee);flex:1;">${mv.name}</span>
                    <span style="font-size:0.6rem;opacity:0.35;">AOE</span>
                </div>
                ${lines}
            </div>`
        }).join('')
    }

    // ── Phase 2 preview ──
    let phase2Html = ''
    if (ds.phase === 1) {
        const threshold = Math.round(dragon.phase2Threshold * 100)
        const p2bst = { ...dragon.phase1.bst, ...dragon.phase2.bst }
        phase2Html = `
            <div class="ms-section-title" style="margin-top:0.6rem;color:#ff9800;">↯ Phase 2 (≤${threshold}% PV)</div>
            <div class="ms-stats">
                <div class="ms-stat-row">
                    <span class="ms-stat-label">Puissance</span>
                    <span class="ms-stat-val">${p2bst.atk || 0}</span>
                </div>
            </div>
            <div class="ms-section-title">Résistances (Phase 2)</div>
            <div class="ms-stats">${_resRows(p2bst.res)}</div>
            <div class="ms-section-title">Sorts (Phase 2)</div>
            <div class="es-moves">${_moveRows(dragon.phase2.moves)}</div>`
    }

    // ── Reward ──
    const rewardHtml = dragon.reward ? `
        <div class="ms-section-title" style="margin-top:0.6rem;">Récompense (victoire)</div>
        <div class="ms-stats">
            ${dragon.reward.kamas ? `<div class="ms-stat-row">
                <span class="ms-stat-label">Kamas</span>
                <span class="ms-stat-val" style="color:#ffd84d">+${dragon.reward.kamas.toLocaleString('fr-FR')}</span>
            </div>` : ''}
        </div>` : ''

    const body = `<div class="member-sheet es-sheet">
        <div class="es-header">
            <img class="es-sprite" src="${dragon.icon}" onerror="this.src='img/icons/icon.png'">
            <div class="es-header-info">
                <span class="es-name">${dragon.name}</span>
                <div class="es-badges">
                    <span class="level-badge" style="background:#c0392b;color:#fff;">${phaseLbl}</span>
                </div>
            </div>
        </div>
        <div class="es-hp-bar">
            <div style="height:100%;width:${hpPct}%;background:${hpColor};border-radius:2rem;transition:width 0.3s;"></div>
        </div>
        <div class="es-hp-text">${ds.currentHp.toLocaleString('fr-FR')} / ${ds.maxHp.toLocaleString('fr-FR')} PV</div>
        <div style="font-size:0.78rem;opacity:0.55;margin:0.25rem 0 0.5rem;">${dragon.lore}</div>
        <div class="ms-section-title">Stats — ${phaseLbl}</div>
        <div class="ms-stats">
            <div class="ms-stat-row">
                <span class="ms-stat-label">Puissance</span>
                <span class="ms-stat-val">${bst.atk || 0}</span>
            </div>
            <div class="ms-stat-row">
                <span class="ms-stat-label">PV max</span>
                <span class="ms-stat-val">${dragon.phase1.bst.hp.toLocaleString('fr-FR')}</span>
            </div>
        </div>
        <div class="ms-section-title">Résistances</div>
        <div class="ms-stats">${_resRows(bst.res)}</div>
        <div class="ms-section-title">Sorts — ${phaseLbl}</div>
        <div class="es-moves">${_moveRows(phase.moves)}</div>
        ${phase2Html}
        ${rewardHtml}
    </div>`

    openTooltip(dragon.name, body)
}

// ─── Écran 3 : Combat (réutilise #content-explore, #enemy-display, #explore-team, #area-end) ──

let _Boss_UltimeSelectedMemberIdx = null
let _Boss_UltimeSelectedSlots     = []

function renderBoss_UltimeCombat() {
    _Boss_UltimeSelectedMemberIdx = null
    _Boss_UltimeSelectedSlots     = []

    // Ferme les menus
    for (const id of Object.values(MENU_MAP)) {
        const el = document.getElementById(id)
        if (el) { el.style.display = 'none'; el.style.zIndex = '30' }
    }
    document.getElementById('menu-button')?.classList.remove('menu-button-open')
    if (typeof activeMenu !== 'undefined') activeMenu = null

    // Réinitialise le z-index de main-content (élevé par switchMenu) pour que content-explore soit visible
    const mainContent = document.getElementById('main-content')
    if (mainContent) mainContent.style.zIndex = ''

    // Affiche le canvas de combat standard
    const ce = document.getElementById('content-explore')
    if (ce) { ce.style.display = 'flex'; ce.classList.add('Boss_Ultime-active') }
    const ae = document.getElementById('area-end')
    if (ae) ae.style.display = 'none'
    const menuParent = document.getElementById('menu-button-parent')
    if (menuParent) menuParent.style.display = ''

    // Override bouton Leave
    const leaveBtn = document.getElementById('explore-leave')
    if (leaveBtn) {
        leaveBtn.onclick = _Boss_UltimeConfirmLeave
        leaveBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M5 5v14a1 1 0 0 0 1 1h3v-2H7V6h2V4H6a1 1 0 0 0-1 1m14.242-.97l-8-2A1 1 0 0 0 10 3v18a.998.998 0 0 0 1.242.97l8-2A1 1 0 0 0 20 19V5a1 1 0 0 0-.758-.97M15 12.188a1.001 1.001 0 0 1-2 0v-.377a1 1 0 1 1 2 .001z"/></svg> Quitter la Boss_Ultime`
    }

    // Cache raid + vitesse, montre enemy-display + turn-panel
    const raidDisplay = document.getElementById('raid-enemy-display')
    if (raidDisplay) raidDisplay.style.display = 'none'
    const enemyDisplay = document.getElementById('enemy-display')
    if (enemyDisplay) enemyDisplay.style.display = 'flex'
    const speedCtrl = document.getElementById('combat-speed-controls')
    if (speedCtrl) speedCtrl.style.display = 'none'
    const turnPanel = document.getElementById('Boss_Ultime-turn-panel')
    if (turnPanel) turnPanel.style.display = ''

    updateBoss_UltimeCombatUI()
    // Scroll en haut pour commencer par voir le boss et les membres
    if (ce) ce.scrollTop = 0
}

// ─── Overlay de transition de tour ───────────────────────────────────────────

function _Boss_UltimePlayTurnTransition(halfTurnIdx, isPlayer) {
    return new Promise(resolve => {
        const overlay = document.getElementById('Boss_Ultime-turn-overlay')
        if (!overlay) { resolve(); return }

        const icon = isPlayer
            ? '<img src="img/icons/menu_team.png" class="sto-icon">'
            : '<img src="img/icons/donjons.png"   class="sto-icon">'
        const label = isPlayer ? 'Votre tour' : 'Tour du boss'
        overlay.innerHTML = `
            <div class="sto-num">Tour ${halfTurnIdx}</div>
            <div class="sto-who">${icon}${label}</div>`

        // Redémarre l'animation CSS
        overlay.style.animation = 'none'
        overlay.offsetHeight    // force reflow
        overlay.style.animation = 'Boss_UltimeTurnShow 1.4s ease-out forwards'
        overlay.style.display   = 'flex'

        setTimeout(() => {
            overlay.style.display = 'none'
            resolve()
        }, 1400)
    })
}

function updateBoss_UltimeCombatUI() {
    const s = Boss_UltimeGetSession()
    if (!s) return
    const ce = document.getElementById('content-explore')
    if (!ce || ce.style.display === 'none') return

    _Boss_UltimeUpdateBossDisplay(s)
    _Boss_UltimeRenderTeamBars(s)
    _Boss_UltimeRenderTurnPanel(s)
}

// ─── Affichage boss dans #enemy-display ───────────────────────────────────────

function _Boss_UltimeUpdateBossDisplay(s) {
    const dragon  = Boss_UltimeDragons[s.dragonId]
    const phase   = s.boss.phase === 2 ? dragon.phase2 : dragon.phase1
    const nextIdx = s.bossAttackCycle % 4
    const hpPct   = Math.max(0, Math.floor((s.boss.currentHp / s.boss.maxHp) * 100))

    // Fond de scène
    const ed = document.getElementById('enemy-display')
    if (ed) ed.style.backgroundImage =
        'linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.55)), url(img/bg/plaine_scarafeuilles.png)'

    const spriteEl = document.getElementById('enemy-sprite')
    const nameEl   = document.getElementById('enemy-name')
    const levelEl  = document.getElementById('enemy-level')
    const elemEl   = document.getElementById('enemy-element')
    const hpFill   = document.getElementById('enemy-hp-fill')
    const hpText   = document.getElementById('enemy-hp-text')

    if (spriteEl) { spriteEl.src = s.boss.image; spriteEl.onerror = () => { spriteEl.src = 'img/icons/icon.png' } }
    if (nameEl)   nameEl.textContent  = s.boss.name
    if (levelEl)  { levelEl.textContent = s.boss.phase === 2 ? 'Phase 2' : 'Phase 1'; levelEl.className = 'level-badge' }
    if (elemEl)   { elemEl.textContent = ''; elemEl.className = '' }
    if (hpFill)   { hpFill.style.width = `${hpPct}%`; hpFill.className = `hp-fill ${hpPct < 25 ? 'hp-low' : hpPct < 50 ? 'hp-mid' : ''}` }
    if (hpText)   hpText.textContent = `${s.boss.currentHp.toLocaleString('fr-FR')} / ${s.boss.maxHp.toLocaleString('fr-FR')}`

    // 4 barres d'attaque boss
    // bossCastingIdx >= 0 → barre en cours d'animation (0→100% sur bossCastDuration)
    // sinon → barre "prochaine" surlignée en jaune (Boss_Ultime-boss-next), fill à 0%
    const movesContainer = document.getElementById('enemy-moves-container')
    if (movesContainer) {
        const isBossCasting  = s.bossCastingIdx >= 0
        const castDur        = s.bossCastDuration || 2000
        movesContainer.innerHTML = phase.moves.map((moveId, idx) => {
            const mv = Boss_UltimeMoves[moveId]
            if (!mv) return ''
            const isNext    = idx === nextIdx
            const isCasting = isBossCasting && idx === s.bossCastingIdx
            const fStyle    = isCasting ? `width:0%;animation:Boss_UltimeBarFill ${castDur}ms linear forwards` : 'width:0%'
            return buildMoveBarHTML(mv, {
                fillStyle:  fStyle,
                extraClass: isNext ? 'Boss_Ultime-boss-next' : ''
            })
        }).join('')
    }
}

// ─── Cartes membres dans #explore-team ────────────────────────────────────────

function _Boss_UltimeRenderTeamBars(s) {
    const container = document.getElementById('explore-team')
    if (!container) return
    container.classList.remove('raid-mode')
    container.innerHTML = ''

    // Bandeau "Qui joue ?" entre le boss et les membres
    if (s.state !== 'ended') {
        const whoLabel = document.createElement('div')
        whoLabel.className = 'Boss_Ultime-who-label'
        whoLabel.textContent = `Tour ${s.turn + 1} — Qui joue ?`
        container.appendChild(whoLabel)
    }

    s.members.forEach((m, idx) => {
        if (!m) return
        const cls   = classes[m.classId]
        const maxHp = m.maxHp || 1
        const hpPct = Math.max(0, Math.floor((m.currentHp / maxHp) * 100))
        const dead  = m.currentHp <= 0
        const isSel = _Boss_UltimeSelectedMemberIdx === idx

        const isSummon = !!m.isSummon
        const _buSummonOwner = isSummon ? (combat?.savedMembers?.[idx] || null) : null
        const _buSummonScale = _buSummonOwner ? ((summons[m.id] || monsters[m.id])?.scale || 1) : 1
        const div = document.createElement('div')
        div.className = `explore-team-member team-menu-card${isSel ? ' Boss_Ultime-card-selected' : ''}`
        div.style.opacity = dead ? '0.45' : '1'
        div.style.cursor  = (dead || isSummon) ? 'default' : 'pointer'
        if (!dead && !isSummon) div.onclick = () => _Boss_UltimeSelectMember(idx)
        div.oncontextmenu = (e) => { e.preventDefault(); showMemberSheet(m) }
        div.innerHTML = `
            <div class="explore-team-member-flair"></div>
            <div class="member-sprite-wrap">
                <img class="member-sprite${_buSummonOwner ? ' member-sprite-has-summon' : ''}" src="${_buSummonOwner ? getMemberImage(_buSummonOwner) : getMemberImage(m)}" onerror="this.src='img/icons/icon.png'">
                ${_buSummonOwner ? `<img class="member-summon-sprite" src="${getMemberImage(m)}" style="height:${_buSummonScale * 50}%" onerror="this.src='img/icons/icon.png'">` : ''}
            </div>
            <div class="member-info">
                <div class="member-title-row">
                    <span class="member-name">${m.name || cls?.name || '?'}</span>
                    ${isSummon ? '<span class="level-badge" style="background:#7b4f9e;color:#fff;">Invoc.</span>' : `<span class="level-badge">lvl ${m.level}</span>`}
                    ${dead ? '<span style="color:#e74c3c;font-size:0.7rem;font-weight:bold;margin-left:auto">KO</span>' : ''}
                    ${isSel ? '<span style="margin-left:auto;font-size:0.7rem;color:#ffc107;font-weight:bold;">▶ Actif</span>' : ''}
                </div>
                <div class="member-hp-bar">
                    <div class="member-hp-fill ${hpPct < 25 ? 'hp-low' : hpPct < 50 ? 'hp-mid' : ''}" style="width:${dead ? 0 : hpPct}%"></div>
                    <span class="hp-bar-text">${dead ? 'KO' : `${m.currentHp} / ${maxHp}`}</span>
                </div>
                ${_renderBuffRow(m)}
            </div>`
        container.appendChild(div)
    })
}

// ─── Panel de tour dans #Boss_Ultime-turn-panel ────────────────────────────────────

function _Boss_UltimeRenderTurnPanel(s) {
    const panel = document.getElementById('Boss_Ultime-turn-panel')
    if (!panel) return

    if (s.state === 'resolving') {
        // Si le même sort est toujours en cours, on ne reconstruit pas le panel pour
        // ne pas réinitialiser l'animation CSS de remplissage.
        const panelCastIdx = parseInt(panel.dataset.castIdx ?? '-99')
        if (panelCastIdx === s.currentCastIdx && s.currentCastIdx >= 0) return

        panel.dataset.castIdx = String(s.currentCastIdx)

        const castMember  = s.currentTurnMemberIdx >= 0 ? s.members[s.currentTurnMemberIdx] : null
        const castName    = castMember ? (castMember.name || classes[castMember.classId]?.name || '?') : '?'
        const castDur     = s.currentCastDuration || 2000

        const progressSlots = (s.currentTurnSpells || []).map((spellId, i) => {
            const mv = move[spellId]
            if (!mv) return ''
            const isCurrent = i === s.currentCastIdx
            const isDone    = s.currentCastIdx >= 0 && i < s.currentCastIdx
            const fStyle    = isDone
                ? 'width:100%;opacity:0.5'
                : isCurrent
                    ? `width:0%;opacity:0.6;animation:Boss_UltimeBarFill ${castDur}ms linear forwards`
                    : 'width:0%;opacity:0'
            const extraCls  = isCurrent ? 'Boss_Ultime-casting-active' : isDone ? 'Boss_Ultime-cast-done' : ''
            const prefix    = isDone ? '✓ ' : isCurrent ? '▶ ' : `<small style="opacity:0.4">${i+1}.</small> `
            return buildMoveBarHTML(mv, {
                fillStyle:   fStyle,
                extraClass:  extraCls,
                nameContent: `${prefix}${mv.name}`
            })
        }).join('')

        panel.innerHTML = `
            <div class="Boss_Ultime-turn-label">${castName} — sorts en cours</div>
            <div class="Boss_Ultime-slot-bars">${progressSlots || '<span style="opacity:0.4;font-size:0.8rem;">…</span>'}</div>`
        return
    }

    const selectedMember = _Boss_UltimeSelectedMemberIdx !== null ? s.members[_Boss_UltimeSelectedMemberIdx] : null
    const persist = Boss_UltimeGetPersist()

    // Log chronologique : 6 dernières entrées (ancien en haut, récent en bas)
    const logHtml = s.log.length
        ? `<div class="Boss_Ultime-turn-log">${s.log.slice(-6).map(l => `<div class="Boss_Ultime-log-line">${l}</div>`).join('')}</div>`
        : ''

    // Sélecteur de membre
    const memberBtns = s.members.map((m, i) => {
        if (!m) return ''
        const dead  = m.currentHp <= 0
        const sel   = _Boss_UltimeSelectedMemberIdx === i
        const hpPct = Math.max(0, Math.floor((m.currentHp / (m.maxHp || 1)) * 100))
        return `<button class="Boss_Ultime-member-btn${sel ? ' active' : ''}${dead ? ' disabled' : ''}"
                    ${dead ? 'disabled' : `onclick="_Boss_UltimeSelectMember(${i})"`}>
            <img src="${getMemberImage(m)}" style="width:1.4rem;height:1.4rem;object-fit:contain;image-rendering:pixelated;flex-shrink:0;" onerror="this.src='img/icons/icon.png'">
            <span>${m.name || classes[m.classId]?.name || '?'}</span>
            ${dead ? '<small style="opacity:0.6">KO</small>' : `<small style="opacity:0.6">${hpPct}%</small>`}
        </button>`
    }).join('')

    // Deck + slots si membre sélectionné
    let spellSection = ''
    if (selectedMember) {
        const deckIds = selectedMember.isSummon
            ? Object.values(selectedMember.moves || {}).filter(Boolean)
            : (persist.memberDecks?.[selectedMember.classId] || [])
        const deckSpells = deckIds.map(spellId => {
            const mv = move[spellId]
            if (!mv) return ''
            const cooldown = s.spellCooldowns?.[spellId] || 0
            const canAdd   = cooldown === 0
                && _Boss_UltimeSelectedSlots.length < 5
                && _Boss_UltimeSelectedSlots.filter(id => id === spellId).length < 2
                && Boss_UltimeCanAddToSlot(spellId, _Boss_UltimeSelectedSlots)
            const count   = _Boss_UltimeSelectedSlots.filter(id => id === spellId).length
            const cdLabel = cooldown > 0 ? ` <span style="font-size:0.7rem;opacity:0.8;color:#f88;">(${cooldown}t)</span>` : ''
            return buildMoveBarHTML(mv, {
                fillStyle:   `width:${count > 0 ? 100 : 0}%;opacity:0.45`,
                attrs:       `${canAdd ? `onclick="_Boss_UltimeAddToSlot('${spellId}')"` : ''} oncontextmenu="event.preventDefault();showMoveTooltip('${spellId}')"`,
                extraClass:  canAdd ? '' : 'Boss_Ultime-spell-blocked',
                extraStyle:  `cursor:${canAdd ? 'pointer' : 'not-allowed'}`,
                nameContent: `${mv.name}${count > 0 ? ` ×${count}` : ''}${cdLabel}`
            })
        }).join('')

        const slotBars = Array(5).fill(0).map((_, i) => {
            const spellId = _Boss_UltimeSelectedSlots[i]
            const mv      = spellId ? move[spellId] : null
            if (!mv) return `<div class="combat-move-bar combat-move-empty Boss_Ultime-slot-empty">
                    <span class="combat-move-name" style="opacity:0.3">${i + 1}. —</span>
                   </div>`
            return buildMoveBarHTML(mv, {
                fillStyle:   'width:100%;opacity:0.5',
                attrs:       `onclick="_Boss_UltimeRemoveFromSlot(${i})" title="Cliquez pour retirer"`,
                extraClass:  'Boss_Ultime-slot-filled',
                nameContent: `<small style="opacity:0.5">${i + 1}.</small> ${mv.name}`
            })
        }).join('')

        spellSection = `
            <div class="Boss_Ultime-turn-label">Deck — ${selectedMember.name || classes[selectedMember.classId]?.name || '?'}</div>
            <div class="Boss_Ultime-deck-bars">${deckSpells || '<span style="opacity:0.4;font-size:0.8rem;padding:0.3rem">Deck vide</span>'}</div>
            <div class="Boss_Ultime-turn-label">Ordre d'exécution (${_Boss_UltimeSelectedSlots.length}/5)</div>
            <div class="Boss_Ultime-slot-bars">${slotBars}</div>
            <div class="Boss_Ultime-turn-footer">
                <button class="ae-btn ae-btn-rejoin"
                    ${_Boss_UltimeSelectedSlots.length < 5 ? 'disabled style="opacity:0.4;cursor:not-allowed"' : 'onclick="_Boss_UltimeConfirmTurn()"'}>
                    ▶ Lancer le tour (${_Boss_UltimeSelectedSlots.length}/5)
                </button>
                <button class="ae-btn ae-btn-quit" onclick="_Boss_UltimeClearSlots()" style="font-size:0.8rem;">
                    Vider
                </button>
            </div>`
    }

    panel.innerHTML = `
        ${logHtml}
        ${spellSection}`

    // Auto-scroll le log vers le bas (entrée la plus récente visible)
    const logEl = panel.querySelector('.Boss_Ultime-turn-log')
    if (logEl) logEl.scrollTop = logEl.scrollHeight
}

// ─── Helpers buff/dot/hot (réutilisés dans les cartes membre) ─────────────────

function _renderBuffRow(entity) {
    const buffs   = (entity.buffs || []).filter(b => (b.delay ?? 0) <= 0)
    const dots    = entity.dots  || []
    const hots    = entity.hots  || []
    const shield  = entity.shield?.value > 0 ? entity.shield : null
    if (!buffs.length && !dots.length && !hots.length && !shield) return ''

    const parts = []
    if (shield) {
        parts.push(`<span class="Boss_Ultime-buff-tag Boss_Ultime-shield-tag" title="Bouclier : ${shield.value} dégâts absorbés (${shield.duration}t)">🛡 ${shield.value}</span>`)
    }
    for (const b of buffs) {
        const sign  = b.value >= 0 ? '+' : ''
        const color = b.value >= 0 ? '#ffe262' : '#cf95ff'
        parts.push(`<span class="Boss_Ultime-buff-tag" style="color:${color}" title="${b.stat} ${sign}${b.value} (${b.duration}t)">${sign}${b.stat}</span>`)
    }
    for (const d of dots) {
        parts.push(`<span class="Boss_Ultime-buff-tag Boss_Ultime-dot-tag" title="${d.label || 'DoT'} -${d.value}/t (${d.duration}t)">🔥${d.duration}</span>`)
    }
    for (const h of hots) {
        parts.push(`<span class="Boss_Ultime-buff-tag Boss_Ultime-hot-tag" title="${h.label || 'HoT'} +${h.value}/t (${h.duration}t)">💚${h.duration}</span>`)
    }
    return `<div class="Boss_Ultime-buff-row">${parts.join('')}</div>`
}

// ─── Actions UI combat ────────────────────────────────────────────────────────

function _Boss_UltimeSelectMember(idx) {
    const s = Boss_UltimeGetSession()
    if (!s || s.state === 'resolving') return
    const m = s.members[idx]
    if (!m || m.currentHp <= 0 || m.isSummon) return  // les invocations agissent automatiquement
    _Boss_UltimeSelectedMemberIdx = idx
    _Boss_UltimeSelectedSlots     = []
    s.state = 'select_spells'
    updateBoss_UltimeCombatUI()
}

function _Boss_UltimeAddToSlot(spellId) {
    if (_Boss_UltimeSelectedSlots.length >= 5) return
    if (_Boss_UltimeSelectedSlots.filter(id => id === spellId).length >= 2) {
        showNotification('Maximum 2 fois le même sort dans les 5 slots.', 'error')
        return
    }
    if (!Boss_UltimeCanAddToSlot(spellId, _Boss_UltimeSelectedSlots)) {
        showNotification('Restriction déjà utilisée dans les 5 slots.', 'error')
        return
    }
    _Boss_UltimeSelectedSlots.push(spellId)
    updateBoss_UltimeCombatUI()
}

function _Boss_UltimeRemoveFromSlot(idx) {
    _Boss_UltimeSelectedSlots.splice(idx, 1)
    updateBoss_UltimeCombatUI()
}

function _Boss_UltimeClearSlots() {
    _Boss_UltimeSelectedSlots = []
    updateBoss_UltimeCombatUI()
}

function _Boss_UltimeConfirmTurn() {
    if (_Boss_UltimeSelectedMemberIdx === null || _Boss_UltimeSelectedSlots.length < 5) return
    Boss_UltimeExecuteMemberTurn(_Boss_UltimeSelectedMemberIdx, [..._Boss_UltimeSelectedSlots])
    _Boss_UltimeSelectedSlots     = []
    _Boss_UltimeSelectedMemberIdx = null
}

function _Boss_UltimeConfirmLeave() {
    if (!confirm('Quitter sans sauvegarder ? Vos progrès de ce combat seront perdus.')) return
    _Boss_UltimeCloseContentExplore()
    Boss_UltimeLeaveCombat()
    switchMenu('Boss_Ultime')
}

function _Boss_UltimeCloseContentExplore() {
    const _ce = document.getElementById('content-explore')
    if (_ce) { _ce.style.display = 'none'; _ce.classList.remove('Boss_Ultime-active') }
    document.getElementById('area-end').style.display = 'none'
    const turnPanel = document.getElementById('Boss_Ultime-turn-panel')
    if (turnPanel) { turnPanel.style.display = 'none'; turnPanel.innerHTML = '' }
    const speedCtrl = document.getElementById('combat-speed-controls')
    if (speedCtrl) speedCtrl.style.display = ''
    // Restaure le bouton Leave standard
    const leaveBtn = document.getElementById('explore-leave')
    if (leaveBtn) {
        leaveBtn.onclick = () => leaveCombat()
        leaveBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M5 5v14a1 1 0 0 0 1 1h3v-2H7V6h2V4H6a1 1 0 0 0-1 1m14.242-.97l-8-2A1 1 0 0 0 10 3v18a.998.998 0 0 0 1.242.97l8-2A1 1 0 0 0 20 19V5a1 1 0 0 0-.758-.97M15 12.188a1.001 1.001 0 0 1-2 0v-.377a1 1 0 1 1 2 .001z"/></svg> Leave Combat`
    }
}

// ─── Écrans de fin (réutilise #area-end avec les classes ae-*) ────────────────

function renderBoss_UltimeVictory() {
    const s      = Boss_UltimeGetSession()
    const dragon = s ? Boss_UltimeDragons[s.dragonId] : null

    document.getElementById('content-explore').style.display = 'none'
    const turnPanel = document.getElementById('Boss_Ultime-turn-panel')
    if (turnPanel) { turnPanel.style.display = 'none'; turnPanel.innerHTML = '' }

    const kamasBubble = dragon?.reward?.kamas
        ? `<div class="game-bubble kamas-bubble" title="${dragon.reward.kamas.toLocaleString('fr-FR')} kamas">
               <span class="bubble-level">+${dragon.reward.kamas.toLocaleString('fr-FR')}</span>
               <img src="img/icons/kamas.png" onerror="this.src='img/icons/icon.png'">
           </div>`
        : ''

    const dmgHtml  = _Boss_UltimeBuildDamagePanel(s)
    const totalTurns = s?.halfTurns ?? 0

    const ae = document.getElementById('area-end')
    if (!ae) return
    ae.style.display = 'flex'
    ae.innerHTML = `
        <div class="ae-header">Boss_Ultime — Combat terminé</div>
        <div class="ae-title">${dragon?.name || 'Dragon'} vaincu !</div>
        <div class="ae-actions">
            <div class="ae-btn ae-btn-quit" onclick="_Boss_UltimeReturnToSelect()">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"/></svg>
                Retour
            </div>
        </div>
        ${kamasBubble ? `<div class="ae-box">
            <div class="ae-box-title">Récompense</div>
            <div class="ae-box-content ae-bubbles">${kamasBubble}</div>
        </div>` : ''}
        <div class="ae-box">
            <div class="ae-box-title">Statistiques</div>
            <div class="ae-box-content">
                <div class="ms-stats">
                    <div class="ms-stat-row">
                        <span class="ms-stat-label">Tours réalisés</span>
                        <span class="ms-stat-val">${totalTurns}</span>
                    </div>
                </div>
            </div>
        </div>
        ${dmgHtml ? `<div class="ae-box">
            <div class="ae-box-title">Dégâts infligés</div>
            <div class="ae-box-content"><div class="ms-stats" style="gap:0.6rem;">${dmgHtml}</div></div>
        </div>` : ''}`
}

function renderBoss_UltimeDefeat() {
    const s          = Boss_UltimeGetSession()
    const pct        = s ? Math.round((s.boss.currentHp / s.boss.maxHp) * 100) : 0
    const dragon     = s ? Boss_UltimeDragons[s.dragonId] : null
    const totalTurns = s?.halfTurns ?? 0

    document.getElementById('content-explore').style.display = 'none'
    const turnPanel = document.getElementById('Boss_Ultime-turn-panel')
    if (turnPanel) { turnPanel.style.display = 'none'; turnPanel.innerHTML = '' }

    const dmgHtml = _Boss_UltimeBuildDamagePanel(s)

    const ae = document.getElementById('area-end')
    if (!ae) return
    ae.style.display = 'flex'
    ae.innerHTML = `
        <div class="ae-header">Boss_Ultime — Combat terminé</div>
        <div class="ae-title">Équipe vaincue…</div>
        <div class="ae-actions">
            <div class="ae-btn ae-btn-quit" onclick="_Boss_UltimeReturnToSelect()">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"/></svg>
                Retour
            </div>
        </div>
        <div class="ae-box">
            <div class="ae-box-title">PV restants du dragon</div>
            <div class="ae-box-content">
                <div class="hp-container" style="padding:0.3rem 0;">
                    <div class="hp-bar"><div class="hp-fill ${pct < 25 ? 'hp-low' : pct < 50 ? 'hp-mid' : ''}" style="width:${pct}%"></div></div>
                    <span>${pct}% — ${s?.boss.currentHp.toLocaleString('fr-FR') || 0} PV</span>
                </div>
            </div>
        </div>
        <div class="ae-box">
            <div class="ae-box-title">Statistiques</div>
            <div class="ae-box-content">
                <div class="ms-stats">
                    <div class="ms-stat-row">
                        <span class="ms-stat-label">Tours réalisés</span>
                        <span class="ms-stat-val">${totalTurns}</span>
                    </div>
                </div>
            </div>
        </div>
        ${dmgHtml ? `<div class="ae-box">
            <div class="ae-box-title">Dégâts infligés</div>
            <div class="ae-box-content"><div class="ms-stats" style="gap:0.6rem;">${dmgHtml}</div></div>
        </div>` : ''}`
}

function _Boss_UltimeBuildDamagePanel(s) {
    if (!s) return ''
    const dmgMap = s.sessionLoot?.memberDamage || {}
    const total  = Object.values(dmgMap).reduce((a, b) => a + b, 0)
    if (total === 0) return ''
    return Object.entries(dmgMap)
        .sort(([, a], [, b]) => b - a)
        .map(([classId, dmg]) => {
            const member = s.members.find(m => m?.classId === classId)
            const cls    = classes[classId]
            const pct    = Math.round((dmg / total) * 100)
            return `<div class="ms-stat-row" style="flex-direction:column;align-items:flex-start;gap:0.1rem;">
                <div style="display:flex;align-items:center;gap:0.5rem;width:100%;">
                    <img src="${member ? getMemberImage(member) : (cls?.image || 'img/icons/icon.png')}"
                         onerror="this.src='img/icons/icon.png'"
                         style="width:2rem;height:2rem;object-fit:contain;flex-shrink:0;image-rendering:pixelated;">
                    <span class="ms-stat-label">${member?.name || cls?.name || classId}</span>
                    <span class="ms-stat-val" style="margin-left:auto;">${dmg.toLocaleString('fr-FR')} — ${pct}%</span>
                </div>
                <div style="height:0.35rem;width:100%;border-radius:0.2rem;background:rgba(255,255,255,0.12);">
                    <div style="width:${pct}%;height:100%;background:#5dade2;border-radius:0.2rem;"></div>
                </div>
            </div>`
        }).join('')
}

function _Boss_UltimeReturnToSelect() {
    _Boss_UltimeCloseContentExplore()
    document.getElementById('area-end').style.display = 'none'
    Boss_UltimeSession = null
    switchMenu('Boss_Ultime')
}

function _Boss_UltimeReturnToFight(dragonId) {
    document.getElementById('area-end').style.display = 'none'
    Boss_UltimeSession = null
    if (dragonId) renderBoss_UltimePrep(dragonId)
    else switchMenu('Boss_Ultime')
}
