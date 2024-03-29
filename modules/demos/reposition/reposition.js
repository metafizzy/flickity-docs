FlickityDocs.reposition = function( elem ) {

  let carousel = elem.querySelector('.carousel');
  let flkty = new Flickity( carousel );

  flkty.on( 'staticClick', function( event, pointer, cellElement ) {
    if ( !cellElement ) {
      return;
    }
    cellElement.classList.toggle('is-expanded');
    flkty.reposition();
  } );

};
