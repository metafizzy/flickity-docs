FlickityDocs.modules.resize = function( elem ) {
  'use strict';

  var carousel = elem.querySelector('.carousel');
  var flkty = new Flickity( carousel );
  var button = elem.querySelector('.button');

  eventie.bind( button, 'click', function() {
    classie.toggle( carousel, 'is-expanded' );
    flkty.resize();
  });

};
