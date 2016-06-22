FlickityDocs.modules.previous = function( elem ) {
  'use strict';

  var carousel = elem.querySelector('.carousel');
  var flkty = new Flickity( carousel );

  var previousButton = elem.querySelector('.button--previous');
  eventie.bind( previousButton, 'click', function() {
    flkty.previous();
  });

  var previousWrappedButton = elem.querySelector('.button--previous-wrapped');
  eventie.bind( previousWrappedButton, 'click', function() {
    flkty.previous( true );
  });

};
