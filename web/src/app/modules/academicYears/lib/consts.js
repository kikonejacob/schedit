import { URL_ACADEMIC_YEARS, URL_ACADEMIC_YEAR } from 'lib/apiUrlconst';
import lang from '../lang/french.json';
import {translateCreator}  from 'utils/translator';

/** Personal translator file */
const ___=translateCreator(lang);

/** CRUD actionTypes */
export const ACTION_TYPES = {
    APIcreate: 'API_CREATE_ACYEAR',
    APIset   : 'API_SET_ACYEAR',
    APIget   : 'API_GET_ACYEAR',
    APIdelete: 'API_DELETE_ACYEAR'
};

/** CRUD Urls */
export const API_URLS = {
    resources: URL_ACADEMIC_YEARS,
    resource : (code) => String(URL_ACADEMIC_YEAR).replace(':id', code)
};



/** Form titles */
export const FORM_TITLE              = ___('Academic years');
export const FORM_SHOW_TITLE         = ___('Academic year');
export const FORM_CREATE_TITLE       = ___('Create a new academic year');
export const DELETE_CONFIRM          = ___('Are you sure you want to delete these items ?');

/**  Controller constants */
export const GRID_NAME               = 'acyears.grid';
export const MODULE_ICON             = 'fa-cogs';

/** Module CRUD reducer */
export const MODULE_API_REDUCER      = 'academicyears';

/** Module and controller name */
export const MODULE_REGISTERED_NAME  = 'acyears';
export const CONTROLLER_NAME         = 'acyears.controller';