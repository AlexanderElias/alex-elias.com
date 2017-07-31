var i;

var path = window.location.origin + window.location.pathname;
var menu = document.querySelector('.menu');

for (i = 0; i < menu.children.length; i++) {
	if (menu.children[i].href === path) {
		menu.children[i].classList.add('active');
	} else {
		menu.children[i].classList.remove('active');
	}
}

var fills = document.querySelectorAll('.fill');

for (i = 0; i < fills.length; i++) {
	fills[i].style.minHeight = window.innerHeight + 'px';
}
