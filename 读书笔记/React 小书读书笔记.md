<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [文件命名规则](#文件命名规则)
- [高阶组件](#高阶组件)
- [纯函数](#纯函数)
- [前端工程代码复用与组件化](#前端工程代码复用与组件化)
- [Dumb vs Smart 组件](#dumb-vs-smart-组件)
- [组件的内容编写顺序如下：](#组件的内容编写顺序如下)

<!-- /code_chunk_output -->

#### 文件命名规则

- 我们遵循一个原则：如果一个文件导出的是一个类，那么这个文件名就用大写开头

#### 高阶组件

- 高阶组件就是一个函数, 传给它一个组件, 返回一个新组件
- 复用组件之间相同的逻辑
- 高阶组件内部的包装组件和被包装组件之间通过props传递数据

#### 纯函数

- 一个函数的返回结果只依赖于它的参数, 并且在执行的过程中没有副作用, 我们就把这个函数称为"纯函数"
- 只依赖参数: 返回结果是可预料的
- 没有副作用:　一个函数执行过程对产生了外部可观察的变化那么就说这个函数是有副作用的

#### 前端工程代码复用与组件化

- 利用 const c = new Component(),调用 c.render() 返回一个DO结构
- 增加一个mount()方法, 接收两个参数, 一个是要渲染组件为子元素DOM结构, 一个是组件
- 在setState() 方法中,同时调用render()和onStateChange()
  
#### Dumb vs Smart 组件

- 所有的Dumb组件都放在components目录下,所有的Smart组件都放在containers目录下,这是一种约定俗成的规范 
- 状态提升
  - 当某个状态被多个组件依赖或影响时, 就把改状态提升到这些组件最近的公共父组件, 通过 props 传递给他们 
  
#### 组件的内容编写顺序如下：

- static 开头的类属性，如 defaultProps、propTypes。
- 构造函数，constructor。
- getter/setter（还不了解的同学可以暂时忽略）。
- 组件生命周期。
- _ 开头的私有方法。
- 事件监听方法，handle*。
- render*开头的方法，有时候 render()方法里面的内容会分开到不同函数里面进行，这些函数都以 render* 开头。
render() 方法。

- [参考](http://huziketang.mangojuice.top/books/react/)