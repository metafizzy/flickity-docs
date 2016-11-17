FlickityDocs['select-cell'] = function( elem ) {
  'use strict';

  var utils = window.fizzyUIUtils;

  var flkty = new Flickity( elem.querySelector('.carousel'), {
    groupCells: true,
  });

  var buttonGroup = elem.querySelector('.button-group');
  var buttons = utils.makeArray( buttonGroup.querySelectorAll('.button') );

  filterBind( buttonGroup, 'click', '.button', function( event ) {
    var index = buttons.indexOf( event.target );
    flkty.selectCell( index );
  });

};
