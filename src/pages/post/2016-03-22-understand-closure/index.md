---
title: 理解闭包
date: "2016-03-22T15:36:43.000Z"
path: "/understand-closure/"
tags:
- tech
- javascript
- 编程基础
- 闭包
---
## 理解闭包

红宝书是这样定义闭包的：是指有权访问 **另一个函数作用域**中的**变量** 的 **函数**。
所以闭包首先是一个函数，特殊的函数。  
特殊在哪里呢？  
能访问另一个函数作用域里的变量。
我们都知道javascript没有块级作用域，所以函数可以看作一个作用域。如果两个函数相互嵌套，里层函数能访问到外层函数的变量，此时里层函数就是一个闭包。例子如下：
```javascript
function out() {
  var s = "warper"

  function in() {
      return s;
  }
  return in();
}
```
里层函数in()可以访问到外层函数out()里的变量，因此里层函数就是一个闭包。

好吧，恭喜你，到此你就明白**什么是闭包**了，但是为什么会这样呢？

为什么闭包能访问到包含函数的变量呢？
![理解闭包1.jpg](understand-closure.jpg "")

如图，当in()函数在被执行的时候会创建一个变量对象，包含了函数的变量，这个对象类似一个指针，指向它的包含函数的变量对象。

## 闭包的副作用

有时，这个特性有时会造成副作用：

```javascript
function createFunctions() {
  var result = new Array();

  for (var i = 0; i < 10; i++) {

    console.log("a" + i );

    result[i] = function() {
      console.log("b" + i);
      return i;
    };
  }
  return result;
}

var res = createFunctions();
```
我们一步一步分析这段程序：  

1. 在这个程序里，外层函数并不能返回一个各个值随索引递增的数组，类似[0,1,2,...,9]；  
这很好理解，结合console.log可以看出来里层函数只是单纯的被返回了，而没有被执行。因此我们得到的只是一个函数数组。  
2. 副作用发生在当我们运行返回的函数时:```res[0]()```，根据之前谈到的闭包的原理，这时包含索引i的值的对象是指向外层函数变量对象的一个指针，而此时即运行返回函数时(里层函数)，i的值已经是10了，因此返回值自然就是10，而不是0。

我们可以用一个立即执行的匿名函数来避免这个副作用：
```javascript
function createFunctions () {
  var result = new Array();

  for (var i = 0; i < 10; i++) {

    console.log("a" + i );

    result[i] = function(num){
      console.log("b" + i);
      return num;
    }(i);
  }
}
  return result;
```
在这段代码里，里层函数被我们修改为立即执行的匿名函数，在for循环内即会执行。这时虽然索引值i仍然指向外层函数的i，但是i的值就是每次循环的索引值了。  
结合console.log我们可以看的更清楚，里层函数每次循环都被立即执行了，因此里层的console.log也立即被打印出来了。

## 避免闭包的副作用
事实上，工作里我们不会写这样的代码，避免闭包的副作用多会在事件绑定时被用到。
假设有ul包含100个li，需要实现点击每个li弹出li对应的索引值你将如何做？  
```html
<ul>
  <li>这是第0个</li>
  <li>这是第1个</li>
  <li>这是第2个</li>
  <li>这是第3个</li>
  <li>这是第4个</li>
</ul>
```
反正我知道你不会一个一个li手动绑定事件。我们可以使用for循环，循环给li节点绑定事件。
```javascript
window.onload = function() {
	var ul = document.getElementsByTagName("ul")[0];

	for(var i = 0; i< ul.children.length; i++){
		if( ul.children[i].nodeName == "LI" ){
			(function(i){	//使用立即执行的匿名函数避免闭包的副作用
				ul.children[i].addEventListener("click", function(event) { //给ul绑定事件
					alert(i);
				});
			})(i);
		}
	}
};
```
[查看可以在线运行的代码：http://runjs.cn/code/xvkf3ikk](http://runjs.cn/code/xvkf3ikk "")  
和之前我们讲过的代码一样，当事件(li被点击)被执行时，外层函数的for循环早已结束，所以索引i已经变成10，因此我们点击后会返回里层函数变量对象指向的值i也就是10。  
而当我们创建了一个立即执行的匿名函数，然后把i的索引传进来，相当于把for循环里i的值进行了拷贝了一份丢到里层函数里，因此当函数执行时取到的值就是我们需要的索引值了。

ps：这里补充一个用事件代理解决以上问题的思路，不具有实用性，大家看看就好：
```javascript
window.onload = function() {
	var ul = document.getElementsByTagName("ul")[0];
	ul.addEventListener("click", function(event) { //给ul绑定事件		
		//如果点到的内容是当前的li元素则取到index
		if (event.target.nodeName == "LI"){
			for(var i = 0; i< ul.children.length; i++){
				if (ul.children[i] == event.target) {
					alert(i);
				}
			}
		}
	});
};
```
[查看可以在线运行的代码：http://runjs.cn/code/wttlx4ir](http://runjs.cn/code/wttlx4ir "")  
使用事件代理，将事件绑定到li的父节点ul上，每次点击后将li的列表遍历一遍确定当前点击的节点在ul里的索引值。  
和闭包相比这种方法，每次运行时都需要遍历一遍li的列表，因此当li节点特别多时存在很大的时间开销，是用空间换时间的一种做法，总体来看没什么实用性。

## 利用闭包创建块级作用域
javascript没有块级作用域，函数就是一个作用域，利用这个特性我们可以在任何需要的时候方便的创建块级作用域：
```javascript
(function(){
    //这里是块级作用域
})()
```
在这里，里层的函数可以取到匿名函数里声明的所有变量，而匿名函数外的所有函数都取不到里层函数里定义的变量，因此实现了块级作用域。  
这样做可以很好的避免变量污染：例如在使用jQuery库时，我们都会在使用时创建一个块级作用域避免直接使用$全局变量污染全局作用域。
```javascript
(function($){
    //在这里使用$，又不用担心无染全局作用域
})(jQuery)
```

## 解决闭包特性导致的对象中匿名函数里this的作用域"bug"
我们知道this对象会随着作用的环境不同而变得不同，在对象里通常会指向对象本身，但在这种情况下是一个例外：
```javascript
var name = "The Window";

var object = {
	name: "The Object",

	getNameFunc: function(){
		return function(){
			return this.name;
		}
	}
}

object.getNameFunc()();
```
这段代码的返回结果是```The Window```，因为最里层函数作为一个闭包包含在object对象的getNameFunc()方法里，这个方法相当于一个匿名函数，匿名函数的作用域具有全局性，因此this对象通常指向window。  
但是这并不符合我们的预期，我们希望在对象里所有的this都指向这个对象，因此匿名函数的作用域具有全局性这个特性在对象里更像一个bug。我们通常创造一个that对象来解决这个bug：
```javascript
var name = "The Window";

var object = {
	name: "The Object",

	getNameFunc: function(){
	    var that = this;
		return function(){
			return that.name;
		}
	}
}

object.getNameFunc()();
```
这次的代码里我们在gitNameFunc()方法里创建了一个变量that将this对象保存起来，然后在里层函数里直接用变量名that调用。
## 利用闭包创建用于访问私有变量的公有方法：
javascript里没有私有成员的概念，对象里所有的属性都是共有的，但是在函数里创建的变量外部是没法直接访问的，根据这个特性可以实现私有成员，在需要访问时创建用于访问私有变量的公有方法：
```javascript
function MyObject() {
    //私有变量，私有函数
    var privateVariable = 10;
    function privateFunction() {
        return false;
    }

    //公有方法
    this. publicMethod = fucntion(){
        privateVariable++;
        return privateFunction();
    }
}
```
利用构造函数模式来实现创建一个对象时同时创建用于访问私有变量的公有方法，此时privateVariable可以被理解为其他语言里的私有成员。  
这种模式存在的缺点是每创建一个对象都会创建一组新方法，解决这个问题的方法是：
```javascript
(function(){
    //私有变量，私有函数
    var privateVariable = 10;
    function privateFunction() {
        return false;
    }
    //构造函数
    MyObject = fucntion(){};

    //公有方法
    MyObject.prototype.publicMethod = fucntion(){
        privateVariable++;
        return privateFunction();
    }
})()
```
这里把MyObject定义为全局变量，方便在匿名函数外依然能访问到它。

以上是为特定类型的对象创建用于访问私有变量的公有方法，为单例(即不依赖特定类型，只有一个实例的对象)创建公有方法只需要省去创建构造函数的步骤：
```javascript
var singleton = function() {
    //私有变量，私有函数
    var privateVariable = 10;
    function privateFunction() {
        return false;
    }

    //公有方法和属性
    return {
        publicProperty: true,
        publicMethod: function() {
            privateVariable++;
            return privateFunction();
        }
    }
}
```
