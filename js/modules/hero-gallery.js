FlickityDocs.modules['hero-gallery'] = function( elem ) {
  'use strict';


  ( function() {
    var video = elem.querySelector('video');
    if ( video && video.canPlayType  ) {
      video.play();
    }
  })();


  var firstCell = elem.querySelector('.hero-gallery__cell--1');

  function setVideoBGColor( video ) {
    // get background color, by displaying video on canvas
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var w = canvas.width = video.videoWidth;
    var h = canvas.height = video.videoHeight;
    ctx.drawImage( video, 0, 0, w, h );
    var imageData = ctx.getImageData( 0, 0, w, h );
    // get RGB at [10, 10]
    var pixelData = getPixelData( imageData.data, 10, 10, w );
    // set cell background color to match
    firstCell.style.backgroundColor = 'rgb(' + pixelData.red + ',' + pixelData.green +
      ',' + pixelData.blue + ')';
  }

  function getPixelData( data, x, y, w ) {
    var pixelIndex = x + y * w;
    pixelIndex *= 4;
    return {
      red: data[ pixelIndex + 0 ],
      green: data[ pixelIndex + 1 ],
      blue: data[ pixelIndex + 2 ],
      alpha: data[ pixelIndex + 3 ]
    };
  }

  // add video
  ( function() {
    return;
    var video = document.createElement('video');
    // stop if video not supported
    if ( !video || !video.canPlayType ||
      !video.canPlayType('video/mp4; codecs="avc1.42E01E"') ) {
        return;
    }

    video.setAttribute( 'loop', 'loop' );
    video.className = 'hero-illustration';

    var isVideoAdded = false;
    function addVideo() {
      if ( isVideoAdded ) {
        return;
      }
      console.log('add video');
      setVideoBGColor( video );
      firstCell.querySelector('.hero-gallery__cell__content').appendChild( video );
      isVideoAdded = true;
    }

    // add video to page when first frame loaded
    video.addEventListener( 'loadeddata', addVideo, false );

    video.addEventListener( 'canplaythrough', function() {
      console.log('can play');
      addVideo();
      video.play();
    }, false );

    video.src = 'img/flickity-illustration.mp4';
    video.load();

  })();

};
