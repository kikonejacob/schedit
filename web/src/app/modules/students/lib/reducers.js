import {REST_GET_STUDENT,REST_SET_STUDENT,REST_DEL_STUDENT
      ,REST_DEL_STUDENTS,REST_NEW_STUDENT} from './actionTypes.js';
import {RESTAPI_REQUEST} from 'lib/common/actionTypes';

import {merge} from 'utils/stateHelper';
/*
function $u(state)
{
    function merge(value){
        if (typeof value=='object')
            return Object.assign({}, state,...value);
    }
    function select(value){
          function merge(element){
                return Object.assign({}, state,{[action.levelId]:{
                    ...state[action.levelId],
                    isFetching: true,
                    didInvalidate: false,
                }
                });
            }
            return {merge:merge(element)}

    return {
        merge:merge(state,option),
        select:select(value)
    }

}*/

function students(state={},action)
{
    let isFetching=false;
    let data,extra={};
    switch(action.type){
    case REST_GET_STUDENT:
        isFetching=(action.status==RESTAPI_REQUEST);
        data=(isFetching)? {}: action.data;
        extra=(isFetching)?{} : {lastUpdated:action.receivedAt};
        /*console.log('PPPPPP');
        console.log(merge(state)(action.studentId,{
            isFetching,
            data,
            didInvalidate: false,
        }));*/
        return merge(state)(action.studentId,{
            isFetching,
            data,
            didInvalidate: false,
        });
    case REST_SET_STUDENT:
    case REST_NEW_STUDENT:
        isFetching=(action.status==RESTAPI_REQUEST);
        data=(isFetching)? {}: action.data;
        extra=(isFetching)?{} : {lastSave:action.savedAt};
        return merge(state)(action.studentId,{
            isFetching,
            didInvalidate: false,
        });
    default:
        return state;
    }
}

export default students;
