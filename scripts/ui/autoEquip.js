// ui/autoEquip.js — Sélecteur de stats pour l'auto-équipement (fiche perso)

let _autoEquipSelectedStats = []
let _autoEquipTargetClassId = null

function openAutoEquipPicker(classId) {
    const memberIndex = state.team.findIndex(m => m && m.classId === classId)
    if (memberIndex === -1) return

    _autoEquipTargetClassId = classId
    _autoEquipSelectedStats = []

    openTooltip('Auto-équipement', _renderAutoEquipPicker())
}

const AUTO_EQUIP_RANK_LABELS = ['1er', '2e', '3e']

function _renderAutoEquipPicker() {
    const btns = AUTO_EQUIP_STATS.map(([stat, label]) => {
        const rankIdx = _autoEquipSelectedStats.indexOf(stat)
        const active  = rankIdx !== -1
        const badge   = active
            ? `<span class="auto-equip-rank-badge">${AUTO_EQUIP_RANK_LABELS[rankIdx]}</span>`
            : ''
        return `<button class="equip-filter-btn${active ? ' active' : ''}"
            onclick="_toggleAutoEquipStat('${stat}')">${label}${badge}</button>`
    }).join('')

    const count  = _autoEquipSelectedStats.length
    const canRun = count > 0

    return `<div class="equip-selector auto-equip-picker">
        <p style="font-size:0.8rem;opacity:0.75;margin:0 0 0.6rem;line-height:1.4;">
            Choisis jusqu'à 3 stats à prioriser (${count}/3), par ordre d'importance — la 1ère
            compte plus que la 2e, qui compte plus que la 3e. L'auto-équipement choisit, parmi
            les objets non utilisés par un autre personnage, la meilleure combinaison possible —
            forgemagie et bonus de panoplie inclus. Le familier n'est pas touché.
        </p>
        <div class="equip-filter-bar" style="flex-wrap:wrap;">${btns}</div>
        <div style="margin-top:0.8rem;display:flex;justify-content:flex-end;">
            <button class="equip-remove-btn"${canRun ? '' : ' disabled style="opacity:0.4;cursor:default;"'}
                onclick="_runAutoEquipFromPicker()">🎯 Équiper automatiquement</button>
        </div>
    </div>`
}

function _toggleAutoEquipStat(stat) {
    const idx = _autoEquipSelectedStats.indexOf(stat)
    if (idx !== -1) {
        _autoEquipSelectedStats.splice(idx, 1)
    } else {
        if (_autoEquipSelectedStats.length >= 3) _autoEquipSelectedStats.shift()
        _autoEquipSelectedStats.push(stat)
    }

    const bot = document.getElementById('tooltipBottom')
    if (!bot) return
    const html = _renderAutoEquipPicker()
    bot.innerHTML = html
    const stackEntry = tooltipStack[tooltipStack.length - 1]
    if (stackEntry) stackEntry.body = html
}

function _runAutoEquipFromPicker() {
    if (!_autoEquipTargetClassId || !_autoEquipSelectedStats.length) return
    const classId = _autoEquipTargetClassId
    applyAutoEquip(classId, _autoEquipSelectedStats)

    const member = state.team.find(m => m && m.classId === classId)
    tooltipStack.length = 0
    if (member) showMemberSheet(member)
    else closeTooltip()
}
