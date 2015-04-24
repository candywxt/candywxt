var hd = document.getElementById("a");
var b = document.getElementById("b");
var newclass = hd.className
function addClass(element,newClassName) {
    //your implement
    element.className = newClassName;
    
}
addClass(hd,"newclass");

//移除dom中样式oldClassName
function removeClass(element,oldClassName) {
    //your implement
    var classLis = element.classList;
    var newlis = [];
    for(var i = 0 , l = classLis.length; i <= l;i++){
        if(classLis[i] != oldClassName){
           newlis.push(classLis[i]);
           console.log(newlis);
        }
    }
    element.classList = '';
    console.log(element.classList);
    element.classList = newlis;
    console.log(element.classList);
}
removeClass(hd,"bg")
console.log(hd.classList);

//判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element,siblingNode){
    //your implement
    var oParent = element.parent;
    console.log(oParent);
}
console.log(isSiblingNode(hd,b));

//获取dom相对于浏览器的窗口的位置，返回一个对象{x，y}
function getPosition(element) {
    //your implement
    var posX = element.clientLeft,
        posY = element.clientTop,
        result = new Object;
    result.x = posX;
    result.y = posY;
    return result;
}
console.log(getPosition(b));
Function.prototype.time = function() {
    var t1 = +new Date()
    ,   foo = this()
    ,   t2 = +new Date();
    return t2-t1;
}
Function.prototype.bind = function(ob){
    var fn = this
    , slice = Array.prototype.slice
    , args = slice.call(arguments,l)
    return function(){
        return fn.apply(ob,args.concat(slice.apply(arguments)))
    }
}
Array.prototype.delRepeat = function(){
    var newArray = new Array();
    var len = this.length;
    for(var i = 0;i<len;i++){
        for(var j=i+1;j<len;j++){
            if(this[i]===this[j]){
                j=++i;
            }
        }
        newArray.push(this[i]);
    }
    return newArray;
}