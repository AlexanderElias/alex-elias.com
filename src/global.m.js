
var menuLink = document.createElement('link');
menuLink.rel = 'stylesheet';
menuLink.href = '/assets/menu.css';
document.head.appendChild(menuLink);

var fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = '/assets/font.css';
// fontLink.href = 'https://fonts.googleapis.com/css?family=Lato:300,400,700|Roboto+Mono:100,300';
document.head.appendChild(fontLink);

var transitionLink = document.createElement('link');
transitionLink.rel = 'stylesheet';
transitionLink.href = '/assets/transition.css';
document.head.appendChild(transitionLink);

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
