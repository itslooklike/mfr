module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-typescript', 'prettier', 'prettier/react', 'prettier/@typescript-eslint'],
  rules: {
    'no-irregular-whitespace': 0,
    'no-underscore-dangle': 0,
    'arrow-body-style': 0,
    'import/prefer-default-export': 0,
    'react/no-array-index-key': 0,
    'react/prop-types': 0,
    'react/no-danger': 0,
    'class-methods-use-this': 0,
  },
  globals: {
    __APP_NAME__: true,
    __IS_CLIENT__: true,
    __IS_SERVER__: true,
    __ROOT_DIR__: true,
    __PUBLIC_PATH_NS__: true,
  },
  parserOptions: {
    project: './tsconfig.json',
  },
}
