import React,{Component,PropTypes}  from 'react';
import { connect } from 'react-redux';
import {showLogin} from 'modules/login/lib/actions';


export default class AuthErrorDialog  extends Component{

    handleLogin(){
        this.dispacth(showLogin());
    }

    render(){
        return (<div>
                    This application is having trouble connecting to the server.
                    This can occurs when the user session is expired
                    To solve this problem please login again.
                    <a className='btn btn-default' href='#login'> Login </a>

            </div>);
    }
}

//export default  connect()(AuthErrorDialog);
