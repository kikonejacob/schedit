

import { combineReducers } from 'redux';
import globalReducers from './reducers';
import {mapControllers} from 'utils/controllerHelper';





/**
 * Create reducers based on globalReducers and registered controller reducers
 *
 * @export
 * @param {any} asyncReducers
 * @returns
 */
export default function createReducer(asyncReducers) {

    return combineReducers({
        ...globalReducers,
        ...asyncReducers,
        ...loadControllerReducers()
    });
}

/**
 *  Load all the reducers from controller when they are registered
 * The controller class should declare it reducers in this format:
 *  static reducers(){
 *     return {reducers}
 * }
 *
 * @export
 */
export function loadControllerReducers(){
    var controllerReducers={};
    mapControllers(function(controller){
        if (typeof controller.reducers=='function'){
            let reducers=controller.reducers();
            controllerReducers={...controllerReducers,...reducers};
        }


    });
    return controllerReducers;

}