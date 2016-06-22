var glob = require('glob');

/**
 * takes glob src and returns expanded paths
 * @param {Array} src
 * @returns {Array} paths
 */
module.exports = function getGlobPaths( src ) {
  var paths = [];
  // expand paths
  src.forEach( function( path ) {
    if ( glob.hasMagic( path ) ) {
      var files = glob.sync( path );
      paths = paths.concat( files )
    } else {
      paths.push( path );
    }
  });

  return paths;
};
