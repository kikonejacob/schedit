/**
 * list grid:
 * react container for displaying a grid list of level fees:
 * schema: [fee_code,amount]
 * (c) 2016 kikone kiswendida
 */

import GridView,{getGridCustomComponent,
                 COLLECTION_SORT,
                 COLLECTION_FETCH,
                 COLLECTION_FILTER,
                 COLLECTION_SET_PAGE,
                 COLLECTION_SETPAGE_SIZE} from 'components/gridFormView/reduxgridFormView';
import React from 'react';
import Header from 'components/ModuleHeaderView/ModuleHeaderView';
import Button from 'components/LinkComponent/LinkButtonView';
import {refreshCollection} from 'lib/collections/actions';
import {urlFormat}  from  'utils/urlHelper';
import { connect } from 'react-redux';
import SearchForm from 'components/listForm/SearchForm';


const BT_CANCEL='Cancel';

/**
 * Create an item for search schema form
 * @param  {[type]} meta       [description]
 * @param  {[type]} selections [description]
 * @return {[type]}            [description]
 */
function createListSearchSchemaItem(meta,selections){
    let options;
    let type=meta.type;
    let placeholder=meta.displayName;

    if (typeof meta.selection=='object'){
        options=selections[meta.selection.collectionName];
        if (meta.selection.selectionFields){
            options=options.map((option)=>{
                let fields=meta.selection.selectionFields;
                return {
                    val:option[fields.value],
                    label:option[fields.caption]
                };
            });
            placeholder=meta.selection.placeholder;
        };
        type='Select';
    };
    return{
        title:meta.displayName,
        type,
        placeholder,
        options
    };


};



class List extends React.Component{
    constructor(props) {
        super(props);
    }
    collectionMgr(cmd,options){
        switch (cmd) {
        case COLLECTION_FETCH:
        case COLLECTION_SORT:
        case COLLECTION_FILTER:
        case COLLECTION_SET_PAGE:
        case COLLECTION_SETPAGE_SIZE:
            this.props.dispatch(refreshCollection(this.gridName,options));
            break;
        default:

        }
    }
    handleActions(e,action){
        this.handleListActions(action);
    }
    /**
     * Handle list default action and differt others actions to
     * @param  {[type]} action   [description]
     * @param  {[type]} options  [description]
     * @return {[type]}          [description]
     */
    handleListActions(action,options){
        const {dispatch,refreshGridOptions}=this.props;
        switch (action) {
        case 'multiselect':
            dispatch(refreshGridOptions({multiselect:true,selectedRowIds:[]},this.gridName));
            break;
        case 'advancedSearch':
            dispatch(refreshGridOptions({advancedSearch:true},this.gridName));
            break;
        case 'runAdvancedSearch':
            console.log(options);
            dispatch(refreshCollection(this.gridName,{query:options}));
            //dispatch(refreshGridOptions({advancedSearch:true},this.gridName));
            break;
        case 'CancelAdvancedSearch':
            dispatch(refreshGridOptions({advancedSearch:false},this.gridName));
            break;
        case 'cancel_multiselect':
            dispatch(refreshGridOptions({multiselect:false},this.gridName));
            break;
        default:
            //For  action differents than those above
            let selectedRowIds=this.refs.gridlist.refs.SchGrid.state.selectedRowIds;
            console.log(selectedRowIds);
            if (this.props.onAction!=null)
            {
                this.props.onAction(action,selectedRowIds,this.props.dispatch);
            };

        }
    }
    processSchema(){

        const {selections,schema,urlOptions}=this.props;
        const {filter,target,targetType}=schema;

        let SearchSchema={schema:{}};
        this.gridName=schema.name;
        if (selections.length==0) return;
        //Process the columns MetaData
        let columnsMetaData=schema.columnsMetaData.map(function(meta){
            if (typeof meta.customComponent=='string')
            {
                meta.customComponent=getGridCustomComponent(meta.customComponent);
            }
            //Normalize link
            if (meta.partialLink=='{target}'){
                console.log('Partial Link');
                meta.partialLink=urlFormat(target,urlOptions);
            }
            else
            if (meta.partialLink)
                meta.partialLink=urlFormat(meta.partialLink,urlOptions);
            //Create a search Form schema for the specific column if exist
            if (filter){
                if (filter.advancedFilterField)
                    if (filter.advancedFilterField.indexOf(meta.columnName)>-1){
                        let searchItem=meta.columnName;
                        //console.log(filter);
                        if ((meta.selection)&&(meta.selection.reference))
                            searchItem=meta.selection.reference;
                        SearchSchema.schema[searchItem]=createListSearchSchemaItem(meta,selections);
                    }
            }
            return meta;
        });
        this.SearchSchema=SearchSchema;
        this.columnsMetaData=columnsMetaData;
        //console.log(this.SearchSchema);
    }

    render(){



        let {schema}=this.props;
        let header;
        //processing the schema
        this.processSchema();
        let buttons=schema.buttons;
        let {description}=schema;
        //Processing buttons
        let actionHandler=this.handleActions.bind(this);
        let i=0;
        if (this.props.advancedSearch){
            header=(<div className="panel panel-default">
                        <div className="panel-body">
                            <SearchForm schema={this.SearchSchema}
                                        onAction={this.handleListActions.bind(this)}
                                        dispatch={this.props.dispatch}
                            />
                        </div>
                    </div>);
        }
        else
        if ((this.props.multiselect) && (buttons.multiselect))
        {
            header=(<Header  description={description}>
                {buttons.multiselect.map((button)=>{
                    return (<Button link='#'
                             onLinkAction={actionHandler}
                             action={button.action}
                             key={`button.${i++}`}>
                                    {button.caption}
                            </Button>);
                })}
            <Button link='#'
                onLinkAction={this.handleActions.bind(this)}
                action='cancel_multiselect'>
                    {BT_CANCEL}
            </Button>
            </Header>);
        }
        else
        if (buttons.default){
            header= (<Header description={description}>
                {buttons.default.map((button)=>{
                    return (<Button link='#'
                             onLinkAction={actionHandler}
                             action={button.action}
                             key={`button.${i++}`}
                            >
                              {button.caption}
                            </Button>);

                })}
             </Header>);
        }
        else {
            header=(<Header description={description}/>);
        }

        /*if (this.props.isFetching){
            return (<div>
                       {header}
                      <ProgressDialog> Please wait ....</ProgressDialog>
                    </div>);
        };*/




        return(<div>
                 {header}
                 <GridView ref='gridlist'
                      {...this.props}
                      columns={schema.columns}
                      columnMetadata={this.columnsMetaData}
                      collectionMgr={this.collectionMgr.bind(this)  }
                      multiselect={this.props.multiselect}
                      DoNotManageCollection={true}// explicit for not triggering collection fetch when reduxgridFormView mount
                  />
          </div>);

    };

}

/**
 * Obsolete: Create an advanced schema for the list search form
 * @param  {object} listSchema [description]
 * @param  {[type]} meta   [description]
 * @return {object}        [description]
 */
function createListSearchSchema(listSchema,selections){
    const {filter,columnsMetaData}=listSchema;
    let SearchSchema={schema:{}};
    let options,meta=null;
    if (filter){
        if (!filter.advancedFilterField) return SearchSchema;
        filter.advancedFilterField.map(function(field){
            meta=columnsMetaData.find((meta)=>{return(meta.columnName==field);});
            if (meta){
                if (typeof meta.selection=='object'){
                    options=[...selections[meta.selection.collectionName]];
                };
                SearchSchema.schema[field]={
                    title:meta.displayName,
                    type:meta.type,
                    ...options
                };
            }
            else {
                SearchSchema.schema[field]={
                    title:field,
                };
            }
        });
    }
    return SearchSchema;
};


/**
 * Normalize data with addtional virtual selection
 * @param {object} schema     [description]
 * @param {object} data       [description]
 * @param {object} selections [description]
 * @return {object}        normalized data
 */
function NormalizeData(schema,data,selections){
    return data.map((item)=>{
        let newItem={...item};
        schema.columnsMetaData.map((meta)=>{
            if (meta.selection){
                //console.log(meta.selection.collectionName);
                let selectionPrimaryField=(meta.selection.selectionFields)?
                                         meta.selection.selectionFields.value:
                                         'value';
                if (meta.selection.collectionName){
                    let data=item[meta.selection.reference];
                    let collectionName=meta.selection.collectionName;

                    let selection=selections[collectionName];
                    selection=selection.find(function(record){
                        return (record[selectionPrimaryField]==data);
                    });

                    if (selection!==undefined){

                        if (meta.selection.selectionFields){
                            let fields=meta.selection.selectionFields;
                            selection={
                                value:selection[fields.value],
                                caption:selection[fields.caption]
                            };
                        };
                        newItem[meta.columnName]=selection.caption;
                    }
                    else
                        if (newItem[meta.columnName]===undefined)
                        { newItem[meta.columnName]='';}
                }
            }
        });
        return newItem;
    });
}


function mapStateToProps(state,ownProps) {
    const {name,mode}=ownProps.schema;
    const {schGrids,collections} =state ;
    const GridInfo=schGrids[name];
    const {items,totalPages,currentPage,sortKey,
           SortAscending,isFetching,pageSize}=collections[GridInfo.collectionName];
    const {multiselect,urlOptions,schema,advancedSearch,
           showFilter,showSettings,selectionCollectionNames}=GridInfo;
    let selections={};
    let results=[];

    //Getting the selections from  collections state
    selectionCollectionNames.map(function(name){
        const selection=collections[name].items;
        selections[name]=[...selection];
    });

    //Normalize data if needed
    if (isFetching){
        results=items;
    }
    else {

        //results=items;
        results=NormalizeData(schema,[...items],selections);
    }
    //console.log(results);

    return {
        multiselect:multiselect||(mode=='multiselect'),
        results,
        selections,
        isFetching,
        urlOptions,
        advancedSearch:advancedSearch||(mode=='advancedSearch'),
        showFilter,showSettings,
        /*page informations*/
        totalPages,currentPage,sortKey,SortAscending,isFetching,pageSize
    };
}


export default connect(mapStateToProps)(List);
