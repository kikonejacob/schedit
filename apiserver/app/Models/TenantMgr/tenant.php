<?php

namespace App\TenantManager;

use App\Models\Tenant\TenantStorage;
use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use DB;
use Artisan;
use Config;
use  App;
use Storage;


class Tenant extends Model
{
    /**
     * The connection name for the model.
     *
     * @var string
     */
    protected $connection='tenants-manager';

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'tenants';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $guarded=['id'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['deleted_at','created_at','updated_at'];



    private function struuid($entropy) // look into http://php.net/manual/en/function.uniqid.php
    {
        $s=uniqid("",$entropy);
        $num= hexdec(str_replace(".","",(string)$s));
        $index = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $base= strlen($index);
        $out = '';
        for($t = floor(log10($num) / log10($base)); $t >= 0; $t--) {
            $a = floor($num / pow($base,$t));
            $out = $out.substr($index,$a,1);
            $num = $num-($a*pow($base,$t));
        }
        return $out;
    }

    /**
     * Create a new database for our Tenant
     * @param $schemaName
     * @return bool
     *
     */
    private function createDatabase($schemaName)
    {
        // We will use the `statement` method from the connection class so that
        // we have access to parameter binding.
        return DB::connection()->statement('CREATE DATABASE '.$schemaName);
    }

    private function createTenantLocalStorage(){
        return Storage::disk('tenants')->makeDirectory($this->internal_name);
    }


    /**
     *   Create the configuration information file in the tenant local folder
     *
     */
    private function initializeTenantStorage(){
        TenantStorage::initializeTenantConfigFile($this->internal_name,array(
            'internal_name'=>$this->internal_name,
            'status'=>'created',
            'storage_type'=>$this->storage_type,
            'storage_credential'=>$this->storage_credential
        ));
        TenantStorage::createContextFolder(array(
            'internal_name'=>$this->internal_name,
            'storage_type'=>$this->storage_type,
            'storage_credential'=>$this->storage_credential

        ));
    }

    /**
     *  Migrate Tenant tables
     */
    private function migrateTenantTables(){
        $isLocal=App::isLocal();
        if ($isLocal)  //For development only
        {
            Artisan::call('migrate:reset' , ['--database' => 'tenant']);
        }
        Artisan::call('migrate', ['--database' => 'tenant']);
        Artisan::call('passport:install');
        Artisan::call('db:seed', ['--database' => 'tenant']);
        //Seed for development environment @todo: make environment checking
        if ($isLocal)
        {  // For development only
            Artisan::call('db:seed' , ['--database' => 'tenant' , '--class' => 'DevDatabaseSeeder']);
        }

    }
    /** Create   and initialize Tenant  */
    public function  createTenant(){
        if (App::isLocal()) {
            // Development environment
            $internalName='2016_sch';
        }
        else{
            //Production environment
            /** @var string $internalName */
            $internalName=$this->struuid(true);
            $this->createDatabase($internalName);
        }
        Config::set('database.connections.tenant', array(
            'driver'    => 'mysql',
            'host'      => env('DB_HOST', 'localhost'),
            'database'  => $internalName,
            'username'  => env('TENANTS_USER', 'homestead'),/*For Now*/
            'password'  => env('TENANTS_PASSWORD', 'secret'),
            'charset'   => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix'    => '',
            'strict'    => false,
            'engine'    => null,
        ));
        $this->internal_name=$internalName;
        $this->migrateTenantTables();
        $this->createTenantLocalStorage();
        $this->initializeTenantStorage();

        return $this->save();
        //$this->insert(array('internal_name' => $internalName,'name' => $this['name'],));
    }

    /** update tenant status  */
    public function updateTenantStatus(){

    }


}
