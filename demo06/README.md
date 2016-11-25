# React 创建复杂的组件

Square 组件
```
var Square = React.createClass({
    render: function () {
        var squareStyle = {
            height: 150,
            backgroundColor: this.props.color
        };

        return (
            <div style={squareStyle}></div>
        );
    }
});
```

Label 组件
```
var Label = React.createClass({
    render: function () {
        var labelStyle = {
            margin: 0,
            padding: 17,
            textAlign: "center",
            fontFamily: "sans-serif",
            fontWeight: "bold"
        };

        return (
            <p style={labelStyle}>{this.props.color}</p>
        );
    }
});
```

Card 组件
```
var Card = React.createClass({
    render: function () {
        var cardStyle = {
            padding: 0,
            width: 150,
            height: 200,
            backgroundColor: "#FFF",
            WebkitFilter: "drop-shadow(0px 0px 5px #666)",
            filter: "drop-shadow(0px 0px 5px #666)"
        };

        return (
            <div style={cardStyle}>
                <Square color={this.props.color} />
                <Label color={this.props.color} />
            </div>
        );
    }
});
```

`Card` 组件中引用了 `Square` 组件和 `Label` 组件。

```
ReactDOM.render(
    <Card color="#FFA737"></Card>,
    document.querySelector('#container')
);
```

由上面的代码可知，尽管 `color` 属性只被 `Square` 和 `Label` 组件所用，但是父组件 `Card` 负责传递该属性给它们。对于更深层次的嵌套，你会需要更多的中间组件负责传递属性。这就变得更糟糕。当你有多个属性想沿着多级组件传递时，你所做的打字（或者复制/粘贴）数量也会增加很多。