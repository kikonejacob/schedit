<?php
/**
 * Created by PhpStorm.
 * User: khome
 * Date: 9/26/16
 * Time: 10:09 PM
 */

namespace App\Models\Tenant;


use Illuminate\Database\Eloquent\Model;

class TenantStorage extends Model
{

    /** Actually the context is the folder  */
    // The $config is supposed to  contains data about
    static function moveTemporaryFileToContext($ticket,$context,$config){
        $result=self::find($ticket);
        if ($result->context=='file.temporay'){
            $location=$result->location;
            // check that the current user can access to this context
            if ($result->checkcontext($config)){
                Storage::disk('tenant')->move($location,self::getContextPath(context,$config));
            }
            else
                throw (\Exception('initial context is not valid'));

        }
        throw (\Exception('initial context is not valid'));

    }

    public function getfile(){

    }

}