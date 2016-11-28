# React 访问 DOM 元素

React 提供 `refs` 来帮助我们访问 HTML 元素上的 DOM API。

通常我们会把 ref 属性的值设置为一个 JavaScript 回调函数，这个函数会在拥有这个 `render` 方法的组件挂载时自动被调用。

如果你将 ref 属性的值设置为存储了对被引用的 DOM 元素的引用的简单 JavaScript 函数，它会像如下高亮度行：
```
...
var self = this;

return (
    <div className="colorArea">
        <div style={squareStyle} className="colorSquare"></div>
        <form onSubmit={this.setNewColor}>
            <input
                    ref={
                        function(el) {
                            self._input = el;
                        }
                    }
                    onChange={this.colorValue}
                    placeholder="Enter a color value">
            </input>
            <button type="submit">go</button>
        </form>
    </div>
);
...
```

组件挂载后，这段代码运行的最终结果很简单：我们可以通过调用 `this._input`，在组件内任何地方访问表示 `input` 元素的 HTML。

首先，回调函数看起来是这样的：
```
function(el) {
    self._input = el;
}
```

这个匿名函数在组件挂载时被调用，对最终 HTML DOM 元素的一个引用被作为参数传递进来。这里我们是用 `el` 标识符捕获这个参数，但是你可以用你想用的任何名称来给这个参数命名。这个回调函数的函数体只是将一个自定义的属性 `_input` 设置为 DOM 元素的值。为确保在组件上创建这个属性，我们用 `self` 变量来创建一个闭包，这里 `this` 毫无疑问引用的是我们的组件，而不是回调函数本身。

```
setNewColor: function(e){
    this.setState({
        bgColor: this.state.color
    });

    this._input.value = "";
    this._input.focus();

    e.preventDefault();
}
```

只关注一下 `input` 元素发生了什么，当表单被提交，并且 `setNewColor` 方法被调用时，我们通过调用 `this._input.value = “”`，来清除 `input` 元素的内容。通过调用 `this._input.focus()`，把焦点设置到 `input` 元素上。

所有与 `ref` 相关的工作，只是让这两行能够运行。而这两行里，我们需要一些方法，让 `this._input` 指向在 JSX 中定义的代表 `input` 元素的 HTML 元素。一旦我们搞清楚了这个，就可以调用 DOM API 暴露在这个元素上的 `value` 属性 和 `focus` 方法。

要把组件上的一个属性赋值给被引用的 HTML 元素，我们像这样写代码：
```
<input
    ref={
        function(el) {
            this._input = el;
        }
    }
    onChange={this.colorValue}
    placeholder="Enter a color value">
</input>
```

使用 ES6 箭头函数，我们可以把代码简化成如下这样：
```
<input
    ref={(el) => this._input = el}
    onChange={this.colorValue}
    placeholder="Enter a color value">
</input>
```

最终结果与前面是一致的，并且因为箭头函数处理作用域的机制，你可以在函数体内使用 `this` 来引用组件，而不需要做额外的工作。