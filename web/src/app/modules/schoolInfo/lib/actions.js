import {ShouldFetch,APIgetFetch,APIpostFetch} from 'utils/asyncHelper';
import {URL_SCHOOL_INFORMATION} from 'lib/apiUrlconst';
import {API_GET_SCHOOL_INFORMATION,API_SET_SCHOOLINFORMATION} from './const';






/**
 * Get the information about school.
 *
 * @export
 * @returns {closure}
 */
export function GetSchoolInformation() {
    return (dispatch, getState) => {
        let state=getState();
        const data = state.schoolInformation?state.schoolInformation:{};
        if (ShouldFetch(data)) {
            return dispatch(APIgetFetch(URL_SCHOOL_INFORMATION,API_GET_SCHOOL_INFORMATION));
        }

    };
}
/**
 * Set school information.
 *
 * @export
 * @param {object} data
 * @returns {closure}
 */
export function SetSchoolInformation(data){
    return (dispatch) => {
        return dispatch(APIpostFetch(URL_SCHOOL_INFORMATION,API_SET_SCHOOLINFORMATION,data));
    };

};


function dfd(){
    SetSchoolInformation('dfdfdfddfdfd');
}