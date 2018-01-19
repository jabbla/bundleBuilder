# bundleBuilder

> 这个commit在最基本的basicBundle功能上添加了moudleLoader功能，使用async对代码进行了一定程度的重写，旨在学习打包器的设计思路

## 完成功能

1. 基本的javascript模块打包功能
2. 支持模块规范：CommonJs
3. 循环依赖处理
4. 模块缓存
5. 自定义模块加载器(ModuleLoader)

## 使用说明

### 基本使用

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

### 模块加载器
#### 配置
```js
const BundleBuilder = require('../../src/BundleBuilder.js');

const entryPath = path.resolve(__dirname, './src/index1-1.js');
const outputPath = path.resolve(__dirname, './dist/bundle1-1.js');
        
const Builder = new BundleBuilder({
    entry: entryPath,
    output: outputPath,
    loaders: [
        asyncLoader1,
        asyncLoader2
    ]
});
```

#### 异步loader

> 需返回Promise实例

```js
module.exports = function(option){
    let {fileStr} = option; //fileStr属性为模块文件内容字符串
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({fileStr: fileStr.replace('${loader1}', 1)});
            //需为resolve传入一个对象，其中fileStr代表处理后的模块内容字符串
        }, 100);
    });
};
```

#### 同步loader

> 直接一个对象，其中fileStr属性为处理后的模块内容字符串

```js
module.exports = function(option){
    let {fileStr} = option; //fileStr属性为模块文件内容字符串

    return {fileStr: fileStr.replace('${loader1}', 1)};
};
```


## 测试

```bash
npm run test
```

也可以点击VSCode调试面板中的``moduleLoader``和``basicBundle``调试按钮分别调试对应的两个功能。





