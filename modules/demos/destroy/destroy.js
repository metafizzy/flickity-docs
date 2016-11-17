FlickityDocs.destroy = function( elem ) {
  'use strict';

  var carousel = elem.querySelector('.carousel');
  var flkty = new Flickity( carousel );
  var isFlickity = true;

  var button = elem.querySelector('.button');
  button.addEventListener( 'click', function() {
    if ( isFlickity ) {
      flkty.destroy();
    } else {
      flkty = new Flickity( carousel );
    }
    isFlickity = !isFlickity;
  });

};
