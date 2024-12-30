export default class Cell {
    constructor (x, y, htmlElement) {
        this.x = x;
        this.y = y;
        this.element = htmlElement; 
    }

    set cellElement(newValue){
        this.element = newValue;
        // Quando newValue non è null effettua il rendering della cella
        if(newValue){
            this.renderHtmlElement();
        }
    }

    get cellElement(){
        return this.element;
    }

    removeCellElement(){
        this.element.remove();
    }

    renderHtmlElement(){
        document.getElementById('tiles-grid').appendChild(this.cellElement);
        this.cellElement.style.gridArea = `${this.y+1} / ${this.x+1} / ${this.y+2} / ${this.x+2}`        
    }
}