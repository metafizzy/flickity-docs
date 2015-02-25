FlickityDocs.modules['hero-gallery'] = function( elem ) {
  'use strict';

  // add video
  ( function() {
    var video = document.createElement('video');
    // stop if video not supported
    if ( !video || !video.canPlayType ||
      !video.canPlayType('video/mp4; codecs="avc1.42E01E"') ) {
        return;
    }

    video.setAttribute( 'loop', 'loop' );
    video.className = 'hero-illustration';
    video.src = 'img/flickity-illustration.mp4';

    // add video to page when loaded
    video.addEventListener( 'loadeddata', function() {
      var cellContent = elem.querySelector('.hero-gallery__cell--1 .hero-gallery__cell__content');
      video.play();
      cellContent.appendChild( video );
    }, false );
  })();

};
