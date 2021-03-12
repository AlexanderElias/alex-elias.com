
(function () {'use strict';

	var animate = function (e) {
		var br = document.getElementById('blueRingLg');
		var gr = document.getElementById('greenRingLg');
		var v = document.getElementById('v');

		if (e.type != 'mouseover') {
			setTimeout(function(){
				br.classList.toggle('rotate-y-360');
				gr.classList.toggle('rotate-x-360');
				v.classList.toggle('rotate-360');
			}, 500);
		} else {
			br.classList.toggle('rotate-y-360');
			gr.classList.toggle('rotate-x-360');
			v.classList.toggle('rotate-360');
		}
	};

	window.parent.window.addEventListener('load', animate);
	window.parent.document.querySelector('.logo-listener').addEventListener('mouseover', animate);

})();
