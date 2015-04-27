var hd = document.getElementById("a");
var list = document.getElementById("list");
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
console.log($("#list"));

//继续封装自己的小jQuery库

//例如：
function clicklistener(event){
	console.log(event);
}
//将函数和$做一下结合，把他们变成$对象的一些方法
var $$={
    on:function addEvent(element,event,listener){
        //your implement
	    if(element.addEventListener){
		    element.addEventListener(event,listener,false);
	    }else if(element.attachEvent){
		    element.attachEvent('on'+event,listener)
	    }else{
		    element['on'+event] = listener;
	    }	
    },
    //移除element对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数
    un:function removeEvent(element,event,listener){
	    //your implement
	    if(element.removeEventListener){
		    element.removeEventListener(event,listener,false);
	    }else if(element.detachEvent){
		    element.detachEvent('on'+event,listener)
	    }else{
		element['on'+event] = null;
	    }
    },
    //实现click事件的绑定
    click:function addClickEvent(element,listener){
	    //your implement
	    element.onclick = listener;
    },
    //实现对于按Enter键时的事件绑定
    enter:function addEnterEvent(element,listener){
	    //your implement
	    if(element.keyCode == 13){
	    	listener();
	    }
    }  
}
//$$.on($('#list'),"click",clicklistener);
function delegateEvent(element,tag,eventName,listener){
    //your implement
    element.onclick = function(){
        var e = arguments[0]||window.event,
            target = e.srcElement ? e.srcElement : e.target;
            listener(target);
            return false;
    }
}
$$.delegate = delegateEvent;
$$.delegate($('#list'),"li","onclick",clicklistener);

//判断是否为IE浏览器，返回-1或者版本号
function isIE(){
    //your implement
    var result = (!+[1,])?navigator.appVersion : -1;
    console.log(result);
}
isIE();
//设置cookie
function setCookie(cookieName,cookieValue,expiredays){
    //your implement
    var exdate = new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie = cookieName + "=" + escape(cookieValue) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

//获取cookie值
function getCookie(cookieName){
    //your implement
    if(document.cookie.length > 0){
        c_start = document.cookie.indexOf(cookieName + "=")
        if (c_start != -1){
            c_start = c_start + cookieName.length+1;
            c_end = document.cookie.indexOf(";",c_start);
            if(c_end == -1){
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
    return "";
}
console.log(getCookie("candy"));

//学习Ajax,并尝试自己封装一个Ajax方法
function ajax(url,options){
    //your implement
}
//使用示例：
ajax(
    'http://localhost:8080/server/ajaxtest',
    {
        data:{
            name: 'simon',
            password: '123456'
        },
        onsuccess: function(responseText,xhr){
            consloe.log(responseText);
        }
    }
);