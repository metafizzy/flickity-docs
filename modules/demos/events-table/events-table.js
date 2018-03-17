FlickityDocs['events-table'] = function( elem ) {
  'use strict';

  var table = elem.querySelector('.event-table');
  var tbody = table.querySelector('tbody');

  var carousel = elem.querySelector('.carousel');
  var flkty = new Flickity( carousel, {
    on: {
      ready: function() {
        logEvent('ready');
      },
    },
  });

  function logEvent( type, message ) {
    var row = document.createElement('tr');
    var timeCell = document.createElement('td');
    var eventCell = document.createElement('td');
    var messageCell = document.createElement('td');
    timeCell.className = 'event-table__time';
    eventCell.className = 'event-table__event';
    messageCell.className = 'event-table__message';
    var now = new Date();
    var timestamp = now.getHours() + ':' + now.getMinutes() + ':' +
      now.getSeconds() + '.' + now.getMilliseconds();
    timeCell.textContent = timestamp;
    eventCell.textContent = type;
    messageCell.textContent = message || '';
    row.appendChild( timeCell );
    row.appendChild( eventCell );
    row.appendChild( messageCell );
    var rows = tbody.children;
    if ( rows.length == 1 ) {
      tbody.appendChild( row );
    } else {
      tbody.insertBefore( row, rows[1] );
    }

    var lastRow = tbody.children[11];
    if ( lastRow ) {
      tbody.removeChild( lastRow );
    }
  }

  flkty.on( 'change', function( index ) {
    logEvent( 'change', 'changed to cell ' + ( index + 1 ) );
  });

  flkty.on( 'select', function( index ) {
    logEvent( 'select', 'selected cell ' + ( index + 1 ) );
  });

  flkty.on( 'settle', function( index ) {
    logEvent( 'settle', 'settled at cell ' + ( index + 1 ) );
  });

  flkty.on( 'staticClick', function( event, pointer, cellElem, cellIndex ) {
    var  message = cellElem ? 'clicked cell ' + cellIndex : '';
    logEvent( 'staticClick', message );
  });

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
    'pointerUp'
  ].forEach( function ( eventType ) {
    var listener = getListener( eventType );
    flkty.on( eventType, listener );
  });

};
