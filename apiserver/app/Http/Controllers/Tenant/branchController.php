<?php

/**
 *
 * Copyright (c) 2015 , Kikone Jacob
 */

namespace App\Http\Controllers\Tenant;

use App\Models\Tenant\Branch;
use Request;


class branchController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
         $branch=Branch::all();

        return response()->json(["data"=>$branch],201);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {
        $values=$request->all();
        Branch::create($values);

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
        $branch=Branch::find($id);

        if (!$branch)
        {

            return response()->json(['error'=>"item not found","code"=>"401"],401);
        }

        return response()->json(['data'=>$branch],201);
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
