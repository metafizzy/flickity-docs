FlickityDocs.insert = function( elem ) {
  'use strict';

  let carousel = elem.querySelector('.carousel');
  let flkty = new Flickity( carousel, {
    initialIndex: 1,
  } );

  let cellNumber = flkty.cells.length + 1;
  let makeCellElem = FlickityDocs.makeCellElem;

  let button = elem.querySelector('.button');
  button.addEventListener( 'click', function() {
    let cellElems = [ makeCellElem( cellNumber++ ), makeCellElem( cellNumber++ ) ];
    flkty.insert( cellElems, 2 );
  } );

};
