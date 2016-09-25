<?php

  /*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\Models\Tenant\ClassSchedule::class, function (Faker\Generator $faker) {
    return [
          'classId'		=>$faker->numberBetween(1,10),
          'beginTime'	=>$faker->time($format = 'H:i:s', $max = 'now'),
          'endTime'		=>$faker->time($format = 'H:i:s', $max = 'now'),
          'subjectId'	=>$faker->numberBetween(1,10),
          'roomId'		=>$faker->numberBetween(1,10),
          'day'			=>$faker->randomElement($array = array ('mon,tue,wed,thu,fri,sat,sun'))
    ];
});
