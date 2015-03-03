FlickityDocs.modules.remove = function( elem ) {
  'use strict';

  var gallery = elem.querySelector('.gallery');
  var flkty = new Flickity( gallery, {
    initialIndex: 1
  });

  flkty.on( 'staticClick', function( event, pointer, cellElem ) {
    if ( cellElem ) {
      flkty.remove( cellElem );
    }
  });

};
