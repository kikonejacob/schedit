<?php

use Illuminate\Database\Seeder;
use App\Models\Tenant\Branch;
use Faker\Factory as Faker;

class BranchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data=array(
            ['name'=> "TECHNIC",'code'=> "SCH.LEVEL_TYPE.TECHNIC", 'parent_id'=>'-1'],
            ['name'=> "GENERAL",'code'=> "SCH.LEVEL_TYPE.GENERAL", 'parent_id'=>'-1']
        );
        Branch::insert($data);

    }
}
