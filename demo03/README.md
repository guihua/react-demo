# React 组件

React 组件是通过 JSX 输出 HTML 元素的可重用的 JavaScript 代码块。

在 React 中创建组件的方式有几种，但是最开始我们创建组件的方式是用 `React.createClass`。

```
var HelloWorld = React.createClass({
    render: function () {
        return (
            <p>你好，React 组件！</p>
        );
    }
});
```

组件创建之后，就需要被调用。

调用 `HelloWorld` 组件的方式非常简单。

```
ReactDOM.render(
    <HelloWorld />,
    document.querySelector('#container')
);
```

组件可以被多次调用，多次调用时，需要被父元素包裹。

```
ReactDOM.render(
    <div>
        <HelloWorld />
        <HelloWorld />
        <HelloWorld />
        <HelloWorld />
    </div>,
    document.querySelector('#container')
);
```

现在，`HelloWorld` 组件是硬编码的，总是发送 `你好，React 组件！` 为返回值。

我们要做的第一件事情就是改变这种行为，让组件返回的是通过一个属性传递进来的值。

我们制定一个属性名 `greetTarget`，下面开始属性的使用。

```
var HelloWorld = React.createClass({
    render: function () {
        return (
                <p>Hello, {this.props.greetTarget}!</p>
        );
    }
});
```

访问一个属性的方式，是通过每个组件都可以访问的 `this.props` 属性来调用它。注意我们指定这个属性的方式：我们把它放在一个大括号中。在 JSX 中，如果你想把一些事情当作表达式来计算，就必须将它放在大括号中。如果不这样做，那么就会看到原始文本 “this.props.greetTarget” 被打印出来了。

属性被定义后，剩下的就是传递属性值为组件调用的一部分。实现方式是在组件调用中添加一个同名属性后跟要传递进来的值。在我们的示例中，就是用 `greetTarget` 属性和想给它的值来修改 `HelloWorld` 调用。

```
ReactDOM.render(
    <div>
        <HelloWorld greetTarget="React World" />
        <HelloWorld greetTarget="guihua.pgh" />
        <HelloWorld greetTarget="Fighting" />
        <HelloWorld greetTarget="Someone" />
    </div>,
    document.querySelector('#container')
);
```

现在每个 `HelloWorld` 调用都有 `greetTarget` 属性，该属性的属性值为我们想要的任何值。