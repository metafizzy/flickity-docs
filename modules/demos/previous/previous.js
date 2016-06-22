FlickityDocs.modules.previous = function( elem ) {
  'use strict';

  var carousel = elem.querySelector('.carousel');
  var flkty = new Flickity( carousel );

  var previousButton = elem.querySelector('.button--previous');
  previousButton.addEventListener( 'click', function() {
    flkty.previous();
  });

  var previousWrappedButton = elem.querySelector('.button--previous-wrapped');
  previousWrappedButton.addEventListener( 'click', function() {
    flkty.previous( true );
  });

};
