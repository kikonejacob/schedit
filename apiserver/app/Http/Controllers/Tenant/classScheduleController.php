<?php

namespace App\Http\Controllers\Tenant;

use App\EducClassSchedule;
use App\Http\Controllers\FilterTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use App\Http\Requests;
use Response;
use Validator;

class classScheduleController extends Controller
{
    use FilterTrait;

    /**
     *  Get class schedule by day
     *
     * @param integer $classId The class
     * @param string $day [mon|tue|wed|thu|fri|sat|sun] day of the week
     * @return mixed
     */
    private function getClassScheduleByDay($classId,$day){
        return EducClassSchedule::where('classId',$classId)->andWhere('day',$day);

    }

    /**
     * Get class schedule
     * @param $classId
     * @return mixed
     */
    private function getClassSchedule($classId){
        return EducClassSchedule::where('classId',$classId);
    }

    public function getClassCourseSchedule($classId,$course){
        return EducClassSchedule::where('classId',$classId)->andWhere('course_code',$course);;
    }

    /**
     * Display a listing of the resource.
     *
     * @param integer $classId
     * @param $day
     * @return \Illuminate\Http\Response
     */
    public function index($classId,$day)
    {
        if (isset($day)){
            $result=$this->getClassScheduleByDay($classId,$day);
        }
        else{
            $result=$this->getClassSchedule($classId);
        }
        $this->ApplyFilters($result,true);
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
     * Store a newly created course schedule in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return  JsonResponse
     */
    public function store(Request $request)
    {
        $rules=[
            'day'          => 'required|in:mon,tue,wed,thu,fri,sat,sun',
            'start_time'   => 'required|date_format:H:i',
            'end_time'     => 'required|date_format:H:i',
            'course_code'  => 'required|string|max:20'
        ];
        $validator = Validator::make($request->all(),$rules);
        if ($validator->fails())
        {
            return response()->json(['error','message'=>$validator->messages()],422);
        }
        $value=$request->only(['day','start_time','end_time','course_code']);
        $courseSchedule=EducClassSchedule::create([$value]);
        return Response::json(['message'=>'success','data'=>$courseSchedule],201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

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
