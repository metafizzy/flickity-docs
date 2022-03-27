FlickityDocs['progress-bar'] = function( elem ) {
  'use strict';

  let carousel = elem.querySelector('.carousel');
  let progressBar = elem.querySelector('.progress-bar__bar');
  let flkty = new Flickity( carousel );

  flkty.on( 'scroll', function( progress ) {
    progress = Math.max( 0, Math.min( 1, progress ) );
    progressBar.style.width = progress * 100 + '%';
  } );

  flkty.reposition();
};
