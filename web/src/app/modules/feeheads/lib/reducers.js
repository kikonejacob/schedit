/*import {REQUEST_LEVEL_CLASSES,REQUEST_LEVEL_SUBJECTS,RECEIVE_LEVEL_CLASSES,
        RECEIVE_LEVEL_SUBJECTS,RECEIVE_LEVEL,REQUEST_LEVEL,REQUEST_LEVEL_FEES,RECEIVE_LEVEL_FEES} from './actions.js';
*/
import {RESTAPI_REQUEST} from 'lib/common/actionTypes';
import {API_CREATE_FEE_HEAD,API_SET_FEE_HEAD, API_GET_FEE_HEAD,API_DELETE_FEE_HEAD} from './actionTypes';
import {merge} from 'utils/stateHelper';
import _ from 'lodash';


export default function feeHeads(state={subjects:{}},action)
{
    let isFetching=false;
    let data,extra={};
    switch(action.type){
    case API_GET_FEE_HEAD:
        isFetching=(action.status==RESTAPI_REQUEST);
        data=action.data;
        if (isFetching){
            extra={lastUpdated:action.receivedAt};
        };
        return merge(state)(action.code,{
            isFetching,
            data,
            ...extra,
            didInvalidate: false,
        });
        break;
    case API_CREATE_FEE_HEAD:
        action.group='new-record';
    case API_SET_FEE_HEAD:
        isFetching=(action.status==RESTAPI_REQUEST);
        data= (isFetching) ? {} : action.response.data;
        extra=(isFetching) ? {} : {lastSave:action.savedAt};
        return merge(state)(action.code,{
            isFetching,
            didInvalidate: false,
            data,
            responseInfo:_.omit(action.response,'data')
        });
        break;
    default:
        return state;
    }
}

