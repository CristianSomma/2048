export default class Grid {
    #grid

    constructor (grid) {
        this.#grid = grid;
    }
    
    set gridArray(newArray){
        this.#grid = newArray;
    }

    get gridArray(){
        return this.#grid;
    }

    getRandomCell(){
        // array contenente solamente celle vuote
        const freeCells = this.#grid.flat().filter(cell => cell.htmlElement == null)

        if(freeCells.length > 0){
            // se l'array ha lunghezza maggiore di zero ritorna una cella randomica nell'array
            return (
                freeCells[Math.floor(Math.random() * freeCells.length)]
            );
        }else{
            // se l'array ha lunghezza zero e quindi tutte le celle sono occupate ritorna false
            return false;
        }
    }

    // funzione che ritorna un array con solo le celle occupate filtrando l'intera griglia
    getOccupiedCells(){
        const occupiedCells = this.#grid.flat().filter(cell => cell && cell.htmlElement);
        return occupiedCells;
    }

    getGridRow(number){
        return this.#grid[number];
    }

    getGridColumn(number){
        const gridColumn = []; 
        this.#grid.forEach(row => {
            gridColumn.push(row[number]);
        });
        return gridColumn;
    }

    updateHtmlGrid(){
        // le celle da aggiornare nel DOM sono quelle occupate e perciò filtro la griglia in un array con sole celle piene
        const cellsToRender = this.getOccupiedCells();
        cellsToRender.forEach(cell => {
            // ogni cella occupata viene renderizzata
            cell.updateHtmlElement();
        });
    }
}