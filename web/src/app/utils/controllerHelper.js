import controllers from  '../controllers/controllers.js';
import {injectAsyncReducers} from 'services/globalstore';
import * as _ from 'underscore';

/**
 * Create a controller instance based on the controller name
 * @param  {string} name    collection registration news
 * @param  {object} options controller options
 * @return {object}        return the created controller object
 */
export function controllerCtl(name,options){
    var controllerClass=_.propertyOf(controllers)(name);
    //console.log(name+'_router name');
    console.log(name);

    let controllerObject= new controllerClass(options);

    if (controllerObject.reducers){
        injectAsyncReducers(options.store, controllerObject.name,controllerObject.reducers);
    }

    return controllerObject;
}
