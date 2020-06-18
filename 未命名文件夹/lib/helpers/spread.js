'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *  
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  常用于 Function.prototype.apply 
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */

//  用于参数为数组的 调用函数 语法糖。
// spread(function(x, y, z) {})([1, 2, 3]);
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};
