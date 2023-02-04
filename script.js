// Containers
const settingsVs = document.getElementById("settings-vs");
const settingsSymbol = document.getElementById("settings-symbol");
const boardContainer = document.getElementById("board-container");
const playersContainer = document.getElementById("players");
const resultContainer = document.getElementById("result");

// buttons
const btnPlayer2 = document.getElementById("btn-player2");
const btnBot = document.getElementById("btn-bot");
const btnX = document.getElementById("btn-x");
const btnO = document.getElementById("btn-o");
const btnReset = document.getElementById("btn-reset");

btnPlayer2.addEventListener("click", () => {
    console.log("Play against Player 2");
    replaceViews(settingsSymbol, settingsVs);
    gameBoard.setPlayersNames("Player 1", "Player 2");
});

btnBot.addEventListener("click", () => {
    console.log("Play against bot");
    replaceViews(settingsSymbol, settingsVs);
    gameBoard.setPlayersNames("Player 1", "Bot");
});

btnX.addEventListener("click", () => {
    console.log("Player 1 is X");
    replaceViews(boardContainer, settingsSymbol);
    gameBoard.setPlayersSymbols("X", "O");
});

btnO.addEventListener("click", () => {
    console.log("Player 1 is O");
    replaceViews(boardContainer, settingsSymbol);
    gameBoard.setPlayersSymbols("O", "X");
    gameBoard.setInitialBotMove();
});

const replaceViews = (toShow, toHide) => {
    toHide.classList.add("hidden");
    toShow.classList.remove("hidden");
};

btnReset.addEventListener("click", () => { 
    gameBoard.clearBoard();
    replaceViews(playersContainer, resultContainer);
    for (let i = 0; i < uiBoard.length; i++) {
        uiBoard[i].textContent = "";
        uiBoard[i].style.background = "#ffffff";
    }
});


// UI board

const uiBoard = document.getElementById("board").children;

for (let i = 0; i < uiBoard.length; i++) {
    
    uiBoard[i].addEventListener("mouseenter", (e) => { setHover(true, i, e.target) });
    
    uiBoard[i].addEventListener("mouseleave", (e) => { setHover(false, i, e.target) });

    uiBoard[i].addEventListener("click", () => {
        const isEmpty = gameBoard.isPositionAvailable(i);
        const isGameOver = gameBoard.getIsGameOver();
        
        if (isEmpty && !isGameOver) {
        
            const currentPlayer = gameBoard.getCurrentPlayer();
            uiBoard[i].textContent = currentPlayer.getSymbol();
            const col = gameBoard.addMove(currentPlayer, i);
        
            if (col.length === 3) {
                uiBoard[col[0]].style.background = "#4cff82";
                uiBoard[col[1]].style.background = "#4cff82";
                uiBoard[col[2]].style.background = "#4cff82";
                replaceViews(resultContainer, playersContainer);

                // Get last player in case the game is against bot
                const lastPlayer = gameBoard.getLastPlayer();
                resultContainer.children[0].textContent = `${lastPlayer.getName()} wins!`;
            }
            else if (gameBoard.getIsGameOver()) {
                replaceViews(resultContainer, playersContainer);
                resultContainer.children[0].textContent = `It's a tie!`;
            } 
            
        }
    });
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


// Objects

const Player = () => {

    let name;
    let symbol;
    let moves = [];

    const setName = (playerName) => { name = playerName };

    const setSymbol = (playerSymbol) => { symbol = playerSymbol };

    const getName = () => { return name };

    const getSymbol = () => { return symbol };
    
    const addMove = (pos) => { moves.push(pos) };

    const checkMoves = () => {
        const col1 = moves.includes(0) && moves.includes(1) && moves.includes(2);
        const col2 = moves.includes(3) && moves.includes(4) && moves.includes(5);
        const col3 = moves.includes(6) && moves.includes(7) && moves.includes(8);
        const col4 = moves.includes(0) && moves.includes(3) && moves.includes(6);
        const col5 = moves.includes(1) && moves.includes(4) && moves.includes(7);
        const col6 = moves.includes(2) && moves.includes(5) && moves.includes(8);
        const col7 = moves.includes(0) && moves.includes(4) && moves.includes(8);
        const col8 = moves.includes(6) && moves.includes(4) && moves.includes(2);
        
        if (col1) return [0, 1, 2];
        else if (col2) return [3, 4, 5]; 
        else if (col3) return [6, 7, 8];
        else if (col4) return [0, 3, 6];
        else if (col5) return [1, 4, 7];
        else if (col6) return [2, 5, 8];
        else if (col7) return [0, 4, 8];
        else if (col8) return [6, 4, 2];
        else return [];
    }

    const resetMoves = () => { moves = [] };

    return { setName, setSymbol, addMove, checkMoves, getSymbol, getName, resetMoves };

};


const gameBoard = (() => {

    const player1 = Player();
    const player2 = Player();
    let moveCount = 0;
    let isGameOver = false;
    const board = [
        "", "", "", 
        "", "", "", 
        "", "", ""
    ];

    // Players

    const setPlayersNames = (name1, name2) => {
        player1.setName(name1);
        player2.setName(name2);
    };

    const setPlayersSymbols = (symbol1, symbol2) => {
        player1.setSymbol(symbol1);
        player2.setSymbol(symbol2);
    };

    const getCurrentPlayer = () => {
        let currentPlayer;
        let firstPlayer = player1;
        let secondPlayer = player2;

        if (player1.getSymbol() === "O") {
            firstPlayer = player2;
            secondPlayer = player1;
        }

        console.log(`first player => ${firstPlayer.getName()}`);
        console.log(`second player => ${secondPlayer.getName()}`);

        console.log(`Move count = ${moveCount}`);

        if (moveCount === 0 || moveCount % 2 === 0) currentPlayer = firstPlayer;
        else currentPlayer = secondPlayer;

        console.log(`Current player = ${currentPlayer.getName()}`);

        return currentPlayer;
    }

    const getLastPlayer = () => {
        let lastPlayer;
        let firstPlayer = player1;
        let secondPlayer = player2;

        if (player1.getSymbol() === "O") {
            firstPlayer = player2;
            secondPlayer = player1;
        }

        if (moveCount % 2 === 0) lastPlayer = secondPlayer;
        else lastPlayer = firstPlayer;

        return lastPlayer;
    }

    // Bot

    const botMove = () => {
        let available = availablePositions();
        const position = Math.floor(Math.random() * available.length);
        return available[position];
    }

    // board

    const move = (player, position) => {
        moveCount++;

        if (player === player1) player1.addMove(position);
        else player2.addMove(position);

        board[position] = player.getSymbol();

        const col = player.checkMoves();

        if (col.length === 3 || moveCount > 8) isGameOver = true;

        return col;
    }

    const addMove = (player, position) => {
        
        const col = move(player, position);

        if (col.length === 3) return col;

        // if player 2 is bot, make bot move
        else if (player === player1 && player2.getName().toLowerCase() === "bot") {
            const botPosition = botMove();
            uiBoard[botPosition].textContent = player2.getSymbol();
            const botCol = move(player2, botPosition);
            return botCol;
        }

        return col;
        
    }

    const setInitialBotMove = () => {
        // Init game if bot is X
        const botPosition = botMove();
        uiBoard[botPosition].textContent = player2.getSymbol();
        move(player2, botPosition);
    }

    const getIsGameOver = () => {
        return isGameOver;
    }

    // available positions

    const availablePositions = () => {
        let available = [];
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") available.push(i);
        }
        return available;
    }

    const isPositionAvailable = (pos) => {
        if (board[pos] === "") return true;
        else return false; 
    };

    // Clear
    
    const clearBoard = () => {
        moveCount = 0;
        isGameOver = false;
        player1.resetMoves();
        player2.resetMoves();
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    }

    return {
        setPlayersNames,
        setPlayersSymbols,
        getCurrentPlayer,
        getLastPlayer,
        addMove,
        setInitialBotMove,
        availablePositions,
        isPositionAvailable,
        getIsGameOver,
        clearBoard
    }

})();

// If first player - X - is bot => init game
// if (gameBoard.getCurrentPlayer().getName().toLowerCase() === "bot") {

// }