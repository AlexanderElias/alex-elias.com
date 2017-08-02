var viewify = new Viewify({
	offset: 500,
	elements: [
		document.querySelector('.art.zero'),
		document.querySelector('.art.one'),
		document.querySelector('.about'),
	]
});

viewify.listen(function (element, index) {
	if (index === 0) {
		document.body.className = 'light';
		document.head.querySelector('[name="theme-color"]').content = '#222';
	} else if (index === 1) {
		document.body.className = 'dark';
		document.head.querySelector('[name="theme-color"]').content = '#fff';
	} else if (index === 2) {
		console.log('other');
	}
});

var ANIMATE;
var BLACK = '#222';
var BLUE = '#29f';
var GREEN = '#2f9';
var ORANGE = '#f92';
var PINK = '#f29';
var PURPLE = '#92f';
var STYLE = document.createElement('style');
var CONTAINER = document.querySelector('.shapes');
var SVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
var TEXT = document.createTextNode('.shapes svg { width: 100%; height: 100%; } .shapes * { transition: none; }');

STYLE.appendChild(TEXT);
CONTAINER.appendChild(STYLE);
CONTAINER.appendChild(SVG);

SVG.setAttribute('viewbox', '0 0 100 100');
SVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
SVG.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

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
			render(new Shapes({
				svg: SVG,
				random: true,
				infinite: true,
				atts: { fill: color }
			}));
		});
	});
}

function stop () {
	ANIMATE = false;
	SVG.innerHTML = '';
}

start();

document.querySelectorAll('.art')[0].addEventListener('click', function () {
	stop();
	setTimeout(start, 500);
});

document.querySelectorAll('.art')[1].addEventListener('click', function () {
	stop();
	setTimeout(start, 500);
});
