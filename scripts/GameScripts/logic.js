import Cell from "./Cell.js";
import Grid from "./Grid.js";

let grid;

document.addEventListener('DOMContentLoaded', () => {
    /* Creo un'istanza dell'oggetto griglia e gli assegno come
    proprietà di grid un array bidimensionale che rappresenta la griglia html*/
    grid = new Grid(generateGrid());
    // genero due tessere iniziali
    spawnNewTile();
    spawnNewTile();
    console.log('griglia iniziale', grid);
    moveTilesH(false);
});

function moveTilesH(toRight) {
    // salvo un array con tutte le celle occupate
    const cellsToMove = grid.getOccupiedCells();

    cellsToMove.forEach(cell => {
        // se la direzione è destra allora il target iniziale in cui la cella deve finire è 3 (estremo a destra) 
        // stessa cosa per la direzione sinistra
        let targetX = toRight ? 3 : 0;

        do {
            // se la cella si trova già nella posizione in cui deve andare viene interrotto subito il ciclo
            if(cell.x == targetX){
                break;
                // se la cella sulla stessa riga e all'estremo determinato non è occupata assume il valore della cella da spostare
            }else if (!grid.isCellOccupied(targetX, cell.y)) {
                grid.grid[cell.y][targetX].cellElement = cell.cellElement;
                // la cella in cui si trovava quella da muovere viene aggiornata
                cell.cellElement = null;
                // si esce dal ciclo con il break
                break;
            }
            // nel caso in cui la cella è occupata allora in base alla direzione si modifica il target orizzontale
            if(toRight){
                targetX--;
            }else{
                targetX++;
            }

            
        } while ((targetX >= 0 && targetX <= 3) && targetX !== cell.x);
        console.log(grid)
    });
}

function spawnNewTile() {
    // uso il metodo di grid per ottenere una cella randomica vuota 
    let gridCell = grid.getRandomCell();
    // assegno al metodo di quella Cell un elemento html con numero scelto randomicamente
    gridCell.cellElement = createHtmlTile(randomTileNumber());
}

function createHtmlTile(number) {
    const div = document.createElement('div');
    div.classList.add('tile');
    div.innerHTML = number;
    return div;
}

function randomTileNumber() {
    // 65% di probabilità che esca 2 e 35% che esca 4
    return Math.random() < 0.65 ? 2 : 4;
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
