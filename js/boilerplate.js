// boilerplate
( function() {

// global namespace
let FlickityDocs = window.FlickityDocs = {};

// ----- utils ----- //

window.utils = window.fizzyUIUtils;

// ----- helpers ----- //

// for prepend, append, insert demos
FlickityDocs.makeCellElem = function( num ) {
  let cellElem = document.createElement('div');
  cellElem.className = 'carousel-cell';
  let number = document.createElement('span');
  number.className = 'carousel-cell__number';
  number.textContent = num;
  cellElem.appendChild( number );
  return cellElem;
};

window.filterBind = function( elem, type, selector, listener ) {
  elem.addEventListener( type, function( event ) {
    if ( event.target.matches( selector ) ) listener( event );
  } );
};

} )();
