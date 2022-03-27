FlickityDocs.prepend = function( elem ) {

  let carousel = elem.querySelector('.carousel');
  let flkty = new Flickity( carousel );

  let cellNumber = flkty.cells.length + 1;
  let makeCellElem = FlickityDocs.makeCellElem;

  let button = elem.querySelector('.button');
  button.addEventListener( 'click', function() {
    flkty.prepend([ makeCellElem( cellNumber++ ), makeCellElem( cellNumber++ ) ]);
  } );

};
