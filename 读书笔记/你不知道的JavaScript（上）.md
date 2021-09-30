## 第一部分 作用域和闭包

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [第一部分 作用域和闭包](#第一部分-作用域和闭包)
  - [第一章 作用域是什么](#第一章-作用域是什么)
    - [编译过程](#编译过程)
    - [编译过程的三个角色](#编译过程的三个角色)
    - [变量赋值的过程](#变量赋值的过程)
    - [LHS 和 RHS](#lhs-和-rhs)
    - [异常处理](#异常处理)
  - [第二章 词法作用域](#第二章-词法作用域)
    - [欺骗词法(eval 和 with)](#欺骗词法eval-和-with)
      - [eval](#eval)
      - [with](#with)
      - [性能影响](#性能影响)
  - [第三章 函数作用域和块作用域](#第三章-函数作用域和块作用域)
    - [块作用域](#块作用域)
    - [try...catch... 与块作用域](#trycatch-与块作用域)
    - [为什么不直接使用 IIFE 来创建作用域](#为什么不直接使用-iife-来创建作用域)
    - [let](#let)
      - [垃圾收集](#垃圾收集)
      - [let 循环](#let-循环)
    - [创建块作用域的方式总结](#创建块作用域的方式总结)
  - [第四章 提升](#第四章-提升)
  - [第五章 作用域闭包](#第五章-作用域闭包)
    - [理解闭包](#理解闭包)
    - [IIFE 不是闭包](#iife-不是闭包)
    - [循环和闭包](#循环和闭包)
    - [块作用域和闭包](#块作用域和闭包)
    - [模块](#模块)
    - [现代的模块机制](#现代的模块机制)
    - [未来的模块机制](#未来的模块机制)
    - [闭包究极定义](#闭包究极定义)
- [第二部分 this和对象原型](#第二部分-this和对象原型)
  - [第一章 关于this](#第一章-关于this)
    - [为什么要使用 this](#为什么要使用-this)
    - [this 的作用域](#this-的作用域)
    - [this到底是什么](#this到底是什么)
  - [第二章 this全面解析](#第二章-this全面解析)
    - [默认绑定](#默认绑定)
    - [隐式绑定](#隐式绑定)
      - [隐式丢失](#隐式丢失)
    - [显式绑定](#显式绑定)
      - [硬绑定](#硬绑定)
      - [API调用的“上下文”](#api调用的上下文)
    - [new绑定](#new绑定)
    - [绑定优先级](#绑定优先级)
    - [绑定例外](#绑定例外)
      - [被忽略的this](#被忽略的this)
      - [更安全的this](#更安全的this)
      - [间接引用](#间接引用)
      - [软绑定](#软绑定)
  - [第三章 对象](#第三章-对象)
    - [内置对象](#内置对象)
    - [对象不变性](#对象不变性)
      - [禁止扩展](#禁止扩展)
      - [遍历](#遍历)
  - [第五章 原型](#第五章-原型)
    - [属性设置和屏蔽](#属性设置和屏蔽)
    - [原型继承原理](#原型继承原理)
    - [究极定义](#究极定义)

<!-- /code_chunk_output -->

### 第一章 作用域是什么

#### 编译过程

程序中的一段源代码在执行之前会经历三个步骤，统称为“编译”

- 分词/词法分析: 分成词法单元组
- 解析/语法分析: 将词法单元组转换成抽象语法树AST
- 代码生成: 将 AST 转换成可机器指令, 能够将变量置于内存

#### 编译过程的三个角色

- 引擎: 从头到尾负责整个 JavaScript 程序的编译及执行过程
- 编译器: 引擎的好朋友之一，负责语法分析及代码生成等脏活累活
- 作用域: 引擎的另一位好朋友，负责收集并维护由所有声明的标识符（变量）组成的一系列查询，并实施一套非常严格的规则，确定当前执行的代码对这些标识符的访问权限

#### 变量赋值的过程

变量的赋值操作会执行两个动作，首先编译器会在当前作用域中声明一个变量（如果之前没有声明过），然后在运行时引擎会在作用域中查找该变量，如果能够找到就会对它赋值

#### LHS 和 RHS

- 作用域是一套规则，用于确定在何处以及如何查找变量（标识符）。如果查找的目的是对变量进行赋值，那么就会使用 LHS 查询；如果目的是获取变量的值，就会使用 RHS 查询。
- LHS 和 RHS 查询都会在当前执行作用域中开始，如果有需要（也就是说它们没有找到所需的标识符），就会向上级作用域继续查找目标标识符，这样每次上升一级作用域（一层楼），最后抵达全局作用域（顶层），无论找到或没找到都将停止
- 不成功的 RHS 引用会导致抛出 ReferenceError 异常。不成功的 LHS引用会导致自动隐式地创建一个全局变量（非严格模式下），该变量使用 LHS 引用的目标作为标识符，或者抛出 ReferenceError 异常（严格模式下）

#### 异常处理

ReferenceError 同作用域判别失败相关，而 TypeError 则代表作用域判别成功了，但是对结果的操作是非法或不合理的

### 第二章 词法作用域

- 作用域模型
  - 作用域共有两种主要的工作模型。第一种是最为普遍的，被大多数编程语言所采用的词法作用域(JavaScript)。另外一种叫作动态作用域，仍有一些编程语言在使用（比如 Bash 脚本、Perl 中的一些模式等）。
- 词法作用域定义
  - 词法作用域就是定义在词法阶段的作用域。换句话说，词法作用域是由你在写
代码时将变量和块作用域写在哪里来决定的，因此当词法分析器处理代码时会保持作用域不变（大部分情况下是这样的, 有this时类似动态作用域）

#### 欺骗词法(eval 和 with)

##### eval

如果 eval(..) 中所执行的代码包含有一个或多个声明（无论是变量还是函
数），就会对 eval(..) 所处的词法作用域进行修改

```JavaScript
function foo(str, a) {
    eval( str ); // 欺骗！
    console.log( a, b );
    }
var b = 2;
foo( "var b = 3;", 1 ); // 1, 3
```

在严格模式的程序中，eval(..)在运行时有其自己的词法作用域，意味着其中的声明无法修改所在的作用域。

```JavaScript
function foo(str) {
    "use strict";
    eval( str );
    console.log( a ); // ReferenceError: a is not defined
}
foo( "var a = 2" );
```

##### with

with 可以将一个没有或有多个属性的对象处理为一个完全隔离的词法作用域，因此这个对象的属性也会被处理为定义在这个作用域中的词法标识符。

```JavaScript
var obj = {
    a: 1,
    b: 2,
    c: 3
};
// 单调乏味的重复 "obj"
obj.a = 2;
obj.b = 3;
obj.c = 4;
// 简单的快捷方式
with (obj) {
    a = 3;
    b = 4;
    c = 5;
}
```

with 在严格模式下完全被禁用
  
##### 性能影响

JavaScript 引擎会在编译阶段进行数项的性能优化。其中有些优化依赖于能够根据代码的词法进行静态分析，并预先确定所有变量和函数的定义位置，才能在执行过程中快速找到标识符。但如果引擎在代码中发现了 eval(..) 或 with，它只能简单地假设关于标识符位置的判断都是无效的，因为无法在词法分析阶段明确知道 eval(..) 会接收到什么代码，这些代码会如何对作用域进行修改，也无法知道传递给 with 用来创建新词法作用域的对象的内容到底是什么。

最悲观的情况是如果出现了 eval(..) 或 with，所有的优化可能都是无意义的，因此最简单的做法就是完全不做任何优化。

### 第三章 函数作用域和块作用域

#### 块作用域

当使用 var 声明变量时，它写在哪里都是一样的，因为它们最终都会属于外部作用域

```JavaScript
var foo = true, baz = 10;
if (foo) {
    var bar = 3;
    // ...
}
if (baz > bar) {
    console.log( baz );
}
```

#### try...catch... 与块作用域

```javascript
{
  let a = 2;
  console.log( a ); // 2
}
console.log( a ); // ReferenceError
```

以上代码 es6 之前的实现方式

```javascript
try{throw 2;}catch(a){
  console.log( a ); // 2
}
console.log( a ); // ReferenceError
```

try/catch 的性能的确很糟糕，但技术层面上没有合理的理由来说明 try/catch 必须这么慢，或者会一直慢下去。自从 TC39 支持在 ES6 的转换器中使用 try/catch 后，Traceur 团队已经要求 Chrome 对 try/catch 的性能进行改进。

#### 为什么不直接使用 IIFE 来创建作用域

IIFE 和 try/catch 并不是完全等价的，因为如果将一段代码中的任意一部分拿出来用函数进行包裹，会改变这段代码的含义，其中的 this、return、break 和 contine 都会发生变化。IIFE 并不是一个普适的解决方案，它只适合在某些情况下进行手动操作。

#### let

let 关键字可以将变量绑定到所在的任意作用域中（通常是 { .. } 内部）。换句话说，let为其声明的变量隐式地创建了块作用域。

let 进行的声明不会在块作用域中进行提升。声明的代码被运行之前，声明并不“存在”。

```JavaScript
{
    console.log( bar ); // ReferenceError!
    let bar = 2;
}
```

##### 垃圾收集

```JavaScript
function process(data) {
// 在这里做点有趣的事情
}
var someReallyBigData = { .. };
process( someReallyBigData );
var btn = document.getElementById( "my_button" );
btn.addEventListener( "click", function click(evt) {
console.log("button clicked");
}, /*capturingPhase=*/false );
```

click 函数的点击回调并不需要 someReallyBigData 变量。理论上这意味着当 process(..) 执行后，在内存中占用大量空间的数据结构就可以被垃圾回收了。但是，由于 click 函数形成了一个覆盖整个作用域的闭包，JavaScript 引擎极有可能依然保存着这个结构（取决于具体实现）。

块作用域可以打消这种顾虑，可以让引擎清楚地知道没有必要继续保存someReallyBigData 了：

```javascript
function process(data) {
// 在这里做点有趣的事情
}
// 在这个块中定义的内容可以销毁了！
{
let someReallyBigData = { .. };
process( someReallyBigData );
}
var btn = document.getElementById( "my_button" );
btn.addEventListener( "click", function click(evt){
console.log("button clicked");
}, /*capturingPhase=*/false );
```

##### let 循环

for 循环头部的 let 不仅将 i 绑定到了 for 循环的块中，事实上它将其重新绑定到了循环的每一个迭代中，确保使用上一个循环迭代结束时的值重新进行赋值

```JavaScript
for (let i=0; i<10; i++) {
    console.log( i );
}
console.log( i ); // ReferenceError
// 等价于
{
    let j;
    for (j=0; j<10; j++) {
        let i = j; // 每个迭代重新绑定！
        console.log( i );
    }
}
```

#### 创建块作用域的方式总结

- IIFE：立即执行的函数表达式
- with：用 with 从对象中创建出的作用域仅在 with 声明中而非外
部作用域中有效。
- try ...catch...中的 catch 分块
- let、const

### 第四章 提升

我们习惯将 var a = 2; 看作一个声明，而实际上 JavaScript 引擎并不这么认为。它将 var a 和 a = 2 当作两个单独的声明，第一个是编译阶段的任务，而第二个则是执行阶段的任务。

这意味着无论作用域中的声明出现在什么地方，都将在代码本身被执行前首先进行处理。

可以将这个过程形象地想象成所有的声明（变量和函数）都会被“移动”到各自作用域的最顶端，这个过程被称为提升。

函数声明会被提升，但是函数表达式却不会被提升。

```JavaScript
foo(); // 不是 ReferenceError, 而是 TypeError!认为foo是一个变量，而不是一个函数
var foo = function bar() {
    // ...
};
```
  
```JavaScript
foo(); // TypeError
bar(); // ReferenceError
var foo = function bar() {
    // ...
};
```

这个代码片段经过提升后，实际上会被理解为以下形式：

```JavaScript
var foo;
foo(); // TypeError
bar(); // ReferenceError
foo = function() {
    var bar = ...self...
    // ...
}
```

函数声明和变量声明都会被提升。但是一个值得注意的细节（这个细节可以出现在有多个“重复”声明的代码中）是函数会首先被提升，然后才是变量。

```javascript
foo(); // 1
var foo;
function foo() {
  console.log( 1 );
}
foo = function() {
  console.log( 2 );
};
```

一个普通块内部的函数声明通常会被提升到所在作用域的顶部，这个过程不会像下面的代码暗示的那样可以被条件判断所控制：

```JavaScript
foo(); // "b"
var a = true;
if (a) {
  function foo() { console.log("a"); }
} else {
  function foo() { console.log("b"); }
}
```

但是需要注意这个行为并不可靠，在 JavaScript 未来的版本中有可能发生改变，因此应该尽可能避免在块内部声明函数。 windows Google Chrome 版本 77.0.3865.90（正式版本） （64 位）已报错 Uncaught TypeError: foo is not a function

### 第五章 作用域闭包

#### 理解闭包

```javascript
function foo() {
  var a = 2;
  function bar() {
    console.log( a );
  }
  return bar;
}
var baz = foo();
baz(); // 2 —— 朋友，这就是闭包的效果。
```

在 foo() 执行后，通常会期待 foo() 的整个内部作用域都被销毁，因为我们知道引擎有垃圾回收器用来释放不再使用的内存空间。由于看上去 foo() 的内容不会再被使用，所以很自然地会考虑对其进行回收。

而闭包的“神奇”之处正是可以阻止这件事情的发生。事实上内部作用域依然存在，因此没有被回收。

谁在使用这个内部作用域？原来是 bar() 本身在使用。拜 bar() 所声明的位置所赐，它拥有涵盖 foo() 内部作用域的闭包，使得该作用域能够一直存活，以供 bar() 在之后任何时间进行引用。

bar() 依然持有对该作用域的引用，而这个引用就叫作闭包。

```javascript
var fn;
function foo() {
  var a = 2;
  function baz() {
    console.log( a );
  }
  fn = baz; // 将 baz 分配给全局变量
}
function bar() {
  fn(); // 妈妈快看呀，这就是闭包！
}
foo();
bar(); // 2
```

> 无论通过何种手段将内部函数传递到所在的词法作用域以外，它都会持有对原始定义作用域的引用，无论在何处执行这个函数都会使用闭包。

> 本质上无论何时何地，如果将函数（访问它们各自的词法作用域）当作第一级的值类型并到处传递，你就会看到闭包在这些函数中的应用。在定时器、事件监听器、Ajax 请求、跨窗口通信、Web Workers 或者任何其他的异步（或者同步）任务中，只要使用了回调函数，实际上就是在使用闭包

#### IIFE 不是闭包

```javascript
var a = 2;
(function IIFE() {
  console.log( a );
})();
```

虽然这段代码可以正常工作，但严格来讲它并不是闭包。为什么？因为函数（示例代码中的 IIFE）并不是在它本身的词法作用域以外执行的。它在定义时所在的作用域中执行（而外部作用域，也就是全局作用域也持有 a）。a 是通过普通的词法作用域查找而非闭包被发现的。

尽管 IIFE 本身并不是观察闭包的恰当例子，但它的确创建了闭包，并且也是最常用来创建可以被封闭起来的闭包的工具。因此 IIFE 的确同闭包息息相关，即使本身并不会真的使用闭包。

#### 循环和闭包

```javascript
for (var i=1; i<=5; i++) {
  setTimeout( function timer() {
    console.log( i );
  }, i*1000 );
}
```

这段代码在运行时会以每秒一次的频率输出五次 6

```javascript
for (var i=1; i<=5; i++) {
  (function(j) {
    setTimeout( function timer() {
      console.log( j );
    }, j*1000 );
  })( i );
}
```

在迭代内使用 IIFE 会为每个迭代都生成一个新的作用域，使得延迟函数的回调可以将新的
作用域封闭在每个迭代内部，每个迭代中都会含有一个具有正确值的变量供我们访问。

#### 块作用域和闭包

```javascript
for (var i=1; i<=5; i++) {
  let j = i; // 是的，闭包的块作用域！
  setTimeout( function timer() {
    console.log( j );
  }, j*1000 );
}
```

第 3 章介绍了 let 声明，可以用来劫持块作用域，并且在这个块作用域中声明一个变量。**本质上这是将一个块转换成一个可以被关闭的作用域**

for 循环头部的 let 声明还会有一个特殊的行为。这个行为指出**变量在循环过程中不止被声明一次，每次迭代都会声明。随后的每个迭代都会使用上一个迭代结束时的值来初始化这个变量。**

```javascript
for (let i=1; i<=5; i++) {
  setTimeout( function timer() {
    console.log( i );
  }, i*1000 );
}
```

#### 模块

```javascript
function CoolModule() {
  var something = "cool";
  var another = [1, 2, 3];
  function doSomething() {
    console.log( something );
  }
  function doAnother() {
    console.log( another.join( " ! " ) );
  }
  return {
    doSomething: doSomething,
    doAnother: doAnother
  };
}
var foo = CoolModule();
foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
```

这个模式在 JavaScript 中被称为模块。最常见的实现模块模式的方法通常被称为模块暴露，这里展示的是其变体。

如果要更简单的描述，**模块模式**需要具备两个必要条件。

**1. 必须有外部的封闭函数，该函数必须至少被调用一次（每次调用都会创建一个新的模块实例）。
2. 封闭函数必须返回至少一个内部函数，这样内部函数才能在私有作用域中形成闭包，并且可以访问或者修改私有的状态。**


上一个示例代码中有一个叫作 CoolModule() 的独立的模块创建器，可以被调用任意多次，每次调用都会创建一个新的模块实例。当只需要一个实例时，可以对这个模式进行简单的改进来实现**单例模式**：

```javascript
var foo = (function CoolModule() {
  var something = "cool";
  var another = [1, 2, 3];
  function doSomething() {
    console.log( something );
  }
  function doAnother() {
    console.log( another.join( " ! " ) );
  }
  return {
    doSomething: doSomething,
    doAnother: doAnother
  };
})();
foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
```

我们将模块函数转换成了 IIFE（参见第 3 章），立即调用这个函数并将返回值直接赋值给单例的模块实例标识符 foo。

#### 现代的模块机制

```javascript
var MyModules = (function Manager() {
  var modules = {};
  function define(name, deps, impl) {
    for (var i=0; i<deps.length; i++) {
      deps[i] = modules[deps[i]];
    }
    modules[name] = impl.apply( impl, deps );
  }
  function get(name) {
    return modules[name];
  }
  return {
    define: define,
    get: get
  };
})();
```

这段代码的核心是 **modules[name] = impl.apply(impl, deps)**。为了模块的定义引入了包装函数（可以传入任何依赖），并且将返回值，也就是模块的 API，储存在一个根据名字来管理的模块列表中。

#### 未来的模块机制

基于函数的模块并不是一个能被稳定识别的模式（编译器无法识别），它们的 API 语义只有在运行时才会被考虑进来。因此可以在运行时修改一个模块的 API（参考前面关于公共 API 的讨论）。

相比之下，ES6 模块 API 更加稳定（API 不会在运行时改变）。由于编辑器知道这一点，因此可以在（的确也这样做了）编译期检查对导入模块的 API 成员的引用是否真实存在。如果 API 引用并不存在，编译器会在运行时抛出一个或多个“早期”错误，而不会像往常一样在运行期采用动态的解决方案。

#### 闭包究极定义

**当函数可以记住并访问所在的词法作用域，即使函数是在当前词法作用域之外执行，这时就产生了闭包。**

## 第二部分 this和对象原型

### 第一章 关于this

#### 为什么要使用 this

this 提供了一种更优雅的方式来隐式“传递”一个对象引用，因此可以将 API 设计得更加简洁并且易于复用。

```javascript
function foo(num) {
console.log( "foo: " + num );
  // 记录 foo 被调用的次数
  // 注意，在当前的调用方式下（参见下方代码），this 确实指向 foo
  this.count++;
}
foo.count = 0;
var i;
for (i=0; i<10; i++) {
  if (i > 5) {
    // 使用 call(..) 可以确保 this 指向函数对象 foo 本身
    foo.call( foo, i );
  }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9
// foo 被调用了多少次？
console.log( foo.count ); // 4
```

#### this 的作用域

需要明确的是，this 在任何情况下都不指向函数的词法作用域。在 JavaScript 内部，作用域确实和对象类似，可见的标识符都是它的属性。但是作用域“对象”无法通过 JavaScript 代码访问，它存在于 JavaScript 引擎内部。

#### this到底是什么

之前我们说过 this 是在运行时进行绑定的，并不是在编写时绑定，它的上下文取决于函数调用时的各种条件。this 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。

当一个函数被调用时，会创建一个活动记录（有时候也称为执行上下文）。这个记录会包含函数在哪里被调用（调用栈）、函数的调用方法、传入的参数等信息。this 就是记录的其中一个属性，会在函数执行的过程中用到。

学习 this 的第一步是明白 this 既不指向函数自身也不指向函数的词法作用域，你也许被这样的解释误导过，但其实它们都是错误的。

this 实际上是在函数被调用时发生的绑定，它指向什么完全取决于函数在哪里被调用。

### 第二章 this全面解析

#### 默认绑定

应用于独立函数调用。可以把这条规则看作是无法应用其他规则时的默认规则。

```javascript
function foo() {
  console.log( this.a );
}
var a = 2;
foo(); // 2
```

那么我们怎么知道这里应用了默认绑定呢？可以通过分析调用位置来看看 foo() 是如何调用的。在代码中，foo() 是直接使用不带任何修饰的函数引用进行调用的，因此只能使用默认绑定，无法应用其他规则。

如果使用严格模式（strict mode），那么全局对象将无法使用默认绑定，因此this 会绑定到 undefined：

```javascript
function foo() {
  "use strict";
  console.log( this.a );
}
var a = 2;
foo(); // TypeError: this is undefined
```

#### 隐式绑定

```javascript
function foo() {
  console.log( this.a );
}
var obj = {
  a: 2,
  foo: foo
};
obj.foo(); // 2
```

**一个对象内部包含一个指向函数的属性，并通过这个属性间接引用函数，从而把 this 间接（隐式）绑定到这个对象上。**

##### 隐式丢失

一个最常见的 this 绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定，从而把 this 绑定到全局对象或者 undefined 上，取决于是否是严格模式。

```javascript
function foo() {
  console.log( this.a );
}
var obj = {
  a: 2,
  foo: foo
};
var bar = obj.foo; // 函数别名！
var a = "oops, global"; // a 是全局对象的属性
bar(); // "oops, global"
```

将函数当做参数传入函数（实际上也是赋值），也会发生隐式丢失

```javascript
function foo() {
  console.log( this.a );
}
var obj = {
  a: 2,
  foo: foo
};
var a = "oops, global"; // a 是全局对象的属性
setTimeout( obj.foo, 100 ); // "oops, global"
```

除此之外，还有一种情况 this 的行为会出乎我们意料：调用回调函数的函数可能会修改 this。在一些流行的 JavaScript 库中事件处理器常会把回调函数的 this 强制绑定到触发事件的 DOM 元素上。

#### 显式绑定

##### 硬绑定

call()/apply()/bind()

##### API调用的“上下文”

第三方库的许多函数，以及 JavaScript 语言和宿主环境中许多新的内置函数，都提供了一个可选的参数，通常被称为“上下文”（context），其作用和 bind(..) 一样，确保你的回调函数使用指定的 this。

```javascript
function foo(el) {
  console.log( el, this.id );
}
var obj = {
  id: "awesome"
};
// 调用 foo(..) 时把 this 绑定到 obj
[1, 2, 3].forEach( foo, obj );
// 1 awesome 2 awesome 3 awesome
```

#### new绑定

使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。

1. 创建（或者说构造）一个全新的对象。
2. 将新对象的_proto_指向构造函数的prototype。
3. 构造函数中的的 this 指向这个新对象。
4. 执行构造函数中的代码。
5. 如果构造函数未返回非空对象，那么 new 表达式中的函数调用会自动返回这个新对象。

```javascript
function foo(a) {
  this.a = a;
}
var bar = new foo(2);
console.log( bar.a ); // 2
```

使用 new 来调用 foo(..) 时，我们会构造一个新对象并把它绑定到 foo(..) 调用中的 this上。new 是最后一种可以影响函数调用时 this 绑定行为的方法，我们称之为 new 绑定。

#### 绑定优先级

1. 函数是否在 new 中调用（new 绑定）？如果是的话 this 绑定的是新创建的对象。
var bar = new foo()
2. 函数是否通过 call、apply（显式绑定）或者硬绑定调用？如果是的话，this 绑定的是
指定的对象。
var bar = foo.call(obj2)
3. 函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，this 绑定的是那个上
下文对象。
var bar = obj1.foo()
4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 undefined，否则绑定到
全局对象。
var bar = foo()

#### 绑定例外

##### 被忽略的this

如果你把 null 或者 undefined 作为 this 的绑定对象传入 call、apply 或者 bind，这些值在调用时会被忽略，实际应用的是默认绑定规则：

```javascript
function foo() {
  console.log( this.a );
}
var a = 2;
foo.call( null ); // 2
```

##### 更安全的this

func.apply(null, args)，时，将 null 替换为一个更安全的对象。把 this 绑定到这个对象不会对你的程序产生任何副作用。

```javascript
// 我们的 DMZ 空对象
var ø = Object.create( null );
// 把数组展开成参数
foo.apply( ø, [2, 3] ); // a:2, b:3
```

Object.create(null) 和 {} 很 像， 但 是 并 不 会 创 建 Object.prototype 这个委托，所以它比 {}“更空”

##### 间接引用

```javascript
function foo() {
  console.log( this.a );
}
var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };
o.foo(); // 3
(p.foo = o.foo)(); // 2 非严格模式下
```

赋值表达式 p.foo = o.foo 的返回值是目标函数的引用，因此调用位置是 foo() 而不是p.foo() 或者 o.foo()。根据我们之前说过的，这里会应用默认绑定。

##### 软绑定

如果可以给默认绑定指定一个全局对象和 undefined 以外的值，那就可以实现和硬绑定相同的效果，同时保留隐式绑定或者显式绑定修改 this 的能力。

```javascript
if (!Function.prototype.softBind) {
  Function.prototype.softBind = function(obj) {
    var fn = this;
    // 捕获所有 curried 参数
    var curried = [].slice.call( arguments, 1 );
    var bound = function() {
      return fn.apply(
      (!this || this === (window || global)) ?
      obj : this
      curried.concat.apply( curried, arguments )
      );
    };
    bound.prototype = Object.create( fn.prototype );
    return bound;
  };
}
```

### 第三章 对象

#### 内置对象

JavaScript 中还有一些对象子类型，通常被称为内置对象

• String
• Number
• Boolean
• Object
• Function
• Array
• Date
• RegExp
• Error

#### 对象不变性

##### 禁止扩展

- Object.preventExtensions()
  - 对象不可扩展, 就是不能再给对线添加键值
  - Object.isExtensible() false

- Object.seal()
  - 密封对象, 此时对象不可扩展的同时, configurable为false, 还不能修改属性描述符 [[configurable]]
  - Object.isExtensible() false
  - Object.isSealed() 返回true

- Object.freeze()
  - 冻结对象, 对象密封、不可扩展, 并且不能修改对象属性的值
  - Object.isExtensiable() false
  - Object.isSealed() true
  - Object.isFrozen() true

以上三个方法其实都是通过对象数据属性描述符实现的。

##### 遍历

for..in 循环可以用来遍历对象的可枚举属性列表（包括 [[Prototype]] 链。

for..of 循环首先会向被访问对象请求一个迭代器对象，然后通过调用迭代器对象的next() 方法来遍历所有返回值。

数组有内置的 @@iterator，因此 for..of 可以直接应用在数组上。我们使用内置的 @@iterator 来手动遍历数组，看看它是怎么工作的：

```javascript
var myArray = [ 1, 2, 3 ];
var it = myArray[Symbol.iterator]();
it.next(); // { value:1, done:false }
it.next(); // { value:2, done:false }
it.next(); // { value:3, done:false }
it.next(); // { done:true }
```

和数组不同，普通的对象没有内置的 @@iterator，所以无法自动完成 for..of 遍历。之所以要这样做，有许多非常复杂的原因，不过简单来说，这样做是为了避免影响未来的对象类型。

当然，你可以给任何想遍历的对象定义 @@iterator，举例来说：

```javascript
var myObject = {
  a: 2,
  b: 3
};
Object.defineProperty( myObject, Symbol.iterator, {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function() {
    var o = this;
    var idx = 0;
    var ks = Object.keys( o );
    return {
      next: function() {
        return {
          value: o[ks[idx++]],
          done: (idx > ks.length)
        };
      }
    };
  }
} );
// 手动遍历 myObject
var it = myObject[Symbol.iterator]();
it.next(); // { value:2, done:false }
it.next(); // { value:3, done:false }
it.next(); // { value:undefined, done:true }
// 用 for..of 遍历 myObject
for (var v of myObject) {
  console.log( v );
}
// 2
// 3
```

### 第五章 原型

#### 属性设置和屏蔽

如果 foo 不直接存在于 myObject 中而是存在于原型链上层时 myObject.foo = "bar" 会出现的三种情况。

1. 如果在 \[[Prototype]] 链上层存在名为 foo 的普通数据访问属性（参见第 3 章）并且没有被标记为只读（writable:false），那就会直接在 myObject 中添加一个名为 foo 的新属性，它是屏蔽属性。
2. 如果在 \[[Prototype]] 链上层存在 foo，但是它被标记为只读（writable:false），那么无法修改已有属性或者在 myObject 上创建屏蔽属性。如果运行在严格模式下，代码会抛出一个错误。否则，这条赋值语句会被忽略。总之，不会发生屏蔽。
3. 如果在 \[[Prototype]] 链上层存在 foo 并且它是一个 setter（参见第 3 章），那就一定会调用这个 setter。foo 不会被添加到（或者说屏蔽于）myObject，也不会重新定义 foo 这个 setter。

#### 原型继承原理

所有的函数默认都会拥有一个名为 prototype 的公有并且不可枚举（参见第 3 章）的属性，它会指向另一个对象

#### 究极定义

现在我们知道了，\[[Prototype]] 机制就是存在于对象中的一个内部链接，它会引用其他对象。

通常来说，这个链接的作用是：如果在对象上没有找到需要的属性或者方法引用，引擎就会继续在 \[[Prototype]] 关联的对象上进行查找。同理，如果在后者中也没有找到需要的引用就会继续查找它的 \[[Prototype]]，以此类推。这一系列对象的链接被称为“原型链”。

JavaScript高级程序设计中的定义：
>原型对象将包含一个指向另一个原型的指针，相应地，另一个原型中也包含着一个指向另一个构造函数的指针。假如另一个原型又是另一个类型的实例，那么上述关系依然成立，如此层层递进，就构成了实例与原型的链条。这就是所谓原型链的基本概念。
