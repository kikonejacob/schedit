<?php

namespace App\Http\Controllers\Tenant;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Tenant\Controller;

class studentPaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        //
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
    public function store($request,$studentId)
    {
        $values=$request::all();
        $PaymentType=$values['type'];


        switch ($PaymentType) {
            case 'tuition.payment':
                
                 /** TODO: create invoice record
                           create studentFinance with type:'tuition.payment' */
                      break;
            case 'extrafee.payment':
                /** TODO: create invoice record
                          create studentFinance with type:'nontution.payment' */
                break;
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
        //
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
