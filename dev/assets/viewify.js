(function (window) {

	var Viewify = function Viewify (options) {
		options = options || {};
		
		this.dev = options.dev || false;
		this.listener = options.listener;
		this.percent = options.percent || 0.5;
		this.elements = options.elements || [];
		this.positions = options.positions || [];
		this.container = options.container || document.body;

		if (this.elements.length) {
			for (var i = 0, l = this.elements.length; i < l; i++) {
				var element = this.elements[i];
				var position = this.position(element);
				this.positions.push(position);
			}
		}

	};

	Viewify.prototype.position = function (e) {
		var r = e.getBoundingClientRect();
		var st = document.documentElement.scrollTop;
		return { top: r.top + st, bottom: r.bottom + st }
	};

	Viewify.prototype.dev = function () {
		this.changePointElement = document.createElement('div');

		this.changePointElement.setAttribute('style',
			'top: 0;' +
			'left: 0;' +
			'width: 100%;' +
			'height: 3px;' +
			'z-index: 10000;' +
			'background: red;' +
			'position: absolute;'
		);

		this.container.appendChild(this.changePointElement);
	};

	// Viewify.prototype.round = function (value, decimals) {
	// 	return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
	// };

	Viewify.prototype.scroll = function () {
		var trigger = window.scrollY + (window.innerHeight * this.percent);

		if (this.dev) {
			this.changePointElement.style.top = trigger + 'px';
		}

		for (var i = 0, l = this.positions.length; i < l; i++) {
			var position = this.positions[i];

			if (trigger >= position.top && trigger <= position.bottom && this.current !== i) {
				this.current = i;
				if (this.listener) this.listener(i);
				break;
			}

		}

	};

	Viewify.prototype.listen = function (listener) {
		this.listener = this.listener || listener;
		this.scroll();

		if (this.animation) window.cancelAnimationFrame(this.animation);
		if (this.scrollEvent) window.removeEventListener(this.scrollEvent);
		if (this.resizeEvent) window.removeEventListener(this.resizeEvent);

		this.animation = window.requestAnimationFrame.bind(null, this.scroll.bind(this));
		this.scrollEvent = window.addEventListener('scroll', this.animation, false);
		this.resizeEvent = window.addEventListener('resize', this.animation, false);
	};

	return window.Viewify = Viewify;

}(this));
