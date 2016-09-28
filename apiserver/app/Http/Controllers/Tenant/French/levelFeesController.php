<?php

namespace App\Http\Controllers\Tenant;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Http\Requests;
use App\Http\Controllers\Tenant\Controller;
use App\Http\Requests\LevelFeeRequest;
use App\Http\Controllers\FilterTrait;
use App\Models\Tenant\EducLevelFee;
use App\Models\Tenant\EducLevel;



class levelFeesController extends Controller
{

    use FilterTrait;

    protected $filterFields=['amount'];

     public function error_levelNotFound()
    {
       return response()->json(["message"=>"error:level not found","code"=>"404"],404);
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($id)
    {

        $level=EducLevel::find($id);
        if (!$level)
        {
            return $this->error_levelNotFound();

        }

        $data=$level->fees();
                    //->get();
        $data=$this->ApplyFilters($data,true);

        return $data;

        //return response()->json(['data'=>$data],200);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(FeeRequest $request,$levelId)
    {

        $level=EducLevel::find($levelId);

        if (!$level)
        {
            return $this->error_levelNotFound();

        };
        $values=$request->all();
        $values.$id=-1;
        $values['acyearId']=Auth::user()->current_acyear;
        //array_push($values,['acyearId'=> Auth::user()->current_acyear]);

        $level->fees()->create($values);

        return response()->json(['message'=>'ok'],201);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($levelId,$fee_code)
    {

         $level=EducLevel::find($levelId);
        if (!$level)
        {
            return $this->error_levelNotFound();

        };


        $fee=$level->fees()->where('fee_code',$fee_code)->first();

        return response()->json(['data'=>$fee],201);
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
          $level=EducLevel::find($levelId);
        if (!$level)
        {
            return $this->error_levelNotFound();

        };

        $tuition=$level->fees()->find($id);


        if (!$tuition)
        {
            return response()->json(["message"=>"item not found"],404);
        };

        $tuition->delete();
        return response()->json(['message'=>'record deleted']);

    }
}
