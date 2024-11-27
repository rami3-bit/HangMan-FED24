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



// Funktion för att uppdatera val
function updateSelection(selected, ...others) {
  // Lägg till en klass till den valda div-enheten
  selected.classList.add('selected');

  // Ta bort klassen från de andra
  others.forEach(div => div.classList.remove('selected'));
}
