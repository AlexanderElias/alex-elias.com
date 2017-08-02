window.Viewify = (function(window) {

	function Viewify (options) {
		this.data = options.data;
		this.listener = options.listener;
		this.offset = options.offset || 0;
		this.elements = options.elements || [];
		this.visible = options.visible || 0.4;

		this.length = this.elements.length;
	}

	Viewify.prototype.round = function (value, decimals) {
		return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
	};

	Viewify.prototype.scroll = function (listener) {
		var position = window.scrollY;
		var bodyHeight = document.body.offsetHeight;

		this.elements.forEach(function (element, index) {
			var start = element.offsetTop - this.offset;
			start = start > 0 ? start : 0;

			var height = element.offsetHeight - this.offset;

			var stop = start+height;
			stop = stop > bodyHeight ? bodyHeight : stop;

			if (start <= position && position <= stop) {
				if (listener) {
					listener(element, index, position);
				}
			}
		}, this);

	};

	Viewify.prototype.listen = function (listener) {
		listener = listener || this.listener;

		if (this.animation) {
			window.cancelAnimationFrame(this.animation);
		}

		if (this.event) {
			window.removeEventListener(this.event);
		}

		this.animation = window.requestAnimationFrame.bind(null, this.scroll.bind(this, listener));
		this.event = window.addEventListener('scroll', this.animation);
	};

	return Viewify;

}(this));
