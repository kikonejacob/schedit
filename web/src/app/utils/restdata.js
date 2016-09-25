
import when from 'when';
import { get,post } from '../utils/http';
import Radio from 'backbone.radio';
import _ from "underscore";
import debug from './debug';

export default class RestData {

	constructor(options){
		this.data=options.data||{};
		this.url=options.url;
		debug.log( 'ddOOOOOOO__'+options.url);

		Object.assign(this,options);
		this.services=Radio.channel('services');

	}

	handleError(e){

		alert("error in api communication")
	}

	get(){

		var url=this.url;
		var data=this.data;


		data=get(url);
		/*data.done(function(e){

			data=e;

		});*/

		data.catch(this.handleError);
	
		return data;
	}

	save(){



		var url=this.url;
		var data=this.data;
		console.log(data);

		
		let options={

			params:data
		};



		let response=post(url,options);
		response.done(function(e){

			console.log('successfuly stored');

		});
		response.catch(function(e){
			alert("error in api communication")


		})



	}

	

}
