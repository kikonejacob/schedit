/**
 *  Fee Heads module
 *  This code below represent all the actions managed by this modules
 */
import { ACTION_TYPES, API_URLS, MODULE_API_REDUCER } from './consts';
import { getResourceActionCreator, newResourceActionCreator,
        saveResourceActionCreator, deleteResourceActionCreator } from 'lib/factories/APIActions';

/**
 * @export
 * @param {integer} acyearId Academic year Id
 * @returns
 */
export function getAcademicYear(acyearId) {
    return getResourceActionCreator(MODULE_API_REDUCER, ACTION_TYPES, API_URLS, acyearId);
}
/**
 * @export
 * @param {Object} data
 * @returns
 */
export function createAcademicYear(data) {
    return newResourceActionCreator(MODULE_API_REDUCER, ACTION_TYPES, API_URLS, data);
}
/**
 * @export
 * @param {integer} acyearId Academic year Id
 * @param {Object} data
 * @returns
 */
export function setAcademicYear(acyearId, data) {
    data.resourceId = acyearId;
    return saveResourceActionCreator(MODULE_API_REDUCER, ACTION_TYPES, API_URLS, data);
}
/**
 * @export
 * @param {String} feeCode
 * @returns
 */
export function deleteFeeHead(feeCode) {
    return deleteResourceActionCreator(MODULE_API_REDUCER, ACTION_TYPES, API_URLS, feeCode);
}
