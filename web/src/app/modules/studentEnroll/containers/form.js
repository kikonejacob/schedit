/**
 *  level fees form:
 *  this form is for editing and creating level fees:
 *  schema:form.levelfees.schema
 *  (c) 2016 kikone kiswendida
 *   		-
 */
import React,{Component,PropTypes}  from 'react';
import   FormView,{btYesNoCancel,btSaveCancel} from 'components/FormView/form-view';
import * as schema from '../schemas/form.enrollments.schema.json' ;
import { connect } from 'react-redux';

class Form extends Component{
    render(){
        return(<div>
                 <FormView formButtons={btSaveCancel} schema={schema}
                  {...this.props} />
               </div>);
    }
}
Form.propTypes = {
    data: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    name:PropTypes.string,
    code:PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    onSubmitForm:PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const { enrollments,activeContainer } = state;
    const {
          data,
          lastUpdated,
          isFetching
      } = enrollments[activeContainer.studentId]|| {
              isFetching: false,
              data:{},
          };
    return {
        data,
        isFetching,
        lastUpdated
    };
}
export default connect(mapStateToProps)(Form);
