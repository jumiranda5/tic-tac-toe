const Player = (name, symbol) => {
    let isBot = false;
    let col = null;
    if (name.toLowerCase() === "bot") isBot = true;
    const setCol = (indexes) => { col = indexes };
    const getCol = () => { return col };
    return {name, symbol, isBot, setCol, getCol};
}

const gameBoard = (() => {

    let player1Name;
    let player2Name;
    let player1;
    let player2;
    let moveCount = 0;
    let isGameOver = false;

    const setPlayersNames = (name1, name2) => { 
        player1Name = name1;
        player2Name = name2;
    };

    const setPlayers = (symbol1, symbol2) => {
        player1 = Player(player1Name, symbol1.toUpperCase());
        player2 = Player(player2Name, symbol2.toUpperCase());
        document.getElementById("player1").textContent = `${player1Name}: ${symbol1}`;
        document.getElementById("player2").textContent = `${player2Name}: ${symbol2}`;
    };

    const board = [
        "", "", "", 
        "", "", "", 
        "", "", ""
    ];

    const isPositionAvailable = (pos) => {
        if (board[pos] === "") return true;
        else return false; 
    };

    const addMove = (pos, uiNode) => {
        let symbol;
        if (moveCount === 0 || moveCount % 2 === 0) symbol = "X";
        else symbol = "O";

        uiNode.textContent = symbol;

        moveCount++;

        board[pos] = symbol;

        return checkWinner(symbol);
    };

    const checkWinner = (symbol) => {
        let currentPlayer;
        if (player1.symbol === symbol.toUpperCase()) currentPlayer = player1;
        else currentPlayer = player2;

        // If one of the conditions bellow are true, the game is over
        isGameOver = true; 
        
        // Horizontal
        if (board[0] !== "" && board[0] === board[1] && board[1] === board[2]) currentPlayer.setCol([0, 1, 2]);
        else if (board[3] !== "" && board[3] === board[4] && board[4] === board[5]) currentPlayer.setCol([3, 4, 5]);
        else if (board[6] !== "" && board[6] === board[7] && board[7] === board[8])  currentPlayer.setCol([5, 7, 8]);

        // Vertical
        else if (board[0] !== "" && board[0] === board[3] && board[3] === board[6]) currentPlayer.setCol([0, 3, 6]);
        else if (board[1] !== "" && board[1] === board[4] && board[4] === board[7]) currentPlayer.setCol([1, 4, 7]);
        else if (board[2] !== "" && board[2] === board[5] && board[5] === board[8]) currentPlayer.setCol([2, 5, 8]);

        // Diagonal
        else if (board[0] !== "" && board[0] === board[4] && board[4] === board[8]) currentPlayer.setCol([0, 4, 8]);
        else if (board[6] !== "" && board[6] === board[4] && board[4] === board[2]) currentPlayer.setCol([6, 4, 2]);

        // Game is not over
        else isGameOver = false;

        if (moveCount === 9) return "match";
        else return currentPlayer;
    }

    const getIsGameOver = () => {
        return isGameOver;
    }

    const reset = () => {
        moveCount = 0;
        isGameOver = false;
        player1.setCol(null);
        player2.setCol(null);
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    }

    return { 
        setPlayersNames, 
        setPlayers, 
        isPositionAvailable, 
        addMove, 
        getIsGameOver,
        reset
    };

})();


// UI

const settingsVs = document.getElementById("settings-vs");
const settingsSymbol = document.getElementById("settings-symbol");
const boardContainer = document.getElementById("board-container");
const btnPlayer2 = document.getElementById("btn-player2");
const btnBot = document.getElementById("btn-bot");
const btnX = document.getElementById("btn-x");
const btnO = document.getElementById("btn-o");
const uiBoard = document.getElementById("board").children;
const playersContainer = document.getElementById("players");
const resultContainer = document.getElementById("result");
const btnReset = document.getElementById("btn-reset");

btnPlayer2.addEventListener("click", () => {
    console.log("Play against Player 2");
    settingsVs.classList.add("hidden");
    settingsSymbol.classList.remove("hidden");
    gameBoard.setPlayersNames("Player 1", "Player 2");
});

btnBot.addEventListener("click", () => {
    console.log("Play against bot");
    settingsVs.classList.add("hidden");
    settingsSymbol.classList.remove("hidden");
    gameBoard.setPlayersNames("Player 1", "Bot");
});

btnX.addEventListener("click", () => {
    console.log("Player 1 is X");
    settingsSymbol.classList.add("hidden");
    boardContainer.classList.remove("hidden");
    gameBoard.setPlayers("X", "O");
});

btnO.addEventListener("click", () => {
    console.log("Player 1 is O");
    settingsSymbol.classList.add("hidden");
    boardContainer.classList.remove("hidden");
    gameBoard.setPlayers("O", "X");
});

btnReset.addEventListener("click", () => { 
    gameBoard.reset();
    playersContainer.classList.remove("hidden");
    resultContainer.classList.add("hidden");
    for (let i = 0; i < uiBoard.length; i++) {
        uiBoard[i].textContent = "";
        uiBoard[i].style.background = "#ffffff";
    }
});

for (let i = 0; i < uiBoard.length; i++) {
    let div = uiBoard[i];
    
    div.addEventListener("mouseenter", (e) => { setHover(true, i, e.target) });
    
    div.addEventListener("mouseleave", (e) => { setHover(false, i, e.target) });

    div.addEventListener("click", () => {
        const isEmpty = gameBoard.isPositionAvailable(i);
        const isGameOver = gameBoard.getIsGameOver();
        if (isEmpty && !isGameOver) {
            let result = gameBoard.addMove(i, div);
            console.log(result.getCol());
            if (result === "match") {
                gameOver("It's a match!");
            }
            else if (result.getCol() !== null) {
                let col = result.getCol();
                uiBoard[col[0]].style.background = "#4cff82";
                uiBoard[col[1]].style.background = "#4cff82";
                uiBoard[col[2]].style.background = "#4cff82";
                gameOver(`${result.name} wins!`);
            }
        }
    });
}

function gameOver(msg) {
    playersContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    resultContainer.children[0].textContent = msg;
}

function setHover(isMouseEnter, index, div) {

    const isEmpty = gameBoard.isPositionAvailable(index);
    const isGameOver = gameBoard.getIsGameOver();

    if (isMouseEnter) {
        if (isEmpty && !isGameOver) {
            div.style.background = "#ededed";
            div.style.cursor = "pointer";
        }
    }
    else {
        if (!isGameOver) {
            div.style.background = "#ffffff";
            div.style.cursor = "auto";
        }
    }

}