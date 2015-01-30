FlickityDocs.modules['position-cells'] = function( elem ) {
  'use strict';

  var utils = window.fizzyUIUtils;

  var gallery = elem.querySelector('.gallery');
  var flkty = new Flickity( gallery );

  flkty.on( 'staticClick', function( event ) {
    if ( !matchesSelector( event.target, '.button' ) ) {
      return;
    }

    var cellElem = utils.getParent( event.target, '.gallery-cell' );
    classie.toggle( cellElem, 'is-expanded' );
    flkty.positionCells();
    flkty.positionSliderAtSelected();
  });

};
