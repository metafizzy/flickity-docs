FlickityDocs.modules['progress-bar'] = function( elem ) {
  'use strict';

  var carousel = elem.querySelector('.carousel');
  var progressBar = elem.querySelector('.progress-bar__bar');
  var flkty = new Flickity( carousel );

  flkty.on( 'scroll', function( progress ) {
    progress = Math.max( 0, Math.min( 1, progress ) );
    progressBar.style.width = progress * 100 + '%';
  });

  flkty.reposition();
};
