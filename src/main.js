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
const drawBall = (fill) => {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = '#0095dd';
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
			alert('GAME OVER, MAN! GAME OVER!!!');
			document.location.reload();
			clearInterval(interval);
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

const collisionDetection = () => {
	for (let c = 0; c < brickColumnCount; c++) {
		for (let r = 0; r < brickRowCount; r ++) {
			let b = bricks[c][r];

			if (b.status === 1) {
				if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
					dy = - dy;
					b.status = 0;
				}
			}
		}
	}
}

const interval = setInterval(draw, 10);

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
