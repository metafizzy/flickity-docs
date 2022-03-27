FlickityDocs['resize-show'] = function( elem ) {
  'use strict';

  let carousel = elem.querySelector('.carousel');
  let flkty = new Flickity( carousel );
  let button = elem.querySelector('.button');

  button.addEventListener( 'click', function() {
    carousel.style.display = 'block';
    flkty.resize();
  } );

};
