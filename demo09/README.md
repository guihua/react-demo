# React 处理状态

在一些用户交互发生，或者一些数据从服务器或者其它地方返回过来时，你想能改变组件的外观。

`props` 就是组件的属性，由外部通过 JSX 属性传入设置，一旦初始设置完成，就可以认为 `this.props` 是不可更改的，所以不要轻易更改设置 this.props 里面的值。

我们所要的是另一种超越属性的在组件上存储数据的方式，即存储可以修改的数据。我们所需要的是称为状态（`state`）的东西。


## state
`state` 是组件的当前状态，可以把组件简单看成一个“状态机”，根据状态 `state` 呈现不同的 UI 展示。

一旦状态（数据）更改，组件就会自动调用 `render` 重新渲染 UI，这个更改的动作会通过 `this.setState` 方法来触发。


## 划分状态数据
一条原则：让组件尽可能地少状态。这样组件逻辑就越容易维护。

什么样的数据属性可以当作状态？

当更改这个状态（数据）需要更新组件 UI 的就可以认为是 `state`，下面这些可以认为不是状态：

* 可计算的数据：比如一个数组的长度
* 和 `props` 重复的数据：除非这个数据是要做变更的


## 组件生命周期
一个组件类必须由调用 React.createClass 创建，并且提供一个 render 方法以及其他可选的生命周期函数、组件相关的事件或方法定义。在这其中，涉及组件状态初始化、状态更新等。

### getInitialState 初始化状态
初始化 `this.state` 的值，只在组件装载之前调用一次。

```
getInitialState: function () {
    return {
        strikes: 0
    }
}
```

### getDefaultProps
只在组件创建时调用一次并缓存返回的对象（即在 `React.createClass` 之后就会调用）。

因为这个方法在实例初始化之前调用，所以在这个方法里面不能依赖 `this` 获取到这个组件的实例。

在组件装载之后，这个方法缓存的结果会用来保证访问 `this.props` 的属性时，当这个属性没有在父组件中传入（在这个组件的 JSX 属性里设置），也总是有值的。


### render
必须。

组装生成这个组件的 HTML 结构（使用原生 HTML 标签或者子组件），也可以返回 `null` 或者 `false`，这时候 React 会将组件生成一个 `<noscript>` 标签，并且 `this.getDOMNode()` 会返回 `null`。


### 生命周期函数

#### 装载组件
* componentWillMount 只会在装载之前调用一次，在 `render` 之前调用，你可以在这个方法里面调用 `setState` 改变状态，并且不会导致额外调用一次 `render`。

* componentDidMount 只会在装载完成之后调用一次，在 `render` 之后调用，从这里开始可以通过 `this.getDOMNode()` 获取到组件的 DOM 节点。

#### 更新组件状态
这些方法不会在首次 `render` 组件的周期调用

* componentWillReceiveProps 在组件接收到新的 `props` 的时候调用。在初始化渲染的时候，该方法不会调用。

* shouldComponentUpdate 在接收到新的 `props` 或者 `state`，将要渲染之前调用。该方法在初始化渲染的时候不会调用，在使用 `forceUpdate` 方法的时候也不会。

* componentWillUpdate 在接收到新的 `props` 或者 `state` 之前立刻调用。在初始化渲染的时候该方法不会被调用。

* componentDidUpdate 在组件的更新已经同步到 DOM 中之后立刻被调用。该方法不会在初始化渲染的时候调用。

#### 卸载（删除）组件
* componentWillUnmount 在组件从 DOM 中移除的时候立刻被调用。