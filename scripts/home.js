function toMain() {
    window.location.href = 'docs/game.html';
}

document.addEventListener('DOMContentLoaded', () => {
    if(window.screen.width > 600){
        toMain();
    }
})
