// 	QUERYSELECTORS

const lobbySection = document.querySelector('.lobby-section')
const gameSection = document.querySelector('.game-section')
const pError = document.querySelector('.error')
const startGameBtn = document.querySelector('.start-game')
const catName = document.querySelector('.cat-name')
const emotionText = document.querySelector('.emotion-text')
const hungerNumber = document.querySelector('.hunger-number')
const thirstNumber = document.querySelector('.thirst-number')
const hapinessNumber = document.querySelector('.hapiness-number')
const ageNumber = document.querySelector('.age-number')
const catImg = document.querySelector('.cat')
const snackBtn = document.querySelector('.give-a-snack')
const pourBtn = document.querySelector('.pour-the-milk')
const playBtn = document.querySelector('.play-with-string')

// VARIABLES

let hunger = Math.floor(Math.random() * (10 - 5)) + 5
let thirst = Math.floor(Math.random() * (10 - 5)) + 5
let hapiness = Math.floor(Math.random() * (10 - 5)) + 5
let age = 0
let catAge
let decaHealthTime

// MUSIC

const lobbyAudio = new Audio('./audio/lobby-music.mp3')
const winAudio = new Audio('./audio/win-music.mp3')
const deadAudio = new Audio('./audio/dead-music.mp3')
const meowAudio = new Audio('./audio/meow.mp3')
const purrAudio = new Audio('./audio/purr.mp3')

// START A GAME

lobbyAudio.play()

const startGame = () => {
	if (catName.value === '') {
		pError.style.visibility = 'visible'
	} else {
		pError.style.visibility = 'hidden'
		lobbySection.style.display = 'none'
		gameSection.style.display = 'flex'
		emotionText.innerHTML = `${catName.value} is happy to see you!`
		lobbyAudio.pause()
		randomHealthBar()
		decaHealthTime = setInterval(decHealthBars, 1000)
		catAge = setInterval(catAgeing, 1500)
	}
}

// RANDOM HEALTH BARS

function randomHealthBar() {
	hungerNumber.innerHTML = hunger
	thirstNumber.innerHTML = thirst
	hapinessNumber.innerHTML = hapiness
}

// DECREASING CATS HEALTH BARS

function decHealthBars() {
	hunger--
	thirst--
	hapiness--
	hungerNumber.innerHTML = hunger
	thirstNumber.innerHTML = thirst
	hapinessNumber.innerHTML = hapiness

	if (hunger === 0 || thirst === 0 || hapiness === 0) {
		clearInterval(decaHealthTime)
		clearInterval(catAge)
		deadAudio.play()
		emotionText.innerHTML = `${catName.value} is dead. You must be a better owner!`
		catImg.src = './img/dead-cat.png'
	}
}

// CAT AGEING

function catAgeing() {
	age++
	ageNumber.innerHTML = age
	if (age > 18) {
		clearInterval(catAge)
		clearInterval(decaHealthTime)
		winAudio.play()
		emotionText.innerHTML = `${catName.value} has passed of old age. He lived a happy life.`
		catImg.src = './img/dead-cat.png'
	}
}

// HUNGER+

function giveSnack() {
	if (hunger < 10 && age < 18) {
		hunger++
		hungerNumber.innerHTML = hunger
	}
	if (hunger === 10) {
		meowAudio.play()
	}
}

// THIRST+

function pourTheMilk() {
	if (thirst < 10 && age < 18) {
		thirst++
		thirstNumber.innerHTML = thirst
	}
	if (thirst === 10) {
		meowAudio.play()
	}
}

// HAPINESS+

function playWithString() {
	if (hapiness < 10 && age < 18) {
		hapiness++
		hapinessNumber.innerHTML = hapiness
	}
	if (hapiness === 10) {
		purrAudio.play()
	}
}

// EVENTLISTENERS

playBtn.addEventListener('click', playWithString)
snackBtn.addEventListener('click', giveSnack)
pourBtn.addEventListener('click', pourTheMilk)
startGameBtn.addEventListener('click', startGame)
