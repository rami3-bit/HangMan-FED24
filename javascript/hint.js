let hintsUsed = 0; 

function giveHint() {
  if (hintsUsed >= 2) return; 

  
  const unguessedLetters = word.split("").filter(letter => !guessedLetters.includes(letter));
  if (unguessedLetters.length === 0) return; 

  
  const hintLetter = unguessedLetters[Math.floor(Math.random() * unguessedLetters.length)];

  
  guessedLetters.push(hintLetter);
  updateWordDisplay();

  hintsUsed++; 

  
  if (hintsUsed >= 2) {
    document.getElementById("#hint-button").disabled = true;
    document.getElementById("#hint-button").textContent = "No Hints Left";
  }
}


function reset() {
    guessedLetters = [];
    mistakes = 0;
    hintsUsed = 0; // Återställ antal använda hints
    mistakesDisplay.textContent = mistakes;
    hangmanImage.src = "./images/bild-0.svg";
    word = wordList[Math.floor(Math.random() * wordList.length)];
    updateWordDisplay();
    document.querySelectorAll(".keyboard button").forEach(button => {
      button.disabled = false;
      button.style.backgroundColor = "white";
    });
    gameOverDiv.classList.add("hidden");
    gameStatus.textContent = "";
    
    // Återaktivera hint-knappen
    const hintButton = document.getElementById("hint-button");
    hintButton.disabled = false;
    hintButton.textContent = "Hint";
  }
  
 