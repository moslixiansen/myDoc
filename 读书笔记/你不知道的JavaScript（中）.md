## 第一部分 类型和语法

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [第一部分 类型和语法](#第一部分-类型和语法)
  - [第一章 类型](#第一章-类型)
    - [内置类型](#内置类型)
    - [undefined 和 undeclared](#undefined-和-undeclared)
  - [第二章 值](#第二章-值)
    - [数组](#数组)
    - [类数组](#类数组)
    - [字符串](#字符串)
    - [数字](#数字)
    - [整数检测](#整数检测)
    - [特殊数值](#特殊数值)
      - [NaN](#nan)
      - [无穷数](#无穷数)
      - [零值](#零值)
      - [特殊等式](#特殊等式)
  - [第三章 原生函数](#第三章-原生函数)
    - [封装对象包装](#封装对象包装)
    - [原生原型](#原生原型)
  - [第四章 强制类型转换](#第四章-强制类型转换)
    - [JSON 字符串化](#json-字符串化)
    - [ToNumber](#tonumber)
    - [日期显式转换为数字](#日期显式转换为数字)
    - [位运算](#位运算)
    - [显式解析数字字符串](#显式解析数字字符串)
      - [|| 和 &&](#和)
    - [符号的强制类型转换](#符号的强制类型转换)
    - [== 和 === 的理解](#和-的理解)
  - [第五章 表达式和语法](#第五章-表达式和语法)
    - [TDZ（暂时性死区）](#tdz暂时性死区)

<!-- /code_chunk_output -->

### 第一章 类型

#### 内置类型

JavaScript 有七种内置类型：

- 空值（null）
- 未定义（undefined）
- 布尔值（ boolean）
- 数字（number）
- 字符串（string）
- 对象（object）
- 符号（symbol，ES6 中新增）

除对象之外，其他统称为“基本类型”。

```javascript
var a = null;
// null 的检测
(!a && typeof a === "object"); // true
```

#### undefined 和 undeclared

直接访问 undeclared 的全局变量 DEBUG 会出现 ReferenceError 错误。这时我们可以利用 typeof 的安全防范机制，预防错误：

```javascript
// 这样会抛出错误
if (DEBUG) {
  console.log( "Debugging is starting" );
}
// 这样是安全的
if (typeof DEBUG !== "undefined") {
  console.log( "Debugging is starting" );
}
```

另一种不用通过 typeof 的安全防范机制的方法，就是检查所有全局变量是否是全局对象的属性，浏览器中的全局对象是 window。

```JavaScript
if (window.DEBUG) {
 // ..
}
```

### 第二章 值

#### 数组

创建“稀疏”数组（sparse array，即含有空白或空缺单元的数组）时要特别注意：

```JavaScript
var a = [ ];
a[0] = 1;
// 此处没有设置a[1]单元
a[2] = [ 3 ];
a[1]; // undefined
a.length; // 3
```

上面的代码可以正常运行，但其中的“空白单元”（empty slot）可能会导致出人意料的结果。a[1] 的值为 undefined，但这与将其显式赋值为 undefined（a[1] = undefined）还是有所区别。详情请参见 3.4.1 节。 <!-- TODO -->

#### 类数组

- Array.prototype.slice.call( arguments )
- Array.from( arguments )
- [...arguments]
- for 循环

#### 字符串

“借用”数组的非变更方法来处理字符串 **Array.prototype.func.call()**

```JavaScript
var a = "foo";
var b = ["f","o","o"];
var c = Array.prototype.join.call( a, "-" );
var d = Array.prototype.map.call( a, function(v){
 return v.toUpperCase() + ".";
} ).join( "" );
c; // "f-o-o"
d; // "F.O.O."
```

无法“借用”数组的可变更成员函数，因为字符串是不可变的：

```JavaScript
var a = "foo";
Array.prototype.reverse.call( a );
a // 返回值仍然是字符串"foo"的一个封装对象（参见第3章）:( todo

// 变通方法
var c = a
 // 将a的值转换为字符数组
 .split( "" )
 // 将数组中的字符进行倒转
 .reverse()
 // 将数组中的字符拼接回字符串
 .join( "" );
c; // "oof"
```

请注意！上述方法对于包含复杂字符（Unicode，如星号、多字节字符等）的字符串并不适用。这时则需要功能更加完备、能够处理 Unicode 的工具库。

#### 数字

```JavaScript
0.1 + 0.2 === 0.3; // false
```

该怎样来判断 0.1 + 0.2 和 0.3 是否相等呢？最常见的方法是设置一个误差范围值，通常称为“机器精度”（machine epsilon），对JavaScript 的数字来说，这个值通常是 2^-52 (2.220446049250313e-16)。

从 ES6 开始，该值定义在 **Number.EPSILON** 中，我们可以直接拿来用，也可以为 ES6 之前的版本写 polyfill：

```JavaScript
if (!Number.EPSILON) {
  Number.EPSILON = Math.pow(2,-52);
}
function numbersCloseEnoughToEqual(n1,n2) {
  return Math.abs( n1 - n2 ) < Number.EPSILON;
}
```

toPrecision(..) 方法用来指定有效数位的显示位数：

```JavaScript
var a = 42.59;
a.toPrecision( 1 ); // "4e+1"
a.toPrecision( 2 ); // "43"
a.toPrecision( 3 ); // "42.6"
a.toPrecision( 4 ); // "42.59"
a.toPrecision( 5 ); // "42.590"

// 无效语法：
42.toFixed( 3 ); // SyntaxError
// 下面的语法都有效：
(42).toFixed( 3 ); // "42.000"
0.42.toFixed( 3 ); // "0.420"
42..toFixed( 3 ); // "42.000"
```

数字常量还可以用其他格式来表示，如二进制、八进制和十六进制。

```JavaScript
0xf3; // 243的十六进制
0Xf3; // 同上
0o363; // 243的八进制
0O363; // 同上
0b11110011; // 243的二进制
0B11110011; // 同上

0363; // 243的八进制
```

从 ES6 开始，严格模式（strict mode）**不再支持 0363 八进制格式**

能够被“安全”呈现的最大整数是 **2^53 - 1**，即 9007199254740991，在 ES6 中被定义为 **Number.MAX_SAFE_INTEGER**。最小整数是-9007199254740991，在 ES6 中被定义为 **Number.MIN_SAFE_INTEGER。**

#### 整数检测

```JavaScript
Number.isInteger( 42 ); // true
Number.isInteger( 42.000 ); // true
Number.isInteger( 42.3 ); // false
// ES6 之前的版本 polyfill
if (!Number.isInteger) {
  Number.isInteger = function(num) {
    return typeof num == "number" && num % 1 == 0;
  };
}

Number.isSafeInteger( Number.MAX_SAFE_INTEGER ); // true
Number.isSafeInteger( Math.pow( 2, 53 ) ); // false
Number.isSafeInteger( Math.pow( 2, 53 ) - 1 ); // true
// ES6 之前的版本 polyfill
if (!Number.isSafeInteger) {
  Number.isSafeInteger = function(num) {
    return Number.isInteger( num ) &&
      Math.abs( num ) <= Number.MAX_SAFE_INTEGER;
  };
}
```

#### 特殊数值

- undefined 指从未赋值
- null 指曾赋过值，但是目前没有值
- void 运算符：表达式 void ___ 没有返回值，因此返回结果是 undefined。

```JavaScript
var a = 42;
console.log( void a, a ); // undefined 42
```

void 运算符在其他地方也能派上用场，比如不让表达式返回任何结果（即使其有副作用）。

```JavaScript
function doSomething() {
 // 注： APP.ready 由程序自己定义
  if (!APP.ready) {
  // 稍后再试
    return void setTimeout( doSomething,100 );
  }
  var result;
  // 其他
  return result;
}
// 现在可以了吗？
if (doSomething()) {
  // 立即执行下一个任务
}
```

这里 setTimeout(..) 函数返回一个数值（计时器间隔的唯一标识符，用来取消计时），但是为了确保 if 语句不产生误报（false positive），我们要 void 掉它。

##### NaN

可以使用内建的全局工具函数 isNaN(..) 来判断一个值是否是 NaN。isNaN(..) 有一个严重的缺陷，它的检查方式过于死板，就是“检查参数是否不是 NaN，也不是数字”。

```JavaScript
var a = 2 / "foo";
var b = "foo";
a; // NaN
b; "foo"
window.isNaN( a ); // true
window.isNaN( b ); // true——晕！
```

从 ES6 开始我们可以使用工具函数 **Number.isNaN(..)**。ES6 之前的浏览器的 polyfill 如下：

```JavaScript
if (!Number.isNaN) {
  Number.isNaN = function(n) {
    return (
      typeof n === "number" &&
      window.isNaN( n )
    );
  };
}
var a = 2 / "foo";
var b = "foo";
Number.isNaN( a ); // true
Number.isNaN( b ); // false——好！
```

也可以借助 NaN 是 JavaScript 中唯一一个不等于自身的值。

```JavaScript
if (!Number.isNaN) {
  Number.isNaN = function(n) {
    return n !== n;
  };
}
```

##### 无穷数

```JavaScript
var a = 1 / 0; // Infinity
var b = -1 / 0; // -Infinity
```

##### 零值

```JavaScript
var a = 0 / -3; // -0
var b = 0 * -3; // -0
// 但是规范定义的返回结果是这样！
a.toString(); // "0"
a + ""; // "0"
String( a ); // "0"
// JSON也如此，很奇怪
JSON.stringify( a ); // "0"

// 有意思的是，如果反过来将其从字符串转换为数字，得到的结果是准确的：
+"-0"; // -0
Number( "-0" ); // -0
JSON.parse( "-0" ); // -0
```

要区分 -0 和 0，不能仅仅依赖开发调试窗口的显示结果，还需要做一些特殊处理：

```JavaScript
function isNegZero(n) {
  n = Number( n );
  return (n === 0) && (1 / n === -Infinity);
}
isNegZero( -0 ); // true
isNegZero( 0 / -3 ); // true
isNegZero( 0 ); // false
```

##### 特殊等式

由于 NaN 和自身不相等所以必须使用 ES6 中的 Number.isNaN(..)（或者 polyfill）。而 -0 等于 0（对于 === 也是如此，参见第 4 章），因此我们必须使用 isNegZero(..) 这样的工具函数。

ES6 中新加入了一个工具方法 Object.is(..) 来判断两个值是否绝对相等，可以用来处理上述所有的特殊情况：

```JavaScript
var a = 2 / "foo";
var b = -3 * 0;
Object.is( a, NaN ); // true
Object.is( b, -0 ); // true
Object.is( b, 0 ); // false
```

对于 ES6 之前的版本，Object.is(..) 有一个简单的 polyfill：

```JavaScript
if (!Object.is) {
  Object.is = function(v1, v2) {
    // 判断是否是-0
    if (v1 === 0 && v2 === 0) {
      return 1 / v1 === 1 / v2;
    }
    // 判断是否是NaN
    if (v1 !== v1) {
      return v2 !== v2;
    }
    // 其他情况
    return v1 === v2;
  };
}
```

### 第三章 原生函数

常用的原生函数有：

- String()
- Number()
- Boolean()
- Array()
- Object()
- Function()
- RegExp()
- Date()
- Error()
- Symbol()——ES6 中新加入的！

#### 封装对象包装

```JavaScript
var a = "abc";
var b = new String( a );
var c = Object( a );
typeof a; // "string"
typeof b; // "object"
typeof c; // "object"
a instanceof String; // false
b instanceof String; // true
c instanceof String; // true
Object.prototype.toString.call( a ); // "[object String]"
Object.prototype.toString.call( b ); // "[object String]"
Object.prototype.toString.call( c ); // "[object String]"
```

```JavaScript
var a = new Array( 3 );
var b = [ undefined, undefined, undefined ];
a.join( "-" ); // "--"
b.join( "-" ); // "--"
a.map(function(v,i){ return i; }); // [ undefined x 3 ]
b.map(function(v,i){ return i; }); // [ 0, 1, 2 ]
```

a.map(..) 之所以执行失败，是因为数组中并不存在任何单元，所以 map(..) 无从遍历。而join(..) 却不一样，它的具体实现可参考下面的代码：

```JavaScript
function fakeJoin(arr,connector) {
 var str = "";
 for (var i = 0; i < arr.length; i++) {
    if (i > 0) {
      str += connector;
    }
    if (arr[i] !== undefined) {
      str += arr[i];
    }
  }
  return str;
}
var a = new Array( 3 );
fakeJoin( a, "-" ); // "--"
```

我们可以通过下述方式来创建包含 undefined 单元（而非“空单元”）的数组：

```JavaScript
var a = Array.apply( null, { length: 3 } );
a; // [ undefined, undefined, undefined ]
```

#### 原生原型

<!-- todo -->
**这里的结论待确认**
Function.prototype 是一个空函数，RegExp.prototype 是一个“空”的正则表达式（无任何匹配），而 Array.prototype 是一个空数组。对未赋值的变量来说，它们是很好的默认值。

### 第四章 强制类型转换

#### JSON 字符串化

工具函数 JSON.stringify(..) 在将 JSON 对象序列化为字符串时也用到了 ToString。

undefined、function、symbol（ES6+）和包含循环引用（对象之间相互引用，形成一个无限循环）的对象都不符合 JSON结构标准，都是非安全 JSON 值。

JSON.stringify(..) **在对象中遇到 undefined、function 和 symbol 时会自动将其忽略**，**在数组中则会返回 null**（以保证单元位置不变）。

```JavaScript
JSON.stringify( undefined ); // undefined
JSON.stringify( function(){} ); // undefined
JSON.stringify(
  [1,undefined,function(){},4]
); // "[1,null,null,4]"
JSON.stringify(
  { a:2, b:function(){} }
); // "{"a":2}"
```

对**包含循环引用的对象执行 JSON.stringify(..) 会出错**。

如果对象中定义了 toJSON() 方法，JSON 字符串化时会首先调用该方法，然后用它的返回值来进行序列化。

如果要对含有非法 JSON 值的对象做字符串化，或者对象中的某些值无法被序列化时，就需要定义 toJSON() 方法来返回一个安全的 JSON 值。

toJSON() 应该**返回一个能够被字符串化的安全的 JSON 值**，而不是“返回一个 JSON 字符串”。

我们可以向 JSON.stringify(..) 传递一个可选参数 replacer，它可以是数组或者函数，用来指定对象序列化过程中哪些属性应该被处理，哪些应该被排除，和 toJSON() 很像。

如果 replacer 是一个**数组**，那么它必须是一个字符串数组，其中包含序列化要处理的**对象的属性名称**，除此之外**其他的属性则被忽略**。

如果 replacer 是一个**函数**，它会**对对象本身调用一次**，然后**对对象中的每个属性**各调用一次，每次传递两个参数，键和值。如果要忽略某个键就返回 undefined，否则返回指定的值。

```JavaScript
var a = {
  b: 42,
  c: "42",
  d: [1,2,3]
};
JSON.stringify( a, ["b","c"] ); // "{"b":42,"c":"42"}"
JSON.stringify( a, function(k,v){
  if (k !== "c") return v;
});
// "{"b":42,"d":[1,2,3]}"
```

JSON.string 还有一个可选参数 space，用来指定输出的缩进格式。space 为正整数时是指定每一级缩进的字符数，它还可以是字符串，此时最前面的十个字符被用于每一级的缩进

#### ToNumber

ES5 规范在 9.3 节定义了抽象操作 ToNumber: **true 转换为 1，false 转换为 0。undefined 转换为 NaN，null 转换为 0**

首先检查该值是否有 valueOf() 方法。如果有并且返回基本类型值，就使用该值进行强制类型转换。如果没有就使用 toString()的返回值（如果存在）来进行强制类型转换。

从 ES5 开始，使用 Object.create(null) 创建的对象 \[[Prototype]] 属性为 null，并且没有 valueOf() 和 toString() 方法，因此无法进行强制类型转换。

#### 日期显式转换为数字

- +new Date()
- new Date().getTime()
- Date.now()

#### 位运算

- **| 运算符**： 执行 ToInt32 转换

```JavaScript
0 | -0; // 0
0 | NaN; // 0
0 | Infinity; // 0
0 | -Infinity; // 0
```

以上这些特殊数字无法以 32 位格式呈现（因为它们来自 64 位 IEEE 754 标准，参见第 2章），因此 ToInt32 返回 0。

- **~ 运算符**

~x 大致等同于 -(x+1)。很奇怪。

```JavaScript
~42; // -(42+1) ==> -43
```

- **~~ 字位截除**

~~ 中的第一个 ~ 执行 ToInt32 并反转字位，然后第二个 ~ 再进行一次字位反转，即将所有字位反转回原值，最后得到的仍然是 ToInt32 的结果。

```JavaScript
Math.floor( -49.6 ); // -50
~~-49.6; // -49
```

#### 显式解析数字字符串

解析允许字符串中含有非数字字符，解析按从左到右的顺序，如果遇到非数字字符就停止。而转换不允许出现非数字字符，否则会失败并返回 NaN。

```JavaScript
var a = "42";
var b = "42px";
Number( a ); // 42
parseInt( a ); // 42
Number( b ); // NaN
parseInt( b ); // 42
```

解析字符串中的浮点数可以使用 parseFloat(..) 函数。

**字符串强制类型转换为数字**

```JavaScript
var a = "3.14";
var b = a - 0;
b; // 3.14
```

##### || 和 &&

```JavaScript
a || b;
// 大致相当于(roughly equivalent to):
a ? a : b;
a && b;
// 大致相当于(roughly equivalent to):
a ? b : a;
```

#### 符号的强制类型转换

ES6 允许从符号到字符串的显式强制类型转换，然而隐式强制类型转换会产生错误。

```JavaScript
var s1 = Symbol( "cool" );
String( s1 ); // "Symbol(cool)"
var s2 = Symbol( "not cool" );
s2 + ""; // TypeError
```

符号不能够被强制类型转换为数字（显式和隐式都会产生错误），但可以被强制类型转换为布尔值（显式和隐式结果都是 true）。

#### == 和 === 的理解
  
== 允许在相等比较中进行强制类型转换，而 === 不允许

### 第五章 表达式和语法

#### TDZ（暂时性死区）

```JavaScript
{
  a = 2; // ReferenceError!
  let a;
}
{
  typeof a; // undefined
  typeof b; // ReferenceError! (TDZ)
  let b;
}
```