// guideDictionary.js — Sections du menu Guide
// Ajoutez vos sections ici. Le titre est une chaîne, le contenu supporte le HTML (b, br, ul, li, p…)
// Pour ajouter une section : copiez un bloc { id, title, content } et modifiez-le.

const guideSections = [

    {
        id: 'interactions',
        title: '🖱️ Interactions — Clic droit / Appui long',
        content: `
            <p>Sur la plupart des éléments du jeu, vous pouvez afficher une <b>fiche de détails</b> :</p>
            <ul>
                <li>🖥️ <b>PC</b> : <b>clic droit</b> sur l'élément</li>
                <li>📱 <b>Mobile</b> : <b>appui long</b> sur l'élément</li>
            </ul>
            <p>Cela fonctionne sur :</p>
            <ul>
                <li>⚔️ <b>Ennemis</b> — stats, faiblesses, résistances</li>
                <li>🎒 <b>Objets</b> — description, effets, valeur</li>
                <li>🐾 <b>Familiers</b> — bonus apportés, rareté</li>
                <li>💎 <b>Drops</b> — taux de drop, provenance</li>
                <li>✨ <b>Sorts</b> — dégâts, effets, coût en PA</li>
            </ul>
        `
    },

    {
        id: 'ennemis',
        title: '⚔️ Ennemis',
        content: `
            <p>Les ennemis apparaissent lors de l'exploration des zones. Chaque ennemi possède :</p>
            <ul>
                <li><b>Stats</b> : PV (Points de vie), Puissance (multiplicateur de dommage de base), Initiative (vitesse), RESISTANCES</li>
                <li><b>Sorts</b> : les attaques qu'il peut utiliser en combat</li>
                <li><b>Familier</b> : les bonus qu'il octroit en tant que familier</li>
            </ul>
            <p>💡 <b>Clic droit / appui long</b> sur un ennemi pendant l'exploration pour voir sa fiche complète.</p>
        `
    },

    {
        id: 'objets',
        title: '🎒 Objets',
        content: `
            <p>Les objets se trouvent dans votre inventaire, la boutique ou comme récompenses de combat.</p>
            <ul>
                <li><b>Consommables</b> : objets consommables hors combat (exemple : clés de donjon)</li>
                <li><b>Équipements</b> : améliorent les stats de votre équipe</li>
                <li><b>Divers</b> : utilisés pour la forge ou autre</li>
            </ul>
            <p>💡 <b>Clic droit / appui long</b> sur un objet dans l'inventaire ou la boutique pour voir sa description et ses effets.</p>
        `
    },

    {
        id: 'familiers',
        title: '🐾 Familiers',
        content: `
            <p>Les familiers accompagnent votre équipe et accordent des bonus passifs.</p>
            <ul>
                <li>Chaque familier possède un <b>effet unique</b> actif en permanence pour le membre actif ou l'équipe en fonction du bonus</li>
                <li>Les familiers se trouvent lors de l'exploration ou dans la boutique</li>
                <li>Un seul familier peut être actif à la fois pour chaque membre de l'équipe</li>
            </ul>
            <p>💡 <b>Clic droit / appui long</b> sur un familier pour voir son bonus et sa rareté.</p>
        `
    },

    {
        id: 'drops',
        title: '💎 Drops',
        content: `
            <p>Les drops sont les objets récupérés après avoir vaincu des ennemis.</p>
            <ul>
                <li>Chaque zone a sa propre <b>table de drops</b></li>
                <li>Le <b>taux de drop</b> varie selon le niveau de la zone</li>
                <li>Certains objets rares ne tombent que dans des zones spécifiques</li>
            </ul>
            <p>💡 <b>Clic droit / appui long</b> sur un drop affiché en récompense pour voir son détail.</p>
        `
    },

    {
        id: 'sorts',
        title: '✨ Sorts',
        content: `
            <p>Les sorts sont les attaques et capacités utilisées en combat.</p>
            <ul>
                <li><b>Recharge</b> : temps nécessaires pour lancer le sort</li>
                <li><b>Dégâts / Effets</b> : ce que le sort inflige ou applique</li>
                <li><b>Type élémentaire</b> : Feu, Eau, Terre, Air ou Neutre</li>
                <li>Certains sorts ont des <b>effets de statut</b> : empoisonnement, ralentissement, etc.</li>
            </ul>
            <p>💡 <b>Clic droit / appui long</b> sur un sort dans la liste des compétences pour voir sa description complète.</p>
        `
    },

    {
        id: 'effets',
        title: '📖 Types d\'effets de sorts',
        content: `
            <p>Chaque sort peut combiner plusieurs effets appliqués dans l'ordre de leur liste.</p>

            <p><b>⚔️ Dégâts directs</b><br>
            Inflige des dégâts immédiats à la cible. Le calcul tient compte de la stat <b>Puissance</b> du lanceur,
            de son <b>bonus de dégâts bruts</b>, de l'<b>élément</b> du sort et des <b>résistances</b> de la cible.
            Un coup peut être <b>critique</b> (bonus de dégâts en % - base fixée à +50%).</p>

            <p><b>🔥 Poison / Brûlure (DoT)</b><br>
            Applique un effet de dégâts sur la durée. La cible subit les dégâts au début de chacun de ses tours/lancés de sorts,
            pendant le nombre de tours/lancés de sorts indiqué. Plusieurs DoTs peuvent se cumuler.</p>

            <p><b>💚 Soin</b><br>
            Restaure des PV au lanceur, a un membre de l'équipe ou à l'équipe entière. Certains soins sont fixes (pv bruts), d'autres sont
            un <b>% des PV max</b> de la cible soignée.</p>

            <p><b>🩸 Vol de vie</b><br>
            Soigne le lanceur d'un pourcentage des dégâts infligés par l'effet <b>précédent</b> du sort.
            Est toujours placé après un effet de dégâts.</p>

            <p><b>⬆️ Buff / Debuff</b><br>
            Modifie temporairement une stat (Puissance, Initiative, dégâts bruts…). Les buffs s'appliquent au lanceur ou à son équipe,
            les debuffs à la cible adverse. La durée est exprimée en <b>nombre de tours du porteur</b> (nombre de lancés de sort ennemis ou alliers).</p>

            <p><b>🛡️ Bouclier</b><br>
            Absorbe les dégâts reçus avant que les PV ne soient affectés. Un seul boost de bouclier actif à la fois.
            Le bouclier disparaît quand sa valeur tombe à 0 ou à la fin de sa durée.
            Si un sort de bouclier est relancé alors que le précédent gain de bouclier n'est pas totalement consumé, 
            sa valeur n'est pas appliquée (s'il reste 1 point de bouclier, le sort qui est censé en donner n'en donne pas).</p>

            <p><b>🩹 Érosion</b><br>
            Réduit les <b>PV maximum</b> de la cible en proportion des dégâts infligés (taux de base : 5%).
            Certains sorts augmentent ce taux. Les PV max réduits ne se régénèrent pas pendant le combat.</p>

            <p><b>🔄 Renvoi</b><br>
            Le prochain coup reçu est renvoyé à l'attaquant (la cible ne subit aucun dégât).
            Usage unique, disparaît après activation.</p>

            <p><b>📈 Scaling de sort</b><br>
            Certains sorts deviennent plus puissants à chaque lancer consécutif puis reviennent à leur valeur de départ
            (ou se bloquent au palier maximum). Le compteur se remet à zéro entre les combats.</p>

            <p><b>🌐 Effets de zone (Raid uniquement)</b></p>
            <ul>
                <li><b>Tous les ennemis</b> — frappe les 3 ennemis simultanément.</li>
                <li><b>Splash</b> — inflige un pourcentage des dégâts de l'ennemi principal à l'ennemi secondaire
                    (et/ou tertiaire), en ignorant ses défenses.</li>
                <li><b>Ennemi secondaire / tertiaire ciblé</b> — frappe un slot ennemi précis
                    avec un pourcentage défini des dégâts de base, en passant par les défenses normales.</li>
                <li><b>Rotation</b> — frappe un ennemi différent à chaque lancer en tournant sur les 3 slots,
                    avec un multiplicateur de dégâts qui évolue selon le tour de rotation.</li>
            </ul>
            <p>En <b>solo</b>, tous les effets de zone ciblent l'ennemi unique (les hits secondaires et tertiaires sont ignorés).</p>
        `
    },

    {
        id: 'stats-fondamentales',
        title: '📊 Stats fondamentales — PV, Puissance, Init, Resistance',
        content: `
            <p>Chaque personnage possède quatre stats de base qui définissent son comportement en combat.</p>

            <p>❤️ <b>PV (Points de Vie)</b><br>
            Jauge de vie. À 0, le personnage est KO.<br>
            Base : ~140–160 selon la classe. Croît d'environ +5 par niveau.<br>
            Le minimum absolu est <b>1 PV</b> — jamais en dessous.</p>

            <p>⚔️ <b>Puissance (Attaque)</b><br>
            Multiplie les dégâts de tous les sorts offensifs.<br>
            Base : ~90–110 selon la classe. Croît d'environ +5 par niveau.<br>
            Formule : <b>dégâts × (1 + Puissance / 100)</b><br>
            Exemple : 200 Puissance → les dégâts de base sont ×3.</p>

            <p>💨 <b>Initiative (Vitesse)</b><br>
            Détermine la <b>vitesse des tours</b>. Chaque personnage a une jauge qui se remplit selon son init — plus elle est haute, plus il agit rapidement.<br>
            Base : ~95–105 selon la classe.<br>
            Un personnage à 200 d'initiative agit <b>deux fois plus vite</b> qu'un personnage à 100 d'initiative.</p>

            <p>🛡️ <b>Résistances (Résistances élémentaires en %)</b><br>
            Réduit les dégâts entrants selon l'élément du sort reçu.<br>
            Il existe <b>5 éléments</b> : Neutre, Terre, Feu, Eau, Air.<br>
            Formule : <b>dégâts × (1 − RES / 100)</b><br>
            Exemple : 30 % en Feu → les dégâts de Feu réduits de 30 %.<br>
            ⚠️ Plafond à <b>50 %</b> par élément — impossible de dépasser.</p>
        `
    },

    {
        id: 'stats-offensives',
        title: '⚡ Stats offensives avancées',
        content: `
            <p>Ces stats s'obtiennent via l'équipement, les familiers, les buffs ou les passifs de classe. Elles se cumulent avec la Puissance.</p>

            <p>➕ <b>Dommages fixes</b><br>
            Valeur fixe ajoutée aux dégâts <i>après</i> la multiplication par la Puissance, mais avant les multiplicateurs % finaux.<br>
            Non applicable aux sorts dont les dégâts sont calculés en <b>% des PV</b>.</p>

            <p>🔥 <b>Dégâts finaux %</b><br>
            Multiplicateur global appliqué en dernier sur tous les dégâts.<br>
            Formule : <b>dégâts × (1 + Dégâts finaux % / 100)</b><br>
            Exemple : +20 % → tous les dégâts ×1,2. Peut être négatif (réduction).</p>

            <p>✨ <b>Dégâts de sorts %</b><br>
            Multiplicateur secondaire, cumulé avec les Dégâts finaux %.<br>
            Formule : <b>dégâts × (1 + Dégâts de sorts % / 100)</b></p>

            <p>🎯 <b>Taux de critique %</b><br>
            Probabilité de déclencher un coup critique à chaque attaque.<br>
            Base : fixée à zéro (sauf passif).<br>
            ⚠️ Plafond à <b>100 %</b>.</p>

            <p>💥 <b>Dégâts critiques %</b><br>
            Bonus de dégâts appliqué lors d'un coup critique.<br>
            Valeur de base : <b>+50 %</b> (soit ×1,5 sur les dégâts).<br>
            Formule : <b>dégâts × (1 + Dégâts critiques % / 100)</b><br>
            Minimum à <b>0 %</b> — ne peut pas devenir négatif.</p>
        `
    },

    {
        id: 'stats-defensives',
        title: '🛡️ Stats défensives avancées',
        content: `
            <p>En plus des résistances élémentaires, d'autres mécaniques protègent votre équipe.</p>

            <p>🔰 <b>Réduction des dégâts %</b><br>
            Réduit <i>tous</i> les dégâts entrants, tous éléments confondus, après les résistances.<br>
            Formule : <b>dégâts × (1 − Réduction % / 100)</b><br>
            ⚠️ Plafond à <b>50 %</b>.<br>
            ℹ️ Résistances et Réduction sont deux mécaniques distinctes qui se cumulent : 50 % RES + 50 % Réduction → 75 % de réduction totale effective, pas 100 %.</p>

            <p>🫧 <b>Bouclier</b><br>
            Absorbe les dégâts <i>avant</i> les PV, en priorité absolue.<br>
            Se consomme progressivement. Certaines classes (ex : Zobal) en génèrent via leur passif.</p>

            <p>🔄 <b>Renvoi de dégâts</b><br>
            Renvoie un % des dégâts reçus à l'attaquant.<br>
            Calculé sur les dégâts bruts (avant bouclier). Consommé après un seul coup reçu.</p>

            <p>💀 <b>Érosion</b><br>
            Réduit les <b>PV maximum</b> de la cible en proportion des dégâts infligés.<br>
            Taux de base : <b>5 %</b> (modifiable par certains sorts).<br>
            Exemple : infliger 100 dégâts → les PV max de la cible baissent de 5.<br>
            Les PV max réduits ne se récupèrent pas pendant le combat.</p>
        `
    },

    {
        id: 'stats-soin',
        title: '💚 Stats de soin',
        content: `
            <p>Ces stats améliorent l'efficacité des soins. Elles s'obtiennent via l'équipement.</p>

            <p>💊 <b>Soin %</b><br>
            Augmente les soins de sorts ciblant un seul allié.<br>
            Formule : <b>soin × (1 + Soin % / 100)</b></p>

            <p>💊 <b>Soin d'équipe %</b><br>
            Augmente les soins de sorts qui affectent toute l'équipe.<br>
            Formule : <b>soin × (1 + Soin équipe % / 100)</b></p>

            <p>💊 <b>Soin % PV max</b><br>
            Augmente les soins calculés en pourcentage des PV maximum de la cible.<br>
            Formule : <b>PV max cible × (valeur % × (1 + Soin PV max % / 100))</b></p>

            <p>🩸 <b>Vol de vie %</b><br>
            Soigne le lanceur d'un % des dégâts infligés, automatiquement après un sort de dégâts avec cet effet.<br>
            Formule : <b>soin = dégâts infligés × (ratio de base + Vol de vie % / 100)</b></p>
        `
    },

    {
        id: 'formule-degats',
        title: '🧮 Formule de dégâts — ordre de calcul',
        content: `
            <p>Les dégâts sont calculés dans cet ordre précis à chaque coup :</p>
            <ol>
                <li><b>Lancer de dés</b> — valeur aléatoire entre le min et le max du sort<br>
                <i>(sorts en % de PV : dégâts = PV cible ou lanceur × %)</i></li>
                <li><b>× (1 + ATK / 100)</b> — multiplication par l'attaque <i>(ignoré pour les sorts en % de PV)</i></li>
                <li><b>+ Dégâts plats</b> <i>(ignoré pour les sorts en % de PV)</i></li>
                <li><b>× (1 + Dégâts finaux % / 100)</b></li>
                <li><b>× (1 + Dégâts de sorts % / 100)</b></li>
                <li><b>× (1 − Résistance élémentaire / 100)</b></li>
                <li><b>× (1 − Réduction des dégâts % / 100)</b></li>
                <li><b>× (1 + Dégâts critiques % / 100)</b> — uniquement si coup critique</li>
                <li><b>Absorption du bouclier</b> — le bouclier encaisse en priorité avant les PV</li>
                <li><b>Minimum 1</b> — un coup inflige toujours au moins 1 dégât</li>
            </ol>
            <p>⚠️ Les Résistances élémentaires et la Réduction des dégâts sont deux couches séparées — elles se multiplient entre elles, pas s'additionnent.</p>
        `
    },

    ,{
        id: 'boss-ultime',
        title: '🐉 Boss Ultime — Dragons Élémentaires',
        content: `
            <p>Les <b>Boss Ultimes</b> sont des dragons élémentaires aux PV colossaux (5 000 000 PV) qui persistent entre vos sessions. Leur progression est sauvegardée : si vous ne les tuez pas en un combat, vous retrouvez le dragon au même état d'HP lors de votre prochaine tentative.</p>

            <p><b>📋 Préparation</b></p>
            <ul>
                <li>Composez une <b>équipe de 3 membres</b> dédiée aux Boss Ultimes (indépendante de votre équipe principale).</li>
                <li>Pour chaque membre, sélectionnez un <b>deck de 10 sorts</b> parmi ses sorts débloqués.</li>
                <li>À chaque tour de combat, vous choisirez <b>5 sorts parmi vos 10</b> à lancer dans l'ordre de votre choix.</li>
            </ul>

            <p><b>⚔️ Déroulement d'un tour</b></p>
            <ol>
                <li>Choisissez quel membre joue ce tour.</li>
                <li>Sélectionnez <b>5 sorts</b> dans l'ordre souhaité.</li>
                <li>Les 5 sorts se résolvent automatiquement, avec un tick de DoTs/buffs après chaque sort.</li>
                <li>Le boss attaque ensuite <b>tous les membres</b> : le membre actif reçoit <b>100 % des dégâts</b>, les deux autres <b>50 %</b>.</li>
                <li>Un nouveau tour commence — choisissez un autre membre (ou le même).</li>
            </ol>

            <p><b>🌋 Phases du dragon</b><br>
            Chaque dragon possède <b>2 phases</b>. La transition vers la Phase 2 se déclenche quand le boss tombe en dessous de <b>30 % de ses PV</b>, à la fin des 5 sorts du membre en cours.<br>
            En Phase 2, le boss gagne en Puissance, de meilleures résistances, et change son répertoire de sorts.</p>

            <p><b>💾 Persistance des PV</b></p>
            <ul>
                <li><b>Défaite</b> : les PV actuels du dragon sont sauvegardés. La tentative du jour est consommée.</li>
                <li><b>Victoire</b> : le dragon revient à ses PV max en Phase 1, prêt pour la prochaine tentative.</li>
                <li>⚠️ Si vous quittez le combat sans mourir, aucune sauvegarde n'est effectuée — les PV du boss ne sont pas modifiés.</li>
            </ul>

            <p><b>🃏 Invocations en combat</b><br>
            Si un de vos membres invoque un allié, celui-ci enchaîne automatiquement <b>tous ses sorts</b> (visibles un par un) dès son apparition, puis disparaît. Les invocations ne peuvent pas déclencher d'autres invocations.</p>

            <p>💡 <b>Conseil</b> : exploitez les faiblesses élémentaires du dragon (Eau contre Ignemikhal, Feu contre Aguabrial) et gardez un membre orienté soin ou buff défensif pour absorber les attaques de zone du boss.</p>
        `
    },

]
