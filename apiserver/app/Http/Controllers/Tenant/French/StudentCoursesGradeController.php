<?php


namespace App\Http\Controllers\Tenant;


use App\Http\Controllers\FilterTrait;
use App\Http\Requests\Request;
use App\Models\Tenant\French\StudentCourseGrade;
use Validator;

class StudentCoursesGradeController extends Controller
{
    use FilterTrait;

    protected $rules = array(
            'grade'     => 'optional|double' ,
            'studentId' => 'required|integer' ,
            'term_id'   => 'required|integer',
            'appreciation'=>'optional|double',
        );

    private function getStudentGrades($studentId , $termId)
    {
        return $result = StudentCourseGrade::with('course')
                            ->where('studentId' , $studentId)
                            ->andWhere('term_id' , $termId);
    }

    public function index($studentId , $termId)
    {
        $result = $this->ApplyFilters($this->getStudentGrades($studentId , $termId) , true);
        return $result;
    }

    public function store(Request $request)
    {
        /**Validation or request arguments*/
        $validator = Validator::make($request->all() , $this->rules);
        if ($validator->fails()) {
            return response()->json(['error' , 'message' => $validator->messages()] , 422);
        }
        /** End validation */
        $values=$request->only(['term_id','studentId','appreciation','grade']);
        StudentCourseGrade::firstOrCreate($values);

    }

    public function show()
    {

    }

}