<?php

namespace App\Http\Controllers\Tenant;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Http\Controllers\TenantMgr\AvoidTenantParameter;
use Response; ///Additional to original version

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests,AvoidTenantParameter;

    /**
     * @param  string| $error
     * @return \Illuminate\Http\JsonResponse
     */
    protected  function APIBadRequestResponse($error){
        $result=array('error');
        if (isset($data)) {
            $result['message']=$error;
        }
        return Response::json(array_merge($result,$data),422);
    }

    /**
     * Prepare an Validation Message
     * @param \Exception $error
     * @return \Illuminate\Http\JsonResponse
     */
    protected  function APIValidationError($error){
        return Response::json(array_merge(['message'=>'error','detail'=>$error->getMessage()],$data),422);
    }

    /**
     * @param Collection|null $data
     * @return \Illuminate\Http\JsonResponse
     */
    protected  function APINoFoundResponse($data=null){
        $result=array('message'=>'resource not found');
        if (isset($data)) {
            $result['data']=$data->toArray();
        }
        return Response::json($result,$data,401);
    }

    /**
     * Return and  success APi response
     * @param Collection|null $data
     * @return \Illuminate\Http\JsonResponse
     */
    protected  function APISuccessResponse($data=null){
        $result = array('message' => 'success','data'=>array());
        if (isset($data)) {
            $result['data']=$data->toArray();
        }
        return Response::json($result , 201);
    }

}
