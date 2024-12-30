export default class Cell {
    #element
    #content

    constructor (x, y, htmlElement) {
        // coordinate della cella
        this.x = x;
        this.y = y;
        // elemento html contenuto dalla cella
        this.#element = htmlElement;
        // numero della tessera
        this.#content = this.#element ? this.#element.innerHTML : null;
    }

    // setter dell'elemento html
    set htmlElement(newValue){
        // cambia il valore dell'elemento html al nuovo valore
        this.#element = newValue;
        // sincronizza il numero della tessra al valore nell'elemento html
        this.#content = parseInt(this.#element.innerHTML);
        // aggiorna il DOM
        this.updateHtmlElement();
    }

    // getter dell'elemento html
    get htmlElement(){
        // ritorna l'elemento html appartenente alla cella
        return this.#element;
    }

    // setter del valore della tessera
    set tileValue(newValue){
        // cambia il valore della tessera nel nuovo valore
        this.#content = newValue;
        // sincronizza il contenuto dell'elemento html al nuovo valore
        this.#element.innerHTML = this.#content;
        // aggiorna il DOM
        this.updateHtmlElement();
    }

    // getter del valore contenuto nella tessera
    get tileValue(){
        // ritorna il numero della tessera
        return this.#content;
    }


    removeHtmlElement(){
        //rimuove dal DOM l'elemento html con la funzione remove() 
        this.#element.remove();
        // sincronizzo al DOM le proprietà della cella assegnando null
        this.#element = null;
        this.#content = null;
    }

    updateHtmlElement(){
        // determino la posizione della tessera con il comando CSS grid-area
        this.#element.style.gridArea = `${this.y+1} / ${this.x+1} / ${this.y+2} / ${this.x+2}`
        // inserisco nella griglia (#tiles-grid) l'elemento html della cella
        document.getElementById('tiles-grid').appendChild(this.#element);
    }
}