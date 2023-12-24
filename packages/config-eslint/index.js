/** @type {import('eslint').Linter.Config} */
module.exports = {
  plugins: ["simple-import-sort"],
  extends: ["airbnb-base", "airbnb-typescript/base"],
  rules: {
    "import/extensions": "off",
    "import/order": "off",
    "import/prefer-default-export": "off",
    "simple-import-sort/exports": "warn",
    "simple-import-sort/imports": [
      "warn",
      {
        groups: [
          // Packages and side effect imports.
          ["^@?\\w", "^\\u0000"],
          // Components and providers.
          ["^@/components", "^@/providers"],
          // Hooks
          ["^@/hooks"],
          // Utils, helpers, and lib
          ["^@/utils", "^@/helpers", "^@/lib"],
          // Other absolute imports.
          ["^@/"],
          // Relative imports.
          ["^\\."],
          // Import type and types.
          ["^.*\\u0000$", "^@/types"],
          // Styles.
          ["^.+\\.s?css$"],
          // Anything not matched in another group.
          ["^"],
        ],
      },
    ],
    "object-curly-newline": "off",
    // 限制单行的最大长度
    "max-len": [
      "error",
      {
        code: 150,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    "no-var": "error",
    // 禁止在定义变量之前使用变量
    "no-use-before-define": "off",
    // 声明后永远不会重新分配的变量需要 const 声明
    "prefer-const": "error",
    "implicit-arrow-linebreak": ["error", "beside"],
    // 禁止不规则空格
    "no-irregular-whitespace": "off",
    // 禁止使用 debugger
    "no-debugger": "off",
    // 禁止未使用的变量
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    /*
     * TypeScript规则配置
     * 配置文档: https://typescript-eslint.nodejs.cn/rules/)
     */
    // 根据参数、属性和变量的默认值或初始值推断其类型
    "@typescript-eslint/no-inferrable-types": "off",
    // 禁止使用自定义 ts 模块和命名空间
    "@typescript-eslint/no-namespace": "off",
    // 禁止使用 any 类型
    "@typescript-eslint/no-explicit-any": "off",
    // 禁止使用特定类型
    "@typescript-eslint/ban-types": "off",
    // 不允许对初始化为数字、字符串或布尔值的变量或参数进行显式返回类型声明
    "@typescript-eslint/explicit-function-return-type": "off",
    // 不允许在 import 语句中使用 require 语句
    "@typescript-eslint/no-var-requires": "off",
    // 禁止空函数
    "@typescript-eslint/no-empty-function": "off",
    // 禁止在变量定义之前使用它们
    "@typescript-eslint/no-use-before-define": "off",
    // 禁止 @ts-<directive> 注释代码
    "@typescript-eslint/ban-ts-comment": "off",
    // 不允许使用后缀运算符的非空断言(!)
    "@typescript-eslint/no-non-null-assertion": "off",
    // 要求导出函数和类的公共类方法的显式返回和参数类型
    "@typescript-eslint/explicit-module-boundary-types": "off",
    // 使用顶层 type 限定符进行导入
    "@typescript-eslint/no-import-type-side-effects": "error",
    // 禁止定义未使用的变量
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    // 限制缩进
    "@typescript-eslint/indent": "off",
    // 允许在导入上指定 type 关键字
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        disallowTypeAnnotations: false,
        fixStyle: "inline-type-imports",
      },
    ],
    // 允许枚举成员的值是多种不同类型的有效 js 表达式
    "@typescript-eslint/prefer-literal-enum-member": [
      "error",
      {
        allowBitwiseExpressions: true,
      },
    ],

    "react-hooks/rules-of-hooks": "off",
    "react-hooks/exhaustive-deps": "off",
  },
  ignorePatterns: [
    ".next",
    ".turbo",
    "node_modules",
    "**/*.js",
    "**/*.mjs",
    "**/*.jsx",
  ],
};
