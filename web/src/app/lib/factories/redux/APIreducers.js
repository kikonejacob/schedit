/**
 * Common API reducer factory
 */
import {RESTAPI_REQUEST} from 'lib/common/actionTypes';
import {merge} from 'utils/stateHelper';
import _ from 'lodash';


const DEFAULT_ACTION_TYPES={
    APIgetRequest    : 'API_UNDEFINED',
    APIgetSuccess    : 'API_UNDEFINED',
    APIsetRequest    : 'API_UNDEFINED',
    APIsetSuccess    : 'API_UNDEFINED',
    APIcreateRequest : 'API_UNDEFINED',
    APIcreateSucess  : 'API_UNDEFINED',
    APIdeleteRequest : 'API_UNDEFINED',
    APIdeleteSucess  : 'API_UNDEFINED'
};

/**
 * Generate a generic Api Reducer for getting saving and deleting resource
 *
 * @export
 * @param {any} reducerName
 * @returns
 */
export function generateApiReducer(types)
{
    const actionTypes={...DEFAULT_ACTION_TYPES,...types};

    return (state={},action)=>{

        switch(action.type){
        case actionTypes.APIgetSuccess:
            return merge(state)(action.resourceId,{
                isFetching:false,
                data:action.data,
                lastUpdated:action.receivedAt,
            });

        case actionTypes.APIgetRequest:
            return merge(state)(action.resourceId,{isFetching:true});

        case actionTypes.APIcreateRequest:
        case actionTypes.APIsetRequest:
            return merge(state,action.resourceId,{isFetching:true});

        case actionTypes.APIsetSuccess:
        case actionTypes.APIcreateSucess:
            return merge(state)(action.resourceId,{
                isFetching:false,
                data:action.response.data,
                responseInfo:_.omit(action.response,'data'),
                lastSaved:action.savedAt,
            });
        case actionTypes.APIdelete:
            /** @todo add delete case Fix*/
            break;
        default:
            return state;
        }
    };
}



/**
 * Creating a reducer
 *
 * student=generateApiReducer('student');
 *
 * Model of action
 * {
 *   type:API_GET,
 *   reducer:"student"
 * }
 */