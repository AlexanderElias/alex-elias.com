
// var menu = document.querySelector('.menu');
//
// if (menu) {
// 	var path = window.location.origin + window.location.pathname;
// 	for (var i = 0; i < menu.children.length; i++) {
// 		if (menu.children[i].href === path) {
// 			menu.children[i].classList.add('active');
// 		} else {
// 			menu.children[i].classList.remove('active');
// 		}
// 	}
// }

// fonts
var fonts = document.createElement('link');
fonts.rel = 'stylesheet';
fonts.href = '/assets/font-roboto-mono.min.css';
document.head.insertBefore(fonts, document.head.querySelector('link'));

// icons
var icons = document.createElement('link');
icons.rel = 'stylesheet';
icons.href = '/assets/font-awesome.min.css';
document.head.insertBefore(icons, document.head.querySelector('link'));

// fill
var sStyle = document.createTextNode('.winhi { min-height: ' + window.innerHeight + 'px; }');
var eStyle = document.createElement('style');
eStyle.appendChild(sStyle);
document.head.appendChild(eStyle);

// scroll
function scroll (x, y, d) {
	x = x || 0;
	y = y || 0;
	d = d || 21;

	if (y > window.scrollY || x > window.scrollX) {
		window.scrollBy(
			x > 0 ? d : 0,
			y > 0 ? d : 0
		);
		window.requestAnimationFrame(scroll.bind(null, x, y, d));
	}
}

var clickElement = document.querySelector('.arrow');
var scrollElement = document.querySelector('main > div:nth-child(2)');

if (scrollElement && clickElement) {
	clickElement.addEventListener('click', function () {
		scroll(0, scrollElement.offsetTop);
	});
}
