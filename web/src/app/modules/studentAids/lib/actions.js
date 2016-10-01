import {API_GET_REDUCTION_INFO,API_SET_REDUCTION_INFO,API_CREATE_REDUCTION} from './actionTypes.js';

import {APIgetFetch,ShouldFetch,APIpostFetch,APIputFetch,
        APIdeleteFetch} from 'utils/asyncHelper';
import {URL_REDUCTION,URL_REDUCTIONS} from 'lib/apiUrlconst';
import {initGrid} from 'lib/grid/actions';
import {fetchCollection} from 'lib/collections/actions';





/**
 * Get a reduction information
 *
 * @export
 * @param {integer} reductionId
 * @returns {function} Action creator
 */
export function getReductionInfo(reductionId) {
    return (dispatch, getState) => {
        let state=getState();
        const data = state.studentReductions[reductionId]?state.studentReductions[reductionId]:[];
        let url=String(URL_REDUCTION).replace(':id',reductionId);
        if (ShouldFetch(data, reductionId)) {
            return dispatch(APIgetFetch(url,API_GET_REDUCTION_INFO,{reductionId}));
        }
    };
}

/**
 *  Update a reduction information
 *
 * @export
 * @param {integer} reductionId
 * @param {Object} data
 * @returns {function}
 */
export function updateReductionInfo(reductionId,data){
    return (dispatch) => {
        let url=String(URL_REDUCTION).replace(':id',reductionId);
        return dispatch(APIputFetch(url,API_SET_REDUCTION_INFO,{reductionId,...data}));
    };

};

/**
 *  Create student reduction
 *
 * @export
 * @param {integer} reductionId
 * @param {Object} data
 * @returns
 */
export function createReductionForStudent(reductionId,data){
    return (dispatch) => {
        let url=URL_REDUCTIONS;
        return dispatch(APIpostFetch(url,API_CREATE_REDUCTION,{reductionId:-1,...data}));
    };

};

/**
 *  Create a Reduction
 *
 * @export
 * @param {integer} reductionId
 * @param {Object} data
 * @returns
 */
export function createReduction(reductionId,data){
    return (dispatch) => {
        let url=URL_REDUCTIONS;
        return dispatch(APIpostFetch(url,API_CREATE_REDUCTION,{reductionId:-1,...data}));
    };

};
