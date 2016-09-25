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
            const {data,group}=this.props;
            return(
            	<div className="col-lg-12">
        	    	<Panel title='Group' refLink={String('#/studentgroups/:id/edit').replace(':code',group)}>
        	    			<div>
        				    	<p>Name: <span>{data.name}</span></p>
        				    	<p>description: <span>{data.description}</span></p>
        				    </div>
        			</Panel>
        			<Panel title="Membership" refLink={String('#/groups/:code/enrollments').replace(':code',group)}>
        	  			<List   schema={this.props.MembershipListSchema} />
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
    MembershipListSchema:PropTypes.object.isRequired,

};

function mapStateToProps(state,ownProps) {
    const { studentgroups} = state;
    const group=ownProps.group;

    const {isFetching,lastUpdated,data} = studentgroups[group] || {
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
