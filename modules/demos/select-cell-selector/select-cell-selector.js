FlickityDocs['select-cell-selector'] = function( elem ) {
  'use strict';

  var flkty = new Flickity( elem.querySelector('.carousel'), {
    groupCells: true,
  });

  var buttonGroup = elem.querySelector('.button-group');

  filterBind( buttonGroup, 'click', '.button', function( event ) {
    var selector = event.target.getAttribute('data-selector');
    flkty.selectCell( selector );
  });

};
