<?php

namespace App\Http\Controllers\Tenant;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Http\Controllers\TenantMgr\AvoidTenantParameter;
use Response; ///Additional to original version

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests,AvoidTenantParameter;


    protected  function APIBadRequestResponse($data){
        return Response::json(array_merge(['message'=>'error'],$data),422);
    }

    /**
     * Prepare an Validation Message
     * @param \Exception $error
     * @return \Illuminate\Http\JsonResponse
     */
    protected  function APIValidationError($error){
        return Response::json(array_merge(['message'=>'error','detail'=>$error->getMessage()],$data),422);
    }

    protected  function APINoFoundResponse($data){
        return Response::json(array_merge(['message'=>'resource not found'],$data),401);
    }

    /**
     * Return and  success APi response
     * @param array $data
     * @return \Illuminate\Http\JsonResponse
     */
    protected  function APISuccessResponse($data){
        return Response::json(array_merge(['message'=>'success'],$data),201);
    }

}
