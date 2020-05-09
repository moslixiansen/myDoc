#### 别把对象当作Map

- obj做map，key只支持字符串，传入别的类型都会调用静默toString转为字符串，限制太大了
- 每个对象都有原型，尽管定义新的空对象作为map，仍然可以访问原型对象的属性。

```JavaScript
var a = {
  name: 'leo'
}

typeof a.name['concat'] // undefined

// 因为 a.name 是字符串，所以会直接访问到 String.prototype 上的属性
a.name['concat'] // ƒ concat() { [native code] }
a.name['constructor'] // ƒ String() { [native code] }
```

#### 正则表达式

- 操作HTML节点中的字符串
- 使用CSS选择器表达式定位部分选择器
- 判断一个元素是否具有指定的类名(class)
- 输入校验

##### 修饰符

- i —— 对大小写不敏感，例如/test/i不仅可以匹配test，还可以匹配
Test、TEST、tEsT等。
- g —— 查找所有匹配项，在查找到第一个匹配时不会停止，会继续
查找下一个匹配项。稍后会详细介绍。
- m —— 允许多行匹配，对获取textarea元素的值很有用。
- y —— 开启粘连匹配。正则表达式执行粘连匹配时试图从最后一个
匹配的位置开始。
- u —— 允许使用Unicode点转义符（\u{…}）。
