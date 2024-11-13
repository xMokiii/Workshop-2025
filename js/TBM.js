// Tableau des scénarios avec les images des rails, train, choix et destruction
const scenarios = [
    {
        level: 1,
        name: "Classique",
        trackImage: "../style/img/DevProb/track.svg",
        trainImage: "../style/img/DevProb/train_final.png",
        choiceImage1: "../style/img/DevProb/5guyt.png",
        choiceImage2: "../style/img/DevProb/oneguy.png",
        destructionBas: "../style/img/DevProb/splat.png",
        destructionHaut: "../style/img/DevProb/splat.png",
        question: "Oh non ! Un tramway se dirige vers 5 personnes ! Tu peux hacker le Tram et le diriger vers l'autre rail, tuant une personne à la place. Que fais-tu ?",
        options: ["Ne rien faire", "Hacker le système"]
    },
    {
        level: 2,
        name: "Discipline",
        trackImage: "../style/img/DevProb/track.svg",
        trainImage: "../style/img/DevProb/train_final.png",
        choiceImage1: "../style/img/DevProb/dreamsetup.png",
        choiceImage2: "../style/img/DevProb/spaghetticode.png",
        destructionBas: "../style/img/DevProb/splat.png",
        destructionHaut: "../style/img/DevProb/splat.png",
        question: "Oh non ! Ce tramway va te forcer à reprendre ton spaghetti code durant ton temps libre ! Tu peux hacker le Tram et faire des recherches pour ton prochain setup à la place. Que fais-tu ?",
        options: ["Être studieux", "Hacker le système"]
    },
    {
        level: 3,
        name: "Besoins sous pression",
        trackImage: "../style/img/DevProb/track.svg",
        trainImage: "../style/img/DevProb/train_final.png",
        choiceImage1: "../style/img/DevProb/cafe.png",
        choiceImage2: "../style/img/DevProb/sodas.png",
        destructionBas: "../style/img/DevProb/splat.png",
        destructionHaut: "../style/img/DevProb/splat.png",
        question: "Oh non ! Tu es en plein workshop et ce tramway fonce sur la cargaison de sodas de l'Epsi, tu peux hacker le Tram et le diriger vers la cargaison de cafés à la place. Que fais-tu ?",
        options: ["Ne rien faire", "Hacker le système"]
    },
    {
        level: 4,
        name: "Dilemne épineux",
        trackImage: "../style/img/DevProb/track.svg",
        trainImage: "../style/img/DevProb/train_final.png",
        choiceImage1: "../style/img/DevProb/dreamsetup.png",
        choiceImage2: "../style/img/DevProb/ingenieur.png",
        destructionBas: "../style/img/DevProb/splat.png",
        destructionHaut: "../style/img/DevProb/splat.png",
        question: "Oh non ! Un tramway fonce sur ta carrière de gamer ! Tu peux hacker le Tram et le diriger vers l'autre rail, où se trouve ta carrière d'ingénieur.",
        options: ["Ne rien faire", "Hacker le système"]
    },
    {
        level: 5,
        name: "TBM ^^",
        trackImage: "../style/img/DevProb/track.svg",
        trainImage: "../style/img/DevProb/rien.png",
        choiceImage1: "../style/img/DevProb/rien.png",
        choiceImage2: "../style/img/DevProb/rien.png",
        destructionBas: "../style/img/DevProb/rien.png",
        destructionHaut: "../style/img/DevProb/pleurer.png",
        question: "Oh non ! Ton tramway TBM est en retard ! Que fais-tu ?",
        options: ["Attendre", "Pleurer"]
    },
    {
        level: 6,
        name: "Fin",
        trackImage: "../style/img/DevProb/track.svg",
        trainImage: "../style/img/DevProb/train_final.png",
        choiceImage1: "../style/img/DevProb/rien.png",
        choiceImage2: "../style/img/DevProb/rien.png",
        destructionBas: "../style/img/DevProb/rien.png",
        destructionHaut: "../style/img/DevProb/rien.png",
        question: "Félicitations ! Tu as terminé la démo !",
        options: ["Ne rien faire", "Pranker le conducteur"]
    },
];

let currentLevel = 0; // Niveau actuel du jeu, initialisé à 0

// Fonction pour désactiver les boutons pendant un certain temps
function disableButtons(duration) {
    const buttons = document.querySelectorAll('#options button'); // Sélectionne tous les boutons
    buttons.forEach(button => {
        button.disabled = true; // Désactive tous les boutons
    });

    // Réactive les boutons après la durée spécifiée
    setTimeout(() => {
        buttons.forEach(button => {
            button.disabled = false; // Réactive les boutons
        });
    }, duration);
}

// Fonction pour charger le scénario basé sur le niveau
function loadScenario(level) {
    // Vérifie que le niveau est valide (dans les bornes du tableau scenarios)
    if (level >= 0 && level < scenarios.length) {
        const scenario = scenarios[level]; // Récupère le scénario correspondant au niveau

        // Met à jour les éléments de l'interface utilisateur avec les informations du scénario
        document.getElementById('level-title').textContent = `Niveau : ${scenario.level} - ${scenario.name}`;
        document.getElementById('track-image').src = scenario.trackImage;
        document.getElementById('train-image').src = scenario.trainImage;
        document.getElementById('choice-image-1').src = scenario.choiceImage1;
        document.getElementById('choice-image-2').src = scenario.choiceImage2;
        document.getElementById('destruction-bas').src = scenario.destructionBas;
        document.getElementById('destruction-haut').src = scenario.destructionHaut;
        document.getElementById('question').textContent = scenario.question;

        // Met à jour les boutons avec les options du scénario
        const buttons = document.querySelectorAll('#options button');
        buttons.forEach((button, index) => {
            button.textContent = scenario.options[index] || ""; // Définit le texte du bouton
            button.onclick = () => handleOption(index + 1); // Associe la fonction de choix à chaque bouton
        });

        // Réinitialise l'animation du train
        document.getElementById('train-image').style.animation = 'none'; // Supprime l'animation
        void document.getElementById('train-image').offsetWidth; // Forcer un reflow pour réinitialiser l'animation
        document.getElementById('train-image').style.animation = ''; // Prêt pour la prochaine animation

        // Réinitialise les opacités des images de choix et de destruction
        document.getElementById('choice-image-1').style.opacity = 1;
        document.getElementById('choice-image-2').style.opacity = 1;
        document.getElementById('destruction-bas').style.opacity = 0;
        document.getElementById('destruction-haut').style.opacity = 0;

        currentLevel = level; // Met à jour le niveau actuel
    } else {
        console.error("Niveau invalide"); // Affiche une erreur si le niveau est hors des bornes
    }
}

// Fonction appelée lors du choix de l'utilisateur
function handleOption(choice) {
    const trainImage = document.getElementById('train-image');
    const choiceImage1 = document.getElementById('choice-image-1');
    const choiceImage2 = document.getElementById('choice-image-2');
    const destructionBas = document.getElementById('destruction-bas');
    const destructionHaut = document.getElementById('destruction-haut');

    // Désactive les boutons pendant 2 secondes
    disableButtons(2000);

    // Gestion de l'animation et de la destruction en fonction du choix de l'utilisateur
    if (choice === 1) { // Si l'utilisateur choisit la première option
        trainImage.style.animation = "straight-path 1.5s forwards"; // Anime le train sur un chemin droit
        choiceImage1.style.opacity = 1; // Affiche la première image de choix
        choiceImage2.style.opacity = 1; // Affiche la deuxième image de choix
        
        // Délai avant d'afficher la destruction
        setTimeout(() => {
            destructionBas.style.opacity = 1; // Affiche l'image de destruction bas
            choiceImage1.style.opacity = 0; // Cache l'image de choix 1
        }, 350); // Délai de 350ms
    } else if (choice === 2) { // Si l'utilisateur choisit la deuxième option
        trainImage.style.animation = "curved-path 1.5s forwards"; // Anime le train sur un chemin courbé
        choiceImage1.style.opacity = 1; // Affiche la première image de choix
        choiceImage2.style.opacity = 1; // Affiche la deuxième image de choix
        
        // Délai avant d'afficher la destruction
        setTimeout(() => {
            destructionHaut.style.opacity = 1; // Affiche l'image de destruction haut
            choiceImage2.style.opacity = 0; // Cache l'image de choix 2
        }, 700); // Délai de 700ms
    }

    // Après l'animation, passe au niveau suivant
    setTimeout(() => {
        setTimeout(() => {
            let nextLevel = (currentLevel + 1) % scenarios.length; // Passe au niveau suivant ou retourne au premier
            loadScenario(nextLevel); // Charge le scénario suivant
        }, 820); // Délai de 820ms pour le passage de niveau
    }, 1230); // Délai de 1230ms pour laisser l'animation se terminer
}

// Charger le scénario lors du chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    loadScenario(0); // Charge toujours le niveau 0 au début
});
