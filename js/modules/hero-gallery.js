FlickityDocs.modules['hero-gallery'] = function( elem ) {
  'use strict';

  var firstCell = elem.querySelector('.hero-gallery__cell--1');
  var illoImg = firstCell.querySelector('.hero-illustration');

  if ( illoImg ) {
    // switch out PNG for GIF
    var proxyGif = document.createElement('img');
    eventie.bind( proxyGif, 'load', function() {
      illoImg.src = proxyGif.src;
    });
    proxyGif.src = 'img/flickity-illustration.gif';
  }

};
