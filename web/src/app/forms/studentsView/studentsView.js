'use strict';

var React    = require('react');
var DataGrid = require('react-datagrid');

var columns = [
  { name: 'lastName' },
  { name: 'city', width: 200 },
  { name: 'country', width: 200 },
  { name: 'email', width: 100}
]

function dataSource(query){
  //you need to return a Promise (or a thenable)
  return $.ajax('http://5.101.99.47:8090/5000?pageSize=' + query.pageSize + '&skip=' + query.skip)
  //of course you can also send a POST request
}
var bela = React.createClass({

  render: function(){
    return (<DataGrid
      dataSource={dataSource}
      idProperty='id'
      columns={columns}
      style={{height: 500}}
    />)
  }
});

module.exports=bela;