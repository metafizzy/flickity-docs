FlickityDocs['view-fullscreen-demo'] = function( elem ) {

  let carousel = elem.querySelector('.carousel');
  let flkty = new Flickity( carousel, {
    fullscreen: true,
  } );

  let button = elem.querySelector('.button');
  button.addEventListener( 'click', function() {
    flkty.viewFullscreen();
  } );

};
