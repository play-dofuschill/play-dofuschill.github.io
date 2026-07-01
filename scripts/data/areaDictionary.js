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
    background: "",
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
    background: "",
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
    background: "",
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

areas.campementDesGobs = {
    id: 'campementDesGobs',
    name: 'Campement des Gobs',
    minLevel: 20, maxLevel: 40,
    mobMinLevel: 20, mobMaxLevel: 30,
    background: '',
    icon: 'images/monsters/Gobet.png',
    description: "Les Gobets, petites créatures vertes au tempérament belliqueux, ont établi leurs quartiers ici avec une organisation surprenante. Tentes de fortune, braseros crépitants et chants gutturaux rythment la vie de ce campement où la hiérarchie se règle à coups de poing.",
    spawns: [
        { id: 'gobet', weight: 10 }, 
        { id: 'gobaliste', weight: 10 }, 
        { id: 'gob_trotteur', weight: 10 }, 
        { id: 'gobichon', weight: 10 }, 
        { id: 'gobaladee', weight: 5 }],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'amulette_de_gobeuf', dropRate: 0.01 }, 
        { itemId: 'ceinture_de_gobeuf', dropRate: 0.01 }, 
        { itemId: 'anneau_de_gobeuf', dropRate: 0.01 },
        { itemId: 'cleDonjonAcademieGobs', dropRate: 0.15, isKey: true }]
}

areas.attractionFantome = {
    id: 'attractionFantome',
    name: "Attraction fantôme",
    minLevel: 20,
    maxLevel: 40,
    mobMinLevel: 20,
    mobMaxLevel: 30,
    background: "",
    icon: "images/monsters/Boostache_Prépubère.png",
    description: "",
    spawns: [
        { id: 'boostache_prepubere', weight: 10 },
        { id: 'tofu_malefique', weight: 10 },
        { id: 'gargrouille', weight: 5 },
        { id: 'kwoan', weight: 10 },
        { id: 'vampire', weight: 10 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonBoostache', dropRate: 0.15, isKey: true },
        { itemId: 'ceinture_de_grouillot', dropRate: 0.01 },
        { itemId: 'bottes_de_grouillot', dropRate: 0.01 },
        { itemId: 'anneau_de_grouillot', dropRate: 0.01 },
        { itemId: 'bottes_du_vampyre', dropRate: 0.01 },
        { itemId: 'cape_du_vampyre', dropRate: 0.01 },
        { itemId: 'anneau_du_vampyre', dropRate: 0.01 },
        { itemId: 'ceinture_du_vampyre', dropRate: 0.01 },
        { itemId: 'masque_du_vampyre', dropRate: 0.01 },
        { itemId: 'amulette_du_vampyre', dropRate: 0.01 }
    ]
}

areas.scarafeuilles = {
    id: 'scarafeuilles',
    name: 'Plaine des scarafeuilles',
    minLevel: 30, maxLevel: 50,
    mobMinLevel: 30, mobMaxLevel: 40,
    background: "",
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
    icon: "images/monsters/Chafer_Fantassin.png",
    description: "Sous les dalles usées du cimetière s'étend un réseau de galeries oubliées, où les morts ne semblent jamais vraiment en paix. Les osselets craquent dans l'obscurité, et une lueur blafarde filtre entre les tombes descellées.",
    spawns: [
        { id: 'chafer', weight: 10 },
        { id: 'rib', weight: 10 },
        { id: 'chafer_invisible', weight: 10 },
        { id: 'chafer_fantassin', weight: 10 },
        { id: 'chafer_draugr', weight: 10 },
        { id: 'chafer_primitif', weight: 10 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonSquelettes', dropRate: 0.15, isKey: true },
        { itemId: 'anneau_de_kocksis', dropRate: 0.01 },
        { itemId: 'bottes_de_kocksis', dropRate: 0.01 },
        { itemId: 'ceinture_de_kocksis', dropRate: 0.01 },
        { itemId: 'botte_de_kalkaneus', dropRate: 0.01 },
        { itemId: 'slip_de_kalkaneus', dropRate: 0.01 },
        { itemId: 'amulette_de_kalkaneus', dropRate: 0.01 }
    ]
}

areas.grenierDeKerubim = {
    id: 'grenierDeKerubim',
    name: "Grenier de Kerubim",
    minLevel: 30, maxLevel: 50,
    mobMinLevel: 30, mobMaxLevel: 40,
    background: "",
    icon: "images/monsters/Cafarcher.png",
    description: "Le grenier de Kerubim Crepin, collectionneur excentrique d'Astrub, regorge de trésors poussiéreux et de souvenirs en tout genre. Malheureusement, les Cafarchets qui l'ont envahi depuis des années ne semblent pas disposés à partager l'espace avec les visiteurs.",
    spawns: [
        { id: 'cafarcher', weight: 10 },
        { id: 'pyrasite', weight: 10 },
        { id: 'mirgrillon', weight: 10 },
        { id: 'sakarien', weight: 10 },
        { id: 'ceglumen', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'anneau_bille', dropRate: 0.01 },
        { itemId: 'amulette_perle', dropRate: 0.01 },
        { itemId: 'cape_lumette', dropRate: 0.01 },
        { itemId: 'casque_noix', dropRate: 0.01 },
        { itemId: 'cleDonjonKankreblath', dropRate: 0.15, isKey: true }
    ]
}

areas.champsDesIngalsse = {
    id: 'champsDesIngalsse',
    name: "Champs des Ingalsse",
    minLevel: 30, maxLevel: 50,
    mobMinLevel: 30, mobMaxLevel: 40,
    background: "",
    icon: "images/monsters/Tofu.png",
    description: "Les Ingalsse ont tracé leurs sillons dans cette terre depuis des générations. Mais ces derniers temps, leurs récoltes attirent des visiteurs bien moins bienveillants que les marchands habituels, et les épouvantails eux-mêmes semblent avoir pris vie.",
    spawns: [
        { id: 'tofu', weight: 10 },
        { id: 'tofu_noir', weight: 10 },
        { id: 'tofoune', weight: 10 },
        { id: 'tofukaz', weight: 10 },
        { id: 'tofu_ventripotent', weight: 10 },
        { id: 'tofu_mutant', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonTofus', dropRate: 0.15, isKey: true },
        { itemId: 'anneau_du_tofu', dropRate: 0.01 },
        { itemId: 'amulette_du_tofu', dropRate: 0.01 },
        { itemId: 'ceinture_du_tofu', dropRate: 0.01 },
        { itemId: 'kaskofu', dropRate: 0.01 },
        { itemId: 'pantoufles_du_tofu', dropRate: 0.01 },
        { itemId: 'baguette_du_tofu', dropRate: 0.01 },
        { itemId: 'cape_du_tofu', dropRate: 0.01 }
    ]
}

areas.Kwaks = {
    id: 'Kwaks',
    name: 'Falaise des Kwaks',
    minLevel: 40, maxLevel: 60,
    mobMinLevel: 40, mobMaxLevel: 50,
    background: "",
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
    icon: "images/monsters/Bwork_Archer.png",
    description: "Les Bworks, cousins brutaux aux humeurs guerrières, ont planté leurs bannières sur ce lopin de terre rocailleux. Leurs rituels bruyants et leurs querelles intestines font de ce campement un endroit particulièrement peu recommandable.",
    spawns: [
        { id: 'bwork_archer', weight: 30 },
        { id: 'bwork_mage', weight: 30 },
        { id: 'bwork', weight: 30 },
        { id: 'troollaraj', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonBworks', dropRate: 0.15, isKey: true },
        { itemId: 'ceinture_de_grut', dropRate: 0.01 },
        { itemId: 'amulette_de_grut', dropRate: 0.01 },
        { itemId: 'bottes_de_grut', dropRate: 0.01 }
    ]
}

areas.territoireDesBandits = {
    id: 'territoireDesBandits',
    name: "Territoire des bandits",
    minLevel: 40, maxLevel: 60,
    mobMinLevel: 40, mobMaxLevel: 50,
    background: "",
    icon: "images/monsters/Boulanger_Sombre.png",
    description: "Les hors-la-loi qui échouent ici ne cherchent pas la rédemption. Derrière chaque rocher se cache un couteau, derrière chaque sourire une main vers la bourse. Ce territoire aux confins des routes commerciales est le repaire de ceux que la loi a abandonnés.",
    spawns: [
        { id: 'boulanger_sombre', weight: 10 },
        { id: 'mineur_sombre', weight: 10 },
        { id: 'forgeron_sombre', weight: 10 },
        { id: 'bandit_manchot', weight: 10 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonForgerons', dropRate: 0.15, isKey: true },
        { itemId: 'dagues_du_bandit', dropRate: 0.01 },
        { itemId: 'ceinture_du_bandit', dropRate: 0.01 },
        { itemId: 'amulette_du_bandit', dropRate: 0.01 },
        { itemId: 'anneau_du_bandit', dropRate: 0.01 },
        { itemId: 'ceinture_d_hulkrap', dropRate: 0.01 },
        { itemId: 'amulette_d_hulkrap', dropRate: 0.01 },
        { itemId: 'bottes_d_hulkrap', dropRate: 0.01 }
    ]
}

areas.coteDeCorail = {
    id: 'coteDeCorail',
    name: "Côte de corail",
    minLevel: 40, maxLevel: 60,
    mobMinLevel: 40, mobMaxLevel: 50,
    background: "",
    icon: "images/monsters/Crustorail_Kouraçao.png",
    description: "Les récifs de corail multicolores s'étendent à perte de vue sous des eaux d'un bleu éclatant. Magnifique à contempler, dangereuse à traverser : la faune marine qui peuple ces fonds n'apprécie guère les intrusions et le fait savoir.",
    spawns: [
        { id: 'crustorail_kouracao', weight: 10 },
        { id: 'crustorail_malibout', weight: 10 },
        { id: 'crustorail_passaoh', weight: 10 },
        { id: 'crustorail_morito', weight: 10 },
        { id: 'corailleur', weight: 10 },
        { id: 'palmifleur_kouracao', weight: 10 },
        { id: 'palmifleur_malibout', weight: 10 },
        { id: 'palmifleur_passaoh', weight: 10 },
        { id: 'palmifleur_morito', weight: 10 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonHesque', dropRate: 0.15, isKey: true },
        { itemId: 'ceinture_de_tracon', dropRate: 0.01 },
        { itemId: 'amulette_de_tracon', dropRate: 0.01 },
        { itemId: 'bottes_de_tracon', dropRate: 0.01 }
    ]
}

areas.prairiesAstrub = {
    id: 'prairiesAstrub',
    name: "Prairies d'Astrub",
    minLevel: 40, maxLevel: 60,
    mobMinLevel: 40, mobMaxLevel: 50,
    background: "",
    icon: "images/monsters/Larve_Bleue.png",
    description: "Les prairies qui s'étendent au pied d'Astrub sont le premier terrain d'aventure des nouveaux arrivants dans le Monde des Douze. L'herbe haute dissimule mille dangers à la mesure des débutants — mais même ici, la prudence reste de mise.",
    spawns: [
        { id: 'larve_bleue', weight: 10 },
        { id: 'larve_verte', weight: 10 },
        { id: 'larve_orange', weight: 10 },
        { id: 'larve_jaune', weight: 10 },
        { id: 'larve_saphir', weight: 5 },
        { id: 'larve_emeraude', weight: 5 },
        { id: 'larve_rubis', weight: 5 },
        { id: 'larve_doree', weight: 2 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonLarves', dropRate: 0.15, isKey: true },
        { itemId: 'larvamulette', dropRate: 0.01 },
        { itemId: 'larvasac', dropRate: 0.01 },
        { itemId: 'larvabottes', dropRate: 0.01 },
        { itemId: 'larvacoiffe', dropRate: 0.01 },
        { itemId: 'baguette_larvesque', dropRate: 0.01 },
        { itemId: 'libottes', dropRate: 0.01 },
        { itemId: 'collertue', dropRate: 0.01 }
    ]
}

areas.futaieEnneigee = {
    id: 'futaieEnneigee',
    name: "Futaie enneigée",
    minLevel: 40, maxLevel: 60,
    mobMinLevel: 40, mobMaxLevel: 50,
    background: "",
    icon: "images/monsters/Timongouste.png",
    description: "Les troncs tordus et décharnés de cette futaie émergent d'un manteau blanc immaculé. À Frigost, même les arbres semblent avoir renoncé à vivre — pourtant, dans l'ombre de ces bois figés, des créatures parfaitement adaptées au froid veillent.",
    spawns: [
        { id: 'timongouste', weight: 10 },
        { id: 'thomondor', weight: 10 },
        { id: 'buffalourd', weight: 10 },
        { id: 'grolours', weight: 10 },
        { id: 'trankilou', weight: 10 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonRefugeSylvestre', dropRate: 0.15, isKey: true },
        { itemId: 'alliance_des_rebelles', dropRate: 0.01 },
        { itemId: 'cape_des_rebelles', dropRate: 0.01 },
        { itemId: 'bottes_des_rebelles', dropRate: 0.01 },
        { itemId: 'ceinture_pomdeupin', dropRate: 0.01 },
        { itemId: 'anneau_pomdeupin', dropRate: 0.01 },
        { itemId: 'lance_de_trappeur_albueran', dropRate: 0.01 },
        { itemId: 'ceinture_de_trappeur_albueran', dropRate: 0.01 },
        { itemId: 'bottes_de_trappeur_albueran', dropRate: 0.01 }
    ]
}

areas.blops = {
    id: 'blops',
    name: 'Lac de Cania',
    minLevel: 50, maxLevel: 70,
    mobMinLevel: 50, mobMaxLevel: 60,
    background: "",
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
    icon: "images/monsters/Tiwabbit_Kiafin.png",
    description: "Bienvenue dans le royaume du Wabbit, l'ennemi intime des Enutrofs ! Cette île perdue dans l'océan est le fief de ces lapins diaboliques dont la ressemblance avec des créatures inoffensives n'a d'égal que leur malfaisance légendaire.",
    spawns: [
        { id: 'tiwabbit_kiafin', weight: 15 },
        { id: 'tiwabbit', weight: 15 },
        { id: 'black_tiwabbit', weight: 15 },
        { id: 'wabbit', weight: 15 },
        { id: 'black_wabbit', weight: 15 },
        { id: 'wo_wabbit', weight: 5 },
        { id: 'grand_pa_wabbit', weight: 5 },
        { id: 'wabbit_squelette', weight: 5 },
        { id: 'black_wabbit_squelette', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonWabbit', dropRate: 0.15, isKey: true },
        { itemId: 'slip_kangouwou_du_wabbit_gm', dropRate: 0.01 },
        { itemId: 'amulette_dents_de_wabbits', dropRate: 0.01 },
        { itemId: 'taille_haie_primitif_du_wobot', dropRate: 0.01 },
        { itemId: 'oreilles_de_wabbits', dropRate: 0.01 },
        { itemId: 'sac_cawotte', dropRate: 0.01 },
        { itemId: 'tongues_wabbits', dropRate: 0.01 },
        { itemId: 'ceinture_du_black_wab', dropRate: 0.01 },
        { itemId: 'bottines_du_black_wab', dropRate: 0.01 },
    ]
}

areas.foretDesMasques = {
    id: 'foretDesMasques',
    name: "Forêt des masques",
    minLevel: 50, maxLevel: 70,
    mobMinLevel: 50, mobMaxLevel: 60,
    background: "",
    icon: "images/monsters/Kanniboul_Ark.png",
    description: "Dans cette forêt, les visages sculptés dans les troncs semblent vous suivre du regard. Les Masques qui y vivent sont les gardiens ancestraux de secrets anciens, et ils n'ont aucune intention de partager leur territoire avec les étrangers.",
    spawns: [
        { id: 'kanniboul_ark', weight: 10 },
        { id: 'kanniboul_eth', weight: 10 },
        { id: 'kanniboul_jav', weight: 10 },
        { id: 'kanniboul_sarbak', weight: 10 },
        { id: 'kanniboul_tam', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonKanniboul', dropRate: 0.15, isKey: true },
        { itemId: 'amulette_de_laikteur', dropRate: 0.01 },
        { itemId: 'anneau_de_laikteur', dropRate: 0.01 },
        { itemId: 'bottes_de_laikteur', dropRate: 0.01 }
    ]
}

areas.tourbieresSansFond = {
    id: 'tourbieresSansFond',
    name: "Tourbière sans fonds",
    minLevel: 50, maxLevel: 70,
    mobMinLevel: 50, mobMaxLevel: 60,
    background: "",
    icon: "images/monsters/Sparo.png",
    description: "La boue noire de ces tourbières a englouti plus d'un aventurier imprudent. Dans les vapeurs verdâtres qui s'en dégagent, des formes visqueuses se déplacent avec une lenteur trompeuse — chaque pas ici peut être le dernier.",
    spawns: [
        { id: 'sparo', weight: 20 },
        { id: 'barbroussa', weight: 20 },
        { id: 'le_flib', weight: 20 },
        { id: 'boomba', weight: 5 },
        { id: 'nakunbra', weight: 5 },
        { id: 'canondorf', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonOtomaj', dropRate: 0.15, isKey: true },
        { itemId: 'alliance_d_hichete', dropRate: 0.01 },
        { itemId: 'ceinture_d_hichete', dropRate: 0.01 },
        { itemId: 'amulette_d_hichete', dropRate: 0.01 },
        { itemId: 'anneau_du_kitsou', dropRate: 0.01 },
        { itemId: 'amulette_du_kitsou', dropRate: 0.01 },
        { itemId: 'coiffe_du_kitsou', dropRate: 0.01 },
        { itemId: 'cape_du_kitsou', dropRate: 0.01 }
    ]
}

areas.plateauMantiscore = {
    id: 'plateauMantiscore',
    name: 'Désert de Saharash',
    minLevel: 60, maxLevel: 80,
    mobMinLevel: 60, mobMaxLevel: 70,
    background: "",
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
    icon: "images/monsters/Craqueboule.png",
    description: "Les Craqueleurs se camouflent parmi les rochers de cette montagne avec une facilité déconcertante. Leur carapace minérale les rend presque impossibles à distinguer de la pierre... jusqu'à ce qu'ils bougent, et qu'il soit trop tard.",
    spawns: [
        { id: 'craqueboule', weight: 10 },
        { id: 'craquelourd', weight: 10 },
        { id: 'craqueleur', weight: 10 },
        { id: 'craqueleur_des_plaines', weight: 10 },
        { id: 'craquelope', weight: 10 },
        { id: 'elementerre', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonCraqueleurs', dropRate: 0.15, isKey: true },
        { itemId: 'craquamulette', dropRate: 0.01 },
        { itemId: 'bottes_du_craqueleur', dropRate: 0.01 },
        { itemId: 'ceinture_du_craqueleur', dropRate: 0.01 },
        { itemId: 'craquelocape', dropRate: 0.01 },
        { itemId: 'casque_du_craqueleur', dropRate: 0.01 },
        { itemId: 'bouclier_du_craqueleur', dropRate: 0.01 },
        { itemId: 'lame_du_craqueleur', dropRate: 0.01 }
    ]
}

areas.desolationDeSidimote = {
    id: 'desolationDeSidimote',
    name: "Désolation de sidimote",
    minLevel: 60, maxLevel: 80,
    mobMinLevel: 60, mobMaxLevel: 70,
    background: "",
    icon: "images/monsters/Scorbute.png",
    description: "Rien ne pousse dans la Désolation de Sidimote. Pas d'herbe, pas d'arbres, pas même de mousse. Cette plaine aride et craquelée semble avoir subi une catastrophe ancienne dont les cicatrices ne se refermeront jamais.",
    spawns: [
        { id: 'scorbute', weight: 10 },
        { id: 'croc_gland', weight: 10 },
        { id: 'kolerat', weight: 10 },
        { id: 'crowneille', weight: 10 },
        { id: 'macien', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonBrumen', dropRate: 0.15, isKey: true },
        { itemId: 'casque_du_scorbute', dropRate: 0.01 },
        { itemId: 'cape_du_scorbute', dropRate: 0.01 },
        { itemId: 'amulette_du_scorbute', dropRate: 0.01 },
        { itemId: 'amulette_d_ougicle', dropRate: 0.01 },
        { itemId: 'anneau_d_ougicle', dropRate: 0.01 },
        { itemId: 'ceinture_d_ougicle', dropRate: 0.01 },
        { itemId: 'cape_ouginak', dropRate: 0.01 },
        { itemId: 'ceinture_ouginakale', dropRate: 0.01 }
    ]
}

areas.nidsDragaeufs = {
    id: 'nidsDragaeufs',
    name: "Nids des Dragoeufs",
    minLevel: 70, maxLevel: 90,
    mobMinLevel: 70, mobMaxLevel: 80,
    background: "",
    icon: "images/monsters/Dragoeuf_Ardoise.png",
    description: "À l'abri des regards, au Sud de la foret maléfique, se trouve le Nid des Dragoeufs. Ces terres brûlées par le souffle des dragons était jadis une forêt luxuriante. A présent elles sont le refuge de leurs descendants, de puissantes créatures veillant farouchement sur leurs œufs et leur territoire.",
    spawns: [
        { id: 'dragoeufArdoise', weight: 22 },
        { id: 'dragoeufArgile', weight: 22 },
        { id: 'dragoeufCalcaire', weight: 22 },
        { id: 'dragoeufCharbon', weight: 22 },
        { id: 'dragoeufAlbatre', weight: 12 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'sabots_de_shika', dropRate: 0.01 },
        { itemId: 'bracelet_magique_de_shika', dropRate: 0.01 },
        { itemId: 'epis_de_shika', dropRate: 0.01 },
        { itemId: 'shikature', dropRate: 0.01 },
        { itemId: 'cleDonjonDraegnerys', dropRate: 0.15, isKey: true }
    ]
}

areas.souterrainsWabbits = {
    id: 'souterrainsWabbits',
    name: "Souterrains Wabbits",
    minLevel: 70, maxLevel: 90,
    mobMinLevel: 70, mobMaxLevel: 80,
    background: "",
    icon: "images/monsters/Wobot.png",
    description: "Sous l'île des Wabbits s'étend un labyrinthe de galeries creusées par des générations de rongeurs acharnés. L'obscurité y est totale, et les yeux brillants qui vous observent depuis les terriers n'annoncent rien de bon.",
    spawns: [
        { id: 'wobot', weight: 10 },
        { id: 'black_wo_wabbit', weight: 10 },
        { id: 'wobot_kiafin', weight: 10 },
        { id: 'blanc_pa_wabbit', weight: 10 },
        { id: 'tiwobot', weight: 10 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonTerrierWabbit', dropRate: 0.15, isKey: true },
        { itemId: 'casque_du_blanc_pa_wabbit', dropRate: 0.01 },
        { itemId: 'ceinture_du_blanc_pa_wabbit', dropRate: 0.01 },
        { itemId: 'bracelet_du_blanc_pa_wabbit', dropRate: 0.01 }
    ]
}

areas.foretAbraknydes = {
    id: 'foretAbraknydes',
    name: "Forêt des Abraknydes",
    minLevel: 80, maxLevel: 100,
    mobMinLevel: 80, mobMaxLevel: 90,
    background: "",
    icon: "images/monsters/Abrakne_Sombre.png",
    description: "À l'ouest d'Astrub s'étend l'un des derniers vestiges de la forêt originelle qui recouvrait autrefois Amakna : la Forêt des Abraknydes. Épargnée par les flammes et les haches des hommes, cette étendue sauvage demeure un lieu de mystères où la nature n'a jamais accepté la présence des civilisations.",
    spawns: [
        { id: 'abrakneSombre', weight: 20 },
        { id: 'abraknydeSombre', weight: 20 },
        { id: 'araknotron', weight: 20 },
        { id: 'abraknyde', weight: 20 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonAbraknydeAncestral', dropRate: 0.15, isKey: true },
        { itemId: 'abrarc', dropRate: 0.01 },
        { itemId: 'abracape', dropRate: 0.01 },
        { itemId: 'abranneau', dropRate: 0.01 },
        { itemId: 'abramu', dropRate: 0.01 },
        { itemId: 'abranneau_mou', dropRate: 0.01 }
    ]
}

areas.canyonSauvage = {
    id: 'canyonSauvage',
    name: "Canyon sauvage",
    minLevel: 80, maxLevel: 100,
    mobMinLevel: 80, mobMaxLevel: 90,
    background: "",
    icon: "images/monsters/Koalak_Immature.png",
    description: "Les parois de grès rouge de ce canyon encaissé résonnent d'échos étranges. Le vent s'y engouffre comme un hurlement, et les créatures qui habitent ces ravines ont appris à en exploiter chaque recoin à leur avantage.",
    spawns: [
        { id: 'koalak_immature', weight: 10 },
        { id: 'mama_koalak', weight: 10 },
        { id: 'warko_marron', weight: 10 },
        { id: 'dok_alako', weight: 10 },
        { id: 'piralak', weight: 10 },
        { id: 'drakoalak', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonKoulosse', dropRate: 0.15, isKey: true },
        { itemId: 'anneau_du_koalak', dropRate: 0.01 },
        { itemId: 'amulette_du_koalak', dropRate: 0.01 },
        { itemId: 'bottes_du_koalak', dropRate: 0.01 },
        { itemId: 'ceinture_du_koalak', dropRate: 0.01 },
        { itemId: 'coiffe_du_koalak', dropRate: 0.01 },
        { itemId: 'arc_du_koalak', dropRate: 0.01 },
        { itemId: 'cape_du_koalak', dropRate: 0.01 }
    ]
}

areas.boisDesArakhai = {
    id: 'boisDesArakhai',
    name: "Bois des arak_haï",
    minLevel: 80, maxLevel: 100,
    mobMinLevel: 80, mobMaxLevel: 90,
    background: "",
    icon: "images/monsters/Arapex.png",
    description: "L'air dans ces bois est chargé d'une humidité poisseuse et de fils de soie quasi invisibles. Les Arakhaï, araignées aux yeux multiples, ont tissé leurs toiles entre chaque branche, attendant patiemment que leurs proies trébuchent dans leurs pièges.",
    spawns: [
        { id: 'arapex', weight: 10 },
        { id: 'dardalaine', weight: 10 },
        { id: 'nefileuse', weight: 10 },
        { id: 'saltik', weight: 10 },
        { id: 'gargantul', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonReineNyee', dropRate: 0.15, isKey: true },
        { itemId: 'coiffe_de_la_nefileuse', dropRate: 0.01 },
        { itemId: 'anneau_tisse', dropRate: 0.01 },
        { itemId: 'bottes_soyeuses', dropRate: 0.01 }
    ]
}

areas.cheminDuCrane = {
    id: 'cheminDuCrane',
    name: "Chemin du crâne",
    minLevel: 80, maxLevel: 100,
    mobMinLevel: 80, mobMaxLevel: 90,
    background: "",
    icon: "images/monsters/Boomba.png",
    description: "Ce sentier sinistre doit son nom aux crânes blanchis plantés à chaque carrefour — des avertissements laissés par ceux qui ont survécu... ou par ceux qui ont prospéré dans ces lieux. Dans tous les cas, le message est clair.",
    spawns: [
        { id: 'boomba', weight: 10 },
        { id: 'nakunbra', weight: 10 },
        { id: 'canondorf', weight: 10 },
        { id: 'ricanif', weight: 10 },
        { id: 'ivremor', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonChouque', dropRate: 0.15, isKey: true },
        { itemId: 'bouclier_du_chouque', dropRate: 0.01 },
        { itemId: 'cape_du_capitaine_pirate', dropRate: 0.01 },
        { itemId: 'chapeau_du_capitaine_pirate', dropRate: 0.01 },
        { itemId: 'alliance_du_capitaine_pirate', dropRate: 0.01 }
    ]
}

areas.routeDesRoulottes = {
    id: 'routeDesRoulottes',
    name: "Route des roulottes",
    minLevel: 80, maxLevel: 100,
    mobMinLevel: 80, mobMaxLevel: 90,
    background: "",
    icon: "images/monsters/Bozoteur.png",
    description: "Autrefois animée par les marchands et les saltimbanques, cette route est maintenant infestée de brigands et de créatures sauvages. Les roulottes abandonnées au bord du chemin témoignent du sort réservé aux voyageurs imprudents.",
    spawns: [
        { id: 'bozoteur', weight: 10 },
        { id: 'tivelo', weight: 10 },
        { id: 'pirolienne', weight: 10 },
        { id: 'roukouto', weight: 10 },
        { id: 'graboule', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonMagikRiktus', dropRate: 0.15, isKey: true },
        { itemId: 'anneau_riktus', dropRate: 0.01 },
        { itemId: 'cape_riktus', dropRate: 0.01 },
        { itemId: 'masque_riktus', dropRate: 0.01 },
        { itemId: 'masque_de_choudini', dropRate: 0.01 },
        { itemId: 'bouclier_de_choudini', dropRate: 0.01 },
        { itemId: 'bottes_de_choudini', dropRate: 0.01 }
    ]
}

areas.fermeDragonCochon = {
    id: 'fermeDragonCochon',
    name: "Territoire des porcos",
    minLevel: 90, maxLevel: 110,
    mobMinLevel: 90, mobMaxLevel: 100,
    background: "",
    icon: "images/monsters/Cochon_de_Farle.png",
    description: "Entre les enclos délabrés, les fortifications de fortune et les sentiers creusés dans la terre grasse, des hordes de porcos patrouillent sans relâche pour protéger leur domaine. Gare à l'aventurier qui s'y aventure sans préparation : les habitants de ces terres n'apprécient guère les intrus et règlent généralement les différends à grands coups de groin.",
    spawns: [
        { id: 'cochonDeFarle', weight: 20 },
        { id: 'donDorgan', weight: 20 },
        { id: 'donDussAng', weight: 20 },
        { id: 'porsalu', weight: 20 },
        { id: 'gorgouille', weight: 4 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonDragonCochon', dropRate: 0.15, isKey: true },
        { itemId: 'amulette_du_gorgouille', dropRate: 0.01 },
        { itemId: 'gantelet_du_gorgouille', dropRate: 0.01 },
        { itemId: 'cape_du_gorgouille', dropRate: 0.01 },
        { itemId: 'bottes_du_gorgouille', dropRate: 0.01 }
    ]
}

areas.hautDesHurlements = {
    id: 'hautDesHurlements',
    name: "Haut des hurlements",
    minLevel: 90, maxLevel: 110,
    mobMinLevel: 90, mobMaxLevel: 100,
    background: "",
    icon: "images/monsters/Mulou.png",
    description: "Personne ne sait vraiment d'où viennent ces hurlements qui déchirent la nuit sur ces hauteurs. Certains disent que c'est le vent s'engouffrant dans les crevasses, d'autres murmurent que ce sont les âmes de ceux qui n'en sont jamais redescendus.",
    spawns: [
        { id: 'mulou', weight: 10 },
        { id: 'mulounoke', weight: 10 },
        { id: 'mergranlou', weight: 10 },
        { id: 'cocholou', weight: 10 },
        { id: 'muloubard', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonMeulou', dropRate: 0.15, isKey: true },
        { itemId: 'string_du_mulou', dropRate: 0.01 },
        { itemId: 'anneau_du_mulou', dropRate: 0.01 },
        { itemId: 'hache_du_mulou', dropRate: 0.01 },
        { itemId: 'amuloumulette', dropRate: 0.01 },
        { itemId: 'bottines_du_mulou', dropRate: 0.01 },
        { itemId: 'coiffe_du_mulou', dropRate: 0.01 },
        { itemId: 'cape_du_mulou', dropRate: 0.01 },
        { itemId: 'pagne_du_muloubar', dropRate: 0.01 },
        { itemId: 'cape_du_muloubar', dropRate: 0.01 },
        { itemId: 'coiffe_du_muloubar', dropRate: 0.01 }
    ]
}

areas.plainesHerbeuses = {
    id: 'plainesHerbeuses',
    name: "Plaines Herbeuses",
    minLevel: 90, maxLevel: 110,
    mobMinLevel: 90, mobMaxLevel: 100,
    background: "",
    icon: "images/monsters/Craqueboule_Poli.png",
    description: "À première vue, ces plaines paisibles semblent idéales pour une promenade tranquille. L'herbe haute se balance doucement, le ciel est dégagé… Mais les créatures tapies dans cette végétation ne partagent pas votre sérénité.",
    spawns: [
        { id: 'craqueboule_poli', weight: 10 },
        { id: 'craqueleur_poli', weight: 10 },
        { id: 'bitouf_des_plaines', weight: 10 },
        { id: 'mufafah', weight: 10 },
        { id: 'kilibriss', weight: 10 },
        { id: 'kido', weight: 10 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonRasboul', dropRate: 0.15, isKey: true },
        { itemId: 'anneau_poli', dropRate: 0.01 },
        { itemId: 'kidorteau', dropRate: 0.01 },
        { itemId: 'amufafah', dropRate: 0.01 },
        { itemId: 'epis_de_farle', dropRate: 0.01 },
        { itemId: 'cape_de_farle', dropRate: 0.01 },
        { itemId: 'fourche_de_farle', dropRate: 0.01 },
        { itemId: 'farlacoiffe', dropRate: 0.01 },
        { itemId: 'bracelet_magique_de_farle', dropRate: 0.01 },
        { itemId: 'farlature', dropRate: 0.01 },
        { itemId: 'sabots_de_farle', dropRate: 0.01 }
    ]
}

areas.ileDeKartonpath = {
    id: 'ileDeKartonpath',
    name: "Ile de Kartonpath",
    minLevel: 90, maxLevel: 110,
    mobMinLevel: 90, mobMaxLevel: 100,
    background: "",
    icon: "images/monsters/Rhinoféroce.png",
    description: "L'Île de Kartonpath, coincée entre les courants de la Mer de Cania et les vents violents du nord, est réputée aussi fragile que dangereuse. Ses falaises friables s'effritent sous les pas, et la faune qui s'y est adaptée l'est tout autant.",
    spawns: [
        { id: 'rhinoferoce', weight: 10 },
        { id: 'molette', weight: 10 },
        { id: 'gobvious', weight: 10 },
        { id: 'bouledogre', weight: 10 },
        { id: 'dramak', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonDramak', dropRate: 0.15, isKey: true },
        { itemId: 'brighellaniere', dropRate: 0.01 },
        { itemId: 'scaramouchapeau', dropRate: 0.01 },
        { itemId: 'arc_lequin', dropRate: 0.01 }
    ]
}

areas.jungleInterdite = {
    id: 'jungleInterdite',
    name: "Jungle Interdite",
    minLevel: 90, maxLevel: 110,
    mobMinLevel: 90, mobMaxLevel: 100,
    background: "",
    icon: "images/monsters/Trukikol.png",
    description: "L'accès à cette jungle est officiellement proscrit depuis l'incident qu'on ne nomme plus à Pandala. Les lianes qui en obstruent l'entrée semblent pousser plus vite dès que l'on tente de les écarter, comme si la forêt elle-même refusait les intrus.",
    spawns: [
        { id: 'trukikol', weight: 10 },
        { id: 'gloutovore', weight: 10 },
        { id: 'fourbasse', weight: 10 },
        { id: 'dostrogo', weight: 10 },
        { id: 'domoizelle', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonMoon', dropRate: 0.15, isKey: true },
        { itemId: 'fourbacoiffe', dropRate: 0.01 },
        { itemId: 'fourbacapa', dropRate: 0.01 },
        { itemId: 'fourbabottes', dropRate: 0.01 },
        { itemId: 'fourbasse_ton', dropRate: 0.01 },
        { itemId: 'ceinture_fourbissante', dropRate: 0.01 },
        { itemId: 'fourbamulette', dropRate: 0.01 },
        { itemId: 'fourballiance', dropRate: 0.01 }
    ]
}

areas.villageDragoeufs = {
    id: 'villageDragoeufs',
    name: "Village des Dragoeufs",
    minLevel: 90, maxLevel: 110,
    mobMinLevel: 90, mobMaxLevel: 100,
    background: "",
    icon: "images/monsters/Dragoss_Calcaire.png",
    description: "Au cœur de l'île de Moon, ce village bariolé sent la poudre et le soufre. Les Dragoeufs y règnent en maîtres, couvant leurs œufs avec une jalousie féroce. Gare à celui qui s'approche d'un nid sans en avoir reçu la permission.",
    spawns: [
        { id: 'dragoss_calcaire', weight: 10 },
        { id: 'dragoss_argile', weight: 10 },
        { id: 'dragoss_ardoise', weight: 10 },
        { id: 'dragoss_charbon', weight: 10 },
        { id: 'dragoss_proteiforme', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonKharnozor', dropRate: 0.15, isKey: true },
        { itemId: 'pagne_de_daigoro', dropRate: 0.01 },
        { itemId: 'coiffe_de_daigoro', dropRate: 0.01 },
        { itemId: 'collier_rouge_de_daigoro', dropRate: 0.01 },
        { itemId: 'baton_de_daigoro', dropRate: 0.01 }
    ]
}

areas.penatesDuCorbac = {
    id: 'penatesDuCorbac',
    name: "Pénates du corbac",
    minLevel: 100, maxLevel: 120,
    mobMinLevel: 100, mobMaxLevel: 110,
    background: "",
    icon: "images/monsters/Renarbo.png",
    description: "Les Corbacs ont établi leurs pénates dans ces collines venteuses depuis des temps immémoriaux. Leur caquètement strident résonne entre les rochers, et leurs becs acérés ont défendu ce territoire contre bien des prédateurs.",
    spawns: [
        { id: 'renarbo', weight: 10 },
        { id: 'buveur', weight: 10 },
        { id: 'corbac', weight: 10 },
        { id: 'corbac_dresse', weight: 10 },
        { id: 'kapotie_le_buveur', weight: 10 },
        { id: 'horace_le_corbac_apprivoise', weight: 10 },
        { id: 'rono_le_renarbo', weight: 10 },
        { id: 'capsaaloocke', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonCorbac', dropRate: 0.15, isKey: true },
        { itemId: 'corbottes', dropRate: 0.01 },
        { itemId: 'corbacoiffe', dropRate: 0.01 },
        { itemId: 'corbacape', dropRate: 0.01 },
        { itemId: 'corbalame', dropRate: 0.01 }
    ]
}

areas.egoutsDeBonta = {
    id: 'egoutsDeBonta',
    name: "Égouts de Bonta",
    minLevel: 100, maxLevel: 120,
    mobMinLevel: 100, mobMaxLevel: 110,
    background: "",
    icon: "images/monsters/Scélée_Rate.png",
    description: "Sous les rues propres et ordonnées de Bonta coule un monde bien moins reluisant. Les égouts de la cité de lumière sont le refuge des marginaux, des créatures rampantes et de tout ce que la surface préfère oublier.",
    spawns: [
        { id: 'scelee_rate', weight: 10 },
        { id: 'chak_rat', weight: 10 },
        { id: 'capoei_rat', weight: 10 },
        { id: 'chika_rat', weight: 10 },
        { id: 'aloevee_rate', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonRatBlanc', dropRate: 0.15, isKey: true },
        { itemId: 'bottes_du_rat_blanc', dropRate: 0.01 },
        { itemId: 'gant_du_rat_blanc', dropRate: 0.01 },
        { itemId: 'cape_du_rat_blanc', dropRate: 0.01 },
        { itemId: 'ceinture_du_rat_blanc', dropRate: 0.01 },
        { itemId: 'collier_du_rat_blanc', dropRate: 0.01 },
        { itemId: 'couvre_chef_du_rat_blanc', dropRate: 0.01 },
        { itemId: 'rapiere_du_rat_blanc', dropRate: 0.01 }
    ]
}

areas.egoutsDeBrakmar = {
    id: 'egoutsDeBrakmar',
    name: "Égouts de Brâkmar",
    minLevel: 100, maxLevel: 120,
    mobMinLevel: 100, mobMaxLevel: 110,
    background: "",
    icon: "images/monsters/Rat_Plapla.png",
    description: "Brakmar est une ville sombre en surface ; ses égouts le sont encore davantage. L'air y est irrespirable, les murs suintent d'un liquide douteux, et les créatures qui y vivent ont depuis longtemps perdu toute trace d'innocence.",
    spawns: [
        { id: 'rat_plapla', weight: 10 },
        { id: 'rat_li', weight: 10 },
        { id: 'rat_sio', weight: 10 },
        { id: 'rate_atinee', weight: 10 },
        { id: 'rate_iboisee', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonRatNoir', dropRate: 0.15, isKey: true },
        { itemId: 'gant_du_rat_noir', dropRate: 0.01 },
        { itemId: 'bottes_du_rat_noir', dropRate: 0.01 },
        { itemId: 'ceinture_du_rat_noir', dropRate: 0.01 },
        { itemId: 'masque_du_rat_noir', dropRate: 0.01 },
        { itemId: 'collier_du_rat_noir', dropRate: 0.01 },
        { itemId: 'cape_du_rat_noir', dropRate: 0.01 },
        { itemId: 'dagues_du_rat_noir', dropRate: 0.01 }
    ]
}

areas.plantala = {
    id: 'plantala',
    name: "Plantala",
    minLevel: 100, maxLevel: 120,
    mobMinLevel: 100, mobMaxLevel: 110,
    background: "",
    icon: "images/monsters/Bambouto.png",
    description: "Dans ce coin de Pandala où la végétation a pris le dessus sur tout le reste, des plantes d'une taille inhabituelle s'enracinent dans un sol gorgé de sève arcanique. Elles ont développé conscience et mauvais caractère — un mélange explosif.",
    spawns: [
        { id: 'bambouto', weight: 10 },
        { id: 'floristile', weight: 10 },
        { id: 'bulbuisson', weight: 10 },
        { id: 'bulbiflore', weight: 10 },
        { id: 'grenufar', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonDamadrya', dropRate: 0.15, isKey: true },
        { itemId: 'cape_terrdala', dropRate: 0.01 },
        { itemId: 'bouclier_terrdala', dropRate: 0.01 },
        { itemId: 'chapeau_terrdala', dropRate: 0.01 },
        { itemId: 'geta_terrdala', dropRate: 0.01 },
        { itemId: 'alliance_terrdala', dropRate: 0.01 },
        { itemId: 'amulette_terrdala', dropRate: 0.01 },
        { itemId: 'ceinture_terrdala', dropRate: 0.01 },
        { itemId: 'hache_terrdala', dropRate: 0.01 }
    ]
}

areas.ileDuMinotoror = {
    id: 'ileDuMinotoror',
    name: "Ile du Minotoror",
    minLevel: 110, maxLevel: 130,
    mobMinLevel: 110, mobMaxLevel: 120,
    background: "",
    icon: "images/monsters/Gamino.png",
    description: "L'île du Minotoror est un labyrinthe naturel de falaises et de grottes où se perd volontiers quiconque s'y aventure sans guide. La bête qui lui donne son nom en est à la fois le geôlier et le souverain incontesté.",
    spawns: [
        { id: 'gamino', weight: 10 },
        { id: 'serpiplume', weight: 10 },
        { id: 'scaratos', weight: 10 },
        { id: 'minoskito', weight: 10 },
        { id: 'mandrine', weight: 10 },
        { id: 'kramelehon', weight: 10 },
        { id: 'mominotor', weight: 3 },
        { id: 'deminoboule', weight: 3 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonMinotoror', dropRate: 0.15, isKey: true },
        { itemId: 'bottes_du_mominotor', dropRate: 0.01 },
        { itemId: 'coiffe_du_mominotor', dropRate: 0.01 },
        { itemId: 'alliance_du_mominotor', dropRate: 0.01 },
        { itemId: 'cape_du_mominotor', dropRate: 0.01 },
        { itemId: 'pendentif_du_mominotor', dropRate: 0.01 },
        { itemId: 'ceinture_du_mominotor', dropRate: 0.01 },
        { itemId: 'marteau_du_mominotor', dropRate: 0.01 }
    ]
}

areas.souterrainsDragoeufs = {
    id: 'souterrainsDragoeufs',
    name: "Souterrains des Dragoeufs",
    minLevel: 110, maxLevel: 130,
    mobMinLevel: 110, mobMaxLevel: 120,
    background: "",
    icon: "images/monsters/Dragnarok.png",
    description: "Ces galeries souterraines servent d'écloserie aux Dragoeufs de Moon. Dans la chaleur des tunnels de lave refroidie, les œufs pulsent d'une lumière orangée tandis que leurs gardiens en assurent la protection avec une violence redoublée.",
    spawns: [
        { id: 'dragnarok', weight: 10 },
        { id: 'dragueuse', weight: 10 },
        { id: 'draguaindrop', weight: 10 },
        { id: 'dragace', weight: 10 },
        { id: 'dragmatique', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonCrocabulia', dropRate: 0.15, isKey: true },
        { itemId: 'amulette_du_dragoeuf', dropRate: 0.01 },
        { itemId: 'ceinture_du_dragoeuf', dropRate: 0.01 },
        { itemId: 'bottes_du_dragoeuf', dropRate: 0.01 },
        { itemId: 'cape_dragoeuf', dropRate: 0.01 },
        { itemId: 'anneau_du_dragoeuf', dropRate: 0.01 },
        { itemId: 'casque_dragoeuf', dropRate: 0.01 }
    ]
}

areas.champsDesTofusSauvages = {
    id: 'champsDesTofusSauvages',
    name: "Champs des Tofus Sauvages",
    minLevel: 110, maxLevel: 130,
    mobMinLevel: 110, mobMaxLevel: 120,
    background: "",
    icon: "images/monsters/Tofuzmo.png",
    description: "Ces champs sont envahis par des Tofus que personne n'a jamais réussi à domestiquer. Ces volatiles sauvages défendent leur espace avec une énergie déconcertante pour des créatures aussi petites — ne vous laissez pas tromper par leurs plumes.",
    spawns: [
        { id: 'tofuzmo', weight: 10 },
        { id: 'vilain_petit_tofu', weight: 10 },
        { id: 'tofutoflamme', weight: 10 },
        { id: 'tofubine', weight: 10 },
        { id: 'tofu_dodu', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonTofuRoyal', dropRate: 0.15, isKey: true }
    ]
}

areas.champsDeGlace = {
    id: 'champsDeGlace',
    name: "Champs de Glace",
    minLevel: 110, maxLevel: 130,
    mobMinLevel: 110, mobMaxLevel: 120,
    background: "",
    icon: "images/monsters/Boufmouth.png",
    description: "À Frigost, même la neige peut tuer. Ces champs de glace s'étendent sur des kilomètres sans le moindre abri, balayés par des vents coupants qui gèlent les articulations et brouillent les repères. Les créatures qui y vivent, elles, ne semblent pas souffrir du froid.",
    spawns: [
        { id: 'boufmouth', weight: 10 },
        { id: 'bouftonmouth', weight: 10 },
        { id: 'boufmouth_legendaire', weight: 10 },
        { id: 'boufmouth_de_guerre', weight: 7 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonBoufmouthRoyal', dropRate: 0.15, isKey: true },
        { itemId: 'bague_moutheuze', dropRate: 0.01 },
        { itemId: 'mourtheau', dropRate: 0.01 },
        { itemId: 'cape_mouthante', dropRate: 0.01 },
        { itemId: 'anneau_moutheur', dropRate: 0.01 },
        { itemId: 'couteau_de_mer', dropRate: 0.01 },
        { itemId: 'bottes_hoktone', dropRate: 0.01 }
    ]
}

areas.valleeDeLaMortKitu = {
    id: 'valleeDeLaMortKitu',
    name: "Vallée de la mort Kitu",
    minLevel: 110, maxLevel: 130,
    mobMinLevel: 110, mobMaxLevel: 120,
    background: "",
    icon: "images/monsters/Koalak_Sanguin.png",
    description: "La Mort-Kitu est une divinité locale à qui l'on prête bien des vertus funestes. La vallée qui porte son nom est enveloppée d'un brouillard permanent et d'un silence anormal — aucun oiseau n'y chante, aucun insecte n'y bourdonne.",
    spawns: [
        { id: 'koalak_sanguin', weight: 10 },
        { id: 'guerrier_koalak', weight: 10 },
        { id: 'koalak_farouche', weight: 10 },
        { id: 'warko_violet', weight: 10 },
        { id: 'fauchalak', weight: 5 }
    ],
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
    icon: "images/monsters/Blop_Coco_Royal.png",
    description: "Les eaux sombres et profondes de ce lac abritent des variétés de Blops bien plus agressives que leurs cousins de surface. Les pêcheurs d'Amakna évitent soigneusement ces rives, préférant les eaux moins... mouvementées.",
    spawns: [
        { id: 'blopCocoRoyal', weight: 10 },
        { id: 'blopGriotteRoyal', weight: 10 },
        { id: 'blopIndigoRoyal', weight: 10 },
        { id: 'blopReinetteRoyal', weight: 10 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonBlopMulticolore', dropRate: 0.15, isKey: true },
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'amublop_coco_royale', dropRate: 0.01 },
        { itemId: 'blopanneau_coco_royal', dropRate: 0.01 },
        { itemId: 'bloptes_coco_royales', dropRate: 0.01 },
        { itemId: 'blopture_coco_royale', dropRate: 0.01 },
        { itemId: 'amublop_griotte_royale', dropRate: 0.01 },
        { itemId: 'blopanneau_griotte_royal', dropRate: 0.01 },
        { itemId: 'bloptes_griotte_royales', dropRate: 0.01 },
        { itemId: 'blopture_griotte_royale', dropRate: 0.01 },
        { itemId: 'amublop_indigo_royale', dropRate: 0.01 },
        { itemId: 'blopanneau_indigo_royal', dropRate: 0.01 },
        { itemId: 'bloptes_indigo_royales', dropRate: 0.01 },
        { itemId: 'blopture_indigo_royale', dropRate: 0.01 },
        { itemId: 'amublop_reinette_royale', dropRate: 0.01 },
        { itemId: 'blopanneau_reinette_royal', dropRate: 0.01 },
        { itemId: 'bloptes_reinette_royales', dropRate: 0.01 },
        { itemId: 'blopture_reinette_royale', dropRate: 0.01 }
    ]
}

areas.cirqueDeCania = {
    id: 'cirqueDeCania',
    name: "Cirque de Cania",
    minLevel: 120, maxLevel: 140,
    mobMinLevel: 120, mobMaxLevel: 130,
    background: "",
    icon: "images/monsters/Gruche.png",
    description: "Le Cirque de Cania est une dépression naturelle au relief circulaire qui fait office d'arène improvisée. Les monstres qui s'y affrontent pour marquer leur territoire offrent un spectacle saisissant... pour ceux qui observent depuis un endroit suffisamment éloigné.",
    spawns: [
        { id: 'gruche', weight: 10 },
        { id: 'truchmuche', weight: 10 },
        { id: 'truchideur', weight: 10 },
        { id: 'truchtine', weight: 10 },
        { id: 'truchon', weight: 5 }
    ],
    lootTable: [
        { itemId: 'cleDonjonHauteTruche', dropRate: 0.15, isKey: true },
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'gruchaussures', dropRate: 0.01 },
        { itemId: 'gruchape', dropRate: 0.01 },
        { itemId: 'gruchette', dropRate: 0.01 }
    ]
}

areas.territoireCacterre = {
    id: 'territoireCacterre',
    name: "Territoire Cacterre",
    minLevel: 120, maxLevel: 140,
    mobMinLevel: 120, mobMaxLevel: 130,
    background: "",
    icon: "images/monsters/Cactiflore.png",
    description: "Bienvenue à Sufokia, où même les plantes cherchent à vous tuer. Les Cacteires qui règnent sur ce territoire aride ont développé des épines d'une taille imposante et une humeur particulièrement sèche.",
    spawns: [
        { id: 'cactiflore', weight: 10 },
        { id: 'cactana', weight: 10 },
        { id: 'cactoblongo', weight: 10 },
        { id: 'pampactus', weight: 10 },
        { id: 'levito', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonElPiko', dropRate: 0.15, isKey: true },
        { itemId: 'capterre', dropRate: 0.01 },
        { itemId: 'cascterre', dropRate: 0.01 },
        { itemId: 'cacture', dropRate: 0.01 }
    ]
}

areas.akwadala = {
    id: 'akwadala',
    name: "Akwadala",
    minLevel: 120, maxLevel: 140,
    mobMinLevel: 120, mobMaxLevel: 130,
    background: "",
    icon: "images/monsters/Sarkapwane.png",
    description: "Cette partie de Pandala est dominée par l'élément eau dans tous ses états : cascades, sources bouillonnantes, mares stagnantes. Les créatures aquatiques qui y évoluent semblent avoir absorbé quelque chose de l'énergie magique de l'île.",
    spawns: [
        { id: 'sarkapwane', weight: 10 },
        { id: 'kokom', weight: 10 },
        { id: 'akakwa', weight: 10 },
        { id: 'betto', weight: 10 },
        { id: 'kwamourai', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonDameEaux', dropRate: 0.15, isKey: true },
        { itemId: 'geta_akwadala', dropRate: 0.01 },
        { itemId: 'alliance_akwadala', dropRate: 0.01 },
        { itemId: 'bouclier_akwadala', dropRate: 0.01 },
        { itemId: 'amulette_akwadala', dropRate: 0.01 },
        { itemId: 'cape_akwadala', dropRate: 0.01 },
        { itemId: 'ceinture_akwadala', dropRate: 0.01 },
        { itemId: 'baton_akwadala', dropRate: 0.01 },
        { itemId: 'chapeau_akwadala', dropRate: 0.01 }
    ]
}

areas.terrdala = {
    id: 'terrdala',
    name: "Terrdala",
    minLevel: 120, maxLevel: 140,
    mobMinLevel: 120, mobMaxLevel: 130,
    background: "",
    icon: "images/monsters/Shinibaru.png",
    description: "La Terre de Pandala : un sol grumeleux d'une fertilité étrange, où des racines gigantesques émergent sans prévenir et où les créatures semblent surgir directement du sol, comme si l'île elle-même les engendrait.",
    spawns: [
        { id: 'shinibaru', weight: 10 },
        { id: 'ishigro_pake', weight: 10 },
        { id: 'tetonuki', weight: 10 },
        { id: 'parashukoui', weight: 10 },
        { id: 'lolojiki', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonTanukoi', dropRate: 0.15, isKey: true },
        { itemId: 'cape_terrdala', dropRate: 0.01 },
        { itemId: 'bouclier_terrdala', dropRate: 0.01 },
        { itemId: 'chapeau_terrdala', dropRate: 0.01 },
        { itemId: 'geta_terrdala', dropRate: 0.01 },
        { itemId: 'alliance_terrdala', dropRate: 0.01 },
        { itemId: 'amulette_terrdala', dropRate: 0.01 },
        { itemId: 'ceinture_terrdala', dropRate: 0.01 },
        { itemId: 'hache_terrdala', dropRate: 0.01 }
    ]
}

areas.foretSombre = {
    id: 'foretSombre',
    name: "Forêt sombre",
    minLevel: 130, maxLevel: 150,
    mobMinLevel: 130, mobMaxLevel: 140,
    background: "",
    icon: "images/monsters/Branche_Invocatrice.png",
    description: "La Forêt sombre est le domaine d'Elya Wood, une entité arborescente que la corruption a rendue aussi puissante que malveillante. Ses branches invocatrices fouettent l'air à tout va, et les Abraknides qui tissent leurs toiles entre les troncs noircis en sont les gardiens involontaires.",
    spawns: [
        { id: 'branche_invocatrice', weight: 10 },
        { id: 'branche_soignante', weight: 10 },
        { id: 'araknotron_irascible', weight: 10 },
        { id: 'abrakne_sombre_irascible', weight: 10 },
        { id: 'abraknyde_sombre_irascible', weight: 10 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonCheneMou', dropRate: 0.15, isKey: true },
        { itemId: 'cape_d_elya_wood', dropRate: 0.01 },
        { itemId: 'baguette_d_elya_wood', dropRate: 0.01 },
        { itemId: 'alliance_d_elya_wood', dropRate: 0.01 },
        { itemId: 'talisman_d_elya_wood', dropRate: 0.01 }
    ]
}

areas.lacGele = {
    id: 'lacGele',
    name: "Lac gelé",
    minLevel: 130, maxLevel: 150,
    mobMinLevel: 130, mobMaxLevel: 140,
    background: "",
    icon: "images/monsters/Timansot.png",
    description: "La surface de ce lac de Frigost est prise dans la glace la plus épaisse de toute l'île, et pourtant quelque chose bat dessous. Les Timansots et leurs chamans ont établi leur camp sur ce miroir gelé, défendant ses eaux avec des rituels de glace aussi beaux que dévastateurs.",
    spawns: [
        { id: 'timansot', weight: 10 },
        { id: 'shamansot', weight: 10 },
        { id: 'mansobese', weight: 10 },
        { id: 'mamansot', weight: 10 },
        { id: 'fu_mansot', weight: 10 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonMansotRoyal', dropRate: 0.15, isKey: true },
        { itemId: 'nageanneau', dropRate: 0.01 },
        { itemId: 'coiffe_medusoide', dropRate: 0.01 },
        { itemId: 'kalypsoton', dropRate: 0.01 },
        { itemId: 'nageoiture', dropRate: 0.01 },
        { itemId: 'ceinture_de_frigostine', dropRate: 0.01 },
        { itemId: 'bottes_de_frigostine', dropRate: 0.01 },
        { itemId: 'anneau_de_frigostine', dropRate: 0.01 },
        { itemId: 'amulette_de_frigostine', dropRate: 0.01 },
        { itemId: 'baguette_de_frigostine', dropRate: 0.01 }
    ]
}

areas.jungleObscure = {
    id: 'jungleObscure',
    name: "Jungle Obscure",
    minLevel: 130, maxLevel: 150,
    mobMinLevel: 130, mobMaxLevel: 140,
    background: "",
    icon: "images/monsters/Floribonde.png",
    description: "Même les rayons du soleil peinent à percer la canopée épaisse de cette jungle. Dans cette obscurité permanente, des créatures aux yeux phosphorescents ont évolué loin de toute lumière, développant des sens que les aventuriers peinent à anticiper.",
    spawns: [
        { id: 'floribonde', weight: 10 },
        { id: 'bitouf_sombre', weight: 10 },
        { id: 'brouture', weight: 10 },
        { id: 'nerbe', weight: 10 },
        { id: 'fecorce', weight: 10 },
        { id: 'chiendent', weight: 10 },
        { id: 'abrakleur_sombre', weight: 10 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonTynril', dropRate: 0.15, isKey: true },
        { itemId: 'masque_de_l_abrakleur_sombre', dropRate: 0.01 },
        { itemId: 'ceinture_sombre_en_abrakleur', dropRate: 0.01 },
        { itemId: 'branche_de_l_abrakleur_sombre', dropRate: 0.01 }
    ]
}

areas.aerdala = {
    id: 'aerdala',
    name: "Aerdala",
    minLevel: 130, maxLevel: 150,
    mobMinLevel: 130, mobMaxLevel: 140,
    background: "",
    icon: "images/monsters/Uchiwang.png",
    description: "Les courants aériens qui traversent Pandala convergent ici, tourbillonnant en une danse perpétuelle qui soulève poussière et feuilles mortes. Les créatures de l'air qui y prospèrent sont aussi imprévisibles que le vent lui-même.",
    spawns: [
        { id: 'uchiwang', weight: 10 },
        { id: 'ino_naru', weight: 10 },
        { id: 'kurookin', weight: 10 },
        { id: 'fangshu', weight: 10 },
        { id: 'lichangoro', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonDojoVent', dropRate: 0.15, isKey: true },
        { itemId: 'alliance_aerdala', dropRate: 0.01 },
        { itemId: 'geta_aerdala', dropRate: 0.01 },
        { itemId: 'amulette_aerdala', dropRate: 0.01 },
        { itemId: 'dagues_aerdala', dropRate: 0.01 },
        { itemId: 'chapeau_aerdala', dropRate: 0.01 },
        { itemId: 'bouclier_aerdala', dropRate: 0.01 },
        { itemId: 'cape_aerdala', dropRate: 0.01 },
        { itemId: 'ceinture_aerdala', dropRate: 0.01 }
    ]
}

areas.feudala = {
    id: 'feudala',
    name: "Feudala",
    minLevel: 130, maxLevel: 150,
    mobMinLevel: 130, mobMaxLevel: 140,
    background: "",
    icon: "images/monsters/Crachefoux.png",
    description: "Le feu coule sous Pandala, et il remonte ici à la surface. Les sols brûlants, les geysers de vapeur et la chaleur suffocante font de cette zone un enfer pour les impréparés. Ses habitants, eux, s'y sentent comme des poissons dans l'eau.",
    spawns: [
        { id: 'crachefoux', weight: 10 },
        { id: 'rouquette', weight: 10 },
        { id: 'boumbardier', weight: 10 },
        { id: 'petartifoux', weight: 10 },
        { id: 'founamboul', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonFouxArtifice', dropRate: 0.15, isKey: true },
        { itemId: 'geta_feudala', dropRate: 0.01 },
        { itemId: 'sabre_feudala', dropRate: 0.01 },
        { itemId: 'alliance_feudala', dropRate: 0.01 },
        { itemId: 'ceinture_feudala', dropRate: 0.01 },
        { itemId: 'amulette_feudala', dropRate: 0.01 },
        { itemId: 'cape_feudala', dropRate: 0.01 },
        { itemId: 'bouclier_feudala', dropRate: 0.01 },
        { itemId: 'chapeau_feudala', dropRate: 0.01 }
    ]
}

areas.egoutsDuChateauAmakna = {
    id: 'egoutsDuChateauAmakna',
    name: "Égouts du château d'Amakna",
    minLevel: 140, maxLevel: 160,
    mobMinLevel: 140, mobMaxLevel: 150,
    background: "",
    icon: "images/monsters/.png",
    description: "Sous les fondations du Château d'Amakna s'étend un réseau de galeries médiévales creusées par des bâtisseurs depuis longtemps oubliés. Les squelettes qui y patrouillent semblent avoir reçu pour ordre de défendre ces lieux pour l'éternité.",
    spawns: [
        { id: 'ramane', weight: 10 },
        { id: 'rat_goutant', weight: 10 },
        { id: 'rat_masseur', weight: 10 },
        { id: 'rat_colleur', weight: 10 },
        { id: 'rat_pine', weight: 10 },
        { id: 'rat_caille', weight: 10 },
        { id: 'rat_fraichi', weight: 10 },
        { id: 'rat_botteur', weight: 10 },
        { id: 'rat_noir', weight: 1 },
        { id: 'rat_blanc', weight: 1 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonSphincter', dropRate: 0.15, isKey: true },
        { itemId: 'ceinture_du_frelon_noir', dropRate: 0.01 },
        { itemId: 'masque_du_frelon_noir', dropRate: 0.01 }
    ]
}

areas.berceauDAlma = {
    id: 'berceauDAlma',
    name: "Berceau d'Alma",
    minLevel: 140, maxLevel: 160,
    mobMinLevel: 140, mobMaxLevel: 150,
    background: "",
    icon: "images/monsters/.png",
    description: "Le Berceau d'Alma est un lieu saint pour les Sadidas : c'est ici, dit-on, que la déesse de la Nature fit naître les premières plantes du Monde des Douze. Malheureusement, même les lieux sacrés ne sont pas à l'abri des créatures mal intentionnées.",
    spawns: [
        { id: 'crapeur', weight: 10 },
        { id: 'atomystique', weight: 10 },
        { id: 'fumrirolle', weight: 10 },
        { id: 'solfatare', weight: 10 },
        { id: 'mofette', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonGrolandais', dropRate: 0.15, isKey: true },
        { itemId: 'anneau_de_cantile', dropRate: 0.01 },
        { itemId: 'cape_de_cantile', dropRate: 0.01 },
        { itemId: 'amulette_de_cantile', dropRate: 0.01 },
        { itemId: 'bottes_de_cantile', dropRate: 0.01 },
        { itemId: 'cape_tivante', dropRate: 0.01 },
        { itemId: 'slip_noze', dropRate: 0.01 }
    ]
}

areas.dedaleDuDarkVlad = {
    id: 'dedaleDuDarkVlad',
    name: "Dédale du Dark Vlad",
    minLevel: 140, maxLevel: 160,
    mobMinLevel: 140, mobMaxLevel: 150,
    background: "",
    icon: "images/monsters/.png",
    description: "Le Dédale du Dark Vlad est le résultat de siècles de magie noire accumulée. Les couloirs de ce labyrinthe maudit changent de configuration sans prévenir, et les ombres qui y habitent semblent nourries par la peur de ceux qui s'y perdent.",
    spawns: [
        { id: 'malzerb', weight: 10 },
        { id: 'maltrio', weight: 10 },
        { id: 'malepik', weight: 10 },
        { id: 'malbois', weight: 10 },
        { id: 'malalfa', weight: 10 },
        { id: 'malterego_de_malepik', weight: 2 },
        { id: 'malterego_de_malzerb', weight: 2 },
        { id: 'malterego_de_maltrio', weight: 2 },
        { id: 'malterego_de_malbois', weight: 2 },
        { id: 'malterego_de_malalfa', weight: 2 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonTertreSommeil', dropRate: 0.15, isKey: true },
        { itemId: 'anneau_poli_de_malter', dropRate: 0.01 },
        { itemId: 'bottes_crepitantes_de_malter', dropRate: 0.01 },
        { itemId: 'faux_enracinee_de_malter', dropRate: 0.01 }
    ]
}

areas.larmesDOuronigride = {
    id: 'larmesDOuronigride',
    name: "Larmes d'Ouronigride",
    minLevel: 150, maxLevel: 170,
    mobMinLevel: 150, mobMaxLevel: 160,
    background: "",
    icon: "images/monsters/.png",
    description: "Ouronigride, dragon de l'obscurité, aurait versé ses larmes en ce lieu lors d'un combat titanesque. Ces larmes, cristallisées au fil des millénaires, ont donné naissance à un paysage aussi beau que dangereux.",
    spawns: [
        { id: 'crapeur', weight: 10 },
        { id: 'atomystique', weight: 10 },
        { id: 'fumrirolle', weight: 10 },
        { id: 'solfatare', weight: 10 },
        { id: 'mofette', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonObsidiantre', dropRate: 0.15, isKey: true },
        { itemId: 'slip_hie', dropRate: 0.01 },
        { itemId: 'collier_ye', dropRate: 0.01 },
        { itemId: 'ceinture_des_prophetes', dropRate: 0.01 },
        { itemId: 'anneau_des_prophetes', dropRate: 0.01 },
        { itemId: 'baton_des_prophetes', dropRate: 0.01 }
    ]
}

areas.feuillageArbreHakam = {
    id: 'feuillageArbreHakam',
    name: "Feuillage de l'arbre Hakam",
    minLevel: 150, maxLevel: 170,
    mobMinLevel: 150, mobMaxLevel: 160,
    background: "",
    icon: "images/monsters/.png",
    description: "L'Arbre Hakam, colossal gardien de la forêt, étend ses branches sur plusieurs hectares. Dans ce feuillage dense comme un second sol, des créatures arboricoles ont établi leurs nids, invisibles depuis le sol.",
    spawns: [
        { id: 'bitouf_aerien', weight: 10 },
        { id: 'kaskargo', weight: 10 },
        { id: 'poolay', weight: 10 },
        { id: 'abrakleur_clair', weight: 10 },
        { id: 'meupette', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonKimbo', dropRate: 0.15, isKey: true },
        { itemId: 'ceinture_claire_en_abrakleur', dropRate: 0.01 },
        { itemId: 'branche_de_l_abrakleur_clair', dropRate: 0.01 },
        { itemId: 'masque_de_l_abrakleur_clair', dropRate: 0.01 },
        { itemId: 'bottines_en_bois_d_abrakleur', dropRate: 0.01 },
        { itemId: 'anneau_skargo', dropRate: 0.01 },
        { itemId: 'kask_arc_go', dropRate: 0.01 },
        { itemId: 'kaskargo', dropRate: 0.01 },
        { itemId: 'ceinture_bitoufale_de_prosper_youpla', dropRate: 0.01 },
        { itemId: 'casque_du_bitouf_aerien', dropRate: 0.01 },
        { itemId: 'poolache', dropRate: 0.01 },
        { itemId: 'perruque_du_poolay', dropRate: 0.01 }
    ]
}

areas.centreDuLabyrintheMinotoror = {
    id: 'centreDuLabyrintheMinotoror',
    name: "Centre du Labyrinthe du Minotoror",
    minLevel: 150, maxLevel: 170,
    mobMinLevel: 150, mobMaxLevel: 160,
    background: "",
    icon: "images/monsters/Mominotor.png",
    description: "Vous avez survécu au labyrinthe. Félicitations : vous voici au centre, là où le Minotoror attend ceux qui ont résolu ses énigmes de pierre. L'air y sent la sueur, le sang et quelque chose d'indéfinissable qui ressemble à de l'impatience.",
    spawns: [
        { id: 'mominotor', weight: 10 },
        { id: 'deminoboule', weight: 10 },
        { id: 'minotoror', weight: 10 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonMinotot', dropRate: 0.15, isKey: true },
        { itemId: 'bottes_du_mominotor', dropRate: 0.01 },
        { itemId: 'coiffe_du_mominotor', dropRate: 0.01 },
        { itemId: 'alliance_du_mominotor', dropRate: 0.01 },
        { itemId: 'cape_du_mominotor', dropRate: 0.01 },
        { itemId: 'pendentif_du_mominotor', dropRate: 0.01 },
        { itemId: 'ceinture_du_mominotor', dropRate: 0.01 },
        { itemId: 'marteau_du_mominotor', dropRate: 0.01 },
        { itemId: 'cape_du_minotoror', dropRate: 0.01 },
        { itemId: 'ceinture_du_minotoror', dropRate: 0.01 },
        { itemId: 'hache_du_minotoror', dropRate: 0.01 },
        { itemId: 'minotokorno', dropRate: 0.01 },
        { itemId: 'collier_du_minotoror', dropRate: 0.01 },
        { itemId: 'anneau_du_minotoror', dropRate: 0.01 },
        { itemId: 'bottes_du_minotoror', dropRate: 0.01 }
    ]
}

areas.dentsDePierre = {
    id: 'dentsDePierre',
    name: "Dents de pierre",
    minLevel: 150, maxLevel: 170,
    mobMinLevel: 150, mobMaxLevel: 160,
    background: "",
    icon: "images/monsters/Kanihilan.png",
    description: "Ces formations rocheuses acérées qui percent la plaine comme autant de molaires de géant donnent leur nom à ce lieu inhospitalier. Entre ces aiguilles de pierre, des créatures minérales ont élu domicile depuis si longtemps qu'elles semblent en faire partie.",
    spawns: [
        { id: 'kanihilan', weight: 10 },
        { id: 'felygiene', weight: 10 },
        { id: 'panthegros', weight: 10 },
        { id: 'kaniblou', weight: 10 },
        { id: 'orfelin', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonKanigroula', dropRate: 0.15, isKey: true },
        { itemId: 'amulette_de_l_orfelin', dropRate: 0.01 },
        { itemId: 'ceinture_de_l_orfelin', dropRate: 0.01 },
        { itemId: 'coiffe_de_l_orfelin', dropRate: 0.01 },
        { itemId: 'ceinture_du_kaniblou', dropRate: 0.01 },
        { itemId: 'cape_du_kaniblou', dropRate: 0.01 },
        { itemId: 'anneau_du_kaniblou', dropRate: 0.01 }
    ]
}

areas.cimetiereDeGrobe = {
    id: 'cimetiereDeGrobe',
    name: "Cimetière de Grobe",
    minLevel: 150, maxLevel: 170,
    mobMinLevel: 150, mobMaxLevel: 160,
    background: "",
    icon: "images/monsters/Tsukinochi.png",
    description: "Le village de Grobe a disparu depuis longtemps, mais son cimetière, lui, demeure. Ses habitants reposent sous des stèles rongées par la mousse... du moins, certains d'entre eux y reposent. Les autres ont repris du service.",
    spawns: [
        { id: 'tsukinochi', weight: 10 },
        { id: 'tambourai', weight: 10 },
        { id: 'onabu_geisha', weight: 10 },
        { id: 'jiangshi_nobi', weight: 10 },
        { id: 'kabushido', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonShogunTofugawa', dropRate: 0.15, isKey: true },
        { itemId: 'sac_mortuaire_de_jiangshi_nobi', dropRate: 0.01 },
        { itemId: 'bouclier_du_yokomainu', dropRate: 0.01 },
        { itemId: 'bottes_de_brume', dropRate: 0.01 },
        { itemId: 'ceinture_de_tsukinochi', dropRate: 0.01 },
        { itemId: 'anneau_tabene', dropRate: 0.01 },
        { itemId: 'amulette_c_tera', dropRate: 0.01 }
    ]
}

areas.crevassePerge = {
    id: 'crevassePerge',
    name: "Crevasse Perge",
    minLevel: 160, maxLevel: 180,
    mobMinLevel: 160, mobMaxLevel: 170,
    background: "",
    icon: "images/monsters/Yokaï_Givrefoux.png",
    description: "La Crevasse de Perge est une cicatrice dans la roche vive qui plonge dans l'obscurité la plus totale. Des créatures adaptées à l'absence de lumière y prospèrent, et ce qui remonte de ces profondeurs n'a jamais l'air d'être de bonne humeur.",
    spawns: [
        { id: 'yokai_givrefoux', weight: 10 },
        { id: 'maho_givrefoux', weight: 10 },
        { id: 'soryo_givrefoux', weight: 10 },
        { id: 'yomi_givrefoux', weight: 10 },
        { id: 'kami_givrefoux', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonGivrefoux', dropRate: 0.15, isKey: true },
        { itemId: 'alliance_de_guten_tak', dropRate: 0.01 },
        { itemId: 'arc_de_guten_tak', dropRate: 0.01 },
        { itemId: 'anneau_de_guten_tak', dropRate: 0.01 },
        { itemId: 'amulette_de_guten_tak', dropRate: 0.01 }
    ]
}

areas.gorgeDesVentsHurlants = {
    id: 'gorgeDesVentsHurlants',
    name: "Gorge des vents hurlants",
    minLevel: 160, maxLevel: 180,
    mobMinLevel: 160, mobMaxLevel: 170,
    background: "",
    icon: "images/monsters/Pikténia.png",
    description: "Les vents qui s'engouffrent dans cette gorge depuis les plaines d'Amakna atteignent une violence qui fait siffler les oreilles. Dans ce couloir naturel, chaque mouvement est compliqué et chaque son amplifié — y compris les grognements des créatures qui y ont fait leur tanière.",
    spawns: [
        { id: 'piktenia', weight: 10 },
        { id: 'tremorse', weight: 10 },
        { id: 'masticroc', weight: 10 },
        { id: 'morsquale', weight: 10 },
        { id: 'cycloporth', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonPereVer', dropRate: 0.15, isKey: true },
        { itemId: 'crolier', dropRate: 0.01 },
        { itemId: 'casquoporth', dropRate: 0.01 },
        { itemId: 'ceintremorse', dropRate: 0.01 }
    ]
}

areas.montDesTombeaux = {
    id: 'montDesTombeaux',
    name: "Mont des tombeaux",
    minLevel: 160, maxLevel: 180,
    mobMinLevel: 160, mobMaxLevel: 170,
    background: "",
    icon: "images/monsters/Madura.png",
    description: "Le Mont des Tombeaux est sacré pour certains, maudit pour d'autres. Des générations d'aventuriers y ont été inhumées avec leurs équipements, ce qui attire inévitablement les pilleurs et les nécromanciens en quête de trésors... et de serviteurs.",
    spawns: [
        { id: 'madura', weight: 10 },
        { id: 'bakazako', weight: 10 },
        { id: 'kaonashi', weight: 10 },
        { id: 'tsume_bozu', weight: 10 },
        { id: 'onigori', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonDemeureEsprits', dropRate: 0.15, isKey: true },
        { itemId: 'pupille_de_madura', dropRate: 0.01 },
        { itemId: 'anneau_de_koumiho', dropRate: 0.01 },
        { itemId: 'geta_des_tombeaux', dropRate: 0.01 },
        { itemId: 'ceinture_d_onigori', dropRate: 0.01 },
        { itemId: 'bandeau_de_spiritueur', dropRate: 0.01 },
        { itemId: 'katana_de_spiritueur', dropRate: 0.01 },
        { itemId: 'fut_d_aspiratueur', dropRate: 0.01 },
        { itemId: 'sac_mortuaire_de_jiangshi_nobi', dropRate: 0.01 },
        { itemId: 'bouclier_du_yokomainu', dropRate: 0.01 },
        { itemId: 'bottes_de_brume', dropRate: 0.01 },
        { itemId: 'ceinture_de_tsukinochi', dropRate: 0.01 }
    ]
}

areas.gisgoul = {
    id: 'gisgoul',
    name: "Gisgoul",
    minLevel: 170, maxLevel: 190,
    mobMinLevel: 170, mobMaxLevel: 180,
    background: "",
    icon: "images/monsters/Mama_Bwork.png",
    description: "Gisgoul est un être de légende dans l'imaginaire de Pandala : un roi déchu dont le palais est tombé en ruines mais dont les serviteurs gardent encore les salles. Ces créatures corrompues par des siècles d'isolement ne font plus la distinction entre protéger et attaquer.",
    spawns: [
        { id: 'mama_bwork', weight: 10 },
        { id: 'bwork_elemental_de_terre', weight: 10 },
        { id: 'bwork_elemental_de_feu', weight: 10 },
        { id: 'bwork_elemental_d_eau', weight: 10 },
        { id: 'bwork_elemental_d_air', weight: 10 },
        { id: 'cybwork', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonBworker', dropRate: 0.15, isKey: true },
        { itemId: 'bracelet_ventre', dropRate: 0.01 },
        { itemId: 'lame_assacre', dropRate: 0.01 },
        { itemId: 'amulette_ripage', dropRate: 0.01 },
        { itemId: 'cape_erforee', dropRate: 0.01 },
        { itemId: 'cape_d_ogivol', dropRate: 0.01 },
        { itemId: 'coiffe_d_ogivol', dropRate: 0.01 },
        { itemId: 'ceinture_d_ogivol', dropRate: 0.01 }
    ]
}

areas.domaineDesFungus = {
    id: 'domaineDesFungus',
    name: "Domaine des Fungus",
    minLevel: 170, maxLevel: 190,
    mobMinLevel: 170, mobMaxLevel: 180,
    background: "",
    icon: "images/monsters/Tromperelle.png",
    description: "Le Domaine des Fungus est un monde régi par les lois mystérieuses de la mycoflore. Des champignons de toutes les tailles prolifèrent ici, certains libérant des spores hallucinogènes, d'autres cachant des prédateurs tapis sous leurs chapeaux.",
    spawns: [
        { id: 'tromperelle', weight: 10 },
        { id: 'champaknyde', weight: 10 },
        { id: 'champodonte', weight: 10 },
        { id: 'champmane', weight: 10 },
        { id: 'champbis', weight: 10 },
        { id: 'champ_a_gnons', weight: 10 },
        { id: 'champ_champ', weight: 1 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonOugah', dropRate: 0.15, isKey: true },
        { itemId: 'hache_a_lamelles', dropRate: 0.01 },
        { itemId: 'bottines_des_sous_bois', dropRate: 0.01 },
        { itemId: 'tranche_des_sous_bois', dropRate: 0.01 },
        { itemId: 'caprin', dropRate: 0.01 },
        { itemId: 'chapignon', dropRate: 0.01 },
        { itemId: 'couteaux_a_champignons', dropRate: 0.01 },
        { itemId: 'anneau_colerette', dropRate: 0.01 },
        { itemId: 'ceinture_mycosine', dropRate: 0.01 },
        { itemId: 'anneau_chevelu', dropRate: 0.01 },
        { itemId: 'chaussons_pignons', dropRate: 0.01 },
        { itemId: 'alliance_boletee', dropRate: 0.01 },
        { itemId: 'amunite', dropRate: 0.01 },
        { itemId: 'capignon', dropRate: 0.01 },
        { itemId: 'string_tue_mouche', dropRate: 0.01 }
    ]
}

areas.crocsDeVerre = {
    id: 'crocsDeVerre',
    name: "Crocs de verre",
    minLevel: 170, maxLevel: 190,
    mobMinLevel: 170, mobMaxLevel: 180,
    background: "",
    icon: "images/monsters/Blérauve.png",
    description: "Les formations de cristal translucide qui parsèment ce territoire leur valent leur nom effrayant. Tranchants comme des lames, les Crocs de Verre lacèrent autant les semelles des aventuriers que les chairs des imprudents qui trébuchent.",
    spawns: [
        { id: 'blerauve', weight: 10 },
        { id: 'blerom', weight: 10 },
        { id: 'wolvero', weight: 10 },
        { id: 'croleur', weight: 10 },
        { id: 'fleuro', weight: 10 },
        { id: 'blerice', weight: 10 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonKolosso', dropRate: 0.15, isKey: true },
        { itemId: 'bague_de_boreale', dropRate: 0.01 },
        { itemId: 'ceinture_de_boreale', dropRate: 0.01 },
        { itemId: 'coiffe_de_boreale', dropRate: 0.01 },
        { itemId: 'bottes_de_boreale', dropRate: 0.01 },
        { itemId: 'cape_d_hel_munster', dropRate: 0.01 },
        { itemId: 'amulette_d_hel_munster', dropRate: 0.01 },
        { itemId: 'coiffe_d_hel_munster', dropRate: 0.01 }
    ]
}

areas.ileDeSakai = {
    id: 'ileDeSakai',
    name: "Île de Sakaï",
    minLevel: 170, maxLevel: 190,
    mobMinLevel: 170, mobMaxLevel: 180,
    background: "",
    icon: "images/monsters/Gobosteur.png",
    description: "L'Île de Sakaï est réputée pour ses mines de métaux précieux, exploitées pendant des siècles jusqu'à ce que les ouvriers rencontrent quelque chose dans les galeries qui les fit fuir définitivement. Ce qu'ils ont trouvé... est encore là.",
    spawns: [
        { id: 'gobosteur', weight: 10 },
        { id: 'sapeur', weight: 10 },
        { id: 'ouilleur', weight: 10 },
        { id: 'perku', weight: 10 },
        { id: 'courtilieur', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonSakai', dropRate: 0.15, isKey: true },
        { itemId: 'frimacoiffe', dropRate: 0.01 },
        { itemId: 'frimamulette', dropRate: 0.01 },
        { itemId: 'frimanneau', dropRate: 0.01 },
        { itemId: 'frimature', dropRate: 0.01 },
        { itemId: 'gresilobottes', dropRate: 0.01 },
        { itemId: 'gresilosceptre', dropRate: 0.01 },
        { itemId: 'gresilocape', dropRate: 0.01 },
        { itemId: 'gresilanneau', dropRate: 0.01 }
    ]
}

areas.foretPetrifiee = {
    id: 'foretPetrifiee',
    name: "Forêt pétrifiée",
    minLevel: 170, maxLevel: 190,
    mobMinLevel: 170, mobMaxLevel: 180,
    background: "",
    icon: "images/monsters/Dramanite.png",
    description: "Quelque chose a transformé cette forêt entière en pierre. Les arbres, les buissons, les champignons — tout est minéralisé dans une perfection étrange, figé dans un instant de silence éternel. Les Fungus qui y errent semblent les seuls à y avoir trouvé leur place.",
    spawns: [
        { id: 'dramanite', weight: 10 },
        { id: 'fistulor', weight: 10 },
        { id: 'fongeur', weight: 10 },
        { id: 'abrazif', weight: 10 },
        { id: 'merulette', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonKorriandre', dropRate: 0.15, isKey: true },
        { itemId: 'cape_peupret', dropRate: 0.01 },
        { itemId: 'ceinture_bine', dropRate: 0.01 },
        { itemId: 'baguette_nolog', dropRate: 0.01 },
        { itemId: 'amulette_heroclite', dropRate: 0.01 },
        { itemId: 'chapeau_pourih', dropRate: 0.01 },
        { itemId: 'bottines_hodore', dropRate: 0.01 },
        { itemId: 'bivalve', dropRate: 0.01 }
    ]
}

areas.montTorrideau = {
    id: 'montTorrideau',
    name: "Mont Torrideau",
    minLevel: 180, maxLevel: 200,
    mobMinLevel: 180, mobMaxLevel: 190,
    background: "",
    icon: "images/monsters/Apériglours.png",
    description: "Le Mont Torrideau dresse sa masse imposante au-dessus des plaines glacées de Frigost, formant un contraste saisissant avec les terres environnantes. Ses pentes escarpées abritent des créatures adaptées aux températures extrêmes qui y règnent.",
    spawns: [
        { id: 'aperiglours', weight: 10 },
        { id: 'boulglours', weight: 10 },
        { id: 'gloursaya', weight: 10 },
        { id: 'glourmand', weight: 10 },
        { id: 'glouragan', weight: 10 },
        { id: 'meliglours', weight: 10 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonGloursons', dropRate: 0.15, isKey: true },
        { itemId: 'bague_gloursonne', dropRate: 0.01 },
        { itemId: 'alliance_gloursonne', dropRate: 0.01 },
        { itemId: 'epee_gloursonne', dropRate: 0.01 },
        { itemId: 'cape_hiculteur', dropRate: 0.01 },
        { itemId: 'bouclier_alveole', dropRate: 0.01 },
        { itemId: 'amulette_de_theodoran_ax', dropRate: 0.01 },
        { itemId: 'bottes_de_theodoran_ax', dropRate: 0.01 },
        { itemId: 'cape_de_theodoran_ax', dropRate: 0.01 }
    ]
}

areas.citeOubliee = {
    id: 'citeOubliee',
    name: "Cité oubliée",
    minLevel: 180, maxLevel: 200,
    mobMinLevel: 180, mobMaxLevel: 190,
    background: "",
    icon: "images/monsters/Noctulule.png",
    description: "Une cité entière, avalée par le temps et la végétation. Les façades sculptées émergent encore çà et là de la jungle, témoins d'une civilisation que personne ne se souvient avoir connue. Ses gardiens actuels, eux, n'ont pas oublié leur mission.",
    spawns: [
        { id: 'noctulule', weight: 10 },
        { id: 'panterreur', weight: 10 },
        { id: 'brutopak', weight: 10 },
        { id: 'caznoar', weight: 10 },
        { id: 'somblero', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonOmbre', dropRate: 0.15, isKey: true },
        { itemId: 'obscture', dropRate: 0.01 },
        { itemId: 'chaussures_hau', dropRate: 0.01 },
        { itemId: 'amulule', dropRate: 0.01 },
        { itemId: 'ceinture_de_danathor', dropRate: 0.01 },
        { itemId: 'amulette_de_danathor', dropRate: 0.01 },
        { itemId: 'l_ecu_de_danathor', dropRate: 0.01 },
        { itemId: 'coiffe_de_danathor', dropRate: 0.01 },
        { itemId: 'bottes_d_allister', dropRate: 0.01 },
        { itemId: 'couronne_d_allister', dropRate: 0.01 },
        { itemId: 'anneau_d_allister', dropRate: 0.01 },
        { itemId: 'egide_d_allister', dropRate: 0.01 }
    ]
}

areas.nimotopia = {
    id: 'nimotopia',
    name: "Nimotopia",
    minLevel: 180, maxLevel: 200,
    mobMinLevel: 180, mobMaxLevel: 190,
    background: "",
    icon: "images/monsters/Chevrotine.png",
    description: "Nimotopia est la terre des Nimaux, créatures hybrides dont personne n'a jamais vraiment expliqué l'origine. Ce plateau mystérieux doit son ambiance particulière aux vibrations profondes qui émanent du sol.",
    spawns: [
        { id: 'chevrotine', weight: 10 },
        { id: 'brokouillon', weight: 10 },
        { id: 'nemroz', weight: 10 },
        { id: 'crambo', weight: 10 },
        { id: 'viandargh', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonRazof', dropRate: 0.15, isKey: true },
        { itemId: 'amulette_hale', dropRate: 0.01 },
        { itemId: 'chaussures_face', dropRate: 0.01 },
        { itemId: 'cape_tif', dropRate: 0.01 },
        { itemId: 'amulette_d_oshimo', dropRate: 0.01 },
        { itemId: 'coiffe_d_oshimo', dropRate: 0.01 },
        { itemId: 'bottes_d_oshimo', dropRate: 0.01 }
    ]
}

areas.ereboria = {
    id: 'ereboria',
    name: "Ereboria",
    minLevel: 180, maxLevel: 200,
    mobMinLevel: 180, mobMaxLevel: 190,
    background: "",
    icon: "images/monsters/Blindur.png",
    description: "Ereboria porte le nom des dieux de l'obscurité, et ses habitants semblent en avoir hérité le tempérament. Cette zone plongée dans une pénombre permanente est le territoire de créatures qui ont évolué loin de toute lumière bienveillante.",
    spawns: [
        { id: 'blindur', weight: 10 },
        { id: 'marthos', weight: 10 },
        { id: 'serpyn', weight: 10 },
        { id: 'boufronde', weight: 10 },
        { id: 'sanglirok', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonBastionMarteaux', dropRate: 0.15, isKey: true },
        { itemId: 'anneau_clochecuivre', dropRate: 0.01 },
        { itemId: 'masse_clochecuivre', dropRate: 0.01 },
        { itemId: 'heaume_clochecuivre', dropRate: 0.01 },
        { itemId: 'marteau_aigri', dropRate: 0.01 },
        { itemId: 'serpe_aigrie', dropRate: 0.01 },
        { itemId: 'collier_gris', dropRate: 0.01 },
        { itemId: 'bouclier_gris', dropRate: 0.01 }
    ]
}

areas.bastionFroidesLegions = {
    id: 'bastionFroidesLegions',
    name: "Bastion des Froides légions",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/Ventrublion.png",
    description: "Ce bastion, perdu dans les glaces de Frigost, était autrefois une forteresse militaire. La Grande Congélation l'a transformé en relique de pierre et de glace, repeuplée par les Froides Légions — des guerriers qui n'ont pas oublié leur serment de défense.",
    spawns: [
        { id: 'ventrublion', weight: 10 },
        { id: 'stalak', weight: 10 },
        { id: 'karkanik', weight: 10 },
        { id: 'verglasseur', weight: 10 },
        { id: 'frimar', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonSylargh', dropRate: 0.15, isKey: true },
        { itemId: 'arc_du_karkanik', dropRate: 0.01 },
        { itemId: 'bouclier_du_stalak', dropRate: 0.01 },
        { itemId: 'col_du_ventrublion', dropRate: 0.01 },
        { itemId: 'ceinture_de_brouce', dropRate: 0.01 },
        { itemId: 'ecorce_de_brouce', dropRate: 0.01 },
        { itemId: 'bottes_de_brouce', dropRate: 0.01 },
        { itemId: 'anneau_de_brouce', dropRate: 0.01 }
    ]
}

areas.jardinsHivers = {
    id: 'jardinsHivers',
    name: "Jardins d'Hivers",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/Nessil.png",
    description: "Les Jardins d'Hivers de Frigost sont à la fois sublimes et mortels. Des fleurs de givre aux pétales de cristal, des sculptures de glace façonnées par le vent… et entre elles, des créatures qui n'ont rien de décoratif.",
    spawns: [
        { id: 'nessil', weight: 10 },
        { id: 'krakal', weight: 10 },
        { id: 'dodox', weight: 10 },
        { id: 'droserale', weight: 10 },
        { id: 'termystique', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonKlime', dropRate: 0.15, isKey: true },
        { itemId: 'ceinture_instable', dropRate: 0.01 },
        { itemId: 'anneau_instable', dropRate: 0.01 },
        { itemId: 'bague_instable', dropRate: 0.01 },
        { itemId: 'bottes_d_otomai', dropRate: 0.01 },
        { itemId: 'fiole_d_otomai', dropRate: 0.01 },
        { itemId: 'epee_d_otomai', dropRate: 0.01 },
        { itemId: 'amulette_d_otomai', dropRate: 0.01 }
    ]
}

areas.rempartsAVent = {
    id: 'rempartsAVent',
    name: "Remparts à vent",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/Kanimate.png",
    description: "Les Remparts à Vent de Frigost servaient jadis à protéger la ville des blizzards qui s'abattent sur l'île. Leurs ruines battues par les vents abritent aujourd'hui des créatures qui ont fait des courants glaciaux leurs alliés de prédilection.",
    spawns: [
        { id: 'kanimate', weight: 10 },
        { id: 'brikoglours', weight: 10 },
        { id: 'mansordide', weight: 10 },
        { id: 'mecanofoux', weight: 10 },
        { id: 'merulor', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonMissizFrizz', dropRate: 0.15, isKey: true },
        { itemId: 'amulette_du_kanimate', dropRate: 0.01 },
        { itemId: 'coiffe_du_kanimate', dropRate: 0.01 },
        { itemId: 'cape_du_kanimate', dropRate: 0.01 },
        { itemId: 'marteau_d_henual', dropRate: 0.01 },
        { itemId: 'anneau_d_henual', dropRate: 0.01 },
        { itemId: 'ceinture_d_henual', dropRate: 0.01 }
    ]
}

areas.tannerieEcarlate = {
    id: 'tannerieEcarlate',
    name: "Tannerie Écarlate",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/Harrogant.png",
    description: "L'odeur de cuir tanné et de produits chimiques âcres qui imprègne l'air de la Tannerie Écarlate est difficile à oublier. Ceux qui y travaillaient ont depuis longtemps abandonné les lieux, laissant derrière eux des créatures bien adaptées à cet environnement toxique.",
    spawns: [
        { id: 'harrogant', weight: 10 },
        { id: 'grodruche', weight: 10 },
        { id: 'empaille', weight: 10 },
        { id: 'cuirboule', weight: 10 },
        { id: 'peunch', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonNileza', dropRate: 0.15, isKey: true },
        { itemId: 'bonnet_vicieux', dropRate: 0.01 },
        { itemId: 'bottes_vicieuses', dropRate: 0.01 },
        { itemId: 'anneau_vicieux', dropRate: 0.01 },
        { itemId: 'sept_ans_de_malheur', dropRate: 0.01 },
        { itemId: 'amulette_rangleur', dropRate: 0.01 },
        { itemId: 'bague_nostik', dropRate: 0.01 }
    ]
}

areas.tourDeLaClepsydre = {
    id: 'tourDeLaClepsydre',
    name: "Tour de la Clepsydre",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/Granduk.png",
    description: "La Tour de la Clepsydre est un monument à l'obsession d'un architecte Xélor dont on a oublié le nom. Le temps lui-même semble s'y écouler différemment, et les gardiens qui en protègent les mécanismes anciens sont aussi impitoyables que leur maître était ponctuel.",
    spawns: [
        { id: 'granduk', weight: 10 },
        { id: 'strigide', weight: 10 },
        { id: 'cycloide', weight: 10 },
        { id: 'sinistrofu', weight: 10 },
        { id: 'nocturlabe', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonHarebourg', dropRate: 0.15, isKey: true },
        { itemId: 'amulette_du_granduk', dropRate: 0.01 },
        { itemId: 'masque_du_granduk', dropRate: 0.01 },
        { itemId: 'epee_du_granduk', dropRate: 0.01 },
        { itemId: 'amulette_du_strigide', dropRate: 0.01 },
        { itemId: 'bottes_du_strigide', dropRate: 0.01 },
        { itemId: 'ceinture_du_strigide', dropRate: 0.01 },
        { itemId: 'amulette_du_cycloide', dropRate: 0.01 },
        { itemId: 'anneau_du_cycloide', dropRate: 0.01 },
        { itemId: 'bottes_du_cycloide', dropRate: 0.01 },
        { itemId: 'bouclier_du_cycloide', dropRate: 0.01 },
        { itemId: 'amulette_du_sinistrofu', dropRate: 0.01 },
        { itemId: 'bottes_du_sinistrofu', dropRate: 0.01 },
        { itemId: 'cape_du_sinistrofu', dropRate: 0.01 },
        { itemId: 'amulette_du_nocturlabe', dropRate: 0.01 },
        { itemId: 'bottes_du_nocturlabe', dropRate: 0.01 },
        { itemId: 'ceinture_du_nocturlabe', dropRate: 0.01 },
        { itemId: 'amulette_cryochrone', dropRate: 0.01 },
        { itemId: 'anneau_cryochrone', dropRate: 0.01 },
        { itemId: 'coiffe_cryochrone', dropRate: 0.01 }
    ]
}

areas.abyssesDeSufokia = {
    id: 'abyssesDeSufokia',
    name: "Abysses de Sufokia",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/Pikoleur.png",
    description: "Sous les eaux de la mer qui borde Sufokia s'ouvrent des abysses où la pression et l'obscurité font loi. Les créatures qui y ont évolué sont aussi étranges que les conditions qui les ont façonnées, et elles défendent jalousement leurs profondeurs.",
    spawns: [
        { id: 'pikoleur', weight: 10 },
        { id: 'harpo', weight: 10 },
        { id: 'krabouilleur', weight: 10 },
        { id: 'eskoglyphe', weight: 10 },
        { id: 'cyclophandre', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonMerkator', dropRate: 0.15, isKey: true },
        { itemId: 'pikano', dropRate: 0.01 },
        { itemId: 'casquipik', dropRate: 0.01 },
        { itemId: 'pikottes', dropRate: 0.01 },
        { itemId: 'amulette_ikete', dropRate: 0.01 },
        { itemId: 'cape_parition', dropRate: 0.01 },
        { itemId: 'bandeau_culaire', dropRate: 0.01 }
    ]
}

areas.rocDesSalbatroce = {
    id: 'rocDesSalbatroce',
    name: "Roc des Salbatroce",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/.png",
    description: "Les Salbatroces ont transformé ce roc saillant au-dessus des flots sufokiens en une véritable cité aérienne. Leurs nids de fortune s'accrochent aux parois verticales, et malheur à quiconque s'approche de leurs œufs lors de la saison de nidification.",
    spawns: [
        { id: 'tabacille', weight: 10 },
        { id: 'bacterrib', weight: 10 },
        { id: 'virustine', weight: 10 },
        { id: 'pataugerme', weight: 5 },
        { id: 'verminocule', weight: 10 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonBaleine', dropRate: 0.15, isKey: true },
        { itemId: 'amulette_de_pol_ouatnos', dropRate: 0.01 },
        { itemId: 'anneau_de_pol_ouatnos', dropRate: 0.01 },
        { itemId: 'maskrobe', dropRate: 0.01 },
        { itemId: 'pataugastrique', dropRate: 0.01 },
        { itemId: 'protopagne', dropRate: 0.01 },
        { itemId: 'voilamibe', dropRate: 0.01 }
    ]
}

areas.domaineDesTrithons = {
    id: 'domaineDesTrithons',
    name: "Domaine des Trithons",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/Mol_Usk.png",
    description: "Les Trithons, créatures mi-humaines mi-marines, ont fait de ce domaine sous-marin leur royaume. Leurs ruines coralliennes sont parcourues par des courants chauds montant des profondeurs, et leurs gardiens n'accordent aucune grâce aux intrus.",
    spawns: [
        { id: 'tourthon', weight: 10 },
        { id: 'poulpee', weight: 10 },
        { id: 'tryde', weight: 10 },
        { id: 'rilur', weight: 10 },
        { id: 'diondin', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonDantinea', dropRate: 0.15, isKey: true },
        { itemId: 'bague_trithon', dropRate: 0.01 },
        { itemId: 'bottes_trithon', dropRate: 0.01 },
        { itemId: 'masque_trithon', dropRate: 0.01 },
        { itemId: 'bottes_innommables', dropRate: 0.01 },
        { itemId: 'harpelle', dropRate: 0.01 },
        { itemId: 'pendentif_affame', dropRate: 0.01 }
    ]
}

areas.villeSubmergee = {
    id: 'villeSubmergee',
    name: "Ville submergée",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/Mol_Usk.png",
    description: "Une ville entière gît sous les eaux de Sufokia, victime d'un raz-de-marée dont les chroniques gardent peu de traces. Ses rues pavées et ses tours sont encore reconnaissables, peuplées maintenant par une faune qui a fait sien ce décor fantomatique.",
    spawns: [
        { id: 'mol_usk', weight: 10 },
        { id: 'crabe_yoloniste', weight: 10 },
        { id: 'gambaf', weight: 10 },
        { id: 'mantaze', weight: 10 },
        { id: 'tilamproie', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonMeno', dropRate: 0.15, isKey: true },
        { itemId: 'amulette_luminescente', dropRate: 0.01 },
        { itemId: 'cape_luminescente', dropRate: 0.01 },
        { itemId: 'ceinture_luminescente', dropRate: 0.01 }
    ]
}

areas.plateauRlyugluglu = {
    id: 'plateauRlyugluglu',
    name: "Plateau de R'lyugluglu",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/Grofond.png",
    description: "Le Plateau Rlyugluglu doit son nom à une onomatopée locale évoquant le gargouillement des sources chaudes qui le parsèment. L'écosystème particulier qui en découle attire une faune unique dans tout le Monde des Douze.",
    spawns: [
        { id: 'grofond', weight: 10 },
        { id: 'n_yalg', weight: 10 },
        { id: 'shokkoth', weight: 10 },
        { id: 'li_fo', weight: 10 },
        { id: 'klutiste', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'anneau_rifique', dropRate: 0.01 },
        { itemId: 'casque_cyclopeen', dropRate: 0.01 },
        { itemId: 'pendentif_mignon_de_koutoulou', dropRate: 0.01 },
        { itemId: 'cleDonjonKoutoulou', dropRate: 0.15, isKey: true }
    ]
}

areas.caserneDuJourSansFin = {
    id: 'caserneDuJourSansFin',
    name: "Caserne du jour sans fin",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/Chause.png",
    description: "Dans cette caserne de Sufokia, le soleil ne se couche jamais — un artifice magique mis en place par les Roublards qui en ont fait leur quartier général. Ses occupants actuels ont depuis largement perdu l'habitude de dormir.",
    spawns: [
        { id: 'chause', weight: 10 },
        { id: 'ectorche', weight: 10 },
        { id: 'esprigne', weight: 10 },
        { id: 'feutome', weight: 10 },
        { id: 'crame', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonIlyzaelle', dropRate: 0.15, isKey: true },
        { itemId: 'sac_mortuaire_de_jiangshi_nobi', dropRate: 0.01 },
        { itemId: 'alliance_brulame', dropRate: 0.01 },
        { itemId: 'masque_brulame', dropRate: 0.01 },
        { itemId: 'pompes_funebres', dropRate: 0.01 },
        { itemId: 'bandana_de_mama_ayuto', dropRate: 0.01 },
        { itemId: 'paravoile_de_mama_ayuto', dropRate: 0.01 },
        { itemId: 'rouleau_de_mama_ayuto', dropRate: 0.01 }
    ]
}

areas.epaveSilencieuse = {
    id: 'epaveSilencieuse',
    name: "Épave silencieuse",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/Zombruth.png",
    description: "Cet immense navire échoué gît sur un banc de sable depuis si longtemps que la mer a commencé à le réclamer. Dans ses cales obscures et ses ponts envahis par les algues, une vie étrange s'est développée, loin des hommes et de leurs préoccupations.",
    spawns: [
        { id: 'zombruth', weight: 10 },
        { id: 'tournoye', weight: 10 },
        { id: 'funespadon', weight: 10 },
        { id: 'cranonier', weight: 10 },
        { id: 'macrab', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonBethel', dropRate: 0.15, isKey: true },
        { itemId: 'cape_de_cranonier', dropRate: 0.01 },
        { itemId: 'chapeau_de_tournoye', dropRate: 0.01 },
        { itemId: 'lance_horsele', dropRate: 0.01 },
        { itemId: 'sangle_oriole', dropRate: 0.01 },
        { itemId: 'baguette_heroclite', dropRate: 0.01 },
        { itemId: 'cape_solution', dropRate: 0.01 },
        { itemId: 'anneau_toriete', dropRate: 0.01 },
        { itemId: 'collier_rophante', dropRate: 0.01 }
    ]
}

areas.marchesMagmatiques = {
    id: 'marchesMagmatiques',
    name: "Marches magmatiques",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/Klémort.png",
    description: "Les Marches Magmatiques sont taillées dans la roche volcanique brûlante par des siècles d'érosion. Les coulées de lave figées forment des escaliers naturels que seules les créatures ignifuges peuvent parcourir sans hésitation.",
    spawns: [
        { id: 'klemort', weight: 10 },
        { id: 'trepavois', weight: 10 },
        { id: 'hacharne', weight: 10 },
        { id: 'moribombe', weight: 10 },
        { id: 'halbardent', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonSolar', dropRate: 0.15, isKey: true },
        { itemId: 'ceinture_gence', dropRate: 0.01 },
        { itemId: 'lav_hache', dropRate: 0.01 },
        { itemId: 'heaume_oplate', dropRate: 0.01 },
        { itemId: 'massier', dropRate: 0.01 },
        { itemId: 'cape_ardente', dropRate: 0.01 },
        { itemId: 'chaussures_ardentes', dropRate: 0.01 },
        { itemId: 'masque_ardent', dropRate: 0.01 }
    ]
}

areas.royaumeDesMartegel = {
    id: 'royaumeDesMartegel',
    name: "Royaume des martegel",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/Tanklume.png",
    description: "Les Martegel, créatures marines aux carapaces magnétiques, ont bâti leur royaume dans les fonds marins de Sufokia. Leurs cités de métal et de corail ont une architecture que les meilleurs ingénieurs de la surface ne comprennent pas tout à fait.",
    spawns: [
        { id: 'tanklume', weight: 10 },
        { id: 'boufbos', weight: 10 },
        { id: 'barbelier', weight: 10 },
        { id: 'kasrok', weight: 10 },
        { id: 'vatenbiere', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonDazak', dropRate: 0.15, isKey: true },
        { itemId: 'anneau_en_grithril', dropRate: 0.01 },
        { itemId: 'casque_en_grithril', dropRate: 0.01 },
        { itemId: 'ceinture_en_grithril', dropRate: 0.01 },
        { itemId: 'cape_paztek', dropRate: 0.01 },
        { itemId: 'couteaux_sacrificiels', dropRate: 0.01 },
        { itemId: 'masque_paztek', dropRate: 0.01 },
        { itemId: 'sandales_paztek', dropRate: 0.01 }
    ]
}

areas.terresDesacrees = {
    id: 'terresDesacrees',
    name: "Terres Désacrées",
    minLevel: 185,
    maxLevel: 200,
    mobMinLevel: 185,
    mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/Goulafre.png",
    description: "Les Terres Désacrées sont une cicatrice dans le monde des vivants, là où les frontières entre la mort et la vie se sont depuis longtemps effacées. Des Goules de toutes espèces y errent éternellement, rongées par une faim que ni le temps ni les chairs fraîches ne parviennent jamais à assouvir.",
    spawns: [
        { id: 'goulafre', weight: 10 },
        { id: 'kerigoule', weight: 10 },
        { id: 'gouligane', weight: 10 },
        { id: 'goultime', weight: 10 },
        { id: 'pipisteuse', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonKatrepat', dropRate: 0.15, isKey: true },
        { itemId: 'goulano', dropRate: 0.01 },
        { itemId: 'goulbottes', dropRate: 0.01 },
        { itemId: 'goulclier', dropRate: 0.01 },
        { itemId: 'alliance_du_dark_vlad', dropRate: 0.01 },
        { itemId: 'col_du_dark_vlad', dropRate: 0.01 },
        { itemId: 'flamberge_du_dark_vlad', dropRate: 0.01 },
        { itemId: 'tabard_du_dark_vlad', dropRate: 0.01 }
    ]
}

areas.crocuzko = {
    id: 'crocuzko',
    name: "Crocuzko",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/Kashkaille.png",
    description: "Ces marécages aux eaux croupissantes sont le fief des Crocodyls, et leur roi — le Crocuzko himself — assure la sécurité du territoire avec une efficacité dentaire remarquable. Ne vous laissez pas tromper par leur apparente lenteur.",
    spawns: [
        { id: 'kashkaille', weight: 10 },
        { id: 'voapah', weight: 10 },
        { id: 'caiguille', weight: 10 },
        { id: 'alashasss', weight: 10 },
        { id: 'cronnibal', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonTorkelonia', dropRate: 0.15, isKey: true },
        { itemId: 'anneau_lunaire', dropRate: 0.01 },
        { itemId: 'bottes_lunaires', dropRate: 0.01 },
        { itemId: 'collier_lunaire', dropRate: 0.01 },
        { itemId: 'crocanneau', dropRate: 0.01 },
        { itemId: 'croclier', dropRate: 0.01 }
    ]
}

areas.royaumeCorrompu = {
    id: 'royaumeCorrompu',
    name: "Royaume Corrompu",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/Pistilangue.png",
    description: "Ce qui était autrefois un lieu de beauté a été souillé par une magie noire dont on ne connaît pas l'origine. Le Royaume Corrompu est désormais un miroir déformant du monde ordinaire, où chaque créature semble atteinte d'une folie qui se propage comme un venin.",
    spawns: [
        { id: 'pistilangue', weight: 10 },
        { id: 'dolid', weight: 10 },
        { id: 'nheur_gueule', weight: 10 },
        { id: 'tentaclaque', weight: 10 },
        { id: 'gangredogue', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonArbreMort', dropRate: 0.15, isKey: true },
        { itemId: 'alliance_de_corruption', dropRate: 0.01 },
        { itemId: 'bague_de_corruption', dropRate: 0.01 },
        { itemId: 'ceinturonce_de_corruption', dropRate: 0.01 },
        { itemId: 'amulette_de_l_il_putride', dropRate: 0.01 },
        { itemId: 'cape_de_l_il_putride', dropRate: 0.01 },
        { itemId: 'capuche_de_l_il_putride', dropRate: 0.01 }
    ]
}

areas.galereDeServitude = {
    id: 'galereDeServitude',
    name: "Galère de Servitude",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/Tambourreau.png",
    description: "Cette galère fantôme dérive dans les eaux de Sufokia depuis des siècles, portée par des vents qui soufflent à contresens du monde. Son équipage de condamnés n'a jamais eu le droit de reposer, et leur ressentiment nourrit leur violence.",
    spawns: [
        { id: 'tambourreau', weight: 10 },
        { id: 'armecreante', weight: 10 },
        { id: 'gentyran', weight: 10 },
        { id: 'boularbin', weight: 10 },
        { id: 'ecaptif', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonTyrannie', dropRate: 0.15, isKey: true },
        { itemId: 'dora_de_servitude', dropRate: 0.01 },
        { itemId: 'manteau_de_servitude', dropRate: 0.01 },
        { itemId: 'echarpe_de_servitude', dropRate: 0.01 },
        { itemId: 'amulette_du_c_ur_vaillant', dropRate: 0.01 },
        { itemId: 'bottes_du_c_ur_vaillant', dropRate: 0.01 },
        { itemId: 'cape_du_c_ur_vaillant', dropRate: 0.01 }
    ]
}

areas.desertDeMisere = {
    id: 'desertDeMisere',
    name: "Désert de Misère",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/Désosseur.png",
    description: "Le Désert de Misère ne porte pas son nom par hasard. Ses sables noirs et brûlants s'étendent à perte de vue, parsemés de rochers tranchants et traversés par des tornades de cendres. La survie y est une question d'obstination.",
    spawns: [
        { id: 'desosseur', weight: 10 },
        { id: 'ferrailleur', weight: 10 },
        { id: 'krevladal', weight: 10 },
        { id: 'skentu', weight: 10 },
        { id: 'dawaj', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonBalance', dropRate: 0.15, isKey: true },
        { itemId: 'convoitise_de_misere', dropRate: 0.01 },
        { itemId: 'corset_de_misere', dropRate: 0.01 },
        { itemId: 'solerets_de_misere', dropRate: 0.01 },
        { itemId: 'amulette_du_c_ur_saignant', dropRate: 0.01 },
        { itemId: 'bottes_du_c_ur_saignant', dropRate: 0.01 },
        { itemId: 'cape_du_c_ur_saignant', dropRate: 0.01 }
    ]
}

areas.blessureDeGuerre = {
    id: 'blessureDeGuerre',
    name: "Blessure de Guerre",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/Olgoth.png",
    description: "Ce champ de bataille porte encore les stigmates d'une guerre ancienne dont les chroniques gardent peu de détails. La magie destructrice qui y fut déployée a laissé des plaies dans la réalité elle-même, et les créatures qui en ont émergé portent ces cicatrices.",
    spawns: [
        { id: 'olgoth', weight: 10 },
        { id: 'ravalame', weight: 10 },
        { id: 'fleaunide', weight: 10 },
        { id: 'macabrateur', weight: 10 },
        { id: 'trancharnier', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonTroneSang', dropRate: 0.15, isKey: true },
        { itemId: 'ceste_de_guerre', dropRate: 0.01 },
        { itemId: 'forteresse_de_guerre', dropRate: 0.01 },
        { itemId: 'heaume_de_guerre', dropRate: 0.01 },
        { itemId: 'solerets_de_guerre', dropRate: 0.01 },
        { itemId: 'amulette_de_l_il_attentif', dropRate: 0.01 },
        { itemId: 'cape_de_l_il_attentif', dropRate: 0.01 },
        { itemId: 'capuche_de_l_il_attentif', dropRate: 0.01 }
    ]
}

areas.pyramideMaudite = {
    id: 'pyramideMaudite',
    name: "Pyramide maudite",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/Chakanoubis.png",
    description: "Cette pyramide fut construite à une époque où d'autres lois régissaient le Monde des Douze. Les malédictions qui la protègent sont aussi fraîches aujourd'hui qu'au premier jour, et ses gardiens ont eu largement le temps de perfectionner leur art.",
    spawns: [
        { id: 'chakanoubis', weight: 10 },
        { id: 'bandleth', weight: 10 },
        { id: 'momistik', weight: 10 },
        { id: 'rykaon', weight: 10 },
        { id: 'griffotep', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonTalKasha', dropRate: 0.15, isKey: true },
        { itemId: 'baguistik', dropRate: 0.01 },
        { itemId: 'bottistik', dropRate: 0.01 },
        { itemId: 'bouclistik', dropRate: 0.01 },
        { itemId: 'torquistik', dropRate: 0.01 },
        { itemId: 'anneaur_us', dropRate: 0.01 },
        { itemId: 'pagne_du_rykaon', dropRate: 0.01 },
        { itemId: 'pyraguette', dropRate: 0.01 },
        { itemId: 'ankhape', dropRate: 0.01 },
        { itemId: 'capuche_de_moum_ra', dropRate: 0.01 },
        { itemId: 'heqache', dropRate: 0.01 }
    ]
}

areas.pandamonium = {
    id: 'pandamonium',
    name: "Pandamonium",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/Krâradia.png",
    description: "Le Pandamonium est la version cauchemardesque de ce que serait Pandala si tout le monde y avait perdu la raison en même temps — ce qui semble être exactement ce qui s'est passé. Chaos, conflits d'éléments et créatures déchaînées y règnent en maîtres.",
    spawns: [
        { id: 'kraradia', weight: 10 },
        { id: 'belilith', weight: 10 },
        { id: 'bwariok', weight: 10 },
        { id: 'porkzebuth', weight: 10 },
        { id: 'eninferno', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonKabahal', dropRate: 0.15, isKey: true },
        { itemId: 'alliance_du_pandamonium', dropRate: 0.01 },
        { itemId: 'amulette_du_pandamonium', dropRate: 0.01 },
        { itemId: 'baguette_du_pandamonium', dropRate: 0.01 },
        { itemId: 'amulette_possedee', dropRate: 0.01 },
        { itemId: 'anneau_possede', dropRate: 0.01 },
        { itemId: 'bouclier_possede', dropRate: 0.01 },
        { itemId: 'ceinture_possedee', dropRate: 0.01 }
    ]
}

areas.cauchemarDesRavageurs = {
    id: 'cauchemarDesRavageurs',
    name: "Cauchemar des Ravageurs",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/Brutasmodan.png",
    description: "Les Ravageurs sont des créatures qui semblent sorties d'un cauchemar d'enfant — sauf qu'elles sont bien réelles. Cette zone abandonnée à leur emprise ressemble à une scène de destruction permanente, comme si ses habitants ne savaient faire que cela.",
    spawns: [
        { id: 'brutasmodan', weight: 10 },
        { id: 'diabelial', weight: 10 },
        { id: 'typhomet', weight: 10 },
        { id: 'demoloch', weight: 10 },
        { id: 'malephisto', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonAurorePourpre', dropRate: 0.15, isKey: true },
        { itemId: 'ceste_de_ravageur', dropRate: 0.01 },
        { itemId: 'hachoir_de_ravageur', dropRate: 0.01 },
        { itemId: 'torque_de_ravageur', dropRate: 0.01 },
        { itemId: 'bottes_de_l_esprit_malsain', dropRate: 0.01 },
        { itemId: 'ceinture_de_l_esprit_malsain', dropRate: 0.01 },
        { itemId: 'masque_de_l_esprit_malsain', dropRate: 0.01 },
        { itemId: 'bottes_de_l_esprit_salvateur', dropRate: 0.01 },
        { itemId: 'ceinture_de_l_esprit_salvateur', dropRate: 0.01 },
        { itemId: 'masque_de_l_esprit_salvateur', dropRate: 0.01 }
    ]
}

areas.ephedrya = {
    id: 'ephedrya',
    name: "Ephedrya",
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/Soldalia.png",
    description: "Ephedrya, domaine sylvestre de Belladone, est une forêt où la beauté cache le venin. Chaque fleur parfumée peut être mortelle, chaque baie appétissante peut paralyser, et les lianes qui s'agitent seules cherchent à saisir ceux qui s'approchent trop près.",
    spawns: [
        { id: 'soldalia', weight: 10 },
        { id: 'cameliache', weight: 10 },
        { id: 'armuguet', weight: 10 },
        { id: 'coquelicogne', weight: 10 },
        { id: 'statulipe', weight: 5 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'cleDonjonMalefices', dropRate: 0.15, isKey: true },
        { itemId: 'amertume_de_belladone', dropRate: 0.01 },
        { itemId: 'cruaute_de_belladone', dropRate: 0.01 },
        { itemId: 'mur_de_ronces', dropRate: 0.01 },
        { itemId: 'pilier_d_ephedrya', dropRate: 0.01 },
        { itemId: 'potence_d_ephedrya', dropRate: 0.01 },
        { itemId: 'tendresse_de_belladone', dropRate: 0.01 }
    ]
}
// #endregion

// #region DONJONS ────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 15
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonIncarnam = {
    id: 'donjonIncarnam',
    type: 'dungeon',
    keyId: "cleDonjonKardorim",
    name: "La Crypte de Kardorim",
    minLevel: 15, maxLevel: 15,
    mobMinLevel: 15, mobMaxLevel: 15,
    background: "",
    icon: "images/monsters/Kardorim.png",
    description: "Les profondeurs d'Incarnam, placées sous la vigilance du redoutable Kardorim, ancien capitaine devenu aventurier, sont toujours parcourues en compagnie de son fidèle compagnon.",
    spawns: [
        { id: 'kardorim', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'casque_de_kardorim', dropRate: 0.035 },
        { itemId: 'bracelet_de_kardorim', dropRate: 0.035 },
        { itemId: 'cape_de_kardorim', dropRate: 0.035 }
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 25
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonMousse = {
    id: 'donjonMousse',
    type: 'dungeon',
    keyId: 'cleDonjonSable',
    name: "Le Château Ensablé",
    minLevel: 25, maxLevel: 25,
    mobMinLevel: 25, mobMaxLevel: 25,
    background: "",
    icon: "images/monsters/Mob_l_Éponge.png",
    description: "À l'est, baigné par le soleil, un château de sable surplombe les eaux turquoise de la plage d'Astrub. Au cœur de cette forteresse ensablée, une étrange éponge attire les enfants laissés sans surveillance.",
    spawns: [
        { id: 'mobLeponge', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'cape_en_mousse', dropRate: 0.02 },
        { itemId: 'coiffe_en_mousse', dropRate: 0.02 },
        { itemId: 'bottes_en_mousse', dropRate: 0.02 },
        { itemId: 'anneau_en_mousse', dropRate: 0.02 },
        { itemId: 'amulette_en_mousse', dropRate: 0.02 },
        { itemId: 'ceinture_en_mousse', dropRate: 0.02 },
        { itemId: 'pelle_en_mousse', dropRate: 0.02 },
        { itemId: 'bouclier_en_mousse', dropRate: 0.02 }
    ]
}

areas.donjonChamps = {
    id: 'donjonChamps',
    type: 'dungeon',
    keyId: "cleDonjonChamps",
    name: "Grange du Tournesol Affamé",
    minLevel: 25, maxLevel: 25,
    mobMinLevel: 25, mobMaxLevel: 25,
    background: "",
    icon: "images/monsters/Tournesol_Affamé.png",
    description: "Mawy Ingalsse, lassée des mauvaises herbes, décida de bâtir une grange-laboratoire afin de les cultiver et de mieux les étudier. Mais ses expériences finirent par lui échapper, donnant naissance à des tournesols attirés par le sang plutôt que par le soleil.",
    spawns: [
        { id: 'tournesolAffame', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'vegamu', dropRate: 0.02 },
        { itemId: 'vegacoiffe', dropRate: 0.02 },
        { itemId: 'vegacape', dropRate: 0.02 },
        { itemId: 'capouze_des_champs', dropRate: 0.02 },
        { itemId: 'ceinture_fleurie', dropRate: 0.02 },
        { itemId: 'bottes_champetres', dropRate: 0.02 },
        { itemId: 'coiffe_champetre', dropRate: 0.02 },
        { itemId: 'amulette_des_champs', dropRate: 0.02 },
        { itemId: 'anneau_champetre', dropRate: 0.02 },
        { itemId: 'la_plantouze_des_champs', dropRate: 0.02 }
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 35
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonBouftou = {
    id: 'donjonBouftou',
    type: 'dungeon',
    keyId: 'cleDonjonBouftou',
    name: "La Cour du Bouftou Royal",
    minLevel: 35, maxLevel: 35,
    mobMinLevel: 35, mobMaxLevel: 35,
    background: "",
    icon: "images/monsters/Bouftou_Royal.png",
    description: "Au nord des champs d'Astrub, au cœur des paisibles prairies de Tainela, s'étend la cour du Bouftou Royal. Là règne une créature d'une puissance si remarquable que ses congénères lui ont spontanément accordé le titre de roi.",
    spawns: [
        { id: 'bouftouRoyal', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'cape_bouffante_royale', dropRate: 0.02 },
        { itemId: 'boufcoiffe_royale', dropRate: 0.02 },
        { itemId: 'boufbottes_royales', dropRate: 0.02 },
        { itemId: 'epee_royale_du_bouftou', dropRate: 0.02 },
        { itemId: 'anneau_royal_du_bouftou', dropRate: 0.02 },
        { itemId: 'amulette_royale_du_bouftou', dropRate: 0.02 },
        { itemId: 'ceinture_royale_du_bouftou', dropRate: 0.02 },
        { itemId: 'cuirasse_royale_du_bouftou', dropRate: 0.02 }
    ]
}

areas.donjonAcademieGobs = {
    id: 'donjonAcademieGobs',
    type: 'dungeon',
    keyId: "cleDonjonAcademieGobs",
    name: "Akadémie des Gobs",
    minLevel: 35, maxLevel: 35,
    mobMinLevel: 35, mobMaxLevel: 35,
    background: "",
    icon: "images/monsters/Directeur_Grunob.png",
    description: "L'Académie des Gobelins est aussi terrifiante pour les inscrits que pour les intrus. Les Gobets, bien qu'idiots en apparence, ont développé une organisation militaire redoutable au fil des siècles — et leur maître le Kankreblath veille sur la discipline avec une rigueur impitoyable.",
    spawns: [
        { id: 'directeur_grunob', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'ceinture_du_directeur_grunob', dropRate: 0.03 },
        { itemId: 'faux_du_directeur_grunob', dropRate: 0.03 },
        { itemId: 'chapeau_du_directeur_grunob', dropRate: 0.03 },
        { itemId: 'bottes_du_directeur_grunob', dropRate: 0.03 }
    ]
}

areas.donjonMaisonFantome = {
    id: 'donjonMaisonFantome',
    type: 'dungeon',
    keyId: "cleDonjonBoostache",
    name: "Maison Fantôme",
    minLevel: 35,
    maxLevel: 35,
    mobMinLevel: 35,
    mobMaxLevel: 35,
    background: "",
    icon: "images/monsters/Boostache.png",
    description: "",
    spawns: [
        { id: 'boostache', weight: 10 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'cape_du_boostache', dropRate: 0.03 },
        { itemId: 'anneau_du_boostache', dropRate: 0.03 },
        { itemId: 'ceinture_du_boostache', dropRate: 0.03 },
        { itemId: 'amulette_du_boostache', dropRate: 0.03 }
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 45
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonScarafeuille = {
    id: 'donjonScarafeuille',
    type: 'dungeon',
    keyId: 'cleDonjonScarafeuille',
    name: "La Ruche du Scraraboss Dorée",
    minLevel: 45, maxLevel: 45,
    mobMinLevel: 45, mobMaxLevel: 45,
    background: "",
    icon: "images/monsters/Scarabosse_Doré.png",
    description: "Sous la plaine des Scarafeuilles se cache une immense ruche souterraine gardée par la plus imposante et la plus dorée de toutes les créatures de son espèce : le Scaraboss Dorée. Il est dit que quiconque parviendrait à s'emparer de ses trésors dorés vivrait dans l'opulence pour le reste de sa vie. Aucun aventurier n'est revenu pour le confirmer.",
    spawns: [
        { id: 'scarabosse_dore', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'scaracape_doree', dropRate: 0.02 },
        { itemId: 'scaracoiffe_doree', dropRate: 0.02 },
        { itemId: 'scarabottes_dorees', dropRate: 0.02 },
        { itemId: 'anneau_du_scarabosse_dore', dropRate: 0.02 },
        { itemId: 'amulette_du_scarabosse_dore', dropRate: 0.02 },
        { itemId: 'scarature_doree', dropRate: 0.02 },
        { itemId: 'baguette_du_scarabosse_dore', dropRate: 0.02 }
    ]
}

areas.donjonSquelettes = {
    id: 'donjonSquelettes',
    type: 'dungeon',
    keyId: "cleDonjonSquelettes",
    name: "Donjon des Squelettes",
    minLevel: 45, maxLevel: 45,
    mobMinLevel: 45, mobMaxLevel: 45,
    background: "",
    icon: "images/monsters/Chafer_Rōnin.png",
    description: "Dans les profondeurs d'un ancien cimetière oublié errent les âmes de guerriers incapables de trouver le repos. Les Chafers y poursuivent éternellement leurs combats, guidés par l'honneur perdu du redoutable Chafer Rônin.",
    spawns: [
        { id: 'chafer_ronin', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'bottes_du_chafer_primitif', dropRate: 0.03 },
        { itemId: 'marteau_du_chafer_draugr', dropRate: 0.03 },
        { itemId: 'kabuto_du_chafer_ronin', dropRate: 0.03 },
        { itemId: 'pagne_du_chafer_ronin', dropRate: 0.03 }
    ]
}

areas.donjonTofus = {
    id: 'donjonTofus',
    type: 'dungeon',
    keyId: 'cleDonjonTofus',
    name: "Donjon des Tofus",
    minLevel: 45, maxLevel: 45,
    mobMinLevel: 45, mobMaxLevel: 45,
    background: "",
    icon: "images/monsters/Batofu.png",
    description: "Ce qui n'était autrefois qu'un simple nid est devenu un véritable royaume à plumes. Dans ce dédale de couloirs et de nids géants, les Tofus protègent farouchement leur territoire contre quiconque ose troubler leur tranquillité.",
    spawns: [
        { id: 'batofu', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'anneau_du_tofu', dropRate: 0.02 },
        { itemId: 'amulette_du_tofu', dropRate: 0.02 },
        { itemId: 'ceinture_du_tofu', dropRate: 0.02 },
        { itemId: 'kaskofu', dropRate: 0.02 },
        { itemId: 'pantoufles_du_tofu', dropRate: 0.02 },
        { itemId: 'baguette_du_tofu', dropRate: 0.02 },
        { itemId: 'cape_du_tofu', dropRate: 0.02 }
    ]
}

areas.donjonKankreblath = {
    id: 'donjonKankreblath',
    type: 'dungeon',
    keyId: "cleDonjonKankreblath",
    name: "Cache de Kankreblath",
    minLevel: 45, maxLevel: 45,
    mobMinLevel: 45, mobMaxLevel: 45,
    background: "",
    icon: "images/monsters/Kankreblath.png",
    description: "Le Kankreblath trône au cœur de son académie avec la majesté d'une créature qui n'a jamais perdu un combat. Ses serres peuvent fendre l'acier et ses cris paralysent les plus courageux. Ceux qui ont survécu à son antre n'en parlent qu'à voix basse.",
    spawns: [
        { id: 'kankreblath', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'anneau_bille', dropRate: 0.03 },
        { itemId: 'amulette_perle', dropRate: 0.03 },
        { itemId: 'cape_lumette', dropRate: 0.03 },
        { itemId: 'casque_noix', dropRate: 0.03 }
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 55
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonKwakwa = {
    id: 'donjonKwakwa',
    type: 'dungeon',
    keyId: "cleDonjonKwakwa",
    name: "Le Nid du Kwakwa",
    minLevel: 55, maxLevel: 55,
    mobMinLevel: 55, mobMaxLevel: 55,
    background: "",
    icon: "images/monsters/Kwakwa.png",
    description: "Au sommet de la Montagne des Kwaks, là où les vents soufflent si fort que même les oiseaux refusent de voler, se trouve le nid du Kwakwa. Cette créature majestueuse règne sur l'ensemble des Kwaks et Kwakères de la région. Rares sont les aventuriers assez courageux pour s'y aventurer, et plus rares encore ceux qui en reviennent avec une plume.",
    spawns: [
        { id: 'kwakwa', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'kwakwaffe', dropRate: 0.03 },
        { itemId: 'kwakwalliance', dropRate: 0.03 },
        { itemId: 'kwakwanneau', dropRate: 0.03 },
        { itemId: 'kwakwalame', dropRate: 0.03 }
    ]
}

areas.donjonBworks = {
    id: 'donjonBworks',
    type: 'dungeon',
    keyId: "cleDonjonBworks",
    name: "Donjon des Bworks",
    minLevel: 55, maxLevel: 55,
    mobMinLevel: 55, mobMaxLevel: 55,
    background: "",
    icon: "images/monsters/Bworkette.png",
    description: "Au cœur des terres sauvages d'Amakna, les Bworks ont bâti un repaire aussi chaotique que ses habitants. Entre barricades de fortune et inventions douteuses, seule la loi du plus fort règne dans ces tunnels malodorants.",
    spawns: [
        { id: 'bworkette', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'ceinture_de_grut', dropRate: 0.035 },
        { itemId: 'amulette_de_grut', dropRate: 0.035 },
        { itemId: 'bottes_de_grut', dropRate: 0.035 }
    ]
}

areas.donjonForgerons = {
    id: 'donjonForgerons',
    type: 'dungeon',
    keyId: "cleDonjonForgerons",
    name: "Donjon des Forgerons",
    minLevel: 55, maxLevel: 55,
    mobMinLevel: 55, mobMaxLevel: 55,
    background: "",
    icon: "images/monsters/Coffre_des_Forgerons.png",
    description: "Abandonnées depuis des années, les anciennes forges recèlent encore de nombreux trésors. Mais les richesses attirent les convoitises, et le mystérieux Coffre des Forgerons semblent prêts à tout pour protéger leur butin.",
    spawns: [
        { id: 'coffre_des_forgerons', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'ceinture_de_coffrete', dropRate: 0.03 },
        { itemId: 'boffes_cottre', dropRate: 0.03 },
        { itemId: 'caskoffre', dropRate: 0.03 },
        { itemId: 'pendentiffre', dropRate: 0.03 }
    ]
}

areas.donjonHesque = {
    id: 'donjonHesque',
    type: 'dungeon',
    keyId: 'cleDonjonHesque',
    name: 'Grotte Hesque',
    minLevel: 55, maxLevel: 55,
    mobMinLevel: 55, mobMaxLevel: 55,
    background: "",
    icon: 'images/monsters/Corailleur_Magistral.png',
    description: "Sous les côtes d'Asse se cache un réseau de cavernes coralliennes où prospèrent d'étranges créatures marines. Les Corailleurs y règnent en maîtres, façonnant lentement la roche au gré des marées.",
    spawns: [{ id: 'corailleur_magistral', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.45 },
    ]
}

areas.donjonLarves = {
    id: 'donjonLarves',
    type: 'dungeon',
    keyId: "cleDonjonLarves",
    name: "Donjon des Larves",
    minLevel: 55, maxLevel: 55,
    mobMinLevel: 55, mobMaxLevel: 55,
    background: "",
    icon: "images/monsters/Shin_Larve.png",
    description: "Dans les entrailles du monde s'étend un immense réseau de galeries creusées par des larves géantes. Au centre de cette ruche souterraine veille la légendaire Shin Larve, mère d'innombrables générations.",
    spawns: [
        { id: 'shin_larve', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'larvamulette', dropRate: 0.025 },
        { itemId: 'larvasac', dropRate: 0.025 },
        { itemId: 'larvabottes', dropRate: 0.025 },
        { itemId: 'larvacoiffe', dropRate: 0.025 },
        { itemId: 'baguette_larvesque', dropRate: 0.025 }
    ]
}

areas.donjonRefugeSylvestre = {
    id: 'donjonRefugeSylvestre',
    type: 'dungeon',
    keyId: "cleDonjonRefugeSylvestre",
    name: "Refuge sylvestre",
    minLevel: 55, maxLevel: 55,
    mobMinLevel: 55, mobMaxLevel: 55,
    background: "",
    icon: "images/monsters/Rakoopeur.png",
    description: "Ce refuge au cœur de la forêt d'Amakna cache derrière sa façade paisible un nid de créatures qui n'ont pas dit leur dernier mot. La nature elle-même semble conspirer contre les visiteurs non désirés, guidée par une présence ancienne et rancunière.",
    spawns: [
        { id: 'rakoopeur', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'lance_de_guerrier_albueran', dropRate: 0.020 },
        { itemId: 'anneau_de_guerrier_albueran', dropRate: 0.020 },
        { itemId: 'amulette_de_guerrier_albueran', dropRate: 0.020 },
        { itemId: 'casquette_de_rakoopeur', dropRate: 0.020 },
        { itemId: 'queue_de_rakoopeur', dropRate: 0.020 },
        { itemId: 'serpe_de_rakoopeur', dropRate: 0.020 }
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
    background: "",
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
    keyId: "cleDonjonWabbit",
    name: "Château du Wa Wabbit",
    minLevel: 65, maxLevel: 65,
    mobMinLevel: 65, mobMaxLevel: 65,
    background: "",
    icon: "images/monsters/Wa_Wabbit.png",
    description: "Pewché au sommet de l'île des Wabbits, ce château extwavagant abwite le célèbwe Wa Wabbit. Dewwièwe son appawence widicule se cache pouwtant un souverain impwévisible entouwé d'une awmée de wabbits dévoués.",
    spawns: [
        { id: 'wa_wabbit', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'baton_du_wa_wabbit', dropRate: 0.035 },
        { itemId: 'cape_du_wa_wabbit', dropRate: 0.035 },
        { itemId: 'couronne_du_wa_wabbit', dropRate: 0.035 }
    ]
}

areas.donjonKanniboul = {
    id: 'donjonKanniboul',
    type: 'dungeon',
    keyId: "cleDonjonKanniboul",
    name: "Village Kanniboul",
    minLevel: 65, maxLevel: 65,
    mobMinLevel: 65, mobMaxLevel: 65,
    background: "",
    icon: "images/monsters/Kanniboul_Ebil.png",
    description: "Perdu dans la jungle de Moon, le village des Kannibouls demeure inaccessible aux étrangers. Les guerriers de la tribu y vénèrent d'anciennes traditions et accueillent rarement les visiteurs avec bienveillance.",
    spawns: [
        { id: 'kanniboul_ebil', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'bottes_du_kanniboul_ebil', dropRate: 0.03 },
        { itemId: 'alliance_du_kanniboul_ebil', dropRate: 0.03 },
        { itemId: 'masque_du_kanniboul_ebil', dropRate: 0.03 },
        { itemId: 'sceptre_du_kanniboul_ebil', dropRate: 0.03 }
    ]
}

areas.donjonOtomaj = {
    id: 'donjonOtomaj',
    type: 'dungeon',
    keyId: "cleDonjonOtomaj",
    name: "Cale de l'Arche d'Otomaï",
    minLevel: 65, maxLevel: 65,
    mobMinLevel: 65, mobMaxLevel: 65,
    background: "",
    icon: "images/monsters/Gourlo_le_Terrible.png",
    description: "Ancien navire échoué au large de l'île d'Otomaï, l'Arche est devenue le refuge du terrible pirate Gourlo. Les marins racontent encore que ses trésors maudits reposent quelque part dans ses cales inondées.",
    spawns: [
        { id: 'gourlo_le_terrible', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'alliance_d_hichete', dropRate: 0.035 },
        { itemId: 'ceinture_d_hichete', dropRate: 0.035 },
        { itemId: 'amulette_d_hichete', dropRate: 0.035 }
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
    background: "",
    icon: "images/monsters/Mantiscore.png",
    description: "Au cœur du désert brûlant de Saharach, là où les Dunes des Ossements s'étendent à perte de vue, repose un lieu oublié du monde des vivants : le Cimetière des Mastodontes. Ces terres portent le souvenir d'une époque révolue, lorsque d'immenses créatures arpentant l'île s'effondraient ici, laissant derrière elles des squelettes titanesques enfouis sous le sable.",
    spawns: [
        { id: 'mantiscore', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 }
    ]
}

areas.donjonCraqueleurs = {
    id: 'donjonCraqueleurs',
    type: 'dungeon',
    keyId: "cleDonjonCraqueleurs",
    name: "Pitons Rocheux des Craqueleurs",
    minLevel: 75, maxLevel: 75,
    mobMinLevel: 75, mobMaxLevel: 75,
    background: "",
    icon: "images/monsters/Craqueleur_Légendaire.png",
    description: "Au milieu d'impressionnants monolithes de pierre vivent les Craqueleurs, créatures nées des profondeurs de la terre. Dominant ces géants minéraux, le Craqueleur Légendaire incarne la force brute des montagnes d'Amakna.",
    spawns: [
        { id: 'craqueleur_legendaire', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'craquanneau_legendaire', dropRate: 0.025 },
        { itemId: 'ceinture_du_craqueleur_legendaire', dropRate: 0.025 },
        { itemId: 'casque_du_craqueleur_legendaire', dropRate: 0.02 },
        { itemId: 'marteau_du_craqueleur_legendaire', dropRate: 0.025 },
        { itemId: 'amulette_du_craqueleur_legendaire', dropRate: 0.025 },
        { itemId: 'craquelocape_legendaire', dropRate: 0.02 },
        { itemId: 'bottes_du_craqueleur_legendaire', dropRate: 0.025 }
    ]
}

areas.donjonBrumen = {
    id: 'donjonBrumen',
    type: 'dungeon',
    keyId: "cleDonjonBrumen",
    name: "Laboratoire de Brumen Tinctorias",
    minLevel: 75, maxLevel: 75,
    mobMinLevel: 75, mobMaxLevel: 75,
    background: "",
    icon: "images/monsters/Nelween.png",
    description: "Ancien repaire du célèbre bandit Brumen Tinctorias, ce laboratoire renferme encore les vestiges de ses expériences et de ses méfaits. Les lieux sont aujourd'hui hantés par les créatures et les inventions laissées à l'abandon.",
    spawns: [
        { id: 'nelween', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'cape_de_nelween', dropRate: 0.03 },
        { itemId: 'amulette_de_nelween', dropRate: 0.03 },
        { itemId: 'bottes_de_nelween', dropRate: 0.03 },
        { itemId: 'ceinture_de_nelween', dropRate: 0.03 }
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 85
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonDraegnerys = {
    id: 'donjonDraegnerys',
    type: 'dungeon',
    keyId: "cleDonjonDraegnerys",
    name: "L'épreuve' de Draegnerys",
    minLevel: 85, maxLevel: 85,
    mobMinLevel: 85, mobMaxLevel: 85,
    background: "",
    icon: "img/monstres/sprites/Draegnerys.png",
    description: "Sur la presqu'île des Dragoeufs, au cœur des terres fumantes où la roche semble encore porter l'empreinte des anciens dragons, s'élève l'Épreuve de Draegnerys. Ici, chaque pas est une mise à l'épreuve, chaque couloir un test imposé par la gardienne des lieux.",
    spawns: [
        { id: 'draegnerys', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'cape_de_shika', dropRate: 0.035 },
        { itemId: 'shikacoiffe', dropRate: 0.035 },
        { itemId: 'epis_de_shika', dropRate: 0.035 }
    ]
}

areas.donjonTerrierWabbit = {
    id: 'donjonTerrierWabbit',
    type: 'dungeon',
    keyId: "cleDonjonTerrierWabbit",
    name: "Terrier du Wa Wabbit",
    minLevel: 85, maxLevel: 85,
    mobMinLevel: 85, mobMaxLevel: 85,
    background: "",
    icon: "images/monsters/Wa_Wobot.png",
    description: "Sous le château woyal s'étend un vaste wéseau de galewies où les Wabbits ont développé leuws plus étwanges inventions. Au cœuw de ce labywinthe mécanique veille le wedoutable Wa Wobot, pwotecteur du woyaume mais aussi du wéputé Dofus Cawotte.",
    spawns: [
        { id: 'wa_wobot', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'couronne_du_wa_wobot', dropRate: 0.035 },
        { itemId: 'cape_du_wa_wobot', dropRate: 0.035 },
        { itemId: 'ceinture_du_wa_wobot', dropRate: 0.035 }
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 95
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonAbraknydeAncestral = {
    id: 'donjonAbraknydeAncestral',
    type: 'dungeon',
    keyId: "cleDonjonAbraknydeAncestral",
    name: "Domaine Ancestral",
    minLevel: 95, maxLevel: 95,
    mobMinLevel: 95, mobMaxLevel: 95,
    background: "",
    icon: "images/monsters/Abraknyde_Ancestral.png",
    description: "Dans le Domaine Ancestral, la forêt n'est pas un décor. Elle est vivante... et elle vous observe.",
    spawns: [
        { id: 'abraknydeAncestral', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'abracapa_ancestrale', dropRate: 0.025 },
        { itemId: 'abracaska_ancestral', dropRate: 0.025 },
        { itemId: 'protege_tibias_ancestraux', dropRate: 0.025 },
        { itemId: 'anneau_ancestral', dropRate: 0.025 },
        { itemId: 'torque_ancestral', dropRate: 0.025 },
        { itemId: 'abrature_ancestrale', dropRate: 0.025 }
    ]
}

areas.donjonKoulosse = {
    id: 'donjonKoulosse',
    type: 'dungeon',
    keyId: "cleDonjonKoulosse",
    name: "Caverne du Koulosse",
    minLevel: 95, maxLevel: 95,
    mobMinLevel: 95, mobMaxLevel: 95,
    background: "",
    icon: "images/monsters/Koulosse.png",
    description: "Caché dans les montagnes koalaks, cette immense grotte abrite le légendaire Koulosse. Mi-rasta, mi-divinité aux yeux de certains indigènes, il règne sur une jungle aussi mystérieuse que dangereuse. Attention aux fumées qui pourraient vous faire tourner la tête.",
    spawns: [
        { id: 'koulosse', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'sac_du_koulosse', dropRate: 0.03 },
        { itemId: 'bottes_du_koulosse', dropRate: 0.03 },
        { itemId: 'baton_du_koulosse', dropRate: 0.03 },
        { itemId: 'coiffe_du_koulosse', dropRate: 0.03 }
    ]
}

areas.donjonReineNyee = {
    id: 'donjonReineNyee',
    type: 'dungeon',
    keyId: "cleDonjonReineNyee",
    name: "Antre de la Reine Nyée",
    minLevel: 95, maxLevel: 95,
    mobMinLevel: 95, mobMaxLevel: 95,
    background: "",
    icon: "images/monsters/Reine_Nyée.png",
    description: "La Reine Nyée règne sur une colonie de créatures souterraines avec l'autorité d'une monarque absolue. Son palais taillé dans la roche vivante vibre d'une énergie qui met mal à l'aise, et ses sujets défendraient leur reine jusqu'au dernier.",
    spawns: [
        { id: 'reine_nyee', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'gaine_nyee', dropRate: 0.035 },
        { itemId: 'amulette_des_huit_yeux', dropRate: 0.035 },
        { itemId: 'caparak', dropRate: 0.035 }
    ]
}

areas.donjonChouque = {
    id: 'donjonChouque',
    type: 'dungeon',
    keyId: "cleDonjonChouque",
    name: "Bateau du Chouque",
    minLevel: 95, maxLevel: 95,
    mobMinLevel: 95, mobMaxLevel: 95,
    background: "",
    icon: "images/monsters/Le_Chouque.png",
    description: "Le Chouque est une créature que l'on dirait sortie d'une mauvaise blague de Féca — sauf que l'humour s'arrête quand ses appendices magnétiques entrent en contact avec votre armure. Son antre est aussi chaotique que lui-même.",
    spawns: [
        { id: 'le_chouque', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'bouclier_du_chouque', dropRate: 0.03 },
        { itemId: 'cape_du_capitaine_pirate', dropRate: 0.03 },
        { itemId: 'chapeau_du_capitaine_pirate', dropRate: 0.03 },
        { itemId: 'alliance_du_capitaine_pirate', dropRate: 0.03 }
    ]
}

areas.donjonMagikRiktus = {
    id: 'donjonMagikRiktus',
    type: 'dungeon',
    keyId: "cleDonjonMagikRiktus",
    name: "Chapiteau des Magik Riktus",
    minLevel: 95, maxLevel: 95,
    mobMinLevel: 95, mobMaxLevel: 95,
    background: "",
    icon: "images/monsters/Choudini.png",
    description: "Le Magik Riktus est le clown de la mort, le bouffon de l'apocalypse. Son cirque souterrain est un spectacle de cauchemar où les numéros ont tendance à être définitifs. Les feux d'artifice qui illuminent son antre sont aussi beaux que mortels.",
    spawns: [
        { id: 'choudini', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'anneau_riktus', dropRate: 0.035 },
        { itemId: 'cape_riktus', dropRate: 0.035 },
        { itemId: 'masque_riktus', dropRate: 0.035 }
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 105
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonDragonCochon = {
    id: 'donjonDragonCochon',
    type: 'dungeon',
    keyId: 'cleDonjonDragonCochon',
    name: "Antre du Dragon Cochon",
    minLevel: 105, maxLevel: 105,
    mobMinLevel: 105, mobMaxLevel: 105,
    background: "",
    icon: "images/monsters/Dragon_Cochon.png",
    description: "Au cœur du Territoire des Porcos se cache un dédale de galeries nauséabondes où résonnent grognements et rugissements. C'est ici que siège le Dragon Cochon, une créature contre-nature née de la fusion improbable entre la férocité d'un dragon et la brutalité d'un porc géant.",
    spawns: [
        { id: 'dragonCochon', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'Dofus_Turquoise', dropRate: 0.0005 },
        { itemId: 'mules_du_dragon_cochon', dropRate: 0.02 },
        { itemId: 'ceinture_dracochoune', dropRate: 0.02 },
        { itemId: 'coiffe_du_dragon_cochon', dropRate: 0.02 },
        { itemId: 'collier_du_dragon_cochon', dropRate: 0.02 },
        { itemId: 'cape_du_dragon_cochon', dropRate: 0.02 },
        { itemId: 'kaiser', dropRate: 0.02 },
        { itemId: 'anneau_du_dragon_cochon', dropRate: 0.02 }
    ]
}

areas.donjonMeulou = {
    id: 'donjonMeulou',
    type: 'dungeon',
    keyId: 'cleDonjonMeulou',
    name: "Tanière du Meulou",
    minLevel: 105, maxLevel: 105,
    mobMinLevel: 105, mobMaxLevel: 105,
    background: "",
    icon: "images/monsters/Meulou.png",
    description: "Dans les profondeurs de la forêt, les hurlements du Meulou résonnent à travers les arbres. Cette créature maudite, à mi-chemin entre l'homme et le loup, traque sans relâche ceux qui osent pénétrer sur son territoire.",
    spawns: [
        { id: 'meulou', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'Dofus_Emeraude', dropRate: 0.0005 },
        { itemId: 'ceinture_du_meulou', dropRate: 0.02 },
        { itemId: 'anneau_du_meulou', dropRate: 0.02 },
        { itemId: 'bottes_du_meulou', dropRate: 0.02 },
        { itemId: 'cape_du_meulou', dropRate: 0.02 },
        { itemId: 'coiffe_du_meulou', dropRate: 0.02 },
        { itemId: 'la_meulette', dropRate: 0.02 }
    ]
}

areas.donjonRasboul = {
    id: 'donjonRasboul',
    type: 'dungeon',
    keyId: 'cleDonjonRasboul',
    name: 'Goulet du Rasboul',
    minLevel: 105, maxLevel: 105,
    mobMinLevel: 105, mobMaxLevel: 105,
    background: "",
    icon: 'images/monsters/Silf_le_Rasboul_Majeur.png',
    description: "Au cœur des plaines d'Otomaï se trouve le territoire du Rasboul Majeur. Ce gigantesque insecte ou que sais-je règne sur ces plaines et défend agilement son royaume au prix de la vie de ses invocations.",
    spawns: [{ id: 'silf_le_rasboul_majeur', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

areas.donjonDramak = {
    id: 'donjonDramak',
    type: 'dungeon',
    keyId: 'cleDonjonDramak',
    name: "Théâtre de Dramak",
    minLevel: 105, maxLevel: 105,
    mobMinLevel: 105, mobMaxLevel: 105,
    background: "",
    icon: "images/monsters/Maître_des_Pantins.png",
    description: "Dramak le Dragon règne sur une caverne dont les parois suintent de magie draconique. L'air y est chargé de soufre et de quelque chose d'indéfinissable, comme si l'atmosphère elle-même rendait hommage à la puissance de son maître.",
    spawns: [
        { id: 'maitre_des_pantins', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'ceinture_hetorique', dropRate: 0.02 },
        { itemId: 'masque_iproquo', dropRate: 0.02 },
        { itemId: 'bracelet_tmotiv', dropRate: 0.02 }
    ]
}

areas.donjonMoon = {
    id: 'donjonMoon',
    type: 'dungeon',
    keyId: 'cleDonjonMoon',
    name: "Arbre de Moon",
    minLevel: 105, maxLevel: 105,
    mobMinLevel: 105, mobMaxLevel: 105,
    background: "",
    icon: "images/monsters/Moon.png",
    description: "Au cœur de l'île de Moon se dissimule ce donjon taillé dans la roche volcanique, gardé par le Minotoror et ses sbires. La chaleur qui s'en dégage n'est pas uniquement due à la géographie — quelque chose d'ancien et de puissant y couve.",
    spawns: [
        { id: 'moon', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'amulette_de_moon', dropRate: 0.02 },
        { itemId: 'cape_de_moon', dropRate: 0.02 },
        { itemId: 'marteau_de_moon', dropRate: 0.02 },
        { itemId: 'Dofus_Dokoko', dropRate: 0.0005 }
    ]
}

areas.donjonKharnozor = {
    id: 'donjonKharnozor',
    type: 'dungeon',
    keyId: "cleDonjonKharnozor",
    name: "Repaire du Kharnozor",
    minLevel: 105, maxLevel: 105,
    mobMinLevel: 105, mobMaxLevel: 105,
    background: "",
    icon: "images/monsters/Kharnozor.png",
    description: "Kharnozor, l'ancien dragon des Dragoeufs, repose dans cette caverne de Moon Island avec la patience caractéristique de sa race. Les ossements qui parsèment le sol autour de lui témoignent de ceux qui ont cru que patience était synonyme de faiblesse.",
    spawns: [
        { id: 'kharnozor', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'cape_houte', dropRate: 0.01 },
        { itemId: 'holoune', dropRate: 0.01 }
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 115
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonCorbac = {
    id: 'donjonCorbac',
    type: 'dungeon',
    keyId: 'cleDonjonCorbac',
    name: "Bibliothèque du Maître Corbac",
    minLevel: 115, maxLevel: 115,
    mobMinLevel: 115, mobMaxLevel: 115,
    background: "",
    icon: "images/monsters/Maître_Corbac.png",
    description: "Derrière les rayonnages poussiéreux de cette bibliothèque oubliée se cache le domaine du Maître Corbac. Savant, collectionneur et manipulateur, il protège jalousement les connaissances accumulées au fil des siècles.",
    spawns: [
        { id: 'maitre_corbac', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'Dofus_Pourpre', dropRate: 0.0005 },
        { itemId: 'corbottes', dropRate: 0.02 },
        { itemId: 'corbacoiffe', dropRate: 0.02 },
        { itemId: 'corbacape', dropRate: 0.02 },
        { itemId: 'corbalame', dropRate: 0.02 }
    ]
}

areas.donjonRatBlanc = {
    id: 'donjonRatBlanc',
    type: 'dungeon',
    keyId: 'cleDonjonRatBlanc',
    name: "Garde-manger du Rat Blanc",
    minLevel: 115, maxLevel: 115,
    mobMinLevel: 115, mobMaxLevel: 115,
    background: "",
    icon: "images/monsters/Rat_Blanc.png",
    description: "Dans les égouts de Bonta, le Rat Blanc a bâti un véritable empire souterrain. Ses fidèles accumulent vivres et richesses, faisant de ce garde-manger l'un des lieux les plus convoités des profondeurs.",
    spawns: [
        { id: 'rat_blanc', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'bottes_du_rat_blanc', dropRate: 0.02 },
        { itemId: 'gant_du_rat_blanc', dropRate: 0.02 },
        { itemId: 'cape_du_rat_blanc', dropRate: 0.02 },
        { itemId: 'ceinture_du_rat_blanc', dropRate: 0.02 },
        { itemId: 'collier_du_rat_blanc', dropRate: 0.02 },
        { itemId: 'couvre_chef_du_rat_blanc', dropRate: 0.02 },
        { itemId: 'rapiere_du_rat_blanc', dropRate: 0.02 }
    ]
}

areas.donjonRatNoir = {
    id: 'donjonRatNoir',
    type: 'dungeon',
    keyId: 'cleDonjonRatNoir',
    name: "Sousouricière du Rat Noir",
    minLevel: 115, maxLevel: 115,
    mobMinLevel: 115, mobMaxLevel: 115,
    background: "",
    icon: "images/monsters/Rat_Noir.png",
    description: "Sous les rues de Brâkmar s'étend le repaire du Rat Noir et de sa meute. Rusés et impitoyables, ces rongeurs ont transformé les souterrains en un royaume où règnent l'ombre et la maladie.",
    spawns: [
        { id: 'rat_noir', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'gant_du_rat_noir', dropRate: 0.02 },
        { itemId: 'bottes_du_rat_noir', dropRate: 0.02 },
        { itemId: 'ceinture_du_rat_noir', dropRate: 0.02 },
        { itemId: 'masque_du_rat_noir', dropRate: 0.02 },
        { itemId: 'collier_du_rat_noir', dropRate: 0.02 },
        { itemId: 'cape_du_rat_noir', dropRate: 0.02 },
        { itemId: 'dagues_du_rat_noir', dropRate: 0.02 }
    ]
}

areas.donjonDamadrya = {
    id: 'donjonDamadrya',
    type: 'dungeon',
    keyId: 'cleDonjonDamadrya',
    name: "Bambusaie de Damadrya",
    minLevel: 115, maxLevel: 115,
    mobMinLevel: 115, mobMaxLevel: 115,
    background: "",
    icon: "images/monsters/Damadrya.png",
    description: "La Damadrya est la mère de tous les Arbres dans la croyance Sadida. Son donjon est un entrelacement organique de racines et de branches qui forment des salles vivantes, où chaque mur peut se refermer et chaque couloir peut disparaître.",
    spawns: [
        { id: 'damadrya', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'Dofus_Domakuro', dropRate: 0.0005 },
        { itemId: 'boutures', dropRate: 0.02 },
        { itemId: 'plantamulette', dropRate: 0.02 },
        { itemId: 'bulbouclier', dropRate: 0.02 },
        { itemId: 'capistil', dropRate: 0.02 }
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 125
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonMinotoror = {
    id: 'donjonMinotoror',
    type: 'dungeon',
    keyId: 'cleDonjonMinotoror',
    name: "Centre du Labyrinthe du Minotoror",
    minLevel: 125, maxLevel: 125,
    mobMinLevel: 125, mobMaxLevel: 125,
    background: "",
    icon: "images/monsters/Minotoror.png",
    description: "Depuis des siècles, le Minotoror attend les aventuriers assez courageux pour traverser son immense labyrinthe. Peu nombreux sont ceux qui atteignent son sanctuaire, et plus rares encore ceux qui en ressortent vivants.",
    spawns: [
        { id: 'minotoror', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'cape_du_minotoror', dropRate: 0.02 },
        { itemId: 'ceinture_du_minotoror', dropRate: 0.02 },
        { itemId: 'hache_du_minotoror', dropRate: 0.02 },
        { itemId: 'minotokorno', dropRate: 0.02 },
        { itemId: 'collier_du_minotoror', dropRate: 0.02 },
        { itemId: 'anneau_du_minotoror', dropRate: 0.02 },
        { itemId: 'bottes_du_minotoror', dropRate: 0.02 }
    ]
}

areas.donjonCrocabulia = {
    id: 'donjonCrocabulia',
    type: 'dungeon',
    keyId: 'cleDonjonCrocabulia',
    name: "Antre de Crocabulia",
    minLevel: 125, maxLevel: 125,
    mobMinLevel: 125, mobMaxLevel: 125,
    background: "",
    icon: "images/monsters/Crocabulia.png",
    description: "Au plus profond des montagnes dort Crocabulia, l'une des dernières dragonnes du Monde des Douze. Gardienne de trésors inestimables, elle n'accorde aucune pitié aux intrus. Bien qu'il court une rumeur concernant un sadida s'y étant frotté plus d'un millier de fois, mais tout ça n'est que rumeurs... n'est ce pas ?",
    spawns: [
        { id: 'crocabulia', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'Dofus_Vulbis', dropRate: 0.0005 },
        { itemId: 'marteau_du_dragoeuf', dropRate: 0.02 },
        { itemId: 'hache_du_dragoeuf', dropRate: 0.02 },
        { itemId: 'pelle_dragoeuf', dropRate: 0.02 },
        { itemId: 'epee_du_dragoeuf', dropRate: 0.02 },
        { itemId: 'arc_du_dragoeuf', dropRate: 0.02 },
        { itemId: 'baguette_du_dragoeuf', dropRate: 0.02 },
        { itemId: 'baton_du_dragoeuf', dropRate: 0.02 },
        { itemId: 'dagues_du_dragoeuf', dropRate: 0.02 }
    ]
}

areas.donjonTofulaillerRoyal = {
    id: 'donjonTofulaillerRoyal',
    type: 'dungeon',
    keyId: 'cleDonjonTofuRoyal',
    name: 'Tofulailler Royal',
    minLevel: 125, maxLevel: 125,
    mobMinLevel: 125, mobMaxLevel: 125,
    background: "",
    icon: 'images/monsters/Tofu_Royal.png',
    description: "Des milliers de Tofus s'agitent dans ce gigantesque nid dirigé par leur souverain. Malgré son apparence inoffensive et plutot mignonne, le Tofu Royal défend farouchement sa couvée.",
    spawns: [{ id: 'tofu_royal', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.40 },
    ]
}

areas.donjonRoyalmouth = {
    id: 'donjonRoyalmouth',
    type: 'dungeon',
    keyId: 'cleDonjonBoufmouthRoyal',
    name: "Serre du Royalmouth",
    minLevel: 125, maxLevel: 125,
    mobMinLevel: 125, mobMaxLevel: 125,
    background: "",
    icon: "images/monsters/Royalmouth.png",
    description: "Dans les plaines glacées de Frigost, le Royalmouth règne sur une meute de créatures adaptées au froid extrême. Sa puissance et son endurance en font l'un des premiers grands dangers de l'île.",
    spawns: [
        { id: 'royalmouth', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'bottes_du_royalmouth', dropRate: 0.02 },
        { itemId: 'coiffe_du_royalmouth', dropRate: 0.02 },
        { itemId: 'amulette_du_royalmouth', dropRate: 0.02 },
        { itemId: 'ceinture_du_royalmouth', dropRate: 0.02 }
    ]
}

areas.donjonSkeunk = {
    id: 'donjonSkeunk',
    type: 'dungeon',
    keyId: 'cleDonjonSkeunk',
    name: 'Repaire de Skeunk',
    minLevel: 125, maxLevel: 125,
    mobMinLevel: 125, mobMaxLevel: 125,
    background: "",
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
    keyId: 'cleDonjonBlopMulticolore',
    name: "Antre du Blop Multicolore Royal",
    minLevel: 135, maxLevel: 135,
    mobMinLevel: 135, mobMaxLevel: 135,
    background: "",
    icon: "images/monsters/Blop_Multicolore_Royal.png",
    description: "Au centre du Clos des Blops réside une créature aussi étrange que redoutable. Né de l'union des différentes lignées de Blops, le Blop Multicolore Royal est le maître incontesté de ce royaume gélatineux. Il vous en fera voir de toutes les couleurs.",
    spawns: [
        { id: 'blop_multicolore_royal', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'blopture_multicolore_royale', dropRate: 0.02 },
        { itemId: 'amublop_multicolore_royale', dropRate: 0.02 },
        { itemId: 'blopanneau_multicolore_royal', dropRate: 0.02 },
        { itemId: 'bloptes_multicolores_royales', dropRate: 0.02 }
    ]
}

areas.donjonHauteTruche = {
    id: 'donjonHauteTruche',
    type: 'dungeon',
    keyId: 'cleDonjonHauteTruche',
    name: "Volière de la Haute Truche",
    minLevel: 135, maxLevel: 135,
    mobMinLevel: 135, mobMaxLevel: 135,
    background: "",
    icon: "images/monsters/Haute_Truche.png",
    description: "La Haute Truche est une créature de la forêt d'Amakna qui a grandi jusqu'à atteindre des proportions monstrueuses. Son aire de jeu se confond avec son donjon : un espace naturel transformé par sa présence en zone de haute dangerosité.",
    spawns: [
        { id: 'haute_truche', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'ceintruche', dropRate: 0.02 },
        { itemId: 'anneau_truche', dropRate: 0.02 },
        { itemId: 'chapeau_truche', dropRate: 0.02 }
    ]
}

areas.donjonElPiko = {
    id: 'donjonElPiko',
    type: 'dungeon',
    keyId: 'cleDonjonElPiko',
    name: "Caverne d'El Piko",
    minLevel: 135, maxLevel: 135,
    mobMinLevel: 135, mobMaxLevel: 135,
    background: "",
    icon: "images/monsters/El_Piko.png",
    description: "El Piko est un géant parmi les Koalaks de la savane du Caillou de Sidimote. Ce donjon rocheux est son territoire de chasse ancestral, transmis de génération en génération avec une fidélité qui force un respect certain... à distance raisonnable.",
    spawns: [
        { id: 'el_piko', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'sombrero_d_el_piko', dropRate: 0.02 },
        { itemId: 'anneau_d_el_piko', dropRate: 0.02 },
        { itemId: 'amulette_d_el_piko', dropRate: 0.02 }
    ]
}

areas.donjonDameEaux = {
    id: 'donjonDameEaux',
    type: 'dungeon',
    keyId: 'cleDonjonDameEaux',
    name: "Vallée de la Dame des eaux",
    minLevel: 135, maxLevel: 135,
    mobMinLevel: 135, mobMaxLevel: 135,
    background: "",
    icon: "images/monsters/Nagate.png",
    description: "La Dame des Eaux gouverne les profondeurs lacustres de Cania depuis des siècles. Son palais aquatique est une merveille architecturale dans laquelle l'eau est à la fois le mur, le plafond et le sol — et la Dame en contrôle chaque molécule.",
    spawns: [
        { id: 'nagate', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'Dofus_Domakuro', dropRate: 0.0005 },
        { itemId: 'kwarapace', dropRate: 0.02 },
        { itemId: 'kwaflaque', dropRate: 0.02 },
        { itemId: 'kwache', dropRate: 0.02 }
    ]
}

areas.donjonTanukoi = {
    id: 'donjonTanukoi',
    type: 'dungeon',
    keyId: 'cleDonjonTanukoi',
    name: "Atelier du Tanukouï San",
    minLevel: 135, maxLevel: 135,
    mobMinLevel: 135, mobMaxLevel: 135,
    background: "",
    icon: "images/monsters/Tanukouï_San.png",
    description: "Le Tanukoi est une créature de Pandala, esprit renard que l'on dit capable de sept métamorphoses. Son antre est un dédale d'illusions où rien n'est ce qu'il semble, et où le visiteur perd progressivement pied avec la réalité.",
    spawns: [
        { id: 'tanukoui_san', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'Dofus_Domakuro', dropRate: 0.0005 },
        { itemId: 'les_casse_noisettes', dropRate: 0.02 },
        { itemId: 'chapeau_kasse', dropRate: 0.02 },
        { itemId: 'ceinture_pitude', dropRate: 0.02 }
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 145
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonCheneMou = {
    id: 'donjonCheneMou',
    type: 'dungeon',
    keyId: 'cleDonjonCheneMou',
    name: "Clairière du Chêne Mou",
    minLevel: 145, maxLevel: 145,
    mobMinLevel: 145, mobMaxLevel: 145,
    background: "",
    icon: "images/monsters/Chêne_Mou.png",
    description: "Autrefois sage parmi les siens, le Chêne Mou fut corrompu par une magie ancienne qui le plongea dans la folie. Depuis, il règne sur une partie de la Forêt des Abraknydes, transformant chaque intrus en ennemi de la nature.",
    spawns: [
        { id: 'chene_mou', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'Dofus_Turquoise', dropRate: 0.0005 },
        { itemId: 'tongues_du_dimanche_du_chene_mou', dropRate: 0.02 },
        { itemId: 'talisman_du_chene_mou', dropRate: 0.02 },
        { itemId: 'anneau_du_chene_mou', dropRate: 0.02 },
        { itemId: 'vieille_branche_du_chene_mou', dropRate: 0.02 },
        { itemId: 'string_automnal_du_chene_mou', dropRate: 0.02 },
        { itemId: 'cape_usee_du_chene_mou', dropRate: 0.02 },
        { itemId: 'coiffe_du_chene_mou', dropRate: 0.02 }
    ]
}

areas.donjonMansot = {
    id: 'donjonMansot',
    type: 'dungeon',
    keyId: 'cleDonjonMansotRoyal',
    name: "Excavation du Mansot Royal",
    minLevel: 145, maxLevel: 145,
    mobMinLevel: 145, mobMaxLevel: 145,
    background: "",
    icon: "images/monsters/Mansot_Royal.png",
    description: "Sur le Lac gelé de Frigost, les Mansots ont creusé un vaste réseau de galeries sous la glace. Leur souverain, le Mansot Royal, dirige son peuple avec une autorité aussi glaciale que son royaume.",
    spawns: [
        { id: 'mansot_royal', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'couronne_du_mansot_royal', dropRate: 0.02 },
        { itemId: 'anneau_du_mansot_royal', dropRate: 0.02 },
        { itemId: 'cape_du_mansot_royal', dropRate: 0.02 }
    ]
}

areas.donjonTynril = {
    id: 'donjonTynril',
    type: 'dungeon',
    keyId: 'cleDonjonTynril',
    name: "Laboratoire du Tynril",
    minLevel: 145, maxLevel: 145,
    mobMinLevel: 145, mobMaxLevel: 145,
    background: "",
    icon: "images/monsters/Tynril_Consterné.png",
    description: "Au cœur de l'île d'Otomaï subsistent les vestiges d'expériences biologiques menées sans aucune limite morale. Les Tynrils, créatures issues de ces manipulations, continuent d'errer dans le laboratoire en quête de nouvelles victimes.",
    bossMode: 'any',
    spawns: [
        { id: 'tynril_consterne', weight: 25 },
        { id: 'tynril_deconcerte', weight: 25 },
        { id: 'tynril_perfide', weight: 25 },
        { id: 'tynril_ahuri', weight: 25 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'coiffe_du_tynril', dropRate: 0.03 },
        { itemId: 'rhizome_du_tynril', dropRate: 0.03 }
    ]
}

areas.donjonDojoVent = {
    id: 'donjonDojoVent',
    type: 'dungeon',
    keyId: 'cleDonjonDojoVent',
    name: "Dojo du Vent",
    minLevel: 145, maxLevel: 145,
    mobMinLevel: 145, mobMaxLevel: 145,
    background: "",
    icon: "images/monsters/Shihan.png",
    description: "Ce dojo de Pandala est consacré à l'élément air dans toute sa brutalité. Les maîtres des vents qui y enseignent ont réduit des armures en morceaux avec de simples rafales, et leur élève le plus doué est aussi le plus impitoyable.",
    bossMode: 'any',
    spawns: [
        { id: 'shihan', weight: 50 },
        { id: 'hanshi', weight: 50 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'Dofus_Domakuro', dropRate: 0.0005 },
        { itemId: 'nun_charang', dropRate: 0.02 },
        { itemId: 'caparavent', dropRate: 0.02 },
        { itemId: 'collier_de_perlouzes', dropRate: 0.02 }
    ]
}

areas.donjonFouxArtifice = {
    id: 'donjonFouxArtifice',
    type: 'dungeon',
    keyId: 'cleDonjonFouxArtifice',
    name: "Fabrique de foux d'artifice",
    minLevel: 145, maxLevel: 145,
    mobMinLevel: 145, mobMaxLevel: 145,
    background: "",
    icon: "images/monsters/Founoroshi.png",
    description: "Les Foux d'Artifice sont des artificiers qui ont perdu la raison et le sens de la mesure. Leur forteresse est un feu d'artifice permanent où les explosions remplacent la conversation et les bombes tiennent lieu de bonjour.",
    spawns: [
        { id: 'founoroshi', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'Dofus_Domakuro', dropRate: 0.0005 },
        { itemId: 'alliance_des_firefoux', dropRate: 0.02 },
        { itemId: 'ceinture_d_artifices', dropRate: 0.02 },
        { itemId: 'sac_des_firefoux', dropRate: 0.02 }
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 155
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonSphincter = {
    id: 'donjonSphincter',
    type: 'dungeon',
    keyId: 'cleDonjonSphincter',
    name: "Repaire de Sphincter Cell",
    minLevel: 155, maxLevel: 155,
    mobMinLevel: 155, mobMaxLevel: 155,
    background: "",
    icon: "images/monsters/Sphincter_Cell.png",
    description: "Le Sphincter Cell est une zone que même les Iops évitent de nommer à voix haute. Gardé par une créature dont la biologie défie la décence, ce donjon souterrain réserve des surprises que nul guide d'aventure n'a jamais eu l'audace de décrire.",
    spawns: [
        { id: 'sphincter_cell', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'cape_ceremoniale_du_seigneur_des_rats', dropRate: 0.02 },
        { itemId: 'anneau_ceremonial_du_seigneur_des_rats', dropRate: 0.02 },
        { itemId: 'ceinture_ceremoniale_du_seigneur_des_rats', dropRate: 0.02 },
        { itemId: 'coiffe_ceremoniale_du_seigneur_des_rats', dropRate: 0.02 },
        { itemId: 'bottes_ceremoniales_du_seigneur_des_rats', dropRate: 0.02 },
        { itemId: 'collier_ceremonial_du_seigneur_des_rats', dropRate: 0.02 }
    ]
}

areas.donjonGrolandais = {
    id: 'donjonGrolandais',
    type: 'dungeon',
    keyId: 'cleDonjonGrolandais',
    name: "Épave du Grolandais violent",
    minLevel: 155, maxLevel: 155,
    mobMinLevel: 155, mobMaxLevel: 155,
    background: "",
    icon: "images/monsters/Ben_le_Ripate.png",
    description: "Le navire de Ben le Ripate gît désormais prisonnier des glaces de Frigost. Mais même immobilisé, le célèbre pirate continue de terroriser les mers du nord grâce à son équipage de corsaires et de pillards. Gare à son apparence de fantôme, son crochet lui, est bien réel.",
    spawns: [
        { id: 'ben_le_ripate', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'sabre_de_ben_le_ripate', dropRate: 0.02 },
        { itemId: 'chapeau_de_ben_le_ripate', dropRate: 0.02 },
        { itemId: 'crochet_de_ben_le_ripate', dropRate: 0.02 },
        { itemId: 'ceinture_de_ben_le_ripate', dropRate: 0.02 }
    ]
}

areas.donjonTertreSommeil = {
    id: 'donjonTertreSommeil',
    type: 'dungeon',
    keyId: 'cleDonjonTertreSommeil',
    name: "Tertre du long sommeil",
    minLevel: 155, maxLevel: 155,
    mobMinLevel: 155, mobMaxLevel: 155,
    background: "",
    icon: "images/monsters/Hell_Mina.png",
    description: "Le Tertre du Sommeil est un monticule artificiel dans lequel s'endorment des créatures de grande puissance. On ne sait jamais exactement ce qu'on va réveiller dans ces chambres funéraires... et ce qu'on réveille n'est jamais de bonne humeur.",
    spawns: [
        { id: 'hell_mina', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'Dofus_Emeraude', dropRate: 0.0005 },
        { itemId: 'alliance_d_hell_mina', dropRate: 0.02 },
        { itemId: 'cape_d_hell_mina', dropRate: 0.02 },
        { itemId: 'pertuisane_d_hell_mina', dropRate: 0.02 }
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 165
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonObsidiantre = {
    id: 'donjonObsidiantre',
    type: 'dungeon',
    keyId: 'cleDonjonObsidiantre',
    name: "Hypogée de l'Obsidiantre",
    minLevel: 165, maxLevel: 165,
    mobMinLevel: 165, mobMaxLevel: 165,
    background: "",
    icon: "images/monsters/Obsidiantre.png",
    description: "Sous les terres volcaniques de Frigost sommeille l'Obsidiantre, une créature née de la lave et de la roche en fusion. Son réveil menace constamment l'équilibre fragile entre glace et feu qui règne sur l'île.",
    spawns: [
        { id: 'obsidiantre', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'bague_de_l_obsidiantre', dropRate: 0.02 },
        { itemId: 'cape_de_l_obsidiantre', dropRate: 0.02 },
        { itemId: 'amulette_de_l_obsidiantre', dropRate: 0.02 },
        { itemId: 'casque_de_l_obsidiantre', dropRate: 0.02 },
        { itemId: 'bottes_de_l_obsidiantre', dropRate: 0.02 }
    ]
}

areas.donjonKimbo = {
    id: 'donjonKimbo',
    type: 'dungeon',
    keyId: 'cleDonjonKimbo',
    name: "Canopée du Kimbo",
    minLevel: 165, maxLevel: 165,
    mobMinLevel: 165, mobMaxLevel: 165,
    background: "",
    icon: "images/monsters/Kimbo.png",
    description: "Au sommet des arbres géants de l'île d'Otomaï vit le Kimbo, gardien ancestral des lieux. Sa maîtrise de la flore et sa connaissance des secrets de l'île en font un adversaire aussi sage que redoutable.",
    spawns: [
        { id: 'kimbo', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'sandales_circulaires_du_kimbo', dropRate: 0.03 },
        { itemId: 'le_kim', dropRate: 0.03 }
    ]
}

areas.donjonMinotot = {
    id: 'donjonMinotot',
    type: 'dungeon',
    keyId: 'cleDonjonMinotot',
    name: "Salle du Minotot",
    minLevel: 165, maxLevel: 165,
    mobMinLevel: 165, mobMaxLevel: 165,
    background: "",
    icon: "images/monsters/Minotot.png",
    description: "Plus érudit que son cousin Minotoror, le Minotot règne au plus profond du légendaire labyrinthe. Les aventuriers qui parviennent jusqu'à lui doivent affronter autant son intelligence que sa puissance. On dit qu'il aime tellement les oeufs de tofu, qu'il en collectionnerait un bien particulier, infusé de pouvoirs magiques.",
    spawns: [
        { id: 'minotot', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'Dofus_Pourpre', dropRate: 0.0005 },
        { itemId: 'bracelet_du_minotot', dropRate: 0.02 },
        { itemId: 'ceinture_du_minotot', dropRate: 0.02 },
        { itemId: 'sceptre_du_minotot', dropRate: 0.02 },
        { itemId: 'cape_du_minotot', dropRate: 0.02 },
        { itemId: 'coiffe_du_minotot', dropRate: 0.02 },
        { itemId: 'collier_du_minotot', dropRate: 0.02 },
        { itemId: 'sandales_du_minotot', dropRate: 0.02 }
    ]
}

areas.donjonKanigroula = {
    id: 'donjonKanigroula',
    type: 'dungeon',
    keyId: 'cleDonjonKanigroula',
    name: "Grotte de Kanigroula",
    minLevel: 165, maxLevel: 165,
    mobMinLevel: 165, mobMaxLevel: 165,
    background: "",
    icon: "images/monsters/Kanigroula.png",
    description: "La Kanigroula est une créature de la nuit d'Amakna que les conteurs locaux utilisent pour effrayer les enfants. Sauf que la Kanigroula est bien réelle, et son repaire sous les collines boisées l'est tout autant.",
    spawns: [
        { id: 'kanigroula', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'ceinture_du_kaniblou', dropRate: 0.01 },
        { itemId: 'cape_du_kaniblou', dropRate: 0.01 },
        { itemId: 'anneau_du_kaniblou', dropRate: 0.01 },
        { itemId: 'amulette_de_l_orfelin', dropRate: 0.01 },
        { itemId: 'ceinture_de_l_orfelin', dropRate: 0.01 },
        { itemId: 'coiffe_de_l_orfelin', dropRate: 0.01 }
    ]
}

areas.donjonShogunTofugawa = {
    id: 'donjonShogunTofugawa',
    type: 'dungeon',
    keyId: 'cleDonjonShogunTofugawa',
    name: "Tombe du Shogun Tofugawa",
    minLevel: 165, maxLevel: 165,
    mobMinLevel: 165, mobMaxLevel: 165,
    background: "",
    icon: "images/monsters/Shogun_Tofugawa.png",
    description: "Le Shogun Tofugawa règne sur ses terres de Pandala avec le code d'honneur impitoyable d'un guerrier ancien. Son palais de laque et de bois précieux est aussi beau que son maître est redoutable, et l'accès sans invitation y est puni de mort.",
    spawns: [
        { id: 'shogun_tofugawa', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'Dofus_Dorigami', dropRate: 0.0005 },
        { itemId: 'bandeau_de_spiritueur', dropRate: 0.02 },
        { itemId: 'katana_de_spiritueur', dropRate: 0.02 },
        { itemId: 'fut_d_aspiratueur', dropRate: 0.02 }
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 175
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonGivrefoux = {
    id: 'donjonGivrefoux',
    type: 'dungeon',
    keyId: 'cleDonjonGivrefoux',
    name: "Tanière Givrefoux",
    minLevel: 175, maxLevel: 175,
    mobMinLevel: 175, mobMaxLevel: 175,
    background: "",
    icon: "images/monsters/Tengu_Givrefoux.png",
    description: "Dans les montagnes enneigées de Frigost, les Givrefoux perpétuent d'antiques traditions héritées d'un passé oublié. Leur chef, le Tengu Givrefoux, veille jalousement sur son clan et ses secrets.",
    spawns: [
        { id: 'tengu_givrefoux', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'bottes_du_tengu_givrefoux', dropRate: 0.02 },
        { itemId: 'coiffe_de_tengu_givrefoux', dropRate: 0.02 },
        { itemId: 'cape_de_tengu_givrefoux', dropRate: 0.02 },
        { itemId: 'ceinture_du_tengu_givrefoux', dropRate: 0.02 },
        { itemId: 'anneau_de_la_fuji_givrefoux', dropRate: 0.02 },
        { itemId: 'cape_de_la_fuji_givrefoux', dropRate: 0.02 },
        { itemId: 'bottes_de_la_fuji_givrefoux', dropRate: 0.02 },
        { itemId: 'coiffe_de_la_fuji_givrefoux', dropRate: 0.02 }
    ]
}

areas.donjonPereVer = {
    id: 'donjonPereVer',
    type: 'dungeon',
    keyId: 'cleDonjonPereVer',
    name: "Boyau du Père Ver",
    minLevel: 175, maxLevel: 175,
    mobMinLevel: 175, mobMaxLevel: 175,
    background: "",
    icon: "images/monsters/Père_Ver.png",
    description: "Le Père Ver est le patriarche d'une lignée de créatures souterraines qui ont creusé des tunnels à travers toute l'Amakna. Son repaire central est un nœud de galeries dans lequel même les plus expérimentés des aventuriers perdent leur chemin.",
    spawns: [
        { id: 'pere_ver', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'veranneau', dropRate: 0.02 },
        { itemId: 'capiktenia', dropRate: 0.02 },
        { itemId: 'chaussquales', dropRate: 0.02 }
    ]
}

areas.donjonDemeureEsprits = {
    id: 'donjonDemeureEsprits',
    type: 'dungeon',
    keyId: "cleDonjonDemeureEsprits",
    name: "Demeure des Esprits",
    minLevel: 175, maxLevel: 175,
    mobMinLevel: 175, mobMaxLevel: 175,
    background: "",
    icon: "images/monsters/Koumiho.png",
    description: "La Demeure des Esprits est un espace à la frontière entre le monde des vivants et celui des morts. Les esprits qui y résident n'ont pas accepté leur condition et refusent le passage, s'accrochant à la réalité avec une férocité née du désespoir.",
    spawns: [
        { id: 'koumiho', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'Dofus_Dorigami', dropRate: 0.0005 }
    ]
}

areas.donjonSupervizoeuf = {
    id: 'donjonSupervizoeuf',
    type: 'dungeon',
    keyId: '',
    name: 'Poste de contrôle du Supervizœuf',
    minLevel: 175, maxLevel: 175,
    mobMinLevel: 175, mobMaxLevel: 175,
    background: "",
    icon: 'images/monsters/Supervizœuf.png',
    description: "Le Supervizœuf est l'agent de contrôle de la Nation des Œufs, une entité bureaucratique dont les tampons font plus de dégâts que la plupart des armes. Son poste de contrôle est un cauchemar administratif doublé d'un danger mortel.",
    spawns: [{ id: 'superviz_uf', weight: 100 }],
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
    keyId: 'cleDonjonBworker',
    name: "Grotte du Bworker",
    minLevel: 185, maxLevel: 185,
    mobMinLevel: 185, mobMaxLevel: 185,
    background: "",
    icon: "images/monsters/Bworker.png",
    description: "Fruit d'expériences interdites menées sur les Bworks, le Bworker est devenu une abomination d'une puissance terrifiante. Son influence s'étend sur toutes les tribus voisines qui le considèrent comme un véritable dieu vivant.",
    spawns: [
        { id: 'bworker', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'anneau_blitere', dropRate: 0.02 },
        { itemId: 'ceinture_tore', dropRate: 0.02 },
        { itemId: 'bottes_repane', dropRate: 0.02 },
        { itemId: 'casque_harnage', dropRate: 0.02 }
    ]
}

areas.donjonOugah = {
    id: 'donjonOugah',
    type: 'dungeon',
    keyId: "cleDonjonOugah",
    name: "Temple du Grand Ougah",
    minLevel: 185, maxLevel: 185,
    mobMinLevel: 185, mobMaxLevel: 185,
    background: "",
    icon: "images/monsters/Ougah.png",
    description: "Au cœur de la forêt pétrifiée repose le temple du Grand Ougah, chef spirituel des Fungus. Les spores et champignons qui envahissent les lieux semblent obéir à sa seule volonté.",
    spawns: [
        { id: 'ougah', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'ougalurette', dropRate: 0.03 },
        { itemId: 'ougarteau', dropRate: 0.03 },
        { itemId: 'ougamulette', dropRate: 0.03 },
        { itemId: 'ougature', dropRate: 0.03 }
    ]
}

areas.donjonKolosso = {
    id: 'donjonKolosso',
    type: 'dungeon',
    keyId: 'cleDonjonKolosso',
    name: "Cavernes du Kolosso",
    minLevel: 185, maxLevel: 185,
    mobMinLevel: 185, mobMaxLevel: 185,
    background: "",
    icon: "images/monsters/Kolosso.png",
    description: "Ancien disciple du Comte Harebourg, le Professeur Xa poursuit encore ses recherches sur le temps et les dimensions. Ses expériences ont transformé les créatures qui vivaient autrefoit dans ces cavernes.",
    bossMode: 'any',
    spawns: [
        { id: 'kolosso', weight: 50 },
        { id: 'professeur_xa', weight: 50 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'ceinture_de_kolosso', dropRate: 0.02 },
        { itemId: 'anneau_de_kolosso', dropRate: 0.02 },
        { itemId: 'coiffe_de_kolosso', dropRate: 0.02 },
        { itemId: 'anneau_du_professeur_xa', dropRate: 0.02 },
        { itemId: 'pelle_du_professeur_xa', dropRate: 0.02 },
        { itemId: 'bottes_du_professeur_xa', dropRate: 0.02 },
        { itemId: 'cape_du_professeur_xa', dropRate: 0.02 },
        { itemId: 'amulette_du_professeur_xa', dropRate: 0.02 }
    ]
}

areas.donjonSakai = {
    id: 'donjonSakai',
    type: 'dungeon',
    keyId: 'cleDonjonSakai',
    name: "Donjon de la mine de Sakaï",
    minLevel: 185, maxLevel: 185,
    mobMinLevel: 185, mobMaxLevel: 185,
    background: "",
    icon: "images/monsters/Grolloum.png",
    description: "Abandonnée depuis longtemps par les mineurs, la mine de Sakaï est devenue le territoire du redoutable Grolloum. Entre galeries effondrées et créatures sauvages, les richesses enfouies attirent toujours les aventuriers les plus téméraires.",
    spawns: [
        { id: 'grolloum', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'frimacoiffe', dropRate: 0.01 },
        { itemId: 'frimamulette', dropRate: 0.01 },
        { itemId: 'frimanneau', dropRate: 0.01 },
        { itemId: 'frimature', dropRate: 0.01 },
        { itemId: 'gresilobottes', dropRate: 0.01 },
        { itemId: 'gresilosceptre', dropRate: 0.01 },
        { itemId: 'gresilocape', dropRate: 0.01 },
        { itemId: 'gresilanneau', dropRate: 0.01 }
    ]
}

areas.donjonKorriandre = {
    id: 'donjonKorriandre',
    type: 'dungeon',
    keyId: 'cleDonjonKorriandre',
    name: "Antre du Korriandre",
    minLevel: 185, maxLevel: 185,
    mobMinLevel: 185, mobMaxLevel: 185,
    background: "",
    icon: "images/monsters/Korriandre.png",
    description: "Le Korriandre est une plante carnivore que l'alchimie runique a rendu consciente et particulièrement mauvaise. Son antre exhale des parfums trompeurs destinés à attirer les proies dans ses mâchoires végétales, et ces dernières n'ont pas de pitié.",
    spawns: [
        { id: 'korriandre', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'anneau_du_korriandre', dropRate: 0.02 },
        { itemId: 'cape_du_korriandre', dropRate: 0.02 },
        { itemId: 'amulette_du_korriandre', dropRate: 0.02 },
        { itemId: 'hache_du_korriandre', dropRate: 0.02 }
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 195
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonGloursons = {
    id: 'donjonGloursons',
    type: 'dungeon',
    keyId: 'cleDonjonGloursons',
    name: "Antichambre des Gloursons",
    minLevel: 195, maxLevel: 195,
    mobMinLevel: 195, mobMaxLevel: 195,
    background: "",
    icon: "images/monsters/Glourséleste.png",
    description: "Aux portes des remparts enneigés au sommet du Mont Torrideau se dresse une ruches au dimensions plutôt impressionnantes : la ruche du Glourséleste. Un royaume où prospèrent des créatures étranges, nées de l'évolution des aibeilles endémiques de Frigost. Leur maître règne sur cet écosystème unique, fruit d'années d'adaptation au froid.",
    spawns: [
        { id: 'glourseleste', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'ceinture_du_glourseleste', dropRate: 0.02 },
        { itemId: 'bottes_du_glourseleste', dropRate: 0.02 },
        { itemId: 'cape_du_glourseleste', dropRate: 0.02 },
        { itemId: 'amulette_du_glourseleste', dropRate: 0.02 },
        { itemId: 'masque_du_glourseleste', dropRate: 0.02 }
    ]
}

areas.donjonOmbre = {
    id: 'donjonOmbre',
    type: 'dungeon',
    keyId: 'cleDonjonOmbre',
    name: "Pyramide d'Ombre",
    minLevel: 195, maxLevel: 195,
    mobMinLevel: 200, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/Ombre.png",
    description: "La Pyramide d'Ombre est un monument à l'inverse de la lumière. Construite par une secte ancienne dans le désert de Sufokia, elle fonctionne comme un piège à âmes dont Ombre est à la fois le gardien et le principal bénéficiaire.",
    spawns: [
        { id: 'ombre', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'casqnoar', dropRate: 0.02 },
        { itemId: 'anneau_kturne', dropRate: 0.02 },
        { itemId: 'bottes_refois', dropRate: 0.02 }
    ]
}

areas.donjonRazof = {
    id: 'donjonRazof',
    type: 'dungeon',
    keyId: 'cleDonjonRazof',
    name: "Camp du Comte Razof",
    minLevel: 195, maxLevel: 195,
    mobMinLevel: 200, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/Comte_Razof.png",
    description: "Le Comte Razof, vampire des contrées froides de Frigost, a établi son camp dans un château de glace aux couleurs d'un crépuscule éternel. Ses sbires, aussi pâles que leur maître, gardent les accès avec la fidélité absolue que seule la nuit froide peut inspirer.",
    spawns: [
        { id: 'comte_razof', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'chaussons_du_comte_razof', dropRate: 0.02 },
        { itemId: 'ceinture_du_comte_razof', dropRate: 0.02 },
        { itemId: 'chapeau_du_comte_razof', dropRate: 0.02 }
    ]
}

areas.donjonBastionMarteaux = {
    id: 'donjonBastionMarteaux',
    type: 'dungeon',
    keyId: 'cleDonjonBastionMarteaux',
    name: "Bastion des Marteaux-Aigris",
    minLevel: 195, maxLevel: 195,
    mobMinLevel: 200, mobMaxLevel: 200,
    background: "",
    icon: "images/monsters/Barbéryl_Clochecuivre.png",
    description: "Les Marteaux-Aigris sont des Nains que la frustration et l'alchimie ont transformés en guerriers d'une efficacité redoutable. Leur bastion souterrain résonne du fracas de leur artisanat de destruction, et Barbéryl Clochecuivre en est le chef d'orchestre.",
    spawns: [
        { id: 'barberyl_clochecuivre', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.4 },
        { itemId: 'grelots_de_barberyl', dropRate: 0.02 },
        { itemId: 'subligar_de_barberyl', dropRate: 0.02 },
        { itemId: 'tonfas_de_barberyl', dropRate: 0.02 }
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// NIVEAU 200
// ─────────────────────────────────────────────────────────────────────────────

areas.donjonSylargh = {
    id: 'donjonSylargh',
    type: 'dungeon',
    keyId: 'cleDonjonSylargh',
    name: "Transporteur de Sylargh",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: "images/monsters/Sylargh.png",
    description: "Sylargh est un mastodonte de métal et de magie qui sillonnait les glaces de Frigost avant que la Grande Congélation ne scelle son destin. Réanimé par des forces inconnues, il transporte maintenant vers une destination que nul ne souhaite atteindre.",
    spawns: [
        { id: 'sylargh', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.35 },
        { itemId: 'Dofus_des_Glaces', dropRate: 0.0005 },
        { itemId: 'sangle_de_sylargh', dropRate: 0.02 },
        { itemId: 'capuche_de_sylargh', dropRate: 0.02 },
        { itemId: 'cape_de_sylargh', dropRate: 0.02 }
    ]
}

areas.donjonKlime = {
    id: 'donjonKlime',
    type: 'dungeon',
    keyId: 'cleDonjonKlime',
    name: "Salons privés de Klime",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: "images/monsters/Klime.png",
    description: "Les Salons privés de Klime, dans les profondeurs glacées de Frigost, sont un paradoxe de luxe et de violence. Ce mage des glaces reçoit ses visiteurs avec toute la courtoisie d'un aristocrate... avant de les congeler pour sa collection personnelle.",
    spawns: [
        { id: 'klime', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.35 },
        { itemId: 'Dofus_des_Glaces', dropRate: 0.0005 },
        { itemId: 'masque_de_klime', dropRate: 0.02 },
        { itemId: 'cape_de_klime', dropRate: 0.02 },
        { itemId: 'ceinture_de_klime', dropRate: 0.02 }
    ]
}

areas.donjonMissizFrizz = {
    id: 'donjonMissizFrizz',
    type: 'dungeon',
    keyId: 'cleDonjonMissizFrizz',
    name: "Forgefroide de Missiz Frizz",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: "images/monsters/Missiz_Frizz.png",
    description: "La Forgefroide de Missiz Frizz est l'atelier d'une artisane qui a fait du froid son matériau de prédilection. Ses créations — armures de glace vive, armes d'acier glacial — sont aussi belles que meurtrières, et leur créatrice l'est tout autant.",
    spawns: [
        { id: 'missiz_frizz', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.35 },
        { itemId: 'Dofus_des_Glaces', dropRate: 0.0005 },
        { itemId: 'bottes_de_missiz_frizz', dropRate: 0.02 },
        { itemId: 'casque_de_missiz_frizz', dropRate: 0.02 },
        { itemId: 'alliance_de_missiz_frizz', dropRate: 0.02 },
        { itemId: 'ceinture_glaciale', dropRate: 0.02 },
        { itemId: 'anneau_glacial', dropRate: 0.02 },
        { itemId: 'cape_glaciale', dropRate: 0.02 }
    ]
}

areas.donjonNileza = {
    id: 'donjonNileza',
    type: 'dungeon',
    keyId: 'cleDonjonNileza',
    name: "Laboratoire de Nileza",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: "images/monsters/Nileza.png",
    description: "Le Laboratoire de Nileza est l'antre d'une scientifique dont les expériences sur le froid et la vie ont depuis longtemps dépassé les bornes éthiques. Ses cobayes involontaires peuplent les couloirs avec une résignation qui fait froid dans le dos.",
    spawns: [
        { id: 'nileza', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.35 },
        { itemId: 'Dofus_des_Glaces', dropRate: 0.0005 },
        { itemId: 'amulette_de_nileza', dropRate: 0.02 },
        { itemId: 'cape_de_nileza', dropRate: 0.02 },
        { itemId: 'bottes_de_nileza', dropRate: 0.02 }
    ]
}

areas.donjonHarebourg = {
    id: 'donjonHarebourg',
    type: 'dungeon',
    keyId: 'cleDonjonHarebourg',
    name: "Donjon du Comte Harebourg",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: "images/monsters/Comte_Harebourg.png",
    description: "Le Donjon du Comte Harebourg est la demeure du maître de Frigost, celui-là même qui a fait pacte avec des puissances interdites pour plonger son île dans l'hiver éternel. Y entrer, c'est pénétrer dans le cœur d'une obsession vieille de siècles.",
    spawns: [
        { id: 'comte_harebourg', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.35 },
        { itemId: 'Dofus_des_Glaces', dropRate: 0.0005 },
        { itemId: 'anneau_du_comte_harebourg', dropRate: 0.02 },
        { itemId: 'bottes_du_comte_harebourg', dropRate: 0.02 },
        { itemId: 'coiffe_du_comte_harebourg', dropRate: 0.02 },
        { itemId: 'amulette_seculaire', dropRate: 0.02 },
        { itemId: 'ceinture_seculaire', dropRate: 0.02 },
        { itemId: 'coiffe_seculaire', dropRate: 0.02 }
    ]
}

areas.donjonMerkator = {
    id: 'donjonMerkator',
    type: 'dungeon',
    keyId: "cleDonjonMerkator",
    name: "Aquadôme de Merkator",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: "images/monsters/Merkator.png",
    description: "L'Aquadôme de Merkator est une merveille d'ingénierie sufokienne : un dôme sous-marin dans lequel l'eau et la magie coexistent dans un équilibre fragile. Merkator, son créateur, n'apprécie pas les visites non sollicitées de son chef-d'œuvre.",
    spawns: [
        { id: 'merkator', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.35 },
        { itemId: 'Dofus_Abyssal', dropRate: 0.0005 },
        { itemId: 'anneau_tique', dropRate: 0.02 },
        { itemId: 'dorabysses', dropRate: 0.02 },
        { itemId: 'talisman_glouti', dropRate: 0.02 },
        { itemId: 'bracelet_des_fonds_marins', dropRate: 0.02 },
        { itemId: 'masque_des_fonds_marins', dropRate: 0.02 },
        { itemId: 'sandales_des_fonds_marins', dropRate: 0.02 }
    ]
}

areas.donjonBaleine = {
    id: 'donjonBaleine',
    type: 'dungeon',
    keyId: 'cleDonjonBaleine',
    name: "Ventre de la Baleine",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: "images/monsters/Protozorreur.png",
    description: "Vous ne visitez pas ce donjon — vous êtes digéré par lui. Le ventre de la Baleine est un écosystème à part entière, dans lequel des créatures ont évolué dans l'obscurité acide d'un estomac de léviathan. Le Protozorreur en est le gardien.",
    spawns: [
        { id: 'protozorreur', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.35 },
        { itemId: 'baleinabottes', dropRate: 0.02 },
        { itemId: 'capchalot', dropRate: 0.02 },
        { itemId: 'ceintace', dropRate: 0.02 },
        { itemId: 'kidibonnet', dropRate: 0.02 },
        { itemId: 'masse_etacee', dropRate: 0.02 }
    ]
}

areas.donjonMeno = {
    id: 'donjonMeno',
    type: 'dungeon',
    keyId: 'cleDonjonMeno',
    name: "Vaisseau du Capitaine Meno",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: "images/monsters/Capitaine_Meno.png",
    description: "Le Capitaine Meno est la légende des mers de Sufokia : un corsaire immortel dont le vaisseau fantôme sème la terreur dans tous les ports. Monter à bord de ce navire, c'est accepter de jouer aux dés avec un mort qui triche.",
    spawns: [
        { id: 'capitaine_meno', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.35 },
        { itemId: 'Dofus_Abyssal', dropRate: 0.0005 },
        { itemId: 'bottes_de_meno', dropRate: 0.02 },
        { itemId: 'cape_de_meno', dropRate: 0.02 },
        { itemId: 'casquette_de_meno', dropRate: 0.02 }
    ]
}

areas.donjonKoutoulou = {
    id: 'donjonKoutoulou',
    type: 'dungeon',
    keyId: 'cleDonjonKoutoulou',
    name: "Temple de Koutoulou",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: "images/monsters/Larve_de_Koutoulou.png",
    description: "Le Temple de Koutoulou, dressé sur Moon Island, est dédié à une entité que les habitants de l'île vénèrent avec une terreur sacrée. Les Larves de Koutoulou en gardent les passages, et ce qu'elles protègent au cœur du temple dépasse l'entendement.",
    spawns: [
        { id: 'larve_de_koutoulou', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.35 },
        { itemId: 'Dofus_Abyssal', dropRate: 0.0005 },
        { itemId: 'amulette_de_l_indicible', dropRate: 0.02 },
        { itemId: 'bottes_de_l_indicible', dropRate: 0.02 },
        { itemId: 'ceinture_de_l_indicible', dropRate: 0.02 }
    ]
}

areas.donjonDantinea = {
    id: 'donjonDantinea',
    type: 'dungeon',
    keyId: 'cleDonjonDantinea',
    name: "Palais de Dantinéa",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: "images/monsters/Dantinéa.png",
    description: "Le Palais de Dantinéa, au cœur de Pandala, est celui d'une impératrice Dragon dont l'autorité est absolue sur tous les êtres reptiliens de l'île. Son trône, taillé dans un seul cristal rouge, diffuse une chaleur qui fait fondre les armures des intrus.",
    spawns: [
        { id: 'dantinea', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.35 },
        { itemId: 'Dofus_Abyssal', dropRate: 0.0005 },
        { itemId: 'ceintouse', dropRate: 0.02 },
        { itemId: 'chapoulpe', dropRate: 0.02 },
        { itemId: 'tentassons', dropRate: 0.02 }
    ]
}

areas.donjonKatrepat = {
    id: 'donjonKatrepat',
    type: 'dungeon',
    keyId: 'cleDonjonKatrepat',
    name: "Manoir des Katrepat",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: "images/monsters/Anerice_la_Shushess.png",
    description: "Le Manoir des Katrepat est une demeure aristocratique tombée entre les mains de créatures qui ont fait de la noblesse une forme de guerre. Anérice la Shushess y règne avec tous les codes de l'étiquette — appliqués avec une brutalité raffinée.",
    spawns: [
        { id: 'anerice_la_shushess', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.35 },
        { itemId: 'bouclier_d_anerice', dropRate: 0.02 },
        { itemId: 'cape_d_anerice', dropRate: 0.02 },
        { itemId: 'masque_d_anerice', dropRate: 0.02 }
    ]
}

areas.donjonIlyzaelle = {
    id: 'donjonIlyzaelle',
    type: 'dungeon',
    keyId: "cleDonjonIlyzaelle",
    name: "Belvédère d'Ilyzaelle",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: "images/monsters/Ilyzaelle.png",
    description: "Le Belvédère d'Ilyzaelle offre une vue imprenable sur la forêt de Hhoohoho... pour ceux qui survivent assez longtemps pour en profiter. Ilyzaelle, créature divine du panthéon des Dopeuls, n'accorde pas ce privilège facilement.",
    spawns: [
        { id: 'ilyzaelle', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.35 },
        { itemId: 'Dofus_Ivoire', dropRate: 0.0005 },
        { itemId: 'amulette_d_ilyzaelle', dropRate: 0.02 },
        { itemId: 'bouclier_d_ilyzaelle', dropRate: 0.02 },
        { itemId: 'casque_d_ilyzaelle', dropRate: 0.02 }
    ]
}

areas.donjonBethel = {
    id: 'donjonBethel',
    type: 'dungeon',
    keyId: 'cleDonjonBethel',
    name: "Tour de Bethel",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: "images/monsters/Bethel_Akarna.png",
    description: "La Tour de Bethel est un édifice à la croisée des forces de la nature et des ambitions humaines. Bethel Akarna manipule les éléments avec une maîtrise que même les Féca les plus aguerris regardent avec une inquiétude respectueuse.",
    spawns: [
        { id: 'bethel_akarna', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.35 },
        { itemId: 'Dofus_Ebene', dropRate: 0.0005 },
        { itemId: 'Dofus_Forgelave', dropRate: 0.0005 },
        { itemId: 'chaussons_de_macrab', dropRate: 0.02 },
        { itemId: 'culotte_de_bethel', dropRate: 0.02 },
        { itemId: 'masque_de_funespadon', dropRate: 0.02 }
    ]
}

areas.donjonSolar = {
    id: 'donjonSolar',
    type: 'dungeon',
    keyId: 'cleDonjonSolar',
    name: "Tour de Solar",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: "images/monsters/Solar.png",
    description: "La Tour de Solar est le pendant enflammé de la Tour de Bethel. Solar, créature de feu pur, y règne sur une chaleur qui fait fondre la pierre et carbonise la chair. Seuls les aventuriers aux résistances exceptionnelles survivent à l'ascension.",
    spawns: [
        { id: 'solar', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.35 },
        { itemId: 'Dofus_Ebene', dropRate: 0.0005 },
        { itemId: 'Dofus_Forgelave', dropRate: 0.0005 },
        { itemId: 'amulette_volcanique', dropRate: 0.02 },
        { itemId: 'bouclier_de_solar', dropRate: 0.02 },
        { itemId: 'sabots_volcaniques', dropRate: 0.02 },
        { itemId: 'sac_volcanique', dropRate: 0.02 }
    ]
}

areas.donjonDazak = {
    id: 'donjonDazak',
    type: 'dungeon',
    keyId: 'cleDonjonDazak',
    name: "Brasserie du roi Dazak",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: "images/monsters/Dazak_Martegel.png",
    description: "La Brasserie du Roi Dazak est un établissement unique dans le monde souterrain : une brasserie intégrée à une forteresse de guerre. Dazak Martegel a fait du brassage de bières explosives son art de combat préféré.",
    spawns: [
        { id: 'dazak_martegel', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.35 },
        { itemId: 'amulette_martegel', dropRate: 0.02 },
        { itemId: 'cape_martegel', dropRate: 0.02 },
        { itemId: 'masquegel', dropRate: 0.02 }
    ]
}

areas.donjonTorkelonia = {
    id: 'donjonTorkelonia',
    type: 'dungeon',
    keyId: 'cleDonjonTorkelonia',
    name: "Sanctuaire de Torkélonia",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: "images/monsters/Torkélonia.png",
    description: "Le Sanctuaire de Torkélonia est consacré à une tortue divine d'une longévité qui dépasse les calendriers. Ses défenseurs ont adopté sa philosophie fondamentale : ils sont lents à s'énerver, mais implacables une fois qu'ils ont décidé de vous écraser.",
    spawns: [
        { id: 'torkelonia', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.35 },
        { itemId: 'baguette_de_torkelonia', dropRate: 0.02 },
        { itemId: 'carapace_de_torkelonia', dropRate: 0.02 },
        { itemId: 'corne_de_torkelonia', dropRate: 0.02 }
    ]
}

areas.donjonArbreMort = {
    id: 'donjonArbreMort',
    type: 'dungeon',
    keyId: 'cleDonjonArbreMort',
    name: "Arbre de Mort",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: "images/monsters/Corruption.png",
    description: "L'Arbre de Mort est le vestige d'un arbre sacré corrompu par une magie si noire qu'elle en est devenue sentiente. La Corruption qui l'habite a transformé les environs en zone de mort progressive, où même les pierres semblent pourrir.",
    spawns: [
        { id: 'corruption', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.35 },
        { itemId: 'alliance_de_corruption', dropRate: 0.02 },
        { itemId: 'bague_de_corruption', dropRate: 0.02 },
        { itemId: 'ceinturonce_de_corruption', dropRate: 0.02 }
    ]
}

areas.donjonTyrannie = {
    id: 'donjonTyrannie',
    type: 'dungeon',
    keyId: 'cleDonjonTyrannie',
    name: "Fers de la Tyrannie",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: "images/monsters/Servitude.png",
    description: "Les Fers de la Tyrannie sont les chaînes qui, selon une légende obscure, ont encerclé le monde. Servitude, leur gardien, est une entité faite de liens et de contraintes, dont la seule existence est une métaphore réifiée de l'asservissement.",
    spawns: [
        { id: 'servitude', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.35 },
        { itemId: 'dora_de_servitude', dropRate: 0.02 },
        { itemId: 'manteau_de_servitude', dropRate: 0.02 },
        { itemId: 'echarpe_de_servitude', dropRate: 0.02 }
    ]
}

areas.donjonBalance = {
    id: 'donjonBalance',
    type: 'dungeon',
    keyId: 'cleDonjonBalance',
    name: "Sentence de la Balance",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: "images/monsters/Misère.png",
    description: "La Sentence de la Balance est un tribunal cosmique où Misère juge et condamne selon des règles que nul n'a jamais pu consulter. Les peines qu'elle inflige n'ont aucun rapport avec les fautes commises, ce qui la rend particulièrement redoutable.",
    spawns: [
        { id: 'misere', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.35 },
        { itemId: 'convoitise_de_misere', dropRate: 0.02 },
        { itemId: 'corset_de_misere', dropRate: 0.02 },
        { itemId: 'solerets_de_misere', dropRate: 0.02 }
    ]
}

areas.donjonTroneSang = {
    id: 'donjonTroneSang',
    type: 'dungeon',
    keyId: 'cleDonjonTroneSang',
    name: "Trône de Sang",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: "images/monsters/Guerre.png",
    description: "Le Trône de Sang est l'endroit où Guerre — incarnation du conflit — a planté son siège depuis la nuit des temps. L'air y est chargé d'une tension permanente, et les créatures qui gardent ce trône n'ont connu que la violence depuis leur naissance.",
    spawns: [
        { id: 'guerre', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.35 },
        { itemId: 'ceste_de_guerre', dropRate: 0.02 },
        { itemId: 'forteresse_de_guerre', dropRate: 0.02 },
        { itemId: 'heaume_de_guerre', dropRate: 0.02 },
        { itemId: 'solerets_de_guerre', dropRate: 0.02 }
    ]
}

areas.donjonTalKasha = {
    id: 'donjonTalKasha',
    type: 'dungeon',
    keyId: 'cleDonjonTalKasha',
    name: "Chambre de Tal Kasha",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: "images/monsters/Tal_Kasha.png",
    description: "Tal Kasha, l'Araignée-Reine de Moon Island, a tissé sa chambre dans les profondeurs de l'île avec une précision d'architecte. Chaque fil de sa toile est une arme, chaque recoin une embuscade. Elle attend depuis des siècles, et la patience lui a toujours bien réussi.",
    spawns: [
        { id: 'tal_kasha', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.35 },
        { itemId: 'chevelure_de_tal_kasha', dropRate: 0.02 },
        { itemId: 'nemes_de_tal_kasha', dropRate: 0.02 },
        { itemId: 'sandales_de_tal_kasha', dropRate: 0.02 }
    ]
}

areas.donjonKabahal = {
    id: 'donjonKabahal',
    type: 'dungeon',
    keyId: 'cleDonjonKabahal',
    name: "Rituel de Kabahal",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: "images/monsters/Kabahal.png",
    description: "Kabahal est une entité de Sufokia qui a fait du chaos aquatique son domaine. Son rituel, auquel on assiste malgré soi en entrant dans son temple, est une cérémonie de transformation au terme de laquelle rien de vivant ne ressort vraiment intact.",
    spawns: [
        { id: 'kabahal', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.35 },
        { itemId: 'amulette_possedee', dropRate: 0.02 },
        { itemId: 'anneau_possede', dropRate: 0.02 },
        { itemId: 'bouclier_possede', dropRate: 0.02 },
        { itemId: 'ceinture_possedee', dropRate: 0.02 },
        { itemId: 'alliance_du_pandamonium', dropRate: 0.02 },
        { itemId: 'amulette_du_pandamonium', dropRate: 0.02 },
        { itemId: 'baguette_du_pandamonium', dropRate: 0.02 }
    ]
}

areas.donjonAurorePourpre = {
    id: 'donjonAurorePourpre',
    type: 'dungeon',
    keyId: 'cleDonjonAurorePourpre',
    name: "Bataille de l'Aurore Pourpre",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: "images/monsters/L_Éternel_Conflit.png",
    description: "L'Aurore Pourpre marque le champ de bataille où L'Éternel Conflit engage ses armées depuis la nuit des temps. Bonta et Brakmar s'y sont affrontées pendant des millénaires, et leurs champions tombés sont devenus les fantômes qui peuplent encore ce site.",
    spawns: [
        { id: 'l_eternel_conflit', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.35 },
        { itemId: 'Dofus_du_Cauchemard', dropRate: 0.0005 },
        { itemId: 'bois_de_la_liche', dropRate: 0.02 },
        { itemId: 'chant_du_necromant', dropRate: 0.02 },
        { itemId: 'ciel_de_foudre_noire', dropRate: 0.02 },
        { itemId: 'derniere_aube', dropRate: 0.02 },
        { itemId: 'mort_du_centoror', dropRate: 0.02 },
        { itemId: 'portes_de_bonta', dropRate: 0.02 }
    ]
}

areas.donjonMalefices = {
    id: 'donjonMalefices',
    type: 'dungeon',
    keyId: 'cleDonjonMalefices',
    name: "Chambre des maléfices",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: "images/monsters/Belladone.png",
    description: "La Chambre des Maléfices est le laboratoire de Belladone, grande prêtresse de la forêt de Hhoohoho. Chaque sort qui y est pratiqué laisse une trace indélébile dans l'air ; l'atmosphère est si chargée de magie hostile qu'elle semble palpable.",
    spawns: [
        { id: 'belladone', weight: 100 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.35 },
        { itemId: 'Dofus_Sylvestre', dropRate: 0.0005 },
        { itemId: 'amertume_de_belladone', dropRate: 0.02 },
        { itemId: 'cruaute_de_belladone', dropRate: 0.02 },
        { itemId: 'mur_de_ronces', dropRate: 0.02 },
        { itemId: 'pilier_d_ephedrya', dropRate: 0.02 },
        { itemId: 'potence_d_ephedrya', dropRate: 0.02 },
        { itemId: 'tendresse_de_belladone', dropRate: 0.02 }
    ]
}

areas.donjonBreuil = {
    id: 'donjonBreuil',
    type: 'dungeon',
    keyId: '',
    name: 'Breuil du Vénérable',
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: 'images/monsters/Vénérable_Endormi.png',
    description: "Le Breuil du Vénérable est un espace sacré de la sylve profonde où sommeille le Vénérable Endormi, un être ancien dont le réveil est à la fois redouté et recherché. Troubler son sommeil a des conséquences — ne pas le troubler aussi.",
    spawns: [{ id: 'venerable_endormi', weight: 100 }],
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
    background: "",
    icon: 'images/monsters/Déchireuse.png',
    description: "L'Autel de la Déchireuse est consacré à une créature dont le nom dit tout ce qu'il y a à savoir sur ses intentions. Son autel, taillé dans une roche noire et brillante, semble absorber la lumière comme la Déchireuse absorbe les âmes de ses offrandes.",
    spawns: [{ id: 'dechireuse', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien',         dropRate: 0.35 },
    ]
}

// }
// #endregion

// #region EVENTS ─────────────────────────────────────────────────────────────
// #region loot table runes 
/*

        // Runes normales
        { itemId: 'runeHpS',              dropRate: 0.01 },
        { itemId: 'runeHpM',              dropRate: 0.01 },
        { itemId: 'runeHpL',              dropRate: 0.01 },
        { itemId: 'runeAtkS',             dropRate: 0.01 },
        { itemId: 'runeAtkM',             dropRate: 0.01 },
        { itemId: 'runeAtkL',             dropRate: 0.01 },
        { itemId: 'runeForceS',           dropRate: 0.01 },
        { itemId: 'runeForceM',           dropRate: 0.01 },
        { itemId: 'runeForceL',           dropRate: 0.01 },
        { itemId: 'runeIntelS',           dropRate: 0.01 },
        { itemId: 'runeIntelM',           dropRate: 0.01 },
        { itemId: 'runeIntelL',           dropRate: 0.01 },
        { itemId: 'runeChanceS',          dropRate: 0.01 },
        { itemId: 'runeChanceM',          dropRate: 0.01 },
        { itemId: 'runeChanceL',          dropRate: 0.01 },
        { itemId: 'runeAgiS',             dropRate: 0.01 },
        { itemId: 'runeAgiM',             dropRate: 0.01 },
        { itemId: 'runeAgiL',             dropRate: 0.01 },
        { itemId: 'runeSpdS',             dropRate: 0.01 },
        { itemId: 'runeSpdM',             dropRate: 0.01 },
        { itemId: 'runeSpdL',             dropRate: 0.01 },
        { itemId: 'runeFlatDmgS',         dropRate: 0.01 },
        { itemId: 'runeFlatDmgM',         dropRate: 0.01 },
        { itemId: 'runeFlatDmgL',         dropRate: 0.01 },
        { itemId: 'runeCritS',            dropRate: 0.01 },
        { itemId: 'runeCritM',            dropRate: 0.01 },
        { itemId: 'runeCritL',            dropRate: 0.01 },
        { itemId: 'runeCritDmgM',         dropRate: 0.01 },
        { itemId: 'runeCritDmgL',         dropRate: 0.01 },
        { itemId: 'runeDropRateM',        dropRate: 0.01 },
        { itemId: 'runeDropRateL',        dropRate: 0.01 },
        { itemId: 'runeFireResS',         dropRate: 0.01 },
        { itemId: 'runeWaterResS',        dropRate: 0.01 },
        { itemId: 'runeEarthResS',        dropRate: 0.01 },
        { itemId: 'runeAirResS',          dropRate: 0.01 },
        { itemId: 'runeNeutralResS',      dropRate: 0.01 },
        { itemId: 'runeFireResM',         dropRate: 0.01 },
        { itemId: 'runeWaterResM',        dropRate: 0.01 },
        { itemId: 'runeEarthResM',        dropRate: 0.01 },
        { itemId: 'runeAirResM',          dropRate: 0.01 },
        { itemId: 'runeNeutralResM',      dropRate: 0.01 },
        { itemId: 'runeFireResL',         dropRate: 0.01 },
        { itemId: 'runeWaterResL',        dropRate: 0.01 },
        { itemId: 'runeEarthResL',        dropRate: 0.01 },
        { itemId: 'runeAirResL',          dropRate: 0.01 },
        { itemId: 'runeNeutralResL',      dropRate: 0.01 },
        { itemId: 'runeSpellDmgM',        dropRate: 0.01 },
        { itemId: 'runeFinalDmgM',        dropRate: 0.01 },
        { itemId: 'runeDamRedM',          dropRate: 0.01 },
        { itemId: 'runeSpellDmgL',        dropRate: 0.01 },
        { itemId: 'runeFinalDmgL',        dropRate: 0.01 },
        { itemId: 'runeDamRedL',          dropRate: 0.01 }

        { itemId: 'trophee_slot1_x1',  dropRate: 0.001 },
        { itemId: 'trophee_slot1_x2',  dropRate: 0.001 },
        { itemId: 'trophee_slot1_x3',  dropRate: 0.001 },
        { itemId: 'trophee_slot1_x4',  dropRate: 0.001 },
        { itemId: 'trophee_slot1_x5',  dropRate: 0.001 },
        { itemId: 'trophee_slot1_x6',  dropRate: 0.001 },
        { itemId: 'trophee_slot1_x7',  dropRate: 0.001 },
        { itemId: 'trophee_slot1_x8',  dropRate: 0.001 },
        { itemId: 'trophee_slot2_x1',  dropRate: 0.001 },
        { itemId: 'trophee_slot2_x2',  dropRate: 0.001 },
        { itemId: 'trophee_slot2_x3',  dropRate: 0.001 },
        { itemId: 'trophee_slot2_x4',  dropRate: 0.001 },
        { itemId: 'trophee_slot2_x5',  dropRate: 0.001 },
        { itemId: 'trophee_slot2_x6',  dropRate: 0.001 },
        { itemId: 'trophee_slot2_x7',  dropRate: 0.001 },
        { itemId: 'trophee_slot2_x8',  dropRate: 0.001 },
        { itemId: 'trophee_slot3_x1',  dropRate: 0.001 },
        { itemId: 'trophee_slot3_x2',  dropRate: 0.001 },
        { itemId: 'trophee_slot3_x3',  dropRate: 0.001 },
        { itemId: 'trophee_slot3_x4',  dropRate: 0.001 },
        { itemId: 'trophee_slot3_x5',  dropRate: 0.001 },
        { itemId: 'trophee_slot3_x6',  dropRate: 0.001 },
        { itemId: 'trophee_slot3_x7',  dropRate: 0.001 },
        { itemId: 'trophee_slot3_x8',  dropRate: 0.001 },
        { itemId: 'trophee_slot4_x1',  dropRate: 0.001 },
        { itemId: 'trophee_slot4_x2',  dropRate: 0.001 },
        { itemId: 'trophee_slot4_x3',  dropRate: 0.001 },
        { itemId: 'trophee_slot4_x4',  dropRate: 0.001 },
        { itemId: 'trophee_slot4_x5',  dropRate: 0.001 },
        { itemId: 'trophee_slot4_x6',  dropRate: 0.001 },
        { itemId: 'trophee_slot4_x7',  dropRate: 0.001 },
        { itemId: 'trophee_slot4_x8',  dropRate: 0.001 },
        { itemId: 'trophee_slot5_x1',  dropRate: 0.001 },
        { itemId: 'trophee_slot5_x2',  dropRate: 0.001 },
        { itemId: 'trophee_slot5_x3',  dropRate: 0.001 },
        { itemId: 'trophee_slot5_x4',  dropRate: 0.001 },
        { itemId: 'trophee_slot5_x5',  dropRate: 0.001 },
        { itemId: 'trophee_slot5_x6',  dropRate: 0.001 },
        { itemId: 'trophee_slot5_x7',  dropRate: 0.001 },
        { itemId: 'trophee_slot5_x8',  dropRate: 0.001 },
        { itemId: 'trophee_slot6_x1',  dropRate: 0.001 },
        { itemId: 'trophee_slot6_x2',  dropRate: 0.001 },
        { itemId: 'trophee_slot6_x3',  dropRate: 0.001 },
        { itemId: 'trophee_slot6_x4',  dropRate: 0.001 },
        { itemId: 'trophee_slot6_x5',  dropRate: 0.001 },
        { itemId: 'trophee_slot6_x6',  dropRate: 0.001 },
        { itemId: 'trophee_slot6_x7',  dropRate: 0.001 },
        { itemId: 'trophee_slot6_x8',  dropRate: 0.001 },


        { itemId: 'trophee_de_la_terre',   dropRate: 0.001 },
        { itemId: 'trophee_du_feu',        dropRate: 0.001 },
        { itemId: 'trophee_de_l_eau',      dropRate: 0.001 },
        { itemId: 'trophee_de_l_air',      dropRate: 0.001 },
*/
// #endregion

areas.evenementIncanam = {
    id: 'evenementIncanam',
    type: 'event',
    name: "Incanam",
    minLevel: 1,
    maxLevel: 20,
    mobMinLevel: 1,
    mobMaxLevel: 10,
    background: "",
    icon: "images/monsters/Tigrimas.png",
    description: "",
    spawns: [
        { id: 'feu_vif', weight: 10 },
        { id: 'feu_de_joie', weight: 10 },
        { id: 'feu_furieux', weight: 10 },
        { id: 'feu_follet', weight: 10 },
        { id: 'tofu_chimerique', weight: 10 },
        { id: 'rose_vaporeuse', weight: 10 },
        { id: 'pissenlit_miroitant', weight: 10 },
        { id: 'tournesol_nebuleux', weight: 10 },
        { id: 'petit_gloot', weight: 10 },
        { id: 'plikplok', weight: 10 },
        { id: 'grand_splatch', weight: 10 },
        { id: 'tigrimas', weight: 10 },
        { id: 'chakrobat', weight: 10 },
        { id: 'ronronchon', weight: 10 },
        { id: 'aminite', weight: 10 },
        { id: 'boufton_palichon', weight: 10 },
        { id: 'boufton_orageux', weight: 10 },
        { id: 'bouftou_nuageux', weight: 10 },
        { id: 'bouftor_ethere', weight: 10 }
    ],
    lootTable: [
        { itemId: 'pierreDame',        dropRate: 0.45 },
        { itemId: 'animulette', dropRate: 0.01 },
        { itemId: 'cape_syche', dropRate: 0.01 },
        { itemId: 'coiffe_antome', dropRate: 0.01 },
        { itemId: 'bounihimee', dropRate: 0.01 },
        { itemId: 'la_cape_s_loque', dropRate: 0.01 },
        { itemId: 'la_halte_efkat', dropRate: 0.01 },
        { itemId: 'la_spamette', dropRate: 0.01 },
        { itemId: 'le_floude', dropRate: 0.01 },
        { itemId: 'le_plussain', dropRate: 0.01 },
        { itemId: 'le_s_mesme', dropRate: 0.01 },
        { itemId: 'les_incrustes', dropRate: 0.01 }
    ]
}

areas.evenementPious = {
    id: 'evenementPious',
    type: 'event',
    name: "Invasion Pious",
    minLevel: 10, maxLevel: 15,
    mobMinLevel: 10, mobMaxLevel: 15,
    background: "",
    icon: "images/monsters/Piou_Bleu.png",
    description: "Les habitants d'Astrub sont submergés par ces oiseaux multicolores ! Venez leur prêter main-forte en vous en débarrassant.",
    spawns: [
        { id: 'piouRouge', weight: 17 },
        { id: 'piouBleu', weight: 17 },
        { id: 'piouJaune', weight: 17 },
        { id: 'piouVert', weight: 17 },
        { id: 'piouRose', weight: 17 },
        { id: 'piouViolet', weight: 15 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'piloteAutomatique', dropRate: 0.05 },
        { itemId: 'cape_du_piou_bleu', dropRate: 0.005 },
        { itemId: 'sandales_du_piou_bleu', dropRate: 0.005 },
        { itemId: 'anneau_du_piou_bleu', dropRate: 0.005 },
        { itemId: 'amulette_du_piou_bleu', dropRate: 0.005 },
        { itemId: 'chapeau_du_piou_bleu', dropRate: 0.005 },
        { itemId: 'ceinture_du_piou_bleu', dropRate: 0.005 },
        { itemId: 'amulette_du_piou_jaune', dropRate: 0.005 },
        { itemId: 'chapeau_du_piou_jaune', dropRate: 0.005 },
        { itemId: 'ceinture_du_piou_jaune', dropRate: 0.005 },
        { itemId: 'cape_du_piou_jaune', dropRate: 0.005 },
        { itemId: 'sandales_du_piou_jaune', dropRate: 0.005 },
        { itemId: 'anneau_du_piou_jaune', dropRate: 0.005 },
        { itemId: 'anneau_du_piou_rose', dropRate: 0.005 },
        { itemId: 'amulette_du_piou_rose', dropRate: 0.005 },
        { itemId: 'chapeau_du_piou_rose', dropRate: 0.005 },
        { itemId: 'ceinture_du_piou_rose', dropRate: 0.005 },
        { itemId: 'cape_du_piou_rose', dropRate: 0.005 },
        { itemId: 'sandales_du_piou_rose', dropRate: 0.005 },
        { itemId: 'ceinture_du_piou_rouge', dropRate: 0.005 },
        { itemId: 'cape_du_piou_rouge', dropRate: 0.005 },
        { itemId: 'sandales_du_piou_rouge', dropRate: 0.005 },
        { itemId: 'anneau_du_piou_rouge', dropRate: 0.005 },
        { itemId: 'amulette_du_piou_rouge', dropRate: 0.005 },
        { itemId: 'chapeau_du_piou_rouge', dropRate: 0.005 },
        { itemId: 'chapeau_du_piou_vert', dropRate: 0.005 },
        { itemId: 'ceinture_du_piou_vert', dropRate: 0.005 },
        { itemId: 'cape_du_piou_vert', dropRate: 0.005 },
        { itemId: 'sandales_du_piou_vert', dropRate: 0.005 },
        { itemId: 'anneau_du_piou_vert', dropRate: 0.005 },
        { itemId: 'amulette_du_piou_vert', dropRate: 0.005 },
        { itemId: 'sandales_du_piou_violet', dropRate: 0.005 },
        { itemId: 'anneau_du_piou_violet', dropRate: 0.005 },
        { itemId: 'amulette_du_piou_violet', dropRate: 0.005 },
        { itemId: 'chapeau_du_piou_violet', dropRate: 0.005 },
        { itemId: 'ceinture_du_piou_violet', dropRate: 0.005 },
        { itemId: 'cape_du_piou_violet', dropRate: 0.005 }
    ]
}

areas.evenementForetAstrub = {
    id: 'evenementForetAstrub',
    type: 'event',
    name: 'Attention au loup !',
    minLevel: 20, maxLevel: 35,
    mobMinLevel: 20, mobMaxLevel: 30,
    background: "",
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
        { itemId: 'piloteAutomatique', dropRate: 0.05 },
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

areas.evenementGrouillantsDAstrub = {
    id: 'evenementGrouillantsDAstrub',
    type: 'event',
    name: "Grouillants d'astrub",
    minLevel: 20,
    maxLevel: 40,
    mobMinLevel: 20,
    mobMaxLevel: 30,
    background: "",
    icon: "images/monsters/Tofu_Malade.png",
    description: "",
    spawns: [
        { id: 'tofu_malade', weight: 10 },
        { id: 'arakne_malade', weight: 10 },
        { id: 'arakne_minuscule', weight: 10 },
        { id: 'araknose', weight: 10 },
        { id: 'arakmute', weight: 10 },
        { id: 'araknelle', weight: 10 },
        { id: 'champ_champ', weight: 10 },
        { id: 'moskito', weight: 10 },
        { id: 'campagnoll', weight: 10 }
    ],
    lootTable: [
        { itemId: 'pierreDame',        dropRate: 0.45 },
        { itemId: 'piloteAutomatique', dropRate: 0.05 },
        { itemId: 'alliance_du_champ_champ', dropRate: 0.01 },
        { itemId: 'cape_du_champ_champ', dropRate: 0.01 },
        { itemId: 'champcoiffe', dropRate: 0.01 },
        { itemId: 'anneau_du_champ_champ', dropRate: 0.01 },
        { itemId: 'amulette_du_moskito', dropRate: 0.01 },
        { itemId: 'moskitogalurette', dropRate: 0.01 },
        { itemId: 'sac_du_petit_moskito', dropRate: 0.01 },
        { itemId: 'mos_kitano', dropRate: 0.01 },
        { itemId: 'l_araknacoiffe', dropRate: 0.01 },
        { itemId: 'araknoton', dropRate: 0.01 },
        { itemId: 'araknoture', dropRate: 0.01 },
        { itemId: 'la_trancheuse_d_arakne', dropRate: 0.01 },
    ]
}

areas.evenementMinerEtFabriquer = {
    id: 'evenementMinerEtFabriquer',
    type: 'event',
    name: "miner et fabriquer",
    minLevel: 20,
    maxLevel: 40,
    mobMinLevel: 20,
    mobMaxLevel: 30,
    background: "",
    icon: "images/monsters/Pikdoa.png",
    description: "",
    spawns: [
        { id: 'pikdoa', weight: 10 },
        { id: 'douzdoa', weight: 10 },
        { id: 'sherpoa', weight: 10 },
        { id: 'martoa', weight: 10 }
    ],
    lootTable: [
        { itemId: 'pierreDame',        dropRate: 0.45 },
        { itemId: 'piloteAutomatique', dropRate: 0.05 },
        { itemId: 'runeForceS',   dropRate: 0.01 },
        { itemId: 'runeIntelS',   dropRate: 0.01 },
        { itemId: 'runeChanceS',   dropRate: 0.01 },
        { itemId: 'runeAgiS',   dropRate: 0.01 }
    ]
}

areas.evenementBiblop = {
    id: 'evenementBiblop',
    type: 'event',
    name: 'Invasion de Blops',
    minLevel: 25, maxLevel: 30,
    mobMinLevel: 25, mobMaxLevel: 30,
    background: "",
    icon: 'images/monsters/Biblop_Griotte.png',
    description: "Des habitants ont rapportés qu'aux alentours du lac de Cania, des blops se multiplient vitesse grand V... Essayez de stoper cette invasion tant qu'ils ne sont pas pleinement développés.",
    spawns: [
        { id: 'biblop_coco',     weight: 25 },
        { id: 'biblop_reinette', weight: 25 },
        { id: 'biblop_griotte',  weight: 25 },
        { id: 'biblop_indigo',   weight: 25 },
    ],
    lootTable: [
        { itemId: 'pierreDame',   dropRate: 0.45 },
        { itemId: 'piloteAutomatique', dropRate: 0.05 },
        { itemId: 'runeForceS',   dropRate: 0.01 },
        { itemId: 'runeIntelS',   dropRate: 0.01 },
        { itemId: 'runeChanceS',   dropRate: 0.01 },
        { itemId: 'runeAgiS',   dropRate: 0.01 }
    ]
}

areas.egoutsAstrub = {
    id: 'egoutsAstrub',
    type: 'event',
    name: "Égouts d'Astrub",
    minLevel: 30, maxLevel: 50,
    mobMinLevel: 30, mobMaxLevel: 40,
    background: "",
    icon: "images/monsters/Milirat_Strubien.png",
    description: "Les Égouts d'Astrub sont le reflet souterrain de la ville au-dessus : aussi animés, aussi dangereux, et beaucoup moins bien éclairés. Une odeur caractéristique y règne, ainsi qu'une faune opportuniste qui a fait des déchets de la surface son garde-manger.",
    spawns: [
        { id: 'kolerat_strubien', weight: 10 },
        { id: 'ramane_strubien', weight: 10 },
        { id: 'scelerat_strubien', weight: 10 },
        { id: 'milirat_strubien', weight: 10 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'piloteAutomatique', dropRate: 0.05 },
        { itemId: 'amulette_de_rapine', dropRate: 0.01 },
        { itemId: 'ceinture_de_rapine', dropRate: 0.01 },
        { itemId: 'bottes_de_rapine', dropRate: 0.01 }
    ]
}

areas.evenementBoooouh = {
    id: 'evenementBoooouh',
    name: "boooouh",
    type: 'event',
    minLevel: 40,
    maxLevel: 60,
    mobMinLevel: 40,
    mobMaxLevel: 50,
    background: "",
    icon: "images/monsters/Fantôme_Égérie.png",
    description: "",
    spawns: [
        { id: 'fantome_egerie', weight: 10 },
        { id: 'fantome_hicide', weight: 10 },
        { id: 'fantome_apero', weight: 10 },
        { id: 'fantome_aux_plates', weight: 10 },
        { id: 'fantome_d_aventurier_ardent', weight: 10 },
        { id: 'fantome_d_aventurier_arepo', weight: 10 },
        { id: 'fantome_d_aventurier_brave', weight: 10 }
    ],
    lootTable: [
        { itemId: 'pierreDame',        dropRate: 0.45 },
        { itemId: 'piloteAutomatique', dropRate: 0.05 },
        { itemId: 'bottauffe_souris', dropRate: 0.01 },
        { itemId: 'anauffe_souris', dropRate: 0.01 },
        { itemId: 'runeForceS',   dropRate: 0.01 },
        { itemId: 'runeIntelS',   dropRate: 0.01 },
        { itemId: 'runeChanceS',   dropRate: 0.01 },
        { itemId: 'runeAgiS',   dropRate: 0.01 }
    ]
}

areas.evenementALaPecheAuMoulemoulemoule = {
    id: 'evenementALaPecheAuMoulemoulemoule',
    name: "A la pêche au moulemoulemoule",
    type: 'event',
    minLevel: 40,
    maxLevel: 60,
    mobMinLevel: 40,
    mobMaxLevel: 50,
    background: "",
    icon: "images/monsters/Raul_Mops.png",
    description: "",
    spawns: [
        { id: 'raul_mops', weight: 10 },
        { id: 'etoile_de_la_mer_d_asse', weight: 10 },
        { id: 'moumoule', weight: 10 },
        { id: 'crabe', weight: 10 }
    ],
    lootTable: [
        { itemId: 'pierreDame',        dropRate: 0.45 },
        { itemId: 'piloteAutomatique', dropRate: 0.05 },
        { itemId: 'cape_de_bowisse', dropRate: 0.01 },
        { itemId: 'bouclier_de_bowisse', dropRate: 0.01 },
        { itemId: 'bottes_de_bowisse', dropRate: 0.01 }
    ]
}

areas.evenementElevageDeDragodindes = {
    id: 'evenementElevageDeDragodindes',
    name: 'Élevage de Dragodindes',
    type: 'event',
    minLevel: 40,
    maxLevel: 60,
    mobMinLevel: 40,
    mobMaxLevel: 50,
    background: '',
    icon: 'images/monsters/Dragodinde_amande_sauvage.png',
    description: '',
    spawns: [{ id: 'dragodinde_amande_sauvage', weight: 10 }, { id: 'dragodinde_rousse_sauvage', weight: 10 }, { id: 'dragodinde_doree_sauvage', weight: 10 }],
    lootTable: [
        { itemId: 'pierreDame',        dropRate: 0.45 },
        { itemId: 'piloteAutomatique', dropRate: 0.05 }, { itemId: 'bottoduvet', dropRate: 0.01 }, { itemId: 'ceinturoduvet', dropRate: 0.01 }, { itemId: 'anodindo', dropRate: 0.01 }, { itemId: 'botodindo', dropRate: 0.01 }, { itemId: 'capodindo', dropRate: 0.01 }, { itemId: 'chapodindo', dropRate: 0.01 }, { itemId: 'bottes_dragocourse', dropRate: 0.01 }, { itemId: 'ceinture_dragocourse', dropRate: 0.01 }]
}

areas.evenementRepechageDeMuldos = {
    id: 'evenementRepechageDeMuldos',
    name: 'Repêchage de Muldos',
    type: 'event',
    minLevel: 50,
    maxLevel: 70,
    mobMinLevel: 50,
    mobMaxLevel: 60,
    background: '',
    icon: 'images/monsters/Muldo_indigo_sauvage.png',
    description: '',
    spawns: [{ id: 'muldo_indigo_sauvage', weight: 10 }, { id: 'muldo_ebene_sauvage', weight: 10 }, { id: 'muldo_orchidee_sauvage', weight: 10 }, { id: 'muldo_dore_sauvage', weight: 10 }, { id: 'muldo_pourpre_sauvage', weight: 10 }],
    lootTable: [
        { itemId: 'pierreDame',        dropRate: 0.45 },
        { itemId: 'piloteAutomatique', dropRate: 0.05 }, { itemId: 'botomuldo', dropRate: 0.01 }, { itemId: 'capomuldo', dropRate: 0.01 }, { itemId: 'chapomuldo', dropRate: 0.01 }]
}

areas.evenementDopeuls = {
    id: 'evenementDopeuls',
    type: 'event',
    name: "Invasion Dopeuls",
    minLevel: 55, maxLevel: 80,
    mobMinLevel: 55, mobMaxLevel: 70,
    background: "",
    icon: "images/monsters/Dopeul_Iop.png",
    description: "Le Village des Dopeuls ! Des reflets des douze classes et... quelques autres... envahissent le Monde des Douze. Affronte ces copies miroir avant qu'elles ne sèment le chaos.",
    spawns: [
        { id: 'dopeul_cra', weight: 6 },
        { id: 'dopeul_ecaflip', weight: 5 },
        { id: 'dopeul_eliotrope', weight: 5 },
        { id: 'dopeul_eniripsa', weight: 6 },
        { id: 'dopeul_enutrof', weight: 5 },
        { id: 'dopeul_feca', weight: 6 },
        { id: 'dopeul_forgelance', weight: 5 },
        { id: 'dopeul_huppermage', weight: 5 },
        { id: 'dopeul_iop', weight: 6 },
        { id: 'dopeul_osamodas', weight: 5 },
        { id: 'dopeul_ouginak', weight: 5 },
        { id: 'dopeul_pandawa', weight: 5 },
        { id: 'dopeul_roublard', weight: 5 },
        { id: 'dopeul_sacrieur', weight: 5 },
        { id: 'dopeul_sadida', weight: 5 },
        { id: 'dopeul_sram', weight: 5 },
        { id: 'dopeul_steamer', weight: 5 },
        { id: 'dopeul_xelor', weight: 5 },
        { id: 'dopeul_zobal', weight: 5 },
        { id: 'dopeul_darkvlad', weight: 1 }
    ],
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'piloteAutomatique', dropRate: 0.05 },
        { itemId: 'runeHpS', dropRate: 0.01 },
        { itemId: 'runeForceS',   dropRate: 0.01 },
        { itemId: 'runeIntelS',   dropRate: 0.01 },
        { itemId: 'runeChanceS',   dropRate: 0.01 },
        { itemId: 'runeAgiS',   dropRate: 0.01 },
        { itemId: 'runeAtkS', dropRate: 0.01 },
        { itemId: 'runeSpdS', dropRate: 0.01 },
        { itemId: 'runeFlatDmgS', dropRate: 0.01 },
        { itemId: 'runeCritS', dropRate: 0.01 },
        { itemId: 'ceinture_fulgurante', dropRate: 0.02 },
        { itemId: 'cape_fulgurante', dropRate: 0.02 },
        { itemId: 'puissante_ceinture_fulgurante', dropRate: 0.005 },
        { itemId: 'puissante_cape_fulgurante', dropRate: 0.005 }
    ]
}

areas.evenementRobots = {
    id: 'evenementRobots',
    type: 'event',
    name: 'Régulation technologique',
    minLevel: 55, maxLevel: 65,
    mobMinLevel: 55, mobMaxLevel: 65,
    background: "",
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
        { itemId: 'piloteAutomatique', dropRate: 0.05 },
        { itemId: 'runeHpS',           dropRate: 0.01 },
        { itemId: 'runeAtkS',          dropRate: 0.01 },
        { itemId: 'runeSpdS',          dropRate: 0.01 },
        { itemId: 'runeFlatDmgS',      dropRate: 0.01 },
        { itemId: 'runeCritS',         dropRate: 0.01 },
        { itemId: 'runeForceS',   dropRate: 0.01 },
        { itemId: 'runeIntelS',   dropRate: 0.01 },
        { itemId: 'runeChanceS',   dropRate: 0.01 },
        { itemId: 'runeAgiS',   dropRate: 0.01 }
    ]
}

areas.evenementDroleDIle = {
    id: 'evenementDroleDIle',
    name: 'Drôle d\'île',
    type: 'event',
    minLevel: 60,
    maxLevel: 80,
    mobMinLevel: 60,
    mobMaxLevel: 70,
    background: '',
    icon: 'images/monsters/Tortue_Rouge.png',
    description: '',
    spawns: [{ id: 'tortue_rouge', weight: 10 }, { id: 'tortue_bleue', weight: 10 }, { id: 'tortue_verte', weight: 10 }, { id: 'tortue_jaune', weight: 10 }, { id: 'tikoko', weight: 10 }, { id: 'kokoko', weight: 10 }, { id: 'nodkoko', weight: 10 }, { id: 'grokoko', weight: 10 }],
    lootTable: [
        { itemId: 'pierreDame',        dropRate: 0.45 },
        { itemId: 'piloteAutomatique', dropRate: 0.05 }, { itemId: 'carabottes', dropRate: 0.01 }, { itemId: 'caracape', dropRate: 0.01 }, { itemId: 'caracoiffe', dropRate: 0.01 }]
}

areas.evenementTnLacoste = {
    id: 'evenementTnLacoste',
    name: 'TN Lacoste',
    type: 'event',
    minLevel: 60,
    maxLevel: 80,
    mobMinLevel: 60,
    mobMaxLevel: 70,
    background: '',
    icon: 'images/monsters/Crocodaille.png',
    description: '',
    spawns: [{ id: 'crocodaille', weight: 10 }, { id: 'boo', weight: 10 }, { id: 'chef_crocodaille', weight: 10 }, { id: 'arakne_olithique', weight: 10 }],
    lootTable: [
        { itemId: 'pierreDame',        dropRate: 0.45 },
        { itemId: 'piloteAutomatique', dropRate: 0.05 },{ itemId: 'ceinture_du_chef_crocodaille', dropRate: 0.01 }, { itemId: 'pantoufles_crochues_du_chef_crocodaille', dropRate: 0.01 }, { itemId: 'amulette_du_chef_crocodaille', dropRate: 0.01 }, { itemId: 'bouclier_du_chef_crocodaille', dropRate: 0.01 }, { itemId: 'bracelet_du_chef_crocodaille', dropRate: 0.01 }, { itemId: 'coiffe_du_chef_crocodaille', dropRate: 0.01 }, { itemId: 'lame_du_chef_crocodaille', dropRate: 0.01 }, { itemId: 'petit_sac_d_ecolier_du_chef_crocodaille', dropRate: 0.01 }]
}

areas.evenementVoisinsPuants = {
    id: 'evenementVoisinsPuants',
    name: "Voisins puants",
    type: 'event',
    minLevel: 70,
    maxLevel: 90,
    mobMinLevel: 70,
    mobMaxLevel: 80,
    background: "",
    icon: "images/monsters/Bizarbwork.png",
    description: "",
    spawns: [
        { id: 'bizarbwork', weight: 10 },
        { id: 'krambwork', weight: 10 },
        { id: 'medibwork', weight: 10 },
        { id: 'megabwork', weight: 10 }
    ],
    lootTable: [
        { itemId: 'pierreDame',        dropRate: 0.45 },
        { itemId: 'piloteAutomatique', dropRate: 0.05 },
        { itemId: 'amulette_du_chef_bwork', dropRate: 0.01 },
        { itemId: 'bottes_du_chef_bwork', dropRate: 0.01 },
        { itemId: 'bracelet_du_chef_bwork', dropRate: 0.01 },
        { itemId: 'cape_du_chef_bwork', dropRate: 0.01 },
        { itemId: 'casque_du_chef_bwork', dropRate: 0.01 },
        { itemId: 'lame_du_chef_bwork', dropRate: 0.01 },
        { itemId: 'slip_du_chef_bwork', dropRate: 0.01 },
        { itemId: 'runeDropRateM',        dropRate: 0.01 },
    ]
}

areas.evenementTerriersRadioactifs = {
    id: 'evenementTerriersRadioactifs',
    name: "Terriers radioactifs",
    type: 'event',
    minLevel: 110,
    maxLevel: 130,
    mobMinLevel: 110,
    mobMaxLevel: 120,
    background: "",
    icon: "images/monsters/Wabbit_Garou.png",
    description: "",
    spawns: [
        { id: 'wabbit_garou', weight: 10 },
        { id: 'wabbit_cephale', weight: 10 },
        { id: 'wabbit_fluo', weight: 10 },
        { id: 'wabbit_vampire', weight: 10 },
        { id: 'cawotman', weight: 10 }
    ],
    lootTable: [
        { itemId: 'pierreDame',        dropRate: 0.45 },
        { itemId: 'piloteAutomatique', dropRate: 0.05 },
        { itemId: 'cape_du_wabbit_garou', dropRate: 0.01 },
        { itemId: 'bottes_du_wabbit_garou', dropRate: 0.01 },
        { itemId: 'ceinture_du_wabbit_garou', dropRate: 0.01 },
        { itemId: 'amulette_du_wabbit_cephale', dropRate: 0.01 },
        { itemId: 'bottes_du_wabbit_cephale', dropRate: 0.01 },
        { itemId: 'anneau_du_wabbit_cephale', dropRate: 0.01 },
        
        { itemId: 'runeFireResM',         dropRate: 0.01 },
        { itemId: 'runeWaterResM',        dropRate: 0.01 },
        { itemId: 'runeEarthResM',        dropRate: 0.01 },
        { itemId: 'runeAirResM',          dropRate: 0.01 },
        { itemId: 'runeNeutralResM',      dropRate: 0.01 },
    ]
}

areas.evenementPercheDansLArbre = {
    id: 'evenementPercheDansLArbre',
    name: 'Perché dans l\'arbre',
    type: 'event',
    minLevel: 130,
    maxLevel: 150,
    mobMinLevel: 130,
    mobMaxLevel: 140,
    background: '',
    icon: 'images/monsters/Disciple_Zoth.png',
    description: '',
    spawns: [{ id: 'disciple_zoth', weight: 10 }, { id: 'gamine_zoth', weight: 10 }, { id: 'guerrier_zoth', weight: 10 }, { id: 'sergent_zoth', weight: 10 }, { id: 'maitre_zoth', weight: 10 }],
    lootTable: [
        { itemId: 'pierreDame',        dropRate: 0.45 },
        { itemId: 'piloteAutomatique', dropRate: 0.05 }, { itemId: 'coiffe_du_maitre_zoth', dropRate: 0.01 }, { itemId: 'baton_du_maitre_zoth', dropRate: 0.01 }, { itemId: 'casque_du_guerrier_zoth', dropRate: 0.01 }, { itemId: 'hache_du_guerrier_zoth', dropRate: 0.01 }, { itemId: 'chapeau_de_la_gamine_zoth', dropRate: 0.01 }, { itemId: 'marteau_de_la_gamine_zoth', dropRate: 0.01 },
    
        { itemId: 'runeHpM', dropRate: 0.01 },
        { itemId: 'runeForceM',   dropRate: 0.01 },
        { itemId: 'runeIntelM',   dropRate: 0.01 },
        { itemId: 'runeChanceM',   dropRate: 0.01 },
        { itemId: 'runeAgiM',   dropRate: 0.01 },
        { itemId: 'runeAtkM', dropRate: 0.01 },
        { itemId: 'runeSpdM', dropRate: 0.01 },
        { itemId: 'runeFlatDmgM', dropRate: 0.01 },
        { itemId: 'runeCritM', dropRate: 0.01 },
        { itemId: 'runeCritDmgM', dropRate: 0.01 }]
}

areas.evenementRetrouvezLePinPerdu = {
    id: 'evenementRetrouvezLePinPerdu',
    name: "Retrouvez le pin perdu",
    type: 'event',
    minLevel: 130,
    maxLevel: 150,
    mobMinLevel: 130,
    mobMaxLevel: 140,
    background: "",
    icon: "images/monsters/Smilomouth.png",
    description: "",
    spawns: [
        { id: 'smilomouth', weight: 10 },
        { id: 'ecumouth', weight: 10 },
        { id: 'kaniglou', weight: 10 },
        { id: 'sanglacier', weight: 10 },
        { id: 'fricochere', weight: 10 }
    ],
    lootTable: [
        { itemId: 'pierreDame',        dropRate: 0.45 },
        { itemId: 'piloteAutomatique', dropRate: 0.05 },
        { itemId: 'casque_de_l_ecumouth', dropRate: 0.01 },
        { itemId: 'coiffe_du_fricochere', dropRate: 0.01 },
        { itemId: 'pagniglou', dropRate: 0.01 },
        { itemId: 'bottes_de_mandrin', dropRate: 0.01 },
        { itemId: 'mandrano', dropRate: 0.01 },
        { itemId: 'bottes_de_styx', dropRate: 0.01 },
        { itemId: 'styxano', dropRate: 0.01 },
        { itemId: 'bottes_d_inferno', dropRate: 0.01 },
        { itemId: 'infernano', dropRate: 0.01 },
        { itemId: 'bottes_de_will_killson', dropRate: 0.01 },
        { itemId: 'willkillsano', dropRate: 0.01 },
        { itemId: 'runeHpM', dropRate: 0.01 },
        { itemId: 'runeForceM',   dropRate: 0.01 },
        { itemId: 'runeIntelM',   dropRate: 0.01 },
        { itemId: 'runeChanceM',   dropRate: 0.01 },
        { itemId: 'runeAgiM',   dropRate: 0.01 },
        { itemId: 'runeAtkM', dropRate: 0.01 },
        { itemId: 'runeSpdM', dropRate: 0.01 },
        { itemId: 'runeFlatDmgM', dropRate: 0.01 },
        { itemId: 'runeCritM', dropRate: 0.01 },
        { itemId: 'runeCritDmgM', dropRate: 0.01 }
    ]
}

areas.evenementBugElementaire = {
    id: 'evenementBugElementaire',
    name: 'Bug élémentaire',
    type: 'event',
    minLevel: 170,
    maxLevel: 190,
    mobMinLevel: 170,
    mobMaxLevel: 180,
    background: '',
    icon: 'images/monsters/Briko_Altruiste.png',
    description: '',
    spawns: [{ id: 'briko_altruiste', weight: 10 }, { id: 'briko_galvanisant', weight: 10 }, { id: 'briko_exaltant', weight: 10 }, { id: 'briko_stimulant', weight: 10 }, { id: 'briko_taquin', weight: 10 }],
    lootTable: [
        { itemId: 'pierreDame',        dropRate: 0.45 },
        { itemId: 'piloteAutomatique', dropRate: 0.05 }, { itemId: 'trophee_de_la_terre', dropRate: 0.001 },{ itemId: 'trophee_du_feu', dropRate: 0.001 },{ itemId: 'trophee_de_l_eau', dropRate: 0.001 },{ itemId: 'trophee_de_l_air', dropRate: 0.001 },{ itemId: 'trophee_du_neutre', dropRate: 0.001 },
        { itemId: 'runeHpL', dropRate: 0.01 },
        { itemId: 'runeForceL',   dropRate: 0.01 },
        { itemId: 'runeIntelL',   dropRate: 0.01 },
        { itemId: 'runeChanceL',   dropRate: 0.01 },
        { itemId: 'runeAgiL',   dropRate: 0.01 },
        { itemId: 'runeAtkL', dropRate: 0.01 },
        { itemId: 'runeSpdL', dropRate: 0.01 },
        { itemId: 'runeFlatDmgL', dropRate: 0.01 },
        { itemId: 'runeCritL', dropRate: 0.01 },
        { itemId: 'runeCritDmgL', dropRate: 0.01 }]
}

areas.evenementChasseAuxVolkornes = {
    id: 'evenementChasseAuxVolkornes',
    name: 'Chasse aux volkornes',
    type: 'event',
    minLevel: 180,
    maxLevel: 200,
    mobMinLevel: 180,
    mobMaxLevel: 190,
    background: '',
    icon: '',
    description: '',
    spawns: [{ id: 'volkorne_orchidee_sauvage', weight: 10 }, { id: 'volkorne_indigo_sauvage', weight: 10 }, { id: 'volkorne_ebene_sauvage', weight: 10 }, { id: 'volkorne_pourpre_sauvage', weight: 10 }],
    lootTable: [
        { itemId: 'pierreDame',        dropRate: 0.45 },
        { itemId: 'piloteAutomatique', dropRate: 0.05 }, { itemId: 'amulette_volkorne', dropRate: 0.01 }, { itemId: 'anneau_volkorne', dropRate: 0.01 }, { itemId: 'arc_volkorne', dropRate: 0.01 }, { itemId: 'casque_volkorne', dropRate: 0.01 }, { itemId: 'ceinture_volkorne', dropRate: 0.01 },
    
        { itemId: 'runeFireResL',         dropRate: 0.01 },
        { itemId: 'runeWaterResL',        dropRate: 0.01 },
        { itemId: 'runeEarthResL',        dropRate: 0.01 },
        { itemId: 'runeAirResL',          dropRate: 0.01 },
        { itemId: 'runeNeutralResL',      dropRate: 0.01 },
        { itemId: 'runeDropRateL',        dropRate: 0.01 },]
}

// #region RAIDS ────────────────────────────────────────────────────────────────────────────

areas.raidDofusArgenté = {
    id: 'raidDofusArgenté',
    name: "Les débuts sont rudes",
    type: 'raid',
    minLevel: 15, maxLevel: 35,
    mobMinLevel: 35, mobMaxLevel: 35,
    background: "",
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
    lootTable: [
        { itemId: 'amulette_royale_du_bouftou', dropRate: 0.005 },
        { itemId: 'cape_bouffante_royale', dropRate: 0.005 },
        { itemId: 'boufbottes_royales', dropRate: 0.005 },
        { itemId: 'ceinture_royale_du_bouftou', dropRate: 0.005 },
        { itemId: 'cuirasse_royale_du_bouftou', dropRate: 0.005 },
        { itemId: 'epee_royale_du_bouftou', dropRate: 0.005 },
        { itemId: 'anneau_royal_du_bouftou', dropRate: 0.005 },
        { itemId: 'boufcoiffe_royale', dropRate: 0.005 },
        { itemId: 'amulette_en_mousse', dropRate: 0.005 },
        { itemId: 'anneau_en_mousse', dropRate: 0.005 },
        { itemId: 'bottes_en_mousse', dropRate: 0.005 },
        { itemId: 'cape_en_mousse', dropRate: 0.005 },
        { itemId: 'ceinture_en_mousse', dropRate: 0.005 },
        { itemId: 'coiffe_en_mousse', dropRate: 0.005 },
        { itemId: 'pelle_en_mousse', dropRate: 0.005 },
        { itemId: 'bouclier_en_mousse', dropRate: 0.005 },
        { itemId: 'bracelet_de_kardorim', dropRate: 0.005 },
        { itemId: 'cape_de_kardorim', dropRate: 0.005 },
        { itemId: 'casque_de_kardorim', dropRate: 0.005 }
    ]
}

areas.raidGelees = {
    id: 'raidGelees',
    name: "Attention aux caries !",
    type: 'raid',
    minLevel: 55, maxLevel: 65,
    mobMinLevel: 55, mobMaxLevel: 65,
    background: "",
    icon: "images/monsters/Gelée_Fraise.png",
    description: "Nombreux sont ceux qui viennent chercher fortune parmi ces créatures gélatineuses, attirés par les trésors et les mystères de la Gelaxième Dimension. Mais dans ce royaume sucré, il ne faut jamais se fier aux apparences : ce qui ressemble à une simple gourmandise pourrait bien être votre dernier repas.",
    spawns: [
        { id: 'gelee_fraise', weight: 20 },
        { id: 'gelee_menthe', weight: 20 },
        { id: 'gelee_bleuet', weight: 20 },
        { id: 'gelee_citron', weight: 20 }
    ],
    miniBoss: { ids: ['gelee_fraise_royale', 'gelee_menthe_royale', 'gelee_bleuet_royale', 'gelee_citron_royale'], everyKills: 4, statMult: 1 },
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.35 },
        { itemId: 'gelocape', dropRate: 0.03 },
        { itemId: 'gelocoiffe', dropRate: 0.03 },
        { itemId: 'gelobottes', dropRate: 0.03 },
        { itemId: 'gelamu', dropRate: 0.03 },
        { itemId: 'geloture', dropRate: 0.03 }
    ],
    miniBossLootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'gelano', dropRate: 0.05 }
    ]
}

areas.raidMallefisk = {
    id: 'raidMallefisk',
    name: "Fabrique de Malléfisk",
    type: 'raid',
    minLevel: 100, maxLevel: 120,
    mobMinLevel: 100, mobMaxLevel: 110,
    background: "",
    icon: "images/monsters/Malléfisk.png",
    description: "La Fabrique de Malléfisk est une usine de création de monstres à la chaîne, dirigée par une créature qui a transformé la biologie en industrie. Entre les cuves de mutation et les chaînes d'assemblage, les aventuriers qui y pénètrent deviennent eux-mêmes des matières premières.",
    spawns: [
        { id: 'boursoin', weight: 10 },
        { id: 'mimikado', weight: 10 },
        { id: 'tresantene', weight: 10 },
        { id: 'berserkoffre', weight: 10 },
        { id: 'precieux', weight: 5 }
    ],
    miniBoss: { id: 'mallefisk', everyKills: 9, statMult: 1 },
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.45 },
        { itemId: 'ceinture_du_berserkoffre', dropRate: 0.01 },
        { itemId: 'bottes_du_berserkoffre', dropRate: 0.01 },
        { itemId: 'casque_du_berserkoffre', dropRate: 0.01 },
        { itemId: 'bottes_precieuses', dropRate: 0.01 },
        { itemId: 'ceinture_precieuse', dropRate: 0.01 },
        { itemId: 'cape_precieuse', dropRate: 0.01 }
    ],
    miniBossLootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 }
    ]
}

areas.raidPounicheur = {
    id: 'raidPounicheur',
    type: 'raid',
    name: "Miausolée du Pounicheur",
    minLevel: 100, maxLevel: 120,
    mobMinLevel: 100, mobMaxLevel: 110,
    background: "",
    icon: "images/monsters/Pounicheur.png",
    description: "Le Miausolée du Pounicheur est le mausolée d'un félin légendaire dont la mort, dit-on, n'a jamais été tout à fait complète. Ses disciples continuent de le vénérer dans ces couloirs funèbres où les ronronnements des gardiens ressemblent étrangement à des grondements.",
    spawns: [
        { id: 'pupuce', weight: 10 },
        { id: 'morcac', weight: 10 },
        { id: 'pikbul', weight: 10 },
        { id: 'geriatique', weight: 10 },
        { id: 'grath', weight: 5 }
    ],
    miniBoss: { id: 'pounicheur', everyKills: 9, statMult: 1 },
    lootTable: [
        { itemId: 'ceinture_du_pounicheur', dropRate: 0.01 },
        { itemId: 'scalp_du_pounicheur', dropRate: 0.01 },
        { itemId: 'bottes_du_pounicheur', dropRate: 0.01 },
        { itemId: 'cape_des_ecaflipuces', dropRate: 0.01 },
        { itemId: 'bague_des_ecaflipuces', dropRate: 0.01 },
        { itemId: 'collier_des_ecaflipuces', dropRate: 0.01 }
    ],
    miniBossLootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 }
    ]
}

areas.raidTourbeduRoissingue = {
    id: 'raidTourbeduRoissingue',
    name: "Raid de la tourbière du Roissingue",
    type: 'raid',
    minLevel: 100, maxLevel: 170,
    mobMinLevel: 100, mobMaxLevel: 110,
    background: "",
    icon: "images/monsters/Roissingue.png",
    description: "Au cœur de la Tourbière sans fond d'Otomaï s'étend le domaine du Roissingue, souverain grotesque d'un royaume noyé dans la boue et les eaux stagnantes. L'air y est lourd, chargé d'une odeur de moisissure et de tourbe humide, tandis que d'étranges créatures rôdent entre les marécages. Les aventuriers qui s'y aventurent racontent avoir aperçu des silhouettes simiesques vêtues de haillons trempés, riant dans l’obscurité avant de disparaître dans les brumes épaisses. Ici, chaque pas peut être le dernier… car la tourbière semble elle-même vouloir engloutir ceux qui osent troubler le règne du Roissingue.",
    spawns: [
        { id: 'LAouassingue', weight: 15 },
        { id: 'LEouassingue', weight: 15 },
        { id: 'tourbassingue', weight: 35 },
        { id: 'bourbassingue', weight: 35 }
    ],
    miniBoss: { id: 'roissingue', everyKills: 9, statMult: 1 },
    lootTable: [
        { itemId: 'pierreDame', dropRate: 0.35 },
        { itemId: 'cape_de_la_ouassingue', dropRate: 0.01 },
        { itemId: 'capuche_de_la_ouassingue', dropRate: 0.01 },
        { itemId: 'ouassulette', dropRate: 0.01 }
    ],
    miniBossLootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'cape_souveraine_du_roissingue', dropRate: 0.03 },
        { itemId: 'capuche_souveraine_du_roissingue', dropRate: 0.03 },
        { itemId: 'sceau_souverain_du_roissingue', dropRate: 0.03 }
    ]
}

areas.raidFraktale = {
    id: 'raidFraktale',
    type: 'raid',
    name: "Mégalithe de Fraktale",
    minLevel: 110, maxLevel: 130,
    mobMinLevel: 110, mobMaxLevel: 120,
    background: "",
    icon: "images/monsters/Fraktale.png",
    description: "Le Mégalithe de Fraktale est une structure de pierre vivante dont les motifs répétitifs semblent défier la géométrie euclidienne. Fraktale elle-même est une entité fractale — la blesser n'est qu'une invitation à se multiplier.",
    spawns: [
        { id: 'gromorso', weight: 10 },
        { id: 'farfacette', weight: 10 },
        { id: 'brikablak', weight: 10 },
        { id: 'eklatleth', weight: 10 },
        { id: 'segmantid', weight: 5 }
    ],
    miniBoss: { id: 'fraktale', everyKills: 9, statMult: 1 },
    lootTable: [
        { itemId: 'anneau_de_fraktale', dropRate: 0.01 },
        { itemId: 'ceinture_de_fraktale', dropRate: 0.01 },
        { itemId: 'coiffe_de_fraktale', dropRate: 0.01 },
        { itemId: 'anneau_xelomorphe', dropRate: 0.01 },
        { itemId: 'bottes_xelomorphes', dropRate: 0.01 },
        { itemId: 'cape_xelomorphe', dropRate: 0.01 }
    ],
    miniBossLootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 }
    ]
}

areas.raidEkarlatte = {
    id: 'raidEkarlatte',
    type: 'raid',
    name: "Ring du Capitaine Ekarlatte",
    minLevel: 110, maxLevel: 130,
    mobMinLevel: 110, mobMaxLevel: 120,
    background: "",
    icon: "images/monsters/Capitaine_Ekarlatte.png",
    description: "Le Ring du Capitaine Ekarlatte est le cirque personnel d'un pirate reconverti en organisateur de combats. Ses arènes improvisées sur les flots de Sufokia ont vu tomber des champions, et le Capitaine lui-même n'hésite pas à descendre dans l'arène quand le spectacle l'exige.",
    spawns: [
        { id: 'milimaitre', weight: 10 },
        { id: 'kartouche', weight: 10 },
        { id: 'sramourai', weight: 10 },
        { id: 'tromblion', weight: 10 },
        { id: 'elsoummo', weight: 5 }
    ],
    miniBoss: { id: 'capitaine_ekarlatte', everyKills: 9, statMult: 1 },
    lootTable: [
        { itemId: 'ceinture_du_capitaine_ekarlatte', dropRate: 0.01 },
        { itemId: 'bottes_du_capitaine_ekarlatte', dropRate: 0.01 },
        { itemId: 'gant_du_capitaine_ekarlatte', dropRate: 0.01 }
    ],
    miniBossLootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 }
    ]
}

areas.raidPhossile = {
    id: 'raidPhossile',
    type: 'raid',
    name: "Galerie du Phossile",
    minLevel: 140, maxLevel: 160,
    mobMinLevel: 140, mobMaxLevel: 150,
    background: "",
    icon: "images/monsters/Phossile.png",
    description: "La Galerie du Phossile est un musée naturel de fossiles vivants — des créatures dont l'évolution s'est figée dans l'ambre pour des raisons inconnues. Le Phossile, leur chef, est la plus ancienne et la plus redoutable de ces reliques vivantes.",
    spawns: [
        { id: 'phorreveur', weight: 10 },
        { id: 'metaphorreur', weight: 10 },
        { id: 'pere_phorreur', weight: 10 },
        { id: 'phozami', weight: 10 },
        { id: 'mere_veilleuse', weight: 5 }
    ],
    miniBoss: { id: 'phossile', everyKills: 12, statMult: 1 },
    lootTable: [
        { itemId: 'ceinture_phossile', dropRate: 0.01 },
        { itemId: 'cape_phossile', dropRate: 0.01 },
        { itemId: 'bottes_phossiles', dropRate: 0.01 },
        { itemId: 'cape_du_pere_phorreur', dropRate: 0.01 },
        { itemId: 'amulette_du_pere_phorreur', dropRate: 0.01 },
        { itemId: 'ceinture_du_pere_phorreur', dropRate: 0.01 }
    ],
    miniBossLootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 }
    ]
}

areas.raidUsh = {
    id: 'raidUsh',
    type: 'raid',
    name: "Plateau de Ush",
    minLevel: 150, maxLevel: 170,
    mobMinLevel: 150, mobMaxLevel: 160,
    background: "",
    icon: "images/monsters/Ush_Galesh.png",
    description: "Le Plateau de Ush est le terrain de chasse favori de Ush Galesh, chasseur de chasseurs dont la réputation s'étend sur plusieurs continents. Ses proies sont toujours les meilleurs aventuriers disponibles, et le plateau est jonché de leurs équipements.",
    spawns: [
        { id: 'chasquatch', weight: 10 },
        { id: 'chacrebleu', weight: 10 },
        { id: 'chakichan', weight: 10 },
        { id: 'chargus', weight: 10 },
        { id: 'chakaroze', weight: 5 }
    ],
    miniBoss: { id: 'ush_galesh', everyKills: 12, statMult: 1 },
    lootTable: [
        { itemId: 'bottes_de_ush', dropRate: 0.01 },
        { itemId: 'col_de_ush', dropRate: 0.01 },
        { itemId: 'epee_de_ush', dropRate: 0.01 },
        { itemId: 'ceinture_des_matougarous', dropRate: 0.01 },
        { itemId: 'anneau_des_matougarous', dropRate: 0.01 },
        { itemId: 'cape_des_matougarous', dropRate: 0.01 }
    ],
    miniBossLootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 }
    ]
}

areas.raidXLII = {
    id: 'raidXLII',
    type: 'raid',
    name: "Horologium de XLII",
    minLevel: 150, maxLevel: 170,
    mobMinLevel: 150, mobMaxLevel: 160,
    background: "",
    icon: "images/monsters/XLII.png",
    description: "L'Horologium de XLII est un mécanisme temporel d'une complexité absurde, géré par une entité dont le rapport au temps est fondamentalement différent du nôtre. À l'intérieur, les lois de la causalité sont des suggestions, et les aventuriers peuvent croiser leur propre cadavre.",
    spawns: [
        { id: 'trezz', weight: 10 },
        { id: 'vindeux', weight: 10 },
        { id: 'trantroa', weight: 10 },
        { id: 'seith', weight: 10 },
        { id: 'soissanth', weight: 5 }
    ],
    miniBoss: { id: 'xlii', everyKills: 12, statMult: 1 },
    lootTable: [
        { itemId: 'ceinture_de_xlii', dropRate: 0.01 },
        { itemId: 'anneau_de_xlii', dropRate: 0.01 },
        { itemId: 'bottes_de_xlii', dropRate: 0.01 },
        { itemId: 'ceinture_de_soissanth', dropRate: 0.01 },
        { itemId: 'coiffe_de_soissanth', dropRate: 0.01 },
        { itemId: 'pantoufles_de_soissanth', dropRate: 0.01 }
    ],
    miniBossLootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 }
    ]
}

areas.raidToxoliath = {
    id: 'raidToxoliath',
    type: 'raid',
    name: "Cave du Toxoliath",
    minLevel: 160, maxLevel: 180,
    mobMinLevel: 160, mobMaxLevel: 170,
    background: "",
    icon: "images/monsters/Toxoliath.png",
    description: "La Cave du Toxoliath empeste à des kilomètres à la ronde — ce qui est une bonne chose, car cela avertit les imprudents bien avant qu'ils n'entrent dans le territoire de cette créature venimeuse. Le Toxoliath a fait du poison sa langue maternelle.",
    spawns: [
        { id: 'scoliopode', weight: 10 },
        { id: 'puceronde', weight: 10 },
        { id: 'lucrane', weight: 10 },
        { id: 'eperfide', weight: 10 },
        { id: 'morfrelon', weight: 5 }
    ],
    miniBoss: { id: 'toxoliath', everyKills: 12, statMult: 1 },
    lootTable: [
        { itemId: 'bottes_necrotiques', dropRate: 0.01 },
        { itemId: 'amulette_necrotique', dropRate: 0.01 },
        { itemId: 'cape_necrotique', dropRate: 0.01 },
        { itemId: 'chapeau_lochon', dropRate: 0.01 },
        { itemId: 'cape_matelassee', dropRate: 0.01 },
        { itemId: 'pantoufles_emar', dropRate: 0.01 }
    ],
    miniBossLootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 }
    ]
}

areas.raidKralamoureGeant = {
    id: 'raidKralamoureGeant',
    name: 'Raid de l\'Antre du Kralamoure Géant',
    type: 'raid',
    minLevel: 180, maxLevel: 190,
    mobMinLevel: 180, mobMaxLevel: 180,
    background: "",
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
    name: "Palais du roi Nidas",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: "images/monsters/Roi_Nidas.png",
    description: "Le Palais du Roi Nidas est une métaphore architecturale de l'avarice absolue. Tout y est en or — les murs, les sols, les pièges, les gardiens. Le Roi Nidas lui-même est prisonnier de sa propre richesse, mais il a décidé que personne d'autre n'en profiterait.",
    spawns: [
        { id: 'kamasterisk', weight: 10 },
        { id: 'barbetoal', weight: 10 },
        { id: 'levitrof', weight: 10 },
        { id: 'paspartou', weight: 10 },
        { id: 'piloztere', weight: 5 }
    ],
    miniBoss: { id: 'roi_nidas', everyKills: 12, statMult: 1 },
    lootTable: [
        { itemId: 'amulette_du_piloztere', dropRate: 0.01 },
        { itemId: 'bracelet_du_piloztere', dropRate: 0.01 },
        { itemId: 'pantoufles_du_piloztere', dropRate: 0.01 },
        { itemId: 'alliance_du_levitrof', dropRate: 0.01 },
        { itemId: 'bottes_du_levitrof', dropRate: 0.01 },
        { itemId: 'coiffe_du_levitrof', dropRate: 0.01 },
        { itemId: 'amulette_du_kamasterisk', dropRate: 0.01 },
        { itemId: 'bottes_du_kamasterisk', dropRate: 0.01 },
        { itemId: 'cape_du_kamasterisk', dropRate: 0.01 },
        { itemId: 'cape_du_barbetoal', dropRate: 0.01 },
        { itemId: 'ceinture_du_barbetoal', dropRate: 0.01 },
        { itemId: 'masque_du_barbetoal', dropRate: 0.01 }
    ],
    miniBossLootTable: [
        { itemId: 'Dofus_Nebuleux', dropRate: 0.01 },
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'anneau_de_nidas', dropRate: 0.03 },
        { itemId: 'couronne_de_nidas', dropRate: 0.03 },
        { itemId: 'tongues_de_nidas', dropRate: 0.03 },
        { itemId: 'pelle_de_nidas', dropRate: 0.03 }
    ]
}

areas.raidCourSombre = {
    id: 'raidCourSombre',
    type: 'raid',
    name: "Trône de la Cour Sombre",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: "images/monsters/Reine_des_Voleurs.png",
    description: "Le Trône de la Cour Sombre est la résidence de la Reine des Voleurs, gouvernante d'une organisation criminelle dont les tentacules s'étendent à travers tout le Monde des Douze. Y accéder, c'est déjà prouver qu'on a le niveau... pour mourir en grande compagnie.",
    spawns: [
        { id: 'machassin', weight: 10 },
        { id: 'terristocrate', weight: 10 },
        { id: 'doublure', weight: 10 },
        { id: 'bouroliste', weight: 10 },
        { id: 'magouille', weight: 5 }
    ],
    miniBoss: { id: 'reine_des_voleurs', everyKills: 12, statMult: 1 },
    lootTable: [
        { itemId: 'bottes_de_la_cour_sombre', dropRate: 0.01 },
        { itemId: 'cape_de_la_cour_sombre', dropRate: 0.01 },
        { itemId: 'ceinture_de_la_cour_sombre', dropRate: 0.01 },
        { itemId: 'bottes_des_malveilleurs', dropRate: 0.01 },
        { itemId: 'cape_des_malveilleurs', dropRate: 0.01 },
        { itemId: 'chapeau_des_malveilleurs', dropRate: 0.01 },
        { itemId: 'anneau_du_katcheur', dropRate: 0.01 },
        { itemId: 'bottes_du_katcheur', dropRate: 0.01 },
        { itemId: 'masque_du_katcheur', dropRate: 0.01 }
    ],
    miniBossLootTable: [
        { itemId: 'Dofus_Nebuleux', dropRate: 0.01 },
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'bottes_de_la_reine_des_voleurs', dropRate: 0.03 },
        { itemId: 'ceinture_de_la_reine_des_voleurs', dropRate: 0.03 },
        { itemId: 'coiffe_de_la_reine_des_voleurs', dropRate: 0.03 },
        { itemId: 'epee_de_la_reine_des_voleurs', dropRate: 0.03 }
    ]
}

areas.raidVortex = {
    id: 'raidVortex',
    type: 'raid',
    name: "Œil de Vortex",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: "images/monsters/Vortex.png",
    description: "L'Œil de Vortex est le centre d'une tempête permanente dans les eaux de Sufokia. Vortex, entité aquatique d'une puissance atmosphérique démesurée, y orchestre ses cyclones avec une précision qui suggère une intelligence que la météorologie classique peine à expliquer.",
    spawns: [
        { id: 'mejaire', weight: 10 },
        { id: 'harpille', weight: 10 },
        { id: 'ikargn', weight: 10 },
        { id: 'buboxor', weight: 10 },
        { id: 'brabuzar', weight: 5 }
    ],
    miniBoss: { id: 'vortex', everyKills: 12, statMult: 1 },
    lootTable: [
        { itemId: 'bottarpille', dropRate: 0.01 },
        { itemId: 'capille', dropRate: 0.01 },
        { itemId: 'harpendentif', dropRate: 0.01 },
        { itemId: 'anneau_des_egares', dropRate: 0.01 },
        { itemId: 'bottes_des_egares', dropRate: 0.01 },
        { itemId: 'casque_des_egares', dropRate: 0.01 },
        { itemId: 'amibou', dropRate: 0.01 },
        { itemId: 'capibou', dropRate: 0.01 },
        { itemId: 'chapibou', dropRate: 0.01 },
        { itemId: 'bottes_owesli', dropRate: 0.01 },
        { itemId: 'ceintrigue', dropRate: 0.01 },
        { itemId: 'talisman_igans', dropRate: 0.01 }
    ],
    miniBossLootTable: [
        { itemId: 'Dofus_Nebuleux', dropRate: 0.01 },
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'cagoule_de_vortex', dropRate: 0.03 },
        { itemId: 'ceinture_de_vortex', dropRate: 0.03 },
        { itemId: 'sabots_de_vortex', dropRate: 0.03 }
    ]
}

areas.raidChaloeil = {
    id: 'raidChaloeil',
    type: 'raid',
    name: "Défi du Chalœil",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: "images/monsters/Chalœil.png",
    description: "Le Chalœil est un prédateur des profondeurs qui a fait de son regard son arme principale. Son antre est une arène de verre et d'obscurité où chaque reflet peut cacher une menace, et où croiser son œil unique suffit à paralyser les plus courageux.",
    spawns: [
        { id: 'soldat_de_fortune', weight: 10 },
        { id: 'cavalier_chanceux', weight: 10 },
        { id: 'valet_veinard', weight: 10 },
        { id: 'dame_du_hasard', weight: 10 },
        { id: 'roi_joueur', weight: 5 }
    ],
    miniBoss: { id: 'chal_il', everyKills: 12, statMult: 1 },
    lootTable: [
        { itemId: 'bottes_du_roi_joueur', dropRate: 0.01 },
        { itemId: 'chevaliere_du_roi_joueur', dropRate: 0.01 },
        { itemId: 'couronne_du_roi_joueur', dropRate: 0.01 },
        { itemId: 'bottes_de_la_dame_du_hasard', dropRate: 0.01 },
        { itemId: 'cape_de_la_dame_du_hasard', dropRate: 0.01 },
        { itemId: 'collier_de_la_dame_du_hasard', dropRate: 0.01 },
        { itemId: 'cape_du_valet_veinard', dropRate: 0.01 },
        { itemId: 'collier_du_valet_veinard', dropRate: 0.01 },
        { itemId: 'gant_du_valet_veinard', dropRate: 0.01 }
    ],
    miniBossLootTable: [
        { itemId: 'Dofus_Ivoire', dropRate: 0.01 },
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'bottes_du_chal_il', dropRate: 0.03 },
        { itemId: 'casque_du_chal_il', dropRate: 0.03 },
        { itemId: 'hache_du_chal_il', dropRate: 0.03 }
    ]
}

areas.raidOrukam = {
    id: 'raidOrukam',
    type: 'raid',
    name: "Mémoire d'Orukam",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: "images/monsters/Roi_Imagami.png",
    description: "La Mémoire d'Orukam est un espace à la frontière de l'imaginaire et du réel, gouverné par le Roi Imagami. Ce souverain de l'illusion façonne son royaume à sa guise, rendant chaque visite différente — et chaque mort, inoubliable.",
    spawns: [
        { id: 'imushin', weight: 10 },
        { id: 'imorok', weight: 10 },
        { id: 'imiyama', weight: 10 },
        { id: 'imetsu', weight: 10 },
        { id: 'imafugo', weight: 5 }
    ],
    miniBoss: { id: 'roi_imagami', everyKills: 9, statMult: 1 },
    lootTable: [
        { itemId: 'bouclier_ponyme', dropRate: 0.01 },
        { itemId: 'cape_ostrophe', dropRate: 0.01 },
        { itemId: 'casque_onsonne', dropRate: 0.01 },
        { itemId: 'faux_neme', dropRate: 0.01 },
        { itemId: 'amulette_de_wulan', dropRate: 0.01 },
        { itemId: 'arc_de_wulan', dropRate: 0.01 },
        { itemId: 'diademe_de_wulan', dropRate: 0.01 }
    ],
    miniBossLootTable: [
        { itemId: 'Dofus_Tachete', dropRate: 0.01 },
        { itemId: 'pierreDameGardien', dropRate: 0.45 }
    ]
}

areas.raidImagiro = {
    id: 'raidImagiro',
    type: 'raid',
    name: "Souvenir d'Imagiro",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: "images/monsters/Reine_Amirukam.png",
    description: "Le Souvenir d'Imagiro est le pendant sombre de la Mémoire d'Orukam : là où le Roi crée, la Reine Amirukam dévore. Ce sanctuaire de l'oubli efface les souvenirs de ceux qui y pénètrent, les rendant vulnérables à une souveraine qui se nourrit de ce qu'ils ont été.",
    spawns: [
        { id: 'shinlam', weight: 10 },
        { id: 'rokoram', weight: 10 },
        { id: 'mabram', weight: 10 },
        { id: 'tsunam', weight: 10 },
        { id: 'fugokam', weight: 5 }
    ],
    miniBoss: { id: 'reine_amirukam', everyKills: 9, statMult: 1 },
    lootTable: [
        { itemId: 'amulette_rinne', dropRate: 0.01 },
        { itemId: 'carapace_onance', dropRate: 0.01 },
        { itemId: 'sangle_icisme', dropRate: 0.01 },
        { itemId: 'solerets_kritur', dropRate: 0.01 },
        { itemId: 'amulette_de_wulan', dropRate: 0.01 },
        { itemId: 'arc_de_wulan', dropRate: 0.01 },
        { itemId: 'diademe_de_wulan', dropRate: 0.01 }
    ],
    miniBossLootTable: [
        { itemId: 'Dofus_Tachete', dropRate: 0.01 },
        { itemId: 'pierreDameGardien', dropRate: 0.45 }
    ]
}

areas.raidEliocalypse = {
    id: 'raidEliocalypse',
    type: 'raid',
    name: "Tempête de l'Eliocalypse",
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 220, mobMaxLevel: 220,
    background: "",
    icon: "images/monsters/Corruption.png",
    description: "L'Éliocalypse est la fin du monde que certains prophètes avaient annoncée — sauf qu'elle ne s'est pas arrêtée. Dans cette tempête permanente, Servitude, Misère, Guerre et Corruption règnent ensemble sur un champ de ruines où chaque victoire ne fait que retarder l'inévitable.",
    spawns: [
        { id: 'servitude', weight: 33 },
        { id: 'misere', weight: 33 },
        { id: 'guerre', weight: 34 },
        { id: 'corruption', weight: 34 }
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'convoitise_de_misere', dropRate: 0.03 },
        { itemId: 'corset_de_misere', dropRate: 0.03 },
        { itemId: 'solerets_de_misere', dropRate: 0.03 },
        { itemId: 'ceste_de_guerre', dropRate: 0.03 },
        { itemId: 'forteresse_de_guerre', dropRate: 0.03 },
        { itemId: 'heaume_de_guerre', dropRate: 0.03 },
        { itemId: 'solerets_de_guerre', dropRate: 0.03 },
        { itemId: 'dora_de_servitude', dropRate: 0.03 },
        { itemId: 'manteau_de_servitude', dropRate: 0.03 },
        { itemId: 'echarpe_de_servitude', dropRate: 0.03 },
        { itemId: 'alliance_de_corruption', dropRate: 0.03 },
        { itemId: 'bague_de_corruption', dropRate: 0.03 },
        { itemId: 'ceinturonce_de_corruption', dropRate: 0.03 }
    ],
    miniBossLootTable: []
}
// #endregion RAIDS

// #region SAISONNIERS ─────────────────────────────────────────────────────────────────────

// ════════════════════════════════════════════════════════════════════════════════
// HALOUINE — 15 octobre au 3 novembre
// ════════════════════════════════════════════════════════════════════════════════

areas.saisonHalouine = {
    id: 'saisonHalouine',
    type: 'saisonnier',
    season: { start: [10, 15], end: [11, 3] },
    name: 'Lune des Crânes',
    minLevel: 90, maxLevel: 105,
    mobMinLevel: 90, mobMaxLevel: 105,
    background: '',
    icon: 'images/monsters/Bouftou_d_Halouine.png',
    description: "Chaque année, lorsque la Lune des Crânes embrase le ciel d'Halouine, des créatures cauchemardesques envahissent les potagers maudits d'Incarnam. Seuls les aventuriers assez courageux pour affronter la nuit la plus sombre de l'année pourront espérer mettre la main sur la clé du repaire d'Halouine.",
    spawns: [
        { id: 'bouftou_d_halouine', weight: 35 },
        { id: 'tofu_d_halouine',    weight: 35 },
        { id: 'citwouille',         weight: 30 },
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'cleDonjonHalouine', dropRate: 0.15, isKey: true },
        { itemId: 'capitrouille', dropRate: 0.01 },
        { itemId: 'ratrouille', dropRate: 0.01 },
        { itemId: 'chapitrouille', dropRate: 0.01 },
        { itemId: 'ceintrouille', dropRate: 0.01 }
    ]
}

areas.donjonHalouine = {
    id: 'donjonHalouine',
    type: 'saisonnier',
    season: { start: [10, 15], end: [11, 3] },
    keyId: 'cleDonjonHalouine',
    name: "Potager d'Halouine",
    minLevel: 105, maxLevel: 105,
    mobMinLevel: 105, mobMaxLevel: 105,
    background: '',
    icon: 'images/monsters/Halouine.png',
    description: "Dans ce potager maudit où les citrouilles poussent sous la lueur sanglante de la Lune des Crânes, Halouine règne sans partage sur la nuit la plus sombre de l'année. Les aventuriers venus chercher des friandises finissent bien trop souvent à décorer son jardin enchanté... de manière permanente.",
    spawns: [{ id: 'halouine', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'capitrouille', dropRate: 0.01 },
        { itemId: 'ratrouille', dropRate: 0.01 },
        { itemId: 'chapitrouille', dropRate: 0.01 },
        { itemId: 'ceintrouille', dropRate: 0.01 }
    ]
}


// ════════════════════════════════════════════════════════════════════════════════
// NOWEL — 1 décembre au 6 janvier
// ════════════════════════════════════════════════════════════════════════════════

areas.saisonNowelVillage = {
    id: 'saisonNowelVillage',
    type: 'saisonnier',
    season: { start: [12, 1], end: [1, 6] },
    name: 'Village de Nowel',
    minLevel: 50, maxLevel: 55,
    mobMinLevel: 50, mobMaxLevel: 55,
    background: '',
    icon: 'images/monsters/Dragodinde_de_Nowel.png',
    description: "Le Village de Nowel s'éveille chaque décembre, recouvert d'une neige éternelle et peuplé de créatures festives aux intentions bien moins bienveillantes qu'elles n'y paraissent. Dragodinde et Croc Gland rôdent entre les chalets illuminés, gardant jalousement la clé du donjon des Sapiks.",
    spawns: [
        { id: 'dragodinde_de_nowel', weight: 55 },
        { id: 'croc_gland_de_nowel', weight: 45 },
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'cleDonjonNowel', dropRate: 0.15, isKey: true },
        { itemId: 'givrabottes', dropRate: 0.01 },
        { itemId: 'givrature', dropRate: 0.01 },
        { itemId: 'glaglano', dropRate: 0.01 },
        { itemId: 'glaglamu', dropRate: 0.01 },
        { itemId: 'bague_cristalline', dropRate: 0.01 },
        { itemId: 'ceinture_cristalline', dropRate: 0.01 }
    ]
}

areas.donjonNowel = {
    id: 'donjonNowel',
    type: 'saisonnier',
    season: { start: [12, 1], end: [1, 6] },
    keyId: 'cleDonjonNowel',
    name: 'Donjon de Nowel',
    minLevel: 55, maxLevel: 55,
    mobMinLevel: 55, mobMaxLevel: 55,
    background: '',
    icon: 'images/monsters/Sapik.png',
    description: "Derrière les guirlandes scintillantes et les montagnes de cadeaux se cache une réalité bien moins festive. Les Sapiks, lutins autrefois dévoués au Papa Nowel, ont pris le contrôle du donjon et n'accorderont à personne le droit de passer.",
    spawns: [{ id: 'sapik', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'cape_du_papa_nowel', dropRate: 0.01 },
        { itemId: 'chapeau_du_papa_nowel', dropRate: 0.01 },
        { itemId: 'coiffe_de_redolphe', dropRate: 0.01 },
        { itemId: 'licol_de_redolphe', dropRate: 0.01 },
        { itemId: 'sabots_de_redolphe', dropRate: 0.01 },
        { itemId: 'sacoche_de_redolphe', dropRate: 0.01 }
    ]
}

areas.saisonNowelToundra = {
    id: 'saisonNowelToundra',
    type: 'saisonnier',
    season: { start: [12, 1], end: [1, 6] },
    name: 'Toundra de Nowel',
    minLevel: 100, maxLevel: 115,
    mobMinLevel: 100, mobMaxLevel: 115,
    background: '',
    icon: 'images/monsters/Dragodinde_de_Nowel.png',
    description: "Plus loin dans les terres gelées, la toundra de Nowel s'étend à perte de vue. Les Dragondindes sauvages y patrouillent en meutes tandis que des Bouboules de neige roulent entre les crevasses. Quelque part sous la glace se trouve l'entrée de la caverne du Papa Nowel.",
    spawns: [
        { id: 'dragodinde_de_nowel_sauvage', weight: 55 },
        { id: 'bouboule_de_neige',           weight: 45 },
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'cleDonjonCaverneNowel', dropRate: 0.15, isKey: true },
        { itemId: '', dropRate: 0.01 },
    ]
}

areas.donjonCaverneNowel = {
    id: 'donjonCaverneNowel',
    type: 'saisonnier',
    season: { start: [12, 1], end: [1, 6] },
    keyId: 'cleDonjonCaverneNowel',
    name: 'Caverne de Nowel',
    minLevel: 115, maxLevel: 115,
    mobMinLevel: 115, mobMaxLevel: 115,
    background: '',
    icon: 'images/monsters/Papa_Nowel.png',
    description: "Le Papa Nowel est un être pour qui rien ne compte plus que la joie des enfants... et la saveur de leurs entrailles. Cet ogre impitoyable déguisé en vieillard bedonnant attend dans les profondeurs glacées de sa caverne ceux qui ont encore la naïveté de croire aux cadeaux.",
    spawns: [{ id: 'papa_nowel', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: '', dropRate: 0.01 },
    ]
}

areas.saisonNowelDomaine = {
    id: 'saisonNowelDomaine',
    type: 'saisonnier',
    season: { start: [12, 1], end: [1, 6] },
    name: 'Domaine du Père Fwetar',
    minLevel: 160, maxLevel: 175,
    mobMinLevel: 160, mobMaxLevel: 175,
    background: '',
    icon: 'images/monsters/Dragodinde_de_Nowel.png',
    description: "Aux confins du monde de Nowel se dresse le domaine du Père Fwetar, entouré de Dragondindes fougueuses et de Peluches Wabbit gardiennes des murs. Ceux qui osent s'y aventurer savent qu'ils ne trouveront ni trêve ni pitié à l'approche de la demeure du plus sombre des esprits de la nuit de Nowel.",
    spawns: [
        { id: 'dragodinde_de_nowel_fougueuse', weight: 50 },
        { id: 'peluche_wabbit',                weight: 50 },
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'cleDonjonPapaNowel', dropRate: 0.15, isKey: true },
        { itemId: '', dropRate: 0.01 },
    ]
}

areas.donjonPapaNowel = {
    id: 'donjonPapaNowel',
    type: 'saisonnier',
    season: { start: [12, 1], end: [1, 6] },
    keyId: 'cleDonjonPapaNowel',
    name: 'Maison du Papa Nowel',
    minLevel: 175, maxLevel: 175,
    mobMinLevel: 175, mobMaxLevel: 175,
    background: '',
    icon: 'images/monsters/Père_Fwetar.png',
    description: "Tandis que le Papa Nowel distribue ses présents aux enfants sages, le Père Fwetar s'occupe des autres — et il ne fait preuve d'aucune clémence. Sa demeure en apparence chaleureuse dissimule les rituels les plus obscurs de la nuit de Nowel.",
    spawns: [{ id: 'pere_fwetar', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: '', dropRate: 0.01 },
    ]
}


// ════════════════════════════════════════════════════════════════════════════════
// CHOCOLAT / KAO — 1 février au 1 mars
// ════════════════════════════════════════════════════════════════════════════════

areas.saisonChocolatRuelles = {
    id: 'saisonChocolatRuelles',
    type: 'saisonnier',
    season: { start: [2, 1], end: [3, 1] },
    name: 'Ruelles Chocolatées',
    minLevel: 55, maxLevel: 65,
    mobMinLevel: 55, mobMaxLevel: 65,
    background: '',
    icon: 'images/monsters/Chef_Waddict.png',
    description: "Dans les ruelles envahies de cacao fondu, les Chefs Waddicts et les Kwakao fanatiques font régner l'ordre au nom du dieu Kao. Nul n'entre dans la Fonderie sans avoir prouvé sa valeur dans ces ruelles... et survécu.",
    spawns: [
        { id: 'chef_waddict', weight: 50 },
        { id: 'kwakao',       weight: 50 },
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'cleDonjonWaddicts', dropRate: 0.15, isKey: true },
        { itemId: '', dropRate: 0.01 },
    ]
}

areas.donjonWaddicts = {
    id: 'donjonWaddicts',
    type: 'saisonnier',
    season: { start: [2, 1], end: [3, 1] },
    keyId: 'cleDonjonWaddicts',
    name: 'Fonderie des Waddicts',
    minLevel: 65, maxLevel: 65,
    mobMinLevel: 65, mobMaxLevel: 65,
    background: '',
    icon: 'images/monsters/Mawabouaino.png',
    description: "Dans les entrailles de la Fonderie des Waddicts, les convoyeurs de chocolat fondu ne s'arrêtent jamais. Les Waddicts, ouvriers fanatiques dévoués corps et âme à leur production, ont élu le Mawabouaino comme gardien suprême de leurs réserves et n'ont aucune tolérance pour les intrus qui s'y aventurent.",
    spawns: [{ id: 'mawabouaino', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: '', dropRate: 0.01 },
    ]
}

areas.saisonChocolatConfiserie = {
    id: 'saisonChocolatConfiserie',
    type: 'saisonnier',
    season: { start: [2, 1], end: [3, 1] },
    name: "Confiserie de l'Enfer",
    minLevel: 120, maxLevel: 135,
    mobMinLevel: 120, mobMaxLevel: 135,
    background: '',
    icon: 'images/monsters/Kwakao.png',
    description: "Là où le chocolat se cristallise en lames et où les bonbons fondent en acide, la Confiserie de l'Enfer récompense les aventuriers assez solides pour y survivre d'une clé ouvrant les portes de la Croquanterie. Kwakao surdosés et Chocoligarques veillent sur ses couloirs à chaque instant.",
    spawns: [
        { id: 'kwakao_surdose', weight: 55 },
        { id: 'chocoligarque',  weight: 45 },
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'cleDonjonCroquanterie', dropRate: 0.15, isKey: true },
        { itemId: '', dropRate: 0.01 },
    ]
}

areas.donjonCroquanterie = {
    id: 'donjonCroquanterie',
    type: 'saisonnier',
    season: { start: [2, 1], end: [3, 1] },
    keyId: 'cleDonjonCroquanterie',
    name: 'Croquanterie',
    minLevel: 135, maxLevel: 135,
    mobMinLevel: 135, mobMaxLevel: 135,
    background: '',
    icon: 'images/monsters/Croqueleur.png',
    description: "À la Croquanterie, tout croque, grince et se brise — y compris les aventuriers qui s'y aventurent sans prudence. Le Croqueleur, créature monstrueuse née d'une recette de confiserie qui a terriblement mal tourné, veille sur ses réserves de sucreries avec une férocité que nul gourmand ne soupçonnerait.",
    spawns: [{ id: 'croqueleur', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'bottes_croquantes', dropRate: 0.01 },
        { itemId: 'croquasque', dropRate: 0.01 },
        { itemId: 'sac_a_croquer', dropRate: 0.01 }
    ]
}

areas.saisonChocolatTemple = {
    id: 'saisonChocolatTemple',
    type: 'saisonnier',
    season: { start: [2, 1], end: [3, 1] },
    name: 'Abords du Temple Kao',
    minLevel: 185, maxLevel: 200,
    mobMinLevel: 185, mobMaxLevel: 200,
    background: '',
    icon: 'images/monsters/Éclat_Kao.png',
    description: "Aux portes du sanctuaire divin, les Chocoligarques d'élite et les Éclats Kao — fragments vivants de la volonté du dieu — repoussent tout profane qui oserait s'approcher. Seuls ceux qui parviennent à les vaincre peuvent espérer franchir les portes du Temple Kao et affronter sa Prêtresse.",
    spawns: [
        { id: 'chocoligarque', weight: 40 },
        { id: 'eclat_kao',     weight: 60 },
    ],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'cleDonjonKao', dropRate: 0.15, isKey: true },
        { itemId: '', dropRate: 0.01 },
    ]
}

areas.donjonKao = {
    id: 'donjonKao',
    type: 'saisonnier',
    season: { start: [2, 1], end: [3, 1] },
    keyId: 'cleDonjonKao',
    name: 'Temple du dieu Kao',
    minLevel: 200, maxLevel: 200,
    mobMinLevel: 200, mobMaxLevel: 200,
    background: '',
    icon: 'images/monsters/Prêtresse_de_Kao.png',
    description: "Dans ce temple érigé à la gloire de Kao, dieu du Chocolat Absolu, les Chocomanciens murmurent leurs prières en fondu et en craquant. Au plus profond du sanctuaire trône la Prêtresse de Kao, qui a renoncé à toute humanité pour fusionner avec le cacao divin et devenir la gardienne éternelle de la foi chocolatière.",
    spawns: [{ id: 'pretresse_de_kao', weight: 100 }],
    lootTable: [
        { itemId: 'pierreDameGardien', dropRate: 0.45 },
        { itemId: 'amulette_des_chocomanciens', dropRate: 0.01 },
        { itemId: 'bouclier_des_chocomanciens', dropRate: 0.01 },
        { itemId: 'ceinture_des_chocomanciens', dropRate: 0.01 },
    ]
}


// ════════════════════════════════════════════════════════════════════════════════
// VULKANIA — 1 juillet au 1 septembre
// ════════════════════════════════════════════════════════════════════════════════

// areas.saisonVulkania_TEST = {
//     id: 'saisonVulkania_TEST',
//     type: 'saisonnier',
//     season: { start: [7, 1], end: [9, 1] },
//     name: 'Plages de Vulkania',
//     minLevel: 60, maxLevel: 80,
//     mobMinLevel: 60, mobMaxLevel: 80,
//     background: '',
//     icon: 'images/monsters/Krokille_Novice_Insipide.png',
//     description: "TODO",
//     spawns: [
//         { id: 'krokille_novice_insipide',       weight: 20 },
//         { id: 'krokille_novice_boueuse',         weight: 20 },
//         { id: 'krokille_novice_incandescente',   weight: 20 },
//         { id: 'krokille_novice_humide',          weight: 20 },
//         { id: 'krokille_novice_seche',           weight: 20 },
//     ],
//     lootTable: [
//         { itemId: 'pierreDameGardien',    dropRate: 0.45 },
//         { itemId: 'cleDonjonVulkania',    dropRate: 0.15, isKey: true },
//         { itemId: '',                     dropRate: 0.01 },
//     ]
// }

// areas.donjonVulkania_TEST = {
//     id: 'donjonVulkania_TEST',
//     type: 'saisonnier',
//     season: { start: [7, 1], end: [9, 1] },
//     keyId: 'cleDonjonVulkania',
//     name: 'Donjon de Vulkania',
//     minLevel: 80, maxLevel: 80,
//     mobMinLevel: 80, mobMaxLevel: 80,
//     background: '',
//     icon: '',
//     description: "TODO",
//     spawns: [{ id: 'kralab_rah', weight: 100 }],
//     lootTable: [
//         { itemId: 'pierreDameGardien', dropRate: 0.45 },
//         { itemId: '',                  dropRate: 0.01 },
//     ]
// }

// #endregion SAISONNIERS
