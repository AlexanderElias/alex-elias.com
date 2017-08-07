(function (window) {

	function Shapes (options) {
		this.done = false;
		this.completes = [];
		this.countTotal = 0;
		this.countCurrent = 0;
		this.svg = options.svg;
		this.atts = options.atts;
		this.once = options.once || false;
		this.points = options.points || 2;
		this.xMin = function () { return 0; };
		this.yMin = function () { return 0; };
		this.random = options.random || false;
		this.infinite = options.infinite || false;
		this.nameSpace = 'http://www.w3.org/2000/svg';
		this.xMax = function () { return this.svg.width.baseVal.value; };
		this.yMax = function () { return this.svg.height.baseVal.value; };

		this.element = document.createElementNS(this.nameSpace, 'path');

		Object.keys(this.atts).forEach(function (key) {
			this.element.setAttribute(key, this.atts[key]);
		}, this);

		this.svg.appendChild(this.element);

		if (this.random) {
			this.source = this.randomArgs();
			this.target = this.randomArgs();
		}
	}

	Shapes.prototype.setSource = function (source) {
		this.source = source || this.randomArgs();
	};

	Shapes.prototype.setTarget = function (target) {
		this.target = target || this.randomArgs();
	};

	Shapes.prototype.randomNum = function (min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	Shapes.prototype.randomArg = function (cmd, num) {
		var arg = [cmd];

		for (var i = 0; i < num; i++) {
			arg.push(
				this.randomNum(this.xMin(), this.xMax()),
				this.randomNum(this.yMin(), this.yMax())
			);
		}

		return arg;
	};

	Shapes.prototype.randomArgs = function () {
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

		args.push('Z');

		return args;
	};

	Shapes.prototype.step = function () {
		var completes = 0;

		if (!this.done) {
			for (var i = 0, l = this.source.length; i < l; i++) {
				if (typeof this.source[i] === 'string' || this.source[i] === this.target[i]) {
					completes++;

					if (this.infinite && completes === l) {
						this.setTarget();
					} else {
						this.done = completes === l;
					}
				} else if (this.source[i] < this.target[i]) {
					this.source[i]++;
				} else if (this.source[i] > this.target[i]) {
					this.source[i]--;
				}
			}
		}
	};

	Shapes.prototype.render = function () {
		this.element.setAttribute('d', this.source.join(' '));
	};

	return window.Shapes = Shapes;

}(this));
