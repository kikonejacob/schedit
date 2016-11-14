import React from 'react';
import ReactDOM from 'react-dom';
import 'metismenu';


var MainMenu = React.createClass({

    render: function () {

        return (<MenuNode node={this.props.node} mainNode={true} />);
    }
});



var MenuNode = React.createClass({

    getInitialState: function () {
        return {
            mainNode: false
        };
    },
    componentDidMount() {
        // When the component is added, turn it into a modal
        if (this.props.mainNode) {
            $(ReactDOM.findDOMNode(this))
                .metisMenu();
        }
    },
    childView: function (node) {

        if (node.childNodes != null) {
            return (
                <MenuNode node={node.childNodes}  />
            );

        }
    },
    render: function () {
        var Menu;
        var self = this;
        Menu = this.props.node.map(function (node, index) {
            var arrow;
            var icon = 'fa fa-book';
            var link = '#';

            if (node.childNodes != null) {
                arrow = <span className="fa arrow"></span>;
                icon = 'fa fa-folder';
                //console.log(node.childNodes);
            }
            if (node.icon != null) icon = node.icon;
            if (node.link != null) link = node.link;

            return (<li key={index}>
                <a href={link}>
                    <i className={icon}></i>
                    {'  ' + node.title}
                    {arrow}
                </a>
                {self.childView(node) }
            </li>);
        });

        if (this.props.mainNode) {
            return (<ul className="nav in" id="side-menu">
                {Menu}
            </ul>);
        }
        else {
            return (<ul className="nav nav-second-level collapse">
                {Menu}
            </ul>);
        }




    },

});

module.exports = MenuNode;
