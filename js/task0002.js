var hd = document.getElementById("a");
console.log(b.parentNode);
var newclass = hd.className;
function addClass(element,newClassName) {
    //your implement
    element.className = newClassName;
    
}
//addClass(hd,"newclass");

//移除dom中样式oldClassName
function removeClass(element,oldClassName) {
    //your implement
	if(!element) return;
	var elementClassName = element.className;
	if(elementClassName.length == 0) return;
	if(elementClassName == oldClassName){
		//element.className = ""；
		return;
	}
	if(elementClassName.match(new RegExp("(^|\\s)"+oldClassName+"(\\s|$)")))
		element.className = elementClassName.replace((new RegExp("(^|\\s)" + oldClassName + "(\\s|$)")), " ");
};
removeClass(hd,"bg")
console.log(hd.classList);

//判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element,siblingNode){
    //your implement
    if(element.parentNode == siblingNode.parentNode) return true;
}
console.log(isSiblingNode(hd,b));

//获取dom相对于浏览器的窗口的位置，返回一个对象{x，y}
function getPosition(element) {
    //your implement
    var posX = this.offsetLeft,
        posY = this.offsetTop,
        result = new Object;
    result.x = posX;
    result.y = posY;
    return result;
}
console.log(getPosition(b));