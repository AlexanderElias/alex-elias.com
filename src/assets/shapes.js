
var ID_ANIMATION;
var RUN_ANIMATION;
var CONTAINER = document.querySelector('.shapes');
var CANVAS = document.createElement('canvas');
var CONTEXT = CANVAS.getContext('2d');
CONTAINER.appendChild(CANVAS);

function Shape (options) {
	// paths > points > cordinates
	this.done = false;
	this.opts = options.opts;
	this.fill = options.fill;
	this.stroke = options.stroke;
	this.source = options.source;
	this.target = options.target;
	this.context = options.context;
	this.infinite = options.infinite;
	this.movePoint = options.movePoint;

	this.type = options.type || 'lineTo';
	this.xMin = options.xMin || function () { return 0; };
	this.yMin = options.yMin || function () { return 0; };
	this.xMax = options.xMax || function () { return this.context.canvas.width; };
	this.yMax = options.yMax || function () { return this.context.canvas.height; };
}

Shape.prototype.number = function (min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

Shape.prototype.point = function () {
	return [
		this.number(this.xMin(), this.xMax()),
		this.number(this.yMin(), this.yMax())
	];
};

Shape.prototype.random = function () {
	return Array.apply(null, Array(this.paths)).map(function () {
		return Array.apply(null, Array(this.points)).map(function () {
			return this.point();
		}, this);
	}, this);
};

Shape.prototype.setMovePoint = function (movePoint) {
	this.movePoint = movePoint || this.point();
};

Shape.prototype.setSource = function (source) {
	this.source = source || this.random();
};

Shape.prototype.setTarget = function (target) {
	this.done = false;
	this.target = target || this.random();
};

Shape.prototype.increment = function () {
	var count = 0;

	// paths * (points * cordinates) = total
	var total = this.source.length * (this.source[0].length * 2);

	for (var pathIndex = 0; pathIndex < this.source.length; pathIndex++) {
		for (var pointIndex = 0; pointIndex < this.source[pathIndex].length; pointIndex++) {
			for (var cordinateIndex = 0; cordinateIndex < this.source[pathIndex][pointIndex].length; cordinateIndex++) {

				if (this.source[pathIndex][pointIndex][cordinateIndex] === this.target[pathIndex][pointIndex][cordinateIndex]) {
					count++;
					if (count === total) this.done = true;
				}

				if (this.source[pathIndex][pointIndex][cordinateIndex] < this.target[pathIndex][pointIndex][cordinateIndex]) {
					this.source[pathIndex][pointIndex][cordinateIndex]++;
				} else if (this.source[pathIndex][pointIndex][cordinateIndex] > this.target[pathIndex][pointIndex][cordinateIndex]) {
					this.source[pathIndex][pointIndex][cordinateIndex]--;
				}

			}
		}
	}
};

Shape.prototype.draw = function () {
	if (this.opts) {
		Object.keys(this.opts).forEach(function (opt) {
			this.context[opt] = this.opts[opt];
		}, this);
	}

	if (this.stroke) this.context.stroke();
	if (this.fill) this.context.fill();
	if (this.movePoint) this.context.moveTo(this.movePoint[0], this.movePoint[1]);

	this.context.beginPath();

	this.source.forEach(function (path) {
		var args = [];

		path.forEach(function (point) {
			args.push(point[0], point[1]);
		}, this);

		this.context[this.type].apply(this.context, args);
	}, this);

	this.context.closePath();

	if (!this.done) this.increment();
	if (this.done && this.infinite) this.setTarget();
	else if (this.done && !this.infinite) stop();

};

function RandomShape (options) {
	Shape.call(this, options);

	this.paths = options.paths || 3;
	this.points = options.points || 3;
	this.type = options.type || 'bezierCurveTo';

	this.setSource();
	this.setTarget();
	this.setMovePoint();
}

RandomShape.prototype = Object.create(Shape.prototype);
RandomShape.prototype.constructor = RandomShape;

function animate (shapes) {
	if (RUN_ANIMATION) {
		CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);

		shapes.forEach(function (shape) {
			shape.draw();
		});

		ID_ANIMATION = window.requestAnimationFrame(function () {
			animate(shapes);
		});
	}
}

function resize () {
	CONTEXT.canvas.width = CONTAINER.clientWidth;
	CONTEXT.canvas.height = CONTAINER.clientHeight;
	CONTEXT.globalAlpha = 0.9;
}

function start () {
	RUN_ANIMATION = true;

	// var shapes = ['#fff', '#fff', '#f39', '#f93', '#3f9', '#39f', '#39f'].map(function (color) { // dark version
	var shapes = ['#333', '#333', '#f39', '#f93', '#3f9', '#39f', '#39f'].map(function (color) {
		return new RandomShape({
			paths: 2,
			fill: true,
			infinite: true,
			context: CONTEXT,
			opts: {
				miterLimit: 3,
				lineWidth: 1.5,

				lineJoin:'round',
				lineCap: 'round',

				fillStyle: color,

				// shadowBlur: 6,
				// shadowOffsetX: 3,
				// shadowOffsetY: 3,
				// shadowColor: 'rgba(0, 0, 0, 0.03)'
			}
		});
	});

	animate(shapes);
}

function stop () {
	window.cancelAnimationFrame(ID_ANIMATION);
	RUN_ANIMATION = false;
}

// function click (e) {
// 	var canvasOffset = CANVAS.offset();
// 	var offsetX = canvasOffset.left;
// 	var offsetY = canvasOffset.top;
// 	var mouseX = parseInt(e.clientX - offsetX);
// 	var mouseY = parseInt(e.clientY - offsetY);
// 	var data = CONTEXT.getImageData(mouseX, mouseY, 1, 1);
//
// }

window.addEventListener('resize', function () {
	stop();
	resize();
	start();
});

window.addEventListener('load', function () {
	resize();
	start();
});
