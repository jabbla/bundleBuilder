# bundleBuilder

> 这个commit完成了最基本的js文件打包功能，旨在学习打包器的设计思路

## 完成功能

1. 基本的javascript模块打包功能
2. 支持模块规范：CommonJs
3. 循环依赖处理
4. 模块缓存

## 使用说明

> 其中entry，ouput需是绝对路径

```js
const BundleBuilder = require('../../src/BundleBuilder.js');

const entryPath = path.resolve(__dirname, './src/index1-1.js');
const outputPath = path.resolve(__dirname, './dist/bundle1-1.js');
        
const Builder = new BundleBuilder({
    entry: entryPath,
    output: outputPath
});
```

## VSCode调试

点击VSCode调试面板中的``basicBundle``调试按钮，即可运行``test``目录下的测试脚本





