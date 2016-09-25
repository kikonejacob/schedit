<?php

use App\User;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        $data = array();
        for ($i = 0; $i < 50; $i++) {
            $data[] = array(
                'name'           => $faker->name($gender = null | 'male' | 'female') ,
                'first_name'     => $faker->firstName ,
                'last_name'       => $faker->lastName ,
                'sex'=>$faker->randomElement(['m','f']),
                'email'          => $faker->email ,
                'password'       => Hash::make('password') ,
                'current_acyear' => 1 ,
                'role'           => "SCH_STUDENT"
            );
        }
        User::insert($data);


    }
}
