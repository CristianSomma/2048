import Grid from "./Grid.js";
import { createHtmlElement, generateGrid, randomNumber } from "./helpers.js";

let grid;

document.addEventListener('DOMContentLoaded', () => {
    grid = new Grid(generateGrid());
    console.log(grid.gridArray);
    spawnNewTile();
    spawnNewTile();
});

function spawnNewTile(){
    // costante contenente una cella casuale vuota
    const randomCell = grid.getRandomCell();
    // crea un elemento html con numero casuale (2 o 4) e lo assegna alla proprietà #element tramite setter
    randomCell.htmlElement = createHtmlElement(randomNumber());    
}

export function moveTilesHorizontally(isToRight) {
    // itero solamente per le celle occupate evitando di sprecare risorse
    let occupiedCells = grid.getOccupiedCells();

    // inverto l'ordine dell'array se la direzione è verso destra così che l'ordine delle celle viene mantenuto anche durante lo spostamento
    occupiedCells = isToRight ? occupiedCells.reverse() : occupiedCells;
    
    occupiedCells.forEach(cellToMove => {
        // se la direzione è verso destra allora la coordinata x di riferimento (in cui deve spostarsi la tessera) è 3 (estremo destra), viceversa per sinistra.
        let targetX = isToRight ? 3 : 0;

        do {
            // cella di riferimento in cui la tessera dovrebbe spostarsi
            const targetedCell = grid.gridArray[cellToMove.y][targetX]; // Calcola la cella target ad ogni iterazione
            // se la coordinata x di riferimento è uguale alla attuale coordinata della tessera non viene spostata 
            if (targetX === cellToMove.x) {
                break;
            }

            // se la cella di riferimento non è già occupata
            if (!targetedCell.htmlElement) {
                // l'elemento html della cella di riferimento da null assume l'elemento html della tessera da spostare
                targetedCell.htmlElement = cellToMove.htmlElement;
                // la cella di partenza viene resettata
                cellToMove.resetCell();
                break;
            }

            // nel caso in cui la cella di riferimento era occupata allora riduco di 1 la coordinata di riferimento o la aumento di uno in base alla direzione
            targetX += isToRight ? -1 : 1;

        } while (targetX >= 0 && targetX <= 3);
    });

    // aggiorno la griglia html
    grid.updateHtmlGrid();

    // se viene eseguito un movimento significa che è stato terminato un round e quindi compare una nuova tessera
    spawnNewTile();
}

export function moveTilesVertically(isToDown) {
    // itero solamente per le celle occupate evitando di sprecare risorse
    let occupiedCells = grid.getOccupiedCells();

    // inverto l'ordine dell'array se la direzione è verso il basso così che l'ordine delle celle viene mantenuto anche durante lo spostamento
    occupiedCells = isToDown ? occupiedCells.reverse() : occupiedCells;
    
    occupiedCells.forEach(cellToMove => {
        // se la direzione è verso il basso allora la coordinata y di riferimento (in cui deve spostarsi la tessera) è 3 (estremo in basso), viceversa per sopra.
        let targetY = isToDown ? 3 : 0;

        do {
            // cella di riferimento in cui la tessera dovrebbe spostarsi
            const targetedCell = grid.gridArray[targetY][cellToMove.x]; // Calcola la cella target ad ogni iterazione
            // se la coordinata y di riferimento è uguale alla attuale coordinata della tessera non viene spostata 
            if (targetY === cellToMove.y) {
                break;
            }

            // se la cella di riferimento non è già occupata
            if (!targetedCell.htmlElement) {
                // l'elemento html della cella di riferimento da null assume l'elemento html della tessera da spostare
                targetedCell.htmlElement = cellToMove.htmlElement;
                // la cella di partenza viene resettata
                cellToMove.resetCell();
                break;
            }

            // nel caso in cui la cella di riferimento era occupata allora riduco di 1 la coordinata di riferimento o la aumento di uno in base alla direzione
            targetY += isToDown ? -1 : 1;

        } while (targetY >= 0 && targetY <= 3);
    });

    // aggiorno la griglia html
    grid.updateHtmlGrid();

    // se viene eseguito un movimento significa che è stato terminato un round e quindi compare una nuova tessera
    spawnNewTile();
}
