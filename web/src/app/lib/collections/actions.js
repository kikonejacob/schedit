import {getCollectionParams} from './collectionHelpers.js';
import {ShouldFetch,APIgetFetchEx,APIdeleteFetch,APIpostFetch,APIputFetch} from 'utils/asyncHelper';
import {FETCH_COLLECTION,INIT_COLLECTION,SET_COLLECTION_OPTIONS,CHANGE_STATE} from './actionTypes';
import * as _ from 'lodash';
import {parseServerState} from './collectionHelpers';
import {QUERY_PARAMS_FROM_SERVER} from './constantes';

function AsyncCollectionActionCreator(actionType,status,options){
    return { type:actionType,
             status:status,
             ...options,
             pagination:parseServerState(options.pagination,QUERY_PARAMS_FROM_SERVER)
    };


}


export function fetchCollection(name,collectionUrl,options={}){

    return (dispatch, getState) => {
        const state=getState().collections[name];
        let params=Object.assign({},_.omit(state,['items','url']),options);
        let url=(collectionUrl==undefined)? state.url:collectionUrl;
        let ajaxParams=getCollectionParams(url,params);

        params={...params,url,collectionName:name};
        if (ShouldFetch(state)) {
            return dispatch(APIgetFetchEx(url,FETCH_COLLECTION,params,
                                        ajaxParams,AsyncCollectionActionCreator));
        }
    };

}

/**
 * Set collection page
 * @param {string} name collection name
 * @param {integer} page Page number
 */
export function setCollectionCurrentPage(name,page){
    return  refreshCollection(name,{currentPage:page});
}


export function initCollection(name,url,options={}){
    //console.log(options)
    //console.log(INIT_COLLECTION);
    return {type:INIT_COLLECTION,
            collectionName:name,
            options,
            url};
}

export function refreshCollection(name,options)
{
    return fetchCollection(name,null,options);
}

export function setCollectionOptions(name,options){
    return {type:SET_COLLECTION_OPTIONS,
            collectionName:name,
            options};
}
