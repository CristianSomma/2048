import { gameOver } from "./helpers.js";

export default class Timer {
    #interval = null;

    start(timerLenght){
        // calcolo dei minuti
            let minutesLeft = Math.floor(timerLenght / 60);
            // calcolo dei secondi
            let secondsLeft = timerLenght - (minutesLeft * 60);
        
            this.#interval = setInterval(() => {
                let minutes = minutesLeft;
                let seconds = secondsLeft;
                
                // se i minuti e i secondi sono entrambi zero
                if(minutesLeft === 0 && secondsLeft === 0){
                    // quando il timer finisce eseguo la funzione di gameover con messaggio personalizzato
                    gameOver('The time for moving again has ended...');
                    // ferma l'esecuzione del setInterval
                    this.stop();
                    // ritorna la funzione
                    return;
                }
        
                // se i secondi sono zero e i minuti no...
                if(secondsLeft === 0 && minutesLeft>0){
                    // si toglie un minuto e si resetta i secondi a 59
                    minutesLeft--;
                    secondsLeft = 59;
                }else{
                    // altrimenti avviene la normale esecuzione con la riduzione di un secondo alla volta
                    secondsLeft--;
                }
        
                // se i secondi o i minuti sono meno di 10, quindi a singola cifra per estetica si aggiunge uno zero di fronte
                if(secondsLeft<10){
                    seconds = `0${secondsLeft}`;
                }
        
                if(minutesLeft<10){
                    minutes = `0${minutesLeft}`; 
                }
        
                // interpolazione e "rendering"
                document.getElementById('timer-number').innerHTML = `${minutes}:${seconds}`
            }, 1000);
    }

    stop(){
        if(this.#interval){
            clearInterval(this.#interval);
        }
    }
}