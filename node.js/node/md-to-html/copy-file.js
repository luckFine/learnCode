const fs = require('fs')

/**
 * 01 打开a文件 利用read 将数据保存到buffer中
 * 02 打开b文件 利用write 将buffer中的数据 写入到b文件中
 */

// let buf = Buffer.alloc(10)
// 打开指定文件
// fs.open('a.txt', 'r', (err, rfd) => {
//     // 从打开的文件中读取数据
//     fs.read(rfd, buf, 0, 10, 0, (err, readBytes) => {
//         // 打开b文件，用于执行数据写入操作
//         fs.open('b.txt', 'w', (err, wfd) => {
//             // 将buffer中的数据写入到 b.txt 当中
//             fs.write(wfd, buf, 0, 10, 0, (err, written) => {
//                 console.log('写入成功')
//             })
//         })
//     })
// })

// 优化 完全拷贝
// fs.open('a.txt', 'r', (err, rfd) => {
//     fs.open('b.txt', 'w', (err, wfd) => {
//         fs.read(rfd, buf, 0, 10, 0, (err, readBytes) => {
//             fs.write(wfd, buf, 0, 10, 0, (err, written) => {
//                 console.log('写入成功')
//             })
//         })
//     })

// })


//  数据的完全拷贝
// fs.open('a.txt', 'r', (err, rfd) => {
//     fs.open('b.txt', 'a+', (err, wfd) => {
//         fs.read(rfd, buf, 0, 10, 0, (err, readBytes) => {
//             fs.write(wfd, buf, 0, 10, 0, (err, written) => {
//                 // 写完继续读
//                 fs.read(rfd, buf, 0, 5, 0, (err, readBytes) => {
//                     fs.write(wfd, buf, 0, 5, 10, (err, written) => {
//                         console.log('写入成功')
//                     })
//                 })
//             })
//         })
//     })
// })


let buf = Buffer.alloc(10)
const BUFFER_SIZE = buf.length
let readOffset = 0
fs.open('a.txt', 'r', (err, rfd) => {
    fs.open('b.txt', 'a+', (err, wfd) => {
        function next() {
            fs.read(rfd, buf, 0, BUFFER_SIZE, readOffset, (err, readBytes) => {
                // 如果条件成立 说明内容已经读取完毕
                if (!readBytes) {
                    fs.close(rfd, () => { })
                    fs.close(wfd, () => { })
                    console.log('拷贝完成')
                    return
                }
                readOffset += readBytes
                fs.write(wfd, buf, 0, 10, 0, (err, written) => {
                    next()
                })
            })
        }
        next();
    })
})