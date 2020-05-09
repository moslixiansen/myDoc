### 对象、构造函数、原型链

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [对象、构造函数、原型链](#对象-构造函数-原型链)
  - [创建对象的方式](#创建对象的方式)
  - [对象属性类型](#对象属性类型)
    - [数据属性](#数据属性)
    - [访问器属性](#访问器属性)
  - [对象属性的其他方法](#对象属性的其他方法)
  - [创建对象](#创建对象)
    - [工厂模式](#工厂模式)
    - [构造函数模式](#构造函数模式)
    - [构造函数原理](#构造函数原理)
    - [原型模式](#原型模式)
    - [in 操作符和原型对象](#in-操作符和原型对象)
    - [原型方法](#原型方法)
    - [组合模式](#组合模式)
  - [实现继承](#实现继承)
    - [构造函数](#构造函数)
    - [组合继承](#组合继承)
    - [原型式继承](#原型式继承)
    - [寄生式继承](#寄生式继承)
    - [寄生组合式继承](#寄生组合式继承)
- [作用域、闭包](#作用域-闭包)

<!-- /code_chunk_output -->

#### 创建对象的方式
  
- 对象字面量
- new Object()

#### 对象属性类型

##### 数据属性

数据属性包含一个数据值的位置。在这个位置可以读取和写入值。数据属性有 4 个描述其行为的特性

- configurable
  - 默认值： true
  - 能否通过 delete 删除属性从而重新定义属性
  - 是否可以使用 Object.defineProperty(object, property, { }) 能否修改属性的特
性，或者能否把属性修改为访问器属性
  - 为 false 时，修改除 writable 之外的特性，都会导致错误
- enumerable
  - 默认值： true
  - 是否可枚举, 即示能否通过 for-in 循环返回属性
- writable
  - 默认值： true
  - 能否修改属性的值
- value
  - 默认值： undefined
  - 包含这个属性的数据值

##### 访问器属性

- configurable
  - 默认值： true
  - 能否通过 delete 删除属性从而重新定义属性
  - 是否可以使用 Object.defineProperty(object, property, { }) 能否修改属性的特
性，或者能否把属性修改为访问器属性
- enumerable
  - 默认值： true
  - 是否可枚举, 即示能否通过 for-in 循环返回属性
- get
  - 默认值： undefined
  - 在读取属性时调用的函数
- set
  - 默认值： undefined
  - 在写入属性时调用的函数

#### 对象属性的其他方法

```JavaScript
// 一次定义多个对象属性
Object.defineProperties(obj, {})

// 获取对象某个属性的描述符
Object.getOwnPropertyDescriptor(obj, name)
// 获取对象所有属性描述符
Object.getOwnPropertyDescriptors(obj)

// 判断是否是对象的属性，非原型链上的
obj.hasOwnProperty(property)

// 获取对象自身的属性，无论是否可枚举
Object.getOwnPropertyNames()

// 返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致
Object.keys()
```

#### 创建对象

##### 工厂模式

```javascript
const createPerson = function (name, age) {
  const obj = {}
  obj.name = name
  obj.age = age
  obj.getName = function () {
    return this.name
  }
  return obj
}
```

- 优点：然解决了创建多个相似对象的问题
- 缺点：没有解决对象识别的问题（即怎样知道一个对象的类型）

##### 构造函数模式

```javascript
const Person = function (name, age) {
  this.name = name
  this.age = age
  this.getName = function () {
    return this.name
  }
}
const p = new Person('leo', 18)
console.log(p instanceof Person) // true
```

- 优点：解决对象识别的问题，每个实例对象都可以通过 instanceof 判断是否 new 自某个构造函数
- 缺点：每个方法都要在每个实例上重新创建一遍，若将 getName 函数放在全局作用域之中，在全局作用域中定义的函数实际上只能被某个对象调用，这让全局作用域有点名不副实。如果对象需要定义很多方法，那么就要定义很多个全局函数，于是我们这个自定义的引用类型就丝毫没有封装性可言了。

##### 构造函数原理

##### 原型模式

原理：我们创建的每个函数都有一个 prototype（原型）属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。

```javascript
const Person = function () {}
Person.prototype.name = 'leo'
Person.prototype.age = 18
Person.prototype.getName = function () {
  return this.name
}
Person.prototype.color = [ 'red', 'green', 'blue' ]

console.log(this.getName())
const p1 = new Person()
p1.color.push('yellow')
const p2 = new Person()
console.log(p2.color)
```

- 优点：不同实例能共享原型对象上的属性和方法
- 缺点：1. 不同实例会共享原型上的属性，不能实现实例属性私有化，特别是引用类型的属性。2. 不能像构造函数一样传参

##### in 操作符和原型对象

in 操作符只要通过对象能够访问到属性就返回 true，hasOwnProperty()只在属性存在于
实例中时才返回 true。

```javascript
function hasPrototypeProperty(object, name){
 return !object.hasOwnProperty(name) && (name in object);
}
```

##### 原型方法

```javascript
alert(Person.prototype.isPrototypeOf(person1)); //true
alert(Object.getPrototypeOf(person1) == Person.prototype); //true
```

##### 组合模式

```javascript
const Person = function (name, color) {
  this.name = name
  this.color = color
}
Person.prototype.getColor = function () {
  return this.color
}

const p1 = new Person('leo', [ 'red', 'blue' ])

const p2 = new Person('mos', ['green'])
console.log(p1.getColor())
console.log(p2.getColor())
```

实例方法共享，实例属性私有，相对完美的创建对象的方式

#### 实现继承

##### 构造函数

```javascript
const SuperType = function (name) {
  this.name = name
  this.getName = function () {
    return this.name
  }
}

const SubType = function (name, age) {
  super.call(this, name)
  this.age = age
  this.getAge = function () {
    return this.age
  }
}

const sub = new SubType('ace', 18)
```

- 优点：能传参
- 缺点：不方法都在构造函数中定义，因此函数复用就无从谈起了。而且，在超类型的原型中定义的方法，对子类型而言也是不可见的，结果所有类型都只能使用构造函数模式

##### 组合继承

```javascript
const SuperType = function (name) {
  this.name = name
}

SuperType.prototype.getName = function () {
  return this.name
}

const SubType = function (name, age) {
  SuperType.call(this, name)
  this.age = age
}

SubType.prototype = new SuperType()
SubType.prototype.constructor = SubType

SubType.prototype.getAge = function () {
  return this.age
}

const s = new SubType('leo', 10)
console.log(s)
console.log(s.getName())
console.log(s.getAge())
```

- 缺点: 组合继承最大的
问题就是无论什么情况下，都会调用两次超类型构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部。

##### 原型式继承

```javascript
// obj 一定为对象，此函数相当于一次浅拷贝，
// 创建了一个新对象， 新对象保留现有对象的所有属性，引用类型的属性还是共享的
// 如果只是为了扩展对象，直接传入要基于的对象即可
// 如果是为了实现继承，则传入父类的原型对象，即 SuperType.prototype
function object (obj) {
  function F () {}
  F.prototype = obj
  return new F()
}
const origin = {
  name: 'leo',
  getName () {
    return this.name
  },
}
const a = object(origin)
```

基于一个对象，创建另一个对象。

es5 的内部实现：

```javascript
Object.create(obj, properties)
```

properties 相当于 Object.defineProperties()的第二个参数。

##### 寄生式继承

```javascript
function inherit (obj) {
  const a = object(obj)
  // 注意： getName() 和 name 属性是加在实例上， 而不是原型链上，同理 Object.create() 也是
  a.getName = function () {
    return this.name
  }
  a.age = 18
}
```

基于原型式继承，增强对象

##### 寄生组合式继承

```javascript
function object(obj) {
  function F() { }
  F.prototype = obj
  return new F()
}

function inheritPrototype(subtype, supertype) {
  // 注意 object 此时的参数为 supertype.prototype
  const prototype = object(supertype.prototype)
  prototype.constructor = subtype
  subtype.prototype = prototype
}

function SuperType(name) {
  this.name = name
}

SuperType.prototype.getName = function () {
  return this.name
}

function SubType(name, colors) {
  SuperType.call(this, name)
  this.colors = colors
}

inheritPrototype(SubType, SuperType)

SubType.prototype.getColors = function () {
  return this.colors
}

const s1 = new SubType('leo', ['red'])
const s2 = new SubType('mos', ['green'])

console.log(s1.getColors())
console.log(SubType)
console.log(SubType.prototype)
// 有些浏览器（edge 和 chrome 都有），通过 __proto__ 可以访问到 [[Prototype]] 属性
console.log(SubType.prototype.__proto__)
console.log(s1)
console.log(s1.getName())
console.log(s2.getColors())
console.log(s2.getName())
```

### 作用域、闭包

