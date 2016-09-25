<?php

$factory->define(use App\Models\Tenant\EducSubject::class, function (Faker\Generator $faker) {
    return [
  			 'name'=> $faker->word(),
        	 'groupId'=>$faker->numberBetween(1,10),
        	 'code'=>$faker->numerify('SUBJ###')      
            ];
});
 