FlickityDocs.modules.previous = function( elem ) {
  'use strict';

  var gallery = elem.querySelector('.gallery')
  var flkty = new Flickity( gallery );

  var previousButton = elem.querySelector('.button--previous');
  eventie.bind( previousButton, 'click', function() {
    flkty.previous();
  });

  var previousWrappedButton = elem.querySelector('.button--previous-wrapped');
  eventie.bind( previousWrappedButton, 'click', function() {
    flkty.previous( true );
  });

};
