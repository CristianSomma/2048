document.addEventListener('DOMContentLoaded', () => {
    // console.log(window.innerWidth);
    // console.log(window.innerHeight);

    gameboardSizes(window.innerWidth, window.innerHeight)
    setGridPosition();
});

function setGridPosition(){
    // uso getBoundingClientRect() per ottenere i valori delle posizioni dell'elemento html per poi far combaciare quello sopra ad esso
    const gameboardRect = document.querySelector('.gameboard').getBoundingClientRect();
    const gameboardToPosition = document.getElementById('gameboard-tp');

    // assegno a top e left i valori della gameboard sottostante
    gameboardToPosition.style.top = `${gameboardRect.top}px`;   
    gameboardToPosition.style.left = `${gameboardRect.left}px`;    
}

function gameboardSizes(screenWidth, screenHeight){
    if(screenWidth > 1000){
        console.log('desktop');
        return;
    }

    // eseguo delle proporzioni per ricavare le dimensioni ottimali in base alla dimensione dello schermo di...
    // tabella di gioco (larghezza e altezza)
    const gameboardSizes = Math.ceil((screenWidth * 88.7) / 100);
    // gap tra le celle e bordo della tabella
    const gridGaps = Math.ceil(gameboardSizes / 100);
    // celle (larghezza e altezza)
    const cellSizes = (gameboardSizes - (gridGaps*5)) / 4;

    // poi con setProperty assegno alle variabili css il valore in px calcolato
    document.documentElement.style.setProperty('--gameboardSize', `${gameboardSizes}px`);
    document.documentElement.style.setProperty('--gridGaps', `${gridGaps}px`);
    document.documentElement.style.setProperty('--cellSizes', `${cellSizes}px`);
}