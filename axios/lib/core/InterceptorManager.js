'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}
/*
  InterceptorManager 的实例属性： handlers
  InterceptorManager 原型方法有： use、eject、forEach

  handlers用来存放拦截器方法 数组内每一项都是有两个属性的对象，两个属性分别对应成功和失败后执行的函数。
  {
    fulfilled: fulfilled,
    rejected: rejected
  }
  use: 向handlers数组里面 添加拦截器函数 返回数组下标
  eject：根据下标 注销指定的拦截器 将该项在数组中置成null
  forEach：遍历handlers，并将handlers里的每一项作为参数传给fn执行
*/

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    // 执行的时候 跳过已经被删除的项
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;
