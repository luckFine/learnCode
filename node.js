// http.js//1. 加载 http 核心模块
var http = require('http')
// 2. 使用 http.createServer() 方法创建一个 Web 服务器
//    返回一个 Server 实例
var server = http.createServer((req, res) => {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    //接收ajax请求手动提交的cookie信息
    res.setHeader("Access-Control-Allow-Credentials", true);
    //跨域允许的请求方式
    res.setHeader("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    res.setHeader("Content-Type", "application/json;charset=utf-8");
})

// var server = http.createServer()
//    注册 request 请求事件
//    当客户端请求过来，就会自动触发服务器的 request 请求事件，然后执行第二个参数：回调处理函数
// request 请求事件处理函数，需要接收两个参数：
//    Request 请求对象
//        请求对象可以用来获取客户端的一些请求信息，例如请求路径
//    Response 响应对象
//        响应对象可以用来给客户端发送响应消息
server.on('request', function (request, response) {
    // http://127.0.0.1:3000/ /
    // http://127.0.0.1:3000/a /a
    // http://127.0.0.1:3000/foo/b /foo/b
    console.log('收到客户端的请求了，请求路径是：' + request.url)
    // response 对象有一个方法：write 可以用来给客户端发送响应数据
    // write 可以使用多次，但是最后一定要使用 end 来结束响应，否则客户端会一直等待
    response.write('hello')
    response.write(' nodejs')
    // 告诉客户端，我的话说完了，你可以呈递给用户了
    response.end('scuuess')
})

server.listen(3000, function () {
    console.log('服务器启动成功了，可以通过 http://127.0.0.1:3000/ 来进行访问')
})