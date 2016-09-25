import React,{Component,PropTypes}  from 'react';
import { connect } from 'react-redux';
import ButtonsGroup,{btSaveCancel} from 'components/ButtonsGroup/ButtonsGroup';
import {Enroll}from '../lib/actions';
import EnrollStatus from '../components/enrollStatus';
import {replaceStrFromJson} from 'utils/stringHelper';
import ProgressDialog from 'components/ProgressDialog/progressDialog';
const ENROLLL_BUTTONS=[
    {caption:'Enroll',action:'enroll'},
    {caption:'Cancel',action:'cancel'}
];

const ENROLL_SUCESS_MESSAGE=['#### Enrollment Sucessfully completed. \n ',
                             'Your enrollment for ``class.name`` was sucessful.',
                             'You are require to pay the fees for the enrollment. \n',
                             '#### Thank you !'].join(' ');



class EnrollForm extends Component{
    handleActions(action){
        const {dispatch,classId,studentId,uiCtl}=this.props;
        console.log(this.props);
        dispatch(Enroll(studentId,classId));
        uiCtl.updateActiveContainer({status:'processed'});
    }
    componentWillmount(){
        const {uiCtl}=this.props;
        uiCtl.updateActiveContainer({status:'start'});
    }
    componentWillReceiveProps(nextProps){
        const {uiCtl}=this.props;
        if(nextProps.isFetching){
            uiCtl.changeTitle('Processing Enrollment ...');
        }
        else {
            if(nextProps.isFetching===false){
                uiCtl.changeTitle('Processing finished');
            }
        }

    }

    render(){
        const {status}=this.props;
        if (status=='processed'){
            const {response,classInfo,isFetching}=this.props;
            if (isFetching){

                return  (<ProgressDialog> Processing Enrollment ....</ProgressDialog>);
            }
            const message=replaceStrFromJson(ENROLL_SUCESS_MESSAGE,{'class.name':classInfo.name});
            console.log(message);
            return (<EnrollStatus  isFetching={isFetching} response={response}  message={message}/>);
        }
        else
        return (<div>
                    <div  className="col-lg-12">
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

function mapStateToProps(state,ownProps){
    const {activeContainer,studentEnrollments,classes}=state;
    var extra={};
    if (activeContainer.status=='processed'){
        const {data,isFetching}=studentEnrollments['new-record'];
        const classInfo=classes[ownProps.classId].data;
        extra={response:data,classInfo,isFetching};
    }
    return {
        status:activeContainer.status,
        ...extra
    };

}

export default connect(mapStateToProps)(EnrollForm);
