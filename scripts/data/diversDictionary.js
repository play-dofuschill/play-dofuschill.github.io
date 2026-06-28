// diversDictionary.js — Objets non-équipements DofusChill
// Étend l'objet `item` défini dans itemDictionary.js

// ────────────────────────────────────────────────────────────────────────
// #region objets divers ──────────────────────────────────────────────────
item.pierreDame = {
    id: 'pierreDame',
    name: "Pierre d'âme",
    image: 'img/items/objets_bonus/Ame.png',
    type: 'resource',
    hiddenInInventory: true,
    description: "Pierre magique renfermant l'âme des monstres rencontrés."
}
item.pierreDameArchimonstre = {
    id: 'pierreDameArchimonstre',
    name: "Pierre D'âme d'archimonstre",
    image: 'img/items/objets_bonus/AmeArchimonstre.png',
    type: 'resource',
    hiddenInInventory: true,
    description: "Pierre magique renfermant l'âme d'un archimonstre !"
}
item.pierreDameGardien = {
    id: 'pierreDameGardien',
    name: "Pierre d'âme de Gardien de donjon",
    image: 'img/items/objets_bonus/AmeGardien.png',
    type: 'resource',
    hiddenInInventory: true,
    description: "Pierre magique renfermant l'âme surpuissante d'un boss"
}
item.caisseEquipement = {
    id: 'caisseEquipement',
    name: "Caisse d'équipement",
    image: 'img/items/objets_bonus/caisseEquipement.png',
    type: 'resource',
    hiddenInInventory: true,
    description: "Caisse d'équipement récupéré sur les monstres tués au combat. Elle renferme un objet magique."
}
item.piloteAutomatique = {
    id: 'piloteAutomatique',
    name: 'Pilote Automatique',
    image: 'img/items/divers/piloteAutomatique.png',
    type: 'resource',
    description: "Votre fidèle dragodinde vous ramène automatiquement de l'infirmerie jusqu'à la zone de combat."
}
item.sablierXelor = {
    id: 'sablierXelor',
    name: 'Sablier de Xélor',
    image: 'img/items/divers/sablierXelor.png',
    type: 'consumable',
    offlineMinutes: 30,
    description: "Un sablier enchanté par Xélor lui-même. Utiliser cet objet accorde 30 minutes de progression accélérée."
}
item.horlogeXelor = {
    id: 'horlogeXelor',
    name: 'Horloge de Xélor',
    image: 'img/items/divers/horlogeXelor.png',
    type: 'consumable',
    offlineMinutes: 180,
    description: "Une horloge mystique façonnée par le dieu du Temps. Utiliser cet objet accorde 3 heures de progression accélérée."
}
// #endregion

// ───────────────────────────────────────────────────────
// #region ── CLES DE DONJONS ────────────────────────────
 

item.cleDonjonKardorim = {
    id: 'cleDonjonKardorim',
    name: 'Clef de la crypte de Kardorim',
    image: 'img/items/divers/donjonKardorim.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet d'entrer dans la Crypte de Kardorim, le plus redoutable des chafers d'Incarnam."
}
item.cleDonjonBouftou = {
    id: 'cleDonjonBouftou',
    name: 'Clef de la Cour du Bouftou Royal',
    image: 'img/items/divers/donjonBouftou.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans la Cour du Bouftou Royal."
}
item.cleDonjonChamps = {
    id: 'cleDonjonChamps',
    name: "Clef de la Grange du Tournesol Affamé",
    image: 'img/items/divers/donjonChamps.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans la Grange du Tournesol Affamé."
}
item.cleDonjonSable = {
    id: 'cleDonjonSable',
    name: "Clef du Château Ensablé",
    image: 'img/items/divers/donjonSable.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Château Ensablé."
}
item.cleDonjonScarafeuille = {
    id: 'cleDonjonScarafeuille',
    name: "Clef du Donjon des Scarafeuilles",
    image: 'img/items/divers/donjonScarafeuille.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Donjon des Scarafeuilles."
}
item.cleDonjonBoostache = {
    id: 'cleDonjonBoostache',
    name: "Clef du Donjon de la Maison Fantôme",
    image: 'img/items/divers/cleDonjonBoostache.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Donjon de la Maison Fantôme."
}
item.cleDonjonKwakwa = {
    id: 'cleDonjonKwakwa',
    name: "Clef du Nid du Kwakwa",
    image: 'img/items/divers/donjonKwakwa.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Nid du Kwakwa."
}
item.cleDonjonBlop = {
    id: 'cleDonjonBlop',
    name: "Clef du Royaume des Blops Royaux",
    image: 'img/items/divers/donjonBlop.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Royaume des Blops Royaux."
}
item.cleDonjonMantiscore = {
    id: 'cleDonjonMantiscore',
    name: "Clef de l'Antre de la Mantiscore",
    image: 'img/items/divers/donjonMantiscore.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans l'Antre de la Mantiscore."
}
item.cleDonjonDraegnerys = {
    id: 'cleDonjonDraegnerys',
    name: "Clef du Repaire du Draegnerys",
    image: 'img/items/divers/donjonDraegnerys.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Repaire du Draegnerys."
}
item.cleDonjonAbraknydeAncestral = {
    id: 'cleDonjonAbraknydeAncestral',
    name: "Clef du Temple de l'Abraknyde Ancestral",
    image: 'img/items/divers/donjonAbraknydeAncestral.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Temple de l'Abraknyde Ancestral."
}
item.cleDonjonDragonCochon = {
    id: 'cleDonjonDragonCochon',
    name: "Clef de la Ferme du Dragon Cochon",
    image: 'img/items/divers/donjonDragonCochon.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans la Ferme du Dragon Cochon."
}
item.cleDonjonMeulou = {
    id: 'cleDonjonMeulou',
    name: "Clef du Moulin du Meulou",
    image: 'img/items/divers/donjonMeulou.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Moulin du Meulou."
}
item.cleDonjonRatNoir = {
    id: 'cleDonjonRatNoir',
    name: "Clef du Terrier du Rat Noir",
    image: 'img/items/divers/donjonRatNoir.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Terrier du Rat Noir."
}
item.cleDonjonRatBlanc = {
    id: 'cleDonjonRatBlanc',
    name: "Clef du Sanctuaire du Rat Blanc",
    image: 'img/items/divers/donjonRatBlanc.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Sanctuaire du Rat Blanc."
}
item.cleDonjonMansotRoyal = {
    id: 'cleDonjonMansotRoyal',
    name: "Clef de la Mine du Mansot Royal",
    image: 'img/items/divers/donjonMansotRoyal.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans la Mine du Mansot Royal."
}
item.cleDonjonTofuRoyal = {
    id: 'cleDonjonTofuRoyal',
    name: "Clef du Tofulailler Royal",
    image: 'img/items/divers/donjonTofulaillerRoyal.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Tofulailler Royal."
}
item.cleDonjonHellMina = {
    id: 'cleDonjonHellMina',
    name: "Clef des Fourrés de Hell Mina",
    image: 'img/items/divers/donjonHellMina.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans les Fourrés de Hell Mina."
}
item.cleDonjonHauteTruche = {
    id: 'cleDonjonHauteTruche',
    name: "Clef du Sommet de la Haute Truche",
    image: 'img/items/divers/donjonHauteTruche.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Sommet de la Haute Truche."
}
item.cleDonjonCheneMou = {
    id: 'cleDonjonCheneMou',
    name: "Clef du Cœur du Chêne Mou",
    image: 'img/items/divers/donjonCheneMou.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Cœur du Chêne Mou."
}
item.cleDonjonMinotot = {
    id: 'cleDonjonMinotot',
    name: "Clef du Dédale des Minotors",
    image: 'img/items/divers/donjonMinotot.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Dédale des Minotors."
}
item.cleDonjonObsidiantre = {
    id: 'cleDonjonObsidiantre',
    name: "Clef du Creuset de l'Obsidiantre",
    image: 'img/items/divers/donjonObsidiantre.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Creuset de l'Obsidiantre."
}
item.cleDonjonTenguGivrefoux = {
    id: 'cleDonjonTenguGivrefoux',
    name: "Clef du Palais du Tengu Givrefoux",
    image: 'img/items/divers/donjonTenguGivrefoux.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Palais du Tengu Givrefoux."
}
item.cleDonjonOugah = {
    id: 'cleDonjonOugah',
    name: "Clef de la Caverne de l'Ougah",
    image: 'img/items/divers/donjonOugah.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans la Caverne de l'Ougah."
}
item.cleDonjonKolosso = {
    id: 'cleDonjonKolosso',
    name: "Clef de la Salle du Kolosso",
    image: 'img/items/divers/donjonKolosso.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans la Salle du Kolosso."
}
item.cleDonjonGlourceleste = {
    id: 'cleDonjonGlourceleste',
    name: "Clef de l'Abri du Gloucéleste",
    image: 'img/items/divers/donjonGlourceleste.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans l'Abri du Gloucéleste."
}
item.cleDonjonHarebourg = {
    id: 'cleDonjonHarebourg',
    name: "Clef du Château Harebourg",
    image: 'img/items/divers/donjonHarebourg.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Château Harebourg."
}
item.cleDonjonSquelettes = {
    id: 'cleDonjonSquelettes',
    name: "Clef du Donjon des Squelettes",
    image: 'img/items/divers/donjonSquelettes.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Donjon des Squelettes."
}
item.cleDonjonTofus = {
    id: 'cleDonjonTofus',
    name: "Clef du Donjon des Tofus",
    image: 'img/items/divers/donjonTofus.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Donjon des Tofus."
}
item.cleDonjonBworks = {
    id: 'cleDonjonBworks',
    name: "Clef du Donjon des Bworks",
    image: 'img/items/divers/donjonBworks.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Donjon des Bworks."
}
item.cleDonjonForgerons = {
    id: 'cleDonjonForgerons',
    name: "Clef du Donjon des Forgerons",
    image: 'img/items/divers/donjonForgerons.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Donjon des Forgerons."
}
item.cleDonjonHesque = {
    id: 'cleDonjonHesque',
    name: "Clef de la Grotte Hesque",
    image: 'img/items/divers/donjonHesque.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans la Grotte Hesque."
}
item.cleDonjonRefugeSylvestre = {
    id: 'cleDonjonRefugeSylvestre',
    name: "Clef du Refuge Sylvestre",
    image: 'img/items/divers/donjonRefugeSylvestre.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Refuge Sylvestre."
}
item.cleDonjonWabbit = {
    id: 'cleDonjonWabbit',
    name: "Clef du Château du Wa Wabbit",
    image: 'img/items/divers/donjonWabbit.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Château du Wa Wabbit."
}
item.cleDonjonKanniboul = {
    id: 'cleDonjonKanniboul',
    name: "Clef du Village Kanniboul",
    image: 'img/items/divers/donjonKanniboul.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Village Kanniboul."
}
item.cleDonjonOtomaj = {
    id: 'cleDonjonOtomaj',
    name: "Clef de l'Arche d'Otomaï",
    image: 'img/items/divers/donjonOtomaj.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans l'Arche d'Otomaï."
}
item.cleDonjonCraqueleurs = {
    id: 'cleDonjonCraqueleurs',
    name: "Clef des Pitons Rocheux des Craqueleurs",
    image: 'img/items/divers/donjonCraqueleurs.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans les Pitons Rocheux des Craqueleurs."
}
item.cleDonjonBrumen = {
    id: 'cleDonjonBrumen',
    name: "Clef du Laboratoire de Brumen Tinctorias",
    image: 'img/items/divers/donjonBrumen.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Laboratoire de Brumen Tinctorias."
}
item.cleDonjonTerrierWabbit = {
    id: 'cleDonjonTerrierWabbit',
    name: "Clef du Terrier du Wa Wabbit",
    image: 'img/items/divers/donjonTerrierWabbit.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Terrier du Wa Wabbit."
}
item.cleDonjonKoulosse = {
    id: 'cleDonjonKoulosse',
    name: "Clef de la Caverne du Koulosse",
    image: 'img/items/divers/donjonKoulosse.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans la Caverne du Koulosse."
}
item.cleDonjonReineNyee = {
    id: 'cleDonjonReineNyee',
    name: "Clef de l'Antre de la Reine Nyée",
    image: 'img/items/divers/donjonReineNyee.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans l'Antre de la Reine Nyée."
}
item.cleDonjonChouque = {
    id: 'cleDonjonChouque',
    name: "Clef du Bateau du Chouque",
    image: 'img/items/divers/donjonChouque.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Bateau du Chouque."
}
item.cleDonjonMagikRiktus = {
    id: 'cleDonjonMagikRiktus',
    name: "Clef du Chapiteau des Magik Riktus",
    image: 'img/items/divers/donjonMagikRiktus.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Chapiteau des Magik Riktus."
}
item.cleDonjonRasboul = {
    id: 'cleDonjonRasboul',
    name: "Clef du Goulet du Rasboul",
    image: 'img/items/divers/donjonRasboul.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Goulet du Rasboul."
}
item.cleDonjonDramak = {
    id: 'cleDonjonDramak',
    name: "Clef du Théâtre de Dramak",
    image: 'img/items/divers/donjonDramak.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Théâtre de Dramak."
}
item.cleDonjonMoon = {
    id: 'cleDonjonMoon',
    name: "Clef de l'Arbre de Moon",
    image: 'img/items/divers/donjonMoon.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans l'Arbre de Moon."
}
item.cleDonjonKharnozor = {
    id: 'cleDonjonKharnozor',
    name: "Clef du Repaire du Kharnozor",
    image: 'img/items/divers/donjonKharnozor.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Repaire du Kharnozor."
}
item.cleDonjonCorbac = {
    id: 'cleDonjonCorbac',
    name: "Clef de la Bibliothèque du Maître Corbac",
    image: 'img/items/divers/donjonCorbac.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans la Bibliothèque du Maître Corbac."
}
item.cleDonjonDamadrya = {
    id: 'cleDonjonDamadrya',
    name: "Clef de la Bambusaie de Damadrya",
    image: 'img/items/divers/donjonDamadrya.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans la Bambusaie de Damadrya."
}
item.cleDonjonMinotoror = {
    id: 'cleDonjonMinotoror',
    name: "Clef du Labyrinthe du Minotoror",
    image: 'img/items/divers/donjonMinotoror.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Labyrinthe du Minotoror."
}
item.cleDonjonCrocabulia = {
    id: 'cleDonjonCrocabulia',
    name: "Clef de l'Antre de Crocabulia",
    image: 'img/items/divers/donjonCrocabulia.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans l'Antre de Crocabulia."
}
item.cleDonjonTofulaillerRoyal = {
    id: 'cleDonjonTofulaillerRoyal',
    name: "Clef Secrète du Tofulailler Royal",
    image: 'img/items/divers/donjonTofulaillerRoyal.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Tofulailler Royal."
}
item.cleDonjonRoyalmouth = {
    id: 'cleDonjonRoyalmouth',
    name: "Clef de la Serre du Royalmouth",
    image: 'img/items/divers/donjonBoufmouthRoyal.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans la Serre du Royalmouth."
}
item.cleDonjonSkeunk = {
    id: 'cleDonjonSkeunk',
    name: "Clef du Repaire de Skeunk",
    image: 'img/items/divers/donjonSkeunk.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Repaire de Skeunk."
}
item.cleDonjonBlopMulticolore = {
    id: 'cleDonjonBlopMulticolore',
    name: "Clef de l'Antre du Blop Multicolore",
    image: 'img/items/divers/donjonBlopMulticolore.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans l'Antre du Blop Multicolore."
}
item.cleDonjonElPiko = {
    id: 'cleDonjonElPiko',
    name: "Clef de la Caverne d'El Piko",
    image: 'img/items/divers/donjonElPiko.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans la Caverne d'El Piko."
}
item.cleDonjonDameEaux = {
    id: 'cleDonjonDameEaux',
    name: "Clef de la Vallée de la Dame des Eaux",
    image: 'img/items/divers/donjonDameEaux.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans la Vallée de la Dame des Eaux."
}
item.cleDonjonTanukoi = {
    id: 'cleDonjonTanukoi',
    name: "Clef de l'Atelier du Tanukouï San",
    image: 'img/items/divers/donjonTanukoi.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans l'Atelier du Tanukouï San."
}
item.cleDonjonTynril = {
    id: 'cleDonjonTynril',
    name: "Clef du Laboratoire du Tynril",
    image: 'img/items/divers/donjonTynril.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Laboratoire du Tynril."
}
item.cleDonjonDojoVent = {
    id: 'cleDonjonDojoVent',
    name: "Clef du Dojo du Vent",
    image: 'img/items/divers/donjonDojoVent.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Dojo du Vent."
}
item.cleDonjonFouxArtifice = {
    id: 'cleDonjonFouxArtifice',
    name: "Clef de la Fabrique de Foux d'Artifice",
    image: 'img/items/divers/donjonFouxArtifice.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans la Fabrique de Foux d'Artifice."
}
item.cleDonjonSphincter = {
    id: 'cleDonjonSphincter',
    name: "Clef du Repaire de Sphincter Cell",
    image: 'img/items/divers/donjonSphincter.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Repaire de Sphincter Cell."
}
item.cleDonjonGrolandais = {
    id: 'cleDonjonGrolandais',
    name: "Clef du Grolandais Violent",
    image: 'img/items/divers/donjonGrolandais.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Grolandais Violent."
}
item.cleDonjonTertreSommeil = {
    id: 'cleDonjonTertreSommeil',
    name: "Clef du Tertre du Long Sommeil",
    image: 'img/items/divers/donjonTertreSommeil.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Tertre du Long Sommeil."
}
item.cleDonjonKimbo = {
    id: 'cleDonjonKimbo',
    name: "Clef de la Canopée du Kimbo",
    image: 'img/items/divers/donjonKimbo.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans la Canopée du Kimbo."
}
item.cleDonjonKanigroula = {
    id: 'cleDonjonKanigroula',
    name: "Clef de la Grotte de Kanigroula",
    image: 'img/items/divers/donjonKanigroula.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans la Grotte de Kanigroula."
}
item.cleDonjonShogunTofugawa = {
    id: 'cleDonjonShogunTofugawa',
    name: "Clef de la Tombe du Shogun Tofugawa",
    image: 'img/items/divers/donjonShogunTofugawa.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans la Tombe du Shogun Tofugawa."
}
item.cleDonjonGivrefoux = {
    id: 'cleDonjonGivrefoux',
    name: "Clef de la Tanière Givrefoux",
    image: 'img/items/divers/donjonGivrefoux.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans la Tanière Givrefoux."
}
item.cleDonjonPereVer = {
    id: 'cleDonjonPereVer',
    name: "Clef du Boyau du Père Ver",
    image: 'img/items/divers/donjonPereVer.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Boyau du Père Ver."
}
item.cleDonjonDemeureEsprits = {
    id: 'cleDonjonDemeureEsprits',
    name: "Clef de la Demeure des Esprits",
    image: 'img/items/divers/donjonDemeureEsprits.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans la Demeure des Esprits."
}
item.cleDonjonBworker = {
    id: 'cleDonjonBworker',
    name: "Clef de la Grotte du Bworker",
    image: 'img/items/divers/donjonBworker.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans la Grotte du Bworker."
}
item.cleDonjonSakai = {
    id: 'cleDonjonSakai',
    name: "Clef de la Mine de Sakaï",
    image: 'img/items/divers/donjonSakai.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans la Mine de Sakaï."
}
item.cleDonjonKorriandre = {
    id: 'cleDonjonKorriandre',
    name: "Clef de l'Antre du Korriandre",
    image: 'img/items/divers/donjonKorriandre.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans l'Antre du Korriandre."
}
item.cleDonjonGloursons = {
    id: 'cleDonjonGloursons',
    name: "Clef de l'Antichambre des Gloursons",
    image: 'img/items/divers/donjonGloursons.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans l'Antichambre des Gloursons."
}
item.cleDonjonOmbre = {
    id: 'cleDonjonOmbre',
    name: "Clef de la Pyramide d'Ombre",
    image: 'img/items/divers/donjonOmbre.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans la Pyramide d'Ombre."
}
item.cleDonjonRazof = {
    id: 'cleDonjonRazof',
    name: "Clef du Camp du Comte Razof",
    image: 'img/items/divers/donjonRazof.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Camp du Comte Razof."
}
item.cleDonjonBastionMarteaux = {
    id: 'cleDonjonBastionMarteaux',
    name: "Clef du Bastion des Marteaux-Aigris",
    image: 'img/items/divers/donjonBastionMarteaux.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Bastion des Marteaux-Aigris."
}
item.cleDonjonSylargh = {
    id: 'cleDonjonSylargh',
    name: "Clef du Transporteur de Sylargh",
    image: 'img/items/divers/donjonSylargh.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Transporteur de Sylargh."
}
item.cleDonjonKlime = {
    id: 'cleDonjonKlime',
    name: "Clef des Salons Privés de Klime",
    image: 'img/items/divers/donjonKlime.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans les Salons Privés de Klime."
}
item.cleDonjonMissizFrizz = {
    id: 'cleDonjonMissizFrizz',
    name: "Clef de la Forgefroide de Missiz Frizz",
    image: 'img/items/divers/donjonMissizFrizz.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans la Forgefroide de Missiz Frizz."
}
item.cleDonjonNileza = {
    id: 'cleDonjonNileza',
    name: "Clef du Laboratoire de Nileza",
    image: 'img/items/divers/donjonNileza.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Laboratoire de Nileza."
}
item.cleDonjonMerkator = {
    id: 'cleDonjonMerkator',
    name: "Clef de l'Aquadôme de Merkator",
    image: 'img/items/divers/donjonMerkator.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans l'Aquadôme de Merkator."
}
item.cleDonjonBaleine = {
    id: 'cleDonjonBaleine',
    name: "Clef du Ventre de la Baleine",
    image: 'img/items/divers/donjonBaleine.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Ventre de la Baleine."
}
item.cleDonjonMeno = {
    id: 'cleDonjonMeno',
    name: "Clef du Vaisseau du Capitaine Meno",
    image: 'img/items/divers/donjonMeno.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Vaisseau du Capitaine Meno."
}
item.cleDonjonKoutoulou = {
    id: 'cleDonjonKoutoulou',
    name: "Clef du Temple de Koutoulou",
    image: 'img/items/divers/donjonKoutoulou.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Temple de Koutoulou."
}
item.cleDonjonDantinea = {
    id: 'cleDonjonDantinea',
    name: "Clef du Palais de Dantinéa",
    image: 'img/items/divers/donjonDantinea.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Palais de Dantinéa."
}
item.cleDonjonIlyzaelle = {
    id: 'cleDonjonIlyzaelle',
    name: "Clef du Belvédère d'Ilyzaelle",
    image: 'img/items/divers/donjonIlyzaelle.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Belvédère d'Ilyzaelle."
}
item.cleDonjonBethel = {
    id: 'cleDonjonBethel',
    name: "Clef de la Tour de Bethel",
    image: 'img/items/divers/donjonBethel.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans la Tour de Bethel."
}
item.cleDonjonSolar = {
    id: 'cleDonjonSolar',
    name: "Clef de la Tour de Solar",
    image: 'img/items/divers/donjonSolar.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans la Tour de Solar."
}
item.cleDonjonDazak = {
    id: 'cleDonjonDazak',
    name: "Clef de la Brasserie du Roi Dazak",
    image: 'img/items/divers/donjonDazak.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans la Brasserie du Roi Dazak."
}
item.cleDonjonTorkelonia = {
    id: 'cleDonjonTorkelonia',
    name: "Clef du Sanctuaire de Torkélonia",
    image: 'img/items/divers/donjonTorkelonia.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Sanctuaire de Torkélonia."
}
item.cleDonjonArbreMort = {
    id: 'cleDonjonArbreMort',
    name: "Clef de l'Arbre de Mort",
    image: 'img/items/divers/donjonArbreMort.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans l'Arbre de Mort."
}
item.cleDonjonTyrannie = {
    id: 'cleDonjonTyrannie',
    name: "Clef des Fers de la Tyrannie",
    image: 'img/items/divers/donjonTyrannie.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans les Fers de la Tyrannie."
}
item.cleDonjonBalance = {
    id: 'cleDonjonBalance',
    name: "Clef de la Sentence de la Balance",
    image: 'img/items/divers/donjonBalance.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans la Sentence de la Balance."
}
item.cleDonjonTroneSang = {
    id: 'cleDonjonTroneSang',
    name: "Clef du Trône de Sang",
    image: 'img/items/divers/donjonTroneSang.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Trône de Sang."
}
item.cleDonjonTalKasha = {
    id: 'cleDonjonTalKasha',
    name: "Clef de la Chambre de Tal Kasha",
    image: 'img/items/divers/donjonTalKasha.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans la Chambre de Tal Kasha."
}
item.cleDonjonKabahal = {
    id: 'cleDonjonKabahal',
    name: "Clef du Rituel de Kabahal",
    image: 'img/items/divers/donjonKabahal.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans le Rituel de Kabahal."
}
item.cleDonjonAurorePourpre = {
    id: 'cleDonjonAurorePourpre',
    name: "Clef de la Bataille de l'Aurore Pourpre",
    image: 'img/items/divers/donjonAurorePourpre.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans la Bataille de l'Aurore Pourpre."
}
item.cleDonjonMalefices = {
    id: 'cleDonjonMalefices',
    name: "Clef de la Chambre des Maléfices",
    image: 'img/items/divers/donjonMalefices.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans la Chambre des Maléfices."
}
item.cleDonjonAcademieGobs = {
    id: 'cleDonjonAcademieGobs',
    name: "Clef de l'Akadémie des Gobs",
    image: 'img/items/divers/donjonGob.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans l'Akadémie des Gobs."
}
item.cleDonjonKankreblath = {
    id: 'cleDonjonKankreblath',
    name: "Clef de la Cache de Kankreblath",
    image: 'img/items/divers/donjonKankreblath.png',
    type: 'resource',
    isKey: true,
    description: "Cette clef permet de rentrer dans la Cache de Kankreblath."
}
item.cleDonjonLarves = {
    id: 'cleDonjonLarves',
    name: 'Clef du Donjon des Larves',
    image: 'img/items/divers/donjonLarves.png',
    type: 'resource',
    isKey: true,
    description: 'Cette clef permet de rentrer dans le Donjon des Larves.'
}
item.cleDonjonKatrepat = {
    id: 'cleDonjonKatrepat',
    name: 'Clef du Donjon des Katrepat',
    image: 'img/items/divers/DonjonKatrepat.png',
    type: 'resource',
    isKey: true,
    description: 'Cette clef permet de rentrer dans le Donjon des Katrepat.'
}

// #endregion

// ────────────────────────────────────────────────────────────────────────
// #region Runes de forgemagie ────────────────────────────────────────────
// levelCost       = niveaux perdus par l'item à l'application
// minRequiredLevel= niveau minimum requis sur l'item (itm.requiredLevel) pour utiliser cette rune
// fusionCost      = nombre de runes normales nécessaires pour créer la version Transcendance
//
// Runes normales : s'ajoutent à la stat EXISTANTE du même type sur l'item.
// Runes de Transcendance (transcendance:true) : remplacent le slot par une stat entièrement nouvelle.
//   Obtenues par fusion dans l'onglet "⚗ Fusion" de la forgemagie.
// ── PV ─────────────────────────────────────────────────────────────────────────
item.runeHpS = { id: 'runeHpS', type: 'rune', name: 'Rune S : PV+20', stat: 'maxHp', value: 20, levelCost: 3, minRequiredLevel: 0, fusionCost: 5, image: 'img/items/runes/maxHp1.png', description: '+20 PV sur un slot PV existant.' }
item.runeHpM = { id: 'runeHpM', type: 'rune', name: 'Rune M : PV+60', stat: 'maxHp', value: 60, levelCost: 7, minRequiredLevel: 80, fusionCost: 7, image: 'img/items/runes/maxHp2.png', description: '+60 PV sur un slot PV existant (item requis niv.80+).' }
item.runeHpL = { id: 'runeHpL', type: 'rune', name: 'Rune L : PV+150', stat: 'maxHp', value: 150, levelCost: 12, minRequiredLevel: 150, fusionCost: 10, image: 'img/items/runes/maxHp3.png', description: '+150 PV sur un slot PV existant (item requis niv.150+).' }
// ── ATK ────────────────────────────────────────────────────────────────────────
item.runeAtkS = { id: 'runeAtkS', type: 'rune', name: 'Rune S : Pui+20', stat: 'atk', value: 20, levelCost: 3, minRequiredLevel: 0, fusionCost: 5, image: 'img/items/runes/puissance1.png', description: '+20 ATK sur un slot Puissance existant.' }
item.runeAtkM = { id: 'runeAtkM', type: 'rune', name: 'Rune M : Pui+50', stat: 'atk', value: 50, levelCost: 7, minRequiredLevel: 80, fusionCost: 7, image: 'img/items/runes/puissance2.png', description: '+50 ATK sur un slot Puissance existant (item requis niv.80+).' }
item.runeAtkL = { id: 'runeAtkL', type: 'rune', name: 'Rune L : Pui+100', stat: 'atk', value: 100, levelCost: 12, minRequiredLevel: 150, fusionCost: 10, image: 'img/items/runes/puissance3.png', description: '+100 ATK sur un slot Puissance existant (item requis niv.150+).' }
// ── Force ──────────────────────────────────────────────────────────────────────
item.runeForceS = { id: 'runeForceS', type: 'rune', name: 'Rune S : Force+20',  stat: 'force', value: 20,  levelCost: 3, minRequiredLevel: 0,   fusionCost: 5,  image: 'img/items/runes/force1.png', description: '+20 Force sur un slot Force existant.' }
item.runeForceM = { id: 'runeForceM', type: 'rune', name: 'Rune M : Force+50', stat: 'force', value: 50, levelCost: 7, minRequiredLevel: 80,  fusionCost: 7,  image: 'img/items/runes/force2.png', description: '+50 Force sur un slot Force existant (item requis niv.80+).' }
item.runeForceL = { id: 'runeForceL', type: 'rune', name: 'Rune L : Force+100', stat: 'force', value: 100, levelCost: 12, minRequiredLevel: 150, fusionCost: 10, image: 'img/items/runes/force3.png', description: '+100 Force sur un slot Force existant (item requis niv.150+).' }
// ── Intelligence ───────────────────────────────────────────────────────────────
item.runeIntelS = { id: 'runeIntelS', type: 'rune', name: 'Rune S : Intel+20',  stat: 'intelligence', value: 20,  levelCost: 3, minRequiredLevel: 0,   fusionCost: 5,  image: 'img/items/runes/intelligence1.png', description: '+20 Intelligence sur un slot Intelligence existant.' }
item.runeIntelM = { id: 'runeIntelM', type: 'rune', name: 'Rune M : Intel+50', stat: 'intelligence', value: 50, levelCost: 7, minRequiredLevel: 80,  fusionCost: 7,  image: 'img/items/runes/intelligence2.png', description: '+50 Intelligence sur un slot Intelligence existant (item requis niv.80+).' }
item.runeIntelL = { id: 'runeIntelL', type: 'rune', name: 'Rune L : Intel+100', stat: 'intelligence', value: 100, levelCost: 12, minRequiredLevel: 150, fusionCost: 10, image: 'img/items/runes/intelligence3.png', description: '+100 Intelligence sur un slot Intelligence existant (item requis niv.150+).' }
// ── Chance ─────────────────────────────────────────────────────────────────────
item.runeChanceS = { id: 'runeChanceS', type: 'rune', name: 'Rune S : Chance+20',  stat: 'chance', value: 20,  levelCost: 3, minRequiredLevel: 0,   fusionCost: 5,  image: 'img/items/runes/chance1.png', description: '+20 Chance sur un slot Chance existant.' }
item.runeChanceM = { id: 'runeChanceM', type: 'rune', name: 'Rune M : Chance+50', stat: 'chance', value: 50, levelCost: 7, minRequiredLevel: 80,  fusionCost: 7,  image: 'img/items/runes/chance2.png', description: '+50 Chance sur un slot Chance existant (item requis niv.80+).' }
item.runeChanceL = { id: 'runeChanceL', type: 'rune', name: 'Rune L : Chance+100', stat: 'chance', value: 100, levelCost: 12, minRequiredLevel: 150, fusionCost: 10, image: 'img/items/runes/chance3.png', description: '+100 Chance sur un slot Chance existant (item requis niv.150+).' }
// ── Agilité ────────────────────────────────────────────────────────────────────
item.runeAgiS = { id: 'runeAgiS', type: 'rune', name: 'Rune S : Agi+20',  stat: 'agilite', value: 20,  levelCost: 3, minRequiredLevel: 0,   fusionCost: 5,  image: 'img/items/runes/agilite1.png', description: '+20 Agilité sur un slot Agilité existant.' }
item.runeAgiM = { id: 'runeAgiM', type: 'rune', name: 'Rune M : Agi+50', stat: 'agilite', value: 50, levelCost: 7, minRequiredLevel: 80,  fusionCost: 7,  image: 'img/items/runes/agilite2.png', description: '+50 Agilité sur un slot Agilité existant (item requis niv.80+).' }
item.runeAgiL = { id: 'runeAgiL', type: 'rune', name: 'Rune L : Agi+100', stat: 'agilite', value: 100, levelCost: 12, minRequiredLevel: 150, fusionCost: 10, image: 'img/items/runes/agilite3.png', description: '+100 Agilité sur un slot Agilité existant (item requis niv.150+).' }
// ── Vitesse ────────────────────────────────────────────────────────────────────
item.runeSpdS = { id: 'runeSpdS', type: 'rune', name: 'Rune S : Init+3', stat: 'spd', value: 3, levelCost: 4, minRequiredLevel: 0, fusionCost: 5, image: 'img/items/runes/vitesse1.png', description: '+3 Vit sur un slot Vitesse existant.' }
item.runeSpdM = { id: 'runeSpdM', type: 'rune', name: 'Rune M : Init+6', stat: 'spd', value: 6, levelCost: 8, minRequiredLevel: 80, fusionCost: 7, image: 'img/items/runes/vitesse2.png', description: '+6 Vit sur un slot Vitesse existant (item requis niv.80+).' }
item.runeSpdL = { id: 'runeSpdL', type: 'rune', name: 'Rune L : Init+10', stat: 'spd', value: 10, levelCost: 12, minRequiredLevel: 150, fusionCost: 10, image: 'img/items/runes/vitesse3.png', description: '+10 Vit sur un slot Vitesse existant (item requis niv.150+).' }
// ── Dégâts fixes ───────────────────────────────────────────────────────────────
item.runeFlatDmgS = { id: 'runeFlatDmgS', type: 'rune', name: 'Rune S : Dégâts+5', stat: 'flatDamage', value: 5, levelCost: 3, minRequiredLevel: 0, fusionCost: 5, image: 'img/items/runes/flatDamage1.png', description: '+5 Dég.fixes sur un slot Dégâts fixes existant.' }
item.runeFlatDmgM = { id: 'runeFlatDmgM', type: 'rune', name: 'Rune M : Dégâts+15', stat: 'flatDamage', value: 15, levelCost: 7, minRequiredLevel: 80, fusionCost: 7, image: 'img/items/runes/flatDamage2.png', description: '+15 Dég.fixes sur un slot Dégâts fixes existant (item requis niv.80+).' }
item.runeFlatDmgL = { id: 'runeFlatDmgL', type: 'rune', name: 'Rune L : Dégâts+40', stat: 'flatDamage', value: 40, levelCost: 12, minRequiredLevel: 150, fusionCost: 10, image: 'img/items/runes/flatDamage3.png', description: '+40 Dég.fixes sur un slot Dégâts fixes existant (item requis niv.150+).' }
// ── Critique ───────────────────────────────────────────────────────────────────
item.runeCritS = { id: 'runeCritS', type: 'rune', name: 'Rune S : Crit+2%', stat: 'critChance', value: 2, levelCost: 4, minRequiredLevel: 0, fusionCost: 5, image: 'img/items/runes/pourcent_crit1.png', description: '+2% Crit sur un slot Chance Crit existant.' }
item.runeCritM = { id: 'runeCritM', type: 'rune', name: 'Rune M : Crit+4%', stat: 'critChance', value: 4, levelCost: 8, minRequiredLevel: 80, fusionCost: 7, image: 'img/items/runes/pourcent_crit2.png', description: '+4% Crit sur un slot Chance Crit existant (item requis niv.80+).' }
item.runeCritL = { id: 'runeCritL', type: 'rune', name: 'Rune L : Crit+6%', stat: 'critChance', value: 6, levelCost: 12, minRequiredLevel: 150, fusionCost: 10, image: 'img/items/runes/pourcent_crit3.png', description: '+6% Crit sur un slot Chance Crit existant (item requis niv.150+).' }
item.runeCritDmgM = { id: 'runeCritDmgM', type: 'rune', name: 'Rune M : DégCrit+5%', stat: 'critDamagePct', value: 5, levelCost: 5, minRequiredLevel: 80, fusionCost: 7, image: 'img/items/runes/dommage_crit1.png', description: '+5% Dég.Crit sur un slot Dégâts Crit existant.' }
item.runeCritDmgL = { id: 'runeCritDmgL', type: 'rune', name: 'Rune L : DégCrit+10%', stat: 'critDamagePct', value: 10, levelCost: 9, minRequiredLevel: 150, fusionCost: 10, image: 'img/items/runes/dommage_crit2.png', description: '+10% Dég.Crit sur un slot Dégâts Crit existant (item requis niv.80+).' }
// ── Dégâts % ───────────────────────────────────────────────────────────────────
item.runeFinalDmgM = { id: 'runeFinalDmgM', type: 'rune', name: 'Rune M : DégFin+2%', stat: 'finalDamagePct', value: 2, levelCost: 7, minRequiredLevel: 80, fusionCost: 7, image: 'img/items/runes/dommage_finaux1.png', description: '+2% Dég.finaux sur un slot Dégâts finaux existant.' }
item.runeFinalDmgL = { id: 'runeFinalDmgL', type: 'rune', name: 'Rune L : DégFin+5%', stat: 'finalDamagePct', value: 5, levelCost: 12, minRequiredLevel: 150, fusionCost: 10, image: 'img/items/runes/dommage_finaux2.png', description: '+5% Dég.finaux sur un slot Dégâts finaux existant (item requis niv.80+).' }
item.runeSpellDmgM = { id: 'runeSpellDmgM', type: 'rune', name: 'Rune M : DégSort+2%', stat: 'spellDamagePct', value: 2, levelCost: 7, minRequiredLevel: 80, fusionCost: 7, image: 'img/items/runes/SpellDamage1.png', description: '+2% Dég.sorts sur un slot Dégâts sorts existant.' }
item.runeSpellDmgL = { id: 'runeSpellDmgL', type: 'rune', name: 'Rune L : DégSort+5%', stat: 'spellDamagePct', value: 5, levelCost: 12, minRequiredLevel: 150, fusionCost: 10, image: 'img/items/runes/SpellDamage2.png', description: '+5% Dég.sorts sur un slot Dégâts sorts existant (item requis niv.80+).' }
// ── Défensif ───────────────────────────────────────────────────────────────────
item.runeDamRedM = { id: 'runeDamRedM', type: 'rune', name: 'Rune M : Réd+2%', stat: 'damageReductionPct', value: 2, levelCost: 7, minRequiredLevel: 80, fusionCost: 7, image: 'img/items/runes/reduc_dommage_finaux1.png', description: '+2% Réd.dégâts sur un slot Réduction existant.' }
item.runeDamRedL = { id: 'runeDamRedL', type: 'rune', name: 'Rune L : Réd+5%', stat: 'damageReductionPct', value: 5, levelCost: 12, minRequiredLevel: 150, fusionCost: 10, image: 'img/items/runes/reduc_dommage_finaux2.png', description: '+5% Réd.dégâts sur un slot Réduction existant (item requis niv.150+).' }
// ── Drop ───────────────────────────────────────────────────────────────────────
item.runeDropRateM = { id: 'runeDropRateM', type: 'rune', name: 'Rune M : Drop+1', stat: 'dropRate', value: 1, levelCost: 5, minRequiredLevel: 80,  fusionCost: 7,  image: 'img/items/runes/dropRate1.png', description: '+1 Drop sur un slot Drop existant.' }
item.runeDropRateL = { id: 'runeDropRateL', type: 'rune', name: 'Rune L : Drop+3', stat: 'dropRate', value: 3, levelCost: 9, minRequiredLevel: 150, fusionCost: 10, image: 'img/items/runes/dropRate2.png', description: '+3 Drop sur un slot Drop existant (item requis niv.150+).' }
// ── Résistances ────────────────────────────────────────────────────────────────
item.runeFireResM    = { id: 'runeFireResM',    type: 'rune', name: 'Rune Feu+2%',    stat: 'res.feu',    value: 2, levelCost: 9, minRequiredLevel: 80, fusionCost: 7, image: 'img/items/runes/res_feu2.png',    description: '+2% Rés.Feu sur un slot Rés.Feu existant.' }
item.runeWaterResM   = { id: 'runeWaterResM',   type: 'rune', name: 'Rune Eau+2%',    stat: 'res.eau',    value: 2, levelCost: 9, minRequiredLevel: 80, fusionCost: 7, image: 'img/items/runes/res_eau2.png',    description: '+2% Rés.Eau sur un slot Rés.Eau existant.' }
item.runeEarthResM   = { id: 'runeEarthResM',   type: 'rune', name: 'Rune Terre+2%',  stat: 'res.terre',   value: 2, levelCost: 9, minRequiredLevel: 80, fusionCost: 7, image: 'img/items/runes/res_terre2.png',  description: '+2% Rés.Terre sur un slot Rés.Terre existant.' }
item.runeAirResM     = { id: 'runeAirResM',     type: 'rune', name: 'Rune Air+2%',    stat: 'res.air',     value: 2, levelCost: 9, minRequiredLevel: 80, fusionCost: 7, image: 'img/items/runes/res_air2.png',    description: '+2% Rés.Air sur un slot Rés.Air existant.' }
item.runeNeutralResM = { id: 'runeNeutralResM', type: 'rune', name: 'Rune Neutre+2%', stat: 'res.neutre', value: 2, levelCost: 9, minRequiredLevel: 80, fusionCost: 7, image: 'img/items/runes/res_neutre2.png', description: '+2% Rés.Neutre sur un slot Rés.Neutre existant.' }

item.runeFireResL    = { id: 'runeFireResL',    type: 'rune', name: 'Rune Feu+4%',    stat: 'res.feu',    value: 4, levelCost: 12, minRequiredLevel: 150, fusionCost: 10, image: 'img/items/runes/res_feu2.png',    description: '+4% Rés.Feu sur un slot Rés.Feu existant.' }
item.runeWaterResL   = { id: 'runeWaterResL',   type: 'rune', name: 'Rune Eau+4%',    stat: 'res.eau',    value: 4, levelCost: 12, minRequiredLevel: 150, fusionCost: 10, image: 'img/items/runes/res_eau2.png',    description: '+4% Rés.Eau sur un slot Rés.Eau existant.' }
item.runeEarthResL   = { id: 'runeEarthResL',   type: 'rune', name: 'Rune Terre+4%',  stat: 'res.terre',   value: 4, levelCost: 12, minRequiredLevel: 150, fusionCost: 10, image: 'img/items/runes/res_terre2.png',  description: '+4% Rés.Terre sur un slot Rés.Terre existant.' }
item.runeAirResL     = { id: 'runeAirResL',     type: 'rune', name: 'Rune Air+4%',    stat: 'res.air',     value: 4, levelCost: 12, minRequiredLevel: 150, fusionCost: 10, image: 'img/items/runes/res_air2.png',    description: '+4% Rés.Air sur un slot Rés.Air existant.' }
item.runeNeutralResL = { id: 'runeNeutralResL', type: 'rune', name: 'Rune Neutre+4%', stat: 'res.neutre', value: 4, levelCost: 12, minRequiredLevel: 150, fusionCost: 10, image: 'img/items/runes/res_neutre2.png', description: '+4% Rés.Neutre sur un slot Rés.Neutre existant.' }

// ── Runes de Transcendance ─────────────────────────────────────────────────────
// Mêmes stats que les runes normales, mais s'appliquent sur N'IMPORTE quel slot
// (même si la stat n'est pas présente sur l'item — forge exotique).
// Obtenues en fusionnant des runes normales dans l'onglet ⚗ Fusion.
item.runeTransHpS    = { id: 'runeTransHpS',    type: 'rune', transcendance: true, name: 'Rune Trans PV+20',       stat: 'maxHp',             value: 20,  levelCost: 3,  minRequiredLevel: 0,   image: 'img/items/runes/maxHp1.png',                 description: '+20 PV sur n\'importe quel slot (forge exotique).' }
item.runeTransHpM    = { id: 'runeTransHpM',    type: 'rune', transcendance: true, name: 'Rune Trans PV+60',       stat: 'maxHp',             value: 60,  levelCost: 7,  minRequiredLevel: 80,  image: 'img/items/runes/maxHp2.png',                 description: '+60 PV sur n\'importe quel slot (forge exotique).' }
item.runeTransHpL    = { id: 'runeTransHpL',    type: 'rune', transcendance: true, name: 'Rune Trans PV+150',      stat: 'maxHp',             value: 150, levelCost: 12, minRequiredLevel: 150, image: 'img/items/runes/maxHp3.png',                 description: '+150 PV sur n\'importe quel slot (forge exotique).' }
item.runeTransAtkS   = { id: 'runeTransAtkS',   type: 'rune', transcendance: true, name: 'Rune Trans ATK+20',      stat: 'atk',               value: 20,  levelCost: 3,  minRequiredLevel: 0,   image: 'img/items/runes/puissance1.png',             description: '+20 ATK sur n\'importe quel slot (forge exotique).' }
item.runeTransAtkM   = { id: 'runeTransAtkM',   type: 'rune', transcendance: true, name: 'Rune Trans ATK+50',      stat: 'atk',               value: 50,  levelCost: 7,  minRequiredLevel: 80,  image: 'img/items/runes/puissance2.png',             description: '+50 ATK sur n\'importe quel slot (forge exotique).' }
item.runeTransAtkL   = { id: 'runeTransAtkL',   type: 'rune', transcendance: true, name: 'Rune Trans ATK+100',     stat: 'atk',               value: 100, levelCost: 12, minRequiredLevel: 150, image: 'img/items/runes/puissance3.png',             description: '+100 ATK sur n\'importe quel slot (forge exotique).' }
item.runeTransForceS  = { id: 'runeTransForceS',  type: 'rune', transcendance: true, name: 'Rune Trans Force+20',  stat: 'force',        value: 20,  levelCost: 3,  minRequiredLevel: 0,   image: 'img/items/runes/force1.png',        description: '+20 Force sur n\'importe quel slot (forge exotique).' }
item.runeTransForceM  = { id: 'runeTransForceM',  type: 'rune', transcendance: true, name: 'Rune Trans Force+50',  stat: 'force',        value: 50,  levelCost: 7,  minRequiredLevel: 80,  image: 'img/items/runes/force2.png',        description: '+50 Force sur n\'importe quel slot (forge exotique).' }
item.runeTransForceL  = { id: 'runeTransForceL',  type: 'rune', transcendance: true, name: 'Rune Trans Force+100', stat: 'force',        value: 100, levelCost: 12, minRequiredLevel: 150, image: 'img/items/runes/force3.png',        description: '+100 Force sur n\'importe quel slot (forge exotique).' }
item.runeTransIntelS  = { id: 'runeTransIntelS',  type: 'rune', transcendance: true, name: 'Rune Trans Intel+20',  stat: 'intelligence', value: 20,  levelCost: 3,  minRequiredLevel: 0,   image: 'img/items/runes/intelligence1.png', description: '+20 Intelligence sur n\'importe quel slot (forge exotique).' }
item.runeTransIntelM  = { id: 'runeTransIntelM',  type: 'rune', transcendance: true, name: 'Rune Trans Intel+50',  stat: 'intelligence', value: 50,  levelCost: 7,  minRequiredLevel: 80,  image: 'img/items/runes/intelligence2.png', description: '+50 Intelligence sur n\'importe quel slot (forge exotique).' }
item.runeTransIntelL  = { id: 'runeTransIntelL',  type: 'rune', transcendance: true, name: 'Rune Trans Intel+100', stat: 'intelligence', value: 100, levelCost: 12, minRequiredLevel: 150, image: 'img/items/runes/intelligence3.png', description: '+100 Intelligence sur n\'importe quel slot (forge exotique).' }
item.runeTransChanceS = { id: 'runeTransChanceS', type: 'rune', transcendance: true, name: 'Rune Trans Chance+20',  stat: 'chance',      value: 20,  levelCost: 3,  minRequiredLevel: 0,   image: 'img/items/runes/chance1.png',       description: '+20 Chance sur n\'importe quel slot (forge exotique).' }
item.runeTransChanceM = { id: 'runeTransChanceM', type: 'rune', transcendance: true, name: 'Rune Trans Chance+50',  stat: 'chance',      value: 50,  levelCost: 7,  minRequiredLevel: 80,  image: 'img/items/runes/chance2.png',       description: '+50 Chance sur n\'importe quel slot (forge exotique).' }
item.runeTransChanceL = { id: 'runeTransChanceL', type: 'rune', transcendance: true, name: 'Rune Trans Chance+100', stat: 'chance',      value: 100, levelCost: 12, minRequiredLevel: 150, image: 'img/items/runes/chance3.png',       description: '+100 Chance sur n\'importe quel slot (forge exotique).' }
item.runeTransAgiS    = { id: 'runeTransAgiS',    type: 'rune', transcendance: true, name: 'Rune Trans Agi+20',    stat: 'agilite',     value: 20,  levelCost: 3,  minRequiredLevel: 0,   image: 'img/items/runes/agilite1.png',      description: '+20 Agilite sur n\'importe quel slot (forge exotique).' }
item.runeTransAgiM    = { id: 'runeTransAgiM',    type: 'rune', transcendance: true, name: 'Rune Trans Agi+50',    stat: 'agilite',     value: 50,  levelCost: 7,  minRequiredLevel: 80,  image: 'img/items/runes/agilite2.png',      description: '+50 Agilite sur n\'importe quel slot (forge exotique).' }
item.runeTransAgiL    = { id: 'runeTransAgiL',    type: 'rune', transcendance: true, name: 'Rune Trans Agi+100',   stat: 'agilite',     value: 100, levelCost: 12, minRequiredLevel: 150, image: 'img/items/runes/agilite3.png',      description: '+100 Agilite sur n\'importe quel slot (forge exotique).' }
item.runeTransSpdS   = { id: 'runeTransSpdS',   type: 'rune', transcendance: true, name: 'Rune Trans Vit+3',       stat: 'spd',               value: 3,   levelCost: 4,  minRequiredLevel: 0,   image: 'img/items/runes/vitesse1.png',               description: '+3 Vit sur n\'importe quel slot (forge exotique).' }
item.runeTransSpdM   = { id: 'runeTransSpdM',   type: 'rune', transcendance: true, name: 'Rune Trans Vit+6',       stat: 'spd',               value: 6,   levelCost: 8,  minRequiredLevel: 80,  image: 'img/items/runes/vitesse2.png',               description: '+6 Vit sur n\'importe quel slot (forge exotique).' }
item.runeTransSpdL   = { id: 'runeTransSpdL',   type: 'rune', transcendance: true, name: 'Rune Trans Vit+10',      stat: 'spd',               value: 10,  levelCost: 12, minRequiredLevel: 150, image: 'img/items/runes/vitesse3.png',               description: '+10 Vit sur n\'importe quel slot (forge exotique).' }
item.runeTransFlatDmgS = { id: 'runeTransFlatDmgS', type: 'rune', transcendance: true, name: 'Rune Trans Dégâts+5',  stat: 'flatDamage',      value: 5,   levelCost: 3,  minRequiredLevel: 0,   image: 'img/items/runes/flatDamage1.png',             description: '+5 Dég.fixes sur n\'importe quel slot (forge exotique).' }
item.runeTransFlatDmgM = { id: 'runeTransFlatDmgM', type: 'rune', transcendance: true, name: 'Rune Trans Dégâts+15', stat: 'flatDamage',      value: 15,  levelCost: 7,  minRequiredLevel: 80,  image: 'img/items/runes/flatDamage2.png',             description: '+15 Dég.fixes sur n\'importe quel slot (forge exotique).' }
item.runeTransFlatDmgL = { id: 'runeTransFlatDmgL', type: 'rune', transcendance: true, name: 'Rune Trans Dégâts+40', stat: 'flatDamage',      value: 40,  levelCost: 12, minRequiredLevel: 150, image: 'img/items/runes/flatDamage3.png',             description: '+40 Dég.fixes sur n\'importe quel slot (forge exotique).' }
item.runeTransCritS  = { id: 'runeTransCritS',  type: 'rune', transcendance: true, name: 'Rune Trans Crit+2%',     stat: 'critChance',        value: 2,   levelCost: 4,  minRequiredLevel: 0,   image: 'img/items/runes/pourcent_crit1.png',         description: '+2% Crit sur n\'importe quel slot (forge exotique).' }
item.runeTransCritM  = { id: 'runeTransCritM',  type: 'rune', transcendance: true, name: 'Rune Trans Crit+4%',     stat: 'critChance',        value: 4,   levelCost: 7,  minRequiredLevel: 80,  image: 'img/items/runes/pourcent_crit2.png',         description: '+4% Crit sur n\'importe quel slot (forge exotique).' }
item.runeTransCritL  = { id: 'runeTransCritL',  type: 'rune', transcendance: true, name: 'Rune Trans Crit+6%',     stat: 'critChance',        value: 6,   levelCost: 12, minRequiredLevel: 150, image: 'img/items/runes/pourcent_crit3.png',         description: '+6% Crit sur n\'importe quel slot (forge exotique).' }
item.runeTransCritDmgS = { id: 'runeTransCritDmgS', type: 'rune', transcendance: true, name: 'Rune Trans DégCrit+5%',  stat: 'critDamagePct', value: 5,   levelCost: 9,  minRequiredLevel: 80,   image: 'img/items/runes/dommage_crit1.png',          description: '+5% Dég.Crit sur n\'importe quel slot (forge exotique).' }
item.runeTransCritDmgM = { id: 'runeTransCritDmgM', type: 'rune', transcendance: true, name: 'Rune Trans DégCrit+10%', stat: 'critDamagePct', value: 10,  levelCost: 12, minRequiredLevel: 150,  image: 'img/items/runes/dommage_crit2.png',          description: '+10% Dég.Crit sur n\'importe quel slot (forge exotique).' }
item.runeTransFinalDmgS = { id: 'runeTransFinalDmgS', type: 'rune', transcendance: true, name: 'Rune Trans DégFin+2%',  stat: 'finalDamagePct', value: 2,  levelCost: 9,  minRequiredLevel: 80,   image: 'img/items/runes/dommage_finaux1.png',        description: '+2% Dég.finaux sur n\'importe quel slot (forge exotique).' }
item.runeTransFinalDmgM = { id: 'runeTransFinalDmgM', type: 'rune', transcendance: true, name: 'Rune Trans DégFin+5%',  stat: 'finalDamagePct', value: 5,  levelCost: 12, minRequiredLevel: 150,  image: 'img/items/runes/dommage_finaux2.png',        description: '+5% Dég.finaux sur n\'importe quel slot (forge exotique).' }
item.runeTransSpellDmgS = { id: 'runeTransSpellDmgS', type: 'rune', transcendance: true, name: 'Rune Trans DégSort+2%',  stat: 'spellDamagePct', value: 2,  levelCost: 9,  minRequiredLevel: 80,   image: 'img/items/runes/SpellDamage1.png',           description: '+2% Dég.sorts sur n\'importe quel slot (forge exotique).' }
item.runeTransSpellDmgM = { id: 'runeTransSpellDmgM', type: 'rune', transcendance: true, name: 'Rune Trans DégSort+5%',  stat: 'spellDamagePct', value: 5,  levelCost: 12, minRequiredLevel: 150,  image: 'img/items/runes/SpellDamage2.png',           description: '+5% Dég.sorts sur n\'importe quel slot (forge exotique).' }
item.runeTransDamRedS   = { id: 'runeTransDamRedS',   type: 'rune', transcendance: true, name: 'Rune Trans Réd+2%',      stat: 'damageReductionPct', value: 2,  levelCost: 9, minRequiredLevel: 80,   image: 'img/items/runes/reduc_dommage_finaux1.png', description: '+2% Réd.dégâts sur n\'importe quel slot (forge exotique).' }
item.runeTransDamRedM   = { id: 'runeTransDamRedM',   type: 'rune', transcendance: true, name: 'Rune Trans Réd+5%',      stat: 'damageReductionPct', value: 5,  levelCost: 12, minRequiredLevel: 150,  image: 'img/items/runes/reduc_dommage_finaux2.png', description: '+5% Réd.dégâts sur n\'importe quel slot (forge exotique).' }
item.runeTransDropRateS = { id: 'runeTransDropRateS', type: 'rune', transcendance: true, name: 'Rune Trans Drop+1',  stat: 'dropRate', value: 1,  levelCost: 7,  minRequiredLevel: 80,  image: 'img/items/runes/dropRate1.png', description: '+1 Drop sur n\'importe quel slot (forge exotique).' }
item.runeTransDropRateM = { id: 'runeTransDropRateM', type: 'rune', transcendance: true, name: 'Rune Trans Drop+3',  stat: 'dropRate', value: 3,  levelCost: 12, minRequiredLevel: 150, image: 'img/items/runes/dropRate2.png', description: '+3 Drop sur n\'importe quel slot (forge exotique).' }
item.runeTransFireResS   = { id: 'runeTransFireResS',   type: 'rune', transcendance: true, name: 'Rune Trans Feu+2%',    stat: 'res.feu',    value: 2, levelCost: 9, minRequiredLevel: 80, image: 'img/items/runes/res_feu2.png',    description: '+2% Rés.Feu sur n\'importe quel slot (forge exotique).' }
item.runeTransWaterResS  = { id: 'runeTransWaterResS',  type: 'rune', transcendance: true, name: 'Rune Trans Eau+2%',    stat: 'res.eau',    value: 2, levelCost: 9, minRequiredLevel: 80, image: 'img/items/runes/res_eau2.png',    description: '+2% Rés.Eau sur n\'importe quel slot (forge exotique).' }
item.runeTransEarthResS  = { id: 'runeTransEarthResS',  type: 'rune', transcendance: true, name: 'Rune Trans Terre+2%',  stat: 'res.terre',   value: 2, levelCost: 9, minRequiredLevel: 80, image: 'img/items/runes/res_terre2.png',  description: '+2% Rés.Terre sur n\'importe quel slot (forge exotique).' }
item.runeTransAirResS    = { id: 'runeTransAirResS',    type: 'rune', transcendance: true, name: 'Rune Trans Air+2%',    stat: 'res.air',     value: 2, levelCost: 9, minRequiredLevel: 80, image: 'img/items/runes/res_air2.png',    description: '+2% Rés.Air sur n\'importe quel slot (forge exotique).' }
item.runeTransNeutralResS= { id: 'runeTransNeutralResS', type: 'rune', transcendance: true, name: 'Rune Trans Neutre+2%', stat: 'res.neutre', value: 2, levelCost: 9, minRequiredLevel: 80, image: 'img/items/runes/res_neutre2.png', description: '+2% Rés.Neutre sur n\'importe quel slot (forge exotique).' }
item.runeTransFireResM   = { id: 'runeTransFireResM',   type: 'rune', transcendance: true, name: 'Rune Trans Feu+4%',    stat: 'res.feu',    value: 4, levelCost: 12, minRequiredLevel: 150, image: 'img/items/runes/res_feu2.png',    description: '+4% Rés.Feu sur n\'importe quel slot (forge exotique).' }
item.runeTransWaterResM  = { id: 'runeTransWaterResM',  type: 'rune', transcendance: true, name: 'Rune Trans Eau+4%',    stat: 'res.eau',    value: 4, levelCost: 12, minRequiredLevel: 150, image: 'img/items/runes/res_eau2.png',    description: '+4% Rés.Eau sur n\'importe quel slot (forge exotique).' }
item.runeTransEarthResM  = { id: 'runeTransEarthResM',  type: 'rune', transcendance: true, name: 'Rune Trans Terre+4%',  stat: 'res.terre',   value: 4, levelCost: 12, minRequiredLevel: 150, image: 'img/items/runes/res_terre2.png',  description: '+4% Rés.Terre sur n\'importe quel slot (forge exotique).' }
item.runeTransAirResM    = { id: 'runeTransAirResM',    type: 'rune', transcendance: true, name: 'Rune Trans Air+4%',    stat: 'res.air',     value: 4, levelCost: 12, minRequiredLevel: 150, image: 'img/items/runes/res_air2.png',    description: '+4% Rés.Air sur n\'importe quel slot (forge exotique).' }
item.runeTransNeutralResM= { id: 'runeTransNeutralResM', type: 'rune', transcendance: true, name: 'Rune Trans Neutre+4%', stat: 'res.neutre', value: 4, levelCost: 12, minRequiredLevel: 150, image: 'img/items/runes/res_neutre2.png', description: '+4% Rés.Neutre sur n\'importe quel slot (forge exotique).' }

// #endregion


