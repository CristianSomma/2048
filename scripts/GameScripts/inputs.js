import { checkMovementDirection } from "./helpers.js";
import { moveTiles, orderTiles } from "./logic.js"

let startCoordinateX, startCoordinateY;

document.addEventListener('touchstart', evt => {
    startCoordinateX = evt.touches[0].pageX;
    startCoordinateY = evt.touches[0].pageY;
})

document.addEventListener('touchend', evt => {
    const deltaX = evt.changedTouches[0].pageX - startCoordinateX;
    const deltaY = evt.changedTouches[0].pageY - startCoordinateY;

    checkMovementDirection(deltaX, deltaY);
})

document.addEventListener('mousedown', evt => {
    startCoordinateX = evt.pageX;
    startCoordinateY = evt.pageY;
})

document.addEventListener('mouseup', evt => {
    const deltaX = evt.pageX - startCoordinateX;
    const deltaY = evt.pageY - startCoordinateY;

    checkMovementDirection(deltaX, deltaY);
})

document.addEventListener('keydown', evt => {
    switch(evt.key){
        
        case 'ArrowUp':
        case 'w':
            moveTiles('up');
        break;
        
        case 'ArrowLeft':
        case 'a':
            moveTiles('left');
        break;

        case 'ArrowRight':
        case 'd':
            moveTiles('right');
        break;

        case 'ArrowDown':
        case 's':
            moveTiles('down');
        break;
    }
})

document.getElementById('bonus-1').onclick = () => {
    orderTiles();
    document.getElementById('bonus-1').disabled = true;
}

