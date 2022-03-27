FlickityDocs.append = function( elem ) {

  let carousel = elem.querySelector('.carousel');
  let flkty = new Flickity( carousel, {
    initialIndex: 2,
  } );

  let cellNumber = flkty.cells.length + 1;
  let makeCellElem = FlickityDocs.makeCellElem;

  let button = elem.querySelector('.button');
  button.addEventListener( 'click', function() {
    flkty.append([ makeCellElem( cellNumber++ ), makeCellElem( cellNumber++ ) ]);
  } );

};
