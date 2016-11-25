var React = require('react');
var ReactDOM = require('react-dom');

require('./style.scss');

var Buttonify = React.createClass({
    render: function () {
        return (
            <button type="{this.props.behavior}">{this.props.children}</button>
        );
    }
});

ReactDOM.render(
    <Buttonify behavior="submit">Submit</Buttonify>,
    document.querySelector('#container')
);