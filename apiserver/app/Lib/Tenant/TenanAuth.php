<?php
/**
 * Allows us to check for current user and current Academic year
 * 
 */
//@todo remove this

namespace App\Lib\Tenant;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Authorizer;
use Exception;
use Illuminate\Support\Facades\Request;

class TenantAuth {

	public static function check(){
		
		try{
			//$userId=\Authorizer::getResourceOwnerId();
			//Auth::loginUsingId($userId);
            $user=Request::user();
     		return isset($user);


		}
		catch(Exception $e){
		
			return false;

		}


	}
	public static function user(){
		$result=Request::user();
		if(!isset($result)){
			self::check()? $result=Request::user():$result=null;
		}
		return $result;
	}
	public static function currentAcademicYear(){
        try
        {
            $result=Request::user()->current_acyear;
		 }
		 catch(Exception $exception){
		     return 1;
		 }
		return $result; //Default current Academic year
	}
	
   
}

