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
    icon: 'images/monsters/Kardorim.png',
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
areas.donjonMantiscore = {
    id: 'donjonMantiscore',
    type: 'dungeon',
    keyId: 'cleDonjonMantiscore',
    name: "Cimetière des Mastodontes",
    minLevel: 75, maxLevel: 75,
    mobMinLevel: 75, mobMaxLevel: 75,
    background: 'desertMantiscore',
    icon: 'images/monsters/Mantiscore.png',
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
        { itemId: 'pierreDameGardien',    dropRate: 0.45 },
        { itemId: 'cape_du_dragon_cochon',   dropRate: 0.02 },
        { itemId: 'coiffe_du_dragon_cochon', dropRate: 0.02 },
        { itemId: 'kaiser',   dropRate: 0.02 },
        { itemId: 'Dofus_Turquoise',      dropRate: 0.0005}
    ]
}
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
        { itemId: 'Dofus_Ocre',           dropRate: 0.005 }
    ]
}
// #endregion RAIDS