import {URL_BRANCHES}from 'lib/apiUrlconst';
import {initGrid} from 'lib/grid/actions';
import {fetchCollection,initCollection} from 'lib/collections/actions';


export function DEFAULT_BRANCH_COLL_NAME(){
    return 'branches';
}


/**
 * list study levels
 * @return function               Async action function
 */
export function listBranches(collectionName){
    const collection=(collectionName)?collectionName:DEFAULT_BRANCH_COLL_NAME();
    return (dispatch) => {
        let url=URL_BRANCHES;
        dispatch(initCollection(collection,url));
        return dispatch(fetchCollection(collection,url));
    };

}
