/**
 *  REDUX REDUCER FOR STUDENT ENROLLMENTS
 *  (C) 2016 Kiswendsida  Kikone
 */

import {LIST_STUDENT_TUITIONS,API_GET_ENROLL,API_SET_ENROLL,API_DEL_ENROLL
      ,API_ENROLL} from './actionTypes.js';
import {RESTAPI_REQUEST} from 'lib/common/actionTypes';
import {merge} from 'utils/stateHelper';
import _ from 'lodash';


export default function studentEnrollments(state={},action)
{
    let isFetching=false;
    let data,extra={};
    switch(action.type){
    case API_GET_ENROLL:
        isFetching=(action.status==RESTAPI_REQUEST);
        data=action.data;
        if (isFetching){
            extra={lastUpdated:action.receivedAt};
        };
        return merge(state)(action.enrollId,{
            isFetching,
            data,
            ...extra,
            didInvalidate: false,
        });
        break;
    case API_ENROLL:
        action.enrollId='new-record';
    case API_SET_ENROLL:
        isFetching=(action.status==RESTAPI_REQUEST);
        data= (isFetching) ? {} : action.response.data;
        extra=(isFetching) ? {} : {lastSave:action.savedAt};

        return merge(state)(action.enrollId,{
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
