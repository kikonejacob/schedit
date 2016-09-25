
import React from 'react';
import Griddle from 'griddle-react';
import _ from 'underscore';
import GriddlePager from './griddlePager';
import LinkComponent from './griddleLinkComponent';// just for export purpose
import servicesChannels from 'services/servicesChannels'

var SchGridView = React.createClass({
   getInitialState: function(){
     return {
       'results': [],
       'columns':[],
       'currentPage': 0,
       'maxPages': 0,
       'externalResultsPerPage': 10,
       'externalSortColumn': null,
       'externalSortAscending': true,
       //'selectedRowIds':[],
       'multiselect':false,
       'showFilter':true,
       'showSettings':false,
     };
   },
   componentDidMount: function(){
     this.getExternalData();
     //TODO: find a way for selecting
    // servicesChannels('services').on('getdata',this.go.bind(this))
   },
   componentWillReceiveProps:function(nextProps){
    console.log(nextProps);
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

  metaData: function(){  //obsolete
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

  getcolums:function(){

  	return this.props.columns;
  },

  getcolumsMeta:function(){

  	let meta=[];

  	/*if (this.props.multiselect)
  	{
  		meta.push({
                columnName: 'selected',
                cssClassName: 'selected',
                visible: false,
                displayName: '',
                customComponent: SelectedComponent
            })
  	}*/

  	_.extend(meta,this.props.columnMetadata);
  	return meta;
  },

  go:function(){

    return this.ref.SchGrid.getSelectedRowIds();
  },
  render: function(){

    var multiselectProps={};



    if (this.props.multiselect)
    {

            console.log('sdpdsooooodss');
            console.log(this.props.selectedIds);
            multiselectProps={
            isMultipleSelection:true,
            selectedRowIds:this.state.selectedIds,
            rowSelection:'multiple'
           }
    }


    return (<div className="col-lg-12">

    	<Griddle ref='SchGrid' useExternal={true} externalSetPage={this.externalSetPage}
    	   externalChangeSort={this.changeSort}
     		 externalSetFilter={this.setFilter}
     		 externalSetPageSize={this.setPageSize}

     		 externalMaxPage={this.state.maxPages}
     		 externalCurrentPage={this.state.currentPage}
         externalSortColumn={this.state.externalSortColumn}
         externalSortAscending={this.state.externalSortAscending}

     		 results={this.state.results}
     		 resultsPerPage={this.state.externalResultsPerPage}

		     useGriddleStyles={false}
    		 showFilter={this.state.showFilter}
    		 showSettings={this.state.showSettings}
         uniqueIdentifier={this.props.UniqueID ? this.props.UniqueID : 'id'}


     		 tableClassName="table table-striped table-hover table-bordered table-condensed"
     		 columnMetadata={this.getcolumsMeta()}

         useCustomPagerComponent="true"
         customPagerComponent={GriddlePager}

         {...multiselectProps}
         {...this.props}




     		 columns={this.getcolums()}/>

     </div>);
    }
 });


export default SchGridView;
export {LinkComponent};
