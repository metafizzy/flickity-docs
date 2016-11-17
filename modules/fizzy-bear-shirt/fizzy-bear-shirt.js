FlickityDocs['fizzy-bear-shirt'] = function( elem ) {
  'use strict';

  var endDate = new Date( 2016, 5, 9 );
  var days = Math.round( ( endDate - new Date() ) / ( 1000 * 60 * 60 * 24 ) );
  elem.querySelector('.fizzy-bear-shirt__title').textContent = 'Rainbow bear shirts. ' +
    'Only on sale for ' + days + ' more days.';

};
