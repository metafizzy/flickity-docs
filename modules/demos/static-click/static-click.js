FlickityDocs.modules['static-click'] = function( elem ) {
  'use strict';

  var utils = window.fizzyUIUtils;

  var carousel = elem.querySelector('.carousel');
  var flkty = new Flickity( carousel, {
    initialIndex: 1
  });
  var logger = elem.querySelector('.logger');

  flkty.on( 'staticClick', function( event, pointer, cellElement, cellIndex ) {
    if ( !cellElement ) {
      return;
    }

    var prevClickedCell = carousel.querySelector('.is-clicked');
    if ( prevClickedCell ) {
      classie.remove( prevClickedCell, 'is-clicked' );
    }
    classie.add( cellElement, 'is-clicked' );

    utils.setText( logger, 'Cell ' + ( cellIndex + 1 )  + ' clicked' );
  });

};
