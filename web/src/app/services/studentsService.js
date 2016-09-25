import RestData from '../utils/restdata'
import FormView from 'components/FormView/form-view';
import Radio from "backbone.radio";
import React from 'react';
import stringRes from'../utils/stringRes';
import router from './RouterService';


var schema = {
  "schema": {
    "name": {
      "title": 'Name',
      "type": "Text",
      "fieldClass": "row",
      "disabled":'true'
    },
    "email": {
      "title": 'E-mail',
      "type": "Text",
      "fieldClass": "row",
      "disabled":'true'
    }
    
  }
};




export default  class StudentController{

	constructor(options){
		this.model=null;
		this.schema=schema;
		this.title=stringRes.studentBasic;
		this.channel=Radio.channel("services.students");
		this.services=Radio.channel('services');
		this.buttons=["btnSubmit","btnCancel"];
		this.current=null;
		console.log('constructor');
		this.show(1);

		this.configure();
		
	
	}
	configure(){


		let self=this;

		this.channel.on('show',this.show.bind(this));
		this.channel.on('share',this.share.bind(this));
		this.channel.reply('current',this.current);
		router.route('students/show/:id','student',function(id){
							self.show(id);
						});
		router.route('students/add','student',function(id){
							self.show(id);
						});

	}

	loadUX(response){

	   console.log(response.data);
       var UX=(<FormView schema={this.schema} data={response.data} /> )
		this.services.trigger('load-content',UX,'react');

	}

	show(id){
         console.log('deffffff');
        this.services.trigger('change-title',this.title);
        this.current=id;

        

		this.model=new RestData({
			channel:'student.info',
			url:'../api/students/'+this.current

		});

        this.model.fetch().done(
        	this.loadUX.bind(this));

    		
	}
	share(){


	}

}




