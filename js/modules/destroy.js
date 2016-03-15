FlickityDocs.modules.destroy = function( elem ) {
  'use strict';

  var carousel = elem.querySelector('.carousel');
  var flkty = new Flickity( carousel );
  var isFlickity = true;

  var button = elem.querySelector('.button');
  eventie.bind( button, 'click', function() {
    if ( isFlickity ) {
      flkty.destroy();
    } else {
      flkty = new Flickity( carousel );
    }
    isFlickity = !isFlickity;
  });

};
