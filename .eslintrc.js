module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    '@weblab.technology/codestyle/eslint',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "no-constant-condition": "off",
    "no-confusing-arrow": "off",
    "jsx-a11y/href-no-hash": "off",
    "template-curly-spacing" : "off",
    "indent" : "off"
  }
};
