import cookie from 'cookies-js';
import {URL_CURRENT_USER} from 'lib/apiUrlconst';
import {API_CURRENT_USER_REQUEST,API_CURRENT_USER_SUCESS,API_CURRENT_USER_ERROR} from './consts';

function requestCurrentUser(){
    return {
        type:API_CURRENT_USER_REQUEST
    };
}
/**
 *
 *
 * @param {Object} response
 * @returns
 */
function receiveCurrentUser(response){
    return {
        type:API_CURRENT_USER_SUCESS,
        data:response.data
    };
}
/**
 *
 *  Error message creator
 * @param {Error} error
 * @returns {Object}
 */
function errorGettingCurrentUser(error){
    return {
        type:API_CURRENT_USER_ERROR,
        message:error.message,
        error:error.name
    };
}
/**
 *  Load current user information
 *
 * @export
 * @returns
 */
export function loadCurrentUserInformation(){
    return (dispatch)=>{
        dispatch(requestCurrentUser);
        if (cookie.get('token')){
            fetch(URL_CURRENT_USER)
                .then(response => response.json())
                .then(json => dispatch(receiveCurrentUser(json)))
                .catch(error => errorGettingCurrentUser(error));
        }

    };
}