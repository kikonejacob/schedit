import {APIgetFetch,APIputFetch,APIpostFetch,APIdeleteFetch,ShouldFetch} from 'utils/asyncHelper.js';

/**  @todo: Replace and delet APIActions */

/**
 *
 *  Create a "get resource" action creator
 * @export
 * @param {String} reducer  Reducer name
 * @param {Object} actionTypes
 * @param {Object} APIurls
 * @param {string|integer|Date} resource
 * @returns
 */
function GetActionCreator(reducer,actionTypes,APIUrls,resourceId){
    return (dispatch, getState) => {
        let state=getState();
        const data = state[reducer]?state[reducer]:{};
        if (ShouldFetch(data, resourceId)) {
            return dispatch(APIgetFetch(APIUrls.resource(resourceId),actionTypes.APIget,{resourceId}));
        };
    };
}
/**
 *  Create new resource action creator for a define module
 *
 * @export
 * @param {String} reducer
 * @param {Object} actionTypes
 * @param {Object} APIurls
 * @param {Object} data
 * @returns
 */
function NewActionCreator(reducer,actionTypes,APIUrls,data){
    return (dispatch) => {
        return dispatch(APIpostFetch(APIUrls.resources,actionTypes.APIcreate,{...data}));
    };
};

/**
 * Create save resource action creator
 *
 * @export
 * @param {String} reducer
 * @param {Object} actionTypes
 * @param {Object} APIurls
 * @param {Object} data
 * @returns
 */
function SaveActionCreator(reducer,actionTypes,APIUrls,data){
    return (dispatch) => {
        return dispatch(APIputFetch(APIUrls.resource(data.resourceId),actionTypes.APIset,{...data}));
    };
}
/**
 *
 *
 * @export
 * @param {String} reducer
 * @param {Object} actionTypes
 * @param {Object} APIurls
 * @param {Object} resource
 * @returns
 */
function DeleteActionCreator(reducer,actionTypes,APIUrls,resource){
    return (dispatch) => {
        return dispatch(APIdeleteFetch(APIUrls.resource(resource),actionTypes.APIdetele,{resource}));
    };
}

export default {
    DeleteActionCreator,
    SaveActionCreator,
    NewActionCreator,
    GetActionCreator

};