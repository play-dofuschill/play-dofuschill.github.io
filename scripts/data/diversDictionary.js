// diversDictionary.js — Objets non-équipements DofusChill
// Étend l'objet `item` défini dans itemDictionary.js

item.pierreDame = {
    id: 'pierreDame',
    name: 'Pierre Dame',
    image: 'img/items/objets_bonus/Ame.png',
    type: 'resource',
    description: "Pierre magique renfermant l'âme des monstres rencontrés."
}

item.caisseEquipement = {
    id: 'caisseEquipement',
    name: "Caisse d'équipement",
    image: 'img/items/objets_bonus/caisseEquipement.png',
    type: 'resource',
    description: "Caisse d'équipement récupéré sur les monstres tués au combat. Elle renferme un objet magique."
}

item.piloteAutomatique = {
    id: 'piloteAutomatique',
    name: 'Pilote Automatique',
    image: 'img/items/divers/piloteAutomatique.png',
    type: 'resource',
    description: "Votre fidèle dragodinde vous ramène automatiquement de l'infirmerie jusqu'à la zone de combat."
}


// ────────────────────────────────────────────────────────────────────────
// ─────────────────────────── CLES DE DONJONS ────────────────────────────
// ────────────────────────────────────────────────────────────────────────

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