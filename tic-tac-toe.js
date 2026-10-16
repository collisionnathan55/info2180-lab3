// main methods



// event hooks

// start on load

function onPageLoad(event) {
    // main function

    document.querySelectorAll("#board > div").forEach((cell) => {
        cell.classList.add("square")
    });

}
document.addEventListener("DOMContentLoaded", (event) => onPageLoad(event));