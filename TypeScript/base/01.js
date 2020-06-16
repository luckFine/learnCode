// function greeter(person: string) {
//     return "Hello, " + person;
// }
// let user = "Jane User";`
// document.body.innerHTML = greeter(user);
// interface Point {
//     readonly x: number;
//     readonly y: number;
// }
// let p1: Point = { x: 10, y: 20 };
// p1.x = 5; // error!
// interface Iprinter{
//     Printing(msg:string):string
// }
// class clolrPrinter implements Iprinter {
//     Printing(msg:string):string{
//         return "打印"+msg+"成功！"
//     }
// }
// let p = new clolrPrinter()
// console.log(p.Printing('账单'))
// interface SearchFunc {
//     (source: string, subString: string): boolean;
// }
// let mySearch: SearchFunc;
// mySearch = function(source: string, subString: string) {
//     let result = source.search(subString);
//     return result > -1;
// }
// 接口的继承
// interface Printer{
//     getmsg()
// }
// interface ColorPinter extends Printer{
//     printing()
// }
// class HpPrinter implements ColorPinter{
//     printing(){
//         console.log('打印成功')
//     }
//     getmsg(){
//         console.log('hp')
//     }
// }
// var hp = new HpPrinter()
// hp.getmsg()
// hp.printing()
// 定义一个类
// class Person {
//     name: string;
//     age:number;
//     constructor(name:string,age:number) {
//         this.name = name;
//         this.age = age
//     }
//     print() {
//         return this.name+':'+this.age
//     }
// }
// let p = new Person("luck",18);
// console.log(p.print())
// // 类的继承
// class Stu extends Person{
//     cardnumber:string;
//     school:string;
//     constructor(cardnumber:string,school:string){
//         super('luck',18)
//         this.cardnumber = cardnumber;
//         this.school = school;
//     }
//     homework(){
//         return this.name + '今年' +this.age + '就读于'+this.school +'学号'+this.cardnumber
//     }
// }
// var stu1 = new Stu('001','清华大学')
// console.log(stu1.homework())
// 访问修饰符
// public 、private、protected
// class Person {
//     public name: string;
//     private age:number;
//     protected email:string;
//     constructor(name:string,age:number,email:string) {
//         this.name = name;
//         this.age = age
//         this.email = this.email
//     }
//     print() {
//         return this.name+':'+this.age
//     }
// }
// var p = new Person('luck',18,'101@qq.com')
// console.log(p.name) // 在类的内部和外部都可以访问
// // console.log(p.age) // 在类的内部访问
// // console.log(p.email) // 在类和子类中可以访问
// class stu extends Person{
//     show(){
//         console.log(this.name,this.email)
//     }
// }
// 静态属性和静态方法
// class Person {
//     // 实力属性
//     name: string;
//     static age:number; // 静态属性
//     protected email:string;
//     constructor(name:string,age:number,email:string) {
//         this.name = name;
//         Person.age = age
//         this.email = this.email
//     }
//     // 实例方法
//     print() {
//         return this.name
//     }
//     // 静态方法
//     static show(){
//         console.log('show方法')
//     }
// }
// Person.show()
// var p = new Person('luck',18,'101@qq.com')
// console.log(p.print())
// // 方法和类和实例没有关系，或者不依赖实例
// 多态
// class Animal{
//     eat(){
//         console.log('animal eat')
//     }
// }
// class  Cat extends Animal {
//     eat(){
//         console.log('猫吃鱼')
//     }
// }
// class  Dog extends Animal {
//     eat(){
//         console.log('狗吃肉')
//     }
// }
// var c = new Cat()
// c.eat()
// 同一个父类下面不同子类的实现
// 抽象类和抽象方法
// 抽象类是提供其他继承的基类（父类），不能直接被实例
// 抽象方法只能包含在抽象类中，抽象类中可以包含抽象方法和非抽象方法
// 子类继承抽象类，实现抽象方法
// 定义
// abstract class Animal{
//     abstract eat();
//     run(){
//         console.log('run run run ')
//     }
// }
// class  Cat extends Animal {
//     eat(){
//         console.log('猫吃鱼')
//     }
// }
// class  Dog extends Animal {
//     eat(){
//         console.log('狗吃肉')
//     }
// }
// var c = new Cat()
// c.eat()
// var d = new Dog()
// d.eat()
// 函数定义
// function add(x,y):number{
//     return x+y
// }
// let add1 = function(x,y):number{
//     return x+y
// }
// // 匿名函数
// let add2 = function(x:number,y:number){
//     return x+y
// }
// // 函数的参数
// function add(x:number,y:number):number{
//     return x+y
// }
// // 可选参数，没有返回值 注：可选参数放在参数列表末尾
// function show(name,age?:number):void{
//     console.log(name,age)
// }
// show('lick',18)
// 默认参数
// function show(name,age:number=20):void{
//     console.log(name,age)
// }
// show('lick',30)
// 剩余参数
// function add(x1,x2,...x:number[]):number{
//     var sum = 0
//     for(var i = 0;i<x.length;i++){
//         sum += x[i]
//     }
//     return x1+x2+sum
// }
// console.log(add(1,2,3,4,5,6))
// 函数的重载
// function getinfo(name:string):void;
// function getinfo(age:number):void;
// function getinfo(any:any):void{
//     if(typeof str == 'string'){
//         console.log('名字'+str)
//     }
//     if(typeof str == 'number'){
//         console.log('年龄'+str)
//     }
// };
// 泛型
// 泛型函数
// function printarr<T>(arr:T[]):void{
//     for(var item of arr){
//         console.log(item) 
//     }
// }
// printarr<number>([1,2,3,4])
// printarr<string>(['1','2','3','4'])
// 泛型类
// class myArrlist<T>{
//     public name:T;
//     public list:T[] = []
//     add(val:T):void{
//         this.list.push(val)
//     }
// }
// var arr = new myArrlist<number>()
// arr.add(1)
// arr.add(2)
// console.log(arr.list)
// 泛型接口
// interface Tadd<T>{
//     (x:T,y:T):T
// }
// var add:Tadd<number>
// add=function(x:number,y:number){
//     return x+y
// }
// var com:Tadd<string>
// com=function(x:string,y:string){
//     return x+y
// }
// console.log(add(1,2))
// console.log(com('20','18'))
// todoList
// 定义一个代办类
// class ToDo{
//     content:string;
//     status:boolean;
//     constructor(content:string,status:boolean){
//         this.content = content;
//         this.status = status;
//     }
// }
// // 初始化代办信息
// let todoList:ToDo[]=[
//     new ToDo('起床',true),
//     new ToDo('吃饭',false)
// ]
// // 渲染代办列表
// const todoListDom = document.getElementById('todolist')
// const txtContent:HTMLInputElement = document.querySelector('#txtContent')
// const addBtn = document.getElementById('addBtn')
// function renderList(){
//     let listDom = ''
//     if(todoList.length>0){
//         todoList.forEach((item,index) => {
//             listDom += `<li class="${item.status?'item-ok':''}">${item.content}</li>`
//         })
//     }else{
//         listDom+='<li>暂无事宜</li>'
//     }
//     todoListDom.innerHTML = listDom
// }
// // 添加代办信息
// function addToDo(){
//     const content = txtContent.value.trim().toString()
//     if(!content){
//         alert('请您输入待办事宜')
//         return false
//     }
//     todoList.push(new ToDo(content,false))
//     txtContent.value=''
//     renderList()
// }
// // 事件
// addBtn.addEventListener('click',() => {
//     addToDo()
// })
// window.onload=function(){
//     renderList()
// }
// function printLabel(labelLedObj:{label:string}){
//     console.log(labelLedObj.label)
// }
// let myObj = {
//     size:10,
//     label:'size 10 object'
// }
// printLabel(myObj)
// interface FullName {
//     firstName:string;
//     secondName:string;
// }
// function printNam (name:FullName):void {
//     console.log(name.firstName+'--'+name.secondName)
// }
// var obj = {
//     firstName:'luck',
//     secondName:'fine',
//     age:18
// }
// printNam(obj)
// interface Config{
//     type:string,
//     url:string,
//     data:string,
//     dataType:string
// }
// function ajax(config:Config){
//     var xhr = new XMLHttpRequest();
//     xhr.open(config.type,config.url,true);
//     xhr.send(config.data);
//     xhr.onreadystatechange=function(){
//         if(xhr.readyState == 4 && xhr.status == 200){
//             if(config.dataType == 'json'){
//                 console.log(JSON.parse(xhr.responseText))
//             }else{
//                 console.log(xhr.responseText)
//             }
//         }
//     } 
// }
// ajax({
//     type:'get',
//     data:'name=luck',
//     url:'http://a.itying.com/api/productlist',
//     dataType:'json'
// })
// interface encrypt{
//     (key:string,value:string):string
// }
// var md5:encrypt=function(key:string,value:string):string{
//     return key+':'+value
// }
// md5('name','lucky')
// interface UserArr{
//     [index:number]:string
// }
// var arr:UserArr = ['aaa','bbb']
// console.log(arr[0])
// interface Animal{
//     name:string;
//     eat(str:string):void
// }
// class Dog implements Animal{
//     name:string
//     constructor(name:string){
//         this.name = name
//     }
//     eat(){
//         console.log('吃')
//     }
// }
// var d = new Dog("wangwang")
// d.eat()
// interface Animal{
//     eat():void
// }
// interface Person extends Animal{
//     work():void
// }
// class Per implements Person{
//     name:string
//     constructor(name:string){
//         this.name=name
//    }
//    eat(){
//        console.log('吃')
//    }
//    work(){
//        console.log('codeing')
//    }
// }
// var w = new Per('luck')
// w.work()
// w.eat()
// interface Animal{
//     eat():void
// }
// interface Person extends Animal{
//     work():void
// }
// class Teacher {
//     name:string
//     constructor(name:string){
//         this.name = name
//    }
//    coding(code:string){
//        console.log(this.name+code)
//    }
// }
// class Per extends Teacher implements Person{
//     constructor(name:string){
//         super(name)
//    }
//    eat(){
//        console.log('吃')
//    }
//    work(){
//        console.log('codeing')
//    }
// }
// var w = new Per('luck')
// w.eat()
// w.work()
// w.coding('code')
// class MinClass{
//     list:number[]=[];
//     add(num:number){
//         this.list.push(num)
//     }
//     min(){
//         var minNum = this.list[0];
//         for(var i = 0 ; i < this.list.length;i++){
//             if(minNum>this.list[i]){
//                 minNum=this.list[i]
//             }
//         }
//         return minNum
//     }
// }
// var m = new MinClass()
// m.add(5)
// m.add(9)
// m.add(2)
// console.log(m.min())
// class MinClass<T>{
//     list:T[]=[];
//     add(num:T):void{
//         this.list.push(num)
//     }
//     min():T{
//         var minNum = this.list[0];
//         for(var i = 0 ; i < this.list.length;i++){
//             if(minNum>this.list[i]){
//                 minNum=this.list[i]
//             }
//         }
//         return minNum
//     }
// }
// var m = new MinClass<number>() // 实例化类 并且指定T的代表类型是number
// m.add(5)
// m.add(9)
// m.add(2)
// console.log(m.min())
// var s = new MinClass<string>() // 实例化类 并且指定T的代表类型是number
// s.add('a')
// s.add('w')
// s.add('l')
// console.log(m.min())
// 泛型接口
// interface ConfigFn{
//     <T>(value:T):T;
// }
// var getData:ConfigFn=function<T>(value:T):T{
//     return value
// }
// getData<string>('123')
// interface ConfigFn<T>{
//     (value:T):T;
// }
// function getData<T>(value:T):T{
//     return value
// }
// var myGet:ConfigFn<string>=getData;
// myGet('abc')
// class User{
//     username:string | undefined;
//     password:string | undefined;
// }
// class MysqlDb{
//     add(user:User):boolean{
//         console.log(user)
//         return true
//     }
// }
// var u = new User();
// u.username='luck'
// u.password='123'
// var p = new MysqlDb()
// p.add(u)
// class MysqlDb<T>{
//     add(user:T):boolean{
//         console.log(user)
//         return true
//     }
// }
// class User{
//     username:string | undefined;
//    password:string | undefined;
// }
// var u = new User();
// u.username='luck'
// u.password='123'
// var p = new MysqlDb<User>()
// p.add(u)
var MysqlDb = /** @class */ (function () {
    function MysqlDb() {
    }
    MysqlDb.prototype.add = function (user) {
        console.log(user);
        return true;
    };
    return MysqlDb;
}());
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
var u = new User();
u.username = 'luck';
u.password = '123';
var p = new MysqlDb();
p.add(u);
var Art = /** @class */ (function () {
    function Art(params) {
        this.title = params.title;
        this.desc = params.desc;
        this.status = params.status;
    }
    return Art;
}());
var a = new Art({
    title: '科幻',
    desc: '2222'
});
var db = new MysqlDb();
db.add(a);
