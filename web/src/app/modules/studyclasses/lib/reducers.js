/**
 * Reducer for study classes actions
 * (c) 2016 Kiswendsida Kikone
 */
import {RESTAPI_REQUEST} from 'lib/common/actionTypes';
import {API_LIST_STUDYCLASS,API_GET_STUDYCLASS,API_SAVE_STUDYCLASS,
       API_CREATE_STUDYCLASS,API_DELETE_STUDYCLASS,API_CLASS_AGGREGATE} from './actionTypes.js';
import {merge} from 'utils/stateHelper';

const intialState={};

export default function studyclasses (state=intialState,action)
{
    let isFetching=false;
    let data,extra={};
    switch(action.type)
    {
    case API_GET_STUDYCLASS:
        isFetching=(action.status==RESTAPI_REQUEST);
        data=action.data||{};
        extra=(isFetching)?{}:{lastUpdated:action.receivedAt};
        return merge(state)(action.classId,{
            isFetching,
            data,
            ...extra,
            didInvalidate: false,
        });
        break;
    case API_CLASS_AGGREGATE:
        isFetching=(action.status==RESTAPI_REQUEST);
        data=action.data||{};
        extra=(isFetching)?{}:{lastUpdated:action.receivedAt};
        return merge(state)(action.classId,{
            isFetching,
            aggregate:data,
            ...extra,
            didInvalidate: false,
        });
        break;
    case API_SAVE_STUDYCLASS:
    case API_CREATE_STUDYCLASS:
        isFetching=(action.status==RESTAPI_REQUEST);
        data=action.data||{};
        extra=(isFetching)?{}:{lastSave:action.savedAt};
        return merge(state)(action.classId,{
            isFetching: isFetching,
            ...extra,
            didInvalidate: false,});
        /*return Object.assign({}, state,{[action.levelId]:{
            ...state[action.levelId],
            isFetching: isFetching,
            extra,
            didInvalidate: false,}
        });*/
    case API_DELETE_STUDYCLASS:
        isFetching=(action.status==RESTAPI_REQUEST);
        if (isFetching)
        {
            return Object.assign({}, state,{[action.classId]:{
                ...state[action.classId],
                isFetching: true,
                didInvalidate: false,
            }
            });
        }
        else {
            let index=state.indexOf(action.levelId);
            return {...state.slice(0,index),...state.slice(index+1)};
        }

    default:
        return state;

    }
}
