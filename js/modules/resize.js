FlickityDocs.modules.resize = function( elem ) {
  'use strict';

  var gallery = elem.querySelector('.gallery');
  var flkty = new Flickity( gallery );
  var button = elem.querySelector('.button');

  eventie.bind( button, 'click', function() {
    classie.toggle( gallery, 'is-expanded' );
    flkty.resize();
  });

};
