---
title: 常见的上传文件的方法
date: "2019-05-26T09:33:06.093Z"
path: "/common-ways-to-upload-images/"
tags:
  - JavaScript
  - 文件上传
  - Base64
---

最近做了一个简单的图片上传组件，顺路总结一下常见的上传文件的方法。

首先是最原始，也最简单的实现，是直接将 input 组件放在 form 组件里，然后调用 form 组件的 submit 方法。
不过这种方法过于原始，依赖表单提交接口，因此适用范围大大受限。

其次，就是是用 FormData 对象包装图片文件，然后通过 AJAX 方式来上传至服务器。
这种方法的优点是服务器可以直接拿到二进制的文件，缺点是 FormData 这种数据对象，类似于传统的表单，接受的是键值对，做个简单的上传功能足够好用，但是如果接口需要更复杂的结构，那么就无法满足需求。
常见的一些组件库的图片上传功能一般是通过这种方式实现的。具体代码如下, file 是文件对象，可以通过 input 的 onchange 方法回调里，或者直接在 type=file 的 input dom 对象取到。

```javascript
export function toFormData(file) {
  const formData = new FormData();

  formData.append("file", file);

  return formData;
}
```

使用这种方式来上传文件，要求我们将请求头设置成：`Content-Type: multipart/form-data`，在这样一个 json 大行其道的年代，以这样的方式来上传文件，未免有些受限。
最后，自然就是 Base64 了，Base64 将文件编码成字符串，可以方便的插入到 json 格式的 request 的任何一个字段里，因此对请求做更多定制也变成了可能。
以往我看到的例子多是通过 canvas 的 toDataURL 方法将图片转成 Base64。但是现在我们可以使用 FileReader API，更容易的获取到文件的 Base64 的字符串。
不过要注意的是这个接口不是同步接口，于是我们封装的时候用 Promise 包一层，方便使用 Promise 或者 async await 语法调用，具体实现如下：

```javascript
export function toDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      file = reader.result;

      resolve(file);
    };

    reader.onerror = err => {
      reject(err);
    };
  });
}
```

总结，上传文件的方式有好几种，这里我们重点解释了其中的两种，既以 FormData 对象的方式，和以 Base64 编码的方式，大家可以结合具体项目灵活选择。
