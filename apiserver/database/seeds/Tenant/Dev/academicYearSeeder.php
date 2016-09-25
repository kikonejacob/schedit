<?php

use Illuminate\Database\Seeder;
use App\Models\Tenant\AcademicYear;
use Faker\Factory as Faker;

class academicYearSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker=Faker::create();

    	
    	AcademicYear::create(
        [
        	 'name'=> '2015-2016'
        	 
        ]);
    }
}
