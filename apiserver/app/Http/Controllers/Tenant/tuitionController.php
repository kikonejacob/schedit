<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\FilterTrait;
use App\Lib\Tenant\TenantAuth;
use DB;

class tuitionController extends Controller
{
    use FilterTrait;
     public function index($classId)
    { 
        $descriptionField=DB::raw("(CASE type
                                    WHEN 'tuition.due' THEN  (select educ_fee_heads.name from educ_fee_heads where (code=ref))
                                    WHEN 'tution.payment' THEN 'Tuition Payment' 
                                    ELSE NULL 
                                  END) as description");


        $tuition=DB::table('student_tuition_finances')->select('id','type','ref','amount','refId',$descriptionField);

        if (isset($classId)){
            $tuition->join('student_enrollment',function($join){
                    $join->on('student_enrollment.studentId','=','student_tuition_finances.studentId')
                         ->where('student_enrollment.classId','=',$classId);
            });
        }




        $tuition=$this->ApplyFilters($tuition,true);

        return $tuition;

     }
     public function show(){

        $descriptionField=DB::raw("(CASE type
                                    WHEN 'tuition.due' THEN  (select educ_fee_heads.name from educ_fee_heads where (code=ref))
                                    WHEN 'tution.payment' THEN 'Tuition Payment' 
                                    ELSE NULL 
                                  END) as description");


        $tuition=DB::table('student_enrollment')->select('id',DB::RAW("DISTINCT('studentId')"),'type','ref','amount','refId',$descriptionField)
                        ->join('student_tuition_finances')
                        ->where('acyearId','=',TenantAuth::currentAcademicYear());



        $tuition=$this->ApplyFilters($tuition,true);

        return $tuition;
     }

    public function aggregateAll(){

        $debit =DB::raw('SUM(CASE WHEN amount >0 THEN amount ELSE 0 END )  as debit');
        $credit=DB::raw('SUM(CASE WHEN amount <0 THEN amount ELSE 0 END )  as credit');
        $balance=DB::raw('SUM(amount) as balance');

        $tuition=DB::table('student_tuition_finances')->select($debit,$credit,$balance)
            ->get();

        return response()->json(["data"=>$tuition],200);


    }

    public function aggregate($classId){

        $debit  =DB::raw('SUM(CASE WHEN amount >0 THEN amount ELSE 0 END )  as debit');
        $credit =DB::raw('SUM(CASE WHEN amount <0 THEN amount ELSE 0 END )  as credit');
        $balance=DB::raw('SUM(amount) as balance');

        $tuition=DB::table('student_tuition_finances')->select($debit,$credit,$balance);

        if (isset($classId)){
            $tuition->join('student_enrollment',function($join){
                    $join->on('student_enrollment.studentId','=','student_tuition_finances.studentId')
                         ->where('student_enrollment.classId','=',$classId);
            });
        }


        $tuition->get();

        return response()->json(["data"=>$tuition],200);
       

    }
}
