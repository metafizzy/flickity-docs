FlickityDocs.parallax = function( elem ) {

  let carousel = elem.querySelector('.carousel');
  let flkty = new Flickity( carousel );

  let cellRatio = 0.6;
  let bgRatio = 0.8;
  let fgRatio = 1.25;

  let background = elem.querySelector('.parallax__layer--bg');
  let foreground = elem.querySelector('.parallax__layer--fg');

  flkty.on( 'scroll', function( progress ) {
    moveParallaxLayer( background, bgRatio, progress );
    moveParallaxLayer( foreground, fgRatio, progress );
  } );

  flkty.reposition();

  function moveParallaxLayer( layer, layerRatio, progress ) {
    let decimal = 0.5 - ( 0.5 + progress * 4 ) * cellRatio * layerRatio;
    layer.style.left = decimal * 100 + '%';
  }
};
