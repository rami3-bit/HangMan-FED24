
const leaderboard = document.querySelector('.whole-leaderboard')
const LeaderboardCloseButton = document.querySelector(`.leaderboard-close-button`)
const LeaderboardHomeButton = document.querySelector(`#leaderboard-home-button`)
const mainMenu = document.querySelector(`.main-menu`)


// --------------------hide/show Leaderboard------------

LeaderboardHomeButton.addEventListener('click', () => {
	leaderboard.classList.remove('hidden')
	mainMenu.classList.add(`hidden`)
})

LeaderboardCloseButton.addEventListener('click', () => {
	leaderboard.classList.add('hidden')
	mainMenu.classList.remove(`hidden`)
})

// --------------------------------

