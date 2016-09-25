/**
 *  REDUX REDUCER FOR STUDENTGROUPS
 *  (C) 2016 Kiswendsida  Kikone
 */

import {API_GET_GROUP,API_SET_GROUP,API_CREATE_GROUP,API_CREATE_GROUP_MEMBERSHIP} from './actionTypes.js';import {RESTAPI_REQUEST} from 'lib/common/actionTypes';
import {merge} from 'utils/stateHelper';
import _ from 'lodash';


export default function studentGroups(state={},action)
{
    let isFetching=false;
    let data,extra={};
    switch(action.type){
    case API_GET_GROUP:
        isFetching=(action.status==RESTAPI_REQUEST);
        data=action.data;
        if (isFetching){
            extra={lastUpdated:action.receivedAt};
        };
        return merge(state)(action.group,{
            isFetching,
            data,
            ...extra,
            didInvalidate: false,
        });
        break;
    case API_CREATE_GROUP:
        action.group='new-record';
    case API_SET_GROUP:
        isFetching=(action.status==RESTAPI_REQUEST);
        data= (isFetching) ? {} : action.response.data;
        extra=(isFetching) ? {} : {lastSave:action.savedAt};

        return merge(state)(action.group,{
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
