FlickityDocs.modules['custom-nav'] = function( elem ) {
  'use strict';

  var carousel = elem.querySelector('.carousel');
  var flkty = new Flickity( carousel, {
    prevNextButtons: false,
    pageDots: false
  });

  var cellsButtonGroup = elem.querySelector('.button-group--cells');
  var cellsButtons = utils.makeArray( cellsButtonGroup.children );

  flkty.on( 'cellSelect', function() {
    var previousSelectedButton = cellsButtonGroup.querySelector('.is-selected');
    var selectedButton = cellsButtonGroup.children[ flkty.selectedIndex ];
    previousSelectedButton.classList.remove('is-selected');
    selectedButton.classList.add('is-selected');
  });

  filterBind( cellsButtonGroup, 'click', '.button', function( event ) {
    var index = cellsButtons.indexOf( event.target );
    flkty.select( index );
  });

  var previousButton = elem.querySelector('.button--previous');
  previousButton.addEventListener( 'click', function() {
    flkty.previous();
  });

  var nextButton = elem.querySelector('.button--next');
  nextButton.addEventListener( 'click', function() {
    flkty.next();
  });

};
