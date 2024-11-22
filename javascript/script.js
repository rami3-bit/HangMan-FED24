import { wordList } from './wordlist.js';
let word = wordList[Math.floor(Math.random() * wordList.length)];
let guessedLetters = [];
let mistakes = 0;
const maxMistakes = 6;

// Elements
const mistakesDisplay = document.querySelector("#Mistakes");
const hangmanImage = document.querySelector(".hang-image");
const keyboard = document.querySelector(".keyboard");
const resetButton = document.getElementById("new-game-button");
const gameOverDiv = document.querySelector(".game-over"); // Game Over div


// Create keyboard buttons
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
  } else {
    mistakes++;
    mistakesDisplay.textContent = mistakes;
    hangmanImage.src = `./images/bild-${mistakes}.svg`;
  }
  checkGameOver();
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
