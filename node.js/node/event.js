// 通过EventEmitter类 实现事件统一管理
/**
 * node.js 是基于事件驱动的异步操作架构，内置events模块
 * events模块提供了EventEmitter类
 * node.js 中很多内置核心模块继承了EventEmitter
 *
 * EventEmitter常见API
 * on: 添加当前事件被触发时调用的回调函数
 * emit：触发事件，按照注册的顺序同步调用每个事件监听器
 * once：添加当事件在注册之后首次被触发时调用的回调函数
 * off：移除特定的监听器
 */

// const EventEmitter = require('events')
// const ev = new EventEmitter()
// ev.on('事件1', () => {
//     console.log('事件1执行了')
// })
// ev.on('事件1', () => {
//     console.log('事件1执行了---')
// })
// ev.emit('事件1')
// 多次触发还是会执行
// ev.emit('事件1')


// once
// const EventEmitter = require('events')
// const ev = new EventEmitter()
// ev.once('事件1', () => {
//     console.log('事件1执行了')
// })
// ev.once('事件1', () => {
//     console.log('事件1执行了---')
// })

// ev.emit('事件1')
// 针对once，多次触发，只会执行一次
// ev.emit('事件1')


// off
// const EventEmitter = require('events')
// const ev = new EventEmitter()

// let cbfn = (a, b) => { console.log('事件1执行') }
// ev.on('事件1', cbfn)
// ev.emit('事件1')

// ev.off('事件1', cbfn)
// ev.emit('事件1', 1, 2, 3)



// 传参
// const EventEmitter = require('events')
// const ev = new EventEmitter()

// let cbfn = (...args) => { console.log(args) }
// ev.on('事件1', cbfn)
// ev.emit('事件1', 1, 2, 3)


// 
// const EventEmitter = require('events')
// const ev = new EventEmitter()

// ev.on('事件1', function () {
//     console.log(this)
//     // console.log(this._events)
// })
// ev.on('事件1', function () {
//     console.log(2222)
// })
// ev.on('事件2', function () {
//     console.log(2222)
// })
// ev.emit('事件1', 1, 2, 3)


// 发布订阅模式  模拟 EventEmitter

function MyEvent() {
    // 准备一个数据结构用于缓存订阅者信息
    this._events = Object.create(null) // 创建一个空对象，不带有任何原型的
}
MyEvent.prototype.on = function (type, callback) {
    // 判断当前事件是否已经存在，然后再决定如何做缓存
    if (this._events[type]) {
        this._events[type].push(callback)
    } else {
        this._events[type] = [callback]
    }
}
MyEvent.prototype.emit = function (type, ...args) {
    if (this._events && this._events[type].length) {
        this._events[type].forEach(callback => {
            callback.call(this, ...args)
        });
    }
}
MyEvent.prototype.off = function (type, callback) {
    // 判断当前 type 事件监听是否存在，如果存在则取消指定的监听
    if (this._events && this._events[type]) {
        this._events[type] = this._events[type].filter((item) => {
            return item !== callback && item.link !== callback
        })
    }
}
MyEvent.prototype.once = function (type, callback) {
    let foo = function (...args) {
        callback.call(this, ...args)
        this.off(type, foo)
    }
    foo.link = callback
    this.on(type, foo)
}


const ev = new MyEvent()

let fn = function (...data) {
    console.log('事件1执行了', data)
}
// ev.on('事件1', fn)
// ev.on('事件1', () => {
//     console.log('事件1----2')
// })
// ev.emit('事件1', 1, 2, 3)
// ev.emit('事件1', 1, 2)


ev.once('事件1', fn)
ev.off('事件1', fn)
ev.emit('事件1', 1, 2, 3)
// ev.off('事件1', fn)
ev.emit('事件1', 1, 2)
