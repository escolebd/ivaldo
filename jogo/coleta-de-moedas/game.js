const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Configurações do jogador
const playerSize = 30;
let playerX = (canvas.width - playerSize) / 2;
let playerY = (canvas.height - playerSize) / 2;
const playerSpeed = 5;

// Configurações das moedas
const coinRadius = 15;
let coinX = Math.random() * (canvas.width - coinRadius * 2) + coinRadius;
let coinY = Math.random() * (canvas.height - coinRadius * 2) + coinRadius;

// Pontuação
let score = 0;

// Estado de movimento
let moveUp = false;
let moveDown = false;
let moveLeft = false;
let moveRight = false;

// Função para desenhar o jogador
function drawPlayer() {
    ctx.fillStyle = '#00FF00';
    ctx.fillRect(playerX, playerY, playerSize, playerSize);
}

// Função para desenhar a moeda
function drawCoin() {
    ctx.beginPath();
    ctx.arc(coinX, coinY, coinRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#FFD700';
    ctx.fill();
    ctx.closePath();
}

// Função para verificar colisão entre o jogador e a moeda
function checkCollision() {
    const distanceX = playerX + playerSize / 2 - coinX;
    const distanceY = playerY + playerSize / 2 - coinY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < playerSize / 2 + coinRadius) {
        // Colisão detectada: aumenta a pontuação e reposiciona a moeda
        score++;
        coinX = Math.random() * (canvas.width - coinRadius * 2) + coinRadius;
        coinY = Math.random() * (canvas.height - coinRadius * 2) + coinRadius;
    }
}

// Função para mover o jogador
function movePlayer() {
    if (moveUp && playerY > 0) playerY -= playerSpeed;
    if (moveDown && playerY < canvas.height - playerSize) playerY += playerSpeed;
    if (moveLeft && playerX > 0) playerX -= playerSpeed;
    if (moveRight && playerX < canvas.width - playerSize) playerX += playerSpeed;
}

// Função principal do jogo
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Movimentação e desenho
    movePlayer();
    drawPlayer();
    drawCoin();

    // Verifica colisão
    checkCollision();

    // Exibe a pontuação
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '20px Arial';
    ctx.fillText(`Pontuação: ${score}`, 10, 30);

    requestAnimationFrame(gameLoop);
}

// Controles do teclado
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp': moveUp = true; break;
        case 'ArrowDown': moveDown = true; break;
        case 'ArrowLeft': moveLeft = true; break;
        case 'ArrowRight': moveRight = true; break;
    }
});

document.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowUp': moveUp = false; break;
        case 'ArrowDown': moveDown = false; break;
        case 'ArrowLeft': moveLeft = false; break;
        case 'ArrowRight': moveRight = false; break;
    }
});

// Controles touch (botões na tela)
document.getElementById('up').addEventListener('touchstart', () => moveUp = true);
document.getElementById('up').addEventListener('touchend', () => moveUp = false);

document.getElementById('down').addEventListener('touchstart', () => moveDown = true);
document.getElementById('down').addEventListener('touchend', () => moveDown = false);

document.getElementById('left').addEventListener('touchstart', () => moveLeft = true);
document.getElementById('left').addEventListener('touchend', () => moveLeft = false);

document.getElementById('right').addEventListener('touchstart', () => moveRight = true);
document.getElementById('right').addEventListener('touchend', () => moveRight = false);

// Inicia o jogo
gameLoop();