(function (modules) { // webpackBootstrap
  // The module cache
  var installedModules = {};
  /******/
  // The require function
  function __webpack_require__(moduleId) {
    /******/
    // Check if module is in cache
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };
    /******/
    // Execute the module function
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    // Flag the module as loaded
    module.l = true;
    /******/
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
    // 当前是es6环境，为exports添加Symbol.toStringTag属性，值为Module
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    // 再为exports对象添加__esModule属性，值为true，表示当前是es6环境
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
  return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
  ({
/***/ "./src/index.js":
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {
        let obj = __webpack_require__(/*! ./login */ "./src/login.js")
        console.log('index.js内容')
        console.log(obj.default, '----->', obj.age)
      }),
/***/ "./src/login.js":
/*! exports provided: default, age */
/***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        // 如果是esmodule，都需要调用r函数，即给模块加标记
        __webpack_require__.r(__webpack_exports__);
        // 在exports对象身上添加age属性
        __webpack_require__.d(__webpack_exports__, "age", function () { return age; });
        // 02 采用esm导出内容
        // 在exports对象身上添加default属性，值为luck
        __webpack_exports__["default"] = ('luck');
        // 在exports对象身上添加age属性，将age赋值为18
        const age = 18
      })
  });
/*
总结
1、如果采用require（commonjs）规范加载和导出模块，webpack是天生支持的，打包后的代码量也是最小的
2、如果采用esModule规范加载和导出模块，会进行额外的包裹
  如果是module.default导出，即在module身上添加default属性即可
  如果是module const age = 18 这种，会先调用r方法，给模块添加标记为esModule，再调用d方法
    给对象身上添加age属性，同时给age属性添加getter，getter属性return age



*/
