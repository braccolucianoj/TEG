module.exports = {
  root: true,
  env: {
    browser: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'jest'],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  rules: {
    'import/no-unresolved': ['off'],
    '@typescript-eslint/no-use-before-define': ['off'],
    'class-methods-use-this': ['off'],
    'import/prefer-default-export': ['off'],
    'react/destructuring-assignment': ['off'],
    'react/state-in-constructor': ['off'],
    'react/jsx-props-no-spreading': ['off'],
    'react/display-name': ['off'],
    'no-underscore-dangle': ['warn'],
    '@typescript-eslint/no-useless-constructor': ['off'],
    '@typescript-eslint/no-unused-expressions': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
    'react-hooks/exhaustive-deps': ['off'],
    'react/require-default-props': ['off'],
  },
  ignorePatterns: ['node_modules/', '.eslintrc.js'],
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
    ignore: ['**/*.js'],
  },
};
