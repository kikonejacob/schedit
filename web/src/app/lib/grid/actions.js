/**
 * these actions allows us to interract with reduxgridFormView
 *
 */

import {initCollection,fetchCollection,createRawcollection} from '../collections/actions';
import {urlFormat}  from  'utils/urlHelper';
import {GRID_INIT_CONFIG,GRID_UPDATE_CONFIG} from './actionTypes';
import * as _ from 'lodash';


/**
 * Initilize and Normalize schema column metadata
 * @param  {object} schema   The schema of the list
 * @param  {function} dispatch redux store dispatch function
 * @return {object}          return the Normalized selection
 */
function intializeSelectionOptions(schema,dispatch){
    const listName=schema.name;
    let selections=[]; // Store selections collection name
    if (!schema.columnsMetaData) return ;

    // request les selection options and assign the selections name
    schema.columnsMetaData=schema.columnsMetaData.map(function(column){
        const {selection}=column;
        if (typeof column.selection!='object')return column;
        //console.log(column);
        if (selection){
            const collectionOptions={usePaging:false};
            let collectionName=listName+'-selections-'+column.columnName;
            //console.log(collectionName);
            switch (selection.optionsType) {
            case 'url':
                const url=selection.options;
                dispatch(initCollection(collectionName,url,collectionOptions));
                dispatch(fetchCollection(collectionName,url,null));
                break;
            default:
                dispatch(createRawcollection(selection.options));
                break;

            };
            selections.push(collectionName);
            column.selection.collectionName=collectionName;
            return column;
        }
        else
        return column;
    });


    return selections;

}


export function initGridFromSchema(schema,urlOptions,collectionOption){
    return (dispatch)=>{
        const {name,source,sourceType}=schema;
        let url='';
        if (sourceType=='url')
        {
            url=urlFormat(source,urlOptions);
        }
        const selectionCollectionNames=intializeSelectionOptions(schema,dispatch);
        //console.log(selectionCollectionNames);
        dispatch(initGrid(url,name,{selectionCollectionNames
                                    ,schema,
                                    urlOptions,
                                    collectionOption}));
        return dispatch(fetchCollection(name,url));
    };
}

/**
 * Initilize the Grid component state informations
 * @param  {string} url        source of the grid collection
 * @param  {string} gridName   Grid name
 * @param  {object} options={} grid options
 * @return {object}          Action to be dispatched
 */
export function initGrid(url,gridName,options={}){
    return  (dispatch)=>{
        const collectionOption=(options.collectionOption)?options.collectionOption:{};
        dispatch(initCollection(gridName,url,collectionOption));
        return dispatch({
            type:GRID_INIT_CONFIG,
            gridName,
            url,
            options:_.omit(options,'collectionOption')
        });
    };

}
/**
 * refresh   the Grid component state informations
 * @param  {options} options  to be changed
 * @param  {string} gridName grid name
 * @return {object}          Action to be dispatched
 */
export function refreshGridOptions(options,gridName){
    return { type:GRID_UPDATE_CONFIG,options,gridName};
}
