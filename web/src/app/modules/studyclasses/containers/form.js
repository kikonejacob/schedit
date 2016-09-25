/**
 *  level fees form:
 *  this form is for editing and creating level fees:
 *  schema:form.levelfees.schema
 *  (c) 2016 kikone kiswendida
 *   		-
 */
import React,{Component,PropTypes}  from 'react';
import   FormView,{btYesNoCancel,btSaveCancel} from 'components/FormView/schema-form';
import * as schema from '../schemas/form.class.json' ;
import { connect } from 'react-redux';

import {createStudyClass,updateStudyClass} from '../lib/actions';
import {DEFAULT_LEVEL_COLL_NAME} from 'modules/studylevels/lib/actions';
import {DEFAULT_BRANCHE_COLL_NAME} from 'modules/studyBranches/lib/actions';
import * as _ from 'lodash';



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
            if (this.props.dataId==-1)
                dispatch(createStudyClass(data.levelid,data.id,data));
            else {
                dispatch(updateStudyClass(data.id,data));
            }
        }
    }

    componentWillUpdate() {
    //  console.log('UPDATE MAP')
    //  console.log(this.props);
    }
    render(){
        const {formSchema,uiSchema,data}=this.props;
        return(<div>
                 <FormView formButtons={btSaveCancel}
                           schema={formSchema}
                           uiSchema={uiSchema}
                           data={data}
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
    const {classes,collections} = state;
    const {data,
          lastUpdated,
          isFetching} = classes[dataId]|| {isFetching: false,data:{}};
    //  console.log(collections);
    const levels=collections['levels'];
    const branches=collections['branches'];
    const uiSchema=ownProps.rawSchema.uiSchema;
    var schema={...ownProps.rawSchema.schema};
    const Fields=Object.keys(schema.properties);/**Get the properties names */
    if ((!levels.isFetching) && (!branches.isFetching)){
        schema.properties.levelId.enum=levels.items.map(item=>item.id)||['...'];
        schema.properties.levelId.enumNames=levels.items.map(item=>item.name)||['...'];;
        schema.properties.branchId.enum=branches.items.map(item=>item.id)||['...'];;
        schema.properties.branchId.enumNames=branches.items.map(item=>item.name);
    }

    FormData=_.pick(data,Fields); /*We get the properties that we need only to allow validation. This does not apply to nested data*/


    return {
        data:FormData,
        isFetching,
        lastUpdated,
        uiSchema,
        formSchema:schema
    };
}
export default connect(mapStateToProps)(Form);
