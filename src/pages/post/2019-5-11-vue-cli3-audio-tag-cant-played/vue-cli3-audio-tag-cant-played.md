---
title: vue-cli 3 中 audio 元素不能播放的解决办法
date: "2019-05-11T06:31:13.698Z"
path: "/vue-cli/"
tags:
- vue
- vue-cli
- audio
---

_注意：文章针对的内容仅针对 vue-cli 3 ，不适用更老的版本。_

在用 vue 做页面的时候遇到了音频不能播放的情况，总结一下是因为资源没有引用到。

具体是这样的，正常情况下我们在页面上创建的一个 audio 元素：

```html
<audio id="clock" src="./assets/clock.ogg" />
```

然后用 js 播放:

```js
const clock = document.getElementById("clock");
clock.play();
```

然而打开控制台发现报错： `The element has no supported sources.`

说明是文件错误，经过排查，发现文件没有被正确加载进来。

如何正确引入呢：两种方法。

## 1. 通过 public 目录直接引入

vue-cli 项目，如果通过相对路径引用资源则会经过 webpack 打包，相反，如果通过绝对路径引用则不会经过 webpack 处理。

先把文件放到根目录的 public 目录下，然后修改模板

```html
<audio id="clock" src="/clock.ogg" />
```

注意这里资源的绝对路径不是 `/public/clock` 而是直接填 public 里的路径，官方文档没有例子说这件事，浪费了很多时间。

## 2. 经过 webpack 打包（推荐）

官方推荐使用 webpack 打包静态资源，按照官方的说法，这样做有 3 点好处：

* 脚本和样式表会被压缩且打包在一起，从而避免额外的网络请求。
* 文件丢失会直接在编译时报错，而不是到了用户端才产生 404 错误。
* 最终生成的文件名包含了内容哈希，因此你不必担心浏览器会缓存它们的老版本。

具体若要经过 webpack ，那么需要使用相对路径:

```html
<audio id="clock" src="../assets/clock.ogg" />
```

刷新页面，然而还是不行。打印看配置，file-loader 和 url-loader 也没问题。

因为 vue-cli 3 里 transformToRequire 配置项默认值是：

```js
{
  video: ['src', 'poster'],
  source: 'src',
  img: 'src',
  image: ['xlink:href', 'href'],
  use: ['xlink:href', 'href']
}
```

所以 audio 元素的 src 属性并不会被交给 webpack 作为模块处理。

这种情况下，路由会对引用资源路径做过滤，所以很可能引用到的 audio 文件是一个 html 页面，或者 404 页面，所以会报开头的错误。

于是解决方法是通过 vue.config.js 文件修改 vue-loader 的配置

```js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options =>
        Object.assign(options, {
          transformAssetUrls: {
            audio: "src"
          }
        })
      );
  }
};
```
