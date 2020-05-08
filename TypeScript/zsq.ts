// 装饰器是一种特殊类型的声明，它能够被附加到类声明，方法，属性或参数上，可以修改类的行为
// 通俗的装饰器就是一个方法，可以注入到类，方法，属性上来扩展类，属性，方法，参数的功能
// 常见的装饰器有：类装饰器，属性装饰器，方法装饰器，参数装饰器
// 装饰器的写法：普通装饰器（无法传参）装饰器工厂（可传参）
// 装饰器是过去几年中最大的成就之一，已是ES7的标准之一


// 普通装饰器
// function logClass(params: any) {
//     console.log(params)
//     params.prototype.apiUrl = 'XXXX'
//     params.prototype.run = function () {
//         console.log('run')
//     }
// }
// @logClass
// class HttpClient{
//     constructor() {
        
//     }
//     getDate() {
        
//     }
// }
// var http: any = new HttpClient()
// console.log(http.apiUrl)
// http.run()

// 类装饰器 装饰器工厂
// function logClass(params: any) {
//     return function (target:any) {
//         console.log(target)
//         console.log(params)
//         target.prototype.url='hello'
//     }
// }
// @logClass('hello')
// class HttpClient {

//     constructor() {

//     }
//     getDate() {

//     }
// }
// var http: any = new HttpClient()

// 类装饰器在类上面之前被声明（）紧挨着声明，类装饰器应用于类构造函数，可以用来监视，修改活替换类定义，传入一个参数
// 如果类装饰器返回一个值，他会使用提供的构造函数来替换类的声明
// function logClass(target: any) {

//         console.log(target)
//     target.prototype.url = 'hello'
//     return class extends target{
//         api: any = '我是修改后的api'
//         getDate() {
//             console.log(this.api+'-----')
//         }
//     }
// }
// @logClass
// class HttpClient {
//     public api: string | undefined
//     constructor() {
//         console.log(this.api)
//     }
//     getDate() {

//     }
// }
// var http: any = new HttpClient()

// 属性装饰器
// 属性装饰器表达式会在运行时仿作函数被调用，传入下列两个参数：
// 1、对静态成员来说是类的构造函数，对于实例成员是类的原型对象
// 2、成员的名字
// function logClass(params: any) {
//     return function (target:any) {
//         console.log(target)
//         console.log(params)
//         target.prototype.url='hello'
//     }
// }

// // 属性装饰器 装饰器工厂 params就是传入的值
// function logPrototy(params:any) {
//     return function (target:any,attr:any) {
//         console.log(target)
//         console.log(attr)
//         target.attr=params
//     }
// }    
// @logClass('XXXX')
// class HttpClient {

//     @logPrototy('234567')
//     public url:any | undefined
//     constructor() {

//     }
//     getDate() {
//         console.log(this.url)
//     }
// }
// var http: any = new HttpClient()
// http.getDate()


// 方法装饰器
// 他会被应用到方法的属性描述符上，可以用来监视，修改或者替换方法定义
// 方法装饰会在运行时传入下列三个参数：
// 1、对于静态成员来说是类的构造函数，对于实力成员是类的原型对象
// 2、成员的名字
// 3、成员的属性描述符
function logClass(params: any) {
    return function (target:any) {
        console.log(target)
        console.log(params)
        target.prototype.url='hello'
    }
}

// 属性装饰器 装饰器工厂 params就是传入的值
function logPrototy(params:any) {
    return function (target:any,attr:any) {
        console.log(target)
        console.log(attr)
        target.attr=params
    }
}    
@logClass('XXXX')
class HttpClient {

    @logPrototy('234567')
    public url:any | undefined
    constructor() {

    }
    getDate() {
        console.log(this.url)
    }
}
var http: any = new HttpClient()
http.getDate()