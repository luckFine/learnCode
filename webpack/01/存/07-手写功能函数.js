(function (modules) {
    // 01 定义对象用于将来缓存被加载过的模块
    let installedModules = {}

    // 02 定义一个__webpack_require__方法来替换 import require加载操作
    function __webpack_require__(moduleId) {
        // 2-1 判断当前缓存中是否存在被加载的模块内容，如果存在直接返回
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        // 2-2 如果当前缓存中不存在则需要我们自己定义{} 执行被导入的模块内容加载
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };
        // 2-3 调用当前moduleId 对应的函数，然后完成内容的加载
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        // 2-4 当上述方法调用完成之后，我们就可以修改 l 的值用于表示当前模块的内容已经加载完成了
        module.l = true;
        // 2-5 加载工作完成之后，要将拿回来的内容返回至调用的位置
        return module.exports;
    }
    // 03 定义m属性用于保存modules
    __webpack_require__.m = modules

    // 04 定义c属性用于保存 cache
    __webpack_require__.c = installedModules

    // 05 定义o方法用于判断对象身上是否存在指定属性
    __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty(object, property)
    }

    // 06 定义d方法用于在对象的身上添加指定的属性，同时给该属性提供一个getter
    __webpack_require__.d = function (exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, {
                enumerable: true,
                get: getter
            })
        }
    }

    // 07 定义r方法用于标识当前模块是es6类型
    __webpack_require__.r = function (exports) {
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            Object.defineProperty(exports, Symbol.toStringTag, {
                value: 'Module'
            })
        }
        Object.defineProperty(exports, '__esModule', {
            value: true
        })
    }

    // 08 定义n方法，用于设置具体的getter
    __webpack_require__.n = function (module) {
        let getter = module && module.__esModule ?
            function getDefault() { return module['default'] } :
            function getModuleExports() { return module }
        __webpack_require__.d(getter, 'a', getter)
        return getter
    }
    // 09 定义p属性，用于保存资源访问路径
    __webpack_require__.p = ''

    // 10 调用__webpack_require__方法执行模块导入与加载操作
    return __webpack_require__(__webpack_require__.s = './src/index.js')
})
    ({

        /***/ "./src/index.js":
        /***/ (function (module, __webpack_exports__, __webpack_require__) {

                "use strict";
                __webpack_require__.r(__webpack_exports__);
                var _login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login */ "./src/login.js");

                console.log('index.js内容')
                console.log(_login__WEBPACK_IMPORTED_MODULE_0__["default"], '-----', _login__WEBPACK_IMPORTED_MODULE_0__["age"])
            }),

        /***/ "./src/login.js":
        /*! exports provided: default, age */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {

                "use strict";
                __webpack_require__.r(__webpack_exports__);
                __webpack_require__.d(__webpack_exports__, "age", function () { return age; });
                // 02 采用esModule导出模块
                __webpack_exports__["default"] = ('luck');
                const age = 18
            })
    })