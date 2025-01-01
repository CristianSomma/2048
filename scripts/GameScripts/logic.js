import Grid from "./Grid.js";
import { animateTile, canMerge, createHtmlElement, generateGrid, randomNumber, timer } from "./helpers.js";

let grid;
let points = 0; 

document.addEventListener('DOMContentLoaded', () => {
    grid = new Grid(generateGrid());
    console.log(grid.gridArray);
    spawnNewTile();
    spawnNewTile();
    timer(120);
});

function updatePoints(){
    document.getElementById('points-number').innerHTML = points;
}

function spawnNewTile(){
    // costante contenente una cella casuale vuota
    const randomCell = grid.getRandomCell();
    // if(!randomCell){
    //     console.log('error');
    //     return;
    // }
    // crea un elemento html con numero casuale (2 o 4) e lo assegna alla proprietà #element tramite setter
    randomCell.htmlElement = createHtmlElement(randomNumber());    
}

export function moveTiles(direction){
    // costante che ha valore true se è nella parte positiva dell'asse, quindi in basso o a destra
    const isToPositive = direction === 'down' || direction === 'right';
    // costante che ha valore true se l'asse di movimento è quello orizzontale
    const isAxisHorizontal = direction === 'left' || direction === 'right';

    // itero solamente per le celle occupate evitando di sprecare risorse
    let occupiedCells = grid.getOccupiedCells();

    // inverto l'ordine dell'array se la direzione è verso destra o verso il basso così che l'ordine delle celle viene mantenuto anche durante lo spostamento
    if(isToPositive){
        occupiedCells = occupiedCells.reverse();
    }
        
    occupiedCells.forEach(cellToMove => {
        // se la direzione del movimento è positiva allora la posizione target è tre altrimenti zero 
        let target = isToPositive ? 3 : 0;
        
        do {
            let targetedCell;

            // determinazione della cella di riferimento in cui la tessera dovrebbe spostarsi
            if(isAxisHorizontal){
                // se l'asse è orizzontale allora il target è la coordinata x
                targetedCell = grid.gridArray[cellToMove.y][target];
            }else{
                // se l'asse invece è verticale il target è la coordinata y
                targetedCell = grid.gridArray[target][cellToMove.x];
            }

            // se l'asse è orizzontale allora il target si compara alla coordinata x della cella, altrimenti con la coordinata y.
            if(isAxisHorizontal && target === cellToMove.x){
                // se la coordinata x di riferimento è uguale alla attuale coordinata x della tessera non viene spostata.
                break;
            }else if(!isAxisHorizontal && target === cellToMove.y){
                // se la coordinata y di riferimento è uguale alla attuale coordinata y della tessera non viene spostata.
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

            // nel caso in cui la cella di riferimento sia occupata ma ha lo stesso valore di quella da spostare
            if(targetedCell.tileValue === cellToMove.tileValue){
                // se la funzione canMerge() ritorna true allora viene effettuata la fusione tra le celle
                if(canMerge(grid, isToPositive, isAxisHorizontal, cellToMove, targetedCell)){
                    // la cella di riferimento duplica il suo valore
                    targetedCell.tileValue *= 2;                    
                    // aggiungo il valore della cella risultate al punteggio
                    points += targetedCell.tileValue;
                    // aggiorno il DOM del nuovo punteggio
                    updatePoints();
                    // la cella da spostare viene eliminata dal DOM simulando il merging tra le due
                    cellToMove.removeHtmlElement();
                    break;
                };        
            }

            // nel caso in cui la cella di riferimento era occupata allora riduco di 1 la coordinata di riferimento o la aumento di uno in base alla direzione
            target += isToPositive ? -1 : 1;
            
        } while ((target >= 0 && target <= 3));
    });

    // aggiorno la griglia html
    grid.updateHtmlGrid();
    // se viene eseguito un movimento significa che è stato terminato un round e quindi compare una nuova tessera
    spawnNewTile();    

}

