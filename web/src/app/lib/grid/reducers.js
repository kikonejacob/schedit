import {GRID_FETCH_COLLECTION,GRID_INIT_CONFIG,GRID_UPDATE_CONFIG,CHANGE_STATE} from './actionTypes';
import {merge} from 'utils/stateHelper';

/*let queryParams= {
    currentPage: 'page',
    pageSize: 'per_page',
    totalPages: 'total_pages',
    totalRecords: 'total_entries',
    sortKey: 'sort_by',
    order: 'order',
    directions: {
      "-1": 'asc',
      "1": 'desc'
    }
};*/

const initialPagingState= {
    results: [],
    columns:[],
    /*collectionOptions:{
      'currentPage': 0,
      'totalRecords':0,
      'pageSize':10,
      'totalPages': 0,
      'mode':'server',
      'sortKey':null,
      'direction':-1,
      'queryParams':queryParams,
  },*/
    multiselect:false,
    collectionMgr:null,
    showFilter:true,
    showSettings:false,
    uniqueID:'id'
};

function schGrids(state={},action){
    switch (action.type) {
    /** By default tjje collection name and grid name will be the same when initiating a grid*/
    case GRID_INIT_CONFIG:
        console.log('GRID INIT init');
        //return {...state,[action.gridName]:{.Name);
        return merge(state)(action.gridName,{...initialPagingState,
                                             url:action.url,
                                             collectionName:action.gridName,
                                             ...action.options
                                         } );
        break;
    case GRID_UPDATE_CONFIG:
        //console.log(action);
        return {...state,[action.gridName]:{...state[action.gridName],...action.options} };

    default:
        return state;

    }
}

export default {
    schGrids,

};
