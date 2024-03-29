FlickityDocs['select-cell'] = function( elem ) {

  let utils = window.fizzyUIUtils;

  let flkty = new Flickity( elem.querySelector('.carousel'), {
    groupCells: true,
  } );

  let buttonGroup = elem.querySelector('.button-group');
  let buttons = utils.makeArray( buttonGroup.querySelectorAll('.button') );

  filterBind( buttonGroup, 'click', '.button', function( event ) {
    let index = buttons.indexOf( event.target );
    flkty.selectCell( index );
  } );

};
