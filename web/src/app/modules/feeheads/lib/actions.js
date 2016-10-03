/**
 *  STUDY CLASSES ACTIONS
 *  This code below represent all the actions managed by this modules
 */
import {ShouldFetch,APIgetFetch,APIpostFetch,APIputFetch} from 'utils/asyncHelper';
import {URL_FEE_HEADS,URL_FEE_HEAD}from 'lib/apiUrlconst';
import {API_GET_FEE_HEAD,API_SET_FEE_HEAD,API_CREATE_FEE_HEAD} from './actionTypes';



/**
 * Get subject information
 *
 * @export
 * @param {string} subject_code
 * @returns
 */
export function getFeeHead(subjectCode) {
    return (dispatch, getState) => {
        let state=getState();
        const data = state.studyclasses?state.studyclasses:{};
        let url=URL_FEE_HEAD;
        url=url.replace(':code',subjectCode);
        if (ShouldFetch(data, subjectCode)) {
            return dispatch(APIgetFetch(url,API_GET_FEE_HEAD,{subjectCode}));
        };
    };
};
/**
 * 
 * Create a subject.
 * 
 * @export
 * @param {Object} data
 * @returns
 */
export function createFeeHead(data){
    return (dispatch) => {
        let url=URL_FEE_HEADS;
        return dispatch(APIpostFetch(url,API_CREATE_FEE_HEAD,{...data}));
    };

};

export  function checkSubjectCode(feeCode){

}
/**
 *  Set Subject information.
 * 
 * @export
 * @param {string} subjectCode
 * @param {Object} data
 * @returns
 */
export function setSubject(feeCode,data){
    return (dispatch) => {
        let url=URL_FEE_HEAD;
        return dispatch(APIputFetch(url,API_SET_FEE_HEAD,{subject_code:feeCode,...data}));
    };

}

