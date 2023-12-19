/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['gbeata-eslint'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  rules: {
    'implicit-arrow-linebreak': 'off',
  },
};
