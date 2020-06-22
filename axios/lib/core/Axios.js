'use strict';

var utils = require('./../utils');
var buildURL = require('../helpers/buildURL');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var mergeConfig = require('./mergeConfig');

// Axios是axios包的核心，一个Axios实例就是一个axios应用，其他方法都是对Axios内容的扩展
// 而Axios构造函数的核心方法是request方法，各种axios的调用方式最终都是通过request方法发请求的
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  // 将制定的config，保存为default属性
  this.defaults = instanceConfig;
  // 将包含请求/响应拦截器管理器的对保存为interceptors属性
  // 每个interceptors都有两个属性，每个属性都是一个InterceptorManager实例
  // 一个request，存放请求拦截器
  // 一个response，存放响应
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * 用于发请求的函数
 * 我们使用的axios就是此函数bind()返回的函数
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  /*
    判断request接受到的第一个参数，如果第一个参数是字符串,
    那可能的调用方式是axios(url,{option})，即截取第一个参数为url并设置给config.url，剩下的参数为config
    支持2种调用方式   axios(url,{option})  和  axios(config)
  */
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }
  // 合并配置  this.defaults为axios默认的options, config为用户传进来的 将两者合并
  config = mergeConfig(this.defaults, config);

  // 设置ajax的调用方法 ，如果设置了就取设置的
  if (config.method) {
    config.method = config.method.toLowerCase();
  // 否则就取axios默认的请求方法
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  // 如果都没有就设置为get
  } else {
    config.method = 'get';
  }

  /*
    创建用于保存请求/响应拦截函数的数组
    数组的中间放发送请求的函数
    数组的左边放请求拦截器函数（成功/失败）
    数组的右边放响应拦截器函数
  */
  // 创造一个请求序列数组，第一位是发送请求的方法,第二位是空
  // dispatchRequest 为数据处理和 发送ajax函数
  // chain 最后形式 
  /*[
      interceptor.reques[1].resolved, 
      interceptor.reques[1].reject, 
      interceptor.reques[0].resolved,
      interceptor.reques[0].reject,
      dispatchRequest, 
      undefined,
      interceptor.response[1].resolved,
      interceptor.response[1].reject,
      interceptor.response[0].resolved,
      interceptor.response[0].reject,
    ] */ 
  var chain = [dispatchRequest, undefined];
  // 创建了一个成功的promise
  var promise = Promise.resolve(config);
  /*
    后添加的请求拦截器放在数组的前面
  */
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  /*
    后添加的响应拦截器放在数组的后面
  */
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });
  /* 
    通过promise的then()串联起所有请求拦截器 / 请求 / 响应拦截器
    只要chain数组长度不为0，就一直执行while循环
    数组的 shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
    任何一个拦截器的抛出的错误，都会被下一个拦截器的rejected函数收到，所以dispatchRequest抛出的错误才会被响应拦截器接收到。
  */
  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// 用来得到带query参数的url
Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// 返回用来指定我们的onResolve() 和 onReject() 的 promise
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
/*eslint func-names:0*/
  // axios.get(url, { options })
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url
    }));
  };
  // configData为 config 和 {method: method, url: url}) 的合并
  //  Axios.prototype[method] = Axios.prototype.request(configData)
});
// 与上述方法同 分开学是因为配置里多了一个data
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;
