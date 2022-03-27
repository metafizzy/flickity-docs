FlickityDocs['arrow-wiz'] = function( elem ) {
  'use strict';

  let wiz = elem;

  let canvas = wiz.querySelector('canvas');
  let ctx = canvas.getContext('2d');
  let canvasWidth = canvas.width;
  let canvasHeight = canvas.height;

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

  let lightLineColor = 'hsla(210, 50%, 50%, 0.25)';
  let darkLineColor = 'hsla(210, 50%, 50%, 0.5)';

  function renderGrid() {
    let i, color;
    for ( i = 0; i < 11; i++ ) {
      let y = i * 20 + 0.5;
      color = i % 5 ? lightLineColor : darkLineColor;
      line( 0, y, canvasWidth, y, color );
    }
    for ( i = 0; i < 11; i++ ) {
      let x = i * 20 + 0.5;
      color = i % 5 ? lightLineColor : darkLineColor;
      line( x, 0, x, canvasHeight, color );
    }

    line( 0, canvasHeight - 0.5, canvasWidth, canvasHeight - 0.5, darkLineColor );
    line( canvasWidth - 0.5, 0, canvasWidth - 0.5, canvasHeight, darkLineColor );
  }

  renderGrid();

  // ----- control points ----- //

  let controlPoints = [];

  let draggies = [];
  for ( let i = 0; i < 4; i++ ) {
    let pointElem = wiz.querySelector( '.arrow-wiz-illo__point--' + i );
    let draggie = new Draggabilly( pointElem, {
      containment: true,
      grid: [ 10, 10 ],
    } );
    let onDragMove = getOnDragMove( draggie, i );
    draggie.on( 'dragMove', onDragMove );
    draggies.push( draggie );
    controlPoints[i] = calcDraggiePoint( draggie );
  }

  function getOnDragMove( draggie, index ) {
    return function onDragMove() {
      // set control point
      let point = calcDraggiePoint( draggie );
      controlPoints[ index ] = point;
      render();
    };
  }

  function calcDraggiePoint( draggie ) {
    return {
      x: draggie.position.x / 2,
      y: 50 - draggie.position.y / 2,
    };
  }

  function renderArrow() {
    ctx.strokeStyle = '#333';
    ctx.fillStyle = 'hsla(0, 0%, 0%, 0.4)';
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

  let codeElem = wiz.querySelector('.arrow-wiz-code code');

  function renderCode() {
    codeElem.textContent = 'arrowShape: { \n' +
      '  x0: ' + controlPoints[0].x + ',\n' +
      '  x1: ' + controlPoints[1].x + ', y1: ' + controlPoints[1].y + ',\n' +
      '  x2: ' + controlPoints[2].x + ', y2: ' + controlPoints[2].y + ',\n' +
      '  x3: ' + controlPoints[3].x + '\n' +
      '}';
  }

  // -----  ----- //

  let flkty = new Flickity( wiz.querySelector('.carousel'), {
    initialIndex: 2,
  } );
  let prevPath = flkty.prevButton.element.querySelector('path');
  let nextPath = flkty.nextButton.element.querySelector('path');

  function renderFlickity() {
    let movements = 'M ' + controlPoints[0].x + ',50' +
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
