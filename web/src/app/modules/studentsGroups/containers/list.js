/**
 * React container for displaying a grid list of students
 * (c) 2016 kikone kiswendida
 */
import React from 'react';
import List from 'lib/containers/listForm/list';
import {deleteStudent} from '../lib/actions.js';
import {refreshGridOptions} from 'lib/grid/actions.js';


const DELETE_CONFIRM='Are you sure you want to delete these items ?';

/**
 * List Form
 *
 * @class ListForm
 * @extends {React.Component}
 */
class ListForm extends React.Component{
    /**
     *  handle form actions
     *
     * @param {string} action
     * @param {Array} selectedRowIds
     * @return  {void}
     *
     * @memberOf ListForm
     */
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
                dispatch(deleteStudent(selectedRowIds));
            }
            break;
        case 'create':
            dispatch(uiCtl.route('inscriptions/new'));
            break;
        default:

        }

    }
    render(){
        const {schema}=this.props;
        return(<List  schema={schema}
                      refreshGridOptions={refreshGridOptions}
                      onAction={this.handleActions.bind(this)}
                /> );
    }

}
export default ListForm;
