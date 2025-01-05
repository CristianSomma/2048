import Cell from "./Cell.js";
import Grid from "./Grid.js";
import { canMerge, createHtmlElement, generateGrid, randomNumber, timer } from "./helpers.js";

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

    // salvo nella costante un numero randomico, 2 o 4.  
    const randomNum = randomNumber();
    // chiamo un metodo della cella appositamente creata per aggiornare l'elemento html senza usare il setter che non permette due parametri
    // aggiorno l'elemento html e aggiungo la classe .newTile per effettuare l'animazione di spawn 
    randomCell.setHtmlAndClass(createHtmlElement(randomNum), 'newTile');
    // set del valore numerico della cella a randomNum
    randomCell.tileValue = randomNum;
    // aggiorno il DOM manualmente poiché setHtmlAndCss non lo fa.
    randomCell.updateHtmlElement();
    // dopo 300ms viene rimossa la classe che esegue l'animazione così che non venga più effettuata
    setTimeout(() => {
        if(randomCell.htmlElement){
            randomCell.htmlElement.classList.remove('newTile')
        }
    }, 300);
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
                targetedCell.tileValue = cellToMove.tileValue;
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

// bonus 3
export function deleteSmallTiles(){
    // uso il metodo dell'oggetto Grid per ottenere un array piatto di sole celle occupate
    const smallTilesArray = grid
    .getOccupiedCells()
    // tengo nell'array solo le celle di valore 2 o 4 filtrandolo
    .filter(cell => cell.tileValue === 2 || cell.tileValue === 4)
    // con il metodo map() eseguo una stessa funzione su ogni elemento dell'array, ovvero tramite il metodo dell'oggetto Cell rimuovo cancello completamente dal DOM gli elementi html 
    .map(cell => cell.removeHtmlElement());
}

export function generate1024Tile(){
    const occupiedCells = grid.getOccupiedCells()

    occupiedCells[Math.floor(Math.random() * occupiedCells.length)].tileValue = 1024;
}

// bonus 1
export function orderTiles(){
    // creo un array che conterrà le celle occupate in ordine di valore
    const cellsValue = grid
    // uso il metodo della griglia per ottenere un array piatto di celle occupate
    .getOccupiedCells()
    // prendo il valore di ogni cella e lo sottraggo ad un'altro, in base al risultato viene ordinato l'array in ordine decrescente 
    .sort((a, b) => {
        return b.tileValue - a.tileValue
    });

    // sovrascrivo l'array bidimensionale iniziale con uno nuovo e vuoto
    grid.gridArray = generateGrid();

    /*
        PERCHE' LA GRIGLIA VIENE SVUOTATA?
        Svuotando la griglia evito che l'array contenente le celle da riordinare venga "corrotto".
        Questo succede perché l'array contiene sì le celle, ma queste però mantengono un riferimento e possono
        quindi cambiare valore se le proprietà vengono ridefinite al dì fuori dell'array.
        Perciò se le celle di riferimento, quelle in alto a sinistra, che verranno poi occupate per la riordinazione
        contengono già qualcosa questo viene sovrascritto e perso nel processo.
        Per evitare ciò svuoto completamente la griglia e riposiziono le tessere da ordinare, così che nessuna sovrascrizione venga effettuata.
    */

    let i = 0;
    for(let y=0; y<4; y++){
        for(let x=0; x<4; x++){
            // cella di riferimento da occupare
            const targetedCell = grid.gridArray[y][x]; 
            // se i, l'iteratore dell'array cellsValue è minore della lunghezza dell'array...
            if(i < cellsValue.length){
                // la cella di riferimento assume il valore della cella da riordinare
                targetedCell.htmlElement = cellsValue[i].htmlElement;
                targetedCell.tileValue = cellsValue[i].tileValue;
                // incremento il contatore
                i++;
            }else {
                // se l'iteratore ha superato la lunghezza dell'array quelle celle vengono resettate
                targetedCell.resetCell();
            }
            
        }
    }

    // la griglia viene sincronizzata nel DOM per sicurezza
    grid.updateHtmlGrid();
}
