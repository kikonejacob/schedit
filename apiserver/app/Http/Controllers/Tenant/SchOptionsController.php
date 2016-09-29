<?php
/**
 * Created by PhpStorm.
 * User: khome
 * Date: 9/28/16
 * Time: 6:05 AM
 */

namespace App\Http\Controllers\Tenant;


use App\Http\Requests\Request;
use App\Models\Tenant\SchTenantOptions;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;


class SchOptionsController extends Controller
{
    protected $rules= array(
            'option_name'  => 'required|string' ,
            'option_value' => 'required'
    );
    public function index($optionName){
        $result=SchTenantOptions::where('option_name',$optionName);
        return Response::json(['data'=>$result]);
    }
    public function store(){

    }

    private  function saveOption($values){
        /** @var SchTenantOptions $result */
        $result = SchTenantOptions::firstOrNew(array('option_name' => $values['option_name']));
        $result->fill($values);
        $result->save();
        return $result;
    }
    public function update(Request $request){
        try {
            $this->validate($request , $this->rules);
            $values = $request->only(['option_name' , 'option_value']);
            $result = $this->saveOption($values);
            return $this->APISuccessResponse(['data' => $result]);
        } catch (ValidationException $error) {
            return $this->APIBadRequestResponse(['message' => $error->getMessage()]);
        }

    }
}