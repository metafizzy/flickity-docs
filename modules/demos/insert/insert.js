FlickityDocs.insert = function( elem ) {
  'use strict';

  var carousel = elem.querySelector('.carousel');
  var flkty = new Flickity( carousel, {
    initialIndex: 1
  });

  var cellNumber = flkty.cells.length + 1;
  var makeCellElem = FlickityDocs.makeCellElem;

  var button = elem.querySelector('.button');
  button.addEventListener( 'click', function() {
    var cellElems = [ makeCellElem( cellNumber++ ), makeCellElem( cellNumber++ ) ];
    flkty.insert( cellElems, 2 );
  });

};
