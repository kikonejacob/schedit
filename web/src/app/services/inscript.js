import RestData from '../utils/restdata'
import NewInscript from '../forms/inscriptions/newinscript.js';
import Radio from "backbone.radio";
import React from 'react';
import stringRes from'../utils/stringRes';
import router from './RouterService';




export default  class InscriptController{

	constructor(options){
		this.title=stringRes.studentBasic;
		this.channel=Radio.channel("services.students.inscriptions");
		this.services=Radio.channel('services');

		this.configure();
		
	
	}
	configure(){


		let self=this;

		this.channel.on('new',this.newInscript.bind(this));
		this.channel.on('list',this.list.bind(this));
		this.channel.on('share',this.share.bind(this));
		this.channel.reply('current',this.current);
		router.route('students/add','student',function(id){
							self.newInscript(id);
						});

	}

	list(){

		//list of students in the database


	}

	save(data)
	{

		let model=new RestData({
			channel:this.channel,
			url:'../api/students',
			data:data

		});
	    model.save();


	  

	}


	newInscript(){

		console.log('loading inscript');

		this.services.trigger('change-title','New Student');

		React.render(<NewInscript   />,document.getElementById("module_container"));
       



	}

	
	share(){


	}

}




