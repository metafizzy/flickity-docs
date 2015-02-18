FlickityDocs.modules['commercial-license-agreement'] = function( elem ) {
  'use strict';

  var licenseData = {
    developer: {
      title: 'Developer',
      'for-official': 'one (1) Licensed Developer',
      'for-plain': 'one individual Developer'
    },
    team: {
      title: 'Team',
      'for-official': 'up to eight (8) Licensed Developer(s)',
      'for-plain': 'up to 8 Developers'
    },
    organization: {
      title: 'Organization',
      'for-official': 'an unlimited number of Licensed Developer(s)',
      'for-plain': 'an unlimited number of Developers'
    }
  };

  // ----- clone h2 ----- //

  var buttonGroup = elem.querySelector('.button-group');

  var h2 = elem.querySelector('h2');
  var cloneH2 = h2.cloneNode( true );
  cloneH2.style.borderTop = 'none';
  cloneH2.style.marginTop = 0;
  cloneH2.id = '';
  utils.setText( h2, '' );

  buttonGroup.parentNode.insertBefore( cloneH2, buttonGroup.nextSibling );

  // ----- propertyElems ----- //

  var propertyElems = {};

  var dataPropertyElems = elem.querySelectorAll('[data-license-property]');
  for ( var i=0, len = dataPropertyElems.length; i < len; i++ ) {
    var dataPropertyElem = dataPropertyElems[i];
    var property = dataPropertyElem.getAttribute('data-license-property');
    propertyElems[ property ] = dataPropertyElem;
  }

  // ----- button ----- //

  function onButtonClick( button ) {
    // change selected class
    var prevSelected = buttonGroup.querySelector('.is-selected');
    if ( prevSelected ) {
      classie.remove( prevSelected, 'is-selected' );
    }
    classie.add( button, 'is-selected' );
    // get license data for developer, team, or organization
    var optionKey = button.getAttribute('data-license-option');
    var licenseOption = licenseData[ optionKey ];
    // set elements text accordingly
    for ( var property in propertyElems ) {
      utils.setText( propertyElems[ property ], licenseOption[ property ] );
    }
  }

  // click developer button
  onButtonClick( buttonGroup.querySelector('.button--developer') );

  eventie.bind( buttonGroup, 'click', function( event ) {
    // only .button clicks
    if ( matchesSelector( event.target, '.button' ) ) {
      onButtonClick( event.target );
    }
  });

};
