FlickityDocs.modules.parallax = function( elem ) {
  'use strict';

  var carousel = elem.querySelector('.carousel');
  var flkty = new Flickity( carousel );

  var cellRatio = 0.6;
  var bgRatio = 0.8;
  var fgRatio = 1.25;

  var background = elem.querySelector('.parallax__layer--bg');
  var foreground = elem.querySelector('.parallax__layer--fg');

  flkty.on( 'scroll', function( progress ) {
    moveParallaxLayer( background, bgRatio, progress );
    moveParallaxLayer( foreground, fgRatio, progress );
  });

  flkty.reposition();

  function moveParallaxLayer( layer, layerRatio, progress ) {
    layer.style.left = ( 0.5 - ( 0.5 + progress * 4 ) * cellRatio * layerRatio ) * 100 + '%';
  }
};
