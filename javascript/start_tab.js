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
