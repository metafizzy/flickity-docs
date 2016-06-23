FlickityDocs.modules['events-table'] = function( elem ) {
  'use strict';

  var carousel = elem.querySelector('.carousel');
  var flkty = new Flickity( carousel );

  var table = elem.querySelector('.event-table');
  var tbody = table.querySelector('tbody');

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

  flkty.on( 'select', function() {
    logEvent( 'select', 'selected cell ' + ( flkty.selectedIndex + 1 ) );
  });

  flkty.on( 'settle', function() {
    logEvent( 'settle', 'settled at cell ' + ( flkty.selectedIndex + 1 ) );
  });

  flkty.on( 'staticClick', function( event ) {
    var message = '';
    if ( matchesSelector( event.target, '.carousel-cell' ) ) {
      var cell = flkty.getCell( event.target );
      var cellIndex = flkty.cells.indexOf( cell ) + 1;
      message = 'clicked cell ' + cellIndex;
    }
    logEvent( 'staticClick', message );
  });

  var eventTypes = [
    'dragStart',
    'dragMove',
    'dragEnd',
    'pointerDown',
    'pointerMove',
    'pointerUp'
  ];

  function getListener( eventType ) {
    return function() {
      logEvent( eventType );
    };
  }

  for ( var i=0, len = eventTypes.length; i < len; i++ ) {
    var eventType = eventTypes[i];
    var listener = getListener( eventType );
    flkty.on( eventType, listener );
  }

};
