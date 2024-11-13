let countdown; // Pour stocker le compte à rebours
let timeLeft = 60; // Le temps initial
const bonusTime = 5;
const maxTime = 120; // Temps maximum
let rulesStatus = new Array(10).fill(false); // Tableau pour suivre les règles validées
let hasWon = false; // Suivre si le joueur a déjà gagné

let rulesValidated = 0; // Compteur de règles validées

// Fonction pour démarrer le chronomètre
function startTimer() {
    const timerDisplay = document.getElementById('time');

    if (countdown) {
        return; // Si un chronomètre est déjà actif, on ne fait rien
    }

    timerDisplay.textContent = timeLeft;
    timerDisplay.classList.remove('time-low'); // S'assurer que la classe "time-low" est retirée au début

    countdown = setInterval(function () {
        timeLeft--;

        // Si le temps est inférieur ou égal à 10 secondes, changer le style du chronomètre
        if (timeLeft <= 10) {
            timerDisplay.classList.add('time-low');
        }

        // S'assurer que le temps ne descend pas en dessous de 0
        if (timeLeft <= 0) {
            timeLeft = 0;
            clearInterval(countdown);
            countdown = null; // Réinitialiser le compte à rebours pour pouvoir le redémarrer plus tard
            gameOver(); // Appel de la fonction "Game Over" lorsque le temps est écoulé
        }

        timerDisplay.textContent = timeLeft; // Met à jour l'affichage du temps
    }, 1000); // Le compteur décompte toutes les secondes
}

    // Désactiver le bouton après le clic
    document.getElementById('submit').addEventListener('click', function() {
        startTimer();
        let password = document.getElementById('password').value;
        this.disabled = true; // Désactive le bouton de soumission

        validatePassword(password);

        setTimeout(() => {        // Réactiver le bouton de soumission après validation complète
            this.disabled = false;
        }, 1000); // Réactiver après 1 seconde (ou un délai adapté)
    });


// Fonction pour ajouter du temps bonus
function addBonusTime() {
    // Ajoute du temps bonus sans dépasser la limite de temps maximale
    timeLeft = Math.min(timeLeft + bonusTime, maxTime);
    console.log(`Bonus ajouté, temps restant : ${timeLeft}`);

    const timerDisplay = document.getElementById('time');
    timerDisplay.textContent = timeLeft; // Met à jour l'affichage

    // Si le temps est redevenu suffisant, retirer l'effet visuel de "temps faible"
    if (timeLeft > 10) {
        timerDisplay.classList.remove('time-low');
    }
}

// Fonction pour arrêter le chronomètre
function stopTimer() {
    clearInterval(countdown);
    countdown = null; // Assurer la possibilité de redémarrer plus tard
}

// Fonction "Game Over" à appeler lorsque le temps est écoulé
function gameOver() {
    alert("Game Over ! Le temps est écoulé. Réessayez.");
    resetGame(); // Réinitialisation du jeu
}

function resetGame() {
    stopTimer();
    timeLeft = 60; // Remettre le temps initial
    document.getElementById('password').value = ''; // Vide le champ mot de passe
    resetRulesDisplay(); // Réinitialise les règles affichées
    rulesStatus.fill(false); // Réinitialiser le tableau des règles validées
    hasWon = false; // Réinitialiser la victoire
    document.getElementById('submit').disabled = false; // Réactiver le bouton de soumission
}




// Réinitialiser les règles à l'état initial
function resetRulesDisplay() {
    const rules = document.querySelectorAll('.valid, .invalid');
    rules.forEach(rule => {
        rule.classList.remove('valid', 'invalid');
        rule.textContent = '';
    });
}

function checkWinCondition() {
    if (rulesStatus.every(status => status) && !hasWon) {      // Vérification si toutes les règles sont validées
        hasWon = true; 
        alert("Win!");
        document.getElementById('restart').style.display = 'block'; // Afficher le bouton "Recommencer"
        stopTimer();
        timeLeft = 60;
    }
}




// Lancement du jeu
document.getElementById('submit').addEventListener('click', function () {
    startTimer();
    let password = document.getElementById('password').value;
    validatePassword(password);
});

document.getElementById('restart').addEventListener('click', function() {
    resetGame();
    timeLeft = 60;
    stopTimer();
    this.style.display = 'none'; // Masquer le bouton après avoir réinitialisé
});


// Fonction pour afficher une erreur avec un délai
function displayError(element, message, delay) {
    setTimeout(function () {
        element.textContent = message;
        element.classList.add('invalid');
        element.classList.remove('valid');
    }, delay);
}

// Fonction de validation du mot de passe
function validatePassword(password) {
    let letters = password.match(/[a-zA-Z]/g); // Trouver toutes les lettres dans le mot de passe
    let digits = password.match(/\d/g);

    let delay = 0;  // Initialiser le délai


    // Première règle (7 lettres)
    let rule1 = document.getElementById('rule1');
    rule1.style.display = 'block';  // Afficher la première règle
    let rule1Validee = (letters && letters.length >= 7);
    if (rule1Validee) {
        rule1.textContent = "✔ Le mot de passe contient au moins 7 lettres.";
        rule1.classList.add('valid');
        rule1.classList.remove('invalid');

        if (!rulesStatus[0]) { // Si la règle n'était pas encore validée
            rulesStatus[0] = true; // Marquer la première règle comme validée
            addBonusTime(); // Ajouter du temps bonus une seule fois
        }
        checkWinCondition();  // Vérification après la validation
    } else {
        displayError(rule1, "✖ Le mot de passe doit contenir au moins 7 lettres.", delay);
        delay += 300;
        rulesStatus[0] = false; // Marquer la règle comme non validée
        return;
    }


    // Deuxième règle (3 chiffres)
    let rule2 = document.getElementById('rule2');
    rule2.style.display = 'block';
    let rule2Validee = (digits && digits.length >= 3);
    if (rule2Validee) {
        rule2.textContent = "✔ Le mot de passe contient au moins 3 chiffres.";
        rule2.classList.add('valid');
        rule2.classList.remove('invalid');

        if (!rulesStatus[1]) {
            rulesStatus[1] = true;
            addBonusTime();
        }
        checkWinCondition();
    } else {
        displayError(rule2, "✖ Le mot de passe doit contenir au moins 3 chiffres.", delay);
        delay += 300;
        rulesStatus[1] = false;
        return;
    }


    // Troisième règle (longueur maximale de 21 caractères)
    let rule3 = document.getElementById('rule3');
    rule3.style.display = 'block';
    if (password.length <= 21) {
        rule3.textContent = "✔ Le mot de passe ne dépasse pas 21 caractères.";
        rule3.classList.add('valid');
        rule3.classList.remove('invalid');

    if (!rulesStatus[2]) {
        rulesStatus[2] = true;
        addBonusTime();
    }
    checkWinCondition();
    } else {
        displayError(rule3, "✖ Le mot de passe doit avoir 21 caractères ou moins.", delay);
        delay += 300;
        rulesStatus[2] = false;
        return;
    }


    // Quatrième règle (commence par une majuscule et finit par un caractère spécial)
    let rule4 = document.getElementById('rule4');
    rule4.style.display = 'block';

    let startsWithUpperCase = /^[A-Z]/.test(password);
    let endsWithSpecialChar = /[\W]$/.test(password);

    if (startsWithUpperCase && endsWithSpecialChar) {
        rule4.textContent = "✔ Le mot de passe commence par une majuscule et finit par un caractère spécial (!, @, #, $, %).";
        rule4.classList.add('valid');
        rule4.classList.remove('invalid');

    if (!rulesStatus[3]) {
        rulesStatus[3] = true;
        addBonusTime();
    }
    checkWinCondition();
    } else {
        displayError(rule4, "✖ Le mot de passe doit commencer par une majuscule et finir par un caractère spécial !, @, #, $, %.", delay);
        delay += 300;
        rulesStatus[3] = false;
        return;
    }


    // Cinquième règle (opérateur)
    let rule5 = document.getElementById('rule5');
    rule5.style.display = 'block';
    let operators = /==|=!|\+=|-=/.test(password);
    let rule5Validee = operators;
    if (rule5Validee) {
        rule5.textContent = "✔ Le mot de passe contient au moins un opérateur valide (==, =!, +=, -=).";
        rule5.classList.add('valid');
        rule5.classList.remove('invalid');

    if (!rulesStatus[4]) {
        rulesStatus[4] = true;
        addBonusTime();
    }
    checkWinCondition();
    } else {
        displayError(rule5, "✖ Le mot de passe doit contenir au moins un opérateur (==, =!, +=, -=).", delay);
        delay += 300;
        rulesStatus[4] = false;
        return;
    }


    // Sixième règle (commence par mot de programmation)
    let rule6 = document.getElementById('rule6');
    rule6.style.display = 'block';
    let keywords = /if|else|return|for|while/i.test(password);      // La recherche est insensible à la casse grâce au "i"
    let rule6Validee = keywords;

    let startsWithKeyword = /^(If|Else|Return|For|While)/.test(password);   // Vérifie que le mot-clé de programmation en majuscule

    if (rule6Validee) {
        rule6.textContent = "✔ Le mot de passe doit commencer par un mot-clé (else, if, return, for, while).";
        rule6.classList.add('valid');
        rule6.classList.remove('invalid');

    if (!rulesStatus[5]) {
        rulesStatus[5] = true;
        addBonusTime();
    }
    checkWinCondition();
    } else {
        displayError(rule6, "✖ Le mot de passe doit commencer par un mot-clé (else, if, return, for, while).", delay);
        delay += 300;
        rulesStatus[5] = false;
        return;
    }


    // Septième règle (parenthèses/accolades)
    let rule7 = document.getElementById('rule7');
    rule7.style.display = 'block';
    let parentheses = /[\{\}\[\]\(\)]/.test(password);
    let rule7Validee = parentheses;
    if (rule7Validee) {
        rule7.textContent = "✔ Le mot de passe contient au moins un ensemble de parenthèses, accolades ou crochets : {},(),[]";
        rule7.classList.add('valid');
        rule7.classList.remove('invalid');

    if (!rulesStatus[6]) {
        rulesStatus[6] = true;
        addBonusTime();
    }
    checkWinCondition();
    } else {
        displayError(rule7, "✖ Le mot de passe doit contenir au moins un ensemble de parenthèses, accolades ou crochets: {},(),[].", delay);
        delay += 300;
        rulesStatus[6] = false;
        return;
    }


    // Huitième règle (langages)
    let rule8 = document.getElementById('rule8');
    rule8.style.display = 'block';
    let langages = /python|html|javascript|css|php/i.test(password);  // "i" pour ignorer la casse
    let rule8Validee = langages;
    if (rule8Validee) {
        rule8.textContent = "✔ Le mot de passe contient au moins un langage  (python, html, javascript, css php).";
        rule8.classList.add('valid');
        rule8.classList.remove('invalid');

    if (!rulesStatus[7]) { 
        rulesStatus[7] = true;
        addBonusTime();
    }
    checkWinCondition();
    } else {
        displayError(rule8, "✖ Le mot de passe doit contenir au moins un langage (python, html, javascript, css php).", delay);
        delay += 300;
        rulesStatus[7] = false;
        return;
    }


    // Neuvième règle (séquence de 3 lettres consécutives en ordre alphabétique)
    let rule9 = document.getElementById('rule9');
    rule9.style.display = 'block';
    let alphabeticalSequence = /abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i.test(password);
    if (alphabeticalSequence) {
        rule9.textContent = "✔ Le mot de passe contient une séquence de 3 lettres consécutives en ordre alphabétique.";
        rule9.classList.add('valid');
        rule9.classList.remove('invalid');

    if (!rulesStatus[8]) {
        rulesStatus[8] = true;
        addBonusTime();
    }
    checkWinCondition();
    } else {
        displayError(rule9, "✖ Le mot de passe doit inclure une séquence de 3 lettres consécutives en ordre alphabétique.", delay);
        delay += 300;
        rulesStatus[8] = false;
        return;
    }


    // Dixième règle (séquence binaire)
    let rule10 = document.getElementById('rule10');
    rule10.style.display = 'block';
    let sequenceBinaire = /[01]{4,}/.test(password);  // Chercher une séquence de 4 chiffres binaires ou plus
    if (sequenceBinaire) {
        rule10.textContent = "✔ Le mot de passe contient une séquence binaire d'au moins 4 chiffres (ex : une suite de 0 et 1).";
        rule10.classList.add('valid');
        rule10.classList.remove('invalid');

    if (!rulesStatus[9]) { 
        rulesStatus[9] = true; 
        addBonusTime();
    }
    checkWinCondition();
    } else {
        displayError(rule10, "✖ Le mot de passe doit inclure une séquence binaire d'au moins 4 chiffres (ex : une suite de 0 et 1).", delay);
        rulesStatus[9] = false;
        return;
    }
}
