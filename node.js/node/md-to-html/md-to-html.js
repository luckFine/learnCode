const fs = require('fs');
const path = require('path');
const marked = require('marked');
const browserSync = require('browser-sync');
/**
 * 01 读取 md 和 css 内容
 * 02 将上述读取出来的内容替换占位符，生成一个最终需要展示的html字符串
 * 03 将html字符串写入到指定的html文件中
 * 04 监听md 文档内容的变更，更新html内容
 * 05 使用 browser-sync 来实时展示html的内容
 */
// const argv = process.argv[2]
let mdPath = path.join(__dirname, process.argv[2])
let cssPath = path.resolve('github.css')
let htmlPath = mdPath.replace(path.extname(mdPath), '.html')
console.log(mdPath)
console.log(cssPath)
console.log(htmlPath)

fs.readFile(mdPath, 'utf-8', (err, data) => {
    // 将md===>html
    let htmlStr = marked(data)
    fs.readFile(cssPath, 'utf-8', (err, data) => {
        let retHtml = temp.replace('{{content}}', htmlStr).replace('{{style}}', data)
        // 将上述的内容写入到指定的html文件中，用于在浏览器里进行展示
        fs.writeFile(htmlPath, retHtml, (err) => {
            console.log('html 生成成功了')
        })
    })
})

fs.watchFile(mdPath, (curr, prev) => {
    if (curr.mtime !== prev.mtime) {
        fs.readFile(mdPath, 'utf-8', (err, data) => {
            // 将md===>html
            let htmlStr = marked(data)
            fs.readFile(cssPath, 'utf-8', (err, data) => {
                let retHtml = temp.replace('{{content}}', htmlStr).replace('{{style}}', data)
                // 将上述的内容写入到指定的html文件中，用于在浏览器里进行展示
                fs.writeFile(htmlPath, retHtml, (err) => {
                    console.log('html 生成成功了')
                })
            })
        })
    }
})

browserSync.init({
    browser: '',
    server: __dirname,
    watch: true,
    index: path.basename(htmlPath)
})


const temp = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>404</title>
</head>
<body>
	<div> 
        {{content}}
    </div>
</body>
</html>
`
// console.log(temp)