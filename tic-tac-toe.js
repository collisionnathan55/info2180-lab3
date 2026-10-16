// main methods

var TURN_NOW = 0;
var TURN_ORDER = ["X", "O"];

function changeCell(cell, alignment) {
    if (alignment == -1) {
        cell.classList.remove("X");
        cell.classList.remove("O");
    }

    if (alignment >= 0) {
        
        for (var cls of cell.classList) {
            for (var turn of TURN_ORDER) {
                if (cls == turn) {
                    alert("This square has been played in!");
                    return;
                }
            }
        }

        cell.classList.add(TURN_ORDER[alignment]);
        cell.textContent = TURN_ORDER[alignment];
    }
}

// event hooks

function newgame_onclick() {
    TURN_NOW = 0
    TURN_ORDER = ["X", "O"]

    document.querySelectorAll("#board > div").forEach((cell) => {
        changeCell(cell, -1)
    });
}

function cell_onclick(event) {
    changeCell(event.currentTarget, TURN_NOW % TURN_ORDER.length);
    TURN_NOW++;
}

// start on load

function onPageLoad(event) {
    // main function

    document.querySelectorAll("#board > div").forEach((cell) => {
        cell.classList.add("square");
        cell.addEventListener("click", (event) => cell_onclick(event));
    });

}
document.addEventListener("DOMContentLoaded", (event) => onPageLoad(event));