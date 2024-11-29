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

const usernameInput = document.getElementById("username").value;
const errorUsername = document.getElementById("error-username");
const errorLevel = document.getElementById("error-level");
const startButton = document.querySelector(".start");
const difficultyRadios = document.querySelectorAll("input[name='difficulty']");



function validateForm() {
	let isValid = true;

	if(usernameInput.value.trim() === "") {
		errorUsername.classList.add("show");
		isValid = true;

		else {
			errorUsername.classList.remove(".error-level")
			isValid = false;
		}
	}
}




    // Kontrollera om användarnamnet är ifyllt
    if (usernameInput.value.trim() === "") {
        errorUsername.classList.add(".error-level");  // Lägg till "show" för att visa felmeddelandet
        isValid = false;
    } else {
        errorUsername.classList.remove("show");  // Ta bort "show" om användarnamnet är ifyllt
    }

    return isValid;  // Vi returnerar bara resultatet för användarnamnet här
}

// Funktion för att kontrollera om svårighetsgrad är vald
function validateDifficulty() {
    let isValid = true;

    // Kontrollera om en svårighetsgrad är vald
    const difficultySelected = Array.from(difficultyRadios).some(radio => radio.checked);
    if (!difficultySelected) {
        errorLevel.classList.add("show");  // Lägg till "show" för att visa felmeddelandet för svårighetsgrad
        isValid = false;
    } else {
        errorLevel.classList.remove("show");  // Ta bort "show" om svårighetsgraden är vald
    }

    return isValid;  // Returnera resultatet för svårighetsgraden
}

// Funktion för att uppdatera knappen (om valideringen lyckas eller inte)
function toggleStartButton() {
    // Kontrollera användarnamn
    const isUsernameValid = validateForm();

    // Kontrollera svårighetsgrad (men vi kommer inte visa felmeddelandet för svårighetsgrad här)
    const isDifficultyValid = validateDifficulty();

    // Om båda fälten är korrekta, aktivera startknappen
    startButton.disabled = !(isUsernameValid && isDifficultyValid);
}

// Lägg till eventlyssnare för när användaren skriver i användarnamn
usernameInput.addEventListener("input", toggleStartButton);

// Lägg till eventlyssnare för när användaren väljer svårighetsgrad
difficultyRadios.forEach(radio => {
    radio.addEventListener("change", toggleStartButton);
});

// Lägg till en eventlyssnare på start-knappen
startButton.addEventListener("click", function(event) {
    event.preventDefault();  // Förhindra att knappen gör något innan vi validerar formuläret

    // Kontrollera om användarnamnet är ifyllt och om en svårighetsgrad är vald
    const isUsernameValid = validateForm();
    const isDifficultyValid = validateDifficulty();

    // Om valideringen lyckas, starta spelet
    if (isUsernameValid && isDifficultyValid) {
        console.log("Spelet kan starta!");
        // Lägg till här logik för att starta spelet
    } else {
        // Om något saknas, visa felmeddelandena
        if (!isUsernameValid) {
            errorUsername.classList.add("show");
        }
        if (!isDifficultyValid) {
            errorLevel.classList.add("show");
        }
        console.log("Validering misslyckades: Fyll i både användarnamn och svårighetsgrad.");
    }
});

// Initialt inaktivera start-knappen tills användarnamn och svårighetsgrad är ifyllda
startButton.disabled = true;
