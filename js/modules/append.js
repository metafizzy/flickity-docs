FlickityDocs.modules.append = function( elem ) {
  'use strict';

  var carousel = elem.querySelector('.carousel');
  var flkty = new Flickity( carousel, {
    initialIndex: 2
  });

  var cellNumber = flkty.cells.length + 1;
  var makeCellElem = FlickityDocs.makeCellElem;

  var button = elem.querySelector('.button');
  eventie.bind( button, 'click', function() {
    flkty.append( [ makeCellElem( cellNumber++ ), makeCellElem( cellNumber++ ) ]);
  });

};
