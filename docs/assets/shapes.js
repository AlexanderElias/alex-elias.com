
var X_MAX;
var Y_MAX;
var X_MIN = 0;
var Y_MIN = 0;
var ANIMATION_ID;
var BEZIER_CURVES_ZERO_BASE = 6;

var CANVAS = document.createElement('canvas');
var CONTEXT = CANVAS.getContext('2d');

CANVAS.style.top = 0;
CANVAS.style.left = 0;
CANVAS.style.zIndex = 0;
CANVAS.style.opacity = 0;
CANVAS.style.position = 'absolute';
CANVAS.style.pointerEvents = 'none';
CANVAS.style.transition = 'opacity 600ms ease-in-out';

document.body.appendChild(CANVAS);

function setup () {
	CONTEXT.canvas.width = window.innerWidth;
	CONTEXT.canvas.height = window.innerHeight;

	CONTEXT.lineWidth = 1;
	CONTEXT.miterLimit = 3;
	CONTEXT.globalAlpha = 0.06;
	CONTEXT.lineJoin= 'round';
	CONTEXT.lineCap = 'round';
	CONTEXT.fillStyle = 'rgb(0, 0, 0)';
	CONTEXT.strokeStyle = 'rgb(0, 0, 0)';

	X_MAX = CONTEXT.canvas.width;
	Y_MAX = CONTEXT.canvas.height;

	setTimeout(function () {
		CANVAS.style.opacity = 1;
	}, 300);
}

setup();

function createRandomNumber (min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomPoints () {
	var points = [];

	for (var i = 0; i <= BEZIER_CURVES_ZERO_BASE; i++) {
		points.push({
			x0: createRandomNumber(X_MIN, X_MAX),
			y0: createRandomNumber(Y_MIN, Y_MAX),
			x1: createRandomNumber(X_MIN, X_MAX),
			y1: createRandomNumber(Y_MIN, Y_MAX),
			x2: createRandomNumber(X_MIN, X_MAX),
			y2: createRandomNumber(Y_MIN, Y_MAX)
		});
	}

	return points;
}

function incrementRandomPoints (sourcePoints, targetPoints) {
	for (var i = 0; i <= BEZIER_CURVES_ZERO_BASE; i++) {
		for (var key in sourcePoints[i]) {

			if (sourcePoints[i][key] === targetPoints[i][key]) {
				if (key[0] === 'x') {
					targetPoints[i][key] = createRandomNumber(X_MIN, X_MAX);
				} else if (key[0] === 'y') {
					targetPoints[i][key] = createRandomNumber(Y_MIN, Y_MAX);
				}
			}

			if (sourcePoints[i][key] < targetPoints[i][key]) {
				sourcePoints[i][key] = sourcePoints[i][key] + 1; // TODO speed must int otherwise never ===
			} else if (sourcePoints[i][key] > targetPoints[i][key]) {
				sourcePoints[i][key] = sourcePoints[i][key] - 1; // TODO speed must int otherwise never ===
			}

		}
	}

	return {
		source: sourcePoints,
		target: targetPoints
	};
}

function draw (points) {

	CONTEXT.clearRect(X_MIN, Y_MIN, X_MAX, Y_MAX);


	CONTEXT.beginPath();
	// CONTEXT.moveTo(points[0].x0, points[0].x0);

	for (var i = 0; i <= BEZIER_CURVES_ZERO_BASE; i++) {
		CONTEXT.bezierCurveTo(
			points[i].x0, points[i].y0,
			points[i].x1, points[i].y1,
			points[i].x2, points[i].y2
		);
	}

	CONTEXT.fill();
	CONTEXT.stroke();
	CONTEXT.closePath();

}

function animate (source, target) {
	var points = incrementRandomPoints(source, target);

	ANIMATION_ID = window.requestAnimationFrame(function () {
		draw(points.source);
		animate(points.source, points.target);
	});
}

animate(createRandomPoints(), createRandomPoints());

window.addEventListener('resize', function () {
	window.requestAnimationFrame(function () {
		window.cancelAnimationFrame(ANIMATION_ID);
		setup();
		animate(createRandomPoints(), createRandomPoints());
	});
});
