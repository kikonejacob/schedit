<?php
/**
 *
 * User: khome
 * Date: 9/29/16
 * Time: 4:34 PM
 */

namespace App\Http\Controllers\Tenant;


use App\Http\Controllers\FilterTrait;
use App\Models\Tenant\EducClassTeacher;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ClassTeacherController extends  Controller
{
    use FilterTrait;

    protected $rules = array(
        'teacherId'   => 'require|integer' ,
        'classId'     => 'required|integer' ,
        'studentId'   => 'required|integer' ,
        'course_code' => 'optional|integer' ,
    );
    public function index($TeacherId){
        $result=EducClassTeacher::where('teacherId',$TeacherId);
        return $this->APISuccessResponse(['data'=>$this->ApplyFilters($result,true)]);
    }

    public function createAbsence($values){
        return EducClassTeacher::create($values);
    }

    public function store(Request $request){
        try {
            $this->validate($request , $this->rules);
            $values = $request->only(ALLOWED_VALUES);
            $result = $this->createAbsence($values);
            return $this->APISuccessResponse($result);
        }
        catch (ValidationException $error) {
            return $this->APIValidationError($error);
        }
    }

    public function update(Request $request){

    }

}