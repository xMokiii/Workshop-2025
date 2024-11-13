let validWords = [];
const words = ["array", "nodes", "input", "fetch", "catch", "cloud", "graph", "drive", "bytes", "cache", "crack", "email", "links", "modal", "query", "logic", "codey",]; // Liste de mots à deviner
let wordToGuess;
const maxAttempts = 6;
let currentAttempt = 0;
let wordLength = 6; // Longueur par défaut

const board = document.getElementById('board');
const guessInput = document.getElementById('guessInput');
const submitGuess = document.getElementById('submitGuess');
const message = document.getElementById('message');
const restartButton = document.createElement('button');
restartButton.classList.add('restart-button');

async function loadWords() {
    const response = await fetch('../json/words.json'); // Charger le fichier JSON
    const data = await response.json();
    validWords = data.words; // Extraire la liste de mots
}

function startNewGame() {
    wordToGuess = words[Math.floor(Math.random() * words.length)];
    wordLength = wordToGuess.length; // Mettre à jour la longueur du mot
    currentAttempt = 0;
    message.textContent = '';
    guessInput.value = '';
    submitGuess.disabled = false;
    restartButton.style.display = 'none';
    
    createBoard(); // Créer le tableau à chaque nouvelle partie

    // Réinitialiser le tableau
    for (let i = 0; i < maxAttempts; i++) {
        const row = board.children[i];
        for (let j = 0; j < wordLength; j++) {
            const cell = row.children[j];
            cell.textContent = '';
            cell.className = 'cell';
        }
    }
}

function createBoard() {
    board.innerHTML = ''; // Réinitialiser le contenu du tableau
    for (let i = 0; i < maxAttempts; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < wordLength; j++) { // Utiliser wordLength pour créer les cellules
            const cell = document.createElement('div');
            cell.classList.add('cell');
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
}

function evaluateGuess(guess) {
    const row = board.children[currentAttempt];
    const cells = row.children;

    guess.split('').forEach((letter, index) => {
        if (letter === wordToGuess[index]) {
            cells[index].textContent = letter;
            cells[index].classList.add('correct');
        } else if (wordToGuess.includes(letter)) {
            cells[index].textContent = letter;
            cells[index].classList.add('present');
        } else {
            cells[index].textContent = letter;
            cells[index].classList.add('absent');
        }
    });

    currentAttempt++;
    if (guess === wordToGuess) {
        message.textContent = "Bravo ! Vous avez trouvé le mot !";
        endGame();
    } else if (currentAttempt >= maxAttempts) {
        message.textContent = `Désolé, le mot était : ${wordToGuess}`;
        endGame();
    }
}

function endGame() {
    submitGuess.disabled = true;
    restartButton.textContent = "Recommencer le jeu";
    restartButton.onclick = startNewGame;
    document.getElementById('restartContainer').appendChild(restartButton);
    restartButton.style.display = 'block';
}

submitGuess.addEventListener('click', () => {
    const guess = guessInput.value.toLowerCase();
    if (guess.length === wordLength) {
        if (validWords.includes(guess)) { // Vérifier si le mot est valide
            evaluateGuess(guess);
            guessInput.value = '';
        } else {
            alert("Veuillez entrer un mot valide !");
        }
    } else {
        alert(`Veuillez entrer un mot de ${wordLength} lettres !`);
    }
});

// Charger les mots avant de commencer le jeu
loadWords().then(() => {
    createBoard();
    startNewGame();
});
