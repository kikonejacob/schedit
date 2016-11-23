<?php
/**
 * Created by PhpStorm.
 * User: khome
 * Date: 9/27/16
 * Time: 8:21 PM
 */

namespace App\Models\Tenant;


use Illuminate\Database\Eloquent\Model;

class SchTenantOptions extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'sch_options';


    /**  Put the information of the tenant the database */
    public function initializeTenantConfig($config){

    }

}