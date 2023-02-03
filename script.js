const Player = (name, symbol) => {
    let isBot = false;
    if (name.toLowerCase() === "bot") isBot = true;
    return {name, symbol, isBot};
}

const gameBoard = (() => {

    let player1Name;
    let player2Name;
    let player1;
    let player2;
    let moveCount = 0;

    const setPlayersNames = (name1, name2) => { 
        player1Name = name1;
        player2Name = name2;
    };

    const setPlayers = (symbol1, symbol2) => {
        player1 = Player(player1Name, symbol1);
        player2 = Player(player2Name, symbol2);
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

        // check result
        // if move count is 9 => end game
    };

    return { setPlayersNames, setPlayers, isPositionAvailable, addMove };

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


for (let i = 0; i < uiBoard.length; i++) {
    let div = uiBoard[i];
    div.addEventListener("click", () => {
        const isEmpty = gameBoard.isPositionAvailable(i);
        if (isEmpty) {
            gameBoard.addMove(i, div);
        }
    });
    div.addEventListener("mouseenter", (e) => {
        const isEmpty = gameBoard.isPositionAvailable(i);
        if (isEmpty) {
            e.target.style.background = "#ededed";
            e.target.style.cursor = "pointer";
        }
    })
    div.addEventListener("mouseleave", (e) => {
        e.target.style.background = "#ffffff";
        e.target.style.cursor = "auto";
    })
}