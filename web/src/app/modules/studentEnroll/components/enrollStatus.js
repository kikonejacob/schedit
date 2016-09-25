import React,{Component,PropTypes}  from 'react';
import { connect } from 'react-redux';
import DialogButtons,{btOK} from 'components/DialogButtons/DialogButtons';
import  ReactMarkdown from  'react-markdown';


export default  class EnrollStatus extends Component{
    handleActions(action){

    }

    render(){
        const {message}=this.props;
        return (<div>
                    <div>
                        <ReactMarkdown source={message} />
                    </div>
                    <div>
                        <DialogButtons model={btOK} onAction={this.handleActions.bind(this)}/>
                    </div>
                </div>);


    }
}
