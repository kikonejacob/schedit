import RestData from '../utils/restdata'
import FormView from '../components/FormView/form-view';
import Radio from "backbone.radio";
import React from 'react';
import stringRes from'../utils/stringRes';
import router from './RouterService';

/**
 * School Basic controller 
 * description: regroup all the common fonction for  school related service
 * 				this is more of a design pattern
 *
 * init:
 * 		this.model: represent the data model used
 * 		this.schema: represent a schema for the form builder
 * 		this.title: represent a title for the actual page
 * 		this.channel: represent the channel 
 *  	
 * 
 */
export default  class SchoolBasicController{

	constructor(options){
		this.model=null;  
		this.schema=null;
		this.title=stringRes.studentBasic;
		this.channel=Radio.channel("services.students");
		this.services=Radio.channel('services');
		this.buttons=null;
		this.current=null;
		console.log('constructor');

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
