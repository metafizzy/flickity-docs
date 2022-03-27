( function( window ) {

// -------------------------- Stickeroo -------------------------- //

// sticky elements, like the page nav
function Stickeroo( element ) {
  if ( !element ) {
    return;
  }
  this.element = element;
  this.isActive = false;
  this.isFixed = false;
  window.addEventListener( 'resize', this );
  this.onresize();
}

Stickeroo.prototype.handleEvent = utils.handleEvent;

Stickeroo.prototype.onresize = function() {
  let afterContent = getComputedStyle( this.element, ':after' ).content;
  let size = getSize( this.element );
  // activate if :after { content: 'sticky' } and fits in window
  if ( afterContent.indexOf('sticky') !== -1 && size.innerHeight <= window.innerHeight ) {
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
  window.addEventListener( 'scroll', this );
  this.onscroll();
};

Stickeroo.prototype.deactivate = function() {
  // do not re-activate
  if ( !this.isActive ) {
    return;
  }
  this.isActive = false;
  this.isFixed = false;
  this.element.classList.remove('is-fixed');
  window.removeEventListener( 'scroll', this );
};

function throttleProto( _class, methodName, threshold ) {
  // original method
  let method = _class.prototype[ methodName ];
  let timeoutName = methodName + 'Timeout';

  _class.prototype[ methodName ] = function() {
    if ( this[ timeoutName ] ) {
      return;
    }

    method.apply( this, arguments );
    let _this = this;
    this[ timeoutName ] = setTimeout( function() {
      method.apply( _this, arguments );
      delete _this[ timeoutName ];
    }, threshold || 100 );
  };
}

Stickeroo.prototype.onscroll = function() {
  let isFixed = window.pageYOffset >= this.originalY;
  if ( isFixed === this.isFixed ) return;

  this.element.classList.toggle('is-fixed');
  this.isFixed = isFixed;
};

throttleProto( Stickeroo, 'onscroll', 50 );

window.Stickeroo = Stickeroo;

} )( window );
