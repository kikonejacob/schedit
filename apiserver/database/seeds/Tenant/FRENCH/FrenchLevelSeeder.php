<?php

use Illuminate\Database\Seeder;
use App\Models\Tenant\EducLevel;
use Faker\Factory as Faker;

class FrenchLevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = array(
            ['name' => '6eme' , 'status' => 'active' , 'alias' => '6eme' , 'branch' => 'SCH.LEVEL_TYPE.GENERAL'] ,
            ['name' => '5eme' , 'status' => 'active' , 'alias' => '5eme' , 'branch' => 'SCH.LEVEL_TYPE.GENERAL'] ,
            ['name' => '4eme' , 'status' => 'active' , 'alias' => '4eme' , 'branch' => 'SCH.LEVEL_TYPE.GENERAL'] ,
            ['name' => '3eme' , 'status' => 'active' , 'alias' => '3eme' , 'branch' => 'SCH.LEVEL_TYPE.GENERAL'] ,
            ['name' => '2nd' , 'status' => 'active' , 'alias' => '2nd' , 'branch' => 'SCH.LEVEL_TYPE.GENERAL'] ,
            ['name' => '1ere' , 'status' => 'active' , 'alias' => '1ere' , 'branch' => 'SCH.LEVEL_TYPE.GENERAL'] ,
            ['name' => 'Terminal D' , 'status' => 'active' , 'alias' => 'TerminalD' , 'branch' => 'SCH.LEVEL_TYPE.GENERAL'] ,
            ['name' => 'Terminal E' , 'status' => 'active' , 'alias' => 'terminalE' , 'branch' => 'SCH.LEVEL_TYPE.TECHNIC']
        );
        EducLevel::insert($data);
    }
}
