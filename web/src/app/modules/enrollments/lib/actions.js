import {LIST_STUDENT_ENROLLMENT,API_DEL_ENROLL,API_ENROLL,API_GET_ENROLL} from './actionTypes.js';

import {APIgetFetch,ShouldFetch,APIpostFetch,APIputFetch,
        APIdeleteFetch} from 'utils/asyncHelper';
import {URL_STUDENT_ENROLLMENT,URL_STUDENT_ENROLLMENTS} from 'lib/apiUrlconst';
import {fetchGridCollection} from 'lib/grid/actions';

export function listStudentsEnrollments(studentId){
    return (dispatch, getState) => {
        let state=getState();
        const data = state.studentEnrollments[studentId]?state.studentEnrollments[studentId]:{};
        let url=URL_STUDENT_ENROLLMENTS;
        url=url.replace(':id',studentId);
        if (ShouldFetch(data, studentId)) {
            return dispatch(APIgetFetch(url,LIST_STUDENT_ENROLLMENT,{studentId}));
        }
    };

}
