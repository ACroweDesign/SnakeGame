const gameGrid = document.querySelector('.game-grid')
const startBtn = document.getElementById('start')
const scoring = document.getElementById('score')
const finalScore = document.querySelector('.finalScore')
let squares = []
let currentSnake = [2, 1, 0]
let direction = 1
let width = 20
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0
let isGameOver = false


function createGrid() {
    for(let i = 0; i < 400; i++){
    const square = document.createElement('div')
    gameGrid.appendChild(square)
    square.classList.add("square")
    squares.push(square)
    }
}
createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

function startGame () {
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    scoring.classList.remove('finalScore')
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId)
    currentSnake = [2, 1, 0]
    score = 0
    intervalTime = 1000
    direction = 1
    scoring.textContent = score
    generateApples()
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    timerId = setInterval(move, intervalTime);


}

function move() {
    if(
        (currentSnake[0] + width >= width*width && direction === width) ||
        (currentSnake[0] % width === width-1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width < 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
    ){
        scoring.classList.add('finalScore')
        scoring.textContent = "Your Final Score was: " + score + "!"
        finalScore.style.transform = "translateX('0')"
        return clearInterval(timerId)
    }
    const tail = currentSnake.pop()
    const head = currentSnake.unshift(currentSnake[0] + direction)
    squares[tail].classList.remove('snake')

        // grow snake after eating apple
        if(currentSnake[0] === appleIndex){
            squares[appleIndex].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            generateApples()
            score++
            scoring.textContent = score
            clearInterval(timerId)
            intervalTime = intervalTime * speed
            timerId = setInterval(move, intervalTime)
                
            }

    squares[currentSnake[0]].classList.add('snake')
}

function generateApples() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while(squares[appleIndex].classList.contains('snake')) {
        squares[appleIndex].classList.add('apple')
    }
}
generateApples()


function control(e) {
    if(e.keyCode === 39) {
        direction = 1
    }
    if(e.keyCode === 38) {
        direction = -width 
    }
    if(e.keyCode === 37) {
        direction = -1
    }
    if(e.keyCode === 40) {
        direction = +width
    }
}

document.addEventListener('keydown', control)
startBtn.addEventListener('click', startGame)