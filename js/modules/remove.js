FlickityDocs.modules.remove = function( elem ) {
  'use strict';

  var gallery = elem.querySelector('.gallery');
  var flkty = new Flickity( gallery );

  flkty.on( 'staticClick', function( event ) {
    if ( !matchesSelector( event.target, '.button' ) ) {
      return;
    }
    var cellElem = utils.getParent( event.target, '.gallery-cell' );
    flkty.remove( cellElem );
  });

};
