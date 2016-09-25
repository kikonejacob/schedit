
import React from 'react';
import 'backbone.paginator';
import Griddle from 'griddle-react';
import _ from 'underscore';


var SchGridView = React.createClass({
   getInitialState: function(){
     return {
       'results': [],
       'currentPage': 0,
       'maxPages': 0,
       'externalResultsPerPage': 10,
       'externalSortColumn': null,
       'externalSortAscending': true
     };
   },
   componentDidMount: function(){
     this.getExternalData();
   },
  getExternalData: function(stateInfo=null){
    $.when(this.props.collection.fetch())
     .done(function(response){

       let collection=this.props.collection;
       console.log('maxPage'+response.last_page);
       var state={
         results: response.data,
         currentPage: response.current_page - 1,
         maxPages: response.last_page,
         externalResultsPerPage: response.per_page,
         externalSortColumn: 'id',
         externalSortAscending: null
       };
       if (stateInfo!==undefined)
       {
       	_.extend(state,stateInfo);
       } 
       this.setState(state);

        
    }.bind(this));
  },
  externalSetPage: function(index){
    var index = index + 1;
    var col=this.props.collection;
    console.log([col.state.firstPage,col.state.currentPage,col.state.totalPages]);
    this.props.collection.getPage(index);
    this.getExternalData();
  },
  changeSort: function(sort, sortAscending){
    var order;
    if (this.props.collection.state.order === 1) {
      order = -1
    } else {
      order = 1
    }
    var sortKey = sort;
    this.props.collection.setSorting(sortKey, order);
    this.getExternalData({externalSortAscending:sortAscending,
    	                  externalSortColumn:sort});
  },
  setFilter: _.debounce(function(filter){
    this.props.collection.state.query = filter;
    this.props.collection.getPage(1);
    this.getExternalData();
  },800),
  setPageSize: function(size){

  	let col=this.props.collection;
    this.props.collection.setPageSize(size);
    this.getExternalData();
  },
  metaData: function(){
    var LinkComponent = React.createClass({
      render: function() {
        url = '/app_path/show/'+this.props.rowData.id;
        return <a href={url}>{this.props.data}</a>;
      }
    });
    // I removed a bunch of stuff here -- if you need to use
    // MetaData to rename columns and do other stuff in Griddle, 
    // you can look up what to put here in the documentation.
  },
  render: function(){
    return (<div className="table-responsive"><Griddle useExternal={true} externalSetPage=  
     {this.externalSetPage} externalChangeSort={this.changeSort} 
     externalSetFilter={this.setFilter} externalSetPageSize=
     {this.setPageSize} externalMaxPage={this.state.maxPages}
     externalCurrentPage={this.state.currentPage} results= 
     {this.state.results} resultsPerPage=
     {this.state.externalResultsPerPage}
      useGriddleStyles={false}
     externalSortColumn={this.state.externalSortColumn}  
     externalSortAscending={this.state.externalSortAscending}  
     showFilter={true} showSettings={true}
     tableClassName="table table-striped table-hover table-bordered table-condensed"
     columnMetadata={this.metaData()}  columns={['id','amount']}/>

     </div>);
    }
 });


var bela=Backbone.Model.extend({});


var PageBeta = Backbone.PageableCollection.extend({
 url: '../api/students/2/tuition',
 model: bela,
 comparator: 'id',//"column_name",*/
 mode:'server',
 state:{
		 firstPage: 1,
		 currentPage: 1,
		 pageSize: 15,
		 totalRecords: 0,
		 order: 1,
		 sortKey: 'id',
		 query: null,
		},
 queryParams:{
		 currentPage: 'page',
		 pageSize: 'page_size',
		 totalRecords:'total',
		 totalPages:'last_page',
		 query: function(){
		 	return this.state.query;}
		 },  
 parseState: function (response, queryParams, state, options) {
		 console.log('inside parseState function'+response.last_page);
		 bela={

		 	totalPages: response.last_page,
		    perPage: response.per_page,
		    currentPage: response.current_page,
		    totalRecords: response.total

		 };
		 return bela;
  // get the actual records
        
		 /*this.state.totalPages = response.last_page;
		 this.perPage = response.per_page;
		 this.state.currentPage = response.current_page;
		 this.totalRecords = response.total;
		 return response.collectionObjects;*/
},
      parseRecords: function (resp, options) {
          return resp.data;
        }
 
});


module.exports={SchGridView,PageBeta};
