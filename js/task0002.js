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
		element.className = "";
		return;
	}
	if(elementClassName.match(new RegExp("(^|\\s)"+oldClassName+"(\\s|$)")))
		element.className = elementClassName.replace((new RegExp("(^|\\s)" + oldClassName + "(\\s|$)")), " ");
};
removeClass(hd,"hd")
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
    var result = new Object,
		posX = element.offsetLeft,
        posY = element.offsetTop;
    result.x = posX;
    result.y = posY;
    return result;
}
console.log(getPosition(b));

//实现一个简单的Query
function $(selector){
	var myRe = /[#|.|\[]{1}/g,
		myRe2 = /\w+/g,
        sign = myRe.exec(selector),
		selector = myRe2.exec(selector);
	if(sign == "#"){
		result = document.getElementById(selector);	
	   }
	else if(sign == "."){
	   	result = document.getElementsByClassName(selector);	
	   }
	else if(sign == "["){
		for(var i = 0,l = document.getElementsByTagName('*').length; i < l ; i++){
			result = document.getElementsByTagName('*')[i].getAttribute(selector);
			console.log(selector);
		}
	}
	else {
		result = document.getElementsByTagName(selector);
	}
	return result;
}

//可以通过id获取DOM对象，通过#标示
console.log(document.getElementsByName("div"));
console.log($("[title]"));

//继续封装自己的小jQuery库
function $.on(element,event,listener){
	//your implement
	if(element.addEventListener){
		element.addEventListener(event,listener,false);
	}else if(element.attachEvent){
		element.attachEvent('on'+event,listener)
	}else{
		element['on'+event] = listener;
	}	
}
//例如：
function clicklistener(event){
	console.log(event);
}
//addEvent($("#b"),"click",clicklistener);

//移除element对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数
function $.un(element,event,listener){
	//your implement
	if(element.removeEventListener){
		element.removeEventListener(event,listener,false);
	}else if(element.detachEvent){
		element.detachEvent('on'+event,listener)
	}else{
		element['on'+event] = null;
	}
}

//实现click事件的绑定
function $.click(element,listener){
	//your implement
	element.onclick = listener;
}
	
//实现对于按Enter键时的事件绑定
function $.enter(element,listener){
	//your implement
	if(element.keyCode == 13){
		listener();
	}
}
function renderList(){
	$("#list").innerHTML = '<li>new item</li>';
}
function init(){
	each($("#list").getElementsByTagName('li'),function(item){
		$.click(item,clickListener);
	});
	$.click($("#btn"),renderList);
}
init();
function delegateEvent(element,tag,eventName,listener){
	//your implement
}

$.delegate = delegateEvent;

$.delegate($("#list"),"li","click",clickHandle);