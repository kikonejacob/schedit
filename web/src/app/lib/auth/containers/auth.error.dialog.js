import React,{Component,PropTypes}  from 'react';
import { connect } from 'react-redux';
import {showLogin} from 'modules/login/lib/actions';


export default class AuthErrorDialog  extends Component{

    handleLogin(){
        this.dispacth(showLogin());
    }

    render(){
        return (<div className="row">
                    <div className="col-md-8 col-lg-6 col-sm-12">
                        <p> This application is having trouble connecting to the server.
                             This can occurs when the user session is expired.
                            To solve this problem please login again.
                        </p>
                        <a className='btn btn-default' href='#login'> Login </a>

                    </div>
                    

            </div>);
    }
}

//export default  connect()(AuthErrorDialog);
