// stream流
// 应用程序中，流是一组有序的，有起点和终点的字节数据传输方式
// 在应用程序中各种对象之间交换和传输数据的时候，总是将该对象中
// 所包含的数据转换为各种形式的流数据（字节数据），在通过流的传输
// 到达目的对象后再将流数据转换为该对象中可以使用的数据。


// Node.js 中有四种基本的流类型：
// Writable - 可写入数据的流。
// Readable - 可读取数据的流。
// Duplex - 可读又可写的流。
// Transform - 在读写过程中可以修改或转换数据的 Duplex 流。



// 流的读取
// fs.createReadStream(path[, options])#
// path:读取文件的路径
// options:
// 	flag：打开文件后的操作，默认是‘r’,表示打开文件用于读取。如果文件不存在，则出现异常
// 	encoding：可以是 Buffer 接受的任何一种字符编码，默认是mull
// 	mode：用于设置文件模式（权限和粘滞位），但仅限于创建文件的情况
// 	autoClose：true/false,是否自动关闭
// 	start：开始位置
// 	end：结束位置
// 	highWaterMark：每次读取的个数

// fs.createReadStream有以下监听事件：

// close：当ReadStream底层的文件描述被关闭时触发
// open：当ReadStream底层的文件被打开时触发
// data: 当读取到内容触发
// end：整个请求体已被接收时触发
// error:读取失败时触发



// var fs = require('fs')
// // 创建一个可以读取的流
// var stream = fs.createReadStream('../article.txt',{
// 	autoClose:true,
// 	encoding:'utf-8'
// })

// stream.on('open',function(a){
// 	console.log('文件被打开了');
// })
// // 绑定data事件，
// stream.on('data',function(a){
// 	console.log(a.length);
// 	console.log("暂停读取");
// 	stream.pause()

// 	setTimeout(() => {
// 		console.log('过去2s,恢复读取')
// 		stream.resume()
// 	} ,2000)
// })
// // 'end' 事件表明整个请求体已被接收。
// stream.on('end',function(a){
// 	console.log('数据读取完');
// })
// stream.on('error',function(a){
// 	console.log(error);
// })
// stream.on('close',function(a){
// 	console.log('文件已经关闭');
// })


// 流的写入
// fs.createWriteStream(path[, options])
// path:写入文件的路径
// options:
// 	flag：打开文件后的操作，默认是‘w’,表示打开文件用于写入​
// 	encoding：可以是 Buffer 接受的任何一种字符编码，默认是utf8
// 	autoClose：true/false,是否自动关闭
// 	start：开头之后的某个位置写入数据

// fs.createWriteStream 有以下监听事件：
// close：当ReadStream底层的文件描述被关闭时触发
// drain:当可以继续写入数据到流时会触发 'drain' 事件。
// error:当写入数据发生错误时触发。
// finish:调用 stream.end() 且缓冲数据都已传给底层系统之后触发。


// var fs = require('fs')
// var data = '肯德基'
// // 创建一个可以写入的流
// var stream = fs.createWriteStream('./../food.txt');
// // 使用utf-8编码写入数据
// stream.write(data,"UTF8");
// // 标记写入完成
// stream.end()
// stream.on('finish',function(){
// 	console.log("写入完成");
// })
// stream.on('error',function(){
// 	console.log("写入错误");
// })


// 管道
// 管道pipe提供了一个输出流到输入流的机制，通常我们用于从一个流中回去数据并将数据传递到另外一个流中
// 可用来实现大文件复制
// var fs = require('fs')
// var s1 = fs.createReadStream('./../food.txt');
// var s2 = fs.createWriteStream('./../food2.txt');
// // 可用来实现大文件复制
// s1.pipe(s2)

// 链式流
// 链式流是通过连接输出流到另一个流并创建多个对各流操作链的机制，链式流一般用于管道操作

// 接下来我们用管道和链式流压缩和解压文件

var fs = require('fs')
var zlib = require('zlib')
// 压缩foot.txt文件为foot.txt.gz
fs.createReadStream('./../food.txt')
	.pipe(zlib.createGzip())
	.pipe(fs.createWriteStream('./../foot.txt.gz'))
console.log("文件压缩完成");	







