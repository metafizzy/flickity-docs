FlickityDocs.modules.keyhole = function( elem ) {
  'use strict';

  var transformProp = typeof elem.style.transform == 'string' ?
    'transform' : 'WebkitTransform';

  var carousel = elem.querySelector('.carousel');
  var flkty = new Flickity( carousel, {
    imagesLoaded: true
  });

  var imgs = carousel.querySelectorAll('.keyhole-cell img');

  flkty.on( 'scroll', function() {
    flkty.slides.forEach( function( slide, i ) {
      var img = imgs[i];
      var x = ( slide.target + flkty.x ) * -1/3;
      img.style[ transformProp ] = 'translateX(' + x  + 'px)';
    });
  });
};
