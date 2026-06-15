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
    background: "cimetiere_incarnam",
    icon: "img/monstres/sprites/chaferDebutant.png",
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
    icon: 'img/monstres/sprites/tournesolSauvage.png',
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
    icon: 'img/monstres/sprites/pichonBleu.png',
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
    icon: 'img/monstres/sprites/bouftou.png',
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
    icon: 'img/monstres/sprites/scarafeuilleBleu.png',
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
areas.Kwaks = {
    id: 'Kwaks',
    name: 'Falaise des Kwaks',
    minLevel: 40, maxLevel: 60,
    mobMinLevel: 40, mobMaxLevel: 50,
    background: 'kwaks',
    icon: 'img/monstres/sprites/kwakVent.png',
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
areas.blops = {
    id: 'blops',
    name: 'Lac de Cania',
    minLevel: 50, maxLevel: 70,
    mobMinLevel: 50, mobMaxLevel: 60,
    background: 'blop',
    icon: 'img/monstres/sprites/blopignon.png',
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
areas.plateauMantiscore = {
    id: 'plateauMantiscore',
    name: 'Désert de Saharash',
    minLevel: 60, maxLevel: 80,
    mobMinLevel: 60, mobMaxLevel: 70,
    background: 'desertMantiscore',
    icon: 'img/monstres/sprites/leolhyene.png',
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
areas.nidsDragaeufs = {
    id: 'nidsDragaeufs',
    name: 'Nids des Dragaeufs',
    minLevel: 70, maxLevel: 90,
    mobMinLevel: 70, mobMaxLevel: 80,
    background: 'montagneDragoeuf',
    icon: 'img/monstres/sprites/dragoeufArdoise.png',
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
areas.foretAbraknydes = {
    id: 'foretAbraknydes',
    name: 'Forêt des Abraknydes',
    minLevel: 80, maxLevel: 100,
    mobMinLevel: 80, mobMaxLevel: 90,
    background: 'foretAbraknyde',
    icon: 'img/monstres/sprites/abrakneSombre.png',
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
areas.fermeDragonCochon = {
    id: 'fermeDragonCochon',
    name: 'Territoire des porcos',
    minLevel: 90, maxLevel: 110,
    mobMinLevel: 90, mobMaxLevel: 100,
    background: 'fermeDragonCochon',
    icon: 'img/monstres/sprites/cochonDeFarle.png',
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
// areas.landesMeulou = {
//     id: 'landesMeulou',
//     name: 'Landes du Meulou',
//     minLevel: 100, maxLevel: 120,
//     mobMinLevel: 100, mobMaxLevel: 110,
//     background: 'landesMeulou',
//     icon: 'img/monstres/sprites/mulou.png',
//     description: "",
//     spawns: [
//         { id: 'mulou',      weight: 22 },
//         { id: 'cocholou',   weight: 22 },
//         { id: 'mulounoke',  weight: 22 },
//         { id: 'mergranlou', weight: 22 },
//         { id: 'muloubard',  weight: 12 }
//     ],
//     lootTable: [
//         { itemId: 'pierreDame',      dropRate: 0.45 },
//         { itemId: 'cleDonjonMeulou', dropRate: 0.15, isKey: true }
//     ]
// }
// areas.canyonsRatNoir = {
//     id: 'canyonsRatNoir',
//     name: 'Canyons du Rat Noir',
//     minLevel: 100, maxLevel: 120,
//     mobMinLevel: 100, mobMaxLevel: 110,
//     background: 'canyonsRatNoir',
//     icon: 'img/monstres/sprites/ratLi.png',
//     description: "",
//     spawns: [
//         { id: 'rate_atinee',  weight: 22 },
//         { id: 'rate_iboisee', weight: 22 },
//         { id: 'rat_li',       weight: 22 },
//         { id: 'rat_plapla',   weight: 22 },
//         { id: 'rat_sio',      weight: 12 }
//     ],
//     lootTable: [
//         { itemId: 'pierreDame',       dropRate: 0.45 },
//         { itemId: 'cleDonjonRatNoir', dropRate: 0.15, isKey: true }
//     ]
// }
// areas.canyonsRatBlanc = {
//     id: 'canyonsRatBlanc',
//     name: 'Canyons du Rat Blanc',
//     minLevel: 100, maxLevel: 120,
//     mobMinLevel: 100, mobMaxLevel: 110,
//     background: 'canyonsRatBlanc',
//     icon: 'img/monstres/sprites/chikaRat.png',
//     description: "",
//     spawns: [
//         { id: 'scelee_rate', weight: 22 },
//         { id: 'chika_rat',   weight: 22 },
//         { id: 'chak_rat',    weight: 22 },
//         { id: 'aloevee_rate',  weight: 22 },
//         { id: 'capoei_rat',  weight: 12 }
//     ],
//     lootTable: [
//         { itemId: 'pierreDame',        dropRate: 0.45 },
//         { itemId: 'cleDonjonRatBlanc', dropRate: 0.15, isKey: true }
//     ]
// }
// ─────────────────────────────────────────────────────────────────
// BOUFMOUTH — Zone niveau 110–130
// areas.plainesBoufmouth = {
//     id: 'plainesBoufmouth',
//     name: 'Plaines des Boufmouths',
//     minLevel: 110, maxLevel: 130,
//     mobMinLevel: 110, mobMaxLevel: 120,
//     background: 'plainesBoufmouth',
//     icon: 'img/monstres/sprites/boufmouth.png',
//     description: "",
//     spawns: [
//         { id: 'boufmouth',           weight: 32 },
//         { id: 'boufmouth_legendaire', weight: 32 },
//         { id: 'bouftonmouth',        weight: 28 },
//         { id: 'boufmouth_de_guerre',   weight: 8 }
//     ],
//     lootTable: [
//         { itemId: 'pierreDame',              dropRate: 0.45 },
//         { itemId: 'cleDonjonBoufmouthRoyal', dropRate: 0.15, isKey: true }
//     ]
// }
// ─────────────────────────────────────────────────────────────────
// MANSOT — Zone niveau 110–130
// areas.galleriesMansot = {
//     id: 'galleriesMansot',
//     name: 'Galeries des Mansots',
//     minLevel: 110, maxLevel: 130,
//     mobMinLevel: 110, mobMaxLevel: 120,
//     background: 'galleriesMansot',
//     icon: 'img/monstres/sprites/fuMansot.png',
//     description: "",
//     spawns: [
//         { id: 'fu_mansot',  weight: 24 },
//         { id: 'timansot',  weight: 24 },
//         { id: 'shamansot', weight: 24 },
//         { id: 'mamansot',  weight: 20 },
//         { id: 'mansobese', weight: 8 }
//     ],
//     lootTable: [
//         { itemId: 'pierreDame',           dropRate: 0.45 },
//         { itemId: 'cleDonjonMansotRoyal', dropRate: 0.15, isKey: true }
//     ]
// }
// ─────────────────────────────────────────────────────────────────
// TOFU ROYAL — Zone niveau 120–140
// areas.foretTofuRoyal = {
//     id: 'foretTofuRoyal',
//     name: 'Forêt des Tofus',
//     minLevel: 120, maxLevel: 140,
//     mobMinLevel: 120, mobMaxLevel: 130,
//     background: 'foretTofuRoyal',
//     icon: 'img/monstres/sprites/tofubine.png',
//     description: "",
//     spawns: [
//         { id: 'tofubine',        weight: 24 },
//         { id: 'tofu_dodu',        weight: 24 },
//         { id: 'tofutoflamme',    weight: 24 },
//         { id: 'tofuzmo',         weight: 20 },
//         { id: 'vilain_petit_tofu', weight: 8 }
//     ],
//     lootTable: [
//         { itemId: 'pierreDame',         dropRate: 0.45 },
//         { itemId: 'cleDonjonTofuRoyal', dropRate: 0.15, isKey: true }
//     ]
// }
// ─────────────────────────────────────────────────────────────────
// HELL MINA — Zone niveau 130–150
// areas.foretHellMina = {
//     id: 'foretHellMina',
//     name: 'Forêt de Hell Mina',
//     minLevel: 130, maxLevel: 150,
//     mobMinLevel: 130, mobMaxLevel: 140,
//     background: 'foretHellMina',
//     icon: 'img/monstres/sprites/malalfa.png',
//     description: "",
//     spawns: [
//         { id: 'malalfa', weight: 24 },
//         { id: 'malzerb', weight: 24 },
//         { id: 'maltrio', weight: 24 },
//         { id: 'malepik', weight: 20 },
//         { id: 'malbois', weight: 8 }
//     ],
//     lootTable: [
//         { itemId: 'pierreDame',        dropRate: 0.45 },
//         { itemId: 'cleDonjonHellMina', dropRate: 0.15, isKey: true }
//     ]
// }
// ─────────────────────────────────────────────────────────────────
// TRUCHE — Zone niveau 130–150
// areas.montagneTruche = {
//     id: 'montagneTruche',
//     name: 'Monts des Truches',
//     minLevel: 130, maxLevel: 150,
//     mobMinLevel: 130, mobMaxLevel: 140,
//     background: 'montagneTruche',
//     icon: 'img/monstres/sprites/gruche.png',
//     description: "",
//     spawns: [
//         { id: 'gruche',      weight: 24 },
//         { id: 'truchtine',   weight: 24 },
//         { id: 'truchon',     weight: 24 },
//         { id: 'truchideur',  weight: 20 },
//         { id: 'truchmuche', weight: 8 }
//     ],
//     lootTable: [
//         { itemId: 'pierreDame',           dropRate: 0.45 },
//         { itemId: 'cleDonjonHauteTruche', dropRate: 0.15, isKey: true }
//     ]
// }
// ─────────────────────────────────────────────────────────────────
// PHOSSILE — Zone niveau 140–160
// areas.grottesPhossiles = {
//     id: 'grottesPhossiles',
//     name: 'Grottes des Phossiles',
//     minLevel: 140, maxLevel: 160,
//     mobMinLevel: 140, mobMaxLevel: 150,
//     background: 'grottesPhossiles',
//     icon: 'img/monstres/sprites/perePhorreur.png',
//     description: "",
//     spawns: [
//         { id: 'pere_phorreur',  weight: 24 },
//         { id: 'phorreveur',    weight: 24 },
//         { id: 'phozami',       weight: 24 },
//         { id: 'metaphorreur',  weight: 20 },
//         { id: 'mere_veilleuse', weight: 8 }
//     ],
//     lootTable: [
//         { itemId: 'pierreDame',        dropRate: 0.45 },
//         { itemId: 'cleDonjonPhossile', dropRate: 0.15, isKey: true }
//     ]
// }
// ─────────────────────────────────────────────────────────────────
// CHENE MOU — Zone niveau 140–160
// areas.foretCheneMou = {
//     id: 'foretCheneMou',
//     name: 'Forêt du Chêne Mou',
//     minLevel: 140, maxLevel: 160,
//     mobMinLevel: 140, mobMaxLevel: 150,
//     background: 'foretCheneMou',
//     icon: 'img/monstres/sprites/abrakneSombreIrascible.png',
//     description: "",
//     spawns: [
//         { id: 'abrakne_sombre_irascible',   weight: 25 },
//         { id: 'abraknyde_sombre_irascible', weight: 25 },
//         { id: 'araknotron_irascible',      weight: 25 },
//         { id: 'branche_invocatrice',       weight: 13 },
//         { id: 'branche_soignante',         weight: 12 }
//     ],
//     lootTable: [
//         { itemId: 'pierreDame',         dropRate: 0.45 },
//         { itemId: 'cleDonjonCheneMou',  dropRate: 0.15, isKey: true }
//     ]
// }
// ─────────────────────────────────────────────────────────────────
// MINOTOT — Zone niveau 150–170
// areas.labyrintheMinotots = {
//     id: 'labyrintheMinotots',
//     name: 'Labyrinthe des Minotots',
//     minLevel: 150, maxLevel: 170,
//     mobMinLevel: 150, mobMaxLevel: 160,
//     background: 'labyrintheMinotots',
//     icon: 'img/monstres/sprites/minoskito.png',
//     description: "",
//     spawns: [
//         { id: 'gamino',      weight: 23 },
//         { id: 'scaratos',    weight: 23 },
//         { id: 'serpiplume',  weight: 23 },
//         { id: 'minoskito',   weight: 21 },
//         { id: 'deminoboule', weight: 5 },
//         { id: 'mominotor',   weight: 5 }
//     ],
//     lootTable: [
//         { itemId: 'pierreDame',        dropRate: 0.45 },
//         { itemId: 'cleDonjonMinotot',  dropRate: 0.15, isKey: true }
//     ]
// }
// ─────────────────────────────────────────────────────────────────
// OBSIDIANTRE — Zone niveau 150–170
// areas.volcansObsidiantre = {
//     id: 'volcansObsidiantre',
//     name: "Volcans de l'Obsidiantre",
//     minLevel: 150, maxLevel: 170,
//     mobMinLevel: 150, mobMaxLevel: 160,
//     background: 'volcansObsidiantre',
//     icon: 'img/monstres/sprites/solfatare.png',
//     description: "",
//     spawns: [
//         { id: 'solfatare',   weight: 24 },
//         { id: 'atomystique', weight: 24 },
//         { id: 'crapeur',     weight: 24 },
//         { id: 'fumrirolle',  weight: 24 },
//         { id: 'mofette',     weight: 4 }
//     ],
//     lootTable: [
//         { itemId: 'pierreDame',           dropRate: 0.45 },
//         { itemId: 'cleDonjonObsidiantre', dropRate: 0.15, isKey: true }
//     ]
// }
// ─────────────────────────────────────────────────────────────────
// TENGU GIVREFOUX — Zone niveau 160–180
// areas.sommetsTenguGivrefoux = {
//     id: 'sommetsTenguGivrefoux',
//     name: 'Sommets des Tengus Givrefoux',
//     minLevel: 160, maxLevel: 180,
//     mobMinLevel: 160, mobMaxLevel: 170,
//     background: 'sommetsTenguGivrefoux',
//     icon: 'img/monstres/sprites/yokaiGivrefoux.png',
//     description: "",
//     spawns: [
//         { id: 'yokai_givrefoux', weight: 24 },
//         { id: 'yomi_givrefoux',  weight: 24 },
//         { id: 'soryo_givrefoux', weight: 24 },
//         { id: 'maho_givrefoux',  weight: 20 },
//         { id: 'kami_givrefoux',  weight: 8 }
//     ],
//     lootTable: [
//         { itemId: 'pierreDame',               dropRate: 0.45 },
//         { itemId: 'cleDonjonTenguGivrefoux',  dropRate: 0.15, isKey: true }
//     ]
// }
// ─────────────────────────────────────────────────────────────────
// OUGAH — Zone niveau 170–190
// areas.jungleOugah = {
//     id: 'jungleOugah',
//     name: "Jungle de l'Ougah",
//     minLevel: 170, maxLevel: 190,
//     mobMinLevel: 170, mobMaxLevel: 180,
//     background: 'jungleOugah',
//     icon: 'img/monstres/sprites/champaknyde.png',
//     description: "",
//     spawns: [
//         { id: 'tromperelle', weight: 18 },
//         { id: 'champaknyde', weight: 17 },
//         { id: 'champbis',    weight: 17 },
//         { id: 'champodonte', weight: 17 },
//         { id: 'champ_a_gnons',  weight: 16 },
//         { id: 'champmane',   weight: 15 }
//     ],
//     lootTable: [
//         { itemId: 'pierreDame',       dropRate: 0.45 },
//         { itemId: 'cleDonjonOugah',   dropRate: 0.15, isKey: true }
//     ]
// }
// ─────────────────────────────────────────────────────────────────
// KOLOSSO — Zone niveau 170–190
// areas.plainesKolosso = {
//     id: 'plainesKolosso',
//     name: 'Plaines du Kolosso',
//     minLevel: 170, maxLevel: 190,
//     mobMinLevel: 170, mobMaxLevel: 180,
//     background: 'plainesKolosso',
//     icon: 'img/monstres/sprites/croleur.png',
//     description: "",
//     spawns: [
//         { id: 'croleur',  weight: 23 },
//         { id: 'blerauve', weight: 22 },
//         { id: 'blerom',   weight: 22 },
//         { id: 'wolvero',  weight: 22 },
//         { id: 'fleuro',   weight: 6 },
//         { id: 'blerice',  weight: 5 }
//     ],
//     lootTable: [
//         { itemId: 'pierreDame',        dropRate: 0.45 },
//         { itemId: 'cleDonjonKolosso',  dropRate: 0.15, isKey: true }
//     ]
// }
// ─────────────────────────────────────────────────────────────────
// GLOURCELESTE — Zone niveau 180–200
// areas.cotesGlourceleste = {
//     id: 'cotesGlourceleste',
//     name: 'Côtes du Gloucéleste',
//     minLevel: 180, maxLevel: 200,
//     mobMinLevel: 180, mobMaxLevel: 190,
//     background: 'cotesGlourceleste',
//     icon: 'img/monstres/sprites/glouragan.png',
//     description: "",
//     spawns: [
//         { id: 'glouragan',   weight: 20 },
//         { id: 'aperiglours', weight: 20 },
//         { id: 'boulglours',  weight: 20 },
//         { id: 'gloursaya',   weight: 20 },
//         { id: 'meliglours',  weight: 15 },
//         { id: 'glourmand',   weight: 5 }
//     ],
//     lootTable: [
//         { itemId: 'pierreDame',            dropRate: 0.45 },
//         { itemId: 'cleDonjonGlourceleste', dropRate: 0.15, isKey: true }
//     ]
// }
// ─────────────────────────────────────────────────────────────────
// HAREBOURG — Zone niveau 200+
// areas.domaineHarebourg = {
//     id: 'domaineHarebourg',
//     name: 'Domaine de Harebourg',
//     minLevel: 200, maxLevel: 230,
//     mobMinLevel: 200, mobMaxLevel: 215,
//     background: 'chateauHarebourg',
//     icon: 'img/monstres/sprites/sinistrofu.png',
//     description: "",
//     spawns: [
//         { id: 'sinistrofu',  weight: 24 },
//         { id: 'cycloide',    weight: 24 },
//         { id: 'granduk',     weight: 24 },
//         { id: 'nocturlabe', weight: 20 },
//         { id: 'strigide',    weight: 8 }
//     ],
//     lootTable: [
//         { itemId: 'pierreDame',         dropRate: 0.45 },
//         { itemId: 'cleDonjonHarebourg', dropRate: 0.15, isKey: true }
//     ]
// }
// #endregion

// #region DONJONS ────────────────────────────────────────────────────────────────

areas.donjonIncarnam = {
    id: 'donjonIncarnam',
    type: 'dungeon',
    keyId: 'cleDonjonKardorim',
    name: 'La Crypte de Kardorim',
    minLevel: 15, maxLevel: 15,
    mobMinLevel: 15, mobMaxLevel: 15,
    background: 'cimetiere_incarnam',
    icon: 'img/monstres/sprites/kardorim.png',
    description: "Les profondeurs d’Incarnam, placées sous la vigilance du redoutable Kardorim, ancien capitaine devenu aventurier, sont toujours parcourues en compagnie de son fidèle compagnon.",
    spawns: [{ id: 'kardorim',    weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 },
        { itemId: 'casque_de_kardorim',            dropRate: 0.03 },
        { itemId: 'bracelet_de_kardorim',            dropRate: 0.03 },
        { itemId: 'cape_de_kardorim',              dropRate: 0.03 }
    ]
}
areas.donjonMousse = {
    id: 'donjonMousse',
    type: 'dungeon',
    keyId: 'cleDonjonSable',
    name: 'Le Château Ensablé',
    minLevel: 25, maxLevel: 25,
    mobMinLevel: 25, mobMaxLevel: 25,
    background: 'chateau_ensable',
    icon: 'img/monstres/sprites/mobLeponge.png',
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
    icon: 'img/monstres/sprites/tournesolAffame.png',
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
areas.donjonBouftou = {
    id: 'donjonBouftou',
    type: 'dungeon',
    keyId: 'cleDonjonBouftou',
    name: 'La Cour du Bouftou Royal',
    minLevel: 35, maxLevel: 35,
    mobMinLevel: 35, mobMaxLevel: 35,
    background: 'tainela',
    icon: 'img/monstres/sprites/bouftouRoyal.png',
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
areas.donjonScarafeuille = {
    id: 'donjonScarafeuille',
    type: 'dungeon',
    keyId: 'cleDonjonScarafeuille',
    name: 'La Ruche du Scraraboss Dorée',
    minLevel: 45, maxLevel: 45,
    mobMinLevel: 45, mobMaxLevel: 45,
    background: 'scarafeuilles',
    icon: 'img/monstres/sprites/scarabossDoree.png',
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
areas.donjonKwakwa = {
    id: 'donjonKwakwa',
    type: 'dungeon',
    keyId: 'cleDonjonKwakwa',
    name: 'Le Nid du Kwakwa',
    minLevel: 55, maxLevel: 55,
    mobMinLevel: 55, mobMaxLevel: 55,
    background: 'kwaks',
    icon: 'img/monstres/sprites/kwakwa.png',
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
areas.donjonBlop = {
    id: 'donjonBlop',
    type: 'dungeon',
    keyId: 'cleDonjonBlop',
    name: 'Le Clos des Blops',
    minLevel: 65, maxLevel: 65,
    mobMinLevel: 65, mobMaxLevel: 65,
    background: 'blop',
    icon: 'img/monstres/sprites/blopCocoRoyal.png',
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
areas.donjonMantiscore = {
    id: 'donjonMantiscore',
    type: 'dungeon',
    keyId: 'cleDonjonMantiscore',
    name: "Cimetière des Mastodontes",
    minLevel: 75, maxLevel: 75,
    mobMinLevel: 75, mobMaxLevel: 75,
    background: 'desertMantiscore',
    icon: 'img/monstres/sprites/mantiscore.png',
    description: "Au cœur du désert brûlant de Saharach, là où les Dunes des Ossements s'étendent à perte de vue, repose un lieu oublié du monde des vivants : le Cimetière des Mastodontes. Ces terres portent le souvenir d’une époque révolue, lorsque d’immenses créatures arpentant l’île s’effondraient ici, laissant derrière elles des squelettes titanesques enfouis sous le sable.",
    spawns: [{ id: 'mantiscore', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'gelano', dropRate: 0.03 }
    ]
}
areas.donjonDraegnerys = {
    id: 'donjonDraegnerys',
    type: 'dungeon',
    keyId: 'cleDonjonDraegnerys',
    name: "L'épreuve' de Draegnerys",
    minLevel: 85, maxLevel: 85,
    mobMinLevel: 85, mobMaxLevel: 85,
    background: 'montagneDragoeuf',
    icon: 'img/monstres/sprites/draegnerys.png',
    description: "Sur la presqu'île des Dragoeufs, au cœur des terres fumantes où la roche semble encore porter l'empreinte des anciens dragons, s'élève l'Épreuve de Draegnerys. Ici, chaque pas est une mise à l'épreuve, chaque couloir un test imposé par la gardienne des lieux.",
    spawns: [{ id: 'draegnerys', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'cape_de_shika',     dropRate: 0.02},
        { itemId: 'shikacoiffe',     dropRate: 0.02},
        { itemId: 'epis_de_shika',     dropRate: 0.02}
    ]
}
areas.donjonAbraknydeAncestral = {
    id: 'donjonAbraknydeAncestral',
    type: 'dungeon',
    keyId: 'cleDonjonAbraknydeAncestral',
    name: "Domaine Ancestral",
    minLevel: 95, maxLevel: 95,
    mobMinLevel: 95, mobMaxLevel: 95,
    background: 'foretAbraknyde',
    icon: 'img/monstres/sprites/abraknydeAncestral.png',
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
areas.donjonDragonCochon = {
    id: 'donjonDragonCochon',
    type: 'dungeon',
    keyId: 'cleDonjonDragonCochon',
    name: 'Antre du Dragon Cochon',
    minLevel: 105, maxLevel: 105,
    mobMinLevel: 105, mobMaxLevel: 105,
    background: 'fermeDragonCochon',
    icon: 'img/monstres/sprites/dragonCochon.png',
    description: "Au cœur du Territoire des Porcos se cache un dédale de galeries nauséabondes où résonnent grognements et rugissements. C'est ici que siège le Dragon Cochon, une créature contre-nature née de la fusion improbable entre la férocité d'un dragon et la brutalité d'un porc géant.",
    spawns: [{ id: 'dragonCochon', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',    dropRate: 0.45 },
        { itemId: 'cape_du_dragon_cochon',   dropRate: 0.02 },
        { itemId: 'coiffe_du_dragon_cochon', dropRate: 0.02 },
        { itemId: 'kaiser',   dropRate: 0.02 },
        { itemId: 'Dofus_Turquoise',      dropRate: 0.0005}
    ]
}
// ═══════════════════════════════════════════════════════
// DONJON MEULOU
// areas.donjonMeulou = {
//     id: 'donjonMeulou',
//     type: 'dungeon',
//     keyId: 'cleDonjonMeulou',
//     name: 'Le Moulin du Meulou',
//     minLevel: 115, maxLevel: 115,
//     mobMinLevel: 115, mobMaxLevel: 115,
//     background: 'landesMeulou',
//     icon: 'img/monstres/sprites/meulou.png',
//     description: "",
//     spawns: [{ id: 'meulou', weight: 100 }],
//     lootTable: [
//         { itemId: 'pierreDameGardien', dropRate: 0.45 }
//     ]
// }
// ═══════════════════════════════════════════════════════
// DONJON RAT NOIR
// areas.donjonRatNoir = {
//     id: 'donjonRatNoir',
//     type: 'dungeon',
//     keyId: 'cleDonjonRatNoir',
//     name: 'Le Terrier du Rat Noir',
//     minLevel: 115, maxLevel: 115,
//     mobMinLevel: 115, mobMaxLevel: 115,
//     background: 'canyonsRatNoir',
//     icon: 'img/monstres/sprites/ratNoir.png',
//     description: "",
//     spawns: [{ id: 'rat_noir', weight: 100 }],
//     lootTable: [
//         { itemId: 'pierreDameGardien', dropRate: 0.45 }
//     ]
// }
// ═══════════════════════════════════════════════════════
// DONJON RAT BLANC
// areas.donjonRatBlanc = {
//     id: 'donjonRatBlanc',
//     type: 'dungeon',
//     keyId: 'cleDonjonRatBlanc',
//     name: 'Le Sanctuaire du Rat Blanc',
//     minLevel: 115, maxLevel: 115,
//     mobMinLevel: 115, mobMaxLevel: 115,
//     background: 'canyonsRatBlanc',
//     icon: 'img/monstres/sprites/ratBlanc.png',
//     description: "",
//     spawns: [{ id: 'rat_blanc', weight: 100 }],
//     lootTable: [
//         { itemId: 'pierreDameGardien', dropRate: 0.45 }
//     ]
// }
// ═══════════════════════════════════════════════════════
// DONJON BOUFMOUTH ROYAL
// areas.donjonBoufmouthRoyal = {
//     id: 'donjonBoufmouthRoyal',
//     type: 'dungeon',
//     keyId: 'cleDonjonBoufmouthRoyal',
//     name: 'La Fosse du Boufmouth Royal',
//     minLevel: 125, maxLevel: 125,
//     mobMinLevel: 125, mobMaxLevel: 125,
//     background: 'plainesBoufmouth',
//     icon: 'img/monstres/sprites/boufmouthRoyal.png',
//     description: "",
//     spawns: [{ id: 'royalmouth', weight: 100 }],
//     lootTable: [
//         { itemId: 'pierreDameGardien', dropRate: 0.45 }
//     ]
// }
// ═══════════════════════════════════════════════════════
// DONJON MANSOT ROYAL
// areas.donjonMansotRoyal = {
//     id: 'donjonMansotRoyal',
//     type: 'dungeon',
//     keyId: 'cleDonjonMansotRoyal',
//     name: 'La Mine du Mansot Royal',
//     minLevel: 125, maxLevel: 125,
//     mobMinLevel: 125, mobMaxLevel: 125,
//     background: 'galleriesMansot',
//     icon: 'img/monstres/sprites/mansotRoyal.png',
//     description: "",
//     spawns: [{ id: 'mansot_royal', weight: 100 }],
//     lootTable: [
//         { itemId: 'pierreDameGardien', dropRate: 0.45 }
//     ]
// }
// ═══════════════════════════════════════════════════════
// DONJON TOFU ROYAL
// areas.donjonTofuRoyal = {
//     id: 'donjonTofuRoyal',
//     type: 'dungeon',
//     keyId: 'cleDonjonTofuRoyal',
//     name: "L'Arbre du Tofu Royal",
//     minLevel: 135, maxLevel: 135,
//     mobMinLevel: 135, mobMaxLevel: 135,
//     background: 'foretTofuRoyal',
//     icon: 'img/monstres/sprites/tofuRoyal.png',
//     description: "",
//     spawns: [{ id: 'tofu_royal', weight: 100 }],
//     lootTable: [
//         { itemId: 'pierreDameGardien', dropRate: 0.45 }
//     ]
// }
// ═══════════════════════════════════════════════════════
// DONJON HELL MINA
// areas.donjonHellMina = {
//     id: 'donjonHellMina',
//     type: 'dungeon',
//     keyId: 'cleDonjonHellMina',
//     name: 'Les Fourrés de Hell Mina',
//     minLevel: 145, maxLevel: 145,
//     mobMinLevel: 145, mobMaxLevel: 145,
//     background: 'foretHellMina',
//     icon: 'img/monstres/sprites/hellMina.png',
//     description: "",
//     spawns: [{ id: 'hell_mina', weight: 100 }],
//     lootTable: [
//         { itemId: 'pierreDameGardien', dropRate: 0.45 }
//     ]
// }
// ═══════════════════════════════════════════════════════
// DONJON TRUCHE
// areas.donjonHauteTruche = {
//     id: 'donjonHauteTruche',
//     type: 'dungeon',
//     keyId: 'cleDonjonHauteTruche',
//     name: 'Le Sommet de la Haute Truche',
//     minLevel: 145, maxLevel: 145,
//     mobMinLevel: 145, mobMaxLevel: 145,
//     background: 'montagneTruche',
//     icon: 'img/monstres/sprites/hauteTruche.png',
//     description: "",
//     spawns: [{ id: 'haute_truche', weight: 100 }],
//     lootTable: [
//         { itemId: 'pierreDameGardien', dropRate: 0.45 }
//     ]
// }
// ═══════════════════════════════════════════════════════
// DONJON PHOSSILE
// areas.donjonPhossile = {
//     id: 'donjonPhossile',
//     type: 'dungeon',
//     keyId: 'cleDonjonPhossile',
//     name: 'La Crypte du Phossile',
//     minLevel: 155, maxLevel: 155,
//     mobMinLevel: 155, mobMaxLevel: 155,
//     background: 'grottesPhossiles',
//     icon: 'img/monstres/sprites/phossile.png',
//     description: "",
//     spawns: [{ id: 'phossile', weight: 100 }],
//     lootTable: [
//         { itemId: 'pierreDameGardien', dropRate: 0.45 }
//     ]
// }
// ═══════════════════════════════════════════════════════
// DONJON CHENE MOU
// areas.donjonCheneMou = {
//     id: 'donjonCheneMou',
//     type: 'dungeon',
//     keyId: 'cleDonjonCheneMou',
//     name: 'Le Cœur du Chêne Mou',
//     minLevel: 155, maxLevel: 155,
//     mobMinLevel: 155, mobMaxLevel: 155,
//     background: 'foretCheneMou',
//     icon: 'img/monstres/sprites/cheneMou.png',
//     description: "",
//     spawns: [{ id: 'chene_mou', weight: 100 }],
//     lootTable: [
//         { itemId: 'pierreDameGardien', dropRate: 0.45 }
//     ]
// }
// ═══════════════════════════════════════════════════════
// DONJON MINOTOT / MINOTOROR
// areas.donjonMinotot = {
//     id: 'donjonMinotot',
//     type: 'dungeon',
//     keyId: 'cleDonjonMinotot',
//     name: 'Le Dédale des Minotors',
//     minLevel: 165, maxLevel: 165,
//     mobMinLevel: 165, mobMaxLevel: 165,
//     background: 'labyrintheMinotots',
//     icon: 'img/monstres/sprites/minotot.png',
//     description: "",
//     bossMode: 'sequential',   // les 2 boss apparaissent l'un après l'autre (ordre aléatoire), tous deux requis
//     spawns: [
//         { id: 'minotot',   weight: 50 },
//         { id: 'minotoror', weight: 50 }
//     ],
//     lootTable: [
//         { itemId: 'pierreDameGardien', dropRate: 0.45 }
//     ]
// }
// ═══════════════════════════════════════════════════════
// DONJON OBSIDIANTRE
// areas.donjonObsidiantre = {
//     id: 'donjonObsidiantre',
//     type: 'dungeon',
//     keyId: 'cleDonjonObsidiantre',
//     name: "Le Creuset de l'Obsidiantre",
//     minLevel: 165, maxLevel: 165,
//     mobMinLevel: 165, mobMaxLevel: 165,
//     background: 'volcansObsidiantre',
//     icon: 'img/monstres/sprites/obsidiantre.png',
//     description: "",
//     spawns: [{ id: 'obsidiantre', weight: 100 }],
//     lootTable: [
//         { itemId: 'pierreDameGardien', dropRate: 0.45 }
//     ]
// }
// ═══════════════════════════════════════════════════════
// DONJON TENGU GIVREFOUX
// areas.donjonTenguGivrefoux = {
//     id: 'donjonTenguGivrefoux',
//     type: 'dungeon',
//     keyId: 'cleDonjonTenguGivrefoux',
//     name: 'Le Palais du Tengu Givrefoux',
//     minLevel: 175, maxLevel: 175,
//     mobMinLevel: 175, mobMaxLevel: 175,
//     background: 'sommetsTenguGivrefoux',
//     icon: 'img/monstres/sprites/tenguGivrefoux.png',
//     description: "",
//     bossMode: 'sequential',   // Fuji puis Tengu (ou l'inverse), tous deux requis
//     spawns: [
//         { id: 'fuji_givrefoux_nourriciere',  weight: 50 },
//         { id: 'tengu_givrefoux', weight: 50 }
//     ],
//     lootTable: [
//         { itemId: 'pierreDameGardien', dropRate: 0.45 }
//     ]
// }
// ═══════════════════════════════════════════════════════
// DONJON OUGAH
// areas.donjonOugah = {
//     id: 'donjonOugah',
//     type: 'dungeon',
//     keyId: 'cleDonjonOugah',
//     name: "La Caverne de l'Ougah",
//     minLevel: 185, maxLevel: 185,
//     mobMinLevel: 185, mobMaxLevel: 185,
//     background: 'jungleOugah',
//     icon: 'img/monstres/sprites/ougah.png',
//     description: "",
//     spawns: [{ id: 'ougah', weight: 100 }],
//     lootTable: [
//         { itemId: 'pierreDameGardien', dropRate: 0.45 }
//     ]
// }
// ═══════════════════════════════════════════════════════
// DONJON KOLOSSO / PROFESSEUR XA
// areas.donjonKolosso = {
//     id: 'donjonKolosso',
//     type: 'dungeon',
//     keyId: 'cleDonjonKolosso',
//     name: 'La Salle du Kolosso',
//     minLevel: 185, maxLevel: 185,
//     mobMinLevel: 185, mobMaxLevel: 185,
//     background: 'plainesKolosso',
//     icon: 'img/monstres/sprites/kolosso.png',
//     description: "",
//     bossMode: 'sequential',   // Kolosso puis Prof. Xa (ou l'inverse), tous deux requis
//     spawns: [
//         { id: 'professeur_xa', weight: 50 },
//         { id: 'kolosso',      weight: 50 }
//     ],
//     lootTable: [
//         { itemId: 'pierreDameGardien', dropRate: 0.45 }
//     ]
// }
// ═══════════════════════════════════════════════════════
// DONJON GLOURCELESTE
// areas.donjonGlourceleste = {
//     id: 'donjonGlourceleste',
//     type: 'dungeon',
//     keyId: 'cleDonjonGlourceleste',
//     name: "L'Abri du Gloucéleste",
//     minLevel: 195, maxLevel: 195,
//     mobMinLevel: 195, mobMaxLevel: 195,
//     background: 'cotesGlourceleste',
//     icon: 'img/monstres/sprites/glouceleste.png',
//     description: "",
//     spawns: [{ id: 'glourseleste', weight: 100 }],
//     lootTable: [
//         { itemId: 'pierreDameGardien', dropRate: 0.45 }
//     ]
// }
// ═══════════════════════════════════════════════════════
// DONJON HAREBOURG
// areas.donjonHarebourg = {
//     id: 'donjonHarebourg',
//     type: 'dungeon',
//     keyId: 'cleDonjonHarebourg',
//     name: 'Le Château Harebourg',
//     minLevel: 210, maxLevel: 210,
//     mobMinLevel: 210, mobMaxLevel: 210,
//     background: 'chateauHarebourg',
//     icon: 'img/monstres/sprites/comteHarebourg.png',
//     description: "",
//     spawns: [{ id: 'comte_harebourg', weight: 100 }],
//     lootTable: [
//         { itemId: 'pierreDameGardien', dropRate: 0.45 }
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
    icon: 'img/monstres/Events/dopeul_iop.png',
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
areas.evenementBiblop = {
    id: 'evenementBiblop',
    type: 'event',
    name: 'Invasion de Blops',
    minLevel: 25, maxLevel: 30,
    mobMinLevel: 25, mobMaxLevel: 30,
    background: 'Blop',
    icon: 'img/monstres/Events/biblop_griotte.png',
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
areas.evenementRobots = {
    id: 'evenementRobots',
    type: 'event',
    name: 'Régulation technologique',
    minLevel: 55, maxLevel: 65,
    mobMinLevel: 55, mobMaxLevel: 65,
    background: 'Cania',
    icon: 'img/monstres/Events/robionicle.png',
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
areas.evenementForetAstrub = {
    id: 'evenementForetAstrub',
    type: 'event',
    name: 'Attention au loup !',
    minLevel: 20, maxLevel: 35,
    mobMinLevel: 20, mobMaxLevel: 30,
    background: 'Foret_Astrub',
    icon: 'img/monstres/Events/milimulou.png',
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

// #region RAIDS ────────────────────────────────────────────────────────────────────────────
areas.raidDofusArgenté = {
    id: 'raidDofusArgenté',
    name: "Les débuts sont rudes",
    type: 'raid',
    minLevel: 15, maxLevel: 35,
    mobMinLevel: 35, mobMaxLevel: 35,
    background: "astrub",
    icon: "img/monstres/Raids/Rathrosk.png",
    description: "Rathrosk, surnommé la Main Grise, est bien plus qu'un simple dragon. Ancien bourreau des Dieux et protecteur d'Astrub, cette créature légendaire porte en elle les flammes d'Externam et les murmures des âmes disparues.Sous sa forme juvénille, il veille encore sur des reliques anciennes ainsi que sur le mystérieux Dofus Argenté",
    spawns: [
        { id: 'bouftouRoyal', weight: 10 },
        { id: 'mobLeponge', weight: 10 },
        { id: 'tournesolAffame', weight: 10 }
    ],
    miniBoss: { id: 'Rathrosk', everyKills: 6, statMult: 1 },
    miniBossLootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'Dofus_Argente', dropRate: 0.001 }
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
    icon: 'img/monstres/Events/gelee_fraise.png',
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
areas.raidTourbeduRoissingue = {
    id: 'raidTourbeduRoissingue',
    name: 'Raid de la tourbière du Roissingue',
    type: 'raid',
    minLevel: 100, maxLevel: 170,
    mobMinLevel: 100, mobMaxLevel: 110,
    background: 'tourbiere',
    icon: 'img/monstres/Raids/roissingue.png',
    description: "Au cœur de la Tourbière sans fond d'Otomaï s'étend le domaine du Roissingue, souverain grotesque d'un royaume noyé dans la boue et les eaux stagnantes. L'air y est lourd, chargé d'une odeur de moisissure et de tourbe humide, tandis que d'étranges créatures rôdent entre les marécages. Les aventuriers qui s'y aventurent racontent avoir aperçu des silhouettes simiesques vêtues de haillons trempés, riant dans l’obscurité avant de disparaître dans les brumes épaisses. Ici, chaque pas peut être le dernier… car la tourbière semble elle-même vouloir engloutir ceux qui osent troubler le règne du Roissingue.",
    spawns: [
        { id: 'LAouassingue',   weight: 15 },
        { id: 'LEouassingue',   weight: 15 },
        { id: 'tourbassingue',    weight: 35 },
        { id: 'bourbassingue',    weight: 35 }],
    miniBoss: {id: 'roissingue', everyKills: 10, statMult: 1},
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
areas.raidKralamoureGeant = {
    id: 'raidKralamoureGeant',
    name: 'Raid de l\'Antre du Kralamoure Géant',
    type: 'raid',
    minLevel: 180, maxLevel: 190,
    mobMinLevel: 180, mobMaxLevel: 180,
    background: 'Kralamoure',
    icon: 'img/monstres/Raids/KralamourGeant.png',
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
        { itemId: 'Dofus_Ocre',           dropRate: 0.005 }
    ]
}
// #endregion RAIDS