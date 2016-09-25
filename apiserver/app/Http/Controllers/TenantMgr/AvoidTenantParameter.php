<?php
namespace App\Http\Controllers\tenantMgr;


/**
 * We override the callAction function to filter the action parameter of the controller.
 * Anytime the controller action is call we will remove the tenant parameter which is passed by default
 * with laravel
 */
trait AvoidTenantParameter {
/**
     * Execute an action on the controller.
     *
     * @param  string  $method
     * @param  array   $parameters
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function callAction($method, $parameters)
    {
        
        $fitleredparameters=$parameters;
        if (isset($parameters['tenant'])){
            //array_splice($fitleredparameters,0,1);
            unset($fitleredparameters['tenant']);
        }

        return call_user_func_array([$this, $method], $fitleredparameters);
    }
}

?>