<?php

namespace App\Http\Controllers\Tenant\French;

use App\Http\Controllers\FilterTrait;
use App\Http\Controllers\Tenant\Controller;
use App\Model\Tenant\French\EducLevelCourseGrade;
use App\Models\Tenant\EducTerm;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Response;
use Validator;


class CoursesTermGradesController extends Controller
{
    use FilterTrait;
    /** @var array The validation rules */
    protected  $rules=[
        'grade.*.studentId' =>'required|integer',
        'grade.*.value'     =>'required|double',
        'termId' =>'required|integer'
    ];
    /**
     * Display a listing of the resource.
     *
     * @param $termId
     * @param $courseId
     * @return \Illuminate\Http\Response
     */
    public function index($termId,$courseId)
    {
        $result= EducTerm::find($termId)->grades()->where('id',$courseId);
        $result=$this->ApplyFilters($result,true);
        return $result;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        /**Validation or request arguments*/
        $validator = Validator::make($request->all() , $this->rules);
        if ($validator->fails()) {
            return response()->json(['error' , 'message' => $validator->messages()] , 422);
        }
        /** End validation */
        $grades=$request->get('grades');
        foreach ($grades as $studentGrade){
            EducLevelCourseGrade::create(array(
                'studentId' =>array_get($studentGrade,'studentId'),
                'grade'     =>array_get($studentGrade,'grade')
             ));
        }
        return Response::json(['message'=>'success'],201);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
