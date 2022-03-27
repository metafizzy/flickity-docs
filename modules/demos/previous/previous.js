FlickityDocs.previous = function( elem ) {
  'use strict';

  let carousel = elem.querySelector('.carousel');
  let flkty = new Flickity( carousel );

  let previousButton = elem.querySelector('.button--previous');
  previousButton.addEventListener( 'click', function() {
    flkty.previous();
  } );

  let previousWrappedButton = elem.querySelector('.button--previous-wrapped');
  previousWrappedButton.addEventListener( 'click', function() {
    flkty.previous( true );
  } );

};
