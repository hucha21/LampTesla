// utilities
var get = function (selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelector(selector);
};

var getAll = function (selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelectorAll(selector);
};

// setup typewriter effect in the terminal demo
if (document.getElementsByClassName('demo').length > 0) {
  var i = 0;
  var txt = `Projektovanje Mikroprocesorskih Sistema
            
            Članovi tima:

            - Ibrahim Beganović
            - Elsadet Dervišević
            - Elvis Hodžić
            - Husnija Hafurić
			
			Klikom na dugme ispod se lampa uključuje/isključuje na daljinu`;
  var speed = 30;

  function typeItOut () {
    if (i < txt.length) {
      document.getElementsByClassName('demo')[0].innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeItOut, speed);
    }
  }

  setTimeout(typeItOut, 1800);
}

// toggle tabs on codeblock
window.addEventListener("load", function() {
  // get all tab_containers in the document
  var tabContainers = getAll(".tab__container");

  // bind click event to each tab container
  for (var i = 0; i < tabContainers.length; i++) {
    get('.tab__menu', tabContainers[i]).addEventListener("click", tabClick);
  }

  // each click event is scoped to the tab_container
  function tabClick (event) {
    var scope = event.currentTarget.parentNode;
    var clickedTab = event.target;
    var tabs = getAll('.tab', scope);
    var panes = getAll('.tab__pane', scope);
    var activePane = get(`.${clickedTab.getAttribute('data-tab')}`, scope);

    // remove all active tab classes
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove('active');
    }

    // remove all active pane classes
    for (var i = 0; i < panes.length; i++) {
      panes[i].classList.remove('active');
    }

    // apply active classes on desired tab and pane
    clickedTab.classList.add('active');
    activePane.classList.add('active');
  }
});

//in page scrolling for documentaiton page
var btns = getAll('.js-btn');
var sections = getAll('.js-section');

function setActiveLink(event) {
  // remove all active tab classes
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove('selected');
  }

  event.target.classList.add('selected');
}

function smoothScrollTo(element, event) {
  setActiveLink(event);

  window.scrollTo({
    'behavior': 'smooth',
    'top': element.offsetTop - 20,
    'left': 0
  });
}

if (btns.length && sections.length > 0) {
// for (var i = 0; i<btns.length; i++) {
//   btns[i].addEventListener('click', function(event) {
//     smoothScrollTo(sections[i], event);
//   });
// }
  btns[0].addEventListener('click', function (event) {
    smoothScrollTo(sections[0], event);
  });

  btns[1].addEventListener('click', function (event) {
    smoothScrollTo(sections[1], event);
  });

  btns[2].addEventListener('click', function (event) {
    smoothScrollTo(sections[2], event);
  });

  btns[3].addEventListener('click', function (event) {
    smoothScrollTo(sections[3], event);
  });
}

// fix menu to page-top once user starts scrolling
window.addEventListener('scroll', function () {
  var docNav = get('.doc__nav > ul');

  if( docNav) {
    if (window.pageYOffset > 63) {
      docNav.classList.add('fixed');
    } else {
      docNav.classList.remove('fixed');
    }
  }
});

// responsive navigation
var topNav = get('.menu');
var icon = get('.toggle');

window.addEventListener('load', function(){
  function showNav() {
    if (topNav.className === 'menu') {
      topNav.className += ' responsive';
      icon.className += ' open';
    } else {
      topNav.className = 'menu';
      icon.classList.remove('open');
    }
  }
  icon.addEventListener('click', showNav);
});

//dougmad on/off
$(document).ready(function() {
    $('#turnOnBtn').on('click', function(e){
        $.ajax({
            url: '/led?status=on',
            method: 'GET',
            success: function(result) {
                console.log(result);
         }
        });
        e.preventDefault();
    });
    
    $('#turnOffBtn').on('click', function(e){
        $.ajax({
            url: '/led?status=off',
            method: 'GET',
            success: function(result) {
                console.log(result);
         }
        });
        e.preventDefault();
    });
    
    $('#btnToggle').on('click', function(e){
        let status;
        if($(this).text() == 'Turn On') {
            status = 'on';
        } else {
            status = 'off';
        }
        
        $.ajax({
            url: '/led?status=' + status,
            method: 'GET',
            success: function(result) {
                console.log(result);
         }
        });
        e.preventDefault();
    });
});