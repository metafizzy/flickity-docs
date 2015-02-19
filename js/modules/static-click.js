FlickityDocs.modules['static-click'] = function( elem ) {
  'use strict';

  var utils = window.fizzyUIUtils;

  var gallery = elem.querySelector('.gallery');
  var flkty = new Flickity( gallery, {
    initialIndex: 1
  });
  var logger = elem.querySelector('.logger');

  flkty.on( 'staticClick', function( event, pointer, cellElement, cellIndex ) {
    if ( !cellElement ) {
      return;
    }

    var prevClickedCell = gallery.querySelector('.is-clicked');
    if ( prevClickedCell ) {
      classie.remove( prevClickedCell, 'is-clicked' );
    }
    classie.add( cellElement, 'is-clicked' );

    utils.setText( logger, 'Cell ' + ( cellIndex + 1 )  + ' clicked' );
  });

};
