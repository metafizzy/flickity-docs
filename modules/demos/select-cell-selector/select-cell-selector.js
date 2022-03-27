FlickityDocs['select-cell-selector'] = function( elem ) {

  let flkty = new Flickity( elem.querySelector('.carousel'), {
    groupCells: true,
  } );

  let buttonGroup = elem.querySelector('.button-group');

  filterBind( buttonGroup, 'click', '.button', function( event ) {
    let selector = event.target.getAttribute('data-selector');
    flkty.selectCell( selector );
  } );

};
