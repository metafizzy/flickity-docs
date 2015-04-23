FlickityDocs.modules.reposition = function( elem ) {
  'use strict';

  var gallery = elem.querySelector('.gallery');
  var flkty = new Flickity( gallery );

  flkty.on( 'staticClick', function( event, pointer, cellElement ) {
    if ( !cellElement ) {
      return;
    }
    classie.toggle( cellElement, 'is-expanded' );
    flkty.reposition();
  });

};
