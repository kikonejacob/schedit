<?php
/**
 * Allows us to check for current user and current Academic year
 * 
 */

namespace App\Lib\Tenant;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Authorizer;
use Exception;

class TenantAuth {

	public static function check(){
		
		try{
			$userId=\Authorizer::getResourceOwnerId();
			Auth::loginUsingId($userId);
			return true;

		}
		catch(Exception $e){
		
			return false;

		}
		catch(LucaDegasperi\OAuth2Server\Exceptions\NoActiveAccessTokenException $e){
			return false;
		}

	}
	public static function user(){
		$result=Auth::User();
		if(!isset($result)){
			self::check()? $result=Auth::User():$result=null; 
		}
		return $result;
	}
	public static function currentAcademicYear(){

		$result=Auth::User()->current_acyear;
		if(!isset($result)){
			self::check()? $result=Auth::User()->current_acyear:$result=1; 
		}
		return $result; //Default current Academic year
	}
	
   
}

