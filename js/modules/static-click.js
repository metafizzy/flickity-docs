FlickityDocs.modules['static-click'] = function( elem ) {
  'use strict';

  var utils = window.fizzyUIUtils;

  var gallery = elem.querySelector('.gallery');
  var flkty = new Flickity( gallery );
  var logger = elem.querySelector('.logger');

  flkty.on( 'staticClick', function( event, pointer, clickedCellIndex, clickedCellElement ) {
    if ( typeof clickedCellIndex != 'number' ) {
      return;
    }

    var prevClickedCell = gallery.querySelector('.is-clicked');
    if ( prevClickedCell ) {
      classie.remove( prevClickedCell, 'is-clicked' );
    }
    classie.add( clickedCellElement, 'is-clicked' );

    utils.setText( logger, 'Cell ' + ( clickedCellIndex + 1 )  + ' clicked' );
  });

};
