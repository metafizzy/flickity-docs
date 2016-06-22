FlickityDocs.modules.reposition = function( elem ) {
  'use strict';

  var carousel = elem.querySelector('.carousel');
  var flkty = new Flickity( carousel );

  flkty.on( 'staticClick', function( event, pointer, cellElement ) {
    if ( !cellElement ) {
      return;
    }
    cellElement.classList.toggle('is-expanded');
    flkty.reposition();
  });

};
