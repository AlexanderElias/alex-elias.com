(function (window) {

	var Shapes = function Shapes (options) {
		this.done = false;
		this.completes = [];
		this.countTotal = 0;
		this.countCurrent = 0;
		this.svg = options.svg;
		this.atts = options.atts;
		this.once = options.once || false;
		this.points = options.points || 2;
		this.random = options.random || false;
		this.infinite = options.infinite || false;
		this.nameSpace = 'http://www.w3.org/2000/svg';

		this.xMin = function () { return 0; };
		this.yMin = function () { return 0; };
		this.xMax = function () { return this.svg.width.baseVal.value; };
		this.yMax = function () { return this.svg.height.baseVal.value; };

		this.element = document.createElementNS(this.nameSpace, 'path');

		Object.keys(this.atts).forEach(function (key) {
			this.element.setAttribute(key, this.atts[key]);
		}, this);

		this.svg.appendChild(this.element);

		if (this.random) {
			this.source = this.randomArguments();
			this.target = this.randomArguments();
		} else {
			this.source = typeof options.source === 'string'? this.toPath(options.source) : options.source;
			this.target = typeof options.target === 'string'? this.toPath(options.target) : options.target;
		}

	}

	Shapes.prototype.setSource = function (source) {
		this.source = source || this.randomArguments();
	};

	Shapes.prototype.setTarget = function (target) {
		this.target = target || this.randomArguments();
	};

	Shapes.prototype.randomNumber = function (min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	Shapes.prototype.randomArgument = function (cmd, num) {
		var arg = [cmd];

		for (var i = 0; i < num; i++) {
			arg.push(
				this.randomNumber(this.xMin(), this.xMax()),
				this.randomNumber(this.yMin(), this.yMax())
			);
		}

		return arg;
	};

	Shapes.prototype.randomArguments = function () {
		var args = [
			'M',
			this.randomNumber(this.xMin(), this.xMax()/2),
			this.randomNumber(this.yMin(), this.yMax()/2)
		];

		for (var i = 0; i < this.points-1; i++) {
			args = args.concat(
				this.randomArgument('C', 3),
				this.randomArgument('S', 2)
			);
		}

		args.push('Z');

		return args;
	};

	Shapes.prototype.step = function () {
		var completes = 0;
		var length = this.target.length;

		if (!this.done) {

			if (this.inited) {
				this.inited = true;
				if (this.target.length > this.source.length) {
					this.source.push.apply(this.source, this.target.slice(this.source.length-1));
				} else if (this.target.length < this.source.length) {
					this.source.length = this.target.length;
				}
			}

			for (var i = 0, l = l = this.source.length; i < l; i++) {
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

	Shapes.prototype.formatPath = function (path) {
		return path
		.replace(/([a-z])/ig, ' $1 ')
		.replace(/(\d)-/g, '$1 -')
		.replace(/-\./g, '-0.')
		.replace(/\d+\.\d+(\.\d+)+/g, function  (string) {
		    var strings = string.split('.');
		    return strings.slice(0, 2).join('.') + strings.slice(1).join(' 0.');
		});
	};

	Shapes.prototype.toPath = function (path) {
		return this.formatPath(path).split(' ').map(function (p) {
			if (/\d+/.test(p)) {
				return parseFloat(p);
			} else {
				return p;
			}
		});
	};

	Shapes.prototype.render = function () {
		this.element.setAttribute('d', this.source.join(' '));
	};

	return window.Shapes = Shapes;

}(this));
