<?php

use Illuminate\Database\Seeder;
use App\TenantMgr\Tenant;
use Faker\Factory as Faker;

class TenantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        	$faker=Faker::create();

    	for  ($i=0;$i<10; $i++)
    	{
    		Tenant::create(
        	[
        	 'name'=> $faker->word(),
             'parent_id'=>'-1'       	 

        	]);
    	};
    }
}
