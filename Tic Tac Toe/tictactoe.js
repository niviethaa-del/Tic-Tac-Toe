let playerO = "O";
let playerX = "X";
let currentPlayer = playerO;
let currPlayer = playerO;

//                0   1   2   3   4   5   6   7   8
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameCells;

let winningConditions = [
    [0, 1, 2], //horizontal row 1
    [3, 4, 5], //horizontal row 2
    [6, 7, 8], //horizontal row 3
    [0, 3, 6], //vertical column 1
    [1, 4, 7], //vertical column 2
    [2, 5, 8], //vertical column 3 
    [0, 4, 8], //diagonal 
    [2, 4, 6], //anti-diagonal
];

let gameOver = false;
let restartGameButton; 

window.onload = function () {
    gameCells = document.getElementsByClassName("game-cell");
    for (let cell of gameCells) {
        cell.addEventListener("click", placeCell);
    }
    restartGameButton = document.getElementById("game-restart-button");
    restartGameButton.addEventListener("click", restartGame);
}
  
function placeCell() {
    if (gameOver) {
        return;
    }
    const index = parseInt(this.getAttribute("data-cell-index"));
    if (gameBoard[index] != "") {
        return;
    }

    this.innerText = currPlayer;
    gameBoard[index] = currPlayer;
    
    //change players
    currPlayer = (currPlayer == playerO) ? playerX : playerO;

    //check for winner
    checkWinner();
}

function checkWinner() {
    for (let winCondition of winningConditions) {
        let a = gameBoard[winCondition[0]];
        let b = gameBoard[winCondition[1]];
        let c = gameBoard[winCondition[2]]; 

        if (a == b && b == c && a != "") {
            //update style of winning cells
            for (let i = 0; i < gameBoard.length; i++) {
                if (winCondition.includes(i)) {
                gameCells[i].classList.add("winning-game-cell");
                }
            }
            gameOver = true;
            return;  
        }
    }
}

function restartGame() {
    gameOver = false;
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    for (let cell of gameCells) {
        cell.innerText = "";
        cell.classList.remove("winning-game-cell");
    }
}
