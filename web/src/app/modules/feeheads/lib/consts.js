import { URL_FEE_HEAD, URL_FEE_HEADS } from 'lib/apiUrlconst';
import lang from '../lang/french.json';

/** CRUD actionTypes */
export const ACTION_TYPES = {
    APIcreate: 'API_CREATE_FEE_HEAD',
    APIset   : 'API_SET_FEE_HEAD',
    APIget   : 'API_GET_FEE_HEAD',
    APIdelete: 'API_DELETE_FEE_HEAD'
};

/** GRUD Urls */
export const API_URLS = {
    resources: URL_FEE_HEADS,
    resource : (code) => String(URL_FEE_HEAD).replace(':code', code)
};

function translateCreator(lang){
    var TranslatorDic={};
    if (lang!=undefined){
        TranslatorDic=lang.consts ? lang.consts : TranslatorDic;
    }
    /**
     *
     * @param {string} text
     */
    return function(text){
        const result= TranslatorDic[text];
        if  (result){
            return result;
        }
        else{
            return text;
        }
        ;
    };

}

const ___=translateCreator(lang);

/** Form titles */
export const FORM_TITLE              = ___('Fee Heads');
export const FORM_SHOW_TITLE         = ___('Fee Heads');
export const FORM_CREATE_TITLE       = ___('Create a new fee head');
export const DELETE_CONFIRM          = ___('Are you sure you want to delete these items ?');

/**  Controller constants */
export const GRID_NAME               = 'fee-heads.grid';
export const MODULE_ICON             = 'fa-cogs';

/** Module CRUD reducer */
export const MODULE_API_REDUCER      = 'feeHeads';

/** Module and controller name */
export const MODULE_REGISTERED_NAME  = 'feeheads';
export const CONTROLLER_NAME         = 'fee-heads.controller';