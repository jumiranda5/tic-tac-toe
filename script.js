const Player = () => {

}

const gameBoard = (() => {

    const board = [
        "", "", "", 
        "", "", "", 
        "", "", ""
    ];

    const addMovement = (symbol, position) => {};

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
});

btnBot.addEventListener("click", () => {
    console.log("Play against bot");
    settingsVs.classList.add("hidden");
    settingsSymbol.classList.remove("hidden");
});

btnX.addEventListener("click", () => {
    console.log("Player 1 is X");
    settingsSymbol.classList.add("hidden");
    boardContainer.classList.remove("hidden");
});

btnO.addEventListener("click", () => {
    console.log("Player 1 is O");
    settingsSymbol.classList.add("hidden");
    boardContainer.classList.remove("hidden");
});