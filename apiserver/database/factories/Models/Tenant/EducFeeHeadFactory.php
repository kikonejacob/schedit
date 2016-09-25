<?php

$factory->define(App\EducFeeHead::class, function (Faker\Generator $faker) {
    return [
       	 'name'	=>$faker->word(),
         'type'	=>$faker->randomElement(['tution.fees','others.fees']),
         'code'	=>$faker->numerify('FEE###'),
             ];
});
 