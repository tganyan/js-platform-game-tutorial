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

// Functions
const drawBall = () => {
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

const draw = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddle();
	x += dx;
	y += dy;

	if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
		dx = -dx;
	}

	if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
		dy = -dy;
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

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

setInterval(draw, 10);

