module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: "> 0.25%, not dead",
        useBuiltIns: 'usage',
        corejs: 3 // 需要 npm install --save core-js@3
      }
    ],
    "@babel/preset-typescript" // 因为 babel 的预设由后往前执行，所以 @babel/preset-typescript 应该放在最后
  ],
  plugins: [
    // 用于支持 ts 中的装饰器语法，legacy 配置代表采用旧时语法
    ["@babel/plugin-proposal-decorators", {legacy: true}],
    /**
     * 用于支持类属性的定义
     * class TestProperty {
     *  name = 'hw'
     * }
     * 
     * loose 配置代表定义属性时，采用直接赋值(this.name = 'abc') 而非 Object.defineProperty 的方式
     */
    ["@babel/plugin-proposal-class-properties", { loose : true }],
    ['@babel/plugin-transform-runtime', {corejs: 3}] // 需要 npm i @babel/runtime-corejs3
  ]
}