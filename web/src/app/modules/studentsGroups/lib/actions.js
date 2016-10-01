import {API_GET_GROUP,API_SET_GROUP,
       API_CREATE_GROUP,API_CREATE_GROUP_MEMBERSHIP} from './actionTypes.js';

import {APIgetFetch,ShouldFetch,APIpostFetch,APIputFetch,
        APIdeleteFetch} from 'utils/asyncHelper';
import {URL_STUDENTGROUP,URL_STUDENTGROUPS,
       URL_STUDENTGROUP_MEMBERSHIP} from 'lib/apiUrlconst';




/**
 * Get Group information
 *
 * @export
 * @param {string} group
 * @returns
 */
export function getGroupInfo(group) {
    return (dispatch, getState) => {
        let state=getState();
        const data = state.studentGroups[group]?state.studentGroups[group]:[];
        let url=String(URL_STUDENTGROUP).replace(':code',group);
        if (ShouldFetch(data, group)) {
            return dispatch(APIgetFetch(url,API_GET_GROUP,{group}));
        }
    };
}

/**
 *
 * Update Group Information.
 * @export
 * @param {string} group
 * @param {Object} data
 * @returns
 */
export function updateGroupInfo(group,data){
    return (dispatch) => {
        let url=String(URL_STUDENTGROUP).replace(':code',group);
        return dispatch(APIputFetch(url,API_SET_GROUP,{group,...data}));
    };

};

/**
 *  Create group
 *
 * @export
 * @param {string code
 * @param {Object} data
 * @returns
 */
export function createGroup(code,data){
    return (dispatch) => {
        let url=URL_STUDENTGROUPS;
        return dispatch(APIpostFetch(url,API_CREATE_GROUP,{code:-1,...data}));
    };

};

/**
 *  Set Group membership
 *
 * @export
 * @param {string} studentId The student
 * @param {Object} group The group to which we want add the student
 * @returns
 */
export function setMembership(studentId,group){
    return (dispatch) => {
        let url=String(URL_STUDENTGROUP_MEMBERSHIP).replace(':code',group);
        return dispatch(APIpostFetch(url,API_CREATE_GROUP_MEMBERSHIP,{studentId,group}));
    };
}
