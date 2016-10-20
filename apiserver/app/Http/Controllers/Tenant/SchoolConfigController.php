<?php
/**
 * School Configuration informations
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
       $result= SchTenantOptions::where('group','=','sch.school')->get();
       return $this->APISuccessResponse($result);
    }

    public function store(Request $request){
        try{
            $this->validate($request,$this->rules);
            $allowedValues=$request->only(array_keys($this->rules));
            foreach($allowedValues as $key=>$value){
                $data=array('option_name'=>$key,'option_value'=>$value,'group'=>'school.information');
                SchTenantOptions::insert($data);
            };
            return $this->APISuccessResponse();

        }
        catch (ValidationException $error){
            return $this->APIValidationError($error);
        }

    }

}