var cheerio = require('cheerio');
var through2 = require('through2');

module.exports = function pageNav() {
  return through2.obj( function( file, enc, callback ) {
    var $ = cheerio.load( file.contents.toString() );
    var pageNavHtml = '\n';
    // query each h2, h3, h4
    $('.main h2, .main h3, .main h4').each( function( i, header ) {
      var $header = $( header );
      // replace non alphanumeric to hyphens
      var title = $header.text();
      var slug = title.replace( /[^\w\d]+/gi, '-' )
        // trim trailing hyphens
        .replace( /^\-+/, '' ).replace( /\-+$/, '' ).toLowerCase();
      // set id slug
      $header.attr( 'id', slug );
      // add item to pageNav
      pageNavHtml += '<li class="page-nav__item--' + header.name + '">' +
        '<a href="#' + slug + '">' + title + '</a></li>\n';
    });
    // add pageNavHtml to page
    $('.page-nav').html( pageNavHtml );

    file.contents = new Buffer( $.html() );
    this.push( file );
    callback();
  });
};
