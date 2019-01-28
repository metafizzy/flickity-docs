var gulp = require('gulp');

// ----- site ----- //

// stuff used across tasks
var site = {
  // templating data
  data: {
    productName: 'Flickity',
    description: 'Touch, responsive, flickable carousels',
    majorVersion: 2,
    isDev: process.argv[2] == 'dev',
    isExport: process.argv[2] == 'export',
  },
};

// ----- tasks ----- //

require('./tasks/assets')( site );
require('./tasks/dist')( site );
require('./tasks/hint')( site );
require('./tasks/js')( site );
require('./tasks/css')( site );
require('./tasks/content')( site );

// ----- default ----- //

gulp.task( 'default', gulp.parallel(
  'hint',
  'content',
  'js',
  'css',
  'dist',
  'prod-assets'
));

// ----- export ----- //

// version of site used in flickity-docs.zip

gulp.task( 'export', gulp.parallel( 'default' ) );

// ----- watch ----- //

gulp.task( 'dev', gulp.parallel(
  'hint',
  'dist',
  'prod-assets',
  'content'
));
