import { wordList as easyWordList } from './wordlist_easy.js';
import { wordList as mediumWordList } from './wordlist_medium.js';
import { wordList as hardWordList } from './wordlist_hard.js';

let wordList = easyWordList;
let word = wordList[Math.floor(Math.random() * wordList.length)].toLowerCase();
let guessedLetters = [];
let mistakes = 0;
let hintsUsed = 0;
let gameEnded = false; // Flag to determine if the game has ended
const maxMistakes = 6;
const maxHints = 3;

// Element References
const wordDisplay = document.querySelector(".word-display");
const mistakesDisplay = document.querySelector("#Mistakes");
const hangmanImage = document.querySelector(".hang-image");
const keyboard = document.querySelector(".keyboard");
const resetButton = document.getElementById("new-game-button");
const hintButton = document.getElementById("hint-btn");
const mainMenu = document.querySelector(".main-menu");
const gameContainer = document.querySelector(".game-container");
const leaderboardButton = document.querySelector(".leaderboard-home-button");
const leaderboardDiv = document.querySelector(".whole-leaderboard");
const leaderboardCloseButton = document.querySelector(".leaderboard-close-button");
const quitButton = document.querySelector(".quit-btn");

// Game Over Modal References
const gameOverModal = document.getElementById('game-over-modal');
const gameResult = document.getElementById('game-result');
const correctWordSpan = document.getElementById('correct-word');
const playAgainButton = document.getElementById('play-again-button');
const quitGameButton = document.getElementById('quit-game-button');

// Initial Setup - Hide the necessary elements
gameContainer.classList.add("hidden");
leaderboardDiv.classList.add("hidden");
gameOverModal.classList.add("hidden");

// Create Keyboard Function
function createKeyboard() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    alphabet.forEach(letter => {
        const button = document.createElement("button");
        button.textContent = letter;
        button.addEventListener("click", () => handleGuess(letter, button));
        keyboard.appendChild(button);
    });
}

// Handle Guess Function
function handleGuess(letter, button) {
    if (gameEnded || guessedLetters.includes(letter)) return; // Prevent action if game is over or letter is already guessed

    letter = letter.toLowerCase();
    guessedLetters.push(letter);
    button.disabled = true;

    if (word.includes(letter)) {
        updateWordDisplay();
        button.style.backgroundColor = "lightgreen";
    } else {
        button.style.backgroundColor = "#f08080";
        mistakes++;
        mistakesDisplay.textContent = mistakes;
        hangmanImage.src = `./images/bild-${mistakes}.svg`;
    }

    checkGameStatus();
}

// Check Game Status Function
function checkGameStatus() {
    const isWordGuessed = word.split("").every(letter => guessedLetters.includes(letter));
    if (isWordGuessed) {
        gameOver("won");
    } else if (mistakes >= maxMistakes) {
        gameOver("lost");
    }
}

// Game Over Function
function gameOver(status) {
    gameEnded = true; // Set the flag to true
    revealWord();
    disableKeyboard();
    showGameOverModal(status, word);
}

// Disable All Keyboard Buttons Function
function disableKeyboard() {
    document.querySelectorAll(".keyboard button").forEach(button => {
        button.disabled = true;
    });
}

// Reveal the Correct Word Function
function revealWord() {
    wordDisplay.innerHTML = "";
    word.split("").forEach(letter => {
        const li = document.createElement("li");
        li.textContent = letter;
        li.style.color = "red";
        li.classList.add("letter-placeholder");
        wordDisplay.appendChild(li);
    });
}

// Update Word Display Function
function updateWordDisplay() {
    wordDisplay.innerHTML = "";

    word.split("").forEach(letter => {
        const li = document.createElement("li");

        // Show the letter if it has been guessed, otherwise leave it blank with an underline
        li.textContent = guessedLetters.includes(letter) ? letter : "";
        li.classList.add("letter-placeholder");
        li.style.borderBottom = "2px solid black"; // Single dashed line

        wordDisplay.appendChild(li);
    });
}

// Reset Game Function
function reset() {
    guessedLetters = [];
    mistakes = 0;
    hintsUsed = 0;
    gameEnded = false; // Reset the flag to false
    mistakesDisplay.textContent = mistakes;
    hangmanImage.src = "./images/bild-0.svg";
    word = wordList[Math.floor(Math.random() * wordList.length)].toLowerCase();
    updateWordDisplay();
    document.querySelectorAll(".keyboard button").forEach(button => {
        button.disabled = false;
        button.style.backgroundColor = "white";
    });
    gameOverModal.classList.add('hidden'); // Hide the game over modal
    hintButton.disabled = false;
    hintButton.style.backgroundColor = "rgb(255, 215, 0)"; // Reset hint button color
}

// Hint Button Functionality
function giveHint() {
    if (gameEnded || hintsUsed >= maxHints) return; // Prevent action if game is over or hints are used up

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
            hintButton.style.backgroundColor = "grey"; // Indicate the hint button is disabled
        }
    }
}

// Function to show game over modal
function showGameOverModal(status, correctWord) {
    gameOverModal.classList.remove('hidden');
    gameResult.textContent = status === 'won' ? 'You Won!' : 'You Lost!';
    gameResult.style.color = status === 'won' ? 'green' : 'red'; // Set color based on game status
    correctWordSpan.textContent = correctWord.toUpperCase(); // Display guessed word in uppercase
    correctWordSpan.style.fontWeight = 'bold'; // Make guessed word bold
}

// Event listeners for modal buttons
playAgainButton.addEventListener('click', () => {
    gameOverModal.classList.add('hidden');
    reset();
});

quitGameButton.addEventListener('click', () => {
    gameOverModal.classList.add('hidden');
    gameContainer.classList.add('hidden');
    mainMenu.classList.remove('hidden');
    reset();
});

// Event Listeners for Buttons and Actions
document.querySelector(".start").addEventListener("click", () => {
    mainMenu.classList.add("hidden");
    gameContainer.classList.remove("hidden");
});

resetButton.addEventListener("click", reset);
hintButton.addEventListener("click", giveHint);
leaderboardButton.addEventListener("click", () => {
    leaderboardDiv.classList.remove("hidden");
});
leaderboardCloseButton.addEventListener("click", () => {
    leaderboardDiv.classList.add("hidden");
});
quitButton.addEventListener("click", () => {
    gameContainer.classList.add("hidden");
    mainMenu.classList.remove("hidden");
    reset();
});

// Initial Setup Calls
createKeyboard();
updateWordDisplay();
