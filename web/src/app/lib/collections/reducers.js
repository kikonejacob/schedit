import {merge} from 'utils/stateHelper';
import {FETCH_COLLECTION,INIT_COLLECTION,SET_COLLECTION_OPTIONS,CHANGE_STATE} from './actionTypes';
import {parseServerState} from './collectionHelpers';
import {RESTAPI_REQUEST} from 'lib/common/actionTypes';
import {QUERY_PARAMS} from './constantes';
import * as _ from 'lodash';

/*
const  collectionOptions={
    'currentPage': 1,
    'totalRecords':0,
    'pageSize':15,
    'totalPages': 0,
    'mode':'server',
    'sortKey':null,
    'direction':-1,
    'queryParams':queryParams,
};*/

const initialCollection={
    items:[],
    url:'',
    query:'',
    usePaging:true,
    pageSize:15,
    totalPages:0,
    currentPage:1,
    totalRecords:0,
    isFetching:false,
    mode:'server',
    sortKey:null,
    direction:-1,
    autoRefresh:true
};
/**
 * Represent the collections reducers
 * @param  {Object} state={} [description]
 * @param  {Object} action   [description]
 * @return {void}          [description]
 */
function collections(state={},action){
    switch(action.type)
    {
    case INIT_COLLECTION:
    case SET_COLLECTION_OPTIONS:
    case FETCH_COLLECTION:

        return {...state,[action.collectionName]:Object.freeze(collection(state[action.collectionName],action))};
        break;
    default:
        return state;
    }
}

function collection(state={},action){
    let isFetching=false;
    switch(action.type)
    {
    case INIT_COLLECTION:

        return {...state,...initialCollection,url:action.url,collectionName:action.collectionName,...action.options};
    case SET_COLLECTION_OPTIONS:{

        return {...state, options:{...state.options,...action.Options}};
    }
    case FETCH_COLLECTION:
        //console.log(action.collectionName);
        isFetching=(action.status==RESTAPI_REQUEST);
        if ((isFetching) || (action.status==CHANGE_STATE)){
            return {...state,isFetching};
        }
        else {
            const response=action.data;
            const paginationFromServer=state.usePaging?action.pagination:{};
            //console.log(paginationFromServer);
            //let serverState=parseServerState(response,QUERY_PARAMS);
            Object.freeze(response);
            return {...state,...paginationFromServer,items:response, isFetching};
        };
        break;
    default:
        return state;
    }
}
export default collections;
