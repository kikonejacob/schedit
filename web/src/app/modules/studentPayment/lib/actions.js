import {APIgetFetch,ShouldFetch,APIpostFetch,APIputFetch,
        APIdeleteFetch} from 'utils/asyncHelper';
import {URL_STUDENT_ENROLLMENT,URL_STUDENT_ENROLLMENTS} from 'lib/apiUrlconst';
import {initCollection,fetchCollection} from 'lib/collections/actions';
import {API_MAKE_PAYMENT}from './actionTypes'


export function makePayment(studentId,amount,paymentOptions){
  return (dispatch) => {

      let url=String(URL_STUDENT_ENROLLMENT).replace(':id',studentId);
      return dispatch(APIputFetch(url,API_MAKE_PAYMENT,{studentId,
                                                    amount,
                                                    ...paymentOptions}));
    }
}
export function getInvoice(studentId,invoiceId){

}

export function CancelPayment(studentId,invoiceId){
  
}
