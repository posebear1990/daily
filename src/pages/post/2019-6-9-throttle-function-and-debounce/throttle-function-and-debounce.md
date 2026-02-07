---
title: 节流函数和防抖函数
date: "2019-06-09T09:01:21.899Z"
path: "/throttle-function-and-debounce/"
tags:
  - JavaScript 基础
  - 面试
  - 节流函数
  - 防抖函数
---

节流函数和防抖函数是前端在工作中经常会用到的两个函数，不过相信你和我一样，在工作里都是使用相关类库来实现，比如 lodash 就分别提供了这两个函数，很少会了解这两个函数的具体实现。

但是其实了解这两个函数实现还是很有必要的，因为根据我的经验很多面试会选这两道题来考察面试者的代码功底。

现在，我们分别实现一下吧，首先这两个函数的作用都是用来限制函数的执行频率，其返回值依然是个函数，所以他们其实也是一个高阶函数。

## 节流函数

但是具体到功能又略有不同，节流函数，是通过给函数添加一个冷却时间的方式来实现对触发频率的限制。也就是说，在一段时间内，只要触发了一次那么在这段时间内就不会再次触发。

具体代码如下：

```javascript
function throttle(fn, paddingTime) {
  let isReady = true;

  return () => {
    if (isReady) {
      fn.apply(this, arguments);
      isReady = false;

      setTimeout(() => {
        isReady = true;
      }, paddingTime);
    }
  };
}
```

如上，代码稍微冗长了一点，但是理解起来还是比较容易的。isReady 表示冷却时间的状态，为 true 时函数才能触发。而在函数执行完毕再改变状态，则保证下一次的正常执行。使用箭头函数则避免了可能出现的 this 的绑定错误。

## 防抖函数

防抖函数则略有不同，他的限制方式是延迟一小段时间来检测函数有没有被再次调用，如果这段时间内没有检测到再次的函数调用，才真正的执行函数。相反，如果这段时间内，函数被再次调用，则重复这个检测过程。
具体代码如下：

```javascript
function debounce(fn, delay) {
  const event = null;

  return () => {
    event && clearTimeout(event);

    setTimeout(() => {
      fn.apply(this, ...argument);
      event = null;
    }, delay);
  };
}
```

因为 setTimeout 的特性，我们总用新的定时器来代替上次设置的定时器就是了。
