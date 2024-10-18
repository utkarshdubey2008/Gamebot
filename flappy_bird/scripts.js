const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let birdY = canvas.height / 2;
let birdX = 50;
let gravity = 0.6;
let lift = -10;
let velocity = 0;
let score = 0;
let isGameOver = false;
const pipes = [];
const pipeWidth = 50;
const pipeGap = 120;
const pipeFrequency = 90; // Frames between pipes

function setup() {
    document.addEventListener("keydown", () => {
        if (!isGameOver) {
            velocity += lift;
        } else {
            restartGame();
        }
    });

    setInterval(update, 1000 / 60);
    setInterval(addPipe, pipeFrequency);
}

function addPipe() {
    const pipeHeight = Math.random() * (canvas.height - pipeGap - 20) + 20;
    pipes.push({ x: canvas.width, y: pipeHeight });
}

function update() {
    if (isGameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update bird position
    velocity += gravity;
    birdY += velocity;

    // Draw bird
    ctx.fillStyle = "yellow";
    ctx.fillRect(birdX, birdY, 20, 20);

    // Draw pipes
    for (let i = 0; i < pipes.length; i++) {
        const pipe = pipes[i];
        pipe.x -= 2;

        ctx.fillStyle = "green";
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.y);
        ctx.fillRect(pipe.x, pipe.y + pipeGap, pipeWidth, canvas.height);

        // Collision detection
        if (birdX + 20 > pipe.x && birdX < pipe.x + pipeWidth) {
            if (birdY < pipe.y || birdY + 20 > pipe.y + pipeGap) {
                isGameOver = true;
                document.getElementById("gameOver").style.display = "block";
            }
        }

        // Scoring
        if (pipe.x + pipeWidth < birdX && !pipe.scored) {
            score++;
            pipe.scored = true;
        }
    }

    // Remove off-screen pipes
    if (pipes.length > 0 && pipes[0].x < -pipeWidth) {
        pipes.shift();
    }

    // Check for game over conditions
    if (birdY + 20 >= canvas.height || birdY < 0) {
        isGameOver = true;
        document.getElementById("gameOver").style.display = "block";
    }

    // Display score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 20);
}

function restartGame() {
    pipes.length = 0;
    birdY = canvas.height / 2;
    velocity = 0;
    score = 0;
    isGameOver = false;
    document.getElementById("gameOver").style.display = "none";
}

document.getElementById("restartBtn").addEventListener("click", restartGame);

setup();
