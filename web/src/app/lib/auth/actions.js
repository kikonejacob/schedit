import {APIpostFetch} from 'utils/asyncHelper';
import {REQUIRE_AUTHENTIFICATION,USER_LOGIN,USER_LOGIN_FAIL,USER_LOGIN_SUCESS} from './actionTypes';
import {loadContainer,changeTitle} from 'lib/common/actions';
import AuthErrorForm from './containers/auth.error.dialog';
import React from 'react';
import cookie from 'cookie';



export function RequireAuthentification(){

    return(dispatch)=>{
        var Dialog=(<AuthErrorForm />);
        dispatch(changeTitle('Login is required'));
        dispatch(loadContainer(Dialog));
        return{
            type:REQUIRE_AUTHENTIFICATION,
            recentUrl:location.href
        };
    };

}

export function AuthentificationFail (){

    return {type:USER_LOGIN_FAIL};

}

function AsyncLoginActionCreator(actionType,status,options){

    if (options.response.access_token){
        console.log(options);
        document.cookie=`token=${options.response.access_token};path=/`;
        console.log(cookie.serialize('token', options.response.access_token,{
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7 // 1 week
        }));
        location.replace('#'); // Redirecting
    }
    return {
        type:USER_LOGIN_SUCESS
    };
}
export function login(creditentials,redirectTo){
    return(dispatch)=>{
        return dispatch(APIpostFetch('api/auth',USER_LOGIN,{...creditentials,redirectTo},AsyncLoginActionCreator));
    };
}
