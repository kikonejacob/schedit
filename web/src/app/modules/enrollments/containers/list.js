/**
 * React container for displaying a grid list of classes
 * (c) 2016 kikone kiswendida
 */
import React from 'react';
import List from 'lib/containers/listForm/list';
import * as ListSchema from '../schemas/enrollments.list.schema.json';
import {deleteClass} from '../lib/actions.js';
import {refreshGridOptions} from 'lib/grid/actions.js';


const DELETE_CONFIRM='Are you sure you want to delete these items ?';


class ListForm extends React.Component{

    handleActions(action,selectedRowIds){
        const {dispatch,uiCtl}=this.props;
        if (this.props.onAction){
            return this.props.onActions(action,selectedRowIds,dispatch());
        }
        switch (action) {
        case 'delete':
            let confirmResult=confirm(DELETE_CONFIRM);
            if (confirmResult==true)
            {
                dispatch(deleteClass(selectedRowIds));
            }
            break;
        case 'create':
            dispatch(uiCtl.route('inscriptions/new'));
            break;
        default:

        }

    }
    render(){
        const schema=(this.props.schema)? this.props.schema:ListSchema;
        return(<List  schema={schema}
                      refreshGridOptions={refreshGridOptions}
                      onAction={this.handleActions.bind(this)}
                /> );
    }

}
export default ListForm;
