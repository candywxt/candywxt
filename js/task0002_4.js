var getElementsByClassName = function (searchClass, node, tag) {/* 兼容各浏览器的选择class的方法；(写法参考了博客园：http://www.cnblogs.com/rubylouvre/archive/2009/07/24/1529640.html，想了解更多请看这个地址) */
    node = node || document, tag = tag ? tag.toUpperCase() : "*";
    if(document.getElementsByClassName){/* 支持getElementsByClassName的浏览器 */
        var temp = node.getElementsByClassName(searchClass);
        if(tag=="*"){
            return temp;
        } else {
            var ret = new Array();
            for(var i=0; i<temp.length; i++)
                if(temp[i].nodeName==tag)
                    ret.push(temp[i]);
            return ret;
        }
    }else{/* 不支持getElementsByClassName的浏览器 */
        var classes = searchClass.split(" "),
            elements = (tag === "*" && node.all)? node.all : node.getElementsByTagName(tag),
            patterns = [], returnElements = [], current, match;
        var i = classes.length;
        while(--i >= 0)
            patterns.push(new RegExp("(^|\\s)" + classes[i] + "(\\s|$)"));
        var j = elements.length;
        while(--j >= 0){
            current = elements[j], match = false;
            for(var k=0, kl=patterns.length; k<kl; k++){
                match = patterns[k].test(current.className);
                if(!match) break;
            }
            if(match) returnElements.push(current);
        }
        return returnElements;
    }
};
var addEvent=(function(){/* 用此函数添加事件防止事件覆盖 */
    if(document.addEventListener){
        return function(type, fn){ this.addEventListener(type, fn, false); };
    }else if(document.attachEvent){
        return function(type,fn){
            this.attachEvent('on'+type, function () {
                return fn.call(this, window.event);/* 兼容IE */
            });
        };
    }
})();
;(function(window){
/* 插件开始 */
var autoComplete=function(o){
    var handler=(function(){
        var handler=function(e,o){ return new handler.prototype.init(e,o); };/* 为每个选择的dom都创建一个相对应的对象，这样选择多个dom时可以很方便地使用 */
        handler.prototype={
            e:null, o:null, timer:null, show:0, input:null, popup:null,
            init:function(e,o){/* 设置初始对象 */
                this.e=e, this.o=o,
                this.input=this.e.getElementsByTagName(this.o.input)[0],
                this.popup=this.e.getElementsByTagName(this.o.popup)[0],
                this.initEvent();/* 初始化各种事件 */
            },
            match:function(quickExpr,value,source){/* 生成提示 */
                var li = null;
                for(var i in source){
                    if( value.length>0 && quickExpr.exec(source[i])!=null ){
                        li = document.createElement('li');
                        li.innerHTML = '<a href="javascript:;">'+source[i]+'</a>';
                        this.popup.appendChild(li);
                    }
                }
                if(this.popup.getElementsByTagName('a').length)
                    this.popup.style.display='block';
                else
                    this.popup.style.display='none';
            },
            ajax:function(type,url,quickExpr,search){/* ajax请求远程数据 */
                var xhr = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
                xhr.open(type,url,true);/* 同异步在此修改 */
                xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                var that=this;
                xhr.onreadystatechange = function(){
                    if(xhr.readyState==4) {
                        if(xhr.status==200) {
                            var data = eval(xhr.responseText);
                            that.match(quickExpr,search,data);/* 相同于成功的回调函数 */
                        }else{
                            alert("请求页面异常!");/* 请求失败 */
                        }
                    }
                };
                xhr.send(null);
            },
            fetch:function(ajax,search,quickExpr){
                var that=this;
                this.ajax(ajax.type,ajax.url+search,quickExpr,search);
            },
            initEvent:function(){/* 各事件的集合 */
                var that=this;
                this.input.onfocus = function(){
                    if(this.inputValue) this.value = this.inputValue;
                    var value=this.value, quickExpr=RegExp('^'+value,'i'), self=this;
                    var els = that.popup.getElementsByTagName('a');
                    if(els.length>0) that.popup.style.display = 'block';
                    that.timer=setInterval(function(){
                        if(value!=self.value){/* 判断输入内容是否改变，兼容中文 */
                            value=self.value;
                            that.popup.innerHTML='';
                            if(value!=''){
                                quickExpr=RegExp('^'+value);
                                if(that.o.source) that.match(quickExpr,value,that.o.source);
                                else if(that.o.ajax) that.fetch(that.o.ajax,value,quickExpr);
                            }
                        }
                    },200);
                };
                this.input.onblur = function(){/*  输入框添加事件 */
                    if(this.value!=this.defaultValue) this.inputValue = this.value;
                    clearInterval(that.timer);
                    var current=-1;/* 记住当前有焦点的选项 */
                    var els = that.popup.getElementsByTagName('a');
                    var len = els.length-1;
                    var aClick = function(){
                        that.input.inputValue = this.firstChild.nodeValue;
                        that.popup.innerHTML='';
                        that.popup.style.display='none';
                        that.input.focus();
                    };
                    var aFocus = function(){
                        for(var i=len; i>=0; i--){
                            if(this.parentNode===that.popup.children[i]){
                                current = i;
                                break;
                            }
                        }
                        //that.input.value = this.firstChild.nodeValue;
                        for(var k in that.o.elemCSS.focus){
                            this.style[k] = that.o.elemCSS.focus[k];
                        }
                    };
                    var aBlur= function(){
                        for(var k in that.o.elemCSS.blur)
                            this.style[k] = that.o.elemCSS.blur[k];
                    };
                    var aKeydown = function(event){
                        event = event || window.event;/* 兼容IE */
                        if(current === len && event.keyCode===9){/* tab键时popup隐藏 */
                            that.popup.style.display = 'none';
                        }else if(event.keyCode==40){/* 处理上下方向键事件方便选择提示的选项 */
                            current++;
                            if(current<-1) current=len;
                            if(current>len){
                                current=-1;
                                that.input.focus();
                            }else{
                                that.popup.getElementsByTagName('a')[current].focus();
                            }
                        }else if(event.keyCode==38){
                            current--;
                            if(current==-1){
                                that.input.focus();
                            }else if(current<-1){
                                current = len;
                                that.popup.getElementsByTagName('a')[current].focus();
                            }else{
                                that.popup.getElementsByTagName('a')[current].focus();
                            }
                        }
                    };
                    for(var i=0; i<els.length; i++){/* 为每个选项添加事件 */
                        els[i].onclick = aClick;
                        els[i].onfocus = aFocus;
                        els[i].onblur = aBlur;
                        els[i].onkeydown = aKeydown;
                    }
                };
                this.input.onkeydown = function(event){
                    event = event || window.event;/* 兼容IE */
                    var els = that.popup.getElementsByTagName('a');
                    if(event.keyCode==40){
                        if(els[0]) els[0].focus();
                    }else if(event.keyCode==38){
                        console.log(event.keyCode);
                        if(els[els.length-1]) els[els.length-1].focus();
                    }else if(event.keyCode==9){
                        if(event.shiftKey==true) that.popup.style.display = 'none';
                    }
                };
                this.e.onmouseover = function(){ that.show=1; };
                this.e.onmouseout = function(){ that.show=0; };
                addEvent.call(document,'click',function(){
                    if(that.show==0){
                        that.popup.style.display='none';
                    }
                });/* 处理提示框dom元素不支持onblur的情况 */
            }
        };
        handler.prototype.init.prototype=handler.prototype;/* JQuery style，这样我们在处的时候就不用每个dom元素都用new来创建对象了 */
        return handler;/* 把内部的处理函数传到外部 */
    })();
    if(this.length){/* 处理选择多个dom元素 */
        for(var a=this.length-1; a>=0; a--){/* 调用方法为每个选择的dom生成一个处理对象，使它们不互相影响 */
            handler(this[a],o);
        }
    }else{/* 处理选择一个dom元素 */
        handler(this,o);
    }
    return this;
};
return window.autoComplete = autoComplete;/* 暴露方法给全局对象 */
/* 插件结束 */
})(window);
/* 调用 */
addEvent.call(null,'load',function(){
    autoComplete.call( getElementsByClassName('autoComplete'), {/* 使用call或apply调用此方法 */
            source:["Simon", 'Erik', 'Kener'],/* 提示时在此数组中搜索 */
            //ajax:{ type:'post',url:'./php/fetch.php?search=' },/* 如果使用ajax则远程返回的数据格式要与source相同 */
            elemCSS:{ focus:{'color':'black','background':'#ccc'}, blur:{'color':'black','background':'transparent'} },/* 些对象中的key要js对象中的style属性支持 */
            input:'input',/* 输入框使用input元素 */
            popup:'ul'/* 提示框使用ul元素 */
    });
});