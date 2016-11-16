/**
 *  Fee Heads module
 *  This code below represent all the actions managed by this modules
 */
import { ACTION_TYPES, API_URLS, MODULE_API_REDUCER } from './consts';
import generate from 'lib/factories/CRUDActions';
/**
 * @export
 * @param {integer} acyearId Academic year Id
 * @returns
 */
export function getAcademicYear(acyearId) {
    return generate.GetActionCreator(MODULE_API_REDUCER, ACTION_TYPES, API_URLS, acyearId);

}
/**
 * @export
 * @param {Object} data
 * @returns
 */
export function createAcademicYear(data) {
    return generate.NewActionCreator(MODULE_API_REDUCER, ACTION_TYPES, API_URLS, data);
}
/**
 * @export
 * @param {integer} acyearId Academic year Id
 * @param {Object} data
 * @returns
 */
export function setAcademicYear(acyearId, data) {
    data.resourceId = acyearId;
    return generate.SaveActionCreator(MODULE_API_REDUCER, ACTION_TYPES, API_URLS, data);
}
/**
 * @export
 * @param {String} feeCode
 * @returns
 */
export function deleteFeeHead(feeCode) {
    return generate.DeleteActionCreator(MODULE_API_REDUCER, ACTION_TYPES, API_URLS, feeCode);
}
