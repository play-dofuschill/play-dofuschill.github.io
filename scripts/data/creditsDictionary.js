// creditsDictionary.js — Sections du menu Crédits
// Même format que guideDictionary.js : { id, title, content }

const creditsSections = [

    {
        id: 'apropos',
        title: '🎮 À propos de DofusChill',
        content: `
            <p>
                <strong>DofusChill</strong> est un jeu de combat au tour par tour inspiré de l'univers de
                <strong>Dofus</strong>, le célèbre MMORPG développé par <strong>Ankama Games</strong>.
            </p>
            <p>
                Ce projet est un hommage personnel et non officiel à cet univers. Il reprend les classes,
                les sorts, les zones et la direction artistique du jeu original pour offrir une expérience
                détendue, accessible et jouable directement dans le navigateur, sans inscription,
                sans achats, sans mode online, sans prise de tête.
            </p>
            <p>
                ⚠️ <em>Projet entièrement non officiel.</em><br>
                Tous les personnages et la propriété intellectuelle associée présentés sont la propriété exclusive
                d'<strong>Ankama</strong>. Toute utilisation est réservée à des fins non commerciales et de
                divertissement. Aucun droit de propriété n'est revendiqué, tous les droits demeurent la propriété
                de leurs détenteurs respectifs.
            </p>
            <p>
                👉 Allez jouer aux jeux officiels sur <strong>dofus.com</strong> !
            </p>
        `
    },

    {
        id: 'createur',
        title: '👤 Créateur',
        content: `
            <p>
                DofusChill a été conçu, développé et maintenu par <strong>Yannick</strong>.
            </p>
            <p>
                Projet démarré comme fork de PokéChill et addapté à l'univers du Krosmos :
                classes, sorts, zones, familiers, forge, almanax…
            </p>
            <p>
                Merci à tous ceux qui jouent, remontent des bugs et donnent des idées, chaque retour compte !
            </p>
        `
    },

    {
        id: 'disclaimer',
        title: '⚠️ disclaimer',
        content: `
            <p>
                Je ne suis pas dev, je ne suis pas game designer, je ne suis pas équilibrateur de jeu ou je ne sais quoi donc si vous avez besoin de faire remonter des équilibrages que vous trouvez abusés ou autre faites remonter on ajustera !</strong>
            </p>
        `
    },

    {
        id: 'discord',
        title: '💬 Communauté Discord',
        content: `
            <p>
                Rejoins la communauté DofusChill pour discuter du jeu, proposer des idées,
                signaler des bugs ou juste papoter !
            </p>
            <p style="text-align: center; margin: 1.2rem 0;">
                <a href="https://discord.gg/wHfufyBS4H" target="_blank"
                   style="display: inline-block; padding: 0.6rem 1.4rem; background: #5865F2;
                          color: white; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 1.1rem;">
                    Rejoindre le Discord
                </a>
            </p>
            <p style="font-size: 0.85rem; color: #aaa; text-align: center;">
                discord.gg/wHfufyBS4H
            </p>
        `
    },

    {
        id: 'idees',
        title: '💡 Idées & Vision',
        content: `
            <p>
                Voici quelques idées qui traînent dans un coin de ma tête mais pour lesquelles je de temps et de compétences pour qu'elles puissent voir le jour.
                Si l'une d'elles vous parle, <strong>le Discord est là pour en discuter !</strong>
            </p>
            <ul>
                <li>🗺️ <strong>Histoire & lore</strong> — une vraie trame narrative ancrée dans le Krosmos, RP personnages/dialogues, où on vit la découverte du monde des douzes depuis le point de vu d'un aventurier (cf les descriptions des</li>
                <li>⚔️ <strong>Mécaniques de combat avancées</strong> — système de combat enrichi et plus spécifique à l'univers DofusChill, actuellement j'ai essayé de créer des mécaniques complexes pour certains personnages mais je n'ai pas poussé le vice très loin, beaucoup de sorts sont bateaux et d'autres inutiles.</li>
            </ul>
            <p style="font-size: 0.9rem; color: #aaa;">
                Cette liste sera complétée au fil du temps. Toutes les contributions et discussions sont les bienvenues sur le Discord.
            </p>
        `
    },

    {
        id: 'contribuer',
        title: '🤝 Contribuer au projet',
        content: `
            <p>
                Si vous êtes <strong>graphiste</strong>, <strong>développeur</strong>, <strong>passionné</strong>
                ou simplement motivé à développer ce fan game…
                une section sur le Discord est mise à disposition pour prendre contact et faire de ce fan game
                une <strong>pépite</strong> !
            </p>
            <p style="text-align: center; margin: 1.2rem 0;">
                <a href="https://discord.gg/wHfufyBS4H" target="_blank"
                   style="display: inline-block; padding: 0.6rem 1.4rem; background: #5865F2;
                          color: white; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 1.1rem;">
                    Nous rejoindre sur Discord
                </a>
            </p>
        `
    },

    {
        id: 'etatdujeu',
        title: '🚧 État actuel du jeu',
        content: `
            <p>
                DofusChill est encore en développement actif. Voici où en est le projet aujourd'hui :
            </p>
            <ul>
                <li>🤖 Environ <strong>70 % du code</strong> a été produit en collaboration avec <strong>Claude Code</strong> (IA d'Anthropic)</li>
                <li>🗺️ Presque toutes les <strong> zones</strong> ont été implémentées mais pour le moment aucune mécanique spéciale ou équilibrage n'a été implémenté</li>
                <li>🔧 Le contenu et la profondeur de chaque zone est encore limité (beaucoup de génération et équilibrage automatique), j'ai très peu équilibré tout ce qui est classes, sorts équipements</li>
            </ul>
            <p>
                De prochaines mises à jour viendront corriger les différents bugs, ajouter des features etc
                Il va ya avoir de nouveaux équipements, mécaniques enrichies… Le jeu grandira avec le temps et les contributions de la communauté.
            </p>
            <p style="font-size: 0.9rem; color: #aaa;">
                Merci de votre patience et de votre soutien à ce stade précoce du projet !
            </p>
        `
    },

    {
        id: 'technologies',
        title: '🛠️ Technologies utilisées',
        content: `
            <ul>
                <li><strong>Vanilla JS / HTML / CSS</strong> - pas de framework, 100 % natif navigateur</li>
                <li><strong>Fuse.js</strong> - recherche floue dans les dictionnaires</li>
                <li><strong>HackTimer.js</strong> - timers fiables en arrière-plan</li>
            </ul>
            <p>
                Tous les assets graphiques (sprites de classes, monstres, icônes d'équipement) proviennent
                de l'univers <strong>Dofus</strong> et appartiennent à <strong>Ankama</strong>.
            </p>
        `
    },

]
