import {REST_GET_STUDENT,REST_SET_STUDENT,REST_DEL_STUDENT
      ,REST_DEL_STUDENTS,REST_NEW_STUDENT} from './actionTypes.js';

import {APIgetFetch,ShouldFetch,APIpostFetch,APIputFetch,
        APIdeleteFetch} from 'utils/asyncHelper';
import {URL_STUDENT,URL_STUDENTS} from 'lib/apiUrlconst';
import {initGrid} from 'lib/grid/actions';
import {fetchCollection} from 'lib/collections/actions';



/**
 * Intialize the grid component  that shows a list of students
 * @param  {[type]} gridName [description]
 * @return {[type]}          [description]
 */
export function initStudentGrid(gridName){

    return(dispatch)=>{
        let url=URL_STUDENTS;
        dispatch(initGrid(url,gridName));
        return dispatch(fetchCollection(gridName,url));
    };

}


export function getStudent(studentId) {
    return (dispatch, getState) => {
        let state=getState();
        const data = state.students[studentId]?state.students[studentId]:[];
        let url=String(URL_STUDENT).replace(':id',studentId);
        if (ShouldFetch(data, studentId)) {
            return dispatch(APIgetFetch(url,REST_GET_STUDENT,{studentId}));
        }
    };
}

export function updateStudent(studentId,data){
    return (dispatch) => {
        let url=String(URL_STUDENT).replace(':id',studentId);
        return dispatch(APIputFetch(url,REST_SET_STUDENT,{studentId,...data}));
    };

};
export function createStudent(levelId,data){
    return (dispatch) => {
        let url=URL_STUDENT;
        return dispatch(APIpostFetch(url,REST_NEW_STUDENT,{studentId:-1,...data}));
    };

};

export function deleteStudents(levelId,id){
    return (dispatch) => {
        let url=URL_STUDENT;
        return dispatch(APIdeleteFetch(url,REST_DEL_STUDENT,{...id}));
    };

};

export function deleteStudent(ids){
    return (dispatch) => {
        let url=URL_STUDENT;
        return dispatch(APIdeleteFetch(url,REST_DEL_STUDENTS,{...ids}));
    };

};
