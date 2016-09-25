import {LIST_STUDENT_TUITIONS} from './actionTypes.js';

import {APIgetFetch,ShouldFetch,APIpostFetch,APIputFetch,
        APIdeleteFetch} from 'utils/asyncHelper';
import {URL_STUDENT_TUITION,URL_STUDENTS} from 'lib/apiUrlconst';
import {initCollection,fetchCollection} from 'lib/collections/actions';

export function listStudentTuition(studentId,collectionName){
    return (dispatch) => {
        let url=URL_STUDENT_TUITION;
        url=url.replace(':id',studentId);
        if (collectionName==undefined){
            collectionName='student.${studentId}.tuition';
        }
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
