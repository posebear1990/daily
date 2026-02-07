---
title: 刚接触前端开发，如何选择编辑器以及几个Atom常用插件推荐
date: "2017-12-31T20:00:00.000Z"
path: "/how-to-choose-a-editor/"
tags:
- 前端工具
- 编辑器
- Atom
---

程序员圈子内的编辑器之争，已经是由来已久，把它作为一种文化现象来看，还蛮有意思的。程序员很多见面尬聊也很有可能会聊到彼此用什么语言，然后分别用什么编辑器。简单来说，这个话题是个打开话匣子的好工具，而且很有可能能从对方使用的编辑器上边分析出来对方的性格，阶级，思想倾向什么的……
但是，作为一个初学编程的程序员，应该趁早远离无畏的编辑器之争。争论谁是最好的编辑器毫无意义，毕竟编辑器只是一个工具，用它写出来真正有用的代码比用有用的编辑器写出来垃圾代码要好的多。

## 2017 年谁才是最好的编辑器：

对于刚学编程的人来说，首先要开箱即用，而且默认配置就足够的好用，同时又能提供足够的扩展性。单就这点来说，其实最古老的两款编辑器，Vim 和 Emacs 都不怎么适合初学者。就这点而言，如果你是做web开发的话，其实我是极度推荐 JetBrains 的 WebStrom 和他家的其他IDE的。缺点是有点小贵，目前官方售价是59美刀，包含一年的升级，以及终身的使用权利，而且如果你是学生，可以通过校园邮箱来申请使用。

其次，要有丰富的社区支持。丰富的社区支持意味着出了问题，并不需要亲自动手来解决，你踩过的坑可能已经有一百个人踩过了，解决起来很方便。同时，这也意味着丰富的插件。这方面的来讲，Vscode 做的是最好的，不光提供了丰富的社区支持，而且还有全职开发人员来进行软件的开发。Atom 虽然比  Vscode 早出现，但是性能始终成为瓶颈，目前各方面均已经被 Vscode 赶超。

然后，速度要快。为什么我们要使用文本编辑器，而不是直接使用 IDE 呢？其中一个原因就是因为快，IDE 相比文本编辑器而言太重了，而且对于普通的代码编辑而言，很可能有百分之九十的功能都是我们平时用不到的。单从速度来讲，Sublime 因为是界面是系统原生实现的方式，而不是像 Atom 和 Vscode 用 Electron 这样的web的跨平台技术实现，所以性能肯定是三款编辑器里最好的。但是，Vscode 做得优化足够多，和 Sublime 的性能差距已经不是那么大了。

最后，跨平台特性。可以说主流一点的编辑器都已经至少支持了三大平台(Windows, Linux, Mac)了，所以这一点不用太多考虑。



以上我们说了那么多，其实我最推荐的还是 WebStrom 虽然它严格意义上来讲不算是编辑器，而且需要付费使用，但是比起折腾编辑器所花费的世时间来看，其实还是很值的。其次推荐 Vscode ，一方面是插件数量多，另一方面就是因为他是微软提供支持全职团队来开发的一款编辑器，普通的开源项目很难有这个待遇。最后就是 Atom ，虽然目前来看 Atom 各方面都被 Vscode 赶超了，但是它极度的可定制性是 Vscode 比不上的，Vscode 为了保证性能，并不会开放所有界面相关的 API 给开发者调用，可以说和 Vscode 相比， Atom 更接近于现代版的 Emacs，提供了无限的可能性，随便开发者怎么折腾。至于 Sublime ，我们感谢它带来了编辑器体验超级好的这个时代，但是毕竟他是收费软件，所以除了情怀，没什么选择它的理由。

然后说说 Vim / Emacs ，这两款上古时期的编辑器，虽然他们都高度可定制化，但是由于特殊的操作方式，导致学习门槛过于陡峭，不太推荐初学者学习。但是你如果想了解 Linux 文化，或者提高逼格（误），其实也是可以去尝试一下。特别是 Emacs 提供的 Org-mode，类似于 Markdown 的文本语法使得他可以用到任务管理，记账，记日志等方面，被人们称为文字编程。所以也特别值得去尝试一下。



## 几款Atom常用的插件

这几款插件非常常用，几乎是作为前端开发必装的一些插件。虽然这里做推荐是基于 Atom 编辑器的，但是其他编辑器应该也是很容易找到相同，或者同类型的插件。

#### [sublime-style-column-selection](https://atom.io/packages/sublime-style-column-selection)

一个提供竖排方向选取的插件，从sublime移植过来，配合多点编辑很好用。

#### [highlight-selected](https://atom.io/packages/highlight-selected)

高亮当前显示行。

#### [zentabs](https://atom.io/packages/zentabs)

Tab 栏数量管理工具，保持 Tab 栏的清洁。

#### [sync-settings](https://atom.io/packages/sync-settings)

设置同步工具，换了新的机器，只需要安装这一个插件，所有的插件和编辑器配置都回来了。

#### [atom-beautify](https://atom.io/packages/atom-beautify)

代码美化插件，提供超多的代码支持。

#### [change-case](https://atom.io/packages/change-case)

改变代码大小写的工具，Ctrl + c / v 型程序员的最佳搭配。

#### [prettier-atom](https://atom.io/packages/prettier-atom)

js代码格式化工具，生成漂亮规范的js代码。

#### [pigments](https://atom.io/packages/pigments)

颜色显示，自动补全，选取工具。

#### [minimap](https://atom.io/packages/minimap)

右侧栏代码缩略图。

#### [file-icons](https://atom.io/packages/file-icons)

文件管理器的图标支持。

#### [atom-ternjs](https://atom.io/packages/atom-ternjs)

js的静态文件分析系统，可以实现自动补全，文档提示，以及定义跳转等功能，缺点是比较卡，而且配置起来还是比较麻烦的。

#### [autocomplete-modules](https://atom.io/packages/autocomplete-modules)

路径的自动补全工具，对于采用模块化开发的项目很有用。

#### [react-snippets](https://atom.io/packages/react-snippets)

React 的代码段。

#### [language-babel](https://atom.io/packages/language-babel)

Jsx 的自动补全。

###[linter-eslint](https://atom.io/packages/linter-eslint)

代码检查工具。

#### [editorconfig](https://atom.io/packages/editorconfig)

针对项目来统一编码风格。

#### [docblockr](https://atom.io/packages/docblockr)

js文档生成器。