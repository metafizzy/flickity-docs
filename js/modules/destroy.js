FlickityDocs.modules.destroy = function( elem ) {
  'use strict';

  var gallery = elem.querySelector('.gallery');
  var flkty = new Flickity( gallery );
  var isFlickity = true;

  var button = elem.querySelector('.button');
  eventie.bind( button, 'click', function() {
    if ( isFlickity ) {
      flkty.destroy();
    } else {
      flkty = new Flickity( gallery );
    }
    isFlickity = !isFlickity;
  });

};
