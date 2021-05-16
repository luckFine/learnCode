(function (modules) {
    // 14 定义 webpackJsonpCallback 实现：合并模块定义，改变promise状态执行后续行为
    function webpackJsonpCallback(data) {
        // [['模块定义'], { '依赖关系：被加载的模块内容'}]
        // [['login'], { './src/login.js':(function(module,exports){module.exports='懒加载导出的内容'})]
        // 01 获取需要被加载的模块id
        let chunkIds = data[0]
        // 02 获取需要被动态加载的模块的依赖关系对象
        let moreModules = data[1]
        // 03 循环判断chunkId里对应的模块内容是否已经完成了加载
        let chunkId, resolves = []
        for (let i = 0; i < chunkIds.length; i++) {
            chunkId = chunkIds[i]
            if (Object.prototype.hasOwnProperty.call(inStallChunks, chunkId) && inStallChunks[chunkId]) {
                resolves.push(inStallChunks[chunkId][0])
            }
            // 更新当前的chunk状态
            inStallChunks[chunkId] = 0
        }
        for (moduleId in moreModules) {
            if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
                modules[moduleId] = moreModules[moduleId]
            }
        }
        while (resolves.length) {
            resolves.shift()()
        }
    }

    // 01 定义对象用于将来缓存被加载过的模块
    let installedModules = {}

    // 15 定义inStallChunks 用于标识某个chunkId对应的chunk是否完成了加载
    // 0-已经加载过  undefined-没有加载  promise-正在加载
    let inStallChunks = {
        'main': 0
    }

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
    // 11 定义t方法，用于加载指定的value的模块内容，之后对内容进行处理再返回
    __webpack_require__.t = function (value, mode) {
        // 01 加载value 对应的模块内容（value一般就是模块id）
        if (mode & 1) {
            value = __webpack_require__(value)
        }

        if (mode & 8) { // 加载了可以直接返回使用的内容
            return value
        }

        if ((mode & 4) && typeof value === 'object' && value.__esModule) {
            return value
        }
        // 如果8和4 都没有成立，则需要自定义ns 来通过default属性返回内容
        let ns = Object.create(null);
        __webpack_require__.r(ns)
        Object.defineProperty(ns, 'default', {
            enumerable: true,
            value: value
        })
        if (mode & 2 && typeof value !== 'string') {
            for (const key in value) {
                __webpack_require__.d(ns, key, function (key) {
                    return value[key]
                }.bind(null, key))
            }
        }
        return ns
    }

    // 09 定义p属性，用于保存资源访问路径
    __webpack_require__.p = ''
    // 17 定义jsonpScriptSrc 实现src的处理
    function jsonpScriptSrc(chunkId) {
        return __webpack_require__.p + '' + chunkId + '.built.js'
    }
    // 16 定义e方法，实现jsonp来加载内容，利用promise来实现异步加载操作
    __webpack_require__.e = function (chunkId) {
        // 01 定义数组用于存放promise
        let promises = []
        // 02 获取chunkId 对应的 chunk 是否已经完成了加载
        let installedChunkData = inStallChunks[chunkId]
        // 03 依据当前是否已完成加载的状态来执行后续的逻辑
        if (installedChunkData !== 0) {
            if (installedChunkData) {
                promises.push(installedChunkData[2]);
            } else {
                let promise = new Promise((resolve, reject) => {
                    installedChunkData = inStallChunks[chunkId] = [resolve, reject]
                })
                promises.push(installedChunkData[2] = promise)
                // 创建标签
                let script = document.createElement('script')
                script.src = jsonpScriptSrc(chunkId)
                document.head.appendChild(script)
            }
        }
        // 执行promise
        return Promise.all(promises)
    }

    // 11 定义变量存放数组
    let jsonpArray = window['webpackJsonp'] = window['webpackJsonp'] || []

    // 12 保存原生的push方法
    let oldJsonpFunction = jsonpArray.push.bind(jsonpArray)

    // 13 重写原生的push方法
    jsonpArray.push = webpackJsonpCallback

    // 10 调用__webpack_require__方法执行模块导入与加载操作
    return __webpack_require__(__webpack_require__.s = './src/index.js')
})
    ({

        /***/ "./src/index.js":
        /*!**********************!*\
          !*** ./src/index.js ***!
          \**********************/
        /*! no static exports found */
        /***/ (function (module, exports, __webpack_require__) {


                let btn = document.getElementById('btn');

                btn.addEventListener('click', function () {
                    __webpack_require__.e(/*! import() | login */ "login").then(__webpack_require__.t.bind(null, /*! ./login */ "./src/login.js", 7)).then((login) => {
                        console.log(login)
                    })
                })

                console.log('index.js 内容执行了');

                /***/
            })

        /******/
    })