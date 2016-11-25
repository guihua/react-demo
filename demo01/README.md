# React

除了标准的 HTML、CSS 和 JavaScript 外，很多 React 代码都会用 JSX 编写。

要用 React 创建 Web 应用，我们需要一种方式采用 JSX，并将它转换为浏览器可以理解的标准 JavaScript。

目前将 JSX 转换为 JavaScript 有两种解决方案：

* 围绕 Node 以及一些构建工具（比如 Webpack）来设置开发环境。在这种环境中，每次执行构建时，所有 JSX 被自动转换为 JS，放在磁盘上，让我们可以像标准 JavaScript 文件一样引用。
* 让浏览器在运行时自动将 JSX 转换为 JavaScript。我们直接像 JavaScript 一样用 JSX，浏览器负责剩下的转换。

我们先用第二种方案来处理。


## 处理 React
在 html 文档的 head 部分直接引用 react 编译需要的库文件：
```
# 核心 React 库
<script src="../lib/react.js"></script>
# React DOM 库
<script src="../lib/react-dom.js"></script>
# Babel JavaScript 编译器
<script src="../lib/browser.min.js"></script>
```


## Render 方法
在屏幕上输出内容，实现的方式是用 render 方法。在 `script` 标记内，添加如下代码，同时将 `script` 标记的 `type` 属性设置为 `text/babel`：
```
<script type="text/babel">
    ReactDOM.render(
        <h1>guihua.pgh</h1>,
        document.querySelector('#container')
    );
</script>
```

预览页面，即可看到输出。

Render 方法是 React 领域最频繁使用的方法之一。

render 方法带有两个参数：

* 你想输出的像 HTML 一样的元素，即 JSX
* React 将要在 DOM 中渲染 JSX 的位置

在上面的代码中，第一部分的类 HTML 语法就是我们的 JSX；第二部分，就是用来指定 JSX 应该挂在 DOM 中的哪个位置。