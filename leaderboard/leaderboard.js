// we declare variables----------------

const leaderboard = document.querySelector('.whole-leaderboard')
const LeaderboardCloseButton = document.querySelector(`.leaderboard-close-button`)
const LeaderboardHomeButton = document.querySelector(`#leaderboard-home-button`)
const mainMenu = document.querySelector(`.main-menu`)
const leaderboardList = document.querySelector('.leaderboard-list')
const sortButtons = Array.from(document.querySelectorAll('.leaderboard-sort-button'))


// --------------------hide/show Leaderboard tab------------

LeaderboardHomeButton.addEventListener('click', () => {
	leaderboard.classList.remove('hidden')
	mainMenu.classList.add(`hidden`)
})

LeaderboardCloseButton.addEventListener('click', () => {
	leaderboard.classList.add('hidden')
	mainMenu.classList.remove(`hidden`)
})

// ---------object for tracking of sorting---

let sortOrder = {
    result: true,
    time: true,
    date: true
}

// ----------------We create a function for converting strings (stats from leaderboard which are there by default) to arrays. Stats which we will need for comparison will be converted from string to numbers-----

const parseListItem = (itemText) => {
    const stats = itemText.split(', ')
    return {
        name: stats[0],
        mistakes: parseInt(stats[1].split(': ')[1]),
        wordLength: parseInt(stats[2].split(': ')[1]),
        date: new Date(stats[3]),
        time: parseInt(stats[4].split(' ')[0]),
        status: stats[5]
    }
}