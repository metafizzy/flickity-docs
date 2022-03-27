FlickityDocs['hero-carousel'] = function( elem ) {
  'use strict';

  let firstCell = elem.querySelector('.hero-carousel__cell--1');
  let illoImg = firstCell.querySelector('.hero-illustration');

  if ( illoImg ) {
    // switch out PNG for GIF
    let proxyGif = document.createElement('img');
    proxyGif.onload = function() {
      illoImg.src = proxyGif.src;
    };
    proxyGif.src = 'img/flickity-illustration.gif';
  }

};
