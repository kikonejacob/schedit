/**
 * Common API reducer factory
 */
import {RESTAPI_REQUEST} from 'lib/common/actionTypes';
import {merge} from 'utils/stateHelper';
import _ from 'lodash';


const DEFAULT_ACTION_TYPES={
    APIget:'API_UNDEFINED',
    APIset:'API_UNDEFINED',
    APIcreate:'API_UNDEFINED',
    APIdelete:'API_UNDEFINED'
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


        let isFetching=false;
        let data,extra={};
        switch(action.type){
        case actionTypes.APIget:
            console.log('OOOOOOOOOOOOOOOOOOO');
            isFetching=(action.status==RESTAPI_REQUEST);
            data=action.data;
            if (isFetching){
                extra={lastUpdated:action.receivedAt};
            };
            return merge(state)(action.resourceId,{
                isFetching,
                data,
                ...extra,
                didInvalidate: false,
            });
            break;
        case actionTypes.APIcreate:
            action.group='new-record';
        case actionTypes.APIset:
            isFetching=(action.status==RESTAPI_REQUEST);
            data= (isFetching) ? {} : action.response.data;
            extra=(isFetching) ? {} : {lastSave:action.savedAt};

            return merge(state)(action.resourceId,{
                isFetching,
                didInvalidate: false,
                data,
                responseInfo:_.omit(action.response,'data')
            });
            break;
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