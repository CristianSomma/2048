document.addEventListener('DOMContentLoaded', () => {
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
    let gameboardSizes, gridGaps, cellSizes, roundBtnSizes;

    // eseguo delle proporzioni per ricavare le dimensioni ottimali in base alla dimensione dello schermo di...
    // tabella di gioco (larghezza e altezza)
    gameboardSizes = Math.ceil((screenWidth * 88.7) / 100);
    // gap tra le celle e bordo della tabella
    gridGaps = Math.ceil(gameboardSizes / 100);
    // celle (larghezza e altezza)
    cellSizes = (gameboardSizes - (gridGaps*5)) / 4;
    // diametro dei pulsanti di bonus
    roundBtnSizes = (screenWidth * 16.4) / 100;

    // nel caso in cui la larghezza dello schermo è maggiore di 600px allora le variabili assumono dimensioni fisse
    if(screenWidth > 600){
        gameboardSizes = 450;
        gridGaps = 4;
        cellSizes = 107.5;
        roundBtnSizes = 85;
        // se la larghezza dello schermo è maggiore di 850px esegue la riconfigurazione del layout
        if(screenWidth > 850){
            layoutReconfiguration();
        }
    }
    
    // poi con setProperty assegno alle variabili css il valore in px calcolato
    document.documentElement.style.setProperty('--gameboardSize', `${gameboardSizes}px`);
    document.documentElement.style.setProperty('--gridGaps', `${gridGaps}px`);
    document.documentElement.style.setProperty('--cellSizes', `${cellSizes}px`);
    document.documentElement.style.setProperty('--roundBtnSizes', `${roundBtnSizes}px`);
}

function layoutReconfiguration(){
    // salvo in costanti tutte le sezioni del file html da spostare
    const pointsBox = document.getElementById('points-box');
    const timerBox = document.getElementById('timer-box');
    const gameboardSection = document.getElementById('gameboard-section');
    // rimuovo le parti che devono essere riposizionate
    document.getElementById('stats-section').remove();
    document.getElementById('gameboard-section').remove()
    // tramite le media queries la flex-direction di main cambia e quindi decidendo quale elemento appendere prima al main cambio la configuarazione di layout
    document.querySelector('main').appendChild(pointsBox);
    document.querySelector('main').appendChild(gameboardSection);
    document.querySelector('main').appendChild(timerBox);
}