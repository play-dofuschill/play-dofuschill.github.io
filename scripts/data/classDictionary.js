// classDictionary.js — Classes jouables DofusChill
// hp/atk/spd : valeurs brutes | res : résistances élémentaires en %

const classes = {}

classes.iop = {
    id: 'iop',
    name: 'Iop',
    role: 'DPS',
    image: 'img/classes/Iop_Male.png',
    description: 'Guerrier brutal, dégâts physiques élevés.',
    bst: {
        hp: 150, atk: 100, spd: 100,
        res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 },
        critChance: 0, critDamagePct: 50,
    },
    growthPerLevel: {
        hp: 5, atk: 10, spd: 0
    },
    startingMove: 'pression',
    learnset: {
            8: "epee_divine",
            12: "couperet",
            16: "ferveur",
            20: "intimidation",
            24: "bond",
            28: "concentration",
            33: "deferlement",
            37: "vitalite",
            41: "souffle",
            45: "epee_destructrice",
            49: "puissance",
            53: "tempete_de_puissance",
            57: "endurance",
            61: "vertu",
            65: "epee_de_iop",
            69: "friction",
            73: "epee_celeste",
            77: "precipitation",
            81: "epee_du_destin",
            85: "emprise",
            90: "fureur",
            95: "fracture",
            100: "menace",
            105: "accumulation",
            110: "epee_du_jugement",
            115: "conquete",
            120: "agitation",
            125: "sentence",
            130: "anneau_destructeur",
            135: "violence",
            140: "rassemblement",
            145: "fustigation",
            150: "vindicte",
            155: "tannee",
            160: "pugilat",
            165: "massacre",
            170: "fendoir",
            175: "coup_pour_coup",
            180: "zenith",
            185: "determination",
            190: "tumulte",
            195: "duel",
            200: "colere_de_iop"}
}
classes.cra = {
    id: 'cra',
    name: 'Cra',
    role: 'Farm / DPS',
    image: 'img/classes/Cra_Male.png',
    description: 'Archer agile, distance et taux de drop élevé.',
    bst: {
        hp: 140, atk: 100, spd: 105,
        res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 },
        critChance: 0, critDamagePct: 50
    },
    growthPerLevel: {
        hp: 5, atk: 5, spd: 0.2
    },
    startingMove: 'fleche_optique',
    learnset: {
            8: "fleche_glacee",
            12: "tir_repulsif",
            16: "fleche_cinglante",
            20: "fleche_de_dispersion",
            24: "tirs_eloignes",
            28: "fleche_dimmobilisation",
            33: "tir_de_recul",
            37: "balise_tactique",
            41: "fleche_détonante",
            45: "fleche_empoisonnee",
            49: "tirs_puissants",
            53: "fleche_de_concentration",
            57: "oeil_de_taupe",
            61: "fleches_erosives",
            65: "tir_perforant",
            69: "fleche_punitive",
            73: "oeil_pour_oeil",
            77: "fleche_dexpiation",
            81: "fleche_explosive",
            85: "fleche_persecutrice",
            90: "vendetta",
            95: "pluie_de_fleches",
            100: "fleche_ralentissante",
            105: "fleches_enflammees",
            110: "tir_de_couverture",
            115: "represailles",
            120: "acuite_absolue",
            125: "fleche_assaillante",
            130: "tir_de_barrage",
            135: "balise_de_rappel",
            140: "fleche_de_tourment",
            145: "fleche_paralysante",
            150: "tirs_percants",
            155: "carreaux_destructeurs",
            160: "fleche_ecrasante",
            165: "fleches_de_repli",
            170: "fleche_devorante",
            175: "fleche_du_jugement",
            180: "miroir_aux_alouettes",
            185: "fleche_de_redemption",
            190: "fleche_fulminante",
            195: "fleche_tyrannique",
            200: "sentinelle"}
}

classes.eniripsa = {
    id: 'eniripsa',
    name: 'Eniripsa',
    role: 'Support',
    image: 'img/classes/Eniripsa_Female.png',
    description: "Soigneure mystique, soins et buffs d'équipe.",
    bst: {
        hp: 150, atk: 100, spd: 100,
        res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0 },
        critChance: 0, critDamagePct: 50
    },
    growthPerLevel: {
        hp: 5, atk: 5, spd: 0
    },
    passive: { id: 'eniripsa' },
    startingMove: 'mot_tapageur',
    learnset: {
            8: "juron",
            15: "mot_vampirique",
            16: "mot_espiegle",
            20: "mot_damitie",
            24: "mot_stimulant",
            28: "mot_de_frayeur",
            33: "lamentations",
            37: "mot_turbulent",
            41: "mot_vivifiant",
            45: "mot_farceur",
            49: "peinture_de_guerre",
            53: "mot_de_jouvence",
            57: "cri_de_guerre",
            61: "mot_interdit",
            65: "mot_accablant",
            69: "chapardage",
            73: "mot_fleuri",
            77: "mot_denvol",
            81: "pinceau_tribal",
            85: "cryothérapie",
            90: "mot_de_reconstitution",
            95: "mot_malicieux",
            100: "cri_assourdissant",
            105: "sanglots",
            110: "onguent_ancestral",
            115: "mot_alchimique",
            120: "mot_de_déclin",
            125: "scalpel",
            130: "vacarme",
            135: "mot_furieux",
            140: "mot_galvanisant",
            145: "mot_défendu",
            150: "mot_secret",
            155: "mot_déprimant",
            160: "mot_rituel",
            165: "mot_exsangue",
            170: "mot_décourageant",
            175: "mot_distrayant",
            180: "bosquet_enchante",
            185: "fontaine_de_jouvence",
            190: "choeur_strident",
            195: "murmure",
            200: "mot_de_solidarité"}
}

// ─── Classes en cours d'implémentation (stubs avec passifs) ──────────────────

classes.zobal = {
    id: 'zobal',
    name: 'Zobal',
    role: 'Tank / Support',
    image: 'img/classes/Zobal_Male.png',
    description: 'Masque mystique, bouclier et soutien.',
    bst: { 
        hp: 160, atk: 90, spd: 100, 
        res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0},
        critChance: 0, critDamagePct: 50 },
    growthPerLevel: { hp: 5, atk: 5, spd: 0 },
    // Passif : tous les 6 sorts, gagne un bouclier = niveau × 2 PV
    passive: { id: 'zobal' },
    startingMove: null, learnset: {}
}

classes.sacrieur = {
    id: 'sacrieur',
    name: 'Sacrieur',
    role: 'DPS Berserker',
    image: 'img/classes/Sacrieur_Male.png',
    description: 'Guerrier de sang, plus puissant quand blessé.',
    bst: { 
        hp: 150, atk: 100, spd: 95, 
        res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0}, 
        critChance: 0, critDamagePct: 50 },
    growthPerLevel: { hp: 10, atk: 5, spd: 0 },
    // Passif : ≤50% PV → +5% dégâts finaux ; ≤15% PV → +10% dégâts finaux
    passive: { id: 'sacrieur' },
    startingMove: null, learnset: {}
}

classes.sram = {
    id: 'sram',
    name: 'Sram',
    role: 'DPS Assassin',
    image: 'img/classes/Sram_Male.png',
    description: "Assassin des ombres, s'empuissante à chaque kill.",
    bst: { 
        hp: 140, atk: 100, spd: 105, 
        res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0}, 
        critChance: 0, critDamagePct: 50 },
    growthPerLevel: { hp: 5, atk: 6, spd: 0 },
    // Passif : +1% dégâts finaux par ennemi tué (cap 5%)
    passive: { id: 'sram' },
    startingMove: null, learnset: {}
}

classes.feca = {
    id: 'feca',
    name: 'Féca',
    role: 'Tank / Mage',
    image: 'img/classes/Feca_Male.png',
    description: 'Protecteur magique, résistances croissantes.',
    bst: { 
        hp: 160, atk: 90, spd: 100, 
        res: {neutre: 5, terre: 5, feu: 5, eau: 5, air: 5}, 
        critChance: 0, critDamagePct: 50 },
    growthPerLevel: { hp: 5, atk: 5, spd: 0 },
    // Passif : +2% résistances all par ennemi tué (cap 10%)
    passive: { id: 'feca' },
    startingMove: null, learnset: {}
}

classes.osamodas = {
    id: 'osamodas',
    name: 'Osamodas',
    role: 'Invocateur',
    image: 'img/classes/Osamodas_Male.png',
    description: 'Maître des bêtes, invocations surpuissantes.',
    bst: { 
        hp: 145, atk: 90, spd: 100, 
        res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0}, 
        critChance: 0, critDamagePct: 50 },
    growthPerLevel: { hp: 5, atk: 5, spd: 0 },
    // Passif : les invocations ont 2× plus de stats (PV et ATK)
    passive: { id: 'osamodas' },
    startingMove: null, learnset: {}
}

classes.enutrofe = {
    id: 'enutrofe',
    name: 'Énutrof',
    role: 'Farmer',
    image: 'img/classes/Enutrof_Male.png',
    description: "Chasseur de trésors, taux de drop et kamas améliorés.",
    bst: { 
        hp: 150, atk: 100, spd: 100, 
        res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0}, 
        critChance: 0, critDamagePct: 50 },
    growthPerLevel: { hp: 5, atk: 5, spd: 0 },
    // Passif : +15% drop d'items, kamas ×2 (quand item au max)
    passive: { id: 'enutrofe' },
    startingMove: 'lancer_de_pieces',
    learnset: {
        8: "roulage_de_pelle",
        15: "force_de_l_age",
        16: "opportunite",
        20: "sac_anime",
        24: "ruee_vers_l_or",
        28: "boite_de_pandore",
        33: "remblai",
        37: "clef_du_tresor",
        41: "abattement",
        45: "pelle_animee",
        49: "avarice",
        53: "pelle_aurifere",
        57: "maladresse",
        61: "pelle_fantomatique",
        65: "banqueroute",
        69: "souterrain",
        73: "pelle_des_anciens",
        77: "peremption",
        81: "corruption",
        85: "retraite_anticipee",
        90: "coffre_anime",
        95: "eboulement",
        100: "monnaie_sonnante",
        105: "orpaillage",
        110: "coup_de_grisou",
        115: "musette_animee",
        120: "deambulation",
        125: "boite_a_outils",
        130: "feu_de_mine",
        135: "clef_de_bras",
        140: "obsolescence",
        145: "beche_animee",
        150: "decadence",
        155: "tourbiere",
        160: "age_d_or",
        165: "dernier_recours",
        170: "lancer_de_pelle",
        175: "beche_des_anciens",
        180: "gisement",
        185: "tamisage",
        190: "tunnel_de_fortune",
        195: "pelle_de_fortune",
        200: "malle_animee"}
}

classes.xelor = {
    id: 'xelor',
    name: 'Xelor',
    role: 'Mage Temporel',
    image: 'img/classes/Xelor_Male.png',
    description: 'Maître du temps, rotation ping-pong',
    bst: { 
        hp: 140, atk: 100, spd: 100, 
        res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0}, 
        critChance: 0, critDamagePct: 50 },
    growthPerLevel: { hp: 5, atk: 5, spd: 0 },
    // Passif : cycle de 7 sorts (1-2-3-4-3-2-1) au lieu de 1-2-3-4
    passive: { id: 'xelor' },
    startingMove: null, learnset: {}
}

classes.huppermage = {
    id: 'huppermage',
    name: 'Huppermage',
    role: 'Mage Élémentaire',
    image: 'img/classes/Huppermage_Male.png',
    description: 'Maître des 4 éléments, bonus si tous différents.',
    bst: { 
        hp: 150, atk: 100, spd: 100, 
        res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0}, 
        critChance: 0, critDamagePct: 50 },
    growthPerLevel: { hp: 5, atk: 5, spd: 0 },
    // Passif : +10% dégâts finaux si les 4 sorts équipés ont des éléments tous différents
    passive: { id: 'huppermage' },
    startingMove: 'lance-flamme',
    learnset: {
        8: "stalagmite",
        12: "onde_sismique",
        16: "ether",
        20: "runification",
        24: "drain_elementaire",
        28: "meteore",
        33: "lame_astrale",
        37: "cycle_elementaire",
        41: "lance_solaire",
        45: "deluge",
        49: "traversee",
        53: "contribution",
        57: "trait_ardent",
        61: "glacier",
        65: "rafale",
        69: "orage",
        73: "bouclier_elementaire",
        77: "polarite",
        81: "surcharge_runique",
        85: "propagation",
        90: "supernova",
        95: "lances_telluriques",
        100: "onde_celeste",
        105: "tison",
        110: "cataracte",
        115: "manifestation",
        120: "tribut",
        125: "avalanche",
        130: "deflagration",
        135: "courant_quadramental",
        140: "comete",
        145: "asteroide",
        150: "repulsion_runique",
        155: "empreinte",
        160: "stalactite",
        165: "volcan",
        170: "breche",
        175: "ouragan",
        180: "gardien_elementaire",
        185: "convection",
        190: "sublimation",
        195: "prisme_runique",
        200: "torrent_arcanique"}
}

classes.sadida = {
    id: 'sadida',
    name: 'Sadida',
    role: 'Contrôle / Support',
    image: 'img/classes/Sadida_Male.png',
    description: 'Esprit de la forêt, ralentit les ennemis périodiquement.',
    bst: { 
        hp: 150, atk: 90, spd: 100, 
        res: {neutre: 0, terre: 5, feu: 0, eau: 0, air: 0}, 
        critChance: 0, critDamagePct: 50 },
    growthPerLevel: { hp: 5, atk: 5, spd: 0 },
    // Passif : tous les 4 sorts, ralentit l'ennemi de -20 vitesse pendant 2 tours
    passive: { id: 'sadida' },
    startingMove: null, learnset: {}
}

classes.roublard = {
    id: 'roublard',
    name: 'Roublard',
    role: 'DPS / Kamikaze',
    image: 'img/classes/Roublard_Male.png',
    description: 'Explosif à la mort, inflige des dégâts en mourant.',
    bst: { 
        hp: 150, atk: 100, spd: 100, 
        res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0}, 
        critChance: 0, critDamagePct: 50 },
    growthPerLevel: { hp: 5, atk: 6, spd: 0 },
    // Passif : à la mort, inflige 30% de son PV max en dégâts neutres à l'ennemi
    passive: { id: 'roublard' },
    startingMove: null, learnset: {}
}

classes.ecaflip = {
    id: 'ecaflip',
    name: 'Écaflip',
    role: 'DPS Gambler',
    image: 'img/classes/Ecaflip_Male.png',
    description: 'Joueur chanceux, roulette de bonus/malus à chaque cycle.',
    bst: { 
        hp: 150, atk: 100, spd: 100, 
        res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0}, 
        critChance: 5, critDamagePct: 50 },
    growthPerLevel: { hp: 6, atk: 5, spd: 0 },
    // Passif : roulette — à chaque cycle de 4 sorts, gagne un bonus ou malus aléatoire
    // (à implémenter : liste des effets roulette à définir)
    passive: { id: 'ecaflip' },
    startingMove: null, learnset: {}
}

classes.steamer = {
    id: 'steamer',
    name: 'Steamer',
    role: 'DPS Tech',
    image: 'img/classes/Steamer_Male.png',
    description: 'Mécanicien de combat, déploie des tourelles infligeant des dégâts.',
    bst: { 
        hp: 150, atk: 100, spd: 95, 
        res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0}, 
        critChance: 0, critDamagePct: 50 },
    growthPerLevel: { hp: 6, atk: 5, spd: 0 },
    // Sorts de type "turret" disponibles (voir executeEffect / mstrMoveDictionary.js)
    passive: { id: 'steamer' },
    startingMove: null, learnset: {}
}

classes.ouginak = {
    id: 'ouginak',
    name: 'Ouginak',
    role: 'DPS Critique',
    image: 'img/classes/Ouginak_Male.png',
    description: 'Chasseur bestial, dégâts critiques augmentés.',
    bst: { 
        hp: 150, atk: 100, spd: 100, 
        res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0}, 
        critChance: 5, critDamagePct: 50 },
    growthPerLevel: { hp: 6, atk: 5, spd: 0 },
    // Passif : +20% dégâts critiques de base
    passive: { id: 'ouginak', baseCritDamagePct: 20 },
    startingMove: null, learnset: {}
}

classes.forgelance = {
    id: 'forgelance',
    name: 'Forgelance',
    role: 'DPS Zone',
    image: 'img/classes/Forgelance_Male.png',
    description: 'Lancier de zone, tous ses sorts frappent en zone (futur).',
    bst: { 
        hp: 200, atk: 100, spd: 90, 
        res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0}, 
        critChance: 0, critDamagePct: 50 },
    growthPerLevel: { hp: 5, atk: 5, spd: 0 },
    // Passif : tous sorts sont AoE (implémentation lors du système de zone multiple)
    passive: { id: 'forgelance' },
    startingMove: null, learnset: {}
}

classes.pandawa = {
    id: 'pandawa',
    name: 'Pandawa',
    role: 'Brawler',
    image: 'img/classes/Pandawa_Male.png',
    description: "Combattant ivre, alterne entre puissance et malus.",
    bst: { 
        hp: 170, atk: 100, spd: 95, 
        res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0}, 
        critChance: 0, critDamagePct: 50 },
    growthPerLevel: { hp: 5, atk: 5, spd: 0 },
    // Passif : cycle normal → ivresse (-20% vit, +20% dmg, +10% res all) → gueule de bois (-20% dmg, -10% res all)
    passive: { id: 'pandawa' },
    startingMove: null, learnset: {}
}

classes.eliotrope = {
    id: 'eliotrope',
    name: 'Éliotrope',
    role: 'Mage Portail',
    image: 'img/classes/Eliotrope_Male.png',
    description: 'Maître des portails, amplifie ses dégâts et ceux de ses alliés.',
    bst: { 
        hp: 140, atk: 100, spd: 100, 
        res: {neutre: 0, terre: 0, feu: 0, eau: 0, air: 0}, 
        critChance: 0, critDamagePct: 50 },
    growthPerLevel: { hp: 5, atk: 5, spd: 0 },
    // Passif : sorts de type "portal" disponibles (voir executeEffect / mstrMoveDictionary.js)
    passive: { id: 'eliotrope' },
    startingMove: null, learnset: {}
}
