<?php

/**
 *
 * Copyright (c) 2016, Kikone Jacob
 */

namespace App\Http\Controllers\tenantMgr;

use App\TenantManager\Tenant;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Jobs\TenantMgr\CreateTenant;
use Illuminate\Validation\ValidationException;


class TenantsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $result=Tenant::all();
        return response($result,201);

    }


    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     * @throws ValidationException
     */
    public function store(Request $request)
    {

        $rules=array(
            'owner_id'=>'required',
            'name'=>'required',
            'type'=>'required',
            'storage_type'=>'required|'
        );
        try {
            $this->validate($request , $rules);
            $values = $request->all();
            $this->dispatch(new CreateTenant($values));
        }
        catch(ValidationException $error)  {
            return response($error->getMessage(),404);/** @todo change error code */
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        
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
