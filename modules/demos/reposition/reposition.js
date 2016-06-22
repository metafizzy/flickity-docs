FlickityDocs.modules.reposition = function( elem ) {
  'use strict';

  var carousel = elem.querySelector('.carousel');
  var flkty = new Flickity( carousel );

  flkty.on( 'staticClick', function( event, pointer, cellElement ) {
    if ( !cellElement ) {
      return;
    }
    classie.toggle( cellElement, 'is-expanded' );
    flkty.reposition();
  });

};
