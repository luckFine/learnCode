'use strict';

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */

/*
// 第一种取消方法
axios.get(url, {
  cancelToken:  new axios.CancelToken(cancel => {
                  if (取消条件) {
                    cancel('取消日志');
                  }
                })
});

// 第二种取消方法
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
axios.get(url, {
  cancelToken: source.token
});
source.cancel('取消日志');


axios.CancelToken = CancelToken
new CancelToken()的时候传入了executor执行器函数，在CancelToken函数内部会立即执行executor，并向外传递了
一个cancel函数 ，如果在外部调用了cancel函数，就会new Cancel(), 并且使CancelToken的promise成功
在xhrAdapter内部，判断用户是否配置了CancelToken对象，以及设置CancelToken的promise.then
调用request.about()取消请求  将request对象设置为null
*/

function CancelToken(executor) {
  // executor必须是一个函数
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }
  // 为取消请求准备的一个promise对象，并保存resolve函数
  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    // 把resolve的成功回调函数赋值给resolvePromise
    resolvePromise = resolve;
  });
  // 保存当前的token
  var token = this;
  /* 调用executor的时候，会向外传递一个cancel函数 当cancel() 调用的时候 即可取消
    new axios.CancelToken(cancel => {
                  if (取消条件) {
                    cancel('取消日志');
                  }
                })
  */
  executor(function cancel(message) {
    // 如果token中有reson，表示已经取消
    if (token.reason) {
      return;
    }
    // 将 toekn的reason 指定为一个 cancel 对象  Cancel是一个error
    token.reason = new Cancel(message);
    // 将取消请求的promise指定为成功，值为reason
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
// 适配第二种
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;
