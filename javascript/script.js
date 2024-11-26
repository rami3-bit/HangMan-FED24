
// WordList // Import the word list
import { wordList } from './wordlist_easy.js';
import { wordList } from './wordlist_medium.js';
import { wordList } from './wordlist_hard.js'; 

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

// keyboard
function createKeyboard() {
	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  	alphabet.forEach(letter => {
    const button = document.createElement("button");
    button.textContent = letter;
    button.addEventListener("click", () => handleGuess(letter, button));
    keyboard.appendChild(button);
  });
}

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
function updateWordDisplay() {
  wordDisplay.innerHTML = "";
  word.split("").forEach(letter => {
    const li = document.createElement("li");
    li.textContent = guessedLetters.includes(letter) ? letter : "_";
    wordDisplay.appendChild(li);
  });
}
function reset() {
	guessedLetters = [];
	mistakes = 0;
	mistakesDisplay.textContent = mistakes;
	hangmanImage.src = "./images/bild-0.svg";
	word = wordList[Math.floor(Math.random() * wordList.length)]; 
	updateWordDisplay();
	document.querySelectorAll(".keyboard button").forEach(button => {
	  button.disabled = false; 
	  button.style.backgroundColor = "white"; 
	});
  
	gameOverDiv.classList.add("hidden");
  }
  
createKeyboard();
updateWordDisplay();

resetButton.addEventListener("click", reset);