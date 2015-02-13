FlickityDocs.modules.prepend = function( elem ) {
  'use strict';

  var gallery = elem.querySelector('.gallery');
  var flkty = new Flickity( gallery );

  var cellNumber = flkty.cells.length + 1;
  var makeCellElem = FlickityDocs.makeCellElem;

  var button = elem.querySelector('.button');
  eventie.bind( button, 'click', function() {
    flkty.prepend( [ makeCellElem( cellNumber++ ), makeCellElem( cellNumber++ ) ]);
  });

};
