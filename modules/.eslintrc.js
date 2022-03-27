module.exports = {
  plugins: [ 'metafizzy' ],
  extends: 'plugin:metafizzy/browser',
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  globals: {
    Draggabilly: false,
    filterBind: false,
    Flickity: false,
    FlickityDocs: false,
    getSize: false,
    utils: false,
  },
  rules: {
    'prefer-object-spread': 'error',
  },
  ignorePatterns: [],
};
