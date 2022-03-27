( function() {
'use strict';

// init all modules, based on their data-js attribute

  let jsModuleElems = document.querySelectorAll('[data-js]');
  for ( let i = 0; i < jsModuleElems.length; i++ ) {
    let elem = jsModuleElems[i];
    let moduleName = elem.getAttribute('data-js');
    let module = FlickityDocs[ moduleName ] || FizzyDocs[ moduleName ];
    if ( module ) {
      module( elem );
    }
  }

} )();
