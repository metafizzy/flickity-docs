FlickityDocs.select = function( elem ) {
  'use strict';

  var utils = window.fizzyUIUtils;

  var flkty = new Flickity( elem.querySelector('.carousel') );

  var buttonGroup = elem.querySelector('.button-group');
  var buttons = utils.makeArray( buttonGroup.querySelectorAll('.button') );

  filterBind( buttonGroup, 'click', '.button', function( event ) {
    var index = buttons.indexOf( event.target );
    flkty.select( index );
  });

};
