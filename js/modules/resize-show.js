FlickityDocs.modules['resize-show'] = function( elem ) {
  'use strict';

  var gallery = elem.querySelector('.gallery');
  var flkty = new Flickity( gallery );
  var button = elem.querySelector('.button');

  eventie.bind( button, 'click', function() {
    gallery.style.display = 'block';
    flkty.resize();
  });

};
