
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [webpack 基于nodejs开发的模块打包工具](#webpack-基于nodejs开发的模块打包工具)
- [运行webpack的方式](#运行webpack的方式)
- [常用 npm 命令](#常用-npm-命令)

<!-- /code_chunk_output -->

#### webpack 基于nodejs开发的模块打包工具

- 能够识别以下模块引入语法
  - ES Module 模块引入方式
  - CommomJS 模块引入方式
  - AMD
  - CMD
- js 模块打包工具 -> .css/.png/.vue/.react 文件都能打包
- 全局安装 npm install webpack webpack-cli -g
  - 缺点: 不同项目打包时使用的webpack版本不一样, 全局安装会导与全局版本不一致的项目跑不起来, 特别是两个依赖不同版本webpac的项目之间有依赖, 需要同时跑起来的时候, 就跑不起来
  - 全局卸载: npm uninstall webpack webpack-cli -g
- 局部安装 npm install webpack webpack-cli --sav-dev
- webpack 默认的配置文件为 webpack.config.js, 如果需要修改其它配置文件(更换配置文件名称), 可以使用命令 npx webpack--config webpackconfig.js

#### 运行webpack的方式

- 若是全局安装, 则 ```webpack xxx.js``` 即可打包, 若没有配置件, webpack走默认配置文件
- 若是局部安装, 有两种方式如下:
  - npx webpack
    - 依据默认的 webpack.config.js 进行打包
  - npm scripts
    - 在package.js文件中有一个配置项叫scripts, 假定此时配置下

```JavaScript
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "scripts": {
    "bundle": "webpack"  
  },
  "author": "moslixiansen",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.41.2",
    "webpack-cli": "^3.3.10"
  }
}
```

- 则运行 ```npm run bundle``` 就相当于 ```npx webpack xxx.js```, 其中xxx.js由webpack.config.js文件决定, 注意scripts中填"webpack"就可以了, 无需npx webpack, 脚本里不会运行全局的 webpack
- webpack-cli的作用
  - 可以在命令行中运行 webpack 命令

#### 常用 npm 命令

- npm init -y :按默认配置项初始化项目
- npx webpack index.js  生成dist目录main.js文件
- npm info webpack 查看一个包的信息, 常用于确认包的一个版否在
- npm install webpack@4.16.5 webpack-cli -D "-D"相当-save-dev,是指把包安装到devDependency
- npm webpack 根据默认配置文件打包当前项目, 若没有修改过默置件, 则默认配置文件为 webpack.config.js
- npx webpack -v 查看项目中的webpack版本
- npx webpack --config xxx.js 修改webpack默认的配置文件为 xx.js