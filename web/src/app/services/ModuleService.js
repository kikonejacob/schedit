import debug from 'utils/debug';
import React from  'react';
import ReactDOM from 'react-dom';
import ChannelConnection from 'services/servicesChannels';

import ModuleTitleView from "../components/TitleView/ModuleTitleView.js";

export default class ModuleSvc {


	constructor(){

		this.channel =  ChannelConnection( 'services' );
		this.changeModuleTitle( 'welcome' );
		debug.log( 'Rolling Module swe');
		this.channel.on( 'load-content', this.loadContent);
		this.channel.on( 'change-title', this.changeModuleTitle);




	}

	changeModuleTitle( title  ){
		ReactDOM.render(<ModuleTitleView title={title} />,
			              document.getElementById('Module_title'));


	}

	loadContent(content,type,title){
		if (type=='react')
		{
			//console.log(content);
			console.log('loading react module...');
			ReactDOM.render(content,
		        document.getElementById("module_container"));
		}

	}
}



