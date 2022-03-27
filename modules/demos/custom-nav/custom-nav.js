FlickityDocs['custom-nav'] = function( elem ) {
  'use strict';

  let carousel = elem.querySelector('.carousel');
  let flkty = new Flickity( carousel, {
    prevNextButtons: false,
    pageDots: false,
  } );

  let cellsButtonGroup = elem.querySelector('.button-group--cells');
  let cellsButtons = utils.makeArray( cellsButtonGroup.children );

  flkty.on( 'select', function() {
    let previousSelectedButton = cellsButtonGroup.querySelector('.is-selected');
    let selectedButton = cellsButtonGroup.children[ flkty.selectedIndex ];
    previousSelectedButton.classList.remove('is-selected');
    selectedButton.classList.add('is-selected');
  } );

  filterBind( cellsButtonGroup, 'click', '.button', function( event ) {
    let index = cellsButtons.indexOf( event.target );
    flkty.select( index );
  } );

  let previousButton = elem.querySelector('.button--previous');
  previousButton.addEventListener( 'click', function() {
    flkty.previous();
  } );

  let nextButton = elem.querySelector('.button--next');
  nextButton.addEventListener( 'click', function() {
    flkty.next();
  } );

};
