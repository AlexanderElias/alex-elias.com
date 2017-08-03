
(function (window) {

	var CLASS_NAMES = [
		'dynamic fl',
		'blue fl',
		'orange fl',
		'green fl',
		'pink fl',
		'purple fl',
	];

	var ANIMATE;
	var ANIMATION;
	var CONTAINER = document.querySelector('.shapes');
	var SVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

	SVG.setAttribute('viewbox', '0 0 100 100');
	SVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	SVG.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

	CONTAINER.appendChild(SVG);

	function render (shape) {
		shape.step();
		shape.render();

		if (!shape.done && ANIMATE) {
			ANIMATION = window.requestAnimationFrame(function () {
				render(shape);
			});
		}

	}

	function start () {
		ANIMATE = true;
		CLASS_NAMES.forEach(function (className) {
			ANIMATION = window.requestAnimationFrame(function () {
				render(new Shapes({
					svg: SVG,
					random: true,
					infinite: true,
					atts: { class: className }
				}));
			});
		});
	}

	function stop () {
		ANIMATE = false;
		window.cancelAnimationFrame(ANIMATION);
		SVG.innerHTML = '';
	}

	function reset () {
		stop();
		start();
	}

	document.addEventListener('DOMContentLoaded', function () {

		start();

		document.querySelectorAll('.art')[0].addEventListener('click', reset);
		document.querySelectorAll('.art')[1].addEventListener('click', reset);

		var viewify = new Viewify({
			offset: 500,
			elements: [
				document.querySelector('.art.zero'),
				document.querySelector('.art.one'),
				document.querySelector('.about')
			]
		});

		// viewify.dev();

		var isNotDone = true;
		var arrow = document.body.querySelector('.arrow');
		var shape = document.body.querySelector('.shapes');
		var theme = document.head.querySelector('[name="theme-color"]');

		viewify.listen(function (element, index) {
			if (index === 0) {
				theme.content = '#222';
				shape.style.opacity = '1';
				document.body.className = 'white bc';
			} else if (index === 1) {
				theme.content = '#fff';
				shape.style.opacity = '1';
				document.body.className = 'black bc';

				if (isNotDone) {
					isNotDone = false;
					arrow.style.display = 'none';
				}

			} else if (index === 2) {
				theme.content = '#222';
				shape.style.opacity = '0';
				document.body.className = 'white bc';
			}
		});



	});

}(this));
