// Simulation stats DofusChill par palier de niveau
const fs = require('fs');
const path = require('path');

const base = path.join(__dirname, 'scripts/data');
const classCode    = fs.readFileSync(path.join(base, 'classDictionary.js'), 'utf8');
const itemCode     = fs.readFileSync(path.join(base, 'itemDictionary.js'), 'utf8');
const panopliesCode = fs.readFileSync(path.join(base, 'panoplieDictionary.js'), 'utf8');

// Inject all dictionaries into scope via Function to avoid const block-scope issue
const combined = classCode + '\n' + itemCode + '\n' + panopliesCode + '\nreturn {classes, item, panoplies};';
const { classes, item, panoplies } = new Function(combined)();

function classStatsAtLevel(cls, lvl) {
    const g = cls.growthPerLevel || {};
    return {
        hp:  cls.bst.hp  + (g.hp  || 0) * (lvl - 1),
        atk: cls.bst.atk + (g.atk || 0) * (lvl - 1),
        spd: cls.bst.spd + (g.spd || 0) * (lvl - 1),
    };
}

function highestSetBonus(pano, pc) {
    const ts = Object.keys(pano.bonuses).map(Number).sort((a, b) => a - b);
    let best = null;
    for (const t of ts) { if (pc >= t) best = pano.bonuses[t]; }
    return best;
}

function sumStats(items, bonus) {
    const s = { maxHp: 0, atk: 0, spd: 0, flatDamage: 0, critChance: 0 };
    for (const it of items) {
        if (!it || !it.stats) continue;
        for (const { stat, value } of it.stats) { if (stat in s) s[stat] += value; }
    }
    if (bonus) {
        for (const { stat, value } of bonus.stats) { if (stat in s) s[stat] += value; }
    }
    return s;
}

function bestPanoAt(charLvl) {
    let best = null, bestScore = -1;
    for (const [pid, pano] of Object.entries(panoplies)) {
        const pieces = pano.pieces.map(id => item[id]).filter(it => it && (it.requiredLevel || 0) <= charLvl);
        if (!pieces.length) continue;
        const bonus = highestSetBonus(pano, pieces.length);
        const s = sumStats(pieces, bonus);
        const score = s.maxHp + s.atk * 2 + s.flatDamage * 10 + s.spd * 5 + s.critChance * 8;
        if (score > bestScore) { bestScore = score; best = { pid, pano, pieces, bonus }; }
    }
    return best;
}

const levels = [1, 10, 20, 35, 40, 45, 55, 100, 160, 180, 200];
const classList = ['iop','cra','eniripsa','sacrieur','sram','feca','xelor','huppermage','pandawa','ecaflip'];

console.log('\n=== Simulation stats DofusChill — panoplie la plus forte disponible ===');
console.log('(stats de base + items + bonus panoplie, sans passifs combat ni familier)\n');

// One global panoply reference table
console.log('--- Panoplie référence par niveau ---');
console.log('Lvl  | Panoplie la plus forte                    | Pcs | HP items | ATK items | FlatDmg | Crit%');
console.log('-----|-------------------------------------------|-----|----------|-----------|---------|------');
for (const lvl of levels) {
    const p = bestPanoAt(lvl);
    if (!p) { console.log(String(lvl).padStart(3) + '  | aucune'); continue; }
    const s = sumStats(p.pieces, p.bonus);
    const pName = p.pano.name.substring(0, 41).padEnd(41);
    console.log(
        String(lvl).padStart(3) + '  | ' +
        pName + ' | ' +
        String(p.pieces.length).padStart(3) + ' | ' +
        String(Math.round(s.maxHp)).padStart(8) + ' | ' +
        String(Math.round(s.atk)).padStart(9) + ' | ' +
        String(Math.round(s.flatDamage)).padStart(7) + ' | ' +
        String(Math.round(s.critChance)).padStart(5)
    );
}

// Per-class table
console.log('\n--- Stats totales par classe (base + meilleure panoplie) ---');
const hdr = 'Lvl  | HP    | ATK   | SPD   | FlatDmg | Crit%';
const sep = '-----|-------|-------|-------|---------|------';

for (const clsId of classList) {
    const cls = classes[clsId];
    if (!cls) continue;
    console.log('\n' + cls.name + ' (' + cls.role + ')');
    console.log(hdr);
    console.log(sep);
    for (const lvl of levels) {
        const base = classStatsAtLevel(cls, lvl);
        const p = bestPanoAt(lvl);
        const s = p ? sumStats(p.pieces, p.bonus) : { maxHp: 0, atk: 0, spd: 0, flatDamage: 0, critChance: 0 };
        const hp   = Math.round(base.hp  + s.maxHp);
        const atk  = Math.round(base.atk + s.atk);
        const spd  = Math.round(base.spd + s.spd);
        const flat = Math.round(s.flatDamage);
        const crit = Math.round((cls.bst.critChance || 0) + s.critChance);
        console.log(
            String(lvl).padStart(3) + '  | ' +
            String(hp).padStart(5) + ' | ' +
            String(atk).padStart(5) + ' | ' +
            String(spd).padStart(5) + ' | ' +
            String(flat).padStart(7) + ' | ' +
            String(crit).padStart(5)
        );
    }
}
