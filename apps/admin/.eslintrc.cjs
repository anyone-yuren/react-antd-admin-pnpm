/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['@gbeata'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  rules: {
    '@typescript-eslint/no-unused-expressions': 'off',
  },
};
