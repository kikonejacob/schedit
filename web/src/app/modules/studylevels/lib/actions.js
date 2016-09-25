import {ShouldFetch,APIgetFetch,APIdeleteFetch,APIpostFetch,APIputFetch} from 'utils/asyncHelper';
import {URL_LEVEL_CLASSES,URL_LEVEL_SUBJECTS,
        URL_LEVEL,URL_LEVEL_LIST,URL_LEVEL_FEES,}from 'lib/apiUrlconst';
import {setLocalContainerDumpStack} from 'lib/common/actions';

import {API_LEVEL_GET,API_LEVEL_CLASSES,
        API_LEVEL_SUBJECTS,API_LEVEL_FEES,API_LEVEL_DELETE,
        API_LEVEL_CREATE,API_LEVEL_SAVE} from './actionTypes.js';


import {initGrid} from 'lib/grid/actions';
import {fetchCollection,initCollection} from 'lib/collections/actions';


export function DEFAULT_LEVEL_COLL_NAME(){
    return 'levels';
}


/**
 * list study levels
 * @return function               Async action function
 */
export function listLevels(collectionName){
    const collection=(collectionName)?collectionName:DEFAULT_LEVEL_COLL_NAME();

    return (dispatch) => {
        let url=URL_LEVEL_LIST;
        if (collectionName==undefined){
            collectionName=DEFAULT_LEVEL_COLL_NAME();
        }
        dispatch(initCollection(collection,url));
        return dispatch(fetchCollection(collection,url));
    };

}

/**
 * TODO: remove classesGet, feesGet,subjectsGet
 */

/*
    Study Classes  Access Actions
 */
export function classesGet(levelId) {
    return (dispatch, getState) => {

        let state=getState();
        const data = state.levels[levelId]?state.levels[levelId].classes:{};
        let url=URL_LEVEL_CLASSES;
        url=url.replace(':id',levelId);
        if (ShouldFetch(data, levelId)) {
            return dispatch(APIgetFetch(url,API_LEVEL_CLASSES,{levelId}));
        }

    };
}

/*
  Action for Api Subject data request
 */
export function subjectsGet(levelId) {
    return (dispatch, getState) => {
        let state=getState();
        const data = state.levels[levelId]?state.levels[levelId].subjects:{};
        let url=URL_LEVEL_SUBJECTS;
        url=url.replace(':id',levelId);
        console.log(url);
        if (ShouldFetch(data, levelId)) {
            return dispatch(APIgetFetch(url,API_LEVEL_SUBJECTS,{levelId}));
        }

    };
}

/*
    Study fees  Access Actions
 */
export function feesGet(levelId) {
    return (dispatch, getState) => {
        let state=getState();
        const data =(state.levels[levelId])?state.levels[levelId].fees:{};
        let url=URL_LEVEL_FEES;
        url=url.replace(':id',levelId);
        if (ShouldFetch(data, levelId)) {
            return dispatch(APIgetFetch(url,API_LEVEL_FEES,{levelId}));
        }

    };
}


/*
  level information action
 */
export function levelGet(levelId) {
    return (dispatch, getState) => {
        let state=getState();
        const data =state.levels?state.levels[levelId]:{};
        let url=String(URL_LEVEL).replace(':id',levelId);
        if (ShouldFetch(data, levelId)) {
            return dispatch(APIgetFetch(url,API_LEVEL_GET,{levelId:levelId}));
        }

    };
}

export function levelSave(levelId,data){
    return (dispatch) => {
        let url=String(URL_LEVEL).replace(':id',levelId);
        return dispatch(APIputFetch(url,API_LEVEL_SAVE,{levelId,...data}));
    };

};
export function levelCreate(data){
    return (dispatch) => {
        let url=URL_LEVEL_LIST;
        return dispatch(APIpostFetch(url,API_LEVEL_CREATE,{levelId:-1,...data}));
    };

};

export function levelDelete(levelIds){
    return (dispatch) => {
        let url=URL_LEVEL_LIST;
        return dispatch(APIdeleteFetch(url,API_LEVEL_DELETE,{...levelIds}));
    };

};


export function updateSelectedIds(level)
{
    return setLocalContainerDumpStack(level);

}
