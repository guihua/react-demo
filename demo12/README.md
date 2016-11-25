# React 生命周期

React 给我们提供了一些生命周期方法。

生命周期方法是组件正常运转时自动调用的特殊方法，它们告知我们组件生命中重要的里程碑，我们可以用这些通知来只是注意，或者改变组件要做的事情。


## 初识生命周期方法
生命周期方法不是很复杂。

我们可以把它们当作是在组件生命中的不同的点被调用的美化的事件处理器，并且就像事件处理器一样，我们可以在这些不同的点编写代码做一些事情。

在深入之前，我们先来快速了解一下生命周期方法。它们是 `componentWillMount`, `componentDidMount`, `componentWillUnmount`, `componentWillUpdate`, `componentDidUpdate`, `shouldComponentUpdate`, `componentWillReceiveProps`。 还有三个方法严格上讲并非生命周期方法，但是我们仍要把它们跟生命周期方法混在一起，它们是 `getInitialState`、`getDefaultProps` 和 `render`。


## 看看生命周期方法起作用