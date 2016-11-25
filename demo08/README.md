# React 深入JSX

浏览器是不知道如何处理 JSX 的，我们需要用 Babel 把 JSX 转换成浏览器可以理解的 JavaScript。

## JSX 特性

### 1.只能返回一个根节点
在 JSX 中，return 或者 render 的东西不能由多个根元素组成。

```
ReactDOM.render(
    <Letter>B</Letter>
    <Letter>E</Letter>
    <Letter>I</Letter>
    <Letter>O</Letter>
    <Letter>U</Letter>,
    document.querySelector("#container")
);
```

如果你想像这样做点什么，那么你需要先将所有元素用一个父元素包起来：

```
ReactDOM.render(
    <div>
        <Letter>B</Letter>
        <Letter>E</Letter>
        <Letter>I</Letter>
        <Letter>O</Letter>
        <Letter>U</Letter>
    </div>,
    document.querySelector("#container")
);
```

当使用 `render` 和 `return` 函数时，最终返回的是单个 `createElement` 调用（这个 `createElement` 可能会有很多嵌套的 `createElement` 调用）。

如下是上面的 JSX 转换为 JavaScript 后的代码：

```
ReactDOM.render(React.createElement(
	"div",
	null,
	React.createElement(
		Letter,
		null,
		"A"
	),
	React.createElement(
		Letter,
		null,
		"E"
	),
	React.createElement(
		Letter,
		null,
		"I"
	),
	React.createElement(
		Letter,
		null,
		"O"
	),
	React.createElement(
		Letter,
		null,
		"U"
	)
), document.querySelector("#container"));
```

如果是有多个根元素，就会破坏函数返回值以及 `createElement` 的机制，所以这就是为什么只能指定一个返回一个根元素的原因。


### 2.不能指定 inline CSS
在 HTML 中，你可以直接在 HTML 元素的 `style` 属性上设定 CSS 属性：

```
<div style="font-family:Arial;font-size:24px">
    <p>Blah!</p>
</div>
```

在 JSX 中，`style` 属性不能包含 CSS，而是引用一个包含样式信息的对象：

```
var Letter = React.createClass({
    render: function() {
        var letterStyle = {
            padding: 10,
            margin: 10,
            backgroundColor: this.props.bgcolor,
            color: "#333",
            display: "inline-block",
            fontFamily: "monospace",
            fontSize: "32",
            textAlign: "center"
        };

        return (
            <div style={letterStyle}>
                {this.props.children}
            </div>
        );
    }
});
```

可以看到我们有一个 `letterStyle` 对象，该对象包含所有的 CSS 属性（按驼峰命名法则命名的 JavaScript 形式）及其值。该对象就是我们指定给 `style` 属性的对象。


### 3.保留关键字和 className
JavaScript 有很多不能用作标识符（即变量和属性名）的关键字和值。

这些关键字包括：`break`, `case`, `class`, `catch`, `const`, `continue`, `debugger`, `default`, `delete`, `do`, `else`, `export`, `extends`, `finally`, `for`, `function`, `if`, `import`, `in`, `instanceof`, `new`, `return`, `super`, `switch`, `this`, `throw`, `try`, `typeof`, `var`, `void`, `while`, `with`, `yield`。

当我们在编写 JSX 时，也必须注意不要用这些关键字作为标识符。

我们来看如下代码：

```
ReactDOM.render(
    <div class="slideIn">
        <p class="emphasis">Gabagool!</p>
        <Label/>
    </div>,
    document.querySelector("#container")
);
```

无视 JavaScript 的保留关键字 `class`（就像上面代码中一样）是不行的。你需要做的是用 DOM API 版本的 `class` 属性 `className` 来代替：

```
ReactDOM.render(
    <div className="slideIn">
        <p className="emphasis">Gabagool!</p>
        <Label/>
    </div>,
    document.querySelector("#container")
);
```

完整的属性支持，请参考： [JSX 支持的属性](https://facebook.github.io/react/docs/dom-elements.html)。

因为这些与 HTML 行为的细小偏差，我们趋向于说 JSX 支持 HTML 类似的语法，而不是就说 JSX 支持 HTML。

对JSX 和 HTML 之间的关系的最清晰的回答来自于 React 团队成员，Ben Alpert，他在 Quora 中这样回答：

> …我们的想法是 JSX 的主要优点是 匹配关闭标记的对称性让代码更容易读懂，而不是直接与 HTML 或者 XML 相似。直接复制/粘贴 HTML 很方便，但是其它 It's convenient to copy/paste HTML directly, but other minor differences (in self-closing tags, for example) make this a losing battle and we have a HTML to JSX converter to help you anyway. 最后，要将 HTML 翻译为通顺的 React 代码，相当大的工作量通常是将标记打碎为有意义的组件，所以将 class 变为 className 只是工作量中的一个小部分。


### 注释
就像在 HTML、CSS 和 JavaScript 中写注释是一个好主意一样，在 JSX 内提供注释也是个好主意。在 JSX 中指定注释与在 JavaScript 写注释很相似，只有一个例外。如果你指定一个注释作为一个标记的子节点，那么你必须用 `{` 和 `}` 把注释包起来，以确保它被解析为一个表达式：

```
ReactDOM.render(
    <div class="slideIn">
        <p class="emphasis">Gabagool!</p>
        {/* I am a child comment */}
        <Label/>
    </div>,
    document.querySelector("#container")
);
```

本例中的注释是 div 元素的一个子元素。如果完全在一个标记内部指定注释，那么就不需要用大括号把单行或者多行注释括起来：

```
ReactDOM.render(
    <div class="slideIn">
        <p class="emphasis">Gabagool!</p>
        <Label
            /* This comment
             goes across
             multiple lines */
             className="colorCard" // end of line
            />
    </div>,
    document.querySelector("#container")
);
```


### 5. 大小写、HTML 元素和组件
要表示 HTML 元素，必须确保 HTML 标记是小写字母：

```
ReactDOM.render(
    <div>
        <section>
            <p>Something goes here!</p>
        </section>
    </div>,
    document.querySelector("#container")
);
```

当表示组件时，组件的名称必须是大写：

```
ReactDOM.render(
    <div>
        <MyCustomComponent/>
    </div>,
    document.querySelector("#container")
);
```

如果大小写出错，React 将不会正确渲染内容。当代码运行不正确时，大小写问题可能是你想到的最后的事情，所以记住这个小技巧。


### JSX 可以出现在任何地方
在很多情况下，JSX 并不是像我们前面看到的示例一样，整齐地排列在一个 render 或者 return 函数内。看看如下示例：

```
var swatchComponent = <Swatch color="#2F004F"></Swatch>;

ReactDOM.render(
    <div>
        {swatchComponent}
    </div>,
    document.querySelector("#container")
);
```

我们有一个 `swatchComponent` 变量，该变量被初始化为一行 JSX。当 `swatchComponent` 变量放在 render 函数内时，`Swatch` 组件就被初始化。这一切都是有效的，并且在将来当我们学习如何用 JavaScript 生成和操作 JSX 时，我们将会做更多这种事情。


### HTML 转义
React 会将所有要显示到 DOM 的字符串转义，防止 XSS。所以如果 JSX 中含有转义后的实体字符比如 `&copy;` (©) 最后显示到 DOM 中不会正确显示，因为 React 自动把 `&copy;` 中的特殊字符转义了。有几种解决办法：

* 直接使用 UTF-8 字符 ©
* 使用对应字符的 Unicode 编码，查询编码
* 使用数组组装 `<div>{['cc ', <span>&copy;</span>, ' 2015']}</div>`
* 直接插入原始的 HTML

```
<div dangerouslySetInnerHTML={{__html: 'cc &copy; 2015'}} />
```


### 自定义 HTML 属性
如果在 JSX 中使用的属性不存在于 HTML 的规范中，这个属性会被忽略。如果要使用自定义属性，可以用 `data-` 前缀。

可访问性属性的前缀 `aria-` 也是支持的。


### 支持的标签和属性
如果你要使用的某些标签或属性不在这些支持列表里面就可能被 React 忽略，必须要使用的话可以提 issue，或者用前面提到的 `dangerouslySetInnerHTML`。