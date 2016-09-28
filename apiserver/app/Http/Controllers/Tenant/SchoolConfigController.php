<?php
/**
 * Created by PhpStorm.
 * User: khome
 * Date: 9/28/16
 * Time: 7:05 AM
 */

namespace App\Http\Controllers\Tenant;

const DEFAULT_SCHOOL_INFO = array(
    'name'  => 'My School' ,
    'tel'   => '000 000 000' ,
    'email' => 'myemail@example.com'
);

use App\Models\Tenant\SchTenantOptions;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;

class SchoolConfigController extends Controller
{
    protected  $rules=array(
        'name'     => 'optional|string' ,
        'tel'      => 'optional|string' ,
        'email'    => 'optional|email' ,
        'address1' => 'optional|string' ,
        'address2' => 'optional|string' ,
        'logo'     => 'optional|string'
    );
    public function index(){
       $result= SchTenantOptions::where('group','=','sch.school');
       return $this->APISuccessResponse($result);
    }

    public function store(Request $request){
        try{
            $this->validate($request,$this->rules);
            $allowedFields=array_keys($this->rules);
            $values=$request->only($allowedFields);
            SchTenantOptions::insert($values);
            return $this->APISuccessResponse(['message'=>'sucess']);

        }
        catch (ValidationException $error){
            return $this->APIValidationError($error);
        }

    }

}