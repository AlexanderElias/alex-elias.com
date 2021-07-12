
(function () {
    'use strict';

    var fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = '/assets/font.css';
    document.head.appendChild(fontLink);

    var transitionLink = document.createElement('link');
    transitionLink.rel = 'stylesheet';
    transitionLink.href = '/assets/transition.css';
    document.head.appendChild(transitionLink);

    var CLASSES = [
        'dynamic fl',
        'purple fl',
        'pink fl',
        'green fl',
        'orange fl',
        'blue fl'
    ];

    var PAUSED = false;
    var STOPPED = false;
    var STARTED = false;
    var CONTAINER = document.querySelector('.shapes');
    var SVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    SVG.setAttribute('viewbox', '0 0 100 100');
    SVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    SVG.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    CONTAINER.appendChild(SVG);

    function render (shape) {
        shape.step();
        shape.render();
        if (shape.done || PAUSED || STOPPED) return;
        window.requestAnimationFrame(render.bind(null, shape));
    }

    function start () {
        PAUSED = false;
        STOPPED = false;
        if (STARTED) return;
        else STARTED = true;
        window.requestAnimationFrame(function () {
            CLASSES.forEach(function (data) {
                render(new Shapes({
                    svg: SVG,
                    close: true,
                    random: true,
                    infinite: true,
                    atts: { class: data }
                }));
            });
        });
    }

    function pause () {
        PAUSED = true;
        STOPPED = false;
        STARTED = false;
    }

    function stop () {
        STOPPED = true;
        PAUSED = false;
        STARTED = false;
        while (SVG.lastChild) SVG.removeChild(SVG.lastChild);
    }

    function reset () {
        stop();
        start();
    }

    start();
    document.querySelectorAll('.art')[ 0 ].addEventListener('click', reset);
    document.querySelectorAll('.art')[ 1 ].addEventListener('click', reset);

    var viewify = new Viewify({
        // dev: true,
        elements: [
            document.querySelector('.art.zero'),
            document.querySelector('.art.one'),
            document.querySelector('.art.two')
        ]
    });

    var isNotDone = true;
    var arrow = document.body.querySelector('.arrow');
    var shape = document.body.querySelector('.shapes');
    var theme = document.head.querySelector('[name="theme-color"]');

    viewify.listen(function (index) {
        switch (index) {
            case 0: {
                theme.content = '#222';
                shape.style.opacity = '1';
                document.body.className = 'theme-white';
                break;
            }
            case 1: {
                reset();
                theme.content = '#fff';
                shape.style.opacity = '1';
                document.body.className = 'theme-black';

                if (isNotDone) {
                    isNotDone = false;
                    arrow.style.display = 'none';
                }

                break;
            }
            case 2: {
                pause();
                theme.content = '#222';
                shape.style.opacity = '1';
                document.body.className = 'theme-white';
                break;
            }
        }
    });

}());
