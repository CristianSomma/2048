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
        const freeCells = this.#grid.flat().filter(cell => cell.htmlElement == null)
        
        return (
            freeCells[Math.floor(Math.random() * freeCells.length)]
        );
    }

}