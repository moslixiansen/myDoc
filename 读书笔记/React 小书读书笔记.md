<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [前端组件化](#前端组件化)
- [JSX](#jsx)
- [render](#render)
- [事件](#事件)
  - [事件中的 this](#事件中的-this)
  - [总结](#总结)
- [state 和 setState](#state-和-setstate)
- [props](#props)
  - [默认配置 defaultProps](#默认配置-defaultprops)
- [状态提升](#状态提升)
- [生命周期](#生命周期)
  - [总结](#总结-1)
- [ref 和 DOM 操作](#ref-和-dom-操作)
- [props.children 和 容器类组件](#propschildren-和-容器类组件)
- [dangerouslySetHTML 和 style 属性](#dangerouslysethtml-和-style-属性)
  - [dangerouslySetHTML](#dangerouslysethtml)
  - [style](#style)
- [PropTypes 和组件参数验证](#proptypes-和组件参数验证)
- [组件方法顺序\文件命名规则](#组件方法顺序文件命名规则)
- [高阶组件](#高阶组件)
- [React.js 的 context](#reactjs-的-context)
- [纯函数](#纯函数)
- [前端工程代码复用与组件化](#前端工程代码复用与组件化)
- [Dumb vs Smart 组件](#dumb-vs-smart-组件)
- [组件的内容编写顺序如下：](#组件的内容编写顺序如下)

<!-- /code_chunk_output -->

### 前端组件化

组件化可以帮助我们解决前端结构的复用性问题，整个页面可以由这样的不同的组件组合、嵌套构成。

一个组件有自己的显示形态（上面的 HTML 结构和内容）行为，组件的显示形态和行为可以由数据状态（state）和配置参数（props）共同决定。数据状态和配置参数的改变都会影响到这个组件的显示形态。

当数据变化的时候，组件的显示需要更新。所以如果组件化的模式能提供一种高效的方式自动化地帮助我们更新页面，那也就可以大大地降低我们代码的复杂度，带来更好的可维护性。

### JSX

```html
<div class='box' id='content'>
  <div class='title'>Hello</div>
  <button>Click</button>
</div>
```

一个 DOM 元素包含的信息其实只有三个：标签名，属性，子元素。用合法的 JavaScript 对象来表示如下：

```JavaScript
{
  tag: 'div',
  attrs: { className: 'box', id: 'content'},
  children: [
    {
      tag: 'div',
      attrs: { className: 'title' },
      children: ['Hello']
    },
    {
      tag: 'button',
      attrs: null,
      children: ['Click']
    }
  ]
}
```

你会发现，HTML 的信息和 JavaScript 所包含的结构和信息其实是一样的，我们可以用 JavaScript 对象来描述所有能用 HTML 表示的 UI 信息。但是用 JavaScript 写起来太长了，结构看起来又不清晰，用 HTML 的方式写起来就方便很多了。

于是 React.js 就把 JavaScript 的语法扩展了一下，让 JavaScript 语言能够支持这种直接在 JavaScript 代码里面编写类似 HTML 标签结构的语法，这样写起来就方便很多了。编译的过程会把类似 HTML 的 JSX 结构转换成 JavaScript 的对象结构。

```JavaScript
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
class Header extends Component {
  render () {
    return (
      <div>
        <h1 className='title'>React 小书</h1>
      </div>
    )
  }
}
ReactDOM.render(
  <Header />,
  document.getElementById('root')
)
```

上面的代码经过react编译后，会变成

```JavaScript
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
class Header extends Component {
  render () {
    return (
     React.createElement(
        "div",
        null,
        React.createElement(
          "h1",
          { className: 'title' },
          "React 小书"
        )
      )
    )
  }
}
ReactDOM.render(
  React.createElement(Header, null), 
  document.getElementById('root')
);
```

<code>React.createElement</code> 会构建一个 JavaScript 对象来描述你 HTML 结构的信息，包括标签名、属性、还有子元素等。这样的代码就是合法的 JavaScript 代码了。所以使用 React 和 JSX 的时候一定要经过编译的过程。

这里再重复一遍：所谓的 JSX 其实就是 JavaScript 对象。每当在 JavaScript 代码中看到这种 JSX 结构的时候，脑子里面就可以自动做转化，这样对你理解 React.js 的组件写法很有好处。

所以可以总结一下从 JSX 到页面到底经过了什么样的过程：

![avatar](./JSX.png)

有些同学可能会问，为什么不直接从 JSX 直接渲染构造 DOM 结构，而是要经过中间这么一层呢？

第一个原因是，当我们拿到一个表示 UI 的结构和信息的对象以后，不一定会把元素渲染到浏览器的普通页面上，我们有可能把这个结构渲染到 canvas 上，或者是手机 App 上。所以这也是为什么会要把 react-dom 单独抽离出来的原因，可以想象有一个叫 <code>react-canvas</code> 可以帮我们把 UI 渲染到 canvas 上，或者是有一个叫 <code>react-app</code> 可以帮我们把它转换成原生的 App（实际上这玩意叫 ReactNative）。

第二个原因是，有了这样一个对象。当数据变化，需要更新组件的时候，就可以用比较快的算法操作这个 JavaScript 对象，而不用直接操作页面上的 DOM，这样可以尽量少的减少浏览器重排，极大地优化性能。这个在以后的章节中我们会提到。

总结：

- JSX 是 JavaScript 语言的一种语法扩展，长得像 HTML，但并不是 HTML。
- React.js 可以用 JSX 来描述你的组件长什么样的。
- JSX 在编译的时候会变成相应的 JavaScript 对象描述。
- react-dom 负责把这个用来描述 UI 信息的 JavaScript 对象变成 DOM 元素，并且渲染到页面上。

### render

一个react组件类必须要实现一个 render 方法，这个 render 方法必须要返回一个 JSX 元素。但这里要注意的是，必须要用一个外层的 JSX 元素把所有内容包裹起来。返回并列多个 JSX 元素是不合法的。

在 JSX 当中你可以插入 JavaScript 的表达式，表达式返回的结果会相应地渲染到页面上。表达式用 {} 包裹。

### 事件

React 元素的事件处理和 DOM 元素的很相似，但是有一点语法上的不同：

- React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。

在 React 中另一个不同点是你不能通过返回 false 的方式阻止默认行为。你必须显式的使用 preventDefault。例如，传统的 HTML 中阻止表单的默认提交行为，你可以这样写：

```html
<form onsubmit="console.log('You clicked submit.'); return false">
  <button type="submit">Submit</button>
</form>
```

在 React 中，可能是这样的：

```JavaScript
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
```

#### 事件中的 this

如果不 bind(this), this 打印出来，你会看到 this 是 null 或者 undefined。这是因为 React.js 调用你所传给它的方法的时候，并不是通过对象方法的方式调用（this.handleClickOnTitle），而是直接通过函数调用 （handleClickOnTitle），所以事件监听函数内并不能通过 this 获取到实例。

其它绑定this的方法：

- 箭头函数
- 实验性的 [public class fields](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties) 语法，你可以使用 class fields 正确的绑定回调函数：

#### 总结

- 为 React 的组件添加事件监听是很简单的事情，你只需要使用 React.js 提供了一系列的 on* 方法即可。
- React.js 会给每个事件监听传入一个 event 对象，这个对象提供的功能和浏览器提供的功能一致，而且它是兼容所有浏览器的。
- React.js 的事件监听方法需要手动 bind 到当前实例，这种模式在 React.js 中非常常用。

### state 和 setState

调用 setState 的时候，React.js 并不会马上修改 state。而是把这个对象放到一个更新队列里面，稍后才会从队列当中把新的状态提取出来合并到 state 当中，然后再触发组件更新。

所以如果你想在 setState 之后使用新的 state 来做后续运算就做不到了，例如：

```JavaScript
...
  handleClickOnLikeButton () {
    this.setState({ count: 0 }) // => this.state.count 还是 undefined
    this.setState({ count: this.state.count + 1}) // => undefined + 1 = NaN
    this.setState({ count: this.state.count + 2}) // => NaN + 2 = NaN
  }
...
```

setState 的第二种使用方式，可以接受一个函数作为参数。

```JavaScript
...
  handleClickOnLikeButton () {
    this.setState((prevState) => {
      return { count: 0 }
    })
    this.setState((prevState) => {
      return { count: prevState.count + 1 } // 上一个 setState 的返回是 count 为 0，当前返回 1
    })
    this.setState((prevState) => {
      return { count: prevState.count + 2 } // 上一个 setState 的返回是 count 为 1，当前返回 3
    })
    // 最后的结果是 this.state.count 为 3
  }
...
```

上面我们进行了三次 setState，但是实际上组件只会重新渲染一次，而不是三次；这是因为在 React.js 内部会把 JavaScript 事件循环中的消息队列的同一个消息中的 setState 都进行合并以后再重新渲染组件。

### props

props 一旦传入进来就不能改变

#### 默认配置 defaultProps

```JavaScript
class LikeButton extends Component {
  static defaultProps = {
    likedText: '取消',
    unlikedText: '点赞'
  }
  constructor () {
    super()
    this.state = { isLiked: false }
  }
  handleClickOnLikeButton () {
    this.setState({
      isLiked: !this.state.isLiked
    })
  }
  render () {
    return (
      <button onClick={this.handleClickOnLikeButton.bind(this)}>
        {this.state.isLiked
          ? this.props.likedText
          : this.props.unlikedText} 👍
      </button>
    )
  }
}
```

### 状态提升

当某个状态被多个组件依赖或者影响的时候，就把该状态提升到这些组件的最近公共父组件中去管理，用 props 传递数据或者函数来管理这种依赖或着影响的行为。

### 生命周期

挂载（mount）

我们把 React.js 将组件渲染，并且构造 DOM 元素然后塞入页面的过程称为组件的挂载

- componentWillMount: 组件挂载开始之前，也就是在组件调用 render 方法之前调用。
- componentDidMount： 组件挂载完成以后，也就是 DOM 元素已经插入页面后调用。
- componentWillUnmount: 组件对应的 DOM 元素从页面中删除之前调用。
- 其它生命周期

- shouldComponentUpdate(nextProps, nextState)：你可以通过这个方法控制组件是否重新渲染。如果返回 false 组件就不会重新渲染。这个生命周期在 React.js 性能优化上非常有用。
- componentWillReceiveProps(nextProps)：组件从父组件接收到新的 props 之前调用。
- componentWillUpdate()：组件开始重新渲染之前调用。
- componentDidUpdate()：组件重新渲染并且把更改变更到真实的 DOM 以后调用。 大家对这更新阶段的生命周期比较感兴趣的话可以查看[官网文档](https://zh-hans.reactjs.org/docs/state-and-lifecycle.html)。

不依赖 DOM 操作的组件启动的操作都可以放在 componentWillMount 中进行

#### 总结

我们一般会把组件的 state 的初始化工作放在 constructor 里面去做；在 componentWillMount 进行组件的启动工作，例如 Ajax 数据拉取、定时器的启动；组件从页面上销毁的时候，有时候需要一些数据的清理，例如定时器的清理，就会放在 componentWillUnmount 里面去做。

###  ref 和 DOM 操作

```JavaScript
class AutoFocusInput extends Component {
  componentDidMount () {
    this.input.focus()
  }
  render () {
    return (
      <input ref={(input) => this.input = input} />
    )
  }
}
ReactDOM.render(
  <AutoFocusInput />,
  document.getElementById('root')
)
```

可以看到我们给 input 元素加了一个 ref 属性，这个属性值是一个函数。当 input 元素在页面上挂载完成以后，React.js 就会调用这个函数，并且把这个挂载以后的 DOM 节点传给这个函数。在函数中我们把这个 DOM 元素设置为组件实例的一个属性，这样以后我们就可以通过 this.input 获取到这个 DOM 元素。

然后我们就可以在 componentDidMount 中使用这个 DOM 元素，并且调用 this.input.focus() 的 DOM API。整体就达到了页面加载完成就自动 focus 到输入框的功能（大家可以注意到我们用上了 componentDidMount 这个组件生命周期）。

我们可以给任意代表 <b>HTML 元素标签</b>或 <b>react组件</b> 加上 ref 从而获取到它 DOM 元素然后调用 DOM API。<b>但是记住一个原则：能不用 ref 就不用。</b>特别是要避免用 ref 来做 React.js 本来就可以帮助你做到的页面自动更新的操作和事件监听。多余的 DOM 操作其实是代码里面的“噪音”，不利于我们理解和维护。


### props.children 和 容器类组件

使用自定义组件的时候，可以在其中嵌套 JSX 结构。嵌套的结构在组件内部都可以通过 props.children 获取到，这种组件编写方式在编写容器类型的组件当中非常有用。而在实际的 React.js 项目当中，我们几乎每天都需要用这种方式来编写组件。

### dangerouslySetHTML 和 style 属性

#### dangerouslySetHTML

```JavaScript
class Editor extends Component {
  constructor() {
    super()
    this.state = {
      content: '<h1>React.js 小书</h1>'
    }
  }
  render () {
    return (
      <div className='editor-wrapper'>
        {this.state.content}
      </div>
      <div className='editor-wrapper'
      dangerouslySetInnerHTML={{__html: this.state.content}} />
    )
  }
```

需要给 dangerouslySetInnerHTML 传入一个对象，这个对象的 __html 属性值就相当于元素的 innerHTML，这样我们就可以动态渲染元素的 innerHTML 结构了。

#### style

```JavaScript
<h1 style={{fontSize: '12px', color: 'red'}}>React.js 小书</h1>
```

style 接受一个对象，这个对象里面是这个元素的 CSS 属性键值对，原来 CSS 属性中带 - 的元素都必须要去掉 - 换成驼峰命名，如 font-size 换成 fontSize，text-align 换成 textAlign。

### PropTypes 和组件参数验证

类型校验：  React 提供的第三方库 prop-types
更多类型及其用法可以参看官方文档：[ Typechecking With PropTypes - React](https://reactjs.org/docs/typechecking-with-proptypes.html)


### 组件方法顺序\文件命名规则

组件的私有方法都用 _ 开头，所有事件监听的方法都用 handle 开头。把事件监听方法传给组件的时候，属性名用 on 开头

另外，组件的内容编写顺序如下：

- static 开头的类属性，如 defaultProps、propTypes。
- 构造函数，constructor。
- getter/setter（还不了解的同学可以暂时忽略）。
- 组件生命周期。
- _ 开头的私有方法。
- 事件监听方法，handle*。
- render开头的方法，有时候 render() 方法里面的内容会分开到不同函数里面进行，这些函数都以 render 开头。
- render() 方法。 如果所有的组件都按这种顺序来编写，那么维护起来就会方便很多，多人协作的时候别人理解代码也会一目了然。


- 我们遵循一个原则：如果一个文件导出的是一个类，那么这个文件名就用大写开头

### 高阶组件

- 高阶组件就是一个函数, 传给它一个组件, 返回一个新组件
- 复用组件之间相同的逻辑
- 高阶组件内部的包装组件和被包装组件之间通过props传递数据

### React.js 的 context

一个组件可以通过 getChildContext 方法返回一个对象，这个对象就是子树的 context，提供 context 的组件必须提供 childContextTypes 作为 context 的声明和验证。

如果一个组件设置了 context，那么它的子组件都可以直接访问到里面的内容，它就像这个组件为根的子树的全局变量。任意深度的子组件都可以通过 contextTypes 来声明你想要的 context 里面的哪些状态，然后可以通过 this.context 访问到那些状态。


### 纯函数

- 一个函数的返回结果只依赖于它的参数, 并且在执行的过程中没有副作用, 我们就把这个函数称为"纯函数"
- 函数的返回结果只依赖于它的参数: 返回结果是可预料的
- 函数执行过程里面没有副作用:　一个函数执行过程对外部产生了可观察的变化那么就说这个函数是有副作用的

### 前端工程代码复用与组件化

- 利用 const c = new Component(),调用 c.render() 返回一个DO结构
- 增加一个mount()方法, 接收两个参数, 一个是要渲染组件为子元素DOM结构, 一个是组件
- 在setState() 方法中,同时调用render()和onStateChange()
  
### Dumb vs Smart 组件

- 所有的Dumb组件都放在components目录下,所有的Smart组件都放在containers目录下,这是一种约定俗成的规范 
- 状态提升
  - 当某个状态被多个组件依赖或影响时, 就把改状态提升到这些组件最近的公共父组件, 通过 props 传递给他们 
  

- [参考](https://www.bookstack.cn/read/react-naive-book/e43368c109e27738.md)
- [深度剖析：如何实现一个 Virtual DOM 算法](https://github.com/livoras/blog/issues/13)