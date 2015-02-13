FlickityDocs.modules.insert = function( elem ) {
  'use strict';

  var gallery = elem.querySelector('.gallery');
  var flkty = new Flickity( gallery, {
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
