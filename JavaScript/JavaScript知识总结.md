
### Array.prototype.sort

- array.sort() 默认会对数组的每一项调用 toString() 方法再进行比较
- array.sort 可以传入一个 compareFun(a, b), 自定义排序结果:
  - compareFun 返回 小于 0 的数字时, a 排在 b 前面
  - compareFun 返回 大于 0 的数字时, a 排在 b 后面
- array.reverse() 相当于 array.sort(() => -1)
- array.sort() 和 array.reverse() 都会对原数组产生影响, 都返回原数组的引用

```JavaScript
// 默认会对数组的每一项调用 toString() 方法再进行比较:
[1, 2, 3, 15, 4, 25, 5].sort()  // [1, 15, 2, 25, 3, 4, 5]

// 降序
[1, 2, 3, 15, 4, 25, 5].sort((a, b) => a >= b ? -1 : 1)
// 升序
[1, 2, 3, 15, 4, 25, 5].sort((a, b) => a > b ? 1 : -1)
```

### 对象数组的去重

```
//根据对象数组 objArr 的 prop 属性进行数组去重
const objectArrayUnique = function (objArr, prop) {
    const obj = {};
    objArr.forEach( (item, index) => {
        obj[item[prop]] ? objArr.splice(index, 1) : obj[item[prop]] = true
    })
};
//输入数据
const objArr = [
    {value: 68, driver_name: "黄中杰", driver_mobile: "13662639090"}, //intialIndex = 0
    {value: 68, driver_name: "黄中杰", driver_mobile: "13662639090"}, //intialIndex = 1
    {value: 68, driver_name: "黄中杰", driver_mobile: "13662639090"}, //intialIndex = 2
]
const prop = 'value'
//去重后
objArr = [
    {value: 68, driver_name: "黄中杰", driver_mobile: "13662639090"}, //intialIndex = 0
    {value: 68, driver_name: "黄中杰", driver_mobile: "13662639090"}, //intialIndex = 2
]
```
结果分析:　forEach 遍历的时候, 当遇到第一个重复的元素1, 会将元素1 splice 掉, 下一次遍历时: 
```
index = 2; 
objArr = [
    {value: 68, driver_name: "黄中杰", driver_mobile: "13662639090"}, //intialIndex = 0 index = 0 
    {value: 68, driver_name: "黄中杰", driver_mobile: "13662639090"}, //intialIndex = 2 index = 1
];
```
因为 index = 2, 而 objArr 已经动态实时删除了一个元素, 所以 intialIndex = 2 的元素被跳过了。

结论: 此方法遇到有连续两个需要去重的元素时, 会跳过后一个
优化: 使用 Array.prototype.filter(), 代价: 新增一个返回组数替换原数组　 
```
const objectArrayUnique = function (objArr, prop) {
    const obj = {};
    return objArr.filter( item => {
        if (obj[item[prop]]) {
            return false
        } else {
            obj[item[prop]] = true
            return true
        }
    })
};

```

#### 隐藏 scroll-view 滚动条

``` css
::-webkit-scrollbar {
 width: 0;
 height: 0;
 color: transparent;
}
```