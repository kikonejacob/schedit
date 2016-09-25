<?php

namespace App\Http\Controllers\Tenant;

use App\Models\Tenant\EducClass;
use App\Http\Controllers\FilterTrait;
use  App\Lib\Tenant\DButils\consts as C;
use DB;
use Response;


class classController extends Controller
{
    use FilterTrait;
    private $filterFields=['name','description'];


    /** @todo check aggregate function */
    public function  aggregateGenre(){
        $result = EducClass::
        select(
            C::STUDENT_ENROLLMENT . '.classId' ,
            C::EDUC_CLASS . '.name' ,
            C::STUDENT . '.sex' ,
            DB::raw('count(*) as count')
        )
            ->join(C::STUDENT_ENROLLMENT , C::EDUC_CLASS . '.id' , '=' , C::STUDENT_ENROLLMENT . '.classId')
            ->join(C::STUDENT , C::STUDENT . '.id' , '=' , C::STUDENT_ENROLLMENT . '.studentId')
            ->orderBy(C::EDUC_CLASS . '.name')
            ->groupBy(C::EDUC_CLASS . '.id' , C::STUDENT . '.sex');
        return $result;

    }

    /**
     * @return mixed
     */
    public function  aggregate(){
        $result=EducClass::
            select(
                C::STUDENT_ENROLLMENT.'.classId' ,
                C::EDUC_CLASS.'.name',
                DB::raw('count(*) as enrollments')
            )
            ->join(C::STUDENT_ENROLLMENT, C::EDUC_CLASS.'.id', '=', C::STUDENT_ENROLLMENT.'.classId')
            ->orderBy(C::EDUC_CLASS.'.name')
            ->groupBy(C::EDUC_CLASS.'.id');


        return $result;

    }

    /**
     * @param integer $classId
     * @return mixed
     */
    public function RestAPIClassAggregate($classId){
        $result = $this->aggregate()
            ->where(C::EDUC_CLASS . '.id' , '=' , $classId)
            ->get();
       $result=(count($result) > 0 ) ? $result[0]: array('enrollments'=>0);
        $result["genre_statistic"] = $this->aggregateGenre()
            ->where(C::EDUC_CLASS . '.id' , '=' , $classId)
            ->get();
        return response()->json(['data' => $result] , 201);
    }

    public function RestAPIClassesAggregate(){
        return Response::json(['data'=>$this->aggregate()->get()],201);
    }
    /**
     * @param integer $classId
     * @return mixed
     */
    public function RestAPIClassAggregateGenre($classId){
        return Response::json(['data'=> $this->aggregate()->where(C::EDUC_CLASS.'.id','=',$classId)->get(),201]);
    }

    public function RestAPIClassesAggregateGenre(){
        return Response::json(['data'=>$this->aggregate()->get()]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
    
                
    
         $EducClass=EducClass::
                            join(C::EDUC_LEVEL,'levelId','=',C::EDUC_LEVEL.'.id')
                            ->select(C::EDUC_CLASS.'.*',
                                     C::ALIAS_PARSE(C::ALIAS_LEVEL_NAME));
        $EducClass=$this->ApplyFilters($EducClass,true);

        return $EducClass;

         //return response()->json(['data'=>$EducClass],201);
                
    }
    public function show($id)
    {
        //var_dump($id);
        $class=EducClass::where('id',$id)->with(array('level'=>function($query){
                                $query->select('id','name');
                            }))->first();
       
        return response()->json(['data'=>$class],201);
        
    }



   
}
