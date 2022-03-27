FlickityDocs.destroy = function( elem ) {

  let carousel = elem.querySelector('.carousel');
  let flkty = new Flickity( carousel );
  let isFlickity = true;

  let button = elem.querySelector('.button');
  button.addEventListener( 'click', function() {
    if ( isFlickity ) {
      flkty.destroy();
    } else {
      flkty = new Flickity( carousel );
    }
    isFlickity = !isFlickity;
  } );

};
