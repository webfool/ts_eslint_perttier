module.exports = {
  // === ts 配置 ===
  parser: '@typescript-eslint/parser',
  parserOptions: {},
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:@typescript-eslint/recommended', // 使用@typescript-eslint/eslint-plugin的推荐规则
    /**
     * 使用 prettier 插件的 recommended 配置，它包括注入
     * {
     *    plugins: ['prettier'],
     *    rules: {
     *      'prettier/prettier': 'error'
     *    },
     *    extends: ['prettier'] // 使用 eslint-config-prettier 关闭 eslint 和 prettier 冲突的规则
     * }
     */
    'plugin:prettier/recommended'
  ],
  rules: {
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'] // 覆盖 typescript 校验规则
  }
}
