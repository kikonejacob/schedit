/**
 * List of API possibles url calls
 */

export const URL_LEVEL_CLASSES='/api/levels/:id/classes';
export const URL_LEVEL_SUBJECTS='/api/levels/:id/subjects';
export const URL_LEVEL='/api/levels/:id';
export const URL_LEVEL_LIST='/api/levels';
export const URL_LEVEL_FEES='/api/levels/:id/fees';
export const URL_LEVEL_FEE='/api/levels/:id/fees/:code';
export const URL_CLASS_LIST='/api/classes';
export const URL_CLASS='/api/classes/:id';
export const URL_CLASS_AGGREGATE='/api/classes/:id/aggregate';
/*Students*/
export const URL_STUDENT='/api/students/:id';
export const URL_STUDENTS='/api/students';
export const URL_STUDENT_TUITION='api/students/:id/tuition';
/**Enrollements*/
export const URL_STUDENT_ENROLLMENT='api/students/:id/enrollments/:enrollId';
export const URL_STUDENT_ENROLLMENTS='api/students/:id/enrollments';
export const URL_ENROLLMENTS='api/enrollments';
export const URL_STUDENT_ENROLL='api/students/:id/enrollments';
export const URL_ENROLLMENT='api/enrollment';

export const URL_REDUCTIONS='api/tuition-reductions';
export const URL_REDUCTION='api/tuition-reductions';
export const URL_STUDENT_MEMBERSHIP='api/students/:id/group';

export const URL_STUDENTGROUPS='api/studentgroups';
export const URL_STUDENTGROUP='api/studentgroups/:code';
export const URL_STUDENTGROUP_MEMBERSHIP='api/studentgroups/:code/membership';
/** Branches API*/
export const URL_BRANCHES='api/branches';
export const URL_BRANCH='api/branches/:id';

/** School Information */
export const URL_SCHOOL_INFORMATION='api/school-information';

/** Subject heads */
export const URL_SUBJECTS='api/subjects';
export const URL_SUBJECT='api/subjects/:code';

/** Fees heads */
export const URL_FEE_HEADS='api/fee-heads';
export const URL_FEE_HEAD='api/fee-heads/:code';

/** School Information */
export const URL_ACADEMIC_YEAR='api/academicyears/:id';
export const URL_ACADEMIC_YEARS='api/academicyears';