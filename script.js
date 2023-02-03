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

    const setPlayersNames = (name1, name2) => { 
        player1Name = name1;
        player2Name = name2;
    };

    const setPlayers = (symbol1, symbol2) => {
        player1 = Player(player1Name, symbol1);
        player2 = Player(player2Name, symbol2);
        console.log(player1);
        console.log(player2);
    };

    const board = [
        "", "", "", 
        "", "", "", 
        "", "", ""
    ];

    const addMove = (symbol, position) => {};

    return { setPlayersNames, setPlayers }

})();


// UI

const settingsVs = document.getElementById("settings-vs");
const settingsSymbol = document.getElementById("settings-symbol");
const boardContainer = document.getElementById("board-container");
const btnPlayer2 = document.getElementById("btn-player2");
const btnBot = document.getElementById("btn-bot");
const btnX = document.getElementById("btn-x");
const btnO = document.getElementById("btn-o");

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
    gameBoard.setPlayers("x", "o");
});

btnO.addEventListener("click", () => {
    console.log("Player 1 is O");
    settingsSymbol.classList.add("hidden");
    boardContainer.classList.remove("hidden");
    gameBoard.setPlayers("o", "x");
});