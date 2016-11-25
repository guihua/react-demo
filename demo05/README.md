# 在 React 中设置样式

React 提供了两种方式格式化 HTML 内容。


## 用 CSS 格式化 React 内容
在 `Letter` 组件中增加 class。

```
var Letter = React.createClass({
    render: function () {
        return (
            <div className="letter">{this.props.children}</div>
        );
    }
});
```

这里要注意的是，JSX 是用 `className` 属性而不是 `class` 属性来指定 `class` 值，原因是 `class` 是 JavaScript 中的一个特殊关键字。


## 用 React 的方式格式化内容
React 偏爱用一种不使用 CSS 的行内（inline）方法格式化内容。

这种方法看起来是有点奇怪，但是它是设计用来帮助让界面更可重用。目标是让我们的组件放在一个黑盒中，所有与 UI 外观和使用相关的东西都放在一个地方。

创建一个 Style 对象。

```
var letterStyle = {
    display: "inline-block",
    margin: 10,
    padding: 10,
    backgroundColor: "#ffde00",
    color: "#333",
    fontFamily: "monospace",
    fontSize: 32,
    textAlign: "center"
};
```

这样我们就有了一个 `letterStyle` 对象，它里面的属性只是 CSS 属性名以及属性值。

Javascript 中转换 CSS 属性的规则：

* 单个单词的 CSS 属性（比如 `padding`, `margin`, `color`）保持不变；
* 带有短横线的多个单词的 CSS 属性（比如 `background-color`, `font-family`, `border-radius`）变成去掉横线，并且第二个单词的首字母大写的驼峰规则命名的单词。 例如，`background-color` 变成 `backgroundColor`, `font-family` 变成 `fontFamily`, `border-radius` 变成 `borderRadius`；

现在我们已经有了包含要应用的样式的对象，剩下的事情很简单。找到要应用样式的元素，设置该元素的 `style` 属性来引用该对象。

```
var Letter = React.createClass({
    render: function () {
        var letterStyle = {
            display: "inline-block",
            margin: 10,
            padding: 10,
            backgroundColor: "#ffde00",
            color: "#333",
            fontFamily: "monospace",
            fontSize: 32,
            textAlign: "center"
        };

        return (
            <div style={letterStyle}>{this.props.children}</div>
        );
    }
});
```


## 可以省略 “px” 后缀
React 允许我们省略一些 CSS 属性的 `px` 后缀。重新引用我们上面定义的 `letterStyle` 对象。

```
var letterStyle = {
    display: "inline-block",
    margin: 10,
    padding: 10,
    backgroundColor: "#ffde00",
    color: "#333",
    fontFamily: "monospace",
    fontSize: 32,
    textAlign: "center"
};
```

注意有些属性值为数字值的属性，比如 `padding`、`margin` 和 `fontSize`，我们完全不需要指定 `px` 后缀。这是因为在运行期，React 会自动添加上 `px` 后缀。

而 React 不会自动添加像素后缀的与数字相关的属性包括：`animationIterationCount`, `boxFlex`, `boxFlexGroup`, `boxOrdinalGroup`, `columnCount`, `fillOpacity`, `flex`, `flexGrow`, `flexPositive`, `flexShrink`, `flexNegative`, `flexOrder`, `fontWeight`, `lineClamp`, `lineHeight`, `opacity`, `order`, `orphans`, `stopOpacity`, `strokeDashoffset`, `strokeOpacity`, `strokeWidth`, `tabSize`, `widows`, `zIndex`, `zoom`。

虽然像素值很多时候是不错的，但是也许你会想用%、em、vh 等来表示值。对于这些非像素值，你依然要手动添加上后缀。


## 让背景颜色可定制
在 ReactDOM.render 方法中，首先添加一个 bgcolor 属性，并指定一些颜色：

```
ReactDOM.render(
    <div>
        <Letter bgcolor="#58B3FF">A</Letter>
        <Letter bgcolor="#FF605F">E</Letter>
        <Letter bgcolor="#FFD52E">I</Letter>
        <Letter bgcolor="#49DD8E">O</Letter>
        <Letter bgcolor="#AE99FF">U</Letter>
    </div>,
    document.querySelector('#container')
);
```

下一步，我们需要用这个属性。在 `letterStyle` 对象中，设置 `backgroundColor` 为 `this.props.bgColor`：

```
var letterStyle = {
    display: "inline-block",
    margin: 10,
    padding: 10,
    backgroundColor: this.props.bgcolor,
    color: "#333",
    fontFamily: "monospace",
    fontSize: 32,
    textAlign: "center"
};
```

这将确保 `backgroundColor` 的值是从我们通过作为 `Letter` 声明一部分的 `bgColor` 属性中推断出来的。