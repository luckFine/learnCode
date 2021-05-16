(function (modules) { // webpackBootstrap
  // 接收到模块定义
  // The module cache
  var installedModules = {};

  // The require function
  // webpack的自定义函数，核心作用是返回模块的exports
  function __webpack_require__(moduleId) {

    // Check if module is in cache
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;

    }
    // Create a new module (and put it into the cache)
    var module = installedModules[moduleId] = {
      i: moduleId, // 模块ID
      l: false, // 是否加载
      exports: {}  // 被加载模块的导出内容

    };

    // modules[moduleId] 被加载模块的函数
    // 调用被加载的函数
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // Flag the module as loadeds
    module.l = true;

    // Return the exports of the module
    return module.exports;

  }


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
    if (mode & 1) value = __webpack_require__(value);
    if (mode & 8) return value;
    if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
    var ns = Object.create(null);
    __webpack_require__.r(ns);
    Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
    return ns;

  };

  // getDefaultExport function for compatibility with non-harmony modules
  __webpack_require__.n = function (module) {
    var getter = module && module.__esModule ?
      function getDefault() { return module['default']; } :
      function getModuleExports() { return module; };
    __webpack_require__.d(getter, 'a', getter);
    return getter;

  };

  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

  // __webpack_public_path__
  __webpack_require__.p = "";


  // Load entry module and return exports 返回被加载函数return的执行结果
  return __webpack_require__(__webpack_require__.s = "./src/index.js");

})
  /**********************************以下为传参信息**************************************/
  ({

/***/ "./src/index.js":
/***/ (function (module, exports) {

        console.log('index.js内容')

        module.exports = '入口文件导出内容'

        /***/
      })


  });

/*
  01
  打包后的文件整体是一个匿名函数自调用，
  参数为一个对象，这个对象称之为模块定义，是一个键值对
    键名：为入口文件的路径+文件名
    键值：是一个函数，函数的内容是被加载模块的内容
    这个函数在将来的某个时间点上会被调用，同时会接收到一定的参数，利用这些参数就可以实现模块的加载操作










*/
