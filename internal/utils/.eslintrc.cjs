module.exports = {
  root: true,
  extends: ["@gbeata/eslint-config/strict"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
};
