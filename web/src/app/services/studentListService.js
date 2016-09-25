import PageableCollection from '../utils/pageableCollection';
import GridView from '../components/gridFormView/gridFormView';
import Radio from 'backbone.radio';
import React from 'react';
import router from "./RouterService";

import stringRes from '../utils/stringRes';


export default class studentListSvc{


	constructor(){

		this.title=stringRes.studentlist;
		this.channel=Radio.channel('services.students');
		this.services=Radio.channel('services');

		this.configure();
		

	}


	configure(){


		var self=this;
		this.channel.on('list',this.show.bind(this));
		router.route('students','student_list',function(){
						self.show();
					});

	}

	show(){

		this.services.trigger('change-title',this.title);

		var collection=new PageableCollection({url:'../api/students'});
		var columns=['id','name','email','birth_date'];
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
							    "columnName": "birth_date",
							    "order": 3,
							    "locked": false,
							    "visible": true,
							    "displayName": "Birth date"
							  }

  ];

		React.render(<GridView collection={collection} 
							   columns={columns}
							   columnMetadata={columnsMetaData} />,
  					 document.getElementById('module_container'));
	}
}