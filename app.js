const xPlayer = 'x'
const circlePlayer = 'circle'

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
let circleTurn

startGame()

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, {once: true})
    })
    setHoverClass()
}


function handleClick(e){
    const cell = e.target
    const currentPlayer = circleTurn ? circlePlayer : xPlayer
    placeMark(cell ,currentPlayer)
    // place icon
    // check for a winner
    // check for a draw
    // switch turns
    swapTurns()
    setHoverClass()
}

function placeMark(cell, currentPlayer) {
    cell.classList.add(currentPlayer)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setHoverClass() {
    board.classList.remove(xPlayer)
    board.classList.remove(circlePlayer)
    if (circleTurn) {
        board.classList.add(circlePlayer)
    } else {
        board.classList.add(xPlayer)
    }

}
