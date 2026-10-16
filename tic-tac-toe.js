// main methods

var TURN_NOW = 0;
var TURN_ORDER = ["X", "O"];

var CELLS = []
var GAME_WON = false;

function changeCell(cell, alignment) {
    cell.classList.remove("X");
    cell.classList.remove("O");
    cell.textContent = "";

    if (alignment >= 0) {
        cell.classList.add(TURN_ORDER[alignment]);
        cell.textContent = TURN_ORDER[alignment];
    }
}

function checkWin(letter) {
    if (CELLS.length < 9) {
        return false;
    }

    for (let i = 0; i < 3; i++) {
        if ([i, i + 3, i + 6].filter((c) => CELLS[c].textContent == letter).length == 3) {
            return true;
        }
        if ([3*i, 3*i + 1, 3*i + 2].filter((c) => CELLS[c].textContent == letter).length == 3) {
            return true;
        }
    }

    if ([2, 4, 6].filter((c) => CELLS[c].textContent == letter).length == 3) {
        return true;
    }

    if ([0, 4, 8].filter((c) => CELLS[c].textContent == letter).length == 3) {
        return true;
    }

    return false;
}

function endGame(winner, turns) {
    statusDiv = document.getElementById("status");
    statusDiv.textContent = "Congratulations! " + winner + " is the Winner!";
    statusDiv.classList.add("you-won");

    GAME_WON = true;
}

// event hooks

function newgame_onclick() {
    TURN_NOW = 0
    TURN_ORDER = ["X", "O"]
    changeCell(...CELLS, -1)

    statusDiv = document.getElementById("status");
    statusDiv.textContent = "";
    statusDiv.classList.remove("you-won")

    GAME_WON = false;
}

function cell_onclick(event) {
    if (GAME_WON) {
        return;
    }

    for (var cls of event.currentTarget.classList) {
        for (var turn of TURN_ORDER) {
            if (cls == turn) {
                alert("This square has been played in!");
                return;
            }
        }
    }

    changeCell(event.currentTarget, TURN_NOW % TURN_ORDER.length)
    if (checkWin(event.currentTarget.textContent)) {
        endGame(event.currentTarget.textContent, TURN_NOW);
    }

    TURN_NOW++;
}
function cell_focus(event) {
    event.currentTarget.classList.add("hover")
}
function cell_unfocus(event) {
    event.currentTarget.classList.remove("hover")
}

// start on load

function onPageLoad(event) {
    // main function

    document.querySelectorAll("#board > div").forEach((cell) => {
        cell.classList.add("square");
        cell.addEventListener("click", (event) => cell_onclick(event));
        cell.addEventListener("mouseover", (event) => cell_focus(event));
        cell.addEventListener("mouseout", (event) => cell_unfocus(event));

        if (!CELLS.includes(cell)) {
            CELLS.push(cell);
        }
    });

}
document.addEventListener("DOMContentLoaded", (event) => onPageLoad(event));