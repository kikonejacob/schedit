/**
 *  REDUX REDUCER FOR STUDENT FEES REDUCTIONS
 *  (C) 2016 Kiswendsida  Kikone
 */

import {API_GET_REDUCTION_INFO,API_SET_REDUCTION_INFO,API_CREATE_REDUCTION} from './actionTypes.js';
import {RESTAPI_REQUEST} from 'lib/common/actionTypes';
import {merge} from 'utils/stateHelper';
import _ from 'lodash';


export default function studentReductions(state={},action)
{
    let isFetching=false;
    let data,extra={};
    switch(action.type){
    case API_GET_REDUCTION_INFO:
        isFetching=(action.status==RESTAPI_REQUEST);
        data=action.data;
        if (isFetching){
            extra={lastUpdated:action.receivedAt};
        };
        return merge(state)(action.reductionId,{
            isFetching,
            data,
            ...extra,
            didInvalidate: false,
        });
        break;
    case API_CREATE_REDUCTION:
        action.reductionId='new-record';
    case API_SET_REDUCTION_INFO:
        isFetching=(action.status==RESTAPI_REQUEST);
        data= (isFetching) ? {} : action.response.data;
        extra=(isFetching) ? {} : {lastSave:action.savedAt};

        return merge(state)(action.reductionId,{
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
