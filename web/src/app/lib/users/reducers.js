import {API_CURRENT_USER_REQUEST,API_CURRENT_USER_SUCESS,API_CURRENT_USER_ERROR} from './consts';

export function  currentuser (state = { }, action){
    switch (action.type) {
    case API_CURRENT_USER_REQUEST:
        return {
            ...state,
            isFetching:true,
        };
    case API_CURRENT_USER_ERROR:
        return state;

    case API_CURRENT_USER_SUCESS:
        return {
            ...state,
            ...action.data
        };
    default:
        return state;
    }
}