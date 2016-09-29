<?php
/**
 * Created by PhpStorm.
 * User: khome
 * Date: 9/29/16
 * Time: 1:08 PM
 */

namespace App\Http\Controllers\Tenant;


use App\Http\Controllers\FilterTrait;
use App\Models\Tenant\StudentAbsence;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;

const ALLOWED_VALUES=['studentId','start_time','end_time','type'];

class StudentAbsencesController extends Controller
{
    use FilterTrait;

    protected $rules = array(
        'start_time'   => 'optional|date_format:H:i' ,
        'end_time'     => 'optional|date_format:H:i' ,
        'type'         => 'require|in:absence,tardy' ,
        'classId'      =>'required|integer',
        'studentId'    => 'required|integer' ,
        'bulk-entries' => 'optional|array' ,
    );
    public function index($studentId){
        $result=StudentAbsence::where('studentId',$studentId);
        return $this->APISuccessResponse(['data'=>$this->ApplyFilters($result,true)]);
    }

    public function createAbsence($values){
        return StudentAbsence::create($values);
    }

    public function store(Request $request){

        try {
            $this->validate($request , $this->rules);
            $bulkReq = $request->get('bulk-entries');
            if (isset($bulkReq)) {
                $result = array();
                foreach ($bulkReq as $data) {
                    $values = array_only($data , ALLOWED_VALUES);
                    $result[] = $this->createAbsence($values)->id;
                };
                return $this->APISuccessResponse(array('data' => $result));
            } else {
                $values = $request->only(ALLOWED_VALUES);
                $result = $this->createAbsence($values);
                return $this->APISuccessResponse($result);
            }
        }
        catch (ValidationException $error) {
            return $this->APIValidationError($error);
        }
    }

    public function update(Request $request){

    }

}