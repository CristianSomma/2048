function toMain() {
    const mainBtn = document.getElementById('start-btn');
    const animatedLayer = document.getElementById('animated-layer');
    mainBtn.disabled = true;
    animatedLayer.classList.add('animate');
    setTimeout(() => {
        window.location.href = 'docs/game.html';
    }, 3200);
}