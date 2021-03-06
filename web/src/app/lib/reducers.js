/**
 * REDUCERS OF SCHOOL EDIT  APPLICATION
 * This file contain all the reducers in the application. In order to use
 * redux in a module, the reducer function need to be registered in this file
 */

import {activeContainer} from './common/reducers';
import auth from 'lib/auth/reducers';
import levels from 'modules/studylevels/lib/reducers';
import classes from 'modules/studyclasses/lib/reducers.js';
import levelfees from 'modules/levelfees/lib/reducers.js';
import schGrids from './grid/reducers';
import collections from './collections/reducers';
import students from 'modules/students/lib/reducers';
import studentTuitions from 'modules/studentTuition/lib/reducers';
import studentEnrollments from  'modules/studentEnroll/lib/reducers';
import subjects from  'modules/subjects/lib/reducers';
import feeHeads from  'modules/feeheads/lib/reducers';
import reductions from 'modules/studentAids/lib/reducers';
import schoolInformation from 'modules/schoolInfo/lib/reducers';
import {currentuser} from './users/reducers';

export default {
    activeContainer,
    auth,
    ...levels,
    classes,
    ...levelfees,
    ...schGrids,
    collections,
    students,
    studentTuitions,
    studentEnrollments,
    feeHeads,
    reductions,
    schoolInformation,
    currentuser


};
