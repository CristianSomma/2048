export default class Grid {
    constructor (grid) {
        // metodo che conterrà l'array bidimensionale che rappresenta la griglia html
        this.grid = grid;
    }

    updateHtmlGrid(){
        /* uso flat() per rendere l'array bidimensionale monodimensionale
         ed evitare di utilizzare due cicli per iterare nell'array principale e quello interno */
        this.grid.flat().forEach(Cell => {
            // Se la cella contiene una tessera, quindi non null, aggiorno la sua posizione nella griglia html
            if(Cell.element){
                Cell.element.style.gridArea = `${Cell.y + 1} / ${Cell.x + 1} / ${Cell.y + 2} / ${Cell.x + 2}`
            }
        });
    }

    // funzione che controlla se la cella nelle coordinate inserite è occupata o no
    isCellOccupied(x, y){
        console.log(this.grid[y][x])
        if(this.grid[y][x].element){
            return true;
        }else{
            return false;
        }
    }

    // ritorna un nuovo array contenente le celle occupate, filtrando l'array iniziale
    getOccupiedCells(){
        const occupiedCells = this.grid
        .flat()
        .filter(Cell => Cell.element !== null)
        return occupiedCells;
    }

    // funzione che ritorna una cella randomica
    getRandomCell(){
        let randomX, randomY;
        // effettua un ciclo che ritorna una nuova cella randomica fino a quando questa non è vuota
        do {
            randomX = Math.floor(Math.random() * 4);
            randomY = Math.floor(Math.random() * 4);
        } while (this.grid[randomY][randomX].element);
        
        return this.grid[randomY][randomX];
    }

    setCellElementAt(x, y, element){
        this.grid[y][x].element = element;
    }
}