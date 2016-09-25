<?php

use App\Events\Tenant\StudentEnrolled;
use App\Models\Tenant\EducClass;
use App\User;
use Illuminate\Database\Seeder;
use App\Models\Tenant\StudentEnrollment;
use Faker\Factory as Faker;

class FrenchStudentEnrollSeeder extends Seeder
{

    private function getClasses()
    {
        $classes = EducClass::select('id')->get()->toArray();
        return $classes;
    }
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        $students = User::where('role' , 'SCH_STUDENT')->get();
        $classes = $this->getClasses();
        $classes=array_flatten($classes);
        //var_dump(array_values($classes));

        foreach ($students as $student) {
            $newEnroll = StudentEnrollment::create(
                [
                    'studentId' => $student->id ,
                    'classId'   => $faker->randomElement(array_values($classes)),
                    'acyearId'  => 1
                ]);
            event(new StudentEnrolled($newEnroll));
        }

    }
}
