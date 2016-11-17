FlickityDocs.player = function( elem ) {
  'use strict';

  var carousel = elem.querySelector('.carousel');
  var flkty = new Flickity( carousel, {
    autoPlay: 1000
  });

  var statusElem = elem.querySelector('.player-status');
  updateStatus();

  elem.querySelector('.button--play').addEventListener( 'click', function() {
    flkty.playPlayer();
    updateStatus();
  });

  elem.querySelector('.button--stop').addEventListener( 'click', function() {
    flkty.stopPlayer();
    updateStatus();
  });

  elem.querySelector('.button--pause').addEventListener( 'click', function() {
    flkty.pausePlayer();
    updateStatus();
  });

  elem.querySelector('.button--unpause').addEventListener( 'click', function() {
    flkty.unpausePlayer();
    updateStatus();
  });

  function updateStatus() {
    statusElem.textContent = flkty.player.state;
  }

};

