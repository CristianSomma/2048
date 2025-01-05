export default class Cell {
    // dichiaro localmente le variabili private
    #x
    #y
    #element
    #content
    #icon

    constructor (x, y, value, htmlElement) {
        // coordinate della cella
        this.#x = x;
        this.#y = y;
        // elemento html contenuto dalla cella
        this.#element = htmlElement;
        // numero della tessera
        this.#content = value;
        // icona che rappresenta il valore della tessera
        this.#icon = this.#element ? `../assets/icons/tilesIcons/${this.#content}.png` : null;
    }

    // setter della coordinata x
    set x(newValue){
        // se x non è nel range da zero a tre ritorna un errore nella console
        if(newValue<0 || newValue>3){
            throw new Error('The cell coordinates must be between zero and three.');
        }
        // assegna ad x il nuovo valore 
        this.#x = newValue;
        // aggiorna il DOM per sincronizzare le coordinate dell'oggetto a quelle dell'elemento html
        this.updateHtmlElement();
    }

    // getter della coodinata x
    get x(){
        return this.#x;
    }

    // setter della coordinata y
    set y(newValue){
        if(newValue<0 || newValue>3){
            throw new Error('The cell coordinates must be between zero and three.');
        }
        // assegna ad #y il nuovo valore
        this.#y = newValue;
        // aggiorna il DOM
        this.updateHtmlElement();
    }

    // getter della coordinata y
    get y(){
        return this.#y;
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
        this.#icon = null;
    }

    // funzione che permette di settare l'elemento html ed aggiungere una classe css all'elemento html senza aggiornare il DOM
    setHtmlAndClass(newValue, newClass){
        // se l'elemento html già esisteva e deve essere sovrascritto
        if(this.#element){
            // l'elemento precedente viene cancellato per evitare la presenza di due div sovrapposti
            this.removeHtmlElement();
        }

        // se i parametri sono null ritorna un errore nella console
        if(newValue === null || newClass === null){
            throw new Error('Both the arguments must have a valid value.')
        }

        // assegna alla proprietà contenente l'elemento html il nuovo valore
        this.#element = newValue;

        // aggiunge la classe all'elemento html
        this.#element.classList.add(newClass);
    }

    #setTileBackgroundColor(){
        // se l'elemento html esiste...
        if(this.#element){
            let alpha;
            
            // prendo la lista delle classi e le rendo un array tramite l'operatore ...
            [...this.#element.classList]
            // filtro le classi mantenendo solo quelle che equivalgono a 'gold' o 'blue'
            .filter(htmlClass => htmlClass === "gold" || htmlClass === "blue") // filtro le classi mantenendo solo quelle che iniziano con "pos-" che quindi indicano la posizione della cella
            // per tutte le classi che soddisfano la condizione
            .forEach(htmlClass => {
                // viene eliminata la classe, rimuovendo perciò il comando css che determinava il colore di background
                this.#element.classList.remove(htmlClass);
            })

            // se il valore della tessera è minore o uguale a 64
            if(this.#content <= 64){
                // viene assegnata alla tessera la classe blue, che definisce il colore di background a blu
                this.#element.classList.add('blue');
                // definisco il valore alpha del colore con il seguente calcolo (il calcolo da eseguire l'ho chiesto a ChatGPT) 
                alpha = Math.log2(this.#content) / Math.log2(64);
            }else{
                // per tutte le tessere con valore maggiore di 64
                // viene assegnata alla tessera la classe gold, che definisce il colore di background a oro
                this.#element.classList.add('gold');
                // definisco il valore alpha del colore con il seguente calcolo
                alpha = Math.log2(this.#content) / Math.log2(2048);
            }
            // definisco la variabile --backgroundColorAlpha al valore di alpha
            this.#element.style.setProperty('--backgroundColorAlpha', alpha);
        }
    }

    updateHtmlElement(){
        // assegno all'attributo source dell'immagine con classe .icon-img il valore di #icon
        this.#element.querySelector('.icon-img').src = this.#icon;
        // chiamo una funzione privata per definire il colore di background della tessera
        this.#setTileBackgroundColor();

        // assegno alle variabili css --x e --y il valore di #x e #y per definire la posizione della tessera
        this.#element.style.setProperty('--x', this.#x);
        this.#element.style.setProperty('--y', this.#y);

        // inserisco nella griglia (#tiles-grid) l'elemento html della cella
        document.getElementById('tiles-grid').appendChild(this.#element);        
    }
}