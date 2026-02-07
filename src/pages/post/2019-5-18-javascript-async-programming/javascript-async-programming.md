---
title: JavaScript 封装一个异步操作
date: "2019-05-18T10:13:50.818Z"
path: "/javascript-async-programming/"
tags:
  - JavaScript基础
  - 异步操作
  - async
  - await
---

JavaScript 作为 Web 前端技术唯一语言，从诞生之初就面临着很多异步的操作，实践演变中面临了一些问题，好在这些问题渐渐的都被解决掉了。我们以封装一个 request 方法为例一步一步还原一下异步操作的演进过程。

## 事件绑定模式

早期的网页交互少，复杂度低异步操作依赖 DOM0 的 API 对异步操作进行事件绑定就完全够用，发送一个请求的过程大概是这个样子：

```javascript
const request = new XMLHttpRequest();
request.open("GET", "/test-url");
request.onreadystatechange = () => {
  if (request.readyState === 4 && request.status === 200) {
    console.log(request.response);
  }
};
request.send();
```

当 request 的到相应 onreadystatechange 绑定的函数会被触发， 因此只要在触发前为这个方法完成绑定就能保证所绑定的函数在合适的时候触发。

这样的代码容易理解，可是面对复杂的异步操作就显得不太灵活，比如事件触发后有两个独立的操作要做，这两个操作间又有前后顺序，这样他们的顺序也会作为逻辑的一部分写在所绑定的函数里，我们希望可以抽离掉他们前后关系的依赖。而且这样的代码完全没有封装，实现同样的功能每次都要写很多重复代码。

## 回调函数模型

得益于 JavaScript 函数作为第一等公民（first class object）的语言设计，函数本身可以作为参数传递，于是对于上面的代码，我们可以将 onreadystatechange 绑定的函数作为参数，传递进去，从而可以对整个过程进行一点简单的封装，代码如下。

```javascript
function request(url, methond, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open(methond, url);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback && callback(xhr.response);
    }
  };
  xhr.send();
}

request("GET", "/test-url", response => {
  console.log(response);
});
```

这段代码实现的功能和上面一样，但是代码却大大的简化，真正意义上实现了异步操作的封装。不过他有两个缺点一是理解起来更难一些，我们必须知道 callback 函数定义位置，并在调用的时候传递顺序不能出错。以上面的代码为例，假如这里我们并不需要得到结果，然后 request 函数还定义了错误处理的回调，那么我们的代码很可能不得不写成这样：

```javascript
request("GET", "/test-url", null, error => {
  // 在这里进行错误处理
});
```

事实上这也是一种耦合。

另一个缺点是，有时候我们要进行复杂的异步操作，比如在一个异步结束后要进行另外一个异步操作，那么我们的代码会变成这样。

```javascript
request("GET", "/test-url", response => {
  // 这里进行另外一个异步操作
  request("GET", "/test-url", response => {
    // 这里再进行另外一个异步操作
    request("GET", "/test-url", response => {
      // ...
    });
  });
});
```

这种情况被我们称为回调地狱，很明显这样的代码既不美观，每个异步操作相互耦合，代码稍一复杂就不好理解。

## Promise

针对以上的问题，我们需要一套专门的 API 来管理异步的操作，Promise 就是这样一套 API。

对于前面 request 的代码，我们用 Promise 进行封装：

```javascript
function request(url, methond, callback) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(methond, url);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(xhr.status);
      }
    };
    xhr.send();
  });
}
```

需要调用的时候我们这样做：

```javascript
request("GET", "/test-url").then(resp => {
  console.log(resp);
});
```

这个例子里，promise 就是一个占位符，等他拿到结果了，才通过 resolve 函数传给 then 方法的参数。

而 promise 提供的 then 方法就像我们最早版本代码中 onreadystatechange 方法绑定的函数，但同时还可以返回 promise，被同一个链上的其他 then 方法捕捉到。有了这个特性，我们可以很方便的处理多个异步操作耦合的情况。

```javascript
request("GET", "/test-url")
  .then(resp => request(resp))
  .then(resp => request(resp))
  .then(resp => {
    console.log(resp);
  });
```

不过我们其实并不需要做上面提到封装，因为 Fetch API 作为获取请求和相应的 API 已经被所有现代浏览器所支持，而它的返回结果就是一个 promise 对象。

```javascript
fetch("/test-url")
  .then(response => response.json())
  .then(resp => {
    console.log(resp);
  });
```

真实项目里，我们需要做的其实是结合业务，对 fetch 方法进行封装。

最后，所有的回调函数模式的异步调用都可以改写成 Promise 的形式，但是并不是所有的事件模式的异步都可以改写成 Promise 的形式，因为很多事件例如 click 事件会不断触发，但是 Promise 对象只能 resove 一次。

## async await

Promise 解决了以往的异步操作所有痛点， async await 则更进一步，它通过 Generator 与 Promise 为异步操作提供了一个语法糖，从而使代码看上去更像同步代码。

```javascript
async function request(url) {
  const response = await fetch(url);
  const resp = await response.json();

  return resp;
}
```

上面的代码，虽然看上去都是同步执行的，但其实在执行时遇到 await ，要等后面的异步操作结束才会将结果赋值给前面的值。此外还要注意，async 函数的返回是个 Promise 对象，如果直接返回值则会被传给操作 Promise 对象的执行函数。语义上同 resolve(value),然后传给 then 的函数参数。

因为 async 返回永远是个 Promise 对象，调用时也可以通过 await 语法调用，美中不足的是异步操作只能在标识了的异步函数里进行，也就是必须在函数前标识 async。不过处于责权分明的原则，一个函数执行一个任务，这也算不上太大的缺点：

```javascript
async function getData() {
  const resp = await request("/test-url");

  console.log(resp);
}
```

async 相比于 Promise 虽然只是一个语法糖，让异步的操作可以用看上去是同步的方式来书写。乍看上去没什么太大优势，但是在一些比较极端的情况，还是有些优势的，比如我们的 Promise 对象的执行结果还要返回一个 Promise 对象，那么我们得到了一个什么？ Promise 地狱！哈哈哈，这种情况虽然比较极端，但是还是能在一点程度上说明，用同步代码来写异步的操作的优势的。

另外 async await 语法并非替代 Promise 的存在，一些复杂的异步关系还得用到 Promise.all Promise.race 等方法。

### 用 promise 封装一个 sleep

JavaScript 不向其他语言一样，有原生的 sleep 方法，但是通过 promise，我们可以很容易封装一个：

```javascript
function sleep(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
```

这样通过 async await 语法进行调用，看上去就像 sleep 方法一样，当然因为是用 setTimeout 实现，所以 sleep 的时间 time 未必严格等于输入。

```javascript
async function testCase() {
  await sleep(20000);

  console.log("这是两秒后输出的一句话");
}
```

## 总结

本文以封装一个简单的网络请求方法为例，回顾了 JavaScript 的异步处理方式的演进过程。
Promise 作为 ES6 提供的异步操作 API 解决了以往所有的异步操作痛点，并且具有相当的灵活性。于是，各位暴露接口给用户的时候，即使内部实现没有用到 async await ，也一定至少返回一个 Promise 对象给用户呀。
