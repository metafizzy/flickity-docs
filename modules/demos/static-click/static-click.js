FlickityDocs['static-click'] = function( elem ) {

  let carousel = elem.querySelector('.carousel');
  let flkty = new Flickity( carousel, {
    initialIndex: 1,
  } );
  let logger = elem.querySelector('.logger');

  flkty.on( 'staticClick', function( event, pointer, cellElement, cellIndex ) {
    if ( !cellElement ) {
      return;
    }

    let prevClickedCell = carousel.querySelector('.is-clicked');
    if ( prevClickedCell ) {
      prevClickedCell.classList.remove('is-clicked');
    }
    cellElement.classList.add('is-clicked');

    logger.textContent = 'Cell ' + ( cellIndex + 1 ) + ' clicked';
  } );

};
