FlickityDocs.modules.prepend = function( elem ) {
  'use strict';

  var gallery = elem.querySelector('.gallery');
  var flkty = new Flickity( gallery );

  var cellNumber = flkty.cells.length;

  function makeCellElem() {
    var cellElem = document.createElement('div');
    cellElem.className = 'gallery-cell';
    var number = document.createElement('span');
    number.className = 'gallery-cell__number';
    utils.setText( number, cellNumber++ );
    cellElem.appendChild( number );
    return cellElem;
  }

  var button = elem.querySelector('.button');
  eventie.bind( button, 'click', function() {
    flkty.prepend( [ makeCellElem(), makeCellElem() ]);
  });

};
