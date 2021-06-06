// 内置模块值vm： 创建独立的沙箱环境

const fs = require('fs')
const vm = require('vm')

// let age = 10
let content = fs.readFileSync('a.txt', 'utf-8')


// eval : 运行时作用域不独立，相同名字变量会互相污染
// eval(content)

// new Function
// console.log(age)
// let fn = new Function("age", 'return age + 1')


// vm 存在作用域隔离
vm.runInThisContext(content)

console.log(age)