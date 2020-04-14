'use strict'

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// x/y movement variables
let x = canvas.width / 2;
let dx = 2;
let y = canvas.height - 30;
let dy = -2;

// Element variables
const ballRadius = 10;

const drawBall = () => {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = '#0095dd';
	ctx.fill();
	ctx.closePath();
}

const draw = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	x += dx;
	y += dy;

	if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
		dx = -dx;
	}

	if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
		dy = -dy;
	}
}

setInterval(draw, 10);

