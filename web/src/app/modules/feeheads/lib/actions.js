/**
 *  Fee Heads module
 *  This code below represent all the actions managed by this modules
 */
import { ACTION_TYPES, API_URLS, MODULE_API_REDUCER } from './consts';
import { getResourceActionCreator, newResourceActionCreator,
        saveResourceActionCreator, deleteResourceActionCreator } from 'lib/factories/APIActions';

/**
 * @export
 * @param {String} feeCode
 * @returns
 */
export function getFeeHead(feeCode) {
    return getResourceActionCreator(MODULE_API_REDUCER, ACTION_TYPES, API_URLS, feeCode);
}
/**
 * @export
 * @param {Object} data
 * @returns
 */
export function createFeeHead(data) {
    return newResourceActionCreator(MODULE_API_REDUCER, ACTION_TYPES, API_URLS, data);
}
/**
 * @export
 * @param {String} feeCode
 * @param {Object} data
 * @returns
 */
export function setFeeHead(feeCode, data) {
    data.resourceId = feeCode;
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
