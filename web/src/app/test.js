//import 'bootstrap/dist/css/bootstrap.css';
//import "font-awesome/css/font-awesome.css";
//import 'metismenu/src/metisMenu.css';

import 'jquery';
import bootstrap from 'bootstrap';
import "metisMenu";

import bela from './studentsView/studentsView.js' ;

require('react-datagrid/index.css');
var DataGrid = require('react-datagrid');

import Backbone from 'backbone';
//import backboneReact from 'backbone-react-component';
import React from 'react';
//import Example from './studentsView/studentsView.js';


////React.render(<Example  />, document.body);

class HelloMessage extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}


React.render(React.createElement(bela, null),document.body);


//React.render(<DataGrid idProperty="id" dataSource={data} columns={columns} />,document.body);

//React.render(<HelloMessage name="Sebastian" />, document.body);
