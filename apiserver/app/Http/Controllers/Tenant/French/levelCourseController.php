<?php

namespace App\Http\Controllers\Tenant;

use App\Models\Tenant\EducLevelCourse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


use App\Http\Requests;
use App\Http\Controllers\Tenant\Controller;
use App\Http\Controllers\FilterTrait;
use App\Models\Tenant\EducLevel;
use App\Models\Tenant\EducLevelSubject;
use Validator;

class levelSubjectsController extends Controller
{
    use FilterTrait;

    /** @var array The validation rules */
    protected  $rules=[
        'name'         => 'required|string',
        'coefficient'  => 'required|double',
        'levelId'      => 'required|integer',
        'subject_code' => 'required|string',
        'max_points'   => 'required|integer',
    ];
    /** @todo Add option to allow user to select a formula calculation method */

    /**
     * Display a listing of the resource.
     *
     * @param integer levelId
     * @return Response
     */
    public function index($levelId)
    {
      /** @var EducLevel $level */
      $level=EducLevel::find($id);
      if (!$level)
      {
          return $this->error_levelNotFound();

      }

      $data=$level->courses();
      $data=$this->ApplyFilters($data,true);

      return $data;
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
     * @param  Request $request
     * @param $levelId
     * @return Response
     */
    public function store(Request $request,$levelId)
    {
        /**Validation or request arguments*/
        $validator = Validator::make($request->all() , $this->rules);
        if ($validator->fails()) {
            return response()->json(['error' , 'message' => $validator->messages()] , 422);
        }
        /** End validation */
        if ($levelId == "selection") {
            return $levelId;
        };
        /** @var EducLevel $level */
        $level = EducLevel::find($levelId);
        if (!$level) {
            return $this->error_levelNotFound();
        };

        $values = $request->all();
        $values['id'] = -1;
        $values['acyearId'] = Auth::user()->current_acyear;
        //array_push($values,['acyearId'=> Auth::user()->current_acyear]);

        $level->courses()->create($values);

        return response()->json(['message' => 'ok'] , 201);
    }

    /**
     * Display the specified resource.
     *
     * @param     int $levelId
     * @param string $subject_code
     * @return Response
     */
    public function show($levelId,$subject_code)
    {
       /** @var EducLevel $level */
      $level=EducLevel::find($levelId);
     if (!$level)
     {
         return $this->error_levelNotFound();

     };


     $data=$level->courses()->where('subject_code',$subject_code)->get();

     return response()->json(['data'=>$data],201);
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
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $levelId,$subject_code)
    {
      $values=$request->all();
      /** @var EducLevel $level */
      $level=EducLevel::find($levelId);
      if (!$level)
      {
          //return $this->error_levelNotFound();

      };
      /** @var EducLevelCourse $levelSubject */
      $levelSubject=$level->courses()->where('subject_code',$subject_code)
                          ->first();
      if (!$levelSubject){
          return response()->json(['error'=>'cannot find levelsubject',401],401);
      };


      $levelSubject->fill($values);
      $levelSubject->save();
      return response()->json(['message'=>'ok'],200);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        echo $id;
    }
}
