<?php

namespace App\Http\Controllers\Tenant;
use App\Http\Controllers\FilterTrait;
use DB;


class studentTuitionController extends Controller
{
    use FilterTrait;

    private $filterFields=['amount','code'];
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($studentId)
    { 
        $descriptionField="(CASE type
                                    WHEN 'tuition.due' THEN  (select educ_fee_heads.name from educ_fee_heads where (code=ref))
                                    WHEN 'tution.payment' THEN 'Tuition Payment' 
                                    ELSE NULL 
                            END) as description";


        $tuition=DB::table('student_tuition_finances')
                            ->select('id','type','ref','amount','refId',DB::raw($descriptionField))
                            ->where('studentId','=',$studentId);




       /* $student=User::students()->find($studentId);
        $tuition=$student->tuition();*/
        $tuition=$this->ApplyFilters($tuition,true);

        //->get();


        return $tuition;

       /*


        return response()->json(["sort"=>  Input::only('sortby'),"data"=>$tuition->items()],200)
        ->header('Access-Control-Allow-Origin', '*');*/
    }

    public function aggregate($studentId){

        $debit =DB::raw('SUM(CASE WHEN amount >0 THEN amount ELSE 0 END )  as debit');
        $credit=DB::raw('SUM(CASE WHEN amount <0 THEN amount ELSE 0 END )  as credit');
        $balance=DB::raw('SUM(amount) as balance');

        $tuition=DB::table('student_tuition_finances')->select($debit,$credit,$balance)
                                    ->where('studentId','=',$studentId)
                                    ->get();

        return response()->json(["data"=>$tuition],200);
       

    }



    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        //
    }


}
