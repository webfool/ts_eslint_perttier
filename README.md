### ts + eslint 项目搭建流程
后面的所有配置将实现如下功能：
- 编写代码时，能实时将 ts 的类型错误提示在命令行中
- 结合 husky + lint-staged 拦截 git commit
  - 配置 eslint 解析 ts
  - 配置 eslint + prettier 进行代码质量和代码格式校验和修复
- 配置 commitlint 校验 git commit 的提交 message，从而规范 commit 的 message 格式

#### 项目搭建
以下配置过程不依赖 vscode 的 ts 校验和 eslint 插件的校验，而是在 git 提交代码前对代码进行校验和修复。而实际开发过程中为了避免提交时大量修改代码，我们需要 ts 和 eslint 实时进行校验，那么这个时候才需要借助 vscode 的 ts 校验和 eslint 插件。

在不依赖 vscode 的 ts 校验和 eslint 插件时，我们需要先做如下操作关闭 vscode 的 ts 校验和 eslint 插件:
- 在 vscode 中使用快捷键 command + shift + P，输入 setting.json 选择 Open Settings(JSON)
- 在配置文件的最后加上，用于关闭 ts 在 vscode 中的类型提示
```js
"typescript.validate.enable": false,
"javascript.validate.enable": false,
```
- 如果有安装 eslint 插件，则在插件中把 eslint 关闭

##### 项目初始化
```js
// 进入新的项目文件夹，执行
npm init -y
```

##### 依赖的包安装
```js
npm i -D husky // 用于为 git 的不同阶段配置钩子
npm i -D lint-staged // 用于提取 git add 的的内容

npm install -D eslint // eslint 校验的核心包

npm install -D typescript // typescript-parser 需要依赖 typescript
npm install -D @typescript-eslint/parser // typescript 语法的解析器
npm install -D @typescript-eslint/eslint-plugin // typescript 在 eslint 中推荐的规则

npm i -D --save-exact prettier // 精确安装 prettier 版本
npm i -D eslint-plugin-prettier // 将 prettier 校验和修复功能注入 eslint 的插件
npm i -D eslint-config-prettier  // 关闭 eslint 和 prettier 冲突的规则

// 安装 @commitlint 作用域下的3个包：cli(用于执行校验命令)、config-conventional(通用配置)、prompt-cli(按配置引导输入commit 信息)
npm i -D @commitlint/{cli,config-conventional,prompt-cli} // 用于校验和标准化 git commit 的 message
```

##### 配置 typescript 的类型校验
```js
npx tsc --init // 生成 tsconfig.json 配置文件

// 配置 tsconfig.json
{
  ...
  "noEmit": true,
}

// 配置 package.json
{
  "watch:ts": "tsc --watch"
}

// 执行如下命令，开发时即可实时监听文件的 ts 类型错误
npm run watch:ts
```

##### 配置 husky
husky 用于为 git 的不同阶段配置钩子，并允许外部传入钩子的执行内容。

安装完成 husky 之后会提示如下两句，代表安装成功，即已经在当前包的 .git/hooks 下配置了不同阶段的钩子，当触发这些钩子时，会去 package.json 的 husky 配置中找到对应命令并执行
```js
husky > Setting up git hooks
husky > Done
```

```js
// package.json
{
  ...
  "husky": {
    "hooks": {
      // "pre-commit": "echo i am pre commit!"
      "pre-commit": "lint-staged"
    }
  }
}
```

##### 配置 lint-staged
lint-staged 用于将 git add 的内容按规则过滤出来，再交由一些命令进行操作。

lint-staged 调用时
- 将会去 package.json 的 lint-staged 找配置（也可以是其它配置方式）
- 然后通过 key 的过滤模式过滤出已经提交的文件
- 再把匹配文件的绝对路径作为参数传给 value 的每一个命令

如果需要忽略某些文件，直接在对应的命令配置文件定义(如 .eslintrc.js)
```js
{
  "lint-staged": {
    // 支持带路径的配置模式(file/*/*.js)和不带路径的匹配模式(*.js)
    // 命令支持 npm 安装的命令和 $path 内部的命令；命令支持单个和多选
    // 常见的命令 ["prettier --write", "eslint --fix", "git add"] ，因为使用了 eslint-plugin-prettier 插件，所以只需要 eslint --fix 即可
    "src/*": ["eslint --fix"] // 格式化之后直接提交成功
  }
}
```

##### 配置 .eslintrc.js
```js
module.exports = {
  parser: '@typescript-eslint/parser', // 解析 typescript
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:@typescript-eslint/recommended', // 使用@typescript-eslint/eslint-plugin的推荐规则
    /**
     * 配置 prettier 用于校验和自动修复格式问题
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
```

##### 配置 .prettierrc.js
```js
module.exports = {
  // 通用配置
  printWidth: 80,
  semi: false, // 表达式末尾是否要分号
  tabWidth: 2,
  useTabs: false,
  singleQuote: true, // 使用单引号
  quoteProps: "as-needed",
  trailingComma: "none", // 当多行数组/对象时，是否需要尾逗号
  bracketSpacing: true, // 对象前后是否需要空格
}
```

##### 配置 commitlint
commitlint 用于限制 git commit 的 message 内容格式

```js
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

```js
// package.json
{
  "scripts": {
    "commit": "commit" // 添加 npm run commit 命令，用于引导输入 commit
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS" // git commit 时校验提交信息
    }
  }
}
```