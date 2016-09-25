<?php

use Illuminate\Database\Seeder;

use App\Models\Tenant\EducClass;
use App\Models\Tenant\EducLevel;
use Faker\Factory as Faker;

class FrenchClassSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        $levels = EducLevel::all();
        foreach ($levels as $level) {
            $numberOfClasses = $faker->numberBetween(1 , 3);
            $data = [];
            for ($i = 0; $i <= $numberOfClasses; $i++) {
                $data[] = array(
                    'name'        => $level->name .' '.($i+1) ,
                    'description' => $faker->sentence($nbWords = 6) ,
                    'levelId'     => $level->id ,
                    'acyearId'    => 1 ,
                    'max_size'    =>54,
                    'room'        => '0'
                );
            }
            EducClass::insert($data);
        }

        
    }
}
