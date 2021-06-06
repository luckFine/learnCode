/**
 * l浏览器中的事件环
 *
 * 两个任务队列 一个宏任务 一个微任务
 * 从上至下执行所有的同步代码
 * 执行过程中将遇到的宏任务与微任务添加至相应的队列
 * 同步代码执行完毕后，执行满足条件的微任务回调
 * 微任务队列执行完毕后执行所有满足需求的宏任务回调
 * 循环事件环操作
 * 注意：每执行一个宏任务之后就会立即检查微任务队列
 */
// setTimeout(() => {
//     console.log('s1')
//     Promise.resolve().then(() => {
//         console.log('p2')
//     })
//     Promise.resolve().then(() => {
//         console.log('p3')
//     })
// });
// Promise.resolve().then(() => {
//     console.log('p1')
//     setTimeout(() => {
//         console.log('s2')
//     });
//     setTimeout(() => {
//         console.log('s3')
//     });
// })


/**
 * nodejs中的事件环  6个事件队列
 * times--pending callbacks--idle prepare--poll--check--close callback
 *
 * times：执行settimeout setinterval 的回调
 * pending callbacks：执行系统操作的回调，例如tcp udp
 * idle，prepare：只在系统内部进行使用
 * poll：执行与I/O 相关的回调
 * check：执行setimmediate中的回调
 * close callback：执行close事件的回调
 *
 * 执行同步代码，将不同的任务添加至相应的队列
 * 所有同步代码执行后会去执行满足条件的微任务
 * 所有微任务执行后会执行timer队列中满足的宏任务
 * timer中的所有宏任务执行完成后就会依次切换队列
 * 注意：在完成队列切换之前会先清空微任务代码
 */

// 微任务队列中  nextTick 的优先级高于 then
// setTimeout(() => {
//     console.log('s1')
// });
// Promise.resolve().then(() => {
//     console.log('p1')
// })
// console.log('start')
// process.nextTick(() => {
//     console.log('tick')
// })
// setImmediate(() => {
//     console.log('setImmediate')
// })
// console.log('end')
// start end tic p1 s1 setImmediate



// setTimeout(() => {
//     console.log('s1')
//     Promise.resolve().then(() => {
//         console.log('p1')
//     })
//     process.nextTick(() => {
//         console.log('t1')
//     })
// })
// Promise.resolve().then(() => {
//     console.log('p2')
// })
// console.log('starts')
// setTimeout(() => {
//     console.log('s2')
//     Promise.resolve().then(() => {
//         console.log('p3')
//     })
//     process.nextTick(() => {
//         console.log('t2')
//     })
// });
// console.log('end')
//  start end p2 s1 s2 t1 t2 p1 p3


/**
 * Node 与浏览器事件环不同
 *
 * 任务队列数不同
 *      浏览器中只有两个任务队列
 *      nodejs中有6个事件队列
 * Nodejs微任务执行时机不同
 *      两者都会在同步执行完毕后执行微任务
 *      浏览器平台下每当一个宏任务执行完毕后就会清空微任务
 *      Nodejs平台在事件队列切换时会清空微任务
 * 微任务优先级不同
 *      浏览器事件环中，微任务存放与事件队列，先进先出
 *      nodejs中process.nextTick先与promise.then
 */


/**
 * nodejs 事件环常见问题
 */

// 为什么有时候先输出setTimeout 有时候先输出setImmediate？

// setTimeout传入0 ，有时候会产生延时?
setTimeout(() => {
    console.log('setTimeout')
}, 0);
setImmediate(() => {
    console.log('setImmediate')
})

const fs = require('fs')
fs.readFileSync('./a.txt', () => {
    setTimeout(() => {
        console.log('setTimeout')
    }, 0);
    setImmediate(() => {
        console.log('setImmediate')
    })
})

/**
 * 默认情况下setTimeout 和setImmediate 执行顺序是随机的
 * 因为setTimeout后面有一个延时不固定的时间
 * 如果将其放在一个I/O的回调中，这时setTimeout 和setImmediate的执行顺序就变成了固定的
 * setImmediate先输出，然后是setTimeout
 */