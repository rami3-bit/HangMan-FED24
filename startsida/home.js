//			select diffculty

document.addEventListener('DOMContentLoaded', () => {

	const buttons = document.querySelectorAll('.difficulty-selection button');
  
	
	buttons.forEach(button => {
	  button.addEventListener('click', () => {

		buttons.forEach(b => b.classList.remove('selected'));
  
		
		button.classList.add('selected');
	  });
	});
  });
  
  //		Leaderboard Vy