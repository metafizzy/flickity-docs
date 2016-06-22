FlickityDocs.modules['static-click'] = function( elem ) {
  'use strict';

  var carousel = elem.querySelector('.carousel');
  var flkty = new Flickity( carousel, {
    initialIndex: 1
  });
  var logger = elem.querySelector('.logger');

  flkty.on( 'staticClick', function( event, pointer, cellElement, cellIndex ) {
    if ( !cellElement ) {
      return;
    }

    var prevClickedCell = carousel.querySelector('.is-clicked');
    if ( prevClickedCell ) {
      prevClickedCell.classList.remove('is-clicked');
    }
    cellElement.classList.add('is-clicked');

    logger.textContent = 'Cell ' + ( cellIndex + 1 )  + ' clicked';
  });

};
