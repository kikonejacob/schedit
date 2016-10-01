import React, {Component, PropTypes}  from 'react';
import { connect } from 'react-redux';
import {login} from 'lib/auth/actions';


export class LoginDialog extends Component {

    handleSubmit(event) {
        event.preventDefault();
        const username = this.refs.username.value;
        const password = this.refs.password.value;
        this.props.dispatch(login({ username, password }, this.props.auth.redirectTo));
    }
    ComponentWillReceiveProps(nextProps) {

        /*if (nextProps.isAuthenticatecreditentialsd && nextProps.recentUrl!==''){
            this.uiCtl.route(nextProps.recentUrl);
        }*/
    }

    render() {
        const {auth} = this.props;
        let attemptR = '';
        console.log(auth);
        if ((auth.attempts > 0) && (auth.isAuthenticated == false)) {
            attemptR =(<div className="col-md-6 alert alert-danger">
                             <strong>Error!</strong> Authentification fail .
                      </div>);
        }
        return (<div>
            <div className="container">
               <div className="row">{attemptR}</div>
                <form  onSubmit={this.handleSubmit.bind(this) }>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group" >
                                <label htmlFor="username">User name: </label>
                                <input type="text" ref="username" placeholder="Enter a username" className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className='col-md-6'>
                            <div className="form-group">
                                <label htmlFor="password">Password: </label>
                                <input type="password" ref="password" placeholder="Enter a password" className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <button className="btn btn-success pull-right"><i className="fa fa-sign-in"/>{' '}Log In  </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>);
    }
}

function mapStateToProps(state) {
    const {auth} = state;
    return { auth };
}

export default connect(mapStateToProps)(LoginDialog);
