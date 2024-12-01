// Import word lists
import { wordList as easyWordList } from './wordlist_easy.js';
import { wordList as mediumWordList } from './wordlist_medium.js';
import { wordList as hardWordList } from './wordlist_hard.js';

// Game Variables
let wordList = easyWordList;
let word = '';
let guessedLetters = [];
let mistakes = 0;
let hintsUsed = 0;
let gameEnded = false;
const maxMistakes = 6;
const maxHints = 3;

// Element References
const wordDisplay = document.querySelector(".word-display");
const mistakesDisplay = document.querySelector("#Mistakes");
const hangmanImage = document.querySelector(".hang-image");
const keyboard = document.querySelector(".keyboard");
const resetButton = document.getElementById("new-game-button");
const hintButton = document.getElementById("hint-btn");
const quitButton = document.querySelector(".quit-btn");
const mainMenu = document.querySelector(".main-menu");
const gameContainer = document.querySelector(".game-container");
const leaderboardButton = document.querySelector(".leaderboard-home-button");
const leaderboardDiv = document.querySelector(".whole-leaderboard");
const leaderboardCloseButton = document.querySelector(".leaderboard-close-button");
const startButton = document.querySelector('.start');

// Game Over Modal References
const gameOverModal = document.getElementById('game-over-modal');
const gameResult = document.getElementById('game-result');
const correctWordSpan = document.getElementById('correct-word');
const playAgainButton = document.getElementById('play-again-button');
const quitGameButton = document.getElementById('quit-game-button');

// Difficulty Selection References
const difficultyInputs = document.querySelectorAll('input[name="difficulty"]');
let selectedDifficulty = 'easy';

// Attach event listeners to the difficulty selection buttons
difficultyInputs.forEach(input => {
    input.addEventListener('change', () => {
        selectedDifficulty = input.value;
    });
});

// Event listener for start button
startButton.addEventListener('click', () => {
    const username = document.querySelector('#username').value.trim();
    if (!username || !selectedDifficulty) {
        console.log("Please provide a username and select a difficulty level.");
        return;
    }

    // Set the appropriate word list
    if (selectedDifficulty === 'easy') {
        wordList = easyWordList;
    } else if (selectedDifficulty === 'medium') {
        wordList = mediumWordList;
    } else if (selectedDifficulty === 'hard') {
        wordList = hardWordList;
    }

    // Initialize game variables
    word = wordList[Math.floor(Math.random() * wordList.length)].toLowerCase();
    guessedLetters = [];
    mistakes = 0;
    hintsUsed = 0;
    gameEnded = false;

    mainMenu.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    updateWordDisplay();
    createKeyboard();
    mistakesDisplay.textContent = `${mistakes} / ${maxMistakes}`;
    hangmanImage.src = "./images/bild-0.svg";
    document.querySelector('#game-mode').textContent = selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1);
});

// Create Keyboard
function createKeyboard() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    keyboard.innerHTML = '';
    alphabet.forEach(letter => {
        const button = document.createElement("button");
        button.textContent = letter;
        button.addEventListener("click", () => handleGuess(letter, button));
        keyboard.appendChild(button);
    });
}

// Handle Guess
function handleGuess(letter, button) {
    if (gameEnded || guessedLetters.includes(letter)) return;

    guessedLetters.push(letter);
    button.disabled = true;

    if (word.includes(letter)) {
        updateWordDisplay();
        button.style.backgroundColor = "lightgreen";
    } else {
        button.style.backgroundColor = "#f08080";
        mistakes++;
        mistakesDisplay.textContent = `${mistakes} / ${maxMistakes}`;
        hangmanImage.src = `./images/bild-${mistakes}.svg`;
    }

    checkGameStatus();
}

// Check Game Status
function checkGameStatus() {
    const isWordGuessed = word.split("").every(letter => guessedLetters.includes(letter));
    if (isWordGuessed) {
        gameOver("won");
    } else if (mistakes >= maxMistakes) {
        gameOver("lost");
    }
}

// Game Over
function gameOver(status) {
    gameEnded = true;
    revealWord();
    disableKeyboard();
    showGameOverModal(status, word);
}

// Reveal Word
function revealWord() {
    wordDisplay.innerHTML = '';
    word.split("").forEach(letter => {
        const li = document.createElement("li");
        li.textContent = letter;
        li.style.color = "red";
        wordDisplay.appendChild(li);
    });
}

// Update Word Display
function updateWordDisplay() {
    wordDisplay.innerHTML = '';
    word.split("").forEach(letter => {
        const li = document.createElement("li");
        li.textContent = guessedLetters.includes(letter) ? letter : '';
        li.classList.add("letter-placeholder");
        li.style.borderBottom = "2px solid black";
        wordDisplay.appendChild(li);
    });
}

// Disable All Keyboard Buttons
function disableKeyboard() {
    document.querySelectorAll(".keyboard button").forEach(button => {
        button.disabled = true;
    });
}

// Show Game Over Modal
function showGameOverModal(status, correctWord) {
    gameOverModal.classList.remove('hidden');
    gameResult.textContent = status === 'won' ? 'You Won!' : 'You Lost!';
    gameResult.style.color = status === 'won' ? 'green' : 'red';
    correctWordSpan.textContent = correctWord.toUpperCase();
    correctWordSpan.style.fontWeight = 'bold';
}

// Reset Game
function reset() {
    guessedLetters = [];
    mistakes = 0;
    hintsUsed = 0;
    gameEnded = false;
    mistakesDisplay.textContent = `${mistakes} / ${maxMistakes}`;
    hangmanImage.src = "./images/bild-0.svg";
    word = wordList[Math.floor(Math.random() * wordList.length)].toLowerCase();
    updateWordDisplay();
    createKeyboard();
    hintButton.disabled = false;
    hintButton.style.backgroundColor = "rgb(255, 215, 0)";
    gameOverModal.classList.add('hidden');
}

// Event Listeners for Buttons
resetButton.addEventListener("click", reset);
hintButton.addEventListener("click", giveHint);
quitButton.addEventListener("click", () => {
    gameContainer.classList.add('hidden');
    mainMenu.classList.remove('hidden');
    reset();
});

// Hint Button Functionality
function giveHint() {
    if (gameEnded || hintsUsed >= maxHints) return;

    const unguessedLetters = word.split("").filter(letter => !guessedLetters.includes(letter));
    if (unguessedLetters.length > 0) {
        const hintLetter = unguessedLetters[Math.floor(Math.random() * unguessedLetters.length)];
        guessedLetters.push(hintLetter);
        updateWordDisplay();

        const button = Array.from(keyboard.children).find(btn => btn.textContent.toLowerCase() === hintLetter);
        if (button) {
            button.disabled = true;
            button.style.backgroundColor = "lightgreen";
        }

        hintsUsed++;
        if (hintsUsed >= maxHints) {
            hintButton.disabled = true;
            hintButton.style.backgroundColor = "grey";
        }
    }
}

// Event Listeners for Game Over Modal Buttons
playAgainButton.addEventListener('click', () => {
    reset();
    gameOverModal.classList.add('hidden');
});

quitGameButton.addEventListener('click', () => {
    gameContainer.classList.add('hidden');
    mainMenu.classList.remove('hidden');
    gameOverModal.classList.add('hidden');
    reset();
});

// Initial Setup
updateWordDisplay();
