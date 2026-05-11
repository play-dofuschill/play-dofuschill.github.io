// areaDictionary.js — Zones de farm DofusChill
//
// minLevel / maxLevel  : fourchette affichée dans l'UI de la zone
// mobMinLevel / mobMaxLevel : fourchette de niveau des monstres spawnés
// spawns   : sélection pondérée des monstres
// lootTable: items pouvant être droppés dans la zone
// background: fond de combat

const areas = {}

areas.cimetiereincarnam = {
    id: 'cimetiereincarnam',
    name: "Cimetiere d'Incarnam",
    minLevel: 1, maxLevel: 10,
    mobMinLevel: 1, mobMaxLevel: 10,
    background: 'cimetiere_incarnam',
    icon: 'img/monstres/sprites/chaferDebutant.png',
    description: "Cimetière où repose les âmes de nombreux aventurier tombés au combat.",
    spawns: [
        { id: 'chaferDebutant',  weight: 20 },
        { id: 'chaferEclaireur', weight: 20 },
        { id: 'chaferFurtif',    weight: 20 },
        { id: 'chaferPiquier',   weight: 20 },
        { id: 'sergentChafer',   weight: 20 }
    ],
    lootTable: [
        { itemId: 'pierreDame',        dropRate: 0.33 },
        { itemId: 'bottesAventurier',  dropRate: 0.02 },
        { itemId: 'capeAventurier',    dropRate: 0.01 },
        { itemId: 'chapeauAventurier', dropRate: 0.01 },
        { itemId: 'anneauAventurier',  dropRate: 0.02 },
        { itemId: 'ceintureAventurier',dropRate: 0.02 },
        { itemId: 'amuletteAventurier',dropRate: 0.02 },
        { itemId: 'cleDonjonKardorim', dropRate: 0.01, isKey: true }
    ]
}

areas.tainela = {
    id: 'tainela',
    name: 'Tainela',
    minLevel: 20, maxLevel: 30,
    mobMinLevel: 20, mobMaxLevel: 30,
    background: 'tainela',
    icon: 'img/monstres/sprites/bouftou.png',
    description: "Respirez cet air pur empli de l'odeur du cuir et de la laine... Pas de doute, vous êtes à tainela",
    spawns: [
        { id: 'bouftou',             weight: 30 },
        { id: 'bouftonBlanc',        weight: 25 },
        { id: 'bouftonNoir',         weight: 20 },
        { id: 'bouftouNoir',         weight: 15 },
        { id: 'bouftouChefDeGuerre', weight: 10 }
    ],
    lootTable: [
        { itemId: 'pierreDame',      dropRate: 0.33 },
        { itemId: 'capeBouftou',     dropRate: 0.01 },
        { itemId: 'coiffeBouftou',   dropRate: 0.01 },
        { itemId: 'bottesBouftou',   dropRate: 0.01 },
        { itemId: 'marteauBouftou',  dropRate: 0.01 },
        { itemId: 'anneauBouftou',   dropRate: 0.02 },
        { itemId: 'amuletteBouftou', dropRate: 0.02 },
        { itemId: 'ceintureBouftou', dropRate: 0.01 },
        { itemId: 'bouclierBouftou', dropRate: 0.01 },
        { itemId: 'cleDonjonBouftou', dropRate: 0.01, isKey: true }
    ]
}

// ─── Donjons ────────────────────────────────────────────────────────────────

areas.donjonIncarnam = {
    id: 'donjonIncarnam',
    type: 'dungeon',
    keyId: 'cleDonjonKardorim',
    name: 'Crypte de Kardorim',
    minLevel: 15, maxLevel: 15,
    mobMinLevel: 15, mobMaxLevel: 15,
    background: 'forest',
    icon: 'img/monstres/sprites/kardorim.png',
    description: "Les profondeurs d'Incarnam, gardées par le redoutable Kardorim, ancien capitaine aventurier, toujours accompagné par son fidele compagnon.",
    spawns: [{ id: 'kardorim',    weight: 100 }],
    lootTable: [
        { itemId: 'pierreDame',         dropRate: 0.45 },
        { itemId: 'coiffeKardorim',     dropRate: 0.03 },
        { itemId: 'anneauKardorim',     dropRate: 0.04 },
        { itemId: 'capeKardorim',   dropRate: 0.03 }
    ]
}

// ─── Événements ─────────────────────────────────────────────────────────────

areas.evenementPious = {
    id: 'evenementPious',
    type: 'event',
    name: 'Invasion Pious',
    minLevel: 10, maxLevel: 15,
    mobMinLevel: 10, mobMaxLevel: 15,
    background: 'town',
    icon: 'img/monstres/sprites/piouBleu.png',
    description: "Les habitants d'astrub sont envahis par ces oiseaux multicolores ! rendez-leur service en vous en débarassant.",
    spawns: [
        { id: 'piouRouge',  weight: 17 },
        { id: 'piouBleu',   weight: 17 },
        { id: 'piouJaune',  weight: 17 },
        { id: 'piouVert',   weight: 17 },
        { id: 'piouRose',   weight: 17 },
        { id: 'piouViolet', weight: 15 }
    ],
    lootTable: [
        { itemId: 'pierreDame',      dropRate: 0.33 },
        { itemId: 'piloteAutomatique', dropRate: 0.95 }
    ]
}
