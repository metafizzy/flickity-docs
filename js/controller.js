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
  cellElem.className = 'carousel-cell';
  var number = document.createElement('span');
  number.className = 'carousel-cell__number';
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
});

})( window );
