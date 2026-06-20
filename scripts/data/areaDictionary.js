// areaDictionary.js — Zones de farm DofusChill
//
// minLevel / maxLevel  : fourchette affichée dans l'UI de la zone
// mobMinLevel / mobMaxLevel : fourchette de niveau des monstres spawnés
// spawns   : sélection pondérée des monstres
// lootTable: items pouvant être droppés dans la zone
// background: fond de combat

const areas = {}


// #region ZONES SAUVAGES ────────────────────────────────────────────────────────────────
areas.cimetiereincarnam = {
    id: 'cimetiereincarnam',
    name: "Cimetiere d'Incarnam",
    minLevel: 1, maxLevel: 20,
    mobMinLevel: 1, mobMaxLevel: 10,
    background: "",
    icon: "images/monsters/Chafer_Débutant.png",
    description: "Cimetière où reposent les âmes de nombreux aventuriers tombés au combat.",
    spawns: [
        { id: 'chaferDebutant', weight: 22 },
        { id: 'chaferEclaireur', weight: 22 },
        { id: 'chaferFurtif', weight: 22 },
        { id: 'chaferPiquier', weight: 22 },
        { id: 'sergentChafer', weight: 12 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'bottes_de_l_aventurier', dropRate: 0.01 },
        { itemId: 'cape_de_l_aventurier', dropRate: 0.01 },
        { itemId: 'chapeau_de_l_aventurier', dropRate: 0.01 },
        { itemId: 'anneau_de_l_aventurier', dropRate: 0.01 },
        { itemId: 'ceinture_de_l_aventurier', dropRate: 0.01 },
        { itemId: 'amulette_de_l_aventurier', dropRate: 0.01 },
        { itemId: 'cleDonjonKardorim', dropRate: 0.15, isKey: true }
    ]
}

areas.champsAstrub = {
    id: 'champsAstrub',
    name: "Champs d'Astrub",
    minLevel: 10, maxLevel: 30,
    mobMinLevel: 10, mobMaxLevel: 20,
    background: 'champs_astrub',
    icon: 'images/monsters/Tournesol_Sauvage.png',
    description: "\"Mais d'où peuvent bien venir toutes ces mauvaises herbes !? On ne peut plus marcher nulle part ! Attendez… Cet épouvantail vient de bouger ?\"",
    spawns: [
        { id: 'tournesolSauvage',     weight: 22 },
        { id: 'roseDemoniaque',       weight: 22 },
        { id: 'pissenliDiabolique',   weight: 22 },
        { id: 'epouvanteur',          weight: 22 },
        { id: 'gardienneChampetre',   weight: 12 }
    ],
    lootTable: [
        { itemId: 'pierreDame',       dropRate: 0.45 },
        { itemId: 'sac_du_paysan',       dropRate: 0.01 },
        { itemId: 'bob_du_paysan',   dropRate: 0.01 },
        { itemId: 'bottes_paysannes',    dropRate: 0.01 },
        { itemId: 'mitaines_mitees_du_paysan',    dropRate: 0.01 },
        { itemId: 'amulette_paysanne',  dropRate: 0.01 },
        { itemId: 'ceinturemuda_du_paysan',  dropRate: 0.01 },
        { itemId: 'faux_usee_du_paysan',      dropRate: 0.01 },
        { itemId: 'cleDonjonChamps',  dropRate: 0.15, isKey: true }
    ]
}

areas.plageAstrub = {
    id: 'plageAstrub',
    name: "Plage d'Astrub",
    minLevel: 10, maxLevel: 30,
    mobMinLevel: 10, mobMaxLevel: 20,
    background: 'plage_astrub',
    icon: 'images/monsters/Pichon_Bleu.png',
    description: "Besoin de vacances ? Cet endroit paradisiaque n’est peut-être pas la destination rêvée… Certains racontent que leurs enfants y auraient mystérieusement disparu.",
    spawns: [
        { id: 'pichonOrange',        weight: 22 },
        { id: 'pichonBleu',          weight: 22 },
        { id: 'pichonBlanc',         weight: 22 },
        { id: 'pichonVert',          weight: 22 },
        { id: 'pichonKloune',        weight: 12 }
    ],
    lootTable: [
        { itemId: 'pierreDame',        dropRate: 0.45 },
        { itemId: 'cape_en_mousse',       dropRate: 0.01 },
        { itemId: 'coiffe_en_mousse',     dropRate: 0.01 },
        { itemId: 'bottes_en_mousse',     dropRate: 0.01 },
        { itemId: 'anneau_en_mousse',     dropRate: 0.01 },
        { itemId: 'amulette_en_mousse',   dropRate: 0.01 },
        { itemId: 'ceinture_en_mousse',   dropRate: 0.01 },
        { itemId: 'pelle_en_mousse',      dropRate: 0.01 },
        { itemId: 'bouclier_en_mousse',   dropRate: 0.01 },
        { itemId: 'cleDonjonSable',    dropRate: 0.15, isKey: true }
    ]
}

areas.tainela = {
    id: 'tainela',
    name: 'Tainela',
    minLevel: 20, maxLevel: 40,
    mobMinLevel: 20, mobMaxLevel: 30,
    background: 'tainela',
    icon: 'images/monsters/Bouftou.png',
    description: "Respirez cet air pur, imprégné de l'odeur du cuir et de la laine… Aucun doute, vous voici à Tainela.",
    spawns: [
        { id: 'bouftou',             weight: 22 },
        { id: 'bouftonBlanc',        weight: 22 },
        { id: 'bouftonNoir',         weight: 22 },
        { id: 'bouftouNoir',         weight: 22 },
        { id: 'Chef_de_Guerre_Bouftou', weight: 12 }
    ],
    lootTable: [
        { itemId: 'pierreDame',      dropRate: 0.45 },
        { itemId: 'cape_bouffante',     dropRate: 0.01 },
        { itemId: 'coiffe_du_bouftou',   dropRate: 0.01 },
        { itemId: 'boufbottes',   dropRate: 0.01 },
        { itemId: 'marteau_du_bouftou',  dropRate: 0.01 },
        { itemId: 'anneau_de_bouze_le_clerc',   dropRate: 0.01 },
        { itemId: 'amulette_du_bouftou', dropRate: 0.01 },
        { itemId: 'ceinture_du_bouftou', dropRate: 0.01 },
        { itemId: 'bouclier_du_bouftou', dropRate: 0.01 },
        { itemId: 'cleDonjonBouftou', dropRate: 0.15, isKey: true }
    ]
}

areas.scarafeuilles = {
    id: 'scarafeuilles',
    name: 'Plaine des scarafeuilles',
    minLevel: 30, maxLevel: 50,
    mobMinLevel: 30, mobMaxLevel: 40,
    background: 'scarafeuilles',
    icon: 'images/monsters/Scarafeuille_Bleu.png',
    description: "Une vaste plaine parsemée de cristaux colorés où pullulent des nuées de Scarafeuilles aux teintes éclatantes. Chaque couleur correspond à un élément différent, et les aventuriers imprudents qui s'y aventurent sans préparation font rapidement connaissance avec leurs résistances élémentaires les plus redoutables.",
    spawns: [
        { id: 'scarafeuilleBleu',  weight: 22 },
        { id: 'scarafeuilleVert',  weight: 22 },
        { id: 'scarafeuilleBlanc', weight: 22 },
        { id: 'scarafeuilleRouge', weight: 22 },
        { id: 'scarafeuilleNoir',  weight: 12 }
    ],
    lootTable: [
        { itemId: 'pierreDame',      dropRate: 0.45 },
        { itemId: 'scaracape_blanche',   dropRate: 0.01 },
        { itemId: 'scaracoiffe_blanche', dropRate: 0.01 },
        { itemId: 'scaranneau_blanc',    dropRate: 0.01 },
        { itemId: 'scarature_blanche',   dropRate: 0.01 },
        { itemId: 'scaracape_bleue',     dropRate: 0.01 },
        { itemId: 'scaracoiffe_bleue',   dropRate: 0.01 },
        { itemId: 'scaranneau_bleu',     dropRate: 0.01 },
        { itemId: 'scarature_bleue',     dropRate: 0.01 },
        { itemId: 'scaracape_rouge',     dropRate: 0.01 },
        { itemId: 'scaracoiffe_rouge',   dropRate: 0.01 },
        { itemId: 'scaranneau_rouge',    dropRate: 0.01 },
        { itemId: 'scarature_rouge',     dropRate: 0.01 },
        { itemId: 'scaracape_verte',     dropRate: 0.01 },
        { itemId: 'scaracoiffe_verte',   dropRate: 0.01 },
        { itemId: 'scaranneau_vert',     dropRate: 0.01 },
        { itemId: 'scarature_verte',     dropRate: 0.01 },
        { itemId: 'scaracape_noire',     dropRate: 0.005 },
        { itemId: 'scaracoiffe_noire',   dropRate: 0.005 },
        { itemId: 'scaranneau_noir',     dropRate: 0.005 },
        { itemId: 'scarature_noire',     dropRate: 0.005 },
        { itemId: 'cleDonjonScarafeuille',      dropRate: 0.15, isKey: true }
    ]
}

areas.crypteDuCimetiere = {
    id: 'crypteDuCimetiere',
    name: "Crypte du cimetière",
    minLevel: 30, maxLevel: 50,
    mobMinLevel: 30, mobMaxLevel: 40,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonSquelettes', dropRate: 0.15, isKey: true }
    ]
}

areas.champsDesIngalsse = {
    id: 'champsDesIngalsse',
    name: "Champs des Ingalsse",
    minLevel: 30, maxLevel: 50,
    mobMinLevel: 30, mobMaxLevel: 40,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonTofus', dropRate: 0.15, isKey: true }
    ]
}

areas.egoutsAstrub = {
    id: 'egoutsAstrub',
    name: "Égouts d'Astrub",
    minLevel: 30, maxLevel: 50,
    mobMinLevel: 30, mobMaxLevel: 40,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonKankreblath', dropRate: 0.15, isKey: true }
    ]
}


areas.Kwaks = {
    id: 'Kwaks',
    name: 'Falaise des Kwaks',
    minLevel: 40, maxLevel: 60,
    mobMinLevel: 40, mobMaxLevel: 50,
    background: 'kwaks',
    icon: 'images/monsters/Kwak_de_Vent.png',
    description: "Accrochées aux flancs de la Montagne des Kwaks, ces falaises balayées par des vents constants sont le territoire naturel des Kwakères et de leurs cousins kwaks. Les aventuriers qui parviennent à gravir ces hauteurs vertigineuses rapportent que le panorama est exceptionnel… pour peu qu'ils arrivent à tenir debout.",
    spawns: [
        { id: 'kwakVent',       weight: 17 },
        { id: 'kwakFlamme',     weight: 17 },
        { id: 'kwakGlace',      weight: 17 },
        { id: 'kwakTerre',      weight: 17 },
        { id: 'kwakereVent',    weight: 8 },
        { id: 'kwakereFlamme',  weight: 8 },
        { id: 'kwakereGlace',   weight: 8 },
        { id: 'kwakereTerre',   weight: 8 }
    ],
    lootTable: [
        { itemId: 'pierreDame',            dropRate: 0.45 },
        { itemId: 'kwape_de_vent',          dropRate: 0.005 },
        { itemId: 'kwakoiffe_de_vent',      dropRate: 0.005 },
        { itemId: 'kwakobottes_de_vent',    dropRate: 0.005 },
        { itemId: 'kwakanneau_de_vent',     dropRate: 0.005 },
        { itemId: 'amukwak_de_vent',        dropRate: 0.005 },
        { itemId: 'kwakture_de_vent',       dropRate: 0.005 },
        { itemId: 'kwaklame_de_vent',       dropRate: 0.005 },
        { itemId: 'kwape_de_glace',         dropRate: 0.005 },
        { itemId: 'kwakoiffe_de_glace',     dropRate: 0.005 },
        { itemId: 'kwakobottes_de_glace',   dropRate: 0.005 },
        { itemId: 'kwakanneau_de_glace',    dropRate: 0.005 },
        { itemId: 'amukwak_de_glace',       dropRate: 0.005 },
        { itemId: 'kwakture_de_glace',      dropRate: 0.005 },
        { itemId: 'kwaklame_de_glace',      dropRate: 0.005 },
        { itemId: 'kwape_de_flammes',       dropRate: 0.005 },
        { itemId: 'kwakoiffe_de_flammes',   dropRate: 0.005 },
        { itemId: 'kwakobottes_de_flammes', dropRate: 0.005 },
        { itemId: 'kwakanneau_de_flammes',  dropRate: 0.005 },
        { itemId: 'amukwak_de_flammes',     dropRate: 0.005 },
        { itemId: 'kwakture_de_flammes',    dropRate: 0.005 },
        { itemId: 'kwaklame_de_flammes',    dropRate: 0.005 },
        { itemId: 'kwape_de_terre',         dropRate: 0.005 },
        { itemId: 'kwakoiffe_de_terre',     dropRate: 0.005 },
        { itemId: 'kwakobottes_de_terre',   dropRate: 0.005 },
        { itemId: 'kwakanneau_de_terre',    dropRate: 0.005 },
        { itemId: 'amukwak_de_terre',       dropRate: 0.005 },
        { itemId: 'kwakture_de_terre',      dropRate: 0.005 },
        { itemId: 'kwaklame_de_terre',      dropRate: 0.005 },
        { itemId: 'cleDonjonKwakwa',       dropRate: 0.15, isKey: true }
    ]
}

areas.campementBwork = {
    id: 'campementBwork',
    name: "Campement Bwork",
    minLevel: 40, maxLevel: 60,
    mobMinLevel: 40, mobMaxLevel: 50,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonBworks', dropRate: 0.15, isKey: true }
    ]
}

areas.territoireDesBandits = {
    id: 'territoireDesBandits',
    name: "Territoire des bandits",
    minLevel: 40, maxLevel: 60,
    mobMinLevel: 40, mobMaxLevel: 50,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonForgerons', dropRate: 0.15, isKey: true }
    ]
}

areas.coteDeCorail = {
    id: 'coteDeCorail',
    name: "Côte de corail",
    minLevel: 40, maxLevel: 60,
    mobMinLevel: 40, mobMaxLevel: 50,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonHesque', dropRate: 0.15, isKey: true }
    ]
}

areas.prairiesAstrub = {
    id: 'prairiesAstrub',
    name: "Prairies d'Astrub",
    minLevel: 40, maxLevel: 60,
    mobMinLevel: 40, mobMaxLevel: 50,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonLarves', dropRate: 0.15, isKey: true }
    ]
}

areas.futaieEnneigee = {
    id: 'futaieEnneigee',
    name: "Futaie enneigée",
    minLevel: 40, maxLevel: 60,
    mobMinLevel: 40, mobMaxLevel: 50,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonRefugeSylvestre', dropRate: 0.15, isKey: true }
    ]
}


areas.blops = {
    id: 'blops',
    name: 'Lac de Cania',
    minLevel: 50, maxLevel: 70,
    mobMinLevel: 50, mobMaxLevel: 60,
    background: 'blop',
    icon: 'images/monsters/Blopignon.png',
    description: "Au cœur des vastes plaines de Cania s'étend un immense lac aux eaux calmes et cristallines. À première vue, l'endroit semble paisible, bercé par le chant du vent et le clapotis des vagues contre les berges. Pourtant, les apparences sont trompeuses.",
    spawns: [
        { id: 'blopCoco',     weight: 10 },
        { id: 'blopGriotte',  weight: 10 },
        { id: 'blopIndigo',   weight: 10 },
        { id: 'blopReinette', weight: 10 },
        { id: 'blopignon',    weight: 8 },
        { id: 'tronkoBlop',   weight: 8 },
        { id: 'gloutoBlop',   weight: 4 }
    ],
    lootTable: [
        { itemId: 'pierreDame',    dropRate: 0.45 },
        { itemId: 'bloptes_reinette',    dropRate: 0.01 },
        { itemId: 'blopanneau_reinette', dropRate: 0.01 },
        { itemId: 'amublop_reinette',    dropRate: 0.01 },
        { itemId: 'blopture_reinette',   dropRate: 0.01 },
        { itemId: 'bloptes_coco',        dropRate: 0.01 },
        { itemId: 'blopanneau_coco',     dropRate: 0.01 },
        { itemId: 'amublop_coco',        dropRate: 0.01 },
        { itemId: 'blopture_coco',       dropRate: 0.01 },
        { itemId: 'bloptes_griottes',    dropRate: 0.01 },
        { itemId: 'blopanneau_griotte',  dropRate: 0.01 },
        { itemId: 'amublop_griotte',     dropRate: 0.01 },
        { itemId: 'blopture_griotte',    dropRate: 0.01 },
        { itemId: 'bloptes_indigo',      dropRate: 0.01 },
        { itemId: 'blopanneau_indigo',   dropRate: 0.01 },
        { itemId: 'amublop_indigo',      dropRate: 0.01 },
        { itemId: 'blopture_indigo',     dropRate: 0.01 },
        { itemId: 'cleDonjonBlop', dropRate: 0.15, isKey: true }
    ]
}

areas.ileDesWabbits = {
    id: 'ileDesWabbits',
    name: "Île des Wabbits",
    minLevel: 50, maxLevel: 70,
    mobMinLevel: 50, mobMaxLevel: 60,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonWabbit', dropRate: 0.15, isKey: true }
    ]
}

areas.foretDesMasques = {
    id: 'foretDesMasques',
    name: "Forêt des masques",
    minLevel: 50, maxLevel: 70,
    mobMinLevel: 50, mobMaxLevel: 60,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonKanniboul', dropRate: 0.15, isKey: true }
    ]
}

areas.tourbieresSansFond = {
    id: 'tourbieresSansFond',
    name: "Tourbière sans fonds",
    minLevel: 50, maxLevel: 70,
    mobMinLevel: 50, mobMaxLevel: 60,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonOtomaj', dropRate: 0.15, isKey: true }
    ]
}


areas.plateauMantiscore = {
    id: 'plateauMantiscore',
    name: 'Désert de Saharash',
    minLevel: 60, maxLevel: 80,
    mobMinLevel: 60, mobMaxLevel: 70,
    background: 'desertMantiscore',
    icon: 'images/monsters/leolhyene.png',
    description: "Le vent du désert s’engouffre dans les ossements à demi ensevelis, produisant des sons étranges semblables à des lamentations anciennes. Entre les dunes, les créatures du désert ont pris possession des lieux : Fennex, Scordion Bleu, Léolhyènes et autres prédateurs rôdent parmi les restes de ces géants disparus, comme si la nature elle-même refusait d’abandonner ce cimetière.",
    spawns: [
        { id: 'ouroboulos',   weight: 22 },
        { id: 'scordionBleu', weight: 22 },
        { id: 'fennex',       weight: 22 },
        { id: 'leolhyene',    weight: 22 },
        { id: 'boulepique',   weight: 12 }
    ],
    lootTable: [
        { itemId: 'pierreDame',          dropRate: 0.45 },
        { itemId: 'cape_ouroboulos',   dropRate: 0.01 },
        { itemId: 'cape_du_desert',   dropRate: 0.01 },
        { itemId: 'coiffennex',   dropRate: 0.01 },
        { itemId: 'bottes_ouroboulos',   dropRate: 0.01 },
        { itemId: 'anneau_ouroboulos',   dropRate: 0.01 },
        { itemId: 'string_leolhyene',   dropRate: 0.01 },
        { itemId: 'cleDonjonMantiscore', dropRate: 0.15, isKey: true }
    ]
}

areas.montagneDesCraqueleurs = {
    id: 'montagneDesCraqueleurs',
    name: "Montagne des craqueleurs",
    minLevel: 60, maxLevel: 80,
    mobMinLevel: 60, mobMaxLevel: 70,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonCraqueleurs', dropRate: 0.15, isKey: true }
    ]
}

areas.desolationDeSidimote = {
    id: 'desolationDeSidimote',
    name: "Désolation de sidimote",
    minLevel: 60, maxLevel: 80,
    mobMinLevel: 60, mobMaxLevel: 70,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonBrumen', dropRate: 0.15, isKey: true }
    ]
}


areas.nidsDragaeufs = {
    id: 'nidsDragaeufs',
    name: 'Nids des Dragaeufs',
    minLevel: 70, maxLevel: 90,
    mobMinLevel: 70, mobMaxLevel: 80,
    background: 'montagneDragoeuf',
    icon: 'images/monsters/Dragoeuf_Ardoise.png',
    description: "À l'abri des regards, au Sud de la foret maléfique, se trouve le Nid des Dragoeufs. Ces terres brûlées par le souffle des dragons était jadis une forêt luxuriante. A présent elles sont le refuge de leurs descendants, de puissantes créatures veillant farouchement sur leurs œufs et leur territoire.",
    spawns: [
        { id: 'dragoeufArdoise',  weight: 22 },
        { id: 'dragoeufArgile',   weight: 22 },
        { id: 'dragoeufCalcaire', weight: 22 },
        { id: 'dragoeufCharbon',  weight: 22 },
        { id: 'dragoeufAlbatre',  weight: 12 }
    ],
    lootTable: [
        { itemId: 'pierreDame',          dropRate: 0.45 },
        { itemId: 'sabots_de_shika',     dropRate: 0.01},
        { itemId: 'bracelet_magique_de_shika',     dropRate: 0.01},
        { itemId: 'epis_de_shika',   dropRate: 0.01},
        { itemId: 'shikature',   dropRate: 0.01},
        { itemId: 'cleDonjonDraegnerys', dropRate: 0.15, isKey: true }
    ]
}

areas.souterrainsWabbits = {
    id: 'souterrainsWabbits',
    name: "Souterrains Wabbits",
    minLevel: 70, maxLevel: 90,
    mobMinLevel: 70, mobMaxLevel: 80,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonTerrierWabbit', dropRate: 0.15, isKey: true }
    ]
}


areas.foretAbraknydes = {
    id: 'foretAbraknydes',
    name: 'Forêt des Abraknydes',
    minLevel: 80, maxLevel: 100,
    mobMinLevel: 80, mobMaxLevel: 90,
    background: 'foretAbraknyde',
    icon: 'images/monsters/Abrakne_Sombre.png',
    description: "À l'ouest d'Astrub s'étend l'un des derniers vestiges de la forêt originelle qui recouvrait autrefois Amakna : la Forêt des Abraknydes. Épargnée par les flammes et les haches des hommes, cette étendue sauvage demeure un lieu de mystères où la nature n'a jamais accepté la présence des civilisations.",
    spawns: [
        { id: 'abrakneSombre',      weight: 20 },
        { id: 'abraknydeSombre',    weight: 20 },
        { id: 'araknotron',         weight: 20 },
        { id: 'abraknyde', weight: 20 }
    ],
    lootTable: [
        { itemId: 'pierreDame',                  dropRate: 0.45 },
        { itemId: 'araknoture', dropRate: 0.01 },
        { itemId: 'l_araknacoiffe', dropRate: 0.01 },
        { itemId: 'araknoton', dropRate: 0.01 },
        { itemId: 'araknoton', dropRate: 0.01 },
        { itemId: 'araknoton', dropRate: 0.01 },
        { itemId: 'araknoture', dropRate: 0.01 },
        { itemId: 'la_trancheuse_d_arakne', dropRate: 0.01 },
        { itemId: 'l_araknacoiffe', dropRate: 0.01 },
        { itemId: 'cleDonjonAbraknydeAncestral', dropRate: 0.15, isKey: true }
    ]
}

areas.canyonSauvage = {
    id: 'canyonSauvage',
    name: "Canyon sauvage",
    minLevel: 80, maxLevel: 100,
    mobMinLevel: 80, mobMaxLevel: 90,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonKoulosse', dropRate: 0.15, isKey: true }
    ]
}

areas.boisDesArakhai = {
    id: 'boisDesArakhai',
    name: "Bois des arak_haï",
    minLevel: 80, maxLevel: 100,
    mobMinLevel: 80, mobMaxLevel: 90,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonReineNyee', dropRate: 0.15, isKey: true }
    ]
}

areas.cheminDuCrane = {
    id: 'cheminDuCrane',
    name: "Chemin du crâne",
    minLevel: 80, maxLevel: 100,
    mobMinLevel: 80, mobMaxLevel: 90,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonChouque', dropRate: 0.15, isKey: true }
    ]
}

areas.routeDesRoulottes = {
    id: 'routeDesRoulottes',
    name: "Route des roulottes",
    minLevel: 80, maxLevel: 100,
    mobMinLevel: 80, mobMaxLevel: 90,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonMagikRiktus', dropRate: 0.15, isKey: true }
    ]
}


areas.fermeDragonCochon = {
    id: 'fermeDragonCochon',
    name: 'Territoire des porcos',
    minLevel: 90, maxLevel: 110,
    mobMinLevel: 90, mobMaxLevel: 100,
    background: 'fermeDragonCochon',
    icon: 'images/monsters/Cochon_de_Farle.png',
    description: "Entre les enclos délabrés, les fortifications de fortune et les sentiers creusés dans la terre grasse, des hordes de porcos patrouillent sans relâche pour protéger leur domaine. Gare à l'aventurier qui s'y aventure sans préparation : les habitants de ces terres n'apprécient guère les intrus et règlent généralement les différends à grands coups de groin.",
    spawns: [
        { id: 'cochonDeFarle', weight: 20 },
        { id: 'donDorgan',     weight: 20 },
        { id: 'donDussAng',    weight: 20 },
        { id: 'porsalu',       weight: 20 },
        { id: 'gorgouille',    weight: 4 }
    ],
    lootTable: [
        { itemId: 'pierreDame',            dropRate: 0.45 },
        { itemId: 'cleDonjonDragonCochon', dropRate: 0.15, isKey: true },
        { itemId: 'mules_du_dragon_cochon',   dropRate: 0.01 },
        { itemId: 'anneau_du_dragon_cochon',   dropRate: 0.01 },
        { itemId: 'collier_du_dragon_cochon', dropRate: 0.01 },
        { itemId: 'ceinture_dracochoune', dropRate: 0.01 }
    ]
}


areas.hautDesHurlements = {
    id: 'hautDesHurlements',
    name: "Haut des hurlements",
    minLevel: 90, maxLevel: 110,
    mobMinLevel: 90, mobMaxLevel: 100,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonMeulou', dropRate: 0.15, isKey: true }
    ]
}

areas.plainesHerbeuses = {
    id: 'plainesHerbeuses',
    name: "Plaines Herbeuses",
    minLevel: 90, maxLevel: 110,
    mobMinLevel: 90, mobMaxLevel: 100,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonRasboul', dropRate: 0.15, isKey: true }
    ]
}

areas.ileDeKartonpath = {
    id: 'ileDeKartonpath',
    name: "Ile de Kartonpath",
    minLevel: 90, maxLevel: 110,
    mobMinLevel: 90, mobMaxLevel: 100,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonDramak', dropRate: 0.15, isKey: true }
    ]
}

areas.jungleInterdite = {
    id: 'jungleInterdite',
    name: "Jungle Interdite",
    minLevel: 90, maxLevel: 110,
    mobMinLevel: 90, mobMaxLevel: 100,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonMoon', dropRate: 0.15, isKey: true }
    ]
}

areas.villageDragoeufs = {
    id: 'villageDragoeufs',
    name: "Village des Dragoeufs",
    minLevel: 90, maxLevel: 110,
    mobMinLevel: 90, mobMaxLevel: 100,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonKharnozor', dropRate: 0.15, isKey: true }
    ]
}


areas.penatesDuCorbac = {
    id: 'penatesDuCorbac',
    name: "Pénates du corbac",
    minLevel: 100, maxLevel: 120,
    mobMinLevel: 100, mobMaxLevel: 110,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonCorbac', dropRate: 0.15, isKey: true }
    ]
}

areas.egoutsDeBonta = {
    id: 'egoutsDeBonta',
    name: "Égouts de Bonta",
    minLevel: 100, maxLevel: 120,
    mobMinLevel: 100, mobMaxLevel: 110,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonRatBlanc', dropRate: 0.15, isKey: true }
    ]
}

areas.egoutsDeBrakmar = {
    id: 'egoutsDeBrakmar',
    name: "Égouts de Brâkmar",
    minLevel: 100, maxLevel: 120,
    mobMinLevel: 100, mobMaxLevel: 110,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonRatNoir', dropRate: 0.15, isKey: true }
    ]
}

areas.plantala = {
    id: 'plantala',
    name: "Plantala",
    minLevel: 100, maxLevel: 120,
    mobMinLevel: 100, mobMaxLevel: 110,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonDamadrya', dropRate: 0.15, isKey: true }
    ]
}


areas.ileDuMinotoror = {
    id: 'ileDuMinotoror',
    name: "Ile du Minotoror",
    minLevel: 110, maxLevel: 130,
    mobMinLevel: 110, mobMaxLevel: 120,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonMinotoror', dropRate: 0.15, isKey: true }
    ]
}

areas.souterrainsDragoeufs = {
    id: 'souterrainsDragoeufs',
    name: "Souterrains des Dragoeufs",
    minLevel: 110, maxLevel: 130,
    mobMinLevel: 110, mobMaxLevel: 120,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonCrocabulia', dropRate: 0.15, isKey: true }
    ]
}

areas.champsDesTofusSauvages = {
    id: 'champsDesTofusSauvages',
    name: "Champs des Tofus Sauvages",
    minLevel: 110, maxLevel: 130,
    mobMinLevel: 110, mobMaxLevel: 120,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonTofulaillerRoyal', dropRate: 0.15, isKey: true }
    ]
}

areas.champsDeGlace = {
    id: 'champsDeGlace',
    name: "Champs de Glace",
    minLevel: 110, maxLevel: 130,
    mobMinLevel: 110, mobMaxLevel: 120,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonRoyalmouth', dropRate: 0.15, isKey: true }
    ]
}

areas.valleeDeLaMortKitu = {
    id: 'valleeDeLaMortKitu',
    name: "Vallée de la mort Kitu",
    minLevel: 110, maxLevel: 130,
    mobMinLevel: 110, mobMaxLevel: 120,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonSkeunk', dropRate: 0.15, isKey: true }
    ]
}


areas.lacDeCaniaProfond = {
    id: 'lacDeCaniaProfond',
    name: "Lac de Cania",
    minLevel: 120, maxLevel: 140,
    mobMinLevel: 120, mobMaxLevel: 130,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonBlopMulticolore', dropRate: 0.15, isKey: true }
    ]
}

areas.cirqueDeCania = {
    id: 'cirqueDeCania',
    name: "Cirque de Cania",
    minLevel: 120, maxLevel: 140,
    mobMinLevel: 120, mobMaxLevel: 130,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonHauteTruche', dropRate: 0.15, isKey: true }
    ]
}

areas.territoireCacterre = {
    id: 'territoireCacterre',
    name: "Territoire Cacterre",
    minLevel: 120, maxLevel: 140,
    mobMinLevel: 120, mobMaxLevel: 130,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonElPiko', dropRate: 0.15, isKey: true }
    ]
}

areas.akwadala = {
    id: 'akwadala',
    name: "Akwadala",
    minLevel: 120, maxLevel: 140,
    mobMinLevel: 120, mobMaxLevel: 130,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonDameEaux', dropRate: 0.15, isKey: true }
    ]
}

areas.terrdala = {
    id: 'terrdala',
    name: "Terrdala",
    minLevel: 120, maxLevel: 140,
    mobMinLevel: 120, mobMaxLevel: 130,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonTanukoi', dropRate: 0.15, isKey: true }
    ]
}


areas.foretSombre = {
    id: 'foretSombre',
    name: "Forêt sombre",
    minLevel: 130, maxLevel: 150,
    mobMinLevel: 130, mobMaxLevel: 140,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonCheneMou', dropRate: 0.15, isKey: true }
    ]
}

areas.lacGele = {
    id: 'lacGele',
    name: "Lac gelé",
    minLevel: 130, maxLevel: 150,
    mobMinLevel: 130, mobMaxLevel: 140,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonMansot', dropRate: 0.15, isKey: true }
    ]
}

areas.jungleObscure = {
    id: 'jungleObscure',
    name: "Jungle Obscure",
    minLevel: 130, maxLevel: 150,
    mobMinLevel: 130, mobMaxLevel: 140,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonTynril', dropRate: 0.15, isKey: true }
    ]
}

areas.aerdala = {
    id: 'aerdala',
    name: "Aerdala",
    minLevel: 130, maxLevel: 150,
    mobMinLevel: 130, mobMaxLevel: 140,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonDojoVent', dropRate: 0.15, isKey: true }
    ]
}

areas.feudala = {
    id: 'feudala',
    name: "Feudala",
    minLevel: 130, maxLevel: 150,
    mobMinLevel: 130, mobMaxLevel: 140,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonFouxArtifice', dropRate: 0.15, isKey: true }
    ]
}


areas.egoutsDuChateauAmakna = {
    id: 'egoutsDuChateauAmakna',
    name: "Égouts du château d'Amakna",
    minLevel: 140, maxLevel: 160,
    mobMinLevel: 140, mobMaxLevel: 150,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonSphincter', dropRate: 0.15, isKey: true }
    ]
}

areas.berceauDAlma = {
    id: 'berceauDAlma',
    name: "Berceau d'Alma",
    minLevel: 140, maxLevel: 160,
    mobMinLevel: 140, mobMaxLevel: 150,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonGrolandais', dropRate: 0.15, isKey: true }
    ]
}

areas.dedaleDuDarkVlad = {
    id: 'dedaleDuDarkVlad',
    name: "Dédale du Dark Vlad",
    minLevel: 140, maxLevel: 160,
    mobMinLevel: 140, mobMaxLevel: 150,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonTertreSommeil', dropRate: 0.15, isKey: true }
    ]
}


areas.larmesDOuronigride = {
    id: 'larmesDOuronigride',
    name: "Larmes d'Ouronigride",
    minLevel: 150, maxLevel: 170,
    mobMinLevel: 150, mobMaxLevel: 160,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonObsidiantre', dropRate: 0.15, isKey: true }
    ]
}

areas.feuillageArbreHakam = {
    id: 'feuillageArbreHakam',
    name: "Feuillage de l'arbre Hakam",
    minLevel: 150, maxLevel: 170,
    mobMinLevel: 150, mobMaxLevel: 160,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonKimbo', dropRate: 0.15, isKey: true }
    ]
}

areas.centreDuLabyrintheMinotoror = {
    id: 'centreDuLabyrintheMinotoror',
    name: "Centre du Labyrinthe du Minotoror",
    minLevel: 150, maxLevel: 170,
    mobMinLevel: 150, mobMaxLevel: 160,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonMinotot', dropRate: 0.15, isKey: true }
    ]
}

areas.dentsDePierre = {
    id: 'dentsDePierre',
    name: "Dents de pierre",
    minLevel: 150, maxLevel: 170,
    mobMinLevel: 150, mobMaxLevel: 160,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonKanigroula', dropRate: 0.15, isKey: true }
    ]
}

areas.cimetiereDeGrobe = {
    id: 'cimetiereDeGrobe',
    name: "Cimetière de Grobe",
    minLevel: 150, maxLevel: 170,
    mobMinLevel: 150, mobMaxLevel: 160,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonShogunTofugawa', dropRate: 0.15, isKey: true }
    ]
}


areas.crevassePerge = {
    id: 'crevassePerge',
    name: "Crevasse Perge",
    minLevel: 160, maxLevel: 180,
    mobMinLevel: 160, mobMaxLevel: 170,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonGivrefoux', dropRate: 0.15, isKey: true }
    ]
}

areas.gorgeDesVentsHurlants = {
    id: 'gorgeDesVentsHurlants',
    name: "Gorge des vents hurlants",
    minLevel: 160, maxLevel: 180,
    mobMinLevel: 160, mobMaxLevel: 170,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonPereVer', dropRate: 0.15, isKey: true }
    ]
}

areas.montDesTombeaux = {
    id: 'montDesTombeaux',
    name: "Mont des tombeaux",
    minLevel: 160, maxLevel: 180,
    mobMinLevel: 160, mobMaxLevel: 170,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonDemeureEsprits', dropRate: 0.15, isKey: true }
    ]
}


areas.gisgoul = {
    id: 'gisgoul',
    name: "Gisgoul",
    minLevel: 170, maxLevel: 190,
    mobMinLevel: 170, mobMaxLevel: 180,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonBworker', dropRate: 0.15, isKey: true }
    ]
}

areas.domaineDesFungus = {
    id: 'domaineDesFungus',
    name: "Domaine des Fungus",
    minLevel: 170, maxLevel: 190,
    mobMinLevel: 170, mobMaxLevel: 180,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonOugah', dropRate: 0.15, isKey: true }
    ]
}

areas.crocsDeVerre = {
    id: 'crocsDeVerre',
    name: "Crocs de verre",
    minLevel: 170, maxLevel: 190,
    mobMinLevel: 170, mobMaxLevel: 180,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonKolosso', dropRate: 0.15, isKey: true }
    ]
}

areas.ileDeSakai = {
    id: 'ileDeSakai',
    name: "Île de Sakaï",
    minLevel: 170, maxLevel: 190,
    mobMinLevel: 170, mobMaxLevel: 180,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonSakai', dropRate: 0.15, isKey: true }
    ]
}

areas.foretPetrifiee = {
    id: 'foretPetrifiee',
    name: "Forêt pétrifiée",
    minLevel: 170, maxLevel: 190,
    mobMinLevel: 170, mobMaxLevel: 180,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonKorriandre', dropRate: 0.15, isKey: true }
    ]
}


areas.montTorrideau = {
    id: 'montTorrideau',
    name: "Mont Torrideau",
    minLevel: 180, maxLevel: 200,
    mobMinLevel: 180, mobMaxLevel: 190,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonGloursons', dropRate: 0.15, isKey: true }
    ]
}

areas.citeOubliee = {
    id: 'citeOubliee',
    name: "Cité oubliée",
    minLevel: 180, maxLevel: 200,
    mobMinLevel: 180, mobMaxLevel: 190,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonOmbre', dropRate: 0.15, isKey: true }
    ]
}

areas.nimotopia = {
    id: 'nimotopia',
    name: "Nimotopia",
    minLevel: 180, maxLevel: 200,
    mobMinLevel: 180, mobMaxLevel: 190,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonRazof', dropRate: 0.15, isKey: true }
    ]
}

areas.ereboria = {
    id: 'ereboria',
    name: "Ereboria",
    minLevel: 180, maxLevel: 200,
    mobMinLevel: 180, mobMaxLevel: 190,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonBastionMarteaux', dropRate: 0.15, isKey: true }
    ]
}


areas.bastionFroidesLegions = {
    id: 'bastionFroidesLegions',
    name: "Bastion des Froides légions",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonSylargh', dropRate: 0.15, isKey: true }
    ]
}

areas.jardinsHivers = {
    id: 'jardinsHivers',
    name: "Jardins d'Hivers",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonKlime', dropRate: 0.15, isKey: true }
    ]
}

areas.rempartsAVent = {
    id: 'rempartsAVent',
    name: "Remparts à vent",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonMissizFrizz', dropRate: 0.15, isKey: true }
    ]
}

areas.tannerieEcarlate = {
    id: 'tannerieEcarlate',
    name: "Tannerie Écarlate",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonNileza', dropRate: 0.15, isKey: true }
    ]
}

areas.tourDeLaClepsydre = {
    id: 'tourDeLaClepsydre',
    name: "Tour de la Clepsydre",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonHarebourg', dropRate: 0.15, isKey: true }
    ]
}

areas.abyssesDeSufokia = {
    id: 'abyssesDeSufokia',
    name: "Abysses de Sufokia",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonMerkator', dropRate: 0.15, isKey: true }
    ]
}

areas.rocDesSalbatroce = {
    id: 'rocDesSalbatroce',
    name: "Roc des Salbatroce",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonBaleine', dropRate: 0.15, isKey: true }
    ]
}

areas.domaineDesTrithons = {
    id: 'domaineDesTrithons',
    name: "Domaine des Trithons",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonMeno', dropRate: 0.15, isKey: true }
    ]
}

areas.villeSubmergee = {
    id: 'villeSubmergee',
    name: "Ville submergée",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonKoutoulou', dropRate: 0.15, isKey: true }
    ]
}

areas.plateauRlyugluglu = {
    id: 'plateauRlyugluglu',
    name: "Plateau de R'lyugluglu",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonDantinea', dropRate: 0.15, isKey: true }
    ]
}

areas.caserneDuJourSansFin = {
    id: 'caserneDuJourSansFin',
    name: "Caserne du jour sans fin",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonIlyzaelle', dropRate: 0.15, isKey: true }
    ]
}

areas.epaveSilencieuse = {
    id: 'epaveSilencieuse',
    name: "Épave silencieuse",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonBethel', dropRate: 0.15, isKey: true }
    ]
}

areas.marchesMagmatiques = {
    id: 'marchesMagmatiques',
    name: "Marches magmatiques",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonSolar', dropRate: 0.15, isKey: true }
    ]
}

areas.royaumeDesMartegel = {
    id: 'royaumeDesMartegel',
    name: "Royaume des martegel",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonDazak', dropRate: 0.15, isKey: true }
    ]
}

areas.crocuzko = {
    id: 'crocuzko',
    name: "Crocuzko",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonTorkelonia', dropRate: 0.15, isKey: true }
    ]
}

areas.royaumeCorrompu = {
    id: 'royaumeCorrompu',
    name: "Royaume Corrompu",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonArbreMort', dropRate: 0.15, isKey: true }
    ]
}

areas.galereDeServitude = {
    id: 'galereDeServitude',
    name: "Galère de Servitude",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonTyrannie', dropRate: 0.15, isKey: true }
    ]
}

areas.desertDeMisere = {
    id: 'desertDeMisere',
    name: "Désert de Misère",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonBalance', dropRate: 0.15, isKey: true }
    ]
}

areas.blessureDeGuerre = {
    id: 'blessureDeGuerre',
    name: "Blessure de Guerre",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonTroneSang', dropRate: 0.15, isKey: true }
    ]
}

areas.pyramideMaudite = {
    id: 'pyramideMaudite',
    name: "Pyramide maudite",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonTalKasha', dropRate: 0.15, isKey: true }
    ]
}

areas.pandamonium = {
    id: 'pandamonium',
    name: "Pandamonium",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonKabahal', dropRate: 0.15, isKey: true }
    ]
}

areas.cauchemarDesRavageurs = {
    id: 'cauchemarDesRavageurs',
    name: "Cauchemar des Ravageurs",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonAurorePourpre', dropRate: 0.15, isKey: true }
    ]
}

areas.ephedrya = {
    id: 'ephedrya',
    name: "Ephedrya",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/.png",
    description: "",
    spawns: [],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonMalefices', dropRate: 0.15, isKey: true }
    ]
}
// #endregion

// #region DONJONS ────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 15
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonIncarnam = {
    id: 'donjonIncarnam',
    type: 'dungeon',
    keyId: 'cleDonjonKardorim',
    name: 'La Crypte de Kardorim',
    minLevel: 15, maxLevel: 15,
    mobMinLevel: 15, mobMaxLevel: 15,
    background: 'cimetiere_incarnam',
    icon: 'images/monsters/Kardorim.png',
    description: "Les profondeurs d'Incarnam, placées sous la vigilance du redoutable Kardorim, ancien capitaine devenu aventurier, sont toujours parcourues en compagnie de son fidèle compagnon.",
    spawns: [{ id: 'kardorim',    weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 },
        { itemId: 'casque_de_kardorim',            dropRate: 0.03 },
        { itemId: 'bracelet_de_kardorim',            dropRate: 0.03 },
        { itemId: 'cape_de_kardorim',              dropRate: 0.03 }
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 25
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonMousse = {
    id: 'donjonMousse',
    type: 'dungeon',
    keyId: 'cleDonjonSable',
    name: 'Le Château Ensablé',
    minLevel: 25, maxLevel: 25,
    mobMinLevel: 25, mobMaxLevel: 25,
    background: 'chateau_ensable',
    icon: 'images/monsters/Mob_l_Éponge.png',
    description: "À l'est, baigné par le soleil, un château de sable surplombe les eaux turquoise de la plage d'Astrub. Au cœur de cette forteresse ensablée, une étrange éponge attire les enfants laissés sans surveillance.",
    spawns: [{ id: 'mobLeponge',    weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 },
        { itemId: 'cape_en_mousse',       dropRate: 0.01 },
        { itemId: 'coiffe_en_mousse',     dropRate: 0.01 },
        { itemId: 'bottes_en_mousse',     dropRate: 0.02 },
        { itemId: 'anneau_en_mousse',     dropRate: 0.02 },
        { itemId: 'amulette_en_mousse',   dropRate: 0.02 },
        { itemId: 'ceinture_en_mousse',   dropRate: 0.02 },
        { itemId: 'pelle_en_mousse',      dropRate: 0.02 },
        { itemId: 'bouclier_en_mousse',   dropRate: 0.02 }
    ]
}
areas.donjonChamps = {
    id: 'donjonChamps',
    type: 'dungeon',
    keyId: 'cleDonjonChamps',
    name: 'Grange du Tournesol Affamé',
    minLevel: 25, maxLevel: 25,
    mobMinLevel: 25, mobMaxLevel: 25,
    background: 'champs_astrub',
    icon: 'images/monsters/Tournesol_Affamé.png',
    description: "Mawy Ingalsse, lassée des mauvaises herbes, décida de bâtir une grange-laboratoire afin de les cultiver et de mieux les étudier. Mais ses expériences finirent par lui échapper, donnant naissance à des tournesols attirés par le sang plutôt que par le soleil.",
    spawns: [{ id: 'tournesolAffame',    weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 },
        { itemId: 'sac_du_paysan',       dropRate: 0.01 },
        { itemId: 'bob_du_paysan',   dropRate: 0.01 },
        { itemId: 'bottes_paysannes',    dropRate: 0.01 },
        { itemId: 'mitaines_mitees_du_paysan',    dropRate: 0.01 },
        { itemId: 'amulette_paysanne',  dropRate: 0.01 },
        { itemId: 'ceinturemuda_du_paysan',  dropRate: 0.01 },
        { itemId: 'faux_usee_du_paysan',      dropRate: 0.01 },
        { itemId: 'la_plantouze_des_champs', dropRate: 0.06 }
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 35
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonBouftou = {
    id: 'donjonBouftou',
    type: 'dungeon',
    keyId: 'cleDonjonBouftou',
    name: 'La Cour du Bouftou Royal',
    minLevel: 35, maxLevel: 35,
    mobMinLevel: 35, mobMaxLevel: 35,
    background: 'tainela',
    icon: 'images/monsters/Bouftou_Royal.png',
    description: "Au nord des champs d'Astrub, au cœur des paisibles prairies de Tainela, s'étend la cour du Bouftou Royal. Là règne une créature d'une puissance si remarquable que ses congénères lui ont spontanément accordé le titre de roi.",
    spawns: [{ id: 'bouftouRoyal',    weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 },
        { itemId: 'cape_bouffante_royale',     dropRate: 0.01 },
        { itemId: 'boufcoiffe_royale',   dropRate: 0.01 },
        { itemId: 'boufbottes_royales',   dropRate: 0.02 },
        { itemId: 'epee_royale_du_bouftou',     dropRate: 0.02 },
        { itemId: 'anneau_royal_du_bouftou',   dropRate: 0.02 },
        { itemId: 'amulette_royale_du_bouftou', dropRate: 0.02 },
        { itemId: 'ceinture_royale_du_bouftou', dropRate: 0.02 },
        { itemId: 'cuirasse_royale_du_bouftou', dropRate: 0.02 }
    ]
}

areas.donjonAcademieGobs = {
    id: 'donjonAcademieGobs',
    type: 'dungeon',
    keyId: '',
    name: 'Akadémie des Gobs',
    minLevel: 35, maxLevel: 35,
    mobMinLevel: 35, mobMaxLevel: 35,
    background: 'academie_gobs',
    icon: 'images/monsters/Directeur_Grunob.png',
    description: '',
    spawns: [{ id: 'directeurGrunob', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 },
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 45
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonScarafeuille = {
    id: 'donjonScarafeuille',
    type: 'dungeon',
    keyId: 'cleDonjonScarafeuille',
    name: 'La Ruche du Scraraboss Dorée',
    minLevel: 45, maxLevel: 45,
    mobMinLevel: 45, mobMaxLevel: 45,
    background: 'scarafeuilles',
    icon: 'images/monsters/Scarabosse_Doré.png',
    description: "Sous la plaine des Scarafeuilles se cache une immense ruche souterraine gardée par la plus imposante et la plus dorée de toutes les créatures de son espèce : le Scaraboss Dorée. Il est dit que quiconque parviendrait à s'emparer de ses trésors dorés vivrait dans l'opulence pour le reste de sa vie. Aucun aventurier n'est revenu pour le confirmer.",
    spawns: [{ id: 'scarabosse_dore', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',          dropRate: 0.45 },
        { itemId: 'scaracape_doree',        dropRate: 0.02 },
        { itemId: 'scaracoiffe_doree',      dropRate: 0.02 },
        { itemId: 'scarabottes_dorees',      dropRate: 0.02 },
        { itemId: 'anneau_du_scarabosse_dore',      dropRate: 0.02 },
        { itemId: 'amulette_du_scarabosse_dore',    dropRate: 0.02 },
        { itemId: 'scarature_doree',    dropRate: 0.02 },
        { itemId: 'baguette_du_scarabosse_dore',    dropRate: 0.01 }
    ]
}

areas.donjonSquelettes = {
    id: 'donjonSquelettes',
    type: 'dungeon',
    keyId: '',
    name: 'Donjon des Squelettes',
    minLevel: 45, maxLevel: 45,
    mobMinLevel: 45, mobMaxLevel: 45,
    background: 'donjon_squelettes',
    icon: 'images/monsters/Chafer_Rōnin.png',
    description: "Dans les profondeurs d'un ancien cimetière oublié errent les âmes de guerriers incapables de trouver le repos. Les Chafers y poursuivent éternellement leurs combats, guidés par l'honneur perdu du redoutable Chafer Rônin.",
    spawns: [{ id: 'chaferRonin', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 },
    ]
}

areas.donjonTofus = {
    id: 'donjonTofus',
    type: 'dungeon',
    keyId: '',
    name: 'Donjon des Tofus',
    minLevel: 45, maxLevel: 45,
    mobMinLevel: 45, mobMaxLevel: 45,
    background: 'donjon_tofus',
    icon: 'images/monsters/Batofu.png',
    description: "Ce qui n'était autrefois qu'un simple nid est devenu un véritable royaume à plumes. Dans ce dédale de couloirs et de nids géants, les Tofus protègent farouchement leur territoire contre quiconque ose troubler leur tranquillité.",
    spawns: [{ id: 'batofu', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 },
    ]
}

areas.donjonKankreblath = {
    id: 'donjonKankreblath',
    type: 'dungeon',
    keyId: '',
    name: 'Cache de Kankreblath',
    minLevel: 45, maxLevel: 45,
    mobMinLevel: 45, mobMaxLevel: 45,
    background: 'cache_kankreblath',
    icon: 'images/monsters/Kankreblath.png',
    description: '',
    spawns: [{ id: 'kankreblath', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 },
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 55
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonKwakwa = {
    id: 'donjonKwakwa',
    type: 'dungeon',
    keyId: 'cleDonjonKwakwa',
    name: 'Le Nid du Kwakwa',
    minLevel: 55, maxLevel: 55,
    mobMinLevel: 55, mobMaxLevel: 55,
    background: 'kwaks',
    icon: 'images/monsters/Kwakwa.png',
    description: "Au sommet de la Montagne des Kwaks, là où les vents soufflent si fort que même les oiseaux refusent de voler, se trouve le nid du Kwakwa. Cette créature majestueuse règne sur l'ensemble des Kwaks et Kwakères de la région. Rares sont les aventuriers assez courageux pour s'y aventurer, et plus rares encore ceux qui en reviennent avec une plume.",
    spawns: [{ id: 'kwakwa', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'kwakwaffe',         dropRate: 0.02 },
        { itemId: 'kwakwalliance',     dropRate: 0.02 },
        { itemId: 'kwakwanneau',       dropRate: 0.02 },
        { itemId: 'kwakwalame',        dropRate: 0.02 }
    ]
}

areas.donjonBworks = {
    id: 'donjonBworks',
    type: 'dungeon',
    keyId: '',
    name: 'Donjon des Bworks',
    minLevel: 55, maxLevel: 55,
    mobMinLevel: 55, mobMaxLevel: 55,
    background: 'donjon_bworks',
    icon: 'images/monsters/Bworkette.png',
    description: "Au cœur des terres sauvages d'Amakna, les Bworks ont bâti un repaire aussi chaotique que ses habitants. Entre barricades de fortune et inventions douteuses, seule la loi du plus fort règne dans ces tunnels malodorants.",
    spawns: [{ id: 'bworkette', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 },
    ]
}

areas.donjonForgerons = {
    id: 'donjonForgerons',
    type: 'dungeon',
    keyId: '',
    name: 'Donjon des Forgerons',
    minLevel: 55, maxLevel: 55,
    mobMinLevel: 55, mobMaxLevel: 55,
    background: 'donjon_forgerons',
    icon: 'images/monsters/Coffre_des_Forgerons.png',
    description: "Abandonnées depuis des années, les anciennes forges recèlent encore de nombreux trésors. Mais les richesses attirent les convoitises, et le mystérieux Coffre des Forgerons semblent prêts à tout pour protéger leur butin.",
    spawns: [{ id: 'coffreDesForgerons', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 },
    ]
}

areas.donjonHesque = {
    id: 'donjonHesque',
    type: 'dungeon',
    keyId: '',
    name: 'Grotte Hesque',
    minLevel: 55, maxLevel: 55,
    mobMinLevel: 55, mobMaxLevel: 55,
    background: 'grotte_hesque',
    icon: 'images/monsters/Corailleur_Magistral.png',
    description: "Sous les côtes d'Asse se cache un réseau de cavernes coralliennes où prospèrent d'étranges créatures marines. Les Corailleurs y règnent en maîtres, façonnant lentement la roche au gré des marées.",
    spawns: [{ id: 'corailleurMagistral', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 },
    ]
}

areas.donjonLarves = {
    id: 'donjonLarves',
    type: 'dungeon',
    keyId: '',
    name: 'Donjon des Larves',
    minLevel: 55, maxLevel: 55,
    mobMinLevel: 55, mobMaxLevel: 55,
    background: 'donjon_larves',
    icon: 'images/monsters/Shin_Larve.png',
    description: "Dans les entrailles du monde s'étend un immense réseau de galeries creusées par des larves géantes. Au centre de cette ruche souterraine veille la légendaire Shin Larve, mère d'innombrables générations.",
    spawns: [{ id: 'shinLarve', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 },
    ]
}

areas.donjonRefugeSylvestre = {
    id: 'donjonRefugeSylvestre',
    type: 'dungeon',
    keyId: '',
    name: 'Refuge sylvestre',
    minLevel: 55, maxLevel: 55,
    mobMinLevel: 55, mobMaxLevel: 55,
    background: 'refuge_sylvestre',
    icon: 'images/monsters/Rakoopeur.png',
    description: '',
    spawns: [{ id: 'rakoopeur', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 },
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 65
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonBlop = {
    id: 'donjonBlop',
    type: 'dungeon',
    keyId: 'cleDonjonBlop',
    name: 'Le Clos des Blops',
    minLevel: 65, maxLevel: 65,
    mobMinLevel: 65, mobMaxLevel: 65,
    background: 'blop',
    icon: 'images/monsters/Blop_Coco_Royal.png',
    description: "Entre flaques de gelée, végétation déformée et créatures rebondissantes, le Clos des Blops offre un spectacle aussi fascinant que dangereux. Un lieu où la couleur et la bonne humeur dissimulent une menace bien réelle.",
    bossMode: 'any',   // 1 boss aléatoire parmi 4, battre l'un valide le donjon
    spawns: [
        { id: 'blopCocoRoyal',     weight: 25 },
        { id: 'blopGriotteRoyal',  weight: 25 },
        { id: 'blopIndigoRoyal',   weight: 25 },
        { id: 'blopReinetteRoyal', weight: 25 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien',          dropRate: 0.45 },
        { itemId: 'bloptes_reinette_royales',    dropRate: 0.01 },
        { itemId: 'blopanneau_reinette_royal',   dropRate: 0.01 },
        { itemId: 'amublop_reinette_royale',     dropRate: 0.01 },
        { itemId: 'blopture_reinette_royale',    dropRate: 0.01 },
        { itemId: 'bloptes_coco_royales',        dropRate: 0.01 },
        { itemId: 'blopanneau_coco_royal',       dropRate: 0.01 },
        { itemId: 'amublop_coco_royale',         dropRate: 0.01 },
        { itemId: 'blopture_coco_royale',        dropRate: 0.01 },
        { itemId: 'bloptes_griotte_royales',     dropRate: 0.01 },
        { itemId: 'blopanneau_griotte_royal',    dropRate: 0.01 },
        { itemId: 'amublop_griotte_royale',      dropRate: 0.01 },
        { itemId: 'blopture_griotte_royale',     dropRate: 0.01 },
        { itemId: 'bloptes_indigo_royales',      dropRate: 0.01 },
        { itemId: 'blopanneau_indigo_royal',     dropRate: 0.01 },
        { itemId: 'amublop_indigo_royale',       dropRate: 0.01 },
        { itemId: 'blopture_indigo_royale',      dropRate: 0.01 }
    ]
}

areas.donjonWabbit = {
    id: 'donjonWabbit',
    type: 'dungeon',
    keyId: '',
    name: 'Château du Wa Wabbit',
    minLevel: 65, maxLevel: 65,
    mobMinLevel: 65, mobMaxLevel: 65,
    background: 'chateau_wabbit',
    icon: 'images/monsters/Wa_Wabbit.png',
    description: "Pewché au sommet de l'île des Wabbits, ce château extwavagant abwite le célèbwe Wa Wabbit. Dewwièwe son appawence widicule se cache pouwtant un souverain impwévisible entouwé d'une awmée de wabbits dévoués.",
    spawns: [{ id: 'waWabbit', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 },
    ]
}

areas.donjonKanniboul = {
    id: 'donjonKanniboul',
    type: 'dungeon',
    keyId: '',
    name: 'Village Kanniboul',
    minLevel: 65, maxLevel: 65,
    mobMinLevel: 65, mobMaxLevel: 65,
    background: 'village_kanniboul',
    icon: 'images/monsters/Kanniboul_Ebil.png',
    description: "Perdu dans la jungle de Moon, le village des Kannibouls demeure inaccessible aux étrangers. Les guerriers de la tribu y vénèrent d'anciennes traditions et accueillent rarement les visiteurs avec bienveillance.",
    spawns: [{ id: 'kannibouleEbil', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 },
    ]
}

areas.donjonOtomaj = {
    id: 'donjonOtomaj',
    type: 'dungeon',
    keyId: '',
    name: "Cale de l'Arche d'Otomaï",
    minLevel: 65, maxLevel: 65,
    mobMinLevel: 65, mobMaxLevel: 65,
    background: 'cale_otomaj',
    icon: 'images/monsters/Gourlo_le_Terrible.png',
    description: "Ancien navire échoué au large de l'île d'Otomaï, l'Arche est devenue le refuge du terrible pirate Gourlo. Les marins racontent encore que ses trésors maudits reposent quelque part dans ses cales inondées.",
    spawns: [{ id: 'gourloLeТerrible', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 },
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 75
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonMantiscore = {
    id: 'donjonMantiscore',
    type: 'dungeon',
    keyId: 'cleDonjonMantiscore',
    name: "Cimetière des Mastodontes",
    minLevel: 75, maxLevel: 75,
    mobMinLevel: 75, mobMaxLevel: 75,
    background: 'desertMantiscore',
    icon: 'images/monsters/Mantiscore.png',
    description: "Au cœur du désert brûlant de Saharach, là où les Dunes des Ossements s'étendent à perte de vue, repose un lieu oublié du monde des vivants : le Cimetière des Mastodontes. Ces terres portent le souvenir d'une époque révolue, lorsque d'immenses créatures arpentant l'île s'effondraient ici, laissant derrière elles des squelettes titanesques enfouis sous le sable.",
    spawns: [{ id: 'mantiscore', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'gelano', dropRate: 0.03 }
    ]
}

areas.donjonCraqueleurs = {
    id: 'donjonCraqueleurs',
    type: 'dungeon',
    keyId: '',
    name: 'Pitons Rocheux des Craqueleurs',
    minLevel: 75, maxLevel: 75,
    mobMinLevel: 75, mobMaxLevel: 75,
    background: 'pitons_craqueleurs',
    icon: 'images/monsters/Craqueleur_Légendaire.png',
    description: "Au milieu d'impressionnants monolithes de pierre vivent les Craqueleurs, créatures nées des profondeurs de la terre. Dominant ces géants minéraux, le Craqueleur Légendaire incarne la force brute des montagnes d'Amakna.",
    spawns: [{ id: 'craqueleurLegendaire', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 },
    ]
}

areas.donjonBrumen = {
    id: 'donjonBrumen',
    type: 'dungeon',
    keyId: '',
    name: 'Laboratoire de Brumen Tinctorias',
    minLevel: 75, maxLevel: 75,
    mobMinLevel: 75, mobMaxLevel: 75,
    background: 'labo_brumen',
    icon: 'images/monsters/Nelween.png',
    description: "Ancien repaire du célèbre bandit Brumen Tinctorias, ce laboratoire renferme encore les vestiges de ses expériences et de ses méfaits. Les lieux sont aujourd'hui hantés par les créatures et les inventions laissées à l'abandon.",
    spawns: [{ id: 'nelween', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 },
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 85
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonDraegnerys = {
    id: 'donjonDraegnerys',
    type: 'dungeon',
    keyId: 'cleDonjonDraegnerys',
    name: "L'épreuve' de Draegnerys",
    minLevel: 85, maxLevel: 85,
    mobMinLevel: 85, mobMaxLevel: 85,
    background: 'montagneDragoeuf',
    icon: 'img/monstres/sprites/Draegnerys.png',
    description: "Sur la presqu'île des Dragoeufs, au cœur des terres fumantes où la roche semble encore porter l'empreinte des anciens dragons, s'élève l'Épreuve de Draegnerys. Ici, chaque pas est une mise à l'épreuve, chaque couloir un test imposé par la gardienne des lieux.",
    spawns: [{ id: 'draegnerys', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'cape_de_shika',     dropRate: 0.02},
        { itemId: 'shikacoiffe',     dropRate: 0.02},
        { itemId: 'epis_de_shika',     dropRate: 0.02}
    ]
}

areas.donjonTerrierWabbit = {
    id: 'donjonTerrierWabbit',
    type: 'dungeon',
    keyId: '',
    name: 'Terrier du Wa Wabbit',
    minLevel: 85, maxLevel: 85,
    mobMinLevel: 85, mobMaxLevel: 85,
    background: 'terrier_wabbit',
    icon: 'images/monsters/Wa_Wobot.png',
    description: "Sous le château woyal s'étend un vaste wéseau de galewies où les Wabbits ont développé leuws plus étwanges inventions. Au cœuw de ce labywinthe mécanique veille le wedoutable Wa Wobot, pwotecteur du woyaume mais aussi du wéputé Dofus Cawotte.",
    spawns: [{ id: 'waWobot', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 },
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 95
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonAbraknydeAncestral = {
    id: 'donjonAbraknydeAncestral',
    type: 'dungeon',
    keyId: 'cleDonjonAbraknydeAncestral',
    name: "Domaine Ancestral",
    minLevel: 95, maxLevel: 95,
    mobMinLevel: 95, mobMaxLevel: 95,
    background: 'foretAbraknyde',
    icon: 'images/monsters/Abraknyde_Ancestral.png',
    description: "Dans le Domaine Ancestral, la forêt n'est pas un décor. Elle est vivante... et elle vous observe.",
    spawns: [{ id: 'abraknydeAncestral', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'abracapa_ancestrale',     dropRate: 0.01},
        { itemId: 'abracaska_ancestral',     dropRate: 0.01},
        { itemId: 'protege_tibias_ancestraux',     dropRate: 0.01},
        { itemId: 'anneau_ancestral',     dropRate: 0.01},
        { itemId: 'torque_ancestral',   dropRate: 0.01},
        { itemId: 'abrature_ancestrale',   dropRate: 0.01}
    ]
}

areas.donjonKoulosse = {
    id: 'donjonKoulosse',
    type: 'dungeon',
    keyId: '',
    name: 'Caverne du Koulosse',
    minLevel: 95, maxLevel: 95,
    mobMinLevel: 95, mobMaxLevel: 95,
    background: 'caverne_koulosse',
    icon: 'images/monsters/Koulosse.png',
    description: "Caché dans les montagnes koalaks, cette immense grotte abrite le légendaire Koulosse. Mi-rasta, mi-divinité aux yeux de certains indigènes, il règne sur une jungle aussi mystérieuse que dangereuse. Attention aux fumées qui pourraient vous faire tourner la tête.",
    spawns: [{ id: 'koulosse', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 },
    ]
}

areas.donjonReineNyee = {
    id: 'donjonReineNyee',
    type: 'dungeon',
    keyId: '',
    name: 'Antre de la Reine Nyée',
    minLevel: 95, maxLevel: 95,
    mobMinLevel: 95, mobMaxLevel: 95,
    background: 'antre_reine_nyee',
    icon: 'images/monsters/Reine_Nyée.png',
    description: '',
    spawns: [{ id: 'reineNyee', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 },
    ]
}

areas.donjonChouque = {
    id: 'donjonChouque',
    type: 'dungeon',
    keyId: '',
    name: 'Bateau du Chouque',
    minLevel: 95, maxLevel: 95,
    mobMinLevel: 95, mobMaxLevel: 95,
    background: 'bateau_chouque',
    icon: 'images/monsters/Le_Chouque.png',
    description: '',
    spawns: [{ id: 'leChouque', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 },
    ]
}

areas.donjonMagikRiktus = {
    id: 'donjonMagikRiktus',
    type: 'dungeon',
    keyId: '',
    name: 'Chapiteau des Magik Riktus',
    minLevel: 95, maxLevel: 95,
    mobMinLevel: 95, mobMaxLevel: 95,
    background: 'chapiteau_magik_riktus',
    icon: 'images/monsters/Choudini.png',
    description: '',
    spawns: [{ id: 'choudini', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 },
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 105
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonDragonCochon = {
    id: 'donjonDragonCochon',
    type: 'dungeon',
    keyId: 'cleDonjonDragonCochon',
    name: 'Antre du Dragon Cochon',
    minLevel: 105, maxLevel: 105,
    mobMinLevel: 105, mobMaxLevel: 105,
    background: 'fermeDragonCochon',
    icon: 'images/monsters/Dragon_Cochon.png',
    description: "Au cœur du Territoire des Porcos se cache un dédale de galeries nauséabondes où résonnent grognements et rugissements. C'est ici que siège le Dragon Cochon, une créature contre-nature née de la fusion improbable entre la férocité d'un dragon et la brutalité d'un porc géant.",
    spawns: [{ id: 'dragonCochon', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',    dropRate: 0.40 },
        { itemId: 'cape_du_dragon_cochon',   dropRate: 0.02 },
        { itemId: 'coiffe_du_dragon_cochon', dropRate: 0.02 },
        { itemId: 'kaiser',   dropRate: 0.02 },
        { itemId: 'Dofus_Turquoise',      dropRate: 0.0005}
    ]
}

areas.donjonMeulou = {
    id: 'donjonMeulou',
    type: 'dungeon',
    keyId: '',
    name: 'Tanière du Meulou',
    minLevel: 105, maxLevel: 105,
    mobMinLevel: 105, mobMaxLevel: 105,
    background: 'taniere_meulou',
    icon: 'images/monsters/Meulou.png',
    description: "Dans les profondeurs de la forêt, les hurlements du Meulou résonnent à travers les arbres. Cette créature maudite, à mi-chemin entre l'homme et le loup, traque sans relâche ceux qui osent pénétrer sur son territoire.",
    spawns: [{ id: 'meulou', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
        { itemId: 'Dofus_Emeraude',      dropRate: 0.0005}
    ]
}

areas.donjonRasboul = {
    id: 'donjonRasboul',
    type: 'dungeon',
    keyId: '',
    name: 'Goulet du Rasboul',
    minLevel: 105, maxLevel: 105,
    mobMinLevel: 105, mobMaxLevel: 105,
    background: 'goulet_rasboul',
    icon: 'images/monsters/Silf_le_Rasboul_Majeur.png',
    description: "Au cœur des plaines d'Otomaï se trouve le territoire du Rasboul Majeur. Ce gigantesque insecte ou que sais-je règne sur ces plaines et défend agilement son royaume au prix de la vie de ses invocations.",
    spawns: [{ id: 'silfLeRasboulMajeur', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

areas.donjonDramak = {
    id: 'donjonDramak',
    type: 'dungeon',
    keyId: '',
    name: 'Théâtre de Dramak',
    minLevel: 105, maxLevel: 105,
    mobMinLevel: 105, mobMaxLevel: 105,
    background: 'theatre_dramak',
    icon: 'images/monsters/Maître_des_Pantins.png',
    description: '',
    spawns: [{ id: 'maitreDePantins', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

areas.donjonMoon = {
    id: 'donjonMoon',
    type: 'dungeon',
    keyId: '',
    name: 'Arbre de Moon',
    minLevel: 105, maxLevel: 105,
    mobMinLevel: 105, mobMaxLevel: 105,
    background: 'arbre_moon',
    icon: 'images/monsters/Moon.png',
    description: '',
    spawns: [{ id: 'moon', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

areas.donjonKharnozor = {
    id: 'donjonKharnozor',
    type: 'dungeon',
    keyId: '',
    name: 'Repaire du Kharnozor',
    minLevel: 105, maxLevel: 105,
    mobMinLevel: 105, mobMaxLevel: 105,
    background: 'repaire_kharnozor',
    icon: 'images/monsters/Kharnozor.png',
    description: '',
    spawns: [{ id: 'kharnozor', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 115
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonCorbac = {
    id: 'donjonCorbac',
    type: 'dungeon',
    keyId: '',
    name: 'Bibliothèque du Maître Corbac',
    minLevel: 115, maxLevel: 115,
    mobMinLevel: 115, mobMaxLevel: 115,
    background: 'bibliotheque_corbac',
    icon: 'images/monsters/Maître_Corbac.png',
    description: "Derrière les rayonnages poussiéreux de cette bibliothèque oubliée se cache le domaine du Maître Corbac. Savant, collectionneur et manipulateur, il protège jalousement les connaissances accumulées au fil des siècles.",
    spawns: [{ id: 'maitreCorbac', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
        { itemId: 'Dofus_Pourpre',      dropRate: 0.0005}
    ]
}

areas.donjonRatBlanc = {
    id: 'donjonRatBlanc',
    type: 'dungeon',
    keyId: '',
    name: 'Garde-manger du Rat Blanc',
    minLevel: 115, maxLevel: 115,
    mobMinLevel: 115, mobMaxLevel: 115,
    background: 'gardemanger_rat',
    icon: 'images/monsters/Rat_Blanc.png',
    description: "Dans les égouts de Bonta, le Rat Blanc a bâti un véritable empire souterrain. Ses fidèles accumulent vivres et richesses, faisant de ce garde-manger l'un des lieux les plus convoités des profondeurs.",
    spawns: [{ id: 'ratBlanc', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

areas.donjonRatNoir = {
    id: 'donjonRatNoir',
    type: 'dungeon',
    keyId: '',
    name: 'Sousouricière du Rat Noir',
    minLevel: 115, maxLevel: 115,
    mobMinLevel: 115, mobMaxLevel: 115,
    background: 'souriciere_rat',
    icon: 'images/monsters/Rat_Noir.png',
    description: "Sous les rues de Brâkmar s'étend le repaire du Rat Noir et de sa meute. Rusés et impitoyables, ces rongeurs ont transformé les souterrains en un royaume où règnent l'ombre et la maladie.",
    spawns: [{ id: 'ratNoir', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

areas.donjonDamadrya = {
    id: 'donjonDamadrya',
    type: 'dungeon',
    keyId: '',
    name: 'Bambusaie de Damadrya',
    minLevel: 115, maxLevel: 115,
    mobMinLevel: 115, mobMaxLevel: 115,
    background: 'bambusaie_damadrya',
    icon: 'images/monsters/Damadrya.png',
    description: '',
    spawns: [{ id: 'damadrya', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
        { itemId: 'Dofus_Domakuro',      dropRate: 0.0005}
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 125
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonMinotoror = {
    id: 'donjonMinotoror',
    type: 'dungeon',
    keyId: '',
    name: 'Centre du Labyrinthe du Minotoror',
    minLevel: 125, maxLevel: 125,
    mobMinLevel: 125, mobMaxLevel: 125,
    background: 'labyrinthe_minotoror',
    icon: 'images/monsters/Minotoror.png',
    description: "Depuis des siècles, le Minotoror attend les aventuriers assez courageux pour traverser son immense labyrinthe. Peu nombreux sont ceux qui atteignent son sanctuaire, et plus rares encore ceux qui en ressortent vivants.",
    spawns: [{ id: 'minotoror', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

areas.donjonCrocabulia = {
    id: 'donjonCrocabulia',
    type: 'dungeon',
    keyId: '',
    name: 'Antre de Crocabulia',
    minLevel: 125, maxLevel: 125,
    mobMinLevel: 125, mobMaxLevel: 125,
    background: 'antre_crocabulia',
    icon: 'images/monsters/Crocabulia.png',
    description: "Au plus profond des montagnes dort Crocabulia, l'une des dernières dragonnes du Monde des Douze. Gardienne de trésors inestimables, elle n'accorde aucune pitié aux intrus. Bien qu'il court une rumeur concernant un sadida s'y étant frotté plus d'un millier de fois, mais tout ça n'est que rumeurs... n'est ce pas ?",
    spawns: [{ id: 'crocabulia', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
        { itemId: 'Dofus_Vulbis',      dropRate: 0.0005}
    ]
}

areas.donjonTofulaillerRoyal = {
    id: 'donjonTofulaillerRoyal',
    type: 'dungeon',
    keyId: '',
    name: 'Tofulailler Royal',
    minLevel: 125, maxLevel: 125,
    mobMinLevel: 125, mobMaxLevel: 125,
    background: 'tofulailler_royal',
    icon: 'images/monsters/Tofu_Royal.png',
    description: "Des milliers de Tofus s'agitent dans ce gigantesque nid dirigé par leur souverain. Malgré son apparence inoffensive et plutot mignonne, le Tofu Royal défend farouchement sa couvée.",
    spawns: [{ id: 'tofuRoyal', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

areas.donjonRoyalmouth = {
    id: 'donjonRoyalmouth',
    type: 'dungeon',
    keyId: '',
    name: 'Serre du Royalmouth',
    minLevel: 125, maxLevel: 125,
    mobMinLevel: 125, mobMaxLevel: 125,
    background: 'serre_royalmouth',
    icon: 'images/monsters/Royalmouth.png',
    description: "Dans les plaines glacées de Frigost, le Royalmouth règne sur une meute de créatures adaptées au froid extrême. Sa puissance et son endurance en font l'un des premiers grands dangers de l'île.",
    spawns: [{ id: 'royalmouth', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

areas.donjonSkeunk = {
    id: 'donjonSkeunk',
    type: 'dungeon',
    keyId: '',
    name: 'Repaire de Skeunk',
    minLevel: 125, maxLevel: 125,
    mobMinLevel: 125, mobMaxLevel: 125,
    background: 'repaire_skeunk',
    icon: 'images/monsters/Skeunk.png',
    description: "Ancien disciple du dieu Sadida, Skeunk s'est isolé dans les profondeurs de la forêt avec ses poupées. Les aventuriers qui s'approchent de son domaine découvrent rapidement que sa folie n'a d'égale que sa puissance.",
    spawns: [{ id: 'skeunk', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 135
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonBlopMulticolore = {
    id: 'donjonBlopMulticolore',
    type: 'dungeon',
    keyId: '',
    name: 'Antre du Blop Multicolore Royal',
    minLevel: 135, maxLevel: 135,
    mobMinLevel: 135, mobMaxLevel: 135,
    background: 'blop',
    icon: 'images/monsters/Blop_Multicolore_Royal.png',
    description: "Au centre du Clos des Blops réside une créature aussi étrange que redoutable. Né de l'union des différentes lignées de Blops, le Blop Multicolore Royal est le maître incontesté de ce royaume gélatineux. Il vous en fera voir de toutes les couleurs.",
    spawns: [{ id: 'blopMulticoloreRoyal', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

areas.donjonHauteTruche = {
    id: 'donjonHauteTruche',
    type: 'dungeon',
    keyId: '',
    name: 'Volière de la Haute Truche',
    minLevel: 135, maxLevel: 135,
    mobMinLevel: 135, mobMaxLevel: 135,
    background: 'voliere_haute_truche',
    icon: 'images/monsters/Haute_Truche.png',
    description: '',
    spawns: [{ id: 'hauteTruche', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

areas.donjonElPiko = {
    id: 'donjonElPiko',
    type: 'dungeon',
    keyId: '',
    name: "Caverne d'El Piko",
    minLevel: 135, maxLevel: 135,
    mobMinLevel: 135, mobMaxLevel: 135,
    background: 'caverne_el_piko',
    icon: 'images/monsters/El_Piko.png',
    description: '',
    spawns: [{ id: 'elPiko', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

areas.donjonDameEaux = {
    id: 'donjonDameEaux',
    type: 'dungeon',
    keyId: '',
    name: 'Vallée de la Dame des eaux',
    minLevel: 135, maxLevel: 135,
    mobMinLevel: 135, mobMaxLevel: 135,
    background: 'vallee_dame_eaux',
    icon: 'images/monsters/Nagate.png',
    description: '',
    spawns: [{ id: 'nagate', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
        { itemId: 'Dofus_Domakuro',      dropRate: 0.0005}
    ]
}

areas.donjonTanukoi = {
    id: 'donjonTanukoi',
    type: 'dungeon',
    keyId: '',
    name: 'Atelier du Tanukouï San',
    minLevel: 135, maxLevel: 135,
    mobMinLevel: 135, mobMaxLevel: 135,
    background: 'atelier_tanukoi',
    icon: 'images/monsters/Tanukouï_San.png',
    description: '',
    spawns: [{ id: 'tanukouiSan', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
        { itemId: 'Dofus_Domakuro',      dropRate: 0.0005}
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 145
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonCheneMou = {
    id: 'donjonCheneMou',
    type: 'dungeon',
    keyId: '',
    name: 'Clairière du Chêne Mou',
    minLevel: 145, maxLevel: 145,
    mobMinLevel: 145, mobMaxLevel: 145,
    background: 'clairiere_chene_mou',
    icon: 'images/monsters/Chêne_Mou.png',
    description: "Autrefois sage parmi les siens, le Chêne Mou fut corrompu par une magie ancienne qui le plongea dans la folie. Depuis, il règne sur une partie de la Forêt des Abraknydes, transformant chaque intrus en ennemi de la nature.",
    spawns: [{ id: 'cheneMou', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
        { itemId: 'Dofus_Turquoise',      dropRate: 0.0005}
    ]
}

areas.donjonMansot = {
    id: 'donjonMansot',
    type: 'dungeon',
    keyId: '',
    name: 'Excavation du Mansot Royal',
    minLevel: 145, maxLevel: 145,
    mobMinLevel: 145, mobMaxLevel: 145,
    background: 'excavation_mansot',
    icon: 'images/monsters/Mansot_Royal.png',
    description: "Sur le Lac gelé de Frigost, les Mansots ont creusé un vaste réseau de galeries sous la glace. Leur souverain, le Mansot Royal, dirige son peuple avec une autorité aussi glaciale que son royaume.",
    spawns: [{ id: 'mansotRoyal', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

areas.donjonTynril = {
    id: 'donjonTynril',
    type: 'dungeon',
    keyId: '',
    name: 'Laboratoire du Tynril',
    minLevel: 145, maxLevel: 145,
    mobMinLevel: 145, mobMaxLevel: 145,
    background: 'labo_tynril',
    icon: 'images/monsters/Tynril_Consterné.png',
    description: "Au cœur de l'île d'Otomaï subsistent les vestiges d'expériences biologiques menées sans aucune limite morale. Les Tynrils, créatures issues de ces manipulations, continuent d'errer dans le laboratoire en quête de nouvelles victimes.",
    bossMode: 'any',
    spawns: [
        { id: 'tynrilConsterne',    weight: 25 },
        { id: 'tynrilDeconcerte',   weight: 25 },
        { id: 'tynrilPerfide',      weight: 25 },
        { id: 'tynrilAhuri',        weight: 25 },
    ],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

areas.donjonDojoVent = {
    id: 'donjonDojoVent',
    type: 'dungeon',
    keyId: '',
    name: 'Dojo du Vent',
    minLevel: 145, maxLevel: 145,
    mobMinLevel: 145, mobMaxLevel: 145,
    background: 'dojo_vent',
    icon: 'images/monsters/Shihan.png',
    description: '',
    bossMode: 'any',
    spawns: [
        { id: 'shihan', weight: 50 },
        { id: 'hanshi',  weight: 50 },
    ],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
        { itemId: 'Dofus_Domakuro',      dropRate: 0.0005}
    ]
}

areas.donjonFouxArtifice = {
    id: 'donjonFouxArtifice',
    type: 'dungeon',
    keyId: '',
    name: "Fabrique de foux d'artifice",
    minLevel: 145, maxLevel: 145,
    mobMinLevel: 145, mobMaxLevel: 145,
    background: 'fabrique_foux_artifice',
    icon: 'images/monsters/Founoroshi.png',
    description: '',
    spawns: [{ id: 'founoroshi', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
        { itemId: 'Dofus_Domakuro',      dropRate: 0.0005}
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 155
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonSphincter = {
    id: 'donjonSphincter',
    type: 'dungeon',
    keyId: '',
    name: 'Repaire de Sphincter Cell',
    minLevel: 155, maxLevel: 155,
    mobMinLevel: 155, mobMaxLevel: 155,
    background: 'repaire_sphincter',
    icon: 'images/monsters/Sphincter_Cell.png',
    description: '',
    spawns: [{ id: 'sphincterCell', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

areas.donjonGrolandais = {
    id: 'donjonGrolandais',
    type: 'dungeon',
    keyId: '',
    name: 'Épave du Grolandais violent',
    minLevel: 155, maxLevel: 155,
    mobMinLevel: 155, mobMaxLevel: 155,
    background: 'epave_grolandais',
    icon: 'images/monsters/Ben_le_Ripate.png',
    description: "Le navire de Ben le Ripate gît désormais prisonnier des glaces de Frigost. Mais même immobilisé, le célèbre pirate continue de terroriser les mers du nord grâce à son équipage de corsaires et de pillards. Gare à son apparence de fantôme, son crochet lui, est bien réel.",
    spawns: [{ id: 'benLeRipate', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

areas.donjonTertreSommeil = {
    id: 'donjonTertreSommeil',
    type: 'dungeon',
    keyId: '',
    name: 'Tertre du long sommeil',
    minLevel: 155, maxLevel: 155,
    mobMinLevel: 155, mobMaxLevel: 155,
    background: 'tertre_long_sommeil',
    icon: 'images/monsters/Hell_Mina.png',
    description: '',
    spawns: [{ id: 'hellMina', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
        { itemId: 'Dofus_Emeraude',      dropRate: 0.0005}
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 165
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonObsidiantre = {
    id: 'donjonObsidiantre',
    type: 'dungeon',
    keyId: '',
    name: "Hypogée de l'Obsidiantre",
    minLevel: 165, maxLevel: 165,
    mobMinLevel: 165, mobMaxLevel: 165,
    background: 'hypogee_obsidiantre',
    icon: 'images/monsters/Obsidiantre.png',
    description: "Sous les terres volcaniques de Frigost sommeille l'Obsidiantre, une créature née de la lave et de la roche en fusion. Son réveil menace constamment l'équilibre fragile entre glace et feu qui règne sur l'île.",
    spawns: [{ id: 'obsidiantre', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

areas.donjonKimbo = {
    id: 'donjonKimbo',
    type: 'dungeon',
    keyId: '',
    name: 'Canopée du Kimbo',
    minLevel: 165, maxLevel: 165,
    mobMinLevel: 165, mobMaxLevel: 165,
    background: 'canopee_kimbo',
    icon: 'images/monsters/Kimbo.png',
    description: "Au sommet des arbres géants de l'île d'Otomaï vit le Kimbo, gardien ancestral des lieux. Sa maîtrise de la flore et sa connaissance des secrets de l'île en font un adversaire aussi sage que redoutable.",
    spawns: [{ id: 'kimbo', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

areas.donjonMinotot = {
    id: 'donjonMinotot',
    type: 'dungeon',
    keyId: '',
    name: 'Salle du Minotot',
    minLevel: 165, maxLevel: 165,
    mobMinLevel: 165, mobMaxLevel: 165,
    background: 'labyrinthe_minotoror',
    icon: 'images/monsters/Minotot.png',
    description: "Plus érudit que son cousin Minotoror, le Minotot règne au plus profond du légendaire labyrinthe. Les aventuriers qui parviennent jusqu'à lui doivent affronter autant son intelligence que sa puissance. On dit qu'il aime tellement les oeufs de tofu, qu'il en collectionnerait un bien particulier, infusé de pouvoirs magiques.",
    spawns: [{ id: 'minotot', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
        { itemId: 'Dofus_Pourpre',      dropRate: 0.0005}
    ]
}

areas.donjonKanigroula = {
    id: 'donjonKanigroula',
    type: 'dungeon',
    keyId: '',
    name: 'Grotte de Kanigroula',
    minLevel: 165, maxLevel: 165,
    mobMinLevel: 165, mobMaxLevel: 165,
    background: 'grotte_kanigroula',
    icon: 'images/monsters/Kanigroula.png',
    description: '',
    spawns: [{ id: 'kanigroula', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

areas.donjonShogunTofugawa = {
    id: 'donjonShogunTofugawa',
    type: 'dungeon',
    keyId: '',
    name: 'Tombe du Shogun Tofugawa',
    minLevel: 165, maxLevel: 165,
    mobMinLevel: 165, mobMaxLevel: 165,
    background: 'tombe_shogun',
    icon: 'images/monsters/Shogun_Tofugawa.png',
    description: '',
    spawns: [{ id: 'shogunTofugawa', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
        { itemId: 'Dofus_Dorigami',      dropRate: 0.0005}
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 175
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonGivrefoux = {
    id: 'donjonGivrefoux',
    type: 'dungeon',
    keyId: '',
    name: 'Tanière Givrefoux',
    minLevel: 175, maxLevel: 175,
    mobMinLevel: 175, mobMaxLevel: 175,
    background: 'taniere_givrefoux',
    icon: 'images/monsters/Tengu_Givrefoux.png',
    description: "Dans les montagnes enneigées de Frigost, les Givrefoux perpétuent d'antiques traditions héritées d'un passé oublié. Leur chef, le Tengu Givrefoux, veille jalousement sur son clan et ses secrets.",
    spawns: [{ id: 'tenguGivrefoux', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

areas.donjonPereVer = {
    id: 'donjonPereVer',
    type: 'dungeon',
    keyId: '',
    name: 'Boyau du Père Ver',
    minLevel: 175, maxLevel: 175,
    mobMinLevel: 175, mobMaxLevel: 175,
    background: 'boyau_pere_ver',
    icon: 'images/monsters/Père_Ver.png',
    description: '',
    spawns: [{ id: 'pereVer', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

areas.donjonDemeureEsprits = {
    id: 'donjonDemeureEsprits',
    type: 'dungeon',
    keyId: '',
    name: 'Demeure des Esprits',
    minLevel: 175, maxLevel: 175,
    mobMinLevel: 175, mobMaxLevel: 175,
    background: 'demeure_esprits',
    icon: 'images/monsters/Koumiho.png',
    description: '',
    spawns: [{ id: 'koumiho', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
        { itemId: 'Dofus_Dorigami',      dropRate: 0.0005}
    ]
}

areas.donjonSupervizoeuf = {
    id: 'donjonSupervizoeuf',
    type: 'dungeon',
    keyId: '',
    name: 'Poste de contrôle du Supervizœuf',
    minLevel: 175, maxLevel: 175,
    mobMinLevel: 175, mobMaxLevel: 175,
    background: 'poste_supervizoeuf',
    icon: 'images/monsters/Supervizœuf.png',
    description: '',
    spawns: [{ id: 'supervizoeuf', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 185
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonBworker = {
    id: 'donjonBworker',
    type: 'dungeon',
    keyId: '',
    name: 'Grotte du Bworker',
    minLevel: 185, maxLevel: 185,
    mobMinLevel: 185, mobMaxLevel: 185,
    background: 'grotte_bworker',
    icon: 'images/monsters/Bworker.png',
    description: "Fruit d'expériences interdites menées sur les Bworks, le Bworker est devenu une abomination d'une puissance terrifiante. Son influence s'étend sur toutes les tribus voisines qui le considèrent comme un véritable dieu vivant.",
    spawns: [{ id: 'bworker', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

areas.donjonOugah = {
    id: 'donjonOugah',
    type: 'dungeon',
    keyId: '',
    name: 'Temple du Grand Ougah',
    minLevel: 185, maxLevel: 185,
    mobMinLevel: 185, mobMaxLevel: 185,
    background: 'temple_ougah',
    icon: 'images/monsters/Ougah.png',
    description: "Au cœur de la forêt pétrifiée repose le temple du Grand Ougah, chef spirituel des Fungus. Les spores et champignons qui envahissent les lieux semblent obéir à sa seule volonté.",
    spawns: [{ id: 'ougah', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

areas.donjonKolosso = {
    id: 'donjonKolosso',
    type: 'dungeon',
    keyId: '',
    name: 'Cavernes du Kolosso',
    minLevel: 185, maxLevel: 185,
    mobMinLevel: 185, mobMaxLevel: 185,
    background: 'cavernes_kolosso',
    icon: 'images/monsters/Kolosso.png',
    description: "Ancien disciple du Comte Harebourg, le Professeur Xa poursuit encore ses recherches sur le temps et les dimensions. Ses expériences ont transformé les créatures qui vivaient autrefoit dans ces cavernes.",
    bossMode: 'any',
    spawns: [
        { id: 'kolosso',       weight: 50 },
        { id: 'professeurXa',  weight: 50 },
    ],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

areas.donjonSakai = {
    id: 'donjonSakai',
    type: 'dungeon',
    keyId: '',
    name: 'Donjon de la mine de Sakaï',
    minLevel: 185, maxLevel: 185,
    mobMinLevel: 185, mobMaxLevel: 185,
    background: 'mine_sakai',
    icon: 'images/monsters/Grolloum.png',
    description: "Abandonnée depuis longtemps par les mineurs, la mine de Sakaï est devenue le territoire du redoutable Grolloum. Entre galeries effondrées et créatures sauvages, les richesses enfouies attirent toujours les aventuriers les plus téméraires.",
    spawns: [{ id: 'grolloum', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

areas.donjonKorriandre = {
    id: 'donjonKorriandre',
    type: 'dungeon',
    keyId: '',
    name: 'Antre du Korriandre',
    minLevel: 185, maxLevel: 185,
    mobMinLevel: 185, mobMaxLevel: 185,
    background: 'antre_korriandre',
    icon: 'images/monsters/Korriandre.png',
    description: '',
    spawns: [{ id: 'korriandre', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 195
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonGloursons = {
    id: 'donjonGloursons',
    type: 'dungeon',
    keyId: '',
    name: 'Antichambre des Gloursons',
    minLevel: 195, maxLevel: 195,
    mobMinLevel: 195, mobMaxLevel: 195,
    background: 'antichambre_gloursons',
    icon: 'images/monsters/Glourséleste.png',
    description: "Aux portes des remparts enneigés au sommet du Mont Torrideau se dresse une ruches au dimensions plutôt impressionnantes : la ruche du Glourséleste. Un royaume où prospèrent des créatures étranges, nées de l'évolution des aibeilles endémiques de Frigost. Leur maître règne sur cet écosystème unique, fruit d'années d'adaptation au froid.",
    spawns: [{ id: 'gourseleste', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

areas.donjonOmbre = {
    id: 'donjonOmbre',
    type: 'dungeon',
    keyId: '',
    name: "Pyramide d'Ombre",
    minLevel: 195, maxLevel: 195,
    mobMinLevel: 200, mobMaxLevel: 200,
    background: 'pyramide_ombre',
    icon: 'images/monsters/Ombre.png',
    description: '',
    spawns: [{ id: 'ombre', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

areas.donjonRazof = {
    id: 'donjonRazof',
    type: 'dungeon',
    keyId: '',
    name: 'Camp du Comte Razof',
    minLevel: 195, maxLevel: 195,
    mobMinLevel: 200, mobMaxLevel: 200,
    background: 'camp_razof',
    icon: 'images/monsters/Comte_Razof.png',
    description: '',
    spawns: [{ id: 'comteRazof', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

areas.donjonBastionMarteaux = {
    id: 'donjonBastionMarteaux',
    type: 'dungeon',
    keyId: '',
    name: 'Bastion des Marteaux-Aigris',
    minLevel: 195, maxLevel: 195,
    mobMinLevel: 200, mobMaxLevel: 200,
    background: 'bastion_marteaux',
    icon: 'images/monsters/Barbéryl_Clochecuivre.png',
    description: '',
    spawns: [{ id: 'barberyClocheCuivre', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 200
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonSylargh = {
    id: 'donjonSylargh',
    type: 'dungeon',
    keyId: '',
    name: 'Transporteur de Sylargh',
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'transporteur_sylargh',
    icon: 'images/monsters/Sylargh.png',
    description: '',
    spawns: [{ id: 'sylargh', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.35 },
        { itemId: 'Dofus_des_Glaces',      dropRate: 0.0005}
    ]
}

areas.donjonKlime = {
    id: 'donjonKlime',
    type: 'dungeon',
    keyId: '',
    name: 'Salons privés de Klime',
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'salons_klime',
    icon: 'images/monsters/Klime.png',
    description: '',
    spawns: [{ id: 'klime', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.35 },
        { itemId: 'Dofus_des_Glaces',      dropRate: 0.0005}
    ]
}

areas.donjonMissizFrizz = {
    id: 'donjonMissizFrizz',
    type: 'dungeon',
    keyId: '',
    name: 'Forgefroide de Missiz Frizz',
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'forgefroide_missiz_frizz',
    icon: 'images/monsters/Missiz_Frizz.png',
    description: '',
    spawns: [{ id: 'missizFrizz', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.35 },
        { itemId: 'Dofus_des_Glaces',      dropRate: 0.0005}
    ]
}

areas.donjonNileza = {
    id: 'donjonNileza',
    type: 'dungeon',
    keyId: '',
    name: 'Laboratoire de Nileza',
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'laboratoire_nileza',
    icon: 'images/monsters/Nileza.png',
    description: '',
    spawns: [{ id: 'nileza', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.35 },
        { itemId: 'Dofus_des_Glaces',      dropRate: 0.0005}
    ]
}

areas.donjonHarebourg = {
    id: 'donjonHarebourg',
    type: 'dungeon',
    keyId: '',
    name: 'Donjon du Comte Harebourg',
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'donjon_harebourg',
    icon: 'images/monsters/Comte_Harebourg.png',
    description: '',
    spawns: [{ id: 'comteHarebourg', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.35 },
        { itemId: 'Dofus_des_Glaces',      dropRate: 0.0005}
    ]
}

areas.donjonMerkator = {
    id: 'donjonMerkator',
    type: 'dungeon',
    keyId: '',
    name: 'Aquadôme de Merkator',
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'aquadome_merkator',
    icon: 'images/monsters/Merkator.png',
    description: '',
    spawns: [{ id: 'merkator', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.35 },
        { itemId: 'Dofus_Abyssal',      dropRate: 0.0005}
    ]
}

areas.donjonBaleine = {
    id: 'donjonBaleine',
    type: 'dungeon',
    keyId: '',
    name: 'Ventre de la Baleine',
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'ventre_baleine',
    icon: 'images/monsters/Protozorreur.png',
    description: '',
    spawns: [{ id: 'protozorreur', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.35 },
    ]
}

areas.donjonMeno = {
    id: 'donjonMeno',
    type: 'dungeon',
    keyId: '',
    name: 'Vaisseau du Capitaine Meno',
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'vaisseau_meno',
    icon: 'images/monsters/Capitaine_Meno.png',
    description: '',
    spawns: [{ id: 'capitaineMeno', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.35 },
        { itemId: 'Dofus_Abyssal',      dropRate: 0.0005}
    ]
}

areas.donjonKoutoulou = {
    id: 'donjonKoutoulou',
    type: 'dungeon',
    keyId: '',
    name: 'Temple de Koutoulou',
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'temple_koutoulou',
    icon: 'images/monsters/Larve_de_Koutoulou.png',
    description: '',
    spawns: [{ id: 'larveDeKoutoulou', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.35 },
        { itemId: 'Dofus_Abyssal',      dropRate: 0.0005}
    ]
}

areas.donjonDantinea = {
    id: 'donjonDantinea',
    type: 'dungeon',
    keyId: '',
    name: 'Palais de Dantinéa',
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'palais_dantinea',
    icon: 'images/monsters/Dantinéa.png',
    description: '',
    spawns: [{ id: 'dantinea', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.35 },
        { itemId: 'Dofus_Abyssal',      dropRate: 0.0005}
    ]
}

areas.donjonKatrepat = {
    id: 'donjonKatrepat',
    type: 'dungeon',
    keyId: '',
    name: 'Manoir des Katrepat',
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'manoir_katrepat',
    icon: 'images/monsters/Anerice_la_Shushess.png',
    description: '',
    spawns: [{ id: 'anericeShushess', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.35 },
    ]
}

areas.donjonIlyzaelle = {
    id: 'donjonIlyzaelle',
    type: 'dungeon',
    keyId: '',
    name: "Belvédère d'Ilyzaelle",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'belvedere_ilyzaelle',
    icon: 'images/monsters/Ilyzaelle.png',
    description: '',
    spawns: [{ id: 'ilyzaelle', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.35 },
        { itemId: 'Dofus_Ivoire',      dropRate: 0.0005}
    ]
}

areas.donjonBethel = {
    id: 'donjonBethel',
    type: 'dungeon',
    keyId: '',
    name: 'Tour de Bethel',
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'tour_bethel',
    icon: 'images/monsters/Bethel_Akarna.png',
    description: '',
    spawns: [{ id: 'bethelAkarna', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.35 },
        { itemId: 'Dofus_Ebene',      dropRate: 0.0005},
        { itemId: 'Dofus_Forgelave',      dropRate: 0.0005}
    ]
}

areas.donjonSolar = {
    id: 'donjonSolar',
    type: 'dungeon',
    keyId: '',
    name: 'Tour de Solar',
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'tour_solar',
    icon: 'images/monsters/Solar.png',
    description: '',
    spawns: [{ id: 'solar', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.35 },
        { itemId: 'Dofus_Ebene',      dropRate: 0.0005},
        { itemId: 'Dofus_Forgelave',      dropRate: 0.0005}
    ]
}

areas.donjonDazak = {
    id: 'donjonDazak',
    type: 'dungeon',
    keyId: '',
    name: 'Brasserie du roi Dazak',
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'brasserie_dazak',
    icon: 'images/monsters/Dazak_Martegel.png',
    description: '',
    spawns: [{ id: 'dazakMartegel', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.35 },
    ]
}

areas.donjonTorkelonia = {
    id: 'donjonTorkelonia',
    type: 'dungeon',
    keyId: '',
    name: 'Sanctuaire de Torkélonia',
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'sanctuaire_torkelonia',
    icon: 'images/monsters/Torkélonia.png',
    description: '',
    spawns: [{ id: 'torkelonia', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.35 },
    ]
}

areas.donjonArbreMort = {
    id: 'donjonArbreMort',
    type: 'dungeon',
    keyId: '',
    name: 'Arbre de Mort',
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'arbre_mort',
    icon: 'images/monsters/Corruption.png',
    description: '',
    spawns: [{ id: 'corruption', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.35 },
    ]
}

areas.donjonTyrannie = {
    id: 'donjonTyrannie',
    type: 'dungeon',
    keyId: '',
    name: 'Fers de la Tyrannie',
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'fers_tyrannie',
    icon: 'images/monsters/Servitude.png',
    description: '',
    spawns: [{ id: 'servitude', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.35 },
    ]
}

areas.donjonBalance = {
    id: 'donjonBalance',
    type: 'dungeon',
    keyId: '',
    name: 'Sentence de la Balance',
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'sentence_balance',
    icon: 'images/monsters/Misère.png',
    description: '',
    spawns: [{ id: 'misere', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.35 },
    ]
}

areas.donjonTroneSang = {
    id: 'donjonTroneSang',
    type: 'dungeon',
    keyId: '',
    name: 'Trône de Sang',
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'trone_sang',
    icon: 'images/monsters/Guerre.png',
    description: '',
    spawns: [{ id: 'guerre', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.35 },
    ]
}

areas.donjonTalKasha = {
    id: 'donjonTalKasha',
    type: 'dungeon',
    keyId: '',
    name: 'Chambre de Tal Kasha',
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'chambre_tal_kasha',
    icon: 'images/monsters/Tal_Kasha.png',
    description: '',
    spawns: [{ id: 'talKasha', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.35 },
    ]
}

areas.donjonKabahal = {
    id: 'donjonKabahal',
    type: 'dungeon',
    keyId: '',
    name: 'Rituel de Kabahal',
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'rituel_kabahal',
    icon: 'images/monsters/Kabahal.png',
    description: '',
    spawns: [{ id: 'kabahal', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.35 },
    ]
}

areas.donjonAurorePourpre = {
    id: 'donjonAurorePourpre',
    type: 'dungeon',
    keyId: '',
    name: "Bataille de l'Aurore Pourpre",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'aurore_pourpre',
    icon: 'images/monsters/L_Éternel_Conflit.png',
    description: '',
    spawns: [{ id: 'eternelConflit', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.35 },
        { itemId: 'Dofus_du_Cauchemard',      dropRate: 0.0005}
    ]
}

areas.donjonMalefices = {
    id: 'donjonMalefices',
    type: 'dungeon',
    keyId: '',
    name: 'Chambre des maléfices',
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'chambre_malefices',
    icon: 'images/monsters/Belladone.png',
    description: '',
    spawns: [{ id: 'belladone', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.35 },
        { itemId: 'Dofus_Sylvestre',      dropRate: 0.0005}
    ]
}

areas.donjonBreuil = {
    id: 'donjonBreuil',
    type: 'dungeon',
    keyId: '',
    name: 'Breuil du Vénérable',
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'breuil_venerable',
    icon: 'images/monsters/Vénérable_Endormi.png',
    description: '',
    spawns: [{ id: 'venerableEndormi', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.35 },
    ]
}

areas.donjonDechireuse = {
    id: 'donjonDechireuse',
    type: 'dungeon',
    keyId: '',
    name: 'Autel de la Déchireuse',
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'autel_dechireuse',
    icon: 'images/monsters/Déchireuse.png',
    description: '',
    spawns: [{ id: 'dechireuse', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.35 },
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// SAISONNIERS (à décommenter si besoin)
// ─────────────────────────────────────────────────────────────────────────────

// areas.donjonHalouine = {
//     id: 'donjonHalouine',
//     type: 'dungeon',
//     keyId: '',
//     name: "Potager d'Halouine",
//     minLevel: 105, maxLevel: 105,
//     mobMinLevel: 105, mobMaxLevel: 105,
//     background: 'potager_halouine',
//     icon: 'images/monsters/Halouine.png',
//     description: '',
//     spawns: [{ id: 'halouine', weight: 100 }],
//     lootTable: [
//         { itemId: 'pierreDameGardien',         dropRate: 0.45 },
//         { itemId: '',       dropRate: 0.01 },
//     ]
// }
// areas.donjonNowel = {
//     id: 'donjonNowel',
//     type: 'dungeon',
//     keyId: '',
//     name: 'Donjon de Nowel',
//     minLevel: 55, maxLevel: 55,
//     mobMinLevel: 55, mobMaxLevel: 55,
//     background: 'donjon_nowel',
//     icon: 'images/monsters/Sapik.png',
//     description: '',
//     spawns: [{ id: 'sapik', weight: 100 }],
//     lootTable: [
//         { itemId: 'pierreDameGardien',         dropRate: 0.45 },
//         { itemId: '',       dropRate: 0.01 },
//     ]
// }
// areas.donjonCaverneNowel = {
//     id: 'donjonCaverneNowel',
//     type: 'dungeon',
//     keyId: '',
//     name: 'Caverne de Nowel',
//     minLevel: 115, maxLevel: 115,
//     mobMinLevel: 115, mobMaxLevel: 115,
//     background: 'caverne_nowel',
//     icon: 'images/monsters/Papa_Nowel.png',
//     description: '',
//     spawns: [{ id: 'papaNowel', weight: 100 }],
//     lootTable: [
//         { itemId: 'pierreDameGardien',         dropRate: 0.45 },
//         { itemId: '',       dropRate: 0.01 },
//     ]
// }
// areas.donjonPapaNowel = {
//     id: 'donjonPapaNowel',
//     type: 'dungeon',
//     keyId: '',
//     name: 'Maison du Papa Nowel',
//     minLevel: 175, maxLevel: 175,
//     mobMinLevel: 175, mobMaxLevel: 175,
//     background: 'maison_papa_nowel',
//     icon: 'images/monsters/Père_Fwetar.png',
//     description: '',
//     spawns: [{ id: 'pereFwetar', weight: 100 }],
//     lootTable: [
//         { itemId: 'pierreDameGardien',         dropRate: 0.45 },
//         { itemId: '',       dropRate: 0.01 },
//     ]
// }
// areas.donjonWaddicts = {
//     id: 'donjonWaddicts',
//     type: 'dungeon',
//     keyId: '',
//     name: 'Fonderie des Waddicts',
//     minLevel: 65, maxLevel: 65,
//     mobMinLevel: 65, mobMaxLevel: 65,
//     background: 'fonderie_waddicts',
//     icon: 'images/monsters/Mawabouaino.png',
//     description: '',
//     spawns: [{ id: 'mawabouaino', weight: 100 }],
//     lootTable: [
//         { itemId: 'pierreDameGardien',         dropRate: 0.45 },
//         { itemId: '',       dropRate: 0.01 },
//     ]
// }
// areas.donjonCroquanterie = {
//     id: 'donjonCroquanterie',
//     type: 'dungeon',
//     keyId: '',
//     name: 'Croquanterie',
//     minLevel: 135, maxLevel: 135,
//     mobMinLevel: 135, mobMaxLevel: 135,
//     background: 'croquanterie',
//     icon: 'images/monsters/Croqueleur.png',
//     description: '',
//     spawns: [{ id: 'croqueleur', weight: 100 }],
//     lootTable: [
//         { itemId: 'pierreDameGardien',         dropRate: 0.45 },
//         { itemId: '',       dropRate: 0.01 },
//     ]
// }
// areas.donjonKao = {
//     id: 'donjonKao',
//     type: 'dungeon',
//     keyId: '',
//     name: 'Temple du dieu Kao',
//     minLevel: 200, maxLevel: 200,
//     mobMinLevel: 220, mobMaxLevel: 220,
//     background: 'temple_kao',
//     icon: 'images/monsters/Prêtresse_de_Kao.png',
//     description: '',
//     spawns: [{ id: 'pretresseDeKao', weight: 100 }],
//     lootTable: [
//         { itemId: 'pierreDameGardien',         dropRate: 0.45 },
//         { itemId: '',       dropRate: 0.01 },
//     ]
// }

// #endregion

// #region EVENTS ─────────────────────────────────────────────────────────────
// #region loot table runes 
/*
── Lignes de drop disponibles pour les runes ────────────────────────────────
Copier-coller la ligne souhaitée dans le lootTable d'une zone ou d'un event.
Les dropRate sont indicatifs — ajuster selon la rareté voulue.

PV
       { itemId: 'runeHpS',       dropRate: 0.10 },  // +20 PV   · coût −3 niv
       { itemId: 'runeHpM',       dropRate: 0.05 },  // +60 PV   · coût −7 niv
       { itemId: 'runeHpL',       dropRate: 0.02 },  // +150 PV  · coût −12 niv
ATK
       { itemId: 'runeAtkS',      dropRate: 0.10 },  // +15 ATK  · coût −3 niv
       { itemId: 'runeAtkM',      dropRate: 0.05 },  // +50 ATK  · coût −7 niv
       { itemId: 'runeAtkL',      dropRate: 0.02 },  // +130 ATK · coût −12 niv
Vitesse
       { itemId: 'runeSpdS',      dropRate: 0.08 },  // +5 Vit   · coût −4 niv
       { itemId: 'runeSpdM',      dropRate: 0.04 },  // +15 Vit  · coût −8 niv
Dégâts fixes
       { itemId: 'runeFlatDmgS',  dropRate: 0.10 },  // +5 Dég   · coût −3 niv
       { itemId: 'runeFlatDmgM',  dropRate: 0.05 },  // +15 Dég  · coût −7 niv
Critique
       { itemId: 'runeCritS',     dropRate: 0.08 },  // +5% Crit · coût −4 niv
       { itemId: 'runeCritDmgS',  dropRate: 0.06 },  // +10% DégCrit · coût −5 niv
Dégâts %
       { itemId: 'runeFinalDmgS', dropRate: 0.06 },  // +7% DégFin   · coût −6 niv
       { itemId: 'runeSpellDmgS', dropRate: 0.07 },  // +8% DégSort  · coût −5 niv
Défensif
       { itemId: 'runeDamRedS',   dropRate: 0.07 },  // +5% Réd.dég  · coût −5 niv
Résistances
       { itemId: 'runeFireResS',    dropRate: 0.08 },  // +8% Rés.Feu    · coût −4 niv
       { itemId: 'runeWaterResS',   dropRate: 0.08 },  // +8% Rés.Eau    · coût −4 niv
       { itemId: 'runeEarthResS',   dropRate: 0.08 },  // +8% Rés.Terre  · coût −4 niv
       { itemId: 'runeAirResS',     dropRate: 0.08 },  // +8% Rés.Air    · coût −4 niv
       { itemId: 'runeNeutralResS', dropRate: 0.08 },  // +8% Rés.Neutre · coût −4 niv
─────────────────────────────────────────────────────────────────────────────

        { itemId: 'runeHpS',          dropRate: 0.01 },
        { itemId: 'runeHpM',          dropRate: 0.01 },
        { itemId: 'runeHpL',          dropRate: 0.01 },
        { itemId: 'runeAtkS',         dropRate: 0.01 },
        { itemId: 'runeAtkM',         dropRate: 0.01 },
        { itemId: 'runeAtkL',         dropRate: 0.01 },
        { itemId: 'runeSpdS',         dropRate: 0.01 },
        { itemId: 'runeSpdM',         dropRate: 0.01 },
        { itemId: 'runeSpdL',         dropRate: 0.01 },
        { itemId: 'runeFlatDmgS',     dropRate: 0.01 },
        { itemId: 'runeFlatDmgM',     dropRate: 0.01 },
        { itemId: 'runeFlatDmgL',     dropRate: 0.01 },
        { itemId: 'runeCritS',        dropRate: 0.01 },
        { itemId: 'runeCritM',        dropRate: 0.01 },
        { itemId: 'runeCritL',        dropRate: 0.01 },
        { itemId: 'runeCritDmgS',     dropRate: 0.01 },
        { itemId: 'runeCritDmgM',     dropRate: 0.01 },
        { itemId: 'runeFinalDmgS',    dropRate: 0.01 },
        { itemId: 'runeFinalDmgM',    dropRate: 0.01 },
        { itemId: 'runeSpellDmgS',    dropRate: 0.01 },
        { itemId: 'runeSpellDmgM',    dropRate: 0.01 },
        { itemId: 'runeDamRedS',      dropRate: 0.01 },
        { itemId: 'runeDamRedM',      dropRate: 0.01 },
        { itemId: 'runeFireResS',     dropRate: 0.01 },
        { itemId: 'runeWaterResS',    dropRate: 0.01 },
        { itemId: 'runeEarthResS',    dropRate: 0.01 },
        { itemId: 'runeAirResS',      dropRate: 0.01 },
        { itemId: 'runeNeutralResS',  dropRate: 0.01 },
        { itemId: 'runeFireResM',     dropRate: 0.01 },
        { itemId: 'runeWaterResM',    dropRate: 0.01 },
        { itemId: 'runeEarthResM',    dropRate: 0.01 },
        { itemId: 'runeAirResM',      dropRate: 0.01 },
        { itemId: 'runeNeutralResM',  dropRate: 0.01 }
*/
// #endregion
areas.evenementPious = {
    id: 'evenementPious',
    type: 'event',
    name: 'Invasion Pious',
    minLevel: 10, maxLevel: 15,
    mobMinLevel: 10, mobMaxLevel: 15,
    background: 'ville_astrub',
    icon: 'images/monsters/Piou_Bleu.png',
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
        { itemId: 'piloteAutomatique', dropRate: 0.05 }
    ]
}

areas.evenementForetAstrub = {
    id: 'evenementForetAstrub',
    type: 'event',
    name: 'Attention au loup !',
    minLevel: 20, maxLevel: 35,
    mobMinLevel: 20, mobMaxLevel: 30,
    background: 'Foret_Astrub',
    icon: 'images/monsters/Milimulou.png',
    description: "Depuis plusieurs semaines, la forêt d'Astrub est le théâtre d'étranges disparitions. Entre les arbres rongés par la mousse et les sentiers envahis de brouillard, des voyageurs affirment avoir aperçu une silhouette massive rôdant dans l'ombre : l'Homme Ours. Certains le décrivent comme une bête sanguinaire surgie des profondeurs de la forêt, tandis que d'autres murmurent qu'il protégerait les créatures blessées et les secrets oubliés des bois.",
    spawns: [
        { id: 'milimulou',         weight: 22 },
        { id: 'prespic',         weight: 22 },
        { id: 'sanglier',  weight: 22 },
        { id: 'ecurouille',      weight: 22 },
        { id: 'hommeOurs',      weight: 12 }
    ],
    lootTable: [
        { itemId: 'pierreDame',                 dropRate: 0.45 },
        { itemId: 'cape_du_prespic',            dropRate: 0.005 },
        { itemId: 'coiffe_du_prespic',          dropRate: 0.005 },
        { itemId: 'anneau_du_prespic',          dropRate: 0.005 },
        { itemId: 'ceinture_du_prespic',        dropRate: 0.005 },
        { itemId: 'bouclier_herisse_du_prespic',        dropRate: 0.005 },
        { itemId: 'pieds_du_sanglier',         dropRate: 0.005 },
        { itemId: 'anneau_du_sanglier',         dropRate: 0.005 },
        { itemId: 'pieds_du_sanglier',       dropRate: 0.005 },
        { itemId: 'cape_de_l_homme_ours',        dropRate: 0.005 },
        { itemId: 'coiffe_de_l_homme_ours',      dropRate: 0.005 },
        { itemId: 'bottes_de_l_homme_ours',      dropRate: 0.005 },
        { itemId: 'alliance_de_l_homme_ours',      dropRate: 0.005 },
        { itemId: 'amulette_de_l_homme_ours',    dropRate: 0.005 },
        { itemId: 'ceinture_de_l_homme_ours',    dropRate: 0.005 },
        { itemId: 'baton_de_l_homme_ours',       dropRate: 0.005 },
    ]
}



// #endregion
areas.evenementBiblop = {
    id: 'evenementBiblop',
    type: 'event',
    name: 'Invasion de Blops',
    minLevel: 25, maxLevel: 30,
    mobMinLevel: 25, mobMaxLevel: 30,
    background: 'Blop',
    icon: 'images/monsters/Biblop_Griotte.png',
    description: "Des habitants ont rapportés qu'aux alentours du lac de Cania, des blops se multiplient vitesse grand V... Essayez de stoper cette invasion tant qu'ils ne sont pas pleinement développés.",
    spawns: [
        { id: 'biblop_coco',     weight: 25 },
        { id: 'biblop_reinette', weight: 25 },
        { id: 'biblop_griotte',  weight: 25 },
        { id: 'biblop_indigo',   weight: 25 },
    ],
    lootTable: [
        { itemId: 'pierreDame',        dropRate: 0.45 },
        { itemId: 'piloteAutomatique', dropRate: 0.05 }
    ]
}

areas.evenementDopeuls = {
    id: 'evenementDopeuls',
    type: 'event',
    name: 'Invasion Dopeuls',
    minLevel: 55, maxLevel: 80,
    mobMinLevel: 55, mobMaxLevel: 70,
    background: 'tainela',
    icon: 'images/monsters/Dopeul_Iop.png',
    description: "Le Village des Dopeuls ! Des reflets des douze classes et... quelques autres... envahissent le Monde des Douze. Affronte ces copies miroir avant qu'elles ne sèment le chaos.",
    spawns: [
        { id: 'dopeul_cra',        weight: 6 },
        { id: 'dopeul_ecaflip',    weight: 5 },
        { id: 'dopeul_eliotrope',  weight: 5 },
        { id: 'dopeul_eniripsa',   weight: 6 },
        { id: 'dopeul_enutrof',    weight: 5 },
        { id: 'dopeul_feca',       weight: 6 },
        { id: 'dopeul_forgelance', weight: 5 },
        { id: 'dopeul_huppermage', weight: 5 },
        { id: 'dopeul_iop',        weight: 6 },
        { id: 'dopeul_osamodas',   weight: 5 },
        { id: 'dopeul_ouginak',    weight: 5 },
        { id: 'dopeul_pandawa',    weight: 5 },
        { id: 'dopeul_roublard',   weight: 5 },
        { id: 'dopeul_sacrieur',   weight: 5 },
        { id: 'dopeul_sadida',     weight: 5 },
        { id: 'dopeul_sram',       weight: 5 },
        { id: 'dopeul_steamer',    weight: 5 },
        { id: 'dopeul_xelor',      weight: 5 },
        { id: 'dopeul_zobal',      weight: 5 },
        { id: 'dopeul_darkvlad',   weight: 1 }
    ],
    lootTable: [
        { itemId: 'pierreDame',        dropRate: 0.45 },
        { itemId: 'runeHpS',           dropRate: 0.01 },
        { itemId: 'runeAtkS',          dropRate: 0.01 },
        { itemId: 'runeSpdS',          dropRate: 0.01 },
        { itemId: 'runeFlatDmgS',      dropRate: 0.01 },
        { itemId: 'runeCritS',         dropRate: 0.01 }
    ]
}

areas.evenementRobots = {
    id: 'evenementRobots',
    type: 'event',
    name: 'Régulation technologique',
    minLevel: 55, maxLevel: 65,
    mobMinLevel: 55, mobMaxLevel: 65,
    background: 'Cania',
    icon: 'images/monsters/Robionicle.png',
    description: "Un steamer fou a été arrêté à l'Hotel des Ventes d'Astrub après une commande suspecte de pièces mécaniques. Depuis son arrestation de nombreux voyageurs racontent s'être fais prendre en chasse par de mystérieux robots.",
    spawns: [
        { id: 'robionicle',         weight: 30 },
        { id: 'robotFleau',         weight: 30 },
        { id: 'robotPoussePousse',  weight: 30 },
        { id: 'malleOutillee',      weight: 10 },
    ],
    lootTable: [
        { itemId: 'pierreDame',        dropRate: 0.45 },
        { itemId: 'runeHpS',           dropRate: 0.015 },
        { itemId: 'runeAtkS',          dropRate: 0.015 },
        { itemId: 'runeSpdS',          dropRate: 0.015 },
        { itemId: 'runeFlatDmgS',      dropRate: 0.015 },
        { itemId: 'runeCritS',         dropRate: 0.015 }
    ]
}

// #region RAIDS ────────────────────────────────────────────────────────────────────────────
areas.raidDofusArgenté = {
    id: 'raidDofusArgenté',
    name: "Les débuts sont rudes",
    type: 'raid',
    minLevel: 15, maxLevel: 35,
    mobMinLevel: 35, mobMaxLevel: 35,
    background: "astrub",
    icon: "images/monsters/Rathrosk.png",
    description: "Rathrosk, surnommé la Main Grise, est bien plus qu'un simple dragon. Ancien bourreau des Dieux et protecteur d'Astrub, cette créature légendaire porte en elle les flammes d'Externam et les murmures des âmes disparues.Sous sa forme juvénille, il veille encore sur des reliques anciennes ainsi que sur le mystérieux Dofus Argenté",
    spawns: [
        { id: 'bouftouRoyal', weight: 10 },
        { id: 'mobLeponge', weight: 10 },
        { id: 'tournesolAffame', weight: 10 }
    ],
    miniBoss: { id: 'Rathrosk', everyKills: 6, statMult: 1 },
    miniBossLootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'Dofus_Argente', dropRate: 0.01 }
    ],
    lootTable: []
}
areas.raidGelees = {
    id: 'raidGelees',
    name: 'Attention aux caries !',
    type: 'raid',
    minLevel: 55, maxLevel: 65,
    mobMinLevel: 55, mobMaxLevel: 65,
    background: 'gelees',
    icon: 'images/monsters/Gelée_Fraise.png',
    description: "Nombreux sont ceux qui viennent chercher fortune parmi ces créatures gélatineuses, attirés par les trésors et les mystères de la Gelaxième Dimension. Mais dans ce royaume sucré, il ne faut jamais se fier aux apparences : ce qui ressemble à une simple gourmandise pourrait bien être votre dernier repas.",
    spawns: [
        { id: 'gelee_fraise',         weight: 20 },
        { id: 'gelee_menthe',         weight: 20 },
        { id: 'gelee_bleuet',         weight: 20 },
        { id: 'gelee_citron',         weight: 20 },
    ],
    miniBoss: {ids: ['gelee_fraise_royale', 'gelee_menthe_royale', 'gelee_bleuet_royale', 'gelee_citron_royale'], everyKills: 4, statMult: 1},
    lootTable: [
        { itemId: 'pierreDame',     dropRate: 0.35 },
        { itemId: 'gelocape',     dropRate: 0.02 },
        { itemId: 'gelocoiffe',   dropRate: 0.02 },
        { itemId: 'gelobottes',   dropRate: 0.02 },
        { itemId: 'gelamu', dropRate: 0.02 },
        { itemId: 'geloture', dropRate: 0.02 }
    ],
    miniBossLootTable: [
        { itemId: 'pierreDameGardien',    dropRate: 0.45 },
        { itemId: 'gelano',      dropRate: 0.01 }
    ]
}
areas.raidMallefisk = {
    id: 'raidMallefisk',
    name: 'Fabrique de Malléfisk',
    type: 'raid',
    minLevel: 100, maxLevel: 120,
    mobMinLevel: 100, mobMaxLevel: 110,
    background: 'fabrique_mallefisk',
    icon: 'images/monsters/Malléfisk.png',
    description: '',
    spawns: [],
    miniBoss: {id: 'mallefisk', everyKills: 9, statMult: 1},
    lootTable: [],
    miniBossLootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 }
    ]
}
areas.raidPounicheur = {
    id: 'raidPounicheur',
    type: 'raid',
    name: 'Miausolée du Pounicheur',
    minLevel: 100, maxLevel: 120,
    mobMinLevel: 100, mobMaxLevel: 110,
    background: 'miausolee_pounicheur',
    icon: 'images/monsters/Pounicheur.png',
    description: '',
    spawns: [],
    miniBoss: {id: 'pounicheur', everyKills: 9, statMult: 1},
    lootTable: [],
    miniBossLootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 }
    ]
}
areas.raidFraktale = {
    id: 'raidFraktale',
    type: 'raid',
    name: 'Mégalithe de Fraktale',
    minLevel: 110, maxLevel: 130,
    mobMinLevel: 110, mobMaxLevel: 120,
    background: 'megalith_fraktale',
    icon: 'images/monsters/Fraktale.png',
    description: '',
    spawns: [],
    miniBoss: {id: 'fraktale', everyKills: 9, statMult: 1},
    lootTable: [],
    miniBossLootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 }
    ]
}
areas.raidEkarlatte = {
    id: 'raidEkarlatte',
    type: 'raid',
    name: 'Ring du Capitaine Ekarlatte',
    minLevel: 110, maxLevel: 130,
    mobMinLevel: 110, mobMaxLevel: 120,
    background: 'ring_ekarlatte',
    icon: 'images/monsters/Capitaine_Ekarlatte.png',
    description: '',
    spawns: [],
    miniBoss: {id: 'capitaineEkarlatte', everyKills: 9, statMult: 1},
    lootTable: [],
    miniBossLootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 }
    ]
}
areas.raidTourbeduRoissingue = {
    id: 'raidTourbeduRoissingue',
    name: 'Raid de la tourbière du Roissingue',
    type: 'raid',
    minLevel: 100, maxLevel: 170,
    mobMinLevel: 100, mobMaxLevel: 110,
    background: 'tourbiere',
    icon: 'images/monsters/Roissingue.png',
    description: "Au cœur de la Tourbière sans fond d'Otomaï s'étend le domaine du Roissingue, souverain grotesque d'un royaume noyé dans la boue et les eaux stagnantes. L'air y est lourd, chargé d'une odeur de moisissure et de tourbe humide, tandis que d'étranges créatures rôdent entre les marécages. Les aventuriers qui s'y aventurent racontent avoir aperçu des silhouettes simiesques vêtues de haillons trempés, riant dans l’obscurité avant de disparaître dans les brumes épaisses. Ici, chaque pas peut être le dernier… car la tourbière semble elle-même vouloir engloutir ceux qui osent troubler le règne du Roissingue.",
    spawns: [
        { id: 'LAouassingue',   weight: 15 },
        { id: 'LEouassingue',   weight: 15 },
        { id: 'tourbassingue',    weight: 35 },
        { id: 'bourbassingue',    weight: 35 }],
    miniBoss: {id: 'roissingue', everyKills: 9, statMult: 1},
    lootTable: [
        { itemId: 'pierreDame',          dropRate: 0.35 },
        { itemId: 'cape_de_la_ouassingue',     dropRate: 0.005 },
        { itemId: 'capuche_de_la_ouassingue',   dropRate: 0.005 },
        { itemId: 'gelobottes',   dropRate: 0.005 },
        { itemId: 'gelamu', dropRate: 0.005 }
    ],
    miniBossLootTable: [
        { itemId: 'pierreDameGardien',    dropRate: 0.45 },
        { itemId: 'cape_souveraine_du_roissingue',      dropRate: 0.01 },
        { itemId: 'capuche_souveraine_du_roissingue',    dropRate: 0.01 },
        { itemId: 'sceau_souverain_du_roissingue',    dropRate: 0.01 }
    ]
}

areas.raidPhossile = {
    id: 'raidPhossile',
    type: 'raid',
    name: 'Galerie du Phossile',
    minLevel: 140, maxLevel: 160,
    mobMinLevel: 140, mobMaxLevel: 150,
    background: 'galerie_phossile',
    icon: 'images/monsters/Phossile.png',
    description: '',
    spawns: [],
    miniBoss: {id: 'phossile', everyKills: 12, statMult: 1},
    lootTable: [],
    miniBossLootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 }
    ]
}
areas.raidUsh = {
    id: 'raidUsh',
    type: 'raid',
    name: 'Plateau de Ush',
    minLevel: 150, maxLevel: 170,
    mobMinLevel: 150, mobMaxLevel: 160,
    background: 'plateau_ush',
    icon: 'images/monsters/Ush_Galesh.png',
    description: '',
    spawns: [],
    miniBoss: {id: 'ushGalesh', everyKills: 12, statMult: 1},
    lootTable: [],
    miniBossLootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 }
    ]
}

areas.raidXLII = {
    id: 'raidXLII',
    type: 'raid',
    name: 'Horologium de XLII',
    minLevel: 150, maxLevel: 170,
    mobMinLevel: 150, mobMaxLevel: 160,
    background: 'horologium_xlii',
    icon: 'images/monsters/XLII.png',
    description: '',
    spawns: [],
    miniBoss: {id: 'xlii', everyKills: 12, statMult: 1},
    lootTable: [],
    miniBossLootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 }
    ]
}
areas.raidToxoliath = {
    id: 'raidToxoliath',
    type: 'raid',
    name: 'Cave du Toxoliath',
    minLevel: 160, maxLevel: 180,
    mobMinLevel: 160, mobMaxLevel: 170,
    background: 'cave_toxoliath',
    icon: 'images/monsters/Toxoliath.png',
    description: '',
    spawns: [],
    miniBoss: {id: 'toxoliath', everyKills: 12, statMult: 1},
    lootTable: [],
    miniBossLootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 }
    ]
}
areas.raidKralamoureGeant = {
    id: 'raidKralamoureGeant',
    name: 'Raid de l\'Antre du Kralamoure Géant',
    type: 'raid',
    minLevel: 180, maxLevel: 190,
    mobMinLevel: 180, mobMaxLevel: 180,
    background: 'Kralamoure',
    icon: 'images/monsters/Kralamoure_Géant.png',
    description: "Au plus profond des marécages d'Otomaï se dissimule l'Antre du Kralamoure Géant, une prison oubliée renfermant une créature aussi ancienne que l’île elle-même. Derrière ces portes scellées par un mécanisme complexe sommeille un monstre titanesque, dont les tentacules émergent des eaux souillées pour happer les aventuriers assez téméraires pour troubler son repos. Certains racontent que son encre noircit les marais, tandis que d'autres murmurent qu'il aurait autrefois dévoré un dragon et conservé son précieux Dofus.",
    spawns: [
        { id: 'tentaculePrimaire',   weight: 25 },
        { id: 'tentaculeSecondaire',   weight: 25 },
        { id: 'tentaculeTertiaire', weight: 25 },
        { id: 'tentaculeQuartenaire',    weight: 25 }],
    miniBoss: {id: 'kralamoureGeant', everyKills: 12, statMult: 1},
    lootTable: [
        { itemId: 'pierreDame',          dropRate: 0.35 },
        { itemId: 'kralamansion',        dropRate: 0.01 },
        { itemId: 'kralano',             dropRate: 0.01 },
        { itemId: 'annolamour',          dropRate: 0.01 }
    ],
    miniBossLootTable: [
        { itemId: 'pierreDameGardien',   dropRate: 0.45 },
        { itemId: 'Dofus_Ocre',           dropRate: 0.01 }
    ]
}
areas.raidNidas = {
    id: 'raidNidas',
    type: 'raid',
    name: 'Palais du roi Nidas',
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'palais_nidas',
    icon: 'images/monsters/Roi_Nidas.png',
    description: '',
    spawns: [],
    miniBoss: {id: 'roiNidas', everyKills: 12, statMult: 1},
    lootTable: [],
    miniBossLootTable: [
       { itemId: 'Dofus_Nebuleux',      dropRate: 0.01},
       { itemId: 'pierreDameGardien',         dropRate: 0.45 }]
}

areas.raidCourSombre = {
    id: 'raidCourSombre',
    type: 'raid',
    name: 'Trône de la Cour Sombre',
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'trone_cour_sombre',
    icon: 'images/monsters/Reine_des_Voleurs.png',
    description: '',
    spawns: [],
    miniBoss: {id: 'reineDesVoleurs', everyKills: 12, statMult: 1},
    lootTable: [],
    miniBossLootTable: [
       { itemId: 'Dofus_Nebuleux',      dropRate: 0.01},
       { itemId: 'pierreDameGardien',         dropRate: 0.45 }]
}
areas.raidVortex = {
    id: 'raidVortex',
    type: 'raid',
    name: 'Œil de Vortex',
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'oeil_vortex',
    icon: 'images/monsters/Vortex.png',
    description: '',
    spawns: [],
    miniBoss: {id: 'vortex', everyKills: 12, statMult: 1},
    lootTable: [],
    miniBossLootTable: [
       { itemId: 'Dofus_Nebuleux',      dropRate: 0.01},
       { itemId: 'pierreDameGardien',         dropRate: 0.45 }]
}

areas.raidChaloeil = {
    id: 'raidChaloeil',
    type: 'raid',
    name: 'Défi du Chalœil',
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'defi_chaloeil',
    icon: 'images/monsters/Chalœil.png',
    description: '',
    spawns: [],
    miniBoss: {id: 'chaloeil', everyKills: 12, statMult: 1},
    lootTable: [],
    miniBossLootTable: [
       { itemId: 'Dofus_Ivoire',      dropRate: 0.01},
       { itemId: 'pierreDameGardien',         dropRate: 0.45 }]
}
areas.raidOrukam = {
    id: 'raidOrukam',
    type: 'raid',
    name: "Mémoire d'Orukam",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'memoire_orukam',
    icon: 'images/monsters/Roi_Imagami.png',
    description: '',
    spawns: [],
    miniBoss: {id: 'roiImagami', everyKills: 9, statMult: 1},
    lootTable: [],
    miniBossLootTable: [
       { itemId: 'Dofus_Tachete',      dropRate: 0.01},
       { itemId: 'pierreDameGardien',         dropRate: 0.45 }]
}

areas.raidImagiro = {
    id: 'raidImagiro',
    type: 'raid',
    name: "Souvenir d'Imagiro",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'souvenir_imagiro',
    icon: 'images/monsters/Reine_Amirukam.png',
    description: '',
    spawns: [],
    miniBoss: {id: 'reineAmirukam', everyKills: 9, statMult: 1},
    lootTable: [],
    miniBossLootTable: [
       { itemId: 'Dofus_Tachete',      dropRate: 0.01},
       { itemId: 'pierreDameGardien',         dropRate: 0.45 }]
}
areas.raidEliocalypse = {
    id: 'raidEliocalypse',
    type: 'raid',
    name: "Tempête de l'Eliocalypse",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: 'tempete_eliocalypse',
    icon: 'images/monsters/Corruption.png',
    description: '',
    spawns: [
        { id: 'servitude',  weight: 33 },
        { id: 'misere',     weight: 33 },
        { id: 'guerre',     weight: 34 },
        { id: 'corruption',     weight: 34 },
    ],
    lootTable: [{ itemId: 'pierreDameGardien',         dropRate: 0.45 }],
}
// #endregion RAIDS