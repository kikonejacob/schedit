import {LIST_STUDENT_TUITIONS} from './actionTypes.js';

import {APIgetFetch,ShouldFetch,APIpostFetch,APIputFetch,
        APIdeleteFetch} from 'utils/asyncHelper';
import {URL_STUDENT_TUITIONS,URL_STUDENTS,URL_STUDENT_FINANCES} from 'lib/apiUrlconst';
import {initCollection,fetchCollection} from 'lib/collections/actions';


export function listStudentFinances(collectionName,studentId){
    return (dispatch) => {
        let url=URL_STUDENT_FINANCES;
        url=url.replace(':id',studentId);
        dispatch(initCollection(collectionName,url));
        dispatch(fetchCollection(collectionName,url));

    };

}

/*Make a ui call for tuition payment*/
export function UImakeTuitionPayment(studentId,amount){


}
export function UIdetailPayment(studentId,invoice){

}
export function UIcancelStudentPayment(paymentId){

}
