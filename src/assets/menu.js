
var i, l;
var menu = document.querySelector('.menu');
var menuIcon = document.querySelector('.menu-icon');
var menuList = document.querySelector('.menu-list');
var path = window.location.origin + window.location.pathname;

if (menuIcon) {
	for (i = 0; i < 3; i++) {
		menuIcon.appendChild(document.createElement('div'));
	}

	menuIcon.addEventListener('click', function () {
		menu.classList.toggle('active');
	});
}

for (i = 0, l = menuList.children.length; i < l; i++) {
	if (menuList.children[i].href === path) {
		menuList.children[i].classList.add('active');
	} else {
		menuList.children[i].classList.remove('active');
	}
}
