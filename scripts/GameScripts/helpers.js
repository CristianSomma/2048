import Cell from "./Cell.js";
import { moveTiles } from "./logic.js";

export function timer(timerLenght){
    // calcolo dei minuti
    let minutesLeft = Math.floor(timerLenght / 60);
    // calcolo dei secondi
    let secondsLeft = timerLenght - (minutesLeft * 60);

    let interval = setInterval(() => {
        let minutes = minutesLeft;
        let seconds = secondsLeft;
        
        // se i minuti e i secondi sono entrambi zero
        if(minutesLeft === 0 && secondsLeft === 0){
            console.log('end');
            // ferma l'esecuzione del setInterval
            clearInterval(interval);
            // ritorna la funzione
            return;
        }

        // se i secondi sono zero e i minuti no...
        if(secondsLeft === 0 && minutesLeft>0){
            // si toglie un minuto e si resetta i secondi a 59
            minutesLeft--;
            secondsLeft = 59;
        }else{
            // altrimenti avviene la normale esecuzione con la riduzione di un secondo alla volta
            secondsLeft--;
        }

        // se i secondi o i minuti sono meno di 10, quindi a singola cifra per estetica si aggiunge uno zero di fronte
        if(secondsLeft<10){
            seconds = `0${secondsLeft}`;
        }

        if(minutesLeft<10){
            minutes = `0${minutesLeft}`; 
        }

        // interpolazione e "rendering"
        document.getElementById('timer-number').innerHTML = `${minutes}:${seconds}`
    }, 1000)
}

export function createHtmlElement(number) {
    const div = document.createElement('div');
    div.classList.add('tile');
    div.innerHTML = number;
    return div;
}

export function randomNumber(){
    return (
        Math.random() < 0.75 ? 2 : 4
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

export function checkMovementDirection(deltaX, deltaY){
    // se la distanza tra l'inizio del tocco e la fine è maggiore di 50px in almeno una direzione viene considerato come tocco intenzionale
    if(Math.abs(deltaX) > 50 || Math.abs(deltaY) > 50){
        if(Math.abs(deltaX) > Math.abs(deltaY)){
            // se il movimento orizzontale è prevalente ed è positivo allora la direzione è verso destra
            if(deltaX > 0){
                moveTiles('right');
            }else{
                // se invece è negativo significa che la direzione dello swipe è sinistra
                moveTiles('left');
            }
        }else{
            // se prevale la direzione verticale e lo swipe è maggiore di zero significa che è verso il basso
            if(deltaY > 0){
                moveTiles('down');
            }else{
                // se invece il delta è negativo significa che lo swipe è negativo
                moveTiles('up');
            }
        }
    }
}

export function animateTile(cellToMove, targetedCell) {
    // Trovo la cella di destinazione
    let cellToReach = [...document.querySelectorAll('.grid-cell')].find(
        cell =>
            parseInt(cell.dataset.x) === targetedCell.x &&
            parseInt(cell.dataset.y) === targetedCell.y
    );

    const isHorizontal = cellToMove.y === targetedCell.y ? true : false;
    const gridRect = document.querySelector('.grid').getBoundingClientRect();
    const cellToReachRect = cellToReach.getBoundingClientRect();

    cellToMove.htmlElement.style.position = 'absolute';
    cellToMove.htmlElement.style.transition = 'top 3s ease-in-out, left 0.3s ease-in-out';

    if(isHorizontal){
        const deltaLeft = cellToReachRect.left - gridRect.left;
        cellToMove.htmlElement.style.left = `${deltaLeft}px`;
    }else{
        const deltaTop = cellToReachRect.top - gridRect.top;
        cellToMove.htmlElement.style.top = `${deltaTop}px`;
    }

    cellToMove.htmlElement.addEventListener('transitionend', () => {
        cellToMove.htmlElement.style.transition = ''; // Rimuove la transizione
        cellToMove.htmlElement.style.position = 'relative';
        cellToMove.htmlElement.style.top = '';
        cellToMove.htmlElement.style.left = '';
    }, { once: true }); // L'evento si attiva solo una volta
}
