import React from  'react';
import ReactDOM from 'react-dom';
import ModuleTitleView from 'components/TitleView/ModuleTitleView.js';
import {DISPLAY_CONTAINER,UPDATE_ACTIVE_CONTAINER_INFO,
        CHANGE_TITLE,SET_CONTAINER_DUMPSTACK} from './actionTypes';
import  services from '../../services/services';
import { Provider } from 'react-redux';


export  function updateActiveContainer(info){
    return {
        type:UPDATE_ACTIVE_CONTAINER_INFO,
        info:info

    };
}
export function loadContainer(Container)
{

    console.log('loading react container...');
    ReactDOM.render(Container,
		        document.getElementById('module_container'));
    return {
        type:DISPLAY_CONTAINER
    };
}

export function loadConnectedContainer(Container,store)
{
    return loadContainer(<Provider store={store}>{Container}</Provider>);

}
export function changeTitle(newtitle){

    ReactDOM.render(<ModuleTitleView title={newtitle} />,
                          document.getElementById('Module_title'));

    return {
        type:CHANGE_TITLE,
        title:newtitle
    };
}

export function setLocalContainerDumpStack(stack)
{
    return {
        type:SET_CONTAINER_DUMPSTACK,
        dumpstack:stack
    };

}

export function changeRoute(path){
    services.Router.route(path);
    return{
        type:changeRoute,
        path:path
    };
}
