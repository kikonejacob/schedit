import students from 'modules/students/controller.js';
import studylevels from 'modules/studylevels/controller.js';
import studyclasses from 'modules/studyclasses/controller.js';
import schoolinfo from 'modules/schoolInfo/controller.js';
import subjects from 'modules/subjects/controller.js';
import feeheads from 'modules/feeheads/controller.js';
import levelfees from 'modules/levelfees/controller.js';
import studentenroll from 'modules/studentEnroll/controller.js';
import loginController from 'modules/login/controller.js';
import studentsgroupController from 'modules/studentsGroups/controller';
import studentMembershipController from 'modules/studentGroupMembership/controller';
import studentAidsController from 'modules/studentAids/controller';
import SchoolInformation from 'modules/schoolInfo/controller';
import Enrollments from 'modules/enrollments/controller';
import AcademicYear from 'modules/academicYears/controller'

export default {

    students:students,
    studentenroll:studentenroll,
    studylevels:studylevels,
    schoolinfo:schoolinfo,
    studyclasses:studyclasses,
    feeheads:feeheads,
    levelfees:levelfees,
    subjects:subjects,
    loginController:loginController,
    studentsgroups:studentsgroupController,
    studentmembership:studentMembershipController,
    studentAid:studentAidsController,
    schoolInformation:SchoolInformation,
    enrollments:Enrollments,
    academicYears:AcademicYear,


};
