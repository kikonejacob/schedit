import { get,post } from 'utils/http';
import {ShouldFetch,APIgetFetch} from 'utils/asyncHelper';
import {URL_SCHOOLINFO} from 'lib/apiUrlConst';


export const API_SCHOOLINFO = 'API_SCHOOLINFO';
export const API_LEVEL_FEES = 'REQUEST_FEES';
export const API_LEVEL_SUBJECTS = 'REQUEST_SUBJECTS';
export const API_LEVEL = 'REQUEST_LEVEL';


export const RESTAPI_RECEIVE='RECEIVE';
export const RESTAPI_REQUEST='REQUEST';






export function schoolInfoGet(levelId) {
    return (dispatch, getState) => {

        let state=getState();
        const data = state.levels[levelId]?state.levels[levelId].classes:{};
        let url=URL_CLASSE;
        url=url.replace(':id',levelId);
        if (ShouldFetch(data, levelId)) {
            return dispatch(APIgetFetch(url,levelId,
                                         schoolInfoRequest,
                                         SchoolInfoSuccess,
                                         null));
        }

    };
}

/*
  Action for Api Subject data request
 */

function subjectsRequest(levelId){
    return {
        type: RESTAPI_REQUEST,
        target:API_LEVEL_SUBJECTS,
        levelId
    };

}

function subjectsSuccess(levelId, json) {
    return {
        type: RESTAPI_RECEIVE,
        target:API_LEVEL_SUBJECTS,
        levelId,
        data: json.data,
        receivedAt: Date.now()
    };
}

export function subjectsGet(levelId) {
    return (dispatch, getState) => {
        let state=getState();
        const data = state.levels[levelId]?state.levels[levelId].subjects:{};
        let url=URL_SUBJECTS;
        url=url.replace(':id',levelId);
        console.log(url);
        if (ShouldFetch(data, levelId)) {
            return dispatch(APIgetFetch(url,levelId,
                                         subjectsRequest,
                                         subjectsSuccess,
                                         null));
        }

    };
}

/*
  level information action
 */

function levelRequest(levelId){
    return {
        type:RESTAPI_REQUEST,
        target: API_LEVEL,
        levelId
    };

}

function levelSuccess(levelId, json) {
    return {
        type: RESTAPI_RECEIVE,
        target:API_LEVEL,
        levelId,
        data: json.data,
        receivedAt: Date.now()
    };
}

export function levelGet(levelId) {
    return (dispatch, getState) => {
        let state=getState();
        const data =state.levels?state.levels[levelId]:{};

        let url=URL_LEVEL;
        url=url.replace(':id',levelId);

        if (ShouldFetch(data, levelId)) {
            return dispatch(APIgetFetch(url,levelId,
                                         levelRequest,
                                         levelSuccess,
                                         null));
        }

    };
}

/*
    Study fees  Access Actions
 */

function feesRequest(levelId){
    return {
        type: RESTAPI_REQUEST,
        target:API_LEVEL_FEES,
        levelId
    };

}

function feesSuccess(levelId, json) {
    return {
        type: RESTAPI_RECEIVE,
        target:API_LEVEL_FEES,
        levelId,
        data: json.data,
        receivedAt: Date.now()
    };
}



export function feesGet(levelId) {
    return (dispatch, getState) => {

        let state=getState();
        const data =state.levels[levelId]?state.levels[levelId].fees:{};
        let url=URL_FEES;
        url=url.replace(':id',levelId);
        if (ShouldFetch(data, levelId)) {
            return dispatch(APIgetFetch(url,levelId,
                                         feesRequest,
                                         feesSuccess,
                                         null));
        }

    };
}