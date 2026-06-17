// scripts/data/Boss_UltimeDictionary.js — Dragons & sorts Boss_Ultime

const Boss_UltimeDragons = {
    'dragon_ignemikhal': {
        id:   'dragon_ignemikhal',
        name: 'Ignemikhal, Dragon de Feu',
        lore: "Ignemikhal, aussi connu sous le nom d'Arty durant l'une de ses vies, est le Dragon Élémentaire du feu, né du souffle de Spiritia. Séduit par la poupée divine Ladysally, il a pondu le Dofus Pourpre, symbole de son amour pour elle.",
        icon: 'img/monstres/boss_Ultime/Ignemikhal_p1.png',
        phase1: {
            image: 'img/monstres/boss_Ultime/Ignemikhal_p1.png',
            bst: {hp:  5000000, atk: 700, res: { neutre: 0, feu: 60, eau: -40, air: 0, terre: 20 }},
            moves: ['Boss_Ultime_ignemikhal_embrasement', 'Boss_Ultime_ignemikhal_eruption', 'Boss_Ultime_ignemikhal_souffle_ardent', 'Boss_Ultime_ignemikhal_flammes_eternelles']},
        phase2: {
            image: 'img/monstres/boss_Ultime/Ignemikhal_p2.png',
            bst: {atk: 950, res: { neutre: 10, feu: 70, eau: -30, air: 10, terre: 30 }},
            moves: ['Boss_Ultime_ignemikhal_p2_coeur_de_lave', 'Boss_Ultime_ignemikhal_p2_apocalypse_solaire', 'Boss_Ultime_ignemikhal_p2_nova', 'Boss_Ultime_ignemikhal_p2_renaissance']},
        phase2Threshold: 0.30,
        reward: { item: 'Dofus_Pourpre' }
    },
    'dragon_Aguabrial': {
        id:   'dragon_Aguabrial',
        name: "Aguabrial, Dragon de l'Eau",
        lore: "Aguabrial est le dragon élémentaire de l'eau, né du souffle de Spiritia. Il engendra le Dofus turquoise par amour pour la poupée Dathura.",
        icon: 'img/monstres/boss_Ultime/Aguabrial_p1.png',
        phase1: {
            image: 'img/monstres/boss_Ultime/Aguabrial_p1.png',
            bst: {hp:  5000000, atk: 700, res: { neutre: 0, feu: -40, eau: 60, air: 20, terre: 0 }},
            moves: ['Boss_Ultime_aguabrial_noyade', 'Boss_Ultime_aguabrial_torrent', 'Boss_Ultime_aguabrial_vague_abyssale', 'Boss_Ultime_aguabrial_deluge_eternel']},
        phase2: {
            image: 'img/monstres/boss_Ultime/Aguabrial_p2.png',
            bst: {atk: 950, res: { neutre: 10, feu: -60, eau: 70, air: 30, terre: 10 }},
            moves: ['Boss_Ultime_aguabrial_p2_pression_abyssale', 'Boss_Ultime_aguabrial_p2_tsunami', 'Boss_Ultime_aguabrial_p2_maelstrom', 'Boss_Ultime_aguabrial_p2_metamorphose_aquatique']},
        phase2Threshold: 0.30,
        reward: { item: 'Dofus_Turquoise' }
    },
    
}

// Sorts du boss Boss_Ultime.
// Chaque effet est appliqué individuellement à chaque membre par Boss_UltimeCombat.js.
// target:'enemy' = le membre ciblé | target:'self' = le boss lui-même
// target:'all_enemy' = tous les membres vivants (géré par l'engine, pas executeEffect)
const Boss_UltimeMoves = {

    // ── Ignis Phase 1 ────────────────────────────────────────────────────────
    'Boss_Ultime_ignemikhal_embrasement': {
        id:          'Boss_Ultime_ignemikhal_embrasement',
        name:        'Embrasement',
        cooldownMs:  2500,
        effects: [{ type: 'damage', element: 'feu', damage: { min: 25, max: 40 }, target: 'enemy' },
                  { type: 'dot',    element: 'feu', value: 20, duration: 2, label: 'Brûlure', target: 'enemy' }]
    },
    'Boss_Ultime_ignemikhal_eruption': {
        id:          'Boss_Ultime_ignemikhal_eruption',
        name:        'Éruption',
        cooldownMs:  2500,
        effects: [{ type: 'damage', element: 'feu', damage: { min: 35, max: 50 }, target: 'enemy' }]
    },
    'Boss_Ultime_ignemikhal_souffle_ardent': {
        id:          'Boss_Ultime_ignemikhal_souffle_ardent',
        name:        'Souffle Ardent',
        cooldownMs:  2500,
        effects: [{ type: 'damage', element: 'feu', damage: { min: 60, max: 80 }, target: 'enemy' },
                  { type: 'debuff', stat: 'atk',    value: 300,  duration: 2,  target: 'enemy' }]
    },
    'Boss_Ultime_ignemikhal_flammes_eternelles': {
        id:          'Boss_Ultime_ignemikhal_flammes_eternelles',
        name:        'Flammes Éternelles',
        cooldownMs:  2500,
        effects: [{ type: 'damage', element: 'feu', damage: { min: 35, max: 50 }, target: 'enemy' },
                  { type: 'dot',    element: 'feu', value: 40, duration: 4, label: 'Embrasement Éternel', target: 'enemy' }]
    },
    // ── Ignemikhal Phase 2 ────────────────────────────────────────────────────────
    'Boss_Ultime_ignemikhal_p2_coeur_de_lave': {
        id:          'Boss_Ultime_ignemikhal_p2_coeur_de_lave',
        name:        'Cœur de Lave',
        cooldownMs:  2500,
        effects: [{ type: 'damage', element: 'feu', damage: { min: 35, max: 50 }, target: 'enemy' },
                  { type: 'dot',    element: 'feu', value: 30, duration: 3, label: 'Brûlure', target: 'enemy' }]
    },
    'Boss_Ultime_ignemikhal_p2_apocalypse_solaire': {
        id:          'Boss_Ultime_ignemikhal_p2_apocalypse_solaire',
        name:        'Apocalypse Solaire',
        cooldownMs:  3500,
        effects: [{ type: 'damage', element: 'feu', damage: { min: 50, max: 80 }, target: 'enemy' }]
    },
    'Boss_Ultime_ignemikhal_p2_nova': {
        id:          'Boss_Ultime_ignemikhal_p2_nova',
        name:        'Nova',
        cooldownMs:  3000,
        effects: [{ type: 'damage', element: 'feu',  damage: { min: 50, max: 70 }, target: 'enemy' },
                  { type: 'debuff', stat: 'atk',     value: 300, duration: 2, target: 'enemy' },
                  { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 2, target: 'enemy' }]
    },
    'Boss_Ultime_ignemikhal_p2_renaissance': {
        id:          'Boss_Ultime_ignemikhal_p2_renaissance',
        name:        'Renaissance Ardente',
        cooldownMs:  2500,
        effects: [{ type: 'damage', element: 'feu', damage: { min: 20, max: 30 }, target: 'enemy' },
                  { type: 'buff',   stat: 'atk',           value: 300, duration: 2, target: 'self' },
                  { type: 'buff',   stat: 'finalDamagePct', value: 30,  duration: 2, target: 'self' }]
    },

    // ── Aguabrial Phase 1 ────────────────────────────────────────────────────────
    'Boss_Ultime_aguabrial_noyade': {
        id:          'Boss_Ultime_aguabrial_noyade',
        name:        'Noyade',
        cooldownMs:  2500,
        effects: [{ type: 'damage', element: 'eau', damage: { min: 25, max: 40 }, target: 'enemy' },
                  { type: 'dot',    element: 'eau', value: 20, duration: 2, label: 'Noyade', target: 'enemy' }]
    },
    'Boss_Ultime_aguabrial_torrent': {
        id:          'Boss_Ultime_aguabrial_torrent',
        name:        'Torrent',
        cooldownMs:  2500,
        effects: [{ type: 'damage', element: 'eau', damage: { min: 35, max: 50 }, target: 'enemy' }]
    },
    'Boss_Ultime_aguabrial_vague_abyssale': {
        id:          'Boss_Ultime_aguabrial_vague_abyssale',
        name:        'Vague Abyssale',
        cooldownMs:  2500,
        effects: [{ type: 'damage', element: 'eau', damage: { min: 60, max: 80 }, target: 'enemy' },
                  { type: 'debuff', stat: 'atk',    value: 300, duration: 2, target: 'enemy' }]
    },
    'Boss_Ultime_aguabrial_deluge_eternel': {
        id:          'Boss_Ultime_aguabrial_deluge_eternel',
        name:        'Déluge Éternel',
        cooldownMs:  2500,
        effects: [{ type: 'damage', element: 'eau', damage: { min: 35, max: 50 }, target: 'enemy' },
                  { type: 'dot',    element: 'eau', value: 40, duration: 4, label: 'Inondation Éternelle', target: 'enemy' }]
    },
    // ── Aguabrial Phase 2 ────────────────────────────────────────────────────────
    'Boss_Ultime_aguabrial_p2_pression_abyssale': {
        id:          'Boss_Ultime_aguabrial_p2_pression_abyssale',
        name:        'Pression Abyssale',
        cooldownMs:  2500,
        effects: [{ type: 'damage', element: 'eau', damage: { min: 35, max: 50 }, target: 'enemy' },
                  { type: 'dot',    element: 'eau', value: 30, duration: 3, label: 'Noyade', target: 'enemy' }]
    },
    'Boss_Ultime_aguabrial_p2_tsunami': {
        id:          'Boss_Ultime_aguabrial_p2_tsunami',
        name:        'Tsunami',
        cooldownMs:  3500,
        effects: [{ type: 'damage', element: 'eau', damage: { min: 50, max: 80 }, target: 'enemy' }]
    },
    'Boss_Ultime_aguabrial_p2_maelstrom': {
        id:          'Boss_Ultime_aguabrial_p2_maelstrom',
        name:        'Maelström',
        cooldownMs:  3000,
        effects: [{ type: 'damage', element: 'eau',  damage: { min: 50, max: 70 }, target: 'enemy' },
                  { type: 'debuff', stat: 'atk',     value: 300, duration: 2, target: 'enemy' },
                  { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 2, target: 'enemy' }]
    },
    'Boss_Ultime_aguabrial_p2_metamorphose_aquatique': {
        id:          'Boss_Ultime_aguabrial_p2_metamorphose_aquatique',
        name:        'Métamorphose Aquatique',
        cooldownMs:  2500,
        effects: [{ type: 'damage', element: 'eau', damage: { min: 20, max: 30 }, target: 'enemy' },
                  { type: 'buff',   stat: 'atk',           value: 300, duration: 2, target: 'self' },
                  { type: 'buff',   stat: 'finalDamagePct', value: 30,  duration: 2, target: 'self' }]
    }
}
