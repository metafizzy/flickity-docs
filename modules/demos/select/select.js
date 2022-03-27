FlickityDocs.select = function( elem ) {
  'use strict';

  let utils = window.fizzyUIUtils;

  let flkty = new Flickity( elem.querySelector('.carousel') );

  let buttonGroup = elem.querySelector('.button-group');
  let buttons = utils.makeArray( buttonGroup.querySelectorAll('.button') );

  filterBind( buttonGroup, 'click', '.button', function( event ) {
    let index = buttons.indexOf( event.target );
    flkty.select( index );
  } );

};
