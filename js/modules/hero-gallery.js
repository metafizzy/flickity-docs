FlickityDocs.modules['hero-gallery'] = function( elem ) {
  'use strict';

  var fitTextElems = elem.querySelectorAll('[data-fit-text]');

  for ( var i=0, len = fitTextElems.length; i < len; i++ ) {
    var fitTextElem = fitTextElems[i];
    fitTextElem.style.display = 'inline-block';
  }

  function resizeFitText() {
    for ( var i=0, len = fitTextElems.length; i < len; i++ ) {
      var fitTextElem = fitTextElems[i];
      fitTextElem.style.fontSize = '1.0em';
      var ratio = getSize( fitTextElem.parentNode ).innerWidth /
        getSize( fitTextElem ).width;
      var ratioAttr = fitTextElem.getAttribute('data-fit-text');
      ratio *= ratioAttr ? parseFloat( ratioAttr ) : 1;
      fitTextElem.style.fontSize = ratio + 'em';
    }
  }

  function debounce( fn, threshold ) {
    var timeout;
    return function() {
      clearTimeout( timeout );
      var _this = this;
      var args = arguments;
      function delayed() {
        fn.apply( _this, args );
      }
      timeout = setTimeout( delayed, threshold || 100 );
    };
  }

  eventie.bind( window, 'resize', debounce( resizeFitText) );

  setTimeout( resizeFitText );

};
