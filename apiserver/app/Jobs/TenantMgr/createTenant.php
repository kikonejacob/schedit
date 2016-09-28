<?php

namespace App\Jobs\TenantMgr;

use App;
use App\Jobs\Job;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use DB;
use Artisan;
use Config;

class createTenant extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    private $tenant;

    function struuid($entropy) // look into http://php.net/manual/en/function.uniqid.php
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



    function createDatabase($schemaName)
    {
        // We will use the `statement` method from the connection class so that
        // we have access to parameter binding.
        return DB::connection()->statement('CREATE DATABASE '.$schemaName);
    }

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($tenant)
    {
        $this->tenant=$tenant;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
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

         if (App::isLocal())  //For development only
         {
             Artisan::call('migrate:reset' , ['--database' => 'tenant']);
         }


         Artisan::call('migrate', ['--database' => 'tenant']);
         Artisan::call('db:seed', ['--database' => 'tenant']);
         //Seed for development environment @todo: make environment checking
        if (App::isLocal())
        {  // For development only
            Artisan::call('db:seed' , ['--database' => 'tenant' , '--class' => 'DevDatabaseSeeder']);
        }

        DB::connection('tenantsmgr')->table('tenants')
            ->insert(array('internal_name' => $internalName,'name' => $this->tenant['name'],));
        //var_dump($internalName);
        
    }
}
