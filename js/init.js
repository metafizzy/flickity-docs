( function() {
'use strict';

// init all modules, based on their data-js-module attribute

  var jsModuleElems = document.querySelectorAll('[data-js-module]');
  for ( var i=0, len = jsModuleElems.length; i < len; i++ ) {
    var elem = jsModuleElems[i];
    var moduleName = elem.getAttribute('data-js-module');
    var module = FlickityDocs.modules[ moduleName ];
    if ( module ) {
      module( elem );
    }
  }

})();
