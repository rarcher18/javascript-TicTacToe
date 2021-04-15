const xPlayer = 'x'
const circlePlayer = 'circle'
winningCombinations = [
    // horizontal wins
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // vertical wins
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal wins
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const restartButton = document.getElementById('restart-button')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(xPlayer)
        cell.classList.remove(circlePlayer)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e){
    const cell = e.target
    const currentPlayer = circleTurn ? circlePlayer : xPlayer
    placeMark(cell ,currentPlayer)
   if (checkWinner(currentPlayer)) {
    endGame(false)
   } else if (isDraw()) {
       endGame(true)
   } else {
       swapTurns()
       setHoverClass()
   }
}

function endGame(tie) {
    if (tie) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!!!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(xPlayer) || 
        cell.classList.contains(circlePlayer)
    })
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

function checkWinner(currentPlayer) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentPlayer)
        })
    })
}
