<?php
/**
 *
 * Copyright (c) 2015 , Kikone Jacob 
 */

namespace App\Http\Controllers\Tenant;

use App\Models\Tenant\EducLevel;
use App\Models\Tenant\EducClass;
use App\Http\Controllers\tenantMgr\AvoidTenantParameter;


class levelClassController extends Controller
{
        
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

        };
        $classes=$level->classes()->get();





        return response()->json(['data'=>$classes],200);
        
    }

  

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(classRequest $request,$level)
    {
        $levelInfo=EducLevel::where('Id','=',$level)
                          ->orWhere('level_Alias','=',$level)
                          ->get();
        if (!$levelInfo)
        {
            return $this->error_levelNotFound();

        };

        $values=$request->all();

        /*$class=$level->classes()->create($values);

        if (isset($value['alias']) &&($value['alias']!='')){
            $class->alias=$levelInfo->alias.'-'.$class->Id;
            $class->save();
            
        }*/

        return response()->json(['message'=>'ok'],201);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($levelId,$id)
    {
        $level=EducLevel::find($levelId);
        if (!$level)
        {
            return $this->error_levelNotFound();

        };
        
        $class=$level->classes()->where('id',$id)->with(array('level'=>function($query){
                                 $query->select('id','name');
                            }))->get();
;
       
        return response()->json(['data'=>$class],201);
    }

   
    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update(classRequest $request,$levelId,$id)
    {
        $level=EducLevel::find($levelId);
         if (!$level)
        {
            return $this->error_levelNotFound();

        };
        $values=$request->all();
        $class=$level->classes()->find($id);
        $class->fill($values);
        $class->save();

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy(classRequest $request,$levelId,$id)
    {
        $level=EducLevel::find($levelId);
        if (!$level)
        {
            return $this->error_levelNotFound();

        };

        $class=$level->classes()->find($id);

        if (!$class) 
        {
            return response()->json(["message"=>"item not found"],404);
        };

        $class->delete();
        return response()->json(['message'=>'record deleted']);


        
    }
}
