/**
 *  STUDY CLASSES ACTIONS
 *  This code below represent all the actions managed by this modules
 */
import {ShouldFetch,APIgetFetch} from 'utils/asyncHelper';
import {URL_CLASSE_LIST,URL_CLASS,URL_LEVEL_CLASSES,URL_CLASS_AGGREGATE}from 'lib/apiUrlconst';
import {API_LIST_STUDYCLASS,API_GET_STUDYCLASS,API_CLASS_AGGREGATE} from './actionTypes';

import {fetchCollection,initCollection} from 'lib/collections/actions';



/**
 * Helper for getting the default collection name of level class group
 * @param {integer} levelId Level Id
 */
export function DEFAULT_LEVELCLASSES_COLL_NAME(levelId){
    return 'levels.'+levelId+'.classes';
}




/*
    Study Classes  Access Actions
 */

export function getStudyClass(classId) {
    return (dispatch, getState) => {
        let state=getState();
        const data = state.studyclasses?state.studyclasses:{};
        let url=URL_CLASS;
        url=url.replace(':id',classId);
        if (ShouldFetch(data, classId)) {
            return dispatch(APIgetFetch(url,API_GET_STUDYCLASS,{classId}));
        };
    };
};



export function getStudyClasses(levelId) {
    return (dispatch, getState) => {

        let state=getState();
        const data = state.studyclasses?state.studyclasses:{};
        let url=URL_CLASSE_LIST;
        url=url.replace(':id',levelId);
        if (ShouldFetch(data, levelId)) {
            return dispatch(APIgetFetch(url,API_LIST_STUDYCLASS,{levelId}));
        }

    };
}



/** List level classes
 * *
 * @param  {integer} levelId [description]
 * @return {string}   Colection name      [description]
 */
export function listLevelClasses(levelId,collectionName){
    return (dispatch) => {
        let url=URL_LEVEL_CLASSES;
        url=url.replace(':id',levelId);
        if (collectionName==undefined){
            collectionName=DEFAULT_LEVELCLASSES_COLL_NAME(levelId);
        }
        dispatch(initCollection(collectionName,url));
        dispatch(fetchCollection(collectionName,url));
    };

}

export function getClassAggregate(classId){
    return (dispatch, getState) => {
        let state = getState();
        const data = state.studyclasses ? state.studyclasses : {};
        let url = URL_CLASS_AGGREGATE;
        url = url.replace(':id', classId);
        if (ShouldFetch(data, classId)) {
            return dispatch(APIgetFetch(url, API_CLASS_AGGREGATE, { classId }));
        }

    };
}