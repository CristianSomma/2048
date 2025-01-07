function toMain() {
    window.location.href = 'docs/game.html';
}

document.addEventListener('DOMContentLoaded', () => {
    if(window.innerWidth > 600){
        toMain();
    }
})
