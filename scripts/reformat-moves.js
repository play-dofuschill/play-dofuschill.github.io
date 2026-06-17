// Script de reformatage des sorts compacts dans moveDictionary.js
const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'data/moveDictionary.js');
let content = fs.readFileSync(filePath, 'utf8');

function findMatchingBrace(str, openIdx) {
    let depth = 0;
    let inStr = false, strCh = '';
    for (let i = openIdx; i < str.length; i++) {
        const ch = str[i];
        if (inStr) {
            if (ch === strCh && str[i - 1] !== '\\') inStr = false;
        } else if (ch === '"' || ch === "'") {
            inStr = true; strCh = ch;
        } else if (ch === '{') depth++;
        else if (ch === '}') { depth--; if (depth === 0) return i; }
    }
    return -1;
}

function findMatchingBracket(str, openIdx) {
    let depth = 0;
    let inStr = false, strCh = '';
    for (let i = openIdx; i < str.length; i++) {
        const ch = str[i];
        if (inStr) {
            if (ch === strCh && str[i - 1] !== '\\') inStr = false;
        } else if (ch === '"' || ch === "'") {
            inStr = true; strCh = ch;
        } else if (ch === '[') depth++;
        else if (ch === ']') { depth--; if (depth === 0) return i; }
    }
    return -1;
}

// Compte les { et } en ignorant les strings pour déterminer la profondeur d'une ligne
function braceDepth(str) {
    let depth = 0;
    let inStr = false, strCh = '';
    for (let i = 0; i < str.length; i++) {
        const ch = str[i];
        if (inStr) {
            if (ch === strCh && str[i - 1] !== '\\') inStr = false;
        } else if (ch === '"' || ch === "'") {
            inStr = true; strCh = ch;
        } else if (ch === '{') depth++;
        else if (ch === '}') depth--;
    }
    return depth;
}

function formatSpellProgression(spArr) {
    // spArr: "[{lvl: 1, patch: {}}, {lvl: 66, patch: {...}}, ...]"
    const inner = spArr.slice(1, -1).trim();
    const entries = [];
    let i = 0;
    while (i < inner.length) {
        while (i < inner.length && inner[i] !== '{') i++;
        if (i >= inner.length) break;
        const closeIdx = findMatchingBrace(inner, i);
        entries.push(inner.slice(i, closeIdx + 1));
        i = closeIdx + 1;
    }

    const formatted = entries.map((entry, idx) => {
        // entry: "{lvl: N, patch: X}"
        const lvlMatch = entry.match(/lvl:\s*(\d+)/);
        const lvl = lvlMatch ? lvlMatch[1] : '?';
        const patchStart = entry.indexOf('patch:');
        const patchVal = entry.slice(patchStart + 6).trim().replace(/\}$/, '').trim();
        // patchVal ends with } from patch's value, entry ends with }
        // Reconstruct: entry = {lvl: N, patch: PATCHVAL}
        const fullPatch = patchVal.endsWith('}') || patchVal === '{}' ? patchVal : patchVal;

        // Reparse properly: patch value is everything after "patch: " until end of entry (excluding closing })
        const patchValueRaw = entry.slice(patchStart + 7).trimStart(); // after "patch: "
        // patchValueRaw ends with "}" — remove trailing "}" of the entry
        const patchValue = patchValueRaw.slice(0, -1).trimEnd();

        const firstIndent = idx === 0 ? '' : '                       ';
        const patchIndent = '                        ';
        return `${firstIndent}{lvl: ${lvl},\n${patchIndent}patch: ${patchValue}}`;
    });

    return '[' + formatted.join(',\n') + ']';
}

function reformatMove(block) {
    // Flatten to single line for parsing
    const flat = block.split('\n').map(l => l.trim()).join(' ').replace(/\s+/g, ' ').trim();

    // Extract key (move.xxx or move['xxx'])
    const keyMatch = flat.match(/^(move(?:\.\w+|\['[\w\-éèêëàâùûîïôœæç_]+'\]))/);
    if (!keyMatch) return block;
    const key = keyMatch[1];

    const openIdx = flat.indexOf('{');
    const closeIdx = findMatchingBrace(flat, openIdx);
    const inner = flat.slice(openIdx + 1, closeIdx).trim();

    // Extract simple string/number fields
    function extractStr(fieldName) {
        // Match: fieldName: 'value' or fieldName: "value"
        const re = new RegExp(`${fieldName}:\\s*('(?:[^'\\\\]|\\\\.)*'|"(?:[^"\\\\]|\\\\.)*")`);
        const m = inner.match(re);
        return m ? m[1] : null;
    }
    function extractNum(fieldName) {
        const re = new RegExp(`${fieldName}:\\s*(\\d+)`);
        const m = inner.match(re);
        return m ? m[1] : null;
    }

    const id = extractStr('id');
    const name = extractStr('name');
    const classId = extractStr('classId');
    const cooldownMs = extractNum('cooldownMs');
    const description = extractStr('description');

    // Extract effects array
    let effects = null;
    const effIdx = inner.indexOf('effects:');
    if (effIdx !== -1) {
        const afterEff = inner.slice(effIdx + 8).trimStart();
        if (afterEff[0] === '[') {
            const ec = findMatchingBracket(afterEff, 0);
            effects = afterEff.slice(0, ec + 1);
        }
    }

    // Extract spellProgression array (optional)
    let spellProgression = null;
    const spIdx = inner.indexOf('spellProgression:');
    if (spIdx !== -1) {
        const afterSp = inner.slice(spIdx + 17).trimStart();
        if (afterSp[0] === '[') {
            const sc = findMatchingBracket(afterSp, 0);
            spellProgression = afterSp.slice(0, sc + 1);
        }
    }

    if (!id || !name || !classId || !cooldownMs || !effects) {
        console.warn('Skipping (missing fields):', flat.slice(0, 80));
        return block;
    }

    let out = `${key} = {\n`;
    out += `    id: ${id},\n`;
    out += `    name: ${name},\n`;
    out += `    classId: ${classId},\n`;
    out += `    cooldownMs: ${cooldownMs},\n`;
    out += `    effects: ${effects},\n`;
    if (spellProgression) {
        out += `    spellProgression: ${formatSpellProgression(spellProgression)},\n`;
    }
    out += `    description: ${description || '""'}\n`;
    out += `}`;

    return out;
}

const lines = content.split('\n');
const output = [];
let i = 0;
let reformatted = 0;

while (i < lines.length) {
    const line = lines[i];

    if (/^move[\.\[]/.test(line) && /= \{ id:/.test(line)) {
        // Collect full block by tracking brace depth
        let blockLines = [line];
        let depth = braceDepth(line);
        let j = i + 1;

        while (depth > 0 && j < lines.length) {
            const nl = lines[j];
            blockLines.push(nl);
            depth += braceDepth(nl);
            j++;
        }

        const block = blockLines.join('\n');
        const result = reformatMove(block);
        output.push(result);
        reformatted++;
        i = j;
    } else {
        output.push(line);
        i++;
    }
}

fs.writeFileSync(filePath, output.join('\n'), 'utf8');
console.log(`Done — ${reformatted} sorts reformatés.`);
