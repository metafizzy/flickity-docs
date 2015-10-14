( function( window ) {

'use strict';

// map utils to fizzyUIUtils
window.utils = window.fizzyUIUtils;

var FlickityDocs = window.FlickityDocs = {};
FlickityDocs.modules = {};
// add modules:
// FlickityDocs.modules.moduleName = function( elem ) {...}

// ----- helpers ----- //

// for prepend, append, insert demos
FlickityDocs.makeCellElem = function( num ) {
  var cellElem = document.createElement('div');
  cellElem.className = 'gallery-cell';
  var number = document.createElement('span');
  number.className = 'gallery-cell__number';
  utils.setText( number, num );
  cellElem.appendChild( number );
  return cellElem;
};

// --------------------------  -------------------------- //

// init all modules, based on their data-js-module attribute
docReady( function() {
  var jsModuleElems = document.querySelectorAll('[data-js-module]');
  for ( var i=0, len = jsModuleElems.length; i < len; i++ ) {
    var elem = jsModuleElems[i];
    var moduleName = elem.getAttribute('data-js-module');
    var module = FlickityDocs.modules[ moduleName ];
    if ( module ) {
      module( elem );
    }
  }

  // refactor shirt
  var refactorTitle = document.querySelector('.refactor-shirt h3');
  var endDate = new Date( 2015, 9, 28 );
  var days = Math.round( ( endDate - new Date() ) / ( 1000 * 60 * 60 * 24 ) );
  refactorTitle.textContent = 'Refactor shirts. Only on sale for ' + days + ' more days.';
});

})( window );
