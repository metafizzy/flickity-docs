FlickityDocs.resize = function( elem ) {
  'use strict';

  var carousel = elem.querySelector('.carousel');
  var flkty = new Flickity( carousel );
  var button = elem.querySelector('.button');

  button.addEventListener( 'click', function() {
    carousel.classList.toggle('is-expanded');
    flkty.resize();
  });

};
