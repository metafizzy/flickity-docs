FlickityDocs.modules['select-instant'] = function( elem ) {
  'use strict';

  var utils = window.fizzyUIUtils;

  var flkty = new Flickity( elem.querySelector('.carousel') );

  var buttonGroup = elem.querySelector('.button-group');
  var buttons = utils.makeArray( buttonGroup.querySelectorAll('.button') );

  eventie.bind( buttonGroup, 'click', function( event ) {
    // filter for button clicks
    if ( !matchesSelector( event.target, '.button' ) ) {
      return;
    }

    var index = utils.indexOf( buttons, event.target );
    flkty.select( index, false, true );
  });

};
