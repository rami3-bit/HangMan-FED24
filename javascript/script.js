// Information Dump, all Classes/ID
const keyboard=document.querySelector('.keyboard');
const wordDisplay=document.querySelector('word-display');
const mistake=document.querySelector(".mistake-count");
const gameover=document.querySelector(".game-over");
const answer=document.querySelector(".answer");

let count = 0;

const randomIndex = Math.floor(Math.random() * wordList.length);
const { word, hint } = wordList[randomIndex];

//adding Keyboard
for(let i=97; i<=122;i++){
	const button=document.createElement("button")
	button.classList.add("button")
	button.innerText=String.fromCharCode(i)
	keyboard.appendChild(button);
}

const matchWord = (val) => {
	const matches = [];
	console.log(word);
	word.split("").forEach((el, index) => {
	  if (el === val.toLowerCase()) {
		matches.push(index);
	  }
	});
  
	if (matches.length === 0) {
	  count++;
	  chance.innerText = `${count}/6`;
	} else {
	  matches.forEach((v) => {
		const letterElem = document.querySelectorAll(".letter");
		letterElem[v].innerText = val;
		letterElem[v].classList.add("guess");
	  });
	}
  };
  
	
// Word Libariary for all the levels, each options is buttons
