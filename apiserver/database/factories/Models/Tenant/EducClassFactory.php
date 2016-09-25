<?php

 

$factory->define(App\EducClass::class, function (Faker\Generator $faker) {
    return [
  			 'name'=> $faker->word(),
        	 'description'=>$faker->sentence($nbWords = 6),
        	 'levelId'=>$faker->numberBetween(1,10),
        	 'branchID'=>$faker->numberBetween(1,10),
        	 'acyearId'=>1,
             'room'=>'0',
             'status'=>'0'   ];
});
 