const squares = document.querySelectorAll(".grid div")
const scoreDisplay = document.querySelector("span")
const startButton = document.querySelector(".start")

const width = 10
let currentIndex = 0 //first div in my grid
let appleIndex = 0
let currentSnake = [2,1,0] // 2 = head of snake, 1 = body, and 0 = tail
let direction = 1
let score = 0
let speed = 0.9 
let intervalTime = 1
let interval = 0


function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove("snake"))
    squares[appleIndex].classList.remove("apple")
    clearInterval(interval)
    score = 0
    randomApple()
    direction = 1
    scoreDisplay.innerText = score
    intervalTime = 500
    currentSnake = [2, 1, 0]
    currentIndex = 0
    currentSnake.forEach(index => squares[index].classList.add("snake"))
    interval = setInterval(moveOutComes, intervalTime)
}

let gameOver = document.getElementById("game")
//function that deals with ALL the outcomes of the snake
function moveOutComes() {
    let displayTotalScore = `Total Score: ${score}`

    //deals with snake hitting border and snake hitting self
    if (
        (currentSnake[0] + width >= (width * width) && direction === width) || //if snake hits bottom
        (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
        (currentSnake[0] - width < 0 && direction === -width) || //if snake hits the top
        squares[currentSnake[0] + direction].classList.contains("snake")
    ) {
        gameOver.classList.add("show")
        lose()
        let totalScore = document.getElementById("total-score")
        totalScore.innerHTML = displayTotalScore
        return clearInterval(interval) 
    }
    const tail = currentSnake.pop()
    squares[tail].classList.remove("snake")
    currentSnake.unshift(currentSnake[0] + direction)

    //deals with snake getting apple
    if (squares[currentSnake[0]].classList.contains("apple")) {
        squares[currentSnake[0]].classList.remove("apple")
        squares[tail].classList.add("snake")
        currentSnake.push(tail)
        randomApple()
        play()
        score++
        scoreDisplay.textContent = score
        clearInterval(interval)
        intervalTime = intervalTime * speed
        interval = setInterval(moveOutComes, intervalTime)
    }
    squares[currentSnake[0]].classList.add("snake")
}

function randomApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length - 1)
    } while (squares[appleIndex].classList.contains("snake"))
    squares[appleIndex].classList.add("apple")
}


function control(e) {
    squares[currentIndex].classList.remove("snake")

    if (e.code === "ArrowRight") {
        direction = 1
    } else if (e.code === "ArrowLeft" ) {
        direction = -1;
    } else if (e.code === "ArrowUp") {
        direction = -width
    } else if (e.code === "ArrowDown") {
        direction = +width;
    }
}

function reset() {
    startGame()
    gameOver.classList.remove("show")

}

document.addEventListener("keyup", control)
startButton.addEventListener("click", startGame )
const playAgain = document.getElementById("play-again")
playAgain.addEventListener("click", reset)

function play() {
    let audio = new Audio("sound/zapsplat_multimedia_game_sound_coins_collect_several_at_once_004_40815.mp3");
    audio.play();
  }

  function lose() {
      let audio = new Audio("sound/zapsplat_multimedia_game_error_tone_003_24921.mp3")
      audio.play()
  }