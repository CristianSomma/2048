import Cell from "./Cell.js";
import { moveTiles } from "./logic.js";

// funzione per creare l'elemento html della tessera
export function createHtmlElement(number) {
    // creazione degli elementi html
    const div = document.createElement('div');
    const img = document.createElement('img');
    // assegnazione delle classi per gli stili
    div.classList.add('tile');
    img.classList.add('icon-img');
    // assegnazione all'attributo source del percorso dell'immagine da mostrare 
    img.src = `../assets/icons/tilesIcons/${number}.png`;
    // inserisco nell'elemento div l'elemento html img
    div.appendChild(img);
    // ritorno l'elemento html
    return div;
}

export function randomNumber(){
    // ritorno un valore randomico che sia 2 (75% di probabilità) o 4
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
            gridRow.push(new Cell(x, y, null, null));
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

export function canMerge(grid, isToPositive, isAxisHorizontal, cellToMove, targetedCell) {
    // se il movimento è orizzontale allora viene salvata la riga altrimenti la colonna in cui si trovano le celle target e da muovere
    const cellsLineArray = isAxisHorizontal 
        ? grid.getGridRow(cellToMove.y) 
        : grid.getGridColumn(cellToMove.x);

    // salvo nelle costanti gli indici della cella destinataria (target) e della cella da muovere
    const targetIndex = cellsLineArray.indexOf(targetedCell);
    const moveIndex = cellsLineArray.indexOf(cellToMove);

    // prendo la riga o colonna e salvo un nuovo array contenente le celle tra quella di destinazione e quella da muovere
    const cellsBetween = isToPositive
        ? cellsLineArray.slice(moveIndex + 1, targetIndex)
        : cellsLineArray.slice(targetIndex + 1, moveIndex);


    // uso il metodo some per controllare se delle celle soddisfano una condizione, ovvero quella di essere occupata, se ce n'é almeno una occupata ritorna true
    const hasObstacle = cellsBetween.some(cell => cell.htmlElement);

    // Ritorna false se ci sono ostacoli altrimenti true
    return !hasObstacle;
}

export function isDisabled(btnId){
    return document.getElementById(btnId).disabled;
}

export function reset(){
    // ricaricamento della pagina html
    document.location.reload();
}

function popUp(titleText, message){
    // div contenitore
    const container = document.createElement('div');
    container.classList.add('overlay');
    
    // div contenente tutti i componenti
    const innerContainer = document.createElement('div');
    innerContainer.classList.add('message-alert');
    
    // creo l'elemento h2, titolo del messaggio
    const title = document.createElement('h2');
    title.textContent = titleText;
    
    // creo elemento html p con relativo testo passato come parametro della funzione
    const text = document.createElement('p');
    text.textContent = message;
    
    // creo l'elemento html button
    const btn = document.createElement('button');
    // testo del bottone
    btn.textContent = 'Play Again';
    // aggiungo delle classi di stile del bottone
    btn.classList.add('btn');
    btn.classList.add('primary');
    // aggiungo l'id per ulteriori stili specifici 
    btn.id = 'game-over-btn';
    // al click del bottone play again ricarico la pagina perdendo i progressi
    btn.onclick = () => {reset()};
    
    innerContainer.appendChild(title);
    innerContainer.appendChild(text);
    innerContainer.appendChild(btn);
    container.appendChild(innerContainer);

    document.body.appendChild(container);    
}

export function gameOver(message){
    // chiama la funzione popUp e passa come titolo Game Over e il messaggio parametrato
    popUp('Game Over!', message);
}

export function victory(message){
    // chiama la funzione popUp e passa come titolo Victory con il messaggio preso in input
    popUp('Victory!', message);
}