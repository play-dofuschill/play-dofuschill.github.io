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
    minLevel: 1, maxLevel: 20,
    mobMinLevel: 1, mobMaxLevel: 10,
    background: 'cimetiere_incarnam',
    icon: 'img/monstres/sprites/chaferDebutant.png',
    description: "Cimetière où reposent les âmes de nombreux aventuriers tombés au combat.",
    spawns: [
        { id: 'chaferDebutant',  weight: 20 },
        { id: 'chaferEclaireur', weight: 20 },
        { id: 'chaferFurtif',    weight: 20 },
        { id: 'chaferPiquier',   weight: 20 },
        { id: 'sergentChafer',   weight: 20 }
    ],
    lootTable: [
        { itemId: 'pierreDame',        dropRate: 0.45 },
        { itemId: 'bottesAventurier',  dropRate: 0.03 },
        { itemId: 'capeAventurier',    dropRate: 0.02 },
        { itemId: 'chapeauAventurier', dropRate: 0.02 },
        { itemId: 'anneauAventurier',  dropRate: 0.03 },
        { itemId: 'ceintureAventurier',dropRate: 0.03 },
        { itemId: 'amuletteAventurier',dropRate: 0.03 },
        { itemId: 'cleDonjonKardorim', dropRate: 0.05, isKey: true }
    ]
}
areas.champsAstrub = {
    id: 'champsAstrub',
    name: "Champs d'Astrub",
    minLevel: 10, maxLevel: 30,
    mobMinLevel: 10, mobMaxLevel: 20,
    background: 'champsAstrub',
    icon: 'img/monstres/sprites/tournesolSauvage.png',
    description: "\"Mais d'où peuvent bien venir toutes ces mauvaises herbes !? On ne peut plus marcher nulle part ! Attendez… Cet épouvantail vient de bouger ?\"",
    spawns: [
        { id: 'tournesolSauvage',     weight: 23 },
        { id: 'roseDemoniaque',       weight: 23 },
        { id: 'pissenliDiabolique',   weight: 23 },
        { id: 'epouvanteur',          weight: 21 },
        { id: 'gardienneChampetre',   weight: 10 }
    ],
    lootTable: [
        { itemId: 'pierreDame',       dropRate: 0.45 },
        { itemId: 'sac_paysan',       dropRate: 0.02 },
        { itemId: 'chapeau_paysan',   dropRate: 0.02 },
        { itemId: 'bottes_paysan',    dropRate: 0.02 },
        { itemId: 'anneau_paysan',    dropRate: 0.02 },
        { itemId: 'amulette_paysan',  dropRate: 0.03 },
        { itemId: 'ceinture_paysan',  dropRate: 0.03 },
        { itemId: 'faux_paysan',      dropRate: 0.02 },
        { itemId: 'cleDonjonChamps',  dropRate: 0.05, isKey: true }
    ]
}
areas.plageAstrub = {
    id: 'plageAstrub',
    name: "Plage d'Astrub",
    minLevel: 10, maxLevel: 30,
    mobMinLevel: 10, mobMaxLevel: 20,
    background: 'plageAstrub',
    icon: 'img/monstres/sprites/pichonBleu.png',
    description: "Besoin de vacances ? Cet endroit paradisiaque n’est peut-être pas la destination rêvée… Certains racontent que leurs enfants y auraient mystérieusement disparu.",
    spawns: [
        { id: 'pichonOrange',        weight: 23 },
        { id: 'pichonBleu',          weight: 23 },
        { id: 'pichonBlanc',         weight: 23 },
        { id: 'pichonVert',          weight: 21 },
        { id: 'pichonKloune',        weight: 10 }
    ],
    lootTable: [
        { itemId: 'pierreDame',        dropRate: 0.45 },
        { itemId: 'cape_mousse',       dropRate: 0.02 },
        { itemId: 'coiffe_mousse',     dropRate: 0.02 },
        { itemId: 'bottes_mousse',     dropRate: 0.02 },
        { itemId: 'anneau_mousse',     dropRate: 0.02 },
        { itemId: 'amulette_mousse',   dropRate: 0.03 },
        { itemId: 'ceinture_mousse',   dropRate: 0.03 },
        { itemId: 'pelle_mousse',      dropRate: 0.02 },
        { itemId: 'bouclier_mousse',   dropRate: 0.02 },
        { itemId: 'cleDonjonSable',    dropRate: 0.05, isKey: true }
    ]
}
areas.tainela = {
    id: 'tainela',
    name: 'Tainela',
    minLevel: 20, maxLevel: 40,
    mobMinLevel: 20, mobMaxLevel: 30,
    background: 'tainela',
    icon: 'img/monstres/sprites/bouftou.png',
    description: "Respirez cet air pur, imprégné de l'odeur du cuir et de la laine… Aucun doute, vous voici à Tainela.",
    spawns: [
        { id: 'bouftou',             weight: 30 },
        { id: 'bouftonBlanc',        weight: 25 },
        { id: 'bouftonNoir',         weight: 20 },
        { id: 'bouftouNoir',         weight: 15 },
        { id: 'bouftouChefDeGuerre', weight: 10 }
    ],
    lootTable: [
        { itemId: 'pierreDame',      dropRate: 0.45 },
        { itemId: 'cape_bouftou',     dropRate: 0.02 },
        { itemId: 'coiffe_bouftou',   dropRate: 0.02 },
        { itemId: 'bottes_bouftou',   dropRate: 0.02 },
        { itemId: 'marteau_bouftou',  dropRate: 0.02 },
        { itemId: 'anneau_bouftou',   dropRate: 0.03 },
        { itemId: 'amulette_bouftou', dropRate: 0.03 },
        { itemId: 'ceinture_bouftou', dropRate: 0.02 },
        { itemId: 'bouclier_bouftou', dropRate: 0.02 },
        { itemId: 'cleDonjonBouftou', dropRate: 0.05, isKey: true }
    ]
}

// ─── Donjons ────────────────────────────────────────────────────────────────

areas.donjonIncarnam = {
    id: 'donjonIncarnam',
    type: 'dungeon',
    keyId: 'cleDonjonKardorim',
    name: 'La Crypte de Kardorim',
    minLevel: 15, maxLevel: 15,
    mobMinLevel: 15, mobMaxLevel: 15,
    background: 'forest',
    icon: 'img/monstres/sprites/kardorim.png',
    description: "Les profondeurs d’Incarnam, placées sous la vigilance du redoutable Kardorim, ancien capitaine devenu aventurier, sont toujours parcourues en compagnie de son fidèle compagnon.",
    spawns: [{ id: 'kardorim',    weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 },
        { itemId: 'coiffeKardorim',            dropRate: 0.05 },
        { itemId: 'anneauKardorim',            dropRate: 0.05 },
        { itemId: 'capeKardorim',              dropRate: 0.05 }
    ]
}
areas.donjonMousse = {
    id: 'donjonMousse',
    type: 'dungeon',
    keyId: 'cleDonjonSable',
    name: 'Le Château Ensablé',
    minLevel: 25, maxLevel: 25,
    mobMinLevel: 25, mobMaxLevel: 25,
    background: 'forest',
    icon: 'img/monstres/sprites/mobLeponge.png',
    description: "À l'est, baigné par le soleil, un château de sable surplombe les eaux turquoise de la plage d'Astrub. Au cœur de cette forteresse ensablée, une étrange éponge attire les enfants laissés sans surveillance.",
    spawns: [{ id: 'mobLeponge',    weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 },
        { itemId: 'cape_mousse',               dropRate: 0.03 },
        { itemId: 'coiffe_mousse',             dropRate: 0.03 },
        { itemId: 'bottes_mousse',             dropRate: 0.03 },
        { itemId: 'anneau_mousse',             dropRate: 0.03 },
        { itemId: 'amulette_mousse',           dropRate: 0.03 },
        { itemId: 'ceinture_mousse',           dropRate: 0.03 },
        { itemId: 'pelle_mousse',              dropRate: 0.03 },
        { itemId: 'bouclier_mousse',           dropRate: 0.03 }
    ]
}
areas.donjonChamps = {
    id: 'donjonChamps',
    type: 'dungeon',
    keyId: 'cleDonjonChamps',
    name: 'Grange du Tournesol Affamé',
    minLevel: 25, maxLevel: 25,
    mobMinLevel: 25, mobMaxLevel: 25,
    background: 'forest',
    icon: 'img/monstres/sprites/tournesolAffame.png',
    description: "Mawy Ingalsse, lassée des mauvaises herbes, décida de bâtir une grange-laboratoire afin de les cultiver et de mieux les étudier. Mais ses expériences finirent par lui échapper, donnant naissance à des tournesols attirés par le sang plutôt que par le soleil.",
    spawns: [{ id: 'tournesolAffame',    weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 },
        { itemId: 'sac_paysan',                dropRate: 0.03 },
        { itemId: 'chapeau_paysan',            dropRate: 0.03 },
        { itemId: 'bottes_paysan',             dropRate: 0.03 },
        { itemId: 'anneau_paysan',             dropRate: 0.03 },
        { itemId: 'amulette_paysan',           dropRate: 0.03 },
        { itemId: 'ceinture_paysan',           dropRate: 0.03 },
        { itemId: 'faux_paysan',               dropRate: 0.03 }
    ]
}
areas.donjonBouftou = {
    id: 'donjonBouftou',
    type: 'dungeon',
    keyId: 'cleDonjonBouftou',
    name: 'La Cour du Bouftou Royal',
    minLevel: 35, maxLevel: 35,
    mobMinLevel: 35, mobMaxLevel: 35,
    background: 'forest',
    icon: 'img/monstres/sprites/bouftouRoyal.png',
    description: "Au nord des champs d'Astrub, au cœur des paisibles prairies de Tainela, s'étend la cour du Bouftou Royal. Là règne une créature d'une puissance si remarquable que ses congénères lui ont spontanément accordé le titre de roi.",
    spawns: [{ id: 'bouftouRoyal',    weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 },
        { itemId: 'cape_bouftou_royal',     dropRate: 0.03 },
        { itemId: 'coiffe_bouftou_royal',   dropRate: 0.03 },
        { itemId: 'bottes_bouftou_royal',   dropRate: 0.03 },
        { itemId: 'marteau_bouftou_royal',  dropRate: 0.03 },
        { itemId: 'anneau_bouftou_royal',   dropRate: 0.03 },
        { itemId: 'amulette_bouftou_royal', dropRate: 0.03 },
        { itemId: 'ceinture_bouftou_royal', dropRate: 0.03 },
        { itemId: 'bouclier_bouftou_royal', dropRate: 0.03 }
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
    description: "Les habitants d'Astrub sont submergés par ces oiseaux multicolores ! Venez leur prêter main-forte en vous en débarrassant.",
    spawns: [
        { id: 'piouRouge',  weight: 17 },
        { id: 'piouBleu',   weight: 17 },
        { id: 'piouJaune',  weight: 17 },
        { id: 'piouVert',   weight: 17 },
        { id: 'piouRose',   weight: 17 },
        { id: 'piouViolet', weight: 15 }
    ],
    lootTable: [
        { itemId: 'pierreDame',      dropRate: 0.45 },
        { itemId: 'piloteAutomatique', dropRate: 0.15 }
    ]
}
