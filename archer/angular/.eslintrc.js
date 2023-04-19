module.exports = {
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  plugins: ['html'],
  ignorePatterns: ['karma.conf.js'],
  extends: ['../.eslintrc.js'],
};
