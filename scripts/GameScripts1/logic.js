import Cell from "./Cell.js"
import Grid from "./Grid.js";

let grid;

document.addEventListener('DOMContentLoaded', () => {
    grid = new Grid(generateGrid());
    console.log(grid.gridArray);
    spawnNewTile()
    spawnNewTile()
})

function spawnNewTile(){
    // costante contenente una cella casuale vuota
    const randomCell = grid.getRandomCell();
    // crea un elemento html con numero casuale (2 o 4) e lo assegna alla proprietà #element tramite setter
    randomCell.htmlElement = createHtmlTile(randomNumber());    
}

function createHtmlTile(number) {
    const div = document.createElement('div');
    div.classList.add('tile');
    div.innerHTML = number;
    return div;
}

function randomNumber(){
    return (
        Math.random() < 0.65 ? 2 : 4
    )
}

function generateGrid() {
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
