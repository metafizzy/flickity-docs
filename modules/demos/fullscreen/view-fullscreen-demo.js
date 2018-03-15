FlickityDocs['view-fullscreen-demo'] = function( elem ) {
  'use strict';

  var carousel = elem.querySelector('.carousel');
  var flkty = new Flickity( carousel, {
    fullscreen: true,
  });

  var button = elem.querySelector('.button');
  button.addEventListener( 'click', function() {
    flkty.viewFullscreen();
  });

};
