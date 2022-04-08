// async function async1() {
//     console.log("async1 start");
//     await  async2();
//     console.log("async1 end");
// }

// async  function async2() {
//     console.log( 'async2');
// }

// console.log("script start");

// setTimeout(function () {
//     console.log("settimeout");
// },0);

// async1();

// new Promise(function (resolve) {
//     console.log("promise1");
//     resolve();
// }).then(function () {
//     console.log("promise2");
// });
// console.log('script end'); 


// const a =  {
//   value: 1,
//   [Symbol.toPrimitive] () {
//     return 2
//   },
//   valueOf () {
//     return 3
//   },
//   toString() {
//     return 4
//   }
// }
// console.log(a)


// function P (name, age) {
//   this.name = name
//   this.age = age
//   return false
// }
// P.prototype.getName = function () {
//   return this.name
// }
// var p = new P('leo', 10)
// console.log(p)
// console.log(p.getName())

// function myNew() {
//   const args = [ ...arguments ]
//   const fn = args.shift()
//   const obj = Object.create(fn.prototype)
//   const f = Symbol('fn')
//   obj[f] = fn
//   const ret = obj[f](...args)
//   delete obj[f]

//   if(ret && typeof ret === 'object') {
//     return ret
//   } else {
//     return obj
//   }
// }

// var p1 = myNew(P, 'bob', 1)
// console.log(p1) 
// console.log(p1.getName())


// if (!Object.create1) {
//   Object.prototype.create1 = function(prototype) {
//     const F = function() {}
//     F.prototype = prototype
//     console.log(F.prototype.constructor)
//     return new F()
//   }
// }
// function Super (name, age) {
//   this.name = name
//   this.age = age
// }

// Super.prototype.getName = function () {
//   return this.name
// }

// function Sub (name, age, sex) {
//   Super.call(this, name, age)
//   this.sex = sex
// }
// Sub.prototype = Object.create1(Super.prototype)
// Sub.prototype.getSex = function () {
//   return this.sex
// }
// Sub.prototype.constructor = Sub


// var s = new Super('O', 1)
// console.log(s, s.getName())

// var b = new Sub('L', 12, 'male')
// console.log(b, b.getName(), b.getSex(), b.constructor)

// if(!Function.prototype.apply) {
//   Function.prototype.apply = function() {
//     const fn = this
//     const args = arguments
//     const context = [  ]
//   }
// }


// function mySymbol(str) {
//   var obj = {}
//   return function randomStr () {

//     if (obj[str]) {
//       randomStr(str)
//     } else {

//     }
//   }
// }


// function New(fn, ...args) {
//   const obj = Object.create(fn.prototype)
//   const f = fn.bind(obj, ...args)
//   const res = f()
  
//   return res || obj
// }

// function P(name, age) {
//   this.name = name
//   this.age = age
// }

// const p1 = New(P, 18, 'male')
// console.log(p1)

// timers pending callbacks idle,prepare poll check close callbacks







class EventEmiter {
  constructor () {
    this.events = {}
  }

  on(type, cb) {
    const event = this.events[type]
    if(!event) {
      this.events[type] = new Set()
    }
    this.events[type].add(cb)
  }

  emit(type, ...args) {
    const event = this.events[type]
    event && event.forEach(cb => cb(...args))
  }

  off(type, cb) {
    const event = this.events[type]
    if (event && event.has(cb)) {
      event.delete(cb)
    }
    if (event && !event.size) {
      delete this.events[type]
    }
  }

  offAll(type) {
    const event = this.events[type]
    if (event) {
      delete this.events[type]
    }
  }
}

