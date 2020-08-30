
// var http = require('http')
// var server = http.createServer()

// server.on('request',function(req,res){
// 	res.writeHead(200, {'Content-Type': 'text/html'})
// 	res.write('<h1>Node.js</h1>');
// 	res.end('<p>Hello World</p>')
// })

// server.on('connection',function(socket){
// 	// 当客户端与服务器端建立链接时，触发http服务器对象 connection事件
// 	// 可以监听该事件并在该事件触发时调用的回调函数中指定当连接建立时所需要
// 	// 执行的处理
// 	console.log('客户端连接已建立')
// 	// 客户端会输出两次"客户端连接已建立",这是因为在浏览器访问http服务器时，
// 	// 浏览器会发出两次客户端请求，一次是用户发出的请求，另一次是浏览器为页面在收藏夹
// 	// 中显示图标（favicon.ico）而自动发出的请求
// })

// server.on('timeOut',function(socket){
// // 在node中，将http服务器的默认超时时间设置为2分钟
// // 当服务器超时时，触发该服务器对象的timeout事件
// 	console.log(socket);
// })


// server.on('error',function(e){
// // 在对HTTP服务器指定需要监听的地址及端口时，如果该地址及端口已被占用
// // 将产生错误，触发服务器的error事件，可以通过对error事件设置回调函数
// // 的方法来指定该错误产生时所需要执行的处理
//     // 回调函数为可选参数
//     console.log(e)
//     console.log('服务器链接失败')
// })

// server.on('close',function(){
// 	console.log('服务器已关闭')
// })

// server.listen(3000,function(){
// 	console.log("服务器正在运行");
// });



// 例子2

// var http = require('http')
// var fs = require('fs');
// var server = http.createServer()

// server.on('request',function(req,res){
//     if(req.url !== '/favicon.ico'){
//         var out = fs.createWriteStream('./request.log');
//         out.write('客户端请求方法'+req.method+'\r\n');
//         out.write('客户端请求url'+req.url+'\r\n');
//         out.write('客户端请求头对象'+JSON.stringify(req.headers)+'\r\n');
//         out.end('客户端请求所用http版本'+req.httpVersion)
//     }
//     res.end();
// })

// server.listen(3000,function(){
// 	console.log("服务器正在运行");
// });




// 例子3
// var http = require('http');
// var fs = require('fs');
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




// var http = require('http');
// // 设置请求信息
// var options = {
//     hostname:'www.baidu.com',
//     post:80,
//     path:'/',
//     method:'GET'
// };
// var req = http.request(options,function(res){
//     console.log('状态码'+res.statusCode);
//     console.log('响应头'+JSON.stringify(res.headers));
//     // res.setEncoding() 用来指定用如何编码该字符串
//     res.setEncoding('utf-8');
//     // 当请求到数据的时候，对数据进行操作
//     res.on('data',function(chunk){
//         console.log('相应内容'+chunk)
//     })
//     // 当请求超时调用req.setTimeout函数
//     req.setTimeout(1000,function(){
//         // req.about()终止本次请求
//         req.about();
//     })
//     // 当请求失败时，查看失败原因
//     req.on('error',function(err){
//         console.log('请求数据发生错误，错误代码'+err.code);
//     })
// })

// req.end();


// 例子4
// var http = require('http');
// // 设置请求信息
// var options = {
//     hostname:'www.baidu.com',
//     post:80,
//     path:'/',
//     method:'GET'
// };
// var req = http.request(options,function(res){
//     // console.log('状态码'+res.statusCode);
//     // console.log('响应头'+JSON.stringify(res.headers));
//     // res.setEncoding() 用来指定用如何编码该字符串
//     res.setEncoding('utf-8');
// })
// // 当请求到数据的时候，对数据进行操作
// req.on('response',function(res){
// 	console.log('请求地址：'+res.url)
// 	console.log('请求方法：'+res.method)
// 	console.log('请求socket：'+res.socket)
// 	console.log('请求是否完成'+res.complete)
// 	console.log('请求状态'+res.statusCode)
// 	console.log(res.statusMessage)
// })
// req.on('socket',function(socket){
// 	console.log('建立连接')
// })
// // 当请求超时调用req.setTimeout函数
// req.setTimeout(10000,function(){
//     req.about();
// })
// // 当请求失败时，查看失败原因
// req.on('error',function(err){
//     console.log('请求数据发生错误，错误代码'+err.code);
// })

// req.end()


// 代理服务器
var http = require('http')
var url = require('url')
var server = http.createServer(function(sreq,sres){
	var creq = http.get('http://www.baidu.com',function(cres){
		console.log(cres.statusCode);
		sres.writeHead(cres.statusCode,cres.headers)
		cres.pipe(sres)
	})

	sreq.pipe(creq)
})

server.listen(3000);







