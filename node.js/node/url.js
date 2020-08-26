// 什么是url:全球统一资源定位符


const url = require('url')
console.log(url)

let myURL = new url.URL('https://example.org/abc?foo=~bar');
console.log(myURL.searchParams('https://example.org/abc?foo=~bar'))
// url的结构

// url模块

// http协议