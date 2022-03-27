FlickityDocs.next = function( elem ) {
  'use strict';

  let carousel = elem.querySelector('.carousel');
  let flkty = new Flickity( carousel );

  let nextButton = elem.querySelector('.button--next');
  nextButton.addEventListener( 'click', function() {
    flkty.next();
  } );

  let nextWrappedButton = elem.querySelector('.button--next-wrapped');
  nextWrappedButton.addEventListener( 'click', function() {
    flkty.next( true );
  } );

};
