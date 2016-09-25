import SchmenuBar from '../components/menu/schmenu.js';
import React from 'react';
import ChannelConnection from 'services/servicesChannels';
import ReactDOM from 'react-dom';
import node from 'lib/config/menu.config';




class MenuSvc {


    constructor(){
        this.channel=ChannelConnection('services');
        ReactDOM.render(React.createElement(SchmenuBar, {node}),
	               document.getElementById("menu-container"));
        console.log('Rolling the  menu service');
    }

 }

var MenuSerivce= new MenuSvc();

export default MenuSerivce;
