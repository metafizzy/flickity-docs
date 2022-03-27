FlickityDocs.remove = function( elem ) {

  let carousel = elem.querySelector('.carousel');
  let flkty = new Flickity( carousel, {
    initialIndex: 1,
  } );

  flkty.on( 'staticClick', function( event, pointer, cellElem ) {
    if ( cellElem ) {
      flkty.remove( cellElem );
    }
  } );

};
