(function(a){'use strict';function b(c){c.step(),c.render(),!c.done&&f&&(g=a.requestAnimationFrame(function(){b(c)}))}function c(){f=!0,h.forEach(function(c){g=a.requestAnimationFrame(function(){b(new Shapes({svg:j,close:!0,random:!0,infinite:!0,atts:{class:c}}))})})}function d(){for(f=!1,a.cancelAnimationFrame(g);j.lastChild;)j.removeChild(j.lastChild)}function e(){d(),c()}var f,g,h=['dynamic fl','purple fl','pink fl','green fl','orange fl','blue fl'],i=document.querySelector('.shapes'),j=document.createElementNS('http://www.w3.org/2000/svg','svg');j.setAttribute('viewbox','0 0 100 100'),j.setAttribute('xmlns','http://www.w3.org/2000/svg'),j.setAttribute('xmlns:xlink','http://www.w3.org/1999/xlink'),i.appendChild(j),a.addEventListener('load',function(){c(),document.querySelectorAll('.art')[0].addEventListener('click',e),document.querySelectorAll('.art')[1].addEventListener('click',e)});var k=new Viewify({offset:500,elements:[document.querySelector('.art.zero'),document.querySelector('.art.one'),document.querySelector('.about')]}),l=!0,m=document.body.querySelector('.arrow'),n=document.body.querySelector('.shapes'),o=document.head.querySelector('[name="theme-color"]');k.listen(function(a,b){0===b?(o.content='#222',n.style.opacity='1',document.body.className='theme-white'):1===b?(o.content='#fff',n.style.opacity='1',document.body.className='theme-black',l&&(l=!1,m.style.display='none')):2===b&&(o.content='#222',n.style.opacity='0',document.body.className='theme-white')})})(this);