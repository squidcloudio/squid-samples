/* eslint-env node */

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks', 'prettier', '@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    eqeqeq: 'error',
  },
  ignorePatterns: [
    '.eslintrc.js',
    '.next',
    'node_modules',
    'tailwind.config.js',
    'postcss.config.js',
    'next.config.js',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
}
