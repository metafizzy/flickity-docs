FlickityDocs.modules['custom-nav'] = function( elem ) {
  'use strict';

  var gallery = elem.querySelector('.gallery');
  var flkty = new Flickity( gallery, {
    prevNextButtons: false,
    pageDots: false
  });

  var cellsButtonGroup = elem.querySelector('.button-group--cells');
  var cellsButtons = utils.makeArray( cellsButtonGroup.children );

  flkty.on( 'select', function() {
    var previousSelectedButton = cellsButtonGroup.querySelector('.is-selected');
    var selectedButton = cellsButtonGroup.children[ flkty.selectedIndex ];
    classie.remove( previousSelectedButton, 'is-selected' );
    classie.add( selectedButton, 'is-selected' );
  });

  eventie.bind( cellsButtonGroup, 'click', function( event ) {
    if ( !matchesSelector( event.target, '.button' ) ) {
      return;
    }
    var index = utils.indexOf( cellsButtons, event.target );
    flkty.select( index );
  });

  var previousButton = elem.querySelector('.button--previous');
  eventie.bind( previousButton, 'click', function() {
    flkty.previous();
  });

  var nextButton = elem.querySelector('.button--next');
  eventie.bind( nextButton, 'click', function() {
    flkty.next();
  });

};
