
var ANIMATE;
var NAME_SPACE = 'http://www.w3.org/2000/svg';

var STYLE = document.createElement('style');
var CONTAINER = document.querySelector('.shapes');
var SVG = document.createElementNS(NAME_SPACE, 'svg');
var TEXT = document.createTextNode('.shapes svg { width: 100%; height: 100%; } .shapes * { transition: none; }');

STYLE.appendChild(TEXT);
CONTAINER.appendChild(STYLE);
CONTAINER.appendChild(SVG);

SVG.setAttribute('viewbox', '0 0 100 100');
SVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
SVG.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

var BLACK = '#222';
var BLUE = '#29f';
var GREEN = '#2f9';
var ORANGE = '#f92';
var PINK = '#f29';
var PURPLE = '#92f';

function Shape (options) {
	this.done = false;
	this.completes = [];
	this.countTotal = 0;
	this.countCurrent = 0;
	this.svg = options.svg;
	this.atts = options.atts;
	this.infinite = options.infinite;
	this.once = options.once || false;
	this.points = options.points || 2;
	this.random = options.random || false;
	this.xMin = function () { return 0; };
	this.yMin = function () { return 0; };
	this.xMax = function () { return this.svg.width.baseVal.value; };
	this.yMax = function () { return this.svg.height.baseVal.value; };

	this.element = document.createElementNS(NAME_SPACE, 'path');

	Object.keys(this.atts).forEach(function (key) {
		this.element.setAttribute(key, this.atts[key]);
	}, this);

	this.svg.appendChild(this.element);

	if (this.random) {
		this.source = this.randomArgs();
		this.target = this.randomArgs();
	}
}

Shape.prototype.setSource = function (source) {
	this.source = source || this.randomArgs();
};

Shape.prototype.setTarget = function (target) {
	this.target = target || this.randomArgs();
};

Shape.prototype.randomNum = function (min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

Shape.prototype.randomArg = function (cmd, num) {
	var arg = [cmd];

	for (var i = 0; i < num; i++) {
		arg.push(
			this.randomNum(this.xMin(), this.xMax()),
			this.randomNum(this.yMin(), this.yMax())
		);
	}

	return arg;
};

Shape.prototype.randomArgs = function () {
	var args = [
		'M',
		this.randomNum(this.xMin(), this.xMax()/2),
		this.randomNum(this.yMin(), this.yMax()/2)
	];

	for (var i = 0; i < this.points-1; i++) {
		args = args.concat(
			this.randomArg('C', 3),
			this.randomArg('S', 2)
		);
	}

	return args;
};

Shape.prototype.step = function () {
	var completes = 0;

	if (!this.done) {
		for (var i = 0, l = this.source.length; i < l; i++) {
			if (typeof this.source[i] === 'string' || this.source[i] === this.target[i]) {
				completes++;
				this.done = completes === l;
			} else if (this.source[i] < this.target[i]) {
				this.source[i]++;
			} else if (this.source[i] > this.target[i]) {
				this.source[i]--;
			}
		}
	}
};

Shape.prototype.render = function () {
	this.element.setAttribute('d', this.source.join(' '));
};

function render (shape) {
	shape.step();
	shape.render();

	if (!shape.done && ANIMATE) {
		window.requestAnimationFrame(function () {
			render(shape);
		});
	}

}

function start () {
	ANIMATE = true;
	[BLACK, PURPLE, PINK, GREEN, ORANGE, BLUE].forEach(function (color) {
		window.requestAnimationFrame(function () {
			render(new Shape({
				svg: SVG,
				random: true,
				atts: { fill: color }
			}));
		});
	});
}

function stop () {
	ANIMATE = false;
	SVG.innerHTML = '';
}

// function resize () {
// }

window.addEventListener('load', function () {
	start();

	document.querySelectorAll('.art')[0].addEventListener('click', function () {
		stop();
		setTimeout(start, 500);
	});

	document.querySelectorAll('.art')[1].addEventListener('click', function () {
		stop();
		setTimeout(start, 500);
	});

});
