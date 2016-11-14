
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
                <div>
                    <div className="col-md-4 col-sm-3">
                       <div className="thumbnail">
                            <img alt="School Icon" src={data.icon} width="171px" height="180px"/>
                            <div className="caption">
                              <a href='#school-information/picture' className="button">Modify/Add picture</a>
                            </div>
                       </div>

                    </div>
                </div>
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
    const dataState = state[ownProps.datasource];
    const { data,
            lastUpdated,
            isFetching } = dataState[ownProps.dataId]|| {isFetching: false,data:{}};
    return {
        data:data||{},
        isFetching:isFetching||false,
        lastUpdated,
    };
}
export default connect(mapStateToProps)(Form);
