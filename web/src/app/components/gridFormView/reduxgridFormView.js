
import React,{PropTypes} from 'react';
import Griddle from 'griddle-react';
import _ from 'underscore';
import GriddlePager from './griddlePager';
import LinkComponent from './griddleLinkComponent';// just for export purpose
import SelectionDisplayComponent from './griddleSelectionComponent';
//import Spinner from 'react-spin';
//
//
var customComponents={};

export const COLLECTION_FETCH='COLLECTION_FETCH';
export const COLLECTION_SORT='COLLECTION_SORT';
export const COLLECTION_SET_PAGE='COLLECTION_SET_PAGE';
export const COLLECTION_FILTER='COLLECTION_FILTER';
export const COLLECTION_SETPAGE_SIZE='COLLECTION_SETPAGE_SIZE';



export function regGridCustomComponent(componentName,Component){
    customComponents[componentName]=Component;
}
export function unregGridComponent(componentName){

    customComponents[componentName]=undefined;

}
export function getGridCustomComponent(componentname){
    return customComponents[componentname];

}
const  SchGridView = React.createClass({

    externalSetPage: function(index){
        var index = index + 1;
        this.props.collectionMgr(COLLECTION_SET_PAGE,{currentPage:index},this.props);
    },
    changeSort: function(sort, sortAscending){
        this.props.collectionMgr(COLLECTION_SORT,{sorkey:sort,direction:sortAscending});
    },
    setFilter: _.debounce(function(filter){
        this.props.collectionMgr(COLLECTION_FILTER,{query:filter});
    },800),
    setPageSize: function(size){
        this.props.collectionMgr(COLLECTION_SETPAGE_SIZE,{pageSize:size});
    },

    getcolums:function(){

        return this.props.columns;
    },

    getcolumsMeta:function(){

        let meta=[];
        _.extend(meta,this.props.columnMetadata);
        return meta;
    },

    go:function(){

        return this.ref.SchGrid.getSelectedRowIds();
    },
    render: function(){

        var multiselectProps={};
        //console.log(this.props.collectionOptions);
        if (this.props.multiselect)
        {
            //console.log(this.props.selectedIds);
            multiselectProps={
                isMultipleSelection:true,
                selectedRowIds:this.props.selectedRowIds,
                rowSelection:'multiple'
            };
        }

        return (<div className="col-lg-12" >
                <Griddle ref='SchGrid' useExternal={true} externalSetPage={this.externalSetPage}
                    externalChangeSort={this.changeSort}
                    externalSetFilter={this.setFilter}
                    externalSetPageSize={this.setPageSize}

                    externalMaxPage={this.props.totalPages}
                    externalCurrentPage={this.props.currentPage-1}
                    externalResultsPerPage={this.props.pageSize}
                    externalSortColumn={this.props.sortKey}
                    externalSortAscending={this.props.SortAscending==-1}

                    enableInfiniteScroll={true}

                    results={this.props.results}

                    useGriddleStyles={false}
                    showFilter={this.props.showFilter}
                    showSettings={this.props.showSettings}
                    uniqueIdentifier={this.props.uniqueID ? this.props.UniqueID : 'id'}


                    tableClassName="table table-striped table-hover table-bordered table-condensed"
                    columnMetadata={this.getcolumsMeta()}

                    useCustomPagerComponent="true"
                    customPagerComponent={GriddlePager}

                    {...multiselectProps}
                    {...this.props}


                    columns={this.getcolums()}/>

                </div>);
    }
});

SchGridView.propTypes = {
    collectionMgr: PropTypes.func.isRequired,
    multiselect:PropTypes.bool.isRequired,
    isFetching:PropTypes.bool,
    /*page types*/
    totalPages:PropTypes.number,
    pageSize:PropTypes.number,
    currentPage:PropTypes.number,
    sortKey:PropTypes.string,
    SortAscending:PropTypes.number
};

/**
 * Register the default customs component for the grid
 * @return {[type]} [description]
 */
regGridCustomComponent('LinkComponent',LinkComponent);
regGridCustomComponent('SelectionComponent',SelectionDisplayComponent);

export default SchGridView;
export {LinkComponent};
