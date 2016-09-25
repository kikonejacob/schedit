<?php

/**
 *
 * Copyright (c) 2016, Kikone Jacob
 */

namespace App\Http\Controllers\Tenant;

use Illuminate\Http\Request;
use  App\Models\Tenant\EducSubject;

class EducSubjectsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
         $data=EducSubject::all();

        return response()->json(["data"=>$data],201);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {
        $values=$request->all();
        EducSubject::create($values);

        return response()->json(['message'=>'ok'],201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        $data=EducSubject::find($id);

        if (!$data)
        {

            return response()->json(['error'=>"item not found","code"=>"401"],401);
        }

        return response()->json(['data'=>$data],201);
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
