<?php


$factory->define(App\User::class, function (Faker\Generator $faker) {
    return [
  			 'name'=> $faker->name($gender = null|'male'|'female') ,
             'first_name'=>$faker->firstName,
             'last_name'=>$faker->lastName,
             'email'=>$faker->email,
             'password'=>Hash::make('password'),
             'current_acyear'=>1,
             'role'=>"SCH_STUDENT"
            ];
});
 