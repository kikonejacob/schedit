/**
 * Reducer for level fees
 */

import {RESTAPI_REQUEST} from 'lib/common/actionTypes';
import {API_GET_LEVEL_FEE,API_SAVE_LEVEL_FEE, API_CREATE_LEVEL_FEE,
      API_DEL_LEVEL_FEES,API_DEL_LEVEL_FEE} from './actionTypes';



const initialState={levelfees:[]};

function levelfees(state=initialState,action)
{
    let isFetching=false;
    let data,extra={};
    switch(action.type){
    case API_GET_LEVEL_FEE:
        isFetching=(action.status==RESTAPI_REQUEST);
        data=(isFetching)? {}: action.data;
        extra=(isFetching)?{} : {lastUpdated:action.receivedAt};
        //retur data
        return Object.assign({}, state,{[action.feecode]:{
            ...state[action.feecode],
            isFetching: isFetching,
            data:data,
            didInvalidate: false,
        }
        });
        break;
    case API_SAVE_LEVEL_FEE:
    case API_CREATE_LEVEL_FEE:
        isFetching=(action.status==RESTAPI_REQUEST);
        data=(isFetching)? {}: action.data;
        extra=(isFetching)?{} : {lastSave:action.savedAt};
        return Object.assign({}, state,{[action.levelId]:{
            ...state[action.levelId],
            isFetching: isFetching,
            didInvalidate: false,
        }
        });
    case API_DEL_LEVEL_FEES:
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

export default {
    levelfees,

};
