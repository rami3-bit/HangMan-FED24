// WordList second JS
import { wordList } from './wordlist.js'; // Import the word list
let word = wordList[Math.floor(Math.random() * wordList.length)];
let guessedLetters = [];
let mistakes = 0;
const maxMistakes = 6;

// Elements
const wordDisplay = document.querySelector(".word-display");
const mistakesDisplay = document.querySelector("#Mistakes");
const hangmanImage = document.querySelector(".hang-image");
const keyboard = document.querySelector(".keyboard");
const resetButton = document.getElementById("new-game-button");
const gameOverDiv = document.querySelector(".game-over"); 
const gameStatus = document.getElementById("game-status"); 

// keyboard buttons
function createKeyboard() {
	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  	alphabet.forEach(letter => {
    const button = document.createElement("button");
    button.textContent = letter;
    button.addEventListener("click", () => handleGuess(letter, button));
    keyboard.appendChild(button);
  });
}

// Handle a guessed letter
function handleGuess(letter, button) {
  if (guessedLetters.includes(letter) || mistakes >= maxMistakes) return;
  guessedLetters.push(letter);
  button.disabled = true;
  if (word.includes(letter)) {
	updateWordDisplay();
	button.style.backgroundColor = "lightgreen"
  } else {
	button.style.backgroundColor = "#f08080"
    mistakes++;
    mistakesDisplay.textContent = mistakes;
    hangmanImage.src = `./images/bild-${mistakes}.svg`;
  }
}

// display guessed letters
function updateWordDisplay() {
  wordDisplay.innerHTML = "";
  word.split("").forEach(letter => {
    const li = document.createElement("li");
    li.textContent = guessedLetters.includes(letter) ? letter : "_";
    wordDisplay.appendChild(li);
  });
}

// Reset the game
function reset() {
  guessedLetters = [];
  mistakes = 0;
  mistakesDisplay.textContent = mistakes;
  hangmanImage.src = "./images/bild-0.svg";
  word = wordList[Math.floor(Math.random() * wordList.length)]; // Select new word
  updateWordDisplay();
  document.querySelectorAll(".keyboard button").forEach(button => button.disabled = false);
  gameOverDiv.classList.add("hidden"); // Hide the game-over message
}

// Initialize the game
createKeyboard();
updateWordDisplay();

// Add reset button event listener
resetButton.addEventListener("click", reset);