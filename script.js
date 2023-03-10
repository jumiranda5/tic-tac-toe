/* =======================================================
                    DOM ELEMENTS
========================================================== */

// Containers
const settingsVs = document.getElementById("settings-vs");
const settingsSymbol = document.getElementById("settings-symbol");
const boardContainer = document.getElementById("board-container");
const resultContainer = document.getElementById("result");
const uiBoard = document.getElementById("board").children;

// Players
const playerX = document.getElementById("player1");
const playerO = document.getElementById("player2");

// buttons
const btnPlayer2 = document.getElementById("btn-player2");
const btnBot = document.getElementById("btn-bot");
const btnX = document.getElementById("btn-x");
const btnO = document.getElementById("btn-o");
const btnReset = document.getElementById("btn-reset");
const btnFinish = document.getElementById("btn-finish");


/* =======================================================
                BUTTONS EVENT LISTENERS
========================================================== */

btnPlayer2.addEventListener("click", () => {
    replaceViews(settingsSymbol, settingsVs);
    settingsSymbol.classList.add("enter-animation");
    gameBoard.setPlayersNames("Player 1", "Player 2");
});

btnBot.addEventListener("click", () => {
    replaceViews(settingsSymbol, settingsVs);
    settingsSymbol.classList.add("enter-animation");
    gameBoard.setPlayersNames("Player 1", "Bot");
});

btnX.addEventListener("click", () => {
    replaceViews(boardContainer, settingsSymbol);
    gameBoard.setPlayersSymbols("X", "O");
    setPlayersElement();
});

btnO.addEventListener("click", () => {
    replaceViews(boardContainer, settingsSymbol);
    gameBoard.setPlayersSymbols("O", "X");
    gameBoard.setInitialBotMove();
    setPlayersElement();
});

btnReset.addEventListener("click", () => {
    clear(false);
});

btnFinish.addEventListener("click", () => {
    clear(true);
    settingsSymbol.classList.remove("enter-animation");
    replaceViews(settingsVs, boardContainer);
});

const replaceViews = (toShow, toHide) => {
    toHide.classList.add("hidden");
    toShow.classList.remove("hidden");
};

const setPlayersElement = () => {
    let first;
    let second;
    
    if (gameBoard.getPlayers()[0].getSymbol() === "X") {
        first = gameBoard.getPlayers()[0].getName();
        second = gameBoard.getPlayers()[1].getName();
    }
    else {
        first = gameBoard.getPlayers()[1].getName();
        second = gameBoard.getPlayers()[0].getName();
    }

    playerX.textContent = `X -> ${first}`;
    playerO.textContent = `O -> ${second}`;
}

const clear = (isFinish) => {
    resultContainer.classList.add("hidden");
    for (let i = 0; i < uiBoard.length; i++) {
        uiBoard[i].children[0].textContent = "";
        uiBoard[i].style.background = "#ffffff";
        uiBoard[i].classList.remove("winner-col");
        uiBoard[i].children[0].classList.remove("enter-animation");
        uiBoard[i].children[0].classList.remove("enter-animation-bot");
        resultContainer.classList.remove("enter-animation");
    } 
    gameBoard.clearBoard(isFinish);
}


/* =======================================================
                GAME BOARD EVENT LISTENERS
========================================================== */

for (let i = 0; i < uiBoard.length; i++) {
    
    uiBoard[i].addEventListener("mouseenter", (e) => { setHover(true, i, e.target) });
    
    uiBoard[i].addEventListener("mouseleave", (e) => { setHover(false, i, e.target) });

    uiBoard[i].addEventListener("click", () => {

        // Check if the position is empty and the game is not over
        const isEmpty = gameBoard.isPositionAvailable(i);
        const isGameOver = gameBoard.getIsGameOver();
        
        if (isEmpty && !isGameOver) {
        
            // Add move and check if player won
            const currentPlayer = gameBoard.getCurrentPlayer();
            uiBoard[i].children[0].textContent = currentPlayer.getSymbol();
            uiBoard[i].children[0].classList.add("enter-animation");
            const col = gameBoard.addMove(currentPlayer, i);
        
            // if player won, change column color
            if (col.length === 3) {
                setTimeout(() => {
                    uiBoard[col[0]].classList.add("winner-col");
                    uiBoard[col[1]].classList.add("winner-col");
                    uiBoard[col[2]].classList.add("winner-col");
                }, 400);

                // Get last player in case the game is against bot
                const lastPlayer = gameBoard.getLastPlayer();
                setTimeout(() => {
                    resultContainer.classList.remove("hidden");
                    resultContainer.classList.add("enter-animation");
                    resultContainer.children[0].textContent = `${lastPlayer.getName()} wins!`;
                }, 400);
            }
            else if (gameBoard.getIsGameOver()) {
                setTimeout(() => {
                    resultContainer.classList.remove("hidden");
                    resultContainer.classList.add("enter-animation");
                    resultContainer.children[0].textContent = `It's a tie!`;
                }, 400);
            } 
            
        }
    });
}

function setHover(isMouseEnter, index, div) {

    // Change background color an pointer if position is available

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


/* =======================================================
                   OBJECTS AND FUNCTIONS
========================================================== */

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


const bestMove = (() => {

    let human;
    let bot;

    const getBestMove = (board, humanSymbol, aiSymbol) => {

        human = humanSymbol;
        bot = aiSymbol;

        let bestScore = -Infinity;
        let bestMove;

        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = bot;
                let testMove = minimax(board, false);
                board[i] = "";
                if (testMove > bestScore) {
                    bestScore = testMove;
                    bestMove = i;
                }
            }
        }

        return bestMove;

    }

    function checkWinner(board) {

        if (!board.includes("")) return 0;

        let winner;
        if (board[0] !== "" && board[0] === board[1] && board[1] === board[2]) winner = board[0];
        else if (board[3] !== "" && board[3] === board[4] && board[4] === board[5]) winner = board[3];
        else if (board[6] !== "" && board[6] === board[7] && board[7] === board[8]) winner = board[6];
        else if (board[0] !== "" && board[0] === board[3] && board[3] === board[6]) winner = board[0];
        else if (board[1] !== "" && board[1] === board[4] && board[4] === board[7]) winner = board[1];
        else if (board[2] !== "" && board[2] === board[5] && board[5] === board[8]) winner = board[2];
        else if (board[0] !== "" && board[0] === board[4] && board[4] === board[8]) winner = board[0];
        else if (board[6] !== "" && board[6] === board[4] && board[4] === board[2]) winner = board[6];

        if (winner === bot) return 1;
        else if (winner === human) return -1;
        else return null;

    }

    function minimax(board, isMaximizing) {

        let score = checkWinner(board);
        if (score !== null) return score;

        if (isMaximizing) {
            let maxValue = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === "") {
                    board[i] = bot;
                    maxValue = Math.max(maxValue, minimax(board, false));
                    board[i] = "";
                }
            }
            return maxValue;
        }
        else {
            let minValue = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === "") {
                    board[i] = human;
                    minValue = Math.min(minValue, minimax(board, true));
                    board[i] = "";
                }
            }
            return minValue;
        }
    }

    return { getBestMove }

})();


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

        if (moveCount === 0 || moveCount % 2 === 0) currentPlayer = firstPlayer;
        else currentPlayer = secondPlayer;

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

    const getPlayers = () => {
        return [ player1, player2 ];
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
            const botPosition = bestMove.getBestMove(board, player1.getSymbol(), player2.getSymbol());
            uiBoard[botPosition].children[0].classList.add("enter-animation-bot");
            uiBoard[botPosition].children[0].textContent = player2.getSymbol();
            const botCol = move(player2, botPosition);
            return botCol;
        }

        return col;
        
    }

    const setInitialBotMove = () => {
        // Init game if bot is X
        const botPosition = bestMove.getBestMove(board, player1.getSymbol(), player2.getSymbol());
        uiBoard[botPosition].children[0].classList.add("enter-animation");
        uiBoard[botPosition].children[0].textContent = player2.getSymbol();
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
    
    const clearBoard = (isFinish) => {
        moveCount = 0;
        isGameOver = false;
        player1.resetMoves();
        player2.resetMoves();
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
        if (player2.getName().toLowerCase() === "bot" && 
            player2.getSymbol().toLowerCase() === "x" && !isFinish) {
            
            console.log(player2.getName().toLowerCase());
            setInitialBotMove();
        
        }
    }

    return {
        setPlayersNames,
        setPlayersSymbols,
        getCurrentPlayer,
        getLastPlayer,
        getPlayers,
        addMove,
        setInitialBotMove,
        availablePositions,
        isPositionAvailable,
        getIsGameOver,
        clearBoard
    }

})();