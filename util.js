// 任务2
// 判断arr是否为一个数组，返回bool值
function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}
// 判断fn是否为一个函数，返回bool值
function isFunction(fn) {
    return Object.prototype.toString.call(fn) === '[object Function]';
}
// 使用递归实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、object对象。
function cloneObject(src) {
    var result,oClass = isClass(src);
    if (oClass === 'Object') {
        result = {};
    }
    else if (oClass === 'Array') {
        result = [];
    }
    else {
        return src;
    }
    for (key in src) {
        var copy = src[key];
        if (isClass(copy) === 'Object') {
            result[key] = arguments.callee(copy);
        }
        else if (isClass(copy) === 'Array') {
            result[key] = arguments.callee(copy);
        }
        else {
            result[key] = src[key];
        }
    }
    return result;
}
function isClass(o) {
    if (o === null) return 'Null';
    if (o === undefined) return 'Undefined';
    return Object.prototype.toString.call(o).slice(8,-1);
}
// 测试用例：
var srcObj = {
    a: 1,
    b: {
        b1: ['hello','hi'],
        b2: 'JavaScript'
    }
}
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);    // 1
console.log(tarObj.b.b1[0]);    // "hello"

// 学习数字，字符串、数字等相关方法，在util.js中实现以下函数
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var n = {};
    var r = [];
    arr.forEach( function (v) {
        if (!n[typeof(v) + v]) {
            n[typeof(v) + v] = true;
            r.push(v);
        }
    })
    return r
}
//使用示例
var a = [1,3,5,7,5,3];
var b = uniqArray(a);
console.log(b); //[1,3,5,7]

// 对字符串头尾行空格字符的去除，包括全角半角空格，Tab等，返回一个字符串
// 先暂时不要简单的用一句增则表达式来实现
function trim(str) {
    if(str == null) return "";
    //去除前面所有空格
    while( str.charAt(0) == '' ){
        str = str.substring(1,str.length);
    }
    //去除后面的空格
    while( str.charAt(str.length-1) == ''){
        str = str.substring(0,str.length-1);
    }
    return str;
}
//使用示例
var str = '        hi!   ';
str = trim(str);
console.log(str);//'hi!'

//实现一个遍历数组的方法，针对数组中每一个元素进行fn函数，并将数组索引和元素作为参数传递
function each(arr,fn){
    //your implement
    var result;
    for(var i = 0,j = 1 ;i<arr.length;i++){
        result = fn(arr[i],i);
    }
    return result;
}
//其中fn函数可以接受两个参数：item和index
//使用示例
var arr = ['java','c','php','html'];
function output(item){
    console.log(item)
}
each(arr,output);//java,c,php,html

//使用示例
var arr = ['java','c','php','html'];
function output(item,index){
    console.log(index+': '+item)
}
each(arr,output);

//获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj){
    var count = 0;
    for( key in obj){
        if(str[Key]){
            count++;
        }
    }
   return count;      
}
//使用示例
var obj = {
    a: 1,
    b: 2,
    c:{
       c1:3,
       c2:4
      }
};
console.log(getObjectLength(obj));//3

//学会正则表达式，在util.js完成以下代码
//判断是否为邮箱地址
function isEmail(emailStr){
    //your implement
    var myRe = /[\w+\-]+@[\w+\.]+[a-z]{2,3}/g;
    var result = myRe.test(emailStr);
    return result ? "good!":"请输入正确的邮箱！";
}
var email = "123@qq.com";
console.log(isEmail(email));
//判断是否为手机号
function isMobilePhone(phone){
    //your implement
    var myRe = /1[3,5,8]{1}\d{9}/g;
    var result = myRe.test(phone);
    return result ? "good!":"请输入正确的手机号！";
}
var email = "123@qq.com";
console.log(isMobilePhone(email));
//----------------------------------------------------
//任务三
//为dom增加一个样式名为newClassName的新样式
function addClass(element,newClassName) {
    //your implement
    element.style.name = newClassName;
}
var hd = document.getElementById("a");
document.title = hd;

//移除dom中样式oldClassName
function removeClass(element,oldClassName) {
    //your implement
    
}

//判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element,siblingNode){
    //your implement
}

//获取dom相对于浏览器的窗口的位置，返回一个对象{x，y}
function getPosition(element) {
    //your implement
}
//your implement


