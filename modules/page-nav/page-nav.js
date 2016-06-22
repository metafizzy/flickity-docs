( function( window ) {
'use strict';

// -------------------------- Stickeroo -------------------------- //

// sticky elements, like the page nav
function Stickeroo( element ) {
  if ( !element ) {
    return;
  }
  this.element = element;
  this.isActive = false;
  this.isFixed = false;
  eventie.bind( window, 'resize', this );
  this.onresize();
}

Stickeroo.prototype.handleEvent = utils.handleEvent;

Stickeroo.prototype.onresize = function() {
  var afterContent = getComputedStyle( this.element, ':after' ).content;
  var size = getSize( this.element );
  // activate if :after { content: 'sticky' } and fits in window
  if ( afterContent.indexOf('sticky') != -1 && size.innerHeight <= window.innerHeight ) {
    this.activate();
  } else {
    this.deactivate();
  }
};

utils.debounceMethod( Stickeroo, 'onresize' );

Stickeroo.prototype.activate = function() {
  // do not re-activate
  if ( this.isActive ) {
    return;
  }
  this.isActive = true;
  this.originalY = this.element.getBoundingClientRect().top + window.pageYOffset;
  eventie.bind( window, 'scroll', this );
  this.onscroll();
};

Stickeroo.prototype.deactivate = function() {
  // do not re-activate
  if ( !this.isActive ) {
    return;
  }
  this.isActive = false;
  this.isFixed = false;
  classie.remove( this.element, 'is-fixed' );
  eventie.unbind( window, 'scroll', this );
};


function throttleProto( _class, methodName, threshold ) {
  // original method
  var method = _class.prototype[ methodName ];
  var timeoutName = methodName + 'Timeout';

  _class.prototype[ methodName ] = function() {
    if ( this[ timeoutName ] ) {
      return;
    }

    method.apply( this, arguments );
    var _this = this;
    this[ timeoutName ] = setTimeout( function() {
      method.apply( _this, arguments );
      delete _this[ timeoutName ];
    }, threshold || 100 );
  };
}

Stickeroo.prototype.onscroll = function() {
  var isFixed = window.pageYOffset >= this.originalY;
  if ( isFixed == this.isFixed ) {
    return;
  }

  classie.toggle( this.element, 'is-fixed' );
  this.isFixed = isFixed;
};

throttleProto( Stickeroo, 'onscroll', 50 );

window.Stickeroo = Stickeroo;

})( window );

// -------------------------- docReady -------------------------- //

docReady( function() {
  'use strict';

  var Stickeroo = window.Stickeroo;

  // init Stickeroo for all .js-stickeroo
  var stickerooElems = document.querySelectorAll('.js-stickeroo');

  for ( var i=0, len = stickerooElems.length; i < len; i++ ) {
    var elem = stickerooElems[i];
    new Stickeroo( elem );
  }

});
