import React,{Component,PropTypes}  from 'react';
import FormView,{btSaveCancel} from 'components/FormView/schema-form';
import { connect } from 'react-redux';


class SchoolIconForm extends Component{
    handleSubmit(data){
        const {dispatch,onSubmitForm}=this.props;
        dispatch(onSubmitForm(data));
    }
    render(){

    }
}

export default SchoolIconForm;
