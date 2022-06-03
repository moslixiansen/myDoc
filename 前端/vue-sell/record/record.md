
## 近年来前端开发的趋势

1. 旧浏览器逐渐淘汰，移动端需求增加

> ie6-8不支持es5的特性，而ie8+、firefox、chrome都支持es5，另一方面移动端的浏览器都是基于webkit内核的，都支持es5

2. 前端交互越来越多，功能越来越复杂

3. 架构从传统后台的MVC向 REST API + 前端 MV* 迁移 

> 传统的后台mvc数据变化需要刷新整个页面，体验不好。现在通过ajax获取数据，异步的局部刷新页面某个部分。

## 什么是MVVM？

- [参考: b站 mvc，mvp，mvvm 的区别](https://www.bilibili.com/video/BV1Ji4y1U7Y1?spm_id_from=333.999.0.0)
### 简介

![avatar](./mvvm.png)

viewmodel通常要实现一个观察者watcher，当数据发生变化时，watcher能监听到数据的变化，从而驱动视图更新。同时，当视图交互改变，viewmodel也能反馈给model

### MVVM 应用场景

1. 针对具有复杂交互逻辑的前端应用
2. 提供基础的架构抽象
3. 通过ajax数据持久化，保证前端用户体验

## 什么是 vuejs

1. 一个轻量级的 MVVM 框架
2. 数据驱动 + 组件化的前端开发
3. github 超过 star fork

## 对比 Angular React

1. Vue.js更轻量，gzip后大小只有20K+，移动端更友好
2. Vue.js更易上手，学习曲线平稳
3. 吸取两家之长，借鉴了angular的指令和react的组件化

## vuejs 核心思想

### 数据驱动

DOM 是数据的一种自然映射

![avatar](./vuemvvm.png)

数据（model）改变驱动视图（view）自动更新

![avatar](./data-drive-view.png)

### 组件化

![avatar](./component.png)

#### 组件设计原则

1. 页面上每个独立的可视、可交互区域视为一个组件
2. 每个组件对应一个工程目录，组件所需的各种资源在这个目录下就近维护
3. 页面不过是组件的容器，组件可以嵌套自由组合形成完整的页面

## 项目准备

### 设备像素比 dpr  devicePixelRatio

定义： window.devicePixelRatio是设备上物理像素和设备独立像素(device-independent pixels (dips))的比例。

dip或dp,（device independent pixels，设备独立像素）与屏幕密度有关。dip可以用来辅助区分视网膜设备还是非视网膜设备。

```window.devicePixelRatio```


- [张鑫旭：设备像素比devicePixelRatio简单介绍](https://www.zhangxinxu.com/wordpress/2012/08/window-devicepixelratio/)
### 图片

- css sprite，可以减少图片请求
- 实际项目中，通常将图标变成图标字体文件，图片通过webpack url-loader 变成base64，这样一个图片请求也不用发

### 图片字体制作

- [icomoon](https://icomoon.io/)

上传svg图片，在上面的网站生成图标字体，下载下来，将 font目录下文件 和 style.css （重命名为icon.css）,注意如果使用了css与编译器，注意语法变化，文件拷贝到项目目录。


### 移动端 viewport 设置

index.html 加入以下代码

```HTML
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">
```
### reset.css

index.html 加入以下代码

```HTML
<link rel="stylesheet" type="text/css" href="static/css/reset.css">
```

- static/reset/reset.css

- [参考： CSS Tools: Reset CSS](https://meyerweb.com/eric/tools/css/reset/)


### vue-router

设置选中样式为active（默认值为v-link-active）

```JavaScript
new Router({
    linkActiveClass: 'active',
    routes: [ ... ]
});

```

### css 书写顺序

1. 影响布局的 display 、position、float 等定位属性
2. 宽高 width、height、border、padding、margin、background等自身属性 （重绘）
3. 文字样式：color font-size letter-spacing, color text-align等。（重绘并重排） 
4. 文本属性: text-align vertical-align text-wrap text-transform text-indent text-decoration  letter-spacing word-spacing white-space text-overflow等。
5. css3中属性：content、box-shadow、animation、border-radius、transform等

目的：减少浏览器reflow(回流)，提升浏览器渲染dom的性能。

```
# 优先级第一--定位属性：
{
    display         规定元素应该生成的框的类型。
    position        定位规定元素的定位类型。
    float           规定框是否应该浮动。
    left     
    top  
    right  
    bottom   
    overflow        规定当内容溢出元素框时发生的事情。
    clear           清除
    z-index         设置元素的堆叠顺序。
    content         内容
    list-style  
    visibility  可见性/显示
} 

# 优先级第二--自身属性：
{
     width
     height
     border
     padding    
     margin   
     background
} 

# 优先级第三--文字样式：
{
    font-family   
    font-size   
    font-style     规定文本的字体样式。
    font-weight   
    font-varient   规定是否以小型大写字母的字体显示文本
    color   
} 

# 优先级第四--文本属性：

{
    text-align         规定文本的水平对齐方式。
    vertical-align     设置元素的垂直对齐方式。
    text-wrap          规定文本的换行规则。
    text-transform     控制文本的大小写。
    text-indent        规定文本块首行的缩进。
    text-decoration    规定添加到文本的装饰效果。
    letter-spacing     设置字符间距。
    word-spacing       设置单词间距。
    white-space        规定如何处理元素中的空白。
    text-overflow      规定当文本溢出包含元素时发生的事情。
}  

# 优先级第五--CC3中新增属性：
{  
    box-shadow        向方框添加一个或多个阴影。
    cursor            规定要显示的光标的类型（形状）。
    border-radius  
    background:linear-gradient
    transform……       向元素应用 2D 或 3D 转换。
}
```

优点： 提高开发效率


#### CSS代码注意事项

- 不要以完全没有语义的标签作为选择器,这会造成大面积污染
- 简写CSS颜色属性值
- 删除CSS属性值为0的单位
- 删除无用CSS样式
- 为单个CSS选择器或新申明开启新行
- 避免过度简写 , .ico足够表示这是一个图标 , 而.i不代表任何意思
- 使用有意义的名称，使用结构化或者作用目标相关的，而不是抽象的名称

- [参考] (https://juejin.cn/post/6844903914110713869)
- [参考](https://segmentfault.com/a/1190000022827015)


## 二期

### cube-ui

- [文档](https://didi.github.io/cube-ui/#/zh-CN)

```vue add cube-ui```


后编译(post-compile): 不使用编译后的代码，直接使用库的源码，由应用进行编译。

#### 背景

使用 webpack + babel 开发应用越来越多，而且一般都是通过 NPM 进行包管理的，这样依赖包越来越多，这些依赖包也是使用的 ES2015+ 开发的，所以每个依赖包都需要编译才能发布，这样编译后代码中往往后包含很多编译代码，所以为了消除这部分冗余，推荐大家使用后编译。

#### 优缺点

优点：

- 公共的依赖可以实现共用，只此一份，重要的是只编译一次，建议通过 peerDependencies 管理依赖。
- babel 转换 API（例如 babel-plugin-transform-runtime 或者 babel-polyfill）部分的代码只有一份。
- 不用每个依赖包都需要配置编译打包环节，甚至可以直接源码级别发布。

缺点：

- 主应用的 babel 配置需要能兼容依赖包的 babel 配置。
- 依赖包不能使用 alias、不能方便的使用 DefinePlugin（可以经过一次简单编译，但是不做 babel 处理）。
- 应用编译时间会变长。



- [后编译介绍](https://didi.github.io/cube-ui/#/zh-CN/docs/post-compile)

