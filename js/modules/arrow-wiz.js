FlickityDocs.modules['arrow-wiz'] = function( elem ) {
  'use strict';

  var wiz = elem;

  var canvas = wiz.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  var canvasWidth = canvas.width;
  var canvasHeight = canvas.height;

  function line( ax, ay, bx, by, color ) {
    if ( color ) {
      ctx.strokeStyle = color;
    }
    ctx.beginPath();
    ctx.moveTo( ax, ay );
    ctx.lineTo( bx, by );
    ctx.stroke();
    ctx.closePath();
  }

  function renderGrid() {
    var i, color;
    for ( i=1; i < 11; i++ ) {
      var y = i * 20 + 0.5;
      color = 'hsla(0, 0%, 0%, 0.1)';
      line( 0, y, canvasWidth, y, color );
    }
    for ( i=1; i < 11; i++ ) {
      var x = i * 20 + 0.5;
      color = 'hsla(0, 0%, 0%, 0.1)';
      line( x, 0, x, canvasHeight, color );
    }
  }

  renderGrid();

  // ----- control points ----- //

  var controlPoints = [];

  var draggies = [];
  for ( var i=0; i < 4; i++ ) {
    var pointElem = wiz.querySelector( '.arrow-wiz-illo__point--' + i );
    var draggie = new Draggabilly( pointElem, {
      containment: true,
      grid: [ 10, 10 ]
    });
    var onDragMove = getOnDragMove( draggie, i );
    draggie.on( 'dragMove', onDragMove );
    draggies.push( draggie );
    controlPoints[ i ] = calcDraggiePoint( draggie );
  }

  function getOnDragMove( draggie, index ) {
    return function onDragMove() {
      controlPoints[ index ] = calcDraggiePoint( draggie );
      render();
    };
  }

  function calcDraggiePoint( draggie ) {
    return {
      x: draggie.position.x / 2,
      y: 50 - draggie.position.y / 2
    };
  }

  function renderArrow() {
    ctx.strokeStyle = '#222';
    ctx.fillStyle = 'hsla(0, 0%, 0%, 0.5)';
    ctx.beginPath();
    ctx.moveTo( controlPoints[0].x * 2, 100 );
    ctx.lineTo( controlPoints[1].x * 2, 100 - controlPoints[1].y * 2 );
    ctx.lineTo( controlPoints[2].x * 2, 100 - controlPoints[2].y * 2 );
    ctx.lineTo( controlPoints[3].x * 2, 100 );
    ctx.lineTo( controlPoints[2].x * 2, 100 + controlPoints[2].y * 2 );
    ctx.lineTo( controlPoints[1].x * 2, 100 + controlPoints[1].y * 2 );
    ctx.lineTo( controlPoints[0].x * 2, 100 );
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  function renderCanvas() {
    ctx.clearRect( 0, 0, canvasWidth, canvasHeight );
    renderGrid();
    renderArrow();
  }

  // -----  ----- //

  var codeElem = wiz.querySelector('.arrow-wiz-code code');

  function renderCode() {
    codeElem.textContent = 'arrowShape: { \n' +
      '  x0: ' + controlPoints[0].x + ',\n' +
      '  x1: ' + controlPoints[1].x + ', y1: ' + controlPoints[1].y + ',\n' +
      '  x2: ' + controlPoints[2].x + ', y2: ' + controlPoints[2].y + ',\n' +
      '  x3: ' + controlPoints[3].x + '\n' +
      '}';
  }
  
  // -----  ----- //

  var flkty = new Flickity( wiz.querySelector('.gallery') );
  var prevPath = flkty.prevButton.element.querySelector('path');
  var nextPath = flkty.nextButton.element.querySelector('path');

  function renderFlickity() {
    var movements =  'M ' + controlPoints[0].x + ',50' +
      ' L ' + controlPoints[1].x + ',' + ( 50 + controlPoints[1].y ) +
      ' L ' + controlPoints[2].x + ',' + ( 50 + controlPoints[2].y ) +
      ' L ' + controlPoints[3].x + ',50 ' +
      ' L ' + controlPoints[2].x + ',' + ( 50 - controlPoints[2].y ) +
      ' L ' + controlPoints[1].x + ',' + ( 50 - controlPoints[1].y ) +
      ' Z';
    prevPath.setAttribute( 'd', movements );
    nextPath.setAttribute( 'd', movements );
  }

  // -----  ----- //

  function render() {
    renderCanvas();
    renderCode();
    renderFlickity();
  }

  render();

};
