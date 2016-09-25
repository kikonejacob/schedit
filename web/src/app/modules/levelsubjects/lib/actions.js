import {ShouldFetch,APIgetFetch,APIdeleteFetch,APIpostFetch,APIputFetch} from 'utils/asyncHelper';
import {URL_LEVEL_FEE,URL_LEVEL_FEES}from 'lib/apiUrlconst';
import {API_SAVE_LEVEL_FEE,API_GET_LEVEL_FEE,API_CREATE_LEVEL_FEE,API_LEVEL_FEES
        ,API_DEL_LEVEL_FEE,API_DEL_LEVEL_FEES,GRID_COLLECT_LEVEL_FEE,GRID_CONF_LEVEL_FEE} from './actionTypes.js';


import {fetchCollection,initCollection} from 'lib/collections/actions';


export function DEFAULT_LEVELSUBJECTS_COLL_NAME(levelId){
    return 'levels.'+levelId+'.levelfees';
}

/**
 * list level subjects
 * @param  {int} levelId        [Level id]
 * @param  {string} collectionName [Specify the collection  name. By default null]
 * @return {[type]}                [description]
 */
export function listLevelSubjects(levelId, collectionName) {
    return (dispatch) => {
        let url = API_LEVEL_FEES;
        url = url.replace(':id', levelId);
        if (collectionName == undefined) {
            collectionName = 'level.${levelId}.subjects';
        }
        dispatch(initCollection(collectionName, url));
        dispatch(fetchCollection(collectionName, url));
    };

}
