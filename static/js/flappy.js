const canvas = document.getElementById("flappyBird");
const ctx = canvas.getContext("2d");

const birdImg = new Image();
const bgImg = new Image();
const fgImg = new Image();
const pipeNorthImg = new Image();
const pipeSouthImg = new Image();

birdImg.src = "/static/images/bird.png";
bgImg.src = "/static/images/bg.png";
fgImg.src = "/static/images/fg.png";
pipeNorthImg.src = "/static/images/pipeNorth.png";
pipeSouthImg.src = "/static/images/pipeSouth.png";

const gap = 85;
const constant = pipeNorthImg.height + gap;
const bird = {
    x: 100,
    y: 150,
    velocity: 0,
};

const gravity = 0.1;
const jumpForce = -2.5;
const maxRotation = 45 * (Math.PI / 180);

let pipes = [];
pipes[0] = {
    x: canvas.width,
    y: 0,
};

let score = 0;

document.addEventListener("keydown", () => {
    bird.velocity = jumpForce;
});

function drawBird() {
    ctx.save();
    ctx.translate(bird.x, bird.y);

    let angle = Math.max(-maxRotation, Math.min(maxRotation, bird.velocity * 5 * (Math.PI / 180)));
    ctx.rotate(angle);

    ctx.drawImage(birdImg, -birdImg.width / 2, -birdImg.height / 2);
    ctx.restore();
}

function draw() {
    ctx.drawImage(bgImg, 0, 0);

    for (let i = 0; i < pipes.length; i++) {
        ctx.drawImage(pipeNorthImg, pipes[i].x, pipes[i].y);
        ctx.drawImage(pipeSouthImg, pipes[i].x, pipes[i].y + constant);

        pipes[i].x--;

        if (pipes[i].x === 125) {
            pipes.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeNorthImg.height) - pipeNorthImg.height,
            });
        }

        if (
            (bird.x + birdImg.width / 2 >= pipes[i].x &&
                bird.x - birdImg.width / 2 <= pipes[i].x + pipeNorthImg.width &&
                (bird.y - birdImg.height / 2 <= pipes[i].y + pipeNorthImg.height || bird.y + birdImg.height / 2 >= pipes[i].y + constant)) ||
            bird.y + birdImg.height / 2 >= canvas.height - fgImg.height
        ) {
            location.reload();
        }

        if (pipes[i].x === 95) {
            score++;
        }
    }

    ctx.drawImage(fgImg, 0, canvas.height - fgImg.height);
    drawBird();

    bird.velocity += gravity;
    bird.y += bird.velocity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score: " + score, 10, canvas.height - 20);

    requestAnimationFrame(draw);
}

draw();
