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
        { itemId: 'capeAventurier',    dropRate: 0.03 },
        { itemId: 'chapeauAventurier', dropRate: 0.03 },
        { itemId: 'anneauAventurier',  dropRate: 0.03 },
        { itemId: 'ceintureAventurier',dropRate: 0.03 },
        { itemId: 'amuletteAventurier',dropRate: 0.03 },
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
        { id: 'tournesolSauvage',     weight: 23 },
        { id: 'roseDemoniaque',       weight: 23 },
        { id: 'pissenliDiabolique',   weight: 23 },
        { id: 'epouvanteur',          weight: 21 },
        { id: 'gardienneChampetre',   weight: 10 }
    ],
    lootTable: [
        { itemId: 'pierreDame',       dropRate: 0.45 },
        { itemId: 'sac_paysan',       dropRate: 0.03 },
        { itemId: 'chapeau_paysan',   dropRate: 0.03 },
        { itemId: 'bottes_paysan',    dropRate: 0.03 },
        { itemId: 'anneau_paysan',    dropRate: 0.03 },
        { itemId: 'amulette_paysan',  dropRate: 0.03 },
        { itemId: 'ceinture_paysan',  dropRate: 0.03 },
        { itemId: 'faux_paysan',      dropRate: 0.02 },
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
        { itemId: 'bottes_mousse',     dropRate: 0.03 },
        { itemId: 'anneau_mousse',     dropRate: 0.03 },
        { itemId: 'amulette_mousse',   dropRate: 0.03 },
        { itemId: 'ceinture_mousse',   dropRate: 0.03 },
        { itemId: 'pelle_mousse',      dropRate: 0.03 },
        { itemId: 'bouclier_mousse',   dropRate: 0.03 },
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
        { id: 'bouftou',             weight: 23 },
        { id: 'bouftonBlanc',        weight: 23 },
        { id: 'bouftonNoir',         weight: 23 },
        { id: 'bouftouNoir',         weight: 21 },
        { id: 'bouftouChefDeGuerre', weight: 10 }
    ],
    lootTable: [
        { itemId: 'pierreDame',      dropRate: 0.45 },
        { itemId: 'cape_bouftou',     dropRate: 0.02 },
        { itemId: 'coiffe_bouftou',   dropRate: 0.02 },
        { itemId: 'bottes_bouftou',   dropRate: 0.02 },
        { itemId: 'marteau_bouftou',  dropRate: 0.02 },
        { itemId: 'anneau_bouftou',   dropRate: 0.02 },
        { itemId: 'amulette_bouftou', dropRate: 0.02 },
        { itemId: 'ceinture_bouftou', dropRate: 0.02 },
        { itemId: 'bouclier_bouftou', dropRate: 0.02 },
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
        { itemId: 'cape_scarafeuille_blanc',    dropRate: 0.02 },
        { itemId: 'coiffe_scarafeuille_blanc',  dropRate: 0.02 },
        { itemId: 'anneau_scarafeuille_blanc',  dropRate: 0.02 },
        { itemId: 'ceinture_scarafeuille_blanc',dropRate: 0.02 },
        { itemId: 'cape_scarafeuille_bleu',     dropRate: 0.02 },
        { itemId: 'coiffe_scarafeuille_bleu',   dropRate: 0.02 },
        { itemId: 'anneau_scarafeuille_bleu',   dropRate: 0.02 },
        { itemId: 'ceinture_scarafeuille_bleu', dropRate: 0.02 },
        { itemId: 'cape_scarafeuille_rouge',    dropRate: 0.02 },
        { itemId: 'coiffe_scarafeuille_rouge',  dropRate: 0.02 },
        { itemId: 'anneau_scarafeuille_rouge',  dropRate: 0.02 },
        { itemId: 'ceinture_scarafeuille_rouge',dropRate: 0.02 },
        { itemId: 'cape_scarafeuille_vert',     dropRate: 0.02 },
        { itemId: 'coiffe_scarafeuille_vert',   dropRate: 0.02 },
        { itemId: 'anneau_scarafeuille_vert',   dropRate: 0.02 },
        { itemId: 'ceinture_scarafeuille_vert', dropRate: 0.02 },
        { itemId: 'cape_scarafeuille_noir',     dropRate: 0.01 },
        { itemId: 'coiffe_scarafeuille_noir',   dropRate: 0.01 },
        { itemId: 'anneau_scarafeuille_noir',   dropRate: 0.01 },
        { itemId: 'ceinture_scarafeuille_noir', dropRate: 0.01 },
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
        { itemId: 'cape_kwak_vent',        dropRate: 0.01 },
        { itemId: 'coiffe_kwak_vent',      dropRate: 0.01 },
        { itemId: 'bottes_kwak_vent',      dropRate: 0.01 },
        { itemId: 'anneau_kwak_vent',      dropRate: 0.01 },
        { itemId: 'amulette_kwak_vent',    dropRate: 0.01 },
        { itemId: 'ceinture_kwak_vent',    dropRate: 0.01 },
        { itemId: 'epee_kwak_vent',        dropRate: 0.01 },
        { itemId: 'cape_kwak_glace',       dropRate: 0.01 },
        { itemId: 'coiffe_kwak_glace',     dropRate: 0.01 },
        { itemId: 'bottes_kwak_glace',     dropRate: 0.01 },
        { itemId: 'anneau_kwak_glace',     dropRate: 0.01 },
        { itemId: 'amulette_kwak_glace',   dropRate: 0.01 },
        { itemId: 'ceinture_kwak_glace',   dropRate: 0.01 },
        { itemId: 'epee_kwak_glace',       dropRate: 0.01 },
        { itemId: 'cape_kwak_flamme',      dropRate: 0.01 },
        { itemId: 'coiffe_kwak_flamme',    dropRate: 0.01 },
        { itemId: 'bottes_kwak_flamme',    dropRate: 0.01 },
        { itemId: 'anneau_kwak_flamme',    dropRate: 0.01 },
        { itemId: 'amulette_kwak_flamme',  dropRate: 0.01 },
        { itemId: 'ceinture_kwak_flamme',  dropRate: 0.01 },
        { itemId: 'epee_kwak_flamme',      dropRate: 0.01 },
        { itemId: 'cape_kwak_terre',       dropRate: 0.01 },
        { itemId: 'coiffe_kwak_terre',     dropRate: 0.01 },
        { itemId: 'bottes_kwak_terre',     dropRate: 0.01 },
        { itemId: 'anneau_kwak_terre',     dropRate: 0.01 },
        { itemId: 'amulette_kwak_terre',   dropRate: 0.01 },
        { itemId: 'ceinture_kwak_terre',   dropRate: 0.01 },
        { itemId: 'epee_kwak_terre',       dropRate: 0.01 },
        { itemId: 'cleDonjonKwakwa',       dropRate: 0.15, isKey: true }
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
    icon: 'img/monstres/sprites/kardorim.png',
    description: "Les profondeurs d’Incarnam, placées sous la vigilance du redoutable Kardorim, ancien capitaine devenu aventurier, sont toujours parcourues en compagnie de son fidèle compagnon.",
    spawns: [{ id: 'kardorim',    weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 },
        { itemId: 'coiffeKardorim',            dropRate: 0.08 },
        { itemId: 'anneauKardorim',            dropRate: 0.08 },
        { itemId: 'capeKardorim',              dropRate: 0.08 }
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
        { itemId: 'cape_mousse',       dropRate: 0.04 },
        { itemId: 'coiffe_mousse',     dropRate: 0.04 },
        { itemId: 'bottes_mousse',     dropRate: 0.05 },
        { itemId: 'anneau_mousse',     dropRate: 0.05 },
        { itemId: 'amulette_mousse',   dropRate: 0.05 },
        { itemId: 'ceinture_mousse',   dropRate: 0.05 },
        { itemId: 'pelle_mousse',      dropRate: 0.05 },
        { itemId: 'bouclier_mousse',   dropRate: 0.05 }
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
        { itemId: 'sac_paysan',       dropRate: 0.05 },
        { itemId: 'chapeau_paysan',   dropRate: 0.05 },
        { itemId: 'bottes_paysan',    dropRate: 0.05 },
        { itemId: 'anneau_paysan',    dropRate: 0.05 },
        { itemId: 'amulette_paysan',  dropRate: 0.05 },
        { itemId: 'ceinture_paysan',  dropRate: 0.05 },
        { itemId: 'faux_paysan',      dropRate: 0.04 }
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
        { itemId: 'cape_bouftou_royal',     dropRate: 0.03 },
        { itemId: 'coiffe_bouftou_royal',   dropRate: 0.03 },
        { itemId: 'bottes_bouftou_royal',   dropRate: 0.04 },
        { itemId: 'marteau_bouftou_royal',  dropRate: 0.04 },
        { itemId: 'anneau_bouftou_royal',   dropRate: 0.04 },
        { itemId: 'amulette_bouftou_royal', dropRate: 0.04 },
        { itemId: 'ceinture_bouftou_royal', dropRate: 0.04 },
        { itemId: 'bouclier_bouftou_royal', dropRate: 0.04 }
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
    icon: 'img/monstres/sprites/scrarabossDoree.png',
    description: "Sous la plaine des Scarafeuilles se cache une immense ruche souterraine gardée par la plus imposante et la plus dorée de toutes les créatures de son espèce : le Scraraboss Dorée. Il est dit que quiconque parviendrait à s'emparer de ses trésors dorés vivrait dans l'opulence pour le reste de sa vie. Aucun aventurier n'est revenu pour le confirmer.",
    spawns: [{ id: 'scrarabossDoree', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',          dropRate: 0.45 },
        { itemId: 'cape_scaraboss_doree',        dropRate: 0.04 },
        { itemId: 'coiffe_scaraboss_doree',      dropRate: 0.04 },
        { itemId: 'bottes_scaraboss_doree',      dropRate: 0.04 },
        { itemId: 'anneau_scaraboss_doree',      dropRate: 0.04 },
        { itemId: 'amulette_scaraboss_doree',    dropRate: 0.04 },
        { itemId: 'ceinture_scaraboss_doree',    dropRate: 0.04 },
        { itemId: 'baguette_scaraboss_doree',    dropRate: 0.03 }
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
        { itemId: 'kwakwaffe',         dropRate: 0.05 },
        { itemId: 'kwakwalliance',     dropRate: 0.05 },
        { itemId: 'kwakwanneau',       dropRate: 0.05 },
        { itemId: 'kwakwalame',        dropRate: 0.05 }
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
    description: "Des habitants ont rapportés qu'aux alentours du lac des blops se multiplient vitesse grand V... Essayez de stoper cette invasion tant qu'ils ne sont pas pleinement développés.",
    spawns: [
        { id: 'biblop_coco',     weight: 25 },
        { id: 'biblop_reinette', weight: 25 },
        { id: 'biblop_griotte',  weight: 25 },
        { id: 'biblop_indigo',   weight: 25 },
    ],
    lootTable: [
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
        { itemId: 'pierreDame',        dropRate: 0.45 },
    ]
}





// #endregion

// #region RAIDS ────────────────────────────────────────────────────────────────────────────
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
        { id: 'LAouassingue',   weight: 35 },
        { id: 'LEouassingue',   weight: 35 },
        { id: 'tourbassingue',    weight: 15 },
        { id: 'bourbassingue',    weight: 15 }],
    miniBoss: {id: 'roissingue', everyKills: 10, statMult: 1},
    lootTable: [
        { itemId: 'pierreDame',          dropRate: 0.35 },
        { itemId: 'cape_ouassingue',    dropRate: 0.03 },
        { itemId: 'coiffe_ouassingue',    dropRate: 0.03 },
        { itemId: 'bottes_ouassingue',    dropRate: 0.03 },
        { itemId: 'amulette_ouassingue',    dropRate: 0.03 }
    ],
    miniBossLootTable: [
        { itemId: 'pierreDameGardien',   dropRate: 0.45 },
        { itemId: 'cape_roissingue',    dropRate: 0.02 },
        { itemId: 'coiffe_roissingue',    dropRate: 0.02 },
        { itemId: 'anneau_roissingue',    dropRate: 0.02 }
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