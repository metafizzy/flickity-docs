var gulp = require('gulp');

// ----- site ----- //

// stuff used across tasks
var site = {
  // templating data
  data: {
    isDev: process.argv[2] == 'dev',
    isExport: process.argv[2] == 'export',
  },
  // src to watch, tasks to trigger
  watches: [],
  watch: function( src, tasks ) {
    site.watches.push( [ src, tasks ] );
  }
};

// ----- tasks ----- //

require('./tasks/assets')( site );
require('./tasks/dist')( site );
require('./tasks/hint')( site );
require('./tasks/js')( site );
require('./tasks/css')( site );
require('./tasks/content')( site );

// ----- default ----- //

gulp.task( 'default', [
  'hint',
  'content',
  'js',
  'css',
  'dist',
  'prod-assets'
] );

// ----- export ----- //

// version of site used in packery-docs.zip

gulp.task( 'export', [ 'default' ] );

// ----- watch ----- //

gulp.task( 'dev', [
  'hint',
  'dist',
  'prod-assets',
  'content'
], function() {
  site.watches.forEach( function( watchable ) {
    gulp.watch.apply( gulp, watchable );
  });
});
