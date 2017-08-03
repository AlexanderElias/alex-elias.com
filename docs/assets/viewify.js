(function (window) {

	function Viewify (options) {
		this.up = 1;
		this.down = -1;
		this.data = options.data;
		this.listener = options.listener;
		this.elements = options.elements || [];
		this.endPercent = options.endPercent || 0.6;
		this.startPercent = options.startPercent || 0.4;
		this.container = options.container || document.body;
	}

	Viewify.prototype.dev = function () {
		this.changePointElement = document.createElement('div');

		this.changePointElement.setAttribute('style', `
			left: 0;
			top: 0;
			width: 100%;
			height: 3px;
			z-index: 10000;
			background: red;
			position: absolute;
		`);

		this.container.appendChild(this.changePointElement);
	};

	Viewify.prototype.round = function (value, decimals) {
		return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
	};

	Viewify.prototype.scroll = function () {
		var element, start, height, stop;

		var percent = window.scrollY <= this.position ? this.startPercent : this.endPercent;
		var position = window.scrollY + (window.innerHeight * percent);

		if (this.changePointElement) {
			this.changePointElement.style.top = position + 'px';
		}

		for (var i = 0, l = this.elements.length; i < l; i++) {
			element = this.elements[i];

			start = element.offsetTop;
			height = element.offsetHeight;
			stop = start + height;

			if (i === l-1) {
				stop = this.container.offsetHeight;
			}

			this.position = window.scrollY;

			if (position >= start && position <= stop && this.current !== i) {
				this.current = i;
				return this.listener(element, i, position);
			}
		}

		this.position = window.scrollY;
	};

	Viewify.prototype.listen = function (listener) {

		if (this.animation) {
			window.cancelAnimationFrame(this.animation);
		}

		if (this.event) {
			window.removeEventListener(this.event);
		}

		this.listener = this.listener || listener;
		this.animation = window.requestAnimationFrame.bind(null, this.scroll.bind(this));
		this.event = window.addEventListener('scroll', this.animation);
		this.animation();
	};

	return window.Viewify = Viewify;

}(this));
