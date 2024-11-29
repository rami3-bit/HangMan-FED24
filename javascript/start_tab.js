const easyDiv = document.querySelector(".easy");
const mediumDiv = document.querySelector(".medium");
const hardDiv = document.querySelector(".hard");
		//väljer ID # i radio knapparna
const easyRadio = document.querySelector("#easy");
const mediumRadio = document.querySelector("#medium");
const hardRadio = document.querySelector("#hard");

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




  






  // Hämta DOM-elementen
const usernameInput = document.getElementById("username").value;
const errorUsername = document.getElementById("error-username");
const errorLevel = document.getElementById("error-level");
const startButton = document.querySelector(".start");
const difficultyRadios = document.querySelectorAll("input[name='difficulty']");

function validateForm() {
	let isValid = true;

	if(usernameInput.value.trim() === "") {
		errorUsername.classList.add("show");




	}
}






