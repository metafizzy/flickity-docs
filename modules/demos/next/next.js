FlickityDocs.next = function( elem ) {
  'use strict';

  var carousel = elem.querySelector('.carousel');
  var flkty = new Flickity( carousel );

  var nextButton = elem.querySelector('.button--next');
  nextButton.addEventListener( 'click', function() {
    flkty.next();
  });

  var nextWrappedButton = elem.querySelector('.button--next-wrapped');
  nextWrappedButton.addEventListener( 'click', function() {
    flkty.next( true );
  });

};
