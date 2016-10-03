
import React,{Component,PropTypes}  from 'react';
import FormView,{btSaveCancel} from 'components/FormView/schema-form';
import { connect } from 'react-redux';

class Form extends Component{
    handleSubmit(data){
        const {dispatch,onSubmitForm}=this.props;
        dispatch(onSubmitForm(data));
    }
    render(){
        const {data,schema}=this.props;
        return(<div className="container">
                 <div className="row">
                  <div className="col-md-8">
                     <FormView formButtons={btSaveCancel} schema={schema.schema}
                             uiSchema={schema.uiSchema} data={data} />
                 </div>
                 </div>
               </div>);
    }
}
Form.propTypes = {
    data: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    onSubmitForm:PropTypes.func.isRequired,
};

function mapStateToProps(state,ownProps) {
    console.log(state);
    const dataState = state[ownProps.datasource];
    const { data,
            lastUpdated,
            isFetching } = dataState[ownProps.id]|| {isFetching: false,data:{}};
    return {
        data:data||{},
        isFetching:isFetching||false,
        lastUpdated,
    };
}
export default connect(mapStateToProps)(Form);
