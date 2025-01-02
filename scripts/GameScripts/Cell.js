export default class Cell {
    #element
    #content
    #icon

    constructor (x, y, value, htmlElement) {
        // coordinate della cella
        this.x = x;
        this.y = y;
        // elemento html contenuto dalla cella
        this.#element = htmlElement;
        // numero della tessera
        this.#content = value;
        // icona che rappresenta il valore della tessera
        this.#icon = this.#element ? `../assets/icons/tilesIcons/${this.#content}.png` : null;
    }

    #setTileBackgroundColor(){
        if(this.#element){
            let backgroundColor;
            //rgb(128, 0, 32)
            //rgb(80, 200, 120)
            //rgb(111, 162, 227)
            //rgb(212, 175, 55)
            //rgb(229, 228, 226)
            if(this.#content <= 64){
                backgroundColor = `rgba(111, 162, 227, ${Math.log2(this.#content) / Math.log2(64)})`;
            }else{
                backgroundColor = `rgba(212, 175, 55, ${Math.log2(this.#content) / Math.log2(2048)})`;
            }
            this.#element.style.setProperty('--tileBackgroundColor', backgroundColor);
        }
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
        // quando cambia il valore della tessera cambia anche il percorso dell'icona e perciò l'immagine mostrata
        this.#icon = `../assets/icons/tilesIcons/${this.#content}.png`;
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
        this.#element.querySelector('.icon-img').src = this.#icon;
        // chiamo una funzione privata per definire il colore di background della tessera
        this.#setTileBackgroundColor();
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