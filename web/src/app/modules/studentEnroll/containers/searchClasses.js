/**
 * React container for displaying a grid list of class available to enroll
 * (c) 2016 kikone kiswendida
 */
import React from 'react';
import List from 'lib/containers/listForm/list';
import {deleteStudent} from '../lib/actions.js';
import {refreshGridOptions} from 'lib/grid/actions.js';
import {connect} from 'react-redux';





class SearchForm extends React.Component{

    handleActions(action,selectedRowIds){
        const {dispatch,uiCtl,dataId}=this.props;
        if (this.props.onAction){
            return this.props.onActions(action,selectedRowIds,dispatch());
        }
        switch (action) {
        case 'enroll':
            console.log(selectedRowIds);
            uiCtl.route('students/:id/enroll-search'.replace(':id',dataId));
            break;
        default:

        }

    }
    render(){
        const ListSchema={};
        const schema=(this.props.schema)? this.props.schema:ListSchema;
        return(<List  schema={schema}
                      refreshGridOptions={refreshGridOptions}
                      onAction={this.handleActions.bind(this)}
                /> );
    }

}
export default connect()(SearchForm);
