FlickityDocs.keyhole = function( elem ) {

  let transformProp = typeof elem.style.transform == 'string' ?
    'transform' : 'WebkitTransform';

  let carousel = elem.querySelector('.carousel');
  let flkty = new Flickity( carousel, {
    imagesLoaded: true,
  } );

  let imgs = carousel.querySelectorAll('.keyhole-cell img');

  flkty.on( 'scroll', function() {
    flkty.slides.forEach( function( slide, i ) {
      let img = imgs[i];
      let x = ( slide.target + flkty.x ) * -1/3;
      img.style[ transformProp ] = 'translateX(' + x + 'px)';
    } );
  } );
};
