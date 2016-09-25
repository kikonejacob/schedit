import React,{Component,PropTypes}  from 'react';
import { connect } from 'react-redux';
import ButtonsGroup,{btSaveCancel} from 'components/ButtonsGroup/ButtonsGroup';
import Panel from 'components/panel/panel';

const ENROLLL_BUTTONS=[
    {caption:'Drop Enrollement',action:'drop'},
    {caption:'Swap',action:'cancel'}
];

class EnrollShowForm extends Component{
    handleActions(action){

    }

    render(){
        const {data}=this.props;
        return (<div>
                    <div  className="col-lg-12">
                        <Panel title={'Enrollment Information'}>
                                <div>
                                    <p>Date of enrolllement: <span>{data.created_at}</span></p>
                                    <p>Payment plan: <span>{data.payment_plan}</span></p>
                                </div>
                        </Panel>
                    </div>
                    <div>
                        {this.props.children}
                    </div>
                    <div>
                        <ButtonsGroup buttons={ENROLLL_BUTTONS} onAction={this.handleActions.bind(this)}/>
                    </div>
                </div>);


    }
}

EnrollShowForm.propTypes = {
    data: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
};
function mapStateToProps(state,ownProps) {
    const {studentEnrollments } = state;
    const {data,isFetching}=studentEnrollments[ownProps.dataId];
    return {data,isFetching};
}
export default connect(mapStateToProps)(EnrollShowForm);
