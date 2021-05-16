// SyncHook
// SyncBailHook
// SyncWaterfallHook
// SyncLoopHook

/*
const { SyncHook } = require('tapable')

let hook = new SyncHook(['name', 'age'])

hook.tap('fn1', function (name, age) {
    console.log('fn1----', name, age)
})

hook.tap('fn2', function (name, age) {
    console.log('fn2----', name, age)
})

hook.call('luck', 18)
*/

/*
熔断钩子函数
如果某一个函数返回追是一个非undefined得值，那么会触发熔断，后续的钩子不会执行
const { SyncBailHook } = require('tapable')

let hook = new SyncBailHook(['name', 'age'])

hook.tap('fn1', function (name, age) {
    console.log('fn1----', name, age)
})

hook.tap('fn2', function (name, age) {
    console.log('fn2----', name, age)
    return 'fn2'
})

hook.tap('fn3', function (name, age) {
    console.log('fn3----', name, age)
})

hook.call('luck', 18)
*/


/*
上一个钩子的返回值，会返回给下一个钩子
const { SyncWaterfallHook } = require('tapable')

let hook = new SyncWaterfallHook(['name', 'age'])

hook.tap('fn1', function (name, age) {
    console.log('fn1----', name, age)
    return 'fn1'
})

hook.tap('fn2', function (name, age) {
    console.log('fn2----', name, age)
    return 'fn2'
})

hook.tap('fn3', function (name, age) {
    console.log('fn3----', name, age)
    return 'fn3'
})

hook.call('name', 18)
*/


/*
如果当前监听器所对应的函数返回是非undefined，那么就是一直循环执行钩子
这个循环时从头开始的，比如说从f2中返回的true，会从f1再次执行
const { SyncLoopHook } = require('tapable')

let hook = new SyncLoopHook(['name', 'age'])
let count1 = 0
let count2 = 0
let count3 = 0
hook.tap('fn1', function (name, age) {
    console.log('fn1----', name, age)
    if (++count1 === 1) {
        count1 = 0
        return undefined
    }
    return true
})

hook.tap('fn2', function (name, age) {
    console.log('fn2----', name, age)
    if (++count2 === 2) {
        count2 = 0
        return undefined
    }
    return true
})

hook.tap('fn3', function (name, age) {
    console.log('fn3----', name, age)
})

hook.call('name', 18)
*/