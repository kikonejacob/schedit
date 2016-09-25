import React,{Component,PropTypes} from 'react';
import Panel from 'components/panel/panel';
import List from 'components/list/List';
import InlineList from 'components/InlineList/InlineList';
import { connect } from 'react-redux';
import ProgressDialog from 'components/ProgressDialog/progressDialog';


class Form extends Component{

    render(){
        if (this.props.isFetching)
            return (<ProgressDialog> Please wait ....</ProgressDialog>);
        else
        {
            let {classes,fees,data}=this.props;
            let levelId=data.id;
            let feeUrl='./#studylevels/:id/fees/:key';

            return(
            	<div className="col-lg-12">

        	    	<Panel title={data.name} refLink={String('/studylevels/:id/edit').replace(':id',levelId)}>
        	    			<div>

        				    	<p>Name: <span>{data.name}</span></p>
        				    	<p>Description: <span>{data.description}</span></p>
        				    </div>
        			</Panel>

        			<Panel title="Classes">
        	  			<InlineList data={classes.items} captionField='name'
                                  keyField='id' linkUrl='./#classes/:key' />


        			</Panel>


        	  		<Panel title="Fees">
        	  			<List data={fees.items}  captionField='fee_code'
                                keyField='fee_code' linkUrl={feeUrl.replace(':id',levelId)}  />

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
    classes:PropTypes.object.isRequired,
    fees:PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const { levels,activeContainer } = state;
    const {
        isFetching,
        lastUpdated,
        data,
        classes,
        fees
        } = levels[activeContainer.levelId] || {
            isFetching: false,
            classes:{},
            fees:{},
            subjects:{},
            data:{},
        };
    return {
        data,
        classes,
        fees,
        isFetching,
        lastUpdated
    };
}
export default connect(mapStateToProps)(Form);
