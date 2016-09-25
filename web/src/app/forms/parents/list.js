import PageableCollection from 'utils/pageableCollection';
import GridView from 'components/gridFormView/gridFormView';
import React from 'react';

import stringRes from 'utils/stringRes';

var columns=['id','name','email','primary_phone','work_phone','cell_phone'];

var columnsMetaData=[{
	    "columnName": "name",
	    "order": 1,
	    "locked": false,
	    "visible": true,
	    "displayName": "Name"
	  },
	  {
	    "columnName": "email",
	    "order": 2,
	    "locked": false,
	    "visible": true,
	    "displayName": "Email"
	  },
	  {
	    "columnName": "primary_phone",
	    "order": 3,
	    "locked": false,
	    "visible": true,
	    "displayName": "Primary Phone"
	  },
	  {
	    "columnName": "work_phone",
	    "order": 3,
	    "locked": false,
	    "visible": true,
	    "displayName": "Work phone"
	  },
	  {
	    "columnName": "cell_phone",
	    "order": 3,
	    "locked": false,
	    "visible": true,
	    "displayName": "Cell phone"
	  }

	];



export default  React.createClass({ 


	initialize:function(){

	},


   render:function(){


		
		return(<GridView collection={this.props.collection} 
							   columns={columns}
							   columnMetadata={columnsMetaData} />);
	}
})