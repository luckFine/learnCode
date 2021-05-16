/**
 *
 * tapable库异步串行钩子
    AsyncSeriesHook
    AsyncSeriesBailHook
    AsyncSeriesWaterfallHook

    tapable库异步并行钩子
    AsyncParallelHook
    AsyncParallelBailHook

 */

/*
const { AsyncParallelHook } = require('tapable')
// 此案例还是串行
let hook = new AsyncParallelHook(['name'])
// 对于异步钩子的使用，在添加事件监听时会存在三种方式：tap，tapAsync tapPromise
hook.tap('fn1', function (name) {
   console.log('fn1----', name)
})
hook.tap('fn2', function (name) {
   console.log('fn2----', name)
})
hook.tap('fn3', function (name) {
   console.log('fn3----', name)
})
hook.callAsync('name', function () {
   console.log('最后执行了')
})
*/


/*
const { AsyncParallelHook } = require('tapable')
// 并行
let hook = new AsyncParallelHook(['name'])
// 对于异步钩子的使用，在添加事件监听时会存在三种方式：tap，tapAsync tapPromise
console.time('time');
hook.tapAsync('fn1', function (name, callback) {
    setTimeout(() => {
        console.log('fn1----', name)
        callback()
    }, 1000);
})
hook.tapAsync('fn2', function (name, callback) {
    setTimeout(() => {
        console.log('fn2----', name)
        callback()
    }, 2000);
})
hook.callAsync('luck', function () {
    console.log('最后一个回调执行了')
    console.timeEnd('time')
})
*/

/*
const { AsyncParallelHook } = require('tapable')
// 并行
let hook = new AsyncParallelHook(['name'])
// 对于异步钩子的使用，在添加事件监听时会存在三种方式：tap，tapAsync tapPromise
console.time('time');
hook.tapPromise('fn1', function (name, callback) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log('fn1---', name)
            resolve()
        }, 1000);
    })
})
hook.tapPromise('fn2', function (name, callback) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log('fn2---', name)
            resolve()
        }, 2000);
    })
})
hook.promise('luck').then(() => {
    console.log('最后一个回调执行了')
    console.timeEnd('time')
})
*/

/*
const { AsyncParallelBailHook } = require('tapable')
// 此案例还是并行
let hook = new AsyncParallelBailHook(['name'])
// 对于异步钩子的使用，在添加事件监听时会存在三种方式：tap，tapAsync tapPromise
console.time('time');
hook.tapAsync('fn1', function (name, callback) {
    setTimeout(() => {
        console.log('fn1----', name)
        callback()
    }, 1000);
})
hook.tapAsync('fn2', function (name, callback) {
    setTimeout(() => {
        console.log('fn2----', name)
        callback()
    }, 2000);
})
hook.tapAsync('fn3', function (name, callback) {
    setTimeout(() => {
        console.log('fn3----', name)
        callback()
    }, 3000);
})
hook.callAsync('name', function () {
    console.log('最后执行了')
    console.timeEnd('time')
})
*/

const { AsyncSeriesHook } = require('tapable')
// 此案例还是串行
let hook = new AsyncSeriesHook(['name'])
// 对于异步钩子的使用，在添加事件监听时会存在三种方式：tap，tapAsync tapPromise
console.time('time');
hook.tapPromise('fn1', function (name, callback) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log('fn1---', name)
            resolve()
        }, 1000);
    })
})
hook.tapPromise('fn2', function (name, callback) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log('fn2---', name)
            resolve()
        }, 2000);
    })
})
hook.promise('luck').then(() => {
    console.log('最后一个回调执行了')
    console.timeEnd('time')
})