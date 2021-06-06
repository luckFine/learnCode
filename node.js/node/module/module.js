// 模块加载模拟实现
// 路径分析--缓存优化--文件定位--编译执行

const fs = require('fs')
const path = require('path')
const vm = require('vm')

function Module(id) {
    this.id = id
    this.exports = {}
}
Module._resolveFilename = function (filename) {
    // 利用path 将filanem转为绝对路径
    let absPath = path.resolve(__dirname, filename)
    // 判断当前路径对应的内容是否存在()
    if (fs.existsSync(absPath)) {
        // 如果条件成立说明absPath对应的内容是存在的
        console.log(absPath)
        return absPath
    } else {
        // 文件定位
        let suffix = Object.keys(Module._extensions)
        for (let i = 0; i < suffix.length; i++) {
            let newPath = absPath + suffix[i]
            if (fs.existsSync(newPath)) {
                return newPath
            }
        }
    }
    throw new Error(`${filename} is not exists`)
}
Module._extensions = {
    '.js'(module) {// 针对js文件的编译和执行
        // 读取
        // console.logs(module)
        let content = fs.readFileSync(module.id, 'utf-8')
        // 包装
        content = Module.wrapper[0] + content + Module.wrapper[1]
        // vm
        let compileFn = vm.runInThisContext(content)
        // 准备参数值
        let exports = module.exports
        let dirname = path.dirname(module.id)
        let filname = module.id
        // 调用
        compileFn.call(exports, exports, myRequire, module, filname, dirname)
    },
    '.json'(module) {
        let content = JSON.parse(fs.readFileSync(module.id, 'utf-8'))
        module.exports = content
    }
}
Module._cache = {}
Module.prototype.load = function () {
    let extneame = path.extname(this.id)
    Module._extensions[extneame](this);
}
Module.wrapper = [
    "(function(exports, require, module, __filename, __dirname){",
    "})"
]


function myRequire(filename) {
    // 1 绝对路径
    let mPath = Module._resolveFilename(filename);
    // 2 缓存优先
    let cacheModule = Module._cache[mPath]
    if (cacheModule) return cacheModule.exports

    // 3 创建空对象加载膜表木块
    let module = new Module(mPath)

    console.log('11111')

    // 4 缓存已经加载过的模块
    Module._cache[mPath] = module

    // 5 执行加载（编译执行）
    module.load()

    // 6 返回数据
    return module.exports
}

let obj = myRequire('./v')
let obj2 = myRequire('./v')
let obj3 = myRequire('./v')
console.log(obj)


