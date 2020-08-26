// 在Node.js中，使用fs模块来实现所有有关文件及目录的创建，写入及删除操作。
// 在fs模块中，多有文件及目录的操作都可以使用同步或异步这两种方法，比如readFile 和readFileSync，
// 有Sync后缀的方法为同步方法，不具有Sync后缀的方法均为异步方法。这两者的区别就是，
// 同步方法立即返回操作结果，在使用同步方法执行的操作结束执行之前，不能执行后续代码，

// const fs = require('fs');

// try {
// 	var data = fs.readFileSync('./index.html','utf-8');
//     console.log('读取成功');
// } catch (err) {
//   // 处理错误
// }

// 使用异步的方法时无法保证顺序。 因此，以下的操作容易出错，因为 读取404.html 操作可能在 读取index.html操作之前完成：
// var fs = require('fs');
// fs.readFile('./index.html', 'utf-8', function(err,data){
// 	if (err) throw err;
//     console.log(data)
//     console.log('读取index.html成功')
// });
// fs.readFile('./404.html', 'utf-8', function(err,data){
// 	if (err) throw err;
//     console.log(data)
//     console.log('读取404.html成功')
// });
// // 要正确地排序这些操作,需要将读取404移动到读取index操作回调中
// var fs = require('fs');
// fs.readFile('./index.html', 'utf-8', function(err,data){
// 	if (err) throw err;
//     console.log(data)
//     console.log('读取index.html成功')
//     // 读取404
// 	fs.readFile('./404.html', 'utf-8', function(err,data){
// 		if (err) throw err;
// 	    console.log(data)
// 	    console.log('读取404.html成功')
// 	});
// });
// 在繁忙的进程中，强烈建议使用这些调用的异步版本。 同步的版本将阻塞整个进程，直到它们完成


// var fs = require('fs');
// console.log(fs)
// { appendFile: [Function: appendFile],  // fs.appendFile(path, data[, options], callback 异步地将数据追加到文件，如果文件尚不存在则创建该文件。 data 可以是字符串或 Buffer
//   appendFileSync: [Function: appendFileSync], // fs.appendFileSync(path, data[, options] 同步地将数据追加到文件，如果文件尚不存在则创建该文件。 data 可以是字符串或 Buffer。
//   access: [Function: access], //fs.access(path[, mode], callback) 测试用户对 path 指定的文件或目录的权限
//   accessSync: [Function: accessSync],// fs.accessSync(path[, mode]) 同步地测试用户对 path 指定的文件或目录的权限
//   chown: [Function: chown],// fs.chown(path, uid, gid, callback) 异步地更改文件的所有者和群组。 除了可能的异常，完成回调没有其他参数。
//   chownSync: [Function: chownSync],// fs.chownSync(path, uid, gid) 同步地更改文件的所有者和群组。 返回 undefined
//   chmod: [Function: chmod],// fs.chmod(path, mode, callback) 异步地更改文件的权限。 除了可能的异常，完成回调没有其他参数。
//   chmodSync: [Function: chmodSync],// fs.chownSync(path, uid, gid) 同步地更改文件的所有者和群组。
//   close: [Function: close], // fs.close(fd, callback)
//   closeSync: [Function: closeSync],
//   copyFile: [Function: copyFile],// fs.copyFile(src, dest[, flags], callback) 异步地将 src 拷贝到 dest。 默认情况下，如果 dest 已经存在，则覆盖它。 除了可能的异常，回调函数没有其他参数。 Node.js 不保证拷贝操作的原子性。 如果在打开目标文件用于写入后发生错误，则 Node.js 将尝试删除目标文件。
//   copyFileSync: [Function: copyFileSync],// fs.copyFileSync(src, dest[, flags]) 同步地将 src 拷贝到 dest
//   createReadStream: [Function: createReadStream],// fs.createReadStream(path[, options])
//   createWriteStream: [Function: createWriteStream],
//   exists: [Function: exists],// fs.exists(path, callback)  废弃: 改为使用 fs.stat() 或 fs.access()。 通过检查文件系统来测试给定的路径是否存在。 然后调用 callback 并带上参数 true 或 false：
//   existsSync: [Function: existsSync],
//   fchown: [Function: fchown],
//   fchownSync: [Function: fchownSync],
//   fchmod: [Function: fchmod],
//   fchmodSync: [Function: fchmodSync],
//   fdatasync: [Function: fdatasync],
//   fdatasyncSync: [Function: fdatasyncSync],
//   fstat: [Function: fstat],
//   fstatSync: [Function: fstatSync],
//   fsync: [Function: fsync],
//   fsyncSync: [Function: fsyncSync],
//   ftruncate: [Function: ftruncate],//fs.ftruncate(fd[, len], callback) 如果文件描述符指向的文件大于 len 个字节，则只有前面 len 个字节会保留在文件中。
//   ftruncateSync: [Function: ftruncateSync],// 同步
//   futimes: [Function: futimes],// fs.futimes(fd, atime, mtime, callback) 更改文件描述符指向的对象的文件系统时间戳
//   futimesSync: [Function: futimesSync],
//   lchown: [Function: lchown],
//   lchownSync: [Function: lchownSync],
//   lchmod: [Function: lchmod],
//   lchmodSync: [Function: lchmodSync],
//   link: [Function: link],
//   linkSync: [Function: linkSync],
//   lstat: [Function: lstat],
//   lstatSync: [Function: lstatSync],
//   mkdir: [Function: mkdir], //fs.mkdir(path[, options], callback) 异步地创建目录。
//   mkdirSync: [Function: mkdirSync],// fs.mkdirSync(path[, options]) 同步地创建目录。 
//   mkdtemp: [Function: mkdtemp],// 创建一个唯一的临时目录。
//   mkdtempSync: [Function: mkdtempSync], // 返回创建的目录路径。
//   open: [Function: open],// fs.open(path[, flags[, mode]], callback) 异步地打开文件。
//   openSync: [Function: openSync], //同步 返回表示文件描述符的整数。
//   readdir: [Function: readdir], //fs.readdir(path[, options], callback) 读取目录的内容。 
//   readdirSync: [Function: readdirSync],
//   read: [Function: read],// fs.read(fd, buffer, offset, length, position, callback) 从 fd 指定的文件中读取数据。
//   readSync: [Function: readSync],
//   readFile: [Function: readFile],// 异步地读取文件的全部内容。
//   readFileSync: [Function: readFileSync],
//   readlink: [Function: readlink],
//   readlinkSync: [Function: readlinkSync],
//   realpath: { [Function: realpath] native: [Function] }, // fs.realpath(path[, options], callback) 通过解析 .、 .. 和符号链接异步地计算规范路径名。
//   realpathSync: { [Function: realpathSync] native: [Function] }, // 返回已解析的路径名。
//   rename: [Function: rename],//异步地将 oldPath 上的文件重命名为 newPath 提供的路径名。 如果 newPath 已存在，则覆盖它。
//   renameSync: [Function: renameSync],
//   rmdir: [Function: rmdir],
//   rmdirSync: [Function: rmdirSync],
//   stat: [Function: stat],
//   statSync: [Function: statSync],
//   symlink: [Function: symlink],
//   symlinkSync: [Function: symlinkSync],
//   truncate: [Function: truncate],
//   truncateSync: [Function: truncateSync],
//   unwatchFile: [Function: unwatchFile],
//   unlink: [Function: unlink],
//   unlinkSync: [Function: unlinkSync],
//   utimes: [Function: utimes],
//   utimesSync: [Function: utimesSync],
//   watch: [Function: watch],//fs.watch(filename[, options][, listener]) 监视 filename 的更改，其中 filename 是文件或目录。
//   watchFile: [Function: watchFile],// 监视 filename 的更改。 每当访问文件时都会调用 listener 回调。
//   writeFile: [Function: writeFile],//fs.writeFile(file, data[, options], callback) 异步地将数据写入到一个文件，如果文件已存在则覆盖该文件。 data 可以是字符串或 buffer。
//   writeFileSync: [Function: writeFileSync],
//   write: [Function: write],// fs.write(fd, string[, position[, encoding]], callback) 将 string 写入到 fd 指定的文件。 如果 string 不是一个字符串，则该值会被强制转换为字符串。
//   writeSync: [Function: writeSync],
//   Dirent: [Function: Dirent],
//   Stats: [Function: Stats],
//   ReadStream:
//    { [Function: ReadStream]
//      super_:
//       { [Function: Readable]
//         ReadableState: [Function: ReadableState],
//         super_: [Function],
//         _fromList: [Function: fromList] } },
//   WriteStream:
//    { [Function: WriteStream]
//      super_:
//       { [Function: Writable] WritableState: [Function: WritableState], super_: [Function] } },
//   FileReadStream:
//    { [Function: ReadStream]
//      super_:
//       { [Function: Readable]
//         ReadableState: [Function: ReadableState],
//         super_: [Function],
//         _fromList: [Function: fromList] } },
//   FileWriteStream:
//    { [Function: WriteStream]
//      super_:
//       { [Function: Writable] WritableState: [Function: WritableState], super_: [Function] } },
//   _toUnixTimestamp: [Function: toUnixTimestamp],
//   F_OK: 0, // 表明文件对调用进程可见。 这对于判断文件是否存在很有用，但对 rwx 权限没有任何说明。 如果未指定模式，则默认值为该值。
//   R_OK: 4, // 表明调用进程可以读取文件。
//   W_OK: 2, // 表明调用进程可以写入文件。
//   X_OK: 1, // 表明调用进程可以执行文件。 在 Windows 上无效（表现得像 fs.constants.F_OK）。
//   constants:
//    [Object: null prototype] {
//      UV_FS_SYMLINK_DIR: 1,
//      UV_FS_SYMLINK_JUNCTION: 2,
//      O_RDONLY: 0,
//      O_WRONLY: 1,
//      O_RDWR: 2,
//      UV_DIRENT_UNKNOWN: 0,
//      UV_DIRENT_FILE: 1,
//      UV_DIRENT_DIR: 2,
//      UV_DIRENT_LINK: 3,
//      UV_DIRENT_FIFO: 4,
//      UV_DIRENT_SOCKET: 5,
//      UV_DIRENT_CHAR: 6,
//      UV_DIRENT_BLOCK: 7,
//      S_IFMT: 61440,
//      S_IFREG: 32768,
//      S_IFDIR: 16384,
//      S_IFCHR: 8192,
//      S_IFBLK: 24576,
//      S_IFIFO: 4096,
//      S_IFLNK: 40960,
//      S_IFSOCK: 49152,
//      O_CREAT: 512,
//      O_EXCL: 2048,
//      O_NOCTTY: 131072,
//      O_TRUNC: 1024,
//      O_APPEND: 8,
//      O_DIRECTORY: 1048576,
//      O_NOFOLLOW: 256,
//      O_SYNC: 128,
//      O_DSYNC: 4194304,
//      O_SYMLINK: 2097152,
//      O_NONBLOCK: 4,
//      S_IRWXU: 448,
//      S_IRUSR: 256,
//      S_IWUSR: 128,
//      S_IXUSR: 64,
//      S_IRWXG: 56,
//      S_IRGRP: 32,
//      S_IWGRP: 16,
//      S_IXGRP: 8,
//      S_IRWXO: 7,
//      S_IROTH: 4,
//      S_IWOTH: 2,
//      S_IXOTH: 1,
//      F_OK: 0,
//      R_OK: 4,
//      W_OK: 2,
//      X_OK: 1,
//      UV_FS_COPYFILE_EXCL: 1,
//      COPYFILE_EXCL: 1,
//      UV_FS_COPYFILE_FICLONE: 2,
//      COPYFILE_FICLONE: 2,
//      UV_FS_COPYFILE_FICLONE_FORCE: 4,
//      COPYFILE_FICLONE_FORCE: 4 } 
//  }







// 异步读取文件
// var fs = require('fs');
// var data = fs.readFile('./index.txt', 'utf-8', function(err,data){
//     // 操作结果作为回调函数的第二个参数返回
//     if (err) {
//         console.log('读取文件发生错误')
//     }else {
//         console.log(data)
//     }
// });

// 同步读取文件

// var fs = require('fs');
// try {
//     var data = fs.readFileSync('./index.txt','utf-8');
//     // 等待操作返回结果，然后利用该结果
//     console.log(data)   
// } catch(e) {
//     console.log(e);
// }

// 异步写入文件
// var fs = require('fs');
// fs.writeFile('./message.txt','我叫饭饭。can you see me now ？',function(err){
//     if(err){
//         console.log('写文件操作失败。')
//     }else {
//         console.log('写文件操作成功。')
//     }
// })

// 写入图片
// var fs = require('fs');
// fs.readFile('./a.jpg', 'base64', function(err,data){
//     fs.writeFile('./b.jpg',data.toString(),'base64',function(err){
//         if(err){
//             console.log('写文件操作失败')
//         }else {
//             console.log('写文件操作成功')
//         }
//     })
// });

// 同步写入文件 fs.writeFileSync(path, data, options); // 参数与上面含义一致

//异步追加文件
// var fs = require('fs');
// fs.appendFile('./message.txt', '这是追加的数据', 'utf-8', function(err){
//     if(err){
//         console.log('追加文件失败')
//     }else {
//         console.log('追加文件成功')
//     }
// });

// 同步追加文件
// var fs = require('fs');
// fs.appendFileSync('./message.txt', '我才是追加的数据');

// 异步打开文件
// var fs = require('fs')
// fs.open('./message.txt','r', function(err,fd){
//    console.log(fd)
// })
// 同步打开文件
// var fs = require('fs')
// var a = fs.openSync('./message.txt','r');
// console.log(a)

// 异步读取文件
// var fs = require('fs')
// fs.open('./message.txt','r', function(err,fd){
//     var buf = Buffer.alloc(1024);
//     // 一个汉字的utf编码为三个字节数据
//     fs.read(fd,buf,0,9,3,function(err,bytesRead,buffer){
//         if (err) {
//             console.log("err")
//         }else {
//             console.log(buffer.slice(0, bytesRead).toString())          
//         }
//     })  
// })
// 同步读取文件
// var fs = require('fs')
// fs.open('./message.txt','r', function(err,fd){
//     var buf = Buffer.alloc(255);
//     // 一个汉字的utf编码为三个字节数据
//     var bytesRead = fs.readSync(fd,buf,0,9,3);
//     console.log(bytesRead);
//     console.log(buf.slice(0, bytesRead).toString());        
// })

// 异步写入文件
// var fs = require('fs')
// var buf = Buffer.from('我叫饭饭');
// fs.open('./message.txt','w', function(err,fd){
//     fs.write(fd,buf,3,9,0,function(err,written,buffer){
//         if(err){
//             console.log('文件写入失败')
//         }else{
//             console.log('写入文件成功')
//         }
//     })  
// })

// 异步关闭文件
// var fs = require('fs')
// var buf = Buffer.from('我叫饭饭');
// fs.open('./message.txt','w', function(err,fd){
//     fs.write(fd,buf,0,12,0,function(err,written,buffer){
//         if(err){
//             console.log('文件写入失败')
//         }else{
//             console.log('写入文件成功')
//         }
//     fs.close(fd,function(err){
//         if(err){
//             console.log('关闭文件失败')
//         }else{
//             console.log('关闭文件成功')
//         }
//     })
//     })  
// })

// var fs = require('fs')
// var buf = Buffer.from('我叫饭饭');
// fs.open('./message.txt','w', function(err,fd){
//     fs.write(fd,buf,0,9,0,function(err,written,buffer){
//         if(err){
//             console.log('文件写入失败')
//         }else{
//             console.log('写入文件成功')
//         }
//     fs.fsync(fd,function(err){
//         if(err){
//             console.log('失败')
//         }else{
//             console.log('成功')
//         }
//     })
//     fs.close(fd,function(err){
//         if(err){
//             console.log('关闭文件失败')
//         }else{
//             console.log('关闭文件成功')
//         }
//     })
//     })  
// })

// 查看文件字节
// var fs = require('fs')
// fs.stat('./message.txt',function(err,data){
//     console.log(data)
// })

// 递归删除非空目录
// var fs = require('fs')
// function deldir(path) {
//     if( fs.existsSync(path) ) {
//         fs.readdirSync(path).forEach(function(file) {
//             var curPath = path + "/" + file;
//             if(fs.statSync(curPath).isDirectory()) { // recurse
//                 deleteFolderRecursive(curPath);
//             } else { // delete file
//                 fs.unlinkSync(curPath);
//             }
//         });
//         fs.rmdirSync(path);
//     }
// };
// var fs = require('fs')
// function deldir(path) {
// 	// 是否存在这样的路径
//     if( fs.existsSync(path) ) {
//     	// 读取并循环这个文件列表
//         fs.readdirSync(path).forEach(function(file) {
//         	// 拼接当前文件路径与文件
//             var curPath = path + "/" + file;
//             // 如果当前是一个文件
//             if(fs.statSync(curPath).isFile()) {
//             	// 删除这个文件
//                 fs.unlinkSync(curPath);
//             } else { 
//             	// 如果是一个目录，递归调用这个方法
//                 deldir(curPath);
//             }
//         });
//         // 最后，删除空目录
//         fs.rmdirSync(path);
//     }
// };
// deldir('TypeScript')

// 前面可以使用fs模块的readFile方法，
// readFileSync方法读取文件中内容，及如何使用fs模块中的writeFile
// 方法，writeFileSync方法向一个文件中写入内容

// readFile，readFileSync方法读取文件内容时，node.js首先
// 将文件内容完整的读入缓存区，再从该缓存区中去读文件内容，
// 在使用writeFile，writeFileSync方法写入文件内容时，node.js将
// 其视为一个整体，
// 将该文件内容完整的读入缓存区，然后一次性将缓存区中内容写入文件中。

// 也就是说，node需要在内存中开辟与文件相等大小的空间，如果
// 文件小，这的确没有问题，但是如果是一个非常大的文件，会出现内存装不下的
// 情况。











