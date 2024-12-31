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
        // se l'elemento html già esisteva e deve essere sovrascritto
        if(this.#element){
            // l'elemento precedente viene cancellato per evitare la presenza di due div sovrapposti
            this.removeHtmlElement();
        }
        
        if(newValue == null){
            throw new Error("To set the html element to null use the Cell.resetCell().")
        }
        // cambia il valore dell'elemento html al nuovo valore
        this.#element = newValue;
        // sincronizza il numero della tessera al valore nell'elemento html
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
        // Può essere assegnato un valore a #content solamente se esiste un elemento html
        if(!this.#element){
            // se non c'é un elemento html ritorno un errore nella console
            throw new Error("The html element of the Cell doesn't exist therefore no value can be assigned to tileValue.")
        }
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
        this.resetCell();
    }

    resetCell(){
        // reset delle proprietà a null, ovvero vuoto
        this.#element = null;
        this.#content = null;
    }

    updateHtmlElement(){
        // inserisco nella griglia (#tiles-grid) l'elemento html della cella
        document.getElementById('tiles-grid').appendChild(this.#element);        
     
        // prendo la lista delle classi dell'elemento html della cella e lo rendo un array con l'operatore ... per poi poter utilizzare i metodi dell'array
        [...this.#element.classList]
        .filter(htmlClass => htmlClass.startsWith('pos-')) // filtro le classi mantenendo solo quelle che iniziano con "pos-" che quindi indicano la posizione della cella
        .forEach(htmlClass => {
            // ogni cella che inizia con "pos-" viene rimossa
            this.#element.classList.remove(htmlClass);
        })

        // aggiungo una nuova classe con la posizione della cella
        this.#element.classList.add(`pos-${this.y+1}-${this.x+1}`)    
    }
}