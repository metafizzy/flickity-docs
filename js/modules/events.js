FlickityDocs.modules.events = function( elem ) {
  'use strict';

  var gallery = elem.querySelector('.gallery');
  var flkty = new Flickity( gallery );

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
    utils.setText( timeCell, timestamp );
    utils.setText( eventCell, type );
    utils.setText( messageCell, message || '' );
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

  flkty.on( 'cellSelect', function() {
    logEvent( 'cellSelect', 'select cell ' + ( flkty.selectedIndex + 1 ) );
  });

  flkty.on( 'settle', function() {
    logEvent( 'settle', 'settled at cell ' + ( flkty.selectedIndex + 1 ) );
  });

  flkty.on( 'staticClick', function( event ) {
    var message = '';
    if ( matchesSelector( event.target, '.gallery-cell' ) ) {
      var cell = flkty.getCell( event.target );
      var cellIndex = utils.indexOf( flkty.cells, cell ) + 1;
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
