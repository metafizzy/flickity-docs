FlickityDocs.modules['resize-show'] = function( elem ) {
  'use strict';

  var carousel = elem.querySelector('.carousel');
  var flkty = new Flickity( carousel );
  var button = elem.querySelector('.button');

  eventie.bind( button, 'click', function() {
    carousel.style.display = 'block';
    flkty.resize();
  });

};
