// diversDictionary.js — Objets non-équipements DofusChill
// Étend l'objet `item` défini dans itemDictionary.js

// ────────────────────────────────────────────────────────────────────────
// #region objets divers ──────────────────────────────────────────────────
item.pierreDame = {
    id: 'pierreDame',
    name: "Pierre d'âme",
    image: 'img/items/objets_bonus/Ame.png',
    type: 'resource',
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
    description: "Caisse d'équipement récupéré sur les monstres tués au combat. Elle renferme un objet magique."
}
item.piloteAutomatique = {
    id: 'piloteAutomatique',
    name: 'Pilote Automatique',
    image: 'img/items/divers/piloteAutomatique.png',
    type: 'resource',
    description: "Votre fidèle dragodinde vous ramène automatiquement de l'infirmerie jusqu'à la zone de combat."
}
// #endregion

// ────────────────────────────────────────────────────────────────────────
// #region ─────────────────── CLES DE DONJONS ────────────────────────────
 

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
item.runeHpS = { 
    id: 'runeHpS', 
    type: 'rune', 
    name: 'Rune PV+20',   
    stat: 'maxHp', 
    value: 20,  
    levelCost: 3,  
    minRequiredLevel: 0,   
    fusionCost: 5,  
    image: 'img/items/runes/rune_hp.png',    
    description: '+20 PV sur un slot PV existant.' 
}
item.runeHpM = { 
    id: 'runeHpM', 
    type: 'rune', 
    name: 'Rune PV+60',   
    stat: 'maxHp', 
    value: 60,  
    levelCost: 7,  
    minRequiredLevel: 80,  
    fusionCost: 7,  
    image: 'img/items/runes/rune_hp.png',    
    description: '+60 PV sur un slot PV existant (item requis niv.80+).' 
}
item.runeHpL = { 
    id: 'runeHpL', 
    type: 'rune', 
    name: 'Rune PV+150',  
    stat: 'maxHp', 
    value: 150, 
    levelCost: 12, 
    minRequiredLevel: 150, 
    fusionCost: 10, 
    image: 'img/items/runes/rune_hp.png',    
    description: '+150 PV sur un slot PV existant (item requis niv.150+).' 
}
// ── ATK ────────────────────────────────────────────────────────────────────────
item.runeAtkS = { 
    id: 'runeAtkS', 
    type: 'rune', 
    name: 'Rune ATK+15',  
    stat: 'atk', 
    value: 15,  
    levelCost: 3,  
    minRequiredLevel: 0,   
    fusionCost: 5,  
    image: 'img/items/runes/rune_atk.png',  
    description: '+15 ATK sur un slot ATK existant.' 
}
item.runeAtkM = { 
    id: 'runeAtkM', 
    type: 'rune', 
    name: 'Rune ATK+50',  
    stat: 'atk', 
    value: 50,  
    levelCost: 7,  
    minRequiredLevel: 80,  
    fusionCost: 7,  
    image: 'img/items/runes/rune_atk.png',  
    description: '+50 ATK sur un slot ATK existant (item requis niv.80+).' 
}
item.runeAtkL = { 
    id: 'runeAtkL', 
    type: 'rune', 
    name: 'Rune ATK+130', 
    stat: 'atk', 
    value: 130, 
    levelCost: 12, 
    minRequiredLevel: 150, 
    fusionCost: 10, 
    image: 'img/items/runes/rune_atk.png',  
    description: '+130 ATK sur un slot ATK existant (item requis niv.150+).' 
}
// ── Vitesse ────────────────────────────────────────────────────────────────────
item.runeSpdS = { 
    id: 'runeSpdS', 
    type: 'rune', 
    name: 'Rune Vit+5',  
    stat: 'spd', 
    value: 5,  
    levelCost: 4, 
    minRequiredLevel: 0,   
    fusionCost: 5,  
    image: 'img/items/runes/rune_spd.png',   
    description: '+5 Vit sur un slot Vitesse existant.' 
}
item.runeSpdM = { 
    id: 'runeSpdM', 
    type: 'rune', 
    name: 'Rune Vit+15', 
    stat: 'spd', 
    value: 15, 
    levelCost: 8, 
    minRequiredLevel: 80,  
    fusionCost: 7,  
    image: 'img/items/runes/rune_spd.png',   
    description: '+15 Vit sur un slot Vitesse existant (item requis niv.80+).' 
}
// ── Dégâts fixes ───────────────────────────────────────────────────────────────
item.runeFlatDmgS = { 
    id: 'runeFlatDmgS', 
    type: 'rune', 
    name: 'Rune Dégâts+5',  
    stat: 'flatDamage', 
    value: 5,  
    levelCost: 3, 
    minRequiredLevel: 0,   
    fusionCost: 5,  
    image: 'img/items/runes/rune_dmg.png',  
    description: '+5 Dég.fixes sur un slot Dégâts fixes existant.' 
}
item.runeFlatDmgM = { 
    id: 'runeFlatDmgM', 
    type: 'rune', 
    name: 'Rune Dégâts+15', 
    stat: 'flatDamage', 
    value: 15, 
    levelCost: 7, 
    minRequiredLevel: 80,  
    fusionCost: 7,  
    image: 'img/items/runes/rune_dmg.png',  
    description: '+15 Dég.fixes sur un slot Dégâts fixes existant (item requis niv.80+).' 
}
// ── Critique ───────────────────────────────────────────────────────────────────
item.runeCritS = { 
    id: 'runeCritS',    
    type: 'rune', 
    name: 'Rune Crit+5%',     
    stat: 'critChance',    
    value: 5,  
    levelCost: 4, 
    minRequiredLevel: 0, 
    fusionCost: 5, 
    image: 'img/items/runes/rune_crit.png', 
    description: '+5% Crit sur un slot Chance Crit existant.' 
}
item.runeCritDmgS = { 
    id: 'runeCritDmgS', 
    type: 'rune', 
    name: 'Rune DégCrit+10%', 
    stat: 'critDamagePct', 
    value: 10, 
    levelCost: 5, 
    minRequiredLevel: 0, 
    fusionCost: 5, 
    image: 'img/items/runes/rune_crit.png', 
    description: '+10% Dég.Crit sur un slot Dégâts Crit existant.' 
}
// ── Dégâts % ───────────────────────────────────────────────────────────────────
item.runeFinalDmgS = { 
    id: 'runeFinalDmgS', 
    type: 'rune', 
    name: 'Rune DégFin+7%',  
    stat: 'finalDamagePct',  
    value: 7, 
    levelCost: 6, 
    minRequiredLevel: 0, 
    fusionCost: 5, 
    image: 'img/items/runes/rune_final.png', 
    description: '+7% Dég.finaux sur un slot Dégâts finaux existant.' 
}
item.runeSpellDmgS = { 
    id: 'runeSpellDmgS', 
    type: 'rune', 
    name: 'Rune DégSort+8%', 
    stat: 'spellDamagePct',  
    value: 8, 
    levelCost: 5, 
    minRequiredLevel: 0, 
    fusionCost: 5, 
    image: 'img/items/runes/rune_spell.png', 
    description: '+8% Dég.sorts sur un slot Dégâts sorts existant.' 
}
// ── Défensif ───────────────────────────────────────────────────────────────────
item.runeDamRedS = { 
    id: 'runeDamRedS', 
    type: 'rune', 
    name: 'Rune Réd+5%', 
    stat: 'damageReductionPct', 
    value: 5, 
    levelCost: 5, 
    minRequiredLevel: 0, 
    fusionCost: 5, 
    image: 'img/items/runes/rune_def.png', 
    description: '+5% Réd.dégâts sur un slot Réduction existant.' 
}
// ── Résistances ────────────────────────────────────────────────────────────────
item.runeFireResS = { 
    id: 'runeFireResS',    
    type: 'rune', 
    name: 'Rune Feu+8%',    
    stat: 'res.feu',    
    value: 8, 
    levelCost: 4, 
    minRequiredLevel: 0, 
    fusionCost: 5, 
    image: 'img/items/runes/rune_res.png', 
    description: '+8% Rés.Feu sur un slot Rés.Feu existant.' 
}
item.runeWaterResS = { 
    id: 'runeWaterResS',   
    type: 'rune', 
    name: 'Rune Eau+8%',    
    stat: 'res.eau',   
    value: 8, 
    levelCost: 4, 
    minRequiredLevel: 0, 
    fusionCost: 5, 
    image: 'img/items/runes/rune_res.png', 
    description: '+8% Rés.Eau sur un slot Rés.Eau existant.' 
}
item.runeEarthResS = { 
    id: 'runeEarthResS',   
    type: 'rune', 
    name: 'Rune Terre+8%',  
    stat: 'res.terre',   
    value: 8, 
    levelCost: 4, 
    minRequiredLevel: 0, 
    fusionCost: 5, 
    image: 'img/items/runes/rune_res.png', 
    description: '+8% Rés.Terre sur un slot Rés.Terre existant.' 
}
item.runeAirResS = { 
    id: 'runeAirResS',     
    type: 'rune', 
    name: 'Rune Air+8%',    
    stat: 'res.air',     
    value: 8, 
    levelCost: 4, 
    minRequiredLevel: 0, 
    fusionCost: 5, 
    image: 'img/items/runes/rune_res.png', 
    description: '+8% Rés.Air sur un slot Rés.Air existant.' 
}
item.runeNeutralResS = { 
    id: 'runeNeutralResS', 
    type: 'rune', 
    name: 'Rune Neutre+8%', 
    stat: 'res.neutre', 
    value: 8, 
    levelCost: 4, 
    minRequiredLevel: 0, 
    fusionCost: 5, 
    image: 'img/items/runes/rune_res.png', 
    description: '+8% Rés.Neutre sur un slot Rés.Neutre existant.' 
}

// ── Runes de Transcendance ─────────────────────────────────────────────────────
// Mêmes stats que les runes normales, mais s'appliquent sur N'IMPORTE quel slot
// (même si la stat n'est pas présente sur l'item — forge exotique).
// Obtenues en fusionnant des runes normales dans l'onglet ⚗ Fusion.
item.runeTransHpS = { 
    id: 'runeTransHpS',      
    type: 'rune', 
    transcendance: true, 
    name: 'Rune Trans PV+20',       
    stat: 'maxHp',             
    value: 20,  
    levelCost: 3,  
    minRequiredLevel: 0,   
    image: 'img/items/runes/rune_trans.png', 
    description: '+20 PV sur n\'importe quel slot (forge exotique).' 
}
item.runeTransHpM = { 
    id: 'runeTransHpM',      
    type: 'rune', 
    transcendance: true, 
    name: 'Rune Trans PV+60',       
    stat: 'maxHp',             
    value: 60,  
    levelCost: 7,  
    minRequiredLevel: 80,  
    image: 'img/items/runes/rune_trans.png', 
    description: '+60 PV sur n\'importe quel slot (forge exotique).' 
}
item.runeTransHpL = { 
    id: 'runeTransHpL',      
    type: 'rune', 
    transcendance: true, 
    name: 'Rune Trans PV+150',      
    stat: 'maxHp',             
    value: 150, 
    levelCost: 12, 
    minRequiredLevel: 150, 
    image: 'img/items/runes/rune_trans.png', 
    description: '+150 PV sur n\'importe quel slot (forge exotique).' 
}
item.runeTransAtkS = { 
    id: 'runeTransAtkS',     
    type: 'rune', 
    transcendance: true, 
    name: 'Rune Trans ATK+15',      
    stat: 'atk',               
    value: 15,  
    levelCost: 3,  
    minRequiredLevel: 0,   
    image: 'img/items/runes/rune_trans.png', 
    description: '+15 ATK sur n\'importe quel slot (forge exotique).' 
}
item.runeTransAtkM = { 
    id: 'runeTransAtkM',     
    type: 'rune', 
    transcendance: true, 
    name: 'Rune Trans ATK+50',      
    stat: 'atk',               
    value: 50,  
    levelCost: 7,  
    minRequiredLevel: 80,  
    image: 'img/items/runes/rune_trans.png', 
    description: '+50 ATK sur n\'importe quel slot (forge exotique).' 
}
item.runeTransAtkL = { 
    id: 'runeTransAtkL',     
    type: 'rune', 
    transcendance: true, 
    name: 'Rune Trans ATK+130',     
    stat: 'atk',               
    value: 130, 
    levelCost: 12, 
    minRequiredLevel: 150, 
    image: 'img/items/runes/rune_trans.png', 
    description: '+130 ATK sur n\'importe quel slot (forge exotique).' 
}
item.runeTransSpdS = { 
    id: 'runeTransSpdS',     
    type: 'rune', 
    transcendance: true, 
    name: 'Rune Trans Vit+5',       
    stat: 'spd',               
    value: 5,   
    levelCost: 4,  
    minRequiredLevel: 0,   
    image: 'img/items/runes/rune_trans.png', 
    description: '+5 Vit sur n\'importe quel slot (forge exotique).' 
}
item.runeTransSpdM = { 
    id: 'runeTransSpdM',     
    type: 'rune', 
    transcendance: true, 
    name: 'Rune Trans Vit+15',      
    stat: 'spd',               
    value: 15,  
    levelCost: 8,  
    minRequiredLevel: 80,  
    image: 'img/items/runes/rune_trans.png', 
    description: '+15 Vit sur n\'importe quel slot (forge exotique).' 
}
item.runeTransFlatDmgS = { 
    id: 'runeTransFlatDmgS', 
    type: 'rune', 
    transcendance: true, 
    name: 'Rune Trans Dégâts+5',    
    stat: 'flatDamage',        
    value: 5,   
    levelCost: 3,  
    minRequiredLevel: 0,   
    image: 'img/items/runes/rune_trans.png', 
    description: '+5 Dég.fixes sur n\'importe quel slot (forge exotique).' 
}
item.runeTransFlatDmgM = { 
    id: 'runeTransFlatDmgM', 
    type: 'rune', 
    transcendance: true, 
    name: 'Rune Trans Dégâts+15',   
    stat: 'flatDamage',        
    value: 15,  
    levelCost: 7,  
    minRequiredLevel: 80,  
    image: 'img/items/runes/rune_trans.png', 
    description: '+15 Dég.fixes sur n\'importe quel slot (forge exotique).' 
}
item.runeTransCritS = { 
    id: 'runeTransCritS',    
    type: 'rune', 
    transcendance: true, 
    name: 'Rune Trans Crit+5%',     
    stat: 'critChance',        
    value: 5,   
    levelCost: 4,  
    minRequiredLevel: 0,   
    image: 'img/items/runes/rune_trans.png', 
    description: '+5% Crit sur n\'importe quel slot (forge exotique).' 
}
item.runeTransCritDmgS = { 
    id: 'runeTransCritDmgS', 
    type: 'rune', 
    transcendance: true, 
    name: 'Rune Trans DégCrit+10%', 
    stat: 'critDamagePct',     
    value: 10,  
    levelCost: 5,  
    minRequiredLevel: 0,   
    image: 'img/items/runes/rune_trans.png', 
    description: '+10% Dég.Crit sur n\'importe quel slot (forge exotique).' 
}
item.runeTransFinalDmgS = { 
    id: 'runeTransFinalDmgS',  
    type: 'rune', 
    transcendance: true, 
    name: 'Rune Trans DégFin+7%',  
    stat: 'finalDamagePct',  
    value: 7,  
    levelCost: 6,  
    minRequiredLevel: 0,   
    image: 'img/items/runes/rune_trans.png', 
    description: '+7% Dég.finaux sur n\'importe quel slot (forge exotique).' 
}
item.runeTransSpellDmgS = { 
    id: 'runeTransSpellDmgS',  
    type: 'rune', 
    transcendance: true, 
    name: 'Rune Trans DégSort+8%', 
    stat: 'spellDamagePct',  
    value: 8,  
    levelCost: 5,  
    minRequiredLevel: 0,   
    image: 'img/items/runes/rune_trans.png', 
    description: '+8% Dég.sorts sur n\'importe quel slot (forge exotique).' 
}
item.runeTransDamRedS = { 
    id: 'runeTransDamRedS',    
    type: 'rune', 
    transcendance: true, 
    name: 'Rune Trans Réd+5%',     
    stat: 'damageReductionPct', 
    value: 5, 
    levelCost: 5,  
    minRequiredLevel: 0,   
    image: 'img/items/runes/rune_trans.png', 
    description: '+5% Réd.dégâts sur n\'importe quel slot (forge exotique).' 
}
item.runeTransFireResS = { 
    id: 'runeTransFireResS',   
    type: 'rune', 
    transcendance: true, 
    name: 'Rune Trans Feu+8%',     
    stat: 'res.feu',      
    value: 8,  
    levelCost: 4,  
    minRequiredLevel: 0,   
    image: 'img/items/runes/rune_trans.png', 
    description: '+8% Rés.Feu sur n\'importe quel slot (forge exotique).' 
}
item.runeTransWaterResS = { 
    id: 'runeTransWaterResS',  
    type: 'rune', 
    transcendance: true, 
    name: 'Rune Trans Eau+8%',     
    stat: 'res.eau',     
    value: 8,  
    levelCost: 4,  
    minRequiredLevel: 0,   
    image: 'img/items/runes/rune_trans.png', 
    description: '+8% Rés.Eau sur n\'importe quel slot (forge exotique).' 
}
item.runeTransEarthResS = { 
    id: 'runeTransEarthResS',  
    type: 'rune', 
    transcendance: true, 
    name: 'Rune Trans Terre+8%',   
    stat: 'res.terre',     
    value: 8,  
    levelCost: 4,  
    minRequiredLevel: 0,   
    image: 'img/items/runes/rune_trans.png', 
    description: '+8% Rés.Terre sur n\'importe quel slot (forge exotique).' 
}
item.runeTransAirResS = { 
    id: 'runeTransAirResS',    
    type: 'rune', 
    transcendance: true, 
    name: 'Rune Trans Air+8%',     
    stat: 'res.air',       
    value: 8,  
    levelCost: 4,  
    minRequiredLevel: 0,   
    image: 'img/items/runes/rune_trans.png', 
    description: '+8% Rés.Air sur n\'importe quel slot (forge exotique).' 
}
item.runeTransNeutralResS = { 
    id: 'runeTransNeutralResS',
    type: 'rune', 
    transcendance: true, 
    name: 'Rune Trans Neutre+8%',  
    stat: 'res.neutre',   
    value: 8,  
    levelCost: 4,  
    minRequiredLevel: 0,   
    image: 'img/items/runes/rune_trans.png', 
    description: '+8% Rés.Neutre sur n\'importe quel slot (forge exotique).' 
}
// #endregion


