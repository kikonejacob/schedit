<?php

namespace App\Http\Controllers\Tenant\French;

use App\Http\Controllers\FilterTrait;
use App\Http\Controllers\Tenant\Controller;
use App\Model\Tenant\French\EducLevelCourseGrade;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use App\Http\Requests;
use Response;
use Validator;

class CoursesGradeController extends Controller
{
    use FilterTrait;

    protected  $rules=[
        'studentId'=>'required|integer',
        'grade'    =>'required|double'
    ];
    /**
     * Display a listing of the resource.
     *
     * @param integer|null $studentId
     * @param integer $termId
     * @return \Illuminate\Http\Response
     */
    public function index($studentId,$termId)
    {
        $result=EducLevelCourseGrade::where('term_id',$termId)
            ->andWhere('studentId',$studentId);
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
        $studentId=$request->get('studentId');
        $grade=$request->get('grade');
        $result=EducLevelCourseGrade::create(array(
            'studentId' =>$studentId,
            'grade'     =>$grade
        ));;
        return Response::json(['message'=>'success','data'=>$result],201);
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
