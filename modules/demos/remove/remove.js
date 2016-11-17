FlickityDocs.remove = function( elem ) {
  'use strict';

  var carousel = elem.querySelector('.carousel');
  var flkty = new Flickity( carousel, {
    initialIndex: 1
  });

  flkty.on( 'staticClick', function( event, pointer, cellElem ) {
    if ( cellElem ) {
      flkty.remove( cellElem );
    }
  });

};
