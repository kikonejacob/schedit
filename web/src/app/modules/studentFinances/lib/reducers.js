import {LIST_STUDENT_TUITIONS,REST_SET_STUDENT,REST_DEL_STUDENT
      ,REST_DEL_STUDENTS,REST_NEW_STUDENT} from './actionTypes.js';
import {RESTAPI_REQUEST} from 'lib/common/actionTypes';

import {merge} from 'utils/stateHelper';


function studentTuitions(state={},action)
{
    let isFetching=false;
    let data,extra={};
    switch(action.type){
    case LIST_STUDENT_TUITIONS:
        isFetching=(action.status==RESTAPI_REQUEST);
        data=(isFetching)? {}: action.data;
        extra=(isFetching)?{} : {lastUpdated:action.receivedAt};
        let arr = Object.keys(data).map(function(k) { return data[k] ;}); //convert json to arrays
        return merge(state,{...arr,isFetching})
        break;
    default:
        return state;
    }
}

export default studentTuitions;
