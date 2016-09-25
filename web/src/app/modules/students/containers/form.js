/**
 *  level fees form:
 *  this form is for editing and creating level fees:
 *  schema:form.levelfees.schema
 *  (c) 2016 kikone kiswendida
 *   		-
 */
import React,{Component,PropTypes}  from 'react';
import   FormView,{btYesNoCancel,btSaveCancel} from 'components/FormView/schema-form';
import * as schema from '../schemas/form.student.schema.json' ;
import { connect } from 'react-redux';

import {createStudent,updateStudent} from '../lib/actions';


class Form extends Component{
    /**
     * [handleEditSubmit handle user form control ]
     * @param  {event} e      [description]
     * @param  {object} data   [data  to be saved]
     * @param  {string} action [type of  action selected by user]
     * @return {voided}        [description]
     */
    handleActions(action,data,e){
        const {dispatch,uiCtl}=this.props;
        switch(action)
        {
        case 'cancel':
            uiCtl.routeBack();
            break;

        case 'submit':
            if (this.props.studentId==-1)
                dispatch(createStudent(data.levelid,data.id,data));
            else {
                dispatch(updateStudent(data.id,data));
            }
        }
    }
    render(){
        return(<div>
                 <FormView formButtons={btSaveCancel} schema={schema}
                        onAction={this.handleActions.bind(this)}/>
               </div>);
    }
}
Form.propTypes = {
    data: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state,ownProps) {
    const {dataId}=ownProps;
    const {students} = state;
    const {data,
          lastUpdated,
          isFetching} = students[dataId]|| {isFetching: false,data:{}};
    return {
        data,
        isFetching,
        lastUpdated
    };
}
export default connect(mapStateToProps)(Form);
