# React Router 创建单页应用

单页应用程序与传统的多页应用程序，最大的不同之处在于在单页应用程序中导航是不会进入到一个完全新的页面，单页应用程序中的页面（通常称为视图）通常是在相同页面本身内联加载。

![SPA](./single-page-model.png)

SPA 应用中，最难的部分是确保单页应用的行为与用户习惯的方式一致。当用户在应用程序中导航时，他们期望：

* 显示在地址栏的 `URL` 总是反映用户正在浏览的事情。
* 用户可以成功地使用浏览器的后退和向前按钮。
* 用户可以使用合适的 `URL` 直接导航到特定的视图（即深度链接，deep link）。

要处理所有这些事情，我们有一揽子称为路由（Routing）的技术。路由是映射 URL 到并非物理页面的目标，比如单页应用中的单个视图。

React Router 为由 React 创建的单页应用提供了路由能力，它以在 React 中已经熟悉的方式扩展，给我们很棒的路由功能。


## 创建应用
当创建单页应用时，总会有一部分页面是保持静态的。这个静态的部分，也称为应用帧（APP frame），可以只是一个不可见的 HTML 元素，用来充当所有内容的容器；也可以包含其它视觉元素，比如标题、脚注、导航等等。

在我们的案例中，应用帧将包含导航标题、以及一个要加载内容的空白区域。要显示它们显示出来，需要创建一个组件来负责此事。
```
var App = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Simple SPA</h1>
                <ul className="header">
                    <li>Home</li>
                    <li>Stuff</li>
                    <li>Contact</li>
                </ul>
                <div className="content"></div>
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.querySelector('#container')
);
```

接下来，我们开始使用 React Router。

React Router 不是 React 本身的一部分，我们需要添加对它的引用。
```
<script src="../lib/ReactRouter.min.js"></script>
```

首先，指定 Router 组件：
```
ReactDOM.render(
    <ReactRouter.Router>
        <ReactRouter.Route path="/" component={App}></ReactRouter.Route>
    </ReactRouter.Router>,
    document.querySelector('#container')
);
```

`Router` 组件是 React Router API 的一部分，它的主要工作是处理应用程序所需的所有路由相关的逻辑。在这个组件内，我们指定路由配置，路由配置用于描述 URL 和视图之间的映射关系。

`Route` 组件有几个属性，用来定义在某个 `URL` 上显示什么。

* `path` 属性指定要匹配的 `URL`

* `component` 属性用来指定要显示的组件的名称

React Router API 的内容很多，在这里，我们只是涉及非常简单的部分，更多内容，参考 [React Router 文档](https://github.com/ReactTraining/react-router)。