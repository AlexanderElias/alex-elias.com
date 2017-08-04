
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

var transition = document.createElement('link');
transition.rel = 'stylesheet';
transition.href = '/assets/transition.css';
document.head.appendChild(transition);

var fonts = document.createElement('link');
fonts.rel = 'stylesheet';
fonts.href = '/assets/roboto.css';
document.head.appendChild(fonts);

// scroll
// function scroll (x, y, d) {
// 	x = x || 0;
// 	y = y || 0;
// 	d = d || 21;
//
// 	if (y > window.scrollY || x > window.scrollX) {
// 		window.scrollBy(
// 			x > 0 ? d : 0,
// 			y > 0 ? d : 0
// 		);
// 		window.requestAnimationFrame(scroll.bind(null, x, y, d));
// 	}
// }
//
// var clickElement = document.querySelector('.arrow');
// var scrollElement = document.querySelector('main > div:nth-child(2)');
//
// if (scrollElement && clickElement) {
// 	clickElement.addEventListener('click', function () {
// 		scroll(0, scrollElement.offsetTop);
// 	});
// }
