// Importing word lists for different difficulty levels
import { wordList as easyWordList } from './wordlist_easy.js';
import { wordList as mediumWordList } from './wordlist_medium.js';
import { wordList as hardWordList } from './wordlist_hard.js';

// Variables for game settings and state
let wordList = easyWordList;
let word = wordList[Math.floor(Math.random() * wordList.length)].toLowerCase();
let guessedLetters = [];
let mistakes = 0;
let hintsUsed = 0;
let gameEnded = false;
let gameStartTime; //börjar att räkna tiden efter spelare trycker på start knapp
const maxMistakes = 6;
const maxHints = 3;

// Element references
const wordDisplay = document.querySelector(".word-display");
const mistakesDisplay = document.querySelector("#Mistakes");
const hangmanImage = document.querySelector(".hang-image");
const keyboard = document.querySelector(".keyboard");
const resetButton = document.getElementById("new-game-button");
const hintButton = document.getElementById("hint-btn");
const mainMenu = document.querySelector(".main-menu");
const gameContainers = document.querySelectorAll(".game-container");
const leaderboardButton = document.querySelector(".leaderboard-home-button");
const leaderboardDiv = document.querySelector(".whole-leaderboard");
const leaderboardCloseButton = document.querySelector(".leaderboard-close-button");
const quitButton = document.querySelector(".quit-btn");
const modeDisplay = document.querySelector("#game-mode"); // Element to display the game mode

// Game Over Modal References
const gameOverModal = document.getElementById('game-over-modal');
const gameResult = document.getElementById('game-result');
const correctWordSpan = document.getElementById('correct-word');
const playAgainButton = document.getElementById('play-again-button');
const quitGameButton = document.getElementById('quit-game-button');

// Initial Setup - Hide the necessary elements
gameContainers.forEach(container => container.classList.add("hidden"));
leaderboardDiv.classList.add("hidden");
gameOverModal.classList.add("hidden");

// Create Keyboard Function
function createKeyboard() {
    keyboard.innerHTML = ''; // Clear previous keyboard buttons
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    alphabet.forEach(letter => {
        const button = document.createElement("button");
        button.textContent = letter;
        button.addEventListener("click", () => handleGuess(letter, button));
        keyboard.appendChild(button);
    });
}

// Handle Guess Function
function handleGuess(letter, button = null) {
    if (gameEnded || guessedLetters.includes(letter)) return;

    letter = letter.toLowerCase();
    guessedLetters.push(letter);

    if (button) button.disabled = true;

    if (word.includes(letter)) {
        updateWordDisplay();
        if (button) button.style.backgroundColor = "lightgreen";
    } else {
        if (button) button.style.backgroundColor = "#f08080";
        mistakes++;
        mistakesDisplay.textContent = `${mistakes} / ${maxMistakes}`; // Update mistake counter correctly
        hangmanImage.src = `./images/bild-${mistakes}.svg`;
    }

    checkGameStatus();
}

// ---------------game timer--------------------

document.querySelector(".start").addEventListener("click", () => {
    mainMenu.classList.add("hidden")
    gameStartTime = Date.now() // Starta tiden
    reset()
})

// --------------------------------------------

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
// Game Over Function
function gameOver(status) {
    gameEnded = true;
    revealWord(status);
    disableKeyboard();
    showGameOverModal(status, word);

    // Hämta data för att spara i leaderboard
    const playerName = document.getElementById('username').value || 'Anonymous';
    const wordLength = word.length;
    const timeTaken = Math.floor((Date.now() - gameStartTime) / 1000); // Tid i minuter
    const currentDate = new Date().toISOString().split('T')[0];

    // Uppdatera leaderboard
    updateLeaderboard(playerName, mistakes, wordLength, timeTaken, currentDate, status === 'won' ? 'won' : 'lost');
}


// Disable All Keyboard Buttons Function
function disableKeyboard() {
    document.querySelectorAll(".keyboard button").forEach(button => {
        button.disabled = true;
    });
}

// Reveal the Correct Word Function
function revealWord(status) {
    wordDisplay.innerHTML = "";
    word.split("").forEach(letter => {
        const li = document.createElement("li");
        li.textContent = letter;
        li.style.color = status === 'lost' ? 'green' : 'red'; // Mark correct word in green if lost
        li.classList.add("letter-placeholder");
        wordDisplay.appendChild(li);
    });
}

// Update Word Display Function
function updateWordDisplay() {
    wordDisplay.innerHTML = "";
    word.split("").forEach(letter => {
        const li = document.createElement("li");
        li.textContent = guessedLetters.includes(letter) ? letter : "";
        li.classList.add("letter-placeholder");
        li.style.borderBottom = "2px solid black";
        wordDisplay.appendChild(li);
    });
}

// Reset Game Function
function reset() {
    guessedLetters = [];
    mistakes = 0;
    hintsUsed = 0;
    gameEnded = false;
    mistakesDisplay.textContent = `0 / ${maxMistakes}`; // Correct mistake counter
    hangmanImage.src = "./images/bild-0.svg";
    word = wordList[Math.floor(Math.random() * wordList.length)].toLowerCase();
    updateWordDisplay();
    createKeyboard();
    gameOverModal.classList.add('hidden');
    hintButton.disabled = false;
    hintButton.style.backgroundColor = "rgb(255, 215, 0)";
}

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

// Function to Show Game Over Modal
function showGameOverModal(status, correctWord) {
    gameOverModal.classList.remove('hidden');
    gameResult.textContent = status === 'won' ? 'You Won!' : 'You Lost!';
    gameResult.style.color = status === 'won' ? 'green' : 'red';
    correctWordSpan.textContent = correctWord.toUpperCase();
    correctWordSpan.style.fontWeight = 'bold';
}

// Event Listeners for Modal Buttons
playAgainButton.addEventListener('click', () => {
    gameOverModal.classList.add('hidden');
    reset();
});

quitGameButton.addEventListener('click', () => {
    gameOverModal.classList.add('hidden');
    gameContainers.forEach(container => container.classList.add('hidden'));
    mainMenu.classList.remove('hidden');
    reset();
});

// Event Listeners for Buttons and Actions
document.querySelector(".start").addEventListener("click", () => {
    mainMenu.classList.add("hidden");
    const selectedDifficulty = document.querySelector('input[name="difficulty"]:checked').value;
    document.querySelector(`.game-container`).classList.remove("hidden");
    wordList = selectedDifficulty === "easy" ? easyWordList : selectedDifficulty === "medium" ? mediumWordList : hardWordList;
    modeDisplay.textContent = selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1); // Set the mode text properly
    reset();
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
    gameContainers.forEach(container => container.classList.add("hidden"));
    mainMenu.classList.remove("hidden");
    reset();
});

// Adding keyboard event listener for computer keyboard input
document.addEventListener('keydown', (event) => {
    if (gameEnded) return;

    const key = event.key.toUpperCase();

    // Ignore special keys such as Shift, Alt, Tab, etc.
    if (key.length === 1 && key >= 'A' && key <= 'Z') {
        const button = Array.from(keyboard.children).find(btn => btn.textContent === key);
        if (button && !button.disabled) {
            handleGuess(key, button);
        }
    }
});



// -----------------local storage------------------------

const MAX_LEADERBOARD_ENTRIES = 10 // Vi begränsar antalet poster till 10

// Här funktioner för att hämta leaderboard från Local Storage eller skapa en ny om den inte finns och spara data i local storage 
function getLeaderboard() {
    return JSON.parse(localStorage.getItem('leaderboard')) || []
}
function saveLeaderboard(leaderboard) {
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard))
}

// Koden skapar ny leaderboard post
function createLeaderboardEntry(playerName, mistakes, wordLength, timeTaken, date, status) {
    return {
        name: playerName,
        mistakes: mistakes,
        wordLength: wordLength,
        time: timeTaken,
        date: new Date(date).toISOString(),
        status: status
    }
}

// Denna funktion sorterar leaderboard baserat på fel, ordlängd och datum
function sortLeaderboard(leaderboard) {
    return leaderboard.sort((a, b) => {
        if (a.mistakes !== b.mistakes) {
            return a.mistakes - b.mistakes // Mindre fel först
        } else if (a.wordLength !== b.wordLength) {
            return b.wordLength - a.wordLength // Längre ord först
        } else {
            // return new Date(a.date) - new Date(b.date) // Tidigare datum först
            return a.time - b.time // Snabbare tid först
        }
    })
}

// uppdatera leaderboard och sparar i Local Storage
function updateLeaderboard(playerName, mistakes, wordLength, timeTaken, date, status) {
    const leaderboard = getLeaderboard()

    // variabel som skapar ny post och lägg till den i leaderboarden
    const newEntry = createLeaderboardEntry(playerName, mistakes, wordLength, timeTaken, date, status)
    leaderboard.push(newEntry)

    // sortera leaderboarden och begränsa till de bästa 10
    const sortedLeaderboard = sortLeaderboard(leaderboard)
    const trimmedLeaderboard = sortedLeaderboard.slice(0, MAX_LEADERBOARD_ENTRIES)

    // spara uppdaterade leaderboarden
    saveLeaderboard(trimmedLeaderboard)

    // visa uppdaterad leaderboard direkt
    displayLeaderboard(trimmedLeaderboard)
}

// Visa leaderboard i HTML
function displayLeaderboard(leaderboard) {
    const leaderboardList = document.querySelector('.leaderboard-list')
    leaderboardList.innerHTML = '' // rensa tidigare lista

    leaderboard.forEach(entry => {
        const li = document.createElement('li')
        li.textContent = `${entry.name}, mistakes: ${entry.mistakes}, word's length: ${entry.wordLength}, ${new Date(entry.date).toLocaleDateString()}, ${entry.time} sec, ${entry.status}`
        leaderboardList.appendChild(li)
    })

    // lägger till "Empty" poster om det finns färre än 10 resultat
    while (leaderboardList.children.length < MAX_LEADERBOARD_ENTRIES) {
        const emptyLi = document.createElement('li')
        emptyLi.textContent = 'Empty'
        leaderboardList.appendChild(emptyLi)
    }
}

// Initialt visa leaderboard när sidan laddas
window.addEventListener('load', () => {
    const leaderboard = getLeaderboard();
    displayLeaderboard(leaderboard);
});

// -------------------------------------------------------

// Initial Setup Calls
createKeyboard();
updateWordDisplay();
