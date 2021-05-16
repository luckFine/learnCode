(function (modules) { // webpackBootstrap
  // 定义对象用于已加载过的模块
  var installedModules = {};
  // webpack自定义的加载方法，核心功能是返回被加载模块中导出的内容
  function __webpack_require__(moduleId) {

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

    // Execute the module function
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // Flag the module as loaded
    module.l = true;

    // Return the exports of the module
    return module.exports;
  }
  // expose the modules object (__webpack_modules__)
  // 将模块定义保存一份，通过m属性挂在到自己定义的方法上
  __webpack_require__.m = modules;

  // expose the module cache
  __webpack_require__.c = installedModules;

  // define getter function for harmony exports
  // 
  __webpack_require__.d = function (exports, name, getter) {
    // 如果当前exports没有name属性
    if (!__webpack_require__.o(exports, name)) {
      // 在exports身上添加name属性，可枚举，
      Object.defineProperty(exports, name, { enumerable: true, get: getter });
    }
  };
  // define __esModule on exports
  __webpack_require__.r = function (exports) {
    // Symbol为ES6新增 如果不为undefined，那么说明为ES6
    // 条件成立，说明esModule
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      // Object.prototype.toString.call(exports)
      // 在exports上添加Symbol(Symbol.toStringTag)属性，值为Module
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    // 不是esModule，在exports对象上添加__esModule属性，值为true
    Object.defineProperty(exports, '__esModule', { value: true });
  };

  // create a fake namespace object
  // mode & 1: value is a module id, require it
  // mode & 2: merge all properties of value into the ns
  // mode & 4: return value when already ns object
  // mode & 8|1: behave like require
  __webpack_require__.t = function (value, mode) {
    // 调用t后，会拿到被加载模块中的内容value
    // 对于value来说我们可能会直接返回，或者处理后再返回
    if (mode & 1) value = __webpack_require__(value); // 拿到模块的内容
    if (mode & 8) return value;
    if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
    // 定义一个空对象
    var ns = Object.create(null);
    // 调用r函数，将对象标记为esModule
    __webpack_require__.r(ns);
    // 在ns身上添加default属性，可枚举，值为value
    Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
    return ns;
  };
  // getDefaultExport function for compatibility with non-harmony modules
  // 接收一个模块module，
  __webpack_require__.n = function (module) {
    // 判断模块上是否有__esModule，如果有返回其default属性，否则返回module
    var getter = module && module.__esModule ?
      function getDefault() { return module['default']; } :
      function getModuleExports() { return module; };
    __webpack_require__.d(getter, 'a', getter);
    return getter;
  };
  // Object.prototype.hasOwnProperty.call
  // 判断被传入的对象是否有指定的属性
  __webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
  // __webpack_public_path__
  // webpack.config配置的publicPath
  __webpack_require__.p = "";
  // Load entry module and return exports
  return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
  /************************************************************************/
  ({
/***/ "./src/index.js":  // 当这个模块内部依赖了其他模块时，会继续传入__webpack_require__
/***/ (function (module, exports, __webpack_require__) {
        let login = __webpack_require__(/*! ./login */ "./src/login.js")
        console.log('index.js内容')
        console.log(login)
        module.exports = '入口文件导出内容'
        /***/
      }),
/***/ "./src/login.js":
/***/ (function (module, exports) {
        module.exports = 'login.js被执行了'
      })

  });