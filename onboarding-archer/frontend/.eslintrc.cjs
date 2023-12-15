module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    'react',
    'react-hooks',
    'prettier',
    '@typescript-eslint/eslint-plugin',
    'unused-imports',
  ],
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  root: true,
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
};
