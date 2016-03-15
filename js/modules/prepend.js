FlickityDocs.modules.prepend = function( elem ) {
  'use strict';

  var carousel = elem.querySelector('.carousel');
  var flkty = new Flickity( carousel );

  var cellNumber = flkty.cells.length + 1;
  var makeCellElem = FlickityDocs.makeCellElem;

  var button = elem.querySelector('.button');
  eventie.bind( button, 'click', function() {
    flkty.prepend( [ makeCellElem( cellNumber++ ), makeCellElem( cellNumber++ ) ]);
  });

};
