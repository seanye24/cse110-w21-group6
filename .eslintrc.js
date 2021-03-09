module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'import/prefer-default-export': 'warn',
    'no-unused-vars': 'warn',
    'prefer-const': 'warn',
    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
    'no-param-reassign': 'off',
    curly: ['error', 'all'],
  },
};
