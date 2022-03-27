FlickityDocs['events-table'] = function( elem ) {
  'use strict';

  let table = elem.querySelector('.event-table');
  let tbody = table.querySelector('tbody');

  let carousel = elem.querySelector('.carousel');
  let flkty = new Flickity( carousel, {
    on: {
      ready: function() {
        logEvent('ready');
      },
    },
  } );

  function logEvent( type, message ) {
    let row = document.createElement('tr');
    let timeCell = document.createElement('td');
    let eventCell = document.createElement('td');
    let messageCell = document.createElement('td');
    timeCell.className = 'event-table__time';
    eventCell.className = 'event-table__event';
    messageCell.className = 'event-table__message';
    let now = new Date();
    let timestamp = now.getHours() + ':' + now.getMinutes() + ':' +
      now.getSeconds() + '.' + now.getMilliseconds();
    timeCell.textContent = timestamp;
    eventCell.textContent = type;
    messageCell.textContent = message || '';
    row.appendChild( timeCell );
    row.appendChild( eventCell );
    row.appendChild( messageCell );
    let rows = tbody.children;
    if ( rows.length == 1 ) {
      tbody.appendChild( row );
    } else {
      tbody.insertBefore( row, rows[1] );
    }

    let lastRow = tbody.children[11];
    if ( lastRow ) {
      tbody.removeChild( lastRow );
    }
  }

  flkty.on( 'change', function( index ) {
    logEvent( 'change', 'changed to cell ' + ( index + 1 ) );
  } );

  flkty.on( 'select', function( index ) {
    logEvent( 'select', 'selected cell ' + ( index + 1 ) );
  } );

  flkty.on( 'settle', function( index ) {
    logEvent( 'settle', 'settled at cell ' + ( index + 1 ) );
  } );

  flkty.on( 'staticClick', function( event, pointer, cellElem, cellIndex ) {
    let message = cellElem ? 'clicked cell ' + cellIndex : '';
    logEvent( 'staticClick', message );
  } );

  function getListener( eventType ) {
    return function() {
      logEvent( eventType );
    };
  }

  // add generic listeners for these event types
  [
    'dragStart',
    'dragMove',
    'dragEnd',
    'pointerDown',
    'pointerMove',
    'pointerUp',
  ].forEach( function( eventType ) {
    let listener = getListener( eventType );
    flkty.on( eventType, listener );
  } );

};
