/*import {REQUEST_LEVEL_CLASSES,REQUEST_LEVEL_SUBJECTS,RECEIVE_LEVEL_CLASSES,
        RECEIVE_LEVEL_SUBJECTS,RECEIVE_LEVEL,REQUEST_LEVEL,REQUEST_LEVEL_FEES,RECEIVE_LEVEL_FEES} from './actions.js';
*/
import {RESTAPI_REQUEST} from 'lib/common/actionTypes';
import {API_LEVEL_GET,API_LEVEL_CLASSES, API_LEVEL_SUBJECTS,API_LEVEL_FEES,
        API_LEVEL_DELETE, API_LEVEL_CREATE,API_LEVEL_SAVE} from './actionTypes';

function levelRequests(state={levels:{} },action)
{
    let isFetching=false;
    let data,extra={};
    switch(action.type){
    case API_LEVEL_CLASSES:
        isFetching=(action.status==RESTAPI_REQUEST);
        data=(isFetching)? []: action.data;
        extra=(isFetching)?{} : {lastUpdated:action.receivedAt};
        return Object.assign({}, state, {  [action.levelId]:{
            ...state[action.levelId],
            classes:{   isFetching: isFetching,
                        items:data,
                        didInvalidate: false,
                        ...extra

              }
        }
        });
        break;
    case API_LEVEL_SUBJECTS:
        isFetching=(action.status==RESTAPI_REQUEST);
        data=(isFetching)? [] : action.data;
        extra=(isFetching)?{} : {lastUpdated:action.receivedAt};
        return {...state, ...{[action.levelId]:{
            ...state[action.levelId],
            subjects:{
                isFetching: isFetching,
                didInvalidate: false,
                items:data,
                ...extra

            }}}
        };
        break;

    case API_LEVEL_FEES:
        isFetching=(action.status==RESTAPI_REQUEST);
        data=(isFetching)?[]:action.data ;
        extra=(isFetching)?{} : {lastUpdated:action.receivedAt};
        return Object.assign({}, state,{[action.levelId]:{
            ...state[action.levelId],
            fees:{
                isFetching: isFetching,
                items:data,
                didInvalidate: false,
                ...extra
            }
        }
        });
        break;
    case API_LEVEL_GET:
        isFetching=(action.status==RESTAPI_REQUEST);
        data=(isFetching)? {}: action.data;
        extra=(isFetching)?{} : {lastUpdated:action.receivedAt};
        return Object.assign({}, state,{[action.levelId]:{
            ...state[action.levelId],
            isFetching: isFetching,
            data:data,
            didInvalidate: false,
        }
        });
        break;
    case API_LEVEL_SAVE:
    case API_LEVEL_CREATE:
        isFetching=(action.status==RESTAPI_REQUEST);
        data=(isFetching)? {}: action.data;
        extra=(isFetching)?{} : {lastSave:action.savedAt};
        return Object.assign({}, state,{[action.levelId]:{
            ...state[action.levelId],
            isFetching: isFetching,
            didInvalidate: false,
        }
        });
    case API_LEVEL_DELETE:
        isFetching=(action.status==RESTAPI_REQUEST);
        if (isFetching)
        {
            console.log(action);
            return Object.assign({}, state,{[action.levelId]:{
                ...state[action.levelId],
                isFetching: true,
                didInvalidate: false,
            }
            });
        }
        else {
            //console.log(state.isArray());
            let index=4;//state.indexOf(action.levelId);
            return {...state.slice(0,index),...state.slice(index+1)};
        }

    default:
        return state;

    }
}

function levels(state={},action){
    return levelRequests(state,action);
}

export default {
    levels

};
