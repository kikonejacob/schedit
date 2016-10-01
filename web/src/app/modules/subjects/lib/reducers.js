/*import {REQUEST_LEVEL_CLASSES,REQUEST_LEVEL_SUBJECTS,RECEIVE_LEVEL_CLASSES,
        RECEIVE_LEVEL_SUBJECTS,RECEIVE_LEVEL,REQUEST_LEVEL,REQUEST_LEVEL_FEES,RECEIVE_LEVEL_FEES} from './actions.js';
*/
import {RESTAPI_REQUEST} from 'lib/common/actionTypes';
import {API_CREATE_SUBJECT,API_SET_SUBJECT, API_GET_SUBJECT,API_DELETE_SUBJECT} from './actionTypes';
import {merge} from 'utils/stateHelper';
import _ from 'lodash';


export default function subjects(state={subjects:{}},action)
{
    let isFetching=false;
    let data,extra={};
    switch(action.type){
    case API_GET_SUBJECT:
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
    case API_CREATE_SUBJECT:
        action.group='new-record';
    case API_SET_SUBJECT:
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

