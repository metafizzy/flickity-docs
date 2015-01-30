FlickityDocs.modules.next = function( elem ) {
  'use strict';

  var gallery = elem.querySelector('.gallery');
  var flkty = new Flickity( gallery );

  var nextButton = elem.querySelector('.button--next');
  eventie.bind( nextButton, 'click', function() {
    flkty.next();
  });

  var nextWrappedButton = elem.querySelector('.button--next-wrapped');
  eventie.bind( nextWrappedButton, 'click', function() {
    flkty.next( true );
  });

};
