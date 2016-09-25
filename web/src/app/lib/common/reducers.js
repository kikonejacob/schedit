import {UPDATE_ACTIVE_CONTAINER_INFO,CHANGE_TITLE,
       SET_CONTAINER_DUMPSTACK} from './actionTypes.js';


export function activeContainer(state={activeContainer:{}},action){
    switch(action.type){
    case UPDATE_ACTIVE_CONTAINER_INFO:
        return Object.assign({}, state,{...action.info});
    case CHANGE_TITLE:
        return Object.assign({}, state,{title:action.title});
    case SET_CONTAINER_DUMPSTACK: //Usefull for cases where you want to delete items
        return Object.assign({}, state,{dumpstack:action.dumpstack});
    default:
        return state;
    };



}
