import 'backbone.paginator';

var bela=Backbone.Model.extend({});


var PageableCollection = Backbone.PageableCollection.extend({
 url: '../api/',
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

 initialize:function(options){

 	Backbone.PageableCollection.prototype.initialize.apply(this,arguments);
 	this.url=options.url||this.url;

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




export default  PageableCollection;