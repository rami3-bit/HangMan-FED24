//		select och start, ljusare färg vid val.

const easyDiv = document.querySelector(".easy");
const mediumDiv = document.querySelector(".medium");
const hardDiv = document.querySelector(".hard");
		
const easyRadio = document.querySelector("#easy");			//väljer ID # i radio knapparna
const mediumRadio = document.querySelector("#medium");			//väljer ID # i radio knapparna
const hardRadio = document.querySelector("#hard");			//väljer ID # i radio knapparna

easyRadio.addEventListener("change", () => updateSelection
(easyDiv, mediumDiv, hardDiv));

mediumRadio.addEventListener("change", () => updateSelection
(mediumDiv, hardDiv, easyDiv));

hardRadio.addEventListener("change", () => updateSelection
(hardDiv, easyDiv, mediumDiv));

function updateSelection(selected, ...others) {
	selected.classList.add('selected');
	others.forEach(div => div.classList.remove('selected'));
  }


//		function där man inte kan fortsätta utan att välja namn och svårighetsgrad habibi


const startButton = document.querySelector('.start');
const usernameInput = document.querySelector('#username');
const errorUsername = document.querySelector('#error-username');
const errorLevel = document.querySelector('#error-level');
const difficultyInputs = document.querySelectorAll('input[name="difficulty"]');

// Gör startknappen inaktiv från början
startButton.disabled = true; // Blockera knappen från att klickas på


function checkFormValidity() {
    const username = usernameInput.value.trim(); 
    const difficulty = document.querySelector('input[name="difficulty"]:checked');

    let isValid = true;

   
    if (username === "") {
        errorUsername.style.display = 'block';  
        isValid = false;
    } else {
        errorUsername.style.display = 'none';  
    }

  
    if (!difficulty) {
        errorLevel.style.display = 'block'; 
        isValid = false;
    } else {
        errorLevel.style.display = 'none';  
    }

   
    startButton.disabled = !isValid;
}


usernameInput.addEventListener('input', checkFormValidity);
difficultyInputs.forEach(input => {
    input.addEventListener('change', checkFormValidity);
});


startButton.addEventListener('click', (event) => {
    event.preventDefault(); 

    const username = usernameInput.value.trim();
    const difficulty = document.querySelector('input[name="difficulty"]:checked');

   
    if (username !== "" && difficulty) {
        console.log("Starting the game...");
   
    } else {
        console.log("Please fix the errors.");
    }
});
