<?php

namespace App\Http\Controllers\Tenant;

use Illuminate\Http\Request;


use App\Models\Tenant\StudentEnrollment;
use App\User;

use DB;
use App\Http\Controllers\TuitionAutoFollowUpTrait;
use App\Http\Controllers\FilterTrait;
use App\Lib\Tenant\DButils\consts as C;
use Exception;
use App\Events\Tenant\StudentEnrolled;


class studentEnrollController extends Controller
{

    use TuitionAutoFollowUpTrait;
    use FilterTrait;

    /*public function __construct(){

        $this->setFilters(['studentId','acyearId','classId','grade','payment_plan',      ALIAS_CLASS_NAME,EDUC_CLASS.'.levelId',
                   ALIAS_ACYEAR_NAME,
                   ALIAS_STUDENT_NAME]);
    }
    */


    /** @var array  The filter */
    public $filterFields = ['studentId', 'acyearId', 'classId', 'grade', 'payment_plan'];


    /**
     *
     */
    public function aggregateGenre(){
        $result=StudentEnrollment::join('class')->groupBy('classId');
        return $result;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($studentId)
    {


        $student = User::students()->find($studentId);

        /*$users = DB::table('users')
            ->join('contacts', 'users.id', '=', 'contacts.user_id')
            ->join('orders', 'users.id', '=', 'orders.user_id')
            ->select('users.*', 'contacts.phone', 'orders.price')
            ->get();
        $enrollment=studentEnrollment::all();*/
        /*$enrollment=studentEnrollment::join('educ_classes')->select('name','id');*/

        $filterFields = array_map(function ($item) {

            return C::STUDENT_ENROLLMENT . '.' . $item;

        }, $this->filterFields);

        $this->filterFields = array_merge($filterFields, [
                C::ALIAS_CLASS_NAME,
                C::EDUC_CLASS . '.levelId',
                C::ALIAS_ACYEAR_NAME,
                C::ALIAS_STUDENT_NAME]
        );

        /*$this->setFilters(array(['studentId','acyearId','classId','grade','payment_plan']));

*/

        $enrollments = DB::table(C::STUDENT_ENROLLMENT)
            ->join(C::EDUC_CLASS, C::STUDENT_ENROLLMENT . '.classid', '=', C::EDUC_CLASS . '.id')
            ->join(C::ACADEMIC_YEAR, C::STUDENT_ENROLLMENT . '.acyearId', '=', C::ACADEMIC_YEAR . '.id')
            ->join(C::STUDENT, C::STUDENT_ENROLLMENT . '.studentId', '=', C::STUDENT . '.id')
            ->select(C::STUDENT_ENROLLMENT . '.*',
                C::EDUC_CLASS . '.levelId',
                C::ALIAS_PARSE(C::ALIAS_CLASS_DESCRIPTION),
                C::ALIAS_PARSE(C::ALIAS_CLASS_NAME),
                C::EDUC_CLASS . '.levelId',
                C::ALIAS_PARSE(C::ALIAS_ACYEAR_NAME),
                C::STUDENT . '.first_name',
                C::STUDENT . '.last_name',
                C::ALIAS_PARSE(C::ALIAS_STUDENT_NAME),
                C::ALIAS_PARSE(C::ALIAS_ENROLLMENT_COUNT(C::EDUC_CLASS . '.id'))
            )
            ->where('studentId', $studentId);


        /*$enrollments=studentEnrollment::where('studentId',$studentId)->get();
        //$Enrollments=$student->enrollments()->get();


        return response()->json(["data"=>$enrollments],200);*/

        $enrollments = $this->ApplyFilters($enrollments, true);

        /*TO DO: Improve task
        $this->dispatch(new PrintList($enrollments,'enrollments.list.json',["id"=>2]));
        */
        return $enrollments;
    }


    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request, $studentId)
    {
        $student = User::where('studentId', $studentId);
        $newEnroll = null;
        if ($student) {
            $values = $request->all();
            $values['studentId'] = $studentId;


            $e = DB::transaction(function () use ($values, $studentId, &$newEnroll) {

                try {
                     $newEnroll = studentEnrollment::create($values);
                     //$this->ApplyStudentClassTuition($studentId, $values['classId']);
                     event(new StudentEnrolled($newEnroll));
                    return null;
                } catch (Exception $e) {
                    return $e->getMessage();

                }


            });
        }


        if ($e == null)
            return response()->json(['message' => 'ok', 'error' => false, 'data' => $newEnroll], 200);
        else
            /** @var Exception $e */
            return response()->json(['message' => $e, 'error' => true], 401);


    }

    /**
     * Display the specified resource.
     *
     * @param $studentId
     * @param $enrollId
     * @return Response
     * @internal param int $id
     * @internal param represent $int enrollment Id
     */
    public function show($studentId, $enrollId)
    {
        /** @var User $student */
        $student = User::find($studentId);
        if (!$student) {
            return $this->error_studentNotFound();

        };

        /** @var StudentEnrollment $enrollment */
        $enrollment = $student->enrollments()->find($enrollId);

        return response()->json(['data' => $enrollment], 201);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  int $id
     * @return Response
     */
    public function update($id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
