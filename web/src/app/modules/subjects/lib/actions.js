/**
 *  STUDY CLASSES ACTIONS
 *  This code below represent all the actions managed by this modules
 */
import {ShouldFetch,APIgetFetch,APIpostFetch,APIputFetch} from 'utils/asyncHelper';
import {URL_SUBJECTS,URL_SUBJECT}from 'lib/apiUrlconst';
import {API_GET_SUBJECT,API_SET_SUBJECT,API_CREATE_SUBJECT} from './actionTypes';



/**
 * Get subject information
 *
 * @export
 * @param {string} subject_code
 * @returns
 */
export function getSubject(subjectCode) {
    return (dispatch, getState) => {
        let state=getState();
        const data = state.studyclasses?state.studyclasses:{};
        let url=URL_SUBJECT;
        url=url.replace(':code',subjectCode);
        if (ShouldFetch(data, subjectCode)) {
            return dispatch(APIgetFetch(url,API_GET_SUBJECT,{subjectCode}));
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
export function createSubject(data){
    return (dispatch) => {
        let url=URL_SUBJECTS;
        return dispatch(APIpostFetch(url,API_CREATE_SUBJECT,{...data}));
    };

};
/**
 *
 *
 * @export
 * @param {string} subjectCode
 */
export  function checkSubjectCode(subjectCode){

}
/**
 *  Set Subject information.
 *
 * @export
 * @param {string} subjectCode
 * @param {Object} data
 * @returns
 */
export function setSubject(subjectCode,data){
    return (dispatch) => {
        let url=URL_SUBJECT;
        return dispatch(APIputFetch(url,API_SET_SUBJECT,{subject_code:subjectCode,...data}));
    };

}

