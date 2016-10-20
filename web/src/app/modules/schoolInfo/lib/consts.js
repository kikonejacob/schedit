import { URL_SCHOOL_INFORMATION } from 'lib/apiUrlconst';
import lang from '../lang/french.json';
import {translateCreator}  from 'utils/translator';

/** Personal translator file */
const ___=translateCreator(lang);

/** CRUD actionTypes */
export const ACTION_TYPES = {
    APIset   : 'API_SET_SCHOOL_INFORMATION',
    APIget   : 'API_GET_SCHOOL_INFORMATION',
};

/** GRUD Urls */
export const API_URLS = {
    resource: URL_SCHOOL_INFORMATION
};



/** Form titles */
export const FORM_TITLE              = ___('School Information');

/**  Controller constants */
export const GRID_NAME               = 'schoolInformation.grid';
export const MODULE_ICON             = 'fa-cogs';

/** Module CRUD reducer */
export const MODULE_API_REDUCER      = 'schoolInformation';

/** Module and controller name */
export const MODULE_REGISTERED_NAME  = 'schoolInformation';
export const CONTROLLER_NAME         = 'schoolInformation.controller';