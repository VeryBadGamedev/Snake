var blocksize = 25
var rows = 18
var cols = 18
var board
var ctx

var score = 0

var snakeX = blocksize * 5
var snakeY = blocksize * 5

var foodX
var foodY

var velocityX = 0
var velocityY = 0

var snakeBody = []

var gameover = false

window.onload = function() {
    board = document.getElementById("board")
    board.height = rows * blocksize
    board.width = cols * blocksize
    ctx = board.getContext('2d')

    placefood()
    document.addEventListener("keydown",changedirecion)
    setInterval(update,1000/10)
}

function update() {
    if (gameover) return

    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,board.width,board.height)

    ctx.fillStyle = 'red'
    ctx.fillRect(foodX,foodY,blocksize,blocksize)

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX,foodY])
        score++
        placefood()
    }

    for (let i=snakeBody.length-1;i>0;i--) {
        snakeBody[i] = snakeBody[i-1]
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX,snakeY]
    }

    ctx.fillStyle = 'lime'
    snakeX += velocityX * blocksize
    snakeY += velocityY * blocksize
    ctx.fillRect(snakeX,snakeY,blocksize,blocksize)

    for (let i=0;i<snakeBody.length;i++) {
        ctx.fillStyle = 'green'
        ctx.fillRect(snakeBody[i][0],snakeBody[i][1],blocksize,blocksize)
    }

    if (snakeX < 0 || snakeX > cols * blocksize - 1 || snakeY < 0 || snakeY > rows * blocksize - 1) {
        gameover = true
        alert("GameOver, Press F5 to play again!")
    }

    for (let i=0;i<snakeBody.length;i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameover = true
            alert("GameOver, Press F5 to play again!")
        }
    }

    document.getElementById("score").innerHTML = `Score : ${score}`
}

function changedirecion(e) {
    if(e.keyCode == 87 && velocityY != 1) {
        velocityX = 0
        velocityY = -1
    }
    if(e.keyCode == 83 && velocityY != -1) {
        velocityX = 0
        velocityY = 1
    }
    if(e.keyCode == 65 && velocityX != 1) {
        velocityX = -1
        velocityY = 0
    }
    if(e.keyCode == 68 && velocityX != -1) {
        velocityX = 1
        velocityY = 0
    }
}

function placefood() {
    foodX = Math.floor(Math.random() * cols) * blocksize
    foodY = Math.floor(Math.random() * rows) * blocksize
}