<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [node 和浏览器环境下 setTimeout 中 this 的指向](#node-和浏览器环境下-settimeout-中-this-的指向)
  - [知识点](#知识点)
    - [箭头函数](#箭头函数)
    - [node 中的  setTimeout](#node-中的-settimeout)
- [Array.prototype.sort](#arrayprototypesort)
- [对象数组的去重](#对象数组的去重)
- [隐藏 scroll-view 滚动条](#隐藏-scroll-view-滚动条)

<!-- /code_chunk_output -->

## node 和浏览器环境下 setTimeout 中 this 的指向

```JavaScript
function Counter() {
  var start = Date.now()
  this.num = 0
  console.log(this)  // 原面试题没有这行
  console.log(window.num) // 原面试题没有这行

  this.timer1 = setInterval(function () {
    // node 中，应用隐式绑定，指向 timer （Timeout的实例）
    console.log(this) // 浏览器中：应用默认绑定 指向 window  // 原面试题没有这行
    console.log('-------timer1', this.num) // 原面试题没有这行
    this.num++
    var gap = Date.now() - start
    console.log('timer1', this.num, gap)
  }, 996)

  var begin  = Date.now()
  while (Date.now() - begin < 1024) {}

  this.timer2 = setTimeout(() => {
    this.num++
    console.log(this) // 箭头函数可以让setTimeout里面的this，绑定定义时所在的作用域，而不是指向运行时所在的作用域。 // 原面试题没有这行
    console.log('-------timer2', this.num) // 原面试题没有这行
    var gap = Date.now() - start
    console.log('timer2', this.num, gap)
  }, 0)
}
```

原来是一道面试题，分别写出 Count() 和 new Count() 的前十个输出

### 知识点

#### 箭头函数

- 箭头函数中的 this 指向其定义时外部环境的 this，箭头函数使函数中的 this 变成了基于词法作用域查找，并且不能通过 new、 call、apply等 this 改变箭头函数中 this 的指向，也就是箭头函数中的 this 指向不可变
- 不能 new 箭头函数，会抛出箭头函数非 constructor 的错误
- 没有arguments参数，需要使用的话用 ...rest 参数代替
- 不能用在 generator 函数中的 yield 表达式后面

#### node 中的  setTimeout

```JavaScript
// setTimeout 函数的定义
// 参考 node 源码 https://github.com/nodejs/node/blob/master/lib/timers.js
function setTimeout(callback, after, arg1, arg2, arg3) {
  validateCallback(callback);

  let i, args;
  switch (arguments.length) {
    // fast cases
    case 1:
    case 2:
      break;
    case 3:
      args = [arg1];
      break;
    case 4:
      args = [arg1, arg2];
      break;
    default:
      args = [arg1, arg2, arg3];
      for (i = 5; i < arguments.length; i++) {
        // Extend array dynamically, makes .apply run much faster in v6.0.0
        args[i - 2] = arguments[i];
      }
      break;
  }

  const timeout = new Timeout(callback, after, args, false, true);
  insert(timeout, timeout._idleTimeout);

  return timeout;
}

// Timeout 构造函数  参考 https://github.com/nodejs/node/blob/2d5d77306f6dff9110c1f77fefab25f973415770/lib/internal/timers.js#L158
// Timer constructor function.
// The entire prototype is defined in lib/timers.js
function Timeout(callback, after, args, isRepeat, isRefed) {
  after *= 1; // Coalesce to number or NaN
  if (!(after >= 1 && after <= TIMEOUT_MAX)) {
    if (after > TIMEOUT_MAX) {
      process.emitWarning(`${after} does not fit into` +
                          ' a 32-bit signed integer.' +
                          '\nTimeout duration was set to 1.',
                          'TimeoutOverflowWarning');
    }
    after = 1; // Schedule on next tick, follows browser behavior
  }

  this._idleTimeout = after;
  this._idlePrev = this;
  this._idleNext = this;
  this._idleStart = null;
  // This must be set to null first to avoid function tracking
  // on the hidden class, revisit in V8 versions after 6.2
  this._onTimeout = null;
  this._onTimeout = callback; // 注意将回调赋值给 this._onTimeout
  this._timerArgs = args;
  this._repeat = isRepeat ? after : null;
  this._destroyed = false;

  if (isRefed)
    incRefCount();
  this[kRefed] = isRefed;

  initAsyncResource(this, 'Timeout');
}

// 回调处理 
function processTimers(now) {
  debug('process timer lists %d', now);
  nextExpiry = Infinity;

  let list;
  let ranAtLeastOneList = false;
  while (list = timerListQueue.peek()) {
    if (list.expiry > now) {
      nextExpiry = list.expiry;
      return refCount > 0 ? nextExpiry : -nextExpiry;
    }
    if (ranAtLeastOneList)
      runNextTicks();
    else
      ranAtLeastOneList = true;
    listOnTimeout(list, now);
  }
  return 0;
}
// 回调的执行
function listOnTimeout(list, now) {
    const msecs = list.msecs;

    debug('timeout callback %d', msecs);

    let ranAtLeastOneTimer = false;
    let timer;
    while (timer = L.peek(list)) {
      const diff = now - timer._idleStart;

      // Check if this loop iteration is too early for the next timer.
      // This happens if there are more timers scheduled for later in the list.
      if (diff < msecs) {
        list.expiry = MathMax(timer._idleStart + msecs, now + 1);
        list.id = timerListId++;
        timerListQueue.percolateDown(1);
        debug('%d list wait because diff is %d', msecs, diff);
        return;
      }

      if (ranAtLeastOneTimer)
        runNextTicks();
      else
        ranAtLeastOneTimer = true;

      // The actual logic for when a timeout happens.
      L.remove(timer);

      const asyncId = timer[async_id_symbol];

      if (!timer._onTimeout) {
        if (!timer._destroyed) {
          timer._destroyed = true;

          if (timer[kRefed])
            refCount--;

          if (destroyHooksExist())
            emitDestroy(asyncId);
        }
        continue;
      }

      emitBefore(asyncId, timer[trigger_async_id_symbol], timer);

      let start;
      if (timer._repeat)
        start = getLibuvNow();

      try {
        const args = timer._timerArgs;
        if (args === undefined)
          timer._onTimeout(); // 注意调用方式， timer._onTimeout()，应用默认绑定， this 指向 timer，也就解释了为什么 node 环境下 setTimeout 中的 this 指向 Timeout
        else
          timer._onTimeout(...args);
      } finally {
        if (timer._repeat && timer._idleTimeout !== -1) {
          timer._idleTimeout = timer._repeat;
          insert(timer, timer._idleTimeout, start);
        } else if (!timer._idleNext && !timer._idlePrev && !timer._destroyed) {
          timer._destroyed = true;

          if (timer[kRefed])
            refCount--;

          if (destroyHooksExist())
            emitDestroy(asyncId);
        }
      }

      emitAfter(asyncId);
    }

    // If `L.peek(list)` returned nothing, the list was either empty or we have
    // called all of the timer timeouts.
    // As such, we can remove the list from the object map and
    // the PriorityQueue.
    debug('%d list empty', msecs);

    // The current list may have been removed and recreated since the reference
    // to `list` was created. Make sure they're the same instance of the list
    // before destroying.
    if (list === timerListMap[msecs]) {
      delete timerListMap[msecs];
      timerListQueue.shift();
    }
  }

  return {
    processImmediate,
    processTimers
  };
}
```

- [参考：箭头函数中的this](https://es6.ruanyifeng.com/#docs/function#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0)
- [node 源码 setTimeout 定义](https://github.com/nodejs/node/blob/master/lib/timers.js)
- [Timeout 构造函数 及 回调的执行](https://github.com/nodejs/node/blob/2d5d77306f6dff9110c1f77fefab25f973415770/lib/internal/timers.js#L158)
- [参考 Timer源码解读]()

## Array.prototype.sort

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

## 对象数组的去重

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

## 隐藏 scroll-view 滚动条

``` css
::-webkit-scrollbar {
 width: 0;
 height: 0;
 color: transparent;
}
```