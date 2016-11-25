# React

```
ReactDOM.render(
    <div>
        <h1>React.js特性</h1>
        <h2>组件</h2>
        <h2>JSX</h2>
        <h2>Virtual DOM</h2>
        <h2>Data Flow</h2>
    </div>,
    document.querySelector('#container')
);
```

上面的示例中，我们用一个 `div` 包含了多个 `h` 元素。

这里要呼出一个重要的 JSX 细节：JSX 只允许输出一个元素，但是这个元素允许有多个子节点。