<?php



$factory->define(App\Models\Tenant\EducLevel::class, function (Faker\Generator $faker) {
    return [
       	 'name'	=>$faker->word(),
          'description'=>$faker->sentence($nbWords = 6),
          'status'=>'0',
           ];
});
 