# React 传递属性

处理属性有令人沮丧的一面，在前一个教程中我们已经看到了一点。

在只处理一层组件时，将属性从一个组件传递到另一个很简单。但是如果你想将一个属性在多层组件之间传递，事情就开始变得复杂了。

React 强制一个命令链，在链中，属性必须从父组件向下流动到直接的子组件。也就是说，在传递一个属性时，你不能跳过子层。这还意味着你的子组件不能把一个属性传回到父组件。所有的通讯是从父到子单向的。


## 扩展运算符（Spread Operator）
扩展运算符允许你将数组展开为单个的元素。

```
var items = ["1", "2", "3"];

function printStuff(a, b, c) {
  console.log("Printing: " + a + " " + b + " " + c);
}

// 不用扩展运算符
printStuff(items[0], items[1], items[2]);

// 用扩展运算符
printStuff(...items);
```


## 正确传递属性
我们要面对的在组件之间传递属性这种情况，与分别访问每个数组条目很相似。

我们先进行参数传递。

```
ReactDOM.render(
    <div>
        <Shirt color="steelblue" num="3.14" size="medium" />
    </div>,
    document.querySelector("#container")
);
```

我们的 `props` 对象看起来像下面这样子：

```
var props = {
    color: "steelblue",
    num: "3.14",
    size: "medium"
}
```

在 `Shirt` 组件中，运用扩展运算符，我们可以这样接收参数。

```
var Shirt = React.createClass({
    render: function() {
        return (
            <div>
                <Display {...this.props}/>
            </div>
        );
    }
});
```

最后，在 `Display` 组件中，接收传递的参数：

```
var Display = React.createClass({
    render: function() {
        return(
            <div>
                <p>{this.props.color}</p>
                <p>{this.props.num}</p>
                <p>{this.props.size}</p>
            </div>
        );
    }
});
```

通过使用扩展运算符，如果曾经决定要添加属性、重命名属性、删除属性，或者做任何其它与属性相关的鬼把戏，你就不需要做大量不同的修改了。只需要在定义属性的地方做一个修改，在消费该属性的地方做另一个修改。这就够了。所有仅仅传递改属性的中间组件将保持不变，因为 {this.props}表达式不包含内部到底发生了什么的细节。