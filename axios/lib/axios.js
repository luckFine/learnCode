'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  /* 创建Axios实例
        原型对象上有一些发送请求的方法：
            request()  get() /post() / put() / deleta() / options()等
        自身两个重要的属性：
              default 默认配置 / interceptors 拦截器
  */
  var context = new Axios(defaultConfig);
  // axios和axios.create对应的就是request函数
  // Axios.prototype.request.bind(context)  返回对应的函数
  // 此时instance就是Axios.prototype.request方法
  var instance = bind(Axios.prototype.request, context); // axois
  // 将Axios.prototype上的方法拷贝到instace上，get() /post() / put() / deleta()
  utils.extend(instance, Axios.prototype, context);
  // 将Axios实例对象上的属性拷贝到instance上：default() / interceptors
  utils.extend(instance, context);
  // eslint-disable-next-line no-console
  console.log('createInstance返回的instance', JSON.stringify(instance));
  return instance;
}

// 获取到instace对象 和 默认配置
var axios = createInstance(defaults);
// axios后面添加了很多方法，但是instace上是没有的

// 把Axios挂载到axios上
axios.Axios = Axios;

// 默认导出的axios 已经足够使用
// 导出工厂函数，以便用户可以自己创建实例
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;
