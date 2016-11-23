<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Bus\DispatchesJobs;
use App\Jobs\TenantMgr\CreateTenant;



class TenantDatabaseSeeder extends Seeder
{
     use DispatchesJobs;
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
      
        DB::table('tenants')->truncate();
        Model::unguard();


        $this->dispatch(new CreateTenant([
            'owner_id'=>'0',
            'name'=>'gssb',
            'storage_type'=>'local'
        ]));
    


        Model::reguard();
    }
}
