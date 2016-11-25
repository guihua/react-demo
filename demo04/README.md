# React 处理子元素

在 JSX 中我们的组件与正规 HTML 元素很相似。在我们将一个组件放在 div 元素内，或者指定一个属性和值作为给定属性的一部分的时候，我们自己都可以看得出来。还有一件事情是组件可以有的，就像很多 HTML 元素一样：组件可以有子元素。

```
var Buttonify = React.createClass({
    render: function () {
        return (
            <button type="{this.props.behavior}">{this.props.children}</button>
        );
    }
});

# 组件调用
ReactDOM.render(
    <Buttonify behavior="submit">Submit</Buttonify>,
    document.querySelector('#container')
);
```

如果子元素是一个深层嵌套结构的根，那么 `this.props.children` 属性返回的是一个数组。如果子元素只是一个元素（像本例），那么 `this.props.children` 属性返回的是没有包在一个数组中的单个组件。