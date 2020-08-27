const http = require('http')

// var server = http.createServer(function(req,res){
//     if(req.url !== '/favicon.ico'){
//         res.writeHead(200,{'Content-Type':'text/plain;charset=UTF-8',
//             'Access-Control-Allow-Origin':'http://localhost'});
//         // 或者使用setHeader
//         // res.setHeader('Content-Type','text/plain;charset=UTF-8');
//         // res.setHeader('Access-Control-Allow-Origin','http://localhost');
//         res.write("你好")
//     }
//     res.end();
// })
// server.listen(3000,"127.0.0.1");



//传入中间件列表
function compose(middlewareList) {
    //返回一个函数 接收ctx
    return function (ctx) {
        //定义一个派发器，内部实现了next机制
        function dispatch(i) {
            //获取当前中间件
            const fn = middlewareList[i]
            try {
                return Promise.resolve(
                    //通过i+1获取下一个中间件
                    fn(ctx, dispatch.bind(null, i + 1))
                )
            } catch (err) {
                return Promise.reject(err)
            }
        }
        //开始派发第一个中间件
        return dispatch(0)
    }
}

class MyKoa {
    constructor() {
        this.middlewareList = []
    }
    use(callback) {
        this.middlewareList.push(callback)
        // 为了实现链式操作
        return this
    }
    listen(...args) {
        const server = http.createServer(this.callback())
        console.log(JSON.stringify(this.callback()))
        return server.listen(...args);
    }
    // 处理中间件的 http 请求
    handleRequest(ctx, middleWare) {
        // 这个 middleWare 就是 compose 函数返回的 fn
        // 执行 middleWare(ctx) 其实就是执行中间件函数，然后再用 Promise.resolve 封装并返回
        return middleWare(ctx)
    }
    createContext(req,res) {
        return {
            req, res
        }
    }
    callback() {
        const fn = compose(this.middlewareList)

        return (req, res) => {
            const ctx = this.createContext(req, res)
            return this.handleRequest(ctx, fn)
        }
    }

}


module.exports = MyKoa