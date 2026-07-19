// scripts/data/bossUltimeDictionary.js — Dragons Boss Ultime (combat automatique standard)
//
// Le dragon est un monstre standard (schéma `monsters[...]` + `move[...]`, comme les boss
// Avis de Recherche dans wantedDictionary.js) : il combat l'équipe principale via le moteur
// de combat.js, pas de moteur dédié. BossUltimeDragons ne porte que les métadonnées qui ne
// rentrent pas dans `monsters[...]` : lore, récompense, et la phase 2 (changement de stats/
// sorts à bas PV, appliqué en direct sur combat.enemy par _checkBossUltimePhase()).

// ── Sorts d'Ignemikhal (étend l'objet `move`) ──────────────────────────────────

move['Boss_Ultime_ignemikhal_embrasement'] = {
    id:          'Boss_Ultime_ignemikhal_embrasement',
    name:        'Embrasement',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'feu', damage: { min: 25, max: 40 }, target: 'enemy' },
              { type: 'dot',    element: 'feu', value: 20, duration: 2, label: 'Brûlure', target: 'enemy' }]
}
move['Boss_Ultime_ignemikhal_eruption'] = {
    id:          'Boss_Ultime_ignemikhal_eruption',
    name:        'Éruption',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'feu', damage: { min: 35, max: 50 }, target: 'enemy' }]
}
move['Boss_Ultime_ignemikhal_souffle_ardent'] = {
    id:          'Boss_Ultime_ignemikhal_souffle_ardent',
    name:        'Souffle Ardent',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'feu', damage: { min: 60, max: 80 }, target: 'enemy' },
              { type: 'debuff', stat: 'atk',    value: 300,  duration: 2,  target: 'enemy' }]
}
move['Boss_Ultime_ignemikhal_flammes_eternelles'] = {
    id:          'Boss_Ultime_ignemikhal_flammes_eternelles',
    name:        'Flammes Éternelles',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'feu', damage: { min: 35, max: 50 }, target: 'enemy' },
              { type: 'dot',    element: 'feu', value: 40, duration: 4, label: 'Embrasement Éternel', target: 'enemy' }]
}
move['Boss_Ultime_ignemikhal_p2_coeur_de_lave'] = {
    id:          'Boss_Ultime_ignemikhal_p2_coeur_de_lave',
    name:        'Cœur de Lave',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'feu', damage: { min: 35, max: 50 }, target: 'enemy' },
              { type: 'dot',    element: 'feu', value: 30, duration: 3, label: 'Brûlure', target: 'enemy' }]
}
move['Boss_Ultime_ignemikhal_p2_apocalypse_solaire'] = {
    id:          'Boss_Ultime_ignemikhal_p2_apocalypse_solaire',
    name:        'Apocalypse Solaire',
    cooldownMs:  3500,
    effects: [{ type: 'damage', element: 'feu', damage: { min: 50, max: 80 }, target: 'enemy' }]
}
move['Boss_Ultime_ignemikhal_p2_nova'] = {
    id:          'Boss_Ultime_ignemikhal_p2_nova',
    name:        'Nova',
    cooldownMs:  3000,
    effects: [{ type: 'damage', element: 'feu',  damage: { min: 50, max: 70 }, target: 'enemy' },
              { type: 'debuff', stat: 'atk',     value: 300, duration: 2, target: 'enemy' },
              { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 2, target: 'enemy' }]
}
move['Boss_Ultime_ignemikhal_p2_renaissance'] = {
    id:          'Boss_Ultime_ignemikhal_p2_renaissance',
    name:        'Renaissance Ardente',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'feu', damage: { min: 20, max: 30 }, target: 'enemy' },
              { type: 'buff',   stat: 'atk',           value: 300, duration: 2, target: 'self' },
              { type: 'buff',   stat: 'finalDamagePct', value: 30,  duration: 2, target: 'self' }]
}

// ── Sorts d'Aguabrial (étend l'objet `move`) ───────────────────────────────────

move['Boss_Ultime_aguabrial_noyade'] = {
    id:          'Boss_Ultime_aguabrial_noyade',
    name:        'Noyade',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'eau', damage: { min: 25, max: 40 }, target: 'enemy' },
              { type: 'dot',    element: 'eau', value: 20, duration: 2, label: 'Noyade', target: 'enemy' }]
}
move['Boss_Ultime_aguabrial_torrent'] = {
    id:          'Boss_Ultime_aguabrial_torrent',
    name:        'Torrent',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'eau', damage: { min: 35, max: 50 }, target: 'enemy' }]
}
move['Boss_Ultime_aguabrial_vague_abyssale'] = {
    id:          'Boss_Ultime_aguabrial_vague_abyssale',
    name:        'Vague Abyssale',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'eau', damage: { min: 60, max: 80 }, target: 'enemy' },
              { type: 'debuff', stat: 'atk',    value: 300, duration: 2, target: 'enemy' }]
}
move['Boss_Ultime_aguabrial_deluge_eternel'] = {
    id:          'Boss_Ultime_aguabrial_deluge_eternel',
    name:        'Déluge Éternel',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'eau', damage: { min: 35, max: 50 }, target: 'enemy' },
              { type: 'dot',    element: 'eau', value: 40, duration: 4, label: 'Inondation Éternelle', target: 'enemy' }]
}
move['Boss_Ultime_aguabrial_p2_pression_abyssale'] = {
    id:          'Boss_Ultime_aguabrial_p2_pression_abyssale',
    name:        'Pression Abyssale',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'eau', damage: { min: 35, max: 50 }, target: 'enemy' },
              { type: 'dot',    element: 'eau', value: 30, duration: 3, label: 'Noyade', target: 'enemy' }]
}
move['Boss_Ultime_aguabrial_p2_tsunami'] = {
    id:          'Boss_Ultime_aguabrial_p2_tsunami',
    name:        'Tsunami',
    cooldownMs:  3500,
    effects: [{ type: 'damage', element: 'eau', damage: { min: 50, max: 80 }, target: 'enemy' }]
}
move['Boss_Ultime_aguabrial_p2_maelstrom'] = {
    id:          'Boss_Ultime_aguabrial_p2_maelstrom',
    name:        'Maelström',
    cooldownMs:  3000,
    effects: [{ type: 'damage', element: 'eau',  damage: { min: 50, max: 70 }, target: 'enemy' },
              { type: 'debuff', stat: 'atk',     value: 300, duration: 2, target: 'enemy' },
              { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 2, target: 'enemy' }]
}
move['Boss_Ultime_aguabrial_p2_metamorphose_aquatique'] = {
    id:          'Boss_Ultime_aguabrial_p2_metamorphose_aquatique',
    name:        'Métamorphose Aquatique',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'eau', damage: { min: 20, max: 30 }, target: 'enemy' },
              { type: 'buff',   stat: 'atk',           value: 300, duration: 2, target: 'self' },
              { type: 'buff',   stat: 'finalDamagePct', value: 30,  duration: 2, target: 'self' }]
}

// ── Sorts de Dardondakal (étend l'objet `move`) ────────────────────────────────

move['Boss_Ultime_dardondakal_neantisation'] = {
    id:          'Boss_Ultime_dardondakal_neantisation',
    name:        'Néantisation',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'neutre', damage: { min: 25, max: 40 }, target: 'enemy' },
              { type: 'dot',    element: 'neutre', value: 20, duration: 2, label: 'Corruption', target: 'enemy' }]
}
move['Boss_Ultime_dardondakal_vide_primordial'] = {
    id:          'Boss_Ultime_dardondakal_vide_primordial',
    name:        'Vide Primordial',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'neutre', damage: { min: 35, max: 50 }, target: 'enemy' }]
}
move['Boss_Ultime_dardondakal_souffle_neant'] = {
    id:          'Boss_Ultime_dardondakal_souffle_neant',
    name:        'Souffle du Néant',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'neutre', damage: { min: 60, max: 80 }, target: 'enemy' },
              { type: 'debuff', stat: 'atk', value: 300, duration: 2, target: 'enemy' }]
}
move['Boss_Ultime_dardondakal_essence_neutre'] = {
    id:          'Boss_Ultime_dardondakal_essence_neutre',
    name:        'Essence Neutre',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'neutre', damage: { min: 35, max: 50 }, target: 'enemy' },
              { type: 'dot',    element: 'neutre', value: 40, duration: 4, label: 'Effritement', target: 'enemy' }]
}
move['Boss_Ultime_dardondakal_p2_annihilation'] = {
    id:          'Boss_Ultime_dardondakal_p2_annihilation',
    name:        'Annihilation',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'neutre', damage: { min: 35, max: 50 }, target: 'enemy' },
              { type: 'dot',    element: 'neutre', value: 30, duration: 3, label: 'Corruption', target: 'enemy' }]
}
move['Boss_Ultime_dardondakal_p2_eclipse_totale'] = {
    id:          'Boss_Ultime_dardondakal_p2_eclipse_totale',
    name:        'Éclipse Totale',
    cooldownMs:  3500,
    effects: [{ type: 'damage', element: 'neutre', damage: { min: 50, max: 80 }, target: 'enemy' }]
}
move['Boss_Ultime_dardondakal_p2_equilibre_brise'] = {
    id:          'Boss_Ultime_dardondakal_p2_equilibre_brise',
    name:        'Équilibre Brisé',
    cooldownMs:  3000,
    effects: [{ type: 'damage', element: 'neutre', damage: { min: 50, max: 70 }, target: 'enemy' },
              { type: 'debuff', stat: 'atk', value: 300, duration: 2, target: 'enemy' },
              { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 2, target: 'enemy' }]
}
move['Boss_Ultime_dardondakal_p2_forme_eternelle'] = {
    id:          'Boss_Ultime_dardondakal_p2_forme_eternelle',
    name:        'Forme Éternelle',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'neutre', damage: { min: 20, max: 30 }, target: 'enemy' },
              { type: 'buff',   stat: 'atk',           value: 300, duration: 2, target: 'self' },
              { type: 'buff',   stat: 'finalDamagePct', value: 30,  duration: 2, target: 'self' }]
}

// ── Sorts de Terrakourial (étend l'objet `move`) ───────────────────────────────

move['Boss_Ultime_terrakourial_seisme'] = {
    id:          'Boss_Ultime_terrakourial_seisme',
    name:        'Séisme',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 25, max: 40 }, target: 'enemy' },
              { type: 'dot',    element: 'terre', value: 20, duration: 2, label: 'Éboulement', target: 'enemy' }]
}
move['Boss_Ultime_terrakourial_faille_terrestre'] = {
    id:          'Boss_Ultime_terrakourial_faille_terrestre',
    name:        'Faille Terrestre',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 35, max: 50 }, target: 'enemy' }]
}
move['Boss_Ultime_terrakourial_souffle_mineral'] = {
    id:          'Boss_Ultime_terrakourial_souffle_mineral',
    name:        'Souffle Minéral',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 60, max: 80 }, target: 'enemy' },
              { type: 'debuff', stat: 'atk', value: 300, duration: 2, target: 'enemy' }]
}
move['Boss_Ultime_terrakourial_tremblement_eternel'] = {
    id:          'Boss_Ultime_terrakourial_tremblement_eternel',
    name:        'Tremblement Éternel',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 35, max: 50 }, target: 'enemy' },
              { type: 'dot',    element: 'terre', value: 40, duration: 4, label: 'Effritement', target: 'enemy' }]
}
move['Boss_Ultime_terrakourial_p2_ecrasement'] = {
    id:          'Boss_Ultime_terrakourial_p2_ecrasement',
    name:        'Écrasement',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 35, max: 50 }, target: 'enemy' },
              { type: 'dot',    element: 'terre', value: 30, duration: 3, label: 'Éboulement', target: 'enemy' }]
}
move['Boss_Ultime_terrakourial_p2_mega_seisme'] = {
    id:          'Boss_Ultime_terrakourial_p2_mega_seisme',
    name:        'Méga-Séisme',
    cooldownMs:  3500,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 50, max: 80 }, target: 'enemy' }]
}
move['Boss_Ultime_terrakourial_p2_golem_draconique'] = {
    id:          'Boss_Ultime_terrakourial_p2_golem_draconique',
    name:        'Golem Draconique',
    cooldownMs:  3000,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 50, max: 70 }, target: 'enemy' },
              { type: 'debuff', stat: 'atk', value: 300, duration: 2, target: 'enemy' },
              { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 2, target: 'enemy' }]
}
move['Boss_Ultime_terrakourial_p2_eveil_tellurique'] = {
    id:          'Boss_Ultime_terrakourial_p2_eveil_tellurique',
    name:        'Éveil Tellurique',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 20, max: 30 }, target: 'enemy' },
              { type: 'buff',   stat: 'atk',           value: 300, duration: 2, target: 'self' },
              { type: 'buff',   stat: 'finalDamagePct', value: 30,  duration: 2, target: 'self' }]
}

// ── Sorts d'Aerafal (étend l'objet `move`) ─────────────────────────────────────

move['Boss_Ultime_aerafal_bourrasque'] = {
    id:          'Boss_Ultime_aerafal_bourrasque',
    name:        'Bourrasque',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'air', damage: { min: 25, max: 40 }, target: 'enemy' },
              { type: 'dot',    element: 'air', value: 20, duration: 2, label: 'Lacération', target: 'enemy' }]
}
move['Boss_Ultime_aerafal_trombe'] = {
    id:          'Boss_Ultime_aerafal_trombe',
    name:        'Trombe',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'air', damage: { min: 35, max: 50 }, target: 'enemy' }]
}
move['Boss_Ultime_aerafal_souffle_venteux'] = {
    id:          'Boss_Ultime_aerafal_souffle_venteux',
    name:        'Souffle Venteux',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'air', damage: { min: 60, max: 80 }, target: 'enemy' },
              { type: 'debuff', stat: 'atk', value: 300, duration: 2, target: 'enemy' }]
}
move['Boss_Ultime_aerafal_tempete_eternelle'] = {
    id:          'Boss_Ultime_aerafal_tempete_eternelle',
    name:        'Tempête Éternelle',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'air', damage: { min: 35, max: 50 }, target: 'enemy' },
              { type: 'dot',    element: 'air', value: 40, duration: 4, label: 'Lacération Éternelle', target: 'enemy' }]
}
move['Boss_Ultime_aerafal_p2_cyclone'] = {
    id:          'Boss_Ultime_aerafal_p2_cyclone',
    name:        'Cyclone',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'air', damage: { min: 35, max: 50 }, target: 'enemy' },
              { type: 'dot',    element: 'air', value: 30, duration: 3, label: 'Lacération', target: 'enemy' }]
}
move['Boss_Ultime_aerafal_p2_furie_des_vents'] = {
    id:          'Boss_Ultime_aerafal_p2_furie_des_vents',
    name:        'Furie des Vents',
    cooldownMs:  3500,
    effects: [{ type: 'damage', element: 'air', damage: { min: 50, max: 80 }, target: 'enemy' }]
}
move['Boss_Ultime_aerafal_p2_tempete_absolue'] = {
    id:          'Boss_Ultime_aerafal_p2_tempete_absolue',
    name:        'Tempête Absolue',
    cooldownMs:  3000,
    effects: [{ type: 'damage', element: 'air', damage: { min: 50, max: 70 }, target: 'enemy' },
              { type: 'debuff', stat: 'atk', value: 300, duration: 2, target: 'enemy' },
              { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 2, target: 'enemy' }]
}
move['Boss_Ultime_aerafal_p2_aile_de_foudre'] = {
    id:          'Boss_Ultime_aerafal_p2_aile_de_foudre',
    name:        'Aile de Foudre',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'air', damage: { min: 20, max: 30 }, target: 'enemy' },
              { type: 'buff',   stat: 'atk',           value: 300, duration: 2, target: 'self' },
              { type: 'buff',   stat: 'finalDamagePct', value: 30,  duration: 2, target: 'self' }]
}

// ── Sorts de Grougalorasalar (étend l'objet `move`) ────────────────────────────

move['Boss_Ultime_grougalorasalar_rugissement_ancestral'] = {
    id:          'Boss_Ultime_grougalorasalar_rugissement_ancestral',
    name:        'Rugissement Ancestral',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'neutre', damage: { min: 30, max: 50 }, target: 'enemy' },
              { type: 'dot',    element: 'neutre', value: 25, duration: 2, label: 'Terreur', target: 'enemy' }]
}
move['Boss_Ultime_grougalorasalar_morsure_primordiale'] = {
    id:          'Boss_Ultime_grougalorasalar_morsure_primordiale',
    name:        'Morsure Primordiale',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'neutre', damage: { min: 40, max: 60 }, target: 'enemy' }]
}
move['Boss_Ultime_grougalorasalar_souffle_millenaire'] = {
    id:          'Boss_Ultime_grougalorasalar_souffle_millenaire',
    name:        'Souffle Millénaire',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'neutre', damage: { min: 70, max: 100 }, target: 'enemy' },
              { type: 'debuff', stat: 'atk', value: 350, duration: 2, target: 'enemy' }]
}
move['Boss_Ultime_grougalorasalar_epoque_oubliee'] = {
    id:          'Boss_Ultime_grougalorasalar_epoque_oubliee',
    name:        'Époque Oubliée',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'neutre', damage: { min: 40, max: 60 }, target: 'enemy' },
              { type: 'dot',    element: 'neutre', value: 50, duration: 4, label: 'Malédiction Ancestrale', target: 'enemy' }]
}
move['Boss_Ultime_grougalorasalar_p2_maitrise_absolue'] = {
    id:          'Boss_Ultime_grougalorasalar_p2_maitrise_absolue',
    name:        'Maîtrise Absolue',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'neutre', damage: { min: 40, max: 60 }, target: 'enemy' },
              { type: 'dot',    element: 'neutre', value: 35, duration: 3, label: 'Terreur', target: 'enemy' }]
}
move['Boss_Ultime_grougalorasalar_p2_chant_dragon'] = {
    id:          'Boss_Ultime_grougalorasalar_p2_chant_dragon',
    name:        'Chant du Dragon',
    cooldownMs:  3500,
    effects: [{ type: 'damage', element: 'neutre', damage: { min: 60, max: 100 }, target: 'enemy' }]
}
move['Boss_Ultime_grougalorasalar_p2_ere_draconique'] = {
    id:          'Boss_Ultime_grougalorasalar_p2_ere_draconique',
    name:        'Ère Draconique',
    cooldownMs:  3000,
    effects: [{ type: 'damage', element: 'neutre', damage: { min: 60, max: 90 }, target: 'enemy' },
              { type: 'debuff', stat: 'atk', value: 350, duration: 2, target: 'enemy' },
              { type: 'debuff', stat: 'damageReductionPct', value: 25, duration: 2, target: 'enemy' }]
}
move['Boss_Ultime_grougalorasalar_p2_incarnation'] = {
    id:          'Boss_Ultime_grougalorasalar_p2_incarnation',
    name:        'Incarnation Primordiale',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'neutre', damage: { min: 25, max: 40 }, target: 'enemy' },
              { type: 'buff',   stat: 'atk',           value: 400, duration: 2, target: 'self' },
              { type: 'buff',   stat: 'finalDamagePct', value: 40,  duration: 2, target: 'self' }]
}

// ── Sorts de Tylezia (étend l'objet `move`) ────────────────────────────────────

move['Boss_Ultime_tylezia_cendres_volantes'] = {
    id:          'Boss_Ultime_tylezia_cendres_volantes',
    name:        'Cendres Volantes',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'air',  damage: { min: 20, max: 35 }, target: 'enemy' },
              { type: 'dot',    element: 'feu',  value: 20, duration: 2, label: 'Brûlure', target: 'enemy' }]
}
move['Boss_Ultime_tylezia_brasier_venteux'] = {
    id:          'Boss_Ultime_tylezia_brasier_venteux',
    name:        'Brasier Venteux',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'feu',  damage: { min: 35, max: 50 }, target: 'enemy' }]
}
move['Boss_Ultime_tylezia_souffle_ardent_aerien'] = {
    id:          'Boss_Ultime_tylezia_souffle_ardent_aerien',
    name:        'Souffle Ardent Aérien',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'air',  damage: { min: 30, max: 45 }, target: 'enemy' },
              { type: 'damage', element: 'feu',  damage: { min: 30, max: 45 }, target: 'enemy' },
              { type: 'debuff', stat: 'atk', value: 300, duration: 2, target: 'enemy' }]
}
move['Boss_Ultime_tylezia_phoenix_eternel'] = {
    id:          'Boss_Ultime_tylezia_phoenix_eternel',
    name:        'Phœnix Éternel',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'feu',  damage: { min: 35, max: 50 }, target: 'enemy' },
              { type: 'dot',    element: 'air',  value: 40, duration: 4, label: 'Tourbillon de Cendres', target: 'enemy' }]
}
move['Boss_Ultime_tylezia_p2_flamme_ouragan'] = {
    id:          'Boss_Ultime_tylezia_p2_flamme_ouragan',
    name:        'Flamme Ouragan',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'feu',  damage: { min: 25, max: 40 }, target: 'enemy' },
              { type: 'dot',    element: 'air',  value: 30, duration: 3, label: 'Lacération de Cendres', target: 'enemy' }]
}
move['Boss_Ultime_tylezia_p2_inferno_aerien'] = {
    id:          'Boss_Ultime_tylezia_p2_inferno_aerien',
    name:        'Inferno Aérien',
    cooldownMs:  3500,
    effects: [{ type: 'damage', element: 'feu',  damage: { min: 30, max: 50 }, target: 'enemy' },
              { type: 'damage', element: 'air',  damage: { min: 25, max: 40 }, target: 'enemy' }]
}
move['Boss_Ultime_tylezia_p2_maelstrom_ardent'] = {
    id:          'Boss_Ultime_tylezia_p2_maelstrom_ardent',
    name:        'Maelström Ardent',
    cooldownMs:  3000,
    effects: [{ type: 'damage', element: 'air',  damage: { min: 30, max: 45 }, target: 'enemy' },
              { type: 'damage', element: 'feu',  damage: { min: 30, max: 45 }, target: 'enemy' },
              { type: 'debuff', stat: 'atk', value: 300, duration: 2, target: 'enemy' },
              { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 2, target: 'enemy' }]
}
move['Boss_Ultime_tylezia_p2_ascension_draconique'] = {
    id:          'Boss_Ultime_tylezia_p2_ascension_draconique',
    name:        'Ascension Draconique',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'feu',  damage: { min: 20, max: 30 }, target: 'enemy' },
              { type: 'buff',   stat: 'atk',           value: 300, duration: 2, target: 'self' },
              { type: 'buff',   stat: 'finalDamagePct', value: 30,  duration: 2, target: 'self' }]
}

// ── Sorts de Rathrosk (étend l'objet `move`) ───────────────────────────────────

move['Boss_Ultime_rathrosk_boue_primordiale'] = {
    id:          'Boss_Ultime_rathrosk_boue_primordiale',
    name:        'Boue Primordiale',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 20, max: 35 }, target: 'enemy' },
              { type: 'dot',    element: 'eau',   value: 20, duration: 2, label: 'Enlisement', target: 'enemy' }]
}
move['Boss_Ultime_rathrosk_glissement_terrestre'] = {
    id:          'Boss_Ultime_rathrosk_glissement_terrestre',
    name:        'Glissement Terrestre',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'eau',   damage: { min: 35, max: 50 }, target: 'enemy' }]
}
move['Boss_Ultime_rathrosk_souffle_boueux'] = {
    id:          'Boss_Ultime_rathrosk_souffle_boueux',
    name:        'Souffle Boueux',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 30, max: 45 }, target: 'enemy' },
              { type: 'damage', element: 'eau',   damage: { min: 30, max: 45 }, target: 'enemy' },
              { type: 'debuff', stat: 'atk', value: 300, duration: 2, target: 'enemy' }]
}
move['Boss_Ultime_rathrosk_raz_de_maree_tellurique'] = {
    id:          'Boss_Ultime_rathrosk_raz_de_maree_tellurique',
    name:        'Raz-de-marée Tellurique',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'eau',   damage: { min: 35, max: 50 }, target: 'enemy' },
              { type: 'dot',    element: 'terre', value: 40, duration: 4, label: 'Avalanche Aquatique', target: 'enemy' }]
}
move['Boss_Ultime_rathrosk_p2_diluvion'] = {
    id:          'Boss_Ultime_rathrosk_p2_diluvion',
    name:        'Diluvion',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'eau',   damage: { min: 25, max: 40 }, target: 'enemy' },
              { type: 'dot',    element: 'terre', value: 30, duration: 3, label: 'Enlisement', target: 'enemy' }]
}
move['Boss_Ultime_rathrosk_p2_torrent_rocheux'] = {
    id:          'Boss_Ultime_rathrosk_p2_torrent_rocheux',
    name:        'Torrent Rocheux',
    cooldownMs:  3500,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 30, max: 50 }, target: 'enemy' },
              { type: 'damage', element: 'eau',   damage: { min: 25, max: 40 }, target: 'enemy' }]
}
move['Boss_Ultime_rathrosk_p2_erosion_draconique'] = {
    id:          'Boss_Ultime_rathrosk_p2_erosion_draconique',
    name:        'Érosion Draconique',
    cooldownMs:  3000,
    effects: [{ type: 'damage', element: 'eau',   damage: { min: 30, max: 45 }, target: 'enemy' },
              { type: 'damage', element: 'terre', damage: { min: 30, max: 45 }, target: 'enemy' },
              { type: 'debuff', stat: 'atk', value: 300, duration: 2, target: 'enemy' },
              { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 2, target: 'enemy' }]
}
move['Boss_Ultime_rathrosk_p2_maree_terrienne'] = {
    id:          'Boss_Ultime_rathrosk_p2_maree_terrienne',
    name:        'Marée Terrienne',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'terre', damage: { min: 20, max: 30 }, target: 'enemy' },
              { type: 'buff',   stat: 'atk',           value: 300, duration: 2, target: 'self' },
              { type: 'buff',   stat: 'finalDamagePct', value: 30,  duration: 2, target: 'self' }]
}

// ── Sorts de Draconiros (étend l'objet `move`) ─────────────────────────────────

move['Boss_Ultime_draconiros_cendre_noire'] = {
    id:          'Boss_Ultime_draconiros_cendre_noire',
    name:        'Cendre Noire',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'neutre', damage: { min: 20, max: 35 }, target: 'enemy' },
              { type: 'dot',    element: 'feu',    value: 20, duration: 2, label: 'Brûlure Sombre', target: 'enemy' }]
}
move['Boss_Ultime_draconiros_flamme_sombre'] = {
    id:          'Boss_Ultime_draconiros_flamme_sombre',
    name:        'Flamme Sombre',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'feu',    damage: { min: 35, max: 50 }, target: 'enemy' }]
}
move['Boss_Ultime_draconiros_souffle_obscur'] = {
    id:          'Boss_Ultime_draconiros_souffle_obscur',
    name:        'Souffle Obscur',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'neutre', damage: { min: 30, max: 45 }, target: 'enemy' },
              { type: 'damage', element: 'feu',    damage: { min: 30, max: 45 }, target: 'enemy' },
              { type: 'debuff', stat: 'atk', value: 300, duration: 2, target: 'enemy' }]
}
move['Boss_Ultime_draconiros_feu_du_neant'] = {
    id:          'Boss_Ultime_draconiros_feu_du_neant',
    name:        'Feu du Néant',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'feu',    damage: { min: 35, max: 50 }, target: 'enemy' },
              { type: 'dot',    element: 'neutre', value: 40, duration: 4, label: 'Corruption Ardente', target: 'enemy' }]
}
move['Boss_Ultime_draconiros_p2_brasier_tenebreux'] = {
    id:          'Boss_Ultime_draconiros_p2_brasier_tenebreux',
    name:        'Brasier Ténébreux',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'feu',    damage: { min: 25, max: 40 }, target: 'enemy' },
              { type: 'dot',    element: 'neutre', value: 30, duration: 3, label: 'Corruption', target: 'enemy' }]
}
move['Boss_Ultime_draconiros_p2_souffle_abyssal'] = {
    id:          'Boss_Ultime_draconiros_p2_souffle_abyssal',
    name:        'Souffle Abyssal',
    cooldownMs:  3500,
    effects: [{ type: 'damage', element: 'neutre', damage: { min: 30, max: 50 }, target: 'enemy' },
              { type: 'damage', element: 'feu',    damage: { min: 25, max: 40 }, target: 'enemy' }]
}
move['Boss_Ultime_draconiros_p2_destruction_draconique'] = {
    id:          'Boss_Ultime_draconiros_p2_destruction_draconique',
    name:        'Destruction Draconique',
    cooldownMs:  3000,
    effects: [{ type: 'damage', element: 'neutre', damage: { min: 30, max: 45 }, target: 'enemy' },
              { type: 'damage', element: 'feu',    damage: { min: 30, max: 45 }, target: 'enemy' },
              { type: 'debuff', stat: 'atk', value: 300, duration: 2, target: 'enemy' },
              { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 2, target: 'enemy' }]
}
move['Boss_Ultime_draconiros_p2_renaissance_sombre'] = {
    id:          'Boss_Ultime_draconiros_p2_renaissance_sombre',
    name:        'Renaissance Sombre',
    cooldownMs:  2500,
    effects: [{ type: 'damage', element: 'feu',    damage: { min: 20, max: 30 }, target: 'enemy' },
              { type: 'buff',   stat: 'atk',           value: 300, duration: 2, target: 'self' },
              { type: 'buff',   stat: 'finalDamagePct', value: 30,  duration: 2, target: 'self' }]
}

// ── Monstres Boss Ultime (étendent l'objet `monsters`) ─────────────────────────
// Niveau 200 = le plus haut niveau du jeu (comme le plus gros boss Wanted, Gargandyas).
// Les stats/sorts ci-dessous sont ceux de la phase 1 ; la phase 2 est appliquée en
// combat par _checkBossUltimePhase() (scripts/engine/bossUltimeEngine.js).

monsters['dragon_ignemikhal'] = {
    id:         'dragon_ignemikhal',
    name:       'Ignemikhal, Dragon de Feu',
    image:      'img/monstres/boss_Ultime/Ignemikhal_p1.png',
    rarity:     'legendaire',
    tier:       'boss',
    fixedLevel: 200,
    bst: { hp: 5000000, atk: 700, spd: 100, res: { neutre: 0, feu: 60, eau: -40, air: 0, terre: 20 } },
    moves: ['Boss_Ultime_ignemikhal_embrasement', 'Boss_Ultime_ignemikhal_eruption', 'Boss_Ultime_ignemikhal_souffle_ardent', 'Boss_Ultime_ignemikhal_flammes_eternelles']
}

monsters['dragon_Aguabrial'] = {
    id:         'dragon_Aguabrial',
    name:       "Aguabrial, Dragon de l'Eau",
    image:      'img/monstres/boss_Ultime/Aguabrial_p1.png',
    rarity:     'legendaire',
    tier:       'boss',
    fixedLevel: 200,
    bst: { hp: 5000000, atk: 700, spd: 100, res: { neutre: 0, feu: -40, eau: 60, air: 20, terre: 0 } },
    moves: ['Boss_Ultime_aguabrial_noyade', 'Boss_Ultime_aguabrial_torrent', 'Boss_Ultime_aguabrial_vague_abyssale', 'Boss_Ultime_aguabrial_deluge_eternel']
}

monsters['dragon_dardondakal'] = {
    id:         'dragon_dardondakal',
    name:       'Dardondakal, Dragon du Néant',
    image:      'img/monstres/boss_Ultime/dardondakal_p1.png',
    rarity:     'legendaire',
    tier:       'boss',
    fixedLevel: 200,
    bst: { hp: 5000000, atk: 700, spd: 100, res: { neutre: 50, feu: 0, eau: 0, air: 0, terre: 0 } },
    moves: ['Boss_Ultime_dardondakal_neantisation', 'Boss_Ultime_dardondakal_vide_primordial', 'Boss_Ultime_dardondakal_souffle_neant', 'Boss_Ultime_dardondakal_essence_neutre']
}

monsters['dragon_terrakourial'] = {
    id:         'dragon_terrakourial',
    name:       'Terrakourial, Dragon de la Terre',
    image:      'img/monstres/boss_Ultime/Terrakourial_p1.png',
    rarity:     'legendaire',
    tier:       'boss',
    fixedLevel: 200,
    bst: { hp: 5000000, atk: 700, spd: 100, res: { neutre: 0, feu: 0, eau: 0, air: -40, terre: 60 } },
    moves: ['Boss_Ultime_terrakourial_seisme', 'Boss_Ultime_terrakourial_faille_terrestre', 'Boss_Ultime_terrakourial_souffle_mineral', 'Boss_Ultime_terrakourial_tremblement_eternel']
}

monsters['dragon_aerafal'] = {
    id:         'dragon_aerafal',
    name:       "Aerafal, Dragon de l'Air",
    image:      'img/monstres/boss_Ultime/Aerafal_p1.png',
    rarity:     'legendaire',
    tier:       'boss',
    fixedLevel: 200,
    bst: { hp: 5000000, atk: 700, spd: 100, res: { neutre: 0, feu: 0, eau: 0, air: 60, terre: -40 } },
    moves: ['Boss_Ultime_aerafal_bourrasque', 'Boss_Ultime_aerafal_trombe', 'Boss_Ultime_aerafal_souffle_venteux', 'Boss_Ultime_aerafal_tempete_eternelle']
}

monsters['dragon_grougalorasalar'] = {
    id:         'dragon_grougalorasalar',
    name:       'Grougalorasalar, Père des Dragons',
    image:      'img/monstres/boss_Ultime/salar_p1.png',
    rarity:     'legendaire',
    tier:       'boss',
    fixedLevel: 200,
    bst: { hp: 7000000, atk: 800, spd: 100, res: { neutre: 30, feu: 20, eau: 20, air: 20, terre: 20 } },
    moves: ['Boss_Ultime_grougalorasalar_rugissement_ancestral', 'Boss_Ultime_grougalorasalar_morsure_primordiale', 'Boss_Ultime_grougalorasalar_souffle_millenaire', 'Boss_Ultime_grougalorasalar_epoque_oubliee']
}

monsters['dragon_tylezia'] = {
    id:         'dragon_tylezia',
    name:       'Tylezia, Dragon des Cendres',
    image:      'img/monstres/boss_Ultime/Tylezia_p1.png',
    rarity:     'legendaire',
    tier:       'boss',
    fixedLevel: 200,
    bst: { hp: 5000000, atk: 700, spd: 100, res: { neutre: 0, feu: 40, eau: -30, air: 40, terre: -20 } },
    moves: ['Boss_Ultime_tylezia_cendres_volantes', 'Boss_Ultime_tylezia_brasier_venteux', 'Boss_Ultime_tylezia_souffle_ardent_aerien', 'Boss_Ultime_tylezia_phoenix_eternel']
}

monsters['dragon_rathrosk'] = {
    id:         'dragon_rathrosk',
    name:       'Rathrosk, Dragon des Profondeurs',
    image:      'img/monstres/boss_Ultime/Rathrosk_p1.png',
    rarity:     'legendaire',
    tier:       'boss',
    fixedLevel: 200,
    bst: { hp: 5000000, atk: 700, spd: 100, res: { neutre: 0, feu: -20, eau: 40, air: -20, terre: 40 } },
    moves: ['Boss_Ultime_rathrosk_boue_primordiale', 'Boss_Ultime_rathrosk_glissement_terrestre', 'Boss_Ultime_rathrosk_souffle_boueux', 'Boss_Ultime_rathrosk_raz_de_maree_tellurique']
}

monsters['dragon_draconiros'] = {
    id:         'dragon_draconiros',
    name:       'Draconiros, Dragon des Flammes Sombres',
    image:      'img/monstres/boss_Ultime/Draconiros_p1.png',
    rarity:     'legendaire',
    tier:       'boss',
    fixedLevel: 200,
    bst: { hp: 5000000, atk: 700, spd: 100, res: { neutre: 20, feu: 50, eau: -30, air: 0, terre: 0 } },
    moves: ['Boss_Ultime_draconiros_cendre_noire', 'Boss_Ultime_draconiros_flamme_sombre', 'Boss_Ultime_draconiros_souffle_obscur', 'Boss_Ultime_draconiros_feu_du_neant']
}

// ── Métadonnées Boss Ultime (lore, récompense, phase 2) ────────────────────────

const BossUltimeDragons = {
    'dragon_ignemikhal': {
        id:        'dragon_ignemikhal',
        monsterId: 'dragon_ignemikhal',
        name:      'Ignemikhal, Dragon de Feu',
        lore:      "Ignemikhal, aussi connu sous le nom d'Arty durant l'une de ses vies, est le Dragon Élémentaire du feu, né du souffle de Spiritia. Séduit par la poupée divine Ladysally, il a pondu le Dofus Pourpre, symbole de son amour pour elle.",
        icon:      'img/monstres/boss_Ultime/Ignemikhal_p1.png',
        reward:    { item: 'Dofus_Pourpre' },
        phase2Threshold: 0.30,
        phase2: {
            image: 'img/monstres/boss_Ultime/Ignemikhal_p2.png',
            bst:   { atk: 950, res: { neutre: 10, feu: 70, eau: -30, air: 10, terre: 30 } },
            moves: ['Boss_Ultime_ignemikhal_p2_coeur_de_lave', 'Boss_Ultime_ignemikhal_p2_apocalypse_solaire', 'Boss_Ultime_ignemikhal_p2_nova', 'Boss_Ultime_ignemikhal_p2_renaissance']
        }
    },
    'dragon_Aguabrial': {
        id:        'dragon_Aguabrial',
        monsterId: 'dragon_Aguabrial',
        name:      "Aguabrial, Dragon de l'Eau",
        lore:      "Aguabrial est le dragon élémentaire de l'eau, né du souffle de Spiritia. Il engendra le Dofus turquoise par amour pour la poupée Dathura.",
        icon:      'img/monstres/boss_Ultime/Aguabrial_p1.png',
        reward:    { item: 'Dofus_Turquoise' },
        phase2Threshold: 0.30,
        phase2: {
            image: 'img/monstres/boss_Ultime/Aguabrial_p2.png',
            bst:   { atk: 950, res: { neutre: 10, feu: -60, eau: 70, air: 30, terre: 10 } },
            moves: ['Boss_Ultime_aguabrial_p2_pression_abyssale', 'Boss_Ultime_aguabrial_p2_tsunami', 'Boss_Ultime_aguabrial_p2_maelstrom', 'Boss_Ultime_aguabrial_p2_metamorphose_aquatique']
        }
    },
    'dragon_dardondakal': {
        id:        'dragon_dardondakal',
        monsterId: 'dragon_dardondakal',
        name:      'Dardondakal, Dragon du Néant',
        lore:      "",
        icon:      'img/monstres/boss_Ultime/dardondakal_p1.png',
        reward:    { item: 'Dofus_Ivoire' },
        phase2Threshold: 0.30,
        phase2: {
            image: 'img/monstres/boss_Ultime/dardondakal_p2.png',
            bst:   { atk: 950, res: { neutre: 60, feu: 10, eau: 10, air: 10, terre: 10 } },
            moves: ['Boss_Ultime_dardondakal_p2_annihilation', 'Boss_Ultime_dardondakal_p2_eclipse_totale', 'Boss_Ultime_dardondakal_p2_equilibre_brise', 'Boss_Ultime_dardondakal_p2_forme_eternelle']
        }
    },
    'dragon_terrakourial': {
        id:        'dragon_terrakourial',
        monsterId: 'dragon_terrakourial',
        name:      'Terrakourial, Dragon de la Terre',
        lore:      "",
        icon:      'img/monstres/boss_Ultime/Terrakourial_p1.png',
        reward:    { item: 'Dofus_Ocre' },
        phase2Threshold: 0.30,
        phase2: {
            image: 'img/monstres/boss_Ultime/Terrakourial_p2.png',
            bst:   { atk: 950, res: { neutre: 10, feu: 10, eau: 10, air: -30, terre: 70 } },
            moves: ['Boss_Ultime_terrakourial_p2_ecrasement', 'Boss_Ultime_terrakourial_p2_mega_seisme', 'Boss_Ultime_terrakourial_p2_golem_draconique', 'Boss_Ultime_terrakourial_p2_eveil_tellurique']
        }
    },
    'dragon_aerafal': {
        id:        'dragon_aerafal',
        monsterId: 'dragon_aerafal',
        name:      "Aerafal, Dragon de l'Air",
        lore:      "",
        icon:      'img/monstres/boss_Ultime/Aerafal_p1.png',
        reward:    { item: 'Dofus_Emeraude' },
        phase2Threshold: 0.30,
        phase2: {
            image: 'img/monstres/boss_Ultime/Aerafal_p2.png',
            bst:   { atk: 950, res: { neutre: 10, feu: 10, eau: 10, air: 70, terre: -30 } },
            moves: ['Boss_Ultime_aerafal_p2_cyclone', 'Boss_Ultime_aerafal_p2_furie_des_vents', 'Boss_Ultime_aerafal_p2_tempete_absolue', 'Boss_Ultime_aerafal_p2_aile_de_foudre']
        }
    },
    'dragon_grougalorasalar': {
        id:        'dragon_grougalorasalar',
        monsterId: 'dragon_grougalorasalar',
        name:      'Grougalorasalar, Père des Dragons',
        lore:      "",
        icon:      'img/monstres/boss_Ultime/salar_p1.png',
        reward:    { item: 'Dofus_Ebene' },
        phase2Threshold: 0.30,
        phase2: {
            image: 'img/monstres/boss_Ultime/salar_p2.png',
            bst:   { atk: 1100, res: { neutre: 40, feu: 30, eau: 30, air: 30, terre: 30 } },
            moves: ['Boss_Ultime_grougalorasalar_p2_maitrise_absolue', 'Boss_Ultime_grougalorasalar_p2_chant_dragon', 'Boss_Ultime_grougalorasalar_p2_ere_draconique', 'Boss_Ultime_grougalorasalar_p2_incarnation']
        }
    },
    'dragon_tylezia': {
        id:        'dragon_tylezia',
        monsterId: 'dragon_tylezia',
        name:      'Tylezia, Dragon des Cendres',
        lore:      "",
        icon:      'img/monstres/boss_Ultime/Tylezia_p1.png',
        reward:    { item: 'Dofus_Vulbis' },
        phase2Threshold: 0.30,
        phase2: {
            image: 'img/monstres/boss_Ultime/Tylezia_p2.png',
            bst:   { atk: 950, res: { neutre: 10, feu: 50, eau: -20, air: 50, terre: -10 } },
            moves: ['Boss_Ultime_tylezia_p2_flamme_ouragan', 'Boss_Ultime_tylezia_p2_inferno_aerien', 'Boss_Ultime_tylezia_p2_maelstrom_ardent', 'Boss_Ultime_tylezia_p2_ascension_draconique']
        }
    },
    'dragon_rathrosk': {
        id:        'dragon_rathrosk',
        monsterId: 'dragon_rathrosk',
        name:      'Rathrosk, Dragon des Profondeurs',
        lore:      "",
        icon:      'img/monstres/boss_Ultime/Rathrosk_p1.png',
        reward:    { item: 'Dofus_Argente' },
        phase2Threshold: 0.30,
        phase2: {
            image: 'img/monstres/boss_Ultime/Rathrosk_p2.png',
            bst:   { atk: 950, res: { neutre: 10, feu: -10, eau: 50, air: -10, terre: 50 } },
            moves: ['Boss_Ultime_rathrosk_p2_diluvion', 'Boss_Ultime_rathrosk_p2_torrent_rocheux', 'Boss_Ultime_rathrosk_p2_erosion_draconique', 'Boss_Ultime_rathrosk_p2_maree_terrienne']
        }
    },
    'dragon_draconiros': {
        id:        'dragon_draconiros',
        monsterId: 'dragon_draconiros',
        name:      'Draconiros, Dragon des Flammes Sombres',
        lore:      "",
        icon:      'img/monstres/boss_Ultime/Draconiros_p1.png',
        reward:    { item: 'Dofus_Tachete' },
        phase2Threshold: 0.30,
        phase2: {
            image: 'img/monstres/boss_Ultime/Draconiros_p2.png',
            bst:   { atk: 950, res: { neutre: 30, feu: 60, eau: -20, air: 10, terre: 10 } },
            moves: ['Boss_Ultime_draconiros_p2_brasier_tenebreux', 'Boss_Ultime_draconiros_p2_souffle_abyssal', 'Boss_Ultime_draconiros_p2_destruction_draconique', 'Boss_Ultime_draconiros_p2_renaissance_sombre']
        }
    }
}

// ─── Areas synthétiques (créées statiquement pour support rechargement de page) ─

for (const [dragonId, bd] of Object.entries(BossUltimeDragons)) {
    areas['_bossultime_' + dragonId] = {
        id:          '_bossultime_' + dragonId,
        type:        'bossultime',
        name:        bd.name,
        maxLevel:    200,
        minLevel:    1,
        mobMinLevel: 200,
        mobMaxLevel: 200,
        icon:        bd.icon,
        spawns:      [{ id: bd.monsterId, weight: 1 }],
        lootTable:   []
    }
}
