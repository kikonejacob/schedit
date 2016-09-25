<?php

$factory->define(App\EducClass::class, function (Faker\Generator $faker) {
    return [
  			 'name'=> $faker->year($max = 'now').'-'.$faker->year($max = 'now')
  			];
        	
});
 