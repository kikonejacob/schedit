<?php
/**
 * Created by PhpStorm.
 * User: khome
 * Date: 9/26/16
 * Time: 10:05 PM
 */

namespace App\Http\Controllers\Tenant;


use App\Models\Tenant\French\StudentSequenceGrade;
use Illuminate\Http\Request;
use Response;
use Validator;

class StudentSequenceGradeController extends Controller
{
    protected $rules = array(
        'grade'     => 'optional|double' ,
        'studentId' => 'required|integer' ,
        'term_id'   => 'required|integer',
        'status'    =>'required|in:published,waiting',
    );

    public function index($studentId,$course_code)
    {

        $result=StudentSequenceGrade::where('studentId',$studentId)->andWhere('course_code',$course_code);

        return $result;

    }

    public function store(Request $request,$studentId)
    {
        /**Validation or request arguments*/
        $validator = Validator::make($request->all() , $this->rules);
        if ($validator->fails()) {
            return response()->json(['error' , 'message' => $validator->messages()] , 422);
        }
        /** End validation */
        $values=$request->only(['student_id','term_id','status','grade']);
        $result=StudentSequenceGrade::create($values);
        return Response::json(['data'=>$result],404);


    }
    public function update(Request $request){

    }

}