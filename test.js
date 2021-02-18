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
