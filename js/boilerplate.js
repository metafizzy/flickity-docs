// boilerplate
( function() {
'use strict';

// global namespace
var FlickityDocs = window.FlickityDocs = {};
// modules
FlickityDocs.modules = {};

// ----- utils ----- //

window.utils = fizzyUIUtils;

// ----- helpers ----- //

// for prepend, append, insert demos
FlickityDocs.makeCellElem = function( num ) {
  var cellElem = document.createElement('div');
  cellElem.className = 'carousel-cell';
  var number = document.createElement('span');
  number.className = 'carousel-cell__number';
  number.textContent = num;
  cellElem.appendChild( number );
  return cellElem;
};

})();
