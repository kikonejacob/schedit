import React,{Component,PropTypes} from 'react';
import Panel from 'components/panel/panel';
import List from 'components/list/List';
import InlineList from 'components/InlineList/InlineList';
import { connect } from 'react-redux';
import ProgressDialog from 'components/ProgressDialog/progressDialog';
import {URL_STUDENT,URL_STUDENTS} from 'lib/apiUrlconst';


class Form extends Component{

    render(){
        if (this.props.isFetching)
            return (<ProgressDialog> Please wait ....</ProgressDialog>);
        else
        {
            let {tuition,enrollments,data}=this.props;
            let studentId=data.id;
            let tuitionUrl='./#students/:id/tuitions/:key';

            return(
            	<div className="col-lg-12">

        	    	<Panel title='Basics' refLink={String('#/students/:id/edit').replace(':id',studentId)}>
        	    			<div>

        				    	<p>Name: <span>{data.firstName+' '+data.lastName}</span></p>
        				    	<p>contact: <span>{data.email}</span></p>
        				    </div>
        			</Panel>

        			<Panel title="Enrollments" refLink={String('#/students/:id/enrollments').replace(':id',studentId)}>
        	  			<InlineList data={enrollments.items} captionField='name'
                                  keyField='id' linkUrl='./#classes/:key/' />

        			</Panel>


        	  		<Panel title="Tuitions" refLink={String('#/students/:id/finances').replace(':id',studentId)} >
        	  			<List data={tuition.items}  captionField='fee_code'
                                keyField='fee_code' tuitionUrl={tuitionUrl.replace(':id',studentId)}  />

        			</Panel>

            	  </div>);
        }


    }



}

Form.propTypes = {
    data: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    tuition:PropTypes.object.isRequired,
    enrollments:PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const { students,collections,activeContainer } = state;
    const studentId=activeContainer.studentId;
    const {isFetching,lastUpdated,data} = students[studentId] || {
        isFetching: false,
        data:{},
    };
    const tuition=collections['student.tuition'];
    const enrollments=collections['student.enrollments'];

    return {
        data,
        tuition,
        enrollments,
        isFetching,
        lastUpdated
    };
}
export default connect(mapStateToProps)(Form);
