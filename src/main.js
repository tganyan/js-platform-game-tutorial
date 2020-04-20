'use strict'

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Paddle dimensions
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth) / 2;

// Player controls
let rightPressed = false;
let leftPressed = false;

// x/y movement
let x = canvas.width / 2;
let dx = 2;
let y = canvas.height - 30;
let dy = -2;

// Ball 
const ballRadius = 10;
const ballColors = ['#0095dd', '#31f349', '#e2844d', '#554dc7', '#2ed2c3'];
let ballColor = ballColors[0];

// Score
let score = 0;

// Lives
let lives = 3;

// Bricks
let bricks = [];
let brickRowCount = 3;
let brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

for (let c = 0; c < brickColumnCount; c++) {
	bricks[c] = [];
	for (let r = 0; r < brickRowCount; r++) {
		bricks[c][r] = { x: 0, y: 0, status: 1 };
	}
}

// Functions
const drawScore = () => {
	ctx.font = '16px Arial';
	ctx.fillStyle = '0095dd';
	ctx.fillText(`Score: ${score}`, 8, 20);
}

const drawLives = () => {
	ctx.font = '16px Arial';
	ctx.fillStyle = '0095dd';
	ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

const drawBall = (fill) => {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = ballColor;
	ctx.fill();
	ctx.closePath();
}

const drawPaddle = () => {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = '#0095dd';
	ctx.fill();
	ctx.closePath();
}

const drawBricks = () => {
	for (let c = 0; c < brickColumnCount; c++) {
		for (let r = 0; r < brickRowCount; r++) {
			if (bricks[c][r].status === 1) {
				const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
				const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = '#0095dd';
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

const draw = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
	drawLives();
	collisionDetection();
	x += dx;
	y += dy;

	if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
		dx = -dx;
	}

	if (y + dy < ballRadius) {
		dy = -dy;
	} else if (y + dy > canvas.height - ballRadius) {
		
		if (x > paddleX && x < paddleX + paddleWidth) {
			dy = -(dy + 1);
		} else {
			lives--;

			if (!lives) {
				alert('GAME OVER, MAN! GAME OVER!!!');
				document.location.reload();
			} else {
				x = canvas.width / 2;
				y = canvas.height - 30;
				dx = 2;
				dy = -2;
				paddleX = (canvas.width - paddleWidth) / 2;
			}
		}
	}

	if (rightPressed) {
		paddleX += 7;

		if (paddleX + paddleWidth > canvas.width) {
			paddleX = canvas.width - paddleWidth;
		}
	} else if (leftPressed) {
		paddleX -= 7;

		if (paddleX < 0) {
			paddleX = 0;
		}
	}

	requestAnimationFrame(draw);
}

const keyDownHandler = (event) => {
	if (event.key === 'Right' || event.key === 'ArrowRight') {
		rightPressed = true;
	} else if (event.key === 'Left' || event.key === 'ArrowLeft') {
		leftPressed = true;
	}
}

const keyUpHandler = (event) => {
	if (event.key === 'Right' || event.key === 'ArrowRight') {
		rightPressed = false;
	} else if (event.key === 'Left' || event.key === 'ArrowLeft') {
		leftPressed = false;
	}
}

const mouseMoveHandler = (event) => {
	const relativeX = event.clientX - canvas.offsetLeft;

	if (relativeX > 0 && relativeX < canvas.width) {
		paddleX = relativeX - paddleWidth / 2;
	}
}

const collisionDetection = () => {
	for (let c = 0; c < brickColumnCount; c++) {
		for (let r = 0; r < brickRowCount; r ++) {
			let b = bricks[c][r];

			if (b.status === 1) {
				if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
					dy = - dy;
					ballColor = ballColors[Math.floor(Math.random() * ballColors.length)];
					b.status = 0;
					score++;

					if (score === brickRowCount * brickColumnCount) {
						alert('YOU WIN!');
						document.location.reload();

					}
				}
			}
		}
	}
}

draw();

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);
