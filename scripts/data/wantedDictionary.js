// scripts/data/wantedDictionary.js — Avis de Recherche : boss & sorts

// ─── Monstres Wanted (étend l'objet `monsters`) ───────────────────────────────

monsters['wanted_sam_sagaz'] = {
    id: 'wanted_sam_sagaz',
    name: 'Sam Sagaz',
    image: 'img/monstres/wanted/avis/sam_sagaz.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 20,
    bst: { hp: 6500, atk: 300, spd: 30, res: { neutre: 0, feu: 0, eau: 0, air: 0, terre: 0 } },
    moves: ['wanted_sam_sagaz_jardinage', 'wanted_sam_sagaz_anneau_de_gaz', 'wanted_sam_sagaz_appel_de_bolesh']
}

monsters['wanted_fouduglen_l_ecureuil'] = {
    id: 'wanted_fouduglen_l_ecureuil',
    name: 'Fouduglen l\'Écureuil',
    image: 'img/monstres/wanted/avis/fouduglen_l_ecureuil.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 20,
    bst: { hp: 6700, atk: 300, spd: 30, res: { neutre: 0, feu: 0, eau: 0, air: 0, terre: 0 } },
    moves: ['wanted_fouduglen_l_ecureuil_casse_noisettes', 'wanted_fouduglen_l_ecureuil_discretion']
}

monsters['wanted_maitre_boulet'] = {
    id: 'wanted_maitre_boulet',
    name: 'Maître Boulet',
    image: 'img/monstres/wanted/avis/maitre_boulet.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 30,
    bst: { hp: 12000, atk: 300, spd: 30, res: { neutre: -10, feu: 10, eau: 10, air: 10, terre: 10 } },
    moves: ['wanted_maitre_boulet_acculement', 'wanted_maitre_boulet_debitage', 'wanted_maitre_boulet_invocation_de_tournesol']
}

monsters['wanted_frakacia_leukocytine'] = {
    id: 'wanted_frakacia_leukocytine',
    name: 'Frakacia Leukocytine',
    image: 'img/monstres/wanted/avis/frakacia_leukocytine.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 30,
    bst: { hp: 13000, atk: 300, spd: 30, res: { neutre: 15, feu: 5, eau: -10, air: 25, terre: -20 } },
    moves: ['wanted_frakacia_leukocytine_crochet_fracassant', 'wanted_frakacia_leukocytine_cri_fracassant', 'wanted_frakacia_leukocytine_hyperleukocytine']
}

monsters['wanted_ambi_guman'] = {
    id: 'wanted_ambi_guman',
    name: 'Ambi Guman',
    image: 'img/monstres/wanted/avis/ambi_guman.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 30,
    bst: { hp: 14000, atk: 200, spd: 20, res: { neutre: 20, feu: 20, eau: 10, air: 20, terre: 10 } },
    moves: ['wanted_ambi_guman_patate', 'wanted_ambi_guman_roquette', 'wanted_ambi_guman_enfant_de_la_terre']
}

monsters['wanted_exi_guman'] = {
    id: 'wanted_exi_guman',
    name: 'Exi Guman',
    image: 'img/monstres/wanted/avis/exi_guman.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 30,
    bst: { hp: 11000, atk: 200, spd: 20, res: { neutre: 30, feu: 5, eau: 5, air: -10, terre: 10 } },
    moves: ['wanted_exi_guman_spatezoignons', 'wanted_exi_guman_chataigne', 'wanted_exi_guman_pousses_ephemeres']
}

monsters['wanted_roub_ignolles'] = {
    id: 'wanted_roub_ignolles',
    name: 'Roub\' Ignolles',
    image: 'img/monstres/wanted/avis/roub_ignolles.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 40,
    bst: { hp: 12000, atk: 300, spd: 30, res: { neutre: 20, feu: 10, eau: 10, air: 10, terre: 0 } },
    moves: ['wanted_roub_ignolles_vulnerabilite_bombesque', 'wanted_roub_ignolles_pousse_bombe', 'wanted_roub_ignolles_teleportabombe']
}

monsters['wanted_bouss_baybe'] = {
    id: 'wanted_bouss_baybe',
    name: 'Bouss Baybe',
    image: 'img/monstres/wanted/avis/bouss_baybe.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 50,
    bst: { hp: 31000, atk: 300, spd: 30, res: { neutre: 15, feu: 5, eau: 0, air: 10, terre: 20 } },
    moves: ['wanted_bouss_baybe_salon', 'wanted_bouss_baybe_econduire', 'wanted_bouss_baybe_porkasserie']
}

monsters['wanted_ogivol_scalarcin'] = {
    id: 'wanted_ogivol_scalarcin',
    name: 'Ogivol Scalarcin',
    image: 'img/monstres/wanted/avis/ogivol_scalarcin.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 50,
    bst: { hp: 31000, atk: 300, spd: 30, res: { neutre: 10, feu: -15, eau: -20, air: 25, terre: 20 } },
    moves: ['wanted_ogivol_scalarcin_ogivoltaique', 'wanted_ogivol_scalarcin_ogivolage', 'wanted_ogivol_scalarcin_ogivolatilise', 'wanted_ogivol_scalarcin_ogivologramme', 'wanted_ogivol_scalarcin_ogivolverine']
}

monsters['wanted_nono_le_wobot'] = {
    id: 'wanted_nono_le_wobot',
    name: 'Nono le Wobot',
    image: 'img/monstres/wanted/avis/nono_le_wobot.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 60,
    bst: { hp: 41000, atk: 300, spd: 30, res: { neutre: 10, feu: -10, eau: -10, air: 20, terre: 20 } },
    moves: ['wanted_nono_le_wobot_vewwouillage', 'wanted_nono_le_wobot_wavelot_explosif', 'wanted_nono_le_wobot_massue_matwaquante']
}

monsters['wanted_brumen_tinctorias'] = {
    id: 'wanted_brumen_tinctorias',
    name: 'Brumen Tinctorias',
    image: 'img/monstres/wanted/avis/brumen_tinctorias.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 60,
    bst: { hp: 43000, atk: 300, spd: 30, res: { neutre: 15, feu: 20, eau: -15, air: 5, terre: -10 } },
    moves: ['wanted_brumen_tinctorias_elixir_curatif', 'wanted_brumen_tinctorias_elixir_interdit', 'wanted_brumen_tinctorias_elixir_stimulant', 'wanted_brumen_tinctorias_elixir_revitalisant', 'wanted_brumen_tinctorias_elixir_vampirique']
}

monsters['wanted_marzwel_le_gobelin'] = {
    id: 'wanted_marzwel_le_gobelin',
    name: 'Marzwel le Gobelin',
    image: 'img/monstres/wanted/avis/marzwel_le_gobelin.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 60,
    bst: { hp: 41000, atk: 300, spd: 30, res: { neutre: 0, feu: 0, eau: 20, air: 0, terre: 0 } },
    moves: ['wanted_marzwel_le_gobelin_javeline_creuse', 'wanted_marzwel_le_gobelin_a_pied_d_uvre', 'wanted_marzwel_le_gobelin_fuite_anticipee']
}

monsters['wanted_gadoo'] = {
    id: 'wanted_gadoo',
    name: 'Gadoo',
    image: 'img/monstres/wanted/avis/gadoo.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 60,
    bst: { hp: 44000, atk: 100, spd: 10,
        res: { neutre: 100, feu: 10, eau: -30, air: 10, terre: 40 } },
    moves: ['wanted_gadoo_sucon_spongieux', 'wanted_gadoo_vase', 'wanted_gadoo_croute', 'wanted_gadoo_bain_de_boo']
}

monsters['wanted_armada_l_invincible'] = {
    id: 'wanted_armada_l_invincible',
    name: 'Armada l\'Invincible',
    image: 'img/monstres/wanted/avis/armada_l_invincible.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 70,
    bst: { hp: 53000, atk: 300, spd: 30,
        res: { neutre: 0, feu: 0, eau: 0, air: 0, terre: 0 } },
    moves: ['wanted_armada_l_invincible_tankafair', 'wanted_armada_l_invincible_canonnier', 'wanted_armada_l_invincible_manuvre']
}

monsters['wanted_qil_bil'] = {
    id: 'wanted_qil_bil',
    name: 'Qil Bil',
    image: 'img/monstres/wanted/avis/qil_bil.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 70,
    bst: { hp: 53000, atk: 300, spd: 30, res: { neutre: 10, feu: 10, eau: -19, air: 0, terre: 12 } },
    moves: ['wanted_qil_bil_lancer_de_poing', 'wanted_qil_bil_rage_cybernetique', 'wanted_qil_bil_surchauffe']
}

monsters['wanted_dragodingo'] = {
    id: 'wanted_dragodingo',
    name: 'Dragodingo',
    image: 'img/monstres/wanted/avis/dragodingo.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 80,
    bst: { hp: 66000, atk: 300, spd: 30,
        res: { neutre: 0, feu: 10, eau: 10, air: 15, terre: 15 } },
    moves: ['wanted_dragodingo_dingoboule', 'wanted_dragodingo_dingosouffle', 'wanted_dragodingo_dingoprevention']
}

monsters['wanted_aermyne_braco_scalptaras'] = {
    id: 'wanted_aermyne_braco_scalptaras',
    name: 'Aermyne \'Braco\' Scalptaras',
    image: 'img/monstres/wanted/avis/aermyne_braco_scalptaras.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 80,
    bst: { hp: 66000, atk: 300, spd: 30, res: { neutre: 60, feu: 30, eau: 10, air: 20, terre: -20 } },
    moves: ['wanted_aermyne_braco_scalptaras_calin', 'wanted_aermyne_braco_scalptaras_malaxage', 'wanted_aermyne_braco_scalptaras_sale_marmot']
}

monsters['wanted_musha_l_oni'] = {
    id: 'wanted_musha_l_oni',
    name: 'Musha L\'Oni',
    image: 'img/monstres/wanted/avis/musha_l_oni.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 80,
    bst: { hp: 66000, atk: 300, spd: 30, res: { neutre: 90, feu: 90, eau: 90, air: 90, terre: 90 } },
    moves: ['wanted_musha_l_oni_onigiri', 'wanted_musha_l_oni_onigaud', 'wanted_musha_l_oni_onivoirien']
}

monsters['wanted_tyranne_la_terrible'] = {
    id: 'wanted_tyranne_la_terrible',
    name: 'Tyranne la Terrible',
    image: 'img/monstres/wanted/avis/tyranne_la_terrible.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 80,
    bst: { hp: 66000, atk: 350, spd: 20, res: { neutre: 10, feu: 0, eau: 15, air: -10, terre: 15 } },
    moves: ['wanted_tyranne_la_terrible_hyper_kick', 'wanted_tyranne_la_terrible_1000_poings', 'wanted_tyranne_la_terrible_frappe_devastatrice']
}

monsters['wanted_tournade'] = {
    id: 'wanted_tournade',
    name: 'Tournade',
    image: 'img/monstres/wanted/avis/tournade.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 80,
    bst: { hp: 62000, atk: 250, spd: 25,
        res: { neutre: 5, feu: 7, eau: -12, air: 13, terre: 10 } },
    moves: ['wanted_tournade_aspiration_de_masse', 'wanted_tournade_tourbillon_violent', 'wanted_tournade_tempete_devastatrice']
}

monsters['wanted_degolas'] = {
    id: 'wanted_degolas',
    name: 'Degolas',
    image: 'img/monstres/wanted/avis/degolas.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 90,
    bst: { hp: 79000, atk: 300, spd: 30,
        res: { neutre: 5, feu: 15, eau: 25, air: 0, terre: 5 } },
    moves: ['wanted_degolas_fleche_aveuglante', 'wanted_degolas_masque_aveuglant', 'wanted_degolas_fleche_repoussante']
}

monsters['wanted_rok_gnorok'] = {
    id: 'wanted_rok_gnorok',
    name: 'Rok Gnorok',
    image: 'img/monstres/wanted/avis/rok_gnorok.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 90,
    bst: { hp: 79000, atk: 300, spd: 30, res: { neutre: 22, feu: 22, eau: 22, air: 22, terre: 22 } },
    moves: ['wanted_rok_gnorok_martelage', 'wanted_rok_gnorok_armure_rocailleuse', 'wanted_rok_gnorok_surt']
}

monsters['wanted_simbadas'] = {
    id: 'wanted_simbadas',
    name: 'Simbadas',
    image: 'img/monstres/wanted/avis/simbadas.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 90,
    bst: { hp: 80000, atk: 300, spd: 30, res: { neutre: -15, feu: 28, eau: 14, air: 13, terre: -5 } },
    moves: ['wanted_simbadas_saut_precipite', 'wanted_simbadas_grosse_papatte']
}

monsters['wanted_prince_marchand'] = {
    id: 'wanted_prince_marchand',
    name: 'Prince Marchand',
    image: 'img/monstres/wanted/avis/prince_marchand.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 100,
    bst: { hp: 96000, atk: 300, spd: 30, res: { neutre: 50, feu: 15, eau: 10, air: 5, terre: 0 } },
    moves: ['wanted_prince_marchand_marchandage', 'wanted_prince_marchand_palouf', 'wanted_prince_marchand_charge_heroique']
}

monsters['wanted_maxi_malle'] = {
    id: 'wanted_maxi_malle',
    name: 'Maxi-Malle',
    image: 'img/monstres/wanted/avis/maxi_malle.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 100,
    bst: { hp: 89000, atk: 300, spd: 30,
        res: { neutre: -20, feu: -10, eau: 40, air: 20, terre: 10 } },
    moves: ['wanted_maxi_malle_decoffrage_brut', 'wanted_maxi_malle_macro_ondes']
}

monsters['wanted_naganita'] = {
    id: 'wanted_naganita',
    name: 'Naganita',
    image: 'img/monstres/wanted/avis/naganita.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 100,
    bst: { hp: 94000, atk: 375, spd: 30, res: { neutre: -5, feu: -20, eau: 10, air: 20, terre: 15 } },
    moves: ['wanted_naganita_puissant_balayage', 'wanted_naganita_estoc_fatal']
}

monsters['wanted_trukipik'] = {
    id: 'wanted_trukipik',
    name: 'Trukipik',
    image: 'img/monstres/wanted/avis/trukipik.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 100,
    bst: { hp: 94000, atk: 375, spd: 30, res: { neutre: -5, feu: -20, eau: 10, air: 20, terre: 15 } },
    moves: ['wanted_trukipik_puissant_balayage', 'wanted_trukipik_estoc_fatal']
}

monsters['wanted_carlita_de_l_aguerfelde'] = {
    id: 'wanted_carlita_de_l_aguerfelde',
    name: 'Carlita de l\'Aguerfelde',
    image: 'img/monstres/wanted/avis/carlita_de_l_aguerfelde.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 100,
    bst: { hp: 94000, atk: 300, spd: 30, res: { neutre: 20, feu: -20, eau: 35, air: -5, terre: 5 } },
    moves: ['wanted_carlita_de_l_aguerfelde_piege_a_mulou', 'wanted_carlita_de_l_aguerfelde_depecage', 'wanted_carlita_de_l_aguerfelde_carabine_a_gros_gibier']
}

monsters['wanted_gobrechaun'] = {
    id: 'wanted_gobrechaun',
    name: 'Gobrechaun',
    image: 'img/monstres/wanted/avis/gobrechaun.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 110,
    bst: { hp: 110000, atk: 300, spd: 30,
        res: { neutre: 0, feu: 0, eau: 20, air: 0, terre: 15 } },
    moves: ['wanted_gobrechaun_jig', 'wanted_gobrechaun_lance_en_ciel']
}

monsters['wanted_bouflouth'] = {
    id: 'wanted_bouflouth',
    name: 'Bouflouth',
    image: 'img/monstres/wanted/avis/bouflouth.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 120,
    bst: { hp: 130000, atk: 300, spd: 30, res: { neutre: 80, feu: 0, eau: 0, air: 0, terre: 0 } },
    moves: ['wanted_bouflouth_mammouth', 'wanted_bouflouth_gloutmouth', 'wanted_bouflouth_hypermouth', 'wanted_bouflouth_embrochmouth']
}

monsters['wanted_vashkiwi'] = {
    id: 'wanted_vashkiwi',
    name: 'Vashkiwi',
    image: 'img/monstres/wanted/avis/vashkiwi.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 120,
    bst: { hp: 130000, atk: 300, spd: 30,
        res: { neutre: 35, feu: -5, eau: 5, air: 15, terre: 25 } },
    moves: ['wanted_vashkiwi_laitage', 'wanted_vashkiwi_sensations_pures', 'wanted_vashkiwi_fontaine_laiteuse']
}

monsters['wanted_morblok'] = {
    id: 'wanted_morblok',
    name: 'Morblok',
    image: 'img/monstres/wanted/avis/morblok.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 120,
    bst: { hp: 120000, atk: 400, spd: 40, res: { neutre: 20, feu: -5, eau: 5, air: 30, terre: 15 } },
    moves: ['wanted_morblok_chronocharge', 'wanted_morblok_rajeunissement', 'wanted_morblok_saute_heure']
}

monsters['wanted_nenufor_tilotus'] = {
    id: 'wanted_nenufor_tilotus',
    name: 'Nenufor Tilotus',
    image: 'img/monstres/wanted/avis/nenufor_tilotus.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 120,
    bst: { hp: 130000, atk: 375, spd: 30, res: { neutre: 0, feu: -15, eau: 10, air: -5, terre: 20 } },
    moves: ['wanted_nenufor_tilotus_spores_de_nympheacee', 'wanted_nenufor_tilotus_invocation_de_nufor', 'wanted_nenufor_tilotus_rhizome_agressif']
}

monsters['wanted_monsieur_pingouin'] = {
    id: 'wanted_monsieur_pingouin',
    name: 'Monsieur Pingouin',
    image: 'img/monstres/wanted/avis/monsieur_pingouin.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 130,
    bst: { hp: 140000, atk: 300, spd: 30, res: { neutre: 0, feu: 0, eau: 50, air: 20, terre: 0 } },
    moves: ['wanted_monsieur_pingouin_parapluie_gadget', 'wanted_monsieur_pingouin_iceberg_saloon', 'wanted_monsieur_pingouin_mascarade_rocambolesque']
}

monsters['wanted_jerart_dupaindur'] = {
    id: 'wanted_jerart_dupaindur',
    name: 'Jérart Dupaindur',
    image: 'img/monstres/wanted/avis/jerart_dupaindur.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 130,
    bst: { hp: 130000, atk: 300, spd: 30,
        res: { neutre: 15, feu: 15, eau: 15, air: 15, terre: 15 } },
    moves: ['wanted_jerart_dupaindur_murge', 'wanted_jerart_dupaindur_soif_inextinguible', 'wanted_jerart_dupaindur_tournee_generale']
}

monsters['wanted_padgref_demoel'] = {
    id: 'wanted_padgref_demoel',
    name: 'Padgref Demoël',
    image: 'img/monstres/wanted/avis/padgref_demoel.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 130,
    bst: { hp: 160000, atk: 300, spd: 30, res: { neutre: 30, feu: 15, eau: -15, air: -10, terre: -15 } },
    moves: ['wanted_padgref_demoel_attraction', 'wanted_padgref_demoel_assaut_aerien', 'wanted_padgref_demoel_transposition_aqueuse', 'wanted_padgref_demoel_absorption_brulante', 'wanted_padgref_demoel_sanction']
}

monsters['wanted_ali_grothor'] = {
    id: 'wanted_ali_grothor',
    name: 'Ali Grothor',
    image: 'img/monstres/wanted/avis/ali_grothor.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 130,
    bst: { hp: 140000, atk: 300, spd: 30, res: { neutre: 20, feu: 30, eau: -15, air: 25, terre: 10 } },
    moves: ['wanted_ali_grothor_ture', 'wanted_ali_grothor_hida', 'wanted_ali_grothor_risation', 'wanted_ali_grothor_rage_electrique']
}

monsters['wanted_roi_camole'] = {
    id: 'wanted_roi_camole',
    name: 'Roi Camole',
    image: 'img/monstres/wanted/avis/roi_camole.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 130,
    bst: { hp: 160000, atk: 400, spd: 40,
        res: { neutre: 0, feu: 0, eau: 0, air: 0, terre: 0 } },
    moves: ['wanted_roi_camole_taco_tak', 'wanted_roi_camole_epines_et_mirages', 'wanted_roi_camole_coucalactus', 'wanted_roi_camole_foret_de_cactus']
}

monsters['wanted_katigrou'] = {
    id: 'wanted_katigrou',
    name: 'Katigrou',
    image: 'img/monstres/wanted/avis/katigrou.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 140,
    bst: { hp: 150000, atk: 300, spd: 30, res: { neutre: 50, feu: 0, eau: 0, air: 0, terre: 0 } },
    moves: ['wanted_katigrou_bond_improbable', 'wanted_katigrou_broukeul', 'wanted_katigrou_grougrou']
}

monsters['wanted_darma'] = {
    id: 'wanted_darma',
    name: 'Darma',
    image: 'img/monstres/wanted/avis/darma.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 140,
    bst: { hp: 160000, atk: 300, spd: 30,
        res: { neutre: 50, feu: 0, eau: 10, air: 20, terre: 30 } },
    moves: ['wanted_darma_vue_en_noir', 'wanted_darma_vivacite_perdue', 'wanted_darma_zhostile']
}

monsters['wanted_amy_l_empoisonneuse'] = {
    id: 'wanted_amy_l_empoisonneuse',
    name: 'Amy l\'empoisonneuse',
    image: 'img/monstres/wanted/avis/amy_l_empoisonneuse.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 140,
    bst: { hp: 300000, atk: 300, spd: 30,
        res: { neutre: -70, feu: -110, eau: -80, air: -100, terre: -90 } },
    moves: ['wanted_amy_l_empoisonneuse_ronce_animee', 'wanted_amy_l_empoisonneuse_poison_vegetal', 'wanted_amy_l_empoisonneuse_vignes_vampiriques', 'wanted_amy_l_empoisonneuse_stranguronces', 'wanted_amy_l_empoisonneuse_foret_epineuse']
}


monsters['wanted_fojumo'] = {
    id: 'wanted_fojumo',
    name: 'Fojumo',
    image: 'img/monstres/wanted/avis/fojumo.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 140,
    bst: { hp: 160000, atk: 400, spd: 40, res: { neutre: -15, feu: 5, eau: 15, air: 10, terre: 10 } },
    moves: ['wanted_fojumo_assassinat_silencieux', 'wanted_fojumo_substitution_furtive', 'wanted_fojumo_dissimulation_nocive']
}

monsters['wanted_fantomayte'] = {
    id: 'wanted_fantomayte',
    name: 'Fantômayte',
    image: 'img/monstres/wanted/avis/fantomayte.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 150,
    bst: { hp: 180000, atk: 300, spd: 30, res: { neutre: 25, feu: 30, eau: 0, air: 0, terre: 0 } },
    moves: ['wanted_fantomayte_qui_rit', 'wanted_fantomayte_qui_pete', 'wanted_fantomayte_litterature']
}

monsters['wanted_mogligli'] = {
    id: 'wanted_mogligli',
    name: 'Mogligli',
    image: 'img/monstres/wanted/avis/mogligli.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 150,
    bst: { hp: 34000, atk: 300, spd: 30,
        res: { neutre: 20, feu: 30, eau: 0, air: 20, terre: 10 } },
    moves: ['wanted_mogligli_chienchien_rouge', 'wanted_mogligli_au_kanig', 'wanted_mogligli_la_chasse_de_kaa_kaa']
}

monsters['wanted_aigripoil'] = {
    id: 'wanted_aigripoil',
    name: 'Aigripoil',
    image: 'img/monstres/wanted/avis/aigripoil.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 150,
    bst: { hp: 180000, atk: 500, spd: 50,
        res: { neutre: 20, feu: -5, eau: 5, air: 30, terre: 15 } },
    moves: ['wanted_aigripoil_aigrippement', 'wanted_aigripoil_empalladium']
}

monsters['wanted_zatoishwan'] = {
    id: 'wanted_zatoishwan',
    name: 'Zatoïshwan',
    image: 'img/monstres/wanted/avis/zatoishwan.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 150,
    bst: { hp: 180000, atk: 300, spd: 30, res: { neutre: 20, feu: 80, eau: 60, air: 40, terre: 100 } },
    moves: ['wanted_zatoishwan_baton_virevoltant', 'wanted_zatoishwan_fee_verte', 'wanted_zatoishwan_vue_trouble', 'wanted_zatoishwan_flasque_incendiaire', 'wanted_zatoishwan_colere_liquide']
}

monsters['wanted_vengeuse_masquee'] = {
    id: 'wanted_vengeuse_masquee',
    name: 'Vengeuse Masquée',
    image: 'img/monstres/wanted/avis/vengeuse_masquee.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 160,
    bst: { hp: 200000, atk: 300, spd: 30, res: { neutre: 200, feu: 25, eau: 200, air: 25, terre: 25 } },
    moves: ['wanted_vengeuse_masquee_coup_de_bulle', 'wanted_vengeuse_masquee_attaque_vengeresse', 'wanted_vengeuse_masquee_esprit_de_vengeance']
}

monsters['wanted_glandaf_l_aigri'] = {
    id: 'wanted_glandaf_l_aigri',
    name: 'Glandaf l\'Aigri',
    image: 'img/monstres/wanted/avis/glandaf_l_aigri.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 160,
    bst: { hp: 200000, atk: 300, spd: 30,
        res: { neutre: 10, feu: 60, eau: 40, air: 20, terre: 0 } },
    moves: ['wanted_glandaf_l_aigri_gnirdmalg', 'wanted_glandaf_l_aigri_anneau_de_feu', 'wanted_glandaf_l_aigri_grisaille']
}

monsters['wanted_anatak_diskedor'] = {
    id: 'wanted_anatak_diskedor',
    name: 'Anatak Diskedor',
    image: 'img/monstres/wanted/avis/anatak_diskedor.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 160,
    bst: { hp: 200000, atk: 450, spd: 60, res: { neutre: 0, feu: -5, eau: 20, air: 15, terre: 15 } },
    moves: ['wanted_anatak_diskedor_lame_tempete', 'wanted_anatak_diskedor_frappe_purificatrice', 'wanted_anatak_diskedor_coup_de_foudre', 'wanted_anatak_diskedor_coup_de_foudre', 'wanted_anatak_diskedor_frappe_purificatrice', 'wanted_anatak_diskedor_lame_tempete']
}

monsters['wanted_yech_ti'] = {
    id: 'wanted_yech_ti',
    name: 'YeCh\'Ti',
    image: 'img/monstres/wanted/avis/yech_ti.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 170,
    bst: { hp: 220000, atk: 300, spd: 30, res: { neutre: 0, feu: 0, eau: 0, air: 0, terre: 0 } },
    moves: ['wanted_yech_ti_goulaf', 'wanted_yech_ti_che_tout_fraique', 'wanted_yech_ti_ch_est_du_leque_mes_louppes', 'wanted_yech_ti_ti_t_as_bou', 'wanted_yech_ti_ch_est_vraimint_abominap', 'wanted_yech_ti_i_fait_cru', 'wanted_yech_ti_ptio_quinquin', 'wanted_yech_ti_avoir_maux_a_ches_dints', 'wanted_yech_ti_qu_i_est_mieffe_c_ti_la']
}

monsters['wanted_crasper'] = {
    id: 'wanted_crasper',
    name: 'Crasper',
    image: 'img/monstres/wanted/avis/crasper.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 170,
    bst: { hp: 220000, atk: 300, spd: 30,
        res: { neutre: 25, feu: 30, eau: 10, air: 20, terre: 0 } },
    moves: ['wanted_crasper_crasse', 'wanted_crasper_lieu_hante', 'wanted_crasper_amical']
}

monsters['wanted_hin'] = {
    id: 'wanted_hin',
    name: 'Hin',
    image: 'img/monstres/wanted/avis/hin.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 170,
    bst: { hp: 210000, atk: 700, spd: 70,
        res: { neutre: -5, feu: 10, eau: 15, air: -10, terre: 40 } },
    moves: ['wanted_hin_tetropre', 'wanted_hin_pouss_pouss', 'wanted_hin_distanss']
}

monsters['wanted_ka_youloud'] = {
    id: 'wanted_ka_youloud',
    name: 'Ka\'Youloud',
    image: 'img/monstres/wanted/avis/ka_youloud.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 170,
    bst: { hp: 210000, atk: 600, spd: 60,
        res: { neutre: 20, feu: 5, eau: 35, air: 15, terre: 25 } },
    moves: ['wanted_ka_youloud_mache_ouille', 'wanted_ka_youloud_liquide_gastrique', 'wanted_ka_youloud_pas_sage', 'wanted_ka_youloud_mache_ouille', 'wanted_ka_youloud_mache_ouille', 'wanted_ka_youloud_pas_sage', 'wanted_ka_youloud_pas_sage']
}

monsters['wanted_dremoan'] = {
    id: 'wanted_dremoan',
    name: 'Dremoan',
    image: 'img/monstres/wanted/avis/dremoan.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 180,
    bst: { hp: 240000, atk: 300, spd: 30, res: { neutre: 60, feu: 0, eau: 50, air: 40, terre: 50 } },
    moves: ['wanted_dremoan_graine_de_dremoan', 'wanted_dremoan_mains_crochues', 'wanted_dremoan_ronce_de_deperissement', 'wanted_dremoan_ronces_de_l_assassin', 'wanted_dremoan_pourrissement_accelere', 'wanted_dremoan_zombification_putride']
}

monsters['wanted_carter_le_pillard'] = {
    id: 'wanted_carter_le_pillard',
    name: 'Carter le Pillard',
    image: 'img/monstres/wanted/avis/carter_le_pillard.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 180,
    bst: { hp: 250000, atk: 300, spd: 30, res: { neutre: 50, feu: 30, eau: 10, air: 100, terre: 10 } },
    moves: ['wanted_carter_le_pillard_dans_les_vapes', 'wanted_carter_le_pillard_ce_qui_est_a_toi_est_a_moi', 'wanted_carter_le_pillard_souffle_embrume']
}

monsters['wanted_guerrier_du_k_o'] = {
    id: 'wanted_guerrier_du_k_o',
    name: 'Guerrier du K.O.',
    image: 'img/monstres/wanted/avis/guerrier_du_k_o.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 180,
    bst: { hp: 240000, atk: 650, spd: 60, res: { neutre: 20, feu: 10, eau: 5, air: -20, terre: 15 } },
    moves: ['wanted_guerrier_du_k_o_tremblement_de_guerre', 'wanted_guerrier_du_k_o_massacre_a_retardement', 'wanted_guerrier_du_k_o_carnageddon']
}

monsters['wanted_shushu_debruk_sayl'] = {
    id: 'wanted_shushu_debruk_sayl',
    name: 'Shushu Debruk\'Sayl',
    image: 'img/monstres/wanted/avis/shushu_debruk_sayl.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 180,
    bst: { hp: 250000, atk: 333, spd: 33, res: { neutre: 3, feu: 33, eau: 33, air: 33, terre: 33 } },
    moves: ['wanted_shushu_debruk_sayl_assimilation_d_energies', 'wanted_shushu_debruk_sayl_mue_demoniaque', 'wanted_shushu_debruk_sayl_malediction_cuisante', 'wanted_shushu_debruk_sayl_poing_des_secousses_deferlantes', 'wanted_shushu_debruk_sayl_poing_des_vents_brulants']
}

monsters['wanted_flasho'] = {
    id: 'wanted_flasho',
    name: 'Flasho',
    image: 'img/monstres/wanted/avis/flasho.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 190,
    bst: { hp: 240000, atk: 300, spd: 30, res: { neutre: 30, feu: 50, eau: 10, air: 50, terre: 0 } },
    moves: ['wanted_flasho_courant_d_air', 'wanted_flasho_agitation_moleculaire', 'wanted_flasho_amende', 'wanted_flasho_vibration_moleculaire']
}

monsters['wanted_viti_glourson'] = {
    id: 'wanted_viti_glourson',
    name: 'Viti Glourson',
    image: 'img/monstres/wanted/avis/viti_glourson.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 190,
    bst: { hp: 290000, atk: 300, spd: 30, res: { neutre: 50, feu: 10, eau: 0, air: 10, terre: 30 } },
    moves: ['wanted_viti_glourson_miel_cicatrisant', 'wanted_viti_glourson_mielodie', 'wanted_viti_glourson_crepe_au_miel', 'wanted_viti_glourson_gloursonnerie', 'wanted_viti_glourson_statue_de_miel']
}

monsters['wanted_fuji_givrefoux'] = {
    id: 'wanted_fuji_givrefoux',
    name: 'Fuji Givrefoux',
    image: 'img/monstres/wanted/avis/fuji_givrefoux.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 190,
    bst: { hp: 270000, atk: 300, spd: 30, res: { neutre: -6, feu: 14, eau: 12, air: -11, terre: 6 } },
    moves: ['wanted_fuji_givrefoux_progeniture', 'wanted_fuji_givrefoux_lait_maternel', 'wanted_fuji_givrefoux_foufoux']
}

monsters['wanted_docteur_eggob'] = {
    id: 'wanted_docteur_eggob',
    name: 'Docteur Eggob',
    image: 'img/monstres/wanted/avis/docteur_eggob.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 190,
    bst: { hp: 280000, atk: 300, spd: 30, res: { neutre: 200, feu: 0, eau: 0, air: 0, terre: 0 } },
    moves: ['wanted_docteur_eggob_gobus_chaotique', 'wanted_docteur_eggob_robotisation', 'wanted_docteur_eggob_rayon_emeraude', 'wanted_docteur_eggob_uf_de_la_mort']
}

monsters['wanted_sans_visage'] = {
    id: 'wanted_sans_visage',
    name: 'Sans Visage',
    image: 'img/monstres/wanted/avis/sans_visage.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 190,
    bst: { hp: 270000, atk: 300, spd: 30,
        res: { neutre: 50, feu: 20, eau: 5, air: 10, terre: 15 } },
    moves: ['wanted_sans_visage_rage_avide', 'wanted_sans_visage_air_electrifiant', 'wanted_sans_visage_rage_foudroyante', 'wanted_sans_visage_invocation_de_bak']
}

monsters['wanted_predagob'] = {
    id: 'wanted_predagob',
    name: 'Predagob',
    image: 'img/monstres/wanted/avis/predagob.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 190,
    bst: { hp: 260000, atk: 300, spd: 30, res: { neutre: 40, feu: 10, eau: 25, air: 20, terre: 70 } },
    moves: ['wanted_predagob_moa_chasser_bestioles', 'wanted_predagob_mine_gobliterante', 'wanted_predagob_gobseques']
}

monsters['wanted_buldalazred'] = {
    id: 'wanted_buldalazred',
    name: 'Buldalazred',
    image: 'img/monstres/wanted/avis/buldalazred.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 200,
    bst: { hp: 290000, atk: 800, spd: 80, res: { neutre: 35, feu: 10, eau: 20, air: 5, terre: 25 } },
    moves: ['wanted_buldalazred_piege_dimensionnel', 'wanted_buldalazred_uction']
}

monsters['wanted_takomako'] = {
    id: 'wanted_takomako',
    name: 'Takomako',
    image: 'img/monstres/wanted/avis/takomako.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 200,
    bst: { hp: 290000, atk: 800, spd: 80, res: { neutre: 20, feu: 35, eau: 25, air: 5, terre: 10 } },
    moves: ['wanted_takomako_takotak', 'wanted_takomako_makomak']
}

monsters['wanted_homard_medali'] = {
    id: 'wanted_homard_medali',
    name: 'Homard Medali',
    image: 'img/monstres/wanted/avis/homard_medali.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 200,
    bst: { hp: 290000, atk: 800, spd: 80, res: { neutre: 15, feu: -5, eau: 10, air: 30, terre: 20 } },
    moves: ['wanted_homard_medali_drachetaulque', 'wanted_homard_medali_hypercut', 'wanted_homard_medali_telepunch']
}

monsters['wanted_glourdorak'] = {
    id: 'wanted_glourdorak',
    name: 'Glourdorak',
    image: 'img/monstres/wanted/avis/glourdorak.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 200,
    bst: { hp: 340000, atk: 300, spd: 30, res: { neutre: 0, feu: 0, eau: 0, air: 0, terre: 0 } },
    moves: ['wanted_glourdorak_gloursofulgur', 'wanted_glourdorak_gloursopoing', 'wanted_glourdorak_dard_des_villes', 'wanted_glourdorak_gloursolaser', 'wanted_glourdorak_ruche_hour', 'wanted_glourdorak_miel_de_jouvence']
}

monsters['wanted_mekamouth'] = {
    id: 'wanted_mekamouth',
    name: 'Mekamouth',
    image: 'img/monstres/wanted/avis/mekamouth.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 200,
    bst: { hp: 340000, atk: 300, spd: 30, res: { neutre: 25, feu: 50, eau: -15, air: -20, terre: 35 } },
    moves: ['wanted_mekamouth_glyglyphe', 'wanted_mekamouth_mekabouste', 'wanted_mekamouth_la_defense_c_est_l_attaque', 'wanted_mekamouth_liquide_de_refroidissement', 'wanted_mekamouth_surtension', 'wanted_mekamouth_spahunglif']
}

monsters['wanted_culbutuf'] = {
    id: 'wanted_culbutuf',
    name: 'Culbutœuf',
    image: 'img/monstres/wanted/avis/culbutuf.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 200,
    bst: { hp: 300000, atk: 300, spd: 30, res: { neutre: 25, feu: 40, eau: 35, air: -10, terre: -15 } },
    moves: ['wanted_culbutuf_du_fond_du_cur', 'wanted_culbutuf_roule_ma_boule', 'wanted_culbutuf_sinistro_vole', 'wanted_culbutuf_de_bon_cur', 'wanted_culbutuf_va_te_faire_cuire_un_uf']
}

monsters['wanted_chevalier_de_glace'] = {
    id: 'wanted_chevalier_de_glace',
    name: 'Chevalier de Glace',
    image: 'img/monstres/wanted/avis/chevalier_de_glace.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 200,
    bst: { hp: 320000, atk: 300, spd: 30, res: { neutre: 25, feu: -15, eau: -20, air: 35, terre: 50 } },
    moves: ['wanted_chevalier_de_glace_rafraichissement', 'wanted_chevalier_de_glace_souffler_n_est_pas_jouer', 'wanted_chevalier_de_glace_souffle_amollissant', 'wanted_chevalier_de_glace_la_force_du_faible', 'wanted_chevalier_de_glace_tranchant_absorbant', 'wanted_chevalier_de_glace_saut']
}

monsters['wanted_psikopompe'] = {
    id: 'wanted_psikopompe',
    name: 'Psikopompe',
    image: 'img/monstres/wanted/avis/psikopompe.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 200,
    bst: { hp: 320000, atk: 300, spd: 30, res: { neutre: 25, feu: -25, eau: 50, air: 45, terre: -20 } },
    moves: ['wanted_psikopompe_coupe_jatte', 'wanted_psikopompe_sentence', 'wanted_psikopompe_bondage', 'wanted_psikopompe_flagellation_stimulante', 'wanted_psikopompe_retour_a_l_envoyeur']
}

monsters['wanted_le_fantome_braideur'] = {
    id: 'wanted_le_fantome_braideur',
    name: 'Le Fantôme Braïdeur',
    image: 'img/monstres/wanted/avis/le_fantome_braideur.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 200,
    bst: { hp: 300000, atk: 300, spd: 30, res: { neutre: 15, feu: 10, eau: 35, air: 35, terre: 15 } },
    moves: ['wanted_le_fantome_braideur_paleolitige', 'wanted_le_fantome_braideur_carroyage', 'wanted_le_fantome_braideur_mastaba']
}

monsters['wanted_voldelor'] = {
    id: 'wanted_voldelor',
    name: 'Voldelor',
    image: 'img/monstres/wanted/avis/voldelor.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 200,
    bst: { hp: 290000, atk: 800, spd: 80, res: { neutre: 20, feu: 35, eau: -5, air: 15, terre: 10 } },
    moves: ['wanted_voldelor_sort_scelle', 'wanted_voldelor_magitation', 'wanted_voldelor_armada_cadavra', 'wanted_voldelor_retour_a_la_vie']
}

monsters['wanted_sicogne'] = {
    id: 'wanted_sicogne',
    name: 'Sicogne',
    image: 'img/monstres/wanted/avis/sicogne.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 200,
    bst: { hp: 290000, atk: 575, spd: 90, res: { neutre: 30, feu: -10, eau: 15, air: 35, terre: 20 } },
    moves: ['wanted_sicogne_charge_destructrice', 'wanted_sicogne_superpuissance', 'wanted_sicogne_annihilation', 'wanted_sicogne_agression']
}

monsters['wanted_mi'] = {
    id: 'wanted_mi',
    name: 'Mi',
    image: 'img/monstres/wanted/avis/mi.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 200,
    bst: { hp: 300000, atk: 800, spd: 80, res: { neutre: 0, feu: 0, eau: 0, air: 0, terre: 0 } },
    moves: ['wanted_mi_enveloppage']
}

monsters['wanted_fou'] = {
    id: 'wanted_fou',
    name: 'Fou',
    image: 'img/monstres/wanted/avis/fou.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 200,
    bst: { hp: 300000, atk: 800, spd: 80, res: { neutre: 0, feu: 0, eau: 0, air: 0, terre: 0 } },
    moves: ['wanted_fou_coupe']
}

monsters['wanted_chi'] = {
    id: 'wanted_chi',
    name: 'Chi',
    image: 'img/monstres/wanted/avis/chi.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 200,
    bst: { hp: 300000, atk: 800, spd: 80, res: { neutre: 15, feu: 15, eau: 15, air: 15, terre: 15 } },
    moves: ['wanted_chi_emoussage']
}

monsters['wanted_ganos'] = {
    id: 'wanted_ganos',
    name: 'Ganos',
    image: 'img/monstres/wanted/avis/ganos.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 200,
    bst: { hp: 250000, atk: 1000, spd: 100, res: { neutre: 20, feu: -5, eau: 15, air: 15, terre: 15 } },
    moves: ['wanted_ganos_matatak', 'wanted_ganos_sanglinglin', 'wanted_ganos_sabotage', 'wanted_ganos_taure_ture', 'wanted_ganos_lardage', 'wanted_ganos_sanglissade', 'wanted_ganos_taure_peur', 'wanted_ganos_rugibier', 'wanted_ganos_groincision']
}

monsters['wanted_hyperscampe'] = {
    id: 'wanted_hyperscampe',
    name: 'Hyperscampe',
    image: 'img/monstres/wanted/avis/hyperscampe.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 200,
    bst: { hp: 300000, atk: 500, spd: 50, res: { neutre: 40, feu: 30, eau: 15, air: 25, terre: 10 } },
    moves: ['wanted_hyperscampe_riveteuse', 'wanted_hyperscampe_percussion', 'wanted_hyperscampe_rupture', 'wanted_hyperscampe_forage']
}

monsters['wanted_grand_kongoku'] = {
    id: 'wanted_grand_kongoku',
    name: 'Grand Kongoku',
    image: 'img/monstres/wanted/avis/grand_kongoku.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 200,
    bst: { hp: 300000, atk: 1125, spd: 100, res: { neutre: 15, feu: 15, eau: -10, air: -5, terre: 20 } },
    moves: ['wanted_grand_kongoku_puissance_lunaire', 'wanted_grand_kongoku_invocation_de_la_cocolune', 'wanted_grand_kongoku_deplacement_instantane', 'wanted_grand_kongoku_saruharuha', 'wanted_grand_kongoku_uppercut_magistral', 'wanted_grand_kongoku_saruharuha', 'wanted_grand_kongoku_uppercut_magistral', 'wanted_grand_kongoku_deplacement_instantane']
}

monsters['wanted_khepricorne'] = {
    id: 'wanted_khepricorne',
    name: 'Khepricorne',
    image: 'img/monstres/wanted/avis/khepricorne.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 200,
    bst: { hp: 320000, atk: 300, spd: 30, res: { neutre: 15, feu: 25, eau: 5, air: 10, terre: 20 } },
    moves: ['wanted_khepricorne_coup_de_bouse', 'wanted_khepricorne_bouse_de_feu', 'wanted_khepricorne_roule_bouse', 'wanted_khepricorne_avoir_les_bouses', 'wanted_khepricorne_bouse_de_la']
}

monsters['wanted_panteroz'] = {
    id: 'wanted_panteroz',
    name: 'Pantèroz',
    image: 'img/monstres/wanted/avis/panteroz.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 150,
    bst: { hp: 60000, atk: 800, spd: 80, res: { neutre: 0, feu: 0, eau: 0, air: 0, terre: 0 } },
    moves: ['wanted_panteroz_grift', 'wanted_panteroz_rayondule']
}

monsters['wanted_mouchame'] = {
    id: 'wanted_mouchame',
    name: 'Mouchâme',
    image: 'img/monstres/wanted/avis/mouchame.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 160,
    bst: { hp: 68000, atk: 600, spd: 60,
        res: { neutre: 0, feu: 0, eau: 0, air: 0, terre: 0 } },
    moves: ['wanted_mouchame_herd']
}

monsters['wanted_gein'] = {
    id: 'wanted_gein',
    name: 'Gein',
    image: 'img/monstres/wanted/avis/gein.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 200,
    bst: { hp: 240000, atk: 1200, spd: 120, res: { neutre: 0, feu: 0, eau: 0, air: 0, terre: 0 } },
    moves: ['wanted_gein_paralysie', 'wanted_gein_substitution_funebre', 'wanted_gein_eveil_des_ames_perdues']
}

monsters['wanted_cire_momore'] = {
    id: 'wanted_cire_momore',
    name: 'Cire Momore',
    image: 'images/monsters/Cire_Momore.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 200,
    bst: { hp: 700000, atk: 500, spd: 90, res: { neutre: 27, feu: 27, eau: 27, air: 27, terre: 27 } },
    moves: ['wanted_cire_momore_metal_hurlant', 'wanted_cire_momore_briselame', 'wanted_cire_momore_triste_cire', 'wanted_cire_momore_fatalite']
}

monsters['wanted_gargandyas'] = {
    id: 'wanted_gargandyas',
    name: 'Gargandyas',
    image: 'images/monsters/Gargandyas.png',
    rarity: 'legendaire',
    tier: 'boss',
    fixedLevel: 200,
    bst: { hp: 100000, atk: 300, spd: 0, res: { neutre: 0, feu: 0, eau: 0, air: 0, terre: 0 } },
    moves: ['wanted_gargandyas_sceaux_telluriques', 'wanted_gargandyas_amnesie_animale', 'wanted_gargandyas_cri_primitif', 'wanted_gargandyas_rituel_primordial', 'wanted_gargandyas_gargameha', 'wanted_gargandyas_rafale_bestiale']
}
// ─── Avis de Recherche ───────────────────────────────────────────────────────

const WantedBosses = {
    'wanted_sam_sagaz': {
        id:        'wanted_sam_sagaz',
        monsterId: 'wanted_sam_sagaz',
        name:      'Sam Sagaz',
        lore:      'Jardinier fou reconverti en artificier végétal, Sam Sagaz a fait de son potager un champ de mines odorant. Ses anneaux de gaz et l\'appel de son fidèle compagnon Bolesh ont mis fin à bien des aventures prometteuses.',
        icon:      'img/monstres/wanted/avis/sam_sagaz.png',
        background: '',
        levelCap:  20,
        bst:       { hp: 6500, atk: 300 },
        panoplie:  [{ itemId: 'amulette_d_hectaupe', dropRate: 0.1 }, { itemId: 'anneau_d_hectaupe', dropRate: 0.1 }, { itemId: 'ceinture_d_hectaupe', dropRate: 0.1 }]
    },
    'wanted_fouduglen_l_ecureuil': {
        id:        'wanted_fouduglen_l_ecureuil',
        monsterId: 'wanted_fouduglen_l_ecureuil',
        name:      'Fouduglen l\'Écureuil',
        lore:      'Fouduglen est l\'écureuil le plus redouté d\'Amakna. Sa discrétion proverbiale en fait une cible quasi impossible à surprendre, et ses noisettes transformées en projectiles ont déconcerté plus d\'un chasseur de prime.',
        icon:      'img/monstres/wanted/avis/fouduglen_l_ecureuil.png',
        background: '',
        levelCap:  20,
        bst:       { hp: 6700, atk: 300 },
        panoplie:  [{ itemId: 'amulette_de_fouduglen', dropRate: 0.1 }, { itemId: 'bottes_de_fouduglen', dropRate: 0.1 }, { itemId: 'coiffe_de_fouduglen', dropRate: 0.1 }]
    },
    'wanted_maitre_boulet': {
        id:        'wanted_maitre_boulet',
        monsterId: 'wanted_maitre_boulet',
        name:      'Maître Boulet',
        lore:      'Ancien bûcheron devenu sorcier végétal, Maître Boulet commande aux tournesols comme d\'autres commandent à des soldats. Son débitage est précis, son acculement implacable, et personne n\'a encore réussi à lui expliquer ce qu\'il y a de drôle dans son surnom.',
        icon:      'img/monstres/wanted/avis/maitre_boulet.png',
        background: '',
        levelCap:  30,
        bst:       { hp: 12000, atk: 300 },
        panoplie:  [{ itemId: 'baton_carnivore', dropRate: 0.1 }, { itemId: 'toady', dropRate: 0.1 }, { itemId: 'ceinture_de_phong_huss', dropRate: 0.1 }, { itemId: 'bottes_de_phong_huss', dropRate: 0.1 }, { itemId: 'anneau_de_phong_huss', dropRate: 0.1 }]
    },
    'wanted_frakacia_leukocytine': {
        id:        'wanted_frakacia_leukocytine',
        monsterId: 'wanted_frakacia_leukocytine',
        name:      'Frakacia Leukocytine',
        lore:      'Frakacia Leukocytine est une scientifique dont les travaux sur les leucocytes ont largement débordé du cadre académique. Sa carapace fracassante et son hyperleukocytine en font une adversaire dont les expériences ne profitent qu\'à elle seule.',
        icon:      'img/monstres/wanted/avis/frakacia_leukocytine.png',
        background: '',
        levelCap:  30,
        bst:       { hp: 13000, atk: 300 },
        panoplie:  [{ itemId: 'masque_de_frakacia', dropRate: 0.1 }, { itemId: 'bottes_de_frakacia', dropRate: 0.1 }, { itemId: 'gant_de_frakacia', dropRate: 0.1 }]
    },
    'wanted_ambi_guman': {
        id:        'wanted_ambi_guman',
        monsterId: 'wanted_ambi_guman',
        name:      'Ambi Guman',
        lore:      'Ambi Guman, l\'aîné de la tribu Guman, défend son territoire avec la robustesse d\'un légume centenaire. Ses roquettes et ses enfants de la terre témoignent d\'une maîtrise élémentaire que ses adversaires apprennent trop souvent à leurs dépens.',
        icon:      'img/monstres/wanted/avis/ambi_guman.png',
        background: '',
        levelCap:  30,
        bst:       { hp: 14000, atk: 200 },
        panoplie:  [{ itemId: 'caponion', dropRate: 0.1 }, { itemId: 'bottes_donion', dropRate: 0.1 }, { itemId: 'chaponion', dropRate: 0.1 }]
    },
    'wanted_exi_guman': {
        id:        'wanted_exi_guman',
        monsterId: 'wanted_exi_guman',
        name:      'Exi Guman',
        lore:      'Exi Guman, le cadet nerveux de la famille, compense son manque d\'expérience par une agressivité débordante. Ses spatezoignons et ses pousses éphémères ont semé la panique dans les rangs d\'aventuriers bien mieux équipés que lui.',
        icon:      'img/monstres/wanted/avis/exi_guman.png',
        background: '',
        levelCap:  30,
        bst:       { hp: 11000, atk: 200 },
        panoplie:  [{ itemId: 'amuronce', dropRate: 0.1 }, { itemId: 'ceinturonce', dropRate: 0.1 }]
    },
    'wanted_roub_ignolles': {
        id:        'wanted_roub_ignolles',
        monsterId: 'wanted_roub_ignolles',
        name:      'Roub\' Ignolles',
        lore:      'Roub\' Ignolles est un artificier dont les créations explosent selon leur propre calendrier. Sa téléportabombe et ses bombes poussées ont transformé plus d\'un champ de bataille en spectacle pyrotechnique involontaire.',
        icon:      'img/monstres/wanted/avis/roub_ignolles.png',
        background: '',
        levelCap:  40,
        bst:       { hp: 12000, atk: 300 },
        panoplie:  [{ itemId: 'amulette_de_kubitus', dropRate: 0.1 }, { itemId: 'ceinture_de_kubitus', dropRate: 0.1 }, { itemId: 'bottes_de_kubitus', dropRate: 0.1 }]
    },
    'wanted_bouss_baybe': {
        id:        'wanted_bouss_baybe',
        monsterId: 'wanted_bouss_baybe',
        name:      'Bouss Baybe',
        lore:      'Madame Bouss Baybe tient ce qu\'on appelle poliment un salon porcin. Ses soins sont douloureux, son accueil mitigé, et son économduire vers la sortie est rarement volontaire de la part du visiteur.',
        icon:      'img/monstres/wanted/avis/bouss_baybe.png',
        background: '',
        levelCap:  50,
        bst:       { hp: 31000, atk: 300 },
        panoplie:  [{ itemId: 'ceinture_de_stroud', dropRate: 0.1 }, { itemId: 'bottes_de_stroud', dropRate: 0.1 }, { itemId: 'ceinture_de_piggy_paupe', dropRate: 0.1 }, { itemId: 'amulette_de_piggy_paupe', dropRate: 0.1 }, { itemId: 'anneau_de_piggy_paupe', dropRate: 0.1 }, { itemId: 'ceinture_lardiere', dropRate: 0.1 }, { itemId: 'jambanneau', dropRate: 0.1 }]
    },
    'wanted_ogivol_scalarcin': {
        id:        'wanted_ogivol_scalarcin',
        monsterId: 'wanted_ogivol_scalarcin',
        name:      'Ogivol Scalarcin',
        lore:      'Ogivol Scalarcin est une entité électrique dont chaque attaque porte son propre préfixe « ogivo ». Son champ de bataille ressemble à une leçon de vocabulaire sous haute tension, et ses adversaires finissent électrisés, volatilisés, ou les deux.',
        icon:      'img/monstres/wanted/avis/ogivol_scalarcin.png',
        background: '',
        levelCap:  50,
        bst:       { hp: 31000, atk: 300 },
        panoplie:  [{ itemId: 'mitaine_des_scalarcin', dropRate: 0.1 }, { itemId: 'chaussettes_des_scalarcin', dropRate: 0.1 }, { itemId: 'dagu_os_des_scalarcin', dropRate: 0.1 }]
    },
    'wanted_nono_le_wobot': {
        id:        'wanted_nono_le_wobot',
        monsterId: 'wanted_nono_le_wobot',
        name:      'Nono le Wobot',
        lore:      'Nono est un Wobot à la mécanique approximative mais aux résultats indéniables. Sa massue matraquante et son wavelot explosif démontrent qu\'on peut être mal assemblé et tout à fait redoutable.',
        icon:      'img/monstres/wanted/avis/nono_le_wobot.png',
        background: '',
        levelCap:  60,
        bst:       { hp: 41000, atk: 300 },
        panoplie:  [{ itemId: 'anneau_de_karotz', dropRate: 0.1 }, { itemId: 'amulette_de_karotz', dropRate: 0.1 }, { itemId: 'bottes_de_karotz', dropRate: 0.1 }]
    },
    'wanted_brumen_tinctorias': {
        id:        'wanted_brumen_tinctorias',
        monsterId: 'wanted_brumen_tinctorias',
        name:      'Brumen Tinctorias',
        lore:      'Brumen Tinctorias, alchimiste de Bonta, concocte des élixirs aux effets aussi variés qu\'imprévisibles. Ses poisons et ses soins étant souvent interchangeables, ses adversaires ne savent jamais sur quel pied danser — jusqu\'à ce qu\'ils ne puissent plus danser du tout.',
        icon:      'img/monstres/wanted/avis/brumen_tinctorias.png',
        background: '',
        levelCap:  60,
        bst:       { hp: 43000, atk: 300 },
        panoplie:  [{ itemId: 'alliance_apaisante', dropRate: 0.1 }, { itemId: 'pendentif_curatif', dropRate: 0.1 }, { itemId: 'ceinture_anesthesiante', dropRate: 0.1 }]
    },
    'wanted_marzwel_le_gobelin': {
        id:        'wanted_marzwel_le_gobelin',
        monsterId: 'wanted_marzwel_le_gobelin',
        name:      'Marzwel le Gobelin',
        lore:      'Marzwel le Gobelin est l\'un des rares gobelins à avoir acquis une réputation méritée plutôt qu\'héritée par peur. Son déguisement et ses appels à la horde ont fait de lui un chef de guerre redouté, aussi habile à fuir qu\'à frapper.',
        icon:      'img/monstres/wanted/avis/marzwel_le_gobelin.png',
        background: '',
        levelCap:  60,
        bst:       { hp: 41000, atk: 300 },
        panoplie:  [{ itemId: 'oreilles_de_marzwel', dropRate: 0.1 }, { itemId: 'bracelet_de_marzwel', dropRate: 0.1 }, { itemId: 'javeline_de_marzwel', dropRate: 0.1 }]
    },
    'wanted_gadoo': {
        id:        'wanted_gadoo',
        monsterId: 'wanted_gadoo',
        name:      'Gadoo',
        lore:      'Gadoo est une créature dont la loyauté envers aucune faction n\'est claire. Sa détresse et ses pleurs semblent désarmants — jusqu\'à ce que ses alliés surgissent de nulle part et que la situation bascule irrémédiablement.',
        icon:      'img/monstres/wanted/avis/gadoo.png',
        background: '',
        levelCap:  60,
        bst:       { hp: 44000, atk: 100 },
        panoplie:  []
    },
    'wanted_armada_l_invincible': {
        id:        'wanted_armada_l_invincible',
        monsterId: 'wanted_armada_l_invincible',
        name:      'Armada l\'Invincible',
        lore:      'Armada l\'Invincible ne porte pas son surnom par modestie. Chaque cicatrice de son armure correspond à un adversaire qui a cru pouvoir l\'abattre et n\'est jamais revenu le raconter.',
        icon:      'img/monstres/wanted/avis/armada_l_invincible.png',
        background: '',
        levelCap:  70,
        bst:       { hp: 53000, atk: 300 },
        panoplie:  []
    },
    'wanted_qil_bil': {
        id:        'wanted_qil_bil',
        monsterId: 'wanted_qil_bil',
        name:      'Qil Bil',
        lore:      'Qil Bil est le genre de créature que l\'on croise rarement deux fois — non par peur de la recroiser, mais parce que la première rencontre est généralement sans appel. Sa fréquence de résonance et son onde de choc témoignent d\'une maîtrise acoustique dévastatrice.',
        icon:      'img/monstres/wanted/avis/qil_bil.png',
        background: '',
        levelCap:  70,
        bst:       { hp: 53000, atk: 300 },
        panoplie:  [{ itemId: 'casque_de_qil_bil', dropRate: 0.1 }, { itemId: 'anneau_de_qil_bil', dropRate: 0.1 }, { itemId: 'tonfas_de_qil_bil', dropRate: 0.1 }]
    },
    'wanted_dragodingo': {
        id:        'wanted_dragodingo',
        monsterId: 'wanted_dragodingo',
        name:      'Dragodingo',
        lore:      'Dragodingo est le résultat malheureux d\'une expérimentation croisée entre un dragon et un dingo. Aucune des deux espèces ne revendique la paternité, mais ses crachats et ses attaques frénétiques témoignent que le mélange n\'était peut-être pas la meilleure idée.',
        icon:      'img/monstres/wanted/avis/dragodingo.png',
        background: '',
        levelCap:  80,
        bst:       { hp: 66000, atk: 300 },
        panoplie:  []
    },
    'wanted_aermyne_braco_scalptaras': {
        id:        'wanted_aermyne_braco_scalptaras',
        monsterId: 'wanted_aermyne_braco_scalptaras',
        name:      'Aermyne \'Braco\' Scalptaras',
        lore:      'Aermyne \'Braco\' Scalptaras est une pâtissière qui a troqué la douceur des choux à la crème contre la violence des rouleau-à-pâtisserie. Sa cape et sa coiffe n\'ont rien perdu de leur élégance, mais son sens de l\'hospitalité laisse sérieusement à désirer.',
        icon:      'img/monstres/wanted/avis/aermyne_braco_scalptaras.png',
        background: '',
        levelCap:  80,
        bst:       { hp: 66000, atk: 300 },
        panoplie:  [{ itemId: 'rouleau_a_patisserie_d_aermyne', dropRate: 0.1 }, { itemId: 'cape_d_aermyne', dropRate: 0.1 }, { itemId: 'coiffe_d_aermyne', dropRate: 0.1 }, { itemId: 'bague_des_scalptaras', dropRate: 0.1 }, { itemId: 'tablier_des_scalptaras', dropRate: 0.1 }, { itemId: 'bottines_des_scalptaras', dropRate: 0.1 }]
    },
    'wanted_musha_l_oni': {
        id:        'wanted_musha_l_oni',
        monsterId: 'wanted_musha_l_oni',
        name:      'Musha L\'Oni',
        lore:      'Musha L\'Oni est un esprit guerrier aux origines nippones dont la capuche dissimule des yeux qui voient bien au-delà des vivants. Son voile de résistance et son bouclier en font un adversaire qui encaisse aussi bien qu\'il frappe.',
        icon:      'img/monstres/wanted/avis/musha_l_oni.png',
        background: '',
        levelCap:  80,
        bst:       { hp: 66000, atk: 300 },
        panoplie:  [{ itemId: 'capuche_de_musha', dropRate: 0.1 }, { itemId: 'voile_de_musha', dropRate: 0.1 }, { itemId: 'boucli_il_de_musha', dropRate: 0.1 }]
    },
    'wanted_tyranne_la_terrible': {
        id:        'wanted_tyranne_la_terrible',
        monsterId: 'wanted_tyranne_la_terrible',
        name:      'Tyranne la Terrible',
        lore:      'Tyranne la Terrible a obtenu son titre non par héritage, mais par élimination progressive de quiconque osait le lui contester. Sa cape et son gant de domination confirment que son règne, bien que brutal, reste parfaitement organisé.',
        icon:      'img/monstres/wanted/avis/tyranne_la_terrible.png',
        background: '',
        levelCap:  80,
        bst:       { hp: 66000, atk: 350 },
        panoplie:  [{ itemId: 'capuche_de_tyranne', dropRate: 0.1 }, { itemId: 'ceinture_de_tyranne', dropRate: 0.1 }, { itemId: 'gant_de_tyranne', dropRate: 0.1 }]
    },
    'wanted_tournade': {
        id:        'wanted_tournade',
        monsterId: 'wanted_tournade',
        name:      'Tournade',
        lore:      'Tournade surgit sans prévenir et repart en laissant derrière elle un silence pesant et des débris de ce qui était encore des aventuriers prometteurs. Il paraît qu\'elle ne choisit pas ses victimes — c\'est juste qu\'elle ne fait pas la différence.',
        icon:      'img/monstres/wanted/avis/tournade.png',
        background: '',
        levelCap:  80,
        bst:       { hp: 62000, atk: 250 },
        panoplie:  []
    },
    'wanted_degolas': {
        id:        'wanted_degolas',
        monsterId: 'wanted_degolas',
        name:      'Degolas',
        lore:      'Degolas est un archer dont la précision légendaire n\'est dépassée que par son ego. Chaque flèche qu\'il tire porte un nom — généralement celui de sa prochaine cible.',
        icon:      'img/monstres/wanted/avis/degolas.png',
        background: '',
        levelCap:  90,
        bst:       { hp: 79000, atk: 300 },
        panoplie:  []
    },
    'wanted_rok_gnorok': {
        id:        'wanted_rok_gnorok',
        monsterId: 'wanted_rok_gnorok',
        name:      'Rok Gnorok',
        lore:      'Rok Gnorok est une masse de roche et de mauvaise volonté. Son porte-bonheur ne porte chance qu\'à lui, et son rempierre ne laisse guère de chances à ses adversaires de s\'en relever.',
        icon:      'img/monstres/wanted/avis/rok_gnorok.png',
        background: '',
        levelCap:  90,
        bst:       { hp: 79000, atk: 300 },
        panoplie:  [{ itemId: 'porte_bonheur_de_rok_gnorok', dropRate: 0.1 }, { itemId: 'le_rok_gnorok', dropRate: 0.1 }, { itemId: 'rempierre_de_rok_gnorok', dropRate: 0.1 }]
    },
    'wanted_simbadas': {
        id:        'wanted_simbadas',
        monsterId: 'wanted_simbadas',
        name:      'Simbadas',
        lore:      'Simbadas a sillonné les mers du monde en quête de richesses introuvables et de monstres improbables. Sa cage et ses barrières témoignent d\'une longue expérience à emprisonner ce qui voulait lui résister — ce qui finit toujours par inclure ses adversaires.',
        icon:      'img/monstres/wanted/avis/simbadas.png',
        background: '',
        levelCap:  90,
        bst:       { hp: 80000, atk: 300 },
        panoplie:  [{ itemId: 'cage_de_simbadas', dropRate: 0.1 }, { itemId: 'barriere_de_simbadas', dropRate: 0.1 }, { itemId: 'patte_de_simbadas', dropRate: 0.1 }]
    },
    'wanted_prince_marchand': {
        id:        'wanted_prince_marchand',
        monsterId: 'wanted_prince_marchand',
        name:      'Prince Marchand',
        lore:      'Le Prince Marchand a bâti sa fortune sur des affaires dont personne ne comprend vraiment la nature. Ce qui est certain, c\'est que le prix de l\'affronter est bien plus élevé que ce qu\'il laisse entendre.',
        icon:      'img/monstres/wanted/avis/prince_marchand.png',
        background: '',
        levelCap:  100,
        bst:       { hp: 96000, atk: 300 },
        panoplie:  [{ itemId: 'casque_de_maitre_nabur', dropRate: 0.1 }, { itemId: 'ceinture_ding_dong', dropRate: 0.1 }]
    },
    'wanted_maxi_malle': {
        id:        'wanted_maxi_malle',
        monsterId: 'wanted_maxi_malle',
        name:      'Maxi-Malle',
        lore:      'Maxi-Malle est ce que vous obtenez quand vous ouvrez un coffre sans lire l\'avertissement. Personne ne sait ce qu\'il y a à l\'intérieur, et ceux qui ont cherché à le savoir n\'ont pas eu l\'occasion de partager leur découverte.',
        icon:      'img/monstres/wanted/avis/maxi_malle.png',
        background: '',
        levelCap:  100,
        bst:       { hp: 89000, atk: 300 },
        panoplie:  []
    },
    'wanted_naganita': {
        id:        'wanted_naganita',
        monsterId: 'wanted_naganita',
        name:      'Naganita',
        lore:      'Naganita est une guerrière dont la naginata a goûté à plus de sang que de rouille. Sa cape de résistance et son collier de précision font d\'elle une adversaire qui ne laisse ni ouverture ni survivant.',
        icon:      'img/monstres/wanted/avis/naganita.png',
        background: '',
        levelCap:  100,
        bst:       { hp: 94000, atk: 375 },
        panoplie:  [{ itemId: 'cape_de_naganita', dropRate: 0.1 }, { itemId: 'collier_de_naganita', dropRate: 0.1 }, { itemId: 'naginata_de_naganita', dropRate: 0.1 }]
    },
    'wanted_trukipik': {
        id:        'wanted_trukipik',
        monsterId: 'wanted_trukipik',
        name:      'Trukipik',
        lore:      'Trukipik n\'a aucune raison évidente d\'être aussi en colère — si ce n\'est d\'être couvert de piques de la tête aux pieds, ce qui peut effectivement affecter l\'humeur. Ses adversaires apprennent trop tard que le toucher n\'était pas une bonne idée.',
        icon:      'img/monstres/wanted/avis/trukipik.png',
        background: '',
        levelCap:  100,
        bst:       { hp: 94000, atk: 375 },
        panoplie:  [{ itemId: 'chapokipik', dropRate: 0.1 }, { itemId: 'martokipik', dropRate: 0.1 }, { itemId: 'ekukipik', dropRate: 0.1 }]
    },
    'wanted_carlita_de_l_aguerfelde': {
        id:        'wanted_carlita_de_l_aguerfelde',
        monsterId: 'wanted_carlita_de_l_aguerfelde',
        name:      'Carlita de l\'Aguerfelde',
        lore:      'Carlita de l\'Aguerfelde est une pistolière dont le tromblon a rendu plus de services que de politesse. Son bandeau couvre un œil qui n\'en voit pas moins, et ses cartouches ont la mauvaise habitude de trouver leur cible.',
        icon:      'img/monstres/wanted/avis/carlita_de_l_aguerfelde.png',
        background: '',
        levelCap:  100,
        bst:       { hp: 94000, atk: 300 },
        panoplie:  [{ itemId: 'bandeau_de_carlita', dropRate: 0.1 }, { itemId: 'sangle_de_carlita', dropRate: 0.1 }, { itemId: 'tromblon_de_carlita', dropRate: 0.1 }]
    },
    'wanted_gobrechaun': {
        id:        'wanted_gobrechaun',
        monsterId: 'wanted_gobrechaun',
        name:      'Gobrechaun',
        lore:      'Gobrechaun est ce qu\'on obtient quand un gobelin vole le chapeau d\'un leprechaun et décide que la chance lui appartient désormais. Il est aussi rapide pour dépenser vos kamas que pour s\'en aller avec.',
        icon:      'img/monstres/wanted/avis/gobrechaun.png',
        background: '',
        levelCap:  110,
        bst:       { hp: 110000, atk: 300 },
        panoplie:  []
    },
    'wanted_bouflouth': {
        id:        'wanted_bouflouth',
        monsterId: 'wanted_bouflouth',
        name:      'Bouflouth',
        lore:      'Bouflouth est une créature qui a visiblement abusé des buffets au fil des siècles. Ses souffles sont puissants, sa coiffe est large, et son approche du combat consiste essentiellement à occuper tout l\'espace disponible.',
        icon:      'img/monstres/wanted/avis/bouflouth.png',
        background: '',
        levelCap:  120,
        bst:       { hp: 130000, atk: 300 },
        panoplie:  [{ itemId: 'amulette_de_bouflouth', dropRate: 0.1 }, { itemId: 'ceinture_de_bouflouth', dropRate: 0.1 }, { itemId: 'coiffe_de_bouflouth', dropRate: 0.1 }]
    },
    'wanted_vashkiwi': {
        id:        'wanted_vashkiwi',
        monsterId: 'wanted_vashkiwi',
        name:      'Vashkiwi',
        lore:      'Vashkiwi est une créature d\'Otomaï qui a trouvé dans la solitude des forêts une sérénité que ses adversaires ne partagent pas. Ses techniques de combat sont aussi impénétrables que le plumage qui l\'enveloppe.',
        icon:      'img/monstres/wanted/avis/vashkiwi.png',
        background: '',
        levelCap:  120,
        bst:       { hp: 130000, atk: 300 },
        panoplie:  []
    },
    'wanted_morblok': {
        id:        'wanted_morblok',
        monsterId: 'wanted_morblok',
        name:      'Morblok',
        lore:      'Morblok est une force de la nature sans autre programme que la destruction. Ses adversaires ont souvent tenté de négocier — Morblok a toujours répondu avec ses poings.',
        icon:      'img/monstres/wanted/avis/morblok.png',
        background: '',
        levelCap:  120,
        bst:       { hp: 120000, atk: 400 },
        panoplie:  [{ itemId: 'arc_de_fleche_mauve', dropRate: 0.1 }, { itemId: 'cape_de_fleche_mauve', dropRate: 0.1 }, { itemId: 'casque_de_fleche_mauve', dropRate: 0.1 }]
    },
    'wanted_nenufor_tilotus': {
        id:        'wanted_nenufor_tilotus',
        monsterId: 'wanted_nenufor_tilotus',
        name:      'Nenufor Tilotus',
        lore:      'Nenufor Tilotus méditait paisiblement sur sa fleur de lotus quand quelqu\'un a eu la mauvaise idée de troubler ses eaux. Depuis, ses nénuphars servent autant d\'armes que de coussins, et personne n\'ose plus approcher de l\'étang.',
        icon:      'img/monstres/wanted/avis/nenufor_tilotus.png',
        background: '',
        levelCap:  120,
        bst:       { hp: 130000, atk: 375 },
        panoplie:  [{ itemId: 'nenuphar_de_nenufor', dropRate: 0.1 }, { itemId: 'lotus_de_nenufor', dropRate: 0.1 }, { itemId: 'nenufaur', dropRate: 0.1 }]
    },
    'wanted_monsieur_pingouin': {
        id:        'wanted_monsieur_pingouin',
        monsterId: 'wanted_monsieur_pingouin',
        name:      'Monsieur Pingouin',
        lore:      'Monsieur Pingouin dirige sa colonie d\'une nageoire de fer. Ses palmes ont beau sembler peu pratiques au combat, elles ont déjà fait vaciller des adversaires bien plus imposants que lui. Ne sous-estimez jamais un pingouin bien habillé.',
        icon:      'img/monstres/wanted/avis/monsieur_pingouin.png',
        background: '',
        levelCap:  130,
        bst:       { hp: 140000, atk: 300 },
        panoplie:  [{ itemId: 'palmes_de_monsieur_pingouin', dropRate: 0.1 }, { itemId: 'sangle_de_monsieur_pingouin', dropRate: 0.1 }, { itemId: 'chaine_de_monsieur_pingouin', dropRate: 0.1 }]
    },
    'wanted_jerart_dupaindur': {
        id:        'wanted_jerart_dupaindur',
        monsterId: 'wanted_jerart_dupaindur',
        name:      'Jérart Dupaindur',
        lore:      'Jérart Dupaindur est un boulanger dont les produits sont à l\'image de son caractère : durs, compacts, et capables de laisser des marques. Ses adversaires ont souvent regretté de ne pas avoir apporté davantage de soins — ou de dents.',
        icon:      'img/monstres/wanted/avis/jerart_dupaindur.png',
        background: '',
        levelCap:  130,
        bst:       { hp: 130000, atk: 300 },
        panoplie:  []
    },
    'wanted_padgref_demoel': {
        id:        'wanted_padgref_demoel',
        monsterId: 'wanted_padgref_demoel',
        name:      'Padgref Demoël',
        lore:      'Padgref Demoël est l\'héritier d\'une lignée guerrière dont l\'épée a traversé autant de batailles que de générations. Son bouclier porte les cicatrices d\'un honneur défendu à bout portant, et l\'adversaire d\'aujourd\'hui deviendra la légende de demain.',
        icon:      'img/monstres/wanted/avis/padgref_demoel.png',
        background: '',
        levelCap:  130,
        bst:       { hp: 160000, atk: 300 },
        panoplie:  [{ itemId: 'ceinture_des_demoel', dropRate: 0.1 }, { itemId: 'bouclier_des_demoel', dropRate: 0.1 }, { itemId: 'epee_des_demoel', dropRate: 0.1 }, { itemId: 'geta_de_padgref', dropRate: 0.1 }, { itemId: 'anneau_de_padgref', dropRate: 0.1 }, { itemId: 'coiffe_de_padgref', dropRate: 0.1 }]
    },
    'wanted_ali_grothor': {
        id:        'wanted_ali_grothor',
        monsterId: 'wanted_ali_grothor',
        name:      'Ali Grothor',
        lore:      'Ali Grothor est sorti des profondeurs avec un seul objectif : prouver que la force brute vaut bien n\'importe quelle stratégie. Sa cape et son casque lui donnent un semblant de méthode — mais l\'essentiel reste qu\'il frappe très fort.',
        icon:      'img/monstres/wanted/avis/ali_grothor.png',
        background: '',
        levelCap:  130,
        bst:       { hp: 140000, atk: 300 },
        panoplie:  [{ itemId: 'cape_d_ali_grothor', dropRate: 0.1 }, { itemId: 'casque_d_ali_grothor', dropRate: 0.1 }, { itemId: 'amulette_d_ali_grothor', dropRate: 0.1 }]
    },
    'wanted_roi_camole': {
        id:        'wanted_roi_camole',
        monsterId: 'wanted_roi_camole',
        name:      'Roi Camole',
        lore:      'Le Roi Camole règne sur un empire souterrain que personne n\'a jamais cartographié, pour la simple raison que personne n\'en est jamais revenu. Sa couronne est faite de pierres précieuses arrachées des entrailles de la terre — et de quoi d\'autre, on préfère ne pas le savoir.',
        icon:      'img/monstres/wanted/avis/roi_camole.png',
        background: '',
        levelCap:  130,
        bst:       { hp: 160000, atk: 400 },
        panoplie:  []
    },
    'wanted_katigrou': {
        id:        'wanted_katigrou',
        monsterId: 'wanted_katigrou',
        name:      'Katigrou',
        lore:      'Katigrou est un félin dont la grâce n\'est surpassée que par la brutalité. Ses mitaines griffent avant que vous ayez vu le mouvement, et sa cape ondule encore longtemps après que ses adversaires ont cessé de se relever.',
        icon:      'img/monstres/wanted/avis/katigrou.png',
        background: '',
        levelCap:  140,
        bst:       { hp: 150000, atk: 300 },
        panoplie:  [{ itemId: 'mitaine_de_katigrou', dropRate: 0.1 }, { itemId: 'cape_de_katigrou', dropRate: 0.1 }, { itemId: 'pattes_de_katigrou', dropRate: 0.1 }]
    },
    'wanted_darma': {
        id:        'wanted_darma',
        monsterId: 'wanted_darma',
        name:      'Darma',
        lore:      'Darma est une entité dont la sérénité apparente dissimule une puissance dévastatrice. Ses adversaires arrivent en cherchant la sagesse et repartent — ceux qui le peuvent — avec une leçon d\'humilité imprimée sur la peau.',
        icon:      'img/monstres/wanted/avis/darma.png',
        background: '',
        levelCap:  140,
        bst:       { hp: 160000, atk: 300 },
        panoplie:  []
    },
    'wanted_amy_l_empoisonneuse': {
        id:        'wanted_amy_l_empoisonneuse',
        monsterId: 'wanted_amy_l_empoisonneuse',
        name:      'Amy l\'empoisonneuse',
        lore:      'Amy l\'empoisonneuse est la preuve qu\'un sourire peut être aussi dangereux qu\'une lame. Elle n\'a jamais eu besoin de se battre pour tuer — ses préparations font le travail à sa place, lentement et sans appel.',
        icon:      'img/monstres/wanted/avis/amy_l_empoisonneuse.png',
        background: '',
        levelCap:  140,
        bst:       { hp: 300000, atk: 300 },
        panoplie:  []
    },
    'wanted_fojumo': {
        id:        'wanted_fojumo',
        monsterId: 'wanted_fojumo',
        name:      'Fojumo',
        lore:      'Fojumo est un samouraï dont le masque ne révèle aucune émotion et dont l\'épée ne manque jamais sa cible. Ses geta résonnent sur les pavés bien avant qu\'il n\'arrive — les sages en profitent pour partir dans la direction opposée.',
        icon:      'img/monstres/wanted/avis/fojumo.png',
        background: '',
        levelCap:  140,
        bst:       { hp: 160000, atk: 400 },
        panoplie:  [{ itemId: 'masque_de_fojumo', dropRate: 0.1 }, { itemId: 'geta_de_fojumo', dropRate: 0.1 }, { itemId: 'epee_de_fojumo', dropRate: 0.1 }]
    },
    'wanted_fantomayte': {
        id:        'wanted_fantomayte',
        monsterId: 'wanted_fantomayte',
        name:      'Fantômayte',
        lore:      'Fantômayte est un spectre dont l\'existence est une insulte aux vivants. Son bracelet et son voile de protection le rendent insaisissable, et ses victimes rejoignent souvent sa collection personnelle de regrets.',
        icon:      'img/monstres/wanted/avis/fantomayte.png',
        background: '',
        levelCap:  150,
        bst:       { hp: 180000, atk: 300 },
        panoplie:  [{ itemId: 'bracelet_de_fantomayte', dropRate: 0.1 }, { itemId: 'voile_de_fantomayte', dropRate: 0.1 }, { itemId: 'collier_de_fantomayte', dropRate: 0.1 }]
    },
    'wanted_mogligli': {
        id:        'wanted_mogligli',
        monsterId: 'wanted_mogligli',
        name:      'Mogligli',
        lore:      'Mogligli a grandi au milieu des monstres et en a adopté les mœurs — sans en conserver la grâce. Ses attaques désordonnées mais implacables témoignent d\'une enfance passée à survivre plutôt qu\'à apprendre.',
        icon:      'img/monstres/wanted/avis/mogligli.png',
        background: '',
        levelCap:  150,
        bst:       { hp: 34000, atk: 300 },
        panoplie:  []
    },
    'wanted_aigripoil': {
        id:        'wanted_aigripoil',
        monsterId: 'wanted_aigripoil',
        name:      'Aigripoil',
        lore:      'Aigripoil est amer depuis une date si lointaine que personne ne se souvient de la raison. Ses pics sont aussi nombreux que ses rancœurs, et ses adversaires apprennent à leurs dépens que contrarier quelqu\'un d\'aussi hérissé n\'a rien d\'une bonne idée.',
        icon:      'img/monstres/wanted/avis/aigripoil.png',
        background: '',
        levelCap:  150,
        bst:       { hp: 180000, atk: 500 },
        panoplie:  []
    },
    'wanted_zatoishwan': {
        id:        'wanted_zatoishwan',
        monsterId: 'wanted_zatoishwan',
        name:      'Zatoïshwan',
        lore:      'Zatoïshwan est un aveugle dont les oreilles voient mieux que les yeux de quiconque. Son bâton frappe avant que vous ayez eu l\'idée de vous déplacer, et sa barbe flotte dans l\'air comme un avertissement que personne ne prend jamais assez au sérieux.',
        icon:      'img/monstres/wanted/avis/zatoishwan.png',
        background: '',
        levelCap:  150,
        bst:       { hp: 180000, atk: 300 },
        panoplie:  [{ itemId: 'baton_de_zatoishwan', dropRate: 0.1 }, { itemId: 'ceinture_de_zatoishwan', dropRate: 0.1 }, { itemId: 'barbe_de_zatoishwan', dropRate: 0.1 }]
    },
    'wanted_vengeuse_masquee': {
        id:        'wanted_vengeuse_masquee',
        monsterId: 'wanted_vengeuse_masquee',
        name:      'Vengeuse Masquée',
        lore:      'La Vengeuse Masquée ne dit pas pour qui elle se venge — et vous avez intérêt à ne pas demander. Sa coquille protège un passé douloureux, et son masque cache un visage qui a décidé que certaines dettes se remboursent au sang.',
        icon:      'img/monstres/wanted/avis/vengeuse_masquee.png',
        background: '',
        levelCap:  160,
        bst:       { hp: 200000, atk: 300 },
        panoplie:  [{ itemId: 'coquille_de_vengeuse_masquee', dropRate: 0.1 }, { itemId: 'brassard_de_vengeuse_masquee', dropRate: 0.1 }, { itemId: 'masque_de_vengeuse_masquee', dropRate: 0.1 }]
    },
    'wanted_glandaf_l_aigri': {
        id:        'wanted_glandaf_l_aigri',
        monsterId: 'wanted_glandaf_l_aigri',
        name:      'Glandaf l\'Aigri',
        lore:      'Glandaf l\'Aigri est convaincu que le monde lui doit quelque chose. En attendant d\'être remboursé, il se contente de frapper tout ce qui passe à portée. Ses adversaires ne lui ont rien fait — mais c\'est précisément ce qui l\'énerve.',
        icon:      'img/monstres/wanted/avis/glandaf_l_aigri.png',
        background: '',
        levelCap:  160,
        bst:       { hp: 200000, atk: 300 },
        panoplie:  []
    },
    'wanted_anatak_diskedor': {
        id:        'wanted_anatak_diskedor',
        monsterId: 'wanted_anatak_diskedor',
        name:      'Anatak Diskedor',
        lore:      'Anatak Diskedor est un guerrier dont les disques tranchants ont remplacé les armes conventionnelles. Sa technique tient plus de l\'acrobatie que de la stratégie, et ses adversaires finissent en lambeaux avant même d\'avoir eu le temps de trouver ça impressionnant.',
        icon:      'img/monstres/wanted/avis/anatak_diskedor.png',
        background: '',
        levelCap:  160,
        bst:       { hp: 200000, atk: 450 },
        panoplie:  [{ itemId: 'epee_du_bretteur_celeste', dropRate: 0.1 }, { itemId: 'cape_du_bretteur_celeste', dropRate: 0.1 }, { itemId: 'ceinture_du_bretteur_celeste', dropRate: 0.1 }]
    },
    'wanted_yech_ti': {
        id:        'wanted_yech_ti',
        monsterId: 'wanted_yech_ti',
        name:      'YeCh\'Ti',
        lore:      'YeCh\'Ti vient des plaines froides du nord, où le vent tranche aussi net qu\'une lame et où la résistance se mesure en cicatrices. Son collier et ses mitaines gardent la chaleur — pour lui. Ses adversaires, eux, n\'ont droit qu\'au froid.',
        icon:      'img/monstres/wanted/avis/yech_ti.png',
        background: '',
        levelCap:  170,
        bst:       { hp: 220000, atk: 300 },
        panoplie:  [{ itemId: 'collier_du_yech_ti', dropRate: 0.1 }, { itemId: 'mitaine_du_yech_ti', dropRate: 0.1 }, { itemId: 'bras_du_yech_ti', dropRate: 0.1 }]
    },
    'wanted_crasper': {
        id:        'wanted_crasper',
        monsterId: 'wanted_crasper',
        name:      'Crasper',
        lore:      'Crasper est une entité dont le passage laisse des traces durables — sur les murs, sur les sols, et sur les adversaires qui avaient pourtant cru garder leurs distances. Sa méthode de combat manque d\'élégance mais compense en efficacité.',
        icon:      'img/monstres/wanted/avis/crasper.png',
        background: '',
        levelCap:  170,
        bst:       { hp: 220000, atk: 300 },
        panoplie:  []
    },
    'wanted_hin': {
        id:        'wanted_hin',
        monsterId: 'wanted_hin',
        name:      'Hin',
        lore:      'Hin ne parle pas. Hin ne négocie pas. Hin frappe. Ses 700 en attaque en disent plus long sur sa philosophie que n\'importe quelle biographie officielle.',
        icon:      'img/monstres/wanted/avis/hin.png',
        background: '',
        levelCap:  170,
        bst:       { hp: 210000, atk: 700 },
        panoplie:  []
    },
    'wanted_ka_youloud': {
        id:        'wanted_ka_youloud',
        monsterId: 'wanted_ka_youloud',
        name:      'Ka\'Youloud',
        lore:      'Ka\'Youloud est une créature dont les cris résonnent bien au-delà du champ de bataille. Ses adversaires essaient souvent de couvrir leurs oreilles — ils auraient mieux fait de couvrir leurs flancs.',
        icon:      'img/monstres/wanted/avis/ka_youloud.png',
        background: '',
        levelCap:  170,
        bst:       { hp: 210000, atk: 600 },
        panoplie:  []
    },
    'wanted_dremoan': {
        id:        'wanted_dremoan',
        monsterId: 'wanted_dremoan',
        name:      'Dremoan',
        lore:      'Dremoan erre entre les mondes depuis si longtemps qu\'il a oublié ce qu\'il cherchait. Son chapeau et sa cape flottent dans des dimensions que vous ne pouvez pas percevoir, et ses attaques viennent d\'angles que la physique peine à justifier.',
        icon:      'img/monstres/wanted/avis/dremoan.png',
        background: '',
        levelCap:  180,
        bst:       { hp: 240000, atk: 300 },
        panoplie:  [{ itemId: 'chapeau_de_dremoan', dropRate: 0.1 }, { itemId: 'bottes_de_dremoan', dropRate: 0.1 }, { itemId: 'cape_de_dremoan', dropRate: 0.1 }]
    },
    'wanted_carter_le_pillard': {
        id:        'wanted_carter_le_pillard',
        monsterId: 'wanted_carter_le_pillard',
        name:      'Carter le Pillard',
        lore:      'Carter le Pillard a ouvert des tombeaux que même les archéologues avaient jugés trop dangereux. Ce qu\'il en a ramené reste un mystère, mais les cicatrices qu\'il porte témoignent que les gardiens de ces sépultures n\'avaient pas apprécié la visite.',
        icon:      'img/monstres/wanted/avis/carter_le_pillard.png',
        background: '',
        levelCap:  180,
        bst:       { hp: 250000, atk: 300 },
        panoplie:  [{ itemId: 'amulette_de_nevark', dropRate: 0.1 }, { itemId: 'ceinture_de_nevark', dropRate: 0.1 }, { itemId: 'cape_de_nevark', dropRate: 0.1 }, { itemId: 'nev_arc', dropRate: 0.1 }]
    },
    'wanted_guerrier_du_k_o': {
        id:        'wanted_guerrier_du_k_o',
        monsterId: 'wanted_guerrier_du_k_o',
        name:      'Guerrier du K.O.',
        lore:      'Le Guerrier du K.O. n\'a qu\'un objectif et qu\'une méthode. Son amulette et sa ceinture sont les seuls ornements d\'un combattant qui préfère finir les choses vite — de préférence d\'un seul coup.',
        icon:      'img/monstres/wanted/avis/guerrier_du_k_o.png',
        background: '',
        levelCap:  180,
        bst:       { hp: 240000, atk: 650 },
        panoplie:  [{ itemId: 'bottes_du_k_o', dropRate: 0.1 }, { itemId: 'amulette_du_k_o', dropRate: 0.1 }, { itemId: 'ceinture_du_k_o', dropRate: 0.1 }]
    },
    'wanted_shushu_debruk_sayl': {
        id:        'wanted_shushu_debruk_sayl',
        monsterId: 'wanted_shushu_debruk_sayl',
        name:      'Shushu Debruk\'Sayl',
        lore:      'Shushu Debruk\'Sayl est un démon de la trempe de ceux qu\'on évoque à voix basse et qu\'on ne conjure qu\'en dernière extrémité. Sa cape et son collier dissimulent une intelligence ancienne dont les intentions n\'ont jamais été exactement bienveillantes.',
        icon:      'img/monstres/wanted/avis/shushu_debruk_sayl.png',
        background: '',
        levelCap:  180,
        bst:       { hp: 250000, atk: 333 },
        panoplie:  [{ itemId: 'cape_debruk_sayl', dropRate: 0.1 }, { itemId: 'collier_debruk_sayl', dropRate: 0.1 }, { itemId: 'anneau_debruk_sayl', dropRate: 0.1 }]
    },
    'wanted_flasho': {
        id:        'wanted_flasho',
        monsterId: 'wanted_flasho',
        name:      'Flasho',
        lore:      'Flasho est là, puis n\'est plus là, puis est ailleurs, puis nulle part, puis partout. Ses flashaux rendent le combat aussi prévisible qu\'un éclair — c\'est-à-dire absolument pas.',
        icon:      'img/monstres/wanted/avis/flasho.png',
        background: '',
        levelCap:  190,
        bst:       { hp: 240000, atk: 300 },
        panoplie:  [{ itemId: 'flashaux', dropRate: 0.1 }, { itemId: 'bouclieclair_de_flasho', dropRate: 0.1 }, { itemId: 'anneau_de_flasho', dropRate: 0.1 }]
    },
    'wanted_viti_glourson': {
        id:        'wanted_viti_glourson',
        monsterId: 'wanted_viti_glourson',
        name:      'Viti Glourson',
        lore:      'Viti Glourson est un ours dont l\'amour du miel est surpassé seulement par sa haine de quiconque essaie d\'y toucher. Son pagne et son amulette sentent la forêt et l\'ambre, et ses adversaires finissent généralement le visage dans la boue à quelques mètres de lui.',
        icon:      'img/monstres/wanted/avis/viti_glourson.png',
        background: '',
        levelCap:  190,
        bst:       { hp: 290000, atk: 300 },
        panoplie:  [{ itemId: 'amulette_de_viti_glourson', dropRate: 0.1 }, { itemId: 'pagne_de_viti_glourson', dropRate: 0.1 }, { itemId: 'pot_de_miel_de_viti_glourson', dropRate: 0.1 }]
    },
    'wanted_fuji_givrefoux': {
        id:        'wanted_fuji_givrefoux',
        monsterId: 'wanted_fuji_givrefoux',
        name:      'Fuji Givrefoux',
        lore:      'Fuji Givrefoux est un renard des neiges dont la grâce glaciale contraste avec la brutalité de ses attaques. Son anneau et sa cape sont aussi beaux qu\'ils sont dangereux — tout comme elle.',
        icon:      'img/monstres/wanted/avis/fuji_givrefoux.png',
        background: '',
        levelCap:  190,
        bst:       { hp: 270000, atk: 300 },
        panoplie:  [{ itemId: 'anneau_de_la_fuji_givrefoux', dropRate: 0.1 }, { itemId: 'cape_de_la_fuji_givrefoux', dropRate: 0.1 }, { itemId: 'bottes_de_la_fuji_givrefoux', dropRate: 0.1 }, { itemId: 'coiffe_de_la_fuji_givrefoux', dropRate: 0.1 }, { itemId: 'bague_de_san_jifu', dropRate: 0.1 }, { itemId: 'faux_de_san_jifu', dropRate: 0.1 }, { itemId: 'ceinture_de_san_jifu', dropRate: 0.1 }]
    },
    'wanted_docteur_eggob': {
        id:        'wanted_docteur_eggob',
        monsterId: 'wanted_docteur_eggob',
        name:      'Docteur Eggob',
        lore:      'Le Docteur Eggob pratique une médecine dont l\'éthique laisse à désirer et les résultats à craindre. Ses lunettes lui donnent un air savant, son fléau lui donne un air dangereux, et la combinaison des deux donne envie de ne pas avoir besoin de consultation.',
        icon:      'img/monstres/wanted/avis/docteur_eggob.png',
        background: '',
        levelCap:  190,
        bst:       { hp: 280000, atk: 300 },
        panoplie:  [{ itemId: 'lunettes_du_docteur_eggob', dropRate: 0.1 }, { itemId: 'anneau_dore_du_docteur_eggob', dropRate: 0.1 }, { itemId: 'fleau_du_docteur_eggob', dropRate: 0.1 }]
    },
    'wanted_sans_visage': {
        id:        'wanted_sans_visage',
        monsterId: 'wanted_sans_visage',
        name:      'Sans Visage',
        lore:      'Sans Visage n\'a pas de nom parce que personne n\'a survécu assez longtemps pour lui en donner un. Son absence de traits n\'est pas un vide — c\'est un avertissement que certaines choses n\'ont pas besoin de visage pour être redoutées.',
        icon:      'img/monstres/wanted/avis/sans_visage.png',
        background: '',
        levelCap:  190,
        bst:       { hp: 270000, atk: 300 },
        panoplie:  []
    },
    'wanted_predagob': {
        id:        'wanted_predagob',
        monsterId: 'wanted_predagob',
        name:      'Predagob',
        lore:      'Predagob est un prédateur qui a adopté l\'apparence d\'un gobelin — ou un gobelin qui a adopté les instincts d\'un prédateur. Dans les deux cas, sa perruque ne le rend pas moins dangereux, juste légèrement plus déconcertant.',
        icon:      'img/monstres/wanted/avis/predagob.png',
        background: '',
        levelCap:  190,
        bst:       { hp: 260000, atk: 300 },
        panoplie:  [{ itemId: 'perruque_de_predagob', dropRate: 0.1 }, { itemId: 'bracelet_de_predagob', dropRate: 0.1 }, { itemId: 'pagne_de_predagob', dropRate: 0.1 }]
    },
    'wanted_buldalazred': {
        id:        'wanted_buldalazred',
        monsterId: 'wanted_buldalazred',
        name:      'Buldalazred',
        lore:      'Buldalazred est une créature ancienne dont la couleur rouge n\'est pas un choix esthétique mais une conséquence de ses activités. Ses 800 en attaque parlent d\'eux-mêmes, et ses adversaires qui voulaient dialoguer ont généralement changé d\'avis trop tard.',
        icon:      'img/monstres/wanted/avis/buldalazred.png',
        background: '',
        levelCap:  200,
        bst:       { hp: 290000, atk: 800 },
        panoplie:  [{ itemId: 'amulette_de_shokkoth', dropRate: 0.1 }, { itemId: 'cape_de_mantaze', dropRate: 0.1 }, { itemId: 'dagoulinantes', dropRate: 0.1 }]
    },
    'wanted_takomako': {
        id:        'wanted_takomako',
        monsterId: 'wanted_takomako',
        name:      'Takomako',
        lore:      'Takomako est le résultat d\'une rencontre entre les fonds marins et l\'instinct de prédation. Ses tentacules frappent comme des requins et ses dents mordent comme des pieuvres — dans quel ordre, c\'est selon le moment.',
        icon:      'img/monstres/wanted/avis/takomako.png',
        background: '',
        levelCap:  200,
        bst:       { hp: 290000, atk: 800 },
        panoplie:  [{ itemId: 'anneau_crustique', dropRate: 0.1 }, { itemId: 'collier_de_tourthon', dropRate: 0.1 }, { itemId: 'marteau_r_ture', dropRate: 0.1 }]
    },
    'wanted_homard_medali': {
        id:        'wanted_homard_medali',
        monsterId: 'wanted_homard_medali',
        name:      'Homard Medali',
        lore:      'Homard Medali est un crustacé décoré pour des services militaires dont personne ne connaît exactement la nature. Ses pinces ont servi autant au combat qu\'à la cérémonie, et ses médailles sonnent comme un avertissement à chaque pas.',
        icon:      'img/monstres/wanted/avis/homard_medali.png',
        background: '',
        levelCap:  200,
        bst:       { hp: 290000, atk: 800 },
        panoplie:  [{ itemId: 'cape_indescriptible', dropRate: 0.1 }, { itemId: 'manthache', dropRate: 0.1 }, { itemId: 'palmes_trithons', dropRate: 0.1 }]
    },
    'wanted_glourdorak': {
        id:        'wanted_glourdorak',
        monsterId: 'wanted_glourdorak',
        name:      'Glourdorak',
        lore:      'Glourdorak est une force primordiale que les anciens invoquaient en dernier recours. Sa masse et son bouclier protègent un être d\'une puissance que les légendes peinent à quantifier, et sa cape flotte dans un vent que vous ne sentez pas.',
        icon:      'img/monstres/wanted/avis/glourdorak.png',
        background: '',
        levelCap:  200,
        bst:       { hp: 340000, atk: 300 },
        panoplie:  [{ itemId: 'bouclier_de_glourdorak', dropRate: 0.1 }, { itemId: 'cape_de_glourdorak', dropRate: 0.1 }, { itemId: 'masse_de_glourdorak', dropRate: 0.1 }]
    },
    'wanted_mekamouth': {
        id:        'wanted_mekamouth',
        monsterId: 'wanted_mekamouth',
        name:      'Mekamouth',
        lore:      'Mekamouth est une bouche mécanique construite pour mâcher ce que la nature a produit. Son boulon, sa bêche et son écrou constituent les restes d\'un dessein original dont l\'inventeur n\'a pas survécu à la première mise en marche.',
        icon:      'img/monstres/wanted/avis/mekamouth.png',
        background: '',
        levelCap:  200,
        bst:       { hp: 340000, atk: 300 },
        panoplie:  [{ itemId: 'boulon_de_mekamouth', dropRate: 0.1 }, { itemId: 'beche_de_mekamouth', dropRate: 0.1 }, { itemId: 'ecrou_de_mekamouth', dropRate: 0.1 }]
    },
    'wanted_culbutuf': {
        id:        'wanted_culbutuf',
        monsterId: 'wanted_culbutuf',
        name:      'Culbutœuf',
        lore:      'Culbutœuf est l\'improbable résultat d\'un œuf tombé de trop haut et remonté de trop loin. Son arc et son disque témoignent qu\'il a su tirer parti de sa condition, et ses adversaires constatent qu\'être un œuf n\'est nullement incompatible avec être dangereux.',
        icon:      'img/monstres/wanted/avis/culbutuf.png',
        background: '',
        levelCap:  200,
        bst:       { hp: 300000, atk: 300 },
        panoplie:  [{ itemId: 'anneau_de_culbut_uf', dropRate: 0.1 }, { itemId: 'arc_de_culbut_uf', dropRate: 0.1 }, { itemId: 'disque_de_culbut_uf', dropRate: 0.1 }]
    },
    'wanted_chevalier_de_glace': {
        id:        'wanted_chevalier_de_glace',
        monsterId: 'wanted_chevalier_de_glace',
        name:      'Chevalier de Glace',
        lore:      'Le Chevalier de Glace est le gardien d\'un serment prononcé il y a si longtemps que les termes en ont été oubliés. Sa lame givrée et son bouclier frigorifié maintiennent en vie quelque chose qui n\'a plus vraiment de raison de l\'être — si ce n\'est de protéger ce que vous cherchez.',
        icon:      'img/monstres/wanted/avis/chevalier_de_glace.png',
        background: '',
        levelCap:  200,
        bst:       { hp: 320000, atk: 300 },
        panoplie:  [{ itemId: 'ceste_gele_du_chevalier_de_glace', dropRate: 0.1 }, { itemId: 'lame_givree_du_chevalier_de_glace', dropRate: 0.1 }, { itemId: 'pavois_frigorifie_du_chevalier_de_glace', dropRate: 0.1 }]
    },
    'wanted_psikopompe': {
        id:        'wanted_psikopompe',
        monsterId: 'wanted_psikopompe',
        name:      'Psikopompe',
        lore:      'Psikopompe guide les âmes vers leur destination finale depuis assez longtemps pour ne plus faire la différence entre les morts et ceux qui ne le sont pas encore. Son aiguille coud les destinées, et son gant n\'est là que pour éviter de se salir.',
        icon:      'img/monstres/wanted/avis/psikopompe.png',
        background: '',
        levelCap:  200,
        bst:       { hp: 320000, atk: 300 },
        panoplie:  [{ itemId: 'aiguille_de_psikopompe', dropRate: 0.1 }, { itemId: 'bouton_de_psikopompe', dropRate: 0.1 }, { itemId: 'gant_de_psikopompe', dropRate: 0.1 }]
    },
    'wanted_le_fantome_braideur': {
        id:        'wanted_le_fantome_braideur',
        monsterId: 'wanted_le_fantome_braideur',
        name:      'Le Fantôme Braïdeur',
        lore:      'Le Fantôme Braïdeur hante un espace entre les niveaux que même les cartographes ont renoncé à nommer. Il ne tresse pas des cheveux — il tresse les fils du destin, et les adversaires qui s\'y retrouvent entremêlés ont rarement le loisir de se dénouer.',
        icon:      'img/monstres/wanted/avis/le_fantome_braideur.png',
        background: '',
        levelCap:  200,
        bst:       { hp: 300000, atk: 300 },
        panoplie:  [{ itemId: 'bottes_du_captain_chafer', dropRate: 0.1 }, { itemId: 'poignards_du_captain_chafer', dropRate: 0.1 }, { itemId: 'slip_du_captain_chafer', dropRate: 0.1 }]
    },
    'wanted_voldelor': {
        id:        'wanted_voldelor',
        monsterId: 'wanted_voldelor',
        name:      'Voldelor',
        lore:      'Voldelor est une créature dont l\'appétit pour l\'or dépasse de loin ses besoins réels. Son amulette et sa ceinture sont incrustées de métaux précieux arrachés à ses victimes, et ses bottes sont assez rapides pour qu\'on ne sache jamais exactement d\'où il vient.',
        icon:      'img/monstres/wanted/avis/voldelor.png',
        background: '',
        levelCap:  200,
        bst:       { hp: 290000, atk: 800 },
        panoplie:  [{ itemId: 'amulette_voldelor', dropRate: 0.1 }, { itemId: 'bottes_voldelor', dropRate: 0.1 }, { itemId: 'ceinture_voldelor', dropRate: 0.1 }]
    },
    'wanted_sicogne': {
        id:        'wanted_sicogne',
        monsterId: 'wanted_sicogne',
        name:      'Sicogne',
        lore:      'Sicogne arrive à grands pas silencieux, livre ce qu\'elle est venue livrer, et repart sans se retourner. Ce qu\'elle livre n\'est jamais une bonne nouvelle pour celui qui la reçoit.',
        icon:      'img/monstres/wanted/avis/sicogne.png',
        background: '',
        levelCap:  200,
        bst:       { hp: 290000, atk: 575 },
        panoplie:  [{ itemId: 'bottes_des_voyageurs', dropRate: 0.1 }, { itemId: 'bouclier_des_voyageurs', dropRate: 0.1 }, { itemId: 'capuche_des_voyageurs', dropRate: 0.1 }, { itemId: 'ceinture_des_voyageurs', dropRate: 0.1 }, { itemId: 'gant_des_voyageurs', dropRate: 0.1 }, { itemId: 'portail_des_voyageurs', dropRate: 0.1 }]
    },
    'wanted_mi': {
        id:        'wanted_mi',
        monsterId: 'wanted_mi',
        name:      'Mi',
        lore:      'Mi est le premier fragment d\'une trinité légendaire née aux confins d\'Atcham. Seul, il est déjà redoutable. Accompagné de Fou et Chi, il devient quelque chose que les chroniques préfèrent taire.',
        icon:      'img/monstres/wanted/avis/mi.png',
        background: '',
        levelCap:  200,
        bst:       { hp: 300000, atk: 800 },
        panoplie:  [{ itemId: 'cape_d_atcham', dropRate: 0.1 }, { itemId: 'sabres_d_atcham', dropRate: 0.1 }, { itemId: 'sandales_d_atcham', dropRate: 0.1 }]
    },
    'wanted_fou': {
        id:        'wanted_fou',
        monsterId: 'wanted_fou',
        name:      'Fou',
        lore:      'Fou est l\'élément chaotique de la trinité d\'Atcham. Sa folie n\'est pas un défaut mais une arme : imprévisible, inconstant, et parfaitement capable de frapper là où ses adversaires cherchent encore une logique.',
        icon:      'img/monstres/wanted/avis/fou.png',
        background: '',
        levelCap:  200,
        bst:       { hp: 300000, atk: 800 },
        panoplie:  [{ itemId: 'cape_d_atcham', dropRate: 0.1 }, { itemId: 'sabres_d_atcham', dropRate: 0.1 }, { itemId: 'sandales_d_atcham', dropRate: 0.1 }]
    },
    'wanted_chi': {
        id:        'wanted_chi',
        monsterId: 'wanted_chi',
        name:      'Chi',
        lore:      'Chi est le fil silencieux qui relie la trinité d\'Atcham. Là où Mi frappe et Fou perturbe, Chi conclut — avec une précision que seuls comprennent ceux qui ont eu la chance d\'y survivre.',
        icon:      'img/monstres/wanted/avis/chi.png',
        background: '',
        levelCap:  200,
        bst:       { hp: 300000, atk: 800 },
        panoplie:  [{ itemId: 'cape_d_atcham', dropRate: 0.1 }, { itemId: 'sabres_d_atcham', dropRate: 0.1 }, { itemId: 'sandales_d_atcham', dropRate: 0.1 }]
    },
    'wanted_ganos': {
        id:        'wanted_ganos',
        monsterId: 'wanted_ganos',
        name:      'Ganos',
        lore:      'Ganos est une erreur de la nature que la nature a préféré garder plutôt qu\'avouer. Ses 1000 en attaque en font l\'un des combattants les plus directs du monde de Dofus — nuance qui, pour ses adversaires, se traduit généralement par « très douloureux ».',
        icon:      'img/monstres/wanted/avis/ganos.png',
        background: '',
        levelCap:  200,
        bst:       { hp: 250000, atk: 1000 },
        panoplie:  []
    },
    'wanted_hyperscampe': {
        id:        'wanted_hyperscampe',
        monsterId: 'wanted_hyperscampe',
        name:      'Hyperscampe',
        lore:      'Hyperscampe est la preuve que la taille n\'a aucun rapport avec la dangerosité. Ses mouvements sont erratiques, ses attaques imprévisibles, et ses adversaires finissent souvent par se demander ce qu\'ils ont bien pu faire pour mériter ça.',
        icon:      'img/monstres/wanted/avis/hyperscampe.png',
        background: '',
        levelCap:  200,
        bst:       { hp: 300000, atk: 500 },
        panoplie:  [{ itemId: 'bouclier_du_captain_amakna', dropRate: 0.1 }, { itemId: 'cape_des_justiciers', dropRate: 0.1 }]
    },
    'wanted_grand_kongoku': {
        id:        'wanted_grand_kongoku',
        monsterId: 'wanted_grand_kongoku',
        name:      'Grand Kongoku',
        lore:      'Grand Kongoku est le plus grand des Kongoku, ce qui dans sa famille signifie « le plus capable de pulvériser ce qui bouge ». Sa boucle d\'oreille et sa ceinture sont les seuls ornements qu\'il a accepté de porter — tout le reste, il préfère le montrer dans les combats.',
        icon:      'img/monstres/wanted/avis/grand_kongoku.png',
        background: '',
        levelCap:  200,
        bst:       { hp: 300000, atk: 1125 },
        panoplie:  [{ itemId: 'boucle_d_oreille_de_kongoku', dropRate: 0.1 }, { itemId: 'cape_de_kongoku', dropRate: 0.1 }, { itemId: 'ceinture_de_kongoku', dropRate: 0.1 }]
    },
    'wanted_khepricorne': {
        id:        'wanted_khepricorne',
        monsterId: 'wanted_khepricorne',
        name:      'Khepricorne',
        lore:      'Khepricorne est né de la rencontre entre la mythologie pharaonique et l\'imaginaire de Dofus — et il en a gardé le pire des deux. Sa corne et ses ailes le rendent aussi imprévisible dans ses déplacements que dans ses attaques.',
        icon:      'img/monstres/wanted/avis/khepricorne.png',
        background: '',
        levelCap:  200,
        bst:       { hp: 320000, atk: 300 },
        panoplie:  [{ itemId: 'cape_ovri', dropRate: 0.1 }, { itemId: 'sangle_ouare', dropRate: 0.1 }, { itemId: 'talisman_songe', dropRate: 0.1 }]
    },
    'wanted_panteroz': {
        id:        'wanted_panteroz',
        monsterId: 'wanted_panteroz',
        name:      'Pantèroz',
        lore:      'Pantèroz est une panthère d\'une espèce que l\'on croyait éteinte et qu\'on aurait préféré laisser disparaître. Sa vitesse est telle que certains aventuriers n\'ont jamais vu ce qui les a frappés — et ses 800 en attaque suggèrent que c\'est aussi bien ainsi.',
        icon:      'img/monstres/wanted/avis/panteroz.png',
        background: '',
        levelCap:  150,
        bst:       { hp: 60000, atk: 800 },
        panoplie:  [{ itemId: 'string_fouetteur', dropRate: 0.1 }, { itemId: 'anneau_tranchant', dropRate: 0.1 }, { itemId: 'masque_de_panteroz', dropRate: 0.1 }]
    },
    'wanted_mouchame': {
        id:        'wanted_mouchame',
        monsterId: 'wanted_mouchame',
        name:      'Mouchâme',
        lore:      'Mouchâme est la version finale, ultime, définitive d\'une créature que personne n\'avait demandé à voir exister. Contrairement à son homologue de classe 3773, celui-ci n\'a plus aucune limite à compenser. Sa légèreté est inversement proportionnelle à la gravité de son passage.',
        icon:      'img/monstres/wanted/avis/mouchame.png',
        background: '',
        levelCap:  170,
        bst:       { hp: 68000, atk: 600 },
        panoplie:  [{ itemId: 'bottes_de_lethaline', dropRate: 0.1 }, { itemId: 'cape_de_lethaline', dropRate: 0.1 }, { itemId: 'ceinture_de_lethaline', dropRate: 0.1 }]
    },
    'wanted_gein': {
        id:        'wanted_gein',
        monsterId: 'wanted_gein',
        name:      'Gein',
        lore:      'Gein est l\'énigme au bout de toutes les énigmes. Son chapeau dissimule un regard qui a vu plus de fins du monde qu\'il n\'y a de mots pour les décrire. On dit que le vaincre donne la réponse à toutes vos questions — ce qui suppose d\'être encore en état de les poser.',
        icon:      'img/monstres/wanted/avis/gein.png',
        background: '',
        levelCap:  200,
        bst:       { hp: 240000, atk: 1200 },
        panoplie:  [{ itemId: 'amulette_de_gein', dropRate: 0.1 }, { itemId: 'ceinture_de_gein', dropRate: 0.1 }, { itemId: 'chapeau_de_gein', dropRate: 0.1 }]
    },
    'wanted_cire_momore': {
        id:        'wanted_cire_momore',
        monsterId: 'wanted_cire_momore',
        name:      'Cire Momore',
        lore:      'Cire Momore est une entité dont la surface lisse et brillante cache une violence impitoyable. Son métal hurlant résonne comme un glas, sa fatalité tombe sans appel, et les aventuriers qui ont cru déceler une faille dans son éclat figé n\'ont jamais eu l\'occasion de rectifier leur jugement.',
        icon:      'images/monsters/Cire_Momore.png',
        background: '',
        levelCap:  200,
        bst:       { hp: 700000, atk: 500 },
        panoplie:  [{ itemId: 'chagrin_de_cire', dropRate: 0.1 }, { itemId: 'claymomore', dropRate: 0.1 }, { itemId: 'lourd_fardeau', dropRate: 0.1 }, { itemId: 'triste_sceau', dropRate: 0.1 }, { itemId: 'ames_hurlantes', dropRate: 0.1 }, { itemId: 'eternelle_poursuite', dropRate: 0.1 }]
    },
    'wanted_gargandyas': {
        id:        'wanted_gargandyas',
        monsterId: 'wanted_gargandyas',
        name:      'Gargandyas',
        lore:      'Gargandyas est une bête primordiale dont les sceaux telluriques font trembler la terre et le cri primitif glace le sang. Impassible et immuable, il frappe depuis son socle sans jamais bouger, comme si le monde entier devait venir à lui.',
        icon:      'images/monsters/Gargandyas.png',
        background: '',
        levelCap:  200,
        bst:       { hp: 100000, atk: 300 },
        panoplie:  [{ itemId: 'belier_de_gargandyas', dropRate: 0.1 }, { itemId: 'collier_de_gargandyas', dropRate: 0.1 }, { itemId: 'fureur_de_gargandyas', dropRate: 0.1 }, { itemId: 'griffe_de_gargandyas', dropRate: 0.1 }]
    },
};

// ─── Areas synthétiques (créées statiquement pour support rechargement de page) ─

for (const [wantedId, wd] of Object.entries(WantedBosses)) {
    areas['_wanted_' + wantedId] = {
        id:          '_wanted_' + wantedId,
        type:        'wanted',
        name:        wd.name,
        maxLevel:    wd.levelCap,
        minLevel:    1,
        mobMinLevel: wd.levelCap,
        mobMaxLevel: wd.levelCap,
        background:  wd.background || '',
        icon:        wd.icon,
        spawns:      [{ id: wd.monsterId, weight: 1 }],
        lootTable:   []
    }
}





// ─── Sorts des Wanted (étend l'objet `move`) ──────────────────────────────────

move['wanted_buldalazred_piege_dimensionnel'] = {
    id: 'wanted_buldalazred_piege_dimensionnel',
    name: 'Piège dimensionnel',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 300, max: 40 }, target: 'enemy' }
    ]
}

move['wanted_buldalazred_uction'] = {
    id: 'wanted_buldalazred_uction',
    name: 'Uction',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_takomako_takotak'] = {
    id: 'wanted_takomako_takotak',
    name: 'Takotak',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 30, max: 40 }, target: 'enemy' }
    ]
}

move['wanted_takomako_makomak'] = {
    id: 'wanted_takomako_makomak',
    name: 'Makomak',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 70, max: 80 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_homard_medali_drachetaulque'] = {
    id: 'wanted_homard_medali_drachetaulque',
    name: 'Drachetaulque',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 81, max: 85 }, target: 'enemy' }
    ]
}

move['wanted_homard_medali_hypercut'] = {
    id: 'wanted_homard_medali_hypercut',
    name: 'Hypercut',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 61, max: 65 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_homard_medali_telepunch'] = {
    id: 'wanted_homard_medali_telepunch',
    name: 'Télépunch',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 81, max: 85 }, target: 'enemy' }
    ]
}

move['wanted_bouflouth_mammouth'] = {
    id: 'wanted_bouflouth_mammouth',
    name: 'Mammouth',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_bouflouth_gloutmouth'] = {
    id: 'wanted_bouflouth_gloutmouth',
    name: 'Gloutmouth',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 17, max: 33 }, target: 'enemy' },
        { type: 'heal', heal: { min: 20, max: 35 }, target: 'self' }
    ]
}

move['wanted_bouflouth_hypermouth'] = {
    id: 'wanted_bouflouth_hypermouth',
    name: 'Hypermouth',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 25, duration: 3, target: 'self' }
    ]
}

move['wanted_bouflouth_embrochmouth'] = {
    id: 'wanted_bouflouth_embrochmouth',
    name: 'Embrochmouth',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 17, max: 33 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_monsieur_pingouin_parapluie_gadget'] = {
    id: 'wanted_monsieur_pingouin_parapluie_gadget',
    name: 'Parapluie Gadget',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 60 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 39, max: 53 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_monsieur_pingouin_iceberg_saloon'] = {
    id: 'wanted_monsieur_pingouin_iceberg_saloon',
    name: 'Iceberg Saloon',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'air', value: 101, duration: 1, target: 'enemy' }
    ]
}

move['wanted_monsieur_pingouin_mascarade_rocambolesque'] = {
    id: 'wanted_monsieur_pingouin_mascarade_rocambolesque',
    name: 'Mascarade Rocambolesque',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 30, duration: 3, target: 'enemy' }
    ]
}

move['wanted_katigrou_bond_improbable'] = {
    id: 'wanted_katigrou_bond_improbable',
    name: 'Bond Improbable',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 81, max: 113 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_katigrou_broukeul'] = {
    id: 'wanted_katigrou_broukeul',
    name: 'Broukeul',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 61, max: 95 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_katigrou_grougrou'] = {
    id: 'wanted_katigrou_grougrou',
    name: 'Grougrou',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 36, max: 57 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_fantomayte_qui_rit'] = {
    id: 'wanted_fantomayte_qui_rit',
    name: 'Qui rit',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 71, max: 140 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_fantomayte_qui_pete'] = {
    id: 'wanted_fantomayte_qui_pete',
    name: 'Qui pète',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'neutre', value: 90, duration: 2, target: 'enemy' }
    ]
}

move['wanted_fantomayte_litterature'] = {
    id: 'wanted_fantomayte_litterature',
    name: 'Littérature',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 35, duration: 3, target: 'enemy' }
    ]
}

move['wanted_vengeuse_masquee_coup_de_bulle'] = {
    id: 'wanted_vengeuse_masquee_coup_de_bulle',
    name: 'Coup de bulle',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 91, max: 180 }, target: 'enemy' }
    ]
}

move['wanted_vengeuse_masquee_attaque_vengeresse'] = {
    id: 'wanted_vengeuse_masquee_attaque_vengeresse',
    name: 'Attaque Vengeresse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 91, max: 180 }, target: 'enemy' }
    ]
}

move['wanted_vengeuse_masquee_esprit_de_vengeance'] = {
    id: 'wanted_vengeuse_masquee_esprit_de_vengeance',
    name: 'Esprit de Vengeance',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 40, duration: 3, target: 'self' },
        { type: 'renvoi', ratio: 0.3, target: 'self' }
    ]
}

move['wanted_yech_ti_goulaf'] = {
    id: 'wanted_yech_ti_goulaf',
    name: 'Goulaf\'',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'air', value: 200, duration: 1, target: 'enemy' }
    ]
}

move['wanted_yech_ti_che_tout_fraique'] = {
    id: 'wanted_yech_ti_che_tout_fraique',
    name: 'Che tout fraîque',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 76, max: 150 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 41, max: 75 }, target: 'enemy' }
    ]
}

move['wanted_yech_ti_ch_est_du_leque_mes_louppes'] = {
    id: 'wanted_yech_ti_ch_est_du_leque_mes_louppes',
    name: 'Ch\'est du lèque mes louppes',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 25, duration: 3, target: 'enemy' }
    ]
}

move['wanted_yech_ti_ti_t_as_bou'] = {
    id: 'wanted_yech_ti_ti_t_as_bou',
    name: 'Ti t\'as bou',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 151, max: 225 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 76, max: 120 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_yech_ti_ch_est_vraimint_abominap'] = {
    id: 'wanted_yech_ti_ch_est_vraimint_abominap',
    name: 'Ch\'est vraimint abominap\'',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 61, max: 120 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 31, max: 60 }, target: 'enemy' }
    ]
}

move['wanted_yech_ti_i_fait_cru'] = {
    id: 'wanted_yech_ti_i_fait_cru',
    name: 'I fait cru',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 151, max: 300 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 16, max: 30 }, target: 'enemy' }
    ]
}

move['wanted_yech_ti_ptio_quinquin'] = {
    id: 'wanted_yech_ti_ptio_quinquin',
    name: 'Ptio quinquin',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: { min: 90, max: 130 }, target: 'self' }
    ]
}

move['wanted_yech_ti_avoir_maux_a_ches_dints'] = {
    id: 'wanted_yech_ti_avoir_maux_a_ches_dints',
    name: 'Avoir maux à ches dints',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 76, max: 150 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_yech_ti_qu_i_est_mieffe_c_ti_la'] = {
    id: 'wanted_yech_ti_qu_i_est_mieffe_c_ti_la',
    name: 'Qu\'i est mieffe c\'ti-là',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 76, max: 150 }, target: 'enemy' }
    ]
}

move['wanted_dremoan_graine_de_dremoan'] = {
    id: 'wanted_dremoan_graine_de_dremoan',
    name: 'Graine de Dremoan',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'terre', value: 100, duration: 3, target: 'enemy' }
    ]
}

move['wanted_dremoan_mains_crochues'] = {
    id: 'wanted_dremoan_mains_crochues',
    name: 'Mains crochues',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 71, max: 105 }, target: 'enemy' }
    ]
}

move['wanted_dremoan_ronce_de_deperissement'] = {
    id: 'wanted_dremoan_ronce_de_deperissement',
    name: 'Ronce de dépérissement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 71, max: 90 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_dremoan_ronces_de_l_assassin'] = {
    id: 'wanted_dremoan_ronces_de_l_assassin',
    name: 'Ronces de l\'assassin',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 176, max: 350 }, target: 'enemy' },
        { type: 'dot', element: 'air', value: 251, duration: 2, target: 'enemy' }
    ]
}

move['wanted_dremoan_pourrissement_accelere'] = {
    id: 'wanted_dremoan_pourrissement_accelere',
    name: 'Pourrissement accéléré',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 90, max: 0 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_dremoan_zombification_putride'] = {
    id: 'wanted_dremoan_zombification_putride',
    name: 'Zombification putride',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'air', value: 50, duration: 1, target: 'enemy' }
    ]
}

move['wanted_flasho_courant_d_air'] = {
    id: 'wanted_flasho_courant_d_air',
    name: 'Courant d\'air',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 91, max: 135 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_flasho_agitation_moleculaire'] = {
    id: 'wanted_flasho_agitation_moleculaire',
    name: 'Agitation Moléculaire',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 126, max: 175 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 51, max: 75 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_flasho_amende'] = {
    id: 'wanted_flasho_amende',
    name: 'Amende',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 101, max: 200 }, target: 'enemy' },
        { type: 'dot', element: 'air', value: 201, duration: 1, target: 'enemy' }
    ]
}

move['wanted_flasho_vibration_moleculaire'] = {
    id: 'wanted_flasho_vibration_moleculaire',
    name: 'Vibration moléculaire',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 350, max: 0 }, target: 'enemy' }
    ]
}

move['wanted_viti_glourson_miel_cicatrisant'] = {
    id: 'wanted_viti_glourson_miel_cicatrisant',
    name: 'Miel Cicatrisant',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'air', value: 501, duration: 1, target: 'enemy' },
        { type: 'dot', element: 'air', value: 151, duration: 3, target: 'enemy' },
        { type: 'dot', element: 'air', value: 101, duration: 1, target: 'enemy' }
    ]
}

move['wanted_viti_glourson_mielodie'] = {
    id: 'wanted_viti_glourson_mielodie',
    name: 'Mielodie',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 30, duration: 3, target: 'enemy' }
    ]
}

move['wanted_viti_glourson_crepe_au_miel'] = {
    id: 'wanted_viti_glourson_crepe_au_miel',
    name: 'Crêpe au Miel',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 76, max: 100 }, target: 'enemy' }
    ]
}

move['wanted_viti_glourson_gloursonnerie'] = {
    id: 'wanted_viti_glourson_gloursonnerie',
    name: 'Gloursonnerie',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 91, max: 100 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_viti_glourson_statue_de_miel'] = {
    id: 'wanted_viti_glourson_statue_de_miel',
    name: 'Statue de Miel',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}

move['wanted_fuji_givrefoux_progeniture'] = {
    id: 'wanted_fuji_givrefoux_progeniture',
    name: 'Progéniture',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'damageReductionPct', value: 15, duration: 3, target: 'self' },
        { type: 'heal', heal: { min: 60, max: 90 }, target: 'self' }
    ]
}

move['wanted_fuji_givrefoux_lait_maternel'] = {
    id: 'wanted_fuji_givrefoux_lait_maternel',
    name: 'Lait Maternel',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'air', value: 151, duration: 1, target: 'enemy' }
    ]
}

move['wanted_fuji_givrefoux_foufoux'] = {
    id: 'wanted_fuji_givrefoux_foufoux',
    name: 'Foufoux',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 126, max: 160 }, target: 'enemy' }
    ]
}

move['wanted_glourdorak_gloursofulgur'] = {
    id: 'wanted_glourdorak_gloursofulgur',
    name: 'Gloursofulgur',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 126, max: 175 }, target: 'enemy' }
    ]
}

move['wanted_glourdorak_gloursopoing'] = {
    id: 'wanted_glourdorak_gloursopoing',
    name: 'Gloursopoing',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'neutre', damage: { min: 101, max: 150 }, target: 'enemy' }
    ]
}

move['wanted_glourdorak_dard_des_villes'] = {
    id: 'wanted_glourdorak_dard_des_villes',
    name: 'Dard des villes',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 51, max: 75 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_glourdorak_gloursolaser'] = {
    id: 'wanted_glourdorak_gloursolaser',
    name: 'Gloursolaser',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 151, max: 200 }, target: 'enemy' }
    ]
}

move['wanted_glourdorak_ruche_hour'] = {
    id: 'wanted_glourdorak_ruche_hour',
    name: 'Ruche Hour',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 26, max: 35 }, target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 51, max: 65 }, target: 'enemy' }
    ]
}

move['wanted_glourdorak_miel_de_jouvence'] = {
    id: 'wanted_glourdorak_miel_de_jouvence',
    name: 'Miel de Jouvence',
    cooldownMs: 2000,
    effects: [
        { type: 'hot', heal: 120, duration: 3, target: 'self' }
    ]
}

move['wanted_docteur_eggob_gobus_chaotique'] = {
    id: 'wanted_docteur_eggob_gobus_chaotique',
    name: 'Gobus Chaotique',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 30, duration: 3, target: 'enemy' }
    ]
}

move['wanted_docteur_eggob_robotisation'] = {
    id: 'wanted_docteur_eggob_robotisation',
    name: 'Robotisation',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 45, duration: 3, target: 'enemy' }
    ]
}

move['wanted_docteur_eggob_rayon_emeraude'] = {
    id: 'wanted_docteur_eggob_rayon_emeraude',
    name: 'Rayon Émeraude',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 101, max: 150 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_docteur_eggob_uf_de_la_mort'] = {
    id: 'wanted_docteur_eggob_uf_de_la_mort',
    name: 'Œuf de la Mort',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 201, max: 275 }, target: 'enemy' }
    ]
}

move['wanted_mekamouth_glyglyphe'] = {
    id: 'wanted_mekamouth_glyglyphe',
    name: 'Glyglyphe',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'res.neutre', value: 30, duration: 3, target: 'enemy' }
    ]
}

move['wanted_mekamouth_mekabouste'] = {
    id: 'wanted_mekamouth_mekabouste',
    name: 'Mekabouste',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 176, max: 200 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_mekamouth_la_defense_c_est_l_attaque'] = {
    id: 'wanted_mekamouth_la_defense_c_est_l_attaque',
    name: 'La défense c\'est l\'attaque',
    cooldownMs: 2000,
    effects: [
        { type: 'renvoi', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_mekamouth_liquide_de_refroidissement'] = {
    id: 'wanted_mekamouth_liquide_de_refroidissement',
    name: 'Liquide de refroidissement',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', value: 200, duration: 3, target: 'self' }
    ]
}

move['wanted_mekamouth_surtension'] = {
    id: 'wanted_mekamouth_surtension',
    name: 'Surtension',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 40, duration: 3, target: 'self' }
    ]
}

move['wanted_mekamouth_spahunglif'] = {
    id: 'wanted_mekamouth_spahunglif',
    name: 'Spahunglif',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 81, max: 100 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 81, max: 100 }, target: 'enemy' }
    ]
}

move['wanted_culbutuf_du_fond_du_cur'] = {
    id: 'wanted_culbutuf_du_fond_du_cur',
    name: 'Du fond du cœur',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 251, max: 300 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_culbutuf_roule_ma_boule'] = {
    id: 'wanted_culbutuf_roule_ma_boule',
    name: 'Roule ma boule',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 151, max: 200 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 151, max: 200 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 151, max: 200 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_culbutuf_sinistro_vole'] = {
    id: 'wanted_culbutuf_sinistro_vole',
    name: 'Sinistro vole',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 151, max: 200 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_culbutuf_de_bon_cur'] = {
    id: 'wanted_culbutuf_de_bon_cur',
    name: 'De bon cœur',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: { min: 150, max: 220 }, target: 'self' }
    ]
}

move['wanted_culbutuf_va_te_faire_cuire_un_uf'] = {
    id: 'wanted_culbutuf_va_te_faire_cuire_un_uf',
    name: 'Va te faire cuire un œuf',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'feu', value: 130, duration: 3, target: 'enemy' }
    ]
}

move['wanted_chevalier_de_glace_rafraichissement'] = {
    id: 'wanted_chevalier_de_glace_rafraichissement',
    name: 'Rafraîchissement',
    cooldownMs: 2000,
    effects: [
        { type: 'hot', heal: 100, duration: 3, target: 'self' }
    ]
}

move['wanted_chevalier_de_glace_souffler_n_est_pas_jouer'] = {
    id: 'wanted_chevalier_de_glace_souffler_n_est_pas_jouer',
    name: 'Souffler n\'est pas jouer',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 30, duration: 3, target: 'enemy' }
    ]
}

move['wanted_chevalier_de_glace_souffle_amollissant'] = {
    id: 'wanted_chevalier_de_glace_souffle_amollissant',
    name: 'Souffle amollissant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 101, max: 125 }, target: 'enemy' }
    ]
}

move['wanted_chevalier_de_glace_la_force_du_faible'] = {
    id: 'wanted_chevalier_de_glace_la_force_du_faible',
    name: 'La force du faible',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 101, max: 150 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_chevalier_de_glace_tranchant_absorbant'] = {
    id: 'wanted_chevalier_de_glace_tranchant_absorbant',
    name: 'Tranchant absorbant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 151, max: 200 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 151, max: 200 }, target: 'enemy' }
    ]
}

move['wanted_chevalier_de_glace_saut'] = {
    id: 'wanted_chevalier_de_glace_saut',
    name: 'Saut',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'self' }
    ]
}

move['wanted_psikopompe_coupe_jatte'] = {
    id: 'wanted_psikopompe_coupe_jatte',
    name: 'Coupe-Jatte',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 201, max: 250 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_psikopompe_sentence'] = {
    id: 'wanted_psikopompe_sentence',
    name: 'Sentence',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 151, max: 200 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'neutre', damage: { min: 151, max: 200 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_psikopompe_bondage'] = {
    id: 'wanted_psikopompe_bondage',
    name: 'Bondage',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 40, duration: 3, target: 'enemy' }
    ]
}

move['wanted_psikopompe_flagellation_stimulante'] = {
    id: 'wanted_psikopompe_flagellation_stimulante',
    name: 'Flagellation stimulante',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 35, duration: 3, target: 'self' }
    ]
}

move['wanted_psikopompe_retour_a_l_envoyeur'] = {
    id: 'wanted_psikopompe_retour_a_l_envoyeur',
    name: 'Retour à l\'envoyeur',
    cooldownMs: 2000,
    effects: [
        { type: 'renvoiTotal', ratio: 1.0, target: 'self' }
    ]
}

move['wanted_sam_sagaz_jardinage'] = {
    id: 'wanted_sam_sagaz_jardinage',
    name: 'Jardinage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_sam_sagaz_anneau_de_gaz'] = {
    id: 'wanted_sam_sagaz_anneau_de_gaz',
    name: 'Anneau de gaz',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 13, max: 17 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 17, max: 21 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 13, max: 17 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_sam_sagaz_appel_de_bolesh'] = {
    id: 'wanted_sam_sagaz_appel_de_bolesh',
    name: 'Appel de Bolesh',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 20, duration: 3, target: 'self' },
        { type: 'damage', element: 'neutre', damage: { min: 8, max: 14 }, target: 'enemy' }
    ]
}

move['wanted_maitre_boulet_acculement'] = {
    id: 'wanted_maitre_boulet_acculement',
    name: 'Acculement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_maitre_boulet_debitage'] = {
    id: 'wanted_maitre_boulet_debitage',
    name: 'Débitage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'neutre', damage: { min: 6, max: 10 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_maitre_boulet_invocation_de_tournesol'] = {
    id: 'wanted_maitre_boulet_invocation_de_tournesol',
    name: 'Invocation de Tournesol',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 20, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 15, duration: 3, target: 'self' }
    ]
}

move['wanted_roub_ignolles_vulnerabilite_bombesque'] = {
    id: 'wanted_roub_ignolles_vulnerabilite_bombesque',
    name: 'Vulnérabilité bombesque',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'res.feu', value: 25, duration: 3, target: 'enemy' }
    ]
}

move['wanted_roub_ignolles_pousse_bombe'] = {
    id: 'wanted_roub_ignolles_pousse_bombe',
    name: 'Pousse bombe',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 36, max: 55 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' }
    ]
}

move['wanted_roub_ignolles_teleportabombe'] = {
    id: 'wanted_roub_ignolles_teleportabombe',
    name: 'Téléportabombe',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 41, max: 60 }, target: 'enemy' }
    ]
}

move['wanted_bouss_baybe_salon'] = {
    id: 'wanted_bouss_baybe_salon',
    name: 'Salon',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}

move['wanted_bouss_baybe_econduire'] = {
    id: 'wanted_bouss_baybe_econduire',
    name: 'Éconduire',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 16, max: 25 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' }
    ]
}

move['wanted_bouss_baybe_porkasserie'] = {
    id: 'wanted_bouss_baybe_porkasserie',
    name: 'Porkasserie',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 20, duration: 3, target: 'enemy' }
    ]
}

move['wanted_nono_le_wobot_vewwouillage'] = {
    id: 'wanted_nono_le_wobot_vewwouillage',
    name: 'Vewwouillage',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 20, duration: 3, target: 'enemy' }
    ]
}

move['wanted_nono_le_wobot_wavelot_explosif'] = {
    id: 'wanted_nono_le_wobot_wavelot_explosif',
    name: 'Wavelot explosif',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_nono_le_wobot_massue_matwaquante'] = {
    id: 'wanted_nono_le_wobot_massue_matwaquante',
    name: 'Massue matwaquante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 11, max: 20 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_armada_l_invincible_tankafair'] = {
    id: 'wanted_armada_l_invincible_tankafair',
    name: 'Tankafair',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', value: 150, duration: 3, target: 'self' }
    ]
}

move['wanted_armada_l_invincible_canonnier'] = {
    id: 'wanted_armada_l_invincible_canonnier',
    name: 'Canonnier',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'neutre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_armada_l_invincible_manuvre'] = {
    id: 'wanted_armada_l_invincible_manuvre',
    name: 'Manœuvre',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'self' }
    ]
}

move['wanted_dragodingo_dingoboule'] = {
    id: 'wanted_dragodingo_dingoboule',
    name: 'Dingoboule',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'neutre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'neutre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_dragodingo_dingosouffle'] = {
    id: 'wanted_dragodingo_dingosouffle',
    name: 'Dingosouffle',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}

move['wanted_dragodingo_dingoprevention'] = {
    id: 'wanted_dragodingo_dingoprevention',
    name: 'Dingoprévention',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'air', value: 50, duration: 1, target: 'enemy' },
        { type: 'dot', element: 'air', value: 50, duration: 1, target: 'enemy' }
    ]
}

move['wanted_degolas_fleche_aveuglante'] = {
    id: 'wanted_degolas_fleche_aveuglante',
    name: 'Flèche Aveuglante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_degolas_masque_aveuglant'] = {
    id: 'wanted_degolas_masque_aveuglant',
    name: 'Masque Aveuglant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' }
    ]
}

move['wanted_degolas_fleche_repoussante'] = {
    id: 'wanted_degolas_fleche_repoussante',
    name: 'Flèche Repoussante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_prince_marchand_marchandage'] = {
    id: 'wanted_prince_marchand_marchandage',
    name: 'Marchandage',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 30, duration: 3, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 20, duration: 3, target: 'self' }
    ]
}

move['wanted_prince_marchand_palouf'] = {
    id: 'wanted_prince_marchand_palouf',
    name: 'Palouf',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_prince_marchand_charge_heroique'] = {
    id: 'wanted_prince_marchand_charge_heroique',
    name: 'Charge Héroïque',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'self' },
        { type: 'damage', element: 'neutre', damage: { min: 61, max: 90 }, target: 'enemy' }
    ]
}

move['wanted_jerart_dupaindur_murge'] = {
    id: 'wanted_jerart_dupaindur_murge',
    name: 'Murge',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_jerart_dupaindur_soif_inextinguible'] = {
    id: 'wanted_jerart_dupaindur_soif_inextinguible',
    name: 'Soif inextinguible',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 31, max: 45 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1.0, target: 'self' }
    ]
}

move['wanted_jerart_dupaindur_tournee_generale'] = {
    id: 'wanted_jerart_dupaindur_tournee_generale',
    name: 'Tournée générale',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_le_fantome_braideur_paleolitige'] = {
    id: 'wanted_le_fantome_braideur_paleolitige',
    name: 'Paléolitige',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_le_fantome_braideur_carroyage'] = {
    id: 'wanted_le_fantome_braideur_carroyage',
    name: 'Carroyage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 81, max: 100 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_le_fantome_braideur_mastaba'] = {
    id: 'wanted_le_fantome_braideur_mastaba',
    name: 'Mastaba',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 33, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 33, max: 40 }, target: 'enemy' }
    ]
}

move['wanted_gobrechaun_jig'] = {
    id: 'wanted_gobrechaun_jig',
    name: 'Jig',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'spd', value: 25, duration: 3, target: 'self' }
    ]
}

move['wanted_gobrechaun_lance_en_ciel'] = {
    id: 'wanted_gobrechaun_lance_en_ciel',
    name: 'Lance-en-Ciel',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 17, max: 20 }, target: 'enemy' }
    ]
}

move['wanted_vashkiwi_laitage'] = {
    id: 'wanted_vashkiwi_laitage',
    name: 'Laitage',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: { min: 90, max: 130 }, target: 'self' }
    ]
}

move['wanted_vashkiwi_sensations_pures'] = {
    id: 'wanted_vashkiwi_sensations_pures',
    name: 'Sensations Pures',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'critChance', value: 20, duration: 3, target: 'self' }
    ]
}

move['wanted_vashkiwi_fontaine_laiteuse'] = {
    id: 'wanted_vashkiwi_fontaine_laiteuse',
    name: 'Fontaine Laiteuse',
    cooldownMs: 2000,
    effects: [
        { type: 'hot', heal: 110, duration: 3, target: 'self' }
    ]
}

move['wanted_darma_vue_en_noir'] = {
    id: 'wanted_darma_vue_en_noir',
    name: 'Vue en Noir',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 91, max: 105 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_darma_vivacite_perdue'] = {
    id: 'wanted_darma_vivacite_perdue',
    name: 'Vivacité Perdue',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 35, duration: 3, target: 'enemy' }
    ]
}

move['wanted_darma_zhostile'] = {
    id: 'wanted_darma_zhostile',
    name: 'Zhostile',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 96, max: 115 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_mogligli_chienchien_rouge'] = {
    id: 'wanted_mogligli_chienchien_rouge',
    name: 'Chienchien Rouge',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 81, max: 90 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_mogligli_au_kanig'] = {
    id: 'wanted_mogligli_au_kanig',
    name: 'Au Kanig !',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 61, max: 70 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_mogligli_la_chasse_de_kaa_kaa'] = {
    id: 'wanted_mogligli_la_chasse_de_kaa_kaa',
    name: 'La Chasse de Kaa-Kaa',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 71, max: 85 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_glandaf_l_aigri_gnirdmalg'] = {
    id: 'wanted_glandaf_l_aigri_gnirdmalg',
    name: 'Gnirdmalg',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 81, max: 100 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_glandaf_l_aigri_anneau_de_feu'] = {
    id: 'wanted_glandaf_l_aigri_anneau_de_feu',
    name: 'Anneau de Feu',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'feu', value: 90, duration: 3, target: 'enemy' }
    ]
}

move['wanted_glandaf_l_aigri_grisaille'] = {
    id: 'wanted_glandaf_l_aigri_grisaille',
    name: 'Grisaille',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 35, duration: 3, target: 'enemy' }
    ]
}

move['wanted_crasper_crasse'] = {
    id: 'wanted_crasper_crasse',
    name: 'Crasse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 81, max: 100 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_crasper_lieu_hante'] = {
    id: 'wanted_crasper_lieu_hante',
    name: 'Lieu Hanté',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'feu', value: 120, duration: 3, target: 'enemy' }
    ]
}

move['wanted_crasper_amical'] = {
    id: 'wanted_crasper_amical',
    name: 'Amical',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 40, duration: 3, target: 'enemy' }
    ]
}

move['wanted_carter_le_pillard_dans_les_vapes'] = {
    id: 'wanted_carter_le_pillard_dans_les_vapes',
    name: 'Dans les vapes',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 121, max: 150 }, target: 'enemy' }
    ]
}

move['wanted_carter_le_pillard_ce_qui_est_a_toi_est_a_moi'] = {
    id: 'wanted_carter_le_pillard_ce_qui_est_a_toi_est_a_moi',
    name: 'Ce qui est à toi est à moi',
    cooldownMs: 2000,
    effects: [
        { type: 'buffDrain', value: 1, target: 'enemy' }
    ]
}

move['wanted_carter_le_pillard_souffle_embrume'] = {
    id: 'wanted_carter_le_pillard_souffle_embrume',
    name: 'Souffle embrumé',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_sans_visage_rage_avide'] = {
    id: 'wanted_sans_visage_rage_avide',
    name: 'Rage Avide',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 45, duration: 3, target: 'self' }
    ]
}

move['wanted_sans_visage_air_electrifiant'] = {
    id: 'wanted_sans_visage_air_electrifiant',
    name: 'Air Électrifiant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 81, max: 100 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_sans_visage_rage_foudroyante'] = {
    id: 'wanted_sans_visage_rage_foudroyante',
    name: 'Rage Foudroyante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 81, max: 100 }, target: 'enemy' }
    ]
}

move['wanted_sans_visage_invocation_de_bak'] = {
    id: 'wanted_sans_visage_invocation_de_bak',
    name: 'Invocation de Bak',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 71, max: 90 }, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 25, duration: 2, target: 'self' }
    ]
}

move['wanted_voldelor_sort_scelle'] = {
    id: 'wanted_voldelor_sort_scelle',
    name: 'Sort Scellé',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 61, max: 70 }, target: 'enemy' }
    ]
}

move['wanted_voldelor_magitation'] = {
    id: 'wanted_voldelor_magitation',
    name: 'Magitation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 61, max: 70 }, target: 'enemy' }
    ]
}

move['wanted_voldelor_armada_cadavra'] = {
    id: 'wanted_voldelor_armada_cadavra',
    name: 'Armada Cadavra',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 151, max: 160 }, target: 'enemy' }
    ]
}

move['wanted_voldelor_retour_a_la_vie'] = {
    id: 'wanted_voldelor_retour_a_la_vie',
    name: 'Retour à la vie',
    cooldownMs: 2000,
    effects: [
        { type: 'heal', heal: { min: 130, max: 180 }, target: 'self' }
    ]
}

move['wanted_aigripoil_aigrippement'] = {
    id: 'wanted_aigripoil_aigrippement',
    name: 'Aigrippement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_aigripoil_empalladium'] = {
    id: 'wanted_aigripoil_empalladium',
    name: 'Empalladium',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 61, max: 80 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_maxi_malle_decoffrage_brut'] = {
    id: 'wanted_maxi_malle_decoffrage_brut',
    name: 'Décoffrage Brut',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 50, max: 0 }, target: 'enemy' }
    ]
}

move['wanted_maxi_malle_macro_ondes'] = {
    id: 'wanted_maxi_malle_macro_ondes',
    name: 'Macro-Ondes',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}

move['wanted_mouchame_herd'] = {
    id: 'wanted_mouchame_herd',
    name: 'Herd',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 51, max: 60 }, target: 'enemy' }
    ]
}

move['wanted_gein_paralysie'] = {
    id: 'wanted_gein_paralysie',
    name: 'Paralysie',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 50, duration: 3, target: 'enemy' }
    ]
}

move['wanted_gein_substitution_funebre'] = {
    id: 'wanted_gein_substitution_funebre',
    name: 'Substitution Funèbre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 40, max: 0 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_gein_eveil_des_ames_perdues'] = {
    id: 'wanted_gein_eveil_des_ames_perdues',
    name: 'Éveil des âmes perdues',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}

move['wanted_panteroz_grift'] = {
    id: 'wanted_panteroz_grift',
    name: 'Grift',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 101, max: 110 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_panteroz_rayondule'] = {
    id: 'wanted_panteroz_rayondule',
    name: 'Rayondulé',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 91, max: 105 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_morblok_chronocharge'] = {
    id: 'wanted_morblok_chronocharge',
    name: 'Chronocharge',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 51, max: 55 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_morblok_rajeunissement'] = {
    id: 'wanted_morblok_rajeunissement',
    name: 'Rajeunissement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 31, max: 35 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'dot', element: 'air', value: 31, duration: 1, target: 'enemy' }
    ]
}

move['wanted_morblok_saute_heure'] = {
    id: 'wanted_morblok_saute_heure',
    name: 'Saute-heure',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 16, max: 25 }, target: 'enemy' }
    ]
}

move['wanted_hin_tetropre'] = {
    id: 'wanted_hin_tetropre',
    name: 'Tétropré',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 46, max: 50 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_hin_pouss_pouss'] = {
    id: 'wanted_hin_pouss_pouss',
    name: 'Pouss pouss',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'recul', target: 'enemy' }
    ]
}

move['wanted_hin_distanss'] = {
    id: 'wanted_hin_distanss',
    name: 'Distanss',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'enemy' },
        { type: 'buff', stat: 'spd', value: 20, duration: 2, target: 'self' }
    ]
}

move['wanted_sicogne_charge_destructrice'] = {
    id: 'wanted_sicogne_charge_destructrice',
    name: 'Charge Destructrice',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'neutre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_sicogne_superpuissance'] = {
    id: 'wanted_sicogne_superpuissance',
    name: 'Superpuissance',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 50, duration: 3, target: 'self' }
    ]
}

move['wanted_sicogne_annihilation'] = {
    id: 'wanted_sicogne_annihilation',
    name: 'Annihilation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 71, max: 90 }, target: 'enemy' }
    ]
}

move['wanted_sicogne_agression'] = {
    id: 'wanted_sicogne_agression',
    name: 'Agression',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_mi_enveloppage'] = {
    id: 'wanted_mi_enveloppage',
    name: 'Enveloppage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'neutre', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 16, max: 20 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_fou_coupe'] = {
    id: 'wanted_fou_coupe',
    name: 'Coupe',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_chi_emoussage'] = {
    id: 'wanted_chi_emoussage',
    name: 'Emoussage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 201, max: 220 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_ganos_matatak'] = {
    id: 'wanted_ganos_matatak',
    name: 'Matatak',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 51, max: 65 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_ganos_sanglinglin'] = {
    id: 'wanted_ganos_sanglinglin',
    name: 'Sanglinglin',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 71, max: 85 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_ganos_sabotage'] = {
    id: 'wanted_ganos_sabotage',
    name: 'Sabotage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 65, max: 75 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_ganos_taure_ture'] = {
    id: 'wanted_ganos_taure_ture',
    name: 'Taure Ture',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 11, max: 12 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_ganos_lardage'] = {
    id: 'wanted_ganos_lardage',
    name: 'Lardage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 61, max: 75 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_ganos_sanglissade'] = {
    id: 'wanted_ganos_sanglissade',
    name: 'Sanglissade',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 81, max: 95 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_ganos_taure_peur'] = {
    id: 'wanted_ganos_taure_peur',
    name: 'Taure Peur',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 37, max: 43 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_ganos_rugibier'] = {
    id: 'wanted_ganos_rugibier',
    name: 'Rugibier',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 30, duration: 2, target: 'enemy' }
    ]
}

move['wanted_ganos_groincision'] = {
    id: 'wanted_ganos_groincision',
    name: 'Groincision',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 91, max: 110 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_aermyne_braco_scalptaras_calin'] = {
    id: 'wanted_aermyne_braco_scalptaras_calin',
    name: 'Câlin',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'air', value: 31, duration: 1, target: 'enemy' }
    ]
}

move['wanted_aermyne_braco_scalptaras_malaxage'] = {
    id: 'wanted_aermyne_braco_scalptaras_malaxage',
    name: 'Malaxage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_aermyne_braco_scalptaras_sale_marmot'] = {
    id: 'wanted_aermyne_braco_scalptaras_sale_marmot',
    name: 'Sale marmot',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 50, max: 0 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'neutre', damage: { min: 50, max: 0 }, target: 'enemy' }
    ]
}

move['wanted_padgref_demoel_attraction'] = {
    id: 'wanted_padgref_demoel_attraction',
    name: 'Attraction',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' }
    ]
}

move['wanted_padgref_demoel_assaut_aerien'] = {
    id: 'wanted_padgref_demoel_assaut_aerien',
    name: 'Assaut aérien',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 9, max: 10 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 14, max: 16 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_padgref_demoel_transposition_aqueuse'] = {
    id: 'wanted_padgref_demoel_transposition_aqueuse',
    name: 'Transposition aqueuse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 51, max: 60 }, target: 'enemy' }
    ]
}

move['wanted_padgref_demoel_absorption_brulante'] = {
    id: 'wanted_padgref_demoel_absorption_brulante',
    name: 'Absorption brûlante',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 27, max: 31 }, target: 'enemy' }
    ]
}

move['wanted_padgref_demoel_sanction'] = {
    id: 'wanted_padgref_demoel_sanction',
    name: 'Sanction',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 41, max: 55 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 20, duration: 2, target: 'enemy' }
    ]
}

move['wanted_frakacia_leukocytine_crochet_fracassant'] = {
    id: 'wanted_frakacia_leukocytine_crochet_fracassant',
    name: 'Crochet fracassant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_frakacia_leukocytine_cri_fracassant'] = {
    id: 'wanted_frakacia_leukocytine_cri_fracassant',
    name: 'Cri fracassant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_frakacia_leukocytine_hyperleukocytine'] = {
    id: 'wanted_frakacia_leukocytine_hyperleukocytine',
    name: 'Hyperleukocytine',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 25, duration: 3, target: 'self' }
    ]
}

move['wanted_ogivol_scalarcin_ogivoltaique'] = {
    id: 'wanted_ogivol_scalarcin_ogivoltaique',
    name: 'Ogivoltaïque',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 16, max: 17 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_ogivol_scalarcin_ogivolage'] = {
    id: 'wanted_ogivol_scalarcin_ogivolage',
    name: 'Ogivolage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 25, max: 29 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'neutre', damage: { min: 25, max: 29 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_ogivol_scalarcin_ogivolatilise'] = {
    id: 'wanted_ogivol_scalarcin_ogivolatilise',
    name: 'Ogivolatilisé',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'feu', value: 20, duration: 3, target: 'enemy' }
    ]
}

move['wanted_ogivol_scalarcin_ogivologramme'] = {
    id: 'wanted_ogivol_scalarcin_ogivologramme',
    name: 'Ogivologramme',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 15, duration: 3, target: 'enemy' }
    ]
}

move['wanted_ogivol_scalarcin_ogivolverine'] = {
    id: 'wanted_ogivol_scalarcin_ogivolverine',
    name: 'Ogivolverine',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 38, max: 43 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_fouduglen_l_ecureuil_casse_noisettes'] = {
    id: 'wanted_fouduglen_l_ecureuil_casse_noisettes',
    name: 'Casse-noisettes',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 11, max: 15 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_fouduglen_l_ecureuil_discretion'] = {
    id: 'wanted_fouduglen_l_ecureuil_discretion',
    name: 'Discrétion',
    cooldownMs: 2000,
    effects: [
        { type: 'esquive', chancePct: 40, reductionPct: 100, duration: 3, target: 'self' }
    ]
}

move['wanted_brumen_tinctorias_elixir_curatif'] = {
    id: 'wanted_brumen_tinctorias_elixir_curatif',
    name: 'Élixir Curatif',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'air', value: 30, duration: 1, target: 'enemy' },
        { type: 'dot', element: 'air', value: 10, duration: 1, target: 'enemy' }
    ]
}

move['wanted_brumen_tinctorias_elixir_interdit'] = {
    id: 'wanted_brumen_tinctorias_elixir_interdit',
    name: 'Élixir Interdit',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 25, max: 29 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 15, max: 0 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_brumen_tinctorias_elixir_stimulant'] = {
    id: 'wanted_brumen_tinctorias_elixir_stimulant',
    name: 'Élixir Stimulant',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 25, duration: 3, target: 'self' }
    ]
}

move['wanted_brumen_tinctorias_elixir_revitalisant'] = {
    id: 'wanted_brumen_tinctorias_elixir_revitalisant',
    name: 'Élixir Revitalisant',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'air', value: 12, duration: 1, target: 'enemy' },
        { type: 'dot', element: 'air', value: 5, duration: 1, target: 'enemy' }
    ]
}

move['wanted_brumen_tinctorias_elixir_vampirique'] = {
    id: 'wanted_brumen_tinctorias_elixir_vampirique',
    name: 'Élixir Vampirique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 55, max: 62 }, target: 'enemy' },
        { type: 'damage', element: 'feu', damage: { min: 20, max: 0 }, target: 'enemy' }
    ]
}

move['wanted_qil_bil_lancer_de_poing'] = {
    id: 'wanted_qil_bil_lancer_de_poing',
    name: 'Lancer de poing',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_qil_bil_rage_cybernetique'] = {
    id: 'wanted_qil_bil_rage_cybernetique',
    name: 'Rage cybernétique',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 25, duration: 3, target: 'self' }
    ]
}

move['wanted_qil_bil_surchauffe'] = {
    id: 'wanted_qil_bil_surchauffe',
    name: 'Surchauffe',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_rok_gnorok_martelage'] = {
    id: 'wanted_rok_gnorok_martelage',
    name: 'Martelage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_rok_gnorok_armure_rocailleuse'] = {
    id: 'wanted_rok_gnorok_armure_rocailleuse',
    name: 'Armure rocailleuse',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', value: 180, duration: 3, target: 'self' }
    ]
}

move['wanted_rok_gnorok_surt'] = {
    id: 'wanted_rok_gnorok_surt',
    name: 'Surt',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 26, max: 35 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 16, max: 25 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 51, max: 70 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 41, max: 60 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 31, max: 50 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_musha_l_oni_onigiri'] = {
    id: 'wanted_musha_l_oni_onigiri',
    name: 'Onigiri',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 26, max: 50 }, target: 'enemy' }
    ]
}

move['wanted_musha_l_oni_onigaud'] = {
    id: 'wanted_musha_l_oni_onigaud',
    name: 'Onigaud',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 61, max: 90 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_musha_l_oni_onivoirien'] = {
    id: 'wanted_musha_l_oni_onivoirien',
    name: 'Onivoirien',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'damage', element: 'eau', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'neutre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_marzwel_le_gobelin_javeline_creuse'] = {
    id: 'wanted_marzwel_le_gobelin_javeline_creuse',
    name: 'Javeline creuse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_marzwel_le_gobelin_a_pied_d_uvre'] = {
    id: 'wanted_marzwel_le_gobelin_a_pied_d_uvre',
    name: 'À pied d\'œuvre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 41, max: 45 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_marzwel_le_gobelin_fuite_anticipee'] = {
    id: 'wanted_marzwel_le_gobelin_fuite_anticipee',
    name: 'Fuite anticipée',
    cooldownMs: 2000,
    effects: [
        { type: 'recul', target: 'self' },
        { type: 'buff', stat: 'spd', value: 20, duration: 2, target: 'self' }
    ]
}

move['wanted_zatoishwan_baton_virevoltant'] = {
    id: 'wanted_zatoishwan_baton_virevoltant',
    name: 'Bâton virevoltant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 225, max: 0 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_zatoishwan_fee_verte'] = {
    id: 'wanted_zatoishwan_fee_verte',
    name: 'Fée verte',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 91, max: 110 }, target: 'enemy' }
    ]
}

move['wanted_zatoishwan_vue_trouble'] = {
    id: 'wanted_zatoishwan_vue_trouble',
    name: 'Vue trouble',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 91, max: 110 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_zatoishwan_flasque_incendiaire'] = {
    id: 'wanted_zatoishwan_flasque_incendiaire',
    name: 'Flasque incendiaire',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 81, max: 90 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'eau', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_zatoishwan_colere_liquide'] = {
    id: 'wanted_zatoishwan_colere_liquide',
    name: 'Colère liquide',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'terre', value: 40, duration: 2, target: 'enemy' }
    ]
}

move['wanted_ali_grothor_ture'] = {
    id: 'wanted_ali_grothor_ture',
    name: 'Ture',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 121, max: 135 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'neutre', damage: { min: 181, max: 195 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_ali_grothor_hida'] = {
    id: 'wanted_ali_grothor_hida',
    name: 'Hida',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 76, max: 90 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 46, max: 60 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_ali_grothor_risation'] = {
    id: 'wanted_ali_grothor_risation',
    name: 'Risation',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 45 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_ali_grothor_rage_electrique'] = {
    id: 'wanted_ali_grothor_rage_electrique',
    name: 'Rage Électrique',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 91, max: 120 }, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 25, duration: 2, target: 'self' }
    ]
}

move['wanted_ambi_guman_patate'] = {
    id: 'wanted_ambi_guman_patate',
    name: 'Patate',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 26, max: 35 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_ambi_guman_roquette'] = {
    id: 'wanted_ambi_guman_roquette',
    name: 'Roquette',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_ambi_guman_enfant_de_la_terre'] = {
    id: 'wanted_ambi_guman_enfant_de_la_terre',
    name: 'Enfant de la terre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_exi_guman_spatezoignons'] = {
    id: 'wanted_exi_guman_spatezoignons',
    name: 'Spatézoignons',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'debuff', stat: 'atk', value: 15, duration: 2, target: 'enemy' }
    ]
}

move['wanted_exi_guman_chataigne'] = {
    id: 'wanted_exi_guman_chataigne',
    name: 'Châtaigne',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_exi_guman_pousses_ephemeres'] = {
    id: 'wanted_exi_guman_pousses_ephemeres',
    name: 'Pousses éphémères',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'terre', value: 20, duration: 1, target: 'enemy' }
    ]
}

move['wanted_gadoo_sucon_spongieux'] = {
    id: 'wanted_gadoo_sucon_spongieux',
    name: 'Suçon spongieux',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 61, max: 70 }, target: 'enemy' }
    ]
}

move['wanted_gadoo_vase'] = {
    id: 'wanted_gadoo_vase',
    name: 'Vase',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_gadoo_croute'] = {
    id: 'wanted_gadoo_croute',
    name: 'Croûte',
    cooldownMs: 2000,
    effects: [
        { type: 'shield', value: 120, duration: 3, target: 'self' }
    ]
}

move['wanted_gadoo_bain_de_boo'] = {
    id: 'wanted_gadoo_bain_de_boo',
    name: 'Bain de Boo',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'terre', value: 55, duration: 2, target: 'enemy' }
    ]
}

move['wanted_amy_l_empoisonneuse_ronce_animee'] = {
    id: 'wanted_amy_l_empoisonneuse_ronce_animee',
    name: 'Ronce animée',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 51, max: 65 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_amy_l_empoisonneuse_poison_vegetal'] = {
    id: 'wanted_amy_l_empoisonneuse_poison_vegetal',
    name: 'Poison végétal',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'terre', value: 70, duration: 3, target: 'enemy' }
    ]
}

move['wanted_amy_l_empoisonneuse_vignes_vampiriques'] = {
    id: 'wanted_amy_l_empoisonneuse_vignes_vampiriques',
    name: 'Vignes vampiriques',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 61, max: 70 }, target: 'enemy' },
        { type: 'dot', element: 'air', value: 61, duration: 1, target: 'enemy' }
    ]
}

move['wanted_amy_l_empoisonneuse_stranguronces'] = {
    id: 'wanted_amy_l_empoisonneuse_stranguronces',
    name: 'Stranguronces',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 81, max: 90 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_amy_l_empoisonneuse_foret_epineuse'] = {
    id: 'wanted_amy_l_empoisonneuse_foret_epineuse',
    name: 'Forêt épineuse',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 30, duration: 3, target: 'enemy' },
        { type: 'dot', element: 'terre', value: 50, duration: 2, target: 'enemy' }
    ]
}

move['wanted_ronce_animee_ronce_veneneuse'] = {
    id: 'wanted_ronce_animee_ronce_veneneuse',
    name: 'Ronce vénéneuse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'dot', element: 'air', value: 51, duration: 1, target: 'enemy' }
    ]
}

move['wanted_hyperscampe_riveteuse'] = {
    id: 'wanted_hyperscampe_riveteuse',
    name: 'Riveteuse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 61, max: 70 }, target: 'enemy' }
    ]
}

move['wanted_hyperscampe_percussion'] = {
    id: 'wanted_hyperscampe_percussion',
    name: 'Percussion',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 61, max: 70 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_hyperscampe_rupture'] = {
    id: 'wanted_hyperscampe_rupture',
    name: 'Rupture',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 111, max: 120 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_hyperscampe_forage'] = {
    id: 'wanted_hyperscampe_forage',
    name: 'Forage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 151, max: 170 }, target: 'enemy' }
    ]
}

move['wanted_tyranne_la_terrible_hyper_kick'] = {
    id: 'wanted_tyranne_la_terrible_hyper_kick',
    name: 'Hyper Kick',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_tyranne_la_terrible_1000_poings'] = {
    id: 'wanted_tyranne_la_terrible_1000_poings',
    name: '1000 Poings',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_tyranne_la_terrible_frappe_devastatrice'] = {
    id: 'wanted_tyranne_la_terrible_frappe_devastatrice',
    name: 'Frappe dévastatrice',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_fojumo_assassinat_silencieux'] = {
    id: 'wanted_fojumo_assassinat_silencieux',
    name: 'Assassinat silencieux',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 36, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 70, max: 0 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_fojumo_substitution_furtive'] = {
    id: 'wanted_fojumo_substitution_furtive',
    name: 'Substitution furtive',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'self' },
        { type: 'esquive', chancePct: 30, reductionPct: 100, duration: 2, target: 'self' }
    ]
}

move['wanted_fojumo_dissimulation_nocive'] = {
    id: 'wanted_fojumo_dissimulation_nocive',
    name: 'Dissimulation nocive',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 25, duration: 2, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 31, max: 45 }, target: 'enemy' }
    ]
}

move['wanted_guerrier_du_k_o_tremblement_de_guerre'] = {
    id: 'wanted_guerrier_du_k_o_tremblement_de_guerre',
    name: 'Tremblement de guerre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 35 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_guerrier_du_k_o_massacre_a_retardement'] = {
    id: 'wanted_guerrier_du_k_o_massacre_a_retardement',
    name: 'Massacre à retardement',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 41, max: 45 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_guerrier_du_k_o_carnageddon'] = {
    id: 'wanted_guerrier_du_k_o_carnageddon',
    name: 'Carnageddon',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_anatak_diskedor_lame_tempete'] = {
    id: 'wanted_anatak_diskedor_lame_tempete',
    name: 'Lame-tempête',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 35 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_anatak_diskedor_frappe_purificatrice'] = {
    id: 'wanted_anatak_diskedor_frappe_purificatrice',
    name: 'Frappe purificatrice',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_anatak_diskedor_coup_de_foudre'] = {
    id: 'wanted_anatak_diskedor_coup_de_foudre',
    name: 'Coup de Foudre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 36, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_anatak_diskedor_coup_de_foudre'] = {
    id: 'wanted_anatak_diskedor_coup_de_foudre',
    name: 'Coup de Foudre',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 46, max: 55 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_anatak_diskedor_frappe_purificatrice'] = {
    id: 'wanted_anatak_diskedor_frappe_purificatrice',
    name: 'Frappe purificatrice',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_anatak_diskedor_lame_tempete'] = {
    id: 'wanted_anatak_diskedor_lame_tempete',
    name: 'Lame-tempête',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 35 }, target: 'enemy' }
    ]
}

move['wanted_naganita_puissant_balayage'] = {
    id: 'wanted_naganita_puissant_balayage',
    name: 'Puissant balayage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_naganita_estoc_fatal'] = {
    id: 'wanted_naganita_estoc_fatal',
    name: 'Estoc fatal',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_grand_kongoku_puissance_lunaire'] = {
    id: 'wanted_grand_kongoku_puissance_lunaire',
    name: 'Puissance lunaire',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 35, duration: 3, target: 'self' }
    ]
}

move['wanted_grand_kongoku_invocation_de_la_cocolune'] = {
    id: 'wanted_grand_kongoku_invocation_de_la_cocolune',
    name: 'Invocation de la Cocolune',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 41, max: 55 }, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 20, duration: 2, target: 'self' }
    ]
}

move['wanted_grand_kongoku_deplacement_instantane'] = {
    id: 'wanted_grand_kongoku_deplacement_instantane',
    name: 'Déplacement instantané',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'self' }
    ]
}

move['wanted_grand_kongoku_saruharuha'] = {
    id: 'wanted_grand_kongoku_saruharuha',
    name: 'Saruharuha',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 41, max: 45 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_grand_kongoku_uppercut_magistral'] = {
    id: 'wanted_grand_kongoku_uppercut_magistral',
    name: 'Uppercut magistral',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_grand_kongoku_saruharuha'] = {
    id: 'wanted_grand_kongoku_saruharuha',
    name: 'Saruharuha',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 41, max: 45 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_grand_kongoku_uppercut_magistral'] = {
    id: 'wanted_grand_kongoku_uppercut_magistral',
    name: 'Uppercut magistral',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_grand_kongoku_deplacement_instantane'] = {
    id: 'wanted_grand_kongoku_deplacement_instantane',
    name: 'Déplacement instantané',
    cooldownMs: 2000,
    effects: [
        { type: 'switch', value: 1, target: 'self' }
    ]
}

move['wanted_nenufor_tilotus_spores_de_nympheacee'] = {
    id: 'wanted_nenufor_tilotus_spores_de_nympheacee',
    name: 'Spores de Nymphéacée',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'eau', value: 25, duration: 2, target: 'enemy' }
    ]
}

move['wanted_nenufor_tilotus_invocation_de_nufor'] = {
    id: 'wanted_nenufor_tilotus_invocation_de_nufor',
    name: 'Invocation de Nufor',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'buff', stat: 'atk', value: 15, duration: 2, target: 'self' }
    ]
}

move['wanted_nenufor_tilotus_rhizome_agressif'] = {
    id: 'wanted_nenufor_tilotus_rhizome_agressif',
    name: 'Rhizome agressif',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_trukipik_puissant_balayage'] = {
    id: 'wanted_trukipik_puissant_balayage',
    name: 'Puissant balayage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 26, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_trukipik_estoc_fatal'] = {
    id: 'wanted_trukipik_estoc_fatal',
    name: 'Estoc fatal',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 25 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_tournade_aspiration_de_masse'] = {
    id: 'wanted_tournade_aspiration_de_masse',
    name: 'Aspiration de masse',
    cooldownMs: 2000,
    effects: [
        { type: 'avance', target: 'enemy' },
        { type: 'damage', element: 'air', damage: { min: 26, max: 35 }, target: 'enemy' }
    ]
}

move['wanted_tournade_tourbillon_violent'] = {
    id: 'wanted_tournade_tourbillon_violent',
    name: 'Tourbillon violent',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 36, max: 45 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_tournade_tempete_devastatrice'] = {
    id: 'wanted_tournade_tempete_devastatrice',
    name: 'Tempête Dévastatrice',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 41, max: 45 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_roi_camole_taco_tak'] = {
    id: 'wanted_roi_camole_taco_tak',
    name: 'Taco Tak',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 36, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_roi_camole_epines_et_mirages'] = {
    id: 'wanted_roi_camole_epines_et_mirages',
    name: 'Épines et Mirages',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 31, max: 34 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_roi_camole_coucalactus'] = {
    id: 'wanted_roi_camole_coucalactus',
    name: 'Coucalactus',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 31, max: 35 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_roi_camole_foret_de_cactus'] = {
    id: 'wanted_roi_camole_foret_de_cactus',
    name: 'Forêt de Cactus',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 51, max: 55 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_khepricorne_coup_de_bouse'] = {
    id: 'wanted_khepricorne_coup_de_bouse',
    name: 'Coup de Bouse',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 81, max: 100 }, target: 'enemy' }
    ]
}

move['wanted_khepricorne_bouse_de_feu'] = {
    id: 'wanted_khepricorne_bouse_de_feu',
    name: 'Bouse de Feu',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 61, max: 70 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_khepricorne_roule_bouse'] = {
    id: 'wanted_khepricorne_roule_bouse',
    name: 'Roulé-bousé',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 101, max: 120 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_khepricorne_avoir_les_bouses'] = {
    id: 'wanted_khepricorne_avoir_les_bouses',
    name: 'Avoir les Bouses',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 35, duration: 3, target: 'enemy' }
    ]
}

move['wanted_khepricorne_bouse_de_la'] = {
    id: 'wanted_khepricorne_bouse_de_la',
    name: 'Bouse de là',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 101, max: 120 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_ka_youloud_mache_ouille'] = {
    id: 'wanted_ka_youloud_mache_ouille',
    name: 'Mâche Ouille',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_ka_youloud_liquide_gastrique'] = {
    id: 'wanted_ka_youloud_liquide_gastrique',
    name: 'Liquide gastrique',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'eau', value: 45, duration: 3, target: 'enemy' }
    ]
}

move['wanted_ka_youloud_pas_sage'] = {
    id: 'wanted_ka_youloud_pas_sage',
    name: 'Pas-sage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_ka_youloud_mache_ouille'] = {
    id: 'wanted_ka_youloud_mache_ouille',
    name: 'Mâche Ouille',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 41, max: 50 }, target: 'enemy' },
        { type: 'damage', element: 'neutre', damage: { min: 41, max: 50 }, target: 'enemy' }
    ]
}

move['wanted_ka_youloud_mache_ouille'] = {
    id: 'wanted_ka_youloud_mache_ouille',
    name: 'Mâche Ouille',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 51, max: 60 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_ka_youloud_pas_sage'] = {
    id: 'wanted_ka_youloud_pas_sage',
    name: 'Pas-sage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_ka_youloud_pas_sage'] = {
    id: 'wanted_ka_youloud_pas_sage',
    name: 'Pas-sage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 31, max: 40 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_simbadas_saut_precipite'] = {
    id: 'wanted_simbadas_saut_precipite',
    name: 'Saut précipité',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_simbadas_grosse_papatte'] = {
    id: 'wanted_simbadas_grosse_papatte',
    name: 'Grosse papatte',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 36, max: 55 }, target: 'enemy' },
        { type: 'damage', element: 'terre', damage: { min: 21, max: 30 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_carlita_de_l_aguerfelde_piege_a_mulou'] = {
    id: 'wanted_carlita_de_l_aguerfelde_piege_a_mulou',
    name: 'Piège à Mulou',
    cooldownMs: 2000,
    effects: [
        { type: 'trap', threshold: 3, element: 'terre', damage: { min: 41, max: 55 }, target: 'enemy' }
    ]
}

move['wanted_carlita_de_l_aguerfelde_depecage'] = {
    id: 'wanted_carlita_de_l_aguerfelde_depecage',
    name: 'Dépeçage',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 601, max: 800 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_carlita_de_l_aguerfelde_carabine_a_gros_gibier'] = {
    id: 'wanted_carlita_de_l_aguerfelde_carabine_a_gros_gibier',
    name: 'Carabine à gros gibier',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 21, max: 40 }, target: 'enemy' }
    ]
}

move['wanted_shushu_debruk_sayl_assimilation_d_energies'] = {
    id: 'wanted_shushu_debruk_sayl_assimilation_d_energies',
    name: 'Assimilation d\'énergies',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 41, max: 55 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 1.0, target: 'self' }
    ]
}

move['wanted_shushu_debruk_sayl_mue_demoniaque'] = {
    id: 'wanted_shushu_debruk_sayl_mue_demoniaque',
    name: 'Mue démoniaque',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 40, duration: 3, target: 'self' }
    ]
}

move['wanted_shushu_debruk_sayl_malediction_cuisante'] = {
    id: 'wanted_shushu_debruk_sayl_malediction_cuisante',
    name: 'Malédiction cuisante',
    cooldownMs: 2000,
    effects: [
        { type: 'dot', element: 'feu', value: 60, duration: 3, target: 'enemy' }
    ]
}

move['wanted_shushu_debruk_sayl_poing_des_secousses_deferlantes'] = {
    id: 'wanted_shushu_debruk_sayl_poing_des_secousses_deferlantes',
    name: 'Poing des secousses déferlantes',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 36, max: 50 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'terre', damage: { min: 36, max: 50 }, target: 'enemy' }
    ]
}

move['wanted_shushu_debruk_sayl_poing_des_vents_brulants'] = {
    id: 'wanted_shushu_debruk_sayl_poing_des_vents_brulants',
    name: 'Poing des vents brûlants',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 36, max: 50 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' },
        { type: 'damage', element: 'feu', damage: { min: 36, max: 50 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_predagob_moa_chasser_bestioles'] = {
    id: 'wanted_predagob_moa_chasser_bestioles',
    name: 'Moâ chasser bestioles !',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 501, max: 700 }, target: 'enemy' }
    ]
}

move['wanted_predagob_mine_gobliterante'] = {
    id: 'wanted_predagob_mine_gobliterante',
    name: 'Mine Goblitérante',
    cooldownMs: 2000,
    effects: [
        { type: 'trap', threshold: 3, element: 'feu', damage: { min: 251, max: 350 }, target: 'enemy' }
    ]
}

move['wanted_predagob_gobseques'] = {
    id: 'wanted_predagob_gobseques',
    name: 'Gobsèques',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 121, max: 160 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_cire_momore_metal_hurlant'] = {
    id: 'wanted_cire_momore_metal_hurlant',
    name: 'Métal Hurlant',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'eau', damage: { min: 60, max: 69 }, target: 'enemy' },
        { type: 'buff', stat: 'res.terre', value: 8, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.feu', value: 8, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.eau', value: 8, duration: 3, target: 'self' },
        { type: 'buff', stat: 'res.air', value: 8, duration: 3, target: 'self' }
    ]
}

move['wanted_cire_momore_briselame'] = {
    id: 'wanted_cire_momore_briselame',
    name: 'Briselâme',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 94, max: 109 }, target: 'enemy' }
    ]
}

move['wanted_cire_momore_triste_cire'] = {
    id: 'wanted_cire_momore_triste_cire',
    name: 'Triste Cire',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'feu', damage: { min: 61, max: 70 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_cire_momore_fatalite'] = {
    id: 'wanted_cire_momore_fatalite',
    name: 'Fatalité',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'air', damage: { min: 88, max: 99 }, target: 'enemy' }
    ]
}

move['wanted_gargandyas_sceaux_telluriques'] = {
    id: 'wanted_gargandyas_sceaux_telluriques',
    name: 'Sceaux Telluriques',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 121, max: 160 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}

move['wanted_gargandyas_amnesie_animale'] = {
    id: 'wanted_gargandyas_amnesie_animale',
    name: 'Amnésie Animale',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'spd', value: 40, duration: 3, target: 'enemy' }
    ]
}

move['wanted_gargandyas_cri_primitif'] = {
    id: 'wanted_gargandyas_cri_primitif',
    name: 'Cri Primitif',
    cooldownMs: 2000,
    effects: [
        { type: 'debuff', stat: 'atk', value: 45, duration: 3, target: 'enemy' }
    ]
}

move['wanted_gargandyas_rituel_primordial'] = {
    id: 'wanted_gargandyas_rituel_primordial',
    name: 'Rituel Primordial',
    cooldownMs: 2000,
    effects: [
        { type: 'buff', stat: 'atk', value: 45, duration: 3, target: 'self' }
    ]
}

move['wanted_gargandyas_gargameha'] = {
    id: 'wanted_gargandyas_gargameha',
    name: 'Gargameha',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'terre', damage: { min: 201, max: 260 }, target: 'enemy' }
    ]
}

move['wanted_gargandyas_rafale_bestiale'] = {
    id: 'wanted_gargandyas_rafale_bestiale',
    name: 'Rafale Bestiale',
    cooldownMs: 2000,
    effects: [
        { type: 'damage', element: 'neutre', damage: { min: 91, max: 130 }, target: 'enemy' },
        { type: 'lifesteal', ratio: 0.5, target: 'self' }
    ]
}
