/**
 *  Fee Heads module
 *  This code below represent all the actions managed by this modules
 */
import { ACTION_TYPES, API_URLS, MODULE_API_REDUCER } from './consts';
import { ShouldFetch,APIgetFetch,APIputFetch} from 'utils/asyncHelper';


/**
 * Get the information about school.
 *
 * @export
 * @returns {closure}
 */
export function getSchoolInformation() {
    return (dispatch, getState) => {
        let state=getState();
        const data = state.schoolInformation?state.schoolInformation:{};
        if (ShouldFetch(data)) {
            return dispatch(APIgetFetch(API_URLS.resource,ACTION_TYPES.APIget));
        }

    };
}

/**
 * @export
 * @param {Object} data
 * @returns
 */
export function setSchoolInformation(data) {
    return (dispatch)=>{
        dispatch(APIputFetch(API_URLS.resource, ACTION_TYPES.APIset, data));
    };
}
