<?php


/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
Route::get('/' , function () {
    return view('welcome');
});

Route::group(['prefix' => 'ui-ctrl'] , function () {

    Route::resource('grid' , 'ui\gridController' , ['except' => ['create' , 'edit']]);
});

Route::group(['prefix' => 'web' , 'middleware=>web'] , function () {

    Route::get('/' , function () {
        return view('welcome');
    });
    Route::resource('manage' , 'TenantMgr\tenantsController' , [
        'namespace' => 'TenantMgr' ,
        'except'    => ['create' , 'edit']
    ]);
});

Route::group(['prefix' => 'service/{tenant}' , 'middleware' => 'tenant.database'] , function () {

    Route::post('oauth/access_token' , function () {
        return Response::json(Authorizer::issueAccessToken());
    });

    // @todo we have to replace auth.basic middle ware by Oauth
    Route::group(['prefix' => 'api' , 'middleware' => ['api' , 'oauth'] , 'namespace' => 'Tenant'] , function ($tenant) {
        Route::get('/' , function () {
            return view('welcome');
        });
        //var_dump(Request::path());

        /* 0. Academic Year*/
        Route::resource('academic-years' , 'academicYearController' , ['except' => ['create' , 'edit']]);

        /** 1. Study Branches  */
        Route::resource('branches' , 'branchController' , ['except' => ['create' , 'edit']]);

        /** 2. Fee and subject heads */
        Route::resource('subjects' , 'EducSubjectsController' , ['except' => ['create' , 'edit']]);
        Route::resource('fee-heads' , 'EducFeeHeadsController' , ['except' => ['create' , 'edit']]);

        /** 3. French-system */

        /** 3.1 French-Level configuration */
        Route::resource('levels' , 'levelController' , ['except' => ['create' , 'edit']]);
        Route::resource('levels.fees' , 'levelFeesController' , ['except' => ['create' , 'edit']]);
        Route::resource('levels.courses' , 'levelSubjectsController' , ['except' => ['create' , 'edit']]);
        Route::resource('levels.classes' , 'levelClassController' , ['except' => ['create' , 'edit']]);

        /** 3.2 French-Class Information */
        Route::resource('classes' , 'classController' , ['only' => ['index' , 'show']]);
        Route::get('classes/{id}/aggregate' , 'classController@RestAPIClassAggregate');

        /** 3.3 French-Student-enrollment */
        Route::resource('students.enrollments' , 'studentEnrollController' , ['only' => ['store' , 'index' , 'show']]);
        Route::resource('enrollments' , 'enrollmentsController' , ['only' => ['index' , 'show']]);

        /** 3.4 French-student-courses @todo: Implement it */
        Route::resource('students.courses' , 'StudentCoursesController' , ['only' => ['index' , 'store','show']]);
        Route::resource('students.courses.grades' , 'StudentCoursesGradeController' , ['only' => ['index']]);
        /** 3.5 French-student-grades @todo: Implement it */
        Route::resource('students.grades' , 'StudentCoursesGradeController' , ['only' => ['index']]);

        /** 3.6 French-Teacher-Courses @todo: Implement it */
        Route::resource('teachers.courses','TeacherController',['only'=>['index','store','update','show']]);

        /** 3.6 French-class-student-course-grade (Bulk filling) @todo : Implement It */
        Route::resource('classes.courses.grades','ClassCourseGradesController',['only'=>['index','store','update','show']]);
        //grade:{[studentId|grade]},sequence
        Route::resource('classes.courses','ClassCourseGradesController',['only'=>['index']]);// Aggregate
        //|Course|average|min|max|
        Route::resource('classes.grades','ClassGradesController',['only'=>['index']]);
        //|studentId|CourseId|[Sequences grades]|grade

        /** 4. Student information */
        Route::get('students/{id}/aggregate' , 'studentController@aggregate');
        Route::resource('students' , 'studentController' , ['except' => ['create' , 'edit']]);
        Route::resource('students.info' , 'studentInfoController' , ['only' => ['store' , 'index']]);

        /** 5. Student groups */
        Route::resource('students.groups' , 'studentMembershipController' , ['except' => ['create' , 'edit']]);
        Route::resource('studentgroups' , 'studentGroupController' , ['except' => ['create' , 'edit']]);
        Route::resource('studentgroups' , 'studentGroupController' , ['except' => ['create' , 'edit']]);

        /** 6. Student Tuition */
        Route::resource('students.tuition' , 'studentTuitionController' , ['only' => ['index']]);
        Route::get('students/{id}/tuition/aggregate' , 'studentTuitionController@aggregate');

        /** 7. Tuition aggregate  */
        Route::get('/tuition/aggregate' , 'tuitionController@aggregateAll');
        Route::get('/tuition/{classId}' , 'studentTuitionController@show');
        Route::get('/tuition/{classId}/aggregate' , 'tuitionController@Aggregate');

        /** 8. Payment plan */
        Route::resource('paymentplans' , 'PaymentPlanController' , ['only' => ['index']]);

        /** 9. Tuition Reduction (Scholarships and aids) */
        Route::resource('tuition-reductions' , 'tuitionReductionController' , ['only' => ['index']]);

        /** 10. Teachers @todo Implement  it */
        Route::resource('teachers','TeacherController',['only'=>['index','store','update','show']]);

        /* 11. Other */
        Route::resource('saveselection' , 'selectionController' , ['only' => ['store']]);
        /** 12. Storage  */
        Route::resource('users.storage' , 'StorageController' , ['only' => ['store','index','update']]);
        Route::resource('students.storage' , 'StorageController' , ['only' => ['store','index','update']]);
        Route::resource('teachers.storage' , 'StorageController' , ['only' => ['store','index','update']]);
        Route::resource('admins.storage' , 'StorageController' , ['only' => ['store','index','update']]);
        /** 13. school information */
        Route::resource('school-information' , 'SchoolConfigController' , ['only' => ['index','store']]);

    });

});