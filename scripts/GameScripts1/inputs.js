import { moveTilesHorizontally, moveTilesVertically } from "./logic.js"

let startCoordinateX, startCoordinateY;

document.addEventListener('touchstart', evt => {
    startCoordinateX = evt.touches[0].pageX;
    startCoordinateY = evt.touches[0].pageY;
})

document.addEventListener('touchend', evt => {
    const deltaX = evt.changedTouches[0].pageX - startCoordinateX;
    const deltaY = evt.changedTouches[0].pageY - startCoordinateY;

    // se la distanza tra l'inizio del tocco e la fine è maggiore di 50px in almeno una direzione viene considerato come tocco intenzionale
    if(Math.abs(deltaX) > 50 || Math.abs(deltaY) > 50){
        if(Math.abs(deltaX) > Math.abs(deltaY)){
            // se il movimento orizzontale è prevalente ed è positivo allora la direzione è verso destra
            if(deltaX > 0){
                moveTilesHorizontally(true);
            }else{
                // se invece è negativo significa che la direzione dello swipe è sinistra
                moveTilesHorizontally(false);
            }
        }else{
            // se prevale la direzione verticale e lo swipe è maggiore di zero significa che è verso il basso
            if(deltaY > 0){
                moveTilesVertically(true);
            }else{
                // se invece il delta è negativo significa che lo swipe è negativo
                moveTilesVertically(false);
            }
        }
    }
})