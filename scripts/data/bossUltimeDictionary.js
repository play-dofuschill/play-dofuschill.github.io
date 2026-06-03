// scripts/data/Boss_UltimeDictionary.js — Dragons & sorts Boss_Ultime

const Boss_UltimeDragons = {
    'dragon_ignis': {
        id:   'dragon_ignis',
        name: 'Ignis, Dragon de Feu',
        lore: 'Le premier dragon invoqué dans la Boss_Ultime. Sa flamme consume tout ce qu\'elle touche.',
        icon: 'img/monstres/Boss_Ultime/ignis.png',
        phase1: {
            image: 'img/monstres/Boss_Ultime/ignis.png',
            bst: {hp:  5000000, atk: 100, res: { neutre: 0, feu: 60, eau: -40, air: 0, terre: 20 }},
            moves: ['Boss_Ultime_ignis_embrasement', 'Boss_Ultime_ignis_eruption', 'Boss_Ultime_ignis_souffle_ardent', 'Boss_Ultime_ignis_flammes_eternelles']},
        phase2: {
            image: 'img/monstres/Boss_Ultime/ignis.png',
            bst: {atk: 950, res: { neutre: 0, feu: 80, eau: -60, air: 0, terre: 30 }},
            moves: ['Boss_Ultime_ignis_p2_coeur_de_lave', 'Boss_Ultime_ignis_p2_apocalypse_solaire', 'Boss_Ultime_ignis_p2_nova', 'Boss_Ultime_ignis_p2_renaissance']},
        phase2Threshold: 0.30,
        reward: { kamas: 10000 }
    }
}

// Sorts du boss Boss_Ultime.
// Chaque effet est appliqué individuellement à chaque membre par Boss_UltimeCombat.js.
// target:'enemy' = le membre ciblé | target:'self' = le boss lui-même
// target:'all_enemy' = tous les membres vivants (géré par l'engine, pas executeEffect)
const Boss_UltimeMoves = {

    // ── Ignis Phase 1 ────────────────────────────────────────────────────────
    'Boss_Ultime_ignis_embrasement': {
        id:          'Boss_Ultime_ignis_embrasement',
        name:        'Embrasement',
        cooldownMs:  2000,
        effects: [{ type: 'damage', element: 'feu', damage: { min: 1, max: 2 }, target: 'enemy' },
                  { type: 'dot',    element: 'feu', value: 1, duration: 4, label: 'Brûlure', target: 'enemy' }]
    },
    'Boss_Ultime_ignis_eruption': {
        id:          'Boss_Ultime_ignis_eruption',
        name:        'Éruption',
        cooldownMs:  2500,
        effects: [{ type: 'damage', element: 'feu', damage: { min: 35, max: 50 }, target: 'enemy' }]
    },
    'Boss_Ultime_ignis_souffle_ardent': {
        id:          'Boss_Ultime_ignis_souffle_ardent',
        name:        'Souffle Ardent',
        cooldownMs:  2000,
        effects: [{ type: 'damage', element: 'feu', damage: { min: 120, max: 180 }, target: 'enemy' },
                  { type: 'debuff', stat: 'atk',    value: 100,  duration: 3,  target: 'enemy' }]
    },
    'Boss_Ultime_ignis_flammes_eternelles': {
        id:          'Boss_Ultime_ignis_flammes_eternelles',
        name:        'Flammes Éternelles',
        cooldownMs:  3000,
        effects: [{ type: 'damage', element: 'feu', damage: { min: 250, max: 350 }, target: 'enemy' },
                  { type: 'dot',    element: 'feu', value: 120, duration: 6, label: 'Embrasement Éternel', target: 'enemy' }]
    },
    // ── Ignis Phase 2 ────────────────────────────────────────────────────────
    'Boss_Ultime_ignis_p2_coeur_de_lave': {
        id:          'Boss_Ultime_ignis_p2_coeur_de_lave',
        name:        'Cœur de Lave',
        cooldownMs:  2500,
        effects: [{ type: 'damage', element: 'feu', damage: { min: 300, max: 450 }, target: 'enemy' },
                  { type: 'dot',    element: 'feu', value: 90, duration: 5, label: 'Brûlure Profonde', target: 'enemy' }]
    },
    'Boss_Ultime_ignis_p2_apocalypse_solaire': {
        id:          'Boss_Ultime_ignis_p2_apocalypse_solaire',
        name:        'Apocalypse Solaire',
        cooldownMs:  3500,
        effects: [{ type: 'damage', element: 'feu', damage: { min: 600, max: 850 }, target: 'enemy' }]
    },
    'Boss_Ultime_ignis_p2_nova': {
        id:          'Boss_Ultime_ignis_p2_nova',
        name:        'Nova',
        cooldownMs:  3000,
        effects: [{ type: 'damage', element: 'feu',  damage: { min: 400, max: 600 }, target: 'enemy' },
                  { type: 'debuff', stat: 'atk',     value: 200, duration: 4, target: 'enemy' },
                  { type: 'debuff', stat: 'damageReductionPct', value: 20, duration: 3, target: 'enemy' }]
    },
    'Boss_Ultime_ignis_p2_renaissance': {
        id:          'Boss_Ultime_ignis_p2_renaissance',
        name:        'Renaissance Ardente',
        cooldownMs:  2500,
        effects: [{ type: 'damage', element: 'feu', damage: { min: 200, max: 300 }, target: 'enemy' },
                  { type: 'buff',   stat: 'atk',           value: 300, duration: 4, target: 'self' },
                  { type: 'buff',   stat: 'finalDamagePct', value: 30,  duration: 4, target: 'self' }]
    }
}
