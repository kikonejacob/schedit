import PageableCollection from 'utils/pageableCollection';
import ChannelConnection from 'services/servicesChannels';
import React from 'react';
import stringRes from 'utils/stringRes';
import RestData from 'utils/restdata';

import StudentList 	from './containers/list';
import StudentView 	from 'modules/students/containers/edit';
//import StudentInfo 	from 'modules/students/containers/showinfo';
import StudentCreate from 'modules/students/containers/create';



export default  class StudentsController {



	constructor(){

		this.title = stringRes.studentBasic;
		this.services = ChannelConnection('services');

		this.current = null;

	}
	configure(){

	}

	 middleware(){

	}

	 edit( id ){

		return show(id,true)





	}
	save(){


	}

	show(id,editable){
        console.log('showing student info');
        this.services.trigger('change-title','Student general information');
        this.current=id;
        this.model=new RestData({
					channel:'student.info',
					url:'../api/students/'+this.current

				});


        var save=this.save;
        var services=this.services


	    this.model.get().done(function(response){

	    	        console.log(response.data);

	    			var Rendered=(<StudentView  data={response.data}  />);

                    services.trigger('load-content',Rendered,'react');

	    }.bind(this));

	}
	create(){
		this.services.trigger('change-title','New inscription');
		var data={};
		var Rendered=(<StudentCreate  data={data}  />);
        this.services.trigger('load-content',Rendered,'react');




	}
	index(){

		this.services.trigger('change-title',"Student list");

		var collection=new PageableCollection({url:'../api/students'});
		var Rendered=(<StudentList  collection={collection}/>);
		this.services.trigger('load-content',Rendered,'react');




	}
	share(){


	}

}
