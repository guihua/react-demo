# React 从数据到 UI

先来看一个简单的案例。

```
var Circle = React.createClass({
    render: function() {
        var circleStyle = {
            display: "inline-block",
            margin: 20,
            padding: 10,
            width: 100,
            height: 100,
            backgroundColor: this.props.bgcolor,
            borderRadius: "50%"
        };

        return (
            <div style={circleStyle}></div>
        );
    }
});

ReactDOM.render(
    <Circle bgcolor="#F9C240"/>,
    document.querySelector("#container")
);
```

`Circle` 组件中大部分的内容是 `circleStyle` 对象，该对象包含将 `div` 变成圆的内联样式属性。所有样式值都是硬编码的，除了 `backgroundColor` 属性，它的值来自传递进来的 `bgcolor` 属性。

```
ReactDOM.render(
    <Circle bgcolor="#F9C240"/>,
    document.querySelector("#container")
);
```

通过声明一个 `Circle` 组件的实例，，并且用 `bgColor` 属性设置其颜色。

进一步，我们创建一个返回 `Circle` 组件的函数：

```
function showCircle() {
    var colors = ["#393E41", "#E94F37", "#1C89BF", "#A1D363"];
    var ran = Math.floor(Math.random() * colors.length);

    // return a Circle with a randomly chosen color
    return <Circle bgcolor={colors[ran]}/>;
};
```

在这里，`showCircle` 函数返回一个 `Circle` 组件，该组件的 `bgColor` 值被设置为一个随机颜色值 `Math.floor(Math.random() * colors.length)`。

为了让我们的示例使用 `showCircle` 函数，我们只需要在 `ReactDOM.render` 内对它求值即可：

```
ReactDOM.render(
    <div>
        {showCircle()}
    </div>,
    document.querySelector("#container")
);
```

只要求值的表达式返回 JSX，你就可以在 大括号中放入你想要的很多东西。这种灵活性很好，因为当你的 JavaScript 在 `render` 函数外生存时，你可以做很多事情。

若要实现多个不同颜色的圆，我们可以这样实现：

```
ReactDOM.render(
    <div>
        <Circle bgcolor="#393E41"/>
        <Circle bgcolor="#E94F37"/>
        <Circle bgcolor="#1C89BF"/>
        <Circle bgcolor="#A1D363"/>
    </div>,
    document.querySelector("#container")
);
```

在很多真实场景下，要显示的组件的数量与在一个数组或者类数组（比如迭代器）对象中的条目数量有关。这带来一些简单的并发症（复杂性）。

例如，假如我们有如下 colors 数组：

```
var colors = ["#393E41", "#E94F37", "#1C89BF", "#A1D363",
              "#85FFC7", "#297373", "#FF8552", "#A40E4C"];、、
```

我们想为这个数组中的每个条目创建一个 `Circle` 组件，并把 `bgColor` 属性设置为每个数组条目的值。

为实现这个目的，我们打算创建一个 `Circle` 组件数组：

```
var colors = ["#393E41", "#E94F37", "#1C89BF", "#A1D363",
        "#85FFC7", "#297373", "#FF8552", "#A40E4C"];

var renderData = [];

for (var i = 0; i < colors.length; i++) {
    renderData.push(<Circle bgcolor={colors[i]}/>);
}
```

在这段代码中，我们用 `Circle` 组件填充 `renderData` 数组，就像开始我们所做的一样。要显示所有这些组件，在 React 中就很简单。

我们看看如下代码行：

```
var colors = ["#393E41", "#E94F37", "#1C89BF", "#A1D363",
              "#85FFC7", "#297373", "#FF8552", "#A40E4C"];

var renderData = [];

for (var i = 0; i < colors.length; i++) {
    renderData.push(<Circle bgColor={colors[i]}/>);
}

ReactDOM.render(
    <div>
        {renderData}
    </div>,
    document.querySelector("#container")
);
```

在 `render` 方法中，我们把 `renderData` 数组指定为需要求值的表达式。

React 之所以让 UI 更新很快，是通过清楚地了解 DOM 中到底发生了什么。它用几种方式去了解，但是真正值得关注的一个方式是，通过内部用某种标识符标记每个元素。

当动态创建元素时（比如我们在 `Circle` 组件数组中所做），这些标识符不是自动设置的。我们需要做一些额外的工作。这种额外的工作采用 `key` 属性的形式，React 用 `key` 属性的值来唯一地识别每个特殊的组件。

```
for (var i = 0; i < colors.length; i++) {
    var color = colors[i];

    renderData.push(<Circle key={i + color} bgcolor={color}/>);
}
```

用函数的思想，我们把 `colors` 的处理用 `getRenderData` 函数包起来，完整代码如下：

```
function getRenderData () {
    var colors = ["#393E41", "#E94F37", "#1C89BF", "#A1D363",
        "#85FFC7", "#297373", "#FF8552", "#A40E4C"];

    var renderData = [];

    for (var i = 0; i < colors.length; i++) {
        var color = colors[i];

        renderData.push(<Circle key={i + color} bgcolor={color}/>);
    }

    return renderData;
}

ReactDOM.render(
    <div>
        {getRenderData()}
    </div>,
    document.querySelector("#container")
);
```

React 相当擅长当你做错了事时告诉你。例如，如果你动态创建元素/组件，但是没有为它们指定一个 `key` 属性，你会在控制上中得到如下警告：

> Warning: Each child in an array or iterator should have a unique "key" prop. Check the top-level render call using .

使用 React 时，周期性地检查控制台消息是个好主意。