module.exports = {
  plugins: [ 'metafizzy' ],
  extends: 'plugin:metafizzy/node',
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  globals: {
  },
  rules: {
    'prefer-object-spread': 'error',
  },
  ignorePatterns: [
    'bower_components',
  ],
};
