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
  },
  rules: {
    'prefer-object-spread': 'error',
  },
  ignorePatterns: [],
};
