import Cell from "./Cell.js";

export function createHtmlElement(number) {
    const div = document.createElement('div');
    div.classList.add('tile');
    div.innerHTML = number;
    return div;
}

export function randomNumber(){
    return (
        Math.random() < 0.65 ? 2 : 4
    )
}

export function generateGrid() {
    const grid = [];
    // genero una griglia bidimensionale con 4 array monodimensionali con ciascuno 4 elementi
    for (let y = 0; y < 4; y++) {
        const gridRow = [];
        for (let x = 0; x < 4; x++) {
            // inserisco un'istanza dell'oggetto cell, con le coordinate rispettive e l'elemento html con valore null
            gridRow.push(new Cell(x, y, null));
        }
        grid.push(gridRow);
    }

    return grid;
}
