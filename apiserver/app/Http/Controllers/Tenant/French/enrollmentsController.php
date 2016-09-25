<?php

namespace App\Http\Controllers\Tenant;
use App\Http\Controllers\FilterTrait;
use App\Models\Tenant\StudentEnrollment;
use App\Lib\Tenant\DButils\consts as C;
use DB;


class enrollmentsController extends Controller
{
    use FilterTrait;

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
      
        $enrollment=StudentEnrollment::all();
        
         return response()->json(['data'=>$enrollment],201);

    }

    public function  aggregateGenre(){
        $result = StudentEnrollment::
        select(
            C::STUDENT_ENROLLMENT . '.classId' ,
            C::EDUC_CLASS . '.name' ,
            C::STUDENT . '.sex' ,
            DB::raw('count(classId) as count')
        )
            ->join(C::EDUC_CLASS , C::EDUC_CLASS . '.id' , '=' , C::STUDENT_ENROLLMENT . '.classId')
            ->join(C::STUDENT , C::STUDENT . '.id' , '=' , C::STUDENT_ENROLLMENT . '.studentId')
            ->orderBy(C::EDUC_CLASS . '.name')
            ->groupBy(C::STUDENT_ENROLLMENT . '.classId' , C::STUDENT . '.sex')->get();
        return $result;

    }


    public function  aggregate(){
        $result=StudentEnrollment::
             select(C::STUDENT_ENROLLMENT.'.classId',C::EDUC_CLASS.'.name',DB::raw('count(classId) as count'))
             ->join(C::EDUC_CLASS, C::EDUC_CLASS.'.id', '=', C::STUDENT_ENROLLMENT.'.classId')
            ->orderBy(C::EDUC_CLASS.'.name')
            ->groupBy(C::STUDENT_ENROLLMENT.'.classId')->get();


        return $result;

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param $func
     * @return Response
     * @internal param int $id
     */
    public function show($func)
    {
        switch ($func){
            case  'aggregate-genre':
                return $this->aggregateGenre();
                break;
            default:
                $this->aggregate();
                break;
        }

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
