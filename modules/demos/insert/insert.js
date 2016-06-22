FlickityDocs.modules.insert = function( elem ) {
  'use strict';

  var carousel = elem.querySelector('.carousel');
  var flkty = new Flickity( carousel, {
    initialIndex: 1
  });

  var cellNumber = flkty.cells.length + 1;
  var makeCellElem = FlickityDocs.makeCellElem;

  var button = elem.querySelector('.button');
  eventie.bind( button, 'click', function() {
    var cellElems = [ makeCellElem( cellNumber++ ), makeCellElem( cellNumber++ ) ];
    flkty.insert( cellElems, 2 );
  });

};
