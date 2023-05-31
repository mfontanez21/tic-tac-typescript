/*-------------------------------- Constants --------------------------------*/
const winningCombos: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

/*---------------------------- Variables  ----------------------------*/
let turn: number, winner: boolean, tie: boolean, board: number[]

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll<HTMLElement>(".sqr")
const resetBtnEl = document.querySelector<HTMLButtonElement>("btn")
const messageEl = document.querySelector<HTMLHeadingElement>("#message")!
const boardEl = document.querySelector<HTMLElement>(".board")

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(function(square){
  square.addEventListener("click", handleClick)
})

resetBtnEl?.addEventListener("click", init)

/*-------------------------------- Functions --------------------------------*/


init()

function init() {
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  turn = 1
  winner = false
  tie = false
  render()
}

function render(){
  updateBoard()
  updateMessage()
}

function updateBoard() :void {
  board.forEach((square, idx) =>{
    if (square === 0){
        squareEls[idx].textContent = " "
    } if (square === 1){
        squareEls[idx].textContent = "🗿"
    } if (square === -1) {
        squareEls[idx].textContent = "🦍"
    }
    
    })
}

function updateMessage(){
  if (winner === false && tie === false){
    messageEl.textContent = `It's ${turn === 1 ? "🗿" : "🦍"}'s turn!`
} else if (winner === false && tie === true){
    messageEl.textContent = "Tie! Unstoppable = Immovable"
} else {
    messageEl.textContent = `${turn === 1 ? "🗿" : "🦍"} wins! You are the Apex Emoji!`
}
}

function handleClick(evt: MouseEvent){
  if (!evt.target) return 
  let number = evt.target as HTMLElement
  const sqIdx: number = parseInt(number.id.replace("sq", ""))
    if (board[sqIdx] || winner) return
    placePiece(sqIdx)
    checkForTie()
    checkForWinner()
    switchPlayerTurn()
    render()
}

function placePiece(idx: number){
  board[idx] = turn
}

function checkForTie(){
  if (!board.includes(0)) {
    tie = true
    }
}

function checkForWinner(){
  winningCombos.forEach(function(combo: number[]) {
    if (Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]]) === 3) {
        winner = true
    }
})
}

function switchPlayerTurn(){
  if (winner) return
    turn *= -1
}