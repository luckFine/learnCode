(function (modules) { // webpackBootstrap
  // install a JSONP callback for chunk loading
  function webpackJsonpCallback(data) {
    var chunkIds = data[0];
    var moreModules = data[1];
    var moduleId, chunkId, i = 0, resolves = [];
    for (; i < chunkIds.length; i++) {
      chunkId = chunkIds[i];
      if (Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
        resolves.push(installedChunks[chunkId][0]);
      }
      installedChunks[chunkId] = 0;
    }
    for (moduleId in moreModules) {
      if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        modules[moduleId] = moreModules[moduleId];
      }
    }
    if (parentJsonpFunction) parentJsonpFunction(data);

    while (resolves.length) {
      resolves.shift()();
    }

  };
  var installedModules = {};
  // 如果是0，表示当前chunk已经加载过
  // 如果是promise，代表正在加载
  // 如果是undefined，代表当前chunk没有被加载
  // 如是null，代表当前预加载
  var installedChunks = {
    "main": 0
  };
  function jsonpScriptSrc(chunkId) {
    // __webpack_require__.p就是publicPath配置的内容  拼接成完整的路径
    return __webpack_require__.p + "" + chunkId + ".built.js"
  }
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };

    // Execute the module function
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // Flag the module as loaded
    module.l = true;

    // Return the exports of the module
    return module.exports;
  }

  // This file contains only the entry chunk.
  // The chunk loading function for additional chunks
  __webpack_require__.e = function requireEnsure(chunkId) {
    var promises = [];
    // JSONP chunk loading for javascript
    var installedChunkData = installedChunks[chunkId];
    if (installedChunkData !== 0) { // 0 means "already installed".

      // a Promise means "currently loading".
      if (installedChunkData) {
        promises.push(installedChunkData[2]);
      } else {
        // setup Promise in chunk cache
        var promise = new Promise(function (resolve, reject) {
          installedChunkData = installedChunks[chunkId] = [resolve, reject];
        });
        promises.push(installedChunkData[2] = promise);

        // start chunk loading
        var script = document.createElement('script');
        var onScriptComplete;

        script.charset = 'utf-8';
        script.timeout = 120;
        if (__webpack_require__.nc) {
          script.setAttribute("nonce", __webpack_require__.nc);
        }
        // 拼接成完整的路径
        script.src = jsonpScriptSrc(chunkId);

        // create error before stack unwound to get useful stacktrace later
        var error = new Error();
        onScriptComplete = function (event) {
          // avoid mem leaks in IE.
          script.onerror = script.onload = null;
          clearTimeout(timeout);
          var chunk = installedChunks[chunkId];
          if (chunk !== 0) {
            if (chunk) {
              var errorType = event && (event.type === 'load' ? 'missing' : event.type);
              var realSrc = event && event.target && event.target.src;
              error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
              error.name = 'ChunkLoadError';
              error.type = errorType;
              error.request = realSrc;
              chunk[1](error);
            }
            installedChunks[chunkId] = undefined;
          }
        };
        var timeout = setTimeout(function () {
          onScriptComplete({ type: 'timeout', target: script });
        }, 120000);
        script.onerror = script.onload = onScriptComplete;
        document.head.appendChild(script);
      }
    }
    return Promise.all(promises);
  };

  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = modules;

  // expose the module cache
  __webpack_require__.c = installedModules;

  // define getter function for harmony exports
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, { enumerable: true, get: getter });
    }
  };

  // define __esModule on exports
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
  };

  // create a fake namespace object
  // mode & 1: value is a module id, require it
  // mode & 2: merge all properties of value into the ns
  // mode & 4: return value when already ns object
  // mode & 8|1: behave like require
  __webpack_require__.t = function (value, mode) {
    /*
      01 接收两个参数，一个是value 一般用于表示被加载的模块id，第二个值mode，是一个二进制的数值
      02 t方法内部做的第一件事情就是调用自定义的require方法 加载的value对应的模块导出，重新赋值给value 
      03 当获取到了这个value值之后余下的 8 4 ns 2 都是对当前的内容进行加工处理，然后返回使用
      04 mode & 8 条件成立时直接将value返回（commonjs 规范）
      05 mode & 4 条件成立时直接将value返回（ esModule功能）
      06 如果上述条件都不成立，还要继续处理value，定义一个ns{}
        6-1 如果拿到的value是一个可以直接使用的内容，例如是一个字符串，将它挂在到ns的default属性上
        6-2 如果拿到的value是一个object，就会遍历这个对象，将这个对象的属性添加到ns身上
    */
    if (mode & 1) value = __webpack_require__(value);
    if (mode & 8) return value; // 1 & 8 条件成立 commonjs 规范时直接返回value
    if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
    var ns = Object.create(null);
    __webpack_require__.r(ns);
    Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
    return ns;
  };

  __webpack_require__.n = function (module) {
    var getter = module && module.__esModule ?
      function getDefault() { return module['default']; } :
      function getModuleExports() { return module; };
    __webpack_require__.d(getter, 'a', getter);
    return getter;
  };

  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
  // __webpack_require__.p就是publicPath配置的内容
  __webpack_require__.p = "";
  __webpack_require__.oe = function (err) { console.error(err); throw err; };

  var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
  var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
  jsonpArray.push = webpackJsonpCallback;
  jsonpArray = jsonpArray.slice();
  for (var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
  var parentJsonpFunction = oldJsonpFunction;
  return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
  ({
    "./src/index.js":
      (function (module, exports, __webpack_require__) {
        let btn = document.getElementById('btn');
        btn.addEventListener('click', function () {
          __webpack_require__.e("login").then(__webpack_require__.t.bind(null, "./src/login.js", 7)).then((login) => {
            console.log(login)
          })
        })
        console.log('index.js 内容执行了');
      })
  });

/**
 *
 * 01 import() 可以实现指定模块的懒加载操作
 * 02 当前懒加载的核心原理就是jsonp
 * 03 t 方法可以针对内容进行不同程度的处理（处理方式取决于传入的数值 8 6 7 3 2 1 ）
 */