import React from'react';
import Backbone from 'backbone';
import backboneReact from 'backbone-react-component';
import griddle;



class gridFormView extends React.components{

	getDefaultProps() {
	    return {
	      columns: null,
	      data:null
	    };
	  }
	render(){
		return(
			<DataGrid/>)


	}







}

module.exports=GridFormView;