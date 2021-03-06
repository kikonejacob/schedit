import { get,post,del,put} from 'utils/http';
import {RESTAPI_RECEIVE,RESTAPI_REQUEST} from 'lib/common/actionTypes';
import {RequireAuthentification,AuthentificationFail} from 'lib/auth/actions';
import * as _ from 'lodash';
import {showAPIerror} from 'lib/containers/APIerror/apierror';

function ApiExceptionMgr(error,dispatch){
    if (error.status==400){
        dispatch(RequireAuthentification());
    }
    if (error.status==401){
        if (error.responseJSON){
            if (error.responseJSON.error)
                switch (error.responseJSON.error) {
                case 'invalid_client':
                    dispatch(AuthentificationFail());
                    break;
                case 'Unauthenticated':
                    dispatch(RequireAuthentification());
                    break;
                default:
                    dispatch(RequireAuthentification());
                }
        }
        else
            dispatch(RequireAuthentification());

    }
    else {
        showAPIerror(error.status,error.statusmessage);
        console.log(error);
        throw new Error('API comminication fail with code:'+error.code);
        /*alert('error in api communication: \n'+
              'error: '+error.status +
              'message:' + error.statusmessage
          );
        //console.log(url);*/
    }

}
/*

  TODO: Uniform function
 */

function AsyncActionCreator(actionType,status,options){

    return {type:actionType,
        status:status,
        ...options
    };



}

export function ShouldFetch(data) {
    if (!data) {
        return true;
    } else if (data.isFetching) {
        return false;
    } else {
        return true; //data.didInvalidate;
    }
}


function getBaseUrl() {
    var re = new RegExp(/^http[s]?:\/\/.*?\/([a-zA-Z-_]+).*$/);
    //console.log(window.location.href);
    return re.exec(window.location.href)[1];
}

function AddSlashToUrl(url){
    return (url[0]=='/')?url:'/'+url;
}


/**
 * APIgetFetchEx Make an ajax get call from the API using redux.
 * @export
 * @param {string} url           url of the request
 * @param {string} actionType    The type of redux action
 * @param {object} subdata       The data
 * @param {function} ActionCreator Represent the callback action creator
 *                   This is useful when the resulting data of the async ajax
 *                   need to be processed.
 * @param {object}  [ajaxParams={}]Specify any additional Ajax to add to the request
 * @param {function}  [ActionCreator=null] action creator
 *
 * In general the server should response with data object ex: {data:{}}
 */
export  function APIgetFetchEx(url,actionType,subdata,ajaxParams={},ActionCreator=null) {
    return (dispatch) => {
        dispatch(AsyncActionCreator(actionType,RESTAPI_REQUEST,subdata));
        console.log('/'+getBaseUrl()+url);
        return get('/'+getBaseUrl()+AddSlashToUrl(url),{params:ajaxParams})
          //.then(req => req.json())
          .then(response => {
              //console.log(json)
              //console.log(url);

              let params={...subdata,
                  pagination:_.omit(response,'data'), //it supose that the rest is pagination informations
                  data:response.data,//we are sending the raw response to be processed by the action creator
                  receivedAt:Date.now()
              };
              //console.log(params);
              if (ActionCreator!=null)
                  return dispatch(ActionCreator(actionType,RESTAPI_RECEIVE,params));
              else
                  return dispatch(AsyncActionCreator(actionType,RESTAPI_RECEIVE,params));
          })
          .catch((error)=>{
              return ApiExceptionMgr(error,dispatch);
          });


    };
}

/**
 * APIgetFetchEx Make an ajax get call from the API using redux.
 *
 * @export
 * @param {string} url  The api url.
 * @param {string} actionType the action type.
 * @param {Object} subdata Data to be sent with this request
 * @param {Object} [ajaxParams={}]  Ajax params
 * @returns {function}
 */
export function APIgetFetch(url,actionType,subdata,ajaxParams={}){
    return APIgetFetchEx(url,actionType,subdata,ajaxParams,null);
}

/**
 * Post data to the Api server.
 *
 * @export
 * @param {string} url
 * @param {string} actionType
 * @param {Object} subdata
 * @param {function} [ActionCreator=null]
 * @returns
 */
export  function APIpostFetch(url,actionType,subdata,ActionCreator=null) {
    return dispatch => {
        dispatch(AsyncActionCreator(actionType,RESTAPI_REQUEST,subdata));
         //console.log(subdata);
        return post('/'+getBaseUrl()+AddSlashToUrl(url),{params:subdata})
          //.then(req => req.json())
          .then(json => {
              let params={...subdata,
                  response:json,//(url=='api/auth')?json:json.data,
                  savedAt:Date.now()
              };
              if (ActionCreator!=null)
                  return dispatch(ActionCreator(actionType,RESTAPI_RECEIVE,params));
              else
                  return dispatch(AsyncActionCreator(actionType,RESTAPI_RECEIVE,params));
          })
          .catch((error)=>{
              return ApiExceptionMgr(error,dispatch);
          });

    };
}

/**
 *  Send a PUT request to the API server
 *
 * @export
 * @param {string} url
 * @param {string} actionType
 * @param {Object} subdata
 * @param {Object} [ActionCreator=null]
 * @returns {function}
 */
export  function APIputFetch(url,actionType,subdata,ActionCreator=null) {
    //console.log(actionType);
    return dispatch => {
        dispatch(AsyncActionCreator(actionType,RESTAPI_REQUEST,subdata));
        //console.log(url);

        return put(url,{params:subdata})

          //.then(req => req.json())
          .then(json => {
              let params={...subdata,
                  response:json,
                  savedAt:Date.now()
              };
              //console.log(params);
              if (ActionCreator!=null)
                  return dispatch(ActionCreator(actionType,RESTAPI_RECEIVE,params));
              else
                  return dispatch(AsyncActionCreator(actionType,RESTAPI_RECEIVE,params));
          });

    };
}

/**
 * Send a DELETE request to the server
 *
 * @export
 * @param {string} url
 * @param {string} actionType
 * @param {Object} subdata
 * @param {function } [ActionCreator=null]
 * @returns
 */
export  function APIdeleteFetch(url,actionType,subdata,ActionCreator=null) {
    return dispatch => {
        dispatch(AsyncActionCreator(actionType,RESTAPI_REQUEST,subdata));
        return del(url,{params:subdata})
          .catch(()=>{
              alert('error in api communication :'+url);
          })
          //.then(req => req.json())
          .then((json)=> {
              const params={response:json,...subdata};
              if (ActionCreator!=null)
                  return dispatch(ActionCreator(actionType,RESTAPI_RECEIVE,params));
              else
                 return dispatch(AsyncActionCreator(actionType,RESTAPI_RECEIVE,params));
          });

    };
}
/*
export  function APIgetFetch(url,subdata,requestfunc,sucessfunc,errorfunc) {
    return dispatch => {
        dispatch(requestfunc(subdata));
        return get(url)
          //.then(req => req.json())
          .then(json => dispatch(sucessfunc(subdata, json)));
    };
}

export  function APIdeleteFetch(url,subdata,requestfunc,sucessfunc,errorfunc) {
    return dispatch => {
        dispatch(requestfunc(subdata));
        return delete(url)
          //.then(req => req.json())
          .then(json => dispatch(sucessfunc(subdata, json)));
    };
}





export  function APIpost(url,params,requestfunc,sucessfunc,errorfunc) {
    return dispatch => {
        dispatch(requestfunc(params));
        return post(url,{params:params})
          //.then(req => req.json())
          .then(json => dispatch(sucessfunc(params, json)));
    };
}*/
