import React,{Component,PropTypes}  from 'react';
import { connect } from 'react-redux';
import {login} from 'lib/auth/actions';


export class LoginDialog  extends Component{

    handleSubmit(event){
        event.preventDefault();
        const username=this.refs.username.value;
        const password=this.refs.password.value;
        this.props.dispatch(login({username,password},this.props.auth.redirectTo));
    }
    ComponentWillReceiveProps(nextProps){

        /*if (nextProps.isAuthenticatecreditentialsd && nextProps.recentUrl!==''){
            this.uiCtl.route(nextProps.recentUrl);
        }*/
    }

    render(){
        const {auth}=this.props;
        let attemptR='';
        console.log(auth);
        if ((auth.attempts>0)&&(auth.isAuthenticated==false)){
            attemptR=(<b color={'red'}> Authentification fail </b>);
        }
        return (<div>
                 {attemptR}
            <div>
                      <form className="form form-inline" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                          <label htmlFor="username">User name:</label>
                          <input type="text" ref="username" placeholder="Enter a username" className="form-control"/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="password">Password:</label>
                          <input type="password" ref="password" placeholder="Enter a password" className="form-control"/>
                        </div>
                        <button className="btn btn-success"><i className="fa fa-sign-in"/>{' '}Log In
                        </button>
                      </form>
                    </div>
            </div>);
    }
}

function mapStateToProps(state) {
    const {auth} = state;
    return {auth};
}

export default connect(mapStateToProps)(LoginDialog);
