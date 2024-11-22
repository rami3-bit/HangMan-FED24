// Information Dump, all Classes/ID
const keyboard=document.querySelector('.keyboard');
const wordDisplay=document.querySelector('word-display');
const mistake=document.querySelector(".mistake-count");
const gameover=document.querySelector(".game-over");
const answer=document.querySelector(".answer");

let count = 0;


//adding Keyboard
for(let i=97; i<=122;i++){
	const button=document.createElement("button")
	button.classList.add("button")
	button.innerText=String.fromCharCode(i)
	keyboard.appendChild(button);
}

